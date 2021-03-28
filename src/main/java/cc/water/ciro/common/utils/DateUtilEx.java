package cc.water.ciro.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@SuppressWarnings("UnusedDeclaration")
public class DateUtilEx {
    public final static SimpleDateFormat stdTimeFormat = new SimpleDateFormat("HH:mm:ss");
    public final static SimpleDateFormat stdDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    public final static SimpleDateFormat stdDatetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public final static SimpleDateFormat stdLongDatetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

    public final static SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HHmmss");
    public final static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    public final static SimpleDateFormat simpleDatetimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    public final static SimpleDateFormat simpleLongDatetimeFormat = new SimpleDateFormat("yyyyMMddHHmmssS");

    private static TimeZone mTimeZone = TimeZone.getTimeZone("Asia/Shanghai");
    static {
        stdTimeFormat.setTimeZone(mTimeZone);
        stdDateFormat.setTimeZone(mTimeZone);
        stdDatetimeFormat.setTimeZone(mTimeZone);
        stdLongDatetimeFormat.setTimeZone(mTimeZone);

        simpleTimeFormat.setTimeZone(mTimeZone);
        simpleDateFormat.setTimeZone(mTimeZone);
        simpleDatetimeFormat.setTimeZone(mTimeZone);
        simpleLongDatetimeFormat.setTimeZone(mTimeZone);
    }
    /** Return a Timestamp for right now
     * @return Timestamp for right now
     */
    public static java.sql.Timestamp nowTimestamp() {
        return new java.sql.Timestamp(System.currentTimeMillis());
    }
    /**
     * 获取今日
     * @return 获取今日java.sql.Date类型日期；
     */
    public static java.sql.Date nowDate() {
        return new java.sql.Date(System.currentTimeMillis());
    }

    /**
     * 取得系统今天的时间串
     * @return current datetime, pattern: "yyyy-MM-dd HH:mm:ss".
     */
    public static String nowStdDateTimeString() {
        return stdDatetimeFormat.format(nowTimestamp());
    }
    /**
     * 取得系统今天的时间串,包含毫秒
     * @return current datetime, pattern: "yyyy-MM-dd HH:mm:ss.SSS".
     */
    public static String nowStdLongDateTimeString() {
        return stdLongDatetimeFormat.format(nowTimestamp());
    }
    /**
     * 获取标准今日日期串
     * @return 今日日期字符串 yyyy-MM-dd；
     */
    public static String nowStdDateString() {
        return stdDateFormat.format(nowTimestamp());
    }
    /**
     * 获取当前标准时间串
     * @return 今日日期字符串 HH:mm:ss
     */
    public static String nowStdTimeString() {
        return stdTimeFormat.format(nowTimestamp());
    }
    /**
     * 返回当前标准年月
     * @return YYYY-MM
     */
    public static String nowStdYearMonth() {
        return nowStdDateString().substring(0, 7);
    }

    /**
     * 取得系统今天的时间串
     * @return current datetime, pattern:"yyyyMMddHHmmss"
     */
    public static String nowDateTimeString() {
        return simpleDatetimeFormat.format(nowTimestamp());
    }
    /**
     * 取得系统今天的时间串(包含毫秒)
     * @return current datetime, pattern:"yyyyMMddHHmmssS"
     */
    public static String nowLongDateTimeString() {
        return simpleLongDatetimeFormat.format(nowTimestamp());
    }
    /**
     * 获取今日日期串，不带分隔符
     * @return 今日日期字符串 yyyyMMdd；
     */
    public static String nowDateString() {
        return simpleDateFormat.format(nowTimestamp());
    }
    /**
     * 获取当前时间串，不带分隔符
     * @return 今日日期字符串 HHmmss；
     */
    public static String nowTimeString() {
        return simpleTimeFormat.format(nowTimestamp());
    }

    /**
     * 获取当前时间数字串，例如20100909121359 标识2010年09月09日 12时13分59秒
     * @return Long
     */
    public static Long nowDateTimeNumber(){
        return Long.valueOf(nowDateTimeString());
    }
    /**
     * 获取今日
     * @return Long，yyyymmdd，例如20100909
     */
    public static Long nowDateNumber() {
        return Long.valueOf(nowDateString());
    }

    /**
     * 获取当前日期所处年
     * @return 年串 4位
     */
    public static String nowYear() {
        return nowStdDateString().substring(0, 4);
    }
    public static String nowYear(String stddate) {
        return stddate.substring(0, 4);
    }
    /**
     * 获取当前日期所处月
     * @return 月串 两位
     */
    public static String nowMonth() {
        return nowStdDateString().substring(5, 7);
    }
    /**
     * 获取当前日期所出天
     * @return 天串 两位
     */
    public static String nowDay() {
        return nowStdDateString().substring(8, 10);
    }

    public static int nowHour() {
        Calendar calendar = getGMT8Calendar ();
        return calendar.get(Calendar.HOUR_OF_DAY);
    }

    /** return a.minute() + minutes */
    public static java.sql.Date getAfterMinute(java.util.Date d, int minutes) {
        if(d==null) return null;
        GregorianCalendar gc = new GregorianCalendar ();
        gc.setTimeZone (mTimeZone);
        gc.setTime (d);
        gc.add (GregorianCalendar.MINUTE, minutes);
        return new java.sql.Date (gc.getTimeInMillis ());
    }
    /**
     * 得到date + days的日期
     * @param dt 日期
     * @param days 间隔天数，正数往前，负数往后
     * @return String java.sql.Date.toString()
     */
    public static String getAfterDays(java.util.Date dt, int days) {
        if(dt==null) return "";
        if (days == 0)return dt.toString();
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTimeZone(mTimeZone);
        gc.setTime(dt);
        gc.add(GregorianCalendar.DATE, days);
        java.sql.Date ret = new java.sql.Date(gc.getTimeInMillis());
        return ret.toString();
    }
    /**
     * 得到date + days的日期
     * @param days 间隔天数，正数往前，负数往后
     * @param include67 是否包含星期六和星期日
     */
    public static String getAfterDays(String date, int days, boolean include67) {
        if(include67 || days==0) return getAfterDays(date,days);
        //要剔除信息，需要特殊处理
        int absd = Math.abs(days);
        int step = days>0?1:-1;
        java.sql.Date in = toDateDefaultNow(date);
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTimeZone(mTimeZone);
        gc.setTimeInMillis(in.getTime());
        //这里要判断days是正数还是负数，正数是未来，负数是过去
        for (int d = 0; d < absd;) {
            //获取当前是星期几；
            int w = gc.get(GregorianCalendar.DAY_OF_WEEK);
            // [ 星期日 | w | 星期六 ]
            if (w > GregorianCalendar.SUNDAY && w < GregorianCalendar.SATURDAY) {
                ++d;
            }
            // 向前或向后逐天循环；
            gc.add(GregorianCalendar.DATE, step);
        }
        java.sql.Date dr = new java.sql.Date(gc.getTimeInMillis());
        return dr.toString();
    }

    public static java.sql.Date getAfterDate(java.util.Date dt, int days) {
        if(dt==null) return null;
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTime(dt);
        gc.add(GregorianCalendar.DATE, days);
        return new java.sql.Date(gc.getTimeInMillis());
    }
    /**
     * 得到date + days的日期
     * @param dt 日期(yyyy-mm-dd)
     * @param days 间隔天数，正数往前，负数往后
     * @return String java.sql.Date.toString()
     */
    public static String getAfterDays(String dt, int days) {
        if (days == 0) return dt;
        try {
            return getAfterDays(java.sql.Date.valueOf(dt), days);
        } catch (Exception e) {
            return "";
        }
    }
    /**
     * 取与指定日期间隔月的日期(yyyy-mm-dd)
     * @return String java.sql.Date.toString()
     */
    public static String getAfterMonth(java.util.Date dt, int months) {
        if(dt==null) return "";
        if (months == 0) return dt.toString();
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.MONTH, months);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return ret.toString();
    }
    /**
     * 取与指定日期间隔月的日期(yyyy-mm-dd)
     * @param dt 指定日期
     * @param months  间隔月份
     * @return java.sql.Date.toString()
     */
    public static String getAfterMonth(String dt, int months) {
        return getAfterMonth(java.sql.Date.valueOf(dt), months);
    }
    /**
     * 取与指定日期间隔年的日期
     * @return String java.sql.Date.toString()
     */
    public static String getAfterYear(java.util.Date dt, int years) {
        if(dt==null) return "";
        if (years == 0) return dt.toString();
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.YEAR, years);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return ret.toString();
    }
    /**
     * 取与指定日期间隔年的日期
     * @param dt 指定日期
     * @param years 间隔年度
     * @return java.sql.Date.toString()
     */
    public static String getAfterYear(String dt, int years) {
        return getAfterYear(java.sql.Date.valueOf(dt), years);
    }
    /**
     * get days between fromDate and thruDate
     * @return the days between fromDate and thruDate
     */
    public static int getDifferDays(java.sql.Date f, java.sql.Date t) throws IllegalArgumentException {
        if(f==null || t==null) return 0;
        if (t.compareTo(f) < 0) {
            String msg = "[" + t + "] 比" + "[" + f + "] 早, 应该相反!";
            throw new IllegalArgumentException(msg);
        }
        return (int) ((t.getTime() - f.getTime()) / (24 * 60 * 60 * 1000));
    }

    /**
     * 得到当前日期所在周次的星期一
     * @return 返回的时间戳
     */
    public static java.sql.Timestamp getWeekStart() {
        return getWeekStart(new java.sql.Timestamp(System.currentTimeMillis()));
    }
    /**
     *  得到日期所在周次的星期一
     * @param stamp 参数时间戳，如果传入为null,则返回为null
     * @return 返回时间戳
     */
    public static java.sql.Timestamp getWeekStart(java.sql.Timestamp stamp) {
        if(stamp==null) return null;
        GregorianCalendar tempCal = new GregorianCalendar(mTimeZone);
        tempCal.setTime(stamp);
        tempCal.set(tempCal.get(Calendar.YEAR),
                tempCal.get(Calendar.MONTH),
                tempCal.get(Calendar.DAY_OF_MONTH),
                // 没有时,分,秒
                0, 0, 0);
        if (tempCal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
            // zuodp fix bug:
            // 如果今天是星期天, 天数再减1,找到上周(外国人的星期天是本周).
            tempCal.add(Calendar.DATE, -1);                 // 再将天数减一
        }
        tempCal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY); // 设为星期一.

        java.sql.Timestamp retStamp = new java.sql.Timestamp(tempCal.getTime().getTime());
        retStamp.setNanos(0);
        return retStamp;
    }
    /** 当前日期的下周星期一 */
    public static java.sql.Timestamp getNextWeekStart() {
        return getNextWeekStart(new java.sql.Timestamp(System.currentTimeMillis()));
    }
    /**
     * 当前日期的下周星期一,如果传入null,则返回为null
     * @param t 要计算的时间戳
     * @return 返回的时间戳
     */
    public static java.sql.Timestamp getNextWeekStart(java.sql.Timestamp t) {
        if(t==null)return null;
        Calendar tempCal = new GregorianCalendar(mTimeZone);
        tempCal.setTime(t);
        tempCal.set(tempCal.get(Calendar.YEAR),
                tempCal.get(Calendar.MONTH),
                tempCal.get(Calendar.DAY_OF_MONTH),
                // 没有时,分,秒
                0, 0, 0);
        tempCal.add(Calendar.WEEK_OF_MONTH, 1);             // 周数加1
        tempCal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY); // 设为星期一.

        java.sql.Timestamp retStamp = new java.sql.Timestamp(tempCal.getTime().getTime());
        retStamp.setNanos(0);
        return retStamp;
    }
    /**
     * 取得当月第一天日期串YYYY-MM-DD
     * @return 月第一天的标准日期串
     */
    public static String getMonthStart() {
        return nowStdYearMonth() + "-01";
    }
    /**
     * 取得指定日期所在月第一天日期串YYYY-MM-DD
     * @return 月第一天的标准日期串
     */
    public static String getMonthStart(java.util.Date d) {
        if(d==null)return "";
        return toStdDateString(d).substring(0, 7) + "-01";
    }
    /**
     * 取得当月最后一天YYYY-MM-DD
     * @return 当前月最后一天的日期串；
     */
    public static String getMonthEnd() {
        return getAfterDays(getAfterMonth(getMonthStart(), 1), -1);
    }
    /**
     * 取得指定日期所在月最后一天YYYY-MM-DD
     * @return 所在前月最后一天的日期串；
     */
    public static String getMonthEnd(java.util.Date d) {
        return getAfterDays(getAfterMonth(getMonthStart(d), 1), -1);
    }


    /**
     * 判断strDate 是否是日期格式的字符串(支持如 yyyy-mm-dd)。
     * @param strDate 字符串，判断其是否为日期格式。
     * @return boolean 如果为日期格式则返回=true;
     */
    public static boolean isDateFormat(String strDate) {
        return isDateFormat(strDate, "YYYY-MM-DD");
    }
    /**
     * 判断strDate 是否是日期格式的字符串。
     * @param strDate 字符串，判断其是否为日期格式。
     * @param format 字符串，YYYY-MM,YYYYMM,YYYYMMDD,YYYY-MM-DD,YYYY-MM-DD:HH, 空表示所有上述格式,非上述内容将默认为YYYY-MM-DD；
     * @return boolean 如果为日期格式则返回=true;
     */
    public static boolean isDateFormat(String strDate, String format) {
        if (UtilValidate.isEmpty(strDate)) {
            return false;
        }
        if (UtilValidate.isEmpty(format)) {
            format = "YYYY-MM-DD";
        }
        if (format.equals("YYYY-MM")) {
            return strDate.matches("\\d{4}-\\d{2}") && isDateValue(strDate.substring(0, 4), strDate.substring(5), "01");
        } else if (format.equals("YYYYMM")) {
            return strDate.matches("\\d{6}") && isDateValue(strDate.substring(0, 4), strDate.substring(4), "01");
        } else if (format.equals("YYYYMMDD")) {
            return strDate.matches("\\d{8}") && isDateValue(strDate.substring(0, 4), strDate.substring(4, 6), strDate.substring(6));
        } else if (format.equals("YYYY-MM-DD")) {
            return strDate.matches("\\d{4}-\\d{2}-\\d{2}") && isDateValue(strDate.substring(0, 4), strDate.substring(5, 7), strDate.substring(8));
        } else if (format.equals("YYYY-MM-DD:HH")) {
            return strDate.matches("\\d{4}-\\d{2}-\\d{2}:[0-5][0-9]") && isDateValue(strDate.substring(0, 4), strDate.substring(5, 7), strDate.substring(8, 10));
        } else if (format.equals("HHmmss")) {
            return strDate.matches("[0-5][0-9][0-5][0-9][0-5][0-9]") && isTimeValue(strDate.substring(0, 2), strDate.substring(2, 4), strDate.substring(4));
        } else {
            return false;
        }
    }

    public static boolean isDateValue(String year, String month, String day) {
        SimpleDateFormat s = new SimpleDateFormat("yyyy-MM-dd");
        s.setLenient(false);//这个的功能是不把1996-13-3 转换为1997-1-3
        try {
            s.parse(year + "-" + month + "-" + day);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }

    public static boolean isTimeValue(String hour, String min, String sec) {
        SimpleDateFormat s = new SimpleDateFormat("HH:mm:ss");
        s.setLenient(false);
        try {
            s.parse(hour + ":" + min + ":" + sec);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }
    /** a是否小于当前日期 */
    public static boolean isLessThanCurrentDate(java.sql.Date a) {
        int i = compareDate (a, new java.sql.Date (System.currentTimeMillis ()));
        return i < 0;
    }
    /** a是否小于b */
    public static boolean isLessThan(java.sql.Date a, java.sql.Date b) {
        int i = compareDate (a, b);
        return i < 0;
    }
    /**
     * 检查beging + days 是否在end前[包括end];(如:招行开始日期与结束日期之差只能在100以内)
     * @return false 大于了end
     */
    public static boolean isBeforeDate(java.util.Date beging, int days, java.util.Date end) {
        GregorianCalendar gc = new GregorianCalendar ();
        gc.setTimeZone (mTimeZone);
        gc.setTime (beging);
        gc.add (GregorianCalendar.DATE, days - 1);
        java.util.Date addDate = gc.getTime();
        return (end.compareTo (addDate) <= 0);
    }


    /**
     * 得到如下字符串 "YYYY-MM-DD HH:MM:SS"
     * @param d 时间戳，如果传入为null,则返回“”；
     * @return 日期时间串
     */
    public static String toStdDateTimeString(java.util.Date d) {
        if(d==null)return "";
        return stdDatetimeFormat.format(d);
    }
    /**
     * 得到如下字符串 "YYYY-MM-DD HH:MM:SS"
     * @param d long, 例如20110304131101
     * @return 日期时间串，如：2011-03-04 13:11:01
     */
    public static String toStdDateTimeString(long d) {
        return toStdDateTimeString(String.valueOf(d));
    }
    /**
     * 得到如下字符串 "YYYY-MM-DD HH:MM:SS"
     * @param d String, 例如20110304131101
     * @return 日期时间串，如：2011-03-04 13:11:01
     */
    public static String toStdDateTimeString(String d) {
        if(d==null || d.length()!=14)return "";
        return toStdDateString(d.substring(0,8)) + " " + d.substring (8, 10) + ":" + d.substring (10, 12) + ":" + d.substring (12);
    }
    /**
     * 得到如下格式字符串 "YYYY-MM-DD"
     * @param d 时间戳 如果传入为null,则返回“”；
     * @return 日期时间串
     */
    public static String toStdDateString(java.util.Date d) {
        if(d==null)return "";
        return stdDateFormat.format(d);
    }
    /**
     * 将yyyyMMdd变为yyyy-mm-dd
     * @param s 原日期串，默认用-进行分割
     * @return yyyy-mm-dd
     */
    public static String toStdDateString(String s) {
        return toStdDateString(s,"-",false);
    }
    /**
     * 将yyyyMMdd日期串用分隔符进行分割
     * @param s 原日期串，默认用-进行分割
     * @param split 分隔符；
     * @param returnEmptyIfErrDate 如果不是8位的日期串，则控制是反馈“”，还是返回原串；
     * @return 用分隔符，如“-”，“.”进行分割后的日期串；
     */
    public static String toStdDateString(String s,String split,boolean returnEmptyIfErrDate) {
        try {
            if (s == null || s.length () != 8){
                return returnEmptyIfErrDate? "":s;
            }
            return s.substring (0, 4) + split + s.substring (4, 6) + split + s.substring (6);
        } catch (Exception e) {
            return "";
        }
    }
    /**
     * 将20010101类型数字分割为2001-01-01，默认分隔符为"-";
     * @param l long
     * @return yyyy-mm-dd
     */
    public static String toStdDateString(long l){
        return toStdDateString(String.valueOf(l), "-",false);
    }
    /**
     * 将20010101格式的数据转换成2001?01?01格式的显示，?标识分隔符
     * @param l 日期
     * @param split 分隔符；
     * @param returnEmptyIfErrDate 如果不是8位的日期串，则控制是反馈“”，还是返回原串；
     * @return 2001-01-01
     */
    public static String toStdDateString(long l,String split,boolean returnEmptyIfErrDate){
        return toStdDateString(String.valueOf(l), split,returnEmptyIfErrDate);
    }
    /**
     * 得到如下字符串 "HH:mm:ss"
     * @param date 时间戳，如果传入为null,则返回为当前日期；
     * @return 时间串
     */
    public static String toStdTimeString(java.util.Date date) {
        if (date == null) date = nowDate();
        return stdTimeFormat.format(date);
    }


    /**
     * 将日期变为"yyyyMMdd"
     * @param date 日期
     * @return  字符串，如果传入参数为null,则返回当前日期；
     */
    public static String toDateString(java.util.Date date) {
        if (date == null) date = nowDate();
        return simpleDateFormat.format(date);
    }
    /**
     * 得到如下字符串 "HHmmss"
     * @param date 时间戳 如果传入为NULL,则返回当前日期；
     * @return 时间串
     */
    public static String toTimeString(java.util.Date date) {
        if (date == null) date = nowDate();
        return simpleTimeFormat.format(date);
    }

    /**
     * 得到长日期时间字符[yyyyMMddHHmmss]
     * @param date 时间戳，如果传入为null,则返回当前日期
     * @return 日期时间串
     */
    public static String toDateTimeString(java.util.Date date) {
        if (date == null) date = nowDate();
        return simpleDatetimeFormat.format(date);
    }
    /**
     * 得到长日期时间字符[yyyyMMddHHmmssS]
     * @param date 时间戳，如果传入为null,则返回当前日期
     * @return 日期时间串，长
     */
    public static String toLongDateTimeString(java.util.Date date) {
        if (date == null) date = nowDate();
        return simpleLongDatetimeFormat.format(date);
    }
    /**
     * 将日期格式：2010-01-01,2011.01.01,2011年01月01日转换成数字；
     * @param ds 日期字符串
     * @return Long,例如20100101
     */
    public static Long toDateNumber(String ds){
        if(UtilValidate.isEmpty(ds) || "-1".equals(ds) || "0".equals(ds)) return -1L;
        try {
            //即去掉串中的非数字字符；
            Pattern pattern = Pattern.compile("\\D", Pattern.DOTALL);
            Matcher matcher = pattern.matcher(ds);
            return Long.valueOf(matcher.replaceAll(""));
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return -1L;
        }
    }

    /**
     * 将strDateTime换成Timestamp对象，如果不能转会，则返回当前时间戳。
     * @param datetime 一个时间格式的字符串；
     * @return 如果strDateTime 有效，则返回它的时间戳，否则返回当前系统时间戳.
     */
    public static java.sql.Timestamp toTimestampDefaultNow(String datetime) {
        try {
            return java.sql.Timestamp.valueOf(datetime);
        } catch (Exception e) {
            return nowTimestamp();
        }
    }
    /**
     * 将字符串转换成Java.sql.Date,不能转换，这返回null
     * @param src 源串
     * @return java.sql.Date
     */
    public static java.sql.Date toDate(String src) {
        try {
            if(UtilValidate.isEmpty(src)) return null;
            return java.sql.Date.valueOf(src);
        } catch (Exception e) {
            return null;
        }
    }

    public static java.sql.Date toDate(java.sql.Timestamp datetime) {
        if (datetime == null) return null;
        return new java.sql.Date(datetime.getTime());
    }
    /**
     * 将字符串转换成Java.sql.Date,不能转换，则返回当前日期
     * @param src 源串
     * @return java.sql.Date
     */
    public static java.sql.Date toDateDefaultNow(String src) {
        try {
            if(UtilValidate.isEmpty(src)) return nowDate();
            return java.sql.Date.valueOf(src);
        } catch (Exception e) {
            return nowDate();
        }
    }
    /**
     * 将字符串转换成Java.sql.Date,不能转换，则返回当前日期
     * @return java.sql.Date
     */
    public static java.sql.Date toDateDefaultNow(java.sql.Timestamp datetime) {
        if (datetime == null) return nowDate();
        return new java.sql.Date(datetime.getTime());
    }
    /** Makes a Date from separate ints for month, day, year, hour, minute, and second.
     * @param month The month int
     * @param day The day int
     * @param year The year int
     * @param hour The hour int
     * @param minute The minute int
     * @param second The second int
     * @return A Date made from separate ints for month, day, year, hour, minute, and second.
     */
    public static java.sql.Date toDate(int month, int day, int year, int hour, int minute, int second) {
        Calendar calendar = Calendar.getInstance();
        try {
            calendar.set(year, month - 1, day, hour, minute, second);
        } catch (Exception e) {
            return null;
        }
        return new java.sql.Date(calendar.getTime().getTime());
    }
    /** Makes a Date from separate Strings for month, day, year, hour, minute, and second.
     * @param monthStr The month String
     * @param dayStr The day String
     * @param yearStr The year String
     * @param hourStr The hour String
     * @param minuteStr The minute String
     * @param secondStr The second String
     * @return A Date made from separate Strings for month, day, year, hour, minute, and second.
     */
    public static java.sql.Date toDate(String monthStr, String dayStr, String yearStr, String hourStr,String minuteStr, String secondStr) {
        int month, day, year, hour, minute, second;
        try {
            month = Integer.parseInt(monthStr);
            day = Integer.parseInt(dayStr);
            year = Integer.parseInt(yearStr);
            hour = Integer.parseInt(hourStr);
            minute = Integer.parseInt(minuteStr);
            second = Integer.parseInt(secondStr);
        } catch (Exception e) {
            return null;
        }
        return toDate(month, day, year, hour, minute, second);
    }


    /** 比较两个日期是否相等 */
    public static int compareDate(java.util.Date a, java.util.Date b) {
        // java.sql.Date date = new java.sql.Date(System.currentTimeMillis());
        // date中,会保留有时间秒数.
        // java.sql.Date a = java.sql.Date.valueOf("2007-01-01");
        // a中,就没有时间秒数
        // 所以,在比较时就统一按字符串[yyyy-MM-dd]进行比较而不直接用a.compareTo(b)
        String stra = toStdDateString (a);
        String strb = toStdDateString (b);
        return stra.compareTo (strb);
    }

    public static Calendar getGMT8Calendar() {
        return Calendar.getInstance (mTimeZone);
    }
}
