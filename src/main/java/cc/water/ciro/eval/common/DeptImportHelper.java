package cc.water.ciro.eval.common;


import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.StateEnum;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.service.DeptService;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: huangxl
 * Date: 13-3-22
 * Time: 下午3:37
 * 数据导入处理；
 */
@Component
public class DeptImportHelper {
    @Autowired
    private DeptService deptService;

    /**
     * 读取部门数据
     *
     * @param sheet    Sheet
     * @param rowIndex Excel行索引
     * @return PageBean
     * @throws Exception
     */
    public String readDeptFromExcel(XSSFSheet sheet, int rowIndex, ActionContext context) throws Exception {
        // 创建对Excel工作簿文件的引用
        List<Dept> inlist = new ArrayList<Dept>();
        List<Dept> uplist = new ArrayList<Dept>();

        HashMap<Integer, String> hashMap_code = new HashMap<Integer, String>();
        HashMap<Integer, String> hashMap_name = new HashMap<Integer, String>();
        if (!sheet.getSheetName().equals("部门")) {
            context.getRequest().setAttribute("error", "找不到名称为“部门”的sheet");
            return "0-0-0";
        }
        int number_all = 0, number_insert = 0, number_update = 0;
        for (int i = rowIndex; i <= sheet.getLastRowNum(); i++) {
            Dept deptBean = new Dept();
            XSSFRow row = sheet.getRow(i);
            //部门编码验证
            String deptCode = "";
            deptCode = ImportHelper.getStringFromValue(row.getCell(0));
            if (StringUtil.isEmpty(deptCode)) {
                throw new Exception("导入失败：第" + (i + 1) + "行的部门编码不能为空");
            }
            Iterator<Integer> iteratorCode = hashMap_code.keySet().iterator();
            while (iteratorCode.hasNext()) {
                Integer key = iteratorCode.next();//当前key值
                if (hashMap_code.get(key).equals(deptCode)) {
                    throw new Exception("导入失败：第" + (i + 1) + "行的部门编码与第" + key + "行部门编码有重复，数据导入失败");
                }
            }
            hashMap_code.put(i + 1, deptCode);
            deptBean.setCode(deptCode);
            /*旧数据*/
            Dept tempDept = deptService.getDeptByContent(deptBean.getCode());
            //部门验证
            String name = "";
            name = ImportHelper.getStringFromValue(row.getCell(1));
            if (StringUtil.isEmpty(name)) {
                throw new Exception("导入失败：第" + (i + 1) + "行的部门名称不能为空");
            }
            Iterator<Integer> iteratorName = hashMap_name.keySet().iterator();
            while (iteratorName.hasNext()) {
                Integer key = iteratorName.next();//当前key值
                if (hashMap_name.get(key).equals(name)) {
                    throw new Exception("导入失败：第" + (i + 1) + "行的部门名称与第" + key + "行部门名称有重复,数据导入失败");
                }
            }
            hashMap_name.put(i + 1, name);
            deptBean.setName(name);

            String parentName = "";
            if (row.getCell(2) != null) {
                parentName = ImportHelper.getStringFromValue(row.getCell(2));
                if (parentName == "" || parentName == "-") {
                    deptBean.setParentId("0");
                } else {
                    Dept parentDept = deptService.getDeptByContent(parentName);
                    if (parentDept == null) {
                        throw new Exception("导入失败：第" + (i + 1) + "行的上级部门不存在");
                    } else {
                        deptBean.setParentId(String.valueOf(parentDept.getId()));
                    }
                }
            } else {
                deptBean.setParentId("0");
            }
            //得到父节点
            Dept parentBean = deptService.getDeptByKey(Long.valueOf(deptBean.getParentId()));
            if (StringUtil.isEmpty(deptBean.getParentId())) {
                deptBean.setParentId("0");
            }
            //当前节点的级次编码为父节点级次编码+“-”+当前节点id
            if (tempDept != null) {
                String levelCode = String.valueOf((parentBean == null) ? tempDept.getId() : parentBean.getLevelCode() + "-" + tempDept.getId());
                deptBean.setLevelCode(levelCode);
            }else {
                String levelCode = String.valueOf((parentBean == null) ? deptBean.getId() : parentBean.getLevelCode() + "-" + deptBean.getId());
                deptBean.setLevelCode(levelCode);
            }
            //当前节点的级次为父节点级次+1
            deptBean.setLevelNum(parentBean == null ? 0 : parentBean.getLevelNum() + 1);

            if (tempDept != null) {
                deptBean.setStatus(tempDept.getStatus());
                deptBean.setId(tempDept.getId());
                deptService.updateDeptByKey(deptBean);
                number_update++;
            } else {
                checkSave(deptBean, true, context, i);
                deptBean.setStatus(StateEnum.NORMAL.getCode());
                deptService.addDept(deptBean);
                number_insert++;
            }
        }
        number_all = sheet.getLastRowNum() - rowIndex + 1;
        return number_all + "-" + number_insert + "-" + number_update;
    }
    /**
     * 保存校验
     *
     * @param bean  要保存的对象
     * @param isNew 是否新增
     * @throws Exception 校验失败，直接抛出异常
     */
    public void checkSave(Dept bean, boolean isNew, ActionContext context, int i) throws Exception {
        if (StringUtil.isEmpty(bean.getCode())) {
            throw new Exception("导入失败：第" + (i + 1) + "行的编码不可为空,请检查!");
        }
        if (StringUtil.isEmpty(bean.getName())) {
            throw new Exception("导入失败：第" + (i + 1) + "行的名称不可为空,请检查!");
        }
        /*if (StringUtil.isEmpty(bean.getDeptType())) {
            throw new Exception("部门性质不可为空,请检查!");
        }*/
        if (!isNew && StringUtil.isNotEmpty(bean.getParentId()) && !bean.getParentId().equals("-")) {
            Dept p = deptService.getDeptByKey(Long.valueOf(bean.getParentId()));
            if (p.getLevelCode().indexOf(String.valueOf(bean.getId())) > 0) {
                throw new Exception("导入失败：第" + (i + 1) + "行的上级部门设置错误：部门级次有循环！");
            }
        }
    }
}
