<!-- 视频监控 -->
<template>
	<div class="ModuleVideoMonitor">
		<video name="media" @click="playPause" ref="domVideo">
			<source src="../assets/video/video2.mp4" type="video/mp4">
		</video>
	</div>
</template>

<script>
	import { ref } from 'vue'
	export default {
		name: 'ModuleVideoMonitor',
		setup() {
			const domVideo = ref()
			function playPause(){
				if (domVideo.value.paused) 
					domVideo.value.play() 
				else 
					domVideo.value.pause()
			} 
			return {
				domVideo,
				playPause
			}
		}
	}
</script>

<style scoped>
	.ModuleVideoMonitor, video{
		width: 100%;
		height: 100%;
	}
	video{
		object-fit: fill;
	}
</style>