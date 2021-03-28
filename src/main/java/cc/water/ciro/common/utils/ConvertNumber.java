package cc.water.ciro.common.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class ConvertNumber {
	/**
	 * 把时间转换为yyyy-MM-dd HH:mm:ss
	 * @param date
	 * @return
	 */
	public static String getDate(Date date){
		if(date==null)
			return null;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.format(date);
	}
	
	public static Object objectConverJson(Object object,Class clazz){
		if(object instanceof List){
			return getListToJson(object,clazz);
		}
		return getObjectToJson(object,clazz);
		
	}
	/**
	 * 把list集合转化为JSONArray
	 * @param object
	 * @return
	 */
	private static Object getListToJson(Object object,Class clazz){
		
		return object;
	}
	
	/**
	 * 把Object对象转化为JSONObject
	 * @param object
	 * @return
	 */
	private static Object getObjectToJson(Object object,Class clazz){
		
		return object;
	}
}
