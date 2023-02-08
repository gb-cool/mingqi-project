import {
    pageOnload_3d,
    tweenMoveView,
    nowMoveView,
    roadFlow,
    smallRoomFloorPlane,
    fourColorDiagram,
    backMainView,
    floorHide,
    outWallOpacity,
    replaceSkyBoxIndex,
    outwallCondition,
    outRoomOpactiy,
    limoRobotAnimation,
    clickLMJtoChangeColor,
    limoPDanimation,
    initalizeCar,
    realtimeMotionCar,
    initalizeMan,
    realtimeMotionMan,
    limoRobotInitalize,
    limoRobotLighting,
    updateLEDPlane,
    focusduishiLED,
    focusCameraImport,
    focusFenChengImport,
    fourColorOpacity,
    focusCar,
    focusPeople,
    limoRoomMainMachine,
    limoRoomMainMachineDataInit,
    limoXunjianRobotFocus,
} from "./industryEquip.js";
var baseUrl = "./3dModel/";

// 初始化整个场景
export const pageOnload = (canvas, fun) => {
    pageOnload_3d(baseUrl, canvas, fun);
};

// 返回主场景
export const mainView = () => {
    backMainView();
};

// 进入内部场景 参数  0 == 筛分间   1 == 均化间  2 == 立磨间  3 == 碎石配料间  4 == 破碎间   5 == 堆石场一
export const intoRoom = (i) => {
    floorHide(i);
};

// 子场景外场景透明度设置 参数  0-1
export const outWallSetOpacity = (int) => {
    outWallOpacity(int);
};

// 获取当前视角 point 和 look 方式： 控制台调用 outViewPoint() 方法
// 移动场景视角 补间动画方式  参数  point = [x,y,z] 控制器焦点  look = [x,y,z] 相机坐标  times = number 毫秒计时  td = function() 执行结束回调
export const tweenMoveing = (point, look, times, td) => {
    tweenMoveView(point, look, times, td);
};

// 瞬间切换场景视角 参数  point = [x,y,z] 控制器焦点  look = [x,y,z] 相机坐标
export const momentMoveing = (point, look) => {
    nowMoveView(point, look);
};

// 替换天空盒
/*  
    参数含义  texture = new THREE.TextureLoader()   对象

    示例：  
        const texLoader = new THREE.TextureLoader();
        texLoader.load('具体图片路径', (texture) => {
            replaceSkyBox(texture)
        });
*/
export const replaceSkyBox = (texture) => {
    replaceSkyBoxIndex(texture);
};

// 控制马路上流动线条显示隐藏   bool == true (显示)    bool == false (隐藏)   speed = number
export const roadFlow_3d = (bool, speed) => {
    roadFlow(bool, speed);
};

// 小厂房内部黄色蓝色片显示隐藏   bool == true (显示)    bool == false (隐藏)
export const smallRoomFloorPlane_3d = (bool) => {
    smallRoomFloorPlane(bool);
};

// 四色图显示隐藏并更改颜色     bool == true (显示)    bool == false (隐藏)    color两种传参形式  0xffffff  '#ffffff'  speed = number
// color 表示  四色图一般风险区域 颜色        color1  表示  四色图低风险区域  颜色
export const fourColorDiagram_3d = (bool, color, color1, speed) => {
    fourColorDiagram(bool, color, color1, speed);
};

// 外墙和外楼顶透明度状态    number 0 - 1    0 == 完全消失   1 == 完全显示
export const outwallCondition_3d = (number) => {
    outwallCondition(number);
};

// 除地面意外的所有其他物体设置透明度  number 0 - 1    0 == 完全消失   1 == 完全显示
export const outRoomOpactiy_3d = (number) => {
    outRoomOpactiy(number);
};

// 立磨巡检机器人动画  id为位置信息目前位置点位有 1 - 20      speed 为速度 （值越大越慢，越小越快）    bool为开启或者关闭
export const limoRobotAnimation_3d = (id, speed, bool) => {
    limoRobotAnimation(id, speed, bool);
};

// 立磨机点击时，修改管道颜色  修改圆盘转速（默认0.03） 越大越快    修改管道流动速度（默认0.03） 越大越快 但是值区间是小于1 , 0.99为最快
export const clickLMJtoChangeColor_3d = (color, speed, guandaoSpeed) => {
    clickLMJtoChangeColor(color, speed, guandaoSpeed);
};

// 立磨机皮带动画   speed 控制皮带速度 越大越快     bool 控制皮带动画是否开启
export const limoPDanimation_3d = (speed, bool) => {
    limoPDanimation(speed, bool);
};

/*
    在场景加载完成后调用此方法，初始化加载车辆信息以及初始化定位信息   data基本数据格式如下
    data = [
        {
            id: xxxx,
            name: xxxx,
            x: xxxx,
            y: xxxx,
        },
        ......
    ]
    因为车辆只能在陆地上行驶，因此默认使用的是 地面一层 的模型数据
*/
export const initalizeCar_3d = (data) => {
    initalizeCar(data);
};

// 实时数据驱动车辆动画    id=车辆id    points=[x,y]   times=毫秒值时间  td=动画执行完的回调函数
export const realtimeMotionCar_3d = (id, point, times, td) => {
    realtimeMotionCar(id, point, times, td);
};

/*
    在场景加载完成后调用此方法，初始化加载人员信息以及初始化定位信息   data基本数据格式如下
    data = [
        {
            id: xxxx,
            name: xxxx,
        },
        ......
    ]
    td 人员加载完成后的回调函数
*/
export const initalizeMan_3d = (data, td) => {
    initalizeMan(data, td);
};

// 实时数据驱动人员动画    id=人员id    points=[x,y]   floor=当前行走的地面  times=毫秒值时间  td=动画执行完的回调函数
export const realtimeMotionMan_3d = (id, point, floor, times, td) => {
    realtimeMotionMan(id, point, floor, times, td);
};

// 立磨巡检机器人恢复到初始状态 位置为1
export const limoRobotInitalize_3d = () => {
    limoRobotInitalize();
};

// 立磨巡检机器人充电状态  bool = true（打开）  false （关闭）
export const limoRobotLighting_3d = (bool) => {
    limoRobotLighting(bool);
};

/*
    更新堆石车间led屏幕信息
    data = [
        {
            stockPlaceCode: xxxx,
            materialShortName: xxxx,
            currStock: xxxx,
            maxStock: xxxx,
        },
        ......
    ]
*/
export const updateLEDPlane_3d = (data) => {
    updateLEDPlane(data);
};

// 堆石车间LED屏幕聚焦  id = id  times = 时间（毫秒值）  td = 回调函数
export const focusduishiLED_3d = (id, times, td) => {
    focusduishiLED(id, times, td);
};

// 摄像头重点区域聚焦  id = id  times = 时间（毫秒值）  td = 回调函数
export const focusCameraImport_3d = (id, times, td) => {
    focusCameraImport(id, times, td);
};

// 粉尘和氧浓度聚焦  id = id  times = 时间（毫秒值）  td = 回调函数
export const focusFenChengImport_3d = (id, times, td) => {
    focusFenChengImport(id, times, td);
};

// 设置四色图透明度  number = 0-1
export const fourColorOpacity_3d = (number) => {
    fourColorOpacity(number);
};

// 车辆聚焦 id = 车辆ID   times = 毫秒数  td = 回调函数
export const focusCar_3d = (id, times, td) => {
    focusCar(id, times, td);
};

// 人员聚焦 id = 人员ID   times = 毫秒数  td = 回调函数
export const focusPeople_3d = (id, times, td) => {
    focusPeople(id, times, td);
};

// 立磨间主机聚焦 id = 主机ID   times = 毫秒数  td = 回调函数
export const limoRoomMainMachine_3d = (id, times, td) => {
    limoRoomMainMachine(id, times, td);
};

/*
    立磨间主机数据驱动更新
    data = [
        {
            id:'xxxx',
            name: 'xxxxx',
            status: 0,      四种状态 0 = 关机  1 = 开机  2 = 故障 3 = 维修
        }
    ]
    这是我程序设置的默认值。后续可以根据你传递的参数自定义修改
    fontColor = {
        shutDown: { r: 0, g: 0, b: 0, a: 1.0 },                 关机（默认为黑色）
        open: { r: 0, g: 255, b: 0, a: 1.0 },                   开机（默认为绿色）
        failure: { r: 255, g: 0, b: 0, a: 1.0 },                故障（默认为红色）
        maintenance: { r: 110, g: 110, b: 110, a: 1.0 },        维修（默认为灰色）
    }
*/
export const limoRoomMainMachineDataInit_3d = (data, fontColor) => {
    limoRoomMainMachineDataInit(data, fontColor);
};

// 立磨间巡检机器人聚焦      times = 毫秒数  td = 回调函数
export const limoXunjianRobotFocus_3d = (times, td) => {
    limoXunjianRobotFocus(times, td);
};
