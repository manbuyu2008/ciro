package cc.water.ciro.common.utils;

import cc.water.ciro.system.domain.ActiveUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

public class UserUtil {
	public static ActiveUser getActiveUser(){
		Subject subject = SecurityUtils.getSubject();
		ActiveUser activeUser = (ActiveUser) subject.getPrincipal();
		if(activeUser!=null){
			return activeUser;
		}
		return null;
	}
}
