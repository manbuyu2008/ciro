package cc.water.ciro.eval.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EvalFlowExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    public EvalFlowExample() {
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

        public Criteria andDetailIsNull() {
            addCriterion("DETAIL is null");
            return (Criteria) this;
        }

        public Criteria andDetailIsNotNull() {
            addCriterion("DETAIL is not null");
            return (Criteria) this;
        }

        public Criteria andDetailEqualTo(String value) {
            addCriterion("DETAIL =", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailNotEqualTo(String value) {
            addCriterion("DETAIL <>", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailGreaterThan(String value) {
            addCriterion("DETAIL >", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailGreaterThanOrEqualTo(String value) {
            addCriterion("DETAIL >=", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailLessThan(String value) {
            addCriterion("DETAIL <", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailLessThanOrEqualTo(String value) {
            addCriterion("DETAIL <=", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailLike(String value) {
            addCriterion("DETAIL like", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailNotLike(String value) {
            addCriterion("DETAIL not like", value, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailIn(List<String> values) {
            addCriterion("DETAIL in", values, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailNotIn(List<String> values) {
            addCriterion("DETAIL not in", values, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailBetween(String value1, String value2) {
            addCriterion("DETAIL between", value1, value2, "detail");
            return (Criteria) this;
        }

        public Criteria andDetailNotBetween(String value1, String value2) {
            addCriterion("DETAIL not between", value1, value2, "detail");
            return (Criteria) this;
        }

        public Criteria andKsEvalIsNull() {
            addCriterion("KS_EVAL is null");
            return (Criteria) this;
        }

        public Criteria andKsEvalIsNotNull() {
            addCriterion("KS_EVAL is not null");
            return (Criteria) this;
        }

        public Criteria andKsEvalEqualTo(String value) {
            addCriterion("KS_EVAL =", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalNotEqualTo(String value) {
            addCriterion("KS_EVAL <>", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalGreaterThan(String value) {
            addCriterion("KS_EVAL >", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalGreaterThanOrEqualTo(String value) {
            addCriterion("KS_EVAL >=", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalLessThan(String value) {
            addCriterion("KS_EVAL <", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalLessThanOrEqualTo(String value) {
            addCriterion("KS_EVAL <=", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalLike(String value) {
            addCriterion("KS_EVAL like", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalNotLike(String value) {
            addCriterion("KS_EVAL not like", value, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalIn(List<String> values) {
            addCriterion("KS_EVAL in", values, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalNotIn(List<String> values) {
            addCriterion("KS_EVAL not in", values, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalBetween(String value1, String value2) {
            addCriterion("KS_EVAL between", value1, value2, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsEvalNotBetween(String value1, String value2) {
            addCriterion("KS_EVAL not between", value1, value2, "ksEval");
            return (Criteria) this;
        }

        public Criteria andKsRoleIsNull() {
            addCriterion("KS_ROLE is null");
            return (Criteria) this;
        }

        public Criteria andKsRoleIsNotNull() {
            addCriterion("KS_ROLE is not null");
            return (Criteria) this;
        }

        public Criteria andKsRoleEqualTo(String value) {
            addCriterion("KS_ROLE =", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleNotEqualTo(String value) {
            addCriterion("KS_ROLE <>", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleGreaterThan(String value) {
            addCriterion("KS_ROLE >", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleGreaterThanOrEqualTo(String value) {
            addCriterion("KS_ROLE >=", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleLessThan(String value) {
            addCriterion("KS_ROLE <", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleLessThanOrEqualTo(String value) {
            addCriterion("KS_ROLE <=", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleLike(String value) {
            addCriterion("KS_ROLE like", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleNotLike(String value) {
            addCriterion("KS_ROLE not like", value, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleIn(List<String> values) {
            addCriterion("KS_ROLE in", values, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleNotIn(List<String> values) {
            addCriterion("KS_ROLE not in", values, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleBetween(String value1, String value2) {
            addCriterion("KS_ROLE between", value1, value2, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsRoleNotBetween(String value1, String value2) {
            addCriterion("KS_ROLE not between", value1, value2, "ksRole");
            return (Criteria) this;
        }

        public Criteria andKsNoteIsNull() {
            addCriterion("KS_NOTE is null");
            return (Criteria) this;
        }

        public Criteria andKsNoteIsNotNull() {
            addCriterion("KS_NOTE is not null");
            return (Criteria) this;
        }

        public Criteria andKsNoteEqualTo(String value) {
            addCriterion("KS_NOTE =", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteNotEqualTo(String value) {
            addCriterion("KS_NOTE <>", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteGreaterThan(String value) {
            addCriterion("KS_NOTE >", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteGreaterThanOrEqualTo(String value) {
            addCriterion("KS_NOTE >=", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteLessThan(String value) {
            addCriterion("KS_NOTE <", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteLessThanOrEqualTo(String value) {
            addCriterion("KS_NOTE <=", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteLike(String value) {
            addCriterion("KS_NOTE like", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteNotLike(String value) {
            addCriterion("KS_NOTE not like", value, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteIn(List<String> values) {
            addCriterion("KS_NOTE in", values, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteNotIn(List<String> values) {
            addCriterion("KS_NOTE not in", values, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteBetween(String value1, String value2) {
            addCriterion("KS_NOTE between", value1, value2, "ksNote");
            return (Criteria) this;
        }

        public Criteria andKsNoteNotBetween(String value1, String value2) {
            addCriterion("KS_NOTE not between", value1, value2, "ksNote");
            return (Criteria) this;
        }

        public Criteria andDkEvalIsNull() {
            addCriterion("DK_EVAL is null");
            return (Criteria) this;
        }

        public Criteria andDkEvalIsNotNull() {
            addCriterion("DK_EVAL is not null");
            return (Criteria) this;
        }

        public Criteria andDkEvalEqualTo(String value) {
            addCriterion("DK_EVAL =", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalNotEqualTo(String value) {
            addCriterion("DK_EVAL <>", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalGreaterThan(String value) {
            addCriterion("DK_EVAL >", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalGreaterThanOrEqualTo(String value) {
            addCriterion("DK_EVAL >=", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalLessThan(String value) {
            addCriterion("DK_EVAL <", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalLessThanOrEqualTo(String value) {
            addCriterion("DK_EVAL <=", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalLike(String value) {
            addCriterion("DK_EVAL like", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalNotLike(String value) {
            addCriterion("DK_EVAL not like", value, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalIn(List<String> values) {
            addCriterion("DK_EVAL in", values, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalNotIn(List<String> values) {
            addCriterion("DK_EVAL not in", values, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalBetween(String value1, String value2) {
            addCriterion("DK_EVAL between", value1, value2, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkEvalNotBetween(String value1, String value2) {
            addCriterion("DK_EVAL not between", value1, value2, "dkEval");
            return (Criteria) this;
        }

        public Criteria andDkRoleIsNull() {
            addCriterion("DK_ROLE is null");
            return (Criteria) this;
        }

        public Criteria andDkRoleIsNotNull() {
            addCriterion("DK_ROLE is not null");
            return (Criteria) this;
        }

        public Criteria andDkRoleEqualTo(String value) {
            addCriterion("DK_ROLE =", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleNotEqualTo(String value) {
            addCriterion("DK_ROLE <>", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleGreaterThan(String value) {
            addCriterion("DK_ROLE >", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleGreaterThanOrEqualTo(String value) {
            addCriterion("DK_ROLE >=", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleLessThan(String value) {
            addCriterion("DK_ROLE <", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleLessThanOrEqualTo(String value) {
            addCriterion("DK_ROLE <=", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleLike(String value) {
            addCriterion("DK_ROLE like", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleNotLike(String value) {
            addCriterion("DK_ROLE not like", value, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleIn(List<String> values) {
            addCriterion("DK_ROLE in", values, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleNotIn(List<String> values) {
            addCriterion("DK_ROLE not in", values, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleBetween(String value1, String value2) {
            addCriterion("DK_ROLE between", value1, value2, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkRoleNotBetween(String value1, String value2) {
            addCriterion("DK_ROLE not between", value1, value2, "dkRole");
            return (Criteria) this;
        }

        public Criteria andDkNoteIsNull() {
            addCriterion("DK_NOTE is null");
            return (Criteria) this;
        }

        public Criteria andDkNoteIsNotNull() {
            addCriterion("DK_NOTE is not null");
            return (Criteria) this;
        }

        public Criteria andDkNoteEqualTo(String value) {
            addCriterion("DK_NOTE =", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteNotEqualTo(String value) {
            addCriterion("DK_NOTE <>", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteGreaterThan(String value) {
            addCriterion("DK_NOTE >", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteGreaterThanOrEqualTo(String value) {
            addCriterion("DK_NOTE >=", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteLessThan(String value) {
            addCriterion("DK_NOTE <", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteLessThanOrEqualTo(String value) {
            addCriterion("DK_NOTE <=", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteLike(String value) {
            addCriterion("DK_NOTE like", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteNotLike(String value) {
            addCriterion("DK_NOTE not like", value, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteIn(List<String> values) {
            addCriterion("DK_NOTE in", values, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteNotIn(List<String> values) {
            addCriterion("DK_NOTE not in", values, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteBetween(String value1, String value2) {
            addCriterion("DK_NOTE between", value1, value2, "dkNote");
            return (Criteria) this;
        }

        public Criteria andDkNoteNotBetween(String value1, String value2) {
            addCriterion("DK_NOTE not between", value1, value2, "dkNote");
            return (Criteria) this;
        }

        public Criteria andCorpEvalIsNull() {
            addCriterion("CORP_EVAL is null");
            return (Criteria) this;
        }

        public Criteria andCorpEvalIsNotNull() {
            addCriterion("CORP_EVAL is not null");
            return (Criteria) this;
        }

        public Criteria andCorpEvalEqualTo(String value) {
            addCriterion("CORP_EVAL =", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalNotEqualTo(String value) {
            addCriterion("CORP_EVAL <>", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalGreaterThan(String value) {
            addCriterion("CORP_EVAL >", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalGreaterThanOrEqualTo(String value) {
            addCriterion("CORP_EVAL >=", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalLessThan(String value) {
            addCriterion("CORP_EVAL <", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalLessThanOrEqualTo(String value) {
            addCriterion("CORP_EVAL <=", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalLike(String value) {
            addCriterion("CORP_EVAL like", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalNotLike(String value) {
            addCriterion("CORP_EVAL not like", value, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalIn(List<String> values) {
            addCriterion("CORP_EVAL in", values, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalNotIn(List<String> values) {
            addCriterion("CORP_EVAL not in", values, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalBetween(String value1, String value2) {
            addCriterion("CORP_EVAL between", value1, value2, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpEvalNotBetween(String value1, String value2) {
            addCriterion("CORP_EVAL not between", value1, value2, "corpEval");
            return (Criteria) this;
        }

        public Criteria andCorpRoleIsNull() {
            addCriterion("CORP_ROLE is null");
            return (Criteria) this;
        }

        public Criteria andCorpRoleIsNotNull() {
            addCriterion("CORP_ROLE is not null");
            return (Criteria) this;
        }

        public Criteria andCorpRoleEqualTo(String value) {
            addCriterion("CORP_ROLE =", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleNotEqualTo(String value) {
            addCriterion("CORP_ROLE <>", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleGreaterThan(String value) {
            addCriterion("CORP_ROLE >", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleGreaterThanOrEqualTo(String value) {
            addCriterion("CORP_ROLE >=", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleLessThan(String value) {
            addCriterion("CORP_ROLE <", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleLessThanOrEqualTo(String value) {
            addCriterion("CORP_ROLE <=", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleLike(String value) {
            addCriterion("CORP_ROLE like", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleNotLike(String value) {
            addCriterion("CORP_ROLE not like", value, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleIn(List<String> values) {
            addCriterion("CORP_ROLE in", values, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleNotIn(List<String> values) {
            addCriterion("CORP_ROLE not in", values, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleBetween(String value1, String value2) {
            addCriterion("CORP_ROLE between", value1, value2, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpRoleNotBetween(String value1, String value2) {
            addCriterion("CORP_ROLE not between", value1, value2, "corpRole");
            return (Criteria) this;
        }

        public Criteria andCorpIdsIsNull() {
            addCriterion("CORP_IDS is null");
            return (Criteria) this;
        }

        public Criteria andCorpIdsIsNotNull() {
            addCriterion("CORP_IDS is not null");
            return (Criteria) this;
        }

        public Criteria andCorpIdsEqualTo(String value) {
            addCriterion("CORP_IDS =", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsNotEqualTo(String value) {
            addCriterion("CORP_IDS <>", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsGreaterThan(String value) {
            addCriterion("CORP_IDS >", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsGreaterThanOrEqualTo(String value) {
            addCriterion("CORP_IDS >=", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsLessThan(String value) {
            addCriterion("CORP_IDS <", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsLessThanOrEqualTo(String value) {
            addCriterion("CORP_IDS <=", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsLike(String value) {
            addCriterion("CORP_IDS like", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsNotLike(String value) {
            addCriterion("CORP_IDS not like", value, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsIn(List<String> values) {
            addCriterion("CORP_IDS in", values, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsNotIn(List<String> values) {
            addCriterion("CORP_IDS not in", values, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsBetween(String value1, String value2) {
            addCriterion("CORP_IDS between", value1, value2, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpIdsNotBetween(String value1, String value2) {
            addCriterion("CORP_IDS not between", value1, value2, "corpIds");
            return (Criteria) this;
        }

        public Criteria andCorpNoteIsNull() {
            addCriterion("CORP_NOTE is null");
            return (Criteria) this;
        }

        public Criteria andCorpNoteIsNotNull() {
            addCriterion("CORP_NOTE is not null");
            return (Criteria) this;
        }

        public Criteria andCorpNoteEqualTo(String value) {
            addCriterion("CORP_NOTE =", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteNotEqualTo(String value) {
            addCriterion("CORP_NOTE <>", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteGreaterThan(String value) {
            addCriterion("CORP_NOTE >", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteGreaterThanOrEqualTo(String value) {
            addCriterion("CORP_NOTE >=", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteLessThan(String value) {
            addCriterion("CORP_NOTE <", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteLessThanOrEqualTo(String value) {
            addCriterion("CORP_NOTE <=", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteLike(String value) {
            addCriterion("CORP_NOTE like", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteNotLike(String value) {
            addCriterion("CORP_NOTE not like", value, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteIn(List<String> values) {
            addCriterion("CORP_NOTE in", values, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteNotIn(List<String> values) {
            addCriterion("CORP_NOTE not in", values, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteBetween(String value1, String value2) {
            addCriterion("CORP_NOTE between", value1, value2, "corpNote");
            return (Criteria) this;
        }

        public Criteria andCorpNoteNotBetween(String value1, String value2) {
            addCriterion("CORP_NOTE not between", value1, value2, "corpNote");
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