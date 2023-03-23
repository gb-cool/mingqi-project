<template>
	<div class="box">
		<div class="nav">
			<ul>
				<li v-for="(item, index) in dataList" :key="index" @click="look(item)">
					{{item.cameraName}}
				</li>
			</ul>
		</div>
		<div class="main">
			<input v-model="url" />	<button @click="add">添加</button>
			<p>当前地址：{{url}}</p>
			<div class="vodeo" v-for="(item, index) in urls"  :key="index">
				<p>{{item}}</p>
				<videoM3 class="videoM3" :url="item" ></videoM3>
			</div>
		</div>
	</div>
</template>

<script>
	// 请求默认的ip为长寿生产环境  http://10.12.3.98:31501
	import { ref } from 'vue';
	import videoM3 from '../components/Video'
	import { Video } from '../assets/js/video.js'
	export default {
		components: {
			videoM3
		},
		setup(){
			let urls = ref(['http://127.0.0.1:8003/0.m3u8'])
			let url = ref('')
			const add = () => {
				urls.value.push(url.value)
			}
			
			let video = new Video()
			let dataList = ref([])
			// video.getCamerasByRegionIndexCode('e6beca3d-fd0f-4da9-ac1c-83bb747bed6b', (result) => {
			// 	if(Object.is(result.msg, "success")){
			// 		let data = eval("("+ result.data +")")
			// 		dataList.value = data.data.list
			// 		console.log(data)
			// 	}			
			// })
			video.getRegions((regions) => {
				// console.log(regions)
				// const regionIndexCode = "7cc1121b-9b6f-47f4-b76d-13883c37f2cd"
			})
			video.getCameras((cameras) => {
				// console.log(cameras)
				dataList.value = cameras.data.list
				// urls.value = dataList.filter((item) => Object.is(item.regionIndexCode, regionIndexCode))
				// console.log(urls.value)
			})
			
			function look(row){
				console.log(row)
				video.getPreviewURLs(row.cameraIndexCode, (result) =>{
					let url = result.data.url
					urls.value = [url]
				})
			}
			return {
				urls,
				url,
				add,
				dataList,
				look
			}
		}
	}
</script>

<style scoped>
	input {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}
	.vodeo{
		display: inline-block;
		margin: 10px;
	}
	.box{
		width: 100%;
		height: 100%;
	}
	.nav{
		position: absolute;
		width: 200px;
		left: 0px;
		top: 0px;
		padding-left: 20px;
		height: 100%;
		overflow: auto;
	}
	.nav li {
		line-height: 32px;
		cursor: pointer;
	}
	.main{
		margin: 0 0 0 220px;
	}
</style>
