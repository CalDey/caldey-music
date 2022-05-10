import { defineStore } from "pinia";
import { ref } from "vue";
import { usePersonalizedMv } from "@/utils/api";
import type { PersonalizedMv } from "@/models/personalized";

export const useVideoStore = defineStore('video', () => {
    const personalizedMv = ref<PersonalizedMv[]>([])
    const getPersonalizedMv = async () => {
        if (personalizedMv.value.length) return;
        personalizedMv.value = await usePersonalizedMv()
    }

    return {
        personalizedMv,
        getPersonalizedMv
    }
})