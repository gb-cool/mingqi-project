<!-- 危险区域人员 -->
<template>
	<div class="ModulePerson">
		<el-scrollbar :always="true">
			<ul>
				<!-- @click="intelligentWorkshopEvent(item)" -->
				<li v-for="(item, index) in personData" :key="index" >
					<ModulePersonInfo @lookPosition="lookPosition" @lookInfo="lookInfo" :thumb="item.imgaddr" :name='item.empName' :serial='item.deviceNo' :area='item.electric'/>
				</li>
			</ul>
		</el-scrollbar>
	</div>
</template>

<script>
	import { ref, inject, onMounted, onDeactivated, watch } from 'vue'
	import ModulePersonInfo from './ModulePersonInfo.vue'
	import { JoySuch, Seekey } from '../assets/js/positionPerson.js'
	import { initalizeMan_3d, realtimeMotionMan_3d, focusPeople_3d, visibleMan_3d, initalizeCar_3d, realtimeMotionCar_3d } from "../3d/index";
	import { visibleMan } from '@/3d/industryEquip';
	export default {
		name: 'ModulePerson',
		components: {
			ModulePersonInfo
		},
		emits:['getPersonNum'],
		setup(props, ctx) {
			const isThreeDLoad = inject('isThreeDLoad')	// 获取三维加载状态，1表示已初始完成可以执行事件
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹出标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	//弹出结构
			let popupType = inject('popupType') // 弹窗内容类型
			const fileds = {
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
			
			// 触发弹窗点击事件
			const intelligentWorkshopEvent = (row) => {
				popupTitle.value = '重点区域人员详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = fileds
				popupType.value = 'json'
			}
			
			const toolsType = inject("toolsType")	// 功能模式
		
			const psersonTimer = ref(0)
			let personData = ref([])
			const joySuch = new JoySuch()
			const getData = joySuch.getToken(() => {
				realTime()
			})
			const seekey = new Seekey()
			seekey.getSeekeyAccessToken()
			let timerCount = 0;
			
			let carVisitFindData = []	// 车辆访问数据缓存
			
			const realTime = async () => {
				await joySuch.getVisitFind().then((response) => {
					let data = response.data.data 
					// 车辆访客信息	visitType = 1
					CacheData.car.visitArrayData = data.filter(item => item.visitType == 1)	// 缓存车辆通行数据
				})
				if(CacheData.person.allData.length == 0 || Object.is(toolsType.value, "roaming")){
					setTimeout(() => realTime(), 1000)
					return false
				}
				if(timerCount % 60 == 0) {
					// 执行1个小时更新获取相对位置Token值
					seekey.getSeekeyAccessToken()
				}
				joySuch.getRealTimeData(async (result) => {
					if(result.code == 0){	//成功
						let PCData =  result.data
						
						// 查询想对位置token值，并获取相对位置数据
						let _seekD = []
						await seekey.getBlts().then((response) => {
							// console.log(response)
							if(response.data.errorCode == 0) _seekD = response.data.data.data
							mergePositionData(PCData, _seekD)	// 合并人员实时位置信息
						})
						personData.value = CacheData.person.realListData
						ctx.emit('getPersonNum', "（"+ personData.value.length +"人）")	// 将人员数量传递给父级
					}else if(result.code == 1002){  // token失效
						getData()
					}
				})
				timerCount++
			}
			/**
			 * 合并人员实时位置数据
			 * 根据mac字段值匹配
			 * @param {Object} joySuchData	// 人员实时位置信息
			 * @param {Object} seekeyData	// 相对位置信息
			 * @return {type}	// 返回人员实时位置信息
			 */
			let historyRealListData = []	// 记录历史数据
			let carHistoryListData = []	// 记录车辆历史数据，用于判断车辆是否都存在，存在则不需要创建
			async function mergePositionData(joySuchData, seekeyData){
				for(let i=0; i < joySuchData.length; i++){
					let _joyItem = joySuchData[i]
					let deviceNo = _joyItem.deviceNo	// 穿戴设备编号（Mac地址）
					for(let j = 0; j < seekeyData.length; j++){
						let _seeItem = seekeyData[j]
						let mac = _seeItem.mac
						if(Object.is(deviceNo, mac)){
							_joyItem.x = _seeItem.x
							_joyItem.y = _seeItem.y
						}
					}
				}
				let personHideData = []	// 需要隐藏的人员数据
				let carHideData = []	// 需要隐藏的车辆数据
				if(historyRealListData.length > 0){
					let historyData = historyRealListData	// 缓存的历史数据
					historyData.forEach((item) => {
						let isa = joySuchData.filter((e) => Object.is(e.deviceNo, item.deviceNo))
						if(isa.length == 0){
							item.specifictype == 4 ? carHideData.push(item.deviceNo) : personHideData.push(item.deviceNo)
						}
					})
				}
				if(personHideData.length > 0){
					visibleMan_3d(personHideData, false)	// 隐藏模型
				}
				historyRealListData = joySuchData // 人员车辆数据缓存
				let personData = joySuchData.filter((item) => (item.specifictype == '0' || item.specifictype == '1' || item.specifictype == '2'))
				CacheData.person.realListData = personData	// 缓存人员信息
				let carData = joySuchData.filter((item) => (item.specifictype == '4'))
				// carData = personData
				// carData = [{
				// 	"deviceNo": "11",
				// 	"empName": "席波1",
				// 	"empNo": "",
				// 	"x": 244000,
				// 	"y": 551800
				// }]
				// console.log(carData)
				if(carData.length>0){
					// 获取卡号绑定的车辆信息
					let carVisitArray = CacheData.car.visitArrayData
					carData.forEach(item => {
						let carVisit = carVisitArray.filter(da => Object.is(item.deviceNo, da.sn))
						if(carVisit.length > 0){
							item.empName = carVisit[0].name
							item._visit = carVisit[0]
							item._visit.x = item.x
							item._visit.y = item.y
						}
					})
				}
				CacheData.car.realListData = carData	// 缓存车辆信息
				// 人员模型显示
				let showData = []
				personData.forEach((item) => showData.push(item.deviceNo))
				visibleMan_3d(showData, true)	// 显示当前人员模型
				// 车模型加载
				let carShowData = []
				carData.forEach(item => carShowData.push({id: item.deviceNo, name: item.empName == null ? item.deviceNo : item.empName,x: item.x,y: item.y}))
				// 判断车辆是否以上一次一致，一致则不需要重新创建
				if(carHistoryListData.length == carShowData.length){
					let isCar = false
					carHistoryListData.forEach( item => carShowData.filter((c) => Object.is(item.id, c.id)).length == 0 ? isCar = true : "")
					if(isCar){
						// console.log(carShowData)
						initalizeCar_3d(carShowData)
					}
				}else{
					console.log(carShowData)
					initalizeCar_3d(carShowData)
				}
				carHistoryListData = carShowData	// 车辆数据存储
				setMove(joySuchData, carData)
			}
			/**
			 * 设置人员车辆动画
			 */
			function setMove(personData, carData){
				personData.forEach((p) => {
					p.layer = 1
					// p.x = 203370
					// p.y = 655060
					realtimeMotionMan_3d(p.deviceNo, [p.x, p.y], joySuch.getLayerToName(p.layer), 2000, (result) => {})
				})
				setTimeout(() => {
					carData.forEach((p) => {
						realtimeMotionCar_3d(p.deviceNo, [p.x, p.y], 3000 ,() => {})
					})
				}, 2000)
				setTimeout(() => realTime(), 1000 * 10)
			}
			
			/**
			 * 人员聚焦
			 */
			const lookPosition = (deviceNo) => {
				let row = personData.value.filter((item) => Object.is(item.deviceNo, deviceNo))
				if(row.length > 0){
					row = row[0]
					focusPeople_3d(deviceNo, 2000, () => {})	// 聚焦
				}
			}
			/**
			 * 查看人员信息
			 */
			const lookInfo = (deviceNo) => {
				let row = personData.value.filter((item) => Object.is(item.deviceNo, deviceNo))
				if(row.length > 0){
					row = row[0]
					intelligentWorkshopEvent(row)	// 标签显示
				}
			}
			onMounted(()=>{ //组件挂载时的生命周期执行的方法
				/* psersonTimer.value = setInterval(function(){
					if(CacheData.person.allData.length > 0){
						clearInterval(psersonTimer.value)
						let data = CacheData.person.allData
						let md = []
						let hideData = []
						data.forEach((p) => {
							md.push({id: p.sn, name: p.name})
							hideData.push(p.sn)
						})
						initalizeMan_3d(md, () => {
							console.log("开始执行")
							psersonTimer.value = null
							setTimeout(() => {
								visibleMan_3d(hideData, false)	// 隐藏人员
								realTime()	// 人员实时动画
							}, 1000)
						})
					}
				}, 1000) */
			})
			onDeactivated(()=>{ //离开当前组件的生命周期执行的方法
				/* clearInterval(psersonTimer.value); */
			})
			return {
				personData,
				intelligentWorkshopEvent,
				lookPosition,
				lookInfo
			}
		}
	}
</script>

<style scoped>
	.ModulePerson{
		height: 100%;
	}
	.ModulePerson ul{
		overflow: hidden;
		box-sizing: border-box;
		padding-left: calc(12/1920*100vw);
	}
	.ModulePerson li{
		width: 50%;
		float: left;
		height: calc(100/1080*100vh);
		padding: calc(20/1080*100vh) 0 calc(20/1080*100vh) 0px;
		box-sizing: border-box;
		cursor: pointer;
	}
</style>