package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalSelfEnum;
import cc.water.ciro.eval.domain.EvalSelfEnumExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalSelfEnumDao {
    int countByExample(EvalSelfEnumExample example);

    int deleteByExample(EvalSelfEnumExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalSelfEnum record);

    int insertSelective(EvalSelfEnum record);

    List<EvalSelfEnum> selectByExample(EvalSelfEnumExample example);

    EvalSelfEnum selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalSelfEnum record, @Param("example") EvalSelfEnumExample example);

    int updateByExample(@Param("record") EvalSelfEnum record, @Param("example") EvalSelfEnumExample example);

    int updateByPrimaryKeySelective(EvalSelfEnum record);

    int updateByPrimaryKey(EvalSelfEnum record);

    int insertBatch(List<EvalSelfEnum> list);

    int updateBatch(List<EvalSelfEnum> list);
}