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
	/**
	 * 获取格林尼治时间 GTM
	 */
	getGMT(format = "", timeStr){
		format = format || "YYYY-MM-DD hh:mm:ss";   //第一个参数不填时，使用默认格式
		let time = new Date()
		if(timeStr){
			time = new Date(timeStr)
		}
		// 与格林威治时间差（当前时区为东八区）
		const offset = time.getTimezoneOffset();  // => -480 因为格林尼治时间比本地时间小8h
		const stampGTM = time.getTime() + offset * 60 * 1000;	// 格林威治的当前时间的时间戳
		return this.getFormatTime(format, stampGTM)
	}
	/**
	 * 将 时间戳 转为 任意日期格式
	 */
	getFormatTime(format = "", num = new Date().getTime()){
		format = format || "YYYY-MM-DD hh:mm:ss";   //第一个参数不填时，使用默认格式
		let ret, date, renum;
		// 处理时间戳，js一般获取的时间戳是13位，PHP一般是10位,根据实际情况做判断处理
		if (num.toString().length == 10) {
		    date = new Date(parseInt(num) * 1000);
		} else {
		    date = new Date(parseInt(num));
		}
		const opt = {
		    "Y": date.getFullYear().toString(), // 年
		    "M": (date.getMonth() + 1).toString(), // 月
		    "D": date.getDate().toString(), // 日
		    "h": date.getHours().toString(), // 时
		    "m": date.getMinutes().toString(), // 分
		    "s": date.getSeconds().toString() // 秒
		    // 目前用的是这六种符号,有其他格式化字符需求可以继续添加，值必须转化成字符串
		};
		for (var k in opt) {
		    ret = new RegExp("(" + k + "+)").exec(format);
		    if (ret) {
		        renum = (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")) //根据复数前面是否补零,如“mm”补零，单“m”前面不补零
		        format = format.replace(ret[1], renum)  //替换
		    };
		};
		return format;
	}
}