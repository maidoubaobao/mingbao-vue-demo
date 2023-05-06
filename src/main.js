import Vue from 'vue';
import App from './App';
import router from './router';
import './style/font/iconfont.css';
// 屏幕适配rem
import './utils/rem.js';
// 引入vant;
import Vant, {Lazyload} from 'vant';
import 'vant/lib/index.css';
//引入自定义toast组件
import toastRegistry from "./components/Toast/index";

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(toastRegistry);

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
