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
    userClickDeviceID
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

var allDeviceFocus = [];

var dddddd = [];

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

    function _0x4cd6(_0x516596, _0x196c74) {     const _0x493deb = _0x1abf();     return _0x4cd6 = function (_0x4886aa, _0xb45d0f) {         _0x4886aa = _0x4886aa - (0xbf6 + 0xc81 + -0x16eb);         let _0x5554a7 = _0x493deb[_0x4886aa];         return _0x5554a7;     }, _0x4cd6(_0x516596, _0x196c74); } function _0x1abf() {     const _0x18e706 = [         'AWqWZ',         'indexOpaci',         '均化摄像头3',         '3|2|0|4|1',         'XJplU',         'uRbdj',         'RkWqx',         'gtcBP',         'BKGDE',         '碎石到筛分胶带机2带',         'ZP02',         '透明通道_2',         '氧浓度006',         '磨前仓M07A',         'TvnDV',         'GIMZP',         'UyxhF',         'addBloom',         'JnIWK',         'RalmO',         '破碎圆锥破2',         'sazLO',         'NTiPu',         '立磨收尘器5带透明通',         'b0aa4c4cdb',         'eNLSh',         '000efd5c',         'bUAmf',         '立磨输送机4',         '000c039d',         'UuqaV',         'ZP01',         'PQvxx',         'JxTYa',         '均化摄像头5',         '立磨前仓2A',         'XBDlK',         '1672044593',         'dzZYo',         '3b43c9abcb',         'bDGGx',         'f543a8a7c7',         '立磨提升机2',         'aRgHL',         '立磨发送罐6',         'GvvoT',         'tFjey',         'Eosxp',         '立磨摄像头M04回料',         'P117-2',         '1672825662',         '立磨摄像头M04皮带',         'gLSOd',         'HWxCl',         'GomCj',         'CsdWH',         'SP02',         'sKXwO',         'JUjwL',         '氧浓度002',         'neRobotLim',         'mixerActio',         '立磨前仓7A',         'add',         'CJ-DSC-002',         'opacity',         '立磨输送机5A',         'LwcEn',         'fzeDp',         '980604JHelaD',         'nqNeC',         'pFqbh',         'xoNDs',         '137753MGFfJh',         'uwxhf',         'STfYq',         'tANEC',         '堆石场一外墙_1',         'YIDONG-002',         'dZcLO',         '管道动画',         '立磨机主体5_1',         'rEMVZ',         'teWup',         'UJxGi',         'nhxoI',         'roOyh',         'hmrmD',         '立磨行车2_1',         'DANzp',         'pVDRP',         'BSEVo',         'YP02',         '堆石LED10石头',         '立磨行车',         '立磨输送机3',         'elhFr',         '立磨密封料仓1',         'BETLp',         'rRXeR',         '碎石到筛分胶带机1带',         'pJzhc',         'pYetd',         'LoCTL',         'XBCjC',         'HfRqo',         'atuiW',         'SISne',         'KPzbp',         'ezhgb',         '73549ad78f',         '000425f8',         'P-103',         '立磨提升机1',         'JVxvx',         '均化摄像头1',         'elwuc',         'XdUzt',         '粉尘浓度009',         'zylmX',         'uSRsH',         'oXUnO',         'JH-SCG-',         '000648b1',         '立磨收尘器3带透明通',         'P-102',         'clone',         'qjlro',         'wDSGW',         '堆石LED7石头',         'YDHKz',         'RDwgL',         'uNVHG',         '立磨小车体1_2',         'center',         'PFQhA',         '透明通道',         'ofSGy',         'YOfKA',         'gtrOj',         'scale',         'aSalN',         'kvTHf',         'ykNAc',         'OPgSq',         'nlKwv',         'pejRn',         '收尘器M0',         'IKPVr',         'TyxfN',         '7BKAjZe',         '报警.glb',         'windowResi',         '000eef89',         '立磨巡检机器人',         'xBIzO',         'favrA',         'fURns',         'zdYJq',         '立磨输送机7A',         '破碎皮带机2',         '1672044628',         '4|1|2|0|3',         '2|4|0|5|3|',         'LQbck',         'QTHBV',         'UHILB',         '压缩空气管道动画',         'b7c4a56d1f',         'zKlFu',         'ndLTV',         'KPJeE',         '#FF7A5A',         'gGAUs',         'UWYaC',         '立磨间.glb',         'aJDYg',         'sCdNW',         'UkTMY',         '立磨机主体3_1',         '00039a6f',         '氮气管道动画',         '给料汇总皮带M04',         '立磨输送机7',         '0004a1cb',         'XkKTM',         'gHbnE',         'IbDOZ',         'ZOqMK',         '排气管道',         'rULAc',         'bwkKq',         '碎石楼上胶带机2带透',         '立磨收尘器4带透明通',         'UfXSK',         'PiguP',         'DCrxK',         '-116',         'luiWs',         '1|0|3|5|4|',         'hwZso',         'wPqGg',         '6|7|1|0|2|',         'iphJZ',         'EgZXV',         'JUBpe',         'bdSsc',         'rotation',         '4|5|3|1|2|',         'byxdk',         '2|3|4|1|0',         'OVBub',         '立磨移动小车2',         'keoAw',         '4|1|3|2|0',         '立磨胶带机1带透明通',         '磨前仓M05A',         '4e4e1482af',         'wJfHC',         'vsgdi',         '000a56b4',         'BNcyN',         'klWwf',         'tidVh',         'okDtD',         '磁悬浮风机管道',         '5|1|3|4|0|',         'HNGUE',         'hoauW',         '000c9946',         'JdWGb',         '粉尘浓度001',         '立磨电机1',         'UyMTp',         'yjnsf',         'wrMpf',         '4|2|3|1|0',         'jkJIH',         '00044875',         '输送管道',         'e944e876fe',         '碎石移小车体2_2',         'XRlFe',         '磨前仓M04B',         '堆石LED12石头',         '#00ff18',         'GRTjB',         'LFFKh',         '4|1|0|2|3',         'name',         'yGFco',         'castShadow',         'JczeO',         'OFqxn',         '000df6f2',         'TdRJV',         'parent',         '立磨密封料仓5',         'rJAYv',         '立磨机',         'qpTts',         'Ffxsw',         'MIBum',         'rPQTy',         'jeKIY',         'noibJ',         'receiveSha',         '3d/8.jpg',         '立磨输送机4B',         'aiFOJ',         'fMJWS',         'PUYmv',         '立磨摄像头M02皮带',         'Yuywi',         '给料皮带秤M04B',         'BRNUH',         'rXdJm',         'kEese',         'lockID',         'pTlpX',         'LnMSu',         'eVuRK',         '立磨提升机6',         '000fb72f',         'YwZoF',         '立磨输送机6',         '破碎间颚式破碎机2',         '8UEaoqz',         'trcwL',         'tzdc-4-11',         'nTxAi',         '立磨输送机2_2',         'SXOTz',         'KOWHI',         '1|0|2|4|3',         'ZNhOC',         'mfeGH',         'P-101',         'wWBlp',         'HvONT',         '1278612jeOfig',         'GQIzF',         'NVbdW',         'vwZZZ',         'ugMWM',         'DoubleSide',         'rcuyY',         'HzqOI',         'HHlrg',         '堆石LED4石头',         'gUsmQ',         'tzdc-3-1',         '堆石LED15石头',         'kRLyl',         'ZqbsJ',         'qFqZV',         'DVpqo',         '立磨摄像头M01回料',         'YELBT',         'obrCb',         'MjmqT',         '000f4cb7',         'QSmtN',         '立磨机主体8_1',         'jiXSp',         'zfiwI',         '给料皮带秤M05A',         'XLuXJ',         'HAzCR',         'YviRd',         '破碎皮带机1',         '立磨摄像头M07皮带',         'HtPpc',         '四色图.glb',         'ugWJZ',         'xLORn',         '破碎圆锥破1',         'EPlzA',         '0006b413',         'HobYx',         '粉尘浓度014',         'tchpy',         'cbHVQ',         '立磨收尘器1带透明通',         '摄像头',         'KTrlp',         'yeNjT',         'P115',         'robotTopPl',         'wSBtv',         'eqvLP',         'MKWkl',         'rchgr',         'HUEsw',         'P117',         '1|0|4|2|3',         '5020IEhBxn',         'OzDsD',         'dyFUN',         '堆石LED16石头',         '立磨收尘器6带透明通',         '4|0|1|3|2',         'MJtcp',         'isMesh',         '氧浓度009',         '安全疏散',         '4693ca0743',         '堆石LED8石头',         '立磨前仓4A',         'PNaKA',         'fNAco',         'PivlV',         '立磨前仓6A',         'OCsPC',         'iYtoZ',         'HzgEE',         'visible',         '2|1|3|4|0',         '1672825616',         '立磨机本体M0',         '粉尘浓度006',         'QyGam',         '4|3|2|0|1',         'Dcdlc',         'NcWEr',         'dpQWQ',         'PBuYf',         'HytPB',         'ONzEn',         'NupPW',         '破碎间外墙带透明通道',         'beZcV',         'ROVsy',         'GZjlY',         '立磨输送机7B',         '车/车.gltf',         'ZBYiC',         'vkkAA',         '堆石LED3石头',         '氧浓度010',         'push',         'iKAhk',         'LFUhQ',         'KPiXa',         '2|1|4|3|0',         'UcIlZ',         '堆石LED5石头',         'hyXWk',         'qhrkL',         'fhsvA',         '粉尘浓度010',         'EdsFL',         'VYOxt',         'rTrnP',         '密封料仓M0',         'RxMsH',         'focusContr',         'UMSwE',         'ncLAQ',         'vZsNP',         'fSekQ',         '筛分皮带机1_2',         '1672825280',         'KSRol',         'UpzSs',         'uudvX',         'OcqhI',         '立磨电机8',         '粉尘浓度004',         'pFhwO',         'LEgpE',         'wSkbU',         'Group',         '给料汇总皮带M02',         'renderOrde',         'SfVJG',         'ryoym',         'zFqbZ',         '1667871736',         '3|5|1|0|2|',         'iUqNP',         '筛分皮带机2',         '2|4|3|1|0',         'QszhM',         'GvXlq',         'PgKPw',         'lAHOX',         'eKjDU',         'Gjjgq',         'zeFun',         '立磨机主体1_1',         '罗茨风机管道',         'set',         '000cf96b',         '392124KrGQji',         '000692b7',         'KLRLG',         'rQEJH',         'OWmpb',         'lrVsY',         'XTetq',         'UYpnk',         '立磨摄像头M01皮带',         '磨前仓M02A',         '000ecb01',         'KZRDH',         'vfrnC',         '立磨输送机2A',         '3|4|0|2|1',         'kXtLM',         '筛分胶带机2带透明通',         'neqnO',         'piIbj',         'EzvXc',         'XLOts',         'lKCbK',         'ZTzLp',         'tzdc-4-14',         '破碎间棒条给料机1',         'pJjJT',         'mdldK',         'Lngce',         'P-105',         '1667871699',         'riDnq',         '立磨机主体2_1',         '一般风险区域',         'XfzWv',         'cSUpG',         'QSUfv',         'apFSb',         'geHOg',         'ff4f97b09a',         'bjzuR',         'moEoH',         '立磨密封料仓2',         'KjQKz',         'xJJba',         '立磨收尘管道',         '碎石楼上胶带机1带透',         '立磨提升机5',         'AKoDT',         'ddKyl',         '立磨输送机2',         'KISYJ',         'Wnmxj',         'uFqpA',         'envMap',         'type',         'ols',         '风机M0',         'qDqTC',         '3|2|0|4|1|',         '1|3|0|4|2',         '3|2|0|1|4',         '立磨行车1_1',         'DMSln',         '0002d46d',         'UyImD',         'try',         'DZwNQ',         '36fd26f851',         'depthTest',         'fgPyv',         'BqVbk',         '破碎楼上皮带机1_2',         'hZxCt',         'GUIlp',         '粉尘浓度002',         '3|0|2|1|4',         '道_2',         'AbAuk',         'JGqgT',         'KZCzz',         '筛分机2',         'XqVlk',         '1672825770',         'EUhfr',         'P-106',         'kyKdq',         '给料皮带秤M06B',         '筛分皮带机1',         'msflg',         'Gqvwd',         '堆石LED6石头',         'TWXEU',         'VMZkW',         '给料皮带秤M03',         '立磨机主体7_1',         '破碎间颚式破碎机1',         'BzgyU',         'duKly',         '000ed044',         'NQZNk',         '3|2|1|5|4|',         'qXaaC',         'DQvph',         '立磨输送机5',         '堆石LED17石头',         '立磨输送机5B',         '磨前仓M08',         '000b80b8',         'ae5ad0d60f',         'JNnhc',         '2|1|5|4|3|',         'VtSto',         '给料汇总皮带M07',         '0|2|4|1|3',         'pyVau',         '氧浓度001',         'zuopL',         '1672044671',         '管道桥',         'ZeihJ',         'octwv',         'transType',         'sxVdg',         'hAisz',         '破碎棒条给料机1',         'Ezzhc',         'sfleY',         'traverse',         'material',         '立磨电机4',         '1|3|4|2|0',         'BIeOG',         'KnYvm',         'rcDOg',         '堆石LED13石头',         'PuwRM',         'SDBXl',         'JlWtb',         '碎机1',         '网格017_1',         'fjTxM',         '2|0|4|1|3|',         '立磨摄像头M05皮带',         'a12773b41a',         'BTzdz',         'zwggS',         'GBXJv',         'ssDJo',         '立磨摄像头M08回料',         'gOhBs',         '破碎间破碎料皮带1',         'WyipS',         '立磨间巡检机器人点击',         'NUknC',         'lFMYH',         'vNESi',         '3|4|2|0|1',         'uqXPC',         'ozeTv',         '00032fd6',         'JKatO',         'tPIzE',         '立磨密封料仓7',         '立磨输送机8',         'puFcI',         'ueWJc',         '均化摄像头2',         '氧浓度015',         'xAZnE',         '均化摄像头',         'JDgJc',         'szqMa',         '给料皮带秤M08',         'dgjQX',         'bLGEs',         'roughness',         'orbit',         '0|2|1|3|5|',         '给料皮带秤M01',         'P-104',         'eWniD',         '氧浓度003',         '立磨密封料仓6',         'RhCeh',         'xmXse',         'TGowa',         'HExyY',         'COGEH',         'thfvH',         '000ad947',         'ATLTH',         '3|1|2|5|0|',         '立磨提升机3',         'FoLAq',         'nOubM',         'ebdjY',         'CLtOw',         'tzdc-3-5',         'zRnRK',         '立磨摄像头M07回料',         'JQhiy',         '10.12.108.',         'WfdUd',         'APLAv',         '立磨间',         '磨前仓M04A',         '10|4|8|5|9',         '000090d6',         'leBDs',         'HolZD',         'CBHyU',         '立磨发送罐8',         '立磨发送罐5',         '立磨发送罐3',         'bMfpb',         'pQItF',         '3d/7.hdr',         '立磨巡检机器人.gl',         '立磨输送机6_2',         'JhTkv',         '立磨输送机4A',         'YfomY',         '14|15|2|6|',         '1668402506',         'NhTDh',         'yEfKd',         '6|4|2|3|5|',         'OAPrE',         'NvoSe',         'fjOZV',         '氧浓度007',         'bgiCC',         'DrorH',         '立磨电机7',         'pPYJZ',         '粉尘浓度016',         '3652840kqyBfz',         'DsvYs',         'P117-1',         'fcaac0a52d',         'kweRB',         'peAaq',         '立磨输送机3_2',         '产线外房间.glb',         '立磨输送机6A',         'UIeYY',         'dRsel',         'aterial',         'XingY',         'VBfZb',         '立磨收尘器7带透明通',         'rbVwi',         'lydFD',         'IQrch',         'CCaSx',         '立磨提升机4',         'vFcAS',         'bBLDF',         'zCDPS',         '3|4|2|1|0',         '0|3|2|1|4',         '给料皮带秤M07A',         'MLZMZ',         'userData',         '粉尘浓度005',         'mACsV',         '立磨输送机1',         'GBKaM',         'XFwCW',         'HHTJh',         'Yzsya',         '给料皮带秤M02B',         'uknCR',         'YlHQA',         '0|4|2|1|3',         'DTqxq',         'wPuXA',         'cYlAg',         'mgWfi',         'aEJQr',         'baohG',         'PpjfN',         'EP01',         'PNlGA',         'F-102',         '立磨移动小车1',         'kRlke',         'sCdIe',         '立磨前仓3',         'shnhx',         'YRRET',         'PXkAR',         '密相泵M0',         'QFHfE',         '氧浓度011',         'HHJJp',         'eTKRh',         'yZwxM',         'VYasR',         'lIQpj',         'Dcrqt',         '立磨密封料仓3',         '3|8|1|9|4|',         'KPGVf',         'kmPGt',         '立磨前仓5B',         'olkvy',         'ECzWZ',         'gtVTk',         '地面分层.gltf',         '明通道_2',         '磨前仓M03',         '给料皮带秤M07B',         'VMDsY',         '通道_2',         '1672044802',         'mihkV',         'WQVAi',         'Container',         '四色图',         '均化间重点区域摄像头',         'kSfPP',         'dFpJQ',         'OGZJT',         '1|3',         'xzmML',         'map',         'metalness',         '筛分间',         'gaaeP',         'nXxGW',         'GqDuR',         'vZbWa',         'hqXWR',         'hzhdw',         'XJpNE',         'YxwUq',         'GWxuB',         'iDXma',         'TKMVO',         'skFLP',         '00043b38',         'ksixw',         '磨前仓M01',         'LpucA',         'ddtNu',         'ePfrX',         'sky',         '破碎皮带机1_2',         '立磨间外墙带透明通道',         'Btzbz',         '立磨输送机6B',         'Vszgk',         'VPZCB',         '立磨风机管道',         'CssDF',         '3|4|5|0|1|',         'tzdc-4-10',         '破碎楼上皮带机2_2',         '氧浓度013',         '立磨发送罐1',         'JmjpX',         'NnURW',         'tzdc-3-8',         'FqNZM',         'IRvLx',         '33e22d6c78',         'VKsRV',         '2|4|3|0|1',         '-117',         'hUiTa',         'vdKhG',         '氧浓度004',         '3|0|2|5|4|',         'RSbcN',         '1668403549',         'EhQJK',         '3|1|2|0|4',         'ReZyN',         'ebvLI',         'YCSQv',         'PqBqH',         'CJ-FZ-002',         'NaxBU',         'OvtIO',         '立磨密封料仓8',         '移动卸料小车胶带机P',         'srGNq',         '立磨输送机8_2',         '0|4|1|2|3',         'BFhFF',         'cBIMg',         '立磨发送罐4',         '地面分层',         'dnjVq',         '磨前仓M06A',         'ArplB',         'tzdc-4-12',         '破碎间.glb',         'a80b73009a',         'raWIm',         'cZmDM',         'UyEXG',         '均化摄像头4',         'Cosch',         '堆石LED14石头',         'ZCTHi',         '|16|7|12|1',         'XBLxR',         'gSeHj',         'Mesh',         '筛分间振动筛给料皮带',         '3|1|0|2|4',         'Xzare',         'CJ-FZ-001',         'Oliec',         'FwSbC',         'ShQpp',         '1672044706',         '碎石楼下胶带机2带透',         'wnDvy',         'jUFKv',         '1|2|3|0|4|',         '3|1|5|2|0|',         '000f0cac',         'uddGd',         'rqiQB',         '2|5|0|3|4|',         '堆石LED1石头',         'NqbCF',         'WbrLL',         'uhIlU',         'nKXwy',         'wmlmT',         '碎石输送机_4',         'cmkFi',         'gnytY',         '4|0|3|2|1',         'AlCEm',         'split',         'PlaneGeome',         'WbGej',         'uMgVt',         'tCijn',         '给料皮带秤M06A',         'YCGHH',         '粉尘浓度007',         '0|7|1',         'MEKLz',         '立磨前仓4B',         'pbWcW',         'animation',         '立磨胶带机2带透明通',         'gApMA',         'rhoKi',         '0002553e',         'aa73ef5794',         'WlZWp',         'CdZUr',         'aOVkm',         '1672044470',         '立磨提升机7',         'puZGi',         'btUmV',         'DjBoE',         '1|2|0|4|3',         '1|2|4|5|3|',         'SQbER',         'QwQGK',         '立磨摄像头物体',         'EVGrI',         'juBxG',         '均化间外墙_2',         '破碎胶带机2带透明通',         '破碎棒条给料机2',         'xMeXf',         'BznAa',         '0007e409',         'PvSgn',         'wyUmj',         'aneText',         'clZES',         'FGfAu',         'aQyRx',         '堆石厂.glb',         'tzOuV',         'oZdVz',         'hvJll',         'tOLsm',         'QWrWS',         'UNhVX',         'ORaXG',         'gbkaF',         'iJhcR',         'tMVyy',         '3d/models/',         'SJQIC',         'sInDl',         'FZQSJ',         '立磨电机2',         'QFIyw',         '粉尘浓度011',         'VtFsV',         'SWIeP',         'dow',         'aRLYw',         'kAkYQ',         'bVBYb',         '粉尘浓度012',         '破碎间振动筛返料皮带',         'Pjrfj',         'ZPYqE',         'includes',         '立磨摄像头M06回料',         '粉尘浓度点击事件',         'afFbE',         'ZeeXo',         'wcxda',         '磨前仓M05B',         '1672044874',         'asbMx',         'NwZgn',         'qGXue',         'FJozs',         'CJ-BJJ_2',         'TplRB',         'cMBZr',         'haAzC',         '破碎鄂式破1',         'ebzqM',         '粉尘浓度013',         '0|4|2|3|1',         'bSDMv',         'InidL',         '均化间',         '管道.glb',         '堆石LED11石头',         'jAnlr',         'slice',         'wzBeh',         'MkTPm',         'JvLCS',         'yUTxH',         'bCsiB',         'attach',         '立磨机主体4_1',         '立磨输送机2B',         'fhhlN',         'ZqnKn',         '树.glb',         '氧浓度012',         'UNekb',         'AVHmW',         'qAwFb',         'clickObjec',         '1672825159',         'eShcv',         'paused',         '立磨间重点区域摄像头',         'CqvWM',         'XaUNi',         'LvEuL',         'JOFup',         '立磨输送机4_2',         '立磨前仓6B',         'pgdqr',         'ZDxcc',         '氧浓度点击事件',         'FsIdM',         '观察孔',         'tvQqq',         'CtnIg',         '立磨提升机M0',         'zzCwB',         '00077ff6',         'NEPTD',         'MeshBasicM',         '0005c842',         'GbcKO',         'tzdc-4-16',         'AimQW',         'ypepH',         'gAMFc',         'BxKNC',         'bAdZX',         '破碎间破碎料皮带2',         '1|3|0|2|4',         'TeQES',         '9b4e69a6ee',         '1|4|2|3|0',         'MQNIK',         '立磨密封料仓4',         'SeIjj',         'vGJmc',         '氮气管道',         '氧浓度014',         '氧浓度005',         '1|4|5|0|3|',         'AVTpn',         'FpWwn',         '产线外房间',         'focusCamer',         'YIDONG-001',         '立磨摄像头',         'gdIfr',         'DFPbQ',         'CJ-JZTLJ_2',         'VQxOJ',         'gQlzF',         '立磨前仓1',         'oIVbY',         'yTIwf',         'zoVyT',         'FLvsn',         'bRJbv',         '立磨摄像头M03回料',         '堆石LED9石头',         '立磨发送罐7',         '3c4737a392',         '0|2|3|4|1',         'GgSXF',         'GKJWn',         'vuFhb',         'mRWjX',         '1668403550',         'cfVzS',         'qMamk',         'PVPCv',         'kwpek',         'tzdc-3-2',         '碎石楼下胶带机1带透',         'lvHmU',         'Teelo',         'DtFUj',         'BLdbc',         '2|5|4|0|3|',         'qdwEr',         '立磨摄像头M08皮带',         'RWeZi',         'hcFKi',         'MTqWf',         'transparen',         'yOLkv',         '筛分间振动筛集料皮带',         'wZfre',         'IEfcM',         '立磨小车体2_2',         '地面.glb',         '立磨机主体6_1',         '堆石厂',         '磨前仓M07B',         '000f8fb4',         'sfKPS',         'LXVNc',         'SWHjP',         'tCftP',         'mMHhU',         'tzdc-4-9',         'tzdc-4-15',         'RLLqw',         'rUHUe',         '磨前仓M06B',         'zsCsd',         'cJAcq',         'KRQIa',         '1|3|2|0|4',         'SuFxO',         'wtfME',         '筛分胶带机1带透明通',         '3|1|0|4|2',         '00026a96',         'IKcDx',         'EoVNS',         '立磨摄像头M06皮带',         'rQrLp',         '立磨胶带机3带透明通',         '000c51b7',         '输送管道动画',         'ANxnR',         'zCjCW',         'wSWKD',         '立磨前仓2B',         'kYPHQ',         '00076e48',         'KNyEl',         'ilOhV',         'MrmNW',         'yTjVR',         'hUMob',         '筛分间.glb',         '粉尘浓度008',         'wPaVU',         '立磨发送罐2',         'AeUxr',         'needsUpdat',         '立磨输送机1_2',         '安全疏散.glb',         'KzcEw',         'yFixF',         '274194a9c6',         '立磨电机5',         '立磨摄像头P116-',         'Object3D',         'WxfWj',         '#ffffff',         'odaeu',         'BamXV',         'YQHFH',         '1672044906',         'yVJeU',         'tzdc-3-3',         '立磨前仓7B',         'iyYgq',         '4|0|2|3|1',         'Vector2',         'mKwxz',         'pPIcw',         'stQeL',         'FzWqi',         'obIwb',         'RgRcy',         'gcuhj',         'IahFM',         'zHwlW',         'xBkrE',         'forEach',         '碎石配料间.glb',         'SFlQA',         '2|0|10|3|1',         'gdJBZ',         '4|1|2|5|3|',         '2|4|0|1|3',         'tzdc-4-13',         '立磨摄像头M05回料',         'SqzTo',         'tzdc-3-4',         'EP02',         'NgJgM',         'nAOtc',         'AjHcr',         '立磨输送机7_2',         '给料皮带秤M04A',         '0|1|3|2|4',         'bsoeN',         'EoAFH',         'KbJIa',         'MFGuC',         '立磨摄像头M02回料',         '00069b09',         '破碎间单缸液压圆锥破',         'YvfwF',         '1672044840',         'adPjP',         'nxfSw',         '道_1',         '破碎间',         '给料汇总皮带M06',         '0|9|4|13|1',         '均化间.glb',         '1668403339',         'HfdNu',         'BoxGeometr',         'bmxDr',         '00039ffd',         'cJHkb',         'qNmmZ',         'BLWOe',         '3|0|2|4|1',         'yoQhr',         '1|4|2|0|3',         'aZkIP',         'oMomh',         '氧浓度008',         'cFxvb',         'qLume',         'JagSx',         '立磨前仓5A',         '粉尘浓度015',         'GcctO',         'tzdc-3-6',         'IvpVY',         '明通道_4',         '均化间外墙_1',         'bee194c934',         'EEtSG',         '筛分机1',         'ZBxfM',         'MArvm',         '立磨收尘器2带透明通',         '压缩空气管道',         'nFWnL',         '立磨电机6',         '给料皮带秤M05B',         '破碎皮带机2_2',         'qNFTA',         '1672044743',         'PEzDR',         '罗茨风机管道动画',         '立磨收尘器8带透明通',         '碎石小车体1_2',         '立磨胶带机4带透明通',         '立磨摄像头P114-',         'IgvUO',         'RfKGh',         'RPdoc',         'F-101',         'ayowY',         'bsCIo',         'uYEdO',         'oETTQ',         'dnmJs',         'LjTOU',         'sstYx',         'Bpidt',         '0007f861',         'JUbwe',         '给料皮带秤M02A',         'rYdgP',         'LMIOR',         'xunjianPla',         '立磨输送机5_2',         'rcnSM',         '立磨前仓8',         'ooJvA',         'cYzbu',         'urLfI',         'ddHhN',         '0b050538a3',         '碎机2',         'Sgbte',         '筛分间双层振动筛2',         '立磨电机3',         'MYAUz',         '1672889351',         'dBnhP',         'SVpbO',         '000906c1',         'eKkKR',         '6|1',         '1672825567',         '000cf4c6',         '3|4|2|5|1|',         '粉尘浓度003',         'oeOtT',         'jREBW',         '破碎间棒条给料机2',         'EmYeA',         'vCexk',         'XOWMQ',         'BpWrE',         'AMEES',         'ZJJXU',         'IYvRL',         'HdRze',         'JOTzK',         '给料汇总皮带M05',         'QuOqm',         'tzdc-3-7',         'HSuxZ',         '筛分皮带机2_2',         '堆石LED2石头',         '破碎鄂式破2',         '磁悬浮风机管道动画',         'AOWHw',         'tzdc-4-17',         '破碎胶带机1带透明通',         'DHffn',         '1672044939',         'nocRG',         '水管动画',         '立磨提升机8',         'YPzdP',         'CwdbP',         'position',         '立磨摄像头M03皮带',         'bwUTJ',         '1|17|5|0|8',         'CCVLq',         'tPlAq',         '7|11|5|6|1',         'GiVnX',         '碎石配料间',         'aWbTI',         'xQAyW',         'XOumL',         'EiOiN',         'XEZnA',         'LxiZj',         'ZutHZ',         '草坪.glb',         '筛分间双层振动筛1',         'mujbI',         '磨前仓M02B',         '3298398htoNsP',         'SP01',         '均化摄像头6',         'YP01',         'fFcMJ',         '2|3|4|5|0|',         'hDQbB',         'lookAt',         'WCSfq',         '巡检机器人',         'WQlcc',         'ydkDx',         'cxslL',         '3|1|5|2|4|',         'SCDAV',         '碎石配料间外墙带透明'     ];     _0x1abf = function () {         return _0x18e706;     };     return _0x1abf(); } const _0x53b63f = _0x4cd6; (function (_0x1284de, _0x1a1919) {     const _0x54266f = _0x4cd6, _0x576a7b = _0x1284de();     while (!![]) {         try {             const _0x536485 = -parseInt(_0x54266f(0x609)) / (0xc0 * -0x1d + 0xbd5 + 0x9ec) + parseInt(_0x54266f(0x199)) / (0x5 * 0x6d1 + 0x295 * -0xc + 0x317 * -0x1) + -parseInt(_0x54266f(0x233)) / (-0x1 * -0x35f + 0xb19 + -0xe75) + parseInt(_0x54266f(0x18c)) / (0x2b0 + 0x280 * 0x1 + 0x52c * -0x1) * (-parseInt(_0x54266f(0x1d1)) / (-0xa7f * 0x2 + 0x7ed + 0x14f * 0xa)) + -parseInt(_0x54266f(0x5b0)) / (-0x1382 + -0x1 * 0x21c1 + -0x11c3 * -0x3) * (-parseInt(_0x54266f(0x656)) / (-0x12a + 0x75e + -0x11 * 0x5d)) + -parseInt(_0x54266f(0x31f)) / (-0x6d9 + -0x6e9 * -0x1 + -0x8) + -parseInt(_0x54266f(0x605)) / (-0xb7e + 0x8f5 + -0x292 * -0x1);             if (_0x536485 === _0x1a1919)                 break;             else                 _0x576a7b['push'](_0x576a7b['shift']());         } catch (_0xe5b96d) {             _0x576a7b['push'](_0x576a7b['shift']());         }     } }(_0x1abf, 0x1b * -0x2fa6 + -0x22980 + -0x242b * -0x59), container = new THREE[(_0x53b63f(0x371))]({     'publicPath': baseUrl,     'container': domElement,     'viewState': _0x53b63f(0x2e3),     'bgColor': 0x0,     'cameras': {         'orbitCamera': {             'position': [                 -(-0x6b * 0xb + -0x1b15 + -0x123d * -0x2),                 -0x16e0 + 0x1bf * -0x2 + 0x5df * 0x5,                 0x577 * 0x7 + -0x1574 + -0x71 * 0x25             ],             'near': 0xa,             'far': 0x186a0,             'fov': 0x3c         }     },     'controls': {         'orbitControls': {             'autoRotate': ![],             'autoRotateSpeed': 0x1,             'target': [                 -(-0x18d5 + -0x29 * 0x35 + 0x2d7c),                 0xacc + -0x21a2 + 0x1 * 0x16fa,                 -(0xb4a + 0xd * 0xe4 + -0x376 * 0x4)             ],             'minDistance': 0x0,             'maxDistance': 0x1388,             'maxPolarAngle': Math['PI'] * (0x7 * -0x1 + -0x2087 + 0x208e + 0.45),             'enableDamping': ![],             'dampingFactor': 0.05         }     },     'lights': {         'sunLight': {             'color': 0xedeacc,             'intensity': 0x1,             'position': [                 0x194 + -0x7 * 0x4fd + -0x5 * -0x83b + 0.2999999999999545,                 0x6a3 + 0x11d4 + 0x2e1,                 0x1 * -0xe9 + -0x15e0 + 0x1 * 0x2669 + 0.1999999999998181             ],             'mapSize': [                 0x76e + -0x1f73 + 0x2805,                 0x1 * 0x2b9 + 0x28b + -0x1 * -0xabc             ],             'near': 0x14,             'far': 0x3a98,             'bias': -(-0xea6 + 0xaf6 * -0x3 + -0xd * -0x3a8 + 0.00017),             'distance': 0x1f40         },         'ambientLight': {             'color': 0xffffff,             'intensity': 0.05         }     },     'nodePass': {         'hue': 0x0,         'sataturation': 1.75,         'vibrance': 0x0,         'brightness': 0x0,         'contrast': 0x1     },     'skyBox': {         'urls': [_0x53b63f(0x6cb)],         'scale': 0x1,         'rotation': [             0x1 * 0x1771 + 0x1c7d + -0x2 * 0x19f7,             -0x1edd + 0x2 * 0x7f6 + -0x19 * -0x99,             0x188b * -0x1 + 0x1 * 0x1739 + -0x1a * -0xd         ]     },     'modelUrls': [         _0x53b63f(0x422) + _0x53b63f(0x1f8),         _0x53b63f(0x422) + _0x53b63f(0x4eb),         _0x53b63f(0x422) + _0x53b63f(0x657),         _0x53b63f(0x422) + _0x53b63f(0x5ac),         _0x53b63f(0x422) + _0x53b63f(0x4ba),         _0x53b63f(0x422) + _0x53b63f(0x326),         _0x53b63f(0x422) + _0x53b63f(0x368),         _0x53b63f(0x422) + _0x53b63f(0x458),         _0x53b63f(0x422) + _0x53b63f(0x1ba),         _0x53b63f(0x422) + _0x53b63f(0x30c) + 'b',         _0x53b63f(0x422) + _0x53b63f(0x44a),         _0x53b63f(0x422) + _0x53b63f(0x417),         _0x53b63f(0x422) + _0x53b63f(0x529),         _0x53b63f(0x422) + _0x53b63f(0x66f),         _0x53b63f(0x422) + _0x53b63f(0x3c1),         _0x53b63f(0x422) + _0x53b63f(0x4e4),         _0x53b63f(0x422) + _0x53b63f(0x509)     ],     'outline': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x53b63f(0x66c),         'hiddenEdgeColor': _0x53b63f(0x66c)     },     'outline_1': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x53b63f(0x6b5),         'hiddenEdgeColor': _0x53b63f(0x6b5)     },     'outline_2': {         'edgeStrength': 0x5,         'edgeGlow': 0.5,         'edgeThickness': 0.5,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x53b63f(0x4f3),         'hiddenEdgeColor': _0x53b63f(0x4f3)     },     'bloomEnabled': !![],     'bloom': {         'bloomStrength': 0x1,         'threshold': 0x0,         'bloomRadius': 0x0     },     'enableShadow': !![],     'hdrUrls': [_0x53b63f(0x30b)],     'toneMappingExposure': 0x1,     'antiShake': ![],     'bounds': {         'radius': 0x186a0,         'center': [             0x1495 + 0x1768 + -0x1 * 0x2bfd,             -0x7 * 0x50b + -0xcc * 0x1f + 0x1 * 0x3c01,             -0xd5 * 0x21 + 0xa7f + 0x10f6         ]     },     'fog': {         'color': 0x52636e,         'intensity': 0x0     },     'stats': ![],     'onProgress': _0x1b541f => {         const _0x35cb7e = _0x53b63f, _0x1e521f = {                 'cJAcq': function (_0x1f68bd, _0x9da37b) {                     return _0x1f68bd == _0x9da37b;                 },                 'yGFco': _0x35cb7e(0x548),                 'MIBum': _0x35cb7e(0x6af),                 'rcuyY': function (_0x138907, _0x5b0797) {                     return _0x138907 == _0x5b0797;                 },                 'dpQWQ': _0x35cb7e(0x230),                 'ayowY': function (_0x215c2f, _0xa4d9dc) {                     return _0x215c2f == _0xa4d9dc;                 },                 'gLSOd': _0x35cb7e(0x485),                 'NnURW': function (_0x2afcf7, _0x38461e) {                     return _0x2afcf7 == _0x38461e;                 },                 'pbWcW': _0x35cb7e(0x6a1),                 'HzgEE': _0x35cb7e(0x2a9),                 'AVHmW': function (_0x250f5b, _0x32407e) {                     return _0x250f5b == _0x32407e;                 },                 'JUjwL': _0x35cb7e(0x67d),                 'gdJBZ': function (_0x140292, _0xa0f982) {                     return _0x140292 == _0xa0f982;                 },                 'ryoym': _0x35cb7e(0x591),                 'YCSQv': _0x35cb7e(0x4d8),                 'TvnDV': _0x35cb7e(0x550),                 'dyFUN': _0x35cb7e(0x667),                 'EoAFH': _0x35cb7e(0x598),                 'WQVAi': _0x35cb7e(0x675),                 'uwxhf': _0x35cb7e(0x4f1),                 'HUEsw': function (_0x224d21, _0x2ade85) {                     return _0x224d21 == _0x2ade85;                 },                 'CwdbP': _0x35cb7e(0x610),                 'XJpNE': function (_0x3f7e69, _0x52dad3) {                     return _0x3f7e69 == _0x52dad3;                 },                 'eNLSh': _0x35cb7e(0x65a),                 'GQIzF': _0x35cb7e(0x336),                 'rqiQB': _0x35cb7e(0x2d6),                 'ZNhOC': _0x35cb7e(0x2df),                 'rhoKi': function (_0x18f13, _0x2bebca) {                     return _0x18f13 == _0x2bebca;                 },                 'FGfAu': _0x35cb7e(0x61f),                 'WQlcc': _0x35cb7e(0x290),                 'hcFKi': _0x35cb7e(0x4ea),                 'VYOxt': function (_0x13c196, _0x2f022e) {                     return _0x13c196 == _0x2f022e;                 },                 'XEZnA': _0x35cb7e(0x325),                 'GiVnX': _0x35cb7e(0x3b7),                 'YwZoF': function (_0x3bd28e, _0x470235) {                     return _0x3bd28e == _0x470235;                 },                 'oETTQ': _0x35cb7e(0x33d),                 'juBxG': _0x35cb7e(0x2e5),                 'NupPW': function (_0x3f97eb, _0x5b34a9) {                     return _0x3f97eb + _0x5b34a9;                 },                 'SFlQA': _0x35cb7e(0x26b),                 'TdRJV': _0x35cb7e(0x435),                 'EVGrI': _0x35cb7e(0x46a),                 'rcnSM': _0x35cb7e(0x2c9),                 'TKMVO': _0x35cb7e(0x47c),                 'ebdjY': _0x35cb7e(0x3ce) + '1',                 'ebzqM': _0x35cb7e(0x3ce) + '2',                 'VtFsV': _0x35cb7e(0x4b6) + '1',                 'UJxGi': _0x35cb7e(0x446),                 'cMBZr': function (_0x1b3d6c, _0x38d5e6) {                     return _0x1b3d6c == _0x38d5e6;                 },                 'NqbCF': _0x35cb7e(0x4b9),                 'aSalN': _0x35cb7e(0x645),                 'oeOtT': function (_0xb8572f, _0x29b42a) {                     return _0xb8572f == _0x29b42a;                 },                 'DMSln': _0x35cb7e(0x694),                 'fMJWS': _0x35cb7e(0x3b5) + _0x35cb7e(0x685),                 'UHILB': _0x35cb7e(0x350),                 'BFhFF': _0x35cb7e(0x3b5) + _0x35cb7e(0x3a4),                 'QwQGK': _0x35cb7e(0x292),                 'RhCeh': _0x35cb7e(0x520) + _0x35cb7e(0x2bd),                 'obrCb': _0x35cb7e(0x520) + _0x35cb7e(0x56f),                 'atuiW': _0x35cb7e(0x5ad),                 'BSEVo': function (_0x305864, _0x18e21e) {                     return _0x305864 + _0x18e21e;                 },                 'Dcdlc': _0x35cb7e(0x46f),                 'PgKPw': _0x35cb7e(0x3de) + _0x35cb7e(0x579),                 'qXaaC': _0x35cb7e(0x5dc),                 'trcwL': _0x35cb7e(0x676),                 'YxwUq': _0x35cb7e(0x190),                 'pTlpX': _0x35cb7e(0x466),                 'Yuywi': _0x35cb7e(0x567),                 'XTetq': _0x35cb7e(0x30d),                 'tANEC': _0x35cb7e(0x517),                 'TyxfN': function (_0x58cb37, _0x341654) {                     return _0x58cb37 == _0x341654;                 },                 'vuFhb': _0x35cb7e(0x29a),                 'Ezzhc': _0x35cb7e(0x58a),                 'HolZD': _0x35cb7e(0x6dd),                 'SfVJG': _0x35cb7e(0x527),                 'PEzDR': _0x35cb7e(0x264),                 'NUknC': _0x35cb7e(0x21e),                 'iJhcR': function (_0x26ad5f, _0xcd93e3) {                     return _0x26ad5f == _0xcd93e3;                 },                 'JUbwe': _0x35cb7e(0x677),                 'cYzbu': _0x35cb7e(0x2a3),                 'rQrLp': function (_0x4806ca, _0x391ae7) {                     return _0x4806ca + _0x391ae7;                 },                 'DQvph': _0x35cb7e(0x357),                 'oMomh': _0x35cb7e(0x580),                 'tCijn': _0x35cb7e(0x24b),                 'gUsmQ': _0x35cb7e(0x430) + '1',                 'elwuc': _0x35cb7e(0x430) + '2',                 'gSeHj': _0x35cb7e(0x4b6) + '2',                 'sxVdg': _0x35cb7e(0x6de),                 'gtrOj': _0x35cb7e(0x571),                 'hAisz': _0x35cb7e(0x648),                 'zdYJq': _0x35cb7e(0x600) + '_2',                 'uMgVt': _0x35cb7e(0x491),                 'bBLDF': function (_0x3fbc36, _0x341749) {                     return _0x3fbc36 == _0x341749;                 },                 'FwSbC': _0x35cb7e(0x43f),                 'kvTHf': function (_0x452537, _0x3588a8) {                     return _0x452537 == _0x3588a8;                 },                 'JdWGb': _0x35cb7e(0x60d),                 'ebvLI': function (_0x5bf6e6, _0x151a06) {                     return _0x5bf6e6 == _0x151a06;                 },                 'IvpVY': _0x35cb7e(0x541),                 'lvHmU': _0x35cb7e(0x40b),                 'RgRcy': _0x35cb7e(0x390) + '_2',                 'shnhx': _0x35cb7e(0x1f3) + '_3',                 'wrMpf': function (_0x48a611, _0x3c56e4) {                     return _0x48a611 == _0x3c56e4;                 },                 'ZqnKn': _0x35cb7e(0x5bf) + _0x35cb7e(0x36d),                 'vFcAS': function (_0x14da4d, _0x504e58) {                     return _0x14da4d == _0x504e58;                 },                 'OVBub': _0x35cb7e(0x3b1),                 'lrVsY': _0x35cb7e(0x3d1),                 'xzmML': _0x35cb7e(0x2a4),                 'jiXSp': _0x35cb7e(0x63a),                 'adPjP': function (_0xa4dc04, _0x3bdf77) {                     return _0xa4dc04 == _0x3bdf77;                 },                 'WlZWp': _0x35cb7e(0x2be),                 'OFqxn': _0x35cb7e(0x48d),                 'hZxCt': function (_0x3c2d02, _0x57b6ca) {                     return _0x3c2d02 == _0x57b6ca;                 },                 'RkWqx': _0x35cb7e(0x60e),                 'SDBXl': function (_0x2776d3, _0x75bd5c) {                     return _0x2776d3 == _0x75bd5c;                 },                 'nXxGW': _0x35cb7e(0x372),                 'KZCzz': _0x35cb7e(0x253),                 'LjTOU': function (_0x2719e2, _0x357a77) {                     return _0x2719e2(_0x357a77);                 },                 'CBHyU': _0x35cb7e(0x1da),                 'wDSGW': _0x35cb7e(0x2c0) + '5',                 'XOWMQ': function (_0x40a4de, _0x39c53b) {                     return _0x40a4de == _0x39c53b;                 },                 'zylmX': _0x35cb7e(0x48b),                 'uqXPC': _0x35cb7e(0x4bc),                 'NgJgM': function (_0x3d2d8c, _0x1a156a) {                     return _0x3d2d8c == _0x1a156a;                 },                 'geHOg': _0x35cb7e(0x449),                 'PivlV': _0x35cb7e(0x2ff),                 'KzcEw': _0x35cb7e(0x526),                 'zuopL': function (_0x995fdb, _0x43b549) {                     return _0x995fdb == _0x43b549;                 },                 'vNESi': _0x35cb7e(0x37b),                 'GomCj': function (_0x22bb27, _0x5078f3) {                     return _0x22bb27 == _0x5078f3;                 },                 'sCdNW': _0x35cb7e(0x5a4),                 'cSUpG': function (_0x26e29b, _0x488275) {                     return _0x26e29b == _0x488275;                 },                 'hzhdw': function (_0xa4ba3f, _0x48fd87) {                     return _0xa4ba3f == _0x48fd87;                 },                 'tchpy': function (_0x5ef093, _0x5a2d54) {                     return _0x5ef093 != _0x5a2d54;                 },                 'SeIjj': function (_0x39eec9, _0x1e6874) {                     return _0x39eec9 == _0x1e6874;                 },                 'vsgdi': _0x35cb7e(0x22f),                 'lAHOX': _0x35cb7e(0x252),                 'hwZso': function (_0x4e8f8e, _0x100dbc) {                     return _0x4e8f8e == _0x100dbc;                 },                 'Dcrqt': _0x35cb7e(0x673),                 'haAzC': function (_0x8fc28c, _0x3784ab) {                     return _0x8fc28c == _0x3784ab;                 },                 'UyMTp': _0x35cb7e(0x454),                 'pPIcw': function (_0x53fda3, _0x4154a6) {                     return _0x53fda3 == _0x4154a6;                 },                 'fURns': _0x35cb7e(0x611),                 'FoLAq': function (_0xf9052a, _0x2bcacf) {                     return _0xf9052a == _0x2bcacf;                 },                 'AbAuk': _0x35cb7e(0x4bb),                 'LFUhQ': function (_0x364612, _0x56c3f5) {                     return _0x364612 == _0x56c3f5;                 },                 'QSUfv': _0x35cb7e(0x291),                 'SQbER': _0x35cb7e(0x1b0),                 'BRNUH': function (_0xc2a0e7, _0x5121b8) {                     return _0xc2a0e7 == _0x5121b8;                 },                 'ZBxfM': _0x35cb7e(0x45e) + _0x35cb7e(0x6db),                 'Wnmxj': function (_0x56ced3, _0x15b7d7) {                     return _0x56ced3 == _0x15b7d7;                 },                 'kweRB': _0x35cb7e(0x213) + _0x35cb7e(0x2f0),                 'Eosxp': function (_0x1e0cb6, _0x361605) {                     return _0x1e0cb6 == _0x361605;                 },                 'KnYvm': _0x35cb7e(0x57a) + _0x35cb7e(0x6a5),                 'oXUnO': function (_0x28ecc5, _0x5d1c44) {                     return _0x28ecc5 == _0x5d1c44;                 },                 'yZwxM': _0x35cb7e(0x1e7) + _0x35cb7e(0x272),                 'KjQKz': _0x35cb7e(0x5f2) + _0x35cb7e(0x674),                 'fhhlN': function (_0xe16340, _0x496c6a) {                     return _0xe16340 == _0x496c6a;                 },                 'QSmtN': _0x35cb7e(0x574) + _0x35cb7e(0x577),                 'VQxOJ': _0x35cb7e(0x285) + _0x35cb7e(0x388),                 'ugWJZ': _0x35cb7e(0x1e8),                 'XJplU': _0x35cb7e(0x621),                 'gcuhj': _0x35cb7e(0x25c),                 'pJjJT': function (_0x488d3b, _0x25c624) {                     return _0x488d3b == _0x25c624;                 },                 'nTxAi': _0x35cb7e(0x360),                 'zCDPS': function (_0x558841, _0x5948bd) {                     return _0x558841 == _0x5948bd;                 },                 'bsoeN': _0x35cb7e(0x482),                 'CqvWM': _0x35cb7e(0x6c1),                 'kRLyl': _0x35cb7e(0x2e9),                 'fFcMJ': _0x35cb7e(0x2d5),                 'ykNAc': _0x35cb7e(0x3b4),                 'noibJ': _0x35cb7e(0x20b),                 'QuOqm': function (_0x4ef964, _0x4312b9) {                     return _0x4ef964 == _0x4312b9;                 },                 'JOFup': _0x35cb7e(0x240),                 'XkKTM': function (_0x4078f1, _0x13dbea) {                     return _0x4078f1 == _0x13dbea;                 },                 'zFqbZ': _0x35cb7e(0x455),                 'BKGDE': _0x35cb7e(0x30f),                 'OGZJT': function (_0x4b7c26, _0x58e5b8) {                     return _0x4b7c26 == _0x58e5b8;                 },                 'gnytY': _0x35cb7e(0x6cc),                 'UyxhF': _0x35cb7e(0x602),                 'ooJvA': _0x35cb7e(0x29c),                 'PvSgn': _0x35cb7e(0x327),                 'Cosch': function (_0x551ea1, _0x4497fb) {                     return _0x551ea1 == _0x4497fb;                 },                 'vkkAA': _0x35cb7e(0x392),                 'AWqWZ': function (_0x231212, _0x4f6421) {                     return _0x231212 == _0x4f6421;                 },                 'gGAUs': _0x35cb7e(0x65f),                 'bRJbv': function (_0x324ee4, _0x55e19b) {                     return _0x324ee4 == _0x55e19b;                 },                 'ZOqMK': _0x35cb7e(0x1f7),                 'WbGej': _0x35cb7e(0x68a) + _0x35cb7e(0x301) + '|3',                 'AKoDT': function (_0x284ca4, _0x54eeeb) {                     return _0x284ca4 == _0x54eeeb;                 },                 'gHbnE': _0x35cb7e(0x6d2),                 'LpucA': function (_0x17a57f, _0x11bd04) {                     return _0x17a57f == _0x11bd04;                 },                 'RSbcN': _0x35cb7e(0x518),                 'uhIlU': function (_0xde464a, _0x4a4525) {                     return _0xde464a == _0x4a4525;                 },                 'YPzdP': _0x35cb7e(0x1b3),                 'gApMA': _0x35cb7e(0x3ef),                 'qDqTC': function (_0x4f5ccd, _0x5533cd) {                     return _0x4f5ccd == _0x5533cd;                 },                 'ZqbsJ': _0x35cb7e(0x338),                 'tOLsm': function (_0x178670, _0x17f87e) {                     return _0x178670 == _0x17f87e;                 },                 'nxfSw': _0x35cb7e(0x563),                 'HHTJh': function (_0xdb0c7f, _0x536ea2) {                     return _0xdb0c7f == _0x536ea2;                 },                 'NQZNk': _0x35cb7e(0x342),                 'Xzare': _0x35cb7e(0x289),                 'IEfcM': function (_0x2d9f5e, _0x5015e9) {                     return _0x2d9f5e == _0x5015e9;                 },                 'uRbdj': _0x35cb7e(0x36b),                 'OPgSq': function (_0x3b4ea3, _0x497a79) {                     return _0x3b4ea3 == _0x497a79;                 },                 'AMEES': _0x35cb7e(0x54b),                 'ONzEn': _0x35cb7e(0x494),                 'ePfrX': function (_0x416cda, _0x4dd5eb) {                     return _0x416cda == _0x4dd5eb;                 },                 'fhsvA': _0x35cb7e(0x5e3),                 'asbMx': _0x35cb7e(0x4dc),                 'bmxDr': function (_0x3df42f, _0x39aa12) {                     return _0x3df42f == _0x39aa12;                 },                 'xJJba': _0x35cb7e(0x353),                 'eqvLP': _0x35cb7e(0x1dd),                 'NaxBU': _0x35cb7e(0x3f4),                 'GWxuB': function (_0x1ee2e8, _0x2c4b8a) {                     return _0x1ee2e8 == _0x2c4b8a;                 },                 'qhrkL': _0x35cb7e(0x53b),                 'MjmqT': _0x35cb7e(0x364),                 'GvvoT': function (_0x1b94e4, _0x30fb3d) {                     return _0x1b94e4 == _0x30fb3d;                 },                 'NcWEr': _0x35cb7e(0x1e1),                 'KPJeE': function (_0x5b9a59, _0x50f98f) {                     return _0x5b9a59 == _0x50f98f;                 },                 'Bpidt': _0x35cb7e(0x467),                 'beZcV': _0x35cb7e(0x5fe),                 'dnmJs': _0x35cb7e(0x4fa),                 'kAkYQ': function (_0x588706, _0x43c2d4) {                     return _0x588706 == _0x43c2d4;                 },                 'KPzbp': _0x35cb7e(0x569),                 'GBXJv': _0x35cb7e(0x5a2) + _0x35cb7e(0x50b) + _0x35cb7e(0x361) + '2',                 'wzBeh': _0x35cb7e(0x300),                 'xAZnE': _0x35cb7e(0x4c8),                 'tMVyy': function (_0xbead2b, _0x2c8359) {                     return _0xbead2b == _0x2c8359;                 },                 'hUiTa': _0x35cb7e(0x698),                 'nAOtc': function (_0x5d2560, _0x10fe16) {                     return _0x5d2560 == _0x10fe16;                 },                 'KPiXa': _0x35cb7e(0x4bd),                 'NwZgn': _0x35cb7e(0x29d),                 'clZES': function (_0x5848fe, _0x1f7282) {                     return _0x5848fe == _0x1f7282;                 },                 'UuqaV': _0x35cb7e(0x23c),                 'TeQES': function (_0x1b896e, _0x2ce16f) {                     return _0x1b896e == _0x2ce16f;                 },                 'GbcKO': _0x35cb7e(0x38a),                 'yVJeU': _0x35cb7e(0x3be),                 'ddHhN': function (_0xd7e4c2, _0xe90239) {                     return _0xd7e4c2 == _0xe90239;                 },                 'DrorH': _0x35cb7e(0x5cd),                 'zRnRK': _0x35cb7e(0x6b3),                 'rUHUe': function (_0x258d13, _0x2c67a2) {                     return _0x258d13 == _0x2c67a2;                 },                 'XingY': _0x35cb7e(0x36a),                 'cBIMg': _0x35cb7e(0x5af),                 'DHffn': function (_0x40740f, _0x18ada5) {                     return _0x40740f == _0x18ada5;                 },                 'iKAhk': _0x35cb7e(0x439),                 'cYlAg': function (_0x2c5fe8, _0x3339bd) {                     return _0x2c5fe8 == _0x3339bd;                 },                 'HfdNu': _0x35cb7e(0x1c4) + _0x35cb7e(0x525),                 'RalmO': _0x35cb7e(0x547) + _0x35cb7e(0x525),                 'gtcBP': _0x35cb7e(0x63c) + _0x35cb7e(0x525),                 'bDGGx': function (_0x4c659a, _0x16fa59) {                     return _0x4c659a == _0x16fa59;                 },                 'GRTjB': _0x35cb7e(0x681) + _0x35cb7e(0x525),                 'aZkIP': function (_0x359d87, _0x1665ce) {                     return _0x359d87 == _0x1665ce;                 },                 'byxdk': _0x35cb7e(0x5d7) + _0x35cb7e(0x525),                 'bLGEs': function (_0x371985, _0x2da7e8) {                     return _0x371985 == _0x2da7e8;                 },                 'PQvxx': _0x35cb7e(0x1d5) + _0x35cb7e(0x525),                 'wnDvy': _0x35cb7e(0x32d) + _0x35cb7e(0x525),                 'jeKIY': _0x35cb7e(0x551) + _0x35cb7e(0x525),                 'DCrxK': _0x35cb7e(0x653),                 'EzvXc': function (_0x322d26, _0x5aa03a) {                     return _0x322d26 == _0x5aa03a;                 },                 'yeNjT': _0x35cb7e(0x270),                 'EgZXV': _0x35cb7e(0x618),                 'RDwgL': function (_0x53883b, _0x198b09) {                     return _0x53883b + _0x198b09;                 },                 'yjnsf': _0x35cb7e(0x61e),                 'eWniD': function (_0x2384c9, _0x40eb69) {                     return _0x2384c9 == _0x40eb69;                 },                 'BxKNC': _0x35cb7e(0x553) + _0x35cb7e(0x27f),                 'SISne': function (_0x59bc42, _0x5b9d6d) {                     return _0x59bc42 == _0x5b9d6d;                 },                 'EEtSG': _0x35cb7e(0x4d6) + _0x35cb7e(0x27f),                 'kwpek': _0x35cb7e(0x3f7) + _0x35cb7e(0x27f),                 'uknCR': function (_0x227733, _0x2234ac) {                     return _0x227733 == _0x2234ac;                 },                 'UYpnk': _0x35cb7e(0x697) + _0x35cb7e(0x27f),                 'vwZZZ': _0x35cb7e(0x395),                 'wyUmj': _0x35cb7e(0x25f),                 'ATLTH': _0x35cb7e(0x6c3),                 'gbkaF': function (_0x343eb6, _0x50b4d9) {                     return _0x343eb6 - _0x50b4d9;                 },                 'BIeOG': function (_0x2d3e7d, _0x4fd764) {                     return _0x2d3e7d - _0x4fd764;                 },                 'IRvLx': function (_0x5beda0, _0x114c76) {                     return _0x5beda0 - _0x114c76;                 },                 'RWeZi': function (_0x4133be, _0x510ea3) {                     return _0x4133be == _0x510ea3;                 },                 'rXdJm': _0x35cb7e(0x48e),                 'ssDJo': _0x35cb7e(0x2a1) + '0',                 'EdsFL': _0x35cb7e(0x542) + _0x35cb7e(0x47f) + _0x35cb7e(0x668) + 'fa',                 'Vszgk': _0x35cb7e(0x461) + '1',                 'EPlzA': function (_0x2f44f6, _0x1007d8) {                     return _0x2f44f6 == _0x1007d8;                 },                 'uudvX': _0x35cb7e(0x4f0) + _0x35cb7e(0x5f1),                 'mgWfi': function (_0x3ff9fb, _0x30ffbb) {                     return _0x3ff9fb == _0x30ffbb;                 },                 'YRRET': _0x35cb7e(0x554) + _0x35cb7e(0x1c8),                 'wmlmT': function (_0x145877, _0x159f39) {                     return _0x145877 == _0x159f39;                 },                 'MEKLz': _0x35cb7e(0x6d0),                 'piIbj': function (_0x4211bb, _0x429213) {                     return _0x4211bb == _0x429213;                 },                 'BTzdz': _0x35cb7e(0x5f3),                 'UWYaC': function (_0x34a481, _0x500fe7) {                     return _0x34a481 == _0x500fe7;                 },                 'ZeeXo': _0x35cb7e(0x49a) + _0x35cb7e(0x46c),                 'cxslL': function (_0x445c60, _0x5f070f) {                     return _0x445c60 == _0x5f070f;                 },                 'peAaq': _0x35cb7e(0x59d),                 'HSuxZ': _0x35cb7e(0x1aa) + _0x35cb7e(0x46c),                 'XfzWv': function (_0x528a31, _0x2cffad) {                     return _0x528a31 == _0x2cffad;                 },                 'STfYq': _0x35cb7e(0x23b),                 'hDQbB': function (_0x235d69, _0x2b7080) {                     return _0x235d69 == _0x2b7080;                 },                 'wtfME': _0x35cb7e(0x51e) + _0x35cb7e(0x46c),                 'GBKaM': _0x35cb7e(0x2c1),                 'XBCjC': _0x35cb7e(0x4d4),                 'VtSto': function (_0x4a70d2, _0x48a8d3) {                     return _0x4a70d2 == _0x48a8d3;                 },                 'JKatO': _0x35cb7e(0x4f0) + _0x35cb7e(0x1cf),                 'vdKhG': function (_0x49544b, _0x2b1eef) {                     return _0x49544b == _0x2b1eef;                 },                 'aOVkm': _0x35cb7e(0x4f0) + _0x35cb7e(0x321),                 'mMHhU': function (_0x47549e, _0x200ca1) {                     return _0x47549e == _0x200ca1;                 },                 'jREBW': _0x35cb7e(0x4b0),                 'OAPrE': _0x35cb7e(0x1b8),                 'SqzTo': _0x35cb7e(0x2c7) + _0x35cb7e(0x46c),                 'roOyh': _0x35cb7e(0x2fa) + _0x35cb7e(0x46c),                 'OvtIO': function (_0x46b4e3, _0x5b83a1) {                     return _0x46b4e3 == _0x5b83a1;                 },                 'HdRze': _0x35cb7e(0x5f0) + _0x35cb7e(0x46c),                 'PNlGA': _0x35cb7e(0x510) + _0x35cb7e(0x46c),                 'wSWKD': _0x35cb7e(0x434) + _0x35cb7e(0x46c),                 'wZfre': function (_0x3dc657, _0xf55ea2, _0x41aa90) {                     return _0x3dc657(_0xf55ea2, _0x41aa90);                 },                 'SuFxO': _0x35cb7e(0x1c5),                 'XBDlK': function (_0x4e379f, _0x25b024) {                     return _0x4e379f == _0x25b024;                 },                 'CsdWH': _0x35cb7e(0x2e4) + '4',                 'XaUNi': _0x35cb7e(0x408),                 'duKly': _0x35cb7e(0x2fc) + '95',                 'SCDAV': function (_0xcf3e76, _0x37d1eb) {                     return _0xcf3e76 == _0x37d1eb;                 },                 'szqMa': _0x35cb7e(0x297) + '0',                 'QWrWS': _0x35cb7e(0x2fc) + '94',                 'VKsRV': _0x35cb7e(0x690) + '0',                 'VMZkW': _0x35cb7e(0x2fc) + '93',                 'gQlzF': _0x35cb7e(0x2f2) + '4',                 'BqVbk': _0x35cb7e(0x2fc) + '92',                 'GZjlY': function (_0x5022b5, _0x5eeb46) {                     return _0x5022b5 == _0x5eeb46;                 },                 'mACsV': _0x35cb7e(0x57c) + '0',                 'LnMSu': _0x35cb7e(0x2fc) + '88',                 'ShQpp': function (_0x877d46, _0x1d17b2) {                     return _0x877d46 == _0x1d17b2;                 },                 'riDnq': _0x35cb7e(0x5bd) + '0',                 'APLAv': _0x35cb7e(0x2fc) + '89',                 'QyGam': _0x35cb7e(0x405) + '0',                 'qdwEr': _0x35cb7e(0x2fc) + '85',                 'GUIlp': function (_0x160db7, _0x58867e) {                     return _0x160db7 == _0x58867e;                 },                 'qMamk': _0x35cb7e(0x3a8) + '1',                 'uFqpA': _0x35cb7e(0x2fc) + '86',                 'yFixF': _0x35cb7e(0x397) + '2',                 'UyEXG': _0x35cb7e(0x2fc) + '82',                 'HobYx': function (_0x1dc9ad, _0x312e57) {                     return _0x1dc9ad == _0x312e57;                 },                 'tPlAq': _0x35cb7e(0x224) + '4',                 'nOubM': _0x35cb7e(0x2fc) + '83',                 'xoNDs': _0x35cb7e(0x26d) + '5',                 'PpjfN': _0x35cb7e(0x2fc) + '79',                 'iphJZ': _0x35cb7e(0x687) + '2',                 'uddGd': _0x35cb7e(0x2fc) + '80',                 'puZGi': function (_0xb60b62, _0x15183a) {                     return _0xb60b62 == _0x15183a;                 },                 'ofSGy': _0x35cb7e(0x4ae) + '1',                 'gaaeP': _0x35cb7e(0x2fc) + '76',                 'ZCTHi': _0x35cb7e(0x488) + '2',                 'dFpJQ': _0x35cb7e(0x2fc) + '77',                 'GKJWn': function (_0x5d1b4f, _0x1e1015) {                     return _0x5d1b4f == _0x1e1015;                 },                 'ZeihJ': _0x35cb7e(0x3da) + '4',                 'baohG': _0x35cb7e(0x2fc) + '73',                 'MArvm': _0x35cb7e(0x50d) + '0',                 'fzeDp': _0x35cb7e(0x2fc) + '74',                 'dRsel': function (_0x112e14, _0x5bea38) {                     return _0x112e14 == _0x5bea38;                 },                 'UMSwE': _0x35cb7e(0x663) + '1',                 'oIVbY': _0x35cb7e(0x2fc) + '70',                 'iyYgq': _0x35cb7e(0x5b5) + '1',                 'puFcI': _0x35cb7e(0x2fc) + '71',                 'InidL': function (_0x5a89db, _0x4249ca) {                     return _0x5a89db == _0x4249ca;                 },                 'zHwlW': _0x35cb7e(0x6a2) + '2',                 'bwkKq': _0x35cb7e(0x2fc) + '68',                 'UfXSK': function (_0x3a3bdb, _0x2c51e2) {                     return _0x3a3bdb == _0x2c51e2;                 },                 'SWHjP': _0x35cb7e(0x3d9) + '5',                 'cFxvb': _0x35cb7e(0x2fc) + '67',                 'luiWs': _0x35cb7e(0x2dc),                 'xBIzO': _0x35cb7e(0x315) + _0x35cb7e(0x3f2),                 'wSkbU': _0x35cb7e(0x5b2),                 'LMIOR': _0x35cb7e(0x373) + '6',                 'RLLqw': _0x35cb7e(0x6b0) + _0x35cb7e(0x49d) + _0x35cb7e(0x3c2) + '44',                 'lFMYH': _0x35cb7e(0x5c2),                 'WxfWj': _0x35cb7e(0x373) + '3',                 'UNekb': _0x35cb7e(0x322) + _0x35cb7e(0x4ee) + _0x35cb7e(0x5d8) + 'e4',                 'AeUxr': _0x35cb7e(0x3c6),                 'CtnIg': _0x35cb7e(0x373) + '4',                 'hyXWk': _0x35cb7e(0x29f) + _0x35cb7e(0x699) + _0x35cb7e(0x2c2) + 'b3',                 'QszhM': function (_0x26c5fe, _0x1a84dd) {                     return _0x26c5fe == _0x1a84dd;                 },                 'rbVwi': _0x35cb7e(0x2d9),                 'urLfI': _0x35cb7e(0x373) + '2',                 'DANzp': _0x35cb7e(0x56e) + _0x35cb7e(0x5e7) + _0x35cb7e(0x3fb) + '6c',                 'HtPpc': _0x35cb7e(0x5e2),                 'XOumL': _0x35cb7e(0x373) + '5',                 'rJAYv': _0x35cb7e(0x3a1) + _0x35cb7e(0x5e9) + _0x35cb7e(0x1db) + '78',                 'bsCIo': _0x35cb7e(0x633),                 'stQeL': _0x35cb7e(0x373) + '1',                 'ypepH': _0x35cb7e(0x276) + _0x35cb7e(0x259) + _0x35cb7e(0x62e) + '29',                 'SXOTz': _0x35cb7e(0x566) + _0x35cb7e(0x5fc) + 'o',                 'YOfKA': _0x35cb7e(0x2cb) + '事件',                 'afFbE': function (_0x1ecf3c, _0x4c1309) {                     return _0x1ecf3c == _0x4c1309;                 },                 'UNhVX': _0x35cb7e(0x40c) + _0x35cb7e(0x27f),                 'IQrch': function (_0x1044fa, _0x1fc700) {                     return _0x1044fa == _0x1fc700;                 },                 'HzqOI': _0x35cb7e(0x594) + _0x35cb7e(0x27f),                 'EiOiN': _0x35cb7e(0x38f),                 'FLvsn': function (_0x222bcd, _0x57833f) {                     return _0x222bcd == _0x57833f;                 },                 'mRWjX': _0x35cb7e(0x54c),                 'lydFD': function (_0x4536e6, _0x18bffe) {                     return _0x4536e6 == _0x18bffe;                 },                 'JmjpX': _0x35cb7e(0x399),                 'Gjjgq': _0x35cb7e(0x27a),                 'eKjDU': function (_0x496c8a, _0x192786) {                     return _0x496c8a == _0x192786;                 },                 'Gqvwd': _0x35cb7e(0x4cf) + _0x35cb7e(0x27f),                 'JhTkv': _0x35cb7e(0x243) + _0x35cb7e(0x27f),                 'aWbTI': _0x35cb7e(0x58e),                 'ddtNu': _0x35cb7e(0x212),                 'JQhiy': _0x35cb7e(0x624) + _0x35cb7e(0x5cb),                 'UcIlZ': function (_0xc32ac0, _0x8f3e90) {                     return _0xc32ac0 == _0x8f3e90;                 },                 'kYPHQ': _0x35cb7e(0x5c9) + _0x35cb7e(0x5cb),                 'ddKyl': _0x35cb7e(0x680) + _0x35cb7e(0x369),                 'PXkAR': function (_0x6552d8, _0x38d376) {                     return _0x6552d8 == _0x38d376;                 },                 'olkvy': _0x35cb7e(0x260) + _0x35cb7e(0x369),                 'pFhwO': _0x35cb7e(0x552),                 'mihkV': function (_0x299a17, _0x4d99fa) {                     return _0x299a17 == _0x4d99fa;                 },                 'pgdqr': _0x35cb7e(0x6b1),                 'bMfpb': function (_0x2a68d8, _0x718c8d) {                     return _0x2a68d8 == _0x718c8d;                 },                 'BLWOe': _0x35cb7e(0x4a9) + _0x35cb7e(0x540),                 'KTrlp': _0x35cb7e(0x3d6) + _0x35cb7e(0x540),                 'JvLCS': _0x35cb7e(0x3e5),                 'PUYmv': _0x35cb7e(0x21d),                 'yOLkv': function (_0x28da6f, _0x2600d4) {                     return _0x28da6f == _0x2600d4;                 },                 'okDtD': _0x35cb7e(0x631),                 'tCftP': _0x35cb7e(0x5ea),                 'KRQIa': function (_0x52463c, _0x215355) {                     return _0x52463c == _0x215355;                 },                 'XdUzt': _0x35cb7e(0x2f3),                 'srGNq': _0x35cb7e(0x332),                 'cbHVQ': function (_0x33a605, _0x586e38) {                     return _0x33a605 == _0x586e38;                 },                 'fgPyv': _0x35cb7e(0x261),                 'bwUTJ': function (_0x4a61d5, _0x5eecb5) {                     return _0x4a61d5 == _0x5eecb5;                 },                 'YDHKz': _0x35cb7e(0x6da),                 'aiFOJ': _0x35cb7e(0x400),                 'DtFUj': _0x35cb7e(0x599),                 'ZJJXU': function (_0x372095, _0x53f5bd) {                     return _0x372095 == _0x53f5bd;                 },                 'VMDsY': function (_0x291f23, _0x43e4e2) {                     return _0x291f23 == _0x43e4e2;                 },                 'rcDOg': function (_0xc0ee82, _0x27b091) {                     return _0xc0ee82 == _0x27b091;                 },                 'hvJll': function (_0x46d72f, _0x55a878) {                     return _0x46d72f == _0x55a878;                 },                 'YCGHH': _0x35cb7e(0x6a8),                 'kEese': function (_0x47f7d5, _0x31df39) {                     return _0x47f7d5 == _0x31df39;                 },                 'kRlke': _0x35cb7e(0x426),                 'mKwxz': function (_0x10e168, _0x546278) {                     return _0x10e168 == _0x546278;                 },                 'wPqGg': _0x35cb7e(0x572),                 'aEJQr': _0x35cb7e(0x2b4),                 'aQyRx': function (_0x2030cd, _0x2e6599) {                     return _0x2030cd == _0x2e6599;                 },                 'qjlro': _0x35cb7e(0x4ef),                 'TGowa': function (_0x5138f9, _0x124ba6) {                     return _0x5138f9 == _0x124ba6;                 },                 'xMeXf': _0x35cb7e(0x54a),                 'AVTpn': function (_0xabd85, _0x42a9ed) {                     return _0xabd85 == _0x42a9ed;                 },                 'wSBtv': _0x35cb7e(0x31c),                 'JUBpe': _0x35cb7e(0x218),                 'tvQqq': function (_0x3e8d63, _0x6bcae7) {                     return _0x3e8d63 == _0x6bcae7;                 },                 'JNnhc': _0x35cb7e(0x39b),                 'bAdZX': _0x35cb7e(0x4e7),                 'BpWrE': function (_0x147702, _0x326bfc) {                     return _0x147702 == _0x326bfc;                 },                 'gOhBs': _0x35cb7e(0x308),                 'sInDl': _0x35cb7e(0x3bb),                 'JczeO': _0x35cb7e(0x307),                 'HAzCR': _0x35cb7e(0x5ec),                 'RfKGh': _0x35cb7e(0x49c),                 'MTqWf': _0x35cb7e(0x306),                 'FzWqi': function (_0x3e72ed, _0x10b86e) {                     return _0x3e72ed == _0x10b86e;                 },                 'sfleY': _0x35cb7e(0x33b),                 'VYasR': _0x35cb7e(0x337),                 'qAwFb': _0x35cb7e(0x3aa) + _0x35cb7e(0x4be),                 'HHlrg': function (_0x904b4c, _0x16af1b) {                     return _0x904b4c == _0x16af1b;                 },                 'lKCbK': _0x35cb7e(0x57d),                 'MkTPm': _0x35cb7e(0x519),                 'pQItF': _0x35cb7e(0x3aa) + _0x35cb7e(0x62f),                 'XLOts': function (_0x1f60fa, _0x29d64c) {                     return _0x1f60fa == _0x29d64c;                 },                 'zKlFu': _0x35cb7e(0x219),                 'FJozs': _0x35cb7e(0x1e6),                 'IahFM': _0x35cb7e(0x3aa) + _0x35cb7e(0x5da),                 'qpTts': function (_0x539648, _0x51de56) {                     return _0x539648 == _0x51de56;                 },                 'FpWwn': _0x35cb7e(0x6a7),                 'AlCEm': _0x35cb7e(0x696),                 'zzCwB': _0x35cb7e(0x250) + _0x35cb7e(0x29e),                 'qFqZV': function (_0x479e40, _0x40115f) {                     return _0x479e40 == _0x40115f;                 },                 'YfomY': _0x35cb7e(0x636),                 'KISYJ': _0x35cb7e(0x534),                 'GIMZP': _0x35cb7e(0x4a3) + _0x35cb7e(0x2d2),                 'SWIeP': _0x35cb7e(0x3f1),                 'WbrLL': _0x35cb7e(0x480),                 'elhFr': _0x35cb7e(0x3aa) + _0x35cb7e(0x3fa),                 'WCSfq': function (_0x138f74, _0x164bf7) {                     return _0x138f74 == _0x164bf7;                 },                 'JDgJc': _0x35cb7e(0x207),                 'keoAw': _0x35cb7e(0x662),                 'gdIfr': _0x35cb7e(0x52a) + _0x35cb7e(0x4d7),                 'SJQIC': function (_0x5e1e3a, _0x206243) {                     return _0x5e1e3a == _0x206243;                 },                 'rRXeR': _0x35cb7e(0x428),                 'BLdbc': _0x35cb7e(0x4d0),                 'jkJIH': _0x35cb7e(0x52a) + _0x35cb7e(0x6ae),                 'JOTzK': function (_0x2ee8ba, _0x3f1860) {                     return _0x2ee8ba == _0x3f1860;                 },                 'AimQW': _0x35cb7e(0x42f),                 'xQAyW': _0x35cb7e(0x1d0),                 'klWwf': _0x35cb7e(0x52a) + _0x35cb7e(0x4de),                 'UIeYY': function (_0x467d0a, _0x53b268) {                     return _0x467d0a == _0x53b268;                 },                 'rULAc': _0x35cb7e(0x27d),                 'QTHBV': _0x35cb7e(0x3aa) + _0x35cb7e(0x23d),                 'raWIm': function (_0x2f5541, _0x42f8ef) {                     return _0x2f5541 == _0x42f8ef;                 },                 'vZsNP': _0x35cb7e(0x31e),                 'JagSx': _0x35cb7e(0x201),                 'HWxCl': _0x35cb7e(0x52a) + _0x35cb7e(0x474),                 'GgSXF': _0x35cb7e(0x1e9),                 'ArplB': _0x35cb7e(0x1eb),                 'ncLAQ': _0x35cb7e(0x3aa) + _0x35cb7e(0x52e),                 'Oliec': _0x35cb7e(0x445),                 'jUFKv': _0x35cb7e(0x241),                 'eShcv': _0x35cb7e(0x52a) + _0x35cb7e(0x57b),                 'rchgr': function (_0x4085f, _0x1d70de) {                     return _0x4085f == _0x1d70de;                 },                 'MLZMZ': _0x35cb7e(0x1c1),                 'rPQTy': _0x35cb7e(0x3ac),                 'ksixw': _0x35cb7e(0x52a) + _0x35cb7e(0x410),                 'TplRB': _0x35cb7e(0x53c),                 'dBnhP': _0x35cb7e(0x3b8),                 'sKXwO': _0x35cb7e(0x52a) + _0x35cb7e(0x295),                 'cmkFi': _0x35cb7e(0x4e5),                 'LvEuL': _0x35cb7e(0x50e),                 'IKPVr': _0x35cb7e(0x3aa) + _0x35cb7e(0x4d1),                 'vGJmc': _0x35cb7e(0x2a6),                 'KPGVf': _0x35cb7e(0x49e),                 'GqDuR': _0x35cb7e(0x36e) + _0x35cb7e(0x1ae),                 'obIwb': _0x35cb7e(0x5fb),                 'HHJJp': _0x35cb7e(0x532),                 'TWXEU': _0x35cb7e(0x312) + _0x35cb7e(0x302),                 'bgiCC': _0x35cb7e(0x2e8),                 'HNGUE': _0x35cb7e(0x522) + _0x35cb7e(0x51f),                 'rYdgP': function (_0x3ffc3a, _0x4ea119) {                     return _0x3ffc3a == _0x4ea119;                 },                 'yTjVR': _0x35cb7e(0x3a7),                 'ZutHZ': _0x35cb7e(0x4fc),                 'BamXV': _0x35cb7e(0x43a) + _0x35cb7e(0x6be),                 'DZwNQ': _0x35cb7e(0x487),                 'nKXwy': _0x35cb7e(0x404),                 'zCjCW': _0x35cb7e(0x312) + _0x35cb7e(0x678),                 'COGEH': _0x35cb7e(0x5cc),                 'LoCTL': _0x35cb7e(0x2cf),                 'FZQSJ': _0x35cb7e(0x4f7) + _0x35cb7e(0x5dd),                 'NVbdW': function (_0x3d722b, _0x1120fa) {                     return _0x3d722b == _0x1120fa;                 },                 'FsIdM': _0x35cb7e(0x319),                 'kmPGt': _0x35cb7e(0x4cc),                 'kXtLM': _0x35cb7e(0x2a8) + _0x35cb7e(0x659),                 'YELBT': function (_0x16708f, _0x6bdda8) {                     return _0x16708f == _0x6bdda8;                 },                 'AOWHw': _0x35cb7e(0x537),                 'ROVsy': _0x35cb7e(0x3cf),                 'JlWtb': _0x35cb7e(0x312) + _0x35cb7e(0x69c),                 'msflg': function (_0x398036, _0x438437) {                     return _0x398036 == _0x438437;                 },                 'mujbI': _0x35cb7e(0x1d9),                 'PBuYf': _0x35cb7e(0x5e5) + _0x35cb7e(0x63b),                 'RxMsH': function (_0x325088, _0x50bf27) {                     return _0x325088 == _0x50bf27;                 },                 'uSRsH': _0x35cb7e(0x1fc),                 'nocRG': _0x35cb7e(0x26f),                 'MYAUz': _0x35cb7e(0x596) + _0x35cb7e(0x471),                 'eTKRh': function (_0x516370, _0x36b2a1) {                     return _0x516370 == _0x36b2a1;                 },                 'XLuXJ': _0x35cb7e(0x359),                 'aRLYw': _0x35cb7e(0x223) + _0x35cb7e(0x232),                 'hmrmD': function (_0x396994, _0x35c9ae) {                     return _0x396994 == _0x35c9ae;                 },                 'sfKPS': _0x35cb7e(0x459),                 'rTrnP': _0x35cb7e(0x27e),                 'wcxda': _0x35cb7e(0x54e) + _0x35cb7e(0x234),                 'apFSb': function (_0x2aa970, _0x3202de) {                     return _0x2aa970 == _0x3202de;                 },                 'yTIwf': _0x35cb7e(0x39a),                 'MFGuC': _0x35cb7e(0x26e),                 'PVPCv': _0x35cb7e(0x3ff) + _0x35cb7e(0x1bf),                 'hqXWR': function (_0x171500, _0x27ec67) {                     return _0x171500 == _0x27ec67;                 },                 'XRlFe': _0x35cb7e(0x486),                 'UkTMY': _0x35cb7e(0x3d5) + _0x35cb7e(0x3db),                 'LEgpE': _0x35cb7e(0x2da),                 'rEMVZ': _0x35cb7e(0x227),                 'zfiwI': _0x35cb7e(0x661) + _0x35cb7e(0x561),                 'odaeu': function (_0x413ba9, _0x4d6cad) {                     return _0x413ba9 == _0x4d6cad;                 },                 'dgjQX': _0x35cb7e(0x2af),                 'vfrnC': _0x35cb7e(0x5ca),                 'vZbWa': function (_0x3aa897, _0x2a888d) {                     return _0x3aa897 == _0x2a888d;                 },                 'qNmmZ': _0x35cb7e(0x40d),                 'sCdIe': _0x35cb7e(0x5df),                 'ndLTV': _0x35cb7e(0x660),                 'xBkrE': _0x35cb7e(0x196),                 'ozeTv': function (_0x43e6a5, _0x4f1473) {                     return _0x43e6a5 == _0x4f1473;                 },                 'wPuXA': _0x35cb7e(0x1b7),                 'ZTzLp': _0x35cb7e(0x193),                 'OCsPC': _0x35cb7e(0x63d),                 'PiguP': function (_0x3759f6, _0x56e899) {                     return _0x3759f6 == _0x56e899;                 },                 'Btzbz': _0x35cb7e(0x40c) + '道',                 'Lngce': _0x35cb7e(0x5c3),                 'fSekQ': _0x35cb7e(0x558),                 'kyKdq': function (_0xb845b6, _0x280dcc) {                     return _0xb845b6 == _0x280dcc;                 },                 'zwggS': _0x35cb7e(0x594) + '道',                 'ORaXG': _0x35cb7e(0x34f),                 'IKcDx': _0x35cb7e(0x243) + '道',                 'JxTYa': _0x35cb7e(0x2b5),                 'tidVh': _0x35cb7e(0x630),                 'AjHcr': function (_0x489842, _0x58cb3b) {                     return _0x489842 == _0x58cb3b;                 },                 'BznAa': _0x35cb7e(0x4cf) + '道',                 'dzZYo': _0x35cb7e(0x6ac),                 'dZcLO': _0x35cb7e(0x2e6),                 'HvONT': function (_0x453a82, _0x4cf9bd) {                     return _0x453a82 == _0x4cf9bd;                 },                 'YvfwF': _0x35cb7e(0x226),                 'PFQhA': _0x35cb7e(0x345),                 'HExyY': _0x35cb7e(0x24f),                 'RPdoc': function (_0x128d10, _0x1d4491) {                     return _0x128d10 == _0x1d4491;                 },                 'moEoH': _0x35cb7e(0x28a),                 'UpzSs': _0x35cb7e(0x47d),                 'LQbck': _0x35cb7e(0x287),                 'pPYJZ': function (_0x178def, _0x1f29a4) {                     return _0x178def == _0x1f29a4;                 },                 'fjOZV': function (_0x1a71a8, _0x531d97) {                     return _0x1a71a8 == _0x531d97;                 },                 'LFFKh': _0x35cb7e(0x3df),                 'JVxvx': _0x35cb7e(0x58f),                 'oZdVz': _0x35cb7e(0x1fb),                 'jAnlr': _0x35cb7e(0x1a2),                 'neqnO': function (_0x21cd97, _0x2e666d) {                     return _0x21cd97 == _0x2e666d;                 },                 'PqBqH': _0x35cb7e(0x203),                 'GvXlq': function (_0x1725d0, _0x47890b) {                     return _0x1725d0 == _0x47890b;                 },                 'thfvH': _0x35cb7e(0x28d),                 'UyImD': function (_0x46e444, _0x170a20) {                     return _0x46e444 == _0x170a20;                 },                 'nlKwv': _0x35cb7e(0x641),                 'ilOhV': _0x35cb7e(0x1dc),                 'iDXma': _0x35cb7e(0x49b),                 'wWBlp': _0x35cb7e(0x61d),                 'yEfKd': _0x35cb7e(0x44b),                 'qNFTA': function (_0xd82ed2, _0x284b3a) {                     return _0xd82ed2 == _0x284b3a;                 },                 'nhxoI': _0x35cb7e(0x6b4),                 'bUAmf': _0x35cb7e(0x2b9),                 'DTqxq': _0x35cb7e(0x3c8),                 'OzDsD': _0x35cb7e(0x1a5),                 'hoauW': function (_0x35a201, _0x46b79f) {                     return _0x35a201 == _0x46b79f;                 },                 'EoVNS': _0x35cb7e(0x1d4),                 'JGqgT': function (_0x33623a, _0x2c1d9f) {                     return _0x33623a == _0x2c1d9f;                 },                 'HfRqo': _0x35cb7e(0x29b),                 'YlHQA': _0x35cb7e(0x311) + _0x35cb7e(0x59f) + _0x35cb7e(0x3ca) + _0x35cb7e(0x528) + _0x35cb7e(0x377),                 'pJzhc': function (_0x569b0e, _0x4316ea) {                     return _0x569b0e == _0x4316ea;                 },                 'ZPYqE': _0x35cb7e(0x39e),                 'gAMFc': function (_0x3c77f2, _0x147198) {                     return _0x3c77f2 == _0x147198;                 },                 'tFjey': _0x35cb7e(0x2f8),                 'Yzsya': function (_0x2c9de8, _0x251cca) {                     return _0x2c9de8 == _0x251cca;                 },                 'cJHkb': _0x35cb7e(0x4f9),                 'pVDRP': function (_0xd15e59, _0x58e142) {                     return _0xd15e59 == _0x58e142;                 },                 'DsvYs': _0x35cb7e(0x4c5),                 'BETLp': function (_0x303af7, _0x2a9ea4) {                     return _0x303af7 == _0x2a9ea4;                 },                 'xLORn': _0x35cb7e(0x58c),                 'HytPB': function (_0x3f65f3, _0x331f9e) {                     return _0x3f65f3 == _0x331f9e;                 },                 'iYtoZ': _0x35cb7e(0x512),                 'MKWkl': _0x35cb7e(0x18e),                 'ezhgb': _0x35cb7e(0x4c4),                 'mdldK': function (_0x23be71, _0x3ff8ac) {                     return _0x23be71 == _0x3ff8ac;                 },                 'fjTxM': _0x35cb7e(0x24a),                 'ReZyN': function (_0x43405a, _0x5702fa) {                     return _0x43405a == _0x5702fa;                 },                 'sstYx': _0x35cb7e(0x50f),                 'bCsiB': function (_0x4fa419, _0x180a62) {                     return _0x4fa419 == _0x180a62;                 },                 'eVuRK': _0x35cb7e(0x593),                 'aRgHL': _0x35cb7e(0x3c0),                 'pyVau': _0x35cb7e(0x476),                 'VPZCB': _0x35cb7e(0x1a4),                 'mfeGH': _0x35cb7e(0x4a8),                 'ugMWM': _0x35cb7e(0x398),                 'WfdUd': function (_0x11ff71, _0x1c6af2) {                     return _0x11ff71 == _0x1c6af2;                 },                 'aJDYg': _0x35cb7e(0x53e),                 'QFIyw': _0x35cb7e(0x590),                 'IbDOZ': _0x35cb7e(0x3e8),                 'XBLxR': _0x35cb7e(0x34d),                 'FqNZM': function (_0x31950d, _0xf600ef) {                     return _0x31950d == _0xf600ef;                 },                 'pFqbh': _0x35cb7e(0x443),                 'QFHfE': _0x35cb7e(0x3a3),                 'xmXse': _0x35cb7e(0x513),                 'DVpqo': _0x35cb7e(0x5d4),                 'rQEJH': _0x35cb7e(0x5b3),                 'hUMob': function (_0x9e7943, _0x20fa6c) {                     return _0x9e7943 == _0x20fa6c;                 },                 'Pjrfj': _0x35cb7e(0x1bd),                 'Teelo': _0x35cb7e(0x692),                 'ZDxcc': _0x35cb7e(0x61c),                 'WyipS': _0x35cb7e(0x283),                 'uNVHG': _0x35cb7e(0x6b8),                 'VBfZb': _0x35cb7e(0x5b1),                 'fNAco': function (_0xcf1839, _0x541033) {                     return _0xcf1839 == _0x541033;                 },                 'NEPTD': _0x35cb7e(0x544),                 'IYvRL': _0x35cb7e(0x5f8),                 'ZBYiC': function (_0x40dffa, _0x4a3765) {                     return _0x40dffa == _0x4a3765;                 },                 'LxiZj': function (_0x1c4642, _0x10f8a6) {                     return _0x1c4642 == _0x10f8a6;                 },                 'bdSsc': function (_0x14cfd2, _0x476ef1) {                     return _0x14cfd2 == _0x476ef1;                 },                 'qLume': function (_0x269aaa, _0x5e0eb3) {                     return _0x269aaa == _0x5e0eb3;                 },                 'skFLP': _0x35cb7e(0x3bc),                 'YviRd': function (_0x3c9acd, _0x79c31b) {                     return _0x3c9acd == _0x79c31b;                 },                 'NTiPu': function (_0x2ddf5d, _0x23d8bd) {                     return _0x2ddf5d == _0x23d8bd;                 },                 'EUhfr': function (_0x42ac41, _0x5c8a2c) {                     return _0x42ac41 == _0x5c8a2c;                 },                 'nqNeC': _0x35cb7e(0x1d6),                 'ueWJc': function (_0x10c36e, _0x5cea75) {                     return _0x10c36e - _0x5cea75;                 },                 'KZRDH': function (_0x27550c, _0x3ea151, _0x43ff94) {                     return _0x27550c(_0x3ea151, _0x43ff94);                 },                 'btUmV': _0x35cb7e(0x5b9),                 'ECzWZ': _0x35cb7e(0x1c9) + _0x35cb7e(0x413),                 'GcctO': function (_0x253541, _0x5932e8) {                     return _0x253541 == _0x5932e8;                 },                 'CssDF': function (_0x2a12c8, _0x407d31) {                     return _0x2a12c8 == _0x407d31;                 },                 'bjzuR': function (_0x328b94, _0x15f32a) {                     return _0x328b94 == _0x15f32a;                 },                 'DFPbQ': function (_0x3f578c, _0x674326) {                     return _0x3f578c == _0x674326;                 },                 'PuwRM': function (_0x2a2ba9, _0x109cbb) {                     return _0x2a2ba9 == _0x109cbb;                 }             };         if (_0x1e521f[_0x35cb7e(0x1f9)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x305)]))             _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](-0xcef + 0x488 + 0x871, 0x13c4 + -0x259 * 0x7 + -0x34b, 0x174 * -0x2 + -0x2b3 * 0xd + 0x2609), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x32 * -0x69 + 0x190e + -0xa4;         else {             if (_0x1e521f[_0x35cb7e(0x5aa)](_0x1b541f[_0x35cb7e(0x6b9)], '报警'))                 _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0xd52 + -0x1b45 + 0xdfd, -0x17f6 * 0x1 + 0x16 * -0x25 + 0x31 * 0x8e, -0x16 * -0xa7 + 0x193c + 0x4 * -0x9e3), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x87b + -0x3 * -0xc6d + -0x29da;             else {                 if (_0x1e521f[_0x35cb7e(0x68e)](_0x1b541f[_0x35cb7e(0x6b9)], '草坪'))                     _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0x2 * -0xd69 + -0x24a4 + 0x3f80, -0x2 * -0x832 + -0x1eac + 0xe52, -0x116 * -0x1c + -0x1096 + -0xdc8), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0xff6 + 0x1d2d + -0x83f * 0x5;                 else {                     if (_0x1e521f[_0x35cb7e(0x589)](_0x1b541f[_0x35cb7e(0x6b9)], '地面'))                         _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](-0x1 * 0x16f7 + 0x15f3 + 0x10e, -0x5 * 0x6d6 + -0xa0b * 0x3 + 0x11 * 0x3c9, 0xc70 * -0x2 + -0x5e * -0xc + 0x4b * 0x46), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x7 * -0x229 + -0x11c4 + 0x24cb;                     else {                         if (_0x1e521f[_0x35cb7e(0x3c7)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x637)]))                             _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0x1 * 0xe49 + -0x2 * -0x1287 + 0x334d * -0x1, -0x851 * -0x2 + 0x1 * -0x2202 + 0x116a, -0x1 * 0xfb5 + 0xd38 + 0x287 * 0x1), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x25da + -0x7ca + 0x2e8 * -0x9;                         else {                             if (_0x1e521f[_0x35cb7e(0x539)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x387)]))                                 _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0x214e + -0x1ea5 + -0x29f, 0x1f58 + -0x3 * -0x199 + 0x2419 * -0x1, -0x2394 + -0xd08 + 0x30a6), _0x1b541f[_0x35cb7e(0x1e5)] = ![], _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x206 * 0xd + 0x181c + -0x2e82, locationFloor = _0x1b541f;                             else {                                 if (_0x1e521f[_0x35cb7e(0x1b6)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x2d0)]))                                     _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0x947 + -0x973 + -0x1 * -0x36, -0x1 * -0xc8 + -0x1d * -0x115 + -0x201f * 0x1, 0x1 * 0x121f + -0x1b57 + 0x942), _0x1b541f[_0x35cb7e(0x59c)]['y'] = -0x1b12 + -0x5 * -0x1a3 + -0x1 * -0x16cb, duishichang1Room = _0x1b541f, allRoomObjs[_0x35cb7e(0x1fd)](_0x1b541f);                                 else {                                     if (_0x1e521f[_0x35cb7e(0x5d6)](_0x1b541f[_0x35cb7e(0x6b9)], '管道'))                                         _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0xeb4 + -0x22a6 + 0x2 * 0x9fe, 0xdea + -0xa34 * 0x1 + -0x3ac, 0x16a0 + 0x1a3 * -0x14 + 0xa26), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x1f09 + -0x4ec + -0x1635, GDmodel = _0x1b541f, _0x1b541f[_0x35cb7e(0x2b2)](_0x2d7c09 => {                                             const _0x28ca68 = _0x35cb7e, _0x486595 = {                                                     'dnjVq': function (_0x27b7a0, _0x4c9a58) {                                                         const _0x32063e = _0x4cd6;                                                         return _0x1e521f[_0x32063e(0x4ca)](_0x27b7a0, _0x4c9a58);                                                     },                                                     'vCexk': _0x1e521f[_0x28ca68(0x6ba)],                                                     'eKkKR': function (_0xba27fe, _0x33d5a5) {                                                         const _0x59750c = _0x28ca68;                                                         return _0x1e521f[_0x59750c(0x4ca)](_0xba27fe, _0x33d5a5);                                                     },                                                     'zoVyT': _0x1e521f[_0x28ca68(0x6c6)],                                                     'yoQhr': function (_0x1e28cd, _0x72c4c2) {                                                         const _0x4efc93 = _0x28ca68;                                                         return _0x1e521f[_0x4efc93(0x19f)](_0x1e28cd, _0x72c4c2);                                                     },                                                     'ydkDx': _0x1e521f[_0x28ca68(0x1ee)],                                                     'LwcEn': function (_0x302825, _0x2cd2ea) {                                                         const _0x530b6a = _0x28ca68;                                                         return _0x1e521f[_0x530b6a(0x559)](_0x302825, _0x2cd2ea);                                                     },                                                     'uYEdO': _0x1e521f[_0x28ca68(0x5f4)],                                                     'zsCsd': function (_0x1461e6, _0x1e171b) {                                                         const _0x4d5b37 = _0x28ca68;                                                         return _0x1e521f[_0x4d5b37(0x39d)](_0x1461e6, _0x1e171b);                                                     },                                                     'MJtcp': _0x1e521f[_0x28ca68(0x3f5)],                                                     'yUTxH': function (_0x27006c, _0xd665ff) {                                                         const _0x5a0236 = _0x28ca68;                                                         return _0x1e521f[_0x5a0236(0x19f)](_0x27006c, _0xd665ff);                                                     },                                                     'pejRn': _0x1e521f[_0x28ca68(0x1e4)],                                                     'sazLO': function (_0x573be1, _0x3f9920) {                                                         const _0x11686 = _0x28ca68;                                                         return _0x1e521f[_0x11686(0x45b)](_0x573be1, _0x3f9920);                                                     },                                                     'KSRol': _0x1e521f[_0x28ca68(0x5fa)],                                                     'cZmDM': function (_0x56eda5, _0x346548) {                                                         const _0x5c9dc8 = _0x28ca68;                                                         return _0x1e521f[_0x5c9dc8(0x50c)](_0x56eda5, _0x346548);                                                     },                                                     'ANxnR': _0x1e521f[_0x28ca68(0x221)],                                                     'wPaVU': _0x1e521f[_0x28ca68(0x3af)],                                                     'XqVlk': _0x1e521f[_0x28ca68(0x5ce)],                                                     'pYetd': function (_0x2f1fad, _0x6cb842) {                                                         const _0x3f93ae = _0x28ca68;                                                         return _0x1e521f[_0x3f93ae(0x45b)](_0x2f1fad, _0x6cb842);                                                     },                                                     'BzgyU': _0x1e521f[_0x28ca68(0x1d3)],                                                     'EmYeA': _0x1e521f[_0x28ca68(0x51b)],                                                     'kSfPP': function (_0x35176b, _0x25fa24) {                                                         const _0xace468 = _0x28ca68;                                                         return _0x1e521f[_0xace468(0x45b)](_0x35176b, _0x25fa24);                                                     },                                                     'XFwCW': _0x1e521f[_0x28ca68(0x370)]                                                 };                                             _0x1e521f[_0x28ca68(0x4ca)](_0x2d7c09[_0x28ca68(0x269)], _0x1e521f[_0x28ca68(0x60a)]) && (_0x1e521f[_0x28ca68(0x1ce)](_0x2d7c09[_0x28ca68(0x6b9)], '管道') && _0x2d7c09[_0x28ca68(0x2b2)](_0x92dea => {                                                 const _0x46b2e9 = _0x28ca68;                                                 if (_0x486595[_0x46b2e9(0x3bd)](_0x92dea[_0x46b2e9(0x6b9)], _0x486595[_0x46b2e9(0x582)]))                                                     GDoutboxYSKQ = _0x92dea;                                                 else {                                                     if (_0x486595[_0x46b2e9(0x3bd)](_0x92dea[_0x46b2e9(0x6b9)], '水管'))                                                         GDoutboxSG = _0x92dea;                                                     else {                                                         if (_0x486595[_0x46b2e9(0x578)](_0x92dea[_0x46b2e9(0x6b9)], _0x486595[_0x46b2e9(0x497)]))                                                             GDoutboxSS = _0x92dea;                                                         else {                                                             if (_0x486595[_0x46b2e9(0x533)](_0x92dea[_0x46b2e9(0x6b9)], _0x486595[_0x46b2e9(0x5bb)]))                                                                 GDoutboxLZFJ = _0x92dea;                                                             else {                                                                 if (_0x486595[_0x46b2e9(0x603)](_0x92dea[_0x46b2e9(0x6b9)], _0x486595[_0x46b2e9(0x55b)]))                                                                     GDoutboxDQ = _0x92dea;                                                                 else {                                                                     if (_0x486595[_0x46b2e9(0x4c9)](_0x92dea[_0x46b2e9(0x6b9)], _0x486595[_0x46b2e9(0x1d7)]))                                                                         GDoutboxCXFFJ = _0x92dea;                                                                     else                                                                         (_0x486595[_0x46b2e9(0x451)](_0x92dea[_0x46b2e9(0x6b9)], _0x486595[_0x46b2e9(0x652)]) || _0x486595[_0x46b2e9(0x5d5)](_0x92dea[_0x46b2e9(0x6b9)], _0x486595[_0x46b2e9(0x214)])) && GDotherBox[_0x46b2e9(0x1fd)](_0x92dea);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }), _0x1e521f[_0x28ca68(0x50c)](_0x2d7c09[_0x28ca68(0x6b9)], _0x1e521f[_0x28ca68(0x59b)]) && (_0x2d7c09[_0x28ca68(0x1e5)] = ![], _0x2d7c09[_0x28ca68(0x2b2)](_0x762d8a => {                                                 const _0x2fb5cb = _0x28ca68;                                                 if (_0x486595[_0x2fb5cb(0x3c4)](_0x762d8a[_0x2fb5cb(0x6b9)], _0x486595[_0x2fb5cb(0x4d9)]))                                                     GDmovingCXFFJ = _0x762d8a;                                                 else {                                                     if (_0x486595[_0x2fb5cb(0x533)](_0x762d8a[_0x2fb5cb(0x6b9)], _0x486595[_0x2fb5cb(0x4e6)]))                                                         GDmovingSS = _0x762d8a;                                                     else {                                                         if (_0x486595[_0x2fb5cb(0x451)](_0x762d8a[_0x2fb5cb(0x6b9)], _0x486595[_0x2fb5cb(0x284)]))                                                             GDmovingLZFJ = _0x762d8a;                                                         else {                                                             if (_0x486595[_0x2fb5cb(0x626)](_0x762d8a[_0x2fb5cb(0x6b9)], _0x486595[_0x2fb5cb(0x293)]))                                                                 GDmovingYSKQ = _0x762d8a;                                                             else {                                                                 if (_0x486595[_0x2fb5cb(0x3c4)](_0x762d8a[_0x2fb5cb(0x6b9)], _0x486595[_0x2fb5cb(0x581)]))                                                                     GDmovingSG = _0x762d8a;                                                                 else                                                                     _0x486595[_0x2fb5cb(0x374)](_0x762d8a[_0x2fb5cb(0x6b9)], _0x486595[_0x2fb5cb(0x33f)]) && (GDmovingDQ = _0x762d8a);                                                             }                                                         }                                                     }                                                 }                                                 _0x762d8a[_0x2fb5cb(0x1d8)] && (_0x762d8a[_0x2fb5cb(0x2b3)][_0x2fb5cb(0x268)] = null, _0x762d8a[_0x2fb5cb(0x2b3)][_0x2fb5cb(0x4b4) + 't'] = !![], _0x762d8a[_0x2fb5cb(0x2b3)][_0x2fb5cb(0x277)] = ![], _0x762d8a[_0x2fb5cb(0x21f) + 'r'] = 0x1888 + 0x1 * 0xf89 + -0x2041);                                             })));                                         });                                     else {                                         if (_0x1e521f[_0x35cb7e(0x37f)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x258)]))                                             _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0x1d4a + 0xbf1 + -0xb9 * 0x39, 0x7 * 0x2b7 + -0x621 + -0xcd6, 0xfc * 0x1e + -0x1128 + 0x62b * -0x2), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x11da + 0x685 + -0x1f * 0xa9, junhuaRoom = _0x1b541f, allRoomObjs[_0x35cb7e(0x1fd)](_0x1b541f);                                         else {                                             if (_0x1e521f[_0x35cb7e(0x286)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x1e0)])) {                                                 const _0x3f7608 = _0x1e521f[_0x35cb7e(0x606)][_0x35cb7e(0x3ea)]('|');                                                 let _0x1180c2 = -0x19b2 + -0x158b + -0x1a1 * -0x1d;                                                 while (!![]) {                                                     switch (_0x3f7608[_0x1180c2++]) {                                                     case '0':                                                         _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x5 * -0xb7 + -0x88 + 0x7 * 0x125;                                                         continue;                                                     case '1':                                                         limoRoom = _0x1b541f;                                                         continue;                                                     case '2':                                                         _0x1b541f[_0x35cb7e(0x2b2)](_0x326258 => {                                                             const _0x13ddd1 = _0x35cb7e;                                                             _0x1e521f[_0x13ddd1(0x382)](_0x326258[_0x13ddd1(0x269)], _0x1e521f[_0x13ddd1(0x60a)]) && (_0x1e521f[_0x13ddd1(0x382)](_0x326258[_0x13ddd1(0x6b9)], _0x1e521f[_0x13ddd1(0x5d9)]) && (_0x326258[_0x13ddd1(0x1e5)] = ![]));                                                         });                                                         continue;                                                     case '3':                                                         allRoomObjs[_0x35cb7e(0x1fd)](_0x1b541f);                                                         continue;                                                     case '4':                                                         _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](-0x226e * 0x1 + 0x136 * -0x20 + 0x4938, -0x619 * 0x1 + -0x5dd * -0x1 + 0x46, 0xc91 * 0x1 + 0x1c76 + -0x28fd);                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x1e521f[_0x35cb7e(0x1be)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x5d9)])) {                                                     moveingRobot = _0x1b541f, _0x1b541f[_0x35cb7e(0x33a)][_0x35cb7e(0x6d6)] = 0x1 * -0x2dd + -0x7ad * -0x5 + 0x1 * -0x2383, _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0x1f23 * -0x1 + -0x13 * 0x95 + -0x22 * -0x13e, -0x25 * -0xb + -0x173b + 0x15ae, -0xb79 + 0x21d + -0x191 * -0x6), _0x1b541f[_0x35cb7e(0x59c)][_0x35cb7e(0x231)](-(0x16 * -0x49 + 0x1cc9 * -0x1 + -0x47 * -0xab + 0.6799999999998363), _0x1e521f[_0x35cb7e(0x41f)](-0x419 + -0x8f * 0x35 + 0x228a + 0.6399999999999864, -0x62d * -0x1 + 0x1679 + -0x1ca3 + 0.33000000000000007), -(-0x2 * 0x3a9 + -0x1a63 + 0x2795 + 0.029999999999972715)), _0x1b541f[_0x35cb7e(0x5b7)](-(0x5 * 0x38f + -0x1b1 + 0x4 * -0xc4 + 0.21000000000003638), _0x1e521f[_0x35cb7e(0x2d8)](-0x2dd * -0x1 + -0x4 * 0xb1 + 0x3 * 0x3f + 0.6399999999999864, -0x7b * 0x3b + -0x1279 + 0x2ed5 + 0.33000000000000007), -(0x13d5 * -0x1 + 0xe3 * 0x14 + 0x7f8 + 0.9500000000000455));                                                     let _0x58f8e0 = new THREE[(_0x35cb7e(0x3eb)) + (_0x35cb7e(0x274))](0x84a * -0x4 + 0xcb6 + 0x1473, 0x1baf + 0x8e0 + -0x248e), _0x4e681b = new THREE[(_0x35cb7e(0x473)) + (_0x35cb7e(0x32a))]({                                                             'color': 0xffff00,                                                             'side': THREE[_0x35cb7e(0x19e)]                                                         }), _0x2ceac0 = new THREE[(_0x35cb7e(0x3cd))](_0x58f8e0, _0x4e681b);                                                     _0x2ceac0[_0x35cb7e(0x6b9)] = _0x1e521f[_0x35cb7e(0x191)], _0x2ceac0[_0x35cb7e(0x59c)][_0x35cb7e(0x231)](-0x4c7 * -0x4 + -0x1e38 + 0x103 * 0xb, 0x228 + -0xe3f + 0xc1f, 0x762 + 0x9f * -0x2 + -0x624), _0x2ceac0[_0x35cb7e(0x1e5)] = ![], _0x1b541f[_0x35cb7e(0x5ff)](_0x2ceac0);                                                     let _0x53dc82 = _0x1e521f[_0x35cb7e(0x23e)](makeTextSprite, _0x1e521f[_0x35cb7e(0x402)], {                                                         'fontsize': 0x14,                                                         'borderColor': {                                                             'r': 0xff,                                                             'g': 0x0,                                                             'b': 0x0,                                                             'a': 0.4                                                         },                                                         'backgroundColor': {                                                             'r': 0xff,                                                             'g': 0xff,                                                             'b': 0xff,                                                             'a': 0.9                                                         },                                                         'size': [                                                             0x2a3 + -0x674 + 0x3d2,                                                             0x133c + -0x1ae + -0x118d + 0.5                                                         ]                                                     });                                                     _0x53dc82[_0x35cb7e(0x646)] = new THREE[(_0x35cb7e(0x4fd))](0x26dc + 0x57c + 0x204 * -0x16 + 0.5, 0x26b3 + -0x69d * -0x4 + 0x3e * -0x10d), _0x53dc82[_0x35cb7e(0x59c)][_0x35cb7e(0x231)](-0x1 * -0x215f + -0xe3 + -0x207c, -0x1 * -0x1bfd + 0xace + -0x1 * 0x26ca + 0.19999999999999996, -0xce3 + -0x16f7 + -0x2c2 * -0xd), _0x53dc82[_0x35cb7e(0x6b9)] = _0x1e521f[_0x35cb7e(0x366)], _0x1b541f[_0x35cb7e(0x5ff)](_0x53dc82), allRoomObjs[_0x35cb7e(0x1fd)](_0x1b541f);                                                 } else {                                                     if (_0x1e521f[_0x35cb7e(0x53d)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x4ec)]))                                                         _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](-0x43 * 0x59 + -0x1 * -0x1b70 + -0x41b, -0x2a9 * 0x7 + -0x1080 + 0x2329, -0x1a78 + -0x455 + 0x5 * 0x62b), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x11d * -0x1d + 0x1f45 + 0x8c * 0x9, posuiRoom = _0x1b541f, allRoomObjs[_0x35cb7e(0x1fd)](_0x1b541f);                                                     else {                                                         if (_0x1e521f[_0x35cb7e(0x396)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x2ce)]))                                                             _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](-0xb05 + -0x1bbf * -0x1 + 0x10b * -0x10, -0x7 * 0x3df + -0x52b + -0x5 * -0x676, -0x13af + -0xfb5 + 0x716 * 0x5), _0x1b541f[_0x35cb7e(0x59c)]['y'] = -0xe25 * 0x2 + 0x15f9 + -0xa39 * -0x1, shaifenRoom = _0x1b541f, allRoomObjs[_0x35cb7e(0x1fd)](_0x1b541f);                                                         else {                                                             if (_0x1e521f[_0x35cb7e(0x25a)](_0x1b541f[_0x35cb7e(0x6b9)], '树'))                                                                 _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0x295 * 0x7 + -0x1143 + 0x63 * -0x2, -0x26b * 0xb + 0x18b9 + 0x5 * 0x62, -0x1946 * -0x1 + -0xaae * 0x2 + -0x3e0), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0x15b5 + 0x17d4 + -0x29a1;                                                             else {                                                                 if (_0x1e521f[_0x35cb7e(0x5aa)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x37d)]))                                                                     _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](0xda2 * 0x1 + 0xb26 * -0x2 + 0x22d * 0x4, 0x3 * 0x6ed + -0x4dc * 0x1 + -0xfe1, 0x1 * -0x18b3 + 0x367 + -0x1556 * -0x1), _0x1b541f[_0x35cb7e(0x1e5)] = ![], _0x1b541f[_0x35cb7e(0x59c)]['y'] = -0x1ed0 + 0xab + 0x17b * 0x17, fourColorPic = _0x1b541f;                                                                 else {                                                                     if (_0x1e521f[_0x35cb7e(0x490)](_0x1b541f[_0x35cb7e(0x6b9)], _0x1e521f[_0x35cb7e(0x671)]))                                                                         _0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](-0xb * -0x314 + 0xcb * -0x2 + 0x101e * -0x2, 0x435 * -0x5 + 0x1 * 0x11d2 + 0x341, 0x2421 + -0x3d * 0x60 + -0xd37 * 0x1), _0x1b541f[_0x35cb7e(0x59c)]['y'] = 0xb * -0x385 + 0x361 + 0x273e, suishiRoom = _0x1b541f, allRoomObjs[_0x35cb7e(0x1fd)](_0x1b541f);                                                                     else                                                                         _0x1e521f[_0x35cb7e(0x2ba)](_0x1b541f[_0x35cb7e(0x6b9)], '车') && (_0x1b541f[_0x35cb7e(0x64c)][_0x35cb7e(0x231)](-0x1b2c + -0x1 * 0x1445 + 0x8f * 0x55, 0x1 * -0x26b4 + 0x13 * 0x9d + -0x1b17 * -0x1, -0x40 * -0x61 + -0x5 * 0x699 + 0x8c7), _0x1b541f[_0x35cb7e(0x59c)][_0x35cb7e(0x231)](-(-0x1142 + 0x5d + 0x801 * 0x3 + 0.9900000000000091), -0x1 * -0x941 + -0x1 * -0x265a + -0x2ef1 * 0x1, -(0xa0e + -0x262c + 0x24d2 + 0.42000000000007276)), _0x1b541f[_0x35cb7e(0x1e5)] = ![], carMesh = _0x1b541f);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 }             }         }         _0x1b541f[_0x35cb7e(0x2b2)](_0x4b9050 => {             const _0x342bca = _0x35cb7e, _0x5e7bb3 = {                     'DjBoE': function (_0x160e91, _0x9e7d03) {                         const _0x100f09 = _0x4cd6;                         return _0x1e521f[_0x100f09(0x61b)](_0x160e91, _0x9e7d03);                     },                     'MQNIK': _0x1e521f[_0x342bca(0x1ec)],                     'nFWnL': _0x1e521f[_0x342bca(0x22a)],                     'bSDMv': function (_0x10eef4, _0x47404a) {                         const _0x42eb85 = _0x342bca;                         return _0x1e521f[_0x42eb85(0x3f9)](_0x10eef4, _0x47404a);                     },                     'Sgbte': _0x1e521f[_0x342bca(0x298)],                     'JnIWK': _0x1e521f[_0x342bca(0x18d)],                     'wJfHC': _0x1e521f[_0x342bca(0x383)],                     'gtVTk': function (_0x46dba9, _0x4ca7f6) {                         const _0x3d8ec4 = _0x342bca;                         return _0x1e521f[_0x3d8ec4(0x6dc)](_0x46dba9, _0x4ca7f6);                     },                     'YQHFH': _0x1e521f[_0x342bca(0x6d7)],                     'KNyEl': _0x1e521f[_0x342bca(0x6d1)],                     'octwv': function (_0x24b02e, _0x1c9226) {                         const _0x159f99 = _0x342bca;                         return _0x1e521f[_0x159f99(0x39d)](_0x24b02e, _0x1c9226);                     },                     'KLRLG': _0x1e521f[_0x342bca(0x239)],                     'CLtOw': _0x1e521f[_0x342bca(0x60c)],                     'tzOuV': function (_0xc556b0, _0x3cac0f) {                         const _0x2084ad = _0x342bca;                         return _0x1e521f[_0x2084ad(0x655)](_0xc556b0, _0x3cac0f);                     },                     'favrA': _0x1e521f[_0x342bca(0x4a1)],                     'MrmNW': _0x1e521f[_0x342bca(0x2b0)],                     'cfVzS': function (_0x33d3c7, _0x2f2d78) {                         const _0x5e54db = _0x342bca;                         return _0x1e521f[_0x5e54db(0x655)](_0x33d3c7, _0x2f2d78);                     },                     'CCVLq': _0x1e521f[_0x342bca(0x304)],                     'IgvUO': _0x1e521f[_0x342bca(0x220)],                     'leBDs': function (_0x10ed99, _0x32d320) {                         const _0x145d67 = _0x342bca;                         return _0x1e521f[_0x145d67(0x39d)](_0x10ed99, _0x32d320);                     },                     'tPIzE': _0x1e521f[_0x342bca(0x54f)],                     'BNcyN': _0x1e521f[_0x342bca(0x2cc)],                     'NhTDh': function (_0x2a2610, _0x5618ad) {                         const _0x3ada9e = _0x342bca;                         return _0x1e521f[_0x3ada9e(0x420)](_0x2a2610, _0x5618ad);                     },                     'PNaKA': _0x1e521f[_0x342bca(0x562)],                     'LXVNc': _0x1e521f[_0x342bca(0x56b)],                     'SVpbO': function (_0x101f32, _0x24657d) {                         const _0x3ea1da = _0x342bca;                         return _0x1e521f[_0x3ea1da(0x4d5)](_0x101f32, _0x24657d);                     },                     'KbJIa': _0x1e521f[_0x342bca(0x299)],                     'CCaSx': _0x1e521f[_0x342bca(0x6bf)],                     'NvoSe': _0x1e521f[_0x342bca(0x409)],                     'bVBYb': _0x1e521f[_0x342bca(0x536)],                     'EhQJK': _0x1e521f[_0x342bca(0x3ee)],                     'OcqhI': _0x1e521f[_0x342bca(0x1a3)],                     'KOWHI': _0x1e521f[_0x342bca(0x634)],                     'lIQpj': _0x1e521f[_0x342bca(0x3cc)],                     'OWmpb': _0x1e521f[_0x342bca(0x2ad)],                     'iUqNP': _0x1e521f[_0x342bca(0x64b)]                 };             if (_0x4b9050[_0x342bca(0x1d8)]) {                 _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x2ae)]) && (_0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x4b4) + 't'] = !![], _0x4b9050[_0x342bca(0x21f) + 'r'] = -0x2f * 0x13 + 0x2029 * 0x1 + -0x6f9 * 0x4);                 if (_0x1e521f[_0x342bca(0x57e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x65e)]) || _0x1e521f[_0x342bca(0x655)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3ed)]) || _0x1e521f[_0x342bca(0x334)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3d3)]) || _0x1e521f[_0x342bca(0x64e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6a6)]) || _0x1e521f[_0x342bca(0x3ae)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x53f)]) || _0x1e521f[_0x342bca(0x6dc)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4aa)]) || _0x1e521f[_0x342bca(0x45b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x503)]) || _0x1e521f[_0x342bca(0x57e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x354)]) || _0x1e521f[_0x342bca(0x6ab)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x457)]))                     _0x4b9050[_0x342bca(0x6ca) + _0x342bca(0x42b)] = ![];                 else {                     if (_0x1e521f[_0x342bca(0x333)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x693)]) || _0x1e521f[_0x342bca(0x382)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x238)])) {                         const _0x3bebf1 = _0x1e521f[_0x342bca(0x378)][_0x342bca(0x3ea)]('|');                         let _0x1abe66 = -0x5d0 * -0x2 + 0xe50 + -0x1 * 0x19f0;                         while (!![]) {                             switch (_0x3bebf1[_0x1abe66++]) {                             case '0':                                 _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x4b4) + 't'] = !![];                                 continue;                             case '1':                                 _0x4b9050[_0x342bca(0x6bb)] = ![];                                 continue;                             case '2':                                 _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x601)] = -0x62 * 0x17 + 0x215b + -0x5 * 0x4e9 + 0.5;                                 continue;                             case '3':                                 _0x4b9050[_0x342bca(0x6ca) + _0x342bca(0x42b)] = ![];                                 continue;                             case '4':                                 _0x4b9050[_0x342bca(0x21f) + 'r'] = -0x1 * -0x146e + -0x1047 + -0x2e7;                                 continue;                             }                             break;                         }                     } else {                         if (_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x1b1)]))                             _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x2e2)] = -0xd * 0xc7 + 0x1c * 0x15a + 0x93f * -0x3, _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x37a)] = -0x34 * -0x6a + -0x1885 + 0x2fd + 0.3;                         else {                             if (_0x1e521f[_0x342bca(0x523)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3fc)]))                                 _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x4b4) + 't'] = !![], _0x4b9050[_0x342bca(0x21f) + 'r'] = 0x1 * 0x1fee + -0x1535 + -0x96f;                             else                                 (_0x1e521f[_0x342bca(0x45b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6bd)]) || _0x1e521f[_0x342bca(0x27b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5c6)])) && (_0x4b9050[_0x342bca(0x1e5)] = ![]);                         }                     }                 }                 if (_0x1e521f[_0x342bca(0x2bb)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x37d)])) {                     const _0x29609a = _0x1e521f[_0x342bca(0x378)][_0x342bca(0x3ea)]('|');                     let _0x2a4a4a = 0xc * -0x1c1 + 0x3 * -0x92f + 0x3099;                     while (!![]) {                         switch (_0x29609a[_0x2a4a4a++]) {                         case '0':                             _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x282)]) ? _0x4b9050[_0x342bca(0x21f) + 'r'] = 0xeee + -0x22c8 + 0x1510 : _0x4b9050[_0x342bca(0x21f) + 'r'] = -0x107 * -0x11 + -0x110d + 0xc2;                             continue;                         case '1':                             _0x4b9050[_0x342bca(0x6ca) + _0x342bca(0x42b)] = ![];                             continue;                         case '2':                             _0x1e521f[_0x342bca(0x55e)](setOpacityMaterial, _0x4b9050);                             continue;                         case '3':                             _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x277)] = ![];                             continue;                         case '4':                             _0x4b9050[_0x342bca(0x6bb)] = ![];                             continue;                         }                         break;                     }                 } else {                     if (_0x1e521f[_0x342bca(0x559)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x305)])) {                         const _0x52d067 = _0x1e521f[_0x342bca(0x640)][_0x342bca(0x3ea)]('|');                         let _0x1e513c = -0x1d4e + -0x1 * 0x379 + 0x20c7;                         while (!![]) {                             switch (_0x52d067[_0x1e513c++]) {                             case '0':                                 _0x4b9050[_0x342bca(0x6bb)] = ![];                                 continue;                             case '1':                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x5c1) + 'ty'] = !![];                                 continue;                             case '2':                                 _0x4b9050[_0x342bca(0x1e5)] = ![];                                 continue;                             case '3':                                 container[_0x342bca(0x5d1)](_0x4b9050);                                 continue;                             case '4':                                 _0x4b9050[_0x342bca(0x6ca) + _0x342bca(0x42b)] = ![];                                 continue;                             case '5':                                 roadPlane[_0x342bca(0x1fd)](_0x4b9050);                                 continue;                             }                             break;                         }                     } else {                         if (_0x1e521f[_0x342bca(0x583)](_0x1b541f[_0x342bca(0x6b9)], '树'))                             _0x4b9050[_0x342bca(0x21f) + 'r'] = -0xb * 0x2bd + 0x1fb9 + -0x64;                         else                             (_0x1e521f[_0x342bca(0x441)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x637)]) || _0x1e521f[_0x342bca(0x6ab)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2d0)]) || _0x1e521f[_0x342bca(0x514)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x258)]) || _0x1e521f[_0x342bca(0x441)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1e0)]) || _0x1e521f[_0x342bca(0x64e)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4ec)]) || _0x1e521f[_0x342bca(0x2a7)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ce)]) || _0x1e521f[_0x342bca(0x5f6)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x671)])) && allOutSideBuild[_0x342bca(0x1fd)](_0x4b9050);                     }                 }                 (_0x1e521f[_0x342bca(0x255)](_0x1b541f[_0x342bca(0x6b9)], '草坪') || _0x1e521f[_0x342bca(0x381)](_0x1b541f[_0x342bca(0x6b9)], '地面')) && _0x1e521f[_0x342bca(0x1c2)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3fc)]) && _0x1e521f[_0x342bca(0x1c2)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x693)]) && _0x1e521f[_0x342bca(0x1c2)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x238)]) && (_0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x4b4) + 't'] = ![]);                 if (_0x1e521f[_0x342bca(0x483)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1e0)])) {                     if (_0x1e521f[_0x342bca(0x39d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x69b)]) || _0x1e521f[_0x342bca(0x483)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x22b)]) || _0x1e521f[_0x342bca(0x688)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x35f)]) || _0x1e521f[_0x342bca(0x442)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6a9)]) || _0x1e521f[_0x342bca(0x4ff)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x65d)]) || _0x1e521f[_0x342bca(0x2f4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x280)]) || _0x1e521f[_0x342bca(0x1ff)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x256)]) || _0x1e521f[_0x342bca(0x19f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x406)])) {                         if (_0x1e521f[_0x342bca(0x6d3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x22b)]))                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x545)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                 -(-0x249 + -0x214 + -0x1 * -0x13ac + 0.13000000000010914),                                 -0x6b * -0x11 + -0x25b1 + 0x1ed2 + 0.7000000000000028,                                 -(0xcb8 + 0x1b1e + -0x228b + 0.4700000000000273)                             ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                 -(0xbdd * -0x1 + -0x1c4 + -0x1 * -0x1c65 + 0.8220000000001164),                                 -0x4 * 0x727 + 0x1a * 0x13a + -0xe9 * 0x3 + 0.12569999999999482,                                 -(0xf3e + 0x551 + -0x11 * 0xe9 + 0.5217000000000098)                             ];                         else {                             if (_0x1e521f[_0x342bca(0x266)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x35f)]))                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x323)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                     -(0x2 * 0x441 + 0x1bfa + -0x159a + 0.09999999999990905),                                     0x3 * -0x657 + -0x657 + -0x1 * -0x1999 + 0.13000000000000256,                                     -(-0x943 + 0x1985 + -0xaf7 * 0x1 + 0.4700000000000273)                                 ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                     -(-0x11cf + -0x5 * -0x27c + -0xb5 * -0x1c + 0.09639999999990323),                                     0x1153 + 0x23d6 + -0x1 * 0x34ac + 0.747799999999998,                                     -(-0x1 * 0x24a6 + -0x181b + -0xdb * -0x4d + 0.08330000000000837)                                 ];                             else {                                 if (_0x1e521f[_0x342bca(0x5ef)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6a9)]))                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2b7)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(0x1b56 + -0x1578 + 0x897 + 0.40000000000009095),                                         0x7 * -0x3df + -0x1 * -0x13ce + 0x787 + 0.7000000000000028,                                         -(0xd * 0x266 + 0x2ce * -0x1 + 0x137 * -0x13 + 0.4700000000000273)                                     ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(0x952 + -0x174d + 0xe * 0x1ff + 0.17270000000007713),                                         -0x1af * 0x5 + -0x1 * -0x1c5e + -0x19 * 0xc7 + 0.37760000000000105,                                         -(-0xa0e + -0x7 * 0x79 + 0x127b + 0.06400000000007822)                                     ];                                 else {                                     if (_0x1e521f[_0x342bca(0x639)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x65d)]))                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x35c)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                             -(0x1704 + 0x1 * -0x1fd + 0x716 * -0x1 + 0.8000000000001819),                                             0x1794 + -0x12c8 + -0x490 + 0.759999999999998,                                             -(0x1 * 0x1271 + 0x1 * -0x1c68 + 0xf42 + 0.4700000000000273)                                         ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                             -(-0x3 * 0x6ac + -0xe * 0x182 + 0x368e + 0.4108000000001084),                                             0x41 * -0x12 + 0x6 * 0x267 + -0x952 * 0x1 + 0.29110000000000014,                                             -(0x43e + -0x1afc * -0x1 + -0x45 * 0x61 + 0.04680000000007567)                                         ];                                     else {                                         if (_0x1e521f[_0x342bca(0x39d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x280)]))                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x25d)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                 -(-0x2041 + -0x2120 + 0x276d * 0x2 + 0.23999999999978172),                                                 -0x1 * -0x185 + -0x13dd + 0x1295 + 0.240000000000002,                                                 -(-0x164b + -0xc7 * 0x11 + 0x28cd + 0.4700000000000273)                                             ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                 -(-0x1 * 0x95b + 0xd3 * 0x10 + 0x91f + 0.14550000000008367),                                                 0x2b * 0x61 + 0x2658 + -0x362a + 0.7939999999999969,                                                 -(-0xdf6 + 0x7c6 + 0xb51 + 0.615500000000111)                                             ];                                         else {                                             if (_0x1e521f[_0x342bca(0x456)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x256)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x1af)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                     -(-0x1e * -0x12e + 0x1fda + -0x3647 + 0.0500000000001819),                                                     0x2182 * -0x1 + -0x216d + -0x10cb * -0x4 + 0.5600000000000023,                                                     -(-0x18e * -0x2 + 0x162b + -0x9fe * 0x2 + 0.4700000000000273)                                                 ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                     -(-0xd7a * 0x1 + 0xe * 0xb + -0xd * -0x1f4 + 0.5981000000001586),                                                     0xc7e + 0x1ae3 + 0xcf7 * -0x3 + 0.6037000000000035,                                                     -(0x24c0 + 0x176d + -0x370c + 0.42249999999989996)                                                 ];                                             else                                                 _0x1e521f[_0x342bca(0x420)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x406)]) && (_0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x492)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                     -(-0x12bc + 0xded + 0x115a + 0.5300000000002001),                                                     0x249d + -0x12d0 + 0x464 * -0x4 + 0.5200000000000031,                                                     -(-0x22d0 + 0x2 * 0x89f + -0x3 * -0x79f + 0.4700000000000273)                                                 ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                     -(0x1 * 0x1884 + 0x18e8 + -0x255d + 0.7321000000001732),                                                     0x3 * -0x893 + 0x211b + -0x6e8 + 0.6145000000000067,                                                     -(0x171a + 0xa * 0x155 + -0x7d3 * 0x4 + 0.8221000000000913)                                                 ]);                                         }                                     }                                 }                             }                         }                         let _0x5c9db1 = _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x44d)](0x761 + -0x1c30 + 0x14d4 * 0x1, 0x234d + 0x20bf + -0x2203 * 0x2);                         _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x1f2)](_0x1e521f[_0x342bca(0x1bb)], _0x5c9db1), limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                     } else {                         if (_0x1e521f[_0x342bca(0x64e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5c4)]) || _0x1e521f[_0x342bca(0x456)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x504)]) || _0x1e521f[_0x342bca(0x24c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x18f)]) || _0x1e521f[_0x342bca(0x335)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x51a)]) || _0x1e521f[_0x342bca(0x382)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x462)]) || _0x1e521f[_0x342bca(0x583)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1a6)]) || _0x1e521f[_0x342bca(0x4ff)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5b4)]) || _0x1e521f[_0x342bca(0x4ca)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x64f)])) {                             let _0x497fbe = _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x44d)](-0x1 * 0xd4f + 0x3 * 0x3a + 0x4f * 0x29);                             _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x1f2)](_0x1e521f[_0x342bca(0x6c9)], _0x497fbe), limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                         } else {                             if (_0x1e521f[_0x342bca(0x58b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x465)]) || _0x1e521f[_0x342bca(0x679)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x222)]) || _0x1e521f[_0x342bca(0x333)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5c8)]) || _0x1e521f[_0x342bca(0x376)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3e7)]) || _0x1e521f[_0x342bca(0x381)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5d0)]) || _0x1e521f[_0x342bca(0x376)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x56a)]) || _0x1e521f[_0x342bca(0x559)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x411)]) || _0x1e521f[_0x342bca(0x3c7)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1fa)]) || _0x1e521f[_0x342bca(0x5c0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x66d)]) || _0x1e521f[_0x342bca(0x499)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x67c)])) {                                 const _0x382fd0 = _0x1e521f[_0x342bca(0x3ec)][_0x342bca(0x3ea)]('|');                                 let _0x30c8d0 = 0x11 * 0x107 + 0x333 + -0x14aa;                                 while (!![]) {                                     switch (_0x382fd0[_0x30c8d0++]) {                                     case '0':                                         _0x1e521f[_0x342bca(0x262)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3e7)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x67a)]);                                         continue;                                     case '1':                                         _0x1e521f[_0x342bca(0x38b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5c8)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x3a9)]);                                         continue;                                     case '2':                                         _0x1e521f[_0x342bca(0x3e2)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5d0)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x59a)]);                                         continue;                                     case '3':                                         limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                         continue;                                     case '4':                                         _0x1e521f[_0x342bca(0x442)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x411)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x3f8)]);                                         continue;                                     case '5':                                         _0x1e521f[_0x342bca(0x26c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x66d)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x1a7)]);                                         continue;                                     case '6':                                         _0x1e521f[_0x342bca(0x41b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x465)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x524)]);                                         continue;                                     case '7':                                         _0x1e521f[_0x342bca(0x340)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x222)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x296)]);                                         continue;                                     case '8':                                         _0x1e521f[_0x342bca(0x6ab)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1fa)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x3d0)]);                                         continue;                                     case '9':                                         _0x1e521f[_0x342bca(0x4b8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x67c)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x5c5)]);                                         continue;                                     case '10':                                         _0x1e521f[_0x342bca(0x650)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x56a)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x585)]);                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x1e521f[_0x342bca(0x50c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1f1)]) || _0x1e521f[_0x342bca(0x38d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x206)]) || _0x1e521f[_0x342bca(0x456)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x43b)]) || _0x1e521f[_0x342bca(0x52d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x25e)]) || _0x1e521f[_0x342bca(0x514)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1cb)]) || _0x1e521f[_0x342bca(0x52d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3b2)]) || _0x1e521f[_0x342bca(0x384)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x205)]) || _0x1e521f[_0x342bca(0x5c0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1ad)]) || _0x1e521f[_0x342bca(0x5ed)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1ed)]) || _0x1e521f[_0x342bca(0x66b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x560)]) || _0x1e521f[_0x342bca(0x514)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1f4)]) || _0x1e521f[_0x342bca(0x255)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x55d)]) || _0x1e521f[_0x342bca(0x42d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x62c)])) {                                     const _0x4bc910 = _0x1e521f[_0x342bca(0x2c5)][_0x342bca(0x3ea)]('|');                                     let _0xddfd69 = 0xe7 * -0x17 + 0x1bcd + -0x70c;                                     while (!![]) {                                         switch (_0x4bc910[_0xddfd69++]) {                                         case '0':                                             _0x1e521f[_0x342bca(0x499)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1cb)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x44e)]);                                             continue;                                         case '1':                                             _0x1e521f[_0x342bca(0x655)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x560)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x2db)]);                                             continue;                                         case '2':                                             limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                             continue;                                         case '3':                                             _0x1e521f[_0x342bca(0x421)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x205)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x3a5)]);                                             continue;                                         case '4':                                             _0x1e521f[_0x342bca(0x515)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x55d)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x200)]);                                             continue;                                         case '5':                                             _0x1e521f[_0x342bca(0x382)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x62c)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x43c)]);                                             continue;                                         case '6':                                             _0x1e521f[_0x342bca(0x414)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x206)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x5de)]);                                             continue;                                         case '7':                                             _0x1e521f[_0x342bca(0x47e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1f1)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x475)]);                                             continue;                                         case '8':                                             _0x1e521f[_0x342bca(0x384)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1ed)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x4f8)]);                                             continue;                                         case '9':                                             _0x1e521f[_0x342bca(0x56d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1f4)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x31b)]);                                             continue;                                         case '10':                                             _0x1e521f[_0x342bca(0x441)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3b2)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x2f9)]);                                             continue;                                         case '11':                                             _0x1e521f[_0x342bca(0x4c7)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x25e)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x32b)]);                                             continue;                                         case '12':                                             _0x1e521f[_0x342bca(0x47e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x43b)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x3ba)]);                                             continue;                                         case '13':                                             _0x1e521f[_0x342bca(0x595)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1ad)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x1fe)]);                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x1e521f[_0x342bca(0x348)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x52b)]) || _0x1e521f[_0x342bca(0x5ef)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5d3)]) || _0x1e521f[_0x342bca(0x6d3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5c7)]) || _0x1e521f[_0x342bca(0x5e8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6b6)]) || _0x1e521f[_0x342bca(0x535)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x691)]) || _0x1e521f[_0x342bca(0x2e1)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5e0)]) || _0x1e521f[_0x342bca(0x421)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3d7)]) || _0x1e521f[_0x342bca(0x483)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6c8)])) {                                         let _0xa8389e = _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x44d)](0x13 * 0x5b + 0x6e9 + -0xda5, -0x1 * 0x1583 + 0x452 * 0x1 + 0x1137);                                         _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x4d5)](_0x1e521f[_0x342bca(0x684)], _0xa8389e), limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                     } else {                                         if (_0x1e521f[_0x342bca(0x246)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1c7)]) || _0x1e521f[_0x342bca(0x456)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x68c)])) {                                             let _0x83ba3b = _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x44d)](-0x6c8 + 0x1b47 + -0x147b, 0x1a1f + -0x1987 + -0x93);                                             _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x643)](_0x1e521f[_0x342bca(0x6aa)], _0x83ba3b), limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                         } else                                             (_0x1e521f[_0x342bca(0x2e7)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x47a)]) || _0x1e521f[_0x342bca(0x62b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x543)]) || _0x1e521f[_0x342bca(0x52d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4a7)]) || _0x1e521f[_0x342bca(0x343)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x23a)])) && (_0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)] = _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x63e)](), _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x4e9) + 'e'] = !![], limojiJiaodaiObjs[_0x342bca(0x1fd)](_0x4b9050));                                     }                                 }                             }                         }                     }                     if (_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x19c)]) || _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x412)]) || _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x2f1)]) && _0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)]('转动')) {                         if (_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x2f1)])) {                             let _0x4b7aa1 = _0x1e521f[_0x342bca(0x41f)](_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x44d)](-0x30a + -0x3 * -0x351 + -0x6e6, 0xa * -0xce + 0x1 * 0x2271 + -0x1a61), 0x278 + -0x1783 * 0x1 + 0x150c);                             limoRoomAnimation[_0x4b7aa1][_0x342bca(0x68f)] = _0x4b9050;                         } else {                             if (_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)]('动画')) {                                 let _0x36b0f1 = _0x1e521f[_0x342bca(0x2b6)](_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x44d)](0x13 * 0x151 + 0xb4f + -0x244c, 0x2248 + -0x4 * -0x15 + -0x2295), 0x1bf7 * 0x1 + -0x3dd + 0x1819 * -0x1);                                 _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x4b4) + 't'] = !![], limoRoomAnimation[_0x36b0f1][_0x342bca(0x3f6)][_0x342bca(0x1fd)](_0x4b9050), _0x4b9050[_0x342bca(0x21f) + 'r'] = 0x19a1 + 0xc * 0x98 + 0x615 * -0x5;                             } else {                                 let _0x2c9b76 = _0x1e521f[_0x342bca(0x3a0)](_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x44d)](-0xfa8 + -0xfbf + 0x1f6d), -0x48 * -0x2a + -0x6c * -0xe + -0x11b7 * 0x1);                                 limoRoomAnimation[_0x2c9b76][_0x342bca(0x4b4) + 't'][_0x342bca(0x1fd)](_0x4b9050);                             }                         }                     }                     if (_0x1e521f[_0x342bca(0x4b1)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6d4)])) {                         const _0x2bc4c9 = _0x1e521f[_0x342bca(0x2c6)][_0x342bca(0x3ea)]('|');                         let _0x305ede = -0x23cd * 0x1 + -0x1ed6 + 0x42a3;                         while (!![]) {                             switch (_0x2bc4c9[_0x305ede++]) {                             case '0':                                 cameraImportDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                 continue;                             case '1':                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x208)];                                 continue;                             case '2':                                 _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x393)];                                 continue;                             case '3':                                 limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                 continue;                             case '4':                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                     -(0x10a5 + -0x196d * -0x1 + -0x1c67 + 0.9589000000000851),                                     -0x11 * -0x163 + 0x3d1 + 0x1 * -0x1b19 + 0.33150000000000546,                                     -(0x12b0 + 0xe43 + -0x35 * 0x83 + 0.7609999999999673)                                 ];                                 continue;                             case '5':                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                     -(-0x1 * -0x262e + 0x5db * 0x3 + 0x4 * -0xa85 + 0.8400000000001455),                                     0x1a4 * 0x1 + 0x1 * -0x152b + 0x13cf + 0.4300000000000068,                                     -(0x1b * -0x169 + -0x1927 + 0x4521 + 0.07999999999992724)                                 ];                                 continue;                             }                             break;                         }                     }                     if (_0x1e521f[_0x342bca(0x1be)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x216)]) || _0x1e521f[_0x342bca(0x349)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x355)]) || _0x1e521f[_0x342bca(0x3e4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3f3)]) || _0x1e521f[_0x342bca(0x245)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2c3)]) || _0x1e521f[_0x342bca(0x66e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x437)]) || _0x1e521f[_0x342bca(0x5bc)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x324)]) || _0x1e521f[_0x342bca(0x266)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x58d)]) || _0x1e521f[_0x342bca(0x254)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x60b)]) || _0x1e521f[_0x342bca(0x5b6)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4ce)]) || _0x1e521f[_0x342bca(0x348)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x33e)]) || _0x1e521f[_0x342bca(0x42d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x628)]) || _0x1e521f[_0x342bca(0x2a2)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2d3)]) || _0x1e521f[_0x342bca(0x3a6)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3fe)]) || _0x1e521f[_0x342bca(0x4c3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x57f)]) || _0x1e521f[_0x342bca(0x38d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x316)]) || _0x1e521f[_0x342bca(0x1ce)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x511)]) || _0x1e521f[_0x342bca(0x343)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x616)]) || _0x1e521f[_0x342bca(0x3b3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x588)]) || _0x1e521f[_0x342bca(0x4ff)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x34e)]) || _0x1e521f[_0x342bca(0x384)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4db)])) {                         let _0x2cd77f = _0x1e521f[_0x342bca(0x4b7)](makeTextSprite, _0x1e521f[_0x342bca(0x4cd)], {                             'fontsize': 0x14,                             'borderColor': {                                 'r': 0xff,                                 'g': 0x0,                                 'b': 0x0,                                 'a': 0.4                             },                             'backgroundColor': {                                 'r': 0xff,                                 'g': 0xff,                                 'b': 0xff,                                 'a': 0.9                             },                             'size': [                                 0x8 * -0x2a3 + 0x2 * -0x29c + 0x1a52,                                 -0x250 + -0x1d72 * -0x1 + -0x1f * 0xe0                             ],                             'fontColor': {                                 'r': 0x0,                                 'g': 0x0,                                 'b': 0x0,                                 'a': 0x1                             }                         });                         _0x2cd77f[_0x342bca(0x646)] = new THREE[(_0x342bca(0x4fd))](-0x10ac + -0x64b + 0x16f7 + 0.5, -0x1062 * -0x1 + 0xde6 * -0x2 + 0xb6b), _0x2cd77f[_0x342bca(0x59c)][_0x342bca(0x231)](-(0x4 * 0x1cf + 0x2598 + -0x2cd4 + 0.5), -0x7f8 + 0x6b6 * -0x1 + 0x1 * 0xeae, -(-0x22d9 + 0x3d0 + 0x1f0a + 0.19999999999999996)), _0x4b9050[_0x342bca(0x5ff)](_0x2cd77f);                         if (_0x1e521f[_0x342bca(0x5e4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x216)])) {                             const _0x1c2a24 = _0x1e521f[_0x342bca(0x5f7)][_0x342bca(0x3ea)]('|');                             let _0x3000e6 = 0x24fd + -0x80f + 0x2e * -0xa1;                             while (!![]) {                                 switch (_0x1c2a24[_0x3000e6++]) {                                 case '0':                                     _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                     continue;                                 case '1':                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(-0x183a + 0x1 * 0x2009 + 0x937 + 0.6300000000001091),                                         -0x23e8 + 0x42d + 0x208d + 0.4000000000000057,                                         -(0x240b + -0x2704 * 0x1 + 0x8db + 0.5599999999999454)                                     ];                                     continue;                                 case '2':                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x294)];                                     continue;                                 case '3':                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(0x85c + 0x107f + -0x7d4 + 0.017300000000432192),                                         0x3 * -0x8bd + -0x7a9 + -0x3 * -0xb92 + 0.9303999999999917,                                         -(-0x3 * -0x26c + -0x1 * 0x1429 + 0x1 * 0x12aa + 0.9589000000000851)                                     ];                                     continue;                                 case '4':                                     limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                     continue;                                 case '5':                                     limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                     continue;                                 }                                 break;                             }                         } else {                             if (_0x1e521f[_0x342bca(0x5be)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x355)])) {                                 const _0x4a125c = _0x1e521f[_0x342bca(0x2de)][_0x342bca(0x3ea)]('|');                                 let _0x303a76 = 0x9b4 + 0x3a1 + -0xd55;                                 while (!![]) {                                     switch (_0x4a125c[_0x303a76++]) {                                     case '0':                                         limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                         continue;                                     case '1':                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                             -(0x1b6 + 0x1 * 0xf93 + -0x67 + 0.5299999999997453),                                             0x5c7 + 0x675 + -0xb57 + 0.36000000000001364,                                             -(-0x4e6 + -0x1 * -0x1e17 + 0x1a * -0xbe + 0.15000000000009095)                                         ];                                         continue;                                     case '2':                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x41c)];                                         continue;                                     case '3':                                         _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                         continue;                                     case '4':                                         limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                         continue;                                     case '5':                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                             -(0x2fe + 0x46d + -0x977 * -0x1 + 0.5299999999997453),                                             0x31a + 0x893 * 0x2 + -0x1355 * 0x1 + 0.18139999999999645,                                             -(0x1 * 0x12e1 + 0x1 * -0xa03 + 0x311 * -0x1 + 0.012199999999893407)                                         ];                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x1e521f[_0x342bca(0x42d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3fe)])) {                                     const _0x4c5a49 = _0x1e521f[_0x342bca(0x3a2)][_0x342bca(0x3ea)]('|');                                     let _0x2c107c = -0x1831 * -0x1 + -0x8bf * 0x1 + -0x293 * 0x6;                                     while (!![]) {                                         switch (_0x4c5a49[_0x2c107c++]) {                                         case '0':                                             limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                             continue;                                         case '1':                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                 -(0x100 + 0xd76 + -0x49 + 0.8478000000000065),                                                 -0xca9 + -0x9 * -0x235 + -0x6 * 0x110 + 0.7644999999999982,                                                 -(0xc32 + -0x103a * 0x1 + 0x9d3 + 0.6348000000000411)                                             ];                                             continue;                                         case '2':                                             limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                             continue;                                         case '3':                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                 -(0x14fd + -0x2f * -0xa3 + -0x4 * 0x92f + 0.38000000000010914),                                                 -0x23 * -0x83 + 0x5 * -0xae + -0xdb4 + 0.9900000000000091,                                                 -(-0x1b2b + -0x1 * 0x1b61 + -0x1 * -0x3c6b + 0.2799999999999727)                                             ];                                             continue;                                         case '4':                                             _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                             continue;                                         case '5':                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x28f)];                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x1e521f[_0x342bca(0x499)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2d3)])) {                                         const _0x5c8c1f = _0x1e521f[_0x342bca(0x493)][_0x342bca(0x3ea)]('|');                                         let _0x230306 = 0x1 * 0x26d2 + 0x1a98 + -0x20b5 * 0x2;                                         while (!![]) {                                             switch (_0x5c8c1f[_0x230306++]) {                                             case '0':                                                 limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                 continue;                                             case '1':                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x279)];                                                 continue;                                             case '2':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                     -(0xa6d * -0x3 + -0x6c6 + 0x3260 + 0.2300000000000182),                                                     -0x2369 + -0x4f * -0x71 + 0x15b + 0.009999999999990905,                                                     -(0x2 * 0x11e8 + -0xfd0 + -0xe21 + 0.36999999999989086)                                                 ];                                                 continue;                                             case '3':                                                 _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                 continue;                                             case '4':                                                 limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                 continue;                                             case '5':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                     -(-0x8 * -0x4a0 + 0x1 * 0x68 + -0x1915 * 0x1 + 0.09439999999995052),                                                     0x1110 + -0x2106 + 0x10ce + 0.20939999999998804,                                                     -(0x23ec + -0x1932 + -0x4ef + 0.3362999999999374)                                                 ];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x1e521f[_0x342bca(0x1f6)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x60b)])) {                                             const _0x232588 = _0x1e521f[_0x342bca(0x33c)][_0x342bca(0x3ea)]('|');                                             let _0x53eb35 = -0xa60 * -0x3 + 0x2186 + -0x40a6;                                             while (!![]) {                                                 switch (_0x232588[_0x53eb35++]) {                                                 case '0':                                                     limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                     continue;                                                 case '1':                                                     limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                     continue;                                                 case '2':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                         -(-0x140f + 0xeb7 + 0x9 * 0x25e + 0.4299999999998363),                                                         -0x1c34 + -0x38f * -0x2 + 0x1554 + 0.5399999999999991,                                                         -(0x11 * -0x39 + 0x81 * 0x4a + 0x3 * -0x951 + 0.5199999999999818)                                                     ];                                                     continue;                                                 case '3':                                                     _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                     continue;                                                 case '4':                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x6d8)];                                                     continue;                                                 case '5':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                         -(0x3 * 0x8ea + -0x1caf + 0x1 * 0x11e7 + 0.611699999999928),                                                         0x1c3b + 0x1b43 + 0x3 * -0x1267 + 0.432699999999997,                                                         -(-0x3 * -0x4b0 + 0x2 * 0xea5 + 0x1 * -0x25e7 + 0.6868999999999232)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x1e521f[_0x342bca(0x3d4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x58d)])) {                                                 const _0x5bb649 = _0x1e521f[_0x342bca(0x251)][_0x342bca(0x3ea)]('|');                                                 let _0x447543 = -0x234e + 0x9af * 0x1 + -0x3a9 * -0x7;                                                 while (!![]) {                                                     switch (_0x5bb649[_0x447543++]) {                                                     case '0':                                                         limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                         continue;                                                     case '1':                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2fe)];                                                         continue;                                                     case '2':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                             -(-0x1 * -0x1c + -0xe * -0xcd + 0x474 + 0.11700000000018917),                                                             -0x18c3 + -0x960 + -0x3d1 * -0x9 + 0.02790000000000248,                                                             -(0xda + 0x1 * 0x262 + 0x251 + 0.1534999999998945)                                                         ];                                                         continue;                                                     case '3':                                                         _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                         continue;                                                     case '4':                                                         limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                         continue;                                                     case '5':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                             -(0x1896 + -0x862 * 0x2 + 0x7f3 + 0.849999999999909),                                                             0x1 * -0x1c9b + 0x17 * -0x127 + -0xd * -0x441 + 0.5200000000000031,                                                             -(0xe + -0x2075 + -0x978 * -0x4 + 0.44000000000005457)                                                         ];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x1e521f[_0x342bca(0x52d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3f3)])) {                                                     const _0x581990 = _0x1e521f[_0x342bca(0x1ea)][_0x342bca(0x3ea)]('|');                                                     let _0x2e7fde = 0x1ab7 + -0x3 * -0x89f + 0x542 * -0xa;                                                     while (!![]) {                                                         switch (_0x581990[_0x2e7fde++]) {                                                         case '0':                                                             limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                             continue;                                                         case '1':                                                             _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                             continue;                                                         case '2':                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x4af)];                                                             continue;                                                         case '3':                                                             limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                             continue;                                                         case '4':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                 -(0x17f6 + 0x1e6e + -0x13 * 0x20b + 0.7699999999999818),                                                                 0x47 * 0x45 + -0x1 * 0xa9c + 0x1 * -0x849 + 0.46000000000000085,                                                                 -(0x1c27 * 0x1 + -0x149 * -0x1 + -0x7f6 * 0x3 + 0.7999999999999545)                                                             ];                                                             continue;                                                         case '5':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                 -(-0xac6 * -0x3 + -0x12e7 + 0x229 * 0x1 + 0.8874000000000706),                                                                 0x73e * 0x5 + -0x17f3 * 0x1 + -0xbfd + 0.22119999999999607,                                                                 -(0x1a8f + 0x21b + -0x1 * 0x1733 + 0.24080000000003565)                                                             ];                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x1e521f[_0x342bca(0x27c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4ce)])) {                                                         const _0x3bec15 = _0x1e521f[_0x342bca(0x4a5)][_0x342bca(0x3ea)]('|');                                                         let _0x5424b6 = 0xcee + -0x5d1 + 0x1 * -0x71d;                                                         while (!![]) {                                                             switch (_0x3bec15[_0x5424b6++]) {                                                             case '0':                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x267)];                                                                 continue;                                                             case '1':                                                                 limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                 continue;                                                             case '2':                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                     -(0x10aa + -0xe8f + 0xd48 + 0.32999999999992724),                                                                     -0x147 * -0x3 + 0x1c5b + -0x1fff + 0.3999999999999986,                                                                     -(-0x919 + -0x17f * -0x2 + 0xb94 + 0.15000000000009095)                                                                 ];                                                                 continue;                                                             case '3':                                                                 _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                 continue;                                                             case '4':                                                                 limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                 continue;                                                             case '5':                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                     -(-0x1a69 + -0x135d + 0x3d29 + 0.6415000000001783),                                                                     -0x2 * -0xce9 + 0x4 * 0x580 + -0x2f98 + 0.7391000000000005,                                                                     -(-0xf3a + 0x519 + 0xfb1 + 0.15450000000009823)                                                                 ];                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0x1e521f[_0x342bca(0x2bb)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x324)])) {                                                             const _0x166feb = _0x1e521f[_0x342bca(0x4ed)][_0x342bca(0x3ea)]('|');                                                             let _0x192d91 = -0x1 * 0x17c5 + -0x1bdf + 0x33a4;                                                             while (!![]) {                                                                 switch (_0x166feb[_0x192d91++]) {                                                                 case '0':                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                         -(-0x1 * -0x18eb + 0x1438 + 0x1df9 * -0x1 + 0.2665999999999258),                                                                         0x1 * 0xe65 + -0x1ec8 + 0x1 * 0x10a7 + 0.9890999999999934,                                                                         -(0x2 * 0x10d9 + 0x699 + 0x1 * -0x22d9 + 0.46289999999999054)                                                                     ];                                                                     continue;                                                                 case '1':                                                                     limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                     continue;                                                                 case '2':                                                                     limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                     continue;                                                                 case '3':                                                                     _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                     continue;                                                                 case '4':                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x3c5)];                                                                     continue;                                                                 case '5':                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                         -(-0x799 + 0x1 * 0x1f5b + -0x1 * 0x89a + 0.7399999999997817),                                                                         0x958 + -0x12fb + 0x3 * 0x34b + 0.39000000000000057,                                                                         -(-0x1 * -0x1d93 + -0x16c8 + -0x13d + 0.6199999999998909)                                                                     ];                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         } else {                                                             if (_0x1e521f[_0x342bca(0x1c0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x437)])) {                                                                 const _0x45a480 = _0x1e521f[_0x342bca(0x5a1)][_0x342bca(0x3ea)]('|');                                                                 let _0xdd4582 = 0x1a6b + -0x135b * -0x1 + -0x2dc6;                                                                 while (!![]) {                                                                     switch (_0x45a480[_0xdd4582++]) {                                                                     case '0':                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                             -(0xe8 * -0x1 + 0xdab + 0x233 + 0.9744999999998072),                                                                             0x28f + 0x2127 * -0x1 + -0x107 * -0x1e + 0.9065999999999974,                                                                             -(-0x9 * -0x300 + -0x2630 + 0x10c7 + 0.6912999999999556)                                                                         ];                                                                         continue;                                                                     case '1':                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                             -(0xc5d + -0x1 * -0x808 + 0x1 * -0x56f + 0.5599999999999454),                                                                             -0x22 * -0xce + -0x1b5a + 0x2f + 0.28999999999999915,                                                                             -(0x7 * -0x33b + 0x471 + -0x1 * -0x17a5 + 0.07999999999992724)                                                                         ];                                                                         continue;                                                                     case '2':                                                                         limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                         continue;                                                                     case '3':                                                                         _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                         continue;                                                                     case '4':                                                                         limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                         continue;                                                                     case '5':                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2f5)];                                                                         continue;                                                                     }                                                                     break;                                                                 }                                                             } else {                                                                 if (_0x1e521f[_0x342bca(0x340)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2c3)])) {                                                                     const _0x5c3b3e = _0x1e521f[_0x342bca(0x608)][_0x342bca(0x3ea)]('|');                                                                     let _0x5e2575 = 0x1bf4 * -0x1 + 0x807 * 0x4 + 0x85 * -0x8;                                                                     while (!![]) {                                                                         switch (_0x5c3b3e[_0x5e2575++]) {                                                                         case '0':                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                 -(0x15 * -0x1b + 0x2279 + 0x3 * -0x5df + 0.44000000000005457),                                                                                 0x14c4 + 0x6ae + -0x1b34 + 0.5399999999999991,                                                                                 -(-0x263f + 0x1d65 + 0xe68 + 0.6300000000001091)                                                                             ];                                                                             continue;                                                                         case '1':                                                                             limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                             continue;                                                                         case '2':                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x34c)];                                                                             continue;                                                                         case '3':                                                                             _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                             continue;                                                                         case '4':                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                 -(-0x1 * -0x1813 + -0x251 * 0xa + -0xdbd * -0x1 + 0.6109000000001288),                                                                                 0x1 * 0x1205 + -0x26b8 + 0x14fa + 0.045100000000005025,                                                                                 -(0x44 * -0x28 + 0x1 * -0x1abb + -0x224 * -0x14 + 0.9436000000000604)                                                                             ];                                                                             continue;                                                                         case '5':                                                                             limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                             continue;                                                                         }                                                                         break;                                                                     }                                                                 } else {                                                                     if (_0x1e521f[_0x342bca(0x254)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x588)])) {                                                                         const _0x4095b0 = _0x1e521f[_0x342bca(0x68b)][_0x342bca(0x3ea)]('|');                                                                         let _0x1ce8a2 = -0xdf3 * -0x1 + -0x230b + 0x1518;                                                                         while (!![]) {                                                                             switch (_0x4095b0[_0x1ce8a2++]) {                                                                             case '0':                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x3dc)];                                                                                 continue;                                                                             case '1':                                                                                 _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                 continue;                                                                             case '2':                                                                                 limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                 continue;                                                                             case '3':                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                     -(-0xc * 0x8b + -0x2003 + -0x30 * -0x11b + 0.7699999999999818),                                                                                     0x1821 + 0x2173 + -0x3963 + 0.13000000000000256,                                                                                     -(-0x26f4 + -0x1 * 0xa96 + 0x3703 + 0.14000000000010004)                                                                                 ];                                                                                 continue;                                                                             case '4':                                                                                 limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                 continue;                                                                             case '5':                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                     -(0x26 * 0x106 + 0xa26 + -0x8 * 0x450 + 0.13079999999990832),                                                                                     -0x256a + -0xc64 + 0x3205 + 0.9864999999999995,                                                                                     -(-0x2f * 0x1 + 0x26ef + -0x212d + 0.7817999999999756)                                                                                 ];                                                                                 continue;                                                                             }                                                                             break;                                                                         }                                                                     } else {                                                                         if (_0x1e521f[_0x342bca(0x401)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x33e)])) {                                                                             const _0x343b87 = _0x1e521f[_0x342bca(0x649)][_0x342bca(0x3ea)]('|');                                                                             let _0x92bec7 = 0x7 * 0x4 + -0x4e1 + 0x4c5;                                                                             while (!![]) {                                                                                 switch (_0x343b87[_0x92bec7++]) {                                                                                 case '0':                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                         -(-0xba1 + -0xd * 0x6f + 0x1f6c + 0.9200000000000728),                                                                                         0x1 * -0x1a07 + 0x2 * -0xce + 0x13 * 0x178 + 0.38219999999999743,                                                                                         -(-0xcc3 * 0x2 + 0x56c + 0x2 * 0xcc7 + 0.19110000000000582)                                                                                     ];                                                                                     continue;                                                                                 case '1':                                                                                     limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                     continue;                                                                                 case '2':                                                                                     _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                     continue;                                                                                 case '3':                                                                                     limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                     continue;                                                                                 case '4':                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                         -(-0xc55 + -0x2457 + 0x3ed4 + 0.9200000000000728),                                                                                         0x1032 + -0x20bd + -0x1 * -0x10c9 + 0.39000000000000057,                                                                                         -(0x1 * -0x571 + 0x184c + -0xd4d + 0.7999999999999545)                                                                                     ];                                                                                     continue;                                                                                 case '5':                                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x37c)];                                                                                     continue;                                                                                 }                                                                                 break;                                                                             }                                                                         } else {                                                                             if (_0x1e521f[_0x342bca(0x483)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x34e)])) {                                                                                 const _0x48631a = _0x1e521f[_0x342bca(0x3c9)][_0x342bca(0x3ea)]('|');                                                                                 let _0x9ef7a7 = -0xf * 0x1b + -0x1 * 0x1c01 + -0xecb * -0x2;                                                                                 while (!![]) {                                                                                     switch (_0x48631a[_0x9ef7a7++]) {                                                                                     case '0':                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                             -(-0x495 * 0x4 + 0x2640 + -0x5e7 + 0.7928999999999178),                                                                                             -0x8 * 0x180 + -0x1d87 + 0x29c1 + 0.38870000000000005,                                                                                             -(-0x12ff * 0x2 + -0xfde + 0x55 * 0xb3 + 0.13830000000007203)                                                                                         ];                                                                                         continue;                                                                                     case '1':                                                                                         _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                         continue;                                                                                     case '2':                                                                                         limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                         continue;                                                                                     case '3':                                                                                         limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                         continue;                                                                                     case '4':                                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x375)];                                                                                         continue;                                                                                     case '5':                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                             -(-0x6df * 0x2 + 0xa63 + -0x1 * -0x1161 + 0.3200000000001637),                                                                                             -0x1343 * 0x2 + 0x1ace * -0x1 + 0x1 * 0x4185 + 0.259999999999998,                                                                                             -(0x2 * 0x101f + -0x13 * -0xf1 + -0x2 * 0x1654 + 0.19000000000005457)                                                                                         ];                                                                                         continue;                                                                                     }                                                                                     break;                                                                                 }                                                                             } else {                                                                                 if (_0x1e521f[_0x342bca(0x4a0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x628)])) {                                                                                     const _0x239a6e = _0x1e521f[_0x342bca(0x2aa)][_0x342bca(0x3ea)]('|');                                                                                     let _0x2d976f = -0x33 * 0x23 + 0x2f * -0xc1 + 0x2a68;                                                                                     while (!![]) {                                                                                         switch (_0x239a6e[_0x2d976f++]) {                                                                                         case '0':                                                                                             limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                             continue;                                                                                         case '1':                                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x34b)];                                                                                             continue;                                                                                         case '2':                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                 -(-0x1e89 + 0x854 + 0x23e3 * 0x1 + 0.8344999999999345),                                                                                                 -0x1221 + -0x1ec4 + 0x312e + 0.36369999999999436,                                                                                                 -(0x1eb + -0x23a4 + 0x272e + 0.3927000000001044)                                                                                             ];                                                                                             continue;                                                                                         case '3':                                                                                             _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                             continue;                                                                                         case '4':                                                                                             limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                             continue;                                                                                         case '5':                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                 -(-0x1e1b * 0x1 + 0x2 * -0x131e + 0x5205 + 0.15000000000009095),                                                                                                 -0xc65 + -0x2024 + 0x1 * 0x2cc7 + 0.5,                                                                                                 -(0x6 * -0x2eb + -0x5 * -0x3b3 + -0x1 * -0x491 + 0.6600000000000819)                                                                                             ];                                                                                             continue;                                                                                         }                                                                                         break;                                                                                     }                                                                                 } else {                                                                                     if (_0x1e521f[_0x342bca(0x401)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4db)])) {                                                                                         const _0x8eb0c6 = _0x1e521f[_0x342bca(0x546)][_0x342bca(0x3ea)]('|');                                                                                         let _0x54aefa = 0xda3 * -0x2 + -0x10aa + 0x2bf0;                                                                                         while (!![]) {                                                                                             switch (_0x8eb0c6[_0x54aefa++]) {                                                                                             case '0':                                                                                                 limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                                 continue;                                                                                             case '1':                                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x604)];                                                                                                 continue;                                                                                             case '2':                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                     -(0x2af * -0x8 + -0x1c9 * -0x10 + 0x660 + 0.13000000000010914),                                                                                                     0x8 * 0x1dd + 0x3 * -0x9ff + 0xf46 + 0.38000000000000256,                                                                                                     -(0x5a4 + -0x3f * -0x8b + -0x2260 + 0.14000000000010004)                                                                                                 ];                                                                                                 continue;                                                                                             case '3':                                                                                                 limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                 continue;                                                                                             case '4':                                                                                                 _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                                 continue;                                                                                             case '5':                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                     -(-0x1 * 0x190f + -0x17 * -0x91 + 0x197f + 0.2775000000001455),                                                                                                     0x10b4 + -0x63d * 0x4 + 0x878 + 0.36430000000000007,                                                                                                     -(-0x2511 + -0x5 * -0x108 + 0x257b + 0.31179999999994834)                                                                                                 ];                                                                                                 continue;                                                                                             }                                                                                             break;                                                                                         }                                                                                     } else {                                                                                         if (_0x1e521f[_0x342bca(0x329)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x316)])) {                                                                                             const _0x240591 = _0x1e521f[_0x342bca(0x20e)][_0x342bca(0x3ea)]('|');                                                                                             let _0x2000ec = 0x635 * -0x3 + -0xde1 + 0x2 * 0x1040;                                                                                             while (!![]) {                                                                                                 switch (_0x240591[_0x2000ec++]) {                                                                                                 case '0':                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                         -(-0x18ba + -0x27 * 0xd9 + -0x1 * -0x470f + 0.5399999999999636),                                                                                                         0x405 + -0x12 * 0x151 + 0x13eb + 0.4799999999999969,                                                                                                         -(0x3 * -0x145 + 0x13aa + -0x1 * 0xa4d + 0.6900000000000546)                                                                                                     ];                                                                                                     continue;                                                                                                 case '1':                                                                                                     limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                                     continue;                                                                                                 case '2':                                                                                                     _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                                     continue;                                                                                                 case '3':                                                                                                     limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                     continue;                                                                                                 case '4':                                                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x495)];                                                                                                     continue;                                                                                                 case '5':                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                         -(-0x267 + -0x1 * 0x26e6 + 0x3693 * 0x1 + 0.6837999999997919),                                                                                                         0xe07 + -0x65a + 0x6 * -0x13c + 0.6285000000000025,                                                                                                         -(-0xa49 + 0x1f1 * 0x13 + -0x9 * 0x259 + 0.4522999999999229)                                                                                                     ];                                                                                                     continue;                                                                                                 }                                                                                                 break;                                                                                             }                                                                                         } else {                                                                                             if (_0x1e521f[_0x342bca(0x1be)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x616)])) {                                                                                                 const _0x210ad4 = _0x1e521f[_0x342bca(0x4fb)][_0x342bca(0x3ea)]('|');                                                                                                 let _0x44b0f0 = 0x26 * 0xa1 + 0x50f + -0x1cf5;                                                                                                 while (!![]) {                                                                                                     switch (_0x210ad4[_0x44b0f0++]) {                                                                                                     case '0':                                                                                                         limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                         continue;                                                                                                     case '1':                                                                                                         limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                                         continue;                                                                                                     case '2':                                                                                                         _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                                         continue;                                                                                                     case '3':                                                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2d7)];                                                                                                         continue;                                                                                                     case '4':                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                             -(0x13 * -0x89 + 0x6d * 0x3d + 0x7 * -0x65 + 0.2800000000002001),                                                                                                             -0x1a96 + 0xb * 0x35c + -0xa2d + 0.3299999999999983,                                                                                                             -(0x1d96 + 0x49 * 0x75 + -0x397a + 0.2400000000000091)                                                                                                         ];                                                                                                         continue;                                                                                                     case '5':                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                             -(-0xd74 + 0x1b37 + -0xb9 + 0.7103000000001884),                                                                                                             -0x1bb2 + -0x8eb + -0xa * -0x3af + 0.05100000000000193,                                                                                                             -(-0x2f3 + 0x503 * 0x5 + -0x146 * 0xd + 0.26909999999998035)                                                                                                         ];                                                                                                         continue;                                                                                                     }                                                                                                     break;                                                                                                 }                                                                                             } else {                                                                                                 if (_0x1e521f[_0x342bca(0x448)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x57f)])) {                                                                                                     const _0x45b828 = _0x1e521f[_0x342bca(0x506)][_0x342bca(0x3ea)]('|');                                                                                                     let _0x286cf6 = -0x1690 + -0x1 * -0x150f + 0x181;                                                                                                     while (!![]) {                                                                                                         switch (_0x45b828[_0x286cf6++]) {                                                                                                         case '0':                                                                                                             limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                             continue;                                                                                                         case '1':                                                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x67f)];                                                                                                             continue;                                                                                                         case '2':                                                                                                             limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                                             continue;                                                                                                         case '3':                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                 -(-0x378 + 0x34 * 0x41 + 0x307 * 0x1 + 0.30999999999994543),                                                                                                                 0xe5b + -0xd6f + -0xae + 0.5300000000000011,                                                                                                                 -(-0xec1 + -0x11 * 0x28 + 0x1 * 0x16f7 + 0.7100000000000364)                                                                                                             ];                                                                                                             continue;                                                                                                         case '4':                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                 -(-0x1 * -0x1cfa + -0x999 + -0x9a * 0xb + 0.584400000000187),                                                                                                                 -0xc38 + -0xf * 0x43 + 0x106a + 0.04720000000000368,                                                                                                                 -(-0x18e1 + -0x1 * -0x14d1 + -0x6f * -0x16 + 0.4455000000000382)                                                                                                             ];                                                                                                             continue;                                                                                                         case '5':                                                                                                             _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                                             continue;                                                                                                         }                                                                                                         break;                                                                                                     }                                                                                                 } else {                                                                                                     if (_0x1e521f[_0x342bca(0x682)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x511)])) {                                                                                                         const _0x23c0d8 = _0x1e521f[_0x342bca(0x4c1)][_0x342bca(0x3ea)]('|');                                                                                                         let _0x18aaa1 = -0x81 * 0x2f + 0x3 * 0xbfa + -0xc3f;                                                                                                         while (!![]) {                                                                                                             switch (_0x23c0d8[_0x18aaa1++]) {                                                                                                             case '0':                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                     -(0x1f19 + 0x30 * 0x7c + -0x29d0 + 0.30969999999979336),                                                                                                                     -0x102 + 0x5 * 0x568 + -0x19cd + 0.3596999999999966,                                                                                                                     -(-0x66 * -0x22 + 0x2c * 0x5c + -0x1 * 0x17cb + 0.9128000000000611)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '1':                                                                                                                 _0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x463)];                                                                                                                 continue;                                                                                                             case '2':                                                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x538)];                                                                                                                 continue;                                                                                                             case '3':                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                     -(-0x1094 + 0x15b * 0xf + -0x1 * -0x8c9 + 0.15000000000009095),                                                                                                                     -0x985 + -0xe3 * 0x15 + 0x1c55 + 0.18999999999999773,                                                                                                                     -(-0x20e * -0x1 + -0x385 + 0x30 * 0x25 + 0.09999999999990905)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '4':                                                                                                                 limoClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                 continue;                                                                                                             case '5':                                                                                                                 limoCameraMesh[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                 continue;                                                                                                             }                                                                                                             break;                                                                                                         }                                                                                                     }                                                                                                 }                                                                                             }                                                                                         }                                                                                     }                                                                                 }                                                                             }                                                                         }                                                                     }                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 } else {                     if (_0x1e521f[_0x342bca(0x56d)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x258)])) {                         if (_0x4b9050[_0x342bca(0x6b9)][_0x342bca(0x433)](_0x1e521f[_0x342bca(0x686)])) {                             const _0x331557 = _0x1e521f[_0x342bca(0x65b)][_0x342bca(0x3ea)]('|');                             let _0x11c9f2 = -0xc48 + 0x1 * -0x17e9 + 0x221 * 0x11;                             while (!![]) {                                 switch (_0x331557[_0x11c9f2++]) {                                 case '0':                                     _0x1e521f[_0x342bca(0x6ab)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x21c)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x565)], _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x4c6)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(0x748 + -0xa9e * 0x1 + -0x85 * -0x16 + 0.3200000000001637),                                         -0x5 * 0x282 + 0x1 * 0x86d + 0x55a + 0.75,                                         -(0x2432 + -0x1 * 0x19a9 + -0x6fd + 0.6100000000000136)                                     ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(0x1 * 0x24dd + 0x3 * -0x9ff + 0xa * 0x1f + 0.95699999999988),                                         0x2026 + -0xf21 + -0xfbd + 0.19029999999997926,                                         -(0x1a * -0x21 + 0x1042 + -0x97b + 0.8069000000000415)                                     ]);                                     continue;                                 case '1':                                     cameraImportDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                     continue;                                 case '2':                                     _0x1e521f[_0x342bca(0x3e4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2cd)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x4f2)], _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x45a)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(-0x1 * 0x1481 + -0x6 * 0x494 + -0x64 * -0xa1 + 0.7399999999997817),                                         0x267 + -0x38 * -0xc + 0x2 * -0x1e5 + 0.839999999999975,                                         -(0x11 * -0x1d5 + 0xa4c + 0x1893 * 0x1 + 0.36000000000001364)                                     ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(0xe42 + -0xe * -0x295 + -0x2355 + 0.3602000000000771),                                         -0x9f8 + 0x14c6 + -0x984 + 0.6541000000000281,                                         -(-0x851 * 0x3 + -0x238c + -0x1 * -0x4039 + 0.4438999999999851)                                     ]);                                     continue;                                 case '3':                                     _0x1e521f[_0x342bca(0x6ab)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4e8)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x46e)], _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x204)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(0x1 * -0x17f3 + 0xd3 * 0x2f + -0x256 + 0.6599999999998545),                                         -0x1 * -0x10ab + 0x4e * 0x69 + -0x2f6c + 0.910000000000025,                                         -(0x67 * 0x2d + -0x8 * 0x14 + -0xda6 + 0.9099999999999682)                                     ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(-0x1c1e + -0x1b9a + 0x442e + 0.44840000000021973),                                         0xb1b + -0x63a * 0x2 + 0x2a0 + 0.43990000000002283,                                         -(0xf61 + 0x470 + -0x7ed * 0x2 + 0.3348999999999478)                                     ]);                                     continue;                                 case '4':                                     _0x1e521f[_0x342bca(0x228)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x32e)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x56c)], _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x619)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(-0x10bf + 0x19f1 + 0x5 * 0x9f + 0.0500000000001819),                                         -0x2691 * -0x1 + 0x2 * -0xaf7 + -0x1067 + 0.6499999999999986,                                         -(0x13a1 + -0x1239 + 0x1fd + 0.21000000000003638)                                     ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(-0x1 * -0x1df6 + -0x216d + -0x6 * -0x2a6 + 0.4054999999998472),                                         -0xe96 + 0x148f + -0x5b8 + 0.7750000000000057,                                         -(0xa * 0x26e + -0x1185 + -0x363 + 0.7952999999999975)                                     ]);                                     continue;                                 case '5':                                     _0x1e521f[_0x342bca(0x4c7)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1b9)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x5a7)], _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x6c2)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(0x7 * 0xcf + -0x1 * 0xfb + 0x12d * 0x5 + 0.7100000000000364),                                         -0x13ec + -0xb2d + 0x2057 + 0.10000000000002274,                                         -(0x1 * -0x489 + 0x91d + -0xda + 0.21000000000003638)                                     ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(-0x161 + 0x480 * -0x4 + 0xd0 * 0x25 + 0.8695999999999913),                                         0x1ea + -0xf2d + 0xe8d + 0.46399999999999864,                                         -(-0x1 * 0x20ef + 0x1 * 0xe0f + -0x169a * -0x1 + 0.8425999999999476)                                     ]);                                     continue;                                 case '6':                                     _0x1e521f[_0x342bca(0x45b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x55a)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x500)], _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x478)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                         -(-0x1 * 0x1eb0 + 0x1529 + 0x1139 + 0.2400000000000091),                                         -0xf55 + 0x145b + 0x265 * -0x2 + 0.25,                                         -(-0x1fa1 + 0x1b43 + -0x7c3 * -0x1 + 0.19000000000005457)                                     ], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                         -(-0x6a6 + 0x45d * -0x7 + 0x2cc7 + 0.9351999999998952),                                         -0x2091 + -0x1 * -0x4a9 + 0x1c28 + 0.5752999999999986,                                         -(-0x1ee * 0x2 + -0x52a + 0xe * 0xe3 + 0.7335000000000491)                                     ]);                                     continue;                                 case '7':                                     junhuaClickObjs[_0x342bca(0x1fd)](_0x4b9050);                                     continue;                                 }                                 break;                             }                         }                     } else {                         if (_0x1e521f[_0x342bca(0x66e)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5d9)]))                             _0x1e521f[_0x342bca(0x1c2)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x191)]) && (_0x4b9050[_0x342bca(0x6b9)] = _0x1e521f[_0x342bca(0x64a)], limoClickObjs[_0x342bca(0x1fd)](_0x4b9050));                         else {                             if (_0x1e521f[_0x342bca(0x3c7)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4ec)]))                                 (_0x1e521f[_0x342bca(0x436)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x41d)]) || _0x1e521f[_0x342bca(0x330)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1a0)]) || _0x1e521f[_0x342bca(0x1ce)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5a8)]) || _0x1e521f[_0x342bca(0x498)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4a2)]) || _0x1e521f[_0x342bca(0x32f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x39c)]) || _0x1e521f[_0x342bca(0x42d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x22d)])) && (_0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)] = _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x63e)](), _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x4e9) + 'e'] = !![], posuijianJiaodaiObjs[_0x342bca(0x1fd)](_0x4b9050));                             else {                                 if (_0x1e521f[_0x342bca(0x38d)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ce)]))                                     (_0x1e521f[_0x342bca(0x22c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x28c)]) || _0x1e521f[_0x342bca(0x50c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x30e)]) || _0x1e521f[_0x342bca(0x4c7)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5a5)]) || _0x1e521f[_0x342bca(0x376)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x38c)])) && (_0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)] = _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x63e)](), _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x4e9) + 'e'] = !![], saifenjianJiaodaiObjs[_0x342bca(0x1fd)](_0x4b9050));                                 else                                     _0x1e521f[_0x342bca(0x2f4)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x671)]) && ((_0x1e521f[_0x342bca(0x5b6)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2fb)]) || _0x1e521f[_0x342bca(0x202)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4dd)]) || _0x1e521f[_0x342bca(0x58b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x263)]) || _0x1e521f[_0x342bca(0x356)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x365)]) || _0x1e521f[_0x342bca(0x32f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x21a)]) || _0x1e521f[_0x342bca(0x36f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x468)]) || _0x1e521f[_0x342bca(0x309)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x531)]) || _0x1e521f[_0x342bca(0x3e2)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1c6)]) || _0x1e521f[_0x342bca(0x22c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x450)])) && (_0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)] = _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x63e)](), _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x379)][_0x342bca(0x4e9) + 'e'] = !![], suishijianJiaodaiObjs[_0x342bca(0x1fd)](_0x4b9050)));                             }                         }                     }                 }                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x2ac)] = _0x4b9050[_0x342bca(0x2b3)][_0x342bca(0x4b4) + 't'], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x6bb)] = _0x4b9050[_0x342bca(0x6bb)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x6ca) + _0x342bca(0x42b)] = _0x4b9050[_0x342bca(0x6ca) + _0x342bca(0x42b)], _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x21f) + 'r'] = _0x4b9050[_0x342bca(0x21f) + 'r'];             } else {                 if (_0x1e521f[_0x342bca(0x5ef)](_0x4b9050[_0x342bca(0x269)], _0x1e521f[_0x342bca(0x6cf)])) {                     if (_0x1e521f[_0x342bca(0x4b5)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1e0)])) {                         if (_0x1e521f[_0x342bca(0x559)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6a0)]) || _0x1e521f[_0x342bca(0x5ef)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4c2)]) || _0x1e521f[_0x342bca(0x4cb)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x635)]) || _0x1e521f[_0x342bca(0x2f4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3b6)]) || _0x1e521f[_0x342bca(0x1c3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x278)]) || _0x1e521f[_0x342bca(0x59e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x642)]) || _0x1e521f[_0x342bca(0x6ab)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6cd)]) || _0x1e521f[_0x342bca(0x515)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4ac)]))                             _0x4b9050[_0x342bca(0x2b2)](_0x4a53f2 => {                                 const _0x331ebe = _0x342bca;                                 if (_0x4a53f2[_0x331ebe(0x1d8)]) {                                     let _0x1f0ced = _0x4b9050[_0x331ebe(0x6b9)][_0x331ebe(0x44d)](-0x25fc + 0xa96 * 0x2 + 0x10d5);                                     _0x4a53f2[_0x331ebe(0x6b9)] = _0x5e7bb3[_0x331ebe(0x403)](_0x5e7bb3[_0x331ebe(0x481)], _0x1f0ced), limoClickObjs[_0x331ebe(0x1fd)](_0x4a53f2);                                 }                             });                         else {                             if (_0x1e521f[_0x342bca(0x246)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x55c)]) || _0x1e521f[_0x342bca(0x586)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x415)]) || _0x1e521f[_0x342bca(0x36c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3dd)]))                                 _0x4b9050[_0x342bca(0x2b2)](_0x25a03c => {                                     const _0x35808f = _0x342bca;                                     if (_0x25a03c[_0x35808f(0x1d8)]) {                                         const _0xfbdaed = _0x1e521f[_0x35808f(0x19a)][_0x35808f(0x3ea)]('|');                                         let _0x1fe584 = 0x226a + 0x13f8 * 0x1 + 0x1b31 * -0x2;                                         while (!![]) {                                             switch (_0xfbdaed[_0x1fe584++]) {                                             case '0':                                                 limoClickObjs[_0x35808f(0x1fd)](_0x25a03c);                                                 continue;                                             case '1':                                                 _0x1e521f[_0x35808f(0x382)](_0x4b9050[_0x35808f(0x6b9)], _0x1e521f[_0x35808f(0x3dd)]) && (_0x25a03c[_0x35808f(0x6b9)] = _0x1e521f[_0x35808f(0x194)]);                                                 continue;                                             case '2':                                                 _0x1e521f[_0x35808f(0x3f9)](_0x4b9050[_0x35808f(0x6b9)], _0x1e521f[_0x35808f(0x415)]) && (_0x25a03c[_0x35808f(0x6b9)] = _0x1e521f[_0x35808f(0x5ba)]);                                                 continue;                                             case '3':                                                 (_0x1e521f[_0x35808f(0x382)](_0x25a03c[_0x35808f(0x6b9)], _0x1e521f[_0x35808f(0x4b2)]) || _0x1e521f[_0x35808f(0x209)](_0x25a03c[_0x35808f(0x6b9)], _0x1e521f[_0x35808f(0x5a9)]) || _0x1e521f[_0x35808f(0x1ce)](_0x25a03c[_0x35808f(0x6b9)], _0x1e521f[_0x35808f(0x5a3)])) && (_0x25a03c[_0x35808f(0x2b3)][_0x35808f(0x379)] = _0x25a03c[_0x35808f(0x2b3)][_0x35808f(0x379)][_0x35808f(0x63e)](), _0x25a03c[_0x35808f(0x2b3)][_0x35808f(0x379)][_0x35808f(0x4e9) + 'e'] = !![], limojiJiaodaiObjs[_0x35808f(0x1fd)](_0x25a03c));                                                 continue;                                             case '4':                                                 _0x1e521f[_0x35808f(0x6dc)](_0x4b9050[_0x35808f(0x6b9)], _0x1e521f[_0x35808f(0x55c)]) && (_0x25a03c[_0x35808f(0x6b9)] = _0x1e521f[_0x35808f(0x40a)]);                                                 continue;                                             }                                             break;                                         }                                     }                                 });                             else {                                 if (_0x1e521f[_0x342bca(0x401)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x54f)]) || _0x1e521f[_0x342bca(0x5e4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x298)]) || _0x1e521f[_0x342bca(0x2b8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4a1)]) || _0x1e521f[_0x342bca(0x19f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x304)]) || _0x1e521f[_0x342bca(0x66e)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x562)]))                                     _0x4b9050[_0x342bca(0x2b2)](_0x2c3032 => {                                         const _0x5a51bd = _0x342bca;                                         if (_0x2c3032[_0x5a51bd(0x1d8)]) {                                             const _0xaf97a7 = _0x5e7bb3[_0x5a51bd(0x549)][_0x5a51bd(0x3ea)]('|');                                             let _0x30118a = 0x1 * 0xecc + 0x2 * 0xcbf + -0x47a * 0x9;                                             while (!![]) {                                                 switch (_0xaf97a7[_0x30118a++]) {                                                 case '0':                                                     _0x5e7bb3[_0x5a51bd(0x447)](_0x4b9050[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x570)]) && (_0x2c3032[_0x5a51bd(0x6b9)] = _0x5e7bb3[_0x5a51bd(0x5d2)]);                                                     continue;                                                 case '1':                                                     limoClickObjs[_0x5a51bd(0x1fd)](_0x2c3032);                                                     continue;                                                 case '2':                                                     (_0x5e7bb3[_0x5a51bd(0x447)](_0x2c3032[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x69a)]) || _0x5e7bb3[_0x5a51bd(0x367)](_0x2c3032[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x4f6)]) || _0x5e7bb3[_0x5a51bd(0x447)](_0x2c3032[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x4df)]) || _0x5e7bb3[_0x5a51bd(0x2ab)](_0x2c3032[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x235)]) || _0x5e7bb3[_0x5a51bd(0x367)](_0x2c3032[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x2f7)])) && (_0x2c3032[_0x5a51bd(0x2b3)][_0x5a51bd(0x379)] = _0x2c3032[_0x5a51bd(0x2b3)][_0x5a51bd(0x379)][_0x5a51bd(0x63e)](), _0x2c3032[_0x5a51bd(0x2b3)][_0x5a51bd(0x379)][_0x5a51bd(0x4e9) + 'e'] = !![], limojiJiaodaiObjs[_0x5a51bd(0x1fd)](_0x2c3032));                                                     continue;                                                 case '3':                                                     _0x5e7bb3[_0x5a51bd(0x418)](_0x4b9050[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x65c)]) && (_0x2c3032[_0x5a51bd(0x6b9)] = _0x5e7bb3[_0x5a51bd(0x4e1)]);                                                     continue;                                                 case '4':                                                     _0x5e7bb3[_0x5a51bd(0x4a4)](_0x4b9050[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x5a0)]) && (_0x2c3032[_0x5a51bd(0x6b9)] = _0x5e7bb3[_0x5a51bd(0x555)]);                                                     continue;                                                 case '5':                                                     _0x5e7bb3[_0x5a51bd(0x303)](_0x4b9050[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x2d4)]) && (_0x2c3032[_0x5a51bd(0x6b9)] = _0x5e7bb3[_0x5a51bd(0x69d)]);                                                     continue;                                                 case '6':                                                     _0x5e7bb3[_0x5a51bd(0x313)](_0x4b9050[_0x5a51bd(0x6b9)], _0x5e7bb3[_0x5a51bd(0x1de)]) && (_0x2c3032[_0x5a51bd(0x6b9)] = _0x5e7bb3[_0x5a51bd(0x4c0)]);                                                     continue;                                                 }                                                 break;                                             }                                         }                                     });                                 else {                                     if (_0x1e521f[_0x342bca(0x41a)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3f0)]) || _0x1e521f[_0x342bca(0x6d5)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x351)]) || _0x1e521f[_0x342bca(0x4fe)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x689)]) || _0x1e521f[_0x342bca(0x4b8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x34a)]) || _0x1e521f[_0x342bca(0x416)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x63f)]) || _0x1e521f[_0x342bca(0x2ec)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x40e)]) || _0x1e521f[_0x342bca(0x489)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1ca)]) || _0x1e521f[_0x342bca(0x382)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x68d)]))                                         _0x4b9050[_0x342bca(0x2b2)](_0x58542e => {                                             const _0x3ab1a2 = _0x342bca;                                             if (_0x58542e[_0x3ab1a2(0x1d8)]) {                                                 let _0x18414c = _0x4b9050[_0x3ab1a2(0x6b9)][_0x3ab1a2(0x44d)](0x1 * -0x69d + 0x19bf + -0x2 * 0x98f);                                                 _0x58542e[_0x3ab1a2(0x6b9)] = _0x1e521f[_0x3ab1a2(0x1f2)](_0x1e521f[_0x3ab1a2(0x50a)], _0x18414c), limoClickObjs[_0x3ab1a2(0x1fd)](_0x58542e);                                             }                                         });                                     else                                         (_0x1e521f[_0x342bca(0x46d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2a0)]) || _0x1e521f[_0x342bca(0x245)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x47b)]) || _0x1e521f[_0x342bca(0x584)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2c8)]) || _0x1e521f[_0x342bca(0x245)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x424)]) || _0x1e521f[_0x342bca(0x3e4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6bc)]) || _0x1e521f[_0x342bca(0x4a0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1b5)]) || _0x1e521f[_0x342bca(0x559)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x556)]) || _0x1e521f[_0x342bca(0x343)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4b3)])) && _0x4b9050[_0x342bca(0x2b2)](_0x5c60c7 => {                                             const _0x496fac = _0x342bca;                                             if (_0x5c60c7[_0x496fac(0x1d8)]) {                                                 let _0x4332c2 = _0x4b9050[_0x496fac(0x6b9)][_0x496fac(0x44d)](-0x6b8 + -0xdf * -0xb + -0x2d8);                                                 _0x5c60c7[_0x496fac(0x6b9)] = _0x5e7bb3[_0x496fac(0x576)](_0x5e7bb3[_0x496fac(0x51c)], _0x4332c2), limoClickObjs[_0x496fac(0x1fd)](_0x5c60c7);                                             }                                         });                                 }                             }                         }                     } else {                         if (_0x1e521f[_0x342bca(0x4c7)](_0x1b541f[_0x342bca(0x6b9)], '报警')) {                             if (_0x1e521f[_0x342bca(0x501)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2b1)])) {                                 const _0x44e533 = _0x1e521f[_0x342bca(0x35d)][_0x342bca(0x3ea)]('|');                                 let _0x5a6908 = -0x2707 + -0x35f * -0xa + 0x551;                                 while (!![]) {                                     switch (_0x44e533[_0x5a6908++]) {                                     case '0':                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x45c)];                                         continue;                                     case '1':                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                         continue;                                     case '2':                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                             -(-0x1a4c + 0x26 * 0x4b + -0x1 * -0x1cfd + 0.7296999999998661),                                             0x29c * -0xb + 0x1 * -0x1ef3 + 0xb * 0x587 + 0.8965000000000032,                                             -(0x1 * -0x2419 + -0x249d + -0x1 * -0x4c53 + 0.4296000000000504)                                         ];                                         continue;                                     case '3':                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                             -(0x1 * 0xdb + -0x1 * 0x229d + 0x2f97 + 0.38000000000010914),                                             -0x1 * -0x653 + -0xf * -0x1b + 0x33 * -0x22 + 0.2799999999999727,                                             -(0x199 * 0x4 + -0x2b * 0x7c + 0x122a + 0.5299999999999727)                                         ];                                         continue;                                     case '4':                                         _0x4b9050[_0x342bca(0x2b2)](_0xbea728 => {                                             const _0x57fa2e = _0x342bca;                                             _0xbea728[_0x57fa2e(0x1d8)] && (_0xbea728[_0x57fa2e(0x6b9)] = _0x5e7bb3[_0x57fa2e(0x331)], junhuaClickObjs[_0x57fa2e(0x1fd)](_0xbea728));                                         });                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x1e521f[_0x342bca(0x1a1)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x248)])) {                                     const _0x24b01e = _0x1e521f[_0x342bca(0x44f)][_0x342bca(0x3ea)]('|');                                     let _0x542dd8 = 0x2411 + 0x6b3 * -0x1 + 0x15 * -0x166;                                     while (!![]) {                                         switch (_0x24b01e[_0x542dd8++]) {                                         case '0':                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x30a)];                                             continue;                                         case '1':                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                 -(0xf81 + 0xe8b + 0x8 * -0x223 + 0.9400000000000546),                                                 0x1981 + -0x8 * 0xf4 + -0x10bf * 0x1 + 0.2699999999999818,                                                 -(0x21c + 0x3b5 + -0x6b * 0x5 + 0.5199999999999818)                                             ];                                             continue;                                         case '2':                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                             continue;                                         case '3':                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                 -(0x86 * 0x2b + -0x1eeb + 0x1 * 0x155c + 0.5280999999999949),                                                 0xf09 + 0x9b * -0x1 + -0xb3 * 0x13 + 0.6465999999999781,                                                 -(-0x887 * 0x1 + -0x24a1 * -0x1 + 0x3 * -0x827 + 0.2480000000000473)                                             ];                                             continue;                                         case '4':                                             _0x4b9050[_0x342bca(0x2b2)](_0x4c7e75 => {                                                 const _0x4f785a = _0x342bca;                                                 _0x4c7e75[_0x4f785a(0x1d8)] && (_0x4c7e75[_0x4f785a(0x6b9)] = _0x1e521f[_0x4f785a(0x6bf)], junhuaClickObjs[_0x4f785a(0x1fd)](_0x4c7e75));                                             });                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x1e521f[_0x342bca(0x247)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x669)])) {                                         const _0x2412f2 = _0x1e521f[_0x342bca(0x43e)][_0x342bca(0x3ea)]('|');                                         let _0x56ed03 = 0xb2e + 0x18b1 + -0x23df;                                         while (!![]) {                                             switch (_0x2412f2[_0x56ed03++]) {                                             case '0':                                                 _0x4b9050[_0x342bca(0x2b2)](_0x1bf656 => {                                                     const _0x28d88a = _0x342bca;                                                     _0x1bf656[_0x28d88a(0x1d8)] && (_0x1bf656[_0x28d88a(0x6b9)] = _0x5e7bb3[_0x28d88a(0x331)], junhuaClickObjs[_0x28d88a(0x1fd)](_0x1bf656));                                                 });                                                 continue;                                             case '1':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                     -(-0x1 * 0xe91 + -0x13 * 0x1af + 0x12c9 * 0x3 + 0.38000000000010914),                                                     -0x17 * -0x2b + -0x2 * -0x900 + -0x1 * 0x14bb + 0.2799999999999727,                                                     -(-0xc29 + -0x364 + -0x23 * -0x8d + 0.5299999999999727)                                                 ];                                                 continue;                                             case '2':                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x505)];                                                 continue;                                             case '3':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                     -(-0xa9f * -0x1 + -0x6 * 0x1d + -0x26 * 0x1 + 0.5189999999997781),                                                     0x1 * 0x1de + -0x4 * -0x5eb + -0x1862 + 0.07049999999998136,                                                     -(-0x17ff + -0x1461 + 0x2ffc + 0.9367999999999483)                                                 ];                                                 continue;                                             case '4':                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x1e521f[_0x342bca(0x6c4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x48a)])) {                                             const _0x201e76 = _0x1e521f[_0x342bca(0x3e9)][_0x342bca(0x3ea)]('|');                                             let _0xffad4a = -0xa4 + -0xcd3 * -0x2 + 0x1902 * -0x1;                                             while (!![]) {                                                 switch (_0x201e76[_0xffad4a++]) {                                                 case '0':                                                     _0x4b9050[_0x342bca(0x2b2)](_0xd1b63b => {                                                         const _0x30bdd2 = _0x342bca;                                                         _0xd1b63b[_0x30bdd2(0x1d8)] && (_0xd1b63b[_0x30bdd2(0x6b9)] = _0x5e7bb3[_0x30bdd2(0x331)], limoClickObjs[_0x30bdd2(0x1fd)](_0xd1b63b));                                                     });                                                     continue;                                                 case '1':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                         -(0x2a9 * 0xa + -0xb * -0x29c + -0x2ab1 + 0.6599999999998545),                                                         -0x1791 + -0x1e49 + 0x3637 + 0.7999999999999972,                                                         -(-0x3 * 0x97d + -0x1df5 + 0x40cf * 0x1 + 0.43000000000006366)                                                     ];                                                     continue;                                                 case '2':                                                     fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                     continue;                                                 case '3':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                         -(-0x10e * 0x21 + 0x1c04 + 0x1367 * 0x1 + 0.671100000000024),                                                         0x235f + -0x1949 * 0x1 + -0x9a9 + 0.6655999999999977,                                                         -(-0x3 * 0x373 + -0x1 * -0x12bc + -0x1d4 + 0.5574999999998909)                                                     ];                                                     continue;                                                 case '4':                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x470)];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x1e521f[_0x342bca(0x1a8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x310)])) {                                                 const _0x6ae23a = _0x1e521f[_0x342bca(0x265)][_0x342bca(0x3ea)]('|');                                                 let _0x47c3de = 0x15cd + -0x16fc + 0x12f;                                                 while (!![]) {                                                     switch (_0x6ae23a[_0x47c3de++]) {                                                     case '0':                                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                         continue;                                                     case '1':                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x5cf)];                                                         continue;                                                     case '2':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                             -(-0x55b + 0x702 + 0xb6c + 0.17299999999977445),                                                             0x1d9a + -0x2 * -0x164 + 0x1ffa * -0x1 + 0.6821000000000055,                                                             -(0x1bb * 0x5 + 0xf70 + 0x1 * -0x1183 + 0.7657999999998992)                                                         ];                                                         continue;                                                     case '3':                                                         _0x4b9050[_0x342bca(0x2b2)](_0x137d8a => {                                                             const _0x488317 = _0x342bca;                                                             _0x137d8a[_0x488317(0x1d8)] && (_0x137d8a[_0x488317(0x6b9)] = _0x5e7bb3[_0x488317(0x331)], limoClickObjs[_0x488317(0x1fd)](_0x137d8a));                                                         });                                                         continue;                                                     case '4':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                             -(0xa65 + -0x3 * 0x6d5 + -0x172c * -0x1 + 0.8000000000001819),                                                             0x11a + -0x1a51 + -0x665 * -0x4 + 0.769999999999996,                                                             -(0x231d + 0x2b * -0x3 + -0x55 * 0x55 + 0.2999999999999545)                                                         ];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x1e521f[_0x342bca(0x27c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x42a)])) {                                                     const _0x53f147 = _0x1e521f[_0x342bca(0x3e1)][_0x342bca(0x3ea)]('|');                                                     let _0x4b46a2 = 0x10 * 0x23b + -0x1107 + -0x12a9;                                                     while (!![]) {                                                         switch (_0x53f147[_0x4b46a2++]) {                                                         case '0':                                                             _0x4b9050[_0x342bca(0x2b2)](_0x2b8033 => {                                                                 const _0x4a0860 = _0x342bca;                                                                 _0x2b8033[_0x4a0860(0x1d8)] && (_0x2b8033[_0x4a0860(0x6b9)] = _0x1e521f[_0x4a0860(0x6bf)], limoClickObjs[_0x4a0860(0x1fd)](_0x2b8033));                                                             });                                                             continue;                                                         case '1':                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x620)];                                                             continue;                                                         case '2':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                 -(-0x2b7 * 0xd + -0x1398 + 0x446e + 0.7907000000000153),                                                                 0x250a + -0x165e + -0xe45 + 0.4047000000000054,                                                                 -(0xadc + -0x44d * -0x7 + -0x2269 + 0.8554999999998927)                                                             ];                                                             continue;                                                         case '3':                                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                             continue;                                                         case '4':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                 -(0x5b5 + -0x133f + -0x907 * -0x3 + 0.75),                                                                 0x1 * 0x1cd + -0xbf3 + 0xa83 + 0.769999999999996,                                                                 -(-0x1 * -0x101 + -0x11ec * -0x2 + -0x1e76 + 0.31999999999993634)                                                             ];                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x1e521f[_0x342bca(0x5b8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2dd)])) {                                                         const _0x1cebf8 = _0x1e521f[_0x342bca(0x695)][_0x342bca(0x3ea)]('|');                                                         let _0x1f6c90 = -0x67 * 0xb + 0xbbc * 0x2 + -0x19 * 0xc3;                                                         while (!![]) {                                                             switch (_0x1cebf8[_0x1f6c90++]) {                                                             case '0':                                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                 continue;                                                             case '1':                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                     -(-0x6 * -0x483 + 0x2 * -0x589 + 0x7c * -0x4 + 0.6900000000000546),                                                                     -0x19ee + -0x100 * 0x1c + -0x7b * -0x71 + 0.7600000000000051,                                                                     -(-0x1a * -0xca + 0x9cd + -0x17ee + 0.2799999999999727)                                                                 ];                                                                 continue;                                                             case '2':                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                     -(0x1c4e + 0x11d7 + -0x2014 + 0.6343000000001666),                                                                     -0xb * -0x327 + -0x50f + -0x1d3a + 0.5769999999999982,                                                                     -(-0x121d + 0xd9 + 0x17d2 + 0.3106000000000222)                                                                 ];                                                                 continue;                                                             case '3':                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x267a2a => {                                                                     const _0x4c3669 = _0x342bca;                                                                     _0x267a2a[_0x4c3669(0x1d8)] && (_0x267a2a[_0x4c3669(0x6b9)] = _0x5e7bb3[_0x4c3669(0x331)], limoClickObjs[_0x4c3669(0x1fd)](_0x267a2a));                                                                 });                                                                 continue;                                                             case '4':                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x48f)];                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0x1e521f[_0x342bca(0x423)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x623)])) {                                                             const _0xcee955 = _0x1e521f[_0x342bca(0x4ad)][_0x342bca(0x3ea)]('|');                                                             let _0x3cbdde = -0x2484 + -0x1 * 0x1411 + 0x3895;                                                             while (!![]) {                                                                 switch (_0xcee955[_0x3cbdde++]) {                                                                 case '0':                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                         -(0x1cb7 * -0x1 + 0x21 * 0x126 + 0x564 * 0x1 + 0.5162000000000262),                                                                         0x18cb * -0x1 + -0x1c2f + 0x2f7 * 0x12 + 0.45650000000000546,                                                                         -(-0x17ce + -0xa9c + 0x28f7 + 0.42429999999990287)                                                                     ];                                                                     continue;                                                                 case '1':                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                         -(-0x2072 + -0x6fd + 0x3603 + 0.03000000000020009),                                                                         -0x6a2 + -0x1f6f + 0x266e + 0.7999999999999972,                                                                         -(-0x1 * -0x6ec + 0x4 * -0x645 + 0x188b + 0.40000000000009095)                                                                     ];                                                                     continue;                                                                 case '2':                                                                     _0x4b9050[_0x342bca(0x2b2)](_0x3672d7 => {                                                                         const _0x382630 = _0x342bca;                                                                         _0x3672d7[_0x382630(0x1d8)] && (_0x3672d7[_0x382630(0x6b9)] = _0x1e521f[_0x382630(0x6bf)], limoClickObjs[_0x382630(0x1fd)](_0x3672d7));                                                                     });                                                                     continue;                                                                 case '3':                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x6ad)];                                                                     continue;                                                                 case '4':                                                                     fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         } else {                                                             if (_0x1e521f[_0x342bca(0x589)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x477)])) {                                                                 const _0x4f22db = _0x1e521f[_0x342bca(0x5a6)][_0x342bca(0x3ea)]('|');                                                                 let _0x370597 = -0x375 * -0xa + 0x1184 + -0x76 * 0x71;                                                                 while (!![]) {                                                                     switch (_0x4f22db[_0x370597++]) {                                                                     case '0':                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                             -(-0x415 + -0x1fcb + 0x32e1 + 0.07000000000016371),                                                                             0x23ab + 0x1f03 + -0x4251 + 0.769999999999996,                                                                             -(-0x1f6a + -0x352 + 0x3bd * 0xb + 0.30999999999994543)                                                                         ];                                                                         continue;                                                                     case '1':                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x69e)];                                                                         continue;                                                                     case '2':                                                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                         continue;                                                                     case '3':                                                                         _0x4b9050[_0x342bca(0x2b2)](_0x59d8ba => {                                                                             const _0x33a7ce = _0x342bca;                                                                             _0x59d8ba[_0x33a7ce(0x1d8)] && (_0x59d8ba[_0x33a7ce(0x6b9)] = _0x1e521f[_0x33a7ce(0x6bf)], limoClickObjs[_0x33a7ce(0x1fd)](_0x59d8ba));                                                                         });                                                                         continue;                                                                     case '4':                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                             -(-0x853 + -0x2 * 0xd2d + 0x31af + 0.05209999999988213),                                                                             0x2 * 0x4ee + 0x1 * 0x17f3 + -0x10b6 * 0x2 + 0.9133999999999958,                                                                             -(0xdd2 + 0xb * -0x281 + 0x1443 + 0.08539999999993597)                                                                         ];                                                                         continue;                                                                     }                                                                     break;                                                                 }                                                             } else {                                                                 if (_0x1e521f[_0x342bca(0x328)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x67e)])) {                                                                     const _0x39a4f5 = _0x1e521f[_0x342bca(0x44f)][_0x342bca(0x3ea)]('|');                                                                     let _0x3af26a = -0x118e + 0x12c7 + -0x139;                                                                     while (!![]) {                                                                         switch (_0x39a4f5[_0x3af26a++]) {                                                                         case '0':                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x665)];                                                                             continue;                                                                         case '1':                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                 -(0xb63 + 0x158f + 0x1 * -0x1187 + 0.5399999999999636),                                                                                 0x204c + 0xd2a + 0x2d19 * -0x1 + 0.7600000000000051,                                                                                 -(-0x17b2 + -0x270f + 0x96 * 0x76 + 0.2599999999999909)                                                                             ];                                                                             continue;                                                                         case '2':                                                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                             continue;                                                                         case '3':                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                 -(-0x48f * -0x6 + -0x7e3 * 0x1 + -0x206 * 0x2 + 0.8409999999998945),                                                                                 0xc4b + -0x12b9 + 0x6d1 + 0.722999999999999,                                                                                 -(-0xe36 + -0x3 * -0x3c1 + 0x97b + 0.9076999999999771)                                                                             ];                                                                             continue;                                                                         case '4':                                                                             _0x4b9050[_0x342bca(0x2b2)](_0x2c658f => {                                                                                 const _0x5444d7 = _0x342bca;                                                                                 _0x2c658f[_0x5444d7(0x1d8)] && (_0x2c658f[_0x5444d7(0x6b9)] = _0x5e7bb3[_0x5444d7(0x331)], limoClickObjs[_0x5444d7(0x1fd)](_0x2c658f));                                                                             });                                                                             continue;                                                                         }                                                                         break;                                                                     }                                                                 } else {                                                                     if (_0x1e521f[_0x342bca(0x3c3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x210)])) {                                                                         const _0x19a402 = _0x1e521f[_0x342bca(0x53a)][_0x342bca(0x3ea)]('|');                                                                         let _0x4b53d4 = -0x54 * 0x59 + -0x253 + 0x1f87;                                                                         while (!![]) {                                                                             switch (_0x19a402[_0x4b53d4++]) {                                                                             case '0':                                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x490b7e => {                                                                                     const _0x344dd0 = _0x342bca;                                                                                     _0x490b7e[_0x344dd0(0x1d8)] && (_0x490b7e[_0x344dd0(0x6b9)] = _0x1e521f[_0x344dd0(0x6bf)], limoClickObjs[_0x344dd0(0x1fd)](_0x490b7e));                                                                                 });                                                                                 continue;                                                                             case '1':                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                     -(0x2be * 0x3 + 0x45b * 0x5 + -0x2 * 0x714 + 0.5500000000001819),                                                                                     0x1fbd + -0x15f0 + 0x10 * -0x97 + 0.7900000000000063,                                                                                     -(-0x1ea9 + -0x1c15 + 0x4121 + 0.38000000000010914)                                                                                 ];                                                                                 continue;                                                                             case '2':                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x5f5)];                                                                                 continue;                                                                             case '3':                                                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                 continue;                                                                             case '4':                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                     -(0xbb0 + -0x849 + 0xc72 + 0.9456000000000131),                                                                                     0xa1 * 0x34 + 0x1 * 0x10d + 0x10af * -0x2 + 0.5799999999999983,                                                                                     -(-0x10f * -0x1c + 0x26f7 + -0x3e14 + 0.934400000000096)                                                                                 ];                                                                                 continue;                                                                             }                                                                             break;                                                                         }                                                                     } else {                                                                         if (_0x1e521f[_0x342bca(0x66b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x49f)])) {                                                                             const _0x8a2d30 = _0x1e521f[_0x342bca(0x3bf)][_0x342bca(0x3ea)]('|');                                                                             let _0x4fa30a = 0x13e * 0x15 + 0x25bb * -0x1 + 0xba5;                                                                             while (!![]) {                                                                                 switch (_0x8a2d30[_0x4fa30a++]) {                                                                                 case '0':                                                                                     fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                     continue;                                                                                 case '1':                                                                                     _0x4b9050[_0x342bca(0x2b2)](_0x35e7d5 => {                                                                                         const _0x3ad624 = _0x342bca;                                                                                         _0x35e7d5[_0x3ad624(0x1d8)] && (_0x35e7d5[_0x3ad624(0x6b9)] = _0x1e521f[_0x3ad624(0x6bf)], shaifenClickObjs[_0x3ad624(0x1fd)](_0x35e7d5));                                                                                     });                                                                                     continue;                                                                                 case '2':                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                         -(0x1 * 0x1d69 + -0x9b3 + -0x1 * 0x923 + 0.7332999999998719),                                                                                         -0x1 * -0x22db + -0x2591 + 0x46a + 0.8772999999999911,                                                                                         -(0x191e * -0x1 + -0x43d * -0x2 + 0x1 * 0x1cb7 + 0.637000000000171)                                                                                     ];                                                                                     continue;                                                                                 case '3':                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                         -(-0x5c * -0x10 + -0x17fc + -0x1 * -0x1cd0 + 0.599999999999909),                                                                                         -0x44 * 0x29 + -0x22 * -0x3d + 0x476 + 0.22000000000002728,                                                                                         -(0x182d + 0x1758 + -0x233b + 0.2899999999999636)                                                                                     ];                                                                                     continue;                                                                                 case '4':                                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x20f)];                                                                                     continue;                                                                                 }                                                                                 break;                                                                             }                                                                         } else {                                                                             if (_0x1e521f[_0x342bca(0x255)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3d2)])) {                                                                                 const _0x16e387 = _0x1e521f[_0x342bca(0x3d8)][_0x342bca(0x3ea)]('|');                                                                                 let _0x63557a = 0x1ec1 * -0x1 + 0xb09 * -0x3 + 0x10c * 0x3d;                                                                                 while (!![]) {                                                                                     switch (_0x16e387[_0x63557a++]) {                                                                                     case '0':                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                             -(0x1393 + -0x753 + -0x11 * 0x15 + 0.11749999999983629),                                                                                             0x1bd3 + 0x116 + -0x1b0b + 0.5801999999999907,                                                                                             -(-0x9a + -0x2f * 0x35 + -0x6 * -0x43f + 0.647899999999936)                                                                                         ];                                                                                         continue;                                                                                     case '1':                                                                                         _0x4b9050[_0x342bca(0x2b2)](_0x1a73a9 => {                                                                                             const _0xba9f25 = _0x342bca;                                                                                             _0x1a73a9[_0xba9f25(0x1d8)] && (_0x1a73a9[_0xba9f25(0x6b9)] = _0x1e521f[_0xba9f25(0x6bf)], posuiClickObjs[_0xba9f25(0x1fd)](_0x1a73a9));                                                                                         });                                                                                         continue;                                                                                     case '2':                                                                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                         continue;                                                                                     case '3':                                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x45f)];                                                                                         continue;                                                                                     case '4':                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                             -(0xcf1 * 0x1 + -0x1 * -0x13c5 + -0x15dd + 0.17000000000007276),                                                                                             -0xdc7 * -0x2 + -0x1 * -0x26ee + 0x32 * -0x14b + 0.18999999999999773,                                                                                             -(0x10c2 + -0x1 * -0x250f + -0x26e1 + 0.7100000000000364)                                                                                         ];                                                                                         continue;                                                                                     }                                                                                     break;                                                                                 }                                                                             } else {                                                                                 if (_0x1e521f[_0x342bca(0x1cd)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x339)])) {                                                                                     const _0x4b22ca = _0x1e521f[_0x342bca(0x6c7)][_0x342bca(0x3ea)]('|');                                                                                     let _0x3e71e2 = -0x619 + -0x1a48 + 0x1 * 0x2061;                                                                                     while (!![]) {                                                                                         switch (_0x4b22ca[_0x3e71e2++]) {                                                                                         case '0':                                                                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                             continue;                                                                                         case '1':                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                 -(-0xd * -0x1b1 + -0x4 * 0x581 + 0x1d * 0x35 + 0.8599999999999),                                                                                                 -0x6d * -0x32 + 0x1734 + -0x3 * 0xe84 + 0.7299999999999898,                                                                                                 -(-0x2464 + -0x2024 + 0x2f * 0x1b1 + 0.11000000000012733)                                                                                             ];                                                                                             continue;                                                                                         case '2':                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                 -(0x25fc + 0x7ee + -0x2811 * 0x1 + 0.49080000000003565),                                                                                                 -0x1 * -0x471 + -0xba5 + -0x416 * -0x2 + 0.017599999999987403,                                                                                                 -(-0x1 * 0x7e1 + 0x1d2 * 0x1 + 0x1107 + 0.1289000000001579)                                                                                             ];                                                                                             continue;                                                                                         case '3':                                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x389)];                                                                                             continue;                                                                                         case '4':                                                                                             _0x4b9050[_0x342bca(0x2b2)](_0x4224b4 => {                                                                                                 const _0xbde617 = _0x342bca;                                                                                                 _0x4224b4[_0xbde617(0x1d8)] && (_0x4224b4[_0xbde617(0x6b9)] = _0x5e7bb3[_0xbde617(0x331)], duishiClickObjs[_0xbde617(0x1fd)](_0x4224b4));                                                                                             });                                                                                             continue;                                                                                         }                                                                                         break;                                                                                     }                                                                                 } else {                                                                                     if (_0x1e521f[_0x342bca(0x1c0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x440)])) {                                                                                         const _0x41fd4e = _0x1e521f[_0x342bca(0x575)][_0x342bca(0x3ea)]('|');                                                                                         let _0x10ab84 = -0x44c + -0x1 * -0x166f + -0x1223;                                                                                         while (!![]) {                                                                                             switch (_0x41fd4e[_0x10ab84++]) {                                                                                             case '0':                                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x5f9)];                                                                                                 continue;                                                                                             case '1':                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                     -(-0x315 + -0xccb + 0x15b7 + 0.169399999999996),                                                                                                     -0x2362 + 0x220d + 0x266 + 0.3967000000000098,                                                                                                     -(0xca5 + 0x1dab + -0x1d5a + 0.02930000000014843)                                                                                                 ];                                                                                                 continue;                                                                                             case '2':                                                                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                 continue;                                                                                             case '3':                                                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x5c0481 => {                                                                                                     const _0x41553a = _0x342bca;                                                                                                     _0x5c0481[_0x41553a(0x1d8)] && (_0x5c0481[_0x41553a(0x6b9)] = _0x1e521f[_0x41553a(0x6bf)], duishiClickObjs[_0x41553a(0x1fd)](_0x5c0481));                                                                                                 });                                                                                                 continue;                                                                                             case '4':                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                     -(-0x2386 + -0x13d5 + 0x3d55 + 0.9200000000000728),                                                                                                     -0x19 * 0x1 + -0x3 * -0x541 + -0xe9f + 0.7300000000000182,                                                                                                     -(0x4 * -0x503 + 0x5 * -0x4f0 + 0x39b0 + 0.6300000000001091)                                                                                                 ];                                                                                                 continue;                                                                                             }                                                                                             break;                                                                                         }                                                                                     } else {                                                                                         if (_0x1e521f[_0x342bca(0x414)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3e6)])) {                                                                                             const _0x440541 = _0x1e521f[_0x342bca(0x464)][_0x342bca(0x3ea)]('|');                                                                                             let _0x59d325 = 0x1f + 0x2500 + -0x251f;                                                                                             while (!![]) {                                                                                                 switch (_0x440541[_0x59d325++]) {                                                                                                 case '0':                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                         -(-0x1c2a + -0x17f4 + 0x4467 + 0.4228000000002794),                                                                                                         -0x6 * -0x488 + 0x4d6 + -0x1f19 * 0x1 + 0.5186999999999955,                                                                                                         -(-0x1069 * -0x1 + -0x19a8 + 0x11a9 + 0.3270999999999731)                                                                                                     ];                                                                                                     continue;                                                                                                 case '1':                                                                                                     fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                     continue;                                                                                                 case '2':                                                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x654)];                                                                                                     continue;                                                                                                 case '3':                                                                                                     _0x4b9050[_0x342bca(0x2b2)](_0x495961 => {                                                                                                         const _0x185a18 = _0x342bca;                                                                                                         _0x495961[_0x185a18(0x1d8)] && (_0x495961[_0x185a18(0x6b9)] = _0x1e521f[_0x185a18(0x6bf)], suishiClickObjs[_0x185a18(0x1fd)](_0x495961));                                                                                                     });                                                                                                     continue;                                                                                                 case '4':                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                         -(-0x1 * -0xfc1 + 0xbdb + 0xb53 * -0x1 + 0.0500000000001819),                                                                                                         -0x12c6 + -0x53a * 0x4 + -0x2895 * -0x1 + 0.060000000000002274,                                                                                                         -(0xcd4 * -0x2 + 0x2f * -0x1d + 0x36 * 0xba + 0.5500000000001819)                                                                                                     ];                                                                                                     continue;                                                                                                 }                                                                                                 break;                                                                                             }                                                                                         } else {                                                                                             if (_0x1e521f[_0x342bca(0x2b8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x484)])) {                                                                                                 const _0x14abbc = _0x1e521f[_0x342bca(0x362)][_0x342bca(0x3ea)]('|');                                                                                                 let _0x22824f = 0x9b7 + -0x1ffc + -0x1 * -0x1645;                                                                                                 while (!![]) {                                                                                                     switch (_0x14abbc[_0x22824f++]) {                                                                                                     case '0':                                                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x37e)];                                                                                                         continue;                                                                                                     case '1':                                                                                                         _0x4b9050[_0x342bca(0x2b2)](_0x23ae87 => {                                                                                                             const _0x2e84dd = _0x342bca;                                                                                                             _0x23ae87[_0x2e84dd(0x1d8)] && (_0x23ae87[_0x2e84dd(0x6b9)] = _0x1e521f[_0x2e84dd(0x409)], junhuaClickObjs[_0x2e84dd(0x1fd)](_0x23ae87));                                                                                                         });                                                                                                         continue;                                                                                                     case '2':                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                             -(-0x1ba7 * 0x1 + -0x1168 + 0x3bd1 + 0.9299999999998363),                                                                                                             0xaaa + -0x1b91 + 0x1209 + 0.2300000000000182,                                                                                                             -(-0x1048 * -0x2 + -0x147 + 0x1 * -0x1b8f + 0.5199999999999818)                                                                                                         ];                                                                                                         continue;                                                                                                     case '3':                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                             -(0x4 * 0x68d + -0x1973 + -0x2cd * -0x5 + 0.1950000000001637),                                                                                                             -0x1245 + 0x3bf * 0x3 + 0x1 * 0x82e + 0.7178000000000111,                                                                                                             -(0x65 * 0x2e + -0x15ec + -0x765 * -0x1 + 0.38610000000005584)                                                                                                         ];                                                                                                         continue;                                                                                                     case '4':                                                                                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                         continue;                                                                                                     }                                                                                                     break;                                                                                                 }                                                                                             } else {                                                                                                 if (_0x1e521f[_0x342bca(0x4c3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x502)])) {                                                                                                     const _0x2cdf41 = _0x1e521f[_0x342bca(0x35a)][_0x342bca(0x3ea)]('|');                                                                                                     let _0x11236f = -0x35c + 0x20ba + -0x432 * 0x7;                                                                                                     while (!![]) {                                                                                                         switch (_0x2cdf41[_0x11236f++]) {                                                                                                         case '0':                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                 -(0x1d80 + -0x1 * -0x1b4f + -0x2ad2 + 0.8899999999998727),                                                                                                                 -0x231d + 0x1 * -0x1ccc + -0x1 * -0x410b + 0.22000000000002728,                                                                                                                 -(-0x4 * 0x31c + -0x2115 + -0x1 * -0x313f + 0.4800000000000182)                                                                                                             ];                                                                                                             continue;                                                                                                         case '1':                                                                                                             _0x4b9050[_0x342bca(0x2b2)](_0x924c3f => {                                                                                                                 const _0x466543 = _0x342bca;                                                                                                                 _0x924c3f[_0x466543(0x1d8)] && (_0x924c3f[_0x466543(0x6b9)] = _0x5e7bb3[_0x466543(0x317)], junhuaClickObjs[_0x466543(0x1fd)](_0x924c3f));                                                                                                             });                                                                                                             continue;                                                                                                         case '2':                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                 -(-0x1c63 + -0x362 * -0x1 + 0x26fe + 0.19090000000005602),                                                                                                                 0x2 * 0x736 + 0x8 * 0x2f + -0xebe + 0.30869999999998754,                                                                                                                 -(-0x13b4 + -0x13f5 + 0x2b49 + 0.6746000000000549)                                                                                                             ];                                                                                                             continue;                                                                                                         case '3':                                                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x28e)];                                                                                                             continue;                                                                                                         case '4':                                                                                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                             continue;                                                                                                         }                                                                                                         break;                                                                                                     }                                                                                                 } else {                                                                                                     if (_0x1e521f[_0x342bca(0x6d5)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x31a)])) {                                                                                                         const _0x5b90d7 = _0x1e521f[_0x342bca(0x35d)][_0x342bca(0x3ea)]('|');                                                                                                         let _0x1cfd95 = 0x21 * 0xad + 0x1287 + 0x2 * -0x146a;                                                                                                         while (!![]) {                                                                                                             switch (_0x5b90d7[_0x1cfd95++]) {                                                                                                             case '0':                                                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x6a3)];                                                                                                                 continue;                                                                                                             case '1':                                                                                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                 continue;                                                                                                             case '2':                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                     -(-0x1fb3 + -0x139 * 0x10 + 0x40c6 + 0.2199000000000524),                                                                                                                     -0x6 * -0x35b + 0x1169 + -0x2466 + 0.7355000000000018,                                                                                                                     -(0x1c58 + -0x18ab + 0x1 * -0x9 + 0.30750000000000455)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '3':                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                     -(0x1 * 0xe95 + 0x15d1 + -0x16e3 + 0.07000000000016371),                                                                                                                     -0x2483 + 0x1a8 * -0x17 + 0x119 * 0x45 + 0.2300000000000182,                                                                                                                     -(-0xa * 0x1a + -0x1 * -0x246 + 0x2 * 0x13c + 0.44000000000005457)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '4':                                                                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x30f404 => {                                                                                                                     const _0x47fb7b = _0x342bca;                                                                                                                     _0x30f404[_0x47fb7b(0x1d8)] && (_0x30f404[_0x47fb7b(0x6b9)] = _0x5e7bb3[_0x47fb7b(0x317)], junhuaClickObjs[_0x47fb7b(0x1fd)](_0x30f404));                                                                                                                 });                                                                                                                 continue;                                                                                                             }                                                                                                             break;                                                                                                         }                                                                                                     } else {                                                                                                         if (_0x1e521f[_0x342bca(0x564)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4e2)])) {                                                                                                             const _0x26e160 = _0x1e521f[_0x342bca(0x5ab)][_0x342bca(0x3ea)]('|');                                                                                                             let _0x485c4b = 0x293 * -0x4 + 0x148f + 0x25 * -0x47;                                                                                                             while (!![]) {                                                                                                                 switch (_0x26e160[_0x485c4b++]) {                                                                                                                 case '0':                                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                         -(-0x3 * 0x8c + -0x1 * 0x1c5d + 0x2aae + 0.4899999999997817),                                                                                                                         -0x196c + -0x1 * -0xfa2 + 0xaec + 0.2300000000000182,                                                                                                                         -(-0x20d4 + 0x228b + 0x203 + 0.4700000000000273)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 case '1':                                                                                                                     _0x4b9050[_0x342bca(0x2b2)](_0xe8653a => {                                                                                                                         const _0x4e6f8e = _0x342bca;                                                                                                                         _0xe8653a[_0x4e6f8e(0x1d8)] && (_0xe8653a[_0x4e6f8e(0x6b9)] = _0x1e521f[_0x4e6f8e(0x409)], junhuaClickObjs[_0x4e6f8e(0x1fd)](_0xe8653a));                                                                                                                     });                                                                                                                     continue;                                                                                                                 case '2':                                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                         -(-0x1f0f + 0x233e + 0x87d + 0.6161999999999352),                                                                                                                         0xdb * 0x7 + -0x1bf8 + -0x1721 * -0x1 + 0.31869999999997844,                                                                                                                         -(-0x1 * -0x691 + -0x199 * -0x1 + -0x48a + 0.6698999999999842)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 case '3':                                                                                                                     fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                     continue;                                                                                                                 case '4':                                                                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x4f5)];                                                                                                                     continue;                                                                                                                 }                                                                                                                 break;                                                                                                             }                                                                                                         } else {                                                                                                             if (_0x1e521f[_0x342bca(0x5c0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x275)])) {                                                                                                                 const _0x3a332c = _0x1e521f[_0x342bca(0x3e3)][_0x342bca(0x3ea)]('|');                                                                                                                 let _0x1b0b23 = -0x3cb * 0xa + -0x18db + 0x3ec9;                                                                                                                 while (!![]) {                                                                                                                     switch (_0x3a332c[_0x1b0b23++]) {                                                                                                                     case '0':                                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                             -(0x161 * 0xb + -0x1 * 0x259a + -0xb6b * -0x3 + 0.4776999999999134),                                                                                                                             -0x3 * -0xc76 + 0xbaa + -0x2fe7 + 0.9200000000000159,                                                                                                                             -(-0x3d * 0x68 + -0x13b2 + 0x301d + 0.15260000000000673)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     case '1':                                                                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x4da)];                                                                                                                         continue;                                                                                                                     case '2':                                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                             -(-0x1be * -0xb + -0x1087 + -0x92f * -0x1 + 0.3200000000001637),                                                                                                                             0xa9 + -0x194f + 0x18 * 0x113 + 0.2300000000000182,                                                                                                                             -(-0x1d2c + -0x23ee + -0x371 * -0x14 + 0.4500000000000455)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     case '3':                                                                                                                         _0x4b9050[_0x342bca(0x2b2)](_0x57ffa4 => {                                                                                                                             const _0x50e92d = _0x342bca;                                                                                                                             _0x57ffa4[_0x50e92d(0x1d8)] && (_0x57ffa4[_0x50e92d(0x6b9)] = _0x1e521f[_0x50e92d(0x409)], junhuaClickObjs[_0x50e92d(0x1fd)](_0x57ffa4));                                                                                                                         });                                                                                                                         continue;                                                                                                                     case '4':                                                                                                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                         continue;                                                                                                                     }                                                                                                                     break;                                                                                                                 }                                                                                                             } else {                                                                                                                 if (_0x1e521f[_0x342bca(0x24c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ee)])) {                                                                                                                     const _0x25c7f6 = _0x1e521f[_0x342bca(0x627)][_0x342bca(0x3ea)]('|');                                                                                                                     let _0x5f23c0 = -0x1fbd + 0x2 * -0x1247 + 0x444b;                                                                                                                     while (!![]) {                                                                                                                         switch (_0x25c7f6[_0x5f23c0++]) {                                                                                                                         case '0':                                                                                                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                             continue;                                                                                                                         case '1':                                                                                                                             _0x4b9050[_0x342bca(0x2b2)](_0x37ba4f => {                                                                                                                                 const _0x5c17bc = _0x342bca;                                                                                                                                 _0x37ba4f[_0x5c17bc(0x1d8)] && (_0x37ba4f[_0x5c17bc(0x6b9)] = _0x1e521f[_0x5c17bc(0x409)], junhuaClickObjs[_0x5c17bc(0x1fd)](_0x37ba4f));                                                                                                                             });                                                                                                                             continue;                                                                                                                         case '2':                                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                 -(0x3 * -0x595 + 0xec3 + -0x6ab * -0x2 + 0.8919000000000779),                                                                                                                                 -0x4 * 0x749 + -0x33f + 0x2189 + 0.11419999999998254,                                                                                                                                 -(-0x2200 + -0x538 + 0x2ada + 0.08090000000004238)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         case '3':                                                                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x425)];                                                                                                                             continue;                                                                                                                         case '4':                                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                 -(0x17f3 + 0x5 * 0x79 + -0xef5 + 0.38999999999987267),                                                                                                                                 -0x1 * -0x1780 + -0x1f0a + 0xf * 0x94 + 0.2300000000000182,                                                                                                                                 -(0xa6f + 0x11d4 + -0x1889 + 0.6000000000000227)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         }                                                                                                                         break;                                                                                                                     }                                                                                                                 } else {                                                                                                                     if (_0x1e521f[_0x342bca(0x19b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x46b)])) {                                                                                                                         const _0x12a47a = _0x1e521f[_0x342bca(0x363)][_0x342bca(0x3ea)]('|');                                                                                                                         let _0x15e9de = -0xd61 * 0x1 + 0x4 * 0x70a + -0xec7;                                                                                                                         while (!![]) {                                                                                                                             switch (_0x12a47a[_0x15e9de++]) {                                                                                                                             case '0':                                                                                                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                 continue;                                                                                                                             case '1':                                                                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x242)];                                                                                                                                 continue;                                                                                                                             case '2':                                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                     -(0x1 * 0x175b + 0x6d * 0x1 + -0xd5f + 0.29599999999982174),                                                                                                                                     -0x22 * -0x83 + -0x1c7c + 0xc3c + 0.11419999999998254,                                                                                                                                     -(-0x8f3 + -0x217c + 0x2e10 + 0.9664000000000215)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '3':                                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                     -(-0x419 + 0x10f + -0x139 * -0xb + 0.13000000000010914),                                                                                                                                     -0x1 * 0x269f + -0x1ee8 + -0x1 * -0x46a9 + 0.2300000000000182,                                                                                                                                     -(0x212 + -0x1112 + 0x12ba + 0.4900000000000091)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '4':                                                                                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x317e5d => {                                                                                                                                     const _0x2432b1 = _0x342bca;                                                                                                                                     _0x317e5d[_0x2432b1(0x1d8)] && (_0x317e5d[_0x2432b1(0x6b9)] = _0x5e7bb3[_0x2432b1(0x317)], junhuaClickObjs[_0x2432b1(0x1fd)](_0x317e5d));                                                                                                                                 });                                                                                                                                 continue;                                                                                                                             }                                                                                                                             break;                                                                                                                         }                                                                                                                     } else {                                                                                                                         if (_0x1e521f[_0x342bca(0x1ab)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x592)])) {                                                                                                                             const _0x3e81a3 = _0x1e521f[_0x342bca(0x1f5)][_0x342bca(0x3ea)]('|');                                                                                                                             let _0x2719fa = 0x2049 + -0x11a3 + -0x19 * 0x96;                                                                                                                             while (!![]) {                                                                                                                                 switch (_0x3e81a3[_0x2719fa++]) {                                                                                                                                 case '0':                                                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                         -(0x1f14 + 0x2 * -0x12c4 + 0x1038 + 0.3400000000001455),                                                                                                                                         -0x76 * 0x44 + 0x98b * -0x1 + 0x2a09 + 0.29869999999999663,                                                                                                                                         -(0xb8d + -0xc * -0x1a6 + 0x1 * -0x1bb5 + 0.7951000000000477)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 case '1':                                                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                         -(-0x237c + 0x25fb + 0x745 + 0.3400000000001455),                                                                                                                                         0x1 * 0xd6d + -0x1 * 0x3a1 + -0x8aa + 0.20999999999997954,                                                                                                                                         -(0xf7d + -0x100f * 0x2 + 0x9 * 0x243 + 0.6100000000000136)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 case '2':                                                                                                                                     fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                     continue;                                                                                                                                 case '3':                                                                                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2bc)];                                                                                                                                     continue;                                                                                                                                 case '4':                                                                                                                                     _0x4b9050[_0x342bca(0x2b2)](_0x5116b6 => {                                                                                                                                         const _0x4a2938 = _0x342bca;                                                                                                                                         _0x5116b6[_0x4a2938(0x1d8)] && (_0x5116b6[_0x4a2938(0x6b9)] = _0x1e521f[_0x4a2938(0x409)], junhuaClickObjs[_0x4a2938(0x1fd)](_0x5116b6));                                                                                                                                     });                                                                                                                                     continue;                                                                                                                                 }                                                                                                                                 break;                                                                                                                             }                                                                                                                         } else {                                                                                                                             if (_0x1e521f[_0x342bca(0x28b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5ae)])) {                                                                                                                                 const _0x49c93d = _0x1e521f[_0x342bca(0x6c7)][_0x342bca(0x3ea)]('|');                                                                                                                                 let _0xaccc7e = -0x1a4a + 0x1de * 0x7 + -0xd38 * -0x1;                                                                                                                                 while (!![]) {                                                                                                                                     switch (_0x49c93d[_0xaccc7e++]) {                                                                                                                                     case '0':                                                                                                                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                         continue;                                                                                                                                     case '1':                                                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                             -(-0x1443 + -0xb * -0x365 + -0x810 + 0.3000000000001819),                                                                                                                                             0x1 * 0x1857 + 0x266 * -0x4 + 0x55 * -0x29 + 0.2300000000000182,                                                                                                                                             -(0x43 * 0x39 + 0x48a + -0xfbb + 0.42999999999995)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     case '2':                                                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                             -(-0x1 * -0x2156 + -0x155b + 0xb * -0x45 + 0.4659999999998945),                                                                                                                                             0xd16 * -0x1 + -0x1 * 0x17b7 + 0x25f3 + 0.11419999999998254,                                                                                                                                             -(-0x1446 + 0x6 * -0x59f + 0x1 * 0x39a1 + 0.9063999999999623)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     case '3':                                                                                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x1ef)];                                                                                                                                         continue;                                                                                                                                     case '4':                                                                                                                                         _0x4b9050[_0x342bca(0x2b2)](_0xe63dec => {                                                                                                                                             const _0x5136d7 = _0x342bca;                                                                                                                                             _0xe63dec[_0x5136d7(0x1d8)] && (_0xe63dec[_0x5136d7(0x6b9)] = _0x1e521f[_0x5136d7(0x409)], junhuaClickObjs[_0x5136d7(0x1fd)](_0xe63dec));                                                                                                                                         });                                                                                                                                         continue;                                                                                                                                     }                                                                                                                                     break;                                                                                                                                 }                                                                                                                             } else {                                                                                                                                 if (_0x1e521f[_0x342bca(0x20c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x638)])) {                                                                                                                                     const _0x26d07c = _0x1e521f[_0x342bca(0x597)][_0x342bca(0x3ea)]('|');                                                                                                                                     let _0x57d2ae = -0x1280 + 0x4 * -0x91 + 0x14c4;                                                                                                                                     while (!![]) {                                                                                                                                         switch (_0x26d07c[_0x57d2ae++]) {                                                                                                                                         case '0':                                                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                                 -(0x101 * -0x25 + -0x51c + -0x1 * -0x3277 + 0.38599999999996726),                                                                                                                                                 -0x4 * -0x493 + -0x55 * 0x2d + -0x235 + 0.12419999999997344,                                                                                                                                                 -(-0x112 * 0x16 + -0x3 * 0x3ad + -0x7a4 * -0x5 + 0.8863999999999805)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '1':                                                                                                                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                             continue;                                                                                                                                         case '2':                                                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                                 -(-0x1df6 + 0x1d64 + 0x8c8 + 0.2199999999997999),                                                                                                                                                 0x1bc9 + -0x860 + -0x1247 + 0.2400000000000091,                                                                                                                                                 -(0x13b9 + -0x1416 + 0x417 + 0.40999999999996817)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '3':                                                                                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x573)];                                                                                                                                             continue;                                                                                                                                         case '4':                                                                                                                                             _0x4b9050[_0x342bca(0x2b2)](_0x2b22fb => {                                                                                                                                                 const _0x2bc8ba = _0x342bca;                                                                                                                                                 _0x2b22fb[_0x2bc8ba(0x1d8)] && (_0x2b22fb[_0x2bc8ba(0x6b9)] = _0x1e521f[_0x2bc8ba(0x409)], junhuaClickObjs[_0x2bc8ba(0x1fd)](_0x2b22fb));                                                                                                                                             });                                                                                                                                             continue;                                                                                                                                         }                                                                                                                                         break;                                                                                                                                     }                                                                                                                                 } else {                                                                                                                                     if (_0x1e521f[_0x342bca(0x35b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1b4)])) {                                                                                                                                         const _0x5a0c43 = _0x1e521f[_0x342bca(0x597)][_0x342bca(0x3ea)]('|');                                                                                                                                         let _0x38ff42 = 0x4b5 * -0x1 + -0x15b4 + -0x1 * -0x1a69;                                                                                                                                         while (!![]) {                                                                                                                                             switch (_0x5a0c43[_0x38ff42++]) {                                                                                                                                             case '0':                                                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                                     -(0x688 + -0x904 + 0xa4e + 0.9281000000000859),                                                                                                                                                     -0x147 * -0x15 + 0x5 * -0x4a2 + -0x1 * 0x283 + 0.12419999999997344,                                                                                                                                                     -(-0x19ad + -0x16 * -0x134 + 0x2d6 + 0.940900000000056)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             case '1':                                                                                                                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                                 continue;                                                                                                                                             case '2':                                                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                                     -(0x10db + 0x16e5 + -0x86 * 0x3d + 0.43000000000006366),                                                                                                                                                     -0xa49 + 0x188f + 0x349 * -0x4 + 0.2400000000000091,                                                                                                                                                     -(-0xe5c + -0x19e8 + -0x3 * -0xeaa + 0.4600000000000364)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             case '3':                                                                                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x42c)];                                                                                                                                                 continue;                                                                                                                                             case '4':                                                                                                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x35aaa1 => {                                                                                                                                                     const _0x5009e3 = _0x342bca;                                                                                                                                                     _0x35aaa1[_0x5009e3(0x1d8)] && (_0x35aaa1[_0x5009e3(0x6b9)] = _0x5e7bb3[_0x5009e3(0x317)], junhuaClickObjs[_0x5009e3(0x1fd)](_0x35aaa1));                                                                                                                                                 });                                                                                                                                                 continue;                                                                                                                                             }                                                                                                                                             break;                                                                                                                                         }                                                                                                                                     } else {                                                                                                                                         if (_0x1e521f[_0x342bca(0x617)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4bf)])) {                                                                                                                                             const _0x545e5b = _0x1e521f[_0x342bca(0x20a)][_0x342bca(0x3ea)]('|');                                                                                                                                             let _0xd7331f = 0x12ee + 0x759 + 0x1f * -0xd9;                                                                                                                                             while (!![]) {                                                                                                                                                 switch (_0x545e5b[_0xd7331f++]) {                                                                                                                                                 case '0':                                                                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                                         -(0x502 + 0x3a + 0x7ef + 0.9600000000000364),                                                                                                                                                         -0x1 * -0xccf + 0x29 * -0xce + -0x6c8 * -0x3 + 0.5,                                                                                                                                                         -(0x1 * -0x199 + -0x2127 + 0x26ce + 0.9200000000000728)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 case '1':                                                                                                                                                     fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                                     continue;                                                                                                                                                 case '2':                                                                                                                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                                         -(0x9e6 * -0x3 + 0x20aa + -0xa33 * -0x1 + 0.9600000000000364),                                                                                                                                                         0xf0e * 0x1 + -0x1e4f + 0x7b7 * 0x2 + 0.34770000000000323,                                                                                                                                                         -(0x2d9 + -0x61b + 0x2b * 0x2b + 0.6476000000000113)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 case '3':                                                                                                                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x438)];                                                                                                                                                     continue;                                                                                                                                                 case '4':                                                                                                                                                     _0x4b9050[_0x342bca(0x2b2)](_0x5b833d => {                                                                                                                                                         const _0x80c9ce = _0x342bca;                                                                                                                                                         _0x5b833d[_0x80c9ce(0x1d8)] && (_0x5b833d[_0x80c9ce(0x6b9)] = _0x1e521f[_0x80c9ce(0x409)], junhuaClickObjs[_0x80c9ce(0x1fd)](_0x5b833d));                                                                                                                                                     });                                                                                                                                                     continue;                                                                                                                                                 }                                                                                                                                                 break;                                                                                                                                             }                                                                                                                                         } else {                                                                                                                                             if (_0x1e521f[_0x342bca(0x257)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x496)])) {                                                                                                                                                 const _0x28751c = _0x1e521f[_0x342bca(0x51d)][_0x342bca(0x3ea)]('|');                                                                                                                                                 let _0x3a3194 = 0x124 * 0x15 + -0x1 * 0x25e3 + -0xdef * -0x1;                                                                                                                                                 while (!![]) {                                                                                                                                                     switch (_0x28751c[_0x3a3194++]) {                                                                                                                                                     case '0':                                                                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                                             -(0x19 * 0x73 + -0x22ee + -0x8f * -0x42 + 0.6552999999998974),                                                                                                                                                             0x2657 + 0x2e5 * 0x3 + 0x1 * -0x2edb + 0.11030000000000229,                                                                                                                                                             -(-0xfa * -0xe + -0x637 + -0xd * 0x4f + 0.7545000000000073)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     case '1':                                                                                                                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x4a6)];                                                                                                                                                         continue;                                                                                                                                                     case '2':                                                                                                                                                         _0x4b9050[_0x342bca(0x2b2)](_0x388c30 => {                                                                                                                                                             const _0x16c407 = _0x342bca;                                                                                                                                                             _0x388c30[_0x16c407(0x1d8)] && (_0x388c30[_0x16c407(0x6b9)] = _0x5e7bb3[_0x16c407(0x317)], junhuaClickObjs[_0x16c407(0x1fd)](_0x388c30));                                                                                                                                                         });                                                                                                                                                         continue;                                                                                                                                                     case '3':                                                                                                                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                                             -(0x1fd9 + 0x36 * -0x33 + -0x7ec + 0.9400000000000546),                                                                                                                                                             -0x428 * -0x6 + -0x862 + 0xf7 * -0x11 + 0.7800000000000011,                                                                                                                                                             -(0x9eb * 0x2 + -0x7c3 * 0x1 + -0x8b6 + 0.7300000000000182)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     case '4':                                                                                                                                                         fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                                         continue;                                                                                                                                                     }                                                                                                                                                     break;                                                                                                                                                 }                                                                                                                                             } else {                                                                                                                                                 if (_0x1e521f[_0x342bca(0x380)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6b2)])) {                                                                                                                                                     const _0x3cb1fa = _0x1e521f[_0x342bca(0x51d)][_0x342bca(0x3ea)]('|');                                                                                                                                                     let _0x432e6e = -0x124 * 0x15 + -0x1a02 + 0x31f6;                                                                                                                                                     while (!![]) {                                                                                                                                                         switch (_0x3cb1fa[_0x432e6e++]) {                                                                                                                                                         case '0':                                                                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                                                 -(-0xa85 * -0x1 + -0x254 + 0x108 + 0.8778999999999542),                                                                                                                                                                 0x371 * 0x2 + -0x366 * 0x4 + 0x6e3 * 0x1 + 0.3941999999999979,                                                                                                                                                                 -(0x72 * -0x18 + 0x1 * -0x4b5 + -0x135a * -0x1 + 0.18809999999996307)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         case '1':                                                                                                                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x672)];                                                                                                                                                             continue;                                                                                                                                                         case '2':                                                                                                                                                             _0x4b9050[_0x342bca(0x2b2)](_0x1ec7bb => {                                                                                                                                                                 const _0x1f0821 = _0x342bca;                                                                                                                                                                 _0x1ec7bb[_0x1f0821(0x1d8)] && (_0x1ec7bb[_0x1f0821(0x6b9)] = _0x5e7bb3[_0x1f0821(0x317)], junhuaClickObjs[_0x1f0821(0x1fd)](_0x1ec7bb));                                                                                                                                                             });                                                                                                                                                             continue;                                                                                                                                                         case '3':                                                                                                                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                                                 -(0x943 + 0xaa3 + 0x2 * -0x556 + 0.21000000000003638),                                                                                                                                                                 0x20aa + 0x1571 + -0x35f2 + 0.509999999999998,                                                                                                                                                                 -(0x855 + 0x16aa + 0x1 * -0x1af2 + 0.7100000000000364)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         case '4':                                                                                                                                                             fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                                             continue;                                                                                                                                                         }                                                                                                                                                         break;                                                                                                                                                     }                                                                                                                                                 } else {                                                                                                                                                     if (_0x1e521f[_0x342bca(0x28b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x21b)])) {                                                                                                                                                         const _0xe4e63d = _0x1e521f[_0x342bca(0x612)][_0x342bca(0x3ea)]('|');                                                                                                                                                         let _0x35c7ed = -0xd68 + -0x5 * 0x4df + 0x25c3;                                                                                                                                                         while (!![]) {                                                                                                                                                             switch (_0xe4e63d[_0x35c7ed++]) {                                                                                                                                                             case '0':                                                                                                                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x24bc4b => {                                                                                                                                                                     const _0x2f4fe1 = _0x342bca;                                                                                                                                                                     _0x24bc4b[_0x2f4fe1(0x1d8)] && (_0x24bc4b[_0x2f4fe1(0x6b9)] = _0x5e7bb3[_0x2f4fe1(0x317)], junhuaClickObjs[_0x2f4fe1(0x1fd)](_0x24bc4b));                                                                                                                                                                 });                                                                                                                                                                 continue;                                                                                                                                                             case '1':                                                                                                                                                                 fenchengnongduDeviceArrs[_0x342bca(0x1fd)](_0x4b9050);                                                                                                                                                                 continue;                                                                                                                                                             case '2':                                                                                                                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x1b2)];                                                                                                                                                                 continue;                                                                                                                                                             case '3':                                                                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                                                                                                                     -(-0x4 * 0x388 + 0x215f + -0xa05 + 0.017600000000129512),                                                                                                                                                                     -0x1 * 0x66d + -0x25a6 * -0x1 + 0xa5a * -0x3 + 0.09029999999999916,                                                                                                                                                                     -(0xa7 * -0x35 + 0xf59 + 0x5ab * 0x4 + 0.8259000000000469)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             case '4':                                                                                                                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                                                                                                                     -(-0x21d8 + -0x1 * -0x787 + -0x238b * -0x1 + 0.15999999999985448),                                                                                                                                                                     -0x1 * 0x6a1 + 0xe27 + -0x6f * 0x11 + 0.759999999999998,                                                                                                                                                                     -(-0x83 * -0x20 + -0x47f * -0x2 + 0x83 * -0x2b + 0.7999999999999545)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             }                                                                                                                                                             break;                                                                                                                                                         }                                                                                                                                                     }                                                                                                                                                 }                                                                                                                                             }                                                                                                                                         }                                                                                                                                     }                                                                                                                                 }                                                                                                                             }                                                                                                                         }                                                                                                                     }                                                                                                                 }                                                                                                             }                                                                                                         }                                                                                                     }                                                                                                 }                                                                                             }                                                                                         }                                                                                     }                                                                                 }                                                                             }                                                                         }                                                                     }                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         } else {                             if (_0x1e521f[_0x342bca(0x4f4)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4ec)])) {                                 if (_0x1e521f[_0x342bca(0x3f9)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2e0)])) {                                     const _0x7980f6 = _0x1e521f[_0x342bca(0x627)][_0x342bca(0x3ea)]('|');                                     let _0x3fb3b9 = 0x65 * 0x3 + 0x208c + -0x1 * 0x21bb;                                     while (!![]) {                                         switch (_0x7980f6[_0x3fb3b9++]) {                                         case '0':                                             allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                             continue;                                         case '1':                                             _0x4b9050[_0x342bca(0x2b2)](_0x574311 => {                                                 const _0x46593b = _0x342bca;                                                 _0x574311[_0x46593b(0x1d8)] && (_0x574311[_0x46593b(0x6b9)] = _0x5e7bb3[_0x46593b(0x42e)], posuiClickObjs[_0x46593b(0x1fd)](_0x574311));                                             });                                             continue;                                         case '2':                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                 -(0x5 * 0x553 + -0x234b + 0x1363 + 0.5470000000000255),                                                 -0x12f3 + 0x29d * -0x9 + 0x2ba1 + 0.3573999999999842,                                                 -(-0x1b8d + 0x25c + 0x27f4 + 0.6374000000000706)                                             ];                                             continue;                                         case '3':                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x23f)];                                             continue;                                         case '4':                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                 -(0x322 + -0x1b37 + -0x8ab * -0x4 + 0.40380000000004657),                                                 -0xb68 * 0x1 + 0x12b6 + -0x633 + 0.13999999999998636,                                                 -(0x24e0 + -0x11bb + 0x1 * -0x44d + 0.49080000000003565)                                             ];                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x1e521f[_0x342bca(0x37f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x530)])) {                                         const _0x4efc9a = _0x1e521f[_0x342bca(0x4ad)][_0x342bca(0x3ea)]('|');                                         let _0x5b3dd8 = -0x1f * 0x41 + -0x71b + 0xefa;                                         while (!![]) {                                             switch (_0x4efc9a[_0x5b3dd8++]) {                                             case '0':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                     -(-0xbf * -0x1b + 0x1608 + -0x1f28 + 0.95049999999992),                                                     0xad9 * 0x1 + 0xc58 + 0x22 * -0xa6 + 0.34669999999999845,                                                     -(0x184 * -0x12 + 0x1e98 + -0x5 * -0x24b + 0.8038000000001375)                                                 ];                                                 continue;                                             case '1':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                     -(0x1b7 * 0x16 + -0x10 * -0x187 + 0xe * -0x3a9 + 0.6786000000001877),                                                     0x1766 + -0x1041 + -0x1 * 0x60b + 0.9499999999999886,                                                     -(-0x17 * 0xc9 + 0x1 * -0xe37 + 0x7 * 0x6bb + 0.7172999999997955)                                                 ];                                                 continue;                                             case '2':                                                 _0x4b9050[_0x342bca(0x2b2)](_0x29fca8 => {                                                     const _0x3b4c2f = _0x342bca;                                                     _0x29fca8[_0x3b4c2f(0x1d8)] && (_0x29fca8[_0x3b4c2f(0x6b9)] = _0x5e7bb3[_0x3b4c2f(0x3ab)], posuiClickObjs[_0x3b4c2f(0x1fd)](_0x29fca8));                                                 });                                                 continue;                                             case '3':                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x352)];                                                 continue;                                             case '4':                                                 allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x1e521f[_0x342bca(0x2f4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x66a)])) {                                             const _0x29b09f = _0x1e521f[_0x342bca(0x3e9)][_0x342bca(0x3ea)]('|');                                             let _0x1a9b2e = -0x1169 + 0x7c3 + 0xbe * 0xd;                                             while (!![]) {                                                 switch (_0x29b09f[_0x1a9b2e++]) {                                                 case '0':                                                     _0x4b9050[_0x342bca(0x2b2)](_0x1b0037 => {                                                         const _0x46b9f3 = _0x342bca;                                                         _0x1b0037[_0x46b9f3(0x1d8)] && (_0x1b0037[_0x46b9f3(0x33a)][_0x46b9f3(0x6b9)] = _0x1e521f[_0x46b9f3(0x568)], posuiClickObjs[_0x46b9f3(0x1fd)](_0x1b0037));                                                     });                                                     continue;                                                 case '1':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                         -(0x1 * 0x1e5f + -0x2135 + -0xdb5 * -0x1 + 0.835399999999936),                                                         -0x1 * -0x1ea1 + 0x1e94 + 0x10 * -0x3c5 + 0.19999999999998863,                                                         -(0x1a20 + -0x5e * -0x6a + -0x3264 + 0.7844000000000051)                                                     ];                                                     continue;                                                 case '2':                                                     allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                     continue;                                                 case '3':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                         -(0xad1 * -0x1 + 0x1136 + 0x451 + 0.23019999999996799),                                                         -0x14fc + 0x1574 + -0x2 * -0x41 + 0.1039000000000101,                                                         -(0x24f2 + 0x1476 + -0x2aed * 0x1 + 0.6536999999998443)                                                     ];                                                     continue;                                                 case '4':                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x507)];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x1e521f[_0x342bca(0x2d1)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x347)])) {                                                 const _0x417d6a = _0x1e521f[_0x342bca(0x249)][_0x342bca(0x3ea)]('|');                                                 let _0x5e466d = -0x16e5 + 0xc1 * 0x1 + -0x1 * -0x1624;                                                 while (!![]) {                                                     switch (_0x417d6a[_0x5e466d++]) {                                                     case '0':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                             -(-0x1 * -0x1269 + -0x53e + -0x2a2 + 0.6212000000000444),                                                             0x57d + -0xce * -0x1a + -0x1984 + 0.12999999999999545,                                                             -(0x791 + -0xd1 + 0x7df * 0x1 + 0.2442999999998392)                                                         ];                                                         continue;                                                     case '1':                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x1e2)];                                                         continue;                                                     case '2':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                             -(0x2684 + 0x3df + 0x63 * -0x52 + 0.11509999999998399),                                                             0x152c + -0xe87 + 0x5ad * -0x1 + 0.3703999999999894,                                                             -(0x7a0 * -0x3 + -0x1 * -0x236d + 0x1e7 + 0.8796000000002095)                                                         ];                                                         continue;                                                     case '3':                                                         _0x4b9050[_0x342bca(0x2b2)](_0x2f386d => {                                                             const _0x1d8a82 = _0x342bca;                                                             _0x2f386d[_0x1d8a82(0x1d8)] && (_0x2f386d[_0x1d8a82(0x33a)][_0x1d8a82(0x6b9)] = _0x1e521f[_0x1d8a82(0x386)], posuiClickObjs[_0x1d8a82(0x1fd)](_0x2f386d));                                                         });                                                         continue;                                                     case '4':                                                         allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x1e521f[_0x342bca(0x683)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x391)])) {                                                     const _0x555ff9 = _0x1e521f[_0x342bca(0x24e)][_0x342bca(0x3ea)]('|');                                                     let _0xced4a5 = -0xd * -0x17f + -0x17e6 + 0x473;                                                     while (!![]) {                                                         switch (_0x555ff9[_0xced4a5++]) {                                                         case '0':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                 -(0x25f6 + 0x1 * -0x3e9 + -0x1733 + 0.8141000000000531),                                                                 -0xd2d * 0x1 + 0xd7d + 0x135 + 0.7508000000000266,                                                                 -(0x24f5 * 0x1 + -0x16e0 + 0x1 * 0x9d + 0.16409999999996217)                                                             ];                                                             continue;                                                         case '1':                                                             _0x4b9050[_0x342bca(0x2b2)](_0x33376e => {                                                                 const _0x2369c8 = _0x342bca;                                                                 _0x33376e[_0x2369c8(0x1d8)] && (_0x33376e[_0x2369c8(0x33a)][_0x2369c8(0x6b9)] = _0x5e7bb3[_0x2369c8(0x217)], posuiClickObjs[_0x2369c8(0x1fd)](_0x33376e));                                                             });                                                             continue;                                                         case '2':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                 -(0x1695 + 0x1 * 0x1289 + -0x1e25 + 0.07000000000016371),                                                                 0x1b16 + -0x14f * -0x11 + -0x2fe7 + 0.9900000000000091,                                                                 -(0xdc1 + -0x8f6 + 0x9ba + 0.5399999999999636)                                                             ];                                                             continue;                                                         case '3':                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x211)];                                                             continue;                                                         case '4':                                                             allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x1e521f[_0x342bca(0x288)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2c4)])) {                                                         const _0x1913d1 = _0x1e521f[_0x342bca(0x3bf)][_0x342bca(0x3ea)]('|');                                                         let _0x9764b = -0x2485 + 0x19ac + -0xad9 * -0x1;                                                         while (!![]) {                                                             switch (_0x1913d1[_0x9764b++]) {                                                             case '0':                                                                 allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                                 continue;                                                             case '1':                                                                 _0x4b9050[_0x342bca(0x2b2)](_0x16449d => {                                                                     const _0x4230bb = _0x342bca;                                                                     _0x16449d[_0x4230bb(0x1d8)] && (_0x16449d[_0x4230bb(0x33a)][_0x4230bb(0x6b9)] = _0x5e7bb3[_0x4230bb(0x192)], posuiClickObjs[_0x4230bb(0x1fd)](_0x16449d));                                                                 });                                                                 continue;                                                             case '2':                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                     -(0x1879 + 0x206 + -0xffd + 0.15869999999995343),                                                                     -0x1f71 + 0x1868 + 0xb * 0xc7 + 0.8210000000000264,                                                                     -(-0x1c8c + -0x1026 + -0xbdf * -0x5 + 0.7056999999999789)                                                                 ];                                                                 continue;                                                             case '3':                                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                     -(0xee3 + 0x2173 + 0x9 * -0x439 + 0.7514999999998508),                                                                     0xe07 + -0x256e + 0x18d6,                                                                     -(0x1590 + 0x12d4 + -0x19df * 0x1 + 0.009399999999914144)                                                                 ];                                                                 continue;                                                             case '4':                                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x41e)];                                                                 continue;                                                             }                                                             break;                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             } else {                                 if (_0x1e521f[_0x342bca(0x3ae)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ce)])) {                                     if (_0x1e521f[_0x342bca(0x36f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4d2)])) {                                         const _0x22771f = _0x1e521f[_0x342bca(0x5e1)][_0x342bca(0x3ea)]('|');                                         let _0x455cc5 = 0x9d4 + 0x225f * 0x1 + -0x2c33;                                         while (!![]) {                                             switch (_0x22771f[_0x455cc5++]) {                                             case '0':                                                 _0x4b9050[_0x342bca(0x2b2)](_0x10993f => {                                                     const _0x4b3a4d = _0x342bca;                                                     _0x10993f[_0x4b3a4d(0x1d8)] && (_0x10993f[_0x4b3a4d(0x33a)][_0x4b3a4d(0x6b9)] = _0x1e521f[_0x4b3a4d(0x2f6)], shaifenClickObjs[_0x4b3a4d(0x1fd)](_0x10993f));                                                 });                                                 continue;                                             case '1':                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x69f)];                                                 continue;                                             case '2':                                                 allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                 continue;                                             case '3':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                     -(0xf * 0xcd + 0xf * 0xc6 + -0xccc + 0.0886000000000422),                                                     -0xa * 0x2b4 + -0x12 * 0x1a4 + 0x3969 + 0.37000000000000455,                                                     -(0x97 * -0x5 + 0x924 + 0x83a + 0.6608000000001084)                                                 ];                                                 continue;                                             case '4':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                     -(0xc2f * -0x1 + -0x1be7 * -0x1 + -0x503 + 0.06530000000020664),                                                     0x3d * -0x4a + -0x1904 + 0x2b94 + 0.21690000000000964,                                                     -(-0x1 * -0x20ab + -0x1a8 * -0x7 + -0x1 * 0x1d99 + 0.449500000000171)                                                 ];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x1e521f[_0x342bca(0x516)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x40f)])) {                                             const _0x5b5d7a = _0x1e521f[_0x342bca(0x5e6)][_0x342bca(0x3ea)]('|');                                             let _0x145e37 = -0x9 * -0x245 + 0x13 * 0x7d + -0x2 * 0xeda;                                             while (!![]) {                                                 switch (_0x5b5d7a[_0x145e37++]) {                                                 case '0':                                                     _0x4b9050[_0x342bca(0x2b2)](_0x404923 => {                                                         const _0x56f732 = _0x342bca;                                                         _0x404923[_0x56f732(0x1d8)] && (_0x404923[_0x56f732(0x33a)][_0x56f732(0x6b9)] = _0x1e521f[_0x56f732(0x444)], shaifenClickObjs[_0x56f732(0x1fd)](_0x404923));                                                     });                                                     continue;                                                 case '1':                                                     allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                     continue;                                                 case '2':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                         -(0x53 * 0x53 + 0x1 * -0x12a3 + 0x246 + 0.01999999999998181),                                                         0x203e + 0x2a * -0x63 + -0xf28 * 0x1 + 0.3300000000000125,                                                         -(0x1 * -0x675 + -0x2392 * -0x1 + -0x1 * 0xeaf + 0.7507000000000517)                                                     ];                                                     continue;                                                 case '3':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                         -(-0xe87 * -0x1 + 0x125c + -0x1637 + 0.42470000000002983),                                                         -0x2 * -0x943 + 0x1881 + -0x2a15 + 0.8075000000000045,                                                         -(0x1650 + -0x1273 + -0x56d * -0x2 + 0.3562000000001717)                                                     ];                                                     continue;                                                 case '4':                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x60f)];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x1e521f[_0x342bca(0x198)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x521)])) {                                                 const _0x17b3cc = _0x1e521f[_0x342bca(0x647)][_0x342bca(0x3ea)]('|');                                                 let _0x278b1f = -0x4c7 + 0x1 * 0x47b + 0x4c;                                                 while (!![]) {                                                     switch (_0x17b3cc[_0x278b1f++]) {                                                     case '0':                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2ed)];                                                         continue;                                                     case '1':                                                         allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                         continue;                                                     case '2':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                             -(0x120e + 0x1ab1 + -0x21ad + 0.1505000000001928),                                                             -0x14e3 * -0x1 + 0xf9 * -0x27 + 0x1217 * 0x1 + 0.8652999999999906,                                                             -(-0x176 + 0x19f8 + -0xc53 * 0x1 + 0.6484000000000378)                                                         ];                                                         continue;                                                     case '3':                                                         _0x4b9050[_0x342bca(0x2b2)](_0x3b75bf => {                                                             const _0x2600e0 = _0x342bca;                                                             _0x3b75bf[_0x2600e0(0x1d8)] && (_0x3b75bf[_0x2600e0(0x33a)][_0x2600e0(0x6b9)] = _0x1e521f[_0x2600e0(0x429)], shaifenClickObjs[_0x2600e0(0x1fd)](_0x3b75bf));                                                         });                                                         continue;                                                     case '4':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                             -(0x8a + -0x1 * -0x1387 + -0x1 * 0x91d + 0.9540000000001783),                                                             0x8a6 + 0x1d41 + -0x24e6 + 0.38999999999998636,                                                             -(-0x5bd + 0x729 + 0xae4 + 0.6390000000001237)                                                         ];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x1e521f[_0x342bca(0x557)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x25b)])) {                                                     const _0x4c6767 = _0x1e521f[_0x342bca(0x215)][_0x342bca(0x3ea)]('|');                                                     let _0x2d4bc3 = -0xb7d + -0x4f * 0x2e + 0x523 * 0x5;                                                     while (!![]) {                                                         switch (_0x4c6767[_0x2d4bc3++]) {                                                         case '0':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                 -(0xa * 0xc7 + 0x2382 + -0xc9 * 0x2a + 0.6718999999998232),                                                                 0x1a41 + 0x33e * 0xc + 0x2 * -0x200f + 0.120900000000006,                                                                 -(0x196d + -0x201a + -0x12db * -0x1 + 0.8395000000000437)                                                             ];                                                             continue;                                                         case '1':                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x664)];                                                             continue;                                                         case '2':                                                             allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                             continue;                                                         case '3':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                 -(-0x31f + 0x1a37 + -0xca6 + 0.0003999999998995918),                                                                 -0x49 * 0x63 + 0x222f * -0x1 + -0xa * -0x657 + 0.8000000000000114,                                                                 -(0x14c7 + -0x1c47 + -0x13d7 * -0x1 + 0.30780000000004293)                                                             ];                                                             continue;                                                         case '4':                                                             _0x4b9050[_0x342bca(0x2b2)](_0xfedfb6 => {                                                                 const _0x5c2d22 = _0x342bca;                                                                 _0xfedfb6[_0x5c2d22(0x1d8)] && (_0xfedfb6[_0x5c2d22(0x33a)][_0x5c2d22(0x6b9)] = _0x5e7bb3[_0x5c2d22(0x35e)], shaifenClickObjs[_0x5c2d22(0x1fd)](_0xfedfb6));                                                             });                                                             continue;                                                         }                                                         break;                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 } else {                     if (_0x1e521f[_0x342bca(0x4f4)](_0x4b9050[_0x342bca(0x269)], _0x1e521f[_0x342bca(0x60a)])) {                         if (_0x1e521f[_0x342bca(0x37f)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1e0)]))                             (_0x1e521f[_0x342bca(0x586)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x666)]) || _0x1e521f[_0x342bca(0x31d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x271)])) && _0x4b9050[_0x342bca(0x2b2)](_0x1c3584 => {                                 const _0xc1b5f = _0x342bca;                                 if (_0x1c3584[_0xc1b5f(0x1d8)]) {                                     const _0x5a8d25 = _0x1e521f[_0xc1b5f(0x614)][_0xc1b5f(0x3ea)]('|');                                     let _0x2452da = 0x12b3 * -0x1 + -0x178a + 0x2a3d;                                     while (!![]) {                                         switch (_0x5a8d25[_0x2452da++]) {                                         case '0':                                             (_0x1e521f[_0xc1b5f(0x441)](_0x1c3584[_0xc1b5f(0x6b9)], _0x1e521f[_0xc1b5f(0x3e0)]) || _0x1e521f[_0xc1b5f(0x6dc)](_0x1c3584[_0xc1b5f(0x6b9)], _0x1e521f[_0xc1b5f(0x64d)])) && (_0x1c3584[_0xc1b5f(0x2b3)][_0xc1b5f(0x379)] = _0x1c3584[_0xc1b5f(0x2b3)][_0xc1b5f(0x379)][_0xc1b5f(0x63e)](), _0x1c3584[_0xc1b5f(0x2b3)][_0xc1b5f(0x379)][_0xc1b5f(0x4e9) + 'e'] = !![], limojiJiaodaiObjs[_0xc1b5f(0x1fd)](_0x1c3584));                                             continue;                                         case '1':                                             limoClickObjs[_0xc1b5f(0x1fd)](_0x1c3584);                                             continue;                                         case '2':                                             _0x1e521f[_0xc1b5f(0x57e)](_0x4b9050[_0xc1b5f(0x6b9)], _0x1e521f[_0xc1b5f(0x271)]) && (_0x1c3584[_0xc1b5f(0x6b9)] = _0x1e521f[_0xc1b5f(0x6ce)]);                                             continue;                                         case '3':                                             _0x1c3584[_0xc1b5f(0x33a)][_0xc1b5f(0x6c0)] = _0x4b9050;                                             continue;                                         case '4':                                             _0x1e521f[_0xc1b5f(0x6dc)](_0x4b9050[_0xc1b5f(0x6b9)], _0x1e521f[_0xc1b5f(0x666)]) && (_0x1c3584[_0xc1b5f(0x6b9)] = _0x1e521f[_0xc1b5f(0x3b9)]);                                             continue;                                         }                                         break;                                     }                                 }                             });                         else {                             if (_0x1e521f[_0x342bca(0x318)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2d0)])) {                                 if (_0x1e521f[_0x342bca(0x329)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6b7)]) || _0x1e521f[_0x342bca(0x6d3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x632)]) || _0x1e521f[_0x342bca(0x516)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x419)]) || _0x1e521f[_0x342bca(0x4ff)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x44c)]) || _0x1e521f[_0x342bca(0x244)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3b0)]) || _0x1e521f[_0x342bca(0x229)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ef)]) || _0x1e521f[_0x342bca(0x273)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x651)]) || _0x1e521f[_0x342bca(0x27b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4e0)]) || _0x1e521f[_0x342bca(0x6ab)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x385)]) || _0x1e521f[_0x342bca(0x2b8)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x197)]) || _0x1e521f[_0x342bca(0x266)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x314)]) || _0x1e521f[_0x342bca(0x54d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x615)]) || _0x1e521f[_0x342bca(0x24c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5db)]) || _0x1e521f[_0x342bca(0x381)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x346)]) || _0x1e521f[_0x342bca(0x423)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1d2)]) || _0x1e521f[_0x342bca(0x6a4)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4d3)]) || _0x1e521f[_0x342bca(0x281)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x629)])) {                                     const _0x4e3756 = _0x1e521f[_0x342bca(0x344)][_0x342bca(0x3ea)]('|');                                     let _0xb5056 = 0x3 * 0x881 + -0x2 * 0x8fc + -0x1 * 0x78b;                                     while (!![]) {                                         switch (_0x4e3756[_0xb5056++]) {                                         case '0':                                             if (_0x1e521f[_0x342bca(0x625)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4e0)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x432)];                                             continue;                                         case '1':                                             if (_0x1e521f[_0x342bca(0x479)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x3b0)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x5ee)];                                             continue;                                         case '2':                                             if (_0x1e521f[_0x342bca(0x341)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x419)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x52f)];                                             continue;                                         case '3':                                             duishishitouquantity[_0x342bca(0x1fd)](_0x4b9050);                                             continue;                                         case '4':                                             if (_0x1e521f[_0x342bca(0x61a)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1d2)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x320)];                                             continue;                                         case '5':                                             if (_0x1e521f[_0x342bca(0x622)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x651)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x1bc)];                                             continue;                                         case '6':                                             if (_0x1e521f[_0x342bca(0x1f0)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x44c)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x1e3)];                                             continue;                                         case '7':                                             if (_0x1e521f[_0x342bca(0x245)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x314)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x1cc)];                                             continue;                                         case '8':                                             if (_0x1e521f[_0x342bca(0x4c3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x385)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x62d)];                                             continue;                                         case '9':                                             if (_0x1e521f[_0x342bca(0x24d)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x346)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2bf)];                                             continue;                                         case '10':                                             if (_0x1e521f[_0x342bca(0x3ad)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x5db)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x55f)];                                             continue;                                         case '11':                                             if (_0x1e521f[_0x342bca(0x452)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x629)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x6d9)];                                             continue;                                         case '12':                                             if (_0x1e521f[_0x342bca(0x5bc)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x615)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x5eb)];                                             continue;                                         case '13':                                             if (_0x1e521f[_0x342bca(0x6dc)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4d3)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2a5)];                                             continue;                                         case '14':                                             if (_0x1e521f[_0x342bca(0x26c)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x6b7)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x394)];                                             continue;                                         case '15':                                             if (_0x1e521f[_0x342bca(0x202)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x632)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x195)];                                             continue;                                         case '16':                                             if (_0x1e521f[_0x342bca(0x5be)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x197)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x19d)];                                             continue;                                         case '17':                                             if (_0x1e521f[_0x342bca(0x2fd)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ef)]))                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x670)];                                             continue;                                         }                                         break;                                     }                                 }                             } else {                                 if (_0x1e521f[_0x342bca(0x3d4)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x4ec)])) {                                     if (_0x1e521f[_0x342bca(0x27b)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x427)])) {                                         const _0x296d1c = _0x1e521f[_0x342bca(0x67b)][_0x342bca(0x3ea)]('|');                                         let _0x49f161 = 0x2148 + -0x79e + -0x19aa;                                         while (!![]) {                                             switch (_0x296d1c[_0x49f161++]) {                                             case '0':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                     -(-0x25d8 + -0xb66 + 0x1 * 0x3c16 + 0.4899999999997817),                                                     -0x6d * 0x51 + -0x9 * 0x203 + 0x35ad + 0.660000000000025,                                                     -(0x57 * 0x8 + 0x20bc + 0x14b3 * -0x1 + 0.6900000000000546)                                                 ];                                                 continue;                                             case '1':                                                 _0x4b9050[_0x342bca(0x2b2)](_0x5c1e53 => {                                                     const _0x45e3e6 = _0x342bca;                                                     _0x5c1e53[_0x45e3e6(0x1d8)] && (_0x5c1e53[_0x45e3e6(0x6b9)] = _0x1e521f[_0x45e3e6(0x407)], posuiClickObjs[_0x45e3e6(0x1fd)](_0x5c1e53));                                                 });                                                 continue;                                             case '2':                                                 allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                 continue;                                             case '3':                                                 _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                     -(-0x268c + -0x4e8 + 0x3a1 * 0xf + 0.8357999999998356),                                                     -0x62b * -0x5 + 0x129f + 0x1 * -0x3053 + 0.2647999999999797,                                                     -(-0x611 * -0x2 + -0x21f2 + -0x1c * -0x14d + 0.878400000000056)                                                 ];                                                 continue;                                             case '4':                                                 _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x3cb)];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x1e521f[_0x342bca(0x39f)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x607)])) {                                             const _0x8c66fd = _0x1e521f[_0x342bca(0x358)][_0x342bca(0x3ea)]('|');                                             let _0x4af2f6 = -0x1 * -0x1bde + 0x581 * -0x7 + -0x1 * -0xaa9;                                             while (!![]) {                                                 switch (_0x8c66fd[_0x4af2f6++]) {                                                 case '0':                                                     allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                     continue;                                                 case '1':                                                     _0x4b9050[_0x342bca(0x2b2)](_0x281d81 => {                                                         const _0x551ea3 = _0x342bca;                                                         _0x281d81[_0x551ea3(0x1d8)] && (_0x281d81[_0x551ea3(0x6b9)] = _0x5e7bb3[_0x551ea3(0x237)], posuiClickObjs[_0x551ea3(0x1fd)](_0x281d81));                                                     });                                                     continue;                                                 case '2':                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x2eb)];                                                     continue;                                                 case '3':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                         -(0xb4c + 0xf3d + 0x1 * -0xfe3 + 0.7568999999998596),                                                         -0xcd * 0x2 + 0x1a12 + -0x1757 + 0.6969000000000278,                                                         -(0x3 * -0x5ad + 0x11 * 0x10d + 0xdc7 * 0x1 + 0.5488000000000284)                                                     ];                                                     continue;                                                 case '4':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                         -(-0x1a08 + 0x1 * -0x13ee + 0x1 * 0x387b + 0.7800000000002001),                                                         0x3bc * 0x6 + -0x24d2 + 0xf7f * 0x1 + 0.4300000000000068,                                                         -(-0x1 * -0xf0d + -0x117a * -0x2 + -0x18 * 0x178 + 0.3200000000001637)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x1e521f[_0x342bca(0x583)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x1a9)])) {                                                 const _0x4da405 = _0x1e521f[_0x342bca(0x1f5)][_0x342bca(0x3ea)]('|');                                                 let _0x56ef1e = -0xfde + 0x1d * -0x1c + 0x130a;                                                 while (!![]) {                                                     switch (_0x4da405[_0x56ef1e++]) {                                                     case '0':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                             -(0x14 * -0xca + 0xd9 + 0x19e1 + 0.12780000000020664),                                                             0x4c2 + -0x9d * 0x2 + -0x268 + 0.05309999999997217,                                                             -(0x175a + 0x10fa + -0x19f0 + 0.478099999999813)                                                         ];                                                         continue;                                                     case '1':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                             -(0xdf * 0xb + -0x1c45 + 0x1d87 + 0.6799999999998363),                                                             0x1b15 + -0x3a8 * -0x8 + 0x3745 * -0x1 + 0.19999999999998863,                                                             -(0x21fa * 0x1 + -0x17d8 + 0x46a + 0.05999999999994543)                                                         ];                                                         continue;                                                     case '2':                                                         allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                         continue;                                                     case '3':                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x236)];                                                         continue;                                                     case '4':                                                         _0x4b9050[_0x342bca(0x2b2)](_0x25eea8 => {                                                             const _0x4eb1f0 = _0x342bca;                                                             _0x25eea8[_0x4eb1f0(0x1d8)] && (_0x25eea8[_0x4eb1f0(0x6b9)] = _0x1e521f[_0x4eb1f0(0x2ea)], posuiClickObjs[_0x4eb1f0(0x1fd)](_0x25eea8));                                                         });                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x1e521f[_0x342bca(0x4e3)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x431)])) {                                                     const _0x25b5b6 = _0x1e521f[_0x342bca(0x4ab)][_0x342bca(0x3ea)]('|');                                                     let _0x3661a0 = -0x61 * -0x25 + 0x1abf + -0x4 * 0xa31;                                                     while (!![]) {                                                         switch (_0x25b5b6[_0x3661a0++]) {                                                         case '0':                                                             _0x4b9050[_0x342bca(0x2b2)](_0x348a55 => {                                                                 const _0x5038ed = _0x342bca;                                                                 _0x348a55[_0x5038ed(0x1d8)] && (_0x348a55[_0x5038ed(0x6b9)] = _0x1e521f[_0x5038ed(0x1ac)], posuiClickObjs[_0x5038ed(0x1fd)](_0x348a55));                                                             });                                                             continue;                                                         case '1':                                                             allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                             continue;                                                         case '2':                                                             _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x469)];                                                             continue;                                                         case '3':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                                 -(0x94f * -0x4 + 0x22db * -0x1 + 0x52a3 + 0.05999999999994543),                                                                 0x31 * 0x8e + 0x1dde + -0x37fd + 0.9800000000000182,                                                                 -(0x23e4 + 0x7af * 0x1 + -0x1d07 + 0.1799999999998363)                                                             ];                                                             continue;                                                         case '4':                                                             _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                                 -(0x2415 + -0x2181 + 0x814 + 0.7031000000001768),                                                                 -0x1 * -0x1a57 + 0x3a1 + -0x99d * 0x3 + 0.902499999999975,                                                                 -(0xa97 + -0x425 * -0x8 + -0x1d5f + 0.029899999999997817)                                                             ];                                                             continue;                                                         }                                                         break;                                                     }                                                 }                                             }                                         }                                     }                                 } else {                                     if (_0x1e521f[_0x342bca(0x255)](_0x1b541f[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ce)])) {                                         if (_0x1e521f[_0x342bca(0x229)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x2ca)])) {                                             const _0x39bb3c = _0x1e521f[_0x342bca(0x644)][_0x342bca(0x3ea)]('|');                                             let _0xa7485d = 0x788 + 0x6 * 0x265 + -0x15e6;                                             while (!![]) {                                                 switch (_0x39bb3c[_0xa7485d++]) {                                                 case '0':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                         -(-0xcad + -0x2 * 0x105d + -0x54 * -0xac + 0.5516999999999825),                                                         -0xbf8 + -0x789 + -0x14b7 * -0x1 + 0.4463000000000079,                                                         -(-0xdc4 + 0x612 + 0x9f3 * 0x2 + 0.5444000000002234)                                                     ];                                                     continue;                                                 case '1':                                                     _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                         -(-0x2660 + 0x231f + 0xe1c + 0.9596000000001368),                                                         0x83 + -0x1716 + 0x17a8 * 0x1 + 0.8799999999999955,                                                         -(0x57 * -0x17 + -0x1 * 0x185 + 0x15b7 + 0.5234000000000378)                                                     ];                                                     continue;                                                 case '2':                                                     allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                     continue;                                                 case '3':                                                     _0x4b9050[_0x342bca(0x2b2)](_0x4dea2c => {                                                         const _0x327ce8 = _0x342bca;                                                         _0x4dea2c[_0x327ce8(0x1d8)] && (_0x4dea2c[_0x327ce8(0x6b9)] = _0x1e521f[_0x327ce8(0x62a)], shaifenClickObjs[_0x327ce8(0x1fd)](_0x4dea2c));                                                     });                                                     continue;                                                 case '4':                                                     _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x32c)];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x1e521f[_0x342bca(0x1df)](_0x4b9050[_0x342bca(0x6b9)], _0x1e521f[_0x342bca(0x472)])) {                                                 const _0x5d280a = _0x1e521f[_0x342bca(0x24e)][_0x342bca(0x3ea)]('|');                                                 let _0x5154e4 = 0x12f6 + 0x1 * 0x1499 + -0x278f;                                                 while (!![]) {                                                     switch (_0x5d280a[_0x5154e4++]) {                                                     case '0':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x48c) + 'a'] = [                                                             -(-0x32 * 0x9 + 0xbe6 + 0x91 + 0.9108999999998559),                                                             0x2 * 0x3b + 0x1 * 0xbd3 + -0xb11 + 0.7253999999999792,                                                             -(-0x62e + -0xdcf + 0x2032 + 0.09389999999984866)                                                         ];                                                         continue;                                                     case '1':                                                         _0x4b9050[_0x342bca(0x2b2)](_0x495697 => {                                                             const _0x31afa1 = _0x342bca;                                                             _0x495697[_0x31afa1(0x1d8)] && (_0x495697[_0x31afa1(0x6b9)] = _0x5e7bb3[_0x31afa1(0x225)], shaifenClickObjs[_0x31afa1(0x1fd)](_0x495697));                                                         });                                                         continue;                                                     case '2':                                                         _0x4b9050[_0x342bca(0x33a)][_0x342bca(0x20d) + _0x342bca(0x26a)] = [                                                             -(0x4db + 0xcbf * -0x1 + 0xb * 0x1ad + 0.9030999999999949),                                                             -0x197 + -0xca + -0x377 * -0x1 + 0.009999999999990905,                                                             -(0x21 * -0x6d + 0x1 * -0x116f + -0xb * -0x3fd + 0.91800000000012)                                                         ];                                                         continue;                                                     case '3':                                                         _0x4b9050[_0x342bca(0x33a)]['id'] = _0x1e521f[_0x342bca(0x587)];                                                         continue;                                                     case '4':                                                         allDeviceFocus[_0x342bca(0x1fd)](_0x4b9050);                                                         continue;                                                     }                                                     break;                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 }             }         });     },     'onLoad': () => {         const _0x6fd795 = _0x53b63f, _0x553371 = {                 'CdZUr': function (_0xd6c609) {                     return _0xd6c609();                 },                 'qGXue': function (_0x18b725) {                     return _0x18b725();                 },                 'teWup': function (_0x3b1719) {                     return _0x3b1719();                 },                 'Ffxsw': function (_0x5d12dd, _0x2054e6, _0x10d3d5) {                     return _0x5d12dd(_0x2054e6, _0x10d3d5);                 }             };         container[_0x6fd795(0x658) + _0x6fd795(0x22e)](), defaultSky = container[_0x6fd795(0x38e)], _0x553371[_0x6fd795(0x3fd)](addOutRoadLEDPlane), _0x553371[_0x6fd795(0x3fd)](addRoomUpLedPlanePlane), _0x553371[_0x6fd795(0x3fd)](addLimoRoomMainMachineText), _0x553371[_0x6fd795(0x3fd)](addDevicePlane), _0x553371[_0x6fd795(0x3fd)](addCameraDevicePlane), _0x553371[_0x6fd795(0x43d)](addDuichangLEDPlane), _0x553371[_0x6fd795(0x613)](render), _0x553371[_0x6fd795(0x6c5)](setTimeout, () => {             const _0x4fe967 = _0x6fd795;             callback && _0x553371[_0x4fe967(0x3fd)](callback);         }, 0x2682 + -0x1ba5 + -0x1 * 0x30d), container[_0x6fd795(0x45d) + 'ts'] = [defaultSky];         const _0x2d7111 = new THREE[(_0x6fd795(0x52c)) + 'y'](-0x63d + 0x634 * 0x4 + -0x1 * 0x1292, 0x1656 + 0x13e4 + 0x2 * -0x1518, -0x11 * 0xc0 + -0x705 + 0x13c6), _0x596b25 = new THREE[(_0x6fd795(0x473)) + (_0x6fd795(0x32a))]({ 'color': 0xff00 });         locationCube = new THREE[(_0x6fd795(0x3cd))](_0x2d7111, _0x596b25), locationCube[_0x6fd795(0x59c)][_0x6fd795(0x231)](0x175 + -0x1 * 0x211a + 0x1fa5 * 0x1, 0x1512 + 0xb16 + -0x498 * 0x7, -0x45a + -0x53f + 0x999), locationCube[_0x6fd795(0x1e5)] = ![], container[_0x6fd795(0x453)](locationCube), container[_0x6fd795(0x5fd) + 'ns'][_0x6fd795(0x508)](_0x599032 => {             const _0x2b2265 = _0x6fd795;             _0x599032[_0x2b2265(0x460)] = ![];         });     } }));
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
        let userName = e.objects[0].object.userData.name;
        let position = [
            e.objects[0].point.x,
            e.objects[0].point.y,
            e.objects[0].point.z,
        ];

        if(name.includes('破碎间棒条给料机')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            userClickDeviceID(
                "破碎间",
                e.objects[0].object.parent.userData.id,
            );
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('破碎间颚式破碎机')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let trueParent;
            let parent = e.objects[0].object.parent;
            if(parent.name == "破碎鄂式破2" || parent.name == "破碎鄂式破1") {
                trueParent = parent;
            }else {
                trueParent = parent.parent;
            }
            userClickDeviceID(
                "破碎间",
                trueParent.userData.id,
            );
            let outArr = [];
            trueParent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('破碎间单缸液压圆锥破碎机')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let trueParent;
            let parent = e.objects[0].object.parent;
            if(parent.name == "破碎圆锥破1" || parent.name == "破碎圆锥破2") {
                trueParent = parent;
            }else {
                trueParent = parent.parent;
            }
            userClickDeviceID(
                "破碎间",
                trueParent.userData.id,
            );
            let outArr = [];
            trueParent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('筛分间双层振动筛')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let trueParent;
            let parent = e.objects[0].object.parent;
            if(parent.name == "筛分机2" || parent.name == "筛分机1") {
                trueParent = parent;
            }else {
                trueParent = parent.parent;
            }
            userClickDeviceID(
                "筛分间",
                trueParent.userData.id,
            );
            let outArr = [];
            trueParent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('破碎间破碎料皮带') || userName.includes('破碎间破碎料皮带') ) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            userClickDeviceID(
                "破碎间",
                e.objects[0].object.parent.userData.id,
            );
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('筛分间振动筛给料皮带') || userName.includes('筛分间振动筛给料皮带')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            userClickDeviceID(
                "筛分间",
                e.objects[0].object.parent.userData.id,
            );
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('筛分间振动筛集料皮带') || userName.includes('筛分间振动筛集料皮带')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            userClickDeviceID(
                "筛分间",
                e.objects[0].object.parent.userData.id,
            );
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('破碎间振动筛返料皮带') || userName.includes('破碎间振动筛返料皮带')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            userClickDeviceID(
                "破碎间",
                e.objects[0].object.parent.userData.id,
            );
            let parent = e.objects[0].object.parent;
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        }
    

        // ---------------------------------------
        // 历史点击事件分界线 ----------------------
        // ---------------------------------------
        else if (name.includes("立磨机本体")) {
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

// 所有设备聚焦方法 id = 设备ID   times = 聚焦时间   isPlane = 是否显示信息框  false = 不显示   true = 显示   td = 回调函数
// window.sceneDeviceLook = (id, times, isPlane, td=() => {}) => {
export const sceneDeviceLook = (id, times, isPlane, td=() => {}) => {
    allDeviceFocus.forEach((item) => {
        if (item.userData.id == id) {
            tweenMoveView(
                item.userData.focusControls,
                item.userData.focusCamera,
                // [item.userData.focusControls[0], item.userData.focusControls[1] +30, item.userData.focusControls[2] + 10],
                times,
                () => {
                    if(isPlane) {
                        cameraModelPlane.position.set(
                            ...item.userData.focusControls
                        );
                        cameraModelPlane.visible = true;
                    }
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
}