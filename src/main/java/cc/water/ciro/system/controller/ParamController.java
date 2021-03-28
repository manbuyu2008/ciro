package cc.water.ciro.system.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.util.EnumUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.system.domain.SysParamBean;
import cc.water.ciro.system.enums.ParamInitEnum;
import cc.water.ciro.system.service.ParamService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@org.springframework.stereotype.Controller
@RequestMapping("/admin/param/")
public class ParamController extends ListController<SysParamBean> {

    @Autowired
    private ParamService paramService;
    @Autowired
    final static String path = "eval/param/";


    @RequestMapping("card.vm")
    @RequiresPermissions("sysParam:edit")
    public String goEditView(Model model) {
        String checkEvent = paramService.getValueByName(ParamInitEnum.checkEvent.getCode());
        String unite = paramService.getValueByName(ParamInitEnum.unite.getCode());
        String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
        if (unite!=null&&unite.equals(BooleanEnum.YES.getCode())) {
            model.addAttribute("uniteCheck", "checked");
        } else {
            model.addAttribute("uniteCheck", "");
        }
        if (checkEvent!=null&&checkEvent.equals(BooleanEnum.YES.getCode())) {
            model.addAttribute("eventCheck", "checked");
        } else {
            model.addAttribute("eventCheck", "");
        }
        model.addAttribute("initScore", StringUtil.defaultIfNull(initScore,ParamInitEnum.initScore.getValue()));
        model.addAttribute("unite", StringUtil.defaultIfNull(unite,ParamInitEnum.unite.getValue()));
        model.addAttribute("checkEvent", StringUtil.defaultIfNull(checkEvent,ParamInitEnum.checkEvent.getValue()));
        return path + "editEvalParam";
    }

    @RequestMapping("save.vm")
    @RequiresPermissions("sysParam:edit")
    @ResponseBody
    public void save(Model model) {
        try {
            List<ParamInitEnum> list = EnumUtil.getEnumList(ParamInitEnum.class);
            for (ParamInitEnum paramInitEnum : list) {
                String value = context.getRequestParams().getStrIgnoreNull(paramInitEnum.getCode());
                SysParamBean sysParamBean = paramService.selectByName(paramInitEnum.getCode());
                sysParamBean.setValue(value);
                paramService.updateSysParam(sysParamBean);
            }
            setResult(true, "考评参数修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }


}
