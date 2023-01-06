<!-- 设备告警 -->
<template>
	<div class="ModuleAlarm" ref="componentElem">
		<div class="box"  ref="elTabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="设备告警" name="first">
					
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
	export default {
		name: 'ModuleAlarm',
		components: {
			PopupLayer
		},
		setup() {
			const elTabs = ref()	// 取盒子高度，计算表格内容高度值
			const componentElem = ref()
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹窗 标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	// 弹窗结构
			let popupType = inject('popupType') // 弹窗内容类型
			
			const activeName = 'fourth'	// 默认选中导航值

			const dateTime = new DateTime()
			// 人员定位告警
			const dataList = ref([])
			const joySuch = new JoySuch()
			const alarmListHandle = (result) => {
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
			const realTime = () => {
				joySuch.getAlarmList((result) => alarmListHandle(result))
			}
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
				robot.getAlarmList(4, (result) => {
					robotData.value = result.records
					// console.log(result)
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
			const handleClick = () => {
				
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
				robotAlarmEvent
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