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
		selectCameraData: null,	// 选中摄像头数据
		iframePos: {},	// iframe与文档的偏移量
		iframeClientPos: null	// iframe相对视窗的位置
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
			{_id: 'ZP01', _room:"破碎车间", _name: '棒条给料机 ZP01', _use: '颚破给料'},
			{_id: 'ZP02', _room:"破碎车间", _name: '棒条给料机 ZP02', _use: '颚破给料'},
			{_id: 'EP01', _room:"破碎车间", _name: '颚式破碎机 EP01', _use: '粗碎'},
			{_id: 'EP02', _room:"破碎车间", _name: '颚式破碎机 EP02', _use: '粗碎'},
			{_id: 'YP01', _room:"破碎车间", _name: '单缸液压圆锥破碎机 YP01', _use: '细碎'},
			{_id: 'YP02', _room:"破碎车间", _name: '单缸液压圆锥破碎机 YP02', _use: '细碎'},
			{_id: 'SP01', _room:"筛分车间", _name: '双层振动筛 SP01', _use: '预先检查筛分'},
			{_id: 'SP02', _room:"筛分车间", _name: '双层振动筛 SP02', _use: '预先检查筛分'},
			{_id: 'P-101', _room:"破碎车间", _name: '破碎料皮带 P-101', _use: '系列颚破、圆锥破底部出料皮带汇集'},
			{_id: 'P-102', _room:"破碎车间", _name: '破碎料皮带 P-102', _use: '系列颚破、圆锥破底部出料皮带汇集'},
			{_id: 'P-103', _room:"破碎车间", _name: '振动筛给料皮带 P-103', _use: '将破碎后的碎石爬坡输送至振动筛'},
			{_id: 'P-104', _room:"筛分车间", _name: '振动筛给料皮带 P-104', _use: '将破碎后的碎石爬坡输送至振动筛'},
			{_id: 'P-105', _room:"筛分车间", _name: '振动筛集料皮带 P-105', _use: '横向布置收集振动筛筛上物'},
			{_id: 'P-106', _room:"筛分车间", _name: '振动筛集料皮带 P-106', _use: '横向布置收集振动筛筛上物'},
			{_id: 'F-101', _room:"破碎车间", _name: '振动筛返料皮带 F-101', _use: '将筛上物输送返回至圆锥破中间仓'},
			{_id: 'F-102', _room:"破碎车间", _name: '振动筛返料皮带 F-102', _use: '将筛上物输送返回至圆锥破中间仓'},
			{_id: 'F-103', _room:"破碎车间", _name: '可移动皮带 F-103', _use: '圆锥破给料'},
			{_id: 'F-104', _room:"破碎车间", _name: '可移动皮带 F-104', _use: '圆锥破给料'},
			{_id: 'CP-001', _room:"破碎车间", _name: '圆锥破中间仓 CP-001', _use: '圆锥破储存给料中间仓'},
			{_id: 'CP-002', _room:"破碎车间", _name: '圆锥破中间仓 CP-002', _use: '圆锥破储存给料中间仓'},
			{_id: 'P-107', _room:"筛分车间", _name: '振动筛出料皮带 P-107', _use: '将筛下物输送至碎石仓顶布料小车'},
			{_id: 'P-108', _room:"筛分车间", _name: '振动筛出料皮带 P-108', _use: '将筛下物输送至碎石仓顶布料小车'},
			{_id: 'T-107', _room:"破碎车间", _name: '破碎出料除铁器 T-107', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-108', _room:"破碎车间", _name: '破碎出料除铁器 T-108', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-101', _room:"筛分车间", _name: '筛分回料除铁器 T-101', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-102', _room:"筛分车间", _name: '筛分回料除铁器 T-102', _use: '圆锥破储存给料中间仓'},
			{_id: 'SC-001', _room:"破碎车间", _name: '破碎除尘器', _use: '破碎收尘器'},
			{_id: 'SC-002', _room:"筛分车间", _name: '筛分除尘器', _use: '筛分收尘器'},
			{_id: 'psxc_001', _room:"破碎车间", _name: '破碎行车', _use: ''},
			{_id: 'sfxc_001', _room:"筛分车间", _name: '筛分行车', _use: ''},
			
			{_id: 'P-109', _room:"碎石配料间", _name: '移动卸料小车胶带机', _position:'碎石仓顶北侧', _use: ''},
			{_id: 'P-110', _room:"碎石配料间", _name: '移动卸料小车胶带机', _position:'碎石仓顶南侧', _use: ''},
			{_id: 'ydxc_109', _room:"碎石配料间", _name: 'P-109移动小车', _position:'', _use: ''},
			{_id: 'ydxc_110', _room:"碎石配料间", _name: 'P-110移动小车', _position:'', _use: ''},
			{_id: 'CS-101', _room:"碎石配料间", _name: '碎石仓101', _position:'', _use: ''},
			{_id: 'CS-102', _room:"碎石配料间", _name: '碎石仓102', _position:'', _use: ''},
			{_id: 'CS-103', _room:"碎石配料间", _name: '碎石仓103', _position:'', _use: ''},
			{_id: 'CS-104', _room:"碎石配料间", _name: '碎石仓104', _position:'', _use: ''},
			{_id: 'CS-105', _room:"碎石配料间", _name: '碎石仓105', _position:'', _use: ''},
			{_id: 'CS-106', _room:"碎石配料间", _name: '碎石仓106', _position:'', _use: ''},
			{_id: 'CS-107', _room:"碎石配料间", _name: '碎石仓107(样仓)', _position:'', _use: ''},
			{_id: 'CS-108', _room:"碎石配料间", _name: '碎石仓108', _position:'', _use: ''},
			{_id: 'CS-109', _room:"碎石配料间", _name: '碎石仓109', _position:'', _use: ''},
			{_id: 'CS-110', _room:"碎石配料间", _name: '碎石仓110', _position:'', _use: ''},
			{_id: 'CS-111', _room:"碎石配料间", _name: '碎石仓111', _position:'', _use: ''},
			{_id: 'CS-112', _room:"碎石配料间", _name: '碎石仓112', _position:'', _use: ''},
			{_id: 'CS-113', _room:"碎石配料间", _name: '碎石仓113', _position:'', _use: ''},
			{_id: 'CS-201', _room:"碎石配料间", _name: '碎石仓201', _position:'', _use: ''},
			{_id: 'CS-202', _room:"碎石配料间", _name: '碎石仓202', _position:'', _use: ''},
			{_id: 'CS-203', _room:"碎石配料间", _name: '碎石仓203', _position:'', _use: ''},
			{_id: 'CS-204', _room:"碎石配料间", _name: '碎石仓204', _position:'', _use: ''},
			{_id: 'CS-205', _room:"碎石配料间", _name: '碎石仓205', _position:'', _use: ''},
			{_id: 'CS-206', _room:"碎石配料间", _name: '碎石仓206', _position:'', _use: ''},
			{_id: 'CS-207', _room:"碎石配料间", _name: '碎石仓207(样仓)', _position:'', _use: ''},
			{_id: 'CS-208', _room:"碎石配料间", _name: '碎石仓208', _position:'', _use: ''},
			{_id: 'CS-209', _room:"碎石配料间", _name: '碎石仓209', _position:'', _use: ''},
			{_id: 'CS-210', _room:"碎石配料间", _name: '碎石仓210', _position:'', _use: ''},
			{_id: 'CS-211', _room:"碎石配料间", _name: '碎石仓211', _position:'', _use: ''},
			{_id: 'CS-212', _room:"碎石配料间", _name: '碎石仓212', _position:'', _use: ''},
			{_id: 'CS-213', _room:"碎石配料间", _name: '碎石仓213', _position:'', _use: ''},
			{_id: 'WP-101', _room:"碎石配料间", _name: '碎石配料皮带秤101', _position:'碎石仓底', _use: ''},
			{_id: 'WP-102', _room:"碎石配料间", _name: '碎石配料皮带秤102', _position:'碎石仓底', _use: ''},
			{_id: 'WP-103', _room:"碎石配料间", _name: '碎石配料皮带秤103', _position:'碎石仓底', _use: ''},
			{_id: 'WP-104', _room:"碎石配料间", _name: '碎石配料皮带秤104', _position:'碎石仓底', _use: ''},
			{_id: 'WP-105', _room:"碎石配料间", _name: '碎石配料皮带秤105', _position:'碎石仓底', _use: ''},
			{_id: 'WP-106', _room:"碎石配料间", _name: '碎石配料皮带秤106', _position:'碎石仓底', _use: ''},
			{_id: 'WP-107', _room:"碎石配料间", _name: '碎石配料皮带秤107', _position:'碎石仓底', _use: ''},
			{_id: 'WP-108', _room:"碎石配料间", _name: '碎石配料皮带秤108', _position:'碎石仓底', _use: ''},
			{_id: 'WP-109', _room:"碎石配料间", _name: '碎石配料皮带秤109', _position:'碎石仓底', _use: ''},
			{_id: 'WP-110', _room:"碎石配料间", _name: '碎石配料皮带秤110', _position:'碎石仓底', _use: ''},
			{_id: 'WP-111', _room:"碎石配料间", _name: '碎石配料皮带秤111', _position:'碎石仓底', _use: ''},
			{_id: 'WP-112', _room:"碎石配料间", _name: '碎石配料皮带秤112', _position:'碎石仓底', _use: ''},
			{_id: 'WP-113', _room:"碎石配料间", _name: '碎石配料皮带秤113', _position:'碎石仓底', _use: ''},
			{_id: 'WP-201', _room:"碎石配料间", _name: '碎石配料皮带秤201', _position:'碎石仓底', _use: ''},
			{_id: 'WP-202', _room:"碎石配料间", _name: '碎石配料皮带秤202', _position:'碎石仓底', _use: ''},
			{_id: 'WP-203', _room:"碎石配料间", _name: '碎石配料皮带秤203', _position:'碎石仓底', _use: ''},
			{_id: 'WP-204', _room:"碎石配料间", _name: '碎石配料皮带秤204', _position:'碎石仓底', _use: ''},
			{_id: 'WP-205', _room:"碎石配料间", _name: '碎石配料皮带秤205', _position:'碎石仓底', _use: ''},
			{_id: 'WP-206', _room:"碎石配料间", _name: '碎石配料皮带秤206', _position:'碎石仓底', _use: ''},
			{_id: 'WP-207', _room:"碎石配料间", _name: '碎石配料皮带秤207', _position:'碎石仓底', _use: ''},
			{_id: 'WP-208', _room:"碎石配料间", _name: '碎石配料皮带秤208', _position:'碎石仓底', _use: ''},
			{_id: 'WP-209', _room:"碎石配料间", _name: '碎石配料皮带秤209', _position:'碎石仓底', _use: ''},
			{_id: 'WP-210', _room:"碎石配料间", _name: '碎石配料皮带秤210', _position:'碎石仓底', _use: ''},
			{_id: 'WP-211', _room:"碎石配料间", _name: '碎石配料皮带秤211', _position:'碎石仓底', _use: ''},
			{_id: 'WP-212', _room:"碎石配料间", _name: '碎石配料皮带秤212', _position:'碎石仓底', _use: ''},
			{_id: 'WP-213', _room:"碎石配料间", _name: '碎石配料皮带秤213', _position:'碎石仓底', _use: ''},
			{_id: 'P-111', _room:"碎石配料间", _name: '配料汇总皮带', _position:'北侧汇总皮带', _use: ''},
			{_id: 'P-112', _room:"碎石配料间", _name: '配料汇总皮带', _position:'南侧汇总皮带', _use: ''},
			{_id: 'P-113', _room:"碎石配料间", _name: '配料中转皮带', _position:'在线分析仪底部', _use: ''},
			{_id: 'P-113-1', _room:"碎石配料间", _name: '中子活化在线分析仪', _position:'在线分析仪底部', _use: ''},
			{_id: 'P-114', _room:"碎石配料间", _name: '配料中转爬坡皮带', _position:'西侧爬坡皮带', _use: ''},
			{_id: 'P-115', _room:"碎石配料间", _name: '配料中转爬坡皮带', _position:'东侧爬坡皮带', _use: ''},
			{_id: 'SC-003', _room:"碎石配料间", _name: '碎石仓顶除尘器1', _position:'', _use: ''},
			{_id: 'SC-004', _room:"碎石配料间", _name: '碎石仓底配料除尘器', _position:'', _use: ''},
			{_id: 'cddhl-1', _room:"碎石配料间", _name: '仓顶电动葫芦1', _position:'', _use: ''},
			{_id: 'cddhl-2', _room:"碎石配料间", _name: '仓顶电动葫芦2', _position:'', _use: ''},
			
			{_id: 'P114M', _room:"立磨车间", _name: '除铁器 P114M', _position:'', _use: ''},
			{_id: 'P115M', _room:"立磨车间", _name: '除铁器 P115M', _position:'', _use: ''},
			{_id: 'P-116', _room:"立磨车间", _name: '移动卸料小车胶带机', _position:'碎石仓顶北侧', _use: ''},
			{_id: 'P-117', _room:"立磨车间", _name: '移动卸料小车胶带机', _position:'碎石仓顶南侧', _use: ''},
			{_id: 'LMYDXC-P-116', _room:"立磨车间", _name: 'P-116移动小车', _position:'', _use: ''},
			{_id: 'LMYDXC-P-117', _room:"立磨车间", _name: 'P-117移动小车', _position:'', _use: ''},
			{_id: 'LMJBT-M01', _room:"立磨车间", _name: '立磨机本体M01', _position:'', _use: '', _deviceKey:"16735812250003f39b"},
			{_id: 'LMJBT-M02', _room:"立磨车间", _name: '立磨机本体M02', _position:'', _use: '', _deviceKey:"1672825159000fb72f"},
			{_id: 'LMJBT-M03', _room:"立磨车间", _name: '立磨机本体M03', _position:'', _use: '', _deviceKey:"1672825280000ad947"},
			{_id: 'LMJBT-M04', _room:"立磨车间", _name: '立磨机本体M04', _position:'', _use: '', _deviceKey:"1672825567000c9946"},
			{_id: 'LMJBT-M05', _room:"立磨车间", _name: '立磨机本体M05', _position:'', _use: '', _deviceKey:"16728256160002d46d"},
			{_id: 'LMJBT-M06', _room:"立磨车间", _name: '立磨机本体M06', _position:'', _use: '', _deviceKey:"167282566200039a6f"},
			{_id: 'LMJBT-M07', _room:"立磨车间", _name: '立磨机本体M07', _position:'', _use: '', _deviceKey:"1672889351000906c1"},
			{_id: 'LMJBT-M08', _room:"立磨车间", _name: '立磨机本体M08', _position:'', _use: '', _deviceKey:"167282577000043b38"},
			{_id: 'LMJJSJ-M01', _room:"立磨车间", _name: '立磨机减速机M01', _position:'', _use: ''},
			{_id: 'LMJJSJ-M02', _room:"立磨车间", _name: '立磨机减速机M02', _position:'', _use: ''},
			{_id: 'LMJJSJ-M03', _room:"立磨车间", _name: '立磨机减速机M03', _position:'', _use: ''},
			{_id: 'LMJJSJ-M04', _room:"立磨车间", _name: '立磨机减速机M04', _position:'', _use: ''},
			{_id: 'LMJJSJ-M05', _room:"立磨车间", _name: '立磨机减速机M05', _position:'', _use: ''},
			{_id: 'LMJJSJ-M06', _room:"立磨车间", _name: '立磨机减速机M06', _position:'', _use: ''},
			{_id: 'LMJJSJ-M07', _room:"立磨车间", _name: '立磨机减速机M07', _position:'', _use: ''},
			{_id: 'LMJJSJ-M08', _room:"立磨车间", _name: '立磨机减速机M08', _position:'', _use: ''},
			{_id: 'LMFLQ-M01', _room:"立磨车间", _name: '分离器M01', _position:'', _use: ''},
			{_id: 'LMFLQ-M02', _room:"立磨车间", _name: '分离器M02', _position:'', _use: ''},
			{_id: 'LMFLQ-M03', _room:"立磨车间", _name: '分离器M03', _position:'', _use: ''},
			{_id: 'LMFLQ-M04', _room:"立磨车间", _name: '分离器M04', _position:'', _use: ''},
			{_id: 'LMFLQ-M05', _room:"立磨车间", _name: '分离器M05', _position:'', _use: ''},
			{_id: 'LMFLQ-M06', _room:"立磨车间", _name: '分离器M06', _position:'', _use: ''},
			{_id: 'LMFLQ-M07', _room:"立磨车间", _name: '分离器M07', _position:'', _use: ''},
			{_id: 'LMFLQ-M08', _room:"立磨车间", _name: '分离器M08', _position:'', _use: ''},
			{_id: 'LMDJ-M01', _room:"立磨车间", _name: '立磨主电机M01', _position:'', _use: ''},
			{_id: 'LMDJ-M02', _room:"立磨车间", _name: '立磨主电机M02', _position:'', _use: ''},
			{_id: 'LMDJ-M03', _room:"立磨车间", _name: '立磨主电机M03', _position:'', _use: ''},
			{_id: 'LMDJ-M04', _room:"立磨车间", _name: '立磨主电机M04', _position:'', _use: ''},
			{_id: 'LMDJ-M05', _room:"立磨车间", _name: '立磨主电机M05', _position:'', _use: ''},
			{_id: 'LMDJ-M06', _room:"立磨车间", _name: '立磨主电机M06', _position:'', _use: ''},
			{_id: 'LMDJ-M07', _room:"立磨车间", _name: '立磨主电机M07', _position:'', _use: ''},
			{_id: 'LMDJ-M08', _room:"立磨车间", _name: '立磨主电机M08', _position:'', _use: ''},
			{_id: 'CM-01', _room:"立磨车间", _name: 'M01密封料仓', _position:'', _use: ''},
			{_id: 'CM-02', _room:"立磨车间", _name: 'M02密封料仓', _position:'', _use: ''},
			{_id: 'CM-03', _room:"立磨车间", _name: 'M03密封料仓', _position:'', _use: ''},
			{_id: 'CM-04', _room:"立磨车间", _name: 'M04密封料仓', _position:'', _use: ''},
			{_id: 'CM-05', _room:"立磨车间", _name: 'M05密封料仓', _position:'', _use: ''},
			{_id: 'CM-06', _room:"立磨车间", _name: 'M06密封料仓', _position:'', _use: ''},
			{_id: 'CM-07', _room:"立磨车间", _name: 'M07密封料仓', _position:'', _use: ''},
			{_id: 'CM-08', _room:"立磨车间", _name: 'M08密封料仓', _position:'', _use: ''},
			{_id: 'NE-01', _room:"立磨车间", _name: 'M01立磨提升机', _position:'', _use: ''},
			{_id: 'NE-02', _room:"立磨车间", _name: 'M02立磨提升机', _position:'', _use: ''},
			{_id: 'NE-03', _room:"立磨车间", _name: 'M03立磨提升机', _position:'', _use: ''},
			{_id: 'NE-04', _room:"立磨车间", _name: 'M04立磨提升机', _position:'', _use: ''},
			{_id: 'NE-05', _room:"立磨车间", _name: 'M05立磨提升机', _position:'', _use: ''},
			{_id: 'NE-06', _room:"立磨车间", _name: 'M06立磨提升机', _position:'', _use: ''},
			{_id: 'NE-07', _room:"立磨车间", _name: 'M07立磨提升机', _position:'', _use: ''},
			{_id: 'NE-08', _room:"立磨车间", _name: 'M08立磨提升机', _position:'', _use: ''},
			{_id: 'WP-M01', _room:"立磨车间", _name: 'M01给料皮带秤', _position:'', _use: ''},
			{_id: 'WP-M02A', _room:"立磨车间", _name: 'M02给料皮带秤A', _position:'', _use: ''},
			{_id: 'WP-M02B', _room:"立磨车间", _name: 'M02给料皮带秤B', _position:'', _use: ''},
			{_id: 'P-M02', _room:"立磨车间", _name: 'M02给料汇总皮带', _position:'', _use: ''},
			{_id: 'WP-M03', _room:"立磨车间", _name: 'M03给料皮带秤', _position:'', _use: ''},
			{_id: 'WP-M04A', _room:"立磨车间", _name: 'M04给料皮带秤A', _position:'', _use: ''},
			{_id: 'WP-M04B', _room:"立磨车间", _name: 'M04给料皮带秤B', _position:'', _use: ''},
			{_id: 'P-M04', _room:"立磨车间", _name: 'M04给料汇总皮带', _position:'', _use: ''},
			{_id: 'WP-M05A', _room:"立磨车间", _name: 'M05给料皮带秤A', _position:'', _use: ''},
			{_id: 'WP-M05B', _room:"立磨车间", _name: 'M05给料皮带秤B', _position:'', _use: ''},
			{_id: 'P-M05', _room:"立磨车间", _name: 'M05给料汇总皮带', _position:'', _use: ''},
			{_id: 'WP-M06A', _room:"立磨车间", _name: 'M06给料皮带秤A', _position:'', _use: ''},
			{_id: 'WP-M06B', _room:"立磨车间", _name: 'M06给料皮带秤B', _position:'', _use: ''},
			{_id: 'P-M06', _room:"立磨车间", _name: 'M06给料汇总皮带', _position:'', _use: ''},
			{_id: 'WP-M07A', _room:"立磨车间", _name: 'M07给料皮带秤A', _position:'', _use: ''},
			{_id: 'WP-M07B', _room:"立磨车间", _name: 'M07给料皮带秤B', _position:'', _use: ''},
			{_id: 'P-M07', _room:"立磨车间", _name: 'M07给料汇总皮带', _position:'', _use: ''},
			{_id: 'WP-M08', _room:"立磨车间", _name: 'M08给料皮带秤', _position:'', _use: ''},
			{_id: 'CQ-01', _room:"立磨车间", _name: 'M01磨前仓', _position:'', _use: ''},
			{_id: 'CQ-02A', _room:"立磨车间", _name: 'M02磨前仓A', _position:'', _use: ''},
			{_id: 'CQ-02B', _room:"立磨车间", _name: 'M02磨前仓B', _position:'', _use: ''},
			{_id: 'CQ-03', _room:"立磨车间", _name: 'M03磨前仓', _position:'', _use: ''},
			{_id: 'CQ-04A', _room:"立磨车间", _name: 'M04磨前仓A', _position:'', _use: ''},
			{_id: 'CQ-04B', _room:"立磨车间", _name: 'M04磨前仓B', _position:'', _use: ''},
			{_id: 'CQ-05A', _room:"立磨车间", _name: 'M05磨前仓A', _position:'', _use: ''},
			{_id: 'CQ-05B', _room:"立磨车间", _name: 'M05磨前仓B', _position:'', _use: ''},
			{_id: 'CQ-06A', _room:"立磨车间", _name: 'M06磨前仓A', _position:'', _use: ''},
			{_id: 'CQ-06B', _room:"立磨车间", _name: 'M06磨前仓B', _position:'', _use: ''},
			{_id: 'CQ-07A', _room:"立磨车间", _name: 'M07磨前仓A', _position:'', _use: ''},
			{_id: 'CQ-07B', _room:"立磨车间", _name: 'M07磨前仓B', _position:'', _use: ''},
			{_id: 'CQ-08', _room:"立磨车间", _name: 'M08磨前仓', _position:'', _use: ''},
			{_id: 'SC-M01', _room:"立磨车间", _name: 'M01收尘器', _position:'', _use: ''},
			{_id: 'SC-M02', _room:"立磨车间", _name: 'M02收尘器', _position:'', _use: ''},
			{_id: 'SC-M03', _room:"立磨车间", _name: 'M03收尘器', _position:'', _use: ''},
			{_id: 'SC-M04', _room:"立磨车间", _name: 'M04收尘器', _position:'', _use: ''},
			{_id: 'SC-M05', _room:"立磨车间", _name: 'M05收尘器', _position:'', _use: ''},
			{_id: 'SC-M06', _room:"立磨车间", _name: 'M06收尘器', _position:'', _use: ''},
			{_id: 'SC-M07', _room:"立磨车间", _name: 'M07收尘器', _position:'', _use: ''},
			{_id: 'SC-M08', _room:"立磨车间", _name: 'M08收尘器', _position:'', _use: ''},
			{_id: 'FJ-M01', _room:"立磨车间", _name: 'M01风机', _position:'', _use: ''},
			{_id: 'FJ-M02', _room:"立磨车间", _name: 'M02风机', _position:'', _use: ''},
			{_id: 'FJ-M03', _room:"立磨车间", _name: 'M03风机', _position:'', _use: ''},
			{_id: 'FJ-M04', _room:"立磨车间", _name: 'M04风机', _position:'', _use: ''},
			{_id: 'FJ-M05', _room:"立磨车间", _name: 'M05风机', _position:'', _use: ''},
			{_id: 'FJ-M06', _room:"立磨车间", _name: 'M06风机', _position:'', _use: ''},
			{_id: 'FJ-M07', _room:"立磨车间", _name: 'M07风机', _position:'', _use: ''},
			{_id: 'FJ-M08', _room:"立磨车间", _name: 'M08风机', _position:'', _use: ''},
			{_id: 'QS-M01', _room:"立磨车间", _name: 'M01密相泵', _position:'', _use: ''},
			{_id: 'QS-M02', _room:"立磨车间", _name: 'M02密相泵', _position:'', _use: ''},
			{_id: 'QS-M03', _room:"立磨车间", _name: 'M03密相泵', _position:'', _use: ''},
			{_id: 'QS-M04', _room:"立磨车间", _name: 'M04密相泵', _position:'', _use: ''},
			{_id: 'QS-M05', _room:"立磨车间", _name: 'M05密相泵', _position:'', _use: ''},
			{_id: 'QS-M06', _room:"立磨车间", _name: 'M06密相泵', _position:'', _use: ''},
			{_id: 'QS-M07', _room:"立磨车间", _name: 'M07密相泵', _position:'', _use: ''},
			{_id: 'QS-M08', _room:"立磨车间", _name: 'M08密相泵', _position:'', _use: ''},
			{_id: 'LMXC-1', _room:"立磨车间", _name: '立磨行车1', _position:'', _use: ''},
			{_id: 'LMXC-2', _room:"立磨车间", _name: '立磨行车2', _position:'', _use: ''},
			
			{_id: 'CF-101', _room:"均化车间", _name: '高混料半成品仓1', _position:'北侧', _use: ''},
			{_id: 'CF-103', _room:"均化车间", _name: '高混料半成品仓2', _position:'北侧', _use: ''},
			{_id: 'CF-105', _room:"均化车间", _name: '高混料半成品仓3', _position:'北侧', _use: ''},
			{_id: 'CF-107', _room:"均化车间", _name: '高混料半成品仓4', _position:'北侧', _use: ''},
			{_id: 'CF-109', _room:"均化车间", _name: '高混料半成品仓5', _position:'北侧', _use: ''},
			{_id: 'CF-111', _room:"均化车间", _name: '高混料半成品仓6', _position:'北侧', _use: ''},
			{_id: 'CF-102', _room:"均化车间", _name: '高混料半成品仓7', _position:'南侧', _use: ''},
			{_id: 'CF-104', _room:"均化车间", _name: '高混料半成品仓8', _position:'南侧', _use: ''},
			{_id: 'CF-106', _room:"均化车间", _name: '高混料半成品仓9', _position:'南侧', _use: ''},
			{_id: 'CF-108', _room:"均化车间", _name: '高混料半成品仓10', _position:'南侧', _use: ''},
			{_id: 'CF-110', _room:"均化车间", _name: '高混料半成品仓11', _position:'南侧', _use: ''},
			{_id: 'CF-112', _room:"均化车间", _name: '高混料半成品仓12', _position:'南侧', _use: ''},
			{_id: 'CF-501', _room:"均化车间", _name: '高混料成品仓1', _position:'北侧', _use: ''},
			{_id: 'CF-502', _room:"均化车间", _name: '高混料成品仓2', _position:'北侧', _use: ''},
			{_id: 'CF-503', _room:"均化车间", _name: '高混料成品仓3', _position:'北侧', _use: ''},
			{_id: 'CF-504', _room:"均化车间", _name: '高混料成品仓4', _position:'南侧', _use: ''},
			{_id: 'CF-505', _room:"均化车间", _name: '高混料成品仓5', _position:'南侧', _use: ''},
			{_id: 'CF-506', _room:"均化车间", _name: '高混料成品仓6', _position:'南侧', _use: ''},
			{_id: 'CF-201', _room:"均化车间", _name: '高岭土半成品1', _position:'北侧', _use: ''},
			{_id: 'CF-202', _room:"均化车间", _name: '高岭土半成品2', _position:'北侧', _use: ''},
			{_id: 'CF-203', _room:"均化车间", _name: '高岭土半成品3', _position:'北侧', _use: ''},
			{_id: 'CF-601', _room:"均化车间", _name: '高岭土成品1', _position:'北侧', _use: ''},
			{_id: 'CF-602', _room:"均化车间", _name: '高岭土成品2', _position:'北侧', _use: ''},
			{_id: 'CF-603', _room:"均化车间", _name: '高岭土成品3', _position:'北侧', _use: ''},
			{_id: 'CF-301', _room:"均化车间", _name: '叶腊石半成品1', _position:'南侧', _use: ''},
			{_id: 'CF-302', _room:"均化车间", _name: '叶腊石半成品2', _position:'南侧', _use: ''},
			{_id: 'CF-303', _room:"均化车间", _name: '叶腊石半成品3', _position:'南侧', _use: ''},
			{_id: 'CF-701', _room:"均化车间", _name: '叶腊石成品1', _position:'南侧', _use: ''},
			{_id: 'CF-702', _room:"均化车间", _name: '叶腊石成品2', _position:'南侧', _use: ''},
			{_id: 'CF-703', _room:"均化车间", _name: '叶腊石成品3', _position:'南侧', _use: ''},
			{_id: 'CF-801', _room:"均化车间", _name: '接料仓1', _position:'北侧', _use: ''},
			{_id: 'CF-802', _room:"均化车间", _name: '接料仓2', _position:'南侧', _use: ''},
			{_id: 'LX-101', _room:"均化车间", _name: '仓底螺旋1', _position:'北侧', _use: ''},
			{_id: 'LX-103', _room:"均化车间", _name: '仓底螺旋2', _position:'北侧', _use: ''},
			{_id: 'LX-105', _room:"均化车间", _name: '仓底螺旋3', _position:'北侧', _use: ''},
			{_id: 'LX-107', _room:"均化车间", _name: '仓底螺旋4', _position:'北侧', _use: ''},
			{_id: 'LX-109', _room:"均化车间", _name: '仓底螺旋5', _position:'北侧', _use: ''},
			{_id: 'LX-111', _room:"均化车间", _name: '仓底螺旋6', _position:'北侧', _use: ''},
			{_id: 'LX-102', _room:"均化车间", _name: '仓底螺旋7', _position:'南侧', _use: ''},
			{_id: 'LX-104', _room:"均化车间", _name: '仓底螺旋8', _position:'南侧', _use: ''},
			{_id: 'LX-106', _room:"均化车间", _name: '仓底螺旋9', _position:'南侧', _use: ''},
			{_id: 'LX-108', _room:"均化车间", _name: '仓底螺旋10', _position:'南侧', _use: ''},
			{_id: 'LX-110', _room:"均化车间", _name: '仓底螺旋11', _position:'南侧', _use: ''},
			{_id: 'LX-112', _room:"均化车间", _name: '仓底螺旋12', _position:'南侧', _use: ''},
			{_id: 'LX-201', _room:"均化车间", _name: '仓底螺旋13', _position:'北侧', _use: ''},
			{_id: 'LX-202', _room:"均化车间", _name: '仓底螺旋14', _position:'北侧', _use: ''},
			{_id: 'LX-203', _room:"均化车间", _name: '仓底螺旋15', _position:'北侧', _use: ''},
			{_id: 'LX-301', _room:"均化车间", _name: '仓底螺旋16', _position:'南侧', _use: ''},
			{_id: 'LX-302', _room:"均化车间", _name: '仓底螺旋17', _position:'南侧', _use: ''},
			{_id: 'LX-303', _room:"均化车间", _name: '仓底螺旋18', _position:'', _use: ''},
			{_id: 'WD-101', _room:"均化车间", _name: '料斗称1', _position:'北侧', _use: ''},
			{_id: 'WD-103', _room:"均化车间", _name: '料斗称2', _position:'北侧', _use: ''},
			{_id: 'WD-105', _room:"均化车间", _name: '料斗称3', _position:'北侧', _use: ''},
			{_id: 'WD-107', _room:"均化车间", _name: '料斗称4', _position:'北侧', _use: ''},
			{_id: 'WD-109', _room:"均化车间", _name: '料斗称5', _position:'北侧', _use: ''},
			{_id: 'WD-111', _room:"均化车间", _name: '料斗称6', _position:'北侧', _use: ''},
			{_id: 'WD-102', _room:"均化车间", _name: '料斗称7', _position:'南侧', _use: ''},
			{_id: 'WD-104', _room:"均化车间", _name: '料斗称8', _position:'南侧', _use: ''},
			{_id: 'WD-106', _room:"均化车间", _name: '料斗称9', _position:'南侧', _use: ''},
			{_id: 'WD-108', _room:"均化车间", _name: '料斗称10', _position:'南侧', _use: ''},
			{_id: 'WD-110', _room:"均化车间", _name: '料斗称11', _position:'南侧', _use: ''},
			{_id: 'WD-112', _room:"均化车间", _name: '料斗称12', _position:'南侧', _use: ''},
			{_id: 'WD-201', _room:"均化车间", _name: '料斗称13', _position:'北侧', _use: ''},
			{_id: 'WD-202', _room:"均化车间", _name: '料斗称14', _position:'北侧', _use: ''},
			{_id: 'WD-203', _room:"均化车间", _name: '料斗称15', _position:'北侧', _use: ''},
			{_id: 'WD-301', _room:"均化车间", _name: '料斗称16', _position:'南侧', _use: ''},
			{_id: 'WD-302', _room:"均化车间", _name: '料斗称17', _position:'南侧', _use: ''},
			{_id: 'WD-303', _room:"均化车间", _name: '料斗称18', _position:'南侧', _use: ''},
			{_id: 'GB-001', _room:"均化车间", _name: '刮板机1', _position:'西侧', _use: ''},
			{_id: 'GB-002', _room:"均化车间", _name: '刮板机2', _position:'西侧', _use: ''},
			{_id: 'GB-003', _room:"均化车间", _name: '刮板机3', _position:'东侧', _use: ''},
			{_id: 'GB-004', _room:"均化车间", _name: '刮板机4', _position:'东侧', _use: ''},
			{_id: 'TD-001', _room:"均化车间", _name: '皮带斗提机1', _position:'西侧', _use: ''},
			{_id: 'TD-002', _room:"均化车间", _name: '皮带斗提机2', _position:'西侧', _use: ''},
			{_id: 'TD-003', _room:"均化车间", _name: '皮带斗提机3', _position:'东侧', _use: ''},
			{_id: 'TD-004', _room:"均化车间", _name: '皮带斗提机4', _position:'东侧', _use: ''},
			{_id: 'SC-005', _room:"均化车间", _name: '粉料配料收尘器1', _position:'西侧', _use: ''},
			{_id: 'SC-006', _room:"均化车间", _name: '粉料配料收尘器2', _position:'西侧', _use: ''},
			{_id: 'SC-007', _room:"均化车间", _name: '粉料配料收尘器3', _position:'东侧', _use: ''},
			{_id: 'SC-008', _room:"均化车间", _name: '粉料配料收尘器4', _position:'东侧', _use: ''},
			{_id: 'XC-001', _room:"均化车间", _name: '充气斜槽1', _position:'西侧', _use: ''},
			{_id: 'XC-002', _room:"均化车间", _name: '充气斜槽2', _position:'西侧', _use: ''},
			{_id: 'XC-003', _room:"均化车间", _name: '充气斜槽3', _position:'东侧', _use: ''},
			{_id: 'XC-004', _room:"均化车间", _name: '充气斜槽4', _position:'东侧', _use: ''},
			{_id: 'FL-001', _room:"均化车间", _name: '罗茨风机1', _position:'风机房', _use: ''},
			{_id: 'FL-002', _room:"均化车间", _name: '罗茨风机2', _position:'风机房', _use: ''},
			{_id: 'FX-001', _room:"均化车间", _name: '磁悬浮风机1', _position:'风机房', _use: ''},
			{_id: 'FX-002', _room:"均化车间", _name: '磁悬浮风机2', _position:'风机房', _use: ''},
			{_id: 'FX-003', _room:"均化车间", _name: '磁悬浮风机3', _position:'风机房', _use: ''},
			{_id: 'FX-004', _room:"均化车间", _name: '磁悬浮风机4', _position:'风机房', _use: ''},
			{_id: 'QS-501', _room:"均化车间", _name: '高混料401仓密相泵', _position:'北侧', _use: ''},
			{_id: 'QS-503', _room:"均化车间", _name: '高混料403仓密相泵', _position:'北侧', _use: ''},
			{_id: 'QS-505', _room:"均化车间", _name: '高混料405仓密相泵', _position:'北侧', _use: ''},
			{_id: 'QS-502', _room:"均化车间", _name: '高混料402仓密相泵', _position:'南侧', _use: ''},
			{_id: 'QS-504', _room:"均化车间", _name: '高混料404仓密相泵', _position:'南侧', _use: ''},
			{_id: 'QS-506', _room:"均化车间", _name: '高混料406仓密相泵', _position:'南侧', _use: ''},
			{_id: 'QS-601', _room:"均化车间", _name: '高岭土501仓密相泵', _position:'北侧', _use: ''},
			{_id: 'QS-602', _room:"均化车间", _name: '高岭土502仓密相泵', _position:'北侧', _use: ''},
			{_id: 'QS-603', _room:"均化车间", _name: '高岭土503仓密相泵', _position:'北侧', _use: ''},
			{_id: 'QS-701', _room:"均化车间", _name: '叶腊石601仓密相泵', _position:'南侧', _use: ''},
			{_id: 'QS-702', _room:"均化车间", _name: '叶腊石602仓密相泵', _position:'南侧', _use: ''},
			{_id: 'QS-703', _room:"均化车间", _name: '叶腊石603仓密相泵', _position:'南侧', _use: ''},
			{_id: 'SZ-801', _room:"均化车间", _name: '801仓散装机', _position:'', _use: ''},
			{_id: 'SZ-802', _room:"均化车间", _name: '802仓散装机', _position:'', _use: ''},
			{_id: 'CDDDHL-1', _room:"均化车间", _name: '仓顶电动葫芦', _position:'', _use: ''},
			{_id: 'SC-701', _room:"均化车间", _name: '均化仓顶收尘器701', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-702', _room:"均化车间", _name: '均化仓顶收尘器702', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-703', _room:"均化车间", _name: '均化仓顶收尘器703', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-301', _room:"均化车间", _name: '均化仓顶收尘器301', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-302', _room:"均化车间", _name: '均化仓顶收尘器302', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-303', _room:"均化车间", _name: '均化仓顶收尘器303', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-802', _room:"均化车间", _name: '均化仓顶收尘器802', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-801', _room:"均化车间", _name: '均化仓顶收尘器801', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-601', _room:"均化车间", _name: '均化仓顶收尘器601', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-602', _room:"均化车间", _name: '均化仓顶收尘器602', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-603', _room:"均化车间", _name: '均化仓顶收尘器603', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-201', _room:"均化车间", _name: '均化仓顶收尘器201', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-202', _room:"均化车间", _name: '均化仓顶收尘器202', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-203', _room:"均化车间", _name: '均化仓顶收尘器203', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-102', _room:"均化车间", _name: '均化仓顶收尘器102', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-104', _room:"均化车间", _name: '均化仓顶收尘器104', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-106', _room:"均化车间", _name: '均化仓顶收尘器106', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-101', _room:"均化车间", _name: '均化仓顶收尘器101', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-103', _room:"均化车间", _name: '均化仓顶收尘器103', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-105', _room:"均化车间", _name: '均化仓顶收尘器105', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-502', _room:"均化车间", _name: '均化仓顶收尘器502', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-504', _room:"均化车间", _name: '均化仓顶收尘器504', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-506', _room:"均化车间", _name: '均化仓顶收尘器506', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-501', _room:"均化车间", _name: '均化仓顶收尘器501', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-503', _room:"均化车间", _name: '均化仓顶收尘器503', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-505', _room:"均化车间", _name: '均化仓顶收尘器505', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-108', _room:"均化车间", _name: '均化仓顶收尘器108', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-110', _room:"均化车间", _name: '均化仓顶收尘器110', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-112', _room:"均化车间", _name: '均化仓顶收尘器112', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-107', _room:"均化车间", _name: '均化仓顶收尘器107', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-109', _room:"均化车间", _name: '均化仓顶收尘器109', _position:'仓顶收尘器', _use: ''},
			{_id: 'SC-111', _room:"均化车间", _name: '均化仓顶收尘器111', _position:'仓顶收尘器', _use: ''},
		],
		fileds: {
			_id: "设备编号",
			_room: "所属车间",
			_name: "设备名称",
			_use: "设备功能",
			_position: "设备位置",
			
			"1#JYZH": "1#加压值",
			"1#XYZH": "1#卸压值",
			"2#JYZH": "2#加压值",
			"2#XYZH": "2#卸压值", 
			"MJDJ-DL": "磨机电机电流"	,
			"MJDJ-HZT": "磨机电机后轴温度",
			"MJDJ-QZT": "磨机电机前轴温度",
			"MJDJ-RZT1": "磨机电机绕组温度1",
			"MJDJ-RZT2": "磨机电机绕组温度2",
			"MJDJ-RZT3": "磨机电机绕组温度3",
			"MJDJ-RZT4": "磨机电机绕组温度4",
			"MJDJ-RZT5": "磨机电机绕组温度5",
			"MJDJ-RZT6": "磨机电机绕组温度6",
			"MJDJ-ZS": "磨机电机转速",
			"att_01": "att_01",
			"deviceKey": "设备KEY",
			"sa_serialNo": "sa_serialNo",
			"sa_switchState": "sa_switchState",
			"time": "时间"
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
		let _box = ""
		_box += "<div style='height:90px;line-height:70px;border-bottom:1px solid #fff;font-weight:700;'>"+ row["_name"] +"</div>"
		_box += "<table><tbody>"
		for(let key in row){
			if(fileds.hasOwnProperty(key) && row[key] !=null && row[key] != "" && key != "_name"){
				_box += "<tr><td><p style='text-align:right;padding:0.8rem 2rem 0.8rem 0;color:#92A6CB;white-space: nowrap;'>"+ fileds[key] +" ： </p></td><td><span style='white-space: nowrap;'>"+ row[key] +"</span></td></tr>"
			}
		}
		_box += "</tbody></table>"
		_div.innerHTML = _box
		el.appendChild(_div)
	},
	/**
	 * 判断是否立磨机本体
	 */
	isLMJBT(id){
		let data = ['LMJBT-M01', 'LMJBT-M02', 'LMJBT-M03', 'LMJBT-M04', 'LMJBT-M05', 'LMJBT-M06', 'LMJBT-M07', 'LMJBT-M08']
		return data.includes(id)
	}
}