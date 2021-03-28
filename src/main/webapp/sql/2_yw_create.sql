create table TBL_EVAL_SELF_SCORE_STD
(
  ID             bigint(20) not null AUTO_INCREMENT comment '主键' ,
  CODE           VARCHAR(20) not null comment '项目编码',
  NAME           VARCHAR(255) not null comment '项目名称',
  SCORE          DECIMAL(10,2) default 0 not null comment '分值',
  USER_TYPE_ID VARCHAR(20) not null comment '人员类型ID',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_SELF_SCORE_STD
comment '基础分值明细项目-展示';

create table TBL_EVAL_FAIL_STD
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  CODE        VARCHAR(60) not null comment '编码',
  NAME        VARCHAR(500) not null comment '名称',
  REMARK      VARCHAR(500) comment '备注',
  STATUS      VARCHAR(20) default '' not null comment '类型',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_FAIL_STD
comment '一票较差和组织评价标准';


create table TBL_EVAL_COMMENT
(
  ID       bigint(20) not null AUTO_INCREMENT comment '主键' ,
  DID       VARCHAR(20) not null comment '考评等级ID',
  BEGIN_SCORE DECIMAL(10,2) default 0 not null comment '分值范围开始',
  END_SCORE   DECIMAL(10,2) default 0 not null comment '分值范围结束',
  TYPE     VARCHAR(20) default '' not null comment '考评类型',
  COMMENT  VARCHAR(4000) not null comment '评语',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_COMMENT
comment '考评评语库';


create table TBL_EVAL_SELF_ENUM
(
  ID           bigint(20) not null AUTO_INCREMENT comment '主键' ,
  PARENT_ID   VARCHAR(20) not null comment '主表ID',
  EVENT_DATE   timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '时间',
  CONTENT     VARCHAR(255) null comment '学习内容',
  XS          VARCHAR(255) null comment '形式',
  JB          VARCHAR(255) null comment '级别',
  create_date timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  update_date timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人' ,
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_SELF_ENUM
comment '个人考评明细项';

create table TBL_EVAL_INFO_ENUM
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  PARENT_ID   VARCHAR(20) not null comment '主表ID',
  STD_ID  VARCHAR(20) null comment '标准ID',
  SELF_SCORE  DECIMAL(10,2) default 0 comment '自评考评分',
  KS_SCORE  DECIMAL(10,2) default 0 comment '科室考评分',
  DK_SCORE  DECIMAL(10,2) default 0 comment '大科考评分',
  CORP_SCORE  DECIMAL(10,2) default 0 comment '单位考评分',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_INFO_ENUM
comment '考评明细项-根据考评基础项评分';

create table TBL_EVAL_EVENT_ENUM
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  PARENT_ID   VARCHAR(20) not null comment '主表ID',
  TYPE        VARCHAR(20) default '' not null comment '考评类型',
  STD_ID  VARCHAR(20) null comment '标准ID',
  SCORE       DECIMAL(10,2) default 0,
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
);
ALTER TABLE  TBL_EVAL_EVENT_ENUM
comment '考评明细项，包括科室考评、大科考评、单位考评';




create table TBL_EVAL_GRADE_LIMIT
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  TYPE        VARCHAR(1) not null comment '限制类型',
  CYCLE_ID    VARCHAR(20) null comment '期间ID',
  KSEVAL_YX     INT(3) default 100 not null comment '科室优秀上限',
  KSEVAL_LH     INT(3) default 100 not null comment '科室良好上限',
  KSEVAL_YB     INT(3) default 100 not null comment '科室一般上限',
  KSEVAL_JC     INT(3) default 100 not null comment '科室较差上限',
  DKEVAL_YX     INT(3) default 100 not null comment '大科室优秀上限',
  DKEVAL_LH     INT(3) default 100 not null comment '大科室良好上限',
  DKEVAL_YB     INT(3) default 100 not null comment '大科室一般上限',
  DKEVAL_JC     INT(3) default 100 not null comment '大科室较差上限',
  DWEVAL_YX     INT(3) default 100 not null comment '单位优秀上限',
  DWEVAL_LH     INT(3) default 100 not null comment '单位良好上限',
  DWEVAL_YB     INT(3) default 100 not null comment '单位一般上限',
  DWEVAL_JC     INT(3) default 100 not null comment '单位较差上限',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人',
  PRIMARY KEY (`id`)
)
;
ALTER TABLE  TBL_EVAL_GRADE_LIMIT
comment '考评等级比例限制';


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


create table TBL_EVAL_PERSONTYPE_FLOW
(
  ID             bigint(20) not null AUTO_INCREMENT comment '主键' ,
  USER_TYPE_ID VARCHAR(20) not null comment '人员类型ID',
  FLOW_ID        VARCHAR(20) not null comment '考评流程ID',
  REMARK         VARCHAR(255) null comment '备注' ,
  PRIMARY KEY (`id`)
)
;
ALTER TABLE  TBL_EVAL_PERSONTYPE_FLOW
comment '考评流程分配表';
alter table TBL_EVAL_PERSONTYPE_FLOW
add constraint U_TBL_EVAL_PERSONTYPE_FLOW unique (USER_TYPE_ID);

create table TBL_EVAL_USER_EXTEND
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  TYPE_ID  VARCHAR(20) null comment '人员类型ID',
  SFKP         VARCHAR(20) default 1 not null comment '是否考评',
  ZP_DEPT_ID   VARCHAR(20) null comment '自评部门',
  ZP_DEPT_NOTE VARCHAR(100) null comment '部门备注',
  PRIMARY KEY (`id`)
)
;
ALTER TABLE  TBL_EVAL_USER_EXTEND
comment '人员扩展表';

create table TBL_EVAL_USER_NOTE
(
  ID        bigint(20) not null AUTO_INCREMENT comment '主键' ,
  USER      VARCHAR(50) not null comment '便签人',
  DATE        VARCHAR(19) not null comment '便签时间',
  CONTENT     VARCHAR(500) not null comment '便签内容',
  PRIMARY KEY (`id`)
)
;
ALTER TABLE  TBL_EVAL_USER_NOTE
comment '便签';






create  TABLE TBL_EVAL_BASE_INFO
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  ND_ID       VARCHAR(20) not null comment '考评期间ID',
  KS          VARCHAR(20) not null comment '部门(科室)ID',
  USER_ID   VARCHAR(20) not null comment '被考评人员ID',
  SEX         VARCHAR(20) default '' not null comment '被考评人员性别',
  NL          INT(3) default 0 not null comment '被考评人员年龄',
  ZC          VARCHAR(60) not null comment '被考评人员职称',
  SELF_ADVICE     VARCHAR(4000) null comment '自我评价内容',
  SELF_DATE  timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '自评日期',
  SELF_LV        VARCHAR(20) null comment '自评等次',
  SELF_SCORE  DECIMAL(10,2) default 0 comment '自评考评分',
  KS_ADVICE     VARCHAR(4000) null comment '科室考评意见',
  KS_DATE  timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '科室考评时间',
  KS_LV        VARCHAR(20) null comment '科室考评等次',
  KS_SCORE  DECIMAL(10,2) default 0 comment '科室考评分',
  DK_ADVICE     VARCHAR(4000) null comment '大科考评意见',
  DK_DATE  timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '大科考评时间',
  DK_LV        VARCHAR(20) null comment '大科考评等次',
  DK_SCORE  DECIMAL(10,2) default 0 comment '大科考评分',
  CORP_ADVICE     VARCHAR(4000) null comment '单位考评意见',
  CORP_DATE   timestamp NULL DEFAULT '0000-00-00 00:00:00' comment '单位考评时间',
  CORP_LV        VARCHAR(20) null comment '单位考评等次',
  CORP_SCORE  DECIMAL(10,2) default 0 comment '单位考评分',
  EVAL_LV       VARCHAR(20) null comment '考评等次ID',
  SCORE       DECIMAL(10,2) default 0,
  STATUS      VARCHAR(20) default 0 not null comment '流程状态',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人' ,
  PRIMARY KEY (`id`)
)
;
ALTER TABLE TBL_EVAL_BASE_INFO
comment '考评主表(基础信息+单位考评信息)';

create  TABLE TBL_EVAL_CK_INFO
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  PARENT_ID   VARCHAR(20) not null comment '考评主表ID',
  TYPE        VARCHAR(20) default '' not null comment '考评类型',
  JF          DECIMAL(10,2) default 0 comment '加分',
  KF          DECIMAL(10,2) default 0 comment '扣分',
  CK_SCORE    DECIMAL(10,2) default 0  comment '分数',
  ADD_TIME timestamp NULL DEFAULT '0000-00-00 00:00:00'  comment '创建时间',
  UPDATE_TIME timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
  CREATER bigint(20) DEFAULT NULL comment '创建人',
  MENDER bigint(20) DEFAULT NULL comment '修改人' ,
  PRIMARY KEY (`id`)
)
;
ALTER TABLE TBL_EVAL_CK_INFO
comment '考评信息(科室考评、大科室考评)';




create  TABLE TBL_EVAL_EVENT_TYPE
(
  ID          bigint(20) not null AUTO_INCREMENT comment '主键' ,
  CODE        VARCHAR(60) not null comment '分类编码',
  NAME        VARCHAR(255) not null comment '分类名称',
  REMARK      VARCHAR(255) null comment '备注' ,
  PRIMARY KEY (`id`)
)
;
ALTER TABLE TBL_EVAL_EVENT_TYPE
comment '考评事件分类';


insert into TBL_EVAL_USER_SYSTYPE (ID, NAME, STATUS)
values ('1', '在职人员', 1);
commit;

insert into TBL_EVAL_USER_TYPE (ID, TYPE_CODE, TYPE_NAME, REMARK)
values ('13450833052100100',  '01', '员工考核', null);


insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('101',  '101', '积极参加各种突发事件的抢救、救灾、舍己救人，受同级卫生主管部门表彰 ', '积极参加各种突发事件的抢救、救灾、舍己救人，受同级卫生主管部门表彰 ', 0, 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('102',  '102', '积极参加各种突发事件的抢救、救灾、舍己救人，受市级表彰', '积极参加各种突发事件的抢救、救灾、舍己救人，受市级表彰', 0,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('201',  '201', '被评为单位先进工作者', '被评为单位先进工作者', 0,'NORMAL', 3, 3, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('301',  '301', '被评为同级卫生主管部门先进工作者', '被评为同级卫生主管部门先进工作者', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('302',  '302', '被评为市级先进工作者', '被评为市级先进工作者', 0,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('303',  '303', '被评为国家级先进工作者', '被评为国家级先进工作者', 0,'NORMAL', 20, 20, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('401',  '401', '被评为市级劳模', '被评为市级劳模', 0,'NORMAL', 15, 15, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('402',  '402', '被评为国家级劳模', '被评为国家级劳模', 0,'NORMAL', 20, 20, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('501',  '501', '医德伦理和业务知识考试95分以上者', '医德伦理和业务知识考试95分以上者', 0,'NORMAL', 2, 2, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('502',  '502', '医德伦理和业务知识考试100分以上者', '医德伦理和业务知识考试100分以上者', 0,'NORMAL', 3, 3, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('601',  '601', '受到单位、病人及家属来信表扬或病人赠送锦旗给个人', '受到单位、病人及家属来信表扬或病人赠送锦旗给个人', 0,'NORMAL', 3, 3, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('602',  '602', '受到单位、病人及家属来信表扬或病人赠送锦旗给集体', '受到单位、病人及家属来信表扬或病人赠送锦旗给集体', 0,'NORMAL', 1, 1, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('701',  '701', '受到市级以上报刊点名表扬个人', '受到市级以上报刊点名表扬个人', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('702',  '702', '受到市级以上报刊点名表扬集体', '受到市级以上报刊点名表扬集体', 0,'NORMAL', 2, 2, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('801',  '801', '检举他人有收受回扣、开单提成或收受病人财物不上缴或乱收费等腐败行为和不正之风，且检举情况属实', '检举他人有收受回扣、开单提成或收受病人财物不上缴或乱收费等腐败行为和不正之风，且检举情况属实', 0,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('901',  '901', '拒收红包、回扣、财物、有价证券、不接受病人吃请或拾金不昧等好人好事，并有登记为依据', '拒收红包、回扣、财物、有价证券、不接受病人吃请或拾金不昧等好人好事，并有登记为依据', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1001',  '1001', '同违法违纪行为作斗争，受医院表彰', '同违法违纪行为作斗争，受医院表彰', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1101',  '1101', '纠正他人因违反保守医密和保护性医疗制度而挽回不良影响者', '纠正他人因违反保守医密和保护性医疗制度而挽回不良影响者', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1201',  '1201', '在工作中，责任心强，工作负责而避免他人出现医疗差错或责任事故', '在工作中，责任心强，工作负责而避免他人出现医疗差错或责任事故', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1301',  '1301', '科室获集体荣誉称号', '科室获集体荣誉称号', 0,'NORMAL', 2, 2, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1401',  '1401', '有发明创造或开展新项目新技术填补医院空白', '有发明创造或开展新项目新技术填补医院空白', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1402',  '1402', '有发明创造或开展新项目新技术填补本市空白', '有发明创造或开展新项目新技术填补本市空白', 0,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1403',  '1403', '有发明创造或开展新项目新技术填补国内空白', '有发明创造或开展新项目新技术填补国内空白', 0,'NORMAL', 20, 20, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1501',  '1501', '凡获市级科技成果奖且为课题完成者', '凡获市级科技成果奖且为课题完成者', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1502',  '1502', '凡获国家级科技成果奖且为课题完成者', '凡获国家级科技成果奖且为课题完成者', 0,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1601',  '1601', '论文或译文在市级杂志刊登或会议发表者', '论文或译文在市级杂志刊登或会议发表者', 0,'NORMAL', 2, 2, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('1602',  '1602', '论文或译文在国家级杂志刊登或会议发表者', '论文或译文在国家级杂志刊登或会议发表者', 0,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2101',  '2101', '被投诉服务态度差，经核查属实的', '被投诉服务态度差，经核查属实的', 1,'NORMAL', 3, 3, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2102',  '2102', '被投诉服务态度差，经核查属实，造成不良影响的', '被投诉服务态度差，经核查属实，造成不良影响的', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2103',  '2103', '被投诉服务态度差，经核查属实，性质恶劣，影响单位形象的', '被投诉服务态度差，经核查属实，性质恶劣，影响单位形象的', 1,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2201',  '2201', '无故不参加政治理论和业务知识学习，不接受职业道德教育（每次扣2分）', '无故不参加政治理论和业务知识学习，不接受职业道德教育（每次扣2分）', 1,'NORMAL', 2, 2, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2301',  '2301', '礼貌待人，仪表整洁，戴证上岗（每次扣2分）', '礼貌待人，仪表整洁，戴证上岗（每次扣2分）', 1,'NORMAL', 2, 2, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2401',  '2401', '对待病人有厚此薄彼现象，被投诉经核查属实', '对待病人有厚此薄彼现象，被投诉经核查属实', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2501',  '2501', '未履行好告知义务和服务承诺，造成不良后果', '未履行好告知义务和服务承诺，造成不良后果', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2601',  '2601', '工作中发生的问题解决不及时或敷衍、回避造成严重后果', '工作中发生的问题解决不及时或敷衍、回避造成严重后果', 1,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2701',  '2701', '与服务对象发生吵架或有冷、硬、顶、推现象，属首次且经教育认识态度好的', '与服务对象发生吵架或有冷、硬、顶、推现象，属首次且经教育认识态度好的', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2702',  '2702', '与服务对象发生吵架或有冷、硬、顶、推现象，屡教不改的', '与服务对象发生吵架或有冷、硬、顶、推现象，屡教不改的', 1,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2801',  '2801', '工作不负责任，造成群众上访控告，经查证属实', '工作不负责任，造成群众上访控告，经查证属实', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('2901',  '2901', '超范围或私自外出体检、手术', '超范围或私自外出体检、手术', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21001',  '21001', '泄露病人隐私或秘密，未造成不良影响者', '泄露病人隐私或秘密，未造成不良影响者', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21002',  '21002', '泄露病人隐私或秘密，造成不良影响者', '泄露病人隐私或秘密，造成不良影响者', 1,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21101',  '21101', '不按时完成任务或不服从工作安排', '不按时完成任务或不服从工作安排', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21201',  '21201', '同志间闹不团结，影响工作', '同志间闹不团结，影响工作', 1,'NORMAL', 3, 3, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21202',  '21202', '同志间闹不团结，造成不良影响', '同志间闹不团结，造成不良影响', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21301',  '21301', '学术上不尊重别人，故意诋毁他人名誉，造成不良影响', '学术上不尊重别人，故意诋毁他人名誉，造成不良影响', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21401',  '21401', '工作中出现一般差错者', '工作中出现一般差错者', 1,'NORMAL', 5, 5, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21402',  '21402', '工作中出现较大差错者', '工作中出现较大差错者', 1,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21403',  '21403', '工作中出现严重差错属事故者', '工作中出现严重差错属事故者', 1,'NORMAL', 20, 20, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21501',  '21501', '因工作拖延，虽未构成差错，但影响诊断治疗', '因工作拖延，虽未构成差错，但影响诊断治疗', 1,'NORMAL', 10, 10, 1000);
insert into TBL_EVAL_STD (ID, CODE, NAME, REMARK, STATUS,EVENT_TYPE, BEGIN_SCORE, END_SCORE, SCORE_MAX)
values ('21601',  '21601', '不遵守技术规则，给病人开假医疗证明', '不遵守技术规则，给病人开假医疗证明', 1,'NORMAL', 10, 10, 1000);

insert into TBL_EVAL_EVENT_TYPE (ID, CODE, NAME, REMARK)
values ('13445801023600100',  '01', '表扬，加分，激励', null, null, 0);
insert into TBL_EVAL_EVENT_TYPE (ID, CODE, NAME, REMARK)
values ('13445808062040100',  '02', '扣分', null, null, 0);

