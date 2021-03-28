package test.system;

import java.util.Date;
import java.util.List;

import cc.water.ciro.system.domain.FileInfo;
import cc.water.ciro.system.service.FileInfoService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cc.water.ciro.system.domain.Permission;
import cc.water.ciro.system.service.PermissionService;

import test.common.SpringJunitTest;

public class PermissionTest extends SpringJunitTest{
	@Autowired
	private PermissionService permissionService;
	@Autowired
	private FileInfoService fileInfoService;
	@Test
	public void save(){
		Permission permission=new Permission();
		permission.setName("管理权限");
		permissionService.addPermission(permission);
		System.out.println(permission.getId());
	}
	@Test
	public void getPermissionMenuByUserId(){
		List<Permission> menus=permissionService.getPermissionMenuByUserId(30l);
		
	}

	@Test
	public void insertFile(){
		String fileNames = "1212";
		FileInfo fileInfo = new FileInfo();
		fileInfo.setFileSize(Long.valueOf(1212));
		fileInfo.setName(fileNames);
		fileInfo.setSuffix(".jpg");
		fileInfo.setPath("ddd");
		fileInfo.setSaveName("ddd");
		fileInfo.setFileUrl("ddd");
		fileInfo.setCreater(Long.valueOf(30));
		fileInfo.setAddTime(new Date());
		String fileId  = String.valueOf(fileInfoService.addFileInfo(fileInfo));
		System.out.println(fileId);
		fileInfo.setFileSize(Long.valueOf(1212));
		fileInfo.setName(fileNames);
		fileInfo.setSuffix(".jpg");
		fileInfo.setPath("ddd");
		fileInfo.setSaveName("ddd");
		fileInfo.setFileUrl("ddd");
		fileInfo.setCreater(Long.valueOf(30));
		fileInfo.setAddTime(new Date());
//		String fileId2  = String.valueOf(fileInfoService.addFileInfo(fileInfo));
//		System.out.println(fileId2);
	}

}
