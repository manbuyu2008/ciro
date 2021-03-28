package cc.water.ciro.eval.domain;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EvalEventExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    public EvalEventExample() {
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

        public Criteria andUserIdIsNull() {
            addCriterion("USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(String value) {
            addCriterion("USER_ID =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(String value) {
            addCriterion("USER_ID <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(String value) {
            addCriterion("USER_ID >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("USER_ID >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(String value) {
            addCriterion("USER_ID <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(String value) {
            addCriterion("USER_ID <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLike(String value) {
            addCriterion("USER_ID like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotLike(String value) {
            addCriterion("USER_ID not like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<String> values) {
            addCriterion("USER_ID in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<String> values) {
            addCriterion("USER_ID not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(String value1, String value2) {
            addCriterion("USER_ID between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(String value1, String value2) {
            addCriterion("USER_ID not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andKsIdIsNull() {
            addCriterion("KS_ID is null");
            return (Criteria) this;
        }

        public Criteria andKsIdIsNotNull() {
            addCriterion("KS_ID is not null");
            return (Criteria) this;
        }

        public Criteria andKsIdEqualTo(String value) {
            addCriterion("KS_ID =", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdNotEqualTo(String value) {
            addCriterion("KS_ID <>", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdGreaterThan(String value) {
            addCriterion("KS_ID >", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdGreaterThanOrEqualTo(String value) {
            addCriterion("KS_ID >=", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdLessThan(String value) {
            addCriterion("KS_ID <", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdLessThanOrEqualTo(String value) {
            addCriterion("KS_ID <=", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdLike(String value) {
            addCriterion("KS_ID like", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdNotLike(String value) {
            addCriterion("KS_ID not like", value, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdIn(List<String> values) {
            addCriterion("KS_ID in", values, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdNotIn(List<String> values) {
            addCriterion("KS_ID not in", values, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdBetween(String value1, String value2) {
            addCriterion("KS_ID between", value1, value2, "ksId");
            return (Criteria) this;
        }

        public Criteria andKsIdNotBetween(String value1, String value2) {
            addCriterion("KS_ID not between", value1, value2, "ksId");
            return (Criteria) this;
        }

        public Criteria andTypeIdIsNull() {
            addCriterion("TYPE_ID is null");
            return (Criteria) this;
        }

        public Criteria andTypeIdIsNotNull() {
            addCriterion("TYPE_ID is not null");
            return (Criteria) this;
        }

        public Criteria andTypeIdEqualTo(String value) {
            addCriterion("TYPE_ID =", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdNotEqualTo(String value) {
            addCriterion("TYPE_ID <>", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdGreaterThan(String value) {
            addCriterion("TYPE_ID >", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdGreaterThanOrEqualTo(String value) {
            addCriterion("TYPE_ID >=", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdLessThan(String value) {
            addCriterion("TYPE_ID <", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdLessThanOrEqualTo(String value) {
            addCriterion("TYPE_ID <=", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdLike(String value) {
            addCriterion("TYPE_ID like", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdNotLike(String value) {
            addCriterion("TYPE_ID not like", value, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdIn(List<String> values) {
            addCriterion("TYPE_ID in", values, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdNotIn(List<String> values) {
            addCriterion("TYPE_ID not in", values, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdBetween(String value1, String value2) {
            addCriterion("TYPE_ID between", value1, value2, "typeId");
            return (Criteria) this;
        }

        public Criteria andTypeIdNotBetween(String value1, String value2) {
            addCriterion("TYPE_ID not between", value1, value2, "typeId");
            return (Criteria) this;
        }

        public Criteria andStdIdIsNull() {
            addCriterion("STD_ID is null");
            return (Criteria) this;
        }

        public Criteria andStdIdIsNotNull() {
            addCriterion("STD_ID is not null");
            return (Criteria) this;
        }

        public Criteria andStdIdEqualTo(String value) {
            addCriterion("STD_ID =", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdNotEqualTo(String value) {
            addCriterion("STD_ID <>", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdGreaterThan(String value) {
            addCriterion("STD_ID >", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdGreaterThanOrEqualTo(String value) {
            addCriterion("STD_ID >=", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdLessThan(String value) {
            addCriterion("STD_ID <", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdLessThanOrEqualTo(String value) {
            addCriterion("STD_ID <=", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdLike(String value) {
            addCriterion("STD_ID like", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdNotLike(String value) {
            addCriterion("STD_ID not like", value, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdIn(List<String> values) {
            addCriterion("STD_ID in", values, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdNotIn(List<String> values) {
            addCriterion("STD_ID not in", values, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdBetween(String value1, String value2) {
            addCriterion("STD_ID between", value1, value2, "stdId");
            return (Criteria) this;
        }

        public Criteria andStdIdNotBetween(String value1, String value2) {
            addCriterion("STD_ID not between", value1, value2, "stdId");
            return (Criteria) this;
        }

        public Criteria andEventNameIsNull() {
            addCriterion("EVENT_NAME is null");
            return (Criteria) this;
        }

        public Criteria andEventNameIsNotNull() {
            addCriterion("EVENT_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andEventNameEqualTo(String value) {
            addCriterion("EVENT_NAME =", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameNotEqualTo(String value) {
            addCriterion("EVENT_NAME <>", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameGreaterThan(String value) {
            addCriterion("EVENT_NAME >", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameGreaterThanOrEqualTo(String value) {
            addCriterion("EVENT_NAME >=", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameLessThan(String value) {
            addCriterion("EVENT_NAME <", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameLessThanOrEqualTo(String value) {
            addCriterion("EVENT_NAME <=", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameLike(String value) {
            addCriterion("EVENT_NAME like", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameNotLike(String value) {
            addCriterion("EVENT_NAME not like", value, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameIn(List<String> values) {
            addCriterion("EVENT_NAME in", values, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameNotIn(List<String> values) {
            addCriterion("EVENT_NAME not in", values, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameBetween(String value1, String value2) {
            addCriterion("EVENT_NAME between", value1, value2, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventNameNotBetween(String value1, String value2) {
            addCriterion("EVENT_NAME not between", value1, value2, "eventName");
            return (Criteria) this;
        }

        public Criteria andEventDateIsNull() {
            addCriterion("EVENT_DATE is null");
            return (Criteria) this;
        }

        public Criteria andEventDateIsNotNull() {
            addCriterion("EVENT_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andEventDateEqualTo(Date value) {
            addCriterion("EVENT_DATE =", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateNotEqualTo(Date value) {
            addCriterion("EVENT_DATE <>", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateGreaterThan(Date value) {
            addCriterion("EVENT_DATE >", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateGreaterThanOrEqualTo(Date value) {
            addCriterion("EVENT_DATE >=", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateLessThan(Date value) {
            addCriterion("EVENT_DATE <", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateLessThanOrEqualTo(Date value) {
            addCriterion("EVENT_DATE <=", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateIn(List<Date> values) {
            addCriterion("EVENT_DATE in", values, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateNotIn(List<Date> values) {
            addCriterion("EVENT_DATE not in", values, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateBetween(Date value1, Date value2) {
            addCriterion("EVENT_DATE between", value1, value2, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateNotBetween(Date value1, Date value2) {
            addCriterion("EVENT_DATE not between", value1, value2, "eventDate");
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

        public Criteria andIsShIsNull() {
            addCriterion("IS_SH is null");
            return (Criteria) this;
        }

        public Criteria andIsShIsNotNull() {
            addCriterion("IS_SH is not null");
            return (Criteria) this;
        }

        public Criteria andIsShEqualTo(String value) {
            addCriterion("IS_SH =", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShNotEqualTo(String value) {
            addCriterion("IS_SH <>", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShGreaterThan(String value) {
            addCriterion("IS_SH >", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShGreaterThanOrEqualTo(String value) {
            addCriterion("IS_SH >=", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShLessThan(String value) {
            addCriterion("IS_SH <", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShLessThanOrEqualTo(String value) {
            addCriterion("IS_SH <=", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShLike(String value) {
            addCriterion("IS_SH like", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShNotLike(String value) {
            addCriterion("IS_SH not like", value, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShIn(List<String> values) {
            addCriterion("IS_SH in", values, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShNotIn(List<String> values) {
            addCriterion("IS_SH not in", values, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShBetween(String value1, String value2) {
            addCriterion("IS_SH between", value1, value2, "isSh");
            return (Criteria) this;
        }

        public Criteria andIsShNotBetween(String value1, String value2) {
            addCriterion("IS_SH not between", value1, value2, "isSh");
            return (Criteria) this;
        }

        public Criteria andShResultIsNull() {
            addCriterion("SH_RESULT is null");
            return (Criteria) this;
        }

        public Criteria andShResultIsNotNull() {
            addCriterion("SH_RESULT is not null");
            return (Criteria) this;
        }

        public Criteria andShResultEqualTo(String value) {
            addCriterion("SH_RESULT =", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultNotEqualTo(String value) {
            addCriterion("SH_RESULT <>", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultGreaterThan(String value) {
            addCriterion("SH_RESULT >", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultGreaterThanOrEqualTo(String value) {
            addCriterion("SH_RESULT >=", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultLessThan(String value) {
            addCriterion("SH_RESULT <", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultLessThanOrEqualTo(String value) {
            addCriterion("SH_RESULT <=", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultLike(String value) {
            addCriterion("SH_RESULT like", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultNotLike(String value) {
            addCriterion("SH_RESULT not like", value, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultIn(List<String> values) {
            addCriterion("SH_RESULT in", values, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultNotIn(List<String> values) {
            addCriterion("SH_RESULT not in", values, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultBetween(String value1, String value2) {
            addCriterion("SH_RESULT between", value1, value2, "shResult");
            return (Criteria) this;
        }

        public Criteria andShResultNotBetween(String value1, String value2) {
            addCriterion("SH_RESULT not between", value1, value2, "shResult");
            return (Criteria) this;
        }

        public Criteria andQrScoreIsNull() {
            addCriterion("QR_SCORE is null");
            return (Criteria) this;
        }

        public Criteria andQrScoreIsNotNull() {
            addCriterion("QR_SCORE is not null");
            return (Criteria) this;
        }

        public Criteria andQrScoreEqualTo(BigDecimal value) {
            addCriterion("QR_SCORE =", value, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreNotEqualTo(BigDecimal value) {
            addCriterion("QR_SCORE <>", value, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreGreaterThan(BigDecimal value) {
            addCriterion("QR_SCORE >", value, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("QR_SCORE >=", value, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreLessThan(BigDecimal value) {
            addCriterion("QR_SCORE <", value, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("QR_SCORE <=", value, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreIn(List<BigDecimal> values) {
            addCriterion("QR_SCORE in", values, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreNotIn(List<BigDecimal> values) {
            addCriterion("QR_SCORE not in", values, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("QR_SCORE between", value1, value2, "qrScore");
            return (Criteria) this;
        }

        public Criteria andQrScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("QR_SCORE not between", value1, value2, "qrScore");
            return (Criteria) this;
        }

        public Criteria andShRemarkIsNull() {
            addCriterion("SH_REMARK is null");
            return (Criteria) this;
        }

        public Criteria andShRemarkIsNotNull() {
            addCriterion("SH_REMARK is not null");
            return (Criteria) this;
        }

        public Criteria andShRemarkEqualTo(String value) {
            addCriterion("SH_REMARK =", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkNotEqualTo(String value) {
            addCriterion("SH_REMARK <>", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkGreaterThan(String value) {
            addCriterion("SH_REMARK >", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("SH_REMARK >=", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkLessThan(String value) {
            addCriterion("SH_REMARK <", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkLessThanOrEqualTo(String value) {
            addCriterion("SH_REMARK <=", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkLike(String value) {
            addCriterion("SH_REMARK like", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkNotLike(String value) {
            addCriterion("SH_REMARK not like", value, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkIn(List<String> values) {
            addCriterion("SH_REMARK in", values, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkNotIn(List<String> values) {
            addCriterion("SH_REMARK not in", values, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkBetween(String value1, String value2) {
            addCriterion("SH_REMARK between", value1, value2, "shRemark");
            return (Criteria) this;
        }

        public Criteria andShRemarkNotBetween(String value1, String value2) {
            addCriterion("SH_REMARK not between", value1, value2, "shRemark");
            return (Criteria) this;
        }

        public Criteria andFileUrlIsNull() {
            addCriterion("FILE_URL is null");
            return (Criteria) this;
        }

        public Criteria andFileUrlIsNotNull() {
            addCriterion("FILE_URL is not null");
            return (Criteria) this;
        }

        public Criteria andFileUrlEqualTo(String value) {
            addCriterion("FILE_URL =", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlNotEqualTo(String value) {
            addCriterion("FILE_URL <>", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlGreaterThan(String value) {
            addCriterion("FILE_URL >", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlGreaterThanOrEqualTo(String value) {
            addCriterion("FILE_URL >=", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlLessThan(String value) {
            addCriterion("FILE_URL <", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlLessThanOrEqualTo(String value) {
            addCriterion("FILE_URL <=", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlLike(String value) {
            addCriterion("FILE_URL like", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlNotLike(String value) {
            addCriterion("FILE_URL not like", value, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlIn(List<String> values) {
            addCriterion("FILE_URL in", values, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlNotIn(List<String> values) {
            addCriterion("FILE_URL not in", values, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlBetween(String value1, String value2) {
            addCriterion("FILE_URL between", value1, value2, "fileUrl");
            return (Criteria) this;
        }

        public Criteria andFileUrlNotBetween(String value1, String value2) {
            addCriterion("FILE_URL not between", value1, value2, "fileUrl");
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