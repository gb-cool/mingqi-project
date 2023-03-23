import { Device } from "../assets/js/device.js";
import { WareHouse } from "../assets/js/warehouse.js";
import { clickLMJtoChangeColor_3d } from "./index";
import { Video } from '../assets/js/video.js'
/**
 * 查询立磨列表数据
 * callback： 回调方法
 */
/**
 * 
 verticalData=[
	 {
		deviceIdentifyType: "IMEI"							// 设备识别类型
		deviceKey: "1672889351000906c1"						// 设备KEY
		deviceName: "立磨机M7"								// 设备名称
		deviceUnique: "387248237493247923"					// 设备唯一标识码
		isSecure: false										
		level: 1											// 设备层级（是否子设备）
		parentDeviceKey: "16672011230001f8da"				// 父设备KEY
		productId: 4374967688661963000						// 产品ID
		productKey: "6cdd4ae792cb43588904cdd14f70f3d8"		// 产品名称
		projectId: "4351421399475294208"					// 项目ID		
		state: "1"
	},
	{...}
 ]
 */
export const batchDevices = (callback) => {
    const device = new Device();
    device.getBatchDevices((result) => {
        const devices = result.data.devices;
        let verticalData = devices.filter((item) =>
            item.productKey.includes("6cdd4ae792cb43588904cdd14f70f3d8")
        ); //立磨列表数据
        if (callback) {
            callback(verticalData);
        }
    });
};

/**
 * 根据设备KEY值，项目ID值获取磨机数据。
 * deviceKey：设备KEY， projectId： 项目I
 */
/**
 * 数据说明
 * 	result.data = {
		1#JYZH: null			// 1#加压值
		1#XYZH: null			// 1#卸压值
		2#JYZH: null			// 2#加压值
		2#XYZH: null			// 2#卸压值
		MJDJ-DL: "21.5058"		// 磨机电机电流
		MJDJ-HZT: "36.1"		// 磨机电机后轴温度
		MJDJ-QZT: null			// 磨机电机前轴温度
		MJDJ-RZT1: "65.9"		// 磨机电机绕组温度1
		MJDJ-RZT2: "66.6"		// 磨机电机绕组温度2
		MJDJ-RZT3: null			// 磨机电机绕组温度3
		MJDJ-RZT4: null			// 磨机电机绕组温度4
		MJDJ-RZT5: null			// 磨机电机绕组温度5
		MJDJ-RZT6: null			// 磨机电机绕组温度6
		MJDJ-ZS: "51.0001"		// 磨机电机转速
		att_01: null
		deviceKey: "167282577000043b38"
		sa_serialNo: null
		sa_switchState: null
		time: "2023-01-13 21:42:41.336"
	}
 */
export const deviceShadow = (deviceKey, projectId, callback) => {
    const device = new Device();
    device.getQueryDeviceShadow(deviceKey, projectId, (result) => {
        if (result.code == "200") {
            callback(result.data);
        }
    });
};

/**
 * 磨机点击事件
 */
export const deviceClickEvent = () => {
    // 设置动画贴图的颜色
    clickLMJtoChangeColor_3d("#ff0000", 0.99, 0.8);
};

/**
 * 仓储堆场数据
 * result.data = [
	{
		currStock: 0,					// 当前库存量
		materialShortName: "",			// 简称
		maxStock: 100,					// 最大库存量
		minStock: 0,					// 最小库存量
		stockPlaceCode: "tzdc-3-3",		// 库位编码
		stockPlaceName: "3#庹展堆场-3#"	// 库位名称
	}
	...
 ]
 */
export const wareHouseYard = (callback) => {
    const warehouse = new WareHouse();
    warehouse.getData((result) => {
        if (result.code == "200") {
            callback(result.data);
        }
    });
};

/*
	点击重点区域摄像头后，返回当前用户点击的摄像头id信息
	拿到id后，去找 class 为 deviceCameraModelBox 的元素往内部添加监控摄像头的样式。
	右侧顶部关闭按钮 class名称为 deviceCameraBox-close，样式文件在 ./industyEquip.css 内部，按照需求调整关闭按钮样式。
*/
export const focusCameraDeviceBackId = (id) => {
    // console.log("摄像头ID", id);
    let oWebControl = CacheData.video.oWebControl;
    if (oWebControl != null) {
        oWebControl
            .JS_RequestInterface({
                funcName: "setFullScreen",
            })
            .then(function (e) {
                console.log(e);
            });
    }
};

/*
	点击粉尘和氧浓度后，返回当前用户点击的粉尘浓度设备id信息
	拿到id后，去找 class 为 deviceCameraModelBox 的元素往内部添加粉尘和氧浓度的样式。
	右侧顶部关闭按钮 class名称为 deviceCameraBox-close，样式文件在 ./industyEquip.css 内部，按照需求调整关闭按钮样式。
	type = 具体是粉浓度设备  还是 氧浓度设备
*/
export const focusFenCenDeviceBackId = (id, type) => {
    let row = null;
    if (Object.is(type, "粉尘浓度")) {
        row = CacheData.stive.realTableData.filter((item) =>
            Object.is(item.deviceKey, id)
        )[0];
    } else {
        row = CacheData.oxygen.realTableData.filter((item) =>
            Object.is(item.deviceKey, id)
        )[0];
    }
    CachePublicFun.showOSLabel(row); // 粉尘氧浓度标签显示
};

// 立磨间巡检机器人点击事件
export const limoRobotClickFun = () => {
    document.getElementById("robotBtn").click();
};

// 立磨间摄像头设备点击事件
export const limoCameraToID = (id) => {
	CacheData.video.selectCameraData = new Video().getIpToCameraIndexCode("ip", id)[0]	// 根据ID获取关联值
	document.getElementById("openVideoDom").click()
    console.log("立磨间摄像头设备ID：", id);
};

/*
	用户点击场景里面的模型设备时，返回当前点击的是哪个车间以及具体设备ID
	拿到id后，去找 class 为 deviceCameraModelBox 的元素往内部添加需要展示的样式
	右侧顶部关闭按钮 class名称为 deviceCameraBox-close，样式文件在 ./industyEquip.css 内部，按照需求调整关闭按钮样式。
*/
export const userClickDeviceID = (room, id) => {
	let relation = CacheData.device.relationData.filter((item) => Object.is(item._id, id))
	if(relation.length > 0){
		let row = relation[0]
		const device = new Device()
		CachePublicFun.isLMJBT(row._id) ? device.setLMJBTData(row) : CachePublicFun.showDeviceLabel(row)	// 设备标签显示
		device.setDeviceAnimations(row)	// 设置设备动画
	}else{
		console.log("当前所处车间：", room, ";当前设备ID: ", id);
	}
};
