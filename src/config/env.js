/**
 * 配置编译环境与线上环境切换
 */
console.log("evn.js,  process.env.NODE_ENV = " + process.env.NODE_ENV);

let baseUrl = "";

if (process.env.NODE_ENV === "dev") {
    baseUrl = "/api";
} else if (process.env.NODE_ENV === "test") {
    baseUrl = "http://iptv-test.ihou.com:5053";
} else if (process.env.NODE_ENV === "prod") {
    baseUrl = "http://rest.xsmart.link:8001";
} else {
    baseUrl = "http://rest.xsmart.link:8001";
}

export {
    baseUrl,
}
