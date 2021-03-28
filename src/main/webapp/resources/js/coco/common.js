var common = {};
window.$$date = common.date = {

    //函数功能: 检查年月日是否有效,inputYear, inputMonth, inputDay 年月日串;showTip  是否显示提示
    isDateValue:function (inputYear, inputMonth, inputDay, isAlert) {
        if (isAlert == null) {
            isAlert = true;
        }
        // 有日期无月份或者有月份无年份，则日期格式错误
        if (inputYear.length == 0 && inputMonth.length == 0 && inputDay.length == 0) {
            return true;
        }
        if ((inputYear.length == 0 && inputMonth.length != 0) || (inputMonth.length == 0 && inputDay.length != 0)) {
            return false;
        }
        inputYear = inputYear.replace(/^0+/, '');
        inputMonth = inputMonth.replace(/^0+/, '');
        inputDay = inputDay.replace(/^0+/, '');
        // 年月日不是整数，则日期格式错误
        if (!$$math.isPureNumber(inputYear)) {
            return false;
        }
        if (!$$math.isPureNumber(inputMonth)) {
            return false;
        }
        if (!$$math.isPureNumber(inputDay)) {
            return false;
        }
        // 年份不是4位，则日期格式错误
        if (inputYear.length != 4) {
            return false;
        }
        // 无月份则不进行月份判断
        if (inputMonth.length == 0) {
            return true;
        }
        // 月份不是在1-12之间，则日期格式错误
        if ($$str.to_integer(inputMonth) < 1 || $$str.to_integer(inputMonth) > 12) {
            if (isAlert)  $$msg.alert("月份不在1-12之间，请重新输入！");
            return false;
        }
        // 逐月判断日期数值，出现非法值则日期格式错误
        // 无日期则不进行日期判断
        if (inputDay.length == 0) {
            return true;
        }
        if (inputDay == '00') {
            if (isAlert) $$msg.alert("日期不能小于1,请重新输入！");
            return false;
        }
        // 日期最大值为31日的月份判断
        var intMonth = $$str.to_integer(inputMonth);
        if (intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 ||
            intMonth == 8 || intMonth == 10 || intMonth == 12) {
            if ($$str.to_integer(inputDay) > 31) {
                if (isAlert) $$msg.alert("本月份日期不应大于31日，请重新输入！");
                return false;
            }
        }
        // 日期最大值为30日的月份判断
        if (intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) {
            if ($$str.to_integer(inputDay) > 30) {
                if (isAlert) $$msg.alert("本月份日期不应大于30日，请重新输入！");
                return false;
            }
        }
        // 润年的日期处理
        if (intMonth == 2) {
            if ($$str.to_integer(inputDay) > 28) {
                if (($$str.to_integer(inputYear) % 4) == 0 && $$str.to_integer(inputDay) == 29) {
                    return true;
                } else {
                    if (isAlert) $$msg.alert("2月份无此日期，请重新输入！");
                    return false;
                }
            }
        }
        return true;
    },
    /* 函数功能: 检查输入的日期的格式是否为指定的格式(YYYYMMDD,YYYYMM, YYYY-MM, YYYY-MM-DD, YYYY-MM-DD:HH)
     入口参数: inputString:源,   subString 子串, showTip 是否显示提示
     函数返回：是日期格式返回true;
     */
    //alert处理, validate有调用
    isDateFormat:function (inputString, format, isAlert) {
        //子函数，提示日期格式不正确
        function showAlert(format, isAlert) {
            if (isAlert) $$msg.alert("日期格式错误！正确格式为:" + format);
        }

        inputString = inputString + "";
        if (isAlert == undefined || isAlert == null) {
            isAlert = false;
        }
        if (format == undefined || isAlert == null) {
            format = "YYYY-MM-DD";
        }
        if ($$str.isEmpty(inputString)) {
            showAlert(format, isAlert);
            return false;
        }
        if (format == "YYYY-MM-DD") {
            var x = inputString.match(/\d{4}-\d{2}-\d{2}/);
            if (x == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(5, 7), inputString.substring(8), isAlert);
        } else if (format == "YYYYMMDD") {
            if (inputString.match(/\d{8}/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(4, 6), inputString.substring(6), isAlert);
        } else if (format == "YYYY-MM") {
            if (inputString.match(/\d{4}-\d{2}/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(5), "01", isAlert);
        } else if (format == "YYYYMM") {
            if (inputString.match(/\d{6}/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(4), "01", isAlert);
        } else if (format == "YYYY-MM-DD:HH") {
            if (inputString.match(/\d{4}-\d{2}-\d{2}:[0-5][0-9]/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(5, 7), inputString.substring(8, 10), isAlert);
        } else {
            if (isAlert) $$msg.alert("传入的验证格式[" + format + "]未定义");
            return false;
        }
    },
    //函数功能: 检查输入的时间的格式是否为指定的格式(HH:MM:SS):inputString:源,showTip 是否显示提示;函数返回：是时间格式返回true;
    isTimeFormat:function (inputString) {
        if ($$str.isEmpty(inputString) || inputString.length != 8) {
            return false;
        }
        return inputString.match(/[0-2][0-3]:[0-5][0-9]:[0-5][0-9]/) != null;
    },
    //函数功能: 日期和时间格式检查 YYYY-MM-DD HH:MM:SS
    isDateTime:function (str) {
        var a = str.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
        if (a == null) return false;
        return !(a[2] >= 13 || a[3] >= 32 || a[4] >= 24 || a[5] >= 60 || a[6] >= 60);

    },
    dateToStr:function (date) {
        var m = date.getMonth() + 1, d = date.getDate();
        var strMyDate = m < 10 ? ("0" + m) : ("" + m);
        var strDate = d < 10 ? ("0" + d) : ("" + d);
        return date.getFullYear() + "-" + strMyDate + "-" + strDate;
    },
    strToDate:function (str) {
        var _date = new Date();
        _date.setFullYear(str.substr(0, 4));
        _date.setMonth(str.substr(5, 2) - 1, 1);
        _date.setDate(str.substr(8, 2));
        return _date;
    },
    getAddDays:function (str, days) {//得到指定日期,指定天数后的日期
        var uom = this.strToDate(str);
        var newtimems = uom.getTime() + (days * 24 * 60 * 60 * 1000);
        uom.setTime(newtimems);
        return this.dateToStr(uom);
    },
    getAddMonths:function (str, monthNum) {//计算给定的日期增加一定的月数后的新日期
        if (monthNum == undefined || monthNum == '') return str;
        var myDate = this.strToDate(str);
        var intMonthNum = parseInt(monthNum);
        myDate.setMonth(myDate.getMonth() + intMonthNum, 1);
        return this.dateToStr(myDate);
    }, //计算给定的日期增加一定的月数后的新日期 - 1。如 2010-09-01，4 返回2010-12-31
    getAddMonthsDec1:function (str, monthNum) {
        if (monthNum == undefined || monthNum == '') return str;
        var myDate = this.strToDate(str);
        var intMonthNum = parseInt(monthNum);
        myDate.setMonth(myDate.getMonth() + intMonthNum, 1);
        myDate.setDate(myDate.getDate() - 1);
        return this.dateToStr(myDate);
    },

//计算给定的日期增加一定的月数后的新日期
//返回日期没有开始日这一天(比如31日或者2月份),则返回日期为当月最后一天。
//如
//2011-01-30, 1 -> 2011-02-28
//2011-11-30, 1 -> 2011-12-30   //不用最后一天对应最后一天.
    getAddMonths_CareLastDate:function (str, monthNum) {
        if (monthNum == undefined || monthNum == '') return str;
        var myDate = this.strToDate(str);
        var intMonthNum = parseInt(monthNum);
        var myDayOfMonth = myDate.getDate();
        myDate.setMonth(myDate.getMonth() + intMonthNum, 1);
        var curMonth = myDate.getMonth();
        if (myDayOfMonth != myDate.getDate()) {  //特殊情况, 如2011-01-30 + 1个月 -> 2011-03-02
            // 把月份减1, 再将"天"赋值为 当月最后一天
            //2011-01-30, 1 = 2011-03-02  -> 2011-02-28
            //2010-01-31, 3 = 2010-05-01  -> 2011-04-30
            curMonth = curMonth - 1;
            var actualMaximumDay = getMonthDays(curMonth) //取得当月最大天数
            myDate.setMonth(curMonth, 1);
            myDate.setDate(actualMaximumDay);
        }
        return this.dateToStr(myDate);
    },
//取下一年份
    getNextYear:function () {
        return this.getNowYear() + 1
    },
//取前一年份
    getPerYear:function () {
        return this.getNowYear() - 1
    },
//有本周,本月,本季度,本年
    getNow:function () {
        var d = new Date();
        if (common.options && common.options.workDate) {
            var str = common.options.workDate;
            d.setFullYear(str.substr(0, 4));
            d.setMonth(str.substr(5, 2) - 1, 1);
            d.setDate(str.substr(8, 2));
        }
        return d;
    },

    getNowYear:function () {
        return this.getNow().getFullYear();
    },
    getNowMonth:function () {
        return this.getNow().getMonth();
    },
    getNowDay:function () {
        return this.getNow().getDate();
    },

    getNowDayOfWeek:function () {
        return this.getNow().getDay();
    },
//获得某月的天数
    getMonthDays:function (myMonth) {
        var nowYear = this.getNowYear();
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    },
//获得本季度的开始月份
    getQuarterStartMonth:function () {
        var nowMonth = this.getNowMonth();
        var quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    },
//获得当前日期
    getNowDateStr:function () {
        return this.dateToStr(this.getNow());
    },

    getNowDateTimeStr:function () {
        var now = this.getNow();
        var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
        var minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        var second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
        return this.getNowDateStr() + " " + hour + ":" + minutes + ":" + second;
    },

//获得本周的开始日期
    getWeekStartDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth(), nowDay = d.getDate(), nowDayOfWeek = d.getDay();
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
        return this.dateToStr(weekStartDate);
    },

//获得本周的结束日期
    getWeekEndDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth(), nowDay = d.getDate(), nowDayOfWeek = d.getDay();
        var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
        return this.dateToStr(weekEndDate);
    },

//获得本月的开始日期
    getMonthStartDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth();
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        return this.dateToStr(monthStartDate);
    },

//获得本月的结束日期
    getMonthEndDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth() + 1;
        d = new Date(nowYear, nowMonth, 1);
        d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        return this.dateToStr(d);
    },

    //根据指定日期 得到月的结束日期
    getMonthEndDateByDate:function (str) {
        var d = this.strToDate(str);
        var nowYear = d.getFullYear(), nowMonth = d.getMonth() + 1;
        d = new Date(nowYear, nowMonth, 1);
        d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        return this.dateToStr(d);
    },

//获得本季度的开始日期
    getQuarterStartDate:function () {
        var quarterStartDate = new Date(this.getNowYear(), this.getQuarterStartMonth(), 1);
        return this.dateToStr(quarterStartDate);
    },

//或的本季度的结束日期
    getQuarterEndDate:function () {
        var nowYear = this.getNowYear();
        var quarterEndMonth = this.getQuarterStartMonth() + 3;
        var d = new Date(nowYear, quarterEndMonth, 1);
        d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        return this.dateToStr(d);
    },

//获得本年的开始日期
    getYearStartDate:function () {
        return this.getNowYear() + "-" + '01' + "-" + '01';
    },

//或的本年的结束日期
    getYearEndDate:function () {
        return this.getNowYear() + "-" + '12' + "-" + '31';
    }
};