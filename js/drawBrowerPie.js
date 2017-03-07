var drawBrowserPie = (function () {
    function _convertBrowserData(data) {
    	// console.log(data)
    	var browsers = [];
    	var browserData = [];
    	for (var i = 0; i < data.length; i++) {
    		// console.log(data[i].browser)
    		if(browsers.indexOf(data[i].browser)>=0){
    			browsers[data[i].browser]++
    		}else{

    			browsers.push(data[i].browser)
    			browsers[data[i].browser] = 1
    		}
    	}
    	// console.log(browsers)
    	for (var i = 0; i < browsers.length; i++) {
    		browserData.push({
				name : browsers[i],
				value : browsers[browsers[i]]
			})
    	}
    	// console.log(browserData)
    	return browserData
    }
    /*	
    *	绘制地图
	*	statusData.type：数组，各个类型的status
	*	statusData[status]：数组，数组元素为status的数据，
	*	此处数据中包含城市名字、经纬度和值的数组
    */
    function init(e,data) {
    	// console.log(series)
    	var series = _convertBrowserData(data)
    	var option = {
    	    backgroundColor : '#1a1b1a',
        	textStyle : {
        		color : '#fff'
        	},
    	    title : {
    	    	text : '浏览器占比', 
    	    	left : 'center'
    	    },
    	    legend: {
    	    	left :'left',
    	    	top : 'top',
    	    	orient : 'vertical',
    	        data:series.map(function (value) {
    	        	return value.name
    	        })
    	    },
    	    // 不使用x轴、y轴
    	    // 工具提示使用默认的item触发，饼图没有x轴，所以不能用x轴触发
    	    tooltip : {
    	        trigger: 'item',
    	        /*  
    	            工具提示展示效果：
    	            饼图的名字
    	            扇形的名字 ：扇形的数值 （扇形的百分比）
    	            {a}、{b}等在不同图表表示不同，详看官网tooltip.formatter的介绍
    	        */
    	        formatter: "{b} : {c} ({d}%)"
    	    },
    	    series: [
    	        {
    	            // 饼图的名字
    	            // name: '',
    	            // 饼图的类型
    	            type: 'pie',
                    // roseType: 'angle',
    	            minAngle : 10,
    	            // 饼图中心点位置，默认为['50%','50%']，此处可以省略
    	            center : ['50%','50%'],
    	            // 饼图的半径，第一个为内圆半径，第二个为外圆半径，默认为[0,'75%']
    	            radius : [50,'70%'],
    	            // 饼图的数据，每个数据项都有名字和值
    	            data: series
    	        }
    	    ]
    	};

    	// 使用刚指定的配置项和数据显示图表。
    	e.setOption(option);
    }
    return {
    	init : init
    }
})();