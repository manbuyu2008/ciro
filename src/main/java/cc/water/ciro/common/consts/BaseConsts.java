package cc.water.ciro.common.consts;

import cc.water.ciro.common.base.BaseLogger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-8-3
 * Time: 下午8:58
 * To change this template use File | Settings | File Templates.
 */
public final  class BaseConsts {
    //授权类型 0-用户 2-角色
    public static enum PrivMaster {
        user {
            public int value() {
                return 0;
            }

            public String text() {
                return "用户";
            }
        },
        role {
            public int value() {
                return 2;
            }

            public String text() {
                return "角色";
            }
        };

        public abstract int value();

        public abstract String text();

        public static PrivMaster valueOf(int v) {
            for (PrivMaster pt : PrivMaster.values()) {
                if (pt.value() == v) return pt;
            }
            return user;
        }
    }
    //用户等级 0-用户 2-系统开发
    public static enum PrivInfo {
        user {
            public int value() {
                return 0;
            }

            public String text() {
                return "用户";
            }
        },
        sys_developer {
            public int value() {
                return 2;
            }

            public String text() {
                return "系统开发";
            }
        };

        public abstract int value();

        public abstract String text();

        public static PrivInfo valueOf(int v) {
            for (PrivInfo pt : PrivInfo.values()) {
                if (pt.value() == v) return pt;
            }
            return user;
        }
        //用户能否操作该权限
        public static boolean canUserOpt(int curLevel, int optLevel) {
            return curLevel >= optLevel;
        }
    }

    //数据权限 0-本人 5-本部门 10-本机构 15-本机构及下级机构
    public static enum DataPrivInfo {
        user {
            public int value() {
                return 0;
            }

            public String text() {
                return "本人";
            }
        },
        user_dept {
            public int value() {
                return 5;
            }

            public String text() {
                return "本部门";
            }
        },
        user_dept_child {
            public int value() {
                return 10;
            }

            public String text() {
                return "本部门及下级部门";
            }
        },
        user_corp {
            public int value() {
                return 15;
            }

            public String text() {
                return "本单位";
            }
        }/*,
        user_corp_child {
            public int value() {
                return 20;
            }

            public String text() {
                return "本机构及下级机构";
            }
        }*/;

        public abstract int value();

        public abstract String text();

        public static DataPrivInfo valueOf(int v) {
            for (DataPrivInfo pt : DataPrivInfo.values()) {
                if (pt.value() == v) return pt;
            }
            return user;
        }

        public static String toJson() {
            return toJson("id", "text");
        }

        public static String toJson(String valueField, String textField) {
            JSONArray jsonArray = new JSONArray();
            JSONObject json;
            try {
                for (DataPrivInfo priv : DataPrivInfo.values()) {
                    json = new JSONObject();
                    json.put(valueField, priv.value());
                    json.put(textField, priv.text());
                    jsonArray.put(json);
                }
            } catch (JSONException e) {
                BaseLogger.error("", e);
            }
            return jsonArray.toString();
        }

        /**
         * 当前登录人员是否有查看下级机构的权限
         * @param request
         * @return
         */
        public static boolean includeChildCorp(HttpServletRequest request) {
            return false;
        }
        //查看下级部门
        public static boolean includeChildDept(HttpServletRequest request) {
            return false;
        }
        //查看本单位其它部门
        public static boolean includeOtherDept(HttpServletRequest request) {
            return false;
        }
    }
}
