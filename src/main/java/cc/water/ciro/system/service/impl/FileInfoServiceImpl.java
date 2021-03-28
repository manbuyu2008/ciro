package cc.water.ciro.system.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.system.dao.FileInfoDao;
import cc.water.ciro.system.domain.FileInfo;
import cc.water.ciro.system.domain.FileInfoExample;
import cc.water.ciro.system.query.FileInfoQuery;
import cc.water.ciro.system.service.FileInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class FileInfoServiceImpl extends BaseService implements FileInfoService {
	
	@Autowired
	private FileInfoDao fileInfoDao;
	
	public int addFileInfo(FileInfo fileInfo) {
		fileInfo.setCreateDate(new Date());
		return   fileInfoDao.insert(fileInfo);
	}

	@Override
	public void insertBatch(List<FileInfo> list) {
		fileInfoDao.insertBatch(list);
	}

	@Transactional(readOnly=true)
	public FileInfo getFileInfoByKey(Long id) {
		return fileInfoDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<FileInfo> getFileInfoByKeys(List<Long> ids) {
		FileInfoExample example = new  FileInfoExample();
		FileInfoExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return fileInfoDao.selectByExample(example);
	}

	public void deleteFileInfoByKey(Long id) {
		 fileInfoDao.deleteByPrimaryKey(id);
	}

	public void deleteFileInfoByKeys(List<Long> ids) {
		FileInfoExample example = new  FileInfoExample();
		FileInfoExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 fileInfoDao.deleteByExample(example);
	}

	public void updateFileInfoByKey(FileInfo fileInfo) {
		 fileInfoDao.updateByPrimaryKey(fileInfo);
	}

	@Transactional(readOnly=true)
	public Pagination getFileInfoWithPage(FileInfoQuery fileInfoQuery) {
		FileInfoExample example = new  FileInfoExample();
		example.setOffset(fileInfoQuery.getStartRow());
		example.setLimit(fileInfoQuery.getPageSize());
		FileInfoExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(fileInfoQuery.getSaveName())) {
			criteria.andSaveNameEqualTo(fileInfoQuery.getSaveName());
		}
		if(StringUtil.isNotEmpty(fileInfoQuery.getName())) {
			criteria.andNameEqualTo(fileInfoQuery.getName());
		}
		if(fileInfoQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(fileInfoQuery.getIds()));
		}
		Pagination<FileInfo> pagination=new Pagination<FileInfo>(fileInfoQuery.getPageNo(), fileInfoQuery.getPageSize(), fileInfoDao.countByExample(example));
		List<FileInfo> fileInfoList=fileInfoDao.selectByExample(example);
		pagination.setRows(fileInfoList);
		return pagination;
	}

	@Override
	public int getFileInfoCount(FileInfoQuery fileInfoQuery) {
		FileInfoExample example = new  FileInfoExample();
		FileInfoExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(fileInfoQuery.getSaveName())) {
			criteria.andSaveNameEqualTo(fileInfoQuery.getSaveName());
		}
		if(StringUtil.isNotEmpty(fileInfoQuery.getName())) {
			criteria.andNameEqualTo(fileInfoQuery.getName());
		}
		if(fileInfoQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(fileInfoQuery.getIds()));
		}
		if(fileInfoQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(fileInfoQuery.getIds()));
		}
		return fileInfoDao.countByExample(example);
	}
}
