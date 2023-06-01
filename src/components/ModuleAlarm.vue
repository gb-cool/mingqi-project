<!-- 设备告警 -->
<template>
	<div class="ModuleAlarm" ref="componentElem">
		<div class="box"  ref="elTabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="设备告警" name="first">
					<el-table
					:data="deviceList" 
					style="width: 100%" 
					:height="contentHeight" 
					highlight-current-row
					@row-click="deviceEvent"
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
				</el-tab-pane>
				<el-tab-pane label="巡检机器人告警" name="second">
					<el-table
					:data="robotData" 
					style="width: 100%" 
					:height="contentHeight" 
					highlight-current-row
					@row-click="robotAlarmEvent"
					:show-header="true">
						<el-table-column 
						type="index"
						label="序号"
						:width="indexWidth"
						align="center">
							<template #default="scope">
								<span>{{(scope.$index + 1).toString().padStart(2, '0')}}</span>
							</template>
						</el-table-column>
						<el-table-column
						prop="alarmTime" 
						:width="timeWidth"
						label="告警日期" 
						align="center">
							<template #default="scope">
								<span>{{scope.row.alarmTime.split(" ")[0]}}</span>
							</template>
						</el-table-column>
						<el-table-column
						prop="itemName" 
						label="告警位置" 
						align="center">
						</el-table-column>
						<el-table-column
						prop="itemTypeName" 
						label="告警类别" 
						align="center">
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="监控告警" name="third">
					<el-table
					:data="videoData" 
					style="width: 100%" 
					:height="contentHeight" 
					highlight-current-row
					@row-click="videoAlarmEvent"
					:show-header="true">
						<el-table-column 
						type="index"
						label="序号"
						:width="indexWidth"
						align="center">
							<template #default="scope">
								<span>{{(scope.$index + 1).toString().padStart(2, '0')}}</span>
							</template>
						</el-table-column>
						<el-table-column
						prop="channelName" 
						label="报警通道名称" 
						align="center">
						</el-table-column>
						<el-table-column
						prop="dateTime" 
						label="触发时间" 
						align="center">
							<template #default="scope">
								<!-- <span>{{videoChangeTime(scope.row.dateTime)}}</span> -->
								 <span>{{scope.row.dateTime}}</span>
							</template>
						</el-table-column>
						
						<!-- <el-table-column
						prop="ipAddress" 
						label="IP" 
						align="center">
						</el-table-column>
						<el-table-column
						prop="eventType" 
						label="事件类型" 
						align="center">
						</el-table-column> -->
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="定位告警" name="fourth">
					<el-table
					:data="dataList" 
					style="width: 100%" 
					:height="contentHeight" 
					highlight-current-row
					@row-click="intelligentWorkshopEvent"
					:show-header="true">
						<el-table-column 
						type="index"
						label="序号"
						:width="indexWidth"
						align="center">
							<template #default="scope">
								<span>{{(scope.$index + 1).toString().padStart(2, '0')}}</span>
							</template>
						</el-table-column>
						<el-table-column
						prop="time" 
						:width="timeWidth"
						label="告警日期" 
						align="center">
							<template #default="scope">
								<span>{{scope.row.time.split(" ")[0]}}</span>
							</template>
						</el-table-column>
						<el-table-column
						prop="areaName" 
						label="告警位置" 
						align="center">
						</el-table-column>
						<el-table-column
						prop="type" 
						label="告警类别" 
						align="center">
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import { ref, inject, onMounted, onDeactivated } from 'vue'
	import PopupLayer from './PopupLayer.vue'
	import { JoySuch } from '../assets/js/positionPerson.js'
	import { DateTime } from '../assets/js/dateTime.js'
	import { Robot } from '../assets/js/robot.js'
	import { Video } from '../assets/js/video.js'
	import { focusFenChengImport_3d, intoRoom, outWallSetOpacity } from "../3d/index";
	export default {
		name: 'ModuleAlarm',
		components: {
			PopupLayer
		},
		setup() {
			const threeDModuleOpacity = inject('threeDModuleOpacity') // 三维模型不透明度 0-1
			const elTabs = ref()	// 取盒子高度，计算表格内容高度值
			const componentElem = ref()
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹窗 标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	// 弹窗结构
			let popupType = inject('popupType') // 弹窗内容类型
			
			const activeName = 'third'	// 默认选中导航值

			const dateTime = new DateTime()
			
			// 设备告警]
			const deviceList = ref([])
			function getDeviceData(){
				let data = []
				CacheData.oxygen.alarmListData.forEach((item) => {
					data.push(Object.assign({
						_hz_device: item.deviceName,
						_hz_value: item._concentration,
						_hz_type: "oxygen"
					}, item))
				})
				CacheData.stive.alarmListData.forEach((item) => {
					data.push(Object.assign({
						_hz_device: item.deviceName,
						_hz_value: item._concentration,
						_hz_type: "stive"
					}, item))
				})
				deviceList.value = data
			}
			const deviceEvent = (row, event, column) => {
				if(Object.is(row._hz_type, "oxygen") || Object.is(row._hz_type, "stive")){
					if(threeDModuleOpacity.value > 0.2){
						threeDModuleOpacity.value = 0.2
					}
					let _workshop = row._workshop
					if(_workshop.includes('堆场')){
						intoRoom(5)
					}
					if(_workshop.includes('破碎')){
						intoRoom(4)
					}
					if(_workshop.includes('筛分')){
						intoRoom(0)
					}
					if(_workshop.includes('碎石')){
						intoRoom(3)
					}
					if(_workshop.includes('立磨')){
						intoRoom(2)
					}
					if(_workshop.includes('均化')){
						intoRoom(1)
					}
					outWallSetOpacity(threeDModuleOpacity.value)
					focusFenChengImport_3d(row.deviceKey, 2000, () => {
						CachePublicFun.showOSLabel(row)	// 粉尘氧浓度标签显示
					})
				}
			}
			// 人员定位告警
			const dataList = ref([])
			const joySuch = new JoySuch()
			const alarmListHandle = (result) => {
				// console.log(result)
				if(result.code == 0){	//成功
					let jsonData = result.data.content
					jsonData.forEach((item) => {
						item.time = dateTime.getFormatTime('YYYY-MM-DD hh:mm:ss', item.time)
						switch(item.type){
							case "oneKeyAlarm:alarm": 
								item.type = "一键报警"
								break;
							case "stayAlarm":
								item.type = "滞留预警"
								break;
							case "overBoundaryAlarm":
								item.type = "越界报警"
								break;
							case "overNum":
								item.type = "超员预警"
								break;
							case "lackNum":
								item.type = "缺员预警"
								break;
							case "stillAlarm":
								item.type = "静止预警"
								break;
							case "alarmSpeed":
								item.type = "车辆超速报警"
								break;
							case "leaveAlarm":
								item.type = "作业人员离开报警"
								break;
							case "intrudeAlarm":
								item.type = "非作业人员闯入报警"
								break;
						}
					})
					dataList.value = jsonData
				}else if(result.code == 1002 || result.code == 1003){
					joySuch.getToken(() => joySuch.getAlarmList((result) => alarmListHandle(result)))
				}else{
					console.log(result)
				}
			}
			joySuch.getToken(() => joySuch.getAlarmList((result) => alarmListHandle(result)))
			
			const timer = ref(0)
			
			const fileds = {
				id: '报警ID',
				time: '报警时间',
				type: '报警类型',
				areaName: '位置',
				name: '报警人员名字',
				mac: 'SN号',
				handleTime: '处理时间',
				handleRemark: '处理信息',
			}
			// 行点击事件
			const intelligentWorkshopEvent = (row, event, column) => {
				popupTitle.value = '设备告警详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = fileds
				popupType.value = 'json'
			}
			// 序号参数
			const indexMethod = (index) => {
				return index + 1;
			}
			
			
			/**
			 * 巡检机器人告警
			 */
			const robotData = ref([])
			const robot = new Robot()
			robot.getToken(() => {
				robot.getAlarmList(1, (result) => {
					// console.log(result)
					robotData.value = result.list
				})
			})
			const robotFiled = {
				alarmId: "告警ID",
				// itemId: "",
				itemName: "告警内容",
				alarmTime: "告警时间",
				alarmPosition: "告警定位",
				reason: "告警描述",
				robotId: "机器人ID",
				itemType: "告警类型",
				itemTypeName: " 告警类型名称",
				alarmValue: "告警值",
				alarmPositionName: "告警位置名称",
				itemLevel: "告警等级"
			}
			// 巡检机器人行点击事件
			const robotAlarmEvent = (row, event, column) => {
				popupTitle.value = '巡检机器人告警详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = robotFiled
				popupType.value = 'json'
			}
			
			/**
			 * 视频监控告警信息
			 */
			const videoData = ref([])
			const video = new Video()
			const videoISAPIAlarm = () => {
				// video.getQueryLatestISAPIAlarmInfo((result) => {
				// 	videoData.value = [result]
				// })
				video.getQueryISAPIAlarmInfo((result) => videoData.value = result)
			}
			const videoChangeTime = (time) => {
				let ts = time.split(" ")
				let dates = ts[0].split("-")
				let times = ts[1]
				return times
			} 
			videoISAPIAlarm()
			const videoFiled = {
				activePostCount: "告警ID",
				channelId: "报警通道ID",
				channelName: "报警通道名称",
				dateTime: "报警触发时间",
				eventDescription: "报警事件描述",
				eventState: "报警事件状态",
				eventType: "报警事件类型",
				ipAddress: "报警设备ip",
				macAddress: "报警设备mac地址",
				protocol: "报警上传协议",
				addTime: "创建时间"
			}
			const videoAlarmEvent = (row, event, column) => {
				popupTitle.value = '视频监控告警详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = videoFiled
				popupType.value = 'json'
			}
			
			//改变盒子内容高度
			let contentHeight = ref(190)	// 内容盒子高度
			let indexWidth = ref(55)
			let timeWidth = ref(114)
			const initObj = () => {
				indexWidth.value = 55/1920*window.innerWidth
				timeWidth.value = 114/1920*window.innerWidth
				let h = 36/1080*window.innerHeight
				contentHeight.value = elTabs.value.offsetHeight - h - 15
			}
			
			
			const toolsType = inject("toolsType")	// 功能模式
			const realTime = () => {
				if(Object.is(toolsType.value, "roaming")){
					return false
				}
				joySuch.getAlarmList((result) => alarmListHandle(result))
				videoISAPIAlarm()
				getDeviceData()		// 获取设备告警数据
			}
			onMounted(()=>{ //组件挂载时的生命周期执行的方法
				timer.value = window.setInterval(realTime, 100000)
				initObj()
				window.addEventListener("resize", function () {
					initObj()
				})
			})
			onDeactivated(()=>{ //离开当前组件的生命周期执行的方法
				window.clearInterval(timer.value);
			})
			
			// 导航切换
			const handleClick = (tab, event) => {
				if(Object.is(tab.props.name, "first")){
					getDeviceData()
				}
			}
			return {
				elTabs,
				componentElem,
				activeName,
				dataList,
				indexMethod,
				contentHeight,
				indexWidth,
				intelligentWorkshopEvent,
				timeWidth,
				handleClick,
				robotData,
				robotAlarmEvent,
				videoData,
				videoFiled,
				videoAlarmEvent,
				videoChangeTime,
				deviceList,
				deviceEvent
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../assets/css/public.less";
	.ModuleAlarm{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: @module-content-mw;
	}
	.box{
		height: 100%;
	}
</style>