package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalEvent;
import cc.water.ciro.eval.domain.EvalEventExample;

import java.util.Date;
import java.util.List;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalEventDao {
    int countByExample(EvalEventExample example);

    int deleteByExample(EvalEventExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalEvent record);

    int insertSelective(EvalEvent record);

    List<EvalEvent> selectByExample(EvalEventExample example);

    EvalEvent selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalEvent record, @Param("example") EvalEventExample example);

    int updateByExample(@Param("record") EvalEvent record, @Param("example") EvalEventExample example);

    int updateByPrimaryKeySelective(EvalEvent record);

    int updateByPrimaryKey(EvalEvent record);

    int selectSame(EvalEvent record);
}