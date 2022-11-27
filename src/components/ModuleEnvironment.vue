<!-- 环境信息 -->
<template>
	<div class="ModuleEnvironment">
		<div class="center">
			<div class="pie">
				<div class="chart">
					<ModulePieChart name="氧浓度" value="89" color='#0473F9' :barWidth='barWidth'/>
					<div class="price">89<span>%</span></div>
				</div>
				<p>氧浓度</p>
			</div>
			<div class="pie">
				<div class="chart">
					<ModulePieChart name="粉尘浓度" value="36" color='#FE9418' :barWidth='barWidth'/>
					<div class="price">36<span>%</span></div>
				</div>
				<p>粉尘浓度</p>
			</div>
			<div class="pie">
				<div class="chart">
					<ModulePieChart name="空气质量" :value="airQualityValue" color=' #00D98B' :barWidth='barWidth'/>
					<div class="price">{{airQuality}}</div>
				</div>
				<p>空气质量</p>
			</div>
		</div>
		<div class="weather">
			<h3>7天天气预报</h3>
			<ul>
				<li v-for="(item, index) in weatherData" 
				:key="index" 
				:class="[index==selectIndex?'active':'', selectIndex-index==1?'prev-active':'']"
				@mouseover="mouseOverEvent(index)">
					<p>{{ dateFilters(item.date, index)}}</p>
					<p class="icon">
						<img :src="getWeatherIcon(item.wea_img)" />
						<span>{{item.wea}}</span>
					</p>
					<p>{{item.tem_day}}℃</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import axios from 'axios'
	import ModulePieChart from './ModulePieChart.vue'
	export default {
		name: "ModuleEnvironment",
		components: {
			ModulePieChart
		},
		setup(){
			let barWidth = ref(6)	// 饼图宽度
			let selectIndex = ref(0)	// 选中天气序号
			const defaultWData = JSON.parse('[{"date":"2022-11-18","wea":"阴","wea_img":"yin","tem_day":"16","tem_night":"13","win":"西南风","win_speed":"<3级"},{"date":"2022-11-19","wea":"多云","wea_img":"yun","tem_day":"18","tem_night":"12","win":"西南风","win_speed":"<3级"},{"date":"2022-11-20","wea":"阴转小雨","wea_img":"yu","tem_day":"21","tem_night":"11","win":"东北风","win_speed":"<3级"},{"date":"2022-11-21","wea":"小雨转多云","wea_img":"yun","tem_day":"16","tem_night":"14","win":"西南风","win_speed":"<3级"},{"date":"2022-11-22","wea":"阴转小雨","wea_img":"yu","tem_day":"15","tem_night":"13","win":"东北风","win_speed":"<3级"},{"date":"2022-11-23","wea":"小雨","wea_img":"yu","tem_day":"16","tem_night":"14","win":"西南风","win_speed":"<3级"},{"date":"2022-11-24","wea":"小雨转多云","wea_img":"yun","tem_day":"16","tem_night":"13","win":"西南风","win_speed":"<3级"}]')
			let weatherData = ref(defaultWData)	// 一周天气数据
			let airQuality = ref('优')	// 空气质量
			let airQualityValue = ref(0)
			changeBarWidth()
			weather()
			function changeBarWidth(){
				if(window.innerWidth > 1920) {
					barWidth.value = 18
				}else{
					barWidth.value = 6
				}
			}
			window.addEventListener("resize", function () {
			    changeBarWidth()
			})
			function weather(){
				// 天气预报
				axios.get('https://www.yiketianqi.com/free/week?unescape=1&appid=51168891&appsecret=8NRa2gPZ&style=tw&skin=sogou&cityid=101041000')
				.then((response) => weatherData.value = response.data.data)
				.catch((error) => console.log(error))
				// 空气质量
				axios.get('https://www.yiketianqi.com/free/day?unescape=1&appid=51168891&appsecret=8NRa2gPZ&cityid=101041000')
				.then((response) => {
					const air = parseInt(response.data.air)
					if(air >= 0 && air <= 50){
						airQuality.value = '优'
						airQualityValue.value = 100
					} else if(air >= 51 && air <= 100){
						airQuality.value = '良'
						airQualityValue.value = 80
					} else if(air >= 101 && air <= 150){
						airQuality.value = '轻度'
						airQualityValue.value = 60
					} else if(air >= 151 && air <= 200){
						airQuality.value = '中度'
						airQualityValue.value = 40
					} else if(air >= 201 && air <= 300){
						airQuality.value = '重度'
						airQualityValue.value = 20
					}
				})
				.catch((error) => console.log(error))
			}
			
			/**
			 * 过滤时间
			 */
			function dateFilters(date, index){
				const weekNum = new Date(date).getDay();
				let week = "";
				switch (weekNum) {
				    case 0: week = "周日"; break;
				    case 1: week = "周一"; break;
				    case 2: week = "周二"; break;
				    case 3: week = "周三"; break;
				    case 4: week = "周四"; break;
				    case 5: week = "周五"; break;
				    case 6: week = "周六"; break;
				}
				if(index == 0){
					week = "今天"
				}else if(index == 1){
					week = "明天"
				}else if(index == 2){
					week = "后天"
				}
				return week;
			}
			/**
			 * @param {Object} name	// 天气图标名称
			 * 返回天气图标路径
			 */
			function getWeatherIcon(name){
				return require('../assets/img/weather/' + name + '.png')
			}
			/**
			 * @param {Object} index 天气序号
			 * 鼠标移入事件，改变天气序号
			 */
			function mouseOverEvent(index){
				selectIndex.value = index
			}
			return {
				barWidth,
				selectIndex,
				weatherData,
				airQuality,
				airQualityValue,
				dateFilters,
				getWeatherIcon,
				mouseOverEvent
			}
		}
	}
</script>

<style scoped>
	.ModuleEnvironment{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.center{
		margin: 0 40px;
		border-bottom: 3px solid #3C4863;
		height: 358px;
		overflow: hidden;
		box-sizing: border-box;
		padding: 60px 0 30px 0;
	}
	.pie{
		width: 33%;
		height: 100%;
		float: left;
	}
	.pie .chart{
		width: 100%;
		height: calc(100% - 75px);
		position: relative;
	}
	.pie .chart .price{
		font-size: 1.54rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.pie .chart .price span{
		font-size: 0.8rem;
	}
	.pie p{
		font-size: 1rem;
		text-align: center;
		margin-top: 25px;
		height: 50px;
		line-height: 50px;
	}
	/**
	 * 天气
	 */
	.weather{
		margin: 0 50px;
	}
	.weather h3{
		font-size: 1rem;
		font-weight: 400;
		margin: 46px 0;
	}
	.weather ul{
		overflow: hidden;	
	}
	.weather li{
		float: left;
		width: 14%;
		font-size: 0.9rem;
		text-align: center;
		padding: 46px 0;
		position: relative;
	}
	.weather li:first-child{
		margin-left: 1%;
	}
	.weather li::after{
		content: '';
		display: block;
		position: absolute;
		top: 23px;
		bottom: 46px;
		right: 0px;
		border-right: 1px solid #3C4863;
	}
	.weather li:last-child::after{
		border-right: 0px solid #3C4863;
	}
	.weather li img{
		display: block;
		margin: 0 auto;
	}
	.weather li span{
		font-size: 0.48rem;
	}
	.weather li .icon{
		margin: 40px 0 46px 0;
	}
	.weather li.active{
		background: rgba(0,64,255,0.32);
	}
	.weather li.active::after{
		border-right-width: 0;
	}
	.weather li.prev-active::after{
		border-right-width: 0;
	}
	@media screen and (max-width: 1920px) {
		.center{
			height: 114px;
			margin: 0 8px;
			border-bottom-width: 1px;
			padding: 12px 0 10px 0;
		}
		.pie .chart{
			height: calc(100% - 24px);
		}
		.pie .chart .price{
			font-size: 1.2rem;
		}
		.pie p{
			font-size: 1rem;
			height: 24px;
			line-height: 24px;
			margin-top: 6px;
		}
		
		.weather{
			margin: 0 8px;
		}
		.weather h3{
			margin: 15px 0 10px 0;
			text-indent: 5px;
		}
		.weather li{
			padding: 12px 0;
		}
		.weather li img{
			height: 38px;
		}
		.weather li .icon{
			margin: 8px 2px 10px 2px;
		}
		.weather li span{
			display: block;
			height: 32px;
			overflow: hidden;
		}
		.weather li::after{
			top: 7px;
			bottom: 12px;
		}
	}
</style>