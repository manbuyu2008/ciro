package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

public class EvalSelfEnum  extends BaseEntity {
    private Long id;

    private String parentId;

    private String eventDate;

    private String content;

    private String xs;

    private String jb;

    private Date createDate;

    private Date updateDate;

    private Long creater;

    private Long mender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId == null ? null : parentId.trim();
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate == null ? null : eventDate.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getXs() {
        return xs;
    }

    public void setXs(String xs) {
        this.xs = xs == null ? null : xs.trim();
    }

    public String getJb() {
        return jb;
    }

    public void setJb(String jb) {
        this.jb = jb == null ? null : jb.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Long getCreater() {
        return creater;
    }

    public void setCreater(Long creater) {
        this.creater = creater;
    }

    public Long getMender() {
        return mender;
    }

    public void setMender(Long mender) {
        this.mender = mender;
    }
}