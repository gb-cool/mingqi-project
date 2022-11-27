<!-- 模块标题组件 -->
<template>
	<div class="ModuleTitle">
		{{title}}
	</div>
</template>

<script>
	export default {
		name:"ModuleTitle",
		props:['title']
	}
</script>

<style scoped>
	.ModuleTitle{
		width: 100%;
		height: 100%;
		margin: 0 auto;
		background: url('../assets/img/title-bg.png') no-repeat center center;
		background-size: 100% 100%;
		font-size: 1.385rem;
		font-family: Alibaba PuHuiTi;
		font-weight: bold;
		color: #FFFFFF;
		text-shadow: 0px 7px 5px rgba(0,0,0,0.48);
		text-align: center;
	}
</style>