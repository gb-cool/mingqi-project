/**
 * 缓存数据内容
 */
var CacheData = {
	oxygen: {
		// 氧浓度
		realTableData: [],		// 氧浓度实时表格数据
		alarmListData: []		// 告警信息
	},
	stive: {
		// 粉尘浓度
		realTableData: [],		// 氧浓度实时表格数据
		alarmListData: []		// 告警信息
	},
	vertical: {
		// 立模数据
		realTableData: []		// 立模机本体表格数据
	},
	wareHouse: {
		// 仓储堆场
		realTableData: []		// 仓储堆场实时表格数据
	},
	person: {
		// 人员
		allData: []				// 所有人员数据
	},
	video: {
		// 视频
		oWebControl: null,		// 视频控件
		listData: []			// 重点区域列表数据
	},
	robot: {
		// 巡检机器人
		listData: []			// 巡检机器人列表数据
	}
}

/**
 * 公共方法
 */
var CachePublicFun = {
	showOSLabel: (row) => {
		console.log(row)
		// 粉尘氧浓度标签显示
		let color = {
			one: '#00D98B',
			two: '#FFF100',
			three: '#FE9418',
			four: '#D10202'
		}
		let bg = color.one
		if(row._grade == 1){
			bg = color.one
		}else if(row._grade == 2){
			bg = color.two
		}else if(row._grade == 3){
			bg = color.four
		}
		let el = document.getElementsByClassName("deviceCameraModelBox")[0]
		el.innerHTML = ""
		el.setAttribute('style', 'background:rgba(1, 0, 55, 0.7);padding:20px 84px 20px 20px;border-radius:14px;min-width: 82px;min-height: 32px;')
		let _div = document.createElement("div")
		_div.setAttribute('style', 'font-size:54px;color:#fff;position:relative;');
		_div.innerHTML ="<p style = 'width:40px;height:40px;border-radius:50%;position:absolute;top: 50%;transform: translate(0, -20px);background:"+ bg +"'></p>"+
		"<span style='margin-left:44px'>" + row.deviceName + "（"+ row._concentration +"）</span"
		el.appendChild(_div)
	}
}