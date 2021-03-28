package cc.water.ciro.eval.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EvalSelfEnumExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    public EvalSelfEnumExample() {
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

        public Criteria andEventDateIsNull() {
            addCriterion("EVENT_DATE is null");
            return (Criteria) this;
        }

        public Criteria andEventDateIsNotNull() {
            addCriterion("EVENT_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andEventDateEqualTo(String value) {
            addCriterion("EVENT_DATE =", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateNotEqualTo(String value) {
            addCriterion("EVENT_DATE <>", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateGreaterThan(String value) {
            addCriterion("EVENT_DATE >", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateGreaterThanOrEqualTo(String value) {
            addCriterion("EVENT_DATE >=", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateLessThan(String value) {
            addCriterion("EVENT_DATE <", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateLessThanOrEqualTo(String value) {
            addCriterion("EVENT_DATE <=", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateLike(String value) {
            addCriterion("EVENT_DATE like", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateNotLike(String value) {
            addCriterion("EVENT_DATE not like", value, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateIn(List<String> values) {
            addCriterion("EVENT_DATE in", values, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateNotIn(List<String> values) {
            addCriterion("EVENT_DATE not in", values, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateBetween(String value1, String value2) {
            addCriterion("EVENT_DATE between", value1, value2, "eventDate");
            return (Criteria) this;
        }

        public Criteria andEventDateNotBetween(String value1, String value2) {
            addCriterion("EVENT_DATE not between", value1, value2, "eventDate");
            return (Criteria) this;
        }

        public Criteria andContentIsNull() {
            addCriterion("CONTENT is null");
            return (Criteria) this;
        }

        public Criteria andContentIsNotNull() {
            addCriterion("CONTENT is not null");
            return (Criteria) this;
        }

        public Criteria andContentEqualTo(String value) {
            addCriterion("CONTENT =", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotEqualTo(String value) {
            addCriterion("CONTENT <>", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentGreaterThan(String value) {
            addCriterion("CONTENT >", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentGreaterThanOrEqualTo(String value) {
            addCriterion("CONTENT >=", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentLessThan(String value) {
            addCriterion("CONTENT <", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentLessThanOrEqualTo(String value) {
            addCriterion("CONTENT <=", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentLike(String value) {
            addCriterion("CONTENT like", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotLike(String value) {
            addCriterion("CONTENT not like", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentIn(List<String> values) {
            addCriterion("CONTENT in", values, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotIn(List<String> values) {
            addCriterion("CONTENT not in", values, "content");
            return (Criteria) this;
        }

        public Criteria andContentBetween(String value1, String value2) {
            addCriterion("CONTENT between", value1, value2, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotBetween(String value1, String value2) {
            addCriterion("CONTENT not between", value1, value2, "content");
            return (Criteria) this;
        }

        public Criteria andXsIsNull() {
            addCriterion("XS is null");
            return (Criteria) this;
        }

        public Criteria andXsIsNotNull() {
            addCriterion("XS is not null");
            return (Criteria) this;
        }

        public Criteria andXsEqualTo(String value) {
            addCriterion("XS =", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsNotEqualTo(String value) {
            addCriterion("XS <>", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsGreaterThan(String value) {
            addCriterion("XS >", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsGreaterThanOrEqualTo(String value) {
            addCriterion("XS >=", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsLessThan(String value) {
            addCriterion("XS <", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsLessThanOrEqualTo(String value) {
            addCriterion("XS <=", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsLike(String value) {
            addCriterion("XS like", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsNotLike(String value) {
            addCriterion("XS not like", value, "xs");
            return (Criteria) this;
        }

        public Criteria andXsIn(List<String> values) {
            addCriterion("XS in", values, "xs");
            return (Criteria) this;
        }

        public Criteria andXsNotIn(List<String> values) {
            addCriterion("XS not in", values, "xs");
            return (Criteria) this;
        }

        public Criteria andXsBetween(String value1, String value2) {
            addCriterion("XS between", value1, value2, "xs");
            return (Criteria) this;
        }

        public Criteria andXsNotBetween(String value1, String value2) {
            addCriterion("XS not between", value1, value2, "xs");
            return (Criteria) this;
        }

        public Criteria andJbIsNull() {
            addCriterion("JB is null");
            return (Criteria) this;
        }

        public Criteria andJbIsNotNull() {
            addCriterion("JB is not null");
            return (Criteria) this;
        }

        public Criteria andJbEqualTo(String value) {
            addCriterion("JB =", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbNotEqualTo(String value) {
            addCriterion("JB <>", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbGreaterThan(String value) {
            addCriterion("JB >", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbGreaterThanOrEqualTo(String value) {
            addCriterion("JB >=", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbLessThan(String value) {
            addCriterion("JB <", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbLessThanOrEqualTo(String value) {
            addCriterion("JB <=", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbLike(String value) {
            addCriterion("JB like", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbNotLike(String value) {
            addCriterion("JB not like", value, "jb");
            return (Criteria) this;
        }

        public Criteria andJbIn(List<String> values) {
            addCriterion("JB in", values, "jb");
            return (Criteria) this;
        }

        public Criteria andJbNotIn(List<String> values) {
            addCriterion("JB not in", values, "jb");
            return (Criteria) this;
        }

        public Criteria andJbBetween(String value1, String value2) {
            addCriterion("JB between", value1, value2, "jb");
            return (Criteria) this;
        }

        public Criteria andJbNotBetween(String value1, String value2) {
            addCriterion("JB not between", value1, value2, "jb");
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