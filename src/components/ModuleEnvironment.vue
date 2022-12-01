<!-- 环境信息 -->
<template>
	<div class="ModuleEnvironment">
		<div class="center">
			<div class="pie" @click="showEvent('oxygen')" style="cursor: pointer;">
				<div class="chart">
					<div class="point" v-if="Object.is(stiveItemColor, '#D10202')"></div>
					<ModulePieChart name="氧浓度" value="100" :color='oxygenItemColor' :barWidth='barWidth'/>
					<div class="price">{{oxygenItemMax}}<span>%</span></div>
				</div>
				<p>氧浓度</p>
			</div>
			<div class="pie" @click="showEvent('stive')" style="cursor: pointer;">
				<div class="chart">
					<div class="point" v-if="Object.is(stiveItemColor, '#D10202')"></div>
					<ModulePieChart name="粉尘浓度" value="100" :color='stiveItemColor' :barWidth='barWidth'/>
					<div class="price">{{stiveItemMax}}<span>%</span></div>
				</div>
				<p>粉尘浓度</p>
			</div>
			<div class="pie">
				<div class="chart">
					<ModulePieChart name="空气质量" :value="airQualityValue" :color='airQualityColor' :barWidth='barWidth'/>
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
	import { ref, inject, provide, onMounted, onDeactivated } from 'vue'
	import axios from 'axios'
	import ModulePieChart from './ModulePieChart.vue'
	import { Device } from '../assets/js/device.js'
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
			let airQualityColor = ref('#00D98B')
			let color = {
				one: '#00D98B',
				two: '#FFF100',
				three: '#FE9418',
				four: '#D10202'
			}
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
						airQualityColor.value = color.one
					} else if(air >= 51 && air <= 100){
						airQuality.value = '良'
						airQualityColor.value = color.one
						airQualityValue.value = 100
					} else if(air >= 101 && air <= 150){
						airQuality.value = '轻度'
						airQualityValue.value = 100
						airQualityColor.value = color.two
					} else if(air >= 151 && air <= 200){
						airQuality.value = '中度'
						airQualityValue.value = 100
						airQualityColor.value = color.three
					} else if(air >= 201 && air <= 300){
						airQuality.value = '重度'
						airQualityValue.value = 100
						airQualityColor.value = color.four
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
			
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹出标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	//弹出结构
			let popupType = inject('popupType') // 弹窗内容类型
			// 氧浓度、 粉尘浓度点击详情
			const showEvent = (type) => {
				popupIsShow.value = true
				popupTitle.value = Object.is(type, 'oxygen') ? "氧浓度" : "粉尘浓度"
				popupContent.value = ""
				popupFileds.value = ""
				popupType.value = type
			}
			
			// 氧 粉尘浓度数据
			const oxygenTableData = ref()
			const stiveTableData = ref()
			const oxygenItemMax = ref(0)
			const stiveItemMax = ref(0)
			
			const oxygenItemColor = ref(color.one)
			const stiveItemColor = ref(color.one)
			
			const device = new Device()
			device.getBatchDevices((result) => {
				const devices= result.data.devices
				oxygenTableData.value = devices.filter((item) =>  item.deviceName.includes('氧'))
				stiveTableData.value = devices.filter((item) => item.deviceName.includes('粉尘'))
				let _index = 0
				if(oxygenTableData.value.length > 0){
					const item = oxygenTableData.value[0]
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						_index++
						if(result.code == 200) oxygenItemMax.value = parseFloat(result.data['O2']).toFixed(2)
						if(_index > 1) realTime()
					})
				}
				if(stiveTableData.value.length > 0){
					const item = stiveTableData.value[0]
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						_index++
						if(result.code == 200) stiveItemMax.value = parseFloat(result.data['dust_concent']).toFixed(2)
						if(_index > 1) realTime()
					})
				}
			})
			const realTime = (status = null) => {
				oxygenTableData.value.forEach((item) => {
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						if(result.code == 200){
							oxygenItemMax.value = Math.max(oxygenItemMax.value, parseFloat(result.data['O2']).toFixed(2))
							if(oxygenItemMax.value < 19.5){
								oxygenItemColor.value = color.one
							}else if(oxygenItemMax.value >= 19.5 && oxygenItemMax.value < 23.5){
								oxygenItemColor.value = color.two
							}else{
								oxygenItemColor.value = color.four
							}
						}
					})
				})
				stiveTableData.value.forEach((item) => {
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						if(result.code == 200){
							stiveItemMax.value = Math.max(stiveItemMax.value, parseFloat(result.data['dust_concent']).toFixed(2))
							if(stiveItemMax.value < 30){
								stiveItemColor.value = color.one
							}else if(stiveItemMax.value >= 30 && stiveItemMax.value < 60){
								stiveItemColor.value = color.two
							}else{
								stiveItemColor.value = color.four
							}
						}
					})
				})
			}
			const timer = ref(0)
			onMounted(()=>{ //组件挂载时的生命周期执行的方法
				timer.value = window.setInterval(realTime, 100000)
			})
			onDeactivated(()=>{ //离开当前组件的生命周期执行的方法
				window.clearInterval(timer.value);
			})
			
			return {
				barWidth,
				selectIndex,
				weatherData,
				airQuality,
				airQualityValue,
				airQualityColor,
				dateFilters,
				getWeatherIcon,
				mouseOverEvent,
				showEvent,
				oxygenItemMax,
				stiveItemMax,
				oxygenItemColor,
				stiveItemColor
			}
		}
	}
</script>

<style scoped>
	.point{
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		content: '';
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #f22;
	}
	.point::before,.point::after{
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		content: '';
	}
	.point::before{animation: scale 2s infinite; }
	.point::after{animation: scale2 2s infinite; }
	@keyframes scale{0%{ transform: scale(0); opacity:.9}100%{ transform: scale(20); opacity: 0;}}
	@keyframes scale2{0%{ transform: scale(0);opacity:.9;}100%{ transform: scale(80);opacity:0;}}
	.point::before,.point::after{
		/* 设置颜色 */
		background-color: rgba(209, 2, 2, 0.9);
	}
	
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
		font-size: 1rem;
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
		.point,.point::before,.point::after{
			width: 2px;
			height: 2px;
		}
		@keyframes scale{0%{ transform: scale(0); opacity:.9}100%{ transform: scale(22); opacity: 0;}}
		@keyframes scale2{0%{ transform: scale(0);opacity:.9;}100%{ transform: scale(54);opacity:0;}}
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