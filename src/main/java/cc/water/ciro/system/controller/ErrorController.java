package cc.water.ciro.system.controller;

import cc.water.ciro.common.controller.BaseController;
import cc.water.ciro.system.domain.Permission;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController extends BaseController {
    @RequestMapping("/error404.vm")
    public String error404(Permission permission) {
        return "error404";
    }

    @RequestMapping("/error.vm")
    public String error(Permission permission) {
        return "error404";
    }


}
