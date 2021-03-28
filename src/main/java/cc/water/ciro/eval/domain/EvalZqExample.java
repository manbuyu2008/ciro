package cc.water.ciro.eval.domain;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EvalZqExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    public EvalZqExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getOffset() {
        return offset;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("ID is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("ID is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("ID =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("ID <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("ID >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("ID >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("ID <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("ID <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("ID in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("ID not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("ID between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("ID not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andCodeIsNull() {
            addCriterion("CODE is null");
            return (Criteria) this;
        }

        public Criteria andCodeIsNotNull() {
            addCriterion("CODE is not null");
            return (Criteria) this;
        }

        public Criteria andCodeEqualTo(String value) {
            addCriterion("CODE =", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotEqualTo(String value) {
            addCriterion("CODE <>", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeGreaterThan(String value) {
            addCriterion("CODE >", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeGreaterThanOrEqualTo(String value) {
            addCriterion("CODE >=", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLessThan(String value) {
            addCriterion("CODE <", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLessThanOrEqualTo(String value) {
            addCriterion("CODE <=", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLike(String value) {
            addCriterion("CODE like", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotLike(String value) {
            addCriterion("CODE not like", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeIn(List<String> values) {
            addCriterion("CODE in", values, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotIn(List<String> values) {
            addCriterion("CODE not in", values, "code");
            return (Criteria) this;
        }

        public Criteria andCodeBetween(String value1, String value2) {
            addCriterion("CODE between", value1, value2, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotBetween(String value1, String value2) {
            addCriterion("CODE not between", value1, value2, "code");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("NAME is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("NAME is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("NAME =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("NAME <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("NAME >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("NAME >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("NAME <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("NAME <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("NAME like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("NAME not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("NAME in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("NAME not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("NAME between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("NAME not between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andCycleTypeIsNull() {
            addCriterion("CYCLE_TYPE is null");
            return (Criteria) this;
        }

        public Criteria andCycleTypeIsNotNull() {
            addCriterion("CYCLE_TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andCycleTypeEqualTo(String value) {
            addCriterion("CYCLE_TYPE =", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeNotEqualTo(String value) {
            addCriterion("CYCLE_TYPE <>", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeGreaterThan(String value) {
            addCriterion("CYCLE_TYPE >", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeGreaterThanOrEqualTo(String value) {
            addCriterion("CYCLE_TYPE >=", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeLessThan(String value) {
            addCriterion("CYCLE_TYPE <", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeLessThanOrEqualTo(String value) {
            addCriterion("CYCLE_TYPE <=", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeLike(String value) {
            addCriterion("CYCLE_TYPE like", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeNotLike(String value) {
            addCriterion("CYCLE_TYPE not like", value, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeIn(List<String> values) {
            addCriterion("CYCLE_TYPE in", values, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeNotIn(List<String> values) {
            addCriterion("CYCLE_TYPE not in", values, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeBetween(String value1, String value2) {
            addCriterion("CYCLE_TYPE between", value1, value2, "cycleType");
            return (Criteria) this;
        }

        public Criteria andCycleTypeNotBetween(String value1, String value2) {
            addCriterion("CYCLE_TYPE not between", value1, value2, "cycleType");
            return (Criteria) this;
        }

        public Criteria andUserTypeIsNull() {
            addCriterion("USER_TYPE is null");
            return (Criteria) this;
        }

        public Criteria andUserTypeIsNotNull() {
            addCriterion("USER_TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andUserTypeEqualTo(String value) {
            addCriterion("USER_TYPE =", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeNotEqualTo(String value) {
            addCriterion("USER_TYPE <>", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeGreaterThan(String value) {
            addCriterion("USER_TYPE >", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeGreaterThanOrEqualTo(String value) {
            addCriterion("USER_TYPE >=", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeLessThan(String value) {
            addCriterion("USER_TYPE <", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeLessThanOrEqualTo(String value) {
            addCriterion("USER_TYPE <=", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeLike(String value) {
            addCriterion("USER_TYPE like", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeNotLike(String value) {
            addCriterion("USER_TYPE not like", value, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeIn(List<String> values) {
            addCriterion("USER_TYPE in", values, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeNotIn(List<String> values) {
            addCriterion("USER_TYPE not in", values, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeBetween(String value1, String value2) {
            addCriterion("USER_TYPE between", value1, value2, "userType");
            return (Criteria) this;
        }

        public Criteria andUserTypeNotBetween(String value1, String value2) {
            addCriterion("USER_TYPE not between", value1, value2, "userType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeIsNull() {
            addCriterion("EVAL_TYPE is null");
            return (Criteria) this;
        }

        public Criteria andEvalTypeIsNotNull() {
            addCriterion("EVAL_TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andEvalTypeEqualTo(String value) {
            addCriterion("EVAL_TYPE =", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeNotEqualTo(String value) {
            addCriterion("EVAL_TYPE <>", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeGreaterThan(String value) {
            addCriterion("EVAL_TYPE >", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeGreaterThanOrEqualTo(String value) {
            addCriterion("EVAL_TYPE >=", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeLessThan(String value) {
            addCriterion("EVAL_TYPE <", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeLessThanOrEqualTo(String value) {
            addCriterion("EVAL_TYPE <=", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeLike(String value) {
            addCriterion("EVAL_TYPE like", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeNotLike(String value) {
            addCriterion("EVAL_TYPE not like", value, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeIn(List<String> values) {
            addCriterion("EVAL_TYPE in", values, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeNotIn(List<String> values) {
            addCriterion("EVAL_TYPE not in", values, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeBetween(String value1, String value2) {
            addCriterion("EVAL_TYPE between", value1, value2, "evalType");
            return (Criteria) this;
        }

        public Criteria andEvalTypeNotBetween(String value1, String value2) {
            addCriterion("EVAL_TYPE not between", value1, value2, "evalType");
            return (Criteria) this;
        }

        public Criteria andScoreIsNull() {
            addCriterion("score is null");
            return (Criteria) this;
        }

        public Criteria andScoreIsNotNull() {
            addCriterion("score is not null");
            return (Criteria) this;
        }

        public Criteria andScoreEqualTo(BigDecimal value) {
            addCriterion("score =", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotEqualTo(BigDecimal value) {
            addCriterion("score <>", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThan(BigDecimal value) {
            addCriterion("score >", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("score >=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThan(BigDecimal value) {
            addCriterion("score <", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("score <=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreIn(List<BigDecimal> values) {
            addCriterion("score in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotIn(List<BigDecimal> values) {
            addCriterion("score not in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("score between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("score not between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andScoreMaxIsNull() {
            addCriterion("SCORE_MAX is null");
            return (Criteria) this;
        }

        public Criteria andScoreMaxIsNotNull() {
            addCriterion("SCORE_MAX is not null");
            return (Criteria) this;
        }

        public Criteria andScoreMaxEqualTo(String value) {
            addCriterion("SCORE_MAX =", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxNotEqualTo(String value) {
            addCriterion("SCORE_MAX <>", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxGreaterThan(String value) {
            addCriterion("SCORE_MAX >", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxGreaterThanOrEqualTo(String value) {
            addCriterion("SCORE_MAX >=", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxLessThan(String value) {
            addCriterion("SCORE_MAX <", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxLessThanOrEqualTo(String value) {
            addCriterion("SCORE_MAX <=", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxLike(String value) {
            addCriterion("SCORE_MAX like", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxNotLike(String value) {
            addCriterion("SCORE_MAX not like", value, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxIn(List<String> values) {
            addCriterion("SCORE_MAX in", values, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxNotIn(List<String> values) {
            addCriterion("SCORE_MAX not in", values, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxBetween(String value1, String value2) {
            addCriterion("SCORE_MAX between", value1, value2, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andScoreMaxNotBetween(String value1, String value2) {
            addCriterion("SCORE_MAX not between", value1, value2, "scoreMax");
            return (Criteria) this;
        }

        public Criteria andBeginDateIsNull() {
            addCriterion("BEGIN_DATE is null");
            return (Criteria) this;
        }

        public Criteria andBeginDateIsNotNull() {
            addCriterion("BEGIN_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andBeginDateEqualTo(String value) {
            addCriterion("BEGIN_DATE =", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateNotEqualTo(String value) {
            addCriterion("BEGIN_DATE <>", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateGreaterThan(String value) {
            addCriterion("BEGIN_DATE >", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateGreaterThanOrEqualTo(String value) {
            addCriterion("BEGIN_DATE >=", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateLessThan(String value) {
            addCriterion("BEGIN_DATE <", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateLessThanOrEqualTo(String value) {
            addCriterion("BEGIN_DATE <=", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateLike(String value) {
            addCriterion("BEGIN_DATE like", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateNotLike(String value) {
            addCriterion("BEGIN_DATE not like", value, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateIn(List<String> values) {
            addCriterion("BEGIN_DATE in", values, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateNotIn(List<String> values) {
            addCriterion("BEGIN_DATE not in", values, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateBetween(String value1, String value2) {
            addCriterion("BEGIN_DATE between", value1, value2, "beginDate");
            return (Criteria) this;
        }

        public Criteria andBeginDateNotBetween(String value1, String value2) {
            addCriterion("BEGIN_DATE not between", value1, value2, "beginDate");
            return (Criteria) this;
        }

        public Criteria andEndDateIsNull() {
            addCriterion("END_DATE is null");
            return (Criteria) this;
        }

        public Criteria andEndDateIsNotNull() {
            addCriterion("END_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andEndDateEqualTo(String value) {
            addCriterion("END_DATE =", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateNotEqualTo(String value) {
            addCriterion("END_DATE <>", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateGreaterThan(String value) {
            addCriterion("END_DATE >", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateGreaterThanOrEqualTo(String value) {
            addCriterion("END_DATE >=", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateLessThan(String value) {
            addCriterion("END_DATE <", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateLessThanOrEqualTo(String value) {
            addCriterion("END_DATE <=", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateLike(String value) {
            addCriterion("END_DATE like", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateNotLike(String value) {
            addCriterion("END_DATE not like", value, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateIn(List<String> values) {
            addCriterion("END_DATE in", values, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateNotIn(List<String> values) {
            addCriterion("END_DATE not in", values, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateBetween(String value1, String value2) {
            addCriterion("END_DATE between", value1, value2, "endDate");
            return (Criteria) this;
        }

        public Criteria andEndDateNotBetween(String value1, String value2) {
            addCriterion("END_DATE not between", value1, value2, "endDate");
            return (Criteria) this;
        }

        public Criteria andEventBeginIsNull() {
            addCriterion("EVENT_BEGIN is null");
            return (Criteria) this;
        }

        public Criteria andEventBeginIsNotNull() {
            addCriterion("EVENT_BEGIN is not null");
            return (Criteria) this;
        }

        public Criteria andEventBeginEqualTo(String value) {
            addCriterion("EVENT_BEGIN =", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginNotEqualTo(String value) {
            addCriterion("EVENT_BEGIN <>", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginGreaterThan(String value) {
            addCriterion("EVENT_BEGIN >", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginGreaterThanOrEqualTo(String value) {
            addCriterion("EVENT_BEGIN >=", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginLessThan(String value) {
            addCriterion("EVENT_BEGIN <", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginLessThanOrEqualTo(String value) {
            addCriterion("EVENT_BEGIN <=", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginLike(String value) {
            addCriterion("EVENT_BEGIN like", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginNotLike(String value) {
            addCriterion("EVENT_BEGIN not like", value, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginIn(List<String> values) {
            addCriterion("EVENT_BEGIN in", values, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginNotIn(List<String> values) {
            addCriterion("EVENT_BEGIN not in", values, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginBetween(String value1, String value2) {
            addCriterion("EVENT_BEGIN between", value1, value2, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventBeginNotBetween(String value1, String value2) {
            addCriterion("EVENT_BEGIN not between", value1, value2, "eventBegin");
            return (Criteria) this;
        }

        public Criteria andEventEndIsNull() {
            addCriterion("EVENT_END is null");
            return (Criteria) this;
        }

        public Criteria andEventEndIsNotNull() {
            addCriterion("EVENT_END is not null");
            return (Criteria) this;
        }

        public Criteria andEventEndEqualTo(String value) {
            addCriterion("EVENT_END =", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndNotEqualTo(String value) {
            addCriterion("EVENT_END <>", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndGreaterThan(String value) {
            addCriterion("EVENT_END >", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndGreaterThanOrEqualTo(String value) {
            addCriterion("EVENT_END >=", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndLessThan(String value) {
            addCriterion("EVENT_END <", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndLessThanOrEqualTo(String value) {
            addCriterion("EVENT_END <=", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndLike(String value) {
            addCriterion("EVENT_END like", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndNotLike(String value) {
            addCriterion("EVENT_END not like", value, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndIn(List<String> values) {
            addCriterion("EVENT_END in", values, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndNotIn(List<String> values) {
            addCriterion("EVENT_END not in", values, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndBetween(String value1, String value2) {
            addCriterion("EVENT_END between", value1, value2, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andEventEndNotBetween(String value1, String value2) {
            addCriterion("EVENT_END not between", value1, value2, "eventEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginIsNull() {
            addCriterion("GRZP_BEGIN is null");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginIsNotNull() {
            addCriterion("GRZP_BEGIN is not null");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginEqualTo(String value) {
            addCriterion("GRZP_BEGIN =", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginNotEqualTo(String value) {
            addCriterion("GRZP_BEGIN <>", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginGreaterThan(String value) {
            addCriterion("GRZP_BEGIN >", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginGreaterThanOrEqualTo(String value) {
            addCriterion("GRZP_BEGIN >=", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginLessThan(String value) {
            addCriterion("GRZP_BEGIN <", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginLessThanOrEqualTo(String value) {
            addCriterion("GRZP_BEGIN <=", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginLike(String value) {
            addCriterion("GRZP_BEGIN like", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginNotLike(String value) {
            addCriterion("GRZP_BEGIN not like", value, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginIn(List<String> values) {
            addCriterion("GRZP_BEGIN in", values, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginNotIn(List<String> values) {
            addCriterion("GRZP_BEGIN not in", values, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginBetween(String value1, String value2) {
            addCriterion("GRZP_BEGIN between", value1, value2, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpBeginNotBetween(String value1, String value2) {
            addCriterion("GRZP_BEGIN not between", value1, value2, "grzpBegin");
            return (Criteria) this;
        }

        public Criteria andGrzpEndIsNull() {
            addCriterion("GRZP_END is null");
            return (Criteria) this;
        }

        public Criteria andGrzpEndIsNotNull() {
            addCriterion("GRZP_END is not null");
            return (Criteria) this;
        }

        public Criteria andGrzpEndEqualTo(String value) {
            addCriterion("GRZP_END =", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndNotEqualTo(String value) {
            addCriterion("GRZP_END <>", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndGreaterThan(String value) {
            addCriterion("GRZP_END >", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndGreaterThanOrEqualTo(String value) {
            addCriterion("GRZP_END >=", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndLessThan(String value) {
            addCriterion("GRZP_END <", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndLessThanOrEqualTo(String value) {
            addCriterion("GRZP_END <=", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndLike(String value) {
            addCriterion("GRZP_END like", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndNotLike(String value) {
            addCriterion("GRZP_END not like", value, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndIn(List<String> values) {
            addCriterion("GRZP_END in", values, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndNotIn(List<String> values) {
            addCriterion("GRZP_END not in", values, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndBetween(String value1, String value2) {
            addCriterion("GRZP_END between", value1, value2, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andGrzpEndNotBetween(String value1, String value2) {
            addCriterion("GRZP_END not between", value1, value2, "grzpEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginIsNull() {
            addCriterion("KSEVAL_BEGIN is null");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginIsNotNull() {
            addCriterion("KSEVAL_BEGIN is not null");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginEqualTo(String value) {
            addCriterion("KSEVAL_BEGIN =", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginNotEqualTo(String value) {
            addCriterion("KSEVAL_BEGIN <>", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginGreaterThan(String value) {
            addCriterion("KSEVAL_BEGIN >", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginGreaterThanOrEqualTo(String value) {
            addCriterion("KSEVAL_BEGIN >=", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginLessThan(String value) {
            addCriterion("KSEVAL_BEGIN <", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginLessThanOrEqualTo(String value) {
            addCriterion("KSEVAL_BEGIN <=", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginLike(String value) {
            addCriterion("KSEVAL_BEGIN like", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginNotLike(String value) {
            addCriterion("KSEVAL_BEGIN not like", value, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginIn(List<String> values) {
            addCriterion("KSEVAL_BEGIN in", values, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginNotIn(List<String> values) {
            addCriterion("KSEVAL_BEGIN not in", values, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginBetween(String value1, String value2) {
            addCriterion("KSEVAL_BEGIN between", value1, value2, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalBeginNotBetween(String value1, String value2) {
            addCriterion("KSEVAL_BEGIN not between", value1, value2, "ksevalBegin");
            return (Criteria) this;
        }

        public Criteria andKsevalEndIsNull() {
            addCriterion("KSEVAL_END is null");
            return (Criteria) this;
        }

        public Criteria andKsevalEndIsNotNull() {
            addCriterion("KSEVAL_END is not null");
            return (Criteria) this;
        }

        public Criteria andKsevalEndEqualTo(String value) {
            addCriterion("KSEVAL_END =", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndNotEqualTo(String value) {
            addCriterion("KSEVAL_END <>", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndGreaterThan(String value) {
            addCriterion("KSEVAL_END >", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndGreaterThanOrEqualTo(String value) {
            addCriterion("KSEVAL_END >=", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndLessThan(String value) {
            addCriterion("KSEVAL_END <", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndLessThanOrEqualTo(String value) {
            addCriterion("KSEVAL_END <=", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndLike(String value) {
            addCriterion("KSEVAL_END like", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndNotLike(String value) {
            addCriterion("KSEVAL_END not like", value, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndIn(List<String> values) {
            addCriterion("KSEVAL_END in", values, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndNotIn(List<String> values) {
            addCriterion("KSEVAL_END not in", values, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndBetween(String value1, String value2) {
            addCriterion("KSEVAL_END between", value1, value2, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andKsevalEndNotBetween(String value1, String value2) {
            addCriterion("KSEVAL_END not between", value1, value2, "ksevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginIsNull() {
            addCriterion("DKEVAL_BEGIN is null");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginIsNotNull() {
            addCriterion("DKEVAL_BEGIN is not null");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginEqualTo(String value) {
            addCriterion("DKEVAL_BEGIN =", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginNotEqualTo(String value) {
            addCriterion("DKEVAL_BEGIN <>", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginGreaterThan(String value) {
            addCriterion("DKEVAL_BEGIN >", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginGreaterThanOrEqualTo(String value) {
            addCriterion("DKEVAL_BEGIN >=", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginLessThan(String value) {
            addCriterion("DKEVAL_BEGIN <", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginLessThanOrEqualTo(String value) {
            addCriterion("DKEVAL_BEGIN <=", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginLike(String value) {
            addCriterion("DKEVAL_BEGIN like", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginNotLike(String value) {
            addCriterion("DKEVAL_BEGIN not like", value, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginIn(List<String> values) {
            addCriterion("DKEVAL_BEGIN in", values, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginNotIn(List<String> values) {
            addCriterion("DKEVAL_BEGIN not in", values, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginBetween(String value1, String value2) {
            addCriterion("DKEVAL_BEGIN between", value1, value2, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalBeginNotBetween(String value1, String value2) {
            addCriterion("DKEVAL_BEGIN not between", value1, value2, "dkevalBegin");
            return (Criteria) this;
        }

        public Criteria andDkevalEndIsNull() {
            addCriterion("DKEVAL_END is null");
            return (Criteria) this;
        }

        public Criteria andDkevalEndIsNotNull() {
            addCriterion("DKEVAL_END is not null");
            return (Criteria) this;
        }

        public Criteria andDkevalEndEqualTo(String value) {
            addCriterion("DKEVAL_END =", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndNotEqualTo(String value) {
            addCriterion("DKEVAL_END <>", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndGreaterThan(String value) {
            addCriterion("DKEVAL_END >", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndGreaterThanOrEqualTo(String value) {
            addCriterion("DKEVAL_END >=", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndLessThan(String value) {
            addCriterion("DKEVAL_END <", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndLessThanOrEqualTo(String value) {
            addCriterion("DKEVAL_END <=", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndLike(String value) {
            addCriterion("DKEVAL_END like", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndNotLike(String value) {
            addCriterion("DKEVAL_END not like", value, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndIn(List<String> values) {
            addCriterion("DKEVAL_END in", values, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndNotIn(List<String> values) {
            addCriterion("DKEVAL_END not in", values, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndBetween(String value1, String value2) {
            addCriterion("DKEVAL_END between", value1, value2, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDkevalEndNotBetween(String value1, String value2) {
            addCriterion("DKEVAL_END not between", value1, value2, "dkevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginIsNull() {
            addCriterion("DWEVAL_BEGIN is null");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginIsNotNull() {
            addCriterion("DWEVAL_BEGIN is not null");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginEqualTo(String value) {
            addCriterion("DWEVAL_BEGIN =", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginNotEqualTo(String value) {
            addCriterion("DWEVAL_BEGIN <>", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginGreaterThan(String value) {
            addCriterion("DWEVAL_BEGIN >", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginGreaterThanOrEqualTo(String value) {
            addCriterion("DWEVAL_BEGIN >=", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginLessThan(String value) {
            addCriterion("DWEVAL_BEGIN <", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginLessThanOrEqualTo(String value) {
            addCriterion("DWEVAL_BEGIN <=", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginLike(String value) {
            addCriterion("DWEVAL_BEGIN like", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginNotLike(String value) {
            addCriterion("DWEVAL_BEGIN not like", value, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginIn(List<String> values) {
            addCriterion("DWEVAL_BEGIN in", values, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginNotIn(List<String> values) {
            addCriterion("DWEVAL_BEGIN not in", values, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginBetween(String value1, String value2) {
            addCriterion("DWEVAL_BEGIN between", value1, value2, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalBeginNotBetween(String value1, String value2) {
            addCriterion("DWEVAL_BEGIN not between", value1, value2, "dwevalBegin");
            return (Criteria) this;
        }

        public Criteria andDwevalEndIsNull() {
            addCriterion("DWEVAL_END is null");
            return (Criteria) this;
        }

        public Criteria andDwevalEndIsNotNull() {
            addCriterion("DWEVAL_END is not null");
            return (Criteria) this;
        }

        public Criteria andDwevalEndEqualTo(String value) {
            addCriterion("DWEVAL_END =", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndNotEqualTo(String value) {
            addCriterion("DWEVAL_END <>", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndGreaterThan(String value) {
            addCriterion("DWEVAL_END >", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndGreaterThanOrEqualTo(String value) {
            addCriterion("DWEVAL_END >=", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndLessThan(String value) {
            addCriterion("DWEVAL_END <", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndLessThanOrEqualTo(String value) {
            addCriterion("DWEVAL_END <=", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndLike(String value) {
            addCriterion("DWEVAL_END like", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndNotLike(String value) {
            addCriterion("DWEVAL_END not like", value, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndIn(List<String> values) {
            addCriterion("DWEVAL_END in", values, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndNotIn(List<String> values) {
            addCriterion("DWEVAL_END not in", values, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndBetween(String value1, String value2) {
            addCriterion("DWEVAL_END between", value1, value2, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andDwevalEndNotBetween(String value1, String value2) {
            addCriterion("DWEVAL_END not between", value1, value2, "dwevalEnd");
            return (Criteria) this;
        }

        public Criteria andQuorumIsNull() {
            addCriterion("QUORUM is null");
            return (Criteria) this;
        }

        public Criteria andQuorumIsNotNull() {
            addCriterion("QUORUM is not null");
            return (Criteria) this;
        }

        public Criteria andQuorumEqualTo(Integer value) {
            addCriterion("QUORUM =", value, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumNotEqualTo(Integer value) {
            addCriterion("QUORUM <>", value, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumGreaterThan(Integer value) {
            addCriterion("QUORUM >", value, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumGreaterThanOrEqualTo(Integer value) {
            addCriterion("QUORUM >=", value, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumLessThan(Integer value) {
            addCriterion("QUORUM <", value, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumLessThanOrEqualTo(Integer value) {
            addCriterion("QUORUM <=", value, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumIn(List<Integer> values) {
            addCriterion("QUORUM in", values, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumNotIn(List<Integer> values) {
            addCriterion("QUORUM not in", values, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumBetween(Integer value1, Integer value2) {
            addCriterion("QUORUM between", value1, value2, "quorum");
            return (Criteria) this;
        }

        public Criteria andQuorumNotBetween(Integer value1, Integer value2) {
            addCriterion("QUORUM not between", value1, value2, "quorum");
            return (Criteria) this;
        }

        public Criteria andRealNumIsNull() {
            addCriterion("REAL_NUM is null");
            return (Criteria) this;
        }

        public Criteria andRealNumIsNotNull() {
            addCriterion("REAL_NUM is not null");
            return (Criteria) this;
        }

        public Criteria andRealNumEqualTo(Integer value) {
            addCriterion("REAL_NUM =", value, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumNotEqualTo(Integer value) {
            addCriterion("REAL_NUM <>", value, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumGreaterThan(Integer value) {
            addCriterion("REAL_NUM >", value, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumGreaterThanOrEqualTo(Integer value) {
            addCriterion("REAL_NUM >=", value, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumLessThan(Integer value) {
            addCriterion("REAL_NUM <", value, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumLessThanOrEqualTo(Integer value) {
            addCriterion("REAL_NUM <=", value, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumIn(List<Integer> values) {
            addCriterion("REAL_NUM in", values, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumNotIn(List<Integer> values) {
            addCriterion("REAL_NUM not in", values, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumBetween(Integer value1, Integer value2) {
            addCriterion("REAL_NUM between", value1, value2, "realNum");
            return (Criteria) this;
        }

        public Criteria andRealNumNotBetween(Integer value1, Integer value2) {
            addCriterion("REAL_NUM not between", value1, value2, "realNum");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("STATUS is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("STATUS is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(String value) {
            addCriterion("STATUS =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(String value) {
            addCriterion("STATUS <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(String value) {
            addCriterion("STATUS >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(String value) {
            addCriterion("STATUS >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(String value) {
            addCriterion("STATUS <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(String value) {
            addCriterion("STATUS <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLike(String value) {
            addCriterion("STATUS like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotLike(String value) {
            addCriterion("STATUS not like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<String> values) {
            addCriterion("STATUS in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<String> values) {
            addCriterion("STATUS not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(String value1, String value2) {
            addCriterion("STATUS between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(String value1, String value2) {
            addCriterion("STATUS not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNull() {
            addCriterion("REMARK is null");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNotNull() {
            addCriterion("REMARK is not null");
            return (Criteria) this;
        }

        public Criteria andRemarkEqualTo(String value) {
            addCriterion("REMARK =", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotEqualTo(String value) {
            addCriterion("REMARK <>", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThan(String value) {
            addCriterion("REMARK >", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("REMARK >=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThan(String value) {
            addCriterion("REMARK <", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThanOrEqualTo(String value) {
            addCriterion("REMARK <=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLike(String value) {
            addCriterion("REMARK like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotLike(String value) {
            addCriterion("REMARK not like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkIn(List<String> values) {
            addCriterion("REMARK in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotIn(List<String> values) {
            addCriterion("REMARK not in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkBetween(String value1, String value2) {
            addCriterion("REMARK between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotBetween(String value1, String value2) {
            addCriterion("REMARK not between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andAddTimeIsNull() {
            addCriterion("ADD_TIME is null");
            return (Criteria) this;
        }

        public Criteria andAddTimeIsNotNull() {
            addCriterion("ADD_TIME is not null");
            return (Criteria) this;
        }

        public Criteria andAddTimeEqualTo(Date value) {
            addCriterion("ADD_TIME =", value, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeNotEqualTo(Date value) {
            addCriterion("ADD_TIME <>", value, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeGreaterThan(Date value) {
            addCriterion("ADD_TIME >", value, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("ADD_TIME >=", value, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeLessThan(Date value) {
            addCriterion("ADD_TIME <", value, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeLessThanOrEqualTo(Date value) {
            addCriterion("ADD_TIME <=", value, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeIn(List<Date> values) {
            addCriterion("ADD_TIME in", values, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeNotIn(List<Date> values) {
            addCriterion("ADD_TIME not in", values, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeBetween(Date value1, Date value2) {
            addCriterion("ADD_TIME between", value1, value2, "addTime");
            return (Criteria) this;
        }

        public Criteria andAddTimeNotBetween(Date value1, Date value2) {
            addCriterion("ADD_TIME not between", value1, value2, "addTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("UPDATE_TIME is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("UPDATE_TIME is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("UPDATE_TIME =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("UPDATE_TIME <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("UPDATE_TIME >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("UPDATE_TIME >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("UPDATE_TIME <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("UPDATE_TIME <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("UPDATE_TIME in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("UPDATE_TIME not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("UPDATE_TIME between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("UPDATE_TIME not between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andCreaterIsNull() {
            addCriterion("CREATER is null");
            return (Criteria) this;
        }

        public Criteria andCreaterIsNotNull() {
            addCriterion("CREATER is not null");
            return (Criteria) this;
        }

        public Criteria andCreaterEqualTo(Long value) {
            addCriterion("CREATER =", value, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterNotEqualTo(Long value) {
            addCriterion("CREATER <>", value, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterGreaterThan(Long value) {
            addCriterion("CREATER >", value, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterGreaterThanOrEqualTo(Long value) {
            addCriterion("CREATER >=", value, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterLessThan(Long value) {
            addCriterion("CREATER <", value, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterLessThanOrEqualTo(Long value) {
            addCriterion("CREATER <=", value, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterIn(List<Long> values) {
            addCriterion("CREATER in", values, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterNotIn(List<Long> values) {
            addCriterion("CREATER not in", values, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterBetween(Long value1, Long value2) {
            addCriterion("CREATER between", value1, value2, "creater");
            return (Criteria) this;
        }

        public Criteria andCreaterNotBetween(Long value1, Long value2) {
            addCriterion("CREATER not between", value1, value2, "creater");
            return (Criteria) this;
        }

        public Criteria andMenderIsNull() {
            addCriterion("MENDER is null");
            return (Criteria) this;
        }

        public Criteria andMenderIsNotNull() {
            addCriterion("MENDER is not null");
            return (Criteria) this;
        }

        public Criteria andMenderEqualTo(Long value) {
            addCriterion("MENDER =", value, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderNotEqualTo(Long value) {
            addCriterion("MENDER <>", value, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderGreaterThan(Long value) {
            addCriterion("MENDER >", value, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderGreaterThanOrEqualTo(Long value) {
            addCriterion("MENDER >=", value, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderLessThan(Long value) {
            addCriterion("MENDER <", value, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderLessThanOrEqualTo(Long value) {
            addCriterion("MENDER <=", value, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderIn(List<Long> values) {
            addCriterion("MENDER in", values, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderNotIn(List<Long> values) {
            addCriterion("MENDER not in", values, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderBetween(Long value1, Long value2) {
            addCriterion("MENDER between", value1, value2, "mender");
            return (Criteria) this;
        }

        public Criteria andMenderNotBetween(Long value1, Long value2) {
            addCriterion("MENDER not between", value1, value2, "mender");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}