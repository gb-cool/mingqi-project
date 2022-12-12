<template>
	<div>
		<div>
			<input v-model="url" />	<button @click="add">添加</button>
			<p>当前地址：{{url}}</p>
		</div>
		<div class="vodeo" v-for="(item, index) in urls"  :key="index">
			<p>{{item}}</p>
			<videoM3 class="videoM3" :url="item" ></videoM3>
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
			video.getRegions((regions) => {
				console.log(regions)
				// const regionIndexCode = "7cc1121b-9b6f-47f4-b76d-13883c37f2cd"
			})
			video.getCameras((cameras) => {
				console.log(cameras)
				let dataList = cameras.data.list
				// urls.value = dataList.filter((item) => Object.is(item.regionIndexCode, regionIndexCode))
				// console.log(urls.value)
			})
			
			return {
				urls,
				url,
				add
			}
		}
	}
</script>

<style scoped>
	input {
		height: 100%;
		width: 100%;
	}
	.vodeo{
		display: inline-block;
		margin: 10px;
	}
</style>
