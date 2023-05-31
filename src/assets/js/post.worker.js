// worker.js ---子线程
import { Video } from './video.js'
import { Passage } from './passage.js'
import { WareHouse } from "./warehouse.js";
import { JoySuch, Seekey } from './positionPerson.js'

let config = null
let video = null	// 视频监控类
let passage = null	// led屏类
let warehouse = null	// 堆场
let joySuch	= null	// 人员
let seekey = null
let device = null	// 设备

/**
 * 获取视频监控数据
 */
function getVideoData(){
	const limoVideoData = video.getCamerasByRegionIndexCode('e6beca3d-fd0f-4da9-ac1c-83bb747bed6b', (result) => {
		if(Object.is(result.msg, "success")){
			let data = eval("("+ result.data +")")
			postMessage({mark: "video", use: "limoListData", data: data.data.list})
		}			
	})
	let mateData = video.getIpToCameraIndexCode("all")
	let limo3D = []
	mateData.forEach((item) => {
		limo3D.push({
			id: item.ip,
			name: item.cameraName
		})
	})
	postMessage({mark: "video", use: "limoCameraDeviceDataup_3d", data: limo3D})
}
/**
 * ==================================================
 * LED屏
 */
let roomJson = {
	"10.12.64.65": "outRoom5",
	"10.12.64.66": "outRoom6",
	"10.12.64.67": "outRoom4",
	"10.12.64.68": "outRoom3",
	"10.12.64.70": "outRoom1",
	"10.12.64.88": "outRoom2"
}
function getLedData(){
	passage.getLedData((result) => {
		let data = result.data.data
		let da = []
		let roomDa = []
		let messageData = {
			roadListData: [],
			roomListData: [],
		}
		data.forEach((item) => {
			let ledv = []
			if(Object.is(item.ip, "10.12.64.61") 
			|| Object.is(item.ip, "10.12.64.62") 
			|| Object.is(item.ip, "10.12.64.63") 
			|| Object.is(item.ip, "10.12.64.64")){
				switch(item.ip) {
					case "10.12.64.61": item.direction1 = "←";item.direction2 = "←";item.direction3 = "↑";item.direction4 = ""; break;
					case "10.12.64.62": item.direction1 = "←";item.direction2 = "←";item.direction3 = "";item.direction4 = ""; break;
					case "10.12.64.63": item.direction1 = "↑";item.direction2 = "←";item.direction3 = "";item.direction4 = ""; break;
					case "10.12.64.64": item.direction1 = "←";item.direction2 = "";item.direction3 = "";item.direction4 = ""; break;
				}
				if(!Object.is(getLedV(item.key1), "")){ledv.push(item.direction1 + " " + item.key1 + " " + item.value1)}
				if(!Object.is(getLedV(item.key2), "")){ledv.push(item.direction2 + " " + item.key2 + " " + item.value2)}
				if(!Object.is(getLedV(item.key3), "")){ledv.push(item.direction3 + " " + item.key3 + " " + item.value3)}
				if(!Object.is(getLedV(item.key4), "")){ledv.push(item.direction4 + " " + item.key4 + " " + item.value4)}
				if(ledv.length == 0) {ledv.push("LED")}
				item._value = ledv
				messageData.roadListData.push(item)
				da.push({id: item.ip,value: ledv})
			}
			// 车间LED
			if(Object.is(item.ip, "10.12.64.65") 
			|| Object.is(item.ip, "10.12.64.66") 
			|| Object.is(item.ip, "10.12.64.67") 
			|| Object.is(item.ip, "10.12.64.68") 
			|| Object.is(item.ip, "10.12.64.70")
			|| Object.is(item.ip, "10.12.64.88")){
				if(!Object.is(getLedV(item.key1), "")){ledv.push(item.key1 + " " + item.value1)}
				if(!Object.is(getLedV(item.key2), "")){ledv.push(item.key2 + " " + item.value2)}
				if(Object.is(item.ip, "10.12.64.65")) {ledv = ["破碎口B"]}
				if(Object.is(item.ip, "10.12.64.66")) {ledv = ["破碎口A"]}
				if(ledv.length == 0) {ledv.push("正在接入中")}
				item._value = ledv
				item._id = roomJson[item.ip]
				roomDa.push({id: roomJson[item.ip],value: ledv})
				messageData.roomListData.push(item)
			}
		})
		messageData.updataLEDforOutRoadPlane_3d = da
		messageData.updataRoomUpLEDplane_3d = roomDa
		postMessage({mark: "passage", use: "update", data: messageData})
	})
}
function getLedV(value){
	if(value == null || value == "null" || value == "") return ""
	return value
}
/**
 * ================================================
 * 获取堆场数据
 */
function wareHouseYard(callback){
    warehouse.getData((result) => {
        if (result.code == "200") {
            callback(result.data);
        }
    })
}
function getWareHouseData(){
	wareHouseYard((data) => {
		let da = []
		for(let i =0; i< data.length; i++){
			let p = data[i]
			if(p.stockPlaceCode != "tzdc-v"){
				da.push({
					stockPlaceCode: p.stockPlaceCode,
					materialShortName: p.materialShortName + " " +(parseInt(p.currStock) / parseInt(p.maxStock) * 100) +"%",
					currStock: p.currStock,
					maxStock: p.maxStock,
				})
			}
		}
		postMessage({mark: "warehouse", use: "update", data: {
			realTableData: data,
			updateLEDPlane_3d: da
		}})
	})
}
/**
 * ================================================
 * 巡检机器人
 */
function getRobotData(){
	postMessage({mark: "robot", use: "update", data: ""})
}
/**
 * ==================================================
 * 人员数据及定位
 */
function getAllPersonData(){
	joySuch.getToken(() => joySuch.getPersonList((result) => {
		let data = result.code == 0 ? result.data.content : []
		if(data.length == 0) return false
		let md = []
		let hideData = []
		data.forEach((p) => {
			md.push({id: p.sn, name: p.name})
			hideData.push(p.sn)
		})
		postMessage({mark: "person", use: "allData", data: {
			allData: data,
			hideData: hideData,
			initalizeMan_3d: md
		}})
	}))
}
let visitArrayData = []
async function realPersonAndCarData(){
	// 访客外来人员进出流水
	await joySuch.getVisitFind().then((response) => {
		let date = new Date()
		let d = date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0")
		let data = response.data.data
		let cData = data.filter(item => item.visitType == 1)
		let todadyData = cData.filter(item => item.leaveTime.includes(d) || item.visitTime.includes(d))
		let rData = cData
		if(todadyData.length > 0){
			rData = todadyData
		}
		visitArrayData = todadyData
		// 车辆访客信息	visitType = 1
		postMessage({mark: "person", use: "visitArrayData", data: rData})
	})
	joySuch.getRealTimeData(async (result) => {
		if(result.code == 0){	//成功
			let PCData =  result.data
			// 查询想对位置token值，并获取相对位置数据
			let _seekD = []
			await seekey.getBlts().then((response) => {
				if(response.data.errorCode == 0) _seekD = response.data.data.data
				mergePositionData(PCData, _seekD)	// 合并人员实时位置信息
			})
			// ctx.emit('getPersonNum', "（"+ personData.value.length +"人）")	// 将人员数量传递给父级
		}else if(result.code == 1002){  // token失效
			joySuch.getToken(() => realPersonAndCarData())
		}
	})
}
/**
 * 合并人员实时位置数据
 * 根据mac字段值匹配
 * @param {Object} joySuchData	// 人员实时位置信息
 * @param {Object} seekeyData	// 相对位置信息
 * @return {type}	// 返回人员实时位置信息
 */
let historyRealListData = []	// 记录历史数据
let carHistoryListData = []	// 记录车辆历史数据，用于判断车辆是否都存在，存在则不需要创建
async function mergePositionData(joySuchData, seekeyData){
	for(let i=0; i < joySuchData.length; i++){
		let _joyItem = joySuchData[i]
		let deviceNo = _joyItem.deviceNo	// 穿戴设备编号（Mac地址）
		for(let j = 0; j < seekeyData.length; j++){
			let _seeItem = seekeyData[j]
			let mac = _seeItem.mac
			if(Object.is(deviceNo, mac)){
				_joyItem.x = _seeItem.x
				_joyItem.y = _seeItem.y
			}
		}
	}
	let personHideData = []	// 需要隐藏的人员数据
	let carHideData = []	// 需要隐藏的车辆数据
	if(historyRealListData.length > 0){
		let historyData = historyRealListData	// 缓存的历史数据
		historyData.forEach((item) => {
			let isa = joySuchData.filter((e) => Object.is(e.deviceNo, item.deviceNo))
			if(isa.length == 0){
				item.specifictype == 4 ? carHideData.push(item.deviceNo) : personHideData.push(item.deviceNo)
			}
		})
	}
	historyRealListData = joySuchData // 人员车辆数据缓存
	let personData = joySuchData.filter((item) => (item.specifictype == '0' || item.specifictype == '1' || item.specifictype == '2'))
	// 人员模型显示
	let showData = []
	personData.forEach((item) => showData.push(item.deviceNo))
	
	
	let carData = joySuchData.filter((item) => (item.specifictype == '4'))
	// carData = personData
	// carData = [{
	// 	"deviceNo": "11",
	// 	"empName": "席波1",
	// 	"empNo": "",
	// 	"x": 244000,
	// 	"y": 551800
	// }]
	// console.log(carData)
	if(carData.length>0){
		// 获取卡号绑定的车辆信息
		let carVisitArray = visitArrayData
		carData.forEach(item => {
			let carVisit = carVisitArray.filter(da => Object.is(item.deviceNo, da.sn))
			if(carVisit.length > 0){
				item.empName = carVisit[0].name
				item._visit = carVisit[0]
				item._visit.x = item.x
				item._visit.y = item.y
			}
		})
	}
	// 车模型加载
	let carShowData = []
	carData.forEach(item => carShowData.push({id: item.deviceNo, name: item.empName == null ? item.deviceNo : item.empName,x: item.x,y: item.y}))
	let carJiaoJi = []	// 交集，车辆不做处理
	let carHide	= []	// 需隐藏车辆
	let carCreate = []	// 需要创建的车辆
	carHistoryListData.forEach(e => {
		let toggler = carShowData.filter(c => Object.is(e.id, c.id))
		toggler.length == 0 ? carHide.push(e) : carJiaoJi.push(toggler[0])
		// 计算车辆需要移动的距离
		if(toggler.length > 0){
			let dx = Math.abs(e.x - toggler[0].x);
			let dy = Math.abs(e.y - toggler[0].y);
			let dis = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))
			toggler[0].dis = dis
			let carDataActive =  carData.filter(c => Object.is(e.id, c.id))
			if(carDataActive.length>0){
				carDataActive[0].dis = dis
			}
		}
	})
	carShowData.forEach(e => {
		let toggler = carJiaoJi.filter(c => Object.is(e.id, c.id))
		if(toggler.length==0) carCreate.push(e)
	})
	// carData.forEach(item => {
	// 	carShowData.forEach(t => {
	// 		if(Object.is(item.deviceNo, t.id)){
	// 			item.dis = t.dis
	// 		}
	// 	})
	// })
	// console.log(carJiaoJi, carHide, carCreate)
	carHistoryListData = carShowData	// 车辆数据存储
	// console.log(carData)
	postMessage({mark: "person", use: "realData", data: {
		personHideData: personHideData,	// 人员隐藏
		personShowData: showData,	// 人员显示数据
		personData: personData,
		carData: carData,
		carCreate: carCreate,
		carHide: carHide,
	}})
}
/**
 * ================================================
 * 设备数据
 */
// 氧 粉尘浓度数据
let oxygenTableData = []
let stiveTableData = []
let verticalData = []	//立磨数据
function getDeviceData(){
	device.getBatchDevices((result) => {
		const devices= result.data.devices
		oxygenTableData = devices.filter((item) =>  item.productKey.includes('8814edb5acdf4cb4b28c790cd924ddc3'))	// 氧浓度数据
		oxygenTableData.forEach((item,index,self) => {
			let infoItem = getWorkShonInfoItem(item)
			item._code = infoItem.number
			item._workshop = infoItem.workshop
			item._describe = infoItem.describe
		})	// 关联设备编号
	
		stiveTableData = devices.filter((item) => item.productKey.includes('2e30f382fc624a36af2ad7559ed8c5f9'))	//粉尘浓度数据
		stiveTableData = stiveTableData.filter((item) => !Object.is(getWorkShonInfo(item, 'workshop'), ""))	// 过滤粉尘浓度数据位置为空的部分
		stiveTableData.forEach((item,index,self) => {
			let infoItem = getWorkShonInfoItem(item)
			item._code = infoItem.number
			item._workshop = infoItem.workshop
			item._describe = infoItem.describe
		})	// 关联设备编号
		
		verticalData = devices.filter((item) => item.productKey.includes('6cdd4ae792cb43588904cdd14f70f3d8'))	//立磨数据
		postMessage({mark: "device", use: "allData", data: {
			allListData: devices,	// 所有设备数据
			realTableData: verticalData // 磨列表数据
		}})
	})
}
function getWorkShonInfoItem(row){
	return device.getWorkshop(row.deviceName, row.deviceKey)
}
/**
 * ================================================
 * 初始执行
 */
function init(){
	getVideoData()	// 视频监控
	getAllPersonData() // 所有人员
	// getDeviceData()	// 设备
}
/**
 * ================================================
 * 定时实时执行
 */
let timeCount = 0	//计数器
function updateTime(){
	if(timeCount % 10){
		if(timeCount % 3600){
			seekey.getSeekeyAccessToken()
			joySuch.getToken(()=>{
				realPersonAndCarData()
			})
		}else{
			realPersonAndCarData()	// 人员和车辆
		}
	}
	if(timeCount % 34 ===0){
		getLedData()	// LED屏
	}
	if(timeCount % 56 ===0){
		getWareHouseData()	// 仓储堆场
	}
	if((timeCount % 7200) === 0){
		getRobotData()	// 巡检机器人
	}
	timeCount++
}
// 接收主线程发来的消息
onmessage = e => {
	// console.log('子线程接收到：', e.data)
	let data = e.data
	if(Object.is(data.mark, "config")){
		config = data.data
		video = new Video(config)
		passage = new Passage(config)
		warehouse = new WareHouse(config)
		joySuch = new JoySuch(config)
		seekey = new Seekey(config)
		init()
		setInterval(updateTime, 1000)
	}
}

// setInterval(()=>{
// 	// 向主线程发送消息
// 	postMessage(111})
// }, 1000)


