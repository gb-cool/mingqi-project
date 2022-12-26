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

<style scoped lang="less">
	@title-height: ~"calc(46 / 1080 * 100vh)";
	@edges-border-width: 3px;
	@edges-wh: ~"calc(16 / 1080 * 100vh)";
	@border-radius: 4px;
	.ModuleBg{
		width: 100%;
		height: 100%;
		background: rgba(1,0,55,0.7);
		border: 3px solid rgba(71,136,255,0.5);
		border-radius: @border-radius;
		box-sizing: border-box;
		position: relative;
		box-shadow: inset 0px 0px 46px rgba(4, 142, 249, 0.2);
	}
	.edges{
		position: absolute;
		width: @edges-wh;
		height: @edges-wh;
	}
	.top{
		top: -@edges-border-width;
		left: -@edges-border-width;
		border-top: @edges-border-width solid #0BF1FF;
		border-left: @edges-border-width solid #0BF1FF;
		border-radius: @border-radius 0 0 0;
	}
	.right{
		top: -@edges-border-width;
		right: -@edges-border-width;
		border-top: @edges-border-width solid #0BF1FF;
		border-right: @edges-border-width solid #0BF1FF;
		border-radius: 0 @border-radius 0 0;
	}
	.bottom{
		bottom: -@edges-border-width;
		right: -@edges-border-width;
		border-bottom: @edges-border-width solid #0BF1FF;
		border-right: @edges-border-width solid #0BF1FF;
		border-radius: 0 0 @border-radius 0;
	}
	.left{
		bottom: -@edges-border-width;
		left: -@edges-border-width;
		border-bottom: @edges-border-width solid #0BF1FF;
		border-left: @edges-border-width solid #0BF1FF;
		border-radius: 0 0 0 @border-radius;
	}
	.title{
		width: 62.5%;
		height: @title-height;
		line-height: @title-height;
		margin: 0 auto;
	}
	.main{
		height: calc(100% - @title-height);
		overflow: hidden;
	}
	@media screen and (max-width: 1920px) {
		@edges-border-width: 1px;
		.ModuleBg{
			border-width: @edges-border-width;
			box-shadow: inset 0px 0px 23px rgba(4, 142, 249, 0.2);
		}
		.top{
			top: -@edges-border-width;
			left: -@edges-border-width;
			border-width: @edges-border-width;
		}
		.right{
			top: -@edges-border-width;
			right: -@edges-border-width;
			border-width: @edges-border-width;
		}
		.bottom{
			bottom: -@edges-border-width;
			right: -@edges-border-width;
			border-width: @edges-border-width;
		}
		.left{
			bottom: -@edges-border-width;
			left: -@edges-border-width;
			border-width: @edges-border-width;
		}
	}
</style>