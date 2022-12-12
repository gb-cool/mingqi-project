<template>
	<div class="app">
		<header>
			<TopSide></TopSide>
		</header>
		<main>
			<div class="threeBox">
				<canvas class="t-canvas" ref="tCanvas"></canvas>
			</div>
			<!-- 左侧面板 -->
			<div class="leftSide sideBox" :class="isShow ? '' : 'hide'">
				<LeftSide></LeftSide>
			</div>
			<!-- 右侧面板 -->
			<div class="rightSide sideBox" :class="isShow ? '' : 'hide'">
				<RightSide></RightSide>
			</div>
			<!-- 返回主场景按钮 -->
			<div class="returnBtn" @click="returnEvent" :class="isShow ? '' : 'hide'">
				<img src="../assets/img/return.png" />
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
	
	// 3d part
	import {pageOnload, mainView, momentMoveing, tweenMoveing, outWallSetOpacity } from "../3d/index";
	export default {
		name: "app",
		components: {
			TopSide,
			LeftSide,
			RightSide,
			ToolsMenu,
			PopupLayer
		},
		setup(context) {
			const isThreeDLoad = ref(0) // 三维是否初始化完成，1表示已初始化
			provide('isThreeDLoad', isThreeDLoad)
			const ThreeModuleOpacity = ref(1) // 三维模型不透明度 0-1
			provide('threeDModuleOpacity', ThreeModuleOpacity)
			
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
			const returnEvent = () => {
				if (isThreeDLoad.value == 1) {
					// momentMoveing([-19,-0,129], [6,65,364])
					/* tweenMoveing([-19,-0,129], [6,65,364], 2000, (e) => {
					}) */
					tweenMoveing([126,-0,69], [296,96,218], 2000, (e) => {
					})
					mainView()
				}
			};
			var tCanvas = ref(null),
				container;
			onMounted(() => {
				container = tCanvas.value;
				pageOnload(container, () => {
					isThreeDLoad.value = 1
				})
			});
	
			// 氧 \ 粉尘浓度实时数据
			const oxygenItem =ref({max: 0})
			const stiveItem =ref({max: 0})
			provide('oxygenItem', oxygenItem)
			provide('stiveItem', stiveItem)
			
			return {
				returnEvent,
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

<style scoped>
	.app{
		width: 7680px;
		height: 3240px;
		background: #051135;
		position: relative;
		color: #FFFFFF;
	}
	header {
		height: 230px;
		background: url('../assets/img/header.png') no-repeat center center;
		background-size: 100% 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		z-index: 3;
	}

	main {
		/* height: calc(100% - 230px); */
		height: 100%;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 230px;
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
		width: 1344px;
		height: 100%;
		position: relative;
		z-index: 3;
		transition: 1s;
	}
	.leftSide {
		float: left;
		margin-left: 80px;
	}
	.rightSide {
		float: right;
		margin-right: 80px;
	}
	.leftSide.hide{
		margin-left: -1344px;
	}
	.rightSide.hide{
		margin-right: -1344px;
	}
	.returnBtn {
		position: absolute;
		right: 1550px;
		cursor: pointer;
		z-index: 3;
		transition: 1s;
	}
	.returnBtn.hide{
		right: 80px;
	}
	.returnBtn img {
		width: auto;
	}
	
	.fade-enter-active, .fade-leave-active {
		transition: opacity 1s
	 }
	 .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0
	} 

	/**
* 宽比例 4，高比例3
*/
	@media screen and (max-width: 1920px) {
		.app {
			width: 100%;
			max-width: 1920px;
			height: 1080px;
		}
		header {
			height: 76px;
		}

		main {
			/* height: calc(100% - 76px); */
			padding-top: 76px;
		}
		body{
			overflow-x: hidden;
		}

		.sideBox {
			width: 380px;
		}

		.leftSide {
			margin-left: 20px;
		}
		.rightSide {
			margin-right: 20px;
		}
		.leftSide.hide{
			margin-left: -380px;
		}
		.rightSide.hide{
			margin-right: -380px;
		}

		.returnBtn {
			right: 420px;
		}
		.returnBtn.hide{
			right: 20px;
		}
		.returnBtn img {
			width: 120px;
		}
	}
</style>