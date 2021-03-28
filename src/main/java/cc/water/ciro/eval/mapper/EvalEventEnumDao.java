package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalEventEnum;
import cc.water.ciro.eval.domain.EvalEventEnumExample;
import java.util.List;

import cc.water.ciro.eval.domain.EvalSelfEnum;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalEventEnumDao {
    int countByExample(EvalEventEnumExample example);

    int deleteByExample(EvalEventEnumExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalEventEnum record);

    int insertSelective(EvalEventEnum record);

    List<EvalEventEnum> selectByExample(EvalEventEnumExample example);

    EvalEventEnum selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalEventEnum record, @Param("example") EvalEventEnumExample example);

    int updateByExample(@Param("record") EvalEventEnum record, @Param("example") EvalEventEnumExample example);

    int updateByPrimaryKeySelective(EvalEventEnum record);

    int updateByPrimaryKey(EvalEventEnum record);

    int insertBatch(List<EvalEventEnum> list);
}