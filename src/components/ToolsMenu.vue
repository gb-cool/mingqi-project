<!-- 功能工具组件 -->
<template>
	<div class="ToolsMenu">
		<ul>
			<li @click="changeSky">
				<div class="rectangle">天空</div>
			</li>
			<li class="diaphaneity">
				<div class="rectangle">
					<div class="rectangleContent">
						<img src="../assets/img/foot-minus.png" @click="minusEvent"/>
						<span>透明度</span>
						<img src="../assets/img/foot-plus.png" @click="plusEvent"/>
					</div>
				</div>
			</li>
			<li v-for="(item, index) in pipelineData" :key="item.type">
				<el-tooltip :content="item.name" placement="top" effect="light">
					<div 
					:class="['pipeline', (item.type == pipelineSelect)?'active':'']"
					@click="pipelineEvent(item)">
						<img :src="require('../assets/img/'+ item.img)"/>
					</div>
				</el-tooltip>
			</li>
		</ul>
	</div>
</template>

<script>
	import { ref, inject } from 'vue'
	import * as THREE from 'three'
	import { replaceSkyBox, outWallSetOpacity } from "../3d/index"	// 三维
	export default {
		name: "ToolsMenu",
		setup() {
			const isThreeDLoad = inject('isThreeDLoad')	// 获取三维加载状态，1表示已初始完成可以执行事件
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
			const opacityWidth = ref('20%')
			opacityWidth.value = opacity.value * 100 +'%'
			
			// 减法
			const minusEvent = () => {
				if(isThreeDLoad.value != 1) return false
				if(opacity.value > 0) {
					opacity.value = parseFloat((opacity.value - 0.1).toFixed(1))
					opacityWidth.value = opacity.value * 100 +'%'
					threeDModuleOpacity.value = opacity.value
					outWallSetOpacity(opacity.value)
				}
			}
			// 加法
			const plusEvent = () => {
				if(isThreeDLoad.value != 1) return false
				if(opacity.value < 1) {
					opacity.value = parseFloat((opacity.value + 0.1).toFixed(1))
					opacityWidth.value = opacity.value * 100 +'%'
					threeDModuleOpacity.value = opacity.value
					outWallSetOpacity(opacity.value)
				}				
			}
			// 管道事件
			// 压缩空气管道、氮气管道、粉料输送管道、循环水管道、罗茨风机管道、磁悬浮风机管道
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
			return {
				changeSky,
				opacityWidth,
				minusEvent,
				plusEvent,
				pipelineData,
				pipelineSelect,
				pipelineEvent
			}
		}
	}
</script>

<style scoped>
	.ToolsMenu{
		height: 120px;
		line-height: 120px;
		text-align: center;
		margin-bottom: 126px;
	}
	.ToolsMenu ul{
		overflow: hidden;
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
		float: left;
		height: 100%;
		position: relative;
		cursor: pointer;
		transition: 0.8s;
		margin: 0px 24px;
	}
	.ToolsMenu li div{
		position: relative;
	}
	.rectangle{
		width: 300px;
		height: 100%;
		background: rgba(1,0,55,0.7);
		border: 2px solid rgba(71,136,255,0.5);
		border-radius: 60px;
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
	.pipeline{
		width: 120px;
		height: 120px;
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
	@media screen and (max-width: 1920px) {
		.ToolsMenu{
			height: 40px;
			line-height: 40px;
			margin-bottom: 42px;
		}
		.ToolsMenu ul{
			min-width: 660px;
		}
		.rectangle{
			width: 130px;
		}
		.rectangle img{
			height: 20px;
			padding: 9px;
		}
		.pipeline{
			width: 40px;
			height: 40px;
		}
		.ToolsMenu li{
			margin: 0px 10px;
		}
	}
</style>