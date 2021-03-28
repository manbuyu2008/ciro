package cc.water.ciro.init;

/**
 * Created by mi
 * 系统参数类
 */
public final class SysParam {
    //web绝对路径
    private static String webRootPath = null;

    public static void setWebRootPath(String webRootPath) {
        SysParam.webRootPath = webRootPath;
    }

    public static String getWebRootPath() {
        /**
         *原方法不够安全，改为从ServletContext获取RealPath传入。
         * 原因在于，运行Java程序不一定要进入到该程序的类文件或JAR文件所在的目录，只要在运行时指定了正确的类路径信息，
         * 就可以在任何目录中运行Java程序，此时利用这种方法只能得到发出运行命令时所在的目录信息。
         *
         */
        if (webRootPath.endsWith("/")) return webRootPath;
        else return webRootPath + "/";
    }
    public static String getWebInfPath() {
        return getWebRootPath() + "WEB-INF/";
    }
    //WEB-INF/classes/config/
    public static String getConfigPath() {
        return getWebRootPath() + "WEB-INF/classes/config/";
    }
}
