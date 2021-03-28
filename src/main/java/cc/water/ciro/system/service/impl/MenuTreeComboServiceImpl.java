package cc.water.ciro.system.service.impl;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.service.impl.BaseTreeComboService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.system.domain.ActiveUser;
import cc.water.ciro.system.domain.Permission;
import cc.water.ciro.system.enums.RolePermissonTypeEnum;
import cc.water.ciro.system.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service("menuTreeComboService")
@Transactional
public class MenuTreeComboServiceImpl extends BaseTreeComboService {

    @Autowired
    private PermissionService permissionService;

    @Override
    public void getTextsById() throws Exception {
        findTextsByIdMethod();
    }

    @Override
    public void findParentNodeIdArray() {
        List<String> idList = findArray();
        if (UtilPub.isNotEmpty(idList))
            context.getResponseParams().put("data", idList);
    }

    public List<String> findArray() {
        String id = context.getRequestParams().getStr("id");
        if (UtilPub.isEmpty(id) || CoreConsts.NULL_STRING.equals(id)) {
            return null;
        }
        Permission bean = null;
        try {
            bean = permissionService.getPermissionByKey(NumberUtil.parseInt(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (bean == null)
            return null;
        String sLevelCode = bean.getParentids();
        String[] ss = sLevelCode.split(CoreConsts.MENU_SEPARATOR);
        List<String> sList = new ArrayList<String>();
        for (int i = ss.length - 2; i >= 0; i--) {
            sList.add(ss[i]);
        }
        return sList;
    }

    @Override
    protected String findTextById(String id) throws Exception {
        Permission bean = permissionService.getPermissionByKey(NumberUtil.parseInt(id));
        if (bean != null)
            return bean.getName();
        else
            return "";
    }

    @Override
    public String getIdByContent() throws Exception {
        PageMap mapParam = context.getRequestParams();
        String txt = mapParam.getStr("txt");
        Permission bean = permissionService.getPermissionByName(txt);
        if (bean == null) {
            context.getResponseParams().put("data", "");
        } else {
            context.getResponseParams().put("data", bean.getId());
        }
        context.getResponseParams().remove("id");
        context.getResponseParams().remove("text");
        return null;
    }

    @Override
    public List<Map<String, Object>> findChildren() throws Exception {
        PageMap mapParam = context.getRequestParams();
        String id = mapParam.getStr("id");
        String roleId = mapParam.getStr("roleId");
        Boolean canUse = mapParam.getBoolean("canUse");
        List<Permission> chooseListInit = (List<Permission>)mapParam.get("chooseListInit");
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        List<Permission> tempList = new ArrayList<Permission>();
        List<Permission> chooseList = new ArrayList<Permission>();
        ActiveUser loginInfo = context.getActiveUser();
        if (loginInfo == null)
            throw new Exception("登录账号失效");
        if(StringUtil.isEmpty(id)) id = "1";
            tempList = permissionService.getPermissionByParentId(Long.valueOf(id));
        if(canUse&&chooseListInit==null){
            chooseList =  permissionService.getPermissionByRoleId(Long.valueOf(roleId), RolePermissonTypeEnum.check.getCode());
            mapParam.put("chooseListInit",chooseList);
        }else{
            chooseList.addAll(chooseListInit);
        }
        Collections.sort(tempList, new Comparator<Permission>() {
            @Override
            public int compare(Permission bean1, Permission bean2) {
                return bean1.getSortstring().compareTo(bean2.getSortstring());
            }
        });
        for (Permission bean : tempList) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("id", bean.getId());
            map.put("text", bean.getName()); //下拉树应该要显示编码；
            for (Permission chooseBean : chooseList) {
                if(chooseBean.getId().equals(bean.getId())){
                    map.put("checked", true);
                    break;
                }
            }
            //            map.put("data", bean);
            //数据没有下级，不再拉下级
            if ((!permissionService.isLeaf(bean.getId()))||(bean.getType().equals("menu")&&bean.getParentid()!=1))
                map.put("state", "closed");
            if(bean.getType().equals("menu")&&bean.getParentid()==1){
                map.put("state", "open");
            }
            if (!permissionService.isLeaf(bean.getId()))   map.put("end", "end");
            list.add(map);
        }
        return list;
    }

}
