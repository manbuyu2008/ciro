package cc.water.ciro.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;


/**
 * 
 * 
 * @Filename DateUtil.java
 * 
 * @Description
 * 
 * @Version 1.0
 * 
 * @Author zjl
 * 
 * @Email zjialin@yiji.com
 * 
 * @History <li>Author: zjil</li> <li>Date: 2013-6-13</li> <li>Version: 1.0</li>
 * <li>Content: create</li>
 * 
 */
public class DateUtil extends DateUtilBase {
	
	protected static final Logger logger = LoggerFactory.getLogger(DateUtil.class);
	
	/** 完整时间 yyyy-MM-dd HH:00:00 */
	public static final String dtSimpleYmdh = "yyyy-MM-dd HH:00:00";
	
	/** 完整时间 yyyy-MM-ddHH:00:00 */
	public static final String dtSimpleYmdhNoSpace = "yyyy-MM-ddHH:00:00";
	
	public static final String dtSimpleYmdhms = "yyyy-MM-dd HH:mm:ss";
	
	public static final String formatDD = "dd";
	public static final String formatYM = "yyyy.MM";
	
	//private static SimpleDateFormat format = new SimpleDateFormat(dtSimpleYmdhms);
	
	public static final String dtSimpleYmdhChinese = "yyyy年MM月dd日 HH:00:00";
	
	public static final String mdhChinese = "yyyy年MM月dd日";
	
	public static final String MdHmsChinese = "MM月dd日   HH:mm:ss";
	
	/** 完整时间 yyyy-MM-dd */
	public static final String dtSimple = "yyyy-MM-dd";
	
	//
	
	public static final String simpleFormatYmdhNoSpace(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(dtSimpleYmdhNoSpace).format(date);
	}

	public static final String simpleFormatYmd(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(dtSimple).format(date);
	}
	
	public static String simpleMdHmsChinese(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(MdHmsChinese).format(date);
	}
	
	public static final String formatDay(Date date) {
		if (date == null)
			return "";
		return getFormat(dtSimple).format(date);
	}
	
	public static String simpleDateFormatChinese(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(dtSimpleYmdhChinese).format(date);
	}
	
	public static String simpleDateFormatmdhChinese(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(mdhChinese).format(date);
	}
	
	/**
	 * yyyy-MM-dd HH:00:00
	 * 
	 * @param date
	 * @return
	 */
	public static final String simpleFormatYmdh(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(dtSimpleYmdh).format(date);
	}
	
	public static final String simpleFormatYmdhms(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(dtSimpleYmdhms).format(date);
	}
	
	public static final String simpleFormatDD(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(formatDD).format(date);
	}
	
	public static final String simpleFormatYM(Date date) {
		if (date == null) {
			return "";
		}
		return getFormat(formatYM).format(date);
	}
	
	/**
	 * 获取指定时间的前一天时间
	 * 
	 * @param date
	 * @return
	 */
	public static Date getBeforeDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, -1);
		date = calendar.getTime();
		return date;
	}
	
	/**
	 * 获取指定时间的后一天时间
	 * 
	 * @param date
	 * @return
	 */
	public static Date getAfterDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		date = calendar.getTime();
		return date;
	}
	
	/**
	 * 获取一周前的日期(当前日期往前推7天)
	 * 
	 * @param date
	 * @return
	 */
	public static Date getWeekdayBeforeDate(Date date) {
		long beforeTime = (date.getTime() / 1000) - 24 * 60 * 60 * 7;
		date.setTime(beforeTime * 1000);
		return date;
	}
	
	/**
	 * 获取一周前的日期(当前日期往前推7天)
	 * 
	 * @param date
	 * @return
	 */
	public static String getWeekdayBeforeNow(Date date) {
		java.text.Format formatter = new SimpleDateFormat("yyyy-MM-dd");
		long beforeTime = (date.getTime() / 1000) - 24 * 60 * 60 * 7;
		date.setTime(beforeTime * 1000);
		return formatter.format(date);
	}

	/**
	 * 获取一月前的日期(当前日期往前推7天)
	 *
	 * @param date
	 * @return
	 */
	public static Date getMonthdayBeforeDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, -1);
		date = calendar.getTime();
		return date;
	}

	/**
	 * 获取一月前的日期(当前日期往前推7天)
	 *
	 * @param date
	 * @return
	 */
	public static String getMonthdayBeforeNow(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, -1);
		date = calendar.getTime();
		java.text.Format formatter = new SimpleDateFormat("yyyy-MM-dd");
		return formatter.format(date);
	}

	/**
	 * 获取指定时间的前三月时间
	 *
	 * @param date
	 * @return
	 */
	public static Date getThreeMonthDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int day = calendar.get(Calendar.DATE);
		calendar.set(Calendar.DATE, day + 1);
		calendar.add(Calendar.MONTH, -3);
		date = calendar.getTime();
		return date;
	}

	/**
	 * 获取指定时间的前六月时间
	 *
	 * @param date
	 * @return
	 */
	public static Date getSixMonthDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, -6);
		date = calendar.getTime();
		return date;
	}

	/***
	 * 获取指定时间所在月份第一天字符串
	 * @param date
	 * @return
	 */
	public static String getCurrMonthFirstDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, 01);
		java.text.Format formatter = new SimpleDateFormat("yyyy-MM-dd");
		return formatter.format(calendar.getTime());
	}

	/***
	 * 获取指定时间所在月份的上个月第一天字符串
	 * @param date
	 * @return
	 */
	public static String getLastMonthFirstDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, -1);
		calendar.set(Calendar.DAY_OF_MONTH, 01);
		java.text.Format formatter = new SimpleDateFormat("yyyy-MM-dd");
		return formatter.format(calendar.getTime());
	}

	/**
	 * 转换日期yyyy-MM-dd hh:mm:ss
	 * @param source
	 * @return
	 * @throws
	 */
	public static Date parse(String source, Date defaultDate) {
		try {
			return getFormat(dtSimpleYmdhms).parse(source);
		} catch (ParseException e) {
			logger.error(e.getMessage(), e);
			return defaultDate;
		}
	}
	
	/**
	 * 转换日期yyyy-MM-dd hh:mm:ss 或 yyyy-MM-dd
	 * @param source
	 * @return
	 * @throws
	 */
	public static Date parse(String source) {
		
		if (source.length() == 10) {
			return parse(source + " 00:00:00", new Date());
		} else {
			return parse(source, new Date());
		}
		
	}
	
	/**
	 * 日期加月
	 * @param date
	 * @param months
	 * @return
	 */
	public static Date getDateByMonth(Date date, int months) {
		if (date == null) {
			return null;
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, months);
		return calendar.getTime();
	}
	
	public static String getDateByLongStr(String unixDate) {
		SimpleDateFormat fm1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		long unixLong = 0;
		String date = "";
		try {
			unixLong = Long.parseLong(unixDate);
		} catch (Exception ex) {
			logger.error(ex.getMessage(), ex);
		}
		try {
			date = fm1.format(unixLong);
		} catch (Exception ex) {
			logger.error(ex.getMessage(), ex);
		}
		return date;
	}
	
	/**
	 * 判断一个日期是否日节假日 法定节假日只判断月份和天，不判断年
	 * @param date
	 * @return
	 */
	public static boolean isFestival(Date date) {
		boolean festival = false;
		Calendar fcal = Calendar.getInstance();
		Calendar dcal = Calendar.getInstance();
		dcal.setTime(date);
		//		List<Date> list = getFestival();
		//		for (Date dt : list) {
		//			fcal.setTime(dt);
		//			
		//			//法定节假日判断
		//			if (fcal.get(Calendar.MONTH) == dcal.get(Calendar.MONTH)
		//				&& fcal.get(Calendar.DATE) == dcal.get(Calendar.DATE)) {
		//				festival = true;
		//			}
		//		}
		return festival;
	}

	
	/**
	 * 周六周日判断
	 * @param date
	 * @return
	 */
	public static boolean isWeekend(Date date) {
		boolean weekend = false;
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		if (cal.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY
			|| cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
			weekend = true;
		}
		return weekend;
	}
	
	/**
	 * 是否是工作日 法定节假日和周末为非工作日
	 * @param date
	 * @return
	 */
	public static boolean isWorkDay(Date date) {
		boolean workday = true;
		if (isFestival(date) || isWeekend(date)) {
			workday = false;
		}
		return workday;
	}
	
	public static boolean isAfterNowDay(Date date) {
		return date.after(new Date());
	}
	
	/**
	 * 获得本月的开始时间，即2012-01-01 00:00:00
	 * 
	 * @return
	 */
	public static Date getCurrentMonthStartTime() {
		Calendar c = Calendar.getInstance();
		Date now = null;
		try {
			c.set(Calendar.DATE, 1);
			SimpleDateFormat longSdf = new SimpleDateFormat("yyyy-MM-dd");
			now = longSdf.parse(longSdf.format(c.getTime()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return now;
	}
	
	/**
	 * 当前月的结束时间，即2012-01-31 23:59:59
	 * 
	 * @return
	 */
	public static Date getCurrentMonthEndTime() {
		Calendar c = Calendar.getInstance();
		Date now = null;
		try {
			SimpleDateFormat longSdf = new SimpleDateFormat("yyyy-MM-dd");
			c.set(Calendar.DATE, 1);
			c.add(Calendar.MONTH, 1);
			c.add(Calendar.DATE, -1);
			now = longSdf.parse(longSdf.format(c.getTime()) + " 23:59:59");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return now;
	}
	
	public static String covertLicenseValidTime(String str) {
		Date d = null;
		if (StringUtil.isEmpty(str) || StringUtil.equalsIgnoreCase("null", str)) {
			logger.error("DateUtils|getFormateDateStr入参为空");
			return null;
		}
		SimpleDateFormat sdfSource = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);
		SimpleDateFormat sdfTarget = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
		try {
			d = sdfSource.parse(str);
		} catch (ParseException e) {
			logger.error("DateUtils|getFormateDateStr异常，入参为：" + str + ",错误信息：" + e);
			return null;
		}
		String formatDate = sdfTarget.format(d);
		if ("1972-12-12".equals(formatDate) || formatDate.startsWith("1972")) {
			return LONG_TIME;
		} else {
			return formatDate;
		}
	}
	
	public static final String LONG_TIME = "longTime";
	
	/**
	 * 
	 * 检查给定的身份证有效期是不是一个有效的有效期<br />
	 * 用于身份证过期或提前升级使用判断
	 * 
	 * @param oldBusinessPeriod
	 * @param newBusinessPeriod
	 * @return 当新的身份证有效期比原来的日期新才是有效的
	 */
	public static boolean isNewValidBusinessPeriod(String oldBusinessPeriod,
													String newBusinessPeriod) {
		if (LONG_TIME.equals(oldBusinessPeriod)) {
			return false;
		}
		
		if (LONG_TIME.equals(newBusinessPeriod)) {
			return true;
		}
		
		Date oldDate = strToDtSimpleFormat(oldBusinessPeriod);
		Date newDate = strToDtSimpleFormat(newBusinessPeriod);
		if (null == newDate) {
			return false;
		}
		
		if (null == oldDate) {
			if (newDate.after(new Date())) {
				return true;
			} else {
				return false;
			}
		}
		
		return newDate.after(oldDate);
	}
	
	/**
	 * 传入时间 是否在当前时间前多少(day)天
	 * @param date
	 * @param day
	 * @return
	 */
	public static boolean isValidPeriodByDay(Date date, int day) {
		if (date == null)
			return false;
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.DAY_OF_YEAR, (-1) * day);
		if (date.before(calendar.getTime())) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * 判断身份证是否在一月内过期(大于等于0但小于30天)
	 * @param businessPeriod 格式是longTime或者yyyy-MM-dd 或者 yyyy-MM-dd HH:mm:ss
	 * 其它增多返回false
	 * @return
	 */
	public static boolean isExpireInOneMonth(String businessPeriod) {
		if (StringUtil.isBlank(businessPeriod) || LONG_TIME.equals(businessPeriod)) {
			return false;
		}
		
		Date expireDate = DateUtil.strToDtSimpleFormat(businessPeriod);
		if (null == expireDate) {
			return false;
		}
		
		Date now = new Date();
		now = DateUtil.getStartTimeOfTheDate(now);
		long days = DateUtil.countDays(new Date(), expireDate);
		if (days >= 0 && days < 30) {
			return true;
		}
		
		return false;
	}

	/**
	 * 传入时间 当前年份
	 * @param year
	 * @return 当前年第一天
	 */
	public static Date getYearFirst(int year){
		Calendar calendar = Calendar.getInstance();
	    calendar.clear();
	    calendar.set(Calendar.YEAR, year);
	    Date currYearFirst = calendar.getTime();
	    SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
	    String sDate = f.format(currYearFirst);
	    return strToDtSimpleFormat(sDate);
	   
	}
	
	/**
	 * 计算时间差
	 * @param dBefor
	 * @param dAfter
	 * @return
	 */
	public static String getBetweenTimes(Date dBefor, Date dAfter) {
		if (dBefor == null || dAfter == null) {
			return "0分钟";
		}
		long lRtn = getDateBetween(dBefor, dAfter);
		//小于1分钟
		if (lRtn < 1000 * 60) {
			return "0分钟";
		} else {
			String days = "";
			String hours = "";
			String minute = "";
			long d = lRtn / (24 * 60 * 60 * 1000);
			if (d > 0) {
				days = d + "天";
			}
			long dr = lRtn % (24 * 60 * 60 * 1000);
			long h = dr / (60 * 60 * 1000);
			if (h > 0) {
				hours = h + "小时";
			} else {
				if (d > 0) {
					hours = "0小时";
				}
			}
			long hr = dr % (60 * 60 * 1000);
			long m = hr / (60 * 1000);
			minute = m + "分钟";
			return days + hours + minute;
		}
	}
}
