package cc.water.ciro.eval.reportBean;

import cc.water.ciro.eval.domain.EvalLevel;

import java.io.Serializable;
import java.util.List;

public class EvalReportUserBaseInfo implements Serializable {

    private static final long serialVersionUID = 1L;


    private EvalLevel evalLevel;

    private List<EvalReportUserInfo> userInfoList;

    public EvalLevel getEvalLevel() {
        return evalLevel;
    }

    public void setEvalLevel(EvalLevel evalLevel) {
        this.evalLevel = evalLevel;
    }

    public List<EvalReportUserInfo> getUserInfoList() {
        return userInfoList;
    }

    public void setUserInfoList(List<EvalReportUserInfo> userInfoList) {
        this.userInfoList = userInfoList;
    }
}