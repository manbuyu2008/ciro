package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.domain.EvalStdExample;
import cc.water.ciro.eval.query.EvalStdQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MapperDao
public interface EvalStdDao {
    int countByExample(EvalStdExample example);

    int deleteByExample(EvalStdExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalStd record);

    int insertSelective(EvalStd record);

    List<EvalStd> selectByExample(EvalStdExample example);

    EvalStd selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalStd record, @Param("example") EvalStdExample example);

    int updateByExample(@Param("record") EvalStd record, @Param("example") EvalStdExample example);

    int updateByPrimaryKeySelective(EvalStd record);

    int updateByPrimaryKey(EvalStd record);


    int findRowNo(EvalStdQuery evalStdQuery);

    List<EvalStd> findList(EvalStdQuery evalStdQuery);

    int findListNum(EvalStdQuery evalStdQuery);
}