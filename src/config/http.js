import axios from 'axios';
import common from './common';
import md5 from 'js-md5';

/**
 * 跨域
 */
axios.defaults.timeout = 10000;

/**
 * 请求之前拦截
 */
axios.interceptors.request.use(config => {
    /**
     * X_APPID 分配给客户端的身份标识
     * X_TIME 当前时间戳（秒），5分钟内有效
     * X_RANDOM 随机数(建议0-65536)
     * X_TRACEID 链路id，UUID每次请求随机生成
     * X_SIGN 签名
     */
    let appSecret = "7741b374554ea98153f173e0a7822a86";
    let X_APPID = "374554e2a98153f1733e0a78222a861";
    let X_TIME = common.timeStamp();
    let X_RANDOM = common.mathRandom();
    let X_TRACEID = common.uuid();
    let X_SIGN = md5(appSecret + X_TIME + X_RANDOM + X_TRACEID);
    //动态设置通用请求头
    config.headers.common = {
        'Content-Type':'application/json;charset=utf-8',
        'X_APPID':X_APPID,
        'X_TIME':X_TIME,
        'X_RANDOM':X_RANDOM,
        'X_TRACEID':X_TRACEID,
        'X_SIGN':X_SIGN
    }
    return config;
},error => {
    return Promise.reject(error);
})

/**
 * 响应之前拦截
 */
axios.interceptors.response.use(response => {
    var outrance = common.decryptByDesModeDES(response.data.encryption);
    var result = JSON.parse(outrance)
    // var result = outrance
    console.log("%c返回结果 ==> " + JSON.stringify(result),  "color:#0094ff");
    return result;
},error => {
    return Promise.reject(error);
})

/**
 * 封装axios请求
 */
export default {
    //get请求
    requestGet (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //get请求不带参数
    requestQuickGet (url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //登录使用POST请求
    requestLoginPost(url,params = {}){
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //post请求
    requestPost (url, params = {}) {
        let requestConfig = {
            devInfo: {
                channel:"01A0003",
                softVer:"3.0.4",
                opSystem:"Android 9",
                clientId:"000AF5CE3D30",
            },
            data: params
        }
        let entrance = JSON.stringify(requestConfig);
        let encryText = common.encryptByDESModeEBC(entrance)
        let requestParams = {'encryption':encryText};
        console.log("接口 ==> " + url)
        console.log("入参 ==> " + entrance);

        console.log("加密后入参 ==>" + JSON.stringify(requestParams));
        return new Promise((resolve, reject) => {
            axios.post(url, requestParams).then(res => {
                // resolve(res.data)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //postForm请求
    requestPostForm (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //put请求
    requestPut (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //delete请求
    requestDelete (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //POST 上传文件带参数
    requestPostFile(url,params={},){
        return new Promise((resolve,reject) => {
            axios.post(url,params,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
}
