<template>
	<div class="ModuleDeviceTask">
		<el-descriptions :title="'设备KEY值: ' + deviceKey" style="text-indent: 16px;" :column="4"></el-descriptions>
		<el-descriptions
			v-for="(item, index) in gridData"
			:key="index"
		    :column="4">
		    <el-descriptions-item :width="timeWidth">{{item.time}}</el-descriptions-item>
		    <el-descriptions-item v-if="item['O2']">{{item['O2']}}</el-descriptions-item>
			<el-descriptions-item v-if="item.dust_concent">{{item.dust_concent}}</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import { Device } from '../assets/js/device.js'
	export default {
		name: "ModuleDeviceTask",
		props: ['deviceKey', 'projectId'],
		setup(props) {
			const device = new Device()
			const gridData = ref([])
			device.getQueryDeviceShadowList(props.deviceKey, props.projectId, (result) => {
				if(result.code == 200){
					gridData.value = result.data.list
				}
			})
			const timeWidth = ref(200)
			
			const getWidth = () => {
				let w = 200/1920*window.innerWidth
				if(w < 200) w = 200
				timeWidth.value = w
			}
			getWidth()
			window.addEventListener('resize', getWidth);
			return {
				gridData,
				timeWidth
			}
		}
	}
</script>

<style scoped>
	
</style>