/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.system.enums;

import cc.water.ciro.enums.BooleanEnum;

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
public enum ParamInitEnum {

	checkEvent("checkEvent", "是否审核加减分事件", BooleanEnum.YES.getCode(),ParamTypeEnum.eval.getCode()),
	unite("unite", "是否统一提交", BooleanEnum.YES.getCode(),ParamTypeEnum.eval.getCode()),
	initScore("initScore", "初始化分数","100",ParamTypeEnum.eval.getCode());

	/** 枚举值 */
	private final String code;

	/** 枚举描述 */
	private final String message;

	private final String value;

	private final String paramType;

	/**
	 * 构造一个<code>BooleanEnum</code>枚举对象
	 *
	 * @param code
	 * @param message
	 */
	private ParamInitEnum(String code, String message,String value,String paramType) {
		this.code = code;
		this.message = message;
		this.value = value;
		this.paramType = paramType;
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

	public String getValue() {
		return value;
	}

	public String getParamType() {
		return paramType;
	}

	/**
	 * 通过枚举<code>code</code>获得枚举
	 * 
	 * @param code
	 * @return BooleanEnum
	 */
	public static ParamInitEnum getByCode(String code) {
		for (ParamInitEnum _enum : values()) {
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
	public List<ParamInitEnum> getAllEnum() {
		List<ParamInitEnum> list = new ArrayList<ParamInitEnum>();
		for (ParamInitEnum _enum : values()) {
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
		for (ParamInitEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
