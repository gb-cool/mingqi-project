<!-- 弹窗 -->
<template>
	<div class="PopupLayer">
			<div class="title">
				<span>{{title}}</span>
				<img src="../assets/img/close.png" @click="$emit('isShow', false)"/>
			</div>
			<div class="box">
				<div class="main">
					<el-descriptions class="margin-top" title="" :column="1">
						<el-descriptions-item v-for="(item, key) of information" :label="getFiled(key)" :key="key">
							{{item}}
						</el-descriptions-item>
						<el-descriptions-item v-for="(item, key) of information" :label="getFiled(key)" :key="key">
							{{item}}
						</el-descriptions-item>
					</el-descriptions>
				</div>
			</div>		
	</div>
</template>

<script>
	import { ref, onMounted } from 'vue'
	export default {
		name: 'PopupLayer',
		props: ['title', 'fileds', 'information'],
		setup(props, context) {
			// console.log(props)
			// 获取表结构名称
			const getFiled = (key) => {
				return props.fileds[key] + "："
			}
			//关闭事件
			return {
				getFiled
			}
		}
	}
</script>

<style lang="less" scoped>
	.PopupLayer{
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 3;
		overflow: hidden;
		transform: translate(-50%, -50%);
		transition: 1s;
	}
	.PopupLayer.hide{
		top: 100%;
		transform: translate(-50%, 0);
	}
	.PopupLayer.show{
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.title{
		height: 106px;
		line-height: 110px;
		text-indent: 110px;
		font-family: Microsoft YaHei;
		background: url('../assets/img/popup-title-bg.png') no-repeat left center, url('../assets/img/popup-title-bg2.png') no-repeat right -1px center, url('../assets/img/popup-title-bg1.png') repeat left top -1px;
		background-size: auto 100%;
		position: relative;
		top: 1px;
	}
	.title img{
		float: right;
		margin: 46px;
		cursor: pointer;
	}
	.box{
		box-sizing: border-box;
		padding: 100px 0px;
		border: 3px solid rgba(71,136,255,0.5);
		background: rgba(1,0,55,0.7);
		box-shadow: inset 0px 0px 46px rgb(4 142 249 / 20%);
	}
	.main{
		overflow: auto;
		max-height: calc(80vh - 106px);
		height: auto;
		width: auto;
		min-width: 540px;
	}
	
	
	@media screen and (max-width: 1920px) {
		.title{
			height: 34px;
			line-height: 34px;
			text-indent: 44px;
			border-width: 1px;
		}
		.box{
			padding: 20px 0px;
			border-width: 1px;
		}
		.main{
			max-height: calc(80vh - 42px);
		}
		.title img{
			width: 14px;
			margin: 13px;
		}
	}
</style>