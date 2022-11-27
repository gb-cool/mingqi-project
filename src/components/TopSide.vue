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
		width: 108px;
		height: 88px;
		border-radius: 0 88px 88px 0;
		background: #048EF9;
		cursor: pointer;
	}
	.hideShow img{
		display: block;
		position: relative;
		top: 24px;
		left: 22px;
	}
	@media screen and (max-width: 1920px) {
		.TopSide{
			padding-top: 2px;
		}
		.hideShow{
			width: 48px;
			height: 30px;
			border-radius: 0 54px 54px 0;
		}
		.hideShow img{
			top: 6px;
			left: 11px;
			height: 18px;
		}
	}
</style>