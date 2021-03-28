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

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `sys_permission`
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL COMMENT '资源名字',
  `type` varchar(32) DEFAULT NULL COMMENT '资源类型',
  `url` varchar(128) DEFAULT NULL COMMENT '访问url地址',
  `percode` varchar(128) DEFAULT NULL COMMENT '权限代码字符串',
  `parentid` bigint(20) DEFAULT NULL COMMENT '父节点id',
  `parentids` varchar(128) DEFAULT NULL COMMENT '父节点id列表串',
  `sortstring` varchar(128) DEFAULT NULL COMMENT '排序号',
  `available` char(1) DEFAULT NULL COMMENT '是否可用，1可用，0不可用',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `mender` bigint(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
DELETE FROM sys_permission;
INSERT INTO `sys_permission` VALUES ('1', '管理权限', NULL, NULL, NULL, '0', '0/', '0', '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('2', '用户管理', 'menu', 'admin/user/goList.vm', '', '9', '0/1/', '1.', '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('3', '用户添加', 'permission', 'admin/user/doAdd.vm', 'user:add', '2', '0/1/2/', NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('5', '用户修改', 'permission', 'admin/user/doEdit.vm', 'user:edit', '2', '0/1/2/', NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('6', '角色管理', 'menu', 'admin/role/goList.vm', NULL, '9', '0/1/', '2.', '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('7', '角色添加', 'permission', 'admin/role/doAdd.vm', 'role:add', '6', '0/1/6/', NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('8', '角色修改', 'permission', 'admin/role/doEdit.vm', 'role:edit', '6', '0/1/6/', NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('9', '系统管理', 'menu', NULL, NULL, '1', NULL, NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('10', '用户删除', 'permission', 'admin/user/doDelete.vm', 'user:delete', '2', '0/1/2/', NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_permission` VALUES ('11', '角色删除', 'permission', 'admin/role/delete.vm', 'role:delete', '6', '0/1/6/', NULL, '1', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `available` char(1) DEFAULT NULL,
  `code` varchar(50) not NULL DEFAULT NULL COMMENT '角色编码',
  `name` varchar(128) DEFAULT NULL COMMENT '角色名称',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `creater` bigint(20) DEFAULT NULL,
  `mender` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('3', null, '管理员', null, null, null, null);

-- ----------------------------
-- Table structure for `sys_role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sys_role_id` bigint(20) DEFAULT NULL,
  `sys_permission_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------
INSERT INTO `sys_role_permission` VALUES ('189', '3', '9');
INSERT INTO `sys_role_permission` VALUES ('190', '3', '2');
INSERT INTO `sys_role_permission` VALUES ('191', '3', '3');
INSERT INTO `sys_role_permission` VALUES ('192', '3', '5');
INSERT INTO `sys_role_permission` VALUES ('193', '3', '10');
INSERT INTO `sys_role_permission` VALUES ('194', '3', '6');
INSERT INTO `sys_role_permission` VALUES ('195', '3', '7');
INSERT INTO `sys_role_permission` VALUES ('196', '3', '8');
INSERT INTO `sys_role_permission` VALUES ('197', '3', '11');

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL COMMENT '登录用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '登录密码',
  `name` varchar(50) DEFAULT NULL COMMENT '姓名',
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL COMMENT '电话',
  `photo` varchar(200) DEFAULT NULL COMMENT '头像ID',
  `mobile` varchar(200) DEFAULT NULL COMMENT '手机',
  `login_ip` varchar(100) DEFAULT NULL COMMENT '登录ip',
  `last_date` datetime DEFAULT NULL COMMENT '最后登录时间',
  `error_count` SMALLINT DEFAULT NULL COMMENT '登录错误次数',
  `state` char(1) NOT NULL DEFAULT '0' COMMENT '用户状态默认0可以登录，1为不能登录',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `bz` varchar(255) DEFAULT NULL COMMENT '备注',
  `flag` char(1) DEFAULT '0' COMMENT '标记,0为正常，1为删除标记,2为锁定状态',
  `salt` varchar(64) DEFAULT NULL,
  `creater` bigint(20) DEFAULT NULL,
  `mender` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('30', 'admin', 'c1f9d28cd877af8d36c6f037d7e8f55e', '管理员', 'test@tes.com', null, '12312','', null, null, '0', null, 0, '2016-01-20 14:55:29', 'admin', '0', 'vilkjuye', null, '30');

-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sys_user_id` bigint(20) DEFAULT NULL,
  `sys_role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('21', '30', '3');

-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------