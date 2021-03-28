var deptTree,userCombo,eventDate, status, dept, userId, shResult, result;
$(function () {
    init();
    window.checkValid = page.checkValid;
});
var eventDate;
var deptTree;
var userCombo;
var typeIdCombo;
function init() {
    page._init();
    page.initGrid(true,80);
    sys_loaded();
}
page = $.extend(page, {
    idField: "id",
    pageHeight:80,
    _init:function () {
        eventDate = coco.ctrl.dateQuery({
            valueTagId:"eventDate"
        });
        deptTree = coco.plugin.tree.deptTree({
            treeId: "ksId",
            canEmpty: true,
            panelWidth: 400,
            isOnlySelectLeaf: true,
            hasDefRoot: false
        });
        userCombo = coco.plugin.list.userList({
            listId: "userId",
            panelWidth: 400,
            canEmpty: true,
            value: $("#userId").val()
        });
        //事件分类
        typeIdCombo = coco.plugin.combo.jjf({
            comboId: "typeId",
            panelWidth: 400,
            canEmpty: true
        });
        status = coco.plugin.combo.shType({
            comboId:"status"
        });

        shResult = coco.plugin.combo.evalCheck({
            canEmpty:true,
            comboId:"shResult"
        });
        isSh = coco.plugin.combo.comboBoolean({
            canEmpty:true,
            comboId:"isSh"
        });
        initActivityDialog();
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        $('#tbList').datagrid({
            title: "考评加减分事件审核列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'data.vm',
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            pagination: true,
            rownumbers: true,
            selectOnCheck:false,
            checkOnSelect:true,
            frozenColumns:[
                [

                ]
            ],
            columns:[
                [
                    {field:"CK", checkbox:true, title:"审核", opt:true, checkFormatter:function (value, rowData, rowIndex) {
                        var re = {
                            visible:true,
                            enabled:true
                        };
                        if (rowData.isSh == "YES") {
                            re.checked = false;
                            re.enabled = false;
                        }
                        return re;
                    }},
                    {field:page.idField, title:"操作", width:100, formatter:page.ckFormatter, opt:true},
                    {field:"deptName", title:"科室", width:80, sortable:true},
                    {field:"userName", title:"人员", width:80, sortable:true},
                    {field:"eventName", title:"事件名称", width:170, sortable:true},
                    {field:"eventDate", title:"时间", width:90, sortable:true},
                    {field:"score", title:"分数", width:50, sortable:true},
                    {field:"typeName", title:"事件类型", width:80, sortable:true},
                    {field:"statusName", title:"档案分类", width:80, sortable:true},
                    {field:'isShName', title:'审核状态', width:60, sortable:true},
                    {field:'shResultName', title:'审核结果', width:60,formatter:page.formatterResult, sortable:true},
                    {field:'qrScore', title:'确认分数', width:50,formatter:page.formatterQrScore, sortable:true}
                ]
            ],
            onClickRow:function (rowIndex, rowData) {
                if(rowData.isSh=="YES"){
                    $('#tbList').datagrid("unselectRow", rowIndex);
                }
            }
            });
    },
    formatterResult:function (value, rowData, rowIndex) {
        if (value == "通过") {
            return "<font color='green'>通过</font> ";
        } else if (value =="未通过") {
            return "<font color='red'>未通过</font> ";
        }
        return "";
    },
    clear:function () {
        $("#baseTab *").val("");
        $("#shTab *").val("");
        $("#sresultY").prop("checked", false);
        $("#sresultN").prop("checked", false);
    },
    checkValid: function (formId) {
        if (!$("#" + formId).form('validate')) return false;
        return true;
    },
    ajaxPost:function (value,isCk) {
        coco.utils.ajaxPostData("custom.vm?actionType=load", {id:value}, function (datastr) {
            var data = coco.utils.json.parse(datastr);
            $("#id").val(data.id);
            $("#sissh").val(data.isSh);
            $("#sdept").val(data.deptName);
            $("#suserId").val(data.userName);
            var status = "科室级别档案"
            switch (data.status) {
                case "dk":
                    status = "大科级别档案";
                    break;
                case "dw":
                    status = "单位级别档案";
                    break;
            }
            $("#sstatus").val(status);
            $("#sbz").val(data.stdName);
            $("#sscoreLimit").val(data.scoreLimit);
            $("#seventName").val(data.eventName);
            $("#sDate").val(data.eventDate);
            $("#sScore").val(data.score);
            if (data.shResult == "YES"){
                $("#sresultY").prop("checked", true);
                $("#tr_sqrScore").show();
            }
            if (data.shResult == "NO"){
                $("#sresultN").prop("checked", true);
                $("#tr_sqrScore").hide();
            }
            if(isCk==1){
                $("#sqrScore").numberbox({
                    max:data.score
                });
                $("#sqrScore").numberbox("setValue", data.score);
                $("#sresultY").attr("checked", true);
            }else{
                $("#sqrScore").numberbox({
                    max:data.qrScore
                });
                $("#sqrScore").numberbox("setValue", data.qrScore);
            }
            if(data.status=="dw"){
                $("#tr_sqrScore").hide();
            }else{
                $("#tr_sqrScore").show();
            }
            $("#sshRemark").val(data.shRemark);
            $("#activity-dialog").dialog({buttons:[
                {
                    text:'确认',
                    iconCls:'icon-ok',
                    handler:function () {
                        if (!page.checkValid("shTab")) {return};
                        if ($("#sissh").val() == "NO" && $("#stat").val() == 1) {
                            var sresult = "";
                            if ($("#sresultY").prop("checked")) {
                                sresult = "YES";
                            }
                            if ($("#sresultN").prop("checked")) {
                                sresult = "NO";
                            }
                            if (sresult == "") {
                                coco.utils.msg.slideError("请选择审核结果！");
                                return;
                            }
                            var sqrScore = coco.utils.math.AmountToNumber($("#sqrScore").numberbox("getValue"));
                            var limit = $("#sscoreLimit").val();
                            var limits = limit.split("~");
                            var bg = coco.utils.math.AmountToNumber(limits[0]);
                            var ed = coco.utils.math.AmountToNumber(limits[1]);
                            if (sresult=="YES"&&(sqrScore < bg || sqrScore > ed)) {
                                coco.utils.msg.slideError("请输入有效的确认分数！");
                                return;
                            }
                            coco.utils.ajaxPostData("./custom.vm?actionType=save",
                                {id:$("#id").val(), sresult:sresult, sqrScore:sqrScore, sshRemark:$("#sshRemark").val()},
                                function (data) {
                                    if (data.state) {
                                        coco.utils.msg.slideMsg("审核成功！");
                                        $("#activity-dialog").dialog("close");
                                        page.query();
                                    } else {
                                        coco.utils.msg.slideMsg(data.msg);
                                    }

                                }
                            );
                        } else {
                            $("#activity-dialog").dialog("close");
                        }
                    }
                },
                {
                    text:'取消',
                    iconCls:'icon-cancel',
                    handler:function () {
                        $("#activity-dialog").dialog("close");
                    }
                }
            ]});
            if ($("#stat").val() == 0) {
                if (data.isSh == 1) {
                    $("#shTab").show();
                    $("#activity-dialog").dialog({title:"审核档案",
                        height:500, buttons:[
                            {
                                text:'取消审核',
                                iconCls:'icon-ok',
                                handler:function () {
                                    page.canlHandle($("#id").val());
                                }
                            },
                            {
                                text:'取消',
                                iconCls:'icon-cancel',
                                handler:function () {
                                    $("#activity-dialog").dialog("close");
                                }
                            }
                        ]});
                } else {
                    $("#shTab").hide();
                    $('#activity-dialog').dialog({
                        title:"查看详情",
                        height:380,
                    buttons:[
                        {
                            text:'关闭',
                            iconCls:'icon-cancel',
                            handler:function () {
                                $("#activity-dialog").dialog("close");
                            }
                        }
                        ]
                    });
                }
            } else {
                $("#shTab").show();
                $('#activity-dialog').dialog({
                    title:"审核档案",
                    height:500
                });
            }
        });
    },
    unPass:function(){     //未通过 确认分数不显示
       $("#sqrScore").numberbox("setValue",0);
       $("#tr_sqrScore").hide();
    },
    pass:function(){        //通过 确认分数显示
        $("#sqrScore").numberbox("setValue", $("#sScore").val());
        $("#tr_sqrScore").show();
        if($("#sstatus").val()=="单位级别档案"){
            $(".tr_corp").hide();
            $("#tr_sqrScore").hide();
        }else{
            $(".tr_corp").show();
            $("#tr_sqrScore").show();
        }
    },
    showHandle:function (value) {
        page.clear();
        $("#stat").val(0);
        page.ajaxPost(value,0);
        $("#sresultY").attr("disabled", "disabled");
        $("#sresultN").attr("disabled", "disabled");
        $("#sqrScore").numberbox("disable", true);
        $("#sshRemark").attr("disabled", "disabled");
        $("#activity-dialog").dialog("open");
    },
    shHandle:function (value) {
        page.clear();
        $("#stat").val(1);
        page.ajaxPost(value,1);
        $("#shTab").show();
        $("#tr_sqrScore").show();  //确认分数显示
        if($("#sstatus").val()=="单位级别档案"){
            $(".tr_corp").hide();
        }else{
            $(".tr_corp").show();
        }
        $('#activity-dialog').dialog({
            title:"审核档案",
            height:500
        });
        $("#sresultY").removeAttr("disabled");
        $("#sresultN").removeAttr("disabled");
        $("#sqrScore").numberbox("enable", true);
        $("#sshRemark").removeAttr("disabled");
        $("#activity-dialog").dialog("open");
    },
    canlHandle:function (value) {
        $$msg.confirm("确实要取消审核该记录吗？", function (isOk) {
            if (!isOk) return;
            $$msg.showWait("正在处理，请稍候...");
            coco.utils.ajaxPostData("custom.vm?actionType=canl", {id:value}, function (data) {
                if (data.state) {
                    coco.utils.msg.slideMsg("取消审核成功！");
                    $("#activity-dialog").dialog("close");
                    page.query();
                } else {
                    coco.utils.msg.slideMsg(data.msg);
                }
                $$msg.closeWait();
            });
        });
    },
    ckFormatter:function (value, rowData, rowIndex) {
        var s = "";
        s += "<a href='###' class='coco_opt' onclick=page.showHandle('" + value + "')>[详细]</a>";
        if (rowData.isSh == "NO") {
            s += "<a href='###' class='coco_opt' onclick=page.shHandle('" + value + "')>[审核]</a>";
        } else {
            s += "<a href='###' style='color: blue' class='coco_opt' onclick=page.canlHandle('" + value + "')>[取消审核]</a>";
        }
        return s;
    },
    formatterQrScore:function (value, rowData, rowIndex) {
        if (value == "0") {
            return "";
        }
        return value;
    },
    moreSh:function () {
        var rows = $("#tbList").datagrid("getChecked");
        if (rows.length == 0) {
            coco.utils.msg.slideError("请选择要审核的档案！");
            return;
        }
        var ids = "";
        for (var i = 0; i < rows.length; i++) {
            ids = ids + rows[i].id + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        coco.utils.ajaxPostData("custom.vm?actionType=saveMore", {ids:ids}, function (data) {
            if (data.state) {
                coco.utils.msg.slideMsg("审核成功！");
                page.query();
            } else {
                coco.utils.msg.slideMsg(data.msg);
            }
        });
    }
});
function initActivityDialog() {
    $('#activity-dialog').dialog({
        title:'审核档案',
        height:550,
        width:500,
        resizable:true,
        closed:true,
        iconCls:'icon-save',
        modal:true,
        buttons:[
            {
                text:'确认',
                iconCls:'icon-ok',
                handler:function () {
                    if ($("#sissh").val() == "NO" && $("#stat").val() == 1) {
                        var sresult = "";
                        if ($("#sresultY").prop("checked")) {
                            sresult = "YES";
                        }
                        if ($("#sresultN").prop("checked")) {
                            sresult = "NO";
                        }
                        if (sresult == "") {
                            coco.utils.msg.slideError("请选择审核结果！");
                            return;
                        }
                        var sqrScore = coco.utils.math.AmountToNumber($("#sqrScore").numberbox("getValue"));
                        var limit = $("#sscoreLimit").val();
                        var limits = limit.split("~");
                        var bg = coco.utils.math.AmountToNumber(limits[0]);
                        var ed = coco.utils.math.AmountToNumber(limits[1]);
                        if (sqrScore < bg || sqrScore > ed) {
                            coco.utils.msg.slideError("请输入有效的确认分数！");
                            return;
                        }
                        coco.utils.ajaxPostData("custom.vm?actionType=save",
                            {id:$("#id").val(), sresult:sresult, sqrScore:sqrScore, sshRemark:$("#sshRemark").val()},
                            function (data) {
                                if (data.state) {
                                    coco.utils.msg.slideMsg("审核成功！");
                                    $("#activity-dialog").dialog("close");
                                    page.query();

                                } else {
                                    coco.utils.msg.slideMsg(data.msg);
                                }
                            }
                        );
                    } else {
                        $("#activity-dialog").dialog("close");
                    }
                }
            },
            {
                text:'取消',
                iconCls:'icon-cancel',
                handler:function () {
                    $("#activity-dialog").dialog("close");
                }
            }
        ]
    });
}
