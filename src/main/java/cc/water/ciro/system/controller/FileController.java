package cc.water.ciro.system.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.util.BusinessNumberUtil;
import cc.water.ciro.common.util.DateUtil;
import cc.water.ciro.common.util.FileUploadUtils;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.FileUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UserUtil;
import cc.water.ciro.common.utils.UtilDownloadFile;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.init.SysParam;
import cc.water.ciro.system.domain.FileInfo;
import cc.water.ciro.system.service.FileInfoService;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Controller
@RequestMapping("/front/file/")
public class FileController extends ListController<FileInfo> {

    @Autowired
    private FileInfoService fileInfoService;
    @Autowired
    private SystemConfig systemConfig;
    // 临时文件路径
    private String dirTemp = "/resource/temp/";
    private static List<String> fileOutTypeList = new ArrayList<String>();

    static {
        fileOutTypeList.add(".exe");
        fileOutTypeList.add(".com");
        fileOutTypeList.add(".cgi");
        fileOutTypeList.add(".asp");
        fileOutTypeList.add(".php");
        fileOutTypeList.add(".jsp");
        fileOutTypeList.add(".vm");
    }

    @RequestMapping("fileDel.vm")
    @ResponseBody
    public void fileDel(HttpServletRequest request, HttpServletResponse response,
                        Model model) {
        // 文件保存目录路径
        String savePath = systemConfig.getFilePath();
        try {
            String fileId =  request.getParameter("fileId");
            if (StringUtil.isNotEmpty(fileId)) {
                FileInfo fileInfo = fileInfoService.getFileInfoByKey(Long.valueOf(fileId));
                if (fileInfo != null) {
                    String saveFilePath = savePath + File.separator + fileInfo.getPath() + File.separator + fileInfo.getSaveName() + fileInfo.getSuffix();
                    FileUtil.removeFile(saveFilePath);
                    fileInfoService.deleteFileInfoByKey(Long.valueOf(fileId));
                }
            }
            setResult(true, "删除附件成功");
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("fileDown.vm")
    public void fileDown(HttpServletRequest request, HttpServletResponse response,
                         Model model) {
        // 文件保存目录路径
        String savePath = systemConfig.getFilePath();
        try {
            String fileId = request.getParameter("fileId");
            if (StringUtil.isNotEmpty(fileId)) {
                FileInfo fileInfo = fileInfoService.getFileInfoByKey(Long.valueOf(fileId));
                if (fileInfo != null) {
                    String saveFilePath = savePath + File.separator + fileInfo.getPath() + File.separator + fileInfo.getSaveName() + fileInfo.getSuffix();
                    File file = new File(saveFilePath);
                    if (file != null) {
                        UtilDownloadFile.downfileEx(response, saveFilePath, fileInfo.getName() + fileInfo.getSuffix());
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
    }

    @RequestMapping("fileUpload.vm")
    @ResponseBody
    protected void fileUpload(HttpServletRequest request, HttpServletResponse response,
                              Model model) throws IOException {
        String fileId = "";
        Long fileSize = null;
        String filePath = "";
        String fileSaveName = "";
        String fileUrl = "";
        // 文件保存目录路径
        String savePath = systemConfig.getFilePath();
        // 临时文件目录
        String tempPath = SysParam.getWebRootPath() + dirTemp;
        // 创建临时文件夹
        File dirTempFile = new File(tempPath);
        if (!dirTempFile.exists()) {
            dirTempFile.mkdirs();
        }
        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(5 * 1024 * 1024); // 设定使用内存超过5M时，将产生临时文件并存储于临时目录中。
        factory.setRepository(new File(tempPath));  // 设定存储临时文件的目录。
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setHeaderEncoding("UTF-8");
        try {
            List<?> items = upload.parseRequest(request);
            Iterator<?> itr = items.iterator();
            String userId = "";
            FileInfo fileInfo = new FileInfo();
            while (itr.hasNext()) {
                FileItem item = (FileItem) itr.next();
                String fileName = item.getName();
                if (fileName != null) {
                    String endstr = fileName.substring(fileName.lastIndexOf("."), fileName.length());
                    if (fileOutTypeList.contains(endstr.toLowerCase())) {
                        setResult(false, "文件类型不支持！");
                        return;
                    }
                    if (!item.isFormField()) {
                        try {
                            String date = DateUtil.simpleFormatYmd(new Date());
                            filePath = date;
                            fileSaveName = new SimpleHash("md5", BusinessNumberUtil.gainNumber(), (Object) null, 2).toHex();
                            String saveFilePath = savePath + File.separator + filePath;
                            savePath = savePath + File.separator + filePath + File.separator + fileSaveName + endstr;
                            fileUrl = File.separator + filePath + File.separator + fileSaveName + endstr;
                            FileUtil.makeDirectory(saveFilePath);
                            File uploadedFile = new File(saveFilePath, fileSaveName + endstr);
                            OutputStream os = new FileOutputStream(uploadedFile);
                            InputStream is = item.getInputStream();
                            fileSize = Long.valueOf(is.available());
                            byte buf[] = new byte[5999];// 可以修改 1024 以提高读取速度
                            int length = 0;
                            while ((length = is.read(buf)) > 0) {
                                os.write(buf, 0, length);
                            }
                            // 关闭流
                            os.flush();
                            os.close();
                            is.close();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        String fileNames = fileName.substring(0, fileName.indexOf("."));
                        fileInfo.setFileSize(fileSize);
                        fileInfo.setName(fileNames);
                        fileInfo.setSuffix(endstr);
                        fileInfo.setPath(filePath);
                        fileInfo.setSaveName(fileSaveName);
                        fileInfo.setFileUrl(fileUrl);
                        fileInfo.setAddTime(new Date());
                    }

                } else if (item.isFormField()) {
                    if (item.getFieldName().equals("userId")) {//前台的参数传递的名字，
                        userId = item.getString(); //获得表单参数！！！！！
                        fileInfo.setCreater(NumberUtil.parseLong(userId));
                    }
                }
            }
            fileInfoService.addFileInfo(fileInfo);
            fileId = String.valueOf(fileInfo.getId());
        } catch (FileUploadException e) {
            logger.error("文件上传异常，异常信息：{}", e.toString(), e);
            setResult(false, "文件上传异常");
            return;
        }
        context.getResponseParams().put("fileId", fileId);
        setResult(true, "文件上传成功");
    }


//    public String up() throws Exception {
//        try {
//            UtilPage e = this.context.getUtilPage();
//            if(e.getLoginInfo() == null) {
//                throw new Exception("登录信息失效，请重新登录再试。");
//            }
//
//            if(!this.upload.exists()) {
//                throw new Exception("文件为空，不允许上传。");
//            }
//
//            boolean isNew = UtilPub.isEmpty(this.getAttachId());
//            if(isNew) {
//                this.attachId = PKGenerator.getNewKey();
//            }
//
//            this.attachName = this.uploadFileName;
//            String attachSuffix = this.attachName.substring(this.attachName.lastIndexOf("."));
//            this.remoteAttachName = this.attachId + attachSuffix;
//            int fileSize = UtilFile.getFileSize(this.upload);
//            this.attachSizeStr = AttachHelper.getSizeStr(fileSize);
//            if(UtilPub.isEmpty(this.savePath)) {
//                AttachUtil.saveAttach(this.remoteAttachName, UtilFile.FSChar + this.path, this.upload.getPath(), true);
//                AttachManagerDao.updateAttach(this.attachId, this.uploadFileName, attachSuffix, this.ownerId, this.path, this.type, fileSize, isNew);
//            } else {
//                String filePath;
//                if("-".equals(this.savePath)) {
//                    filePath = this.upload.getAbsolutePath();
//                } else {
//                    filePath = this.savePath + UtilDateEx.nowDateTimeString() + UtilFile.FSChar + this.attachName;
//                    UtilFile.copy(this.upload, filePath, true);
//                }
//
//                this.context.getResponseParams().put("filePath", filePath);
//                if(UtilPub.isNotEmpty(this.afterDoClass)) {
//                    IDoAfterUpload idau = (IDoAfterUpload)Class.forName(this.afterDoClass).newInstance();
//                    idau.doWork(filePath, this.attachId, this.context);
//                }
//            }
//
//            this.errmsg = "";
//        } catch (Exception var7) {
//            UtilLogger.error("上传文件失败", var7);
//            this.errmsg = UtilPub.getOrigMsg(var7);
//        }
//
//        return "success";
//    }
//
//    public String down() throws Exception {
//        AttachBean attach;
//        try {
//            attach = AttachManagerDao.getAttachInfoByAttachId(this.attachId);
//        } catch (Exception var7) {
//            UtilLogger.error("获取附件失败(id=" + this.attachId + ")", var7);
//            throw new Exception("获取附件失败(id=" + this.attachId + ")");
//        }
//
//        if(attach == null) {
//            throw new Exception("附件不存在(id=" + this.attachId + ")");
//        } else {
//            String remoteFileName = attach.remoteName;
//            String fileName = attach.attachName;
//            String remotePath = attach.getRemotePath();
//
//            try {
//                AttachUtil.downloadAttach(remotePath, remoteFileName, fileName, this.context.getResponse());
//            } catch (Exception var6) {
//                var6.printStackTrace();
//            }
//
//            return null;
//        }
//    }
//
//    public String showImg() throws Exception {
//        AttachBean attach;
//        try {
//            attach = AttachManagerDao.getAttachInfoByAttachId(this.attachId);
//        } catch (Exception var7) {
//            UtilLogger.error("获取附件失败(id=" + this.attachId + ")", var7);
//            throw new Exception("获取附件失败(id=" + this.attachId + ")");
//        }
//
//        if(attach == null) {
//            throw new Exception("附件不存在(id=" + this.attachId + ")");
//        } else {
//            String remoteFileName = attach.remoteName;
//            String fileName = attach.attachName;
//            String remotePath = attach.getRemotePath();
//
//            try {
//                AttachUtil.downloadAttach(remotePath, remoteFileName, fileName, this.context.getResponse());
//            } catch (Exception var6) {
//                var6.printStackTrace();
//            }
//
//            return null;
//        }
//    }
//
//    public String del() {
//        try {
//            AttachHelper.deleteOneAttach(this.attachId);
//            this.setResult(true);
//        } catch (Exception var2) {
//            UtilLogger.error("删除附件失败", var2);
//            this.setResult(false, var2);
//        }
//
//        return "JSON";
//    }


}
