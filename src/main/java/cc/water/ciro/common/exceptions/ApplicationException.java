/**
 * www.yiji.com Inc.
 * Copyright (c) 2012 All Rights Reserved.
 */
package cc.water.ciro.common.exceptions;

/**
 * @Filename ApplicationNestException.java
 * 
 * @Description 应用内部异常总接口,该异常子类，可以打印出详细的异常链路信息.
 * 
 * @Version 1.0
 * 
 * @Author hasulee
 * 
 * @Email ligen@yiji.com
 * 
 * @History <li>Author: hasulee</li> <li>Date: 2012-7-4 上午12:20:21</li> <li>
 * Version: 1.0</li> <li>Content: create</li>
 */
public class ApplicationException extends RuntimeException {
	
	private static final long serialVersionUID = -1369013612167105010L;
	
	public ApplicationException() {
	}
	
	public ApplicationException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}
	
	public ApplicationException(String arg0) {
		super(arg0);
	}
	
	public ApplicationException(Throwable arg0) {
		super(arg0);
	}
	
	@Override
	public String getMessage() {
		Throwable cause = getCause();
		String msg = super.getMessage();
		if (cause != null) {
			StringBuilder sb = new StringBuilder();
			sb.append(this.getStackTrace()[0]).append("\t");
			if (msg != null) {
				sb.append(msg).append("; ");
			}
			sb.append("内联异常信息：").append(cause);
			return sb.toString();
		} else {
			return msg;
		}
	}
}
