package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalBaseInfo;
import cc.water.ciro.eval.domain.EvalBaseInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;
@MapperDao
public interface EvalBaseInfoDao {
    int countByExample(EvalBaseInfoExample example);

    int deleteByExample(EvalBaseInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalBaseInfo record);

    int insertSelective(EvalBaseInfo record);

    List<EvalBaseInfo> selectByExample(EvalBaseInfoExample example);

    EvalBaseInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalBaseInfo record, @Param("example") EvalBaseInfoExample example);

    int updateByExample(@Param("record") EvalBaseInfo record, @Param("example") EvalBaseInfoExample example);

    int updateByPrimaryKeySelective(EvalBaseInfo record);

    int updateByPrimaryKey(EvalBaseInfo record);
}