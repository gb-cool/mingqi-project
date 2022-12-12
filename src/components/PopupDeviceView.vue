<template>
	<div class="DeviceView">
		<el-table 
			:data="tableData"
			highlight-current-row
			@row-click="intelligentWorkshopEvent"
			border style="width: 100%, height: 200px">
			<el-table-column align="center" prop="deviceIdentifyType" label="设备识别类型" width="100"/>
			<el-table-column align="center" prop="deviceKey" label="设备KEY" width="160">
				<template  #default="scope">
					<el-popover 
					placement="right" 
					:width="330" 
					@show="moduleDeviceTaskSelect = scope.row.deviceKey"
					trigger="click">
						<template #reference>
							<span :ref="'popover-'+scope.row.deviceKey">{{scope.row.deviceKey}}</span>
						</template>
						<ModuleDeviceTask v-if="Object.is(scope.row.deviceKey, moduleDeviceTaskSelect)" 
						:deviceKey = "scope.row.deviceKey" 
						:projectId = "scope.row.projectId" />
					</el-popover>
				</template>
			</el-table-column>
			
			<el-table-column align="center" prop="deviceName" label="设备名称" />
			
			<el-table-column align="center" prop="deviceUnique" label="唯一标识码"/>
			<!-- <el-table-column align="center" prop="isSecure" label="isSecure" /> -->
			<!-- <el-table-column align="center" prop="level" label="设备层级" /> -->
			
			<el-table-column align="center" prop="parentDeviceKey" label="父设备KEY" width="160"/>
			<el-table-column align="center" prop="productId" label="产品ID" width="160" />
			<el-table-column align="center" prop="productKey" label="产品名称" width="240" />
			
			<el-table-column align="center" prop="projectId" label="项目ID" width="160" />
			<el-table-column align="center" prop="state" label="设备状态">
				<template #default="scope">
					<span>{{scope.row.state==1? "在线":"离线"}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="_concentration" label="浓度"/>
		</el-table>
	</div>
</template>

<script>
	import { ref, inject, watch } from 'vue'
	import { Device } from '../assets/js/device.js'
	import ModuleDeviceTask from './ModuleDeviceTask.vue'
	export default{
		props:['type'],
		components: {
			ModuleDeviceTask
		},
		setup(props, context) {
			let isShow = inject('isShow')	// 是否显示弹窗
			let _data = ref()
			_data.value = inject('popupContent')
			const tableData = ref()
			tableData.value = _data.value.value
			
			watch(_data.value, () => {
				tableData.value = _data.value.value
			})
			
			const moduleDeviceTaskSelect = ref('')	// 设备详情选中状态
			
			// 行点击事件
			const intelligentWorkshopEvent = (row, event, column) => {
				// console.log(context)
				// console.log(event, column)
			}
			return {
				tableData,
				moduleDeviceTaskSelect,
				intelligentWorkshopEvent
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