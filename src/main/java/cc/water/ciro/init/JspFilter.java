package cc.water.ciro.init;

import cc.water.ciro.common.utils.MethodUtil;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.config.serivce.SysParamService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashSet;
import java.util.Set;

/**
 * User: huangxl
 * Date: 16-8-29
 * Time: 上午10:33
 */
public class JspFilter implements Filter {
    private Set<String> extSet = new HashSet<String>();
    @Autowired
    SystemConfig systemConfig ;
    @Autowired
    SysParamService sysParamService ;
    @Override
    public void init(FilterConfig config) throws ServletException {
        extSet.add(".js");
        extSet.add(".css");
        extSet.add(".png");
        extSet.add(".jpg");
        extSet.add(".jpeg");
        extSet.add(".gif");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
            HttpServletRequest request = (HttpServletRequest) req
                    /*排除静态资源请求*/;
            String s = request.getRequestURI().toLowerCase();
            int n = s.lastIndexOf(".");
            boolean isResource = n >= 0 && extSet.contains(s.substring(n));
            if (!isResource) {
                try {
                    if(systemConfig!=null)
                    request.setAttribute("systemConfig", MethodUtil.returnMap(systemConfig.getClass(),systemConfig));
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        chain.doFilter(req, resp);
    }

    // 判断list中是否全部都是true
//    private boolean hasFlase(List<Boolean> list) {
//        for (boolean f : list) {
//            if (!f) return true;
//        }
//        return false;
//    }

    @Override
    public void destroy() {
    }
}
