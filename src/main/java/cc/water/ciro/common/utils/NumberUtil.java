package cc.water.ciro.common.utils;

import cc.water.ciro.common.util.StringUtil;

import java.math.BigDecimal;

public class NumberUtil {

    public static String randomLetter() {
        String chars = "abcdefghijklmnopqrstuvwxyz";
        StringBuffer str = new StringBuffer();
        for (int i = 0; i < 8; i++) {
            str.append(chars.charAt((int) (Math.random() * 26)));

        }

        return str.toString();
    }

    public static long parseLong(String str) {
        if (StringUtil.isEmpty(str)) return 0;
        if (StringUtil.isNumeric(str)) return Long.parseLong(str);
        return 0;
    }

    public static BigDecimal parseBigDecimal(String str) {
        if (StringUtil.isEmpty(str)) return BigDecimal.valueOf(0);
        try {
            return BigDecimal.valueOf(Double.parseDouble(str));
        } catch (Exception e) {
            return BigDecimal.valueOf(0);
        }
    }

    public static int parseInt(String str) {
        if (StringUtil.isEmpty(str)) return 0;
        if (StringUtil.isNumeric(str)) return Integer.parseInt(str);
        return 0;
    }


}
