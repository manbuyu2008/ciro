package cc.water.ciro.system.dao;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.system.domain.SysParamBean;
import cc.water.ciro.system.domain.SysParamExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@MapperDao
public interface ParamDao {
    int countByExample(SysParamExample example);

    int deleteByExample(SysParamExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SysParamBean record);

    int insertSelective(SysParamBean record);

    List<SysParamBean> selectByExample(SysParamExample example);

    SysParamBean selectByPrimaryKey(Long id);

    List<SysParamBean> getAllSysParam();

    SysParamBean selectByName(String name);

    int updateByExampleSelective(@Param("record") SysParamBean record, @Param("example") SysParamExample example);

    int updateByExample(@Param("record") SysParamBean record, @Param("example") SysParamExample example);

    int updateByPrimaryKeySelective(SysParamBean record);

    int updateByPrimaryKey(SysParamBean record);
}