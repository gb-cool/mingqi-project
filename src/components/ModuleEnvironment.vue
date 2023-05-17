<!-- 环境信息 -->
<template>
	<div class="ModuleEnvironment">
		<div class="center">
			<div class="pie" @click="showEvent('oxygen')" style="cursor: pointer;">
				<div class="chart">
					<div class="point" v-if="Object.is(oxygenItemColor, '#D10202')"></div>
					<ModulePieChart name="氧浓度" value="100" :color='oxygenItemColor' :barWidth='barWidth'/>
					<div class="price">{{oxygenItemMax}}<span>%Vol</span></div>
				</div>
				<p>氧浓度</p>
			</div>
			<div class="pie" @click="showEvent('stive')" style="cursor: pointer;">
				<div class="chart">
					<div class="point" v-if="Object.is(stiveItemColor, '#D10202')"></div>
					<ModulePieChart name="粉尘浓度" value="100" :color='stiveItemColor' :barWidth='barWidth'/>
					<div class="price">{{stiveItemMax}}<span>mg/m³</span></div>
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
			<ul ref="weatherElem">
				<li v-for="(item, index) in weatherData" 
				:key="index" 
				:class="[index==selectIndex?'active':'', selectIndex-index==1?'prev-active':'']"
				@mouseover="mouseOverEvent(index)">
					<p>{{ dateFilters(item.date, index)}}</p>
					<div class="icon">
						<p class="iconBox">
							<img :class="[isWeatherImg?'show':'hide']" :src="getWeatherIcon(item.wea_img)" />
						</p>
						<span  :class="[isWeatherIcon?'show':'hide']">{{item.wea}}</span>
					</div>
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
	import { limoRoomMainMachineDataInit_3d } from '../3d/index.js'
	export default {
		name: "ModuleEnvironment",
		components: {
			ModulePieChart
		},
		setup(){
			const weatherElem = ref()	// 天气列表元素
			let barWidth = ref(6)	// 饼图宽度
			let selectIndex = ref(0)	// 选中天气序号
			const defaultWData = JSON.parse('[{"date":"2022-11-18","wea":"阴","wea_img":"yin","tem_day":"16","tem_night":"13","win":"西南风","win_speed":"<3级"},{"date":"2022-11-19","wea":"多云","wea_img":"yun","tem_day":"18","tem_night":"12","win":"西南风","win_speed":"<3级"},{"date":"2022-11-20","wea":"阴转小雨","wea_img":"yu","tem_day":"21","tem_night":"11","win":"东北风","win_speed":"<3级"},{"date":"2022-11-21","wea":"小雨转多云","wea_img":"yun","tem_day":"16","tem_night":"14","win":"西南风","win_speed":"<3级"},{"date":"2022-11-22","wea":"阴转小雨","wea_img":"yu","tem_day":"15","tem_night":"13","win":"东北风","win_speed":"<3级"},{"date":"2022-11-23","wea":"小雨","wea_img":"yu","tem_day":"16","tem_night":"14","win":"西南风","win_speed":"<3级"},{"date":"2022-11-24","wea":"小雨转多云","wea_img":"yun","tem_day":"16","tem_night":"13","win":"西南风","win_speed":"<3级"}]')
			let weatherData = ref(defaultWData)	// 一周天气数据
			let airQuality = ref('优')	// 空气质量
			let airQualityValue = ref(0)
			let airQualityColor = ref('#00D98B')
			let color = CacheData.oxygen.color	// 等级颜色
			changeBarWidth()
			weather()
			function changeBarWidth(){
				barWidth.value = 6 / 1920 * window.innerWidth;
			}
			window.addEventListener("resize", function () {
			    changeBarWidth()
			})
			function weather(){
				// 天气预报
				axios.get('https://www.yiketianqi.com/free/week?unescape=1&appid=51168891&appsecret=8NRa2gPZ&style=tw&skin=sogou&cityid=101041000')
				.then((response) => {
					weatherData.value = response.data.data
				})
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
			let popupRealData = inject('popupRealData') // 实时数据
			
			const toolsType = inject("toolsType")	// 功能模式
			
			// 氧 粉尘浓度数据
			let oxygenTableData = []
			let stiveTableData = []
			const oxygenItemMax = ref(0)
			const stiveItemMax = ref(0)
			const oxygenItemMaxItem = ref({})
			const stiveItemMaxItem = ref({})
			
			const oxygenItemColor = ref(color.one)
			const stiveItemColor = ref(color.one)
			
			// 氧浓度、 粉尘浓度点击详情
			const showEvent = (type) => {
				popupIsShow.value = true
				popupTitle.value = Object.is(type, 'oxygen') ? "氧浓度" : "粉尘浓度"
				popupContent.value = Object.is(type, 'oxygen') ? oxygenTableData : stiveTableData
				popupFileds.value = ""
				popupType.value = type
				realTime()
			}
			
			/**
			 * 增加最高值记录，点击显示列表时，选中最高值的列
			 */
			const device = new Device()
			const getWorkShonInfo = (row, filed) => {
				return device.getWorkshop(row.deviceName, row.deviceKey)[filed]
			}
			const getWorkShonInfoItem = (row) => {
				return device.getWorkshop(row.deviceName, row.deviceKey)
			}
			let verticalData = []	//立磨数据
			device.getBatchDevices((result) => {
				const devices= result.data.devices
				CacheData.device.allListData = devices	// 缓存所有设备数据
				
				oxygenTableData = devices.filter((item) =>  item.productKey.includes('8814edb5acdf4cb4b28c790cd924ddc3'))	// 氧浓度数据
				oxygenTableData.forEach((item,index,self) => {
					let infoItem = getWorkShonInfoItem(item)
					item._code = infoItem.number
					item._workshop = infoItem.workshop
					item._describe = infoItem.describe
				})	// 关联设备编号

				stiveTableData = devices.filter((item) => item.productKey.includes('2e30f382fc624a36af2ad7559ed8c5f9'))	//粉尘浓度数据
				stiveTableData = stiveTableData.filter((item) => !Object.is(getWorkShonInfo(item, 'workshop'), ""))	// 过滤粉尘浓度数据位置为空的部分
				stiveTableData.forEach((item,index,self) => {
					let infoItem = getWorkShonInfoItem(item)
					item._code = infoItem.number
					item._workshop = infoItem.workshop
					item._describe = infoItem.describe
				})	// 关联设备编号
				
				verticalData = devices.filter((item) => item.productKey.includes('6cdd4ae792cb43588904cdd14f70f3d8'))	//立磨数据
				CacheData.vertical.realTableData = verticalData // 缓存立磨列表数据
				realTime()
			})
			// 实时监听
			const realTime = (status = null) => {
				if(Object.is(toolsType.value, "roaming")){
					return false
				}
				let _oxygenIndex = 0
				oxygenTableData.forEach((item) => {
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						_oxygenIndex++
						if(result.code != 200){
							return false
						}
						let _concentration = parseFloat(result.data['O2']).toFixed(2)	// 浓度
						item._concentration = _concentration
						let thresholdValue = CacheData.oxygen.thresholdValue	// 阈值
						item._grade = _concentration < thresholdValue[0] ? 3 : ( _concentration >= thresholdValue[0] && _concentration < thresholdValue[1]) ? 2 : 1	// 告警等级
						if(item._grade == 3){
							CacheData.oxygen.alarmListData.unshift(item)	// 缓存告警信息
						}
						if(_oxygenIndex >= oxygenTableData.length){
							oxygenItemMax.value = Math.min.apply(null, oxygenTableData.map((o) => o._concentration)).toFixed(2)
							// 显示颜色
							oxygenItemColor.value = oxygenItemMax.value < thresholdValue[0] ? color.four : (oxygenItemMax.value >= thresholdValue[0] && oxygenItemMax.value < thresholdValue[1]) ? color.two : color.one
							// 弹窗开启 数据存入弹出框内容
							oxygenTableData.sort((a, b) => b._concentration - a._concentration)
							// 告警信息缓存
							if(Object.is(stiveItemColor.value, color.two)){
								CacheData.oxygen.alarmListData.unshift(item)
							}
							if(Object.is(popupType.value, 'oxygen') && popupIsShow.value) {
								popupContent.value = oxygenTableData
							}
						}
					})
				})
				let _stiveIndex = 0
				stiveTableData.forEach((item) => {
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						_stiveIndex++
						if(result.code != 200){
							return false
						}
						let _concentration = parseFloat(result.data['dust_concent']).toFixed(2)	// 浓度
						item._concentration = _concentration
						let thresholdValue = CacheData.stive.thresholdValue	// 阈值
						item._grade = _concentration < thresholdValue[0] ? 1 : ( _concentration >= thresholdValue[0] && _concentration < thresholdValue[1]) ? 2 : 3	// 告警等级
						// 告警信息缓存
						if(item._grade == 3){
							CacheData.stive.alarmListData.unshift(item)
						}
						if(_stiveIndex >= stiveTableData.length){
							stiveItemMax.value = Math.max.apply(null, stiveTableData.map((o) => o._concentration)).toFixed(2)
							// 颜色设置
							stiveItemColor.value = stiveItemMax.value < thresholdValue[0] ? color.one : (stiveItemMax.value >= thresholdValue[0] && stiveItemMax.value < thresholdValue[1]) ? color.two : color.four
							stiveTableData.sort((a, b) => b._concentration - a._concentration)
							if(Object.is(popupType.value, 'stive') && popupIsShow.value) {
								popupContent.value = stiveTableData
							}
						}
					})
				})
				CacheData.oxygen.realTableData	= oxygenTableData	 // 缓存氧浓度列表数据
				CacheData.stive.realTableData = stiveTableData		// 缓存粉尘浓度列表数据
				
				/**
				 * 立磨数据处理，更新磨机状态
				 */
				let verticalMD = []
				let vertivalCount = 0
				verticalData.forEach((item) => {
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						vertivalCount++
					    if (result.code == "200") {
							let da = result.data
							let _name = "停止"
							let status = 0
							if(da['MJDJ-DL'] > 1){
								status = 1
								_name = "运行"
							}
							let id = CacheData.device.relationData.filter((dev) => Object.is(item.deviceKey, dev._deviceKey))[0]._id
							verticalMD.push({
								id: id,
								name: _name,
								status: status
							})
							if(vertivalCount >= verticalData.length){
								limoRoomMainMachineDataInit_3d(verticalMD, {
									shutDown: { r: 0, g: 0, b: 0, a: 1.0 },                 // 关机（默认为黑色）
									open: { r: 0, g: 255, b: 0, a: 1.0 },                   // 开机（默认为绿色）
									failure: { r: 255, g: 0, b: 0, a: 1.0 },                // 故障（默认为红色）
									maintenance: { r: 110, g: 110, b: 110, a: 1.0 },        // 维修（默认为灰色）
								})
							}
					    }
					});
				})
				setTimeout(() => {
					realTime()
				}, 1000 * 26)
			}
			const timer = ref(0)
			const isWeatherIcon = ref(true)
			const isWeatherImg = ref(true)
			/**
			 * 改变天气图标显示
			 */
			const changeWeatherSH = () => {
				let li = weatherElem.value.getElementsByTagName("li")[0]
				let icon = li.getElementsByClassName("icon")[0]
				let iconBox = icon.getElementsByClassName("iconBox")[0]
				let span = li.getElementsByTagName("span")[0]
				// let img = icon.getElementsByTagName("img")
				
				let img = weatherElem.value.getElementsByTagName("img")
				let imgw = iconBox.offsetWidth + "px"
				for(let i =0; i<img.length; i++){
					img[i].style.maxHeight = imgw
				}
			}
			onMounted(()=>{ //组件挂载时的生命周期执行的方法
				// timer.value = window.setInterval(realTime, 100000)
				changeWeatherSH()
				window.addEventListener('resize', changeWeatherSH);
			})
			
			onDeactivated(()=>{ //离开当前组件的生命周期执行的方法
				// window.clearInterval(timer.value);
				window.removeEventListener('resize', changeWeatherSH);
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
				stiveItemColor,
				weatherElem,
				isWeatherIcon,
				isWeatherImg
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../assets/css/public.less";
	@center-height: ~"calc(124 / 1080 * 100vh)";
	@center-height-half: ~"calc(62 / 1080 * 100vh)";
	@center-mw: @module-content-mw;
	@pie-ph: 2.4rem;
	@scale: @center-height;
	.point{
		position: absolute;
		width: 0px;
		height: 0px;
		border-radius: 50%;
		content: '';
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #f22;
	}
	.point::before,.point::after{
		position: absolute;
		width: 0px;
		height: 0px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		content: '';
	}
	.point::before{animation: scale 2s infinite; }
	.point::after{animation: scale2 2s infinite; }
	@keyframes scale{0%{width: 0px;height:0px; opacity:.9}100%{ width: @center-height-half; height:@center-height-half; opacity: 0;}}
	@keyframes scale2{0%{width: 0px;height:0px; opacity:.9}100%{ width: @center-height; height:@center-height; opacity: 0;}}
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
		margin: 0 @center-mw;
		border-bottom: 3px solid #3C4863;
		height: @center-height;
		overflow: hidden;
		box-sizing: border-box;
	}
	.pie{
		width: 33%;
		height: 100%;
		float: left;
		padding-top: 1rem;
		box-sizing: border-box;
		overflow: hidden;
	}
	.pie .chart{
		width: 100%;
		height: calc(100% - @pie-ph);
		position: relative;
	}
	.pie p{
		font-size: 1rem;
		text-align: center;
		height: @pie-ph;
		line-height: @pie-ph;
	}
	.pie .chart .price{
		font-size: calc(18 / 1080 * 100vh);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}
	.pie .chart .price span{
		font-size: 0.8rem;
		display: block;
	}
	/**
	 * 天气
	 */
	.weather{
		margin: 0 @center-mw;
		height: calc(100% - @center-height - @center-mw);
	}
	.weather h3{
		font-size: 1rem;
		font-weight: 400;
		height: 2rem;
		text-indent: 5px;
		padding: 1rem 0 0.5rem 0;
	}
	.weather ul{
		overflow: hidden;
		height: calc(100% - 3.5rem);
	}
	.weather li{
		float: left;
		width: 14%;
		font-size: 0.9rem;
		text-align: center;
		position: relative;
		height: 100%;
	}
	.weather li:first-child{
		margin-left: 1%;
	}
	.weather li::after{
		content: '';
		display: block;
		position: absolute;
		top: 0px;
		bottom: 0px;
		right: 0px;
		border-right: 1px solid #3C4863;
	}
	.weather li:last-child::after{
		border-right: 0px solid #3C4863;
	}
	.weather li p{
		height: 2rem;
		line-height: 2.5rem;
	}
	.weather li .icon{
		height: calc(100% - 4rem);
		overflow: hidden;
		padding: 0 10%;
		box-sizing: border-box;
		line-height: 1.5rem;
	}
	.weather li .icon .hide{
		opacity: 0;
	}
	.weather li .icon .show{
		opacity: 1;
	}
	.weather li .iconBox{
		height: calc(100% - 3rem);
		line-height: normal;
		position: relative;
		overflow: hidden;
	}
	.weather li img{
		display: block;
		margin: 0 auto;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 100%;
		left: 50%;
		max-width: 100%;
	}
	.weather li span{
		font-size: 0.8rem;
		display: block;
		height: 3rem;
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
			border-bottom-width: 1px;
		}
		.weather li .iconBox{
			height: auto;
		}
		.weather li img{
			position: relative;
			top: 0%;
			left: 0%;
			transform: none;
		}
	}
</style>