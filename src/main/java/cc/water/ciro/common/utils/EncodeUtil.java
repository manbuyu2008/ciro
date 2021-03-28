package cc.water.ciro.common.utils;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-11
 * Time: 上午12:54
 * To change this template use File | Settings | File Templates.
 */
public class EncodeUtil {
    private static char[] hexChar = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

    /**
     * 将字节数组转换为十六进制的字符串显示
     * @param bytes 字节数组
     * @return 十六进制字符串；
     */
    public static String toHexString(byte[] bytes) {
        StringBuffer buf = new StringBuffer(bytes.length * 2);
        for (int i = 0; i < bytes.length; i++) {
            buf.append(hexChar[(bytes[i] & 0xf0) >>> 4]);
            buf.append(hexChar[bytes[i] & 0x0f]);
        }
        return buf.toString();

    }

    /**
     * 从数组中提取出十六进制的字符串所构成的字节数组
     * @param str
     * @return
     */
    public static byte[] fromHexString(String str) {
        int stringLength = str.length();
        if ((stringLength & 0x1) != 0) {
            throw new IllegalArgumentException("不是有效的16进制字符串！");
        }
        byte[] b = new byte[stringLength / 2];

        for (int i = 0, j = 0; i < stringLength; i += 2, j++) {
            int high = convertChar(str.charAt(i));
            int low = convertChar(str.charAt(i + 1));
            b[j] = (byte) ((high << 4) | low);
        }
        return b;
    }

    /**
     * 获取字符串的MD5值；
     * @param origin 原始字符串
     * @return md5指纹
     */
    public static String encodeMD5(String origin) {
        return encode(origin, "MD5");
    }

    public static String EncodeSHA(String origin) {
        return encode(origin, "SHA");
    }

    /**
     * 获取字符串的加密值；
     * @param origin 原始字符串
     * @param digestType 加密方式，支持的方式有MD5、SHA、SHA1、SHA-1
     * @return 加密值
     */
    public static String encode(String origin, String digestType) {
        try {
            MessageDigest md = MessageDigest.getInstance(digestType);
            // zuodp : 强性使用GBK,防止在其他平台上，可能会引起的编码转换问题。
            return toHexString(md.digest(origin.getBytes("GBK")));
        } catch (Exception ex) {
            return "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
        }
    }

    private static int convertChar(char c) {
        if ('0' <= c && c <= '9') {
            return c - '0';
        } else if ('a' <= c && c <= 'f') {
            return c - 'a' + 0xa;
        } else if ('A' <= c && c <= 'F') {
            return c - 'A' + 0xa;
        } else {
            throw new IllegalArgumentException("Invalid hex Character:" + c);
        }
    }

    public static String base64Encode(String s) {
        try {
            return Base64.encode(URLEncoder.encode(s, "utf-8").replace("+", "%20").getBytes());
        } catch (UnsupportedEncodingException e) {
            return Base64.encode(s.getBytes());
        }
    }

    public static String base64Decode(String s) {
        try {
            return URLDecoder.decode(new String(Base64.decode(s)), "utf-8");
        } catch (UnsupportedEncodingException e) {
            return new String(Base64.decode(s));
        }
    }

    /**
     * 前端字符串解密
     * @param txt
     * @return
     */
    public static String decrypt(String txt) {
        StringBuilder src = new StringBuilder(64);
        int l1, n = 1, srclen = 0;
        String s;
        for (int i = 0, l = txt.length(); i < l; ) {
            l1 = Integer.parseInt(txt.substring(i, i + 1), 21) - 10;
            s = txt.substring(++i, i + l1);
            if (i > 1) {
                src.append((char) (Integer.parseInt(s, 36) - n * 10 - srclen));
                n++;
            } else {
                srclen = Integer.parseInt(s, 36) - 10;
            }
            i += l1;
        }
        return src.toString();
    }
    /**
     * 解密
     * @param str
     * @return
     */
    public static String decode64(String str){
        char[] base64EncodeChars = new char[] { 'A', 'B', 'C', 'D',
                'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
                'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
                '4', '5', '6', '7', '8', '9', '+', '/', };

        byte[] base64DecodeChars = new byte[] { -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59,
                60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1,
                -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
                38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
                -1, -1 };
            byte[] data = str.getBytes();
            int len = data.length;
            ByteArrayOutputStream buf = new ByteArrayOutputStream(len);
            int i = 0;
            int b1, b2, b3, b4;

            while (i < len) {
                do {
                    b1 = base64DecodeChars[data[i++]];
                } while (i < len && b1 == -1);
                if (b1 == -1) {
                    break;
                }

                do {
                    b2 = base64DecodeChars[data[i++]];
                } while (i < len && b2 == -1);
                if (b2 == -1) {
                    break;
                }
                buf.write((int) ((b1 << 2) | ((b2 & 0x30) >>> 4)));

                do {
                    b3 = data[i++];
                    if (b3 == 61) {
                        return buf.toString();
                    }
                    b3 = base64DecodeChars[b3];
                } while (i < len && b3 == -1);
                if (b3 == -1) {
                    break;
                }
                buf.write((int) (((b2 & 0x0f) << 4) | ((b3 & 0x3c) >>> 2)));

                do {
                    b4 = data[i++];
                    if (b4 == 61) {
                        return buf.toString();
                    }
                    b4 = base64DecodeChars[b4];
                } while (i < len && b4 == -1);
                if (b4 == -1) {
                    break;
                }
                buf.write((int) (((b3 & 0x03) << 6) | b4));
            }
            return buf.toString();
        }

    /**
     * 前端字符串解密
     * @param txt
     * @return
     */
    public static String encrypt(String txt) {
        if (PubUtil.isEmpty(txt)) return "";
        StringBuilder src = new StringBuilder(64);

        int i, l = txt.length();
        String s;
        s = Integer.toString(l + 10, 36);
        src.append(Integer.toString(s.length() + 10, 21)).append(s);
        for (i = 0; i < l; i++) {
            s = Integer.toString(txt.charAt(i) + (i + 1) * 10 + l, 36);
            src.append(Integer.toString(s.length() + 10, 21)).append(s);
        }
        return src.toString();
    }
}