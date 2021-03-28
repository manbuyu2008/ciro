var ECharts = {
    //加载Echarts配置文件
    ChartConfig: function (container, option) { //container:为页面要渲染图表的容器，option为已经初始化好的图表类型的option配置

        require.config({//引入常用的图表类型的配置
            paths: {
                echarts: '/resources/js/build/dist' //引用资源文件夹路径，注意路径
            }
        });
        this.option = {chart: {}, option: option, container: container};
        return this.option;
    },
//数据格式化
    ChartDataFormate: {

        FormateNOGroupData: function (data) {//data的格式如上的Result1，这种格式的数据，多用于饼图、单一的柱形图的数据源

            var categories = [];

            var datas = [];

            for (var i = 0; i < data.length; i++) {

                categories.push(data[i].name || "");

                datas.push({name: data[i].name, value: data[i].value || 0});

            }

            return {category: categories, data: datas};

        },

        FormateGroupData: function (data, type, is_stack) {//data的格式如上的Result2，type为要渲染的图表类型：可以为line，bar，is_stack表示为是否是堆积图，这种格式的数据多用于展示多条折线图、分组的柱图

            var chart_type = 'line';

            if (type)

                chart_type = type || 'line';

            var xAxis = [];

            var group = [];

            var series = [];

            var mapMaxValue = 0;

            for (var i = 0; i < data.length; i++) {

                for (var j = 0; j < xAxis.length && xAxis[j] != data[i].name; j++);

                if (j == xAxis.length)

                    xAxis.push(data[i].name);

                for (var k = 0; k < group.length && group[k] != data[i].group; k++);

                if (k == group.length)

                    group.push(data[i].group);

            }


            for (var i = 0; i < group.length; i++) {

                var temp = [];

                for (var j = 0; j < data.length; j++) {

                    if (group[i] == data[j].group) {

                        if (type == "map") {
                            if (data[j].value > mapMaxValue) mapMaxValue = data[j].value;
                            temp.push({name: data[j].name, value: data[j].value});
                        } else
                            temp.push(data[j].value);
                    }

                }

                switch (type) {

                    case 'bar':

                        var series_temp = {name: group[i], data: temp, type: chart_type};

                        if (is_stack)

                            series_temp = $.extend({}, {stack: 'stack'}, series_temp);

                        break;

                    case 'map':

                        var series_temp = {

                            name: group[i],
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle: {
                                normal: {label: {show: true}},
                                emphasis: {label: {show: true}}
                            },

                            data: temp

                        };

                        break;

                    case 'line':

                        var series_temp = {name: group[i], data: temp, type: chart_type};

                        if (is_stack)

                            series_temp = $.extend({}, {stack: 'stack'}, series_temp);

                        break;

                    default:

                        var series_temp = {name: group[i], data: temp, type: chart_type};

                }

                series.push(series_temp);

            }

            return {category: group, xAxis: xAxis, series: series, mapMaxValue: mapMaxValue};

        }
    },
//初始化常用的图表类型
    ChartOptionTemplates: {

        CommonOption: {//通用的图表基本配置
            title: {
                x: 'center'
            },
            tooltip: {

                trigger: 'axis'//tooltip触发方式:axis以X轴线触发,item以每一个数据项触发

            },

            toolbox: {

                show: true, //是否显示工具栏

                feature: {

                    mark: {show: false},

                    dataView: {readOnly: false}, //数据预览

                    restore: {show: true}, //复原

                    saveAsImage: {show: true} //是否保存图片

                }

            }

        },

        CommonLineOption: {//通用的折线图表的基本配置
            title: {
                x: 'left'
            },
            tooltip: {

                trigger: 'axis'

            },

            toolbox: {

                show: true,

                feature: {

                    dataView: {readOnly: false}, //数据预览

                    magicType: {show: true, type: ['line', 'bar']},

                    restore: {show: true}, //复原

                    saveAsImage: {show: true} //是否保存图片

                }

            }

        },

        CommonMapOption: {//通用的折线图表的基本配置
            title: {
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x: 'left'
            },
            roamController: {
                show: true,
                x: 'right',
                mapTypeControl: {
                    'china': true
                }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: {show: false},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            }

        },

        Pie: function (title, data, name) {//data:数据格式：{name：xxx,value:xxx}...

            var pie_datas = ECharts.ChartDataFormate.FormateNOGroupData(data);

            var option = {
                title: title,
                tooltip: {

                    trigger: 'item',

                    formatter: '{b} : {c} ({d}/%)',

                    show: true

                },

                legend: {

                    orient: 'vertical',

                    x: 'left',

                    data: pie_datas.category

                },

                series: [

                    {

                        name: name || "",

                        type: 'pie',

                        radius: '65%',

                        center: ['50%', '50%'],

                        data: pie_datas.data

                    }

                ]

            };

            return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);

        },

        Lines: function (title, data, name, is_stack) { //data:数据格式：{name：xxx,group:xxx,value:xxx}...

            var stackline_datas = ECharts.ChartDataFormate.FormateGroupData(data, 'line', is_stack);

            var option = {
                title: title,
                calculable: true,
                legend: {

                    data: stackline_datas.category

                },

                xAxis: [{

                    type: 'category', //X轴均为category，Y轴均为value

                    data: stackline_datas.xAxis,

                    boundaryGap: false//数值轴两端的空白策略

                }],

                yAxis: [{

                    name: name || '',

                    type: 'value',

                    splitArea: {show: true}

                }],

                series: stackline_datas.series

            };

            return $.extend({}, ECharts.ChartOptionTemplates.CommonLineOption, option);

        },

        Bars: function (title, data, name, is_stack) {//data:数据格式：{name：xxx,group:xxx,value:xxx}...

            var bars_dates = ECharts.ChartDataFormate.FormateGroupData(data, 'bar', is_stack);

            var option = {
                title: title,

                legend: {data: bars_dates.category},

                xAxis: [{

                    type: 'category',

                    data: bars_dates.xAxis,

                    axisLabel: {

                        show: true,

                        interval: 'auto',

                        rotate: 0,

                        margion: 8

                    }

                }],

                yAxis: [{

                    type: 'value',

                    name: name || '',

                    splitArea: {show: true}

                }],

                series: bars_dates.series

            };

            return $.extend({}, ECharts.ChartOptionTemplates.CommonLineOption, option);

        },
        Maps: function (title, data) {//data:数据格式：{name：xxx,group:xxx,value:xxx}...

            var bars_dates = ECharts.ChartDataFormate.FormateGroupData(data, 'map', false);

            var option = {
                title: title,

                dataRange: {
                    min: 0,
                    max: bars_dates.mapMaxValue,
                    x: 'left',
                    y: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true
                },
                legend: {data: bars_dates.category},

                series: bars_dates.series

            };

            return $.extend({}, ECharts.ChartOptionTemplates.CommonMapOption, option);

        }

//其他的图表配置，如柱图+折线、地图
    },
//渲染图表
    Charts: {

        RenderChart: function (option) {

            require([

                    'echarts',

                    'echarts/chart/line',

                    'echarts/chart/bar',

                    'echarts/chart/pie',

                    'echarts/chart/k',

                    'echarts/chart/scatter',

                    'echarts/chart/radar',

                    'echarts/chart/chord',

                    'echarts/chart/force',

                    'echarts/chart/map'

                ],

                function (ec) {

                    echarts = ec;
                    var ecConfig = require('echarts/config');
                    if (option.chart && option.chart.dispose)

                        option.chart.dispose();

                    option.chart = echarts.init(option.container);

                    window.onresize = option.chart.resize;

                    option.chart.setOption(option.option, true);
                    /*设置主题*/
                    option.chart.setTheme(theme);

                });

        }


//渲染其他的图表类型，如：地图
    }

}