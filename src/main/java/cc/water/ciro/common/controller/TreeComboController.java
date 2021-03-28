package cc.water.ciro.common.controller;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.service.ITreeComboService;
import org.springframework.ui.Model;

public class TreeComboController extends BaseController {

    public void comboData(ActionContext context, Model model, ITreeComboService comboService){
        comboService.setContext(context);
        try {
            comboService.combo();
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
        setResult(true, "获取数据成功");
    }

    public void findTextsById(ActionContext context, Model model, ITreeComboService comboService){
        comboService.setContext(context);
        try {
            comboService.getTextsById();
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
        setResult(true, "获取数据成功");
    }


    public void findIdByContent(ActionContext context, Model model, ITreeComboService comboService){
        comboService.setContext(context);
        try {
            comboService.getIdByContent();
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
        setResult(true, "获取数据成功");
    }

    public void findParentNodeIdArray(ActionContext context, Model model, ITreeComboService comboService){
        comboService.setContext(context);
        try {
            comboService.findParentNodeIdArray();
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
        setResult(true, "获取数据成功");
    }
}
