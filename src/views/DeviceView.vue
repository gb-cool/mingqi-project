<template>
	<div class="DeviceView">
		<el-table :data="tableData" border style="width: 100%" height="960">
			<el-table-column
			type="index"
			label="序号"
			align="center">
				<template #default="scope">
					<span>{{(scope.$index + 1).toString().padStart(2, '0')}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="deviceIdentifyType" label="设备识别类型"/>
			<el-table-column prop="deviceKey" label="设备KEY" />
			<el-table-column prop="deviceName" label="设备名称" />
			
			<el-table-column prop="deviceUnique" label="设备唯一标识码"/>
			<el-table-column prop="isSecure" label="isSecure" />
			<el-table-column prop="level" label="设备层级（是否子设备）" />
			
			<el-table-column prop="parentDeviceKey" label="父设备KEY"/>
			<el-table-column prop="productId" label="产品ID" />
			<el-table-column prop="productKey" label="产品名称" />
			
			<el-table-column prop="projectId" label="项目ID" />
			<el-table-column prop="state" label="设备状态（1：在线；0：离线）" />
		</el-table>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import { Device } from '../assets/js/device.js'
	import { batchDevices, deviceShadow } from "../3d/deviceInterfase"
	export default{
		setup() {
			const tableData = ref()
			const device = new Device()
			device.getBatchDevices((result) => {
				const devices= result.data.devices
				tableData.value = devices
				// tableData.value = devices.filter((item) => item.deviceName.includes('粉尘') || item.deviceName.includes('氧'))
			})
			batchDevices((result) => {
				console.log(result)
			})
			deviceShadow("167282577000043b38", "4351421399475294208", (result) => {
				console.log(result)
			})
			batchDevices
			return {
				tableData
			}
		}
	}
</script>

<style scoped>
	.DeviceView{
		width: 100%;
		height: 100%;
		background: #048EF9;
		overflow: auto;
	}
</style>