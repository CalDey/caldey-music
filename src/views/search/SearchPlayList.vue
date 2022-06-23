<template>
    <div v-loading="loading">
        <div v-if="playlist.length > 0">
            <div class="grid gird-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
                <div v-for="(item, index) in playlist" :key="index">
                    <CoverItem :img-url="item.coverImgUrl" @click="router.push({name: 'PlaylistDetail', query: {id: item.id}})" />
                    <div class="mt-2 text-xs truncate">{{ item.name }}</div>
                    <div class="mt-1 text-xs text-slate-400 truncate">{{ item.creator.nickname }}</div>
                </div>
            </div>
            <div v-if="pageData.init" class="py-10">
                <el-button type="text" :loading="pageData.loading" class="w-full" @click="loadMore(1000)">加载更多</el-button>
            </div>
        </div>
        <el-empty description="暂无数据" v-else/>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const props = defineProps<{
    playlist: any
    loading: boolean
    pageData: any
}>()
const router = useRouter()
const emit = defineEmits(['loadMore'])
const loadMore = (type: number) => {
    emit('loadMore', type)
}
</script>

<style></style>