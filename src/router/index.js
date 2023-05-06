import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

import Home from "../pages/home";

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', component: Home, meta:{ index: 0 }},
    ]
})
