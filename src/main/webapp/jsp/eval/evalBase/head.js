var ksTree, userCombo, sexCombo, cycleType;
var headPage = {
    init: function () {
        //科室
        ksTree = coco.plugin.tree.deptTree({
            treeId: "ks",
            value: $("#ks").val(),
            isOnlySelectLeaf: false,
            onChange: function (data) {
                if (userCombo) {
//                            userCombo.setValue("");
//                            userCombo.setDetpId(ksTree.getValue());
                }
            }
        });
        //人员
        userCombo = coco.plugin.list.userList({
            required: true,
            listId: "userId",
            value: $("#userId").val(),
//                    deptId:ksTree.getValue(),
            panelWidth: 400,
            onChange: function (data) {
                //var rtdata = vp.utils.ajaxPost("custom.vm?service=personZc&id=" + data, {data:vp.utils.json.stringify("")});
                //$("#zc").val(rtdata.zc);
                //sexCombo.setValue(rtdata.sex);
                //$("#nl").val(rtdata.age);
            }
        });
        sexCombo = coco.plugin.combo.comboSex({
            comboId: "sex",
            canEmpty: false,
            required: true
        });
        ksTree.setEnabled(false);
        userCombo.setEnabled(false);
        sexCombo.setEnabled(false);
    }
};