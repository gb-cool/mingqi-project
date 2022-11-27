<template>
	<video ref="player" autoPlay="autoplay" loop muted controls style="object-fit: fill"></video>
</template>
<script>
	import Hls from 'hls.js' // npm install hls.js 

	export default {
		props: {
			url: ''
		},
		data() {
			return {
				player: null,
			}
		},
		beforeDestroy() {
			if (this.player) {
				this.player.stopLoad();
				this.player.destroy();
			}
			console.log(this.player)
		},
		methods: {
			initHlsVideo(url) {
				console.log(url)
				let el = this.$el;
				if (el && url) {
					if (!this.player) {
						this.player = new Hls();
						this.player.attachMedia(el)
						this.player.loadSource(url);
						this.player.on(Hls.Events.MANIFEST_PARSED, () => {
							el.play();
						});
						el.addEventListener("click", (event) => {
							// 阻止视频默认点击事件
							event.preventDefault();
						}, false);
						console.log(this.player)
					}
				}
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.initHlsVideo(this.url)
			})
		}
	}
</script>
<style lang="less" scoped>
	//播放按钮
	video::-webkit-media-controls-play-button {
		display: none;
	}

	//进度条
	video::-webkit-media-controls-timeline {
		display: none;
	}

	//观看的当前时间
	video::-webkit-media-controls-current-time-display {
		display: none;
	}

	//剩余时间
	video::-webkit-media-controls-time-remaining-display {
		display: none;
	}

	//音量按钮
	video::-webkit-media-controls-mute-button {
		display: none;
	}

	video::-webkit-media-controls-toggle-closed-captions-button {
		display: none;
	}

	//音量的控制条
	video::-webkit-media-controls-volume-slider {
		display: none;
	}
</style>
