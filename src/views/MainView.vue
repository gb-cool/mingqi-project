<template>
	<div class="app">
		<header>
			<TopSide></TopSide>
		</header>
		<main>
			<div class="threeBox">
				<canvas class="t-canvas" ref="tCanvas"></canvas>
			</div>
			<div class="mainBox">
				<!-- 左侧面板 -->
				<div class="leftSide sideBox" :class="isShow ? '' : 'hide'">
					<LeftSide></LeftSide>
					<div class="leftTools">
						<ToolsMenuLeft></ToolsMenuLeft>
					</div>
				</div>
				<!-- 右侧面板 -->
				<div class="rightSide sideBox" :class="isShow ? '' : 'hide'">
					<RightSide></RightSide>
					<div class="rightTools">
						
					</div>
				</div>
			</div>
		</main>
		<footer>
			<ToolsMenu/>
		</footer>
		<!-- 弹出窗口 -->
		<PopupLayer :title="popupTitle" :type="popupType" ref="popup" :class="[popupIsShow?'show':'hide']" @isShow='(v) => popupIsShow = v' :fileds="popupFileds" :information="popupContent"></PopupLayer>
		<input id="openVideoDom" type="button" style="display: none;" @click="openVideo"/>
	</div>
</template>

<script>
	import {
		ref,
		onMounted,
		provide,
		watch
	} from "vue";
	
	import TopSide from "../components/TopSide.vue"
	import LeftSide from "../components/LeftSide.vue"
	import RightSide from "../components/RightSide.vue"
	import ToolsMenu from "../components/ToolsMenu.vue"
	import PopupLayer from '../components/PopupLayer.vue'
	import ToolsMenuLeft from '../components/ToolsMenuLeft.vue'
	import * as THREE from 'three'
	import axios from 'axios'
	// 3d part
	import {pageOnload, mainView, momentMoveing, tweenMoveing, outWallSetOpacity, replaceSkyBox, limoRobotAnimation_3d, 
	limoPDanimation_3d, initalizeMan_3d, limoRobotInitalize_3d, limoRobotLighting_3d, updateLEDPlane_3d, fourColorOpacity_3d,
	 updataLEDforOutRoadPlane_3d, updataRoomUpLEDplane_3d, posuiDanimation_3d, saifenDanimation_3d, suishiDanimation_3d, 
	  visibleMan_3d, limoCameraDeviceDataup_3d} from "../3d/index";
	import { wareHouseYard } from "../3d/deviceInterfase.js"
	import { JoySuch } from '../assets/js/positionPerson.js'
	import { Robot } from '../assets/js/robot.js'
	import { Passage } from '../assets/js/passage.js'
	import { Video } from '../assets/js/video.js'
	import { parseDate } from "element-plus";
	export default {
		name: "app",
		components: {
			TopSide,
			LeftSide,
			RightSide,
			ToolsMenu,
			PopupLayer,
			ToolsMenuLeft
		},
		setup(context) {
			const isThreeDLoad = ref(0) // 三维是否初始化完成，1表示已初始化
			provide('isThreeDLoad', isThreeDLoad)
			const ThreeModuleOpacity = ref(1) // 三维模型不透明度 0-1
			provide('threeDModuleOpacity', ThreeModuleOpacity)
			
			const usagePattern = ref(1) // 使用模式，1车间，2安防
			provide('usagePattern', usagePattern)
			
			const toolsType = ref("mainScene")	// 功能类型
			provide('toolsType', toolsType)
			
			const isShow = ref(true)	// 面板是否显示
			provide('isShow', isShow)
			//弹出窗口
			let popupIsShow = ref(false)	//弹窗是否显示
			let popupTitle	= ref('')	//弹窗标题
			let popupContent = ref()	// 弹窗内容
			let popupFileds = ref()		//弹窗表结构
			let popupType = ref('json')	// 弹出内容类型 默认json，list
			let popupRealData = ref({})	// 实时数据
			provide('popupIsShow', popupIsShow)
			provide('popupTitle', popupTitle)
			provide('popupContent', popupContent)
			provide('popupFileds', popupFileds)
			provide('popupType', popupType)
			provide('popupRealData', popupRealData)

			let isRobotMove = ref(0)	// 监听巡检机器人动画是否启动 0不启动，1启动 2充电暂停 3运行
			provide('isRobotMove', isRobotMove)
			var tCanvas = ref(null),
				container;
			onMounted(() => {
				container = tCanvas.value;
				pageOnload(container, () => {
					isThreeDLoad.value = 1
					tweenMoveing([-2835,0,-1812], [-1617,837,-1], 2000, (e) => {})
					setSkyBoxFormWeather()
					setRobotMoveObj()	//获取巡检机器人状态并更改
					limoPDanimation_3d(0.1, true)	// 立磨皮带动画
					setInitalizeMan_3d()	// 获取所有人员数据并缓存

					fourColorOpacity_3d(0.5)	// 设置四色图透明度
					posuiDanimation_3d(0.1, true)	// 破碎皮带动画
					saifenDanimation_3d(0.1, true)	// 筛分皮带动画
					suishiDanimation_3d(0.1, true)	// 碎石皮带动画
					
					setVideoData()	// 车间摄像头数据
					setInterval(updateTime, baseTime)
				})
			});
			
			/**
			 * 巡检机器人
			 */
			let pid = 1	// 1正向行驶，0返回
			// 机器人实时执行函数
			function realRobotFun(){
				isRobotMove.value == 2 ? (limoRobotInitalize_3d(), limoRobotLighting_3d(true)) : limoRobotAnimation_3d(pid == 1 ? 1 : 20, 3700, true)
				pid = pid == 1 ? 0 : 1
			}
			// 获取巡检机器人状态并更改
			function setRobotMoveObj(){
				if(CacheData.robot.listData.length == 0) return false
				// 机器人当前状态：0 充电中、1 巡检中、2 空闲
				const robot = new Robot()
				robot.getToken(() => robot.getRobotReportInfo(CacheData.robot.listData[0].robotId, (result) => isRobotMove.value = result.data.robotStatus == 0 ? 2 : result.data.robotStatus == 1 ? 3 : 0))
			}
			// 监听巡检机器人状态
			watch(isRobotMove, () => {
				switch(isRobotMove.value){
					case 1:	// 启动
						break;
					case 2:	// 充电暂停
						limoRobotInitalize_3d()	// 回到初始状态
						limoRobotLighting_3d(true)	// 充电状态打开
						break;
					case 3:	// 远行
						limoRobotLighting_3d(false)	// 充电状态关闭
						pid == 0 ? limoRobotAnimation_3d(1, 3700, true) : limoRobotAnimation_3d(20, 3700, true)
						break;
					case 0:	// 不启动
						limoRobotLighting_3d(false)	// 充电状态关闭
						pid == 0 ? limoRobotAnimation_3d(1, 3700, false) : limoRobotAnimation_3d(20, 3700, false)
						break;
				}
			})
			/**
			 * 获取所有人员数据并缓存
			 */
			function setInitalizeMan_3d(){
				const joySuch = new JoySuch()
				joySuch.getToken(() => joySuch.getPersonList((result) => {
					let data = result.code == 0 ? result.data.content : []
					if(data.length == 0) return false
					let md = []
					let hideData = []
					data.forEach((p) => {
						md.push({id: p.sn, name: p.name})
						hideData.push(p.sn)
					})
					initalizeMan_3d(md, () => {
						setTimeout(() => {
							visibleMan_3d(hideData, false)	// 隐藏人员
							CacheData.person.allData = data
						}, 1000)
					})
				}))
			}
			
			/**
			 * 仓储数据数据获取并缓存
			 */
			function setWareHouse(){
				wareHouseYard((data) => {
					CacheData.wareHouse.realTableData = data	// 缓存仓储堆场数据
					let da = []
					for(let i =0; i< data.length; i++){
						let p = data[i]
						if(p.stockPlaceCode != "tzdc-v"){
							da.push({
								stockPlaceCode: p.stockPlaceCode,
								materialShortName: p.materialShortName + " " +(parseInt(p.currStock) / parseInt(p.maxStock) * 100) +"%",
								currStock: p.currStock,
								maxStock: p.maxStock,
							})
						}
					}
					updateLEDPlane_3d(da)
				})
			}
			
			/**
			 * LED屏数据获取显示并缓存
			 */
			const passage = new Passage()
			let roomJson ={
				"10.12.64.65": "outRoom5",
				"10.12.64.66": "outRoom6",
				"10.12.64.67": "outRoom4",
				"10.12.64.68": "outRoom3",
				"10.12.64.70": "outRoom1",
				"10.12.64.88": "outRoom2"
			}
			function setLed(){
				passage.getLedData((result) => {
					let data = result.data.data
					CacheData.led.roadListData = []
					CacheData.led.roomListData = []
					let da = []
					let roomDa = []
					data.forEach((item) => {
						let ledv = []
						if(Object.is(item.ip, "10.12.64.61") 
						|| Object.is(item.ip, "10.12.64.62") 
						|| Object.is(item.ip, "10.12.64.63") 
						|| Object.is(item.ip, "10.12.64.64")){
							switch(item.ip) {
								case "10.12.64.61": item.direction1 = "←";item.direction2 = "←";item.direction3 = "↑";item.direction4 = ""; break;
								case "10.12.64.62": item.direction1 = "←";item.direction2 = "←";item.direction3 = "";item.direction4 = ""; break;
								case "10.12.64.63": item.direction1 = "↑";item.direction2 = "←";item.direction3 = "";item.direction4 = ""; break;
								case "10.12.64.64": item.direction1 = "←";item.direction2 = "";item.direction3 = "";item.direction4 = ""; break;
							}
							if(!Object.is(getLedV(item.key1), "")){ledv.push(item.direction1 + " " + item.key1 + " " + item.value1)}
							if(!Object.is(getLedV(item.key2), "")){ledv.push(item.direction2 + " " + item.key2 + " " + item.value2)}
							if(!Object.is(getLedV(item.key3), "")){ledv.push(item.direction3 + " " + item.key3 + " " + item.value3)}
							if(!Object.is(getLedV(item.key4), "")){ledv.push(item.direction4 + " " + item.key4 + " " + item.value4)}
							if(ledv.length == 0) {ledv.push("LED")}
							item._value = ledv
							CacheData.led.roadListData.push(item)	// 缓存道路LED数据
							da.push({id: item.ip,value: ledv})
						}
						// 车间LED
						if(Object.is(item.ip, "10.12.64.65") 
						|| Object.is(item.ip, "10.12.64.66") 
						|| Object.is(item.ip, "10.12.64.67") 
						|| Object.is(item.ip, "10.12.64.68") 
						|| Object.is(item.ip, "10.12.64.70")
						|| Object.is(item.ip, "10.12.64.88")){
							if(!Object.is(getLedV(item.key1), "")){ledv.push(item.key1 + " " + item.value1)}
							if(!Object.is(getLedV(item.key2), "")){ledv.push(item.key2 + " " + item.value2)}
							if(ledv.length == 0) {ledv.push("正在接入中")}
							item._value = ledv
							item._id = roomJson[item.ip]
							roomDa.push({id: roomJson[item.ip],value: ledv})
							CacheData.led.roomListData.push(item)	// 缓存道路LED数据
						}
					})
					updataLEDforOutRoadPlane_3d(da)	// 道路LED屏数据设置
					updataRoomUpLEDplane_3d(roomDa) // 车间LED屏数据设置
				})
			}
			function getLedV(value){
				if(value == null || value == "null" || value == "") return ""
				return value
			}
			// 根据天气设置天空盒子
			const setSkyBoxFormWeather = () => {
				// 天气预报
				axios.get('https://www.yiketianqi.com/free/week?unescape=1&appid=51168891&appsecret=8NRa2gPZ&style=tw&skin=sogou&cityid=101041000')
				.then((response) => {
					let skyImg = "skyBox/15.jpg"
					if(response.data.data.length > 0){
						const todaywea = response.data.data[0].wea_img
						switch(todaywea){
							case "lei":	// 雷
								skyImg = "skyBox/15.jpg"
								break;
							case "qing":	// 晴
								skyImg = "skyBox/15.jpg"
								break;
							case "shachen":	// 沙尘
								skyImg = "skyBox/8.jpg"
								break;
							case "wu":	// 雾
								skyImg = "skyBox/26.jpg"
								break;
							case "yin":	// 阴
								skyImg = "skyBox/6.jpg"
								break;
							case "yun":	// 云
								skyImg = "skyBox/1.jpg"
								break;
							case "bingbao":	// 冰雹
								skyImg = "skyBox/15.jpg"
								break;
							case "yu":	// 雨
								skyImg = "skyBox/15.jpg"
								break;
							case "xue":	// 雪
								skyImg = "skyBox/15.jpg"
								break;
						}
						new THREE.TextureLoader().load(skyImg, (texture) => replaceSkyBox(texture))
					}
				})
				.catch((error) => console.log(error))
			}
	
			// 氧 \ 粉尘浓度实时数据
			const oxygenItem =ref({max: 0})
			const stiveItem =ref({max: 0})
			provide('oxygenItem', oxygenItem)
			provide('stiveItem', stiveItem)
			
			// 立磨车间摄像头
			const video = new Video()
			function setVideoData(){
				const limoVideoData = video.getCamerasByRegionIndexCode('e6beca3d-fd0f-4da9-ac1c-83bb747bed6b', (result) => {
					if(Object.is(result.msg, "success")){
						let data = eval("("+ result.data +")")
						CacheData.video.limoListData = data.data.list
						console.log(CacheData.video.limoListData)
					}			
				})
				let mateData = video.getIpToCameraIndexCode("all")
				let limo3D = []
				mateData.forEach((item) => {
					limo3D.push({
						id: item.ip,
						name: item.cameraName
					})
				})
				limoCameraDeviceDataup_3d(limo3D)
			}
			const openVideo = () => {
				popupType.value = "video"
				popupIsShow.value = true
				let item =  video.getIpToCameraIndexCode("ip", CacheData.video.limoSelectId)[0]	// 根据ID获取关联值
				popupTitle.value = item.cameraName
			}
			
			/**
			 * 定时实时执行
			 */
			const baseTime = 1000	// 定时器时间单位，1s
			let timeCount = 0	//计数器
			function updateTime(){
				if(Object.is(toolsType.value, "roaming")) return false
				if(timeCount % 34 ===0){
					setLed()	// LED屏
				}
				if(timeCount % 56 ===0){
					setWareHouse()	// 仓储堆场
				}
				if((timeCount % 7200) === 0){
					realRobotFun()	// 巡检机器人
				}
				timeCount++
			}
			
			return {
				tCanvas,
				isShow,
				popupIsShow,
				popupTitle,
				popupContent,
				popupFileds,
				popupType,
				isRobotMove,
				isThreeDLoad,
				openVideo
			};
		}
	};
</script>

<style scoped lang="less">
	@header-height: 7%;
	@sideBox-width: 20%;
	@lr-magin: ~"calc(20 / 1920 * 100vw)";
	.app{
		width: 100%;
		height: 100%;
		background: #051135;
		position: relative;
		color: #FFFFFF;
	}
	header {
		height: @header-height;
		background: url('../assets/img/header.png') no-repeat center center;
		background-size: 100% 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		z-index: 3;
	}
	main {
		height: 100%;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}
	.mainBox{
		height: calc(100% - @header-height);
		position: relative;
		top: @header-height; 
	}
	footer {
		height: auto;
		background-size: 100% 100%;
		position: absolute;
		bottom: 0px;
		z-index: 3;
		left: 50%;
		transform: translate(-50%);
	}
	.threeBox {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1;
		top: 0px;
	}

	.t-canvas {
		width: 100% !important;
		height: 100% !important;
	}
	.sideBox {
		width: @sideBox-width;
		height: 100%;
		position: relative;
		z-index: 3;
		transition: 1s;
	}
	.leftSide {
		float: left;
		margin-left: @lr-magin;
	}
	.rightSide {
		float: right;
		margin-right: @lr-magin;
	}
	.leftSide.hide{
		margin-left: -@sideBox-width;
	}
	.rightSide.hide{
		margin-right: -@sideBox-width;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity 1s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0
	} 
	.leftTools{
		position: absolute;
		left: 100%;
		top: 0px;
		margin-left: @lr-magin;
	}
	.rightTools{
		position: absolute;
		right: 100%;
		top:0px;
		margin-right: @lr-magin;
	}

/**
* 宽比例 4，高比例3
*/
@media screen and (max-width: 1920px) {
	@header-height: 76px;
	@sideBox-width: 380px;
	.sideBox {
		width: @sideBox-width;
	}
	.leftSide.hide{
		margin-left: -@sideBox-width;
	}
	.rightSide.hide{
		margin-right: -@sideBox-width;
	}
	header {
		height: @header-height;
	}
	.mainBox{
		height: calc(100% - @header-height);
		top: @header-height;
	}
}
</style>