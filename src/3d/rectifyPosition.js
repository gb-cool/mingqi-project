// let polygon = [
// 	[128.8,293.9],
// 	[403.6,399.2],
// 	[397.1,391.0],
// 	[122.4,318.5]
// ]
// let point =[247.225,330.491]

function RectifyFnsidePolygon(polygon, point){
	let x = point[0], y = point[1];
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		let xi = polygon[i][0], yi = polygon[i][1];
		let xj = polygon[j][0], yj = polygon[j][1];
		let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect)inside = !inside;
	}
	return inside;
}

/**
 * 数据结构
 * area [[点1, 点2]] 区域图形坐标
 * realCoordinate [{x:'',y:""}, {x:'',y:''}] 实时比例点数据
 * modelCoordinate [{x:'',y:""}, {x:'',y:''}] 模型比例点数据
 */
function RectifyGetData (){
	let data = {
		"A1": {
			area: [[0,610.40],[288.90,688.90],[0,688.90]],
			realCoordinate: [{x:43591,y:622036},{x:285570,y:689361}],
			modelCoordinate: [{x:-4101.9263,y:-747.42219},{x:-1768.57789,y:-779.57245}]
		},
		"A2": {
			area: [[0,593.80],[318.10,688.90],[288.90,688.90],[0,610.40]],
			realCoordinate: [{x:30045,y:607169},{x:285570,y:689361}],
			modelCoordinate: [{x:-4493.7955,y:-871.16692},{x:-1768.57789,y:-779.57245}]
		},
		"A3": {
			area: [[0,579.20],[390.60,688.90],[318.10,688.90],[0,593.80]],
			realCoordinate: [{x:34982,y:589967},{x:276910,y:676195}],
			modelCoordinate: [{x:-4493.7955,y:-1059.16695},{x:-1880.26933,y:-858.91282}]
		},
		"A4": {
			area: [[0,561.50],[450.70,688.90],[390.60,688.90],[0,579.20]],
			realCoordinate: [{x:34982,y:589967},{x:285228,y:641546}],
			modelCoordinate: [{x:-4493.7955,y:-1059.16695},{x:-1843.20039,y:-1269.30787}]
		},
		"A5": {
			area: [[0,531.90],[469.00,657.50],[450.70,688.90],[0,561.50]],
			realCoordinate: [{x:42601,y:549852}, {x:285228,y:641546}],
			modelCoordinate: [{x:-4437.52688,y:-1508.91938},{x:-1843.20039,y:-1269.30787}]
		},
		"A6": {
			area: [[0,511.10],[469.00,644.60],[469.00,657.50],[0,531.90]],
			realCoordinate: [{x:176449,y:575755},{x:310074,y:598751}],
			modelCoordinate: [{x:-3069.2499,y:-1563.98377},{x:-1763.99736,y:-1714.02101}]
		},
		"A7": {
			area: [[0,466.30],[469.00,597.70],[469.00,644.60],[0,511.10]],
			realCoordinate: [{x:66776,y:484865},{x:310074,y:598751}],
			modelCoordinate: [{x:-4388.22696,y:-2181.68809},{x:-1763.99736,y:-1714.02101}]
		},
		//A9
		"A8": {
			area: [[0,281.90],[469.00,410.30],[469.00,597.70],[0,466.30]],
			realCoordinate: [{x:66776,y:484865},{x:365224,y:400058}],
			modelCoordinate: [{x:-4388.22696,y:-2181.68809},{x:-1529.47969,y:-3892.72982}]
		},
		/* 
		"A1": {
			area: [],
			realCoordinate: [{x:,y:},{x:,y:}],
			modelCoordinate: [{x:,y:},{x:,y:}]
		} 
		*/
	}
	return data
}
/**
 * 获取坐标所属比例数据
 * @param {Object} x
 * @param {Object} y
 */
function getRectifyData(x, y){
	let data = RectifyGetData()
	let point = [x/1000, y/1000]
	let result  = null
	for(let key in data){
		let da = data[key]
		let polygon = da.area
		// 判断点是否在面内
		let ist = RectifyFnsidePolygon(polygon, point)
		if(ist){
			result = da
			result.x = x
			result.y = y
		}
	}
	return result
}
/**
 * 计算某个点旋转后的坐标
 *
 * @param point  旋转的点 {x,y}
 * @param angle 旋转的角度
 * @param originPoint 基于哪个点旋转，默认值左上角原点{x: 0, y: 0}
 * @returns {{x: number, y: number}}
 */
function rotatePoint(point, angle, originPoint = {x: 0, y: 0}) {
	const cosA = Math.cos(angle * Math.PI / 180);
	const sinA = Math.sin(angle * Math.PI / 180);
	const rx = originPoint.x + (point.x - originPoint.x) * cosA - (point.y - originPoint.y) * sinA;
	const ry = originPoint.y + (point.x - originPoint.x) * sinA - (point.y - originPoint.y) * cosA;
	return { x: rx,y: ry };
}

export { getRectifyData, rotatePoint }

// 求解比例系数
// 堆场外