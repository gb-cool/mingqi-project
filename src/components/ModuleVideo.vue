<!-- 危险区域视频 -->
<template>
	<div class="ModuleVideo">
		<div class="swiper">
			<!-- Additional required wrapper -->
			<div class="swiper-wrapper">
				<!-- Slides -->
				<div class="swiper-slide" v-for="(item,index) in videoData" :key="index">
					<ModuleVideoMonitor :url="item.url"/>
					<span>{{item.name}}</span>
				</div>
			</div>
			<!-- If we need pagination -->
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
	import { onMounted } from 'vue'
	import Swiper, {Pagination, Autoplay} from 'swiper'
	import 'swiper/swiper-bundle.css'
	import ModuleVideoMonitor from './ModuleVideoMonitor.vue'
	Swiper.use([Pagination, Autoplay])
	export default {
		name: 'ModuleVideo',
		components: {
			ModuleVideoMonitor
		},
		setup(){
			const videoData = [
				{ip:'10.12.64.90', name:'北-均化仓楼上1', url:'../assets/video/video2.mp4'},
				{ip:'10.12.64.91', name:'北-均化仓楼上2', url:'../assets/video/video2.mp4'},
				{ip:'10.12.64.92', name:'北-均化仓楼下1', url:'../assets/video/video2.mp4'},
				{ip:'10.12.64.93', name:'南-均化仓楼上1', url:'../assets/video/video2.mp4'},
				{ip:'10.12.64.94', name:'南-均化仓楼上2', url:'../assets/video/video2.mp4'},
				{ip:'10.12.64.95', name:'南-均化仓楼下1', url:'../assets/video/video2.mp4'},
				{ip:'10.12.64.96', name:'立磨一期'},
			]
			onMounted(() => {
				const swiper = new Swiper('.swiper', {
					loop: true,
					// slidesPerView: 1.2,
					centeredSlides: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					autoplay: {
						delay: 10000
					}
				})
				//鼠标滑过pagination控制swiper切换
				for(let i=0; i<swiper.pagination.bullets.length; i++){
					swiper.pagination.bullets[i].onmouseover=function(){
						this.click();
					};
				} 
			})
			
			return {
				videoData
			}
		}
	}
</script>

<style>
	.ModuleVideo{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 40px;
	}
	.swiper{
		height: 100%;
	}
	.swiper-slide span{
		position: absolute;
		right: 20px;
		bottom: 120px;
		font-size: 0.9rem;
	}
	.swiper-pagination{
		background: rgba(0, 1, 59, 0.6);
		bottom: 0px !important;
		height: 100px;
		padding: 30px 0;
		box-sizing: border-box;
	}
	.swiper-pagination .swiper-pagination-bullet{
		width: 32px !important;
		height: 32px !important;
		margin: 0 15px !important;
		background: #92A6CB;
	}
	.swiper-pagination .swiper-pagination-bullet-active{
		background: #0473F9;
		box-shadow: inset 0px 0px 10px rgb(4 142 249);
	}
	@media screen and (max-width: 1920px) {
		.ModuleVideo{
			padding: 12px;
		}
		.swiper-pagination{
			height: 32px;
			padding: 10px 0;
		}
		.swiper-pagination .swiper-pagination-bullet{
			width: 12px !important;
			height: 12px !important;
			margin: 0 6px !important;
		}
		.swiper-slide span{
			right: 8px;
			bottom: auto;
			top: 5px;
		}
	}
</style>