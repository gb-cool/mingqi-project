<template>
	<div class="RightSide">
		<div class="module-up">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="微粉园"/>
				</template>
				<template v-slot:main>
					<ModulePark/>
				</template>
			</ModuleBg>
		</div>
		<div class="module-center">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="车辆通行数据"/>
				</template>
				<template v-slot:main>
					<ModulePassage/>
				</template>
			</ModuleBg>
		</div>
		<div class="module-down">
			<ModuleBg>
				<template v-slot:title>
					<ModuleTitle title="设备告警"/>
				</template>
				<template v-slot:main>
					<ModuleAlarm/>
				</template>
			</ModuleBg>
		</div>
	</div>
</template>

<script>
	import ModuleBg from './ModuleBg.vue'
	import ModuleTitle from './ModuleTitle.vue'
	import ModulePark from './ModulePark.vue'
	import ModulePassage from './ModulePassage.vue'
	import ModuleAlarm from './ModuleAlarm.vue'
	export default {
		name: 'RightSide',
		components: {
			ModuleBg,
			ModuleTitle,
			ModulePark,
			ModulePassage,
			ModuleAlarm
		}
	}
</script>

<style scoped>
	.module-up{
		height: 938px;
	}
	.module-center{
		height: 938px;
		margin: 40px 0px;
	}
	.module-down{
		height: 938px;
	}
	@media screen and (max-width: 1920px) {
		.module-up{
			height: 312px;
		}
		.module-center{
			height: 313px;
			margin: 20px 0px;
		}
		.module-down{
			height: 313px;
		}
	}
</style>