/**
 * 仓储
 * 请求返回样例：
{ 
	"data": [ 
		{
			"stockPlaceName": "CPIC堆场", 		--库位名称
			"stockPlaceCode": "CPIC", 			--库位编码
			"minStock": 0, 						最小库存
			"maxStock": 100, 						最大库存
			"currStock": 30, 						当前库存
			"materialShortName": null 			原料名称
		} 
	], 
	"code": 200, 
	"msg": "请求成功"
}
 */
import axios from 'axios'
export class WareHouse{
	url = 'http://10.12.67.2:8734/'
	constructor() {
		this.url = urlConfig.warehouse
	}
	getData(callback){
		const options = {
		  method: 'GET',
		  url: this.url + 'mesWmsStockApi/getCurrentStockNum'
		};
		
		axios.request(options).then(function (response) {
			if(callback){
				callback(response.data)
			}
			console.log(response);
		}).catch(function (error) {
			console.error(error);
		});
	}
}