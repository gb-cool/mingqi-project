import axios from 'axios'
export class Video{
	url = "http://10.12.3.98:31500/"
	alarmUrl = "http://10.12.67.2:8882/"
	constructor () {
		this.url = urlConfig.video
		this.alarmUrl = urlConfig.videoAlarm
	}
	/**
	 * 获取类别
	 * @param {Object} callback
	 */
	getRegions(callback){
		const path = this.url + 'data/hikvision/getRegions'	// 接口地址
		axios({
			method: 'get',
			url: path
		})
		.then(function (response) {
			if(response.data.code == '1000') callback(JSON.parse(response.data.data))
		})
		.catch(function (error) {
			console.log(error)
		});
	}
	/**
	 * 获取所有监控区域列表
	 * @param {Object} callback
	 */
	getCameras(callback){
		const path = this.url + 'data/hikvision/getCameras'	// 接口地址
		axios({
			method: 'get',
			url: path,
		})
		.then(function (response) {
			if(response.data.code == '1000') callback(JSON.parse(response.data.data))
		})
		.catch(function (error) {
			console.log(error)
		});
	}
	/**
	 * 根据 regionIndexCode 获取该类别下摄像头数据
	 * @param {Object} regionIndexCode
	 */
	getCamerasByRegionIndexCode(regionIndexCode, callback){
		const path = this.url + 'data/hikvision/getCamerasByRegionIndexCode'	// 接口地址
		const options = {
			method: 'GET',
			url: path,
			params: {regionIndexCode: regionIndexCode}
		};
		
		axios.request(options).then(function (response) {
			callback(response.data)
		}).catch(function (error) {
			console.error(error);
		})
	}
	/**
	 * 获取监控流
	 */
	getPreviewURLs(cameraIndexCode, callback){
		const path = this.url + 'data/hikvision/getPreviewURLs'	// 接口地址
		axios({
			method: 'get',
			url: path,
			params: {
				cameraIndexCode: cameraIndexCode
			}
		})
		.then((response) => {
			if(response.code = '1000') callback(JSON.parse(response.data.data))
		})
		.catch(function (error) {
			console.log(error)
		});
	}
	/**
	 * 按条件查询ISAPI报警协议信息
	 */
	getQueryISAPIAlarmInfo(callback){
		const options = {
		  method: 'POST',
		  url: this.alarmUrl + 'hikvision/queryISAPIAlarmInfo',
		  // headers: {'content-type': 'application/json'},
		  data: {}
		};
		
		axios.request(options).then(function (response) {
			if(response.code = '200') callback(response.data.data)
		}).catch(function (error) {
			console.error(error);
		});
	}
	/**
	 * 查询最新的ISAPI报警协议信息
	 */
	getQueryLatestISAPIAlarmInfo(callback){
		const options = {
			method: 'GET',
			url: this.alarmUrl + 'hikvision/queryLatestISAPIAlarmInfo'
		};
		
		axios.request(options).then(function (response) {
			if(response.code = '200') callback(response.data.data)
		}).catch(function (error) {
			console.error(error);
		});
	}
	/**
	 * IP与CameraIndexCode匹配
	 */
	getIpToCameraIndexCode(type = "ip", value){
		let data = [
			{ip: "10.12.108.67", cameraIndexCode:"943774873d6d40d3a889e51f7eb65742", cameraName: "M08回料观察孔"},
			{ip: "10.12.108.68", cameraIndexCode:"0ca2cea3a5054ff79186fb18e786593d", cameraName: "M08皮带"},
			{ip: "10.12.108.70", cameraIndexCode:"050ef47014bb4a969290d6a402918817", cameraName: "MO7皮带"},
			{ip: "10.12.108.71", cameraIndexCode:"648a363b96234bbeae87f9461c5aaadc", cameraName: "M07回料观察孔"},
			{ip: "10.12.108.73", cameraIndexCode:"a66792d98c9544be9c30a0a3324bef7e", cameraName: "M06皮带"},
			{ip: "10.12.108.74", cameraIndexCode:"b0e506d80a7b4722887ca42622f882d7", cameraName: "M06回料观察孔"},
			{ip: "10.12.108.76", cameraIndexCode:"6e2e4a17a94047b39d705d78c17b1215", cameraName: "M05皮带"},
			{ip: "10.12.108.77", cameraIndexCode:"e3205fa964d7465a9a5a329fcd0255bd", cameraName: "M05回料观察孔"},
			{ip: "10.12.108.79", cameraIndexCode:"10108e8f023641398725694b97c7687f", cameraName: "M04皮带"},
			{ip: "10.12.108.80", cameraIndexCode:"0847d0a86e8348e9959a3c35f2a1bfb7", cameraName: "M04回料观察孔"},
			{ip: "10.12.108.82", cameraIndexCode:"0f4285fc75464b57ae8568e92c45ae4c", cameraName: "M03皮带"},
			{ip: "10.12.108.83", cameraIndexCode:"301c743ed19542a5923fdfdcc14d6cba", cameraName: "M03回料观察孔"},
			{ip: "10.12.108.85", cameraIndexCode:"c3e0cd4b99384f65bc023587d9d8a23f", cameraName: "M02皮带"},
			{ip: "10.12.108.86", cameraIndexCode:"59ec0e7231f445d2919efe6c0a9ccb4d", cameraName: "M02回料观察孔"},
			{ip: "10.12.108.88", cameraIndexCode:"128c2de6f58f40c7a1a5e1582aece64f", cameraName: "M01皮带"},
			{ip: "10.12.108.89", cameraIndexCode:"bf4ccaaebcb241aa821e2130470b1545", cameraName: "M01回料观察孔"},
			{ip: "10.12.108.92", cameraIndexCode:"42bd83a11f6743e2a5ead19fa1129fa1", cameraName: "立磨间P116、P117皮带"},
			{ip: "10.12.108.93", cameraIndexCode:"0c48415794a746aaad3ef318390819cb", cameraName: "立磨间P116、P117皮带1"},
			{ip: "10.12.108.94", cameraIndexCode:"db81732c778243c485d32332ba2d2741", cameraName: "立磨间P114、P115皮带"},
			{ip: "10.12.108.95", cameraIndexCode:"8865d6634a39486685abc386b0ed62b2", cameraName: "立磨间P116、P117皮带2"},
		]
		if(Object.is(type, "all")){
			return data
		}else{
			return data.filter((item) => Object.is(item[type], value))
		}
	}
}