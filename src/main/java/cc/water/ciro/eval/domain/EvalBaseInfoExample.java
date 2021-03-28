package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.eval.query.EvalBaseInfoQuery;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EvalBaseInfoExample extends EvalBaseInfoQuery {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    public EvalBaseInfoExample() {
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

        public Criteria andPeriodIdIsNull() {
            addCriterion("period_id is null");
            return (Criteria) this;
        }

        public Criteria andPeriodIdIsNotNull() {
            addCriterion("period_id is not null");
            return (Criteria) this;
        }

        public Criteria andPeriodIdEqualTo(String value) {
            addCriterion("period_id =", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdNotEqualTo(String value) {
            addCriterion("period_id <>", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdGreaterThan(String value) {
            addCriterion("period_id >", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdGreaterThanOrEqualTo(String value) {
            addCriterion("period_id >=", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdLessThan(String value) {
            addCriterion("period_id <", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdLessThanOrEqualTo(String value) {
            addCriterion("period_id <=", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdLike(String value) {
            addCriterion("period_id like", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdNotLike(String value) {
            addCriterion("period_id not like", value, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdIn(List<String> values) {
            addCriterion("period_id in", values, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdNotIn(List<String> values) {
            addCriterion("period_id not in", values, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdBetween(String value1, String value2) {
            addCriterion("period_id between", value1, value2, "periodId");
            return (Criteria) this;
        }

        public Criteria andPeriodIdNotBetween(String value1, String value2) {
            addCriterion("period_id not between", value1, value2, "periodId");
            return (Criteria) this;
        }

        public Criteria andKsIsNull() {
            addCriterion("KS is null");
            return (Criteria) this;
        }

        public Criteria andKsIsNotNull() {
            addCriterion("KS is not null");
            return (Criteria) this;
        }

        public Criteria andKsEqualTo(String value) {
            addCriterion("KS =", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsNotEqualTo(String value) {
            addCriterion("KS <>", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsGreaterThan(String value) {
            addCriterion("KS >", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsGreaterThanOrEqualTo(String value) {
            addCriterion("KS >=", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsLessThan(String value) {
            addCriterion("KS <", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsLessThanOrEqualTo(String value) {
            addCriterion("KS <=", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsLike(String value) {
            addCriterion("KS like", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsNotLike(String value) {
            addCriterion("KS not like", value, "ks");
            return (Criteria) this;
        }

        public Criteria andKsIn(List<String> values) {
            addCriterion("KS in", values, "ks");
            return (Criteria) this;
        }

        public Criteria andKsNotIn(List<String> values) {
            addCriterion("KS not in", values, "ks");
            return (Criteria) this;
        }

        public Criteria andKsBetween(String value1, String value2) {
            addCriterion("KS between", value1, value2, "ks");
            return (Criteria) this;
        }

        public Criteria andKsNotBetween(String value1, String value2) {
            addCriterion("KS not between", value1, value2, "ks");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Long value) {
            addCriterion("USER_ID =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Long value) {
            addCriterion("USER_ID <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Long value) {
            addCriterion("USER_ID >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("USER_ID >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Long value) {
            addCriterion("USER_ID <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Long value) {
            addCriterion("USER_ID <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Long> values) {
            addCriterion("USER_ID in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Long> values) {
            addCriterion("USER_ID not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Long value1, Long value2) {
            addCriterion("USER_ID between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Long value1, Long value2) {
            addCriterion("USER_ID not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andSexIsNull() {
            addCriterion("SEX is null");
            return (Criteria) this;
        }

        public Criteria andSexIsNotNull() {
            addCriterion("SEX is not null");
            return (Criteria) this;
        }

        public Criteria andSexEqualTo(String value) {
            addCriterion("SEX =", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotEqualTo(String value) {
            addCriterion("SEX <>", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexGreaterThan(String value) {
            addCriterion("SEX >", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexGreaterThanOrEqualTo(String value) {
            addCriterion("SEX >=", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLessThan(String value) {
            addCriterion("SEX <", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLessThanOrEqualTo(String value) {
            addCriterion("SEX <=", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLike(String value) {
            addCriterion("SEX like", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotLike(String value) {
            addCriterion("SEX not like", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexIn(List<String> values) {
            addCriterion("SEX in", values, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotIn(List<String> values) {
            addCriterion("SEX not in", values, "sex");
            return (Criteria) this;
        }

        public Criteria andSexBetween(String value1, String value2) {
            addCriterion("SEX between", value1, value2, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotBetween(String value1, String value2) {
            addCriterion("SEX not between", value1, value2, "sex");
            return (Criteria) this;
        }

        public Criteria andNlIsNull() {
            addCriterion("NL is null");
            return (Criteria) this;
        }

        public Criteria andNlIsNotNull() {
            addCriterion("NL is not null");
            return (Criteria) this;
        }

        public Criteria andNlEqualTo(Integer value) {
            addCriterion("NL =", value, "nl");
            return (Criteria) this;
        }

        public Criteria andNlNotEqualTo(Integer value) {
            addCriterion("NL <>", value, "nl");
            return (Criteria) this;
        }

        public Criteria andNlGreaterThan(Integer value) {
            addCriterion("NL >", value, "nl");
            return (Criteria) this;
        }

        public Criteria andNlGreaterThanOrEqualTo(Integer value) {
            addCriterion("NL >=", value, "nl");
            return (Criteria) this;
        }

        public Criteria andNlLessThan(Integer value) {
            addCriterion("NL <", value, "nl");
            return (Criteria) this;
        }

        public Criteria andNlLessThanOrEqualTo(Integer value) {
            addCriterion("NL <=", value, "nl");
            return (Criteria) this;
        }

        public Criteria andNlIn(List<Integer> values) {
            addCriterion("NL in", values, "nl");
            return (Criteria) this;
        }

        public Criteria andNlNotIn(List<Integer> values) {
            addCriterion("NL not in", values, "nl");
            return (Criteria) this;
        }

        public Criteria andNlBetween(Integer value1, Integer value2) {
            addCriterion("NL between", value1, value2, "nl");
            return (Criteria) this;
        }

        public Criteria andNlNotBetween(Integer value1, Integer value2) {
            addCriterion("NL not between", value1, value2, "nl");
            return (Criteria) this;
        }

        public Criteria andZcIsNull() {
            addCriterion("ZC is null");
            return (Criteria) this;
        }

        public Criteria andZcIsNotNull() {
            addCriterion("ZC is not null");
            return (Criteria) this;
        }

        public Criteria andZcEqualTo(String value) {
            addCriterion("ZC =", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcNotEqualTo(String value) {
            addCriterion("ZC <>", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcGreaterThan(String value) {
            addCriterion("ZC >", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcGreaterThanOrEqualTo(String value) {
            addCriterion("ZC >=", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcLessThan(String value) {
            addCriterion("ZC <", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcLessThanOrEqualTo(String value) {
            addCriterion("ZC <=", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcLike(String value) {
            addCriterion("ZC like", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcNotLike(String value) {
            addCriterion("ZC not like", value, "zc");
            return (Criteria) this;
        }

        public Criteria andZcIn(List<String> values) {
            addCriterion("ZC in", values, "zc");
            return (Criteria) this;
        }

        public Criteria andZcNotIn(List<String> values) {
            addCriterion("ZC not in", values, "zc");
            return (Criteria) this;
        }

        public Criteria andZcBetween(String value1, String value2) {
            addCriterion("ZC between", value1, value2, "zc");
            return (Criteria) this;
        }

        public Criteria andZcNotBetween(String value1, String value2) {
            addCriterion("ZC not between", value1, value2, "zc");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceIsNull() {
            addCriterion("SELF_ADVICE is null");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceIsNotNull() {
            addCriterion("SELF_ADVICE is not null");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceEqualTo(String value) {
            addCriterion("SELF_ADVICE =", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceNotEqualTo(String value) {
            addCriterion("SELF_ADVICE <>", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceGreaterThan(String value) {
            addCriterion("SELF_ADVICE >", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceGreaterThanOrEqualTo(String value) {
            addCriterion("SELF_ADVICE >=", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceLessThan(String value) {
            addCriterion("SELF_ADVICE <", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceLessThanOrEqualTo(String value) {
            addCriterion("SELF_ADVICE <=", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceLike(String value) {
            addCriterion("SELF_ADVICE like", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceNotLike(String value) {
            addCriterion("SELF_ADVICE not like", value, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceIn(List<String> values) {
            addCriterion("SELF_ADVICE in", values, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceNotIn(List<String> values) {
            addCriterion("SELF_ADVICE not in", values, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceBetween(String value1, String value2) {
            addCriterion("SELF_ADVICE between", value1, value2, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfAdviceNotBetween(String value1, String value2) {
            addCriterion("SELF_ADVICE not between", value1, value2, "selfAdvice");
            return (Criteria) this;
        }

        public Criteria andSelfDateIsNull() {
            addCriterion("SELF_DATE is null");
            return (Criteria) this;
        }

        public Criteria andSelfDateIsNotNull() {
            addCriterion("SELF_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andSelfDateEqualTo(Date value) {
            addCriterion("SELF_DATE =", value, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateNotEqualTo(Date value) {
            addCriterion("SELF_DATE <>", value, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateGreaterThan(Date value) {
            addCriterion("SELF_DATE >", value, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateGreaterThanOrEqualTo(Date value) {
            addCriterion("SELF_DATE >=", value, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateLessThan(Date value) {
            addCriterion("SELF_DATE <", value, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateLessThanOrEqualTo(Date value) {
            addCriterion("SELF_DATE <=", value, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateIn(List<Date> values) {
            addCriterion("SELF_DATE in", values, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateNotIn(List<Date> values) {
            addCriterion("SELF_DATE not in", values, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateBetween(Date value1, Date value2) {
            addCriterion("SELF_DATE between", value1, value2, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfDateNotBetween(Date value1, Date value2) {
            addCriterion("SELF_DATE not between", value1, value2, "selfDate");
            return (Criteria) this;
        }

        public Criteria andSelfLvIsNull() {
            addCriterion("SELF_LV is null");
            return (Criteria) this;
        }

        public Criteria andSelfLvIsNotNull() {
            addCriterion("SELF_LV is not null");
            return (Criteria) this;
        }

        public Criteria andSelfLvEqualTo(String value) {
            addCriterion("SELF_LV =", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvNotEqualTo(String value) {
            addCriterion("SELF_LV <>", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvGreaterThan(String value) {
            addCriterion("SELF_LV >", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvGreaterThanOrEqualTo(String value) {
            addCriterion("SELF_LV >=", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvLessThan(String value) {
            addCriterion("SELF_LV <", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvLessThanOrEqualTo(String value) {
            addCriterion("SELF_LV <=", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvLike(String value) {
            addCriterion("SELF_LV like", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvNotLike(String value) {
            addCriterion("SELF_LV not like", value, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvIn(List<String> values) {
            addCriterion("SELF_LV in", values, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvNotIn(List<String> values) {
            addCriterion("SELF_LV not in", values, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvBetween(String value1, String value2) {
            addCriterion("SELF_LV between", value1, value2, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfLvNotBetween(String value1, String value2) {
            addCriterion("SELF_LV not between", value1, value2, "selfLv");
            return (Criteria) this;
        }

        public Criteria andSelfScoreIsNull() {
            addCriterion("SELF_SCORE is null");
            return (Criteria) this;
        }

        public Criteria andSelfScoreIsNotNull() {
            addCriterion("SELF_SCORE is not null");
            return (Criteria) this;
        }

        public Criteria andSelfScoreEqualTo(BigDecimal value) {
            addCriterion("SELF_SCORE =", value, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreNotEqualTo(BigDecimal value) {
            addCriterion("SELF_SCORE <>", value, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreGreaterThan(BigDecimal value) {
            addCriterion("SELF_SCORE >", value, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("SELF_SCORE >=", value, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreLessThan(BigDecimal value) {
            addCriterion("SELF_SCORE <", value, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("SELF_SCORE <=", value, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreIn(List<BigDecimal> values) {
            addCriterion("SELF_SCORE in", values, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreNotIn(List<BigDecimal> values) {
            addCriterion("SELF_SCORE not in", values, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("SELF_SCORE between", value1, value2, "selfScore");
            return (Criteria) this;
        }

        public Criteria andSelfScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("SELF_SCORE not between", value1, value2, "selfScore");
            return (Criteria) this;
        }

        public Criteria andKsUserIdIsNull() {
            addCriterion("KS_USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andKsUserIdIsNotNull() {
            addCriterion("KS_USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andKsUserIdEqualTo(Long value) {
            addCriterion("KS_USER_ID =", value, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdNotEqualTo(Long value) {
            addCriterion("KS_USER_ID <>", value, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdGreaterThan(Long value) {
            addCriterion("KS_USER_ID >", value, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("KS_USER_ID >=", value, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdLessThan(Long value) {
            addCriterion("KS_USER_ID <", value, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdLessThanOrEqualTo(Long value) {
            addCriterion("KS_USER_ID <=", value, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdIn(List<Long> values) {
            addCriterion("KS_USER_ID in", values, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdNotIn(List<Long> values) {
            addCriterion("KS_USER_ID not in", values, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdBetween(Long value1, Long value2) {
            addCriterion("KS_USER_ID between", value1, value2, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsUserIdNotBetween(Long value1, Long value2) {
            addCriterion("KS_USER_ID not between", value1, value2, "ksUserId");
            return (Criteria) this;
        }

        public Criteria andKsAdviceIsNull() {
            addCriterion("KS_ADVICE is null");
            return (Criteria) this;
        }

        public Criteria andKsAdviceIsNotNull() {
            addCriterion("KS_ADVICE is not null");
            return (Criteria) this;
        }

        public Criteria andKsAdviceEqualTo(String value) {
            addCriterion("KS_ADVICE =", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceNotEqualTo(String value) {
            addCriterion("KS_ADVICE <>", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceGreaterThan(String value) {
            addCriterion("KS_ADVICE >", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceGreaterThanOrEqualTo(String value) {
            addCriterion("KS_ADVICE >=", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceLessThan(String value) {
            addCriterion("KS_ADVICE <", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceLessThanOrEqualTo(String value) {
            addCriterion("KS_ADVICE <=", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceLike(String value) {
            addCriterion("KS_ADVICE like", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceNotLike(String value) {
            addCriterion("KS_ADVICE not like", value, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceIn(List<String> values) {
            addCriterion("KS_ADVICE in", values, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceNotIn(List<String> values) {
            addCriterion("KS_ADVICE not in", values, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceBetween(String value1, String value2) {
            addCriterion("KS_ADVICE between", value1, value2, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsAdviceNotBetween(String value1, String value2) {
            addCriterion("KS_ADVICE not between", value1, value2, "ksAdvice");
            return (Criteria) this;
        }

        public Criteria andKsDateIsNull() {
            addCriterion("KS_DATE is null");
            return (Criteria) this;
        }

        public Criteria andKsDateIsNotNull() {
            addCriterion("KS_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andKsDateEqualTo(Date value) {
            addCriterion("KS_DATE =", value, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateNotEqualTo(Date value) {
            addCriterion("KS_DATE <>", value, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateGreaterThan(Date value) {
            addCriterion("KS_DATE >", value, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateGreaterThanOrEqualTo(Date value) {
            addCriterion("KS_DATE >=", value, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateLessThan(Date value) {
            addCriterion("KS_DATE <", value, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateLessThanOrEqualTo(Date value) {
            addCriterion("KS_DATE <=", value, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateIn(List<Date> values) {
            addCriterion("KS_DATE in", values, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateNotIn(List<Date> values) {
            addCriterion("KS_DATE not in", values, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateBetween(Date value1, Date value2) {
            addCriterion("KS_DATE between", value1, value2, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsDateNotBetween(Date value1, Date value2) {
            addCriterion("KS_DATE not between", value1, value2, "ksDate");
            return (Criteria) this;
        }

        public Criteria andKsLvIsNull() {
            addCriterion("KS_LV is null");
            return (Criteria) this;
        }

        public Criteria andKsLvIsNotNull() {
            addCriterion("KS_LV is not null");
            return (Criteria) this;
        }

        public Criteria andKsLvEqualTo(String value) {
            addCriterion("KS_LV =", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvNotEqualTo(String value) {
            addCriterion("KS_LV <>", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvGreaterThan(String value) {
            addCriterion("KS_LV >", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvGreaterThanOrEqualTo(String value) {
            addCriterion("KS_LV >=", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvLessThan(String value) {
            addCriterion("KS_LV <", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvLessThanOrEqualTo(String value) {
            addCriterion("KS_LV <=", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvLike(String value) {
            addCriterion("KS_LV like", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvNotLike(String value) {
            addCriterion("KS_LV not like", value, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvIn(List<String> values) {
            addCriterion("KS_LV in", values, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvNotIn(List<String> values) {
            addCriterion("KS_LV not in", values, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvBetween(String value1, String value2) {
            addCriterion("KS_LV between", value1, value2, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsLvNotBetween(String value1, String value2) {
            addCriterion("KS_LV not between", value1, value2, "ksLv");
            return (Criteria) this;
        }

        public Criteria andKsScoreIsNull() {
            addCriterion("KS_SCORE is null");
            return (Criteria) this;
        }

        public Criteria andKsScoreIsNotNull() {
            addCriterion("KS_SCORE is not null");
            return (Criteria) this;
        }

        public Criteria andKsScoreEqualTo(BigDecimal value) {
            addCriterion("KS_SCORE =", value, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreNotEqualTo(BigDecimal value) {
            addCriterion("KS_SCORE <>", value, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreGreaterThan(BigDecimal value) {
            addCriterion("KS_SCORE >", value, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("KS_SCORE >=", value, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreLessThan(BigDecimal value) {
            addCriterion("KS_SCORE <", value, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("KS_SCORE <=", value, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreIn(List<BigDecimal> values) {
            addCriterion("KS_SCORE in", values, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreNotIn(List<BigDecimal> values) {
            addCriterion("KS_SCORE not in", values, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("KS_SCORE between", value1, value2, "ksScore");
            return (Criteria) this;
        }

        public Criteria andKsScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("KS_SCORE not between", value1, value2, "ksScore");
            return (Criteria) this;
        }

        public Criteria andDkUserIdIsNull() {
            addCriterion("DK_USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andDkUserIdIsNotNull() {
            addCriterion("DK_USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andDkUserIdEqualTo(Long value) {
            addCriterion("DK_USER_ID =", value, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdNotEqualTo(Long value) {
            addCriterion("DK_USER_ID <>", value, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdGreaterThan(Long value) {
            addCriterion("DK_USER_ID >", value, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("DK_USER_ID >=", value, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdLessThan(Long value) {
            addCriterion("DK_USER_ID <", value, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdLessThanOrEqualTo(Long value) {
            addCriterion("DK_USER_ID <=", value, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdIn(List<Long> values) {
            addCriterion("DK_USER_ID in", values, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdNotIn(List<Long> values) {
            addCriterion("DK_USER_ID not in", values, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdBetween(Long value1, Long value2) {
            addCriterion("DK_USER_ID between", value1, value2, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkUserIdNotBetween(Long value1, Long value2) {
            addCriterion("DK_USER_ID not between", value1, value2, "dkUserId");
            return (Criteria) this;
        }

        public Criteria andDkAdviceIsNull() {
            addCriterion("DK_ADVICE is null");
            return (Criteria) this;
        }

        public Criteria andDkAdviceIsNotNull() {
            addCriterion("DK_ADVICE is not null");
            return (Criteria) this;
        }

        public Criteria andDkAdviceEqualTo(String value) {
            addCriterion("DK_ADVICE =", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceNotEqualTo(String value) {
            addCriterion("DK_ADVICE <>", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceGreaterThan(String value) {
            addCriterion("DK_ADVICE >", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceGreaterThanOrEqualTo(String value) {
            addCriterion("DK_ADVICE >=", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceLessThan(String value) {
            addCriterion("DK_ADVICE <", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceLessThanOrEqualTo(String value) {
            addCriterion("DK_ADVICE <=", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceLike(String value) {
            addCriterion("DK_ADVICE like", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceNotLike(String value) {
            addCriterion("DK_ADVICE not like", value, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceIn(List<String> values) {
            addCriterion("DK_ADVICE in", values, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceNotIn(List<String> values) {
            addCriterion("DK_ADVICE not in", values, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceBetween(String value1, String value2) {
            addCriterion("DK_ADVICE between", value1, value2, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkAdviceNotBetween(String value1, String value2) {
            addCriterion("DK_ADVICE not between", value1, value2, "dkAdvice");
            return (Criteria) this;
        }

        public Criteria andDkDateIsNull() {
            addCriterion("DK_DATE is null");
            return (Criteria) this;
        }

        public Criteria andDkDateIsNotNull() {
            addCriterion("DK_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andDkDateEqualTo(Date value) {
            addCriterion("DK_DATE =", value, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateNotEqualTo(Date value) {
            addCriterion("DK_DATE <>", value, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateGreaterThan(Date value) {
            addCriterion("DK_DATE >", value, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateGreaterThanOrEqualTo(Date value) {
            addCriterion("DK_DATE >=", value, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateLessThan(Date value) {
            addCriterion("DK_DATE <", value, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateLessThanOrEqualTo(Date value) {
            addCriterion("DK_DATE <=", value, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateIn(List<Date> values) {
            addCriterion("DK_DATE in", values, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateNotIn(List<Date> values) {
            addCriterion("DK_DATE not in", values, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateBetween(Date value1, Date value2) {
            addCriterion("DK_DATE between", value1, value2, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkDateNotBetween(Date value1, Date value2) {
            addCriterion("DK_DATE not between", value1, value2, "dkDate");
            return (Criteria) this;
        }

        public Criteria andDkLvIsNull() {
            addCriterion("DK_LV is null");
            return (Criteria) this;
        }

        public Criteria andDkLvIsNotNull() {
            addCriterion("DK_LV is not null");
            return (Criteria) this;
        }

        public Criteria andDkLvEqualTo(String value) {
            addCriterion("DK_LV =", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvNotEqualTo(String value) {
            addCriterion("DK_LV <>", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvGreaterThan(String value) {
            addCriterion("DK_LV >", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvGreaterThanOrEqualTo(String value) {
            addCriterion("DK_LV >=", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvLessThan(String value) {
            addCriterion("DK_LV <", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvLessThanOrEqualTo(String value) {
            addCriterion("DK_LV <=", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvLike(String value) {
            addCriterion("DK_LV like", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvNotLike(String value) {
            addCriterion("DK_LV not like", value, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvIn(List<String> values) {
            addCriterion("DK_LV in", values, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvNotIn(List<String> values) {
            addCriterion("DK_LV not in", values, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvBetween(String value1, String value2) {
            addCriterion("DK_LV between", value1, value2, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkLvNotBetween(String value1, String value2) {
            addCriterion("DK_LV not between", value1, value2, "dkLv");
            return (Criteria) this;
        }

        public Criteria andDkScoreIsNull() {
            addCriterion("DK_SCORE is null");
            return (Criteria) this;
        }

        public Criteria andDkScoreIsNotNull() {
            addCriterion("DK_SCORE is not null");
            return (Criteria) this;
        }

        public Criteria andDkScoreEqualTo(BigDecimal value) {
            addCriterion("DK_SCORE =", value, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreNotEqualTo(BigDecimal value) {
            addCriterion("DK_SCORE <>", value, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreGreaterThan(BigDecimal value) {
            addCriterion("DK_SCORE >", value, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("DK_SCORE >=", value, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreLessThan(BigDecimal value) {
            addCriterion("DK_SCORE <", value, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("DK_SCORE <=", value, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreIn(List<BigDecimal> values) {
            addCriterion("DK_SCORE in", values, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreNotIn(List<BigDecimal> values) {
            addCriterion("DK_SCORE not in", values, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("DK_SCORE between", value1, value2, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDkScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("DK_SCORE not between", value1, value2, "dkScore");
            return (Criteria) this;
        }

        public Criteria andDwUserIdIsNull() {
            addCriterion("DW_USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andDwUserIdIsNotNull() {
            addCriterion("DW_USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andDwUserIdEqualTo(Long value) {
            addCriterion("DW_USER_ID =", value, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdNotEqualTo(Long value) {
            addCriterion("DW_USER_ID <>", value, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdGreaterThan(Long value) {
            addCriterion("DW_USER_ID >", value, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("DW_USER_ID >=", value, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdLessThan(Long value) {
            addCriterion("DW_USER_ID <", value, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdLessThanOrEqualTo(Long value) {
            addCriterion("DW_USER_ID <=", value, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdIn(List<Long> values) {
            addCriterion("DW_USER_ID in", values, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdNotIn(List<Long> values) {
            addCriterion("DW_USER_ID not in", values, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdBetween(Long value1, Long value2) {
            addCriterion("DW_USER_ID between", value1, value2, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andDwUserIdNotBetween(Long value1, Long value2) {
            addCriterion("DW_USER_ID not between", value1, value2, "dwUserId");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceIsNull() {
            addCriterion("CORP_ADVICE is null");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceIsNotNull() {
            addCriterion("CORP_ADVICE is not null");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceEqualTo(String value) {
            addCriterion("CORP_ADVICE =", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceNotEqualTo(String value) {
            addCriterion("CORP_ADVICE <>", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceGreaterThan(String value) {
            addCriterion("CORP_ADVICE >", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceGreaterThanOrEqualTo(String value) {
            addCriterion("CORP_ADVICE >=", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceLessThan(String value) {
            addCriterion("CORP_ADVICE <", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceLessThanOrEqualTo(String value) {
            addCriterion("CORP_ADVICE <=", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceLike(String value) {
            addCriterion("CORP_ADVICE like", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceNotLike(String value) {
            addCriterion("CORP_ADVICE not like", value, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceIn(List<String> values) {
            addCriterion("CORP_ADVICE in", values, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceNotIn(List<String> values) {
            addCriterion("CORP_ADVICE not in", values, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceBetween(String value1, String value2) {
            addCriterion("CORP_ADVICE between", value1, value2, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpAdviceNotBetween(String value1, String value2) {
            addCriterion("CORP_ADVICE not between", value1, value2, "corpAdvice");
            return (Criteria) this;
        }

        public Criteria andCorpDateIsNull() {
            addCriterion("CORP_DATE is null");
            return (Criteria) this;
        }

        public Criteria andCorpDateIsNotNull() {
            addCriterion("CORP_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andCorpDateEqualTo(Date value) {
            addCriterion("CORP_DATE =", value, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateNotEqualTo(Date value) {
            addCriterion("CORP_DATE <>", value, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateGreaterThan(Date value) {
            addCriterion("CORP_DATE >", value, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateGreaterThanOrEqualTo(Date value) {
            addCriterion("CORP_DATE >=", value, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateLessThan(Date value) {
            addCriterion("CORP_DATE <", value, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateLessThanOrEqualTo(Date value) {
            addCriterion("CORP_DATE <=", value, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateIn(List<Date> values) {
            addCriterion("CORP_DATE in", values, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateNotIn(List<Date> values) {
            addCriterion("CORP_DATE not in", values, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateBetween(Date value1, Date value2) {
            addCriterion("CORP_DATE between", value1, value2, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpDateNotBetween(Date value1, Date value2) {
            addCriterion("CORP_DATE not between", value1, value2, "corpDate");
            return (Criteria) this;
        }

        public Criteria andCorpLvIsNull() {
            addCriterion("CORP_LV is null");
            return (Criteria) this;
        }

        public Criteria andCorpLvIsNotNull() {
            addCriterion("CORP_LV is not null");
            return (Criteria) this;
        }

        public Criteria andCorpLvEqualTo(String value) {
            addCriterion("CORP_LV =", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvNotEqualTo(String value) {
            addCriterion("CORP_LV <>", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvGreaterThan(String value) {
            addCriterion("CORP_LV >", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvGreaterThanOrEqualTo(String value) {
            addCriterion("CORP_LV >=", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvLessThan(String value) {
            addCriterion("CORP_LV <", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvLessThanOrEqualTo(String value) {
            addCriterion("CORP_LV <=", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvLike(String value) {
            addCriterion("CORP_LV like", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvNotLike(String value) {
            addCriterion("CORP_LV not like", value, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvIn(List<String> values) {
            addCriterion("CORP_LV in", values, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvNotIn(List<String> values) {
            addCriterion("CORP_LV not in", values, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvBetween(String value1, String value2) {
            addCriterion("CORP_LV between", value1, value2, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpLvNotBetween(String value1, String value2) {
            addCriterion("CORP_LV not between", value1, value2, "corpLv");
            return (Criteria) this;
        }

        public Criteria andCorpScoreIsNull() {
            addCriterion("CORP_SCORE is null");
            return (Criteria) this;
        }

        public Criteria andCorpScoreIsNotNull() {
            addCriterion("CORP_SCORE is not null");
            return (Criteria) this;
        }

        public Criteria andCorpScoreEqualTo(BigDecimal value) {
            addCriterion("CORP_SCORE =", value, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreNotEqualTo(BigDecimal value) {
            addCriterion("CORP_SCORE <>", value, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreGreaterThan(BigDecimal value) {
            addCriterion("CORP_SCORE >", value, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("CORP_SCORE >=", value, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreLessThan(BigDecimal value) {
            addCriterion("CORP_SCORE <", value, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("CORP_SCORE <=", value, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreIn(List<BigDecimal> values) {
            addCriterion("CORP_SCORE in", values, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreNotIn(List<BigDecimal> values) {
            addCriterion("CORP_SCORE not in", values, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("CORP_SCORE between", value1, value2, "corpScore");
            return (Criteria) this;
        }

        public Criteria andCorpScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("CORP_SCORE not between", value1, value2, "corpScore");
            return (Criteria) this;
        }

        public Criteria andEvalLvIsNull() {
            addCriterion("EVAL_LV is null");
            return (Criteria) this;
        }

        public Criteria andEvalLvIsNotNull() {
            addCriterion("EVAL_LV is not null");
            return (Criteria) this;
        }

        public Criteria andEvalLvEqualTo(String value) {
            addCriterion("EVAL_LV =", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvNotEqualTo(String value) {
            addCriterion("EVAL_LV <>", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvGreaterThan(String value) {
            addCriterion("EVAL_LV >", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvGreaterThanOrEqualTo(String value) {
            addCriterion("EVAL_LV >=", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvLessThan(String value) {
            addCriterion("EVAL_LV <", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvLessThanOrEqualTo(String value) {
            addCriterion("EVAL_LV <=", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvLike(String value) {
            addCriterion("EVAL_LV like", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvNotLike(String value) {
            addCriterion("EVAL_LV not like", value, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvIn(List<String> values) {
            addCriterion("EVAL_LV in", values, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvNotIn(List<String> values) {
            addCriterion("EVAL_LV not in", values, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvBetween(String value1, String value2) {
            addCriterion("EVAL_LV between", value1, value2, "evalLv");
            return (Criteria) this;
        }

        public Criteria andEvalLvNotBetween(String value1, String value2) {
            addCriterion("EVAL_LV not between", value1, value2, "evalLv");
            return (Criteria) this;
        }

        public Criteria andScoreIsNull() {
            addCriterion("SCORE is null");
            return (Criteria) this;
        }

        public Criteria andScoreIsNotNull() {
            addCriterion("SCORE is not null");
            return (Criteria) this;
        }

        public Criteria andScoreEqualTo(BigDecimal value) {
            addCriterion("SCORE =", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotEqualTo(BigDecimal value) {
            addCriterion("SCORE <>", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThan(BigDecimal value) {
            addCriterion("SCORE >", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("SCORE >=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThan(BigDecimal value) {
            addCriterion("SCORE <", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("SCORE <=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreIn(List<BigDecimal> values) {
            addCriterion("SCORE in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotIn(List<BigDecimal> values) {
            addCriterion("SCORE not in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("SCORE between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("SCORE not between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andFlowIdIsNull() {
            addCriterion("FLOW_ID is null");
            return (Criteria) this;
        }

        public Criteria andFlowIdIsNotNull() {
            addCriterion("FLOW_ID is not null");
            return (Criteria) this;
        }

        public Criteria andFlowIdEqualTo(Long value) {
            addCriterion("FLOW_ID =", value, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdNotEqualTo(Long value) {
            addCriterion("FLOW_ID <>", value, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdGreaterThan(Long value) {
            addCriterion("FLOW_ID >", value, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdGreaterThanOrEqualTo(Long value) {
            addCriterion("FLOW_ID >=", value, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdLessThan(Long value) {
            addCriterion("FLOW_ID <", value, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdLessThanOrEqualTo(Long value) {
            addCriterion("FLOW_ID <=", value, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdIn(List<Long> values) {
            addCriterion("FLOW_ID in", values, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdNotIn(List<Long> values) {
            addCriterion("FLOW_ID not in", values, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdBetween(Long value1, Long value2) {
            addCriterion("FLOW_ID between", value1, value2, "flowId");
            return (Criteria) this;
        }

        public Criteria andFlowIdNotBetween(Long value1, Long value2) {
            addCriterion("FLOW_ID not between", value1, value2, "flowId");
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

        public Criteria andStatusEqualTo(Integer value) {
            addCriterion("STATUS =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Integer value) {
            addCriterion("STATUS <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Integer value) {
            addCriterion("STATUS >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("STATUS >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Integer value) {
            addCriterion("STATUS <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Integer value) {
            addCriterion("STATUS <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Integer> values) {
            addCriterion("STATUS in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Integer> values) {
            addCriterion("STATUS not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Integer value1, Integer value2) {
            addCriterion("STATUS between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("STATUS not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNull() {
            addCriterion("create_date is null");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNotNull() {
            addCriterion("create_date is not null");
            return (Criteria) this;
        }

        public Criteria andCreateDateEqualTo(Date value) {
            addCriterion("create_date =", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotEqualTo(Date value) {
            addCriterion("create_date <>", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThan(Date value) {
            addCriterion("create_date >", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThanOrEqualTo(Date value) {
            addCriterion("create_date >=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThan(Date value) {
            addCriterion("create_date <", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThanOrEqualTo(Date value) {
            addCriterion("create_date <=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateIn(List<Date> values) {
            addCriterion("create_date in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotIn(List<Date> values) {
            addCriterion("create_date not in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateBetween(Date value1, Date value2) {
            addCriterion("create_date between", value1, value2, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotBetween(Date value1, Date value2) {
            addCriterion("create_date not between", value1, value2, "createDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateIsNull() {
            addCriterion("update_date is null");
            return (Criteria) this;
        }

        public Criteria andUpdateDateIsNotNull() {
            addCriterion("update_date is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateDateEqualTo(Date value) {
            addCriterion("update_date =", value, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateNotEqualTo(Date value) {
            addCriterion("update_date <>", value, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateGreaterThan(Date value) {
            addCriterion("update_date >", value, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateGreaterThanOrEqualTo(Date value) {
            addCriterion("update_date >=", value, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateLessThan(Date value) {
            addCriterion("update_date <", value, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateLessThanOrEqualTo(Date value) {
            addCriterion("update_date <=", value, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateIn(List<Date> values) {
            addCriterion("update_date in", values, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateNotIn(List<Date> values) {
            addCriterion("update_date not in", values, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateBetween(Date value1, Date value2) {
            addCriterion("update_date between", value1, value2, "updateDate");
            return (Criteria) this;
        }

        public Criteria andUpdateDateNotBetween(Date value1, Date value2) {
            addCriterion("update_date not between", value1, value2, "updateDate");
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