/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.eval.enums;

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
public enum EvalListTypeEnum {

	view("view", "数据查询"),
	selfAdmin("selfAdmin", "个人自评管理列表"),
	self("self", "个人自评列表"),
	ks("ks", "科室考核列表"),
	dk("dk", "大科考核列表"),
	dw("dw", "单位考核列表");

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
	private EvalListTypeEnum(String code, String message) {
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
	public static EvalListTypeEnum getByCode(String code) {
		for (EvalListTypeEnum _enum : values()) {
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
	public List<EvalListTypeEnum> getAllEnum() {
		List<EvalListTypeEnum> list = new ArrayList<EvalListTypeEnum>();
		for (EvalListTypeEnum _enum : values()) {
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
		for (EvalListTypeEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
