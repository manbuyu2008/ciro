package cc.water.ciro.system.controller;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.controller.BaseController;
import cc.water.ciro.common.utils.Constant;
import cc.water.ciro.common.utils.MD5;
import cc.water.ciro.common.utils.ResponseUtils;
import cc.water.ciro.common.utils.VerifyCodeUtils;
import cc.water.ciro.config.CommonConfig;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.enums.LoginFlagEnum;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.UserService;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

@Controller
@RequestMapping("/login")
public class LoginController extends BaseController {
    @Autowired
    private UserService userService;

    @Autowired
    private LoginHelper loginHelper;
    @Autowired
    SystemConfig systemConfig;
    @Autowired
    CommonConfig commonConfig;

    final static String  path = "sys/login/";

    @RequestMapping("login.vm")
    public String login(HttpServletRequest request, HttpServletResponse response, Model model) {
        Subject currentUser = SecurityUtils.getSubject();
        if (currentUser.getPrincipal() != null) {
            return "redirect:/admin/index.vm";
        }
        return path+"login";
    }

    @RequestMapping(value = "report.vm", method = RequestMethod.GET)
    public String report(Model model) {
        UserQuery userQuery = new UserQuery();
        userQuery.setPageSize(999);
        java.util.List<User> userList = userService.findList(userQuery);
        // 报表数据源
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(userList);
        // 动态指定报表模板url
        model.addAttribute("url", "/report/MvcIReportExample2.jasper");
        model.addAttribute("format", "pdf"); // 报表格式
        model.addAttribute("jrMainDataSource", jrDataSource);
        model.addAttribute("personName", "李丹丹");
        return "reportView"; // 对应jasper-views.xml中的bean id
    }

    /**
     * 用户注销
     *
     * @return
     */
    @RequestMapping("loginOut.vm")
    public String doLoginOut(Model model) {
        //shiro销毁登录
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return path+"login";
    }

    @RequestMapping("userLogin.vm")
    @ResponseBody
    public void userLogin() throws Exception {
        //shiro管理的session
        Subject currentUser = SecurityUtils.getSubject();
        Session session = currentUser.getSession();
        boolean isCode = commonConfig.getUseVerifyCode();
        if (isCode && session.getAttribute(Constant.SESSION_VALIDATE_CODE) == null) {
            returnErrorMsg("code", "验证码已失效");
            return;
        }
        String randomcode = (request.getParameter("verifyCode")).toLowerCase();
        String password = decodeJsStr(request.getParameter("pwd"));
        String username = decodeJsStr(request.getParameter("userCode"));
        String validateCode = "";
        if (isCode) {
            validateCode = ((String) session.getAttribute(Constant.SESSION_VALIDATE_CODE)).toLowerCase();        //获取session中的验证码
        }
        if (isCode && validateCode != null && randomcode != null && !validateCode.equals(randomcode)) {
            returnErrorMsg("code", "验证码输入错误");
            return;
        } else {
            User user = userService.getUserByUsername(username);
            if (user == null) {
                returnErrorMsg("user", "用户名或密码错误");
                return;
            }
            if (!user.getFlag().equals(LoginFlagEnum.NORMAL.getCode())) {
                returnErrorMsg("user", "对不起，你的用户已被锁定！请联系管理员");
                return;
            }
            String salt = user.getSalt();
            //shiro加入身份验证
            Subject subject = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password + CoreConsts.PWD_ENCODE_STRING + salt);
            try {
                subject.login(token);
                returnSuccessMsg("success", "登录成功");
                loginHelper.unlockUser(user);
            } catch (IncorrectCredentialsException e) {
                if (user.getErrorCount() + 1 > systemConfig.getErrorCountPwd()) {
                    loginHelper.lockUser(user);
                } else {
                    loginHelper.userErrorCount(user);
                }
                returnErrorMsg("pwd","密码输入错误" + user.getErrorCount() + "次,超过" + systemConfig.getErrorCountPwd() + "次将被锁定");
                return;
            } catch (AuthenticationException e) {
                returnErrorMsg("pwd",e.getMessage());
                return;
            }
        }


    }

    /**
     * 给man端使用登陆接口
     */
    @RequestMapping("manLogin.vm")
    public void manLogin() {
        Subject currentUser = SecurityUtils.getSubject();
        Session session = currentUser.getSession();
        String password = request.getParameter("password");
        String usernmae = request.getParameter("username");
        Subject subject = SecurityUtils.getSubject();
        String passwordMd5 = new MD5().getMD5ofStr(password);
        UsernamePasswordToken token = new UsernamePasswordToken(usernmae, password);
        try {
            subject.login(token);
            ResponseUtils.renderJson(response, backSuccessJson("success", "登录成功"));
        } catch (AuthenticationException e) {
            ResponseUtils.renderJson(response, backSuccessJson("usererror", "用户名或密码错误"));
        }
    }

    @RequestMapping("verifyCode.vm")
    public void verifyCode() {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        String verifyCode = VerifyCodeUtils.generateVerifyCode(4);
        int w = 200, h = 80;
        Subject currentUser = SecurityUtils.getSubject();
        Session session = currentUser.getSession();
        session.setAttribute(Constant.SESSION_VALIDATE_CODE, verifyCode);
        try {
            VerifyCodeUtils.outputImage(w, h, output, verifyCode);
            ServletOutputStream out = response.getOutputStream();
            output.writeTo(out);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private String drawImg(ByteArrayOutputStream output) {
        String code = "";
        for (int i = 0; i < 4; i++) {
            code += randomChar();
        }
        int width = 70;
        int height = 25;
        BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR);
        Font font = new Font("Times New Roman", Font.PLAIN, 20);
        Graphics2D g = bi.createGraphics();
        g.setFont(font);
        Color color = new Color(66, 2, 82);
        g.setColor(color);
        g.setBackground(new Color(226, 226, 240));
        g.clearRect(0, 0, width, height);
        FontRenderContext context = g.getFontRenderContext();
        Rectangle2D bounds = font.getStringBounds(code, context);
        double x = (width - bounds.getWidth()) / 2;
        double y = (height - bounds.getHeight()) / 2;
        double ascent = bounds.getY();
        double baseY = y - ascent;
        g.drawString(code, (int) x, (int) baseY);
        g.dispose();
        try {
            ImageIO.write(bi, "jpg", output);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return code;
    }

    private char randomChar() {
        Random r = new Random();
        String s = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";
        return s.charAt(r.nextInt(s.length()));
    }

}
