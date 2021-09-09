import * as $ from 'jquery'
function createAnalytics() {
    let counter = 0
    let destoed = false

    const listener = () => counter++

    $(document).on('click',listener)

    return {
        destroy() {
            $(document).off('click',listener)
            destoed = true
        },

        getClicks() {
            if (destoed) {
                return `ANALytics is tota; click = ${counter}`
            }
            return counter
        }
    }
}

window.analytics = createAnalytics()