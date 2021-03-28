package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalFlow;
import cc.water.ciro.eval.domain.EvalFlowExample;
import java.util.List;

import cc.water.ciro.eval.query.EvalFlowQuery;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalFlowDao {
    int countByExample(EvalFlowExample example);

    int deleteByExample(EvalFlowExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalFlow record);

    int insertSelective(EvalFlow record);

    List<EvalFlow> selectByExample(EvalFlowExample example);

    EvalFlow selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalFlow record, @Param("example") EvalFlowExample example);

    int updateByExample(@Param("record") EvalFlow record, @Param("example") EvalFlowExample example);

    int updateByPrimaryKeySelective(EvalFlow record);

    int updateByPrimaryKey(EvalFlow record);

    int findRowNo(EvalFlowQuery evalFlowQuery);

    List<EvalFlow> findList(EvalFlowQuery evalFlowQuery);

    int findListNum(EvalFlowQuery evalFlowQuery);
}