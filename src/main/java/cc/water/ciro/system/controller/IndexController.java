package cc.water.ciro.system.controller;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.controller.BaseController;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.PubUtil;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.system.domain.ActiveUser;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

@Controller
public class IndexController extends BaseController{
	@Autowired
	private SystemConfig systemConfig;
	@Autowired
	private UserService userService;

	final static String  path = "sys/index/";

	@RequestMapping("/admin/index.vm")
	public String index(Model model){
		Subject subject = SecurityUtils.getSubject();
		ActiveUser activeUser = (ActiveUser) subject.getPrincipal();
		model.addAttribute("corpName", systemConfig.getCorpName());
		model.addAttribute("activeUser", activeUser);
		return path+"index";
	}
	@RequestMapping("/admin/doChgPwd.json")
	@ResponseBody
	public void doChgPwd(HttpServletRequest request, HttpServletResponse response, Model model){
		try {
			Subject subject = SecurityUtils.getSubject();
			ActiveUser activeUser = (ActiveUser) subject.getPrincipal();
			Long userId = activeUser.getUserid();
			String password = decodeJsStr(request.getParameter("txtOldPass"));
			String password1 = decodeJsStr(request.getParameter("txtNewPass"));
			String password2 = decodeJsStr(request.getParameter("txtRePass"));
			User user = userService.getUserByKey(userId);
			String oldPassword = new SimpleHash("md5",password + CoreConsts.PWD_ENCODE_STRING + user.getSalt(),(Object)null,2).toHex();
			if(!user.getPassword().equals(oldPassword)){
                 returnErrorMsg("errorOld", "旧密码输入错误！");
                return;
            }
			if(PubUtil.isEmpty(password1)||PubUtil.isEmpty(password2)){
                 returnErrorMsg("error", "修改密码不能为空！");
				return;
            }
			int pwdLen =  systemConfig.getPwdLen();    /*密码最小长度*/
			if(password1.length()<pwdLen||password1.length()<pwdLen){
                 returnErrorMsg("error", "密码不能小于"+pwdLen+"位！");
				return;
            }
			if(!password1.equals(password2)){
                 returnErrorMsg("error", "两次密码不相同！");
				return;
            }
			String salt = NumberUtil.randomLetter();
			user.setSalt(salt);
        /*默认密码*/
			String newPassword = new SimpleHash("md5",password1 + CoreConsts.PWD_ENCODE_STRING + user.getSalt(),(Object)null,2).toHex();
			user.setPassword(newPassword);
			userService.updateUser(user);
			 returnSuccessMsg("success", "密码修改成功！");
			return;
		} catch (Exception e) {
			 returnErrorMsg("error", "密码修改失败！");
			return;
		}
	}

	@RequestMapping("/admin/ret.vm")
	public String ret(HttpServletRequest request, HttpServletResponse response, Model model) throws UnsupportedEncodingException {
		String msg  = new String(request.getParameter("msg").toString().getBytes("iso8859-1"),"UTF-8") ;
		model.addAttribute("msg",msg);
		return "save_result";
	}
	/**
	 * 进入首页后的默认页面
	 * @return
	 */
	@RequestMapping("/admin/default.vm")
	public String defaultPage(){
		return "system/default";
	}
	
}
