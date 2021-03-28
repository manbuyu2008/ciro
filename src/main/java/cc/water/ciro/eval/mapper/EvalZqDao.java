package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.domain.EvalZqExample;
import java.util.List;

import cc.water.ciro.eval.query.EvalZqQuery;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalZqDao {
    int countByExample(EvalZqExample example);

    int deleteByExample(EvalZqExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalZq record);

    int insertSelective(EvalZq record);

    List<EvalZq> selectByExample(EvalZqExample example);

    EvalZq selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalZq record, @Param("example") EvalZqExample example);

    int updateByExample(@Param("record") EvalZq record, @Param("example") EvalZqExample example);

    int updateByPrimaryKeySelective(EvalZq record);

    int updateByPrimaryKey(EvalZq record);

    int findRowNo(EvalZqQuery evalZqQuery);

    List<EvalZq> findList(EvalZqQuery evalZqQuery);

    int findListNum(EvalZqQuery evalZqQuery);
}