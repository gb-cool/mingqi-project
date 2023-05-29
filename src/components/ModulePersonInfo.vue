<!-- 人员信息组件 -->
<template>
	<div class="ModulePersonInfo">
		<div class="photo" ref="photoDom" :style="squareStyle" @click="lookPosition">
			<img :src="setThumb"/>
		</div>
		<div class="info" @click="lookInfo">
			<p>姓名:<span>{{name}}</span></p>
			<p>编号:<span>{{serial}}</span></p>
			<p>电量:<span>{{area}}</span></p>
		</div>
	</div>
</template>

<script>
	import { ref, onMounted } from 'vue'
	import { JoySuch } from '../assets/js/positionPerson.js'
	export default {
		name: "ModulePersonInfo",
		props: ['thumb', 'name','serial', 'area', 'personData'],
		setup(props, ctx) {
			const lookPosition = () => {
				ctx.emit('lookPosition', props.personData)
			}
			const lookInfo = () => {
				ctx.emit('lookInfo', props.personData)
			}
			let src = require('../assets/img/head-portrait.png')
			const setThumb = ref(src)
			
			const joySuch = new JoySuch()
			const getData = joySuch.getToken(() => {
				joySuch.getImageView(props.thumb, (res) => {
					let blob = new Blob([res.data], { type: 'image/jpeg' })
					setThumb.value = window.URL.createObjectURL(blob)
				})
			})
			const photoDom = ref();
			const squareStyle = ref({
			  maxWidth: '58px'
			})
			onMounted(()=>{
				squareStyle.value.maxWidth = photoDom.value.offsetHeight + "px"
			})
			
			return{
				lookPosition,
				lookInfo,
				setThumb,
				photoDom,
				squareStyle
			}
		}
	}
</script>

<style scoped>
	.ModulePersonInfo{
		margin: 0 0.5rem 0 0;
		height: 100%;
		position: relative;
	}
	.photo{
		float: left;
		width: auto;
		height: 100%;
		background-color: #fff;
	}
	.photo img{
		width: 100%;
		height: 100%;
	}
	.info{
		height: 100%;
		font-family: 'Alibaba-PuHuiTi-R';
	}
	.info p{
		color:  #92A6CB;
		white-space: nowrap;
		text-indent: 0.9rem;
		height: 33.3%;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: calc(20/1080*100vh);
	}
	.info p span{
		color: #fff;
		margin-left: 0.7rem;
	}
</style>