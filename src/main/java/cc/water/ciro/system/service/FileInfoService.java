package cc.water.ciro.system.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.system.domain.FileInfo;
import cc.water.ciro.system.query.FileInfoQuery;

import java.util.List;

public interface FileInfoService {

	public int addFileInfo(FileInfo fileInfo);

	public void insertBatch(List<FileInfo> list);

	public FileInfo getFileInfoByKey(Long id);

	public List<FileInfo> getFileInfoByKeys(List<Long> ids);

	public void deleteFileInfoByKey(Long id);

	public void deleteFileInfoByKeys(List<Long> ids);

	public void updateFileInfoByKey(FileInfo fileInfo);

	public Pagination getFileInfoWithPage(FileInfoQuery fileInfoQuery);

	public  int getFileInfoCount(FileInfoQuery fileInfoQuery);

}
