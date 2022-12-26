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