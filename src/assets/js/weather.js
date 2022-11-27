import axios from 'axios'
export class Weather{
	getData(){
		axios.get('https://www.yiketianqi.com/free/week?unescape=1&appid=51168891&appsecret=8NRa2gPZ&style=tw&skin=sogou&cityid=101041000')
		.then(function (response) {
		    // 处理成功情况
		    console.log(response);
		})
		.catch(function (error) {
		    // 处理错误情况
		console.log(error);
		})
		.then(function () {
			// 总是会执行
		});
	}
}