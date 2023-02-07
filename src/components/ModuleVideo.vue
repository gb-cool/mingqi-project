<!-- 危险区域视频 -->
<template>
	<div class="ModuleVideo">
		<div class="swiper">
			<!-- Additional required wrapper -->
			<div class="swiper-wrapper">
				<!-- Slides -->
				<!-- <div class="swiper-slide" v-for="(item,index) in videoData" :key="index">
					<ModuleVideoMonitor :url="item.url"/>
					<span>{{item.name}}</span>
				</div> -->
				<div class="swiper-slide">
					<ModuleVideoMonitor :list="urls"  />
				</div>
			</div>
			<!-- If we need pagination -->
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
	import { ref, onMounted } from 'vue'
	import Swiper, {Pagination, Autoplay} from 'swiper'
	import 'swiper/swiper-bundle.css'
	import ModuleVideoMonitor from './ModuleVideoMonitor.vue'
	import videoM3 from '../components/Video'
	import { Video } from '../assets/js/video.js'
	Swiper.use([Pagination, Autoplay])
	export default {
		name: 'ModuleVideo',
		components: {
			ModuleVideoMonitor,
			videoM3
		},
		setup(){
			let urls = ref([])
			let video = new Video()
			video.getRegions((regions) => {
				const regionIndexCode = "7cc1121b-9b6f-47f4-b76d-13883c37f2cd"
				video.getCameras((cameras) => {
					let dataList = cameras.data.list
					urls.value = dataList.filter((item) => Object.is(item.regionIndexCode, regionIndexCode))
					console.log(urls.value)
				})
			})
			// video.getPreviewURLs('36fd26f851ff4f97b09a73549ad78f29', (result) => {
				// console.log(result)
			// })
			onMounted(() => {
				const swiper = new Swiper('.swiper', {
					loop: false,
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
				urls
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../assets/css/public.less";
	.ModuleVideo{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: @module-content-mw;
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
</style>