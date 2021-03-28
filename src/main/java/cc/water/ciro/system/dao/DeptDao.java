package cc.water.ciro.system.dao;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.DeptExample;
import cc.water.ciro.system.query.DeptQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@MapperDao
public interface DeptDao {
    int countByExample(DeptExample example);

    int deleteByExample(DeptExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Dept record);

    int insertSelective(Dept record);

    List<Dept> selectByExample(DeptExample example);

    Dept selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") Dept record, @Param("example") DeptExample example);

    int updateByExample(@Param("record") Dept record, @Param("example") DeptExample example);

    int updateByPrimaryKeySelective(Dept record);

    int updateByPrimaryKey(Dept record);

    Dept findDeptByContent(String txt);

    Dept findDeptByName(String txt);

    Dept findDeptByCode(String code);

    List<Dept> findList(DeptQuery deptQuery);

    int findListNum(DeptQuery deptQuery);


}