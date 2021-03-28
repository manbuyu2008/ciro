package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.domain.EvalComment;
import cc.water.ciro.eval.domain.EvalCommentExample;
import cc.water.ciro.eval.query.EvalCommentQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@MapperDao
public interface EvalCommentDao {
    int countByExample(EvalCommentExample example);

    int deleteByExample(EvalCommentExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EvalComment record);

    int insertSelective(EvalComment record);

    List<EvalComment> selectByExample(EvalCommentExample example);

    EvalComment selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EvalComment record, @Param("example") EvalCommentExample example);

    int updateByExample(@Param("record") EvalComment record, @Param("example") EvalCommentExample example);

    int updateByPrimaryKeySelective(EvalComment record);

    int updateByPrimaryKey(EvalComment record);

    int findRowNo(EvalCommentQuery evalCommentQuery);

    List<EvalComment> findList(EvalCommentQuery evalCommentQuery);

    int findListNum(EvalCommentQuery evalCommentQuery);
}