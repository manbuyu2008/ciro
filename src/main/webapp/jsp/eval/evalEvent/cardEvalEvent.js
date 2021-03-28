var userCombo;
var eventDate;
var deptTree;
var shType;
var bzCombo;
var typeId;
var result;
var params = {};
var copy_dept;
var
    page = $.extend(page, {
        _init: function () {
            $('#form').form('load', pageParam.jsonObject);
            $("#fileId").uploadify({
                'auto': true, //是否自动上传
                'buttonText': '文件上传',//按钮上的文字
                'swf': '/resources/js/uploadify/uploadify.swf?t=' + (new Date()).getTime(),  //引入uploadify.swf
                'uploader': '/front/file/fileUpload.vm;jsessionid=' + jsessionid,//请求路径
                'queueID': 'fileQueue',//队列id,用来展示上传进度的
                'width': '75',  //按钮宽度
                'height': '24',  //按钮高度
                'preventCaching': true,
                'queueSizeLimit': 8,  //同时上传文件的个数
                'uploadLimit': 8,
                'fileTypeDesc': '文件',    //可选择文件类型说明
                removeTimeout: 1,
                'multi': true,  //允许多文件上传
                'fileSizeLimit': '10MB', //设置单个文件大小限制
                'fileObjName': 'fileId',  //<input type="file"/>的name
                'method': 'post',
                'formData': {'userId': userId}, //动态传参
                'removeCompleted': false,//上传完成后自动删除队列
                'onFallback': function () {
                    alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
                },
                //每次初始化一个队列是触发
                'onInitEx': function (swfuploadify, swfUploadSettings) {
                    var file = fileInitList;
                    swfuploadify.settings.initSize = file.length;
                    for (var i = 0; i < file.length; i++) {
                        swfUploadSettings.file_queued_handler_ex(file[i], swfuploadify);
                        $('#' + file[i].id).find('.cancel').append("<input type='hidden' id='" + file[i].id + "_value' name='fileValue' value='" + file[i].id + "'/>");
                        $('#' + file[i].id).find('.data').html("- 上传成功 <a target='_blank' href='/front/file/fileDown.vm?fileId=" + file[i].id + "' style='color:red;font-family:楷体;font-size:14px;'>[下载]</a>");
                    }
                },
                //删除时触发 新增删除记录 修改等保存再删除
                'onCancel': function (file) {
                    $$msg.showWait("正在删除，请稍候...");
                    var fileValue = $('#' + file.id + '_value').val();
                    if (fileValue != "" && $("#id").val() == "") {
                        $.ajax({
                            type: "POST",
                            async: false,
                            url: '/front/file/fileDel.vm;jsessionid=' + jsessionid,//请求路径
                            data: {fileId: fileValue},
                            success: function (data) {
                                if (data.state) {
                                    file.state = true;
                                    //$$msg.slideMsg("删除附件成功！");
                                } else {
                                    file.state = false;
                                    $$msg.slideError(data.msg);
                                }
                                $$msg.closeWait();
                            },
                            dataType: "json"
                        });
                    } else {
                        file.state = true;
                        $$msg.closeWait();
                    }
                },
                //上传成功
                'onUploadSuccess': function (file, data, response) {
                    var dataJson = $.parseJSON(data);
                    if (dataJson.state) {
                        file.fileId = dataJson.fileId
                        $('#' + file.id).find('.data').html("- 上传成功 <a href='/front/file/fileDown.vm?fileId=" + dataJson.fileId + "' target='_blank' style='color:red;font-family:楷体;font-size:14px;'>[下载]</a>");
                        $('#' + file.id).find('.cancel').append("<input type='hidden' id='" + file.id + "_value' name='fileValue' value='" + dataJson.fileId + "'/>");
                    } else {
                        $('#' + file.id).find('.data').html("- <span style='color:red;font-family:楷体;font-size:14px;'>上传失败：" + dataJson.msg + "</span>");
                        $('#' + file.id).find('.uploadify-progress-bar').css('width', '0%');
                    }
                }
            });


            eventDate = $("#eventDate").datebox({
                required: true
            });
            deptTree = coco.plugin.tree.deptTree({
                treeId: "ksId",
                canEmpty: false,
                panelWidth: 400,
                isOnlySelectLeaf: true,
                hasDefRoot: false,
                required: true,
                onChange: function (data) {
                    if (userCombo) {
                        userCombo.setValue("");
                        userCombo.setDept(data);
                    }
                }
            });
            userCombo = coco.plugin.list.userList({
                listId: "userId",
                panelWidth: 400,
                required: true,
                canEmpty: false,
                value: $("#userId").val(),
                onOpen: function (data) {
                    if (deptTree) {
                        userCombo.setDept(deptTree.getValue());
                    }
                }
            });
            //考核类型
            shType = coco.plugin.combo.shType({
                comboId: "status",
                required: true,
                panelWidth: 400,
                canEmpty: false,
                value: $("#status").val(),
                disabled: true,
                onChange: function (data) {
                    if (data == "dw") {
                        $("#tr_score").hide();
                        $("#score_span").hide();
                    } else {
                        $("#tr_score").show();
                        $("#score_span").show();
                    }
                    bzCombo.setValue("");
                    bzCombo.reload();
                }
            });
            //事件分类
            typeId = coco.plugin.combo.jjf({
                comboId: "typeId",
                panelWidth: 400,
                canEmpty: false,
                required: true,
                onChange: function (data) {
                    if (bzCombo) {
                        bzCombo.setStatus(data);
                    }
                }
            });
            if (isSh == "YES") {
                result = coco.plugin.combo.evalCheck({
                    canEmpty: true,
                    comboId: "shResult"
                });
                $(".shMes").show();
                if (result.getValue() == 1) {
                    $("#tr_sqrScore").hide();
                }
            } else {
                $(".shMes").hide();
            }
            if (shType.getValue() == "dw") {
                $("#typeId").val("2");
                $("#type_span").hide();
                $("#tr_score").hide();
                $("#score_span").hide();
            } else {
                $("#type_span").show();
                $("#tr_score").show();
                $("#score_span").show();
            }
            //标准选择
            bzCombo = coco.plugin.list.evalStdList({
                listId: "stdId",
                value: $("#stdId").val(),
                status: $("#typeId").val(),
                eventType: "NORMAL",
                canEmpty: false,
                required: true,
                onSelect: function (rowIndex, rowData) {
                    $("#eventName").val(rowData.name);
                    $("#begin").val(rowData.beginScore);
                    $("#end").val(rowData.endScore);
                    $("#score").val(rowData.beginScore);

                }
            });
        },
        //返回列表
        list: function () {
            var status = $("#status").val();
            var data = $$json.stringify({
                status: "" + status,
                pageSize: "" + pageParam.pageSize,
                pageNumber: "" + pageParam.pageNumber,
                queryParams: $$json.stringify(pageParam.queryParams)
            });
            coco.page.model.list(data);
        },
        //保存校验
        checkValid: function () {
            if ($("#begin").val().toDouble() > $("#score").val().toDouble() || $("#end").val().toDouble() < $("#score").val().toDouble()) {
                coco.utils.msg.slideMsg("分值必须在标准分范围内");
                return false;
            }
            return true;
        },
        copyCheck: function (persons_value) {
            $.post("custom.vm?actionType=copyCheck", {
                    selIds: persons_value,
                    id: $('#id').val(),
                    hasId: $('#hasId').val()
                },
                function (data) {
                    if (!data.state) {
                        coco.utils.msg.slideError(data.msg)
                    } else {
                        var temp = eval("(" + data.data + ")");
                        if (temp.data) {
                            coco.utils.msg.confirm(temp.deptName + " " + temp.name + "在当天已经存在该标准的事件,是否继续保存？", function (data) {
                                if (data) {
                                    var hasId = $('#hasId').val() + "," + temp.id;
                                    $('#hasId').val(hasId);
                                    page.copyCheck(persons_value);
                                } else {
                                    $('#hasId').val("");
                                }
                            });
                        } else {
                            coco.utils.ajaxPostData("custom.vm?actionType=copySave", {
                                selIds: persons_value,
                                id: $('#id').val()
                            }, function (data) {
                                if (data) {
                                    coco.utils.msg.alert("操作成功");
                                    $('#sh_dialog').dialog('close');
                                    page.listHandle();
                                } else {
                                    coco.utils.msg.slideError("操作失败");
                                }
                            });
                        }
                    }
                }, "json"
            );
        },
        copyHandle: function () {
            if ($('#id').val() == "") {
                coco.utils.msg.slideError("请先保存档案数据！");
                return;
            }
            if (!params.dept_inited) {
                params.dept_inited = true;
                $('#sh_dialog').dialog({
                    title: "选择人员",
                    height: 400,
                    width: 700,
                    closed: true,
                    closable: false,
                    modal: true,
                    resizable: true,
                    buttons: [
                        {
                            text: '确认',
                            iconCls: 'icon-ok',
                            handler: function () {
                                var selectPersons = $('#per_grid').datagrid("getSelections");
                                var persons_value = "";
                                if (selectPersons.length == 0) {
                                    coco.utils.msg.alert("请选择相应人员！");
                                    return;
                                }
                                for (var i = 0; i < selectPersons.length; i++) {
                                    persons_value = persons_value + "," + selectPersons[i].id
                                }
                                persons_value = persons_value.substr(1);
                                page.copyCheck(persons_value);
                            }
                        },
                        {
                            text: '取消',
                            iconCls: 'icon-cancel',
                            handler: function () {
                                $('#sh_dialog').dialog('close');
                            }
                        }
                    ],
                    onOpen: function () {
                        copy_dept = coco.plugin.tree.deptOutTree({      //整个树
                            treeId: "deptId",
                            status: "1",
                            canEmpty: false,
                            multiple: true,
                            checkbox: true,
                            isOnlySelectLeaf: false,
                            onCheck: function () {
                                var nodes = $('#deptId').tree('getChecked');
                                var nodes_value = "";
                                if (nodes.length == 0) {
                                    nodes_value = ",#";
                                } else {
                                    for (var i = 0; i < nodes.length; i++) {
                                        var node = {
                                            id: nodes[i].id,
                                            name: nodes[i].text
                                        };
                                        nodes_value = nodes_value + "," + node.id;
                                    }
                                }
                                nodes_value = nodes_value.substr(1);
                                $("#nodes").val(nodes_value);
                                $('#per_grid').datagrid('reload', {dept: nodes_value});
                            }
                        });
                        var node = $('#deptId').tree('find', '');
                        if (node) {
                            $('#deptId').tree('update', {
                                target: node.target,
                                text: '全选'
                            });
                        }
                        //人员
                        $('#per_grid').datagrid({
                            fit: true,
                            fitColumns: true,
                            nowrap: false,
                            striped: true,
                            collapsible: false,
                            pagination: true,
                            rownumbers: false,
                            idField: "id",
                            url: coco.utils.getFullUrl("/admin/user/combo/comboData.json"),
                            queryParams: {dept: '#'},
                            columns: [
                                [
                                    {field: 'deptName', title: '部门名称', width: 200},
                                    {field: 'username', title: '编码', width: 100},
                                    {field: 'name', title: '名称', width: 200},
                                    {field: 'id', title: '选择', checkbox: true}
                                ]
                            ]
                        });
                    }
                });
            }
            $('#sh_dialog').dialog("open");

        },
        //从json对象给页面输入框赋值
        loadData: function (data) {
            $("#id").val(data["id"]);
            $("#code").val(data["code"]);
            $("#name").val(data["name"]);
        }
    });

