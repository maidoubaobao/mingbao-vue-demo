<template>
    <div class="wrap" v-if="showWrap" :class="showContent ? 'fadein' : 'fadeout'">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: "toast"
}
</script>

<style scoped>
    .wrap{
        position: fixed;
        left: 50%;
        bottom: 0.3rem;
        line-height: 0.24rem;
        text-align: center;
        background: rgb(0,0,0);
        padding:0 0.05rem;
        border-radius: 0.12rem;
        font-size: 0.1rem;
        color: #FFFFFF;
        transform: translateX(-50%);
        z-index: 9999;
    }
    .fadein {
        animation: animate_in 0.25s;
    }
    .fadeout {
        animation: animate_out 0.25s;
        opacity: 0;
    }
    @keyframes animate_in {
        0% {
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes animate_out {
        0% {
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
</style>
