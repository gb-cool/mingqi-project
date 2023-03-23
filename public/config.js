const urlConfigHost = "localhost:8090"
const urlConfigRoot = "http://" + urlConfigHost
const urlConfig = {
	"Seekey": "http://10.12.67.17:46000/",
	
	// "JoySuch": "http://10.12.67.17:9999/",
	"JoySuch": urlConfigRoot + "/JoySuch/",
	
	// "device": "http://10.12.3.102:32076/",
	"device": urlConfigRoot + "/dev/",
	
	"video": "http://10.12.3.98:31500/",
	"videoAlarm": urlConfigRoot + "/videoAlarm/",
	
	// "passage": "http://10.12.67.2:8738/"
	"passage": urlConfigRoot + "/Passage/",
	
	// "warehouse": "http://10.12.67.2:8734/",
	"warehouse": urlConfigRoot + "/warehouse/",
	
	"robot": urlConfigRoot + "/robot/",
	
	// 是否开启网格
	"isGrid": false,
	
	// 嵌套距左距上距离
	"iframePos": {
		left: 69,	// 2560
		top: 0
	},	// iframe与文档的偏移量
}