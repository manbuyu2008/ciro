package cc.water.ciro.system.service.impl;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.service.impl.BaseTreeComboService;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.enums.StateEnum;
import cc.water.ciro.system.domain.ActiveUser;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service("deptTreeComboService")
@Transactional
public class DeptTreeComboServiceImpl extends BaseTreeComboService {
	
	@Autowired
	private DeptService deptService;
	
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
		Dept bean = null;
		try {
			bean = deptService.getDeptByKey(NumberUtil.parseLong(id));
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (bean == null)
			return null;
		String sLevelCode = bean.getLevelCode();
		String[] ss = sLevelCode.split(CoreConsts.LEVELCODE_SEPARATOR);
		List<String> sList = new ArrayList<String>();
		for (int i = ss.length - 2; i >= 0; i--) {
			sList.add(ss[i]);
		}
		return sList;
	}
	
	@Override
	protected String findTextById(String id) throws Exception {
		Dept bean = deptService.getDeptByKey(NumberUtil.parseLong(id));
		if (bean != null)
			return bean.getName();
		else
			return "";
	}
	
	@Override
	public String getIdByContent() throws Exception {
		PageMap mapParam = context.getRequestParams();
		String txt = mapParam.getStr("txt");
		Dept bean = deptService.getDeptByContent(txt);
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
		String[] searchNames = null;
		String searchValue = null;
		String id = mapParam.getStr("id");
		String value = mapParam.getStr("value");
		String status = mapParam.getStr("status");
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Dept> tempList = new ArrayList<Dept>();
		ActiveUser loginInfo = context.getActiveUser();
		List<Dept> deptBeans = new ArrayList<Dept>();
		String adminDept = loginInfo.getUser().getAdminDeptId();
		if (UtilPub.isNotEmpty(adminDept)) {
			deptBeans = deptService
				.getDeptByKeys(Arrays.asList(adminDept.split(CoreConsts.MORE_STRING)));
		}
		if (loginInfo == null)
			throw new Exception("登录账号失效");
		if (UtilPub.isEmpty(id) || "0".equals(id)) {
			String strSearchNames = mapParam.getStrIgnoreNull("searchNames");
			if (UtilPub.isNotEmpty(strSearchNames)) {
				searchNames = strSearchNames.split(",");
			}
			searchValue = mapParam.getStrIgnoreNull("searchValue");
			tempList = deptService.findListByParentId("0",deptBeans, status);
		} else {
			tempList = deptService.findListByParentId(id, deptBeans, status);
		}
		Collections.sort(tempList, new Comparator<Dept>() {
			@Override
			public int compare(Dept bean1, Dept bean2) {
				return bean1.getCode().compareTo(bean2.getCode());
			}
		});
		for (Dept bean : tempList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", bean.getId());
			if (bean.getStatus().equals(StateEnum.DISABLE.getCode())) {
				map.put("text", "<font color='#c0c0c0'>"	+ bean.getCode() + " " + bean.getName()
								+ "[停用]</font>"); //机构下拉树应该要显示编码；
			} else {
				map.put("text", bean.getCode() + " " + bean.getName()); //机构下拉树应该要显示编码；
			}
			//            map.put("data", bean);
			//数据没有下级，不再拉下级
			if (!deptService.isLeaf(bean.getId()))
				map.put("state", "closed");
			list.add(map);
		}
		return list;
	}
	
}
