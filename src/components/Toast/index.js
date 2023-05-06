import vue from "vue";
import toastComponent from "./toast";
const ToastConstructor = vue.extend(toastComponent);

//弹出组件函数
function showToast(text, duration){
    const toastDom  = new ToastConstructor({
        el:document.createElement("div"),
        data(){
            return{
                text:text,
                showWrap:true,
                showContent:true,
            }
        }
    });

    document.body.appendChild(toastDom.$el);

    // setTimeout(() => {toastDom.showContent = false},duration - 1250)
    setTimeout(() => {toastDom.showContent = false},duration)

    setTimeout(() => {toastDom.showWrap = false},duration)
}

//注册为全局组件
function registryToast(){
    vue.prototype.$toast = showToast
}

export default registryToast
