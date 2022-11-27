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
				</el-table-column>
				<el-table-column
				prop="area" 
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
	import { ref, inject } from 'vue'
	import PopupLayer from './PopupLayer.vue'
	export default {
		name: 'ModuleAlarm',
		components: {
			PopupLayer
		},
		setup() {
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹出标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	//弹出结构
			const dataList = [
				{time: '2022/11/08 10:50', area: '均化车间', type: '摄像头', content: '编号23132546人员，在2022年11月8日10点50分进入均化车间危险区域范围内，由摄像头检测结果。'},
				{time: '2022/11/08 15:50', area: '破碎车间', type: '摄像头', content: '编号23132546人员，在2022年11月8日15点50分进入破碎车间危险区域范围内，由摄像头检测结果。'},
				{time: '2022/11/07 14:20', area: '水泵房', type: '摄像头', content: '编号23132546人员，在2022年11月7日14点20分进入水泵房危险区域范围内，由摄像头检测结果。'},
				{time: '2022/11/07 14:10', area: '中控室', type: '烟感', content: '中控室烟感异常，请及时排查安全隐患！'},
				{time: '2022/11/06 17:50', area: '运输皮带', type: '温感', content: '运输皮带温度偏高，温度为70摄氏度'},
			]
			const fileds = {
				time: '告警日期',
				area: '告警位置',
				type: '告警类别',
				content: '告警内容'
			}
			// 行点击事件
			const intelligentWorkshopEvent = (row, event, column) => {
				popupTitle.value = '设备告警详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = fileds
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