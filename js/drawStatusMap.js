var drawStatusMap = (function () {
	function _getSeries(data) {
    	var colors = ['red','green']
    	var obj = {
    		type : []
    	}
    	for (var i = 0; i < data.length; i++) {
    		var singleData = {
    			name : data[i].city.name
    		}
    		singleData.value = data[i].city.location.map(function (value) {
    			return value;
    		});
    		singleData.value[2] = data[i].value;
    		var status = data[i].status;
    		if (status in obj) {
    			obj[status].push(singleData)
    		}else{
    			obj.type.push(status)
    			obj[status] = [singleData]
    		}
    		
    	}
    	var mapSeries = (function (d) {
    		var res = []
    		for (var i = 0; i < d.type.length; i++) {
    			var color = '';
    			res.push({
    				// 数据项的名字
    				name: d.type[i],
    				// 类型为散点图或气泡图
    				type: 'scatter',
    				// 使用地理坐标系
    				coordinateSystem: 'geo',
    				symbolSize : 10,

    				itemStyle : {
    					normal : {
    						color : colors[i],
    						shadowColor: 'rgba(255, 0, 0, 0.5)',
    						shadowBlur: 10
    					}
    				},
    				// 数据,convertd函数的作用是为存在的城市天际爱经纬度
    				data: d[d.type[i]]
    			})
    		}
    		return res
    	})(obj)
    	return mapSeries;
	}
	function init(e,mapData) {
		var series = _getSeries(mapData)

        var option = {
        	backgroundColor : '#1a1b1a',
        	textStyle : {
        		color : '#fff'
        	},
        	title : {
        		left : 'center',
        		text : '日志IP区域显示',
        		subtext : '真是nginx日志'
        	},
            legend : {
            	left : 'left',
            	top : 'top',
            	orient : 'vertical',
                data : [{
                	name : '200',
                	icon :'roundRect'
                },{
                	name : '404',
                	icon :'roundRect'
                }]
            },
            tooltip: {
                trigger: 'item',
                formatter : function (data) {
                    return data.name
                }
            },
            geo: {
                map: 'china',
                label : {
					emphasis : {
						textStyle : {
							color : '#fff'
						}
					}
				},
                itemStyle: {
	                normal: {
	                	color: '#1a1b1a',
	                    borderColor : '#5c87dd'
	                },
	                emphasis: {
	                	color: '#1a1b1a',
	                    borderColor : '#5c87dd'
	                }
	            }
            },
            series: series
        }
        
        e.setOption(option);
        // var flag = true;
        // setInterval(function () {
        // 	flag = !flag;
        // 	if (flag) {
        // 		series.forEach(function (d) {
        // 			d.symbolSize = 10
        // 		})
        // 	}else{
        // 		series.forEach(function (d) {
        // 			d.symbolSize = 5
        // 		})
        // 	}
        	
        // 	myChart.setOption({
        // 		series : series
        // 	});
        // },100)
    }
    return {
    	init : init
    }
})(echarts);