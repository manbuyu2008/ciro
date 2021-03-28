package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import com.alibaba.fastjson.annotation.JSONField;

public class EvalUserType extends BaseEntity {
    private Long id;

    private Long flowId;

    private String typeCode;

    private String typeName;
    @JSONField(serialize = false)
    private EvalFlow flowBean;

    private String flowName;

    private String remark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFlowId() {
        return flowId;
    }

    public void setFlowId(Long flowId) {
        this.flowId = flowId;
    }

    public String getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(String typeCode) {
        this.typeCode = typeCode == null ? null : typeCode.trim();
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName == null ? null : typeName.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public EvalFlow getFlowBean() {
        return flowBean;
    }

    public void setFlowBean(EvalFlow flowBean) {
        this.flowBean = flowBean;
    }

    public String getFlowName() {
        if (StringUtil.isEmpty(flowName) && flowBean != null) return flowBean.getName();
        return flowName;
    }
}