<template>
	<div class="DeviceView">
		<el-table :data="tableData" border style="width: 100%, height: 200px">
			<el-table-column align="center" prop="deviceIdentifyType" label="设备识别类型"/>
			<el-table-column align="center" prop="deviceKey" label="设备KEY" width="160">
				<template  #default="scope">
					<el-popover 
					placement="right" 
					:width="330" 
					@show="moduleDeviceTaskSelect = scope.row.deviceKey"
					trigger="click">
						<template #reference>
							<span>{{scope.row.deviceKey}}</span>
						</template>
						<ModuleDeviceTask v-if="Object.is(scope.row.deviceKey, moduleDeviceTaskSelect)" 
						:deviceKey = "scope.row.deviceKey" 
						:projectId = "scope.row.projectId" />
					</el-popover>
				</template>
			</el-table-column>
			
			<el-table-column align="center" prop="deviceName" label="设备名称" />
			
			<el-table-column align="center" prop="deviceUnique" label="设备唯一标识码"/>
			<el-table-column align="center" prop="isSecure" label="isSecure" />
			<el-table-column align="center" prop="level" label="设备层级" />
			
			<el-table-column align="center" prop="parentDeviceKey" label="父设备KEY" width="160"/>
			<el-table-column align="center" prop="productId" label="产品ID" width="160" />
			<el-table-column align="center" prop="productKey" label="产品名称" width="160" />
			
			<el-table-column align="center" prop="projectId" label="项目ID" width="160" />
			<el-table-column align="center" prop="state" label="设备状态">
				<template #default="scope">
					<span>{{scope.row.state==1? "在线":"离线"}}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { ref, inject } from 'vue'
	import { Device } from '../assets/js/device.js'
	import ModuleDeviceTask from './ModuleDeviceTask.vue'
	export default{
		props:['type'],
		components: {
			ModuleDeviceTask
		},
		setup(props) {
			const tableData = ref()
			const device = new Device()
			device.getBatchDevices((result) => {
				const devices= result.data.devices
				if(Object.is(props.type, "oxygen")){
					tableData.value = devices.filter((item) =>  item.deviceName.includes('氧'))
				}else{
					tableData.value = devices.filter((item) => item.deviceName.includes('粉尘'))
				}
			})
			
			const moduleDeviceTaskSelect = ref('')	// 设备详情选中状态
			
			return {
				tableData,
				moduleDeviceTaskSelect
			}
		}
	}
</script>

<style scoped>
	.DeviceView{
		width: 100%;
		height: 100%;
		/* background: #048EF9; */
		overflow: auto;
	}
</style>