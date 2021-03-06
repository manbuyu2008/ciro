/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.enums;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @Filename BooleanEnum.java
 * 
 * @Description
 * 
 * @Version 1.0
 * 
 * @Author huangxl
 * 

 * 
 * @History <li>Author: huangxl</li> <li>Date: 2014-4-3</li> <li>Version: 1.0</li>
 * <li>Content: create</li>
 * 
 */
public enum BooleanEnum {
	
	/** NO */
	
	NO("NO", "否","未通过","停用",0),
	
	/** YES */
	YES("YES", "是","通过","启用",1);
	
	/** 枚举值 */
	private final String code;
	
	/** 枚举描述 */
	private final String message;
	/** 枚举描述 */
	private final String message2;
	/** 枚举描述 */
	private final String message3;
	/** 枚举描述 */
	private final int value;
	/**
	 * 构造一个<code>BooleanEnum</code>枚举对象
	 * 
	 * @param code
	 * @param message
	 */
	private BooleanEnum(String code, String message,String message2,String message3,int value) {
		this.code = code;
		this.message = message;
		this.message2 = message2;
		this.message3 = message3;
		this.value = value;
	}
	
	/**
	 * @return Returns the code.
	 */
	public String getCode() {
		return code;
	}
	
	/**
	 * @return Returns the message.
	 */
	public String getMessage() {
		return message;
	}
	
	/**
	 * @return Returns the code.
	 */
	public String code() {
		return code;
	}
	
	/**
	 * @return Returns the message.
	 */
	public String message() {
		return message;
	}

	public String getMessage2() {
		return message2;
	}

	public int getValue() {
		return value;
	}

	public String getMessage3() {
		return message3;
	}

	/**
	 * 通过枚举<code>code</code>获得枚举
	 * 
	 * @param code
	 * @return BooleanEnum
	 */
	public static BooleanEnum getByCode(String code) {
		for (BooleanEnum _enum : values()) {
			if (_enum.getCode().equals(code)) {
				return _enum;
			}
		}
		return null;
	}
	
	/**
	 * 获取全部枚举
	 * 
	 * @return List<BooleanEnum>
	 */
	public List<BooleanEnum> getAllEnum() {
		List<BooleanEnum> list = new ArrayList<BooleanEnum>();
		for (BooleanEnum _enum : values()) {
			list.add(_enum);
		}
		return list;
	}
	
	/**
	 * 获取全部枚举值
	 * 
	 * @return List<String>
	 */
	public List<String> getAllEnumCode() {
		List<String> list = new ArrayList<String>();
		for (BooleanEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
