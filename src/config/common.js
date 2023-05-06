import CryptoJS from 'crypto-js';
let appId = "374554e2a98153f1733e0a78222a861"
let appSecret = "7741b374554ea98153f173e0a7822a86";
let browser = {
    versions: function (){
        var u = navigator.userAgent, app = navigator.appVersion;
        return{
            //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    //判断是否安卓还是IOS
    isAndroid:function (){
        var u = navigator.userAgent,app = navigator.appVersion;

        if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            return false;
        } else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
            return true;
        } else{
            return true;
        }
    }()
}
export default {
    // 生成时间戳
    timeStamp:function(){
        var time = Date.parse( new Date() ).toString();
        time = time.substr(0,10);
        return time;
    },
    // 生成随机数
    mathRandom:function(){
        return Math.floor(Math.random()*65536);
    },
    // 生成uuid
    uuid:function(){
        function S4(){
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (
            S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
        );
    },
    // DES加密
    encryptByDESModeEBC:function(params){
        var hexKey =  CryptoJS.enc.Utf8.parse(appSecret);
        var encrypted = CryptoJS.DES.encrypt(params,hexKey,{
            mode:CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        return encrypted.toString();
    },
    // DES解密
    decryptByDesModeDES:function(params){
        var hexKey =  CryptoJS.enc.Utf8.parse(appSecret);
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext:CryptoJS.enc.Base64.parse(params)
        },hexKey,{
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
        return decrypted.toString();
    },
    // AES加密
   encryptByAesMode(word, keyStr){
    keyStr = keyStr ? keyStr : '8346cde0a4b75318c0ea2039cfc64000';
    if(keyStr.length <16) {
        keyStr = keyStr + "0000000000000000".substring(0, 16-keyStr.length);
    }
    else if(keyStr.length >16) {
        keyStr = keyStr.substring(0, 16);
    }
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode:CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase()
},
    // AES解密
    decryptByAesMode(word, keyStr){
        keyStr = keyStr ? keyStr : '8346cde0a4b75318c0ea2039cfc64000';
        if(keyStr.length <16) {
            keyStr = keyStr + "0000000000000000".substring(0, 16-keyStr.length);
        }
        else if(keyStr.length >16) {
            keyStr = keyStr.substring(0, 16);
        }
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var decrypted = CryptoJS.AES.decrypt(srcs,key,{
            mode:CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        // return CryptoJS.enc.Utf8.stringify(decrypted).toString();
        console.log("key >> " + key);
        console.log("word >> " + word);
        console.log("srcs >> " + srcs);
        console.log("keyStr >> " + keyStr);
        console.log("decrypted1" + decrypted)
        console.log("decrypted2" + decrypted.toString(CryptoJS.enc.Utf8))
        return decrypted.toString(CryptoJS.enc.Utf8)
    },
    // 获取地址栏参数
    getUrlParam:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    /**
     * 获取时间
     */
    //时间
    getDay:function (day){
        function doHandle(req){
            var resp = req;
            if(req.toString().length == 1){
                resp = "0" + req
            }
            return resp;
        }
        const today = new Date();
        const target_day_milliseconds = today.getTime() + 1000*60*60*24*day;
        today.setTime(target_day_milliseconds);
        const Year = today.getFullYear();
        const Month = doHandle(today.getMonth() + 1);
        const tDate = doHandle(today.getDate());
        const H = doHandle(today.getHours());
        const M = doHandle(today.getMinutes());
        const S = doHandle(today.getSeconds());
        // return Year + '-' + Month + '-' + tDate + ' ' + H + ':' + M;
        return Year + '-' + Month + '-' + tDate + ' ' + H + ':' + M + ':' + S;
    },
    //时间格式化
    dateFormat:function(fmt, date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    },
    //历史地址
    pushHistory:function (){
        // let state = { title: '', url: '' }
        // window.history.pushState(state, state.title, state.url)
        // window.history.pushState(null, null, document.URL)
    },
    //移动终端浏览器版本信息
    browser,
    /**
     * 密码是否符合规则
     * 1.不能是连续的字符
     * 2.同一个字符的个数不超过总长度的一半
     * 3.字符类型的个数必须大于等于（总长度-1）的一半
     */
    //判断不能是相同的字符和连续的字符
    isAllString:(value) => {
        let data = value.split('');
        let chartCode = [];
        let flag = false;
        for(let i in data){
            chartCode.push(value.charCodeAt(i));
            if(chartCode.length === data.length){
                for(let i = 1; i <= chartCode.length; i++){
                    if(Math.abs(Number(chartCode[i]) - Number(chartCode[i - 1])) > 1){
                        flag = true;
                        break;
                    }
                }
            }
        }
        return flag;
    },
    //判断同一个字符的个数不超过总长度的一半&&字符类型的个数必须大于等于（总长度-1）的一半
    isCountCheck:(value) => {
        let obj = {};
        let length = value.length;
        let half = length / 2;
        let objhalf = (length - 1) / 2;
        let flag = true;
        for(let i = 0; i < value.length; i++){
            let key = value[i];
            if(obj[key]){
                obj[key]++;
            }else{
                obj[key] = 1;
            }
        }
        //判断用一个字符的个数不超过总长度的一半
        for(let key in obj){
            if(obj[key] >= half){
                flag = false;
                break;
            }
        }
        //字符类型的个数必须大于等于（总长度-1）的一半
        let objlength = Object.keys(obj).length;
        if(objlength < objhalf){
            flag = false;
        }
        return flag;
    },
    //防抖
    debounce:function(fn,delay = 1000){
        let timer = null;
        return function (){
            let args = arguments;
            if(timer){
                clearTimeout(timer)
                timer = null;
            }
            timer = setTimeout(() => {
                fn.apply(this,args)
            },delay)
        }
    }
}
