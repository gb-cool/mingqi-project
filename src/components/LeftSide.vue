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
					<ModuleTitle title="危险区域视频"/>
				</template>
				<template v-slot:main>
					<ModuleVideo/>
				</template>
			</ModuleBg>
		</div>
		<div class="module-down">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="危险区域人员"/>
				</template>
				<template v-slot:main>
					<ModulePerson/>
				</template>
			</ModuleBg>
		</div>
	</div>
</template>

<script>
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
		}
	}
</script>

<style scoped>
	.module-up{
		height: 1116px;
	}
	.module-center{
		height: 906px;
		margin: 40px 0px;
	}
	.module-down{
		height: 792px;
	}
	@media screen and (max-width: 1920px) {
		.module-up{
			height: 372px;
		}
		.module-center{
			height: 302px;
			margin: 20px 0px;
		}
		.module-down{
			height: 264px;
		}
	}
</style>