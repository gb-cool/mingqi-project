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
	export default {
		components: {
			videoM3
		},
		setup(){
			let urls = ref(['http://10.12.108.10:83/openUrl/4BBQcMw/live.mu38'])
			let url = ref('')
			const add = () => {
				urls.value.push(url.value)
			}
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
		height: 44px;
		width: 50%;
	}
	.vodeo{
		display: inline-block;
		margin: 10px;
	}
</style>
