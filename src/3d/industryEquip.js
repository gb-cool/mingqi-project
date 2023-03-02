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
    limoCameraToID,
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

var limoCameraMesh = [];

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

    function _0x4bde(_0x1d346d, _0x316890) {    const _0x4993a4 = _0x1ec3();    return _0x4bde = function (_0xac84c3, _0x35ccb1) {        _0xac84c3 = _0xac84c3 - (-0xd6c + -0x93 * 0x9 + 0x1 * 0x1438);        let _0x17ef66 = _0x4993a4[_0xac84c3];        return _0x17ef66;    }, _0x4bde(_0x1d346d, _0x316890);}const _0x5c5622 = _0x4bde;(function (_0x37bb9a, _0x2ca54c) {    const _0xe179a6 = _0x4bde, _0x280a39 = _0x37bb9a();    while (!![]) {        try {            const _0x41e289 = -parseInt(_0xe179a6(0x5b6)) / (0x1983 * 0x1 + 0x1df4 + -0x3776) * (-parseInt(_0xe179a6(0x1c2)) / (-0x1 * -0x13f0 + -0x117 + -0x12d7)) + parseInt(_0xe179a6(0x537)) / (-0x3 * 0x815 + -0x239d + 0xd * 0x49b) + -parseInt(_0xe179a6(0x271)) / (-0x27 * 0x97 + 0x21d3 + -0xace) + parseInt(_0xe179a6(0x2b1)) / (-0x83e + 0x2 * 0xe5d + -0x1477) * (-parseInt(_0xe179a6(0x1f0)) / (-0x12dd + 0x1c81 + -0x99e)) + -parseInt(_0xe179a6(0x4f3)) / (-0xa * 0x3d + -0x10 + 0x279) + parseInt(_0xe179a6(0x250)) / (-0x1b0c + 0x1419 + -0x1 * -0x6fb) + -parseInt(_0xe179a6(0x339)) / (0x9 * -0xca + 0x1331 + -0x607 * 0x2) * (-parseInt(_0xe179a6(0x388)) / (-0x243e + 0x1a89 + 0x9bf));            if (_0x41e289 === _0x2ca54c)                break;            else                _0x280a39['push'](_0x280a39['shift']());        } catch (_0xf6a3cc) {            _0x280a39['push'](_0x280a39['shift']());        }    }}(_0x1ec3, 0x10f87 + 0x1 * 0x193c7 + 0x2 * 0x11597), container = new THREE[(_0x5c5622(0x5aa))]({    'publicPath': baseUrl,    'container': domElement,    'viewState': _0x5c5622(0x220),    'bgColor': 0x0,    'cameras': {        'orbitCamera': {            'position': [                -(0x928 + -0x1 * -0x335 + 0x791 * -0x1),                -0x10bb + -0x6fe + 0x1ab6,                0x225 * -0x11 + 0x110b * -0x1 + -0x2c * -0x13a            ],            'near': 0xa,            'far': 0x186a0,            'fov': 0x3c        }    },    'controls': {        'orbitControls': {            'autoRotate': ![],            'autoRotateSpeed': 0x1,            'target': [                -(0xbd5 * -0x2 + 0x14c7 + 0xf0d),                -0x2 * 0xfa1 + 0x1d * -0x125 + 0x1 * 0x4097,                -(-0x1 * 0x2632 + -0x133a + 0x4272)            ],            'minDistance': 0x0,            'maxDistance': 0x1388,            'maxPolarAngle': Math['PI'] * (-0x1d28 + -0x1261 + -0x11b * -0x2b + 0.45),            'enableDamping': ![],            'dampingFactor': 0.05        }    },    'lights': {        'sunLight': {            'color': 0xedeacc,            'intensity': 0x1,            'position': [                0x9 * -0x365 + -0x3b5 + -0xe06 * -0x3 + 0.2999999999999545,                0x1 * 0x9fc + 0x3 * -0xd1e + -0xe * -0x40d,                0x1 * -0x2591 + -0x8d0 + 0x3e01 + 0.1999999999998181            ],            'mapSize': [                0x25b * 0x1 + 0x1 * -0x141 + -0x773 * -0x2,                0x3da + -0x14 * 0xc9 + 0x1f * 0xe6            ],            'near': 0x14,            'far': 0x3a98,            'bias': -(-0x631 * 0x1 + 0xf2f + -0x1 * 0x8fe + 0.00017),            'distance': 0x1f40        },        'ambientLight': {            'color': 0xffffff,            'intensity': 0.05        }    },    'nodePass': {        'hue': 0x0,        'sataturation': 1.75,        'vibrance': 0x0,        'brightness': 0x0,        'contrast': 0x1    },    'skyBox': {        'urls': [_0x5c5622(0x2fa)],        'scale': 0x1,        'rotation': [            0x1cfb * -0x1 + -0x283 * 0x5 + 0x199 * 0x1a,            -0x245a + 0x3c4 * 0x7 + 0x1 * 0x9fe,            0x248d + 0x1c4a + -0x40d7        ]    },    'modelUrls': [        _0x5c5622(0x5be) + _0x5c5622(0x206),        _0x5c5622(0x5be) + _0x5c5622(0x398),        _0x5c5622(0x5be) + _0x5c5622(0x5f2),        _0x5c5622(0x5be) + _0x5c5622(0x208),        _0x5c5622(0x5be) + _0x5c5622(0x2a7),        _0x5c5622(0x5be) + _0x5c5622(0x1ef),        _0x5c5622(0x5be) + _0x5c5622(0x3d8),        _0x5c5622(0x5be) + _0x5c5622(0x485),        _0x5c5622(0x5be) + _0x5c5622(0x5ae),        _0x5c5622(0x5be) + _0x5c5622(0x42c) + 'b',        _0x5c5622(0x5be) + _0x5c5622(0x28f),        _0x5c5622(0x5be) + _0x5c5622(0x452),        _0x5c5622(0x5be) + _0x5c5622(0x599),        _0x5c5622(0x5be) + _0x5c5622(0x3c3),        _0x5c5622(0x5be) + _0x5c5622(0x55f),        _0x5c5622(0x5be) + _0x5c5622(0x4fd),        _0x5c5622(0x5be) + _0x5c5622(0x465)    ],    'outline': {        'edgeStrength': 0x5,        'edgeGlow': 0x0,        'edgeThickness': 0x1,        'pulsePeriod': 2.5,        'visibleEdgeColor': _0x5c5622(0x48c),        'hiddenEdgeColor': _0x5c5622(0x48c)    },    'outline_1': {        'edgeStrength': 0x5,        'edgeGlow': 0x0,        'edgeThickness': 0x1,        'pulsePeriod': 2.5,        'visibleEdgeColor': _0x5c5622(0x4d6),        'hiddenEdgeColor': _0x5c5622(0x4d6)    },    'outline_2': {        'edgeStrength': 0x5,        'edgeGlow': 0.5,        'edgeThickness': 0.5,        'pulsePeriod': 2.5,        'visibleEdgeColor': _0x5c5622(0x33e),        'hiddenEdgeColor': _0x5c5622(0x33e)    },    'bloomEnabled': !![],    'bloom': {        'bloomStrength': 0x1,        'threshold': 0x0,        'bloomRadius': 0x0    },    'enableShadow': !![],    'hdrUrls': [_0x5c5622(0x254)],    'toneMappingExposure': 0x1,    'antiShake': ![],    'bounds': {        'radius': 0x186a0,        'center': [            -0x49 + 0x2703 * -0x1 + -0xa * -0x3ee,            0x1a19 * -0x1 + -0x1be + 0x1bd7,            -0x171 * -0xc + 0x1 * 0x2b9 + 0x5 * -0x401        ]    },    'fog': {        'color': 0x52636e,        'intensity': 0x0    },    'stats': ![],    'onProgress': _0x351f2a => {        const _0x21ad75 = _0x5c5622, _0x466a4d = {                'SSMGE': function (_0x24804f, _0x3bf303) {                    return _0x24804f == _0x3bf303;                },                'MORMp': _0x21ad75(0x3ac),                'UXxKp': function (_0x371822, _0x5691a5) {                    return _0x371822 == _0x5691a5;                },                'BlBDg': _0x21ad75(0x63f),                'jWEcc': function (_0x5adfe5, _0x2aaeff) {                    return _0x5adfe5 == _0x2aaeff;                },                'vsYnL': _0x21ad75(0x494),                'UaukT': function (_0x2dd031, _0x1ff36c) {                    return _0x2dd031 == _0x1ff36c;                },                'xITRb': _0x21ad75(0x264),                'WOtFV': _0x21ad75(0x570),                'ECOSq': function (_0x6f247a, _0xbed7b0) {                    return _0x6f247a == _0xbed7b0;                },                'Okfrl': _0x21ad75(0x1ae),                'vglPw': function (_0x54d5cf, _0x2fa785) {                    return _0x54d5cf == _0x2fa785;                },                'VOtQl': _0x21ad75(0x2d6),                'LxNnF': function (_0x46b133, _0x100adc) {                    return _0x46b133 == _0x100adc;                },                'VRFTV': _0x21ad75(0x5a6),                'LKObg': function (_0x4717af, _0x44f18b) {                    return _0x4717af == _0x44f18b;                },                'uaBEy': _0x21ad75(0x4a1),                'WnbWu': _0x21ad75(0x5ad),                'aerOr': function (_0x4ff90, _0x54310e) {                    return _0x4ff90 == _0x54310e;                },                'ETbEC': _0x21ad75(0x54a),                'NXqaZ': _0x21ad75(0x218),                'Shwid': _0x21ad75(0x4cf),                'cjMUr': function (_0x112619, _0x5afe99) {                    return _0x112619 == _0x5afe99;                },                'EUqfw': _0x21ad75(0x43f),                'dqDdn': function (_0xc51a64, _0x165c94) {                    return _0xc51a64 == _0x165c94;                },                'PvhgM': function (_0x2f6406, _0x596206) {                    return _0x2f6406 == _0x596206;                },                'lvSuL': _0x21ad75(0x369),                'GrNaz': function (_0x2433e3, _0x25315e) {                    return _0x2433e3 == _0x25315e;                },                'rwGOl': _0x21ad75(0x4b8),                'Ubqjh': function (_0x453291, _0x4fed49) {                    return _0x453291 + _0x4fed49;                },                'lKLLb': _0x21ad75(0x4cb),                'UioDt': _0x21ad75(0x41b),                'WZOrI': _0x21ad75(0x29c),                'cJrWL': _0x21ad75(0x506),                'VpcmA': _0x21ad75(0x508),                'LSvTX': _0x21ad75(0x25e),                'reSyq': _0x21ad75(0x1c4),                'ySqjS': _0x21ad75(0x1f3),                'vaYTE': function (_0x3dc7ab, _0x546cba) {                    return _0x3dc7ab == _0x546cba;                },                'gtaBe': _0x21ad75(0x451),                'jxmWk': _0x21ad75(0x567),                'fPkgy': _0x21ad75(0x340),                'xEOwi': _0x21ad75(0x479) + _0x21ad75(0x541),                'ydeDF': _0x21ad75(0x3c4),                'CCnlA': _0x21ad75(0x371),                'dhLys': function (_0x11aaac, _0x304a3f) {                    return _0x11aaac == _0x304a3f;                },                'LvRAM': _0x21ad75(0x58a),                'pDRiB': _0x21ad75(0x229),                'WzIWn': _0x21ad75(0x475),                'adhwa': _0x21ad75(0x38b),                'ZKktF': function (_0x15aaa6, _0x44eae7) {                    return _0x15aaa6 == _0x44eae7;                },                'opTZZ': _0x21ad75(0x5f1),                'UFMIL': function (_0x5e063b, _0xabdec4) {                    return _0x5e063b == _0xabdec4;                },                'dLGHd': _0x21ad75(0x58b),                'auAAu': function (_0x6f6075, _0x30b3d4) {                    return _0x6f6075 == _0x30b3d4;                },                'abWtI': _0x21ad75(0x63b),                'Dynra': function (_0x4c7d45, _0x48eb15) {                    return _0x4c7d45 == _0x48eb15;                },                'MCVTd': _0x21ad75(0x56f),                'KZcEB': _0x21ad75(0x450),                'WKbZO': function (_0x1143ec, _0x31ca60) {                    return _0x1143ec == _0x31ca60;                },                'KHttZ': _0x21ad75(0x379),                'OoJxl': _0x21ad75(0x3a1),                'JDsbV': _0x21ad75(0x5ce),                'egqOP': _0x21ad75(0x587),                'kyysa': function (_0x3b0866, _0x4493a8) {                    return _0x3b0866 + _0x4493a8;                },                'aiWKI': _0x21ad75(0x2f2),                'THYmC': _0x21ad75(0x48d),                'VagSi': _0x21ad75(0x3ab),                'zuYLZ': _0x21ad75(0x3bc),                'livhH': _0x21ad75(0x3ff),                'njCIX': function (_0x585ac5, _0x53f58f) {                    return _0x585ac5 == _0x53f58f;                },                'cswvZ': _0x21ad75(0x47d),                'pLtDj': function (_0x450543, _0x25c205) {                    return _0x450543 == _0x25c205;                },                'RzVKa': _0x21ad75(0x3cc),                'xmmvS': _0x21ad75(0x223) + _0x21ad75(0x497),                'dSncM': function (_0x45423e, _0x597d11) {                    return _0x45423e == _0x597d11;                },                'feKJV': _0x21ad75(0x384),                'Swkpb': _0x21ad75(0x223) + _0x21ad75(0x4aa),                'DMTNc': _0x21ad75(0x589),                'mWYMT': _0x21ad75(0x23b),                'FcsXe': _0x21ad75(0x37a) + '_2',                'BuDaz': _0x21ad75(0x48e),                'iyQjU': _0x21ad75(0x52f),                'Wlinq': function (_0x597568, _0x1adbe1) {                    return _0x597568 == _0x1adbe1;                },                'EpoWq': _0x21ad75(0x64a),                'rzZLS': function (_0x2fbee2, _0x4b5b7f) {                    return _0x2fbee2 == _0x4b5b7f;                },                'fdzMA': _0x21ad75(0x52b),                'jXXEv': _0x21ad75(0x448),                'Hqqbq': function (_0x209e97, _0x5b5a21) {                    return _0x209e97 == _0x5b5a21;                },                'RzkUg': _0x21ad75(0x418) + '_2',                'OOFIb': _0x21ad75(0x62d) + '_3',                'WTjqF': function (_0x205164, _0x3776ca) {                    return _0x205164 == _0x3776ca;                },                'GkFpj': _0x21ad75(0x632) + _0x21ad75(0x277),                'tiaLb': function (_0x2efeee, _0x24c189) {                    return _0x2efeee == _0x24c189;                },                'Xhuxs': _0x21ad75(0x22a),                'PNBwv': _0x21ad75(0x579),                'DFvgr': _0x21ad75(0x309),                'tzpkF': _0x21ad75(0x25a),                'ojgnh': _0x21ad75(0x292),                'yoBCw': function (_0x21e32c, _0x48cea2) {                    return _0x21e32c == _0x48cea2;                },                'fNVzE': _0x21ad75(0x55d),                'ORvae': function (_0x2ff651, _0xf78f2a) {                    return _0x2ff651 == _0xf78f2a;                },                'IcqOe': _0x21ad75(0x4cd),                'hMFcF': function (_0x1ebe09, _0x1e4221) {                    return _0x1ebe09 == _0x1e4221;                },                'epmOu': _0x21ad75(0x262),                'lSdQe': _0x21ad75(0x270),                'LrDcm': function (_0x19ef9c, _0x4d3bcc) {                    return _0x19ef9c(_0x4d3bcc);                },                'NPZcp': _0x21ad75(0x582),                'vyTWt': _0x21ad75(0x332),                'yPqHl': _0x21ad75(0x248) + '4',                'YChpL': function (_0x15132d, _0x3cceb3) {                    return _0x15132d == _0x3cceb3;                },                'uRZbL': _0x21ad75(0x611),                'BtjDi': function (_0x5a178e, _0x9ea8e8) {                    return _0x5a178e == _0x9ea8e8;                },                'qUugY': _0x21ad75(0x64d),                'eChah': _0x21ad75(0x4ec),                'yHyxn': _0x21ad75(0x5e2),                'yfhxR': function (_0x4fc283, _0x2d8565) {                    return _0x4fc283 == _0x2d8565;                },                'SmAVL': _0x21ad75(0x480),                'skuDz': function (_0x46ad5b, _0x4d6b2d) {                    return _0x46ad5b == _0x4d6b2d;                },                'qRkqq': _0x21ad75(0x1b1),                'ineUp': _0x21ad75(0x37b),                'ItFhI': function (_0x57d94e, _0x3caa92) {                    return _0x57d94e != _0x3caa92;                },                'kDKRl': function (_0x57a6eb, _0x3e5ec8) {                    return _0x57a6eb != _0x3e5ec8;                },                'LhkGO': function (_0x216341, _0x143d36) {                    return _0x216341 == _0x143d36;                },                'kWHNE': function (_0x2c898a, _0x5c42ed) {                    return _0x2c898a == _0x5c42ed;                },                'vmuay': _0x21ad75(0x2b7),                'tYcfd': _0x21ad75(0x5e9),                'bAWzi': function (_0x2f1de0, _0xbbb150) {                    return _0x2f1de0 == _0xbbb150;                },                'yUfHv': _0x21ad75(0x416),                'KuaZT': _0x21ad75(0x2ad),                'EwKFT': function (_0x464171, _0x4b63af) {                    return _0x464171 == _0x4b63af;                },                'agjIB': _0x21ad75(0x39a),                'wXUvV': function (_0x27745c, _0x15d21c) {                    return _0x27745c == _0x15d21c;                },                'KvVly': _0x21ad75(0x258),                'ZIgFF': function (_0x1ff040, _0x123090) {                    return _0x1ff040 == _0x123090;                },                'JhLcv': _0x21ad75(0x562),                'oRhps': _0x21ad75(0x3f1),                'BrUTT': _0x21ad75(0x4a0) + _0x21ad75(0x56e),                'XiLpA': function (_0x18cf4e, _0x346e9a) {                    return _0x18cf4e == _0x346e9a;                },                'RWIsv': _0x21ad75(0x46a) + _0x21ad75(0x383),                'kiwHR': function (_0x4ef4a7, _0x293c54) {                    return _0x4ef4a7 == _0x293c54;                },                'ZdpSP': _0x21ad75(0x55c) + _0x21ad75(0x40d),                'XwSZo': function (_0x3093d0, _0x453df2) {                    return _0x3093d0 == _0x453df2;                },                'yZujw': _0x21ad75(0x55e) + _0x21ad75(0x1e0),                'SgfOZ': function (_0x179a19, _0xe1c40c) {                    return _0x179a19 == _0xe1c40c;                },                'plwCn': _0x21ad75(0x319) + _0x21ad75(0x63e),                'kObIP': function (_0x4e8c24, _0xf9445c) {                    return _0x4e8c24 == _0xf9445c;                },                'dEMRq': _0x21ad75(0x2db) + _0x21ad75(0x5e8),                'aKvoX': function (_0x2b9cec, _0x3a96e1) {                    return _0x2b9cec == _0x3a96e1;                },                'akvai': _0x21ad75(0x2a5) + _0x21ad75(0x64c),                'rnFuZ': function (_0x224988, _0x3c94df) {                    return _0x224988 + _0x3c94df;                },                'OZzBu': _0x21ad75(0x3b7),                'UPhBU': function (_0x456a05, _0x37e669) {                    return _0x456a05 == _0x37e669;                },                'EAxsX': _0x21ad75(0x5f8),                'uhCQR': function (_0x414322, _0x544e07) {                    return _0x414322 == _0x544e07;                },                'wrhJc': _0x21ad75(0x3af),                'qlETc': _0x21ad75(0x342),                'JMoSY': _0x21ad75(0x2e2),                'WmQZk': function (_0x48ad4b, _0x974456) {                    return _0x48ad4b == _0x974456;                },                'BMvfx': _0x21ad75(0x404),                'wMuQY': _0x21ad75(0x24e),                'HBTyB': function (_0x3f3d6a, _0x474c04) {                    return _0x3f3d6a == _0x474c04;                },                'gUMfK': _0x21ad75(0x287),                'KdRNQ': function (_0x3c21b3, _0x1e8204) {                    return _0x3c21b3 == _0x1e8204;                },                'iCjoU': _0x21ad75(0x22b),                'HOtFE': _0x21ad75(0x20e),                'UckDJ': function (_0x367fc6, _0x169785) {                    return _0x367fc6 == _0x169785;                },                'aKhPF': _0x21ad75(0x330),                'eseWX': function (_0x2c3c2f, _0x1106a3) {                    return _0x2c3c2f == _0x1106a3;                },                'LnGlT': _0x21ad75(0x456),                'YdKMy': _0x21ad75(0x246),                'JWwXp': _0x21ad75(0x3f5),                'CREqi': _0x21ad75(0x239),                'quvGp': _0x21ad75(0x59c),                'tjCHj': _0x21ad75(0x1df),                'tLtyS': _0x21ad75(0x21e),                'BwkZV': _0x21ad75(0x1b0),                'KDTkw': function (_0x284cd8, _0xd09696) {                    return _0x284cd8 == _0xd09696;                },                'RsscB': _0x21ad75(0x256),                'VoEzv': _0x21ad75(0x425) + _0x21ad75(0x2ba) + '10',                'efxwR': function (_0x1f73fa, _0x109cf4) {                    return _0x1f73fa == _0x109cf4;                },                'RkIgD': _0x21ad75(0x5f4),                'BZMOs': function (_0x13dee9, _0x12b253) {                    return _0x13dee9 == _0x12b253;                },                'JKJoV': _0x21ad75(0x60e),                'jAxGW': _0x21ad75(0x3b6),                'zEIUS': function (_0x510ed3, _0x3fd408) {                    return _0x510ed3 == _0x3fd408;                },                'TYgcP': _0x21ad75(0x558),                'wVjFr': _0x21ad75(0x5fb),                'WRyst': _0x21ad75(0x305),                'jBFMd': function (_0x5699c8, _0x19f872) {                    return _0x5699c8 == _0x19f872;                },                'JRCxZ': _0x21ad75(0x2fd),                'YaRYX': function (_0x2cf4f6, _0x115ce3) {                    return _0x2cf4f6 == _0x115ce3;                },                'Nrleb': _0x21ad75(0x3bd),                'qQyDN': function (_0x1c03c7, _0x118197) {                    return _0x1c03c7 == _0x118197;                },                'wEWte': _0x21ad75(0x1dc),                'tvhqT': function (_0x5f5cfb, _0x28ac17) {                    return _0x5f5cfb == _0x28ac17;                },                'keYOn': _0x21ad75(0x2ff),                'aBkNh': function (_0x19f324, _0x480626) {                    return _0x19f324 == _0x480626;                },                'aEcGf': _0x21ad75(0x3d4),                'dqhTV': function (_0x4abc0f, _0x18baaa) {                    return _0x4abc0f == _0x18baaa;                },                'qXLxu': _0x21ad75(0x1a2),                'Lrzkn': _0x21ad75(0x59e),                'KpcwD': function (_0x1fb563, _0x4eff0f) {                    return _0x1fb563 == _0x4eff0f;                },                'tfxct': _0x21ad75(0x2d0),                'YuTiC': _0x21ad75(0x607),                'jCsEn': function (_0x30e5a8, _0x141f8b) {                    return _0x30e5a8 == _0x141f8b;                },                'oXxbV': _0x21ad75(0x1b9),                'qDuTH': _0x21ad75(0x2fc),                'pfrjE': function (_0x3ba629, _0x2f3853) {                    return _0x3ba629 == _0x2f3853;                },                'JGndA': _0x21ad75(0x64b),                'SJYbP': function (_0x5b2795, _0x105f11) {                    return _0x5b2795 == _0x105f11;                },                'BAbZe': _0x21ad75(0x50b),                'CwtrH': function (_0x3e34a7, _0x10f6ef) {                    return _0x3e34a7 == _0x10f6ef;                },                'vKHEU': _0x21ad75(0x4f8),                'KJLTR': _0x21ad75(0x476),                'GhWCa': function (_0x188d2b, _0x2280d3) {                    return _0x188d2b == _0x2280d3;                },                'bHlLb': _0x21ad75(0x429),                'BTapP': function (_0x2649b4, _0x3be2ff) {                    return _0x2649b4 == _0x3be2ff;                },                'svwaJ': _0x21ad75(0x60c),                'brNuP': _0x21ad75(0x54e) + _0x21ad75(0x62a) + _0x21ad75(0x500) + '2',                'bcQyQ': _0x21ad75(0x347),                'Ixqwt': function (_0x17503e, _0x3e2696) {                    return _0x17503e == _0x3e2696;                },                'wjzAP': _0x21ad75(0x518),                'LxAQS': function (_0x2ee120, _0x52ed33) {                    return _0x2ee120 == _0x52ed33;                },                'GmoUS': _0x21ad75(0x288),                'xkERv': _0x21ad75(0x1c0),                'zyZQs': _0x21ad75(0x28c),                'PjHny': function (_0x28081e, _0xee3972) {                    return _0x28081e == _0xee3972;                },                'HvJmj': _0x21ad75(0x24c),                'cEElf': _0x21ad75(0x455),                'XXEhz': function (_0x39d56c, _0x52dda0) {                    return _0x39d56c == _0x52dda0;                },                'ELkJj': _0x21ad75(0x1b8),                'gDNuN': _0x21ad75(0x4b3),                'RCHJQ': _0x21ad75(0x1d7),                'ptHlt': _0x21ad75(0x457),                'NQUbG': _0x21ad75(0x648),                'hUlYK': _0x21ad75(0x402),                'CqrLi': _0x21ad75(0x3e5) + _0x21ad75(0x64e),                'ndPvX': _0x21ad75(0x412) + _0x21ad75(0x64e),                'PFlfy': _0x21ad75(0x4b9) + _0x21ad75(0x64e),                'EJzKm': _0x21ad75(0x295) + _0x21ad75(0x64e),                'Hvdth': function (_0x4cd0ac, _0x219cd6) {                    return _0x4cd0ac == _0x219cd6;                },                'LxLRj': _0x21ad75(0x53c) + _0x21ad75(0x64e),                'bRvMB': function (_0x5dbc5a, _0x3c8b14) {                    return _0x5dbc5a == _0x3c8b14;                },                'pCxrK': _0x21ad75(0x609) + _0x21ad75(0x64e),                'MPBOH': function (_0x45492a, _0x5e7f5f) {                    return _0x45492a == _0x5e7f5f;                },                'InwxI': _0x21ad75(0x51d) + _0x21ad75(0x64e),                'jBknt': _0x21ad75(0x352) + _0x21ad75(0x64e),                'vWGNQ': function (_0x35ccd9, _0x6685dc) {                    return _0x35ccd9 + _0x6685dc;                },                'VTeiD': _0x21ad75(0x40a),                'AyFRt': function (_0x567f27, _0x39c103) {                    return _0x567f27 == _0x39c103;                },                'TcjQJ': _0x21ad75(0x5c4),                'YUiXF': _0x21ad75(0x588),                'wiUDN': _0x21ad75(0x427),                'ywkPt': function (_0x5f2f94, _0x162fcb) {                    return _0x5f2f94 == _0x162fcb;                },                'rimKE': _0x21ad75(0x5a3) + _0x21ad75(0x443),                'kpnHB': _0x21ad75(0x3aa) + _0x21ad75(0x443),                'FpxhU': function (_0xa7879a, _0x3a5403) {                    return _0xa7879a == _0x3a5403;                },                'RWgOt': _0x21ad75(0x4e8) + _0x21ad75(0x443),                'LTvuC': function (_0x5224bb, _0x240e3e) {                    return _0x5224bb == _0x240e3e;                },                'YRvFf': _0x21ad75(0x279) + _0x21ad75(0x443),                'ZJebt': _0x21ad75(0x467),                'HeUED': _0x21ad75(0x593),                'ZnsOc': _0x21ad75(0x604),                'UEfSE': function (_0x54c97e, _0x3c4335) {                    return _0x54c97e - _0x3c4335;                },                'FaxCl': function (_0x106e1c, _0x3c76a3) {                    return _0x106e1c - _0x3c76a3;                },                'NhAOH': _0x21ad75(0x1a6),                'okfOR': _0x21ad75(0x5de) + '4',                'eFSYj': _0x21ad75(0x2af) + _0x21ad75(0x1ab) + _0x21ad75(0x2bf) + 'fa',                'letTM': _0x21ad75(0x544) + '1',                'YcBBK': _0x21ad75(0x440) + _0x21ad75(0x424),                'FFgwb': function (_0x4615a8, _0x245001) {                    return _0x4615a8 == _0x245001;                },                'DXeko': _0x21ad75(0x2d1) + _0x21ad75(0x26c),                'zCRSf': function (_0x137796, _0x469411) {                    return _0x137796 == _0x469411;                },                'UhkKZ': _0x21ad75(0x3df),                'MHkBS': function (_0x18f163, _0x44d887) {                    return _0x18f163 == _0x44d887;                },                'rbHDC': _0x21ad75(0x2ab),                'AODBp': _0x21ad75(0x489) + _0x21ad75(0x35c),                'EWHgJ': _0x21ad75(0x458),                'JcXOq': function (_0x5860ee, _0x508521) {                    return _0x5860ee == _0x508521;                },                'sSBYF': _0x21ad75(0x3c1) + _0x21ad75(0x35c),                'TqqVe': _0x21ad75(0x495),                'RqqZG': _0x21ad75(0x23a) + _0x21ad75(0x35c),                'kjorH': function (_0x1e3872, _0x1cef9d) {                    return _0x1e3872 == _0x1cef9d;                },                'KGnvY': _0x21ad75(0x560),                'TJPOK': function (_0x5ab66a, _0x435f10) {                    return _0x5ab66a == _0x435f10;                },                'psSXY': _0x21ad75(0x3fd),                'wodOZ': function (_0x4d118a, _0x4868e7) {                    return _0x4d118a == _0x4868e7;                },                'msuTG': _0x21ad75(0x440) + _0x21ad75(0x397),                'zANkC': _0x21ad75(0x440) + _0x21ad75(0x257),                'DqqJr': _0x21ad75(0x25b),                'kFGYk': _0x21ad75(0x4ed),                'zfYZS': _0x21ad75(0x3e4) + _0x21ad75(0x35c),                'qNTIr': function (_0x32104f, _0x3dc13d) {                    return _0x32104f == _0x3dc13d;                },                'pfOmp': _0x21ad75(0x613) + _0x21ad75(0x35c),                'rJNKb': function (_0x5524aa, _0x293fe0) {                    return _0x5524aa == _0x293fe0;                },                'Fxhdd': _0x21ad75(0x1d3) + _0x21ad75(0x35c),                'pnJJX': function (_0x3ebde5, _0x1e840f) {                    return _0x3ebde5 == _0x1e840f;                },                'EYZXv': _0x21ad75(0x645) + _0x21ad75(0x35c),                'LYBxD': _0x21ad75(0x376) + _0x21ad75(0x35c),                'ZPznf': function (_0x5c71b4, _0x3444f7, _0x5807fc) {                    return _0x5c71b4(_0x3444f7, _0x5807fc);                },                'lIGIh': _0x21ad75(0x4a8),                'QSRZM': _0x21ad75(0x438) + '1',                'AKLEN': _0x21ad75(0x642) + '95',                'qClSM': _0x21ad75(0x464),                'pRPUP': function (_0x2bb2b8, _0x496c77) {                    return _0x2bb2b8 == _0x496c77;                },                'GFYMu': _0x21ad75(0x399) + '3',                'SISFx': _0x21ad75(0x642) + '94',                'koDVZ': _0x21ad75(0x559) + '2',                'LUmck': _0x21ad75(0x642) + '93',                'HtjaD': function (_0x56311f, _0x28b00f) {                    return _0x56311f == _0x28b00f;                },                'TDiiy': _0x21ad75(0x341) + '2',                'LacMz': _0x21ad75(0x642) + '92',                'KZWmO': function (_0x41f5b0, _0x5051a2) {                    return _0x41f5b0 == _0x5051a2;                },                'FHnuD': _0x21ad75(0x28d) + '0',                'IEshC': _0x21ad75(0x642) + '88',                'qldXe': _0x21ad75(0x40b) + '3',                'ssAzF': _0x21ad75(0x642) + '89',                'KjVob': _0x21ad75(0x2b3) + '3',                'sUZqj': _0x21ad75(0x642) + '85',                'olSqE': function (_0x211e8a, _0x42e17f) {                    return _0x211e8a == _0x42e17f;                },                'ESJLb': _0x21ad75(0x56a) + '5',                'nWgWm': _0x21ad75(0x642) + '86',                'XlgVj': _0x21ad75(0x4c6) + '1',                'fTjZD': _0x21ad75(0x642) + '82',                'BGrbR': function (_0x8be624, _0x16a0b6) {                    return _0x8be624 == _0x16a0b6;                },                'yBlzd': _0x21ad75(0x2ca) + '5',                'lveeW': _0x21ad75(0x642) + '83',                'zeAeF': _0x21ad75(0x5b9) + '4',                'oRTpV': _0x21ad75(0x642) + '79',                'HKPzu': function (_0x3a2bb2, _0x254740) {                    return _0x3a2bb2 == _0x254740;                },                'MxnGB': _0x21ad75(0x62c) + '2',                'PPhKC': _0x21ad75(0x642) + '80',                'pJybL': function (_0xda91a7, _0x1beda4) {                    return _0xda91a7 == _0x1beda4;                },                'dUsKt': _0x21ad75(0x61f) + '1',                'iuonF': _0x21ad75(0x642) + '76',                'QLpAS': _0x21ad75(0x4e0) + '2',                'IuSGa': _0x21ad75(0x642) + '77',                'XRAfH': function (_0x2a312e, _0x1966b8) {                    return _0x2a312e == _0x1966b8;                },                'jWiJS': _0x21ad75(0x390) + '4',                'YxEZS': _0x21ad75(0x642) + '73',                'yyTAU': function (_0x47d59a, _0x195abe) {                    return _0x47d59a == _0x195abe;                },                'aUudh': _0x21ad75(0x33c) + '5',                'tVLDv': _0x21ad75(0x642) + '74',                'LqUin': _0x21ad75(0x21a) + '5',                'cHNiY': _0x21ad75(0x642) + '70',                'MKmFX': function (_0xc737f9, _0xb4d6) {                    return _0xc737f9 == _0xb4d6;                },                'bOopm': _0x21ad75(0x4b7) + '4',                'iUfDs': _0x21ad75(0x642) + '71',                'jJNGf': _0x21ad75(0x3f3) + '5',                'uRCJE': _0x21ad75(0x642) + '68',                'ywkBR': _0x21ad75(0x439) + '3',                'ULEXT': _0x21ad75(0x642) + '67',                'VSGav': function (_0x50251d, _0x4b07fe) {                    return _0x50251d == _0x4b07fe;                },                'yeffi': _0x21ad75(0x394),                'ZEJvM': _0x21ad75(0x291) + _0x21ad75(0x32c),                'plCBu': function (_0x15a336, _0x5c07c1) {                    return _0x15a336 == _0x5c07c1;                },                'tcMZB': _0x21ad75(0x3d3),                'hkKJn': _0x21ad75(0x400) + '2',                'sGIQu': _0x21ad75(0x3c9) + _0x21ad75(0x56c) + _0x21ad75(0x34f) + '6c',                'ZPmja': _0x21ad75(0x441),                'sZkfl': _0x21ad75(0x400) + '5',                'EqpWl': _0x21ad75(0x1b4) + _0x21ad75(0x3ce) + _0x21ad75(0x575) + '78',                'fPscX': function (_0x418256, _0x58ed04) {                    return _0x418256 == _0x58ed04;                },                'BXbOI': _0x21ad75(0x382),                'hLvpA': _0x21ad75(0x400) + '4',                'uakVO': _0x21ad75(0x509) + _0x21ad75(0x205) + _0x21ad75(0x356) + 'b3',                'CXcbe': function (_0x574314, _0x59e525) {                    return _0x574314 == _0x59e525;                },                'GbVnr': _0x21ad75(0x285),                'pPKiO': _0x21ad75(0x400) + '6',                'akPKD': _0x21ad75(0x4b5) + _0x21ad75(0x2b5) + _0x21ad75(0x60f) + '44',                'QyXks': _0x21ad75(0x1f9),                'bEeHI': _0x21ad75(0x400) + '3',                'KllYu': _0x21ad75(0x1f8) + _0x21ad75(0x27d) + _0x21ad75(0x647) + 'e4',                'eGFwm': function (_0x2f30d2, _0x8b0dc4) {                    return _0x2f30d2 == _0x8b0dc4;                },                'rblEe': _0x21ad75(0x577),                'dlIuY': _0x21ad75(0x400) + '1',                'JtIZK': _0x21ad75(0x4b6) + _0x21ad75(0x511) + _0x21ad75(0x327) + '29',                'TbHBN': function (_0x4c7fd1, _0xd75316) {                    return _0x4c7fd1 != _0xd75316;                },                'DcEhZ': _0x21ad75(0x3a8) + _0x21ad75(0x1e9) + 'o',                'QPzao': _0x21ad75(0x34e) + '事件',                'QJxkd': function (_0x150173, _0x592517) {                    return _0x150173 == _0x592517;                },                'sOoSI': function (_0x2a7e3b, _0x354621) {                    return _0x2a7e3b == _0x354621;                },                'Dkela': _0x21ad75(0x1c3) + _0x21ad75(0x443),                'Pvvse': _0x21ad75(0x4ca) + _0x21ad75(0x443),                'vTfLr': _0x21ad75(0x51e),                'qkPpL': _0x21ad75(0x3fe),                'xdlaO': function (_0x675b, _0x25fc4c) {                    return _0x675b == _0x25fc4c;                },                'uqBZw': _0x21ad75(0x548),                'IibtF': _0x21ad75(0x62b),                'diQGA': function (_0xce939f, _0x4c7448) {                    return _0xce939f == _0x4c7448;                },                'rpwUd': function (_0x25ec28, _0x3a372c) {                    return _0x25ec28 == _0x3a372c;                },                'UseEl': _0x21ad75(0x5a2) + _0x21ad75(0x443),                'VQLph': _0x21ad75(0x501) + _0x21ad75(0x443),                'gdLPg': _0x21ad75(0x5b1),                'hXqyH': function (_0x19ae90, _0x40d0cc) {                    return _0x19ae90 == _0x40d0cc;                },                'lTdFh': _0x21ad75(0x1d5),                'foHFf': function (_0x1d31bc, _0x31648b) {                    return _0x1d31bc == _0x31648b;                },                'QajTJ': _0x21ad75(0x5d6) + _0x21ad75(0x345),                'ERCEy': _0x21ad75(0x4d9) + _0x21ad75(0x345),                'vUADQ': _0x21ad75(0x2ce) + _0x21ad75(0x1c5),                'vjHLp': function (_0x11a1b5, _0xf56c85) {                    return _0x11a1b5 == _0xf56c85;                },                'GArjP': _0x21ad75(0x4a2) + _0x21ad75(0x1c5),                'TYwRh': function (_0x146c8a, _0x4fd3cd) {                    return _0x146c8a == _0x4fd3cd;                },                'cwVLR': _0x21ad75(0x290),                'PzJmQ': function (_0x13f995, _0x27ab69) {                    return _0x13f995 == _0x27ab69;                },                'Wecyd': _0x21ad75(0x1ca),                'JWMuX': function (_0x36b2f0, _0x3db05c) {                    return _0x36b2f0 == _0x3db05c;                },                'JMJrC': _0x21ad75(0x596) + _0x21ad75(0x481),                'wSEnk': _0x21ad75(0x39f) + _0x21ad75(0x481),                'NqvDT': function (_0x1831de, _0xa88a76) {                    return _0x1831de == _0xa88a76;                },                'XMPDo': _0x21ad75(0x299),                'LCUKF': _0x21ad75(0x200),                'GUnNF': function (_0x1fe47b, _0x113754) {                    return _0x1fe47b == _0x113754;                },                'wJjbm': _0x21ad75(0x213),                'nIUEU': function (_0x71781a, _0x4bd43e) {                    return _0x71781a == _0x4bd43e;                },                'aEEYt': _0x21ad75(0x504),                'PwEKA': function (_0x34b03f, _0x1ec080) {                    return _0x34b03f == _0x1ec080;                },                'miOlY': _0x21ad75(0x30a),                'bRWvH': _0x21ad75(0x353),                'QbMnZ': _0x21ad75(0x2a4),                'ecXtC': _0x21ad75(0x522),                'vFaNR': function (_0x1306d8, _0x3e42cd) {                    return _0x1306d8 == _0x3e42cd;                },                'TLhIR': _0x21ad75(0x47c),                'dwigq': _0x21ad75(0x403),                'WxFrT': function (_0xd1630d, _0x17aeda) {                    return _0xd1630d == _0x17aeda;                },                'xeTvN': function (_0x2b7f52, _0x28750c) {                    return _0x2b7f52 == _0x28750c;                },                'jEBAS': function (_0x121452, _0x55b673) {                    return _0x121452 == _0x55b673;                },                'JUkQu': function (_0x46f6f8, _0x20e45f) {                    return _0x46f6f8 == _0x20e45f;                },                'IkrhH': _0x21ad75(0x5cc),                'wONXu': _0x21ad75(0x1a7),                'GBSdF': _0x21ad75(0x39e),                'aeukl': function (_0x5d93ba, _0x32bfc1) {                    return _0x5d93ba == _0x32bfc1;                },                'SCvgu': _0x21ad75(0x45e),                'NeEmG': _0x21ad75(0x44e),                'azGHm': _0x21ad75(0x1f5),                'MEFFz': _0x21ad75(0x263),                'hmAvN': function (_0x1b4a13, _0x2a92eb) {                    return _0x1b4a13 == _0x2a92eb;                },                'mmCQi': _0x21ad75(0x374),                'WXGdu': _0x21ad75(0x1a9),                'hmIfj': function (_0x26ba19, _0x22ca64) {                    return _0x26ba19 == _0x22ca64;                },                'dCFzy': _0x21ad75(0x46c),                'NkGgT': function (_0x519bbe, _0x2bcf83) {                    return _0x519bbe == _0x2bcf83;                },                'huzBL': _0x21ad75(0x316),                'EOuoP': function (_0x133c06, _0x3f547f) {                    return _0x133c06 == _0x3f547f;                },                'xHMNU': _0x21ad75(0x24d),                'vPEwM': _0x21ad75(0x29a),                'druHA': _0x21ad75(0x59a),                'EbfVO': function (_0x5f18ad, _0x105cc7) {                    return _0x5f18ad == _0x105cc7;                },                'zBDoh': _0x21ad75(0x482),                'HEZtH': function (_0x23e9c6, _0x4bd599) {                    return _0x23e9c6 == _0x4bd599;                },                'kmtoP': _0x21ad75(0x576),                'QMVYV': function (_0x15931e, _0x17fee0) {                    return _0x15931e == _0x17fee0;                },                'tdXZn': function (_0x14bd77, _0x49a896) {                    return _0x14bd77 == _0x49a896;                },                'mweky': _0x21ad75(0x634),                'MevAx': _0x21ad75(0x2f9),                'EqIsW': _0x21ad75(0x35b) + _0x21ad75(0x644),                'QGYkF': _0x21ad75(0x539),                'qSXHv': _0x21ad75(0x621),                'PYjbO': _0x21ad75(0x35b) + _0x21ad75(0x61d),                'dohpt': _0x21ad75(0x210),                'pRdCF': _0x21ad75(0x372),                'FYrFP': _0x21ad75(0x35b) + _0x21ad75(0x2f5),                'owpez': _0x21ad75(0x276),                'xENzG': _0x21ad75(0x1b7),                'gcgdh': _0x21ad75(0x3f9) + _0x21ad75(0x3d1),                'GNtcp': function (_0x528d30, _0x5d8214) {                    return _0x528d30 == _0x5d8214;                },                'LZAwE': _0x21ad75(0x3b8),                'fcaRn': _0x21ad75(0x366) + _0x21ad75(0x45c),                'wfLnq': _0x21ad75(0x39c),                'hNaEa': _0x21ad75(0x4d2),                'fsUTb': _0x21ad75(0x35b) + _0x21ad75(0x51f),                'xCsxB': _0x21ad75(0x5e6),                'fHkKX': _0x21ad75(0x60a) + _0x21ad75(0x350),                'nrDtf': _0x21ad75(0x35e),                'jHQMI': _0x21ad75(0x60a) + _0x21ad75(0x238),                'miNyi': function (_0x2a38c4, _0x3d3768) {                    return _0x2a38c4 == _0x3d3768;                },                'Fjdtz': _0x21ad75(0x30b),                'tNiAY': _0x21ad75(0x502),                'aeqnh': _0x21ad75(0x60a) + _0x21ad75(0x368),                'ypKzy': _0x21ad75(0x2ee),                'IvzFv': _0x21ad75(0x5a4),                'dBIHL': _0x21ad75(0x35b) + _0x21ad75(0x61b),                'gpLVw': function (_0x4e616c, _0x392d27) {                    return _0x4e616c == _0x392d27;                },                'sILbY': _0x21ad75(0x26e),                'avFee': _0x21ad75(0x474),                'TvHHZ': _0x21ad75(0x60a) + _0x21ad75(0x1ba),                'RvXbO': function (_0x3708ef, _0x18a6f2) {                    return _0x3708ef == _0x18a6f2;                },                'vKNaZ': _0x21ad75(0x20b),                'NwuGN': _0x21ad75(0x36b),                'HbBIG': _0x21ad75(0x35b) + _0x21ad75(0x484),                'wXCtz': function (_0x3ff492, _0x3b7a01) {                    return _0x3ff492 == _0x3b7a01;                },                'abNqq': _0x21ad75(0x36d),                'MHLqS': _0x21ad75(0x605),                'GgLBB': _0x21ad75(0x60a) + _0x21ad75(0x33f),                'YSXto': function (_0x7c8cc1, _0xeb555f) {                    return _0x7c8cc1 == _0xeb555f;                },                'eVELD': _0x21ad75(0x2fe),                'DvEJP': _0x21ad75(0x3c5),                'OZMEV': _0x21ad75(0x60a) + _0x21ad75(0x385),                'JRlbN': _0x21ad75(0x431),                'mjKja': _0x21ad75(0x280),                'wHIqn': _0x21ad75(0x60a) + _0x21ad75(0x30e),                'kFLDs': function (_0xfe5cf1, _0x207347) {                    return _0xfe5cf1 == _0x207347;                },                'saoNH': _0x21ad75(0x1cc),                'Vctqg': _0x21ad75(0x4db),                'LuQVr': _0x21ad75(0x35b) + _0x21ad75(0x26a),                'qclhb': function (_0x36b391, _0x13064f) {                    return _0x36b391 == _0x13064f;                },                'BJrak': _0x21ad75(0x4ba),                'YgNrW': _0x21ad75(0x1d4),                'hMTrA': _0x21ad75(0x571) + _0x21ad75(0x5ff),                'tElQy': function (_0x5ad0fd, _0x2e25eb) {                    return _0x5ad0fd == _0x2e25eb;                },                'ozXxE': _0x21ad75(0x387),                'nCteZ': _0x21ad75(0x3c0),                'EQmHN': _0x21ad75(0x5bb) + _0x21ad75(0x2e8),                'FUliE': _0x21ad75(0x622),                'oNbmz': _0x21ad75(0x386),                'QFQUa': _0x21ad75(0x1bc) + _0x21ad75(0x1d8),                'TlUwN': function (_0x29e271, _0xccc84) {                    return _0x29e271 == _0xccc84;                },                'rZsmg': _0x21ad75(0x3c6),                'JhGpI': _0x21ad75(0x34a),                'AWpNd': _0x21ad75(0x4be) + _0x21ad75(0x42e),                'HHdNX': _0x21ad75(0x26f),                'BYvDS': _0x21ad75(0x2e9),                'ajjEi': _0x21ad75(0x5bb) + _0x21ad75(0x63a),                'vUtPr': function (_0x1b67e3, _0x5a4568) {                    return _0x1b67e3 == _0x5a4568;                },                'SifMO': _0x21ad75(0x4f1),                'CQhvB': _0x21ad75(0x1fd),                'xLeDZ': _0x21ad75(0x1f4) + _0x21ad75(0x4b1),                'VpFTq': function (_0x568e34, _0x3fd092) {                    return _0x568e34 == _0x3fd092;                },                'OnlFU': _0x21ad75(0x2be),                'paDXV': _0x21ad75(0x34b),                'uAqPQ': _0x21ad75(0x432) + _0x21ad75(0x1ff),                'gZptW': _0x21ad75(0x377),                'sAvbo': _0x21ad75(0x5d0),                'Sehdr': _0x21ad75(0x5bb) + _0x21ad75(0x4c2),                'ZXXbt': function (_0x379163, _0x1522e2) {                    return _0x379163 == _0x1522e2;                },                'NXmSv': _0x21ad75(0x2bc),                'UiSan': _0x21ad75(0x31b),                'SRqfk': _0x21ad75(0x639) + _0x21ad75(0x222),                'HDszt': function (_0x423a04, _0x36651b) {                    return _0x423a04 == _0x36651b;                },                'ISboJ': _0x21ad75(0x1f7),                'jDgrO': _0x21ad75(0x47b),                'DLffI': _0x21ad75(0x244) + _0x21ad75(0x224),                'yDJJi': _0x21ad75(0x38d),                'pClQG': _0x21ad75(0x57d),                'syCly': _0x21ad75(0x41e) + _0x21ad75(0x207),                'rqmOR': function (_0x51c03a, _0x15e8d2) {                    return _0x51c03a == _0x15e8d2;                },                'iHGql': _0x21ad75(0x253),                'wtRVL': _0x21ad75(0x2d4),                'NuSTt': _0x21ad75(0x395) + _0x21ad75(0x5a0),                'tUxTj': function (_0x1982ed, _0x5e2a0e) {                    return _0x1982ed == _0x5e2a0e;                },                'Kiavx': _0x21ad75(0x1bd),                'YIIhf': _0x21ad75(0x2df),                'WtfAn': _0x21ad75(0x2ef) + _0x21ad75(0x55a),                'Eqjes': _0x21ad75(0x348),                'ghwur': _0x21ad75(0x51c) + _0x21ad75(0x323),                'okRWm': function (_0x37c258, _0x1a24cc) {                    return _0x37c258 == _0x1a24cc;                },                'BgpRQ': _0x21ad75(0x3b0),                'yYdeD': _0x21ad75(0x2f3),                'jJFro': _0x21ad75(0x28a) + _0x21ad75(0x5c1),                'TkWeZ': function (_0x2e4fde, _0x8db346) {                    return _0x2e4fde == _0x8db346;                },                'gEJzj': function (_0x59336c, _0x32f79b) {                    return _0x59336c == _0x32f79b;                },                'vtDBP': function (_0x4e1841, _0x40d841) {                    return _0x4e1841 == _0x40d841;                },                'FlFfH': function (_0x200ec2, _0x1250f9) {                    return _0x200ec2 == _0x1250f9;                },                'DhaDW': function (_0x1af6d5, _0x324ac2) {                    return _0x1af6d5 == _0x324ac2;                },                'ldCSp': _0x21ad75(0x21f),                'tRVRy': _0x21ad75(0x2cd),                'CzVbj': function (_0x33f5aa, _0x4b21c2) {                    return _0x33f5aa == _0x4b21c2;                },                'HMPnf': _0x21ad75(0x32f),                'ysode': _0x21ad75(0x23f),                'AUEip': _0x21ad75(0x3fb),                'pboJq': _0x21ad75(0x209),                'Pwlvl': _0x21ad75(0x50e),                'CXtZm': _0x21ad75(0x51b),                'iTOWz': _0x21ad75(0x4d8),                'aNvzT': function (_0x50cf1f, _0x296c1d) {                    return _0x50cf1f == _0x296c1d;                },                'SJLOC': _0x21ad75(0x3e3),                'CJiPc': function (_0x29c7c7, _0x143162) {                    return _0x29c7c7 == _0x143162;                },                'zsIGJ': _0x21ad75(0x573),                'PnINq': _0x21ad75(0x44f),                'UcnGT': _0x21ad75(0x1a5),                'Zguos': _0x21ad75(0x630),                'UMpaf': function (_0x5486ff, _0x177add) {                    return _0x5486ff == _0x177add;                },                'UwvzA': _0x21ad75(0x636),                'vIVVw': function (_0x3ebdc7, _0x263cd2) {                    return _0x3ebdc7 == _0x263cd2;                },                'rkQzG': _0x21ad75(0x533),                'QYApD': function (_0x2d986f, _0x23a319) {                    return _0x2d986f == _0x23a319;                },                'uPtTX': _0x21ad75(0x215),                'snFwC': _0x21ad75(0x56b) + _0x21ad75(0x419) + _0x21ad75(0x21d) + _0x21ad75(0x1aa) + _0x21ad75(0x31c),                'jzreX': _0x21ad75(0x46f),                'FHxze': function (_0x4617c5, _0x756b83) {                    return _0x4617c5 == _0x756b83;                },                'xZqIc': _0x21ad75(0x362),                'XpnSH': _0x21ad75(0x2dd),                'iLglJ': _0x21ad75(0x261),                'xoyBJ': function (_0x1dd305, _0x45ac61) {                    return _0x1dd305 == _0x45ac61;                },                'YKept': _0x21ad75(0x35a),                'DKzDy': function (_0x300044, _0x3e9c69) {                    return _0x300044 == _0x3e9c69;                },                'ubHOM': _0x21ad75(0x56d),                'CokNI': function (_0x2428e0, _0x4c34da) {                    return _0x2428e0 == _0x4c34da;                },                'aMHlt': _0x21ad75(0x2c5),                'NZvoI': _0x21ad75(0x3e0),                'tyShz': function (_0x190cad, _0x484506) {                    return _0x190cad == _0x484506;                },                'XKrHN': _0x21ad75(0x4bf),                'EKzGj': function (_0x9f9009, _0x46bb45) {                    return _0x9f9009 == _0x46bb45;                },                'glXGO': _0x21ad75(0x47f),                'MHUXf': _0x21ad75(0x5d9),                'bggRA': _0x21ad75(0x380),                'aIJSp': _0x21ad75(0x312),                'CqUhb': function (_0x5f4b79, _0x3803e4) {                    return _0x5f4b79 == _0x3803e4;                },                'abuHr': _0x21ad75(0x4e6),                'YnUMv': function (_0xca9e05, _0x22b2bf) {                    return _0xca9e05 == _0x22b2bf;                },                'iIMEr': _0x21ad75(0x267),                'gOZWV': _0x21ad75(0x24f),                'nogMy': function (_0x155e85, _0xd677a0) {                    return _0x155e85 == _0xd677a0;                },                'JmmFS': _0x21ad75(0x1b2),                'FIXis': function (_0x41d1d8, _0x2e817b) {                    return _0x41d1d8 == _0x2e817b;                },                'VHKNG': function (_0x56c24b, _0x4575ca) {                    return _0x56c24b == _0x4575ca;                },                'eSqRE': function (_0x10636f, _0x24a80a) {                    return _0x10636f == _0x24a80a;                },                'jjUiA': function (_0x1662fe, _0x1b9d4c) {                    return _0x1662fe == _0x1b9d4c;                },                'ghThF': _0x21ad75(0x36a),                'iUNsd': function (_0x548bcd, _0x56f0db) {                    return _0x548bcd == _0x56f0db;                },                'HRuuP': function (_0x322ce0, _0x322da7) {                    return _0x322ce0 == _0x322da7;                },                'pAtNk': _0x21ad75(0x282),                'kvhhn': function (_0xef9f09, _0x31a264) {                    return _0xef9f09 == _0x31a264;                },                'RuMtT': function (_0x5bdb5b, _0x65305b) {                    return _0x5bdb5b - _0x65305b;                },                'NIuNf': _0x21ad75(0x51a),                'aeVOD': _0x21ad75(0x566) + _0x21ad75(0x225),                'ptXTt': function (_0x1a63be, _0x59bc61) {                    return _0x1a63be == _0x59bc61;                },                'dvYMY': function (_0x2e86d2, _0x4c8314) {                    return _0x2e86d2 == _0x4c8314;                },                'RRHXH': function (_0xb1057e, _0x556d14) {                    return _0xb1057e == _0x556d14;                },                'IwKEA': function (_0x1a966d, _0x32505f) {                    return _0x1a966d == _0x32505f;                }            };        if (_0x466a4d[_0x21ad75(0x44b)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x514)]))            _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x261a + 0x18d * -0x12 + 0xb2 * 0x5f, -0x61 * -0x34 + -0x21f4 + 0xe4a, 0x1ce9 * -0x1 + 0x21 + 0x1cd2), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x2303 + 0x371 * 0x4 + -0x15 * 0x223;        else {            if (_0x466a4d[_0x21ad75(0x48b)](_0x351f2a[_0x21ad75(0x5c0)], '报警'))                _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0x1232 * 0x1 + 0x1058 * 0x2 + 0x4 * -0xcb6, -0x1552 * 0x1 + -0xd62 * 0x1 + 0x115f * 0x2, -0x14aa + 0xac * -0x21 + -0x2ae0 * -0x1), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x1 * -0xa2a + -0x67 * -0x17 + -0x3 * -0x19b;            else {                if (_0x466a4d[_0x21ad75(0x1de)](_0x351f2a[_0x21ad75(0x5c0)], '草坪'))                    _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0x2f * 0x72 + -0x11a * 0x2 + -0x17 * 0xd0, 0x1329 + -0x1763 + 0x444, 0x1 * -0x25c9 + -0x1816 + 0x6e1 * 0x9), _0x351f2a[_0x21ad75(0x59d)]['y'] = -0x26b * -0x8 + -0x1d4a + 0xdda;                else {                    if (_0x466a4d[_0x21ad75(0x4a3)](_0x351f2a[_0x21ad75(0x5c0)], '地面'))                        _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x35 * 0x2d + 0x1 * -0x263d + 0x1 * 0x2f98, 0x17ea + 0x910 + -0x22 * 0xf8, -0x1 * -0x1e17 + -0x6b8 + -0x1 * 0x1755), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x1bd * -0x8 + 0x1e82 + -0xcb2;                    else {                        if (_0x466a4d[_0x21ad75(0x41d)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x50f)]))                            _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0x2e * -0x29 + 0x4 * -0x4a3 + 0x19f4, 0x3 * -0x4e1 + -0x20fb + 0x2fa8, 0xcb6 + 0x2219 + -0x2ec5), _0x351f2a[_0x21ad75(0x59d)]['y'] = -0x1880 + -0xa6 * 0x22 + -0xc9d * -0x4;                        else {                            if (_0x466a4d[_0x21ad75(0x1a4)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x5cd)]))                                _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x2 * -0xb2b + 0x1d27 + -0x3373, 0x9f4 * -0x1 + 0x38d + 0x671, -0x1be7 * 0x1 + 0x1987 + 0x26a), _0x351f2a[_0x21ad75(0x2b0)] = ![], _0x351f2a[_0x21ad75(0x59d)]['y'] = 0xa01 + -0xd0f + -0x37b * -0x2, locationFloor = _0x351f2a;                            else {                                if (_0x466a4d[_0x21ad75(0x2c7)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x5af)]))                                    _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x1d32 + -0x102 + 0x1e3e, -0x1 * 0xd0e + 0x777 + 0xb * 0x83, 0x15b + 0x24c4 + 0x2615 * -0x1), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0xf21 + -0x10a0 + 0x567, duishichang1Room = _0x351f2a, allRoomObjs[_0x21ad75(0x557)](_0x351f2a);                                else {                                    if (_0x466a4d[_0x21ad75(0x3a0)](_0x351f2a[_0x21ad75(0x5c0)], '管道'))                                        _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x9b0 + 0x6d * 0x2b + 0xd * -0xa9, -0xd3 * -0x11 + -0x15b * -0x1 + -0x51c * 0x3, -0xe0d + -0xcc5 * 0x1 + 0x1adc), _0x351f2a[_0x21ad75(0x59d)]['y'] = -0xc05 + -0x31b + 0x1308, GDmodel = _0x351f2a, _0x351f2a[_0x21ad75(0x527)](_0x109dcf => {                                            const _0x5787da = _0x21ad75;                                            _0x466a4d[_0x5787da(0x49b)](_0x109dcf[_0x5787da(0x5dc)], _0x466a4d[_0x5787da(0x580)]) && (_0x466a4d[_0x5787da(0x1a8)](_0x109dcf[_0x5787da(0x5c0)], '管道') && _0x109dcf[_0x5787da(0x527)](_0x47b24d => {                                                const _0x2951f3 = _0x5787da;                                                if (_0x466a4d[_0x2951f3(0x58c)](_0x47b24d[_0x2951f3(0x5c0)], _0x466a4d[_0x2951f3(0x5c6)]))                                                    GDoutboxYSKQ = _0x47b24d;                                                else {                                                    if (_0x466a4d[_0x2951f3(0x1d0)](_0x47b24d[_0x2951f3(0x5c0)], '水管'))                                                        GDoutboxSG = _0x47b24d;                                                    else {                                                        if (_0x466a4d[_0x2951f3(0x1d0)](_0x47b24d[_0x2951f3(0x5c0)], _0x466a4d[_0x2951f3(0x603)]))                                                            GDoutboxSS = _0x47b24d;                                                        else {                                                            if (_0x466a4d[_0x2951f3(0x4bc)](_0x47b24d[_0x2951f3(0x5c0)], _0x466a4d[_0x2951f3(0x4ab)]))                                                                GDoutboxLZFJ = _0x47b24d;                                                            else {                                                                if (_0x466a4d[_0x2951f3(0x259)](_0x47b24d[_0x2951f3(0x5c0)], _0x466a4d[_0x2951f3(0x513)]))                                                                    GDoutboxDQ = _0x47b24d;                                                                else {                                                                    if (_0x466a4d[_0x2951f3(0x4bc)](_0x47b24d[_0x2951f3(0x5c0)], _0x466a4d[_0x2951f3(0x3e8)]))                                                                        GDoutboxCXFFJ = _0x47b24d;                                                                    else                                                                        (_0x466a4d[_0x2951f3(0x242)](_0x47b24d[_0x2951f3(0x5c0)], _0x466a4d[_0x2951f3(0x3ad)]) || _0x466a4d[_0x2951f3(0x4fc)](_0x47b24d[_0x2951f3(0x5c0)], _0x466a4d[_0x2951f3(0x1b6)])) && GDotherBox[_0x2951f3(0x557)](_0x47b24d);                                                                }                                                            }                                                        }                                                    }                                                }                                            }), _0x466a4d[_0x5787da(0x640)](_0x109dcf[_0x5787da(0x5c0)], _0x466a4d[_0x5787da(0x652)]) && (_0x109dcf[_0x5787da(0x2b0)] = ![], _0x109dcf[_0x5787da(0x527)](_0x16d538 => {                                                const _0x23f9c4 = _0x5787da;                                                if (_0x466a4d[_0x23f9c4(0x5f9)](_0x16d538[_0x23f9c4(0x5c0)], _0x466a4d[_0x23f9c4(0x52e)]))                                                    GDmovingCXFFJ = _0x16d538;                                                else {                                                    if (_0x466a4d[_0x23f9c4(0x36f)](_0x16d538[_0x23f9c4(0x5c0)], _0x466a4d[_0x23f9c4(0x2ac)]))                                                        GDmovingSS = _0x16d538;                                                    else {                                                        if (_0x466a4d[_0x23f9c4(0x58c)](_0x16d538[_0x23f9c4(0x5c0)], _0x466a4d[_0x23f9c4(0x265)]))                                                            GDmovingLZFJ = _0x16d538;                                                        else {                                                            if (_0x466a4d[_0x23f9c4(0x33a)](_0x16d538[_0x23f9c4(0x5c0)], _0x466a4d[_0x23f9c4(0x626)]))                                                                GDmovingYSKQ = _0x16d538;                                                            else {                                                                if (_0x466a4d[_0x23f9c4(0x4bc)](_0x16d538[_0x23f9c4(0x5c0)], _0x466a4d[_0x23f9c4(0x58f)]))                                                                    GDmovingSG = _0x16d538;                                                                else                                                                    _0x466a4d[_0x23f9c4(0x58c)](_0x16d538[_0x23f9c4(0x5c0)], _0x466a4d[_0x23f9c4(0x30c)]) && (GDmovingDQ = _0x16d538);                                                            }                                                        }                                                    }                                                }                                                _0x16d538[_0x23f9c4(0x3fc)] && (_0x16d538[_0x23f9c4(0x5d8)][_0x23f9c4(0x4ef)] = null, _0x16d538[_0x23f9c4(0x5d8)][_0x23f9c4(0x217) + 't'] = !![], _0x16d538[_0x23f9c4(0x5d8)][_0x23f9c4(0x2e6)] = ![], _0x16d538[_0x23f9c4(0x1c7) + 'r'] = 0x39 + 0x155b * -0x1 + 0xf * 0x1ee);                                            })));                                        });                                    else {                                        if (_0x466a4d[_0x21ad75(0x4c4)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x52a)]))                                            _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0x1 * -0x17e5 + 0x200e + -0x81f, -0x4b5 * -0x3 + 0x3 * -0x129 + -0x17 * 0x76, 0x3d9 * -0x3 + -0x1 * -0x13ba + -0x825), _0x351f2a[_0x21ad75(0x59d)]['y'] = -0xc * 0x1 + -0xd * -0xb2 + -0x1f * 0x2a, junhuaRoom = _0x351f2a, allRoomObjs[_0x21ad75(0x557)](_0x351f2a);                                        else {                                            if (_0x466a4d[_0x21ad75(0x4c5)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x23c)])) {                                                const _0x4b08d2 = _0x466a4d[_0x21ad75(0x3b9)][_0x21ad75(0x524)]('|');                                                let _0x3030f5 = 0xad * -0x2b + 0x19 * -0x121 + -0xd * -0x468;                                                while (!![]) {                                                    switch (_0x4b08d2[_0x3030f5++]) {                                                    case '0':                                                        limoRoom = _0x351f2a;                                                        continue;                                                    case '1':                                                        _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x1568 + -0x9a3 + -0x7dd;                                                        continue;                                                    case '2':                                                        _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0xf4f + -0xc80 + 0x1bd9, 0x4c7 + -0x2626 + 0x3 * 0xb23, -0x1d4b + -0x95f + 0x26b4);                                                        continue;                                                    case '3':                                                        _0x351f2a[_0x21ad75(0x527)](_0x1f1d1c => {                                                            const _0x4dfeaf = _0x21ad75;                                                            _0x466a4d[_0x4dfeaf(0x259)](_0x1f1d1c[_0x4dfeaf(0x5dc)], _0x466a4d[_0x4dfeaf(0x580)]) && (_0x466a4d[_0x4dfeaf(0x203)](_0x1f1d1c[_0x4dfeaf(0x5c0)], _0x466a4d[_0x4dfeaf(0x5fc)]) && (_0x1f1d1c[_0x4dfeaf(0x2b0)] = ![]));                                                        });                                                        continue;                                                    case '4':                                                        allRoomObjs[_0x21ad75(0x557)](_0x351f2a);                                                        continue;                                                    }                                                    break;                                                }                                            } else {                                                if (_0x466a4d[_0x21ad75(0x4da)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x5fc)])) {                                                    moveingRobot = _0x351f2a, _0x351f2a[_0x21ad75(0x3ec)][_0x21ad75(0x43d)] = -0x185e * 0x1 + 0x8ca + -0x1 * -0xf95, _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x4bf * 0x3 + -0x931 + 0x5de * 0x4, 0x17a7 + -0x121 * -0x11 + -0x2ace, 0x1 * -0x1d6e + -0x4 * 0x294 + -0x4f9 * -0x8), _0x351f2a[_0x21ad75(0x59d)][_0x21ad75(0x5eb)](-(-0x1ebe + 0xcf9 + -0x1e23 * -0x1 + 0.6799999999998363), _0x466a4d[_0x21ad75(0x4af)](-0xd1 * -0x29 + -0x2467 + 0x3c4 + 0.6399999999999864, 0x1 * -0x17ea + -0x9 * -0x111 + 0xe54 + 0.33000000000000007), -(0x122c + 0xd29 + -0x7 * 0x3a3 + 0.029999999999972715)), _0x351f2a[_0x21ad75(0x5cb)](-(-0x79 * 0x15 + 0x19b4 + 0x1 * -0x2bd + 0.21000000000003638), _0x466a4d[_0x21ad75(0x4af)](0x2269 + -0xc * -0xbc + -0xe21 * 0x3 + 0.6399999999999864, 0xdb + 0x257 * -0x5 + 0xadb * 0x1 + 0.33000000000000007), -(0x1a96 + -0x15fb + 0x3 * 0x6c + 0.9500000000000455));                                                    let _0x4931d7 = new THREE[(_0x21ad75(0x27e)) + (_0x21ad75(0x583))](-0x25 * 0x1 + -0x115 * -0x13 + 0x5f * -0x37, -0x1c44 + 0x1 * -0x1c81 + 0x38c6), _0x25262e = new THREE[(_0x21ad75(0x488)) + (_0x21ad75(0x4fb))]({                                                            'color': 0xffff00,                                                            'side': THREE[_0x21ad75(0x591)]                                                        }), _0x22e3a7 = new THREE[(_0x21ad75(0x233))](_0x4931d7, _0x25262e);                                                    _0x22e3a7[_0x21ad75(0x5c0)] = _0x466a4d[_0x21ad75(0x4b0)], _0x22e3a7[_0x21ad75(0x59d)][_0x21ad75(0x5eb)](0x2 * 0x817 + 0x1ffd * -0x1 + 0xfd4, -0x1 * 0xeb9 + -0x1073 * -0x1 + -0x1b2, 0xcb + -0x9 * 0x18b + 0x8 * 0x1a3), _0x22e3a7[_0x21ad75(0x2b0)] = ![], _0x351f2a[_0x21ad75(0x1cf)](_0x22e3a7);                                                    let _0x284638 = _0x466a4d[_0x21ad75(0x53f)](makeTextSprite, _0x466a4d[_0x21ad75(0x1a1)], {                                                        'fontsize': 0x14,                                                        'borderColor': {                                                            'r': 0xff,                                                            'g': 0x0,                                                            'b': 0x0,                                                            'a': 0.4                                                        },                                                        'backgroundColor': {                                                            'r': 0xff,                                                            'g': 0xff,                                                            'b': 0xff,                                                            'a': 0.9                                                        },                                                        'size': [                                                            0x9ea + -0xe18 * 0x2 + 0x1247,                                                            0xe86 + 0xf0d * 0x1 + -0x5ea * 0x5 + 0.5                                                        ]                                                    });                                                    _0x284638[_0x21ad75(0x530)] = new THREE[(_0x21ad75(0x521))](-0x12 * 0x45 + 0x14 * -0x158 + 0x1fba + 0.5, -0x1 * 0x17f9 + -0x1 * -0x4cd + -0x132d * -0x1), _0x284638[_0x21ad75(0x59d)][_0x21ad75(0x5eb)](0x5fe * 0x1 + -0xdd4 + -0x7d6 * -0x1, -0x23 * 0xcc + 0x2f * 0x57 + -0x1b4 * -0x7 + 0.19999999999999996, -0xa4 * -0x2 + 0x1761 + -0x6b * 0x3b), _0x284638[_0x21ad75(0x5c0)] = _0x466a4d[_0x21ad75(0x615)], _0x351f2a[_0x21ad75(0x1cf)](_0x284638), allRoomObjs[_0x21ad75(0x557)](_0x351f2a);                                                } else {                                                    if (_0x466a4d[_0x21ad75(0x62e)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x624)]))                                                        _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0x4e3 * -0x1 + -0x1 * 0x1ee3 + 0x5f8 * 0x6, 0x1 * 0xa97 + 0x1fd6 * -0x1 + 0x1549 * 0x1, -0x1bcc + 0x2317 + -0x741), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x1 * 0x1b5f + -0x21d3 + 0x6 * 0x1ba, posuiRoom = _0x351f2a, allRoomObjs[_0x21ad75(0x557)](_0x351f2a);                                                    else {                                                        if (_0x466a4d[_0x21ad75(0x38f)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x505)]))                                                            _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0x1de3 * 0x1 + -0x1121 + -0xcb8, 0x28 * 0xa + 0x258b + 0x1 * -0x2711, -0x1a78 + 0x232 * 0x7 + 0xb24), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x4 * 0x733 + -0x22a0 + -0x164 * -0x7, shaifenRoom = _0x351f2a, allRoomObjs[_0x21ad75(0x557)](_0x351f2a);                                                        else {                                                            if (_0x466a4d[_0x21ad75(0x572)](_0x351f2a[_0x21ad75(0x5c0)], '树'))                                                                _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0x1 * -0x1174 + -0x2 * -0x75e + 0x2c2, -0x1 * -0x559 + -0x3 * 0x20d + -0x6 * -0x24, -0x685 * 0x5 + 0x2669 + 0x1 * -0x5c6), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x49 + -0x14d2 + 0x1871;                                                            else {                                                                if (_0x466a4d[_0x21ad75(0x389)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x296)]))                                                                    _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x1db1 + 0x61d + -0x179e * -0x1, -0x24d7 + -0x1f41 + -0xb5b * -0x6, 0x1f73 + 0x14a7 + -0x188 * 0x22), _0x351f2a[_0x21ad75(0x2b0)] = ![], _0x351f2a[_0x21ad75(0x59d)]['y'] = -0x2027 + -0x3ba + 0x27c9, fourColorPic = _0x351f2a;                                                                else {                                                                    if (_0x466a4d[_0x21ad75(0x5ee)](_0x351f2a[_0x21ad75(0x5c0)], _0x466a4d[_0x21ad75(0x445)]))                                                                        _0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](-0x51 * -0x4f + 0x235e + -0x3c53, 0xc2f + -0x1 * -0x3e1 + 0x7 * -0x24a, -0x576 * -0x5 + 0xaa1 + -0x25e5), _0x351f2a[_0x21ad75(0x59d)]['y'] = 0x1e16 * -0x1 + 0x23c * 0xd + 0x4f2, suishiRoom = _0x351f2a, allRoomObjs[_0x21ad75(0x557)](_0x351f2a);                                                                    else                                                                        _0x466a4d[_0x21ad75(0x4c4)](_0x351f2a[_0x21ad75(0x5c0)], '车') && (_0x351f2a[_0x21ad75(0x1d6)][_0x21ad75(0x5eb)](0xb * -0x2f9 + -0x412 * 0x5 + 0x3517, 0xf7 + 0x76 * 0x4c + -0x23f5, 0x1cf * -0x15 + -0x1c5 * 0x13 + 0x23d2 * 0x2), _0x351f2a[_0x21ad75(0x59d)][_0x21ad75(0x5eb)](-(0x1b94 + -0xe24 + 0x2 * -0x329 + 0.9900000000000091), -0x1 * 0x605 + -0x1e73 + 0x2522, -(-0x1131 + 0x2315 + 0x62 * -0x18 + 0.42000000000007276)), _0x351f2a[_0x21ad75(0x2b0)] = ![], carMesh = _0x351f2a);                                                                }                                                            }                                                        }                                                    }                                                }                                            }                                        }                                    }                                }                            }                        }                    }                }            }        }        _0x351f2a[_0x21ad75(0x527)](_0x630886 => {            const _0x97b458 = _0x21ad75, _0x3a0b1f = {                    'OmIPR': function (_0x147f3a, _0x52c652) {                        const _0x1c8b2e = _0x4bde;                        return _0x466a4d[_0x1c8b2e(0x507)](_0x147f3a, _0x52c652);                    },                    'TUquH': _0x466a4d[_0x97b458(0x3e6)],                    'xoVsZ': _0x466a4d[_0x97b458(0x317)],                    'LVNAz': _0x466a4d[_0x97b458(0x503)]                };            if (_0x630886[_0x97b458(0x3fc)]) {                _0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x31f)]) && (_0x630886[_0x97b458(0x5d8)][_0x97b458(0x217) + 't'] = !![], _0x630886[_0x97b458(0x1c7) + 'r'] = 0x5 * -0x3e8 + -0xbd * -0x17 + 0x355 * 0x1);                if (_0x466a4d[_0x97b458(0x5b5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x496)]) || _0x466a4d[_0x97b458(0x214)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4d5)]) || _0x466a4d[_0x97b458(0x1d0)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x20c)]) || _0x466a4d[_0x97b458(0x608)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5d1)]) || _0x466a4d[_0x97b458(0x1a4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1ac)]) || _0x466a4d[_0x97b458(0x640)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2e3)]) || _0x466a4d[_0x97b458(0x38e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4f9)]) || _0x466a4d[_0x97b458(0x4d3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5b3)]) || _0x466a4d[_0x97b458(0x469)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x564)]))                    _0x630886[_0x97b458(0x32d) + _0x97b458(0x1be)] = ![];                else {                    if (_0x466a4d[_0x97b458(0x47a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x574)]) || _0x466a4d[_0x97b458(0x203)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x612)])) {                        const _0x3b42ee = _0x466a4d[_0x97b458(0x549)][_0x97b458(0x524)]('|');                        let _0x1213d1 = -0x608 * -0x1 + -0x13 * 0x141 + 0x11cb;                        while (!![]) {                            switch (_0x3b42ee[_0x1213d1++]) {                            case '0':                                _0x630886[_0x97b458(0x1c7) + 'r'] = -0x2c * 0x5 + -0x17a7 * -0x1 + -0x158b;                                continue;                            case '1':                                _0x630886[_0x97b458(0x5d8)][_0x97b458(0x217) + 't'] = !![];                                continue;                            case '2':                                _0x630886[_0x97b458(0x5d8)][_0x97b458(0x52d)] = -0x196f + -0x8a0 + -0x220f * -0x1 + 0.5;                                continue;                            case '3':                                _0x630886[_0x97b458(0x3d6)] = ![];                                continue;                            case '4':                                _0x630886[_0x97b458(0x32d) + _0x97b458(0x1be)] = ![];                                continue;                            }                            break;                        }                    } else {                        if (_0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x553)]))                            _0x630886[_0x97b458(0x5d8)][_0x97b458(0x365)] = -0x21b3 + 0x2475 + -0x2c2, _0x630886[_0x97b458(0x5d8)][_0x97b458(0x3ca)] = -0xa53 + -0x2689 * 0x1 + 0x30dc + 0.3;                        else {                            if (_0x466a4d[_0x97b458(0x242)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1da)]))                                _0x630886[_0x97b458(0x5d8)][_0x97b458(0x217) + 't'] = !![], _0x630886[_0x97b458(0x1c7) + 'r'] = 0x2437 + 0x1 * -0x1e0a + 0x9 * -0x8b;                            else                                (_0x466a4d[_0x97b458(0x22c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4d4)]) || _0x466a4d[_0x97b458(0x3bb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x430)])) && (_0x630886[_0x97b458(0x2b0)] = ![]);                        }                    }                }                if (_0x466a4d[_0x97b458(0x25c)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x296)])) {                    const _0x2c9e92 = _0x466a4d[_0x97b458(0x328)][_0x97b458(0x524)]('|');                    let _0x3d0ec2 = 0x27 * 0x55 + 0x24d * 0x10 + -0x31c3 * 0x1;                    while (!![]) {                        switch (_0x2c9e92[_0x3d0ec2++]) {                        case '0':                            _0x466a4d[_0x97b458(0x1f6)](setOpacityMaterial, _0x630886);                            continue;                        case '1':                            _0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x355)]) ? _0x630886[_0x97b458(0x1c7) + 'r'] = 0x1f56 + 0x1 * 0x11b5 + -0x5 * 0x991 : _0x630886[_0x97b458(0x1c7) + 'r'] = -0x1b7f * -0x1 + -0x2590 + -0x3bf * -0x3;                            continue;                        case '2':                            _0x630886[_0x97b458(0x3d6)] = ![];                            continue;                        case '3':                            _0x630886[_0x97b458(0x32d) + _0x97b458(0x1be)] = ![];                            continue;                        case '4':                            _0x630886[_0x97b458(0x5d8)][_0x97b458(0x2e6)] = ![];                            continue;                        }                        break;                    }                } else {                    if (_0x466a4d[_0x97b458(0x1d0)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x514)])) {                        const _0x438838 = _0x466a4d[_0x97b458(0x57b)][_0x97b458(0x524)]('|');                        let _0x10e2b1 = -0x5b2 + -0x141 * 0x12 + -0x36 * -0x86;                        while (!![]) {                            switch (_0x438838[_0x10e2b1++]) {                            case '0':                                _0x630886[_0x97b458(0x3d6)] = ![];                                continue;                            case '1':                                _0x630886[_0x97b458(0x32d) + _0x97b458(0x1be)] = ![];                                continue;                            case '2':                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x3f6) + 'ty'] = !![];                                continue;                            case '3':                                container[_0x97b458(0x63c)](_0x630886);                                continue;                            case '4':                                roadPlane[_0x97b458(0x557)](_0x630886);                                continue;                            case '5':                                _0x630886[_0x97b458(0x2b0)] = ![];                                continue;                            }                            break;                        }                    } else {                        if (_0x466a4d[_0x97b458(0x314)](_0x351f2a[_0x97b458(0x5c0)], '树'))                            _0x630886[_0x97b458(0x1c7) + 'r'] = 0x6 * 0x38b + -0x2bf + -0x114d * 0x1;                        else                            (_0x466a4d[_0x97b458(0x260)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x50f)]) || _0x466a4d[_0x97b458(0x36e)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5af)]) || _0x466a4d[_0x97b458(0x38e)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x52a)]) || _0x466a4d[_0x97b458(0x4d3)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x23c)]) || _0x466a4d[_0x97b458(0x433)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x624)]) || _0x466a4d[_0x97b458(0x3a4)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x505)]) || _0x466a4d[_0x97b458(0x22c)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x445)])) && allOutSideBuild[_0x97b458(0x557)](_0x630886);                    }                }                (_0x466a4d[_0x97b458(0x3bb)](_0x351f2a[_0x97b458(0x5c0)], '草坪') || _0x466a4d[_0x97b458(0x58e)](_0x351f2a[_0x97b458(0x5c0)], '地面')) && _0x466a4d[_0x97b458(0x211)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1da)]) && _0x466a4d[_0x97b458(0x211)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x574)]) && _0x466a4d[_0x97b458(0x4b2)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x612)]) && (_0x630886[_0x97b458(0x5d8)][_0x97b458(0x217) + 't'] = ![]);                if (_0x466a4d[_0x97b458(0x49f)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x23c)])) {                    if (_0x466a4d[_0x97b458(0x5c9)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x536)]) || _0x466a4d[_0x97b458(0x608)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x357)]) || _0x466a4d[_0x97b458(0x520)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x57f)]) || _0x466a4d[_0x97b458(0x640)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x600)]) || _0x466a4d[_0x97b458(0x401)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x346)]) || _0x466a4d[_0x97b458(0x1f2)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x598)]) || _0x466a4d[_0x97b458(0x4c8)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x27c)]) || _0x466a4d[_0x97b458(0x4c8)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2f4)])) {                        if (_0x466a4d[_0x97b458(0x5f9)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x357)]))                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x351)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                -(-0x14c9 + -0x26cb + 0x4ae3 + 0.13000000000010914),                                0x1a98 + -0x1708 + 0x4 * -0xd5 + 0.7000000000000028,                                -(-0x25bd * 0x1 + -0x967 * 0x1 + 0x346f + 0.4700000000000273)                            ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                -(-0x8c5 + -0x128c + 0x2a15 + 0.8220000000001164),                                0x2 * -0x16a + -0x1c6 * -0x5 + -0x57d + 0.12569999999999482,                                -(0x162b + 0xd78 + 0x2c7 * -0xb + 0.5217000000000098)                            ];                        else {                            if (_0x466a4d[_0x97b458(0x2f7)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x57f)]))                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x34d)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                    -(-0x3f9 * 0x1 + -0x4a9 * -0x4 + 0x5 * 0xb + 0.09999999999990905),                                    -0x39 * 0x63 + 0x2 * -0x579 + 0x213a + 0.13000000000000256,                                    -(-0x1fc3 + 0x116d + -0x14f * -0xf + 0.4700000000000273)                                ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                    -(-0x1de * -0x2 + -0x47 * 0x87 + 0x1 * 0x301e + 0.09639999999990323),                                    0x21f7 + -0x84 + 0x107b * -0x2 + 0.747799999999998,                                    -(0x49 * 0x19 + 0x1785 * -0x1 + 0x1582 + 0.08330000000000837)                                ];                            else {                                if (_0x466a4d[_0x97b458(0x315)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x600)]))                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x48f)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(-0xe4b + -0x682 * 0x1 + 0x2342 + 0.40000000000009095),                                        -0xb80 + -0x69 * -0x23 + -0x29f + 0.7000000000000028,                                        -(-0x171e + 0x10 * 0xcb + -0xfb9 * -0x1 + 0.4700000000000273)                                    ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(0x49a + -0x1 * -0x335 + 0x4 * 0x18a + 0.17270000000007713),                                        -0x550 * 0x2 + -0xc6a + 0x12 * 0x14f + 0.37760000000000105,                                        -(-0x1a02 + 0x22 * -0x65 + 0x2c8a + 0.06400000000007822)                                    ];                                else {                                    if (_0x466a4d[_0x97b458(0x5ef)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x346)]))                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x1af)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                            -(-0x12c4 + -0x2c * -0x8f + 0x821 + 0.8000000000001819),                                            -0x10f * -0x1 + 0xf5e + -0x5 * 0x33d + 0.759999999999998,                                            -(-0x3a1 * 0x7 + 0x21f0 + -0x33e + 0.4700000000000273)                                        ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                            -(0x34d * 0x8 + 0x13c6 + -0x8 * 0x418 + 0.4108000000001084),                                            -0x14c2 + 0x1948 + -0x100 * 0x4 + 0.29110000000000014,                                            -(-0xd67 * 0x1 + -0x13d5 + -0x11 * -0x241 + 0.04680000000007567)                                        ];                                    else {                                        if (_0x466a4d[_0x97b458(0x321)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x598)]))                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x31a)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                -(0x1a10 * 0x1 + -0xbb1 + -0x5 * 0x2e + 0.23999999999978172),                                                -0x3 * 0x49f + -0x1c4c * -0x1 + -0xe32 + 0.240000000000002,                                                -(-0x2124 + 0x2699 + -0x2a + 0.4700000000000273)                                            ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                -(0x22c5 + -0xd * -0x1d3 + -0x8 * 0x5b1 + 0.14550000000008367),                                                0x1 * 0x369 + -0xabc + 0x4 * 0x1f3 + 0.7939999999999969,                                                -(0xb12 + -0x12a7 + -0x2 * -0x65b + 0.615500000000111)                                            ];                                        else {                                            if (_0x466a4d[_0x97b458(0x37e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x27c)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3ea)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                    -(-0x16f * 0x4 + 0x230d + 0x1a * -0xa1 + 0.0500000000001819),                                                    0x18b6 + 0xd9 * 0x5 + 0x126 * -0x19 + 0.5600000000000023,                                                    -(0x3f9 * 0x9 + 0x1700 + -0x3576 + 0.4700000000000273)                                                ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                    -(-0xab5 + -0x1 * 0x837 + 0x8 * 0x3ee + 0.5981000000001586),                                                    -0x44 * 0x11 + -0x7b * -0x15 + 0x517 * -0x1 + 0.6037000000000035,                                                    -(-0x1a * -0x1 + -0xa5 * 0x11 + 0xffc + 0.42249999999989996)                                                ];                                            else                                                _0x466a4d[_0x97b458(0x519)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2f4)]) && (_0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4f5)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                    -(-0x503 * 0x7 + -0x822 + 0x75 * 0x7a + 0.5300000000002001),                                                    0x24f8 + 0x12 * -0x226 + 0x1f1 + 0.5200000000000031,                                                    -(0x6d * -0x3e + 0x1c08 + 0x3a9 + 0.4700000000000273)                                                ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                    -(-0x12 * -0x2b + 0x1b63 + -0x125a + 0.7321000000001732),                                                    -0x1 * -0x16e6 + -0x15 * -0x1d + 0x1 * -0x18cd + 0.6145000000000067,                                                    -(0x2 * 0xf00 + 0x1 * 0x1cda + -0x422 * 0xd + 0.8221000000000913)                                                ]);                                        }                                    }                                }                            }                        }                        let _0x39d1b8 = _0x630886[_0x97b458(0x5c0)][_0x97b458(0x635)](0x1a99 + 0x1 * -0x72b + -0x1369, 0xe8d + -0x1d41 + 0x1a * 0x91);                        _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x231)](_0x466a4d[_0x97b458(0x471)], _0x39d1b8), limoClickObjs[_0x97b458(0x557)](_0x630886);                    } else {                        if (_0x466a4d[_0x97b458(0x1bb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x410)]) || _0x466a4d[_0x97b458(0x1e5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x50d)]) || _0x466a4d[_0x97b458(0x469)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x363)]) || _0x466a4d[_0x97b458(0x259)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x252)]) || _0x466a4d[_0x97b458(0x57c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x221)]) || _0x466a4d[_0x97b458(0x294)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x585)]) || _0x466a4d[_0x97b458(0x44c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x322)]) || _0x466a4d[_0x97b458(0x601)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x334)])) {                            let _0x1ad22f = _0x630886[_0x97b458(0x5c0)][_0x97b458(0x635)](-0x8 * -0x305 + 0x45 * 0x8b + 0x3d99 * -0x1);                            _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x231)](_0x466a4d[_0x97b458(0x1bf)], _0x1ad22f), limoClickObjs[_0x97b458(0x557)](_0x630886);                        } else {                            if (_0x466a4d[_0x97b458(0x234)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x241)]) || _0x466a4d[_0x97b458(0x2ea)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1ea)]) || _0x466a4d[_0x97b458(0x651)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x586)]) || _0x466a4d[_0x97b458(0x519)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5ed)]) || _0x466a4d[_0x97b458(0x57c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5f6)]) || _0x466a4d[_0x97b458(0x1f2)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x516)]) || _0x466a4d[_0x97b458(0x25c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2a1)]) || _0x466a4d[_0x97b458(0x44b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x597)]) || _0x466a4d[_0x97b458(0x314)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x60d)]) || _0x466a4d[_0x97b458(0x4c5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x44d)])) {                                const _0x2e2203 = _0x466a4d[_0x97b458(0x3c7)][_0x97b458(0x524)]('|');                                let _0x19ae04 = -0x1 * -0x111a + 0x133 + 0x3a9 * -0x5;                                while (!![]) {                                    switch (_0x2e2203[_0x19ae04++]) {                                    case '0':                                        _0x466a4d[_0x97b458(0x4cc)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x586)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x5bf)]);                                        continue;                                    case '1':                                        _0x466a4d[_0x97b458(0x1c1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x241)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x37c)]);                                        continue;                                    case '2':                                        _0x466a4d[_0x97b458(0x57c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2a1)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x2d2)]);                                        continue;                                    case '3':                                        _0x466a4d[_0x97b458(0x24b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x60d)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x26d)]);                                        continue;                                    case '4':                                        _0x466a4d[_0x97b458(0x49f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x44d)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x578)]);                                        continue;                                    case '5':                                        _0x466a4d[_0x97b458(0x401)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x516)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x331)]);                                        continue;                                    case '6':                                        _0x466a4d[_0x97b458(0x232)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1ea)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x303)]);                                        continue;                                    case '7':                                        _0x466a4d[_0x97b458(0x5e1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x597)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x5f0)]);                                        continue;                                    case '8':                                        _0x466a4d[_0x97b458(0x4bb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5f6)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x1e3)]);                                        continue;                                    case '9':                                        _0x466a4d[_0x97b458(0x4dd)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5ed)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x5e7)]);                                        continue;                                    case '10':                                        limoClickObjs[_0x97b458(0x557)](_0x630886);                                        continue;                                    }                                    break;                                }                            } else {                                if (_0x466a4d[_0x97b458(0x4c1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x492)]) || _0x466a4d[_0x97b458(0x2e5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x478)]) || _0x466a4d[_0x97b458(0x5b5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x59b)]) || _0x466a4d[_0x97b458(0x1d1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x20f)]) || _0x466a4d[_0x97b458(0x1a4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x37d)]) || _0x466a4d[_0x97b458(0x546)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x515)]) || _0x466a4d[_0x97b458(0x469)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x554)]) || _0x466a4d[_0x97b458(0x25d)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x227)]) || _0x466a4d[_0x97b458(0x1fb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x335)]) || _0x466a4d[_0x97b458(0x54c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x34c)]) || _0x466a4d[_0x97b458(0x38e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x354)]) || _0x466a4d[_0x97b458(0x391)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x512)]) || _0x466a4d[_0x97b458(0x491)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x307)])) {                                    const _0x37c950 = _0x466a4d[_0x97b458(0x5a1)][_0x97b458(0x524)]('|');                                    let _0x476b70 = -0x125a + 0x1a41 + 0x77 * -0x11;                                    while (!![]) {                                        switch (_0x37c950[_0x476b70++]) {                                        case '0':                                            _0x466a4d[_0x97b458(0x4dd)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x59b)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x461)]);                                            continue;                                        case '1':                                            _0x466a4d[_0x97b458(0x1fc)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x478)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x517)]);                                            continue;                                        case '2':                                            limoClickObjs[_0x97b458(0x557)](_0x630886);                                            continue;                                        case '3':                                            _0x466a4d[_0x97b458(0x568)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x512)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x4c7)]);                                            continue;                                        case '4':                                            _0x466a4d[_0x97b458(0x4c1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x554)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x5fe)]);                                            continue;                                        case '5':                                            _0x466a4d[_0x97b458(0x259)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x515)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x5d2)]);                                            continue;                                        case '6':                                            _0x466a4d[_0x97b458(0x2d5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x354)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x4ce)]);                                            continue;                                        case '7':                                            _0x466a4d[_0x97b458(0x214)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x20f)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x454)]);                                            continue;                                        case '8':                                            _0x466a4d[_0x97b458(0x3cb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x37d)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x606)]);                                            continue;                                        case '9':                                            _0x466a4d[_0x97b458(0x601)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x227)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x27b)]);                                            continue;                                        case '10':                                            _0x466a4d[_0x97b458(0x315)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x34c)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x1e8)]);                                            continue;                                        case '11':                                            _0x466a4d[_0x97b458(0x1c1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x492)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x392)]);                                            continue;                                        case '12':                                            _0x466a4d[_0x97b458(0x640)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x307)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x2cc)]);                                            continue;                                        case '13':                                            _0x466a4d[_0x97b458(0x58e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x335)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x40c)]);                                            continue;                                        }                                        break;                                    }                                } else {                                    if (_0x466a4d[_0x97b458(0x1fb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x435)]) || _0x466a4d[_0x97b458(0x49b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x423)]) || _0x466a4d[_0x97b458(0x3cb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3f7)]) || _0x466a4d[_0x97b458(0x469)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4a4)]) || _0x466a4d[_0x97b458(0x43e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x60b)]) || _0x466a4d[_0x97b458(0x1ee)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x555)]) || _0x466a4d[_0x97b458(0x610)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5b0)]) || _0x466a4d[_0x97b458(0x22c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1db)])) {                                        let _0x10a720 = _0x630886[_0x97b458(0x5c0)][_0x97b458(0x635)](-0x1236 + 0x7f6 + 0xa45, 0x5 * -0x17 + -0x2110 + -0x55 * -0x65);                                        _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x1c8)](_0x466a4d[_0x97b458(0x449)], _0x10a720), limoClickObjs[_0x97b458(0x557)](_0x630886);                                    } else {                                        if (_0x466a4d[_0x97b458(0x3bf)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x318)]) || _0x466a4d[_0x97b458(0x232)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x61a)])) {                                            let _0x2255c9 = _0x630886[_0x97b458(0x5c0)][_0x97b458(0x635)](-0x7ed * 0x1 + 0x14a8 + 0x7 * -0x1d1, 0x393 + -0x915 * 0x3 + 0x1 * 0x17b1);                                            _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x1c8)](_0x466a4d[_0x97b458(0x228)], _0x2255c9), limoClickObjs[_0x97b458(0x557)](_0x630886);                                        } else                                            (_0x466a4d[_0x97b458(0x3b5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x545)]) || _0x466a4d[_0x97b458(0x1d0)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x343)]) || _0x466a4d[_0x97b458(0x4ff)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x47e)]) || _0x466a4d[_0x97b458(0x274)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x421)])) && (_0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)] = _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x5df)](), _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x2a6) + 'e'] = !![], limojiJiaodaiObjs[_0x97b458(0x557)](_0x630886));                                    }                                }                            }                        }                    }                    if (_0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x407)]) || _0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x3db)]) || _0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x483)]) && _0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)]('转动')) {                        if (_0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x483)])) {                            let _0x15f12f = _0x466a4d[_0x97b458(0x487)](_0x630886[_0x97b458(0x5c0)][_0x97b458(0x635)](-0xe9 * 0x4 + -0x19 * 0xd + 0x4ec, -0x503 * 0x5 + -0x15e * -0x3 + 0x14f9), -0x22b + -0x9 * 0xc5 + 0x919);                            limoRoomAnimation[_0x15f12f][_0x97b458(0x556)] = _0x630886;                        } else {                            if (_0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)]('动画')) {                                let _0x1ed64e = _0x466a4d[_0x97b458(0x487)](_0x630886[_0x97b458(0x5c0)][_0x97b458(0x635)](0xb * -0x59 + 0x1ee5 + 0x482 * -0x6, -0x5e * 0x57 + 0x3 * 0x68e + 0xc4f), -0x1ffa + 0x36 * -0xb4 + 0x45f3);                                _0x630886[_0x97b458(0x5d8)][_0x97b458(0x217) + 't'] = !![], limoRoomAnimation[_0x1ed64e][_0x97b458(0x3e7)][_0x97b458(0x557)](_0x630886), _0x630886[_0x97b458(0x1c7) + 'r'] = 0x1244 + 0x2 * -0xcd3 + 0x9ba;                            } else {                                let _0xe10317 = _0x466a4d[_0x97b458(0x437)](_0x630886[_0x97b458(0x5c0)][_0x97b458(0x635)](-0x25a5 * -0x1 + 0x1e0 + -0x277f), -0xf2d + 0x1 * -0x2185 + 0x30b3);                                limoRoomAnimation[_0xe10317][_0x97b458(0x217) + 't'][_0x97b458(0x557)](_0x630886);                            }                        }                    }                    if (_0x466a4d[_0x97b458(0x4ff)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3a5)])) {                        const _0x1d4e6f = _0x466a4d[_0x97b458(0x1c6)][_0x97b458(0x524)]('|');                        let _0x12ee3c = -0x2d6 + -0x162c + 0x6 * 0x42b;                        while (!![]) {                            switch (_0x1d4e6f[_0x12ee3c++]) {                            case '0':                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                    -(0x1 * 0x5bc + 0x2169 + -0x197a + 0.9589000000000851),                                    0xc24 * -0x1 + 0x3 * 0x59b + -0x462 + 0.33150000000000546,                                    -(-0x1 * 0xa1f + -0x5 * -0x3b3 + 0x4 * -0xa3 + 0.7609999999999673)                                ];                                continue;                            case '1':                                limoClickObjs[_0x97b458(0x557)](_0x630886);                                continue;                            case '2':                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                    -(0x26e * 0x1 + 0xd38 + -0xd * 0x27 + 0.8400000000001455),                                    0x2 * -0xfe5 + -0xf58 + 0x2f6a + 0.4300000000000068,                                    -(0x3 * -0x827 + 0x2677 + 0x81b * -0x1 + 0.07999999999992724)                                ];                                continue;                            case '3':                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x57e)];                                continue;                            case '4':                                cameraImportDeviceArrs[_0x97b458(0x557)](_0x630886);                                continue;                            case '5':                                _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x420)];                                continue;                            }                            break;                        }                    }                    if (_0x466a4d[_0x97b458(0x274)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5fd)]) || _0x466a4d[_0x97b458(0x405)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x551)]) || _0x466a4d[_0x97b458(0x2b4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2cf)]) || _0x466a4d[_0x97b458(0x23e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x278)]) || _0x466a4d[_0x97b458(0x38e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x31e)]) || _0x466a4d[_0x97b458(0x491)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x49a)]) || _0x466a4d[_0x97b458(0x201)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x22f)]) || _0x466a4d[_0x97b458(0x4d3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x216)]) || _0x466a4d[_0x97b458(0x2f7)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x42f)]) || _0x466a4d[_0x97b458(0x477)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x627)]) || _0x466a4d[_0x97b458(0x643)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x30d)]) || _0x466a4d[_0x97b458(0x304)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x42b)]) || _0x466a4d[_0x97b458(0x24b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x529)]) || _0x466a4d[_0x97b458(0x25d)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x625)]) || _0x466a4d[_0x97b458(0x232)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4e2)]) || _0x466a4d[_0x97b458(0x643)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x413)]) || _0x466a4d[_0x97b458(0x542)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5d7)]) || _0x466a4d[_0x97b458(0x2fb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x525)]) || _0x466a4d[_0x97b458(0x43a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x336)]) || _0x466a4d[_0x97b458(0x1f2)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2bd)])) {                        let _0x1c1846 = _0x466a4d[_0x97b458(0x53f)](makeTextSprite, _0x466a4d[_0x97b458(0x326)], {                            'fontsize': 0x14,                            'borderColor': {                                'r': 0xff,                                'g': 0x0,                                'b': 0x0,                                'a': 0.4                            },                            'backgroundColor': {                                'r': 0xff,                                'g': 0xff,                                'b': 0xff,                                'a': 0.9                            },                            'size': [                                -0xddb + -0x1d3 * -0xa + -0x3b * 0x13,                                -0x2 * 0x295 + 0x834 + -0x308                            ],                            'fontColor': {                                'r': 0x0,                                'g': 0x0,                                'b': 0x0,                                'a': 0x1                            }                        });                        _0x1c1846[_0x97b458(0x530)] = new THREE[(_0x97b458(0x521))](-0x5 * -0x50c + -0x98a + 0x7d9 * -0x2 + 0.5, -0x17f4 + -0x1ea3 + 0x3698), _0x1c1846[_0x97b458(0x59d)][_0x97b458(0x5eb)](-(-0x1297 + -0x2539 + 0xbc * 0x4c + 0.5), 0xcc1 + -0x1 * 0x1f09 + 0x1248, -(0x11ba * 0x2 + -0x21af + -0x1c4 + 0.19999999999999996)), _0x630886[_0x97b458(0x1cf)](_0x1c1846);                        if (_0x466a4d[_0x97b458(0x1d0)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5fd)])) {                            const _0x3846e4 = _0x466a4d[_0x97b458(0x5e3)][_0x97b458(0x524)]('|');                            let _0x5d5080 = 0x768 + -0x1292 + 0xb2a;                            while (!![]) {                                switch (_0x3846e4[_0x5d5080++]) {                                case '0':                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(0x14c0 + 0xb * 0xff + -0xeaf + 0.6300000000001091),                                        -0x22eb + -0x3f4 + 0x27b1 + 0.4000000000000057,                                        -(0x12e0 + 0x24e2 + 0x214 * -0x18 + 0.5599999999999454)                                    ];                                    continue;                                case '1':                                    limoCameraMesh[_0x97b458(0x557)](_0x630886);                                    continue;                                case '2':                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x638)];                                    continue;                                case '3':                                    _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                    continue;                                case '4':                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(-0x1a * -0x73 + 0x5 * -0x179 + 0xcb6 + 0.017300000000432192),                                        0xc0a + 0xe9a + -0x19ce + 0.9303999999999917,                                        -(-0x1db9 + 0x1b79 + -0x1 * -0x805 + 0.9589000000000851)                                    ];                                    continue;                                case '5':                                    limoClickObjs[_0x97b458(0x557)](_0x630886);                                    continue;                                }                                break;                            }                        } else {                            if (_0x466a4d[_0x97b458(0x219)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x551)])) {                                const _0x171def = _0x466a4d[_0x97b458(0x5bd)][_0x97b458(0x524)]('|');                                let _0x7aa400 = -0xa25 * 0x2 + 0x261b * 0x1 + -0x11d1;                                while (!![]) {                                    switch (_0x171def[_0x7aa400++]) {                                    case '0':                                        limoClickObjs[_0x97b458(0x557)](_0x630886);                                        continue;                                    case '1':                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                            -(0xa89 + -0xae1 + 0x113a + 0.5299999999997453),                                            0x25 * 0x67 + 0xe89 + -0x1c81 + 0.18139999999999645,                                            -(-0xe * 0x2 + -0xd7d + 0x1366 + 0.012199999999893407)                                        ];                                        continue;                                    case '2':                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                            -(0x21eb * 0x1 + 0xf49 + -0x18a * 0x15 + 0.5299999999997453),                                            0x1c * 0x9 + -0x1b + 0x4 + 0.36000000000001364,                                            -(0x2370 + -0x55 * 0x10 + 0x183b * -0x1 + 0.15000000000009095)                                        ];                                        continue;                                    case '3':                                        limoCameraMesh[_0x97b458(0x557)](_0x630886);                                        continue;                                    case '4':                                        _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                        continue;                                    case '5':                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x52c)];                                        continue;                                    }                                    break;                                }                            } else {                                if (_0x466a4d[_0x97b458(0x47a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x529)])) {                                    const _0x53e234 = _0x466a4d[_0x97b458(0x5d4)][_0x97b458(0x524)]('|');                                    let _0x24939b = -0x1 * 0x2419 + -0x2c * -0x77 + -0x3 * -0x537;                                    while (!![]) {                                        switch (_0x53e234[_0x24939b++]) {                                        case '0':                                            limoClickObjs[_0x97b458(0x557)](_0x630886);                                            continue;                                        case '1':                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4c9)];                                            continue;                                        case '2':                                            limoCameraMesh[_0x97b458(0x557)](_0x630886);                                            continue;                                        case '3':                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                -(0x685 * -0x5 + -0x1 * -0x1387 + 0xda * 0x20 + 0.38000000000010914),                                                0x12 * 0x20b + -0xb01 + 0x2 * -0xc7b + 0.9900000000000091,                                                -(-0x24e1 + 0xe86 + 0x1c3a * 0x1 + 0.2799999999999727)                                            ];                                            continue;                                        case '4':                                            _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                            continue;                                        case '5':                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                -(0x24aa + 0x1bb5 + 0x505 * -0xa + 0.8478000000000065),                                                -0x14b2 + 0x184d + -0x3 * 0xed + 0.7644999999999982,                                                -(-0xb * -0x22a + 0x31 * 0x1 + -0x91a * 0x2 + 0.6348000000000411)                                            ];                                            continue;                                        }                                        break;                                    }                                } else {                                    if (_0x466a4d[_0x97b458(0x623)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x42b)])) {                                        const _0x269ea3 = _0x466a4d[_0x97b458(0x4fa)][_0x97b458(0x524)]('|');                                        let _0x9961e2 = 0x1 * 0xf58 + -0x116c + 0x4c * 0x7;                                        while (!![]) {                                            switch (_0x269ea3[_0x9961e2++]) {                                            case '0':                                                limoClickObjs[_0x97b458(0x557)](_0x630886);                                                continue;                                            case '1':                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x396)];                                                continue;                                            case '2':                                                limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                continue;                                            case '3':                                                _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                continue;                                            case '4':                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                    -(-0x1 * 0x17d + -0x1375 + 0x2145 * 0x1 + 0.2300000000000182),                                                    0x2205 + -0xd18 + -0x141c + 0.009999999999990905,                                                    -(-0x8 * 0xce + -0x33 * -0x1b + -0x2 * -0x377 + 0.36999999999989086)                                                ];                                                continue;                                            case '5':                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                    -(0x4 * -0x65b + -0x22b + 0xd * 0x312 + 0.09439999999995052),                                                    -0xc7f * 0x1 + -0x126a * 0x1 + 0x1fc1 + 0.20939999999998804,                                                    -(-0x2 * -0x942 + -0x3 * -0x4c6 + 0x17 * -0x12d + 0.3362999999999374)                                                ];                                                continue;                                            }                                            break;                                        }                                    } else {                                        if (_0x466a4d[_0x97b458(0x629)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x216)])) {                                            const _0x4d504a = _0x466a4d[_0x97b458(0x5ab)][_0x97b458(0x524)]('|');                                            let _0x2b71f5 = -0x9 * 0x2e3 + -0x1 * 0x52c + 0x1f27;                                            while (!![]) {                                                switch (_0x4d504a[_0x2b71f5++]) {                                                case '0':                                                    limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                    continue;                                                case '1':                                                    _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                    continue;                                                case '2':                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                        -(0xf8 + -0x1d8e + 0x2c8c * 0x1 + 0.4299999999998363),                                                        -0x1 * -0x1dc9 + 0x22cd * -0x1 + 0x2 * 0x2a1 + 0.5399999999999991,                                                        -(-0x89c + 0x1326 + 0x4fc * -0x1 + 0.5199999999999818)                                                    ];                                                    continue;                                                case '3':                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x5b2)];                                                    continue;                                                case '4':                                                    limoClickObjs[_0x97b458(0x557)](_0x630886);                                                    continue;                                                case '5':                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                        -(-0x11b8 + 0x197f + 0x1a3 * 0x5 + 0.611699999999928),                                                        -0x3 * 0x39f + -0x1284 + 0xed5 * 0x2 + 0.432699999999997,                                                        -(0x1686 + -0x1053 + -0x2 * 0x60 + 0.6868999999999232)                                                    ];                                                    continue;                                                }                                                break;                                            }                                        } else {                                            if (_0x466a4d[_0x97b458(0x259)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x22f)])) {                                                const _0x328384 = _0x466a4d[_0x97b458(0x1fe)][_0x97b458(0x524)]('|');                                                let _0x5d2b9b = -0x4a * 0x3b + -0x209a + 0x38c * 0xe;                                                while (!![]) {                                                    switch (_0x328384[_0x5d2b9b++]) {                                                    case '0':                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                            -(0xa50 + 0x804 * -0x3 + 0x1d82 + 0.11700000000018917),                                                            -0x320 + -0x450 + 0x7a6 + 0.02790000000000248,                                                            -(-0x23 * -0x30 + 0x1 * -0x2f6 + 0x1f3 + 0.1534999999998945)                                                        ];                                                        continue;                                                    case '1':                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x53e)];                                                        continue;                                                    case '2':                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                            -(-0x1 * -0x1042 + 0x1022 + -0x109f + 0.849999999999909),                                                            0x6f7 * -0x4 + -0x1 * -0xf1d + 0xcf0 + 0.5200000000000031,                                                            -(-0x2f * 0xb9 + 0x135b + 0x1415 + 0.44000000000005457)                                                        ];                                                        continue;                                                    case '3':                                                        limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                        continue;                                                    case '4':                                                        limoClickObjs[_0x97b458(0x557)](_0x630886);                                                        continue;                                                    case '5':                                                        _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                        continue;                                                    }                                                    break;                                                }                                            } else {                                                if (_0x466a4d[_0x97b458(0x58c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2cf)])) {                                                    const _0x228942 = _0x466a4d[_0x97b458(0x649)][_0x97b458(0x524)]('|');                                                    let _0x4cb6cf = 0x1765 + -0x11b * -0x2 + 0x45 * -0x5f;                                                    while (!![]) {                                                        switch (_0x228942[_0x4cb6cf++]) {                                                        case '0':                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                -(0x38f * 0x1 + 0x1 * -0x15b0 + 0x21b5 + 0.8874000000000706),                                                                0x1b44 * 0x1 + -0x881 * -0x2 + -0x2c00 + 0.22119999999999607,                                                                -(-0x112f + 0xe7f + 0x827 + 0.24080000000003565)                                                            ];                                                            continue;                                                        case '1':                                                            limoClickObjs[_0x97b458(0x557)](_0x630886);                                                            continue;                                                        case '2':                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4d7)];                                                            continue;                                                        case '3':                                                            limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                            continue;                                                        case '4':                                                            _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                            continue;                                                        case '5':                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                -(0xe7 + -0x12e * -0x17 + -0xc76 + 0.7699999999999818),                                                                0x21bb + -0x2420 + -0x5 * -0x87 + 0.46000000000000085,                                                                -(-0x1a7e + -0x1fe3 + 0x3fef + 0.7999999999999545)                                                            ];                                                            continue;                                                        }                                                        break;                                                    }                                                } else {                                                    if (_0x466a4d[_0x97b458(0x616)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x42f)])) {                                                        const _0x2cda84 = _0x466a4d[_0x97b458(0x543)][_0x97b458(0x524)]('|');                                                        let _0x52af91 = 0x1 * 0x1bb5 + 0x1960 + -0x3515;                                                        while (!![]) {                                                            switch (_0x2cda84[_0x52af91++]) {                                                            case '0':                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                    -(-0x49d + -0x2 * 0x59e + 0x1f3c + 0.6415000000001783),                                                                    -0x5 * 0x5e7 + 0x1992 * 0x1 + 0x42b + 0.7391000000000005,                                                                    -(-0xf1 * -0x25 + -0x5bf * -0x3 + 0x2 * -0x1741 + 0.15450000000009823)                                                                ];                                                                continue;                                                            case '1':                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                    -(0x7 * -0x119 + -0x1311 + -0x605 * -0x7 + 0.32999999999992724),                                                                    -0x55b * -0x7 + 0x919 * 0x3 + -0xceb * 0x5 + 0.3999999999999986,                                                                    -(-0x1e7a + 0x1 * -0x126e + -0x1 * -0x3661 + 0.15000000000009095)                                                                ];                                                                continue;                                                            case '2':                                                                limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                continue;                                                            case '3':                                                                _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                continue;                                                            case '4':                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3b1)];                                                                continue;                                                            case '5':                                                                limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                continue;                                                            }                                                            break;                                                        }                                                    } else {                                                        if (_0x466a4d[_0x97b458(0x1e5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x49a)])) {                                                            const _0x579670 = _0x466a4d[_0x97b458(0x4ad)][_0x97b458(0x524)]('|');                                                            let _0x94ccde = -0x3c0 + -0xc * 0x1ca + -0x434 * -0x6;                                                            while (!![]) {                                                                switch (_0x579670[_0x94ccde++]) {                                                                case '0':                                                                    limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                    continue;                                                                case '1':                                                                    limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                    continue;                                                                case '2':                                                                    _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                    continue;                                                                case '3':                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                        -(-0x57 * 0x47 + 0x594 + -0x21b5 * -0x1 + 0.7399999999997817),                                                                        -0x29 * 0x9b + -0x1f7f + 0x3890 + 0.39000000000000057,                                                                        -(-0x158e * 0x1 + -0x20ab * -0x1 + -0x1 * 0x58f + 0.6199999999998909)                                                                    ];                                                                    continue;                                                                case '4':                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                        -(0x33 * 0x3d + -0x608 + 0x90b + 0.2665999999999258),                                                                        -0x19c * 0xc + 0x1c12 + 0x43f * -0x2 + 0.9890999999999934,                                                                        -(0x1630 + -0x1581 + 0x1 * 0x4c3 + 0.46289999999999054)                                                                    ];                                                                    continue;                                                                case '5':                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3f8)];                                                                    continue;                                                                }                                                                break;                                                            }                                                        } else {                                                            if (_0x466a4d[_0x97b458(0x594)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x31e)])) {                                                                const _0x5e3159 = _0x466a4d[_0x97b458(0x2e4)][_0x97b458(0x524)]('|');                                                                let _0x4bed1e = 0x2ec + -0x266b + 0x27 * 0xe9;                                                                while (!![]) {                                                                    switch (_0x5e3159[_0x4bed1e++]) {                                                                    case '0':                                                                        _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                        continue;                                                                    case '1':                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                            -(0x4 * -0x509 + -0x1 * 0x2481 + 0x479b + 0.5599999999999454),                                                                            0x56d * -0x3 + 0xc2 * 0x1e + -0x644 + 0.28999999999999915,                                                                            -(-0x85b + -0x1e5f * 0x1 + 0x1f * 0x16d + 0.07999999999992724)                                                                        ];                                                                        continue;                                                                    case '2':                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x40f)];                                                                        continue;                                                                    case '3':                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                            -(0x404 * -0x4 + 0x2029 + 0x61 * -0x3 + 0.9744999999998072),                                                                            0xe3 * -0x21 + -0x720 + -0x2d1 * -0xd + 0.9065999999999974,                                                                            -(0x53 * 0x43 + 0x4 * -0x869 + -0x2eb * -0x6 + 0.6912999999999556)                                                                        ];                                                                        continue;                                                                    case '4':                                                                        limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                        continue;                                                                    case '5':                                                                        limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                        continue;                                                                    }                                                                    break;                                                                }                                                            } else {                                                                if (_0x466a4d[_0x97b458(0x321)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x278)])) {                                                                    const _0x540a56 = _0x466a4d[_0x97b458(0x1e4)][_0x97b458(0x524)]('|');                                                                    let _0x1121be = -0x13ab + -0x183 + -0x2 * -0xa97;                                                                    while (!![]) {                                                                        switch (_0x540a56[_0x1121be++]) {                                                                        case '0':                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                -(0xf2c + 0xa8 + 0x3 * -0x65 + 0.44000000000005457),                                                                                -0x1d74 + -0x1c91 * 0x1 + 0x3a43 + 0.5399999999999991,                                                                                -(0x219d + -0x122d + -0x9e2 + 0.6300000000001091)                                                                            ];                                                                            continue;                                                                        case '1':                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x2a2)];                                                                            continue;                                                                        case '2':                                                                            _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                            continue;                                                                        case '3':                                                                            limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                            continue;                                                                        case '4':                                                                            limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                            continue;                                                                        case '5':                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                -(-0x1d9d + -0x4 * 0x12d + 0x5 * 0x9cb + 0.6109000000001288),                                                                                -0xb * -0x1b8 + -0x100b + 0x1 * -0x296 + 0.045100000000005025,                                                                                -(-0xf44 + -0x45 * 0x51 + 0x2a8e + 0.9436000000000604)                                                                            ];                                                                            continue;                                                                        }                                                                        break;                                                                    }                                                                } else {                                                                    if (_0x466a4d[_0x97b458(0x375)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x525)])) {                                                                        const _0x391699 = _0x466a4d[_0x97b458(0x460)][_0x97b458(0x524)]('|');                                                                        let _0x2300ca = -0x33a + -0x47 * -0x35 + -0xb79;                                                                        while (!![]) {                                                                            switch (_0x391699[_0x2300ca++]) {                                                                            case '0':                                                                                _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                continue;                                                                            case '1':                                                                                limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                continue;                                                                            case '2':                                                                                limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                continue;                                                                            case '3':                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                    -(0xf2d + -0xbf + 0x1b + 0.7699999999999818),                                                                                    -0x17e * -0x11 + 0x74a * -0x1 + -0x11e3 + 0.13000000000000256,                                                                                    -(0xec3 * -0x1 + -0x37 * -0xb2 + -0x1202 + 0.14000000000010004)                                                                                ];                                                                                continue;                                                                            case '4':                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x48a)];                                                                                continue;                                                                            case '5':                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                    -(-0x1f01 + 0x2657 + -0x39a * -0x2 + 0.13079999999990832),                                                                                    -0x250e * 0x1 + 0x2 * 0x5a7 + 0x19f7 + 0.9864999999999995,                                                                                    -(-0x2527 + -0x17 * 0xb2 + -0x757 * -0x8 + 0.7817999999999756)                                                                                ];                                                                                continue;                                                                            }                                                                            break;                                                                        }                                                                    } else {                                                                        if (_0x466a4d[_0x97b458(0x249)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x627)])) {                                                                            const _0x59c196 = _0x466a4d[_0x97b458(0x235)][_0x97b458(0x524)]('|');                                                                            let _0x1e72a6 = 0x19b9 + -0x899 + -0x2 * 0x890;                                                                            while (!![]) {                                                                                switch (_0x59c196[_0x1e72a6++]) {                                                                                case '0':                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                        -(-0x90d * -0x2 + -0x22a8 + 0x1eb6 + 0.9200000000000728),                                                                                        0x4 * 0x58b + 0x8cb * -0x1 + -0x1 * 0xd1c + 0.38219999999999743,                                                                                        -(0x18e + 0x1be4 + -0x17fe + 0.19110000000000582)                                                                                    ];                                                                                    continue;                                                                                case '1':                                                                                    limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                    continue;                                                                                case '2':                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                        -(0x6a7 * -0x2 + -0x2180 + 0x3cf6 + 0.9200000000000728),                                                                                        -0x12b * -0x8 + 0xeef + -0x1809 + 0.39000000000000057,                                                                                        -(-0x1 * 0xd2d + -0x2244 + 0x34ff + 0.7999999999999545)                                                                                    ];                                                                                    continue;                                                                                case '3':                                                                                    _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                    continue;                                                                                case '4':                                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x5a8)];                                                                                    continue;                                                                                case '5':                                                                                    limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                    continue;                                                                                }                                                                                break;                                                                            }                                                                        } else {                                                                            if (_0x466a4d[_0x97b458(0x5e1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x336)])) {                                                                                const _0x44331d = _0x466a4d[_0x97b458(0x5a5)][_0x97b458(0x524)]('|');                                                                                let _0x5b7f19 = -0x2209 * 0x1 + -0x14f1 + 0x1 * 0x36fa;                                                                                while (!![]) {                                                                                    switch (_0x44331d[_0x5b7f19++]) {                                                                                    case '0':                                                                                        limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                        continue;                                                                                    case '1':                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                            -(-0x13cd + -0x1 * 0x255b + 0x472e + 0.3200000000001637),                                                                                            0xdbe + 0x1 * 0x1cd1 + -0x2a5e + 0.259999999999998,                                                                                            -(0x245d * -0x1 + -0x77f + 0x3155 + 0.19000000000005457)                                                                                        ];                                                                                        continue;                                                                                    case '2':                                                                                        limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                        continue;                                                                                    case '3':                                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x428)];                                                                                        continue;                                                                                    case '4':                                                                                        _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                        continue;                                                                                    case '5':                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                            -(-0x1 * -0xeed + -0x13 + 0x3 * -0x47 + 0.7928999999999178),                                                                                            -0xa7 * 0x27 + -0x5ea + 0x1f95 + 0.38870000000000005,                                                                                            -(-0x1 * -0xa75 + 0x20fa + -0x12ee * 0x2 + 0.13830000000007203)                                                                                        ];                                                                                        continue;                                                                                    }                                                                                    break;                                                                                }                                                                            } else {                                                                                if (_0x466a4d[_0x97b458(0x20a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x30d)])) {                                                                                    const _0x1bb754 = _0x466a4d[_0x97b458(0x3cf)][_0x97b458(0x524)]('|');                                                                                    let _0x5a55ff = 0x2 * 0x4bd + -0x2 * -0x52a + 0x82 * -0x27;                                                                                    while (!![]) {                                                                                        switch (_0x1bb754[_0x5a55ff++]) {                                                                                        case '0':                                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x426)];                                                                                            continue;                                                                                        case '1':                                                                                            limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                            continue;                                                                                        case '2':                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                -(0x913 + -0x4 * 0x425 + 0x152f + 0.15000000000009095),                                                                                                0xcd0 + -0x10d6 + 0x444 + 0.5,                                                                                                -(0x26e8 + -0x20ad * -0x1 + -0x4207 + 0.6600000000000819)                                                                                            ];                                                                                            continue;                                                                                        case '3':                                                                                            _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                            continue;                                                                                        case '4':                                                                                            limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                            continue;                                                                                        case '5':                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                -(-0xad * -0x14 + -0x1a3 + -0x1cd * -0x1 + 0.8344999999999345),                                                                                                -0x208 + 0x1dd0 + 0x1 * -0x1b7f + 0.36369999999999436,                                                                                                -(-0x1b36 + 0x3 * -0x4c + 0x47 * 0x79 + 0.3927000000001044)                                                                                            ];                                                                                            continue;                                                                                        }                                                                                        break;                                                                                    }                                                                                } else {                                                                                    if (_0x466a4d[_0x97b458(0x5c3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2bd)])) {                                                                                        const _0xafdc7b = _0x466a4d[_0x97b458(0x5b4)][_0x97b458(0x524)]('|');                                                                                        let _0x15c945 = -0x206 + 0x1 * -0xb73 + 0xd79;                                                                                        while (!![]) {                                                                                            switch (_0xafdc7b[_0x15c945++]) {                                                                                            case '0':                                                                                                limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                                continue;                                                                                            case '1':                                                                                                _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                                continue;                                                                                            case '2':                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                    -(0x1338 + -0x1d17 + 0x1d * 0xce + 0.2775000000001455),                                                                                                    -0x35 * -0x77 + 0xb8b + -0x11fb * 0x2 + 0.36430000000000007,                                                                                                    -(-0x3 * -0x8a7 + -0xa07 * -0x1 + -0xe5 * 0x22 + 0.31179999999994834)                                                                                                ];                                                                                                continue;                                                                                            case '3':                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                    -(-0x1 * 0x26ae + -0x26 * -0x1a + 0x304a + 0.13000000000010914),                                                                                                    -0x2009 + -0x38 * 0x20 + 0x273a + 0.38000000000000256,                                                                                                    -(0xd0f + -0x139d + 0xc07 + 0.14000000000010004)                                                                                                ];                                                                                                continue;                                                                                            case '4':                                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x2a9)];                                                                                                continue;                                                                                            case '5':                                                                                                limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                                continue;                                                                                            }                                                                                            break;                                                                                        }                                                                                    } else {                                                                                        if (_0x466a4d[_0x97b458(0x36e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4e2)])) {                                                                                            const _0x54105a = _0x466a4d[_0x97b458(0x5a7)][_0x97b458(0x524)]('|');                                                                                            let _0x3e2fc4 = -0xdb8 * -0x1 + 0x97a + 0x1 * -0x1732;                                                                                            while (!![]) {                                                                                                switch (_0x54105a[_0x3e2fc4++]) {                                                                                                case '0':                                                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4e3)];                                                                                                    continue;                                                                                                case '1':                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                        -(0x2ef * -0x5 + 0x4 * -0x800 + -0x1 * -0x3bf1 + 0.6837999999997919),                                                                                                        0x1 * -0x1f51 + -0x1782 + 0x3718 + 0.6285000000000025,                                                                                                        -(-0xc3d + 0x1ca1 + -0x1 * 0xaeb + 0.4522999999999229)                                                                                                    ];                                                                                                    continue;                                                                                                case '2':                                                                                                    limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                                    continue;                                                                                                case '3':                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                        -(-0x9 * -0x371 + -0x336 + 0xe7d * -0x1 + 0.5399999999999636),                                                                                                        -0x20ad + 0x1f62 + 0x189 + 0.4799999999999969,                                                                                                        -(-0x10cf + 0xa5 * -0x24 + -0x2d91 * -0x1 + 0.6900000000000546)                                                                                                    ];                                                                                                    continue;                                                                                                case '4':                                                                                                    _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                                    continue;                                                                                                case '5':                                                                                                    limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                                    continue;                                                                                                }                                                                                                break;                                                                                            }                                                                                        } else {                                                                                            if (_0x466a4d[_0x97b458(0x1b3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5d7)])) {                                                                                                const _0x36fdd8 = _0x466a4d[_0x97b458(0x2c3)][_0x97b458(0x524)]('|');                                                                                                let _0x31891e = 0x1 * 0x9b1 + 0x21a9 + -0x2b5a;                                                                                                while (!![]) {                                                                                                    switch (_0x36fdd8[_0x31891e++]) {                                                                                                    case '0':                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                            -(-0x1528 + -0x1392 + 0x35c4 + 0.7103000000001884),                                                                                                            0x1 * 0x6df + 0x5 * -0x2bf + 0x715 + 0.05100000000000193,                                                                                                            -(0x1255 * -0x1 + 0x1 * 0x235 + 0x15ae + 0.26909999999998035)                                                                                                        ];                                                                                                        continue;                                                                                                    case '1':                                                                                                        limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                                        continue;                                                                                                    case '2':                                                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x45b)];                                                                                                        continue;                                                                                                    case '3':                                                                                                        _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                                        continue;                                                                                                    case '4':                                                                                                        limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                                        continue;                                                                                                    case '5':                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                            -(-0x1a * -0x17a + -0x2281 + 0x928 + 0.2800000000002001),                                                                                                            -0x1e9e * -0x1 + -0x6b7 + 0x4be * -0x5 + 0.3299999999999983,                                                                                                            -(-0x127 + 0x371 * -0x3 + 0x10f3 * 0x1 + 0.2400000000000091)                                                                                                        ];                                                                                                        continue;                                                                                                    }                                                                                                    break;                                                                                                }                                                                                            } else {                                                                                                if (_0x466a4d[_0x97b458(0x1ee)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x625)])) {                                                                                                    const _0x162ca9 = _0x466a4d[_0x97b458(0x35d)][_0x97b458(0x524)]('|');                                                                                                    let _0x5d4225 = -0x4d5 * -0x1 + -0x137 * 0x4 + 0x1 * 0x7;                                                                                                    while (!![]) {                                                                                                        switch (_0x162ca9[_0x5d4225++]) {                                                                                                        case '0':                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                -(0xcfb * -0x2 + -0x1f57 + 0x4610 + 0.30999999999994543),                                                                                                                -0x124 * -0x20 + -0x21b4 + -0x147 * 0x2 + 0.5300000000000011,                                                                                                                -(-0xc34 * 0x2 + 0x9be + 0x1438 * 0x1 + 0.7100000000000364)                                                                                                            ];                                                                                                            continue;                                                                                                        case '1':                                                                                                            limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                                            continue;                                                                                                        case '2':                                                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x2d7)];                                                                                                            continue;                                                                                                        case '3':                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                -(0x1ddb + -0x38c * -0x1 + 0x4 * -0x529 + 0.584400000000187),                                                                                                                0x16df * 0x1 + -0x23c7 + 0xd2d * 0x1 + 0.04720000000000368,                                                                                                                -(0x27 * -0x9d + -0x3 * 0xc0e + 0x1 * 0x418f + 0.4455000000000382)                                                                                                            ];                                                                                                            continue;                                                                                                        case '4':                                                                                                            _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                                            continue;                                                                                                        case '5':                                                                                                            limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                                            continue;                                                                                                        }                                                                                                        break;                                                                                                    }                                                                                                } else {                                                                                                    if (_0x466a4d[_0x97b458(0x5f9)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x413)])) {                                                                                                        const _0x44b972 = _0x466a4d[_0x97b458(0x1e7)][_0x97b458(0x524)]('|');                                                                                                        let _0x3b7074 = 0x58f * 0x6 + 0x1e6c + -0x3fc6;                                                                                                        while (!![]) {                                                                                                            switch (_0x44b972[_0x3b7074++]) {                                                                                                            case '0':                                                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3d5)];                                                                                                                continue;                                                                                                            case '1':                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                    -(-0x2 * 0xd81 + -0x1669 + 0x1 * 0x3df4 + 0.30969999999979336),                                                                                                                    -0x70f * -0x3 + 0x22ee + -0x1 * 0x37e2 + 0.3596999999999966,                                                                                                                    -(-0xbc0 + -0x1723 + 0xc * 0x35f + 0.9128000000000611)                                                                                                                ];                                                                                                                continue;                                                                                                            case '2':                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                    -(0x77d * -0x2 + -0x4ad + -0x3 * -0xabb + 0.15000000000009095),                                                                                                                    -0x43 * -0x35 + -0x2380 + 0x15d2 + 0.18999999999999773,                                                                                                                    -(0x734 + -0x2351 + 0x1 * 0x2196 + 0.09999999999990905)                                                                                                                ];                                                                                                                continue;                                                                                                            case '3':                                                                                                                limoCameraMesh[_0x97b458(0x557)](_0x630886);                                                                                                                continue;                                                                                                            case '4':                                                                                                                _0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x3d0)];                                                                                                                continue;                                                                                                            case '5':                                                                                                                limoClickObjs[_0x97b458(0x557)](_0x630886);                                                                                                                continue;                                                                                                            }                                                                                                            break;                                                                                                        }                                                                                                    }                                                                                                }                                                                                            }                                                                                        }                                                                                    }                                                                                }                                                                            }                                                                        }                                                                    }                                                                }                                                            }                                                        }                                                    }                                                }                                            }                                        }                                    }                                }                            }                        }                    }                } else {                    if (_0x466a4d[_0x97b458(0x21b)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x52a)])) {                        if (_0x630886[_0x97b458(0x5c0)][_0x97b458(0x1a3)](_0x466a4d[_0x97b458(0x31d)])) {                            const _0x7b7071 = _0x466a4d[_0x97b458(0x459)][_0x97b458(0x524)]('|');                            let _0x23bcab = -0x1 * 0x243c + 0xad0 + 0x1 * 0x196c;                            while (!![]) {                                switch (_0x7b7071[_0x23bcab++]) {                                case '0':                                    _0x466a4d[_0x97b458(0x584)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5cf)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x393)], _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x35f)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(-0xc47 + -0x2093 * -0x1 + -0x7ff + 0.0500000000001819),                                        0xd6d * -0x2 + -0x2 * 0x5c9 + 0x26a8 + 0.6499999999999986,                                        -(0x3 * 0x787 + 0x511 * 0x7 + 0x337 * -0x11 + 0.21000000000003638)                                    ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(-0x3c2 + 0xfee * -0x2 + 0x300b + 0.4054999999998472),                                        0x704 * -0x4 + -0x2 * -0x925 + -0x97 * -0x11 + 0.7750000000000057,                                        -(-0x65 * -0x31 + 0x25fe + -0x35ef + 0.7952999999999975)                                    ]);                                    continue;                                case '1':                                    _0x466a4d[_0x97b458(0x447)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2c4)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x561)], _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x490)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(-0x2 * 0x1121 + -0x1331 + 0x4002 + 0.7100000000000364),                                        -0x5 * -0x313 + -0x237d + 0x155c + 0.10000000000002274,                                        -(0x7ce + -0x7 * 0x151 + -0x523 * -0x1 + 0.21000000000003638)                                    ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(-0xd6 * 0x11 + 0x1 * -0x1bd1 + 0x34b6 + 0.8695999999999913),                                        0x122 + 0x80f * -0x3 + 0x1855 + 0.46399999999999864,                                        -(-0x1 * -0x209e + -0x195d * -0x1 + -0x3641 + 0.8425999999999476)                                    ]);                                    continue;                                case '2':                                    _0x466a4d[_0x97b458(0x415)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4f0)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x364)], _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x230)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(-0x23e4 + 0x1761 + 0x18f7 + 0.6599999999998545),                                        -0x9f8 + 0xbcb + -0x96 + 0.910000000000025,                                        -(-0x1 * 0xeb1 + -0x10f * -0x15 + 0x3b5 * -0x1 + 0.9099999999999682)                                    ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(0x2b1 * 0x3 + -0x262a + 0x2a8d + 0.44840000000021973),                                        0x1 * -0xab4 + -0x15d8 + 0x21d3 + 0.43990000000002283,                                        -(-0x198 + -0x1dff + 0x238e + 0.3348999999999478)                                    ]);                                    continue;                                case '3':                                    _0x466a4d[_0x97b458(0x5ac)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1f1)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x272)], _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x37f)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(-0x1461 + -0x4f4 * -0x5 + 0x3b5 + 0.3200000000001637),                                        -0x1 * 0x1b85 + -0x57 * -0x47 + 0x3 * 0x18b + 0.75,                                        -(-0x1c49 + -0x510 + 0x1 * 0x24e5 + 0.6100000000000136)                                    ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(0x77d * 0x1 + -0x1b38 + 0x1 * 0x1bd1 + 0.95699999999988),                                        -0x4c * -0x38 + 0x77 * 0x29 + -0x2267 + 0.19029999999997926,                                        -(-0xbbb + -0xd * 0x190 + 0x1 * 0x2378 + 0.8069000000000415)                                    ]);                                    continue;                                case '4':                                    _0x466a4d[_0x97b458(0x321)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4ae)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x650)], _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x552)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(-0x553 * 0x2 + -0x3 * -0xa75 + -0x5ce + 0.7399999999997817),                                        0x5 * -0x35 + 0x1ee7 + -0x1ca1 + 0.839999999999975,                                        -(-0x6f * 0x10 + 0x1 * 0xaba + -0x10 + 0.36000000000001364)                                    ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(-0x7ce * 0x4 + -0xd45 + 0x3b90 + 0.3602000000000771),                                        -0x1 * -0x3d3 + -0x38c * -0x3 + 0xd2d * -0x1 + 0.6541000000000281,                                        -(-0x1 * -0xe71 + 0xcfd + -0x17b4 + 0.4438999999999851)                                    ]);                                    continue;                                case '5':                                    _0x466a4d[_0x97b458(0x581)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2c0)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x313)], _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4e1)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                        -(-0x1ec7 + 0x21 * 0x6a + 0x18cf + 0.2400000000000091),                                        0x619 * 0x1 + -0x1d97 + 0x17ba + 0.25,                                        -(-0xb5f + 0x372 * -0xa + -0x1c2 * -0x1c + 0.19000000000005457)                                    ], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                        -(0x7c * 0x19 + -0x11cd + 0xd47 + 0.9351999999998952),                                        0x18ab + -0xc6c * -0x1 + -0x24d7 + 0.5752999999999986,                                        -(0x386 + 0x17f5 * -0x1 + 0x3 * 0x7f1 + 0.7335000000000491)                                    ]);                                    continue;                                case '6':                                    junhuaClickObjs[_0x97b458(0x557)](_0x630886);                                    continue;                                case '7':                                    cameraImportDeviceArrs[_0x97b458(0x557)](_0x630886);                                    continue;                                }                                break;                            }                        }                    } else {                        if (_0x466a4d[_0x97b458(0x1a4)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5fc)]))                            _0x466a4d[_0x97b458(0x409)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4b0)]) && (_0x630886[_0x97b458(0x5c0)] = _0x466a4d[_0x97b458(0x631)], limoClickObjs[_0x97b458(0x557)](_0x630886));                        else {                            if (_0x466a4d[_0x97b458(0x251)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x624)]))                                (_0x466a4d[_0x97b458(0x2eb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4d0)]) || _0x466a4d[_0x97b458(0x201)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1b5)]) || _0x466a4d[_0x97b458(0x4bc)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x310)]) || _0x466a4d[_0x97b458(0x21b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x414)]) || _0x466a4d[_0x97b458(0x2f8)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x36c)]) || _0x466a4d[_0x97b458(0x2b4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3c8)])) && (_0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)] = _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x5df)](), _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x2a6) + 'e'] = !![], posuijianJiaodaiObjs[_0x97b458(0x557)](_0x630886));                            else {                                if (_0x466a4d[_0x97b458(0x3dd)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x505)]))                                    (_0x466a4d[_0x97b458(0x2a3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x50c)]) || _0x466a4d[_0x97b458(0x3b5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x245)]) || _0x466a4d[_0x97b458(0x49b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2da)]) || _0x466a4d[_0x97b458(0x5e0)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5ca)])) && (_0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)] = _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x5df)](), _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x2a6) + 'e'] = !![], saifenjianJiaodaiObjs[_0x97b458(0x557)](_0x630886));                                else                                    _0x466a4d[_0x97b458(0x297)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x445)]) && ((_0x466a4d[_0x97b458(0x447)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x534)]) || _0x466a4d[_0x97b458(0x4bc)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x27a)]) || _0x466a4d[_0x97b458(0x251)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x50a)]) || _0x466a4d[_0x97b458(0x378)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5f5)]) || _0x466a4d[_0x97b458(0x349)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1ce)]) || _0x466a4d[_0x97b458(0x1ec)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x301)]) || _0x466a4d[_0x97b458(0x3b4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x526)]) || _0x466a4d[_0x97b458(0x4bc)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3d9)]) || _0x466a4d[_0x97b458(0x33d)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2b9)])) && (_0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)] = _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x5df)](), _0x630886[_0x97b458(0x5d8)][_0x97b458(0x21c)][_0x97b458(0x2a6) + 'e'] = !![], suishijianJiaodaiObjs[_0x97b458(0x557)](_0x630886)));                            }                        }                    }                }                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x532)] = _0x630886[_0x97b458(0x5d8)][_0x97b458(0x217) + 't'], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x3d6)] = _0x630886[_0x97b458(0x3d6)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32d) + _0x97b458(0x1be)] = _0x630886[_0x97b458(0x32d) + _0x97b458(0x1be)], _0x630886[_0x97b458(0x3ec)][_0x97b458(0x1c7) + 'r'] = _0x630886[_0x97b458(0x1c7) + 'r'];            } else {                if (_0x466a4d[_0x97b458(0x594)](_0x630886[_0x97b458(0x5dc)], _0x466a4d[_0x97b458(0x29b)])) {                    if (_0x466a4d[_0x97b458(0x1e2)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x23c)])) {                        if (_0x466a4d[_0x97b458(0x219)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x54b)]) || _0x466a4d[_0x97b458(0x293)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3e9)]) || _0x466a4d[_0x97b458(0x5a9)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x306)]) || _0x466a4d[_0x97b458(0x249)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1e1)]) || _0x466a4d[_0x97b458(0x58e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4e9)]) || _0x466a4d[_0x97b458(0x2d5)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1ed)]) || _0x466a4d[_0x97b458(0x3d2)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2e1)]) || _0x466a4d[_0x97b458(0x491)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x620)]))                            _0x630886[_0x97b458(0x527)](_0x372efc => {                                const _0x511c04 = _0x97b458;                                if (_0x372efc[_0x511c04(0x3fc)]) {                                    let _0x4e7ae0 = _0x630886[_0x511c04(0x5c0)][_0x511c04(0x635)](0x352 * 0x7 + 0xacb + -0x2204);                                    _0x372efc[_0x511c04(0x5c0)] = _0x466a4d[_0x511c04(0x3ed)](_0x466a4d[_0x511c04(0x46d)], _0x4e7ae0), limoClickObjs[_0x511c04(0x557)](_0x372efc);                                }                            });                        else {                            if (_0x466a4d[_0x97b458(0x1fb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5b8)]) || _0x466a4d[_0x97b458(0x391)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4ac)]) || _0x466a4d[_0x97b458(0x3fa)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2d3)]))                                _0x630886[_0x97b458(0x527)](_0x71ca81 => {                                    const _0x558e71 = _0x97b458;                                    if (_0x71ca81[_0x558e71(0x3fc)]) {                                        const _0x3fdafd = _0x466a4d[_0x558e71(0x32b)][_0x558e71(0x524)]('|');                                        let _0x3cb3f0 = -0x1f3a + 0x2 * 0x2ab + 0x19e4;                                        while (!![]) {                                            switch (_0x3fdafd[_0x3cb3f0++]) {                                            case '0':                                                _0x466a4d[_0x558e71(0x49b)](_0x630886[_0x558e71(0x5c0)], _0x466a4d[_0x558e71(0x2d3)]) && (_0x71ca81[_0x558e71(0x5c0)] = _0x466a4d[_0x558e71(0x2cb)]);                                                continue;                                            case '1':                                                _0x466a4d[_0x558e71(0x1a8)](_0x630886[_0x558e71(0x5c0)], _0x466a4d[_0x558e71(0x4ac)]) && (_0x71ca81[_0x558e71(0x5c0)] = _0x466a4d[_0x558e71(0x2aa)]);                                                continue;                                            case '2':                                                (_0x466a4d[_0x558e71(0x5f9)](_0x71ca81[_0x558e71(0x5c0)], _0x466a4d[_0x558e71(0x2a0)]) || _0x466a4d[_0x558e71(0x4fc)](_0x71ca81[_0x558e71(0x5c0)], _0x466a4d[_0x558e71(0x5c2)]) || _0x466a4d[_0x558e71(0x22d)](_0x71ca81[_0x558e71(0x5c0)], _0x466a4d[_0x558e71(0x29d)])) && (_0x71ca81[_0x558e71(0x5d8)][_0x558e71(0x21c)] = _0x71ca81[_0x558e71(0x5d8)][_0x558e71(0x21c)][_0x558e71(0x5df)](), _0x71ca81[_0x558e71(0x5d8)][_0x558e71(0x21c)][_0x558e71(0x2a6) + 'e'] = !![], limojiJiaodaiObjs[_0x558e71(0x557)](_0x71ca81));                                                continue;                                            case '3':                                                limoClickObjs[_0x558e71(0x557)](_0x71ca81);                                                continue;                                            case '4':                                                _0x466a4d[_0x558e71(0x36f)](_0x630886[_0x558e71(0x5c0)], _0x466a4d[_0x558e71(0x5b8)]) && (_0x71ca81[_0x558e71(0x5c0)] = _0x466a4d[_0x558e71(0x43b)]);                                                continue;                                            }                                            break;                                        }                                    }                                });                            else {                                if (_0x466a4d[_0x97b458(0x466)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x289)]) || _0x466a4d[_0x97b458(0x3a7)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x45f)]) || _0x466a4d[_0x97b458(0x42d)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4ee)]) || _0x466a4d[_0x97b458(0x610)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4de)]) || _0x466a4d[_0x97b458(0x4ff)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3da)]))                                    _0x630886[_0x97b458(0x527)](_0xae337 => {                                        const _0x15c47c = _0x97b458;                                        if (_0xae337[_0x15c47c(0x3fc)]) {                                            const _0x42724a = _0x466a4d[_0x15c47c(0x28b)][_0x15c47c(0x524)]('|');                                            let _0x16fa19 = 0x2 * -0x4d7 + -0x3 * 0x1d2 + 0xf24;                                            while (!![]) {                                                switch (_0x42724a[_0x16fa19++]) {                                                case '0':                                                    _0x466a4d[_0x15c47c(0x640)](_0x630886[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x4ee)]) && (_0xae337[_0x15c47c(0x5c0)] = _0x466a4d[_0x15c47c(0x3a2)]);                                                    continue;                                                case '1':                                                    _0x466a4d[_0x15c47c(0x5b5)](_0x630886[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x289)]) && (_0xae337[_0x15c47c(0x5c0)] = _0x466a4d[_0x15c47c(0x3a3)]);                                                    continue;                                                case '2':                                                    (_0x466a4d[_0x15c47c(0x242)](_0xae337[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x59f)]) || _0x466a4d[_0x15c47c(0x5b5)](_0xae337[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x565)]) || _0x466a4d[_0x15c47c(0x294)](_0xae337[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x422)]) || _0x466a4d[_0x15c47c(0x44b)](_0xae337[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x569)]) || _0x466a4d[_0x15c47c(0x58e)](_0xae337[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x3e1)])) && (_0xae337[_0x15c47c(0x5d8)][_0x15c47c(0x21c)] = _0xae337[_0x15c47c(0x5d8)][_0x15c47c(0x21c)][_0x15c47c(0x5df)](), _0xae337[_0x15c47c(0x5d8)][_0x15c47c(0x21c)][_0x15c47c(0x2a6) + 'e'] = !![], limojiJiaodaiObjs[_0x15c47c(0x557)](_0xae337));                                                    continue;                                                case '3':                                                    _0x466a4d[_0x15c47c(0x447)](_0x630886[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x3da)]) && (_0xae337[_0x15c47c(0x5c0)] = _0x466a4d[_0x15c47c(0x547)]);                                                    continue;                                                case '4':                                                    limoClickObjs[_0x15c47c(0x557)](_0xae337);                                                    continue;                                                case '5':                                                    _0x466a4d[_0x15c47c(0x651)](_0x630886[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x4de)]) && (_0xae337[_0x15c47c(0x5c0)] = _0x466a4d[_0x15c47c(0x4eb)]);                                                    continue;                                                case '6':                                                    _0x466a4d[_0x15c47c(0x1a8)](_0x630886[_0x15c47c(0x5c0)], _0x466a4d[_0x15c47c(0x45f)]) && (_0xae337[_0x15c47c(0x5c0)] = _0x466a4d[_0x15c47c(0x5ea)]);                                                    continue;                                                }                                                break;                                            }                                        }                                    });                                else {                                    if (_0x466a4d[_0x97b458(0x3dd)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2a8)]) || _0x466a4d[_0x97b458(0x44c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x49d)]) || _0x466a4d[_0x97b458(0x304)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5fa)]) || _0x466a4d[_0x97b458(0x57a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x27f)]) || _0x466a4d[_0x97b458(0x36f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x308)]) || _0x466a4d[_0x97b458(0x1f2)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5ec)]) || _0x466a4d[_0x97b458(0x232)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4ea)]) || _0x466a4d[_0x97b458(0x3a9)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4fe)]))                                        _0x630886[_0x97b458(0x527)](_0x4ac008 => {                                            const _0x5b058f = _0x97b458;                                            if (_0x4ac008[_0x5b058f(0x3fc)]) {                                                let _0x5f2d56 = _0x630886[_0x5b058f(0x5c0)][_0x5b058f(0x635)](-0x31 * -0x8c + 0x13 * -0x12c + -0x44 * 0x11);                                                _0x4ac008[_0x5b058f(0x5c0)] = _0x466a4d[_0x5b058f(0x507)](_0x466a4d[_0x5b058f(0x337)], _0x5f2d56), limoClickObjs[_0x5b058f(0x557)](_0x4ac008);                                            }                                        });                                    else                                        (_0x466a4d[_0x97b458(0x4cc)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2c2)]) || _0x466a4d[_0x97b458(0x338)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x38a)]) || _0x466a4d[_0x97b458(0x62f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x41a)]) || _0x466a4d[_0x97b458(0x4c3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x499)]) || _0x466a4d[_0x97b458(0x519)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3ba)]) || _0x466a4d[_0x97b458(0x43a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4e5)]) || _0x466a4d[_0x97b458(0x39b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x25f)]) || _0x466a4d[_0x97b458(0x212)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2b6)])) && _0x630886[_0x97b458(0x527)](_0x3878da => {                                            const _0x2c3256 = _0x97b458;                                            if (_0x3878da[_0x2c3256(0x3fc)]) {                                                let _0x56a85d = _0x630886[_0x2c3256(0x5c0)][_0x2c3256(0x635)](-0x2685 + -0x1 * 0xb73 + 0x31fd);                                                _0x3878da[_0x2c3256(0x5c0)] = _0x3a0b1f[_0x2c3256(0x3cd)](_0x3a0b1f[_0x2c3256(0x3c2)], _0x56a85d), limoClickObjs[_0x2c3256(0x557)](_0x3878da);                                            }                                        });                                }                            }                        }                    } else {                        if (_0x466a4d[_0x97b458(0x53a)](_0x351f2a[_0x97b458(0x5c0)], '报警')) {                            if (_0x466a4d[_0x97b458(0x53b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1e6)])) {                                const _0x16479c = _0x466a4d[_0x97b458(0x255)][_0x97b458(0x524)]('|');                                let _0x4016e9 = -0x1b45 + 0x6 * 0xbb + 0x16e3;                                while (!![]) {                                    switch (_0x16479c[_0x4016e9++]) {                                    case '0':                                        _0x630886[_0x97b458(0x527)](_0x54ee77 => {                                            const _0x57ad43 = _0x97b458;                                            _0x54ee77[_0x57ad43(0x3fc)] && (_0x54ee77[_0x57ad43(0x5c0)] = _0x3a0b1f[_0x57ad43(0x2c1)], junhuaClickObjs[_0x57ad43(0x557)](_0x54ee77));                                        });                                        continue;                                    case '1':                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                            -(-0xcac + 0x1a54 + -0x1 * -0x2b + 0.7296999999998661),                                            -0x37d + 0x210e * -0x1 + -0x1 * -0x25b1 + 0.8965000000000032,                                            -(-0x14c8 + 0x103b + 0x82a + 0.4296000000000504)                                        ];                                        continue;                                    case '2':                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                        continue;                                    case '3':                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                            -(0x1482 + -0x1a1 * -0x15 + 0x28e2 * -0x1 + 0.38000000000010914),                                            -0x2c * 0xba + 0x3 * 0x9a + -0x2 * -0xfa6 + 0.2799999999999727,                                            -(-0x2 * 0x950 + 0x22f6 + -0x2 * 0x64e + 0.5299999999999727)                                        ];                                        continue;                                    case '4':                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x1dd)];                                        continue;                                    }                                    break;                                }                            } else {                                if (_0x466a4d[_0x97b458(0x1a4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3ae)])) {                                    const _0xf703b = _0x466a4d[_0x97b458(0x53d)][_0x97b458(0x524)]('|');                                    let _0x35c7c4 = -0x255a + 0xc5a + 0x2 * 0xc80;                                    while (!![]) {                                        switch (_0xf703b[_0x35c7c4++]) {                                        case '0':                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                -(-0x1 * -0x232b + -0x1d2 * -0x1 + -0x2 * 0xc05 + 0.5280999999999949),                                                0x65 * -0x41 + 0x169d + 0x1 * 0x42d + 0.6465999999999781,                                                -(-0x28d + -0x1ad0 + 0x2102 + 0.2480000000000473)                                            ];                                            continue;                                        case '1':                                            _0x630886[_0x97b458(0x527)](_0x27ea0c => {                                                const _0x1a11cc = _0x97b458;                                                _0x27ea0c[_0x1a11cc(0x3fc)] && (_0x27ea0c[_0x1a11cc(0x5c0)] = _0x3a0b1f[_0x1a11cc(0x2c1)], junhuaClickObjs[_0x1a11cc(0x557)](_0x27ea0c));                                            });                                            continue;                                        case '2':                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3b2)];                                            continue;                                        case '3':                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                            continue;                                        case '4':                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                -(0x12b * 0x9 + 0x1 * 0x187f + -0x2 * 0xb07 + 0.9400000000000546),                                                -0x3e4 + 0x1e2b + -0x1925 + 0.2699999999999818,                                                -(-0xa6e + 0xfef * -0x1 + 0x1 * 0x1e17 + 0.5199999999999818)                                            ];                                            continue;                                        }                                        break;                                    }                                } else {                                    if (_0x466a4d[_0x97b458(0x1a4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1c9)])) {                                        const _0x221e72 = _0x466a4d[_0x97b458(0x436)][_0x97b458(0x524)]('|');                                        let _0x52ed02 = -0xea8 + 0x16dd + 0xbf * -0xb;                                        while (!![]) {                                            switch (_0x221e72[_0x52ed02++]) {                                            case '0':                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                    -(-0x1 * -0x26d8 + 0x238f * -0x1 + -0x682 * -0x1 + 0.5189999999997781),                                                    0x18da + 0x1f2e + -0x36e0 + 0.07049999999998136,                                                    -(0x1059 + 0x3f5 + 0x10b2 * -0x1 + 0.9367999999999483)                                                ];                                                continue;                                            case '1':                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                    -(0x132 + 0x1 * 0xf2b + -0x690 + 0.38000000000010914),                                                    -0x72 * -0x35 + -0x1 * -0x9b5 + 0x202d * -0x1 + 0.2799999999999727,                                                    -(-0x6 * 0x653 + 0x3 * -0x76e + 0x3ff6 + 0.5299999999999727)                                                ];                                                continue;                                            case '2':                                                _0x630886[_0x97b458(0x527)](_0x43b793 => {                                                    const _0xa07e6d = _0x97b458;                                                    _0x43b793[_0xa07e6d(0x3fc)] && (_0x43b793[_0xa07e6d(0x5c0)] = _0x3a0b1f[_0xa07e6d(0x2c1)], junhuaClickObjs[_0xa07e6d(0x557)](_0x43b793));                                                });                                                continue;                                            case '3':                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3ee)];                                                continue;                                            case '4':                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                continue;                                            }                                            break;                                        }                                    } else {                                        if (_0x466a4d[_0x97b458(0x274)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1d2)])) {                                            const _0x5487e3 = _0x466a4d[_0x97b458(0x58d)][_0x97b458(0x524)]('|');                                            let _0x2326f4 = -0x1a * 0x122 + 0x23 * 0xfb + 0x19f * -0x3;                                            while (!![]) {                                                switch (_0x5487e3[_0x2326f4++]) {                                                case '0':                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                        -(-0x11dd + 0x566 + -0x42e * -0x6 + 0.6599999999998545),                                                        0x130f + -0x19d9 + 0x727 * 0x1 + 0.7999999999999972,                                                        -(0xf * -0x18d + -0x337 + 0xb3 * 0x2f + 0.43000000000006366)                                                    ];                                                    continue;                                                case '1':                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x311)];                                                    continue;                                                case '2':                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                        -(0x773 * 0x3 + 0x17e * 0xa + -0x18a8 + 0.671100000000024),                                                        0x1cbf * -0x1 + 0x2d3 * -0xb + 0x7 * 0x89b + 0.6655999999999977,                                                        -(0x1 * 0x2661 + -0x2386 + 0x3b4 + 0.5574999999998909)                                                    ];                                                    continue;                                                case '3':                                                    _0x630886[_0x97b458(0x527)](_0x4ab2a3 => {                                                        const _0x1e95c8 = _0x97b458;                                                        _0x4ab2a3[_0x1e95c8(0x3fc)] && (_0x4ab2a3[_0x1e95c8(0x5c0)] = _0x3a0b1f[_0x1e95c8(0x2c1)], limoClickObjs[_0x1e95c8(0x557)](_0x4ab2a3));                                                    });                                                    continue;                                                case '4':                                                    fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                    continue;                                                }                                                break;                                            }                                        } else {                                            if (_0x466a4d[_0x97b458(0x446)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x23d)])) {                                                const _0x2fa98b = _0x466a4d[_0x97b458(0x436)][_0x97b458(0x524)]('|');                                                let _0x4b7784 = -0x479 + 0xd4 * -0xe + -0x1011 * -0x1;                                                while (!![]) {                                                    switch (_0x2fa98b[_0x4b7784++]) {                                                    case '0':                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                            -(0x2624 + 0xb58 + 0xd * -0x2cd + 0.17299999999977445),                                                            -0x24de + -0x2b * 0x40 + 0x2 * 0x1803 + 0.6821000000000055,                                                            -(-0x1382 * 0x2 + -0x17d5 + 0x1 * 0x456d + 0.7657999999998992)                                                        ];                                                        continue;                                                    case '1':                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                            -(0x1912 + 0x17d9 + -0x23d9 + 0.8000000000001819),                                                            0x50e + 0x17e + -0x62f + 0.769999999999996,                                                            -(0x1 * 0x1b24 + -0xd * 0x2cd + 0xfa8 + 0.2999999999999545)                                                        ];                                                        continue;                                                    case '2':                                                        _0x630886[_0x97b458(0x527)](_0x5b7089 => {                                                            const _0x36d088 = _0x97b458;                                                            _0x5b7089[_0x36d088(0x3fc)] && (_0x5b7089[_0x36d088(0x5c0)] = _0x3a0b1f[_0x36d088(0x2c1)], limoClickObjs[_0x36d088(0x557)](_0x5b7089));                                                        });                                                        continue;                                                    case '3':                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x298)];                                                        continue;                                                    case '4':                                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                        continue;                                                    }                                                    break;                                                }                                            } else {                                                if (_0x466a4d[_0x97b458(0x469)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x329)])) {                                                    const _0x4d9e32 = _0x466a4d[_0x97b458(0x49e)][_0x97b458(0x524)]('|');                                                    let _0x14676f = -0x45 * -0x83 + -0x1c26 + -0x729;                                                    while (!![]) {                                                        switch (_0x4d9e32[_0x14676f++]) {                                                        case '0':                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3f2)];                                                            continue;                                                        case '1':                                                            _0x630886[_0x97b458(0x527)](_0x498160 => {                                                                const _0x16109e = _0x97b458;                                                                _0x498160[_0x16109e(0x3fc)] && (_0x498160[_0x16109e(0x5c0)] = _0x466a4d[_0x16109e(0x317)], limoClickObjs[_0x16109e(0x557)](_0x498160));                                                            });                                                            continue;                                                        case '2':                                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                            continue;                                                        case '3':                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                -(0x1c2c + 0xfb6 + 0x9 * -0x35f + 0.75),                                                                0x13b1 * 0x1 + 0x175b + -0x2aaf + 0.769999999999996,                                                                -(0xaf + -0x1 * 0x1f1f + 0x24d3 + 0.31999999999993634)                                                            ];                                                            continue;                                                        case '4':                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                -(0x2399 + 0x749 * 0x5 + -0x3a7b + 0.7907000000000153),                                                                0x907 + 0x427 * -0x4 + 0x7fc + 0.4047000000000054,                                                                -(0xe2c + 0x43f + -0xbdd + 0.8554999999998927)                                                            ];                                                            continue;                                                        }                                                        break;                                                    }                                                } else {                                                    if (_0x466a4d[_0x97b458(0x446)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x633)])) {                                                        const _0x4aef28 = _0x466a4d[_0x97b458(0x436)][_0x97b458(0x524)]('|');                                                        let _0xd6cac7 = -0x1 * -0x2040 + 0x2 * -0x136c + 0x698;                                                        while (!![]) {                                                            switch (_0x4aef28[_0xd6cac7++]) {                                                            case '0':                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                    -(-0x25e6 + -0x131e + 0x4715 + 0.6343000000001666),                                                                    0x306 + 0x2501 + -0x8b * 0x49 + 0.5769999999999982,                                                                    -(0x1 * -0xf1c + 0xc0d + 0x99d + 0.3106000000000222)                                                                ];                                                                continue;                                                            case '1':                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                    -(0x2 * 0x2da + -0x1f97 * -0x1 + -0x173b + 0.6900000000000546),                                                                    0x14f * 0x7 + -0x1b * 0x1 + 0x8b1 * -0x1 + 0.7600000000000051,                                                                    -(0x19db + 0xb4e + -0x65 * 0x4e + 0.2799999999999727)                                                                ];                                                                continue;                                                            case '2':                                                                _0x630886[_0x97b458(0x527)](_0xa87f3c => {                                                                    const _0x535cd1 = _0x97b458;                                                                    _0xa87f3c[_0x535cd1(0x3fc)] && (_0xa87f3c[_0x535cd1(0x5c0)] = _0x3a0b1f[_0x535cd1(0x2c1)], limoClickObjs[_0x535cd1(0x557)](_0xa87f3c));                                                                });                                                                continue;                                                            case '3':                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x417)];                                                                continue;                                                            case '4':                                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                continue;                                                            }                                                            break;                                                        }                                                    } else {                                                        if (_0x466a4d[_0x97b458(0x21b)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x240)])) {                                                            const _0x29ddbf = _0x466a4d[_0x97b458(0x549)][_0x97b458(0x524)]('|');                                                            let _0x532eef = -0x1f9a + -0x26ef * 0x1 + 0x4689;                                                            while (!![]) {                                                                switch (_0x29ddbf[_0x532eef++]) {                                                                case '0':                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                        -(0x1891 + -0x6d7 * 0x2 + 0x3b * 0x10 + 0.5162000000000262),                                                                        -0xb51 + -0xaf + 0xc64 + 0.45650000000000546,                                                                        -(0x82 * -0x1 + 0x211a + -0x1a0b + 0.42429999999990287)                                                                    ];                                                                    continue;                                                                case '1':                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x614)];                                                                    continue;                                                                case '2':                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                        -(-0x1 * -0x15f1 + -0x1 * -0xa4a + -0x11a7 * 0x1 + 0.03000000000020009),                                                                        -0x13a5 + -0x1b2b + 0x2f2d + 0.7999999999999972,                                                                        -(-0x1f48 * -0x1 + 0x2 * 0x5d4 + -0x248d + 0.40000000000009095)                                                                    ];                                                                    continue;                                                                case '3':                                                                    fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                    continue;                                                                case '4':                                                                    _0x630886[_0x97b458(0x527)](_0x1de0fd => {                                                                        const _0x33a59d = _0x97b458;                                                                        _0x1de0fd[_0x33a59d(0x3fc)] && (_0x1de0fd[_0x33a59d(0x5c0)] = _0x466a4d[_0x33a59d(0x317)], limoClickObjs[_0x33a59d(0x557)](_0x1de0fd));                                                                    });                                                                    continue;                                                                }                                                                break;                                                            }                                                        } else {                                                            if (_0x466a4d[_0x97b458(0x202)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2d9)])) {                                                                const _0x24e639 = _0x466a4d[_0x97b458(0x226)][_0x97b458(0x524)]('|');                                                                let _0x24e74c = 0x4ab * 0x3 + -0x3d * -0x2b + -0x1840;                                                                while (!![]) {                                                                    switch (_0x24e639[_0x24e74c++]) {                                                                    case '0':                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                            -(0x1631 * 0x1 + 0x616 * -0x1 + 0x119 * -0x1 + 0.05209999999988213),                                                                            0x10d2 + 0x63b * -0x1 + -0xa34 + 0.9133999999999958,                                                                            -(-0x1242 + 0xe * 0xc9 + 0x72 * 0x1f + 0.08539999999993597)                                                                        ];                                                                        continue;                                                                    case '1':                                                                        _0x630886[_0x97b458(0x527)](_0x4df5e7 => {                                                                            const _0x3e9b85 = _0x97b458;                                                                            _0x4df5e7[_0x3e9b85(0x3fc)] && (_0x4df5e7[_0x3e9b85(0x5c0)] = _0x3a0b1f[_0x3e9b85(0x2c1)], limoClickObjs[_0x3e9b85(0x557)](_0x4df5e7));                                                                        });                                                                        continue;                                                                    case '2':                                                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                        continue;                                                                    case '3':                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                            -(-0x1a18 + -0x488 * 0x1 + -0x2da1 * -0x1 + 0.07000000000016371),                                                                            0x160 + 0x17 + -0x11a + 0.769999999999996,                                                                            -(0x5 * -0x1 + 0x17bf + 0x1157 * -0x1 + 0.30999999999994543)                                                                        ];                                                                        continue;                                                                    case '4':                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x408)];                                                                        continue;                                                                    }                                                                    break;                                                                }                                                            } else {                                                                if (_0x466a4d[_0x97b458(0x629)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2dc)])) {                                                                    const _0x20e9f7 = _0x466a4d[_0x97b458(0x473)][_0x97b458(0x524)]('|');                                                                    let _0x6a8ee5 = -0x7 * -0x4d5 + -0x33 * 0xb9 + 0x1 * 0x308;                                                                    while (!![]) {                                                                        switch (_0x20e9f7[_0x6a8ee5++]) {                                                                        case '0':                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x43c)];                                                                            continue;                                                                        case '1':                                                                            _0x630886[_0x97b458(0x527)](_0x55874d => {                                                                                const _0x2553d5 = _0x97b458;                                                                                _0x55874d[_0x2553d5(0x3fc)] && (_0x55874d[_0x2553d5(0x5c0)] = _0x3a0b1f[_0x2553d5(0x2c1)], limoClickObjs[_0x2553d5(0x557)](_0x55874d));                                                                            });                                                                            continue;                                                                        case '2':                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                -(0x245 * 0x11 + 0x659 * -0x6 + 0x1 * 0xeec + 0.5399999999999636),                                                                                0x19 * -0x23 + -0xa41 + 0xe09 + 0.7600000000000051,                                                                                -(0x6e5 * -0x1 + 0x1fb3 + -0x29 * 0x73 + 0.2599999999999909)                                                                            ];                                                                            continue;                                                                        case '3':                                                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                            continue;                                                                        case '4':                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                -(0x2181 + 0x2233 + -0x3449 + 0.8409999999998945),                                                                                0x2 * -0x7f + 0x115 * -0x1a + 0x1d83 + 0.722999999999999,                                                                                -(-0x250a + 0x2 * -0x83b + 0x3c08 + 0.9076999999999771)                                                                            ];                                                                            continue;                                                                        }                                                                        break;                                                                    }                                                                } else {                                                                    if (_0x466a4d[_0x97b458(0x320)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x54d)])) {                                                                        const _0x3983f7 = _0x466a4d[_0x97b458(0x5e4)][_0x97b458(0x524)]('|');                                                                        let _0x5bfb0b = 0x35 * -0x81 + -0x1 * 0x106e + 0x2b23;                                                                        while (!![]) {                                                                            switch (_0x3983f7[_0x5bfb0b++]) {                                                                            case '0':                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                    -(-0xc39 * -0x3 + 0x19 * -0x15 + -0x12c5 + 0.9456000000000131),                                                                                    -0x7cb + -0x11fa * 0x2 + -0x1 * -0x2c22 + 0.5799999999999983,                                                                                    -(0x1bf * 0xd + 0x1189 * 0x1 + 0x1 * -0x21b5 + 0.934400000000096)                                                                                ];                                                                                continue;                                                                            case '1':                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                    -(-0x1391 + 0x2519 + -0x1af * 0x1 + 0.5500000000001819),                                                                                    -0x77b * -0x5 + -0xba7 * -0x1 + -0x30b1 + 0.7900000000000063,                                                                                    -(-0xa42 + -0x1bb2 + 0x1 * 0x2c57 + 0.38000000000010914)                                                                                ];                                                                                continue;                                                                            case '2':                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x370)];                                                                                continue;                                                                            case '3':                                                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                continue;                                                                            case '4':                                                                                _0x630886[_0x97b458(0x527)](_0x3cde35 => {                                                                                    const _0x376ce8 = _0x97b458;                                                                                    _0x3cde35[_0x376ce8(0x3fc)] && (_0x3cde35[_0x376ce8(0x5c0)] = _0x466a4d[_0x376ce8(0x317)], limoClickObjs[_0x376ce8(0x557)](_0x3cde35));                                                                                });                                                                                continue;                                                                            }                                                                            break;                                                                        }                                                                    } else {                                                                        if (_0x466a4d[_0x97b458(0x434)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x523)])) {                                                                            const _0xba7448 = _0x466a4d[_0x97b458(0x1cd)][_0x97b458(0x524)]('|');                                                                            let _0x523c99 = -0x4 * 0x55 + -0x26 * 0x87 + -0x2 * -0xaaf;                                                                            while (!![]) {                                                                                switch (_0xba7448[_0x523c99++]) {                                                                                case '0':                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                        -(0x1 * 0x116 + -0x617 + 0xf95 * 0x1 + 0.599999999999909),                                                                                        0x1 * 0x43f + -0x387 * 0x2 + 0x47b + 0.22000000000002728,                                                                                        -(-0xb7 + -0x163 * 0xa + 0x8f5 * 0x3 + 0.2899999999999636)                                                                                    ];                                                                                    continue;                                                                                case '1':                                                                                    fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                    continue;                                                                                case '2':                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                        -(0xae6 + -0x7 * 0x4e9 + 0x220c + 0.7332999999998719),                                                                                        -0x2f * 0x79 + -0x9bb + -0x49 * -0x76 + 0.8772999999999911,                                                                                        -(-0x1 * 0x19ff + 0xcae + 0x1964 + 0.637000000000171)                                                                                    ];                                                                                    continue;                                                                                case '3':                                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x540)];                                                                                    continue;                                                                                case '4':                                                                                    _0x630886[_0x97b458(0x527)](_0x21f0c3 => {                                                                                        const _0x163058 = _0x97b458;                                                                                        _0x21f0c3[_0x163058(0x3fc)] && (_0x21f0c3[_0x163058(0x5c0)] = _0x466a4d[_0x163058(0x317)], shaifenClickObjs[_0x163058(0x557)](_0x21f0c3));                                                                                    });                                                                                    continue;                                                                                }                                                                                break;                                                                            }                                                                        } else {                                                                            if (_0x466a4d[_0x97b458(0x3a0)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x29e)])) {                                                                                const _0x10083d = _0x466a4d[_0x97b458(0x42a)][_0x97b458(0x524)]('|');                                                                                let _0x11ae0c = -0x1d8e + 0xb5 * -0x5 + 0x2117;                                                                                while (!![]) {                                                                                    switch (_0x10083d[_0x11ae0c++]) {                                                                                    case '0':                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                            -(0x81b + 0x1f0f + -0x1 * 0x1c51 + 0.17000000000007276),                                                                                            -0x22a4 + 0x8a * -0x44 + 0x6a6 * 0xb + 0.18999999999999773,                                                                                            -(-0xf43 * -0x1 + 0x2 * 0xde7 + 0x13 * -0x17b + 0.7100000000000364)                                                                                        ];                                                                                        continue;                                                                                    case '1':                                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x46e)];                                                                                        continue;                                                                                    case '2':                                                                                        _0x630886[_0x97b458(0x527)](_0x53495a => {                                                                                            const _0x2b470c = _0x97b458;                                                                                            _0x53495a[_0x2b470c(0x3fc)] && (_0x53495a[_0x2b470c(0x5c0)] = _0x466a4d[_0x2b470c(0x317)], posuiClickObjs[_0x2b470c(0x557)](_0x53495a));                                                                                        });                                                                                        continue;                                                                                    case '3':                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                            -(-0xc86 + 0x1c * 0x1 + 0x1745 + 0.11749999999983629),                                                                                            0x1 * 0xdc7 + 0xe8c + -0x1a75 + 0.5801999999999907,                                                                                            -(-0x1 * -0x24a7 + -0x31 * -0xad + -0x369f + 0.647899999999936)                                                                                        ];                                                                                        continue;                                                                                    case '4':                                                                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                        continue;                                                                                    }                                                                                    break;                                                                                }                                                                            } else {                                                                                if (_0x466a4d[_0x97b458(0x2ed)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2b2)])) {                                                                                    const _0x3d616f = _0x466a4d[_0x97b458(0x1ad)][_0x97b458(0x524)]('|');                                                                                    let _0x464bc8 = 0x2525 + 0x2ff * -0x8 + 0x1 * -0xd2d;                                                                                    while (!![]) {                                                                                        switch (_0x3d616f[_0x464bc8++]) {                                                                                        case '0':                                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4f7)];                                                                                            continue;                                                                                        case '1':                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                -(-0x2 * -0xf01 + -0x1773 + -0x95 + 0.8599999999999),                                                                                                0x2 * -0xba3 + -0x1772 + 0x2faa + 0.7299999999999898,                                                                                                -(-0x122a + -0x15d + 0x1e7e + 0.11000000000012733)                                                                                            ];                                                                                            continue;                                                                                        case '2':                                                                                            _0x630886[_0x97b458(0x527)](_0x7ef540 => {                                                                                                const _0x3effc8 = _0x97b458;                                                                                                _0x7ef540[_0x3effc8(0x3fc)] && (_0x7ef540[_0x3effc8(0x5c0)] = _0x466a4d[_0x3effc8(0x317)], duishiClickObjs[_0x3effc8(0x557)](_0x7ef540));                                                                                            });                                                                                            continue;                                                                                        case '3':                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                -(0x435 * 0x9 + 0x3df + 0x23e3 * -0x1 + 0.49080000000003565),                                                                                                -0xaf9 + 0x6a * -0x1d + -0x17f3 * -0x1 + 0.017599999999987403,                                                                                                -(0x35 * 0x1e + -0x18b * -0xf + 0x1 * -0x1263 + 0.1289000000001579)                                                                                            ];                                                                                            continue;                                                                                        case '4':                                                                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                            continue;                                                                                        }                                                                                        break;                                                                                    }                                                                                } else {                                                                                    if (_0x466a4d[_0x97b458(0x294)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x243)])) {                                                                                        const _0x2b1ca2 = _0x466a4d[_0x97b458(0x406)][_0x97b458(0x524)]('|');                                                                                        let _0x5647ab = -0x15 * 0x20 + -0x1c28 + 0x1ec8;                                                                                        while (!![]) {                                                                                            switch (_0x2b1ca2[_0x5647ab++]) {                                                                                            case '0':                                                                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                continue;                                                                                            case '1':                                                                                                _0x630886[_0x97b458(0x527)](_0x2bb542 => {                                                                                                    const _0x156820 = _0x97b458;                                                                                                    _0x2bb542[_0x156820(0x3fc)] && (_0x2bb542[_0x156820(0x5c0)] = _0x3a0b1f[_0x156820(0x2c1)], duishiClickObjs[_0x156820(0x557)](_0x2bb542));                                                                                                });                                                                                                continue;                                                                                            case '2':                                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x44a)];                                                                                                continue;                                                                                            case '3':                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                    -(-0x1c0f + 0x2704 + -0x4fb + 0.9200000000000728),                                                                                                    -0x5 * -0x2e3 + -0x697 + -0x6cd * 0x1 + 0.7300000000000182,                                                                                                    -(0x5 * 0x68b + -0x2217 * 0x1 + 0x20c * 0x7 + 0.6300000000001091)                                                                                                ];                                                                                                continue;                                                                                            case '4':                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                    -(-0x3bf + 0x4f3 * -0x7 + -0x2c3b * -0x1 + 0.169399999999996),                                                                                                    0x11fa + -0x1da * -0xa + 0x236d * -0x1 + 0.3967000000000098,                                                                                                    -(-0x1265 + -0xec9 + 0x2e24 * 0x1 + 0.02930000000014843)                                                                                                ];                                                                                                continue;                                                                                            }                                                                                            break;                                                                                        }                                                                                    } else {                                                                                        if (_0x466a4d[_0x97b458(0x300)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3be)])) {                                                                                            const _0x3b150e = _0x466a4d[_0x97b458(0x2ae)][_0x97b458(0x524)]('|');                                                                                            let _0x31dbfb = 0x16bd * -0x1 + 0x328 + 0x1395;                                                                                            while (!![]) {                                                                                                switch (_0x3b150e[_0x31dbfb++]) {                                                                                                case '0':                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                        -(0x1377 + -0xb68 * 0x3 + -0x1f0a * -0x1 + 0.4228000000002794),                                                                                                        -0xd86 + 0x10d0 + -0x25d + 0.5186999999999955,                                                                                                        -(-0x2563 + 0x781 + 0x1 * 0x264c + 0.3270999999999731)                                                                                                    ];                                                                                                    continue;                                                                                                case '1':                                                                                                    _0x630886[_0x97b458(0x527)](_0x545d29 => {                                                                                                        const _0x1eb98e = _0x97b458;                                                                                                        _0x545d29[_0x1eb98e(0x3fc)] && (_0x545d29[_0x1eb98e(0x5c0)] = _0x466a4d[_0x1eb98e(0x317)], suishiClickObjs[_0x1eb98e(0x557)](_0x545d29));                                                                                                    });                                                                                                    continue;                                                                                                case '2':                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                        -(-0x2264 + -0x10a9 + -0xdd * -0x4e + 0.0500000000001819),                                                                                                        -0x34a + -0x24c0 + 0x28f1 + 0.060000000000002274,                                                                                                        -(0x19f0 + -0x6ba + 0x55 * -0x21 + 0.5500000000001819)                                                                                                    ];                                                                                                    continue;                                                                                                case '3':                                                                                                    fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                    continue;                                                                                                case '4':                                                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3a6)];                                                                                                    continue;                                                                                                }                                                                                                break;                                                                                            }                                                                                        } else {                                                                                            if (_0x466a4d[_0x97b458(0x4f6)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2b8)])) {                                                                                                const _0x243959 = _0x466a4d[_0x97b458(0x29f)][_0x97b458(0x524)]('|');                                                                                                let _0x1132d5 = -0x1bd4 + -0x125 + 0x1cf9;                                                                                                while (!![]) {                                                                                                    switch (_0x243959[_0x1132d5++]) {                                                                                                    case '0':                                                                                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                        continue;                                                                                                    case '1':                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                            -(0x173e + 0x59c + -0x2c * 0x52 + 0.9299999999998363),                                                                                                            -0x1 * -0x4a + 0x7 * 0x4a3 + -0x1f9d + 0.2300000000000182,                                                                                                            -(0x14c1 + -0x224 + -0xee3 * 0x1 + 0.5199999999999818)                                                                                                        ];                                                                                                        continue;                                                                                                    case '2':                                                                                                        _0x630886[_0x97b458(0x527)](_0x22bdc5 => {                                                                                                            const _0x55303c = _0x97b458;                                                                                                            _0x22bdc5[_0x55303c(0x3fc)] && (_0x22bdc5[_0x55303c(0x5c0)] = _0x466a4d[_0x55303c(0x503)], junhuaClickObjs[_0x55303c(0x557)](_0x22bdc5));                                                                                                        });                                                                                                        continue;                                                                                                    case '3':                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                            -(0x72d + 0x23e * 0x5 + -0x3a1 + 0.1950000000001637),                                                                                                            0x1ebd + -0x1 * 0x1b47 + -0x8 * 0x4a + 0.7178000000000111,                                                                                                            -(-0x21eb + -0x2e2 + 0x286c + 0.38610000000005584)                                                                                                        ];                                                                                                        continue;                                                                                                    case '4':                                                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x602)];                                                                                                        continue;                                                                                                    }                                                                                                    break;                                                                                                }                                                                                            } else {                                                                                                if (_0x466a4d[_0x97b458(0x528)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x302)])) {                                                                                                    const _0x4e3749 = _0x466a4d[_0x97b458(0x286)][_0x97b458(0x524)]('|');                                                                                                    let _0x137310 = -0x10a * 0x19 + -0x3d * -0x55 + -0x125 * -0x5;                                                                                                    while (!![]) {                                                                                                        switch (_0x4e3749[_0x137310++]) {                                                                                                        case '0':                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                -(0x26b6 + 0xf19 + -0x27d2 + 0.8899999999998727),                                                                                                                -0x1 * -0x156e + 0xf6 * -0x8 + -0xc9c + 0.22000000000002728,                                                                                                                -(-0x8f * 0x3a + -0x1095 + 0x67 * 0x83 + 0.4800000000000182)                                                                                                            ];                                                                                                            continue;                                                                                                        case '1':                                                                                                            _0x630886[_0x97b458(0x527)](_0x2914ec => {                                                                                                                const _0x59358e = _0x97b458;                                                                                                                _0x2914ec[_0x59358e(0x3fc)] && (_0x2914ec[_0x59358e(0x5c0)] = _0x3a0b1f[_0x59358e(0x64f)], junhuaClickObjs[_0x59358e(0x557)](_0x2914ec));                                                                                                            });                                                                                                            continue;                                                                                                        case '2':                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                -(-0x14f + -0xdb2 + 0x1cfe + 0.19090000000005602),                                                                                                                0x14 * 0xc9 + 0x2070 + -0x2efe + 0.30869999999998754,                                                                                                                -(0x1666 + 0x22f1 + -0x35b7 + 0.6746000000000549)                                                                                                            ];                                                                                                            continue;                                                                                                        case '3':                                                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x275)];                                                                                                            continue;                                                                                                        case '4':                                                                                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                            continue;                                                                                                        }                                                                                                        break;                                                                                                    }                                                                                                } else {                                                                                                    if (_0x466a4d[_0x97b458(0x219)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x269)])) {                                                                                                        const _0xe1765b = _0x466a4d[_0x97b458(0x5f7)][_0x97b458(0x524)]('|');                                                                                                        let _0x446b29 = 0x631 * 0x1 + -0x2482 + 0x1e51;                                                                                                        while (!![]) {                                                                                                            switch (_0xe1765b[_0x446b29++]) {                                                                                                            case '0':                                                                                                                _0x630886[_0x97b458(0x527)](_0x31f1c2 => {                                                                                                                    const _0x355d8d = _0x97b458;                                                                                                                    _0x31f1c2[_0x355d8d(0x3fc)] && (_0x31f1c2[_0x355d8d(0x5c0)] = _0x466a4d[_0x355d8d(0x503)], junhuaClickObjs[_0x355d8d(0x557)](_0x31f1c2));                                                                                                                });                                                                                                                continue;                                                                                                            case '1':                                                                                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                continue;                                                                                                            case '2':                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                    -(0x19ec + -0xe * 0x1b2 + 0xb53 + 0.07000000000016371),                                                                                                                    -0x3e * 0x1b + 0xd5 * 0x3 + 0x52d + 0.2300000000000182,                                                                                                                    -(0x1950 + -0x4b5 * -0x3 + -0xbe7 * 0x3 + 0.44000000000005457)                                                                                                                ];                                                                                                                continue;                                                                                                            case '3':                                                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4f4)];                                                                                                                continue;                                                                                                            case '4':                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                    -(-0x406 * 0x2 + 0x1 * 0x16a2 + 0x37 * -0x5 + 0.2199000000000524),                                                                                                                    -0x1 * -0x37f + -0x18 * -0x15e + -0x232a + 0.7355000000000018,                                                                                                                    -(-0xfd1 + -0xc20 + -0x1 * -0x1f95 + 0.30750000000000455)                                                                                                                ];                                                                                                                continue;                                                                                                            }                                                                                                            break;                                                                                                        }                                                                                                    } else {                                                                                                        if (_0x466a4d[_0x97b458(0x550)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x3e2)])) {                                                                                                            const _0x4535af = _0x466a4d[_0x97b458(0x590)][_0x97b458(0x524)]('|');                                                                                                            let _0x5cf387 = 0x1a0a + 0xd9f + -0x30d * 0xd;                                                                                                            while (!![]) {                                                                                                                switch (_0x4535af[_0x5cf387++]) {                                                                                                                case '0':                                                                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4dc)];                                                                                                                    continue;                                                                                                                case '1':                                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                        -(0x192c * 0x1 + 0x56c * 0x1 + 0x3e * -0x4a + 0.6161999999999352),                                                                                                                        0x1 * 0x20d8 + 0x13a * -0x8 + 0x15e2 * -0x1 + 0.31869999999997844,                                                                                                                        -(-0x14c + 0x2638 + 0x4 * -0x853 + 0.6698999999999842)                                                                                                                    ];                                                                                                                    continue;                                                                                                                case '2':                                                                                                                    fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                    continue;                                                                                                                case '3':                                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                        -(-0x19 * -0x9d + 0x33e + 0x1 * -0x5e6 + 0.4899999999997817),                                                                                                                        -0x10c8 + -0x1768 + -0x56 * -0x7b + 0.2300000000000182,                                                                                                                        -(-0x136f * 0x1 + -0xba3 + 0x22cc + 0.4700000000000273)                                                                                                                    ];                                                                                                                    continue;                                                                                                                case '4':                                                                                                                    _0x630886[_0x97b458(0x527)](_0x5ec9c5 => {                                                                                                                        const _0x251504 = _0x97b458;                                                                                                                        _0x5ec9c5[_0x251504(0x3fc)] && (_0x5ec9c5[_0x251504(0x5c0)] = _0x3a0b1f[_0x251504(0x64f)], junhuaClickObjs[_0x251504(0x557)](_0x5ec9c5));                                                                                                                    });                                                                                                                    continue;                                                                                                                }                                                                                                                break;                                                                                                            }                                                                                                        } else {                                                                                                            if (_0x466a4d[_0x97b458(0x2eb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5da)])) {                                                                                                                const _0x36ea0f = _0x466a4d[_0x97b458(0x493)][_0x97b458(0x524)]('|');                                                                                                                let _0x37abb0 = -0xf45 * -0x1 + -0x1a6b * 0x1 + -0xb26 * -0x1;                                                                                                                while (!![]) {                                                                                                                    switch (_0x36ea0f[_0x37abb0++]) {                                                                                                                    case '0':                                                                                                                        _0x630886[_0x97b458(0x527)](_0x1c4865 => {                                                                                                                            const _0x277a69 = _0x97b458;                                                                                                                            _0x1c4865[_0x277a69(0x3fc)] && (_0x1c4865[_0x277a69(0x5c0)] = _0x466a4d[_0x277a69(0x503)], junhuaClickObjs[_0x277a69(0x557)](_0x1c4865));                                                                                                                        });                                                                                                                        continue;                                                                                                                    case '1':                                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                            -(0x7 * -0x13 + -0x26da + 0x3331 + 0.3200000000001637),                                                                                                                            0x90 * -0xb + 0x2384 + -0x1c32 + 0.2300000000000182,                                                                                                                            -(0x12be + 0x14 * -0x1d6 + -0xc * -0x1cf + 0.4500000000000455)                                                                                                                        ];                                                                                                                        continue;                                                                                                                    case '2':                                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                            -(-0x1 * 0x2267 + -0x1b75 + 0x49ae + 0.4776999999999134),                                                                                                                            -0xcc * -0x2f + 0xed + -0x253c + 0.9200000000000159,                                                                                                                            -(0x34 * -0x74 + -0x1f02 + 0x3a35 + 0.15260000000000673)                                                                                                                        ];                                                                                                                        continue;                                                                                                                    case '3':                                                                                                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                        continue;                                                                                                                    case '4':                                                                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3dc)];                                                                                                                        continue;                                                                                                                    }                                                                                                                    break;                                                                                                                }                                                                                                            } else {                                                                                                                if (_0x466a4d[_0x97b458(0x38f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5b7)])) {                                                                                                                    const _0x4cdcc7 = _0x466a4d[_0x97b458(0x41f)][_0x97b458(0x524)]('|');                                                                                                                    let _0x332c91 = -0x1 * -0x40 + -0x589 + -0x1 * -0x549;                                                                                                                    while (!![]) {                                                                                                                        switch (_0x4cdcc7[_0x332c91++]) {                                                                                                                        case '0':                                                                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x5d5)];                                                                                                                            continue;                                                                                                                        case '1':                                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                -(-0x5ad + 0x5 * 0x2ff + -0x19 * -0x15 + 0.38999999999987267),                                                                                                                                -0x899 * 0x4 + 0x1d65 + 0x621 + 0.2300000000000182,                                                                                                                                -(-0x15cc + -0x6 * 0xe2 + 0xa46 * 0x3 + 0.6000000000000227)                                                                                                                            ];                                                                                                                            continue;                                                                                                                        case '2':                                                                                                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                            continue;                                                                                                                        case '3':                                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                -(-0x32c + 0x9 * 0x4a + -0x2fb * -0x4 + 0.8919000000000779),                                                                                                                                -0x179a + 0x221d + -0x95d + 0.11419999999998254,                                                                                                                                -(0x4 * 0x8b4 + 0x4 * 0x5bf + -0x362a + 0.08090000000004238)                                                                                                                            ];                                                                                                                            continue;                                                                                                                        case '4':                                                                                                                            _0x630886[_0x97b458(0x527)](_0xac5cbb => {                                                                                                                                const _0x12486e = _0x97b458;                                                                                                                                _0xac5cbb[_0x12486e(0x3fc)] && (_0xac5cbb[_0x12486e(0x5c0)] = _0x466a4d[_0x12486e(0x503)], junhuaClickObjs[_0x12486e(0x557)](_0xac5cbb));                                                                                                                            });                                                                                                                            continue;                                                                                                                        }                                                                                                                        break;                                                                                                                    }                                                                                                                } else {                                                                                                                    if (_0x466a4d[_0x97b458(0x468)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x45d)])) {                                                                                                                        const _0x3ef340 = _0x466a4d[_0x97b458(0x4a9)][_0x97b458(0x524)]('|');                                                                                                                        let _0x9954ef = -0x757 + -0x83 * 0x2e + 0x1ee1;                                                                                                                        while (!![]) {                                                                                                                            switch (_0x3ef340[_0x9954ef++]) {                                                                                                                            case '0':                                                                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x2c9)];                                                                                                                                continue;                                                                                                                            case '1':                                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                    -(0x713 * -0x5 + -0x1 * -0x872 + 0x2556 + 0.13000000000010914),                                                                                                                                    0xb07 * -0x3 + 0x133b + 0xefc + 0.2300000000000182,                                                                                                                                    -(0xb3b * 0x2 + 0x20ec * 0x1 + -0x33a8 + 0.4900000000000091)                                                                                                                                ];                                                                                                                                continue;                                                                                                                            case '2':                                                                                                                                _0x630886[_0x97b458(0x527)](_0x24fd58 => {                                                                                                                                    const _0x5a036e = _0x97b458;                                                                                                                                    _0x24fd58[_0x5a036e(0x3fc)] && (_0x24fd58[_0x5a036e(0x5c0)] = _0x466a4d[_0x5a036e(0x503)], junhuaClickObjs[_0x5a036e(0x557)](_0x24fd58));                                                                                                                                });                                                                                                                                continue;                                                                                                                            case '3':                                                                                                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                continue;                                                                                                                            case '4':                                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                    -(-0x3 * -0x563 + -0x7 * -0x82 + 0x4a7 * -0x2 + 0.29599999999982174),                                                                                                                                    0xb62 * 0x1 + -0x497 + 0x5a5 * -0x1 + 0.11419999999998254,                                                                                                                                    -(-0x2610 + -0xb92 + -0x65 * -0x87 + 0.9664000000000215)                                                                                                                                ];                                                                                                                                continue;                                                                                                                            }                                                                                                                            break;                                                                                                                        }                                                                                                                    } else {                                                                                                                        if (_0x466a4d[_0x97b458(0x58c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x373)])) {                                                                                                                            const _0x1a1cfa = _0x466a4d[_0x97b458(0x49c)][_0x97b458(0x524)]('|');                                                                                                                            let _0x3e362d = -0x5 * 0x10 + 0x72b * 0x1 + -0x6db;                                                                                                                            while (!![]) {                                                                                                                                switch (_0x1a1cfa[_0x3e362d++]) {                                                                                                                                case '0':                                                                                                                                    _0x630886[_0x97b458(0x527)](_0xf58bf2 => {                                                                                                                                        const _0x4a8357 = _0x97b458;                                                                                                                                        _0xf58bf2[_0x4a8357(0x3fc)] && (_0xf58bf2[_0x4a8357(0x5c0)] = _0x466a4d[_0x4a8357(0x503)], junhuaClickObjs[_0x4a8357(0x557)](_0xf58bf2));                                                                                                                                    });                                                                                                                                    continue;                                                                                                                                case '1':                                                                                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x41c)];                                                                                                                                    continue;                                                                                                                                case '2':                                                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                        -(-0x12bf + -0x1419 + 0x309c + 0.3400000000001455),                                                                                                                                        -0x19ae * 0x1 + -0x4c7 * 0x7 + 0x3c41 + 0.20999999999997954,                                                                                                                                        -(0xdb * 0x2a + 0x613 * 0x4 + -0x3880 + 0.6100000000000136)                                                                                                                                    ];                                                                                                                                    continue;                                                                                                                                case '3':                                                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                        -(0x1 * 0x1981 + 0x1de7 + -0x17 * 0x1fc + 0.3400000000001455),                                                                                                                                        -0x35 * -0x1 + -0x257a + 0x266b + 0.29869999999999663,                                                                                                                                        -(-0x210b + 0x2 * 0x3e2 + 0x7 * 0x421 + 0.7951000000000477)                                                                                                                                    ];                                                                                                                                    continue;                                                                                                                                case '4':                                                                                                                                    fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                    continue;                                                                                                                                }                                                                                                                                break;                                                                                                                            }                                                                                                                        } else {                                                                                                                            if (_0x466a4d[_0x97b458(0x5ba)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4d1)])) {                                                                                                                                const _0x109d8f = _0x466a4d[_0x97b458(0x619)][_0x97b458(0x524)]('|');                                                                                                                                let _0x316e92 = -0x1d8d + -0x258f + 0x431c;                                                                                                                                while (!![]) {                                                                                                                                    switch (_0x109d8f[_0x316e92++]) {                                                                                                                                    case '0':                                                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                            -(-0x11c3 + -0x1 * -0x25dc + 0xb15 * -0x1 + 0.4659999999998945),                                                                                                                                            -0x1608 + 0x1daa * 0x1 + -0x67c + 0.11419999999998254,                                                                                                                                            -(-0x6cf * 0x3 + 0x1a73 + -0x265 * 0x1 + 0.9063999999999623)                                                                                                                                        ];                                                                                                                                        continue;                                                                                                                                    case '1':                                                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                            -(-0x3c4 + 0x35 * -0xa7 + 0x2f5b + 0.3000000000001819),                                                                                                                                            0xeac * 0x2 + -0x23ee + 0x34 * 0x26 + 0.2300000000000182,                                                                                                                                            -(-0x41 * -0x61 + -0x1c58 + 0x771 * 0x1 + 0.42999999999995)                                                                                                                                        ];                                                                                                                                        continue;                                                                                                                                    case '2':                                                                                                                                        _0x630886[_0x97b458(0x527)](_0x21e839 => {                                                                                                                                            const _0x569500 = _0x97b458;                                                                                                                                            _0x21e839[_0x569500(0x3fc)] && (_0x21e839[_0x569500(0x5c0)] = _0x466a4d[_0x569500(0x503)], junhuaClickObjs[_0x569500(0x557)](_0x21e839));                                                                                                                                        });                                                                                                                                        continue;                                                                                                                                    case '3':                                                                                                                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                        continue;                                                                                                                                    case '4':                                                                                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x284)];                                                                                                                                        continue;                                                                                                                                    }                                                                                                                                    break;                                                                                                                                }                                                                                                                            } else {                                                                                                                                if (_0x466a4d[_0x97b458(0x595)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x618)])) {                                                                                                                                    const _0x4e6728 = _0x466a4d[_0x97b458(0x39d)][_0x97b458(0x524)]('|');                                                                                                                                    let _0x97bfbe = 0x3 * 0x70d + -0xde1 * -0x1 + -0x26 * 0xec;                                                                                                                                    while (!![]) {                                                                                                                                        switch (_0x4e6728[_0x97bfbe++]) {                                                                                                                                        case '0':                                                                                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x637)];                                                                                                                                            continue;                                                                                                                                        case '1':                                                                                                                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                            continue;                                                                                                                                        case '2':                                                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                                -(0x3e3 + -0x5 * -0x1ed + -0x54e + 0.38599999999996726),                                                                                                                                                -0xc32 + 0x2 * -0x31f + 0x1396 + 0.12419999999997344,                                                                                                                                                -(-0x2 * 0x2cd + 0xd * 0xa + -0x1 * -0x8b9 + 0.8863999999999805)                                                                                                                                            ];                                                                                                                                            continue;                                                                                                                                        case '3':                                                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                                -(-0x1845 + 0x7a7 * 0x3 + 0x986 + 0.2199999999997999),                                                                                                                                                -0x14db * -0x1 + 0x1a5c + 0x2f * -0xfb + 0.2400000000000091,                                                                                                                                                -(0x2226 + 0x3b * 0x13 + -0x1 * 0x22cd + 0.40999999999996817)                                                                                                                                            ];                                                                                                                                            continue;                                                                                                                                        case '4':                                                                                                                                            _0x630886[_0x97b458(0x527)](_0x1599f3 => {                                                                                                                                                const _0x5ab09b = _0x97b458;                                                                                                                                                _0x1599f3[_0x5ab09b(0x3fc)] && (_0x1599f3[_0x5ab09b(0x5c0)] = _0x466a4d[_0x5ab09b(0x503)], junhuaClickObjs[_0x5ab09b(0x557)](_0x1599f3));                                                                                                                                            });                                                                                                                                            continue;                                                                                                                                        }                                                                                                                                        break;                                                                                                                                    }                                                                                                                                } else {                                                                                                                                    if (_0x466a4d[_0x97b458(0x57a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2e7)])) {                                                                                                                                        const _0x5729b2 = _0x466a4d[_0x97b458(0x333)][_0x97b458(0x524)]('|');                                                                                                                                        let _0x5c4c84 = -0x13bc + 0x1eb * -0x9 + 0x21 * 0x11f;                                                                                                                                        while (!![]) {                                                                                                                                            switch (_0x5729b2[_0x5c4c84++]) {                                                                                                                                            case '0':                                                                                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3de)];                                                                                                                                                continue;                                                                                                                                            case '1':                                                                                                                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                                continue;                                                                                                                                            case '2':                                                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                                    -(-0x490 * 0x3 + 0xd9f + -0x3 * -0x2a1 + 0.43000000000006366),                                                                                                                                                    -0x1707 + 0x1 * -0x5f7 + -0x20 * -0xf1 + 0.2400000000000091,                                                                                                                                                    -(0x1f2d + 0x1 * -0x22e7 + 0x774 + 0.4600000000000364)                                                                                                                                                ];                                                                                                                                                continue;                                                                                                                                            case '3':                                                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                                    -(0x383 * 0x3 + 0x152 + 0x409 * -0x1 + 0.9281000000000859),                                                                                                                                                    0xfbb * -0x1 + 0x771 + 0x970 + 0.12419999999997344,                                                                                                                                                    -(0x2 * 0x515 + -0x19d8 + -0x134f * -0x1 + 0.940900000000056)                                                                                                                                                ];                                                                                                                                                continue;                                                                                                                                            case '4':                                                                                                                                                _0x630886[_0x97b458(0x527)](_0x593cdc => {                                                                                                                                                    const _0x1b1de0 = _0x97b458;                                                                                                                                                    _0x593cdc[_0x1b1de0(0x3fc)] && (_0x593cdc[_0x1b1de0(0x5c0)] = _0x3a0b1f[_0x1b1de0(0x64f)], junhuaClickObjs[_0x1b1de0(0x557)](_0x593cdc));                                                                                                                                                });                                                                                                                                                continue;                                                                                                                                            }                                                                                                                                            break;                                                                                                                                        }                                                                                                                                    } else {                                                                                                                                        if (_0x466a4d[_0x97b458(0x2f6)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2d8)])) {                                                                                                                                            const _0x133a9b = _0x466a4d[_0x97b458(0x3b3)][_0x97b458(0x524)]('|');                                                                                                                                            let _0x13cf7b = 0xfad + 0xc84 + -0x1c31 * 0x1;                                                                                                                                            while (!![]) {                                                                                                                                                switch (_0x133a9b[_0x13cf7b++]) {                                                                                                                                                case '0':                                                                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                                        -(-0xa0 + 0x1b0 + 0xc1b + 0.9600000000000364),                                                                                                                                                        0xb * -0x8d + -0x988 + -0x7e2 * -0x2 + 0.34770000000000323,                                                                                                                                                        -(0xe5d * 0x1 + 0xb * -0x19 + -0x953 + 0.6476000000000113)                                                                                                                                                    ];                                                                                                                                                    continue;                                                                                                                                                case '1':                                                                                                                                                    _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x563)];                                                                                                                                                    continue;                                                                                                                                                case '2':                                                                                                                                                    fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                                    continue;                                                                                                                                                case '3':                                                                                                                                                    _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                                        -(0xc0 * 0x7 + 0x21ea + -0x19ff + 0.9600000000000364),                                                                                                                                                        0x167 * -0xd + 0xdb5 * 0x2 + -0x906 + 0.5,                                                                                                                                                        -(0x26d4 * 0x1 + -0xc2f * -0x1 + -0x1 * 0x2ef5 + 0.9200000000000728)                                                                                                                                                    ];                                                                                                                                                    continue;                                                                                                                                                case '4':                                                                                                                                                    _0x630886[_0x97b458(0x527)](_0x35eb8e => {                                                                                                                                                        const _0x4b62fc = _0x97b458;                                                                                                                                                        _0x35eb8e[_0x4b62fc(0x3fc)] && (_0x35eb8e[_0x4b62fc(0x5c0)] = _0x3a0b1f[_0x4b62fc(0x64f)], junhuaClickObjs[_0x4b62fc(0x557)](_0x35eb8e));                                                                                                                                                    });                                                                                                                                                    continue;                                                                                                                                                }                                                                                                                                                break;                                                                                                                                            }                                                                                                                                        } else {                                                                                                                                            if (_0x466a4d[_0x97b458(0x1eb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x283)])) {                                                                                                                                                const _0x125624 = _0x466a4d[_0x97b458(0x4f2)][_0x97b458(0x524)]('|');                                                                                                                                                let _0x431488 = -0xf52 + -0x2276 + 0x8 * 0x639;                                                                                                                                                while (!![]) {                                                                                                                                                    switch (_0x125624[_0x431488++]) {                                                                                                                                                    case '0':                                                                                                                                                        _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x204)];                                                                                                                                                        continue;                                                                                                                                                    case '1':                                                                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                                            -(-0xc5 * -0x2b + -0x2653 + 0x1267 + 0.6552999999998974),                                                                                                                                                            0x13df + -0xd46 + -0x66e + 0.11030000000000229,                                                                                                                                                            -(0xcaf * -0x1 + -0x2 * -0x241 + -0xaf * -0x11 + 0.7545000000000073)                                                                                                                                                        ];                                                                                                                                                        continue;                                                                                                                                                    case '2':                                                                                                                                                        _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                                            -(0x21 * 0x100 + 0x2308 + -0x1 * 0x36dd + 0.9400000000000546),                                                                                                                                                            0x7 * -0x36a + 0x57 * -0x33 + 0x2962 + 0.7800000000000011,                                                                                                                                                            -(-0xe0 * 0x1 + -0x769 * -0x3 + -0x149 * 0xe + 0.7300000000000182)                                                                                                                                                        ];                                                                                                                                                        continue;                                                                                                                                                    case '3':                                                                                                                                                        _0x630886[_0x97b458(0x527)](_0x38d71b => {                                                                                                                                                            const _0x2e8940 = _0x97b458;                                                                                                                                                            _0x38d71b[_0x2e8940(0x3fc)] && (_0x38d71b[_0x2e8940(0x5c0)] = _0x466a4d[_0x2e8940(0x503)], junhuaClickObjs[_0x2e8940(0x557)](_0x38d71b));                                                                                                                                                        });                                                                                                                                                        continue;                                                                                                                                                    case '4':                                                                                                                                                        fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                                        continue;                                                                                                                                                    }                                                                                                                                                    break;                                                                                                                                                }                                                                                                                                            } else {                                                                                                                                                if (_0x466a4d[_0x97b458(0x36e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x486)])) {                                                                                                                                                    const _0x57ecd8 = _0x466a4d[_0x97b458(0x333)][_0x97b458(0x524)]('|');                                                                                                                                                    let _0x22bfe3 = -0xd2f + -0x1 * -0x154c + -0x1 * 0x81d;                                                                                                                                                    while (!![]) {                                                                                                                                                        switch (_0x57ecd8[_0x22bfe3++]) {                                                                                                                                                        case '0':                                                                                                                                                            _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x5dd)];                                                                                                                                                            continue;                                                                                                                                                        case '1':                                                                                                                                                            fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                                            continue;                                                                                                                                                        case '2':                                                                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                                                -(0x1788 * -0x1 + 0x1 * -0xc6f + 0x2d31 + 0.21000000000003638),                                                                                                                                                                0x407 + -0x1a0b + 0x162d + 0.509999999999998,                                                                                                                                                                -(0x1bdd + 0x1 * 0x1fb2 + 0x5 * -0xb1a + 0.7100000000000364)                                                                                                                                                            ];                                                                                                                                                            continue;                                                                                                                                                        case '3':                                                                                                                                                            _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                                                -(0x7 * 0x31 + -0x1 * -0x1df2 + 0x2c2 * -0x8 + 0.8778999999999542),                                                                                                                                                                0x88 * -0x29 + 0xbee + 0xa07 * 0x1 + 0.3941999999999979,                                                                                                                                                                -(0x1f * -0x42 + 0x7 * 0x25a + -0x483 + 0.18809999999996307)                                                                                                                                                            ];                                                                                                                                                            continue;                                                                                                                                                        case '4':                                                                                                                                                            _0x630886[_0x97b458(0x527)](_0x4da406 => {                                                                                                                                                                const _0x345d1c = _0x97b458;                                                                                                                                                                _0x4da406[_0x345d1c(0x3fc)] && (_0x4da406[_0x345d1c(0x5c0)] = _0x466a4d[_0x345d1c(0x503)], junhuaClickObjs[_0x345d1c(0x557)](_0x4da406));                                                                                                                                                            });                                                                                                                                                            continue;                                                                                                                                                        }                                                                                                                                                        break;                                                                                                                                                    }                                                                                                                                                } else {                                                                                                                                                    if (_0x466a4d[_0x97b458(0x1fa)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x470)])) {                                                                                                                                                        const _0x381e9e = _0x466a4d[_0x97b458(0x4c0)][_0x97b458(0x524)]('|');                                                                                                                                                        let _0x52ea31 = -0x2 * 0x9fe + -0x1831 + 0x2c2d;                                                                                                                                                        while (!![]) {                                                                                                                                                            switch (_0x381e9e[_0x52ea31++]) {                                                                                                                                                            case '0':                                                                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x32a) + _0x97b458(0x237)] = [                                                                                                                                                                    -(-0x4ed + 0x2303 * 0x1 + -0x4 * 0x537 + 0.15999999999985448),                                                                                                                                                                    0xe22 + -0x2 * -0xe87 + 0x2b09 * -0x1 + 0.759999999999998,                                                                                                                                                                    -(-0x25 * 0x8b + -0x25a9 * 0x1 + 0x3d1d + 0.7999999999999545)                                                                                                                                                                ];                                                                                                                                                                continue;                                                                                                                                                            case '1':                                                                                                                                                                fenchengnongduDeviceArrs[_0x97b458(0x557)](_0x630886);                                                                                                                                                                continue;                                                                                                                                                            case '2':                                                                                                                                                                _0x630886[_0x97b458(0x527)](_0x3d5391 => {                                                                                                                                                                    const _0x307025 = _0x97b458;                                                                                                                                                                    _0x3d5391[_0x307025(0x3fc)] && (_0x3d5391[_0x307025(0x5c0)] = _0x3a0b1f[_0x307025(0x64f)], junhuaClickObjs[_0x307025(0x557)](_0x3d5391));                                                                                                                                                                });                                                                                                                                                                continue;                                                                                                                                                            case '3':                                                                                                                                                                _0x630886[_0x97b458(0x3ec)][_0x97b458(0x2de) + 'a'] = [                                                                                                                                                                    -(-0x23bf + 0x1c34 + 0x10c5 + 0.017600000000129512),                                                                                                                                                                    -0x198a + 0x795 + -0x910 * -0x2 + 0.09029999999999916,                                                                                                                                                                    -(0xc50 + -0x3 * 0xc28 + 0x1b9a + 0.8259000000000469)                                                                                                                                                                ];                                                                                                                                                                continue;                                                                                                                                                            case '4':                                                                                                                                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x38c)];                                                                                                                                                                continue;                                                                                                                                                            }                                                                                                                                                            break;                                                                                                                                                        }                                                                                                                                                    }                                                                                                                                                }                                                                                                                                            }                                                                                                                                        }                                                                                                                                    }                                                                                                                                }                                                                                                                            }                                                                                                                        }                                                                                                                    }                                                                                                                }                                                                                                            }                                                                                                        }                                                                                                    }                                                                                                }                                                                                            }                                                                                        }                                                                                    }                                                                                }                                                                            }                                                                        }                                                                    }                                                                }                                                            }                                                        }                                                    }                                                }                                            }                                        }                                    }                                }                            }                        }                    }                } else {                    if (_0x466a4d[_0x97b458(0x367)](_0x630886[_0x97b458(0x5dc)], _0x466a4d[_0x97b458(0x580)])) {                        if (_0x466a4d[_0x97b458(0x360)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x23c)]))                            (_0x466a4d[_0x97b458(0x3f4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4b4)]) || _0x466a4d[_0x97b458(0x33d)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5c5)])) && _0x630886[_0x97b458(0x527)](_0x2d72d7 => {                                const _0x32d142 = _0x97b458;                                if (_0x2d72d7[_0x32d142(0x3fc)]) {                                    const _0x31ef8d = _0x466a4d[_0x32d142(0x1cb)][_0x32d142(0x524)]('|');                                    let _0x430ac5 = -0x1988 + 0x1774 + 0x214;                                    while (!![]) {                                        switch (_0x31ef8d[_0x430ac5++]) {                                        case '0':                                            _0x2d72d7[_0x32d142(0x3ec)][_0x32d142(0x40e)] = _0x630886;                                            continue;                                        case '1':                                            (_0x466a4d[_0x32d142(0x640)](_0x2d72d7[_0x32d142(0x5c0)], _0x466a4d[_0x32d142(0x617)]) || _0x466a4d[_0x32d142(0x314)](_0x2d72d7[_0x32d142(0x5c0)], _0x466a4d[_0x32d142(0x54f)])) && (_0x2d72d7[_0x32d142(0x5d8)][_0x32d142(0x21c)] = _0x2d72d7[_0x32d142(0x5d8)][_0x32d142(0x21c)][_0x32d142(0x5df)](), _0x2d72d7[_0x32d142(0x5d8)][_0x32d142(0x21c)][_0x32d142(0x2a6) + 'e'] = !![], limojiJiaodaiObjs[_0x32d142(0x557)](_0x2d72d7));                                            continue;                                        case '2':                                            limoClickObjs[_0x32d142(0x557)](_0x2d72d7);                                            continue;                                        case '3':                                            _0x466a4d[_0x32d142(0x4d3)](_0x630886[_0x32d142(0x5c0)], _0x466a4d[_0x32d142(0x5c5)]) && (_0x2d72d7[_0x32d142(0x5c0)] = _0x466a4d[_0x32d142(0x247)]);                                            continue;                                        case '4':                                            _0x466a4d[_0x32d142(0x214)](_0x630886[_0x32d142(0x5c0)], _0x466a4d[_0x32d142(0x4b4)]) && (_0x2d72d7[_0x32d142(0x5c0)] = _0x466a4d[_0x32d142(0x4e7)]);                                            continue;                                        }                                        break;                                    }                                }                            });                        else {                            if (_0x466a4d[_0x97b458(0x61c)](_0x351f2a[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5af)])) {                                if (_0x466a4d[_0x97b458(0x3f0)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4a7)]) || _0x466a4d[_0x97b458(0x375)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4e4)]) || _0x466a4d[_0x97b458(0x3ef)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1d9)]) || _0x466a4d[_0x97b458(0x62f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x498)]) || _0x466a4d[_0x97b458(0x5f9)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5c8)]) || _0x466a4d[_0x97b458(0x581)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4a6)]) || _0x466a4d[_0x97b458(0x43e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x268)]) || _0x466a4d[_0x97b458(0x38f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5f3)]) || _0x466a4d[_0x97b458(0x1c1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x463)]) || _0x466a4d[_0x97b458(0x5d3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x411)]) || _0x466a4d[_0x97b458(0x61e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x361)]) || _0x466a4d[_0x97b458(0x1ee)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2c6)]) || _0x466a4d[_0x97b458(0x3b4)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x32e)]) || _0x466a4d[_0x97b458(0x546)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x26b)]) || _0x466a4d[_0x97b458(0x24a)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5e5)]) || _0x466a4d[_0x97b458(0x5bc)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x381)]) || _0x466a4d[_0x97b458(0x324)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5c7)])) {                                    const _0x27a54a = _0x466a4d[_0x97b458(0x538)][_0x97b458(0x524)]('|');                                    let _0x39d89e = -0x1136 + 0x17e1 + -0x6ab;                                    while (!![]) {                                        switch (_0x27a54a[_0x39d89e++]) {                                        case '0':                                            if (_0x466a4d[_0x97b458(0x201)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x268)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x641)];                                            continue;                                        case '1':                                            if (_0x466a4d[_0x97b458(0x2ec)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5e5)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x5db)];                                            continue;                                        case '2':                                            if (_0x466a4d[_0x97b458(0x1c1)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x381)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x55b)];                                            continue;                                        case '3':                                            if (_0x466a4d[_0x97b458(0x1e2)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5c7)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x45a)];                                            continue;                                        case '4':                                            if (_0x466a4d[_0x97b458(0x646)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4a7)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4df)];                                            continue;                                        case '5':                                            if (_0x466a4d[_0x97b458(0x510)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5f3)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x2f0)];                                            continue;                                        case '6':                                            if (_0x466a4d[_0x97b458(0x4bd)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x463)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x46b)];                                            continue;                                        case '7':                                            if (_0x466a4d[_0x97b458(0x5c3)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x361)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x20d)];                                            continue;                                        case '8':                                            if (_0x466a4d[_0x97b458(0x442)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x411)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x531)];                                            continue;                                        case '9':                                            if (_0x466a4d[_0x97b458(0x28e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x32e)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x325)];                                            continue;                                        case '10':                                            duishishitouquantity[_0x97b458(0x557)](_0x630886);                                            continue;                                        case '11':                                            if (_0x466a4d[_0x97b458(0x646)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x1d9)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x4a5)];                                            continue;                                        case '12':                                            if (_0x466a4d[_0x97b458(0x25c)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x498)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x462)];                                            continue;                                        case '13':                                            if (_0x466a4d[_0x97b458(0x28e)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x2c6)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x3d7)];                                            continue;                                        case '14':                                            if (_0x466a4d[_0x97b458(0x30f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x26b)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x22e)];                                            continue;                                        case '15':                                            if (_0x466a4d[_0x97b458(0x3eb)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4e4)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x444)];                                            continue;                                        case '16':                                            if (_0x466a4d[_0x97b458(0x38f)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x4a6)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x359)];                                            continue;                                        case '17':                                            if (_0x466a4d[_0x97b458(0x592)](_0x630886[_0x97b458(0x5c0)], _0x466a4d[_0x97b458(0x5c8)]))                                                _0x630886[_0x97b458(0x3ec)]['id'] = _0x466a4d[_0x97b458(0x472)];                                            continue;                                        }                                        break;                                    }                                }                            }                        }                    }                }            }        });    },    'onLoad': () => {        const _0x4fcb5d = _0x5c5622, _0x1a92ae = {                'uZBXn': function (_0x35961c) {                    return _0x35961c();                },                'jZVbk': function (_0x26f293) {                    return _0x26f293();                },                'KpqqC': function (_0x2933d0) {                    return _0x2933d0();                },                'iLSFo': function (_0xa9fc2a) {                    return _0xa9fc2a();                },                'bjYuV': function (_0x2f849e) {                    return _0x2f849e();                },                'FKTfz': function (_0x5d58bd, _0x5d31e6, _0x5d8d0a) {                    return _0x5d58bd(_0x5d31e6, _0x5d8d0a);                }            };        container[_0x4fcb5d(0x273) + _0x4fcb5d(0x358)](), defaultSky = container[_0x4fcb5d(0x344)], _0x1a92ae[_0x4fcb5d(0x628)](addOutRoadLEDPlane), _0x1a92ae[_0x4fcb5d(0x535)](addRoomUpLedPlanePlane), _0x1a92ae[_0x4fcb5d(0x2bb)](addLimoRoomMainMachineText), _0x1a92ae[_0x4fcb5d(0x628)](addDevicePlane), _0x1a92ae[_0x4fcb5d(0x33b)](addCameraDevicePlane), _0x1a92ae[_0x4fcb5d(0x2c8)](addDuichangLEDPlane), _0x1a92ae[_0x4fcb5d(0x628)](render), _0x1a92ae[_0x4fcb5d(0x266)](setTimeout, () => {            const _0x3643f7 = _0x4fcb5d;            callback && _0x1a92ae[_0x3643f7(0x2bb)](callback);        }, -0xe + 0x21 * -0x119 + 0x2c17), container[_0x4fcb5d(0x236) + 'ts'] = [defaultSky];        const _0x3b7243 = new THREE[(_0x4fcb5d(0x281)) + 'y'](0x8f * -0x43 + -0x10f7 + 0x3665, -0x7 * 0xcb + 0x1226 * 0x1 + 0xc8f * -0x1, 0x3 * 0x6dc + -0xcb * 0x1d + 0x26c), _0x2cea8d = new THREE[(_0x4fcb5d(0x488)) + (_0x4fcb5d(0x4fb))]({ 'color': 0xff00 });        locationCube = new THREE[(_0x4fcb5d(0x233))](_0x3b7243, _0x2cea8d), locationCube[_0x4fcb5d(0x59d)][_0x4fcb5d(0x5eb)](-0x5c * -0x29 + -0x28 * -0x10 + -0x113c, -0xf4 * 0x1 + -0x21c2 + 0x22b6, 0x6ba + 0x1 * 0x1318 + -0x19d2), locationCube[_0x4fcb5d(0x2b0)] = ![], container[_0x4fcb5d(0x2e0)](locationCube), container[_0x4fcb5d(0x63d) + 'ns'][_0x4fcb5d(0x453)](_0x34afa0 => {            const _0x31e257 = _0x4fcb5d;            _0x34afa0[_0x31e257(0x2f1)] = ![];        });    }}));function _0x1ec3() {    const _0x27315b = [        'FpxhU',        '13|10|6|3|',        '筛分胶带机2带透明通',        '4|3|0|2|1',        'VagSi',        '立磨提升机2',        'qRkqq',        '给料皮带秤M08',        'kyysa',        '立磨输送机3',        'ae5ad0d60f',        'vUADQ',        '立磨前仓6A',        'UseEl',        'wrhJc',        '堆石LED7石头',        'uRZbL',        'DKzDy',        'ff4f97b09a',        'bHlLb',        'xITRb',        'vyTWt',        'oXxbV',        'quvGp',        'wjzAP',        '磨前仓M02A',        'aKvoX',        '巡检机器人',        '堆石LED8石头',        '1672044706',        '立磨收尘器7带透明通',        '破碎皮带机1_2',        '0002553e',        'bAWzi',        'Vector2',        '立磨提升机6',        'vKNaZ',        'split',        'Fxhdd',        'JMJrC',        'traverse',        'tElQy',        'zANkC',        'eChah',        '均化间外墙_1',        'SISFx',        'opacity',        'VRFTV',        'CJ-BJJ_2',        'center',        'XKrHN',        'transType',        '堆石LED16石头',        'QajTJ',        'KpqqC',        'vmuay',        '180369FHfUXs',        'snFwC',        '粉尘浓度003',        'QMVYV',        'tdXZn',        '立磨收尘器5带透明通',        'qSXHv',        'ssAzF',        'ZPznf',        'HbBIG',        '3|4',        'qNTIr',        'ESJLb',        '立磨间重点区域摄像头',        'rimKE',        'jCsEn',        'KZcEB',        '破碎楼上皮带机2_2',        'DFvgr',        '压缩空气管道动画',        'wJjbm',        'CwtrH',        'sILbY',        '11|7|12|1|',        'cswvZ',        'TlUwN',        'DXeko',        'KllYu',        'tzpkF',        'qDuTH',        'pCxrK',        'rotation',        'push',        '给料皮带秤M07A',        '4|1|3|5|0|',        '0006b413',        'XpnSH',        '1672825567',        'YIDONG-001',        '1672825616',        '破碎间.glb',        '立磨摄像头M05皮带',        'sZkfl',        '立磨机主体7_1',        'NuSTt',        'GkFpj',        'adhwa',        'robotTopPl',        '立磨输送机1',        'LxAQS',        'dLGHd',        '3|4|1|0|2|',        '4|15|11|12',        '3b43c9abcb',        'tzdc-3-8',        '000fb72f',        '立磨输送机7',        '磁悬浮风机管道',        '1672044802',        'dvYMY',        '堆石LED11石头',        'Xhuxs',        '4693ca0743',        '立磨发送罐8',        '均化摄像头1',        'wVjFr',        'CJ-FZ-001',        'aeukl',        'yPqHl',        'WmQZk',        '0|2|3|1|4',        'eFSYj',        'yUfHv',        'EUqfw',        'eGFwm',        '一般风险区域',        'try',        'plCBu',        'wMuQY',        'YdKMy',        '给料汇总皮带M04',        '立磨行车2_1',        '密相泵M0',        '立磨输送机2',        '立磨输送机6_2',        'SSMGE',        'xENzG',        'auAAu',        'NXqaZ',        'JhGpI',        'DoubleSide',        'nogMy',        '立磨收尘管道',        'BGrbR',        'HDszt',        '碎石楼下胶带机1带透',        'tLtyS',        'KvVly',        '均化间.glb',        '立磨发送罐6',        'Lrzkn',        '立磨输送机5B',        'position',        '立磨前仓2B',        'WzIWn',        '000692b7',        'brNuP',        '筛分胶带机1带透明通',        '立磨胶带机4带透明通',        '0|2|4|3|1',        'QLpAS',        '磁悬浮风机管道动画',        'LqUin',        'iuonF',        'PwEKA',        'Container',        'FHnuD',        'CXcbe',        '罗茨风机管道动画',        '四色图.glb',        'qUugY',        'InwxI',        '筛分皮带机2_2',        'IEshC',        'OOFIb',        'aUudh',        'dhLys',        '8vwiPYe',        'SifMO',        'jxmWk',        '2|1|0|5|3|',        'ZXXbt',        '1668402506',        'vIVVw',        'GFYMu',        '3d/models/',        'RkIgD',        'name',        '0007f861',        'ySqjS',        'yyTAU',        '立磨行车1_1',        'RzVKa',        'MORMp',        'uPtTX',        'AUEip',        'kWHNE',        'lTdFh',        'lookAt',        '立磨电机1',        'ghThF',        '立磨输送机4',        'tcMZB',        '1|2|3|4|0',        'EpoWq',        'zyZQs',        'aNvzT',        'koDVZ',        'xLeDZ',        '碎石到筛分胶带机1带',        'pfOmp',        'material',        'tzdc-3-3',        'HHdNX',        'xZqIc',        'type',        'ghwur',        '5|3|2|0|1|',        'clone',        'hXqyH',        'YaRYX',        '立磨间',        'QSRZM',        'avFee',        'UwvzA',        '粉尘浓度010',        'keYOn',        '000906c1',        '立磨机主体2_1',        'egqOP',        'set',        'azGHm',        'JWwXp',        'IwKEA',        'XwSZo',        'Nrleb',        '立磨输送机5_2',        '报警.glb',        'CXtZm',        '给料皮带秤M04A',        'GArjP',        'CREqi',        'oNbmz',        '立磨密封料仓1',        'LxNnF',        'GBSdF',        '给料皮带秤M07B',        'rwGOl',        'YcBBK',        'xkERv',        '000f4cb7',        'KuaZT',        'KdRNQ',        'hMTrA',        'BlBDg',        '立磨机',        '1|0|3|4|2',        'ELkJj',        '立磨前仓4A',        'Wlinq',        '立磨收尘器6带透明通',        '1668403339',        'LxLRj',        '立磨前仓8',        'BwkZV',        '给料皮带秤M02A',        'a80b73009a',        'MPBOH',        '产线外房间',        'PNBwv',        '立磨摄像头M07回料',        'jHQMI',        'aeVOD',        'olSqE',        'livhH',        'ISboJ',        'UiSan',        'YUiXF',        '000ecb01',        'FlFfH',        '000425f8',        'CJiPc',        '3|4|2|0|5|',        'dwigq',        '2|4|0|3|1',        '氧浓度003',        'HtjaD',        'SmAVL',        'DqqJr',        'ETbEC',        'KGnvY',        'jZVbk',        'KZWmO',        '0|8|5|4|9|',        '破碎楼上皮带机1_2',        '0|4|3|5|1|',        '破碎间外墙带透明通道',        'ptXTt',        'NkGgT',        '堆石LED14石头',        'QPzao',        '碎石配料间外墙带透明',        'xCsxB',        '粉尘浓度005',        'slice',        '堆石LED15石头',        'DLffI',        'AKLEN',        '1672044593',        '0004a1cb',        '立磨输送机7_2',        'addBloom',        'mixerActio',        '00039a6f',        '输送管道',        'PvhgM',        'jzreX',        '10.12.108.',        'TJPOK',        '000f8fb4',        '立磨摄像头M05回料',        'xoyBJ',        'b0aa4c4cdb',        '磨前仓M08',        'KjVob',        '堆石场一外墙_1',        '立磨前仓5B',        '00043b38',        '堆石厂',        '道_1',        'LVNAz',        'bEeHI',        'WKbZO',        'lvSuL',        'NIuNf',        '立磨前仓2A',        'includes',        'rzZLS',        '堆石LED13石头',        '立磨摄像头',        '立磨电机2',        'dqDdn',        '立磨发送罐1',        '9|14|1|2|3',        '9b4e69a6ee',        'fdzMA',        'DvEJP',        '管道桥',        'yZujw',        '立磨输送机7A',        '筛分间',        'tzdc-3-5',        'MKmFX',        '33e22d6c78',        'Pvvse',        'VOtQl',        '1|0|2|4|3',        '磨前仓M04A',        '立磨前仓4B',        '0005c842',        'UPhBU',        '1672044840',        '氧浓度013',        'dow',        'HOtFE',        '磨前仓M05A',        'BZMOs',        '118022YPYhDD',        '破碎胶带机2带透明通',        '立磨输送机1_2',        '明通道_2',        'okfOR',        'renderOrde',        'vWGNQ',        'dohpt',        '碎石移小车体2_2',        'zuYLZ',        '粉尘浓度008',        'NwuGN',        'cwVLR',        'add',        'UXxKp',        'KpcwD',        'owpez',        '立磨摄像头M04回料',        '4|1|3|0|2',        '筛分皮带机1_2',        'scale',        '磨前仓M06B',        '00069b09',        'HMPnf',        'ojgnh',        'jBknt',        '给料皮带秤M05A',        'EqIsW',        'VHKNG',        '立磨输送机6A',        '0002d46d',        'bRWvH',        'GUnNF',        'wEWte',        'zeAeF',        'uhCQR',        'mweky',        'ywkBR',        'RCHJQ',        'neRobotLim',        'LnGlT',        'tUxTj',        'PzJmQ',        'ecXtC',        'bRvMB',        '产线外房间.glb',        '6IzWQXZ',        'GbVnr',        'wXUvV',        '立磨输送机3_2',        '1672044906',        '立磨电机6',        'LrDcm',        '氧浓度010',        'fcaac0a52d',        '均化摄像头3',        'okRWm',        'SJYbP',        'Ixqwt',        '0|1|3|2|4',        'qldXe',        '000eef89',        'Group',        'JcXOq',        'miNyi',        'GrNaz',        'WtfAn',        '4e4e1482af',        '车/车.gltf',        '000cf96b',        '草坪.glb',        '堆石LED6石头',        'XRAfH',        '粉尘浓度006',        'iyQjU',        'NZvoI',        '密封料仓M0',        'tfxct',        '粉尘浓度004',        'ItFhI',        'HEZtH',        '立磨提升机1',        'dSncM',        '堆石LED17石头',        'TqqVe',        'transparen',        '水管动画',        'pRPUP',        '4|0|3|1|2|',        'VSGav',        'map',        '|6|8|7|13|',        '立磨输送机6B',        '堆石LED1石头',        'orbit',        'BMvfx',        '000648b1',        '移动卸料小车胶带机P',        '00077ff6',        'aneText',        'tNiAY',        'JGndA',        'wiUDN',        '给料汇总皮带M02',        'CJ-FZ-002',        '立磨密封料仓8',        'yoBCw',        'vaYTE',        'abuHr',        'sSBYF',        'uakVO',        'rnFuZ',        'jBFMd',        'Mesh',        'UckDJ',        'dUsKt',        'clickObjec',        'ols',        '00044875',        '立磨输送机5A',        '立磨摄像头M02回料',        '透明通道',        'yHyxn',        'LZAwE',        'MHkBS',        '堆石LED4石头',        'nrDtf',        'aKhPF',        'ECOSq',        'JRlbN',        '1672044939',        'VQLph',        '立磨输送机4A',        'xmmvS',        '5|0|1|2|3|',        'pJybL',        'UMpaf',        'zEIUS',        '磨前仓M07A',        '立磨发送罐4',        '立磨密封料仓6',        'tzdc-3-6',        '3597768ITlceT',        'QJxkd',        'JMoSY',        '氧浓度012',        '3d/7.hdr',        'MevAx',        '立磨输送机7B',        'P117-1',        '立磨机主体6_1',        'UaukT',        'JH-SCG-',        '立磨摄像头M08皮带',        'hMFcF',        'pfrjE',        '给料皮带秤M03',        'zBDoh',        'YChpL',        'tzdc-4-17',        '四色图',        '立磨电机7',        '氮气管道',        'WnbWu',        'FKTfz',        'tzdc-3-2',        'Pwlvl',        'FUliE',        '00026a96',        'Zguos',        'P115',        'TYgcP',        '粉尘浓度016',        '氧浓度005',        '1|0|2|3|4',        '654036uRvHUN',        'pPKiO',        'windowResi',        'LTvuC',        'EQmHN',        '粉尘浓度001',        '通道_2',        'rbHDC',        '立磨胶带机1带透明通',        'ERCEy',        'gDNuN',        'JhLcv',        '274194a9c6',        'PlaneGeome',        'SCvgu',        '2|3|4|0|1',        'BoxGeometr',        '2|1|0|4|3',        'Kiavx',        'SRqfk',        '均化摄像头6',        'nCteZ',        '立磨密封料仓7',        '磨前仓M07B',        'LvRAM',        '1672044628',        'xEOwi',        '磨前仓M04B',        '1|3|2|5|4|',        'EKzGj',        '管道.glb',        '碎石小车体1_2',        '5|0|4|2|1|',        '网格017_1',        'nIUEU',        'ZKktF',        '立磨收尘器4带透明通',        'epmOu',        'foHFf',        'fcaRn',        '碎石输送机_4',        '立磨发送罐5',        'LCUKF',        '立磨输送机8',        'gtaBe',        'abNqq',        'YgNrW',        'reSyq',        'tjCHj',        'oRTpV',        'rpwUd',        '立磨提升机5',        '1672825770',        'needsUpdat',        '地面.glb',        'IkrhH',        'tVLDv',        'LSvTX',        '立磨摄像头M04皮带',        'uaBEy',        '立磨机主体4_1',        'Vctqg',        'bee194c934',        'visible',        '2803630kBqHcM',        'eVELD',        '4|2|5|0|1|',        'zCRSf',        '3c4737a392',        'kmtoP',        '立磨机主体1_1',        'BJrak',        'XMPDo',        '5|2|7|3|4|',        'uZBXn',        '氧浓度009',        'LYBxD',        '氧浓度007',        'b7c4a56d1f',        'rblEe',        'xoVsZ',        'WXGdu',        'bOopm',        'ZPmja',        'tzdc-4-9',        'PnINq',        'iUNsd',        'bjYuV',        'uAqPQ',        '0|2|1|3|4|',        'cJrWL',        'NQUbG',        '堆石LED2石头',        '碎石楼上胶带机2带透',        'UhkKZ',        '立磨前仓3',        '立磨摄像头P114-',        'jAxGW',        'WZOrI',        '1|3|0|2|4',        'PjHny',        '排气管道',        'uRCJE',        'iHGql',        'Fjdtz',        'gdLPg',        '1672889351',        'ypKzy',        'tzdc-4-16',        'focusCamer',        '0|2|1|4|3',        'attach',        'TLhIR',        '立磨密封料仓4',        'jXXEv',        'yBlzd',        'dqhTV',        'depthTest',        'yDJJi',        '000090d6',        '4|1|2|3|0',        'eseWX',        'sOoSI',        'FHxze',        'YSXto',        '粉尘浓度002',        '1672044470',        'ubHOM',        'paused',        '风机M0',        '4|0|3|1|2',        'oRhps',        '000efd5c',        'rqmOR',        'XiLpA',        'xdlaO',        '4|3|1|2|0',        '3d/8.jpg',        'rJNKb',        '立磨前仓5A',        '给料皮带秤M02B',        '粉尘浓度014',        '给料皮带秤M04B',        'kFLDs',        'Wecyd',        'ozXxE',        'JRCxZ',        'wodOZ',        '给料皮带秤M05B',        'miOlY',        'svwaJ',        'NeEmG',        '1|2|0|3|4',        '立磨提升机3',        '粉尘浓度012',        'Shwid',        'psSXY',        '000ed044',        'CqUhb',        'vTfLr',        'gcgdh',        'tzdc-4-12',        'dlIuY',        'njCIX',        'kiwHR',        '立磨发送罐3',        'THYmC',        'TcjQJ',        '1672825662',        'plwCn',        '4|1|0|3|2',        '|10',        'yeffi',        'AODBp',        'mWYMT',        'gpLVw',        'SgfOZ',        'gUMfK',        '000f0cac',        'QYApD',        'glXGO',        'lIGIh',        '73549ad78f',        'lSdQe',        'wfLnq',        'focusContr',        'UioDt',        '3|6|7',        'receiveSha',        'UcnGT',        '堆石LED3石头',        '立磨输送机2A',        'WRyst',        '安全疏散',        'pClQG',        'iCjoU',        'BAbZe',        'EYZXv',        'aiWKI',        'hmIfj',        '9riBQSE',        'aerOr',        'iLSFo',        '1|4|3|2|0|',        'NqvDT',        '#ffffff',        '000cf4c6',        '给料皮带秤M01',        '3|1|4|5|0|',        '立磨密封料仓3',        'kpnHB',        'sky',        '透明通道_2',        'agjIB',        '磨前仓M02B',        '氧浓度014',        'TYwRh',        '0|3|1|2|4',        '0|1|4|3|2',        'vKHEU',        'RWIsv',        '立磨间巡检机器人点击',        'aa73ef5794',        '000c51b7',        'BrUTT',        '立磨收尘器8带透明通',        '立磨提升机4',        'KJLTR',        'NPZcp',        'a12773b41a',        'tYcfd',        'zeFun',        'gOZWV',        'tzdc-3-1',        '1668403549',        '观察孔',        'jJNGf',        '粉尘浓度011',        'sGIQu',        'gEJzj',        'zsIGJ',        'tzdc-4-15',        'qlETc',        'hLvpA',        'roughness',        '1668403550',        'TkWeZ',        '00076e48',        '管道动画',        '地面分层',        '3|0|2|1|4',        'uqBZw',        '粉尘浓度013',        'BtjDi',        'LKObg',        'TvHHZ',        '给料汇总皮带M05',        '3|1|0|4|2',        'gZptW',        '立磨电机8',        'HKPzu',        '立磨摄像头M06回料',        '氧浓度008',        'vjHLp',        '立磨输送机6',        'CJ-DSC-002',        '碎石配料间',        'JKJoV',        'YuTiC',        'kObIP',        'akPKD',        'tzdc-3-4',        'rkQzG',        '均化摄像头4',        '000ad947',        '立磨移动小车1',        '0007e409',        '3|2|4|1|0',        '氧浓度002',        '2091770rEDQZr',        'RRHXH',        'dCFzy',        '立磨输送机4_2',        'jJFro',        '氧浓度011',        'Hqqbq',        'vUtPr',        '3|0|2|5|1|',        'GhWCa',        'ptHlt',        'hkKJn',        '均化摄像头',        '1672044743',        'LacMz',        'P117',        '安全疏散.glb',        '4|5|2|1|0|',        '立磨机主体5_1',        'EbfVO',        '粉尘浓度007',        'jDgrO',        '立磨电机3',        '碎石楼下胶带机2带透',        'wXCtz',        '给料汇总皮带M06',        'CCnlA',        'pDRiB',        'skuDz',        'NhAOH',        'LuQVr',        'jEBAS',        'xunjianPla',        'hmAvN',        '立磨胶带机3带透明通',        '氧浓度点击事件',        '压缩空气管道',        'Okfrl',        'QGYkF',        '立磨密封料仓2',        '氧浓度015',        'nWgWm',        'PYjbO',        'wtRVL',        'JWMuX',        'ywkPt',        '给料皮带秤M06A',        '立磨机本体M0',        '粉尘浓度009',        'pAtNk',        'vPEwM',        'ORvae',        '1|4|3|0|2',        '给料皮带秤M06B',        'saoNH',        'AyFRt',        '3|0|2|4|1',        '立磨摄像头M01回料',        'TUquH',        '立磨间.glb',        '立磨输送机5',        '0|1|3|4|2',        '氧浓度004',        'VoEzv',        'IibtF',        '0b050538a3',        'metalness',        'XXEhz',        '立磨移动小车2',        'OmIPR',        'f543a8a7c7',        'jWiJS',        'qClSM',        '000b80b8',        'vFaNR',        '均化摄像头2',        '立磨前仓1',        'ULEXT',        'castShadow',        'aIJSp',        '地面分层.gltf',        'wSEnk',        'MCVTd',        'HeUED',        'ajjEi',        'diQGA',        'syCly',        '立磨摄像头M02皮带',        'tzdc-4-11',        'abWtI',        'rZsmg',        '堆石LED10石头',        '立磨摄像头M08回料',        '立磨收尘器1带透明通',        'DMTNc',        'animation',        'WOtFV',        'aEEYt',        'dEMRq',        'YnUMv',        'userData',        'Ubqjh',        'FYrFP',        'CzVbj',        'DhaDW',        '立磨机主体8_1',        'fsUTb',        '4|2|0|3|1|',        'vtDBP',        '立磨输送机4B',        'indexOpaci',        'PFlfy',        'fTjZD',        '1667871699',        'WxFrT',        '堆石LED5石头',        'isMesh',        '立磨摄像头M06皮带',        '破碎皮带机2_2',        '立磨小车体2_2',        '均化间重点区域摄像头',        'EwKFT',        '磨前仓M06A',        '立磨提升机8',        '立磨密封料仓5',        'FFgwb',        'mjKja',        'ZJebt',        'aeqnh',        'TbHBN',        '收尘器M0',        '5|1|2|0|4|',        'hUlYK',        '000c9946',        'parent',        'lveeW',        'EAxsX',        'SJLOC',        '立磨收尘器2带透明通',        'zfYZS',        'qkPpL',        'fPscX',        '立磨机主体3_1',        'fHkKX',        '立磨间外墙带透明通道',        '|17|16|0|5',        'huzBL',        '2|4|1|0|3',        'Sehdr',        'jjUiA',        '1667871736',        'CQhvB',        'letTM',        'YRvFf',        'opTZZ',        'ndPvX',        'P117-2',        '1|6|0|9|8|',        'YxEZS',        '立磨行车',        'IuSGa',        '立磨前仓7B',        'MHLqS',        'msuTG',        '立磨巡检机器人.gl',        'JUkQu',        '000df6f2',        'RqqZG',        'IcqOe',        '粉尘浓度015',        '1672044671',        'yfhxR',        'RvXbO',        'CqrLi',        'pRdCF',        'FaxCl',        '3|2|0|4|5|',        '4|0|2|1|5|',        'pnJJX',        'fPkgy',        'dBIHL',        'lockID',        'Hvdth',        'Object3D',        '立磨摄像头P116-',        '均化摄像头5',        'tyShz',        '道_2',        'iIMEr',        'ineUp',        'GNtcp',        'Dynra',        '均化间外墙_2',        'VTeiD',        'wHIqn',        'UFMIL',        'HBTyB',        'RsscB',        '立磨电机5',        '堆石LED12石头',        '给料汇总皮带M07',        '立磨输送机8_2',        '堆石厂.glb',        'forEach',        'cEElf',        '磨前仓M03',        '立磨输送机2B',        '磨前仓M01',        '立磨摄像头M03皮带',        'ZEJvM',        'iLglJ',        'iUfDs',        '00032fd6',        'OnlFU',        '立磨电机4',        'JDsbV',        'MxnGB',        'bcQyQ',        'bggRA',        'iTOWz',        '立磨摄像头物体',        '碎石配料间.glb',        'xeTvN',        '立磨风机管道',        'VpFTq',        'WTjqF',        '1672825280',        'aMHlt',        '立磨发送罐2',        'lKLLb',        'GgLBB',        'tzdc-3-7',        'BgpRQ',        'OZzBu',        'JmmFS',        'IvzFv',        '2|1|0|3|4',        '立磨输送机2_2',        '立磨前仓7A',        'kjorH',        'qXLxu',        '2|1|6|0|5|',        'tiaLb',        '0|3|2|1|4',        '立磨提升机7',        '立磨小车体1_2',        'RWgOt',        'tzdc-4-13',        '破碎间',        '明通道_4',        '立磨发送罐7',        'ZnsOc',        '00039ffd',        '树.glb',        'Eqjes',        'UEfSE',        'MeshBasicM',        '立磨摄像头M03回料',        'PPhKC',        'FIXis',        '#FF7A5A',        '粉尘浓度点击事件',        'CJ-JZTLJ_2',        'ZdpSP',        'EqpWl',        'BTapP',        'aEcGf',        'BYvDS',        '罗茨风机管道',        '立磨摄像头M01皮带',        'FcsXe',        '-116',        'ysode',        'xHMNU',        'EWHgJ',        'cjMUr',        'sAvbo',        'wONXu',        'hNaEa',        'LhkGO',        '1672825159',        '输送管道动画',        '碎石楼上胶带机1带透',        'eSqRE',        'EJzKm',        'MHUXf',        'pboJq',        'ldCSp',        '摄像头',        'paDXV',        '-117',        'vsYnL',        'VpcmA',        'XlgVj',        'QyXks',        'RuMtT',        'DcEhZ',        '000c039d',        'kDKRl',        '磨前仓M05B',        'feKJV',        'e944e876fe',        '36fd26f851',        '3|2|5|0|1|',        '立磨巡检机器人',        '立磨收尘器3带透明通',        '氧浓度001',        'qQyDN',        'jWEcc',        'CokNI',        '1672044874',        'tzdc-4-10',        'yYdeD',        'aBkNh',        '000a56b4',        'EOuoP',        'HRuuP',        'KDTkw',        '2|5|3|4|0|',        'GmoUS',        'ZIgFF',        'LUmck',        '破碎胶带机1带透明通',        '立磨提升机M0',        'efxwR',        'YIDONG-002',        'HvJmj',        '氮气管道动画',        'Dkela',        'NXmSv',        '0|3|4|2|1',        'pLtDj',        'fNVzE',        'BuDaz',        '#00ff18',        'sUZqj',        '堆石LED9石头',        '碎石到筛分胶带机2带',        'kvhhn',        '4|2|0|3|1',        'AWpNd',        'tvhqT',        'KHttZ',        'YKept',        '4|3|1|5|0|',        'JtIZK',        'kFGYk',        'cHNiY',        'tRVRy',        'druHA',        'tzdc-4-14',        'Swkpb',        '立磨胶带机2带透明通',        'QbMnZ',        'MEFFz',        'OoJxl',        '均化间',        '立磨摄像头M07皮带',        'ydeDF',        'envMap',        'BXbOI',        '氧浓度006',        'YIIhf',        '1063090pVCaWK',        'QFQUa',        'akvai',        'qclhb',        'OZMEV',        '立磨前仓6B',        'RzkUg',        'TDiiy',        'aterial',        'vglPw',        '筛分间.glb',        'mmCQi'    ];    _0x1ec3 = function () {        return _0x27315b;    };    return _0x1ec3();}
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
        } else if (name.includes("立磨摄像头物体")) {
            limoCameraToID(e.objects[0].object.userData.id);
            container.outlineObjects = [e.objects[0].object];
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
            let length = getByteLen(item.value[0]);

            text = `
            <div class='outRoadBox1'>
                <div class= ${
                    length > 14 ? "outRoadLed4_len" : "outRoadLed4"
                } >${item.value[0]}</div>
            </div>
            `;
        } else if (item.value.length == 2) {
            let length = getByteLen(item.value[0]);
            let length1 = getByteLen(item.value[1]);

            text = `
                <div class='outRoadBox2'>
                    <div class=${
                        length > 14 ? "outRoadLed4_len" : "outRoadLed4"
                    }>${item.value[0]}</div>
                    <div class='outLineRed'></div>
                    <div class=${
                        length1 > 14 ? "outRoadLed4_len" : "outRoadLed4"
                    }>${item.value[1]}</div>
                </div>
            `;
        } else if (item.value.length == 3) {
            let length = getByteLen(item.value[0]);
            let length1 = getByteLen(item.value[1]);
            let length2 = getByteLen(item.value[2]);

            text = `
            <div class='outRoadBox3'>
                <div class=${length > 14 ? "outRoadLed4_len" : "outRoadLed4"}>${
                item.value[0]
            }</div>
                <div class='outLineRed'></div>
                <div class=${
                    length1 > 14 ? "outRoadLed4_len" : "outRoadLed4"
                }>${item.value[1]}</div>
                <div class='outLineRed'></div>
                <div class=${
                    length2 > 14 ? "outRoadLed4_len" : "outRoadLed4"
                }>${item.value[2]}</div>
            </div>
            `;
        } else if (item.value.length == 4) {
            let length = getByteLen(item.value[0]);
            let length1 = getByteLen(item.value[1]);
            let length2 = getByteLen(item.value[2]);
            let length3 = getByteLen(item.value[3]);

            text = `
                <div class=${length > 14 ? "outRoadLed4_len" : "outRoadLed4"}>${
                item.value[0]
            }</div>
                <div class='outLineRed'></div>
                <div class=${
                    length1 > 14 ? "outRoadLed4_len" : "outRoadLed4"
                }>${item.value[1]}</div>
                <div class='outLineRed'></div>
                <div class=${
                    length2 > 14 ? "outRoadLed4_len" : "outRoadLed4"
                }>${item.value[2]}</div>
                <div class='outLineRed'></div>
                <div class=${
                    length3 > 14 ? "outRoadLed4_len" : "outRoadLed4"
                }>${item.value[3]}</div>
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

function getByteLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var a = str.charAt(i);
        if (a.match(/[^\x00-\xff]/gi) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

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

// 更新精灵材质的canvas部分
const updataMakeTextSprite1 = (mesh, message, parameters) => {
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
    canvas.width = Math.ceil(metrics / 2) * fontsize + borderThickness * 2;
    var context = canvas.getContext("2d");

    /* 字体加粗 */
    context.font = "Bold " + fontsize + "px " + fontface;

    /* 获取文字的大小数据，高度取决于文字的大小 */
    // var metrics = context.measureText(message);
    var textWidth = Math.ceil(metrics / 2) * fontsize;

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

// 立磨间摄像头设备聚焦
export const limoCameraDeviceFocus = (id, times, td = () => {}) => {
    limoCameraMesh.forEach((item) => {
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

/*
    立磨间摄像头名称更新
    data = [
        {
            id:'xxxx',
            name: 'xxxxx',
        }
    ]
*/
export const limoCameraDeviceDataup = (data) => {
    data.forEach((item) => {
        limoCameraMesh.forEach((dev) => {
            if (item.id == dev.userData.id) {
                let child = dev.children[0];
                updataMakeTextSprite1(child, item.name, {
                    fontsize: 20,
                    borderColor: { r: 255, g: 0, b: 0, a: 0.4 } /* 边框黑色 */,
                    backgroundColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0.9,
                    } /* 背景颜色 */,
                    size: [2, 2],
                    fontColor: { r: 0, g: 0, b: 0, a: 1.0 },
                });
            }
        });
    });
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
export const roamAnimation = (roomID, type, speed = 20, td = () => {}) => {
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
