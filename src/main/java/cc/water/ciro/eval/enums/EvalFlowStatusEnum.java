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
public enum EvalFlowStatusEnum {
	KP_ME_WAIT("KP_ME_WAIT", "待自评",0),
	KP_ME_KS_BACK("KP_ME_KS_BACK", "自评（科室驳回）",1),
	KP_ME_DKS_BACK("KP_ME_DKS_BACK", "自评（大科室驳回）",3),
	KP_ME_DW_BACK("KP_ME_DW_BACK", "自评（单位驳回）",5),
	KP_ME_SAVE("KP_ME_DKS_BACK", "自评保存",7),
	KP_ME_SUBMIT("KP_ME_SUBMIT", "自评提交",9),
	KP_KS_WAIT("KP_KS_WAIT", "待科室考评",10),
	KP_KS_DKS_BACK("KP_KS_DKS_BACK", "科室（大科室驳回）",11),
	KP_KS_DW_BACK("KP_KS_DW_BACK", "科室（单位驳回）",13),
	KP_KS_SAVE("KP_KS_SAVE", "科室保存",15),
	KP_KS_SUBMIT("KP_KS_SUBMIT", "科室提交",19),
	KP_DKS_WAIT("KP_DKS_WAIT", "待大科室考评",20),
	KP_DKS_DW_BACK("KP_DKS_DW_BACK", "大科室（单位驳回）",21),
	KP_DKS_SAVE("KP_DKS_SAVE", "大科室考评保存",23),
	KP_DKS_SUBMIT("KP_DKS_SUBMIT", "大科室提交",29),
	KP_DW_WAIT("KP_DW_WAIT", "待单位考评",40),
	KP_DW_SAVE("KP_DW_SAVE", "单位保存",41),
	KP_DW_SUBMIT("KP_DW_SUBMIT", "单位提交",43),
	KP_END("KP_END", "考评结束",99);

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
	private EvalFlowStatusEnum(String code, String message,int value) {
		this.code = code;
		this.message = message;
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

	public int getValue() {
		return value;
	}

	/**
	 * 通过枚举<code>code</code>获得枚举
	 * 
	 * @param code
	 * @return BooleanEnum
	 */
	public static EvalFlowStatusEnum getByCode(String code) {
		for (EvalFlowStatusEnum _enum : values()) {
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
	public static EvalFlowStatusEnum getByValue(Integer value) {
		for (EvalFlowStatusEnum _enum : values()) {
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
	public List<EvalFlowStatusEnum> getAllEnum() {
		List<EvalFlowStatusEnum> list = new ArrayList<EvalFlowStatusEnum>();
		for (EvalFlowStatusEnum _enum : values()) {
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
		for (EvalFlowStatusEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
