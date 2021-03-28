package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalLevel;
import cc.water.ciro.eval.domain.EvalLevelExample;
import java.util.List;

import cc.water.ciro.eval.query.EvalLevelQuery;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalLevelDao {
    int countByExample(EvalLevelExample example);

    int deleteByExample(EvalLevelExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalLevel record);

    int insertSelective(EvalLevel record);

    List<EvalLevel> selectByExample(EvalLevelExample example);

    EvalLevel selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalLevel record, @Param("example") EvalLevelExample example);

    int updateByExample(@Param("record") EvalLevel record, @Param("example") EvalLevelExample example);

    int updateByPrimaryKeySelective(EvalLevel record);

    int updateByPrimaryKey(EvalLevel record);

    int findRowNo(EvalLevelQuery evalLevelQuery);

    List<EvalLevel> findList(EvalLevelQuery evalLevelQuery);

    int findListNum(EvalLevelQuery evalLevelQuery);
    
}