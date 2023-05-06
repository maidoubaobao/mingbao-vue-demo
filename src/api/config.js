import VueCookies from 'vue-cookie';

let token = VueCookies.get("token");
let account = VueCookies.get("account");

export default {
    token,account
}
