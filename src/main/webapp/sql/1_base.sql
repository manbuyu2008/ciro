# noinspection SqlNoDataSourceInspectionForFile
/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : jeeba

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-01-20 14:56:18
*/


-- ----------------------------
-- Table structure for `sys_permission`
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id`          BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(128)        DEFAULT NULL
  COMMENT '资源名字',
  `type`        VARCHAR(32)         DEFAULT NULL
  COMMENT '资源类型',
  `url`         VARCHAR(128)        DEFAULT NULL
  COMMENT '访问url地址',
  `percode`     VARCHAR(128)        DEFAULT NULL
  COMMENT '权限代码字符串',
  `parentid`    BIGINT(20)          DEFAULT NULL
  COMMENT '父节点id',
  `parentids`   VARCHAR(128)        DEFAULT NULL
  COMMENT '父节点id列表串',
  `sortstring`  VARCHAR(128)        DEFAULT NULL
  COMMENT '排序号',
  `available`   VARCHAR(20)         DEFAULT NULL
  COMMENT '是否可用，YES可用，NO不可用',
  `menu_icon`   VARCHAR(128)        DEFAULT NULL
  COMMENT '菜单图标',
  `create_date` DATETIME            DEFAULT NULL,
  `update_date` DATETIME            DEFAULT NULL,
  `creater`     BIGINT(20)          DEFAULT NULL
  COMMENT '创建人',
  `mender`      BIGINT(20)          DEFAULT NULL
  COMMENT '修改人',
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 24
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
DELETE FROM sys_permission;
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('1','管理权限',NULL,NULL,NULL,'0',NULL,'0','YES','icon-nav',NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('9','系统管理','menu',NULL,NULL,'1','0/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('2','用户管理','menu','admin/user/list.vm','','9','0/1/','1','YES','icon-users',NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('6','角色管理','menu','admin/role/list.vm',NULL,'9','0/1/','2','YES','icon-role',NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('3','用户添加修改','permission','admin/user/card.vm','user:edit','2','0/1/2/','2','YES',NULL,NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('10','用户删除','permission','admin/user/del.vm','user:del','2','0/1/2/','4','YES',NULL,NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('12','用户角色授权','permission','admin/user/custom.vm','user:grant','2','0/1/2/','3','YES',NULL,NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('13','用户数据查询','permission','admin/user/list.vm','user:query','2','0/1/2/','1','YES',NULL,NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('7','角色添加修改','permission','admin/role/card.vm','role:edit','6','0/1/6/','2','YES',NULL,NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('11','角色删除','permission','admin/role/del.vm','role:del','6','0/1/6/','4','YES',NULL,NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('14','角色数据查询','permission','admin/role/list.vm','role:query','6','0/1/6/','1','YES',NULL,NULL,NULL,NULL,NULL);
insert into `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) values('15','角色菜单授权','permission','admin/Role/saveRole.vm','role:grant','6','0/1/6/','3','YES',NULL,NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('20','部门管理','menu','admin/dept/list.vm','','9','0/1/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('21','部门添加修改','permission','admin/dept/card.vm','dept:edit','20','0/1/20/','2','YES',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('22','部门删除','permission','admin/dept/del.vm','dept:del','20','0/1/20/','3','YES',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('23','部门数据查询','permission','admin/dept/list.vm','dept:query','20','0/1/20/','1','YES',NULL,NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('30','基础信息管理','menu',NULL,NULL,'1','0/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('31','考评参数配置','menu','admin/param/card.vm','','30','0/30/','11','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('32','考评参数维护','permission','','sysParam:edit','31','0/30/31/','21','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('40','考评类型管理','menu','eval/userType/list.vm','','30','0/30/','31','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('41','考评类型查询','permission','','evalUserType:query','40','0/30/40/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('42','考评类型添加修改','permission','','evalUserType:edit','40','0/30/40/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('43','考评类型删除','permission','','evalUserType:del','40','0/30/40/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('50','考评等级管理','menu','eval/evalLevel/list.vm','','30','0/30/','41','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('51','考评等级查询','permission','','evalLevel:query','50','0/30/50/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('52','考评等级添加修改','permission','','evalLevel:edit','50','0/30/50/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('53','考评等级删除','permission','','evalLevel:del','50','0/30/50/','3','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('59','日常医德行为加分标准','menu','eval/evalStd/list.vm?status=0','','30','0/30/','51','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('55','加分标准查询','permission','','evalStd:query0','59','0/30/59/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('56','加分标准添加修改','permission','','evalStd:edit0','59','0/30/59/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('57','加分标准删除','permission','','evalStd:del0','59','0/30/59/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('60','日常医德行为减分标准','menu','eval/evalStd/list.vm?status=1','','30','0/30/','61','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('61','减分标准查询','permission','','evalStd:query1','60','0/30/60/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('62','减分标准添加修改','permission','','evalStd:edit1','60','0/30/60/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('63','减分标准删除','permission','','evalStd:del1','60','0/30/60/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('65','一票认定较差标准标准','menu','eval/evalStd/list.vm?status=2','','30','0/30/','71','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('66','标准查询','permission','','evalStd:query2','65','0/30/65/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('67','标准添加修改','permission','','evalStd:edit2','65','0/30/65/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('68','标准删除','permission','','evalStd:del2','65','0/30/65/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('69','考评管理','menu',NULL,NULL,'1','0/','3','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('70','考评期间管理','menu','eval/evalZq/list.vm','','69','0/69/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('71','考评期间查询','permission','','evalZq:query','70','0/69/70/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('72','考评期间添加修改','permission','','evalZq:edit','70','0/69/70/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('73','考评期间删除','permission','','evalZq:del','70','0/69/70/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('79','考评档案管理','menu',NULL,NULL,'1','0/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('80','科室考评档案管理','menu','eval/evalEvent/list.vm?status=ks','','79','0/79/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('81','科室考评档案查询','permission','','evalEvent:query_ks','80','0/79/80/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('82','科室考评档案添加修改','permission','','evalEvent:edit_ks','80','0/79/80/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('83','科室考评档案删除','permission','','evalEvent:del_ks','80','0/79/80/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('90','大科考评档案管理','menu','eval/evalEvent/list.vm?status=dk','','79','0/79/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('91','大科考评档案查询','permission','','evalEvent:query_dk','90','0/79/90/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('92','大科考评档案添加修改','permission','','evalEvent:edit_dk','90','0/79/90/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('93','大科考评档案删除','permission','','evalEvent:del_dk','90','0/79/90/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('100','单位考评档案管理','menu','eval/evalEvent/list.vm?status=dw','','79','0/79/','3','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('101','单位考评档案查询','permission','','evalEvent:query_dw','100','0/79/100/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('102','单位考评档案添加修改','permission','','evalEvent:edit_dw','100','0/79/100/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('103','单位考评档案删除','permission','','evalEvent:del_dw','100','0/79/100/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('110','考评档案审核','menu','eval/evalEvent/listSh.vm','','79','0/79/','3','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('111','档案审核','permission','','evalEvent:sh','110','0/79/110/','1','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('120','考评流程设置','menu','eval/evalFlow/list.vm','','30','0/30/','15','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('121','流程设置查询','permission','','evalFlow:query','120','0/30/120/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('122','流程设置添加修改','permission','','evalFlow:edit','120','0/30/120/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('123','流程设置删除','permission','','evalFlow:del','120','0/30/120/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('130','个人自评','menu','eval/evalBaseInfo/listSelf.vm','','69','0/69/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('131','自评维护','permission','','evalSelf:edit','130','0/69/130/','1','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('140','科室考评','menu','eval/evalBaseInfo/listKs.vm','','69','0/69/','3','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('141','科室考评维护','permission','','evalKs:edit','140','0/69/140/','1','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('150','大科总支考评','menu','eval/evalBaseInfo/listDk.vm','','69','0/69/','4','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('151','大科考评维护','permission','','evalDk:edit','150','0/69/150/','1','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('160','单位考评','menu','eval/evalBaseInfo/listDw.vm','','69','0/69/','5','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('161','单位考评维护','permission','','evalDw:edit','160','0/69/160/','1','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('170','报表管理','menu',NULL,NULL,'1','0/','5','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('171','单位考评统计表','menu','eval/report/reportDwSum.vm','','170','0/170/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('172','单位考评统计表查看','permission','','reportDwSum:query','171','0/170/171/','1','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('180','单位考评构成图','menu','eval/report/reportDwPie.vm','','170','0/170/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('181','单位考评构成图查看','permission','','reportDwPie:query','180','0/170/180/','1','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('190','单位考评统计查询','menu','eval/report/reportDw.vm','','170','0/170/','3','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('191','单位考评统计查询查看','permission','','reportDw:query','190','0/170/190/','1','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('200','科室考评统计查询','menu','eval/report/reportKs.vm','','170','0/170/','4','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('201','科室考评统计查询查看','permission','','reportKs:query','200','0/170/200/','1','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('210','人员考评明细查询','menu','eval/report/reportUser.vm','','170','0/170/','5','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('211','人员考评明细查询查看','permission','','reportUser:query','210','0/170/210/','1','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('230','是否考评考评分析','menu','eval/report/reportDwData.vm','','170','0/170/','7','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('231','是否考评考评分析查看','permission','','reportDwData:query','230','0/170/230/','1','YES','icon-nav',NULL,NULL,NULL,NULL);


INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('240','考评基础分项目','menu','eval/evalSelfScoreStd/list.vm','','30','0/30/','51','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('241','考评基础分项目查询','permission','','evalSelfScoreStd:query','240','0/30/240/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('242','考评基础分项目添加修改','permission','','evalSelfScoreStd:edit','240','0/30/240/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('243','考评基础分项目删除','permission','','evalSelfScoreStd:del','240','0/30/240/','3','YES','icon-nav',NULL,NULL,NULL,NULL);

INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('250','考评评语模板','menu','eval/evalComment/list.vm','','30','0/30/','61','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('251','考评评语模板查询','permission','','evalComment:query','250','0/30/250/','1','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('252','考评评语模板添加修改','permission','','evalComment:edit','250','0/30/250/','2','YES','icon-nav',NULL,NULL,NULL,NULL);
INSERT INTO `sys_permission` (`id`, `name`, `type`, `url`, `percode`, `parentid`, `parentids`, `sortstring`, `available`, `menu_icon`, `create_date`, `update_date`, `creater`, `mender`) VALUES('253','考评评语模板删除','permission','','evalComment:del','250','0/30/250/','3','YES','icon-nav',NULL,NULL,NULL,NULL);



-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id`          BIGINT(20)  NOT NULL AUTO_INCREMENT,
  `code`        VARCHAR(50) NOT NULL
  COMMENT '角色编码',
  `name`        VARCHAR(128)         DEFAULT NULL
  COMMENT '角色名称',
  `level`       VARCHAR(128)         DEFAULT NULL
  COMMENT '用户等级',
  `data_level`  VARCHAR(128)         DEFAULT NULL
  COMMENT '数据权限',
  `create_date` DATETIME             DEFAULT NULL,
  `update_date` DATETIME             DEFAULT NULL,
  `creater`     BIGINT(20)           DEFAULT NULL,
  `mender`      BIGINT(20)           DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 19
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
DELETE FROM sys_role;
insert into `sys_role` (`id`, `code`, `name`, `level`, `data_level`, `create_date`, `update_date`, `creater`, `mender`) values('3','admin','管理员','sys','40',NULL,NULL,NULL,NULL);
insert into `sys_role` (`id`, `code`, `name`, `level`, `data_level`, `create_date`, `update_date`, `creater`, `mender`) values('4','normal','一般人员','sys','10',NULL,NULL,NULL,NULL);
insert into `sys_role` (`id`, `code`, `name`, `level`, `data_level`, `create_date`, `update_date`, `creater`, `mender`) values('5','ks','科室主任','sys','30',NULL,'2016-12-03 13:59:11',NULL,'30');
insert into `sys_role` (`id`, `code`, `name`, `level`, `data_level`, `create_date`, `update_date`, `creater`, `mender`) values('6','dk','大科主任','sys','30',NULL,NULL,NULL,NULL);
insert into `sys_role` (`id`, `code`, `name`, `level`, `data_level`, `create_date`, `update_date`, `creater`, `mender`) values('7','dw','单位负责人','sys','40',NULL,NULL,NULL,NULL);

-- ----------------------------
-- Table structure for `sys_role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `id`                BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sys_role_id`       BIGINT(20)          DEFAULT NULL,
  `sys_permission_id` BIGINT(20)          DEFAULT NULL,
  `status` VARCHAR(20)          DEFAULT '1',
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 198
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------
DELETE FROM sys_role_permission;
INSERT INTO `sys_role_permission` VALUES ('189', '3', '9','1');
INSERT INTO `sys_role_permission` VALUES ('190', '3', '2','1');
INSERT INTO `sys_role_permission` VALUES ('191', '3', '3','1');
INSERT INTO `sys_role_permission` VALUES ('192', '3', '5','1');
INSERT INTO `sys_role_permission` VALUES ('193', '3', '10','1');
INSERT INTO `sys_role_permission` VALUES ('194', '3', '6','1');
INSERT INTO `sys_role_permission` VALUES ('195', '3', '7','1');
INSERT INTO `sys_role_permission` VALUES ('197', '3', '11','1');
INSERT INTO `sys_role_permission` VALUES ('198', '3', '12','1');
INSERT INTO `sys_role_permission` VALUES ('199', '3', '13','1');
INSERT INTO `sys_role_permission` VALUES ('200', '3', '14','1');
INSERT INTO `sys_role_permission` VALUES ('201', '3', '20','1');
INSERT INTO `sys_role_permission` VALUES ('202', '3', '21','1');
INSERT INTO `sys_role_permission` VALUES ('203', '3', '22','1');
INSERT INTO `sys_role_permission` VALUES ('204', '3', '23','1');
INSERT INTO `sys_role_permission` VALUES ('205', '3', '15','1');
INSERT INTO `sys_role_permission` VALUES ('210', '3', '30','1');
INSERT INTO `sys_role_permission` VALUES ('211', '3', '31','1');
INSERT INTO `sys_role_permission` VALUES ('212', '3', '32','1');

INSERT INTO `sys_role_permission` VALUES ('220', '3', '40','1');
INSERT INTO `sys_role_permission` VALUES ('221', '3', '41','1');
INSERT INTO `sys_role_permission` VALUES ('222', '3', '42','1');
INSERT INTO `sys_role_permission` VALUES ('223', '3', '43','1');

INSERT INTO `sys_role_permission` VALUES ('230', '3', '50','1');
INSERT INTO `sys_role_permission` VALUES ('231', '3', '51','1');
INSERT INTO `sys_role_permission` VALUES ('232', '3', '52','1');
INSERT INTO `sys_role_permission` VALUES ('233', '3', '53','1');

INSERT INTO `sys_role_permission` VALUES ('234', '3', '59','1');
INSERT INTO `sys_role_permission` VALUES ('235', '3', '57','1');
INSERT INTO `sys_role_permission` VALUES ('236', '3', '55','1');
INSERT INTO `sys_role_permission` VALUES ('237', '3', '56','1');

INSERT INTO `sys_role_permission` VALUES ('240', '3', '60','1');
INSERT INTO `sys_role_permission` VALUES ('241', '3', '61','1');
INSERT INTO `sys_role_permission` VALUES ('242', '3', '62','1');
INSERT INTO `sys_role_permission` VALUES ('243', '3', '63','1');

INSERT INTO `sys_role_permission` VALUES ('245', '3', '65','1');
INSERT INTO `sys_role_permission` VALUES ('246', '3', '66','1');
INSERT INTO `sys_role_permission` VALUES ('247', '3', '67','1');
INSERT INTO `sys_role_permission` VALUES ('248', '3', '68','1');

INSERT INTO `sys_role_permission` VALUES ('250', '3', '69','1');
INSERT INTO `sys_role_permission` VALUES ('251', '3', '70','1');
INSERT INTO `sys_role_permission` VALUES ('252', '3', '71','1');
INSERT INTO `sys_role_permission` VALUES ('253', '3', '72','1');
INSERT INTO `sys_role_permission` VALUES ('254', '3', '73','1');

INSERT INTO `sys_role_permission` VALUES ('260', '3', '79','1');
INSERT INTO `sys_role_permission` VALUES ('261', '3', '80','1');
INSERT INTO `sys_role_permission` VALUES ('262', '3', '81','1');
INSERT INTO `sys_role_permission` VALUES ('263', '3', '82','1');
INSERT INTO `sys_role_permission` VALUES ('264', '3', '83','1');

INSERT INTO `sys_role_permission` VALUES ('271', '3', '90','1');
INSERT INTO `sys_role_permission` VALUES ('272', '3', '91','1');
INSERT INTO `sys_role_permission` VALUES ('273', '3', '92','1');
INSERT INTO `sys_role_permission` VALUES ('274', '3', '93','1');

INSERT INTO `sys_role_permission` VALUES ('281', '3', '100','1');
INSERT INTO `sys_role_permission` VALUES ('282', '3', '101','1');
INSERT INTO `sys_role_permission` VALUES ('283', '3', '102','1');
INSERT INTO `sys_role_permission` VALUES ('284', '3', '103','1');

INSERT INTO `sys_role_permission` VALUES ('291', '3', '110','1');
INSERT INTO `sys_role_permission` VALUES ('292', '3', '111','1');

INSERT INTO `sys_role_permission` VALUES ('301', '3', '120','1');
INSERT INTO `sys_role_permission` VALUES ('302', '3', '121','1');
INSERT INTO `sys_role_permission` VALUES ('303', '3', '122','1');
INSERT INTO `sys_role_permission` VALUES ('304', '3', '123','1');

INSERT INTO `sys_role_permission` VALUES ('310', '3', '130','1');
INSERT INTO `sys_role_permission` VALUES ('311', '3', '131','1');

INSERT INTO `sys_role_permission` VALUES ('320', '3', '140','1');
INSERT INTO `sys_role_permission` VALUES ('321', '3', '141','1');

INSERT INTO `sys_role_permission` VALUES ('330', '3', '150','1');
INSERT INTO `sys_role_permission` VALUES ('331', '3', '151','1');

INSERT INTO `sys_role_permission` VALUES ('340', '3', '160','1');
INSERT INTO `sys_role_permission` VALUES ('341', '3', '161','1');

INSERT INTO `sys_role_permission` VALUES ('350', '3', '170','1');
INSERT INTO `sys_role_permission` VALUES ('351', '3', '171','1');
INSERT INTO `sys_role_permission` VALUES ('352', '3', '172','1');

INSERT INTO `sys_role_permission` VALUES ('360', '3', '180','1');
INSERT INTO `sys_role_permission` VALUES ('361', '3', '181','1');

INSERT INTO `sys_role_permission` VALUES ('370', '3', '190','1');
INSERT INTO `sys_role_permission` VALUES ('371', '3', '191','1');

INSERT INTO `sys_role_permission` VALUES ('380', '3', '200','1');
INSERT INTO `sys_role_permission` VALUES ('381', '3', '201','1');

INSERT INTO `sys_role_permission` VALUES ('390', '3', '210','1');
INSERT INTO `sys_role_permission` VALUES ('391', '3', '211','1');

INSERT INTO `sys_role_permission` VALUES ('410', '3', '230','1');
INSERT INTO `sys_role_permission` VALUES ('411', '3', '231','1');

INSERT INTO `sys_role_permission` VALUES ('420', '3', '240','1');
INSERT INTO `sys_role_permission` VALUES ('421', '3', '241','1');
INSERT INTO `sys_role_permission` VALUES ('422', '3', '242','1');
INSERT INTO `sys_role_permission` VALUES ('423', '3', '243','1');

INSERT INTO `sys_role_permission` VALUES ('430', '3', '250','1');
INSERT INTO `sys_role_permission` VALUES ('431', '3', '251','1');
INSERT INTO `sys_role_permission` VALUES ('432', '3', '252','1');
INSERT INTO `sys_role_permission` VALUES ('433', '3', '253','1');
-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id`            BIGINT(20)  NOT NULL AUTO_INCREMENT,
  `dept_id`       BIGINT(20)  NOT NULL
  COMMENT ' 部门ID',
  `admin_dept_id` VARCHAR(200)         DEFAULT NULL
  COMMENT '管理部门',
  `username`      VARCHAR(100)         DEFAULT NULL
  COMMENT '登录用户名',
  `password`      VARCHAR(100)         DEFAULT NULL
  COMMENT '登录密码',
  `name`          VARCHAR(50)          DEFAULT NULL
  COMMENT '姓名',
  `email`         VARCHAR(200)         DEFAULT NULL,
  `phone`         VARCHAR(200)         DEFAULT NULL
  COMMENT '电话',
  `photo`         VARCHAR(200)         DEFAULT NULL
  COMMENT '头像',
  skin   VARCHAR(200) NULL  COMMENT '选择的皮肤' ,
  `mobile`        VARCHAR(200)         DEFAULT NULL
  COMMENT '手机',
  `login_ip`      VARCHAR(100)         DEFAULT NULL
  COMMENT '登录ip',
  `last_date`     DATETIME             DEFAULT NULL
  COMMENT '最后登录时间',
  `error_count`   SMALLINT             DEFAULT NULL
  COMMENT '登录错误次数',
  `state`         VARCHAR(20) NOT NULL DEFAULT 'YES'
  COMMENT '用户状态默认YES可以登录，1为不能登录',
  `create_date`   DATETIME             DEFAULT NULL
  COMMENT '创建时间',
  `update_date`   DATETIME             DEFAULT NULL
  COMMENT '更新时间',
  `bz`            VARCHAR(255)         DEFAULT NULL
  COMMENT '备注',
  `flag`          VARCHAR(20)          DEFAULT 'NORMAL'
  COMMENT '标记,NORMAL为正常，DEL为删除标记,LOCK为锁定状态',
  `salt`          VARCHAR(64)          DEFAULT NULL,
  `creater`       BIGINT(20)           DEFAULT NULL,
  `mender`        BIGINT(20)           DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 68
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('30', 1, '1', 'admin', 'bea51036603bc79f4890a3a12545dc96', '管理员',
                                     'test@tes.com', NULL, '12312', NULL, NULL, NULL, '0', 'YES',
                                                                                0, '2016-01-20 14:55:29', 'admin',
                                                                                'NORMAL', 'vilkjuye', NULL, '30');


DROP TABLE IF EXISTS `SYS_DEPT`;
CREATE TABLE SYS_DEPT
(
  ID         BIGINT(20)          NOT NULL AUTO_INCREMENT,
  CODE       VARCHAR(20)         NOT NULL
  COMMENT '编码',
  NAME       VARCHAR(255)        NOT NULL
  COMMENT '名称',
  PARENT_ID  VARCHAR(20) COMMENT '上级部门',
  LEVEL_NUM  BIGINT(9) DEFAULT 0 NOT NULL
  COMMENT '级次',
  LEVEL_CODE VARCHAR(255)        NOT NULL
  COMMENT '级次编码',
  DEPT_TYPE  VARCHAR(60) COMMENT '部门性质',
  STATUS     VARCHAR(60) COMMENT '状态',
  STOP_INFO  VARCHAR(60) COMMENT '停用信息',
  STOP_TIME  VARCHAR(20) COMMENT '停用时间',
  REMARK     VARCHAR(255) COMMENT '备注',
  PRIMARY KEY (`id`)
)
  ENGINE = INNODB
  AUTO_INCREMENT = 100
  DEFAULT CHARSET = utf8;
-- Add comments to the table
ALTER TABLE SYS_DEPT
COMMENT '部门';
ALTER TABLE SYS_DEPT
ADD CONSTRAINT U_SYS_DEPT UNIQUE (CODE);

INSERT INTO `sys_dept` (`ID`, `CODE`, `NAME`, `PARENT_ID`, `LEVEL_NUM`,
                        `LEVEL_CODE`, `DEPT_TYPE`, `STATUS`, `STOP_INFO`, `STOP_TIME`, `REMARK`)
VALUES ('1', '001', '人民医院', '-', '0', '1', NULL, 'NORMAL', NULL, NULL, NULL);
INSERT INTO `sys_dept` (`ID`, `CODE`, `NAME`, `PARENT_ID`, `LEVEL_NUM`,
                        `LEVEL_CODE`, `DEPT_TYPE`, `STATUS`, `STOP_INFO`, `STOP_TIME`, `REMARK`)
VALUES ('2', '001-01', '人事部', '1', '1', '1-2', NULL, 'NORMAL', NULL, NULL, NULL);

INSERT INTO `sys_dept` (`ID`, `CODE`, `NAME`, `PARENT_ID`, `LEVEL_NUM`,
                        `LEVEL_CODE`, `DEPT_TYPE`, `STATUS`, `STOP_INFO`, `STOP_TIME`, `REMARK`)
VALUES ('3', '001-02', '财务部', '1', '1', '1-3', NULL, 'NORMAL', NULL, NULL, NULL);
-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id`          BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sys_user_id` BIGINT(20)          DEFAULT NULL,
  `sys_role_id` BIGINT(20)          DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 22
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('21', '30', '3');


create table SYS_PARAM
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  NAME        VARCHAR(100) null comment '参数名',
  VALUE       VARCHAR(800) null comment '参数值',
  TYPE        VARCHAR(255) not null comment '类别',
  REMARK        VARCHAR(255) null comment '说明',
  PRIMARY KEY (`id`)
);
ALTER TABLE  SYS_PARAM
comment '系统参数';
alter table SYS_PARAM
add constraint U_SYS_PARAM_NAME unique (NAME);



CREATE TABLE TBL_FILE_INFO
(
  ID             BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
  NAME           VARCHAR(255) NOT NULL COMMENT '名称',
  SUFFIX         VARCHAR(20) NOT NULL COMMENT '后缀',
  FILE_SIZE      BIGINT(20) NOT NULL COMMENT '文件大小',
  SAVE_NAME      VARCHAR(255) DEFAULT '' NOT NULL COMMENT '保存名称',
  PATH           VARCHAR(255) DEFAULT '' NOT NULL COMMENT '相对地址',
  FILE_URL       VARCHAR(255) DEFAULT '' NOT NULL COMMENT '访问相对地址',
  ADD_TIME TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00'  COMMENT '创建时间',
  UPDATE_TIME TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  CREATER BIGINT(20) DEFAULT NULL COMMENT '创建人',
  MENDER BIGINT(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
)
ENGINE = INNODB
AUTO_INCREMENT = 100
DEFAULT CHARSET = utf8;


-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------
ALTER TABLE `sys_user`
ADD COLUMN `postName` VARCHAR(100) NULL
COMMENT '职称';
ALTER TABLE `sys_user`
ADD COLUMN `sex` VARCHAR(20) NULL
COMMENT '性别'
AFTER `postName`,
ADD COLUMN `birthdate` DATETIME NULL
COMMENT '出生日期'
AFTER `sex`;
ALTER TABLE `sys_user`
ADD COLUMN `stopTime` DATETIME NULL
COMMENT '停用时间'
AFTER `mobile`,
ADD COLUMN `stopInfo` VARCHAR(200) NULL
COMMENT '停用信息'
AFTER `stopTime`;
ALTER TABLE `sys_user`
ADD COLUMN `to_eval` VARCHAR(20) NULL
COMMENT '是否考评'
AFTER `photo`,
ADD COLUMN `eval_type` BIGINT(20) NULL
COMMENT '考评类别'
AFTER `to_eval`;
ALTER TABLE `sys_user`
ADD COLUMN `eval_dept` BIGINT(20) NULL  COMMENT '自评部门' AFTER `to_eval`;

