<template>
    <div class="safe-container" v-loading="loading" style="min-height: 5rem;">
        <div v-if="artistDesc">
            <div v-for="(item, index) in artistDesc.introduction" :key="index">
                <div class="py-5 font-bold text-sm">{{ item.ti }}</div>
                <div class="text-xs text-slate-500 leading-7" style="white-space: pre-wrap" v-html="item.txt"/>
            </div>
        </div>
        <el-empty description="暂无数据" v-else/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useArtistDesc } from "@/utils/api"
import type { ArtistDesc } from "@/models/artist_detail"
const props = defineProps<{
    id: number
}>()
const artistDesc = ref<ArtistDesc>()
const loading = ref(true)

onMounted(async() => {
    artistDesc.value = await useArtistDesc(props.id)
    loading.value = false
    console.log(artistDesc)
})
</script>

<style lang="scss" scoped>
</style>