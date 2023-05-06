/*防抖*/
export function debounce(fn, delay = 1000) {
    let timer = null
    return function () {
        let args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(this, args)// this 指向vue
        }, delay)
    }
}
