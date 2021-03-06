/**
 * www.yiji.com Inc.
 * Copyright (c) 2012 All Rights Reserved.
 */
package cc.water.ciro.common.util;

import cc.water.ciro.common.utils.NumberUtil;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

/**
 * 
 * @Filename BusinessNumberUtil.java
 * 
 * @Description
 * 
 * @Version 1.0
 * 
 * @Author zjialin
 * 
 * @Email zjialin@yiji.com
 * 
 * @History <li>Author: zjialin</li> <li>Date: 2013-5-8</li> <li>Version: 1.0</li>
 * <li>Content: create</li>
 * 
 */
public class BusinessNumberUtil {
	
	public static final Random random = new Random();
	
	public static String gainNumber() {
		StringBuffer number = new StringBuffer();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		number.append(simpleDateFormat.format(new Date()));
		int a = (int) (Math.random() * 1000);
		if (a < 10 && a > 0) {
			a = a * 100;
		} else if (a >= 10 && a < 100) {
			a = a * 10;
		}
		number.append(a == 0 ? "000" : a);
		return number.toString();
	}
	
	public static String gainOutBizNoNumber() {
		StringBuffer number = new StringBuffer();
		//String outBizNo = "0987";//AppConstantsUtil.getOutBizNumber();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyMMdd");
		SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HHmmssSSS");
		Date nowDate = new Date();
		number.append(simpleDateFormat.format(nowDate)).append(simpleTimeFormat.format(nowDate));
		int a = (int) (Math.random() * 1000);
		String aString = String.valueOf(a);
		while (aString.length() < 3) {
			aString = "0" + aString;
		}
		number.append(aString);
		return number.toString();
	}
	
	public static long gainSeqLongNumber() {
		StringBuffer number = new StringBuffer();
		//String outBizNo = "0987";//AppConstantsUtil.getOutBizNumber();
		SimpleDateFormat simpleDateFormatY = new SimpleDateFormat("yy");
		SimpleDateFormat simpleDateFormatM = new SimpleDateFormat("MM");
		SimpleDateFormat simpleDateFormatD = new SimpleDateFormat("dd");
		
		SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HHmmssSSS");
		Date nowDate = new Date();
		long yy = NumberUtil.parseLong(simpleDateFormatY.format(nowDate));
		long mm = NumberUtil.parseLong(simpleDateFormatM.format(nowDate));
		long dd = NumberUtil.parseLong(simpleDateFormatD.format(nowDate));
		long dateNumber = yy * 400 + mm * 12 + dd * 32;
		number.append(dateNumber).append(simpleTimeFormat.format(nowDate));
		int a = (int) (Math.random() * 999999);
		String aString = String.valueOf(a);
		while (aString.length() < 6) {
			aString = "0" + aString;
		}
		number.append(aString);
		return NumberUtil.parseLong(number.toString());
	}
	
	public static String gainNumber8() {
		StringBuffer number = new StringBuffer();
		long millis = Calendar.getInstance().getTimeInMillis();
		String millisSeconds = String.valueOf(millis);
		String lastSevenSeconds = millisSeconds.substring(millisSeconds.length() - 5);
		
		int a = (int) (Math.random() * 1000);
		if (a < 10 && a > 0) {
			a = a * 100;
		} else if (a >= 10 && a < 100) {
			a = a * 10;
		}
		String flag = a == 0 ? "000" : String.valueOf(a);
		String tradeNo = number.append(lastSevenSeconds).append(flag).toString();
		
		return tradeNo;
	}
	
	public static String gainOutBizNo24Number(String bizCode) {
		StringBuffer number = new StringBuffer();
		//String outBizNo = "0987";//AppConstantsUtil.getOutBizNumber();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("mmssSSS");
		Date nowDate = new Date();
		number.append(simpleDateFormat.format(nowDate)).append(simpleTimeFormat.format(nowDate));
		number.append(bizCode);
		
		int a = (int) (Math.random() * 100000);
		String aString = String.valueOf(a);
		while (aString.length() < 6) {
			aString = "0" + aString;
		}
		number.append(aString);
		return number.toString();
	}
	
	public static void main(String[] args) {
		System.out.println(Long.valueOf("6528125506246326111"));
		System.out.println(gainSeqLongNumber());
		System.out.println(NumberUtil.parseLong(gainOutBizNoNumber()));
		//		for (int i = 0; i < 100; i++) {
		//			System.out.println(gainSeqLongNumber());
		//			//System.out.println(getLessThen20Number(temp, "m2"));
		//		}
	}
	
	public static String getLessThen20Number(String bizCode, String suffix) {
		
		String endString = bizCode;
		String newString = "";
		if (bizCode.length() <= 10) {
			newString = bizCode;
		}
		while (endString.length() > 10) {
			String tempString = endString.substring(0, 10);
			newString += Long.toHexString(Long.parseLong(tempString));
			endString = endString.substring(10);
		}
		if (endString.length() > 0) {
			newString += Long.toHexString(Long.parseLong(endString));
		}
		return newString + suffix;
	}
	
	public static String getSerialNumberSeq() {
		StringBuilder serialNumber = new StringBuilder();
		serialNumber.append(DateUtil.shortDate(new Date()));
		serialNumber.append(String.valueOf(random.nextDouble()).substring(2, 10));
		return serialNumber.toString();
	}
}
