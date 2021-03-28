package cc.water.ciro.eval.reportBean;

import java.io.Serializable;

public class ReportPrintSelfEnum implements Serializable {

    private static final long serialVersionUID = 1L;

    private String eventDate;

    private String content;

    private String xs;

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getXs() {
        return xs;
    }

    public void setXs(String xs) {
        this.xs = xs;
    }
}