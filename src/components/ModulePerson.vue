<!-- 危险区域人员 -->
<template>
	<div class="ModulePerson">
		<el-scrollbar :always="true">
			<ul>
				<!-- @click="intelligentWorkshopEvent(item)" -->
				<li v-for="(item, index) in personData" :key="index" >
					<ModulePersonInfo @lookPosition="lookPosition" @lookInfo="lookInfo" :personData="item" :thumb="item.imgaddr" :name='item.empName' :serial='item.deviceNo' :area='item.electric'/>
				</li>
			</ul>
		</el-scrollbar>
	</div>
</template>

<script>
	import { ref, inject, onMounted, onDeactivated, watch } from 'vue'
	import ModulePersonInfo from './ModulePersonInfo.vue'
	import { JoySuch, Seekey } from '../assets/js/positionPerson.js'
	import { initalizeMan_3d, realtimeMotionMan_3d, focusPeople_3d, visibleMan_3d, initalizeCar_3d, realtimeMotionCar_3d,deletCar_3d } from "../3d/index";
	import { visibleMan } from '@/3d/industryEquip';
	export default {
		name: 'ModulePerson',
		components: {
			ModulePersonInfo
		},
		props:['personData'],
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
			// let personData = ref([])
			/**
			 * 人员聚焦
			 */
			const lookPosition = (row) => {
				focusPeople_3d(row.deviceNo, 2000, () => {})	// 聚焦
			}
			/**
			 * 查看人员信息
			 */
			const lookInfo = (row) => {
				intelligentWorkshopEvent(row)	// 标签显示
			}
			onMounted(()=>{ //组件挂载时的生命周期执行的方法
			})
			onDeactivated(()=>{ //离开当前组件的生命周期执行的方法
			})
			return {
				// personData,
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