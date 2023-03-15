<template>
	<div class="LeftSide">
		<div class="module-up">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="环境信息"/>
				</template>
				<template v-slot:main>
					<ModuleEnvironment/>
				</template>
			</ModuleBg>
		</div>
		<div class="module-center">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="重点区域视频"/>
				</template>
				<template v-slot:tool>
					<img class="toolImg" @click="lookVideoEvent" src="../assets/img/video.png"/>
				</template>
				<template v-slot:main>
					<ModuleVideo/>
				</template>
			</ModuleBg>
		</div>
		<div class="module-down">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle :title="'重点区域人员'+ personNum"/>
				</template>
				<template v-slot:main>
					<ModulePerson @getPersonNum="setPersonNum"/>
				</template>
			</ModuleBg>
		</div>
	</div>
</template>

<script>
	import { ref, inject } from 'vue'
	import ModuleBg from './ModuleBg.vue'
	import ModuleTitle from './ModuleTitle.vue'
	import ModuleEnvironment from './ModuleEnvironment.vue'
	import ModuleVideo from './ModuleVideo.vue'
	import ModulePerson from './ModulePerson.vue'
	export default {
		name: "LeftSide",
		components: {
			ModuleBg,
			ModuleTitle,
			ModuleEnvironment,
			ModuleVideo,
			ModulePerson
		},
		setup() {
			const personNum = ref("")
			const setPersonNum = (data) => {
				personNum.value = data
			}
			
			let popupIsShow_video = inject('popupIsShow_video')	// 是否显示弹窗
			let popupTitle_video = inject('popupTitle_video')	// 弹出标题
			let popupContent_video = inject('popupContent_video')	// 弹窗内容
			let popupFileds_video = inject('popupFileds_video')	//弹出结构
			let popupType_video = inject('popupType_video') // 弹窗内容类型
			/**
			 * 查看摄像头数据
			 */
			const lookVideoEvent = () => {
				popupIsShow_video.value = true
				popupTitle_video.value = "监控摄像头"
				popupContent_video.value = ""
				popupFileds_video.value = ""
				popupType_video.value = "videoList"
			}
			return {
				personNum,
				setPersonNum,
				lookVideoEvent
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../assets/css/public.less";
	.LeftSide{
		height: 100%;
	}
	.module-up{
		height: 38%;
	}
	.module-center{
		height: 35%;
		padding: @module-padding 0;
		box-sizing: border-box;
	}
	.module-down{
		height: 27%;
		padding: 0 0 @module-padding 0;
		box-sizing: border-box;
	}
	.toolImg{
		width: 2rem;
		max-width: 48px;
		position: absolute;
		top: 50%;
		right: 0px;
		transform: translate(-50%, -50%);
		cursor: pointer;
	}
</style>