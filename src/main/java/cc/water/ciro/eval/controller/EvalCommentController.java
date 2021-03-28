package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.eval.domain.EvalComment;
import cc.water.ciro.eval.query.EvalCommentQuery;
import cc.water.ciro.eval.service.EvalCommentService;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.UserService;
import com.alibaba.fastjson.JSONObject;
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
@RequestMapping("/eval/evalComment/")
public class EvalCommentController extends ListController<EvalComment> {
	
	@Autowired
	private UserService userService;
	@Autowired
	private EvalCommentService evalCommentService;

	final static String path = "eval/evalComment/";
	
	@RequestMapping("list.vm")
	@RequiresPermissions("evalComment:query")
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		return path + "listEvalComment";
	}

	@RequestMapping("data.vm")
	@RequiresPermissions("evalComment:query")
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<EvalComment> list, int total) throws Exception {
		EvalCommentQuery evalCommentQuery = new EvalCommentQuery();
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
		evalCommentQuery.setPageNo(page);
		evalCommentQuery.setPageSize(rows);
		context.getResponseParams().put("pageNumber", page);
		String did = context.getRequestParams().getStrIgnoreNull("did");
		if(StringUtil.isNotEmptyEx(did)) {
			evalCommentQuery.setDid(did);
		}
		evalCommentQuery.setStatus(context.getRequestParams().getStrIgnoreNull("status"));
		evalCommentQuery.setPageNo(page);
		Pagination pagination= evalCommentService.getEvalCommentWithPage(evalCommentQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions("evalComment:edit")
	public String goEditView(Model model) {
		String evalCommentId = context.getRequest().getParameter("id");
		EvalComment evalComment = new EvalComment();
		if (StringUtil.isNotEmpty(evalCommentId) && StringUtil.isNumeric(evalCommentId)) {
			evalComment = evalCommentService.getEvalCommentByKey(NumberUtil.parseLong(evalCommentId));
		}
		model.addAttribute("dataBean", JSONObject.toJSONString(evalComment));
		return path + "cardEvalComment";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions("evalComment:edit")
	@ResponseBody
	public void save(Model model, EvalComment evalComment) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), evalComment);
			if (evalComment.getId() > 0) {
				evalComment.setMender(context.getActiveUser().getUserid());
				evalCommentService.updateEvalCommentByKey(evalComment);
				setBean(evalComment);
				setResult(true, "考评等级修改成功");
			} else {
				evalComment.setCreater(context.getActiveUser().getUserid());
				evalComment.setCreateDate(new Date());
				evalCommentService.addEvalComment(evalComment);
				setBean(evalComment);
				setResult(true, "考评等级新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions("evalComment:del")
	@ResponseBody
	public void doDelete(Long id) {
		try {
			UserQuery userQuery = new UserQuery();
			userQuery.setEvalType(id);
			int useCount =  userService.findListNum(userQuery);
			if(useCount>0){
				returnErrorMsg("code", "考评等级已被人员使用，请勿删除");
				return;
			}
			evalCommentService.deleteEvalCommentByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}



	@RequestMapping("export.vm")
	@RequiresPermissions("evalComment:query")
	public void export(Model model, EvalComment evalComment) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
