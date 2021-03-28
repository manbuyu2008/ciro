/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.system.enums;

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
public enum ParamTypeEnum {

	sys("sys", "系统参数"),
	eval("eval", "考评参数");

	/** 枚举值 */
	private final String code;

	/** 枚举描述 */
	private final String message;

	/**
	 * 构造一个<code>BooleanEnum</code>枚举对象
	 *
	 * @param code
	 * @param message
	 */
	private ParamTypeEnum(String code, String message) {
		this.code = code;
		this.message = message;
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
	public static ParamTypeEnum getByCode(String code) {
		for (ParamTypeEnum _enum : values()) {
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
	public List<ParamTypeEnum> getAllEnum() {
		List<ParamTypeEnum> list = new ArrayList<ParamTypeEnum>();
		for (ParamTypeEnum _enum : values()) {
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
		for (ParamTypeEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
