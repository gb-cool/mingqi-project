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
	</div>
</template>

<script>
	import {
		ref,
		onMounted,
		provide
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
	import {pageOnload, mainView, momentMoveing, tweenMoveing, outWallSetOpacity, replaceSkyBox, limoRobotAnimation_3d, limoPDanimation_3d } from "../3d/index";
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
			
			// 返回主场景事件
			// const returnEvent = () => {
			// 	if (isThreeDLoad.value == 1) {
			// 		// tweenMoveing([126,-0,69], [296,96,218], 2000, (e) => {})
			// 		tweenMoveing([-297,0,-173], [-171,89,17], 2000, (e) => {})
			// 		mainView()
			// 	}
			// };
			var tCanvas = ref(null),
				container;
			onMounted(() => {
				container = tCanvas.value;
				pageOnload(container, () => {
					isThreeDLoad.value = 1
					tweenMoveing([-2835,0,-1812], [-1617,837,-1], 2000, (e) => {})
					setSkyBoxFormWeather()
					robotMove()
					limoPDanimation_3d(0.1, true)
				})
			});
			//巡检机器人动画
			function robotMove(){
				let pid = 1
				limoRobotAnimation_3d(20, 100, true)
				setInterval(() => {
					if(pid == 1){
						limoRobotAnimation_3d(1, 100, true)
						pid = 0
					}else{
						limoRobotAnimation_3d(20, 100, true)
						pid = 1
					}
				}, 1000 * 180)
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
			
			return {
				tCanvas,
				isShow,
				popupIsShow,
				popupTitle,
				popupContent,
				popupFileds,
				popupType
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