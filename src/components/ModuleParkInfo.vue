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
				type="index"
				align="center">
					<template #default="scope">
						<e :style="getStyleFun(scope.row)"></e>
					</template>
				</el-table-column>
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
	import { focusduishiLED_3d, focusFenChengImport_3d, limoRoomMainMachine_3d, focusoutRoadLED_3d, focusRoomUpLED_3d, sceneDeviceLook_3d } from "../3d/index";
	import { Device } from "../assets/js/device.js";
	export default{
		name: 'ModuleParkInfo',
		props:['type'],
		setup(props, ctx) {
			const wareHouseList = ref([])	// 记录堆场数据
			const timer = ref(0)
			const isShow = ref(props.type)
			const device = new Device();
			
			showData(props.type)
			watch(() => props.type, (newValue, oldValue) => {
				showData(newValue)
			})
			function showData(type){
				isShow.value = type
				realTime()
			}
			timer.value = window.setInterval(realTime, 10000)	// 实时刷新数据
			function realTime(){
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
					case "道路LED":
						getLedRealTimeData()
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
				data = data.concat(deviceData("破碎"))
				wareHouseList.value = data
			}
			/**
			 * 筛粉车间
			 */
			function getScreeningPlantRealTimeData(){
				let data = packOSData("筛分")
				data = data.concat(deviceData("筛分"))
				wareHouseList.value = data
			}
			/**
			 * 碎石仓配料车间
			 */
			function getGravelRealTimeData(){
				let data = packOSData("碎石")
				data = data.concat(deviceData("碎石"))
				wareHouseList.value = data
			}
			/**
			 * 立磨车间
			 */
			function getVerticalMillRealTimeData(){
				let data = packOSData("立磨")
				data = data.concat(deviceData("立磨"))
				wareHouseList.value = data
			}
			/**
			 * 均化车间
			 */
			function getHomogenizingRealTimeData(){
				let data = packOSData("均化")
				data = data.concat(deviceData("均化"))
				wareHouseList.value = data
			}
			/**
			 * LED屏
			 */
			function getLedRealTimeData(){
				let data = []
				CacheData.led.roadListData.forEach((d) => {
					data.push(Object.assign({
						_hz_device: d.ip,
						_hz_value: d._value,
						_hz_type: "led",
						_hz_code: "road"
					}, d))
				})
				CacheData.led.roomListData.forEach((d) => {
					data.push(Object.assign({
						_hz_device: d.ip,
						_hz_value: d._value,
						_hz_type: "led",
						_hz_code: "room"
					}, d))
				})
				wareHouseList.value = data
			}
			/**
			 * 设备数据
			 * @param {Object} type
			 */
			function deviceData(type){
				let data = []
				let deviceData = CacheData.device.relationData.filter((item) => item._room.includes(type))
				deviceData.forEach((item) => {
					data.push(Object.assign({
						_hz_device: item._name,
						_hz_value: item._use,
						_hz_type: "device"
					}, item))
				})
				return data
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
					focusduishiLED_3d(row.stockPlaceCode, 2000, () => {})	// 堆场
				}else if(Object.is(row._hz_type, "vertical")){
					limoRoomMainMachine_3d(row.deviceKey, 2000, () => {})	// 立磨
				}else if(Object.is(row._hz_type, "led")){
					if(Object.is(row._hz_code, "road")){
						focusoutRoadLED_3d(row.ip, 2000, () => {})
					}else{
						focusRoomUpLED_3d(row._id, 2000, () => {})
					}
				}else if(Object.is(row._hz_type, "device")){
					sceneDeviceLook_3d(row._id, 2000, true, () => {
						isLMJBT(row._id) ? setLMJBTData(row) : CachePublicFun.showDeviceLabel(row)	// 设备标签显示
					})	// 设备聚焦
				}
			}
			/**
			 * 判断是否立磨机本体
			 */
			function isLMJBT(id){
				let data = ['LMJBT-M01', 'LMJBT-M02', 'LMJBT-M03', 'LMJBT-M04', 'LMJBT-M05', 'LMJBT-M06', 'LMJBT-M07', 'LMJBT-M08']
				return data.includes(id)
			}
			/**
			 * 立磨机本体数据显示
			 * @param {Object} row
			 */
			function setLMJBTData(row){
				let k = row._id.split("-")[1].replace("0", "")
				let verticalData = CacheData.vertical.realTableData.filter((item) => item.deviceName.includes(k))
				if(verticalData.length > 0){
					let data = verticalData[0]
					device.getQueryDeviceShadow(data.deviceKey, data.projectId, (result) => {
						result.code == "200" ? CachePublicFun.showDeviceLabel(Object.assign(row, result.data)) : CachePublicFun.showDeviceLabel(row)
					})
				}else{
					CachePublicFun.showDeviceLabel(row)	// 设备标签显示
				}
			}
			
			/**
			 * 获取样式标签
			 */
			const getStyleFun = (row) => {
				if(Object.is(row._hz_type, "oxygen") || Object.is(row._hz_type, "stive")){
					let color = CacheData.oxygen.color
					let bgColor = row._grade == 1 ? color.one : row._grade == 2 ? color.two : color.four
					return "display: inline-block;width: 1rem;height: 1rem;background:"+ bgColor +";border-radius: 50%;"
				}else if(Object.is(row._hz_type, "led")){
					return "display: inline-block;width: 1rem;height: 1rem;background:"+ CacheData.oxygen.color.one +";border-radius: 50%;"
				}else{
					return "display: inline-block;width: 1rem;height: 1rem;background:"+ CacheData.oxygen.color.one +";"
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
				wareHouseEvent,
				getStyleFun
			}
		}
	}
</script>

<style>
</style>