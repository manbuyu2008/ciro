var levelCombo;
var selfPage = $.extend(selfPage, {
    init: function () {
        //自评等级
        levelCombo = coco.plugin.list.evalLevelList({
            listId: "selfLv",
            canEmpty: false,
            required: true
        });
        levelCombo.setEnabled(false);
        //if (listSelfEdit) {
        //    levelCombo.setEnabled(true);
        //}
        $("#selfScore").blur(function () {
            selfPage.changeSelfLevel($("#selfScore").val())
        });
        if(!listSelfEdit){
            //设置input不可编辑
            $(".selfTr input").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
            //设置textarea不可编辑
            $(".selfTr textarea").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
        }
    },
    changeSelfLevel: function (data) {
        for (var x = 0; x < evalLevelList.length; x++) {
            var bean = evalLevelList[x];
            if (bean.beginScore <= data && bean.endScore >= data) {
                levelCombo.setValue(bean.id);
                return;
            }
        }
    },
    //移除行的方法
    delete_row: function (id) {
        var str = "";
        if ($("#del_id").attr("value") !== null && $("#del_id").attr("value") !== "") {
            str = $("#del_id").attr("value") + "-";
        }
        if ($("#gr" + id).attr("value") !== null && $("#gr" + id).attr("value") !== "") {
            $("#del_id").val(str + $("#gr" + id).attr("value"));
        }
        $("#tr" + id).remove();
        var len = $("#Table1 tr[id^=tr]").length;
        if (len <= 0) {
            $("#allrow").val(0);
        } else {
            var k = 0;
            k = $("#Table1 tr[id^=tr]:last").attr("id").substring(2, 8);
            $("#allrow").val(k); //现有记录行数
        }

    },

//建立一个函数build_row用于新增一行
    build_row: function () {
        var i = 5;
        var j = 0;
        var j = $("#Table1 tr[id^=tr]").length;
        if (j > 0) {
            i = parseInt($("#Table1 tr[id^=tr]:last").attr("id").substring(2, 8)) + 1;
        }

        var stradd = "<tr id='tr" + i + "' style='height: 25px;'>  "
            + "<td width='15%'> <input id='gr" + i + "' name='gr" + i + "' type='hidden' value=''/> "
            + "<input id='grsj" + i + "' name='grsj" + i + "' class='vp_input_100_100' type='text' value=''></td> "
            + "<td width='55%'><input id='grxx" + i + "'  name='grxx" + i + "' class='vp_input_100_100'  "
            + "value=''  type='text'/></td>"
            + "<td width='20%'><input id='grxs" + i + "' name='grxs" + i + "' class='vp_input_100_100'  "
            + "value='' type='text'/> </td>"
            + "<td width='10%'><a href='#' onclick='selfPage.delete_row(" + i + ")'>删除</a></td></tr>";
        if (j > 0) {
            var tr_last = $("#Table1 tr[id^=tr]:last").attr("id");
            $("#" + tr_last).after(stradd);
        } else {
            $("#title").after(stradd);
        }
        $("#allrow").val(i);  //现有记录行数
    },
    makeTableZp: function (dcId,kpType,adviceId) {
        var dataParams = {data: $$json.stringify({"did":dcId,"status":kpType})};
        $('#tb_test').datagrid({
            nowrap: true,
            fit: true,
            autoRowHeight: false,
            striped: true,
            fitColumns: true,
            singleSelect: true,
            rownumbers: true,
            collapsible: true,
            url: pageParam.CONTEXT_PATH+'/eval/evalComment/data.vm',
            queryParams: dataParams,
            remoteSort: false,
            onDblClickRow: function (rowIndex, rowData) {
                $('#'+adviceId).val(rowData.comment);
                $("#tb_test").datagrid("clearSelections");
                $("#m_test").dialog('close');
            },
            columns: [[
                {field: "name", title: "评语模板名称", width: 80, resizable: true, sortable: true, align: "left"},
                {field: "didName", title: "考评等级", width: 80, resizable: true, sortable: true, align: "left"},
                {field: "statusName", title: "考评环节", width: 80, resizable: true, sortable: true, align: "left"},
                {field: "comment", title: "评语", width: 180, resizable: true, sortable: true, align: "left"}
            ]]
        });
    },


    getZpInfo: function () {
        var zpdc = dcstandarCombo.getValue();
        if (zpdc == null || zpdc == "") {
            coco.utils.msg.alert("请选择自评等次");
            return;
        }
        var personTypeId = $("#personTypeId").val();
        if (personTypeId == null || personTypeId == "") {
            coco.utils.msg.alert("没有获取到人员考评类型");
            return;
        }
        /* var param={
         dcId:"DJ01",
         personType:"13450833052100100",
         kpType:"1"
         }  */
        selfPage.makeTableZp(zpdc, personTypeId, "1");
        $("#m_test").show();
        coco.page.dom.openIframeDialog({
            divId: "m_test", title: "评语模板", width: 600, height: 400,
            disable_close_button: true
        });
    }
})