/**
 * 车辆通行数据
 */
import axios from 'axios'
import qs from 'qs'
import { DateTime } from './dateTime.js'
export class Passage {
	url = 'http://10.12.67.2:8738/'
	constructor() {
		this.url = urlConfig.passage
	}
	getData(callback){
		const dateTime = new DateTime()
		let startTime = dateTime.getDateChange(-30)
		let endTime = dateTime.get('YYYY-MM-DD hh:mm:ss')
		const options = {
			method: 'POST',
			url: this.url + 'mesPurchaseBuyAccept/vehicleManagement',
			data: {
				"startTime": startTime,
				"endTime": endTime
			}
		}
		axios.request(options).then(function (response) {
			if(callback){
				callback(response.data)
			}
			// console.log(response.data);
		}).catch(function (error) {
			console.error(error);
		});
	}
	/**
	 * 获取LED屏数据
	 */
	getLedData(callback){
		const options = {
			method: 'POST',
			url: this.url + 'mesPurchaseBuyAccept/queryScreenMessage'
		};
		axios.request(options).then(function (response) {
			if(callback){
				callback(response.data)
			}
			// console.log(response);
		}).catch(function (error) {
			console.error(error);
		});
	}
}