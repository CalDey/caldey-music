<template>
    <div v-loading="loading" class="safe-container" style="min-height: 5rem">
        <div v-if="artistDesc && artistDesc.introduction.length > 0">
            <div v-for="(item, index) in artistDesc.introduction" :key="index">
                <div class="py-5 font-bold text-sm">{{ item.ti }}</div>
                <div
                    class="text-xs text-slate-500 leading-7"
                    style="white-space: pre-wrap"
                    v-html="item.txt"
                />
            </div>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue';
import { useArtistDesc } from '@/utils/api';
import type { ArtistDesc } from '@/models/artist_detail';
const props = defineProps<{
    id: number;
}>();
const artistDesc = ref<ArtistDesc>();
const loading = ref(true);

onMounted(async () => {
    artistDesc.value = await useArtistDesc(props.id);
    loading.value = false;
    console.log(artistDesc);
});
</script>

<style lang="scss" scoped></style>
