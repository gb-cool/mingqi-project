<!-- 弹窗 -->
<template>
	<div class="PopupLayer">
			<div class="title">
				<span>{{title}}</span>
				<img src="../assets/img/close.png" @click="$emit('isShow', false)"/>
			</div>
			<div class="box">
				<div class="main">
					<!-- json数据格式类型显示 -->
					<div class="jsonBox" v-if="Object.is(type, 'json')" >
						<el-descriptions class="margin-top" title="" :column="1">
							<el-descriptions-item v-for="(item, key) of information" :label="getFiled(key)" :key="key">
								<span v-html="item"></span>
							</el-descriptions-item>
						</el-descriptions>
					</div>
					
					<div style="min-width: 1200px;" v-if="Object.is(type, 'oxygen')">
						<!-- 氧浓度 -->
						<PopupDeviceView type="oxygen"/>
					</div>
					
					<div style="min-width: 1200px;" v-if="Object.is(type, 'stive')">
						<!-- 粉尘浓度 -->
						<PopupDeviceView type="stive"/>
					</div>
					
				</div>
			</div>		
	</div>
</template>

<script>
	import { ref, onMounted } from 'vue'
	import PopupDeviceView from './PopupDeviceView.vue'
	export default {
		name: 'PopupLayer',
		components: {
			PopupDeviceView
		},
		props: ['title', 'fileds', 'information', 'type'],
		setup(props, context) {
			// console.log(props.type)
			// 获取表结构名称
			const getFiled = (key) => {
				if(props.fileds[key] == undefined){
					return key + "： "
				}
				return props.fileds[key] + "： "
			}
			
			const getInfo = (item) => {
				return 
				console.log(item)
			}
			//关闭事件
			return {
				getFiled,
				getInfo
			}
		}
	}
</script>

<style lang="less" scoped>
	@title-height: ~"calc(44 / 1080 * 100vh)";
	.PopupLayer{
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 3;
		overflow: hidden;
		transform: translate(-50%, -50%);
		transition: 1s;
		max-width: calc(100vw*0.8);
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
		height: @title-height;
		line-height: @title-height;
		text-indent: @title-height;
		font-family: Microsoft YaHei;
		background: url('../assets/img/popup-title-bg.png') no-repeat left center, url('../assets/img/popup-title-bg2.png') no-repeat right -1px center, url('../assets/img/popup-title-bg1.png') repeat left top -1px;
		background-size: auto 100%;
		position: relative;
		top: 1px;
	}
	.title img{
		cursor: pointer;
		position: absolute;
		top: 40%;
		height: 40%;
		right: 20px;
	}
	.box{
		box-sizing: border-box;
		border: 3px solid rgba(71,136,255,0.5);
		background: rgba(1,0,55,0.7);
		box-shadow: inset 0px 0px 46px rgb(4 142 249 / 20%);
		padding: 20px;
	}
	.main{
		overflow: auto;
		max-height: calc(80vh - @title-height);
		height: auto;
		width: 100%;
		min-width: calc(540/1920*100vw);
	}
	.jsonBox{
		padding: calc(20/1080*100vh) 0px;
	}
	
	@media screen and (max-width: 1920px) {
		.title{
			height: 34px;
			line-height: 34px;
			text-indent: 44px;
			border-width: 1px;
		}
		.box{
			border-width: 1px;
		}
	}
</style>