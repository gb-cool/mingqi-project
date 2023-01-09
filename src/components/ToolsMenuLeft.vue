<template>
	<div class="ToolsMenuLeft">
		<ul>
			<li class="diaphaneity">
				<div class="rectangle">
					<div class="rectangleContent">
						<img class="plus" src="../assets/img/foot-plus.png" @click="plusEvent"/>
						<span>透明度</span>
						<img class="minus" src="../assets/img/foot-minus.png" @click="minusEvent"/>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { ref, inject } from 'vue'
	import * as THREE from 'three'
	import { replaceSkyBox, outWallSetOpacity, outRoomOpactiy_3d } from "../3d/index"	// 三维
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
				if(threeDModuleOpacity.value != opacity.value){
					opacity.value = threeDModuleOpacity.value
				}
				if(opacity.value > 0.4){
					opacity.value = 0.4
				}
				if(opacity.value > 0) {
					opacity.value = parseFloat((opacity.value - 0.1).toFixed(1))
					opacityWidth.value = opacity.value * 100 +'%'
					threeDModuleOpacity.value = opacity.value
					outWallSetOpacity(opacity.value)
					outRoomOpactiy_3d(opacity.value)
				}
			}
			// 加法
			const plusEvent = () => {
				if(isThreeDLoad.value != 1) return false
				if(threeDModuleOpacity.value != opacity.value){
					opacity.value = threeDModuleOpacity.value
				}
				if(opacity.value < 1) {
					opacity.value = parseFloat((opacity.value + 0.1).toFixed(1))
					if(opacity.value > 0.4){
						opacity.value = 1
					}
					opacityWidth.value = opacity.value * 100 +'%'
					threeDModuleOpacity.value = opacity.value
					outWallSetOpacity(opacity.value)
					outRoomOpactiy_3d(opacity.value)
				}				
			}
			return {
				changeSky,
				opacityWidth,
				minusEvent,
				plusEvent
			}
		}
	}
</script>

<style scoped>
	.ToolsMenuLeft{
		
	}
	.ToolsMenuLeft ul{
		position: relative;
		moz-user-select: -moz-none;
		-moz-user-select: none;
		-o-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.ToolsMenuLeft li{

	}
	.rectangle{
		width: calc(38 / 1920 * 100vw);
		background: rgba(1,0,55,0.7);
		border: 2px solid rgba(71,136,255,0.5);
		border-radius: calc(38 / 1920 * 100vw);
		box-sizing: border-box;
		box-shadow: inset 0px 0px 23px rgb(4 142 249 / 20%);
	}
	.rectangleContent{
		padding: 0.5rem 0;
	}
	.rectangle img{
		cursor: pointer;
		width: 60%;
		display: block;
		margin: 0 auto;
		padding: 0.4rem;
	}
	.rectangle span{
		display: block;
		width: 1rem;
		margin: 0 auto;
	}
	@media screen and (max-width: 1920px) {
		.rectangle{
			border-width: 1px;
		}
	}
</style>