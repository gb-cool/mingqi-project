<!-- 微粉园 -->
<template>
	<div class="ModulePark">
		<div class="box" ref="elTabs">
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
					@row-click="carEvent"
					:show-header="true">
						<el-table-column 
						prop="empName" 
						label="车牌" 
						align="center">
						</el-table-column>
						<el-table-column
						prop="deviceNo" 
						label="设备编号" 
						align="center">
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="人员" name="fourth">
					<el-table
					:data="personData" 
					style="width: 100%" 
					:height="contentHeight"
					@row-click="personEvent"
					:show-header="true">
						<el-table-column 
						prop="name" 
						label="姓名" 
						align="center">
						</el-table-column>
						<el-table-column
						prop="sn" 
						label="SN号" 
						align="center">
						</el-table-column>
						<el-table-column
						prop="postName" 
						label="岗位" 
						align="center">
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import { ref, inject, watch, onMounted } from 'vue'
	import { intoRoom, momentMoveing, tweenMoveing, outWallSetOpacity } from "../3d/index";	// 三维
	import { JoySuch } from '../assets/js/positionPerson.js'
	export default {
		name: 'ModulePark',
		setup() {
			const elTabs = ref()	// 取盒子高度，计算表格内容高度值
			const activeName = 'first'	// 默认选中导航值
			let contentHeight = ref(190)	// 内容盒子高度
			let indexWidth = ref(60)	// 序号宽度
			const initObj = () => {
				indexWidth.value = 60/1920*window.innerWidth
				let h = 36/1080*window.innerHeight
				contentHeight.value = elTabs.value.offsetHeight - h - 15
			}
			onMounted(() => {
				initObj()
				window.addEventListener("resize", function () {
					initObj()
				})
			})
			// 智能车间
			const intelligentWorkshopIndex = 0
			// 参数  0 == 筛粉间   1 == 均化间  2 == 立磨间  3 == 碎石仓配料间  4 == 破碎间
			const isThreeDLoad = inject('isThreeDLoad')	// 获取三维加载状态，1表示已初始完成可以执行事件
			const intelligentWorkshopData = [	//智能车间数据
					{id: 5, name: '矿石堆场'},
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
							tweenMoveing([-9,-0,8], [27,19,57], 2000, (e) => {
							})
							break;
						case 1: 
							// momentMoveing([25,0,-12], [27,27,97])
							tweenMoveing([33,0,-96], [30,29,89], 2000, (e) => {
							})
							break;
						case 2: 
							// momentMoveing([9,0,19], [8,14,85])
							// tweenMoveing([9,0,19], [8,14,85], 2000, (e) => {
							// })
							tweenMoveing([-59,-0,-7], [-61,15,89], 2000, (e) => {
							})
							break;
						case 3: 
							// momentMoveing([14,0,1], [16,47,-89]) 
							tweenMoveing([-2,-0,18], [-7,24,170], 2000, (e) => {
							})
							break;
						case 4: 
							// momentMoveing([0,0,-11], [-0,38,44]) 
							tweenMoveing([1,-0,10], [-0,29,74], 2000, (e) => {
							})
							break;
						case 5:
							// momentMoveing([0,0,-11], [-0,38,44]) 
							tweenMoveing([7,-0,32], [7,57,201], 2000, (e) => {
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
			const carFileds = {
				deviceNo: '穿戴设备编号（Mac地址）',
				empName: '员工姓名',
				empNo: '员工工号',
				imgaddr: '头像图片地址',
				dateTime: '时间',
				longitude: '经度',
				latitude: '纬度',
				layer: '楼层数',
				worktype: '工种类型',
				specifictype: '人员卡类型',
				worktypename: '岗位名称',
				tel: '电话号码',
				electric: '穿戴设备当前电量',
				islxsign: '状态',
				workunit: '工作单位',
				department: '部门_工作组'
			}
			const carData = ref([])
			
			//人员
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹出标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	//弹出结构
			let popupType = inject('popupType') // 弹窗内容类型
			const personFileds = {
				id: "人员ID",
				postId: "岗位ID",
				postName: "岗位",
				departId: "部门ID",
				departName: "部门名称",
				name: "人员姓名",
				sex: "性别",
				sn: "SN号",
				cardNumber: "门禁卡号",
				iconId: "图标ID",
				alarmTemplate: "报警模板",
				extFields: "扩展数据",
				url: "人员详情链接",
				code: "人员工号",
				telephone: "电话号码",
				gender: "性别",
				birthday: "生日",
				oldName: "曾用名",
				role: "身份",
				workCompany: "工作单位",
				idCardImgId: "证件照id",
				nation: "民族",
				idCardType: "证件类型",
				idCardNo: "证件号",
				healthStatus: "健康状况",
				education: "学历",
				major: "专业",
				address: "通讯地址",
				postcode: "邮编",
				joinWorkDate: "参加工作时间",
				jobDuty: "工作职责",
				title: "职称/技能等级",
				jobHistory: "工作经历",
				socialCreditCode: "企业信用代码"
			}
			let personData = ref([])
			const joySuch = new JoySuch()
			const getData = joySuch.getToken(() => {
				joySuch.getPersonList((result) => {
					if(result.code == 0){	//成功
						personData.value = result.data.content
					}else if(result.code == 1002){  // token失效
						getData()
					}
				})
				joySuch.getRealTimeData((result) => {
					if(result.code == 0){	//成功
						carData.value = result.data.filter((item) => (item.specifictype == '4'))
					}else if(result.code == 1002){  // token失效
						getData()
					}
				})
			})
			// 人员触发弹窗点击事件
			const personEvent = (row, event, column) => {
				row.alarmTemplate =""
				popupTitle.value = '人员详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = personFileds
				popupType.value = 'json'
			}
			// 车辆触发弹窗点击事件
			const carEvent = (row) => {
				popupTitle.value = '车辆详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = carFileds
				popupType.value = 'json'
			}
			// >> 人员
			return {
				elTabs,
				activeName,
				contentHeight,
				indexWidth,
				intelligentWorkshopData,
				intelligentWorkshopEvent,
				robotData,
				carData,
				carEvent,
				personData,
				personEvent
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

<style scoped lang="less">
	@import "../assets/css/public.less";
	.ModulePark{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: @module-content-mw;
	}
	.box{
		height: 100%;
	}
</style>