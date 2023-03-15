<!-- 视频监控 -->
<template>
	<div class="ModuleVideoMonitor">
		<div id="playWnd" ref="playWnd" class="playWnd"></div>
	</div>
</template>
<script>
	import { ref, inject, onBeforeUnmount, watch, onMounted } from 'vue'
	import { focusCameraImport_3d, intoRoom, outWallSetOpacity } from "../3d/index";
	export default {
		name: 'ModuleVideoMonitor',
		props: ['list'],
		setup(props) {
			let _width = 354
			let _height = 230
			let playWnd = ref()
			CacheData.video.oWebControl = null
			
			// 插件对象实例，初始化为null，需要创建多个插件窗口时，需要定义多个插件对象实例变量，各个变量唯一标志对应的插件实例
			var oWebControl = null;
			var bIE = (!!window.ActiveXObject || 'ActiveXObject' in window);// 是否为IE浏览器
			var pubKey = '';                  // demo中未使用加密，可根据需求参照开发指南自行使用加密功能
			var initCount = 0;                // 异常重启计数
			var iframePos = {};               // iframe相对文档的位置
			var parentTitle = '';	          // 父页面标题
			var iframeClientPos = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			};       // iframe相对视窗的位置
			var iframeParentShowSize = {
				winth: window.innerWidth,
				height: window.innerHeight
			};  // 视窗大小 width height  	
			// 标签关闭
			window.addEventListener("scroll", function() {
				if (oWebControl != null){
					oWebControl.JS_HideWnd();  // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
					oWebControl.JS_Disconnect().then(function(){}, function() {});
				}
			})
			// 步骤1：监听父页面的消息
			window.addEventListener('message', function(e){
				if(e && e.data){
					switch (e.data.action){
						case 'sendTitle':              // 父页面将其标题发送过来，子页面保存该标题，以便创建插件窗口成功后将标题设置回给父页面
							parentTitle = e.data.info;
							break;
						case 'updatePos':              // 更新插件位置：JS_CreateWnd时需要父页面计算滚动条偏移量，初始偏移量叠加该偏移量作为iframe的偏移量，防止插件窗口与DIV窗口初始不贴合情况
							var scrollValue = e.data.scrollValue;     // 滚动条滚动偏移量
							setDocOffset()
							oWebControl.JS_Resize(_width, _height);
							setWndCover();	
							break;
						case 'updateInitParam':
							iframePos = e.data.iframeOffset;             // iframe与文档的偏移量
							iframeClientPos = e.data.iframeClientPos;    // iframe相对视窗的位置
							iframeParentShowSize = e.data.showSize;      // 视窗大小
							CacheData.video.iframePos = iframePos
							CacheData.video.iframeClientPos = iframeClientPos
							break;
						case 'resize':
							iframeParentShowSize = e.data.showSize;    // 视窗大小
							iframePos = e.data.iframeOffset;           // iframe与文档的偏移量
							iframeClientPos = e.data.iframeClientPos;  // iframe相对视窗的位置
							CacheData.video.iframePos = iframePos
							CacheData.video.iframeClientPos = iframeClientPos
							setDocOffset()
							oWebControl.JS_Resize(_width, _height);
							setWndCover();												
							break;
						case 'scroll':
							iframeParentShowSize = e.data.showSize;   // 视窗大小
							iframePos = e.data.iframeOffset;          // iframe与文档的偏移量
							iframeClientPos = e.data.iframeClientPos; // iframe相对视窗的位置	
							CacheData.video.iframePos = iframePos
							CacheData.video.iframeClientPos = iframeClientPos
							if(oWebControl){
								setDocOffset()
								oWebControl.JS_Resize(_width, _height);
								setWndCover();					
							}
							break;
						default:
							break;
					}
				}
			});
			/**
			 * 设置控件位置
			 */
			function setDocOffset(){
				if(CacheData.video.iframePos.left){
					oWebControl.JS_SetDocOffset({
						left: CacheData.video.iframePos.left,
						top: CacheData.video.iframePos.top
					});  // 更新插件窗口位置
				}
			}
			
			// 顶部：iframe.getBoundingClientRect().top小于0并且其绝对值超过DIV.get(0).getBoundingClientRect().top部分需要剪切
			// 底部：(iframe.getBoundingClientRect().bottom - iframe父窗口可视域高度，为H1)为不可见部分
			//       ($(window).height() - DIV.get(0).getBoundingClientRect().bottom)
			//        为DIV底部与其所在iframe底部之间的距离H2，H1-H2的值大于0则表示DIV有部分在不可见区域
			// 左边：iframe.getBoundingClientRect().left小于0并且其绝对值超过DIV.get(0).getBoundingClientRect().left部分需要剪切
			// 右边：(iframe宽度 - DIV.get(0).getBoundingClientRect().right表示DIV右边与其父iframe右边之间的距离，为W1)
			//       (iframe父窗口可视域宽度-iframe.getBoundingClientRect().left表示iframe左边与iframe父窗口可视域右边之间的距离，为W2)
			//       (iframe宽度 - W2 - W1)如果大于0，则表示DIV右边超出了iframe父窗口可视域，需要剪切超过的部分
			function setWndCover() {
				if (oWebControl){
					// 准备要用到的一些数据
					var iframeWndHeight = $(window).height();  // iframe窗口高度
					var iframeWndWidth = $(window).width();    // iframe窗口宽度
					let oDivRect = $("#playWnd").get(0).getBoundingClientRect()
					var divLeft = oDivRect.left;      
					var divTop = oDivRect.top;
					var divRight = oDivRect.right;
					var divBottom = oDivRect.bottom;
					var divWidth = $("#playWnd").width();
					var divHeight = $("#playWnd").height();		
					
					oWebControl.JS_RepairPartWindow(0, 0, _width + 1, _height + 1);  // 多1个像素点防止还原后边界缺失一个像素条
				
					// 判断剪切矩形的上边距        
					if (iframeClientPos.top < 0 && Math.abs(iframeClientPos.top) > divTop){
						var deltaTop = Math.abs(iframeClientPos.top) - divTop;
						oWebControl.JS_CuttingPartWindow(0, 0, _width + 1, deltaTop + 1);
						//console.log({deltaTop: deltaTop});
					}
					
					// 判断剪切矩形的左边距
					if (iframeClientPos.left < 0 && Math.abs(iframeClientPos.left) > divLeft){
						var deltaLeft = Math.abs(iframeClientPos.left) - divLeft;
						//console.log({deltaLeft: deltaLeft});
						oWebControl.JS_CuttingPartWindow(0, 0, deltaLeft, _height + 1);  // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
					}
					
					// 判断剪切矩形的右边距
					var W1 = iframeWndWidth - divRight;
					var W2 = iframeParentShowSize.width - iframeClientPos.left;	
					if (W2 < divWidth){
						var deltaRight = iframeWndWidth - W2 - W1;				
						if (deltaRight > 0) {			
							oWebControl.JS_CuttingPartWindow(_width - deltaRight, 0, deltaRight + 1, _height + 1);
						}
					}		
					
					// 判断剪切矩形的下边距
					var H1 = iframeClientPos.bottom - iframeParentShowSize.height;
					var H2 = iframeWndHeight - divBottom;
					var deltaBottom = H1 - H2;  
					//console.log({deltaBottom: deltaBottom});		
					if (deltaBottom > 0) {
						oWebControl.JS_CuttingPartWindow(0, _height - deltaBottom, _width + 1, deltaBottom + 1);
					}
				}		
			}
			// 创建插件实例，并启动本地服务建立websocket连接，创建插件窗口
			function initPlugin () {
				oWebControl = new WebControl({
					szPluginContainer: "playWnd",
					iServicePortStart: 15900,
					iServicePortEnd: 15909,
					szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
					cbConnectSuccess: function () {
						initCount = 0;
						setCallbacks();			
						oWebControl.JS_StartService("window", {
							dllPath: "./VideoPluginConnect.dll"
						}).then(function () {
							// 步骤2：JS_CreateWnd时指定cbSetDocTitle回调，并在回调中向父页面发送更新标题消息，标题为回调出来的uuid
							oWebControl.JS_CreateWnd("playWnd", _width, _height, {
							    bEmbed: true,
								cbSetDocTitle: function (uuid) {
								  oWebControl._pendBg = false;
								  window.parent.postMessage({
									  action:'updateTitle',
									  msg:'子页面通知父页面修改title',
									  info:uuid
									}, '\*');    // '\*'表示跨域参数，请结合自身业务合理设置
								}
							}).then(function () {
								// 步骤3：JS_CreateWnd成功后通知父页面将其标题修改回去
								console.log("JS_CreateWnd success");
								// 步骤4：发消息更新插件窗口位置：这里不直接更新的原因是，父页面默认可能就存在滚动条，此时有滚动量
								window.parent.postMessage({
									  action:'updatePos',
									  msg:'更新Pos'
									}, '\*');
								init();
							});
						}, function () {
							console.log("JS_CreateWnd fail");				
						});
					},
					cbConnectError: function () {
						console.log("cbConnectError");
						oWebControl = null;
						// $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
						WebControl.JS_WakeUp("VideoWebPlugin://");
						initCount ++;
						if (initCount < 3) {
							setTimeout(function () {
								initPlugin();
							}, 3000)
						} else {
							playWnd.value.innerHTML = "插件启动失败，请检查插件是否安装，未安装请下载插件，然后双击运行！<a style='color:rgb(255, 163, 0)' href='./bin/VideoWebPlugin.exe'>下载插件</a>"
						}
					},
					cbConnectClose: function (bNormalClose) {
						// 异常断开：bNormalClose = false
						// JS_Disconnect正常断开：bNormalClose = true
						if (true == bNormalClose){
							console.log("cbConnectClose normal");
						}else{
							console.log("cbConnectClose exception");
						}
						
						oWebControl = null;
					}
				});
				CacheData.video.oWebControl = oWebControl	// 缓存视频控件
			}
			const calculate = () => {
				setTimeout(() => {
					_height = playWnd.value.offsetHeight
					_width = playWnd.value.offsetWidth
					if (oWebControl != null) {
						setDocOffset()
					    oWebControl.JS_Resize(_width, _height);
					    setWndCover()
					}
				},3000)
			}		
			onMounted(()=>{
				_width = playWnd.value.offsetWidth
				_height = playWnd.value.offsetHeight
				setTimeout(()=>{
					initPlugin()
				},500)
				window.addEventListener('scroll', calculate, true);	// 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
				window.addEventListener('resize', calculate);	//监听resize事件，使插件窗口尺寸跟随DIV窗口变化
			})
			
			// 获取公钥
			function getPubKey (callback) {
			    oWebControl.JS_RequestInterface({
			        funcName: "getRSAPubKey",
			        argument: JSON.stringify({
			            keyLength: 1024
			        })
			    }).then(function (oData) {
			        if (oData.responseMsg.data) {
			            pubKey = oData.responseMsg.data
			            callback()
			        }
			    })
			}
			
			// 设置窗口控制回调
			function setCallbacks() {
			    oWebControl.JS_SetWindowControlCallback({
			        cbIntegrationCallBack: cbIntegrationCallBack
			    });
			}
			
			const threeDModuleOpacity = inject('threeDModuleOpacity') // 三维模型不透明度 0-1
			// 推送消息
			function cbIntegrationCallBack(oData) {
				let responseMsg = oData.responseMsg
				let type = responseMsg.type
				if(type == 1){
					let cameraIndexCode = responseMsg.msg.cameraIndexCode
					if(cameraIndexCode != ""){
						let cameraItem = CacheData.video.listData.filter((item) => Object.is(item.cameraIndexCode, cameraIndexCode))[0]
						let cameraName = cameraItem.cameraName
						if(threeDModuleOpacity.value > 0.2){
							threeDModuleOpacity.value = 0.2
						}
						if(cameraName.includes('均化')){
							intoRoom(1)
							outWallSetOpacity(threeDModuleOpacity.value)
						}else if(cameraName.includes('立磨')){
							intoRoom(2)
							outWallSetOpacity(threeDModuleOpacity.value)
						}
						// 摄像头聚焦
						focusCameraImport_3d(cameraIndexCode, 2000, () => {
							/* oWebControl.JS_RequestInterface({
								funcName: "setFullScreen"
							}).then(function (e) {
								console.log(e)
							}) */
						})
					}
				}
			    // showCBInfo(JSON.stringify(oData.responseMsg));
			}
			
			// RSA加密
			function setEncrypt (value) {
			    var encrypt = new JSEncrypt();
			    encrypt.setPublicKey(pubKey);
			    return encrypt.encrypt(value);
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
			
			// 显示接口返回的消息及插件回调信息
			function showCBInfo(szInfo, type) {
			   
			}
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
			
			return {
				startPreview,
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