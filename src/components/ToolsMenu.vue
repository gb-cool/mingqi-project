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
				<div class="otherBox" v-show="isRoamingShow">
					<div class="videoGif">
						<p id="deviceVideoName"></p>
						<img id="deviceVideoGif" src=""/>
					</div>
					<div class="pipelineBox"  v-for="(item, index) in roamingData" :key="item.type">
						<el-tooltip :content="item.name" placement="top" effect="light">
							<div 
							:class="['pipeline', (item.type == roamingSelect)?'active':'']"
							@click="roamingEvent(item)">
								<span>{{item.soft}}</span>
								<!-- <img :src="require('../assets/img/'+ item.img)"/> -->
							</div>
						</el-tooltip>
					</div>
					<ul class="roamingRoom">
						<li v-for="(item, index) in roamingRoomData" :key="item.roomId" 
						@click="roamingRoomEvent(item)" 
						:class="[(item.roomId == roamingRoomSelect)?'active':'']">
							{{item.name}}
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { ref, inject } from 'vue'
	import * as THREE from 'three'
	import { replaceSkyBox, outWallSetOpacity, mainView, tweenMoveing, roadFlow_3d, smallRoomFloorPlane_3d, 
	fourColorDiagram_3d, outRoomOpactiy_3d, pipeLineFun_3d, outwallCondition_3d, roamAnimation_3d, suishiModelAnimation_3d} from "../3d/index"	// 三维
	import { Device } from '../assets/js/device.js'
	export default {
		name: "ToolsMenu",
		setup() {
			const isThreeDLoad = inject('isThreeDLoad')	// 获取三维加载状态，1表示已初始完成可以执行事件
			const usagePattern = inject('usagePattern') // 使用模式，1车间，2安防
			const toolsType = inject('toolsType')	// 功能类型
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
			const pipelineSelect = ref('0')
			const pipelineData = [
				{img: 'foot-0.png', type:'0', color:'0xffffff', name: '所有管道'},
				{img: 'foot-0-1.png', type:'1', name: '所有管道动画'},
				{img: 'foot-3.png', type:'5', color: 0x224288, name: '压缩空气管道'},
				{img: 'foot-4.png', type:'7', color: 0xffd355, name: '氮气管道'},
				{img: 'foot-5.png', type:'3', color: 0x828282, name: '粉料输送管道'},
				{img: 'foot-1.png', type:'6', color: 0x369edb, name: '循环水管道'},
				{img: 'foot-2.png', type:'4', color: 0x6482C8, name: '罗茨风机管道'},
				{img: 'foot-6.png', type:'2', color: 0xa5c367, name: '磁悬浮风机管道'}
			]
			//  type = 0(所有管道正常显示)  1(所有管道显示动画效果)  2(磁悬浮风机管道动画)   
			// 3(输送管道动画)   4(罗茨风机管道动画)    5(压缩空气管道动画)    6(水管动画)    7(氮气管道动画) 
			const pipelineEvent = (item) => {
				pipelineSelect.value = item.type
				// outwallCondition_3d(0.5)	// 外墙和外楼顶透明度状态
				opacity.value = 0.1
				threeDModuleOpacity.value = opacity.value
				outRoomOpactiy_3d(opacity.value) // 除地面意外的所有其他物体设置透明度
				if(Object.is(item.type, "1")){
					pipeLineFun_3d(item.type, 0.2, [0xa5c367, 0x828282, 0x6482C8, 0x224288, 0x369edb, 0xffd355])	// 管道动画方法
				}else{
					pipeLineFun_3d(item.type, 0.2, item.color)	// 管道动画方法
				}
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
				smallRoomFloorPlane_3d(false)	// 小厂房内部黄色蓝色片显示隐藏
				fourColorDiagram_3d(false, "#0000FF", "#FFFF00", 0.1)
				outRoomOpactiy_3d(1)
				switch(item.type){
					case "1":
						smallRoomFloorPlane_3d(true)
						fourColorDiagram_3d(true, "#0000FF", "#FFFF00", 0.8)
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
			
			// 园区漫游
			const device = new Device()
			const isRoamingShow = ref(false)	// 是否显示漫游控制按钮
			const roamingSelect = ref('0')
			const roamingData = [
				{img: 'foot-10.png', type:'0', name: '开始漫游', soft: "开始"},
				{img: 'foot-10.png', type:'2', name: '暂停漫游', soft: "暂停"},
				{img: 'foot-10.png', type:'3', name: '继续漫游', soft: "继续"},
				{img: 'foot-10.png', type:'1', name: '结束漫游', soft: "结束"}
			]
			const roamingRoomData = [
				{name: "破碎间和筛分间", roomId: "0"},
				{name: "碎石间", roomId: "1"},
				{name: "立磨间", roomId: "2"},
				{name: "均化间", roomId: "3"}
			]
			const roamingVelocity = 50	// 漫游速度
			const roamingRoomSelect = ref(0)	// 漫游车间
			// 选择按钮事件
			const roamingEvent = (item) => {
				roamingSelect.value = item.type
				if(item.type == 1){
					document.getElementById("deviceVideoName").parentNode.style.display = "none"	// 漫游GIF图隐藏
				}
				roamAnimation_3d(roamingRoomSelect.value, roamingSelect.value, roamingVelocity, () => {})
			}
			// 选择车间事件
			const roamingRoomEvent = (item) => {
				roamAnimation_3d(roamingRoomSelect.value, 1, roamingVelocity, () => {})	// 结束漫游
				suishiModelAnimation_3d(false, 1)
				if(item.roomId == "2" || item.roomId == "1"){
					suishiModelAnimation_3d(true, 0.5)
				}
				
				document.getElementById("deviceVideoName").parentNode.style.display = "none"	// 漫游GIF图隐藏
				
				switch(item.roomId){
					case "0":
						device.setDeviceAnimations({"_id":"SC-001"})
						device.setDeviceAnimations({"_id":"SC-002"})
						break;
					case "1":
						device.setDeviceAnimations({"_id":"SC-004"})
						break;
					default: 
						device.setDeviceAnimations("")
						break;
				}
				roamingRoomSelect.value = item.roomId
				roamingSelect.value = 0
				roamAnimation_3d(roamingRoomSelect.value, roamingSelect.value, roamingVelocity, () => {
					document.getElementById("deviceVideoName").parentNode.style.display = "none"	// 漫游GIF图隐藏
				})	// 执行漫游
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
				isRoamingShow.value = false
				roadFlow_3d(false)	// 控制马路上流动线条显示隐藏
				smallRoomFloorPlane_3d(false)	// 小厂房内部黄色蓝色片显示隐藏
				fourColorDiagram_3d(false, "#0000FF", "#FFFF00", 0.1)	// 四色图显示隐藏并更改颜色
				outRoomOpactiy_3d(1)	// 除地面意外的所有其他物体设置透明度
				pipeLineFun_3d(0, 0.2, 0xffffff)	// 管道全部正常显示
				
				window.clearInterval(timer.value);
				
				outwallCondition_3d(1)	// 外墙和外楼顶透明度状态
				roamAnimation_3d(roamingRoomSelect.value, 1, roamingVelocity, () => {})	// 结束漫游
				
				document.getElementById("deviceVideoName").parentNode.style.display = "none"	// 漫游GIF图隐藏
				
				usagePattern.value = 1	// 使用模式
				toolsType.value = name	// 改变功能类型
				switch(name){
					case "mainScene":
						toolsType.value = Math.random()
						returnEvent()	// 返回主场景
						break;
					case "security":	// 安防
						isSecurityShow.value = true	// 显示安防
						usagePattern.value = 2
						smallRoomFloorPlane_3d(true)
						fourColorDiagram_3d(true, "#0000FF", "#FFFF00", 0.8)
						break;
					case "roaming":	// 漫游
						isRoamingShow.value = true
						device.setDeviceAnimations({"_id":"SC-001"})
						device.setDeviceAnimations({"_id":"SC-002"})
						roamAnimation_3d(roamingRoomSelect.value, roamingSelect.value, roamingVelocity, () => {
							document.getElementById("deviceVideoName").parentNode.style.display = "none"	// 漫游GIF图隐藏
						})	// 执行漫游
						outwallCondition_3d(0.2)	// 外墙和外楼顶透明度状态
						break;
					case "pipe":	//管道
						isPipelineShow.value = true	// 显示管道
						usagePattern.value = 3	//使用模式
						break;
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
				securityEvent,
				isRoamingShow,
				roamingSelect,
				roamingData,
				roamingEvent,
				roamingRoomData,
				roamingRoomSelect,
				roamingRoomEvent
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
	.videoGif{
		background: #fff;
		border-radius: 4px;
		max-width: 24rem;
		margin: 0 auto 1rem auto;
		display: none;
	}
	.videoGif p{
		color: #333;
		height: 32px;
		line-height: 32px;
	}
	.videoGif img{
		max-width: 22rem;
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
	.pipeline span{
		position: relative;
		top: -4px;
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
	.roamingRoom li{
		padding: 0px 6px;
		text-shadow: 0px 3px 6px #000;
		font-weight: 700;
	}
	.roamingRoom li.active{
		color: rgba(4, 142, 249, 1);
	}
</style>