<template>
    <transition :name="slideDirection">
        <router-view class="router-view" />
    </transition>
</template>

<script>
export default {
    name: 'App',
    data(){
        return{
            slideDirection:"slide-right"
        }
    },
    watch:{
        '$route'(to ,from) {
            const toIndex = to.meta.index;
            const fromIndex = from.meta.index;
            console.log("toIndex：" + toIndex + "，fromIndex：" + fromIndex);
            this.slideDirection = toIndex < fromIndex ? "slide-right" : "slide-left"
        }
    }
}
</script>

<style lang="less">
@import "style/common.less";
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
    .router-view {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all .3s ease;
    }
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100% 0);
    }
</style>
