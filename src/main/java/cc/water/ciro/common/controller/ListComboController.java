package cc.water.ciro.common.controller;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.service.IComboService;
import org.springframework.ui.Model;

public class ListComboController extends BaseController {

    public void comboData(ActionContext context, Model model, IComboService comboService){
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

    public void findTextsById(ActionContext context, Model model, IComboService comboService){
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

	
}
