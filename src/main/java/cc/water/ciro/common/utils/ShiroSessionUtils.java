package cc.water.ciro.common.utils;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

public class ShiroSessionUtils {
	//	protected final static Logger logger = LoggerFactory.getLogger(ShiroSessionUtils.class);
	
	public static final Object getSessionValue(String key) {
		try {
			Subject subject = SecurityUtils.getSubject();
			if (subject != null) {
				Session shiroSession = subject.getSession();
				if (shiroSession != null) {
					return shiroSession.getAttribute(key);
				}
			}
		} catch (Exception e) {
			//logger.error(e.getMessage(), e);
		}
		return null;
	}
	
	public static final Object removeSessionValue(String key) {
		Subject subject = SecurityUtils.getSubject();
		if (subject != null) {
			Session shiroSession = subject.getSession();
			if (shiroSession != null) {
				return shiroSession.removeAttribute(key);
			}
		}
		return null;
	}
	
	public static final void setSessionValue(String key, Object object) {
		try {
			Subject subject = SecurityUtils.getSubject();
			if (subject != null) {
				Session shiroSession = subject.getSession();
				if (shiroSession != null) {
					shiroSession.setAttribute(key, object);
				}
			}
		} catch (Exception e) {
			//logger.error(e.getMessage(), e);
		}
	}
	
}
