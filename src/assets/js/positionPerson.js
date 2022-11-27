import CryptoJS from 'crypto-js'
import axios from 'axios'
class PositionPerson{
	Seekey = {	// 寻息@位置物联网开放平台
		// 接口请求方式式为POST，请求数据格式为json，返回数据格式为json，统一编码为UTF-8，
		// url: 'http://10.12.67.17:46000',
		url: 'api-Seekey',
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
		url: '/api-JoySuch',
		appId: this.Seekey.name,
		secret: this.Seekey.licence,
		Headers: {
			Authorization: ''
		}
	}
	constructor () {
		this.Seekey.Headers["X-Timestamp"] = Date.now()
		
		// X-Token：MD5(accessToken+MD5(signId+MD5(accessToken)).toLowerCase()+XTimestamp).toLowerCase()
		
		
		this.JoySuch.Headers.Authorization = this.getAuthorization()	
	}
	/*
	 获取AccessToken
	 通过Licence获取accessToken和signId（accessToken有效期：2小时），当accessToken失效需要调用
	 接口重新获取，accessToken获取后进行缓存方便使用。
	 */
	getAccessToken(){
		const path = this.Seekey.url + '/api/v3/getAccessToken'	// 接口地址
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
		// this.getToken(() => {
		// 	// this.getPersonList()	// 查询建筑下所有人员
		// 	this.getRealTimeData()	// 人员实时位置数据
		// 	// this.getSubscribe()	// 报（预）警信息订阅
		// })	
		// console.log(this)
	}
	/**
	 * 获取人员定位系统token
	 */
	getToken(callback = null){
		const path = this.JoySuch.url + '/api/v2/get-token'	// 接口地址
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
	getPersonList(){
		const path = this.JoySuch.url + '/api/v2/person/list'	// 接口地址
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
	 * 人员实时位置数据
	 */
	getRealTimeData(callback){
		const path = this.JoySuch.url + '/api/v2/person/realTimeData'	// 接口地址
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
		const path = this.JoySuch.url + '/api/v2/subscribe'	// 接口地址
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
}
/**
 * 寻息 位置物联网开放平台 接口类
 */
export class Seekey extends PositionPerson{
	constructor () {
		super()
		console.log(this)
	}
	
	getXToken(){
		
	}
}
