package cc.water.ciro.common.page;

import cc.water.ciro.common.utils.UtilPub;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-11
 * Time: 上午12:25
 * To change this template use File | Settings | File Templates.
 */
public final class PageMap extends HashMap<String, Object> {
    private static final long serialVersionUID = 5293823973528192030L;

    /**
     * 得到字符
     *
     * @param key
     * @return
     */
    public String getStr(String key) {
        Object o = get(key);
        if (o != null) return o.toString();
        return null;
    }

    /**
     * 判断key对应的对象是否为空
     *
     * @param key
     * @return
     */
    public boolean existAndNotEmpty(String key) {
        return containsKey(key) && UtilPub.isNotEmpty(getStr(key));
    }

    /**
     * 得到字符值，若为null则转为空
     *
     * @param key
     * @return
     */
    public String getStrIgnoreNull(String key) {
        return UtilPub.checkNull(getStr(key));
    }

    /**
     * 构建参数。如不为空，则返回值；否则返回默认值，且在map中构建
     *
     * @param key
     * @param def
     * @return
     */
    public String buildDefault(String key, String def) {
        String s = getStrIgnoreNull(key);
        if (UtilPub.isNotEmpty(s)) return s;
        put(key, def);
        return def;
    }

    /**
     * 得到整数
     *
     * @param key
     * @return
     */
    public int getInt(String key) {
        return UtilPub.getIntIgnoreErr(getStr(key));
    }

    /**
     * 得到整数
     *
     * @param key
     * @return
     */
    public int getIntNotStr(String key) {
        return (Integer) get(key);
    }

    /**
     * 得到浮点
     *
     * @param key
     * @return
     */
    public double getDouble(String key) {
        return UtilPub.getDoubleIgnoreErr(getStr(key));
    }

    /**
     * 得到布尔
     *
     * @param key
     * @return
     */
    public boolean getBoolean(String key) {
        if (containsKey(key)) {
            Object v = get(key);
            if (v instanceof Boolean) return (Boolean) get(key);
            else return "true".equalsIgnoreCase(v.toString()) || "1".equals(v.toString());
        } else return false;
    }

    /**
     * 不检查类型，强制转为对应的对象
     *
     * @param key
     * @param <T>
     * @return
     */
    @SuppressWarnings({"unchecked"})
    public <T> T getObject(String key) {
        return (T) get(key);
    }

    /**
     * 增加json字符串。
     *
     * @param jsonStr
     * @throws org.json.JSONException
     */
    public void addJson(String jsonStr, HttpServletRequest request) throws JSONException {
        if (UtilPub.isEmpty(jsonStr) || !jsonStr.startsWith("{")) return;
        JSONObject json = new JSONObject(jsonStr);
        for (Iterator i = json.keys(); i.hasNext(); ) {
            String s = (String) i.next();
            String value = String.valueOf(json.get(s));
            if (request.getMethod().equals("GET")) {
                try {
                    value = new String(value.getBytes("ISO-8859-1"), "UTF-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
            put(s, value);
        }
    }
}
