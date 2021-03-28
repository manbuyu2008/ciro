package cc.water.ciro.common.utils;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-8-30
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */
public class UtilExport {
    private static CellStyle createCellStyle(Workbook wb, short fontSize, boolean isBold, boolean hasBoder, short align) {
        CellStyle cs = wb.createCellStyle();
        Font f = wb.createFont();
        f.setFontHeightInPoints(fontSize);
        if (isBold) f.setBoldweight(Font.BOLDWEIGHT_BOLD);
        cs.setFont(f);
        if (hasBoder) {
            cs.setBorderBottom((short) 1);
            cs.setBorderLeft((short) 1);
            cs.setBorderRight((short) 1);
            cs.setBorderTop((short) 1);
        }
        cs.setAlignment(align);
        cs.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cs.setWrapText(true);
        return cs;
    }

    private static Row createRow(Sheet sheet, int rownum, int rowHeight) {
        Row row = sheet.getRow(rownum);
        if (row != null) return row;
        row = sheet.createRow(rownum);
        if (rowHeight > 0) row.setHeightInPoints(rowHeight);
        return row;
    }

    private static Cell createCell(Row row, int column) {
        Cell cell = row.getCell(column);
        if (cell != null) return cell;
        return row.createCell(column);
    }

    private static void writeMergeCell(Sheet sheet, int rowHeight, int fromRow, int endRow, int fromCol, int entCol, CellStyle cs, String text) {
        Row row = createRow(sheet, fromRow, rowHeight);
        Cell cell = createCell(row, fromCol);
        CellRangeAddress region = null;
        if (endRow != fromRow || entCol != fromCol) {
            region = new CellRangeAddress(fromRow, endRow, fromCol, entCol);
            sheet.addMergedRegion(region);
        }
        cell.setCellValue(text);
        cell.setCellStyle(cs);

        if (region != null) {
            setRegionStyle(cs, region, sheet);
        }
    }

    private static void setRegionStyle(CellStyle cs, CellRangeAddress region, Sheet sheet){
        for(int i=region.getFirstRow();i<=region.getLastRow();i++){
            Row row=sheet.getRow(i);
            if(row==null) row=sheet.createRow(i);
            for(int j=region.getFirstColumn();j<=region.getLastColumn();j++){
                Cell cell=row.getCell(j);
                if( cell==null){
                    cell=row.createCell(j);
                    cell.setCellValue("");
                }
                cell.setCellStyle(cs);
            }
        }
    }

    private static void writeMergeCell(Sheet sheet, int fromRow, int endRow, int fromCol, int entCol, CellStyle cs, String text) {
        writeMergeCell(sheet, 0, fromRow, endRow, fromCol, entCol, cs, text);
    }

    private static void writeCell(Row row, int colIndex, CellStyle cs, String text) {
        Cell cell = createCell(row, colIndex);
        cell.setCellStyle(cs);
        if(PubUtil.isNotEmpty(text)) text = text.replace("&nbsp;"," ");
        cell.setCellValue(text);
    }

    /**
     * 根据前端传回的导出模型导出
     *
     * @param response          输出流
     * @param modelJson 前端传回的导出模型
     * @throws Exception
     */
    public static void exportToExcel(HttpServletResponse response, List<Map<String, String>> data, String modelJson) throws Exception {
        JSONObject model = new JSONObject(modelJson);
        File tempFile = File.createTempFile("xls_", ".xls", new File(System.getProperty("java.io.tmpdir")));
        FileOutputStream fs = new FileOutputStream(tempFile);
        try {
            exportToExcel(fs, data, model);
            fs.flush();
        } finally {
            fs.close();
        }
        UtilDownFile.downfileEx(response, tempFile.getAbsolutePath(), model.getString("title") + ".xls");
    }

    private static int getStrLength(String text) {
        if (PubUtil.isEmpty(text)) return 1;
        if (!text.contains("\n")) return text.getBytes().length;
        String[] ss = text.split("\n");
        int len = 0;
        for (String s : ss) {
            len = Math.max(len, s.getBytes().length);
        }
        return len;
    }

    public static void exportToExcel(OutputStream os, List<Map<String, String>> data, JSONObject model) throws Exception {
        Workbook wb = new HSSFWorkbook();
        Sheet sheet = wb.createSheet();
        CellStyle colTitleStyle = createCellStyle(wb, (short) 9, false, true, CellStyle.ALIGN_CENTER);
        CellStyle dataStyle_left = createCellStyle(wb, (short) 9, false, true, CellStyle.ALIGN_LEFT);
        CellStyle dataStyle_right = createCellStyle(wb, (short) 9, false, true, CellStyle.ALIGN_RIGHT);

        //总列数，加上序号列
        int colCount = model.getJSONArray("columns").length() + 1;
        //导出表头
        int rowIndex = 0, colIndex = 0;
        //写入标题行
        String s = model.getString("title");
        if (PubUtil.isNotEmpty(s)) {
            CellStyle csh = createCellStyle(wb, (short) 16, true, false, CellStyle.ALIGN_CENTER);
            writeMergeCell(sheet, 35, rowIndex, rowIndex, colIndex, colIndex + colCount - 1, csh, s);

            rowIndex++;
        }
        //写入表头上方说明文字,一般为查询条件等
//        s = model.getString("headerStr");
//        if (PubUtil.isNotEmpty(s)) {
//            CellStyle csh = createCellStyle(wb, (short) 9, false, false, CellStyle.ALIGN_LEFT);
//            writeMergeCell(sheet, rowIndex, rowIndex, colIndex, colIndex + colCount - 1, csh, s);
//
//            rowIndex++;
//        }
        final JSONArray columns = model.getJSONArray("columns");
        final int collen = columns.length();
        int[] colMaxCharLen = new int[collen + 1];
        //写列标题
        int i, len;
        JSONArray header = model.getJSONArray("header");
        for (i = 0, len = header.length(); i < len; i++) {
            JSONObject h = header.getJSONObject(i);
            int hrow = h.getInt("row"), endRow, hcol = h.getInt("col"), colspan = h.getInt("colspan");
            if (h.getBoolean("isLeaf")) endRow = model.getInt("headerRowCount") - 1 + rowIndex;
            else endRow = hrow + h.getInt("rowspan") - 1 + rowIndex;
            String text = h.getString("title");
            int fromCol = hcol + colIndex;
            writeMergeCell(sheet, hrow + rowIndex, endRow, fromCol, fromCol + colspan - 1, colTitleStyle, text);
            if (colspan == 1) colMaxCharLen[fromCol] = getStrLength(text);
        }
        rowIndex += model.getInt("headerRowCount");

        int curRowIndex;
        Row row;
        Map<String, String> curRow;
        for (i = 0, len = data.size(); i < len; i++) {
            curRowIndex = rowIndex + i;
            curRow = data.get(i);
            row = sheet.createRow(curRowIndex);
            //写序号列
            writeCell(row, 0, dataStyle_left, String.valueOf(i + 1));
            for (int j = 0; j < collen; j++) {
                JSONObject col = columns.getJSONObject(j);
                String value = PubUtil.checkNull(curRow.get(col.getString("field")));
                //去掉html
                String html  = "<[^>]+>";
                Pattern p = Pattern.compile(html, Pattern.CASE_INSENSITIVE);
                Matcher m = p.matcher(value);
                value  = m.replaceAll("");
                CellStyle cs;
                if ("right".equals(col.optString("align"))) cs = dataStyle_right;
                else cs = dataStyle_left;
                writeCell(row, j + 1, cs, value);
                colMaxCharLen[j + 1] = Math.max(colMaxCharLen[j + 1], getStrLength(value));
            }
        }
        //自动列宽
        for (int j = 0; j <= collen; j++) {
            sheet.setColumnWidth(j, (colMaxCharLen[j] + 2) * 256);
        }
        wb.write(os);
    }
}
