/**
 * 日期时间处理类
 */
export class DateTime{
	constructor(){
	}
	/**
	 * 设置日期格式 YYYY年 MM月 DD日  hh时 mm 分 ss 秒
	 */
	get(format= 'YYYY-MM-DD'){
		const date = new Date()
		const map = {
			YYYY: date.getFullYear(),
			MM: (date.getMonth() + 1).toString().padStart(2, '0'),
			DD: date.getDate().toString().padStart(2, '0'),
			hh: date.getHours().toString().padStart(2, '0'),
			mm: date.getMinutes().toString().padStart(2, '0'),
			ss: date.getSeconds().toString().padStart(2, '0')
		}
		return format.replace(/YYYY|MM|DD|hh|mm|ss/gi, (matched) => map[matched])
	}
	/**
	 * 获取时间星期天
	 */
	getWeek(weekArr){
		if(!weekArr){
			weekArr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		}
		return weekArr[new Date().getDay()]
	}
}