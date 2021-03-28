package cc.water.ciro.common.utils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2016/6/19.
 */
public class MethodUtil {
    public static Map<String, String> returnMap(Class cls,Object object) throws InvocationTargetException, IllegalAccessException {
        Map<String, String> map = new HashMap<String, String>();
        Method m[] = cls.getMethods();
        for (int i = 0; i < m.length; i++) {
            String metName = m[i].getName(); // 取得方法名称
            Class<?> ret = m[i].getReturnType();// 取得返回值类型
            Class<?> param[] = m[i].getParameterTypes(); // 得到全部的参数类型
            if(metName.startsWith("get")&&!metName.equals("getClass")&&param.length==0){
                map.put(metName.substring(3,4).toLowerCase()+metName.substring(4), m[i].invoke(object).toString());
            }
        }
        return  map;
    }
}
