<template>
    <div>
        <PlaylistTag @change-tag="changeTag" />
        <div class="safe-container">
            <div class="flex items-center">
                <span class="font-bold text-xl mb-4">{{pageData.tag}}歌单</span>
            </div>
        </div>
        <div class="safe-container">
            <div v-if="list" class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
                <div v-for="(item, index) in list" :key="index" @click="router.push({name: 'PlaylistDetail', query: {id: item.id}})">
                    <CoverItem :img-url="item.coverImgUrl" :play-count="item.playCount" show-play-count />
                    <div class="truncate text-xs mt-2">{{item.name}}</div>
                    <div class="truncate text-xs text-slate-400 mt-2">{{item.creator.nickname}}</div>
                </div>
            </div>
            <div v-else class="grid grid-flow-row grid-cols-4 gap-5">
                <div v-for="(item, index) in 20" :key="index">
                    <el-skeleton animated>
                        <template #template>
                            <el-skeleton-item variant="image" style="width: 20vw; height:20vw;" />
                            <el-skeleton class="mt-2" :rows="0" />
                        </template>
                    </el-skeleton>
                </div>
            </div>
        </div>
        <div v-if="pageData.init" class="safe-container">
            <div class="py-5 mb-20">
                <el-button type="text" :loading="pageData.loading" class="w-full" @click="getData">加载更多</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import PlaylistTag from "@/views/music/playlist/PlayListTag.vue";
import CoverItem from "@/components/common/CoverItem.vue";
import type { PlayListDetail } from "@/models/playlist";
import { useTopPlaylistHighquality } from "@/utils/api";

const router = useRouter()

const list = ref<PlayListDetail[]>()

const pageData = reactive({
    init: false,
    loading: false,
    more: false,
    limit: 20,
    before: 0,
    tag: '全部'
})

const changeTag = (tag: string) => {
    // 切换标签重置数据
    pageData.tag = tag
    pageData.before = 0
    pageData.more = false

    getData()
}

const getData = async() => {
    pageData.loading = true

    const { playlists, lasttime, more } = await useTopPlaylistHighquality({
        limit: pageData.limit,
        before: pageData.before,
        cat: pageData.tag
    })
    if(pageData.before <= 0) {
        list.value = playlists
    }else{
        list.value?.push(...playlists)
    }
    pageData.init = true
    pageData.loading = false
    pageData.before = lasttime
    pageData.more = more
}

onMounted(() => {
    getData()
})
</script>

<style scoped>

</style>