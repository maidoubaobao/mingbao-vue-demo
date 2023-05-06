<template>
    <div class="contain">
        <van-cell-group inset class="inputBox">
            <!-- 门锁实体图片 -->
            <van-image lazy-load src="http://res-oss.xsmart.link/type-img/FCXF1108.png" class="lockImage"/>
            <div class="welcome">欢迎使用科大讯飞智能门锁</div>

            <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="errorPhoneText"
                       :formatter="phoneFormatter" @blur="checkPhone"/>
            <van-field v-model="msgCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <template #button>
                    <van-button class="sendCode" size="small" type="primary" :disabled="sendCodeDisable"
                                @click="sendCode">{{ sendCodeText }}
                    </van-button>
                </template>
            </van-field>

            <!-- 绑定微信的按钮 -->
            <van-button class="bindWechat" size="normal" @click="bindWechat">绑定门锁</van-button>
        </van-cell-group>

        <!-- 绑定微信缓冲气泡 -->
        <van-popup class="bindWechatPopup" round :close-on-click-overlay="false" v-model:show="showWechatBindPopup">
            <van-loading vertical color="#1989fa" v-show="showWechatBinding">
                绑定中...
            </van-loading>
            <div v-show="showWechatBound">
                <van-icon class="bindWechatResult" name="success" color="#1989fa"/>
                <span class="bindWechatResultText">绑定成功，请关闭当前页面，至讯小智APP中查看。</span>
            </div>
            <div v-show="showWechatBindFailed">
                <van-icon class="bindWechatResult" name="fail" color="#E73F25"/>
                <span class="bindWechatResultText" style="color: #E73F25">{{ bindWechatResultText }}</span>
            </div>
        </van-popup>
    </div>

</template>

<script>
import {getVerifyCode, wechatBind} from "../api/getData";
import {Field} from 'vant';

export default {
    components: {
        Field
    },
    setup() {
        // 过滤输入的手机号
        const phoneFormatter = (value) => value.replace(/\D/g, '');
        return {
            phoneFormatter
        };
    },
    data() {
        return {
            // 手机号
            phone: "",
            errorPhoneText: "",
            // 短信验证码
            msgCode: "",
            // 微信授权码
            wechatCode: "",

            // 短信验证码文案
            sendCodeText: "发送验证码",
            countdown: 60,
            sendCodeDisable: false,

            // 显示绑定微信的气泡
            showWechatBindPopup: false,
            showWechatBinding: false,
            showWechatBound: false,
            showWechatBindFailed: false,
            bindWechatResultText: "绑定失败，请重试！",

            // 页面主体内容离顶端的距离
            inputBoxTop: 0,
        };
    },
    created() {
        // 获取url中的code
        // query: code=123798345&state=iot#/
        let query =location.href.split('?')[1];
        // vars: code=123798345 state=iot#/
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            // pair: code 123798345 | state iot#/
            let pair = vars[i].split("=");
            if(pair[0] === "code"){
                this.wechatCode = pair[1].replace("#/", "");
            }
        }
        console.info("wechatCode", this.wechatCode)
    },
    methods: {
        // 校验手机号
        checkPhone() {
            if (this.phone.length === 0) {
                this.errorPhoneText = "";
            } else if (this.phone.length !== 11) {
                this.errorPhoneText = "手机号格式错误";
            } else {
                this.errorPhoneText = "";
            }
        },

        // 发送短信验证码
        sendCode() {
            // 先校验手机号
            if (this.phone.length !== 11) {
                this.$toast("请先输入正确的手机号", 2000);
                return;
            }

            // 获取验证码
            this.doGetVerifyCode().then(result => {
                if (result) {
                    this.countdownCode();
                }
            })
        },
        countdownCode() {
            if (this.countdown === 0) {
                this.sendCodeDisable = false;
                this.sendCodeText = "发送验证码";
                this.countdown = 60;
                return;
            } else {
                this.sendCodeDisable = true;
                this.sendCodeText = "重新发送(" + this.countdown + "s)";
                this.countdown--;
            }
            // 间隔1秒递归调用
            setTimeout(() => {
                this.countdownCode();
            }, 1000);
        },

        // 绑定微信
        bindWechat() {
            // 校验参数
            if (this.phone.length !== 11) {
                this.$toast("请先输入正确的手机号", 2000);
                return;
            }
            if (this.msgCode === "") {
                this.$toast("请输入获取的验证码", 2000);
                return;
            }

            // 显示气泡
            this.showWechatBindFailed = false;
            this.showWechatBindPopup = true;
            this.showWechatBinding = true;
            this.bindWechatResultText = "绑定失败，请重试！";

            // 发送绑定微信的请求
            this.doWechatBind().then(result => {
                if (result) {
                    // 微信绑定成功
                    this.showWechatBound = true;
                    this.showWechatBinding = false;
                } else {
                    // 微信绑定失败
                    this.showWechatBindFailed = true;
                    this.showWechatBinding = false;
                    // 隐藏弹框
                    setTimeout(() => {
                        this.showWechatBindPopup = false;
                    }, 2000);
                }
            });
        },

        // 获取短信验证码
        async doGetVerifyCode() {
            try {
                const res = await getVerifyCode({
                    phone: this.phone,
                    type: "2",
                });
                console.info("getVerifyCode", res);
                if (res.code === 0) {
                    return true;
                } else if (res.code === 202) {
                    this.$toast("该手机号还没有在讯小智APP注册，请先注册！", 2000);
                } else {
                    this.$toast(res.message, 2000);
                }
            } catch (err) {
            }
        },
        // 绑定微信
        async doWechatBind() {
            try {
                const res = await wechatBind({
                    account: this.phone,
                    wechatCode: this.wechatCode,
                    verifyCode: this.msgCode,
                });
                console.info("wechatBind", res);
                if (res.code === 0) {
                    return true;
                } else {
                    this.bindWechatResultText = res.message;
                    this.$toast(res.message, 2000);
                }
            } catch (err) {
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../style/pages/home.less";
</style>
