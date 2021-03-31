//设置登录窗口
function openPwd() {
    $('#pwd_chg').dialog({
        title: '修改密码',
        width: 300,
        modal: true,
        closed: true,
        resizable: false,
        buttons: [
            {
                text: '确认',
                handler: function () {
                    serverLogin();
                }
            },
            {
                text: '取消',
                handler: function () {
                    $('#pwd_chg').dialog('close');
                }
            }
        ]
    });
}

//修改密码
function serverLogin() {
    var $oldpass = $('#txtOldPass');
    var $newpass = $('#txtNewPass');
    var $rePass = $('#txtRePass');
    if ($oldpass.val() == '') {
        coco.utils.msg.msgShow('系统提示', '请输入旧密码！', 'error');
        return false;
    }
    if ($newpass.val() == '') {
        coco.utils.msg.msgShow('系统提示', '请输入密码！', 'error');
        return false;
    }
    if ($rePass.val() == '') {
        coco.utils.msg.msgShow('系统提示', '请在一次输入密码！', 'error');
        return false;
    }

    if ($newpass.val() != $rePass.val()) {
        coco.utils.msg.msgShow('系统提示', '两次密码不一至！请重新输入', 'error');
        return false;
    }
    var rtdata = coco.utils.ajaxPost("doChgPwd.json", {
        txtOldPass: $$str.encode64($oldpass.val()),
        txtNewPass: $$str.encode64($newpass.val()),
        txtRePass: $$str.encode64($rePass.val())
    });
    var state = rtdata.state;
    var result = rtdata.result;
    var message = rtdata.message;
    if (state) {
        $oldpass.val("");
        $newpass.val("");
        $rePass.val("");
        coco.utils.msg.slideMsg("恭喜，密码修改成功");
        $('#pwd_chg').dialog('close');
    } else {
        if (result == "user") {
            alert(message);
            window.location = "/login/login.vm";
            return false;
        } else if (result == "error") {
            coco.utils.msg.error(message);
            return false;
        }
        alert(message);
        return false;
    }
}

$(function () {
    var selfPanel =  $("#selfPanel").panel({
        height: 300,
        fit: false,
        maximized: true,
        collapsible: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        tools: [
            {
                iconCls: 'icon-reload',
                handler: function () {
                    query("tbListSelf");
                }
            },
            {
                iconCls: 'icon-redo',
                handler: function () {
                    window.top.addTab("个人自评", "/eval/evalBaseInfo/listSelf.vm");
                }
            }],
        onOpen: function () {
            setTimeout(function(){
                query("tbListSelf");
            },700);

        },
        onBeforeOpen: function () {
            initSelfPanel();
        }
    });

    var ksPanel =  $("#ksPanel").panel({
        height: 300,
        fit: false,
        maximized: true,
        collapsible: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        tools: [
            {
                iconCls: 'icon-reload',
                handler: function () {
                    query("tbListKs");
                }
            },
            {
                iconCls: 'icon-redo',
                handler: function () {
                    window.top.addTab("科室考评", "/eval/evalBaseInfo/listKs.vm");
                }
            }],
        onOpen: function () {
            setTimeout(function(){
                query("tbListKs");
            },900);
        },
        onBeforeOpen: function () {
            initKsPanel();
        }
        //onBeforeClose:function(){
        //    alert("onBeforeClose");
        //},
        //onClose:function(){
        //    alert("onClose");
        //}

    });
    var dksPanel =  $("#dksPanel").panel({
        height: 300,
        fit: false,
        maximized: true,
        collapsible: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        tools: [
            {
                iconCls: 'icon-reload',
                handler: function () {
                    query("tbListDks");
                }
            },
            {
                iconCls: 'icon-redo',
                handler: function () {
                    window.top.addTab("大科总支考评", "/eval/evalBaseInfo/listDk.vm");
                }
            }],
        onOpen: function () {
            setTimeout(function(){
                query("tbListDks");
            },1100);

        },
        onBeforeOpen: function () {
            initDksPanel();
        }
    });

    var dwPanel =  $("#dwPanel").panel({
        height: 300,
        fit: false,
        maximized: true,
        collapsible: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        tools: [
            {
                iconCls: 'icon-reload',
                handler: function () {
                    query("tbListDw");
                }
            },
            {
                iconCls: 'icon-redo',
                handler: function () {
                    window.top.addTab("单位考评", "/eval/evalBaseInfo/listDw.vm");
                }
            }
        ],
        onOpen: function () {
            setTimeout(function(){
                query("tbListDw");
            },1300);

        },
        onBeforeOpen: function () {
            initDwPanel();
        }
    });

    $('#editpass').click(function () {
        openPwd();
        $('#pwd_chg').dialog('open');
    });
    $('#loginOut').click(function () {
        $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function (r) {
            if (r) {
                location.href = '/login/loginOut.vm';
            }
        });
    })
});
function query(tbId) {
    coco.eui.grid.setGridPageNumber(tbId, 1);
    $("#"+tbId).datagrid("reload");
}

function initSelfPanel() {
    var dataParams = {data: $$json.stringify({"portal":"1"})};
    $('#tbListSelf').datagrid({
        nowrap: false,
        fit: true,
        fitColumns: true,
        striped: true,
        url: '/eval/evalBaseInfo/dataSelf.vm',
        queryParams: dataParams,
        pageList: [20, 50, 100],
        pagination: false,
        rownumbers: false,
        columns: [
            [
                {field: "userId", title: "操作", width: 20, align: 'center', formatter: selfHandleFormatter, opt: true},
                {field: "selPeriodName", title: "考评期间", width: 30, sortable: true},
                {field: "selUserName", title: "姓名", width: 30, sortable: true}
            ]
        ]
    });
}

function initKsPanel() {
    var dataParams = {data: $$json.stringify({"portal":"1"})};
    $('#tbListKs').datagrid({
        nowrap: false,
        fit: true,
        fitColumns: true,
        striped: true,
        url: '/eval/evalBaseInfo/dataKs.vm',
        queryParams: dataParams,
        pageList: [20, 50, 100],
        pagination: true,
        rownumbers: true,
        columns: [
            [
                {field: "id", title: "操作", width: 20, align: 'center', formatter: ksHandleFormatter, opt: true},
                {field: "periodName", title: "考评期间", width: 30, sortable: true},
                {field: "ksName", title: "科室", width: 30, sortable: true},
                {field: "userName", title: "姓名", width: 30, sortable: true},
                {field: "statusName", title: "流程状态", width: 20, sortable: true}
            ]
        ]
    });
}

function initDksPanel() {
    var dataParams = {data: $$json.stringify({"portal":"1"})};
    $('#tbListDks').datagrid({
        nowrap: false,
        fit: true,
        fitColumns: true,
        striped: true,
        url: '/eval/evalBaseInfo/dataDk.vm',
        queryParams: dataParams,
        pageList: [20, 50, 100],
        pagination: true,
        rownumbers: true,
        columns: [
            [
                {field: "id", title: "操作", width: 20, align: 'center', formatter: dksHandleFormatter, opt: true},
                {field: "periodName", title: "考评期间", width: 30, sortable: true},
                {field: "ksName", title: "科室", width: 30, sortable: true},
                {field: "userName", title: "姓名", width: 30, sortable: true},
                {field: "statusName", title: "流程状态", width: 20, sortable: true}
            ]
        ]
    });
}

function initDwPanel() {
    var dataParams = {data: $$json.stringify({"portal":"1"})};
    $('#tbListDw').datagrid({
        nowrap: false,
        fit: true,
        fitColumns: true,
        striped: true,
        url: '/eval/evalBaseInfo/dataDw.vm',
        queryParams: dataParams,
        pageList: [20, 50, 100],
        pagination: true,
        rownumbers: true,
        columns: [
            [
                {field: "id", title: "操作", width: 20, align: 'center', formatter: dwHandleFormatter, opt: true},
                {field: "periodName", title: "考评期间", width: 30, sortable: true},
                {field: "ksName", title: "科室", width: 30, sortable: true},
                {field: "userName", title: "姓名", width: 30, sortable: true},
                {field: "statusName", title: "流程状态", width: 20, sortable: true}
            ]
        ]
    });
}

function selfHandleFormatter(value, rowData, rowIndex) {
    var periodId = rowData.periodId;
    var s = "";
    s += "<a href='###' class='vp_opt' onclick=editSelfEx('" + value + "','" + periodId + "')><font color='red'> [新增]</font></a>&nbsp;";
    return s;
}

//编辑
function editSelfEx(id,periodId) {
    var s = '/eval/evalBaseInfo/cardSelf.vm?id=&periodId='+periodId+'&t=' + Math.random();
    window.top.addTab("个人自评", s);
}

function dwHandleFormatter(value, rowData, rowIndex) {
    var s = "";
    s += "<a href='###' class='vp_opt' onclick=editDwEx('" + value + "')><font color='red'> [考评]</font></a>&nbsp;";
    return s;
}

//编辑
function editDwEx(id) {
    var s = "/eval/evalBaseInfo/cardDw.vm?id=" + id + "&t=" + Math.random();
    window.top.addTab("单位考评", s);
}

function dksHandleFormatter(value, rowData, rowIndex) {
    var maxStatus = bc_dks;
    var status = rowData.status;
    var note = status <= maxStatus ? "<font color='red'> [考评]</font>" : "[查看]";
    var s = "";
    s += "<a href='###' class='vp_opt' onclick=editDksEx('" + value + "')>" + note + "</a>&nbsp;";
    return s;
}

//编辑
function editDksEx(id) {
    var s = "/eval/evalBaseInfo/cardDk.vm?id=" + id + "&t=" + Math.random();
    window.top.addTab("大科总支考评", s);
}

function ksHandleFormatter(value, rowData, rowIndex) {
    var maxStatus = bc_ks;
    var status = rowData.status;
    var note = status <= maxStatus ? "<font color='red'> [考评]</font>" : "[查看]";
    var s = "";
    s += "<a href='###' class='vp_opt' onclick=editKsEx('" + value + "')>" + note + "</a>&nbsp;";
    return s;
}

//编辑
function editKsEx(id) {
    var s = "/eval/evalBaseInfo/cardKs.vm?id=" + id + "&t=" + Math.random();
    window.top.addTab("科室考评", s);
}
