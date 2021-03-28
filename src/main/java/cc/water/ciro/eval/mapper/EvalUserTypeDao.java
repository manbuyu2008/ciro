package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalUserType;
import cc.water.ciro.eval.domain.EvalUserTypeExample;
import java.util.List;

import cc.water.ciro.eval.query.EvalUserTypeQuery;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalUserTypeDao {
    int countByExample(EvalUserTypeExample example);

    int deleteByExample(EvalUserTypeExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalUserType record);

    int insertSelective(EvalUserType record);

    List<EvalUserType> selectByExample(EvalUserTypeExample example);

    EvalUserType selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalUserType record, @Param("example") EvalUserTypeExample example);

    int updateByExample(@Param("record") EvalUserType record, @Param("example") EvalUserTypeExample example);

    int updateByPrimaryKeySelective(EvalUserType record);

    int updateByPrimaryKey(EvalUserType record);

    int findRowNo(EvalUserTypeQuery  evalUserTypeQuery);
}