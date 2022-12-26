/**
 * 车辆通行数据
 */
import axios from 'axios'
import qs from 'qs'
export class Passage {
	url = 'http://10.12.67.2:8738'
	constructor() {
		this.url = urlConfig.passage
	}
	getData(callback){
		const options = {
			method: 'POST',
			url: this.url + 'mesPurchaseBuyAccept/vehicleManagement',
			data: {
				// "startTime": '2021-1-12 00:00:00',
				// "endTime": '2022-12-17 20:00:00'
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
}