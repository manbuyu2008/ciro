package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import java.util.List;

import cc.water.ciro.eval.domain.EvalSelfScoreStd;
import cc.water.ciro.eval.domain.EvalSelfScoreStdExample;
import cc.water.ciro.eval.query.EvalSelfScoreStdQuery;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalSelfScoreStdDao {
    int countByExample(EvalSelfScoreStdExample example);

    int deleteByExample(EvalSelfScoreStdExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalSelfScoreStd record);

    int insertSelective(EvalSelfScoreStd record);

    List<EvalSelfScoreStd> selectByExample(EvalSelfScoreStdExample example);

    EvalSelfScoreStd selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalSelfScoreStd record, @Param("example") EvalSelfScoreStdExample example);

    int updateByExample(@Param("record") EvalSelfScoreStd record, @Param("example") EvalSelfScoreStdExample example);

    int updateByPrimaryKeySelective(EvalSelfScoreStd record);

    int updateByPrimaryKey(EvalSelfScoreStd record);

    int findRowNo(EvalSelfScoreStdQuery evalSelfScoreStdQuery);

    List<EvalSelfScoreStd> findList(EvalSelfScoreStdQuery evalSelfScoreStdQuery);

    int findListNum(EvalSelfScoreStdQuery evalSelfScoreStdQuery);
}