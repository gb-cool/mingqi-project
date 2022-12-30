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

// 四色图显示隐藏并更改颜色     bool == true (显示)    bool == false (隐藏)    color两种传参形式  0xffffff  '#ffffff'
// color 表示  四色图一般风险区域 颜色        color1  表示  四色图低风险区域  颜色
export const fourColorDiagram_3d = (bool, color, color1) => {
    fourColorDiagram(bool, color, color1);
};
