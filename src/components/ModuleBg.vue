<!-- 模块背景 -->
<template>
	<div class="ModuleBg">
		<!-- 边角样式 -->
		<p class="edges top"></p>
		<p class="edges right"></p>
		<p class="edges bottom"></p>
		<p class="edges left"></p>
		<!-- 标题 -->
		<div class="title">
			<slot name="title"></slot>
		</div>
		<!-- 内容 -->
		<div class="main">
			<slot name="main"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ModuleBg'
	}
</script>

<style scoped>
	.ModuleBg{
		width: 100%;
		height: 100%;
		background: rgba(1,0,55,0.7);
		border: 3px solid rgba(71,136,255,0.5);
		border-radius: 4px;
		box-sizing: border-box;
		position: relative;
		box-shadow: inset 0px 0px 46px rgba(4, 142, 249, 0.2);
	}
	.edges{
		position: absolute;
		width: 28px;
		height: 28px;
	}
	.top{
		top: -3px;
		left: -3px;
		border-top: 3px solid #0BF1FF;
		border-left: 3px solid #0BF1FF;
		border-radius: 4px 0 0 0;
	}
	.right{
		top: -3px;
		right: -3px;
		border-top: 3px solid #0BF1FF;
		border-right: 3px solid #0BF1FF;
		border-radius: 0 4px 0 0;
	}
	.bottom{
		bottom: -3px;
		right: -3px;
		border-bottom: 3px solid #0BF1FF;
		border-right: 3px solid #0BF1FF;
		border-radius: 0 0 4px 0;
	}
	.left{
		bottom: -3px;
		left: -3px;
		border-bottom: 3px solid #0BF1FF;
		border-left: 3px solid #0BF1FF;
		border-radius: 0 0 0 4px;
	}
	.title{
		width: 62.5%;
		height: 142px;
		line-height: 180px;
		margin: 0 auto;
	}
	.main{
		height: calc(100% - 142px);
		overflow: hidden;
	}
	@media screen and (max-width: 1920px) {
		.ModuleBg{
			border-width: 1px;
			box-shadow: inset 0px 0px 23px rgba(4, 142, 249, 0.2);
		}
		.edges{
			width: 16px;
			height: 16px;
		}
		.top{
			top: -1px;
			left: -1px;
			border-width: 1px;
		}
		.right{
			top: -1px;
			right: -1px;
			border-width: 1px;
		}
		.bottom{
			bottom: -1px;
			right: -1px;
			border-width: 1px;
		}
		.left{
			bottom: -1px;
			left: -1px;
			border-width: 1px;
		}
		.title{
			height: 46px;
			line-height: 46px;
		}
		.main{
			height: calc(100% - 46px);
		}
	}
</style>