package cc.water.ciro.common.service;

import cc.water.ciro.common.domain.ActionContext;

/**
 * Created by Administrator on 2016/11/27.
 */
public interface IServiceIntf {
    void setContext(ActionContext context);
    ActionContext getContext();
}
