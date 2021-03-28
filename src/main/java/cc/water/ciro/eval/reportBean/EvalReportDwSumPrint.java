package cc.water.ciro.eval.reportBean;

import java.io.Serializable;

public class EvalReportDwSumPrint implements Serializable {

    private static final long serialVersionUID = 1L;

    private String itemTitle;

    private String itemDetail;

    public String getItemTitle() {
        return itemTitle;
    }

    public void setItemTitle(String itemTitle) {
        this.itemTitle = itemTitle;
    }

    public String getItemDetail() {
        return itemDetail;
    }

    public void setItemDetail(String itemDetail) {
        this.itemDetail = itemDetail;
    }
}