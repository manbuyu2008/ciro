package cc.water.ciro.common.utils;

import cc.water.ciro.common.base.BaseLogger;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by mim at 2011-6-10 10:13:05
 * 文件操作方法
 */
@SuppressWarnings("UnusedDeclaration")
public class FileUtilEx {
    //使用了"/"，暂未使用File.separator，因为在Windows下获取的"\"，以及通过Url.getPath获取的路径中的"/"，拼接路径会导致错误发生。暂时全部使用"/";
    //public static final String FSChar="/";
    public static final String FSChar = File.separator;

    /**
     * create new file
     * modify by huchb in 2012.08.14
     *
     * @param fileName 文件名，带路径
     * @return true is success
     */
    public static boolean CreateFile(String fileName) {
        try {
            File f = new File(fileName);
            if (f.exists()) {
                if (f.isDirectory()) {
                    BaseLogger.error("file:" + fileName + "  exist and is a directory");
                } else {
                    if (f.delete()) {
                        return f.createNewFile();
                    }
                }
                return false;
            } else {
                return f.createNewFile();
            }
        } catch (Exception e) {
            BaseLogger.error(e.getMessage(), e);
            return false;
        }
    }

    /**
     * 删除文件
     * modify by huchb in 2012.08.14
     *
     * @param dirName   源文件或目录
     * @param isRecurse 如果是目录,是否删除其下的子目录 (是否迭代)
     * @return true-成功,false-失败
     */
    public static boolean DeleteFile(String dirName, boolean isRecurse) {
        File f = new File(dirName);
        if (f.isFile()) {
            return f.delete();
        }
        boolean blret = true;
        try {
            //取出目录下的文件数量；
            File[] childsf = f.listFiles();
            if (childsf != null) {
                int filenumber = childsf.length;
                for (File cf : childsf) {
                    if (cf.isFile()) {
                        blret = cf.delete();
                    } else if (isRecurse) {
                        blret = DeleteFile(cf.getAbsolutePath(), true);
                    }
                    if (!blret) {
                        break;
                    }  //没删除成功，跳出内循环，并退出函数，返回删除不成功；
                }
                //删除空目录
                blret = new File(dirName).delete();
            }
        } catch (Exception e) {
            BaseLogger.error(e.getMessage(), e);
            blret = false;
        }
        return blret;
    }

    //删除文件或目录
    public static boolean delFile(String path) {
        File f = new File(path);
        return !f.exists() || delFile(f);
    }

    public static boolean delFile(File f) {
        if (f.isFile())
            return f.delete();
        return delDir(f);
    }

    /**
     * 将data写到fn中 fn为绝对路径
     *
     * @param fn   保存文件名
     * @param data 数据
     * @return int
     * @roseuid 3C297D4D0102
     */
    public static int saveFile(String fn, byte[] data) {
        try {
            FileOutputStream fos = new FileOutputStream(fn);
            fos.write(data, 0, data.length);
            fos.flush();
            fos.close();
            return 0;
        } catch (IOException e) {
            BaseLogger.error(e.getMessage(), e);
            return 100;
        }
    }

    /**
     * @param text     文件内容
     * @param fileName 文件名称
     * @param append   是否追加的文件的尾部
     *                 如果append=true 则将内容追加的文件的尾部
     *                 否则，从头开始
     */
    public static void writeTextToFile(String text, String fileName, boolean append) {
        try {
            Writer write = new FileWriter(fileName, append);
            write.write(text);
            write.flush();
            write.close();
        } catch (IOException e) {
            BaseLogger.error(e.getMessage(), e);
        }
    }

    /**
     * 本方法主要用于将一个文件拷贝到另一个文件件
     *
     * @param from 源文件
     * @param to   目的文件
     * @return 返回字节数,-1:读文件错误，－2：文件未找到，-3： IO错误
     */
    public static int copyFile(String from, String to) {
        int n = 0;
        try {
            // copy 会自动关闭input,output.
            FileCopyUtils.copy(new File(from), new File(to));   //调用org.springframework.util;中的类方法
            /*System.out.println("now copy file from " + from + " to " + to);
            is = new FileInputStream(from);
            byte[] bts = new byte[is.available()];
            int len = bts.length;
            System.out.println("now open file");
            os = new FileOutputStream(to);
            System.out.println("now open file success");
            int len1 = is.read(bts, 0, bts.length);
            System.out.println("now start write file");
            os.write(bts, 0, bts.length);
            bts = null;
            n = len == len1 ? len : -1;*/
        } catch (FileNotFoundException fe) {
            BaseLogger.error(fe.getMessage(), fe);
            n = -2;
        } catch (IOException ie) {
            BaseLogger.error(ie.getMessage(), ie);
            n = -3;
        } catch (Exception e) {
            BaseLogger.error("", e);
            n = -1;
        }
        return n;
    }

    /**
     * 复制文件
     *
     * @param oldPath 源文件
     * @param newPath 目标文件名
     * @return 成功/失败
     */
    public static boolean copy(String oldPath, String newPath) {
        return copy(new File(oldPath), newPath, false);
    }

    /**
     * 复制/移动文件（夹）
     *
     * @param oldPath  旧文件
     * @param newPath  新文件
     * @param isDelOld 是否删除旧文件，删除相当于移动；
     * @return 是否删除成功
     */
    public static boolean copy(String oldPath, String newPath, boolean isDelOld) {
        File f = new File(oldPath);
        return copy(f, newPath, isDelOld);
    }

    /**
     * 复制/移动文件（夹）
     *
     * @param oldfile  源文件
     * @param newPath  新文件名
     * @param isDelOld 是否删除旧文件名（移动方式）
     * @return 成功/成败
     */
    public static boolean copy(File oldfile, String newPath, boolean isDelOld) {
        try {
            if (!oldfile.exists()) return true;
            if (oldfile.isFile()) return copyFile(oldfile, newPath, isDelOld);

            return copyDir(oldfile, newPath, isDelOld);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean copyFile(File oldfile, String newPath, boolean isDelOld) {
        if (!oldfile.exists()) return true;
        int byteread;
        try {
            InputStream inStream = new FileInputStream(oldfile);
            File f = new File(newPath);
            f.getParentFile().mkdirs();
            FileOutputStream fs = new FileOutputStream(newPath);
            try {
                byte[] buffer = new byte[1444];
                while ((byteread = inStream.read(buffer)) != -1) {
                    fs.write(buffer, 0, byteread);
                }
            } finally {
                fs.close();
                inStream.close();
            }
            if (isDelOld) oldfile.delete();
            return true;
        } catch (Exception e) {
            BaseLogger.error("复制文件失败。", e);
            return false;
        }
    }

    public static void copyFileToIcDir(String srcFileDir, String destFileDir) {
        String[] srcFiles = getFileNames(srcFileDir);
        try {
            if (srcFiles != null && srcFiles.length > 0) {
                for (String srcFile : srcFiles) {
                    if (!srcFile.endsWith(".zip")) {
                        copyFile(srcFileDir + "\\" + srcFile, destFileDir + "\\" + srcFile);
                    } //if
                } //for
            }
        } catch (Exception e) {
            e.printStackTrace();
            BaseLogger.error("拷贝文件出错！", e);
        }
    }

    public static boolean copyDir(File file, String newPath, boolean isDelOld) {
        if (newPath.endsWith(FSChar)) newPath += FSChar;
        makeDir(newPath);
        File[] files = file.listFiles();
        if (files != null && files.length > 0) {
            for (File temp : files) {
                if (temp.isFile()) {
                    if (!copyFile(temp, newPath + FSChar + getFullName(temp.getPath()), true)) return false;
                } else if (!copyDir(temp, newPath + FSChar + getFullName(temp.getPath()), true)) return false;
            }
        }
        return !isDelOld || delFile(file);
    }


    /**
     * 将输入流拷贝到输出流
     *
     * @param in  输入流
     * @param out 输出流
     * @throws IOException
     */
    public static int copyStream(InputStream in, OutputStream out) throws IOException {
        // 改为一次读取4096个字节.
        byte[] buf = new byte[4096];
        int byteCount = 0;
        int bytesRead;
        while ((bytesRead = in.read(buf, 0, buf.length)) != -1) {
            out.write(buf, 0, bytesRead);
            byteCount += bytesRead;
        }
        out.flush();
        return byteCount;
    }

    /**
     * 查找压缩文件
     *
     * @param bFlag      搜索位置标志 true：从左到右 false：从右到左
     * @param sSearchStr 要搜索的字符串
     *                   return 文件名
     */
    public static String SearchFile(String sSearchStr, boolean bFlag, String sFilePath) {
        try {
            String sFileName = "";
            String[] fls = getFileNames(sFilePath);
            if (fls != null && fls.length > 0) {
                for (String fl : fls) {
                    if (bFlag) {
                        if (fl.toLowerCase().contains(sSearchStr.toLowerCase())) {
                            sFileName = fl;
                            break;
                        }
                    } else {
                        if (fl.toLowerCase().lastIndexOf(sSearchStr.toLowerCase()) >= 0) {
                            sFileName = fl;
                            break;
                        }
                    }
                }
            }
            return sFileName;
        } catch (Exception e) {
            return "";
        }
    }


    /**
     * 创建文件路径
     *
     * @param baseDir 该目录所在的父目录
     * @param dirName 目录名
     * @return true-成功;False-不成功
     */
    public static boolean mkDir(String baseDir, String dirName) {
        return mkDir(baseDir + FSChar + dirName);
    }

    /**
     * 创建文件路径
     *
     * @param destDir 目录名
     * @return true-成功;False-不成功
     */
    public static boolean mkDir(String destDir) {
        boolean blRet = false;
        int idx = destDir.lastIndexOf(FSChar);
        if (idx == -1)
            throw new IllegalArgumentException("输入参数不是一个合法的路径");
        return new File(destDir).mkdirs();
    }

    //创建目录
    public static boolean makeDir(String path) {
        File f = new File(path);
        return f.exists() || f.mkdirs();
    }

    /**
     * 删除目录
     *
     * @param file 文件对象；
     */
    public static boolean delDir(File file) {
        File[] files = file.listFiles();
        if (files != null) {
            for (File temp : files) {
                if (temp.isFile()) {
                    if (!temp.delete()) return false;
                } else if (!delDir(temp)) return false;
            }
            return file.delete();
        }
        return true;
    }

    public static String refineFilePath(String fn) {
        String s = fn.replace('\\', File.separatorChar);
        s = s.replace('/', File.separatorChar);
        int i = s.indexOf("//");
        if (i > 0) s = s.substring(0, i) + s.substring(i + 1);
        i = s.indexOf("\\\\");
        if (i > 0) s = s.substring(0, i) + s.substring(i + 1);
        return s;

    }

    /**
     * 从fn中读取所有内容
     *
     * @param fn 源文件名
     * @return byte[]
     * @roseuid 3C297D710384
     */
    public static byte[] loadFromFile(String fn) {
        try {
            FileInputStream fis = new FileInputStream(fn);
            byte[] data = new byte[fis.available()];
            fis.read(data, 0, data.length);
            fis.close();
            return data;
        } catch (IOException e) {
            BaseLogger.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     * 从fn中读取所有内容
     *
     * @param fn 源文件名
     * @return byte[]
     * @roseuid 3C297D710384
     */
    public static byte[] loadFromFile(String fn, int size) {
        try {
            FileInputStream fis = new FileInputStream(fn);
            int avail = fis.available();
            byte[] data;
            if (avail > size) {
                data = new byte[size];
            } else {
                data = new byte[avail];
            }
            fis.read(data, 0, data.length);
            fis.close();
            return data;
        } catch (IOException e) {
            BaseLogger.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     * 从fn中读取所有内容
     *
     * @param fn 源文件名
     * @return byte[]
     * @roseuid 3C297D710384
     */
    public static byte[] loadFromFile(File fn) {
        try {
            FileInputStream fis = new FileInputStream(fn);
            byte[] data = new byte[fis.available()];
            fis.read(data, 0, data.length);
            fis.close();
            return data;
        } catch (IOException e) {
            BaseLogger.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     * 根据文件路径取得该文件路径下的所有文件：
     *
     * @param fp filePath
     * @return 存放文件的数组
     */
    public static File[] getFiles(String fp) {
        if (fp == null || fp.length() <= 2) {
            System.out.println("文件路径错误");
            return null;
        }
        File f = new File(fp);
        if (f.isFile()) {
            System.out.println("文件路径非文件夹");
            return new File[]{};
        }
        return f.listFiles();
    }

    /**
     * 根据文件路径取得该文件路径下的所有文件名称：
     *
     * @param filePath 路径
     * @return 存放文件名称的数组
     */
    public static String[] getFileNames(String filePath) {
        if (filePath == null || filePath.length() <= 2) {
            return null;
        }
        File f = new File(filePath);
        if (f.isFile()) {
            return null;
        }
        return f.list();
    }

    /**
     * 根据文件路径取得该文件路径下的所有文件名称：
     *
     * @param filePath 目录名
     * @param filters  过滤文件
     * @return list<String>
     */
    public static List<String> getFileNames(String filePath, String filters) {
        List<String> list = new ArrayList<String>();
        String[] files = getFileNames(filePath);
        if (files == null) {
            return list;
        }
        for (String file : files) {
            if (file.toLowerCase().endsWith(filters) || file.toUpperCase().endsWith(filters))
                list.add(file);
        }
        return list;
    }

    /**
     * filePath路径下是否存在文件fn
     *
     * @param fp 文件路径
     * @param fn 文件名称
     * @return 存放文件名称的数组
     */
    public static boolean isFileExist(String fp, String fn) {
        if (fp == null || fn == null) return false;
        String absPath;
        if (fp.endsWith("/") || fp.endsWith("\\")) {
            absPath = fp + fn;
        } else {
            absPath = fp + FSChar + fn;
        }
        return (new File(absPath)).exists();
    }

    /**
     * 文件fn是否存在
     *
     * @param fn fileName
     * @return boolean
     */
    public static boolean isFileExist(String fn) {
        return !(fn == null || fn.length() < 1) && (new File(fn)).exists();
    }

    /**
     * 获取父目录
     *
     * @param fan 全路径文件名
     * @return 父目录
     */
    public static String getParentPath(String fan) {
        try {
            String pp = fan;
            while (pp.lastIndexOf(FSChar) == (pp.length() - 1) || pp.lastIndexOf(File.separator) == (pp.length() - 1)) {
                pp = pp.substring(0, pp.length() - 2);
            }
            int idx = pp.lastIndexOf(FSChar);
            pp = pp.substring(0, idx);
            return pp;
        } catch (Exception e) {
            BaseLogger.error(e.getMessage(), e);
            return null;
        }

    }

    /**
     * 从输入流中所有内容到数组中
     *
     * @param is Description of Parameter
     * @return Description of the Returned Value
     */
    public static byte[] readToBytes(InputStream is) {
        byte buffer[];
        int SIZE = 1024 * 1024;
        ByteArrayOutputStream bao = null;
        try {
            bao = new ByteArrayOutputStream();

            buffer = new byte[SIZE];
            BufferedInputStream in = new BufferedInputStream(is, 1024 * 1024);
            int iBytes = 0;
            while (iBytes != -1) {
                iBytes = in.read(buffer, 0, SIZE);
                if (iBytes != -1) {
                    bao.write(buffer, 0, iBytes);
                }
            }
            return bao.toByteArray();
        } catch (IOException ex) {
            BaseLogger.error(ex.getMessage(), ex);
            return null;
        } finally {
            try {
                if (bao != null) bao.close();
            } catch (Exception ignored) {
            }
        }
    }

    /**
     * 读配置文件
     * searchstr="stic";
     * srcPath=".ini"
     */
    public static String ReadINI(String searchstr, String srcPath) {
        String str;
        String temp = null;
        BufferedReader br = null;
        searchstr = searchstr.toLowerCase();
        try {
            br = new BufferedReader(new InputStreamReader(new FileInputStream(srcPath)));
            str = br.readLine();
            while (str != null) {
                str = str.trim();
                if (str.length() > 0 && !str.startsWith("#")) {
                    if (str.toLowerCase().contains(searchstr)) {
                        temp = str.substring(str.indexOf("=") + 1);
                        temp = temp.replace('\\', '/');
                        break;
                    }
                }
                str = br.readLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) br.close();
            } catch (Exception ignored) {
            }
        }
        return temp;
    }

    /**
     * 检查文件名是否满足Windows风格的通配符<p>
     * 如*表示任意多个字符，？表示任意一个字符<p>
     *
     * @param fileName：原文件名
     * @param filters：      通配符(*.*,a?.exe,*.zip)
     * @return true false;
     */
    public static boolean checkFileNames(String fileName, String filters) {
        fileName = getRelativeFileName(fileName);
        if (fileName == null || filters == null)
            return false;
        String[] arr_filters = filters.split(",");
        //没有通配符，表示任意字符
        if (arr_filters == null || arr_filters.length == 0) return true;
        int len = arr_filters.length;
        String filter;
        for (String arr_filter : arr_filters) {
            filter = arr_filter;
            filter = filter.trim();
            //java中,"."表示任意字符
            filter = filter.replaceAll("\\.", "\\\\.");
            filter = filter.replaceAll("\\*", "\\.\\*");
            filter = filter.replace('?', '.');
            if (fileName.matches(filter)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取文件名（绝对路径）的相对文件名
     *
     * @param fileAbsoluteName 绝对路径
     * @return string
     */
    public static String getRelativeFileName(String fileAbsoluteName) {
        if (fileAbsoluteName == null)
            return null;
        int pos1 = fileAbsoluteName.lastIndexOf("\\");
        int pos2 = fileAbsoluteName.lastIndexOf("/");
        int pos = Math.max(pos1, pos2);
        if (pos == -1)
            return fileAbsoluteName;
        return fileAbsoluteName.substring(pos + 1);
    }

    /**
     * 拷贝下文件(非深层次拷贝)
     *
     * @param srcFileDir  源
     * @param destFileDir 目标
     * @return 有效的拷贝结果；
     */
    public static boolean copyDirFileToDir(String srcFileDir, String destFileDir) {
        String[] srcFiles = getFileNames(srcFileDir);
        try {
            if (srcFiles != null && srcFiles.length > 0) {
                for (String srcFile : srcFiles) {
                    copyFile(srcFileDir + "\\" + srcFile, destFileDir + "\\" + srcFile);
                }
                return true;
            }
        } catch (Exception e) {
            BaseLogger.error("拷贝文件出错！", e);
        }
        return false;
    }

    //不能用直接move的方式，在linux下会不起作用。windows下两个不同分区方式的盘之间也不行
    //    public static boolean move(File srcFile, String destPath) {
    //        // Destination directory
    //        File dir = new File(destPath);
    //        // Move file to new directory
    //        return srcFile.renameTo(new File(dir, srcFile.getName()));
    //    }
    //
    //    public static boolean move(String srcFile, String destPath) {
    //        // File (or directory) to be moved
    //        File file = new File(srcFile);
    //        // Destination directory
    //        File dir = new File(destPath);
    //        // Move file to new directory
    //        return file.renameTo(new File(dir, file.getName()));
    //    }
    //

    /**
     * 重命名，通过复制的方式
     */
    public static boolean renameTo(String srcFile, String destFile) {
        return copy(new File(srcFile), destFile, true);
    }

    /**
     * 重命名，直接rename，警告，如果想跨盘move，此方法在linux下可能会失败
     */
    public static boolean renameToEx(String srcFile, String destFile) {
        File f = new File(srcFile);
        if (!f.exists()) return false;
        File df = new File(destFile);
        return f.renameTo(df);
    }


    /**
     * 从文件全路径串中分离出有效的目录名称；
     *
     * @param filepath
     * @return 路径，以分隔符结束；
     */
    public static String getFullPath(String filepath) {
        int index = filepath.lastIndexOf(FSChar);
        if (index != -1) {
            return filepath.substring(0, index + 1);
        } else {
            return "";
        }
    }

    /**
     * 获取文件全名
     *
     * @param fileName 文件路
     * @return fullPathAndFullName
     */
    public static String getFullName(String fileName) {
        File f = new File(fileName);
        return f.getName();
    }

    /**
     * 获取文件名
     *
     * @param fullPathAndFullName 全路径文件名；
     * @return 文件名
     */
    public static String getName(String fullPathAndFullName) {
        String fullName = getFullName(fullPathAndFullName);
        int index = fullName.lastIndexOf(".");
        if (index != -1) {
            return fullName.substring(0, index);
        } else {
            return fullName;
        }
    }

    /**
     * 获取文件扩展名
     *
     * @param filepath
     * @return string
     */
    public static String getExtName(String filepath) {
        String fullName = getFullName(filepath);
        int index = fullName.lastIndexOf(".");
        if (index != -1) {
            return fullName.substring(index + 1, fullName.length());
        } else {
            return "";
        }
    }

    /**
     * 文件是否存在
     *
     * @param fileName
     * @return
     */
    public static boolean isFileExists(String fileName) {
        File f = new File(fileName);
        return f.exists();
    }

    //取得文件大小
    public static int getFileSize(File f) {
        if (f.exists()) {
            try {
                FileInputStream fis = new FileInputStream(f);
                try {
                    return fis.available();
                } finally {
                    fis.close();
                }
            } catch (IOException e) {
                return 0;
            }
        }
        return 0;
    }

    public static void main(String[] args) throws IOException {
//        copy("f:/temp/33/worklog_new1", "f:/temp/worklog_new", true);
        renameToEx("f:/temp/worklog_new1", "f:/temp/33/worklog_new1");
    }
}
