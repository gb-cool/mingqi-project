<!-- 弹窗 -->
<template>
	<div class="PopupLayer">
			<div class="title">
				<span>{{title}}</span>
				<img src="../assets/img/close.png" @click="closeFun"/>
			</div>
			<div class="box">
				<div class="main">
					<!-- json数据格式类型显示 -->
					<div class="jsonBox" v-if="Object.is(type, 'json')" >
						<el-descriptions class="margin-top" title="" :column="1">
							<el-descriptions-item v-for="(item, key) of getInformation(information)" :label="getFiled(key)" :key="key">
								<span v-html="item"></span>
							</el-descriptions-item>
						</el-descriptions>
					</div>
					
					<div style="min-width: 900px;" v-if="Object.is(type, 'oxygen')">
						<!-- 氧浓度 -->
						<PopupDeviceView type="oxygen"/>
					</div>
					
					<div style="min-width: 900px;" v-if="Object.is(type, 'stive')">
						<!-- 粉尘浓度 -->
						<PopupDeviceView type="stive"/>
					</div>
					
					<div class="voidListBox" v-if="Object.is(type, 'videoList')">
						<!-- 视频列表 -->
						<PopupVideoView type="videoList"/>
					</div>
					
					<div class="voidMonitorBox" v-if="Object.is(type, 'video')">
						<ModuleVideoMonitorOther />
					</div>
				</div>
			</div>		
	</div>
</template>

<script>
	import { ref, onMounted, inject } from 'vue'
	import PopupDeviceView from './PopupDeviceView.vue'
	import PopupVideoView from './PopupVideoView.vue'
	import ModuleVideoMonitorOther from './ModuleVideoMonitorOther.vue'
	export default {
		name: 'PopupLayer',
		components: {
			PopupDeviceView,
			ModuleVideoMonitorOther,
			PopupVideoView
		},
		emits:["isShow"],
		props: ['title', 'fileds', 'information', 'type'],
		setup(props, context) {
			// console.log(props.type)
			let popupType = inject('popupType') // 弹窗内容类型
			// 获取表结构名称
			const getFiled = (key) => {
				if(props.fileds[key] == undefined){
					return key + "： "
				}
				return props.fileds[key] + "： "
			}
			function getInformation(information){
				let newData = {}
				for(let key in information){
					if(information[key] && !Object.is(information[key], "")){
						newData[key] = information[key]
					}
				}
				return newData
			}
			
			const getInfo = (item) => {
				return 
				console.log(item)
			}
			//关闭事件
			let isClose = false
			const closeFun = () => {
				if(isClose){
					return false
				}
				isClose = true
				if(props.type == "video"){
					// CacheData.video.otherOWebControl.JS_HideWnd()
					closeVideo()
				}else{
					context.emit('isShow', false)
					isClose = false
				}
			}
			function closeVideo(){
				if(CacheData.video.otherOWebControl == "开始创建"){
					setTimeout(() => {
						closeVideo()
					},100)
					return false
				}
				CacheData.video.otherOWebControl.JS_DestroyWnd().then(function(){ // oWebControl 为 WebControl 的对象
					console.log("成功")
					// 销毁插件窗口成功
					CacheData.video.otherOWebControl = null
					// CacheData.video.selectCameraData = null
					popupType.value = ""
				},function(){
					// 销毁插件窗口失败
					console.log("失败")
				});
				context.emit('isShow', false)
				isClose = false
			}
			return {
				getFiled,
				getInfo,
				closeFun,
				getInformation
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
		max-height: 80vh;
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
	@boxBoderWidth: 3px;
	@boxPadding: 20px;
	.box{
		box-sizing: border-box;
		border: @boxBoderWidth solid rgba(71,136,255,0.5);
		background: rgba(1,0,55,0.7);
		box-shadow: inset 0px 0px 46px rgb(4 142 249 / 20%);
		padding: @boxPadding;
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
	@videoPaddingRight: 20/1920*100vw;
	.PopupLayer.show.video{
		left: 25%;
		top: 50%;
		transform: translate(0, -50%);
		width: calc(25vw - @videoPaddingRight);
		min-width: 380px;
		max-width: calc(25vw/3*2);
	}
	.PopupLayer.show.video .main{
		min-width: auto;
	}
	.PopupLayer.show.videoControl{
		left: 50%;
		top: calc(33.33vh - @title-height);
		transform: translate(0, 0%);
		width: calc(25vw);
	}
	.PopupLayer.show.videoControl .main{
		min-width: auto;
		height: calc(33.33vh - 2*@boxBoderWidth - 2*@boxPadding);
	}
	
	.voidListBox{
		// min-width: 334px;
		// width: calc(25vw - @videoPaddingRight - 2*@boxBoderWidth - 2*@boxPadding);
		// max-width:calc(25vw/3*2 -  @videoPaddingRight - 2*@boxBoderWidth - 2*@boxPadding);
		width: 100%;
	}
	.voidMonitorBox{
		width: calc(25vw - 2*@boxPadding - 2*@boxBoderWidth);
	}
	
	@media screen and (max-width: 1920px) {
		@title-height: 34px;
		@boxBoderWidth: 1px;
		@videoPaddingRight: 20px;
		@boxPadding: 10px;
		.title{
			text-indent: 44px;
			border-width: 1px;
		}
		.box{
			border-width: @boxBoderWidth;
			padding: @boxPadding;
		}
		.PopupLayer.show.video{
			width: calc(25vw - @videoPaddingRight);
		}
		.PopupLayer.show.videoControl .main{
			height: calc(33.33vh - 2*@boxBoderWidth - 2*@boxPadding);
		}
		.voidListBox{
			// min-width: 334px;
			// width: calc(25vw - @videoPaddingRight - 2*@boxBoderWidth - 2*@boxPadding);
			// max-width:calc(25vw/3*2 - @videoPaddingRight - 2*@boxBoderWidth - 2*@boxPadding);
		}
		.voidMonitorBox{
			width: calc(25vw - 2*@boxPadding - 2*@boxBoderWidth);
		}
	}
</style>