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
	import { ref } from 'vue'
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
			return {
				personNum,
				setPersonNum
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
</style>