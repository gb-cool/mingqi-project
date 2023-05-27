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
    updataLiMoRobotPlane,
    updataLEDforOutRoadPlane,
    focusoutRoadLED,
    pipeLineFun,
    visibleMan,
    updataRoomUpLEDplane,
    focusRoomUpLED,
    roamAnimation,
    posuiDanimation,
    saifenDanimation,
    suishiDanimation,
    limoCameraDeviceFocus,
    limoCameraDeviceDataup,
    sceneDeviceLook,
    shoucengAnimations,
    suishiModelAnimation,
    changeYDcarSpeed,
    allRoomToggle,
    junhuaRomaingLight,
    junhuaRomaingLines,
    junhuaLoubanSetOpacity,
    manyouCarToggle,
    deletCar,
    fenliaoMeshHide,
    fenliaoOpacity,
    fenliaoAnimationOne,
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

// 立磨间巡检机器人头顶悬浮片更新文本内容
export const updataLiMoRobotPlane_3d = (name) => {
    updataLiMoRobotPlane(name);
};

/*
    更新外围马路上的四个LED屏幕信息
    data = [
        {
            id: xxxx,
            value: ['','','',''],  // 最小一个值，最大四个值  如果只有一个值 value.length = 1，以此类推
        },
        ......
    ]
*/
export const updataLEDforOutRoadPlane_3d = (data) => {
    updataLEDforOutRoadPlane(data);
};

// 外围马路上的四个LED屏幕聚焦 id = ID   times = 毫秒数  td = 回调函数
export const focusoutRoadLED_3d = (id, times, td) => {
    focusoutRoadLED(id, times, td);
};

/*
    管道动画方法
    type = 0(所有管道正常显示)  1(所有管道显示动画效果)  2(磁悬浮风机管道动画)   3(输送管道动画)   4(罗茨风机管道动画)    5(压缩空气管道动画)    6(水管动画)    7(氮气管道动画)   
    speed = number 
    color = 当type为1时 需要传递一个长度为7的数组  [0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff]  这个数组的顺序，按照type的管道顺序来的;  当type为2-7的时候  直接传值 0xffffff; 注意，最后一个颜色值是控制outline颜色的。
*/
export const pipeLineFun_3d = (type, speed, color) => {
    pipeLineFun(type, speed, color);
};

/*  
    根据状态决定是否显示当前人员模型
    data = [id, id, id, id]
    bool = boolean(true 为显示   false   为隐藏  )
*/
export const visibleMan_3d = (data, bool) => {
    visibleMan(data, bool);
};

/*
    更新房子上面的六个LED屏幕信息  6个LED目前的ID是 outRoom1  outRoom2  outRoom3  outRoom4  outRoom5  outRoom6  
    data = [
        {
            id: xxxx,
            value: 'xxxxx',
        },
        ......
    ]
*/
export const updataRoomUpLEDplane_3d = (data) => {
    updataRoomUpLEDplane(data);
};

// 外围墙上的6个LED片聚焦
export const focusRoomUpLED_3d = (id, times, td) => {
    focusRoomUpLED(id, times, td);
};

// 场景漫游 room==0(破碎间和筛分间漫游) 1(碎石间漫游) 2(立磨间漫游) 3(均化间漫游)  type == 0(开始漫游)  1(结束漫游)  2(暂停漫游)  3(继续漫游)   speed = 速度值越大越慢，越小越快   td 漫游结束回调
export const roamAnimation_3d = (room, type, speed, td) => {
    roamAnimation(room, type, speed, td);
};

// 破碎间皮带动画  speed 控制皮带速度 越大越快     bool 控制皮带动画是否开启
export const posuiDanimation_3d = (speed, bool) => {
    posuiDanimation(speed, bool);
};

// 筛分间皮带动画  speed 控制皮带速度 越大越快     bool 控制皮带动画是否开启
export const saifenDanimation_3d = (speed, bool) => {
    saifenDanimation(speed, bool);
};

// 碎石间皮带动画  speed 控制皮带速度 越大越快     bool 控制皮带动画是否开启
export const suishiDanimation_3d = (speed, bool) => {
    suishiDanimation(speed, bool);
};

// 立磨间摄像头设备聚焦
export const limoCameraDeviceFocus_3d = (id, times, td) => {
    limoCameraDeviceFocus(id, times, td);
};

/*
    立磨间摄像头名称更新
    data = [
        {
            id:'xxxx',
            name: 'xxxxx',
        }
    ]
*/
export const limoCameraDeviceDataup_3d = (data) => {
    limoCameraDeviceDataup(data);
};

// 所有设备聚焦方法 id = 设备ID   times = 聚焦时间   isPlane = 是否显示信息框  false = 不显示   true = 显示   td = 回调函数
export const sceneDeviceLook_3d = (id, times, isPlane, td) => {
    sceneDeviceLook(id, times, isPlane, td);
};

// 收尘动画展示隐藏  type = 1(破碎间)  2(筛分间)  3(碎石配料间)  4(立磨间)  speed = 速度  color = 0xffffff（颜色）   bool = true(显示)  false(隐藏)
export const shoucengAnimations_3d = (type, speed, color, bool) => {
    shoucengAnimations(type, speed, color, bool);
};

// 碎石配料动画模型动画显示隐藏   bool = true(半透明显示)  false(不透明遮挡)   opacity = 透明度 0-1
export const suishiModelAnimation_3d = (bool, opacity) => {
    suishiModelAnimation(bool, opacity);
};

// 移动小车改变移动速度  number = 毫秒值
export const changeYDcarSpeed_3d = (number) => {
    changeYDcarSpeed(number);
};

// 所有车间显示隐藏  index == 0(筛分间)  1(均化间)  2(立磨间)  3(碎石配料间)  4(破碎间)  5(堆石场)  bool = true(显示) false(隐藏)
export const allRoomToggle_3d = (index, bool) => {
    allRoomToggle(index, bool);
};

// 均化间漫游时单独高亮显示立磨间密相泵物体
export const junhuaRomaingLight_3d = (bool) => {
    junhuaRomaingLight(bool);
};

// 均化间漫游时单独显示单条输送管道
export const junhuaRomaingLines_3d = (bool, color) => {
    junhuaRomaingLines(bool, color);
};

// 均化间中间楼板设置透明度   0 - 1
export const junhuaLoubanSetOpacity_3d = (i) => {
    junhuaLoubanSetOpacity(i);
};

// 漫游小车显示隐藏
export const manyouCarToggle_3d = (bool, isPlay) => {
    manyouCarToggle(bool, isPlay);
};

// 删除车辆
export const deletCar_3d = (id) => {
    deletCar(id);
};

// 粉料动画模型显示隐藏
export const fenliaoMeshHide_3d = (bool) => {
    fenliaoMeshHide(bool);
};

// 均化间动画外层部分物体透明度设置。
export const fenliaoOpacity_3d = (bool, opacity) => {
    fenliaoOpacity(bool, opacity);
};

// 分料动画1执行
export const fenliaoAnimationOne_3d = (bool, opacity) => {
    fenliaoAnimationOne(bool, opacity);
};
