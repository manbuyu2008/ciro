package cc.water.ciro.common.base;

import cc.water.ciro.common.utils.PubUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseLogger {
    private static final Logger logger = LoggerFactory.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);

    private static String getOrigMsg(String s, Throwable e) {
        if (s != null) return s;
        return PubUtil.getOrigMsg(e);
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