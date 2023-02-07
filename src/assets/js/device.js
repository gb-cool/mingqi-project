/**
 * 物联网设备数据接入类
 */
import CryptoJS from 'crypto-js'
import axios from 'axios'
import qs from 'qs'
import { DateTime } from './dateTime.js'
export class Device {
	url = 'http://10.12.3.102:32076/'
	appId = 'cbd60b1fe4d64ac1a1ea9164117045bd' // 应用唯一标识。
	appKey = '30214779b8e44ecdbd0fde68913ac4bb'
	timestamp = '' // 请求时间，格式：YYYY-MM-DD HH:mm:ss
	signatureNonce = '' // 唯一随机数
	signature = '' // 签名结果串
	constructor() {
		// const interfaceParameter = require('../json/interfaceParameter.json')
		const interfaceParameter = urlConfig
		
		this.url = interfaceParameter.device
		
		const dateTime = new DateTime()
		this.timestamp = dateTime.getGMT()
		const signatureNonce = ((1 + Math.random()) * Math.pow(10, 16)).toString()
		this.signatureNonce = signatureNonce.substring(2, 15)
		this.signature = this.getSignature()

		// this.timestamp = '2022-11-21 01:30:27'
		// this.signatureNonce = '2453021281976'
		// this.signature = '77GRZtcc8zCU+mH9d58azOufERs='

		// this.getBatchDevices()
		// console.log(this)
	}
	/**
	 * 获取app下辖的设备列表
	 * 可按条件批量查询设备信息列表。
	 */
	getBatchDevices(callback) {
		const path = this.url + 'north-gateway/device-v001/batchDevices' // 接口地址
		const options = {
			method: 'POST',
			url: path,
			headers: {
				appId: this.appId,
				signature: this.signature,
				signatureNonce: this.signatureNonce,
				timestamp: this.timestamp,
				'Content': 'application/json'
			},
			data: {
				"appId": this.appId
			}
		}
		const result = require('../json/device.json')
		axios.request(options).then(function (response) {
			if(response.data.code == 200){
				if(callback) callback(response.data)
			}else{
				// if(callback) callback(result)
			}
			// console.log(response);
		}).catch(function (error) {
			console.log(error);
		});
		
		
	}
	/**
	 * 查询设备影子
	 * 查询单个或多个设备属性的历史数据。
	 */
	getQueryDeviceShadowList(deviceKey, projectId, callback) {
		const path = this.url + 'north-gateway/device-v001/queryDeviceShadowList'
		axios({
			method: 'post',
			url: path,
			headers: {
				appId: this.appId,
				timestamp: this.timestamp,
				signatureNonce: this.signatureNonce,
				signature: this.signature,
				"deviceKey": deviceKey,
				"projectId": projectId
			},
			data: {
				"deviceKey": deviceKey,
				"projectId": projectId
			}
		})
		.then(function(response) {
			if(callback) callback(response.data)
			// console.log(response.data);
		})
		.catch(function(error) {
			console.log(error);
		})
	}
	/**
	 * 查询设备运行状态
	 */
	getQueryDeviceShadow(deviceKey, projectId, callback) {
		const path = this.url + 'north-gateway/device-v001/queryDeviceShadow'
		axios({
				method: 'post',
				url: path,
				headers: {
					appId: this.appId,
					timestamp: this.timestamp,
					signatureNonce: this.signatureNonce,
					signature: this.signature,
					"deviceKey": deviceKey,
					"projectId": projectId
				},
				data: {
					"deviceKey": deviceKey,
					"projectId": projectId
				}
			})
			.then(function(response) {
				// console.log(response);
				if(callback) callback(response.data)
			})
			.catch(function(error) {
				console.log(error);
			})
	}
	/**
	 * 查询设备历史数据
	 */
	getDeviceDataHistory(deviceKey, projectId, callback) {
		const path = this.url + 'north-gateway/device-v001/getDeviceDataHistory'
		axios({
				method: 'post',
				url: path,
				headers: {
					appId: this.appId,
					timestamp: this.timestamp,
					signatureNonce: this.signatureNonce,
					signature: this.signature,
					"deviceKey": deviceKey,
					"projectId": projectId
				},
				data: {
					"deviceKey": deviceKey,
					"projectId": projectId
				}
			})
			.then(function(response) {
				// console.log(response);
				if(callback) callback(response.data)
			})
			.catch(function(error) {
				console.log(error);
			})
	}
	/**
	 * 获取签名字符串
	 */
	getSignature() {
		const content = this.appId + this.timestamp + this.signatureNonce
		const key = this.appKey
		const rawHmac = CryptoJS.HmacSHA1(content, key)
		return CryptoJS.enc.Base64.stringify(rawHmac)
	}
	/**
	 * 设备位置信息
	 */
	getWorkshop(name, deviceKey){
		let json = {
			workshop: "",	// 所属车间位置
			describe: "",	// 描述
			number: ""	//编号
		}
		switch(name){
			case "粉尘05":
				json.workshop="均化仓顶"; json.describe="北均化仓顶--中部附近"; json.number="22060046";
				break;
			case "粉尘03":
				json.workshop="均化仓顶"; json.describe="北均化仓顶--中部附近"; json.number="22060044";
				break;
			case "粉尘04":
				json.workshop="均化仓顶"; json.describe="南均化仓顶--中部附近"; json.number="22060065";
				break;
			case "粉尘16":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060057";
				break;
			case "粉尘02":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060043";
				break;
			case "粉尘12":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060049";
				break;
			case "粉尘11":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060052";
				break;
			case "粉尘10":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060042";
				break;
			case "粉尘07":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060047";
				break;
			case "粉尘09":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060050";
				break;
			case "粉尘1":
				json.workshop="立磨仓收尘器"; json.describe="立磨收尘器烟囱"; json.number="22060061";
				break;
			case "粉尘06":
				json.workshop="筛分间收尘器"; json.describe="筛分间收尘器烟囱"; json.number="22060053";
				break;
			case "粉尘13":
				json.workshop="破碎口收尘器"; json.describe="破碎口收尘器烟囱"; json.number="22060063";
				break;
			case "粉尘14":
				json.workshop="堆场"; json.describe="4#堆场墙壁上"; json.number="22060064";
				break;
			case "粉尘15":
				json.workshop="堆场"; json.describe="3#堆场墙壁上"; json.number="22060055";
				break;
			case "粉尘08":
				json.workshop="碎石车间收尘器"; json.describe="碎石车间收尘器烟囱"; json.number="22060062";
				break;
		}
		//根据设备Key值取数
		switch(deviceKey){
			case "1672044802000f4cb7":
				json.workshop="均化仓顶"; json.describe="西1"; json.number="ARRH-1243";
				break;
			case "1672044706000f0cac":
				json.workshop="均化仓底"; json.describe="北"; json.number="ARRJ-0090";
				break;
			case "1672044671000eef89":
				json.workshop="均化仓顶"; json.describe="东1"; json.number="ARRJ-0102";
				break;
			case "16720446280007f861":
				json.workshop="均化仓底"; json.describe="南"; json.number="ARRJ-0087";
				break;
			case "1672044593000648b1":
				json.workshop="均化仓顶"; json.describe="东2"; json.number="ARRJ-0112";
				break;
			case "1672044874000df6f2":
				json.workshop="均化仓顶"; json.describe="西3"; json.number="ARRJ-0244";
				break;
			case "167204484000069b09":
				json.workshop="均化仓顶"; json.describe="西2"; json.number="ARRJ-0086";
				break;
			case "1672044743000692b7":
				json.workshop="均化仓底"; json.describe="北"; json.number="ARRH-0282";
				break;
			case "16720444700006b413":
				json.workshop="均化仓底"; json.describe="南"; json.number="ARRH-1242";
				break;
			case "167204493900077ff6":
				json.workshop="均化仓顶"; json.describe="东3"; json.number="ARRJ-0228";
				break;
			case "1672044906000c039d":
				json.workshop="均化仓顶"; json.describe="西4"; json.number="ARRJ-0090";
				break;
			case "16684025060004a1cb":
				json.workshop="北均化仓顶"; json.describe="中部1"; json.number="22060023";
				break;
			case "1668402506000090d6":
				json.workshop="北均化仓顶"; json.describe="中部2"; json.number="22060024";
				break;
			case "1668402506000a56b4":
				json.workshop="南均化仓顶"; json.describe="中部4"; json.number="22060021";
				break;
			case "1667871736000cf96b":
				json.workshop="南均化仓顶"; json.describe="中部3"; json.number="22060022";
				break;
		}
		return json
	}
}
