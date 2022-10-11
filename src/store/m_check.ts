import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

export const useIsMobileStore = defineStore({
    id: 'isMobile',
    state: () => ({
        isMobile: false,
        carouselHeight: '390px',
    })
})

export const userCheckMobile = () => {
    const screenWidth = ref(document.documentElement.clientWidth)
    const { isMobile, carouselHeight } = storeToRefs(useIsMobileStore())

    onMounted(() => {
        screenWidth.value = document.documentElement.clientWidth
        if (screenWidth.value < 1024) {
            isMobile.value = true
            carouselHeight.value = (Math.floor((screenWidth.value * 420) / 1080)) + 'px'
        } else {
            isMobile.value = false
        }
        window.onresize = () => {
            screenWidth.value = document.documentElement.clientWidth
            // console.log(screenWidth.value)
            if (screenWidth.value < 1024) {
                isMobile.value = true
                carouselHeight.value = (Math.floor((screenWidth.value * 420) / 1080)) + 'px'
            } else {
                isMobile.value = false
            }
        }
        // console.log(carouselHeight.value)
    })
}