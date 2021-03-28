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
public enum PrivEnum {

	/** user */
	user("user", "本人",10),
//	/** dept */
//	dept("dept", "本部门",20),
	/** user */
	deptAndChild("deptAndChild", "本部门及下级部门",30),
	/** user */
	corp("corp", "本单位",40);

	/** 枚举值 */
	private final String code;

	/** 枚举描述 */
	private final String message;

	/** 枚举描述 */
	private final int value;

	/**
	 * 构造一个<code>BooleanEnum</code>枚举对象
	 *
	 * @param code
	 * @param message
	 */
	private PrivEnum(String code, String message,int value) {
		this.code = code;
		this.message = message;
		this.value = value;
	}

	public int getValue() {
		return value;
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
	
	/**
	 * 通过枚举<code>code</code>获得枚举
	 * 
	 * @param code
	 * @return BooleanEnum
	 */
	public static PrivEnum getByCode(String code) {
		for (PrivEnum _enum : values()) {
			if (_enum.getCode().equals(code)) {
				return _enum;
			}
		}
		return null;
	}

	/**
	 * 通过枚举<code>value</code>获得枚举
	 *
	 * @param value
	 * @return BooleanEnum
	 */
	public static PrivEnum getByValue(int value) {
		for (PrivEnum _enum : values()) {
			if (_enum.getValue()==value) {
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
	public List<PrivEnum> getAllEnum() {
		List<PrivEnum> list = new ArrayList<PrivEnum>();
		for (PrivEnum _enum : values()) {
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
		for (PrivEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
