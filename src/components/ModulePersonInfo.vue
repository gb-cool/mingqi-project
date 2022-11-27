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
		width: 220px;
		height: 100%;
		background-color: #fff;
	}
	.photo img{
		width: 100%;
		height: 100%;
	}
	.info{
		margin: 0 0 0 220px;
		height: 100%;
		font-family: 'Alibaba-PuHuiTi-R';
	}
	.info p{
		color:  #92A6CB;
		line-height: 1.85rem;
		white-space: nowrap;
		text-indent: 0.9rem;
		height: 33.3%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.info p span{
		color: #fff;
		margin-left: 0.7rem;
	}
	@media screen and (max-width: 1920px) {
		.photo{
			width: 60px;
		}
		.info{
			margin-left: 60px;
		}
		.info p{
			line-height: 1.2rem;
			font-size: 14px;
			text-indent: 8px;
		}
		.info p span{
			margin-left: 4px;
		}
	}
</style>