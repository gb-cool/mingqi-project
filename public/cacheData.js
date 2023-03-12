/**
 * 缓存数据内容
 */
var CacheData = {
	oxygen: {
		// 氧浓度
		realTableData: [],		// 氧浓度实时表格数据
		alarmListData: [],		// 告警信息
		thresholdValue: [19.95, 23],		// 阈值
		color: {				// 等级颜色
			one: '#00D98B',
			two: '#FFF100',
			three: '#FE9418',
			four: '#D10202'
		}
	},
	stive: {
		// 粉尘浓度
		realTableData: [],		// 氧浓度实时表格数据
		alarmListData: [],		// 告警信息
		thresholdValue: [20, 60]		// 阈值
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
		allData: [],			// 所有人员数据
		realListData: []			// 重点区域人员实时数据
	},
	video: {
		// 视频
		oWebControl: null,		// 视频控件
		otherOWebControl: null, 
		listData: [],	// 重点区域列表数据
		limoListData: [],	//立磨车间摄像头数据
		limoSelectId: null	//立磨车间选中的摄像头id值	
	},
	robot: {
		// 巡检机器人
		listData: []			// 巡检机器人列表数据
	},
	led: {
		roadListData: [],		// 道路LED列表数据
		roomListData: []		// 车间LED列表数据
	},
	device: {
		//对应关系数据
		relationData: [
			{_id: 'ZP01', _room:"破碎间", _name: '棒条给料机', _use: '颚破给料'},
			{_id: 'ZP02', _room:"破碎间", _name: '棒条给料机', _use: '颚破给料'},
			{_id: 'EP01', _room:"破碎间", _name: '颚式破碎机', _use: '粗碎'},
			{_id: 'EP02', _room:"破碎间", _name: '颚式破碎机', _use: '粗碎'},
			{_id: 'YP01', _room:"破碎间", _name: '单缸液压圆锥破碎机', _use: '细碎'},
			{_id: 'YP02', _room:"破碎间", _name: '单缸液压圆锥破碎机', _use: '细碎'},
			{_id: 'SP01', _room:"筛分间", _name: '双层振动筛', _use: '预先检查筛分'},
			{_id: 'SP02', _room:"筛分间", _name: '双层振动筛', _use: '预先检查筛分'},
			{_id: 'P-101', _room:"破碎间", _name: '破碎料皮带', _use: '系列颚破、圆锥破底部出料皮带汇集'},
			{_id: 'P-102', _room:"破碎间", _name: '破碎料皮带', _use: '系列颚破、圆锥破底部出料皮带汇集'},
			{_id: 'P-103', _room:"破碎间", _name: '振动筛给料皮带', _use: '将破碎后的碎石爬坡输送至振动筛'},
			{_id: 'P-104', _room:"筛分间", _name: '振动筛给料皮带', _use: '将破碎后的碎石爬坡输送至振动筛'},
			{_id: 'P-105', _room:"筛分间", _name: '振动筛集料皮带', _use: '横向布置收集振动筛筛上物'},
			{_id: 'P-106', _room:"筛分间", _name: '振动筛集料皮带', _use: '横向布置收集振动筛筛上物'},
			{_id: 'F-101', _room:"破碎间", _name: '振动筛返料皮带', _use: '将筛上物输送返回至圆锥破中间仓'},
			{_id: 'F-102', _room:"破碎间", _name: '振动筛返料皮带', _use: '将筛上物输送返回至圆锥破中间仓'},
			{_id: 'F-103', _room:"破碎间", _name: '可移动皮带', _use: '圆锥破给料'},
			{_id: 'F-104', _room:"破碎间", _name: '可移动皮带', _use: '圆锥破给料'},
			{_id: 'CP-001', _room:"破碎间", _name: '圆锥破中间仓', _use: '圆锥破储存给料中间仓'},
			{_id: 'CP-002', _room:"破碎间", _name: '圆锥破中间仓', _use: '圆锥破储存给料中间仓'},
			{_id: 'P-107', _room:"筛分间", _name: '振动筛出料皮带', _use: '将筛下物输送至碎石仓顶布料小车'},
			{_id: 'P-108', _room:"筛分间", _name: '振动筛出料皮带', _use: '将筛下物输送至碎石仓顶布料小车'},
			{_id: 'T-107', _room:"破碎间", _name: '破碎出料除铁器', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-108', _room:"破碎间", _name: '破碎出料除铁器', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-101', _room:"筛分间", _name: '筛分回料除铁器', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-102', _room:"筛分间", _name: '筛分回料除铁器', _use: '圆锥破储存给料中间仓'},
			{_id: 'SC-001', _room:"破碎间", _name: '破碎除尘器', _use: '破碎收尘器'},
			{_id: 'SC-002', _room:"筛分间", _name: '筛分除尘器', _use: '筛分收尘器'},
		],
		fileds: {
			_id: "设备编号",
			_room: "所属车间",
			_name: "设备名称",
			_use: "设备功能"
		}
	}
}

/**
 * 公共方法
 */
var CachePublicFun = {
	showOSLabel: (row) => {
		// 粉尘氧浓度标签显示
		let color = CacheData.oxygen.color
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
		el.setAttribute('style', 'background:rgba(1, 0, 55, 0.4);padding:20px 84px 20px 20px;border-radius:14px;min-width: 82px;min-height: 32px;')
		let _div = document.createElement("div")
		_div.setAttribute('style', 'font-size:54px;color:#fff;position:relative;');
		_div.innerHTML ="<p style = 'width:40px;height:40px;border-radius:50%;position:absolute;top: 50%;transform: translate(0, -20px);background:"+ bg +"'></p>"+
		"<span style='margin-left:44px'>" + row.deviceName + "（"+ row._concentration +"）</span"
		el.appendChild(_div)
	},
	showDeviceLabel: (row) => {
		let fileds = CacheData.device.fileds
		let el = document.getElementsByClassName("deviceCameraModelBox")[0]
		el.innerHTML = ""
		el.setAttribute('style', 'background:rgba(1, 0, 55, 0.7);border: 3px solid rgba(71, 136, 255, 0.5);box-shadow:0px 3px 6px rgba(71,136,255,0.5);padding:20px 84px 20px 36px;border-radius:14px;min-width: 82px;min-height: 32px;')
		let _div = document.createElement("div")
		_div.setAttribute('style', 'font-size:54px;color:#fff;position:relative;');
		// _div.innerHTML ="<p style = 'width:40px;height:40px;border-radius:50%;position:absolute;top: 50%;transform: translate(0, -20px);background:"+ CacheData.oxygen.color.one +"'></p>"+
		// "<span style='margin-left:44px'>" + row._name + "（"+ row._use +"）</span"
		let ul = "<ul>"
		for(let key in row){
			if(fileds.hasOwnProperty(key)){
				ul += "<li style='padding:0.8rem 0px;'><p style='float:left;text-align:right;padding-right:2rem;'>"+ fileds[key] +" ： </p><span>"+ row[key] +"</span></li>"
			}
		}
		ul += "<ul>"
		_div.innerHTML = ul
		el.appendChild(_div)
	}
}