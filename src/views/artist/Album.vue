<template>
    <div class="safe-container flex flex-col lg:flex-row">
        <div class="w-full lg:w-2/3 border-0 lg:border mr-4 p-0 lg:p-4 rounded-md">
            <div v-if="albumData && songList.length > 0">
                <Info :playlist="albumData" :play-all="()=>playAll()" />
            </div>
            <div v-else>
                <el-skeleton animated>
                    <template #template>
                        <div class="flex flex-col lg:flex-row items-center">
                            <el-skeleton-item variant="image" style="width: 176px; height: 176px;" class="flex-shrink-0" />
                            <el-skeleton class="ml-4 mt-4 text-center lg:text-left" :rows="4" />
                        </div>
                    </template>
                </el-skeleton>
            </div>
            <el-table v-if="albumData && songList.length > 0" :data="songList" :header-cell-style="{background: 'rgba(153,153,153,.1)'}" class="w-full mt-10 mb-0 lg:mb-20">
                <el-table-column  align="center" width="60" >
                    <template #default="scope">
                        <div v-if="scope.row.id === id" class="w-full flex justify-center">
                            <div class="play-icon">
                                <div class="line" style="animation-delay: -1.2s!important;"></div>
                                <div class="line"></div>
                                <div class="line" style="animation-delay: -1.5s!important;"></div>
                                <div class="line" style="animation-delay: -0.9s!important;"></div>
                                <div class="line" style="animation-delay: -0.6s!important;"></div>
                            </div>
                        </div>
                        <div v-else class="cursor-pointer hover-icon flex justify-center" @click="play(scope.row.id)">
                            <span class="hover-icon-1 text-center">{{scope.$index + 1}}</span>
                            <icon-svg class="w-6 h-6 flex justify-center hover-icon-2" icon-name="#icon-bofang"></icon-svg>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="歌曲" align="center" />
                <el-table-column label="歌手" align="center">
                    <template #default="scope">
                        {{scope.row.ar[0].name}}
                    </template>
                </el-table-column>
                <el-table-column label="专辑" align="center">
                    <template #default="scope">
                        {{scope.row.al.name}}
                    </template>
                </el-table-column>
                <el-table-column label="时长" align="center">
                    <template #default="scope">
                        {{moment(scope.row.dt).format('mm:ss')}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="w-full lg:w-1/3">
            <!-- 热门专辑 -->
            <div class=" mt-4 border p-4 rounded-md">
                <span class="border-l-4 border-red-400 pl-2">热门专辑</span>
                <div v-if="hotAlbum.length > 0">
                    <div v-for="item in hotAlbum" :key="item.id" class="mt-2 flex">
                        <el-image class="w-14 card-radius flex-shrink-0" :src="item.picUrl" />
                        <div class="ml-2 truncate text-sm">
                            <div class="truncate">{{item.name}}</div>
                            <div class="mt-2 text-slate-400">{{item.artist.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 精彩评论 -->
            <div class=" mt-4 mb-20 border p-4 rounded-md">
                <span class="border-l-4 border-red-400 pl-2">精彩评论</span>
                <div v-if="comment.length > 0">
                    <div v-for="item in comment" :key="item.commentId" class="mt-2 flex">
                        <el-avatar size="large" :src="item.user.avatarUrl" class="flex-shrink-0"></el-avatar>
                        <div class="ml-2">
                            <div>
                                <span>{{item.user.nickname}}</span>
                                <span class="text-slate-400 ml-2 text-xs">{{moment(item.time).fromNow()}}</span>
                            </div>
                            <div class="text-xs p-2 mt-2 bg-slate-100 card-radius">{{item.content}}</div>
                            <div class="mt-2 flex items-center text-xs">
                                <icon-svg class="w-4 h-4" icon-name="#icon-zan"></icon-svg>
                                <span class="ml-1">{{item.likedCount}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue"
import { useAlbum, useArtistAlbum, useAlbumComment } from "@/utils/api"
import { useRoute } from "vue-router"
import Info from "@/views/artist/Info.vue"
import { getCurrentInstance } from "vue-demi"
import { usePlayerStore } from "@/store/player"
import type { Album } from "@/models/album"
import type { Song } from "@/models/song"
import type { PlaylistHotComments } from "@/models/playlist"

const albumData = ref<Album>()
const songList = ref<Song[]>([])
const hotAlbum = ref<Album[]>([])
const comment = ref<PlaylistHotComments[]>([])
const route = useRoute()
const artistId = Number(route.query.id)
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment
const { pushPlayList, play } = usePlayerStore()
const { id } = toRefs(usePlayerStore())

// 播放全部
const playAll = () => {
    pushPlayList(true, ...songList.value)
    play(songList.value[0].id)
}

onMounted(async() => {
    // 获取专辑信息
    const { album, songs } = await useAlbum(artistId)
    albumData.value = album
    songList.value = songs
    hotAlbum.value = await useArtistAlbum(albumData.value.artist.id, 5, 0)
    //   console.log(albumData.value)
    //   console.log(songList.value)
    console.log(hotAlbum.value)
    // 获取专辑评论
    const { hotComments, comments } = await useAlbumComment(artistId)
    if(hotComments.length > 0) {
        comment.value = hotComments
    }else {
        comment.value = comments
    }
    // console.log(hotComments)
    // console.log(comments)
})
</script>

<style lang="scss" scoped>
.play-icon {
    display: flex;
    height: 16px;
    min-width: 18px;
    overflow: hidden;
    .line {
        width: 2px;
        height: 100%;
        margin-left: 2px;
        background-color: #ff410f;
        animation: play .9s linear infinite alternate!important;
    }
}

.hover-icon-2 {
    display: none;
}

.hover-icon:hover .hover-icon-1 { display: none; }
.hover-icon:hover .hover-icon-2 { display: block; }

@keyframes play {
	0% {
		-webkit-transform: translateY(0);
		transform: translateY(0)
	}

	to {
		-webkit-transform: translateY(85%);
		transform: translateY(85%)
	}
}
</style>