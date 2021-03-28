package cc.water.ciro.common.page;

import cc.water.ciro.common.logger.CocoLogger;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-12
 * Time: 下午3:23
 * To change this template use File | Settings | File Templates.
 */
public class PageReturn {
    /**
     * 是否执行成功
     */
    private boolean isSuccess;
    /**
     * 提示信息列表
     */
    private List<String> messages = null;
    /**
     * 执行结果参数
     */
    private Map<String, Object> map = new HashMap<String, Object>();

    /**
     * @param isSuccess
     * @param message
     */
    public PageReturn(boolean isSuccess, String message) {
        this.isSuccess = isSuccess;
        this.addMessage(message);
    }

    public PageReturn(int errCode, String message) {
        this.isSuccess = false;
        this.addMessage(message);
        this.setParameter("errCode", errCode);
    }

    public PageReturn(String errCode, String message) {
        this.isSuccess = false;
        this.addMessage(message);
        this.setParameter("errCode", errCode);
    }

    public PageReturn() {
        this(true, null);
    }

    /**
     * 设置参数
     * @param name
     * @param value
     * @pdOid 590f34f1-b661-4a64-8dbb-b1c9a4ec931e
     */
    public void setParameter(String name, Object value) {
        map.put(name, value);
    }

    /**
     * 获取参数
     * @param name
     * @pdOid a0df6724-734d-4c5d-b156-e96010436ee8
     */
    @SuppressWarnings({"unchecked"})
    public <T> T getParameter(String name) {
        return (T) map.get(name);
    }

    public boolean containsParameter(String name) {
        return map.containsKey(name);
    }

    /**
     * 是否执行成功
     */
    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    /**
     * 得到提示信息，字符串格式，有多个提示，则以回车符分隔
     */
    public String getMessageStr() {
        if (this.messages == null) return null;
        StringBuilder sb = new StringBuilder(32);
        for (String s : messages) {
            sb.append("\n").append(s);
        }
        return sb.substring(1);
    }

    /**
     * 得到结果参数Map
     */
    public Map<String, Object> getMap() {
        return map;
    }

    /**
     * 增加一条提示信息
     * @param msg
     */
    public void addMessage(String msg) {
        if (this.messages == null)
            this.messages = new ArrayList<String>();
        if (msg != null) this.messages.add(msg);
    }

    /**
     * 设置消息
     * @param msg
     */
    public void setMessage(String msg) {
        clearMessage();
        addMessage(msg);
    }

    /**
     * 清空所有提示信息
     */
    public void clearMessage() {
        if (this.messages != null) this.messages.clear();
    }

    /**
     * 得到提示信息列表
     * @return
     */
    public List<String> getMessages() {
        return messages;
    }

    /**
     * 执行失败，增加错误信息
     * @param errmsg
     */
    public void setError(String errmsg) {
        this.isSuccess = false;
        addMessage(errmsg);
    }

    public String toJson() {
        JSONObject jo = new JSONObject();
        try {
            jo.put("success", isSuccess());
            if (!isSuccess() && containsParameter("errCode")) {
                jo.put("errCode", getParameter("errCode"));
            }

            if (messages.size() == 1) {
                jo.put("msg", messages.get(0));
            } else {
                for (String s : messages) {
                    jo.append("msg", s);
                }
            }
        } catch (JSONException e) {
            CocoLogger.error("写Json出错", e);
        }
        return jo.toString();
    }

    public int getErrorCode() {
        if (!isSuccess() && containsParameter("errCode")) {
            return (Integer) getParameter("errCode");
        }
        return 0;
    }
}
