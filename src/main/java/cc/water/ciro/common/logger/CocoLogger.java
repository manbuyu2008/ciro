package cc.water.ciro.common.logger;

import cc.water.ciro.common.utils.UtilPub;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-11
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */
public class CocoLogger {
    private static final Logger logger = LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);

    private static String getOrigMsg(String s, Throwable e) {
        if (s != null) return s;
        return UtilPub.getOrigMsg(e);
    }

    public static void debug(String s) {
        logger.debug(s);
    }

    public static void debug(String s, Throwable e) {
        logger.debug(getOrigMsg(s, e), e);
    }

    public static void info(String s) {
        logger.info(s);
    }

    public static void info(String s, Throwable e) {
        logger.info(getOrigMsg(s, e), e);
    }

    public static void warn(String s) {
        logger.warn(s);
    }

    public static void warn(String s, Throwable e) {
        logger.warn(getOrigMsg(s, e), e);
    }

    public static void error(String s) {
        logger.error(s);
    }

    public static void error(String s, Throwable e) {
        logger.error(getOrigMsg(s, e), e);
    }
}
