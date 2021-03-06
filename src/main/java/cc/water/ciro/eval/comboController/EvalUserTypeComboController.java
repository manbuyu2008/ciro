package cc.water.ciro.eval.comboController;

import cc.water.ciro.common.controller.ListComboController;
import cc.water.ciro.common.service.IComboService;
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
@RequestMapping("/eval/userType/")
public class EvalUserTypeComboController extends ListComboController {

    @Autowired @Qualifier("userTypeComboService")
    private IComboService userTypeComboService;

    @RequestMapping("combo/comboData.json")
    @ResponseBody
    public void comboData(HttpServletRequest request, HttpServletResponse response, Model model) {
              super.comboData(context,model,userTypeComboService);
    }

    @RequestMapping("combo/findTextsById.json")
    @ResponseBody
    public void findTextsById(HttpServletRequest request, HttpServletResponse response, Model model) {
        super.findTextsById(context,model,userTypeComboService);
    }

}
