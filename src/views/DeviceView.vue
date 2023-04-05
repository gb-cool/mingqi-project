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
			<el-table-column prop="deviceName" label="数据">
				<template #default="scope">
					<span>{{scope.row.shadow}}</span>
				</template>
			</el-table-column>
			
			<!-- <el-table-column prop="deviceUnique" label="设备唯一标识码"/>
			<el-table-column prop="isSecure" label="isSecure" /> -->
			<!-- <el-table-column prop="level" label="设备层级（是否子设备）" /> -->
			
			<!-- <el-table-column prop="parentDeviceKey" label="父设备KEY"/> -->
			<el-table-column prop="productId" label="产品ID" />
			<!-- <el-table-column prop="productKey" label="产品名称" /> -->
			
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
			let arrayStr = "ZP01,ZP02,EP01,EP02,YP01,YP02,P-101,P-102,P-103,P-104,P-105,P-106,F-101,F-102,F-103,F-104,SC-001,SP01,SP02,SC-002,P-114,P-115,P-111,P-112,P-113,WP-101,WP-102,WP-103,WP-104,WP-105,WP-106,WP-107,WP-108,WP-109,WP-110,WP-111,WP-112,WP-113,WP-201,WP-202,WP-203,WP-204,WP-205,WP-206,WP-207,WP-208,WP-209,WP-210,WP-211,WP-212,WP-213,SC-003,SC-004,M02,M03,M04,M05,M06,M07,M08,NE-01,NE-02,NE-03,NE-04,NE-05,NE-06,NE-07,NE-08,WP-M01,WP-M02A,WP-M02B,P-M02,WP-M03,WP-M04A,WP-M04B,P-M04,WP-M05A,WP-M05B,P-M05,WP-M06A,WP-M06B,P-M06,WP-M07A,WP-M07B,P-M07,WP-M08,CM-01,CM-02,CM-03,CM-04,CM-05,CM-06,CM-07,CM-08,SC-M01,SC-M02,SC-M03,SC-M04,SC-M05,SC-M06,SC-M07,SC-M08,FJ-M01,FJ-M02,FJ-M03,FJ-M04,FJ-M05,FJ-M06,FJ-M07,FJ-M08,QS-M01,QS-M02,QS-M03,QS-M04,QS-M05,QS-M06,QS-M07,QS-M08,CF-101,CF-103,CF-105,CF-107,CF-109,CF-111,CF-102,CF-104,CF-106,CF-108,CF-110,CF-112,CF-501,CF-502,CF-503,CF-504,CF-505,CF-506,CF-201,CF-202,CF-203,CF-601,CF-602,CF-603,CF-301,CF-302,CF-303,CF-701,CF-702,CF-703,CF-801,CF-802,SC-005,SC-006,SC-007,SC-008,WD-101,WD-103,WD-105,WD-107,WD-109,WD-111,WD-102,WD-104,WD-106,WD-108,WD-110,WD-112,WD-201,WD-202,WD-203,WD-301,WD-302,WD-303,GB-001,GB-002,GB-003,GB-004,TD-001,TD-002,TD-003,TD-004,XC-001,XC-002,XC-003,XC-004,FX-001,FX-002,FX-003,FX-004,FL-001,FL-002"
			let array = arrayStr.split(",")
			
			const tableData = ref()
			const device = new Device()
			device.getBatchDevices((result) => {
				const devices= result.data.devices
				
				// tableData.value = devices
				let len = devices.length
				let i = 0
				devices.forEach((item) => {
					device.getQueryDeviceShadow(item.deviceKey, item.projectId, (result) => {
						item.shadow = result.data
						i++
						if(i >= len){
							tableData.value = devices
						}
					})
				})
				// console.log(devices)
				// tableData.value = devices.filter((item) => item.deviceName.includes('粉尘') || item.deviceName.includes('氧'))
			})
	
			batchDevices((result) => {
				// console.log(result)
			})
			deviceShadow("167282577000043b38", "4351421399475294208", (result) => {
				// console.log(result)
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