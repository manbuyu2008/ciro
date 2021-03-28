package cc.water.ciro.common.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-11
 * Time: 上午12:00
 * To change this template use File | Settings | File Templates.
 */
public class HtmlUtil {
    public static String toHtmlText(String srcStr) {
        if (srcStr == null) return "";
        return srcStr.replaceAll("\n", "<br>").replaceAll("\t", " ");
    }

    public static String getHtmlStr(long value) {
        return getHtmlStr(String.valueOf(value));
    }

    public static String getHtmlStr(double value) {
        return getHtmlStr(String.valueOf(value));
    }

    public static String getHtmlStr(Object obj) {
        if (obj == null)
            return "&nbsp;";
        String str = obj.toString();
        str = str.replace('\n', ' ');
        str = str.replace('\t', ' ');
        str = str.replace('\r', ' ');
        if (str.equals(""))
            return "&nbsp;";
        return str;
    }

    public static String getHtmlBrStr(Object obj) {
        if (obj == null)
            return "&nbsp;";
        String str = obj.toString();
        str = str.replace('\t', ' ');
        str = str.replaceAll("\n", "<br>");
        str = str.replaceAll("\r", " ");
        if (str.equals(""))
            return "&nbsp;";
        return str;
    }

    public static String getHtmlBrStrRemoveScript(Object obj) {
        if (obj == null)
            return "&nbsp;";
        String str = obj.toString();
        str = str.replaceAll("<", "&lt;");
        str = str.replaceAll(">", "&gt;");
        str = str.replace('\t', ' ');
        str = str.replaceAll("\n", "<br>");
        str = str.replaceAll("\r", " ");
        if (str.equals(""))
            return "&nbsp;";
        return str;
    }
    //将' '替换为<br>
    public static String getHtmlBrTrim(Object obj) {
        if (obj == null)
            return "&nbsp;";
        String str = obj.toString();
//        str = str.replace('\t', ' ');
        str = str.replaceAll(" ", "<br>");
//        str = str.replaceAll("\r", " ");
        if (str.equals(""))
            return "&nbsp;";
        return str;
    }

    public static String getHtmlBrStr3(String str) {
        if (str == null || str.length() == 0)
            return "&nbsp;";
        return str;
    }

    public static class SelectOption {
        public String value = "";
        public String text = "";
        public String style = "";


        public SelectOption(String value, String text) {
            this.value = value;
            this.text = text;

        }
        public SelectOption(String value, String text, String stype) {
            this.value = value;
            this.text = text;
            this.style=stype;
        }
    }

    public static class CheckBox {
        public String value = "";
        public String text = "";
        public String checked = "";
        public String onClick = "";

        public CheckBox(String value, String text, String checked, String onClick) {
            this.value = value;
            this.text = text;
            //this.description = description;
            this.checked = checked;
            this.onClick = onClick;
        }
    }

    public static class RadioBox {
        public String value = "";
        public String text = "";
        public String checked = "";
        public String onClick = "";

        public RadioBox(String value, String text, String checked, String onClick) {
            this.value = value;
            this.text = text;
            //this.description = description;
            this.checked = checked;
            this.onClick = onClick;
        }
    }

    /**
     * 获取html的html串
     *
     * @param selectOptionValue 需要选择的项目
     * @param lstOptions        项目列表
     * @return StringBuilder
     */
    public static StringBuilder getSelectOptions(String selectOptionValue, List<SelectOption> lstOptions) {
        StringBuilder sb = new StringBuilder("");
        if (lstOptions == null) return sb;
        for (SelectOption option : lstOptions) {
            sb.append("<option value='").append(option.value).append("'").append(" style=\"").append(option.style).append("\"")
                    .append(option.value.equals(selectOptionValue) ? " selected" : "")
                    .append(">").append(option.text).append("</option>");
        }
        return sb;
    }

    public static StringBuilder getSelectOptionsMultiDefault(String selectOptionValue, List<SelectOption> lstOptions) {
        StringBuilder sb = new StringBuilder("");
        if (lstOptions == null) return sb;
        for (SelectOption option : lstOptions) {
            sb.append("<option value='").append(option.value).append("'").append(" style=\"").append(option.style).append("\"")
                    .append(selectOptionValue.indexOf(option.value)>-1 ? " selected" : "")
                    .append(">").append(option.text).append("</option>");
        }
        return sb;
    }

    /**
     * 获取html的html串
     *
     * @param selectOptionValue 需要选择的项目
     * @param lstOptions        项目列表
     * @return StringBuilder
     */
    public static StringBuilder getSelectOptionsIncludeAll(String selectOptionValue, List<SelectOption> lstOptions) {
        StringBuilder sb = new StringBuilder();
        sb.append("<option value=''")
                .append(selectOptionValue.equals("") ? " selected" : "")
                .append(">").append("(所有)").append("</option>");
        for (SelectOption option : lstOptions) {
            sb.append("<option value='").append(option.value).append("'")
                    .append(option.value.equals(selectOptionValue) ? " selected" : "")
                    .append(">").append(option.text).append("</option>");
        }
        return sb;
    }

    /**
     * 获取html的html串
     *
     * @param selectOptionValue 需要选择的项目
     * @param lstOptions        项目列表
     * @return StringBuilder
     */
    public static StringBuilder getSelectOptionsIncludeSpace(String selectOptionValue, List<SelectOption> lstOptions) {
        StringBuilder sb = new StringBuilder();
        if (selectOptionValue == null || selectOptionValue.equals("")) {
            sb.append("<option value='' selected>&nbsp;</option>");
        } else {
            sb.append("<option value=''>&nbsp;</option>");
        }
        for (SelectOption option : lstOptions) {
            sb.append("<option value='").append(option.value).append("'")
                    .append(option.value.equals(selectOptionValue) ? " selected" : "")
                    .append(">").append(option.text).append("</option>");
        }
        return sb;
    }

    public static StringBuilder getSelectInputComplex(int left, int top, int width, int height, String value, List<SelectOption> lstOptions, boolean readOnly) throws Exception {
        StringBuilder sb = new StringBuilder();
//         if (readOnly){
//            sb.append("<select name='selectComplex' id='selectComplex' disabled='true' style='position:absolute;left: ").append(left);
//             sb.append(";top: ").append(top).append(";width: ").append(width).append(";height: ").append(height).append(";");
//             sb.append("clip:rect(").append(0).append(" ").append(width).append(" ").append(height).append(" ").append(width-20).append(")'");
//             sb.append(" onchange='textInputComplex.value=selectComplex.options[selectComplex.selectedIndex].text;");
//             sb.append("valueInputComplex.value=selectComplex.options[selectComplex.selectedIndex].value;textInputComplex.select();'>");
//             for (SelectOption option : lstOptions) {
//                 sb.append("<option value='").append(option.value).append("'")
//                         .append(option.value.equals(value) ? " selected" : "")
//                         .append(">").append(option.text).append("</option>");
//             }
//             sb.append("</select>");
//             sb.append("<input name='textInputComplex' id='textInputComplex' type='text' readOnly='true' style='position:absolute; left: ");
//             sb.append(left).append(";top: ").append(top).append(";width: ").append(width).append(";height: ").append(height-1).append(";'");
//             sb.append(" onfocus='this.select();'").append(" value='").append(value).append("'>");
//             sb.append("<input style='position:inherit' type='hidden' name='valueInputComplex' id='valueInputComplex' value='").append(value).append("'>");
//         }else{
//             String defaultValue = "";
        sb.append("" +
                "<select name='selectComplex' id='selectComplex' ").append(
                readOnly ? "disabled" : "").append(" " +
                "style='position:absolute;" +
                "left: ").append(left).append(
                ";top: ").append(top).append(";" +
                "width: ").append(width).append(";" +
                "height: ").append(height).append(";" +
                "clip:rect(").append(0).append(" ").append(width).append(" ").append(height).append(" ").append(width - 20).append(")' " +
                "onchange='textInputComplex.value=selectComplex.options[selectComplex.selectedIndex].text;" +
                "valueInputComplex.value=selectComplex.options[selectComplex.selectedIndex].value;textInputComplex.select();'>");

        String defaultText = "";
        boolean haveDefault = false;
        for (SelectOption option : lstOptions) {
            sb.append("<option value='").append(option.value).append("'")
                    .append(option.value.equals(value) ? " selected" : "")
                    .append(">").append(option.text).append("</option>");
            if (value.equals(option.value)) {
                haveDefault = true;
//                     defaultText = option.text;
//                     defaultValue = option.value;
            }
        }
//             if(!haveDefault){
        sb.append("<option value='-1' ").append(haveDefault ? "" : "checked").append("></option>");
//             }


        sb.append("" +
                "</select>" +
                "<input name='textInputComplex' id='textInputComplex' type='text' readOnly='true' " +
                "style='position:absolute; " +
                "left: ").append(left).append(";" +
                "top: ").append(top).append(";" +
                "width: ").append(width).append(";" +
                "height: ").append(height - 1).append(";'" +
                " onfocus='this.select();' value='").append(defaultText).append("'>" +
                "<input style='position:inherit' type='hidden' name='valueInputComplex' id='valueInputComplex' " +
                "value='").append(value).append("'>");
//         }

        return sb;
    }

    public static StringBuilder getSelectInputComplex(String inputName, String inputId, int left, int top, int width, int height, String value, List<SelectOption> lstOptions, boolean readOnly) throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("" +
//                "<div style='position:absolute;"+
//                "left: ").append(left-60).append(
//                ";top: ").append(top).append(";"+
//                "width: 60;height:20;padding-top:5;'>收支类型:</div>"+
                "<a>收支类型:</a>" +
                "<select name='").append(inputName).append("_select' id='").append(inputId).append("_select'").append(
                readOnly ? "disabled" : "").append(" " +
                "style='" +
//                "position:absolute;" +
//                "left: ").append(left).append(
//                ";top: ").append(top).append(";" +
                "width: ").append(width).append(";" +
//                "height: ").append(height).append(";" +
//                "clip:rect(").append(0).append(" ").append(width).append(" ").append(height).append(" ").append(width - 20).append(")" +
                "' " +
                "onchange='").append(inputId).append("_input.value=").append(inputId).append("_select.options[");
        sb.append(inputId).append("_select.selectedIndex].text;").append(inputId).append(".value=");
        sb.append(inputId).append("_select.options[").append(inputId).append("_select.selectedIndex].value;");
        sb.append(inputId).append("_input.select();'>");
        String defaultText = "";
        boolean haveDefault = false;
        for (SelectOption option : lstOptions) {
            sb.append("<option value='").append(option.value).append("'")
                    .append(option.value.equals(value) ? " selected" : "")
                    .append(">").append(option.text).append("</option>");
            if (value.equals(option.value)) {
                haveDefault = true;
            }
        }
        sb.append("<option value='-1' ").append(haveDefault ? "" : "checked").append("></option>");

        sb.append("" +
                "</select>" +
                "<input name='").append(inputName).append("_input' id='").append(inputId).append("_input' type='hidden' readOnly='true' " +
//                "style='" +
//                "position:absolute; " +
//                "left: ").append(left).append(";" +
//                "top: ").append(top).append(";" +
//                "width: ").append(width).append(";" +
//                "height: ").append(height - 2).append(";" +
//                "'" +
                " onfocus='this.select();' value='").append(defaultText).append("'>" +
                "<input type='hidden' style='position:inherit'  name='").append(inputName).append("' id='").append(inputId).append("' " +
                "value='").append(value).append("'>");
        return sb;
    }

    /**
     * @param tagName    checkboxname
     * @param list       要处理的list
     * @param columnSize 每行显示的列数
     * @return string      result
     */
    public static String getCheckBoxHtml(String tagName, List<CheckBox> list, int columnSize) {
        StringBuilder result = new StringBuilder();
        if (columnSize == 0) {
            columnSize = 1;
        }
        int row = list.size() / columnSize;
        if (list.size() % columnSize != 0) {
            row = list.size() / columnSize + 1;
        }
        int startCol;
        int endCol;
        int width = 100 / columnSize;
        result.append("<table width='100%'  border='0' cellpadding='0' cellspacing=0px >");
        for (int j = 0; j < row; j++) {
            startCol = j * columnSize;
            endCol = (j + 1) * columnSize;

            result.append("<tr class=p_tr_lst_con_in style='padding:0;'>");
            for (int i = startCol; i < endCol; i++) {
                if (i < list.size()) {
                    CheckBox iList = list.get(i);
                    CheckBox item = new CheckBox(iList.value, iList.text, iList.checked, iList.onClick);
                    result.append("" +
                            "<td width='").append(width).append("%' nowrap><label class=stdbtext>" +
                            "<input type='checkBox' name=").append(tagName).append("" +
                            " value=").append(item.value).append(" ")
                            .append(item.checked).append("/>")
                            .append(item.text);
                    result.append("</label></td>");
                } else {
                    result.append("<td>&nbsp</td>");
                }
            }
            result.append("</tr>");
        }
        result.append("</table>");
        return result.toString();
    }

    /**
     * @param tagName    checkboxname
     * @param list       要处理的list
     * @param columnSize 每行显示的列数
     * @return string      result
     */
    public static String getRadioBoxHtml(String tagName, List<RadioBox> list, int columnSize) {
        StringBuilder result = new StringBuilder();
        if (columnSize == 0) {
            columnSize = 1;
        }
        int row = list.size() / columnSize;
        if (list.size() % columnSize != 0) {
            row = list.size() / columnSize + 1;
        }
        int startCol;
        int endCol;
        int width = 100 / columnSize;
        result.append("<table width='100%'  border='0' cellpadding='0' cellspacing=0px >");
        for (int j = 0; j < row; j++) {
            startCol = j * columnSize;
            endCol = (j + 1) * columnSize;

            result.append("<tr class=p_tr_lst_con_in height=20px>");
            for (int i = startCol; i < endCol; i++) {
                if (i < list.size()) {
                    RadioBox iList = list.get(i);
                    RadioBox item = new RadioBox(iList.value, iList.text, iList.checked, iList.onClick);
                    result.append("<td width='").append(width).append("%'>" +
                            "<label class=stdbtext>" +
                            "<input type='radio' name=")
                            .append(tagName).append(" value=")
                            .append(item.value).append(" ")
                            .append(item.checked).append("/>")
                            .append(item.text);
                    result.append("</label></td>");
                } else {
                    result.append("<td>&nbsp</td>");
                }
            }
            result.append("</tr>");
        }
        result.append("</table>");
        return result.toString();
    }

    /**
     * 处理在原来一个权限组的基础上细分为查看和编辑两个权限组
     *
     * @param tagName     表单元素checkbox的名称
     * @param mapCheckBox 键为查看和编辑两个权限组相同的名称,值为checkbox的列表,包括查看或编辑
     * @param colNum      表格每行的列数
     * @return 返回页面需要的html字符串
     */
    public static String getCheckBoxWithTitleHtml(String tagName, LinkedHashMap<String, ArrayList<CheckBox>> mapCheckBox, int colNum) {
        StringBuilder sb = new StringBuilder();
        if (colNum == 0) {
            colNum = 1;
        }
        int tdWidth = 100 / colNum;
        int row = mapCheckBox.size() / colNum;
        if (mapCheckBox.size() % colNum != 0) {
            row = row + 1;
        }
        int startCol;
        int endCol;
        sb.append("<table width='100%'  border='0' cellpadding='0' cellspacing='0' style='color:#666;'>");
        for (int j = 0; j < row; j++) {
            startCol = j * colNum;
            endCol = (j + 1) * colNum;

            Iterator iter = mapCheckBox.keySet().iterator();
            for (int k = 0; k < startCol; k++) {
                if (startCol > 0) {
                    iter.next();
                }
            }
            sb.append("<tr class='p_tr_lst_con_in'>");
            for (int i = startCol; i < endCol; i++) {
                if (iter.hasNext()) {
                    String title = iter.next().toString().trim();
                    ArrayList<CheckBox> checkBoxList = mapCheckBox.get(title);
                    sb.append("<td width='").append(tdWidth).append("%'><font color=green>").append(title).append("</font>(");
                    for (CheckBox checkBox : checkBoxList) {
                        sb.append("<input type='checkbox' name=")
                                .append(tagName).append(" value=")
                                .append(checkBox.value).append(" ")
                                .append(checkBox.checked).append("/>")
                                .append(checkBox.text);
                    }
                    sb.append(")</td>");
                } else {
                    sb.append("<td>&nbsp</td>");
                }
            }
            sb.append("</tr>");
        }
        sb.append("</table>");
        return sb.toString();
    }
}
