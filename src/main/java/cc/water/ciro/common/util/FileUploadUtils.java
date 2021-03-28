/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * 
 * @Filename FileUploadUtil.java
 * 
 * @Description
 * 
 * @Version 1.0
 * 
 * @Author huangxl
 * 

 * 
 * @History <li>Author: huangxl</li> <li>Date: 2014-4-8</li> <li>Version: 1.0</li>
 * <li>Content: create</li>
 * 
 */
public class FileUploadUtils {
	private static final Logger logger = LoggerFactory.getLogger(FileUploadUtils.class);

	/**
	 * @param req
	 * @return
	 */
	
//	public static String[] getStaticFilesImgPath(HttpServletRequest req, String fileOrgName) {
//
//		return com.yjf.esupplier.common.util.UploadFileUtils.getFilePath(req, "uploadfile",
//			"images", fileOrgName);
//	}
//
//	public static String[] getStaticFilesPdfPath(HttpServletRequest req, String fileOrgName) {
//		return UploadFileUtils.getFilePath(req, "uploadfile", "pfd", fileOrgName);
//	}
//
//	public static String getStaticFilesPdfDir() {
//		return UploadFileUtils.getStaticFilesPdfDir();
//	}
//
//	public static String getStaticFilesImgDir() {
//		return UploadFileUtils.getStaticFilesImgDir();
//	}
	
	public static MultipartFile getMultipartFile(Map<String, MultipartFile> fileMap) {
		if (fileMap.isEmpty())
			return null;
		Map.Entry<String, MultipartFile> entry = fileMap.entrySet().iterator().next();
		return entry.getValue();
	}
}
