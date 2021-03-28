package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.SexEnum;
import cc.water.ciro.eval.enums.EvalFlowStatusEnum;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.User;
import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class EvalBaseViewParam implements Serializable {

    private static final long serialVersionUID = 1L;

    private boolean listSelfView = false;
    private boolean listSelfEdit = false;
    private boolean listKsView = false;
    private boolean listKsEdit = false;
    private boolean listDkView = false;
    private boolean listDkEdit = false;
    private boolean listDwView = false;
    private boolean listDwEdit = false;
    private boolean canEdit = false;

    public boolean isListSelfView() {
        return listSelfView;
    }

    public void setListSelfView(boolean listSelfView) {
        this.listSelfView = listSelfView;
    }

    public boolean isListSelfEdit() {
        return listSelfEdit;
    }

    public void setListSelfEdit(boolean listSelfEdit) {
        this.listSelfEdit = listSelfEdit;
    }

    public boolean isListKsView() {
        return listKsView;
    }

    public void setListKsView(boolean listKsView) {
        this.listKsView = listKsView;
    }

    public boolean isListKsEdit() {
        return listKsEdit;
    }

    public void setListKsEdit(boolean listKsEdit) {
        this.listKsEdit = listKsEdit;
    }

    public boolean isListDkView() {
        return listDkView;
    }

    public void setListDkView(boolean listDkView) {
        this.listDkView = listDkView;
    }

    public boolean isListDkEdit() {
        return listDkEdit;
    }

    public void setListDkEdit(boolean listDkEdit) {
        this.listDkEdit = listDkEdit;
    }

    public boolean isListDwView() {
        return listDwView;
    }

    public void setListDwView(boolean listDwView) {
        this.listDwView = listDwView;
    }

    public boolean isListDwEdit() {
        return listDwEdit;
    }

    public void setListDwEdit(boolean listDwEdit) {
        this.listDwEdit = listDwEdit;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }
}