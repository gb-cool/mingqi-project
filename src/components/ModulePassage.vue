<!-- 车辆通行数据 -->
<template>
	<div class="ModulePassage">
		<div class="box">
			<el-table
			:data="dataList" 
			style="width: 100%" 
			:height="contentHeight" 
			:show-header="true">
			    <el-table-column 
				prop="plate" 
				label="车牌" 
				align="center">
				</el-table-column>
				<el-table-column
				prop="time" 
				label="时间" 
				align="center">
				<template #default="scope">
					<!-- <el-tooltip :content="scope.row.time" placement="top" effect="light"> -->
					<span>{{ scope.row.time }}</span>
					<!-- </el-tooltip> -->
				</template>
				</el-table-column>
				<el-table-column
				label="出入" 
				align="center">
				<template #default="scope">
					<span :style="Object.is(scope.row.type, '出') ? chuColor : ruColor">{{ scope.row.type }}</span>
				</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue'
	export default {
		name: 'ModulePassage',
		setup() {
			const chuColor = {
				color: 'rgba(255, 163, 0, 1)'
			}
			const ruColor = {
				color: 'rgba(4, 142, 249, 1)'
			}
			const dataList = [
				{time: '2022/11/08 10:50', plate: '渝A134567', type: '出'},
				{time: '2022/11/08 15:50', plate: '渝A134779', type: '出'},
				{time: '2022/11/07 14:20', plate: '渝A153479', type: '入'},
				{time: '2022/11/07 14:10', plate: '渝A128796', type: '入'},
				{time: '2022/11/06 17:50', plate: '渝A154677', type: '入'},
				{time: '2022/11/06 17:50', plate: '渝A154677', type: '入'},
				{time: '2022/11/06 17:50', plate: '渝A154677', type: '入'},
			]
			
			let contentHeight = ref(228)	// 内容盒子高度
			const initObj = () => {
				if(window.innerWidth > 1920){
					contentHeight.value = 684
				}else{
					contentHeight.value = 228
				}
			}
			initObj()
			window.addEventListener("resize", function () {
				initObj()
			})
			
			return {
				dataList,
				chuColor,
				ruColor,
				contentHeight
			}
		}
	}
</script>

<style scoped>
	.ModulePassage{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 36px 70px 36px 70px;
	}
	.box{
		height: 100%;
		overflow: hidden;
	}
	@media screen and (max-width: 1920px) {
		.ModulePassage{	
			padding: 13px 15px 13px 15px;
		}
	}
</style>