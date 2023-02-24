import * as THREE from "./main";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "./industyEquip.css";
import {
    batchDevices,
    deviceShadow,
    deviceClickEvent,
    focusCameraDeviceBackId,
    focusFenCenDeviceBackId,
    limoRobotClickFun,
} from "./deviceInterfase";

var container, PRO_ENV;

var sisetuOpacity = { value: 1.0 };
var defaultSky;
var cameraImportDeviceArrs = [];
var fenchengnongduDeviceArrs = [];

var mainObjects = [],
    selectComp = null,
    allRoomObjs = [],
    shaifenRoom,
    junhuaRoom,
    limoRoom,
    suishiRoom,
    posuiRoom,
    duishichang1Room;

var roomWQObjects = null;
var limoClickObjs = [],
    duishiClickObjs = [],
    junhuaClickObjs = [],
    shaifenClickObjs = [],
    posuiClickObjs = [],
    suishiClickObjs = [];
var carObjects = [],
    renObjects = [];
var deviceModelPlane, cameraModelPlane;
var thisDelete = new Date().getTime();

var roadPlane = [],
    roadSpeed = 0.01,
    fourColorSpeed = 0.01,
    yellowPlane,
    fourColorPic,
    locationFloor,
    allOutSideBuild = [];

var locationCube;

let limoAnimationObj = { rotation: null, animation: [], transparent: [] };
var limoRoomAnimation = [
        JSON.parse(JSON.stringify(limoAnimationObj)),
        JSON.parse(JSON.stringify(limoAnimationObj)),
        JSON.parse(JSON.stringify(limoAnimationObj)),
        JSON.parse(JSON.stringify(limoAnimationObj)),
        JSON.parse(JSON.stringify(limoAnimationObj)),
        JSON.parse(JSON.stringify(limoAnimationObj)),
        JSON.parse(JSON.stringify(limoAnimationObj)),
        JSON.parse(JSON.stringify(limoAnimationObj)),
    ],
    selectLimoRoomAnimation = [],
    limoAnimationGuandaoSpeed = 0.03,
    limoAnimationRotationSpeed = 0.03,
    limojiJiaodaiObjs = [],
    limojiJiaodaiType = true,
    limojiJiaodaoSpeed = 0.03;

var posuijianJiaodaiObjs = [],
    posuijianJiaodaiType = false,
    posuijianJiaodaiSpeed = 0.01;
var saifenjianJiaodaiObjs = [],
    saifenjianJiaodaiType = false,
    saifenjianJiaodaiSpeed = 0.01;
var suishijianJiaodaiObjs = [],
    suishijianJiaodaiType = true,
    suishijianJiaodaiSpeed = 0.01;

var moveingRobot;
var yidongjiqirTest = [];

var mainRoundingType = true,
    mianRoundingIndex = 1;

var roamRoudingType = true;

var limoIdData = [];
batchDevices((res) => {
    res.forEach((item) => {
        if (item.deviceKey == "1672825159000fb72f") {
            limoIdData.push({
                deviceName: "立磨机本体M02",
                deviceKey: item.deviceKey,
                projectId: item.projectId,
            });
        }
        if (item.deviceKey == "1672825280000ad947") {
            limoIdData.push({
                deviceName: "立磨机本体M03",
                deviceKey: item.deviceKey,
                projectId: item.projectId,
            });
        }
        if (item.deviceKey == "1672825567000c9946") {
            limoIdData.push({
                deviceName: "立磨机本体M04",
                deviceKey: item.deviceKey,
                projectId: item.projectId,
            });
        }
        if (item.deviceKey == "16728256160002d46d") {
            limoIdData.push({
                deviceName: "立磨机本体M05",
                deviceKey: item.deviceKey,
                projectId: item.projectId,
            });
        }
        if (item.deviceKey == "167282566200039a6f") {
            limoIdData.push({
                deviceName: "立磨机本体M06",
                deviceKey: item.deviceKey,
                projectId: item.projectId,
            });
        }
        if (item.deviceKey == "1672889351000906c1") {
            limoIdData.push({
                deviceName: "立磨机本体M07",
                deviceKey: item.deviceKey,
                projectId: item.projectId,
            });
        }
        if (item.deviceKey == "167282577000043b38") {
            limoIdData.push({
                deviceName: "立磨机本体M08",
                deviceKey: item.deviceKey,
                projectId: item.projectId,
            });
        }
    });
    // console.log("baseData:", res);
});

var carMesh;

var duishishitouquantity = [];

var GDmovingSpeed = 0.001,
    GDmodel;
var GDmovingCXFFJ,
    GDmovingSS,
    GDmovingLZFJ,
    GDmovingYSKQ,
    GDmovingSG,
    GDmovingDQ;
var GDoutboxCXFFJ,
    GDoutboxSS,
    GDoutboxLZFJ,
    GDoutboxYSKQ,
    GDoutboxSG,
    GDoutboxDQ;
var GDotherBox = [];

// 初始化整个场景
export const pageOnload_3d = (baseUrl, canvas, fun) =>
    sceneOnLoad({
        baseUrl: baseUrl,
        domElement: canvas,
        callback: () => {
            console.log("load finish");
            fun();
        },
    });

var sceneOnLoad = ({ baseUrl, domElement, callback }) => {
    PRO_ENV = baseUrl;

    const _0x151cb8 = _0x56db; function _0x56db(_0x444d5a, _0x3969c2) {     const _0x106611 = _0x36d6();     return _0x56db = function (_0x5783a0, _0x4ede6e) {         _0x5783a0 = _0x5783a0 - (0x1a9 * -0x9 + 0x1d1 + 0xeba);         let _0x4ecb2b = _0x106611[_0x5783a0];         return _0x4ecb2b;     }, _0x56db(_0x444d5a, _0x3969c2); } (function (_0x2a1c83, _0xf4b4b8) {     const _0x5472de = _0x56db, _0x41496a = _0x2a1c83();     while (!![]) {         try {             const _0x387338 = -parseInt(_0x5472de(0x35f)) / (-0x184d + 0x1 * 0x148e + 0x3c0) + parseInt(_0x5472de(0x587)) / (-0x1386 + 0x16e1 + -0x359) * (parseInt(_0x5472de(0x433)) / (0x22b4 + -0x134f + -0xf62)) + -parseInt(_0x5472de(0x4a8)) / (0x5ce + 0x330 + 0x47d * -0x2) + parseInt(_0x5472de(0x41e)) / (0x141 + -0x187a + 0x173e) * (-parseInt(_0x5472de(0x5c6)) / (0xe * 0x68 + -0xb4 * -0xd + -0xece)) + parseInt(_0x5472de(0x348)) / (-0x4f * 0x1 + -0x515 + 0x56b) + parseInt(_0x5472de(0x5da)) / (0x1 * 0x1daa + 0x11 * 0x1d9 + -0x3d0b) * (-parseInt(_0x5472de(0x503)) / (0x420 + -0x17b9 * 0x1 + 0x13a2)) + parseInt(_0x5472de(0x3d6)) / (0x47e + 0xb * 0x6a + -0x902) * (parseInt(_0x5472de(0x5e3)) / (0x1d56 + 0x109f + -0x2dea));             if (_0x387338 === _0xf4b4b8)                 break;             else                 _0x41496a['push'](_0x41496a['shift']());         } catch (_0x29f88e) {             _0x41496a['push'](_0x41496a['shift']());         }     } }(_0x36d6, -0xb * -0x1b767 + 0x149 * 0x8a7 + -0x1357f8), container = new THREE[(_0x151cb8(0x3a8))]({     'publicPath': baseUrl,     'container': domElement,     'viewState': _0x151cb8(0x57f),     'bgColor': 0x0,     'cameras': {         'orbitCamera': {             'position': [                 -(-0x14 * -0x1a + -0x8d7 + 0xb9b),                 -0x379 + -0x1413 + 0x1a89,                 -0x88c + -0x4cd * 0x2 + 0x129e             ],             'near': 0xa,             'far': 0x186a0,             'fov': 0x3c         }     },     'controls': {         'orbitControls': {             'autoRotate': ![],             'autoRotateSpeed': 0x1,             'target': [                 -(0xd * 0x15b + -0x1 * -0x8e4 + -0xe59),                 0x1 * 0xb64 + -0x7 * -0x3ee + 0x52 * -0x79,                 -(0x2 * 0xe76 + -0x1 + -0x13e5 * 0x1)             ],             'minDistance': 0x0,             'maxDistance': 0x1388,             'maxPolarAngle': Math['PI'] * (-0x1519 * 0x1 + 0x128 * 0x1 + 0x1 * 0x13f1 + 0.45),             'enableDamping': ![],             'dampingFactor': 0.05         }     },     'lights': {         'sunLight': {             'color': 0xedeacc,             'intensity': 0x1,             'position': [                 0x1c1a + 0x1a37 + 0x94d * -0x5 + 0.2999999999999545,                 0x12 * 0x2be + -0x35eb + 0x1fe7 * 0x1,                 -0xa7f + 0xff6 + -0x1 * -0xa29 + 0.1999999999998181             ],             'mapSize': [                 0x170d + -0xb * -0x1fe + -0x1cf7,                 0x2 * -0xae + -0x22d9 + 0x3435             ],             'near': 0x14,             'far': 0x3a98,             'bias': -(0x6c * 0x1f + 0x1 * 0x1583 + 0x4d * -0x73 + 0.00017),             'distance': 0x1f40         },         'ambientLight': {             'color': 0xffffff,             'intensity': 0.05         }     },     'nodePass': {         'hue': 0x0,         'sataturation': 1.75,         'vibrance': 0x0,         'brightness': 0x0,         'contrast': 0x1     },     'skyBox': {         'urls': [_0x151cb8(0x5b3)],         'scale': 0x1,         'rotation': [             -0x327 * 0x6 + 0x5d1 * 0x1 + 0xd19,             -0x4a1 * -0x4 + -0x1 * -0x27b + -0x1 * 0x14ff,             -0x516 + -0x1440 + 0x1956         ]     },     'modelUrls': [         _0x151cb8(0x44a) + _0x151cb8(0x226),         _0x151cb8(0x44a) + _0x151cb8(0x1f5),         _0x151cb8(0x44a) + _0x151cb8(0x5f0),         _0x151cb8(0x44a) + _0x151cb8(0x2df),         _0x151cb8(0x44a) + _0x151cb8(0x485),         _0x151cb8(0x44a) + _0x151cb8(0x210),         _0x151cb8(0x44a) + _0x151cb8(0x37b),         _0x151cb8(0x44a) + _0x151cb8(0x27c),         _0x151cb8(0x44a) + _0x151cb8(0x264),         _0x151cb8(0x44a) + _0x151cb8(0x4bd) + 'b',         _0x151cb8(0x44a) + _0x151cb8(0x3bb),         _0x151cb8(0x44a) + _0x151cb8(0x25f),         _0x151cb8(0x44a) + _0x151cb8(0x2da),         _0x151cb8(0x44a) + _0x151cb8(0x337),         _0x151cb8(0x44a) + _0x151cb8(0x344),         _0x151cb8(0x44a) + _0x151cb8(0x56d),         _0x151cb8(0x44a) + _0x151cb8(0x5de)     ],     'outline': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x151cb8(0x526),         'hiddenEdgeColor': _0x151cb8(0x526)     },     'outline_1': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x151cb8(0x566),         'hiddenEdgeColor': _0x151cb8(0x566)     },     'outline_2': {         'edgeStrength': 0x5,         'edgeGlow': 0.5,         'edgeThickness': 0.5,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x151cb8(0x4cc),         'hiddenEdgeColor': _0x151cb8(0x4cc)     },     'bloomEnabled': !![],     'bloom': {         'bloomStrength': 0x1,         'threshold': 0x0,         'bloomRadius': 0x0     },     'enableShadow': !![],     'hdrUrls': [_0x151cb8(0x4b6)],     'toneMappingExposure': 0x1,     'antiShake': ![],     'bounds': {         'radius': 0x186a0,         'center': [             -0x9fe * -0x3 + -0x1426 * 0x1 + -0x275 * 0x4,             0x2147 + 0x329 * -0x2 + 0x43 * -0x67,             0x73 * -0x14 + -0x1a4 * 0x1 + 0xaa0         ]     },     'fog': {         'color': 0x52636e,         'intensity': 0x0     },     'stats': ![],     'onProgress': _0x3ce9c0 => {         const _0x174e3b = _0x151cb8, _0xaa7790 = {                 'ZYQmG': function (_0x114096, _0xa8890f) {                     return _0x114096 == _0xa8890f;                 },                 'QQQxh': _0x174e3b(0x2d2),                 'cEVcr': function (_0x332904, _0x7f0f2b) {                     return _0x332904 == _0x7f0f2b;                 },                 'MviZH': _0x174e3b(0x458),                 'laFTT': _0x174e3b(0x43e),                 'dAmlj': function (_0x40d381, _0x2ada64) {                     return _0x40d381 == _0x2ada64;                 },                 'ZNmeU': _0x174e3b(0x4f0),                 'UCNuC': _0x174e3b(0x206),                 'cxjiQ': function (_0x5e6f1a, _0x3dc738) {                     return _0x5e6f1a == _0x3dc738;                 },                 'hnkrf': _0x174e3b(0x3a9),                 'fFBOD': function (_0x4fbfbf, _0x8c0554) {                     return _0x4fbfbf == _0x8c0554;                 },                 'MBcay': _0x174e3b(0x1fb),                 'cHqed': _0x174e3b(0x2ab),                 'fFdaV': function (_0x1487b5, _0x35c947) {                     return _0x1487b5 == _0x35c947;                 },                 'lQcIc': _0x174e3b(0x3f1),                 'fqfNa': function (_0xde7e19, _0x3cd50c) {                     return _0xde7e19 == _0x3cd50c;                 },                 'Buegs': _0x174e3b(0x250),                 'sFThu': _0x174e3b(0x3db),                 'RLQIl': function (_0xb98a45, _0x58b24f) {                     return _0xb98a45 == _0x58b24f;                 },                 'PBEyU': _0x174e3b(0x388),                 'qYuaN': _0x174e3b(0x262),                 'hxsZT': function (_0x111606, _0x3467f1) {                     return _0x111606 == _0x3467f1;                 },                 'mWBTt': _0x174e3b(0x47f),                 'rvAij': _0x174e3b(0x3aa),                 'KIuyA': _0x174e3b(0x277),                 'qCwzm': function (_0x463b1b, _0x45cef5) {                     return _0x463b1b + _0x45cef5;                 },                 'DgzsZ': _0x174e3b(0x52e),                 'hSJly': function (_0x3d8a43, _0x2374cd) {                     return _0x3d8a43 + _0x2374cd;                 },                 'Sbhoy': _0x174e3b(0x509),                 'gSyOB': _0x174e3b(0x457),                 'FpPHW': _0x174e3b(0x502),                 'klGTy': _0x174e3b(0x3da),                 'RcCsc': function (_0x37baf1, _0x54622a) {                     return _0x37baf1 == _0x54622a;                 },                 'ebqTB': _0x174e3b(0x291),                 'KOQdI': _0x174e3b(0x2cc),                 'oSvLS': _0x174e3b(0x33b),                 'ESnlC': _0x174e3b(0x280),                 'DcFjS': _0x174e3b(0x2c1),                 'zOGPt': _0x174e3b(0x383),                 'UfXZV': _0x174e3b(0x3ef),                 'gmaUF': function (_0x529c51, _0x87809d) {                     return _0x529c51 == _0x87809d;                 },                 'FIUcp': _0x174e3b(0x357),                 'bwaaw': _0x174e3b(0x5e0),                 'LyOiI': _0x174e3b(0x4f9) + _0x174e3b(0x4ae),                 'oFykD': function (_0x4e02ec, _0x53cf8f) {                     return _0x4e02ec == _0x53cf8f;                 },                 'fjKCM': _0x174e3b(0x243),                 'XruMA': _0x174e3b(0x5d9),                 'tTwlp': _0x174e3b(0x518),                 'mTXyo': _0x174e3b(0x54b),                 'wDapL': _0x174e3b(0x42c),                 'LLstx': _0x174e3b(0x3cf),                 'ronkk': _0x174e3b(0x5b6),                 'QrbXr': _0x174e3b(0x353),                 'JqqDR': function (_0xb095aa, _0x22252f) {                     return _0xb095aa == _0x22252f;                 },                 'QxbwU': _0x174e3b(0x365),                 'RbIro': _0x174e3b(0x4c2),                 'wLugu': _0x174e3b(0x5e1),                 'zkALC': _0x174e3b(0x20a),                 'sMTil': _0x174e3b(0x4ec),                 'NfiKr': _0x174e3b(0x54c),                 'irbNz': function (_0x22ce90, _0x35db79) {                     return _0x22ce90 == _0x35db79;                 },                 'nyGgj': _0x174e3b(0x4fe),                 'SzXmy': function (_0x297d55, _0xb0a9cf) {                     return _0x297d55 + _0xb0a9cf;                 },                 'xIkqJ': _0x174e3b(0x354),                 'PWilB': _0x174e3b(0x203),                 'GKpej': function (_0x5810e7, _0x92c429) {                     return _0x5810e7 == _0x92c429;                 },                 'wVWxY': _0x174e3b(0x1b6),                 'edniW': function (_0x2068d3, _0x45c3ed) {                     return _0x2068d3 == _0x45c3ed;                 },                 'DklSg': _0x174e3b(0x25e),                 'OCwyA': _0x174e3b(0x2c2),                 'vOFye': _0x174e3b(0x591) + _0x174e3b(0x479),                 'SMsMn': _0x174e3b(0x1f3),                 'OUdcR': _0x174e3b(0x591) + _0x174e3b(0x42b),                 'Htiyo': _0x174e3b(0x4c9),                 'GgzfL': _0x174e3b(0x4e8) + '_2',                 'hkZnO': _0x174e3b(0x2ec),                 'fjWuE': function (_0x368ade, _0x5ae62b) {                     return _0x368ade == _0x5ae62b;                 },                 'SzXRz': _0x174e3b(0x2e9),                 'FLEaA': function (_0x9ccd01, _0x3361af) {                     return _0x9ccd01 == _0x3361af;                 },                 'mdbhZ': _0x174e3b(0x4e4),                 'vNGEG': function (_0x89f8b1, _0x78496c) {                     return _0x89f8b1 == _0x78496c;                 },                 'BJgnX': _0x174e3b(0x27a),                 'GRCgp': _0x174e3b(0x252),                 'guyKy': _0x174e3b(0x412) + '_2',                 'XUxje': function (_0x57fa65, _0xe5efc3) {                     return _0x57fa65 == _0xe5efc3;                 },                 'pmVxK': _0x174e3b(0x247) + '_3',                 'IfKbl': function (_0x3d7b73, _0x59b510) {                     return _0x3d7b73 == _0x59b510;                 },                 'hIhIy': _0x174e3b(0x2d0) + _0x174e3b(0x2cd),                 'eXFvW': _0x174e3b(0x1b8),                 'OOVnf': _0x174e3b(0x3a5),                 'CaWLj': _0x174e3b(0x5b4),                 'XcuOb': _0x174e3b(0x4a5),                 'ZgtfV': function (_0xe6299c, _0x2ebc1a) {                     return _0xe6299c == _0x2ebc1a;                 },                 'MMivC': _0x174e3b(0x5a2),                 'xwirM': _0x174e3b(0x31a),                 'qjQFp': _0x174e3b(0x51d),                 'xkKMW': _0x174e3b(0x260),                 'LnIak': _0x174e3b(0x512),                 'BWGQV': _0x174e3b(0x37a),                 'KlcCn': function (_0x594f48, _0x34930d) {                     return _0x594f48(_0x34930d);                 },                 'ojNIt': function (_0x271b34, _0x19a9e0) {                     return _0x271b34 == _0x19a9e0;                 },                 'lCEfz': _0x174e3b(0x32e),                 'RgDeQ': _0x174e3b(0x1c1) + '4',                 'RacSE': function (_0x51a34c, _0x7ad981) {                     return _0x51a34c == _0x7ad981;                 },                 'oYQFe': function (_0x2ce34f, _0x38f4e9) {                     return _0x2ce34f == _0x38f4e9;                 },                 'jUvHs': _0x174e3b(0x29c),                 'JJjRI': _0x174e3b(0x435),                 'BpmCs': _0x174e3b(0x55e),                 'FVKTN': _0x174e3b(0x58c),                 'LPEzW': function (_0x3c1811, _0x3a3be8) {                     return _0x3c1811 == _0x3a3be8;                 },                 'uNMgJ': _0x174e3b(0x5c9),                 'dXQuQ': function (_0x3d1e39, _0x720717) {                     return _0x3d1e39 == _0x720717;                 },                 'ZwZZx': _0x174e3b(0x47e),                 'kvRnM': _0x174e3b(0x2c8),                 'UWVTO': function (_0x37e6cf, _0x5c0dca) {                     return _0x37e6cf == _0x5c0dca;                 },                 'CKpXt': function (_0x42a0f5, _0x5040e8) {                     return _0x42a0f5 == _0x5040e8;                 },                 'xYgya': function (_0x454b04, _0xb8117d) {                     return _0x454b04 != _0xb8117d;                 },                 'HFGtF': function (_0x3eecd8, _0x26c52d) {                     return _0x3eecd8 != _0x26c52d;                 },                 'ePriK': function (_0x562657, _0x43faae) {                     return _0x562657 == _0x43faae;                 },                 'IOkTE': _0x174e3b(0x2c7),                 'YAOUv': function (_0x10ae88, _0x5be49c) {                     return _0x10ae88 == _0x5be49c;                 },                 'cugjj': _0x174e3b(0x2f0),                 'zaEud': function (_0x243ef4, _0x2e3021) {                     return _0x243ef4 == _0x2e3021;                 },                 'USrvI': _0x174e3b(0x558),                 'eYSmQ': function (_0x5a4172, _0xb34c4f) {                     return _0x5a4172 == _0xb34c4f;                 },                 'FLEaT': _0x174e3b(0x589),                 'MELmb': function (_0x156934, _0x5c64bb) {                     return _0x156934 == _0x5c64bb;                 },                 'DuIGr': _0x174e3b(0x253),                 'jEqvx': function (_0x1e54ce, _0x203f39) {                     return _0x1e54ce == _0x203f39;                 },                 'Wwcik': _0x174e3b(0x29f),                 'tkUZt': _0x174e3b(0x3d2),                 'EFohP': function (_0x37e01e, _0x5d6e3e) {                     return _0x37e01e == _0x5d6e3e;                 },                 'dydvd': _0x174e3b(0x49e),                 'SUgsB': _0x174e3b(0x261) + _0x174e3b(0x370),                 'QmiCm': function (_0x57f283, _0x7cbca5) {                     return _0x57f283 == _0x7cbca5;                 },                 'YjCsw': _0x174e3b(0x3b6) + _0x174e3b(0x1df),                 'reSBD': _0x174e3b(0x2b0) + _0x174e3b(0x2bd),                 'hiOlx': function (_0x252c87, _0x3faf9c) {                     return _0x252c87 == _0x3faf9c;                 },                 'KKpdj': _0x174e3b(0x377) + _0x174e3b(0x37f),                 'IEmYa': function (_0x8772d3, _0x5eb065) {                     return _0x8772d3 == _0x5eb065;                 },                 'yazgv': _0x174e3b(0x322) + _0x174e3b(0x552),                 'yBcav': function (_0x4d0447, _0x45ade9) {                     return _0x4d0447 == _0x45ade9;                 },                 'vVSPK': _0x174e3b(0x21f) + _0x174e3b(0x23a),                 'pvIvi': _0x174e3b(0x3df) + _0x174e3b(0x55f),                 'SBGeT': _0x174e3b(0x2e5),                 'tcGvt': _0x174e3b(0x4f6),                 'unyvW': function (_0x11f78c, _0x86f26b) {                     return _0x11f78c == _0x86f26b;                 },                 'aKrde': _0x174e3b(0x593),                 'SpsFz': function (_0x1dd988, _0x1e33e4) {                     return _0x1dd988 == _0x1e33e4;                 },                 'qbSiX': _0x174e3b(0x345),                 'qGwuT': function (_0x68e076, _0x3b4e28) {                     return _0x68e076 == _0x3b4e28;                 },                 'ViPNn': _0x174e3b(0x547),                 'cQsEU': _0x174e3b(0x27f),                 'ZditU': _0x174e3b(0x38a),                 'TIFVu': function (_0x108eec, _0x502eac) {                     return _0x108eec == _0x502eac;                 },                 'dHVbK': _0x174e3b(0x258),                 'axqrX': function (_0x400e4c, _0x44b9e9) {                     return _0x400e4c == _0x44b9e9;                 },                 'peqHB': _0x174e3b(0x1da),                 'ExIvG': _0x174e3b(0x3bd),                 'KlkRM': function (_0x3c6086, _0x23e828) {                     return _0x3c6086 == _0x23e828;                 },                 'DOixs': _0x174e3b(0x375),                 'vqkOd': function (_0xd53ecc, _0x458814) {                     return _0xd53ecc == _0x458814;                 },                 'pQVjH': _0x174e3b(0x599),                 'TVObp': function (_0xe84a42, _0x177dc5) {                     return _0xe84a42 == _0x177dc5;                 },                 'RIRfe': _0x174e3b(0x461),                 'mpHVu': function (_0x365648, _0x5d8502) {                     return _0x365648 == _0x5d8502;                 },                 'nmpps': _0x174e3b(0x506),                 'UTRNV': _0x174e3b(0x309),                 'VqxLH': function (_0x3af6f6, _0x3fd934) {                     return _0x3af6f6 == _0x3fd934;                 },                 'XDWVz': _0x174e3b(0x5db),                 'wvLvc': function (_0x33f440, _0x2ce56a) {                     return _0x33f440 == _0x2ce56a;                 },                 'LxnCq': _0x174e3b(0x20b),                 'IvnUY': _0x174e3b(0x467),                 'vuduN': _0x174e3b(0x511),                 'Ibqvj': function (_0x1b6fbf, _0x1ee75a) {                     return _0x1b6fbf == _0x1ee75a;                 },                 'cIPdK': _0x174e3b(0x37e),                 'ukQnQ': _0x174e3b(0x4a0) + _0x174e3b(0x29a) + '|3',                 'ktefn': _0x174e3b(0x557),                 'SbzEP': _0x174e3b(0x495),                 'oEucz': _0x174e3b(0x2d7),                 'lzOqK': _0x174e3b(0x27e),                 'AHSCm': _0x174e3b(0x51b),                 'oxRVw': _0x174e3b(0x5a4),                 'XlJuS': _0x174e3b(0x444),                 'gOrRI': function (_0x4529f4, _0xac2d04) {                     return _0x4529f4 == _0xac2d04;                 },                 'gYvuj': _0x174e3b(0x475),                 'LyvlU': _0x174e3b(0x2c0),                 'SJXIH': _0x174e3b(0x1ba),                 'rifAf': _0x174e3b(0x445),                 'aeNTR': function (_0x495ad2, _0x1c9292) {                     return _0x495ad2 == _0x1c9292;                 },                 'mHmCl': _0x174e3b(0x5d1),                 'PvGQj': _0x174e3b(0x303),                 'TjBUJ': function (_0xa738d, _0x6d5d46) {                     return _0xa738d == _0x6d5d46;                 },                 'LbrtY': _0x174e3b(0x4e7),                 'BeYsr': _0x174e3b(0x5cf),                 'MToue': function (_0x363deb, _0x4b363a) {                     return _0x363deb == _0x4b363a;                 },                 'dpFSK': _0x174e3b(0x217),                 'sXXMv': _0x174e3b(0x26e),                 'ONjJY': function (_0x16381f, _0x401b05) {                     return _0x16381f == _0x401b05;                 },                 'nkKaY': _0x174e3b(0x1f0),                 'cSiMb': function (_0x3c60ea, _0x37f3cf) {                     return _0x3c60ea == _0x37f3cf;                 },                 'qFeWo': _0x174e3b(0x567),                 'eYROB': _0x174e3b(0x2b1),                 'MVhIy': function (_0x372fd2, _0x1a865c) {                     return _0x372fd2 == _0x1a865c;                 },                 'fTDYX': _0x174e3b(0x3ff),                 'QKxWQ': _0x174e3b(0x5bd),                 'jAVqH': function (_0x2d2d31, _0x32c93e) {                     return _0x2d2d31 == _0x32c93e;                 },                 'RvHjm': _0x174e3b(0x405),                 'rFHAI': _0x174e3b(0x20e) + _0x174e3b(0x334) + _0x174e3b(0x487) + '1',                 'NOBoJ': _0x174e3b(0x281),                 'MJaUJ': function (_0x3adbb1, _0x631557) {                     return _0x3adbb1 == _0x631557;                 },                 'Gbcwa': _0x174e3b(0x2fb),                 'TCIHT': function (_0x391c11, _0x57c0c5) {                     return _0x391c11 == _0x57c0c5;                 },                 'tGoLH': _0x174e3b(0x2b4),                 'JIZcI': function (_0x50b0eb, _0x4a2c62) {                     return _0x50b0eb == _0x4a2c62;                 },                 'ihKOA': _0x174e3b(0x3f8),                 'YrvtY': _0x174e3b(0x308),                 'vbWWz': function (_0x4eb9fd, _0x419ccc) {                     return _0x4eb9fd == _0x419ccc;                 },                 'MXHBJ': _0x174e3b(0x219),                 'uKlpn': function (_0x142aaf, _0x35a020) {                     return _0x142aaf == _0x35a020;                 },                 'FjjRZ': _0x174e3b(0x34d),                 'Sbjiz': function (_0x3dee6a, _0x1bac59) {                     return _0x3dee6a == _0x1bac59;                 },                 'NbRHd': _0x174e3b(0x409),                 'EApnm': function (_0x5abd9d, _0x1ffd0e) {                     return _0x5abd9d == _0x1ffd0e;                 },                 'UFPKA': _0x174e3b(0x417),                 'LLYxF': _0x174e3b(0x54e),                 'gxTdk': _0x174e3b(0x50d),                 'GPckK': _0x174e3b(0x422),                 'lQMgA': _0x174e3b(0x538),                 'TxFhq': _0x174e3b(0x5dd) + _0x174e3b(0x2fa),                 'TWlpu': function (_0x4f1a34, _0x3225eb) {                     return _0x4f1a34 == _0x3225eb;                 },                 'RVIPc': _0x174e3b(0x40b) + _0x174e3b(0x2fa),                 'diCXA': function (_0xfcdb98, _0x43a980) {                     return _0xfcdb98 == _0x43a980;                 },                 'cnPLi': _0x174e3b(0x536) + _0x174e3b(0x2fa),                 'NiBBH': function (_0x580186, _0x5e1fda) {                     return _0x580186 == _0x5e1fda;                 },                 'aioCO': _0x174e3b(0x30c) + _0x174e3b(0x2fa),                 'fReom': function (_0x77b831, _0x28b22c) {                     return _0x77b831 == _0x28b22c;                 },                 'WVjIb': _0x174e3b(0x530) + _0x174e3b(0x2fa),                 'hBaxv': _0x174e3b(0x227) + _0x174e3b(0x2fa),                 'SNHJM': function (_0x3f7410, _0x369c0a) {                     return _0x3f7410 == _0x369c0a;                 },                 'RHBSg': _0x174e3b(0x1c3) + _0x174e3b(0x2fa),                 'rXAut': _0x174e3b(0x483) + _0x174e3b(0x2fa),                 'rFTTo': function (_0x6b782e, _0x26a71b) {                     return _0x6b782e + _0x26a71b;                 },                 'NYQQo': _0x174e3b(0x4ac),                 'ttNPn': _0x174e3b(0x543),                 'aAqZl': _0x174e3b(0x45d),                 'tqSel': _0x174e3b(0x2b7),                 'vtLQW': function (_0xe20de8, _0x564a6d) {                     return _0xe20de8 == _0x564a6d;                 },                 'EKfji': _0x174e3b(0x282) + _0x174e3b(0x4a1),                 'GukOi': _0x174e3b(0x366) + _0x174e3b(0x4a1),                 'TYwOy': _0x174e3b(0x1ed) + _0x174e3b(0x4a1),                 'RnFxu': function (_0x9c2531, _0x246add) {                     return _0x9c2531 == _0x246add;                 },                 'Tijcy': _0x174e3b(0x498) + _0x174e3b(0x4a1),                 'DMvLN': _0x174e3b(0x1e5),                 'wGlqc': _0x174e3b(0x531),                 'YOszl': _0x174e3b(0x4ed),                 'qTzny': function (_0x37683e, _0x3b504c) {                     return _0x37683e - _0x3b504c;                 },                 'yORdr': _0x174e3b(0x33c),                 'mQkfW': _0x174e3b(0x27b) + '4',                 'Txxtm': _0x174e3b(0x418) + '1',                 'LAXPo': _0x174e3b(0x387) + _0x174e3b(0x3c5) + _0x174e3b(0x56e) + 'fa',                 'FLjje': function (_0x4238bc, _0x127a6d) {                     return _0x4238bc == _0x127a6d;                 },                 'YoaZO': _0x174e3b(0x390),                 'BBVId': _0x174e3b(0x356) + _0x174e3b(0x546),                 'OeUHH': function (_0xc4c9c4, _0x349a1c) {                     return _0xc4c9c4 == _0x349a1c;                 },                 'HXlyb': _0x174e3b(0x321),                 'WQUJo': _0x174e3b(0x4b8) + '4',                 'nZGoj': _0x174e3b(0x399) + _0x174e3b(0x50a) + _0x174e3b(0x33d) + 'b3',                 'xtgyY': _0x174e3b(0x305),                 'zruva': _0x174e3b(0x4b8) + '3',                 'QXUnT': _0x174e3b(0x52c) + _0x174e3b(0x1c9) + _0x174e3b(0x4b1) + 'e4',                 'UbEWq': _0x174e3b(0x1a3),                 'eHpoy': _0x174e3b(0x4b8) + '2',                 'xcgiO': _0x174e3b(0x4f5) + _0x174e3b(0x4ff) + _0x174e3b(0x5a8) + '6c',                 'aInjU': _0x174e3b(0x236),                 'miRHr': _0x174e3b(0x4b8) + '1',                 'KKmsn': _0x174e3b(0x3c4) + _0x174e3b(0x528) + _0x174e3b(0x58a) + '29',                 'MBcSQ': function (_0x2b0792, _0x160393) {                     return _0x2b0792 == _0x160393;                 },                 'xldzG': _0x174e3b(0x2a4),                 'ESDSV': _0x174e3b(0x4b8) + '6',                 'BYCHW': _0x174e3b(0x440) + _0x174e3b(0x45e) + _0x174e3b(0x533) + '44',                 'uMtls': function (_0x1a74d2, _0x39661b) {                     return _0x1a74d2 == _0x39661b;                 },                 'uuOeN': _0x174e3b(0x47d),                 'brAlK': _0x174e3b(0x4b8) + '5',                 'CafNU': _0x174e3b(0x2ce) + _0x174e3b(0x59c) + _0x174e3b(0x3ac) + '78',                 'uNfyP': _0x174e3b(0x40f) + _0x174e3b(0x2b2) + 'o',                 'CRArW': _0x174e3b(0x59f) + '事件',                 'JuSIe': function (_0x157cea, _0xa5ddb3) {                     return _0x157cea == _0xa5ddb3;                 },                 'nQJCQ': _0x174e3b(0x5d8) + _0x174e3b(0x4a1),                 'qRjmO': function (_0xa540b9, _0xd730a0) {                     return _0xa540b9 == _0xd730a0;                 },                 'rrTdL': _0x174e3b(0x3b3) + _0x174e3b(0x4a1),                 'baPYo': _0x174e3b(0x5a0),                 'sfBjh': function (_0x324123, _0x251aad) {                     return _0x324123 == _0x251aad;                 },                 'itzip': _0x174e3b(0x504),                 'somVR': function (_0x59f210, _0x369c28) {                     return _0x59f210 == _0x369c28;                 },                 'EhKqF': _0x174e3b(0x569),                 'MEYgg': _0x174e3b(0x343),                 'oeSJR': function (_0x10eafe, _0x3f805e) {                     return _0x10eafe == _0x3f805e;                 },                 'eCEje': function (_0x39ee7d, _0x3be6ef) {                     return _0x39ee7d == _0x3be6ef;                 },                 'SbeKi': _0x174e3b(0x2b9) + _0x174e3b(0x4a1),                 'uWADt': _0x174e3b(0x395) + _0x174e3b(0x4a1),                 'EgmJF': function (_0x26de67, _0x684ae) {                     return _0x26de67 == _0x684ae;                 },                 'gJmbd': _0x174e3b(0x3c2),                 'QaLDi': function (_0xeff816, _0x588fe6) {                     return _0xeff816 == _0x588fe6;                 },                 'etXwu': _0x174e3b(0x1b0),                 'uopOC': function (_0x24ef32, _0x14fb6c) {                     return _0x24ef32 == _0x14fb6c;                 },                 'quXiJ': _0x174e3b(0x1d4) + _0x174e3b(0x39a),                 'mNgYR': function (_0x845734, _0x50c839) {                     return _0x845734 == _0x50c839;                 },                 'BEdHW': _0x174e3b(0x1d2) + _0x174e3b(0x39a),                 'WCTou': _0x174e3b(0x1cb) + _0x174e3b(0x1dc),                 'MTdZg': _0x174e3b(0x522) + _0x174e3b(0x1dc),                 'pwSoM': function (_0x35962e, _0x2ad790) {                     return _0x35962e == _0x2ad790;                 },                 'mBxcc': _0x174e3b(0x248),                 'cVbCu': _0x174e3b(0x30d),                 'fNoev': function (_0x952964, _0x348fdc) {                     return _0x952964 == _0x348fdc;                 },                 'BevVz': _0x174e3b(0x346) + _0x174e3b(0x406),                 'wwuik': function (_0x31e6e6, _0x13d0ea) {                     return _0x31e6e6 == _0x13d0ea;                 },                 'KEUqa': _0x174e3b(0x2d1) + _0x174e3b(0x406),                 'Rhxqn': function (_0x228888, _0x4c6bfa) {                     return _0x228888 == _0x4c6bfa;                 },                 'QRMLw': _0x174e3b(0x21b),                 'ibAmb': function (_0x5edd1c, _0x5e9135) {                     return _0x5edd1c == _0x5e9135;                 },                 'IFgPt': _0x174e3b(0x39b),                 'bjnee': function (_0x31d04d, _0x23b13e) {                     return _0x31d04d == _0x23b13e;                 },                 'PjCAM': function (_0x55d800, _0x4434d4) {                     return _0x55d800 == _0x4434d4;                 },                 'XXAve': _0x174e3b(0x514),                 'vBQyA': function (_0x2e62b3, _0x5b72a0) {                     return _0x2e62b3 == _0x5b72a0;                 },                 'lzXYl': _0x174e3b(0x4db),                 'Xsxeb': _0x174e3b(0x311),                 'TigLk': _0x174e3b(0x2c5),                 'iEzus': function (_0x39bb5b, _0x35f7ab) {                     return _0x39bb5b == _0x35f7ab;                 },                 'qMsMs': _0x174e3b(0x30f),                 'wYqhq': _0x174e3b(0x588),                 'bDSQH': function (_0x9452c4, _0x154f2f) {                     return _0x9452c4 == _0x154f2f;                 },                 'fLONV': _0x174e3b(0x318),                 'PZitg': function (_0x2c3bd3, _0x136b10) {                     return _0x2c3bd3 == _0x136b10;                 },                 'ezqwn': _0x174e3b(0x29d),                 'xsMLV': function (_0x1c7e64, _0x45b679) {                     return _0x1c7e64 == _0x45b679;                 },                 'ccOyc': function (_0x2e48a1, _0x45ef74) {                     return _0x2e48a1 == _0x45ef74;                 },                 'SwRwu': function (_0xd97b99, _0x2e964c) {                     return _0xd97b99 == _0x2e964c;                 },                 'LfBLq': function (_0x29c1ab, _0x5a79ef) {                     return _0x29c1ab == _0x5a79ef;                 },                 'oHdqx': _0x174e3b(0x46d),                 'gwACG': function (_0x1c87cc, _0x5dc74c) {                     return _0x1c87cc == _0x5dc74c;                 },                 'gEiRV': _0x174e3b(0x371),                 'ZRLeC': function (_0x3cd84c, _0x12444c) {                     return _0x3cd84c == _0x12444c;                 },                 'PneSA': _0x174e3b(0x508),                 'rVMPp': function (_0x275029, _0x12ec84) {                     return _0x275029 == _0x12ec84;                 },                 'EQtXT': _0x174e3b(0x5d7),                 'LsPUm': function (_0x464ee5, _0x3fc035) {                     return _0x464ee5 == _0x3fc035;                 },                 'mhrMy': _0x174e3b(0x20d),                 'sUYKv': function (_0xccc6d8, _0x26882f) {                     return _0xccc6d8 == _0x26882f;                 },                 'SpjRB': _0x174e3b(0x266),                 'NRbef': _0x174e3b(0x24c),                 'xXYiL': _0x174e3b(0x4ab),                 'ApOuP': _0x174e3b(0x298),                 'LOsbk': _0x174e3b(0x430),                 'wpfLE': _0x174e3b(0x443),                 'cOJPs': _0x174e3b(0x41c),                 'FRwAB': function (_0x45b327, _0x5b54a3) {                     return _0x45b327 == _0x5b54a3;                 },                 'Jwbok': _0x174e3b(0x452),                 'Tjuxj': function (_0x2a1955, _0x32061a) {                     return _0x2a1955 == _0x32061a;                 },                 'XaYQP': _0x174e3b(0x2a2),                 'JKZrD': function (_0x1104d8, _0xab8892) {                     return _0x1104d8 == _0xab8892;                 },                 'kYzmx': _0x174e3b(0x513),                 'JYCjg': _0x174e3b(0x441),                 'ZLbsJ': function (_0x2772ed, _0x2484b4) {                     return _0x2772ed == _0x2484b4;                 },                 'hriRQ': function (_0x295e7a, _0x17cfae) {                     return _0x295e7a == _0x17cfae;                 },                 'ToxEz': _0x174e3b(0x1f4),                 'IbKUn': _0x174e3b(0x225),                 'iDpyP': _0x174e3b(0x319) + _0x174e3b(0x32d),                 'LPIHa': _0x174e3b(0x45b),                 'ccvXO': _0x174e3b(0x456),                 'aYXBN': _0x174e3b(0x319) + _0x174e3b(0x2e4),                 'kEqzf': function (_0x4f6987, _0x4fc454) {                     return _0x4f6987 == _0x4fc454;                 },                 'MzSEb': _0x174e3b(0x52a),                 'MbJPP': _0x174e3b(0x319) + _0x174e3b(0x24f),                 'CuEZU': _0x174e3b(0x46a),                 'tpOzo': _0x174e3b(0x571),                 'yXlLG': _0x174e3b(0x56b) + _0x174e3b(0x56a),                 'PPgLF': _0x174e3b(0x2e8),                 'PPzPd': _0x174e3b(0x4cd),                 'BiBfO': _0x174e3b(0x5d2) + _0x174e3b(0x1a9),                 'RnGrG': function (_0xc4e908, _0x1a15e9) {                     return _0xc4e908 == _0x1a15e9;                 },                 'NOTqy': _0x174e3b(0x2c3),                 'OEAqk': _0x174e3b(0x2ac),                 'SkkdS': _0x174e3b(0x319) + _0x174e3b(0x4e2),                 'mQImo': function (_0xff873d, _0x5f1149) {                     return _0xff873d == _0x5f1149;                 },                 'EOcVk': _0x174e3b(0x55b),                 'lHgFK': _0x174e3b(0x2fd),                 'jGyjG': _0x174e3b(0x275) + _0x174e3b(0x541),                 'YAtLS': function (_0x3564fd, _0xd6f069) {                     return _0x3564fd == _0xd6f069;                 },                 'srLRN': _0x174e3b(0x1ab),                 'JRGAC': _0x174e3b(0x577),                 'tyCCg': _0x174e3b(0x275) + _0x174e3b(0x3f6),                 'GhMIv': function (_0x25a147, _0x18ab23) {                     return _0x25a147 == _0x18ab23;                 },                 'qVeYO': _0x174e3b(0x3d1),                 'Kojzb': _0x174e3b(0x201),                 'aFADH': _0x174e3b(0x275) + _0x174e3b(0x28c),                 'QQPYa': _0x174e3b(0x1ef),                 'SHoRz': _0x174e3b(0x519),                 'BzQMW': _0x174e3b(0x319) + _0x174e3b(0x580),                 'lxjwg': function (_0x18ef95, _0x3c238c) {                     return _0x18ef95 == _0x3c238c;                 },                 'jhQeD': _0x174e3b(0x49f),                 'vWAHv': _0x174e3b(0x275) + _0x174e3b(0x4df),                 'fLqPB': _0x174e3b(0x42f),                 'fGseT': _0x174e3b(0x269),                 'zkrnG': _0x174e3b(0x319) + _0x174e3b(0x1e3),                 'PeOWI': function (_0x16ec49, _0xe4a0df) {                     return _0x16ec49 == _0xe4a0df;                 },                 'WCQbS': _0x174e3b(0x364),                 'DFMCj': _0x174e3b(0x5fa),                 'WHYln': _0x174e3b(0x275) + _0x174e3b(0x3f5),                 'ebFRw': _0x174e3b(0x3fd),                 'lahpl': _0x174e3b(0x5b9),                 'MCDKA': _0x174e3b(0x275) + _0x174e3b(0x5e6),                 'PLkdR': function (_0x3c56f7, _0x33f413) {                     return _0x3c56f7 == _0x33f413;                 },                 'cyjKX': _0x174e3b(0x2ef),                 'NJHZc': _0x174e3b(0x1c2),                 'FsReD': _0x174e3b(0x275) + _0x174e3b(0x41d),                 'gvpnq': function (_0x3bcbfd, _0xf2715e) {                     return _0x3bcbfd == _0xf2715e;                 },                 'aBLRN': _0x174e3b(0x295),                 'YiUVQ': _0x174e3b(0x455),                 'ZGMYJ': _0x174e3b(0x319) + _0x174e3b(0x36e),                 'CfYpH': _0x174e3b(0x19b),                 'KkARW': _0x174e3b(0x373),                 'qSZSk': _0x174e3b(0x286) + _0x174e3b(0x4a3),                 'Ddxbe': _0x174e3b(0x4ce),                 'FzVqk': _0x174e3b(0x59e),                 'IufMa': _0x174e3b(0x3ba) + _0x174e3b(0x1a6),                 'skCCE': function (_0x5d9487, _0x203fda) {                     return _0x5d9487 == _0x203fda;                 },                 'hFvsf': _0x174e3b(0x564),                 'dIwgQ': _0x174e3b(0x5d0),                 'bvLYI': _0x174e3b(0x397) + _0x174e3b(0x2d6),                 'FBnLv': _0x174e3b(0x550),                 'oysxE': _0x174e3b(0x559),                 'wpgMi': _0x174e3b(0x363) + _0x174e3b(0x474),                 'Rgwlx': _0x174e3b(0x374),                 'DyiQk': _0x174e3b(0x209),                 'ibNeJ': _0x174e3b(0x3ba) + _0x174e3b(0x26c),                 'vnJFp': function (_0x47e95d, _0x328b0f) {                     return _0x47e95d == _0x328b0f;                 },                 'freLm': _0x174e3b(0x4d3),                 'YqmvN': _0x174e3b(0x1f1),                 'kwwlj': _0x174e3b(0x2a7) + _0x174e3b(0x1f6),                 'YxpRv': _0x174e3b(0x5f6),                 'WHmuq': _0x174e3b(0x38f) + _0x174e3b(0x41b),                 'SniHN': function (_0x5dfc87, _0x2596bf) {                     return _0x5dfc87 == _0x2596bf;                 },                 'EbhzF': _0x174e3b(0x453),                 'DuYqu': _0x174e3b(0x3bf),                 'uaZbj': _0x174e3b(0x3ba) + _0x174e3b(0x426),                 'INWaG': function (_0x2b62e1, _0x4a64f7) {                     return _0x2b62e1 == _0x4a64f7;                 },                 'BZolA': _0x174e3b(0x4ca),                 'rfYnr': _0x174e3b(0x4c8),                 'SSfKJ': _0x174e3b(0x51a) + _0x174e3b(0x29e),                 'Jkphs': function (_0x2c7b58, _0x1c9293) {                     return _0x2c7b58 == _0x1c9293;                 },                 'bqjfX': _0x174e3b(0x4d5),                 'VzvsG': _0x174e3b(0x523),                 'qeexp': _0x174e3b(0x380) + _0x174e3b(0x271),                 'rzuxd': _0x174e3b(0x285),                 'vTaWL': _0x174e3b(0x229),                 'djzEh': _0x174e3b(0x482) + _0x174e3b(0x55c),                 'qckbw': function (_0x25a28b, _0x5eea64) {                     return _0x25a28b == _0x5eea64;                 },                 'Javbn': _0x174e3b(0x30a),                 'FDDzJ': _0x174e3b(0x5ad),                 'qthtQ': _0x174e3b(0x496) + _0x174e3b(0x525),                 'NdLTp': function (_0x360694, _0x1f1298) {                     return _0x360694 == _0x1f1298;                 },                 'ljSIh': _0x174e3b(0x3f0),                 'TnmCC': _0x174e3b(0x44d),                 'ibXtN': _0x174e3b(0x4fb) + _0x174e3b(0x257),                 'iawAV': function (_0x4b27c7, _0x180202) {                     return _0x4b27c7 == _0x180202;                 },                 'atfZt': _0x174e3b(0x1d8),                 'cSBci': _0x174e3b(0x499),                 'HNdMv': _0x174e3b(0x5e9) + _0x174e3b(0x585),                 'WvIzp': function (_0x3d2060, _0x41f9c1) {                     return _0x3d2060 == _0x41f9c1;                 },                 'RyORy': _0x174e3b(0x50e),                 'pKKcU': _0x174e3b(0x5e5),                 'lehYd': _0x174e3b(0x3f3) + _0x174e3b(0x2f7),                 'NfwIQ': function (_0x43c37c, _0x28a30e) {                     return _0x43c37c == _0x28a30e;                 },                 'nKURj': function (_0x2e944a, _0x4489fe) {                     return _0x2e944a == _0x4489fe;                 },                 'VhbiB': function (_0xed7a11, _0x3355f3) {                     return _0xed7a11 == _0x3355f3;                 },                 'sKbhB': _0x174e3b(0x358),                 'soXme': function (_0x5cd789, _0x553b2) {                     return _0x5cd789 == _0x553b2;                 },                 'XlJCS': _0x174e3b(0x50f),                 'ilddj': _0x174e3b(0x22b),                 'PsPKi': _0x174e3b(0x402),                 'qpyAD': _0x174e3b(0x296),                 'qBUUZ': function (_0x502bd6, _0x460f8a) {                     return _0x502bd6 == _0x460f8a;                 },                 'eKgUO': _0x174e3b(0x25b),                 'ZVSnY': function (_0x39be8c, _0x4c2a7f) {                     return _0x39be8c == _0x4c2a7f;                 },                 'frnaD': _0x174e3b(0x413),                 'vQzYR': function (_0x2b3b51, _0x40b9e7) {                     return _0x2b3b51 == _0x40b9e7;                 },                 'WAmAp': _0x174e3b(0x47a),                 'MfOkv': function (_0x221dca, _0x12bba3) {                     return _0x221dca == _0x12bba3;                 },                 'HWfwA': _0x174e3b(0x1d1),                 'kjBeC': function (_0x194351, _0xfd324f) {                     return _0x194351 == _0xfd324f;                 },                 'sdYrF': _0x174e3b(0x507),                 'ZLbYc': function (_0x1b5a03, _0x587bcc) {                     return _0x1b5a03 == _0x587bcc;                 },                 'nRskf': _0x174e3b(0x3d9),                 'QMLVG': _0x174e3b(0x561),                 'ebIWg': _0x174e3b(0x468),                 'ZDMqd': function (_0x26ea3f, _0x323c45) {                     return _0x26ea3f == _0x323c45;                 },                 'xaaJW': _0x174e3b(0x57a),                 'cQzbt': function (_0x129667, _0x1913b3) {                     return _0x129667 == _0x1913b3;                 },                 'NavBg': _0x174e3b(0x2af),                 'RYAeN': function (_0x186d47, _0x11ef48) {                     return _0x186d47 == _0x11ef48;                 },                 'hhmwk': _0x174e3b(0x4a4),                 'fLMFq': _0x174e3b(0x5ae),                 'AglNq': _0x174e3b(0x454) + _0x174e3b(0x46f) + _0x174e3b(0x341) + _0x174e3b(0x5fc) + _0x174e3b(0x1d0),                 'cdSYA': _0x174e3b(0x1b4),                 'zyirY': _0x174e3b(0x1ac),                 'krvxL': _0x174e3b(0x231),                 'Rbpee': _0x174e3b(0x4af),                 'DIlyA': function (_0x1db1bb, _0x58c851) {                     return _0x1db1bb == _0x58c851;                 },                 'cfrGI': _0x174e3b(0x40c),                 'oNkNz': _0x174e3b(0x58b),                 'VBIsP': _0x174e3b(0x480),                 'glgbS': function (_0x2d8738, _0x102118) {                     return _0x2d8738 == _0x102118;                 },                 'EyvEP': _0x174e3b(0x524),                 'CxyFL': function (_0x2f7378, _0x46f1f6) {                     return _0x2f7378 == _0x46f1f6;                 },                 'TDCvk': _0x174e3b(0x500),                 'KsaLL': function (_0x16747a, _0x3a7579) {                     return _0x16747a == _0x3a7579;                 },                 'jXfGQ': _0x174e3b(0x5bf),                 'HPHwX': function (_0x408339, _0x481ed0) {                     return _0x408339 == _0x481ed0;                 },                 'Zkdoe': _0x174e3b(0x5d4),                 'Vyiwx': _0x174e3b(0x43a),                 'geCNo': function (_0x2e1bbd, _0x20a76a) {                     return _0x2e1bbd == _0x20a76a;                 },                 'NXtdp': _0x174e3b(0x5a3),                 'EdREB': _0x174e3b(0x224),                 'TcBZH': function (_0x111dd0, _0xadc7f9) {                     return _0x111dd0 == _0xadc7f9;                 },                 'mWNbn': _0x174e3b(0x447),                 'ujVpm': function (_0x39ffbb, _0x51a20b) {                     return _0x39ffbb == _0x51a20b;                 },                 'ARsuj': _0x174e3b(0x45c),                 'ZKyJF': _0x174e3b(0x4ba),                 'FihVD': function (_0x5c3910, _0x25bddf) {                     return _0x5c3910 == _0x25bddf;                 },                 'Nucuu': function (_0x2de9ef, _0x4a742c) {                     return _0x2de9ef == _0x4a742c;                 },                 'xkOsP': function (_0x4c9809, _0x4a123d) {                     return _0x4c9809 == _0x4a123d;                 },                 'XTcOQ': _0x174e3b(0x572),                 'mZFal': function (_0x3f8124, _0x2e9bff) {                     return _0x3f8124 == _0x2e9bff;                 },                 'KRXmz': function (_0x230809, _0x5886bb) {                     return _0x230809 == _0x5886bb;                 },                 'hwtdu': function (_0x590065, _0x5181d3) {                     return _0x590065 - _0x5181d3;                 },                 'bXJjC': function (_0xeb7757, _0xb1ac95) {                     return _0xeb7757 - _0xb1ac95;                 },                 'XbQyw': function (_0x5f19fa, _0x1cd911, _0x22b33e) {                     return _0x5f19fa(_0x1cd911, _0x22b33e);                 },                 'qavfY': _0x174e3b(0x37c),                 'GEVqx': _0x174e3b(0x312) + _0x174e3b(0x5cb),                 'dJMyz': function (_0x291a23, _0x1b06c2) {                     return _0x291a23 == _0x1b06c2;                 },                 'YipIh': function (_0x129890, _0x2e859f) {                     return _0x129890 == _0x2e859f;                 }             };         if (_0xaa7790[_0x174e3b(0x415)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x4d2)]))             _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0xbc3 + -0x25e8 + -0x1 * -0x1a2f, -0x19a9 + 0x18 * 0x2 + 0x3a5 * 0x7, -0x2063 + 0x3 * 0x979 + 0x402), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x8 * -0x397 + 0x1185 + 0xf1b;         else {             if (_0xaa7790[_0x174e3b(0x1e8)](_0x3ce9c0[_0x174e3b(0x598)], '报警'))                 _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0x1 * -0x1fa5 + -0x44 * 0x6f + -0x8bd * -0x7, -0xf4d + -0x2f5 + 0x124c, 0x1c27 * 0x1 + 0x9fb + -0x2618), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x1 * 0x1292 + -0x772 + -0x738;             else {                 if (_0xaa7790[_0x174e3b(0x386)](_0x3ce9c0[_0x174e3b(0x598)], '草坪'))                     _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0x1f5c + 0xb6f * -0x2 + -0x4 * 0x21d, 0x1ee3 + -0x1235 + -0xca4, -0x3e8 * 0x5 + 0x2558 + -0x11c6), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x1 * 0x1a88 + 0x1 * -0xf9a + -0x2 * 0x383;                 else {                     if (_0xaa7790[_0x174e3b(0x576)](_0x3ce9c0[_0x174e3b(0x598)], '地面'))                         _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0x182a + -0x1e52 * -0x1 + -0x20a * 0x3, 0x4f * -0x11 + 0x1 * -0x20ec + 0x1 * 0x2635, 0x1 * -0x1b63 + 0x1135 + 0x2 * 0x51c), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = -0x1c71 * -0x1 + 0x2 * 0x498 + -0x21b9;                     else {                         if (_0xaa7790[_0x174e3b(0x5c8)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x1f9)]))                             _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0x25e6 + -0x163c + 0x3c2c, -0x122f + 0x194 * -0x2 + 0x1561, -0x1 * 0x1237 + 0xbd6 + 0x1 * 0x66b), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x2549 + 0x7f7 * -0x3 + -0x97c;                         else {                             if (_0xaa7790[_0x174e3b(0x310)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x4ef)]))                                 _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0x95 * 0x2 + -0x28f * 0x1 + -0x1 * -0x3c3, -0xf37 + -0x1 * 0xd01 + 0x1c42, 0x3a6 * -0x4 + -0x2096 + 0xbce * 0x4), _0x3ce9c0[_0x174e3b(0x2bc)] = ![], _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x1a52 + -0x21e3 + -0x10b * -0xb, locationFloor = _0x3ce9c0;                             else {                                 if (_0xaa7790[_0x174e3b(0x534)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x439)]))                                     _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0xddc * 0x2 + 0x682 + -0x2230, 0x21a6 + 0x26f8 + 0x14 * -0x3a1, -0xb72 + 0x18a4 + -0xd28), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = -0x153 * -0x7 + -0x1014 + 0xab7, duishichang1Room = _0x3ce9c0, allRoomObjs[_0x174e3b(0x537)](_0x3ce9c0);                                 else {                                     if (_0xaa7790[_0x174e3b(0x46b)](_0x3ce9c0[_0x174e3b(0x598)], '管道'))                                         _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0x14c1 + -0x916 + -0xe5 * 0xd, 0x1dae + -0x250c + 0x768, -0xfc6 + 0x4da + -0x2 * -0x57b), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x2 * -0x641 + 0xf * -0x19 + 0x11e1, GDmodel = _0x3ce9c0, _0x3ce9c0[_0x174e3b(0x4aa)](_0x3bc6b1 => {                                             const _0x5e3a7e = _0x174e3b, _0x15d05e = {                                                     'WtiNG': function (_0x5c1ccc, _0x67db2e) {                                                         const _0x2fbc1a = _0x56db;                                                         return _0xaa7790[_0x2fbc1a(0x4e1)](_0x5c1ccc, _0x67db2e);                                                     },                                                     'GSlSB': _0xaa7790[_0x5e3a7e(0x505)],                                                     'aahML': _0xaa7790[_0x5e3a7e(0x379)],                                                     'BsKTV': function (_0x57baba, _0x5ae8bd) {                                                         const _0x37aa5d = _0x5e3a7e;                                                         return _0xaa7790[_0x37aa5d(0x437)](_0x57baba, _0x5ae8bd);                                                     },                                                     'OcccI': _0xaa7790[_0x5e3a7e(0x31b)],                                                     'LOcSD': function (_0x2b1e3d, _0x55f70d) {                                                         const _0x3132e5 = _0x5e3a7e;                                                         return _0xaa7790[_0x3132e5(0x548)](_0x2b1e3d, _0x55f70d);                                                     },                                                     'goHlQ': _0xaa7790[_0x5e3a7e(0x31d)],                                                     'rYuRq': _0xaa7790[_0x5e3a7e(0x2fe)],                                                     'oweug': function (_0x230da2, _0x729049) {                                                         const _0x117793 = _0x5e3a7e;                                                         return _0xaa7790[_0x117793(0x40d)](_0x230da2, _0x729049);                                                     },                                                     'nAKNe': _0xaa7790[_0x5e3a7e(0x492)],                                                     'rfNxd': _0xaa7790[_0x5e3a7e(0x5c1)]                                                 };                                             _0xaa7790[_0x5e3a7e(0x55a)](_0x3bc6b1[_0x5e3a7e(0x31e)], _0xaa7790[_0x5e3a7e(0x3ae)]) && (_0xaa7790[_0x5e3a7e(0x3fa)](_0x3bc6b1[_0x5e3a7e(0x598)], '管道') && _0x3bc6b1[_0x5e3a7e(0x4aa)](_0x2b87a4 => {                                                 const _0x3bc464 = _0x5e3a7e;                                                 if (_0x15d05e[_0x3bc464(0x21a)](_0x2b87a4[_0x3bc464(0x598)], _0x15d05e[_0x3bc464(0x408)]))                                                     GDoutboxYSKQ = _0x2b87a4;                                                 else {                                                     if (_0x15d05e[_0x3bc464(0x21a)](_0x2b87a4[_0x3bc464(0x598)], '水管'))                                                         GDoutboxSG = _0x2b87a4;                                                     else {                                                         if (_0x15d05e[_0x3bc464(0x21a)](_0x2b87a4[_0x3bc464(0x598)], _0x15d05e[_0x3bc464(0x53e)]))                                                             GDoutboxSS = _0x2b87a4;                                                         else {                                                             if (_0x15d05e[_0x3bc464(0x1eb)](_0x2b87a4[_0x3bc464(0x598)], _0x15d05e[_0x3bc464(0x1fe)]))                                                                 GDoutboxLZFJ = _0x2b87a4;                                                             else {                                                                 if (_0x15d05e[_0x3bc464(0x3c0)](_0x2b87a4[_0x3bc464(0x598)], _0x15d05e[_0x3bc464(0x43d)]))                                                                     GDoutboxDQ = _0x2b87a4;                                                                 else {                                                                     if (_0x15d05e[_0x3bc464(0x3c0)](_0x2b87a4[_0x3bc464(0x598)], _0x15d05e[_0x3bc464(0x3b1)]))                                                                         GDoutboxCXFFJ = _0x2b87a4;                                                                     else                                                                         (_0x15d05e[_0x3bc464(0x5b8)](_0x2b87a4[_0x3bc464(0x598)], _0x15d05e[_0x3bc464(0x41a)]) || _0x15d05e[_0x3bc464(0x21a)](_0x2b87a4[_0x3bc464(0x598)], _0x15d05e[_0x3bc464(0x23f)])) && GDotherBox[_0x3bc464(0x537)](_0x2b87a4);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }), _0xaa7790[_0x5e3a7e(0x56c)](_0x3bc6b1[_0x5e3a7e(0x598)], _0xaa7790[_0x5e3a7e(0x1c5)]) && (_0x3bc6b1[_0x5e3a7e(0x2bc)] = ![], _0x3bc6b1[_0x5e3a7e(0x4aa)](_0x28c735 => {                                                 const _0x47b1b1 = _0x5e3a7e;                                                 if (_0xaa7790[_0x47b1b1(0x3fa)](_0x28c735[_0x47b1b1(0x598)], _0xaa7790[_0x47b1b1(0x59a)]))                                                     GDmovingCXFFJ = _0x28c735;                                                 else {                                                     if (_0xaa7790[_0x47b1b1(0x3f7)](_0x28c735[_0x47b1b1(0x598)], _0xaa7790[_0x47b1b1(0x4eb)]))                                                         GDmovingSS = _0x28c735;                                                     else {                                                         if (_0xaa7790[_0x47b1b1(0x3fa)](_0x28c735[_0x47b1b1(0x598)], _0xaa7790[_0x47b1b1(0x3e9)]))                                                             GDmovingLZFJ = _0x28c735;                                                         else {                                                             if (_0xaa7790[_0x47b1b1(0x56c)](_0x28c735[_0x47b1b1(0x598)], _0xaa7790[_0x47b1b1(0x35d)]))                                                                 GDmovingYSKQ = _0x28c735;                                                             else {                                                                 if (_0xaa7790[_0x47b1b1(0x56c)](_0x28c735[_0x47b1b1(0x598)], _0xaa7790[_0x47b1b1(0x42e)]))                                                                     GDmovingSG = _0x28c735;                                                                 else                                                                     _0xaa7790[_0x47b1b1(0x21d)](_0x28c735[_0x47b1b1(0x598)], _0xaa7790[_0x47b1b1(0x1f8)]) && (GDmovingDQ = _0x28c735);                                                             }                                                         }                                                     }                                                 }                                                 _0x28c735[_0x47b1b1(0x5c2)] && (_0x28c735[_0x47b1b1(0x1f2)][_0x47b1b1(0x47b)] = null, _0x28c735[_0x47b1b1(0x1f2)][_0x47b1b1(0x47c) + 't'] = !![], _0x28c735[_0x47b1b1(0x1f2)][_0x47b1b1(0x1e2)] = ![], _0x28c735[_0x47b1b1(0x57e) + 'r'] = 0x1 * -0xe9d + -0x832 + 0xa35 * 0x3);                                             })));                                         });                                     else {                                         if (_0xaa7790[_0x174e3b(0x2b8)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x48d)]))                                             _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0x790 * -0x4 + 0x1a62 + -0x2 * -0x1f4, -0xc * 0x239 + -0x2cd * 0x4 + 0x25ea, -0x13bb + -0x131e + 0x26e3), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = -0x139a + -0x36 * 0x35 + -0x25 * -0xf0, junhuaRoom = _0x3ce9c0, allRoomObjs[_0x174e3b(0x537)](_0x3ce9c0);                                         else {                                             if (_0xaa7790[_0x174e3b(0x28d)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x2de)])) {                                                 const _0x122422 = _0xaa7790[_0x174e3b(0x1e1)][_0x174e3b(0x1a5)]('|');                                                 let _0x501474 = 0x1223 + -0x1502 + -0x5 * -0x93;                                                 while (!![]) {                                                     switch (_0x122422[_0x501474++]) {                                                     case '0':                                                         limoRoom = _0x3ce9c0;                                                         continue;                                                     case '1':                                                         _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0x1e7f + 0x1aff + -0x3974, -0x8 * 0x38 + 0x2262 + 0x413 * -0x8, 0x1a5d * 0x1 + -0x66c + -0x13e7);                                                         continue;                                                     case '2':                                                         _0x3ce9c0[_0x174e3b(0x4aa)](_0x32ab79 => {                                                             const _0x4ce7c6 = _0x174e3b;                                                             _0xaa7790[_0x4ce7c6(0x4e1)](_0x32ab79[_0x4ce7c6(0x31e)], _0xaa7790[_0x4ce7c6(0x3ae)]) && (_0xaa7790[_0x4ce7c6(0x548)](_0x32ab79[_0x4ce7c6(0x598)], _0xaa7790[_0x4ce7c6(0x4fc)]) && (_0x32ab79[_0x4ce7c6(0x2bc)] = ![]));                                                         });                                                         continue;                                                     case '3':                                                         allRoomObjs[_0x174e3b(0x537)](_0x3ce9c0);                                                         continue;                                                     case '4':                                                         _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x1370 + -0x168 + -0xe20;                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0xaa7790[_0x174e3b(0x2f2)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x4fc)])) {                                                     moveingRobot = _0x3ce9c0, _0x3ce9c0[_0x174e3b(0x476)][_0x174e3b(0x3be)] = 0xc * 0x2ba + -0x25ff + -0x1a * -0x34, _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0xbc7 + 0x5db + 0x466 * -0x4, -0x5f5 + 0x1935 + 0x1336 * -0x1, -0x409 * -0x3 + 0x1 * -0x2e + -0xbe3), _0x3ce9c0[_0x174e3b(0x3a0)][_0x174e3b(0x465)](-(-0x2632 * 0x1 + -0x7ea + 0x3a7a + 0.6799999999998363), _0xaa7790[_0x174e3b(0x384)](-0x1d80 + -0x1270 + 0x30c6 + 0.6399999999999864, -0x102f + 0x4 * 0x7a + -0x76 * -0x1f + 0.33000000000000007), -(-0x2 * -0xa1 + 0xd * -0x5e + -0x4b2 * -0x2 + 0.029999999999972715)), _0x3ce9c0[_0x174e3b(0x317)](-(0x138 + -0xf * 0x227 + -0x2c1b * -0x1 + 0.21000000000003638), _0xaa7790[_0x174e3b(0x268)](-0x2287 + -0xb7 * -0x17 + 0x2b4 * 0x7 + 0.6399999999999864, -0x17 * 0x97 + 0xf1 * -0x25 + 0x3069 + 0.33000000000000007), -(-0xbe4 + 0x39 * -0x90 + 0x31d3 + 0.9500000000000455));                                                     let _0x493774 = new THREE[(_0x174e3b(0x2f6)) + (_0x174e3b(0x400))](0x18ca + -0x1 * -0xb3 + -0x197c * 0x1, 0x1 * 0x1038 + 0x1 * -0x18fd + -0x1 * -0x8c6), _0x3aba60 = new THREE[(_0x174e3b(0x4a2)) + (_0x174e3b(0x462))]({                                                             'color': 0xffff00,                                                             'side': THREE[_0x174e3b(0x5f2)]                                                         }), _0x55412d = new THREE[(_0x174e3b(0x351))](_0x493774, _0x3aba60);                                                     _0x55412d[_0x174e3b(0x598)] = _0xaa7790[_0x174e3b(0x3c1)], _0x55412d[_0x174e3b(0x3a0)][_0x174e3b(0x465)](0xcb * 0x23 + -0x1b28 + 0x4 * -0x25, -0x2 * -0xc86 + -0x5 * 0x40e + -0x4be * 0x1, 0xc95 * -0x2 + 0x371 + 0x15b9), _0x55412d[_0x174e3b(0x2bc)] = ![], _0x3ce9c0[_0x174e3b(0x30b)](_0x55412d);                                                     let _0x21208e = _0xaa7790[_0x174e3b(0x315)](makeTextSprite, _0xaa7790[_0x174e3b(0x398)], {                                                         'fontsize': 0x14,                                                         'borderColor': {                                                             'r': 0xff,                                                             'g': 0x0,                                                             'b': 0x0,                                                             'a': 0.4                                                         },                                                         'backgroundColor': {                                                             'r': 0xff,                                                             'g': 0xff,                                                             'b': 0xff,                                                             'a': 0.9                                                         },                                                         'size': [                                                             -0x1326 + -0x2026 + 0x17 * 0x23b,                                                             0x15f2 + 0xf1 * -0x11 + 0x4c * -0x14 + 0.5                                                         ]                                                     });                                                     _0x21208e[_0x174e3b(0x32f)] = new THREE[(_0x174e3b(0x549))](0x1062 + 0x1 * 0x233 + -0x1295 + 0.5, -0x185c + 0x8b2 + 0x1 * 0xfab), _0x21208e[_0x174e3b(0x3a0)][_0x174e3b(0x465)](-0x2 * -0x8d8 + 0x2200 + 0x676 * -0x8, -0x1da1 + 0xc24 + -0x117e * -0x1 + 0.19999999999999996, -0xd0f + -0x343 * 0x5 + 0x1d5e), _0x21208e[_0x174e3b(0x598)] = _0xaa7790[_0x174e3b(0x4b9)], _0x3ce9c0[_0x174e3b(0x30b)](_0x21208e), allRoomObjs[_0x174e3b(0x537)](_0x3ce9c0);                                                 } else {                                                     if (_0xaa7790[_0x174e3b(0x220)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x428)]))                                                         _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0x19f + -0x1f7e + 0x2127, 0x1e14 + -0xd * -0x10d + -0x2bb3, 0x16c + 0x6 * -0x304 + -0x5d * -0x2e), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x1 * 0x1005 + -0xfac + -0x38f * -0x1, posuiRoom = _0x3ce9c0, allRoomObjs[_0x174e3b(0x537)](_0x3ce9c0);                                                     else {                                                         if (_0xaa7790[_0x174e3b(0x448)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x436)]))                                                             _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0x1 * -0x104e + -0x1838 + 0x7f4, -0x19ec + -0x1 * -0xddf + 0x5 * 0x26b, 0x1697 + 0x47 * 0x73 + -0x6 * 0x913), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = -0x29 * 0xe3 + 0x12b5 * -0x1 + 0x75f * 0x8, shaifenRoom = _0x3ce9c0, allRoomObjs[_0x174e3b(0x537)](_0x3ce9c0);                                                         else {                                                             if (_0xaa7790[_0x174e3b(0x448)](_0x3ce9c0[_0x174e3b(0x598)], '树'))                                                                 _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](0x9 * -0x14d + 0x11ba * 0x1 + -0x5fb, 0x3b * -0x1f + -0x25e6 + 0x2d15, 0xa60 + -0x131 + -0x1 * 0x925), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = 0x5 * 0x6fb + -0xa4b + -0x14b4;                                                             else {                                                                 if (_0xaa7790[_0x174e3b(0x323)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x378)]))                                                                     _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0x70c + 0x2d * 0x85 + -0x104b, -0x338 * 0x8 + 0x2126 + -0x75c, -0xb50 + -0x2202 + 0x2 * 0x16ae), _0x3ce9c0[_0x174e3b(0x2bc)] = ![], _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = -0x169 * -0xf + -0x1f2d + 0xdee, fourColorPic = _0x3ce9c0;                                                                 else {                                                                     if (_0xaa7790[_0x174e3b(0x583)](_0x3ce9c0[_0x174e3b(0x598)], _0xaa7790[_0x174e3b(0x307)]))                                                                         _0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0x1 * -0x707 + 0x1a62 + -0x215f, 0x22 * -0x35 + -0x71 * 0x3d + 0x2201, -0x1c2 + 0x1936 + 0x51 * -0x4a), _0x3ce9c0[_0x174e3b(0x3a0)]['y'] = -0x13a2 + 0xade + 0xcac, suishiRoom = _0x3ce9c0, allRoomObjs[_0x174e3b(0x537)](_0x3ce9c0);                                                                     else                                                                         _0xaa7790[_0x174e3b(0x386)](_0x3ce9c0[_0x174e3b(0x598)], '车') && (_0x3ce9c0[_0x174e3b(0x473)][_0x174e3b(0x465)](-0xa7 + 0x1046 + -0xf95 * 0x1, -0x852 + 0x1b9 * 0x1 + 0x6a3 * 0x1, 0x268d + 0xb45 + -0x31c8), _0x3ce9c0[_0x174e3b(0x3a0)][_0x174e3b(0x465)](-(-0x13a * 0x8 + 0x11c * -0x8 + 0x19ce + 0.9900000000000091), 0x807 * 0x2 + 0x1daa + -0x2d0e * 0x1, -(-0x178f + -0x15bf + -0x2 * -0x1b01 + 0.42000000000007276)), _0x3ce9c0[_0x174e3b(0x2bc)] = ![], carMesh = _0x3ce9c0);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 }             }         }         _0x3ce9c0[_0x174e3b(0x4aa)](_0x36ac87 => {             const _0x872ecc = _0x174e3b, _0x2ec442 = {                     'vzwpD': _0xaa7790[_0x872ecc(0x1a2)],                     'Kdkjp': function (_0x561fa2, _0x873492) {                         const _0xdd7b12 = _0x872ecc;                         return _0xaa7790[_0xdd7b12(0x3ea)](_0x561fa2, _0x873492);                     },                     'sQMzw': _0xaa7790[_0x872ecc(0x1c6)],                     'KQmvU': _0xaa7790[_0x872ecc(0x304)],                     'EfHnw': function (_0x2d65f6, _0x3bd225) {                         const _0x3ca767 = _0x872ecc;                         return _0xaa7790[_0x3ca767(0x40d)](_0x2d65f6, _0x3bd225);                     },                     'kavpz': _0xaa7790[_0x872ecc(0x517)],                     'zgYji': _0xaa7790[_0x872ecc(0x392)],                     'qsHST': function (_0x3b8c69, _0x52af39) {                         const _0x4a7ff6 = _0x872ecc;                         return _0xaa7790[_0x4a7ff6(0x40d)](_0x3b8c69, _0x52af39);                     },                     'WnnDV': _0xaa7790[_0x872ecc(0x562)],                     'PrJxq': _0xaa7790[_0x872ecc(0x4c0)],                     'olFNS': _0xaa7790[_0x872ecc(0x43f)],                     'pADNo': function (_0x55f312, _0x50bc59) {                         const _0x5f4243 = _0x872ecc;                         return _0xaa7790[_0x5f4243(0x233)](_0x55f312, _0x50bc59);                     },                     'xDpIk': _0xaa7790[_0x872ecc(0x57b)],                     'aTtGF': _0xaa7790[_0x872ecc(0x53c)],                     'tNYRk': _0xaa7790[_0x872ecc(0x5ac)],                     'uJnPC': function (_0x4b9312, _0x30434c) {                         const _0x108a5e = _0x872ecc;                         return _0xaa7790[_0x108a5e(0x5e7)](_0x4b9312, _0x30434c);                     },                     'aijYJ': _0xaa7790[_0x872ecc(0x4f1)],                     'LtqgQ': _0xaa7790[_0x872ecc(0x287)],                     'ipHDT': _0xaa7790[_0x872ecc(0x1ec)],                     'UauJj': _0xaa7790[_0x872ecc(0x3dd)],                     'UDefb': _0xaa7790[_0x872ecc(0x46e)],                     'CboDH': _0xaa7790[_0x872ecc(0x2e3)],                     'ovtst': function (_0x5de368, _0x355bf7) {                         const _0x482bcd = _0x872ecc;                         return _0xaa7790[_0x482bcd(0x548)](_0x5de368, _0x355bf7);                     },                     'FQlhA': _0xaa7790[_0x872ecc(0x223)],                     'rojth': _0xaa7790[_0x872ecc(0x320)],                     'GzdXW': function (_0x5a52f9, _0x1558ca) {                         const _0x93497 = _0x872ecc;                         return _0xaa7790[_0x93497(0x2f4)](_0x5a52f9, _0x1558ca);                     },                     'sbWyJ': _0xaa7790[_0x872ecc(0x43b)],                     'OErAa': _0xaa7790[_0x872ecc(0x3c3)],                     'cwORD': function (_0x1b465d, _0x45fed8) {                         const _0x1d9046 = _0x872ecc;                         return _0xaa7790[_0x1d9046(0x437)](_0x1b465d, _0x45fed8);                     },                     'YEYFd': _0xaa7790[_0x872ecc(0x1dd)],                     'awVFN': function (_0x3b4d5a, _0xb52de) {                         const _0x1e2a39 = _0x872ecc;                         return _0xaa7790[_0x1e2a39(0x56c)](_0x3b4d5a, _0xb52de);                     },                     'XQDWm': _0xaa7790[_0x872ecc(0x2c4)],                     'GfTsH': _0xaa7790[_0x872ecc(0x5c3)],                     'CMCpd': function (_0x2256f3, _0x298b18) {                         const _0x309e43 = _0x872ecc;                         return _0xaa7790[_0x309e43(0x55a)](_0x2256f3, _0x298b18);                     },                     'fdmUE': _0xaa7790[_0x872ecc(0x2db)],                     'OgSmN': function (_0x8c3033, _0x485c25) {                         const _0x481b92 = _0x872ecc;                         return _0xaa7790[_0x481b92(0x5c8)](_0x8c3033, _0x485c25);                     },                     'wnaQe': _0xaa7790[_0x872ecc(0x597)],                     'dMZeZ': function (_0x5ca467, _0x1d2a5f) {                         const _0x30cab5 = _0x872ecc;                         return _0xaa7790[_0x30cab5(0x582)](_0x5ca467, _0x1d2a5f);                     },                     'RJkyv': _0xaa7790[_0x872ecc(0x2dc)],                     'sQtyW': _0xaa7790[_0x872ecc(0x51e)],                     'jpMbg': _0xaa7790[_0x872ecc(0x3f4)],                     'OqyXg': _0xaa7790[_0x872ecc(0x5fb)],                     'wZdRr': function (_0xc5a02b, _0x45e16c) {                         const _0x40438a = _0x872ecc;                         return _0xaa7790[_0x40438a(0x401)](_0xc5a02b, _0x45e16c);                     },                     'usgcm': _0xaa7790[_0x872ecc(0x316)],                     'gtvHP': function (_0x1d16b3, _0x348755) {                         const _0x55734c = _0x872ecc;                         return _0xaa7790[_0x55734c(0x3fb)](_0x1d16b3, _0x348755);                     },                     'aKdZE': _0xaa7790[_0x872ecc(0x235)],                     'HbOEL': _0xaa7790[_0x872ecc(0x2d8)],                     'lcQLz': _0xaa7790[_0x872ecc(0x5ec)],                     'duKve': _0xaa7790[_0x872ecc(0x1fd)],                     'uNUXd': _0xaa7790[_0x872ecc(0x3ec)]                 };             if (_0x36ac87[_0x872ecc(0x5c2)]) {                 _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x2d3)]) && (_0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x47c) + 't'] = !![], _0x36ac87[_0x872ecc(0x57e) + 'r'] = -0x1 * -0x132d + 0x3 * -0x4f4 + 0x389 * -0x1);                 if (_0xaa7790[_0x872ecc(0x40d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1bd)]) || _0xaa7790[_0x872ecc(0x21d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4a7)]) || _0xaa7790[_0x872ecc(0x386)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5d3)]) || _0xaa7790[_0x872ecc(0x31f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x228)]) || _0xaa7790[_0x872ecc(0x2ee)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x214)]) || _0xaa7790[_0x872ecc(0x3f7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x329)]) || _0xaa7790[_0x872ecc(0x548)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x594)]) || _0xaa7790[_0x872ecc(0x5ef)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x368)]) || _0xaa7790[_0x872ecc(0x263)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1d3)]))                     _0x36ac87[_0x872ecc(0x369) + _0x872ecc(0x595)] = ![];                 else {                     if (_0xaa7790[_0x872ecc(0x5c8)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x207)]) || _0xaa7790[_0x872ecc(0x2f4)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2e7)])) {                         const _0x4dbc85 = _0xaa7790[_0x872ecc(0x573)][_0x872ecc(0x1a5)]('|');                         let _0x3c45b8 = -0x33 * -0x43 + 0x2494 + 0x31ed * -0x1;                         while (!![]) {                             switch (_0x4dbc85[_0x3c45b8++]) {                             case '0':                                 _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x3b7)] = -0x6 * -0x62f + -0x105f + -0x14bb + 0.5;                                 continue;                             case '1':                                 _0x36ac87[_0x872ecc(0x369) + _0x872ecc(0x595)] = ![];                                 continue;                             case '2':                                 _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x47c) + 't'] = !![];                                 continue;                             case '3':                                 _0x36ac87[_0x872ecc(0x57e) + 'r'] = -0xc69 * -0x3 + 0x68a + 0x7 * -0x613;                                 continue;                             case '4':                                 _0x36ac87[_0x872ecc(0x314)] = ![];                                 continue;                             }                             break;                         }                     } else {                         if (_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x3bc)]))                             _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x23b)] = -0x3e2 * 0xa + -0x16bb + 0x6d7 * 0x9, _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x3ca)] = 0x1 * 0xc1 + 0x23ff + -0x24c0 + 0.3;                         else {                             if (_0xaa7790[_0x872ecc(0x381)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x362)]))                                 _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x47c) + 't'] = !![], _0x36ac87[_0x872ecc(0x57e) + 'r'] = -0xc2 * 0x2 + -0x4c0 + 0x78e;                             else                                 (_0xaa7790[_0x872ecc(0x56c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x54a)]) || _0xaa7790[_0x872ecc(0x233)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x361)])) && (_0x36ac87[_0x872ecc(0x2bc)] = ![]);                         }                     }                 }                 if (_0xaa7790[_0x872ecc(0x381)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x378)])) {                     const _0x3f8c5a = _0xaa7790[_0x872ecc(0x251)][_0x872ecc(0x1a5)]('|');                     let _0x17603d = -0x1756 + 0xe99 * 0x2 + 0x3 * -0x1f4;                     while (!![]) {                         switch (_0x3f8c5a[_0x17603d++]) {                         case '0':                             _0x36ac87[_0x872ecc(0x314)] = ![];                             continue;                         case '1':                             _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x1a7)]) ? _0x36ac87[_0x872ecc(0x57e) + 'r'] = 0x16f * 0x8 + -0xf06 + 0x4c4 : _0x36ac87[_0x872ecc(0x57e) + 'r'] = -0xfab * 0x2 + 0x1b3 + -0xef * -0x21;                             continue;                         case '2':                             _0x36ac87[_0x872ecc(0x369) + _0x872ecc(0x595)] = ![];                             continue;                         case '3':                             _0xaa7790[_0x872ecc(0x5f4)](setOpacityMaterial, _0x36ac87);                             continue;                         case '4':                             _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x1e2)] = ![];                             continue;                         }                         break;                     }                 } else {                     if (_0xaa7790[_0x872ecc(0x306)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4d2)])) {                         const _0x518630 = _0xaa7790[_0x872ecc(0x5cc)][_0x872ecc(0x1a5)]('|');                         let _0x30c283 = 0x1239 + -0x555 + -0xce4;                         while (!![]) {                             switch (_0x518630[_0x30c283++]) {                             case '0':                                 container[_0x872ecc(0x200)](_0x36ac87);                                 continue;                             case '1':                                 _0x36ac87[_0x872ecc(0x314)] = ![];                                 continue;                             case '2':                                 _0x36ac87[_0x872ecc(0x2bc)] = ![];                                 continue;                             case '3':                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x3e1) + 'ty'] = !![];                                 continue;                             case '4':                                 roadPlane[_0x872ecc(0x537)](_0x36ac87);                                 continue;                             case '5':                                 _0x36ac87[_0x872ecc(0x369) + _0x872ecc(0x595)] = ![];                                 continue;                             }                             break;                         }                     } else {                         if (_0xaa7790[_0x872ecc(0x20f)](_0x3ce9c0[_0x872ecc(0x598)], '树'))                             _0x36ac87[_0x872ecc(0x57e) + 'r'] = 0x1ab1 + 0xcc1 * -0x1 + -0xcba;                         else                             (_0xaa7790[_0x872ecc(0x215)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1f9)]) || _0xaa7790[_0x872ecc(0x5e7)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x439)]) || _0xaa7790[_0x872ecc(0x3fa)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x48d)]) || _0xaa7790[_0x872ecc(0x233)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2de)]) || _0xaa7790[_0x872ecc(0x584)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x428)]) || _0xaa7790[_0x872ecc(0x52b)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x436)]) || _0xaa7790[_0x872ecc(0x5ef)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x307)])) && allOutSideBuild[_0x872ecc(0x537)](_0x36ac87);                     }                 }                 (_0xaa7790[_0x872ecc(0x394)](_0x3ce9c0[_0x872ecc(0x598)], '草坪') || _0xaa7790[_0x872ecc(0x5c7)](_0x3ce9c0[_0x872ecc(0x598)], '地面')) && _0xaa7790[_0x872ecc(0x1a0)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x362)]) && _0xaa7790[_0x872ecc(0x1a0)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x207)]) && _0xaa7790[_0x872ecc(0x359)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2e7)]) && (_0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x47c) + 't'] = ![]);                 if (_0xaa7790[_0x872ecc(0x4b0)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2de)])) {                     if (_0xaa7790[_0x872ecc(0x52b)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x335)]) || _0xaa7790[_0x872ecc(0x46c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x238)]) || _0xaa7790[_0x872ecc(0x52f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x471)]) || _0xaa7790[_0x872ecc(0x19c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x39c)]) || _0xaa7790[_0x872ecc(0x28f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x385)]) || _0xaa7790[_0x872ecc(0x220)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2a1)]) || _0xaa7790[_0x872ecc(0x28f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x26d)]) || _0xaa7790[_0x872ecc(0x3e3)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5a1)])) {                         if (_0xaa7790[_0x872ecc(0x306)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x238)]))                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3fe)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                 -(-0x683 + -0x218d + 0x375f + 0.13000000000010914),                                 0x18f + -0xa48 + -0x1 * -0x8f5 + 0.7000000000000028,                                 -(0xc7a * -0x3 + -0x8f9 + -0x33b2 * -0x1 + 0.4700000000000273)                             ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                 -(-0x7e5 + -0x1b7f + 0x3228 + 0.8220000000001164),                                 -0x1 * 0xcbc + 0x1042 + -0x2f9 + 0.12569999999999482,                                 -(0x7ae + -0x2031 + 0x1d99 + 0.5217000000000098)                             ];                         else {                             if (_0xaa7790[_0x872ecc(0x486)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x471)]))                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x22f)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                     -(0x1 * -0xa36 + 0x20 * 0x5 + 0x1878 + 0.09999999999990905),                                     -0x4 * 0x8d3 + 0x1e14 + -0x1 * -0x575 + 0.13000000000000256,                                     -(-0x1348 + 0x1703 + 0x190 + 0.4700000000000273)                                 ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                     -(-0x1 * -0x1c24 + -0x1a79 * 0x1 + 0x1 * 0xcbe + 0.09639999999990323),                                     0xb57 * -0x1 + 0x1 * 0x20bf + -0x14eb + 0.747799999999998,                                     -(-0x125e * -0x1 + 0x24c8 + -0x1 * 0x3208 + 0.08330000000000837)                                 ];                             else {                                 if (_0xaa7790[_0x872ecc(0x5c8)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x39c)]))                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x242)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                         -(0x7a9 + -0x1 * 0x354 + 0xa20 + 0.40000000000009095),                                         0x657 + 0x2677 * -0x1 + -0x102e * -0x2 + 0.7000000000000028,                                         -(-0x2501 + -0x1 * -0x59e + 0x24ae + 0.4700000000000273)                                     ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                         -(-0x1 * 0x8fa + 0xbd9 + 0xb18 + 0.17270000000007713),                                         0x3d * 0x33 + 0xc1 * 0x4 + -0xea7 + 0.37760000000000105,                                         -(0x18a * -0xb + 0x3 * 0x4bb + -0x7db * -0x1 + 0.06400000000007822)                                     ];                                 else {                                     if (_0xaa7790[_0x872ecc(0x35c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x385)]))                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x38b)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                             -(0x1 * 0x2634 + -0x1 * -0x15a0 + -0x1 * 0x2de3 + 0.8000000000001819),                                             -0x183f + 0x1dc1 + -0x546 + 0.759999999999998,                                             -(0x3 * 0xa62 + -0x1831 + -0x1aa + 0.4700000000000273)                                         ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                             -(0x7f + 0x10c1 * -0x1 + -0x32 * -0x98 + 0.4108000000001084),                                             0x119d + 0x2a * 0x9a + -0x2a5b + 0.29110000000000014,                                             -(-0x1 * 0x2149 + -0x14 * 0x1df + 0x4bca + 0.04680000000007567)                                         ];                                     else {                                         if (_0xaa7790[_0x872ecc(0x293)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2a1)]))                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x51f)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                 -(0x8a3 + 0x55 * 0x2a + -0xd4 * 0xb + 0.23999999999978172),                                                 0x139c + 0x1201 + -0x1a * 0x170 + 0.240000000000002,                                                 -(0xb2d * -0x1 + -0x304 + -0x2b * -0x74 + 0.4700000000000273)                                             ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                 -(0x1f38 + 0xae2 * -0x3 + -0x731 * -0x2 + 0.14550000000008367),                                                 0xc4c + 0x372 + -0xf45 + 0.7939999999999969,                                                 -(-0x17 * 0x8 + -0x239 * -0x7 + 0x1 * -0x9b6 + 0.615500000000111)                                             ];                                         else {                                             if (_0xaa7790[_0x872ecc(0x44e)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x26d)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x4fa)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                     -(0x201f + 0x5b * 0x17 + -0x1b55 + 0.0500000000001819),                                                     0x26a9 + -0x18bd + -0xdaf + 0.5600000000000023,                                                     -(-0x4f8 + 0x5aa + 0x1 * 0x499 + 0.4700000000000273)                                                 ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                     -(-0x81 + -0xef * -0x1f + -0xfec + 0.5981000000001586),                                                     0x46e + -0x3 * 0xa8b + 0x1baf + 0.6037000000000035,                                                     -(0x1 * -0x23f9 + 0xa67 + 0x1eb3 + 0.42249999999989996)                                                 ];                                             else                                                 _0xaa7790[_0x872ecc(0x56c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5a1)]) && (_0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3d7)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                     -(-0x1 * 0x1dbf + -0xa5a + 0x34a4 + 0.5300000000002001),                                                     -0x1a2a * -0x1 + -0x1192 * 0x1 + -0x85b + 0.5200000000000031,                                                     -(0x1750 * 0x1 + -0x2 * -0xbe4 + 0x3 * -0xdef + 0.4700000000000273)                                                 ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                     -(0x14a0 + 0x178e + -0x201f + 0.7321000000001732),                                                     0x14e1 + 0x16 * -0x144 + 0x771 + 0.6145000000000067,                                                     -(-0x1 * -0x139d + -0x2 * 0xdb1 + -0x1 * -0xce5 + 0.8221000000000913)                                                 ]);                                         }                                     }                                 }                             }                         }                         let _0x3b5ed3 = _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x328)](-0x2 * -0x2fc + 0x136d * -0x1 + 0xd7a, 0xaef + 0x1 * -0x9f7 + -0xb * 0x16);                         _0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x246)](_0xaa7790[_0x872ecc(0x554)], _0x3b5ed3), limoClickObjs[_0x872ecc(0x537)](_0x36ac87);                     } else {                         if (_0xaa7790[_0x872ecc(0x35c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x520)]) || _0xaa7790[_0x872ecc(0x4da)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x490)]) || _0xaa7790[_0x872ecc(0x1b9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x221)]) || _0xaa7790[_0x872ecc(0x2d9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3b4)]) || _0xaa7790[_0x872ecc(0x4b0)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x30e)]) || _0xaa7790[_0x872ecc(0x401)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2a0)]) || _0xaa7790[_0x872ecc(0x202)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2f8)]) || _0xaa7790[_0x872ecc(0x22a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x39d)])) {                             let _0x93de78 = _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x328)](0x371 * 0x8 + 0x1 * -0x116 + -0x1a6c);                             _0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x49b)](_0xaa7790[_0x872ecc(0x2e2)], _0x93de78), limoClickObjs[_0x872ecc(0x537)](_0x36ac87);                         } else {                             if (_0xaa7790[_0x872ecc(0x429)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5a5)]) || _0xaa7790[_0x872ecc(0x5b0)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x55d)]) || _0xaa7790[_0x872ecc(0x336)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2f9)]) || _0xaa7790[_0x872ecc(0x313)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3f2)]) || _0xaa7790[_0x872ecc(0x2d9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5d6)]) || _0xaa7790[_0x872ecc(0x34f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x53d)]) || _0xaa7790[_0x872ecc(0x1ad)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x50c)]) || _0xaa7790[_0x872ecc(0x381)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5d5)]) || _0xaa7790[_0x872ecc(0x263)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x267)]) || _0xaa7790[_0x872ecc(0x389)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3de)])) {                                 const _0x4d6060 = _0xaa7790[_0x872ecc(0x1c7)][_0x872ecc(0x1a5)]('|');                                 let _0x36809a = 0x2ad * -0xd + 0x17aa + 0xb1f;                                 while (!![]) {                                     switch (_0x4d6060[_0x36809a++]) {                                     case '0':                                         _0xaa7790[_0x872ecc(0x35c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2f9)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x237)]);                                         continue;                                     case '1':                                         _0xaa7790[_0x872ecc(0x55a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3f2)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x44b)]);                                         continue;                                     case '2':                                         _0xaa7790[_0x872ecc(0x46c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5d6)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x36c)]);                                         continue;                                     case '3':                                         limoClickObjs[_0x872ecc(0x537)](_0x36ac87);                                         continue;                                     case '4':                                         _0xaa7790[_0x872ecc(0x46c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5d5)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x240)]);                                         continue;                                     case '5':                                         _0xaa7790[_0x872ecc(0x31f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3de)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x5f5)]);                                         continue;                                     case '6':                                         _0xaa7790[_0x872ecc(0x20f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x50c)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x2a3)]);                                         continue;                                     case '7':                                         _0xaa7790[_0x872ecc(0x22a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x267)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x3e4)]);                                         continue;                                     case '8':                                         _0xaa7790[_0x872ecc(0x1e4)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x55d)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x494)]);                                         continue;                                     case '9':                                         _0xaa7790[_0x872ecc(0x293)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x53d)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x245)]);                                         continue;                                     case '10':                                         _0xaa7790[_0x872ecc(0x55a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5a5)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x342)]);                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0xaa7790[_0x872ecc(0x306)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x501)]) || _0xaa7790[_0x872ecc(0x40e)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1d7)]) || _0xaa7790[_0x872ecc(0x34f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1e0)]) || _0xaa7790[_0x872ecc(0x25a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x25c)]) || _0xaa7790[_0x872ecc(0x28f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x575)]) || _0xaa7790[_0x872ecc(0x323)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4d8)]) || _0xaa7790[_0x872ecc(0x34f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x414)]) || _0xaa7790[_0x872ecc(0x43c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1ce)]) || _0xaa7790[_0x872ecc(0x4ee)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4c4)]) || _0xaa7790[_0x872ecc(0x43c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x510)]) || _0xaa7790[_0x872ecc(0x4f7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3a4)]) || _0xaa7790[_0x872ecc(0x56c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3c9)]) || _0xaa7790[_0x872ecc(0x40a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x254)])) {                                     const _0x174484 = _0xaa7790[_0x872ecc(0x5f1)][_0x872ecc(0x1a5)]('|');                                     let _0x2593c6 = -0x18b6 * -0x1 + 0xfae * -0x1 + -0x908;                                     while (!![]) {                                         switch (_0x174484[_0x2593c6++]) {                                         case '0':                                             _0xaa7790[_0x872ecc(0x34f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x510)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x4c6)]);                                             continue;                                         case '1':                                             limoClickObjs[_0x872ecc(0x537)](_0x36ac87);                                             continue;                                         case '2':                                             _0xaa7790[_0x872ecc(0x529)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x254)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x581)]);                                             continue;                                         case '3':                                             _0xaa7790[_0x872ecc(0x459)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1ce)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x560)]);                                             continue;                                         case '4':                                             _0xaa7790[_0x872ecc(0x284)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x575)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x438)]);                                             continue;                                         case '5':                                             _0xaa7790[_0x872ecc(0x4e1)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3c9)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x1d5)]);                                             continue;                                         case '6':                                             _0xaa7790[_0x872ecc(0x2f5)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x414)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x4be)]);                                             continue;                                         case '7':                                             _0xaa7790[_0x872ecc(0x5a6)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3a4)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x4bc)]);                                             continue;                                         case '8':                                             _0xaa7790[_0x872ecc(0x38c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1d7)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x4b2)]);                                             continue;                                         case '9':                                             _0xaa7790[_0x872ecc(0x372)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x501)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x489)]);                                             continue;                                         case '10':                                             _0xaa7790[_0x872ecc(0x386)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4d8)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x2cf)]);                                             continue;                                         case '11':                                             _0xaa7790[_0x872ecc(0x459)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x25c)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x349)]);                                             continue;                                         case '12':                                             _0xaa7790[_0x872ecc(0x40a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4c4)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x208)]);                                             continue;                                         case '13':                                             _0xaa7790[_0x872ecc(0x28f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1e0)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x48f)]);                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0xaa7790[_0x872ecc(0x2ee)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x211)]) || _0xaa7790[_0x872ecc(0x23d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3e8)]) || _0xaa7790[_0x872ecc(0x24b)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x297)]) || _0xaa7790[_0x872ecc(0x45f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x44c)]) || _0xaa7790[_0x872ecc(0x407)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x48c)]) || _0xaa7790[_0x872ecc(0x55a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x26f)]) || _0xaa7790[_0x872ecc(0x4c5)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3c7)]) || _0xaa7790[_0x872ecc(0x323)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x44f)])) {                                         let _0x38b0be = _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x328)](-0x242f + -0xccd * 0x1 + 0x3101, 0x9 * -0x3ca + -0x1fc * 0x5 + 0x2c0c);                                         _0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x2ad)](_0xaa7790[_0x872ecc(0x3cc)], _0x38b0be), limoClickObjs[_0x872ecc(0x537)](_0x36ac87);                                     } else {                                         if (_0xaa7790[_0x872ecc(0x52f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4d1)]) || _0xaa7790[_0x872ecc(0x40e)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x205)])) {                                             let _0x55f95a = _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x328)](0x1c5d + -0x15d7 + -0xe * 0x77, -0x185b + 0x1003 * 0x1 + 0x85d);                                             _0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x582)](_0xaa7790[_0x872ecc(0x2f3)], _0x55f95a), limoClickObjs[_0x872ecc(0x537)](_0x36ac87);                                         } else                                             (_0xaa7790[_0x872ecc(0x451)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5ce)]) || _0xaa7790[_0x872ecc(0x5c7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x350)]) || _0xaa7790[_0x872ecc(0x429)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x410)]) || _0xaa7790[_0x872ecc(0x376)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1e7)])) && (_0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)] = _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x58e)](), _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x425) + 'e'] = !![], limojiJiaodaiObjs[_0x872ecc(0x537)](_0x36ac87));                                     }                                 }                             }                         }                     }                     if (_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x3dc)]) || _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x23e)]) || _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x5b2)]) && _0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)]('转动')) {                         if (_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x5b2)])) {                             let _0xbb9088 = _0xaa7790[_0x872ecc(0x1e6)](_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x328)](0x3f4 + -0x41 * 0x59 + -0x8 * -0x255, -0x3 * -0x28d + 0x20e3 + 0x6c1 * -0x6), 0x22b0 + -0x1ac8 + -0x7e7);                             limoRoomAnimation[_0xbb9088][_0x872ecc(0x21e)] = _0x36ac87;                         } else {                             if (_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)]('动画')) {                                 let _0xa8ca82 = _0xaa7790[_0x872ecc(0x1e6)](_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x328)](-0x95c * 0x2 + 0x2 * -0x12b5 + -0x1 * -0x3828, -0x399 * -0x2 + 0xd9 * 0x1f + -0xb26 * 0x3), 0x18 * -0x5b + 0xe9b * -0x1 + -0x1724 * -0x1);                                 _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x47c) + 't'] = !![], limoRoomAnimation[_0xa8ca82][_0x872ecc(0x288)][_0x872ecc(0x537)](_0x36ac87), _0x36ac87[_0x872ecc(0x57e) + 'r'] = 0xdb3 + 0xed4 + 0x1 * -0x1a2f;                             } else {                                 let _0x5d16ae = _0xaa7790[_0x872ecc(0x1e6)](_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x328)](-0x256d + 0x34 + 0x253f), -0x40f * -0x4 + 0x7 * -0x4b1 + 0x427 * 0x4);                                 limoRoomAnimation[_0x5d16ae][_0x872ecc(0x47c) + 't'][_0x872ecc(0x537)](_0x36ac87);                             }                         }                     }                     if (_0xaa7790[_0x872ecc(0x1ad)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2b6)])) {                         const _0x3c6e87 = _0xaa7790[_0x872ecc(0x24d)][_0x872ecc(0x1a5)]('|');                         let _0x35f4ef = 0xba6 * 0x1 + -0x3 * -0x192 + -0x6 * 0x2ba;                         while (!![]) {                             switch (_0x3c6e87[_0x35f4ef++]) {                             case '0':                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                     -(-0x25ab + -0xd00 + 0x9 * 0x726 + 0.9589000000000851),                                     0x2 * 0x53b + -0x1 * -0xb7d + -0x15a8 + 0.33150000000000546,                                     -(0x1 * 0x2064 + -0xfbd + -0xad3 + 0.7609999999999673)                                 ];                                 continue;                             case '1':                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                     -(0x1518 + 0x4d * -0x55 + 0x1b * 0xac + 0.8400000000001455),                                     0x9 * -0x127 + -0x117c * 0x1 + 0x1c23 + 0.4300000000000068,                                     -(-0x11 * 0x18 + -0x8be * -0x1 + -0x13f + 0.07999999999992724)                                 ];                                 continue;                             case '2':                                 _0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x434)];                                 continue;                             case '3':                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x232)];                                 continue;                             case '4':                                 cameraImportDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                 continue;                             case '5':                                 limoClickObjs[_0x872ecc(0x537)](_0x36ac87);                                 continue;                             }                             break;                         }                     }                 } else {                     if (_0xaa7790[_0x872ecc(0x255)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x48d)])) {                         if (_0x36ac87[_0x872ecc(0x598)][_0x872ecc(0x469)](_0xaa7790[_0x872ecc(0x382)])) {                             const _0x1eb910 = _0xaa7790[_0x872ecc(0x49a)][_0x872ecc(0x1a5)]('|');                             let _0x35baeb = -0xe5 + 0xea3 * -0x1 + 0xf88;                             while (!![]) {                                 switch (_0x1eb910[_0x35baeb++]) {                                 case '0':                                     junhuaClickObjs[_0x872ecc(0x537)](_0x36ac87);                                     continue;                                 case '1':                                     _0xaa7790[_0x872ecc(0x46b)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x35b)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x1b5)], _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x325)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                         -(0x24a6 * -0x1 + -0x5d * -0xe + 0x2c04 + 0.6599999999998545),                                         0x39d + 0x8c8 + 0x4 * -0x2ca + 0.910000000000025,                                         -(-0x1e92 + 0x6 * 0x16c + 0x19df + 0.9099999999999682)                                     ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                         -(0x5 * -0xdb + -0x1 * 0x1999 + -0x1 * -0x2a56 + 0.44840000000021973),                                         0x1 * 0x2161 + -0x1 * -0x250f + 0xdd5 * -0x5 + 0.43990000000002283,                                         -(-0x1b9 * 0x11 + -0x2 * -0x254 + 0x1c98 + 0.3348999999999478)                                     ]);                                     continue;                                 case '2':                                     _0xaa7790[_0x872ecc(0x40d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4d4)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x4dc)], _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x2bf)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                         -(0xd5e + -0x1 * 0x1cc9 + 0x1e56 + 0.7399999999997817),                                         0x45 * -0x87 + 0x2 * -0x1327 + 0x4bee + 0.839999999999975,                                         -(-0x1 * 0x1f81 + 0xf09 + 0x1432 + 0.36000000000001364)                                     ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                         -(0x729 + 0xf18 + -0x72e + 0.3602000000000771),                                         0xff7 * 0x2 + -0x3 * -0x26f + -0x1 * 0x25f1 + 0.6541000000000281,                                         -(0x1003 * -0x2 + 0x258b * -0x1 + 0x1d * 0x287 + 0.4438999999999851)                                     ]);                                     continue;                                 case '3':                                     _0xaa7790[_0x872ecc(0x529)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x491)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x5eb)], _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x5aa)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                         -(-0x15ee + -0x1c83 * 0x1 + -0x6 * -0xa75 + 0.0500000000001819),                                         0xb51 * -0x2 + 0x1 * 0xa5d + -0x21 * -0x61 + 0.6499999999999986,                                         -(0x1 * -0x75f + 0x39e + 0xf * 0x7a + 0.21000000000003638)                                     ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                         -(0x752 * 0x1 + -0x1bca * -0x1 + -0x16af + 0.4054999999998472),                                         -0x15d * -0x2 + 0x16e1 + -0x195a + 0.7750000000000057,                                         -(-0x66b + -0xf * -0xa1 + 0x20 * 0x3 + 0.7952999999999975)                                     ]);                                     continue;                                 case '4':                                     cameraImportDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                     continue;                                 case '5':                                     _0xaa7790[_0x872ecc(0x4b0)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5cd)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x4a6)], _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x52d)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                         -(-0xc * 0x257 + 0x4c + 0xef * 0x26 + 0.2400000000000091),                                         -0x119e + -0x90b + 0x1ae5 + 0.25,                                         -(-0x678 + 0x1273 * -0x1 + 0x30 * 0x97 + 0.19000000000005457)                                     ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                         -(-0x1 * -0x53 + -0x2480 + 0x2bc3 + 0.9351999999998952),                                         0x24b * 0xf + 0x135a * -0x2 + -0x3 * -0x185 + 0.5752999999999986,                                         -(-0x237 + -0x90d + 0x7 * 0x218 + 0.7335000000000491)                                     ]);                                     continue;                                 case '6':                                     _0xaa7790[_0x872ecc(0x446)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2a9)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x2e1)], _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x411)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                         -(-0x515 + -0x5 * -0x119 + 0x7b0 + 0.3200000000001637),                                         -0x2e9 * -0x4 + 0x15ce * 0x1 + 0x2035 * -0x1 + 0.75,                                         -(-0x206b + 0x146d + 0xf8a + 0.6100000000000136)                                     ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                         -(-0xa87 + 0x1564 + -0x2c7 + 0.95699999999988),                                         0x2 * -0x116c + -0x1 * 0x9da + 0x2dfa + 0.19029999999997926,                                         -(-0x16 * -0x2f + -0x18c1 + 0x1e * 0xce + 0.8069000000000415)                                     ]);                                     continue;                                 case '7':                                     _0xaa7790[_0x872ecc(0x5ba)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x38e)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x3b2)], _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x4e6)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                         -(0x63b + 0x142f + 0x1c3 * -0x9 + 0.7100000000000364),                                         -0x2e0 * 0x2 + 0x829 + -0x12b * 0x1 + 0.10000000000002274,                                         -(-0x2465 + -0x187 + 0x29a6 + 0.21000000000003638)                                     ], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                         -(-0x2329 + -0x6df * -0x1 + 0x26f9 + 0.8695999999999913),                                         0xb8d * 0x3 + -0x3 * 0x13 + -0x2124 + 0.46399999999999864,                                         -(0xd9 * 0x27 + 0x84b + -0x25a0 + 0.8425999999999476)                                     ]);                                     continue;                                 }                                 break;                             }                         }                     } else {                         if (_0xaa7790[_0x872ecc(0x313)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4fc)]))                             _0xaa7790[_0x872ecc(0x359)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3c1)]) && (_0x36ac87[_0x872ecc(0x598)] = _0xaa7790[_0x872ecc(0x5ee)], limoClickObjs[_0x872ecc(0x537)](_0x36ac87));                         else {                             if (_0xaa7790[_0x872ecc(0x1a4)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x428)]))                                 (_0xaa7790[_0x872ecc(0x56c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2bb)]) || _0xaa7790[_0x872ecc(0x4dd)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1af)]) || _0xaa7790[_0x872ecc(0x56c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4bb)]) || _0xaa7790[_0x872ecc(0x1cf)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4c7)]) || _0xaa7790[_0x872ecc(0x2ed)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x521)]) || _0xaa7790[_0x872ecc(0x3fb)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x22c)])) && (_0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)] = _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x58e)](), _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x425) + 'e'] = !![], posuijianJiaodaiObjs[_0x872ecc(0x537)](_0x36ac87));                             else {                                 if (_0xaa7790[_0x872ecc(0x20c)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x436)]))                                     (_0xaa7790[_0x872ecc(0x222)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1b1)]) || _0xaa7790[_0x872ecc(0x3f7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x34b)]) || _0xaa7790[_0x872ecc(0x28d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x484)]) || _0xaa7790[_0x872ecc(0x367)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4f8)])) && (_0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)] = _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x58e)](), _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x425) + 'e'] = !![], saifenjianJiaodaiObjs[_0x872ecc(0x537)](_0x36ac87));                                 else                                     _0xaa7790[_0x872ecc(0x212)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x307)]) && ((_0xaa7790[_0x872ecc(0x31f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x590)]) || _0xaa7790[_0x872ecc(0x570)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x58d)]) || _0xaa7790[_0x872ecc(0x3fa)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x19e)]) || _0xaa7790[_0x872ecc(0x5ba)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3ed)]) || _0xaa7790[_0x872ecc(0x2a8)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4c3)]) || _0xaa7790[_0x872ecc(0x220)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x416)]) || _0xaa7790[_0x872ecc(0x1ea)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2a5)]) || _0xaa7790[_0x872ecc(0x574)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x34e)]) || _0xaa7790[_0x872ecc(0x1ee)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5df)])) && (_0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)] = _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x58e)](), _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x5af)][_0x872ecc(0x425) + 'e'] = !![], suishijianJiaodaiObjs[_0x872ecc(0x537)](_0x36ac87)));                             }                         }                     }                 }                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x5ab)] = _0x36ac87[_0x872ecc(0x1f2)][_0x872ecc(0x47c) + 't'], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x314)] = _0x36ac87[_0x872ecc(0x314)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x369) + _0x872ecc(0x595)] = _0x36ac87[_0x872ecc(0x369) + _0x872ecc(0x595)], _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x57e) + 'r'] = _0x36ac87[_0x872ecc(0x57e) + 'r'];             } else {                 if (_0xaa7790[_0x872ecc(0x553)](_0x36ac87[_0x872ecc(0x31e)], _0xaa7790[_0x872ecc(0x481)])) {                     if (_0xaa7790[_0x872ecc(0x5ed)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2de)])) {                         if (_0xaa7790[_0x872ecc(0x1ca)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3fc)]) || _0xaa7790[_0x872ecc(0x1fa)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x41f)]) || _0xaa7790[_0x872ecc(0x2f5)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5b7)]) || _0xaa7790[_0x872ecc(0x5b0)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x338)]) || _0xaa7790[_0x872ecc(0x3a6)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x427)]) || _0xaa7790[_0x872ecc(0x45f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x339)]) || _0xaa7790[_0x872ecc(0x19d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4c1)]) || _0xaa7790[_0x872ecc(0x34c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x23c)]))                             _0x36ac87[_0x872ecc(0x4aa)](_0x1dc565 => {                                 const _0x5ce049 = _0x872ecc;                                 if (_0x1dc565[_0x5ce049(0x5c2)]) {                                     let _0x575b0e = _0x36ac87[_0x5ce049(0x598)][_0x5ce049(0x328)](0x1 * 0x229b + 0x4d * 0x19 + -0x2a1b);                                     _0x1dc565[_0x5ce049(0x598)] = _0xaa7790[_0x5ce049(0x49b)](_0xaa7790[_0x5ce049(0x477)], _0x575b0e), limoClickObjs[_0x5ce049(0x537)](_0x1dc565);                                 }                             });                         else {                             if (_0xaa7790[_0x872ecc(0x1d9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x57b)]) || _0xaa7790[_0x872ecc(0x4f7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4c0)]) || _0xaa7790[_0x872ecc(0x300)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1c6)]))                                 _0x36ac87[_0x872ecc(0x4aa)](_0x27fb8b => {                                     const _0x34c627 = _0x872ecc;                                     if (_0x27fb8b[_0x34c627(0x5c2)]) {                                         const _0x85b65b = _0x2ec442[_0x34c627(0x2cb)][_0x34c627(0x1a5)]('|');                                         let _0x10009c = -0x49 * 0x59 + -0x1092 + 0x29f3;                                         while (!![]) {                                             switch (_0x85b65b[_0x10009c++]) {                                             case '0':                                                 _0x2ec442[_0x34c627(0x463)](_0x36ac87[_0x34c627(0x598)], _0x2ec442[_0x34c627(0x4ea)]) && (_0x27fb8b[_0x34c627(0x598)] = _0x2ec442[_0x34c627(0x51c)]);                                                 continue;                                             case '1':                                                 (_0x2ec442[_0x34c627(0x54f)](_0x27fb8b[_0x34c627(0x598)], _0x2ec442[_0x34c627(0x2d4)]) || _0x2ec442[_0x34c627(0x463)](_0x27fb8b[_0x34c627(0x598)], _0x2ec442[_0x34c627(0x34a)]) || _0x2ec442[_0x34c627(0x4d9)](_0x27fb8b[_0x34c627(0x598)], _0x2ec442[_0x34c627(0x333)])) && (_0x27fb8b[_0x34c627(0x1f2)][_0x34c627(0x5af)] = _0x27fb8b[_0x34c627(0x1f2)][_0x34c627(0x5af)][_0x34c627(0x58e)](), _0x27fb8b[_0x34c627(0x1f2)][_0x34c627(0x5af)][_0x34c627(0x425) + 'e'] = !![], limojiJiaodaiObjs[_0x34c627(0x537)](_0x27fb8b));                                                 continue;                                             case '2':                                                 _0x2ec442[_0x34c627(0x54f)](_0x36ac87[_0x34c627(0x598)], _0x2ec442[_0x34c627(0x32b)]) && (_0x27fb8b[_0x34c627(0x598)] = _0x2ec442[_0x34c627(0x3d8)]);                                                 continue;                                             case '3':                                                 limoClickObjs[_0x34c627(0x537)](_0x27fb8b);                                                 continue;                                             case '4':                                                 _0x2ec442[_0x34c627(0x272)](_0x36ac87[_0x34c627(0x598)], _0x2ec442[_0x34c627(0x4fd)]) && (_0x27fb8b[_0x34c627(0x598)] = _0x2ec442[_0x34c627(0x32a)]);                                                 continue;                                             }                                             break;                                         }                                     }                                 });                             else {                                 if (_0xaa7790[_0x872ecc(0x40e)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4f1)]) || _0xaa7790[_0x872ecc(0x437)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x223)]) || _0xaa7790[_0x872ecc(0x263)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1ec)]) || _0xaa7790[_0x872ecc(0x367)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x46e)]) || _0xaa7790[_0x872ecc(0x1bb)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x43b)]))                                     _0x36ac87[_0x872ecc(0x4aa)](_0x4bd9c4 => {                                         const _0x5e9db6 = _0x872ecc;                                         if (_0x4bd9c4[_0x5e9db6(0x5c2)]) {                                             const _0x5e914c = _0x2ec442[_0x5e9db6(0x5bc)][_0x5e9db6(0x1a5)]('|');                                             let _0x1115d6 = -0x1f1 * 0x14 + 0x355 * -0x1 + -0x1 * -0x2a29;                                             while (!![]) {                                                 switch (_0x5e914c[_0x1115d6++]) {                                                 case '0':                                                     _0x2ec442[_0x5e9db6(0x3b9)](_0x36ac87[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x4cb)]) && (_0x4bd9c4[_0x5e9db6(0x598)] = _0x2ec442[_0x5e9db6(0x5fd)]);                                                     continue;                                                 case '1':                                                     _0x2ec442[_0x5e9db6(0x54f)](_0x36ac87[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x53a)]) && (_0x4bd9c4[_0x5e9db6(0x598)] = _0x2ec442[_0x5e9db6(0x3c8)]);                                                     continue;                                                 case '2':                                                     _0x2ec442[_0x5e9db6(0x4d9)](_0x36ac87[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x4b4)]) && (_0x4bd9c4[_0x5e9db6(0x598)] = _0x2ec442[_0x5e9db6(0x1d6)]);                                                     continue;                                                 case '3':                                                     limoClickObjs[_0x5e9db6(0x537)](_0x4bd9c4);                                                     continue;                                                 case '4':                                                     _0x2ec442[_0x5e9db6(0x1bc)](_0x36ac87[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x539)]) && (_0x4bd9c4[_0x5e9db6(0x598)] = _0x2ec442[_0x5e9db6(0x3e6)]);                                                     continue;                                                 case '5':                                                     _0x2ec442[_0x5e9db6(0x579)](_0x36ac87[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x324)]) && (_0x4bd9c4[_0x5e9db6(0x598)] = _0x2ec442[_0x5e9db6(0x470)]);                                                     continue;                                                 case '6':                                                     (_0x2ec442[_0x5e9db6(0x1b2)](_0x4bd9c4[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x586)]) || _0x2ec442[_0x5e9db6(0x3e2)](_0x4bd9c4[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x5ea)]) || _0x2ec442[_0x5e9db6(0x4d9)](_0x4bd9c4[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x403)]) || _0x2ec442[_0x5e9db6(0x360)](_0x4bd9c4[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x33a)]) || _0x2ec442[_0x5e9db6(0x4b5)](_0x4bd9c4[_0x5e9db6(0x598)], _0x2ec442[_0x5e9db6(0x431)])) && (_0x4bd9c4[_0x5e9db6(0x1f2)][_0x5e9db6(0x5af)] = _0x4bd9c4[_0x5e9db6(0x1f2)][_0x5e9db6(0x5af)][_0x5e9db6(0x58e)](), _0x4bd9c4[_0x5e9db6(0x1f2)][_0x5e9db6(0x5af)][_0x5e9db6(0x425) + 'e'] = !![], limojiJiaodaiObjs[_0x5e9db6(0x537)](_0x4bd9c4));                                                     continue;                                                 }                                                 break;                                             }                                         }                                     });                                 else {                                     if (_0xaa7790[_0x872ecc(0x213)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5b1)]) || _0xaa7790[_0x872ecc(0x592)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x22d)]) || _0xaa7790[_0x872ecc(0x3a1)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2e0)]) || _0xaa7790[_0x872ecc(0x4cf)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3c6)]) || _0xaa7790[_0x872ecc(0x37d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3ce)]) || _0xaa7790[_0x872ecc(0x3b5)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5b5)]) || _0xaa7790[_0x872ecc(0x4b0)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x544)]) || _0xaa7790[_0x872ecc(0x4e1)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x38d)]))                                         _0x36ac87[_0x872ecc(0x4aa)](_0x1eb6bc => {                                             const _0x1fe726 = _0x872ecc;                                             if (_0x1eb6bc[_0x1fe726(0x5c2)]) {                                                 let _0x172d58 = _0x36ac87[_0x1fe726(0x598)][_0x1fe726(0x328)](0x1831 + 0x2 * 0x8c4 + 0xde7 * -0x3);                                                 _0x1eb6bc[_0x1fe726(0x598)] = _0x2ec442[_0x1fe726(0x3b8)](_0x2ec442[_0x1fe726(0x555)], _0x172d58), limoClickObjs[_0x1fe726(0x537)](_0x1eb6bc);                                             }                                         });                                     else                                         (_0xaa7790[_0x872ecc(0x202)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x50b)]) || _0xaa7790[_0x872ecc(0x46c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x36f)]) || _0xaa7790[_0x872ecc(0x52f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3e5)]) || _0xaa7790[_0x872ecc(0x19d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3d3)]) || _0xaa7790[_0x872ecc(0x460)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x39e)]) || _0xaa7790[_0x872ecc(0x442)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2dd)]) || _0xaa7790[_0x872ecc(0x57c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x49c)]) || _0xaa7790[_0x872ecc(0x20f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x22e)])) && _0x36ac87[_0x872ecc(0x4aa)](_0x38d7f0 => {                                             const _0xb7408e = _0x872ecc;                                             if (_0x38d7f0[_0xb7408e(0x5c2)]) {                                                 let _0x1aadc4 = _0x36ac87[_0xb7408e(0x598)][_0xb7408e(0x328)](-0x4 * -0x6bf + -0x1af7 + 0x0);                                                 _0x38d7f0[_0xb7408e(0x598)] = _0xaa7790[_0xb7408e(0x246)](_0xaa7790[_0xb7408e(0x2b3)], _0x1aadc4), limoClickObjs[_0xb7408e(0x537)](_0x38d7f0);                                             }                                         });                                 }                             }                         }                     } else {                         if (_0xaa7790[_0x872ecc(0x2f1)](_0x3ce9c0[_0x872ecc(0x598)], '报警')) {                             if (_0xaa7790[_0x872ecc(0x4a9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1fc)])) {                                 const _0x140b23 = _0xaa7790[_0x872ecc(0x4de)][_0x872ecc(0x1a5)]('|');                                 let _0x4fd69f = -0x24ad + -0x2627 + 0x4ad4;                                 while (!![]) {                                     switch (_0x140b23[_0x4fd69f++]) {                                     case '0':                                         _0x36ac87[_0x872ecc(0x4aa)](_0x245398 => {                                             const _0x2f1e58 = _0x872ecc;                                             _0x245398[_0x2f1e58(0x5c2)] && (_0x245398[_0x2f1e58(0x598)] = _0xaa7790[_0x2f1e58(0x51e)], junhuaClickObjs[_0x2f1e58(0x537)](_0x245398));                                         });                                         continue;                                     case '1':                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                             -(-0x1470 + -0x929 + 0x2b6c + 0.7296999999998661),                                             0xa16 * 0x1 + -0x1ad8 + 0x4 * 0x47a + 0.8965000000000032,                                             -(-0x1d3d * -0x1 + 0x1f86 + 0xa * -0x5b7 + 0.4296000000000504)                                         ];                                         continue;                                     case '2':                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x28b)];                                         continue;                                     case '3':                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                             -(-0x2 * 0x6e2 + 0x57e * 0x1 + 0x1 * 0x161b + 0.38000000000010914),                                             -0x24ee + 0x246d + 0x1a3 * 0x1 + 0.2799999999999727,                                             -(0x740 + 0x6 * -0x12d + 0x388 + 0.5299999999999727)                                         ];                                         continue;                                     case '4':                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0xaa7790[_0x872ecc(0x46c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4f2)])) {                                     const _0x478f77 = _0xaa7790[_0x872ecc(0x466)][_0x872ecc(0x1a5)]('|');                                     let _0x5d70d8 = -0x21a9 + 0x17ff * -0x1 + -0x5c4 * -0xa;                                     while (!![]) {                                         switch (_0x478f77[_0x5d70d8++]) {                                         case '0':                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                 -(-0x22a * -0x4 + -0x16b + 0x1 * 0x5b7 + 0.9400000000000546),                                                 -0x13d * -0x4 + -0x25fd + 0x222b + 0.2699999999999818,                                                 -(0xc6a + -0x586 + -0x32a + 0.5199999999999818)                                             ];                                             continue;                                         case '1':                                             _0x36ac87[_0x872ecc(0x4aa)](_0x4cecfd => {                                                 const _0x1cfe56 = _0x872ecc;                                                 _0x4cecfd[_0x1cfe56(0x5c2)] && (_0x4cecfd[_0x1cfe56(0x598)] = _0xaa7790[_0x1cfe56(0x51e)], junhuaClickObjs[_0x1cfe56(0x537)](_0x4cecfd));                                             });                                             continue;                                         case '2':                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                 -(-0x132b + 0x2 * 0x218 + -0x37 * -0x82 + 0.5280999999999949),                                                 -0x1308 + -0xbec + 0x2019 + 0.6465999999999781,                                                 -(-0xb3d + -0xa * -0x122 + -0x1 * -0x38e + 0.2480000000000473)                                             ];                                             continue;                                         case '3':                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                             continue;                                         case '4':                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x565)];                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0xaa7790[_0x872ecc(0x234)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x45a)])) {                                         const _0x855a7a = _0xaa7790[_0x872ecc(0x573)][_0x872ecc(0x1a5)]('|');                                         let _0xaf6174 = 0x40 * -0x99 + -0x83 * -0x3d + -0x1 * -0x709;                                         while (!![]) {                                             switch (_0x855a7a[_0xaf6174++]) {                                             case '0':                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                     -(0x3 * -0x2d + 0x1640 + -0xbec + 0.38000000000010914),                                                     0x2 * 0xd62 + 0xa * -0x32c + -0x29 * -0x26 + 0.2799999999999727,                                                     -(0x1253 + -0x1cc9 + -0x1 * -0xe30 + 0.5299999999999727)                                                 ];                                                 continue;                                             case '1':                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x216a60 => {                                                     const _0x489394 = _0x872ecc;                                                     _0x216a60[_0x489394(0x5c2)] && (_0x216a60[_0x489394(0x598)] = _0x2ec442[_0x489394(0x5f8)], junhuaClickObjs[_0x489394(0x537)](_0x216a60));                                                 });                                                 continue;                                             case '2':                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3a3)];                                                 continue;                                             case '3':                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                     -(0x1c01 + -0x518 * -0x1 + -0x174e + 0.5189999999997781),                                                     0x64 * -0x1c + -0x16c5 + 0x22dd + 0.07049999999998136,                                                     -(-0x2558 + -0x5 * 0x141 + 0x2f39 + 0.9367999999999483)                                                 ];                                                 continue;                                             case '4':                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0xaa7790[_0x872ecc(0x45f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1b3)])) {                                             const _0x5875c7 = _0xaa7790[_0x872ecc(0x393)][_0x872ecc(0x1a5)]('|');                                             let _0x15a276 = 0x8 * -0x5a + -0xf7d + 0x3a9 * 0x5;                                             while (!![]) {                                                 switch (_0x5875c7[_0x15a276++]) {                                                 case '0':                                                     _0x36ac87[_0x872ecc(0x4aa)](_0x4f2183 => {                                                         const _0x95dcac = _0x872ecc;                                                         _0x4f2183[_0x95dcac(0x5c2)] && (_0x4f2183[_0x95dcac(0x598)] = _0x2ec442[_0x95dcac(0x5f8)], limoClickObjs[_0x95dcac(0x537)](_0x4f2183));                                                     });                                                     continue;                                                 case '1':                                                     fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                     continue;                                                 case '2':                                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x302)];                                                     continue;                                                 case '3':                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                         -(-0x304 + -0xb * 0x20b + 0x2 * 0x130d + 0.6599999999998545),                                                         0x1612 + -0x455 * 0x1 + -0x1160 + 0.7999999999999972,                                                         -(-0x25df + -0x91f + -0xf * -0x38f + 0.43000000000006366)                                                     ];                                                     continue;                                                 case '4':                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                         -(-0x254d + -0xd7a + 0x3f64 + 0.671100000000024),                                                         -0x10a4 + 0x128 * 0x10 + -0x16f * 0x1 + 0.6655999999999977,                                                         -(0x1f15 + 0x1 * -0xb63 + 0x461 * -0x3 + 0.5574999999998909)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0xaa7790[_0x872ecc(0x313)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x26a)])) {                                                 const _0x4f1156 = _0xaa7790[_0x872ecc(0x568)][_0x872ecc(0x1a5)]('|');                                                 let _0x183eaa = 0x1d3b + 0x2 * 0xdd5 + -0x3cb * 0xf;                                                 while (!![]) {                                                     switch (_0x4f1156[_0x183eaa++]) {                                                     case '0':                                                         _0x36ac87[_0x872ecc(0x4aa)](_0x596e9f => {                                                             const _0x5d7155 = _0x872ecc;                                                             _0x596e9f[_0x5d7155(0x5c2)] && (_0x596e9f[_0x5d7155(0x598)] = _0x2ec442[_0x5d7155(0x5f8)], limoClickObjs[_0x5d7155(0x537)](_0x596e9f));                                                         });                                                         continue;                                                     case '1':                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                             -(-0x9ff + -0xea * 0xa + 0x2036 + 0.17299999999977445),                                                             0x189 * 0x13 + 0x191c + -0x35df + 0.6821000000000055,                                                             -(-0x253c * -0x1 + -0x1851 * 0x1 + -0x3 * 0x21d + 0.7657999999998992)                                                         ];                                                         continue;                                                     case '2':                                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                         continue;                                                     case '3':                                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x4f3)];                                                         continue;                                                     case '4':                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                             -(-0xc0e * 0x2 + 0x6d3 + 0x199 * 0x13 + 0.8000000000001819),                                                             -0x1 * 0x1202 + -0x19a9 * 0x1 + 0x2c08 + 0.769999999999996,                                                             -(-0x3bb + 0x10e0 + -0x2 * 0x361 + 0.2999999999999545)                                                         ];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0xaa7790[_0x872ecc(0x4e9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2ca)])) {                                                     const _0xc966a5 = _0xaa7790[_0x872ecc(0x432)][_0x872ecc(0x1a5)]('|');                                                     let _0x5b8379 = 0x22 * 0xbf + 0x11d1 * -0x1 + -0x78d;                                                     while (!![]) {                                                         switch (_0xc966a5[_0x5b8379++]) {                                                         case '0':                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                 -(0xed + 0x1 * 0x1231 + 0x1 * -0x593 + 0.75),                                                                 -0x19c3 + 0x1 * -0x1ed6 + -0x17 * -0x27a + 0.769999999999996,                                                                 -(-0x11c * 0x1a + -0x1 * 0x44b + -0x2 * -0x13c3 + 0.31999999999993634)                                                             ];                                                             continue;                                                         case '1':                                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3d4)];                                                             continue;                                                         case '2':                                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                             continue;                                                         case '3':                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                 -(0x1a75 + 0x643 * 0x2 + -0x1970 + 0.7907000000000153),                                                                 -0x1 * -0x1f51 + -0x1a11 * 0x1 + -0x11 * 0x49 + 0.4047000000000054,                                                                 -(0x1e09 * -0x1 + -0x20e1 + 0x4578 + 0.8554999999998927)                                                             ];                                                             continue;                                                         case '4':                                                             _0x36ac87[_0x872ecc(0x4aa)](_0xa04838 => {                                                                 const _0x474dbc = _0x872ecc;                                                                 _0xa04838[_0x474dbc(0x5c2)] && (_0xa04838[_0x474dbc(0x598)] = _0xaa7790[_0x474dbc(0x51e)], limoClickObjs[_0x474dbc(0x537)](_0xa04838));                                                             });                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0xaa7790[_0x872ecc(0x58f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x39f)])) {                                                         const _0x26d931 = _0xaa7790[_0x872ecc(0x2e6)][_0x872ecc(0x1a5)]('|');                                                         let _0x571b88 = -0xadb + 0x449 * 0x2 + 0x249;                                                         while (!![]) {                                                             switch (_0x26d931[_0x571b88++]) {                                                             case '0':                                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                 continue;                                                             case '1':                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                     -(-0x16f5 + 0x32e + 0x21d7 + 0.6900000000000546),                                                                     -0x1776 + -0x1ea0 + 0x35 * 0x107 + 0.7600000000000051,                                                                     -(-0xc8 * -0x27 + 0x1f19 + 0x2 * -0x1b97 + 0.2799999999999727)                                                                 ];                                                                 continue;                                                             case '2':                                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x449a0f => {                                                                     const _0x57dfb1 = _0x872ecc;                                                                     _0x449a0f[_0x57dfb1(0x5c2)] && (_0x449a0f[_0x57dfb1(0x598)] = _0xaa7790[_0x57dfb1(0x51e)], limoClickObjs[_0x57dfb1(0x537)](_0x449a0f));                                                                 });                                                                 continue;                                                             case '3':                                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x516)];                                                                 continue;                                                             case '4':                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                     -(-0x675 * -0x1 + 0x24b * -0x2 + 0x1 * 0xc32 + 0.6343000000001666),                                                                     0x7 * -0x3b6 + 0xf90 + 0xace + 0.5769999999999982,                                                                     -(-0xd0f * -0x1 + -0xc09 + -0xc * -0x76 + 0.3106000000000222)                                                                 ];                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0xaa7790[_0x872ecc(0x1aa)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x249)])) {                                                             const _0x28b0d5 = _0xaa7790[_0x872ecc(0x1bf)][_0x872ecc(0x1a5)]('|');                                                             let _0x1fa651 = 0x12b1 + 0x7b5 * 0x5 + -0x393a;                                                             while (!![]) {                                                                 switch (_0x28b0d5[_0x1fa651++]) {                                                                 case '0':                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                         -(0x2163 + -0x8d * 0x43 + -0x1217 * -0x1 + 0.5162000000000262),                                                                         -0x96c + 0x4c3 + 0x50d + 0.45650000000000546,                                                                         -(-0x86 * 0x1b + -0x2180 + 0x362f + 0.42429999999990287)                                                                     ];                                                                     continue;                                                                 case '1':                                                                     _0x36ac87[_0x872ecc(0x4aa)](_0x582a58 => {                                                                         const _0x37e497 = _0x872ecc;                                                                         _0x582a58[_0x37e497(0x5c2)] && (_0x582a58[_0x37e497(0x598)] = _0x2ec442[_0x37e497(0x5f8)], limoClickObjs[_0x37e497(0x537)](_0x582a58));                                                                     });                                                                     continue;                                                                 case '2':                                                                     fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                     continue;                                                                 case '3':                                                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x1f7)];                                                                     continue;                                                                 case '4':                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                         -(-0xb * -0x5e + 0xb * -0xe5 + 0x1 * 0x1461 + 0.03000000000020009),                                                                         -0x1bcb + 0x73c * 0x1 + 0x14ec + 0.7999999999999972,                                                                         -(-0x47 * -0x1f + -0x1179 * -0x1 + -0x13af + 0.40000000000009095)                                                                     ];                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         } else {                                                             if (_0xaa7790[_0x872ecc(0x54d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x59b)])) {                                                                 const _0x4c3ffc = _0xaa7790[_0x872ecc(0x2ea)][_0x872ecc(0x1a5)]('|');                                                                 let _0x4f58a0 = 0x137e + -0x12ed + -0x91;                                                                 while (!![]) {                                                                     switch (_0x4c3ffc[_0x4f58a0++]) {                                                                     case '0':                                                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x5c4)];                                                                         continue;                                                                     case '1':                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                             -(0x4 * -0x7ef + 0xa57 + -0x1 * -0x2467 + 0.05209999999988213),                                                                             0x1614 + -0x1d1e + 0x76d + 0.9133999999999958,                                                                             -(0x1045 + -0xa36 * -0x1 + -0x13f1 + 0.08539999999993597)                                                                         ];                                                                         continue;                                                                     case '2':                                                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                         continue;                                                                     case '3':                                                                         _0x36ac87[_0x872ecc(0x4aa)](_0x35d841 => {                                                                             const _0x58e608 = _0x872ecc;                                                                             _0x35d841[_0x58e608(0x5c2)] && (_0x35d841[_0x58e608(0x598)] = _0x2ec442[_0x58e608(0x5f8)], limoClickObjs[_0x58e608(0x537)](_0x35d841));                                                                         });                                                                         continue;                                                                     case '4':                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                             -(-0x1dc7 + 0xc2e + 0xade * 0x3 + 0.07000000000016371),                                                                             -0xce7 + -0x5 * -0x18f + -0x3 * -0x1d3 + 0.769999999999996,                                                                             -(-0x91 * -0x42 + 0x892 * 0x2 + -0x3023 * 0x1 + 0.30999999999994543)                                                                         ];                                                                         continue;                                                                     }                                                                     break;                                                                 }                                                             } else {                                                                 if (_0xaa7790[_0x872ecc(0x3f7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5f9)])) {                                                                     const _0x3ab3ed = _0xaa7790[_0x872ecc(0x290)][_0x872ecc(0x1a5)]('|');                                                                     let _0x2094f9 = 0x123e * -0x1 + 0x23ea + -0x11ac;                                                                     while (!![]) {                                                                         switch (_0x3ab3ed[_0x2094f9++]) {                                                                         case '0':                                                                             _0x36ac87[_0x872ecc(0x4aa)](_0x176101 => {                                                                                 const _0x291edd = _0x872ecc;                                                                                 _0x176101[_0x291edd(0x5c2)] && (_0x176101[_0x291edd(0x598)] = _0x2ec442[_0x291edd(0x5f8)], limoClickObjs[_0x291edd(0x537)](_0x176101));                                                                             });                                                                             continue;                                                                         case '1':                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                 -(-0xdff + -0x1f3 * -0x2 + 0x1984 + 0.8409999999998945),                                                                                 0x2 * -0xac1 + 0x1de5 + 0x8 * -0x100 + 0.722999999999999,                                                                                 -(-0x1ad2 * 0x1 + -0x24fb * 0x1 + -0xd * -0x569 + 0.9076999999999771)                                                                             ];                                                                             continue;                                                                         case '2':                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                 -(-0x1f2 * 0x2 + -0x13 * -0xdf + 0x161 * 0x2 + 0.5399999999999636),                                                                                 -0x2c2 * -0x3 + 0x1058 + -0x1841 + 0.7600000000000051,                                                                                 -(-0xac6 * -0x1 + -0x1a16 + 0x15b3 + 0.2599999999999909)                                                                             ];                                                                             continue;                                                                         case '3':                                                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x36b)];                                                                             continue;                                                                         case '4':                                                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                             continue;                                                                         }                                                                         break;                                                                     }                                                                 } else {                                                                     if (_0xaa7790[_0x872ecc(0x239)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x299)])) {                                                                         const _0x189d23 = _0xaa7790[_0x872ecc(0x4de)][_0x872ecc(0x1a5)]('|');                                                                         let _0x405237 = -0x2c5 * 0xb + -0x236 * 0xa + 0x3493;                                                                         while (!![]) {                                                                             switch (_0x189d23[_0x405237++]) {                                                                             case '0':                                                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x322991 => {                                                                                     const _0x5f09cc = _0x872ecc;                                                                                     _0x322991[_0x5f09cc(0x5c2)] && (_0x322991[_0x5f09cc(0x598)] = _0xaa7790[_0x5f09cc(0x51e)], limoClickObjs[_0x5f09cc(0x537)](_0x322991));                                                                                 });                                                                                 continue;                                                                             case '1':                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                     -(-0x3 * -0xb0e + -0x1 * -0x5ab + 0x2 * -0xb7e + 0.9456000000000131),                                                                                     0x381 + -0x1 * 0x1fff + 0x1ce1 + 0.5799999999999983,                                                                                     -(-0x3c * 0x17 + -0x39e + 0xf89 + 0.934400000000096)                                                                                 ];                                                                                 continue;                                                                             case '2':                                                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x21c)];                                                                                 continue;                                                                             case '3':                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                     -(-0x2519 + -0x1a * -0x92 + -0x29 * -0xee + 0.5500000000001819),                                                                                     -0x1354 + -0x1 * 0x2635 + 0x2 * 0x1cf3 + 0.7900000000000063,                                                                                     -(-0x1d97 + 0xb90 + 0x32 * 0x7d + 0.38000000000010914)                                                                                 ];                                                                                 continue;                                                                             case '4':                                                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                 continue;                                                                             }                                                                             break;                                                                         }                                                                     } else {                                                                         if (_0xaa7790[_0x872ecc(0x1b9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4e5)])) {                                                                             const _0x213abe = _0xaa7790[_0x872ecc(0x464)][_0x872ecc(0x1a5)]('|');                                                                             let _0x824875 = 0x1bfc + 0xd * -0x17d + -0x8a3;                                                                             while (!![]) {                                                                                 switch (_0x213abe[_0x824875++]) {                                                                                 case '0':                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                         -(-0x1d61 + 0x20f1 + 0x4 * 0x1c1 + 0.599999999999909),                                                                                         -0x829 * 0x4 + 0x383 * 0x1 + 0x19f * 0x13 + 0.22000000000002728,                                                                                         -(-0x13b4 + 0x16f3 + 0x90b * 0x1 + 0.2899999999999636)                                                                                     ];                                                                                     continue;                                                                                 case '1':                                                                                     fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                     continue;                                                                                 case '2':                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                         -(0x2 * 0x1c9 + 0x2 * -0xabb + 0x1c77 * 0x1 + 0.7332999999998719),                                                                                         -0x138a + -0x2002 + 0x6a8 * 0x8 + 0.8772999999999911,                                                                                         -(-0x5 * -0x2e3 + 0x254 + -0x4b0 + 0.637000000000171)                                                                                     ];                                                                                     continue;                                                                                 case '3':                                                                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3d0)];                                                                                     continue;                                                                                 case '4':                                                                                     _0x36ac87[_0x872ecc(0x4aa)](_0x77a5c2 => {                                                                                         const _0x5c73a5 = _0x872ecc;                                                                                         _0x77a5c2[_0x5c73a5(0x5c2)] && (_0x77a5c2[_0x5c73a5(0x598)] = _0xaa7790[_0x5c73a5(0x51e)], shaifenClickObjs[_0x5c73a5(0x537)](_0x77a5c2));                                                                                     });                                                                                     continue;                                                                                 }                                                                                 break;                                                                             }                                                                         } else {                                                                             if (_0xaa7790[_0x872ecc(0x419)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1c0)])) {                                                                                 const _0x3a7aa5 = _0xaa7790[_0x872ecc(0x1e9)][_0x872ecc(0x1a5)]('|');                                                                                 let _0x39a48f = -0x12a9 * 0x2 + 0x1a * -0x118 + 0x41c2;                                                                                 while (!![]) {                                                                                     switch (_0x3a7aa5[_0x39a48f++]) {                                                                                     case '0':                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                             -(-0x446 * 0x7 + -0x8a8 * -0x2 + 0x1773 + 0.17000000000007276),                                                                                             -0x1e32 + 0x1 * -0x190d + 0x3915 + 0.18999999999999773,                                                                                             -(-0x8cf + -0x1 * 0x1fd5 + 0x3794 + 0.7100000000000364)                                                                                         ];                                                                                         continue;                                                                                     case '1':                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                             -(-0x5 * -0x29b + -0x913 + -0x5d * -0x13 + 0.11749999999983629),                                                                                             0xbce + 0x2080 + -0x2a70 * 0x1 + 0.5801999999999907,                                                                                             -(-0x3ee * 0x4 + -0x26fc + -0x45d9 * -0x1 + 0.647899999999936)                                                                                         ];                                                                                         continue;                                                                                     case '2':                                                                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x5ca)];                                                                                         continue;                                                                                     case '3':                                                                                         _0x36ac87[_0x872ecc(0x4aa)](_0x484a16 => {                                                                                             const _0x466b70 = _0x872ecc;                                                                                             _0x484a16[_0x466b70(0x5c2)] && (_0x484a16[_0x466b70(0x598)] = _0x2ec442[_0x466b70(0x5f8)], posuiClickObjs[_0x466b70(0x537)](_0x484a16));                                                                                         });                                                                                         continue;                                                                                     case '4':                                                                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                         continue;                                                                                     }                                                                                     break;                                                                                 }                                                                             } else {                                                                                 if (_0xaa7790[_0x872ecc(0x5ef)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4e0)])) {                                                                                     const _0x22e99e = _0xaa7790[_0x872ecc(0x3a7)][_0x872ecc(0x1a5)]('|');                                                                                     let _0x4fa103 = 0x105a + 0x29 * -0xd + 0xd * -0x119;                                                                                     while (!![]) {                                                                                         switch (_0x22e99e[_0x4fa103++]) {                                                                                         case '0':                                                                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                             continue;                                                                                         case '1':                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                 -(-0x5c * -0x54 + -0x26b1 + -0xb * -0x14e + 0.49080000000003565),                                                                                                 0x58 * 0x42 + -0x453 + -0x49 * 0x3d + 0.017599999999987403,                                                                                                 -(-0x1 * -0x7bb + 0x7 * 0xd3 + 0x288 * -0x1 + 0.1289000000001579)                                                                                             ];                                                                                             continue;                                                                                         case '2':                                                                                             _0x36ac87[_0x872ecc(0x4aa)](_0x1512f0 => {                                                                                                 const _0x260ba5 = _0x872ecc;                                                                                                 _0x1512f0[_0x260ba5(0x5c2)] && (_0x1512f0[_0x260ba5(0x598)] = _0xaa7790[_0x260ba5(0x51e)], duishiClickObjs[_0x260ba5(0x537)](_0x1512f0));                                                                                             });                                                                                             continue;                                                                                         case '3':                                                                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x49d)];                                                                                             continue;                                                                                         case '4':                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                 -(0x1152 + 0x1 * -0x9e9 + -0x16f * 0x1 + 0.8599999999999),                                                                                                 -0x1f91 + 0x839 * 0x1 + -0xc25 * -0x2 + 0.7299999999999898,                                                                                                 -(0x18be + -0x5c * -0x6b + -0x343b * 0x1 + 0.11000000000012733)                                                                                             ];                                                                                             continue;                                                                                         }                                                                                         break;                                                                                     }                                                                                 } else {                                                                                     if (_0xaa7790[_0x872ecc(0x542)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x256)])) {                                                                                         const _0xe86bb1 = _0xaa7790[_0x872ecc(0x31c)][_0x872ecc(0x1a5)]('|');                                                                                         let _0x46f3e4 = -0x4f7 * 0x7 + 0x71 * 0x13 + -0xd2f * -0x2;                                                                                         while (!![]) {                                                                                             switch (_0xe86bb1[_0x46f3e4++]) {                                                                                             case '0':                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                     -(0x1739 + 0x244b + -0x358a + 0.9200000000000728),                                                                                                     -0x226b + -0x3ac + 0x2722 + 0.7300000000000182,                                                                                                     -(-0x97 * -0xb + 0x2361 + 0x2 * -0xe75 + 0.6300000000001091)                                                                                                 ];                                                                                                 continue;                                                                                             case '1':                                                                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x420)];                                                                                                 continue;                                                                                             case '2':                                                                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x457502 => {                                                                                                     const _0x3bfaaf = _0x872ecc;                                                                                                     _0x457502[_0x3bfaaf(0x5c2)] && (_0x457502[_0x3bfaaf(0x598)] = _0xaa7790[_0x3bfaaf(0x51e)], duishiClickObjs[_0x3bfaaf(0x537)](_0x457502));                                                                                                 });                                                                                                 continue;                                                                                             case '3':                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                     -(0xf * 0x21b + -0x2 * -0x61d + 0x9 * -0x438 + 0.169399999999996),                                                                                                     -0x251e + -0x165b + -0x52 * -0xbd + 0.3967000000000098,                                                                                                     -(-0x269e + 0x1594 * -0x1 + 0x4928 + 0.02930000000014843)                                                                                                 ];                                                                                                 continue;                                                                                             case '4':                                                                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                 continue;                                                                                             }                                                                                             break;                                                                                         }                                                                                     } else {                                                                                         if (_0xaa7790[_0x872ecc(0x332)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x42a)])) {                                                                                             const _0x26a93e = _0xaa7790[_0x872ecc(0x1c4)][_0x872ecc(0x1a5)]('|');                                                                                             let _0x1be138 = 0x3fd * 0x5 + 0x142c + -0x5bb * 0x7;                                                                                             while (!![]) {                                                                                                 switch (_0x26a93e[_0x1be138++]) {                                                                                                 case '0':                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                         -(0x521 + 0x1c23 + -0x10fb + 0.0500000000001819),                                                                                                         0x19ee + 0xe0f * 0x1 + -0x2716 + 0.060000000000002274,                                                                                                         -(-0x138 + 0x132d * -0x1 + 0x1ca6 + 0.5500000000001819)                                                                                                     ];                                                                                                     continue;                                                                                                 case '1':                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                         -(0x14d6 + -0x34 * 0x68 + 0x1093 + 0.4228000000002794),                                                                                                         0x152f * -0x1 + -0x6e3 * -0x5 + -0x1 * 0xc53 + 0.5186999999999955,                                                                                                         -(-0xc4e + 0x1e5 + -0x12d3 * -0x1 + 0.3270999999999731)                                                                                                     ];                                                                                                     continue;                                                                                                 case '2':                                                                                                     _0x36ac87[_0x872ecc(0x4aa)](_0x328adb => {                                                                                                         const _0x88f07d = _0x872ecc;                                                                                                         _0x328adb[_0x88f07d(0x5c2)] && (_0x328adb[_0x88f07d(0x598)] = _0x2ec442[_0x88f07d(0x5f8)], suishiClickObjs[_0x88f07d(0x537)](_0x328adb));                                                                                                     });                                                                                                     continue;                                                                                                 case '3':                                                                                                     fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                     continue;                                                                                                 case '4':                                                                                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x450)];                                                                                                     continue;                                                                                                 }                                                                                                 break;                                                                                             }                                                                                         } else {                                                                                             if (_0xaa7790[_0x872ecc(0x5c7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x33f)])) {                                                                                                 const _0x28920c = _0xaa7790[_0x872ecc(0x330)][_0x872ecc(0x1a5)]('|');                                                                                                 let _0x2782f6 = -0xd77 * 0x1 + 0x1c01 * -0x1 + 0x2978;                                                                                                 while (!![]) {                                                                                                     switch (_0x28920c[_0x2782f6++]) {                                                                                                     case '0':                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                             -(0xb85 + -0xfaa * -0x1 + 0xc6d * -0x1 + 0.1950000000001637),                                                                                                             0x5fb * -0x1 + 0x9a2 + 0x281 * -0x1 + 0.7178000000000111,                                                                                                             -(-0x16d0 + -0x41e + -0x1 * -0x1e8d + 0.38610000000005584)                                                                                                         ];                                                                                                         continue;                                                                                                     case '1':                                                                                                         _0x36ac87[_0x872ecc(0x4aa)](_0x952cb8 => {                                                                                                             const _0x422a67 = _0x872ecc;                                                                                                             _0x952cb8[_0x422a67(0x5c2)] && (_0x952cb8[_0x422a67(0x598)] = _0xaa7790[_0x422a67(0x3f4)], junhuaClickObjs[_0x422a67(0x537)](_0x952cb8));                                                                                                         });                                                                                                         continue;                                                                                                     case '2':                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                             -(-0x314 + -0x561 + -0x11b * -0x15 + 0.9299999999998363),                                                                                                             0x1 * 0x1f21 + -0x1 * -0x1b3b + 0xa * -0x5b9 + 0.2300000000000182,                                                                                                             -(-0x2703 * -0x1 + 0x1c17 + -0x6 * 0xa90 + 0.5199999999999818)                                                                                                         ];                                                                                                         continue;                                                                                                     case '3':                                                                                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x1cd)];                                                                                                         continue;                                                                                                     case '4':                                                                                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                         continue;                                                                                                     }                                                                                                     break;                                                                                                 }                                                                                             } else {                                                                                                 if (_0xaa7790[_0x872ecc(0x429)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4b7)])) {                                                                                                     const _0xffc02b = _0xaa7790[_0x872ecc(0x2aa)][_0x872ecc(0x1a5)]('|');                                                                                                     let _0x5c6ab7 = 0xe4f * 0x1 + -0x7 * -0x401 + -0x2a56;                                                                                                     while (!![]) {                                                                                                         switch (_0xffc02b[_0x5c6ab7++]) {                                                                                                         case '0':                                                                                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                             continue;                                                                                                         case '1':                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                 -(0x270d + -0xbe2 + -0xd2e + 0.19090000000005602),                                                                                                                 0x3e * 0x73 + 0x163 + -0x11 * 0x1a7 + 0.30869999999998754,                                                                                                                 -(0x10df + 0x24fd + -0x323c * 0x1 + 0.6746000000000549)                                                                                                             ];                                                                                                             continue;                                                                                                         case '2':                                                                                                             _0x36ac87[_0x872ecc(0x4aa)](_0x2d6bae => {                                                                                                                 const _0x5f3035 = _0x872ecc;                                                                                                                 _0x2d6bae[_0x5f3035(0x5c2)] && (_0x2d6bae[_0x5f3035(0x598)] = _0xaa7790[_0x5f3035(0x3f4)], junhuaClickObjs[_0x5f3035(0x537)](_0x2d6bae));                                                                                                             });                                                                                                             continue;                                                                                                         case '3':                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                 -(0x1c9 + -0x1248 + 0x1e7c + 0.8899999999998727),                                                                                                                 0x1a * 0x10d + 0x5bf * -0x5 + 0x15 * 0x1f + 0.22000000000002728,                                                                                                                 -(0x993 + -0xe7c + 0x21 * 0x43 + 0.4800000000000182)                                                                                                             ];                                                                                                             continue;                                                                                                         case '4':                                                                                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x1be)];                                                                                                             continue;                                                                                                         }                                                                                                         break;                                                                                                     }                                                                                                 } else {                                                                                                     if (_0xaa7790[_0x872ecc(0x1e8)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x241)])) {                                                                                                         const _0x5249cc = _0xaa7790[_0x872ecc(0x545)][_0x872ecc(0x1a5)]('|');                                                                                                         let _0x3001f2 = 0x22dd + 0x44b + -0x2728;                                                                                                         while (!![]) {                                                                                                             switch (_0x5249cc[_0x3001f2++]) {                                                                                                             case '0':                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                     -(0x2178 + -0xe5 * -0x16 + 0x1 * -0x27a3 + 0.07000000000016371),                                                                                                                     -0x1 * 0x2315 + 0x1300 + 0x1137 + 0.2300000000000182,                                                                                                                     -(-0x1ddd + 0x1a06 + -0xd * -0x95 + 0.44000000000005457)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '1':                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                     -(-0x6 * 0x251 + -0x1 * -0x73 + 0x1af6 + 0.2199000000000524),                                                                                                                     -0x23 + -0x2 * -0xe2c + -0x1b10 + 0.7355000000000018,                                                                                                                     -(0xdf2 + 0x61f * -0x1 + -0x165 * 0x3 + 0.30750000000000455)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '2':                                                                                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                 continue;                                                                                                             case '3':                                                                                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x404)];                                                                                                                 continue;                                                                                                             case '4':                                                                                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x5dd6f0 => {                                                                                                                     const _0xfea0fd = _0x872ecc;                                                                                                                     _0x5dd6f0[_0xfea0fd(0x5c2)] && (_0x5dd6f0[_0xfea0fd(0x598)] = _0x2ec442[_0xfea0fd(0x423)], junhuaClickObjs[_0xfea0fd(0x537)](_0x5dd6f0));                                                                                                                 });                                                                                                                 continue;                                                                                                             }                                                                                                             break;                                                                                                         }                                                                                                     } else {                                                                                                         if (_0xaa7790[_0x872ecc(0x215)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1ae)])) {                                                                                                             const _0x534f8d = _0xaa7790[_0x872ecc(0x493)][_0x872ecc(0x1a5)]('|');                                                                                                             let _0x505837 = -0x1d71 + -0x57b + -0xa * -0x37e;                                                                                                             while (!![]) {                                                                                                                 switch (_0x534f8d[_0x505837++]) {                                                                                                                 case '0':                                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                         -(0x1a89 * 0x1 + -0x3 * -0x301 + -0x16df + 0.4899999999997817),                                                                                                                         0x2547 + 0x33 * 0x83 + -0x3e3e + 0.2300000000000182,                                                                                                                         -(-0x6b2 + 0x1 * 0x180f + -0xda3 + 0.4700000000000273)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 case '1':                                                                                                                     fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                     continue;                                                                                                                 case '2':                                                                                                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x596)];                                                                                                                     continue;                                                                                                                 case '3':                                                                                                                     _0x36ac87[_0x872ecc(0x4aa)](_0x174d4f => {                                                                                                                         const _0x436103 = _0x872ecc;                                                                                                                         _0x174d4f[_0x436103(0x5c2)] && (_0x174d4f[_0x436103(0x598)] = _0xaa7790[_0x436103(0x3f4)], junhuaClickObjs[_0x436103(0x537)](_0x174d4f));                                                                                                                     });                                                                                                                     continue;                                                                                                                 case '4':                                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                         -(-0x93 + 0xb2 * -0x35 + -0x3 * -0x10b3 + 0.6161999999999352),                                                                                                                         -0x11c4 * 0x1 + -0x1 * -0x14b7 + -0x1 * 0x1cd + 0.31869999999997844,                                                                                                                         -(0x1670 + -0x1f9d + 0xccd + 0.6698999999999842)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 }                                                                                                                 break;                                                                                                             }                                                                                                         } else {                                                                                                             if (_0xaa7790[_0x872ecc(0x1b9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4bf)])) {                                                                                                                 const _0x1dda61 = _0xaa7790[_0x872ecc(0x1e1)][_0x872ecc(0x1a5)]('|');                                                                                                                 let _0xf17c75 = -0x1372 + 0xdcf + -0x1e1 * -0x3;                                                                                                                 while (!![]) {                                                                                                                     switch (_0x1dda61[_0xf17c75++]) {                                                                                                                     case '0':                                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                             -(-0x20d9 + -0x9 * 0x1b0 + 0x3bdb + 0.4776999999999134),                                                                                                                             0x2 * -0xf69 + -0x4c1 * -0x1 + 0x1b36 + 0.9200000000000159,                                                                                                                             -(0x816 + -0x2274 + 0x1e01 * 0x1 + 0.15260000000000673)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     case '1':                                                                                                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x497)];                                                                                                                         continue;                                                                                                                     case '2':                                                                                                                         _0x36ac87[_0x872ecc(0x4aa)](_0x1f98be => {                                                                                                                             const _0x49da04 = _0x872ecc;                                                                                                                             _0x1f98be[_0x49da04(0x5c2)] && (_0x1f98be[_0x49da04(0x598)] = _0x2ec442[_0x49da04(0x423)], junhuaClickObjs[_0x49da04(0x537)](_0x1f98be));                                                                                                                         });                                                                                                                         continue;                                                                                                                     case '3':                                                                                                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                         continue;                                                                                                                     case '4':                                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                             -(-0x8e * -0x7 + 0x1854 + -0x4 * 0x419 + 0.3200000000001637),                                                                                                                             0x11fe + -0xafd + 0x1f5 * -0x3 + 0.2300000000000182,                                                                                                                             -(-0x175b + 0x235 * 0xb + 0x167 * 0x2 + 0.4500000000000455)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     }                                                                                                                     break;                                                                                                                 }                                                                                                             } else {                                                                                                                 if (_0xaa7790[_0x872ecc(0x3ad)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x35a)])) {                                                                                                                     const _0x3f0c5b = _0xaa7790[_0x872ecc(0x3d5)][_0x872ecc(0x1a5)]('|');                                                                                                                     let _0x11b692 = 0x22cb + -0x690 + -0x1c3b;                                                                                                                     while (!![]) {                                                                                                                         switch (_0x3f0c5b[_0x11b692++]) {                                                                                                                         case '0':                                                                                                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x27d)];                                                                                                                             continue;                                                                                                                         case '1':                                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                 -(-0x17b4 + 0x5f2 + -0x1b * -0x114 + 0.8919000000000779),                                                                                                                                 0x249f + 0xa8 * 0x3 + -0x2571 + 0.11419999999998254,                                                                                                                                 -(-0x18d * 0x7 + -0x2696 + 0x3513 + 0.08090000000004238)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         case '2':                                                                                                                             _0x36ac87[_0x872ecc(0x4aa)](_0x542894 => {                                                                                                                                 const _0x31615b = _0x872ecc;                                                                                                                                 _0x542894[_0x31615b(0x5c2)] && (_0x542894[_0x31615b(0x598)] = _0xaa7790[_0x31615b(0x3f4)], junhuaClickObjs[_0x31615b(0x537)](_0x542894));                                                                                                                             });                                                                                                                             continue;                                                                                                                         case '3':                                                                                                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                             continue;                                                                                                                         case '4':                                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                 -(-0x64b * 0x4 + -0x10 * 0x1d6 + -0x1 * -0x41e7 + 0.38999999999987267),                                                                                                                                 0x7a1 + 0x1b91 + -0x8 * 0x442 + 0.2300000000000182,                                                                                                                                 -(0x9d * 0x39 + 0x1a37 + 0x2 * -0x1cb9 + 0.6000000000000227)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         }                                                                                                                         break;                                                                                                                     }                                                                                                                 } else {                                                                                                                     if (_0xaa7790[_0x872ecc(0x3f7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5e2)])) {                                                                                                                         const _0x2ca051 = _0xaa7790[_0x872ecc(0x2aa)][_0x872ecc(0x1a5)]('|');                                                                                                                         let _0x3499cc = -0xb23 * -0x1 + -0xbdf + 0xbc;                                                                                                                         while (!![]) {                                                                                                                             switch (_0x2ca051[_0x3499cc++]) {                                                                                                                             case '0':                                                                                                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                 continue;                                                                                                                             case '1':                                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                     -(-0x8f5 + -0x641 * 0x6 + 0x4 * 0xe39 + 0.29599999999982174),                                                                                                                                     -0x180e + 0x1b8 * -0xa + 0x2a64 + 0.11419999999998254,                                                                                                                                     -(-0x29e + 0x18d9 + -0x1 * 0x129a + 0.9664000000000215)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '2':                                                                                                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x1365a1 => {                                                                                                                                     const _0x1769b2 = _0x872ecc;                                                                                                                                     _0x1365a1[_0x1769b2(0x5c2)] && (_0x1365a1[_0x1769b2(0x598)] = _0x2ec442[_0x1769b2(0x423)], junhuaClickObjs[_0x1769b2(0x537)](_0x1365a1));                                                                                                                                 });                                                                                                                                 continue;                                                                                                                             case '3':                                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                     -(0x279 * 0xb + 0x59 * -0xf + -0x1 * 0xb93 + 0.13000000000010914),                                                                                                                                     0x1 * 0x229f + 0x16a4 + -0x3821 + 0.2300000000000182,                                                                                                                                     -(-0x2 * -0x6c2 + 0x1167 + -0x1 * 0x1b31 + 0.4900000000000091)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '4':                                                                                                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x24e)];                                                                                                                                 continue;                                                                                                                             }                                                                                                                             break;                                                                                                                         }                                                                                                                     } else {                                                                                                                         if (_0xaa7790[_0x872ecc(0x279)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x24a)])) {                                                                                                                             const _0x24b6fb = _0xaa7790[_0x872ecc(0x26b)][_0x872ecc(0x1a5)]('|');                                                                                                                             let _0x4e95db = -0x163f + -0x1 * -0x2489 + 0xe4a * -0x1;                                                                                                                             while (!![]) {                                                                                                                                 switch (_0x24b6fb[_0x4e95db++]) {                                                                                                                                 case '0':                                                                                                                                     _0x36ac87[_0x872ecc(0x4aa)](_0x17f6db => {                                                                                                                                         const _0x503691 = _0x872ecc;                                                                                                                                         _0x17f6db[_0x503691(0x5c2)] && (_0x17f6db[_0x503691(0x598)] = _0x2ec442[_0x503691(0x423)], junhuaClickObjs[_0x503691(0x537)](_0x17f6db));                                                                                                                                     });                                                                                                                                     continue;                                                                                                                                 case '1':                                                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                         -(-0x13 * -0x106 + 0x1218 + -0x1bc6 + 0.3400000000001455),                                                                                                                                         0xe48 + 0x22a5 + -0x2fc7 + 0.29869999999999663,                                                                                                                                         -(0x3d7 + 0x123b + 0x626 * -0x3 + 0.7951000000000477)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 case '2':                                                                                                                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3af)];                                                                                                                                     continue;                                                                                                                                 case '3':                                                                                                                                     fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                     continue;                                                                                                                                 case '4':                                                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                         -(0x137 * -0x1d + 0x21d * 0x1 + -0x2ae2 * -0x1 + 0.3400000000001455),                                                                                                                                         -0x1503 * 0x1 + -0x21f7 + 0x381c + 0.20999999999997954,                                                                                                                                         -(0xf1 * -0x1b + -0x1e6c + 0x17 * 0x297 + 0.6100000000000136)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 }                                                                                                                                 break;                                                                                                                             }                                                                                                                         } else {                                                                                                                             if (_0xaa7790[_0x872ecc(0x1b7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x488)])) {                                                                                                                                 const _0x479c13 = _0xaa7790[_0x872ecc(0x1ff)][_0x872ecc(0x1a5)]('|');                                                                                                                                 let _0x2f0527 = -0x9 * -0x125 + 0x1a71 + -0x24be;                                                                                                                                 while (!![]) {                                                                                                                                     switch (_0x479c13[_0x2f0527++]) {                                                                                                                                     case '0':                                                                                                                                         _0x36ac87[_0x872ecc(0x4aa)](_0x110177 => {                                                                                                                                             const _0x1d7a61 = _0x872ecc;                                                                                                                                             _0x110177[_0x1d7a61(0x5c2)] && (_0x110177[_0x1d7a61(0x598)] = _0xaa7790[_0x1d7a61(0x3f4)], junhuaClickObjs[_0x1d7a61(0x537)](_0x110177));                                                                                                                                         });                                                                                                                                         continue;                                                                                                                                     case '1':                                                                                                                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x33e)];                                                                                                                                         continue;                                                                                                                                     case '2':                                                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                             -(-0x33 * 0x74 + 0xa13 * -0x2 + 0x3446 + 0.3000000000001819),                                                                                                                                             -0x20b6 + -0x87a + -0x1529 * -0x2 + 0.2300000000000182,                                                                                                                                             -(0x1b7f + 0x1e6c + -0x3631 * 0x1 + 0.42999999999995)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     case '3':                                                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                             -(0x7 * 0x3a1 + 0x1 * -0x1005 + -0x5e + 0.4659999999998945),                                                                                                                                             -0x6c9 + 0x247f + 0x392 * -0x8 + 0.11419999999998254,                                                                                                                                             -(0xf3e + 0x1e43 * 0x1 + -0x29e0 + 0.9063999999999623)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     case '4':                                                                                                                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                         continue;                                                                                                                                     }                                                                                                                                     break;                                                                                                                                 }                                                                                                                             } else {                                                                                                                                 if (_0xaa7790[_0x872ecc(0x283)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x556)])) {                                                                                                                                     const _0x8a6b4e = _0xaa7790[_0x872ecc(0x59d)][_0x872ecc(0x1a5)]('|');                                                                                                                                     let _0x1e7d43 = -0x57 + 0x129e + -0x1247;                                                                                                                                     while (!![]) {                                                                                                                                         switch (_0x8a6b4e[_0x1e7d43++]) {                                                                                                                                         case '0':                                                                                                                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                             continue;                                                                                                                                         case '1':                                                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                                 -(0x21a6 + -0x1c * -0x130 + -0x10 * 0x3ab + 0.2199999999997999),                                                                                                                                                 -0x1367 + 0x6 * 0xf3 + -0xed7 * -0x1 + 0.2400000000000091,                                                                                                                                                 -(0x37c + 0x9 * 0x6b + -0x385 + 0.40999999999996817)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '2':                                                                                                                                             _0x36ac87[_0x872ecc(0x4aa)](_0xfd2f0a => {                                                                                                                                                 const _0x59938 = _0x872ecc;                                                                                                                                                 _0xfd2f0a[_0x59938(0x5c2)] && (_0xfd2f0a[_0x59938(0x598)] = _0x2ec442[_0x59938(0x423)], junhuaClickObjs[_0x59938(0x537)](_0xfd2f0a));                                                                                                                                             });                                                                                                                                             continue;                                                                                                                                         case '3':                                                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                                 -(0xa98 + -0x2624 * 0x1 + 0x23c2 + 0.38599999999996726),                                                                                                                                                 -0x1a * 0x4 + 0x3 * 0x79d + -0x1549 + 0.12419999999997344,                                                                                                                                                 -(-0x3 * 0x1fd + -0x1ee + 0xb86 + 0.8863999999999805)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '4':                                                                                                                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x2ba)];                                                                                                                                             continue;                                                                                                                                         }                                                                                                                                         break;                                                                                                                                     }                                                                                                                                 } else {                                                                                                                                     if (_0xaa7790[_0x872ecc(0x4e9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x540)])) {                                                                                                                                         const _0x312202 = _0xaa7790[_0x872ecc(0x563)][_0x872ecc(0x1a5)]('|');                                                                                                                                         let _0x3def09 = -0x343 * 0x7 + -0x23ec + 0x3ac1;                                                                                                                                         while (!![]) {                                                                                                                                             switch (_0x312202[_0x3def09++]) {                                                                                                                                             case '0':                                                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                                     -(-0x99b * -0x2 + -0x1 * 0x26d7 + 0x1b73 + 0.9281000000000859),                                                                                                                                                     -0x1bb8 + -0x25b1 + -0x1 * -0x428f + 0.12419999999997344,                                                                                                                                                     -(-0x1f5a + 0x180 + 0x217b + 0.940900000000056)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             case '1':                                                                                                                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x232924 => {                                                                                                                                                     const _0x15909c = _0x872ecc;                                                                                                                                                     _0x232924[_0x15909c(0x5c2)] && (_0x232924[_0x15909c(0x598)] = _0xaa7790[_0x15909c(0x3f4)], junhuaClickObjs[_0x15909c(0x537)](_0x232924));                                                                                                                                                 });                                                                                                                                                 continue;                                                                                                                                             case '2':                                                                                                                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x204)];                                                                                                                                                 continue;                                                                                                                                             case '3':                                                                                                                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                                 continue;                                                                                                                                             case '4':                                                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                                     -(-0x53c + 0x1 * 0x11e1 + -0x4d3 * 0x1 + 0.43000000000006366),                                                                                                                                                     -0x2525 + -0x50b * 0x1 + 0x2b52 + 0.2400000000000091,                                                                                                                                                     -(-0x1750 + 0x556 + 0x15b4 + 0.4600000000000364)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             }                                                                                                                                             break;                                                                                                                                         }                                                                                                                                     } else {                                                                                                                                         if (_0xaa7790[_0x872ecc(0x35e)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2d5)])) {                                                                                                                                             const _0x405937 = _0xaa7790[_0x872ecc(0x276)][_0x872ecc(0x1a5)]('|');                                                                                                                                             let _0x5ca774 = 0x15a + -0x624 + 0x4ca;                                                                                                                                             while (!![]) {                                                                                                                                                 switch (_0x405937[_0x5ca774++]) {                                                                                                                                                 case '0':                                                                                                                                                     _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x327)];                                                                                                                                                     continue;                                                                                                                                                 case '1':                                                                                                                                                     _0x36ac87[_0x872ecc(0x4aa)](_0x57aaa3 => {                                                                                                                                                         const _0x55a917 = _0x872ecc;                                                                                                                                                         _0x57aaa3[_0x55a917(0x5c2)] && (_0x57aaa3[_0x55a917(0x598)] = _0x2ec442[_0x55a917(0x423)], junhuaClickObjs[_0x55a917(0x537)](_0x57aaa3));                                                                                                                                                     });                                                                                                                                                     continue;                                                                                                                                                 case '2':                                                                                                                                                     fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                                     continue;                                                                                                                                                 case '3':                                                                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                                         -(0xf48 + -0x1cb3 + 0x53 * 0x52 + 0.9600000000000364),                                                                                                                                                         -0x3 * -0xd00 + -0x71 * 0x28 + -0x152f + 0.5,                                                                                                                                                         -(0xe * -0xb + 0x7 * -0xd2 + 0x1 * 0xa66 + 0.9200000000000728)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 case '4':                                                                                                                                                     _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                                         -(-0xe * 0x71 + -0x2616 + -0x27 * -0x179 + 0.9600000000000364),                                                                                                                                                         0xb40 + -0x42a * -0x9 + -0x308d + 0.34770000000000323,                                                                                                                                                         -(0x1 * 0xc89 + -0x1ed6 + -0x1 * -0x1644 + 0.6476000000000113)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 }                                                                                                                                                 break;                                                                                                                                             }                                                                                                                                         } else {                                                                                                                                             if (_0xaa7790[_0x872ecc(0x5c5)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x244)])) {                                                                                                                                                 const _0xc68bac = _0xaa7790[_0x872ecc(0x5a9)][_0x872ecc(0x1a5)]('|');                                                                                                                                                 let _0x50c23e = -0x15a8 + 0x1b * -0x8a + -0x1e * -0x135;                                                                                                                                                 while (!![]) {                                                                                                                                                     switch (_0xc68bac[_0x50c23e++]) {                                                                                                                                                     case '0':                                                                                                                                                         fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                                         continue;                                                                                                                                                     case '1':                                                                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                                             -(0x5 * 0x63d + -0x827 + 0x85 * -0x13 + 0.9400000000000546),                                                                                                                                                             0x11bc + 0x2041 + -0x1 * 0x31d6 + 0.7800000000000011,                                                                                                                                                             -(0xa49 * -0x2 + 0x389 * 0xb + -0xef4 + 0.7300000000000182)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     case '2':                                                                                                                                                         _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x449)];                                                                                                                                                         continue;                                                                                                                                                     case '3':                                                                                                                                                         _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                                             -(-0xcf * 0x21 + -0x190 * -0x3 + -0xe * -0x283 + 0.6552999999998974),                                                                                                                                                             0x22d * -0x7 + -0x631 * 0x1 + 0x1597 + 0.11030000000000229,                                                                                                                                                             -(0x12c1 + 0xfd6 + -0x1f25 + 0.7545000000000073)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     case '4':                                                                                                                                                         _0x36ac87[_0x872ecc(0x4aa)](_0x6b449a => {                                                                                                                                                             const _0x2de32c = _0x872ecc;                                                                                                                                                             _0x6b449a[_0x2de32c(0x5c2)] && (_0x6b449a[_0x2de32c(0x598)] = _0xaa7790[_0x2de32c(0x3f4)], junhuaClickObjs[_0x2de32c(0x537)](_0x6b449a));                                                                                                                                                         });                                                                                                                                                         continue;                                                                                                                                                     }                                                                                                                                                     break;                                                                                                                                                 }                                                                                                                                             } else {                                                                                                                                                 if (_0xaa7790[_0x872ecc(0x36a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2eb)])) {                                                                                                                                                     const _0x3cf59a = _0xaa7790[_0x872ecc(0x4f4)][_0x872ecc(0x1a5)]('|');                                                                                                                                                     let _0x1ece63 = 0x8d0 + -0x3 * 0xf0 + -0x600;                                                                                                                                                     while (!![]) {                                                                                                                                                         switch (_0x3cf59a[_0x1ece63++]) {                                                                                                                                                         case '0':                                                                                                                                                             fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                                             continue;                                                                                                                                                         case '1':                                                                                                                                                             _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x1c8)];                                                                                                                                                             continue;                                                                                                                                                         case '2':                                                                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                                                 -(0x3b5 * -0x1 + -0x1653 + -0x11a1 * -0x2 + 0.21000000000003638),                                                                                                                                                                 -0x1c3 * -0x9 + 0x142d + -0x23df + 0.509999999999998,                                                                                                                                                                 -(0x1e57 + 0x11ea + 0x3 * -0xebc + 0.7100000000000364)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         case '3':                                                                                                                                                             _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                                                 -(-0xee * 0x1 + -0x112 * -0xb + -0x19f + 0.8778999999999542),                                                                                                                                                                 -0x72c + -0x208 + 0x961 * 0x1 + 0.3941999999999979,                                                                                                                                                                 -(-0x3a * -0xd + -0x609 + 0x1c3 * 0x4 + 0.18809999999996307)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         case '4':                                                                                                                                                             _0x36ac87[_0x872ecc(0x4aa)](_0x171b8a => {                                                                                                                                                                 const _0x413f31 = _0x872ecc;                                                                                                                                                                 _0x171b8a[_0x413f31(0x5c2)] && (_0x171b8a[_0x413f31(0x598)] = _0x2ec442[_0x413f31(0x423)], junhuaClickObjs[_0x413f31(0x537)](_0x171b8a));                                                                                                                                                             });                                                                                                                                                             continue;                                                                                                                                                         }                                                                                                                                                         break;                                                                                                                                                     }                                                                                                                                                 } else {                                                                                                                                                     if (_0xaa7790[_0x872ecc(0x36d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x396)])) {                                                                                                                                                         const _0x160086 = _0xaa7790[_0x872ecc(0x57d)][_0x872ecc(0x1a5)]('|');                                                                                                                                                         let _0x1288fe = -0x1e4a + -0x1 * 0xf1c + 0x2d66;                                                                                                                                                         while (!![]) {                                                                                                                                                             switch (_0x160086[_0x1288fe++]) {                                                                                                                                                             case '0':                                                                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x326) + _0x872ecc(0x4d6)] = [                                                                                                                                                                     -(-0x1b66 + -0x1c2f + 0x40cf + 0.15999999999985448),                                                                                                                                                                     -0x1 * -0x15e9 + -0x188a + -0x1 * -0x2c8 + 0.759999999999998,                                                                                                                                                                     -(-0x211f + 0x3 * -0x9bf + 0x41b9 + 0.7999999999999545)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             case '1':                                                                                                                                                                 fenchengnongduDeviceArrs[_0x872ecc(0x537)](_0x36ac87);                                                                                                                                                                 continue;                                                                                                                                                             case '2':                                                                                                                                                                 _0x36ac87[_0x872ecc(0x4aa)](_0x2762ac => {                                                                                                                                                                     const _0x17f7cd = _0x872ecc;                                                                                                                                                                     _0x2762ac[_0x17f7cd(0x5c2)] && (_0x2762ac[_0x17f7cd(0x598)] = _0xaa7790[_0x17f7cd(0x3f4)], junhuaClickObjs[_0x17f7cd(0x537)](_0x2762ac));                                                                                                                                                                 });                                                                                                                                                                 continue;                                                                                                                                                             case '3':                                                                                                                                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x1a1)];                                                                                                                                                                 continue;                                                                                                                                                             case '4':                                                                                                                                                                 _0x36ac87[_0x872ecc(0x476)][_0x872ecc(0x472) + 'a'] = [                                                                                                                                                                     -(-0x3 * -0xccf + 0x34 * -0x89 + -0x15f + 0.017600000000129512),                                                                                                                                                                     0xc5a + -0x77 * 0x3c + -0x1 * -0xfb5 + 0.09029999999999916,                                                                                                                                                                     -(-0x1 * 0x716 + 0x7 * 0x364 + 0xa9 * -0x14 + 0.8259000000000469)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             }                                                                                                                                                             break;                                                                                                                                                         }                                                                                                                                                     }                                                                                                                                                 }                                                                                                                                             }                                                                                                                                         }                                                                                                                                     }                                                                                                                                 }                                                                                                                             }                                                                                                                         }                                                                                                                     }                                                                                                                 }                                                                                                             }                                                                                                         }                                                                                                     }                                                                                                 }                                                                                             }                                                                                         }                                                                                     }                                                                                 }                                                                             }                                                                         }                                                                     }                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 } else {                     if (_0xaa7790[_0x872ecc(0x218)](_0x36ac87[_0x872ecc(0x31e)], _0xaa7790[_0x872ecc(0x3ae)])) {                         if (_0xaa7790[_0x872ecc(0x36a)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2de)]))                             (_0xaa7790[_0x872ecc(0x306)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x2d8)]) || _0xaa7790[_0x872ecc(0x5e7)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1fd)])) && _0x36ac87[_0x872ecc(0x4aa)](_0x270d84 => {                                 const _0x11d92f = _0x872ecc;                                 if (_0x270d84[_0x11d92f(0x5c2)]) {                                     const _0x45b484 = _0x2ec442[_0x11d92f(0x53b)][_0x11d92f(0x1a5)]('|');                                     let _0x2bb3ba = 0x55b * 0x1 + -0x22c9 + 0x1d6e;                                     while (!![]) {                                         switch (_0x45b484[_0x2bb3ba++]) {                                         case '0':                                             _0x270d84[_0x11d92f(0x476)][_0x11d92f(0x5f3)] = _0x36ac87;                                             continue;                                         case '1':                                             (_0x2ec442[_0x11d92f(0x331)](_0x270d84[_0x11d92f(0x598)], _0x2ec442[_0x11d92f(0x5c0)]) || _0x2ec442[_0x11d92f(0x216)](_0x270d84[_0x11d92f(0x598)], _0x2ec442[_0x11d92f(0x5a7)])) && (_0x270d84[_0x11d92f(0x1f2)][_0x11d92f(0x5af)] = _0x270d84[_0x11d92f(0x1f2)][_0x11d92f(0x5af)][_0x11d92f(0x58e)](), _0x270d84[_0x11d92f(0x1f2)][_0x11d92f(0x5af)][_0x11d92f(0x425) + 'e'] = !![], limojiJiaodaiObjs[_0x11d92f(0x537)](_0x270d84));                                             continue;                                         case '2':                                             _0x2ec442[_0x11d92f(0x579)](_0x36ac87[_0x11d92f(0x598)], _0x2ec442[_0x11d92f(0x273)]) && (_0x270d84[_0x11d92f(0x598)] = _0x2ec442[_0x11d92f(0x2be)]);                                             continue;                                         case '3':                                             limoClickObjs[_0x11d92f(0x537)](_0x270d84);                                             continue;                                         case '4':                                             _0x2ec442[_0x11d92f(0x54f)](_0x36ac87[_0x11d92f(0x598)], _0x2ec442[_0x11d92f(0x3e7)]) && (_0x270d84[_0x11d92f(0x598)] = _0x2ec442[_0x11d92f(0x56f)]);                                             continue;                                         }                                         break;                                     }                                 }                             });                         else {                             if (_0xaa7790[_0x872ecc(0x355)](_0x3ce9c0[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x439)])) {                                 if (_0xaa7790[_0x872ecc(0x270)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x424)]) || _0xaa7790[_0x872ecc(0x25d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5e4)]) || _0xaa7790[_0x872ecc(0x34c)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3b0)]) || _0xaa7790[_0x872ecc(0x459)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3ee)]) || _0xaa7790[_0x872ecc(0x3e3)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x289)]) || _0xaa7790[_0x872ecc(0x19f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x347)]) || _0xaa7790[_0x872ecc(0x2b8)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x29b)]) || _0xaa7790[_0x872ecc(0x2a6)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x53f)]) || _0xaa7790[_0x872ecc(0x391)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5f7)]) || _0xaa7790[_0x872ecc(0x478)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1a8)]) || _0xaa7790[_0x872ecc(0x19a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3eb)]) || _0xaa7790[_0x872ecc(0x386)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4d7)]) || _0xaa7790[_0x872ecc(0x25a)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x301)]) || _0xaa7790[_0x872ecc(0x3ab)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x28a)]) || _0xaa7790[_0x872ecc(0x274)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x259)]) || _0xaa7790[_0x872ecc(0x2c9)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x551)]) || _0xaa7790[_0x872ecc(0x52f)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3e0)])) {                                     const _0x17179f = _0xaa7790[_0x872ecc(0x5be)][_0x872ecc(0x1a5)]('|');                                     let _0x2fea28 = 0x221e + 0x1 * -0x138e + 0x4 * -0x3a4;                                     while (!![]) {                                         switch (_0x17179f[_0x2fea28++]) {                                         case '0':                                             if (_0xaa7790[_0x872ecc(0x293)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x301)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x42d)];                                             continue;                                         case '1':                                             if (_0xaa7790[_0x872ecc(0x263)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5e4)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3cd)];                                             continue;                                         case '2':                                             if (_0xaa7790[_0x872ecc(0x54d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x347)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3a2)];                                             continue;                                         case '3':                                             if (_0xaa7790[_0x872ecc(0x3fb)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x4d7)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x2fc)];                                             continue;                                         case '4':                                             if (_0xaa7790[_0x872ecc(0x352)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x424)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x5dc)];                                             continue;                                         case '5':                                             duishishitouquantity[_0x872ecc(0x537)](_0x36ac87);                                             continue;                                         case '6':                                             if (_0xaa7790[_0x872ecc(0x3b5)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x1a8)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x48b)];                                             continue;                                         case '7':                                             if (_0xaa7790[_0x872ecc(0x36d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x53f)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x1de)];                                             continue;                                         case '8':                                             if (_0xaa7790[_0x872ecc(0x292)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x289)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x2c6)];                                             continue;                                         case '9':                                             if (_0xaa7790[_0x872ecc(0x5e8)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x5f7)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x4d0)];                                             continue;                                         case '10':                                             if (_0xaa7790[_0x872ecc(0x5bb)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x259)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x527)];                                             continue;                                         case '11':                                             if (_0xaa7790[_0x872ecc(0x578)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3ee)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x32c)];                                             continue;                                         case '12':                                             if (_0xaa7790[_0x872ecc(0x3a1)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3b0)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x3cb)];                                             continue;                                         case '13':                                             if (_0xaa7790[_0x872ecc(0x1cc)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x551)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x48a)];                                             continue;                                         case '14':                                             if (_0xaa7790[_0x872ecc(0x574)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x28a)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x535)];                                             continue;                                         case '15':                                             if (_0xaa7790[_0x872ecc(0x265)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3eb)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x28e)];                                             continue;                                         case '16':                                             if (_0xaa7790[_0x872ecc(0x48e)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x3e0)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x4b3)];                                             continue;                                         case '17':                                             if (_0xaa7790[_0x872ecc(0x37d)](_0x36ac87[_0x872ecc(0x598)], _0xaa7790[_0x872ecc(0x29b)]))                                                 _0x36ac87[_0x872ecc(0x476)]['id'] = _0xaa7790[_0x872ecc(0x421)];                                             continue;                                         }                                         break;                                     }                                 }                             }                         }                     }                 }             }         });     },     'onLoad': () => {         const _0x5d57d2 = _0x151cb8, _0x51cfb9 = {                 'nRmfu': function (_0x305f20) {                     return _0x305f20();                 },                 'eHwub': function (_0x168c27) {                     return _0x168c27();                 },                 'QlZYN': function (_0x553984) {                     return _0x553984();                 },                 'RXDvH': function (_0x4685a2, _0x21b5cd, _0x274072) {                     return _0x4685a2(_0x21b5cd, _0x274072);                 }             };         container[_0x5d57d2(0x2ae) + _0x5d57d2(0x2b5)](), defaultSky = container[_0x5d57d2(0x4e3)], _0x51cfb9[_0x5d57d2(0x340)](addOutRoadLEDPlane), _0x51cfb9[_0x5d57d2(0x294)](addRoomUpLedPlanePlane), _0x51cfb9[_0x5d57d2(0x294)](addLimoRoomMainMachineText), _0x51cfb9[_0x5d57d2(0x294)](addDevicePlane), _0x51cfb9[_0x5d57d2(0x294)](addCameraDevicePlane), _0x51cfb9[_0x5d57d2(0x294)](addDuichangLEDPlane), _0x51cfb9[_0x5d57d2(0x340)](render), _0x51cfb9[_0x5d57d2(0x278)](setTimeout, () => {             const _0x1b6c75 = _0x5d57d2;             callback && _0x51cfb9[_0x1b6c75(0x1db)](callback);         }, 0x94 * -0x14 + 0x951 + 0x1 * 0xa0f), container[_0x5d57d2(0x515) + 'ts'] = [defaultSky];         const _0x42aece = new THREE[(_0x5d57d2(0x2ff)) + 'y'](0x67a + -0x2239 * -0x1 + 0x1 * -0x28b2, -0x1 * -0x1c4b + 0x1f7 * -0x11 + 0x526, 0x26f4 + 0x223c * -0x1 + -0x47 * 0x11), _0x3d7488 = new THREE[(_0x5d57d2(0x4a2)) + (_0x5d57d2(0x462))]({ 'color': 0xff00 });         locationCube = new THREE[(_0x5d57d2(0x351))](_0x42aece, _0x3d7488), locationCube[_0x5d57d2(0x3a0)][_0x5d57d2(0x465)](0xc18 + -0xa9 * 0x11 + -0x1 * 0xdf, 0x124e + 0x1e3e + -0x308c, -0x1e13 + 0x4 * -0x704 + 0x3a23), locationCube[_0x5d57d2(0x2bc)] = ![], container[_0x5d57d2(0x4ad)](locationCube), container[_0x5d57d2(0x3f9) + 'ns'][_0x5d57d2(0x230)](_0x132380 => {             const _0x2b4d68 = _0x5d57d2;             _0x132380[_0x2b4d68(0x532)] = ![];         });     } })); function _0x36d6() {     const _0x41d1f8 = [         'cdSYA',         'UCNuC',         '粉尘浓度006',         '立磨发送罐2',         'wnaQe',         'OEAqk',         '11955EdQhyX',         'Txxtm',         '堆石厂',         'ZwZZx',         'fFdaV',         'ihKOA',         'JJjRI',         'tzdc-3-3',         'QxbwU',         'ONjJY',         'goHlQ',         '罗茨风机管道动画',         'UfXZV',         'e944e876fe',         '立磨发送罐8',         'Tjuxj',         '立磨发送罐3',         '给料皮带秤M07A',         '立磨前仓1',         'MBcSQ',         'tzdc-4-11',         'dJMyz',         'ibXtN',         '3d/models/',         'SbzEP',         'aioCO',         '2|1|3|0|4',         'yBcav',         'rXAut',         'ZGMYJ',         'vtLQW',         '立磨发送罐5',         '氧浓度008',         '4|1|12|11|',         '4|0|1|3|2',         '4|0|2|3|1',         '粉尘浓度点击事件',         '输送管道动画',         'TCIHT',         'MzSEb',         '粉尘浓度003',         'tzdc-4-17',         '立磨行车2_1',         '3c4737a392',         'NiBBH',         'FRwAB',         '立磨输送机4A',         'aterial',         'Kdkjp',         'fGseT',         'set',         'ccvXO',         '立磨输送机6B',         '堆石LED13石头',         'includes',         '粉尘浓度001',         'OeUHH',         'YAOUv',         '立磨电机1',         'wDapL',         '8|2|17|7|9',         'OErAa',         'USrvI',         'focusCamer',         'scale',         '000df6f2',         '给料皮带秤M02B',         'userData',         'DgzsZ',         'kjBeC',         '-117',         '堆石LED8石头',         'envMap',         'transparen',         '均化摄像头5',         '筛分间',         'Object3D',         'tzdc-3-8',         'IFgPt',         '1667871736',         '立磨收尘器8带透明通',         'gJmbd',         '地面.glb',         'QmiCm',         '|12|0|7|5|',         'BZolA',         'UFPKA',         'NXtdp',         'oNkNz',         'WVjIb',         'BpmCs',         'ujVpm',         'lQMgA',         'aKrde',         'UbEWq',         'PBEyU',         'oysxE',         'gYvuj',         '给料皮带秤M04B',         '1672044743',         'ibNeJ',         '立磨胶带机1带透明通',         '1|2|3|0|4',         'BBVId',         'qCwzm',         'kYzmx',         'MCDKA',         '立磨机主体8_1',         '粉尘浓度016',         '10|8|0|1|2',         '道_2',         'MeshBasicM',         '000f4cb7',         '堆石LED16石头',         'JH-SCG-',         'miRHr',         'hkZnO',         '4428876RsBqsm',         'hriRQ',         'traverse',         '立磨电机8',         '收尘器M0',         'attach',         '5|3',         'tzdc-4-12',         'ePriK',         'b0aa4c4cdb',         'NbRHd',         'ARsuj',         'UDefb',         'OgSmN',         '3d/7.hdr',         'Ddxbe',         '均化间重点区域摄像头',         'GEVqx',         'tzdc-3-7',         'baPYo',         'FjjRZ',         '立磨巡检机器人.gl',         'MXHBJ',         'Rgwlx',         'zOGPt',         'fLONV',         '给料汇总皮带M07',         'mBxcc',         'qFeWo',         'SNHJM',         'NOBoJ',         'itzip',         '1|2|3|4|0',         '透明通道',         '氧浓度009',         'aijYJ',         '#ffffff',         '3|4|1|2|0',         '氧浓度002',         'rVMPp',         'TDCvk',         'ttNPn',         'lCEfz',         '氧浓度006',         'xtgyY',         '氧浓度010',         'ols',         'QMLVG',         'dpFSK',         'qsHST',         'unyvW',         '立磨提升机2',         'zruva',         'qRjmO',         'IbKUn',         '0005c842',         'ebFRw',         'fFBOD',         '0002553e',         'sky',         '堆石场一外墙_1',         'fLqPB',         'CafNU',         '立磨前仓3',         'CJ-DSC-002',         'RnGrG',         'sQMzw',         'MviZH',         '立磨输送机5_2',         '立磨机',         'cSiMb',         'XTcOQ',         '压缩空气管道动画',         'fjKCM',         'LPIHa',         'BiBfO',         'cSBci',         '0b050538a3',         '立磨密封料仓1',         'MVhIy',         'etXwu',         '6|0|4|1|2|',         'vVSPK',         '1672044470',         'KIuyA',         'xDpIk',         '立磨输送机7_2',         '3b43c9abcb',         'tzdc-4-9',         'rifAf',         '氧浓度点击事件',         '517221zdPhsW',         '破碎皮带机2_2',         'MBcay',         '立磨输送机4B',         '堆石LED10石头',         '立磨电机3',         '密相泵M0',         '4e4e1482af',         'ApOuP',         'LxnCq',         '磨前仓M03',         '氧浓度015',         '堆石LED2石头',         'eYROB',         '立磨输送机7A',         '1|3|0|2|4',         '立磨发送罐7',         '立磨提升机1',         'clickObjec',         'jGyjG',         'oSvLS',         '立磨输送机5',         '3|2|1|4|0',         '1672044593',         '给料皮带秤M07B',         'KQmvU',         'YIDONG-002',         'gSyOB',         'yazgv',         'tcGvt',         'EhKqF',         '碎石楼上胶带机1带透',         '4|1|3|0|2',         'tzdc-3-5',         '000692b7',         '#FF7A5A',         'jXfGQ',         'ff4f97b09a',         'MJaUJ',         '粉尘浓度004',         'dXQuQ',         'fcaac0a52d',         'KKmsn',         '立磨提升机M0',         'zaEud',         '立磨收尘器5带透明通',         '立磨收尘管道',         'paused',         'a80b73009a',         'mZFal',         'EdREB',         '立磨收尘器3带透明通',         'push',         '磨前仓M02B',         'FQlhA',         'ipHDT',         'OqyXg',         'bwaaw',         'XDWVz',         'aahML',         'WAmAp',         'rzuxd',         '000c51b7',         'PLkdR',         '立磨行车1_1',         'NRbef',         'dIwgQ',         '6|0|4',         '立磨密封料仓4',         'fqfNa',         'Vector2',         'xwirM',         '给料汇总皮带M05',         '立磨输送机6_2',         'GhMIv',         '磨前仓M04B',         'EfHnw',         '氧浓度004',         'hhmwk',         '00039a6f',         'ibAmb',         'SBGeT',         'RJkyv',         'bqjfX',         '给料皮带秤M04A',         '立磨机主体3_1',         '2|0|4|1|3',         'hxsZT',         '粉尘浓度010',         '000cf96b',         'pQVjH',         '均化间',         '00043b38',         'tGoLH',         '堆石LED12石头',         'DcFjS',         'vTaWL',         '氧浓度003',         'aYXBN',         '#00ff18',         '立磨前仓6A',         'PPzPd',         '破碎楼上皮带机2_2',         '000b80b8',         '1667871699',         'dAmlj',         '筛分间.glb',         'b7c4a56d1f',         'uNUXd',         'mNgYR',         '2|3|4|1|0',         '地面分层',         'CaWLj',         'wwuik',         'BeYsr',         'Nucuu',         '3|4|0|2|1',         'HPHwX',         'GzdXW',         '堆石LED14石头',         'FIUcp',         'JKZrD',         'pKKcU',         'renderOrde',         'orbit',         '000ecb01',         'Gbcwa',         'SzXmy',         'YipIh',         'LPEzW',         '000f0cac',         'YEYFd',         '404CwMBFL',         '立磨提升机6',         '立磨机主体4_1',         '73549ad78f',         'tzdc-4-10',         '立磨间',         'BEdHW',         'clone',         'mQImo',         'quXiJ',         '移动卸料小车胶带机P',         'gwACG',         '立磨密封料仓2',         'guyKy',         'dow',         'wpgMi',         'nyGgj',         'name',         '立磨输送机2B',         'QQQxh',         'qVeYO',         'f543a8a7c7',         'VzvsG',         '4|3|1|0|2',         '立磨间巡检机器人点击',         '破碎皮带机1_2',         'dydvd',         '网格017_1',         'tzdc-4-16',         '给料皮带秤M06A',         'DOixs',         'uKlpn',         'aKdZE',         'aa73ef5794',         'TnmCC',         'xcgiO',         'transType',         'LyOiI',         '0|3|4|2|1',         '堆石LED17石头',         'map',         'vqkOd',         'oHdqx',         'YOszl',         '3d/8.jpg',         '2|0|3|4|1',         'SpjRB',         '立磨输送机4',         'Xsxeb',         'oweug',         '3|4|1|0|2',         'uMtls',         'KsaLL',         'tNYRk',         '立磨前仓7B',         'AglNq',         'tzdc-4-15',         'usgcm',         'qYuaN',         'isMesh',         'sMTil',         'aFADH',         'NdLTp',         '5098530JvGTgD',         'CKpXt',         'irbNz',         '破碎间',         'WHYln',         'aneText',         'RgDeQ',         'aInjU',         'EKfji',         '立磨前仓4A',         '3|0|1|2|4',         '立磨前仓2A',         '1668403550',         'SzXRz',         'tzdc-3-4',         'IvnUY',         'UTRNV',         '立磨电机4',         '破碎胶带机2带透明通',         '给料汇总皮带M02',         '128qniqvx',         '立磨输送机5B',         'cfrGI',         '立磨收尘器1带透明通',         '碎石配料间.glb',         'QRMLw',         '给料皮带秤M01',         '立磨输送机2_2',         'YxpRv',         '30157897oLByuN',         'XlJCS',         '3|0|4|1|2',         '0007e409',         'oFykD',         'CxyFL',         '1672044706',         'XQDWm',         'eHpoy',         'vOFye',         'bjnee',         'CRArW',         'XUxje',         '报警.glb',         'rFHAI',         'DoubleSide',         'parent',         'KlcCn',         'AHSCm',         '氧浓度007',         'HWfwA',         'sQtyW',         'QQPYa',         '2|0|1|4|3',         'PWilB',         '14|10|13|1',         'LtqgQ',         'ZLbYc',         '氧浓度001',         'eYSmQ',         'bDSQH',         'WCTou',         'qBUUZ',         'xYgya',         'lehYd',         'klGTy',         '均化摄像头2',         'JuSIe',         'split',         '000090d6',         'BWGQV',         'sdYrF',         '00032fd6',         'YAtLS',         '粉尘浓度011',         'tzdc-3-2',         'wvLvc',         'FBnLv',         'rrTdL',         '筛分皮带机1_2',         'SbeKi',         'cwORD',         'CuEZU',         'tzdc-4-13',         'WQUJo',         '立磨小车体2_2',         'INWaG',         'CJ-FZ-002',         'SpsFz',         '给料皮带秤M02A',         'SwRwu',         'ovtst',         'GgzfL',         'IufMa',         'JRGAC',         'WCQbS',         '2|1|5|3|0|',         '1|0|3|4|2',         '立磨收尘器7带透明通',         'YiUVQ',         'rvAij',         'ebqTB',         'ukQnQ',         'HNdMv',         '274194a9c6',         'PjCAM',         '碎石楼上胶带机2带透',         'geCNo',         'qSZSk',         'nkKaY',         'sfBjh',         '6|5',         '堆石LED9石头',         '碎石到筛分胶带机2带',         'hIhIy',         '碎石到筛分胶带机1带',         'YrvtY',         'CboDH',         'mHmCl',         '氧浓度014',         'xsMLV',         '立磨密封料仓8',         'nRmfu',         '明通道_2',         'wLugu',         'VBIsP',         '000ad947',         'PvGQj',         'DyiQk',         'depthTest',         '00039ffd',         'gOrRI',         '立磨风机管道',         'qTzny',         'Tijcy',         'skCCE',         'DFMCj',         'fNoev',         'BsKTV',         'tTwlp',         '立磨胶带机2带透明通',         'Rhxqn',         '粉尘浓度002',         '立磨前仓5B',         '0|4|1|3|2',         'material',         '立磨移动小车2',         '粉尘浓度005',         '安全疏散.glb',         '000c039d',         'tyCCg',         'hnkrf',         'jUvHs',         'vBQyA',         '压缩空气管道',         'ToxEz',         'SMsMn',         'OcccI',         'rfYnr',         'addBloom',         '0|4|1|2|3',         'TIFVu',         '1|2|4|0|3',         'djzEh',         'aAqZl',         '水管动画',         'eXFvW',         'GPckK',         '1|4|0|3|2',         '立磨输送机4_2',         '立磨输送机6A',         'oeSJR',         '立磨电机5',         '9|11|2|8|1',         'RacSE',         '产线外房间.glb',         'TxFhq',         'uopOC',         'LfBLq',         'BJgnX',         'oYQFe',         'gtvHP',         '立磨前仓4B',         'NfwIQ',         '磨前仓M05A',         'WtiNG',         '碎石输送机_4',         'vWAHv',         'cxjiQ',         'rotation',         '1672889351',         'jEqvx',         'qbSiX',         'eCEje',         'ronkk',         'tzdc-4-14',         '2|3|1|4|0',         '车/车.gltf',         '立磨收尘器6带透明通',         'mdbhZ',         '2|4|0|3|1',         'axqrX',         '堆石LED3石头',         'MEYgg',         'gEiRV',         'JYCjg',         'YjCsw',         'forEach',         'tzdc-3-6',         'LAXPo',         'gmaUF',         'kEqzf',         'DklSg',         '均化摄像头1',         'ktefn',         'cugjj',         'lxjwg',         '000906c1',         'roughness',         'ezqwn',         'TWlpu',         'wGlqc',         'rfNxd',         'lzOqK',         'hFvsf',         'reSBD',         '立磨输送机2',         'ljSIh',         'LyvlU',         'hSJly',         '破碎间外墙带透明通道',         '碎石小车体1_2',         'srLRN',         'EbhzF',         'diCXA',         '立磨电机7',         'mQkfW',         'WHmuq',         '000efd5c',         '氮气管道',         'LnIak',         '均化间外墙_2',         '立磨机主体5_1',         'RvHjm',         'FLjje',         'cyjKX',         '0006b413',         '立磨密封料仓7',         'NavBg',         'TjBUJ',         '堆石LED6石头',         'LbrtY',         'soXme',         '立磨小车体1_2',         '堆石厂.glb',         '四色图',         '1672825159',         '排气管道',         'IfKbl',         '四色图.glb',         'TcBZH',         '立磨电机6',         'vuduN',         'bXJjC',         '3|0|2|1|4',         'PPgLF',         'DuYqu',         '0004a1cb',         'tkUZt',         '立磨前仓5A',         'hBaxv',         'VhbiB',         '00077ff6',         'pADNo',         'HbOEL',         'cQzbt',         '1668403339',         'FDDzJ',         '立磨巡检机器人',         'RXDvH',         'SniHN',         '均化间外墙_1',         '2|3|1|0|5|',         '树.glb',         'kwwlj',         '给料皮带秤M06B',         '立磨密封料仓5',         '立磨输送机3_2',         '磨前仓M06B',         '立磨胶带机4带透明通',         'Jkphs',         'JIZcI',         '氧浓度011',         '1672044802',         'XruMA',         'animation',         'qpyAD',         'xaaJW',         'iDpyP',         '00076e48',         'EgmJF',         'mWNbn',         'MELmb',         'SHoRz',         '立磨输送机8',         'glgbS',         'IEmYa',         'QlZYN',         '粉尘浓度008',         '堆石LED5石头',         'cnPLi',         '立磨发送罐1',         'jhQeD',         '|9|6|4|7|5',         'frnaD',         '产线外房间',         '立磨提升机8',         '000648b1',         '立磨机主体6_1',         'ZditU',         'Wwcik',         '立磨发送罐6',         'oxRVw',         '均化摄像头6',         'BevVz',         'vQzYR',         '1672044906',         'pwSoM',         'xldzG',         'FzVqk',         '输送管道',         '1|0|3|2|4',         'rFTTo',         'windowResi',         '堆石LED15石头',         '1672825567',         '立磨前仓6B',         'neRobotLim',         'Sbhoy',         '磨前仓M05B',         'zeFun',         'yORdr',         '立磨行车',         'ZVSnY',         '筛分胶带机1带透明通',         'qeexp',         'nQJCQ',         'visible',         '000c9946',         'lcQLz',         'QXUnT',         '给料皮带秤M05B',         '立磨输送机8_2',         '立磨移动小车1',         '粉尘浓度007',         'zkALC',         '立磨提升机4',         'EyvEP',         '立磨机主体1_1',         '碎石配料间',         'RYAeN',         'NOTqy',         'vzwpD',         '给料皮带秤M08',         '通道_2',         '33e22d6c78',         'LLYxF',         '碎石配料间外墙带透明',         '碎石楼下胶带机2带透',         '磁悬浮风机管道动画',         'Htiyo',         'kavpz',         'Javbn',         '00069b09',         '给料皮带秤M05A',         'OCwyA',         'qGwuT',         '均化间.glb',         'NfiKr',         'xIkqJ',         'XaYQP',         'FVKTN',         '草坪.glb',         'PneSA',         'ESDSV',         'ExIvG',         'LLstx',         '000425f8',         '立磨机本体M0',         'lHgFK',         'OOVnf',         '粉尘浓度009',         'CJ-BJJ_2',         'Kojzb',         'atfZt',         'CJ-JZTLJ_2',         'somVR',         'vNGEG',         '粉尘浓度015',         '立磨机主体2_1',         'ZLbsJ',         'KRXmz',         'tqSel',         'JqqDR',         'vbWWz',         'PlaneGeome',         '0007f861',         'dHVbK',         'RIRfe',         '道_1',         '磨前仓M08',         'Rbpee',         '3|1|4|0|2',         'sFThu',         'BoxGeometr',         'ccOyc',         'ebIWg',         'yXlLG',         '立磨前仓2B',         'KOQdI',         '均化摄像头3',         'ojNIt',         'kvRnM',         '磨前仓M07B',         '立磨输送机5A',         '氧浓度012',         'add',         '立磨收尘器4带透明通',         '碎石移小车体2_2',         'cQsEU',         '立磨提升机5',         'xkOsP',         '立磨提升机3',         'robotTopPl',         'mpHVu',         'castShadow',         'XbQyw',         'wVWxY',         'lookAt',         '立磨提升机7',         '1668403549',         'YIDONG-001',         'lQcIc',         'NJHZc',         'Buegs',         'type',         'FLEaA',         'QrbXr',         '均化摄像头4',         '1672825662',         'MToue',         'sbWyJ',         'nZGoj',         'focusContr',         'qthtQ',         'slice',         'GRCgp',         'aTtGF',         'PrJxq',         'Zkdoe',         '000f8fb4',         '安全疏散',         'center',         'KkARW',         'wZdRr',         'gvpnq',         'WnnDV',         '3|4|10|6|3',         'IOkTE',         'TVObp',         '立磨间.glb',         'TigLk',         'wYqhq',         'fdmUE',         '立磨输送机1_2',         '立磨摄像头',         'a12773b41a',         'SSfKJ',         'CfYpH',         'eHwub',         '|6|15|3|0|',         'SJXIH',         '破碎楼上皮带机1_2',         '破碎间.glb',         '立磨密封料仓3',         '碎石楼下胶带机1带透',         'eKgUO',         '9395827UaZyHP',         'gxTdk',         'zgYji',         'uWADt',         'PZitg',         '磨前仓M07A',         'KEUqa',         'VqxLH',         'GukOi',         'Mesh',         'DIlyA',         '给料汇总皮带M04',         '风机M0',         'nKURj',         '5|3|2|1|7|',         '立磨输送机1',         '堆石LED1石头',         'HFGtF',         'freLm',         'HXlyb',         'hiOlx',         'ZNmeU',         'qckbw',         '1313992NtQRGU',         'CMCpd',         'qjQFp',         'MMivC',         '1672044874',         '粉尘浓度013',         '立磨输送机7',         '立磨胶带机3带透明通',         'QaLDi',         'pmVxK',         'receiveSha',         'iawAV',         'BzQMW',         'oEucz',         'WvIzp',         '00026a96',         'LOsbk',         '000fb72f',         '立磨电机2',         'EApnm',         '3|2|0|4|1',         '氧浓度005',         '立磨输送机2A',         'RnFxu',         '1672825616',         'xkKMW',         'cHqed',         '一般风险区域',         '地面分层.gltf',         '巡检机器人',         'LsPUm',         '立磨输送机7B',         '0002d46d',         '1672044939',         'ZgtfV',         'YoaZO',         '立磨输送机3',         'hwtdu',         'DuIGr',         'fjWuE',         'bee194c934',         '管道桥',         'Ibqvj',         '立磨密封料仓6',         'KKpdj',         'Sbjiz',         'xXYiL',         'uuOeN',         '1672044671',         '均化摄像头',         'MfOkv',         'ESnlC',         'tpOzo',         'UWVTO',         '筛分胶带机2带透明通',         'RyORy',         '1672044840',         'qavfY',         'ae5ad0d60f',         '透明通道_2',         'Group',         'FLEaT',         'peqHB',         'Jwbok',         'EOcVk',         'position',         'ZRLeC',         'krvxL',         'MbJPP',         'fTDYX',         'CJ-FZ-001',         'iEzus',         'lahpl',         'Container',         '氮气管道动画',         '管道动画',         'ZDMqd',         '4693ca0743',         'vnJFp',         'mWBTt',         'uaZbj',         'ilddj',         'rYuRq',         'brAlK',         '破碎胶带机1带透明通',         'ViPNn',         'sUYKv',         '1672825280',         'opacity',         'dMZeZ',         'uJnPC',         '1668402506',         '管道.glb',         'XcuOb',         '密封料仓M0',         'lockID',         '2|4|1|3|0',         'LOcSD',         'uNfyP',         '筛分皮带机2_2',         'RbIro',         '36fd26f851',         '9b4e69a6ee',         'EQtXT',         'RHBSg',         'UauJj',         'QKxWQ',         'metalness',         'Vyiwx',         'NYQQo',         'zyirY',         'mhrMy',         '给料汇总皮带M06',         'zkrnG',         '粉尘浓度012',         '立磨机主体7_1',         'cOJPs',         'SkkdS',         'YqmvN',         '10CofOll',         'pvIvi',         'olFNS',         '堆石LED11石头',         '1|4|2|0|3',         '磁悬浮风机管道',         'DMvLN',         'mTXyo',         'cIPdK',         '1672825770',         'fLMFq',         'indexOpaci',         'awVFN',         'EFohP',         'XlJuS',         'wpfLE',         'rojth',         'duKve',         'RVIPc',         'laFTT',         'RcCsc',         'nRskf',         'OUdcR',         'MTdZg',         'PsPKi',         '给料皮带秤M03',         '氧浓度013',         '罗茨风机管道',         'nmpps',         '1672044628',         'FpPHW',         '000cf4c6',         '00044875',         'cEVcr',         '磨前仓M04A',         'mixerActio',         'ZYQmG',         'edniW',         'XXAve',         '粉尘浓度014',         'SUgsB',         '立磨前仓7A',         'try',         'GKpej',         '堆石LED4石头',         'GfTsH',         'bvLYI',         '立磨前仓8',         '明通道_4',         'fReom',         'GSlSB',         '磨前仓M02A',         'jAVqH',         '立磨收尘器2带透明通',         'tzdc-3-1',         'RLQIl',         'aeNTR',         'xunjianPla',         'TYwOy',         'BYCHW',         '立磨间外墙带透明通道',         '堆石LED7石头',         'sXXMv',         'FihVD',         'cVbCu',         '磨前仓M01',         '立磨间重点区域摄像头',         'PeOWI',         'nAKNe',         '000eef89',         '立磨发送罐4',         '000ed044',         '5Aujqua',         'lzXYl',         'FsReD',         'ZKyJF',         '磨前仓M06A',         'jpMbg',         'sKbhB',         'needsUpdat',         '000a56b4',         'qMsMs',         'uNMgJ',         'KlkRM',         'aBLRN',         '-116',         '立磨输送机6'     ];     _0x36d6 = function () {         return _0x41d1f8;     };     return _0x36d6(); }
    container.windowResizeFun();

    const events = new THREE.Events(container);
    events.onhover = (e) => {
        mianRoundingIndex = 1;
        container.orbitControls.autoRotate = false;
        let name = e.objects[0].object.name;
    };

    events.onclick = (e) => {
        deviceModelPlane.visible = false;
        cameraModelPlane.visible = false;

        mianRoundingIndex = 1;
        container.orbitControls.autoRotate = false;
        console.log(
            "中心点： " +
                e.objects[0].point.x.toFixed(2) +
                "," +
                e.objects[0].point.y.toFixed(2) +
                "," +
                e.objects[0].point.z.toFixed(2)
        );
        console.log(e.objects[0].object);

        let name = e.objects[0].object.name;
        let position = [
            e.objects[0].point.x,
            e.objects[0].point.y,
            e.objects[0].point.z,
        ];

        if (name.includes("立磨机本体")) {
            if (name == "立磨机本体M01") {
                deviceModelPlane.position.set(...position);
                deviceModelPlane.visible = true;
                document.querySelector(
                    ".deviceModelBox"
                ).innerHTML = `<div class='limojiBG'>
                    <div class='limoTitle'>${name}</div>
                    <div class='limoTap'>
                        <div class='leftTap limoHightLight'>设备参数</div>
                        <div class='rightTap'>维保/库存</div>
                    </div>
                    <div class='limoDeviceOpaction'>
                        <div class='limoContainer'><div class='limoKey1'>振幅 :</div><div class='limoValue1'>162</div></div>
                        <div class='limoContainer'><div class='limoKey1'>压力 :</div><div class='limoValue1'>0.4MPa</div></div>
                        <div class='limoContainer'><div class='limoKey1'>挡料环高度 :</div><div class='limoValue1'>123cm</div></div>
                        <div class='limoContainer'><div class='limoKey1'>转子密封更换倒计时时间 :</div><div class='limoValue1'>2022-10-18 13:15</div></div>
                        <div class='limoContainer'><div class='limoKey1'>台时 :</div><div class='limoValue1'>15.04</div></div>
                        <div class='limoContainer'><div class='limoKey1'>吨耗 :</div><div class='limoValue1'>3.08</div></div>
                        <div class='limoContainer'><div class='limoKey1'>总能耗 :</div><div class='limoValue1'>1.25</div></div>
                        <div class='limoContainer'><div class='limoKey1'>总产量 :</div><div class='limoValue1'>365422</div></div>
                        <div class='limoContainer'><div class='limoKey1'>运转率 :</div><div class='limoValue1'>55%</div></div>
                        <div class='limoContainer'><div class='limoKey1'>辊套翻面倒计时 :</div><div class='limoValue1'>12:02:35</div></div>
                        <div class='limoContainer'><div class='limoKey1'>辊套更换倒计时 :</div><div class='limoValue1'>152:06:19</div></div>
                        <div class='limoContainer'><div class='limoKey1'>单套辊套总产量 :</div><div class='limoValue1'>9584</div></div>
                        <div class='limoContainer'><div class='limoKey1'>产品合格率 :</div><div class='limoValue1'>92.99%</div></div>
                        <div class='limoContainer'><div class='limoKey1'>回头率 :</div><div class='limoValue1'>55.6%</div></div>
                        <div class='limoContainer'><div class='limoKey1'>主电机电流 :</div><div class='limoValue1'>维修</div></div>
                        <div class='limoContainer'><div class='limoKey1'>主电机频率 :</div><div class='limoValue1'>维修</div></div>
                        <div class='limoContainer'><div class='limoKey1'>主电机前后轴瓦温度 :</div><div class='limoValue1'>维修</div></div>
                        <div class='clear'></div>
                    </div>
                    <div class='limoDeviceWeibao'>
                        <div class='limoContainer'><div class='limoKey1'>上次维护时间 :</div><div class='limoValue1'>2022-11-22</div></div>
                        <div class='limoContainer'><div class='limoKey1'>下次维护时间 :</div><div class='limoValue1'>2022-12-21</div></div>
                        <div class='limoContainer'><div class='limoKey1'>库存量 :</div><div class='limoValue1'>20</div></div>
                        <div class='clear'></div>
                    </div>
                    <div class='fillBox'></div>
                <div>`;
                container.outlineObjects = [e.objects[0].object];
                limoTapChange();
                deviceClickEvent();
            } else {
                limoIdData.forEach((item) => {
                    if (item.deviceName == name) {
                        deviceShadow(item.deviceKey, item.projectId, (res) => {
                            deviceModelPlane.position.set(...position);
                            deviceModelPlane.visible = true;
                            document.querySelector(
                                ".deviceModelBox"
                            ).innerHTML = `<div class='limojiBG'>
                                    <div class='limoTitle'>${name}</div>
                                    <div class='limoTap'>
                                        <div class='leftTap limoHightLight'>设备参数</div>
                                        <div class='rightTap'>维保/库存</div>
                                    </div>
                                    <div class='limoDeviceOpaction'>
                                        <div class='limoContainer'><div class='limoKey1'>1#加压值 :</div><div class='limoValue1'>${
                                            res["1#JYZH"]
                                                ? res["1#JYZH"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>1#卸压值 :</div><div class='limoValue1'>${
                                            res["1#XYZH"]
                                                ? res["1#XYZH"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>2#加压值 :</div><div class='limoValue1'>${
                                            res["2#JYZH"]
                                                ? res["2#JYZH"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>2#卸压值 :</div><div class='limoValue1'>${
                                            res["2#XYZH"]
                                                ? res["2#XYZH"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机电流 :</div><div class='limoValue1'>${
                                            res["MJDJ-DL"]
                                                ? res["MJDJ-DL"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机后轴温度 :</div><div class='limoValue1'>${
                                            res["MJDJ-HZT"]
                                                ? res["MJDJ-HZT"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机前轴温度 :</div><div class='limoValue1'>${
                                            res["MJDJ-QZT"]
                                                ? res["MJDJ-QZT"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机绕组温度1 :</div><div class='limoValue1'>${
                                            res["MJDJ-RZT1"]
                                                ? res["MJDJ-RZT1"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机绕组温度2 :</div><div class='limoValue1'>${
                                            res["MJDJ-RZT2"]
                                                ? res["MJDJ-RZT2"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机绕组温度3 :</div><div class='limoValue1'>${
                                            res["MJDJ-RZT3"]
                                                ? res["MJDJ-RZT3"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机绕组温度4 :</div><div class='limoValue1'>${
                                            res["MJDJ-RZT4"]
                                                ? res["MJDJ-RZT4"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机绕组温度5 :</div><div class='limoValue1'>${
                                            res["MJDJ-RZT5"]
                                                ? res["MJDJ-RZT5"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机绕组温度6 :</div><div class='limoValue1'>${
                                            res["MJDJ-RZT6"]
                                                ? res["MJDJ-RZT6"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>磨机电机转速 :</div><div class='limoValue1'>${
                                            res["MJDJ-ZS"]
                                                ? res["MJDJ-ZS"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>att_01 :</div><div class='limoValue1'>${
                                            res["att_01"]
                                                ? res["att_01"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>sa_serialNo :</div><div class='limoValue1'>${
                                            res["sa_serialNo"]
                                                ? res["sa_serialNo"]
                                                : "维修"
                                        }</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>sa_switchState :</div><div class='limoValue1'>${
                                            res["sa_switchState"]
                                                ? res["sa_switchState"]
                                                : "维修"
                                        }</div></div>
                                        <div class='clear'></div>
                                    </div>
                                    <div class='limoDeviceWeibao'>
                                        <div class='limoContainer'><div class='limoKey1'>上次维护时间 :</div><div class='limoValue1'>2022-11-22</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>下次维护时间 :</div><div class='limoValue1'>2022-12-21</div></div>
                                        <div class='limoContainer'><div class='limoKey1'>库存量 :</div><div class='limoValue1'>20</div></div>
                                        <div class='clear'></div>
                                    </div>
                                    <div class='fillBox'></div>
                                <div>`;
                            container.outlineObjects = [e.objects[0].object];
                            limoTapChange();
                            deviceClickEvent();
                        });
                    }
                });
            }
        } else if (name.includes("密封料仓")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='limoContainer'><div class='limoKey'>运行状态 :</div><div class='limoValue'>正常运行</div></div>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='limoContainer'><div class='limoKey'>上次维护时间 :</div><div class='limoValue'>2022-11-22</div></div>
                    <div class='limoContainer'><div class='limoKey'>下次维护时间 :</div><div class='limoValue'>2022-12-21</div></div>
                    <div class='limoContainer'><div class='limoKey'>库存量 :</div><div class='limoValue'>20</div></div>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            container.outlineObjects = [e.objects[0].object];
            limoTapChange();
        } else if (name.includes("立磨提升机")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='limoContainer'><div class='limoKey'>电机温度 :</div><div class='limoValue'>61℃</div></div>
                    <div class='limoContainer'><div class='limoKey'>电流 :</div><div class='limoValue'>23A</div></div>
                    <div class='limoContainer'><div class='limoKey'>频率 :</div><div class='limoValue'>100</div></div>
                    <div class='limoContainer'><div class='limoKey'>轴承温度 :</div><div class='limoValue'>23℃</div></div>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
            limoTapChange();
        } else if (
            name.includes("给料皮带秤") ||
            name.includes("给料汇总皮带")
        ) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='limoContainer'><div class='limoKey'>电机温度 :</div><div class='limoValue'>61℃</div></div>
                    <div class='limoContainer'><div class='limoKey'>电流 :</div><div class='limoValue'>23A</div></div>
                    <div class='limoContainer'><div class='limoKey'>频率 :</div><div class='limoValue'>100</div></div>
                    <div class='limoContainer'><div class='limoKey'>轴承温度 :</div><div class='limoValue'>23℃</div></div>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            if (
                name.includes("给料汇总皮带") ||
                (name.includes("给料皮带秤") && name.length == 8)
            ) {
                let parent = e.objects[0].object.parent;
                let outArr = [];
                parent.traverse((s) => {
                    if (s.isMesh) {
                        outArr.push(s);
                    }
                });
                container.outlineObjects = outArr;
            } else {
                container.outlineObjects = [e.objects[0].object];
            }

            limoTapChange();
        } else if (name.includes("磨前仓")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='limoContainer'><div class='limoKey'>矿石种类名称 :</div><div class='limoValue'>铁矿石</div></div>
                    <div class='limoContainer'><div class='limoKey'>料位 :</div><div class='limoValue'>1000</div></div>
                    <div class='limoContainer'><div class='limoKey'>重量 :</div><div class='limoValue'>20T</div></div>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            container.outlineObjects = [e.objects[0].object];
            limoTapChange();
        } else if (name.includes("收尘器")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='limoContainer'><div class='limoKey'>收尘差压 :</div><div class='limoValue'>20</div></div>
                    <div class='limoContainer'><div class='limoKey'>气源压力 :</div><div class='limoValue'>300</div></div>
                    <div class='limoContainer'><div class='limoKey'>脉冲时间间隔 :</div><div class='limoValue'>20S</div></div>
                    <div class='limoContainer'><div class='limoKey'>能耗占比 :</div><div class='limoValue'>50%</div></div>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            container.outlineObjects = [e.objects[0].object];
            limoTapChange();
        } else if (name.includes("风机M0")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='limoContainer'><div class='limoKey'>备妥 :</div><div class='limoValue'>10</div></div>
                    <div class='limoContainer'><div class='limoKey'>电机频率 :</div><div class='limoValue'>30</div></div>
                    <div class='limoContainer'><div class='limoKey'>电机温度 :</div><div class='limoValue'>40℃</div></div>
                    <div class='limoContainer'><div class='limoKey'>电机电流 :</div><div class='limoValue'>260A</div></div>
                    <div class='limoContainer'><div class='limoKey'>轴承温度 :</div><div class='limoValue'>40℃</div></div>
                    <div class='limoContainer'><div class='limoKey'>能耗占比 :</div><div class='limoValue'>50%</div></div>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            container.outlineObjects = [e.objects[0].object];
            limoTapChange();
        } else if (name.includes("密相泵")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='limoContainer'><div class='limoKey'>气源压力 :</div><div class='limoValue'>5</div></div>
                    <div class='limoContainer'><div class='limoKey'>输送压力 :</div><div class='limoValue'>40</div></div>
                    <div class='limoContainer'><div class='limoKey'>送料次数 :</div><div class='limoValue'>2</div></div>
                    <div class='limoContainer'><div class='limoKey'>单批输送重量 :</div><div class='limoValue'>20T</div></div>
                    <div class='limoContainer'><div class='limoKey'>输送总重量 :</div><div class='limoValue'>300T</div></div>
                    <div class='limoContainer'><div class='limoKey'>总用气量 :</div><div class='limoValue'>100</div></div>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
            limoTapChange();
        } else if (name.includes("移动卸料小车胶带机")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            let parent = e.objects[0].object.userData.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
            limoTapChange();
        } else if (name.includes("立磨行车")) {
            deviceModelPlane.position.set(...position);
            deviceModelPlane.visible = true;
            document.querySelector(
                ".deviceModelBox"
            ).innerHTML = `<div class='limojiBG'>
                <div class='limoTitle'>${name}</div>
                <div class='limoTap'>
                    <div class='leftTap limoHightLight'>设备参数</div>
                    <div class='rightTap'>维保/库存</div>
                </div>
                <div class='limoDeviceOpaction'>
                    <div class='clear'></div>
                </div>
                <div class='limoDeviceWeibao'>
                    <div class='clear'></div>
                </div>
                <div class='fillBox'></div>
            <div>`;
            container.outlineObjects = [e.objects[0].object];
            limoTapChange();
        } else if (name.includes("立磨间巡检机器人点击事件")) {
            limoRobotClickFun();
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes("重点区域摄像头")) {
            // cameraModelPlane.position.set(...position);
            // cameraModelPlane.visible = true;
            focusCameraDeviceBackId(e.objects[0].object.userData.id);
            container.outlineObjects = [e.objects[0].object];
        } else if (name.includes("粉尘浓度点击事件")) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            focusFenCenDeviceBackId(
                e.objects[0].object.parent.userData.id,
                "粉尘浓度"
            );
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes("氧浓度点击事件")) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            focusFenCenDeviceBackId(
                e.objects[0].object.parent.userData.id,
                "氧浓度"
            );
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else {
            container.outlineObjects = [];
        }
    };

    events.ondbclick = (e) => {
        mianRoundingIndex = 1;
        container.orbitControls.autoRotate = false;
    };
};

const clock = new THREE.Clock();
const render = () => {
    requestAnimationFrame(render);

    if (roadPlane.length > 0) {
        roadPlane.forEach((item) => {
            if (item.name == "安全疏散带透明通道_2") {
                item.material.map.offset.y += roadSpeed;
                if (item.userData.indexOpacity) {
                    item.material.opacity -= 0.05;
                    if (item.material.opacity < 0.3) {
                        item.userData.indexOpacity = false;
                    }
                } else {
                    item.material.opacity += 0.05;
                    if (item.material.opacity > 1) {
                        item.userData.indexOpacity = true;
                    }
                }
            }
        });
    }

    fourColorPic &&
        fourColorPic.traverse((child) => {
            if (child.isMesh) {
                child.material.map.offset.y += fourColorSpeed;
            }
        });

    if (limojiJiaodaiType) {
        limojiJiaodaiObjs.length > 0 &&
            limojiJiaodaiObjs.forEach((item) => {
                if (
                    item.name == "立磨胶带机3带透明通道_2" ||
                    item.name == "立磨胶带机4带透明通道_2"
                ) {
                    item.material.map.offset.x += limojiJiaodaoSpeed;
                } else {
                    item.material.map.offset.x -= limojiJiaodaoSpeed;
                }
            });
    }

    if (posuijianJiaodaiType) {
        posuijianJiaodaiObjs.length > 0 &&
            posuijianJiaodaiObjs.forEach((item) => {
                if (
                    item.name == "破碎皮带机1_2" ||
                    item.name == "破碎皮带机2_2" ||
                    item.name == "破碎楼上皮带机2_2" ||
                    item.name == "破碎楼上皮带机1_2"
                ) {
                    item.material.map.offset.x += posuijianJiaodaiSpeed;
                } else {
                    item.material.map.offset.x -= posuijianJiaodaiSpeed;
                }
            });
    }

    if (saifenjianJiaodaiType) {
        saifenjianJiaodaiObjs.length > 0 &&
            saifenjianJiaodaiObjs.forEach((item) => {
                if (
                    item.name == "筛分皮带机2_2" ||
                    item.name == "筛分皮带机1_2"
                ) {
                    item.material.map.offset.x += saifenjianJiaodaiSpeed;
                } else {
                    item.material.map.offset.x -= saifenjianJiaodaiSpeed;
                }
            });
    }

    if (suishijianJiaodaiType) {
        suishijianJiaodaiObjs.length > 0 &&
            suishijianJiaodaiObjs.forEach((item) => {
                if (
                    item.name == "碎石小车体1_2" ||
                    item.name == "碎石移小车体2_2"
                ) {
                    item.material.map.offset.x -= suishijianJiaodaiSpeed;
                } else {
                    item.material.map.offset.x += suishijianJiaodaiSpeed;
                }
            });
    }

    if (selectLimoRoomAnimation && selectLimoRoomAnimation.length > 0) {
        selectLimoRoomAnimation.forEach((item) => {
            item.animation.forEach(
                (item) =>
                    (item.material.map.offset.x += limoAnimationGuandaoSpeed)
            );
            item.transparent.forEach((item) => {
                item.material.transparent = true;
                item.material.opacity = 0.3;
                item.renderOrder = 650;
            });
            item.rotation.rotation.y += limoAnimationRotationSpeed;
        });
    }

    if (mainRoundingType && roamRoudingType) {
        if (mianRoundingIndex < 150) {
            mianRoundingIndex++;
        } else if (mianRoundingIndex == 150) {
            tweenMoveView([-3123, 0, -2207], [-3018, 1305, 659], 2000, () => {
                container.orbitControls.autoRotate = true;
            });
            mianRoundingIndex++;
        }
    } else {
        mianRoundingIndex = 1;
        container.orbitControls.autoRotate = false;
    }

    const delta = clock.getDelta();
    if (mixers.length > 0) {
        mixers.forEach((item) => item.update(delta));
    }

    GDmovingCXFFJ &&
        GDmovingCXFFJ.traverse((child) => {
            if (child.isMesh) {
                child.material.map &&
                    (child.material.map.offset.x += GDmovingSpeed);
            }
        });
    GDmovingSS &&
        GDmovingSS.traverse((child) => {
            if (child.isMesh) {
                child.material.map &&
                    (child.material.map.offset.x += GDmovingSpeed);
            }
        });
    GDmovingLZFJ &&
        GDmovingLZFJ.traverse((child) => {
            if (child.isMesh) {
                child.material.map &&
                    (child.material.map.offset.x += GDmovingSpeed);
            }
        });
    GDmovingYSKQ &&
        GDmovingYSKQ.traverse((child) => {
            if (child.isMesh) {
                child.material.map &&
                    (child.material.map.offset.x += GDmovingSpeed);
            }
        });
    GDmovingSG && (GDmovingSG.material.map.offset.x += GDmovingSpeed);
    GDmovingDQ &&
        GDmovingDQ.traverse((child) => {
            if (child.isMesh) {
                child.material.map &&
                    (child.material.map.offset.x += GDmovingSpeed);
            }
        });
};

const limoTapChange = () => {
    let leftTap = document.querySelector(".leftTap");
    let rightTap = document.querySelector(".rightTap");

    leftTap.onclick = function () {
        document.querySelector(".limoDeviceOpaction").style.display = "block";
        document.querySelector(".limoDeviceWeibao").style.display = "none";
        leftTap.classList.add("limoHightLight");
        rightTap.classList.remove("limoHightLight");
    };

    rightTap.onclick = function () {
        document.querySelector(".limoDeviceOpaction").style.display = "none";
        document.querySelector(".limoDeviceWeibao").style.display = "block";
        rightTap.classList.add("limoHightLight");
        leftTap.classList.remove("limoHightLight");
    };
};

////////////////////////////////////////////////////
////////////////////基本效果功能/////////////////////
////////////////////////////////////////////////////

// 场景视角移动 补间动画移动
var cameraTween, orbitTween;
export const tweenMoveView = (point, look, times, td) => {
    cameraTween = new THREE.TWEEN.Tween(container.orbitCamera)
        .to({ position: new THREE.Vector3(...look) }, times)
        .start()
        .onComplete(function () {
            td && td();
        });
    orbitTween = new THREE.TWEEN.Tween(container.orbitControls)
        .to({ target: new THREE.Vector3(...point) }, times)
        .start();
};
// 瞬间移动视角
export const nowMoveView = (point, look) => {
    container.orbitCamera.position.set(...look);
    container.orbitControls.target.set(...point);
};

// 实时获取位置
window.outViewPoint = () => {
    const point = container.orbitControls.target;
    const camera = container.orbitCamera.position;
    console.log(
        "point:",
        point.x.toFixed(4) + "," + point.y.toFixed(4) + "," + point.z.toFixed(4)
    );
    console.log(
        "look:",
        camera.x.toFixed(4) +
            "," +
            camera.y.toFixed(4) +
            "," +
            camera.z.toFixed(4)
    );
};

// 场景鼠标事件
const mouseLockToggle = (bool) => {
    container.orbitControls.enablePan = bool;
    container.orbitControls.enableRotate = bool;
    container.orbitControls.enableZoom = bool;
};

// 生成点击事件片
const addDevicePlane = () => {
    deviceModelPlane = new THREE.POI.Popup({
        value: `<div class='deviceBoxParent'>
            <div class='deviceModelBox'></div>
            <div class='deviceBox-close'></div>
        </div>`,
        position: [0, 0, 0],
        className: "deviceModelFull",
        closeVisible: "hidden",
        center: [-0.5, -0.5],
    });
    deviceModelPlane.visible = false;
    container.attach(deviceModelPlane);

    let findDom = setInterval(() => {
        let element = document.querySelector(".deviceBox-close");
        if (element) {
            element.innerHTML = "&#10006";
            element.setAttribute(
                "style",
                "color:white;height: 20px; width: 20px; position: absolute; right: 0; top: 0;display:flex;align-items:center;justify-content:center;cursor: pointer"
            );
            element.style.visibility = "visible";

            element.onclick = () => {
                deviceModelPlane.visible = false;
            };
            clearInterval(findDom);
        }
    }, 100);
};

// 生成摄像头点击事件片
const addCameraDevicePlane = () => {
    cameraModelPlane = new THREE.POI.Popup({
        value: `<div class='deviceCameraBoxParent'>
            <div class='deviceCameraModelBox'></div>
            <div class='deviceCameraBox-close'></div>
        </div>`,
        position: [0, 0, 0],
        className: "deviceCameraModelFull",
        closeVisible: "hidden",
        center: [-0.5, -0.5],
    });
    cameraModelPlane.visible = false;
    container.attach(cameraModelPlane);

    let findDom = setInterval(() => {
        let element = document.querySelector(".deviceCameraBox-close");
        if (element) {
            element.innerHTML = "&#10006";
            element.setAttribute(
                "style",
                "color:white;height: 20px; width: 20px; position: absolute; display:flex;align-items:center;justify-content:center;cursor: pointer"
            );
            element.style.visibility = "visible";

            element.onclick = () => {
                cameraModelPlane.visible = false;
            };
            clearInterval(findDom);
        }
    }, 100);
};

// 生成堆场led屏幕片
var duichangLEDarrs = [];
const duichangData = [
    { id: "tzdc-3-1", position: [-2583.7, 290.8, -3440.7] },
    { id: "tzdc-3-2", position: [-2376, 290.8, -3440.7] },
    { id: "tzdc-3-3", position: [-2166.3, 290.8, -3440.7] },
    { id: "tzdc-3-4", position: [-1956.3, 290.8, -3440.7] },
    { id: "tzdc-3-5", position: [-2583.7, 290.8, -3341] },
    { id: "tzdc-3-6", position: [-2376, 290.8, -3341] },
    { id: "tzdc-3-7", position: [-2166.3, 290.8, -3341] },
    { id: "tzdc-3-8", position: [-1956.3, 290.8, -3341] },
    { id: "tzdc-4-9", position: [-2583.1, 290.8, -2789] },
    { id: "tzdc-4-10", position: [-2376.2, 290.8, -2789] },
    { id: "tzdc-4-11", position: [-2166.3, 290.8, -2789] },
    { id: "tzdc-4-12", position: [-1956.3, 290.8, -2789] },
    { id: "tzdc-4-13", position: [-2583.1, 290.8, -2662.5] },
    { id: "tzdc-4-14", position: [-2376.2, 290.8, -2662.5] },
    { id: "tzdc-4-15", position: [-2166.3, 290.8, -2662.5] },
    { id: "tzdc-4-16", position: [-1956.3, 290.8, -2662.5] },
    { id: "tzdc-4-17", position: [-1737, 290.8, -2662.5] },
];
const addDuichangLEDPlane = () => {
    duichangData.forEach((item) => {
        let dom = document.createElement("div");
        dom.className = "duichangLEDplaneBox";
        dom.id = `${item.id}LEDplane`;
        dom.innerHTML = `${item.id}`;
        document.body.appendChild(dom);
        let div = document.getElementById(`${item.id}LEDplane`);
        html2canvas(div).then((canvas) => {
            let texture = new THREE.CanvasTexture(canvas);
            let material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
            });
            let geometry = new THREE.PlaneGeometry(36, 8, 1);
            let plane = new THREE.Mesh(geometry, material);
            plane.position.set(
                item.position[0],
                item.position[1],
                item.position[2]
            );
            plane.rotation.set(0, Math.PI / 2, 0);
            plane.userData.id = item.id;

            container.attach(plane);
            duichangLEDarrs.push(plane);
        });
    });
};

const outRoadLEDdatas = [
        {
            id: "10.12.64.61",
            position: [-4427.4, 305.02, -4058],
            rotation: [0, Math.PI, 0],
        },
        {
            id: "10.12.64.62",
            position: [-4412.84, 278.48, -2721],
            rotation: [0, Math.PI, 0],
        },
        {
            id: "10.12.64.64",
            position: [-1315.57, 301.92, -3378.51],
            rotation: [0, 0, 0],
        },
        {
            id: "10.12.64.63",
            position: [-1316.67, 274.76, -2719.5],
            rotation: [0, 0, 0],
        },
    ],
    outRoadLEDarrs = [];

const addOutRoadLEDPlane = () => {
    outRoadLEDdatas.forEach((item) => {
        let dom = document.createElement("div");
        dom.className = "outRoadLEDplanes";
        dom.id = `${item.id}outRoadLEDplane`;
        dom.innerHTML = `
            <div class='outRoadLed4'>→ 3#堆坊</div>
            <div class='outLineRed'></div>
            <div class='outRoadLed4'>→ 3#堆坊</div>
            <div class='outLineRed'></div>
            <div class='outRoadLed4'>→ 3#堆坊</div>
            <div class='outLineRed'></div>
            <div class='outRoadLed4'>→ 5#/6#堆坊</div>
         `;
        document.body.appendChild(dom);
        let div = document.getElementById(`${item.id}outRoadLEDplane`);
        html2canvas(div).then((canvas) => {
            let texture = new THREE.CanvasTexture(canvas);
            let material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
            });
            let geometry = new THREE.PlaneGeometry(14, 12, 1);
            let plane = new THREE.Mesh(geometry, material);
            plane.position.set(...item.position);
            plane.rotation.set(...item.rotation);
            plane.userData.id = item.id;

            container.attach(plane);
            outRoadLEDarrs.push(plane);
        });
    });
};

// 房间上LED片
const roomUpLedPlane = [
        {
            id: "outRoom1",
            position: [-3532.05, 53.84, -857.9],
            rotation: [0, 0, 0],
        },
        {
            id: "outRoom2",
            position: [-2015.78, 53.87, -857.9],
            rotation: [0, 0, 0],
        },
        {
            id: "outRoom3",
            position: [-3545.42, 65.83, -1266.9],
            rotation: [0, 0, 0],
        },
        {
            id: "outRoom4",
            position: [-3306.92, 184.3, -2112.75],
            rotation: [0, Math.PI, 0],
        },
        {
            id: "outRoom5",
            position: [-2627.05, 364.11, -3868.2],
            rotation: [0, Math.PI, 0],
        },
        {
            id: "outRoom6",
            position: [-2844.54, 364.17, -3868.2],
            rotation: [0, Math.PI, 0],
        },
    ],
    roomUpLedPlanearrs = [];

const addRoomUpLedPlanePlane = () => {
    roomUpLedPlane.forEach((item) => {
        let dom = document.createElement("div");
        dom.className = "roomUpLEDplanes";
        dom.id = `${item.id}roomUpLEDplane`;
        dom.innerHTML = `
            <div class='roomUpText'>车间人数:999</div>
        `;
        document.body.appendChild(dom);
        let div = document.getElementById(`${item.id}roomUpLEDplane`);
        html2canvas(div).then((canvas) => {
            let texture = new THREE.CanvasTexture(canvas);
            let material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
            });
            let geometry = new THREE.PlaneGeometry(18, 4, 1);
            let plane = new THREE.Mesh(geometry, material);
            plane.position.set(...item.position);
            plane.rotation.set(...item.rotation);
            plane.userData.id = item.id;

            container.attach(plane);
            roomUpLedPlanearrs.push(plane);
        });
    });
};
/*
    更新房子上面的六个LED屏幕信息
    data = [
        {
            id: xxxx,
            value: 'xxxxx',
        },
        ......
    ]
*/
export const updataRoomUpLEDplane = (data) => {
    data.forEach((item) => {
        let div = document.getElementById(`${item.id}roomUpLEDplane`);
        div.innerHTML = `
            <div class='roomUpText'>${item.value}</div>
        `;
        html2canvas(div).then((canvas) => {
            let obj;
            roomUpLedPlanearrs.forEach((dev) => {
                if (dev.userData.id == item.id) {
                    obj = dev;
                }
            });
            let texture = new THREE.CanvasTexture(canvas);
            obj.material.map = texture;
            obj.material.needsUpdate = true;
        });
    });
};
// 外围墙上的6个LED片聚焦
export const focusRoomUpLED = (id, times, td = () => {}) => {
    let look;
    if (id == "outRoom1" || id == "outRoom2" || id == "outRoom3") {
        look = [2.7978, 7.3702, 46.4496];
    } else {
        look = [-0.278, 7.2014, -45.467];
    }

    roomUpLedPlane.forEach((item) => {
        if (item.id == id) {
            tweenMoveView(
                item.position,
                [
                    item.position[0] + look[0],
                    item.position[1] + look[1],
                    item.position[2] + look[2],
                ],
                times,
                td
            );
        }
    });
};

/*
    更新外围马路上的四个LED屏幕信息
    data = [
        {
            id: xxxx,
            value: [xxxx,xxxx,xxx,xx],  // 最小一个值，最大四个值
        },
        ......
    ]
*/
export const updataLEDforOutRoadPlane = (data) => {
    data.forEach((item) => {
        let div = document.getElementById(`${item.id}outRoadLEDplane`);

        let text;
        if (item.value.length == 1) {
            text = `
            <div class='outRoadBox1'>
                <div class='outRoadLed4'>${item.value[0]}</div>
            </div>
            `;
        } else if (item.value.length == 2) {
            text = `
                <div class='outRoadBox2'>
                    <div class='outRoadLed4'>${item.value[0]}</div>
                    <div class='outLineRed'></div>
                    <div class='outRoadLed4'>${item.value[1]}</div>
                </div>
            `;
        } else if (item.value.length == 3) {
            text = `
            <div class='outRoadBox3'>
                <div class='outRoadLed4'>${item.value[0]}</div>
                <div class='outLineRed'></div>
                <div class='outRoadLed4'>${item.value[1]}</div>
                <div class='outLineRed'></div>
                <div class='outRoadLed4'>${item.value[2]}</div>
            </div>
            `;
        } else if (item.value.length == 4) {
            text = `
                <div class='outRoadLed4'>${item.value[0]}</div>
                <div class='outLineRed'></div>
                <div class='outRoadLed4'>${item.value[1]}</div>
                <div class='outLineRed'></div>
                <div class='outRoadLed4'>${item.value[2]}</div>
                <div class='outLineRed'></div>
                <div class='outRoadLed4'>${item.value[3]}</div>
            `;
        }

        div.innerHTML = text;
        html2canvas(div).then((canvas) => {
            let obj;
            outRoadLEDarrs.forEach((dev) => {
                if (dev.userData.id == item.id) {
                    obj = dev;
                }
            });
            let texture = new THREE.CanvasTexture(canvas);
            obj.material.map = texture;
            obj.material.needsUpdate = true;
        });
    });
};
// 外围马路上的四个LED屏幕聚焦
export const focusoutRoadLED = (id, times, td = () => {}) => {
    outRoadLEDdatas.forEach((item) => {
        if (item.id == id) {
            tweenMoveView(
                item.position,
                item.id == "10.12.64.64" || item.id == "10.12.64.63"
                    ? [
                          item.position[0],
                          item.position[1] + 8.1486,
                          item.position[2] + 51.4477,
                      ]
                    : [
                          item.position[0],
                          item.position[1] + 8.1486,
                          item.position[2] - 51.4477,
                      ],
                times,
                td
            );
        }
    });
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
export const updateLEDPlane = (data) => {
    data.forEach((item) => {
        let div = document.getElementById(`${item.stockPlaceCode}LEDplane`);
        div.innerHTML = `${item.materialShortName}`;
        html2canvas(div).then((canvas) => {
            let obj;
            duichangLEDarrs.forEach((dev) => {
                if (dev.userData.id == item.stockPlaceCode) {
                    obj = dev;
                }
            });
            let texture = new THREE.CanvasTexture(canvas);
            obj.material.map = texture;
            obj.material.needsUpdate = true;
        });

        let qui = item.currStock / item.maxStock;
        let type;
        if (item.currStock == 0) {
            type = 0;
        } else {
            if (qui <= 0.25) {
                type = 25;
            } else if (qui > 0.25 && qui <= 0.5) {
                type = 50;
            } else if (qui > 0.5 && qui <= 0.75) {
                type = 75;
            } else if (qui > 0.75) {
                type = 100;
            }
        }

        duishishitouquantity.forEach((dev) => {
            if (dev.userData.id == item.stockPlaceCode) {
                dev.traverse((child) => {
                    if (child.isMesh) {
                        if (type == 0) {
                            child.visible = false;
                        } else {
                            if (child.name.includes(type)) {
                                child.visible = true;
                            } else {
                                child.visible = false;
                            }
                        }
                    }
                });
            }
        });
    });
};
// 堆石车间LED屏幕聚焦
export const focusduishiLED = (id, times, td = () => {}) => {
    duichangData.forEach((item) => {
        if (item.id == id) {
            tweenMoveView(
                item.position,
                [
                    item.position[0] + 143.3295,
                    item.position[1] + 23.5107,
                    item.position[2] - 4.1627,
                ],
                times,
                td
            );
        }
    });
};

// 透明度渐变 shader
const setOpacityMaterial = (object) => {
    // 确定oject的geometry的box size
    // 计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]。
    // 边界矩形不会默认计算，需要调用该接口指定计算边界矩形，否则保持默认值 null。
    object.geometry.computeBoundingBox();
    object.geometry.computeBoundingSphere();

    const { geometry } = object;
    const { max, min } = geometry.boundingBox;
    const size = new THREE.Vector3(max.x - min.x, max.y - min.y, max.z - min.z);

    forMaterial(object.material, (material) => {
        material.transparent = true;
        // material.color.set(0xfff000);
        material.onBeforeCompile = (shader) => {
            shader.uniforms.uSize = {
                value: size,
            };
            shader.uniforms.uOpaci = sisetuOpacity;

            const fragment = /* glsl */ `
                varying vec3 vPosition;
                uniform vec3 uSize;
                uniform float uOpaci;
  
                void main() {
            `;
            const fragmentColor = /* glsl */ `
                vec3 distColor = outgoingLight;
                float aop = diffuseColor.a;
  
                float opac =  1.0 - vPosition.y  / uSize.y;
                if(aop == 0.0){
                    gl_FragColor = vec4(distColor, aop);
                } else {
                    gl_FragColor = vec4(distColor, opac * uOpaci); 
                }
            `;
            shader.fragmentShader = shader.fragmentShader.replace(
                "void main() {",
                fragment
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
                fragmentColor
            );

            const vertex = /* glsl */ `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
            `;
            shader.vertexShader = shader.vertexShader.replace(
                "void main() {",
                vertex
            );
        };
    });
};

// 获取元素材质
const forMaterial = (materials, callback) => {
    if (!callback || !materials) return false;
    if (Array.isArray(materials)) {
        materials.forEach((mat) => {
            callback(mat);
        });
    } else {
        callback(materials);
    }
};

////////////////////////////////////////////////////
////////////////////  方法API  /////////////////////
////////////////////////////////////////////////////

// 返回主场景
export const backMainView = () => {
    roadFlow(false);
    smallRoomFloorPlane(false);
    selectComp &&
        selectComp.traverse((child) => {
            if (child.type == "Group") {
                if (child.name.includes("外墙")) {
                    child.traverse((dev) => {
                        if (dev.isMesh) {
                            dev.material.transparent = false;
                            dev.material.opacity = 1;
                            dev.renderOrder = dev.userData.renderOrder;
                        }
                    });
                } else if (child.name.includes("房顶")) {
                    child.visible = true;
                }
            } else if (child.isMesh) {
                if (child.name.includes("房顶")) {
                    child.visible = true;
                }
            }
        });
    selectComp = null;
    roomWQObjects = null;

    deviceModelPlane.visible = false;
    cameraModelPlane.visible = false;

    container.clickObjects = [defaultSky];
    container.outlineObjects = [];
    mainRoundingType = true;
};

// 地上马路流动线条显示隐藏 并设置流动速度
export const roadFlow = (bool, speed = 0.01) => {
    roadPlane.forEach((item) => (item.visible = bool));
    roadSpeed = speed;
};

// 小厂房内部黄色蓝色片显示隐藏
export const smallRoomFloorPlane = (bool) => {
    yellowPlane && (yellowPlane.visible = bool);
};

// 替换天空盒
export const replaceSkyBoxIndex = (texture) => {
    defaultSky.material.map = texture;
};

// 子场景外墙透明度设置
export const outWallOpacity = (int) => {
    roomWQObjects &&
        roomWQObjects.traverse((child) => {
            if (child.isMesh) {
                child.material.opacity = int;
                if (int == 1) {
                    child.renderOrder = child.userData.renderOrder;
                } else {
                    child.renderOrder = 1000;
                }
            }
        });
};

// 进入厂房事件
export const floorHide = (type) => {
    mainRoundingType = false;
    selectComp &&
        selectComp.traverse((child) => {
            if (child.type == "Group") {
                if (child.name.includes("外墙")) {
                    child.traverse((dev) => {
                        if (dev.isMesh) {
                            dev.material.transparent = false;
                            dev.material.opacity = 1;
                            dev.renderOrder = dev.userData.renderOrder;
                        }
                    });
                } else if (child.name.includes("房顶")) {
                    child.visible = true;
                }
            } else if (child.isMesh) {
                if (child.name.includes("房顶")) {
                    child.visible = true;
                }
            }
        });
    selectComp = null;
    roomWQObjects = null;
    deviceModelPlane.visible = false;
    cameraModelPlane.visible = false;

    let arrs = [];
    if (type == 0) {
        selectComp = shaifenRoom;
        arrs = shaifenClickObjs;
    } else if (type == 1) {
        selectComp = junhuaRoom;
        arrs = junhuaClickObjs;
    } else if (type == 2) {
        selectComp = limoRoom;
        arrs = limoClickObjs;
    } else if (type == 3) {
        selectComp = suishiRoom;
        arrs = suishiClickObjs;
    } else if (type == 4) {
        selectComp = posuiRoom;
        arrs = posuiClickObjs;
    } else if (type == 5) {
        selectComp = duishichang1Room;
        arrs = duishiClickObjs;
    }

    selectComp.traverse((child) => {
        if (child.type == "Group") {
            if (child.name.includes("外墙")) {
                roomWQObjects = child;
                child.traverse((dev) => {
                    if (dev.isMesh) {
                        dev.material.transparent = true;
                        dev.renderOrder = 1000;
                    }
                });
                // child.visible = false; // 需要注释。
            } else if (child.name.includes("房顶")) {
                child.visible = false;
            }
        } else if (child.isMesh) {
            if (child.name.includes("房顶")) {
                child.visible = false;
            }

            // child.visible = false;
            // if (child.name.includes("重点区域摄像头")) {
            //     child.visible = true;
            // }
        }
        // 需要注释
        // else if (child.type == "Object3D" && child.name == "均化间内部") {
        //     child.traverse((dev) => {
        //         dev.isMesh && arrs.push(dev);
        //     });
        // }
    });
    container.clickObjects = [...arrs, defaultSky];
};

// 四色图显示隐藏，并根据需要改变颜色
export const fourColorDiagram = (bool, color, color1, speed = 0.01) => {
    fourColorPic.visible = bool;
    fourColorPic.traverse((child) => {
        if (child.isMesh) {
            if (child.name.includes("一般风险区域")) {
                child.material.color.set(color);
            } else if (child.name.includes("低风险区域")) {
                child.material.color.set(color1);
            }
        }
    });
    fourColorSpeed = speed;
};

// 经纬度转换全局坐标
function cooTransformToLL(x, y) {
    // YIDONG-001   A 标记点1   [-4067.889709472656, -4267.769775390625]       133778, 304719  单位毫米
    // YIDONG-002   B 标记点2   [-1808.002471923828, -844.051513671875]        276934, 676333  单位毫米

    let realCoordinate = [],
        modelCoordinate = [];

    realCoordinate[0] = {
        x: 133778,
        y: 304719,
    };
    modelCoordinate[0] = {
        x: -4067.889709472656,
        y: -4267.769775390625,
    };
    realCoordinate[1] = {
        x: 276934,
        y: 676333,
    };
    modelCoordinate[1] = {
        x: -1808.002471923828,
        y: -844.051513671875,
    };

    let offsetX, offsetY;
    if (
        realCoordinate[0].x - realCoordinate[1].x > 0 &&
        modelCoordinate[0].x - modelCoordinate[1].x > 0
    ) {
        offsetX = Math.abs(
            (realCoordinate[0].x - realCoordinate[1].x) /
                (modelCoordinate[0].x - modelCoordinate[1].x)
        ); //模型X轴坐标和经度的偏移值(经度差值 / X轴差值）
    } else if (
        realCoordinate[0].x - realCoordinate[1].x < 0 &&
        modelCoordinate[0].x - modelCoordinate[1].x < 0
    ) {
        offsetX = Math.abs(
            (realCoordinate[0].x - realCoordinate[1].x) /
                (modelCoordinate[0].x - modelCoordinate[1].x)
        ); //模型X轴坐标和经度的偏移值(经度差值 / X轴差值）
    } else {
        offsetX = -Math.abs(
            (realCoordinate[0].x - realCoordinate[1].x) /
                (modelCoordinate[0].x - modelCoordinate[1].x)
        ); //模型X轴坐标和经度的偏移值(经度差值 / X轴差值）
    }
    if (
        realCoordinate[0].y - realCoordinate[1].y > 0 &&
        modelCoordinate[0].y - modelCoordinate[1].y > 0
    ) {
        offsetY = Math.abs(
            (realCoordinate[0].y - realCoordinate[1].y) /
                (modelCoordinate[0].y - modelCoordinate[1].y)
        ); //模型X轴坐标和经度的偏移值(经度差值 / X轴差值）
    } else if (
        realCoordinate[0].y - realCoordinate[1].y < 0 &&
        modelCoordinate[0].y - modelCoordinate[1].y < 0
    ) {
        offsetY = Math.abs(
            (realCoordinate[0].y - realCoordinate[1].y) /
                (modelCoordinate[0].y - modelCoordinate[1].y)
        ); //模型X轴坐标和经度的偏移值(经度差值 / X轴差值）
    } else {
        offsetY = -Math.abs(
            (realCoordinate[0].y - realCoordinate[1].y) /
                (modelCoordinate[0].y - modelCoordinate[1].y)
        ); //模型X轴坐标和经度的偏移值(经度差值 / X轴差值）
    }

    let positionX = (x - realCoordinate[0].x) / offsetX + modelCoordinate[0].x;
    let positionY = (y - realCoordinate[0].y) / offsetY + modelCoordinate[0].y;

    return { x: positionX, z: positionY };
}

// 外墙体透明度设置
export const outwallCondition = (number) => {
    allRoomObjs.forEach((item) => {
        item.traverse((child) => {
            if (child.isMesh) {
                if (child.name.includes("房顶")) {
                    child.material.opacity = number;
                    if (number == 1) {
                        child.material.transparent = false;
                        child.castShadow = child.userData.castShadow;
                        child.receiveShadow = child.userData.receiveShadow;
                        child.renderOrder = child.userData.renderOrder;
                    } else {
                        child.material.transparent = true;
                        child.castShadow = false;
                        child.receiveShadow = false;
                        child.renderOrder = 450;
                    }
                }
            }

            if (child.type == "Group") {
                if (
                    child.name.includes("外墙") ||
                    child.name.includes("房顶")
                ) {
                    child.traverse((dev) => {
                        if (dev.isMesh) {
                            dev.material.opacity = number;
                            if (number == 1) {
                                dev.material.transparent = false;
                                dev.castShadow = child.userData.castShadow;
                                dev.receiveShadow =
                                    child.userData.receiveShadow;
                                dev.renderOrder = dev.userData.renderOrder;
                            } else {
                                dev.castShadow = false;
                                dev.receiveShadow = false;
                                dev.material.transparent = true;
                                dev.renderOrder = 450;
                            }
                        }
                    });
                }
            }
        });
    });
};

// 所有外墙透明度设置
export const outRoomOpactiy = (number) => {
    allOutSideBuild.forEach((item) => {
        item.visible = true;
        if (number == 1) {
            item.material.transparent = item.userData.transType;
            item.material.opacity = number;
            item.renderOrder = item.userData.renderOrder;
        } else if (number == 0) {
            item.visible = false;
        } else {
            item.material.transparent = true;
            item.material.opacity = number;
            item.renderOrder = 450;
        }
    });
};

var limoRobotLine = [
        { position: [-3166.68, 214.64, -1504.03], index: "1" },
        { position: [-3338.21, 214.64, -1503.95], index: "2" },
        { position: [-3579.21, 214.64, -1504.11], index: "3" },
        { position: [-3756.82, 214.64, -1504.06], index: "4" },
        { position: [-3939.45, 214.64, -1504.15], index: "5" },
        { position: [-4117.86, 214.64, -1504.13], index: "6" },
        { position: [-4175.08, 214.64, -1504.1], index: "sl1" },
        { position: [-4214.21, 224.87, -1504.19], index: "sl2" },
        { position: [-4254.94, 235.76, -1504.12], index: "sl3" },
        { position: [-4253.62, 235.76, -1503.85], index: "sl4" },
        { position: [-4270.48, 235.76, -1504.04], index: "sl5" },
        { position: [-4276.51, 235.76, -1507.48], index: "sl6" },
        { position: [-4278.44, 235.18, -1513.32], index: "sl7" },
        { position: [-4278.49, 209.09, -1611.25], index: "7" },
        { position: [-4278.29, 158.58, -1800.55], index: "8" },
        { position: [-4278.38, 155.91, -1810.54], index: "ll1" },
        { position: [-4278.55, 155.28, -1812.78], index: "ll2" },
        { position: [-4278.36, 155.28, -1851.46], index: "ll3" },
        { position: [-4278.56, 155.28, -1853.0], index: "ll4" },
        { position: [-4279.26, 155.28, -1855.0], index: "ll5" },
        { position: [-4280.33, 155.28, -1856.72], index: "ll6" },
        { position: [-4282.76, 155.28, -1857.82], index: "ll7" },
        { position: [-4285.69, 155.28, -1858.12], index: "ll8" },
        { position: [-4300.04, 155.28, -1858.17], index: "9" },
        { position: [-4313.37, 155.28, -1858.0], index: "lr1" },
        { position: [-4315.45, 155.28, -1857.87], index: "lr2" },
        { position: [-4317.65, 155.28, -1856.92], index: "lr3" },
        { position: [-4319.66, 155.28, -1853.34], index: "lr4" },
        { position: [-4320.19, 155.28, -1850.92], index: "lr5" },
        { position: [-4320.16, 155.28, -1812.29], index: "lr6" },
        { position: [-4320.02, 155.83, -1810.8], index: "lr7" },
        { position: [-4319.88, 157.45, -1804.69], index: "lr8" },
        { position: [-4320.15, 163.79, -1780.51], index: "10" },
        { position: [-4319.84, 191.62, -1674.41], index: "11" },
        { position: [-4320.18, 220.53, -1564.17], index: "12" },
        { position: [-4320.0, 235.24, -1508.02], index: "ss1" },
        { position: [-4320.16, 235.76, -1505.21], index: "ss2" },
        { position: [-4320.14, 236.33, -1498.86], index: "ss3" },
        { position: [-4319.99, 236.33, -1469.94], index: "13" },
        { position: [-4320.18, 236.33, -1439.76], index: "ul1" },
        { position: [-4319.71, 236.33, -1434.47], index: "ul2" },
        { position: [-4318.3, 236.33, -1431.11], index: "ul3" },
        { position: [-4315.7, 236.33, -1428.65], index: "ul4" },
        { position: [-4311.61, 236.33, -1427.19], index: "ul5" },
        { position: [-4307.24, 236.33, -1426.96], index: "ul6" },
        { position: [-4303.17, 236.33, -1426.89], index: "ul7" },
        { position: [-4254.9, 235.76, -1426.93], index: "ul8" },
        { position: [-4235.54, 230.67, -1427.07], index: "14" },
        { position: [-4177.03, 214.64, -1426.87], index: "qs1" },
        { position: [-4172.33, 214.64, -1426.98], index: "qs2" },
        { position: [-4063.16, 214.64, -1426.84], index: "15" },
        { position: [-3931.88, 214.64, -1427.15], index: "16" },
        { position: [-3702.9, 214.64, -1426.96], index: "17" },
        { position: [-3516.14, 214.64, -1426.94], index: "18" },
        { position: [-3336.92, 214.64, -1426.97], index: "19" },
        { position: [-3160.8, 214.64, -1427.11], index: "20" },
    ],
    limoRobotLineBack = [
        { position: [-3160.8, 214.64, -1427.11], index: "20" },
        { position: [-3336.92, 214.64, -1426.97], index: "19" },
        { position: [-3516.14, 214.64, -1426.94], index: "18" },
        { position: [-3702.9, 214.64, -1426.96], index: "17" },
        { position: [-3931.88, 214.64, -1427.15], index: "16" },
        { position: [-4063.16, 214.64, -1426.84], index: "15" },
        { position: [-4172.33, 214.64, -1426.98], index: "qs2" },
        { position: [-4177.03, 214.64, -1426.87], index: "qs1" },
        { position: [-4235.54, 230.67, -1427.07], index: "14" },
        { position: [-4254.9, 235.76, -1426.93], index: "ul8" },
        { position: [-4303.17, 236.33, -1426.89], index: "ul7" },
        { position: [-4307.24, 236.33, -1426.96], index: "ul6" },
        { position: [-4311.61, 236.33, -1427.19], index: "ul5" },
        { position: [-4315.7, 236.33, -1428.65], index: "ul4" },
        { position: [-4318.3, 236.33, -1431.11], index: "ul3" },
        { position: [-4319.71, 236.33, -1434.47], index: "ul2" },
        { position: [-4320.18, 236.33, -1439.76], index: "ul1" },
        { position: [-4319.99, 236.33, -1469.94], index: "13" },
        { position: [-4320.14, 236.33, -1498.86], index: "ss3" },
        { position: [-4320.16, 235.76, -1505.21], index: "ss2" },
        { position: [-4320.0, 235.24, -1508.02], index: "ss1" },
        { position: [-4320.18, 220.53, -1564.17], index: "12" },
        { position: [-4319.84, 191.62, -1674.41], index: "11" },
        { position: [-4320.15, 163.79, -1780.51], index: "10" },
        { position: [-4319.88, 157.45, -1804.69], index: "lr8" },
        { position: [-4320.02, 155.83, -1810.8], index: "lr7" },
        { position: [-4320.16, 155.28, -1812.29], index: "lr6" },
        { position: [-4320.19, 155.28, -1850.92], index: "lr5" },
        { position: [-4319.66, 155.28, -1853.34], index: "lr4" },
        { position: [-4317.65, 155.28, -1856.92], index: "lr3" },
        { position: [-4315.45, 155.28, -1857.87], index: "lr2" },
        { position: [-4313.37, 155.28, -1858.0], index: "lr1" },
        { position: [-4300.04, 155.28, -1858.17], index: "9" },
        { position: [-4285.69, 155.28, -1858.12], index: "ll8" },
        { position: [-4282.76, 155.28, -1857.82], index: "ll7" },
        { position: [-4280.33, 155.28, -1856.72], index: "ll6" },
        { position: [-4279.26, 155.28, -1855.0], index: "ll5" },
        { position: [-4278.56, 155.28, -1853.0], index: "ll4" },
        { position: [-4278.36, 155.28, -1851.46], index: "ll3" },
        { position: [-4278.55, 155.28, -1812.78], index: "ll2" },
        { position: [-4278.38, 155.91, -1810.54], index: "ll1" },
        { position: [-4278.29, 158.58, -1800.55], index: "8" },
        { position: [-4278.49, 209.09, -1611.25], index: "7" },
        { position: [-4278.44, 235.18, -1513.32], index: "sl7" },
        { position: [-4276.51, 235.76, -1507.48], index: "sl6" },
        { position: [-4270.48, 235.76, -1504.04], index: "sl5" },
        { position: [-4253.62, 235.76, -1503.85], index: "sl4" },
        { position: [-4254.94, 235.76, -1504.12], index: "sl3" },
        { position: [-4214.21, 224.87, -1504.19], index: "sl2" },
        { position: [-4175.08, 214.64, -1504.1], index: "sl1" },
        { position: [-4117.86, 214.64, -1504.13], index: "6" },
        { position: [-3939.45, 214.64, -1504.15], index: "5" },
        { position: [-3756.82, 214.64, -1504.06], index: "4" },
        { position: [-3579.21, 214.64, -1504.11], index: "3" },
        { position: [-3338.21, 214.64, -1503.95], index: "2" },
        { position: [-3166.68, 214.64, -1504.03], index: "1" },
    ],
    limoTween;

// 立磨巡检机器人动画
export const limoRobotAnimation = (id, speed, bool) => {
    limoTween && limoTween.stop();
    if (bool == false) {
        return false;
    }

    let indexPosition;
    limoRobotLine.forEach((item) => {
        if (item.index == id) {
            indexPosition = item.position;
        }
    });
    let meshPosition = moveingRobot.position.clone();
    if (
        id == moveingRobot.userData.lockID &&
        (indexPosition[0] != meshPosition.x ||
            indexPosition[2] != meshPosition.z)
    ) {
        let v2 = new THREE.Vector3(
            indexPosition[0],
            indexPosition[1] - 3.33,
            indexPosition[2]
        );
        let dis = meshPosition.distanceTo(v2);

        limoTween = new THREE.TWEEN.Tween(moveingRobot)
            .to(
                {
                    position: new THREE.Vector3(
                        indexPosition[0],
                        indexPosition[1] - 3.33,
                        indexPosition[2]
                    ),
                },
                dis * speed
            )
            .start()
            .onComplete(function () {});
    }

    if (
        id == moveingRobot.userData.lockID &&
        indexPosition[0] == meshPosition.x &&
        indexPosition[2] == meshPosition.z
    ) {
        return false;
    }

    let object =
        moveingRobot.userData.lockID < id ? limoRobotLine : limoRobotLineBack;

    object.forEach((item, i) => {
        if (item.index == moveingRobot.userData.lockID) {
            moveingRobot.userData.lockIndex = i;
        }
    });

    let line = [],
        index;
    for (let i = 0; i < object.length; i++) {
        if (i >= moveingRobot.userData.lockIndex) {
            line.push(object[i]);
            if (id == object[i].index) {
                index = i;
                break;
            }
        }
    }

    let lookMoving = (arr, i) => {
        if (i == arr.length - 1) return false;
        moveingRobot.lookAt(
            arr[i + 1].position[0],
            arr[i + 1].position[1] - 3.33,
            arr[i + 1].position[2]
        );
        let v1 = moveingRobot.position.clone();
        let v2 = new THREE.Vector3(
            arr[i + 1].position[0],
            arr[i + 1].position[1] - 3.33,
            arr[i + 1].position[2]
        );
        let dis = v1.distanceTo(v2);
        limoTween = new THREE.TWEEN.Tween(moveingRobot)
            .to(
                {
                    position: new THREE.Vector3(
                        arr[i + 1].position[0],
                        arr[i + 1].position[1] - 3.33,
                        arr[i + 1].position[2]
                    ),
                },
                dis * speed
            )
            .start()
            .onComplete(function () {
                moveingRobot.userData.lockID = arr[i + 1].index;
                limoRobotLine.forEach((item, b) => {
                    if (item.index == arr[i + 1].index) {
                        moveingRobot.userData.lockIndex = b;
                    }
                });
                lookMoving(arr, i + 1);
            });
    };
    lookMoving(line, 0);
};

// 立磨巡检机器人恢复到初始状态
export const limoRobotInitalize = () => {
    limoTween && limoTween.stop();
    moveingRobot.userData.lockID = 1;
    moveingRobot.position.set(-3166.68, 214.64 - 3.33, -1504.03);
    moveingRobot.lookAt(-3338.21, 214.64 - 3.33, -1503.95);
};

// 立磨巡检机器人充电状态
export const limoRobotLighting = (bool) => {
    if (bool) {
        let arr = [];
        moveingRobot.traverse((child) => {
            if (child.isMesh) {
                arr.push(child);
            }
        });
        container.outlineObjects_1 = arr;
    } else {
        container.outlineObjects_1 = [];
    }
};

// 点击立磨机时修改管道颜色
export const clickLMJtoChangeColor = (
    color,
    speed = 0.03,
    guandaoSpeed = 0.03
) => {
    selectLimoRoomAnimation &&
        selectLimoRoomAnimation.forEach((item) => {
            item.animation.forEach((dev) => {
                dev.material.color.set(color);
            });
        });
    limoAnimationGuandaoSpeed = guandaoSpeed;
    limoAnimationRotationSpeed = speed;
};

// 立磨间皮带动画
export const limoPDanimation = (speed = 0.03, bool) => {
    limojiJiaodaiType = bool;
    limojiJiaodaoSpeed = speed;
};

// 破碎间皮带动画
export const posuiDanimation = (speed = 0.03, bool) => {
    posuijianJiaodaiType = bool;
    posuijianJiaodaiSpeed = speed;
};

// 筛分间皮带动画
export const saifenDanimation = (speed = 0.03, bool) => {
    saifenjianJiaodaiType = bool;
    saifenjianJiaodaiSpeed = speed;
};

// 碎石间皮带动画
export const suishiDanimation = (speed = 0.03, bool) => {
    suishijianJiaodaiType = bool;
    suishijianJiaodaiSpeed = speed;
};

/* 
    初始化加载车辆信息以及初始化定位信息
    data = [
        {
            id: xxxx,
            name: xxxx,
            x: xxxx,
            y: xxxx,
        },
        ......
    ]
*/
export const initalizeCar = (data) => {
    data.forEach((item) => {
        let mesh = carMesh.clone();
        mesh.visible = true;

        const geometry = new THREE.BoxGeometry(1, 10, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
        });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        cube.visible = false;
        container.attach(cube);

        mesh.userData.id = item.id;
        mesh.userData.cubeMesh = cube;
        mesh.userData.tweenAnimation = null;

        const Planegeometry = new THREE.PlaneGeometry(1, 1);
        const Planematerial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(Planegeometry, Planematerial);
        plane.name = "carPlaneCameraFoucs";
        plane.position.set(12, 7, 0);
        plane.visible = false;
        mesh.add(plane);

        let spriteOrigin = makeTextSprite(item.name, {
            fontsize: 20,
            borderColor: { r: 255, g: 0, b: 0, a: 0.4 } /* 边框黑色 */,
            backgroundColor: { r: 255, g: 255, b: 255, a: 0.9 } /* 背景颜色 */,
            size: [5, 5],
        });
        spriteOrigin.center = new THREE.Vector2(0.5, 1);
        spriteOrigin.position.set(0, 5, 0);
        mesh.add(spriteOrigin);

        container.attach(mesh);
        carObjects.push(mesh);
        findLocalPositionY(mesh, cube, [item.x, item.y]);
    });
};

// 车辆聚焦
export const focusCar = (id, times, td = () => {}) => {
    carObjects.forEach((item) => {
        if (item.userData.id == id) {
            let mesh = item.getObjectByName("carPlaneCameraFoucs");
            let vec3 = new THREE.Vector3();
            vec3 = item.localToWorld(mesh.position.clone());
            let controls = [item.position.x, item.position.y, item.position.z];
            let looks = [vec3.x, vec3.y, vec3.z];
            tweenMoveView(controls, looks, times, td);
        }
    });
};

// 找寻物体坐标值
const findLocalPositionY = (mesh, cube, point, name = false, td = () => {}) => {
    let place;
    if (name) {
        locationFloor.traverse((child) => {
            if (child.name == name && child.isMesh) {
                place = child;
            }
        });
    } else {
        locationFloor.traverse((child) => {
            if (child.name == "地面一层" && child.isMesh) {
                place = child;
            }
        });
    }

    let position = cooTransformToLL(point[0], point[1]);
    cube.position.set(position.x, 600, position.z);

    setTimeout(() => {
        findLocalY(mesh, cube, place, position, td);
    }, 100);
};
const findLocalY = (mesh, cube, place, position, td) => {
    cube.position.y -= 10;
    let { bool, y } = onIntersect(cube, place);
    if (bool) {
        mesh.position.set(
            position.x,
            mesh.name == "Ren" ? y + 12.93 : y,
            position.z
        );
        td && td();
    } else {
        findLocalY(mesh, cube, place, position, td);
    }
};
// 铜鼓两个物体找寻相交Y坐标
function onIntersect(cube, cube2) {
    // 声明一个变量用来表示是否碰撞
    let bool = false,
        y = 0;

    // .position 对象局部位置
    // .clone() 复制一个新的三维向量
    // 网格中心 世界坐标
    const centerCoord = cube.position.clone();
    // 获取网格中 几何对象的顶点对象
    const position = cube.geometry.attributes.position;
    // 顶点三维向量
    const vertices = [];
    // .count 矢量个数
    for (let i = 0; i < position.count; i++) {
        // .getX() 获取给定索引的矢量的第一维元素
        vertices.push(
            new THREE.Vector3(
                position.getX(i),
                position.getY(i),
                position.getZ(i)
            )
        );
    }

    for (let i = 0; i < vertices.length; i++) {
        // .matrixWorld 物体的世界坐标变换 -- 物体旋转、位移 的四维矩阵
        // .applyMatrix4() 将该向量乘以四阶矩阵
        // 获取世界坐标下 网格变换后的坐标
        let vertexWorldCoord = vertices[i]
            .clone()
            .applyMatrix4(cube.matrixWorld);

        // .sub(x) 从该向量减去x向量
        // 获得由中心指向顶点的向量
        var dir = vertexWorldCoord.clone().sub(centerCoord);

        // .normalize() 将该向量转换为单位向量
        // 发射光线 centerCoord 为投射的原点向量  dir 向射线提供方向的方向向量
        let raycaster = new THREE.Raycaster(
            centerCoord,
            dir.clone().normalize()
        );

        // 放入要检测的 物体cube2，返回相交物体
        let intersects = raycaster.intersectObjects([cube2], true);

        if (intersects.length > 0) {
            // intersects[0].distance：射线起点与交叉点之间的距离(交叉点：射线和模型表面交叉点坐标)
            // dir.length()：几何体顶点和几何体中心构成向量的长度
            // intersects[0].distance小于dir.length() 表示物体相交
            if (intersects[0].distance < dir.length()) {
                y = intersects[intersects.length - 1].point.y;
                bool = true;
            }
        }
    }
    return { bool, y };
}

// 车辆实时数据动画
export const realtimeMotionCar = (id, point, times, td = () => {}) => {
    let mesh;
    carObjects.forEach((item) => {
        if (item.userData.id == id) {
            mesh = item;
            item.userData.tweenAnimation && item.userData.tweenAnimation.stop();
        }
    });
    let cube = mesh.userData.cubeMesh;

    let place;
    locationFloor.traverse((child) => {
        if (child.name == "地面一层" && child.isMesh) {
            place = child;
        }
    });

    let position = cooTransformToLL(point[0], point[1]);
    cube.position.set(position.x, 600, position.z);

    setTimeout(() => {
        findLocalRealtimeY(mesh, cube, place, position, (y) => {
            mesh.lookAt(position.x, y, position.z);
            mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            mesh.userData.tweenAnimation = new THREE.TWEEN.Tween(mesh)
                .to(
                    {
                        position: new THREE.Vector3(position.x, y, position.z),
                    },
                    times
                )
                .start()
                .onComplete(function () {
                    td && td();
                });
        });
    }, 100);
};
const findLocalRealtimeY = (mesh, cube, place, position, td) => {
    if (cube.position.y < 0) {
        console.log(
            `当前ID为:${mesh.userData.id}，没有在${place.name}上找到对应Y坐标`
        );
        return false;
    }

    cube.position.y -= 10;
    let { bool, y } = onIntersect(cube, place);
    if (bool) {
        td && td(y);
    } else {
        findLocalRealtimeY(mesh, cube, place, position, td);
    }
};

/*
    初始化加载人物模型和匹配id等信息
    data = [
        {
            id: xxxx,
            floor: xxxx,
            name: xxxx,
            x: xxxx,
            y: xxxx,
        },
        ......
    ]
*/
var mixers = [];
export const initalizeMan = (data, td = () => {}) => {
    let index = 0;

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(PRO_ENV + "js/gltfDraco/");
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);
    loader.load(PRO_ENV + "3d/models/Ren.glb", function (gltf) {
        gltf.scene.traverse(function (object) {
            if (object.isMesh) object.castShadow = true;
        });

        data.forEach((item) => {
            const model = SkeletonUtils.clone(gltf.scene);
            const mixer = new THREE.AnimationMixer(model);
            const clip = mixer.clipAction(gltf.animations[0]);
            clip.play();
            clip.paused = true;
            model.scale.set(0.0015, 0.0015, 0.0015);

            const geometry = new THREE.BoxGeometry(1, 10, 1);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
            });
            let cube = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, 0);
            cube.visible = false;
            container.attach(cube);

            model.name = "Ren";
            model.userData.clip = clip;
            model.userData.id = item.id;
            model.userData.cubeMesh = cube;
            model.userData.tweenAnimation = null;

            const Planegeometry = new THREE.PlaneGeometry(1, 1);
            const Planematerial = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide,
            });
            const plane = new THREE.Mesh(Planegeometry, Planematerial);
            plane.name = "peoplePlaneCameraFoucs";
            plane.position.set(0, 30000, -45000);
            plane.visible = false;
            model.add(plane);

            makeTextSpriteAndBg(
                item.name,
                {
                    fontsize: 20,
                    size: [10000, 3000],
                },
                model
            );

            model.position.set(-2873.39, 26.34 + 12.93, -702.8);
            container.attach(model);
            renObjects.push(model);
            mixers.push(mixer);

            index++;
            if (index == data.length - 1) {
                td && td();
            }
        });
    });
};
// export const initalizeMan = (data, td = () => {}) => {
//     let index = 0;

//     const loader = new GLTFLoader();
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath(PRO_ENV + "js/gltfDraco/");
//     dracoLoader.preload();
//     loader.setDRACOLoader(dracoLoader);
//     loader.load(PRO_ENV + "3d/models/Ren.glb", function (gltf) {
//         gltf.scene.traverse(function (object) {
//             if (object.isMesh) object.castShadow = true;
//         });

//         data.forEach((item) => {
//             const model = SkeletonUtils.clone(gltf.scene);
//             const mixer = new THREE.AnimationMixer(model);
//             const clip = mixer.clipAction(gltf.animations[0]);
//             clip.play();
//             clip.paused = true;
//             model.scale.set(0.0015, 0.0015, 0.0015);

//             const geometry = new THREE.BoxGeometry(1, 10, 1);
//             const material = new THREE.MeshBasicMaterial({
//                 color: 0x00ff00,
//             });
//             let cube = new THREE.Mesh(geometry, material);
//             cube.position.set(0, 0, 0);
//             cube.visible = false;
//             container.attach(cube);

//             model.name = "Ren";
//             model.userData.clip = clip;
//             model.userData.id = item.id;
//             model.userData.cubeMesh = cube;
//             model.userData.tweenAnimation = null;

//             const Planegeometry = new THREE.PlaneGeometry(1, 1);
//             const Planematerial = new THREE.MeshBasicMaterial({
//                 color: 0xffff00,
//                 side: THREE.DoubleSide,
//             });
//             const plane = new THREE.Mesh(Planegeometry, Planematerial);
//             plane.name = "peoplePlaneCameraFoucs";
//             plane.position.set(0, 30000, -45000);
//             plane.visible = false;
//             model.add(plane);

//             let spriteOrigin = makeTextSprite(item.name, {
//                 fontsize: 20,
//                 borderColor: { r: 255, g: 0, b: 0, a: 0.4 } /* 边框黑色 */,
//                 backgroundColor: {
//                     r: 255,
//                     g: 255,
//                     b: 255,
//                     a: 0.9,
//                 } /* 背景颜色 */,
//                 size: [10000, 15000],
//             });
//             spriteOrigin.center = new THREE.Vector2(0.5, 1);
//             spriteOrigin.position.set(0, 13000, 0);
//             model.add(spriteOrigin);

//             container.attach(model);
//             renObjects.push(model);
//             mixers.push(mixer);

//             findLocalPositionY(
//                 model,
//                 cube,
//                 [item.x, item.y],
//                 item.floor,
//                 () => {
//                     index++;
//                     if (index == data.length - 1) {
//                         td && td();
//                     }
//                 }
//             );
//         });
//     });
// };

// 人员聚焦
export const focusPeople = (id, times, td = () => {}) => {
    renObjects.forEach((item) => {
        if (item.userData.id == id) {
            let mesh = item.getObjectByName("peoplePlaneCameraFoucs");
            let vec3 = new THREE.Vector3();
            vec3 = item.localToWorld(mesh.position.clone());
            let controls = [item.position.x, item.position.y, item.position.z];
            let looks = [vec3.x, vec3.y, vec3.z];
            tweenMoveView(controls, looks, times, td);
        }
    });
};

/*  
    根据状态决定是否显示当前人员模型
    data = [id, id, id, id]
*/
export const visibleMan = (data, bool) => {
    data.forEach((item) => {
        renObjects.forEach((dev) => {
            if (item == dev.userData.id) {
                dev.visible = bool;
            }
        });
    });
};

// 根据实时数据执行人物动画
export const realtimeMotionMan = (id, point, floor, times, td = () => {}) => {
    let mesh;
    renObjects.forEach((item) => {
        if (item.userData.id == id) {
            mesh = item;
            item.userData.tweenAnimation && item.userData.tweenAnimation.stop();
            mesh.userData.clip.paused = true;
        }
    });
    let cube = mesh.userData.cubeMesh;

    let place;
    locationFloor.traverse((child) => {
        if (child.name == floor && child.isMesh) {
            place = child;
        }
    });

    let position = cooTransformToLL(point[0], point[1]);
    cube.position.set(position.x, 600, position.z);

    setTimeout(() => {
        findLocalRealtimeY(mesh, cube, place, position, (y) => {
            mesh.lookAt(position.x, y + 12.93, position.z);
            mesh.userData.clip.paused = false;
            mesh.userData.tweenAnimation = new THREE.TWEEN.Tween(mesh)
                .to(
                    {
                        position: new THREE.Vector3(
                            position.x,
                            y + 12.93,
                            position.z
                        ),
                    },
                    times
                )
                .start()
                .onComplete(function () {
                    mesh.userData.clip.paused = true;
                    td && td();
                });
        });
    }, 100);
};

// 摄像头重点区域聚焦
export const focusCameraImport = (id, times, td = () => {}) => {
    cameraImportDeviceArrs.forEach((item) => {
        if (item.userData.id == id) {
            tweenMoveView(
                item.userData.focusControls,
                item.userData.focusCamera,
                times,
                td
            );
        }
    });
};

// 粉尘浓度和氧浓度聚焦
export const focusFenChengImport = (id, times, td = () => {}) => {
    fenchengnongduDeviceArrs.forEach((item) => {
        if (item.userData.id == id) {
            tweenMoveView(
                item.userData.focusControls,
                item.userData.focusCamera,
                times,
                () => {
                    cameraModelPlane.position.set(
                        ...item.userData.focusControls
                    );
                    cameraModelPlane.visible = true;
                    let outArr = [];
                    item.traverse((s) => {
                        if (s.isMesh) {
                            outArr.push(s);
                        }
                    });
                    container.outlineObjects = outArr;
                    td && td();
                }
            );
        }
    });
};

// 设置四色图透明度
export const fourColorOpacity = (number) => {
    sisetuOpacity.value = number;
};

/* 创建字体精灵 */
function makeTextSprite(message, parameters) {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface")
        ? parameters["fontface"]
        : "Arial";

    /* 字体大小 */
    var fontsize = parameters.hasOwnProperty("fontsize")
        ? parameters["fontsize"]
        : 18;

    /* 边框厚度 */
    var borderThickness = parameters.hasOwnProperty("borderThickness")
        ? parameters["borderThickness"]
        : 4;

    /* 边框颜色 */
    var borderColor = parameters.hasOwnProperty("borderColor")
        ? parameters["borderColor"]
        : { r: 0, g: 0, b: 0, a: 1.0 };

    /* 背景颜色 */
    var backgroundColor = parameters.hasOwnProperty("backgroundColor")
        ? parameters["backgroundColor"]
        : { r: 255, g: 255, b: 255, a: 1.0 };

    /* 字体颜色 */
    var fontColor = parameters.hasOwnProperty("fontColor")
        ? parameters["fontColor"]
        : { r: 0, g: 0, b: 0, a: 1.0 };

    var metrics =
        message.match(/[^ -~]/g) == null
            ? message.length
            : message.length + message.match(/[^ -~]/g).length;

    /* 创建画布 */
    var canvas = document.createElement("canvas");
    canvas.width = (metrics / 2) * fontsize + borderThickness * 2;
    var context = canvas.getContext("2d");

    /* 字体加粗 */
    context.font = "Bold " + fontsize + "px " + fontface;

    /* 获取文字的大小数据，高度取决于文字的大小 */
    // var metrics = context.measureText(message);
    var textWidth = (metrics / 2) * fontsize;

    /* 背景颜色 */
    context.fillStyle =
        "rgba(" +
        backgroundColor.r +
        "," +
        backgroundColor.g +
        "," +
        backgroundColor.b +
        "," +
        backgroundColor.a +
        ")";

    /* 边框的颜色 */
    context.strokeStyle =
        "rgba(" +
        borderColor.r +
        "," +
        borderColor.g +
        "," +
        borderColor.b +
        "," +
        borderColor.a +
        ")";
    context.lineWidth = borderThickness;

    /* 绘制圆角矩形 */
    roundRect(
        context,
        borderThickness / 2,
        borderThickness / 2,
        textWidth + borderThickness,
        fontsize * 1.4 + borderThickness,
        6
    );

    /* 字体颜色 */
    context.fillStyle =
        "rgba(" +
        fontColor.r +
        "," +
        fontColor.g +
        "," +
        fontColor.b +
        "," +
        fontColor.a +
        ")";
    context.fillText(message, borderThickness, fontsize + borderThickness);

    /* 画布内容用于纹理贴图 */
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(spriteMaterial);

    /* 缩放比例 */
    sprite.scale.set(parameters.size[0], parameters.size[1], 0);
    sprite.renderOrder = 3000;
    return sprite;
}

/* 绘制圆角矩形 */
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// 更新精灵材质的canvas部分
const updataMakeTextSprite = (mesh, message, parameters) => {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface")
        ? parameters["fontface"]
        : "Arial";

    /* 字体大小 */
    var fontsize = parameters.hasOwnProperty("fontsize")
        ? parameters["fontsize"]
        : 18;

    /* 边框厚度 */
    var borderThickness = parameters.hasOwnProperty("borderThickness")
        ? parameters["borderThickness"]
        : 4;

    /* 边框颜色 */
    var borderColor = parameters.hasOwnProperty("borderColor")
        ? parameters["borderColor"]
        : { r: 0, g: 0, b: 0, a: 1.0 };

    /* 背景颜色 */
    var backgroundColor = parameters.hasOwnProperty("backgroundColor")
        ? parameters["backgroundColor"]
        : { r: 255, g: 255, b: 255, a: 1.0 };

    /* 字体颜色 */
    var fontColor = parameters.hasOwnProperty("fontColor")
        ? parameters["fontColor"]
        : { r: 0, g: 0, b: 0, a: 1.0 };

    var metrics =
        message.match(/[^ -~]/g) == null
            ? message.length
            : message.length + message.match(/[^ -~]/g).length;

    /* 创建画布 */
    var canvas = document.createElement("canvas");
    canvas.width = (metrics / 2) * fontsize + borderThickness * 2;
    var context = canvas.getContext("2d");

    /* 字体加粗 */
    context.font = "Bold " + fontsize + "px " + fontface;

    /* 获取文字的大小数据，高度取决于文字的大小 */
    // var metrics = context.measureText(message);
    var textWidth = (metrics / 2) * fontsize;

    /* 背景颜色 */
    context.fillStyle =
        "rgba(" +
        backgroundColor.r +
        "," +
        backgroundColor.g +
        "," +
        backgroundColor.b +
        "," +
        backgroundColor.a +
        ")";

    /* 边框的颜色 */
    context.strokeStyle =
        "rgba(" +
        borderColor.r +
        "," +
        borderColor.g +
        "," +
        borderColor.b +
        "," +
        borderColor.a +
        ")";
    context.lineWidth = borderThickness;

    /* 绘制圆角矩形 */
    roundRect(
        context,
        borderThickness / 2,
        borderThickness / 2,
        textWidth + borderThickness,
        fontsize * 1.4 + borderThickness,
        6
    );

    /* 字体颜色 */
    context.fillStyle =
        "rgba(" +
        fontColor.r +
        "," +
        fontColor.g +
        "," +
        fontColor.b +
        "," +
        fontColor.a +
        ")";
    context.fillText(message, borderThickness, fontsize + borderThickness);

    /* 画布内容用于纹理贴图 */
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    mesh.material = new THREE.SpriteMaterial({ map: texture });
};

// 立磨间主机聚焦
export const limoRoomMainMachine = (id, times, td = () => {}) => {
    limoClickObjs.forEach((item) => {
        if (item.userData.id == id) {
            tweenMoveView(
                item.userData.focusControls,
                item.userData.focusCamera,
                times,
                () => {
                    container.outlineObjects = [item];
                    td && td();
                }
            );
        }
    });
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
*/
export const limoRoomMainMachineDataInit = (
    data,
    fontColor = {
        shutDown: { r: 0, g: 0, b: 0, a: 1.0 },
        open: { r: 0, g: 255, b: 0, a: 1.0 },
        failure: { r: 255, g: 0, b: 0, a: 1.0 },
        maintenance: { r: 110, g: 110, b: 110, a: 1.0 },
    }
) => {
    selectLimoRoomAnimation &&
        selectLimoRoomAnimation.forEach((item) => {
            item.transparent.forEach((dev) => {
                dev.material.transparent = false;
                dev.material.opacity = 1;
                dev.renderOrder = 2;
            });
        });

    let arr = [];
    limoClickObjs.forEach((dev) => {
        data.forEach((item) => {
            if (dev.userData.id == item.id) {
                if (item.status == 1) {
                    let ido = dev.name.slice(7) - 1;
                    arr.push(limoRoomAnimation[ido]);
                }
            }
        });
    });
    limoRoomMachineTopTextObjs.forEach((item) => {
        data.forEach((dev) => {
            if (item.userData.id == dev.id) {
                let colorF;
                if (dev.status == 0) {
                    colorF = fontColor.shutDown;
                } else if (dev.status == 1) {
                    colorF = fontColor.open;
                } else if (dev.status == 2) {
                    colorF = fontColor.failure;
                } else if (dev.status == 3) {
                    colorF = fontColor.maintenance;
                }

                let paramas = {
                    fontsize: 20,
                    borderColor: { r: 255, g: 0, b: 0, a: 0.4 } /* 边框黑色 */,
                    backgroundColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0.9,
                    } /* 背景颜色 */,
                    size: [20, 50],
                    fontColor: colorF,
                };
                updataMakeTextSprite(item, dev.name, paramas);
            }
        });
    });

    selectLimoRoomAnimation = arr;
};

// 生成立磨主机头顶悬浮文本展示当前设备状态
var limoRoomMachineTopTextArr = [
        {
            id: "xxxxxxxxxxxxxxx",
            name: "关机",
            position: [-4038.14, 105.49, -1370.47],
        },
        {
            id: "1672825159000fb72f",
            name: "关机",
            position: [-3918.72, 105.49, -1371.02],
        },
        {
            id: "1672825280000ad947",
            name: "关机",
            position: [-3809.28, 105.49, -1370.95],
        },
        {
            id: "1672825567000c9946",
            name: "关机",
            position: [-3700.49, 105.49, -1371.18],
        },
        {
            id: "16728256160002d46d",
            name: "关机",
            position: [-3569.57, 105.49, -1371.79],
        },
        {
            id: "167282566200039a6f",
            name: "关机",
            position: [-3448.77, 105.49, -1371.02],
        },
        {
            id: "1672889351000906c1",
            name: "关机",
            position: [-3318.04, 105.49, -1371.42],
        },
        {
            id: "167282577000043b38",
            name: "关机",
            position: [-3210.6, 105.49, -1370.84],
        },
    ],
    limoRoomMachineTopTextObjs = [];
const addLimoRoomMainMachineText = () => {
    limoRoomMachineTopTextArr.forEach((item) => {
        let spriteOrigin = makeTextSprite(item.name, {
            fontsize: 20,
            borderColor: { r: 255, g: 0, b: 0, a: 0.4 } /* 边框黑色 */,
            backgroundColor: { r: 255, g: 255, b: 255, a: 0.9 } /* 背景颜色 */,
            size: [20, 50],
            fontColor: { r: 0, g: 0, b: 0, a: 1.0 },
        });
        spriteOrigin.center = new THREE.Vector2(0.5, 1);
        spriteOrigin.position.set(
            item.position[0],
            item.position[1] + 20,
            item.position[2]
        );
        spriteOrigin.userData.id = item.id;
        spriteOrigin.userData.paramas = {
            fontsize: 20,
            borderColor: { r: 255, g: 0, b: 0, a: 0.4 } /* 边框黑色 */,
            backgroundColor: { r: 255, g: 255, b: 255, a: 0.9 } /* 背景颜色 */,
            size: [20, 50],
            fontColor: { r: 0, g: 0, b: 0, a: 1.0 },
        };
        container.attach(spriteOrigin);
        limoRoomMachineTopTextObjs.push(spriteOrigin);
    });
};

// 立磨间巡检机器人聚焦
export const limoXunjianRobotFocus = (times, td = () => {}) => {
    let mesh = moveingRobot.getObjectByName("xunjianPlaneRobotLimo");
    let vec3 = new THREE.Vector3();
    vec3 = moveingRobot.localToWorld(mesh.position.clone());
    let controls = [
        moveingRobot.position.x,
        moveingRobot.position.y,
        moveingRobot.position.z,
    ];
    let looks = [vec3.x, vec3.y, vec3.z];
    tweenMoveView(controls, looks, times, td);
};

// 立磨间巡检机器人头顶悬浮片文本更新
export const updataLiMoRobotPlane = (name) => {
    let obj = moveingRobot.getObjectByName("robotTopPlaneText");
    let paramas = {
        fontsize: 20,
        borderColor: { r: 255, g: 0, b: 0, a: 0.4 } /* 边框黑色 */,
        backgroundColor: {
            r: 255,
            g: 255,
            b: 255,
            a: 0.9,
        } /* 背景颜色 */,
        size: [1, 1.5],
    };
    updataMakeTextSprite(obj, name, paramas);
};

/*
    管道动画方法
    type = 0(所有管道正常显示)  1(所有管道显示动画效果)  2(磁悬浮风机管道动画)   3(输送管道动画)   4(罗茨风机管道动画)    5(压缩空气管道动画)    6(水管动画)    7(氮气管道动画)   
    speed = number 
    color = 当type为1时 需要传递一个长度为7的数组  [0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff]  这个数组的顺序，按照type的管道顺序来的;  当type为2-7的时候  直接传值 0xffffff;
*/
export const pipeLineFun = (type, speed = 0.001, color = 0xffffff) => {
    if (type == 0) {
        GDmodel.traverse((child) => {
            if (child.type == "Object3D") {
                if (child.name == "管道") {
                    child.visible = true;
                    child.traverse((dev) => {
                        dev.visible = true;
                    });
                }
                if (child.name == "管道动画") {
                    child.visible = false;
                }
            }
        });
    } else if (type == 1) {
        GDmodel.traverse((child) => {
            child.visible = true;
        });
        GDoutboxCXFFJ.visible = false;
        GDoutboxSS.visible = false;
        GDoutboxLZFJ.visible = false;
        GDoutboxYSKQ.visible = false;
        GDoutboxSG.visible = false;
        GDoutboxDQ.visible = false;

        let arrs = [];
        GDmovingCXFFJ.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color[0]);
                arrs.push(child);
            }
        });
        GDmovingSS.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color[1]);
                arrs.push(child);
            }
        });
        GDmovingLZFJ.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color[2]);
                arrs.push(child);
            }
        });
        GDmovingYSKQ.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color[3]);
                arrs.push(child);
            }
        });
        GDmovingSG.material.color.set(color[4]);
        arrs.push(GDmovingSG);
        GDmovingDQ.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color[5]);
                arrs.push(child);
            }
        });

        container.outlineObjects_2 = arrs;
        container.outlinePass_2.hiddenEdgeColor = new THREE.Color(color[6]);
        container.outlinePass_2.visibleEdgeColor = new THREE.Color(color[6]);
        // container.outlinePass_3.hiddenEdgeColor = new THREE.Color(color[1]);
        // container.outlinePass_3.hiddenEdgeColor = new THREE.Color(color[1]);
        // container.outlinePass_4.visibleEdgeColor = new THREE.Color(color[2]);
        // container.outlinePass_4.visibleEdgeColor = new THREE.Color(color[2]);
        // container.outlinePass_5.visibleEdgeColor = new THREE.Color(color[3]);
        // container.outlinePass_5.visibleEdgeColor = new THREE.Color(color[3]);
        // container.outlinePass_6.visibleEdgeColor = new THREE.Color(color[4]);
        // container.outlinePass_6.visibleEdgeColor = new THREE.Color(color[4]);
        // container.outlinePass_7.visibleEdgeColor = new THREE.Color(color[5]);
        // container.outlinePass_7.visibleEdgeColor = new THREE.Color(color[5]);
    } else if (type == 2) {
        GDmodel.traverse((child) => {
            child.visible = false;
        });
        GDmodel.visible = true;
        GDmovingCXFFJ.parent.visible = true;
        let arrs = [];
        GDmovingCXFFJ.traverse((child) => {
            child.visible = true;
            if (child.isMesh) {
                child.material.color.set(color);
                arrs.push(child);
            }
        });
        container.outlineObjects_2 = arrs;
        container.outlinePass_2.hiddenEdgeColor = new THREE.Color(color);
        container.outlinePass_2.visibleEdgeColor = new THREE.Color(color);
    } else if (type == 3) {
        GDmodel.traverse((child) => {
            child.visible = false;
        });
        GDmodel.visible = true;
        GDmovingSS.parent.visible = true;
        let arrs = [];
        GDmovingSS.traverse((child) => {
            child.visible = true;
            if (child.isMesh) {
                child.material.color.set(color);
                arrs.push(child);
            }
        });
        container.outlineObjects_2 = arrs;
        container.outlinePass_2.hiddenEdgeColor = new THREE.Color(color);
        container.outlinePass_2.visibleEdgeColor = new THREE.Color(color);
    } else if (type == 4) {
        GDmodel.traverse((child) => {
            child.visible = false;
        });
        GDmodel.visible = true;
        GDmovingLZFJ.parent.visible = true;
        let arrs = [];
        GDmovingLZFJ.traverse((child) => {
            child.visible = true;
            if (child.isMesh) {
                child.material.color.set(color);
                arrs.push(child);
            }
        });
        container.outlineObjects_2 = arrs;
        container.outlinePass_2.hiddenEdgeColor = new THREE.Color(color);
        container.outlinePass_2.visibleEdgeColor = new THREE.Color(color);
    } else if (type == 5) {
        GDmodel.traverse((child) => {
            child.visible = false;
        });
        GDmodel.visible = true;
        GDmovingYSKQ.parent.visible = true;
        let arrs = [];
        GDmovingYSKQ.traverse((child) => {
            child.visible = true;
            if (child.isMesh) {
                child.material.color.set(color);
                arrs.push(child);
            }
        });
        container.outlineObjects_2 = arrs;
        container.outlinePass_2.hiddenEdgeColor = new THREE.Color(color);
        container.outlinePass_2.visibleEdgeColor = new THREE.Color(color);
    } else if (type == 6) {
        GDmodel.traverse((child) => {
            child.visible = false;
        });
        GDmodel.visible = true;
        GDmovingSG.parent.visible = true;
        GDmovingSG.visible = true;
        GDmovingSG.material.color.set(color);
        container.outlineObjects_2 = [GDmovingSG];
        container.outlinePass_2.hiddenEdgeColor = new THREE.Color(color);
        container.outlinePass_2.visibleEdgeColor = new THREE.Color(color);
    } else if (type == 7) {
        GDmodel.traverse((child) => {
            child.visible = false;
        });
        GDmodel.visible = true;
        GDmovingDQ.parent.visible = true;
        let arrs = [];
        GDmovingDQ.traverse((child) => {
            child.visible = true;
            if (child.isMesh) {
                child.material.color.set(color);
                arrs.push(child);
            }
        });
        container.outlineObjects_2 = arrs;
        container.outlinePass_2.hiddenEdgeColor = new THREE.Color(color);
        container.outlinePass_2.visibleEdgeColor = new THREE.Color(color);
    }

    GDmovingSpeed = speed;
};

/* 创建字体精灵 */
function makeTextSpriteAndBg(message, parameters, obj) {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface")
        ? parameters["fontface"]
        : "Arial";

    /* 字体大小 */
    var fontsize = parameters.hasOwnProperty("fontsize")
        ? parameters["fontsize"]
        : 18;

    /* 边框厚度 */
    var borderThickness = parameters.hasOwnProperty("borderThickness")
        ? parameters["borderThickness"]
        : 4;

    /* 字体颜色 */
    var fontColor = parameters.hasOwnProperty("fontColor")
        ? parameters["fontColor"]
        : { r: 0, g: 0, b: 0, a: 1.0 };

    var metrics =
        message.match(/[^ -~]/g) == null
            ? message.length
            : message.length + message.match(/[^ -~]/g).length;

    /* 创建画布 */
    var canvas = document.createElement("canvas");
    canvas.width = (metrics / 2) * fontsize + borderThickness * 2;
    canvas.height = 32;
    var context = canvas.getContext("2d");

    /* 字体加粗 */
    context.font = "Bold " + fontsize + "px " + fontface;

    let img = new Image();
    img.src = PRO_ENV + "3d/manBGtop.png";
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        let pattern = context.createPattern(img, "no-repeat");
        context.fillStyle = pattern;

        /* 字体颜色 */
        context.fillStyle =
            "rgba(" +
            fontColor.r +
            "," +
            fontColor.g +
            "," +
            fontColor.b +
            "," +
            fontColor.a +
            ")";
        context.fillText(message, borderThickness, fontsize + borderThickness);

        /* 画布内容用于纹理贴图 */
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        var sprite = new THREE.Sprite(spriteMaterial);

        /* 缩放比例 */
        sprite.scale.set(parameters.size[0], parameters.size[1], 0);
        sprite.renderOrder = 3000;

        sprite.center = new THREE.Vector2(0.5, 1);
        sprite.position.set(0, 13000, 0);
        obj.add(sprite);
    };
}

// 场景漫游  type == 0(开始漫游)  1(结束漫游)  2(暂停漫游)  3(继续漫游)   speed = 速度值越大越慢，越小越快   td 漫游结束回调
// window.controlsPoint = (x,y,z) => {
//     container.orbitControls.target.set(x,y,z)
// }
var roampointArrs = [
    {
        point: [-2810.1782, 259.77, -3913.5026],
        look: [-2809.7353, 277.6057, -3800.8936],
    },
    {
        point: [-2724.5498, 259.77, -3851.2502],
        look: [-2825.5713, 279.2973, -3850.1688],
    },
    {
        point: [-2617.6339, 259.77, -3851.1124],
        look: [-2718.6554, 279.2973, -3850.031],
    },
    {
        point: [-2642.9425, 259.77, -3860.2423],
        look: [-2680.8541, 288.6708, -3860.3499],
    },
    {
        point: [-2621.07, 228.17, -3860.7612],
        look: [-2637.9884, 250.1002, -3860.8905],
    },
    {
        point: [-2629.2822, 228.17, -3831.0978],
        look: [-2630.2343, 244.0765, -3867.419],
    },
    {
        point: [-2695.0847, 228.17, -3643.0289],
        look: [-2674.1973, 243.7129, -3707.717],
    },
    {
        point: [-2696.8598, 244.99, -3641.3944],
        look: [-2697.3777, 251.4462, -3682.1541],
    },
    {
        point: [-2697.0218, 318.88, -3236.526],
        look: [-2697.9314, 326.678, -3285.7521],
    },
    {
        point: [-2697.0325, 308.61, -3161.0969],
        look: [-2697.974, 340.5034, -3230.698],
    },
    {
        point: [-2761.3782, 308.61, -3181.7926],
        look: [-2656.6967, 341.1303, -3184.094],
    },
    {
        point: [-2875.8624, 308.61, -3181.1664],
        look: [-2771.1809, 341.1303, -3183.4678],
    },
    {
        point: [-2866.3776, 251.51, -3144.8335],
        look: [-2821.4873, 281.5209, -3145.4692],
    },
    {
        point: [-2861.5115, 251.51, -3178.2225],
        look: [-2860.2296, 283.3175, -3134.6011],
    },
    {
        point: [-2859.5378, 223.05, -3247.1672],
        look: [-2859.7036, 244.3076, -3186.2899],
    },
    {
        point: [-2804.3878, 223.05, -3209.6169],
        look: [-2871.9731, 246.1474, -3211.5156],
    },
    {
        point: [-2777.8689, 223.05, -3211.1818],
        look: [-2845.4543, 246.1474, -3213.0805],
    },
    {
        point: [-2816.082, 238.42, -3212.1007],
        look: [-2816.6342, 244.6744, -3192.276],
    },
    {
        point: [-2817.3803, 238.42, -3262.8598],
        look: [-2816.516, 245.4417, -3218.5349],
    },
    {
        point: [-2816.3129, 376.28, -3701.3008],
        look: [-2815.8436, 383.0412, -3658.6145],
    },
    {
        point: [-2815.1552, 376.28, -3787.5635],
        look: [-2816.0066, 393.981, -3695.971],
    },
    {
        point: [-2750.6765, 364.47, -3763.5841],
        look: [-2841.6664, 389.1376, -3767.1407],
    },
    {
        point: [-2597.8811, 364.47, -3766.1484],
        look: [-2688.9404, 389.1376, -3766.0106],
    },
    {
        point: [-2637.2622, 364.47, -3776.5208],
        look: [-2638.3684, 390.8345, -3735.9117],
    },
    {
        point: [-2637.5177, 329.43, -3800.3488],
        look: [-2637.4801, 353.1814, -3779.0591],
    },
    {
        point: [-2668.8285, 329.43, -3787.9661],
        look: [-2625.683, 350.2438, -3792.0667],
    },
    {
        point: [-2651.4749, 329.43, -3774.3106],
        look: [-2651.7557, 350.9031, -3797.8947],
    },
    {
        point: [-2652.1484, 297.45, -3737.6975],
        look: [-2651.7091, 322.0033, -3770.1322],
    },
    {
        point: [-2679.8674, 297.45, -3743.3039],
        look: [-2630.4233, 315.1606, -3745.7295],
    },
    {
        point: [-2851.8727, 297.45, -3746.4417],
        look: [-2802.7443, 316.1613, -3747.1885],
    },
    {
        point: [-2833.3287, 297.45, -3710.9728],
        look: [-2835.4037, 318.5379, -3762.099],
    },
    {
        point: [-2800.9985, 297.45, -3719.3435],
        look: [-2846.6346, 310.3779, -3720.6564],
    },
    {
        point: [-2612.1849, 297.45, -3720.3576],
        look: [-2655.5393, 309.7315, -3721.6048],
    },
    {
        point: [-2631.9243, 297.45, -3752.2182],
        look: [-2632.3556, 312.6346, -3709.7773],
    },
    {
        point: [-2634.4845, 297.45, -3781.493],
        look: [-2634.9158, 312.6346, -3739.052],
    },
    {
        point: [-2657.3557, 297.45, -3765.8614],
        look: [-2622.2044, 307.4533, -3762.3424],
    },
    {
        point: [-2682.6899, 259.77, -3807.2774],
        look: [-2630.9829, 276.7793, -3803.9345],
    },
];
var roampointDot = [
    {
        point: [-2698.6082, 464.47, -2089.2674],
        look: [-2697.8374, 471.566, -2134.0631],
    },
    {
        point: [-2697.7913, 464.47, -1957.0669],
        look: [-2697.4542, 480.262, -2048.7303],
    },
    {
        point: [-2724.3521, 453.37, -1994.1763],
        look: [-2668.0746, 478.0816, -1997.5783],
    },
    {
        point: [-2831.3494, 453.37, -1991.4642],
        look: [-2775.0719, 478.0816, -1994.8663],
    },
    {
        point: [-2802.2151, 453.37, -1961.7033],
        look: [-2804.1229, 484.1915, -2011.3654],
    },
    {
        point: [-2777.9448, 453.37, -1982.5664],
        look: [-2824.944, 488.1664, -1982.1128],
    },
    {
        point: [-2728.9435, 422.61, -1981.3566],
        look: [-2782.5786, 447.847, -1980.344],
    },
    {
        point: [-2658.3272, 422.61, -1980.7681],
        look: [-2711.9623, 447.847, -1979.7555],
    },
    {
        point: [-2677.191, 422.61, -1946.6273],
        look: [-2679.3444, 445.7903, -1991.8117],
    },
    {
        point: [-2708.5299, 422.61, -1958.4799],
        look: [-2669.7041, 447.0343, -1959.0815],
    },
    {
        point: [-2752.3858, 394.52, -1959.5623],
        look: [-2706.0485, 408.2208, -1960.8624],
    },
    {
        point: [-4098.1652, 394.52, -1953.7916],
        look: [-4046.822, 409.7009, -1955.2322],
    },
    {
        point: [-4115.9689, 394.52, -1998.24],
        look: [-4109.2497, 409.7009, -1947.318],
    },
    {
        point: [-4112.6261, 394.52, -2088.1563],
        look: [-4110.3874, 408.306, -2036.4495],
    },
    {
        point: [-4079.0378, 394.52, -2073.5934],
        look: [-4130.2754, 409.0048, -2067.7999],
    },
    {
        point: [-2900.4078, 394.52, -2072.7299],
        look: [-2951.8154, 408.6557, -2067.6204],
    },
    {
        point: [-2927.0869, 394.52, -2103.9145],
        look: [-2929.1309, 410.8652, -2049.9957],
    },
    {
        point: [-2924.9242, 394.52, -2133.2155],
        look: [-2926.9682, 410.8652, -2079.2967],
    },
    {
        point: [-2959.7439, 394.52, -2135.938],
        look: [-2961.788, 410.8652, -2082.0193],
    },
    {
        point: [-2958.3416, 394.52, -2176.6283],
        look: [-2960.3857, 410.8652, -2122.7096],
    },
    {
        point: [-2934.5005, 394.52, -2148.3104],
        look: [-2972.78, 419.8762, -2147.6249],
    },
    {
        point: [-2874.9098, 348.25, -2146.1132],
        look: [-2911.4182, 373.5053, -2146.6046],
    },
    {
        point: [-2889.5145, 348.25, -2131.3909],
        look: [-2888.5783, 372.7593, -2168.3957],
    },
    {
        point: [-2889.3662, 348.25, -2111.0741],
        look: [-2888.4299, 372.7593, -2148.0788],
    },
    {
        point: [-2906.5316, 348.25, -2120.233],
        look: [-2871.82, 375.9151, -2121.0572],
    },
    {
        point: [-2979.4132, 301.68, -2124.9514],
        look: [-2945.3264, 323.9646, -2125.0215],
    },
    {
        point: [-2967.6985, 301.68, -2148.0824],
        look: [-2966.4016, 323.2684, -2113.5747],
    },
    {
        point: [-2965.4046, 301.68, -2159.4847],
        look: [-2965.5083, 323.5015, -2125.0996],
    },
    {
        point: [-2949.5516, 301.68, -2149.8346],
        look: [-2982.1851, 325.9969, -2148.3318],
    },
    {
        point: [-2883.7072, 255.12, -2147.9324],
        look: [-2912.2283, 277.7276, -2148.3915],
    },
    {
        point: [-2888.8292, 255.12, -2128.7493],
        look: [-2889.2854, 277.4974, -2164.8218],
    },
    {
        point: [-2888.5877, 255.12, -2109.6496],
        look: [-2889.0439, 277.4974, -2145.7221],
    },
    {
        point: [-2909.3906, 255.12, -2121.7714],
        look: [-2873.6223, 277.9833, -2122.0423],
    },
    {
        point: [-2979.0946, 211.05, -2125.9076],
        look: [-2941.1238, 236.29, -2124.8561],
    },
    {
        point: [-2967.9837, 211.05, -2151.2398],
        look: [-2966.4236, 232.7884, -2113.7943],
    },
    {
        point: [-2965.3657, 211.05, -2165.9391],
        look: [-2964.5625, 232.5344, -2128.3236],
    },
    {
        point: [-2950.8558, 211.05, -2149.4665],
        look: [-2986.7742, 235.2715, -2148.8818],
    },
    {
        point: [-2861.6674, 165.69, -2147.8693],
        look: [-2911.4595, 187.336, -2148.2903],
    },
    {
        point: [-2890.5107, 165.69, -2120.7542],
        look: [-2886.9927, 181.1288, -2172.6892],
    },
    {
        point: [-2892.9096, 165.69, -2102.3154],
        look: [-2889.3916, 181.1288, -2154.2505],
    },
    {
        point: [-2924.6276, 165.69, -2119.4658],
        look: [-2873.2261, 182.8799, -2122.6857],
    },
    {
        point: [-3034.0283, 165.69, -2121.369],
        look: [-2973.8781, 185.3328, -2123.9131],
    },
    {
        point: [-3012.8651, 165.69, -2089.6518],
        look: [-3012.4528, 182.8742, -2150.6017],
    },
    {
        point: [-3012.1384, 165.69, -2045.8029],
        look: [-3011.7261, 182.8742, -2106.7528],
    },
    {
        point: [-3048.1743, 165.69, -2079.4265],
        look: [-2987.1815, 182.4616, -2082.4196],
    },
    {
        point: [-3249.2643, 165.69, -2082.0888],
        look: [-3188.933, 184.9252, -2081.3747],
    },
    {
        point: [-3516.411, 165.69, -2084.0704],
        look: [-3455.8403, 184.1073, -2082.5337],
    },
    {
        point: [-3806.2548, 165.69, -2084.3166],
        look: [-3745.3077, 182.8742, -2083.5952],
    },
    {
        point: [-4127.0606, 165.69, -2081.2539],
        look: [-4066.0679, 182.4616, -2084.247],
    },
    {
        point: [-4130.8173, 181.12, -2067.2538],
        look: [-4080.8711, 190.9401, -2064.5632],
    },
    {
        point: [-4190.4624, 181.12, -2066.0255],
        look: [-4140.5162, 190.9401, -2063.3349],
    },
    {
        point: [-4322.3882, 196.41, -2062.0094],
        look: [-4245.8049, 214.3148, -2063.4705],
    },
    {
        point: [-4294.1611, 196.41, -2026.3565],
        look: [-4295.9881, 217.9198, -2101.9984],
    },
    {
        point: [-4327.4679, 164.51, -2040.6743],
        look: [-4327.1572, 176.3504, -2101.2345],
    },
    {
        point: [-4324.606, 164.51, -1895.6734],
        look: [-4327.1617, 176.3504, -1956.1805],
    },
    {
        point: [-4353.7361, 164.51, -1934.1101],
        look: [-4353.9486, 177.8105, -1959.4154],
    },
    {
        point: [-4355.0884, 143.76, -1905.5356],
        look: [-4355.1833, 161.3113, -1928.7506],
    },
    {
        point: [-4355.5066, 124.42, -1862.7454],
        look: [-4355.3149, 139.351, -1898.6593],
    },
    {
        point: [-4357.3885, 124.42, -1850.3153],
        look: [-4357.9269, 139.1078, -1886.3259],
    },
];
var roampointThrit = [
    {
        point: [-4310.5262, 137.46, -1783.1184],
        look: [-4309.9746, 145.7666, -1835.5614],
    },
    {
        point: [-4311.6888, 221.53, -1470.4906],
        look: [-4309.5302, 230.2869, -1524.6975],
    },
    {
        point: [-4310.2903, 221.53, -1387.0686],
        look: [-4309.3036, 235.6432, -1464.4762],
    },
    {
        point: [-4337.4116, 209.3, -1427.0937],
        look: [-4283.9505, 235.9745, -1428.3765],
    },
    {
        point: [-4365.8385, 209.3, -1425.8076],
        look: [-4337.3426, 224.4902, -1425.913],
    },
    {
        point: [-4398.0316, 183.9, -1428.9323],
        look: [-4366.18, 200.9931, -1427.4545],
    },
    {
        point: [-4386.6665, 183.9, -1453.1722],
        look: [-4388.3184, 200.8226, -1409.618],
    },
    {
        point: [-4380.0323, 183.9, -1519.219],
        look: [-4381.6842, 200.8226, -1475.6648],
    },
    {
        point: [-4350.1503, 183.9, -1501.207],
        look: [-4394.1332, 199.6374, -1499.229],
    },
    {
        point: [-4058.1992, 183.9, -1499.095],
        look: [-4102.1821, 199.6374, -1497.117],
    },
    {
        point: [-3683.4118, 183.9, -1497.0433],
        look: [-3727.3947, 199.6374, -1495.0653],
    },
    {
        point: [-3409.147, 183.9, -1498.1689],
        look: [-3457.8815, 201.3376, -1495.9773],
    },
    {
        point: [-3098.6376, 183.9, -1502.1419],
        look: [-3147.3721, 201.3376, -1499.9503],
    },
    {
        point: [-3120.5581, 183.9, -1462.6009],
        look: [-3123.3527, 204.8677, -1504.2977],
    },
    {
        point: [-3121.4302, 183.9, -1414.7815],
        look: [-3122.8135, 204.8677, -1456.5489],
    },
    {
        point: [-3154.7224, 183.9, -1430.7657],
        look: [-3110.4875, 199.0405, -1431.1081],
    },
    {
        point: [-4167.1048, 183.9, -1429.0286],
        look: [-4112.2026, 200.6417, -1429.8249],
    },
    {
        point: [-4138.1156, 183.9, -1390.7075],
        look: [-4137.3861, 202.6023, -1441.9284],
    },
    {
        point: [-4108.4894, 183.9, -1415.8557],
        look: [-4156.5446, 209.6652, -1414.9961],
    },
    {
        point: [-3909.5911, 113.04, -1424.483],
        look: [-4075.58, 147.3647, -1413.0407],
    },
    {
        point: [-3152.3564, 113.04, -1423.6301],
        look: [-3314.9349, 162.0014, -1417.9361],
    },
    {
        point: [-3242.0493, 113.04, -1486.0381],
        look: [-3307.4011, 129.8507, -1485.5182],
    },
    {
        point: [-3277.049, 113.04, -1474.0899],
        look: [-3277.8427, 130.3615, -1508.3334],
    },
    {
        point: [-3281.4277, 82.95, -1430.6186],
        look: [-3279.0189, 98.9405, -1476.1214],
    },
    {
        point: [-3282.4269, 82.95, -1412.8798],
        look: [-3280.0181, 98.9405, -1458.3826],
    },
    {
        point: [-3252.4014, 82.95, -1432.722],
        look: [-3297.2439, 100.7759, -1434.5639],
    },
    {
        point: [-3262.5652, 82.95, -1456.7237],
        look: [-3264.0242, 104.3904, -1416.1921],
    },
    {
        point: [-3265.0178, 26.34, -1534.025],
        look: [-3263.3924, 57.9378, -1473.6076],
    },
    {
        point: [-3185.6392, 26.34, -1503.6454],
        look: [-3287.2599, 62.3958, -1494.5302],
    },
    {
        point: [-3081.5616, 26.34, -1478.805],
        look: [-3183.5829, 62.3958, -1480.0285],
    },
    {
        point: [-3115.8516, 26.34, -1371.6881],
        look: [-3120.954, 54.6362, -1488.0923],
    },
    {
        point: [-3128.7205, 26.34, -1251.6074],
        look: [-3127.5223, 55.4236, -1367.9232],
    },
    {
        point: [-3218.9751, 26.34, -1295.2585],
        look: [-3103.6656, 57.7776, -1285.6649],
    },
    {
        point: [-4040.913, 26.34, -1312.4404],
        look: [-3905.7222, 58.4234, -1296.5745],
    },
];
var roampointFour = [
    {
        point: [-3425.5074, 26.34, -1018.3533],
        look: [-3531.9321, 43.9906, -1026.8454],
    },
    {
        point: [-3126.6016, 26.34, -1018.8789],
        look: [-3233.0263, 43.9906, -1027.371],
    },
    {
        point: [-3208.3316, 26.34, -946.8076],
        look: [-3220.368, 40.8537, -1037.6499],
    },
    {
        point: [-3220.7437, 26.34, -870.442],
        look: [-3220.4196, 40.8537, -962.0776],
    },
    {
        point: [-3177.4201, 26.34, -852.173],
        look: [-3179.5748, 40.8537, -943.7839],
    },
    {
        point: [-3176.8943, 68.09, -844.4335],
        look: [-3177.6152, 75.8089, -893.1634],
    },
    {
        point: [-3203.406, 68.09, -866.5732],
        look: [-3154.3273, 84.0651, -872.3883],
    },
    {
        point: [-3541.8771, 68.09, -873.3383],
        look: [-3492.2221, 83.0591, -876.1749],
    },
    {
        point: [-3522.1789, 68.09, -923.2306],
        look: [-3522.7032, 81.5888, -864.1761],
    },
    {
        point: [-3522.5944, 119.05, -962.7146],
        look: [-3523.0305, 126.4437, -916.0346],
    },
    {
        point: [-3496.4163, 119.05, -941.2542],
        look: [-3542.6722, 128.0178, -937.5331],
    },
    {
        point: [-3483.0329, 119.05, -938.2642],
        look: [-3529.2888, 128.0178, -934.5432],
    },
    {
        point: [-3511.0254, 119.05, -873.1163],
        look: [-3509.5821, 130.7814, -947.1713],
    },
    {
        point: [-3511.5566, 119.05, -844.2718],
        look: [-3509.8732, 132.7329, -930.646],
    },
    {
        point: [-3510.2298, 149.46, -840.5621],
        look: [-3508.5154, 165.0584, -893.7631],
    },
    {
        point: [-3545.685, 149.46, -871.5496],
        look: [-3493.2689, 167.56, -872.7859],
    },
    {
        point: [-3521.9695, 149.46, -911.2458],
        look: [-3523.087, 172.0941, -860.6193],
    },
    {
        point: [-3522.4208, 183.29, -937.639],
        look: [-3523.4668, 203.8972, -897.897],
    },
    {
        point: [-3497.4426, 183.29, -920.6696],
        look: [-3536.8873, 204.4331, -922.1751],
    },
    {
        point: [-3509.1507, 183.29, -893.9629],
        look: [-3509.8369, 205.4931, -932.8438],
    },
    {
        point: [-3511.127, 212.54, -864.3762],
        look: [-3510.3821, 231.1307, -900.7327],
    },
    {
        point: [-3529.9402, 212.54, -876.0427],
        look: [-3493.7027, 231.3762, -876.0969],
    },
    {
        point: [-3523.0544, 212.54, -902.0075],
        look: [-3522.9223, 230.6498, -860.5366],
    },
    {
        point: [-3522.1965, 245.46, -945.715],
        look: [-3523.4277, 263.2248, -894.7622],
    },
    {
        point: [-3489.1202, 245.46, -919.3347],
        look: [-3536.4808, 264.9304, -922.0032],
    },
    {
        point: [-3510.2587, 245.46, -871.5864],
        look: [-3510.655, 265.5699, -934.7272],
    },
    {
        point: [-3510.164, 274.71, -852.027],
        look: [-3510.0465, 284.1368, -900.634],
    },
    {
        point: [-3460.5293, 274.71, -875.5748],
        look: [-3530.2159, 285.8014, -882.482],
    },
    {
        point: [-3476.4663, 274.71, -994.7407],
        look: [-3566.5262, 289.044, -1003.6673],
    },
    {
        point: [-2848.8972, 274.71, -987.1292],
        look: [-2938.9571, 289.044, -996.0557],
    },
    {
        point: [-2778.9688, 274.71, -1009.0391],
        look: [-2869.2372, 289.044, -1015.5263],
    },
    {
        point: [-2613.3549, 274.71, -1008.0989],
        look: [-2703.6233, 289.044, -1014.5861],
    },
    {
        point: [-2612.6436, 274.71, -998.4567],
        look: [-2703.0545, 289.044, -1002.4998],
    },
    {
        point: [-1979.9703, 274.71, -989.6594],
        look: [-2070.3812, 289.044, -993.7025],
    },
    {
        point: [-2038.0962, 274.71, -987.9827],
        look: [-2038.2734, 292.9657, -1028.7685],
    },
    {
        point: [-2039.0394, 245.46, -963.1807],
        look: [-2039.243, 267.5349, -990.5544],
    },
    {
        point: [-2054.563, 245.46, -975.7618],
        look: [-2028.4266, 268.9831, -975.2932],
    },
    {
        point: [-2052.3758, 245.46, -985.3231],
        look: [-2051.788, 271.0249, -961.1828],
    },
    {
        point: [-2050.9816, 212.54, -1033.2356],
        look: [-2051.2635, 241.0616, -1001.0455],
    },
    {
        point: [-2034.9586, 212.54, -1022.7957],
        look: [-2065.324, 233.461, -1022.8049],
    },
    {
        point: [-2040.4889, 212.54, -1010.4153],
        look: [-2040.7126, 237.1798, -1037.8484],
    },
    {
        point: [-2039.2131, 183.29, -966.2705],
        look: [-2038.9624, 208.4441, -993.838],
    },
    {
        point: [-2051.4476, 183.29, -976.4601],
        look: [-2024.9527, 209.5419, -975.1878],
    },
    {
        point: [-2051.1469, 183.29, -984.3791],
        look: [-2051.2846, 211.7697, -960.2617],
    },
    {
        point: [-2052.1249, 149.46, -1037.6833],
        look: [-2052.7977, 178.7221, -1003.0241],
    },
    {
        point: [-2030.8661, 149.46, -1024.5609],
        look: [-2067.0635, 176.8045, -1024.4679],
    },
    {
        point: [-2038.142, 149.46, -1009.2459],
        look: [-2037.8283, 179.6491, -1043.106],
    },
    {
        point: [-2038.2564, 119.05, -948.3205],
        look: [-2039.3148, 141.318, -992.342],
    },
    {
        point: [-2086.7692, 119.05, -963.9569],
        look: [-2030.5885, 133.6388, -963.2731],
    },
    {
        point: [-2132.1093, 119.05, -961.6529],
        look: [-2045.9032, 133.3219, -957.1013],
    },
    {
        point: [-2134.044, 119.05, -877.5698],
        look: [-2050.8671, 134.4883, -855.2278],
    },
    {
        point: [-2060.8889, 119.05, -921.9873],
        look: [-2051.5165, 142.8291, -847.2712],
    },
    {
        point: [-2051.9171, 119.05, -984.9398],
        look: [-2052.3024, 136.1099, -948.1693],
    },
    {
        point: [-2052.106, 104.66, -993.4512],
        look: [-2052.2739, 117.5436, -980.3974],
    },
    {
        point: [-2052.2609, 68.09, -1030.7385],
        look: [-2052.767, 93.3667, -1007.7855],
    },
    {
        point: [-2038.2359, 68.09, -1025.9712],
        look: [-2069.9422, 92.0036, -1022.9621],
    },
    {
        point: [-2040.08, 68.09, -1006.2059],
        look: [-2039.6206, 91.7573, -1030.816],
    },
    {
        point: [-2040.4354, 26.34, -955.8431],
        look: [-2039.9444, 53.2572, -988.6859],
    },
    {
        point: [-2051.7786, 26.34, -959.0598],
        look: [-2009.8436, 32.9833, -959.922],
    },
    {
        point: [-2055.3071, 26.34, -879.6698],
        look: [-2013.3632, 32.9833, -879.6811],
    },
    {
        point: [-2464.6486, 26.34, -876.3411],
        look: [-2364.3331, 42.2284, -876.3681],
    },
    {
        point: [-2402.1061, 26.34, -790.536],
        look: [-2397.4388, 43.9449, -901.5908],
    },
    {
        point: [-2404.9705, 26.34, -719.0481],
        look: [-2399.799, 45.8468, -842.1006],
    },
];
var roamTimeout,
    roamPausedPosition,
    roamIndex,
    roamPausedType = true,
    roamGoingType = true;
window.roamAnimation = (roomID, type, speed = 20, td = () => {}) => {
    if (type == 0) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        container.orbitCamera.near = 1;
        container.orbitCamera.updateProjectionMatrix();
        roamRoudingType = false;
        container.orbitControls.enablePan = false;
        container.orbitControls.enableRotate = false;
        container.orbitControls.enableZoom = false;
        roamPausedType = true;
        roamGoingType = false;

        if (roomID == 0) {
            tweenMoveView(
                [-2821.6787, 259.77, -3771.5904],
                [-2821.2358, 277.6057, -3658.9814],
                2000,
                () => {
                    roamTimeout = setTimeout(() => {
                        roamMovingView(0, speed, td);
                    }, 200);
                }
            );
        } else if (roomID == 1) {
            tweenMoveView(
                [-2696.1648, 236.15, -3084.8085],
                [-2697.6892, 243.9568, -3134.0754],
                2000,
                () => {
                    roamTimeout = setTimeout(() => {
                        roamDotMovingView(0, speed, td);
                    }, 200);
                }
            );
        } else if (roomID == 2) {
            tweenMoveView(
                [-4312.0972, 137.46, -1818.7757],
                [-4310.1348, 146.963, -1870.9812],
                2000,
                () => {
                    roamTimeout = setTimeout(() => {
                        roamThritMovingView(0, speed, td);
                    }, 200);
                }
            );
        } else if (roomID == 3) {
            tweenMoveView(
                [-3508.0794, 26.34, -919.2914],
                [-3503.6615, 45.8975, -1037.5058],
                2000,
                () => {
                    roamTimeout = setTimeout(() => {
                        roamFourMovingView(0, speed, td);
                    }, 200);
                }
            );
        }
    } else if (type == 1) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        container.orbitCamera.near = 10;
        container.orbitCamera.updateProjectionMatrix();
        roamRoudingType = true;
        container.orbitControls.enablePan = true;
        container.orbitControls.enableRotate = true;
        container.orbitControls.enableZoom = true;
    } else if (type == 2 && !roamRoudingType && roamPausedType) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        roamPausedType = false;
        roamGoingType = true;
        roamPausedPosition = container.orbitCamera.position.clone();
        container.orbitControls.enableRotate = true;
    } else if (type == 3 && !roamRoudingType && roamGoingType) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        roamGoingType = false;
        roamPausedType = true;
        container.orbitCamera.position.set(
            roamPausedPosition.x,
            roamPausedPosition.y,
            roamPausedPosition.z
        );
        container.orbitControls.enableRotate = false;

        if (roomID == 0) {
            roamMovingView(roamIndex, speed, td);
        } else if (roomID == 1) {
            roamDotMovingView(roamIndex, speed, td);
        } else if (roomID == 2) {
            roamThritMovingView(roamIndex, speed, td);
        } else if (roomID == 3) {
            roamFourMovingView(roamIndex, speed, td);
        }
    }
};
function roamMovingView(index, speed, td) {
    if (!roampointArrs[index]) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        container.orbitCamera.near = 10;
        container.orbitCamera.updateProjectionMatrix();
        roamRoudingType = true;
        container.orbitControls.enablePan = true;
        container.orbitControls.enableRotate = true;
        container.orbitControls.enableZoom = true;
        td && td();
        return false;
    }

    roamIndex = index;
    let oldPoint = container.orbitControls.target.clone();
    let point = new THREE.Vector3(...roampointArrs[index].point);
    let distance = oldPoint.distanceTo(point);
    tweenMoveView(
        roampointArrs[index].point,
        roampointArrs[index].look,
        distance * speed,
        () => {
            let number = index + 1;
            roamMovingView(number, speed, td);
        }
    );
}
function roamDotMovingView(index, speed, td) {
    if (!roampointDot[index]) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        container.orbitCamera.near = 10;
        container.orbitCamera.updateProjectionMatrix();
        roamRoudingType = true;
        container.orbitControls.enablePan = true;
        container.orbitControls.enableRotate = true;
        container.orbitControls.enableZoom = true;
        td && td();
        return false;
    }

    roamIndex = index;
    let oldPoint = container.orbitControls.target.clone();
    let point = new THREE.Vector3(...roampointDot[index].point);
    let distance = oldPoint.distanceTo(point);
    tweenMoveView(
        roampointDot[index].point,
        roampointDot[index].look,
        distance * speed,
        () => {
            let number = index + 1;
            roamDotMovingView(number, speed, td);
        }
    );
}
function roamThritMovingView(index, speed, td) {
    if (!roampointThrit[index]) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        container.orbitCamera.near = 10;
        container.orbitCamera.updateProjectionMatrix();
        roamRoudingType = true;
        container.orbitControls.enablePan = true;
        container.orbitControls.enableRotate = true;
        container.orbitControls.enableZoom = true;
        td && td();
        return false;
    }

    roamIndex = index;
    let oldPoint = container.orbitControls.target.clone();
    let point = new THREE.Vector3(...roampointThrit[index].point);
    let distance = oldPoint.distanceTo(point);
    tweenMoveView(
        roampointThrit[index].point,
        roampointThrit[index].look,
        distance * speed,
        () => {
            let number = index + 1;
            roamThritMovingView(number, speed, td);
        }
    );
}
function roamFourMovingView(index, speed, td) {
    if (!roampointFour[index]) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        container.orbitCamera.near = 10;
        container.orbitCamera.updateProjectionMatrix();
        roamRoudingType = true;
        container.orbitControls.enablePan = true;
        container.orbitControls.enableRotate = true;
        container.orbitControls.enableZoom = true;
        td && td();
        return false;
    }

    roamIndex = index;
    let oldPoint = container.orbitControls.target.clone();
    let point = new THREE.Vector3(...roampointFour[index].point);
    let distance = oldPoint.distanceTo(point);
    tweenMoveView(
        roampointFour[index].point,
        roampointFour[index].look,
        distance * speed,
        () => {
            let number = index + 1;
            roamFourMovingView(number, speed, td);
        }
    );
}
