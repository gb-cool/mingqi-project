<template>
	<div class="videoView">
		<el-collapse v-model="activeIndex" accordion>
			<el-collapse-item v-for="(item, index) in videoListData" :key="index" :title="item.name + ' （'+ item.list.length + '）'" :name="item.index">
				<el-table
					:data="item.list"
					highlight-current-row
					:height="contentHeight" 
					@row-click="intelligentWorkshopEvent"
					:show-header="false"
					>
					<el-table-column align="center" prop="cameraName" label="摄像头名称">
						<template #default="scope">
							<p style="text-align: left;text-indent: 2rem;">
								<img style="width: 1.2rem;position: relative;top: 3px;margin-right: 0.5rem;" src="../assets/img/video.png"/>
								<span>{{ scope.row.cameraName }}</span>
							</p>
						</template>
					</el-table-column>
				</el-table>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	import { ref, inject, watch } from 'vue'
	import { Video } from '../assets/js/video.js'
	export default{
		props:['type'],
		setup(props, context) {
			const contentHeight = ref(400)
			contentHeight.value = window.innerHeight * 0.6 - 250
			const video = new Video()
			const activeIndex = ref(0)
			
			let videoListData = ref({})
			let videoJson = {}
			video.getRegions((result) =>{
				if(result.code == "0"){
					let da = result.data.list
					da.forEach(async (item) => {
						if(item.parentIndexCode!=-1){
							const isR = getVideoRoom(item.indexCode)
							item.room = isR.room
							item.index = isR.index
							await getRegionIndexCodeData(item)
						}
					})
				}
			})
			async function getRegionIndexCodeData(item){
				await video.getCamerasByRegionIndexCodeAsync(item.indexCode).then((response) => {
					let result = response.data
					if(result.code != "1000") return false
					let _data = eval("("+ result.data +")")
					if(_data.code != "0") return false
					let da = _data.data.list
					item.index in videoJson ? videoJson[item.index].list = videoJson[item.index].list.concat(da) : videoJson[item.index] = {name: item.room, index: item.index, list: da}
					videoListData.value = Object.values(videoJson)
				})
			}
			/**
			 * 获取设备所属车间
			 * @param {Object} indexCode
			 */
			function getVideoRoom(indexCode){
				let room = ""
				switch(indexCode){
					case "0cd46b13-c945-489d-a9c5-e9e3443cf9a2":	// 室外公共通道
						room = "其他"
						break;
					case "3bb22e5d-3d5f-43cb-bb20-8bb9e2cd95b4":	// "1#、2#收发室"
						room = "其他"
						break;
					case "7cc1121b-9b6f-47f4-b76d-13883c37f2cd":	// "危险区域"
						room = "立磨车间"
						break;
					case "488f2d78-c4f1-4382-9f08-a43e1e9143f4":	// "3#、4#厂房"
						room = "矿石堆场"
						break;
					case "754688a1-bc12-473a-83f2-cb8d60db6908":	// "均化间2"
						room = "均化车间"
						break;
					case "ab89a9c6-abdb-43c2-b598-64b53d9201bb":	// "消控室、备件间、水泵房"
						room = "其他"
						break;
					case "ab486017-ebc1-49cd-b2d6-7b7c72777dd9":	// "破碎间、筛分间"
						room = "破碎车间、筛分车间"
						break;
					case "ac019801-dbcd-4c6a-add1-274c58d0188d":	// "1#、2#库房"
						room = "矿石堆场"
						break;
					case "b94446a2-2c52-4382-b0ed-5a959fd8aa4a":	// "立磨间2"
						room = "立磨车间"
						break;
					case "be34970e-2f04-4017-9e7d-36c0b48ae487":	// "均化间1"
						room = "均化车间"
						break;
					case "c88416af-e6ef-464b-b15e-e4a9899120fe":	// "碎石配料间、转运站"
						room = "碎石配料间"
						break;
					case "cab050fb-9f24-4280-a7fc-f4df7ed70b16":	// "集中投料站"
						room = "其他"
						break;
					case "e6beca3d-fd0f-4da9-ac1c-83bb747bed6b":	// "立磨间1"
						room = "立磨车间"
						break;
				}
				let index = -1
				switch(room){
					case "矿石堆场": index = 0; break;
					case "破碎车间、筛分车间": index = 1; break;
					case "碎石配料间": index = 2; break;
					case "立磨车间": index = 3; break;
					case "均化车间": index = 4; break;
					case "其他": index = 5; break;
				}
				return {
					room: room,
					index: index
				}
			}
			
			let popupIsShow = inject('popupIsShow')	// 是否显示弹窗
			let popupTitle = inject('popupTitle')	// 弹出标题
			let popupContent = inject('popupContent')	// 弹窗内容
			let popupFileds = inject('popupFileds')	//弹出结构
			let popupType = inject('popupType') // 弹窗内容类型
			const intelligentWorkshopEvent = (row, event, column) => {
				popupType.value = "video"
				popupIsShow.value = true
				CacheData.video.selectCameraData = row
				popupTitle.value = row.cameraName
				// console.log(event, column)
			}
			return {
				contentHeight,
				intelligentWorkshopEvent,
				activeIndex,
				videoListData
			}
		}
	}
</script>

<style scoped>
	.videoView{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	:deep(.el-collapse-item__header){
		background: none;
		color: #fff;
		font-size: 1rem;
		font-weight: 700;
	}
	:deep(.el-collapse-item__wrap){
		background: none;
	}
	:deep(.el-collapse-item__content){
		padding-bottom: 5px;
	}
	:deep(.el-table td.el-table__cell:first-child){
		border-left:0px;
	}
	:deep(.el-table td.el-table__cell:last-child){
		border-right:0px;
	}
</style>