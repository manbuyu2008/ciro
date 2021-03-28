package cc.water.ciro.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil extends StringBaseUtil {
    static final Logger logger = LoggerFactory.getLogger(StringUtil.class);

    /**
     * subString("acd中央人民广播电台", 5, "..") 返回： “acd中央人民..”
     *
     * @param text    原始字符串
     * @param length  截取长度
     * @param endWith 超过截取长度时，用来什么字符串省略代替，
     * @return subString("acd中央人民广播电台", 5, "..") 返回： “acd中央人民..”
     */
    public static String subString(String text, int length, String endWith) {
        if (isBlank(text))
            return "";
        int textLength = text.length();
        int byteLength = 0;
        StringBuffer returnStr = new StringBuffer();
        for (int i = 0; i < textLength && byteLength < length * 2; i++) {
            String str_i = text.substring(i, i + 1);
            if (str_i.getBytes().length == 1) {//英文
                byteLength++;
            } else {//中文
                byteLength += 2;
            }
            returnStr.append(str_i);
        }
        try {
            if (byteLength < text.getBytes("GBK").length) {//getBytes("GBK")每个汉字长2，getBytes("UTF-8")每个汉字长度为3
                returnStr.append(endWith);
            }
        } catch (UnsupportedEncodingException e) {
            logger.error(e.getMessage(), e);
            e.printStackTrace();
        }
        return returnStr.toString();
    }

    /**
     * 基本功能：过滤所有以"<"开头以">"结尾的标签
     * <p/>
     *
     * @param str
     * @return String
     */
    public static String filterHtml(String str) {
        if (isBlank(str)) {
            return "";
        }
        Pattern pattern = Pattern.compile("<([^>]*)>");
        Matcher matcher = pattern.matcher(str);
        StringBuffer sb = new StringBuffer();
        boolean result1 = matcher.find();
        while (result1) {
            matcher.appendReplacement(sb, "");
            result1 = matcher.find();
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    public static String splitAndFilterString(String input, int length) {
        if (input == null || input.trim().equals("")) {
            return "";
        }
        // 去掉所有html元素,
        String str = input.replaceAll("\\&[a-zA-Z]{1,10};", "").replaceAll("<[^>]*>", "");
        str = str.replaceAll("[(/>)<]", "");
        int len = str.length();
        if (len <= length) {
            return str;
        } else {
            str = str.substring(0, length);
            str += "......";
        }
        return str;
    }

    /**
     * 基本功能：过滤引号
     * <p/>
     *
     * @param str
     * @return String
     */
    public static String filterXSS(String str) {
        if (isBlank(str)) {
            return "";
        }
        Pattern pattern = Pattern.compile("\"|\'");
        Matcher matcher = pattern.matcher(str);
        StringBuffer sb = new StringBuffer();
        boolean result1 = matcher.find();
        while (result1) {
            matcher.appendReplacement(sb, "");
            result1 = matcher.find();
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    public static String nullToEmpty(String str) {
        if (str == null) {
            return "";
        }
        return str;
    }

    public static String replaceBlank(String str) {
        String dest = "";
        if (str != null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }

    /**
     * 检查字符串是否不是<code>null</code>和空字符串<code>""</code>。
     * <p/>
     * <p/>
     * <pre>
     * StringUtil.isNotEmpty(null)      = false
     * StringUtil.isNotEmpty("")        = false
     * StringUtil.isNotEmpty(" ")       = true
     * StringUtil.isNotEmpty("bob")     = true
     * StringUtil.isNotEmpty("  bob  ") = true
     * </pre>
     *
     * @param str 要检查的字符串
     * @return 如果不为空, 则返回<code>true</code>
     */
    public static boolean isNotEmpty(String str) {
        str = replaceBlank(str);
        return ((str != null) && (str.length() > 0));
    }

    public static boolean isNotEmptyEx(String str) {
        str = replaceBlank(str);
        if (str.equals("0")) return false;
        return ((str != null) && (str.length() > 0));
    }

    /**
     * 检查字符串分割字符串的个数
     *
     * @param str 要检查的字符串
     * @return 个数
     */
    public static int splitCount(String str, String splitStr) {
        String[] strArray = str.split(splitStr);
        return strArray.length;
    }

    /**
     * 检查字符串str2在字符串str1中的位置
     *
     * @param str1 要检查的字符串
     * @return int
     */
    public static int containStr(String str1, String str2) {
        return str1.indexOf(str2);
    }

    /**
     * subString("acd中央人民广播电台", 5, "..") 返回： “acd中央人民..”
     *
     * @param text    原始字符串
     * @param start   开始
     * @param end     结束
     * @param endWith 超过截取长度时，用来什么字符串省略代替，
     * @return subString("acd中央人民广播电台", 1, 5, "..") 返回： “acd中央人民..”
     */
    public static String subString(String text, int start, int end, String endWith) {
        StringBuffer stringBuffer = new StringBuffer();
        if (start > text.length())
            return "";
        if (end == -1 || end >= text.length()) {
            end = text.length();
        }
        return stringBuffer.append(text.substring(start, end)).append(endWith).toString();
    }

}
