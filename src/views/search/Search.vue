<template>
    <div class="safe-container">
        <div>
            <div class="my-5 text-center lg:text-left text-2xl">
                <span class="font-bold">搜索结果:&nbsp;&nbsp;</span>
                <span class="text-sm">{{keyword}}</span>
            </div>
        </div>
        <el-tabs class="my-4" v-model="tab" @tab-click="handleClick">
            <el-tab-pane lazy label="单曲" name="music">
                <Song :songs="songs" :loading="loading" :pageData="pageData" @load-more="loadMore" />
            </el-tab-pane>
            <el-tab-pane lazy label="歌手" name="singer">
                <Artist :artist="artist" :loading="loading" :pageData="pageData" @load-more="loadMore" />
            </el-tab-pane>
            <el-tab-pane lazy label="专辑" name="album">
                <Album :album="album" :loading="loading" :pageData="pageData" @load-more="loadMore" />
            </el-tab-pane>
            <el-tab-pane lazy label="视频" name="video">
                <Video :video="video" :loading="loading" :pageData="pageData" @load-more="loadMore" />
            </el-tab-pane>
            <el-tab-pane lazy label="歌单" name="playList">
                <PlayList :playlist="playlist" :loading="loading" :pageData="pageData" @load-more="loadMore" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed } from 'vue'
import { useRoute } from "vue-router";
import Song from './SearchSong.vue'
import Artist from './SearchArtist.vue'
import Album from './SearchAlbum.vue'
import Video from './SearchVideo.vue'
import PlayList from './SearchPlayList.vue'
import { useSearch } from '@/utils/api'
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'
const tab = ref('music')
const route = useRoute()
const keyword = ref(route.query.keyword)
const loading = ref(true)
const type = ref<number>(1)
const songs = ref<any[]>([])
const artist = ref<any[]>([])
const album = ref<any[]>([])
const video = ref<any[]>([])
const playlist = ref<any[]>([])

watch(() => route.query.keyword, (val) => {
    keyword.value = val
    // 重置数据
    pageData.page = 1
    songs.value = []
    artist.value = []
    album.value = []
    video.value = []
    playlist.value = []
    getSearchData(type.value)
})

const pageData = reactive({
    init: false,
    loading: false,
    noMore: false,
    limit: 30,
    page: 1
})

const offset = computed(() => {
    return (pageData.page - 1) * pageData.limit
})

const loadMore = (type: number) => {
    pageData.page++
    getSearchData(type)
}


const handleClick = (tab: TabsPaneContext) => {
    pageData.page = 1
    if(tab.props.name === 'music' && songs.value.length === 0) {
        type.value = 1
        getSearchData(type.value)
    }
    else if(tab.props.name === 'singer' && artist.value.length === 0) {
        type.value = 100
        getSearchData(type.value)
    }
    else if(tab.props.name === 'album' && album.value.length === 0) {
        type.value = 10
        getSearchData(type.value)
    }
    else if(tab.props.name === 'video' && video.value.length === 0) {
        type.value = 1014
        getSearchData(type.value)
    }
    else if(tab.props.name === 'playList' && playlist.value.length === 0) {
        type.value = 1000
        getSearchData(type.value)
    }
    //   console.log(tab.props.name)
}

const getSearchData = async(type: number) => {
    loading.value = true
    pageData.loading = true
    try {
        const data = await useSearch(keyword.value as string, pageData.limit, offset.value, type)
        if(pageData.page === 1) {
            if(type === 1) {
                songs.value = data.songs
            }
            else if(type === 100) {
                artist.value = data.artists
            }
            else if(type === 10) {
                album.value = data.albums
            }
            else if(type === 1014) {
                video.value = data.videos
            }
            else if(type === 1000) {
                playlist.value = data.playlists
            }
        }else{
            if(type === 1) {
                songs.value.push(...data.songs)
            }
            else if(type === 100) {
                artist.value.push(...data.artists)
            }
            else if(type === 10) {
                album.value.push(...data.albums)
            }
            else if(type === 1014) {
                video.value.push(...data.videos)
            }
            else if(type === 1000) {
                playlist.value.push(...data.playlists)
            }
        }
        loading.value = false
        pageData.loading = false
        pageData.init = true
    }catch(e){
        console.log(e)
    }
}

onMounted(() => {
    getSearchData(1)
})
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav-wrap::after {
    height: 0!important;
}
::v-deep .el-tabs__nav {
    width: 100%;
}
::v-deep .el-tabs__item {
    padding: 0!important;
    width: 20%;
    text-align: center;
}
::v-deep .el-tabs__active-bar {
    height: 0!important;
}
::v-deep .el-tabs__item.is-active {
    color: #FFFFFF!important;
    @apply bg-red-300 
}
::v-deep .el-tabs__item:hover {
    @apply text-red-400
}
</style>