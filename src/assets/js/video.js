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
}