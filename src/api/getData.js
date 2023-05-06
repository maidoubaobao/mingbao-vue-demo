import {baseUrl} from "../config/env";
import http from "../config/http";

/**
 * 微信绑定接口
 */
import {getVerifyCodeUrl, wechatBindUrl} from "./url.domain.config";

/**
 * *****************************************************************************
 * ****************************接口调用方法***************************************
 * *****************************************************************************
 */
export const getVerifyCode = params => {return http.requestPost(baseUrl + getVerifyCodeUrl, params)}
export const wechatBind = params => {return http.requestPost(baseUrl + wechatBindUrl, params)}
