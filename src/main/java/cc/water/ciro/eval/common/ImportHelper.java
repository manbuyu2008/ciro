package cc.water.ciro.eval.common;


import org.apache.poi.xssf.usermodel.XSSFCell;

/**
 * Created with IntelliJ IDEA.
 * User: huangxl
 * Date: 13-3-18
 * Time: 下午3:37
 * 数据导入处理；
 */

public class ImportHelper {
    /**
     * 截取文件后缀
     *
     * @param fileName 文件名
     * @return
     */
    protected static String getFlieSuffix(String fileName) {
        int index = fileName.lastIndexOf(".");
        return fileName.substring(index);
    }


    public static String getStringFromValue(XSSFCell cell) {
        if(cell==null){
            return "";
        }else if (cell.getCellType() == XSSFCell.CELL_TYPE_STRING) {
            return cell.getStringCellValue();
        } else if (cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC) {
            return String.valueOf((int) cell.getNumericCellValue());
        }
        return "";
    }

}
