import CryptoJS from 'crypto-js'
import axios from 'axios'

class PositionPerson{
	Seekey = {	// 寻息@位置物联网开放平台
		// 接口请求方式式为POST，请求数据格式为json，返回数据格式为json，统一编码为UTF-8，
		// url: 'http://10.12.67.17:46000',
		url: 'http://10.12.67.17:46000/',
		name: 'client',
		licence: 'd63a6557aa5fe703cefc5cc50f846895',
		Headers: {
			'X-Token': '',		// 请求的签名
			'X-BuildId': '205046',	// 请求的建筑ID
			'X-Timestamp': '',	// 请求的时间戳（毫秒）
			'X-SignId':	''		// 签名ID，通过获取accessToken接口获取
		}
	}
	JoySuch = {	// 真趣化工人员定位系统
		// url: 'http://10.12.67.17:9999',
		url: 'http://10.12.67.17:9999',
		appId: this.Seekey.name,
		secret: this.Seekey.licence,
		Headers: {
			Authorization: ''
		}
	}
	constructor () {
		// const interfaceParameter = require('../json/interfaceParameter.json')
		const interfaceParameter = urlConfig
		this.Seekey.Headers["X-Timestamp"] = Date.now()
		this.Seekey.url = interfaceParameter.Seekey

		this.JoySuch.url = interfaceParameter.JoySuch
		this.JoySuch.Headers.Authorization = this.getAuthorization()	
	}
	/*
	 获取AccessToken
	 通过Licence获取accessToken和signId（accessToken有效期：2小时），当accessToken失效需要调用
	 接口重新获取，accessToken获取后进行缓存方便使用。
	 */
	getAccessToken(){
		const path = this.Seekey.url + 'api/v3/getAccessToken'	// 接口地址
		axios({
			method: 'post',
			url: path,
			params: {
				licence: this.Seekey.licence
			}
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	/**
	 * Authorization生成规则
	 */
	getAuthorization(){
		// clientd63a6557aa5fe703cefc5c2340567890
		const one = CryptoJS.MD5(this.JoySuch.appId + this.JoySuch.secret).toString()
		return CryptoJS.MD5(one).toString().toLocaleUpperCase()
	}
}

/**
 * 真趣化工人员定位系统 接口类
 */
export class JoySuch extends PositionPerson{
	token = null
	constructor () {
		super()
		// 获取Token
		this.getToken(() => {
			// this.getSubscribe()	// 报（预）警信息订阅
			this.getAlarmList()
		})	
	}
	/**
	 * 获取人员定位系统token
	 */
	getToken(callback = null){
		const path = this.JoySuch.url + 'api/v2/get-token'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'Authorization': this.JoySuch.Headers.Authorization,
			},
			data: {
				buildIdList: ['205046'],
				appId: this.JoySuch.appId
			}
		})
		.then( (response) => {
			const data = response.data
			if(Object.is(data.status, 'success')){
				this.token = data.data
				if(callback) callback()
			}else{
				console.log(data)
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	/**
	 * 查询建筑下所有内部人员
	 */
	getPersonList(callback){
		const path = this.JoySuch.url + 'api/v2/person/list'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
			    "buildId":"205046",
			    "pageNumber":1,
			    "pageSize":100
			}
		})
		.then( (response) => {
			const data = response.data
			if(Object.is(data.status, 'success')){
				if(callback) callback(response.data)
			}else{
				console.log(data)
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	/**
	 * 人员实时位置数据
	 * 经纬度坐标系 WGS84
	 */
	getRealTimeData(callback){
		const path = this.JoySuch.url + 'api/v2/person/realTimeData'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
			    "buildId":"205046"
			}
		})
		.then( (response) => { 
			if(callback) callback(response.data)
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	/**
	 * 	报（预）警信息订阅
	 * 	报警类型订阅====>>>>>>
		区域报警 ：areaAlarm
		车辆报警 ：alarmEvent
		作业报警 ：jobAlarmEvent
	 */
	getSubscribe(){
		const path = this.JoySuch.url + 'api/v2/subscribe'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
			    "buildId":"205046",
				"type":"jobAlarmEvent",
			    "requestServerUrl": "http://10.12.67.17:9999/subscribe/callback/areaAlarm"
			}
		})
		.then( (response) => {
			console.log(response)
			const data = response.data
			if(Object.is(data.status, 'success')){
				console.log(data)
			}else{
				console.log(data)
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	/**
	 * 查询报警列表
	 */
	// 人员报警（一键报警、越界报警、滞留报警、超员报警、缺员报警、静止报警） 如下类型
	// 一键报警：oneKeyAlarm:alarm
	// 滞留预警：stayAlarm
	// 越界报警：overBoundaryAlarm
	// 超员预警：overNum
	// 缺员预警：lackNum
	// 静止预警：stillAlarm
	// 车辆报警（超速报警）如下类型
	// 车辆超速报警：alarmSpeed
	// 作业报警（作业人员离开报警、非作业人员闯入报警）如下类型
	// 作业人员离开报警	  ：leaveAlarm
	// 非作业人员闯入报警   ：intrudeAlarm
	getAlarmList(callback){
		const path = this.JoySuch.url + 'api/v2/alarm/list'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
				buildId: '205046',
				pageNumber: 1,
				pageSize: 100
			}
		})
		.then((response) => {
			if(callback) callback(response.data)
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	/**
	 * 查询区域列表
	 */
	getAreaList(){
		const path = this.JoySuch.url + 'api/v2/area/list'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
				buildId: '205046'
			}
		})
		.then((response) => {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	/**
	 * 查询区域分类列表
	 */
	getAreaClassifyList(){
		const path = this.JoySuch.url + 'api/v2/area/classify-list'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
				buildId: '205046'
			}
		})
		.then((response) => {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	/**
	 * 查询当前区域人数
	 */
	getAreaPersonCount(){
		const path = this.JoySuch.url + 'api/v2/area/person-count'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
				buildId: '205046'
			}
		})
		.then((response) => {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	/**
	 * 查询风险分区列表
	 */
	getAreaRiskList(){
		const path = this.JoySuch.url + 'api/v2/risk/list'	// 接口地址
		axios({
			method: 'post',
			url: path,
			headers: {
				'token': this.token
			},
			data: {
				buildId: '205046',
				pageNumber: 1,
				pageSize: 100
			}
		})
		.then((response) => {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error);
		})
	}
}
/**
 * 寻息 位置物联网开放平台 接口类
 */
export class Seekey extends PositionPerson{
	constructor () {
		super()
	}
	/**
	 * 通过Licence获取accessToken和signId（accessToken有效期：2小时），当accessToken失效需要调口
	   接口重新获取，accessToken获取后进行缓存方便使用。
	 */
	getSeekeyAccessToken(callback){
		const options = {
			method: 'POST',
			url: this.Seekey.url + 'api/v3/getAccessToken',
			data: {licence: 'd63a6557aa5fe703cefc5cc50f846895'}
		};
		let that = this
		axios.request(options).then(function (response) {
			if(response.data.errorCode == 0){
				let da = response.data.data
				that.Seekey.Headers['X-SignId'] = da.signId
				that.Seekey.Headers['X-Token'] = that.getXToken(da.accessToken, da.signId, that.Seekey.Headers['X-Timestamp'])
				if(callback){
					callback()
				}
			}
			// console.log(response)
		}).catch(function (error) {
			console.error(error)
		});
	}
	/**
	 * 签名算法
	 * @param {Object} accessToken	用户凭证，获取accessToken接口获取到accessToken
	 * @param {Object} signId		签名ID
	 * @param {Object} timestamp	当前请求的时间戳（毫秒）
	 */
	getXToken(accessToken, signId, timestamp){
		return CryptoJS.MD5(accessToken + CryptoJS.MD5(signId + CryptoJS.MD5(accessToken)).toString().toLowerCase()+ timestamp).toString().toLowerCase();
	}
	
	/**
	 * 通过建筑ID获取该建筑下标签列表信息。查询结果支持分页
	 */
	getBlts(callback){
		const options = {
			method: 'POST',
			url: this.Seekey.url + 'api/v4/device/blts',
			headers: this.Seekey.Headers,
			data: {pageNum: 1, pageSize: 100}
		};
		axios.request(options).then(function (response) {
			if(callback){
				callback(response.data)
			}
			// console.log(response)
		}).catch(function (error) {
			console.error(error)
		});
	}
}
