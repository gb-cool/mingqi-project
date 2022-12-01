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
			
			let personData = ref([])
			const joySuch = new JoySuch()
			const getData = joySuch.getToken(() => {
				joySuch.getRealTimeData((result) => {
					if(result.code == 0){	//成功
						personData.value = result.data.filter((item) => (item.specifictype == '0' || item.specifictype == '1' || item.specifictype == '2'))
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
		padding-left: 50px;
	}
	.ModulePerson li{
		width: 50%;
		float: left;
		height: 320px;
		padding: 50px 0 50px 0px;
		box-sizing: border-box;
		cursor: pointer;
	}
	@media screen and (max-width: 1920px) {
		.ModulePerson ul{
			padding-left: 12px;
			padding-top: 10px;
		}
		.ModulePerson li{
			height: 100px;
			padding: 20px 0 20px 0px;
		}
	}
</style>