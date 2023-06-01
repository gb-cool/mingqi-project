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
		realTableData: [],	// 仓储堆场实时表格数据
		updateLEDPlane_3d: []
	},
	person: {
		// 人员
		allData: [],			// 所有人员数据
		realListData: []			// 重点区域人员实时数据
	},
	car:{
		// 车辆
		realListData: []	,// 车辆实时数据
		visitArrayData: [],	// 车辆出入实时数据
	},
	video: {
		// 视频
		oWebControl: null,		// 视频控件
		otherOWebControl: null, 
		listData: [],	// 重点区域列表数据
		limoListData: [],	//立磨车间摄像头数据
		selectCameraData: null,	// 选中摄像头数据
		gif:{
			"棒条给料机视频": {name: "棒条给料机", src: "振动给料机动态图.gif"},
			"鄂式破视频": {name: "鄂式破", src: "颚式破碎机动态图.gif"},
			"圆锥破视频": {name: "圆锥破", src: "圆锥破动态图.gif"},
			"筛分机视频": {name: "筛分机", src: "双层振动筛动态图.gif"},
			"立磨视频框": {name: "立磨机", src: "立磨视频框动态图.gif"},
		}
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
		allListData: [],	// 所有设备数据
		//对应关系数据
		relationData: [
			{_id: 'ZP01', _room:"破碎车间", _name: '棒条给料机 ZP01', _use: '颚破给料', _deviceKey: "1681301337000065e4"},
			{_id: 'ZP02', _room:"破碎车间", _name: '棒条给料机 ZP02', _use: '颚破给料', _deviceKey: "16813015240009b666"},
			{_id: 'EP01', _room:"破碎车间", _name: '颚式破碎机 EP01', _use: '粗碎', _deviceKey: "16812062350001c28e"},
			{_id: 'EP02', _room:"破碎车间", _name: '颚式破碎机 EP02', _use: '粗碎', _deviceKey: "1681206002000854c9"},
			{_id: 'YP01', _room:"破碎车间", _name: '单缸液压圆锥破碎机 YP01', _use: '细碎', _deviceKey: "1681347867000f4fa3"},
			{_id: 'YP02', _room:"破碎车间", _name: '单缸液压圆锥破碎机 YP02', _use: '细碎', _deviceKey: "168134799100004d57"},
			{_id: 'P-101', _room:"破碎车间", _name: '破碎料皮带 P-101', _use: '系列颚破、圆锥破底部出料皮带汇集', _deviceKey: "16813498400009b2c4"},
			{_id: 'P-102', _room:"破碎车间", _name: '破碎料皮带 P-102', _use: '系列颚破、圆锥破底部出料皮带汇集', _deviceKey: "1681349942000fe37f"},
			{_id: 'F-101', _room:"破碎车间", _name: '振动筛返料皮带 F-101', _use: '将筛上物输送返回至圆锥破中间仓', _deviceKey: "16813494590000232e"},
			{_id: 'F-102', _room:"破碎车间", _name: '振动筛返料皮带 F-102', _use: '将筛上物输送返回至圆锥破中间仓', _deviceKey: "168134956100038d12"},
			{_id: 'F-103', _room:"破碎车间", _name: '可移动皮带 F-103', _use: '圆锥破给料', _deviceKey: "16813496530003d089"},
			{_id: 'F-104', _room:"破碎车间", _name: '可移动皮带 F-104', _use: '圆锥破给料', _deviceKey: "168134975300079758"},
			{_id: 'CP-001', _room:"破碎车间", _name: '圆锥破中间仓 CP-001', _use: '圆锥破储存给料中间仓'},
			{_id: 'CP-002', _room:"破碎车间", _name: '圆锥破中间仓 CP-002', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-101', _room:"破碎车间", _name: '筛分回料除铁器 T-101', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-102', _room:"破碎车间", _name: '筛分回料除铁器 T-102', _use: '圆锥破储存给料中间仓'},
			{_id: 'SC-001', _room:"破碎车间", _name: '破碎除尘器', _use: '破碎收尘器', _deviceKey:"1681348135000b5528"},
			{_id: 'psxc_001', _room:"破碎车间", _name: '破碎行车', _use: ''},
			// 破碎车间总计 18
			{_id: 'SP01', _room:"筛分车间", _name: '双层振动筛 SP01', _use: '预先检查筛分', _deviceKey:"16813475730000b68f"},
			{_id: 'SP02', _room:"筛分车间", _name: '双层振动筛 SP02', _use: '预先检查筛分', _deviceKey:"16813476500003523c"},
			{_id: 'P-103', _room:"筛分车间", _name: '振动筛给料皮带 P-103', _use: '将破碎后的碎石爬坡输送至振动筛', _deviceKey: "1681369106000f5e10"},
			{_id: 'P-104', _room:"筛分车间", _name: '振动筛给料皮带 P-104', _use: '将破碎后的碎石爬坡输送至振动筛', _deviceKey: "16813676430009b075"},
			{_id: 'P-105', _room:"筛分车间", _name: '振动筛集料皮带 P-105', _use: '横向布置收集振动筛筛上物', _deviceKey: "16813500380008776c"},
			{_id: 'P-106', _room:"筛分车间", _name: '振动筛集料皮带 P-106', _use: '横向布置收集振动筛筛上物', _deviceKey: "16813507580003bcf8"},
			{_id: 'SC-002', _room:"筛分车间", _name: '筛分除尘器', _use: '筛分收尘器', _deviceKey: "1681371246000f25c9"},
			{_id: 'sfxc_001', _room:"筛分车间", _name: '筛分行车', _use: ''},
			// 筛分车间总计 8
			{_id: 'P-107', _room:"碎石配料间", _name: '振动筛出料皮带 P-107', _use: '将筛下物输送至碎石仓顶布料小车'},
			{_id: 'P-108', _room:"碎石配料间", _name: '振动筛出料皮带 P-108', _use: '将筛下物输送至碎石仓顶布料小车'},
			{_id: 'T-107', _room:"碎石配料间", _name: '破碎出料除铁器 T-107', _use: '圆锥破储存给料中间仓'},
			{_id: 'T-108', _room:"碎石配料间", _name: '破碎出料除铁器 T-108', _use: '圆锥破储存给料中间仓'},
			{_id: 'P-109', _room:"碎石配料间", _name: '移动卸料小车胶带机 P-109', _position:'碎石仓顶北侧', _use: ''},
			{_id: 'P-110', _room:"碎石配料间", _name: '移动卸料小车胶带机 P-110', _position:'碎石仓顶南侧', _use: ''},
			{_id: 'ydxc_109', _room:"碎石配料间", _name: 'P-109移动小车', _position:'', _use: ''},
			{_id: 'ydxc_110', _room:"碎石配料间", _name: 'P-110移动小车', _position:'', _use: ''},
			{_id: 'CS-101', _room:"碎石配料间", _name: '碎石仓101', _position:'', _use: '', _deviceKey:"16754098280005c4e2"},
			{_id: 'CS-102', _room:"碎石配料间", _name: '碎石仓102', _position:'', _use: '', _deviceKey:"1681356911000db943"},
			{_id: 'CS-103', _room:"碎石配料间", _name: '碎石仓103', _position:'', _use: '', _deviceKey:"168051393700022e23"},
			{_id: 'CS-104', _room:"碎石配料间", _name: '碎石仓104', _position:'', _use: '', _deviceKey:"167541154400035885"},
			{_id: 'CS-105', _room:"碎石配料间", _name: '碎石仓105', _position:'', _use: '', _deviceKey:"1675411851000bcf02"},
			{_id: 'CS-106', _room:"碎石配料间", _name: '碎石仓106', _position:'', _use: '', _deviceKey:"1675412200000efdbe"},
			{_id: 'CS-107', _room:"碎石配料间", _name: '碎石仓107(样仓)', _position:'', _use: '', _deviceKey:"1675412531000d28e0"},
			{_id: 'CS-108', _room:"碎石配料间", _name: '碎石仓108', _position:'', _use: '', _deviceKey:"167541939200094b1d"},
			{_id: 'CS-109', _room:"碎石配料间", _name: '碎石仓109', _position:'', _use: '', _deviceKey:"1675420046000c817d"},
			{_id: 'CS-110', _room:"碎石配料间", _name: '碎石仓110', _position:'', _use: '', _deviceKey:"16754261330001080f"},
			{_id: 'CS-111', _room:"碎石配料间", _name: '碎石仓111', _position:'', _use: '', _deviceKey:"167565493500014b8a"},
			{_id: 'CS-112', _room:"碎石配料间", _name: '碎石仓112', _position:'', _use: '', _deviceKey:"1675674133000d879d"},
			{_id: 'CS-113', _room:"碎石配料间", _name: '碎石仓113', _position:'', _use: '', _deviceKey:"1675674335000405e4"},
			{_id: 'CS-201', _room:"碎石配料间", _name: '碎石仓201', _position:'', _use: '', _deviceKey:"1675674483000cc897"},
			{_id: 'CS-202', _room:"碎石配料间", _name: '碎石仓202', _position:'', _use: '', _deviceKey:"1675674644000b5ee5"},
			{_id: 'CS-203', _room:"碎石配料间", _name: '碎石仓203', _position:'', _use: '', _deviceKey:"1675674794000ee729"},
			{_id: 'CS-204', _room:"碎石配料间", _name: '碎石仓204', _position:'', _use: '', _deviceKey:"16756749910002efaa"},
			{_id: 'CS-205', _room:"碎石配料间", _name: '碎石仓205', _position:'', _use: '', _deviceKey:"1675675153000a87a6"},
			{_id: 'CS-206', _room:"碎石配料间", _name: '碎石仓206', _position:'', _use: '', _deviceKey:"167567532400092094"},
			{_id: 'CS-207', _room:"碎石配料间", _name: '碎石仓207(样仓)', _position:'', _use: '', _deviceKey:"16756755830007779c"},
			{_id: 'CS-208', _room:"碎石配料间", _name: '碎石仓208', _position:'', _use: '', _deviceKey:"1675675745000ac15e"},
			{_id: 'CS-209', _room:"碎石配料间", _name: '碎石仓209', _position:'', _use: '', _deviceKey:"1675675883000d740b"},
			{_id: 'CS-210', _room:"碎石配料间", _name: '碎石仓210', _position:'', _use: '', _deviceKey:"16756761310006a1de"},
			{_id: 'CS-211', _room:"碎石配料间", _name: '碎石仓211', _position:'', _use: '', _deviceKey:"1675676334000802b6"},
			{_id: 'CS-212', _room:"碎石配料间", _name: '碎石仓212', _position:'', _use: '', _deviceKey:"1675679758000bf64b"},
			{_id: 'CS-213', _room:"碎石配料间", _name: '碎石仓213', _position:'', _use: '', _deviceKey:"1675679951000c27eb"},
			{_id: 'WP-101', _room:"碎石配料间", _name: '碎石配料皮带秤101', _position:'碎石仓底', _use: '', _deviceKey: "1681299667000cb2f2"},
			{_id: 'WP-102', _room:"碎石配料间", _name: '碎石配料皮带秤102', _position:'碎石仓底', _use: '', _deviceKey: "1681300614000474e3"},
			{_id: 'WP-103', _room:"碎石配料间", _name: '碎石配料皮带秤103', _position:'碎石仓底', _use: '', _deviceKey: "1681300907000acc6f"},
			{_id: 'WP-104', _room:"碎石配料间", _name: '碎石配料皮带秤104', _position:'碎石仓底', _use: '', _deviceKey: "16813010410009b1a0"},
			{_id: 'WP-105', _room:"碎石配料间", _name: '碎石配料皮带秤105', _position:'碎石仓底', _use: '', _deviceKey: "168130121800012398"},
			{_id: 'WP-106', _room:"碎石配料间", _name: '碎石配料皮带秤106', _position:'碎石仓底', _use: '', _deviceKey: "16813013500008d9f0"},
			{_id: 'WP-107', _room:"碎石配料间", _name: '碎石配料皮带秤107', _position:'碎石仓底', _use: '', _deviceKey: "1681301463000c569b"},
			{_id: 'WP-108', _room:"碎石配料间", _name: '碎石配料皮带秤108', _position:'碎石仓底', _use: '', _deviceKey: "16813015780009700f"},
			{_id: 'WP-109', _room:"碎石配料间", _name: '碎石配料皮带秤109', _position:'碎石仓底', _use: '', _deviceKey: "168130175400075628"},
			{_id: 'WP-110', _room:"碎石配料间", _name: '碎石配料皮带秤110', _position:'碎石仓底', _use: '', _deviceKey: "1681301857000c472c"},
			{_id: 'WP-111', _room:"碎石配料间", _name: '碎石配料皮带秤111', _position:'碎石仓底', _use: '', _deviceKey: "16813019770005e340"},
			{_id: 'WP-112', _room:"碎石配料间", _name: '碎石配料皮带秤112', _position:'碎石仓底', _use: '', _deviceKey: "1681302105000b5180"},
			{_id: 'WP-113', _room:"碎石配料间", _name: '碎石配料皮带秤113', _position:'碎石仓底', _use: '', _deviceKey: "1681302218000d90ae"},
			{_id: 'WP-201', _room:"碎石配料间", _name: '碎石配料皮带秤201', _position:'碎石仓底', _use: '', _deviceKey: "1681302508000aff51"},
			{_id: 'WP-202', _room:"碎石配料间", _name: '碎石配料皮带秤202', _position:'碎石仓底', _use: '', _deviceKey: "1681302740000cb16d"},
			{_id: 'WP-203', _room:"碎石配料间", _name: '碎石配料皮带秤203', _position:'碎石仓底', _use: '', _deviceKey: "16813028890006c86a"},
			{_id: 'WP-204', _room:"碎石配料间", _name: '碎石配料皮带秤204', _position:'碎石仓底', _use: '', _deviceKey: "16813030060008fe82"},
			{_id: 'WP-205', _room:"碎石配料间", _name: '碎石配料皮带秤205', _position:'碎石仓底', _use: '', _deviceKey: "1681303105000e4fd5"},
			{_id: 'WP-206', _room:"碎石配料间", _name: '碎石配料皮带秤206', _position:'碎石仓底', _use: '', _deviceKey: "16813031980006c4b2"},
			{_id: 'WP-207', _room:"碎石配料间", _name: '碎石配料皮带秤207', _position:'碎石仓底', _use: '', _deviceKey: "168130328500070516"},
			{_id: 'WP-208', _room:"碎石配料间", _name: '碎石配料皮带秤208', _position:'碎石仓底', _use: '', _deviceKey: "1681303381000553e9"},
			{_id: 'WP-209', _room:"碎石配料间", _name: '碎石配料皮带秤209', _position:'碎石仓底', _use: '', _deviceKey: "1681303474000e095c"},
			{_id: 'WP-210', _room:"碎石配料间", _name: '碎石配料皮带秤210', _position:'碎石仓底', _use: '', _deviceKey: "1681303568000c62c2"},
			{_id: 'WP-211', _room:"碎石配料间", _name: '碎石配料皮带秤211', _position:'碎石仓底', _use: '', _deviceKey: "168130367200016800"},
			{_id: 'WP-212', _room:"碎石配料间", _name: '碎石配料皮带秤212', _position:'碎石仓底', _use: '', _deviceKey: "16813037780002a867"},
			{_id: 'WP-213', _room:"碎石配料间", _name: '碎石配料皮带秤213', _position:'碎石仓底', _use: '', _deviceKey: "16813038730005053b"},
			{_id: 'P-111', _room:"碎石配料间", _name: '配料汇总皮带 P-111', _position:'北侧汇总皮带', _use: '', _deviceKey: "1681350859000f5dc2"},
			{_id: 'P-112', _room:"碎石配料间", _name: '配料汇总皮带 P-112', _position:'南侧汇总皮带', _use: '', _deviceKey: "168135096500000766"},
			{_id: 'P-113', _room:"碎石配料间", _name: '配料中转皮带 P-113', _position:'在线分析仪底部', _use: '', _deviceKey: "1681351052000f38a8"},
			{_id: 'P-113-1', _room:"碎石配料间", _name: '中子活化在线分析仪', _position:'在线分析仪底部', _use: ''},
			{_id: 'SC-003', _room:"碎石配料间", _name: '碎石仓顶除尘器1', _position:'', _use: '', _deviceKey: "168134891400046352"},
			{_id: 'SC-004', _room:"碎石配料间", _name: '碎石仓底配料除尘器', _position:'', _use: '', _deviceKey: "168134891400046352"},
			{_id: 'cddhl-1', _room:"碎石配料间", _name: '仓顶电动葫芦1', _position:'', _use: ''},
			{_id: 'cddhl-2', _room:"碎石配料间", _name: '仓顶电动葫芦2', _position:'', _use: ''},
			// 碎石配料间 总计 68
			{_id: 'P114', _room:"立磨车间", _name: '配料中转爬坡皮带 P114', _position:'西侧爬坡皮带', _use: '', _deviceKey: "1681351135000b0ef7"},
			{_id: 'P115', _room:"立磨车间", _name: '配料中转爬坡皮带 P115', _position:'东侧爬坡皮带', _use: '', _deviceKey: "16813513780001b65b"},
			{_id: 'P114M', _room:"立磨车间", _name: '除铁器 P114M', _position:'', _use: ''},
			{_id: 'P115M', _room:"立磨车间", _name: '除铁器 P115M', _position:'', _use: ''},
			{_id: 'P-116', _room:"立磨车间", _name: '移动卸料小车胶带机 P-116', _position:'碎石仓顶北侧', _use: ''},
			{_id: 'P-117', _room:"立磨车间", _name: '移动卸料小车胶带机 P-117', _position:'碎石仓顶南侧', _use: ''},
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
			{_id: 'LMJJSJ-M02', _room:"立磨车间", _name: '立磨机减速机M02', _position:'', _use: '', _deviceKey: "168146796400067d2d"},
			{_id: 'LMJJSJ-M03', _room:"立磨车间", _name: '立磨机减速机M03', _position:'', _use: '', _deviceKey: "168146825700091c2b"},
			{_id: 'LMJJSJ-M04', _room:"立磨车间", _name: '立磨机减速机M04', _position:'', _use: '', _deviceKey: "168146869200047837"},
			{_id: 'LMJJSJ-M05', _room:"立磨车间", _name: '立磨机减速机M05', _position:'', _use: '', _deviceKey: "1681469058000c40a1"},
			{_id: 'LMJJSJ-M06', _room:"立磨车间", _name: '立磨机减速机M06', _position:'', _use: '', _deviceKey: "168146932500034cdc"},
			{_id: 'LMJJSJ-M07', _room:"立磨车间", _name: '立磨机减速机M07', _position:'', _use: '', _deviceKey: "168146957000044ed0"},
			{_id: 'LMJJSJ-M08', _room:"立磨车间", _name: '立磨机减速机M08', _position:'', _use: '', _deviceKey: "1681469820000e7654"},
			{_id: 'LMFLQ-M01', _room:"立磨车间", _name: '分离器M01', _position:'', _use: '', _deviceKey: ""},
			{_id: 'LMFLQ-M02', _room:"立磨车间", _name: '分离器M02', _position:'', _use: '', _deviceKey: "16815280630007c4b6"},
			{_id: 'LMFLQ-M03', _room:"立磨车间", _name: '分离器M03', _position:'', _use: '', _deviceKey: "16815282070000f291"},
			{_id: 'LMFLQ-M04', _room:"立磨车间", _name: '分离器M04', _position:'', _use: '', _deviceKey: "168152949700024335"},
			{_id: 'LMFLQ-M05', _room:"立磨车间", _name: '分离器M05', _position:'', _use: '', _deviceKey: "1681528478000ae840"},
			{_id: 'LMFLQ-M06', _room:"立磨车间", _name: '分离器M06', _position:'', _use: '', _deviceKey: "168152887900051cb6"},
			{_id: 'LMFLQ-M07', _room:"立磨车间", _name: '分离器M07', _position:'', _use: '', _deviceKey: "16815290280004cac5"},
			{_id: 'LMFLQ-M08', _room:"立磨车间", _name: '分离器M08', _position:'', _use: '', _deviceKey: "168152915100080399"},
			{_id: 'LMDJ-M01', _room:"立磨车间", _name: '立磨主电机M01', _position:'', _use: '', _deviceKey:"16735812250003f39b"},
			{_id: 'LMDJ-M02', _room:"立磨车间", _name: '立磨主电机M02', _position:'', _use: '', _deviceKey:"1672825159000fb72f"},
			{_id: 'LMDJ-M03', _room:"立磨车间", _name: '立磨主电机M03', _position:'', _use: '', _deviceKey:"1672825280000ad947"},
			{_id: 'LMDJ-M04', _room:"立磨车间", _name: '立磨主电机M04', _position:'', _use: '', _deviceKey:"1672825567000c9946"},
			{_id: 'LMDJ-M05', _room:"立磨车间", _name: '立磨主电机M05', _position:'', _use: '', _deviceKey:"16728256160002d46d"},
			{_id: 'LMDJ-M06', _room:"立磨车间", _name: '立磨主电机M06', _position:'', _use: '', _deviceKey:"167282566200039a6f"},
			{_id: 'LMDJ-M07', _room:"立磨车间", _name: '立磨主电机M07', _position:'', _use: '', _deviceKey:"1672889351000906c1"},
			{_id: 'LMDJ-M08', _room:"立磨车间", _name: '立磨主电机M08', _position:'', _use: '', _deviceKey:"167282577000043b38"},
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
			{_id: 'CQ-01', _room:"立磨车间", _name: 'M01磨前仓', _position:'', _use: '', _deviceKey: "1681210370000a8c76"},
			{_id: 'CQ-02A', _room:"立磨车间", _name: 'M02磨前仓A', _position:'', _use: '', _deviceKey: "1681210507000178fa"},
			{_id: 'CQ-02B', _room:"立磨车间", _name: 'M02磨前仓B', _position:'', _use: '', _deviceKey: "1681210610000115b8"},
			{_id: 'CQ-03', _room:"立磨车间", _name: 'M03磨前仓', _position:'', _use: '', _deviceKey: "1681210714000a01dc"},
			{_id: 'CQ-04A', _room:"立磨车间", _name: 'M04磨前仓A', _position:'', _use: '', _deviceKey: "168121080000036438"},
			{_id: 'CQ-04B', _room:"立磨车间", _name: 'M04磨前仓B', _position:'', _use: '', _deviceKey: "16812108890006e587"},
			{_id: 'CQ-05A', _room:"立磨车间", _name: 'M05磨前仓A', _position:'', _use: '', _deviceKey: "1681210979000c6bb1"},
			{_id: 'CQ-05B', _room:"立磨车间", _name: 'M05磨前仓B', _position:'', _use: '', _deviceKey: "1681211072000e3b34"},
			{_id: 'CQ-06A', _room:"立磨车间", _name: 'M06磨前仓A', _position:'', _use: '', _deviceKey: "1681211166000b026d"},
			{_id: 'CQ-06B', _room:"立磨车间", _name: 'M06磨前仓B', _position:'', _use: '', _deviceKey: "1681211246000b5fc5"},
			{_id: 'CQ-07A', _room:"立磨车间", _name: 'M07磨前仓A', _position:'', _use: '', _deviceKey: "1681211326000abc75"},
			{_id: 'CQ-07B', _room:"立磨车间", _name: 'M07磨前仓B', _position:'', _use: '', _deviceKey: "1681211410000b302c"},
			{_id: 'CQ-08', _room:"立磨车间", _name: 'M08磨前仓', _position:'', _use: '', _deviceKey: "168121148900091441"},
			{_id: 'SC-M01', _room:"立磨车间", _name: 'M01收尘器', _position:'', _use: ''},
			{_id: 'SC-M02', _room:"立磨车间", _name: 'M02收尘器', _position:'', _use: ''},
			{_id: 'SC-M03', _room:"立磨车间", _name: 'M03收尘器', _position:'', _use: ''},
			{_id: 'SC-M04', _room:"立磨车间", _name: 'M04收尘器', _position:'', _use: ''},
			{_id: 'SC-M05', _room:"立磨车间", _name: 'M05收尘器', _position:'', _use: ''},
			{_id: 'SC-M06', _room:"立磨车间", _name: 'M06收尘器', _position:'', _use: ''},
			{_id: 'SC-M07', _room:"立磨车间", _name: 'M07收尘器', _position:'', _use: ''},
			{_id: 'SC-M08', _room:"立磨车间", _name: 'M08收尘器', _position:'', _use: ''},
			{_id: 'FJ-M01', _room:"立磨车间", _name: 'M01风机', _position:'', _use: '', _deviceKey: ""},
			{_id: 'FJ-M02', _room:"立磨车间", _name: 'M02风机', _position:'', _use: '', _deviceKey: "1681524669000d6264"},
			{_id: 'FJ-M03', _room:"立磨车间", _name: 'M03风机', _position:'', _use: '', _deviceKey: "1681524822000f3982"},
			{_id: 'FJ-M04', _room:"立磨车间", _name: 'M04风机', _position:'', _use: '', _deviceKey: "16815254150000879a"},
			{_id: 'FJ-M05', _room:"立磨车间", _name: 'M05风机', _position:'', _use: '', _deviceKey: "1681525715000fe6d3"},
			{_id: 'FJ-M06', _room:"立磨车间", _name: 'M06风机', _position:'', _use: '', _deviceKey: "1681525859000347dd"},
			{_id: 'FJ-M07', _room:"立磨车间", _name: 'M07风机', _position:'', _use: '', _deviceKey: "16815259870003a52e"},
			{_id: 'FJ-M08', _room:"立磨车间", _name: 'M08风机', _position:'', _use: '', _deviceKey: "1681526135000b2c6c"},
			{_id: 'QS-M01', _room:"立磨车间", _name: 'M01发送罐', _position:'', _use: ''},
			{_id: 'QS-M02', _room:"立磨车间", _name: 'M02发送罐', _position:'', _use: '', _deviceKey: "168161438700026ae0"},
			{_id: 'QS-M03', _room:"立磨车间", _name: 'M03发送罐', _position:'', _use: '', _deviceKey: "1681615226000e23cf"},
			{_id: 'QS-M04', _room:"立磨车间", _name: 'M04发送罐', _position:'', _use: '', _deviceKey: "16816154640001e0b5"},
			{_id: 'QS-M05', _room:"立磨车间", _name: 'M05发送罐', _position:'', _use: '', _deviceKey: "16816156810001c026"},
			{_id: 'QS-M06', _room:"立磨车间", _name: 'M06发送罐', _position:'', _use: '', _deviceKey: "168161586100040fb7"},
			{_id: 'QS-M07', _room:"立磨车间", _name: 'M07发送罐', _position:'', _use: '', _deviceKey: "1681616019000771ed"},
			{_id: 'QS-M08', _room:"立磨车间", _name: 'M08发送罐', _position:'', _use: '', _deviceKey: "16816161950007cc67"},
			{_id: 'LMXC-1', _room:"立磨车间", _name: '立磨行车1', _position:'', _use: ''},
			{_id: 'LMXC-2', _room:"立磨车间", _name: '立磨行车2', _position:'', _use: ''},
			// 立磨车间 总计 113
			{_id: 'CF-101', _room:"均化车间", _name: '高混料半成品仓1', _position:'北侧', _use: '', _deviceKey: "1681530107000c1063"},
			{_id: 'CF-103', _room:"均化车间", _name: '高混料半成品仓2', _position:'北侧', _use: '', _deviceKey: "168153051900065fa6"},
			{_id: 'CF-105', _room:"均化车间", _name: '高混料半成品仓3', _position:'北侧', _use: '', _deviceKey: "1681530807000bc1bd"},
			{_id: 'CF-107', _room:"均化车间", _name: '高混料半成品仓4', _position:'北侧', _use: '', _deviceKey: "1681531114000553b9"},
			{_id: 'CF-109', _room:"均化车间", _name: '高混料半成品仓5', _position:'北侧', _use: '', _deviceKey: "168153140000044df3"},
			{_id: 'CF-111', _room:"均化车间", _name: '高混料半成品仓6', _position:'北侧', _use: '', _deviceKey: "1681532104000f0141"},
			{_id: 'CF-102', _room:"均化车间", _name: '高混料半成品仓7', _position:'南侧', _use: '', _deviceKey: "16815303640007c1a2"},
			{_id: 'CF-104', _room:"均化车间", _name: '高混料半成品仓8', _position:'南侧', _use: '', _deviceKey: "1681530654000513e8"},
			{_id: 'CF-106', _room:"均化车间", _name: '高混料半成品仓9', _position:'南侧', _use: '', _deviceKey: "16815309470006720f"},
			{_id: 'CF-108', _room:"均化车间", _name: '高混料半成品仓10', _position:'南侧', _use: '', _deviceKey: "1681531253000134ca"},
			{_id: 'CF-110', _room:"均化车间", _name: '高混料半成品仓11', _position:'南侧', _use: '', _deviceKey: "1681531532000789d0"},
			{_id: 'CF-112', _room:"均化车间", _name: '高混料半成品仓12', _position:'南侧', _use: '', _deviceKey: "1681532405000e23e2"},
			{_id: 'CF-501', _room:"均化车间", _name: '高混料成品仓1', _position:'北侧', _use: '', _deviceKey: "168162592900055041"},
			{_id: 'CF-502', _room:"均化车间", _name: '高混料成品仓2', _position:'北侧', _use: '', _deviceKey: "168162612000076a7d"},
			{_id: 'CF-503', _room:"均化车间", _name: '高混料成品仓3', _position:'北侧', _use: '', _deviceKey: "1681626283000bd8b0"},
			{_id: 'CF-504', _room:"均化车间", _name: '高混料成品仓4', _position:'南侧', _use: '', _deviceKey: "16816264800002a638"},
			{_id: 'CF-505', _room:"均化车间", _name: '高混料成品仓5', _position:'南侧', _use: '', _deviceKey: "1681626803000e4dd0"},
			{_id: 'CF-506', _room:"均化车间", _name: '高混料成品仓6', _position:'南侧', _use: '', _deviceKey: "16816269970003a395"},
			{_id: 'CF-201', _room:"均化车间", _name: '高岭土半成品1', _position:'北侧', _use: '', _deviceKey: "1681532588000da269"},
			{_id: 'CF-202', _room:"均化车间", _name: '高岭土半成品2', _position:'北侧', _use: '', _deviceKey: "1681619555000538d4"},
			{_id: 'CF-203', _room:"均化车间", _name: '高岭土半成品3', _position:'北侧', _use: '', _deviceKey: "16816197330004c88e"},
			{_id: 'CF-601', _room:"均化车间", _name: '高岭土成品1', _position:'北侧', _use: '', _deviceKey: "168161778800064e49"},
			{_id: 'CF-602', _room:"均化车间", _name: '高岭土成品2', _position:'北侧', _use: '', _deviceKey: "168161797100099946"},
			{_id: 'CF-603', _room:"均化车间", _name: '高岭土成品3', _position:'北侧', _use: '', _deviceKey: "1681618634000b72ae"},
			{_id: 'CF-301', _room:"均化车间", _name: '叶腊石半成品1', _position:'南侧', _use: '', _deviceKey: "1681619894000f8657"},
			{_id: 'CF-302', _room:"均化车间", _name: '叶腊石半成品2', _position:'南侧', _use: '', _deviceKey: "1681620212000a8a7c"},
			{_id: 'CF-303', _room:"均化车间", _name: '叶腊石半成品3', _position:'南侧', _use: '', _deviceKey: "16816257280003444a"},
			{_id: 'CF-701', _room:"均化车间", _name: '叶腊石成品1', _position:'南侧', _use: '', _deviceKey: "16816192580002c900"},
			{_id: 'CF-702', _room:"均化车间", _name: '叶腊石成品2', _position:'南侧', _use: '', _deviceKey: "168161967100005ef4"},
			{_id: 'CF-703', _room:"均化车间", _name: '叶腊石成品3', _position:'南侧', _use: '', _deviceKey: "16816217510004cf6d"},
			{_id: 'CF-801', _room:"均化车间", _name: '接料仓1', _position:'北侧', _use: '', _deviceKey: "1681621986000e50ee"},
			{_id: 'CF-802', _room:"均化车间", _name: '接料仓2', _position:'南侧', _use: '', _deviceKey: "1681622217000c9f1b"},
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
			{_id: 'WD-101', _room:"均化车间", _name: '料斗称101', _position:'北侧', _use: '', _deviceKey: "168152694000067468"},
			{_id: 'WD-102', _room:"均化车间", _name: '料斗称102', _position:'南侧', _use: '', _deviceKey: "168152694000067468"},
			{_id: 'WD-103', _room:"均化车间", _name: '料斗称103', _position:'北侧', _use: '', _deviceKey: "168152694000067468"},
			{_id: 'WD-104', _room:"均化车间", _name: '料斗称104', _position:'南侧', _use: '', _deviceKey: "168152694000067468"},
			{_id: 'WD-105', _room:"均化车间", _name: '料斗称105', _position:'北侧', _use: '', _deviceKey: "168152694000067468"},
			{_id: 'WD-106', _room:"均化车间", _name: '料斗称106', _position:'南侧', _use: '', _deviceKey: "168152694000067468"},
			{_id: 'WD-107', _room:"均化车间", _name: '料斗称107', _position:'北侧', _use: '', _deviceKey: "1681531255000e5b8e"},
			{_id: 'WD-108', _room:"均化车间", _name: '料斗称108', _position:'南侧', _use: '', _deviceKey: "1681531255000e5b8e"},
			{_id: 'WD-109', _room:"均化车间", _name: '料斗称109', _position:'北侧', _use: '', _deviceKey: "1681531255000e5b8e"},
			{_id: 'WD-110', _room:"均化车间", _name: '料斗称110', _position:'南侧', _use: '', _deviceKey: "1681531255000e5b8e"},
			{_id: 'WD-111', _room:"均化车间", _name: '料斗称111', _position:'北侧', _use: '', _deviceKey: "1681531255000e5b8e"},
			{_id: 'WD-112', _room:"均化车间", _name: '料斗称112', _position:'南侧', _use: '', _deviceKey: "1681531255000e5b8e"},
			{_id: 'WD-201', _room:"均化车间", _name: '料斗称201', _position:'北侧', _use: '', _deviceKey: "168153483800090144"},
			{_id: 'WD-202', _room:"均化车间", _name: '料斗称202', _position:'北侧', _use: '', _deviceKey: "168153483800090144"},
			{_id: 'WD-203', _room:"均化车间", _name: '料斗称203', _position:'北侧', _use: '', _deviceKey: "168153483800090144"},
			{_id: 'WD-301', _room:"均化车间", _name: '料斗称301', _position:'南侧', _use: '', _deviceKey: "16815355250008878a"},
			{_id: 'WD-302', _room:"均化车间", _name: '料斗称302', _position:'南侧', _use: '', _deviceKey: "16815355250008878a"},
			{_id: 'WD-303', _room:"均化车间", _name: '料斗称303', _position:'南侧', _use: '', _deviceKey: "16815355250008878a"},
			{_id: 'GB-001', _room:"均化车间", _name: '刮板机1', _position:'西侧', _use: '', _deviceKey: "1681304270000119cc"},
			{_id: 'GB-002', _room:"均化车间", _name: '刮板机2', _position:'西侧', _use: '', _deviceKey: "16813043250006444c"},
			{_id: 'GB-003', _room:"均化车间", _name: '刮板机3', _position:'东侧', _use: '', _deviceKey: "1681304380000e3fb9"},
			{_id: 'GB-004', _room:"均化车间", _name: '刮板机4', _position:'东侧', _use: '', _deviceKey: "168130443700012b29"},
			{_id: 'TD-001', _room:"均化车间", _name: '皮带斗提机1', _position:'西侧', _use: '', _deviceKey: "1681304465000e52d3"},
			{_id: 'TD-002', _room:"均化车间", _name: '皮带斗提机2', _position:'西侧', _use: '', _deviceKey: "16813045400000b516"},
			{_id: 'TD-003', _room:"均化车间", _name: '皮带斗提机3', _position:'东侧', _use: '', _deviceKey: "16813046100000029e"},
			{_id: 'TD-004', _room:"均化车间", _name: '皮带斗提机4', _position:'东侧', _use: '', _deviceKey: "16813046670003a046"},
			{_id: 'SC-005', _room:"均化车间", _name: '粉料配料收尘器1', _position:'西侧', _use: '', _deviceKey: "1681348995000f85dd"},
			{_id: 'SC-006', _room:"均化车间", _name: '粉料配料收尘器2', _position:'西侧', _use: '', _deviceKey: "1681349097000165f8"},
			{_id: 'SC-007', _room:"均化车间", _name: '粉料配料收尘器3', _position:'东侧', _use: '', _deviceKey: "1681349171000aa1a3"},
			{_id: 'SC-008', _room:"均化车间", _name: '粉料配料收尘器4', _position:'东侧', _use: '', _deviceKey: "1681349239000f04ee"},
			{_id: 'XC-001', _room:"均化车间", _name: '充气斜槽1', _position:'西侧', _use: '', _deviceKey: "1681282369000a0307"},
			{_id: 'XC-002', _room:"均化车间", _name: '充气斜槽2', _position:'西侧', _use: '', _deviceKey: "1681282649000cbab3"},
			{_id: 'XC-003', _room:"均化车间", _name: '充气斜槽3', _position:'东侧', _use: '', _deviceKey: "168128294600069620"},
			{_id: 'XC-004', _room:"均化车间", _name: '充气斜槽4', _position:'东侧', _use: '', _deviceKey: "16812831070003beb7"},
			{_id: 'FL-001', _room:"均化车间", _name: '罗茨风机1', _position:'风机房', _use: '', _deviceKey: "1681346837000c2a73"},
			{_id: 'FL-002', _room:"均化车间", _name: '罗茨风机2', _position:'风机房', _use: '', _deviceKey: "16813474400004985c"},
			{_id: 'FX-001', _room:"均化车间", _name: '磁悬浮风机1', _position:'风机房', _use: '', _deviceKey: "1681295803000df3ad"},
			{_id: 'FX-002', _room:"均化车间", _name: '磁悬浮风机2', _position:'风机房', _use: '', _deviceKey: "1681295628000f1629"},
			{_id: 'FX-003', _room:"均化车间", _name: '磁悬浮风机3', _position:'风机房', _use: '', _deviceKey: "1681295469000159e0"},
			{_id: 'FX-004', _room:"均化车间", _name: '磁悬浮风机4', _position:'风机房', _use: '', _deviceKey: "1681295130000514b6"},
			{_id: 'QS-501', _room:"均化车间", _name: '均化发送罐CF501', _position:'北侧', _use: '', _deviceKey: "1682042131000779fc"},
			{_id: 'QS-503', _room:"均化车间", _name: '均化发送罐CF503', _position:'北侧', _use: '', _deviceKey: "16820426000001fca1"},
			{_id: 'QS-505', _room:"均化车间", _name: '均化发送罐CF505', _position:'北侧', _use: '', _deviceKey: "16820437960006ce7f"},
			{_id: 'QS-502', _room:"均化车间", _name: '均化发送罐CF502', _position:'南侧', _use: '', _deviceKey: "168204237100058230"},
			{_id: 'QS-504', _room:"均化车间", _name: '均化发送罐CF504', _position:'南侧', _use: '', _deviceKey: "168204351100049301"},
			{_id: 'QS-506', _room:"均化车间", _name: '均化发送罐CF506', _position:'南侧', _use: '', _deviceKey: "168204400700004117"},
			{_id: 'QS-601', _room:"均化车间", _name: '均化发送罐CF601', _position:'北侧', _use: '', _deviceKey: "168204395000069773"},
			{_id: 'QS-602', _room:"均化车间", _name: '均化发送罐CF602', _position:'北侧', _use: '', _deviceKey: "1682044178000c5a59"},
			{_id: 'QS-603', _room:"均化车间", _name: '均化发送罐CF603', _position:'北侧', _use: '', _deviceKey: "16820444480005ae62"},
			{_id: 'QS-701', _room:"均化车间", _name: '均化发送罐CF701', _position:'南侧', _use: '', _deviceKey: ""},
			{_id: 'QS-702', _room:"均化车间", _name: '均化发送罐CF702', _position:'南侧', _use: '', _deviceKey: ""},
			{_id: 'QS-703', _room:"均化车间", _name: '均化发送罐CF703', _position:'南侧', _use: '', _deviceKey: ""},
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
			// 均化车间 总计 137
		],
		fileds: {
			"default": {
				_id: "设备编号",
				_room: "所属车间",
				_name: "设备名称",
				_use: "设备功能",
				_position: "设备位置",
			},
			"4378968998977605600": {	//碎石配料车间 碎石仓
				"Customername": "供应商",
				"Feeding": "进料状态",
				"Material_Currentlevel": "料位",
				"Materialname": "物料名称",
				"Feed_over": "进料完成信号",
				// "EPYXState": null,
				// "FBFClose": null,
				// "FBFOpen": null,
				// "att_01": null,
				// "sa_serialNo": null,
				// "sa_switchState": null,
				// "time": "2023-04-18 12:19:13.096"
			},
			"4411239525297295400": {	// 配料系统 三方料斗称
				Batch_number: "批次号",
				Current_number_of_recipes: "配方当前次数",
				Ingredient_sequence: "配料序列",
				Ingredients_Target_Value_1: "配料目标值1",
				Ingredients_Target_Value_2: "配料目标值2",
				Ingredients_target_value_3: "配料目标值3",
				Ingredients_target_value_4: "配料目标值4",
				Ingredients_target_value_5: "配料目标值5",
				Ingredients_target_value_6: "配料目标值6",
				Single_maximum_weighing: "单次最大称重",
				Single_recipe_value_silo_1: "单次配方值料仓1",
				Single_Recipe_Value_Silo_2: "单次配方值料仓2",
				Single_Recipe_Value_Silo_3: "单次配方值料仓3",
				Single_Recipe_Value_Silo_4: "单次配方值料仓4",
				Single_recipe_value_silo_5: "单次配方值料仓5",
				Single_Recipe_Value_Silo_6: "单次配方值料仓6",
				Total_Recipe_Times: "配方总次数",
				Total_formula_value_silo_1: "总配方值料仓1",
				Total_formula_value_silo_2: "总配方值料仓2",
				Total_formula_value_silo_3: "总配方值料仓3",
				Total_formula_value_silo_4: "总配方值料仓4",
				Total_formula_value_silo_5: "总配方值料仓5",
				Total_formula_value_silo_6: "总配方值料仓6",
				"current_feedback-1": "螺旋电流反馈1",
				"current_feedback-2": "螺旋电流反馈2",
				"current_feedback-3": "螺旋电流反馈3",
				"current_feedback-4": "螺旋电流反馈4",
				"current_feedback-5": "螺旋电流反馈5",
				"current_feedback-6": "螺旋电流反馈6",
				// deviceKey: "1681531255000e5b8e"
				// time: "2023-04-17 15:41:13.852"
			},
			"4410140831751737300": {	//破碎车间 棒条给料机
				Winding_temperature_A: "A相绕组温度",
				Winding_temperature_B: "B相绕组温度",
				Winding_temperature_C: "C相绕组温度",
				current: "电流反馈",
				frequency: "频率反馈",
				ready: "备妥指示",
				// deviceKey: "1681301337000065e4"
				// time: "2023-04-17 14:26:51.998"
			},
			"4410140154245812000": {	// 充气斜槽
				Fan_current_1: "1风机电流",
				Fan_current_2: "2风机电流",
				pressure_1: "1压力",
				pressure_2: "2压力",
				pressure_3: "3压力",
				pressure_4: "4压力",
				// deviceKey: "1681282369000a0307",
				// time: "2023-04-17 12:31:13.153",
			},
			"4410488920597467000": {	// 磁悬浮风机
				Intake_flow_rate: "进气流量",
				Intake_temperature: "进口温度",
				Motor_current: "电机电流",
				Motor_temperature: "电机温度",
				Outlet_pressure: "出口压力",
				frequency: "反馈频率",
				outlet_temperature: "出口温度",
				// deviceKey: "1681295803000df3ad",
				// time: "2023-04-16 13:56:13.615",
			},
			"4410139972380791000": {	//破碎车间 颚式破碎机
				// "Operation_indication": "1",
				"Winding_temperature-A": "A相绕组温度",
				"Winding_temperature-B": "B相绕组温度",
				"Winding_temperature-C": "C相绕组温度",
				"current": "电流反馈",
				"ready": "备妥指示",
				// "time": "2023-04-16 13:59:13.925",
			},
			"4411239585296814000": {	// 粉料仓
				Customename: "供应商",
				Feed_over: "进料完成信号",
				Feeding: "进料状态",
				Material_Currentlevel: "料位",
				Materialname: "物料名称",
				QS_NUB: "当前进料磨机号",
				QS_NUB_I: "当前进料磨机号I",
				// deviceKey: "16815303640007c1a2"
				// time: "2023-04-17 15:36:13.810"
			},
			"4410489177100128000": {	// 刮板机
				current: "电流反馈",
				frequency: "频率反馈",
				// deviceKey: "168130443700012b29",
				// time: "2023-04-17 14:34:13.740",
			},
			"4374967688661963000": {	// 立磨主电机
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
				// "deviceKey": "设备KEY",
				"sa_serialNo": "sa_serialNo",
				"sa_switchState": "sa_switchState",
				"time": "台时",
			},
			"4410489231529611300": {	// 罗茨风机
				Outlet_pressure: "出口压力",
				current: "电流反馈",
				// deviceKey: "16813474400004985c",
				// time: "2023-04-16 13:59:13.421",
			},
			"4410488848619016000": {	//碎石配料车间 皮带秤
				ready: "备妥指示",
				// Deviation: "轻跑偏状态,重跑偏状态",
				"light Deviation": "轻跑偏状态",
				"repeat Deviation": "重跑偏状态",
				weight: "总累积量",
				// deviceKey: "1681299667000cb2f2",
				// time: "2023-04-23 05:22:13.171"
			},
			"4410489285900374000": {	// 皮带斗提机
				current: "电流反馈",
				// deviceKey: "16813046100000029e",
				// time: "2023-04-17 14:26:13.345",
			},
			"4410489396890046500": {	// 筛分车间 双层振动筛 筛粉机
				current: "电流反馈",
				ready: "备妥指示",
				// deviceKey: "16813475730000b68f"
				// time: "2023-04-17 14:42:00.323"
			},
			"4410489052747403300": {	// 收尘器
				Air_supply_pressure: "气源压力",
				Main_motor_current: "电流反馈",
				Main_motor_frequency: "频率反馈",		// 无数据
				ready: "备妥指示",
				// deviceKey: "16813488400008459a"
				// time: "2023-04-17 14:26:13.959"
			},
			"4410140981001851000": {	//破碎车间 圆锥破碎机
				Lubricating_oil_temperature: "润滑油温度",
				Spindle_temperature: "主轴温度",
				current: "电流反馈",
				// deviceKey: "168134799100004d57",
				ready: "备妥指示",
				// time: "2023-04-17 14:42:03.858",
			},
			"4410488992643027000": { // 运输皮带
				current: "电流反馈",
				frequency: "频率反馈",
				ready: "备妥指示",
				// deviceKey: "16813494590000232e",
				// time: "2023-04-17 15:31:25.867"
			},
			"4411239453629223000": {	// 立磨车间 发送罐
				CH_SS_VQ_LJ_VAL: "次数",
				CZ_VQ_DC_VAL: "单次重量",
				Current_warehouse_number: "当前仓号",
				LL_VQ_VAL: "输送流量",
				MI_START: "投运中",
				PT_VQ_VAL: "输送压力",
				QY_VQ_VAL: "气源压力",
				VQ_GZJD: "阶段名称",
				VQ_GZSJ: "进料时间",
				// deviceKey: "16816161950007cc67",
				// time: "2023-04-18 19:03:13.394",
			},
			"4411180601286201300": {	//立磨车间 分离器
				"FLQ-ZCT1": "温度1",
				"FLQ-ZCT2": "温度2",
				FLQ_DL: "电流",
				FLQ_ZS: "转速",
				// deviceKey: "168152949700024335"
				// time: "2023-04-23 11:24:19.234"
			},
			"4411180580167880700": {	//立磨车间 立磨风机
				"FJDJ-DL": "FJDJ-DL",
				"FJDJ-QZT": "FJDJ-QZT",
				"FJDJ-ZS-TZ": "FJDJ-ZS-TZ",
				"FJDJ-HZT": "FJDJ-HZT",
				// "deviceKey": "1681526135000b2c6c",
				// "time": "2023-04-18 19:03:13.978",
			},
			"4411180559502545000": {	//立磨车间 立磨减速机
				"JSJ-GSZT1": "JSJ-GSZT1",
				"JSJ-ZDFD1": "JSJ-ZDFD1",
				"JSJ-ZDFD2": "JSJ-ZDFD2",
				"JSJ-ZWT1": "JSJ-ZWT1",
				"JSJ-ZWT2": "JSJ-ZWT2",
				"JSJ-ZWT3": "JSJ-ZWT3",
				"JSJ-ZWT4": "JSJ-ZWT4",
				"JSJYZ-GYCKYL1": "JSJYZ-GYCKYL1",
				"JSJYZ-GYCKYL2": "JSJYZ-GYCKYL2",
				"JSJYZ-GYCKYL3": "JSJYZ-GYCKYL3",
				"JSJYZ-GYCKYL4": "JSJYZ-GYCKYL4",
				"JSJYZ-GYRKYL": "JSJYZ-GYRKYL",
				"JSJYZ-GYT": "JSJYZ-GYT",
				"JSJYZ-GYYL": "JSJYZ-GYYL",
				// deviceKey: "168146796400067d2d",
				// time: "2023-04-23 11:24:20.212",
			},
			"4410140472622846000": {	//立磨车间 磨前仓
				"Feed_over": "磨前仓进料结束",
				"Feeding": "磨前仓进料中",
				"Material_Currentlevel": "磨前仓当前料位值",
				// "deviceKey": "168121148900091441",
				// "time": "2023-04-23 11:12:14.884",
			}
		}
	}
}
/**
 * 公共方法
 */
var CachePublicFun = {
	showOSLabel: (row) => {
		console.log(row)
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
		let _unit = Object.is(row._hz_type, ' oxygen') ? '%Vol' : ' mg/m³'
		let el = document.getElementsByClassName("deviceCameraModelBox")[0]
		el.innerHTML = ""
		el.setAttribute('style', 'background:rgba(1, 0, 55, 0.4);padding:20px 84px 20px 20px;border-radius:14px;min-width: 82px;min-height: 32px;')
		let _div = document.createElement("div")
		_div.setAttribute('style', 'font-size:54px;color:#fff;position:relative;');
		_div.innerHTML ="<p style = 'width:40px;height:40px;border-radius:50%;position:absolute;top: 50%;transform: translate(0, -20px);background:"+ bg +"'></p>"+
		"<span style='margin-left:44px'>" + row.deviceName + "（"+ row._concentration + _unit +"）</span"
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
		let filed = {}
		filed = Object.assign(filed, fileds.default)
		if("productId" in row && fileds.hasOwnProperty(row.productId)){
			filed = Object.assign(filed, fileds[row.productId])
		}
		for(let key in row){
			if(filed.hasOwnProperty(key) && row[key] !=null && row[key] != "" && key != "_name"){
				_box += "<tr><td><p style='text-align:right;padding:0.8rem 2rem 0.8rem 0;color:#92A6CB;white-space: nowrap;'>"+ filed[key] +" ： </p></td><td><span style='white-space: nowrap;'>"+ row[key] +"</span></td></tr>"
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
	},
	// 根据楼层数，获取模型名称
	getLayerToName(layer){
		let name = "地面一层"
		switch(layer.toString()){
			case "1": 
				name = "地面一层"
				break;
			case "2":
				name = "地面二层"
				break;
			case "3":
				name = "地面三层"
				break;
			case "4":
				name = "地面四层"
				break;
			case "5":
				name = "地面五层"
				break;
			case "-1":
				name = "地面负一层"
				break;
		}
		return name
	}
}