package cc.water.ciro.common.utils;

import cc.water.ciro.common.util.StringUtil;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-10
 * Time: 下午11:58
 * To change this template use File | Settings | File Templates.
 */
public class UtilDate {
    public final static SimpleDateFormat stdTimeFormat = new SimpleDateFormat("HH:mm:ss");
    public final static SimpleDateFormat stdDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    public final static SimpleDateFormat stdDatetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public final static SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HHmmss");
    public final static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    public final static SimpleDateFormat simpleDatetimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    public final static SimpleDateFormat simpleLongDatetimeFormat = new SimpleDateFormat("yyyyMMddHHmmssS");
    /**
     * yyyy-MM-dd
     */
    public static SimpleDateFormat sdDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    /**
     * yyyyMMdd
     */
    public static SimpleDateFormat sdSimpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    /**
     * yyyy-MM-dd HH:mm:ss
     */
    public static SimpleDateFormat sdDatetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    /**
     * yyyyMMdd HHmmss
     */
    public static SimpleDateFormat sdSimpleDatetimeFormat = new SimpleDateFormat("yyyyMMdd HHmmss");
    /* HH:mm:ss */
    public static SimpleDateFormat stdTimeSimpleDatetimeFormat = new SimpleDateFormat("HH:mm:ss");

    private static TimeZone mTimeZone = TimeZone.getTimeZone("Asia/Shanghai");

    static {
        sdDateFormat.setTimeZone(mTimeZone);
        sdSimpleDateFormat.setTimeZone(mTimeZone);
        sdDatetimeFormat.setTimeZone(mTimeZone);
        sdSimpleDatetimeFormat.setTimeZone(mTimeZone);
        stdTimeSimpleDatetimeFormat.setTimeZone(mTimeZone);
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

    public static Calendar getGMT8Calendar() {
        return Calendar.getInstance (mTimeZone);
    }
    public static int nowHour() {
        Calendar calendar = getGMT8Calendar ();
        return calendar.get(Calendar.HOUR_OF_DAY);
    }

    /** return a.minute() + minutes */
    public static java.sql.Date getAfterMinute(Date d, int minutes) {
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
    public static String getAfterDays(Date dt, int days) {
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

    public static java.sql.Date getAfterDate(Date dt, int days) {
        if(dt==null) return null;
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTime(dt);
        gc.add(GregorianCalendar.DATE, days);
        return new java.sql.Date(gc.getTimeInMillis());
    }

    /**
     * 取与指定日期间隔月的日期(yyyy-mm-dd)
     * @return String java.sql.Date.toString()
     */
    public static String getAfterMonth(Date dt, int months) {
        if(dt==null) return "";
        if (months == 0) return dt.toString();
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.MONTH, months);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return ret.toString();
    }

    /**
     * 取与指定日期间隔年的日期
     * @return String java.sql.Date.toString()
     */
    public static String getAfterYear(Date dt, int years) {
        if(dt==null) return "";
        if (years == 0) return dt.toString();
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.YEAR, years);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return ret.toString();
    }

    /**
     * 得到当前日期所在周次的星期一
     * @return 返回的时间戳
     */
    public static Timestamp getWeekStart() {
        return getWeekStart(new Timestamp(System.currentTimeMillis()));
    }
    /**
     *  得到日期所在周次的星期一
     * @param stamp 参数时间戳，如果传入为null,则返回为null
     * @return 返回时间戳
     */
    public static Timestamp getWeekStart(Timestamp stamp) {
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

        Timestamp retStamp = new Timestamp(tempCal.getTime().getTime());
        retStamp.setNanos(0);
        return retStamp;
    }
    /** 当前日期的下周星期一 */
    public static Timestamp getNextWeekStart() {
        return getNextWeekStart(new Timestamp(System.currentTimeMillis()));
    }
    /**
     * 当前日期的下周星期一,如果传入null,则返回为null
     * @param t 要计算的时间戳
     * @return 返回的时间戳
     */
    public static Timestamp getNextWeekStart(Timestamp t) {
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

        Timestamp retStamp = new Timestamp(tempCal.getTime().getTime());
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
    public static String getMonthStart(Date d) {
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
    public static String getMonthEnd(Date d) {
        return getAfterDays(getAfterMonth(getMonthStart(d), 1), -1);
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
    public static boolean isBeforeDate(Date beging, int days, Date end) {
        GregorianCalendar gc = new GregorianCalendar ();
        gc.setTimeZone (mTimeZone);
        gc.setTime (beging);
        gc.add (GregorianCalendar.DATE, days - 1);
        Date addDate = gc.getTime();
        return (end.compareTo (addDate) <= 0);
    }


    /**
     * 得到如下字符串 "YYYY-MM-DD HH:MM:SS"
     * @param d 时间戳，如果传入为null,则返回“”；
     * @return 日期时间串
     */
    public static String toStdDateTimeString(Date d) {
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
    public static String toStdDateString(Date d) {
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
    public static String toStdTimeString(Date date) {
        if (date == null) date = nowDate();
        return stdTimeFormat.format(date);
    }

    /**
     * 得到如下字符串 "HHmmss"
     * @param date 时间戳 如果传入为NULL,则返回当前日期；
     * @return 时间串
     */
    public static String toTimeString(Date date) {
        if (date == null) date = nowDate();
        return simpleTimeFormat.format(date);
    }

    /**
     * 得到长日期时间字符[yyyyMMddHHmmss]
     * @param date 时间戳，如果传入为null,则返回当前日期
     * @return 日期时间串
     */
    public static String toDateTimeString(Date date) {
        if (date == null) date = nowDate();
        return simpleDatetimeFormat.format(date);
    }
    /**
     * 得到长日期时间字符[yyyyMMddHHmmssS]
     * @param date 时间戳，如果传入为null,则返回当前日期
     * @return 日期时间串，长
     */
    public static String toLongDateTimeString(Date date) {
        if (date == null) date = nowDate();
        return simpleLongDatetimeFormat.format(date);
    }
    /**
     * 将日期格式：2010-01-01,2011.01.01,2011年01月01日转换成数字；
     * @param ds 日期字符串
     * @return Long,例如20100101
     */
    public static Long toDateNumber(String ds){
        if(StringUtil.isEmpty(ds) || "-1".equals(ds) || "0".equals(ds)) return -1L;
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
    public static Timestamp toTimestampDefaultNow(String datetime) {
        try {
            return Timestamp.valueOf(datetime);
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
            if(StringUtil.isEmpty(src)) return null;
            return java.sql.Date.valueOf(src);
        } catch (Exception e) {
            return null;
        }
    }

    public static java.sql.Date toDate(Timestamp datetime) {
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
            if(StringUtil.isEmpty(src)) return nowDate();
            return java.sql.Date.valueOf(src);
        } catch (Exception e) {
            return nowDate();
        }
    }
    /**
     * 将字符串转换成Java.sql.Date,不能转换，则返回当前日期
     * @return java.sql.Date
     */
    public static java.sql.Date toDateDefaultNow(Timestamp datetime) {
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
    public static int compareDate(Date a, Date b) {
        // java.sql.Date date = new java.sql.Date(System.currentTimeMillis());
        // date中,会保留有时间秒数.
        // java.sql.Date a = java.sql.Date.valueOf("2007-01-01");
        // a中,就没有时间秒数
        // 所以,在比较时就统一按字符串[yyyy-MM-dd]进行比较而不直接用a.compareTo(b)
        String stra = toStdDateString (a);
        String strb = toStdDateString (b);
        return stra.compareTo (strb);
    }
    /** Return a Timestamp for right now
     * @return Timestamp for right now
     */
    public static Timestamp nowTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }
    // 设置默认时区
    public static void setDefaultTimeZone(String timeZone) {
        mTimeZone = TimeZone.getTimeZone(timeZone);
    }

    public static java.sql.Date getTodayDate() {
        return new java.sql.Date(System.currentTimeMillis());
    }

    /**
     * 取得系统今天的时间串
     * @return "YYYY-MM-DD HH:MM:SS"
     */
    public static String getNow() {
        return sdDatetimeFormat.format(new Timestamp(System.currentTimeMillis()));
    }

    /**
     * 获取系统今天的时间
     * @return Timestamp
     */
    public static Timestamp getNowTime() {
        return new Timestamp(System.currentTimeMillis());
    }

    /**
     * 得到当前时间串
     * @param strDateTime 一个时间格式的字符串；
     * @return Timestamp
     */
    public static Timestamp getNow(String strDateTime) {
        try {
            return Timestamp.valueOf(strDateTime);
        } catch (Exception e) {
            return new Timestamp(System.currentTimeMillis());
        }
    }

    /**
     * 得到当前时间的零点
     * @param strDateTime
     * @return
     */
    public static Timestamp getToday(String strDateTime) {
        try {
            return Timestamp.valueOf(strDateTime + " 00:00:00");
        } catch (Exception ex) {
            return Timestamp.valueOf(getToday() + " 00:00:00");
        }
    }

    // 取得系统今天的时间串(返回 "HH:MM:SS")
    public static String getStdTime(Date date) {
        return stdTimeSimpleDatetimeFormat.format(date);
    }

    /**
     * 取得系统今天的时间串
     * @return "YYYYMMDD_HHMMSS"
     */
    public static String getNow_YYYYMMDD_HHMMSS() {
        return new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Timestamp(System.currentTimeMillis()));
    }

    public static String getToday() {
        return sdDateFormat.format(new Date(System.currentTimeMillis()));
    }

    public static String getCurTime() {
        return stdTimeSimpleDatetimeFormat.format(new Date(System.currentTimeMillis()));
    }
    /**
     * 取得系统今天的时间串
     * @return current datetime, pattern:"yyyyMMddHHmmss"
     */
    public static String nowDateTimeString() {
        return simpleDatetimeFormat.format(nowTimestamp());
    }
    /**
     * 返回当前月
     * @return YYYY-MM
     */
    public static String getMonth() {
        return getToday().substring(0, 7);
    }

    /**
     * 返回指定日期串的月
     * @param date 字符串日期（YYYY-MM-DD）
     * @return YYYY-MM
     */
    public static String getMonth(String date) {
        return date.substring(0, 7);
    }

    /**
     * 获取当前日期所处年
     * @return 年串 4位
     */
    public static String getTodayYear() {
        return getToday().substring(0, 4);
    }

    public static String getYear(String date) {
        return date.substring(0, 4);
    }

    /**
     * 获取当前日期所处月
     * @return 月串 两位
     */
    public static int getTodayMonthInt() {
        return Integer.valueOf(getTodayMonth());
    }

    /**
     * 获取当前日期所处月
     * @return 月串 两位
     */
    public static String getTodayMonth() {
        return getToday().substring(5, 7);
    }

    /**
     * 获取当前日期所处月,却掉了前置的0.
     */
    public static String getTodayMonth2() {
        String month = getTodayMonth();
        if (month.charAt(0) == '0') {
            return String.valueOf(month.charAt(1));
        }
        return month;
    }

    /**
     * 获取当前日期所出天
     * @return 天串 两位
     */
    public static String getTodayDay() {
        return getToday().substring(8, 10);
    }

    /**
     * 取与指定时间间隔分钟的时间
     * @param dt   时间
     * @param minutes 间隔分钟，正数往前，负数往后
     * @return String
     */
    public static String getAfterMinutes(Timestamp dt, int minutes) {
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.MINUTE, minutes);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return formatDateTime(ret);
    }

    /**
     * 取与指定时间间隔分钟的时间
     * @param dt      时间
     * @param minutes 间隔分钟，正数往前，负数往后
     * @return String
     */
    public static String getAfterMinutes(String dt, int minutes) {
        return getAfterMinutes(Timestamp.valueOf(dt), minutes);
    }

    /**
     * 取与指定日期间隔天的日期
     * @param dt   日期
     * @param days 间隔天数，正数往前，负数往后
     * @return String
     */
    public static String getAfterDays(java.sql.Date dt, int days) {
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.DATE, days);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return ret.toString();
    }

    /**
     * 取与指定日期间隔天的日期
     * @param dt   日期
     * @param days 间隔天数，正数往前，负数往后
     * @return String
     */
    public static String getAfterDays(String dt, int days) {
        try {
            return getAfterDays(java.sql.Date.valueOf(dt), days);
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * 取与指定日期间隔月的日期
     * @param dt     指定月份
     * @param months 相差的月数，支持负数
     * @return String
     */
    public static String getAfterMonth(java.sql.Date dt, int months) {
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.MONTH, months);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return ret.toString();
    }

    public static String getAfterMonth(String dt, int months) {
        return getAfterMonth(java.sql.Date.valueOf(dt), months);
    }

    /**
     * 取与指定日期间隔年的日期
     * @param dt    指定日期
     * @param years 间隔年，支持负数
     * @return String
     */
    public static String getAfterYear(java.sql.Date dt, int years) {
        GregorianCalendar dy = new GregorianCalendar();
        dy.setTime(dt);
        dy.add(GregorianCalendar.YEAR, years);
        java.sql.Date ret = new java.sql.Date(dy.getTimeInMillis());
        return ret.toString();
    }

    public static String getAfterYear(String dt, int years) {
        return getAfterYear(java.sql.Date.valueOf(dt), years);
    }

    /**
     * 获取日期相差天数
     * @param fromDate 开始日期
     * @param thruDate 结束日期
     * @return int
     * @throws IllegalArgumentException 异常
     */
    public static int getDifferDays(java.sql.Date fromDate, java.sql.Date thruDate) throws IllegalArgumentException {
        if (thruDate.compareTo(fromDate) < 0) {
            String msg = "[" + thruDate + "] 比" + "[" + fromDate + "] 早, 应该相反!";
            throw new IllegalArgumentException(msg);
        }
        return (int) ((thruDate.getTime() - fromDate.getTime()) / (24 * 60 * 60 * 1000));
    }

    /**
     * 获取时间相差小时
     * @param fromTime 开始时间
     * @param thruTime 结束时间
     * @return int
     * @throws IllegalArgumentException 异常
     */
    @SuppressWarnings({"ImplicitNumericConversion"})
    public static double getDifferHours(Timestamp fromTime, Timestamp thruTime) throws IllegalArgumentException {
        return getDifferMinutes(fromTime, thruTime) / 60.0;
    }

    public static int getDifferMinutes(Timestamp fromTime, Timestamp thruTime) throws IllegalArgumentException {
        return getDifferSeconds(fromTime, thruTime) / 60;
    }

    public static int getDifferSeconds(Timestamp fromTime, Timestamp thruTime) throws IllegalArgumentException {
        if (thruTime.compareTo(fromTime) < 0) {
            String msg = "[" + thruTime + "] 比" + "[" + fromTime + "] 早, 应该相反!";
            throw new IllegalArgumentException(msg);
        }
        return (int) (thruTime.getTime() - fromTime.getTime()) / (1000);
    }

    public static int getDifferMinutes(String fromTime, String thruTime) throws IllegalArgumentException {
        return getDifferSeconds(Timestamp.valueOf(fromTime), Timestamp.valueOf(thruTime)) / 60;
    }

    /**
     * 下周开始日期
     * @return String
     */
    public static String getNextWeekBegin() {
        return UtilDate.getAfterDays(new java.sql.Date(nextWeekBegin(null).getTime()).toString(), -1);
    }

    /**
     * 本周开始日期
     * @return String
     */
    public static String getWeekBegin() {
        return UtilDate.formatDate(weekBegin(null));
    }

    public static String getWeekBegin(String date) {
        return UtilDate.formatDate(weekBegin(java.sql.Date.valueOf(date)));
    }

    /**
     * 指定日期的n天之后的日期
     * @param date 指定日期
     * @param n    往后n天
     * @return Date
     */
    public static Date getAfterOf(Date date, int n) {
        Date retDate;
        if (date.toString().equalsIgnoreCase("9999-12-31")) {
            return date;
        }
        String strDate = getAfterDays(date.toString(), n);
        retDate = java.sql.Date.valueOf(strDate);
        return retDate;
    }

    // 星期枚举
    public enum WeekDayEnum {
        Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
    }

    public static WeekDayEnum getWeekDay() {
        return getWeekDay(getNowTime());
    }

    // 判断特定日期的星期
    public static WeekDayEnum getWeekDay(Date date) {
        Calendar c = getCalendar(date);
        switch (c.get(Calendar.DAY_OF_WEEK)) {
            case 1:
                return WeekDayEnum.Sunday;
            case 2:
                return WeekDayEnum.Monday;
            case 3:
                return WeekDayEnum.Tuesday;
            case 4:
                return WeekDayEnum.Wednesday;
            case 5:
                return WeekDayEnum.Thursday;
            case 6:
                return WeekDayEnum.Friday;
            default:
                return WeekDayEnum.Saturday;
        }
    }

    // 判断特定日期的星期
    public static WeekDayEnum getWeekDay(String sDate) {
        return getWeekDay(parseDate(sDate));
    }

    public static int getTodayHour() {
        return getHour(getNowTime());
    }

    public static int getTodayMinute() {
        return getMinute(getNowTime());
    }

    public static int getHour(Date date) {
        Calendar c = getCalendar(date);
        return c.get(Calendar.HOUR_OF_DAY);
    }

    public static int getMinute(Date date) {
        Calendar c = getCalendar(date);
        return c.get(Calendar.MINUTE);
    }


    /**
     * 得到如下字符串 "YYYY-MM-DD HH:MM:SS"
     * @param date 要格式化的日期
     * @return String
     */
    public static String formatDateTime(Date date) {
        if (date == null) return "";
        return sdDatetimeFormat.format(date);
    }

    public static String formatDate(Date date) {
        if (date == null) return "";
        return sdDateFormat.format(date);
    }

    /**
     * 取得当月第一天日期串
     * @return String
     */
    public static String getMonthFirstDay() {
        return getMonth() + "-01";
    }

    public static String getMonthFirstDay(String date) {
        return getMonth(date) + "-01";
    }

    /**
     * 取得当月最后一天
     * @return String
     */
    public static String getMonthLastDay() {
        return getAfterDays(getAfterMonth(getMonthFirstDay(), 1), -1);
    }

    /**
     * 取得当月最后一天
     * @return String
     */
    public static String getMonthLastDay(String date) {
        return getAfterDays(getAfterMonth(getMonth(date) + "-01", 1), -1);
    }

    /**
     * 得到本季度的第一天
     * @return
     */
    public static String getSeasonFirstDay() {
        return UtilDate.formatDate(seasonBegin(null));
    }

    public static String getSeasonFirstDay(String date) {
        return UtilDate.formatDate(seasonBegin(java.sql.Date.valueOf(date)));
    }

    /**
     * 得到本季度最后一天
     * @return
     */
    public static String getSeasonLastDay() {
        String s = UtilDate.formatDate(nextSeasonBegin(null));
        return UtilDate.getAfterDays(s, -1);
    }

    public static String getSeasonLastDay(String date) {
        String s = UtilDate.formatDate(nextSeasonBegin(java.sql.Date.valueOf(date)));
        return UtilDate.getAfterDays(s, -1);
    }

    public static String getYearFirstDay() {
        return UtilDate.getTodayYear() + "-01-01";
    }

    public static String getYearFirstDay(String date) {
        return UtilDate.getYear(date) + "-01-01";
    }

    public static String getYearLastDay() {
        return UtilDate.getTodayYear() + "-12-31";
    }

    public static String getYearLastDay(String date) {
        return UtilDate.getYear(date) + "-12-31";
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
     * @param format  字符串，YYYY-MM,YYYYMM,YYYYMMDD,YYYY-MM-DD,YYYY-MM-DD:HH, 空表示所有上述格式,非上述内容将默认为YYYY-MM-DD；
     * @return boolean 如果为日期格式则返回=true;
     */
    public static boolean isDateFormat(String strDate, String format) {
        if (UtilPub.isEmpty(strDate)) {
            return false;
        }
        if (UtilPub.isEmpty(format)) {
            format = "YYYY-MM-DD";
        }
        if (format.equals("YYYY-MM")) {
            return strDate.matches("\\d{4}-\\d{2}") &&
                    isDateValue(strDate.substring(0, 4), strDate.substring(5), "01");
        } else if (format.equals("YYYYMM")) {
            return strDate.matches("\\d{6}") &&
                    isDateValue(strDate.substring(0, 4), strDate.substring(4), "01");
        } else if (format.equals("YYYYMMDD")) {
            return strDate.matches("\\d{8}") &&
                    isDateValue(strDate.substring(0, 4), strDate.substring(4, 6), strDate.substring(6));
        } else if (format.equals("YYYY-MM-DD")) {
            return strDate.matches("\\d{4}-\\d{2}-\\d{2}") &&
                    isDateValue(strDate.substring(0, 4), strDate.substring(5, 7), strDate.substring(8));
        } else if (format.equals("YYYY-MM-DD:HH")) {
            return strDate.matches("\\d{4}-\\d{2}-\\d{2}:[0-5][0-9]") &&
                    isDateValue(strDate.substring(0, 4), strDate.substring(5, 7), strDate.substring(8, 10));
        }
        return false;
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

    public static Date parseDate(String sDate) {
        return java.sql.Date.valueOf(sDate);
    }

    public static Date now() {
        return new Timestamp(new Date().getTime());
    }

    public static Date todayBegin() {
        Calendar calendar = getCalendar(null);

        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date nextDayBegin(int daysShift) {
        return nextDayBegin(new Date(), daysShift);
    }

    public static Date nextDayBegin(Date dateFrom, int daysShift) {
        Calendar calendar = getCalendar(dateFrom);

        calendar.set(calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH),
                0, 0, 0);
        calendar.add(Calendar.DAY_OF_MONTH, daysShift);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date weekBegin(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.DAY_OF_WEEK, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date nextWeekBegin(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.DAY_OF_WEEK, 8);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date monthBegin(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date nextMonthBegin(Date date) {
        Calendar calendar = getCalendar(date);
        int daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, daysInMonth + 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    /**
     * 中旬的开始
     * @return
     */
    public static Date secondTriplOfMonthBegin(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.DAY_OF_MONTH, 11);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    /**
     * 下旬开始
     * @return
     */
    public static Date thirdTriplOfMonthBegin(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.DAY_OF_MONTH, 21);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    final static int[] m_seasonBeginTable = new int[]{
            Calendar.JANUARY, Calendar.JANUARY, Calendar.JANUARY,
            Calendar.APRIL, Calendar.APRIL, Calendar.APRIL,
            Calendar.JULY, Calendar.JULY, Calendar.JULY,
            Calendar.OCTOBER, Calendar.OCTOBER, Calendar.OCTOBER
    };

    /**
     * 季度开始
     * @return
     */
    public static Date seasonBegin(Date date) {
        Calendar calendar = getCalendar(date);
        int curMonth = calendar.get(Calendar.MONTH);
        int seasonMonth = m_seasonBeginTable[curMonth];

        calendar.set(Calendar.MONTH, seasonMonth);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    /**
     * 下个季度开始
     * @return
     */
    public static Date nextSeasonBegin(Date date) {
        Calendar calendar = getCalendar(date);
        int curMonth = calendar.get(Calendar.MONTH);
        int seasonMonth = m_seasonBeginTable[curMonth] + 3;
        if (date != null) calendar.setTime(date);
        calendar.set(Calendar.MONTH, seasonMonth);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date yearBegin(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.MONTH, Calendar.JANUARY);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date nextYearBegin(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.MONTH, Calendar.JANUARY);
        calendar.add(Calendar.YEAR, 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date lastYearBegin(Date date) {
        Calendar calendar = getCalendar(date);

        calendar.set(Calendar.MONTH, Calendar.JANUARY);
        calendar.add(Calendar.YEAR, -1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    public static Date dayOfLastYear(Date date) {
        Calendar calendar = getCalendar(date);

        calendar.add(Calendar.YEAR, -1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.AM_PM, Calendar.AM);
        return new Timestamp(calendar.getTime().getTime());
    }

    private static Calendar getCalendar(Date date) {
        Calendar calendar = Calendar.getInstance();
        if (date != null) calendar.setTime(date);
        return calendar;
    }

    public static String toDateString(Date date) {
        if (date == null) return "";
        Calendar calendar = getCalendar(date);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int year = calendar.get(Calendar.YEAR);
        String monthStr;
        String dayStr;
        String yearStr;
        if (month < 10) {
            monthStr = "0" + month;
        } else {
            monthStr = "" + month;
        }
        if (day < 10) {
            dayStr = "0" + day;
        } else {
            dayStr = "" + day;
        }
        yearStr = "" + year;
        return yearStr + "-" + monthStr + "-" + dayStr;
    }

    public static void main(String[] args) {
        String d = "2016-11-10";
        System.out.println("date::::" + d);
        System.out.println("date::::" + d);
        System.out.println("getWeekBegin:::" + getWeekBegin(d));
        System.out.println("getMonthFirstDay:::" + getMonthFirstDay(d));
        System.out.println("getMonthLastDay:::" + getMonthLastDay(d));
        System.out.println("getSeasonFirstDay:::" + getSeasonFirstDay(d));
        System.out.println("getSeasonLastDay:::" + getSeasonLastDay(d));
        System.out.println("getYearFirstDay:::" + getYearFirstDay(d));
        System.out.println("getYearLastDay:::" + getYearLastDay(d));
    }
}