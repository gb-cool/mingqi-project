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
		// this.getToken()
	}
	/**
	 * 获取授权信息
	 */
	getToken(callback){
		const options = {
			method: 'POST',
			url: this.url + 'prod-api/surfaceInterface/surfaceLogin',
			data: {
				'username': 'admin',
				'password': 'admin123',
			}
		};
		axios.request(options).then((response) => {
			if(response.data.code == 200) {
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
			url: this.url + 'prod-api/surfaceInterface/robot/surfaceList',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token
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
			url: this.url + 'prod-api/surfaceInterface/robot/robotReportInfo',
			headers: {
				Authorization: this.token
			},
			data: {
				robotId: robotId,
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
	 * 获取机器人告警信息
	 */
	getAlarmList(robotId, callback){
		const options = {
			method: 'POST',
			url: this.url + 'prod-api/surfaceInterface/alarm/surfacePageList',
			headers: {
				Authorization: this.token
			},
			data: {
				robotId: robotId,
				startTime: '2020-12-12 10:10:00',
				endTime: '2023-02-09 10:10:00',
				"alarmType" : 1, 
				"pageNum" : 1, 
				"pageSize" : 10 
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