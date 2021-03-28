package cc.water.ciro.system.comboController;

import cc.water.ciro.common.controller.TreeComboController;
import cc.water.ciro.common.service.ITreeComboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Administrator on 2016/11/27.
 */
@Controller
@RequestMapping("/admin/menu/")
public class MenuTreeComboController extends TreeComboController {

    @Autowired @Qualifier("menuTreeComboService")
    private ITreeComboService menuComboService;

    @RequestMapping("treeCombo/comboData.json")
    @ResponseBody
    public void comboData(HttpServletRequest request, HttpServletResponse response, Model model) {
              super.comboData(context,model, menuComboService);
    }

    @RequestMapping("treeCombo/findTextsById.json")
    @ResponseBody
    public void findTextsById(HttpServletRequest request, HttpServletResponse response, Model model) {
        super.findTextsById(context,model, menuComboService);
    }

    @RequestMapping("treeCombo/findIdByContent.json")
    @ResponseBody
    public void findIdByContent(HttpServletRequest request, HttpServletResponse response, Model model) {
        super.findIdByContent(context,model, menuComboService);
    }

    @RequestMapping("treeCombo/findParentNodeIdArray.json")
    @ResponseBody
    public void findParentNodeIdArray(HttpServletRequest request, HttpServletResponse response, Model model) {
        super.findParentNodeIdArray(context,model, menuComboService);
    }
}
