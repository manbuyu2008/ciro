package cc.water.ciro.eval.common;


import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.util.DateUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.DateUtilEx;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.enums.RoleSysEnum;
import cc.water.ciro.enums.SexEnum;
import cc.water.ciro.enums.StateEnum;
import cc.water.ciro.eval.domain.EvalUserType;
import cc.water.ciro.eval.domain.EvalUserTypeExample;
import cc.water.ciro.eval.mapper.EvalUserTypeDao;
import cc.water.ciro.system.dao.RoleDao;
import cc.water.ciro.system.dao.UserDao;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.domain.SysUserRole;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.service.DeptService;
import cc.water.ciro.system.service.UserService;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
public class PersonImportHelper {
    @Autowired
    private DeptService deptService;
    @Autowired
    private EvalUserTypeDao evalUserTypeDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleDao roleDao;

    /**
     * 读取人员数据
     *
     * @param sheet    Sheet
     * @param rowIndex Excel行索引
     * @return PageBean
     * @throws Exception
     */
    public String readPersonFromExcel(XSSFSheet sheet, int rowIndex, ActionContext context) throws Exception {

        if (!sheet.getSheetName().equals("人员")) {
            context.getRequest().setAttribute("error", "找不到名称为“人员”的sheet");
            return "0-0-0";
        }
        HashMap<Integer, String> hashMap = new HashMap<Integer, String>();
        int number_all = 0, number_insert = 0, number_update = 0;
        for (int i = rowIndex; i <= sheet.getLastRowNum(); i++) {
            XSSFRow row = sheet.getRow(i);
            User user = new User();
            //编码
            String code = ImportHelper.getStringFromValue(row.getCell(0));
            if (StringUtil.isEmpty(code)) {
                throw new  Exception("导入失败：第" + (i + 1) + "行的人员编码不能为空");
            }
            Iterator<Integer> iterator = hashMap.keySet().iterator();
            while (iterator.hasNext()) {
                Integer key = iterator.next();//当前key值
                if (hashMap.get(key).equals(code)) {
                    throw new  Exception("导入失败：第" + (i + 1) + "行的人员编码与第" + key + "行人员编码有重复，数据导入失败");
                }
            }
            hashMap.put(i + 1, code);
            user.setUsername(code);
            //姓名
            String name = ImportHelper.getStringFromValue(row.getCell(1));
            user.setName(name);
            //所属于部门
            String deptName = ImportHelper.getStringFromValue(row.getCell(2));
            Dept deptBean = deptService.getDeptByContent(deptName);
            if (deptBean == null) {
                throw new  Exception("导入失败：第" + (i + 1) + "行的部门名称编码找不到对应部门");
            }
            user.setDeptId(deptBean.getId());


            //是否考评
            String sfkp = ImportHelper.getStringFromValue(row.getCell(3));
            if ("是".equals(sfkp)) {
                user.setToEval(BooleanEnum.YES.getCode());
                //自评部门
                String deptCode_zp = ImportHelper.getStringFromValue(row.getCell(4));
                Dept dept_zp = deptService.getDeptByContent(deptCode_zp);
                if (dept_zp == null) {
                    throw new  Exception("导入失败：第" + (i + 1) + "行的自评部门编码找不到对应部门");
                }
                user.setEvalDept(dept_zp.getId());
                //人员考评类型
                String personSysType = ImportHelper.getStringFromValue(row.getCell(5));
                EvalUserTypeExample userTypeExample = new EvalUserTypeExample();
                EvalUserTypeExample.Criteria userTypeExampleCriteria = userTypeExample.createCriteria();
                userTypeExampleCriteria.andTypeCodeEqualTo(personSysType);
                List<EvalUserType> evalUserTypeList = evalUserTypeDao.selectByExample(userTypeExample);
                if (evalUserTypeList != null && evalUserTypeList.size() > 0) {
                    user.setEvalType(evalUserTypeList.get(0).getId());
                } else {
                    throw new  Exception("导入失败：第" + (i + 1) + "行的系统人员类型错误");
                }
            } else if ("否".equals(sfkp)) {
                user.setToEval(BooleanEnum.NO.getCode());
            } else {
                throw new  Exception("导入失败：第" + (i + 1) + "行的是否考评填写有误");
            }
            //职称
            String title = ImportHelper.getStringFromValue(row.getCell(6));
            if ("".equals(title)) {
                context.getRequest().setAttribute("error", "第" + (i + 1) + "行的人员职称不能为空");
                throw new  Exception("导入失败：第" + (i + 1) + "行的人员职称不能为空");
            } else {
                user.setPostName(title);
            }
            //性别
            String sex = ImportHelper.getStringFromValue(row.getCell(7));
            if ("女".equals(sex)) user.setSex(SexEnum.nv.getCode());
            else if ("男".equals(sex)) user.setSex(SexEnum.nan.getCode());
            else {
                throw new  Exception("导入失败：第" + (i + 1) + "行的性别填写有误");
            }
            //出生日期
            String birth = ImportHelper.getStringFromValue(row.getCell(8));
            if (DateUtilEx.isDateFormat(birth, "YYYY-MM-DD") && DateUtilEx.isDateValue(birth.substring(0, 4), birth.substring(5, 7), birth.substring(8, 10))) {
                user.setBirthdate(DateUtil.parse(birth));
            } else {
                throw new  Exception("导入失败：第" + (i + 1) + "行的出生日期填写有误");
            }
            //办公电话
            String offTel = ImportHelper.getStringFromValue(row.getCell(9));
            user.setPhone(offTel);
            //手机号码
            String mobel = ImportHelper.getStringFromValue(row.getCell(10));
            user.setMobile(mobel);
            //邮箱
            String email = ImportHelper.getStringFromValue(row.getCell(11));
            user.setEmail(email);
            //部门备注
            String deptNode = ImportHelper.getStringFromValue(row.getCell(18));
            User tempPerson = userDao.selectUserByUsername(code);
            if (tempPerson != null) {
                user.setId(tempPerson.getId());
                userDao.updateUserByKey(user);
                number_update++;
            } else {
                user.setSkin("bootstrap");
                user.setState(StateEnum.NORMAL.getCode());
                user.setAdminDeptId(String.valueOf(user.getDeptId()));
                checkSave(user, true, context, i);
                userDao.insertUser(user);
                /*初始化密码*/
                userService.resetPassword(user.getId());
                /*设置角色*/
                Role role = roleDao.getRoleByCode(RoleSysEnum.normal.getCode());
                List<SysUserRole> sysUserRoles = new ArrayList<SysUserRole>();
                SysUserRole sysUserRole = new SysUserRole();
                sysUserRole.setSysUserId(user.getId());
                sysUserRole.setSysRoleId(role.getId());
                sysUserRoles.add(sysUserRole);
                userDao.insertUserRoleBatch(sysUserRoles);
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

    private void checkSave(User bean, boolean isNew, ActionContext context, int i) throws Exception {
        if (bean.getDeptId() == 0) {
            throw new  Exception("导入失败：第" + (i + 1) + "所属部门不可为空,请检查!");
        }
        User personBean = userDao.selectUserByUsername(bean.getUsername());
        if (personBean != null) {
            if (!personBean.getId().equals(bean.getId())) {
                throw new  Exception("导入失败：第" + (i + 1) + "行的人员编码已被使用");
            }
        }

    }

}
