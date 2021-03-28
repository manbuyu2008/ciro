
create table TBL_EVAL_USER_TYPE
(
  ID           bigint(20) not null AUTO_INCREMENT comment '主键' ,
  TYPE_CODE   VARCHAR(60) not null comment '人员类型编码',
  TYPE_NAME   VARCHAR(255) not null comment '人员类型名称',
  FLOW_ID     BIGINT(20) NULL  COMMENT '考评流程',
  REMARK      VARCHAR(255) null comment '备注',
  PRIMARY KEY (`id`)
)
;
ALTER TABLE  TBL_EVAL_USER_TYPE
comment '人员考评类别';

CREATE TABLE TBL_EVAL_LEVEL
(
  ID          BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
  CODE        VARCHAR(60) NOT NULL COMMENT '考评等级编码',
  NAME        VARCHAR(255) NOT NULL COMMENT '考评等级名称',
  BEGIN_SCORE DECIMAL(10,2) DEFAULT 0 NOT NULL COMMENT '分值范围开始',
  END_SCORE   DECIMAL(10,2) DEFAULT 0 NOT NULL COMMENT '分值范围结束',
  REMARK      VARCHAR(255) NULL COMMENT '备注',
  ADD_TIME TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00'  COMMENT '创建时间',
  UPDATE_TIME TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  CREATER BIGINT(20) DEFAULT NULL COMMENT '创建人',
  MENDER BIGINT(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_LEVEL
COMMENT '考评等级标准表';

create table TBL_EVAL_STD
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  CODE        VARCHAR(60) not null comment '标准编码',
  NAME        VARCHAR(255) not null comment '标准名称',
  REMARK      VARCHAR(255) null comment '备注',
  STATUS      VARCHAR(20) default '' not null comment '加减分分类',
  EVENT_TYPE      VARCHAR(20) default ''  null comment '类型',
  BEGIN_SCORE DECIMAL(10,2) default 0 comment '分值范围开始',
  END_SCORE   DECIMAL(10,2) default 0  comment '分值范围结束',
  SCORE_MAX   DECIMAL(10,2) default 1000  comment '分数最大值',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
)
;
ALTER TABLE  TBL_EVAL_STD
comment '考评加减分标准基础表';


create table TBL_EVAL_ZQ
(
  ID            bigint(20) not null AUTO_INCREMENT comment '主键' ,
  CODE          VARCHAR(60) not null comment '期间编码',
  NAME          VARCHAR(255) not null comment '期间名称',
  CYCLE_TYPE    VARCHAR(20) default '' not null comment '期间类型',
  USER_TYPE   VARCHAR(255) null comment '考评类别',
  EVAL_TYPE       VARCHAR(20) not null comment '考评类型',
  SCORE       DECIMAL(10,2) default 0 comment '初始分数',
  SCORE_MAX           VARCHAR(20) default '' not null comment '是否启用考评分数上线',
  BEGIN_DATE    VARCHAR(60) not null comment '期间开始时间',
  END_DATE      VARCHAR(60) not null comment '期间截至时间',
  EVENT_BEGIN   VARCHAR(60) not null comment '事件开始时间',
  EVENT_END     VARCHAR(60) not null comment '事件截至时间',
  GRZP_BEGIN    VARCHAR(20) not null comment '个人自评开始时间',
  GRZP_END      VARCHAR(20) not null comment '个人自评结束时间',
  KSEVAL_BEGIN    VARCHAR(20) not null comment '科室考评开始时间',
  KSEVAL_END      VARCHAR(20) not null comment '科室考评结束时间',
  DKEVAL_BEGIN    VARCHAR(20) not null comment '大科室考评开始时间',
  DKEVAL_END      VARCHAR(20) not null comment '大科室考评结束时间',
  DWEVAL_BEGIN    VARCHAR(20) not null comment '单位考评开始时间',
  DWEVAL_END      VARCHAR(20) not null comment '单位考评结束时间',
  REMARK        VARCHAR(255) null comment '备注',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人' ,
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_ZQ
comment '考评期间管理';

create  TABLE TBL_EVAL_EVENT
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  USER_ID      VARCHAR(60) not null comment '人员',
  KS_ID       VARCHAR(20) not null comment '科室ID',
  TYPE_ID     VARCHAR(20) not null comment '事件类型',
  STD_ID       VARCHAR(20) not null comment '评价标准ID',
  EVENT_NAME     VARCHAR(255) not null comment '事件名称',
  EVENT_DATE     timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '时间',
  SCORE       DECIMAL(10,2) default 0 comment '分数',
  STATUS      VARCHAR(20) default '' comment '档案分类',
  IS_SH       VARCHAR(20) default '' comment '审核状态',
  SH_RESULT   VARCHAR(20) default '' comment '审核结果',
  QR_SCORE    DECIMAL(10,2) default 0 comment '确认分数',
  SH_REMARK   VARCHAR(500) null comment '审核意见',
  FILE_URL     VARCHAR(255) null comment '附件',
  REMARK      VARCHAR(255) null comment '备注',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
)
;
ALTER TABLE TBL_EVAL_EVENT
comment '考评事件，用于人员日常考评记录';

create table TBL_EVAL_FLOW
(
  ID           bigint(20) not null AUTO_INCREMENT comment '主键' ,
  NAME          VARCHAR(60) not null comment '流程名称',
  DETAIL         VARCHAR(20) default '' not null comment '（启停）自评考评明细',
  KS_EVAL         VARCHAR(20) default '' not null comment '（启停）科室考评',
  KS_ROLE     VARCHAR(255) null comment '科室考评角色',
  KS_NOTE         VARCHAR(255) default '' comment '科室考评说明',
  DK_EVAL         VARCHAR(20) default '' not null comment '（启停）大科总支考评',
  DK_ROLE     VARCHAR(255) null comment '大科总支角色',
  DK_NOTE         VARCHAR(20) default '' comment '大科考评说明',
  CORP_EVAL          VARCHAR(20) default '' not null comment '（启停）单位考评',
  CORP_IDS       VARCHAR(500) null comment '单位选择（支持多选）',
  CORP_ROLE       VARCHAR(255) null comment '单位考评角色',
  CORP_NOTE         VARCHAR(255) default '' comment '单位考评说明',
  REMARK        VARCHAR(255) null comment '备注',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
)
;
ALTER TABLE  TBL_EVAL_FLOW
comment '考评流程设置';

create  TABLE TBL_EVAL_BASE_INFO
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  period_id       VARCHAR(20) not null comment '考评期间ID',
  KS          VARCHAR(20) not null comment '部门(科室)ID',
  USER_ID   bigint(20) not null comment '被考评人员ID',
  SEX         VARCHAR(20) default '' not null comment '被考评人员性别',
  NL          INT(3) default 0 not null comment '被考评人员年龄',
  ZC          VARCHAR(60) not null comment '被考评人员职称',
  SELF_ADVICE     TEXT null comment '自我评价内容',
  SELF_DATE   timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '自评日期',
  SELF_LV        VARCHAR(20) null comment '自评等次',
  SELF_SCORE  DECIMAL(10,2) default 0 comment '自评考评分',
  KS_USER_ID   bigint(20)  null comment '科室考评人员ID',
  KS_ADVICE    TEXT null comment '科室考评意见',
  KS_DATE  timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '科室考评时间',
  KS_LV        VARCHAR(20) null comment '科室考评等次',
  KS_SCORE  DECIMAL(10,2) default 0 comment '科室考评分',
  DK_USER_ID   bigint(20)  null comment '大科室考评人员ID',
  DK_ADVICE    TEXT null comment '大科考评意见',
  DK_DATE  timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '大科考评时间',
  DK_LV        VARCHAR(20) null comment '大科考评等次',
  DK_SCORE  DECIMAL(10,2) default 0 comment '大科考评分',
  DW_USER_ID   bigint(20)  null comment '单位考评人员ID',
  CORP_ADVICE    TEXT null comment '单位考评意见',
  CORP_DATE   timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '单位考评时间',
  CORP_LV        VARCHAR(20) null comment '单位考评等次',
  CORP_SCORE  DECIMAL(10,2) default 0 comment '单位考评分',
  EVAL_LV       VARCHAR(20) null comment '考评等次ID',
  SCORE       DECIMAL(10,2) default 0,
  FLOW_ID     BIGINT(20) NULL  COMMENT '流程ID',
  STATUS     INT(3) DEFAULT 0  NOT NULL  COMMENT '流程状态',
  create_date timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  update_date timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人' ,
  PRIMARY KEY (`id`)
)
;
ALTER TABLE TBL_EVAL_BASE_INFO
comment '考评主表(基础信息+单位考评信息)';

CREATE TABLE TBL_EVAL_SELF_ENUM
(
  ID           BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
  PARENT_ID   VARCHAR(20) NOT NULL COMMENT '主表ID',
  EVENT_DATE  VARCHAR(255) NULL  COMMENT '时间',
  CONTENT     VARCHAR(255) NULL COMMENT '学习内容',
  XS          VARCHAR(255) NULL COMMENT '形式',
  JB          VARCHAR(255) NULL COMMENT '级别',
  create_date TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00'  COMMENT '创建时间',
  update_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  CREATER BIGINT(20) DEFAULT NULL COMMENT '创建人',
  MENDER BIGINT(20) DEFAULT NULL COMMENT '修改人' ,
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_SELF_ENUM
COMMENT '个人考评明细项';

CREATE TABLE `tbl_eval_event_enum` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `PARENT_ID` varchar(20) NOT NULL COMMENT '主表ID',
  `TYPE` varchar(20) NOT NULL DEFAULT '' COMMENT '事件类型',
  `STD_ID` varchar(20) DEFAULT NULL COMMENT '标准ID',
  `EVENT_DATE` timestamp NULL DEFAULT NULL COMMENT '事件时间',
  `EVENT_NAME` varchar(255) DEFAULT NULL COMMENT '事件名称',
  `EVENT_XS` varchar(50) DEFAULT NULL COMMENT '形式',
  `EVENT_JB` varchar(50) DEFAULT NULL COMMENT '级别',
  `SCORE` decimal(10,2) DEFAULT '0.00',
  `FILE_URL` varchar(255) DEFAULT NULL COMMENT '附件ID',
  `EVENT_ID` bigint(20) DEFAULT NULL COMMENT '事件ID',
  `STATUS` varchar(20) DEFAULT NULL COMMENT '考评类型',
  `create_date` timestamp NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `update_date` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `CREATER` bigint(20) DEFAULT NULL COMMENT '创建人',
  `MENDER` bigint(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='考评明细项，包括科室考评、大科考评、单位考评';

CREATE TABLE TBL_EVAL_SELF_SCORE_STD
(
  ID             BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
  CODE           VARCHAR(20) NOT NULL COMMENT '项目编码',
  NAME           VARCHAR(255) NOT NULL COMMENT '项目名称',
  SCORE          DECIMAL(10,2) DEFAULT 0 NOT NULL COMMENT '分值',
  USER_TYPE_ID VARCHAR(20) NOT NULL COMMENT '人员类型ID',
  ADD_TIME TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00'  COMMENT '创建时间',
  UPDATE_TIME TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  CREATER BIGINT(20) DEFAULT NULL COMMENT '创建人',
  MENDER BIGINT(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_SELF_SCORE_STD
COMMENT '基础分值明细项目-展示';

create table tbl_eval_comment
(
  ID         bigint(20) not null AUTO_INCREMENT comment '主键' ,
  NAME        VARCHAR(200) not null comment '评语模板名称',
  COMMENT     VARCHAR(4000) not null comment '评语',
  DID       VARCHAR(200) not null comment '考评等级',
  STATUS     VARCHAR(20) not null comment '分类',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  tbl_eval_comment
comment '评语模板';

