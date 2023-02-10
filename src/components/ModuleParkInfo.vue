<template>
	<div class="ModuleParkInfo">
		<div class="box" ref="elTabs">
			<el-table
			:data="wareHouseList" 
			style="width: 100%" 
			:height="contentHeight" 
			highlight-current-row
			@row-click="wareHouseEvent"
			:show-header="true">
			    <el-table-column 
				prop="_hz_device" 
				label="设备" 
				align="center">
				<template #default="scope">
					<span>{{ scope.row._hz_device }}</span>
				</template>
				</el-table-column>
				<el-table-column
				prop="_hz_value" 
				label="参数值" 
				align="center">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { ref, onMounted, watch, onDeactivated } from 'vue'
	import { WareHouse } from '../assets/js/warehouse.js'
	import { focusduishiLED_3d, focusFenChengImport_3d, limoRoomMainMachine_3d } from "../3d/index";
	export default{
		name: 'ModuleParkInfo',
		props:['type'],
		setup(props, ctx) {
			const wareHouseList = ref([])	// 记录堆场数据
			const timer = ref(0)
			const isShow = ref(props.type)
			showData(props.type)
			watch(() => props.type, (newValue, oldValue) => {
				showData(newValue)
			})
			function showData(type){
				isShow.value = type
				realTime()
			}
			// timer.value = window.setInterval(realTime, 3000)	// 实时刷新数据
			function realTime(){
				console.log(isShow.value)
				switch(isShow.value){
					case "矿石堆场":
						// 实时更新堆场数据
						getWareHouseRealTimeData()
						break;
					case "破碎车间":
						getCrushingShopRealTimeData()
						break;
					case "筛分车间":
						getScreeningPlantRealTimeData()
						break;
					case "碎石仓配料车间":
						getGravelRealTimeData()
						break;
					case "立磨车间":
						getVerticalMillRealTimeData()
						break;
					case "均化车间":
						getHomogenizingRealTimeData()
						break;
				}
			}
			/**
			 * 堆场设备数据
			 */
			function getWareHouseRealTimeData(){
				let data = packOSData("堆场")
				let wareHouseData = CacheData.wareHouse.realTableData.filter((item) => !Object.is(item.stockPlaceCode, "tzdc-v"))
				for(let i = 0; i < wareHouseData.length; i++){
					let d = wareHouseData[i]
					const returnedTarget = Object.assign({
						_hz_device: d.stockPlaceName,
						_hz_value: d.currStock,
						_hz_type: "ware"
					}, d);
					data.push(returnedTarget)
				}
				wareHouseList.value = data
			}
			/**
			 * 破碎车间
			 */
			function getCrushingShopRealTimeData(){
				let data = packOSData("破碎")
				wareHouseList.value = data
			}
			/**
			 * 筛粉车间
			 */
			function getScreeningPlantRealTimeData(){
				let data = packOSData("筛分")
				wareHouseList.value = data
			}
			/**
			 * 碎石仓配料车间
			 */
			function getGravelRealTimeData(){
				let data = packOSData("碎石")
				wareHouseList.value = data
			}
			/**
			 * 立磨车间
			 */
			function getVerticalMillRealTimeData(){
				let data = packOSData("立磨")
				let verticalData = CacheData.vertical.realTableData
				// console.log(verticalData)
				for(let i = 0; i < verticalData.length; i++){
					let d = verticalData[i]
					const returnedTarget = Object.assign({
						_hz_device: d.deviceName,
						_hz_value: d._concentration,
						_hz_type: "vertical"
					}, d);
					data.push(returnedTarget)
				}
				wareHouseList.value = data
			}
			/**
			 * 均化车间
			 */
			function getHomogenizingRealTimeData(){
				let data = packOSData("均化")
				wareHouseList.value = data
			}
			/**
			 * 车间粉尘氧浓度设备数据
			 * @param {Object} type
			 */
			function packOSData(type){
				let data = []
				let oxygenData = CacheData.oxygen.realTableData.filter((item) => item._workshop.includes(type))
				let stiveData = CacheData.stive.realTableData.filter((item) => item._workshop.includes(type))
				for(let i = 0; i < oxygenData.length; i++){
					let d = oxygenData[i]
					const returnedTarget = Object.assign({
						_hz_device: d.deviceName,
						_hz_value: d._concentration,
						_hz_type: "oxygen"
					}, d);
					data.push(returnedTarget)
				}
				for(let i = 0; i < stiveData.length; i++){
					let d = stiveData[i]
					const returnedTarget = Object.assign({
						_hz_device: d.deviceName,
						_hz_value: d._concentration,
						_hz_type: "stive"
					}, d);
					data.push(returnedTarget)
				}
				return data
			}
			// 点击聚焦事件
			const wareHouseEvent = (row, event, column) => {
				if(Object.is(row._hz_type, "oxygen")){
					focusFenChengImport_3d(row.deviceKey, 2000, () => {
						CachePublicFun.showOSLabel(row)	// 粉尘氧浓度标签显示
					})
				}else if(Object.is(row._hz_type, "stive")){
					focusFenChengImport_3d(row.deviceKey, 2000, () => {
						CachePublicFun.showOSLabel(row)	// 粉尘氧浓度标签显示
					})
				}else if(Object.is(row._hz_type, "ware")){
					focusduishiLED_3d(row.stockPlaceCode, 2000, () => {})
				}else if(Object.is(row._hz_type, "vertical")){
					limoRoomMainMachine_3d(row.deviceKey, 2000, () => {})
				}	
			}		
			
			const elTabs = ref()	// 取盒子高度，计算表格内容高度值
			let contentHeight = ref(228)	// 内容盒子高度
			const initObj = () => {
				contentHeight.value = elTabs.value.offsetHeight
			}
			onMounted(() => {
				initObj()
				window.addEventListener("resize", function () {
					initObj()
				})
			})
			onDeactivated(()=>{ //离开当前组件的生命周期执行的方法
				window.clearInterval(timer.value);
			})
			
			return{
				elTabs,
				contentHeight,
				isShow,
				wareHouseList,
				wareHouseEvent
			}
		}
	}
</script>

<style>
</style>