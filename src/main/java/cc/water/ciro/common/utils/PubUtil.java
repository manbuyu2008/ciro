package cc.water.ciro.common.utils;

import cc.water.ciro.common.consts.CoreConsts;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-10
 * Time: 下午11:58
 * To change this template use File | Settings | File Templates.
 */
public class PubUtil {

    private static SimpleDateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd");
    private static SimpleDateFormat tFormat = new SimpleDateFormat("HH:mm:ss");
    private static SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static <K, V> Map<K, V> toMap(K k1, V v1) {
        Map<K, V> map = new HashMap<K, V>();
        map.put(k1, v1);
        return map;
    }

    public static <K, V> Map<K, V> toMap(K k1, V v1, K k2, V v2) {
        Map<K, V> map = new HashMap<K, V>();
        map.put(k1, v1);
        map.put(k2, v2);
        return map;
    }

    public static <K, V> Map<K, V> toMap(K k1, V v1, K k2, V v2, K k3, V v3) {
        Map<K, V> map = new HashMap<K, V>();
        map.put(k1, v1);
        map.put(k2, v2);
        map.put(k3, v3);
        return map;
    }

    public static <K, V> Map<K, V> toMap(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4) {
        Map<K, V> map = new HashMap<K, V>();
        map.put(k1, v1);
        map.put(k2, v2);
        map.put(k3, v3);
        map.put(k4, v4);
        return map;
    }

    public static <K, V> Map<K, V> toMap(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5) {
        Map<K, V> map = new HashMap<K, V>();
        map.put(k1, v1);
        map.put(k2, v2);
        map.put(k3, v3);
        map.put(k4, v4);
        map.put(k5, v5);
        return map;
    }

    public static boolean isEmpty(String str) {
        return str == null || str.trim().length() == 0||str.equals(CoreConsts.NULL_STRING);
    }

    public static boolean isEmpty(Collection collection) {
        return collection == null || collection.size() == 0;
    }

    public static boolean isEmpty(Object[] o) {
        return o == null || o.length == 0;
    }

    public static boolean isNotEmpty(String str) {
        return str != null && str.trim().length() > 0 && !str.equals(CoreConsts.NULL_STRING);
    }

    public static boolean isNotEmpty(Collection collection) {
        return collection != null && collection.size() > 0;
    }
    public static boolean isNotEmpty(Object[] o) {
        return o != null && o.length > 0;
    }

    /**
     * 将空指针转换为空串
     * @param str 带检查的字符串
     * @return 字符串
     */
    public static String ignoreNull(String str) {
        if (str == null)
            return "";
        return str;
    }

    /**
     * 将空指针转换为空串，并截去前后的空格
     * @param str 带检查的字符串
     * @return 字符串
     */
    public static String trimIgnoreNull(String str) {
        if (str == null)
            return "";
        return str.trim();
    }

    /**
     * 获取浮点数(有错误默认为0)，可以识别金额中的逗号格式
     * @param str 带转换的字符串
     * @return 浮点数
     */
    public static double getDoubleIgnoreErr(String str) {
        if (str == null)
            return 0;
        str = str.trim();
        if (str.equals(""))
            return 0;
        str = str.replaceAll(",", "").replaceAll("，", "");
        try {
            return Double.valueOf(str);
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * 得到int 获取转换的int值，有错返回0
     * @param str 带转换的字符串
     * @return int
     */
    public static int getIntIgnoreErr(String str) {
        if (str == null)
            return 0;
        str = str.trim();
        if (str.equals(""))
            return 0;
        str = str.replaceAll(",", "").replaceAll("，", "");
        try {
            return Integer.valueOf(str);
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * 得到Long 获取转换的Long值，有错返回0
     * @param str 带转换的字符串
     * @return long
     */
    public static long getLongIgnoreErr(String str) {
        if (str == null)
            return 0L;
        str = str.trim();
        if (str.equals(""))
            return 0L;
        str = str.replaceAll(",", "").replaceAll("，", "");
        try {
            return Long.valueOf(str);
        } catch (Exception e) {
            return 0L;
        }
    }

    /**
     * 获取字符串(忽略值为空的错误，默认为""，注意不忽略参数不正确的情况)
     * @param request 请求
     * @param attrName 属性名
     * @return String
     */
    public static String getStringIgnoreNull(HttpServletRequest request, String attrName) {
        Object obj = request.getAttribute(attrName);
        if (obj == null)
            return "";
        return obj.toString();
    }


    public static Date getDateFromTimestampIgnoreNull(Timestamp datetime) {
        if (datetime == null)
            return null;
        return new Date(datetime.getTime());
    }

    public static Date getSqlDateFromUtilDate(java.util.Date utilDate) {
        return new Date(utilDate.getTime());
    }

    public static java.util.Date getUtilDateFromSqlDate(Date sqlDate) {
        return new java.util.Date(sqlDate.getTime());
    }

    public static Date getDateFromStrIgnoreErr(String dateStr) {
        try {
            return Date.valueOf(dateStr);
        } catch (Exception e) {
            return null;
        }
    }

    public static String getDateStrIgnoreNull(java.util.Date obj) {
        if (obj == null)
            return "";
        return dFormat.format(obj);
    }

    public static String getDateStrIgnoreNull(java.sql.Date obj) {
        if (obj == null)
            return "";
        return dFormat.format(obj);
    }

    public static String getDateHtmlStrIgnoreNull(java.util.Date obj) {
        return HtmlUtil.getHtmlStr(getDateStrIgnoreNull(obj));
    }

    public static String getDateHtmlStrIgnoreNull(java.sql.Date obj) {
        return HtmlUtil.getHtmlStr(getDateStrIgnoreNull(obj));
    }

    public static String getDateStrIgnoreNull(Timestamp obj) {
        if (obj == null)
            return "";
        return dFormat.format(obj);
    }

    public static String getDateHtmlStrIgnoreNull(Timestamp obj) {
        return HtmlUtil.getHtmlStr(getDateStrIgnoreNull(obj));
    }

    public static String getTimeStrIgnoreNull(Timestamp obj) {
        if (obj == null)
            return "";
        return tFormat.format(obj);
    }

    public static String getTimeHtmlStrIgnoreNull(Timestamp obj) {
        return HtmlUtil.getHtmlStr(getTimeStrIgnoreNull(obj));
    }

    public static Timestamp getDateTimeFromStrIgnoreErr(String dateTimeStr) {
        try {
            return Timestamp.valueOf(dateTimeStr);
        } catch (Exception e) {
            return null;
        }
    }

    public static String getDateTimeStrIgnoreNull(Timestamp obj) {
        if (obj == null)
            return "";
        return dtFormat.format(obj);
    }

    public static String getDateTimeBRHtmlStrIgnoreNull(Timestamp obj) {
        if (obj == null)
            return "&nbsp;";
        return getDateStrIgnoreNull(obj) + "<br>" + getTimeStrIgnoreNull(obj);
    }

    public static String getDateTimeHtmlStrIgnoreNull(Timestamp obj) {
        return HtmlUtil.getHtmlStr(getDateTimeStrIgnoreNull(obj));
    }

    public static Date getCurDate() {
        return new Date(System.currentTimeMillis());
    }

    public static String getCurDateStr() {
        return dFormat.format(new Date(System.currentTimeMillis()));
    }

    public static Timestamp getCurDatetime() {
        return new Timestamp(System.currentTimeMillis());
    }

    public static String getCurDatetimeStr() {
        return dtFormat.format(new Timestamp(System.currentTimeMillis()));
    }

    /**
     * Func:为空，返回""
     * @param str 带检查的字符串
     * @return ""
     */
    public static String checkNull(String str) {
        if (isEmpty(str))
            return "";
        return str.trim();
    }

    /**
     * Func:取当前年
     * @return ""
     */
    public static String getThisYear() {
        Calendar tlpDate = new GregorianCalendar();
        tlpDate.setTime(getCurDate());
        return String.valueOf(tlpDate.get(Calendar.YEAR));
    }

    /**
     * Func:取当前月
     * @return ""
     */
    public static String getThisMonth() {
        Calendar tlpDate = new GregorianCalendar();
        tlpDate.setTime(getCurDate());
        return String.valueOf(tlpDate.get(Calendar.MONTH));
    }

    /**
     * Func:str字符串是否包含subStr
     * @param str 字符串
     * @param subStr 待查找的串
     * @return boolean
     */
    public static boolean isContain(String str, String subStr) {
        return !isEmpty(str) && !isEmpty(subStr) && str.contains(subStr);
    }

    /**
     * 功能：null过滤，返回默认值
     * @param strValue 带检查的字符串
     * @param defaultValue 为空返回的字符串
     * @return str
     */
    public static String checkNull(String strValue, String defaultValue) {
        return strValue == null ? defaultValue : strValue;
    }

    /**
     * 功能：空值过滤，返回默认值
     * @param strValue 待检查的字符串
     * @param defaultValue 为空返回的字符串
     * @return str
     */
    public static String checkEmpty(String strValue, String defaultValue) {
        return isEmpty(strValue) ? defaultValue : strValue;
    }

    /**
     * Func:List是否包含str
     * @param str 字符串
     * @param lt 列表
     * @return boolean
     */
    public static boolean isInList(String str, List lt) {
        if (lt == null)
            return false;
        if (isEmpty(str))
            return false;
        for (Object aLt : lt) {
            if (str.equals(aLt)) {
                return true;
            }
        }
        return false;
    }

    public static class FileName {
        public String path = "";
        public String name = "";
        public String mainName = "";
        public String exName = "";

        public FileName(String fileFullName) {
            File file = new File(fileFullName);
            path = file.getParent();
            name = file.getName();
            int i = name.lastIndexOf(".");
            if (i < 0) {
                mainName = name;
                exName = "";
            } else {
                mainName = name.substring(0, i);
                exName = name.substring(i + 1, name.length());
            }
        }
    }

    /**
     * 比较两个数组长度是否相等.
     */
    public static boolean arrayLengthIsSame(Object[] a, Object[] b) {
        int size_a = (a == null ? 0 : a.length);
        int size_b = (b == null ? 0 : b.length);
        return size_a == size_b;
    }

    /**
     * 去掉字符串最后一个字符,一般用于去逗号","处理 add by Cr
     * @param str 字符串
     * @return 去掉最后一个支付的字符串
     */
    public static String subLastChar(String str) {
        if (isEmpty(str)) return "";
        return str.substring(0, str.length() - 1);
    }

    public static String getOrigMsg(Throwable e) {
        String s = e.getMessage();
        Throwable t = e.getCause();
        while (t != null) {
            s = t.getMessage();
            t = t.getCause();
        }
        return s;
    }

    //从map中取值，key不区分大小写
    public static <V> V getValueFromMapIgnoreCase(Map<String, V> map, String key) {
        for (String k : map.keySet()) {
            if (k.equalsIgnoreCase(key)) {
                return map.get(k);
            }
        }
        return null;
    }

    /**
     * 字符串转Map
     * @param str 源串，格式 name1=value1&name2=value2
     * @param map 目标map
     * @param upperKey 是否需要将key转为大写
     */
    public static void strToMap(String str, Map<String, String> map, boolean upperKey) {
        String[] ss = str.split("&");
        String[] sp;
        String key;
        for (String s : ss) {
            if (PubUtil.isEmpty(s)) continue;
            sp = s.split("=");
            if (upperKey) key = sp[0].toUpperCase();
            else key = sp[0];
            if (sp.length > 1) {
                map.put(key, sp[1]);
            } else map.put(key, "");
        }
    }

    /**
     * 计算一个字符串source的长度
     * <p>
     * 英文和数字占一个长度,其他字符(中文和特殊符号等)占2个长度
     * <p>
     *
     * @param source
     * @return
     */
    public static int strLength(String source) {
        int totalLength = source.length();// 总长度

        String otherStr = source.replaceAll("\\d|\\w", "");// 去掉字符串中的数字和英文字符
        int otherLength = otherStr.length();// 占2个长度的字符

        int allLength = (totalLength - otherLength) + otherLength * 2;
        return allLength;
    }


    /**
     * 对象深度克隆,需要被克隆的方法实现java.io.Serializable
     * @param src
     * @return
     */
    public static Object deepClone(Object src) {
        Object dst = null;
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ObjectOutputStream oo = new ObjectOutputStream(out);
            oo.writeObject(src);

            ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());
            ObjectInputStream oi = new ObjectInputStream(in);
            dst = oi.readObject();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return dst;
    }
}
