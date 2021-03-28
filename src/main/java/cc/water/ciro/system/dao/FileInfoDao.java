package cc.water.ciro.system.dao;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.system.domain.FileInfo;
import cc.water.ciro.system.domain.FileInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface FileInfoDao {
    int countByExample(FileInfoExample example);

    int deleteByExample(FileInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insertBatch(List<FileInfo> list);

    int insert(FileInfo record);

    int insertSelective(FileInfo record);

    List<FileInfo> selectByExample(FileInfoExample example);

    FileInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") FileInfo record, @Param("example") FileInfoExample example);

    int updateByExample(@Param("record") FileInfo record, @Param("example") FileInfoExample example);

    int updateByPrimaryKeySelective(FileInfo record);

    int updateByPrimaryKey(FileInfo record);
}