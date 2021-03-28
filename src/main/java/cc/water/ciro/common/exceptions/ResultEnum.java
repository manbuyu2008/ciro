package cc.water.ciro.common.exceptions;

/**
 * Created by Administrator on 2016/12/4.
 */
public class ResultEnum {
    private static final long serialVersionUID = -1369013612167105010L;
   private String code;
   private String message;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
