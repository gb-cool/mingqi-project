/**
 * 巡检机器人
 */
import axios from 'axios'
import qs from 'qs'
export class Robot {
	url = 'http://10.12.64.103:80/'
	token = null
	constructor() {
		this.url = urlConfig.robot
		this.getToken()
	}
	/**
	 * 获取授权信息
	 */
	getToken(callback){
		const options = {
			method: 'POST',
			url: this.url + 'surfaceInterface/surfaceLogin',
			data: {
				'username': 'admin',
				'password': 'admin123',
			}
		};
		axios.request(options).then((response) => {
			if(response.data.code == 0) {
				this.token = response.data.token
			}
			if(callback){
				callback(response.data)
			}
			// console.log(response);
		}).catch(function (error) {
			console.error(error);
		});
	}
	/**
	 * 查询机器人列表信息
	 */
	getSurfaceList(callback){
		const options = {
			method: 'POST',
			url: this.url + 'surfaceInterface/robot/surfaceList',
			headers: {
				'Content-Type': 'application/json',
				token: this.token
			}
		};
		axios.request(options).then(function (response) {
			if(callback){
				callback(response.data)
			}
		}).catch(function (error) {
			console.error(error);
		});
	}
	/**
	 * 查询机器人状态
	 */
	getRobotReportInfo(robotId, callback){
		const options = {
			method: 'POST',
			url: this.url + 'surfaceInterface/robot/robotReportInfo',
			data: {
				robotId: robotId,
			}
		};
		axios.request(options).then(function (response) {
			// console.log(response)
			if(callback){
				callback(response.data)
			}
		}).catch(function (error) {
			console.error(error);
		});
	}
	/**
	 * 获取机器人告警信息
	 */
	getAlarmList(robotId, callback){
		const options = {
			method: 'POST',
			url: this.url + 'surfaceInterface/alarm/surfacePageList',
			data: {
				robotId: robotId,
				startTime: '2020-12-12 10:10:00',
				endTime: '2020-12-30 10:10:00',
				itemType: 1,
				startIndex: 1,
				pageSize: 10
			}
		};
		axios.request(options).then(function (response) {
			if(callback){
				callback(response.data)
			}
		}).catch(function (error) {
			console.error(error);
		});
	}
}