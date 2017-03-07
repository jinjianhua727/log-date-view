var drawUrlLine = (function () {
    function _convertUrlData(data) {
        var seriesData = [];
        for (var i = 0; i < data[0].url.length; i++) {
            var singleSeries = {
                type: 'line',
                name : data[0].url[i].name,
                data : data.map(function(value){
                    return value.url[i].value
                }),
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    smooth: true,
                            effect: {
                                show: true
                            },
                            distance: 10,
                    label: {
                        normal: {
                            position: 'middle'
                        }
                    },
                    symbol: ['none', 'none'],
                    // data: markLineData
                }
            }
            seriesData.push(singleSeries)
        }
        return seriesData
    }
    /*  
    *   绘制地图
    *   statusData.type：数组，各个类型的status
    *   statusData[status]：数组，数组元素为status的数据，
    *   此处数据中包含城市名字、经纬度和值的数组
    */
    function init(e,data) {
        // console.log(series)
        // var series = _convertUrlData(data)
        var xData = data.map(function (value) {
            return value.date
        })
        var seriesData = _convertUrlData(data)
        var option = {
            backgroundColor : '#1a1b1a',
            textStyle : {
                color : '#fff'
            },
            title: {
                left :'center',
                text: '3月份访问量统计'
            },
            legend : {
                left : 'left',
                top : 'middle',
                orient : 'vertical',
                data : data[0].url.map(function(value){
                    // console.log(value)
                    // console.log(value.name.replace('.html','页面'))
                    return value
                })
            },
            tooltip : {
                trigger: 'axis'
            }, 
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                    // startValue :0
                    start: 0,
                    end: 30
                }
            ],   
            xAxis: {
                type : "category",
                // boundaryGap:false,
                data: xData
            },
            yAxis: {
                name : '访问量'
            },
            series: seriesData
        };

        // 使用刚指定的配置项和数据显示图表。
        e.setOption(option);
        setInterval(function () {
            var dataZoom = option.dataZoom[0];
            if (dataZoom.end >97) {
                dataZoom.end = 30;
                dataZoom.start = 0;
            }else{
                dataZoom.end +=3;
                dataZoom.start +=3;
            }
            e.setOption(option);
        },1000)
    }
    return {
        init : init
    }
})();