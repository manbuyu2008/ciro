package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.eval.domain.EvalEvent;
import cc.water.ciro.eval.domain.EvalEventExample;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.mapper.EvalEventDao;
import cc.water.ciro.eval.query.EvalEventQuery;
import cc.water.ciro.eval.query.EvalStdQuery;
import cc.water.ciro.eval.service.EvalEventService;
import cc.water.ciro.eval.service.EvalStdService;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.UserService;
import com.alibaba.fastjson.JSONObject;
import groovy.util.Eval;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/eval/evalStd/")
public class EvalStdController extends ListController<EvalStd> {
	
	@Autowired
	private UserService userService;
	@Autowired
	private EvalEventDao evalEventDao;
	@Autowired
	private EvalStdService evalStdService;

	final static String path = "eval/evalStd/";
	
	@RequestMapping("list.vm")
	@RequiresPermissions(value = {"evalStd:query0", "evalStd:query1", "evalStd:query2"}, logical = Logical.OR)
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		String status = request.getParameter("status");
		if(StringUtil.isEmpty(status)){
			status = context.getRequestParams().getStrIgnoreNull("status");
		}
		model.addAttribute("status",status);
		return path + "listEvalStd";
	}



	@RequestMapping("data.vm")
	@RequiresPermissions(value = {"evalStd:query0", "evalStd:query1", "evalStd:query2"}, logical = Logical.OR)
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<EvalStd> list, int total) throws Exception {
		EvalStdQuery evalStdQuery = new EvalStdQuery();
		int page = 0;
		int rows = 0;
		if (context.getRequestParams().containsKey("page")) {
			page = Integer.parseInt(context.getRequestParams().getStrIgnoreNull("page"));
		} else {
			page = context.getPageEntity().getPage();
		}
		if (context.getRequestParams().containsKey("rows")) {
			rows = Integer.parseInt(context.getRequestParams().getStrIgnoreNull("rows"));
		} else {
			rows = context.getPageEntity().getRows();
		}
		evalStdQuery.setPageNo(page);
		evalStdQuery.setPageSize(rows);
		context.getResponseParams().put("pageNumber", page);
		evalStdQuery.setStatus(context.getRequestParams().getStrIgnoreNull("status"));
		evalStdQuery.setEventType(context.getRequestParams().getStrIgnoreNull("eventType"));
		evalStdQuery.setCode(context.getRequestParams().getStrIgnoreNull("code"));
		evalStdQuery.setName(context.getRequestParams().getStrIgnoreNull("name"));
		evalStdQuery.setPageNo(page);
		Pagination pagination= evalStdService.getEvalStdWithPage(evalStdQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions(value = {"evalStd:edit0", "evalStd:edit1", "evalStd:edit2"}, logical = Logical.OR)
	public String goEditView(Model model) {
		String evalStdId = context.getRequest().getParameter("id");
		String status = context.getRequestParams().getStrIgnoreNull("status");
		EvalStd evalStd = new EvalStd();
		if (StringUtil.isNotEmpty(evalStdId) && StringUtil.isNumeric(evalStdId)) {
			evalStd = evalStdService.getEvalStdByKey(NumberUtil.parseLong(evalStdId));
		}else {
			evalStd.setStatus(status);
		}
		model.addAttribute("status", status);
		model.addAttribute("dataBean", JSONObject.toJSONString(evalStd));
		return path + "cardEvalStd";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions(value = {"evalStd:edit0", "evalStd:edit1", "evalStd:edit2"}, logical = Logical.OR)
	@ResponseBody
	public void save(Model model, EvalStd evalStd) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), evalStd);
			if (evalStd.getId() > 0) {
				evalStd.setMender(context.getActiveUser().getUserid());
				evalStdService.updateEvalStdByKey(evalStd);
				setBean(evalStd);
				setResult(true, "考评标准修改成功");
			} else {
				evalStd.setCreater(context.getActiveUser().getUserid());
				evalStd.setCreateDate(new Date());
				evalStdService.addEvalStd(evalStd);
				setBean(evalStd);
				setResult(true, "考评标准新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions(value = {"evalStd:del0", "evalStd:del1", "evalStd:del2"}, logical = Logical.OR)
	@ResponseBody
	public void doDelete(Long id) {
		try {

			EvalEventExample example = new  EvalEventExample();
			EvalEventExample.Criteria criteria = example.createCriteria();
			criteria.andStdIdEqualTo(String.valueOf(id));
			int useCount =  evalEventDao.countByExample(example);
			if(useCount>0){
				returnErrorMsg("code", "考评标准已被使用，请勿删除");
				return;
			}
			evalStdService.deleteEvalStdByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}



	@RequestMapping("export.vm")
	@RequiresPermissions(value = {"evalStd:query0", "evalStd:query1", "evalStd:query2"}, logical = Logical.OR)
	public void export(Model model, EvalStd evalStd) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
