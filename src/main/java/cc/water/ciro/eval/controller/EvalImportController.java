package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.BaseController;
import cc.water.ciro.eval.common.DeptImportHelper;
import cc.water.ciro.eval.common.PersonImportHelper;
import cc.water.ciro.eval.service.EvalImportService;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;

@Controller
@RequestMapping("/eval/evalImport/")
public class EvalImportController extends BaseController {

    @Autowired
    private PersonImportHelper personImportHelper;
    @Autowired
    private DeptImportHelper deptImportHelper;

    final static String path = "eval/evalImport/";

    @RequestMapping("userImport1.vm")
    @RequiresRoles("admin")
    public String userImport(HttpServletRequest request, HttpServletResponse response,
                             Model model) {
        return path + "listEvalImport";
    }

    @RequestMapping("data.vm")
    @RequiresPermissions("evalImport:query")
    @ResponseBody
    public void data(HttpServletRequest request, HttpServletResponse response, Model model) {

    }
    @RequestMapping("deptImport.vm")
    @RequiresRoles("admin")
    @ResponseBody
    public void deptImport(@RequestParam(value = "upload", required = true) MultipartFile file, HttpServletRequest request, ModelMap model) {
        int number_insert = 0 ;
        int number_update = 0 ;
        try {
            XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
            if (file.isEmpty()) {
                returnErrorMsg("code", "文件为空，不允许上传。");
                return;
            }
            XSSFSheet sheet = workbook.getSheetAt(0);
            //计算模板数据是从第几行开始算起
            int row = 2;
            //导入数据
            String number_str = deptImportHelper.readDeptFromExcel(sheet, row, context);
            String str_n[] = number_str.split("-");
            int number_all = Integer.valueOf(str_n[0]);
            number_insert = Integer.valueOf(str_n[1]);
            number_update = Integer.valueOf(str_n[2]);
            if (number_all <= 0) {
                returnErrorMsg("code", "没有数据可以导入!");
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
        setResult(true, "数据导入成功:新增"+number_insert+"条记录，修改"+number_update+"条记录！");
    }

    @RequestMapping("userImport.vm")
    @RequiresRoles("admin")
    @ResponseBody
    public void userImport(@RequestParam(value = "upload", required = true) MultipartFile file, HttpServletRequest request, ModelMap model) {
        int number_insert = 0 ;
        int number_update = 0 ;
        try {
//            String path = request.getSession().getServletContext().getRealPath("upload");
//            String fileName = file.getOriginalFilename();
//            File targetFile = new File(path, fileName);
//            if (!targetFile.exists()) {
//                targetFile.mkdirs();
//            }
//            //保存
//            file.transferTo(targetFile);
            XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
            if (file.isEmpty()) {
                returnErrorMsg("code", "文件为空，不允许上传。");
                return;
            }
            XSSFSheet sheet = workbook.getSheetAt(0);
            //计算模板数据是从第几行开始算起
            int row = 2;
            //导入数据
            String number_str = personImportHelper.readPersonFromExcel(sheet, row, context);
            String str_n[] = number_str.split("-");
            int number_all = Integer.valueOf(str_n[0]);
            number_insert = Integer.valueOf(str_n[1]);
            number_update = Integer.valueOf(str_n[2]);
            if (number_all <= 0) {
                returnErrorMsg("code", "没有数据可以导入!");
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
        setResult(true, "数据导入成功:新增"+number_insert+"条记录，修改"+number_update+"条记录！");
    }

}
