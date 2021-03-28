package cc.water.ciro.common.util;

import cc.water.ciro.common.utils.NumberUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by huangxl on 2016/12/1.
 */
public class MapBeanUtil {
    private static Logger log = LoggerFactory.getLogger("MyConverUtil");

    public static HashMap<String, Object> PO2Map(Object o,boolean isUpper) throws Exception {
        HashMap<String, Object> map = new HashMap<String, Object>();
        Field[] fields = null;
        String clzName = o.getClass().getSimpleName();
        fields = o.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            String proName = field.getName();
            Object proValue = field.get(o);
            if(isUpper) {
                map.put(proName.toUpperCase(), proValue);
            }else{
                map.put(proName, proValue);
            }
        }
        return map;
    }


    public static Object map2PO(Map<String, Object> map, Object o) throws Exception {
        if (!map.isEmpty()) {
            for (String k : map.keySet()) {
                Object v = "";
                if (!k.isEmpty()) {
                    v = map.get(k);
                }
                Field[] fields = null;
                fields = o.getClass().getDeclaredFields();
                for (Field field : fields) {
                    int mod = field.getModifiers();
                    if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
                        continue;
                    }
                    if (field.getName().toUpperCase().equals(k.toUpperCase())) {
                        field.setAccessible(true);
                        // 得到属性的类名
                        String className = field.getType().getSimpleName();
                        // 得到属性值
                        String value = v.toString();
                        if (className.equalsIgnoreCase("string")) {
                            field.set(o, value);
                        } else if (className.equalsIgnoreCase("boolean") && StringUtil.isNotEmpty(value)) {
                            field.set(o, Boolean.parseBoolean(value));
                        } else if (className.equalsIgnoreCase("int")||className.equalsIgnoreCase("integer")) {
                            field.set(o, NumberUtil.parseInt(value));
                        } else if (className.equalsIgnoreCase("long")) {
                            field.set(o, NumberUtil.parseLong(value));
                        } else if (className.equalsIgnoreCase("date")) {
                            field.set(o, DateUtil.parse(value));
                        } else if (className.equalsIgnoreCase("BigDecimal")) {
                            field.set(o, new BigDecimal(value));
                        }
                    }

                }
            }
        }
        return o;
    }
}
