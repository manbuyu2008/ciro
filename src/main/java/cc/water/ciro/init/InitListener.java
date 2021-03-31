package cc.water.ciro.init;

import cc.water.ciro.common.base.BaseLogger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by huangxl at 11-7-21 上午9:52
 * 系统启动时执行
 */
public final class InitListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        try {
            SysParam.setWebRootPath(servletContextEvent.getServletContext().getRealPath("/").replace("\\", "/"));
            System.out.println("===============系统启动===============");
        } catch (Exception e) {
            BaseLogger.error("系统初始化出错", e);
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        try {

        } catch (Exception e) {
            BaseLogger.error("系统注销出错", e);
        }
    }
}
