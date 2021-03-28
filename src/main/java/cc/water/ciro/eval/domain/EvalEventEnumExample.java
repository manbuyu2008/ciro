package cc.water.ciro.eval.domain;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EvalEventEnumExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    public EvalEventEnumExample() {
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

        public Criteria andParentIdIsNull() {
            addCriterion("PARENT_ID is null");
            return (Criteria) this;
        }

        public Criteria andParentIdIsNotNull() {
            addCriterion("PARENT_ID is not null");
            return (Criteria) this;
        }

        public Criteria andParentIdEqualTo(String value) {
            addCriterion("PARENT_ID =", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdNotEqualTo(String value) {
            addCriterion("PARENT_ID <>", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdGreaterThan(String value) {
            addCriterion("PARENT_ID >", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdGreaterThanOrEqualTo(String value) {
            addCriterion("PARENT_ID >=", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdLessThan(String value) {
            addCriterion("PARENT_ID <", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdLessThanOrEqualTo(String value) {
            addCriterion("PARENT_ID <=", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdLike(String value) {
            addCriterion("PARENT_ID like", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdNotLike(String value) {
            addCriterion("PARENT_ID not like", value, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdIn(List<String> values) {
            addCriterion("PARENT_ID in", values, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdNotIn(List<String> values) {
            addCriterion("PARENT_ID not in", values, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdBetween(String value1, String value2) {
            addCriterion("PARENT_ID between", value1, value2, "parentId");
            return (Criteria) this;
        }

        public Criteria andParentIdNotBetween(String value1, String value2) {
            addCriterion("PARENT_ID not between", value1, value2, "parentId");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("TYPE is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(String value) {
            addCriterion("TYPE =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(String value) {
            addCriterion("TYPE <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(String value) {
            addCriterion("TYPE >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(String value) {
            addCriterion("TYPE >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(String value) {
            addCriterion("TYPE <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(String value) {
            addCriterion("TYPE <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLike(String value) {
            addCriterion("TYPE like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotLike(String value) {
            addCriterion("TYPE not like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<String> values) {
            addCriterion("TYPE in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<String> values) {
            addCriterion("TYPE not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(String value1, String value2) {
            addCriterion("TYPE between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(String value1, String value2) {
            addCriterion("TYPE not between", value1, value2, "type");
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

        public Criteria andEventXsIsNull() {
            addCriterion("EVENT_XS is null");
            return (Criteria) this;
        }

        public Criteria andEventXsIsNotNull() {
            addCriterion("EVENT_XS is not null");
            return (Criteria) this;
        }

        public Criteria andEventXsEqualTo(String value) {
            addCriterion("EVENT_XS =", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsNotEqualTo(String value) {
            addCriterion("EVENT_XS <>", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsGreaterThan(String value) {
            addCriterion("EVENT_XS >", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsGreaterThanOrEqualTo(String value) {
            addCriterion("EVENT_XS >=", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsLessThan(String value) {
            addCriterion("EVENT_XS <", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsLessThanOrEqualTo(String value) {
            addCriterion("EVENT_XS <=", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsLike(String value) {
            addCriterion("EVENT_XS like", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsNotLike(String value) {
            addCriterion("EVENT_XS not like", value, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsIn(List<String> values) {
            addCriterion("EVENT_XS in", values, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsNotIn(List<String> values) {
            addCriterion("EVENT_XS not in", values, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsBetween(String value1, String value2) {
            addCriterion("EVENT_XS between", value1, value2, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventXsNotBetween(String value1, String value2) {
            addCriterion("EVENT_XS not between", value1, value2, "eventXs");
            return (Criteria) this;
        }

        public Criteria andEventJbIsNull() {
            addCriterion("EVENT_JB is null");
            return (Criteria) this;
        }

        public Criteria andEventJbIsNotNull() {
            addCriterion("EVENT_JB is not null");
            return (Criteria) this;
        }

        public Criteria andEventJbEqualTo(String value) {
            addCriterion("EVENT_JB =", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbNotEqualTo(String value) {
            addCriterion("EVENT_JB <>", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbGreaterThan(String value) {
            addCriterion("EVENT_JB >", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbGreaterThanOrEqualTo(String value) {
            addCriterion("EVENT_JB >=", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbLessThan(String value) {
            addCriterion("EVENT_JB <", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbLessThanOrEqualTo(String value) {
            addCriterion("EVENT_JB <=", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbLike(String value) {
            addCriterion("EVENT_JB like", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbNotLike(String value) {
            addCriterion("EVENT_JB not like", value, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbIn(List<String> values) {
            addCriterion("EVENT_JB in", values, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbNotIn(List<String> values) {
            addCriterion("EVENT_JB not in", values, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbBetween(String value1, String value2) {
            addCriterion("EVENT_JB between", value1, value2, "eventJb");
            return (Criteria) this;
        }

        public Criteria andEventJbNotBetween(String value1, String value2) {
            addCriterion("EVENT_JB not between", value1, value2, "eventJb");
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

        public Criteria andEventIdIsNull() {
            addCriterion("EVENT_ID is null");
            return (Criteria) this;
        }

        public Criteria andEventIdIsNotNull() {
            addCriterion("EVENT_ID is not null");
            return (Criteria) this;
        }

        public Criteria andEventIdEqualTo(Long value) {
            addCriterion("EVENT_ID =", value, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdNotEqualTo(Long value) {
            addCriterion("EVENT_ID <>", value, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdGreaterThan(Long value) {
            addCriterion("EVENT_ID >", value, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdGreaterThanOrEqualTo(Long value) {
            addCriterion("EVENT_ID >=", value, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdLessThan(Long value) {
            addCriterion("EVENT_ID <", value, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdLessThanOrEqualTo(Long value) {
            addCriterion("EVENT_ID <=", value, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdIn(List<Long> values) {
            addCriterion("EVENT_ID in", values, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdNotIn(List<Long> values) {
            addCriterion("EVENT_ID not in", values, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdBetween(Long value1, Long value2) {
            addCriterion("EVENT_ID between", value1, value2, "eventId");
            return (Criteria) this;
        }

        public Criteria andEventIdNotBetween(Long value1, Long value2) {
            addCriterion("EVENT_ID not between", value1, value2, "eventId");
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