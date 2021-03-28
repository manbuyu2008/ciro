/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.common.exceptions;

/**
 * 
 * @Filename EstateException.java
 * 
 * @Description
 * 
 * @Version 1.0
 * 
 * @Author peigen
 * 
 * @Email peigen@yiji.com
 * 
 * @History <li>Author: peigen</li> <li>Date: 2013-2-3</li> <li>Version: 1.0</li>
 * <li>Content: create</li>
 * 
 */
public class SysException extends ApplicationException {
	
	/** Comment for <code>serialVersionUID</code> */
	private static final long serialVersionUID = 554229467642044021L;
	
	private ResultEnum resultCode;
	
	private String errorMsg;
	
	/**
	 * 构建一个<code>EstateException.java</code>
	 */
	public SysException() {
		super();
	}
	
	/**
	 * 构建一个<code>EstateException.java</code>
	 * @param arg0
	 * @param arg1
	 */
	public SysException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}
	
	/**
	 * 构建一个<code>EstateException.java</code>
	 * @param arg0
	 */
	public SysException(String arg0) {
		super(arg0);
	}
	
	/**
	 * 构建一个<code>EstateException.java</code>
	 * @param arg0
	 */
	public SysException(Throwable arg0) {
		super(arg0);
	}
	
	/**
	 * 构建一个<code>EstateException.java</code>
	 * @param resultCode
	 * @param errorMsg
	 */
	public SysException(ResultEnum resultCode, String errorMsg) {
		super(errorMsg);
		this.resultCode = resultCode;
		this.errorMsg = errorMsg;
	}
	
	public ResultEnum getResultCode() {
		return resultCode;
	}
	
	public void setResultCode(ResultEnum resultCode) {
		this.resultCode = resultCode;
	}
	
	public String getErrorMsg() {
		return errorMsg;
	}
	
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	
	/**
	 * @return
	 * @see Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("EstateException [resultCode=");
		builder.append(resultCode);
		builder.append(", errorMsg=");
		builder.append(errorMsg);
		builder.append("]");
		return builder.toString();
	}
	
}
