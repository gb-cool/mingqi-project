<template>
	<div class="videoView">
		<el-menu
		    :default-active="activeIndex"
		    class="el-menu-demo"
			background-color="#0473F9"
			text-color="#fff"
			active-text-color="#000"
		    mode="horizontal"
		    @select="handleSelect">
<!-- 		    <el-menu-item index="1">所有摄像头</el-menu-item>
		    <el-menu-item index="2">矿石堆场</el-menu-item> -->
<!-- 			<el-menu-item index="4">筛分车间</el-menu-item>
			<el-menu-item index="5">碎石仓配料车间</el-menu-item> -->
			<el-menu-item index="6">立磨车间</el-menu-item>
			<el-menu-item index="7">均化车间</el-menu-item>
			<el-menu-item index="3">破碎车间</el-menu-item>
		</el-menu>
		<el-table
			:data="tableData"
			highlight-current-row
			:height="contentHeight" 
			@row-click="intelligentWorkshopEvent"
			:show-header="false"
			border>
			<el-table-column align="center" prop="cameraName" label="摄像头名称">
				<template #default="scope">
					<p style="text-align: left;text-indent: 2rem;">
						<img style="width: 1.2rem;position: relative;top: 3px;margin-right: 0.5rem;" src="../assets/img/video.png"/>
						<span>{{ scope.row.cameraName }}</span>
					</p>
				</template>
			</el-table-column>
			<!-- <el-table-column align="center" prop="cameraIndexCode" label="摄像头编号"/> -->
			<!-- <el-table-column align="center" prop="cameraTypeName" label="摄像头类型"/> -->
			<!-- <el-table-column align="center" prop="regionIndexCode" label="所属车间">
				<template #default="scope">
					<span>	{{ getRoom(scope.row) }}</span>
				</template>
			</el-table-column> -->
		</el-table>
	</div>
</template>

<script>
	import { ref, inject, watch } from 'vue'
	export default{
		props:['type'],
		setup(props, context) {
			const contentHeight = ref(400)
			contentHeight.value = window.innerHeight * 0.6
			
			const tableData =ref()
			let allData = []
			allData = CacheData.video.limoListData
			tableData.value = allData
			getData()
			function getData(){
				if(CacheData.video.limoListData.length == 0){
					setTimeout(() => {
						getData()
					}, 3000)
				}else{
					allData = CacheData.video.limoListData
					tableData.value = allData
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
			
			const activeIndex = ref('6')
			const handleSelect = (key, keyPath) => {
				switch(parseInt(key)){
					case 1:
						tableData.value = allData
						break;
					case 2 :
						tableData.value = []
						break;
					case 3 :
						tableData.value = []
						break;
					case 4 :
						tableData.value = []
						break;
					case 5 :
						tableData.value = []
						break;
					case 6 :
						tableData.value = allData.filter((item) => Object.is(item.regionIndexCode, "e6beca3d-fd0f-4da9-ac1c-83bb747bed6b"))
						break;
					case 7 :
						tableData.value = []
						break;
				}
			}
			
			const getRoom = (row) => {
				let room = ""
				switch(row.regionIndexCode){
					case "e6beca3d-fd0f-4da9-ac1c-83bb747bed6b":
							room = "立磨车间"
						break;
				}
				return room
			}
			return {
				contentHeight,
				tableData,
				intelligentWorkshopEvent,
				getRoom,
				activeIndex,
				handleSelect
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
</style>