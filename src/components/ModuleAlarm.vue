<!-- 设备告警 -->
<template>
	<div class="ModuleAlarm">
		<div class="box">
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
		</div>
		<!-- <PopupLayer title="" ref="popup" v-if="popupIsShow" @isShow='(v) => popupIsShow = v' :fileds="fileds" :information="popupContent"></PopupLayer> -->
	</div>
</template>

<script>
	import { ref, inject, onMounted, onDeactivated } from 'vue'
	import PopupLayer from './PopupLayer.vue'
	import { JoySuch } from '../assets/js/positionPerson.js'
	import { DateTime } from '../assets/js/dateTime.js'
	export default {
		name: 'ModuleAlarm',
		components: {
			PopupLayer
		},
		setup() {
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹窗 标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	// 弹窗结构
			let popupType = inject('popupType') // 弹窗内容类型
			// const dataList = [
			// 	{time: '2022/11/08 10:50', area: '均化车间', type: '摄像头', content: '编号23132546人员，在2022年11月8日10点50分进入均化车间危险区域范围内，由摄像头检测结果。'},
			// 	{time: '2022/11/08 15:50', area: '破碎车间', type: '摄像头', content: '编号23132546人员，在2022年11月8日15点50分进入破碎车间危险区域范围内，由摄像头检测结果。'},
			// 	{time: '2022/11/07 14:20', area: '水泵房', type: '摄像头', content: '编号23132546人员，在2022年11月7日14点20分进入水泵房危险区域范围内，由摄像头检测结果。'},
			// 	{time: '2022/11/07 14:10', area: '中控室', type: '烟感', content: '中控室烟感异常，请及时排查安全隐患！'},
			// 	{time: '2022/11/06 17:50', area: '运输皮带', type: '温感', content: '运输皮带温度偏高，温度为70摄氏度'},
			// ]
			const dateTime = new DateTime()
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
			onMounted(()=>{ //组件挂载时的生命周期执行的方法
				timer.value = window.setInterval(realTime, 100000)
			})
			onDeactivated(()=>{ //离开当前组件的生命周期执行的方法
				window.clearInterval(timer.value);
			})
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
			let contentHeight = ref(228)	// 内容盒子高度
			let indexWidth = ref(55)
			let timeWidth = ref(114)
			const initObj = () => {
				if(window.innerWidth > 1920){
					contentHeight.value = 684
					indexWidth.value = 120
					timeWidth.value = 340
				}else{
					contentHeight.value = 228
					indexWidth.value = 55
					timeWidth.value = 114
				}
			}
			initObj()
			window.addEventListener("resize", function () {
				initObj()
			})
			return {
				dataList,
				indexMethod,
				contentHeight,
				indexWidth,
				intelligentWorkshopEvent,
				timeWidth
			}
		}
	}
</script>

<style scoped>
	.ModuleAlarm{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 36px 70px 36px 70px;
	}
	.box{
		height: 100%;
		overflow: auto;
	}
	@media screen and (max-width: 1920px) {
		.ModuleAlarm{	
			padding: 13px 15px 13px 15px;
		}
	}
</style>