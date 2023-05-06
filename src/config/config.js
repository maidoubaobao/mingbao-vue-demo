/**
 * 用于存储设备信息、用户信息供界面使用
 */
import VueCookies from "vue-cookie";

let isAndroid = VueCookies.get("isAndroid");

export default{
    isAndroid,
}
