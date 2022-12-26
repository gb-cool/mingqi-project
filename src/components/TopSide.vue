<template>
	<div class="TopSide">
		<div class="hideShow" @click="togger">
			<img v-if="isShow" src="../assets/img/head-hide.png"/>
			<img v-if="!isShow" src="../assets/img/head-show.png"/>
		</div>
	</div>
</template>

<script>
	import { inject, ref } from 'vue';
	export default {
		name: 'TopSide',
		setup() {
			const isShow = ref(inject('isShow'))	// 是否显示
			const staus = ref(isShow.value)
			const togger = () => {
				isShow.value = !isShow.value
			}
			return {
				togger,
				isShow
			}
		}
	}
</script>

<style scoped>
	.TopSide {
		height: 100%;
		padding-top: 5px;
		box-sizing: border-box;
	}
	.hideShow{
		width: calc(48/1920*100vw);
		height: 50%;
		border-radius: 0 calc(48/1920*100vw) calc(48/1920*100vw) 0;
		background: #048EF9;
		cursor: pointer;
		min-width: 48px;
		position: relative;
	}
	.hideShow img{
		display: block;
		position: absolute;
		height: 60%;
		top: 20%;
		left: 50%;
		transform: translate(-70%, 0%);
	}
</style>