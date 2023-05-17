<!-- 车辆通行数据 -->
<template>
	<div class="ModulePassage">
		<div class="box" ref="elTabs">
			<!-- <el-table
			:data="dataList" 
			style="width: 100%" 
			:height="contentHeight" 
			:show-header="true">
			    <el-table-column 
				prop="plateNo" 
				label="车牌" 
				align="center">
				</el-table-column>
				<el-table-column
				prop="gateTime" 
				label="时间" 
				align="center">
				<template #default="scope">
					<span>{{ changeTime(scope.row.gateTime) }}</span>
				</template>
				</el-table-column>
				<el-table-column
				label="出入" 
				align="center">
				<template #default="scope">
					<span :style="Object.is(scope.row.direction, '2') ? chuColor : ruColor">{{getDirection(scope.row)}}</span>
				</template>
				</el-table-column>
			</el-table> -->
			<el-table
			:data="dataList" 
			style="width: 100%" 
			:height="contentHeight" 
			:show-header="true">
			    <el-table-column 
				prop="name" 
				label="车牌" 
				align="center">
				</el-table-column>
				<el-table-column
				prop="gateTime" 
				label="时间" 
				align="center">
				<template #default="scope">
					<span>{{ positionTime(scope.row).time }}</span>
				</template>
				</el-table-column>
				<el-table-column
				label="出入" 
				align="center">
				<template #default="scope">
					<!-- <el-button
					size="small"
					type="primary"
					plain
					>{{positionTime(scope.row).type}}</el-button> -->
					<el-tooltip placement="top">
					    <template #content>
							司机名称： {{scope.row.driverName}}<br />
							车辆牌号：{{scope.row.name}}<br />
							访问时间：{{scope.row.visitTime}}<br />
							离开时间：{{Object.is(scope.row.leaveTime, "") ? "-":scope.row.leaveTime}}<br />
						</template>
					    <span :style="Object.is(scope.row.inOutType.toString(), '1') ? chuColor : ruColor">{{positionTime(scope.row).type}}</span>
					</el-tooltip>
					
				</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { ref, onMounted } from 'vue'
	import { Passage } from '../assets/js/passage.js'
	import { DateTime } from '../assets/js/dateTime.js'
	
	export default {
		name: 'ModulePassage',
		setup() {
			const elTabs = ref()	// 取盒子高度，计算表格内容高度值
			const chuColor = {
				color: 'rgba(255, 163, 0, 1)',
			}
			const ruColor = {
				color: 'rgba(4, 142, 249, 1)'
			}
			// const dataList = [
			// 	{time: '2022/11/08 10:50', plate: '渝A134567', type: '出'},
			// 	{time: '2022/11/08 15:50', plate: '渝A134779', type: '出'},
			// 	{time: '2022/11/07 14:20', plate: '渝A153479', type: '入'},
			// 	{time: '2022/11/07 14:10', plate: '渝A128796', type: '入'},
			// 	{time: '2022/11/06 17:50', plate: '渝A154677', type: '入'},
			// 	{time: '2022/11/06 17:50', plate: '渝A154677', type: '入'},
			// 	{time: '2022/11/06 17:50', plate: '渝A154677', type: '入'},
			// ]
			
			const dataList = ref([])
			
			let contentHeight = ref(228)	// 内容盒子高度
			const initObj = () => {
				contentHeight.value = elTabs.value.offsetHeight
			}

			function realTime(){
				let list = CacheData.car.visitArrayData
				dataList.value = list
			}
			realTime()
			setInterval(()=>{
				realTime()
			}, 1000 * 10)
			// new Passage().getData((result) => {
			// 	let list = result.data.data
			// 	dataList.value = list
			// })
			
			// 获取出入状态：direction：1进场、2出场。isDirection: 是否进出场，0否，1是
			const getDirection = (row) => {
				let direction = row.direction
				let isDirection = row.isDirection
				let str = ""
				if(direction == 1){
					if(isDirection == 0){
						str = "未入"
					}else{
						str = "已入"
					}
				}else{
					if(isDirection == 0){
						str = "未出"
					}else{
						str = "已出"
					}
				}
				return str
			}
			const positionTime = (row) => {
				// 进出类型，0进入1离开
				let time = ""
				let type = ""
				if(row.inOutType == 0){
					time = row.visitTime	// 访问时间
					type = "已入"
				}else{
					time = row.leaveTime	// 离开时间
					type = "已出"
				}
				time = changeTime(time)
				return {
					time: time,
					type: type
				}
			}
			function changeTime(time){
				return time.substring(0,16)
			} 
			onMounted(() => {
				initObj()
				window.addEventListener("resize", function () {
					initObj()
				})
			})
			
			return {
				elTabs,
				dataList,
				chuColor,
				ruColor,
				contentHeight,
				changeTime,
				getDirection,
				positionTime
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../assets/css/public.less";
	.ModulePassage{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: @module-content-mw;
	}
	.box{
		height: 100%;
	}
</style>