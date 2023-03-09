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

    function _0x22c7() {     const _0x41840b = [         'wsMgp',         'CP-001',         '立磨摄像头M08回料',         '筛分收尘器',         '2327661HONYFt',         'QnKmS',         'lkXRP',         'sky',         '树.glb',         'QYqwp',         '四色图.glb',         'CAlmG',         'gVBEh',         'yktyD',         'NmFdz',         'cHXrf',         '筛分间筛分除尘器',         'HgViO',         'sfxc_001',         '2|10|8|7|0',         'ozOZQ',         'gHiQT',         'EXYgU',         '立磨前仓7B',         'cmmNm',         '氧浓度011',         'RdeWa',         '3|4|0|2|1',         '压缩空气管道',         '1672825616',         '破碎皮带机1',         '水管动画',         'phipJ',         'XULnZ',         '罗茨风机管道',         'CODVq',         '均化间重点区域摄像头',         'uVblk',         '0|2|4|3|1',         'wmoTa',         'mqvvG',         '地面.glb',         '粉尘浓度013',         '立磨间重点区域摄像头',         'CUvia',         '给料汇总皮带M04',         'opacity',         'YgudJ',         'sgJzR',         '00032fd6',         'OzJya',         'FYSKa',         'roughness',         'spHbV',         'XZajD',         'bjoCi',         '粉尘浓度010',         'VXtDy',         'MdBLy',         '筛分间筛分行车',         'cPiyG',         '皮带2',         '000fb72f',         'HGpFK',         'a12773b41a',         '立磨摄像头M04回料',         'nBAqF',         'OxuGp',         '2|0|1|4|3',         'pmgTd',         '立磨摄像头M05皮带',         'AJTIZ',         'kgpTr',         'eFCnc',         'bcJnE',         '1195848uWPzXL',         'gEOGb',         '2|4|1|3|0',         'ols',         'NqOeL',         'pIrjQ',         '氧浓度006',         'EYSyS',         '破碎间',         'TOBlt',         'glpGI',         'zeFun',         'PvrnX',         'BUQjJ',         'hEIGY',         'ajhts',         '堆石LED17石头',         '7|0|12|13|',         'QfDHV',         'cdujG',         '2|4|0|1|3',         'uAygI',         '000cf4c6',         'wJnpI',         '1672044593',         'whpnS',         'DoubleSide',         'oChRI',         '收尘器M0',         '破碎间单缸液压圆锥破',         'WGOkd',         'center',         'aFeTW',         'Pcmlq',         'xIbCO',         '破碎间筛分回料除铁器',         'hezHv',         'gvoUz',         'qetHQ',         '1|5|6|4|3|',         'wWpxG',         '1672044874',         'yELDC',         'Mskwx',         '堆石LED15石头',         'BhQXA',         'kOyyc',         'pCKKE',         '立磨前仓5B',         '立磨移动小车1',         '000f4cb7',         'RdaNK',         '-117',         '堆石LED16石头',         '立磨机主体2_1',         '1672044906',         '立磨胶带机1带透明通',         'AhhpE',         '粉尘浓度002',         'hUiFQ',         '1672044470',         'UvwZn',         '给料皮带秤M01',         '均化摄像头1',         'nKiCd',         '立磨输送机4',         'KhMHg',         'RPMQN',         'CmlkG',         'ZWOnl',         'vgrUJ',         '立磨机本体M0',         '4|1|3|0|2',         '给料皮带秤M07A',         'ZXkzr',         'ETotV',         '破碎胶带机2带透明通',         '1223400pavCSM',         'xxkcF',         'HCOJA',         'ByRaS',         '立磨输送机4A',         'jZSlp',         '破碎仓1',         'ICyIX',         '1672825662',         'psxc_001',         'ssVyl',         '筛分间',         '0|4|3|1|2',         '立磨摄像头P114-',         '000f8fb4',         '3|4|5|1|0|',         'ezdtB',         '3b43c9abcb',         'sJMYW',         'ZEEKt',         '立磨输送机7',         '均化摄像头5',         'MhDUh',         'TFmzm',         'FPLTn',         'nDTSM',         '堆石LED12石头',         'msjgk',         'cSQfv',         '给料皮带秤M04A',         '破碎圆锥破2',         '破碎棒条给料机2',         'bee194c934',         'Ljnul',         'eKLmV',         'PCNxg',         '立磨前仓4A',         'azOzD',         'fcaac0a52d',         '1672825770',         '立磨前仓2B',         'vjhjZ',         '000425f8',         'RbLqL',         '立磨收尘管道',         'nnwdH',         '筛分间振动筛给料皮带',         '000906c1',         '输送管道',         'ACLht',         'mJldy',         '3|2|1|0|4',         '1|4|0|2|3',         'BGlTZ',         '磨前仓M07B',         'jRKFn',         'nvusp',         '粉尘浓度011',         'SkoLy',         'vHeQJ',         'Pwcxm',         'KTKvD',         '破碎鄂式破2',         '堆石LED6石头',         '立磨收尘器1带透明通',         'hPynK',         '1672044939',         'KsnJl',         'NhWbb',         'orMyR',         'zTGUH',         'tBVtS',         'KEvef',         'KgQmX',         'IpCRI',         'wNVvO',         'YXZbi',         'TUZcB',         'Zwsue',         'GzVbV',         'Rtger',         'position',         'snJXe',         'FBPjp',         '磁悬浮风机管道动画',         '堆石LED10石头',         '立磨收尘器6带透明通',         '#00ff18',         '0|11|2|4|1',         '草坪.glb',         'fVRGK',         '2|3|0|5|1|',         'DVFGK',         'whqxC',         'tzdc-3-1',         '筛分行车',         '1672825159',         'traverse',         '磨前仓M07A',         '立磨摄像头M07皮带',         'yitlj',         'bbWWO',         'QRZQW',         'vRYbS',         'Gmuhx',         'gKLgm',         '立磨输送机5',         '均化间.glb',         'adsIE',         'GpDxD',         'bjqyO',         '立磨输送机2',         'pIVwc',         '立磨间.glb',         '堆石场一外墙_1',         'bWzLx',         'LVhnI',         '3|9|15|17|',         'jAvyh',         '通道_2',         'BoPMb',         'IhXZK',         'map',         'aFaAK',         '摄像头',         'OcutX',         'T-101',         'pRHlx',         'PNEmu',         'YP01',         '2|1|4|0|3',         'f543a8a7c7',         'dzDcx',         'BXBsy',         'CPlHc',         'AmNzx',         '道_2',         'Aorzz',         'eiWbV',         'REBKZ',         '堆石厂.glb',         'VOVJT',         'WYtzs',         '2|0|1|3|5|',         'EMqRS',         'LDWHB',         '000ed044',         'NtNQQ',         '立磨密封料仓8',         '筛分皮带机2_2',         '粉尘浓度006',         '1672044743',         'jTCxg',         '破碎间棒条给料机2',         'nkVmt',         'tccUh',         'WhuYx',         '安全疏散',         'P115',         '4693ca0743',         'ahdPD',         'JasQe',         '均化间',         'yjxAm',         '立磨输送机5B',         'ZP01',         'cdfCN',         'iiTai',         'IRamK',         'animation',         'renderOrde',         '1672825567',         '3|1|2|4|0',         'DRcwc',         'yAvIA',         'eBmJM',         'yFGZO',         '粉尘浓度009',         'StKLI',         'MZwec',         'eLYfi',         '立磨摄像头M08皮带',         '立磨输送机2A',         'PSOwD',         'TxMgN',         'JpsKw',         'EBsBP',         'xERfp',         'FAwOf',         '碎石小车体1_2',         'nsBZl',         'LLzch',         'HxiOj',         'MybGc',         'yYgNZ',         'WJWMZ',         'xYSHG',         'FIINN',         '000ad947',         'Cuzhr',         '1|0|4|2|3',         'HwWfW',         'vUcWK',         '密相泵M0',         '立磨前仓7A',         '立磨输送机6_2',         'paused',         'lWZtl',         'TRxAh',         'tzdc-3-2',         '筛分皮带机1_2',         'GBgjE',         'qFRbT',         'TgzTg',         'vsTzF',         'wiLrI',         'weaTw',         'NIXRV',         'sJqAd',         'MOFbx',         'ogbbc',         '立磨巡检机器人',         '0|2',         '立磨间',         '立磨提升机M0',         '1|2|4|3|0',         'gBtij',         'dkrFo',         'pYYVh',         'LoOgd',         '立磨收尘器5带透明通',         '1668403549',         '碎石到筛分胶带机2带',         'tWdhU',         '1668402506',         'FLHdu',         '5|16|2|11|',         '铁器1',         'MFFwT',         'JlWYc',         'UpOVY',         'IgnLi',         '6|5|3',         '2|3|1|4|0',         'SPEBM',         'nlYng',         'ehCab',         '破碎皮带机2',         'vfkeO',         '1667871699',         'clKOy',         'ZTlbF',         'PSGIQ',         'gFhMO',         'cHrUl',         '碎石楼下胶带机1带透',         '00039a6f',         'LzETL',         '1|0|2|4|3',         '筛分皮带机1',         '立磨摄像头M07回料',         '粉尘浓度014',         'pTnEr',         'Vocbh',         'Dwckz',         '破碎间振动筛返料皮带',         '破碎楼上皮带机1',         '碎石除铁器2',         'cCgTg',         '堆石LED7石头',         'OlALS',         'YP02',         'FAaXr',         '立磨前仓4B',         'tzdc-3-5',         'ztlHe',         'enoKY',         'tzdc-4-15',         '立磨电机5',         '#ffffff',         'nMacU',         '立磨摄像头M02皮带',         'fXEDC',         'Rrgak',         '000c51b7',         '5|9|1|7|6|',         'VIolh',         'WIlwP',         'Mskfr',         '立磨胶带机3带透明通',         '0|2|3|1|4',         '立磨电机7',         '破碎楼上皮带机2_2',         '堆石LED11石头',         '0007e409',         '立磨输送机6',         '破碎间破碎除尘器',         'iWfhJ',         'RqCwf',         'wCeOu',         'DvJSc',         '4|2|0|1|3',         'lMAlB',         'OqjFb',         '立磨输送机4B',         '2|3|4|1|0',         'jCRxt',         'NOVzG',         '274194a9c6',         'MdCnn',         'gHrWH',         'AmJux',         'uuJur',         '立磨输送机5_2',         'JbncT',         '4|3|2|0|1',         'EDQkW',         '给料汇总皮带M05',         'T-108',         'FSbQi',         'dEwyE',         '氧浓度009',         'cATsr',         'ZP02',         'iTfgx',         '5|0|4|3|2|',         '1|4|0|3|5|',         '-116',         '立磨机主体8_1',         '0|5|1|3|2|',         '给料汇总皮带M02',         '4|0|2|3|1',         'VvVuB',         'yTxnl',         'PfwbC',         'ujjkf',         'lookAt',         'GLMcb',         'OeGHR',         'qFCUl',         'needsUpdat',         'ZSopT',         'XwpMw',         'lxAcS',         'XvJNj',         'mElTc',         'rYUZh',         '2|4|0|3|1',         '破碎收尘器',         'tzdc-4-9',         'XmyvV',         'xAdTr',         'gSFOM',         'zTNzn',         '碎石配料间外墙带透明',         'UCIef',         'ihmvu',         'ylLzP',         '24gHJccV',         '3|1|0|4|2',         '筛分间双层振动筛1',         '排气管道',         'P-107',         'eWcFX',         '道_1',         'BlVVV',         '立磨胶带机4带透明通',         'luJTL',         '磨前仓M02B',         'vzHqi',         '3|2|0|1|4',         'bgyuY',         'uxVqT',         'CvvqG',         'BOfhw',         'dTviE',         '00039ffd',         'sssYt',         'aa73ef5794',         '0005c842',         'jXQhN',         'ruqzR',         '3|0|4|2|1',         '破碎楼上皮带机1_2',         '立磨输送机1_2',         'DTnPv',         'LJUxS',         'NzteS',         'nBOkc',         '碎机1',         'hMHYZ',         '4|3|1|2|5|',         '立磨发送罐3',         'nISRx',         '9b4e69a6ee',         'szVEX',         'kbCet',         'ZLURA',         '3|0|5|2|1|',         '0|3|1|2|4',         'iffCe',         'PlaneGeome',         'MoieR',         'DAntX',         'STylf',         'e944e876fe',         'focusContr',         'wIRcH',         'JGgmP',         '4|0|2|1|3',         'RhvqX',         'ckrVq',         'oEGCA',         '立磨发送罐5',         'cxSUf',         'P-101',         'ccpeT',         'DloVB',         'P-108',         'oNkmp',         'wYOsD',         'XsRyD',         '碎石配料间',         '巡检机器人',         '立磨前仓6B',         '00077ff6',         '000efd5c',         'userData',         '立磨密封料仓7',         'McXCa',         '0|4|2|3|1',         'oQJxM',         'BtTEo',         'tnioU',         'lCWWA',         '立磨发送罐8',         '立磨输送机7A',         'OJYDP',         '立磨机主体7_1',         'TVShy',         'HvlrW',         'QCpgj',         '00069b09',         '000090d6',         '#FF7A5A',         'UnDmb',         'Cxzsn',         'hoiGX',         'a80b73009a',         'CJ-FZ-002',         'knGPy',         'zctVq',         'uDfAq',         'fetfH',         '000cf96b',         '给料汇总皮带M07',         'zohHb',         'ae5ad0d60f',         'YlHmc',         'PXjWc',         'PZYFL',         'DXPsr',         'oeeKb',         '立磨风机管道',         'jnLDe',         'xyhKA',         'CJ-JZTLJ_2',         '立磨电机6',         'JVRuW',         'SuNYy',         'depthTest',         'ff4f97b09a',         '粉尘浓度003',         '000a56b4',         'JCElq',         'faWrn',         'lGUiq',         'kkKFa',         'GoDhO',         'uFgxB',         'NNMrs',         'xIfjJ',         'RexGC',         '筛分胶带机2带透明通',         '3|4|0|1|2',         '1|3|4|2|0',         '堆石厂',         '破碎间破碎料皮带1',         'pxmcl',         'CP-002',         'YRiCd',         '1667871736',         'tzdc-4-10',         'jLjAU',         '筛分胶带机1带透明通',         'MWOeW',         'LpBDF',         'RTrvZ',         'IpmcL',         '碎石楼上胶带机1带透',         '堆石LED1石头',         '破碎间破碎行车',         'acyHC',         'jvZvU',         '3|2|1|4|5|',         'uVDSD',         'indexOpaci',         '立磨巡检机器人.gl',         '堆石LED2石头',         'uxspJ',         'nnesO',         '堆石LED14石头',         'eRDnl',         'MFlnE',         'RFYSU',         'WIBKC',         'iFdOn',         'MeshBasicM',         'GwnEa',         'HdEkT',         'iPUuE',         'ckNic',         '筛分机2',         '堆石LED4石头',         '立磨收尘器7带透明通',         'eEWyd',         '立磨提升机3',         'FEelg',         'Izfoe',         'LODET',         'oibUl',         '车/车.gltf',         '均化摄像头',         '12582272pXySDm',         'dxBSR',         'jbXPR',         '粉尘浓度012',         'ClfpX',         'OnLDp',         '粉尘浓度005',         'Uthpn',         'rKpSL',         '碎石除铁器1',         'try',         'UTswW',         'TOOYX',         'jJOeO',         'RQKCO',         '000b80b8',         'zZyka',         '000df6f2',         'YIDONG-002',         '立磨密封料仓6',         '立磨提升机6',         '氧浓度001',         '磨前仓M04A',         'ZgxOv',         '0002d46d',         'uDwlF',         '报警.glb',         'RGnpi',         '破碎间颚式破碎机2',         'LsTdc',         '明通道_2',         'SC-002',         '筛分间振动筛集料皮带',         '立磨机',         'WVWyJ',         'pQfxj',         'P117',         '000692b7',         '2|0|5|1|4|',         'RFizC',         'PqPEa',         '破碎仓2',         'cDssG',         'LQhrN',         'cpSMb',         '氧浓度008',         'coOVi',         'uEEaY',         'IjbIw',         '4|14|6|8|1',         'zdkrw',         'KUZzO',         'siDmh',         'aGgUB',         'set',         'clickObjec',         'F-104',         'BZRKt',         '碎石配料间.glb',         'forEach',         '3634500vJNtjL',         '3c4737a392',         'P-105',         'DQxZT',         'BYuQP',         'BLVvw',         'ZngkH',         '筛分间.glb',         'eGgPY',         '1|2|0|4|3',         '碎石输送机_4',         'GAFsH',         'orzJE',         'rqHTp',         '给料皮带秤M06B',         'cukvK',         'Ahnnu',         '立磨摄像头M01回料',         '立磨机主体5_1',         'lNmQT',         '2|3|5|4|0|',         '立磨提升机7',         'oiMWj',         '立磨行车1_1',         'MQspC',         '立磨输送机6A',         '筛分机1',         'lockID',         '立磨输送机1',         'Vpfzf',         'wUOTP',         '2|0|3|1|4',         'GKYXh',         'FWqTm',         'LNeKc',         'DMPUB',         'EBgzC',         'tzdc-3-7',         'Xirny',         'jXvZE',         'LeIfB',         'OaCmN',         'KHjbh',         '氧浓度005',         '立磨摄像头M01皮带',         'GNhxz',         '立磨摄像头M02回料',         '立磨电机2',         'NJXzc',         '堆石LED13石头',         '立磨输送机4_2',         '给料皮带秤M02A',         'GnKIp',         'QTdmI',         '立磨电机4',         'wQQqR',         'LZnGx',         '磨前仓M06A',         'WXIUn',         'iUxDO',         'isVek',         'vpcat',         'hbhQb',         '粉尘浓度008',         'NrCEt',         'IrQZM',         'KPtHk',         'ELKJz',         '1668403339',         '破碎间圆锥破中间仓2',         'LiZvu',         '0|2|4|1|3',         'material',         '立磨收尘器3带透明通',         '4e4e1482af',         '氧浓度010',         '立磨摄像头M05回料',         'vLpsA',         'LFure',         '铁器2',         'clone',         '均化摄像头2',         '压缩空气管道动画',         '立磨前仓8',         'BoxGeometr',         '给料皮带秤M05A',         'rdSWp',         'RPcCO',         'Rcevb',         'PgFSk',         '立磨输送机6B',         'vSeou',         '3|5|0|2|1|',         'tzdc-4-13',         'zGYpi',         'NGGWJ',         '立磨密封料仓4',         'qUSVG',         'Ebnsu',         'gQRzA',         '立磨输送机7_2',         'aterial',         'pWgEV',         '00026a96',         'dJJqb',         'lWUYt',         'twWBp',         'ixclG',         'UDosD',         'nWAVW',         'Container',         'PRhev',         '堆石LED5石头',         '氧浓度点击事件',         '立磨摄像头物体',         'JYhGF',         'mixerActio',         '立磨密封料仓1',         'XhSQO',         '0|12|8|3|1',         'tzdc-3-8',         '立磨摄像头',         '密封料仓M0',         'oetut',         '透明通道_2',         '立磨电机3',         '破碎胶带机1带透明通',         'NgIPP',         '1|2|5|4|3|',         'pFmqV',         'YuyLc',         'WFSnr',         '均化间外墙_1',         'hUWlm',         'wNzVP',         'VrvdR',         '立磨收尘器2带透明通',         'gOHRc',         '氧浓度004',         'JzfXM',         '粉尘浓度016',         'NqKNN',         'ZoBTF',         'uOFbH',         'kXBXf',         '立磨前仓3',         'fBOWw',         '1672044628',         '1672044802',         'iQUei',         'LUkWI',         'OahGH',         'sfIMl',         '皮带1',         '立磨移动小车2',         '立磨前仓1',         'YvNUt',         'ibdBG',         '1|3|0|4|2',         'xQAXn',         '给料皮带秤M03',         '3|4|2|1|0',         'abeeM',         '堆石LED8石头',         '立磨小车体1_2',         'edbyu',         'F-102',         '立磨间巡检机器人点击',         '碎石配料间破碎出料除',         'hgXXi',         'kEhOT',         '筛分皮带机2',         'tSNzU',         'AMIzQ',         'rGwhn',         '氮气管道动画',         'Cobrw',         'P117-2',         '给料汇总皮带M06',         'lvrOT',         '立磨前仓6A',         'RWFKa',         'RJZnJ',         'AxpHD',         'SEDVJ',         '立磨提升机5',         'CJ-FZ-001',         '氧浓度003',         '1668403550',         '10.12.108.',         '73549ad78f',         '00044875',         '磨前仓M05A',         'QIsgL',         'PczGX',         'addBloom',         '产线外房间',         '4|2|1|3|0',         'CJ-BJJ_2',         '立磨摄像头M03回料',         '氮气管道',         'cUSEa',         'poUUJ',         'yTono',         '000c9946',         'avvZV',         'bwIZA',         'scale',         '3|4|1|0|2',         '风机M0',         'TcBDq',         'zHwXy',         'lqoLt',         'focusCamer',         '磨前仓M03',         '粉尘浓度点击事件',         'kyZvP',         'robotTopPl',         '0|4|1|3|2',         'yBYRg',         '管道桥',         'Yeycs',         '磨前仓M01',         '氧浓度014',         'HHWer',         'kYweS',         'receiveSha',         '4|3|0|2|1',         'RHwGD',         '5|4|2|3|1|',         'F-101',         'tkLdE',         'WDOJV',         '立磨密封料仓2',         'HTOWM',         'uiUHm',         'kcsML',         '3|2|4|0|1',         '破碎楼上皮带机2',         'CDiQR',         '1672044671',         'bvGQT',         'OUGHr',         'eOfcE',         '立磨摄像头M04皮带',         'mwgVF',         'PDRGA',         'dtWWZ',         'iSUtC',         'MyFuf',         'DfIDz',         'tzdc-4-11',         'bhUBG',         'YwazG',         '破碎鄂式破1',         'wsbuK',         'RxACX',         'QEMtw',         'ONZEO',         '3d/models/',         '立磨前仓2A',         '氧浓度002',         'VPLfT',         'JKYMl',         'F-103',         'ICaim',         '2708598OfxNgD',         'yvYoe',         'cfadt',         'xwxOa',         'asJJG',         '立磨行车',         '均化摄像头3',         'eWSSz',         'jtSmk',         'yOJyx',         'OQkwx',         '氧浓度015',         '立磨输送机2_2',         'CJ-DSC-002',         'boDQA',         '0|2|7|4|1|',         'metalness',         '0002553e',         'Kjkjm',         'JmDMg',         'iYfcJ',         '立磨前仓5A',         '碎石移小车体2_2',         'ToVbO',         '000f0cac',         'gExxL',         'efErr',         'LMVTA',         'xTRyw',         'AkuCa',         'lknlN',         'push',         '立磨输送机8_2',         'HdCOG',         'SC-001',         '3|5|1|2|0|',         'uyrKG',         'qmCnX',         'TiqEW',         'ufPaY',         '7qOUGkR',         'zgKhW',         'mOwJd',         'BYIjY',         'lRBIu',         '立磨发送罐1',         'fNnyB',         'ScCHE',         'lmUWU',         'orbit',         'zyjUq',         '000ecb01',         'split',         'EtkcZ',         '立磨输送机3',         'ErRjM',         '1|0|2|4|5|',         'ixeaE',         'AsWLd',         '0|5|4|1|2|',         '36fd26f851',         'wqExp',         'LaiBQ',         '安全疏散.glb',         '立磨提升机1',         '3d/7.hdr',         'sKxlk',         '1672044706',         'DEjAQ',         'qPqsD',         'sVcwd',         'cWNCm',         'aNrbs',         'parent',         'TPAwu',         '00043b38',         'wcohg',         'ZKMnH',         '立磨发送罐4',         'PHSpS',         'XStHt',         '立磨摄像头M06回料',         'yIMtB',         '0006b413',         '0b050538a3',         '输送管道动画',         '产线外房间.glb',         '|4|3|9|5|6',         'usmMQ',         'type',         'ZAiIn',         'xgwtH',         'nfqiv',         '堆石LED3石头',         'towWJ',         'QAVWi',         '均化摄像头6',         'CIisa',         '破碎间颚式破碎机1',         'PZAPk',         'GVSMT',         'BHxEF',         '粉尘浓度004',         'visible',         'PnQqw',         '立磨密封料仓3',         '碎石到筛分胶带机1带',         'thmDl',         'oGEOe',         '明通道_4',         'P117-1',         '15955DXcaOQ',         'vyjmq',         '000c039d',         'SP01',         'zuQSC',         'castShadow',         '4|1|2|0|3',         'ItZew',         'YIDONG-001',         'xAXtn',         'SVNJT',         'pPNNy',         '网格017_1',         '1672044840',         'CYCtL',         'vUQLy',         '立磨电机1',         'GZRIK',         'EWgyO',         'DjzXA',         '给料皮带秤M05B',         'cTZiR',         'ToXCM',         '立磨机主体6_1',         '立磨摄像头P116-',         'lpaJY',         'SuzNw',         'b0aa4c4cdb',         'IJjEJ',         '1|3|4|0|2',         'ZyvAe',         'mwcZk',         'WdNNK',         'oTOYN',         'xoHZg',         'Wtcnj',         '4|2|3|0|1',         'JH-SCG-',         '立磨提升机4',         '给料皮带秤M04B',         'LnnJb',         '磨前仓M06B',         '管道.glb',         '4|2|3|0|1|',         'bzbOg',         'windowResi',         'AkwDZ',         'aWPiV',         '1|4|3|2|0',         'uPVDA',         '0|1|2|4|3',         '筛分间双层振动筛2',         'CFaez',         '2|0|4|3|1',         'RKWMQ',         'povDK',         '氧浓度013',         'OfdAL',         'GPlMe',         '000648b1',         'HsNAe',         'Mesh',         'lDtPS',         'EP01',         'tzdc-4-14',         'Group',         '破碎间可移动皮带2',         '粉尘浓度007',         'ZBiPc',         '立磨输送机8',         'xNXnl',         'oxHeL',         'pbRvy',         '33e22d6c78',         '罗茨风机管道动画',         'tzdc-4-12',         'RHiWx',         '粉尘浓度015',         'cjcFt',         'xunjianPla',         'RjEEX',         'IVJVA',         'transType',         'FzFOh',         'wsJNI',         'YnTjs',         'JPYmy',         '2|0|1|3|4',         'fKICR',         'oHDkn',         'tZeHq',         'tzdc-3-6',         'bpMmV',         'xGGkt',         'LvPLJ',         'VkCxG',         '2|5|3|0|1|',         'Xqwvu',         'HrGMw',         'SzvyD',         'urBUq',         'PQXld',         'BzYIL',         'qgbyE',         'nsIxE',         'xVvyS',         '立磨收尘器8带透明通',         'lIKfw',         'WlRzD',         'LGkAn',         'FcyTH',         'KAnsj',         'aLQUy',         'VKIdv',         'ieUcL',         'LqXcJ',         'slice',         'P-102',         'HsXen',         '破碎间外墙带透明通道',         'nXGVo',         'vVAMp',         '立磨机主体4_1',         'rmrqU',         'P-106',         'sbaRc',         '立磨胶带机2带透明通',         'GaOrf',         'aVxqP',         '粉尘浓度001',         '破碎圆锥破1',         'MkXvI',         'ETNOQ',         'uPQpW',         'dscqs',         'tgkYN',         '00076e48',         'QXiHr',         '磨前仓M04B',         'xWkPN',         'Vector2',         'bCJis',         '氧浓度012',         'vIdbx',         '破碎间圆锥破中间仓1',         'ZVbAM',         '1672825280',         'pbvlO',         '碎石配料间振动筛出料',         'ZEBTc',         'viTSH',         '0|1',         'XJXnz',         'XjLoF',         'pdjuD',         'SGTDZ',         'wOyuw',         '破碎除铁器1',         '破碎皮带机2_2',         '3d/8.jpg',         'uspdK',         'includes',         'OPnhC',         'SP02',         '破碎皮带机1_2',         '给料皮带秤M07B',         'bjoPT',         'HKOdz',         'IjyZv',         'HDxKN',         '4|2|1|0|3',         '立磨行车2_1',         '立磨间外墙带透明通道',         'GytgM',         '透明通道',         'kSKhj',         'T-102',         'JBMYk',         'NuJHf',         '立磨提升机2',         'mTMvr',         'mvHLa',         '破碎除铁器2',         'hNMYz',         '破碎间棒条给料机1',         '立磨输送机5A',         'T-107',         'iwBUp',         'vctBi',         'cKMzp',         '4|5|1|2|0|',         'easra',         'b7c4a56d1f',         'iBNOs',         'uoigc',         'JPmFZ',         'WVbui',         'EKUDS',         'tzdc-3-4',         'ExkYD',         'tzdc-4-17',         'DoFHs',         '磨前仓M08',         'mjxOO',         'DhllV',         'Upyef',         '立磨输送机7B',         'KBwie',         'jinGN',         'ruECg',         'bzPIy',         'KgyTJ',         'EP02',         'KRDrs',         '4|5|1|0|3|',         '立磨输送机3_2',         '磁悬浮风机管道',         'WSyTT',         '3|4|2|0|1',         'LORNn',         'gksaW',         '立磨输送机2B',         '立磨摄像头M03皮带',         'TSMsH',         '4|3|2|1|0',         'kzsmn',         'HVPVQ',         '3|0|1|4|2',         'IoyBC',         'vstXR',         'lOzsO',         'vwjIH',         'LrIMs',         'VQlIV',         '0|1|3|2|4',         '均化摄像头4',         '立磨发送罐7',         'tzdc-4-16',         '磨前仓M02A',         'tZHYe',         'BHlPP',         'XEiSG',         'BlFRL',         'attach',         'cWoBk',         'IxxMd',         'tToVb',         '碎机2',         '给料皮带秤M06A',         'BKdUN',         'neRobotLim',         'eMXDf',         'BUNmK',         '立磨摄像头M06皮带',         'LapxY',         'DGjMN',         'stWhF',         'UPAfq',         '给料皮带秤M08',         '一般风险区域',         'Object3D',         'rvlfJ',         'CxoWg',         '给料皮带秤M02B',         '立磨提升机8',         'P-104',         'uUpuw',         'NiDnD',         '0007f861',         'isMesh',         'TXQHK',         'Hvxho',         '破碎棒条给料机1',         'aneText',         'ilRuf',         'add',         '立磨小车体2_2',         'lJrTW',         '地面分层.gltf',         'rotation',         'ndxoC',         'UqvxP',         'LfptQ',         'unNZh',         '立磨机主体3_1',         'tzdc-3-3',         '破碎间.glb',         '均化间外墙_2',         'XMNIo',         'kfNNq',         'pdXGm',         'LWpxK',         'qEJdU',         '0|1|4|3|2',         'dAjQg',         'lrXlX',         '管道动画',         '立磨发送罐6',         'XBgGi',         '4|0|3|2|1|',         '地面分层',         '破碎间可移动皮带1',         'NBBeR',         '立磨密封料仓5',         '碎石楼上胶带机2带透',         'MMjhY',         '堆石LED9石头',         '000eef89',         'bqyde',         '1672889351',         '破碎行车',         'gEGag',         'VNgpf',         'EkbYQ',         'CRAYC',         '磨前仓M05B',         'ipznf',         'gjbgq',         'LLZnI',         'FPTKf',         'ZYjDP',         '1|3|4|0|5|',         'LdKDO',         'dow',         'CKmJq',         'qFtiG',         '2|3|0|1|4',         'UVFyY',         '碎石楼下胶带机2带透',         'BRRmT',         'DfAnG',         'dEqRO',         'zjDJk',         '0004a1cb',         'zobzX',         'name',         'kgmWo',         'EUCzG',         '立磨机主体1_1',         'envMap',         'OXHWn',         'SiXjH',         'JkelS',         '立磨收尘器4带透明通',         'transparen',         'PFiLD',         '移动卸料小车胶带机P',         '立磨发送罐2',         '四色图',         'nGJUf',         'eXssP',         '立磨电机8',         '破碎间破碎料皮带2',         'mdKEJ',         'P-103',         'DQwdl',         '氧浓度007',         'WsMZP',         'zuSjo',         'DIDXz',         'EzIYO',         'sdNBp',         'VxlgW',         'xFCmn',         'mPYYe',         '观察孔'     ];     _0x22c7 = function () {         return _0x41840b;     };     return _0x22c7(); } function _0x5508(_0x3f3c36, _0x402177) {     const _0x5dcd21 = _0x22c7();     return _0x5508 = function (_0x48bd73, _0x687711) {         _0x48bd73 = _0x48bd73 - (0x1ba9 + 0x1 * -0x523 + -0x14f3);         let _0x452d31 = _0x5dcd21[_0x48bd73];         return _0x452d31;     }, _0x5508(_0x3f3c36, _0x402177); } const _0xc3d9ba = _0x5508; (function (_0x4fb1ed, _0x2a127c) {     const _0x3dbdef = _0x5508, _0x5c742f = _0x4fb1ed();     while (!![]) {         try {             const _0x5387bb = -parseInt(_0x3dbdef(0x48a)) / (0x22f9 + -0x6b * 0x55 + -0xd * -0xb) * (parseInt(_0x3dbdef(0x226)) / (0x18fd + -0xac4 + -0xe37)) + -parseInt(_0x3dbdef(0x41b)) / (0x236e + -0x7da + -0x1b91 * 0x1) + -parseInt(_0x3dbdef(0x643)) / (-0x1 * 0x2345 + -0x1 * -0x1de1 + 0x568) + -parseInt(_0x3dbdef(0x690)) / (0x13 * 0x1 + -0x5f8 * 0x1 + -0x1 * -0x5ea) + parseInt(_0x3dbdef(0x311)) / (0x1447 + -0x1 * 0x59d + 0x752 * -0x2) + -parseInt(_0x3dbdef(0x443)) / (-0x26bd + -0x107b * -0x1 + 0x1649) * (-parseInt(_0x3dbdef(0x2d5)) / (-0x42d * -0x1 + 0xba * 0x12 + 0x1139 * -0x1)) + parseInt(_0x3dbdef(0x5fc)) / (-0xeb * 0xf + -0x4 * 0x423 + 0x1e5a);             if (_0x5387bb === _0x2a127c)                 break;             else                 _0x5c742f['push'](_0x5c742f['shift']());         } catch (_0x1c74de) {             _0x5c742f['push'](_0x5c742f['shift']());         }     } }(_0x22c7, 0x6fc5 + 0x12 * 0x8b81 + 0x1f304), container = new THREE[(_0xc3d9ba(0x37f))]({     'publicPath': baseUrl,     'container': domElement,     'viewState': _0xc3d9ba(0x44c),     'bgColor': 0x0,     'cameras': {         'orbitCamera': {             'position': [                 -(-0x9c5 * 0x2 + -0x41b + 0x1 * 0x1c71),                 -0x3 * -0x434 + 0x1 * -0x18fd + 0xf5e,                 -0x2 * -0xda9 + 0x4a * -0x7a + 0x86a             ],             'near': 0xa,             'far': 0x186a0,             'fov': 0x3c         }     },     'controls': {         'orbitControls': {             'autoRotate': ![],             'autoRotateSpeed': 0x1,             'target': [                 -(0x2459 + -0x1233 + -0x5fc * 0x1),                 0x2089 * 0x1 + -0xd3a * 0x1 + 0x7 * -0x2bd,                 -(-0xbb5 * 0x3 + 0x26f3 + -0x85 * -0xa)             ],             'minDistance': 0x0,             'maxDistance': 0x1388,             'maxPolarAngle': Math['PI'] * (0x21c1 + -0x5e + -0x2163 + 0.45),             'enableDamping': ![],             'dampingFactor': 0.05         }     },     'lights': {         'sunLight': {             'color': 0xedeacc,             'intensity': 0x1,             'position': [                 0x17bc + -0xdb9 + -0x233 * 0x1 + 0.2999999999999545,                 0x236 + -0x2a46 + 0x3 * 0x1678,                 -0x270f + -0x2d * 0x62 + 0x47e9 + 0.1999999999998181             ],             'mapSize': [                 -0x2c * -0x9 + 0x7a5 * -0x4 + -0x2d08 * -0x1,                 0x3 * 0x7ca + 0x3 * 0xbf1 + -0x2b31             ],             'near': 0x14,             'far': 0x3a98,             'bias': -(-0xd75 + -0x1992 + 0x1 * 0x2707 + 0.00017),             'distance': 0x1f40         },         'ambientLight': {             'color': 0xffffff,             'intensity': 0.05         }     },     'nodePass': {         'hue': 0x0,         'sataturation': 1.75,         'vibrance': 0x0,         'brightness': 0x0,         'contrast': 0x1     },     'skyBox': {         'urls': [_0xc3d9ba(0x529)],         'scale': 0x1,         'rotation': [             -0x38 + -0x928 + 0x960,             -0x27 * 0x52 + -0x131c * 0x1 + 0xfcd * 0x2,             -0x7c1 + 0xb34 * -0x3 + 0x1 * 0x295d         ]     },     'modelUrls': [         _0xc3d9ba(0x414) + _0xc3d9ba(0x2d3),         _0xc3d9ba(0x414) + _0xc3d9ba(0x45a),         _0xc3d9ba(0x414) + _0xc3d9ba(0x2ef),         _0xc3d9ba(0x414) + _0xc3d9ba(0x6e9),         _0xc3d9ba(0x414) + _0xc3d9ba(0x621),         _0xc3d9ba(0x414) + _0xc3d9ba(0x471),         _0xc3d9ba(0x414) + _0xc3d9ba(0x5a0),         _0xc3d9ba(0x414) + _0xc3d9ba(0x600),         _0xc3d9ba(0x414) + _0xc3d9ba(0x602),         _0xc3d9ba(0x414) + _0xc3d9ba(0x2bb) + 'b',         _0xc3d9ba(0x414) + _0xc3d9ba(0x4b4),         _0xc3d9ba(0x414) + _0xc3d9ba(0x71c),         _0xc3d9ba(0x414) + _0xc3d9ba(0x6fb),         _0xc3d9ba(0x414) + _0xc3d9ba(0x701),         _0xc3d9ba(0x414) + _0xc3d9ba(0x5a8),         _0xc3d9ba(0x414) + _0xc3d9ba(0x318),         _0xc3d9ba(0x414) + _0xc3d9ba(0x30f)     ],     'outline': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0xc3d9ba(0x27c),         'hiddenEdgeColor': _0xc3d9ba(0x27c)     },     'outline_1': {         'edgeStrength': 0x5,         'edgeGlow': 0x0,         'edgeThickness': 0x1,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0xc3d9ba(0x6e7),         'hiddenEdgeColor': _0xc3d9ba(0x6e7)     },     'outline_2': {         'edgeStrength': 0x5,         'edgeGlow': 0.5,         'edgeThickness': 0.5,         'pulsePeriod': 2.5,         'visibleEdgeColor': _0xc3d9ba(0x1d7),         'hiddenEdgeColor': _0xc3d9ba(0x1d7)     },     'bloomEnabled': !![],     'bloom': {         'bloomStrength': 0x1,         'threshold': 0x0,         'bloomRadius': 0x0     },     'enableShadow': !![],     'hdrUrls': [_0xc3d9ba(0x45c)],     'toneMappingExposure': 0x1,     'antiShake': ![],     'bounds': {         'radius': 0x186a0,         'center': [             0x132 * 0x17 + 0x1 * -0xeff + -0x7 * 0x1c9,             -0x6c * -0x25 + -0x200c + 0x838 * 0x2,             -0x181 + -0x31 * 0x83 + -0x46e * -0x6         ]     },     'fog': {         'color': 0x52636e,         'intensity': 0x0     },     'stats': ![],     'onProgress': _0x181e61 => {         const _0x58451b = _0xc3d9ba, _0x12ee1a = {                 'eFCnc': function (_0x37f880, _0x3831d0) {                     return _0x37f880 == _0x3831d0;                 },                 'uxVqT': _0x58451b(0x614),                 'WYtzs': _0x58451b(0x6c0),                 'Ljnul': _0x58451b(0x61a),                 'ScCHE': _0x58451b(0x3d9),                 'sdNBp': function (_0x5194a5, _0x6b243a) {                     return _0x5194a5 == _0x6b243a;                 },                 'REBKZ': _0x58451b(0x562),                 'fetfH': _0x58451b(0x3ed),                 'uEEaY': _0x58451b(0x229),                 'WVWyJ': function (_0x6eab0, _0x4587f3) {                     return _0x6eab0 == _0x4587f3;                 },                 'HsNAe': _0x58451b(0x6e4),                 'CxoWg': _0x58451b(0x470),                 'kbCet': _0x58451b(0x4d4),                 'nXGVo': _0x58451b(0x363),                 'edbyu': _0x58451b(0x617),                 'Rcevb': _0x58451b(0x3c0),                 'BHxEF': _0x58451b(0x58e),                 'gksaW': function (_0x195eff, _0x101e73) {                     return _0x195eff == _0x101e73;                 },                 'AmJux': _0x58451b(0x5b2),                 'uVblk': function (_0x57af90, _0x40e8ca) {                     return _0x57af90 == _0x40e8ca;                 },                 'wJnpI': _0x58451b(0x19d),                 'Vpfzf': function (_0x3e7500, _0x4fcfc2) {                     return _0x3e7500 + _0x4fcfc2;                 },                 'fBOWw': _0x58451b(0x75b),                 'hezHv': _0x58451b(0x3e8),                 'cWNCm': _0x58451b(0x382),                 'PZYFL': _0x58451b(0x2a7),                 'wUOTP': _0x58451b(0x1c9) + '1',                 'OnLDp': _0x58451b(0x1c9) + '2',                 'fXEDC': _0x58451b(0x666) + '1',                 'MdCnn': _0x58451b(0x2b5),                 'ieUcL': _0x58451b(0x2f5) + '2',                 'ZKMnH': _0x58451b(0x608),                 'UVFyY': _0x58451b(0x633),                 'acyHC': _0x58451b(0x3b9) + _0x58451b(0x360),                 'ZyvAe': _0x58451b(0x47d),                 'AMIzQ': _0x58451b(0x660) + _0x58451b(0x245),                 'ACLht': function (_0x27a33e, _0x23ab07) {                     return _0x27a33e + _0x23ab07;                 },                 'IrQZM': _0x58451b(0x1a0),                 'LdKDO': _0x58451b(0x259),                 'TOBlt': function (_0x5691c2, _0x4b1d87) {                     return _0x5691c2 == _0x4b1d87;                 },                 'JkelS': _0x58451b(0x32d),                 'XvJNj': _0x58451b(0x681),                 'wsMgp': _0x58451b(0x4cf),                 'BtTEo': _0x58451b(0x58c),                 'rqHTp': function (_0xce96b8, _0x2fd73d) {                     return _0xce96b8 == _0x2fd73d;                 },                 'jZSlp': _0x58451b(0x451),                 'CAlmG': _0x58451b(0x3b1),                 'XZajD': _0x58451b(0x240),                 'OUGHr': _0x58451b(0x561),                 'VxlgW': _0x58451b(0x43b),                 'pmgTd': _0x58451b(0x66a) + _0x58451b(0x19e),                 'ozOZQ': function (_0x464ded, _0x34e4fc) {                     return _0x464ded == _0x34e4fc;                 },                 'Gmuhx': _0x58451b(0x6a4),                 'gOHRc': _0x58451b(0x287),                 'WlRzD': _0x58451b(0x427),                 'MQspC': _0x58451b(0x343),                 'sJMYW': function (_0xca048c, _0x36fe00) {                     return _0xca048c == _0x36fe00;                 },                 'yFGZO': _0x58451b(0x1f9),                 'DfAnG': function (_0x56ceca, _0x26db5c) {                     return _0x56ceca == _0x26db5c;                 },                 'GPlMe': _0x58451b(0x75d),                 'xAdTr': _0x58451b(0x375),                 'GLMcb': _0x58451b(0x1e7),                 'BzYIL': _0x58451b(0x3c3),                 'tWdhU': _0x58451b(0x6fa),                 'ihmvu': _0x58451b(0x1fd),                 'vUcWK': _0x58451b(0x6ff),                 'rGwhn': _0x58451b(0x20a),                 'SkoLy': _0x58451b(0x684),                 'AhhpE': _0x58451b(0x625),                 'BlFRL': _0x58451b(0x3e2),                 'cxSUf': _0x58451b(0x729),                 'DQwdl': _0x58451b(0x542),                 'orMyR': _0x58451b(0x5ea),                 'yvYoe': _0x58451b(0x5b7),                 'MMjhY': _0x58451b(0x4cc),                 'NrCEt': _0x58451b(0x666) + '2',                 'Hvxho': _0x58451b(0x1e8),                 'PnQqw': _0x58451b(0x6be) + '1',                 'WIlwP': _0x58451b(0x6be) + '2',                 'dEqRO': _0x58451b(0x2f5) + '1',                 'Cuzhr': _0x58451b(0x51e) + _0x58451b(0x3aa),                 'LapxY': _0x58451b(0x51e) + _0x58451b(0x635),                 'EKUDS': _0x58451b(0x3b9) + _0x58451b(0x1ad),                 'jtSmk': _0x58451b(0x3af),                 'cDssG': function (_0x4c5b78, _0x4c537b) {                     return _0x4c5b78 == _0x4c537b;                 },                 'xWkPN': _0x58451b(0x3ab),                 'xNXnl': _0x58451b(0x5e4) + _0x58451b(0x207),                 'WhuYx': _0x58451b(0x59e),                 'tZHYe': _0x58451b(0x3b5),                 'ZWOnl': _0x58451b(0x674),                 'TXQHK': _0x58451b(0x5e4) + _0x58451b(0x677),                 'cukvK': _0x58451b(0x2f1),                 'ETotV': _0x58451b(0x660) + _0x58451b(0x581),                 'lCWWA': _0x58451b(0x228),                 'BGlTZ': _0x58451b(0x4bd),                 'bjqyO': _0x58451b(0x538),                 'QCpgj': function (_0x516e27, _0x5b5a97) {                     return _0x516e27 == _0x5b5a97;                 },                 'ruqzR': _0x58451b(0x428) + '_2',                 'mOwJd': _0x58451b(0x292),                 'BlVVV': function (_0x39838e, _0x3d2249) {                     return _0x39838e == _0x3d2249;                 },                 'nGJUf': _0x58451b(0x3d7),                 'rdSWp': _0x58451b(0x702),                 'coOVi': function (_0x483621, _0x164fca) {                     return _0x483621 == _0x164fca;                 },                 'AkwDZ': _0x58451b(0x395),                 'HsXen': _0x58451b(0x5a9),                 'ByRaS': function (_0x17f586, _0x461c4e) {                     return _0x17f586 == _0x461c4e;                 },                 'RPcCO': _0x58451b(0x536) + '_2',                 'KAnsj': _0x58451b(0x501) + '_3',                 'wIRcH': function (_0x103ad, _0x3ade9e) {                     return _0x103ad == _0x3ade9e;                 },                 'GNhxz': _0x58451b(0x222) + _0x58451b(0x707),                 'RHwGD': _0x58451b(0x281),                 'SGTDZ': function (_0x1b071f, _0x1d2e54) {                     return _0x1b071f == _0x1d2e54;                 },                 'MyFuf': _0x58451b(0x3cb),                 'eiWbV': _0x58451b(0x4bf),                 'IpCRI': _0x58451b(0x4af),                 'PSOwD': _0x58451b(0x496),                 'pbRvy': function (_0x4fbc5d, _0x2b40c0) {                     return _0x4fbc5d == _0x2b40c0;                 },                 'wsJNI': _0x58451b(0x492),                 'oChRI': _0x58451b(0x2e7),                 'JYhGF': _0x58451b(0x5e6),                 'ZXkzr': _0x58451b(0x3fe),                 'SPEBM': function (_0x5048cd, _0x3ebf6c) {                     return _0x5048cd(_0x3ebf6c);                 },                 'uiUHm': _0x58451b(0x58d),                 'VOVJT': _0x58451b(0x72d),                 'gVBEh': _0x58451b(0x325) + '1',                 'uspdK': function (_0x99fcc, _0x120f8f) {                     return _0x99fcc == _0x120f8f;                 },                 'SiXjH': function (_0x4347d5, _0x5ead1f) {                     return _0x4347d5 == _0x5ead1f;                 },                 'mJldy': _0x58451b(0x3d5),                 'KEvef': _0x58451b(0x2a6),                 'xGGkt': _0x58451b(0x732),                 'IJjEJ': function (_0x47d286, _0x28dd9a) {                     return _0x47d286 == _0x28dd9a;                 },                 'weaTw': _0x58451b(0x19f),                 'tccUh': _0x58451b(0x64b),                 'bcJnE': _0x58451b(0x69b),                 'ZEBTc': _0x58451b(0x266),                 'xAXtn': function (_0x8f40e0, _0x1b83b8) {                     return _0x8f40e0 == _0x1b83b8;                 },                 'WSyTT': function (_0x2a1575, _0x335482) {                     return _0x2a1575 == _0x335482;                 },                 'BKdUN': function (_0x4f4c57, _0x398b3f) {                     return _0x4f4c57 != _0x398b3f;                 },                 'lqoLt': function (_0x576cd9, _0x5cfea9) {                     return _0x576cd9 != _0x5cfea9;                 },                 'RFYSU': function (_0x3feba5, _0x33af11) {                     return _0x3feba5 == _0x33af11;                 },                 'OahGH': _0x58451b(0x5dc),                 'DRcwc': function (_0x4231f1, _0x4be4b0) {                     return _0x4231f1 == _0x4be4b0;                 },                 'UTswW': _0x58451b(0x679),                 'wWpxG': function (_0x423fff, _0x33464a) {                     return _0x423fff == _0x33464a;                 },                 'CmlkG': _0x58451b(0x5a6),                 'kYweS': function (_0x5e19e7, _0x15fe0f) {                     return _0x5e19e7 == _0x15fe0f;                 },                 'eXssP': _0x58451b(0x504),                 'RdaNK': _0x58451b(0x323),                 'TPAwu': function (_0x1dde33, _0x2f92f9) {                     return _0x1dde33 == _0x2f92f9;                 },                 'nfqiv': _0x58451b(0x4a1),                 'tSNzU': function (_0x253b8b, _0x58ad1c) {                     return _0x253b8b == _0x58ad1c;                 },                 'ufPaY': _0x58451b(0x276),                 'Ebnsu': _0x58451b(0x208),                 'aGgUB': function (_0x4b8209, _0xf60012) {                     return _0x4b8209 == _0xf60012;                 },                 'MdBLy': _0x58451b(0x6f0) + _0x58451b(0x636),                 'dTviE': function (_0x314856, _0x4f89a0) {                     return _0x314856 == _0x4f89a0;                 },                 'Cobrw': _0x58451b(0x51c) + _0x58451b(0x756),                 'sJqAd': function (_0xdf3229, _0x3e7924) {                     return _0xdf3229 == _0x3e7924;                 },                 'hoiGX': _0x58451b(0x73b) + _0x58451b(0x3dd),                 'bbWWO': _0x58451b(0x615) + _0x58451b(0x2ed),                 'dtWWZ': function (_0x28e06f, _0x2b1320) {                     return _0x28e06f == _0x2b1320;                 },                 'VXtDy': _0x58451b(0x698) + _0x58451b(0x1c0),                 'mdKEJ': function (_0x40240b, _0x1ad009) {                     return _0x40240b == _0x1ad009;                 },                 'ToXCM': _0x58451b(0x5bf) + _0x58451b(0x6bf),                 'zZyka': function (_0x1a5839, _0x2492fe) {                     return _0x1a5839 == _0x2492fe;                 },                 'PZAPk': _0x58451b(0x6b7) + _0x58451b(0x466),                 'OfdAL': _0x58451b(0x68a),                 'bpMmV': function (_0x20c4df, _0x25aca9) {                     return _0x20c4df == _0x25aca9;                 },                 'NtNQQ': _0x58451b(0x386),                 'szVEX': function (_0x2e8a9b, _0x10e7a8) {                     return _0x2e8a9b == _0x10e7a8;                 },                 'TFmzm': _0x58451b(0x3fa),                 'XjLoF': _0x58451b(0x484),                 'bCJis': function (_0x2210b5, _0x3dfc64) {                     return _0x2210b5 == _0x3dfc64;                 },                 'KRDrs': _0x58451b(0x371),                 'EtkcZ': function (_0xab91b3, _0x1c84fa) {                     return _0xab91b3 == _0x1c84fa;                 },                 'lmUWU': _0x58451b(0x5b9),                 'oetut': function (_0x21a1d0, _0x14138) {                     return _0x21a1d0 == _0x14138;                 },                 'DIDXz': _0x58451b(0x2e8),                 'GnKIp': function (_0x2dc1b2, _0x11ca75) {                     return _0x2dc1b2 == _0x11ca75;                 },                 'XBgGi': _0x58451b(0x26c),                 'GytgM': _0x58451b(0x724),                 'snJXe': _0x58451b(0x38b),                 'sVcwd': _0x58451b(0x746),                 'DoFHs': function (_0x3e1a26, _0x417400) {                     return _0x3e1a26 == _0x417400;                 },                 'kcsML': _0x58451b(0x567),                 'YXZbi': _0x58451b(0x694),                 'Pcmlq': function (_0x430877, _0x2e0dda) {                     return _0x430877 == _0x2e0dda;                 },                 'NuJHf': _0x58451b(0x1f0),                 'Yeycs': _0x58451b(0x543),                 'mjxOO': _0x58451b(0x734),                 'TcBDq': function (_0x105f14, _0x4300f2) {                     return _0x105f14 == _0x4300f2;                 },                 'LVhnI': _0x58451b(0x32a),                 'EUCzG': function (_0x2f2b08, _0x242166) {                     return _0x2f2b08 == _0x242166;                 },                 'TxMgN': _0x58451b(0x36b),                 'iffCe': _0x58451b(0x274),                 'NBBeR': _0x58451b(0x558),                 'nWAVW': _0x58451b(0x60b) + _0x58451b(0x472) + '|1',                 'Aorzz': _0x58451b(0x366),                 'YnTjs': function (_0x20a4c9, _0x456da) {                     return _0x20a4c9 == _0x456da;                 },                 'VPLfT': _0x58451b(0x344),                 'PCNxg': function (_0x132f6e, _0x5ae0c0) {                     return _0x132f6e == _0x5ae0c0;                 },                 'iBNOs': _0x58451b(0x582),                 'gExxL': function (_0xec0765, _0x4e9de5) {                     return _0xec0765 == _0x4e9de5;                 },                 'kgpTr': _0x58451b(0x49e),                 'ZTlbF': _0x58451b(0x68c),                 'kXBXf': _0x58451b(0x52f),                 'WFSnr': function (_0x39d0c0, _0x44cb38) {                     return _0x39d0c0 == _0x44cb38;                 },                 'pTnEr': _0x58451b(0x4b1),                 'QEMtw': _0x58451b(0x6ad),                 'yBYRg': function (_0x224c0f, _0x4bae03) {                     return _0x224c0f == _0x4bae03;                 },                 'gKLgm': _0x58451b(0x31f),                 'YRiCd': function (_0x3e29a7, _0x35e643) {                     return _0x3e29a7 == _0x35e643;                 },                 'Zwsue': _0x58451b(0x591),                 'jnLDe': function (_0x28166b, _0x448b31) {                     return _0x28166b == _0x448b31;                 },                 'gEOGb': _0x58451b(0x3ac),                 'qgbyE': function (_0xfbae28, _0x2df231) {                     return _0xfbae28 == _0x2df231;                 },                 'XEiSG': _0x58451b(0x415),                 'orzJE': function (_0x5e73c5, _0x5c5aaa) {                     return _0x5e73c5 == _0x5c5aaa;                 },                 'GzVbV': _0x58451b(0x6b8),                 'StKLI': _0x58451b(0x3a2),                 'sbaRc': function (_0x1f13bd, _0xed1226) {                     return _0x1f13bd == _0xed1226;                 },                 'pCKKE': _0x58451b(0x6b4),                 'GAFsH': function (_0x37e5dd, _0x3021ee) {                     return _0x37e5dd == _0x3021ee;                 },                 'PfwbC': _0x58451b(0x1d1),                 'WsMZP': function (_0x3842ad, _0xb89e58) {                     return _0x3842ad == _0xb89e58;                 },                 'vIdbx': _0x58451b(0x430),                 'BXBsy': function (_0x4f41b9, _0x2c8fe2) {                     return _0x4f41b9 == _0x2c8fe2;                 },                 'nsBZl': _0x58451b(0x673),                 'sfIMl': _0x58451b(0x3c5),                 'BoPMb': _0x58451b(0x268),                 'lkXRP': _0x58451b(0x75c),                 'vsTzF': function (_0x4415d9, _0x51e6f6) {                     return _0x4415d9 == _0x51e6f6;                 },                 'ZYjDP': _0x58451b(0x60f),                 'zGYpi': function (_0x5b2b03, _0x15992a) {                     return _0x5b2b03 == _0x15992a;                 },                 'xFCmn': _0x58451b(0x364),                 'UDosD': _0x58451b(0x1dd) + _0x58451b(0x6e8) + _0x58451b(0x388) + '3',                 'xxkcF': _0x58451b(0x2eb),                 'wcohg': function (_0x569856, _0x5d249e) {                     return _0x569856 == _0x5d249e;                 },                 'wmoTa': _0x58451b(0x554),                 'aFeTW': function (_0x143902, _0x3813ee) {                     return _0x143902 == _0x3813ee;                 },                 'twWBp': _0x58451b(0x3d1),                 'JbncT': _0x58451b(0x6c6),                 'pWgEV': _0x58451b(0x5c5),                 'yAvIA': _0x58451b(0x3ef),                 'fKICR': _0x58451b(0x230),                 'LoOgd': _0x58451b(0x578),                 'wOyuw': _0x58451b(0x6f2),                 'poUUJ': function (_0x35d17b, _0x42aaf0) {                     return _0x35d17b == _0x42aaf0;                 },                 'FPLTn': _0x58451b(0x3e7),                 'zdkrw': function (_0x1659d3, _0xd6d4d4) {                     return _0x1659d3 == _0xd6d4d4;                 },                 'povDK': _0x58451b(0x34a),                 'xoHZg': _0x58451b(0x514),                 'ItZew': _0x58451b(0x4b3),                 'gSFOM': _0x58451b(0x6d0) + _0x58451b(0x22c),                 'OeGHR': function (_0x14c0d4, _0x33f78e) {                     return _0x14c0d4 == _0x33f78e;                 },                 'wNzVP': _0x58451b(0x399) + _0x58451b(0x22c),                 'DEjAQ': _0x58451b(0x35a) + _0x58451b(0x22c),                 'eLYfi': _0x58451b(0x5e1) + _0x58451b(0x22c),                 'HHWer': function (_0x3b92d2, _0x30e3f0) {                     return _0x3b92d2 == _0x30e3f0;                 },                 'QRZQW': _0x58451b(0x1a6) + _0x58451b(0x22c),                 'pQfxj': _0x58451b(0x6e6) + _0x58451b(0x22c),                 'DAntX': _0x58451b(0x2cc) + _0x58451b(0x22c),                 'vjhjZ': function (_0x5eef1c, _0x35413f) {                     return _0x5eef1c == _0x35413f;                 },                 'bjoCi': _0x58451b(0x4f4) + _0x58451b(0x22c),                 'ilRuf': function (_0x35697c, _0x16a5c2) {                     return _0x35697c + _0x16a5c2;                 },                 'fVRGK': _0x58451b(0x65f),                 'Mskwx': _0x58451b(0x328),                 'luJTL': function (_0x645ace, _0x97d3d9) {                     return _0x645ace == _0x97d3d9;                 },                 'lNmQT': _0x58451b(0x535),                 'ylLzP': function (_0x3af5b0, _0x5d3e29) {                     return _0x3af5b0 + _0x5d3e29;                 },                 'HCOJA': _0x58451b(0x420),                 'eGgPY': function (_0x5c16ac, _0x447584) {                     return _0x5c16ac == _0x447584;                 },                 'EzIYO': _0x58451b(0x22e) + _0x58451b(0x718),                 'AkuCa': function (_0x8cb026, _0x5a6da3) {                     return _0x8cb026 == _0x5a6da3;                 },                 'RQKCO': _0x58451b(0x1e1) + _0x58451b(0x718),                 'wiLrI': function (_0x229c87, _0x256f2e) {                     return _0x229c87 == _0x256f2e;                 },                 'KgyTJ': _0x58451b(0x508) + _0x58451b(0x718),                 'uxspJ': function (_0x21abc4, _0x497eec) {                     return _0x21abc4 == _0x497eec;                 },                 'yTono': _0x58451b(0x67b) + _0x58451b(0x718),                 'ogbbc': _0x58451b(0x28f),                 'stWhF': _0x58451b(0x6bc),                 'gBtij': _0x58451b(0x2f6),                 'dzDcx': function (_0x26f4c5, _0x574131) {                     return _0x26f4c5 - _0x574131;                 },                 'mwgVF': function (_0x243727, _0x3b828a) {                     return _0x243727 - _0x3b828a;                 },                 'TRxAh': _0x58451b(0x38a),                 'CYCtL': _0x58451b(0x206) + '2',                 'ZoBTF': _0x58451b(0x623) + '1',                 'YwazG': _0x58451b(0x6b0) + _0x58451b(0x24a) + _0x58451b(0x54a) + 'fa',                 'cCgTg': function (_0x28238c, _0xe14a58) {                     return _0x28238c == _0xe14a58;                 },                 'IoyBC': _0x58451b(0x4a2) + _0x58451b(0x3c2),                 'kOyyc': function (_0x451c8c, _0x2792c) {                     return _0x451c8c == _0x2792c;                 },                 'vgrUJ': _0x58451b(0x69d) + _0x58451b(0x72e),                 'ZEEKt': _0x58451b(0x1d9),                 'oGEOe': _0x58451b(0x405),                 'MOFbx': function (_0x1f06b0, _0x10ac5b) {                     return _0x1f06b0 == _0x10ac5b;                 },                 'uPQpW': _0x58451b(0x3d8) + _0x58451b(0x5f7),                 'vzHqi': _0x58451b(0x568),                 'PHSpS': _0x58451b(0x322) + _0x58451b(0x5f7),                 'gvoUz': _0x58451b(0x33d),                 'oibUl': _0x58451b(0x33f) + _0x58451b(0x5f7),                 'usmMQ': _0x58451b(0x63e),                 'VNgpf': function (_0x97692f, _0x5d95f4) {                     return _0x97692f == _0x5d95f4;                 },                 'dAjQg': _0x58451b(0x587),                 'GaOrf': _0x58451b(0x4a2) + _0x58451b(0x2f9),                 'vUQLy': _0x58451b(0x4a2) + _0x58451b(0x489),                 'lpaJY': function (_0x102a63, _0x1b01a3) {                     return _0x102a63 == _0x1b01a3;                 },                 'RhvqX': _0x58451b(0x745),                 'yOJyx': _0x58451b(0x6f3),                 'ETNOQ': _0x58451b(0x5fa) + _0x58451b(0x5f7),                 'GBgjE': function (_0x328977, _0x1b1530) {                     return _0x328977 == _0x1b1530;                 },                 'eWSSz': _0x58451b(0x1c4) + _0x58451b(0x5f7),                 'UpOVY': function (_0x3b566c, _0x2dd295) {                     return _0x3b566c == _0x2dd295;                 },                 'NqOeL': _0x58451b(0x639) + _0x58451b(0x5f7),                 'ipznf': function (_0x479b0f, _0x20847f) {                     return _0x479b0f == _0x20847f;                 },                 'vRYbS': _0x58451b(0x35d) + _0x58451b(0x5f7),                 'DMPUB': function (_0x4022fa, _0x5315d5) {                     return _0x4022fa == _0x5315d5;                 },                 'WVbui': _0x58451b(0x46c) + _0x58451b(0x5f7),                 'pIVwc': function (_0x26b485, _0x45fdd9, _0x112ed7) {                     return _0x26b485(_0x45fdd9, _0x112ed7);                 },                 'tkLdE': _0x58451b(0x70c),                 'OXHWn': function (_0x4a81fb, _0x37fac5) {                     return _0x4a81fb == _0x37fac5;                 },                 'PFiLD': _0x58451b(0x247) + '0',                 'JlWYc': _0x58451b(0x3ce) + '95',                 'MybGc': _0x58451b(0x383),                 'FBPjp': function (_0x5d45b0, _0x420b9c) {                     return _0x5d45b0 == _0x420b9c;                 },                 'ToVbO': _0x58451b(0x2fb) + '3',                 'LZnGx': _0x58451b(0x3ce) + '94',                 'dxBSR': _0x58451b(0x2b8) + '0',                 'UqvxP': _0x58451b(0x3ce) + '93',                 'NzteS': _0x58451b(0x24e) + '4',                 'pdXGm': _0x58451b(0x3ce) + '92',                 'hNMYz': _0x58451b(0x4ea) + '4',                 'LnnJb': _0x58451b(0x3ce) + '88',                 'zuSjo': _0x58451b(0x5b5) + '5',                 'pIrjQ': _0x58451b(0x3ce) + '89',                 'ztlHe': function (_0x438990, _0x48d09f) {                     return _0x438990 == _0x48d09f;                 },                 'cATsr': _0x58451b(0x560) + '2',                 'nnwdH': _0x58451b(0x3ce) + '85',                 'kgmWo': _0x58451b(0x5cb) + '2',                 'vHeQJ': _0x58451b(0x3ce) + '86',                 'JasQe': function (_0x33b674, _0x2bea51) {                     return _0x33b674 == _0x2bea51;                 },                 'clKOy': _0x58451b(0x36d) + '4',                 'KTKvD': _0x58451b(0x3ce) + '82',                 'OQkwx': function (_0x563f20, _0x1af154) {                     return _0x563f20 == _0x1af154;                 },                 'MoieR': _0x58451b(0x69f) + '2',                 'yitlj': _0x58451b(0x3ce) + '83',                 'PDRGA': _0x58451b(0x4b5) + '5',                 'ZSopT': _0x58451b(0x3ce) + '79',                 'WdNNK': _0x58451b(0x209) + '4',                 'vSeou': _0x58451b(0x3ce) + '80',                 'iWfhJ': _0x58451b(0x6eb) + '4',                 'DXPsr': _0x58451b(0x3ce) + '76',                 'sKxlk': function (_0x598790, _0x340647) {                     return _0x598790 == _0x340647;                 },                 'KPtHk': _0x58451b(0x205) + '1',                 'cWoBk': _0x58451b(0x3ce) + '77',                 'zuQSC': function (_0x47840b, _0x49d4ed) {                     return _0x47840b == _0x49d4ed;                 },                 'cKMzp': _0x58451b(0x548) + '3',                 'uAygI': _0x58451b(0x3ce) + '73',                 'MhDUh': _0x58451b(0x453) + '3',                 'FPTKf': _0x58451b(0x3ce) + '74',                 'bqyde': function (_0x23fc16, _0x46f02e) {                     return _0x23fc16 == _0x46f02e;                 },                 'NiDnD': _0x58451b(0x3f6) + '0',                 'KsnJl': _0x58451b(0x3ce) + '70',                 'KBwie': _0x58451b(0x3ce) + '71',                 'DTnPv': function (_0x4c05a3, _0x21197e) {                     return _0x4c05a3 == _0x21197e;                 },                 'RPMQN': _0x58451b(0x391) + '0',                 'IxxMd': _0x58451b(0x3ce) + '68',                 'LLZnI': _0x58451b(0x456) + '3',                 'oeeKb': _0x58451b(0x3ce) + '67',                 'aWPiV': _0x58451b(0x2d4),                 'PQXld': _0x58451b(0x42a) + _0x58451b(0x1b2),                 'LORNn': _0x58451b(0x682),                 'PqPEa': _0x58451b(0x61c) + '1',                 'LODET': _0x58451b(0x457) + _0x58451b(0x297) + _0x58451b(0x3cf) + '29',                 'UnDmb': function (_0x37ea74, _0x3ce90c) {                     return _0x37ea74 == _0x3ce90c;                 },                 'LaiBQ': _0x58451b(0x6a5),                 'Rrgak': _0x58451b(0x61c) + '5',                 'OxuGp': _0x58451b(0x4d3) + _0x58451b(0x713) + _0x58451b(0x72f) + '78',                 'FYSKa': function (_0x2bed35, _0x1a330d) {                     return _0x2bed35 == _0x1a330d;                 },                 'IVJVA': _0x58451b(0x362),                 'wQQqR': _0x58451b(0x61c) + '2',                 'tToVb': _0x58451b(0x46f) + _0x58451b(0x6a1) + _0x58451b(0x23a) + '6c',                 'nBOkc': _0x58451b(0x575),                 'YlHmc': _0x58451b(0x61c) + '4',                 'cjcFt': _0x58451b(0x289) + _0x58451b(0x35b) + _0x58451b(0x638) + 'b3',                 'lOzsO': function (_0x1ead1a, _0x4efc75) {                     return _0x1ead1a == _0x4efc75;                 },                 'XmyvV': _0x58451b(0x47b),                 'urBUq': _0x58451b(0x61c) + '6',                 'HVPVQ': _0x58451b(0x255) + _0x58451b(0x312) + _0x58451b(0x280) + '44',                 'JCElq': function (_0xc03d27, _0x10e064) {                     return _0xc03d27 == _0x10e064;                 },                 'DfIDz': _0x58451b(0x421),                 'whpnS': _0x58451b(0x61c) + '3',                 'LWpxK': _0x58451b(0x6b6) + _0x58451b(0x1f4) + _0x58451b(0x4a5) + 'e4',                 'XhSQO': _0x58451b(0x4d9) + _0x58451b(0x584) + 'o',                 'QIsgL': _0x58451b(0x3b8) + '事件',                 'EBgzC': _0x58451b(0x68f) + _0x58451b(0x718),                 'Cxzsn': _0x58451b(0x38f) + _0x58451b(0x718),                 'MFFwT': function (_0x32de79, _0x274ca8) {                     return _0x32de79 == _0x274ca8;                 },                 'MWOeW': _0x58451b(0x52e),                 'HgViO': _0x58451b(0x528),                 'YvNUt': function (_0x10bf23, _0x59b5f6) {                     return _0x10bf23 == _0x59b5f6;                 },                 'zyjUq': _0x58451b(0x1e4),                 'BLVvw': function (_0x3cd425, _0x279c6e) {                     return _0x3cd425 == _0x279c6e;                 },                 'kyZvP': _0x58451b(0x23f),                 'MFlnE': _0x58451b(0x2fe),                 'qEJdU': _0x58451b(0x71f) + '4',                 'iSUtC': _0x58451b(0x5f9),                 'NJXzc': _0x58451b(0x51a),                 'eBmJM': function (_0x10031d, _0x349409) {                     return _0x10031d == _0x349409;                 },                 'BYIjY': _0x58451b(0x696),                 'kEhOT': _0x58451b(0x43e) + '4',                 'zobzX': _0x58451b(0x356),                 'zjDJk': _0x58451b(0x2a9),                 'BZRKt': function (_0x218309, _0x4e8b36) {                     return _0x218309 == _0x4e8b36;                 },                 'NOVzG': _0x58451b(0x2ae) + _0x58451b(0x718),                 'whqxC': function (_0x4aa4d7, _0x1f25f0) {                     return _0x4aa4d7 == _0x1f25f0;                 },                 'iTfgx': _0x58451b(0x2a3) + _0x58451b(0x718),                 'gHiQT': _0x58451b(0x725),                 'HvlrW': function (_0x16f071, _0x29c345) {                     return _0x16f071 == _0x29c345;                 },                 'efErr': _0x58451b(0x762),                 'ixeaE': _0x58451b(0x485) + _0x58451b(0x38d),                 'PRhev': function (_0x3ab05d, _0x58df0c) {                     return _0x3ab05d == _0x58df0c;                 },                 'zTGUH': _0x58451b(0x1a8) + _0x58451b(0x38d),                 'sssYt': function (_0x27e84e, _0x198ee9) {                     return _0x27e84e == _0x198ee9;                 },                 'uPVDA': _0x58451b(0x5ba) + _0x58451b(0x2f3),                 'IRamK': _0x58451b(0x2b3) + _0x58451b(0x2f3),                 'ZngkH': function (_0x1b8bb2, _0x10378d) {                     return _0x1b8bb2 == _0x10378d;                 },                 'RHiWx': _0x58451b(0x74d),                 'VrvdR': _0x58451b(0x431),                 'XJXnz': function (_0x1b6685, _0x3a6b4d) {                     return _0x1b6685 == _0x3a6b4d;                 },                 'pYYVh': _0x58451b(0x1bf) + _0x58451b(0x488),                 'iFdOn': function (_0x8f56c6, _0x5c0625) {                     return _0x8f56c6 == _0x5c0625;                 },                 'cHrUl': _0x58451b(0x5d2) + _0x58451b(0x488),                 'ezdtB': function (_0x56901a, _0x3f55ce) {                     return _0x56901a == _0x3f55ce;                 },                 'xYSHG': _0x58451b(0x31b),                 'WIBKC': _0x58451b(0x4cb),                 'uVDSD': function (_0x3f5cbf, _0x4aafe1) {                     return _0x3f5cbf == _0x4aafe1;                 },                 'hEIGY': _0x58451b(0x45b),                 'nsIxE': function (_0x414d77, _0x1cde94) {                     return _0x414d77 == _0x1cde94;                 },                 'lRBIu': _0x58451b(0x53d),                 'HwWfW': function (_0x3bf86c, _0x37af07) {                     return _0x3bf86c == _0x37af07;                 },                 'LeIfB': _0x58451b(0x2ce),                 'LNeKc': _0x58451b(0x4b0),                 'mqvvG': _0x58451b(0x3ca),                 'dkrFo': function (_0x46f7ad, _0x5a0850) {                     return _0x46f7ad == _0x5a0850;                 },                 'yTxnl': _0x58451b(0x2e9),                 'xwxOa': function (_0x3cc4ba, _0x41107a) {                     return _0x3cc4ba == _0x41107a;                 },                 'gFhMO': _0x58451b(0x326),                 'bgyuY': _0x58451b(0x592),                 'oTOYN': function (_0x53aa38, _0x496d05) {                     return _0x53aa38 == _0x496d05;                 },                 'nkVmt': function (_0x37305b, _0x484231) {                     return _0x37305b == _0x484231;                 },                 'ZBiPc': _0x58451b(0x49a),                 'qPqsD': _0x58451b(0x340),                 'TOOYX': function (_0x580989, _0xaff579) {                     return _0x580989 == _0xaff579;                 },                 'oNkmp': _0x58451b(0x38e),                 'LiZvu': function (_0x4cd8f5, _0x1e3200) {                     return _0x4cd8f5 == _0x1e3200;                 },                 'LDWHB': _0x58451b(0x347),                 'sgJzR': _0x58451b(0x1d6),                 'ahdPD': _0x58451b(0x293),                 'ajhts': _0x58451b(0x1e3),                 'nlYng': function (_0x13baab, _0x5d80c3) {                     return _0x13baab == _0x5d80c3;                 },                 'easra': _0x58451b(0x5e9),                 'eKLmV': function (_0xf4b2ca, _0x48b50c) {                     return _0xf4b2ca == _0x48b50c;                 },                 'EMqRS': _0x58451b(0x448),                 'LLzch': _0x58451b(0x5e5),                 'aVxqP': _0x58451b(0x248),                 'FAaXr': function (_0x1eae54, _0x1cade2) {                     return _0x1eae54 == _0x1cade2;                 },                 'WGOkd': _0x58451b(0x469),                 'pbvlO': _0x58451b(0x25d),                 'jLjAU': _0x58451b(0x5b3),                 'FWqTm': _0x58451b(0x576),                 'mwcZk': _0x58451b(0x273),                 'iUxDO': _0x58451b(0x2db),                 'oxHeL': _0x58451b(0x3b2),                 'iiTai': _0x58451b(0x1a7) + _0x58451b(0x69e),                 'CFaez': function (_0x159c14, _0x5b4309) {                     return _0x159c14 == _0x5b4309;                 },                 'PSGIQ': _0x58451b(0x298),                 'LJUxS': _0x58451b(0x657),                 'CODVq': _0x58451b(0x1a7) + _0x58451b(0x6ba),                 'eRDnl': function (_0x5d0ebe, _0x3eb673) {                     return _0x5d0ebe == _0x3eb673;                 },                 'unNZh': _0x58451b(0x481),                 'eEWyd': _0x58451b(0x613),                 'CUvia': _0x58451b(0x1a7) + _0x58451b(0x26a),                 'IjbIw': function (_0x2ba99a, _0x5bc020) {                     return _0x2ba99a == _0x5bc020;                 },                 'LfptQ': _0x58451b(0x50b),                 'nMacU': _0x58451b(0x5d0),                 'cSQfv': _0x58451b(0x1b9) + _0x58451b(0x2e4),                 'uyrKG': function (_0x4689ad, _0x245ca2) {                     return _0x4689ad == _0x245ca2;                 },                 'RGnpi': _0x58451b(0x741),                 'JmDMg': _0x58451b(0x564),                 'EWgyO': _0x58451b(0x3cd) + _0x58451b(0x629),                 'JPYmy': _0x58451b(0x4cd),                 'mPYYe': _0x58451b(0x1a1),                 'iYfcJ': _0x58451b(0x1a7) + _0x58451b(0x42c),                 'gEGag': _0x58451b(0x630),                 'BYuQP': _0x58451b(0x73c),                 'phipJ': _0x58451b(0x355) + _0x58451b(0x1dc),                 'PXjWc': function (_0x485be9, _0x29c599) {                     return _0x485be9 == _0x29c599;                 },                 'DhllV': _0x58451b(0x6c9),                 'enoKY': _0x58451b(0x56d),                 'CRAYC': _0x58451b(0x355) + _0x58451b(0x3d0),                 'IpmcL': _0x58451b(0x2d8),                 'GKYXh': _0x58451b(0x4ba),                 'EkbYQ': _0x58451b(0x355) + _0x58451b(0x512),                 'lvrOT': function (_0x58ec65, _0xc38949) {                     return _0x58ec65 == _0xc38949;                 },                 'SuzNw': _0x58451b(0x67d),                 'IjyZv': _0x58451b(0x2a4),                 'cHXrf': _0x58451b(0x1a7) + _0x58451b(0x44e),                 'viTSH': _0x58451b(0x39d),                 'bhUBG': _0x58451b(0x3e1),                 'LqXcJ': _0x58451b(0x355) + _0x58451b(0x23b),                 'RJZnJ': function (_0x4bd7b8, _0x3f54d4) {                     return _0x4bd7b8 == _0x3f54d4;                 },                 'zgKhW': _0x58451b(0x726),                 'lWUYt': _0x58451b(0x574),                 'xQAXn': _0x58451b(0x1a7) + _0x58451b(0x238),                 'XStHt': function (_0x37c16c, _0x43491d) {                     return _0x37c16c == _0x43491d;                 },                 'AxpHD': _0x58451b(0x622),                 'JPmFZ': _0x58451b(0x24f),                 'GVSMT': _0x58451b(0x355) + _0x58451b(0x659),                 'CKmJq': function (_0x3ca4b9, _0x49e3f0) {                     return _0x3ca4b9 == _0x49e3f0;                 },                 'gQRzA': _0x58451b(0x1c5),                 'iPUuE': _0x58451b(0x1c2),                 'bjoPT': _0x58451b(0x355) + _0x58451b(0x1e6),                 'eMXDf': _0x58451b(0x4d7),                 'yELDC': _0x58451b(0x355) + _0x58451b(0x722),                 'PczGX': _0x58451b(0x350),                 'qFtiG': _0x58451b(0x330),                 'yjxAm': _0x58451b(0x1a7) + _0x58451b(0x378),                 'MkXvI': _0x58451b(0x2ea),                 'PgFSk': _0x58451b(0x4bc),                 'ibdBG': _0x58451b(0x3a5) + _0x58451b(0x675),                 'spHbV': _0x58451b(0x416),                 'ccpeT': _0x58451b(0x6c4),                 'nDTSM': _0x58451b(0x1aa) + _0x58451b(0x27b),                 'FIINN': _0x58451b(0x3cc),                 'Vocbh': _0x58451b(0x3d6),                 'ndxoC': _0x58451b(0x497) + _0x58451b(0x27a),                 'McXCa': _0x58451b(0x39b),                 'XMNIo': _0x58451b(0x227),                 'JKYMl': _0x58451b(0x66c) + _0x58451b(0x2e6),                 'bzPIy': function (_0x57769c, _0x364585) {                     return _0x57769c == _0x364585;                 },                 'ExkYD': _0x58451b(0x33c),                 'EDQkW': _0x58451b(0x358),                 'ehCab': _0x58451b(0x1aa) + _0x58451b(0x5d7),                 'DjzXA': function (_0x1456ac, _0x582187) {                     return _0x1456ac == _0x582187;                 },                 'STylf': _0x58451b(0x649),                 'pFmqV': _0x58451b(0x1fb),                 'NGGWJ': _0x58451b(0x67a) + _0x58451b(0x48c),                 'ICyIX': _0x58451b(0x5ee),                 'xIfjJ': _0x58451b(0x68b),                 'EXYgU': _0x58451b(0x401) + _0x58451b(0x5bd),                 'cTZiR': _0x58451b(0x302),                 'qmCnX': _0x58451b(0x21b),                 'oQJxM': _0x58451b(0x1aa) + _0x58451b(0x299),                 'jAvyh': function (_0x2a761c, _0x4d9877) {                     return _0x2a761c == _0x4d9877;                 },                 'GpDxD': _0x58451b(0x201),                 'Mskfr': _0x58451b(0x23e),                 'jvZvU': _0x58451b(0x65b) + _0x58451b(0x4c5),                 'PvrnX': _0x58451b(0x35c),                 'CDiQR': _0x58451b(0x534),                 'yYgNZ': _0x58451b(0x6d2) + _0x58451b(0x269),                 'ICaim': function (_0x22e94d, _0x39e83b) {                     return _0x22e94d == _0x39e83b;                 },                 'abeeM': _0x58451b(0x611),                 'lGUiq': _0x58451b(0x63c),                 'TVShy': _0x58451b(0x2ab) + _0x58451b(0x286),                 'ELKJz': _0x58451b(0x518),                 'hPynK': _0x58451b(0x61e),                 'mvHLa': _0x58451b(0x727) + _0x58451b(0x2fa),                 'XwpMw': function (_0x48fcba, _0x52204f) {                     return _0x48fcba == _0x52204f;                 },                 'lIKfw': _0x58451b(0x4c2),                 'gHrWH': _0x58451b(0x758),                 'LGkAn': _0x58451b(0x67f) + _0x58451b(0x46e),                 'HGpFK': _0x58451b(0x3f0),                 'JBMYk': _0x58451b(0x3eb),                 'YuyLc': _0x58451b(0x45e) + _0x58451b(0x433),                 'QTdmI': function (_0x546688, _0x55b4e2) {                     return _0x546688 == _0x55b4e2;                 },                 'ixclG': _0x58451b(0x426),                 'RWFKa': _0x58451b(0x1e2),                 'oHDkn': _0x58451b(0x3a4) + _0x58451b(0x596),                 'uoigc': function (_0x4e0fcb, _0x2279b5) {                     return _0x4e0fcb == _0x2279b5;                 },                 'vfkeO': function (_0x12af63, _0x2aa106) {                     return _0x12af63 == _0x2aa106;                 },                 'uUpuw': _0x58451b(0x59a),                 'cdfCN': _0x58451b(0x232),                 'jRKFn': _0x58451b(0x203),                 'uOFbH': function (_0x49d388, _0x5a8ae2) {                     return _0x49d388 == _0x5a8ae2;                 },                 'Xqwvu': _0x58451b(0x6af),                 'LsTdc': _0x58451b(0x4a7),                 'wqExp': _0x58451b(0x735),                 'VQlIV': _0x58451b(0x1b7),                 'Uthpn': _0x58451b(0x69c),                 'NIXRV': _0x58451b(0x25f),                 'AsWLd': _0x58451b(0x616),                 'HxiOj': _0x58451b(0x20b),                 'QnKmS': _0x58451b(0x4ff),                 'lJrTW': _0x58451b(0x68f) + '道',                 'pPNNy': _0x58451b(0x5af),                 'rKpSL': _0x58451b(0x3f7),                 'PNEmu': function (_0x5872d4, _0x4da468) {                     return _0x5872d4 == _0x4da468;                 },                 'JVRuW': _0x58451b(0x38f) + '道',                 'UPAfq': _0x58451b(0x490),                 'tgkYN': _0x58451b(0x3b7),                 'GoDhO': _0x58451b(0x3ff),                 'OzJya': _0x58451b(0x1b3),                 'WJWMZ': _0x58451b(0x419),                 'zTNzn': _0x58451b(0x1ca),                 'TUZcB': _0x58451b(0x2a5),                 'bzbOg': _0x58451b(0x30d),                 'uFgxB': function (_0x304555, _0x2d45fa) {                     return _0x304555 == _0x2d45fa;                 },                 'siDmh': _0x58451b(0x540),                 'iwBUp': _0x58451b(0x645),                 'wNVvO': _0x58451b(0x70e),                 'zohHb': function (_0x215e99, _0xd01675) {                     return _0x215e99 == _0xd01675;                 },                 'glpGI': _0x58451b(0x527),                 'LMVTA': _0x58451b(0x56a),                 'TiqEW': _0x58451b(0x53a),                 'yktyD': _0x58451b(0x21c),                 'FzFOh': _0x58451b(0x1ed),                 'oEGCA': _0x58451b(0x43d),                 'lxAcS': _0x58451b(0x5c0),                 'LpBDF': _0x58451b(0x4e1),                 'Pwcxm': _0x58451b(0x699),                 'RjEEX': _0x58451b(0x2a3) + '道',                 'kzsmn': _0x58451b(0x5ec),                 'tnioU': function (_0x5868cd, _0xf1da71) {                     return _0x5868cd == _0xf1da71;                 },                 'avvZV': _0x58451b(0x2ae) + '道',                 'TSMsH': _0x58451b(0x593),                 'dJJqb': _0x58451b(0x3bc),                 'qFCUl': _0x58451b(0x3f4),                 'Kjkjm': _0x58451b(0x313),                 'IhXZK': function (_0x444b71, _0x5dbfaa) {                     return _0x444b71 == _0x5dbfaa;                 },                 'QAVWi': _0x58451b(0x1c3),                 'SuNYy': _0x58451b(0x506),                 'OlALS': _0x58451b(0x5fb),                 'mElTc': _0x58451b(0x2f4),                 'ClfpX': _0x58451b(0x6ef),                 'RqCwf': _0x58451b(0x60a),                 'TgzTg': function (_0x4b71e5, _0x5c6255) {                     return _0x4b71e5 == _0x5c6255;                 },                 'FLHdu': _0x58451b(0x1a8) + _0x58451b(0x538),                 'SzvyD': _0x58451b(0x712),                 'knGPy': _0x58451b(0x22a),                 'nvusp': _0x58451b(0x485) + _0x58451b(0x538),                 'ErRjM': _0x58451b(0x4ae),                 'CIisa': _0x58451b(0x262),                 'oiMWj': function (_0x5c050d, _0x311c73) {                     return _0x5c050d == _0x311c73;                 },                 'RKWMQ': _0x58451b(0x1cb),                 'RxACX': _0x58451b(0x6c3),                 'GwnEa': _0x58451b(0x544),                 'AJTIZ': _0x58451b(0x2de),                 'YgudJ': _0x58451b(0x31a),                 'Izfoe': _0x58451b(0x1fe),                 'LUkWI': function (_0x21e58b, _0x39bce4) {                     return _0x21e58b == _0x39bce4;                 },                 'BUQjJ': function (_0x37a186, _0x19a5c7) {                     return _0x37a186 == _0x19a5c7;                 },                 'jbXPR': function (_0x4e5aa0, _0x58b9cc) {                     return _0x4e5aa0 == _0x58b9cc;                 },                 'jCRxt': function (_0x387731, _0x6091ae) {                     return _0x387731 == _0x6091ae;                 },                 'xgwtH': _0x58451b(0x2b4),                 'xIbCO': function (_0x39c06a, _0x19d9fb) {                     return _0x39c06a == _0x19d9fb;                 },                 'nKiCd': _0x58451b(0x2bc),                 'SVNJT': function (_0x37b3bd, _0x168bf5) {                     return _0x37b3bd == _0x168bf5;                 },                 'ZgxOv': _0x58451b(0x478),                 'uuJur': function (_0x160ac4, _0x44eb96) {                     return _0x160ac4 == _0x44eb96;                 },                 'uDwlF': _0x58451b(0x2cb),                 'BhQXA': function (_0x39e0b1, _0x119c8c) {                     return _0x39e0b1 == _0x119c8c;                 },                 'kkKFa': _0x58451b(0x381),                 'HdEkT': function (_0x30ea37, _0x46c613) {                     return _0x30ea37 == _0x46c613;                 },                 'jXvZE': _0x58451b(0x6cf),                 'vwjIH': _0x58451b(0x1cd),                 'RFizC': _0x58451b(0x3b4),                 'QYqwp': _0x58451b(0x5bc),                 'rYUZh': function (_0x4f945c, _0x3a6868) {                     return _0x4f945c == _0x3a6868;                 },                 'xERfp': _0x58451b(0x6e5),                 'Xirny': function (_0x406a6f, _0x51e697) {                     return _0x406a6f == _0x51e697;                 },                 'cpSMb': _0x58451b(0x1e5),                 'cPiyG': _0x58451b(0x6aa),                 'KgQmX': function (_0x454512, _0x469f1c) {                     return _0x454512 == _0x469f1c;                 },                 'HKOdz': _0x58451b(0x342),                 'HdCOG': _0x58451b(0x2bf),                 'VKIdv': _0x58451b(0x66f),                 'ruECg': _0x58451b(0x678),                 'FcyTH': _0x58451b(0x653),                 'qUSVG': _0x58451b(0x654) + _0x58451b(0x1ac) + _0x58451b(0x705) + _0x58451b(0x306) + _0x58451b(0x521),                 'Wtcnj': _0x58451b(0x761),                 'lrXlX': function (_0x444fc3, _0x46f5fc) {                     return _0x444fc3 == _0x46f5fc;                 },                 'FSbQi': _0x58451b(0x336),                 'iQUei': _0x58451b(0x21d),                 'XULnZ': _0x58451b(0x36e),                 'Dwckz': _0x58451b(0x1d2),                 'hUiFQ': function (_0x4cd2cb, _0x33ae14) {                     return _0x4cd2cb == _0x33ae14;                 },                 'ZVbAM': _0x58451b(0x1d5),                 'tBVtS': _0x58451b(0x6ee),                 'ssVyl': function (_0x332554, _0x47c22c) {                     return _0x332554 == _0x47c22c;                 },                 'jinGN': _0x58451b(0x577),                 'lknlN': _0x58451b(0x2ac),                 'xyhKA': function (_0x1368bb, _0x203e70) {                     return _0x1368bb == _0x203e70;                 },                 'BRRmT': _0x58451b(0x552),                 'LvPLJ': _0x58451b(0x389),                 'LzETL': function (_0x421c7f, _0x4d5149) {                     return _0x421c7f == _0x4d5149;                 },                 'nnesO': _0x58451b(0x5a7),                 'DGjMN': function (_0x100ba, _0xa4a68c) {                     return _0x100ba == _0xa4a68c;                 },                 'bwIZA': _0x58451b(0x550),                 'BHlPP': function (_0x2c8e11, _0x38b72f) {                     return _0x2c8e11 == _0x38b72f;                 },                 'NhWbb': _0x58451b(0x4ca),                 'DQxZT': _0x58451b(0x40c),                 'ujjkf': _0x58451b(0x4e5),                 'kfNNq': function (_0x26be01, _0x3b6bd3) {                     return _0x26be01 == _0x3b6bd3;                 },                 'mTMvr': _0x58451b(0x4d5),                 'NNMrs': function (_0x13c7c6, _0x3ebaf9) {                     return _0x13c7c6 == _0x3ebaf9;                 },                 'LFure': _0x58451b(0x6ce),                 'LrIMs': _0x58451b(0x26e),                 'thmDl': _0x58451b(0x4c9),                 'xTRyw': _0x58451b(0x40f),                 'Rtger': _0x58451b(0x1f1),                 'asJJG': _0x58451b(0x55e),                 'UCIef': _0x58451b(0x6ae),                 'HTOWM': _0x58451b(0x711),                 'rvlfJ': function (_0x1f42b5, _0x3aa3da) {                     return _0x1f42b5 == _0x3aa3da;                 },                 'MZwec': _0x58451b(0x50c),                 'dEwyE': _0x58451b(0x1cf),                 'qFRbT': _0x58451b(0x2ca),                 'ZAiIn': _0x58451b(0x48d),                 'QfDHV': _0x58451b(0x32b),                 'RbLqL': _0x58451b(0x52d),                 'lMAlB': function (_0x3a38e3, _0x5787b0) {                     return _0x3a38e3 == _0x5787b0;                 },                 'CvvqG': function (_0x3e5276, _0xb8bf45) {                     return _0x3e5276 == _0xb8bf45;                 },                 'hUWlm': function (_0x3e3868, _0x5c9628) {                     return _0x3e3868 == _0x5c9628;                 },                 'yIMtB': _0x58451b(0x5b6),                 'eOfcE': function (_0x5c2229, _0x2a87c2) {                     return _0x5c2229 == _0x2a87c2;                 },                 'GZRIK': function (_0x5d81ee, _0xd6ac42) {                     return _0x5d81ee == _0xd6ac42;                 },                 'jTCxg': function (_0xee6c69, _0x5747d8) {                     return _0xee6c69 - _0x5747d8;                 },                 'bWzLx': _0x58451b(0x267),                 'tZeHq': _0x58451b(0x3ea) + _0x58451b(0x59b),                 'gjbgq': function (_0x38b7dc, _0x1b5523) {                     return _0x38b7dc == _0x1b5523;                 },                 'vctBi': function (_0x1f4f4c, _0x25aaba) {                     return _0x1f4f4c == _0x25aaba;                 },                 'RTrvZ': function (_0xa38dc5, _0x210ac4) {                     return _0xa38dc5 == _0x210ac4;                 }             };         if (_0x12ee1a[_0x58451b(0x1ee)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x71d)]))             _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x22d * 0x7 + -0x2 * -0xc9d + 0x9f5 * -0x1, -0xe9d + 0xb11 * 0x2 + -0x77b, -0xe9 * 0x4 + -0x2 * -0x93b + -0xec8), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x7f * -0x7 + -0xc47 + -0x128 * -0x11;         else {             if (_0x12ee1a[_0x58451b(0x1f8)](_0x181e61[_0x58451b(0x5d9)], '报警'))                 _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x22c9 + 0x1f81 + 0x6a * -0xa0, -0x2 * 0x56c + -0x32 * -0x3f + -0x16c, -0xd2 * -0x4 + 0x962 + 0xca * -0x10), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x1d2 + 0x12b * -0x1f + 0x264b;             else {                 if (_0x12ee1a[_0x58451b(0x235)](_0x181e61[_0x58451b(0x5d9)], '草坪'))                     _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x31f * 0x5 + -0x2605 + -0x4 * -0x59d, -0x7b6 + 0x586 * -0x3 + 0x1852 * 0x1, -0xe09 * 0x1 + 0x140c + -0x5f9), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x164f + -0x1 * -0xd13 + 0xed * -0x22;                 else {                     if (_0x12ee1a[_0x58451b(0x279)](_0x181e61[_0x58451b(0x5d9)], '地面'))                         _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x1f23 * -0x1 + -0xc8d + 0x2bba, -0x129d + -0x1 * 0x583 + -0x6 * -0x407, 0x2f * -0x6f + -0x1f93 + 0x33fe), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x499 * 0x3 + -0xef9 + 0x516;                     else {                         if (_0x12ee1a[_0x58451b(0x357)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x6c2)]))                             _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x218b * -0x1 + -0x6db + 0x2870, -0x17d7 + -0x2b7 * 0x1 + 0x4 * 0x6a6, -0xe46 + 0x6bb * 0x2 + 0x6d * 0x2), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x745 + 0x2523 + 0x2880 * -0x1;                         else {                             if (_0x12ee1a[_0x58451b(0x396)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x46d)]))                                 _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x25bd + -0xf2 * 0x21 + -0x44f9 * -0x1, -0x2531 * -0x1 + 0x1 * 0x216d + 0x2 * -0x234a, 0x4 * -0x9d + 0x111 + 0x16d), _0x181e61[_0x58451b(0x482)] = ![], _0x181e61[_0x58451b(0x6e1)]['y'] = -0x38 * 0x65 + -0x1ed4 + 0x38d4, locationFloor = _0x181e61;                             else {                                 if (_0x12ee1a[_0x58451b(0x5eb)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x6d8)]))                                     _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x1 * 0x62b + -0x92a + -0x309 * -0x1, 0x1c6a + 0x178 + -0x1dd8, -0x6a3 + -0x1 * -0xdff + -0x752), _0x181e61[_0x58451b(0x6e1)]['y'] = -0xd4a + -0xe58 + -0x16f * -0x16, duishichang1Room = _0x181e61, allRoomObjs[_0x58451b(0x43a)](_0x181e61);                                 else {                                     if (_0x12ee1a[_0x58451b(0x73d)](_0x181e61[_0x58451b(0x5d9)], '管道'))                                         _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x1d4d + -0x4c3 + 0x9 * 0x3ca, 0x2a * -0x2 + 0x997 * -0x1 + 0x9f5, 0x3 * 0x647 + -0x2fb + -0x17 * 0xb0), _0x181e61[_0x58451b(0x6e1)]['y'] = -0x22cf * -0x1 + 0x1 * -0xc63 + -0x1284, GDmodel = _0x181e61, _0x181e61[_0x58451b(0x6f1)](_0x3e38df => {                                             const _0x3b16ed = _0x58451b, _0x456348 = {                                                     'kSKhj': function (_0x480488, _0x12a299) {                                                         const _0x5d9c51 = _0x5508;                                                         return _0x12ee1a[_0x5d9c51(0x641)](_0x480488, _0x12a299);                                                     },                                                     'SEDVJ': _0x12ee1a[_0x3b16ed(0x234)],                                                     'JGgmP': _0x12ee1a[_0x3b16ed(0x71e)],                                                     'NgIPP': function (_0x37a634, _0x692b94) {                                                         const _0x1c2eb6 = _0x3b16ed;                                                         return _0x12ee1a[_0x1c2eb6(0x641)](_0x37a634, _0x692b94);                                                     },                                                     'JzfXM': _0x12ee1a[_0x3b16ed(0x6b1)],                                                     'faWrn': _0x12ee1a[_0x3b16ed(0x44a)],                                                     'vyjmq': function (_0x3e3747, _0x260f7e) {                                                         const _0xaaacc6 = _0x3b16ed;                                                         return _0x12ee1a[_0xaaacc6(0x5f3)](_0x3e3747, _0x260f7e);                                                     },                                                     'ZLURA': _0x12ee1a[_0x3b16ed(0x71b)],                                                     'pRHlx': _0x12ee1a[_0x3b16ed(0x285)],                                                     'Ahnnu': function (_0x210c63, _0x3d422d) {                                                         const _0xaa8459 = _0x3b16ed;                                                         return _0x12ee1a[_0xaa8459(0x641)](_0x210c63, _0x3d422d);                                                     },                                                     'OPnhC': _0x12ee1a[_0x3b16ed(0x304)],                                                     'WDOJV': function (_0x3655d6, _0x2dd06f) {                                                         const _0x33f612 = _0x3b16ed;                                                         return _0x12ee1a[_0x33f612(0x2f7)](_0x3655d6, _0x2dd06f);                                                     },                                                     'dscqs': _0x12ee1a[_0x3b16ed(0x4c6)],                                                     'RdeWa': _0x12ee1a[_0x3b16ed(0x590)],                                                     'DloVB': function (_0x43abd4, _0x446e30) {                                                         const _0x547e25 = _0x3b16ed;                                                         return _0x12ee1a[_0x547e25(0x641)](_0x43abd4, _0x446e30);                                                     },                                                     'vstXR': _0x12ee1a[_0x3b16ed(0x24c)],                                                     'IgnLi': function (_0x2b2a4e, _0x4d1b7d) {                                                         const _0x442eeb = _0x3b16ed;                                                         return _0x12ee1a[_0x442eeb(0x641)](_0x2b2a4e, _0x4d1b7d);                                                     },                                                     'cfadt': _0x12ee1a[_0x3b16ed(0x502)],                                                     'OqjFb': function (_0x3863a4, _0x49c3b9) {                                                         const _0x4f1b13 = _0x3b16ed;                                                         return _0x12ee1a[_0x4f1b13(0x5f3)](_0x3863a4, _0x49c3b9);                                                     },                                                     'boDQA': _0x12ee1a[_0x3b16ed(0x3b6)],                                                     'xVvyS': _0x12ee1a[_0x3b16ed(0x369)]                                                 };                                             _0x12ee1a[_0x3b16ed(0x2f7)](_0x3e38df[_0x3b16ed(0x474)], _0x12ee1a[_0x3b16ed(0x480)]) && (_0x12ee1a[_0x3b16ed(0x566)](_0x3e38df[_0x3b16ed(0x5d9)], '管道') && _0x3e38df[_0x3b16ed(0x6f1)](_0x449493 => {                                                 const _0x555825 = _0x3b16ed;                                                 if (_0x456348[_0x555825(0x539)](_0x449493[_0x555825(0x5d9)], _0x456348[_0x555825(0x3c9)]))                                                     GDoutboxYSKQ = _0x449493;                                                 else {                                                     if (_0x456348[_0x555825(0x539)](_0x449493[_0x555825(0x5d9)], '水管'))                                                         GDoutboxSG = _0x449493;                                                     else {                                                         if (_0x456348[_0x555825(0x539)](_0x449493[_0x555825(0x5d9)], _0x456348[_0x555825(0x258)]))                                                             GDoutboxSS = _0x449493;                                                         else {                                                             if (_0x456348[_0x555825(0x390)](_0x449493[_0x555825(0x5d9)], _0x456348[_0x555825(0x39c)]))                                                                 GDoutboxLZFJ = _0x449493;                                                             else {                                                                 if (_0x456348[_0x555825(0x390)](_0x449493[_0x555825(0x5d9)], _0x456348[_0x555825(0x29b)]))                                                                     GDoutboxDQ = _0x449493;                                                                 else {                                                                     if (_0x456348[_0x555825(0x48b)](_0x449493[_0x555825(0x5d9)], _0x456348[_0x555825(0x24d)]))                                                                         GDoutboxCXFFJ = _0x449493;                                                                     else                                                                         (_0x456348[_0x555825(0x390)](_0x449493[_0x555825(0x5d9)], _0x456348[_0x555825(0x70f)]) || _0x456348[_0x555825(0x321)](_0x449493[_0x555825(0x5d9)], _0x456348[_0x555825(0x52c)])) && GDotherBox[_0x555825(0x43a)](_0x449493);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }), _0x12ee1a[_0x3b16ed(0x5f3)](_0x3e38df[_0x3b16ed(0x5d9)], _0x12ee1a[_0x3b16ed(0x1f7)]) && (_0x3e38df[_0x3b16ed(0x482)] = ![], _0x3e38df[_0x3b16ed(0x6f1)](_0xef1e24 => {                                                 const _0x5a4a6a = _0x3b16ed;                                                 if (_0x456348[_0x5a4a6a(0x3f9)](_0xef1e24[_0x5a4a6a(0x5d9)], _0x456348[_0x5a4a6a(0x510)]))                                                     GDmovingCXFFJ = _0xef1e24;                                                 else {                                                     if (_0x456348[_0x5a4a6a(0x390)](_0xef1e24[_0x5a4a6a(0x5d9)], _0x456348[_0x5a4a6a(0x612)]))                                                         GDmovingSS = _0xef1e24;                                                     else {                                                         if (_0x456348[_0x5a4a6a(0x261)](_0xef1e24[_0x5a4a6a(0x5d9)], _0x456348[_0x5a4a6a(0x56f)]))                                                             GDmovingLZFJ = _0xef1e24;                                                         else {                                                             if (_0x456348[_0x5a4a6a(0x1b1)](_0xef1e24[_0x5a4a6a(0x5d9)], _0x456348[_0x5a4a6a(0x41d)]))                                                                 GDmovingYSKQ = _0xef1e24;                                                             else {                                                                 if (_0x456348[_0x5a4a6a(0x1ef)](_0xef1e24[_0x5a4a6a(0x5d9)], _0x456348[_0x5a4a6a(0x429)]))                                                                     GDmovingSG = _0xef1e24;                                                                 else                                                                     _0x456348[_0x5a4a6a(0x390)](_0xef1e24[_0x5a4a6a(0x5d9)], _0x456348[_0x5a4a6a(0x4f3)]) && (GDmovingDQ = _0xef1e24);                                                             }                                                         }                                                     }                                                 }                                                 _0xef1e24[_0x5a4a6a(0x597)] && (_0xef1e24[_0x5a4a6a(0x359)][_0x5a4a6a(0x5dd)] = null, _0xef1e24[_0x5a4a6a(0x359)][_0x5a4a6a(0x5e2) + 't'] = !![], _0xef1e24[_0x5a4a6a(0x359)][_0x5a4a6a(0x296)] = ![], _0xef1e24[_0x5a4a6a(0x73a) + 'r'] = 0xa2f + 0xe5d + 0xe * -0x132);                                             })));                                         });                                     else {                                         if (_0x12ee1a[_0x58451b(0x404)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x4e7)]))                                             _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x1e6d + -0x2567 + 0x382 * 0x2, 0x1585 + -0x8 * 0x369 + 0x5cd, 0x324 + 0x2f * 0xb7 + -0x5 * 0x757), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x77a + 0xda5 + -0x1137, junhuaRoom = _0x181e61, allRoomObjs[_0x58451b(0x43a)](_0x181e61);                                         else {                                             if (_0x12ee1a[_0x58451b(0x49b)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x198)])) {                                                 const _0x30948b = _0x12ee1a[_0x58451b(0x5cf)][_0x58451b(0x44f)]('|');                                                 let _0x395619 = -0xbdb + -0x2 * -0xd87 + -0xf33;                                                 while (!![]) {                                                     switch (_0x30948b[_0x395619++]) {                                                     case '0':                                                         _0x181e61[_0x58451b(0x6e1)]['y'] = 0x17a9 * -0x1 + -0x32 * 0xb9 + 0x3fb3;                                                         continue;                                                     case '1':                                                         allRoomObjs[_0x58451b(0x43a)](_0x181e61);                                                         continue;                                                     case '2':                                                         _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x84c + 0xba9 + 0x1 * -0x13eb, 0x72f + 0x202a * -0x1 + -0x3d * -0x69, 0x35 * -0x83 + -0xacd + 0x25f6);                                                         continue;                                                     case '3':                                                         limoRoom = _0x181e61;                                                         continue;                                                     case '4':                                                         _0x181e61[_0x58451b(0x6f1)](_0xb68d92 => {                                                             const _0x4855ac = _0x58451b;                                                             _0x12ee1a[_0x4855ac(0x641)](_0xb68d92[_0x4855ac(0x474)], _0x12ee1a[_0x4855ac(0x480)]) && (_0x12ee1a[_0x4855ac(0x61d)](_0xb68d92[_0x4855ac(0x5d9)], _0x12ee1a[_0x4855ac(0x65a)]) && (_0xb68d92[_0x4855ac(0x482)] = ![]));                                                         });                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x12ee1a[_0x58451b(0x1f2)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x65a)])) {                                                     moveingRobot = _0x181e61, _0x181e61[_0x58451b(0x26b)][_0x58451b(0x32c)] = 0x1a3 * -0xe + 0x1735 + -0x4a, _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x89e + -0xb * 0xfd + 0x1387, -0xa1b + -0x1 * -0x1411 + -0x9ec, -0x367 + -0x2707 + 0x2a78), _0x181e61[_0x58451b(0x6e1)][_0x58451b(0x30b)](-(0x7bb + 0x2 * -0x657 + -0x193 * -0xb + 0.6799999999998363), _0x12ee1a[_0x58451b(0x728)](-0x1 * -0x1cb7 + 0x5f7 + -0x21d8 + 0.6399999999999864, 0x1d11 + 0x3 * 0x634 + -0x2faa + 0.33000000000000007), -(0x659 + -0x1685 + 0x160c + 0.029999999999972715)), _0x181e61[_0x58451b(0x210)](-(-0x1d0e + -0xe77 + 0x388f + 0.21000000000003638), _0x12ee1a[_0x58451b(0x728)](-0xb47 + -0x149 * 0x2 + 0xeaf + 0.6399999999999864, 0xb98 + -0x12ae + 0x719 + 0.33000000000000007), -(-0x2660 + 0x1762 + 0x14dd + 0.9500000000000455));                                                     let _0x38d2a1 = new THREE[(_0x58451b(0x251)) + (_0x58451b(0x2df))](-0x2508 + 0x254b + -0x42 * 0x1, -0x2 * -0x2bd + 0x15d3 + 0x6d3 * -0x4), _0x1cd90d = new THREE[(_0x58451b(0x2c5)) + (_0x58451b(0x376))]({                                                             'color': 0xffff00,                                                             'side': THREE[_0x58451b(0x65d)]                                                         }), _0x3603b8 = new THREE[(_0x58451b(0x4c7))](_0x38d2a1, _0x1cd90d);                                                     _0x3603b8[_0x58451b(0x5d9)] = _0x12ee1a[_0x58451b(0x387)], _0x3603b8[_0x58451b(0x6e1)][_0x58451b(0x30b)](0x209a + -0x1a52 + 0xe5 * -0x7, -0x2 * -0xb05 + -0x2 * -0x11c5 + -0x398c, 0x7 * -0x3d7 + 0x2cd * -0x5 + 0x28e2 * 0x1), _0x3603b8[_0x58451b(0x482)] = ![], _0x181e61[_0x58451b(0x59d)](_0x3603b8);                                                     let _0x2ab39e = _0x12ee1a[_0x58451b(0x700)](makeTextSprite, _0x12ee1a[_0x58451b(0x703)], {                                                         'fontsize': 0x14,                                                         'borderColor': {                                                             'r': 0xff,                                                             'g': 0x0,                                                             'b': 0x0,                                                             'a': 0.4                                                         },                                                         'backgroundColor': {                                                             'r': 0xff,                                                             'g': 0xff,                                                             'b': 0xff,                                                             'a': 0.9                                                         },                                                         'size': [                                                             0x1 * -0x1ec3 + -0x1c94 + 0x3b58,                                                             -0x114 + 0x18a + -0x75 + 0.5                                                         ]                                                     });                                                     _0x2ab39e[_0x58451b(0x662)] = new THREE[(_0x58451b(0x516))](-0x29b * 0xe + -0x1448 + 0x38c2 + 0.5, 0x14 * -0x116 + 0x1330 + 0x289), _0x2ab39e[_0x58451b(0x6e1)][_0x58451b(0x30b)](-0x1a1c + -0x991 + -0x23ad * -0x1, 0x6b * -0x11 + 0x146e * -0x1 + -0x6 * -0x497 + 0.19999999999999996, -0xcc8 + -0xc8 * 0x25 + 0x29b0), _0x2ab39e[_0x58451b(0x5d9)] = _0x12ee1a[_0x58451b(0x4e4)], _0x181e61[_0x58451b(0x59d)](_0x2ab39e), allRoomObjs[_0x58451b(0x43a)](_0x181e61);                                                 } else {                                                     if (_0x12ee1a[_0x58451b(0x316)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x72b)]))                                                         _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x5b8 + 0xbed * 0x3 + -0x1e05, 0x1b00 + 0x2525 + -0x401b, 0x1063 + 0x1 * 0xeee + 0x33 * -0x9d), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x54 * -0xe + -0xe13 + 0x1693 * 0x1, posuiRoom = _0x181e61, allRoomObjs[_0x58451b(0x43a)](_0x181e61);                                                     else {                                                         if (_0x12ee1a[_0x58451b(0x5c7)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x642)]))                                                             _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x1037 + 0x1d44 + -0xd03, -0x2549 + -0x1632 + 0x9 * 0x69d, -0x2078 + 0x71 * 0x39 + 0x759), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x20ee + 0x1f8c + -0x3c92, shaifenRoom = _0x181e61, allRoomObjs[_0x58451b(0x43a)](_0x181e61);                                                         else {                                                             if (_0x12ee1a[_0x58451b(0x546)](_0x181e61[_0x58451b(0x5d9)], '树'))                                                                 _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x740 + -0x3 * -0x821 + -0x1119, -0x525 + -0x23e2 + 0x2911, 0x197 + 0x2 * 0x4f7 + -0x1 * 0xb7b), _0x181e61[_0x58451b(0x6e1)]['y'] = 0x3 * -0x35b + 0x1f * 0xa7 + -0x32 * 0x20;                                                             else {                                                                 if (_0x12ee1a[_0x58451b(0x1ee)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x384)]))                                                                     _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x1906 + -0x1335 + -0x2c45 * -0x1, -0x14d5 + -0xad * 0xb + 0x2 * 0xe27, -0x159e + -0x1218 + 0x27c0), _0x181e61[_0x58451b(0x482)] = ![], _0x181e61[_0x58451b(0x6e1)]['y'] = 0x1aba + -0x24b * 0x5 + -0xb5b, fourColorPic = _0x181e61;                                                                 else {                                                                     if (_0x12ee1a[_0x58451b(0x316)](_0x181e61[_0x58451b(0x5d9)], _0x12ee1a[_0x58451b(0x51f)]))                                                                         _0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](0x2e7 * -0xd + -0x19a + -0x275f * -0x1, 0x85e + -0xd1 + 0x783 * -0x1, 0x48e * -0x1 + -0x7 * -0x3f5 + -0x171b), _0x181e61[_0x58451b(0x6e1)]['y'] = -0x3c2 + 0xec + 0x35f * 0x2, suishiRoom = _0x181e61, allRoomObjs[_0x58451b(0x43a)](_0x181e61);                                                                     else                                                                         _0x12ee1a[_0x58451b(0x2b1)](_0x181e61[_0x58451b(0x5d9)], '车') && (_0x181e61[_0x58451b(0x3e0)][_0x58451b(0x30b)](-0x2f5 * -0xd + 0x11f3 + 0x1c2d * -0x2, -0x184a * -0x1 + 0x269b + -0x3edb, 0x20c + 0x947 + -0xb49), _0x181e61[_0x58451b(0x6e1)][_0x58451b(0x30b)](-(0x1fd3 * -0x1 + -0x214b + 0x483c + 0.9900000000000091), -0xfaa + 0x1d40 + 0x2 * -0x676, -(0x1 * -0x1319 + 0x1da4 + -0x1d7 + 0.42000000000007276)), _0x181e61[_0x58451b(0x482)] = ![], carMesh = _0x181e61);                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 }             }         }         _0x181e61[_0x58451b(0x6f1)](_0x308751 => {             const _0x5a7724 = _0x58451b, _0x4baf63 = {                     'KhMHg': function (_0xd33ccc, _0x1705a6) {                         const _0x4994fb = _0x5508;                         return _0x12ee1a[_0x4994fb(0x6c1)](_0xd33ccc, _0x1705a6);                     },                     'nBAqF': _0x12ee1a[_0x5a7724(0x352)],                     'aLQUy': _0x12ee1a[_0x5a7724(0x5cc)],                     'CPlHc': function (_0xa4b776, _0x2fe34c) {                         const _0x31c22e = _0x5a7724;                         return _0x12ee1a[_0x31c22e(0x64c)](_0xa4b776, _0x2fe34c);                     },                     'azOzD': _0x12ee1a[_0x5a7724(0x5e0)],                     'msjgk': _0x12ee1a[_0x5a7724(0x218)],                     'wsbuK': function (_0x3d7673, _0x36d09) {                         const _0x3e7694 = _0x5a7724;                         return _0x12ee1a[_0x3e7694(0x641)](_0x3d7673, _0x36d09);                     },                     'lWZtl': _0x12ee1a[_0x5a7724(0x5f8)],                     'vLpsA': _0x12ee1a[_0x5a7724(0x270)],                     'hgXXi': function (_0x1fe2e8, _0x27455a) {                         const _0x128232 = _0x5a7724;                         return _0x12ee1a[_0x128232(0x31e)](_0x1fe2e8, _0x27455a);                     },                     'NmFdz': _0x12ee1a[_0x5a7724(0x695)],                     'ONZEO': _0x12ee1a[_0x5a7724(0x603)],                     'WXIUn': function (_0x1aa32a, _0x145291) {                         const _0x4c9516 = _0x5a7724;                         return _0x12ee1a[_0x4c9516(0x641)](_0x1aa32a, _0x145291);                     },                     'XsRyD': _0x12ee1a[_0x5a7724(0x62e)],                     'lDtPS': _0x12ee1a[_0x5a7724(0x403)],                     'zctVq': _0x12ee1a[_0x5a7724(0x5f4)],                     'isVek': _0x12ee1a[_0x5a7724(0x63d)],                     'Upyef': function (_0x43a476, _0xfd09ee) {                         const _0x2a8b73 = _0x5a7724;                         return _0x12ee1a[_0x2a8b73(0x60c)](_0x43a476, _0xfd09ee);                     },                     'pdjuD': _0x12ee1a[_0x5a7724(0x6f8)],                     'OJYDP': _0x12ee1a[_0x5a7724(0x39a)],                     'bvGQT': function (_0x1bb73f, _0x3fe639) {                         const _0x182336 = _0x5a7724;                         return _0x12ee1a[_0x182336(0x31e)](_0x1bb73f, _0x3fe639);                     },                     'fNnyB': _0x12ee1a[_0x5a7724(0x4f6)],                     'EBsBP': _0x12ee1a[_0x5a7724(0x329)],                     'vpcat': function (_0x3e1f98, _0x3051e1) {                         const _0x11c7ab = _0x5a7724;                         return _0x12ee1a[_0x11c7ab(0x6a2)](_0x3e1f98, _0x3051e1);                     },                     'AmNzx': _0x12ee1a[_0x5a7724(0x740)],                     'rmrqU': function (_0x2bd831, _0x6e586a) {                         const _0x18534d = _0x5a7724;                         return _0x12ee1a[_0x18534d(0x5d4)](_0x2bd831, _0x6e586a);                     },                     'DVFGK': _0x12ee1a[_0x5a7724(0x4c4)],                     'wYOsD': _0x12ee1a[_0x5a7724(0x21f)],                     'towWJ': _0x12ee1a[_0x5a7724(0x211)],                     'BOfhw': _0x12ee1a[_0x5a7724(0x4f0)],                     'qetHQ': _0x12ee1a[_0x5a7724(0x1a9)],                     'cmmNm': _0x12ee1a[_0x5a7724(0x224)],                     'aNrbs': _0x12ee1a[_0x5a7724(0x75a)],                     'nISRx': _0x12ee1a[_0x5a7724(0x3bf)],                     'aFaAK': _0x12ee1a[_0x5a7724(0x6ca)],                     'FAwOf': _0x12ee1a[_0x5a7724(0x67c)],                     'UvwZn': function (_0x117c3d, _0x46fb32) {                         const _0x87a5c6 = _0x5a7724;                         return _0x12ee1a[_0x87a5c6(0x32e)](_0x117c3d, _0x46fb32);                     },                     'hbhQb': _0x12ee1a[_0x5a7724(0x57c)],                     'cUSEa': _0x12ee1a[_0x5a7724(0x667)],                     'jXQhN': _0x12ee1a[_0x5a7724(0x462)],                     'VvVuB': _0x12ee1a[_0x5a7724(0x25e)],                     'zHwXy': _0x12ee1a[_0x5a7724(0x5ed)],                     'BUNmK': _0x12ee1a[_0x5a7724(0x6d5)],                     'ckNic': _0x12ee1a[_0x5a7724(0x41c)],                     'JpsKw': _0x12ee1a[_0x5a7724(0x5bb)],                     'RexGC': _0x12ee1a[_0x5a7724(0x351)],                     'HDxKN': _0x12ee1a[_0x5a7724(0x599)],                     'LQhrN': _0x12ee1a[_0x5a7724(0x483)],                     'KHjbh': _0x12ee1a[_0x5a7724(0x1df)],                     'jJOeO': _0x12ee1a[_0x5a7724(0x5d5)],                     'ckrVq': _0x12ee1a[_0x5a7724(0x757)],                     'VIolh': _0x12ee1a[_0x5a7724(0x588)],                     'uDfAq': _0x12ee1a[_0x5a7724(0x54f)],                     'pxmcl': _0x12ee1a[_0x5a7724(0x423)],                     'FEelg': function (_0x16e1b0, _0x18c128) {                         const _0x12140a = _0x5a7724;                         return _0x12ee1a[_0x12140a(0x2ff)](_0x16e1b0, _0x18c128);                     },                     'OcutX': _0x12ee1a[_0x5a7724(0x515)],                     'hMHYZ': _0x12ee1a[_0x5a7724(0x4d0)],                     'VkCxG': _0x12ee1a[_0x5a7724(0x72c)],                     'wCeOu': _0x12ee1a[_0x5a7724(0x579)],                     'adsIE': _0x12ee1a[_0x5a7724(0x688)],                     'NqKNN': _0x12ee1a[_0x5a7724(0x598)],                     'cdujG': _0x12ee1a[_0x5a7724(0x320)],                     'eWcFX': _0x12ee1a[_0x5a7724(0x68e)],                     'QXiHr': _0x12ee1a[_0x5a7724(0x272)],                     'vVAMp': _0x12ee1a[_0x5a7724(0x6c5)]                 };             if (_0x308751[_0x5a7724(0x597)]) {                 _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x6fe)]) && (_0x308751[_0x5a7724(0x359)][_0x5a7724(0x5e2) + 't'] = !![], _0x308751[_0x5a7724(0x73a) + 'r'] = -0x25 * -0xef + -0x8b3 + -0x1910);                 if (_0x12ee1a[_0x5a7724(0x279)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x23d)]) || _0x12ee1a[_0x5a7724(0x279)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x445)]) || _0x12ee1a[_0x5a7724(0x22d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5e7)]) || _0x12ee1a[_0x5a7724(0x61d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x367)]) || _0x12ee1a[_0x5a7724(0x303)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4b8)]) || _0x12ee1a[_0x5a7724(0x22d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x500)]) || _0x12ee1a[_0x5a7724(0x693)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x368)]) || _0x12ee1a[_0x5a7724(0x22d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4f9)]) || _0x12ee1a[_0x5a7724(0x257)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x33e)]))                     _0x308751[_0x5a7724(0x3f3) + _0x5a7724(0x5cd)] = ![];                 else {                     if (_0x12ee1a[_0x5a7724(0x303)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3f5)]) || _0x12ee1a[_0x5a7724(0x525)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x40a)])) {                         const _0x32f025 = _0x12ee1a[_0x5a7724(0x71a)][_0x5a7724(0x44f)]('|');                         let _0x31d1 = 0x1 * -0x2541 + -0xb67 + 0x30a8;                         while (!![]) {                             switch (_0x32f025[_0x31d1++]) {                             case '0':                                 _0x308751[_0x5a7724(0x359)][_0x5a7724(0x626)] = -0x18 * -0x12 + -0x1ed3 + 0x1d23 + 0.5;                                 continue;                             case '1':                                 _0x308751[_0x5a7724(0x3f3) + _0x5a7724(0x5cd)] = ![];                                 continue;                             case '2':                                 _0x308751[_0x5a7724(0x359)][_0x5a7724(0x5e2) + 't'] = !![];                                 continue;                             case '3':                                 _0x308751[_0x5a7724(0x48f)] = ![];                                 continue;                             case '4':                                 _0x308751[_0x5a7724(0x73a) + 'r'] = -0x141 * 0x1b + 0x268e + -0x373 * 0x1;                                 continue;                             }                             break;                         }                     } else {                         if (_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x6da)]))                             _0x308751[_0x5a7724(0x359)][_0x5a7724(0x62c)] = 0x2543 * 0x1 + 0xcb9 * -0x2 + 0x5 * -0x25d, _0x308751[_0x5a7724(0x359)][_0x5a7724(0x42b)] = 0xcb * 0x31 + 0x8a1 + -0x2f7c + 0.3;                         else {                             if (_0x12ee1a[_0x5a7724(0x693)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x747)]))                                 _0x308751[_0x5a7724(0x359)][_0x5a7724(0x5e2) + 't'] = !![], _0x308751[_0x5a7724(0x73a) + 'r'] = 0x612 * -0x2 + -0x6de + -0x4 * -0x513;                             else                                 (_0x12ee1a[_0x5a7724(0x4d2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4de)]) || _0x12ee1a[_0x5a7724(0x279)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x65e)])) && (_0x308751[_0x5a7724(0x482)] = ![]);                         }                     }                 }                 if (_0x12ee1a[_0x5a7724(0x6a2)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x384)])) {                     const _0x29de23 = _0x12ee1a[_0x5a7724(0x68d)][_0x5a7724(0x44f)]('|');                     let _0x1ee2e0 = 0xd69 + -0xcb7 + -0xb2;                     while (!![]) {                         switch (_0x29de23[_0x1ee2e0++]) {                         case '0':                             _0x308751[_0x5a7724(0x3f3) + _0x5a7724(0x5cd)] = ![];                             continue;                         case '1':                             _0x308751[_0x5a7724(0x359)][_0x5a7724(0x296)] = ![];                             continue;                         case '2':                             _0x12ee1a[_0x5a7724(0x1b4)](setOpacityMaterial, _0x308751);                             continue;                         case '3':                             _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x3fc)]) ? _0x308751[_0x5a7724(0x73a) + 'r'] = -0x1 * 0x15ce + -0xf35 + 0x2639 : _0x308751[_0x5a7724(0x73a) + 'r'] = -0x56 * 0x59 + -0x1d76 + 0x3c88;                             continue;                         case '4':                             _0x308751[_0x5a7724(0x48f)] = ![];                             continue;                         }                         break;                     }                 } else {                     if (_0x12ee1a[_0x5a7724(0x5f3)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x71d)])) {                         const _0x6f20f3 = _0x12ee1a[_0x5a7724(0x604)][_0x5a7724(0x44f)]('|');                         let _0x2f26d1 = -0x2 * -0x5e9 + -0x254 + -0x4bf * 0x2;                         while (!![]) {                             switch (_0x6f20f3[_0x2f26d1++]) {                             case '0':                                 container[_0x5a7724(0x3d4)](_0x308751);                                 continue;                             case '1':                                 roadPlane[_0x5a7724(0x43a)](_0x308751);                                 continue;                             case '2':                                 _0x308751[_0x5a7724(0x482)] = ![];                                 continue;                             case '3':                                 _0x308751[_0x5a7724(0x48f)] = ![];                                 continue;                             case '4':                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x2ba) + 'ty'] = !![];                                 continue;                             case '5':                                 _0x308751[_0x5a7724(0x3f3) + _0x5a7724(0x5cd)] = ![];                                 continue;                             }                             break;                         }                     } else {                         if (_0x12ee1a[_0x5a7724(0x52a)](_0x181e61[_0x5a7724(0x5d9)], '树'))                             _0x308751[_0x5a7724(0x73a) + 'r'] = 0x6 * 0x419 + 0xe9 * 0x13 + -0x28ab;                         else                             (_0x12ee1a[_0x5a7724(0x5df)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6c2)]) || _0x12ee1a[_0x5a7724(0x693)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6d8)]) || _0x12ee1a[_0x5a7724(0x5f3)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4e7)]) || _0x12ee1a[_0x5a7724(0x4a6)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x198)]) || _0x12ee1a[_0x5a7724(0x5d4)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x72b)]) || _0x12ee1a[_0x5a7724(0x5f3)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x642)]) || _0x12ee1a[_0x5a7724(0x61d)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x51f)])) && allOutSideBuild[_0x5a7724(0x43a)](_0x308751);                     }                 }                 (_0x12ee1a[_0x5a7724(0x493)](_0x181e61[_0x5a7724(0x5d9)], '草坪') || _0x12ee1a[_0x5a7724(0x563)](_0x181e61[_0x5a7724(0x5d9)], '地面')) && _0x12ee1a[_0x5a7724(0x583)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x747)]) && _0x12ee1a[_0x5a7724(0x583)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3f5)]) && _0x12ee1a[_0x5a7724(0x3e5)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x40a)]) && (_0x308751[_0x5a7724(0x359)][_0x5a7724(0x5e2) + 't'] = ![]);                 if (_0x12ee1a[_0x5a7724(0x2c2)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x198)])) {                     if (_0x12ee1a[_0x5a7724(0x279)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3a8)]) || _0x12ee1a[_0x5a7724(0x73d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2e0)]) || _0x12ee1a[_0x5a7724(0x66b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x687)]) || _0x12ee1a[_0x5a7724(0x3f2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5e8)]) || _0x12ee1a[_0x5a7724(0x6a2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x676)]) || _0x12ee1a[_0x5a7724(0x465)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x477)]) || _0x12ee1a[_0x5a7724(0x3bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x442)]) || _0x12ee1a[_0x5a7724(0x31e)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x373)])) {                         if (_0x12ee1a[_0x5a7724(0x30a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2e0)]))                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x632)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                 -(-0xf62 + -0x183 * -0x6 + -0x735 * -0x3 + 0.13000000000010914),                                 -0x1 * 0x166d + 0x24a * 0xa + 0x3b * -0x1 + 0.7000000000000028,                                 -(-0x1 * -0x2087 + -0x232b + 0x7ef + 0.4700000000000273)                             ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                 -(0x15e6 + 0x2692 + -0x2db4 + 0.8220000000001164),                                 -0x919 + 0x13 * 0x14f + -0x13 * 0xcd + 0.12569999999999482,                                 -(0x1f5a + -0x1c58 + -0x1c * -0x13 + 0.5217000000000098)                             ];                         else {                             if (_0x12ee1a[_0x5a7724(0x237)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x687)]))                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x3c1)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                     -(0x42 * 0x7f + 0x611 * 0x4 + -0x2a20 + 0.09999999999990905),                                     -0x3 * 0xa7f + -0x1 * -0x15bf + 0x49 * 0x23 + 0.13000000000000256,                                     -(-0x8ca + -0x821 * 0x3 + 0x133c * 0x2 + 0.4700000000000273)                                 ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                     -(0x13e7 + 0x21e2 + -0xc * 0x348 + 0.09639999999990323),                                     -0x3 * -0x6b9 + -0xaed + 0x9 * -0xf9 + 0.747799999999998,                                     -(-0x17 * -0x57 + -0x1 * -0x243d + -0x2c8 * 0xe + 0.08330000000000837)                                 ];                             else {                                 if (_0x12ee1a[_0x5a7724(0x19a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5e8)]))                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x27f)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(0x1 * -0x836 + 0xa5a + -0xc51 * -0x1 + 0.40000000000009095),                                         -0x1609 * 0x1 + -0x1 * -0x1e8f + 0x425 * -0x2 + 0.7000000000000028,                                         -(-0x315 * -0x3 + -0x241 * -0xf + -0x25c3 + 0.4700000000000273)                                     ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(0x2653 + 0xd91 * -0x1 + 0xacb * -0x1 + 0.17270000000007713),                                         0x2ef * 0x8 + -0x674 + 0x60 * -0x2c + 0.37760000000000105,                                         -(0xfa9 + 0x11b * 0x1b + 0x814 * -0x5 + 0.06400000000007822)                                     ];                                 else {                                     if (_0x12ee1a[_0x5a7724(0x3bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x676)]))                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6f5)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                             -(-0x1abb + 0x73a + -0x3 * -0xb26 + 0.8000000000001819),                                             0x2287 * -0x1 + -0x146f + 0x3732 + 0.759999999999998,                                             -(-0x25fb + -0x35 * -0x2a + 0x8a5 * 0x4 + 0.4700000000000273)                                         ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                             -(-0xf08 + 0x1 * -0x1b1b + 0x3791 + 0.4108000000001084),                                             0x759 + -0x815 + -0x17 * -0xe + 0.29110000000000014,                                             -(0x1 * -0x14db + 0x35 * 0xb5 + -0xb89 + 0.04680000000007567)                                         ];                                     else {                                         if (_0x12ee1a[_0x5a7724(0x408)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x477)]))                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x631)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                 -(0x1a * -0x71 + 0xb89 + 0xd6a + 0.23999999999978172),                                                 0x3 * 0x7b5 + -0x104e * 0x1 + 0x694 * -0x1 + 0.240000000000002,                                                 -(-0x1f77 + 0x1 * 0x1ac2 + 0xa00 + 0.4700000000000273)                                             ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                 -(0x1 * -0x6d3 + -0x1977 + 0x2d3e + 0.14550000000008367),                                                 -0x20a4 + -0xa * -0x101 + 0x7b1 * 0x3 + 0.7939999999999969,                                                 -(-0x15d * -0x9 + 0xdfb + -0x151f + 0.615500000000111)                                             ];                                         else {                                             if (_0x12ee1a[_0x5a7724(0x5eb)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x442)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4a0)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(-0x665 + -0x5a0 + -0x1ec * -0xd + 0.0500000000001819),                                                     -0x43 * -0x31 + 0x25c2 + -0x3258 + 0.5600000000000023,                                                     -(0x1599 + 0x4 * -0x571 + 0x3 * 0x1d2 + 0.4700000000000273)                                                 ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(-0x19c2 + -0x415 + 0x2a5b + 0.5981000000001586),                                                     -0x39 * 0x5 + 0x1 * 0xead + -0xd14 + 0.6037000000000035,                                                     -(-0xd * 0x1e1 + 0x5 * -0x1f4 + -0x59e * -0x7 + 0.42249999999989996)                                                 ];                                             else                                                 _0x12ee1a[_0x5a7724(0x2e5)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x373)]) && (_0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x47e)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(-0xa97 * -0x1 + 0x152 + -0x6 * -0x1b + 0.5300000000002001),                                                     -0x5eb * 0x4 + -0x3 * 0x3eb + 0x23aa + 0.5200000000000031,                                                     -(0x115 + 0xba2 + -0x76c + 0.4700000000000273)                                                 ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(0x1471 * 0x1 + 0x1c49 + -0x3 * 0xc39 + 0.7321000000001732),                                                     -0x1e0c * 0x1 + -0x1 * -0x473 + 0x8b1 * 0x3 + 0.6145000000000067,                                                     -(0x1b26 + -0x1e38 + -0x832 * -0x1 + 0.8221000000000913)                                                 ]);                                         }                                     }                                 }                             }                         }                         let _0x4d0c89 = _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x4fe)](0x161c + -0x50a + -0x110d, -0x21a3 + 0x132e * 0x1 + 0xe7b);                         _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x6c1)](_0x12ee1a[_0x5a7724(0x4c3)], _0x4d0c89), limoClickObjs[_0x5a7724(0x43a)](_0x308751);                     } else {                         if (_0x12ee1a[_0x5a7724(0x4e6)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x723)]) || _0x12ee1a[_0x5a7724(0x24b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6a7)]) || _0x12ee1a[_0x5a7724(0x3f2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x523)]) || _0x12ee1a[_0x5a7724(0x517)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x55f)]) || _0x12ee1a[_0x5a7724(0x450)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x44b)]) || _0x12ee1a[_0x5a7724(0x38c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5f1)]) || _0x12ee1a[_0x5a7724(0x345)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5b4)]) || _0x12ee1a[_0x5a7724(0x19a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x537)])) {                             let _0x7557fe = _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x4fe)](-0x15ef + 0x2f * 0x8e + -0x41d);                             _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x6c1)](_0x12ee1a[_0x5a7724(0x6e2)], _0x7557fe), limoClickObjs[_0x5a7724(0x43a)](_0x308751);                         } else {                             if (_0x12ee1a[_0x5a7724(0x408)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x461)]) || _0x12ee1a[_0x5a7724(0x553)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3fd)]) || _0x12ee1a[_0x5a7724(0x517)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6dc)]) || _0x12ee1a[_0x5a7724(0x664)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x53c)]) || _0x12ee1a[_0x5a7724(0x279)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3ee)]) || _0x12ee1a[_0x5a7724(0x493)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x555)]) || _0x12ee1a[_0x5a7724(0x3e3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x704)]) || _0x12ee1a[_0x5a7724(0x5db)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x748)]) || _0x12ee1a[_0x5a7724(0x237)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x250)]) || _0x12ee1a[_0x5a7724(0x450)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5b8)])) {                                 const _0x2c6740 = _0x12ee1a[_0x5a7724(0x37e)][_0x5a7724(0x44f)]('|');                                 let _0x5aa05e = -0x51 * 0x33 + -0x67b + -0x182 * -0xf;                                 while (!![]) {                                     switch (_0x2c6740[_0x5aa05e++]) {                                     case '0':                                         _0x12ee1a[_0x5a7724(0x566)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3ee)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x719)]);                                         continue;                                     case '1':                                         limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                         continue;                                     case '2':                                         _0x12ee1a[_0x5a7724(0x4df)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x461)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x417)]);                                         continue;                                     case '3':                                         _0x12ee1a[_0x5a7724(0x6b3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x704)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x54b)]);                                         continue;                                     case '4':                                         _0x12ee1a[_0x5a7724(0x434)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x555)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x640)]);                                         continue;                                     case '5':                                         _0x12ee1a[_0x5a7724(0x2e5)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x250)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x1bb)]);                                         continue;                                     case '6':                                         _0x12ee1a[_0x5a7724(0x257)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5b8)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x3a1)]);                                         continue;                                     case '7':                                         _0x12ee1a[_0x5a7724(0x394)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x53c)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x1c6)]);                                         continue;                                     case '8':                                         _0x12ee1a[_0x5a7724(0x450)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6dc)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x412)]);                                         continue;                                     case '9':                                         _0x12ee1a[_0x5a7724(0x3ec)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x748)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x6f9)]);                                         continue;                                     case '10':                                         _0x12ee1a[_0x5a7724(0x2aa)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3fd)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x6de)]);                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x12ee1a[_0x5a7724(0x290)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x644)]) || _0x12ee1a[_0x5a7724(0x4f1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x57b)]) || _0x12ee1a[_0x5a7724(0x31d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6df)]) || _0x12ee1a[_0x5a7724(0x465)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x742)]) || _0x12ee1a[_0x5a7724(0x507)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x672)]) || _0x12ee1a[_0x5a7724(0x31c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x20e)]) || _0x12ee1a[_0x5a7724(0x5ef)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x519)]) || _0x12ee1a[_0x5a7724(0x715)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x74e)]) || _0x12ee1a[_0x5a7724(0x4df)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3a9)]) || _0x12ee1a[_0x5a7724(0x6a2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x708)]) || _0x12ee1a[_0x5a7724(0x553)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5fe)]) || _0x12ee1a[_0x5a7724(0x196)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5ca)]) || _0x12ee1a[_0x5a7724(0x36f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5f5)])) {                                     const _0x1e95ec = _0x12ee1a[_0x5a7724(0x37d)][_0x5a7724(0x44f)]('|');                                     let _0x1cf7c3 = -0xd * -0x251 + -0x2af * 0xb + -0x13 * 0x8;                                     while (!![]) {                                         switch (_0x1e95ec[_0x1cf7c3++]) {                                         case '0':                                             _0x12ee1a[_0x5a7724(0x2e5)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x672)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x691)]);                                             continue;                                         case '1':                                             _0x12ee1a[_0x5a7724(0x467)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5f5)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x61f)]);                                             continue;                                         case '2':                                             _0x12ee1a[_0x5a7724(0x663)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x519)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x37b)]);                                             continue;                                         case '3':                                             _0x12ee1a[_0x5a7724(0x66b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5ca)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x1fa)]);                                             continue;                                         case '4':                                             _0x12ee1a[_0x5a7724(0x4f1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x74e)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x377)]);                                             continue;                                         case '5':                                             _0x12ee1a[_0x5a7724(0x2e5)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x644)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x73e)]);                                             continue;                                         case '6':                                             _0x12ee1a[_0x5a7724(0x563)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6df)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x4e2)]);                                             continue;                                         case '7':                                             _0x12ee1a[_0x5a7724(0x4df)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x57b)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x1a5)]);                                             continue;                                         case '8':                                             _0x12ee1a[_0x5a7724(0x4f1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5fe)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x526)]);                                             continue;                                         case '9':                                             _0x12ee1a[_0x5a7724(0x3db)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x742)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x6a8)]);                                             continue;                                         case '10':                                             _0x12ee1a[_0x5a7724(0x307)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3a9)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x4c1)]);                                             continue;                                         case '11':                                             _0x12ee1a[_0x5a7724(0x5db)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x20e)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x4ac)]);                                             continue;                                         case '12':                                             _0x12ee1a[_0x5a7724(0x290)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x708)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x491)]);                                             continue;                                         case '13':                                             limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x12ee1a[_0x5a7724(0x4f1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x220)]) || _0x12ee1a[_0x5a7724(0x212)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x397)]) || _0x12ee1a[_0x5a7724(0x663)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x45f)]) || _0x12ee1a[_0x5a7724(0x303)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x744)]) || _0x12ee1a[_0x5a7724(0x3f1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6f6)]) || _0x12ee1a[_0x5a7724(0x493)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2f8)]) || _0x12ee1a[_0x5a7724(0x2c2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x253)]) || _0x12ee1a[_0x5a7724(0x6b9)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x62f)])) {                                         let _0x4cd361 = _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x4fe)](-0x1ef * 0x7 + -0x53 * 0x15 + 0x145d * 0x1, -0x710 + 0x237d * 0x1 + -0x1c67);                                         _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x59c)](_0x12ee1a[_0x5a7724(0x6ea)], _0x4cd361), limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                     } else {                                         if (_0x12ee1a[_0x5a7724(0x3bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x66e)]) || _0x12ee1a[_0x5a7724(0x22f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x324)])) {                                             let _0x564e93 = _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x4fe)](-0x275 * -0x2 + -0x61 * 0x14 + 0x2ae, 0x3 * -0x4c1 + -0x102 * -0x2 + 0x622 * 0x2);                                             _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x225)](_0x12ee1a[_0x5a7724(0x692)], _0x564e93), limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                         } else                                             (_0x12ee1a[_0x5a7724(0x319)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5f2)]) || _0x12ee1a[_0x5a7724(0x438)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2e3)]) || _0x12ee1a[_0x5a7724(0x197)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x55d)]) || _0x12ee1a[_0x5a7724(0x2bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3dc)])) && (_0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)] = _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x361)](), _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x214) + 'e'] = !![], limojiJiaodaiObjs[_0x5a7724(0x43a)](_0x308751));                                     }                                 }                             }                         }                     }                     if (_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x19c)]) || _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x58a)]) || _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x1a2)]) && _0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)]('转动')) {                         if (_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x1a2)])) {                             let _0x381f67 = _0x12ee1a[_0x5a7724(0x714)](_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x4fe)](-0x1ce3 + 0x2 * 0x1b7 + -0xcbc * -0x2, 0xc * 0x236 + -0x23bc + 0x938), -0x1 * -0x21bc + -0x362 + -0x1e59 * 0x1);                             limoRoomAnimation[_0x381f67][_0x5a7724(0x5a1)] = _0x308751;                         } else {                             if (_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)]('动画')) {                                 let _0x428d29 = _0x12ee1a[_0x5a7724(0x714)](_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x4fe)](0xd64 * -0x2 + -0x1367 * -0x2 + -0x2 * 0x600, 0x1 * 0x725 + 0x1238 + -0x1956), -0x1794 + -0x1 * -0x626 + -0x1 * -0x116f);                                 _0x308751[_0x5a7724(0x359)][_0x5a7724(0x5e2) + 't'] = !![], limoRoomAnimation[_0x428d29][_0x5a7724(0x739)][_0x5a7724(0x43a)](_0x308751), _0x308751[_0x5a7724(0x73a) + 'r'] = 0x126e + 0x12a0 + -0x22b6;                             } else {                                 let _0x831e4 = _0x12ee1a[_0x5a7724(0x406)](_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x4fe)](0xd69 * 0x1 + 0xc07 * 0x1 + -0x196a), 0xcb1 + -0x1f2f + 0x127f);                                 limoRoomAnimation[_0x831e4][_0x5a7724(0x5e2) + 't'][_0x5a7724(0x43a)](_0x308751);                             }                         }                     }                     if (_0x12ee1a[_0x5a7724(0x61d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x760)])) {                         const _0x14f96d = _0x12ee1a[_0x5a7724(0x498)][_0x5a7724(0x44f)]('|');                         let _0x314462 = -0x188e + 0x6 * 0x55a + -0x78e;                         while (!![]) {                             switch (_0x14f96d[_0x314462++]) {                             case '0':                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                     -(-0x235 * 0x2 + -0x235 * 0x11 + -0xb * -0x50e + 0.8400000000001455),                                     0x3 * -0x9fb + -0x7c1 * -0x1 + 0x2 * 0xb3c + 0.4300000000000068,                                     -(-0x1e79 + -0x3a * 0xb + 0x26de + 0.07999999999992724)                                 ];                                 continue;                             case '1':                                 _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x39f)];                                 continue;                             case '2':                                 cameraImportDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                 continue;                             case '3':                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                     -(0x1e * -0xa3 + -0x68a + 0x274f + 0.9589000000000851),                                     -0x1f * -0xd9 + -0x22d * 0x1 + -0x17cf + 0.33150000000000546,                                     -(0x56b * -0x6 + 0x17 * 0xc3 + 0x14d1 + 0.7609999999999673)                                 ];                                 continue;                             case '4':                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x40e)];                                 continue;                             case '5':                                 limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                 continue;                             }                             break;                         }                     }                     if (_0x12ee1a[_0x5a7724(0x1cc)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x56e)]) || _0x12ee1a[_0x5a7724(0x671)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x689)]) || _0x12ee1a[_0x5a7724(0x5db)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6a3)]) || _0x12ee1a[_0x5a7724(0x5ef)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x487)]) || _0x12ee1a[_0x5a7724(0x19b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x50f)]) || _0x12ee1a[_0x5a7724(0x394)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x231)]) || _0x12ee1a[_0x5a7724(0x303)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x46a)]) || _0x12ee1a[_0x5a7724(0x553)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x668)]) || _0x12ee1a[_0x5a7724(0x6a2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2d2)]) || _0x12ee1a[_0x5a7724(0x525)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x473)]) || _0x12ee1a[_0x5a7724(0x5c2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5b0)]) || _0x12ee1a[_0x5a7724(0x2ff)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x509)]) || _0x12ee1a[_0x5a7724(0x553)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x499)]) || _0x12ee1a[_0x5a7724(0x4a3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x25a)]) || _0x12ee1a[_0x5a7724(0x3bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x424)]) || _0x12ee1a[_0x5a7724(0x3ec)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x50e)]) || _0x12ee1a[_0x5a7724(0x193)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x422)]) || _0x12ee1a[_0x5a7724(0x1b0)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x647)]) || _0x12ee1a[_0x5a7724(0x5c6)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6f7)]) || _0x12ee1a[_0x5a7724(0x334)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x54e)])) {                         let _0x50337c = _0x12ee1a[_0x5a7724(0x700)](makeTextSprite, _0x12ee1a[_0x5a7724(0x3f8)], {                             'fontsize': 0x14,                             'borderColor': {                                 'r': 0xff,                                 'g': 0x0,                                 'b': 0x0,                                 'a': 0.4                             },                             'backgroundColor': {                                 'r': 0xff,                                 'g': 0xff,                                 'b': 0xff,                                 'a': 0.9                             },                             'size': [                                 -0x2 * -0xcc2 + 0x10eb * -0x1 + -0x2dd * 0x3,                                 0x15 * 0x14d + 0x9aa + -0x24f9                             ],                             'fontColor': {                                 'r': 0x0,                                 'g': 0x0,                                 'b': 0x0,                                 'a': 0x1                             }                         });                         _0x50337c[_0x5a7724(0x662)] = new THREE[(_0x5a7724(0x516))](-0x1 * 0x314 + -0x15f9 + 0x247 * 0xb + 0.5, -0x1 * -0x248e + 0x5b * -0x62 + -0x1b7), _0x50337c[_0x5a7724(0x6e1)][_0x5a7724(0x30b)](-(-0xf49 * -0x2 + -0x131f * -0x1 + 0x1 * -0x31b1 + 0.5), 0x7 * -0x531 + 0x99f + 0x1ab8, -(-0x25c6 + 0xcc2 + 0x501 * 0x5 + 0.19999999999999996)), _0x308751[_0x5a7724(0x59d)](_0x50337c);                         if (_0x12ee1a[_0x5a7724(0x5de)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x56e)])) {                             const _0x4492ed = _0x12ee1a[_0x5a7724(0x5e3)][_0x5a7724(0x44f)]('|');                             let _0x37e458 = 0x11d9 + -0x1494 + 0x3 * 0xe9;                             while (!![]) {                                 switch (_0x4492ed[_0x37e458++]) {                                 case '0':                                     limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                     continue;                                 case '1':                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(0x108 + -0x3 * 0x6c6 + 0x38 * 0xa6 + 0.6300000000001091),                                         0x17b2 + -0x1 * -0x17b3 + 0x2e93 * -0x1 + 0.4000000000000057,                                         -(-0xa6b + 0x1f3 + -0x16 * -0xa7 + 0.5599999999999454)                                     ];                                     continue;                                 case '2':                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(0x15 * 0x1c + 0x1d27 + -0xe6c + 0.017300000000432192),                                         -0x24c5 * -0x1 + -0x3a + 0x1 * -0x23b5 + 0.9303999999999917,                                         -(-0x26dc + -0x4 * 0x481 + 0x3ea5 + 0.9589000000000851)                                     ];                                     continue;                                 case '3':                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x1af)];                                     continue;                                 case '4':                                     _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                     continue;                                 case '5':                                     limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                     continue;                                 }                                 break;                             }                         } else {                             if (_0x12ee1a[_0x5a7724(0x6e3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x689)])) {                                 const _0x51c0c2 = _0x12ee1a[_0x5a7724(0x432)][_0x5a7724(0x44f)]('|');                                 let _0x510015 = -0x1f4a + 0x1c7b + 0x2cf;                                 while (!![]) {                                     switch (_0x51c0c2[_0x510015++]) {                                     case '0':                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x349)];                                         continue;                                     case '1':                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                             -(-0x4ce + 0x2 * -0xbd7 + 0x2d5e + 0.5299999999997453),                                             -0x71 * -0x4f + -0x2277 + 0x83 + 0.18139999999999645,                                             -(0x77 * 0x3b + -0x91d * -0x2 + 0x27da * -0x1 + 0.012199999999893407)                                         ];                                         continue;                                     case '2':                                         _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                         continue;                                     case '3':                                         limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                         continue;                                     case '4':                                         limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                         continue;                                     case '5':                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                             -(0x94c * 0x2 + -0x77f + -0x5c9 * -0x1 + 0.5299999999997453),                                             0x13b * 0x1c + 0x210a + -0x3 * 0x1633 + 0.36000000000001364,                                             -(0x1 * -0xb + -0x2374 + 0x2964 + 0.15000000000009095)                                         ];                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x12ee1a[_0x5a7724(0x1cc)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x499)])) {                                     const _0x4d5cd2 = _0x12ee1a[_0x5a7724(0x2d6)][_0x5a7724(0x44f)]('|');                                     let _0x3ca68f = 0xe09 + 0x3 * 0x219 + -0x1454;                                     while (!![]) {                                         switch (_0x4d5cd2[_0x3ca68f++]) {                                         case '0':                                             limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                             continue;                                         case '1':                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                 -(0x3f6 + -0x96f + -0x68d * -0x3 + 0.38000000000010914),                                                 0x1 * 0x1763 + -0x2565 + 0xed1 * 0x1 + 0.9900000000000091,                                                 -(0x60b + -0x2 * -0xc5 + -0x1b6 + 0.2799999999999727)                                             ];                                             continue;                                         case '2':                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5a3)];                                             continue;                                         case '3':                                             _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                             continue;                                         case '4':                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                 -(0x260b * 0x1 + 0xa9c * -0x2 + 0x2 * -0x153 + 0.8478000000000065),                                                 -0x180 + -0x834 + 0x1 * 0xa88 + 0.7644999999999982,                                                 -(-0xe03 * -0x1 + 0x1005 + -0x183d + 0.6348000000000411)                                             ];                                             continue;                                         case '5':                                             limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x12ee1a[_0x5a7724(0x307)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x509)])) {                                         const _0x28e76 = _0x12ee1a[_0x5a7724(0x243)][_0x5a7724(0x44f)]('|');                                         let _0x105b88 = -0x1 * 0x1814 + -0x3 * -0xadf + -0x889;                                         while (!![]) {                                             switch (_0x28e76[_0x105b88++]) {                                             case '0':                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5ac)];                                                 continue;                                             case '1':                                                 limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '2':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(0x1b * -0xad + 0x7 * -0x8f + 0x4ed * 0x7 + 0.09439999999995052),                                                     0x217d * -0x1 + 0x1c55 * -0x1 + -0x1f55 * -0x2 + 0.20939999999998804,                                                     -(0xdb4 + -0x1 * 0x3d7 + 0x1 * -0x412 + 0.3362999999999374)                                                 ];                                                 continue;                                             case '3':                                                 _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                 continue;                                             case '4':                                                 limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '5':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(0x405 * -0x4 + -0x1 * -0x9aa + 0x12bd + 0.2300000000000182),                                                     -0x2505 + -0x3cb * -0x6 + 0xf14 + 0.009999999999990905,                                                     -(-0x2a7 * 0xc + -0x1068 + 0x361b + 0.36999999999989086)                                                 ];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x12ee1a[_0x5a7724(0x2f7)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x668)])) {                                             const _0x512eae = _0x12ee1a[_0x5a7724(0x541)][_0x5a7724(0x44f)]('|');                                             let _0x19eb6a = 0x138b * 0x1 + -0x13a6 + -0x1 * -0x1b;                                             while (!![]) {                                                 switch (_0x512eae[_0x19eb6a++]) {                                                 case '0':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(0x17 * -0x2e + 0x1f * -0x6c + 0x212c + 0.611699999999928),                                                         0x33 * -0x2f + 0x164d + -0xca7 + 0.432699999999997,                                                         -(0x2112 + 0x2b * 0xbd + 0x9e5 * -0x6 + 0.6868999999999232)                                                     ];                                                     continue;                                                 case '1':                                                     limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '2':                                                     _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(0x1720 + 0x1747 + -0x1e71 + 0.4299999999998363),                                                         -0x11e1 + 0x1979 * -0x1 + -0x174 * -0x1e + 0.5399999999999991,                                                         -(0x1100 + 0x1 * -0x1159 + 0x5e7 + 0.5199999999999818)                                                     ];                                                     continue;                                                 case '4':                                                     limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '5':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4b2)];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x12ee1a[_0x5a7724(0x334)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x46a)])) {                                                 const _0x2fb023 = _0x12ee1a[_0x5a7724(0x5f0)][_0x5a7724(0x44f)]('|');                                                 let _0x5b5964 = -0xcff + -0x1990 + -0x268f * -0x1;                                                 while (!![]) {                                                     switch (_0x2fb023[_0x5b5964++]) {                                                     case '0':                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x648)];                                                         continue;                                                     case '1':                                                         limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     case '2':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                             -(0x83 * 0xf + -0x391 * -0x5 + -0x9bc + 0.11700000000018917),                                                             -0x142e + -0x2570 + -0x39d4 * -0x1 + 0.02790000000000248,                                                             -(0x85b + -0x167 * -0x7 + -0xc9f + 0.1534999999998945)                                                         ];                                                         continue;                                                     case '3':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                             -(0x169f * 0x1 + 0x1aa3 + 0x1 * -0x217d + 0.849999999999909),                                                             -0x149 * 0x18 + -0x356 * 0x1 + 0x7 * 0x4e9 + 0.5200000000000031,                                                             -(0x17 * 0x59 + -0x23cc + -0x2 * -0x10a3 + 0.44000000000005457)                                                         ];                                                         continue;                                                     case '4':                                                         _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                         continue;                                                     case '5':                                                         limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x12ee1a[_0x5a7724(0x1d3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6a3)])) {                                                     const _0x1dc70e = _0x12ee1a[_0x5a7724(0x202)][_0x5a7724(0x44f)]('|');                                                     let _0x3f01a4 = 0x1a61 + 0xb50 + -0x25b1;                                                     while (!![]) {                                                         switch (_0x1dc70e[_0x3f01a4++]) {                                                         case '0':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                 -(-0x2 * 0xe7f + -0x10ce + 0x3d60 * 0x1 + 0.8874000000000706),                                                                 0x4de + 0xafc + -0xf94 + 0.22119999999999607,                                                                 -(-0x574 * -0x5 + -0x1304 + -0x2c9 + 0.24080000000003565)                                                             ];                                                             continue;                                                         case '1':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                 -(-0x192c + -0x18a7 * -0x1 + 0x1018 + 0.7699999999999818),                                                                 0x3 * 0xce9 + 0xf * 0x224 + -0xb * 0x66b + 0.46000000000000085,                                                                 -(-0x12e0 + 0x759 + 0x1115 + 0.7999999999999545)                                                             ];                                                             continue;                                                         case '2':                                                             limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                             continue;                                                         case '3':                                                             limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                             continue;                                                         case '4':                                                             _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                             continue;                                                         case '5':                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6bd)];                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x12ee1a[_0x5a7724(0x715)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2d2)])) {                                                         const _0x4ef888 = _0x12ee1a[_0x5a7724(0x5da)][_0x5a7724(0x44f)]('|');                                                         let _0x289620 = 0x1772 + -0x609 * 0x5 + -0x1 * -0x6bb;                                                         while (!![]) {                                                             switch (_0x4ef888[_0x289620++]) {                                                             case '0':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                     -(-0x1 * -0xc5f + 0x1 * 0x17eb + -0x1 * 0x14e7 + 0.6415000000001783),                                                                     0xd85 * -0x1 + 0x21b * -0x7 + 0xe3e * 0x2 + 0.7391000000000005,                                                                     -(0x2 * -0x620 + -0x19cd * -0x1 + -0x7fd + 0.15450000000009823)                                                                 ];                                                                 continue;                                                             case '1':                                                                 _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                 continue;                                                             case '2':                                                                 limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                 continue;                                                             case '3':                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6cb)];                                                                 continue;                                                             case '4':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                     -(0x1 * -0x2293 + 0x16 * -0xf7 + -0x11cc * -0x4 + 0.32999999999992724),                                                                     -0x80 + -0x4 * -0x421 + -0xfd3 + 0.3999999999999986,                                                                     -(-0x18a * 0x10 + 0x1b76 + 0x2a3 + 0.15000000000009095)                                                                 ];                                                                 continue;                                                             case '5':                                                                 limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0x12ee1a[_0x5a7724(0x731)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x231)])) {                                                             const _0x3d846c = _0x12ee1a[_0x5a7724(0x1ba)][_0x5a7724(0x44f)]('|');                                                             let _0x47cdb4 = -0x1 * 0x1a7a + -0xa48 + 0x24c2;                                                             while (!![]) {                                                                 switch (_0x3d846c[_0x47cdb4++]) {                                                                 case '0':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                         -(0x194c + 0x7 * 0x4a + -0xc2a * 0x1 + 0.7399999999997817),                                                                         0x15fb + -0x236d + 0xdb0 + 0.39000000000000057,                                                                         -(-0x195d + 0x21 * 0x114 + -0x4a9 * 0x1 + 0.6199999999998909)                                                                     ];                                                                     continue;                                                                 case '1':                                                                     limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                     continue;                                                                 case '2':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                         -(-0x147 + 0x1bde + 0xd * -0xe1 + 0.2665999999999258),                                                                         -0x1 * -0x1dd5 + 0x53f + 0x8b4 * -0x4 + 0.9890999999999934,                                                                         -(0x26b6 + 0x725 + -0x815 * 0x5 + 0.46289999999999054)                                                                     ];                                                                     continue;                                                                 case '3':                                                                     _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                     continue;                                                                 case '4':                                                                     limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                     continue;                                                                 case '5':                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6cd)];                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         } else {                                                             if (_0x12ee1a[_0x5a7724(0x425)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x50f)])) {                                                                 const _0x25b3fa = _0x12ee1a[_0x5a7724(0x252)][_0x5a7724(0x44f)]('|');                                                                 let _0x243bb4 = -0x18e * 0x7 + -0x1760 + -0x5 * -0x6da;                                                                 while (!![]) {                                                                     switch (_0x25b3fa[_0x243bb4++]) {                                                                     case '0':                                                                         limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                         continue;                                                                     case '1':                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                             -(-0x3c5 + 0x2689 + -0x13ce + 0.9744999999998072),                                                                             -0x249d + -0x4 * 0x443 + -0x1 * -0x35e3 + 0.9065999999999974,                                                                             -(0x1 * -0x1ccf + 0x16a2 + 0xbc4 + 0.6912999999999556)                                                                         ];                                                                         continue;                                                                     case '2':                                                                         limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                         continue;                                                                     case '3':                                                                         _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                         continue;                                                                     case '4':                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6f4)];                                                                         continue;                                                                     case '5':                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                             -(0x11cc + -0x1ddc + 0x1b06 + 0.5599999999999454),                                                                             0x1 * 0x1eda + -0x15ed + -0x1a * 0x56 + 0.28999999999999915,                                                                             -(0x208c + -0xd23 + -0x2 * 0x6f8 + 0.07999999999992724)                                                                         ];                                                                         continue;                                                                     }                                                                     break;                                                                 }                                                             } else {                                                                 if (_0x12ee1a[_0x5a7724(0x434)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x487)])) {                                                                     const _0x33daf1 = _0x12ee1a[_0x5a7724(0x407)][_0x5a7724(0x44f)]('|');                                                                     let _0x414029 = -0x32 * -0xab + -0x2 * 0x35 + 0x2 * -0x107e;                                                                     while (!![]) {                                                                         switch (_0x33daf1[_0x414029++]) {                                                                         case '0':                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                 -(0x2329 + 0x111d + -0x25a0 + 0.6109000000001288),                                                                                 -0x1 * 0x23bd + 0x4 * -0x856 + 0x455c + 0.045100000000005025,                                                                                 -(0x923 * -0x1 + 0x1 * -0xfac + 0x1e44 + 0.9436000000000604)                                                                             ];                                                                             continue;                                                                         case '1':                                                                             limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                             continue;                                                                         case '2':                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x215)];                                                                             continue;                                                                         case '3':                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                 -(0xd45 + -0x93f + 0xa9f + 0.44000000000005457),                                                                                 -0x170b + 0x189 + 0x15c0 + 0.5399999999999991,                                                                                 -(0x1a1 * -0xd + 0x254d + -0xa92 + 0.6300000000001091)                                                                             ];                                                                             continue;                                                                         case '4':                                                                             _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                             continue;                                                                         case '5':                                                                             limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                             continue;                                                                         }                                                                         break;                                                                     }                                                                 } else {                                                                     if (_0x12ee1a[_0x5a7724(0x19a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x647)])) {                                                                         const _0x275d97 = _0x12ee1a[_0x5a7724(0x4aa)][_0x5a7724(0x44f)]('|');                                                                         let _0x2db5a7 = -0x4 * -0x827 + -0x15bb * -0x1 + -0x3 * 0x121d;                                                                         while (!![]) {                                                                             switch (_0x275d97[_0x2db5a7++]) {                                                                             case '0':                                                                                 _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                 continue;                                                                             case '1':                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                     -(-0x755 * 0x1 + -0x25c * 0x1 + -0xc1d * -0x2 + 0.7699999999999818),                                                                                     0x709 * 0x2 + 0xc * 0x2d + -0xffd + 0.13000000000000256,                                                                                     -(0x3 * -0x412 + 0x1374 * -0x2 + 0x3897 + 0.14000000000010004)                                                                                 ];                                                                                 continue;                                                                             case '2':                                                                                 limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                 continue;                                                                             case '3':                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                     -(0x837 * -0x2 + -0x589 * 0x1 + 0x26f * 0xf + 0.13079999999990832),                                                                                     -0x179f * 0x1 + -0x13d6 + 0x2bac + 0.9864999999999995,                                                                                     -(0x218 * 0x11 + 0x4 * 0x5ae + -0x34bd + 0.7817999999999756)                                                                                 ];                                                                                 continue;                                                                             case '4':                                                                                 limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                 continue;                                                                             case '5':                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x36c)];                                                                                 continue;                                                                             }                                                                             break;                                                                         }                                                                     } else {                                                                         if (_0x12ee1a[_0x5a7724(0x6e3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x473)])) {                                                                             const _0x2d8384 = _0x12ee1a[_0x5a7724(0x1e9)][_0x5a7724(0x44f)]('|');                                                                             let _0x1cebf0 = -0x9cf + -0x23ac + 0x2d7b;                                                                             while (!![]) {                                                                                 switch (_0x2d8384[_0x1cebf0++]) {                                                                                 case '0':                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                         -(0x1ad9 + -0x53e * 0x5 + 0xd85 + 0.9200000000000728),                                                                                         0x30 * -0x26 + -0x1c65 + 0x23c3 + 0.39000000000000057,                                                                                         -(-0x473 + 0x45c + 0x5a5 + 0.7999999999999545)                                                                                     ];                                                                                     continue;                                                                                 case '1':                                                                                     limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                     continue;                                                                                 case '2':                                                                                     _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                     continue;                                                                                 case '3':                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x28d)];                                                                                     continue;                                                                                 case '4':                                                                                     limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                     continue;                                                                                 case '5':                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                         -(-0x2380 + -0xa35 + 0x1 * 0x3bdd + 0.9200000000000728),                                                                                         0x551 + 0xd05 * -0x3 + -0x1 * -0x2203 + 0.38219999999999743,                                                                                         -(-0x1ea6 + 0x24d3 + -0x1 * 0xb9 + 0.19110000000000582)                                                                                     ];                                                                                     continue;                                                                                 }                                                                                 break;                                                                             }                                                                         } else {                                                                             if (_0x12ee1a[_0x5a7724(0x45d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6f7)])) {                                                                                 const _0x47aa12 = _0x12ee1a[_0x5a7724(0x353)][_0x5a7724(0x44f)]('|');                                                                                 let _0x2a9f3e = -0x17c1 * 0x1 + 0x1 * 0x2069 + -0x4 * 0x22a;                                                                                 while (!![]) {                                                                                     switch (_0x47aa12[_0x2a9f3e++]) {                                                                                     case '0':                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x57e)];                                                                                         continue;                                                                                     case '1':                                                                                         limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                         continue;                                                                                     case '2':                                                                                         limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                         continue;                                                                                     case '3':                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                             -(-0x251d + 0x265e + 0xcc4 + 0.7928999999999178),                                                                                             -0x337 * -0xc + 0xbf9 + -0x1 * 0x3253 + 0.38870000000000005,                                                                                             -(0x1c64 + 0x18f8 + 0x3ad * -0xd + 0.13830000000007203)                                                                                         ];                                                                                         continue;                                                                                     case '4':                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                             -(-0x600 * -0x5 + -0x586 * 0x6 + 0x112a + 0.3200000000001637),                                                                                             0x140e * -0x1 + -0x23c3 + 0x3802 + 0.259999999999998,                                                                                             -(0x1b8c + -0x16bc + 0xa9 + 0.19000000000005457)                                                                                         ];                                                                                         continue;                                                                                     case '5':                                                                                         _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                         continue;                                                                                     }                                                                                     break;                                                                                 }                                                                             } else {                                                                                 if (_0x12ee1a[_0x5a7724(0x48e)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5b0)])) {                                                                                     const _0x324430 = _0x12ee1a[_0x5a7724(0x547)][_0x5a7724(0x44f)]('|');                                                                                     let _0x1837ba = 0x8 * 0x499 + 0x805 + -0x3 * 0xeef;                                                                                     while (!![]) {                                                                                         switch (_0x324430[_0x1837ba++]) {                                                                                         case '0':                                                                                             limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                             continue;                                                                                         case '1':                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                 -(-0x41f + -0x49 * -0x62 + 0x35 * -0x31 + 0.15000000000009095),                                                                                                 0x18fb + -0x5 * 0x3fb + -0x4d6 + 0.5,                                                                                                 -(-0x1cdc + 0x1 * -0xbee + 0x8 * 0x5cb + 0.6600000000000819)                                                                                             ];                                                                                             continue;                                                                                         case '2':                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                 -(0x1 * 0x260e + 0xadc * 0x1 + -0x233c + 0.8344999999999345),                                                                                                 0x203c + 0x11e3 + 0x18eb * -0x2 + 0.36369999999999436,                                                                                                 -(0xb * -0x322 + 0xd9 * 0x1d + -0xf56 * -0x1 + 0.3927000000001044)                                                                                             ];                                                                                             continue;                                                                                         case '3':                                                                                             limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                             continue;                                                                                         case '4':                                                                                             _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                             continue;                                                                                         case '5':                                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x658)];                                                                                             continue;                                                                                         }                                                                                         break;                                                                                     }                                                                                 } else {                                                                                     if (_0x12ee1a[_0x5a7724(0x394)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x54e)])) {                                                                                         const _0x4b90ef = _0x12ee1a[_0x5a7724(0x6a6)][_0x5a7724(0x44f)]('|');                                                                                         let _0x5980d5 = -0xce * -0x1e + -0x22ac + 0x1 * 0xa88;                                                                                         while (!![]) {                                                                                             switch (_0x4b90ef[_0x5980d5++]) {                                                                                             case '0':                                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5c9)];                                                                                                 continue;                                                                                             case '1':                                                                                                 _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                                 continue;                                                                                             case '2':                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                     -(0x1 * -0x20e4 + -0x93 * 0x19 + 0x1d7 * 0x21 + 0.13000000000010914),                                                                                                     -0x1 * 0xfa1 + 0x1e2f * 0x1 + 0xe5d * -0x1 + 0.38000000000000256,                                                                                                     -(0x1086 + -0xff1 + 0x4e4 + 0.14000000000010004)                                                                                                 ];                                                                                                 continue;                                                                                             case '3':                                                                                                 limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                                 continue;                                                                                             case '4':                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                     -(-0x1 * -0x1c09 + 0x755 * -0x2 + 0x18 + 0.2775000000001455),                                                                                                     -0x130d * 0x2 + -0x1eb1 + 0x1 * 0x4503 + 0.36430000000000007,                                                                                                     -(-0x1c0d + 0x15e0 + 0xbbf * 0x1 + 0.31179999999994834)                                                                                                 ];                                                                                                 continue;                                                                                             case '5':                                                                                                 limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                                 continue;                                                                                             }                                                                                             break;                                                                                         }                                                                                     } else {                                                                                         if (_0x12ee1a[_0x5a7724(0x5be)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x424)])) {                                                                                             const _0x32245b = _0x12ee1a[_0x5a7724(0x595)][_0x5a7724(0x44f)]('|');                                                                                             let _0x1cb363 = 0x1d06 + -0x22c6 + 0x5c0;                                                                                             while (!![]) {                                                                                                 switch (_0x32245b[_0x1cb363++]) {                                                                                                 case '0':                                                                                                     limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                                     continue;                                                                                                 case '1':                                                                                                     limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                                     continue;                                                                                                 case '2':                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                         -(-0xe6 * -0x21 + -0x23 * 0xd5 + 0xcbf + 0.5399999999999636),                                                                                                         0x2073 + -0x1e21 + -0x214 + 0.4799999999999969,                                                                                                         -(-0x8 * -0x9e + -0x899 + 0x937 + 0.6900000000000546)                                                                                                     ];                                                                                                     continue;                                                                                                 case '3':                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                         -(0x33d + 0x5 * -0x607 + 0x282c + 0.6837999999997919),                                                                                                         0x41 * 0x62 + -0x17 * -0x10f + 0x829 * -0x6 + 0.6285000000000025,                                                                                                         -(-0x1 * 0x268c + 0x4 * 0x737 + 0xf29 + 0.4522999999999229)                                                                                                     ];                                                                                                     continue;                                                                                                 case '4':                                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6d3)];                                                                                                     continue;                                                                                                 case '5':                                                                                                     _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                                     continue;                                                                                                 }                                                                                                 break;                                                                                             }                                                                                         } else {                                                                                             if (_0x12ee1a[_0x5a7724(0x4f1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x422)])) {                                                                                                 const _0x29abfe = _0x12ee1a[_0x5a7724(0x202)][_0x5a7724(0x44f)]('|');                                                                                                 let _0x4707d4 = 0xa4e + -0xfc8 + 0x57a;                                                                                                 while (!![]) {                                                                                                     switch (_0x29abfe[_0x4707d4++]) {                                                                                                     case '0':                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                             -(-0x3b * -0x35 + 0x9d2 + 0x7 * -0x149 + 0.7103000000001884),                                                                                                             0x9 * -0x31f + 0x22a1 + 0x3 * -0x21b + 0.05100000000000193,                                                                                                             -(-0x11b0 + 0x2ef * 0x1 + 0x1 * 0x144f + 0.26909999999998035)                                                                                                         ];                                                                                                         continue;                                                                                                     case '1':                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                             -(-0x54 * 0x12 + -0x1911 + -0x4e4 * -0x9 + 0.2800000000002001),                                                                                                             0x6 * 0x656 + 0x8b4 + 0x2b * -0x115 + 0.3299999999999983,                                                                                                             -(0x126c + -0x22a4 + 0x73b * 0x3 + 0.2400000000000091)                                                                                                         ];                                                                                                         continue;                                                                                                     case '2':                                                                                                         limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                                         continue;                                                                                                     case '3':                                                                                                         limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                                         continue;                                                                                                     case '4':                                                                                                         _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                                         continue;                                                                                                     case '5':                                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x559)];                                                                                                         continue;                                                                                                     }                                                                                                     break;                                                                                                 }                                                                                             } else {                                                                                                 if (_0x12ee1a[_0x5a7724(0x241)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x25a)])) {                                                                                                     const _0x49ea44 = _0x12ee1a[_0x5a7724(0x686)][_0x5a7724(0x44f)]('|');                                                                                                     let _0x226018 = -0x1843 + 0x2575 * 0x1 + -0xd32;                                                                                                     while (!![]) {                                                                                                         switch (_0x49ea44[_0x226018++]) {                                                                                                         case '0':                                                                                                             limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                                             continue;                                                                                                         case '1':                                                                                                             _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                                             continue;                                                                                                         case '2':                                                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x57f)];                                                                                                             continue;                                                                                                         case '3':                                                                                                             limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                                             continue;                                                                                                         case '4':                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                 -(-0x179f * -0x1 + -0x2002 + 0x1526 + 0.584400000000187),                                                                                                                 -0x1fe4 + 0x2518 + -0x4ef + 0.04720000000000368,                                                                                                                 -(-0x16a9 + -0x12bf * -0x1 + -0x2 * -0x4b2 + 0.4455000000000382)                                                                                                             ];                                                                                                             continue;                                                                                                         case '5':                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                 -(-0xef7 * 0x1 + 0x17da + 0x1f0 * 0x2 + 0.30999999999994543),                                                                                                                 -0x1b * 0x43 + -0x2 * 0x2d1 + 0xcf1 + 0.5300000000000011,                                                                                                                 -(0x1741 * 0x1 + -0x1223 + 0x10 * 0x7 + 0.7100000000000364)                                                                                                             ];                                                                                                             continue;                                                                                                         }                                                                                                         break;                                                                                                     }                                                                                                 } else {                                                                                                     if (_0x12ee1a[_0x5a7724(0x31c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x50e)])) {                                                                                                         const _0x1bf518 = _0x12ee1a[_0x5a7724(0x5c8)][_0x5a7724(0x44f)]('|');                                                                                                         let _0x3e8bd5 = -0x1e2 * -0x2 + -0x1 * 0x24c9 + -0x1 * -0x2105;                                                                                                         while (!![]) {                                                                                                             switch (_0x1bf518[_0x3e8bd5++]) {                                                                                                             case '0':                                                                                                                 _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x751)];                                                                                                                 continue;                                                                                                             case '1':                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                     -(-0x3 * -0xc67 + 0x3 * -0x744 + -0x2e0 + 0.30969999999979336),                                                                                                                     0x4 * -0x471 + 0x3e7 + 0xe16 + 0.3596999999999966,                                                                                                                     -(-0x24f9 + 0x2 * -0x258 + 0x4e * 0x9b + 0.9128000000000611)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '2':                                                                                                                 limoClickObjs[_0x5a7724(0x43a)](_0x308751);                                                                                                                 continue;                                                                                                             case '3':                                                                                                                 limoCameraMesh[_0x5a7724(0x43a)](_0x308751);                                                                                                                 continue;                                                                                                             case '4':                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                     -(-0x1517 + -0x2f7 + 0x1 * 0x2498 + 0.15000000000009095),                                                                                                                     -0x1 * -0x10d6 + 0x1c45 + -0x2 * 0x1675 + 0.18999999999999773,                                                                                                                     -(0x2667 + -0x1 * -0x1e5f + 0x90b * -0x7 + 0.09999999999990905)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '5':                                                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x28e)];                                                                                                                 continue;                                                                                                             }                                                                                                             break;                                                                                                         }                                                                                                     }                                                                                                 }                                                                                             }                                                                                         }                                                                                     }                                                                                 }                                                                             }                                                                         }                                                                     }                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 } else {                     if (_0x12ee1a[_0x5a7724(0x641)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4e7)])) {                         if (_0x308751[_0x5a7724(0x5d9)][_0x5a7724(0x52b)](_0x12ee1a[_0x5a7724(0x4b9)])) {                             const _0x94c739 = _0x12ee1a[_0x5a7724(0x4ef)][_0x5a7724(0x44f)]('|');                             let _0x2b7c06 = 0xad9 + 0x8b * 0x2b + -0x5b3 * 0x6;                             while (!![]) {                                 switch (_0x94c739[_0x2b7c06++]) {                                 case '0':                                     _0x12ee1a[_0x5a7724(0x4d2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x565)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x2fd)], _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x2d1)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(-0xc01 * 0x2 + -0x55a * -0x2 + 0x30 * 0x70 + 0.2400000000000091),                                         -0x46d * 0x7 + 0x1 * -0x4eb + 0x2422 + 0.25,                                         -(-0x18f6 + 0x1a4a + 0x211 + 0.19000000000005457)                                     ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(-0x4c9 * -0x5 + -0x1 * -0xabd + 0x2 * -0xd8a + 0.9351999999998952),                                         0x502 * 0x5 + 0x8bb + -0x2185 + 0.5752999999999986,                                         -(0x1f * 0x7f + -0x1f44 + 0x1347 + 0.7335000000000491)                                     ]);                                     continue;                                 case '1':                                     _0x12ee1a[_0x5a7724(0x27d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x459)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x1db)], _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x63b)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(-0x2 * -0x1b4 + -0x1b12 + 0x1 * 0x2239 + 0.7100000000000364),                                         0x1 * 0x22c9 + -0x1 * -0xf75 + 0x38 * -0xe0 + 0.10000000000002274,                                         -(0x10 * 0x3e + -0x2e0 + 0x2ba + 0.21000000000003638)                                     ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(0xdb2 * -0x2 + -0x1d49 + 0x12 * 0x3be + 0.8695999999999913),                                         0x1 * 0x1280 + 0x2 * -0x7e4 + -0x2 * 0xb7 + 0.46399999999999864,                                         -(0x19 * 0x3 + -0x1401 + 0x1770 + 0.8425999999999476)                                     ]);                                     continue;                                 case '2':                                     _0x12ee1a[_0x5a7724(0x62b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4db)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x348)], _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x580)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(-0x21bb + -0x22d3 + 0x50db + 0.0500000000001819),                                         0x1ea4 + 0x1 * 0x14ef + -0x3357 + 0.6499999999999986,                                         -(0x26a1 + 0x1676 + 0xe * -0x41f + 0.21000000000003638)                                     ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(-0x15ec + 0x400 + -0x1e59 * -0x1 + 0.4054999999998472),                                         0x170e * 0x1 + 0x1bd0 + -0x3 * 0x10df + 0.7750000000000057,                                         -(0xadd + 0x1efa + -0x11 * 0x243 + 0.7952999999999975)                                     ]);                                     continue;                                 case '3':                                     cameraImportDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                     continue;                                 case '4':                                     _0x12ee1a[_0x5a7724(0x438)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x244)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x28a)], _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4d8)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(0x184a + 0x252f + -0x8d * 0x59 + 0.6599999999998545),                                         -0xc1 * -0x25 + 0x19 * 0x18d + -0x416d + 0.910000000000025,                                         -(0x25d7 + 0x18 * 0x12 + -0x5f3 * 0x6 + 0.9099999999999682)                                     ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(-0xff0 + 0x5 * -0x223 + 0x2715 + 0.44840000000021973),                                         0x1f * 0x94 + 0x23ea + -0x348f + 0.43990000000002283,                                         -(0x1 * -0x554 + 0x1124 + -0x7d9 + 0.3348999999999478)                                     ]);                                     continue;                                 case '5':                                     junhuaClickObjs[_0x5a7724(0x43a)](_0x308751);                                     continue;                                 case '6':                                     _0x12ee1a[_0x5a7724(0x570)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x21e)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x4ee)], _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x56c)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(0x6f + -0x1468 + 0x1c11 + 0.3200000000001637),                                         -0xf83 + 0x20ff * -0x1 + 0x31bf + 0.75,                                         -(0x5 * 0xa4 + -0x13b9 + 0x1 * 0x1411 + 0.6100000000000136)                                     ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(-0x1bbe + -0x1b9d * -0x1 + 0x3 * 0x2bd + 0.95699999999988),                                         -0x21cb * -0x1 + -0x1e6a + -0x219 * 0x1 + 0.19029999999997926,                                         -(0x1 * -0x156a + -0x1471 + 0x1c * 0x19e + 0.8069000000000415)                                     ]);                                     continue;                                 case '7':                                     _0x12ee1a[_0x5a7724(0x29a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x40b)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x65c)], _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5ad)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                         -(-0x6ed + -0x731 * -0x1 + 0x1 * 0xea7 + 0.7399999999997817),                                         0x24 * -0xd8 + -0x234e + 0x1cf * 0x25 + 0.839999999999975,                                         -(0x9 * -0x1f7 + -0x68f * -0x1 + 0xeda + 0.36000000000001364)                                     ], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                         -(-0xb43 + -0x722 + 0x2178 + 0.3602000000000771),                                         0x107f + 0x1 * 0x14b7 + -0x23ec + 0.6541000000000281,                                         -(-0x22b * -0x5 + 0x112f + -0x184c + 0.4438999999999851)                                     ]);                                     continue;                                 }                                 break;                             }                         }                     } else {                         if (_0x12ee1a[_0x5a7724(0x3f2)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x65a)]))                             _0x12ee1a[_0x5a7724(0x3e5)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x387)]) && (_0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x3d2)], limoClickObjs[_0x5a7724(0x43a)](_0x308751));                         else {                             if (_0x12ee1a[_0x5a7724(0x6b3)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x72b)])) {                                 if (_0x12ee1a[_0x5a7724(0x517)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x335)]) || _0x12ee1a[_0x5a7724(0x517)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x27e)]) || _0x12ee1a[_0x5a7724(0x1ae)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2af)]) || _0x12ee1a[_0x5a7724(0x1ae)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x609)]) || _0x12ee1a[_0x5a7724(0x3ad)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x44d)]) || _0x12ee1a[_0x5a7724(0x316)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3e9)]))                                     _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)] = _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x361)](), _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x214) + 'e'] = !![], posuijianJiaodaiObjs[_0x5a7724(0x43a)](_0x308751);                                 else {                                     if (_0x12ee1a[_0x5a7724(0x3bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2c1)])) {                                         const _0x9e1993 = _0x12ee1a[_0x5a7724(0x5ae)][_0x5a7724(0x44f)]('|');                                         let _0x57655b = -0x2 * 0x1082 + 0x157d + 0xb87;                                         while (!![]) {                                             switch (_0x9e1993[_0x57655b++]) {                                             case '0':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(0xea1 + 0x1 * -0x232f + 0xda * 0x25 + 0.19020000000000437),                                                     -0x642 + 0x4c * -0x37 + 0x17e2 + 0.39999999999997726,                                                     -(0x2353 + -0x1063 + -0xd * 0x55 + 0.3971999999998843)                                                 ];                                                 continue;                                             case '1':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(-0x8 * 0x233 + -0x20 * 0xa9 + -0x31d5 * -0x1 + 0.7020999999999731),                                                     -0xd2e + -0x1 * 0x2267 + 0x1 * 0x30f3 + 0.13670000000001892,                                                     -(0x1 * -0x79b + -0x1 * -0x26b2 + -0x1 * 0x109d + 0.1552999999998974)                                                 ];                                                 continue;                                             case '2':                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x409)];                                                 continue;                                             case '3':                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '4':                                                 posuiClickObjs[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '5':                                                 _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x341)];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x12ee1a[_0x5a7724(0x73f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x446)])) {                                             const _0x20b169 = _0x12ee1a[_0x5a7724(0x3bb)][_0x5a7724(0x44f)]('|');                                             let _0x10790e = 0x200f + -0x13cc + -0xc43;                                             while (!![]) {                                                 switch (_0x20b169[_0x10790e++]) {                                                 case '0':                                                     _0x308751[_0x5a7724(0x5d9)] = _0x12ee1a[_0x5a7724(0x5d8)];                                                     continue;                                                 case '1':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(-0x2399 + 0xbff + -0x1 * -0x21dd + 0.30150000000003274),                                                         -0x26b3 + 0x178a + 0x108c + 0.7099000000000046,                                                         -(-0x3 * 0x3bd + -0x13c1 + -0x37f * -0xd + 0.3888000000001739)                                                     ];                                                     continue;                                                 case '2':                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5d6)];                                                     continue;                                                 case '4':                                                     posuiClickObjs[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '5':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(0x409 + -0x5ef * -0x3 + 0x5 * -0x24a + 0.24969999999984793),                                                         -0x2597 + -0x3 * -0x4ef + 0x2 * 0xc0b + 0.08999999999997499,                                                         -(-0xd * -0x1cf + -0x5d7 + 0x9 * -0x57 + 0.2417000000000371)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         }                                     }                                 }                             } else {                                 if (_0x12ee1a[_0x5a7724(0x30e)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x642)]))                                     (_0x12ee1a[_0x5a7724(0x196)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1f3)]) || _0x12ee1a[_0x5a7724(0x6ed)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x204)]) || _0x12ee1a[_0x5a7724(0x641)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x60d)]) || _0x12ee1a[_0x5a7724(0x278)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x435)])) && (_0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)] = _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x361)](), _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x214) + 'e'] = !![], saifenjianJiaodaiObjs[_0x5a7724(0x43a)](_0x308751));                                 else                                     _0x12ee1a[_0x5a7724(0x197)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x51f)]) && ((_0x12ee1a[_0x5a7724(0x6b9)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x454)]) || _0x12ee1a[_0x5a7724(0x380)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6d6)]) || _0x12ee1a[_0x5a7724(0x239)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4bb)]) || _0x12ee1a[_0x5a7724(0x3f2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x738)]) || _0x12ee1a[_0x5a7724(0x317)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4d6)]) || _0x12ee1a[_0x5a7724(0x316)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x398)]) || _0x12ee1a[_0x5a7724(0x522)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1a4)]) || _0x12ee1a[_0x5a7724(0x2c4)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1be)]) || _0x12ee1a[_0x5a7724(0x6a0)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x754)])) && (_0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)] = _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x361)](), _0x308751[_0x5a7724(0x359)][_0x5a7724(0x70a)][_0x5a7724(0x214) + 'e'] = !![], suishijianJiaodaiObjs[_0x5a7724(0x43a)](_0x308751)));                             }                         }                     }                 }                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x4dc)] = _0x308751[_0x5a7724(0x359)][_0x5a7724(0x5e2) + 't'], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x48f)] = _0x308751[_0x5a7724(0x48f)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3f3) + _0x5a7724(0x5cd)] = _0x308751[_0x5a7724(0x3f3) + _0x5a7724(0x5cd)], _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x73a) + 'r'] = _0x308751[_0x5a7724(0x73a) + 'r'];             } else {                 if (_0x12ee1a[_0x5a7724(0x380)](_0x308751[_0x5a7724(0x474)], _0x12ee1a[_0x5a7724(0x2c3)])) {                     if (_0x12ee1a[_0x5a7724(0x2b9)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x198)])) {                         if (_0x12ee1a[_0x5a7724(0x5c2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x651)]) || _0x12ee1a[_0x5a7724(0x4f2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x447)]) || _0x12ee1a[_0x5a7724(0x759)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x339)]) || _0x12ee1a[_0x5a7724(0x73d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x333)]) || _0x12ee1a[_0x5a7724(0x27d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x620)]) || _0x12ee1a[_0x5a7724(0x1a3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x20d)]) || _0x12ee1a[_0x5a7724(0x41e)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1bd)]) || _0x12ee1a[_0x5a7724(0x31c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x233)]))                             _0x308751[_0x5a7724(0x6f1)](_0x45490c => {                                 const _0x56fbbd = _0x5a7724;                                 if (_0x45490c[_0x56fbbd(0x597)]) {                                     let _0x23e604 = _0x308751[_0x56fbbd(0x5d9)][_0x56fbbd(0x4fe)](-0x6aa + -0xcf1 * 0x1 + 0x13a0 * 0x1);                                     _0x45490c[_0x56fbbd(0x5d9)] = _0x4baf63[_0x56fbbd(0x685)](_0x4baf63[_0x56fbbd(0x63a)], _0x23e604), limoClickObjs[_0x56fbbd(0x43a)](_0x45490c);                                 }                             });                         else {                             if (_0x12ee1a[_0x5a7724(0x66b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5e0)]) || _0x12ee1a[_0x5a7724(0x693)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x695)]) || _0x12ee1a[_0x5a7724(0x303)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5f8)]))                                 _0x308751[_0x5a7724(0x6f1)](_0x2abc8f => {                                     const _0x34a88c = _0x5a7724;                                     if (_0x2abc8f[_0x34a88c(0x597)]) {                                         const _0x58c0d6 = _0x4baf63[_0x34a88c(0x4fa)][_0x34a88c(0x44f)]('|');                                         let _0x4760b6 = 0x7a5 * 0x5 + 0x3b * -0x7 + 0x3 * -0xc34;                                         while (!![]) {                                             switch (_0x58c0d6[_0x4760b6++]) {                                             case '0':                                                 _0x4baf63[_0x34a88c(0x716)](_0x308751[_0x34a88c(0x5d9)], _0x4baf63[_0x34a88c(0x6b5)]) && (_0x2abc8f[_0x34a88c(0x5d9)] = _0x4baf63[_0x34a88c(0x6ab)]);                                                 continue;                                             case '1':                                                 _0x4baf63[_0x34a88c(0x410)](_0x308751[_0x34a88c(0x5d9)], _0x4baf63[_0x34a88c(0x75f)]) && (_0x2abc8f[_0x34a88c(0x5d9)] = _0x4baf63[_0x34a88c(0x35e)]);                                                 continue;                                             case '2':                                                 _0x4baf63[_0x34a88c(0x3ba)](_0x308751[_0x34a88c(0x5d9)], _0x4baf63[_0x34a88c(0x606)]) && (_0x2abc8f[_0x34a88c(0x5d9)] = _0x4baf63[_0x34a88c(0x413)]);                                                 continue;                                             case '3':                                                 limoClickObjs[_0x34a88c(0x43a)](_0x2abc8f);                                                 continue;                                             case '4':                                                 (_0x4baf63[_0x34a88c(0x34b)](_0x2abc8f[_0x34a88c(0x5d9)], _0x4baf63[_0x34a88c(0x265)]) || _0x4baf63[_0x34a88c(0x716)](_0x2abc8f[_0x34a88c(0x5d9)], _0x4baf63[_0x34a88c(0x4c8)]) || _0x4baf63[_0x34a88c(0x410)](_0x2abc8f[_0x34a88c(0x5d9)], _0x4baf63[_0x34a88c(0x283)])) && (_0x2abc8f[_0x34a88c(0x359)][_0x34a88c(0x70a)] = _0x2abc8f[_0x34a88c(0x359)][_0x34a88c(0x70a)][_0x34a88c(0x361)](), _0x2abc8f[_0x34a88c(0x359)][_0x34a88c(0x70a)][_0x34a88c(0x214) + 'e'] = !![], limojiJiaodaiObjs[_0x34a88c(0x43a)](_0x2abc8f));                                                 continue;                                             }                                             break;                                         }                                     }                                 });                             else {                                 if (_0x12ee1a[_0x5a7724(0x4ab)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x75a)]) || _0x12ee1a[_0x5a7724(0x193)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6ca)]) || _0x12ee1a[_0x5a7724(0x72a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1a9)]) || _0x12ee1a[_0x5a7724(0x319)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x211)]) || _0x12ee1a[_0x5a7724(0x6b9)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6f8)]))                                     _0x308751[_0x5a7724(0x6f1)](_0x177b35 => {                                         const _0x48e7fa = _0x5a7724;                                         if (_0x177b35[_0x48e7fa(0x597)]) {                                             const _0x19e8bd = _0x4baf63[_0x48e7fa(0x34d)][_0x48e7fa(0x44f)]('|');                                             let _0x3d7fc5 = 0x1326 + -0x198e + 0x668;                                             while (!![]) {                                                 switch (_0x19e8bd[_0x3d7fc5++]) {                                                 case '0':                                                     _0x4baf63[_0x48e7fa(0x557)](_0x308751[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x524)]) && (_0x177b35[_0x48e7fa(0x5d9)] = _0x4baf63[_0x48e7fa(0x275)]);                                                     continue;                                                 case '1':                                                     (_0x4baf63[_0x48e7fa(0x402)](_0x177b35[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x449)]) || _0x4baf63[_0x48e7fa(0x402)](_0x177b35[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x74a)]) || _0x4baf63[_0x48e7fa(0x34e)](_0x177b35[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x717)]) || _0x4baf63[_0x48e7fa(0x505)](_0x177b35[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x6ec)]) || _0x4baf63[_0x48e7fa(0x34b)](_0x177b35[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x264)])) && (_0x177b35[_0x48e7fa(0x359)][_0x48e7fa(0x70a)] = _0x177b35[_0x48e7fa(0x359)][_0x48e7fa(0x70a)][_0x48e7fa(0x361)](), _0x177b35[_0x48e7fa(0x359)][_0x48e7fa(0x70a)][_0x48e7fa(0x214) + 'e'] = !![], limojiJiaodaiObjs[_0x48e7fa(0x43a)](_0x177b35));                                                     continue;                                                 case '2':                                                     limoClickObjs[_0x48e7fa(0x43a)](_0x177b35);                                                     continue;                                                 case '3':                                                     _0x4baf63[_0x48e7fa(0x34e)](_0x308751[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x479)]) && (_0x177b35[_0x48e7fa(0x5d9)] = _0x4baf63[_0x48e7fa(0x236)]);                                                     continue;                                                 case '4':                                                     _0x4baf63[_0x48e7fa(0x410)](_0x308751[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x669)]) && (_0x177b35[_0x48e7fa(0x5d9)] = _0x4baf63[_0x48e7fa(0x610)]);                                                     continue;                                                 case '5':                                                     _0x4baf63[_0x48e7fa(0x402)](_0x308751[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x463)]) && (_0x177b35[_0x48e7fa(0x5d9)] = _0x4baf63[_0x48e7fa(0x249)]);                                                     continue;                                                 case '6':                                                     _0x4baf63[_0x48e7fa(0x402)](_0x308751[_0x48e7fa(0x5d9)], _0x4baf63[_0x48e7fa(0x70b)]) && (_0x177b35[_0x48e7fa(0x5d9)] = _0x4baf63[_0x48e7fa(0x74c)]);                                                     continue;                                                 }                                                 break;                                             }                                         }                                     });                                 else {                                     if (_0x12ee1a[_0x5a7724(0x36f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4ce)]) || _0x12ee1a[_0x5a7724(0x1ae)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x460)]) || _0x12ee1a[_0x5a7724(0x2e1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x263)]) || _0x12ee1a[_0x5a7724(0x357)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x721)]) || _0x12ee1a[_0x5a7724(0x3db)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x628)]) || _0x12ee1a[_0x5a7724(0x2bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x730)]) || _0x12ee1a[_0x5a7724(0x345)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x652)]) || _0x12ee1a[_0x5a7724(0x1b5)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x549)]))                                         _0x308751[_0x5a7724(0x6f1)](_0x3dc133 => {                                             const _0xafb67b = _0x5a7724;                                             if (_0x3dc133[_0xafb67b(0x597)]) {                                                 let _0x3a8f33 = _0x308751[_0xafb67b(0x5d9)][_0xafb67b(0x4fe)](0x33 * 0x67 + -0x60d * 0x1 + -0xe74);                                                 _0x3dc133[_0xafb67b(0x5d9)] = _0x4baf63[_0xafb67b(0x680)](_0x4baf63[_0xafb67b(0x34f)], _0x3a8f33), limoClickObjs[_0xafb67b(0x43a)](_0x3dc133);                                             }                                         });                                     else                                         (_0x12ee1a[_0x5a7724(0x6b2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x720)]) || _0x12ee1a[_0x5a7724(0x4df)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x74f)]) || _0x12ee1a[_0x5a7724(0x334)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x50a)]) || _0x12ee1a[_0x5a7724(0x1d0)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x661)]) || _0x12ee1a[_0x5a7724(0x6b9)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x51d)]) || _0x12ee1a[_0x5a7724(0x52a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2ad)]) || _0x12ee1a[_0x5a7724(0x731)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x332)]) || _0x12ee1a[_0x5a7724(0x279)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4a9)])) && _0x308751[_0x5a7724(0x6f1)](_0x5624de => {                                             const _0x2caa4a = _0x5a7724;                                             if (_0x5624de[_0x2caa4a(0x597)]) {                                                 let _0x32a5cf = _0x308751[_0x2caa4a(0x5d9)][_0x2caa4a(0x4fe)](0x97e + -0x764 + 0x1 * -0x215);                                                 _0x5624de[_0x2caa4a(0x5d9)] = _0x12ee1a[_0x2caa4a(0x32e)](_0x12ee1a[_0x2caa4a(0x3a3)], _0x32a5cf), limoClickObjs[_0x2caa4a(0x43a)](_0x5624de);                                             }                                         });                                 }                             }                         }                     } else {                         if (_0x12ee1a[_0x5a7724(0x394)](_0x181e61[_0x5a7724(0x5d9)], '报警')) {                             if (_0x12ee1a[_0x5a7724(0x316)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x34c)])) {                                 const _0x49afef = _0x12ee1a[_0x5a7724(0x4d1)][_0x5a7724(0x44f)]('|');                                 let _0x5e772c = 0xe * -0x133 + 0x102f + -0x5 * -0x1f;                                 while (!![]) {                                     switch (_0x49afef[_0x5e772c++]) {                                     case '0':                                         _0x308751[_0x5a7724(0x6f1)](_0x3cdaa3 => {                                             const _0x54d41b = _0x5a7724;                                             _0x3cdaa3[_0x54d41b(0x597)] && (_0x3cdaa3[_0x54d41b(0x5d9)] = _0x12ee1a[_0x54d41b(0x667)], junhuaClickObjs[_0x54d41b(0x43a)](_0x3cdaa3));                                         });                                         continue;                                     case '1':                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                         continue;                                     case '2':                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                             -(0x3 * 0x4c1 + 0x2144 + 0xc * -0x2cf + 0.7296999999998661),                                             0x131f + -0xe5 * 0x1d + 0x7f8 + 0.8965000000000032,                                             -(-0x15df + -0x2244 + -0x10 * -0x3bc + 0.4296000000000504)                                         ];                                         continue;                                     case '3':                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x737)];                                         continue;                                     case '4':                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                             -(-0x7d * 0x3 + -0x1 * 0xd06 + -0xa * -0x2d5 + 0.38000000000010914),                                             0x13 * 0x1d2 + 0x1 * 0x17 + -0x218b + 0.2799999999999727,                                             -(0x1295 * -0x1 + -0xc2 + 0x1711 + 0.5299999999999727)                                         ];                                         continue;                                     }                                     break;                                 }                             } else {                                 if (_0x12ee1a[_0x5a7724(0x4be)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1bc)])) {                                     const _0x1321f1 = _0x12ee1a[_0x5a7724(0x242)][_0x5a7724(0x44f)]('|');                                     let _0x1a83ff = -0x692 * 0x1 + -0x1a5 * -0x10 + -0x13be;                                     while (!![]) {                                         switch (_0x1321f1[_0x1a83ff++]) {                                         case '0':                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                 -(-0x5 * 0x62b + -0x5 * 0x598 + 0x343 * 0x16 + 0.5280999999999949),                                                 -0x2141 + 0x5a8 + 0x1cbe + 0.6465999999999781,                                                 -(0xd8 * -0x1 + 0x724 + 0x2a7 * -0x1 + 0.2480000000000473)                                             ];                                             continue;                                         case '1':                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                             continue;                                         case '2':                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x61b)];                                             continue;                                         case '3':                                             _0x308751[_0x5a7724(0x6f1)](_0x1b2f21 => {                                                 const _0x3b6adc = _0x5a7724;                                                 _0x1b2f21[_0x3b6adc(0x597)] && (_0x1b2f21[_0x3b6adc(0x5d9)] = _0x4baf63[_0x3b6adc(0x3da)], junhuaClickObjs[_0x3b6adc(0x43a)](_0x1b2f21));                                             });                                             continue;                                         case '4':                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                 -(0x55a + -0x3c9 + 0xb63 + 0.9400000000000546),                                                 0x24fe + 0x3e0 + -0x27bc + 0.2699999999999818,                                                 -(-0x18ab + 0x132c + 0x939 * 0x1 + 0.5199999999999818)                                             ];                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x12ee1a[_0x5a7724(0x2c0)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5a5)])) {                                         const _0x37952c = _0x12ee1a[_0x5a7724(0x2cd)][_0x5a7724(0x44f)]('|');                                         let _0xe41ed3 = 0x2 * -0xa8e + 0x1daf + -0x893;                                         while (!![]) {                                             switch (_0x37952c[_0xe41ed3++]) {                                             case '0':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(0x1 * -0xaca + 0x1a2c + -0x597 + 0.5189999999997781),                                                     -0x213 + -0x1 * 0xbd7 + -0x3 * -0x506 + 0.07049999999998136,                                                     -(-0xb * 0x19b + 0x2 * 0x78b + -0x62f * -0x1 + 0.9367999999999483)                                                 ];                                                 continue;                                             case '1':                                                 _0x308751[_0x5a7724(0x6f1)](_0x2dd3e8 => {                                                     const _0x5cf35 = _0x5a7724;                                                     _0x2dd3e8[_0x5cf35(0x597)] && (_0x2dd3e8[_0x5cf35(0x5d9)] = _0x12ee1a[_0x5cf35(0x667)], junhuaClickObjs[_0x5cf35(0x43a)](_0x2dd3e8));                                                 });                                                 continue;                                             case '2':                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '3':                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x624)];                                                 continue;                                             case '4':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(0x1 * 0x1315 + -0x259b + 0x1c53 + 0.38000000000010914),                                                     -0xd * 0x2d3 + 0x115 * 0x6 + 0x1f5b * 0x1 + 0.2799999999999727,                                                     -(0x154b * -0x1 + 0x19b4 + -0xaf + 0.5299999999999727)                                                 ];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x12ee1a[_0x5a7724(0x305)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5a4)])) {                                             const _0x2661d0 = _0x12ee1a[_0x5a7724(0x1d8)][_0x5a7724(0x44f)]('|');                                             let _0x49e40e = 0x1 * -0x262d + 0xb * 0x2b9 + 0x83a;                                             while (!![]) {                                                 switch (_0x2661d0[_0x49e40e++]) {                                                 case '0':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(0x23ff + -0x79 + 0x5 * -0x495 + 0.671100000000024),                                                         -0x1dfb + 0x1aa + -0x236 * -0xd + 0.6655999999999977,                                                         -(-0x21ee + -0x40b + 0x2c88 + 0.5574999999998909)                                                     ];                                                     continue;                                                 case '1':                                                     fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '2':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6ac)];                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(-0x511 + -0x137b * -0x1 + -0x1cd + 0.6599999999998545),                                                         0x1568 + -0x10 * 0x1b9 + 0x1 * 0x685 + 0.7999999999999972,                                                         -(-0x5d5 + -0x188a + 0x24c2 + 0.43000000000006366)                                                     ];                                                     continue;                                                 case '4':                                                     _0x308751[_0x5a7724(0x6f1)](_0x29ccd6 => {                                                         const _0x2323f3 = _0x5a7724;                                                         _0x29ccd6[_0x2323f3(0x597)] && (_0x29ccd6[_0x2323f3(0x5d9)] = _0x4baf63[_0x2323f3(0x3da)], limoClickObjs[_0x2323f3(0x43a)](_0x29ccd6));                                                     });                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x12ee1a[_0x5a7724(0x43f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2f0)])) {                                                 const _0x92adf3 = _0x12ee1a[_0x5a7724(0x42e)][_0x5a7724(0x44f)]('|');                                                 let _0x3d8522 = 0x1a02 + 0x1f6 + -0x28 * 0xb3;                                                 while (!![]) {                                                     switch (_0x92adf3[_0x3d8522++]) {                                                     case '0':                                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     case '1':                                                         _0x308751[_0x5a7724(0x6f1)](_0x27ea38 => {                                                             const _0x2bcd33 = _0x5a7724;                                                             _0x27ea38[_0x2bcd33(0x597)] && (_0x27ea38[_0x2bcd33(0x5d9)] = _0x12ee1a[_0x2bcd33(0x667)], limoClickObjs[_0x2bcd33(0x43a)](_0x27ea38));                                                         });                                                         continue;                                                     case '2':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                             -(0x1ea * 0x3 + 0x1d2f + 0x15da * -0x1 + 0.17299999999977445),                                                             0x1292 * -0x1 + 0x1e7 + 0x1113 + 0.6821000000000055,                                                             -(0x1710 + 0x2605 + -0x3681 + 0.7657999999998992)                                                         ];                                                         continue;                                                     case '3':                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x49c)];                                                         continue;                                                     case '4':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                             -(-0x15b * 0x13 + -0x4 * 0x2c2 + 0x1 * 0x31db + 0.8000000000001819),                                                             0x102d + 0x2020 + 0x4 * -0xbfc + 0.769999999999996,                                                             -(-0x1ebf + -0x167d * -0x1 + -0x1 * -0xea5 + 0.2999999999999545)                                                         ];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x12ee1a[_0x5a7724(0x1d3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4e0)])) {                                                     const _0x2e15d5 = _0x12ee1a[_0x5a7724(0x5f6)][_0x5a7724(0x44f)]('|');                                                     let _0x5ab3c6 = 0x176f + -0x7c0 + -0xfaf;                                                     while (!![]) {                                                         switch (_0x2e15d5[_0x5ab3c6++]) {                                                         case '0':                                                             _0x308751[_0x5a7724(0x6f1)](_0xe55b97 => {                                                                 const _0xc51420 = _0x5a7724;                                                                 _0xe55b97[_0xc51420(0x597)] && (_0xe55b97[_0xc51420(0x5d9)] = _0x12ee1a[_0xc51420(0x667)], limoClickObjs[_0xc51420(0x43a)](_0xe55b97));                                                             });                                                             continue;                                                         case '1':                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x42f)];                                                             continue;                                                         case '2':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                 -(-0x1709 * -0x1 + -0x28f + -0x19 * 0x47 + 0.75),                                                                 0x71 * -0x32 + 0x2 * 0x70f + 0x851 + 0.769999999999996,                                                                 -(0x2083 + -0x8a5 * 0x4 + -0x4 * -0x21d + 0.31999999999993634)                                                             ];                                                             continue;                                                         case '3':                                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                             continue;                                                         case '4':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                 -(0x20a5 + -0x22f8 + 0xfde + 0.7907000000000153),                                                                 -0x4be * 0x2 + -0x5 * -0x513 + -0xf7c + 0.4047000000000054,                                                                 -(0x236a + 0x507 + -0x21e3 + 0.8554999999998927)                                                             ];                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x12ee1a[_0x5a7724(0x257)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x5c1)])) {                                                         const _0x430891 = _0x12ee1a[_0x5a7724(0x315)][_0x5a7724(0x44f)]('|');                                                         let _0x1274f = 0x2278 + -0x11 * 0x1eb + -0x9 * 0x35;                                                         while (!![]) {                                                             switch (_0x430891[_0x1274f++]) {                                                             case '0':                                                                 _0x308751[_0x5a7724(0x6f1)](_0x3e2cde => {                                                                     const _0x2d07f8 = _0x5a7724;                                                                     _0x3e2cde[_0x2d07f8(0x597)] && (_0x3e2cde[_0x2d07f8(0x5d9)] = _0x12ee1a[_0x2d07f8(0x667)], limoClickObjs[_0x2d07f8(0x43a)](_0x3e2cde));                                                                 });                                                                 continue;                                                             case '1':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                     -(-0x9e * 0x3 + -0x16d * -0xb + 0x3b + 0.6900000000000546),                                                                     -0x68a + 0x17bc + -0x10d5 + 0.7600000000000051,                                                                     -(0x2638 + 0x1651 * -0x1 + 0xae * -0xe + 0.2799999999999727)                                                                 ];                                                                 continue;                                                             case '2':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                     -(-0x149 * 0x17 + 0x1 * -0x769 + 0xc3 * 0x43 + 0.6343000000001666),                                                                     0xcf2 + 0x256e + -0x31fc + 0.5769999999999982,                                                                     -(0x1da5 + 0x18b7 + -0x2fce + 0.3106000000000222)                                                                 ];                                                                 continue;                                                             case '3':                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x618)];                                                                 continue;                                                             case '4':                                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0x12ee1a[_0x5a7724(0x28b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x556)])) {                                                             const _0x4cb175 = _0x12ee1a[_0x5a7724(0x1d4)][_0x5a7724(0x44f)]('|');                                                             let _0x287a6e = 0x18a7 + -0x2 * 0xf8d + 0x673;                                                             while (!![]) {                                                                 switch (_0x4cb175[_0x287a6e++]) {                                                                 case '0':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                         -(0xa3 * -0x1 + 0x23e3 + 0x2a * -0x7e + 0.03000000000020009),                                                                         -0x25 * 0x71 + 0x2a * -0x7 + 0x11d8 + 0.7999999999999972,                                                                         -(0x21e * -0x6 + 0x233b + -0x1024 + 0.40000000000009095)                                                                     ];                                                                     continue;                                                                 case '1':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                         -(-0x1ec0 + -0x1deb + -0x2 * -0x259f + 0.5162000000000262),                                                                         -0x2ce * -0x1 + 0x376 * -0x8 + 0x1946 + 0.45650000000000546,                                                                         -(0xa63 + -0x427 + -0x51 * -0x1 + 0.42429999999990287)                                                                     ];                                                                     continue;                                                                 case '2':                                                                     _0x308751[_0x5a7724(0x6f1)](_0x84b526 => {                                                                         const _0x3dbdfe = _0x5a7724;                                                                         _0x84b526[_0x3dbdfe(0x597)] && (_0x84b526[_0x3dbdfe(0x5d9)] = _0x12ee1a[_0x3dbdfe(0x667)], limoClickObjs[_0x3dbdfe(0x43a)](_0x84b526));                                                                     });                                                                     continue;                                                                 case '3':                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5c4)];                                                                     continue;                                                                 case '4':                                                                     fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         } else {                                                             if (_0x12ee1a[_0x5a7724(0x45d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2b2)])) {                                                                 const _0x2cf5b5 = _0x12ee1a[_0x5a7724(0x331)][_0x5a7724(0x44f)]('|');                                                                 let _0x3753e0 = -0x2 * -0xd8f + 0x6d * 0x1 + -0xb * 0x281;                                                                 while (!![]) {                                                                     switch (_0x2cf5b5[_0x3753e0++]) {                                                                     case '0':                                                                         _0x308751[_0x5a7724(0x6f1)](_0x151a4b => {                                                                             const _0x338627 = _0x5a7724;                                                                             _0x151a4b[_0x338627(0x597)] && (_0x151a4b[_0x338627(0x5d9)] = _0x4baf63[_0x338627(0x3da)], limoClickObjs[_0x338627(0x43a)](_0x151a4b));                                                                         });                                                                         continue;                                                                     case '1':                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5c3)];                                                                         continue;                                                                     case '2':                                                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                         continue;                                                                     case '3':                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                             -(0x1edd * -0x1 + 0x7 * 0x165 + 0x241c + 0.05209999999988213),                                                                             0xa3f * -0x1 + 0x1db6 + -0x6f * 0x2c + 0.9133999999999958,                                                                             -(-0x1ec8 + 0x2168 * 0x1 + 0x3ea * 0x1 + 0.08539999999993597)                                                                         ];                                                                         continue;                                                                     case '4':                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                             -(-0x17 * -0xfb + -0x1 * 0x237a + 0x1a * 0x113 + 0.07000000000016371),                                                                             0x5ce + -0x92b + -0x1 * -0x3ba + 0.769999999999996,                                                                             -(0xf7c * 0x2 + 0x11a5 + -0x2a3a + 0.30999999999994543)                                                                         ];                                                                         continue;                                                                     }                                                                     break;                                                                 }                                                             } else {                                                                 if (_0x12ee1a[_0x5a7724(0x3c4)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4a4)])) {                                                                     const _0x2bb1e8 = _0x12ee1a[_0x5a7724(0x532)][_0x5a7724(0x44f)]('|');                                                                     let _0x488f89 = -0x1dbb + 0x8 * 0x414 + -0x2e5;                                                                     while (!![]) {                                                                         switch (_0x2bb1e8[_0x488f89++]) {                                                                         case '0':                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                 -(0x1964 + 0x1b1c + -0x2515 + 0.8409999999998945),                                                                                 -0x6 * 0x3e6 + -0xd83 + -0x637 * -0x6 + 0.722999999999999,                                                                                 -(0x112 + 0xcf1 + -0x77b + 0.9076999999999771)                                                                             ];                                                                             continue;                                                                         case '1':                                                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                             continue;                                                                         case '2':                                                                             _0x308751[_0x5a7724(0x6f1)](_0x273124 => {                                                                                 const _0x4d64ab = _0x5a7724;                                                                                 _0x273124[_0x4d64ab(0x597)] && (_0x273124[_0x4d64ab(0x5d9)] = _0x12ee1a[_0x4d64ab(0x667)], limoClickObjs[_0x4d64ab(0x43a)](_0x273124));                                                                             });                                                                             continue;                                                                         case '3':                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x607)];                                                                             continue;                                                                         case '4':                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                 -(-0x32a + 0x1 * -0x2007 + -0x194e * -0x2 + 0.5399999999999636),                                                                                 -0x198 * 0x3 + -0x65 * 0x1f + 0x1 * 0x1160 + 0.7600000000000051,                                                                                 -(0x11f5 + -0x1 * 0x6d3 + -0x4bf * 0x1 + 0.2599999999999909)                                                                             ];                                                                             continue;                                                                         }                                                                         break;                                                                     }                                                                 } else {                                                                     if (_0x12ee1a[_0x5a7724(0x22f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x520)])) {                                                                         const _0x3d58ec = _0x12ee1a[_0x5a7724(0x40d)][_0x5a7724(0x44f)]('|');                                                                         let _0x8d077a = -0x1176 + -0x1 * -0x18f7 + -0x781;                                                                         while (!![]) {                                                                             switch (_0x3d58ec[_0x8d077a++]) {                                                                             case '0':                                                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                 continue;                                                                             case '1':                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                     -(-0x4a3 * 0x3 + 0x5ba + 0x1808 + 0.9456000000000131),                                                                                     0x261f * 0x1 + 0xfc4 + -0x3580 + 0.5799999999999983,                                                                                     -(0x9 * -0x200 + 0x486 * -0x2 + 0xbf * 0x2d + 0.934400000000096)                                                                                 ];                                                                                 continue;                                                                             case '2':                                                                                 _0x308751[_0x5a7724(0x6f1)](_0x44c17e => {                                                                                     const _0x927aa3 = _0x5a7724;                                                                                     _0x44c17e[_0x927aa3(0x597)] && (_0x44c17e[_0x927aa3(0x5d9)] = _0x4baf63[_0x927aa3(0x3da)], limoClickObjs[_0x927aa3(0x43a)](_0x44c17e));                                                                                 });                                                                                 continue;                                                                             case '3':                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4fd)];                                                                                 continue;                                                                             case '4':                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                     -(-0x1e66 + 0x14eb + 0xcaa * 0x2 + 0.5500000000001819),                                                                                     -0x1db3 + -0x362 + 0x3 * 0xb26 + 0.7900000000000063,                                                                                     -(0x1 * 0x168d + -0x10cb + 0xa1 + 0.38000000000010914)                                                                                 ];                                                                                 continue;                                                                             }                                                                             break;                                                                         }                                                                     } else {                                                                         if (_0x12ee1a[_0x5a7724(0x3c7)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x444)])) {                                                                             const _0x4e126e = _0x12ee1a[_0x5a7724(0x37a)][_0x5a7724(0x44f)]('|');                                                                             let _0x5cba5a = 0x1f9e + 0x16 * -0x9f + -0x11f4;                                                                             while (!![]) {                                                                                 switch (_0x4e126e[_0x5cba5a++]) {                                                                                 case '0':                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x3b0)];                                                                                     continue;                                                                                 case '1':                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                         -(-0x1b9 + -0x1245 + 0x1e92 + 0.599999999999909),                                                                                         -0xc2 * 0x1 + -0x120f + 0x1 * 0x147d + 0.22000000000002728,                                                                                         -(-0xea4 + -0x8f9 * 0x3 + 0x3 * 0x11f3 + 0.2899999999999636)                                                                                     ];                                                                                     continue;                                                                                 case '2':                                                                                     fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                     continue;                                                                                 case '3':                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                         -(-0x1e5 + 0x795 + 0x4e3 + 0.7332999999998719),                                                                                         0x24b8 + -0x1541 + 0x1 * -0xdc3 + 0.8772999999999911,                                                                                         -(-0xc46 + 0x19da + -0x181 + 0.637000000000171)                                                                                     ];                                                                                     continue;                                                                                 case '4':                                                                                     _0x308751[_0x5a7724(0x6f1)](_0x1e28a1 => {                                                                                         const _0x1db7cf = _0x5a7724;                                                                                         _0x1e28a1[_0x1db7cf(0x597)] && (_0x1e28a1[_0x1db7cf(0x5d9)] = _0x12ee1a[_0x1db7cf(0x667)], shaifenClickObjs[_0x1db7cf(0x43a)](_0x1e28a1));                                                                                     });                                                                                     continue;                                                                                 }                                                                                 break;                                                                             }                                                                         } else {                                                                             if (_0x12ee1a[_0x5a7724(0x46b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3c8)])) {                                                                                 const _0x16dced = _0x12ee1a[_0x5a7724(0x54d)][_0x5a7724(0x44f)]('|');                                                                                 let _0x180183 = 0x525 + -0x39e * -0x6 + -0x4f * 0x57;                                                                                 while (!![]) {                                                                                     switch (_0x16dced[_0x180183++]) {                                                                                     case '0':                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x47f)];                                                                                         continue;                                                                                     case '1':                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                             -(0x4 * 0xc1 + 0x180a + -0x13f * 0xd + 0.11749999999983629),                                                                                             -0x17 * 0xdb + 0x2398 + 0x6d * -0x21 + 0.5801999999999907,                                                                                             -(-0x1 * 0x8f + -0x7e * 0x4f + -0x1 * -0x3696 + 0.647899999999936)                                                                                         ];                                                                                         continue;                                                                                     case '2':                                                                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                         continue;                                                                                     case '3':                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                             -(0x1a7f + -0x1 * 0x853 + -0x1 * 0x753 + 0.17000000000007276),                                                                                             0x1c11 * 0x1 + -0x9d4 + -0x1067 + 0.18999999999999773,                                                                                             -(-0x521 + -0x1657 + 0x2a68 + 0.7100000000000364)                                                                                         ];                                                                                         continue;                                                                                     case '4':                                                                                         _0x308751[_0x5a7724(0x6f1)](_0x327640 => {                                                                                             const _0x14a6be = _0x5a7724;                                                                                             _0x327640[_0x14a6be(0x597)] && (_0x327640[_0x14a6be(0x5d9)] = _0x12ee1a[_0x14a6be(0x667)], posuiClickObjs[_0x14a6be(0x43a)](_0x327640));                                                                                         });                                                                                         continue;                                                                                     }                                                                                     break;                                                                                 }                                                                             } else {                                                                                 if (_0x12ee1a[_0x5a7724(0x5ce)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x374)])) {                                                                                     const _0x5e00e9 = _0x12ee1a[_0x5a7724(0x2c8)][_0x5a7724(0x44f)]('|');                                                                                     let _0x22bba2 = 0x2 * -0x11ad + -0xa72 + 0x7a2 * 0x6;                                                                                     while (!![]) {                                                                                         switch (_0x5e00e9[_0x22bba2++]) {                                                                                         case '0':                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                 -(-0x16b1 * -0x1 + 0x1c69 + -0x2d20 + 0.8599999999999),                                                                                                 -0xa1f * 0x1 + 0x8 * -0x304 + -0x7 * -0x507 + 0.7299999999999898,                                                                                                 -(-0x1ac * -0x7 + 0x1e * 0xd8 + 0x201 * -0xd + 0.11000000000012733)                                                                                             ];                                                                                             continue;                                                                                         case '1':                                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x530)];                                                                                             continue;                                                                                         case '2':                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                 -(0xfd5 + -0x9 * -0x33 + -0x3ed * 0x3 + 0.49080000000003565),                                                                                                 0x222a + 0xa85 + 0x1f * -0x169 + 0.017599999999987403,                                                                                                 -(-0x2a * 0x35 + -0x3 * 0x904 + 0x2eb6 + 0.1289000000001579)                                                                                             ];                                                                                             continue;                                                                                         case '3':                                                                                             _0x308751[_0x5a7724(0x6f1)](_0x2b4b14 => {                                                                                                 const _0x107804 = _0x5a7724;                                                                                                 _0x2b4b14[_0x107804(0x597)] && (_0x2b4b14[_0x107804(0x5d9)] = _0x4baf63[_0x107804(0x3da)], duishiClickObjs[_0x107804(0x43a)](_0x2b4b14));                                                                                             });                                                                                             continue;                                                                                         case '4':                                                                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                             continue;                                                                                         }                                                                                         break;                                                                                     }                                                                                 } else {                                                                                     if (_0x12ee1a[_0x5a7724(0x5ce)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x585)])) {                                                                                         const _0xcca795 = _0x12ee1a[_0x5a7724(0x242)][_0x5a7724(0x44f)]('|');                                                                                         let _0x29c20b = -0x270a + -0x44d * -0x4 + 0x15d6;                                                                                         while (!![]) {                                                                                             switch (_0xcca795[_0x29c20b++]) {                                                                                             case '0':                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                     -(-0x2 * -0xfcf + 0x5e1 + -0x1fa8 + 0.169399999999996),                                                                                                     0x1f8b + -0x1142 + -0xd38 + 0.3967000000000098,                                                                                                     -(0x8 * 0x402 + 0x41d + -0x11b * 0x15 + 0.02930000000014843)                                                                                                 ];                                                                                                 continue;                                                                                             case '1':                                                                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                 continue;                                                                                             case '2':                                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x66d)];                                                                                                 continue;                                                                                             case '3':                                                                                                 _0x308751[_0x5a7724(0x6f1)](_0xc05202 => {                                                                                                     const _0x32df24 = _0x5a7724;                                                                                                     _0xc05202[_0x32df24(0x597)] && (_0xc05202[_0x32df24(0x5d9)] = _0x12ee1a[_0x32df24(0x667)], duishiClickObjs[_0x32df24(0x43a)](_0xc05202));                                                                                                 });                                                                                                 continue;                                                                                             case '4':                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                     -(0x2202 + -0x11f + -0x1ae9 + 0.9200000000000728),                                                                                                     0x10ae + -0x2f * -0x67 + 0x6 * -0x5c2 + 0.7300000000000182,                                                                                                     -(-0x1bea + 0xc4c + 0x2e * 0x9f + 0.6300000000001091)                                                                                                 ];                                                                                                 continue;                                                                                             }                                                                                             break;                                                                                         }                                                                                     } else {                                                                                         if (_0x12ee1a[_0x5a7724(0x3f2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3d3)])) {                                                                                             const _0x1ac43a = _0x12ee1a[_0x5a7724(0x5cf)][_0x5a7724(0x44f)]('|');                                                                                             let _0x1cfdd9 = -0x23b * -0x5 + -0x1a12 + 0xeeb * 0x1;                                                                                             while (!![]) {                                                                                                 switch (_0x1ac43a[_0x1cfdd9++]) {                                                                                                 case '0':                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                         -(0x1 * -0x1e02 + -0x136 + 0x2f81 + 0.0500000000001819),                                                                                                         -0x9 * 0x18d + -0xa7 * 0xc + 0x16b0 + 0.060000000000002274,                                                                                                         -(-0x2 * -0x5de + -0x1b2c * 0x1 + 0x17b1 * 0x1 + 0.5500000000001819)                                                                                                     ];                                                                                                     continue;                                                                                                 case '1':                                                                                                     fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                     continue;                                                                                                 case '2':                                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x733)];                                                                                                     continue;                                                                                                 case '3':                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                         -(-0x1e31 + -0x1369 + 0xa7 * 0x65 + 0.4228000000002794),                                                                                                         -0xfcd + 0x6 * -0x77 + 0x1384 + 0.5186999999999955,                                                                                                         -(-0x3e * 0x3 + 0x19a7 + -0x1083 + 0.3270999999999731)                                                                                                     ];                                                                                                     continue;                                                                                                 case '4':                                                                                                     _0x308751[_0x5a7724(0x6f1)](_0x211cf1 => {                                                                                                         const _0x201858 = _0x5a7724;                                                                                                         _0x211cf1[_0x201858(0x597)] && (_0x211cf1[_0x201858(0x5d9)] = _0x4baf63[_0x201858(0x3da)], suishiClickObjs[_0x201858(0x43a)](_0x211cf1));                                                                                                     });                                                                                                     continue;                                                                                                 }                                                                                                 break;                                                                                             }                                                                                         } else {                                                                                             if (_0x12ee1a[_0x5a7724(0x759)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x50d)])) {                                                                                                 const _0x2000cd = _0x12ee1a[_0x5a7724(0x36a)][_0x5a7724(0x44f)]('|');                                                                                                 let _0x5e11c0 = -0x31 * -0x5 + 0x1f09 + -0x5 * 0x666;                                                                                                 while (!![]) {                                                                                                     switch (_0x2000cd[_0x5e11c0++]) {                                                                                                     case '0':                                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x3ae)];                                                                                                         continue;                                                                                                     case '1':                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                             -(0x5 * -0x2ec + -0xdc4 + 0x2b22 + 0.9299999999998363),                                                                                                             -0x1eb * 0x4 + 0x1e1 * 0x13 + -0x1ae5 + 0.2300000000000182,                                                                                                             -(-0x125b + 0x1c22 + 0x1 * -0x60d + 0.5199999999999818)                                                                                                         ];                                                                                                         continue;                                                                                                     case '2':                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                             -(0x231b + -0xe5 * 0xc + -0x99d + 0.1950000000001637),                                                                                                             0x1457 + 0x1 * -0x1e26 + 0xff * 0xb + 0.7178000000000111,                                                                                                             -(-0x1c * -0x152 + -0x5d1 + 0x371 * -0x8 + 0.38610000000005584)                                                                                                         ];                                                                                                         continue;                                                                                                     case '3':                                                                                                         _0x308751[_0x5a7724(0x6f1)](_0x132ef4 => {                                                                                                             const _0x5b3b77 = _0x5a7724;                                                                                                             _0x132ef4[_0x5b3b77(0x597)] && (_0x132ef4[_0x5b3b77(0x5d9)] = _0x4baf63[_0x5b3b77(0x23c)], junhuaClickObjs[_0x5b3b77(0x43a)](_0x132ef4));                                                                                                         });                                                                                                         continue;                                                                                                     case '4':                                                                                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                         continue;                                                                                                     }                                                                                                     break;                                                                                                 }                                                                                             } else {                                                                                                 if (_0x12ee1a[_0x5a7724(0x60c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x62d)])) {                                                                                                     const _0x3bcfd3 = _0x12ee1a[_0x5a7724(0x260)][_0x5a7724(0x44f)]('|');                                                                                                     let _0x46f8a2 = -0x1 * 0x9f7 + -0xf1 * 0x11 + 0x2 * 0xcfc;                                                                                                     while (!![]) {                                                                                                         switch (_0x3bcfd3[_0x46f8a2++]) {                                                                                                         case '0':                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                 -(0x262a + 0x571 * -0x1 + -0x12bc + 0.19090000000005602),                                                                                                                 0x107f + 0x79 + -0xfd2 + 0.30869999999998754,                                                                                                                 -(0x2 * -0x3ee + 0x1597 + -0xd * 0xc7 + 0.6746000000000549)                                                                                                             ];                                                                                                             continue;                                                                                                         case '1':                                                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6a9)];                                                                                                             continue;                                                                                                         case '2':                                                                                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                             continue;                                                                                                         case '3':                                                                                                             _0x308751[_0x5a7724(0x6f1)](_0x8e4019 => {                                                                                                                 const _0x4445ff = _0x5a7724;                                                                                                                 _0x8e4019[_0x4445ff(0x597)] && (_0x8e4019[_0x4445ff(0x5d9)] = _0x12ee1a[_0x4445ff(0x462)], junhuaClickObjs[_0x4445ff(0x43a)](_0x8e4019));                                                                                                             });                                                                                                             continue;                                                                                                         case '4':                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                 -(0xe4e + 0x1884 + -0x18d5 + 0.8899999999998727),                                                                                                                 -0xc * -0x1e7 + 0x1bca + -0x317c + 0.22000000000002728,                                                                                                                 -(-0x4 * 0x4b5 + -0x1160 + 0x2 * 0x13f7 + 0.4800000000000182)                                                                                                             ];                                                                                                             continue;                                                                                                         }                                                                                                         break;                                                                                                     }                                                                                                 } else {                                                                                                     if (_0x12ee1a[_0x5a7724(0x2b9)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x755)])) {                                                                                                         const _0x3b2bba = _0x12ee1a[_0x5a7724(0x1c7)][_0x5a7724(0x44f)]('|');                                                                                                         let _0x20deca = 0x1f89 + -0x21 * -0x6a + -0x85 * 0x57;                                                                                                         while (!![]) {                                                                                                             switch (_0x3b2bba[_0x20deca++]) {                                                                                                             case '0':                                                                                                                 _0x308751[_0x5a7724(0x6f1)](_0x1406aa => {                                                                                                                     const _0x14c7b5 = _0x5a7724;                                                                                                                     _0x1406aa[_0x14c7b5(0x597)] && (_0x1406aa[_0x14c7b5(0x5d9)] = _0x4baf63[_0x14c7b5(0x23c)], junhuaClickObjs[_0x14c7b5(0x43a)](_0x1406aa));                                                                                                                 });                                                                                                                 continue;                                                                                                             case '1':                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                     -(-0x9e4 + -0x5 * 0x25 + -0x20 * -0xc1 + 0.2199000000000524),                                                                                                                     0xb * -0x255 + -0xdda + 0x28a6 + 0.7355000000000018,                                                                                                                     -(0x4ca + 0x1 * 0x1169 + -0x128f + 0.30750000000000455)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '2':                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                     -(-0xbed + -0x3 * 0xcbd + 0xcbb * 0x5 + 0.07000000000016371),                                                                                                                     -0x2128 + 0xce5 * 0x3 + -0x465 + 0.2300000000000182,                                                                                                                     -(-0x1797 + -0x499 + 0x1fea + 0.44000000000005457)                                                                                                                 ];                                                                                                                 continue;                                                                                                             case '3':                                                                                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                 continue;                                                                                                             case '4':                                                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5a2)];                                                                                                                 continue;                                                                                                             }                                                                                                             break;                                                                                                         }                                                                                                     } else {                                                                                                         if (_0x12ee1a[_0x5a7724(0x5ef)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x26d)])) {                                                                                                             const _0x1296ad = _0x12ee1a[_0x5a7724(0x5aa)][_0x5a7724(0x44f)]('|');                                                                                                             let _0x41d366 = 0x19bb + 0x2312 + 0xb * -0x587;                                                                                                             while (!![]) {                                                                                                                 switch (_0x1296ad[_0x41d366++]) {                                                                                                                 case '0':                                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                         -(-0x3 * -0x80d + -0x6 * 0x267 + -0x1 * -0x2ef + 0.6161999999999352),                                                                                                                         0xca * -0x24 + -0xca * 0x3 + 0x1fec + 0.31869999999997844,                                                                                                                         -(-0x7 * 0x56 + 0x6bb + 0xc1 * -0x1 + 0.6698999999999842)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 case '1':                                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                         -(-0xbd5 + -0x3b * -0xf + 0x11 * 0x13d + 0.4899999999997817),                                                                                                                         -0x1ae1 * 0x1 + -0xf * -0xf + -0x12e * -0x17 + 0.2300000000000182,                                                                                                                         -(0x5b + 0x3 * 0xa93 + -0x1c5a + 0.4700000000000273)                                                                                                                     ];                                                                                                                     continue;                                                                                                                 case '2':                                                                                                                     _0x308751[_0x5a7724(0x6f1)](_0x409d87 => {                                                                                                                         const _0x5e105d = _0x5a7724;                                                                                                                         _0x409d87[_0x5e105d(0x597)] && (_0x409d87[_0x5e105d(0x5d9)] = _0x4baf63[_0x5e105d(0x23c)], junhuaClickObjs[_0x5e105d(0x43a)](_0x409d87));                                                                                                                     });                                                                                                                     continue;                                                                                                                 case '3':                                                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x418)];                                                                                                                     continue;                                                                                                                 case '4':                                                                                                                     fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                     continue;                                                                                                                 }                                                                                                                 break;                                                                                                             }                                                                                                         } else {                                                                                                             if (_0x12ee1a[_0x5a7724(0x55c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x551)])) {                                                                                                                 const _0x2f7ceb = _0x12ee1a[_0x5a7724(0x1fc)][_0x5a7724(0x44f)]('|');                                                                                                                 let _0x5aa29f = 0x24ec + 0x25cd * -0x1 + 0xe1;                                                                                                                 while (!![]) {                                                                                                                     switch (_0x2f7ceb[_0x5aa29f++]) {                                                                                                                     case '0':                                                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x1b6)];                                                                                                                         continue;                                                                                                                     case '1':                                                                                                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                         continue;                                                                                                                     case '2':                                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                             -(-0x12f0 + -0x1 * 0x1d5a + 0x1 * 0x3c1c + 0.3200000000001637),                                                                                                                             -0x38b + 0x2 * -0x815 + 0x14d7 + 0.2300000000000182,                                                                                                                             -(0x367 * 0x3 + -0x1c8c + 0x1611 + 0.4500000000000455)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     case '3':                                                                                                                         _0x308751[_0x5a7724(0x6f1)](_0x17fdab => {                                                                                                                             const _0x233227 = _0x5a7724;                                                                                                                             _0x17fdab[_0x233227(0x597)] && (_0x17fdab[_0x233227(0x5d9)] = _0x12ee1a[_0x233227(0x462)], junhuaClickObjs[_0x233227(0x43a)](_0x17fdab));                                                                                                                         });                                                                                                                         continue;                                                                                                                     case '4':                                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                             -(0x3d * 0x94 + 0x6d9 * 0x5 + -0x39af + 0.4776999999999134),                                                                                                                             0xb4d * -0x1 + 0x1 * 0x3 + 0xc6f + 0.9200000000000159,                                                                                                                             -(0x12f1 + -0x20a5 + 0x1157 * 0x1 + 0.15260000000000673)                                                                                                                         ];                                                                                                                         continue;                                                                                                                     }                                                                                                                     break;                                                                                                                 }                                                                                                             } else {                                                                                                                 if (_0x12ee1a[_0x5a7724(0x49d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x254)])) {                                                                                                                     const _0x5eae2e = _0x12ee1a[_0x5a7724(0x392)][_0x5a7724(0x44f)]('|');                                                                                                                     let _0x1b2bda = -0x1 * 0x1981 + -0x236e + 0x3cef;                                                                                                                     while (!![]) {                                                                                                                         switch (_0x5eae2e[_0x1b2bda++]) {                                                                                                                         case '0':                                                                                                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                             continue;                                                                                                                         case '1':                                                                                                                             _0x308751[_0x5a7724(0x6f1)](_0x9b0f37 => {                                                                                                                                 const _0x5ef13a = _0x5a7724;                                                                                                                                 _0x9b0f37[_0x5ef13a(0x597)] && (_0x9b0f37[_0x5ef13a(0x5d9)] = _0x4baf63[_0x5ef13a(0x23c)], junhuaClickObjs[_0x5ef13a(0x43a)](_0x9b0f37));                                                                                                                             });                                                                                                                             continue;                                                                                                                         case '2':                                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                 -(0x268 * 0x1 + 0x4fe * 0x7 + -0x1a00 + 0.8919000000000779),                                                                                                                                 -0x210c + -0x9ff + 0x2c31 + 0.11419999999998254,                                                                                                                                 -(-0xaeb * -0x3 + -0x106 + -0x1c19 + 0.08090000000004238)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         case '3':                                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                 -(0x1 * -0x2203 + 0x1c5b + -0x41 * -0x43 + 0.38999999999987267),                                                                                                                                 -0x16ab + -0x1bd8 + 0x33a5 + 0.2300000000000182,                                                                                                                                 -(0xfa5 + 0x2 * 0x120e + 0x1 * -0x3007 + 0.6000000000000227)                                                                                                                             ];                                                                                                                             continue;                                                                                                                         case '4':                                                                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x370)];                                                                                                                             continue;                                                                                                                         }                                                                                                                         break;                                                                                                                     }                                                                                                                 } else {                                                                                                                     if (_0x12ee1a[_0x5a7724(0x2c2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x697)])) {                                                                                                                         const _0x131de6 = _0x12ee1a[_0x5a7724(0x2a1)][_0x5a7724(0x44f)]('|');                                                                                                                         let _0x2e67b3 = -0x15d2 + -0x14fb + 0x2acd;                                                                                                                         while (!![]) {                                                                                                                             switch (_0x131de6[_0x2e67b3++]) {                                                                                                                             case '0':                                                                                                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                 continue;                                                                                                                             case '1':                                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                     -(-0x2291 * -0x1 + 0xc58 + -0x2480 + 0.13000000000010914),                                                                                                                                     0x13ae + -0x1f30 + 0xca4 + 0.2300000000000182,                                                                                                                                     -(0x1251 + 0x14b8 + -0x234f + 0.4900000000000091)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '2':                                                                                                                                 _0x308751[_0x5a7724(0x6f1)](_0x3b9662 => {                                                                                                                                     const _0x50e44c = _0x5a7724;                                                                                                                                     _0x3b9662[_0x50e44c(0x597)] && (_0x3b9662[_0x50e44c(0x5d9)] = _0x4baf63[_0x50e44c(0x23c)], junhuaClickObjs[_0x50e44c(0x43a)](_0x3b9662));                                                                                                                                 });                                                                                                                                 continue;                                                                                                                             case '3':                                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                     -(-0xe87 * -0x1 + 0x1b08 + -0x1f26 + 0.29599999999982174),                                                                                                                                     0x173c + 0x26d8 + -0x58a * 0xb + 0.11419999999998254,                                                                                                                                     -(-0x4b1 * -0x8 + -0x1153 + -0x1094 + 0.9664000000000215)                                                                                                                                 ];                                                                                                                                 continue;                                                                                                                             case '4':                                                                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x60e)];                                                                                                                                 continue;                                                                                                                             }                                                                                                                             break;                                                                                                                         }                                                                                                                     } else {                                                                                                                         if (_0x12ee1a[_0x5a7724(0x28b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x49f)])) {                                                                                                                             const _0x5a476f = _0x12ee1a[_0x5a7724(0x440)][_0x5a7724(0x44f)]('|');                                                                                                                             let _0x21c8fa = -0x4de + 0xe02 * 0x1 + 0x3c * -0x27;                                                                                                                             while (!![]) {                                                                                                                                 switch (_0x5a476f[_0x21c8fa++]) {                                                                                                                                 case '0':                                                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                         -(0x37a * -0x7 + -0x6a * -0x3f + -0x6c * -0x13 + 0.3400000000001455),                                                                                                                                         0x1 * -0x35 + 0x1 * 0x128 + -0x1 * -0x33 + 0.29869999999999663,                                                                                                                                         -(0x24f5 * 0x1 + -0x104b + 0x5ae * -0x3 + 0.7951000000000477)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 case '1':                                                                                                                                     _0x308751[_0x5a7724(0x6f1)](_0x2d8ac4 => {                                                                                                                                         const _0x3d4742 = _0x5a7724;                                                                                                                                         _0x2d8ac4[_0x3d4742(0x597)] && (_0x2d8ac4[_0x3d4742(0x5d9)] = _0x12ee1a[_0x3d4742(0x462)], junhuaClickObjs[_0x3d4742(0x43a)](_0x2d8ac4));                                                                                                                                     });                                                                                                                                     continue;                                                                                                                                 case '2':                                                                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x26f)];                                                                                                                                     continue;                                                                                                                                 case '3':                                                                                                                                     fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                     continue;                                                                                                                                 case '4':                                                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                         -(-0x5e7 * -0x6 + -0x43 * 0x43 + -0x81d + 0.3400000000001455),                                                                                                                                         0xf81 + -0x2243 + 0x13e4 + 0.20999999999997954,                                                                                                                                         -(-0xb5d * 0x1 + 0x25cc + -0x16b5 + 0.6100000000000136)                                                                                                                                     ];                                                                                                                                     continue;                                                                                                                                 }                                                                                                                                 break;                                                                                                                             }                                                                                                                         } else {                                                                                                                             if (_0x12ee1a[_0x5a7724(0x706)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6fd)])) {                                                                                                                                 const _0x517bef = _0x12ee1a[_0x5a7724(0x1e0)][_0x5a7724(0x44f)]('|');                                                                                                                                 let _0x4ecddb = 0x92f + 0x214c + -0x57 * 0x7d;                                                                                                                                 while (!![]) {                                                                                                                                     switch (_0x517bef[_0x4ecddb++]) {                                                                                                                                     case '0':                                                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                             -(-0x1 * 0xd13 + 0x89e + 0xd79 + 0.3000000000001819),                                                                                                                                             -0x3 * -0x7d5 + -0x177f + 0x122 + 0.2300000000000182,                                                                                                                                             -(0xb63 + -0xfaa + 0x801 + 0.42999999999995)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     case '1':                                                                                                                                         _0x308751[_0x5a7724(0x6f1)](_0x1996a5 => {                                                                                                                                             const _0x34d935 = _0x5a7724;                                                                                                                                             _0x1996a5[_0x34d935(0x597)] && (_0x1996a5[_0x34d935(0x5d9)] = _0x12ee1a[_0x34d935(0x462)], junhuaClickObjs[_0x34d935(0x43a)](_0x1996a5));                                                                                                                                         });                                                                                                                                         continue;                                                                                                                                     case '2':                                                                                                                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                         continue;                                                                                                                                     case '3':                                                                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x2b7)];                                                                                                                                         continue;                                                                                                                                     case '4':                                                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                             -(-0x1 * -0x52 + 0x1 * -0x1fe1 + -0xdd * -0x2f + 0.4659999999998945),                                                                                                                                             -0x35 * 0x91 + -0x670 * 0x5 + 0x3f5b * 0x1 + 0.11419999999998254,                                                                                                                                             -(0x4a * -0x48 + 0x47f + 0x13f2 + 0.9063999999999623)                                                                                                                                         ];                                                                                                                                         continue;                                                                                                                                     }                                                                                                                                     break;                                                                                                                                 }                                                                                                                             } else {                                                                                                                                 if (_0x12ee1a[_0x5a7724(0x467)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x64f)])) {                                                                                                                                     const _0x129527 = _0x12ee1a[_0x5a7724(0x400)][_0x5a7724(0x44f)]('|');                                                                                                                                     let _0x4f38d1 = 0xa53 + 0x1ad4 + -0x2527 * 0x1;                                                                                                                                     while (!![]) {                                                                                                                                         switch (_0x129527[_0x4f38d1++]) {                                                                                                                                         case '0':                                                                                                                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                             continue;                                                                                                                                         case '1':                                                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                                 -(0x1c1d + 0x2206 + -0xac9 * 0x5 + 0.38599999999996726),                                                                                                                                                 0x21ad + -0x1b85 + -0x502 + 0.12419999999997344,                                                                                                                                                 -(-0x7eb * -0x2 + -0x2 * -0xa03 + -0x203b + 0.8863999999999805)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '2':                                                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                                 -(0x1a55 + -0x1587 + -0x368 * -0x1 + 0.2199999999997999),                                                                                                                                                 0x6 * -0x421 + 0x1559 * 0x1 + 0x48f + 0.2400000000000091,                                                                                                                                                 -(0x1 * -0x455 + -0x3 * -0x3e + 0x755 + 0.40999999999996817)                                                                                                                                             ];                                                                                                                                             continue;                                                                                                                                         case '3':                                                                                                                                             _0x308751[_0x5a7724(0x6f1)](_0x26e3ff => {                                                                                                                                                 const _0x5ed077 = _0x5a7724;                                                                                                                                                 _0x26e3ff[_0x5ed077(0x597)] && (_0x26e3ff[_0x5ed077(0x5d9)] = _0x4baf63[_0x5ed077(0x23c)], junhuaClickObjs[_0x5ed077(0x43a)](_0x26e3ff));                                                                                                                                             });                                                                                                                                             continue;                                                                                                                                         case '4':                                                                                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x752)];                                                                                                                                             continue;                                                                                                                                         }                                                                                                                                         break;                                                                                                                                     }                                                                                                                                 } else {                                                                                                                                     if (_0x12ee1a[_0x5a7724(0x41a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3b3)])) {                                                                                                                                         const _0xdc0ad2 = _0x12ee1a[_0x5a7724(0x29c)][_0x5a7724(0x44f)]('|');                                                                                                                                         let _0x2e503a = 0x49 * -0xd + 0xe9c + -0xae7;                                                                                                                                         while (!![]) {                                                                                                                                             switch (_0xdc0ad2[_0x2e503a++]) {                                                                                                                                             case '0':                                                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                                     -(0x1e8f * 0x1 + -0x61 * 0x63 + 0xec6 + 0.43000000000006366),                                                                                                                                                     -0x1 * -0x95e + -0xe6e + -0x1 * -0x632 + 0.2400000000000091,                                                                                                                                                     -(0x31f + 0x11d * -0xf + 0x1bb * 0xa + 0.4600000000000364)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             case '1':                                                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                                     -(0xe98 + 0x1781 + -0x1e47 + 0.9281000000000859),                                                                                                                                                     -0x9 * -0x159 + -0x1 * 0x26a3 + 0xa * 0x2c4 + 0.12419999999997344,                                                                                                                                                     -(0x3 * 0x83b + -0x34a + 0x5 * -0x38e + 0.940900000000056)                                                                                                                                                 ];                                                                                                                                                 continue;                                                                                                                                             case '2':                                                                                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x277)];                                                                                                                                                 continue;                                                                                                                                             case '3':                                                                                                                                                 _0x308751[_0x5a7724(0x6f1)](_0xd592a9 => {                                                                                                                                                     const _0x353a7a = _0x5a7724;                                                                                                                                                     _0xd592a9[_0x353a7a(0x597)] && (_0xd592a9[_0x353a7a(0x5d9)] = _0x12ee1a[_0x353a7a(0x462)], junhuaClickObjs[_0x353a7a(0x43a)](_0xd592a9));                                                                                                                                                 });                                                                                                                                                 continue;                                                                                                                                             case '4':                                                                                                                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                                 continue;                                                                                                                                             }                                                                                                                                             break;                                                                                                                                         }                                                                                                                                     } else {                                                                                                                                         if (_0x12ee1a[_0x5a7724(0x663)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x354)])) {                                                                                                                                             const _0x2c618d = _0x12ee1a[_0x5a7724(0x6d1)][_0x5a7724(0x44f)]('|');                                                                                                                                             let _0x48c0b4 = -0x1fab + 0xb * -0x133 + 0x18c * 0x1d;                                                                                                                                             while (!![]) {                                                                                                                                                 switch (_0x2c618d[_0x48c0b4++]) {                                                                                                                                                 case '0':                                                                                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x53f)];                                                                                                                                                     continue;                                                                                                                                                 case '1':                                                                                                                                                     _0x308751[_0x5a7724(0x6f1)](_0x5e6f3d => {                                                                                                                                                         const _0x3512d0 = _0x5a7724;                                                                                                                                                         _0x5e6f3d[_0x3512d0(0x597)] && (_0x5e6f3d[_0x3512d0(0x5d9)] = _0x4baf63[_0x3512d0(0x23c)], junhuaClickObjs[_0x3512d0(0x43a)](_0x5e6f3d));                                                                                                                                                     });                                                                                                                                                     continue;                                                                                                                                                 case '2':                                                                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                                         -(0x1 * -0x12aa + -0xd63 + 0x2d38 + 0.9600000000000364),                                                                                                                                                         -0x1be * -0x1 + -0x17e4 + 0x164f + 0.5,                                                                                                                                                         -(0x1a6d + -0x11 * -0x1ae + 0x32ed * -0x1 + 0.9200000000000728)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 case '3':                                                                                                                                                     fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                                     continue;                                                                                                                                                 case '4':                                                                                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                                         -(0x1 * 0xf82 + -0xb * 0x31 + -0x6 * 0xa + 0.9600000000000364),                                                                                                                                                         0x1607 * -0x1 + -0x71 * 0x1 + 0x16a5 + 0.34770000000000323,                                                                                                                                                         -(0x1763 * -0x1 + 0x5 * -0x18b + 0x2311 + 0.6476000000000113)                                                                                                                                                     ];                                                                                                                                                     continue;                                                                                                                                                 }                                                                                                                                                 break;                                                                                                                                             }                                                                                                                                         } else {                                                                                                                                             if (_0x12ee1a[_0x5a7724(0x216)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4f5)])) {                                                                                                                                                 const _0x51d226 = _0x12ee1a[_0x5a7724(0x1f6)][_0x5a7724(0x44f)]('|');                                                                                                                                                 let _0x48c94c = 0x1 * 0x1cd + -0x20c * -0x12 + -0x26a5;                                                                                                                                                 while (!![]) {                                                                                                                                                     switch (_0x51d226[_0x48c94c++]) {                                                                                                                                                     case '0':                                                                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                                             -(0x1915 + -0x21ef + 0x1605 + 0.9400000000000546),                                                                                                                                                             0x24d * 0xd + -0x8dd + 0x1 * -0x14e5 + 0.7800000000000011,                                                                                                                                                             -(-0x1 * 0xf95 + 0xc13 * 0x2 + 0x9 * -0x94 + 0.7300000000000182)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     case '1':                                                                                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4f7)];                                                                                                                                                         continue;                                                                                                                                                     case '2':                                                                                                                                                         fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                                         continue;                                                                                                                                                     case '3':                                                                                                                                                         _0x308751[_0x5a7724(0x6f1)](_0x3a0503 => {                                                                                                                                                             const _0x1a8fb8 = _0x5a7724;                                                                                                                                                             _0x3a0503[_0x1a8fb8(0x597)] && (_0x3a0503[_0x1a8fb8(0x5d9)] = _0x12ee1a[_0x1a8fb8(0x462)], junhuaClickObjs[_0x1a8fb8(0x43a)](_0x3a0503));                                                                                                                                                         });                                                                                                                                                         continue;                                                                                                                                                     case '4':                                                                                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                                             -(0x486 + -0x1ae7 + 0x238c + 0.6552999999998974),                                                                                                                                                             -0x2cf * 0x8 + 0x22 * 0xb2 + -0x1 * 0x101 + 0.11030000000000229,                                                                                                                                                             -(0xe57 + 0x2 * 0x121 + -0x1 * 0xd27 + 0.7545000000000073)                                                                                                                                                         ];                                                                                                                                                         continue;                                                                                                                                                     }                                                                                                                                                     break;                                                                                                                                                 }                                                                                                                                             } else {                                                                                                                                                 if (_0x12ee1a[_0x5a7724(0x394)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x637)])) {                                                                                                                                                     const _0x9e140a = _0x12ee1a[_0x5a7724(0x53b)][_0x5a7724(0x44f)]('|');                                                                                                                                                     let _0x3166de = 0x1cf * -0x10 + 0x191 + 0x1b5f;                                                                                                                                                     while (!![]) {                                                                                                                                                         switch (_0x9e140a[_0x3166de++]) {                                                                                                                                                         case '0':                                                                                                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x393)];                                                                                                                                                             continue;                                                                                                                                                         case '1':                                                                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                                                 -(-0x1 * -0x217d + -0x391 * 0x7 + 0xb3 * 0x1 + 0.8778999999999542),                                                                                                                                                                 0x8f5 + 0x1 * -0xe2f + 0x567 + 0.3941999999999979,                                                                                                                                                                 -(-0x928 + -0x226c + 0x2f89 + 0.18809999999996307)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         case '2':                                                                                                                                                             _0x308751[_0x5a7724(0x6f1)](_0x336ace => {                                                                                                                                                                 const _0x27fe7d = _0x5a7724;                                                                                                                                                                 _0x336ace[_0x27fe7d(0x597)] && (_0x336ace[_0x27fe7d(0x5d9)] = _0x12ee1a[_0x27fe7d(0x462)], junhuaClickObjs[_0x27fe7d(0x43a)](_0x336ace));                                                                                                                                                             });                                                                                                                                                             continue;                                                                                                                                                         case '3':                                                                                                                                                             fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                                             continue;                                                                                                                                                         case '4':                                                                                                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                                                 -(-0x2551 + 0x232a + 0xb61 + 0.21000000000003638),                                                                                                                                                                 0xaee * 0x2 + -0xb5f + -0xa54 + 0.509999999999998,                                                                                                                                                                 -(0x3 * -0xb39 + 0x2 * -0xf76 + -0x17 * -0x2fc + 0.7100000000000364)                                                                                                                                                             ];                                                                                                                                                             continue;                                                                                                                                                         }                                                                                                                                                         break;                                                                                                                                                     }                                                                                                                                                 } else {                                                                                                                                                     if (_0x12ee1a[_0x5a7724(0x346)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x37c)])) {                                                                                                                                                         const _0x329222 = _0x12ee1a[_0x5a7724(0x3c6)][_0x5a7724(0x44f)]('|');                                                                                                                                                         let _0x3a641b = 0x56 * 0x18 + -0xa * 0x3d1 + -0x1e1a * -0x1;                                                                                                                                                         while (!![]) {                                                                                                                                                             switch (_0x329222[_0x3a641b++]) {                                                                                                                                                             case '0':                                                                                                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4e3)];                                                                                                                                                                 continue;                                                                                                                                                             case '1':                                                                                                                                                                 fenchengnongduDeviceArrs[_0x5a7724(0x43a)](_0x308751);                                                                                                                                                                 continue;                                                                                                                                                             case '2':                                                                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                                                                                                     -(-0xc8 * -0x1 + 0x7 * 0xfd + 0x187 + 0.15999999999985448),                                                                                                                                                                     0x1303 * -0x1 + 0x2528 + -0x11fe + 0.759999999999998,                                                                                                                                                                     -(0x2273 + -0xce9 + -0x122d + 0.7999999999999545)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             case '3':                                                                                                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                                                                                                     -(0x1d79 + -0x1068 + 0x3d7 * -0x1 + 0.017600000000129512),                                                                                                                                                                     -0x1451 + 0x748 + -0x1a * -0x82 + 0.09029999999999916,                                                                                                                                                                     -(-0x1bc0 + -0x19 * 0xca + 0x32ec + 0.8259000000000469)                                                                                                                                                                 ];                                                                                                                                                                 continue;                                                                                                                                                             case '4':                                                                                                                                                                 _0x308751[_0x5a7724(0x6f1)](_0x5dc13c => {                                                                                                                                                                     const _0x38fe9a = _0x5a7724;                                                                                                                                                                     _0x5dc13c[_0x38fe9a(0x597)] && (_0x5dc13c[_0x38fe9a(0x5d9)] = _0x4baf63[_0x38fe9a(0x23c)], junhuaClickObjs[_0x38fe9a(0x43a)](_0x5dc13c));                                                                                                                                                                 });                                                                                                                                                                 continue;                                                                                                                                                             }                                                                                                                                                             break;                                                                                                                                                         }                                                                                                                                                     }                                                                                                                                                 }                                                                                                                                             }                                                                                                                                         }                                                                                                                                     }                                                                                                                                 }                                                                                                                             }                                                                                                                         }                                                                                                                     }                                                                                                                 }                                                                                                             }                                                                                                         }                                                                                                     }                                                                                                 }                                                                                             }                                                                                         }                                                                                     }                                                                                 }                                                                             }                                                                         }                                                                     }                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         } else {                             if (_0x12ee1a[_0x5a7724(0x54c)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x72b)])) {                                 if (_0x12ee1a[_0x5a7724(0x1b8)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x594)])) {                                     const _0x255293 = _0x12ee1a[_0x5a7724(0x736)][_0x5a7724(0x44f)]('|');                                     let _0x3a616b = -0x367 * -0x6 + -0x259d + 0x77 * 0x25;                                     while (!![]) {                                         switch (_0x255293[_0x3a616b++]) {                                         case '0':                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                 -(0x14de + -0x2 * 0xed0 + 0x1379 + 0.5470000000000255),                                                 0x96a + 0x1c73 + -0x24b4 + 0.3573999999999842,                                                 -(-0x11b * -0x21 + -0xf8 * -0x15 + -0x2a10 + 0.6374000000000706)                                             ];                                             continue;                                         case '1':                                             allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                             continue;                                         case '2':                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                 -(0xc7 * -0x2f + 0x1c4 + 0x2d5c + 0.40380000000004657),                                                 -0x1 * -0x1c69 + 0x1 * -0x62b + 0x1 * -0x1523 + 0.13999999999998636,                                                 -(-0x583 + -0x3 * 0x8a3 + 0x2e44 + 0.49080000000003565)                                             ];                                             continue;                                         case '3':                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6c7)];                                             continue;                                         case '4':                                             _0x308751[_0x5a7724(0x6f1)](_0x32da2b => {                                                 const _0x54748c = _0x5a7724;                                                 _0x32da2b[_0x54748c(0x597)] && (_0x32da2b[_0x54748c(0x5d9)] = _0x4baf63[_0x54748c(0x20c)], posuiClickObjs[_0x54748c(0x43a)](_0x32da2b));                                             });                                             continue;                                         }                                         break;                                     }                                 } else {                                     if (_0x12ee1a[_0x5a7724(0x3a0)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4eb)])) {                                         const _0x47dbf4 = _0x12ee1a[_0x5a7724(0x2f2)][_0x5a7724(0x44f)]('|');                                         let _0x508595 = 0x6ad * -0x1 + -0xe78 + 0x1525;                                         while (!![]) {                                             switch (_0x47dbf4[_0x508595++]) {                                             case '0':                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '1':                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x458)];                                                 continue;                                             case '2':                                                 _0x308751[_0x5a7724(0x6f1)](_0x5bbe80 => {                                                     const _0x4717d0 = _0x5a7724;                                                     _0x5bbe80[_0x4717d0(0x597)] && (_0x5bbe80[_0x4717d0(0x5d9)] = _0x4baf63[_0x4717d0(0x3e4)], posuiClickObjs[_0x4717d0(0x43a)](_0x5bbe80));                                                 });                                                 continue;                                             case '3':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(-0x246c + -0x189c + 0x23fa * 0x2 + 0.6786000000001877),                                                     0x2b5 * 0x6 + -0x557 * -0x5 + 0x29d7 * -0x1 + 0.9499999999999886,                                                     -(0xa88 + 0x2059 + -0x1c0a + 0.7172999999997955)                                                 ];                                                 continue;                                             case '4':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(-0x14e2 + -0x23e + 0x2225 + 0.95049999999992),                                                     0x1 * -0x123a + 0x2a9 * 0x3 + 0xb64 + 0.34669999999999845,                                                     -(0x2632 + -0x1 * 0x263c + 0x1 * 0xed1 + 0.8038000000001375)                                                 ];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x12ee1a[_0x5a7724(0x319)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x573)])) {                                             const _0x514ea9 = _0x12ee1a[_0x5a7724(0x2dc)][_0x5a7724(0x44f)]('|');                                             let _0x4f7c63 = 0x3 * 0x829 + -0x54f + -0x4 * 0x4cb;                                             while (!![]) {                                                 switch (_0x514ea9[_0x4f7c63++]) {                                                 case '0':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x199)];                                                     continue;                                                 case '1':                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '2':                                                     _0x308751[_0x5a7724(0x6f1)](_0x33f5f5 => {                                                         const _0x161d5b = _0x5a7724;                                                         _0x33f5f5[_0x161d5b(0x597)] && (_0x33f5f5[_0x161d5b(0x26b)][_0x161d5b(0x5d9)] = _0x12ee1a[_0x161d5b(0x28c)], posuiClickObjs[_0x161d5b(0x43a)](_0x33f5f5));                                                     });                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(-0x1251 + 0x49 * -0x88 + -0x43cf * -0x1 + 0.23019999999996799),                                                         -0x1310 + 0x14c2 + -0x2 * 0x5c + 0.1039000000000101,                                                         -(-0x2 * 0xbdf + 0x29e * -0x1 + 0xf * 0x2b9 + 0.6536999999998443)                                                     ];                                                     continue;                                                 case '4':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(-0x2e0 * -0x1 + 0xe8 * 0x28 + -0x1c41 + 0.835399999999936),                                                         -0xd * -0x1b7 + -0x14fa + -0x24 * 0x3 + 0.19999999999998863,                                                         -(0x37e + 0x1e2c + -0x1302 + 0.7844000000000051)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x12ee1a[_0x5a7724(0x759)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x455)])) {                                                 const _0x99820e = _0x12ee1a[_0x5a7724(0x750)][_0x5a7724(0x44f)]('|');                                                 let _0x51966c = 0x788 * 0x3 + 0x18a * -0x17 + 0x667 * 0x2;                                                 while (!![]) {                                                     switch (_0x99820e[_0x51966c++]) {                                                     case '0':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                             -(0x1 * 0x12cb + -0x8d + 0x7b5 * -0x1 + 0.6212000000000444),                                                             0x5e1 * 0x5 + -0x19d2 + 0x7 * -0x62 + 0.12999999999999545,                                                             -(0xad * 0x11 + -0x179c + 0x1abe + 0.2442999999998392)                                                         ];                                                         continue;                                                     case '1':                                                         _0x308751[_0x5a7724(0x6f1)](_0x5696bc => {                                                             const _0x15f65 = _0x5a7724;                                                             _0x5696bc[_0x15f65(0x597)] && (_0x5696bc[_0x15f65(0x26b)][_0x15f65(0x5d9)] = _0x4baf63[_0x15f65(0x586)], posuiClickObjs[_0x15f65(0x43a)](_0x5696bc));                                                         });                                                         continue;                                                     case '2':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                             -(0x1966 * -0x1 + -0xf4d + 0x3360 + 0.11509999999998399),                                                             -0x1 * -0xb5 + 0x23ee + -0x23ab + 0.3703999999999894,                                                             -(-0x1a99 + 0x160 * -0x4 + 0x2e8d + 0.8796000000002095)                                                         ];                                                         continue;                                                     case '3':                                                         allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     case '4':                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5fd)];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x12ee1a[_0x5a7724(0x55c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x59f)])) {                                                     const _0xbc5279 = _0x12ee1a[_0x5a7724(0x495)][_0x5a7724(0x44f)]('|');                                                     let _0x1fd45f = 0x2f * 0x52 + 0x1afe + -0x2a0c;                                                     while (!![]) {                                                         switch (_0xbc5279[_0x1fd45f++]) {                                                         case '0':                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x2dd)];                                                             continue;                                                         case '1':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                 -(0x573 + 0x22b5 + 0x1f * -0xf1 + 0.07000000000016371),                                                                 -0x1 * 0x1a32 + -0x4 * -0x769 + 0x204 * -0x1 + 0.9900000000000091,                                                                 -(-0x20e1 + 0x312 + 0x2c54 + 0.5399999999999636)                                                             ];                                                             continue;                                                         case '2':                                                             _0x308751[_0x5a7724(0x6f1)](_0x2e428e => {                                                                 const _0x4f8aca = _0x5a7724;                                                                 _0x2e428e[_0x4f8aca(0x597)] && (_0x2e428e[_0x4f8aca(0x26b)][_0x4f8aca(0x5d9)] = _0x12ee1a[_0x4f8aca(0x32f)], posuiClickObjs[_0x4f8aca(0x43a)](_0x2e428e));                                                             });                                                             continue;                                                         case '3':                                                             allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                             continue;                                                         case '4':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                 -(0x164d + 0x20c8 + -0x2c3b + 0.8141000000000531),                                                                 0xda0 + -0x18ed + 0x223 * 0x6 + 0.7508000000000266,                                                                 -(0x3f7 + 0x3 * -0xf1 + -0x6c7 * -0x2 + 0.16409999999996217)                                                             ];                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x12ee1a[_0x5a7724(0x710)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x294)])) {                                                         const _0x50224c = _0x12ee1a[_0x5a7724(0x58b)][_0x5a7724(0x44f)]('|');                                                         let _0x557f62 = -0xb1 + 0xbd7 + 0x2 * -0x593;                                                         while (!![]) {                                                             switch (_0x50224c[_0x557f62++]) {                                                             case '0':                                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                 continue;                                                             case '1':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                     -(0xd1 * 0x2f + -0x4bd * -0x7 + -0x3d35 + 0.7514999999998508),                                                                     0x1 * -0x25f7 + 0x849 * -0x3 + -0x3 * -0x156b,                                                                     -(0x1 * -0xe7b + -0x1d9b + 0x683 * 0x9 + 0.009399999999914144)                                                                 ];                                                                 continue;                                                             case '2':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                     -(0x7 * 0x4de + -0x21a1 * -0x1 + -0x3931 + 0.15869999999995343),                                                                     0x14f2 + 0x9 * -0x3aa + -0x11 * -0xcc + 0.8210000000000264,                                                                     -(0x4 * -0x3ea + -0x8c8 + 0x1 * 0x2719 + 0.7056999999999789)                                                                 ];                                                                 continue;                                                             case '3':                                                                 _0x308751[_0x5a7724(0x6f1)](_0x1ce8ce => {                                                                     const _0x5de113 = _0x5a7724;                                                                     _0x1ce8ce[_0x5de113(0x597)] && (_0x1ce8ce[_0x5de113(0x26b)][_0x5de113(0x5d9)] = _0x12ee1a[_0x5de113(0x2da)], posuiClickObjs[_0x5de113(0x43a)](_0x1ce8ce));                                                                 });                                                                 continue;                                                             case '4':                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x511)];                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0x12ee1a[_0x5a7724(0x257)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x29e)])) {                                                             const _0x4fc053 = _0x12ee1a[_0x5a7724(0x62a)][_0x5a7724(0x44f)]('|');                                                             let _0x2c7a66 = 0x26b5 + 0x31a + -0x29cf;                                                             while (!![]) {                                                                 switch (_0x4fc053[_0x2c7a66++]) {                                                                 case '0':                                                                     _0x308751[_0x5a7724(0x6f1)](_0x5d0fd0 => {                                                                         const _0x47c699 = _0x5a7724;                                                                         _0x5d0fd0[_0x47c699(0x597)] && (_0x5d0fd0[_0x47c699(0x26b)][_0x47c699(0x5d9)] = _0x4baf63[_0x47c699(0x2c9)], posuiClickObjs[_0x47c699(0x43a)](_0x5d0fd0));                                                                     });                                                                     continue;                                                                 case '1':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                         -(0xa0c + 0x666 + 0x1c9 * -0x3 + 0.2766999999998916),                                                                         0x44f + -0x5 * -0x310 + -0x1264 + 0.785000000000025,                                                                         -(-0x1fd3 * 0x1 + -0x920 + 0x376e + 0.6006000000002132)                                                                     ];                                                                     continue;                                                                 case '2':                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x753)];                                                                     continue;                                                                 case '3':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                         -(0x28 * -0x64 + -0x2 * -0x94b + 0x801 + 0.3204999999998108),                                                                         -0x2610 + -0x9c * 0x39 + 0xecb * 0x5 + 0.6100000000000136,                                                                         -(0x1b9 * -0x15 + 0x156b * 0x1 + 0x3ac * 0x8 + 0.7390000000000327)                                                                     ];                                                                     continue;                                                                 case '4':                                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         } else {                                                             if (_0x12ee1a[_0x5a7724(0x5ce)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x221)])) {                                                                 const _0x216368 = _0x12ee1a[_0x5a7724(0x6dd)][_0x5a7724(0x44f)]('|');                                                                 let _0x250439 = -0xb8e + -0x2680 + 0x320e;                                                                 while (!![]) {                                                                     switch (_0x216368[_0x250439++]) {                                                                     case '0':                                                                         _0x308751[_0x5a7724(0x6f1)](_0x6d867 => {                                                                             const _0x204e3d = _0x5a7724;                                                                             _0x6d867[_0x204e3d(0x597)] && (_0x6d867[_0x204e3d(0x26b)][_0x204e3d(0x5d9)] = _0x4baf63[_0x204e3d(0x749)], posuiClickObjs[_0x204e3d(0x43a)](_0x6d867));                                                                         });                                                                         continue;                                                                     case '1':                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4b6)];                                                                         continue;                                                                     case '2':                                                                         allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                         continue;                                                                     case '3':                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                             -(0xe * -0xcb + 0x83 * 0x1b + 0x7b4 + 0.5216000000000349),                                                                             -0x2ab * -0x8 + -0x1e81 + 0x1 * 0xa53 + 0.910000000000025,                                                                             -(0x2d1 * -0xb + -0xfe0 + 0x3d79 + 0.17860000000018772)                                                                         ];                                                                         continue;                                                                     case '4':                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                             -(-0x2303 + 0x1c3a + 0x1111 + 0.15180000000009386),                                                                             -0x1c70 + -0x10a5 * -0x2 + -0x39d + 0.3170999999999822,                                                                             -(0x6f4 * 0x5 + 0x1bec + -0xa9 * 0x49 + 0.720600000000104)                                                                         ];                                                                         continue;                                                                     }                                                                     break;                                                                 }                                                             } else {                                                                 if (_0x12ee1a[_0x5a7724(0x29f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x309)])) {                                                                     const _0x1f103b = _0x12ee1a[_0x5a7724(0x545)][_0x5a7724(0x44f)]('|');                                                                     let _0x107d3e = 0x1b1f + -0x486 * 0x6 + 0x5;                                                                     while (!![]) {                                                                         switch (_0x1f103b[_0x107d3e++]) {                                                                         case '0':                                                                             _0x308751[_0x5a7724(0x6f1)](_0x22ed86 => {                                                                                 const _0x44d8f0 = _0x5a7724;                                                                                 _0x22ed86[_0x44d8f0(0x597)] && (_0x22ed86[_0x44d8f0(0x5d9)] = _0x12ee1a[_0x44d8f0(0x1da)], posuiClickObjs[_0x44d8f0(0x43a)](_0x22ed86));                                                                             });                                                                             continue;                                                                         case '1':                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                 -(-0x1cb + 0x1b96 * 0x1 + -0x1 * 0xeb9 + 0.9432000000001608),                                                                                 0x67 * -0x1 + -0x103b + 0x1196 + 0.7256999999999891,                                                                                 -(0xfb * 0x2 + -0xf8 * -0x10 + -0x4f0 + 0.5583000000001448)                                                                             ];                                                                             continue;                                                                         case '2':                                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6db)];                                                                             continue;                                                                         case '3':                                                                             allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                             continue;                                                                         case '4':                                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                 -(0x20e5 + -0x6ab + -0xf41 + 0.7943000000000211),                                                                                 0x1284 * -0x1 + 0xaa * 0x13 + 0x6c6 + 0.3300000000000125,                                                                                 -(0x1468 + -0x1387 * 0x1 + 0xb78 * 0x1 + 0.365099999999984)                                                                             ];                                                                             continue;                                                                         }                                                                         break;                                                                     }                                                                 } else {                                                                     if (_0x12ee1a[_0x5a7724(0x288)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x64d)])) {                                                                         const _0x53be2f = _0x12ee1a[_0x5a7724(0x436)][_0x5a7724(0x44f)]('|');                                                                         let _0x581483 = -0xe3 * 0x2 + 0x1 * 0xb98 + -0x9d2;                                                                         while (!![]) {                                                                             switch (_0x53be2f[_0x581483++]) {                                                                             case '0':                                                                                 _0x308751[_0x5a7724(0x6f1)](_0xa3ebfd => {                                                                                     const _0x3c1968 = _0x5a7724;                                                                                     _0xa3ebfd[_0x3c1968(0x597)] && (_0xa3ebfd[_0x3c1968(0x5d9)] = _0x4baf63[_0x3c1968(0x2a2)], posuiClickObjs[_0x3c1968(0x43a)](_0xa3ebfd));                                                                                 });                                                                                 continue;                                                                             case '1':                                                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                                 continue;                                                                             case '2':                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                     -(-0x25e5 + -0xe2a + 0x1 * 0x3e81 + 0.18420000000014625),                                                                                     -0xf4d * 0x1 + -0x19a + 0x1 * 0x11dd + 0.683099999999996,                                                                                     -(0x1 * -0x683 + 0x1006 + 0x304 + 0.3344999999999345)                                                                                 ];                                                                                 continue;                                                                             case '3':                                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                     -(0xc32 + -0x871 * 0x1 + 0x3 * 0x232 + 0.7546999999999571),                                                                                     -0xe8 + 0x18b8 + -0x16f1 + 0.8600000000000136,                                                                                     -(-0x156b * 0x1 + 0x1 * -0x193f + -0x1 * -0x3b06 + 0.07409999999981665)                                                                                 ];                                                                                 continue;                                                                             case '4':                                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x441)];                                                                                 continue;                                                                             }                                                                             break;                                                                         }                                                                     } else {                                                                         if (_0x12ee1a[_0x5a7724(0x197)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x605)])) {                                                                             const _0x9dcc7e = _0x12ee1a[_0x5a7724(0x4dd)][_0x5a7724(0x44f)]('|');                                                                             let _0x552a79 = -0x1ebe + -0x6c + 0x1f2a * 0x1;                                                                             while (!![]) {                                                                                 switch (_0x9dcc7e[_0x552a79++]) {                                                                                 case '0':                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                         -(0x58 * -0x28 + -0x363 * 0x3 + 0x229d + 0.44239999999990687),                                                                                         -0x24bc + 0x1 * 0x463 + 0x22aa + 0.20699999999999363,                                                                                         -(0x20d0 + -0x678 * 0x2 + -0x61f + 0.5603000000000975)                                                                                     ];                                                                                     continue;                                                                                 case '1':                                                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                                     continue;                                                                                 case '2':                                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                         -(0x18 * -0x95 + -0xe13 * -0x2 + -0x377 + 0.15000000000009095),                                                                                         -0xa04 + 0x83c + 0x3b8 + 0.589999999999975,                                                                                         -(0x725 + 0x1039 + -0x8d5 + 0.5)                                                                                     ];                                                                                     continue;                                                                                 case '3':                                                                                     _0x308751[_0x5a7724(0x6f1)](_0x1eb329 => {                                                                                         const _0x3fb625 = _0x5a7724;                                                                                         _0x1eb329[_0x3fb625(0x597)] && (_0x1eb329[_0x3fb625(0x5d9)] = _0x4baf63[_0x3fb625(0x533)], posuiClickObjs[_0x3fb625(0x43a)](_0x1eb329));                                                                                     });                                                                                     continue;                                                                                 case '4':                                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x25c)];                                                                                     continue;                                                                                 }                                                                                 break;                                                                             }                                                                         } else {                                                                             if (_0x12ee1a[_0x5a7724(0x2aa)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x217)])) {                                                                                 const _0x59f25e = _0x12ee1a[_0x5a7724(0x2b0)][_0x5a7724(0x44f)]('|');                                                                                 let _0x2678bd = -0x1 * -0x949 + -0x147b + 0xb32;                                                                                 while (!![]) {                                                                                     switch (_0x59f25e[_0x2678bd++]) {                                                                                     case '0':                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                                             -(0x13b0 + -0x46d * 0x6 + 0x11c0 + 0.7773000000001957),                                                                                             -0x1f1a + -0x2 * -0xca6 + -0x761 * -0x1 + 0.8999999999999773,                                                                                             -(0x15fc + 0x13bf + -0x1b07 + 0.6559000000002015)                                                                                         ];                                                                                         continue;                                                                                     case '1':                                                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                                             -(0x4 * -0x57f + 0x211f + -0xe + 0.37980000000015934),                                                                                             -0x20 * 0x119 + -0x3 * 0x169 + 0x194 * 0x1a + 0.7302999999999997,                                                                                             -(0x65f + 0x2 * -0x292 + 0x46d * 0x3 + 0.7339999999999236)                                                                                         ];                                                                                         continue;                                                                                     case '2':                                                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6cc)];                                                                                         continue;                                                                                     case '3':                                                                                         allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                                         continue;                                                                                     case '4':                                                                                         _0x308751[_0x5a7724(0x6f1)](_0x57fda2 => {                                                                                             const _0xaa2f1a = _0x5a7724;                                                                                             _0x57fda2[_0xaa2f1a(0x597)] && (_0x57fda2[_0xaa2f1a(0x5d9)] = _0x12ee1a[_0xaa2f1a(0x1f5)], posuiClickObjs[_0xaa2f1a(0x43a)](_0x57fda2));                                                                                         });                                                                                         continue;                                                                                     }                                                                                     break;                                                                                 }                                                                             }                                                                         }                                                                     }                                                                 }                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             } else {                                 if (_0x12ee1a[_0x5a7724(0x3db)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x642)])) {                                     if (_0x12ee1a[_0x5a7724(0x30e)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4da)])) {                                         const _0x310780 = _0x12ee1a[_0x5a7724(0x436)][_0x5a7724(0x44f)]('|');                                         let _0x4440ff = 0xd63 + -0xda7 + 0x44;                                         while (!![]) {                                             switch (_0x310780[_0x4440ff++]) {                                             case '0':                                                 _0x308751[_0x5a7724(0x6f1)](_0x5f9fc6 => {                                                     const _0x117a76 = _0x5a7724;                                                     _0x5f9fc6[_0x117a76(0x597)] && (_0x5f9fc6[_0x117a76(0x26b)][_0x117a76(0x5d9)] = _0x4baf63[_0x117a76(0x300)], shaifenClickObjs[_0x117a76(0x43a)](_0x5f9fc6));                                                 });                                                 continue;                                             case '1':                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '2':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(-0x11c * 0x16 + -0x1167 + -0x1a42 * -0x2 + 0.06530000000020664),                                                     0x2 * -0x859 + -0x15d9 + 0x2779 + 0.21690000000000964,                                                     -(0x1783 + -0x3 * 0x412 + -0x11f * -0x3 + 0.449500000000171)                                                 ];                                                 continue;                                             case '3':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(-0x118b + -0x2626 + 0x4282 + 0.0886000000000422),                                                     0x1a7b + -0x1 * -0x16b7 + 0x1 * -0x3059 + 0.37000000000000455,                                                     -(0x7 * -0x537 + -0x35 * 0x83 + 0x4e0b * 0x1 + 0.6608000000001084)                                                 ];                                                 continue;                                             case '4':                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x56b)];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x12ee1a[_0x5a7724(0x271)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x3de)])) {                                             const _0x3a4a47 = _0x12ee1a[_0x5a7724(0x40d)][_0x5a7724(0x44f)]('|');                                             let _0xea6f1c = -0x1 * 0x2f1 + 0x691 + -0x3a0;                                             while (!![]) {                                                 switch (_0x3a4a47[_0xea6f1c++]) {                                                 case '0':                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '1':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(-0xc9b + -0x1 * 0x20e4 + -0x12b9 * -0x3 + 0.42470000000002983),                                                         0x1798 + -0x1 * -0x25c6 + 0xf1b * -0x4 + 0.8075000000000045,                                                         -(0x2aa + -0x1d79 + 0x2986 + 0.3562000000001717)                                                     ];                                                     continue;                                                 case '2':                                                     _0x308751[_0x5a7724(0x6f1)](_0x464dc5 => {                                                         const _0x4375c5 = _0x5a7724;                                                         _0x464dc5[_0x4375c5(0x597)] && (_0x464dc5[_0x4375c5(0x26b)][_0x4375c5(0x5d9)] = _0x4baf63[_0x4375c5(0x33b)], shaifenClickObjs[_0x4375c5(0x43a)](_0x464dc5));                                                     });                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x569)];                                                     continue;                                                 case '4':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(0x1b19 + 0x2c * 0x2b + -0x17f1 + 0.01999999999998181),                                                         0x17 * 0x14e + -0x2228 + 0x4fe + 0.3300000000000125,                                                         -(0x1db6 * 0x1 + -0x1d7 * -0x13 + -0x323d + 0.7507000000000517)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x12ee1a[_0x5a7724(0x3f1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x379)])) {                                                 const _0x11b8d3 = _0x12ee1a[_0x5a7724(0x213)][_0x5a7724(0x44f)]('|');                                                 let _0x28b9df = -0xaec + 0x212c + 0x4 * -0x590;                                                 while (!![]) {                                                     switch (_0x11b8d3[_0x28b9df++]) {                                                     case '0':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                             -(-0x24d * -0x7 + -0x10df * -0x2 + -0x26c7 * 0x1 + 0.1505000000001928),                                                             -0x1a78 + -0x1 * -0x130f + 0x874 + 0.8652999999999906,                                                             -(0x25e4 + -0x46b * 0x8 + 0x9a3 + 0.6484000000000378)                                                         ];                                                         continue;                                                     case '1':                                                         _0x308751[_0x5a7724(0x6f1)](_0x322b63 => {                                                             const _0x2aa482 = _0x5a7724;                                                             _0x322b63[_0x2aa482(0x597)] && (_0x322b63[_0x2aa482(0x26b)][_0x2aa482(0x5d9)] = _0x4baf63[_0x2aa482(0x2e2)], shaifenClickObjs[_0x2aa482(0x43a)](_0x322b63));                                                         });                                                         continue;                                                     case '2':                                                         allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     case '3':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                             -(0x309 + -0x23dc * 0x1 + 0x7 * 0x641 + 0.9540000000001783),                                                             -0xf5c * 0x1 + -0xf * -0x47 + 0x61a * 0x2 + 0.38999999999998636,                                                             -(-0x1 * -0x21a3 + 0x2 * 0xd73 + -0x337 * 0xf + 0.6390000000001237)                                                         ];                                                         continue;                                                     case '4':                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x42d)];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x12ee1a[_0x5a7724(0x709)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x47a)])) {                                                     const _0x28d3d4 = _0x12ee1a[_0x5a7724(0x5cf)][_0x5a7724(0x44f)]('|');                                                     let _0x1d6d7d = 0x119 * 0x15 + 0xaa2 * 0x2 + -0x2c51;                                                     while (!![]) {                                                         switch (_0x28d3d4[_0x1d6d7d++]) {                                                         case '0':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                 -(0x301 * 0x1 + 0xa4a + -0x2d9 + 0.0003999999998995918),                                                                 -0x25e6 + -0x1f6f * 0x1 + 0x4651 + 0.8000000000000114,                                                                 -(0x325 + 0x1f2 * 0x11 + -0x2 * 0xbf0 + 0.30780000000004293)                                                             ];                                                             continue;                                                         case '1':                                                             allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                             continue;                                                         case '2':                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x295)];                                                             continue;                                                         case '3':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                 -(0x6 * 0x647 + -0x96d + -0x11ef + 0.6718999999998232),                                                                 -0xaa * -0x13 + 0x1a29 + -0x25bc + 0.120900000000006,                                                                 -(-0x1 * 0x3c7 + 0x893 * 0x3 + -0x9c4 + 0.8395000000000437)                                                             ];                                                             continue;                                                         case '4':                                                             _0x308751[_0x5a7724(0x6f1)](_0x266811 => {                                                                 const _0x15d0e7 = _0x5a7724;                                                                 _0x266811[_0x15d0e7(0x597)] && (_0x266811[_0x15d0e7(0x26b)][_0x15d0e7(0x5d9)] = _0x12ee1a[_0x15d0e7(0x4fc)], shaifenClickObjs[_0x15d0e7(0x43a)](_0x266811));                                                             });                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x12ee1a[_0x5a7724(0x66b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1ce)])) {                                                         const _0x59d04a = _0x12ee1a[_0x5a7724(0x495)][_0x5a7724(0x44f)]('|');                                                         let _0x3a164d = 0x362 * -0x3 + -0x4 * 0x889 + -0x2c4a * -0x1;                                                         while (!![]) {                                                             switch (_0x59d04a[_0x3a164d++]) {                                                             case '0':                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x219)];                                                                 continue;                                                             case '1':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                     -(-0x179a + -0x580 + 0x27d3 + 0.9699999999997999),                                                                     0x157f + 0x18b * -0x17 + 0xfb7 + 0.12999999999999545,                                                                     -(0x7 * 0x67 + -0x3 * -0xbeb + 0x1 * -0x1a2b + 0.09999999999990905)                                                                 ];                                                                 continue;                                                             case '2':                                                                 _0x308751[_0x5a7724(0x6f1)](_0x461898 => {                                                                     const _0x29ff9d = _0x5a7724;                                                                     _0x461898[_0x29ff9d(0x597)] && (_0x461898[_0x29ff9d(0x5d9)] = _0x12ee1a[_0x29ff9d(0x468)], shaifenClickObjs[_0x29ff9d(0x43a)](_0x461898));                                                                 });                                                                 continue;                                                             case '3':                                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                 continue;                                                             case '4':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                     -(-0x2336 + 0x112f + 0x1cb7 + 0.7759000000000924),                                                                     0x583 + -0x15 * 0x12b + 0x73 * 0x2f + 0.5676999999999452,                                                                     -(0x1ae * 0xd + 0x62b * -0x6 + 0x1ab0 + 0.9034999999998945)                                                                 ];                                                                 continue;                                                             }                                                             break;                                                         }                                                     } else {                                                         if (_0x12ee1a[_0x5a7724(0x553)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2d9)])) {                                                             const _0x2fc6e6 = _0x12ee1a[_0x5a7724(0x2f2)][_0x5a7724(0x44f)]('|');                                                             let _0x4e77c0 = 0x937 + 0x1ece + 0x2805 * -0x1;                                                             while (!![]) {                                                                 switch (_0x2fc6e6[_0x4e77c0++]) {                                                                 case '0':                                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                     continue;                                                                 case '1':                                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x1ea)];                                                                     continue;                                                                 case '2':                                                                     _0x308751[_0x5a7724(0x6f1)](_0x480abe => {                                                                         const _0x4c620b = _0x5a7724;                                                                         _0x480abe[_0x4c620b(0x597)] && (_0x480abe[_0x4c620b(0x5d9)] = _0x12ee1a[_0x4c620b(0x5d1)], shaifenClickObjs[_0x4c620b(0x43a)](_0x480abe));                                                                     });                                                                     continue;                                                                 case '3':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                         -(0x2 * -0x91d + -0x521 * -0x1 + 0x17cc + 0.774199999999837),                                                                         -0x7c1 * -0x5 + -0x269b + 0xb * 0x1b + 0.6299999999999955,                                                                         -(0x1ce2 + 0xcb6 + 0x1 * -0x1d41 + 0.815599999999904)                                                                     ];                                                                     continue;                                                                 case '4':                                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                         -(0x1207 + -0x20b3 + -0xc * -0x223 + 0.10930000000007567),                                                                         -0x19c8 + 0x893 + -0x129a * -0x1 + 0.7556000000000154,                                                                         -(0xd * -0x188 + 0x32 * 0xc7 + -0x672 + 0.8094999999998436)                                                                     ];                                                                     continue;                                                                 }                                                                 break;                                                             }                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 } else {                                     if (_0x12ee1a[_0x5a7724(0x195)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x51f)])) {                                         if (_0x12ee1a[_0x5a7724(0x19a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x1ab)])) {                                             const _0x2ef188 = _0x12ee1a[_0x5a7724(0x4ed)][_0x5a7724(0x44f)]('|');                                             let _0x5da8f5 = -0xd * 0x112 + -0x5 * 0x3f5 + 0x1 * 0x21b3;                                             while (!![]) {                                                 switch (_0x2ef188[_0x5da8f5++]) {                                                 case '0':                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '1':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(-0x71 * -0x17 + 0x1a9 + -0xfa + 0.17479999999977736),                                                         -0x2417 * -0x1 + -0x15e8 + -0xc69 + 0.6000000000000227,                                                         -(-0x133e + 0x1 * 0xfbb + -0xb6f * -0x1 + 0.7119000000000142)                                                     ];                                                     continue;                                                 case '2':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x282)];                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x6f1)](_0x59c609 => {                                                         const _0x411515 = _0x5a7724;                                                         _0x59c609[_0x411515(0x597)] && (_0x59c609[_0x411515(0x26b)][_0x411515(0x5d9)] = _0x4baf63[_0x411515(0x25b)], suishiClickObjs[_0x411515(0x43a)](_0x59c609));                                                     });                                                     continue;                                                 case '4':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(0x155d + -0x331 * 0x1 + -0x734 + 0.4029000000000451),                                                         0x1a37 + 0x10 * -0x25 + -0x1605 + 0.1490999999999758,                                                         -(0x1 * -0xb71 + -0x1be7 + -0x3 * -0xfb3 + 0.5347999999999047)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x12ee1a[_0x5a7724(0x64c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6c8)])) {                                                 const _0x834a17 = _0x12ee1a[_0x5a7724(0x452)][_0x5a7724(0x44f)]('|');                                                 let _0x5e3143 = -0x657 * -0x3 + 0x9bd + -0x2 * 0xe61;                                                 while (!![]) {                                                     switch (_0x834a17[_0x5e3143++]) {                                                     case '0':                                                         allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     case '1':                                                         _0x308751[_0x5a7724(0x6f1)](_0x3d6ae4 => {                                                             const _0x1f10ae = _0x5a7724;                                                             _0x3d6ae4[_0x1f10ae(0x597)] && (_0x3d6ae4[_0x1f10ae(0x26b)][_0x1f10ae(0x5d9)] = _0x4baf63[_0x1f10ae(0x1de)], suishiClickObjs[_0x1f10ae(0x43a)](_0x3d6ae4));                                                         });                                                         continue;                                                     case '2':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                             -(-0x1c3d * -0x1 + 0x11 * 0xe + -0x12a6 + 0.6858999999999469),                                                             0x7c * 0x42 + -0x3 * 0x239 + 0x1 * -0x1787 + 0.6000000000000227,                                                             -(-0x1bf4 + -0x3b * -0x10 + 0x2038 + 0.8830000000000382)                                                         ];                                                         continue;                                                     case '3':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                             -(0x1ba8 + 0x1 * -0xfee + 0x7 * -0x26 + 0.95699999999988),                                                             -0x3 * -0x892 + -0xf85 * -0x1 + -0x275b + 0.9583999999999833,                                                             -(0x1d3c + 0x2154 + -0x36cf + 0.9402999999999793)                                                         ];                                                         continue;                                                     case '4':                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x47c)];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x12ee1a[_0x5a7724(0x327)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4c0)])) {                                                     const _0x4f27eb = _0x12ee1a[_0x5a7724(0x411)][_0x5a7724(0x44f)]('|');                                                     let _0x259e1a = 0x1 * -0x228f + -0x1 * 0x878 + 0x89b * 0x5;                                                     while (!![]) {                                                         switch (_0x4f27eb[_0x259e1a++]) {                                                         case '0':                                                             allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                             continue;                                                         case '1':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                 -(-0x230d + 0x3a1 * 0x4 + 0x1f6f * 0x1 + 0.09999999999990905),                                                                 0x2 * 0x1289 + 0x1d26 + -0x4144 + 0.09809999999998809,                                                                 -(-0x3b * 0x71 + 0xe62 + 0x17d6 + 0.8845000000001164)                                                             ];                                                             continue;                                                         case '2':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                 -(-0x2b7 + 0x3 * 0xc1 + -0x2 * -0x5a1 + 0.8548999999998159),                                                                 -0x1c07 + -0x1a8c + -0xa7 * -0x55 + 0.38999999999998636,                                                                 -(0x64c + 0x1 * -0x2ae + -0xf * -0x95 + 0.02109999999993306)                                                             ];                                                             continue;                                                         case '3':                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x2c6)];                                                             continue;                                                         case '4':                                                             _0x308751[_0x5a7724(0x6f1)](_0x206049 => {                                                                 const _0x6bda3e = _0x5a7724;                                                                 _0x206049[_0x6bda3e(0x597)] && (_0x206049[_0x6bda3e(0x5d9)] = _0x4baf63[_0x6bda3e(0x284)], suishiClickObjs[_0x6bda3e(0x43a)](_0x206049));                                                             });                                                             continue;                                                         }                                                         break;                                                     }                                                 } else {                                                     if (_0x12ee1a[_0x5a7724(0x66b)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x63f)])) {                                                         const _0x470259 = _0x12ee1a[_0x5a7724(0x627)][_0x5a7724(0x44f)]('|');                                                         let _0x16716c = -0x1dac + -0x19f4 + 0x164 * 0x28;                                                         while (!![]) {                                                             switch (_0x470259[_0x16716c++]) {                                                             case '0':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                     -(-0x44b * 0x5 + 0x35 * 0x1f + -0x88c * -0x3 + 0.9113000000002103),                                                                     -0xc3b * 0x1 + -0xb5a + 0x14 * 0x13a + 0.04400000000001114,                                                                     -(0xae1 + -0xbcf * 0x3 + -0x1 * -0x24c3 + 0.9029999999997926)                                                                 ];                                                                 continue;                                                             case '1':                                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x2d0)];                                                                 continue;                                                             case '2':                                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                     -(0x1 * 0x255e + 0xa71 + -0x17 * 0x19f + 0.2721999999998843),                                                                     -0x1dfc * -0x1 + 0x1381 + -0x13 * 0x28f + 0.6699999999999875,                                                                     -(-0x17cc + 0x15c4 + 0xe6d * 0x1 + 0.7777000000000953)                                                                 ];                                                                 continue;                                                             case '3':                                                                 _0x308751[_0x5a7724(0x6f1)](_0x1c142b => {                                                                     const _0x5ab6c9 = _0x5a7724;                                                                     _0x1c142b[_0x5ab6c9(0x597)] && (_0x1c142b[_0x5ab6c9(0x5d9)] = _0x12ee1a[_0x5ab6c9(0x2b6)], suishiClickObjs[_0x5ab6c9(0x43a)](_0x1c142b));                                                                 });                                                                 continue;                                                             case '4':                                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                                 continue;                                                             }                                                             break;                                                         }                                                     }                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 } else {                     if (_0x12ee1a[_0x5a7724(0x345)](_0x308751[_0x5a7724(0x474)], _0x12ee1a[_0x5a7724(0x480)])) {                         if (_0x12ee1a[_0x5a7724(0x3a7)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x198)]))                             (_0x12ee1a[_0x5a7724(0x650)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x688)]) || _0x12ee1a[_0x5a7724(0x5d4)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x515)])) && _0x308751[_0x5a7724(0x6f1)](_0x2c2660 => {                                 const _0x3505c9 = _0x5a7724;                                 if (_0x2c2660[_0x3505c9(0x597)]) {                                     const _0x2a76f6 = _0x4baf63[_0x3505c9(0x2a8)][_0x3505c9(0x44f)]('|');                                     let _0x932d80 = -0x2318 + 0x2 * 0x6a3 + 0x15d2;                                     while (!![]) {                                         switch (_0x2a76f6[_0x932d80++]) {                                         case '0':                                             _0x4baf63[_0x3505c9(0x2cf)](_0x308751[_0x3505c9(0x5d9)], _0x4baf63[_0x3505c9(0x70d)]) && (_0x2c2660[_0x3505c9(0x5d9)] = _0x4baf63[_0x3505c9(0x246)]);                                             continue;                                         case '1':                                             (_0x4baf63[_0x3505c9(0x34e)](_0x2c2660[_0x3505c9(0x5d9)], _0x4baf63[_0x3505c9(0x4e9)]) || _0x4baf63[_0x3505c9(0x34e)](_0x2c2660[_0x3505c9(0x5d9)], _0x4baf63[_0x3505c9(0x1eb)])) && (_0x2c2660[_0x3505c9(0x359)][_0x3505c9(0x70a)] = _0x2c2660[_0x3505c9(0x359)][_0x3505c9(0x70a)][_0x3505c9(0x361)](), _0x2c2660[_0x3505c9(0x359)][_0x3505c9(0x70a)][_0x3505c9(0x214) + 'e'] = !![], limojiJiaodaiObjs[_0x3505c9(0x43a)](_0x2c2660));                                             continue;                                         case '2':                                             limoClickObjs[_0x3505c9(0x43a)](_0x2c2660);                                             continue;                                         case '3':                                             _0x4baf63[_0x3505c9(0x557)](_0x308751[_0x3505c9(0x5d9)], _0x4baf63[_0x3505c9(0x6fc)]) && (_0x2c2660[_0x3505c9(0x5d9)] = _0x4baf63[_0x3505c9(0x39e)]);                                             continue;                                         case '4':                                             _0x2c2660[_0x3505c9(0x26b)][_0x3505c9(0x464)] = _0x308751;                                             continue;                                         }                                         break;                                     }                                 }                             });                         else {                             if (_0x12ee1a[_0x5a7724(0x2d7)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x6d8)])) {                                 if (_0x12ee1a[_0x5a7724(0x1f2)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x476)]) || _0x12ee1a[_0x5a7724(0x665)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x683)]) || _0x12ee1a[_0x5a7724(0x494)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2ec)]) || _0x12ee1a[_0x5a7724(0x1f8)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2ee)]) || _0x12ee1a[_0x5a7724(0x670)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x29d)]) || _0x12ee1a[_0x5a7724(0x2c7)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x338)]) || _0x12ee1a[_0x5a7724(0x450)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x571)]) || _0x12ee1a[_0x5a7724(0x5ce)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2fc)]) || _0x12ee1a[_0x5a7724(0x380)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x601)]) || _0x12ee1a[_0x5a7724(0x21a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x74b)]) || _0x12ee1a[_0x5a7724(0x337)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x301)]) || _0x12ee1a[_0x5a7724(0x3ad)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x634)]) || _0x12ee1a[_0x5a7724(0x6d9)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x531)]) || _0x12ee1a[_0x5a7724(0x664)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x43c)]) || _0x12ee1a[_0x5a7724(0x2aa)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4fb)]) || _0x12ee1a[_0x5a7724(0x6ed)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x55b)]) || _0x12ee1a[_0x5a7724(0x6b3)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4f8)])) {                                     const _0x2a482b = _0x12ee1a[_0x5a7724(0x372)][_0x5a7724(0x44f)]('|');                                     let _0x16f017 = -0xb * -0x25d + 0x1 * -0x26ba + -0xcbb * -0x1;                                     while (!![]) {                                         switch (_0x2a482b[_0x16f017++]) {                                         case '0':                                             if (_0x12ee1a[_0x5a7724(0x3db)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x683)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4ad)];                                             continue;                                         case '1':                                             duishishitouquantity[_0x5a7724(0x43a)](_0x308751);                                             continue;                                         case '2':                                             if (_0x12ee1a[_0x5a7724(0x5b1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x571)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x1ff)];                                             continue;                                         case '3':                                             if (_0x12ee1a[_0x5a7724(0x3bd)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x601)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x3a6)];                                             continue;                                         case '4':                                             if (_0x12ee1a[_0x5a7724(0x4df)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x531)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x619)];                                             continue;                                         case '5':                                             if (_0x12ee1a[_0x5a7724(0x434)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x29d)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x1c8)];                                             continue;                                         case '6':                                             if (_0x12ee1a[_0x5a7724(0x67e)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4fb)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x51b)];                                             continue;                                         case '7':                                             if (_0x12ee1a[_0x5a7724(0x1ae)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x476)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6d7)];                                             continue;                                         case '8':                                             if (_0x12ee1a[_0x5a7724(0x69a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x55b)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x55a)];                                             continue;                                         case '9':                                             if (_0x12ee1a[_0x5a7724(0x5c6)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x74b)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x439)];                                             continue;                                         case '10':                                             if (_0x12ee1a[_0x5a7724(0x291)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x4f8)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x5d3)];                                             continue;                                         case '11':                                             if (_0x12ee1a[_0x5a7724(0x55c)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2fc)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x4e8)];                                             continue;                                         case '12':                                             if (_0x12ee1a[_0x5a7724(0x1c1)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2ec)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x2be)];                                             continue;                                         case '13':                                             if (_0x12ee1a[_0x5a7724(0x589)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x2ee)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x3df)];                                             continue;                                         case '14':                                             if (_0x12ee1a[_0x5a7724(0x57a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x43c)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6d4)];                                             continue;                                         case '15':                                             if (_0x12ee1a[_0x5a7724(0x2aa)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x301)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x314)];                                             continue;                                         case '16':                                             if (_0x12ee1a[_0x5a7724(0x522)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x338)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x20f)];                                             continue;                                         case '17':                                             if (_0x12ee1a[_0x5a7724(0x5ab)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x634)]))                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x53e)];                                             continue;                                         }                                         break;                                     }                                 }                             } else {                                 if (_0x12ee1a[_0x5a7724(0x2a0)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x72b)])) {                                     if (_0x12ee1a[_0x5a7724(0x197)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x35f)])) {                                         const _0x3f6d95 = _0x12ee1a[_0x5a7724(0x572)][_0x5a7724(0x44f)]('|');                                         let _0xa27e16 = 0x235f + 0x707 * 0x3 + -0x2 * 0x1c3a;                                         while (!![]) {                                             switch (_0x3f6d95[_0xa27e16++]) {                                             case '0':                                                 _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x486)];                                                 continue;                                             case '1':                                                 _0x308751[_0x5a7724(0x6f1)](_0xe2a032 => {                                                     const _0x66c395 = _0x5a7724;                                                     _0xe2a032[_0x66c395(0x597)] && (_0xe2a032[_0x66c395(0x5d9)] = _0x12ee1a[_0x66c395(0x4a8)], posuiClickObjs[_0x66c395(0x43a)](_0xe2a032));                                                 });                                                 continue;                                             case '2':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                     -(0x25b + 0x256c * -0x1 + 0x2e0c + 0.8357999999998356),                                                     -0x2026 + -0x168f + -0x6fb * -0x8 + 0.2647999999999797,                                                     -(-0x4ea + -0x64d + 0xb * 0x259 + 0.878400000000056)                                                 ];                                                 continue;                                             case '3':                                                 allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                 continue;                                             case '4':                                                 _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                     -(0xe * -0xf9 + -0x89 * 0x1d + -0x73 * -0x59 + 0.4899999999997817),                                                     -0x1097 + -0x1b69 + 0x2d15 + 0.660000000000025,                                                     -(-0x3 * 0x4e1 + -0xbc + 0x1e20 + 0.6900000000000546)                                                 ];                                                 continue;                                             }                                             break;                                         }                                     } else {                                         if (_0x12ee1a[_0x5a7724(0x6a0)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x437)])) {                                             const _0x51e6ca = _0x12ee1a[_0x5a7724(0x6e0)][_0x5a7724(0x44f)]('|');                                             let _0x523e42 = 0x1d2b + 0x13e * 0x1d + 0x15bb * -0x3;                                             while (!![]) {                                                 switch (_0x51e6ca[_0x523e42++]) {                                                 case '0':                                                     _0x308751[_0x5a7724(0x6f1)](_0x2cc0f7 => {                                                         const _0x4fbfc3 = _0x5a7724;                                                         _0x2cc0f7[_0x4fbfc3(0x597)] && (_0x2cc0f7[_0x4fbfc3(0x5d9)] = _0x4baf63[_0x4fbfc3(0x656)], posuiClickObjs[_0x4fbfc3(0x43a)](_0x2cc0f7));                                                     });                                                     continue;                                                 case '1':                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '2':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x41f)];                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(0x208c + -0xeb6 + -0x751 + 0.7800000000002001),                                                         0x1 * 0xe0b + -0x6 * -0x412 + -0x6 * 0x63b + 0.4300000000000068,                                                         -(-0x252 + -0x815 + 0x1928 + 0.3200000000001637)                                                     ];                                                     continue;                                                 case '4':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(-0xb73 * 0x3 + -0x17d3 + -0x1 * -0x44d2 + 0.7568999999998596),                                                         -0xfc3 + 0xdcc + 0x318 + 0.6969000000000278,                                                         -(0xfec + -0x2c * -0x3b + -0xb73 + 0.5488000000000284)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x12ee1a[_0x5a7724(0x72a)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x223)])) {                                                 const _0x4f91a6 = _0x12ee1a[_0x5a7724(0x260)][_0x5a7724(0x44f)]('|');                                                 let _0xdc1ddb = -0x4a * -0x17 + 0x397 * 0x1 + 0x1 * -0xa3d;                                                 while (!![]) {                                                     switch (_0x4f91a6[_0xdc1ddb++]) {                                                     case '0':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                             -(-0x1 * 0x24c7 + -0x13dc + 0x4395 + 0.12780000000020664),                                                             0x5f9 + 0x23ce + -0x28a7 + 0.05309999999997217,                                                             -(0x1463 + -0x1afa + -0x29 * -0x83 + 0.478099999999813)                                                         ];                                                         continue;                                                     case '1':                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x3fb)];                                                         continue;                                                     case '2':                                                         allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     case '3':                                                         _0x308751[_0x5a7724(0x6f1)](_0x2d21a7 => {                                                             const _0x4bdb7f = _0x5a7724;                                                             _0x2d21a7[_0x4bdb7f(0x597)] && (_0x2d21a7[_0x4bdb7f(0x5d9)] = _0x12ee1a[_0x4bdb7f(0x3be)], posuiClickObjs[_0x4bdb7f(0x43a)](_0x2d21a7));                                                         });                                                         continue;                                                     case '4':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                             -(-0x175 * -0x15 + -0x1aa6 * -0x1 + -0x2e68 + 0.6799999999998363),                                                             -0x182 * -0x6 + -0x173a + 0xf3e * 0x1 + 0.19999999999998863,                                                             -(0xfe7 + 0x1 * -0xe33 + 0xcd8 + 0.05999999999994543)                                                         ];                                                         continue;                                                     }                                                     break;                                                 }                                             } else {                                                 if (_0x12ee1a[_0x5a7724(0x58f)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x743)])) {                                                     const _0x436ec5 = _0x12ee1a[_0x5a7724(0x495)][_0x5a7724(0x44f)]('|');                                                     let _0x2e4cc4 = -0x87f + -0x1ba7 + -0x2426 * -0x1;                                                     while (!![]) {                                                         switch (_0x436ec5[_0x2e4cc4++]) {                                                         case '0':                                                             _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x200)];                                                             continue;                                                         case '1':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                                 -(-0x6 * 0x50b + 0x1 * -0x156c + -0x5 * -0xc72 + 0.05999999999994543),                                                                 -0x9d * -0x2 + 0x4 * -0x919 + 0xb * 0x34b + 0.9800000000000182,                                                                 -(0x1a11 + 0x1dba + -0x293f + 0.1799999999998363)                                                             ];                                                             continue;                                                         case '2':                                                             _0x308751[_0x5a7724(0x6f1)](_0x3848f5 => {                                                                 const _0x4c2425 = _0x5a7724;                                                                 _0x3848f5[_0x4c2425(0x597)] && (_0x3848f5[_0x4c2425(0x5d9)] = _0x4baf63[_0x4c2425(0x22b)], posuiClickObjs[_0x4c2425(0x43a)](_0x3848f5));                                                             });                                                             continue;                                                         case '3':                                                             allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                             continue;                                                         case '4':                                                             _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                                 -(0x1 * 0x11b6 + 0x1e2 * 0x6 + 0x20a * -0x9 + 0.7031000000001768),                                                                 -0x2 * 0x72c + -0x5 * -0x703 + -0x1396 + 0.902499999999975,                                                                 -(-0x7fe + -0x16 * -0x121 + -0x278 + 0.029899999999997817)                                                             ];                                                             continue;                                                         }                                                         break;                                                     }                                                 }                                             }                                         }                                     }                                 } else {                                     if (_0x12ee1a[_0x5a7724(0x1c1)](_0x181e61[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x642)])) {                                         if (_0x12ee1a[_0x5a7724(0x22d)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x194)])) {                                             const _0x264959 = _0x12ee1a[_0x5a7724(0x4d1)][_0x5a7724(0x44f)]('|');                                             let _0x5257ec = -0x165f + 0x3 * 0x831 + 0x2 * -0x11a;                                             while (!![]) {                                                 switch (_0x264959[_0x5257ec++]) {                                                 case '0':                                                     _0x308751[_0x5a7724(0x6f1)](_0x16b694 => {                                                         const _0x44ec01 = _0x5a7724;                                                         _0x16b694[_0x44ec01(0x597)] && (_0x16b694[_0x44ec01(0x5d9)] = _0x4baf63[_0x44ec01(0x513)], shaifenClickObjs[_0x44ec01(0x43a)](_0x16b694));                                                     });                                                     continue;                                                 case '1':                                                     allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                     continue;                                                 case '2':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                         -(0x2118 + 0x263e + -0x3c4d * 0x1 + 0.5516999999999825),                                                         -0xc7 * -0x20 + -0x2570 + 0xdc6 + 0.4463000000000079,                                                         -(0x25e9 + 0x19db * -0x1 + 0x26 + 0.5444000000002234)                                                     ];                                                     continue;                                                 case '3':                                                     _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x475)];                                                     continue;                                                 case '4':                                                     _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                         -(-0x115d + 0x254d * 0x1 + 0x1 * -0x915 + 0.9596000000001368),                                                         0x1f * 0x1f + -0x1 * 0x186c + 0x15c0 + 0.8799999999999955,                                                         -(-0x39e + 0x35b * 0xb + -0x14ea + 0.5234000000000378)                                                     ];                                                     continue;                                                 }                                                 break;                                             }                                         } else {                                             if (_0x12ee1a[_0x5a7724(0x290)](_0x308751[_0x5a7724(0x5d9)], _0x12ee1a[_0x5a7724(0x655)])) {                                                 const _0x14c19d = _0x12ee1a[_0x5a7724(0x5aa)][_0x5a7724(0x44f)]('|');                                                 let _0x193d8d = -0x14 * 0x156 + 0x17b3 * -0x1 + 0x326b;                                                 while (!![]) {                                                     switch (_0x14c19d[_0x193d8d++]) {                                                     case '0':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x3e6) + 'a'] = [                                                             -(0xb * -0x49 + 0x20df + 0x1307 * -0x1 + 0.9108999999998559),                                                             -0x88 * -0x47 + 0x3 * 0x25 + -0x763 * 0x5 + 0.7253999999999792,                                                             -(0x11 * 0x1f + 0x3 * 0x536 + 0x15f * -0x4 + 0.09389999999984866)                                                         ];                                                         continue;                                                     case '1':                                                         _0x308751[_0x5a7724(0x26b)][_0x5a7724(0x256) + _0x5a7724(0x646)] = [                                                             -(0x1022 + 0x1606 + 0x1 * -0x1b9d + 0.9030999999999949),                                                             0xb39 + -0x45c + -0x5c7 + 0.009999999999990905,                                                             -(-0x8 * -0x421 + 0xb * 0x277 + -0x2fc2 * 0x1 + 0.91800000000012)                                                         ];                                                         continue;                                                     case '2':                                                         _0x308751[_0x5a7724(0x6f1)](_0x39dab3 => {                                                             const _0x3edcfd = _0x5a7724;                                                             _0x39dab3[_0x3edcfd(0x597)] && (_0x39dab3[_0x3edcfd(0x5d9)] = _0x4baf63[_0x3edcfd(0x503)], shaifenClickObjs[_0x3edcfd(0x43a)](_0x39dab3));                                                         });                                                         continue;                                                     case '3':                                                         _0x308751[_0x5a7724(0x26b)]['id'] = _0x12ee1a[_0x5a7724(0x6bb)];                                                         continue;                                                     case '4':                                                         allDeviceFocus[_0x5a7724(0x43a)](_0x308751);                                                         continue;                                                     }                                                     break;                                                 }                                             }                                         }                                     }                                 }                             }                         }                     }                 }             }         });     },     'onLoad': () => {         const _0x1226f4 = _0xc3d9ba, _0x569ca5 = {                 'HrGMw': function (_0x30dac9) {                     return _0x30dac9();                 },                 'OaCmN': function (_0x446327) {                     return _0x446327();                 },                 'DvJSc': function (_0x48ea05) {                     return _0x48ea05();                 },                 'KUZzO': function (_0x54936f) {                     return _0x54936f();                 },                 'EYSyS': function (_0x33ab2d, _0x3847fa, _0x2d5d46) {                     return _0x33ab2d(_0x3847fa, _0x2d5d46);                 }             };         container[_0x1226f4(0x4b7) + _0x1226f4(0x64e)](), defaultSky = container[_0x1226f4(0x5ff)], _0x569ca5[_0x1226f4(0x4ec)](addOutRoadLEDPlane), _0x569ca5[_0x1226f4(0x33a)](addRoomUpLedPlanePlane), _0x569ca5[_0x1226f4(0x33a)](addLimoRoomMainMachineText), _0x569ca5[_0x1226f4(0x33a)](addDevicePlane), _0x569ca5[_0x1226f4(0x1ec)](addCameraDevicePlane), _0x569ca5[_0x1226f4(0x308)](addDuichangLEDPlane), _0x569ca5[_0x1226f4(0x308)](render), _0x569ca5[_0x1226f4(0x64a)](setTimeout, () => {             const _0x34cb16 = _0x1226f4;             callback && _0x569ca5[_0x34cb16(0x4ec)](callback);         }, -0x1696 + -0xf * -0x11f + 0xb7 * 0x13), container[_0x1226f4(0x30c) + 'ts'] = [defaultSky];         const _0x1a301c = new THREE[(_0x1226f4(0x365)) + 'y'](0x7 * 0x241 + -0x26 * 0x1a + -0xbea, -0x180b + -0x2b1 * -0x6 + -0x3 * -0x2a5, 0x1 * 0xfbb + -0x1b22 + 0xb68), _0x1843eb = new THREE[(_0x1226f4(0x2c5)) + (_0x1226f4(0x376))]({ 'color': 0xff00 });         locationCube = new THREE[(_0x1226f4(0x4c7))](_0x1a301c, _0x1843eb), locationCube[_0x1226f4(0x6e1)][_0x1226f4(0x30b)](-0x2490 + 0x7 * 0x509 + 0x151, -0x171 * 0x19 + 0x18 * 0x186 + -0x3 * 0x2d, -0x2050 + -0xc40 + 0x2c90), locationCube[_0x1226f4(0x482)] = ![], container[_0x1226f4(0x57d)](locationCube), container[_0x1226f4(0x385) + 'ns'][_0x1226f4(0x310)](_0x149932 => {             const _0x369c65 = _0x1226f4;             _0x149932[_0x369c65(0x75e)] = ![];         });     } }));
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
        } else if (name.includes('破碎间破碎料皮带') || (userName && userName.includes('破碎间破碎料皮带')) ) {
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
        } else if (name.includes('筛分间振动筛给料皮带') || (userName && userName.includes('筛分间振动筛给料皮带'))) {
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
        } else if (name.includes('筛分间振动筛集料皮带') || (userName && userName.includes('筛分间振动筛集料皮带'))) {
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
        } else if (name.includes('破碎间振动筛返料皮带') || (userName && userName.includes('破碎间振动筛返料皮带'))) {
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
        } else if (name.includes('破碎间可移动皮带') || (userName && userName.includes('破碎间可移动皮带'))) {
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
        } else if (name.includes('破碎间圆锥破中间仓')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            userClickDeviceID(
                "破碎间",
                e.objects[0].object.userData.id,
            );
            container.outlineObjects = [e.objects[0].object];
        } else if (name.includes('碎石配料间振动筛出料皮带') || (userName && userName.includes('碎石配料间振动筛出料皮带'))) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            userClickDeviceID(
                "碎石配料间",
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
        } else if (name.includes('碎石配料间破碎出料除铁器')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let parent = e.objects[0].object.parent;
            userClickDeviceID(
                "碎石配料间",
                parent.userData.id,
            );
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('破碎间筛分回料除铁器')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let parent = e.objects[0].object.parent;
            userClickDeviceID(
                "破碎间",
                parent.userData.id,
            );
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('破碎间破碎除尘器')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let parent = e.objects[0].object.parent;
            userClickDeviceID(
                "破碎间",
                parent.userData.id,
            );
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('破碎间破碎行车')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let parent = e.objects[0].object.parent;
            userClickDeviceID(
                "破碎间",
                parent.userData.id,
            );
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('筛分间筛分除尘器')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let parent = e.objects[0].object.parent;
            userClickDeviceID(
                "筛分间",
                parent.userData.id,
            );
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        } else if (name.includes('筛分间筛分行车')) {
            cameraModelPlane.position.set(...position);
            cameraModelPlane.visible = true;
            let parent = e.objects[0].object.parent;
            userClickDeviceID(
                "筛分间",
                parent.userData.id,
            );
            let outArr = [];
            parent.traverse((s) => {
                if (s.isMesh) {
                    outArr.push(s);
                }
            });
            container.outlineObjects = outArr;
        }
        // 

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