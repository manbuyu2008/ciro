package cc.water.ciro.common.controller;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.utils.EncodeUtil;
import cc.water.ciro.common.utils.ResponseUtils;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.config.serivce.CommonParamService;
import cc.water.ciro.system.domain.ActiveUser;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

@Controller
public class BaseController {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    protected HttpServletRequest request;

    protected HttpServletResponse response;
    @Autowired
    protected CommonParamService commonParamService;

    protected ActionContext context = new ActionContext();

    @ModelAttribute
    public void setReqAndResp(HttpServletRequest request, HttpServletResponse response, Model model) throws UnsupportedEncodingException {
        this.request = request;
        this.response = response;
        Map<String, String> map = commonParamService.getSysParameters();
        model.addAllAttributes(map);
        String data = request.getParameter("data");
        if(UtilPub.isNotEmpty(data)) {
             data = URLDecoder.decode(data, "utf-8");
        }
        context.setRequest(request);
        context.setResponse(response);
        context.setDataParam(data);
        model.addAttribute("data", context.getRequestParams());
        /*保存用户缓存信息到context*/
        try {
            Subject subject = SecurityUtils.getSubject();
            ActiveUser activeUser = (ActiveUser) subject.getPrincipal();
            context.setActiveUser(activeUser);
            model.addAttribute("skin", activeUser.getUser().getSkin());
        }catch (Exception e){

        }

    }


    public PageMap getMap() {
        return context.getResponseParams();
    }


    /**
     * 设总页数
     *
     * @param total
     */
    protected void setTotal(int total) {
        context.getResponseParams().put("total", total);
    }


    /**
     * 解析排序参数
     *
     * @return
     */
    public static String parseSort(String sort, String order) throws Exception {
        if (UtilPub.isEmpty(sort) || UtilPub.isEmpty(order)) return "";
        String[] sorts = sort.split(",");
        String[] orders = order.split(",");
        if (sorts.length != orders.length) {
            throw new Exception("参数解析错误");
        }
        StringBuilder strSort = new StringBuilder(125);
        for (int i = 0, len = sorts.length; i < len; i++) {
            if (i == 0) {
                strSort.append(sorts[i]).append(" ").append(orders[i]);
            } else {
                strSort.append(",").append(sorts[i]).append(" ").append(orders[i]);
            }
        }
        return strSort.toString();
    }

    public String backSuccessJson(Object result, String message) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);
        jsonObject.put("result", result);
        jsonObject.put("state", true);
        return jsonObject.toString();
    }

    public String backLoserJson(Object result, String message) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);
        jsonObject.put("msg", message);
        jsonObject.put("result", result);
        jsonObject.put("state", false);
        return jsonObject.toString();
    }

    public void returnSuccessMsg(Object result, String message) {
        ResponseUtils.renderJson(response, backSuccessJson(result, message));
    }

    public void returnErrorMsg(Object result, String message) {
        ResponseUtils.renderJson(response, backLoserJson(result, message));
    }

    /**
     * 设置返回到页面的信息
     * @param success 是否成功
     */
    protected void setResult(boolean success, String s) {
        PageMap map = context.getResponseParams();
        map.put("state", success);
        if (UtilPub.isNotEmpty(s)) map.put("msg", s);
        if (UtilPub.isNotEmpty(s)) map.put("message", s);
        ResponseUtils.renderJson(response, JSONObject.toJSONString(map));
    }
    /**
     * 前端字符串解密
     *
     * @param txt
     * @return
     */
    public String decodeJsStr(String txt) {
        return EncodeUtil.decode64(txt);
    }
}
