package cc.water.ciro.common.base;

import cc.water.ciro.common.util.ArrayUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.UtilDate;
import cc.water.ciro.common.utils.UtilPub;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-26
 * Time: 下午12:59
 * To change this template use File | Settings | File Templates.
 */
@Component
public class CommonHelper {


    public static List<String> getStrDel(String newStr, String oldStr,
                                         String splitStr) throws Exception {
        if (StringUtil.isEmpty(oldStr)) {
            return ArrayUtil.toList(new String[0]);
        }
        if (StringUtil.isEmpty(newStr)) {
            return ArrayUtil.toList(oldStr.split(splitStr));
        }
        List<String> list = new ArrayList<String>();
        String[] newStrArray = newStr.split(splitStr);
        String[] oldStrArray = oldStr.split(splitStr);
        for (String oldItem : oldStrArray) {
            Boolean isEqual = false;
            for (String newItem : newStrArray) {
                if (newItem.equals(oldItem)) {
                    isEqual = true;
                    break;
                }
            }
            if (!isEqual) {
                list.add(oldItem);
            }
        }
        return list;
    }

    public static int getPageNoByRowId(int rowNo, int rows) throws Exception {
        if (rowNo <= rows) return 1;
        int pageNo = rowNo / rows + 1;
        if (rowNo % rows == 0) pageNo--;
        return pageNo;
    }

    /**
     * 增加日期字段条件，可能多选
     *
     * @param value    值
     */
    public static String getDateCon( String value) {
        if (UtilPub.isEmpty(value)) return "";
        String[] st = value.split(",");
        if (st.length == 0 || "A".equals(st[0])) {//无
            return "";
        }
        String s =  UtilDate.getToday();
        StringBuffer sb = new StringBuffer();
        if (st.length > 0) {
            if ("D".equals(st[0])) {//当天  考虑日期时间的情况
                sb.append(s).append(",").append(UtilDate.getAfterDays(s, 1));
            } else if ("W".equals(st[0])) {//本周
                s = UtilDate.getWeekBegin(s);
                sb.append(s).append(",").append(UtilDate.getAfterDays(s, 8));
            } else if ("M".equals(st[0])) {//本月
                sb.append(UtilDate.getMonthFirstDay(s)).append(",").append(UtilDate.getMonthLastDay(s)).append(" 23:59:59'");
            } else if ("Q".equals(st[0])) {//本季度
                sb.append(UtilDate.getSeasonFirstDay(s)).append(",").append(UtilDate.getSeasonLastDay(s)).append(" 23:59:59'");
            } else if ("Y".equals(st[0])) {//本年
                sb.append(UtilDate.getYearFirstDay(s)).append(",").append(UtilDate.getYearLastDay(s)).append(" 23:59:59'");
            } else {//自定义
                String df, de;
                if (st.length > 1) df = st[1];
                else df = "";
                if (st.length > 2) de = st[2];
                else de = "";
                if(UtilPub.isNotEmpty(df)&&UtilPub.isNotEmpty(de)){
                    sb.append(df).append(",").append(de);
                }
            }
        }
        return  sb.toString();
    }

    /**
     * String 转 Date
     */
    public static Date stringToDate(String date) {
        if (date.equals("")) return UtilDate.getTodayDate();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        Date time = null;
        try {
            time = formatDate.parse(date);
        } catch (ParseException e) {
            return UtilDate.getTodayDate();
        }
        return time;
    }

    //计算年龄
    public static int getAge(Date birthDay) throws Exception {
        Calendar cal = Calendar.getInstance();

        if (cal.before(birthDay)) {
            throw new Exception(
                    "出生日期比当前日期大，日期输入出错！");
        }

        int yearNow = cal.get(Calendar.YEAR);
        int monthNow = cal.get(Calendar.MONTH);
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);
        cal.setTime(birthDay);

        int yearBirth = cal.get(Calendar.YEAR);
        int monthBirth = cal.get(Calendar.MONTH);
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);

        int age = yearNow - yearBirth;

        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                //monthNow==monthBirth
                if (dayOfMonthNow < dayOfMonthBirth) {
                    age--;
                } else {
                    //do nothing
                }
            } else {
                //monthNow>monthBirth
                age--;
            }
        } else {
            //monthNow<monthBirth
            //donothing
        }

        return age;
    }

}
