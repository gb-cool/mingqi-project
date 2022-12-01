/**
 * 物联网设备数据接入类
 */
import CryptoJS from 'crypto-js'
import axios from 'axios'
import qs from 'qs'
import { DateTime } from './dateTime.js'
export class Device {
	url = 'http://10.12.3.102:32076'
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
			if(response.code == 200){
				if(callback) callback(response.data)
			}else{
				if(callback) callback(result)
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
		const path = this.url + '/north-gateway/device-v001/queryDeviceShadow'
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
}
