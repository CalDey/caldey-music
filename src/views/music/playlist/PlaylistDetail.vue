<template>
    <div class="safe-container flex flex-col lg:flex-row">
        <div class="w-full lg:w-2/3 border-0 lg:border mr-4 p-0 lg:p-4 rounded-md">
            <div v-if="playlist && songs.length > 0">
                <Info :playlist="playlist" :play-all="()=>playAll()" />
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
            <el-table :data="songs" :header-cell-style="{background: 'rgba(153,153,153,.1)'}" class="w-full mt-10 mb-0 lg:mb-20">
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
                        <span v-else class="cursor-pointer" @click="play(scope.row.id)">{{scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="歌曲" align="center" />
                <el-table-column label="歌手" align="center">
                    <template #default="scope">
                        {{scope.row.ar[0].name}}
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
            <!-- 喜欢这个歌单的人 -->
            <div class=" mt-4 lg:mt-0 border p-4 rounded-md">
                <span class="border-l-4 border-red-400 pl-2">喜欢这个歌单的人</span>
                <div v-if="subscribers.length > 0">
                    <div class="flex flex-wrap mt-2">
                        <el-avatar v-for="item in subscribers" :key="item.userId" :src="item.avatarUrl" size="default" shape="square" class="ml-3 mb-2 flex-shrink-0"></el-avatar>
                    </div>
                </div>
            </div>
            <!-- 相关推荐 -->
            <div class=" mt-4 border p-4 rounded-md">
                <span class="border-l-4 border-red-400 pl-2">相关推荐</span>
                <div v-if="related.length > 0">
                    <div v-for="item in related" :key="item.id" class="mt-2 flex">
                        <el-image class="w-14 card-radius flex-shrink-0" :src="item.coverImgUrl" />
                        <div class="ml-2 truncate text-sm">
                            <div class="truncate">{{item.name}}</div>
                            <div class="mt-2 text-slate-400">{{item.creator.nickname}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 精彩评论 -->
            <div class=" mt-4 mb-20 border p-4 rounded-md">
                <span class="border-l-4 border-red-400 pl-2">精彩评论</span>
                <div v-if="comments.length > 0">
                    <div v-for="item in comments" :key="item.commentId" class="mt-2 flex">
                        <el-avatar size="large" :src="item.user.avatarUrl" class="flex-shrink-0"></el-avatar>
                        <div class="ml-2">
                            <div>
                                <span>{{item.user.nickname}}</span>
                                <span class="text-slate-400 ml-2 text-xs">{{moment(item.time).fromNow()}}</span>
                            </div>
                            <div class="text-xs p-2 mt-2 bg-slate-100 card-radius">{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import Info from "@/views/music/playlist/Info.vue";
import type { PlayListDetail, PlayListDetailSubscribers, PlaylistRelated, PlaylistHotComments } from "@/models/playlist";
import type { Song } from "@/models/song";
import { usePlayListDetail, usePlayListTrackAll, usePlayListSubscribers, usePlayListRelated, usePlayListComment } from "@/utils/api";
import { getCurrentInstance } from "vue-demi";
import {usePlayerStore} from "@/store/player";

const route = useRoute()
const playlist = ref<PlayListDetail>()
const songs = ref<Song[]>([]);
const subscribers = ref<PlayListDetailSubscribers[]>([])
const related = ref<PlaylistRelated[]>([])
const comments = ref<PlaylistHotComments[]>([])

const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment

const { pushPlayList, play } = usePlayerStore()

const { id } = toRefs(usePlayerStore())

const click = (id:any) => {
    console.log(id)
}

// 播放全部
const playAll = () => {
  pushPlayList(true, ...songs.value)
//   console.log(songs.value[0].id)
  play(songs.value[0].id)
}

const getData = () => {
    const id: number = Number(route.query.id)
    // 获取歌单详情
    usePlayListDetail(id).then(res => {
        playlist.value = res
    })
    // 获取歌单内所有歌曲数据
    usePlayListTrackAll(id).then(res => {
        songs.value = res
    })
    // 获取歌单收藏用户信息
    usePlayListSubscribers(id).then(res => {
        subscribers.value = res
    })
    // 获取相似歌单推荐
    usePlayListRelated(id).then(res => {
        related.value = res
    })
    // 获取歌单评论
    usePlayListComment(id).then(res => {
        comments.value = res
    })
}

onMounted(async() => {
    await getData()
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