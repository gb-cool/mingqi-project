<!-- 危险区域人员 -->
<template>
	<div class="ModulePerson">
		<ul>
			<li v-for="(item, index) in personData" :key="index" @click="intelligentWorkshopEvent(item)">
				<ModulePersonInfo :name='item.empName' :serial='item.deviceNo' :area='item.electric'/>
			</li>
		</ul>
	</div>
</template>

<script>
	import { ref, inject } from 'vue'
	import ModulePersonInfo from './ModulePersonInfo.vue'
	import { JoySuch } from '../assets/js/positionPerson.js'
	export default {
		name: 'ModulePerson',
		components: {
			ModulePersonInfo
		},
		setup() {
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
				popupTitle.value = '危险区域人员详情'
				popupIsShow.value = true
				popupContent.value = row
				popupFileds.value = fileds
				popupType.value = 'json'
			}
			let pList = [
				{
					dateTime: "2022-12-20 21:10:54",
					department: "",
					deviceNo: "1918FF029298",
					electric: "50-75%",
					empName: "陈洪",
					empNo: "",
					imgaddr: "",
					islxsign: "0",
					latitude: 29.843071137691485,
					longitude: 106.98064524723237,
					specifictype: "0",
					tel: "13883237748",
					worktype: "",
					worktypename: "",
					workunit: ""
				},
				{
					dateTime: "2022-12-20 21:30:14",
					department: "",
					deviceNo: "1918FF029299",
					electric: "50-75%",
					empName: "贺浩",
					empNo: "",
					imgaddr: "",
					islxsign: "0",
					latitude: 29.84407113,
					longitude: 106.9816452,
					specifictype: "0",
					tel: "13883237748",
					worktype: "",
					worktypename: "",
					workunit: ""
				}
			]
			let personData = ref([])
			const joySuch = new JoySuch()
			const getData = joySuch.getToken(() => {
				joySuch.getRealTimeData((result) => {
					if(result.code == 0){	//成功
						personData.value = result.data.filter((item) => (item.specifictype == '0' || item.specifictype == '1' || item.specifictype == '2'))
						if(personData.value == ""){
							personData.value = pList
						}
					}else if(result.code == 1002){  // token失效
						getData()
					}
				})
			})
			return {
				personData,
				intelligentWorkshopEvent
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