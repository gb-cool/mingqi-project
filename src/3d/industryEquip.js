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
    limojiJiaodaiType = false,
    limojiJiaodaoSpeed = 0.03;

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

    function _0x46f1() {     const _0x5ea5a3 = [         'crfzY',         'GXsPt',         '3|0|2|4|1',         '2|0|4|1|3',         'COhxe',         'CcGBp',         'rHfHb',         '给料皮带秤M04B',         'rKGNf',         '1672044802',         '000efd5c',         'BBTvG',         'vmMcn',         'IZyNm',         '立磨机主体6_1',         'zyUzM',         '均化间外墙_2',         '-117',         'sky',         'YIDONG-001',         'EgyEJ',         '1672825159',         'sFYtG',         'kDIMa',         'fzUZm',         '000906c1',         'GReti',         '树.glb',         '筛分间.glb',         'WcBwz',         'TMVKE',         '粉尘浓度006',         'KsEwB',         '均化摄像头3',         'bCXJC',         '4|3|2|0|1',         'focusCamer',         'MeshBasicM',         '氧浓度015',         'uuwly',         'DKxvy',         'AQEei',         'push',         'mOJkd',         'material',         'VRyYI',         '1672825280',         'zLZTf',         'Mesh',         'NjIXC',         'CYzwy',         '立磨收尘器3带透明通',         'opacity',         'jgesP',         '给料皮带秤M08',         'tzdc-4-13',         '000f8fb4',         'VvErn',         '粉尘浓度001',         'Cpckt',         '密相泵M0',         'traverse',         'receiveSha',         'BHdYs',         '立磨发送罐7',         '立磨巡检机器人',         '网格017_1',         'b7c4a56d1f',         'eYbvJ',         '堆石LED17石头',         'PbNfb',         'shbzm',         '均化间.glb',         'OhRbI',         '1668402506',         '4|1|0|2|3',         '3c4737a392',         '|12',         'qKPyM',         'TERjI',         '均化摄像头1',         'YidHu',         'pjjjo',         'LrNvW',         '粉尘浓度004',         'kdlql',         'YdGZT',         '立磨输送机2B',         '立磨收尘器5带透明通',         'VBrGR',         'XxXGI',         'ZMIpc',         '立磨提升机4',         'bhOyi',         'qraNO',         '立磨行车2_1',         '1LXhwRj',         'BWpwc',         'b0aa4c4cdb',         'sIjGl',         'kbcWc',         'jywst',         'ngppz',         '立磨前仓4A',         '000a56b4',         'beLbr',         '1668403550',         'lAYFC',         '碎石配料间外墙带透明',         'Group',         'NGVII',         'FLeur',         '立磨前仓5A',         '四色图.glb',         '534498ZrgANX',         '立磨前仓7B',         'ZUJeN',         '0006b413',         '000ed044',         'tzdc-3-8',         'LBKeJ',         '0007e409',         'Jfser',         'apFKz',         'BoUpJ',         'tACMh',         '破碎间外墙带透明通道',         '立磨间',         'LwsaE',         'mxgch',         'fBNNW',         'jcRCv',         'WYYjg',         'CFSkr',         '立磨发送罐4',         '车/车.gltf',         'hUQlr',         'wgjlT',         'HEAps',         'transType',         'Gdksm',         'ngrPE',         '|14|0|13|6',         'PDinl',         'rSbLb',         'rOzmd',         '立磨密封料仓4',         '4|2|0|1|3',         '2|5|6',         '收尘器M0',         'oyEFg',         '立磨收尘器2带透明通',         'name',         '0002553e',         'Rygvu',         'envMap',         '立磨巡检机器人.gl',         'efViy',         'GCytK',         'castShadow',         '立磨密封料仓3',         'iqzVo',         'dow',         'LPego',         'jqjlx',         'gGpws',         'sPebW',         'NwgJc',         'a80b73009a',         '1667871699',         'uLCnv',         'ypOXE',         'DoubleSide',         'fpmdz',         'viDGB',         '碎石配料间',         'icAcp',         '立磨输送机5',         'sCXIN',         'zmCCq',         '压缩空气管道',         'AgqKI',         'tzdc-4-10',         'PQCSE',         'mrmYS',         'IADFs',         '000cf4c6',         '10|7|3|2|9',         '3|1|2|4|0',         'vYuoK',         '立磨发送罐5',         'uyXAC',         '管道.glb',         '1672044874',         'PuQJL',         '堆石LED15石头',         'ntgOr',         '立磨前仓6B',         'set',         '立磨提升机7',         '|1|4|0|8|5',         '四色图',         'MjXcR',         '1668403339',         '地面分层.gltf',         'tazss',         'clone',         'Vector2',         '氧浓度001',         'xvmrp',         'DGcmH',         '1|3|2|4|0',         'VZASz',         '给料汇总皮带M06',         '1672044470',         'AElBk',         'PlaneGeome',         'YzCLd',         'bPwwe',         'CJ-FZ-001',         'uBxPH',         '排气管道',         'BsEAo',         '2|0|1|4|3',         'oUKpF',         'RTHIV',         '368JlDMWG',         'lookAt',         '氧浓度005',         'CXehB',         'BaHLk',         'isMesh',         'wCvyy',         '立磨行车',         'TcNiG',         '地面.glb',         '立磨移动小车2',         'rVdpj',         'XfplW',         'EUtVx',         '输送管道',         '给料汇总皮带M02',         'wMcng',         'DeFLy',         'lLHdK',         'AFfQQ',         '立磨前仓2B',         'forEach',         'vmypD',         'parent',         'CPzhV',         '立磨输送机6',         'ZYXJn',         '报警.glb',         'KNaTc',         'hFxxw',         '立磨机主体8_1',         'position',         '000f0cac',         'zaGie',         'neRobotLim',         '000c51b7',         'OaXZP',         '立磨间外墙带透明通道',         'BdkEZ',         'ejYRt',         '立磨机主体2_1',         '通道_2',         '立磨提升机3',         'PXQFE',         '氧浓度009',         '产线外房间',         'kqcCv',         'iaqmT',         '00044875',         'aVpYp',         '2|0|4|3|1',         'DnnLp',         'includes',         '立磨风机管道',         'qmBri',         '磨前仓M07A',         'ABJpm',         '立磨输送机7A',         'Object3D',         'yrerM',         'oiQbs',         '堆石LED7石头',         '立磨电机8',         'cBUDb',         '均化间',         'zdGWC',         'qLClJ',         'xJDLp',         '堆石LED12石头',         'tzdc-4-17',         'WOYeY',         'BtvTU',         'JThEr',         '1|4|0|3|2',         'aa73ef5794',         'ZtmPx',         'ZBleM',         'yvnOn',         'fpAcJ',         'tzdc-4-11',         '立磨机主体3_1',         '粉尘浓度003',         'CJ-BJJ_2',         'Rfuyo',         '立磨发送罐1',         'PUDqd',         '立磨输送机8',         'nhSrm',         'gezan',         'PjihA',         'Yyiub',         'CkuUi',         'xkLoJ',         'WLVMd',         '2|8|5|10|1',         '压缩空气管道动画',         'orBpo',         'GwMQF',         'SyVEp',         'WSxXi',         '1672044939',         'animation',         'bmBun',         'kMxML',         '立磨输送机2A',         '粉尘浓度008',         '3|4|1|0|2',         '000090d6',         'UYdQG',         'jmRat',         '氧浓度008',         '堆石LED10石头',         '4e4e1482af',         'metalness',         'txemb',         'PPNsA',         '立磨前仓1',         '5|17|3|4|7',         '立磨输送机5A',         '磨前仓M08',         'zeFun',         'Pofzg',         'sgjDF',         '0004a1cb',         '立磨间.glb',         'MpONm',         'BNcQX',         '00039ffd',         'vIJCe',         'VWYix',         'LiGjU',         'HPGnF',         '堆石LED4石头',         '#FF7A5A',         'TFFlN',         'yZrmi',         '氧浓度004',         'WMtFh',         'lqMJV',         'xHayZ',         'lSIaH',         'clickObjec',         'OWqoW',         '氧浓度点击事件',         'CBgEJ',         'bjylL',         'DcTCw',         '45940yjcFTA',         'e944e876fe',         'bWpce',         'RFIdP',         '1672889351',         '2|1|0|3|4',         '0|3|1|2|4',         '巡检机器人',         'uSHiP',         'PBpdh',         '罗茨风机管道',         'FxlZg',         'HShdw',         'wyHWI',         '73549ad78f',         'gNftI',         '立磨密封料仓6',         'CJ-FZ-002',         '24WNUkfw',         '4|0|1|3|2',         '输送管道动画',         'BTfQg',         'dmECM',         '粉尘浓度005',         'renderOrde',         'nFxLN',         '-116',         '堆石LED9石头',         '立磨电机7',         '000648b1',         '给料汇总皮带M04',         'ghDqr',         'attach',         '000eef89',         '0002d46d',         'tzdc-4-16',         '堆石LED8石头',         '1672825616',         'MpAwa',         'QwNcE',         '|16|9|11|1',         'asvJF',         '给料皮带秤M04A',         'AwytU',         'jiBhU',         'pUCqT',         'jXzDZ',         'QfPnv',         '立磨提升机5',         '管道桥',         '立磨提升机1',         'funAK',         'DMXQK',         'JH-SCG-',         'UEPlL',         'mmtol',         'LbrQR',         'tAuRJ',         'GQMXr',         'CrxYX',         '00077ff6',         '|8|9|2|10|',         '立磨密封料仓1',         '立磨发送罐3',         'LrMVS',         'FZVTX',         '00043b38',         '2578106EptSPn',         'KYDUq',         '立磨移动小车1',         '罗茨风机管道动画',         '立磨输送机6B',         'wrAEN',         'sQcyB',         'lpxDu',         '7298742mqcDqG',         'yQqzo',         'DqYjK',         'RDGRA',         '均化摄像头6',         'iwSgM',         'CRqkf',         '1672044706',         '筛分间',         'UVHlW',         'QEcaB',         'uEJSA',         'LOWIF',         '1|5|2|3|4|',         'cqLWP',         'vQZPE',         'RBxoG',         '立磨行车1_1',         'gtRdt',         '立磨输送机4B',         'TRwJm',         'giMdm',         '氮气管道动画',         '立磨电机6',         '立磨提升机2',         '1672044743',         'CoBVw',         'PQtHX',         'HWnLc',         'IGaWb',         'wHAlq',         'fOOKG',         'zAnOY',         'GcsLZ',         '水管动画',         'CJ-JZTLJ_2',         'RgjWF',         'fsgAh',         '氧浓度007',         '均化间重点区域摄像头',         '3|2|0|4|1',         'PRNCN',         'lyyzp',         'QXoyz',         '磨前仓M05B',         'tzdc-3-4',         'fWBtQ',         'WeWbz',         'aneText',         '磨前仓M04A',         'UbsZz',         '1|0|2|4|3',         'EiGMb',         'GVubN',         '2|3|0|4|1',         '4|3|2|1|0',         'IJJaH',         'RVmAn',         'LJJVv',         'HOsTn',         'nXubu',         '立磨电机3',         '立磨发送罐2',         'xunjianPla',         'ZQBtm',         'tzdc-4-15',         '立磨输送机4',         'RibJm',         '0b050538a3',         'usmiH',         'IqCoA',         '磁悬浮风机管道动画',         '000b80b8',         'nMkEj',         '磨前仓M05A',         '立磨收尘器1带透明通',         'aterial',         'mdbgf',         '草坪.glb',         'LPLqM',         'LPkUU',         'ELIes',         'jFQsh',         'try',         'bxZNT',         'CeOwx',         'orbit',         'lqLJh',         '氧浓度014',         '立磨胶带机3带透明通',         'add',         'ieBMm',         'NLJRF',         'tzdc-4-14',         '粉尘浓度012',         'MSdnp',         '立磨输送机7',         'VEoZx',         '磨前仓M03',         'eQYgl',         'kSBMc',         'SBcdz',         'QyEmO',         '立磨机主体4_1',         'tEUsv',         '堆石场一外墙_1',         '氧浓度010',         '给料皮带秤M03',         '磁悬浮风机管道',         'lwRnz',         'IsAUh',         'log',         'dIVMz',         'rucZX',         '3d/8.jpg',         '立磨电机5',         'FHzbh',         'RmTdj',         '安全疏散',         'PeCPZ',         '管道动画',         'XWPhH',         'iiiVI',         'fzSfV',         '风机M0',         '立磨收尘器6带透明通',         'aHqsS',         'aAEYO',         'bpnSH',         '堆石LED2石头',         '堆石LED13石头',         'center',         'yYtjI',         'weyCS',         'kkqNc',         '密封料仓M0',         'mixerActio',         'WqgVa',         '4|3|0|2|1',         'scale',         'VTCfv',         '碎石配料间.glb',         'FSyBf',         '粉尘浓度002',         '3|0|5|13|1',         'rsOWy',         'lnRdi',         '立磨输送机4A',         '立磨密封料仓7',         'prgEl',         'JsqRC',         '给料皮带秤M01',         '立磨机主体7_1',         'UpgLF',         'nBdCJ',         'dVbtS',         'ixoal',         'transparen',         'JjSSx',         'sRWVv',         'JEXVo',         '1|4|2|0|5|',         'vfgKX',         'wNOsc',         'KdXxp',         'roughness',         '立磨胶带机4带透明通',         '立磨提升机6',         'cyOyd',         'hfllO',         'GSePB',         '氧浓度012',         'qbkXr',         '堆石LED14石头',         'nmziw',         'qDHRt',         'qFiSA',         'HDcBC',         'jMeey',         'atBcR',         '000f4cb7',         'ZpkiK',         '立磨输送机6A',         'ZrEpx',         'tzdc-3-1',         '4|2|1|3|5|',         '给料皮带秤M06A',         'tyVhA',         'krESW',         '粉尘浓度009',         '立磨机',         'FRCDg',         'MBbgO',         '4989470DkIFbY',         '立磨前仓7A',         'iqrrA',         '给料皮带秤M02B',         'ae5ad0d60f',         'FPlZe',         'OQTSK',         'gCojY',         'PQvkI',         '1672044671',         '4|1|0|3|2',         '氧浓度013',         'TcMGe',         'rotation',         '均化摄像头5',         '粉尘浓度016',         'lTcDa',         'hXQjC',         'tzdc-3-5',         'ZsazI',         'wIgyC',         'JugzS',         'PiMHB',         'lockID',         'hqznM',         'hswJP',         '立磨前仓3',         '立磨前仓5B',         'NwOgK',         'ZWGsu',         '1667871736',         '磨前仓M02B',         'ZVhjM',         'NLwJk',         '1|3|2|0|4',         'CJ-DSC-002',         'jYFjO',         'ugfrn',         'slice',         'jeQbI',         'FwzjB',         'f543a8a7c7',         'gqNny',         '立磨输送机1',         'CADzx',         'whsXy',         '立磨机本体M0',         'eocVo',         '道_2',         '给料皮带秤M07B',         '给料皮带秤M02A',         '1672825770',         'vzKyL',         '均化间外墙_1',         'ZaIsj',         'eezoS',         '磨前仓M04B',         '堆石LED3石头',         '立磨前仓6A',         'mYxxg',         '立磨间重点区域摄像头',         '00069b09',         '堆石LED5石头',         '立磨提升机8',         'oSeRp',         'OsUgr',         'lGYWo',         '粉尘浓度点击事件',         'CcODv',         '给料汇总皮带M07',         'nWqxX',         'dzzVk',         'LStno',         'rmGtH',         'LaiBQ',         '1672044906',         'itBDe',         'BAfga',         'sRldj',         '立磨摄像头',         '00032fd6',         '2|3|1|0|4',         'AtVNO',         '000692b7',         'borSt',         'SwhpG',         'tAMxP',         '立磨胶带机2带透明通',         'iFEME',         'GQfFc',         'Szbjc',         'tzdc-3-7',         '立磨收尘管道',         '粉尘浓度015',         'ssZaI',         'Wukaz',         'WsNQV',         'zltnI',         '3|1|0|2|4',         'ZAiDO',         '堆石LED6石头',         '粉尘浓度010',         'dTTcP',         '1672044840',         '99001DBQbZK',         '给料汇总皮带M05',         'NMDmm',         '堆石LED1石头',         'split',         'focusContr',         'sbUYW',         'geJCm',         'UZhsS',         '9b4e69a6ee',         'BoxGeometr',         '3|0|4|2|1',         'DhsrY',         '堆石LED16石头',         '氧浓度002',         'lmuGb',         '立磨发送罐6',         'mWxsG',         '立磨输送机2',         'EJETY',         'xqgyx',         '立磨收尘器8带透明通',         'FIbbe',         'a12773b41a',         'YGVGo',         'lnTqS',         '氧浓度011',         'FKkEh',         '堆石厂.glb',         'visible',         '给料皮带秤M06B',         '均化摄像头',         '磨前仓M06A',         '1672825662',         'XGQmq',         'ylygg',         '33e22d6c78',         'KhGzn',         'QWUZv',         '均化摄像头4',         'IenWC',         'uzkVN',         '1672044593',         '000c9946',         'mVyZZ',         '000c039d',         'bee194c934',         'LhcRe',         'USMLz',         'JQoBS',         '51864868zhkSzJ',         'kuNbH',         'luzBd',         '磨前仓M07B',         '产线外房间.glb',         'rRByt',         '立磨收尘器7带透明通',         'BLFcb',         '00026a96',         '3b43c9abcb',         'BMXPP',         'xWHnP',         'DaPOu',         'LiEJc',         'qaQCv',         'ZklUp',         '立磨机主体1_1',         '2412oEjRhm',         '36fd26f851',         '00039a6f',         'nhyjR',         '给料皮带秤M05A',         'type',         'ofENF',         'POWfT',         'ArXVn',         'Qcsnq',         'PyTvm',         '立磨前仓4B',         'tzZnY',         'iJWNa',         'KlKsI',         'pNvZe',         'tSlET',         'CBDgV',         '给料皮带秤M07A',         '立磨电机1',         '000ecb01',         'XTIyD',         'DFdQf',         'Container',         '氧浓度006',         '立磨发送罐8',         '#00ff18',         'lgspm',         '立磨输送机7B',         '堆石厂',         '2|0|3|4|1',         'VskLo',         '000df6f2',         '氧浓度003',         '立磨密封料仓2',         '0007f861',         'bhSJT',         'IxKXy',         '一般风险区域',         'SDZCb',         '立磨密封料仓5',         '透明通道',         'OVFnr',         'NMXEh',         'howOJ',         'dLwvG',         '立磨收尘器4带透明通',         'alIlv',         '均化摄像头2',         'FDiup',         'losOZ',         'needsUpdat',         '4693ca0743',         '2|6|1|4|11',         '氮气管道',         '1668403549',         'NZaVW',         'KEisa',         '地面分层',         'qVbvJ',         'tTeXU',         'robotTopPl',         '道_1',         'tlctn',         '立磨胶带机1带透明通',         'sSUip',         '0|1|3|2|4',         'vghyE',         'ZXNSg',         '000fb72f',         'tzdc-4-12',         'tzdc-3-3',         'STNhd',         'userData',         'RqPqI',         'YIDONG-002',         '274194a9c6',         '1672044628',         'FmpqE',         'tzdc-4-9',         'paused',         'PfAJr',         'GsYIM',         'depthTest',         'GAZHs',         'windowResi',         'FgOID',         '磨前仓M01',         '破碎间.glb',         'qlIBy',         'mGBPb',         'PKbrO',         'lGujq',         'tzdc-3-2',         'EHzDI',         '0005c842',         '立磨电机4',         'evsRA',         '3d/models/',         '立磨电机2',         'LIryW',         'map',         'tzdc-3-6',         'psVma',         '000ad947',         'ZeXJw',         'paVAv',         'VrqYo',         '0|4|3|1|2',         'qDCYX',         '立磨间巡检机器人点击',         'TJfvj',         '安全疏散.glb',         'khRJV',         'jOWEL',         'VecOK',         'IUkZP',         'LqLYv',         '00076e48',         '粉尘浓度013',         'yZtmS',         '3d/7.hdr',         'hbTJC',         '3|0|1|4|2',         '立磨密封料仓8',         'IEYNL',         'yVgWt',         '立磨前仓2A',         'WRmJz',         '磨前仓M02A',         '#ffffff',         'knjQH',         'vEURm',         'CuWjy',         'zPrAx',         'fcaac0a52d',         'mTWan',         '粉尘浓度011',         '立磨前仓8',         '给料皮带秤M05B',         '堆石LED11石头',         'UlnjB',         '立磨输送机3',         'KMYlC',         'odhmC',         'ff4f97b09a',         '000cf96b',         'VoXuW',         'TpVAz',         'hLGsB',         'ols',         'LbIoy',         '立磨提升机M0',         'RuVWv',         'LKklg',         'BYEbg',         '立磨输送机5B',         '移动卸料小车胶带机P',         'SMzaQ',         'addBloom',         'sAyGW',         'tjxbg',         '粉尘浓度007',         'fQCxR',         '4|0|3|1|7|',         '000425f8',         '0|3|2|4|1',         '粉尘浓度014',         '1672825567',         'indexOpaci',         'ByICW',         'ErYcs',         '立磨机主体5_1',         'flsrE',         '磨前仓M06B',         '3|0|2|5|1|',         '破碎间'     ];     _0x46f1 = function () {         return _0x5ea5a3;     };     return _0x46f1(); } const _0x4e8b5b = _0x254e; function _0x254e(_0x17e518, _0x4ebbb1) {     const _0x220a98 = _0x46f1();     return _0x254e = function (_0x4b74ac, _0xcbe12e) {         _0x4b74ac = _0x4b74ac - (-0x2 * 0x8ab + -0x383 + -0x2 * -0xb26);         let _0x544b74 = _0x220a98[_0x4b74ac];         return _0x544b74;     }, _0x254e(_0x17e518, _0x4ebbb1); } (function (_0x1846de, _0x4b5589) {     const _0x2fbe3a = _0x254e, _0x2ae0f5 = _0x1846de();     while (!![]) {         try {             const _0x16ec7b = parseInt(_0x2fbe3a(0x528)) / (0x10 * 0x248 + 0x2 * -0x5de + -0x18c3) * (-parseInt(_0x2fbe3a(0x2a3)) / (0x65 + 0x24a2 + -0x2505)) + -parseInt(_0x2fbe3a(0x53a)) / (0x2405 + -0x295 * -0x4 + -0x2e56) * (parseInt(_0x2fbe3a(0x272)) / (-0x8a3 * -0x2 + -0x1 * -0x1195 + -0x22d7)) + -parseInt(_0x2fbe3a(0x36c)) / (-0x22c3 + -0x1 * 0x1bfa + 0x3ec2) + -parseInt(_0x2fbe3a(0x2ab)) / (0x3f3 + -0x16 * -0x105 + -0xad * 0x27) + -parseInt(_0x2fbe3a(0x3d4)) / (0x1f02 + 0x829 * 0x1 + -0xa * 0x3ea) * (parseInt(_0x2fbe3a(0x1cd)) / (-0x2057 + 0x10 * -0x22c + 0x431f)) + -parseInt(_0x2fbe3a(0x417)) / (-0x9ec * -0x2 + -0xe64 + 0x13 * -0x49) * (-parseInt(_0x2fbe3a(0x260)) / (-0xf02 + -0x129c * -0x1 + 0x8 * -0x72)) + parseInt(_0x2fbe3a(0x406)) / (-0x2621 + -0x2 * -0x3a9 + 0x1eda);             if (_0x16ec7b === _0x4b5589)                 break;             else                 _0x2ae0f5['push'](_0x2ae0f5['shift']());         } catch (_0x278ac3) {             _0x2ae0f5['push'](_0x2ae0f5['shift']());         }     } }(_0x46f1, -0x3014d * -0x7 + -0x2de81 + -0x72198), container = new THREE[(_0x4e8b5b(0x42e))]({     'publicPath': baseUrl,     'container': domElement,     'viewState': _0x4e8b5b(0x301),     'bgColor': 0x0,     'cameras': {         'orbitCamera': {             'position': [                 -(0x3 * -0xde + -0x10 * -0xbc + -0x45a),                 -0x17c5 + 0x172 * -0xf + 0x3070,                 0x1c40 + -0x18 * -0xba + -0x2d38             ],             'near': 0xa,             'far': 0x186a0,             'fov': 0x3c         }     },     'controls': {         'orbitControls': {             'autoRotate': ![],             'autoRotateSpeed': 0x1,             'target': [                 -(0x3 * 0x304 + -0x210c + 0x242a),                 0x85a * 0x1 + -0x9d * -0x27 + 0x497 * -0x7,                 -(-0x253d + 0x1 * -0x1b3b + -0x2e * -0x199)             ],             'minDistance': 0x0,             'maxDistance': 0x1388,             'maxPolarAngle': Math['PI'] * (0x6d7 + 0x169b + -0x1d72 + 0.45),             'enableDamping': ![],             'dampingFactor': 0.05         }     },     'lights': {         'sunLight': {             'color': 0xedeacc,             'intensity': 0x1,             'position': [                 -0x4cd + 0x1 * -0x13d7 + 0x2074 + 0.2999999999999545,                 -0x345 + -0x19 * 0x91 + -0x412 * -0xb,                 -0x7a0 + -0x1 * 0xf0d + 0x264d + 0.1999999999998181             ],             'mapSize': [                 -0x1586 + 0x36 * -0x9 + 0x276c,                 0x1 * -0x1e8f + -0xde2 + -0x1 * -0x3c71             ],             'near': 0x14,             'far': 0x3a98,             'bias': -(-0x126e + -0x20f + 0x147d + 0.00017),             'distance': 0x1f40         },         'ambientLight': {             'color': 0xffffff,             'intensity': 0.05         }     },     'nodePass': {         'hue': 0x0,         'sataturation': 1.75,         'vibrance': 0x0,         'brightness': 0x0,         'contrast': 0x1     },     'skyBox': {         'urls': [_0x4e8b5b(0x31d)],         'scale': 0x1,         'rotation': [             -0x341 + 0x20ea + -0x1da9,             0x800 * 0x2 + -0x1338 + -0xce * -0x4,             0x1 * -0x1e36 + 0x1 * -0x1a6d + 0x38a3         ]     },     'modelUrls': [         _0x4e8b5b(0x479) + _0x4e8b5b(0x54f),         _0x4e8b5b(0x479) + _0x4e8b5b(0x487),         _0x4e8b5b(0x479) + _0x4e8b5b(0x1e8),         _0x4e8b5b(0x479) + _0x4e8b5b(0x2f9),         _0x4e8b5b(0x479) + _0x4e8b5b(0x1d6),         _0x4e8b5b(0x479) + _0x4e8b5b(0x40a),         _0x4e8b5b(0x479) + _0x4e8b5b(0x1b7),         _0x4e8b5b(0x479) + _0x4e8b5b(0x4e3),         _0x4e8b5b(0x479) + _0x4e8b5b(0x539),         _0x4e8b5b(0x479) + _0x4e8b5b(0x187) + 'b',         _0x4e8b5b(0x479) + _0x4e8b5b(0x1ab),         _0x4e8b5b(0x479) + _0x4e8b5b(0x3f0),         _0x4e8b5b(0x479) + _0x4e8b5b(0x510),         _0x4e8b5b(0x479) + _0x4e8b5b(0x249),         _0x4e8b5b(0x479) + _0x4e8b5b(0x46f),         _0x4e8b5b(0x479) + _0x4e8b5b(0x4e4),         _0x4e8b5b(0x479) + _0x4e8b5b(0x338)     ],     'outline': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x4e8b5b(0x252),         'hiddenEdgeColor': _0x4e8b5b(0x252)     },     'outline_1': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x4e8b5b(0x431),         'hiddenEdgeColor': _0x4e8b5b(0x431)     },     'outline_2': {         'edgeStrength': 0x5,         'edgeGlow': 0.5,         'edgeThickness': 0.5,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0x4e8b5b(0x499),         'hiddenEdgeColor': _0x4e8b5b(0x499)     },     'bloomEnabled': !![],     'bloom': {         'bloomStrength': 0x1,         'threshold': 0x0,         'bloomRadius': 0x0     },     'enableShadow': !![],     'hdrUrls': [_0x4e8b5b(0x490)],     'toneMappingExposure': 0x1,     'antiShake': ![],     'bounds': {         'radius': 0x186a0,         'center': [             0x79 * 0x5 + -0x1 * 0x19c7 + -0x3 * -0x7ce,             -0x225 + -0x1400 + 0x1 * 0x1625,             -0x379 + 0x2 * -0x57a + 0xe6d         ]     },     'fog': {         'color': 0x52636e,         'intensity': 0x0     },     'stats': ![],     'onProgress': _0x2d5e1c => {         const _0x57a63c = _0x4e8b5b, _0x5ea157 = {                 'FgOID': function (_0x116d11, _0x31b47a) {                     return _0x116d11 == _0x31b47a;                 },                 'gtRdt': _0x57a63c(0x19f),                 'pUCqT': function (_0x479c21, _0x4104c5) {                     return _0x479c21 == _0x4104c5;                 },                 'rVdpj': _0x57a63c(0x1db),                 'yZrmi': _0x57a63c(0x26a),                 'ZVhjM': _0x57a63c(0x44d),                 'PbNfb': _0x57a63c(0x317),                 'PfAJr': function (_0x1696ca, _0x1ae0f1) {                     return _0x1696ca == _0x1ae0f1;                 },                 'hLGsB': _0x57a63c(0x291),                 'eezoS': _0x57a63c(0x1c8),                 'WOYeY': _0x57a63c(0x2f2),                 'JjSSx': function (_0x5858be, _0x17a9d6) {                     return _0x5858be == _0x17a9d6;                 },                 'LiGjU': _0x57a63c(0x274),                 'CXehB': _0x57a63c(0x2a6),                 'jiBhU': function (_0x505683, _0x2a745e) {                     return _0x505683 == _0x2a745e;                 },                 'rOzmd': _0x57a63c(0x22c),                 'jXzDZ': function (_0x104283, _0x15578e) {                     return _0x104283 == _0x15578e;                 },                 'apFKz': _0x57a63c(0x2cd),                 'lAYFC': _0x57a63c(0x2c1),                 'borSt': _0x57a63c(0x207),                 'evsRA': function (_0x51dd15, _0xd4f537) {                     return _0x51dd15 == _0xd4f537;                 },                 'usmiH': _0x57a63c(0x323),                 'WLVMd': function (_0x513153, _0x11bd74) {                     return _0x513153 == _0x11bd74;                 },                 'GSePB': function (_0x2b71d3, _0x1c7be7) {                     return _0x2b71d3 == _0x1c7be7;                 },                 'CRqkf': _0x57a63c(0x509),                 'PRNCN': function (_0x1de63a, _0x33d8fa) {                     return _0x1de63a + _0x33d8fa;                 },                 'fpmdz': _0x57a63c(0x4af),                 'cqLWP': _0x57a63c(0x2b8) + '0',                 'tjxbg': _0x57a63c(0x3e6),                 'whsXy': _0x57a63c(0x1dc),                 'NZaVW': _0x57a63c(0x19c),                 'mWxsG': _0x57a63c(0x3d5),                 'nhSrm': function (_0x1a17c1, _0x4bec9f) {                     return _0x1a17c1 == _0x4bec9f;                 },                 'QwNcE': _0x57a63c(0x1e6),                 'prgEl': _0x57a63c(0x1c0),                 'ZQBtm': _0x57a63c(0x30b),                 'mTWan': _0x57a63c(0x3b1),                 'lqMJV': _0x57a63c(0x2ed),                 'kSBMc': _0x57a63c(0x27e),                 'IxKXy': _0x57a63c(0x327),                 'FIbbe': _0x57a63c(0x3af),                 'rRByt': _0x57a63c(0x25c),                 'dTTcP': _0x57a63c(0x397),                 'atBcR': _0x57a63c(0x342),                 'krESW': _0x57a63c(0x4a5),                 'qDCYX': _0x57a63c(0x316),                 'mxgch': _0x57a63c(0x223),                 'lTcDa': _0x57a63c(0x4fe),                 'yQqzo': function (_0x150bdb, _0x35d48b) {                     return _0x150bdb + _0x35d48b;                 },                 'CuWjy': _0x57a63c(0x504),                 'OVFnr': function (_0x53f830, _0x5927c7) {                     return _0x53f830 == _0x5927c7;                 },                 'jmRat': _0x57a63c(0x2a5),                 'LKklg': _0x57a63c(0x4b4) + _0x57a63c(0x4d9),                 'hXQjC': _0x57a63c(0x1d7),                 'zdGWC': _0x57a63c(0x4b4) + _0x57a63c(0x27a),                 'LPkUU': _0x57a63c(0x440),                 'BtvTU': _0x57a63c(0x38f) + '_2',                 'HPGnF': function (_0x2b50fb, _0x1319d5) {                     return _0x2b50fb == _0x1319d5;                 },                 'fQCxR': _0x57a63c(0x2ce),                 'hqznM': function (_0x481e47, _0x1c933c) {                     return _0x481e47 == _0x1c933c;                 },                 'TERjI': _0x57a63c(0x21f),                 'RgjWF': _0x57a63c(0x314),                 'MSdnp': _0x57a63c(0x3a1),                 'mrmYS': function (_0x56beac, _0x4da027) {                     return _0x56beac == _0x4da027;                 },                 'QfPnv': _0x57a63c(0x4d8),                 'zyUzM': _0x57a63c(0x1f2) + '_2',                 'vYuoK': _0x57a63c(0x546) + '_3',                 'VRyYI': function (_0x2a7a50, _0x158536) {                     return _0x2a7a50 == _0x158536;                 },                 'nmziw': _0x57a63c(0x534) + _0x57a63c(0x1f6),                 'EiGMb': _0x57a63c(0x271),                 'BHdYs': function (_0x339385, _0x3164e0) {                     return _0x339385 == _0x3164e0;                 },                 'icAcp': _0x57a63c(0x1c6),                 'QEcaB': _0x57a63c(0x2e1),                 'PeCPZ': _0x57a63c(0x295),                 'kMxML': function (_0x33c003, _0x5ebb88) {                     return _0x33c003 == _0x5ebb88;                 },                 'alIlv': _0x57a63c(0x50a),                 'tazss': function (_0x418531, _0x178b8a) {                     return _0x418531 == _0x178b8a;                 },                 'IqCoA': _0x57a63c(0x4db),                 'OhRbI': function (_0x56a306, _0x39f6cc) {                     return _0x56a306 == _0x39f6cc;                 },                 'CBgEJ': _0x57a63c(0x462),                 'vghyE': function (_0xe4d099, _0x27f9d3) {                     return _0xe4d099 == _0x27f9d3;                 },                 'GsYIM': _0x57a63c(0x1b4),                 'bhSJT': _0x57a63c(0x435),                 'ZXNSg': function (_0x4fddf8, _0x57e545) {                     return _0x4fddf8(_0x57e545);                 },                 'iFEME': _0x57a63c(0x43d),                 'aHqsS': function (_0x32575a, _0x5167a6) {                     return _0x32575a == _0x5167a6;                 },                 'aVpYp': _0x57a63c(0x321),                 'NwgJc': _0x57a63c(0x34c) + '3',                 'Cpckt': function (_0x3a86a4, _0x427c26) {                     return _0x3a86a4 == _0x427c26;                 },                 'ngrPE': _0x57a63c(0x1fa),                 'gqNny': _0x57a63c(0x434),                 'ZMIpc': _0x57a63c(0x20d),                 'PyTvm': function (_0x435d3a, _0x5b7b04) {                     return _0x435d3a == _0x5b7b04;                 },                 'UZhsS': _0x57a63c(0x547),                 'sFYtG': _0x57a63c(0x4c7),                 'nXubu': function (_0x20c5a4, _0x321b9f) {                     return _0x20c5a4 == _0x321b9f;                 },                 'shbzm': _0x57a63c(0x2b3),                 'Qcsnq': _0x57a63c(0x19a),                 'PKbrO': function (_0x971ee, _0x718426) {                     return _0x971ee == _0x718426;                 },                 'bpnSH': function (_0x41b958, _0x5d7d44) {                     return _0x41b958 != _0x5d7d44;                 },                 'EHzDI': function (_0x3cc9fe, _0x3bbe51) {                     return _0x3cc9fe != _0x3bbe51;                 },                 'PiMHB': function (_0x84ffa8, _0x4d450e) {                     return _0x84ffa8 != _0x4d450e;                 },                 'rucZX': _0x57a63c(0x416),                 'zaGie': function (_0x10e453, _0x542095) {                     return _0x10e453 == _0x542095;                 },                 'bxZNT': _0x57a63c(0x1f5),                 'VEoZx': _0x57a63c(0x21d),                 'LbrQR': function (_0x590e0d, _0x535bf2) {                     return _0x590e0d == _0x535bf2;                 },                 'YdGZT': _0x57a63c(0x312),                 'SMzaQ': _0x57a63c(0x4c3),                 'viDGB': function (_0x1f7c04, _0x2319e0) {                     return _0x1f7c04 == _0x2319e0;                 },                 'itBDe': _0x57a63c(0x4d6),                 'RDGRA': _0x57a63c(0x343),                 'tzZnY': _0x57a63c(0x1eb),                 'sRWVv': _0x57a63c(0x4dd) + _0x57a63c(0x45c),                 'VBrGR': function (_0x52bd3d, _0x227c9e) {                     return _0x52bd3d == _0x227c9e;                 },                 'tyVhA': _0x57a63c(0x4f6) + _0x57a63c(0x47f),                 'AgqKI': function (_0x19af0e, _0x1de84f) {                     return _0x19af0e == _0x1de84f;                 },                 'CcGBp': _0x57a63c(0x4bf) + _0x57a63c(0x3ff),                 'Yyiub': _0x57a63c(0x285) + _0x57a63c(0x282),                 'odhmC': function (_0x1f136a, _0x1db85f) {                     return _0x1f136a == _0x1db85f;                 },                 'DGcmH': _0x57a63c(0x3f5) + _0x57a63c(0x419),                 'GcsLZ': _0x57a63c(0x264) + _0x57a63c(0x4e1),                 'TcNiG': _0x57a63c(0x39f) + _0x57a63c(0x2a2),                 'sPebW': function (_0x5a3ad8, _0x4c8177) {                     return _0x5a3ad8 + _0x4c8177;                 },                 'PBpdh': _0x57a63c(0x39a),                 'QXoyz': function (_0x4ad8f9, _0x4f3bb7) {                     return _0x4ad8f9 == _0x4f3bb7;                 },                 'IADFs': _0x57a63c(0x29e),                 'bPwwe': function (_0x295122, _0xc5b842) {                     return _0x295122 == _0xc5b842;                 },                 'xvmrp': _0x57a63c(0x439),                 'GCytK': _0x57a63c(0x18b),                 'WeWbz': _0x57a63c(0x17d),                 'XxXGI': function (_0x2e3109, _0x40e2b7) {                     return _0x2e3109 == _0x40e2b7;                 },                 'mdbgf': _0x57a63c(0x43f),                 'XTIyD': _0x57a63c(0x270),                 'KEisa': function (_0x3d4098, _0x55900d) {                     return _0x3d4098 == _0x55900d;                 },                 'WRmJz': _0x57a63c(0x33f),                 'rSbLb': function (_0x26a3ae, _0x30155) {                     return _0x26a3ae == _0x30155;                 },                 'jMeey': _0x57a63c(0x493),                 'WsNQV': function (_0x2381fc, _0x5aeeb1) {                     return _0x2381fc + _0x5aeeb1;                 },                 'GVubN': _0x57a63c(0x332),                 'bmBun': _0x57a63c(0x235),                 'KYDUq': _0x57a63c(0x51f),                 'ZrEpx': function (_0x31f50c, _0x54421c) {                     return _0x31f50c == _0x54421c;                 },                 'GAZHs': _0x57a63c(0x33e),                 'uBxPH': _0x57a63c(0x2be),                 'LbIoy': function (_0x35c055, _0x3f20b6) {                     return _0x35c055 == _0x3f20b6;                 },                 'yVgWt': _0x57a63c(0x243),                 'ZAiDO': _0x57a63c(0x4b3),                 'wrAEN': function (_0x4cfe38, _0x546ccb) {                     return _0x4cfe38 == _0x546ccb;                 },                 'bjylL': _0x57a63c(0x361),                 'sgjDF': _0x57a63c(0x2a7),                 'CoBVw': _0x57a63c(0x206),                 'FLeur': function (_0x498568, _0x14fb53) {                     return _0x498568 == _0x14fb53;                 },                 'ntgOr': _0x57a63c(0x433),                 'yYtjI': _0x57a63c(0x1a6) + _0x57a63c(0x1b3) + '|6',                 'BTfQg': _0x57a63c(0x3f2),                 'FPlZe': _0x57a63c(0x4a2),                 'BAfga': function (_0x2c06cc, _0x20be03) {                     return _0x2c06cc == _0x20be03;                 },                 'ByICW': _0x57a63c(0x4cf),                 'sAyGW': _0x57a63c(0x28a),                 'HDcBC': function (_0x144721, _0x25a864) {                     return _0x144721 == _0x25a864;                 },                 'vzKyL': _0x57a63c(0x365),                 'LPego': function (_0x43cabf, _0x5e254e) {                     return _0x43cabf == _0x5e254e;                 },                 'CrxYX': _0x57a63c(0x39d),                 'QyEmO': _0x57a63c(0x36f),                 'IenWC': _0x57a63c(0x429),                 'TMVKE': function (_0x3853ad, _0x5ee466) {                     return _0x3853ad == _0x5ee466;                 },                 'OQTSK': _0x57a63c(0x41b),                 'KdXxp': _0x57a63c(0x39e),                 'MpONm': _0x57a63c(0x241),                 'iiiVI': _0x57a63c(0x496),                 'mGBPb': _0x57a63c(0x1e1),                 'yrerM': function (_0xe50276, _0x2c89cc) {                     return _0xe50276 == _0x2c89cc;                 },                 'vIJCe': _0x57a63c(0x386),                 'vEURm': function (_0x135101, _0x5792e1) {                     return _0x135101 == _0x5792e1;                 },                 'DFdQf': _0x57a63c(0x52f),                 'LStno': _0x57a63c(0x422),                 'IUkZP': _0x57a63c(0x538),                 'gezan': function (_0xe465b3, _0xc28538) {                     return _0xe465b3 == _0xc28538;                 },                 'xJDLp': _0x57a63c(0x387),                 'ZpkiK': _0x57a63c(0x3a6),                 'qKPyM': _0x57a63c(0x1b0),                 'WYYjg': function (_0x3ef9ed, _0x121b80) {                     return _0x3ef9ed == _0x121b80;                 },                 'sCXIN': _0x57a63c(0x36d),                 'rKGNf': function (_0x5a3d89, _0x3dc53f) {                     return _0x5a3d89 == _0x3dc53f;                 },                 'YGVGo': _0x57a63c(0x53b),                 'kDIMa': function (_0x3e367b, _0x56d9c0) {                     return _0x3e367b == _0x56d9c0;                 },                 'VrqYo': _0x57a63c(0x4a1),                 'wIgyC': _0x57a63c(0x33b) + _0x57a63c(0x44c) + _0x57a63c(0x29d) + '7',                 'gNftI': _0x57a63c(0x30d),                 'lmuGb': function (_0x8144ac, _0x246eff) {                     return _0x8144ac == _0x246eff;                 },                 'DMXQK': _0x57a63c(0x3a4),                 'uEJSA': function (_0x5b9bda, _0x45549f) {                     return _0x5b9bda == _0x45549f;                 },                 'ZWGsu': _0x57a63c(0x204),                 'sSUip': _0x57a63c(0x46e),                 'ErYcs': function (_0x5b8eaf, _0x33a94b) {                     return _0x5b8eaf == _0x33a94b;                 },                 'kbcWc': _0x57a63c(0x2f5),                 'MpAwa': function (_0x3c2032, _0x433bfe) {                     return _0x3c2032 == _0x433bfe;                 },                 'CADzx': _0x57a63c(0x244),                 'jFQsh': function (_0x3ff662, _0x481d9c) {                     return _0x3ff662 == _0x481d9c;                 },                 'uLCnv': _0x57a63c(0x2dc),                 'asvJF': function (_0x158cf9, _0x33310c) {                     return _0x158cf9 == _0x33310c;                 },                 'FmpqE': _0x57a63c(0x3f4),                 'xHayZ': _0x57a63c(0x4c5),                 'lGYWo': function (_0x1f2ba3, _0x2c53a1) {                     return _0x1f2ba3 == _0x2c53a1;                 },                 'tTeXU': _0x57a63c(0x409),                 'ssZaI': _0x57a63c(0x2d7),                 'CkuUi': function (_0x2143e2, _0x813c5) {                     return _0x2143e2 == _0x813c5;                 },                 'USMLz': _0x57a63c(0x38b),                 'CeOwx': _0x57a63c(0x498),                 'iqrrA': _0x57a63c(0x2f6) + _0x57a63c(0x455),                 'Szbjc': _0x57a63c(0x182) + _0x57a63c(0x455),                 'LBKeJ': _0x57a63c(0x4fb) + _0x57a63c(0x455),                 'TFFlN': _0x57a63c(0x445) + _0x57a63c(0x455),                 'BYEbg': function (_0xe35657, _0x36c0f0) {                     return _0xe35657 == _0x36c0f0;                 },                 'beLbr': _0x57a63c(0x520) + _0x57a63c(0x455),                 'IEYNL': function (_0x452fe4, _0x206ef2) {                     return _0x452fe4 == _0x206ef2;                 },                 'oSeRp': _0x57a63c(0x328) + _0x57a63c(0x455),                 'ypOXE': function (_0xac0915, _0xcb42ef) {                     return _0xac0915 == _0xcb42ef;                 },                 'DqYjK': _0x57a63c(0x40c) + _0x57a63c(0x455),                 'dzzVk': _0x57a63c(0x3e9) + _0x57a63c(0x455),                 'oUKpF': function (_0x33c74c, _0x870be1) {                     return _0x33c74c + _0x870be1;                 },                 'WSxXi': _0x57a63c(0x180),                 'IZyNm': function (_0x3e5e19, _0x15d532) {                     return _0x3e5e19 == _0x15d532;                 },                 'hswJP': _0x57a63c(0x2bc),                 'AQEei': _0x57a63c(0x527),                 'MjXcR': function (_0x5ead19, _0xd6a235) {                     return _0x5ead19 + _0xd6a235;                 },                 'VoXuW': _0x57a63c(0x1d4),                 'ZYXJn': _0x57a63c(0x351) + _0x57a63c(0x39c),                 'AwytU': _0x57a63c(0x304) + _0x57a63c(0x39c),                 'txemb': function (_0x53fb16, _0x1b0c7f) {                     return _0x53fb16 == _0x1b0c7f;                 },                 'FDiup': _0x57a63c(0x3c3) + _0x57a63c(0x39c),                 'Gdksm': function (_0x72c8ec, _0x6b8eb6) {                     return _0x72c8ec == _0x6b8eb6;                 },                 'PQCSE': _0x57a63c(0x457) + _0x57a63c(0x39c),                 'efViy': _0x57a63c(0x202),                 'fpAcJ': _0x57a63c(0x3c8),                 'kqcCv': _0x57a63c(0x369),                 'qraNO': function (_0x23c2a6, _0x25ad70) {                     return _0x23c2a6 - _0x25ad70;                 },                 'LwsaE': function (_0x3c82cf, _0x37d071) {                     return _0x3c82cf - _0x37d071;                 },                 'oyEFg': function (_0x4c0f1e, _0x10e76e) {                     return _0x4c0f1e - _0x10e76e;                 },                 'wHAlq': function (_0x17e1c4, _0x59a861) {                     return _0x17e1c4 == _0x59a861;                 },                 'ngppz': _0x57a63c(0x3bb),                 'RuVWv': _0x57a63c(0x4c6) + '4',                 'lpxDu': _0x57a63c(0x402) + _0x57a63c(0x3dd) + _0x57a63c(0x50b) + 'fa',                 'rHfHb': _0x57a63c(0x3a8) + '1',                 'LIryW': function (_0x3e58e6, _0x736dfd) {                     return _0x3e58e6 == _0x736dfd;                 },                 'AElBk': _0x57a63c(0x3f3),                 'RmTdj': _0x57a63c(0x4bb) + _0x57a63c(0x17f),                 'nFxLN': _0x57a63c(0x447),                 'jqjlx': _0x57a63c(0x2d2) + '2',                 'psVma': _0x57a63c(0x2ef) + _0x57a63c(0x40f) + _0x57a63c(0x217) + '6c',                 'GwMQF': function (_0x2bb8b9, _0x36ae32) {                     return _0x2bb8b9 == _0x36ae32;                 },                 'gCojY': _0x57a63c(0x3fb),                 'qaQCv': _0x57a63c(0x2d2) + '4',                 'geJCm': _0x57a63c(0x370) + _0x57a63c(0x23d) + _0x57a63c(0x3eb) + 'b3',                 'CcODv': function (_0x5b7788, _0x5acaa2) {                     return _0x5b7788 == _0x5acaa2;                 },                 'kuNbH': _0x57a63c(0x2af),                 'nWqxX': _0x57a63c(0x2d2) + '6',                 'fzUZm': _0x57a63c(0x261) + _0x57a63c(0x514) + _0x57a63c(0x193) + '44',                 'FxlZg': _0x57a63c(0x4e9),                 'ugfrn': _0x57a63c(0x2d2) + '3',                 'WMtFh': _0x57a63c(0x49e) + _0x57a63c(0x463) + _0x57a63c(0x52a) + 'e4',                 'UYdQG': function (_0x546e27, _0x25a9b7) {                     return _0x546e27 == _0x25a9b7;                 },                 'bCXJC': _0x57a63c(0x518),                 'yZtmS': _0x57a63c(0x2d2) + '1',                 'BsEAo': _0x57a63c(0x418) + _0x57a63c(0x4a8) + _0x57a63c(0x26e) + '29',                 'HShdw': _0x57a63c(0x37a),                 'HWnLc': _0x57a63c(0x2d2) + '5',                 'YidHu': _0x57a63c(0x3f8) + _0x57a63c(0x395) + _0x57a63c(0x44b) + '78',                 'GQfFc': function (_0x4084d6, _0x215c93) {                     return _0x4084d6 != _0x215c93;                 },                 'iJWNa': _0x57a63c(0x2ea) + _0x57a63c(0x1ef) + 'o',                 'VskLo': _0x57a63c(0x485) + '事件',                 'OaXZP': function (_0x4557f6, _0x17523b) {                     return _0x4557f6 == _0x17523b;                 },                 'iaqmT': _0x57a63c(0x535),                 'ZeXJw': function (_0x404ae6, _0x2bd2c2) {                     return _0x404ae6 == _0x2bd2c2;                 },                 'uSHiP': _0x57a63c(0x292),                 'Pofzg': _0x57a63c(0x2c3),                 'ABJpm': function (_0xbe7f3e, _0x9acd56) {                     return _0xbe7f3e == _0x9acd56;                 },                 'RqPqI': _0x57a63c(0x1f7),                 'uuwly': _0x57a63c(0x524),                 'qlIBy': _0x57a63c(0x290),                 'eQYgl': _0x57a63c(0x352),                 'SBcdz': function (_0x4db07e, _0x3d7f62) {                     return _0x4db07e == _0x3d7f62;                 },                 'tEUsv': _0x57a63c(0x1b2),                 'lSIaH': _0x57a63c(0x3ab),                 'QWUZv': function (_0x40cb48, _0x12bc04) {                     return _0x40cb48 == _0x12bc04;                 },                 'ZBleM': function (_0x22bdd4, _0x366db7) {                     return _0x22bdd4 == _0x366db7;                 },                 'BaHLk': function (_0x44ef8b, _0x470afc) {                     return _0x44ef8b == _0x470afc;                 },                 'lqLJh': function (_0x61bdef, _0x4152b8) {                     return _0x61bdef == _0x4152b8;                 },                 'NMXEh': function (_0x59a63d, _0x254003) {                     return _0x59a63d == _0x254003;                 },                 'KMYlC': function (_0x2f719e, _0x4ade01) {                     return _0x2f719e == _0x4ade01;                 },                 'wgjlT': _0x57a63c(0x42a),                 'NMDmm': function (_0x495cc0, _0x2370f5) {                     return _0x495cc0 == _0x2370f5;                 },                 'NGVII': _0x57a63c(0x47a),                 'DcTCw': _0x57a63c(0x2e8),                 'PUDqd': _0x57a63c(0x477),                 'WqgVa': function (_0x3d0d30, _0x5a6529) {                     return _0x3d0d30 == _0x5a6529;                 },                 'LrMVS': _0x57a63c(0x31e),                 'BdkEZ': function (_0x4ca88f, _0x1e4635) {                     return _0x4ca88f == _0x1e4635;                 },                 'sIjGl': _0x57a63c(0x2c2),                 'ZtmPx': _0x57a63c(0x27c),                 'VZASz': _0x57a63c(0x20b),                 'kkqNc': _0x57a63c(0x221),                 'mOJkd': _0x57a63c(0x2e9),                 'mVyZZ': _0x57a63c(0x29f),                 'KNaTc': function (_0x5b683c, _0x38d823) {                     return _0x5b683c == _0x38d823;                 },                 'BNcQX': _0x57a63c(0x54e),                 'hUQlr': function (_0x3fde4d, _0x6317e5) {                     return _0x3fde4d == _0x6317e5;                 },                 'WcBwz': _0x57a63c(0x1a9),                 'FSyBf': _0x57a63c(0x3e4),                 'LhcRe': _0x57a63c(0x508),                 'UlnjB': function (_0xd5768a, _0x42d36f) {                     return _0xd5768a == _0x42d36f;                 },                 'xkLoJ': _0x57a63c(0x430),                 'TpVAz': function (_0xe57ba7, _0x271064) {                     return _0xe57ba7 == _0x271064;                 },                 'jywst': function (_0x15d5a3, _0x4ed427) {                     return _0x15d5a3 == _0x4ed427;                 },                 'fsgAh': _0x57a63c(0x277),                 'LOWIF': _0x57a63c(0x4cb),                 'UEPlL': _0x57a63c(0x44e) + _0x57a63c(0x500),                 'RFIdP': _0x57a63c(0x21e),                 'BMXPP': _0x57a63c(0x459),                 'qDHRt': _0x57a63c(0x44e) + _0x57a63c(0x4bc),                 'HOsTn': function (_0x5a5135, _0x106617) {                     return _0x5a5135 == _0x106617;                 },                 'tACMh': _0x57a63c(0x51c),                 'ELIes': _0x57a63c(0x3bd),                 'lyyzp': _0x57a63c(0x44e) + _0x57a63c(0x4d2),                 'JThEr': _0x57a63c(0x502),                 'PuQJL': _0x57a63c(0x1ca),                 'FHzbh': _0x57a63c(0x194) + _0x57a63c(0x2f3),                 'LrNvW': function (_0x44d42e, _0x5408e0) {                     return _0x44d42e == _0x5408e0;                 },                 'wMcng': _0x57a63c(0x368),                 'fWBtQ': _0x57a63c(0x2d3),                 'BBTvG': _0x57a63c(0x532) + _0x57a63c(0x3bc),                 'lgspm': function (_0x5474f6, _0x9acfbc) {                     return _0x5474f6 == _0x9acfbc;                 },                 'wyHWI': _0x57a63c(0x4b9),                 'NLJRF': _0x57a63c(0x335),                 'OsUgr': _0x57a63c(0x44e) + _0x57a63c(0x184),                 'xWHnP': _0x57a63c(0x3d1),                 'dVbtS': _0x57a63c(0x17e),                 'jeQbI': _0x57a63c(0x1b6) + _0x57a63c(0x1f0),                 'SyVEp': function (_0x43f070, _0x17877a) {                     return _0x43f070 == _0x17877a;                 },                 'ZsazI': _0x57a63c(0x4a0),                 'ZaIsj': _0x57a63c(0x483),                 'pjjjo': _0x57a63c(0x1b6) + _0x57a63c(0x1fd),                 'vmypD': _0x57a63c(0x309),                 'VTCfv': _0x57a63c(0x1b6) + _0x57a63c(0x48d),                 'EUtVx': _0x57a63c(0x33a),                 'JsqRC': _0x57a63c(0x513),                 'SwhpG': _0x57a63c(0x44e) + _0x57a63c(0x42b),                 'Rygvu': _0x57a63c(0x37b),                 'BLFcb': _0x57a63c(0x492),                 'jOWEL': _0x57a63c(0x1b6) + _0x57a63c(0x476),                 'uzkVN': function (_0x25ce56, _0xfb16e7) {                     return _0x25ce56 == _0xfb16e7;                 },                 'oiQbs': _0x57a63c(0x4e7),                 'cBUDb': _0x57a63c(0x3df),                 'TJfvj': _0x57a63c(0x44e) + _0x57a63c(0x24c),                 'zmCCq': function (_0xe78ece, _0x26c316) {                     return _0xe78ece == _0x26c316;                 },                 'mYxxg': _0x57a63c(0x48e),                 'RTHIV': _0x57a63c(0x1be),                 'cyOyd': _0x57a63c(0x1b6) + _0x57a63c(0x1a5),                 'GXsPt': function (_0x38f1a0, _0x2b0896) {                     return _0x38f1a0 == _0x2b0896;                 },                 'Wukaz': _0x57a63c(0x4be),                 'losOZ': _0x57a63c(0x237),                 'CYzwy': _0x57a63c(0x1b6) + _0x57a63c(0x541),                 'ZUJeN': function (_0x157ddf, _0x4a7e0b) {                     return _0x157ddf == _0x4a7e0b;                 },                 'DaPOu': _0x57a63c(0x3c9),                 'kdlql': _0x57a63c(0x2de),                 'paVAv': _0x57a63c(0x1b6) + _0x57a63c(0x53e),                 'YzCLd': function (_0x1e0329, _0xf52f40) {                     return _0x1e0329 == _0xf52f40;                 },                 'DeFLy': _0x57a63c(0x236),                 'FZVTX': _0x57a63c(0x265),                 'RVmAn': _0x57a63c(0x44e) + _0x57a63c(0x40e),                 'ArXVn': function (_0x55a10e, _0x158fc) {                     return _0x55a10e == _0x158fc;                 },                 'lwRnz': _0x57a63c(0x1bb),                 'weyCS': _0x57a63c(0x4d1) + _0x57a63c(0x35f),                 'CPzhV': _0x57a63c(0x3e2),                 'jYFjO': _0x57a63c(0x3ce),                 'qmBri': _0x57a63c(0x512) + _0x57a63c(0x238),                 'UpgLF': function (_0x4d9b75, _0x4626f0) {                     return _0x4d9b75 == _0x4626f0;                 },                 'RBxoG': _0x57a63c(0x438),                 'STNhd': _0x57a63c(0x3d3) + _0x57a63c(0x3a9),                 'vQZPE': _0x57a63c(0x255),                 'JEXVo': _0x57a63c(0x2e2),                 'POWfT': _0x57a63c(0x1ac) + _0x57a63c(0x437),                 'zltnI': _0x57a63c(0x1cf),                 'NwOgK': _0x57a63c(0x4bd),                 'VWYix': _0x57a63c(0x512) + _0x57a63c(0x248),                 'LJJVv': _0x57a63c(0x42f),                 'fzSfV': _0x57a63c(0x4ca),                 'dmECM': _0x57a63c(0x3b7) + _0x57a63c(0x401),                 'luzBd': _0x57a63c(0x2d1),                 'Jfser': _0x57a63c(0x266),                 'dIVMz': _0x57a63c(0x375) + _0x57a63c(0x281),                 'SDZCb': _0x57a63c(0x23b),                 'CBDgV': _0x57a63c(0x216),                 'UbsZz': _0x57a63c(0x512) + _0x57a63c(0x530),                 'GQMXr': _0x57a63c(0x1f9),                 'FwzjB': _0x57a63c(0x4eb),                 'ZklUp': _0x57a63c(0x3fe) + _0x57a63c(0x27d),                 'FRCDg': _0x57a63c(0x315),                 'yvnOn': _0x57a63c(0x231) + _0x57a63c(0x29c),                 'bhOyi': _0x57a63c(0x3ee),                 'ejYRt': _0x57a63c(0x1ff),                 'eocVo': _0x57a63c(0x38a) + _0x57a63c(0x4a9),                 'vmMcn': function (_0x2e747b, _0x52cf33) {                     return _0x2e747b == _0x52cf33;                 },                 'PQvkI': _0x57a63c(0x356),                 'tAMxP': _0x57a63c(0x1a7),                 'iwSgM': _0x57a63c(0x2c4) + _0x57a63c(0x3bf),                 'xqgyx': _0x57a63c(0x377),                 'flsrE': _0x57a63c(0x376),                 'PXQFE': _0x57a63c(0x1c1) + _0x57a63c(0x53d),                 'lGujq': function (_0x50c88b, _0x184c76) {                     return _0x50c88b == _0x184c76;                 },                 'funAK': _0x57a63c(0x303),                 'sRldj': _0x57a63c(0x273),                 'jgesP': _0x57a63c(0x2b2) + _0x57a63c(0x1ed),                 'XWPhH': _0x57a63c(0x4ee),                 'AFfQQ': _0x57a63c(0x38e),                 'DKxvy': _0x57a63c(0x464) + _0x57a63c(0x43a),                 'EgyEJ': function (_0x2e2052, _0x342f3f) {                     return _0x2e2052 == _0x342f3f;                 },                 'DhsrY': function (_0x489933, _0x417bdc) {                     return _0x489933 == _0x417bdc;                 },                 'NLwJk': function (_0x3d5372, _0xbbc995) {                     return _0x3d5372 == _0xbbc995;                 },                 'tSlET': function (_0x329851, _0xa2fa44) {                     return _0x329851 == _0xa2fa44;                 },                 'LaiBQ': _0x57a63c(0x3d7),                 'nBdCJ': _0x57a63c(0x32c),                 'lLHdK': function (_0x19b21d, _0x42c329) {                     return _0x19b21d == _0x42c329;                 },                 'wCvyy': _0x57a63c(0x3a5),                 'knjQH': _0x57a63c(0x251),                 'CFSkr': function (_0xd2b0d6, _0x53b0fe) {                     return _0xd2b0d6 == _0x53b0fe;                 },                 'dLwvG': _0x57a63c(0x3aa),                 'tAuRJ': function (_0x16630a, _0x4faeb2) {                     return _0x16630a == _0x4faeb2;                 },                 'KhGzn': _0x57a63c(0x3d0),                 'qFiSA': _0x57a63c(0x20a),                 'ghDqr': _0x57a63c(0x284),                 'khRJV': function (_0x4c3b1c, _0xb052be) {                     return _0x4c3b1c == _0xb052be;                 },                 'mmtol': _0x57a63c(0x27b),                 'giMdm': function (_0x14c20f, _0xb7940d) {                     return _0x14c20f == _0xb7940d;                 },                 'FKkEh': _0x57a63c(0x23c),                 'jcRCv': _0x57a63c(0x4a3),                 'tlctn': _0x57a63c(0x211),                 'XfplW': function (_0x3820a4, _0x574262) {                     return _0x3820a4 == _0x574262;                 },                 'orBpo': _0x57a63c(0x32d),                 'hbTJC': _0x57a63c(0x358),                 'iqzVo': function (_0x9b93bd, _0x9261b9) {                     return _0x9b93bd == _0x9261b9;                 },                 'Rfuyo': _0x57a63c(0x1ae),                 'ieBMm': _0x57a63c(0x3e1),                 'AtVNO': _0x57a63c(0x50d),                 'qbkXr': _0x57a63c(0x22b) + _0x57a63c(0x288) + _0x57a63c(0x242) + _0x57a63c(0x179) + _0x57a63c(0x515),                 'ylygg': _0x57a63c(0x2ec),                 'IsAUh': _0x57a63c(0x37e),                 'RibJm': _0x57a63c(0x363),                 'LqLYv': function (_0x1184f2, _0x39a41b) {                     return _0x1184f2 == _0x39a41b;                 },                 'PPNsA': _0x57a63c(0x21c),                 'ixoal': _0x57a63c(0x45d),                 'hfllO': _0x57a63c(0x45e),                 'VvErn': function (_0x160104, _0x482473) {                     return _0x160104 == _0x482473;                 },                 'LPLqM': _0x57a63c(0x212),                 'hFxxw': function (_0x260a4c, _0x2895ea) {                     return _0x260a4c == _0x2895ea;                 },                 'PjihA': _0x57a63c(0x4ff),                 'KsEwB': _0x57a63c(0x474),                 'EJETY': function (_0x2497e, _0xef84fd) {                     return _0x2497e == _0xef84fd;                 },                 'qVbvJ': _0x57a63c(0x3c7),                 'PDinl': function (_0x114ee7, _0x56e173) {                     return _0x114ee7 == _0x56e173;                 },                 'pNvZe': _0x57a63c(0x2d8),                 'DnnLp': function (_0x16b09b, _0x54e49d) {                     return _0x16b09b == _0x54e49d;                 },                 'PQtHX': _0x57a63c(0x53f),                 'fOOKG': _0x57a63c(0x283),                 'lnRdi': function (_0x5f5972, _0x349b77) {                     return _0x5f5972 == _0x349b77;                 },                 'crfzY': _0x57a63c(0x308),                 'KlKsI': function (_0x361cb8, _0x14415c) {                     return _0x361cb8 == _0x14415c;                 },                 'uyXAC': _0x57a63c(0x466),                 'ofENF': _0x57a63c(0x47d),                 'VecOK': function (_0x2cc987, _0x3187a2) {                     return _0x2cc987 == _0x3187a2;                 },                 'zPrAx': _0x57a63c(0x1a1),                 'vfgKX': function (_0x1a05c8, _0x299ded) {                     return _0x1a05c8 == _0x299ded;                 },                 'qLClJ': function (_0x17ff59, _0x1ea734) {                     return _0x17ff59 == _0x1ea734;                 },                 'zAnOY': _0x57a63c(0x451),                 'TRwJm': _0x57a63c(0x364) + '0',                 'MBbgO': function (_0x5d110c, _0x128ee6) {                     return _0x5d110c == _0x128ee6;                 },                 'JugzS': function (_0x204941, _0x36b80e, _0x23b697) {                     return _0x204941(_0x36b80e, _0x23b697);                 },                 'rsOWy': _0x57a63c(0x267),                 'IJJaH': _0x57a63c(0x454) + _0x57a63c(0x2db),                 'fBNNW': function (_0x35aa07, _0x5c8697) {                     return _0x35aa07 == _0x5c8697;                 },                 'UVHlW': function (_0x1ad10f, _0x481821) {                     return _0x1ad10f == _0x481821;                 },                 'XGQmq': function (_0x48acc1, _0x5a2600) {                     return _0x48acc1 == _0x5a2600;                 },                 'eYbvJ': function (_0x36186f, _0x1b70b5) {                     return _0x36186f == _0x1b70b5;                 }             };         if (_0x5ea157[_0x57a63c(0x250)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x1fe)]))             _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](0x132d * 0x2 + -0x6ad * 0x3 + -0x1249 * 0x1, -0x18e4 + 0x1 * -0x61f + 0x1 * 0x1f0d, 0x1452 + 0x111 * 0x1a + -0x1801 * 0x2), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = 0x14 * 0x63 + 0x1775 + -0x1b49;         else {             if (_0x5ea157[_0x57a63c(0x34d)](_0x2d5e1c[_0x57a63c(0x183)], '报警'))                 _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](0xad * -0x16 + 0x882 + 0x666, 0x1df1 + -0x6f4 * -0x4 + -0xc5 * 0x4b, -0x901 + 0x2 * -0x262 + 0xdcf), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = 0x1 * 0xf93 + 0x7 * 0x335 + 0x16 * -0x18d;             else {                 if (_0x5ea157[_0x57a63c(0x3b9)](_0x2d5e1c[_0x57a63c(0x183)], '草坪'))                     _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x1b58 + 0x1 * -0x97d + 0x24df, 0x17fd + -0x1a78 + 0x285, -0x216e + -0x1011 + 0x3189), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x1a57 * 0x1 + 0xda1 + 0x109e;                 else {                     if (_0x5ea157[_0x57a63c(0x20f)](_0x2d5e1c[_0x57a63c(0x183)], '地面'))                         _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x89 * 0x39 + 0xf80 + 0xf0b * 0x1, -0x23e9 + -0x4bc + 0x28af * 0x1, -0x619 + -0x2 * -0x33f + -0x5b * 0x1), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x1285 + -0x816 + 0x49 * 0x6b;                     else {                         if (_0x5ea157[_0x57a63c(0x425)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x178)]))                             _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](0x79 * 0x11 + -0x1 * 0x4d5 + 0x2 * -0x195, 0x208c * 0x1 + -0x16bc + -0x9c6, 0x8 * 0x221 + 0x801 * 0x2 + -0x2100), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = 0x1df * 0x7 + -0x7f9 * -0x3 + -0x211c;                         else {                             if (_0x5ea157[_0x57a63c(0x478)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x2cb)]))                                 _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](0x1 * -0x103d + 0x26e * 0xc + -0xce1, 0x4f8 * 0x2 + 0x248f + -0x2e75, -0x1e44 + -0x1404 + -0x3252 * -0x1), _0x2d5e1c[_0x57a63c(0x3f1)] = ![], _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x1 * -0xf4f + 0xdc7 + -0x192e, locationFloor = _0x2d5e1c;                             else {                                 if (_0x5ea157[_0x57a63c(0x4dc)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x396)]))                                     _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](0x11c4 + -0x2077 * -0x1 + 0x3231 * -0x1, 0x1 * -0x3b + -0x496 + -0xb * -0x71, -0xb8e + 0x5 * -0x3c6 + 0x1e76), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x2542 + 0x20c8 + 0x862, duishichang1Room = _0x2d5e1c, allRoomObjs[_0x57a63c(0x4f2)](_0x2d5e1c);                                 else {                                     if (_0x5ea157[_0x57a63c(0x4d4)](_0x2d5e1c[_0x57a63c(0x183)], '管道'))                                         _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](0x158 * 0x10 + -0x48e + -0x43a * 0x4, 0xacd + -0x23fe + 0x193b, -0x19 * -0x14f + -0x379 + -0x74d * 0x4), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x1585 + 0x4 * 0x3a1 + 0x93 * 0x13, GDmodel = _0x2d5e1c, _0x2d5e1c[_0x57a63c(0x505)](_0x18151b => {                                             const _0x5da684 = _0x57a63c;                                             _0x5ea157[_0x5da684(0x46d)](_0x18151b[_0x5da684(0x41c)], _0x5ea157[_0x5da684(0x3c0)]) && (_0x5ea157[_0x5da684(0x478)](_0x18151b[_0x5da684(0x183)], '管道') && _0x18151b[_0x5da684(0x505)](_0x2693f9 => {                                                 const _0x4efc6b = _0x5da684;                                                 if (_0x5ea157[_0x4efc6b(0x46d)](_0x2693f9[_0x4efc6b(0x183)], _0x5ea157[_0x4efc6b(0x2bd)]))                                                     GDoutboxYSKQ = _0x2693f9;                                                 else {                                                     if (_0x5ea157[_0x4efc6b(0x46d)](_0x2693f9[_0x4efc6b(0x183)], '水管'))                                                         GDoutboxSG = _0x2693f9;                                                     else {                                                         if (_0x5ea157[_0x4efc6b(0x28d)](_0x2693f9[_0x4efc6b(0x183)], _0x5ea157[_0x4efc6b(0x1d8)]))                                                             GDoutboxSS = _0x2693f9;                                                         else {                                                             if (_0x5ea157[_0x4efc6b(0x46d)](_0x2693f9[_0x4efc6b(0x183)], _0x5ea157[_0x4efc6b(0x254)]))                                                                 GDoutboxLZFJ = _0x2693f9;                                                             else {                                                                 if (_0x5ea157[_0x4efc6b(0x46d)](_0x2693f9[_0x4efc6b(0x183)], _0x5ea157[_0x4efc6b(0x38c)]))                                                                     GDoutboxDQ = _0x2693f9;                                                                 else {                                                                     if (_0x5ea157[_0x4efc6b(0x28d)](_0x2693f9[_0x4efc6b(0x183)], _0x5ea157[_0x4efc6b(0x50e)]))                                                                         GDoutboxCXFFJ = _0x2693f9;                                                                     else                                                                         (_0x5ea157[_0x4efc6b(0x468)](_0x2693f9[_0x4efc6b(0x183)], _0x5ea157[_0x4efc6b(0x4ac)]) || _0x5ea157[_0x4efc6b(0x28d)](_0x2693f9[_0x4efc6b(0x183)], _0x5ea157[_0x4efc6b(0x3a3)])) && GDotherBox[_0x4efc6b(0x4f2)](_0x2693f9);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }), _0x5ea157[_0x5da684(0x28e)](_0x18151b[_0x5da684(0x183)], _0x5ea157[_0x5da684(0x2f0)]) && (_0x18151b[_0x5da684(0x3f1)] = ![], _0x18151b[_0x5da684(0x505)](_0x819eff => {                                                 const _0x26ba72 = _0x5da684;                                                 if (_0x5ea157[_0x26ba72(0x28d)](_0x819eff[_0x26ba72(0x183)], _0x5ea157[_0x26ba72(0x213)]))                                                     GDmovingCXFFJ = _0x819eff;                                                 else {                                                     if (_0x5ea157[_0x26ba72(0x349)](_0x819eff[_0x26ba72(0x183)], _0x5ea157[_0x26ba72(0x24f)]))                                                         GDmovingSS = _0x819eff;                                                     else {                                                         if (_0x5ea157[_0x26ba72(0x468)](_0x819eff[_0x26ba72(0x183)], _0x5ea157[_0x26ba72(0x1d0)]))                                                             GDmovingLZFJ = _0x819eff;                                                         else {                                                             if (_0x5ea157[_0x26ba72(0x28c)](_0x819eff[_0x26ba72(0x183)], _0x5ea157[_0x26ba72(0x17c)]))                                                                 GDmovingYSKQ = _0x819eff;                                                             else {                                                                 if (_0x5ea157[_0x26ba72(0x28e)](_0x819eff[_0x26ba72(0x183)], _0x5ea157[_0x26ba72(0x543)]))                                                                     GDmovingSG = _0x819eff;                                                                 else                                                                     _0x5ea157[_0x26ba72(0x468)](_0x819eff[_0x26ba72(0x183)], _0x5ea157[_0x26ba72(0x533)]) && (GDmovingDQ = _0x819eff);                                                             }                                                         }                                                     }                                                 }                                                 _0x819eff[_0x26ba72(0x1d2)] && (_0x819eff[_0x26ba72(0x4f4)][_0x26ba72(0x186)] = null, _0x819eff[_0x26ba72(0x4f4)][_0x26ba72(0x348) + 't'] = !![], _0x819eff[_0x26ba72(0x4f4)][_0x26ba72(0x46a)] = ![], _0x819eff[_0x26ba72(0x278) + 'r'] = -0x24dd * -0x1 + 0x164 * 0x2 + -0x1fd5);                                             })));                                         });                                     else {                                         if (_0x5ea157[_0x57a63c(0x289)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x523)]))                                             _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x56 + 0x3f3 + -0x393, 0x29 * 0xd4 + 0x70 * 0x38 + 0x2 * -0x1d35, 0x6 * -0x6f + -0x5 * 0x259 + -0x3 * -0x4cb), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = 0x1c83 + -0x20dd + 0x1 * 0x842, junhuaRoom = _0x2d5e1c, allRoomObjs[_0x57a63c(0x4f2)](_0x2d5e1c);                                         else {                                             if (_0x5ea157[_0x57a63c(0x478)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x3dc)])) {                                                 const _0x7c836a = _0x5ea157[_0x57a63c(0x2bf)][_0x57a63c(0x3d8)]('|');                                                 let _0x540965 = -0x6ab + -0x24f0 + 0x2b9b;                                                 while (!![]) {                                                     switch (_0x7c836a[_0x540965++]) {                                                     case '0':                                                         _0x2d5e1c[_0x57a63c(0x505)](_0x2bb109 => {                                                             const _0x3e6376 = _0x57a63c;                                                             _0x5ea157[_0x3e6376(0x22a)](_0x2bb109[_0x3e6376(0x41c)], _0x5ea157[_0x3e6376(0x3c0)]) && (_0x5ea157[_0x3e6376(0x355)](_0x2bb109[_0x3e6376(0x183)], _0x5ea157[_0x3e6376(0x2b1)]) && (_0x2bb109[_0x3e6376(0x3f1)] = ![]));                                                         });                                                         continue;                                                     case '1':                                                         _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = 0x39 * -0x1b + 0x1c * 0x3a + 0x393;                                                         continue;                                                     case '2':                                                         _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x2f * 0x5b + 0x1e82 + -0xdc3, 0x20 + -0x2274 + 0x225e * 0x1, 0x1e * -0x19 + -0x1d88 + 0x140 * 0x1a);                                                         continue;                                                     case '3':                                                         limoRoom = _0x2d5e1c;                                                         continue;                                                     case '4':                                                         console[_0x57a63c(0x31a)](_0x2d5e1c);                                                         continue;                                                     case '5':                                                         allRoomObjs[_0x57a63c(0x4f2)](_0x2d5e1c);                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x5ea157[_0x57a63c(0x36b)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x2b1)])) {                                                     moveingRobot = _0x2d5e1c, _0x2d5e1c[_0x57a63c(0x460)][_0x57a63c(0x383)] = 0x91 * 0x7 + -0x59 * -0x1 + -0x44f, _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x2ac + 0xaf * 0xc + -0x57e, 0x268f + 0x467 + 0x29 * -0x10c, -0x1 * 0x20ff + -0x1fdf + -0x10c * -0x3e), _0x2d5e1c[_0x57a63c(0x1ec)][_0x57a63c(0x1b1)](-(-0x872 + 0xe12 + 0x2 * 0x35f + 0.6799999999998363), _0x5ea157[_0x57a63c(0x548)](-0xc7 * -0x2 + 0x3a * 0xe + -0x3e4 + 0.6399999999999864, -0x11e * 0x1 + 0x4f * -0x8 + 0x399 + 0.33000000000000007), -(0x6e2 * 0x1 + -0x3c1 * -0x2 + 0x1b4 * -0x5 + 0.029999999999972715)), _0x2d5e1c[_0x57a63c(0x1ce)](-(-0x765 * 0x5 + -0xfb1 + 0xa * 0x692 + 0.21000000000003638), _0x5ea157[_0x57a63c(0x181)](-0x21d5 + -0x1546 + 0x37f1 + 0.6399999999999864, 0x2535 + -0x2 * -0xe35 + -0x419c + 0.33000000000000007), -(0x221d + 0xe5 * -0x9 + -0x3 * 0x6bb + 0.9500000000000455));                                                     let _0x44c5bd = new THREE[(_0x57a63c(0x1c3)) + (_0x57a63c(0x2fe))](-0x1e7 + -0x1 * -0xf8 + -0x50 * -0x3, 0x272 + -0x1433 + 0x11c2), _0xdaa7f1 = new THREE[(_0x57a63c(0x4ed)) + (_0x57a63c(0x2f7))]({                                                             'color': 0xffff00,                                                             'side': THREE[_0x57a63c(0x197)]                                                         }), _0x42f9d6 = new THREE[(_0x57a63c(0x4f8))](_0x44c5bd, _0xdaa7f1);                                                     _0x42f9d6[_0x57a63c(0x183)] = _0x5ea157[_0x57a63c(0x424)], _0x42f9d6[_0x57a63c(0x1ec)][_0x57a63c(0x1b1)](-0x1a43 + 0x166f + 0xc5 * 0x5, -0x71 * 0x6 + -0x1070 + -0x98f * -0x2, -0x1f8e + -0x18f * -0x7 + 0x14a5), _0x42f9d6[_0x57a63c(0x3f1)] = ![], _0x2d5e1c[_0x57a63c(0x305)](_0x42f9d6);                                                     let _0x1bf4ec = _0x5ea157[_0x57a63c(0x381)](makeTextSprite, _0x5ea157[_0x57a63c(0x33c)], {                                                         'fontsize': 0x14,                                                         'borderColor': {                                                             'r': 0xff,                                                             'g': 0x0,                                                             'b': 0x0,                                                             'a': 0.4                                                         },                                                         'backgroundColor': {                                                             'r': 0xff,                                                             'g': 0xff,                                                             'b': 0xff,                                                             'a': 0.9                                                         },                                                         'size': [                                                             -0x2c * -0x17 + 0x1ffa + -0x23ed,                                                             0x2435 + 0x75 + -0x24a9 + 0.5                                                         ]                                                     });                                                     _0x1bf4ec[_0x57a63c(0x32e)] = new THREE[(_0x57a63c(0x1ba))](0x265e + -0x125 + 0x2539 * -0x1 + 0.5, -0x1 * -0xd87 + 0x1798 + -0x251e), _0x1bf4ec[_0x57a63c(0x1ec)][_0x57a63c(0x1b1)](-0xc82 + 0xb * 0x2ea + 0x3 * -0x684, 0x490 + 0x1da5 * 0x1 + 0x4 * -0x88d + 0.19999999999999996, 0x1d * -0x61 + 0x26a4 + 0x1 * -0x1ba7), _0x1bf4ec[_0x57a63c(0x183)] = _0x5ea157[_0x57a63c(0x2e3)], _0x2d5e1c[_0x57a63c(0x305)](_0x1bf4ec), allRoomObjs[_0x57a63c(0x4f2)](_0x2d5e1c);                                                 } else {                                                     if (_0x5ea157[_0x57a63c(0x54a)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x4de)]))                                                         _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x1 * 0x1e74 + 0x1bf9 + -0x81 * -0x5, 0x18dc + -0x1d09 + 0x437, -0x1c21 + -0x16b3 * 0x1 + 0x32de * 0x1), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x167e + 0x7 * 0x481 + 0x521 * -0x1, posuiRoom = _0x2d5e1c, allRoomObjs[_0x57a63c(0x4f2)](_0x2d5e1c);                                                     else {                                                         if (_0x5ea157[_0x57a63c(0x2b4)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x50f)]))                                                             _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x6b2 + -0x13b7 + 0x1a73, 0x26bf + -0x376 * -0x5 + -0x3803, 0x94 * 0x3e + -0x1 * 0x1ae3 + -0x8eb), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x2585 + 0x1ddf + 0xb8e, shaifenRoom = _0x2d5e1c, allRoomObjs[_0x57a63c(0x4f2)](_0x2d5e1c);                                                         else {                                                             if (_0x5ea157[_0x57a63c(0x18e)](_0x2d5e1c[_0x57a63c(0x183)], '树'))                                                                 _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x1 * -0x169e + -0x1aa + 0xa75 * -0x2, -0x2575 + 0x3bb * 0x7 + 0x2 * 0x5b1, -0x1b3a + 0x57d * 0x4 + 0x550), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x1414 + 0x1f49 + -0x74d;                                                             else {                                                                 if (_0x5ea157[_0x57a63c(0x3f6)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x469)]))                                                                     _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x177b * -0x1 + -0x478 + -0x12f9, -0x4ad * -0x6 + 0x4bb + -0x20bf, 0xc19 + 0x2696 + -0x32a5), _0x2d5e1c[_0x57a63c(0x3f1)] = ![], _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x5 * 0x5bf + 0x358 + 0x1d4b, fourColorPic = _0x2d5e1c;                                                                 else {                                                                     if (_0x5ea157[_0x57a63c(0x225)](_0x2d5e1c[_0x57a63c(0x183)], _0x5ea157[_0x57a63c(0x420)]))                                                                         _0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x1571 + -0x2bb + -0x3 * -0x812, 0xa92 + 0x1 * 0x12a9 + -0x1d31, -0x23d1 * -0x1 + -0x61 + -0x2366), _0x2d5e1c[_0x57a63c(0x1ec)]['y'] = -0x2f8 * -0xd + -0x26b3 + 0x403, suishiRoom = _0x2d5e1c, allRoomObjs[_0x57a63c(0x4f2)](_0x2d5e1c);                                                                     else                                                                         _0x5ea157[_0x57a63c(0x50c)](_0x2d5e1c[_0x57a63c(0x183)], '车') && (_0x2d5e1c[_0x57a63c(0x336)][_0x57a63c(0x1b1)](-0x1282 * 0x2 + 0x723 + 0x1deb, 0x2 * 0x719 + -0x2321 + 0xd * 0x19d, 0xd65 * 0x2 + 0x22ad + 0x11 * -0x39d), _0x2d5e1c[_0x57a63c(0x1ec)][_0x57a63c(0x1b1)](-(-0x3 * 0xb5a + -0x1 * 0x58f + 0x2ebb + 0.9900000000000091), 0xe40 + 0xb7 * 0xa + -0x14bc, -(0xd7c + 0xb9f + 0x11 * -0xf7 + 0.42000000000007276)), _0x2d5e1c[_0x57a63c(0x3f1)] = ![], carMesh = _0x2d5e1c);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 }             }         }         _0x2d5e1c[_0x57a63c(0x505)](_0x3fd074 => {             const _0x1da982 = _0x57a63c, _0x95d3ab = {                     'IGaWb': function (_0x2bbca1, _0x48a8a7) {                         const _0xfd2d59 = _0x254e;                         return _0x5ea157[_0xfd2d59(0x22a)](_0x2bbca1, _0x48a8a7);                     },                     'sQcyB': _0x5ea157[_0x1da982(0x3d2)],                     'BWpwc': _0x5ea157[_0x1da982(0x35e)],                     'lnTqS': _0x5ea157[_0x1da982(0x367)],                     'LiEJc': _0x5ea157[_0x1da982(0x484)],                     'OWqoW': _0x5ea157[_0x1da982(0x549)],                     'nMkEj': _0x5ea157[_0x1da982(0x37c)],                     'TcMGe': function (_0x33c743, _0x510383) {                         const _0x37387c = _0x1da982;                         return _0x5ea157[_0x37387c(0x2ac)](_0x33c743, _0x510383);                     },                     'sbUYW': _0x5ea157[_0x1da982(0x49c)],                     'howOJ': _0x5ea157[_0x1da982(0x3ea)],                     'rmGtH': _0x5ea157[_0x1da982(0x40b)],                     'aAEYO': function (_0x2ce7f9, _0x5f03fd) {                         const _0x34f454 = _0x1da982;                         return _0x5ea157[_0x34f454(0x441)](_0x2ce7f9, _0x5f03fd);                     },                     'bWpce': _0x5ea157[_0x1da982(0x23a)],                     'JQoBS': _0x5ea157[_0x1da982(0x4b1)],                     'GReti': _0x5ea157[_0x1da982(0x37d)],                     'nhyjR': _0x5ea157[_0x1da982(0x20e)]                 };             if (_0x3fd074[_0x1da982(0x1d2)]) {                 _0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x2fb)]) && (_0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x348) + 't'] = !![], _0x3fd074[_0x1da982(0x278) + 'r'] = -0x1 * -0x20e3 + 0xc7c * -0x1 + -0x139f * 0x1);                 if (_0x5ea157[_0x1da982(0x28d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x214)]) || _0x5ea157[_0x1da982(0x250)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4ba)]) || _0x5ea157[_0x1da982(0x384)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x517)]) || _0x5ea157[_0x1da982(0x478)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2cf)]) || _0x5ea157[_0x1da982(0x441)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x30a)]) || _0x5ea157[_0x1da982(0x1a3)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x28f)]) || _0x5ea157[_0x1da982(0x28d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4d7)]) || _0x5ea157[_0x1da982(0x28c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1a8)]) || _0x5ea157[_0x1da982(0x4f5)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x359)]))                     _0x3fd074[_0x1da982(0x506) + _0x1da982(0x18d)] = ![];                 else {                     if (_0x5ea157[_0x1da982(0x478)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2df)]) || _0x5ea157[_0x1da982(0x507)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x19b)])) {                         const _0x14b694 = _0x5ea157[_0x1da982(0x2b5)][_0x1da982(0x3d8)]('|');                         let _0x479f23 = 0x43 * 0x40 + 0x1ca9 + -0x2d69;                         while (!![]) {                             switch (_0x14b694[_0x479f23++]) {                             case '0':                                 _0x3fd074[_0x1da982(0x278) + 'r'] = 0xfaf + 0x11cb + -0x55f * 0x6;                                 continue;                             case '1':                                 _0x3fd074[_0x1da982(0x506) + _0x1da982(0x18d)] = ![];                                 continue;                             case '2':                                 _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x348) + 't'] = !![];                                 continue;                             case '3':                                 _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x4fc)] = 0x1 * -0x16ff + -0x4b * -0xa + 0x1411 + 0.5;                                 continue;                             case '4':                                 _0x3fd074[_0x1da982(0x18a)] = ![];                                 continue;                             }                             break;                         }                     } else {                         if (_0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x322)]))                             _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x350)] = 0x162a + -0x7fa + -0xe30, _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x23e)] = -0x1603 + -0x1b4 * -0xd + 0x1 * -0x21 + 0.3;                         else {                             if (_0x5ea157[_0x1da982(0x234)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x446)]))                                 _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x348) + 't'] = !![], _0x3fd074[_0x1da982(0x278) + 'r'] = -0x3 * -0x941 + 0xdd8 + -0x2851;                             else                                 (_0x5ea157[_0x1da982(0x1b8)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2f1)]) || _0x5ea157[_0x1da982(0x511)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x25d)])) && (_0x3fd074[_0x1da982(0x3f1)] = ![]);                         }                     }                 }                 if (_0x5ea157[_0x1da982(0x45a)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x469)])) {                     const _0x4b4607 = _0x5ea157[_0x1da982(0x43b)][_0x1da982(0x3d8)]('|');                     let _0x14abb6 = 0x1d7f + 0x11ea + -0x2f69;                     while (!![]) {                         switch (_0x4b4607[_0x14abb6++]) {                         case '0':                             _0x5ea157[_0x1da982(0x45b)](setOpacityMaterial, _0x3fd074);                             continue;                         case '1':                             _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x46a)] = ![];                             continue;                         case '2':                             _0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x3c4)]) ? _0x3fd074[_0x1da982(0x278) + 'r'] = -0x3 * -0x1b3 + -0x2482 + 0x209f : _0x3fd074[_0x1da982(0x278) + 'r'] = -0x1066 + -0x1ca * 0x13 + 0x672 * 0x8;                             continue;                         case '3':                             _0x3fd074[_0x1da982(0x18a)] = ![];                             continue;                         case '4':                             _0x3fd074[_0x1da982(0x506) + _0x1da982(0x18d)] = ![];                             continue;                         }                         break;                     }                 } else {                     if (_0x5ea157[_0x1da982(0x329)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1fe)])) {                         const _0xc5fc44 = _0x5ea157[_0x1da982(0x192)][_0x1da982(0x3d8)]('|');                         let _0x56e55f = 0x12cd + 0xa66 + -0x1d33;                         while (!![]) {                             switch (_0xc5fc44[_0x56e55f++]) {                             case '0':                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4c0) + 'ty'] = !![];                                 continue;                             case '1':                                 _0x3fd074[_0x1da982(0x3f1)] = ![];                                 continue;                             case '2':                                 _0x3fd074[_0x1da982(0x506) + _0x1da982(0x18d)] = ![];                                 continue;                             case '3':                                 roadPlane[_0x1da982(0x4f2)](_0x3fd074);                                 continue;                             case '4':                                 _0x3fd074[_0x1da982(0x18a)] = ![];                                 continue;                             case '5':                                 container[_0x1da982(0x4b6)](_0x3fd074);                                 continue;                             }                             break;                         }                     } else {                         if (_0x5ea157[_0x1da982(0x349)](_0x2d5e1c[_0x1da982(0x183)], '树'))                             _0x3fd074[_0x1da982(0x278) + 'r'] = -0x7 * -0x435 + -0x9 * -0x17c + -0x2999;                         else                             (_0x5ea157[_0x1da982(0x503)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x178)]) || _0x5ea157[_0x1da982(0x1b8)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x396)]) || _0x5ea157[_0x1da982(0x329)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x523)]) || _0x5ea157[_0x1da982(0x421)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3dc)]) || _0x5ea157[_0x1da982(0x329)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4de)]) || _0x5ea157[_0x1da982(0x2e7)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x50f)]) || _0x5ea157[_0x1da982(0x384)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x420)])) && allOutSideBuild[_0x1da982(0x4f2)](_0x3fd074);                     }                 }                 (_0x5ea157[_0x1da982(0x441)](_0x2d5e1c[_0x1da982(0x183)], '草坪') || _0x5ea157[_0x1da982(0x472)](_0x2d5e1c[_0x1da982(0x183)], '地面')) && _0x5ea157[_0x1da982(0x32b)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x446)]) && _0x5ea157[_0x1da982(0x475)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2df)]) && _0x5ea157[_0x1da982(0x382)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x19b)]) && (_0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x348) + 't'] = ![]);                 if (_0x5ea157[_0x1da982(0x45a)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3dc)])) {                     if (_0x5ea157[_0x1da982(0x468)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x31c)]) || _0x5ea157[_0x1da982(0x1ee)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2ff)]) || _0x5ea157[_0x1da982(0x421)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x30c)]) || _0x5ea157[_0x1da982(0x298)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x51e)]) || _0x5ea157[_0x1da982(0x224)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4b5)]) || _0x5ea157[_0x1da982(0x199)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3b8)]) || _0x5ea157[_0x1da982(0x472)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2ae)]) || _0x5ea157[_0x1da982(0x503)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x423)])) {                         if (_0x5ea157[_0x1da982(0x1ee)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2ff)]))                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x34a)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                 -(0xdc7 + 0x1cad + -0x1 * 0x1b25 + 0.13000000000010914),                                 -0x1 * 0x1999 + -0x1aa0 + 0x3475 + 0.7000000000000028,                                 -(-0xc81 + -0x4 * 0x7cf + 0x20b * 0x18 + 0.4700000000000273)                             ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                 -(-0x1bf1 + 0x14aa + 0x201 * 0xb + 0.8220000000001164),                                 -0x15e + -0xbfa * -0x1 + 0xa0f * -0x1 + 0.12569999999999482,                                 -(-0xf07 * 0x1 + 0x335 + 0x8 * 0x21d + 0.5217000000000098)                             ];                         else {                             if (_0x5ea157[_0x1da982(0x521)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x30c)]))                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x366)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                     -(-0x2123 + -0x156 + -0x5f * -0x85 + 0.09999999999990905),                                     0x4d0 + 0xd4 + -0x567 + 0.13000000000000256,                                     -(-0xdcf + 0x6a6 + -0x63a * -0x2 + 0.4700000000000273)                                 ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                     -(0x269 * -0x3 + 0x12f + 0x1475 * 0x1 + 0.09639999999990323),                                     -0x241e + -0x33f * -0x4 + 0x179f + 0.747799999999998,                                     -(-0x2 * 0x954 + 0x71 * 0x2 + 0x16e4 + 0.08330000000000837)                                 ];                             else {                                 if (_0x5ea157[_0x1da982(0x1a0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x51e)]))                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4cd)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                         -(-0x483 + -0x5cf * 0x3 + -0x79 * -0x4d + 0.40000000000009095),                                         -0x932 + 0x1b11 + -0x11a3 + 0.7000000000000028,                                         -(-0x1d90 + 0x1b * -0x99 + 0x32fe + 0.4700000000000273)                                     ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                         -(0x105c + -0x5 * -0x79d + -0x1 * 0x2876 + 0.17270000000007713),                                         0x129c + 0x1c4c + -0x2 * 0x1732 + 0.37760000000000105,                                         -(0x3 * 0x9fa + -0x4a6 + -0x2 * 0xa15 + 0.06400000000007822)                                     ];                                 else {                                     if (_0x5ea157[_0x1da982(0x224)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4b5)]))                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x227)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                             -(-0x12 * -0xcb + 0x2004 * 0x1 + -0x7 * 0x49f + 0.8000000000001819),                                             -0xb92 + -0x1 * -0x2177 + -0x15a9 + 0.759999999999998,                                             -(0x2f * -0x53 + 0xc2b + 0x85d * 0x1 + 0.4700000000000273)                                         ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                             -(0x4 * -0xb3 + -0x1 * -0x1af + -0x11 * -0xdb + 0.4108000000001084),                                             0x1810 + 0x2366 * -0x1 + -0x3 * -0x3f4 + 0.29110000000000014,                                             -(-0x11f5 * 0x1 + -0xcf0 + 0x23fa + 0.04680000000007567)                                         ];                                     else {                                         if (_0x5ea157[_0x1da982(0x4a7)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3b8)]))                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x1bd)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                 -(0x6ff * 0x1 + -0x24eb + -0x1e3 * -0x17 + 0.23999999999978172),                                                 -0x905 * -0x1 + 0x9c2 + -0x128a + 0.240000000000002,                                                 -(-0x1aa9 + -0x36f + -0x2363 * -0x1 + 0.4700000000000273)                                             ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                 -(0x147e + -0x649 * 0x3 + 0xb51 + 0.14550000000008367),                                                 0x2437 + 0x2050 + -0x2 * 0x2207 + 0.7939999999999969,                                                 -(-0x25d6 + 0x7 * -0x50e + -0x1f * -0x287 + 0.615500000000111)                                             ];                                         else {                                             if (_0x5ea157[_0x1da982(0x22a)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2ae)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2cc)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                     -(-0x22a3 * -0x1 + 0x0 + -0x15ac + 0.0500000000001819),                                                     0x347 * 0x7 + 0x9a9 + -0x205d + 0.5600000000000023,                                                     -(0x62d * 0x3 + -0xdf * -0x22 + -0x2ada + 0.4700000000000273)                                                 ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                     -(0x14b2 + -0x5ec * 0x2 + 0x3aa + 0.5981000000001586),                                                     0x2 * -0x4b + 0x2da + -0x4 * 0x72 + 0.6037000000000035,                                                     -(0x3b * -0x1 + 0xf * 0x193 + -0x1 * 0x1241 + 0.42249999999989996)                                                 ];                                             else                                                 _0x5ea157[_0x1da982(0x355)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x423)]) && (_0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x1d5)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                     -(-0x7d * 0x4f + 0x2 * 0xcd + -0x18c2 * -0x2 + 0.5300000000002001),                                                     -0x1c52 + -0x163 * -0xd + -0x2 * -0x544 + 0.5200000000000031,                                                     -(-0x3 * -0x69d + 0x25a4 * 0x1 + -0x3430 + 0.4700000000000273)                                                 ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                     -(-0x222f + -0x360 * -0x7 + -0x169e * -0x1 + 0.7321000000001732),                                                     -0x23aa + 0x2 * -0x97a + 0x3718 + 0.6145000000000067,                                                     -(0x8d7 + 0x3d9 * -0x2 + 0x3fb + 0.8221000000000913)                                                 ]);                                         }                                     }                                 }                             }                         }                         let _0x967684 = _0x3fd074[_0x1da982(0x183)][_0x1da982(0x392)](-0x5 * 0xcd + 0x124b * -0x2 + -0x4 * -0xa27, 0x1c50 + -0x76 + -0x112 * 0x1a);                         _0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x191)](_0x5ea157[_0x1da982(0x269)], _0x967684), limoClickObjs[_0x1da982(0x4f2)](_0x3fd074);                     } else {                         if (_0x5ea157[_0x1da982(0x2d6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1a4)]) || _0x5ea157[_0x1da982(0x1c5)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1bc)]) || _0x5ea157[_0x1da982(0x2e7)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x189)]) || _0x5ea157[_0x1da982(0x384)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2da)]) || _0x5ea157[_0x1da982(0x522)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2f8)]) || _0x5ea157[_0x1da982(0x1a0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x42c)]) || _0x5ea157[_0x1da982(0x450)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x497)]) || _0x5ea157[_0x1da982(0x17b)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x35d)])) {                             let _0x13f4dc = _0x3fd074[_0x1da982(0x183)][_0x1da982(0x392)](-0x2285 * 0x1 + -0x1 * -0x1210 + 0x107b);                             _0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x3cc)](_0x5ea157[_0x1da982(0x2e0)], _0x13f4dc), limoClickObjs[_0x1da982(0x4f2)](_0x3fd074);                         } else {                             if (_0x5ea157[_0x1da982(0x1c5)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x233)]) || _0x5ea157[_0x1da982(0x450)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2a4)]) || _0x5ea157[_0x1da982(0x362)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x46b)]) || _0x5ea157[_0x1da982(0x1b8)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1c7)]) || _0x5ea157[_0x1da982(0x4ae)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x495)]) || _0x5ea157[_0x1da982(0x2d6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3cf)]) || _0x5ea157[_0x1da982(0x2a8)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x25e)]) || _0x5ea157[_0x1da982(0x1b8)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x247)]) || _0x5ea157[_0x1da982(0x4f5)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2c5)]) || _0x5ea157[_0x1da982(0x537)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1af)])) {                                 const _0x597062 = _0x5ea157[_0x1da982(0x32f)][_0x1da982(0x3d8)]('|');                                 let _0x21e490 = 0x1a * -0x6 + 0x112d + 0x1 * -0x1091;                                 while (!![]) {                                     switch (_0x597062[_0x21e490++]) {                                     case '0':                                         _0x5ea157[_0x1da982(0x234)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x247)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x275)]);                                         continue;                                     case '1':                                         _0x5ea157[_0x1da982(0x384)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3cf)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x371)]);                                         continue;                                     case '2':                                         _0x5ea157[_0x1da982(0x3b9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1c7)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x4c1)]);                                         continue;                                     case '3':                                         _0x5ea157[_0x1da982(0x28d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x46b)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x4b7)]);                                         continue;                                     case '4':                                         _0x5ea157[_0x1da982(0x35c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x25e)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x3a0)]);                                         continue;                                     case '5':                                         _0x5ea157[_0x1da982(0x18e)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1af)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x29b)]);                                         continue;                                     case '6':                                         limoClickObjs[_0x1da982(0x4f2)](_0x3fd074);                                         continue;                                     case '7':                                         _0x5ea157[_0x1da982(0x28e)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2a4)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x311)]);                                         continue;                                     case '8':                                         _0x5ea157[_0x1da982(0x250)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2c5)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x3fc)]);                                         continue;                                     case '9':                                         _0x5ea157[_0x1da982(0x4e6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x495)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x372)]);                                         continue;                                     case '10':                                         _0x5ea157[_0x1da982(0x468)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x233)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x34f)]);                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x5ea157[_0x1da982(0x1ee)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x24a)]) || _0x5ea157[_0x1da982(0x45a)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x325)]) || _0x5ea157[_0x1da982(0x2e7)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x471)]) || _0x5ea157[_0x1da982(0x208)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x24d)]) || _0x5ea157[_0x1da982(0x49b)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x42d)]) || _0x5ea157[_0x1da982(0x17b)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3b4)]) || _0x5ea157[_0x1da982(0x3b9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x48b)]) || _0x5ea157[_0x1da982(0x225)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x210)]) || _0x5ea157[_0x1da982(0x478)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x360)]) || _0x5ea157[_0x1da982(0x521)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x516)]) || _0x5ea157[_0x1da982(0x54c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x19d)]) || _0x5ea157[_0x1da982(0x4d0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3ec)]) || _0x5ea157[_0x1da982(0x4df)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x482)])) {                                     const _0x4290c0 = _0x5ea157[_0x1da982(0x380)][_0x1da982(0x3d8)]('|');                                     let _0x5aa4a1 = 0x9 * 0x218 + 0x997 + 0x1d * -0xfb;                                     while (!![]) {                                         switch (_0x4290c0[_0x5aa4a1++]) {                                         case '0':                                             _0x5ea157[_0x1da982(0x362)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x24d)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x26f)]);                                             continue;                                         case '1':                                             _0x5ea157[_0x1da982(0x3e3)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3b4)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x294)]);                                             continue;                                         case '2':                                             _0x5ea157[_0x1da982(0x2b6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x19d)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x389)]);                                             continue;                                         case '3':                                             _0x5ea157[_0x1da982(0x2e7)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x24a)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x458)]);                                             continue;                                         case '4':                                             _0x5ea157[_0x1da982(0x4c2)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x48b)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x52c)]);                                             continue;                                         case '5':                                             _0x5ea157[_0x1da982(0x286)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x482)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x398)]);                                             continue;                                         case '6':                                             _0x5ea157[_0x1da982(0x2fd)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x42d)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x195)]);                                             continue;                                         case '7':                                             limoClickObjs[_0x1da982(0x4f2)](_0x3fd074);                                             continue;                                         case '8':                                             _0x5ea157[_0x1da982(0x289)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x360)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x465)]);                                             continue;                                         case '9':                                             _0x5ea157[_0x1da982(0x4f5)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x516)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x258)]);                                             continue;                                         case '10':                                             _0x5ea157[_0x1da982(0x3ae)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3ec)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x453)]);                                             continue;                                         case '11':                                             _0x5ea157[_0x1da982(0x1b8)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x210)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x3ca)]);                                             continue;                                         case '12':                                             _0x5ea157[_0x1da982(0x228)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x471)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x404)]);                                             continue;                                         case '13':                                             _0x5ea157[_0x1da982(0x2b6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x325)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x300)]);                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x5ea157[_0x1da982(0x28c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x36e)]) || _0x5ea157[_0x1da982(0x234)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3c6)]) || _0x5ea157[_0x1da982(0x286)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x540)]) || _0x5ea157[_0x1da982(0x522)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x253)]) || _0x5ea157[_0x1da982(0x4b2)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x531)]) || _0x5ea157[_0x1da982(0x494)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3ac)]) || _0x5ea157[_0x1da982(0x196)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2ad)]) || _0x5ea157[_0x1da982(0x421)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3b3)])) {                                         let _0x489f67 = _0x3fd074[_0x1da982(0x183)][_0x1da982(0x392)](-0x2279 * -0x1 + -0x235e + 0xea, -0xa0e + -0x753 * 0x1 + 0xa5 * 0x1b);                                         _0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x1cb)](_0x5ea157[_0x1da982(0x230)], _0x489f67), limoClickObjs[_0x1da982(0x4f2)](_0x3fd074);                                     } else {                                         if (_0x5ea157[_0x1da982(0x4d5)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x385)]) || _0x5ea157[_0x1da982(0x22a)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4f1)])) {                                             let _0x19e003 = _0x3fd074[_0x1da982(0x183)][_0x1da982(0x392)](0x1c51 + 0x98a * -0x2 + 0x939 * -0x1, -0x1 * -0x2405 + 0x19b8 + -0x3db8);                                             _0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x1b5)](_0x5ea157[_0x1da982(0x4aa)], _0x19e003), limoClickObjs[_0x1da982(0x4f2)](_0x3fd074);                                         } else                                             (_0x5ea157[_0x1da982(0x494)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1e7)]) || _0x5ea157[_0x1da982(0x196)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x28b)]) || _0x5ea157[_0x1da982(0x23f)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x448)]) || _0x5ea157[_0x1da982(0x177)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1a2)])) && (_0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x47c)] = _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x47c)][_0x1da982(0x1b9)](), _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x47c)][_0x1da982(0x44a) + 'e'] = !![], limojiJiaodaiObjs[_0x1da982(0x4f2)](_0x3fd074));                                     }                                 }                             }                         }                     }                     if (_0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x188)]) || _0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x21b)]) || _0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x1fb)]) && _0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)]('转动')) {                         if (_0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x1fb)])) {                             let _0x2acd51 = _0x5ea157[_0x1da982(0x526)](_0x3fd074[_0x1da982(0x183)][_0x1da982(0x392)](0x2023 + 0x2265 + -0x4285, -0x514 + -0xfc8 + -0x1 * -0x14e0), -0x1889 + 0x79f + 0x10eb);                             limoRoomAnimation[_0x2acd51][_0x1da982(0x379)] = _0x3fd074;                         } else {                             if (_0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)]('动画')) {                                 let _0x48b035 = _0x5ea157[_0x1da982(0x548)](_0x3fd074[_0x1da982(0x183)][_0x1da982(0x392)](0x1dd6 + 0x1 * 0x479 + -0x1 * 0x2249, 0x305 + 0x36d + -0x66b), 0x1119 + -0x1f * 0xd8 + -0x3a * -0x28);                                 _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x348) + 't'] = !![], limoRoomAnimation[_0x48b035][_0x1da982(0x232)][_0x1da982(0x4f2)](_0x3fd074), _0x3fd074[_0x1da982(0x278) + 'r'] = 0x1 * -0x4a5 + -0x1e74 + -0x1 * -0x2571;                             } else {                                 let _0x283d8c = _0x5ea157[_0x1da982(0x181)](_0x3fd074[_0x1da982(0x183)][_0x1da982(0x392)](0x1983 + -0x14de + 0x49f * -0x1), 0x3a * -0x79 + -0x3d3 * -0x9 + -0x2 * 0x380);                                 limoRoomAnimation[_0x283d8c][_0x1da982(0x348) + 't'][_0x1da982(0x4f2)](_0x3fd074);                             }                         }                     }                     if (_0x5ea157[_0x1da982(0x2c9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x52e)])) {                         const _0x32620a = _0x5ea157[_0x1da982(0x4b0)][_0x1da982(0x3d8)]('|');                         let _0x245714 = 0x4 * 0xee + 0x1 * 0x48d + 0x1d * -0x49;                         while (!![]) {                             switch (_0x32620a[_0x245714++]) {                             case '0':                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2aa)];                                 continue;                             case '1':                                 limoClickObjs[_0x1da982(0x4f2)](_0x3fd074);                                 continue;                             case '2':                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                     -(0xcbb + -0x1976 + -0x1f * -0xda + 0.8400000000001455),                                     -0x6d9 * 0x1 + -0x10d * -0x19 + 0x31 * -0x64 + 0.4300000000000068,                                     -(-0x3 * -0xb29 + -0xfd * 0x1 + -0x1 * 0x1a97 + 0.07999999999992724)                                 ];                                 continue;                             case '3':                                 _0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x4ce)];                                 continue;                             case '4':                                 cameraImportDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                 continue;                             case '5':                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                     -(0x1e43 + 0x879 + -0x1911 + 0.9589000000000851),                                     0x1 * 0x2345 + 0x17 * 0x59 + -0x2af9 + 0.33150000000000546,                                     -(0x1 * 0x1adc + -0x18d3 + 0x3cb + 0.7609999999999673)                                 ];                                 continue;                             }                             break;                         }                     }                 } else {                     if (_0x5ea157[_0x1da982(0x47b)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x523)])) {                         if (_0x3fd074[_0x1da982(0x183)][_0x1da982(0x201)](_0x5ea157[_0x1da982(0x1c2)])) {                             const _0x4312c5 = _0x5ea157[_0x1da982(0x320)][_0x1da982(0x3d8)]('|');                             let _0x5af8f5 = 0x1ee0 + 0xa2c * -0x2 + 0x1 * -0xa88;                             while (!![]) {                                 switch (_0x4312c5[_0x5af8f5++]) {                                 case '0':                                     _0x5ea157[_0x1da982(0x224)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x279)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x18f)], _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x47e)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                         -(0x5 * -0x569 + 0x3 * -0x961 + 0x1bb * 0x27 + 0.0500000000001819),                                         0x1 * 0xf4f + 0x1 * 0x12d6 + -0x21e9 + 0.6499999999999986,                                         -(-0x241 * -0x4 + 0x10b * 0x9 + -0xf02 + 0.21000000000003638)                                     ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                         -(0x19e6 + 0x2ae * 0xb + 0x5 * -0x897 + 0.4054999999998472),                                         0x25f1 * 0x1 + 0x49 * -0x7f + -0x179 + 0.7750000000000057,                                         -(0x1ef1 + -0x20ed + 0x560 + 0.7952999999999975)                                     ]);                                     continue;                                 case '1':                                     _0x5ea157[_0x1da982(0x22e)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x373)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x414)], _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x3db)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                         -(-0x3a * 0x20 + -0x3b4 + 0x1768 + 0.6599999999998545),                                         -0x15ce * 0x1 + 0x3a7 + 0x1364 + 0.910000000000025,                                         -(-0x1069 * -0x1 + -0x260c + -0x14 * -0x146 + 0.9099999999999682)                                     ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                         -(0xd04 + 0x1 * -0xf55 + 0xec7 + 0.44840000000021973),                                         -0xbee * 0x1 + 0x2579 + 0x1844 * -0x1 + 0.43990000000002283,                                         -(0x1 * 0xbe9 + 0x1 * -0x184a + 0x1058 + 0.3348999999999478)                                     ]);                                     continue;                                 case '2':                                     _0x5ea157[_0x1da982(0x3b0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x407)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x3b2)], _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4e0)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                         -(0x642 + -0x3fa * 0x4 + 0x1 * 0x11be + 0.3200000000001637),                                         -0x775 + 0x11 * -0x191 + 0x2353 + 0.75,                                         -(-0x89b * 0x2 + 0x1 * 0x81d + 0xca5 + 0.6100000000000136)                                     ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                         -(0x5a7 + -0x302 + 0x1 * 0x571 + 0.95699999999988),                                         -0x1fdb + -0x16a8 + 0x37cb + 0.19029999999997926,                                         -(-0x1168 + 0xae + 0x2e1 * 0x7 + 0.8069000000000415)                                     ]);                                     continue;                                 case '3':                                     _0x5ea157[_0x1da982(0x355)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x26b)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x391)], _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x256)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                         -(-0x1b65 + -0x13a * -0x16 + 0xf54 + 0.7399999999997817),                                         -0x8b0 * -0x2 + 0xa0 + -0x265 * 0x7 + 0.839999999999975,                                         -(-0x295 + -0xf3a * 0x2 + 0x3 * 0xc41 + 0.36000000000001364)                                     ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                         -(-0x2a5 * -0x1 + 0x21ce + -0x72 * 0x30 + 0.3602000000000771),                                         0x131 * -0xd + -0x4ff + 0x3 * 0x742 + 0.6541000000000281,                                         -(-0x1ea5 + -0x1eac * 0x1 + -0x410b * -0x1 + 0.4438999999999851)                                     ]);                                     continue;                                 case '4':                                     _0x5ea157[_0x1da982(0x239)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4ea)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x48f)], _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x1c9)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                         -(-0x17 * 0x5c + 0x1035 + -0x3f + 0.2400000000000091),                                         -0x13f7 + 0x39 * -0xa3 + -0xe * -0x409 + 0.25,                                         -(0x8bb + 0x253 + -0x7a9 + 0.19000000000005457)                                     ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                         -(0x7 * -0x40a + -0x15b1 + 0x398d + 0.9351999999998952),                                         0x1 * 0x1150 + 0x7 * 0x164 + -0x1acc + 0.5752999999999986,                                         -(0xf7b + 0xeaf + -0x1ac6 + 0.7335000000000491)                                     ]);                                     continue;                                 case '5':                                     junhuaClickObjs[_0x1da982(0x4f2)](_0x3fd074);                                     continue;                                 case '6':                                     cameraImportDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                     continue;                                 case '7':                                     _0x5ea157[_0x1da982(0x2b6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x26c)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x2c7)], _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x519)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                         -(-0x1c6d + -0x2ef * 0x2 + -0x166d * -0x2 + 0.7100000000000364),                                         0x1085 + 0x1d15 + -0x2c5c + 0.10000000000002274,                                         -(0x1f * 0xf1 + -0xf6f * -0x1 + -0xa39 * 0x4 + 0.21000000000003638)                                     ], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                         -(0x69f * -0x5 + -0x1 * 0x10c9 + -0x6bb * -0x9 + 0.8695999999999913),                                         0x1a2e + -0x2 * 0x8e6 + 0x8 * -0xe3 + 0.46399999999999864,                                         -(0x7bd * 0x1 + 0xb2d + -0xf30 + 0.8425999999999476)                                     ]);                                     continue;                                 }                                 break;                             }                         }                     } else                         _0x5ea157[_0x1da982(0x18e)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2b1)]) && (_0x5ea157[_0x1da982(0x3c5)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x424)]) && (_0x3fd074[_0x1da982(0x183)] = _0x5ea157[_0x1da982(0x436)], limoClickObjs[_0x1da982(0x4f2)](_0x3fd074)));                 }                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x176)] = _0x3fd074[_0x1da982(0x4f4)][_0x1da982(0x348) + 't'], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x18a)] = _0x3fd074[_0x1da982(0x18a)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x506) + _0x1da982(0x18d)] = _0x3fd074[_0x1da982(0x506) + _0x1da982(0x18d)], _0x3fd074[_0x1da982(0x460)][_0x1da982(0x278) + 'r'] = _0x3fd074[_0x1da982(0x278) + 'r'];             } else {                 if (_0x5ea157[_0x1da982(0x1f1)](_0x3fd074[_0x1da982(0x41c)], _0x5ea157[_0x1da982(0x1fc)])) {                     if (_0x5ea157[_0x1da982(0x480)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3dc)])) {                         if (_0x5ea157[_0x1da982(0x17b)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x268)]) || _0x5ea157[_0x1da982(0x4c2)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x246)]) || _0x5ea157[_0x1da982(0x205)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x461)]) || _0x5ea157[_0x1da982(0x1b8)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4ef)]) || _0x5ea157[_0x1da982(0x46d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x470)]) || _0x5ea157[_0x1da982(0x3b0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x30e)]) || _0x5ea157[_0x1da982(0x310)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x313)]) || _0x5ea157[_0x1da982(0x1a3)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x259)]))                             _0x3fd074[_0x1da982(0x505)](_0x4860f4 => {                                 const _0x52fe58 = _0x1da982;                                 if (_0x4860f4[_0x52fe58(0x1d2)]) {                                     let _0x47ce03 = _0x3fd074[_0x52fe58(0x183)][_0x52fe58(0x392)](0xed8 + -0x2348 + 0x1475);                                     _0x4860f4[_0x52fe58(0x183)] = _0x5ea157[_0x52fe58(0x2d4)](_0x5ea157[_0x52fe58(0x198)], _0x47ce03), limoClickObjs[_0x52fe58(0x4f2)](_0x4860f4);                                 }                             });                         else {                             if (_0x5ea157[_0x1da982(0x3fa)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3d2)]) || _0x5ea157[_0x1da982(0x219)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x367)]) || _0x5ea157[_0x1da982(0x1d1)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x549)]))                                 _0x3fd074[_0x1da982(0x505)](_0x2c2a1d => {                                     const _0x1c6b8 = _0x1da982;                                     _0x2c2a1d[_0x1c6b8(0x1d2)] && (_0x95d3ab[_0x1c6b8(0x2c8)](_0x3fd074[_0x1c6b8(0x183)], _0x95d3ab[_0x1c6b8(0x2a9)]) && (_0x2c2a1d[_0x1c6b8(0x183)] = _0x95d3ab[_0x1c6b8(0x529)]), _0x95d3ab[_0x1c6b8(0x2c8)](_0x3fd074[_0x1c6b8(0x183)], _0x95d3ab[_0x1c6b8(0x3ed)]) && (_0x2c2a1d[_0x1c6b8(0x183)] = _0x95d3ab[_0x1c6b8(0x413)]), _0x95d3ab[_0x1c6b8(0x2c8)](_0x3fd074[_0x1c6b8(0x183)], _0x95d3ab[_0x1c6b8(0x25b)]) && (_0x2c2a1d[_0x1c6b8(0x183)] = _0x95d3ab[_0x1c6b8(0x2f4)]), limoClickObjs[_0x1c6b8(0x4f2)](_0x2c2a1d));                                 });                             else {                                 if (_0x5ea157[_0x1da982(0x228)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4b8)]) || _0x5ea157[_0x1da982(0x302)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x257)]) || _0x5ea157[_0x1da982(0x442)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x44f)]) || _0x5ea157[_0x1da982(0x472)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x287)]) || _0x5ea157[_0x1da982(0x4a6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2eb)]))                                     _0x3fd074[_0x1da982(0x505)](_0x1366cb => {                                         const _0x2edd6a = _0x1da982;                                         if (_0x1366cb[_0x2edd6a(0x1d2)]) {                                             const _0x4f8421 = _0x5ea157[_0x2edd6a(0x2b9)][_0x2edd6a(0x3d8)]('|');                                             let _0x29c2a2 = -0x1523 + -0xe79 + 0x239c;                                             while (!![]) {                                                 switch (_0x4f8421[_0x29c2a2++]) {                                                 case '0':                                                     limoClickObjs[_0x2edd6a(0x4f2)](_0x1366cb);                                                     continue;                                                 case '1':                                                     _0x5ea157[_0x2edd6a(0x349)](_0x3fd074[_0x2edd6a(0x183)], _0x5ea157[_0x2edd6a(0x4b8)]) && (_0x1366cb[_0x2edd6a(0x183)] = _0x5ea157[_0x2edd6a(0x399)]);                                                     continue;                                                 case '2':                                                     _0x5ea157[_0x2edd6a(0x28d)](_0x3fd074[_0x2edd6a(0x183)], _0x5ea157[_0x2edd6a(0x44f)]) && (_0x1366cb[_0x2edd6a(0x183)] = _0x5ea157[_0x2edd6a(0x3e5)]);                                                     continue;                                                 case '3':                                                     _0x5ea157[_0x2edd6a(0x224)](_0x3fd074[_0x2edd6a(0x183)], _0x5ea157[_0x2edd6a(0x287)]) && (_0x1366cb[_0x2edd6a(0x183)] = _0x5ea157[_0x2edd6a(0x340)]);                                                     continue;                                                 case '4':                                                     _0x5ea157[_0x2edd6a(0x468)](_0x3fd074[_0x2edd6a(0x183)], _0x5ea157[_0x2edd6a(0x2eb)]) && (_0x1366cb[_0x2edd6a(0x183)] = _0x5ea157[_0x2edd6a(0x49f)]);                                                     continue;                                                 case '5':                                                     _0x5ea157[_0x2edd6a(0x46d)](_0x3fd074[_0x2edd6a(0x183)], _0x5ea157[_0x2edd6a(0x257)]) && (_0x1366cb[_0x2edd6a(0x183)] = _0x5ea157[_0x2edd6a(0x30f)]);                                                     continue;                                                 }                                                 break;                                             }                                         }                                     });                                 else {                                     if (_0x5ea157[_0x1da982(0x28c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x174)]) || _0x5ea157[_0x1da982(0x3d6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x536)]) || _0x5ea157[_0x1da982(0x18e)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x25f)]) || _0x5ea157[_0x1da982(0x349)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x222)]) || _0x5ea157[_0x1da982(0x334)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2a0)]) || _0x5ea157[_0x1da982(0x1f3)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x52b)]) || _0x5ea157[_0x1da982(0x362)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x218)]) || _0x5ea157[_0x1da982(0x196)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1bf)]))                                         _0x3fd074[_0x1da982(0x505)](_0x6fcd38 => {                                             const _0xf960d3 = _0x1da982;                                             if (_0x6fcd38[_0xf960d3(0x1d2)]) {                                                 let _0x4d956a = _0x3fd074[_0xf960d3(0x183)][_0xf960d3(0x392)](0x1 * 0x1183 + 0x1e67 + -0x2fe6);                                                 _0x6fcd38[_0xf960d3(0x183)] = _0x5ea157[_0xf960d3(0x2d4)](_0x5ea157[_0xf960d3(0x43c)], _0x4d956a), limoClickObjs[_0xf960d3(0x4f2)](_0x6fcd38);                                             }                                         });                                     else                                         (_0x5ea157[_0x1da982(0x442)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x331)]) || _0x5ea157[_0x1da982(0x1ee)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4f3)]) || _0x5ea157[_0x1da982(0x450)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x400)]) || _0x5ea157[_0x1da982(0x1e9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x24b)]) || _0x5ea157[_0x1da982(0x173)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x4e5)]) || _0x5ea157[_0x1da982(0x250)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x339)]) || _0x5ea157[_0x1da982(0x511)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x403)]) || _0x5ea157[_0x1da982(0x4a4)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x229)])) && _0x3fd074[_0x1da982(0x505)](_0x793405 => {                                             const _0x1c9ea1 = _0x1da982;                                             if (_0x793405[_0x1c9ea1(0x1d2)]) {                                                 let _0x3af63c = _0x3fd074[_0x1c9ea1(0x183)][_0x1c9ea1(0x392)](-0x25 * -0x4a + -0x20db + -0x162e * -0x1);                                                 _0x793405[_0x1c9ea1(0x183)] = _0x95d3ab[_0x1c9ea1(0x378)](_0x95d3ab[_0x1c9ea1(0x3da)], _0x3af63c), limoClickObjs[_0x1c9ea1(0x4f2)](_0x793405);                                             }                                         });                                 }                             }                         }                     } else {                         if (_0x5ea157[_0x1da982(0x4ab)](_0x2d5e1c[_0x1da982(0x183)], '报警')) {                             if (_0x5ea157[_0x1da982(0x52d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2d0)])) {                                 const _0x5684e5 = _0x5ea157[_0x1da982(0x2b7)][_0x1da982(0x3d8)]('|');                                 let _0x2ca0f1 = -0xf21 * 0x1 + -0x538 + 0x1459;                                 while (!![]) {                                     switch (_0x5684e5[_0x2ca0f1++]) {                                     case '0':                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                             -(-0x32f * -0x4 + -0x23fa + 0x2513 + 0.38000000000010914),                                             0x1381 + -0x7 * -0x214 + -0x3 * 0xaf9 + 0.2799999999999727,                                             -(0x1cc6 + 0x2 * -0xa5e + 0x17 * -0x30 + 0.5299999999999727)                                         ];                                         continue;                                     case '1':                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                         continue;                                     case '2':                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x296)];                                         continue;                                     case '3':                                         _0x3fd074[_0x1da982(0x505)](_0x1c5e40 => {                                             const _0x21ac9f = _0x1da982;                                             _0x1c5e40[_0x21ac9f(0x1d2)] && (_0x1c5e40[_0x21ac9f(0x183)] = _0x5ea157[_0x21ac9f(0x3ea)], junhuaClickObjs[_0x21ac9f(0x4f2)](_0x1c5e40));                                         });                                         continue;                                     case '4':                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                             -(-0x2b5 + -0x1 * 0x2361 + 0x33e9 + 0.7296999999998661),                                             0x2347 + 0x24ca + 0x5 * -0xe2f + 0.8965000000000032,                                             -(-0x1290 + -0xb92 + 0x21bf + 0.4296000000000504)                                         ];                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x5ea157[_0x1da982(0x441)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x263)])) {                                     const _0x1bef43 = _0x5ea157[_0x1da982(0x410)][_0x1da982(0x3d8)]('|');                                     let _0xf9ee23 = 0xc9b + -0x584 * 0x1 + -0x717 * 0x1;                                     while (!![]) {                                         switch (_0x1bef43[_0xf9ee23++]) {                                         case '0':                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x35a)];                                             continue;                                         case '1':                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                 -(0x1b11 + 0xba2 * 0x3 + -0x3103 + 0.9400000000000546),                                                 0xc0b * -0x1 + -0x251 * -0x1 + 0x5 * 0x22c + 0.2699999999999818,                                                 -(-0xe33 + -0x1 * -0x23a7 + -0x11ba + 0.5199999999999818)                                             ];                                             continue;                                         case '2':                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                             continue;                                         case '3':                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                 -(0x8f0 + -0x681 + -0x4 * -0x2a1 + 0.5280999999999949),                                                 -0x694 + -0x2215 + -0x1 * -0x29ce + 0.6465999999999781,                                                 -(-0x48a + 0x2c * 0x81 + 0xdfd * -0x1 + 0.2480000000000473)                                             ];                                             continue;                                         case '4':                                             _0x3fd074[_0x1da982(0x505)](_0x2c9718 => {                                                 const _0x508f36 = _0x1da982;                                                 _0x2c9718[_0x508f36(0x1d2)] && (_0x2c9718[_0x508f36(0x183)] = _0x95d3ab[_0x508f36(0x443)], junhuaClickObjs[_0x508f36(0x4f2)](_0x2c9718));                                             });                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x5ea157[_0x1da982(0x2e6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x545)])) {                                         const _0x23107c = _0x5ea157[_0x1da982(0x2fc)][_0x1da982(0x3d8)]('|');                                         let _0x30506b = 0x1 * -0x815 + -0x1050 + 0x1865;                                         while (!![]) {                                             switch (_0x23107c[_0x30506b++]) {                                             case '0':                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                 continue;                                             case '1':                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                     -(0x25db + -0xe26 + -0xdea + 0.5189999999997781),                                                     0x19 * 0x4d + -0x11f3 + 0xb96 * 0x1 + 0.07049999999998136,                                                     -(-0x109c + 0x16e8 + -0x2b * 0x10 + 0.9367999999999483)                                                 ];                                                 continue;                                             case '2':                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2d5)];                                                 continue;                                             case '3':                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                     -(0x89 * 0x3 + 0x827 * -0x4 + 0x28ce + 0.38000000000010914),                                                     -0x1 * 0x1924 + -0x2696 + 0x40dc * 0x1 + 0.2799999999999727,                                                     -(-0x6 * 0x18e + -0x1 * 0xa04 + 0x1712 + 0.5299999999999727)                                                 ];                                                 continue;                                             case '4':                                                 _0x3fd074[_0x1da982(0x505)](_0x4b35d9 => {                                                     const _0x552aa1 = _0x1da982;                                                     _0x4b35d9[_0x552aa1(0x1d2)] && (_0x4b35d9[_0x552aa1(0x183)] = _0x5ea157[_0x552aa1(0x3ea)], junhuaClickObjs[_0x552aa1(0x4f2)](_0x4b35d9));                                                 });                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x5ea157[_0x1da982(0x228)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x215)])) {                                             const _0x21390c = _0x5ea157[_0x1da982(0x1ad)][_0x1da982(0x3d8)]('|');                                             let _0x499df9 = -0x25a8 + 0x2 * 0x293 + 0x2082;                                             while (!![]) {                                                 switch (_0x21390c[_0x499df9++]) {                                                 case '0':                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                         -(-0x525 * -0x3 + -0x1483 * -0x1 + -0x1755 + 0.6599999999998545),                                                         -0x3a + -0xb6b + 0xc02 + 0.7999999999999972,                                                         -(-0x1525 * 0x1 + -0x1d56 + 0x38de + 0.43000000000006366)                                                     ];                                                     continue;                                                 case '1':                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                         -(0x796 + 0x1034 + -0xb2d + 0.671100000000024),                                                         -0x3 * 0xc57 + 0x362 * 0x6 + -0x893 * -0x2 + 0.6655999999999977,                                                         -(0x1f5d * -0x1 + -0x9d5 * 0x1 + 0x2fc1 + 0.5574999999998909)                                                     ];                                                     continue;                                                 case '2':                                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x31f)];                                                     continue;                                                 case '3':                                                     _0x3fd074[_0x1da982(0x505)](_0x15a535 => {                                                         const _0x1ca0be = _0x1da982;                                                         _0x15a535[_0x1ca0be(0x1d2)] && (_0x15a535[_0x1ca0be(0x183)] = _0x5ea157[_0x1ca0be(0x3ea)], limoClickObjs[_0x1ca0be(0x4f2)](_0x15a535));                                                     });                                                     continue;                                                 case '4':                                                     fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x5ea157[_0x1da982(0x51b)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1dd)])) {                                                 const _0x5cc4b2 = _0x5ea157[_0x1da982(0x2d9)][_0x1da982(0x3d8)]('|');                                                 let _0x387519 = -0xc98 + 0x41e * -0x1 + 0x10b6;                                                 while (!![]) {                                                     switch (_0x5cc4b2[_0x387519++]) {                                                     case '0':                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                             -(-0x23d + 0x1ca3 * -0x1 + 0x2bf3 * 0x1 + 0.17299999999977445),                                                             0x2 * 0xcfe + 0x3ad * 0x3 + -0x249b + 0.6821000000000055,                                                             -(-0x1934 + 0x2328 + -0x360 + 0.7657999999998992)                                                         ];                                                         continue;                                                     case '1':                                                         _0x3fd074[_0x1da982(0x505)](_0x353b27 => {                                                             const _0x5ebe58 = _0x1da982;                                                             _0x353b27[_0x5ebe58(0x1d2)] && (_0x353b27[_0x5ebe58(0x183)] = _0x5ea157[_0x5ebe58(0x3ea)], limoClickObjs[_0x5ebe58(0x4f2)](_0x353b27));                                                         });                                                         continue;                                                     case '2':                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                             -(0x2c * -0x20 + -0x1f21 + 0x31b3 + 0.8000000000001819),                                                             0x1e3e + 0x27d + -0x3 * 0xaca + 0.769999999999996,                                                             -(-0x23d + 0x19f1 + -0xd * 0x155 + 0.2999999999999545)                                                         ];                                                         continue;                                                     case '3':                                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4d3)];                                                         continue;                                                     case '4':                                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x5ea157[_0x1da982(0x432)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x26d)])) {                                                     const _0x555d73 = _0x5ea157[_0x1da982(0x307)][_0x1da982(0x3d8)]('|');                                                     let _0x46927f = -0x17b1 + 0xdb8 + 0x353 * 0x3;                                                     while (!![]) {                                                         switch (_0x555d73[_0x46927f++]) {                                                         case '0':                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                 -(0xb09 + -0x1cfb + -0xa7f * -0x3 + 0.7907000000000153),                                                                 -0x115 + 0x15b4 + 0x2 * -0xa1c + 0.4047000000000054,                                                                 -(-0x1982 + -0xe * -0x138 + 0xf00 + 0.8554999999998927)                                                             ];                                                             continue;                                                         case '1':                                                             _0x3fd074[_0x1da982(0x505)](_0x3df2a8 => {                                                                 const _0x241d32 = _0x1da982;                                                                 _0x3df2a8[_0x241d32(0x1d2)] && (_0x3df2a8[_0x241d32(0x183)] = _0x5ea157[_0x241d32(0x3ea)], limoClickObjs[_0x241d32(0x4f2)](_0x3df2a8));                                                             });                                                             continue;                                                         case '2':                                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                             continue;                                                         case '3':                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                 -(-0x246e + -0x1039 + 0x4232 + 0.75),                                                                 0x5 * 0x4c1 + 0x1bfd * 0x1 + -0x3365 + 0.769999999999996,                                                                 -(0x86 * 0x21 + -0x19b * 0xf + 0xd32 + 0.31999999999993634)                                                             ];                                                             continue;                                                         case '4':                                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x3ad)];                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x5ea157[_0x1da982(0x239)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x411)])) {                                                         const _0x20c391 = _0x5ea157[_0x1da982(0x346)][_0x1da982(0x3d8)]('|');                                                         let _0x250972 = 0x10c0 + -0x2 * -0x905 + 0x1 * -0x22ca;                                                         while (!![]) {                                                             switch (_0x20c391[_0x250972++]) {                                                             case '0':                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                     -(-0x897 + -0x1ba9 + 0x3251 + 0.6343000000001666),                                                                     0xa36 + -0x1ed7 + -0x1 * -0x1505 + 0.5769999999999982,                                                                     -(0x268b + 0xa * 0x236 + -0xb * 0x4eb + 0.3106000000000222)                                                                 ];                                                                 continue;                                                             case '1':                                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                 continue;                                                             case '2':                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                     -(0x3 * -0xc4 + -0x1d25 + -0x1 * -0x2d81 + 0.6900000000000546),                                                                     -0x1ca6 + 0x2043 + -0x340 + 0.7600000000000051,                                                                     -(-0xd45 + 0x1 * 0x25b9 + -0x1211 + 0.2799999999999727)                                                                 ];                                                                 continue;                                                             case '3':                                                                 _0x3fd074[_0x1da982(0x505)](_0x572ffb => {                                                                     const _0x4b67da = _0x1da982;                                                                     _0x572ffb[_0x4b67da(0x1d2)] && (_0x572ffb[_0x4b67da(0x183)] = _0x95d3ab[_0x4b67da(0x443)], limoClickObjs[_0x4b67da(0x4f2)](_0x572ffb));                                                                 });                                                                 continue;                                                             case '4':                                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x393)];                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0x5ea157[_0x1da982(0x22f)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x37f)])) {                                                             const _0x8309b6 = _0x5ea157[_0x1da982(0x3a2)][_0x1da982(0x3d8)]('|');                                                             let _0x1548c9 = 0x1a3 + -0x19d1 * 0x1 + 0x182e;                                                             while (!![]) {                                                                 switch (_0x8309b6[_0x1548c9++]) {                                                                 case '0':                                                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x51a)];                                                                     continue;                                                                 case '1':                                                                     fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                     continue;                                                                 case '2':                                                                     _0x3fd074[_0x1da982(0x505)](_0x143545 => {                                                                         const _0x31679d = _0x1da982;                                                                         _0x143545[_0x31679d(0x1d2)] && (_0x143545[_0x31679d(0x183)] = _0x95d3ab[_0x31679d(0x443)], limoClickObjs[_0x31679d(0x4f2)](_0x143545));                                                                     });                                                                     continue;                                                                 case '3':                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                         -(-0xe3d + -0x2223 + -0x5 * -0xc97 + 0.5162000000000262),                                                                         0x1711 + -0x7 * 0x95 + -0x94d * 0x2 + 0.45650000000000546,                                                                         -(-0x289 + -0x770 + 0x1086 + 0.42429999999990287)                                                                     ];                                                                     continue;                                                                 case '4':                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                         -(-0x1492 * -0x1 + -0x1 * -0xaac + -0x10aa + 0.03000000000020009),                                                                         -0x204e + 0x24e * -0x10 + 0x458b + 0.7999999999999972,                                                                         -(-0x2a * -0xc8 + -0x55f * 0x7 + 0x6e * 0x1a + 0.40000000000009095)                                                                     ];                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         } else {                                                             if (_0x5ea157[_0x1da982(0x1a0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1e3)])) {                                                                 const _0x4469c6 = _0x5ea157[_0x1da982(0x2b5)][_0x1da982(0x3d8)]('|');                                                                 let _0x1936d0 = 0x22e9 + -0x8f * -0x2 + 0x17 * -0x191;                                                                 while (!![]) {                                                                     switch (_0x4469c6[_0x1936d0++]) {                                                                     case '0':                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                             -(-0x1 * 0x2e3 + 0x5 * 0x695 + -0xf04 + 0.05209999999988213),                                                                             -0x25e1 + -0x656 + -0x164d * -0x2 + 0.9133999999999958,                                                                             -(-0xfae + -0x155 * -0xb + -0x791 * -0x1 + 0.08539999999993597)                                                                         ];                                                                         continue;                                                                     case '1':                                                                         _0x3fd074[_0x1da982(0x505)](_0x359ae => {                                                                             const _0x332a3a = _0x1da982;                                                                             _0x359ae[_0x332a3a(0x1d2)] && (_0x359ae[_0x332a3a(0x183)] = _0x95d3ab[_0x332a3a(0x443)], limoClickObjs[_0x332a3a(0x4f2)](_0x359ae));                                                                         });                                                                         continue;                                                                     case '2':                                                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x337)];                                                                         continue;                                                                     case '3':                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                             -(-0x1b3f + -0x2c0 + 0x2d * 0x100 + 0.07000000000016371),                                                                             0x1 * -0x1ef8 + 0x20a3 + -0x14e + 0.769999999999996,                                                                             -(0xd * 0x109 + 0x99c + -0x23 * 0x7a + 0.30999999999994543)                                                                         ];                                                                         continue;                                                                     case '4':                                                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                         continue;                                                                     }                                                                     break;                                                                 }                                                             } else {                                                                 if (_0x5ea157[_0x1da982(0x286)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1da)])) {                                                                     const _0x5c8cc0 = _0x5ea157[_0x1da982(0x341)][_0x1da982(0x3d8)]('|');                                                                     let _0x5c7b7b = 0x2f * 0x28 + 0x1e85 + -0x9 * 0x435;                                                                     while (!![]) {                                                                         switch (_0x5c8cc0[_0x5c7b7b++]) {                                                                         case '0':                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                 -(-0x1668 + -0x23e0 + 0x49b3 + 0.8409999999998945),                                                                                 -0x263a + 0x142c + 0x1271 + 0.722999999999999,                                                                                 -(-0x3c * 0x44 + -0x101c + 0x2694 + 0.9076999999999771)                                                                             ];                                                                             continue;                                                                         case '1':                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                 -(-0x1479 + 0x52 * -0x9 + 0x26c6 + 0.5399999999999636),                                                                                 0x7cb + -0x7e3 * -0x3 + 0x1 * -0x1f17 + 0.7600000000000051,                                                                                 -(-0x1a3 * 0xd + -0xcb * -0x19 + 0x7d7 + 0.2599999999999909)                                                                             ];                                                                             continue;                                                                         case '2':                                                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                             continue;                                                                         case '3':                                                                             _0x3fd074[_0x1da982(0x505)](_0x50cc75 => {                                                                                 const _0x34158b = _0x1da982;                                                                                 _0x50cc75[_0x34158b(0x1d2)] && (_0x50cc75[_0x34158b(0x183)] = _0x5ea157[_0x34158b(0x3ea)], limoClickObjs[_0x34158b(0x4f2)](_0x50cc75));                                                                             });                                                                             continue;                                                                         case '4':                                                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x3c1)];                                                                             continue;                                                                         }                                                                         break;                                                                     }                                                                 } else {                                                                     if (_0x5ea157[_0x1da982(0x250)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x185)])) {                                                                         const _0x2938e6 = _0x5ea157[_0x1da982(0x40d)][_0x1da982(0x3d8)]('|');                                                                         let _0x3e58bd = 0x1cc3 + -0x1 * 0x142f + -0x9 * 0xf4;                                                                         while (!![]) {                                                                             switch (_0x2938e6[_0x3e58bd++]) {                                                                             case '0':                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                     -(0x76e + 0x2531 + 0x1d * -0xfe + 0.5500000000001819),                                                                                     -0x97 * -0x14 + -0x23ec + 0x187d + 0.7900000000000063,                                                                                     -(-0x1b68 + 0x1 * 0x122b + -0x28 * -0x64 + 0.38000000000010914)                                                                                 ];                                                                                 continue;                                                                             case '1':                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                     -(-0x1a * 0x7 + -0x6 * 0x23b + -0x7 * -0x447 + 0.9456000000000131),                                                                                     -0x1 * 0x1763 + 0xf3 * 0x23 + -0x3b * 0x29 + 0.5799999999999983,                                                                                     -(-0x663 + 0x21dc + 0x2fe * -0x7 + 0.934400000000096)                                                                                 ];                                                                                 continue;                                                                             case '2':                                                                                 _0x3fd074[_0x1da982(0x505)](_0x4ce5c2 => {                                                                                     const _0x41cd9a = _0x1da982;                                                                                     _0x4ce5c2[_0x41cd9a(0x1d2)] && (_0x4ce5c2[_0x41cd9a(0x183)] = _0x5ea157[_0x41cd9a(0x3ea)], limoClickObjs[_0x41cd9a(0x4f2)](_0x4ce5c2));                                                                                 });                                                                                 continue;                                                                             case '3':                                                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x489)];                                                                                 continue;                                                                             case '4':                                                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                 continue;                                                                             }                                                                             break;                                                                         }                                                                     } else {                                                                         if (_0x5ea157[_0x1da982(0x3fd)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x209)])) {                                                                             const _0x1563fb = _0x5ea157[_0x1da982(0x20c)][_0x1da982(0x3d8)]('|');                                                                             let _0x266dd3 = 0x1cf3 * -0x1 + 0x25 * -0x107 + 0x2 * 0x217b;                                                                             while (!![]) {                                                                                 switch (_0x1563fb[_0x266dd3++]) {                                                                                 case '0':                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                         -(-0x1 * -0x623 + -0x1 * 0x427 + 0x898 + 0.599999999999909),                                                                                         0x1 * 0x1d3 + 0x2 * -0xb30 + 0x1639 + 0.22000000000002728,                                                                                         -(-0x257f + 0x237 * 0x1 + 0x2f92 + 0.2899999999999636)                                                                                     ];                                                                                     continue;                                                                                 case '1':                                                                                     _0x3fd074[_0x1da982(0x505)](_0x32f51c => {                                                                                         const _0x122d41 = _0x1da982;                                                                                         _0x32f51c[_0x122d41(0x1d2)] && (_0x32f51c[_0x122d41(0x183)] = _0x5ea157[_0x122d41(0x3ea)], shaifenClickObjs[_0x122d41(0x4f2)](_0x32f51c));                                                                                     });                                                                                     continue;                                                                                 case '2':                                                                                     fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                     continue;                                                                                 case '3':                                                                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x486)];                                                                                     continue;                                                                                 case '4':                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                         -(0x1529 * 0x1 + -0x1200 + 0x92 * 0xd + 0.7332999999998719),                                                                                         0x5cc + -0x2021 + 0x1c09 + 0.8772999999999911,                                                                                         -(0xcf1 * 0x1 + -0x3 * -0x4eb + 0x2b * -0x5d + 0.637000000000171)                                                                                     ];                                                                                     continue;                                                                                 }                                                                                 break;                                                                             }                                                                         } else {                                                                             if (_0x5ea157[_0x1da982(0x19e)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3a7)])) {                                                                                 const _0xee6929 = _0x5ea157[_0x1da982(0x1cc)][_0x1da982(0x3d8)]('|');                                                                                 let _0x440ccc = 0x156d + 0x1693 * -0x1 + 0x126;                                                                                 while (!![]) {                                                                                     switch (_0xee6929[_0x440ccc++]) {                                                                                     case '0':                                                                                         _0x3fd074[_0x1da982(0x505)](_0x2dd212 => {                                                                                             const _0x27cab5 = _0x1da982;                                                                                             _0x2dd212[_0x27cab5(0x1d2)] && (_0x2dd212[_0x27cab5(0x183)] = _0x95d3ab[_0x27cab5(0x443)], posuiClickObjs[_0x27cab5(0x4f2)](_0x2dd212));                                                                                         });                                                                                         continue;                                                                                     case '1':                                                                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x353)];                                                                                         continue;                                                                                     case '2':                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                             -(-0x2b * 0x19 + -0xa37 + -0x1 * -0x1945 + 0.11749999999983629),                                                                                             -0x12eb + 0x4 * 0x2ca + 0x1ed * 0x5 + 0.5801999999999907,                                                                                             -(-0x159b + -0x78 * 0x2d + 0x3 * 0x1348 + 0.647899999999936)                                                                                         ];                                                                                         continue;                                                                                     case '3':                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                             -(0x705 + -0x11fe + 0x15d2 + 0.17000000000007276),                                                                                             -0x2182 + 0x2a * -0xee + 0xc * 0x633 + 0.18999999999999773,                                                                                             -(0x1 * 0x1999 + 0x1 * -0x1ee + -0x1bf * 0x5 + 0.7100000000000364)                                                                                         ];                                                                                         continue;                                                                                     case '4':                                                                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                         continue;                                                                                     }                                                                                     break;                                                                                 }                                                                             } else {                                                                                 if (_0x5ea157[_0x1da982(0x4c9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3cb)])) {                                                                                     const _0x425cbf = _0x5ea157[_0x1da982(0x449)][_0x1da982(0x3d8)]('|');                                                                                     let _0x3eb7fc = -0x2021 + -0x1338 + -0x4ab * -0xb;                                                                                     while (!![]) {                                                                                         switch (_0x425cbf[_0x3eb7fc++]) {                                                                                         case '0':                                                                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                             continue;                                                                                         case '1':                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                 -(-0x1ce9 + 0x24af + -0x1ed * 0x1 + 0.49080000000003565),                                                                                                 -0x2fe * -0x3 + 0x1 * 0x1e5 + 0x5 * -0x1fb + 0.017599999999987403,                                                                                                 -(-0x4a5 + 0x1 * -0x1df5 + -0x16c9 * -0x2 + 0.1289000000001579)                                                                                             ];                                                                                             continue;                                                                                         case '2':                                                                                             _0x3fd074[_0x1da982(0x505)](_0x21f8d9 => {                                                                                                 const _0x2756e7 = _0x1da982;                                                                                                 _0x21f8d9[_0x2756e7(0x1d2)] && (_0x21f8d9[_0x2756e7(0x183)] = _0x5ea157[_0x2756e7(0x3ea)], duishiClickObjs[_0x2756e7(0x4f2)](_0x21f8d9));                                                                                             });                                                                                             continue;                                                                                         case '3':                                                                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4fa)];                                                                                             continue;                                                                                         case '4':                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                 -(-0x1 * -0x99 + -0xcf1 + 0x1252 + 0.8599999999999),                                                                                                 0x13ce + -0x47 * -0x70 + -0x31ec + 0.7299999999999898,                                                                                                 -(0x7d * -0x28 + -0x15d4 * 0x1 + 0xa77 * 0x5 + 0.11000000000012733)                                                                                             ];                                                                                             continue;                                                                                         }                                                                                         break;                                                                                     }                                                                                 } else {                                                                                     if (_0x5ea157[_0x1da982(0x53c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x412)])) {                                                                                         const _0x43b7dd = _0x5ea157[_0x1da982(0x51d)][_0x1da982(0x3d8)]('|');                                                                                         let _0xf1c1b5 = -0x11 * -0xd3 + 0x3 * -0x263 + -0x6da;                                                                                         while (!![]) {                                                                                             switch (_0x43b7dd[_0xf1c1b5++]) {                                                                                             case '0':                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                     -(-0x1 * -0x281 + 0x1480 + -0x1107 + 0.9200000000000728),                                                                                                     -0x2cf * 0xa + 0x2477 + -0x756 + 0.7300000000000182,                                                                                                     -(-0x947 + -0x1831 + 0x1736 * 0x2 + 0.6300000000001091)                                                                                                 ];                                                                                                 continue;                                                                                             case '1':                                                                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x481)];                                                                                                 continue;                                                                                             case '2':                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                     -(0x5b3 + -0x3d * -0x64 + 0x8 * -0x2f6 + 0.169399999999996),                                                                                                     -0x2282 + -0x24d7 + -0x2c9 * -0x1a + 0.3967000000000098,                                                                                                     -(-0x1d67 + 0xd62 + 0x1cfb * 0x1 + 0.02930000000014843)                                                                                                 ];                                                                                                 continue;                                                                                             case '3':                                                                                                 _0x3fd074[_0x1da982(0x505)](_0x416e7d => {                                                                                                     const _0x134fe4 = _0x1da982;                                                                                                     _0x416e7d[_0x134fe4(0x1d2)] && (_0x416e7d[_0x134fe4(0x183)] = _0x5ea157[_0x134fe4(0x3ea)], duishiClickObjs[_0x134fe4(0x4f2)](_0x416e7d));                                                                                                 });                                                                                                 continue;                                                                                             case '4':                                                                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                 continue;                                                                                             }                                                                                             break;                                                                                         }                                                                                     } else {                                                                                         if (_0x5ea157[_0x1da982(0x1c4)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1de)])) {                                                                                             const _0x18cc2b = _0x5ea157[_0x1da982(0x2a1)][_0x1da982(0x3d8)]('|');                                                                                             let _0x3dc590 = -0x18b + -0x11ae + 0x1339;                                                                                             while (!![]) {                                                                                                 switch (_0x18cc2b[_0x3dc590++]) {                                                                                                 case '0':                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                         -(-0x20f5 + 0xdf1 + -0x50b * -0x7 + 0.4228000000002794),                                                                                                         0x18a2 + 0x2 * 0xa21 + -0x2bf7 + 0.5186999999999955,                                                                                                         -(-0x5d * -0x37 + -0x8 * -0x497 + -0x3049 + 0.3270999999999731)                                                                                                     ];                                                                                                     continue;                                                                                                 case '1':                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                         -(-0x2678 * 0x1 + 0x8ae + 0x2e13 * 0x1 + 0.0500000000001819),                                                                                                         0xc72 + 0x12f2 + -0x1 * 0x1e7d + 0.060000000000002274,                                                                                                         -(-0x25 * -0x85 + -0x1 * -0x61f + 0x7 * -0x271 + 0.5500000000001819)                                                                                                     ];                                                                                                     continue;                                                                                                 case '2':                                                                                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2e4)];                                                                                                     continue;                                                                                                 case '3':                                                                                                     fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                     continue;                                                                                                 case '4':                                                                                                     _0x3fd074[_0x1da982(0x505)](_0x14c67e => {                                                                                                         const _0x1f92ae = _0x1da982;                                                                                                         _0x14c67e[_0x1f92ae(0x1d2)] && (_0x14c67e[_0x1f92ae(0x183)] = _0x5ea157[_0x1f92ae(0x3ea)], suishiClickObjs[_0x1f92ae(0x4f2)](_0x14c67e));                                                                                                     });                                                                                                     continue;                                                                                                 }                                                                                                 break;                                                                                             }                                                                                         } else {                                                                                             if (_0x5ea157[_0x1da982(0x41f)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x318)])) {                                                                                                 const _0xbb8ce4 = _0x5ea157[_0x1da982(0x40d)][_0x1da982(0x3d8)]('|');                                                                                                 let _0x1fbea6 = 0x4b7 * 0x1 + -0x3b * 0x4d + -0x342 * -0x4;                                                                                                 while (!![]) {                                                                                                     switch (_0xbb8ce4[_0x1fbea6++]) {                                                                                                     case '0':                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                             -(-0x1645 + -0x19d5 + 0x3edc + 0.9299999999998363),                                                                                                             -0x53c * 0x7 + -0x5 * 0xd + 0x2607 + 0.2300000000000182,                                                                                                             -(-0xcc6 + -0x1d45 + 0x1 * 0x2dc5 + 0.5199999999999818)                                                                                                         ];                                                                                                         continue;                                                                                                     case '1':                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                             -(-0x9d * -0x35 + 0xeeb + -0x25 * 0xe2 + 0.1950000000001637),                                                                                                             0xb * -0x17b + -0x21c3 + -0x1999 * -0x2 + 0.7178000000000111,                                                                                                             -(0x62b * 0x6 + 0x6 * -0x33b + -0xe01 + 0.38610000000005584)                                                                                                         ];                                                                                                         continue;                                                                                                     case '2':                                                                                                         _0x3fd074[_0x1da982(0x505)](_0x57f7aa => {                                                                                                             const _0x16121c = _0x1da982;                                                                                                             _0x57f7aa[_0x16121c(0x1d2)] && (_0x57f7aa[_0x16121c(0x183)] = _0x5ea157[_0x16121c(0x40b)], junhuaClickObjs[_0x16121c(0x4f2)](_0x57f7aa));                                                                                                         });                                                                                                         continue;                                                                                                     case '3':                                                                                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x330)];                                                                                                         continue;                                                                                                     case '4':                                                                                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                         continue;                                                                                                     }                                                                                                     break;                                                                                                 }                                                                                             } else {                                                                                                 if (_0x5ea157[_0x1da982(0x1b8)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1e5)])) {                                                                                                     const _0x2b3f71 = _0x5ea157[_0x1da982(0x390)][_0x1da982(0x3d8)]('|');                                                                                                     let _0x5b71d2 = 0x262c + -0x224f + -0x3dd;                                                                                                     while (!![]) {                                                                                                         switch (_0x2b3f71[_0x5b71d2++]) {                                                                                                         case '0':                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                 -(-0x235 + -0x1 * 0x64 + -0x2 * -0x84b + 0.19090000000005602),                                                                                                                 -0x211 + -0xdc * -0x11 + 0xb65 * -0x1 + 0.30869999999998754,                                                                                                                 -(-0x15 * 0x199 + -0x114d + 0x367a + 0.6746000000000549)                                                                                                             ];                                                                                                             continue;                                                                                                         case '1':                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                 -(-0x8e * 0x3d + -0xd26 + 0x3cf9 + 0.8899999999998727),                                                                                                                 -0x1 * -0xca1 + -0x1f38 + 0x13b9 * 0x1 + 0.22000000000002728,                                                                                                                 -(0x417 + -0x18 * 0xe2 + 0x14d3 + 0.4800000000000182)                                                                                                             ];                                                                                                             continue;                                                                                                         case '2':                                                                                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                             continue;                                                                                                         case '3':                                                                                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x203)];                                                                                                             continue;                                                                                                         case '4':                                                                                                             _0x3fd074[_0x1da982(0x505)](_0xaed957 => {                                                                                                                 const _0x2e81f4 = _0x1da982;                                                                                                                 _0xaed957[_0x2e81f4(0x1d2)] && (_0xaed957[_0x2e81f4(0x183)] = _0x95d3ab[_0x2e81f4(0x3b5)], junhuaClickObjs[_0x2e81f4(0x4f2)](_0xaed957));                                                                                                             });                                                                                                             continue;                                                                                                         }                                                                                                         break;                                                                                                     }                                                                                                 } else {                                                                                                     if (_0x5ea157[_0x1da982(0x344)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2bb)])) {                                                                                                         const _0x4f8bb7 = _0x5ea157[_0x1da982(0x1ad)][_0x1da982(0x3d8)]('|');                                                                                                         let _0x57588c = 0x6a9 + -0xdac + -0x5 * -0x167;                                                                                                         while (!![]) {                                                                                                             switch (_0x4f8bb7[_0x57588c++]) {                                                                                                             case '0':                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                     -(-0xf11 * -0x1 + 0x15f * -0x8 + -0x1 * -0x96a + 0.07000000000016371),                                                                                                                     0x1ca7 + -0x2b7 + -0xa * 0x27b + 0.2300000000000182,                                                                                                                     -(0xaf8 + 0x2 * 0xf35 + -0x14 * 0x1e2 + 0.44000000000005457)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '1':                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                     -(-0x975 + 0x2605 + -0x1 * 0xf0d + 0.2199000000000524),                                                                                                                     0x2403 * 0x1 + 0x1 * -0xff + -0x21df + 0.7355000000000018,                                                                                                                     -(0x61 * -0x2f + 0xf69 + -0x305 * -0x2 + 0.30750000000000455)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '2':                                                                                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x45f)];                                                                                                                 continue;                                                                                                             case '3':                                                                                                                 _0x3fd074[_0x1da982(0x505)](_0x334921 => {                                                                                                                     const _0x3c4bf8 = _0x1da982;                                                                                                                     _0x334921[_0x3c4bf8(0x1d2)] && (_0x334921[_0x3c4bf8(0x183)] = _0x95d3ab[_0x3c4bf8(0x3b5)], junhuaClickObjs[_0x3c4bf8(0x4f2)](_0x334921));                                                                                                                 });                                                                                                                 continue;                                                                                                             case '4':                                                                                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                 continue;                                                                                                             }                                                                                                             break;                                                                                                         }                                                                                                     } else {                                                                                                         if (_0x5ea157[_0x1da982(0x334)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2ba)])) {                                                                                                             const _0x424e04 = _0x5ea157[_0x1da982(0x34b)][_0x1da982(0x3d8)]('|');                                                                                                             let _0x38f3e2 = -0xf17 * -0x2 + -0x1 * -0x147b + -0x32a9;                                                                                                             while (!![]) {                                                                                                                 switch (_0x424e04[_0x38f3e2++]) {                                                                                                                 case '0':                                                                                                                     _0x3fd074[_0x1da982(0x505)](_0x3756c5 => {                                                                                                                         const _0x482d51 = _0x1da982;                                                                                                                         _0x3756c5[_0x482d51(0x1d2)] && (_0x3756c5[_0x482d51(0x183)] = _0x95d3ab[_0x482d51(0x3b5)], junhuaClickObjs[_0x482d51(0x4f2)](_0x3756c5));                                                                                                                     });                                                                                                                     continue;                                                                                                                 case '1':                                                                                                                     fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                     continue;                                                                                                                 case '2':                                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                         -(-0x1 * 0x9f0 + -0x67 * -0x43 + 0x459 * -0x1 + 0.6161999999999352),                                                                                                                         0x77a + 0x2607 + -0x2c5b + 0.31869999999997844,                                                                                                                         -(-0xb * -0x107 + 0x7 * 0x407 + -0x1 * 0x23de + 0.6698999999999842)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 case '3':                                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                         -(-0x1 * 0x1843 + -0x1adc + 0x6 * 0xaa2 + 0.4899999999997817),                                                                                                                         -0xf7c * -0x2 + -0x760 + -0x1676 + 0.2300000000000182,                                                                                                                         -(0x2616 + 0x6a0 + 0xa3f * -0x4 + 0.4700000000000273)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 case '4':                                                                                                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x41e)];                                                                                                                     continue;                                                                                                                 }                                                                                                                 break;                                                                                                             }                                                                                                         } else {                                                                                                             if (_0x5ea157[_0x1da982(0x28d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3cd)])) {                                                                                                                 const _0x1d9d12 = _0x5ea157[_0x1da982(0x388)][_0x1da982(0x3d8)]('|');                                                                                                                 let _0x40b114 = 0xa1 * -0x11 + -0x1 * 0xa3a + 0x77 * 0x2d;                                                                                                                 while (!![]) {                                                                                                                     switch (_0x1d9d12[_0x40b114++]) {                                                                                                                     case '0':                                                                                                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x24e)];                                                                                                                         continue;                                                                                                                     case '1':                                                                                                                         _0x3fd074[_0x1da982(0x505)](_0x26c5aa => {                                                                                                                             const _0x540529 = _0x1da982;                                                                                                                             _0x26c5aa[_0x540529(0x1d2)] && (_0x26c5aa[_0x540529(0x183)] = _0x95d3ab[_0x540529(0x3b5)], junhuaClickObjs[_0x540529(0x4f2)](_0x26c5aa));                                                                                                                         });                                                                                                                         continue;                                                                                                                     case '2':                                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                             -(0x1aea + -0x2030 + 0x1118 + 0.4776999999999134),                                                                                                                             -0x8a2 + -0x269c + 0x3063 + 0.9200000000000159,                                                                                                                             -(0x1 * 0x1625 + -0x2 * -0x643 + -0x1f08 + 0.15260000000000673)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     case '3':                                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                             -(0x2 * 0x12be + -0x3f * -0x61 + -0x3189 + 0.3200000000001637),                                                                                                                             0x1 * -0x2cc + -0x5f5 * -0x4 + 0x6 * -0x351 + 0.2300000000000182,                                                                                                                             -(-0x2e1 + -0x939 + 0xfd4 + 0.4500000000000455)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     case '4':                                                                                                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                         continue;                                                                                                                     }                                                                                                                     break;                                                                                                                 }                                                                                                             } else {                                                                                                                 if (_0x5ea157[_0x1da982(0x472)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x2e5)])) {                                                                                                                     const _0x28d23d = _0x5ea157[_0x1da982(0x326)][_0x1da982(0x3d8)]('|');                                                                                                                     let _0xbc2eb1 = 0xae6 * 0x3 + -0x1 * 0x2b6 + 0x194 * -0x13;                                                                                                                     while (!![]) {                                                                                                                         switch (_0x28d23d[_0xbc2eb1++]) {                                                                                                                         case '0':                                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                 -(-0x2102 + -0x2 * -0xb6f + 0x1 * 0x157f + 0.38999999999987267),                                                                                                                                 -0x5b * -0x12 + -0x321 * -0x5 + -0x65 * 0x35 + 0.2300000000000182,                                                                                                                                 -(0x23ef * 0x1 + 0x2b * -0x10 + -0x1d85 + 0.6000000000000227)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         case '1':                                                                                                                             _0x3fd074[_0x1da982(0x505)](_0x549768 => {                                                                                                                                 const _0x5d773a = _0x1da982;                                                                                                                                 _0x549768[_0x5d773a(0x1d2)] && (_0x549768[_0x5d773a(0x183)] = _0x95d3ab[_0x5d773a(0x3b5)], junhuaClickObjs[_0x5d773a(0x4f2)](_0x549768));                                                                                                                             });                                                                                                                             continue;                                                                                                                         case '2':                                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                 -(0x527 * 0x1 + 0x296 + -0x1 * -0x39d + 0.8919000000000779),                                                                                                                                 -0x8b * 0x2f + -0xf4b + 0x83 * 0x52 + 0.11419999999998254,                                                                                                                                 -(0x1 * -0x1958 + 0x1fd8 + -0x2de * 0x1 + 0.08090000000004238)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         case '3':                                                                                                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x276)];                                                                                                                             continue;                                                                                                                         case '4':                                                                                                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                             continue;                                                                                                                         }                                                                                                                         break;                                                                                                                     }                                                                                                                 } else {                                                                                                                     if (_0x5ea157[_0x1da982(0x28c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x408)])) {                                                                                                                         const _0x2a25d2 = _0x5ea157[_0x1da982(0x542)][_0x1da982(0x3d8)]('|');                                                                                                                         let _0x32a399 = -0x15a4 + 0x11 * 0x14f + -0x9b;                                                                                                                         while (!![]) {                                                                                                                             switch (_0x2a25d2[_0x32a399++]) {                                                                                                                             case '0':                                                                                                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x31b)];                                                                                                                                 continue;                                                                                                                             case '1':                                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                     -(-0x21ad + 0x1c * -0xad + -0x64d * -0xa + 0.29599999999982174),                                                                                                                                     0x8b7 + 0x2128 + -0xf * 0x2b7 + 0.11419999999998254,                                                                                                                                     -(0xba5 + 0x144a + -0x1c4e + 0.9664000000000215)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '2':                                                                                                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                 continue;                                                                                                                             case '3':                                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                     -(-0x2605 + 0x79 * -0x2a + 0x73 * 0x98 + 0.13000000000010914),                                                                                                                                     0x1e3 * -0x5 + 0x22c3 + -0x1832 + 0.2300000000000182,                                                                                                                                     -(-0x2213 + 0x88 * 0x1e + 0x15dd + 0.4900000000000091)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '4':                                                                                                                                 _0x3fd074[_0x1da982(0x505)](_0x37a90f => {                                                                                                                                     const _0x247ee7 = _0x1da982;                                                                                                                                     _0x37a90f[_0x247ee7(0x1d2)] && (_0x37a90f[_0x247ee7(0x183)] = _0x95d3ab[_0x247ee7(0x3b5)], junhuaClickObjs[_0x247ee7(0x4f2)](_0x37a90f));                                                                                                                                 });                                                                                                                                 continue;                                                                                                                             }                                                                                                                             break;                                                                                                                         }                                                                                                                     } else {                                                                                                                         if (_0x5ea157[_0x1da982(0x480)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x43e)])) {                                                                                                                             const _0xbccd7c = _0x5ea157[_0x1da982(0x428)][_0x1da982(0x3d8)]('|');                                                                                                                             let _0x305b3c = -0x2300 + -0x741 + 0x1d * 0x175;                                                                                                                             while (!![]) {                                                                                                                                 switch (_0xbccd7c[_0x305b3c++]) {                                                                                                                                 case '0':                                                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                         -(0x1 * 0x2b7 + -0x1573 + 0x1c80 + 0.3400000000001455),                                                                                                                                         0x2251 + -0x5 * 0x35b + -0x1064 + 0.29869999999999663,                                                                                                                                         -(-0x8 * 0x20c + 0x1 * -0x1e0a + -0x7a * -0x69 + 0.7951000000000477)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 case '1':                                                                                                                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2dd)];                                                                                                                                     continue;                                                                                                                                 case '2':                                                                                                                                     _0x3fd074[_0x1da982(0x505)](_0x1cdc90 => {                                                                                                                                         const _0x3b8416 = _0x1da982;                                                                                                                                         _0x1cdc90[_0x3b8416(0x1d2)] && (_0x1cdc90[_0x3b8416(0x183)] = _0x95d3ab[_0x3b8416(0x3b5)], junhuaClickObjs[_0x3b8416(0x4f2)](_0x1cdc90));                                                                                                                                     });                                                                                                                                     continue;                                                                                                                                 case '3':                                                                                                                                     fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                     continue;                                                                                                                                 case '4':                                                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                         -(-0x670 + 0x1ef6 + -0xec2 + 0.3400000000001455),                                                                                                                                         -0x21b9 + -0x26e6 + 0x49c1 + 0.20999999999997954,                                                                                                                                         -(0x1195 * 0x2 + 0x1100 + -0x3070 + 0.6100000000000136)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 }                                                                                                                                 break;                                                                                                                             }                                                                                                                         } else {                                                                                                                             if (_0x5ea157[_0x1da982(0x355)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x29a)])) {                                                                                                                                 const _0x3b7bda = _0x5ea157[_0x1da982(0x394)][_0x1da982(0x3d8)]('|');                                                                                                                                 let _0x1cc517 = 0x1e8b + -0x1cc2 + -0x1c9 * 0x1;                                                                                                                                 while (!![]) {                                                                                                                                     switch (_0x3b7bda[_0x1cc517++]) {                                                                                                                                     case '0':                                                                                                                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                         continue;                                                                                                                                     case '1':                                                                                                                                         _0x3fd074[_0x1da982(0x505)](_0x138784 => {                                                                                                                                             const _0x4e21d4 = _0x1da982;                                                                                                                                             _0x138784[_0x4e21d4(0x1d2)] && (_0x138784[_0x4e21d4(0x183)] = _0x95d3ab[_0x4e21d4(0x3b5)], junhuaClickObjs[_0x4e21d4(0x4f2)](_0x138784));                                                                                                                                         });                                                                                                                                         continue;                                                                                                                                     case '2':                                                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                             -(-0x270a + 0x97 * -0xd + 0x631 * 0x9 + 0.4659999999998945),                                                                                                                                             -0x99b * -0x3 + 0x917 + -0x1 * 0x24c2 + 0.11419999999998254,                                                                                                                                             -(0x893 + 0x2538 + 0x3 * -0xe0e + 0.9063999999999623)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     case '3':                                                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                             -(-0x1543 + -0xc9d * 0x3 + 0x441e + 0.3000000000001819),                                                                                                                                             0x1b79 + -0x12f2 * 0x2 + 0xb8d + 0.2300000000000182,                                                                                                                                             -(0x6be + -0x7f * 0x29 + 0x1153 + 0.42999999999995)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     case '4':                                                                                                                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x415)];                                                                                                                                         continue;                                                                                                                                     }                                                                                                                                     break;                                                                                                                                 }                                                                                                                             } else {                                                                                                                                 if (_0x5ea157[_0x1da982(0x1f1)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x36a)])) {                                                                                                                                     const _0xb79274 = _0x5ea157[_0x1da982(0x1ad)][_0x1da982(0x3d8)]('|');                                                                                                                                     let _0x2fe51e = 0x1b * -0xc3 + 0x2d * 0x11 + 0x24 * 0x7d;                                                                                                                                     while (!![]) {                                                                                                                                         switch (_0xb79274[_0x2fe51e++]) {                                                                                                                                         case '0':                                                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                                 -(0x54b + -0x22 * 0x53 + 0xdf1 + 0.2199999999997999),                                                                                                                                                 -0x13 * 0x19f + -0x2298 + -0x3 * -0x162d + 0.2400000000000091,                                                                                                                                                 -(-0x24ce + 0x15f9 + 0x128f + 0.40999999999996817)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '1':                                                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                                 -(0x1630 + 0x9f3 * 0x3 + -0x2bd3 + 0.38599999999996726),                                                                                                                                                 0xc44 + -0x1cd * 0x3 + 0x4d * -0x13 + 0.12419999999997344,                                                                                                                                                 -(0x8 * -0x39d + -0x1c87 + 0x3d10 + 0.8863999999999805)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '2':                                                                                                                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x21a)];                                                                                                                                             continue;                                                                                                                                         case '3':                                                                                                                                             _0x3fd074[_0x1da982(0x505)](_0x1821a6 => {                                                                                                                                                 const _0x594fef = _0x1da982;                                                                                                                                                 _0x1821a6[_0x594fef(0x1d2)] && (_0x1821a6[_0x594fef(0x183)] = _0x5ea157[_0x594fef(0x40b)], junhuaClickObjs[_0x594fef(0x4f2)](_0x1821a6));                                                                                                                                             });                                                                                                                                             continue;                                                                                                                                         case '4':                                                                                                                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                             continue;                                                                                                                                         }                                                                                                                                         break;                                                                                                                                     }                                                                                                                                 } else {                                                                                                                                     if (_0x5ea157[_0x1da982(0x54c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x525)])) {                                                                                                                                         const _0x2928da = _0x5ea157[_0x1da982(0x1f4)][_0x1da982(0x3d8)]('|');                                                                                                                                         let _0x2334de = -0x1039 * -0x1 + 0x47c + 0x14b5 * -0x1;                                                                                                                                         while (!![]) {                                                                                                                                             switch (_0x2928da[_0x2334de++]) {                                                                                                                                             case '0':                                                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                                     -(0x1887 + -0x168c + 0x5d7 + 0.43000000000006366),                                                                                                                                                     0x1cb5 * -0x1 + 0x7cd + 0xb05 * 0x2 + 0.2400000000000091,                                                                                                                                                     -(0x1808 + -0x238f * -0x1 + -0x7fb * 0x7 + 0.4600000000000364)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             case '1':                                                                                                                                                 _0x3fd074[_0x1da982(0x505)](_0x3d8843 => {                                                                                                                                                     const _0xfadd63 = _0x1da982;                                                                                                                                                     _0x3d8843[_0xfadd63(0x1d2)] && (_0x3d8843[_0xfadd63(0x183)] = _0x95d3ab[_0xfadd63(0x3b5)], junhuaClickObjs[_0xfadd63(0x4f2)](_0x3d8843));                                                                                                                                                 });                                                                                                                                                 continue;                                                                                                                                             case '2':                                                                                                                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x39b)];                                                                                                                                                 continue;                                                                                                                                             case '3':                                                                                                                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                                 continue;                                                                                                                                             case '4':                                                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                                     -(0x5 * -0x5f3 + 0x1042 + -0x1 * -0x154f + 0.9281000000000859),                                                                                                                                                     -0x1 * -0x1391 + -0x1 * 0xc31 + -0x63a + 0.12419999999997344,                                                                                                                                                     -(0x18d0 + -0x2009 + 0xada + 0.940900000000056)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             }                                                                                                                                             break;                                                                                                                                         }                                                                                                                                     } else {                                                                                                                                         if (_0x5ea157[_0x1da982(0x4d4)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x374)])) {                                                                                                                                             const _0x25f6bc = _0x5ea157[_0x1da982(0x3c2)][_0x1da982(0x3d8)]('|');                                                                                                                                             let _0x26f136 = -0x32 * 0x36 + 0x1 * -0xdf6 + 0x1882;                                                                                                                                             while (!![]) {                                                                                                                                                 switch (_0x25f6bc[_0x26f136++]) {                                                                                                                                                 case '0':                                                                                                                                                     _0x3fd074[_0x1da982(0x505)](_0x7ec1b0 => {                                                                                                                                                         const _0xda3c99 = _0x1da982;                                                                                                                                                         _0x7ec1b0[_0xda3c99(0x1d2)] && (_0x7ec1b0[_0xda3c99(0x183)] = _0x5ea157[_0xda3c99(0x40b)], junhuaClickObjs[_0xda3c99(0x4f2)](_0x7ec1b0));                                                                                                                                                     });                                                                                                                                                     continue;                                                                                                                                                 case '1':                                                                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                                         -(-0x3c1 + 0x916 + 0x3eb * 0x2 + 0.9600000000000364),                                                                                                                                                         0x1a48 * -0x1 + -0x358 * 0x2 + 0xb0b * 0x3 + 0.5,                                                                                                                                                         -(0x8b3 + -0x1 * -0x258d + -0x2a32 + 0.9200000000000728)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 case '2':                                                                                                                                                     _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                                         -(-0x1eef + 0x1 * 0xc7b + 0x1f9f + 0.9600000000000364),                                                                                                                                                         -0xf94 + 0x4 * 0x920 + -0x14bf * 0x1 + 0.34770000000000323,                                                                                                                                                         -(-0x1e08 + 0xf * -0x2 + -0xb5f * -0x3 + 0.6476000000000113)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 case '3':                                                                                                                                                     _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2b0)];                                                                                                                                                     continue;                                                                                                                                                 case '4':                                                                                                                                                     fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                                     continue;                                                                                                                                                 }                                                                                                                                                 break;                                                                                                                                             }                                                                                                                                         } else {                                                                                                                                             if (_0x5ea157[_0x1da982(0x3fa)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3e8)])) {                                                                                                                                                 const _0x2a7887 = _0x5ea157[_0x1da982(0x4c4)][_0x1da982(0x3d8)]('|');                                                                                                                                                 let _0x247349 = 0x1f7 * -0x3 + 0x2333 + -0xb * 0x2aa;                                                                                                                                                 while (!![]) {                                                                                                                                                     switch (_0x2a7887[_0x247349++]) {                                                                                                                                                     case '0':                                                                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                                             -(0x1ff * 0xb + -0xca * -0x2f + -0x5bc * 0x8 + 0.6552999999998974),                                                                                                                                                             -0x4fd * 0x7 + -0x22 + 0x2338 + 0.11030000000000229,                                                                                                                                                             -(0x1e3 + -0x1ec6 * -0x1 + -0x9 * 0x33f + 0.7545000000000073)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     case '1':                                                                                                                                                         _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                                             -(-0x196 + 0x2481 * 0x1 + 0xc0 * -0x1d + 0.9400000000000546),                                                                                                                                                             0x5 * -0x161 + 0x27 * 0x42 + -0xe * 0x37 + 0.7800000000000011,                                                                                                                                                             -(-0x695 * -0x2 + -0xf36 + 0x569 + 0.7300000000000182)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     case '2':                                                                                                                                                         _0x3fd074[_0x1da982(0x505)](_0x29faa0 => {                                                                                                                                                             const _0x1df69f = _0x1da982;                                                                                                                                                             _0x29faa0[_0x1df69f(0x1d2)] && (_0x29faa0[_0x1df69f(0x183)] = _0x5ea157[_0x1df69f(0x40b)], junhuaClickObjs[_0x1df69f(0x4f2)](_0x29faa0));                                                                                                                                                         });                                                                                                                                                         continue;                                                                                                                                                     case '3':                                                                                                                                                         fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                                         continue;                                                                                                                                                     case '4':                                                                                                                                                         _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x1f8)];                                                                                                                                                         continue;                                                                                                                                                     }                                                                                                                                                     break;                                                                                                                                                 }                                                                                                                                             } else {                                                                                                                                                 if (_0x5ea157[_0x1da982(0x473)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x293)])) {                                                                                                                                                     const _0x5c180f = _0x5ea157[_0x1da982(0x3ba)][_0x1da982(0x3d8)]('|');                                                                                                                                                     let _0x54b6c4 = 0x45 * 0x42 + -0x1f00 + 0xd36 * 0x1;                                                                                                                                                     while (!![]) {                                                                                                                                                         switch (_0x5c180f[_0x54b6c4++]) {                                                                                                                                                         case '0':                                                                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                                                 -(0x1 * -0xd0f + -0xc9 + 0x1712 + 0.21000000000003638),                                                                                                                                                                 -0xc3d + -0xc3c + 0x18a2 * 0x1 + 0.509999999999998,                                                                                                                                                                 -(-0x1f * -0xcb + -0x411 * 0x6 + 0x63 * 0xa + 0.7100000000000364)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         case '1':                                                                                                                                                             _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                                                 -(-0x1c01 + 0x1 * 0x2182 + -0x7 * -0x88 + 0.8778999999999542),                                                                                                                                                                 0xca0 + 0x2217 + -0x2e8a + 0.3941999999999979,                                                                                                                                                                 -(0xfe + -0x6db + 0x9d2 + 0.18809999999996307)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         case '2':                                                                                                                                                             _0x3fd074[_0x1da982(0x505)](_0x2378d => {                                                                                                                                                                 const _0x1c7998 = _0x1da982;                                                                                                                                                                 _0x2378d[_0x1c7998(0x1d2)] && (_0x2378d[_0x1c7998(0x183)] = _0x5ea157[_0x1c7998(0x40b)], junhuaClickObjs[_0x1c7998(0x4f2)](_0x2378d));                                                                                                                                                             });                                                                                                                                                             continue;                                                                                                                                                         case '3':                                                                                                                                                             fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                                             continue;                                                                                                                                                         case '4':                                                                                                                                                             _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4fd)];                                                                                                                                                             continue;                                                                                                                                                         }                                                                                                                                                         break;                                                                                                                                                     }                                                                                                                                                 } else {                                                                                                                                                     if (_0x5ea157[_0x1da982(0x196)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x324)])) {                                                                                                                                                         const _0x46ad2e = _0x5ea157[_0x1da982(0x1e0)][_0x1da982(0x3d8)]('|');                                                                                                                                                         let _0x3cc717 = -0x2 * -0x2f5 + -0x1ff4 + 0x1a0a;                                                                                                                                                         while (!![]) {                                                                                                                                                             switch (_0x46ad2e[_0x3cc717++]) {                                                                                                                                                             case '0':                                                                                                                                                                 fenchengnongduDeviceArrs[_0x1da982(0x4f2)](_0x3fd074);                                                                                                                                                                 continue;                                                                                                                                                             case '1':                                                                                                                                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4f0)];                                                                                                                                                                 continue;                                                                                                                                                             case '2':                                                                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x4ec) + 'a'] = [                                                                                                                                                                     -(-0x7a7 * 0x1 + -0x1dcb + 0x2 * 0x1756 + 0.017600000000129512),                                                                                                                                                                     -0x17b7 + -0x1 * -0x10f7 + 0x6eb + 0.09029999999999916,                                                                                                                                                                     -(-0xe1d + -0x261d + 0x37ac + 0.8259000000000469)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             case '3':                                                                                                                                                                 _0x3fd074[_0x1da982(0x460)][_0x1da982(0x3d9) + _0x1da982(0x4ad)] = [                                                                                                                                                                     -(0x198b + 0xe4a + -0x1e9b + 0.15999999999985448),                                                                                                                                                                     0x1a0a + -0x6 * 0x347 + 0xb1 * -0x9 + 0.759999999999998,                                                                                                                                                                     -(0x9c9 + 0x19c0 * -0x1 + 0x2 * 0x9aa + 0.7999999999999545)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             case '4':                                                                                                                                                                 _0x3fd074[_0x1da982(0x505)](_0x36d4c2 => {                                                                                                                                                                     const _0x2d3f9c = _0x1da982;                                                                                                                                                                     _0x36d4c2[_0x2d3f9c(0x1d2)] && (_0x36d4c2[_0x2d3f9c(0x183)] = _0x5ea157[_0x2d3f9c(0x40b)], junhuaClickObjs[_0x2d3f9c(0x4f2)](_0x36d4c2));                                                                                                                                                                 });                                                                                                                                                                 continue;                                                                                                                                                             }                                                                                                                                                             break;                                                                                                                                                         }                                                                                                                                                     }                                                                                                                                                 }                                                                                                                                             }                                                                                                                                         }                                                                                                                                     }                                                                                                                                 }                                                                                                                             }                                                                                                                         }                                                                                                                     }                                                                                                                 }                                                                                                             }                                                                                                         }                                                                                                     }                                                                                                 }                                                                                             }                                                                                         }                                                                                     }                                                                                 }                                                                             }                                                                         }                                                                     }                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 } else {                     if (_0x5ea157[_0x1da982(0x4dc)](_0x3fd074[_0x1da982(0x41c)], _0x5ea157[_0x1da982(0x3c0)])) {                         if (_0x5ea157[_0x1da982(0x4a7)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3dc)]))                             (_0x5ea157[_0x1da982(0x3e0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x23a)]) || _0x5ea157[_0x1da982(0x38d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x37d)])) && _0x3fd074[_0x1da982(0x505)](_0x4aa866 => {                                 const _0x4e1a3c = _0x1da982;                                 _0x4aa866[_0x4e1a3c(0x1d2)] && (_0x95d3ab[_0x4e1a3c(0x32a)](_0x3fd074[_0x4e1a3c(0x183)], _0x95d3ab[_0x4e1a3c(0x262)]) && (_0x4aa866[_0x4e1a3c(0x183)] = _0x95d3ab[_0x4e1a3c(0x405)]), _0x95d3ab[_0x4e1a3c(0x2c8)](_0x3fd074[_0x4e1a3c(0x183)], _0x95d3ab[_0x4e1a3c(0x4e2)]) && (_0x4aa866[_0x4e1a3c(0x183)] = _0x95d3ab[_0x4e1a3c(0x41a)]), _0x4aa866[_0x4e1a3c(0x460)][_0x4e1a3c(0x1e4)] = _0x3fd074, limoClickObjs[_0x4e1a3c(0x4f2)](_0x4aa866));                             });                         else {                             if (_0x5ea157[_0x1da982(0x225)](_0x2d5e1c[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x396)])) {                                 if (_0x5ea157[_0x1da982(0x427)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3b6)]) || _0x5ea157[_0x1da982(0x4b2)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x345)]) || _0x5ea157[_0x1da982(0x1df)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1d3)]) || _0x5ea157[_0x1da982(0x4e6)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x49a)]) || _0x5ea157[_0x1da982(0x54d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x444)]) || _0x5ea157[_0x1da982(0x299)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3f9)]) || _0x5ea157[_0x1da982(0x4ae)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x35b)]) || _0x5ea157[_0x1da982(0x503)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x27f)]) || _0x5ea157[_0x1da982(0x488)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x297)]) || _0x5ea157[_0x1da982(0x2c0)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3ef)]) || _0x5ea157[_0x1da982(0x23f)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x54b)]) || _0x5ea157[_0x1da982(0x53c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x456)]) || _0x5ea157[_0x1da982(0x1d9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x22d)]) || _0x5ea157[_0x1da982(0x234)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x491)]) || _0x5ea157[_0x1da982(0x18c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x220)]) || _0x5ea157[_0x1da982(0x286)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x306)]) || _0x5ea157[_0x1da982(0x4df)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3be)])) {                                     const _0x5c0be1 = _0x5ea157[_0x1da982(0x357)][_0x1da982(0x3d8)]('|');                                     let _0x56b39b = 0x1 * 0x1ba5 + -0x67e + -0x1527;                                     while (!![]) {                                         switch (_0x5c0be1[_0x56b39b++]) {                                         case '0':                                             if (_0x5ea157[_0x1da982(0x1e9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x220)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x3f7)];                                             continue;                                         case '1':                                             if (_0x5ea157[_0x1da982(0x234)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x444)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x319)];                                             continue;                                         case '2':                                             if (_0x5ea157[_0x1da982(0x54d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3b6)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2ee)];                                             continue;                                         case '3':                                             if (_0x5ea157[_0x1da982(0x48c)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x54b)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x240)];                                             continue;                                         case '4':                                             if (_0x5ea157[_0x1da982(0x38d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x456)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x347)];                                             continue;                                         case '5':                                             if (_0x5ea157[_0x1da982(0x1c4)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x1d3)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x354)];                                             continue;                                         case '6':                                             if (_0x5ea157[_0x1da982(0x501)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3be)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2fa)];                                             continue;                                         case '7':                                             if (_0x5ea157[_0x1da982(0x1ea)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x22d)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x226)];                                             continue;                                         case '8':                                             if (_0x5ea157[_0x1da982(0x349)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x345)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4e8)];                                             continue;                                         case '9':                                             if (_0x5ea157[_0x1da982(0x3e7)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x35b)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x452)];                                             continue;                                         case '10':                                             if (_0x5ea157[_0x1da982(0x17a)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x49a)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x426)];                                             continue;                                         case '11':                                             if (_0x5ea157[_0x1da982(0x200)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x27f)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2c6)];                                             continue;                                         case '12':                                             duishishitouquantity[_0x1da982(0x4f2)](_0x3fd074);                                             continue;                                         case '13':                                             if (_0x5ea157[_0x1da982(0x225)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x306)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x2ca)];                                             continue;                                         case '14':                                             if (_0x5ea157[_0x1da982(0x33d)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x491)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x4c8)];                                             continue;                                         case '15':                                             if (_0x5ea157[_0x1da982(0x425)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x297)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x1aa)];                                             continue;                                         case '16':                                             if (_0x5ea157[_0x1da982(0x4c9)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3f9)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x41d)];                                             continue;                                         case '17':                                             if (_0x5ea157[_0x1da982(0x48a)](_0x3fd074[_0x1da982(0x183)], _0x5ea157[_0x1da982(0x3ef)]))                                                 _0x3fd074[_0x1da982(0x460)]['id'] = _0x5ea157[_0x1da982(0x49d)];                                             continue;                                         }                                         break;                                     }                                 }                             }                         }                     }                 }             }         });     },     'onLoad': () => {         const _0x2a5632 = _0x4e8b5b, _0x5d7448 = {                 'COhxe': function (_0x5377bb) {                     return _0x5377bb();                 },                 'wNOsc': function (_0x370b5a) {                     return _0x370b5a();                 },                 'HEAps': function (_0x42e2e1) {                     return _0x42e2e1();                 },                 'zLZTf': function (_0xecd1e6) {                     return _0xecd1e6();                 },                 'gGpws': function (_0x3f6d4c) {                     return _0x3f6d4c();                 },                 'BoUpJ': function (_0x922165) {                     return _0x922165();                 },                 'NjIXC': function (_0x3e5d29, _0x34909f, _0x52c589) {                     return _0x3e5d29(_0x34909f, _0x52c589);                 }             };         container[_0x2a5632(0x46c) + _0x2a5632(0x245)](), defaultSky = container[_0x2a5632(0x4da)], _0x5d7448[_0x2a5632(0x34e)](addOutRoadLEDPlane), _0x5d7448[_0x2a5632(0x34e)](addRoomUpLedPlanePlane), _0x5d7448[_0x2a5632(0x4cc)](addLimoRoomMainMachineText), _0x5d7448[_0x2a5632(0x175)](addDevicePlane), _0x5d7448[_0x2a5632(0x4f7)](addCameraDevicePlane), _0x5d7448[_0x2a5632(0x190)](addDuichangLEDPlane), _0x5d7448[_0x2a5632(0x544)](render), _0x5d7448[_0x2a5632(0x4f9)](setTimeout, () => {             const _0x265c9b = _0x2a5632;             callback && _0x5d7448[_0x265c9b(0x4cc)](callback);         }, 0x257e * 0x1 + 0x1d2 * 0xc + -0x3386), container[_0x2a5632(0x25a) + 'ts'] = [defaultSky];         const _0x2163ee = new THREE[(_0x2a5632(0x3de)) + 'y'](-0x22c8 + -0x11ba + 0x3483, 0xa15 * 0x1 + 0xed1 * -0x2 + 0x1397, -0x35b + 0x2245 + -0x1ee9), _0x4d3c06 = new THREE[(_0x2a5632(0x4ed)) + (_0x2a5632(0x2f7))]({ 'color': 0xff00 });         locationCube = new THREE[(_0x2a5632(0x4f8))](_0x2163ee, _0x4d3c06), locationCube[_0x2a5632(0x1ec)][_0x2a5632(0x1b1)](0x4 * -0x245 + -0xb20 + 0x1434 * 0x1, 0xa * -0x1b7 + 0x22b4 + -0x141 * 0xe, 0x9a * -0x1f + 0x2b8 + 0x1 * 0xfee), locationCube[_0x2a5632(0x3f1)] = ![], container[_0x2a5632(0x280)](locationCube), container[_0x2a5632(0x333) + 'ns'][_0x2a5632(0x1e2)](_0x2ca760 => {             const _0x1c0cdc = _0x2a5632;             _0x2ca760[_0x1c0cdc(0x467)] = ![];         });     } }));
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
                    item.name == "立磨胶带机2带透明通道_2" ||
                    item.name == "立磨胶带机1带透明通道_2"
                ) {
                    item.material.map.offset.x -= limojiJiaodaoSpeed;
                } else {
                    item.material.map.offset.x += limojiJiaodaoSpeed;
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
    {point: [-2810.1782,259.7700,-3913.5026], look: [-2809.7353,277.6057,-3800.8936]},
    {point: [-2724.5498,259.7700,-3851.2502], look: [-2825.5713,279.2973,-3850.1688]},
    {point: [-2617.6339,259.7700,-3851.1124], look: [-2718.6554,279.2973,-3850.0310]},
    {point: [-2642.9425,259.7700,-3860.2423], look: [-2680.8541,288.6708,-3860.3499]},
    {point: [-2621.0700,228.1700,-3860.7612], look: [-2637.9884,250.1002,-3860.8905]},
    {point: [-2629.2822,228.1700,-3831.0978], look: [-2630.2343,244.0765,-3867.4190]},
    {point: [ -2695.0847,228.1700,-3643.0289], look: [-2674.1973,243.7129,-3707.7170]},
    {point: [-2696.8598,244.9900,-3641.3944], look: [-2697.3777,251.4462,-3682.1541]},
    {point: [-2697.0218,318.8800,-3236.5260], look: [-2697.9314,326.6780,-3285.7521]},
    {point: [-2697.0325,308.6100,-3161.0969], look: [-2697.9740,340.5034,-3230.6980]},
    {point: [-2761.3782,308.6100,-3181.7926], look: [-2656.6967,341.1303,-3184.0940]},
    {point: [-2875.8624,308.6100,-3181.1664], look: [-2771.1809,341.1303,-3183.4678]},
    {point: [-2866.3776,251.5100,-3144.8335], look: [-2821.4873,281.5209,-3145.4692]},
    {point: [ -2861.5115,251.5100,-3178.2225], look: [-2860.2296,283.3175,-3134.6011]},
    {point: [-2859.5378,223.0500,-3247.1672], look: [-2859.7036,244.3076,-3186.2899]},
    {point: [ -2804.3878,223.0500,-3209.6169], look: [-2871.9731,246.1474,-3211.5156]},
    {point: [-2777.8689,223.0500,-3211.1818], look: [-2845.4543,246.1474,-3213.0805]},
    {point: [-2816.0820,238.4200,-3212.1007], look: [-2816.6342,244.6744,-3192.2760]},
    {point: [-2817.3803,238.4200,-3262.8598], look: [-2816.5160,245.4417,-3218.5349]},
    {point: [-2816.3129,376.2800,-3701.3008], look: [-2815.8436,383.0412,-3658.6145]},
    {point: [-2815.1552,376.2800,-3787.5635], look: [-2816.0066,393.9810,-3695.9710]},
    {point: [-2750.6765,364.4700,-3763.5841], look: [-2841.6664,389.1376,-3767.1407]},
    {point: [-2597.8811,364.4700,-3766.1484], look: [ -2688.9404,389.1376,-3766.0106]},
    {point: [-2637.2622,364.4700,-3776.5208], look: [-2638.3684,390.8345,-3735.9117]},
    {point: [-2637.5177,329.4300,-3800.3488], look: [-2637.4801,353.1814,-3779.0591]},
    {point: [-2668.8285,329.4300,-3787.9661], look: [-2625.6830,350.2438,-3792.0667]},
    {point: [-2651.4749,329.4300,-3774.3106], look: [-2651.7557,350.9031,-3797.8947]},
    {point: [-2652.1484,297.4500,-3737.6975], look: [-2651.7091,322.0033,-3770.1322]},
    {point: [-2679.8674,297.4500,-3743.3039], look: [-2630.4233,315.1606,-3745.7295]},
    {point: [-2851.8727,297.4500,-3746.4417], look: [ -2802.7443,316.1613,-3747.1885]},
    {point: [ -2833.3287,297.4500,-3710.9728], look: [-2835.4037,318.5379,-3762.0990]},
    {point: [-2800.9985,297.4500,-3719.3435], look: [ -2846.6346,310.3779,-3720.6564]},
    {point: [-2612.1849,297.4500,-3720.3576], look: [ -2655.5393,309.7315,-3721.6048]},
    {point: [-2631.9243,297.4500,-3752.2182], look: [-2632.3556,312.6346,-3709.7773]},
    {point: [-2634.4845,297.4500,-3781.4930], look: [-2634.9158,312.6346,-3739.0520]},
    {point: [ -2657.3557,297.4500,-3765.8614], look: [-2622.2044,307.4533,-3762.3424]},
    {point: [-2682.6899,259.7700,-3807.2774], look: [-2630.9829,276.7793,-3803.9345]},
]
var roampointDot = [
    {point: [-2698.6082,464.4700,-2089.2674], look: [-2697.8374,471.5660,-2134.0631]},
    {point: [-2697.7913,464.4700,-1957.0669], look: [-2697.4542,480.2620,-2048.7303]},
    {point: [-2724.3521,453.3700,-1994.1763], look: [-2668.0746,478.0816,-1997.5783]},
    {point: [ -2831.3494,453.3700,-1991.4642], look: [-2775.0719,478.0816,-1994.8663]},
    {point: [-2802.2151,453.3700,-1961.7033], look: [-2804.1229,484.1915,-2011.3654]},
    {point: [-2777.9448,453.3700,-1982.5664], look: [-2824.9440,488.1664,-1982.1128]},
    {point: [-2728.9435,422.6100,-1981.3566], look: [-2782.5786,447.8470,-1980.3440]},
    {point: [-2658.3272,422.6100,-1980.7681], look: [-2711.9623,447.8470,-1979.7555]},
    {point: [-2677.1910,422.6100,-1946.6273], look: [-2679.3444,445.7903,-1991.8117]},
    {point: [-2708.5299,422.6100,-1958.4799], look: [-2669.7041,447.0343,-1959.0815]},
    {point: [ -2752.3858,394.5200,-1959.5623], look: [ -2706.0485,408.2208,-1960.8624]},
    {point: [-4098.1652,394.5200,-1953.7916], look: [-4046.8220,409.7009,-1955.2322]},
    {point: [-4115.9689,394.5200,-1998.2400], look: [-4109.2497,409.7009,-1947.3180]},
    {point: [-4112.6261,394.5200,-2088.1563], look: [-4110.3874,408.3060,-2036.4495]},
    {point: [  -4079.0378,394.5200,-2073.5934 ], look: [ -4130.2754,409.0048,-2067.7999   ]},
    {point: [  -2900.4078,394.5200,-2072.7299 ], look: [   -2951.8154,408.6557,-2067.6204]},
    {point: [  -2927.0869,394.5200,-2103.9145 ], look: [  -2929.1309,410.8652,-2049.9957  ]},
    {point: [ -2924.9242,394.5200,-2133.2155  ], look: [  -2926.9682,410.8652,-2079.2967 ]},
    {point: [  -2959.7439,394.5200,-2135.9380 ], look: [  -2961.7880,410.8652,-2082.0193  ]},
    {point: [ -2958.3416,394.5200,-2176.6283  ], look: [ -2960.3857,410.8652,-2122.7096  ]},
    {point: [  -2934.5005,394.5200,-2148.3104 ], look: [  -2972.7800,419.8762,-2147.6249 ]},
    {point: [  -2874.9098,348.2500,-2146.1132 ], look: [ -2911.4182,373.5053,-2146.6046  ]},
    {point: [  -2889.5145,348.2500,-2131.3909 ], look: [  -2888.5783,372.7593,-2168.3957 ]},
    {point: [ -2889.3662,348.2500,-2111.0741  ], look: [  -2888.4299,372.7593,-2148.0788 ]},
    {point: [  -2906.5316,348.2500,-2120.2330 ], look: [  -2871.8200,375.9151,-2121.0572 ]},
    {point: [   -2979.4132,301.6800,-2124.9514 ], look: [ -2945.3264,323.9646,-2125.0215  ]},
    {point: [  -2967.6985,301.6800,-2148.0824  ], look: [  -2966.4016,323.2684,-2113.5747 ]},
    {point: [  -2965.4046,301.6800,-2159.4847 ], look: [ -2965.5083,323.5015,-2125.0996  ]},
    {point: [ -2949.5516,301.6800,-2149.8346  ], look: [  -2982.1851,325.9969,-2148.3318 ]},
    {point: [-2883.7072,255.1200,-2147.9324   ], look: [ -2912.2283,277.7276,-2148.3915  ]},
    {point: [  -2888.8292,255.1200,-2128.7493 ], look: [ -2889.2854,277.4974,-2164.8218  ]},
    {point: [ -2888.5877,255.1200,-2109.6496  ], look: [  -2889.0439,277.4974,-2145.7221 ]},
    {point: [   -2909.3906,255.1200,-2121.7714 ], look: [  -2873.6223,277.9833,-2122.0423  ]},
    {point: [  -2979.0946,211.0500,-2125.9076 ], look: [  -2941.1238,236.2900,-2124.8561  ]},
    {point: [ -2967.9837,211.0500,-2151.2398  ], look: [  -2966.4236,232.7884,-2113.7943  ]},
    {point: [    -2965.3657,211.0500,-2165.9391], look: [  -2964.5625,232.5344,-2128.3236  ]},
    {point: [ -2950.8558,211.0500,-2149.4665  ], look: [ -2986.7742,235.2715,-2148.8818  ]},
    {point: [ -2861.6674,165.6900,-2147.8693  ], look: [  -2911.4595,187.3360,-2148.2903 ]},
    {point: [   -2890.5107,165.6900,-2120.7542 ], look: [ -2886.9927,181.1288,-2172.6892  ]},
    {point: [  -2892.9096,165.6900,-2102.3154 ], look: [  -2889.3916,181.1288,-2154.2505 ]},
    {point: [ -2924.6276,165.6900,-2119.4658  ], look: [  -2873.2261,182.8799,-2122.6857 ]},
    {point: [  -3034.0283,165.6900,-2121.3690 ], look: [  -2973.8781,185.3328,-2123.9131 ]},
    {point: [ -3012.8651,165.6900,-2089.6518  ], look: [-3012.4528,182.8742,-2150.6017   ]},
    {point: [ -3012.1384,165.6900,-2045.8029  ], look: [ -3011.7261,182.8742,-2106.7528  ]},
    {point: [ -3048.1743,165.6900,-2079.4265  ], look: [ -2987.1815,182.4616,-2082.4196  ]},
    {point: [  -3249.2643,165.6900,-2082.0888 ], look: [ -3188.9330,184.9252,-2081.3747  ]},
    {point: [  -3516.4110,165.6900,-2084.0704 ], look: [   -3455.8403,184.1073,-2082.5337 ]},
    {point: [ -3806.2548,165.6900,-2084.3166  ], look: [  -3745.3077,182.8742,-2083.5952  ]},
    {point: [ -4127.0606,165.6900,-2081.2539  ], look: [  -4066.0679,182.4616,-2084.2470  ]},
    {point: [   -4130.8173,181.1200,-2067.2538 ], look: [  -4080.8711,190.9401,-2064.5632 ]},
    {point: [    -4190.4624,181.1200,-2066.0255], look: [  -4140.5162,190.9401,-2063.3349 ]},
    {point: [ -4322.3882,196.4100,-2062.0094  ], look: [-4245.8049,214.3148,-2063.4705   ]},
    {point: [ -4294.1611,196.4100,-2026.3565  ], look: [ -4295.9881,217.9198,-2101.9984  ]},
    {point: [ -4327.4679,164.5100,-2040.6743  ], look: [ -4327.1572,176.3504,-2101.2345  ]},
    {point: [  -4324.6060,164.5100,-1895.6734 ], look: [  -4327.1617,176.3504,-1956.1805  ]},
    {point: [ -4353.7361,164.5100,-1934.1101  ], look: [ -4353.9486,177.8105,-1959.4154  ]},
    {point: [ -4355.0884,143.7600,-1905.5356  ], look: [   -4355.1833,161.3113,-1928.7506 ]},
    {point: [  -4355.5066,124.4200,-1862.7454  ], look: [  -4355.3149,139.3510,-1898.6593  ]},
    {point: [ -4357.3885,124.4200,-1850.3153  ], look: [  -4357.9269,139.1078,-1886.3259 ]},
    {point: [ -4312.0972,137.4600,-1818.7757  ], look: [  -4310.1348,146.9630,-1870.9812 ]},
    {point: [   -4310.5262,137.4600,-1783.1184], look: [ -4309.9746,145.7666,-1835.5614  ]},
    {point: [ -4311.6888,221.5300,-1470.4906  ], look: [   -4309.5302,230.2869,-1524.6975 ]},
    {point: [  -4310.2903,221.5300,-1387.0686  ], look: [ -4309.3036,235.6432,-1464.4762  ]},
    {point: [ -4337.4116,209.3000,-1427.0937  ], look: [   -4283.9505,235.9745,-1428.3765]},
    {point: [   -4365.8385,209.3000,-1425.8076 ], look: [   -4337.3426,224.4902,-1425.9130]},
    {point: [  -4398.0316,183.9000,-1428.9323 ], look: [ -4366.1800,200.9931,-1427.4545  ]},
    {point: [ -4386.6665,183.9000,-1453.1722  ], look: [ -4388.3184,200.8226,-1409.6180  ]},
    {point: [ -4380.0323,183.9000,-1519.2190  ], look: [ -4381.6842,200.8226,-1475.6648  ]},
    {point: [   -4350.1503,183.9000,-1501.2070 ], look: [   -4394.1332,199.6374,-1499.2290 ]},
    {point: [ -4058.1992,183.9000,-1499.0950  ], look: [ -4102.1821,199.6374,-1497.1170  ]},
    {point: [   -3683.4118,183.9000,-1497.0433 ], look: [   -3727.3947,199.6374,-1495.0653 ]},
    {point: [ -3409.1470,183.9000,-1498.1689  ], look: [ -3457.8815,201.3376,-1495.9773  ]},
    {point: [ -3098.6376,183.9000,-1502.1419  ], look: [ -3147.3721,201.3376,-1499.9503   ]},
    {point: [ -3120.5581,183.9000,-1462.6009  ], look: [-3123.3527,204.8677,-1504.2977   ]},
    {point: [  -3121.4302,183.9000,-1414.7815 ], look: [  -3122.8135,204.8677,-1456.5489 ]},
    {point: [  -3154.7224,183.9000,-1430.7657 ], look: [  -3110.4875,199.0405,-1431.1081 ]},
    {point: [ -4167.1048,183.9000,-1429.0286  ], look: [ -4112.2026,200.6417,-1429.8249  ]},
    {point: [ -4138.1156,183.9000,-1390.7075  ], look: [  -4137.3861,202.6023,-1441.9284  ]},
    {point: [ -4108.4894,183.9000,-1415.8557  ], look: [ -4156.5446,209.6652,-1414.9961  ]},
    {point: [  -3909.5911,113.0400,-1424.4830 ], look: [  -4075.5800,147.3647,-1413.0407 ]},
    {point: [  -3152.3564,113.0400,-1423.6301  ], look: [ -3314.9349,162.0014,-1417.9361  ]},
    {point: [ -3242.0493,113.0400,-1486.0381  ], look: [ -3307.4011,129.8507,-1485.5182  ]},
    {point: [ -3277.0490,113.0400,-1474.0899  ], look: [ -3277.8427,130.3615,-1508.3334  ]},
    {point: [  -3281.4277,82.9500,-1430.6186  ], look: [   -3279.0189,98.9405,-1476.1214 ]},
    {point: [  -3282.4269,82.9500,-1412.8798 ], look: [   -3280.0181,98.9405,-1458.3826 ]},
    {point: [ -3252.4014,82.9500,-1432.7220  ], look: [ -3297.2439,100.7759,-1434.5639  ]},
    {point: [ -3262.5652,82.9500,-1456.7237  ], look: [ -3264.0242,104.3904,-1416.1921  ]},
    {point: [  -3265.0178,26.3400,-1534.0250  ], look: [  -3263.3924,57.9378,-1473.6076  ]},
    {point: [ -3185.6392,26.3400,-1503.6454  ], look: [  -3287.2599,62.3958,-1494.5302 ]},
    {point: [ -3081.5616,26.3400,-1478.8050  ], look: [ -3183.5829,62.3958,-1480.0285  ]},
    {point: [  -3115.8516,26.3400,-1371.6881], look: [  -3120.9540,54.6362,-1488.0923 ]},
    {point: [ -3128.7205,26.3400,-1251.6074  ], look: [  -3127.5223,55.4236,-1367.9232 ]},
    {point: [ -3218.9751,26.3400,-1295.2585  ], look: [ -3103.6656,57.7776,-1285.6649  ]},
    {point: [ -4040.9130,26.3400,-1312.4404  ], look: [  -3905.7222,58.4234,-1296.5745 ]},
    {point: [ -3992.3026,26.3400,-1212.2468  ], look: [   -3990.9028,59.3433,-1348.1381 ]},
    {point: [ -3989.8721,26.3400,-1127.5646  ], look: [ -3988.4723,59.3433,-1263.4559  ]},
    {point: [ -3917.5002,26.3400,-1157.4915  ], look: [  -4030.1476,59.3433,-1233.5109  ]},
    {point: [ -3455.7429,26.3400,-1002.1062  ], look: [-3568.3904,59.3433,-1078.1257   ]},
    {point: [  -3509.3481,26.3400,-985.1082], look: [  -3504.9303,45.8975,-1103.3226 ]},
    {point: [  -3508.0794,26.3400,-919.2914  ], look: [ -3503.6615,45.8975,-1037.5058  ]},
    {point: [  -3425.5074,26.3400,-1018.3533 ], look: [  -3531.9321,43.9906,-1026.8454 ]},
    {point: [ -3126.6016,26.3400,-1018.8789  ], look: [ -3233.0263,43.9906,-1027.3710  ]},
    {point: [ -3208.3316,26.3400,-946.8076  ], look: [-3220.3680,40.8537,-1037.6499   ]},
    {point: [  -3220.7437,26.3400,-870.4420 ], look: [ -3220.4196,40.8537,-962.0776  ]},
    {point: [  -3177.4201,26.3400,-852.1730 ], look: [  -3179.5748,40.8537,-943.7839 ]},
    {point: [  -3176.8943,68.0900,-844.4335 ], look: [  -3177.6152,75.8089,-893.1634 ]},
    {point: [ -3203.4060,68.0900,-866.5732  ], look: [ -3154.3273,84.0651,-872.3883  ]},
    {point: [  -3541.8771,68.0900,-873.3383 ], look: [  -3492.2221,83.0591,-876.1749 ]},
    {point: [ -3522.1789,68.0900,-923.2306  ], look: [  -3522.7032,81.5888,-864.1761  ]},
    {point: [  -3522.5944,119.0500,-962.7146  ], look: [ -3523.0305,126.4437,-916.0346  ]},
    {point: [   -3496.4163,119.0500,-941.2542], look: [  -3542.6722,128.0178,-937.5331 ]},
    {point: [  -3483.0329,119.0500,-938.2642 ], look: [ -3529.2888,128.0178,-934.5432  ]},
    {point: [   -3511.0254,119.0500,-873.1163 ], look: [  -3509.5821,130.7814,-947.1713  ]},
    {point: [   -3511.5566,119.0500,-844.2718 ], look: [ -3509.8732,132.7329,-930.6460  ]},
    {point: [-3510.2298,149.4600,-840.5621   ], look: [ -3508.5154,165.0584,-893.7631  ]},
    {point: [ -3545.6850,149.4600,-871.5496  ], look: [ -3493.2689,167.5600,-872.7859  ]},
    {point: [ -3521.9695,149.4600,-911.2458  ], look: [-3523.0870,172.0941,-860.6193   ]},
    {point: [ -3522.4208,183.2900,-937.6390  ], look: [  -3523.4668,203.8972,-897.8970 ]},
    {point: [   -3497.4426,183.2900,-920.6696 ], look: [ -3536.8873,204.4331,-922.1751  ]},
    {point: [  -3509.1507,183.2900,-893.9629 ], look: [ -3509.8369,205.4931,-932.8438   ]},
    {point: [  -3511.1270,212.5400,-864.3762 ], look: [ -3510.3821,231.1307,-900.7327  ]},
    {point: [  -3529.9402,212.5400,-876.0427  ], look: [  -3493.7027,231.3762,-876.0969  ]},
    {point: [ -3523.0544,212.5400,-902.0075  ], look: [  -3522.9223,230.6498,-860.5366 ]},
    {point: [ -3522.1965,245.4600,-945.7150  ], look: [   -3523.4277,263.2248,-894.7622 ]},
    {point: [ -3489.1202,245.4600,-919.3347  ], look: [ -3536.4808,264.9304,-922.0032  ]},
    {point: [ -3510.2587,245.4600,-871.5864  ], look: [ -3510.6550,265.5699,-934.7272  ]},
    {point: [  -3510.1640,274.7100,-852.0270  ], look: [ -3510.0465,284.1368,-900.6340  ]},
    {point: [  -3460.5293,274.7100,-875.5748  ], look: [ -3530.2159,285.8014,-882.4820  ]},
    {point: [ -3476.4663,274.7100,-994.7407  ], look: [   -3566.5262,289.0440,-1003.6673 ]},
    {point: [  -2848.8972,274.7100,-987.1292 ], look: [ -2938.9571,289.0440,-996.0557  ]},
    {point: [  -2778.9688,274.7100,-1009.0391 ], look: [ -2869.2372,289.0440,-1015.5263  ]},
    {point: [   -2613.3549,274.7100,-1008.0989 ], look: [  -2703.6233,289.0440,-1014.5861  ]},
    {point: [  -2612.6436,274.7100,-998.4567  ], look: [  -2703.0545,289.0440,-1002.4998  ]},
    {point: [  -1979.9703,274.7100,-989.6594  ], look: [  -2070.3812,289.0440,-993.7025 ]},
    {point: [  -2038.0962,274.7100,-987.9827  ], look: [ -2038.2734,292.9657,-1028.7685  ]},
    {point: [ -2039.0394,245.4600,-963.1807  ], look: [-2039.2430,267.5349,-990.5544   ]},
    {point: [ -2054.5630,245.4600,-975.7618  ], look: [  -2028.4266,268.9831,-975.2932 ]},
    {point: [  -2052.3758,245.4600,-985.3231 ], look: [ -2051.7880,271.0249,-961.1828  ]},
    {point: [ -2050.9816,212.5400,-1033.2356  ], look: [ -2051.2635,241.0616,-1001.0455  ]},
    {point: [  -2034.9586,212.5400,-1022.7957 ], look: [ -2065.3240,233.4610,-1022.8049  ]},
    {point: [  -2040.4889,212.5400,-1010.4153 ], look: [ -2040.7126,237.1798,-1037.8484  ]},
    {point: [  -2039.2131,183.2900,-966.2705 ], look: [  -2038.9624,208.4441,-993.8380 ]},
    {point: [ -2051.4476,183.2900,-976.4601  ], look: [  -2024.9527,209.5419,-975.1878  ]},
    {point: [ -2051.1469,183.2900,-984.3791  ], look: [  -2051.2846,211.7697,-960.2617  ]},
    {point: [  -2052.1249,149.4600,-1037.6833 ], look: [  -2052.7977,178.7221,-1003.0241 ]},
    {point: [  -2030.8661,149.4600,-1024.5609  ], look: [   -2067.0635,176.8045,-1024.4679 ]},
    {point: [   -2038.1420,149.4600,-1009.2459], look: [ -2037.8283,179.6491,-1043.1060  ]},
    {point: [ -2038.2564,119.0500,-948.3205  ], look: [ -2039.3148,141.3180,-992.3420  ]},
    {point: [   -2086.7692,119.0500,-963.9569 ], look: [  -2030.5885,133.6388,-963.2731  ]},
    {point: [ -2132.1093,119.0500,-961.6529  ], look: [   -2045.9032,133.3219,-957.1013 ]},
    {point: [  -2134.0440,119.0500,-877.5698  ], look: [   -2050.8671,134.4883,-855.2278 ]},
    {point: [ -2060.8889,119.0500,-921.9873  ], look: [ -2051.5165,142.8291,-847.2712  ]},
    {point: [  -2051.9171,119.0500,-984.9398 ], look: [ -2052.3024,136.1099,-948.1693  ]},
    {point: [  -2052.1060,104.6600,-993.4512  ], look: [  -2052.2739,117.5436,-980.3974 ]},
    {point: [ -2052.2609,68.0900,-1030.7385  ], look: [ -2052.7670,93.3667,-1007.7855  ]},
    {point: [ -2038.2359,68.0900,-1025.9712  ], look: [  -2069.9422,92.0036,-1022.9621 ]},
    {point: [  -2040.0800,68.0900,-1006.2059 ], look: [  -2039.6206,91.7573,-1030.8160  ]},
    {point: [ -2040.4354,26.3400,-955.8431  ], look: [ -2039.9444,53.2572,-988.6859  ]},
    {point: [   -2051.7786,26.3400,-959.0598 ], look: [  -2009.8436,32.9833,-959.9220 ]},
    {point: [  -2055.3071,26.3400,-879.6698 ], look: [ -2013.3632,32.9833,-879.6811  ]},
    {point: [ -2464.6486,26.3400,-876.3411  ], look: [  -2364.3331,42.2284,-876.3681  ]},
    {point: [ -2402.1061,26.3400,-790.5360  ], look: [ -2397.4388,43.9449,-901.5908  ]},
    {point: [  -2404.9705,26.3400,-719.0481 ], look: [ -2399.7990,45.8468,-842.1006  ]},
]
var roamTimeout, roamPausedPosition, roamType = true, roamIndex, roamPausedType = true,roamGoingType = true ;
export const roamAnimation = (type, speed = 20, td = () => {}) => {
    if(type == 0) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        roamType = true;
        container.orbitCamera.near = 1;
        container.orbitCamera.updateProjectionMatrix();
        roamRoudingType = false;
        container.orbitControls.enablePan = false;
        container.orbitControls.enableRotate = false;
        container.orbitControls.enableZoom = false;
        roamPausedType = true;
        roamGoingType = false;

        tweenMoveView([-2821.6787,259.7700,-3771.5904], [-2821.2358,277.6057,-3658.9814],2000, () => {
            roamTimeout = setTimeout(() => {
                roamMovingView(0, speed, td);
            }, 200);
        })
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
        roamType = true;
    } else if (type == 2 && !roamRoudingType && roamPausedType) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        roamPausedType = false;
        roamGoingType = true;
        roamPausedPosition =  container.orbitCamera.position.clone();
        container.orbitControls.enableRotate = true;
    } else if (type == 3 && !roamRoudingType && roamGoingType) {
        cameraTween && cameraTween.stop();
        orbitTween && orbitTween.stop();
        roamTimeout && clearTimeout(roamTimeout);
        roamGoingType = false;
        roamPausedType = true;
        container.orbitCamera.position.set(roamPausedPosition.x, roamPausedPosition.y, roamPausedPosition.z)
        container.orbitControls.enableRotate = false;
        if(roamType) {
            roamMovingView(roamIndex, speed, td);
        }else {
            roamDotMovingView(roamIndex, speed, td);
        }
    }
}
function roamMovingView(index, speed, td) {
    if(!roampointArrs[index]) {
        roamTimeout = setTimeout(() => {
            roamType = false
            nowMoveView([-2696.1648,236.1500,-3084.8085], [-2697.6892,243.9568,-3134.0754])
            roamDotMovingView(0, speed, td);
        }, 200);
        return false;
    }

    roamIndex = index;
    let oldPoint = container.orbitControls.target.clone();
    let point = new THREE.Vector3(...roampointArrs[index].point);
    let distance = oldPoint.distanceTo(point);
    tweenMoveView(roampointArrs[index].point, roampointArrs[index].look, distance * speed, () => {
        let number = index + 1;
        roamMovingView(number, speed, td);
    })
}
function roamDotMovingView(index, speed, td) {
    if(!roampointDot[index]) {
        td && td();
        return false;
    }

    roamIndex = index;
    let oldPoint = container.orbitControls.target.clone();
    let point = new THREE.Vector3(...roampointDot[index].point);
    let distance = oldPoint.distanceTo(point);
    tweenMoveView(roampointDot[index].point, roampointDot[index].look, distance * speed, () => {
        let number = index + 1;
        roamDotMovingView(number, speed, td);
    })
}