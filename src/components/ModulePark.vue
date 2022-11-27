<!-- 微粉园 -->
<template>
	<div class="ModulePark">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="智能车间" name="first">
				<el-table 
				:data="intelligentWorkshopData" 
				style="width: 100%" 
				:height="contentHeight" 
				highlight-current-row
				@row-click="intelligentWorkshopEvent"
				:show-header="false">
					<el-table-column
					type="index"
					:width="indexWidth"
					align="center">
						<template #default="scope">
							<span>{{(scope.$index + 1).toString().padStart(2, '0')}}</span>
						</template>
					</el-table-column>
				    <el-table-column 
					prop="name" 
					label="姓名" 
					align="left">
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="巡检机器人" name="second">
				<el-table
				:data="robotData" 
				style="width: 100%" 
				:height="contentHeight" 
				:show-header="true">
				    <el-table-column 
					prop="robotSn" 
					label="唯一编码" 
					align="center">
					</el-table-column>
					<el-table-column
					prop="robotName" 
					label="名称" 
					align="center">
					</el-table-column>
					<el-table-column
					prop="robotType" 
					label="类型" 
					align="center">
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="车辆" name="third">
				<el-table
				:data="carData" 
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
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="人员" name="fourth">
				<el-table
				:data="personData" 
				style="width: 100%" 
				:height="contentHeight" 
				:show-header="true">
				    <el-table-column 
					prop="name" 
					label="姓名" 
					align="center">
					</el-table-column>
					<el-table-column
					prop="serial" 
					label="编号" 
					align="center">
					</el-table-column>
					<el-table-column
					prop="area" 
					label="区域" 
					align="center">
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { ref, inject, watch } from 'vue'
	import { intoRoom, momentMoveing, tweenMoveing, outWallSetOpacity } from "../3d/index";	// 三维
	export default {
		name: 'ModulePark',
		setup() {
			const activeName = 'first'	// 默认选中导航值
			let contentHeight = ref(190)	// 内容盒子高度
			let indexWidth = ref(60)	// 序号宽度
			const initObj = () => {
				if(window.innerWidth > 1920){
					contentHeight.value = 571
					indexWidth.value = 180
				}else{
					contentHeight.value = 190
					indexWidth.value = 60
				}
			}
			initObj()
			window.addEventListener("resize", function () {
				initObj()
			})
			// 智能车间
			const intelligentWorkshopIndex = 0
			// 参数  0 == 筛粉间   1 == 均化间  2 == 立磨间  3 == 碎石仓配料间  4 == 破碎间
			const isThreeDLoad = inject('isThreeDLoad')	// 获取三维加载状态，1表示已初始完成可以执行事件
			const intelligentWorkshopData = [	//智能车间数据
					{id: -1, name: '矿石堆场'},
					{id: 4, name: '破碎车间'},
					{id: 0, name: '筛粉车间'},
					{id: 3, name: '碎石仓配料车间'},
					{id: 2, name: '立磨车间'},
					{id: 1, name: '均化车间'},
				]
			// 智能车间点击事件
			const threeDModuleOpacity = inject('threeDModuleOpacity') // 三维模型不透明度 0-1
			const intelligentWorkshopEvent = (row, event, column) => {
				if(isThreeDLoad.value != 1){
					console.log("三维未加载完成")
					return false
				}
				if(row.id != -1){
					outWallSetOpacity(threeDModuleOpacity.value)
					switch(row.id){
						case 0: 
							// momentMoveing([3,0,24], [31,12,63])
							tweenMoveing([3,0,24], [31,12,63], 2000, (e) => {
							})
							break;
						case 1: 
							// momentMoveing([25,0,-12], [27,27,97])
							tweenMoveing([25,0,-12], [27,27,97], 2000, (e) => {
							})
							break;
						case 2: 
							// momentMoveing([9,0,19], [8,14,85])
							tweenMoveing([9,0,19], [8,14,85], 2000, (e) => {
							})
							break;
						case 3: 
							// momentMoveing([14,0,1], [16,47,-89]) 
							tweenMoveing([-0,0,56], [-1,85,157], 2000, (e) => {
							})
							break;
						case 4: 
							// momentMoveing([0,0,-11], [-0,38,44]) 
							tweenMoveing([0,0,-11], [-0,38,44], 2000, (e) => {
							})
							break;
					}
					intoRoom(row.id)
				}else{
					alert(row.name + "模型正在建设！")
				}
			}
			
			// 巡检机器人数据
			const robotData = [
				{
					"robotId": "33",
					"robotName": "T3C 测试样机",
					"robotType": "T3-C02-B",
					"robotSn": "TC-001"
				},
				{
					"robotId": "33",
					"robotName": "T3C 测试样机",
					"robotType": "T3-C02-B",
					"robotSn": "TC-002"
				},
				{
					"robotId": "33",
					"robotName": "T3C 测试样机",
					"robotType": "T3-C02-B",
					"robotSn": "TC-003"
				},
				{
					"robotId": "33",
					"robotName": "T3C 测试样机",
					"robotType": "T3-C02-B",
					"robotSn": "TC-004"
				}
			]
			
			// 车辆数据
			const carData = [
				{time: '2022/11/08 10:50', plate: '渝A134567', type: '出'},
				{time: '2022/11/08 15:50', plate: '渝A134779', type: '出'},
				{time: '2022/11/07 14:20', plate: '渝A153479', type: '入'},
				{time: '2022/11/07 14:10', plate: '渝A128796', type: '入'},
				{time: '2022/11/06 17:50', plate: '渝A154677', type: '入'}
			]
			
			//人员
			const personData = [
				{name: '李欣欣', serial: '23132546', area: 'B1598'},
				{name: '郑小林', serial: '22189751', area: 'B1856'},
				{name: '彭鹏', serial: '12596227', area: 'B2698'},
				{name: '杨虎', serial: '3254824', area: 'B7518'},
			]
			
			return {
				activeName,
				contentHeight,
				indexWidth,
				intelligentWorkshopData,
				intelligentWorkshopEvent,
				robotData,
				carData,
				personData
			}
		},
		methods: {
			handleClick(tab, event) {
				/* console.log(tab)
				tab.$el.style.opacity = 0
				tab.$el.style.transition = '1s'
				// tab.$el.style.position = 'relative'
				// tab.$el.style.left = '-100%'
				setTimeout(() => {
					tab.$el.style.opacity = 1
					// tab.$el.style.left = '0%'
				}, 100) */
			}
		}
	}
</script>

<style scoped>
	.ModulePark{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 36px 70px 36px 70px;
	}
	@media screen and (max-width: 1920px) {
		.ModulePark{
			padding: 13px 15px 13px 15px;
		}
	}
</style>