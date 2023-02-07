<!-- 功能工具组件 -->
<template>
	<div class="ToolsMenu">
		<ul>
			<!-- <li @click="changeSky">
				<div class="rectangle">天空</div>
			</li> -->
			<li>
				<div class="rectangle" :class="[Object.is(rectangleActive, 'mainScene')?'active':'']" @click="btnEvent('mainScene')">园区总览</div>
			</li>
			<li>
				<div class="rectangle" :class="[Object.is(rectangleActive, 'security')?'active':'']" @click="btnEvent('security')">智慧安防</div>
				<div class="otherBox" v-show="isSecurityShow">
					<div class="pipelineBox"  v-for="(item, index) in securityData" :key="item.type">
						<el-tooltip :content="item.name" placement="top" effect="light">
							<div 
							:class="['pipeline', (item.type == securitySelect)?'active':'']"
							@click="securityEvent(item)">
								<img :src="require('../assets/img/'+ item.img)"/>
							</div>
						</el-tooltip>
					</div>
				</div>
			</li>
			<li>
				<div class="rectangle" :class="[Object.is(rectangleActive, 'pipe')?'active':'']" @click="btnEvent('pipe')">园区管道</div>
				<div class="otherBox" v-show="isPipelineShow">
					<div class="pipelineBox"  v-for="(item, index) in pipelineData" :key="item.type">
						<el-tooltip :content="item.name" placement="top" effect="light">
							<div 
							:class="['pipeline', (item.type == pipelineSelect)?'active':'']"
							@click="pipelineEvent(item)">
								<img :src="require('../assets/img/'+ item.img)"/>
							</div>
						</el-tooltip>
					</div>
				</div>
			</li>
			<li>
				<div class="rectangle" :class="[Object.is(rectangleActive, 'roaming')?'active':'']" @click="btnEvent('roaming')">园区漫游</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { ref, inject } from 'vue'
	import * as THREE from 'three'
	import { replaceSkyBox, outWallSetOpacity, mainView, tweenMoveing, roadFlow_3d, smallRoomFloorPlane_3d, fourColorDiagram_3d, outRoomOpactiy_3d} from "../3d/index"	// 三维
	export default {
		name: "ToolsMenu",
		setup() {
			const isThreeDLoad = inject('isThreeDLoad')	// 获取三维加载状态，1表示已初始完成可以执行事件
			const usagePattern = inject('usagePattern') // 使用模式，1车间，2安防
			/**
			 * 改变天空盒子
			 */
			let skyIndex = 0
			const skyImg = [
				'3dModel/3d/sky-01.jpg',
				'3dModel/3d/sky-02.jpg',
				'3dModel/3d/sky-03.jpg',
				'3dModel/3d/sky-04.jpg'
			]
			const changeSky = () => {
				if(isThreeDLoad.value != 1) return false
				if(skyIndex > 3) skyIndex=0
				const texLoader = new THREE.TextureLoader();
				texLoader.load(skyImg[skyIndex], (texture) => {
					replaceSkyBox(texture)
					skyIndex++
				})
			}
			/**
			 * 透明度
			 */
			const threeDModuleOpacity = inject('threeDModuleOpacity') // 三维模型不透明度 0-1
			const opacity = ref(threeDModuleOpacity.value)	//不透明度
			
			
			// 管道事件
			// 压缩空气管道、氮气管道、粉料输送管道、循环水管道、罗茨风机管道、磁悬浮风机管道
			const isPipelineShow = ref(false)	// 是否显示管道
			const pipelineSelect = ref('1')
			const pipelineData = [
				{img: 'foot-1.png', type:'1', name: '压缩空气管道'},
				{img: 'foot-2.png', type:'2', name: '氮气管道'},
				{img: 'foot-3.png', type:'3', name: '粉料输送管道'},
				{img: 'foot-4.png', type:'4', name: '循环水管道'},
				{img: 'foot-5.png', type:'5', name: '罗茨风机管道'},
				{img: 'foot-6.png', type:'6', name: '磁悬浮风机管道'}
			]
			const pipelineEvent = (item) => {
				pipelineSelect.value = item.type
			}
			
			// 智慧安防
			const isSecurityShow = ref(false)	// 是否显示安防图
			const securitySelect = ref('1')
			const securityData = [
				{img: 'foot-10.png', type:'1', name: '四色图'},
				{img: 'foot-8.png', type:'2', name: '疏散图'},
			]
			const securityEvent = (item) => {
				securitySelect.value = item.type
				roadFlow_3d(false)
				smallRoomFloorPlane_3d(false)
				fourColorDiagram_3d(false, "#0000FF", "#FFFF00", 0.1)
				outRoomOpactiy_3d(1)
				switch(item.type){
					case "1":
						smallRoomFloorPlane_3d(true)
						fourColorDiagram_3d(true, "#0000FF", "#FFFF00", 0.1)
						break;
					case "2":
						roadFlow_3d(true, 0.08)
						// outRoomOpactiy_3d(0.1)
						opacity.value = 0.1
						threeDModuleOpacity.value = opacity.value
						outRoomOpactiy_3d(opacity.value)
						break;
				}
			}
			
			// 返回主场景事件 园区总览
			const returnEvent = () => {
				if (isThreeDLoad.value == 1) {
					tweenMoveing([-2835,0,-1812], [-1617,837,-1], 2000, (e) => {})
					mainView()
				}
			};
			
			const timer = ref(0)
			
			// 按钮事件，按钮选中
			const rectangleActive = ref('mainScene')
			const btnEvent = (name) => {
				rectangleActive.value = name
				isPipelineShow.value = false
				isSecurityShow.value = false
				roadFlow_3d(false)
				smallRoomFloorPlane_3d(false)
				fourColorDiagram_3d(false, "#0000FF", "#FFFF00", 0.1)
				outRoomOpactiy_3d(1)
				window.clearInterval(timer.value);
				
				usagePattern.value = 1	// 使用模式
				
				switch(name){
					case "mainScene":
						returnEvent()	// 返回主场景
						break;
					case "security":	// 安防
						isSecurityShow.value = true
						usagePattern.value = 2
						smallRoomFloorPlane_3d(true)
						fourColorDiagram_3d(true, "#0000FF", "#FFFF00", 0.1)
						break;
					case "roaming":	// 漫游
						positioningMovement(0, [-1438.58,170.74,-2208.30], '地面一层', 1000)
						tweenMoveing([-1682,-0,-2314], [-1292,717,-1519], 2000, (e) => {
							timer.value = window.setInterval(setPositioningMovement, 4000)
						})
						break;
					case "pipe":	//管道
						isPipelineShow.value = true
						break;
				}
				console.log(usagePattern.value)
			}
			let pmnum = 0;
			let pmList= [
				[-1665.06,173.19,-2238.10],
				[-1438.58,170.74,-2208.30],
				[-1389.26,213.42,-2802.28],
				[-1438.58,170.74,-2208.30],
				[-1574.82,120.18,-1714.29],
				[-1438.58,170.74,-2208.30]
			]
			function setPositioningMovement(){
				positioningMovement(0, pmList[pmnum], '地面一层', 4000)
				pmnum++
				if(pmnum >= pmList.length){
					pmnum = 0
				}
			}
			
			return {
				changeSky,
				pipelineData,
				pipelineSelect,
				isPipelineShow,
				pipelineEvent,
				btnEvent,
				rectangleActive,
				isSecurityShow,
				securitySelect,
				securityData,
				securityEvent
			}
		}
	}
</script>

<style scoped>
	.ToolsMenu{
		height: 3.6rem;
		line-height: 3.6rem;
		text-align: center;
		margin-bottom: 3rem;
	}
	.ToolsMenu ul{
		position: relative;
		moz-user-select: -moz-none;
		-moz-user-select: none;
		-o-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		height: 100%;
	}
	.ToolsMenu li{
		height: 100%;
		position: relative;
		cursor: pointer;
		transition: 0.8s;
		margin: 0px 0.8rem;
		display: inline-block;
	}
	.ToolsMenu li div{
		position: relative;
	}
	.rectangle{
		padding: 0 3rem;
		height: 100%;
		background: rgba(1,0,55,0.7);
		border: 2px solid rgba(71,136,255,0.5);
		border-radius: 4rem;
		box-sizing: border-box;
		box-shadow: inset 0px 0px 23px rgb(4 142 249 / 20%);
	}
	.rectangle img{
		float: left;
		padding: 38px 15px;
	}
	.rectangle span{
		float: left;
	}
	.rectangleContent{
		display: inline-block;
		overflow: hidden;
	}
	.ToolsMenu li .otherBox{
		position: absolute;
		bottom: 100%;
		white-space: nowrap;
		transform: translate(-50%, -0%);
		left: 50%;
	}
	.otherBox .pipelineBox{
		display: inline-block;
		margin: 0 0.6rem;
	}
	.pipeline{
		width: calc(40/1920*100vw);
		height: calc(40/1920*100vw);
		min-width: 40px;
		min-height: 40px;
		background: rgba(1,0,55,0.7);
		border-radius: 50%;
		border: 2px solid rgba(71,136,255,0.5);
		box-sizing: border-box;
		box-shadow: inset 0px 0px 23px rgb(4 142 249 / 20%);
	}
	.pipeline img{
		display: block;
		width: 50%;
		margin: 0 auto;
		position: relative;
		top: 25%;
	}
	.rectangle:hover, .pipeline:hover{
		background: rgba(4, 142, 249, 1);
	}
	.pipeline.active{
		background: rgba(4, 142, 249, 1);
	}
	.rectangle.active{
		background: rgba(4, 142, 249, 1);
	}
</style>