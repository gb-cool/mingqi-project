<!-- 视频监控 -->
<template>
	<div class="ModuleVideoMonitor">
		<div id="playWnd" ref="playWnd" class="playWnd"></div>
	</div>
</template>

<script>
	import { ref, inject, onBeforeUnmount, watch, onMounted } from 'vue'
	export default {
		name: 'ModuleVideoMonitor',
		props: ['list'],
		setup(props) {
			let _width = 354
			let _height = 230
			// 创建播放实例
			let initCount = 0
			let pubKey = ''
			let oWebControl = null
			let playWnd = ref()
			
			function initPlugin () {
			    oWebControl = new WebControl({
			        szPluginContainer: "playWnd",                       // 指定容器id
					iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
					iServicePortEnd: 15909,                             
					szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
					cbConnectSuccess: function () {                     // 创建WebControl实例成功			
						oWebControl.JS_StartService("window", {         // WebControl实例创建成功后需要启动服务
							dllPath: "./VideoPluginConnect.dll"         // 值"./VideoPluginConnect.dll"写死 
						}).then(function () {                           // 启动插件服务成功
							oWebControl.JS_SetWindowControlCallback({   // 设置消息回调
								cbIntegrationCallBack: cbIntegrationCallBack
							});
							
							oWebControl.JS_CreateWnd("playWnd", _width, _height).then(function () { //JS_CreateWnd创建视频播放窗口，宽高可设定
								init();  // 创建播放实例成功后初始化
							});
						}, function (e) { // 启动插件服务失败
							console.log(e)
						});
					},
					cbConnectError: function () { // 创建WebControl实例失败
						oWebControl = null;
						console.log("插件未启动，正在尝试启动，请稍候...")
						// $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
						WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
						initCount ++;
						if (initCount < 3) {                             
							setTimeout(function () {
								initPlugin();
							}, 3000)
						} else {
							console.log("插件启动失败，请检查插件是否安装！")
							playWnd.value.innerHTML = "插件启动失败，请检查插件是否安装，未安装请下载插件，然后双击运行！<a style='color:rgb(255, 163, 0)' href='./bin/VideoWebPlugin.exe'>下载插件</a>"
						}
					},
					cbConnectClose: function (bNormalClose) {            
						// 异常断开：bNormalClose = false
						// JS_Disconnect正常断开：bNormalClose = true	
						console.log("cbConnectClose");
						oWebControl = null;
					}
				});
			}
			// 设置窗口控制回调
			function setCallbacks() {
			    oWebControl.JS_SetWindowControlCallback({
			        cbIntegrationCallBack: cbIntegrationCallBack
			    });
			}
			
			// 推送消息
			function cbIntegrationCallBack(oData) {
				// console.log(oData)
			    // showCBInfo(JSON.stringify(oData.responseMsg));
			}
			//初始化
			function init()
			{
			    getPubKey(function () {
					
					////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////		
			        var appkey = "24445827";                           //综合安防管理平台提供的appkey，必填
			        var secret = setEncrypt("bpZcS82j1mfV3sdSsN8G");   //综合安防管理平台提供的secret，必填
			        var ip = "10.12.108.10";                           //综合安防管理平台IP地址，必填
			        var playMode = 0;                                  //初始播放模式：0-预览，1-回放
			        var port = 443;                                    //综合安防管理平台端口，若启用HTTPS协议，默认443
			        var snapDir = "D:\\SnapDir";                       //抓图存储路径
			        var videoDir = "D:\\VideoDir";                     //紧急录像或录像剪辑存储路径
			        var layout = "3x3";                                //playMode指定模式的布局
			        var enableHTTPS = 1;                               //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
			        var encryptedFields = 'secret';					   //加密字段，默认加密领域为secret
					var showToolbar = 1;                               //是否显示工具栏，0-不显示，非0-显示
					var showSmart = 1;                                 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
					var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
					////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////
			
			        oWebControl.JS_RequestInterface({
			            funcName: "init",
			            argument: JSON.stringify({
			                appkey: appkey,                            //API网关提供的appkey
			                secret: secret,                            //API网关提供的secret
			                ip: ip,                                    //API网关IP地址
			                playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
			                port: port,                                //端口
			                snapDir: snapDir,                          //抓图存储路径
			                videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
			                layout: layout,                            //布局
			                enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
			                encryptedFields: encryptedFields,          //加密字段
							showToolbar: showToolbar,                  //是否显示工具栏
							showSmart: showSmart,                      //是否显示智能信息
							buttonIDs: buttonIDs                       //自定义工具条按钮
			            })
			        }).then(function (oData) {
						oWebControl.JS_Resize(_width, _height);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
						// props.list.forEach((item) => {
						// 	startPreview(item.cameraIndexCode)
						// })
						startMultiPreviewByCameraIndexCode()
						oWebControl.JS_RequestInterface({
							funcName: "setLayout",
							argument: {
								layout: "2x2" // 窗口布局
							}
						})
						setTimeout(() => {
							oWebControl.JS_RequestInterface({
								funcName: "setLayout",
								argument: {
									layout: "1x1" // 窗口布局
								}
							})
						}, 1000 * 60)
			        });
			    });
			}
			//获取公钥
			function getPubKey (callback) {
			    oWebControl.JS_RequestInterface({
			        funcName: "getRSAPubKey",
			        argument: JSON.stringify({
			            keyLength: 1024
			        })
			    }).then(function (oData) {
			        if (oData.responseMsg.data) {
			            pubKey = oData.responseMsg.data;
			            callback()
			        }
			    })
			}
			
			//RSA加密
			function setEncrypt (value) {
			    var encrypt = new JSEncrypt();
			    encrypt.setPublicKey(pubKey);
			    return encrypt.encrypt(value);
			}
			const calculate = () => {
				setTimeout(() => {
					_height = playWnd.value.offsetHeight
					_width = playWnd.value.offsetWidth
					if (oWebControl != null) {
					    oWebControl.JS_Resize(_width, _height);
					    setWndCover();
					}
				},3000)
			}		
			onMounted(()=>{
				_width = playWnd.value.offsetWidth
				_height = playWnd.value.offsetHeight
				initPlugin()
				window.addEventListener('scroll', calculate, true);	// 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
				window.addEventListener('resize', calculate);	//监听resize事件，使插件窗口尺寸跟随DIV窗口变化
			})
			onBeforeUnmount(() => { 
				window.removeEventListener('scroll', calculate, true);  
				window.removeEventListener('resize', calculate);
			});
			const isShow = ref(true)	// 是否显示
			isShow.value = inject('isShow')
			watch(isShow.value, () => {
				if(isShow.value.value){
					oWebControl.JS_ShowWnd()
				}else{
					oWebControl.JS_HideWnd()
				}
			})
			
			// 锁定窗口
			let lockIndex = 0
			function lockWnd(){
				if(lockIndex >= props.list.length){
					lockIndex = 0
				}
				oWebControl.JS_RequestInterface({
					funcName: "getLayout"
				}).then(function (oData) {
					if (oData.responseMsg.data) {
						if(JSON.parse(oData.responseMsg.data).wndNum == 1){
							startPreview(props.list[lockIndex].cameraIndexCode)
							lockIndex++
						}
					}
				})
			}
			setInterval(() => {
				lockWnd()
			}, 1000 * 60)
			
			// 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
			function setWndCover() {
			    var iWidth = window.innerWidth;
			    var iHeight = window.innerHeight;
			    var oDivRect = playWnd.value.getBoundingClientRect();
			
			    var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
			    var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
			    var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
			    var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;
			
			    iCoverLeft = (iCoverLeft > _width) ? _width : iCoverLeft;
			    iCoverTop = (iCoverTop > _height) ? _height : iCoverTop;
			    iCoverRight = (iCoverRight > _width) ? _width : iCoverRight;
			    iCoverBottom = (iCoverBottom > _height) ? _height : iCoverBottom;
			
				oWebControl.JS_RepairPartWindow(0, 0, _width + 1, _height);    // 多1个像素点防止还原后边界缺失一个像素条
			    if (iCoverLeft != 0) {
					oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, _height);
			    }
			    if (iCoverTop != 0) {
			        oWebControl.JS_CuttingPartWindow(0, 0, _width + 1, iCoverTop);    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
			    }
			    if (iCoverRight != 0) {
			        oWebControl.JS_CuttingPartWindow(_width - iCoverRight, 0, iCoverRight, _height);
			    }
			    if (iCoverBottom != 0) {
			        oWebControl.JS_CuttingPartWindow(0, _height - iCoverBottom, _width, iCoverBottom);
			    }
			}
			//视频预览功能
			function startPreview(cameraIndexCode){
				// var cameraIndexCode  = cameraIndexCode;     //获取输入的监控点编号值，必填
				var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
				var transMode = 1;                                      //传输协议：0-UDP，1-TCP
				var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
				var wndId = -1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）
							
				cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
				cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
							
				oWebControl.JS_RequestInterface({
				    funcName: "startPreview",
				    argument: JSON.stringify({
				        cameraIndexCode:cameraIndexCode,                //监控点编号
				        // streamMode: streamMode,                         //主子码流标识
				        // transMode: transMode,                           //传输协议
				        // gpuMode: gpuMode,                               //是否开启GPU硬解
				        // wndId:wndId                                     //可指定播放窗口
				    })
				}).then(function (oData) {
					console.log(oData)
				})
			}
			// 根据监控点编号批量视频预览
			function startMultiPreviewByCameraIndexCode(){
				let list = []
				const streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
				const transMode = 1;                                      //传输协议：0-UDP，1-TCP
				const gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
				let wndId = 0;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）
				props.list.forEach((item) => {
					wndId++
					let cameraIndexCode = item.cameraIndexCode
					cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
					cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
					list.push({
						cameraIndexCode: cameraIndexCode,
						ezvizDirect: 0,
						gpuMode: gpuMode,
						streamMode: streamMode,
						transMode: transMode,
						wndId: wndId
					})
				})
				oWebControl.JS_RequestInterface({
				    funcName: "startMultiPreviewByCameraIndexCode",
					argument: {
						list: list
					}
				}).then(function (oData) {
					// console.log(oData)
				})
			}
			
			//停止全部预览
			const stopAllPreview = () => {
				oWebControl.JS_RequestInterface({
				    funcName: "stopAllPreview"
				})
			}
			// 标签关闭
			/* $(window).unload(function () {
			    if (oWebControl != null){
					oWebControl.JS_HideWnd();   // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题 
			        oWebControl.JS_Disconnect().then(function(){  // 断开与插件服务连接成功
					}, 
					function() {  // 断开与插件服务连接失败
					});
			    }
			}); */
			
			return {
				startPreview,
				stopAllPreview,
				playWnd
			}
		}
	}
</script>

<style scoped>
	.ModuleVideoMonitor, video{
		width: 100%;
		height: 100%;
	}
	/* video{
		object-fit: fill;
	} */
	.playWnd{
		/* width: 354px; */              
		height: 100%;
	}
</style>