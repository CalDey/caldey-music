<template>
    <div class="safe-container">
        <div>
            <div class="flex items-center">
                <span class="font-bold text-xl mb-4">推荐MV</span>
            </div>
        </div>
        <div v-if="personalizedMv.length > 0" class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="(item, index) in personalizedMv" :key="index" @click="router.push({name: 'mvDetail', query: {id: item.id}})">
                <CoverItem :img-url="item.picUrl" :play-count="item.playCount" show-play-count video />
                <div class="truncate text-xs mt-2">{{item.name}}</div>
                <div class="truncate text-xs mt-1.5 text-slate-400"><small>{{ item.artistName }}</small></div>
            </div>
        </div>
        <div v-else class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="(item, index) in 4" :key="index">
                <el-skeleton animated>
                    <template #template>
                        <el-skeleton-item variant="image" :style="isMobile ? {width: '40vw', height: '22vw'} : {width: '20vw', height: '12vw'}" />
                        <el-skeleton class="mt-2" :rows="1" />
                    </template>
                </el-skeleton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useVideoStore } from "@/store/video";
import CoverItem from "@/components/common/CoverItem.vue";
import { useIsMobileStore } from "@/store/m_check";

const { personalizedMv } = toRefs(useVideoStore())
const { getPersonalizedMv } = useVideoStore()
const { isMobile } = toRefs(useIsMobileStore())

const router = useRouter()

onMounted(async() => {
    await getPersonalizedMv()
})
</script>

<style scoped>
</style>