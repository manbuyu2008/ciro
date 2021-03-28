package cc.water.ciro.common.utils;

import cc.water.ciro.common.base.BaseLogger;
import org.apache.commons.io.IOUtils;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created in ChongQing, thanks for read my code.
 * User: 胡成彬
 * Date: 2005-9-2
 * Time: 16:37:28
 * Func: 数据下载Servlet的帮助类
 */
public abstract class UtilDownloadFile {
    public static void writePdf(HttpServletResponse response, InputStream inputStream) throws IOException {
        InputStream bufIn = new BufferedInputStream(inputStream, 8192);
        try {
            OutputStream output = response.getOutputStream();
            response.setContentType("application/pdf");
            byte[] bs = new byte[8192];
            while (true) {
                int nLen = bufIn.read(bs);
                if (nLen <= 0) break;
                output.write(bs, 0, nLen);
            }
            output.flush();
        } finally {
            IOUtils.closeQuietly(bufIn);
        }
    }

    /**
     * 郑根木 2008.8.29 增加，原方法在大文件时，必须先读完整个文件才开始下载，
     * 新加方法边读边写response.getOutputStream，让客户端及时看到进度条
     *
     * @param response     r
     * @param fileSrc      源文件名
     * @param fileOrigName 显示在reponse中的文件名称.
     */
    public static void downfileEx(HttpServletResponse response, String fileSrc, String fileOrigName) {
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(fileSrc), 8192);
            downfileStream(response, fileOrigName, in.available(), in);
        } catch (Exception e) {
            // ignore
        } finally {
            IOUtils.closeQuietly(in);
        }
    }

    /**
     * 郑根木 2008.8.29 增加，原方法在大文件时，必须先读完整个文件才开始下载，
     * 新加方法边读边写response.getOutputStream，让客户端及时看到进度条
     */
    public static void downfileStream(HttpServletResponse response, String fileName, int totalSize, InputStream in) {
        OutputStream out = null;
        try {
            writeResponseHeader(response, fileName, totalSize);

            out = response.getOutputStream();
            byte[] bs = new byte[8192];
            while (true) {
                int nLen = in.read(bs);
                if (nLen <= 0) break;
                out.write(bs, 0, nLen);
            }
            out.flush();
        } catch (IOException e) {
            System.out.println("客户端下载过程取消或中断！");
        } finally {
            IOUtils.closeQuietly(out);
        }
    }

    public static void sendImgFile(HttpServletResponse response, String fileSrc) {
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(fileSrc), 8192);
            sendImgStream(response, in);
        } catch (Exception e) {
            // ignore
        } finally {
            IOUtils.closeQuietly(in);
        }
    }

    /**
     * 郑根木 图片显示，
     */
    public static void sendImgStream(HttpServletResponse response, InputStream in) {
        OutputStream out = null;
        try {
            out = response.getOutputStream();
            byte[] bs = new byte[8192];
            while (true) {
                int nLen = in.read(bs);
                if (nLen <= 0) break;
                out.write(bs, 0, nLen);
            }
            out.flush();
        } catch (IOException e) {
            BaseLogger.error("图片显示", e);
        } finally {
            IOUtils.closeQuietly(out);
        }
    }

    public static void writeResponseHeader(HttpServletResponse response, String fileName, int totalSize) {
        try {
            /*解决中文文件名乱码的问题*/
//            fileName = java.net.URLEncoder.encode(fileName, "UTF-8");
            fileName = new String(fileName.getBytes("UTF-8"),"ISO_8859_1");
        } catch (Exception ex) {
            // ignore
        }
        /*
        例1.内嵌显示一个文件
        Content-disposition: inline; filename=foobar.pdf
        例2.往response里附加一个文件
        Content-disposition: attachment; filename=foobar.pdf
        */
        //返回文件下载
        response.setContentType("APPLICATION/OCTET-STREAM");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("GATM-Attch-Name", fileName);
        response.setContentType("application/x-download;charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        if (totalSize > 0) response.setContentLength(totalSize);
    }

    /**
     * 写空长度的内容到输出流.
     */
    public static void writeZeroLengthResponse(HttpServletResponse response, String fileName) {
        try {
            writeResponseHeader(response, fileName, 0);
            response.flushBuffer();
        } catch (IOException e) {
            // ignore e;
        }
    }
}
