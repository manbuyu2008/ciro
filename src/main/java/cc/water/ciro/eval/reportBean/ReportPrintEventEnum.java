package cc.water.ciro.eval.reportBean;

import java.io.Serializable;

public class ReportPrintEventEnum implements Serializable {

    private static final long serialVersionUID = 1L;
    private String eventDate;

    private String eventName;

    private String eventXs;

    private String eventJb;

    private String score;

    private String stdId;

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventXs() {
        return eventXs;
    }

    public void setEventXs(String eventXs) {
        this.eventXs = eventXs;
    }

    public String getEventJb() {
        return eventJb;
    }

    public void setEventJb(String eventJb) {
        this.eventJb = eventJb;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getStdId() {
        return stdId;
    }

    public void setStdId(String stdId) {
        this.stdId = stdId;
    }
}