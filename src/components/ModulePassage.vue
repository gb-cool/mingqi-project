<!-- 车辆通行数据 -->
<template>
	<div class="ModulePassage">
		<div class="box" ref="elTabs">
			<el-table
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
					<!-- <el-tooltip :content="scope.row.time" placement="top" effect="light"> -->
					<span>{{ changeTime(scope.row.gateTime) }}</span>
					<!-- </el-tooltip> -->
				</template>
				</el-table-column>
				<el-table-column
				label="出入" 
				align="center">
				<template #default="scope">
					<span :style="Object.is(scope.row.isDirection, '0') ? chuColor : ruColor">{{ Object.is(scope.row.isDirection, '0')?"出":"入" }}</span>
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
				color: 'rgba(255, 163, 0, 1)'
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
			new Passage().getData((result) => {
				let list = result.data.data
				let newList = []
				if(list.length > 0){
					for(let i = list.length-1; i>=0; i--){
						newList.push(list[i])
					}
				}
				dataList.value = newList
			})
			const changeTime = (time) => {
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
				changeTime
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