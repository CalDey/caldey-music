import { defineStore } from "pinia";
import { ref } from "vue";
import type { Banner } from "@/models/banner";
import { useBanner } from "@/utils/api";

export const useCommonStore = defineStore('common', () => {
    // banner
    const banners = ref<Banner[]>([]);

    const getBanners = async () => {
        if (banners.value.length) return;
        banners.value = await useBanner();
    }

    return {
        banners,
        getBanners
    }
})