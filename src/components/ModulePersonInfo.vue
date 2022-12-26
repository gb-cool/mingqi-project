<!-- 人员信息组件 -->
<template>
	<div class="ModulePersonInfo">
		<div class="photo">
			<img src="../assets/img/head-portrait.png"/>
		</div>
		<div class="info">
			<p>姓名:<span>{{name}}</span></p>
			<p>编号:<span>{{serial}}</span></p>
			<p>电量:<span>{{area}}</span></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ModulePersonInfo",
		props: ['name','serial', 'area']
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