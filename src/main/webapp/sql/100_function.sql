SET GLOBAL log_bin_trust_function_creators = 1;
DROP FUNCTION IF EXISTS `F_PINYIN`;
DELIMITER ;;
CREATE FUNCTION `F_PINYIN`(in_string VARCHAR(255)) RETURNS VARCHAR(255) CHARSET utf8
BEGIN
DECLARE tmp_str VARCHAR(255) CHARSET gbk DEFAULT '' ; #截取字符串，每次做截取后的字符串存放在该变量中，初始为函数参数in_string值
DECLARE tmp_len SMALLINT DEFAULT 0;#tmp_str的长度
DECLARE tmp_char VARCHAR(2) CHARSET gbk DEFAULT '';#截取字符，每次 left(tmp_str,1) 返回值存放在该变量中
DECLARE tmp_rs VARCHAR(255) CHARSET gbk DEFAULT '';#结果字符串
DECLARE tmp_cc VARCHAR(2) CHARSET gbk DEFAULT '';#拼音字符，存放单个汉字对应的拼音首字符
SET tmp_str = in_string;#初始化，将in_string赋给tmp_str
SET tmp_len = LENGTH(tmp_str);#初始化长度
WHILE tmp_len > 0 DO #如果被计算的tmp_str长度大于0则进入该while
SET tmp_char = LEFT(tmp_str,1);#获取tmp_str最左端的首个字符，注意这里是获取首个字符，该字符可能是汉字，也可能不是。
SET tmp_cc = tmp_char;#左端首个字符赋值给拼音字符
IF LENGTH(tmp_char)>1 THEN#判断左端首个字符是多字节还是单字节字符，要是多字节则认为是汉字且作以下拼音获取，要是单字节则不处理。
SELECT ELT(INTERVAL(CONV(HEX(tmp_char),16,10),0xB0A1,0xB0C5,0xB2C1,0xB4EE,0xB6EA,0xB7A2,0xB8C1,0xB9FE,0xBBF7,0xBFA6,0xC0AC
,0xC2E8,0xC4C3,0xC5B6,0xC5BE,0xC6DA,0xC8BB,0xC8F6,0xCBFA,0xCDDA ,0xCEF4,0xD1B9,0xD4D1),
'A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z') INTO tmp_cc; #获得汉字拼音首字符
END IF;
SET tmp_rs = CONCAT(tmp_rs,tmp_cc);#将当前tmp_str左端首个字符拼音首字符与返回字符串拼接
SET tmp_str = SUBSTRING(tmp_str,2);#将tmp_str左端首字符去除
SET tmp_len = LENGTH(tmp_str);#计算当前字符串长度
END WHILE;
RETURN tmp_rs;#返回结果字符串
END;;
DELIMITER ;