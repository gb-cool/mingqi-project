<template>
	<div class="RightSide">
		<div class="module-up">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="微粉园"/>
				</template>
				<template v-slot:main>
					<ModulePark @getName = "setPackData"/>
				</template>
			</ModuleBg>
		</div>
		<div class="module-center">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle :title="cTitle"/>
				</template>
				<template v-slot:main>
					<ModulePassage v-if="cTitle=='车辆通行数据'"/>
					<ModuleParkInfo :type="parkType"  v-else />
				</template>
			</ModuleBg>
		</div>
		<div class="module-down">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="告警信息"/>
				</template>
				<template v-slot:main>
					<ModuleAlarm/>
				</template>
			</ModuleBg>
		</div>
	</div>
</template>

<script>
	import { ref, provide, inject, watch } from "vue";
	import ModuleBg from './ModuleBg.vue'
	import ModuleTitle from './ModuleTitle.vue'
	import ModulePark from './ModulePark.vue'
	import ModulePassage from './ModulePassage.vue'
	import ModuleAlarm from './ModuleAlarm.vue'
	import ModuleParkInfo from './ModuleParkInfo.vue'
	export default {
		name: 'RightSide',
		components: {
			ModuleBg,
			ModuleTitle,
			ModulePark,
			ModulePassage,
			ModuleAlarm,
			ModuleParkInfo
		},
		setup() {
			const toolsType = inject('toolsType')	// 功能类型
			const parkType = ref('')
			const cTitle = ref('车辆通行数据')
			const setPackData = (data) => {
				cTitle.value = data.name
				parkType.value = data.name
			}
			// 监听功能类型变化
			watch(toolsType, () => {
				// 如果为园区总览模型，显示车辆通行数据
				if(typeof toolsType.value == 'number'){
					cTitle.value = '车辆通行数据'
				}
			})
			return {
				parkType,
				cTitle,
				setPackData
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../assets/css/public.less";
	.RightSide{
		height: 100%;
	}
	.module-up{
		height: 33%;
	}
	.module-center{
		height: 34%;
		padding: @module-padding 0;
		box-sizing: border-box;
	}
	.module-down{
		height: 33%;
		padding: 0 0 @module-padding 0;
		box-sizing: border-box;
	}
</style>