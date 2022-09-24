<template>
    <div class="safe-container flex flex-col lg:flex-row">
        <div class="w-full lg:w-2/3 border-0 lg:border mr-4 px-4 rounded-md">
            <!-- 分别渲染视频和mv对应内容区域 -->
            <div class="flex-1 py-4">
                <div v-if="video">
                    <div v-for="(item, index) in videoUrl" :key="index">
                        <video
                            class="aspect-video w-full"
                            :src="item?.url"
                            controls
                        />
                    </div>
                </div>
                <video
                    v-else
                    class="aspect-video w-full"
                    :src="mvUrl?.url"
                    controls
                />
            </div>
            <!-- 视频数据 -->
            <div>
                <div class="flex items-center">
                    <div v-if="mvDetail" class="flex">
                        <icon-svg
                            class="w-8 h-8 mr-2 flex-shrink-0"
                            icon-name="#icon-MV"
                        ></icon-svg>
                        <span>{{ mvDetail.name }}</span>
                    </div>
                    <div v-else-if="videoDetail">
                        {{ videoDetail.title }}
                    </div>
                </div>
                <div class="mt-2 text-xs text-gray-400">
                    <div v-if="mvDetail">
                        <span class="mr-2"
                            >发布：{{ mvDetail.publishTime }}</span
                        >
                        <span>播放次数：{{ mvDetail.playCount }}</span>
                    </div>
                    <div v-else-if="videoDetail">
                        <span class="mr-2"
                            >发布：{{
                                moment(videoDetail.publishTime).format(
                                    'YYYY-MM-DD',
                                )
                            }}</span
                        >
                        <span>播放次数：{{ videoDetail.playTime }}</span>
                    </div>
                </div>
                <div class="mt-2 text-sm">
                    <div v-if="mvDetail && mvDetailInfo" class="flex">
                        <!-- 喜欢 -->
                        <div
                            class="flex items-center px-4 py-2 rounded-lg bg-gray-200 mr-4 cursor-pointer"
                        >
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-like"
                            ></icon-svg>
                            <span>{{ mvDetailInfo.likedCount }}</span>
                        </div>
                        <!-- 收藏 -->
                        <div
                            class="flex items-center px-4 py-2 rounded-lg bg-gray-200 mr-4 cursor-pointer"
                        >
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-star"
                            ></icon-svg>
                            <span>{{ mvDetail.subCount }}</span>
                        </div>
                        <!-- 分享 -->
                        <div
                            class="flex items-center px-4 py-2 rounded-lg bg-gray-200 cursor-pointer"
                        >
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-share"
                            ></icon-svg>
                            <span>{{ mvDetailInfo.shareCount }}</span>
                        </div>
                    </div>
                    <div v-if="videoDetail && videoDetailInfo" class="flex">
                        <!-- 喜欢 -->
                        <div
                            class="flex items-center px-4 py-2 rounded-lg bg-gray-200 mr-4 cursor-pointer"
                        >
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-like"
                            ></icon-svg>
                            <span>{{ videoDetailInfo.likedCount }}</span>
                        </div>
                        <!-- 收藏 -->
                        <div
                            class="flex items-center px-4 py-2 rounded-lg bg-gray-200 mr-4 cursor-pointer"
                        >
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-star"
                            ></icon-svg>
                            <span>{{ videoDetail.subscribeCount }}</span>
                        </div>
                        <!-- 分享 -->
                        <div
                            class="flex items-center px-4 py-2 rounded-lg bg-gray-200 cursor-pointer"
                        >
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-share"
                            ></icon-svg>
                            <span>{{ videoDetailInfo.shareCount }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex items-center mt-8 text-gray-500 text-sm pb-2 border-b"
            >
                <icon-svg
                    class="w-6 h-6 mr-2"
                    icon-name="#icon-pinglun"
                ></icon-svg>
                <span>Comments ｜ {{ totalComments }}条评论</span>
            </div>
            <!-- 精彩评论 -->
            <div class="border-l-4 theme-border-color pl-2 my-4">精彩评论</div>
            <div v-if="mvHotComments.length > 0">
                <div
                    v-for="item in mvHotComments"
                    :key="item.commentId"
                    class="mt-2 flex"
                >
                    <el-avatar
                        size="large"
                        :src="item.user.avatarUrl"
                        class="flex-shrink-0"
                    ></el-avatar>
                    <div class="ml-2">
                        <div>
                            <span>{{ item.user.nickname }}</span>
                            <span class="text-slate-400 ml-2 text-xs">{{
                                moment(item.time).fromNow()
                            }}</span>
                        </div>
                        <div class="text-xs p-2 mt-2 bg-slate-100 card-radius">
                            <span>{{ item.content }}</span>
                            <div v-if="item.beReplied.length > 0">
                                <div
                                    v-for="reply in item.beReplied"
                                    :key="reply.beRepliedCommentId"
                                    class="m-2 p-2 bg-white card-radius text-slate-400"
                                >
                                    <span class="theme-text-color mr-2"
                                        >@{{ reply.user.nickname }}:</span
                                    >
                                    <span>{{ reply.content }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center text-xs">
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-zan"
                            ></icon-svg>
                            <span class="ml-1">{{ item.likedCount }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-sm mt-2 text-slate-400">暂无评论</div>
            <!-- 最新评价 -->
            <div class="border-l-4 theme-border-color pl-2 my-4">最新评论</div>
            <div v-if="mvComments.length > 0" class="mb-2">
                <div
                    v-for="item in mvComments"
                    :key="item.commentId"
                    class="mt-2 flex"
                >
                    <el-avatar
                        size="large"
                        :src="item.user.avatarUrl"
                        class="flex-shrink-0"
                    ></el-avatar>
                    <div class="ml-2">
                        <div>
                            <span>{{ item.user.nickname }}</span>
                            <span class="text-slate-400 ml-2 text-xs">{{
                                moment(item.time).fromNow()
                            }}</span>
                        </div>
                        <div class="text-xs p-2 mt-2 bg-slate-100 card-radius">
                            <span>{{ item.content }}</span>
                            <div v-if="item.beReplied.length > 0">
                                <div
                                    v-for="reply in item.beReplied"
                                    :key="reply.beRepliedCommentId"
                                    class="m-2 p-2 bg-white card-radius text-slate-400"
                                >
                                    <span class="theme-text-color mr-2"
                                        >@{{ reply.user.nickname }}:</span
                                    >
                                    <span>{{ reply.content }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center text-xs">
                            <icon-svg
                                class="w-4 h-4"
                                icon-name="#icon-zan"
                            ></icon-svg>
                            <span class="ml-1">{{ item.likedCount }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-sm mt-2 text-slate-400">暂无评论</div>
        </div>
        <div class="w-full lg:w-1/3 mb-20">
            <!-- 视频简介 -->
            <div class="mt-4 lg:mt-0 border p-4 rounded-md">
                <div class="border-l-4 theme-border-color pl-2 mb-2">
                    视频简介
                </div>
                <div v-if="mvDetail">
                    <span class="text-slate-600 text-sm">{{
                        mvDetail.desc || '暂无内容'
                    }}</span>
                </div>
                <div v-else-if="videoDetail" class="text-slate-600 text-sm">
                    <div class="flex items-center my-2">
                        <el-avatar
                            class="flex-shrink-0 mr-2"
                            shape="circle"
                            :src="videoDetail.avatarUrl"
                        ></el-avatar>
                        <span>{{ videoDetail.creator.nickname }}</span>
                    </div>
                    <div>{{ videoDetail.description }}</div>
                </div>
            </div>
            <!-- 相关推荐 -->
            <div class="mt-4 border p-4 rounded-md">
                <div class="border-l-4 theme-border-color pl-2 mb-2">
                    相关推荐
                </div>
                <div v-if="simiMv.length > 0">
                    <div v-for="item in simiMv" :key="item.id">
                        <CoverItem
                            :img-url="item.cover"
                            :play-count="item.playCount"
                            show-play-count
                            video
                            class="mb-4"
                            @click="
                                router.push({
                                    name: 'mvDetail',
                                    query: { id: item.id, video: 'true' },
                                })
                            "
                        />
                        <span class="flex items-center">
                            <icon-svg
                                class="w-8 h-8 mr-2 flex-shrink-0"
                                icon-name="#icon-MV"
                            ></icon-svg>
                            <span>{{ item.name }}</span>
                        </span>
                        <div class="text-slate-400 text-sm mb-4">
                            By.{{ item.artistName }}
                        </div>
                    </div>
                </div>
                <div v-else-if="relatedVideo.length > 0">
                    <div v-for="item in relatedVideo" :key="item.vid">
                        <CoverItem
                            :img-url="item.coverUrl"
                            :play-count="item.playTime"
                            show-play-count
                            video
                            class="mb-4"
                            @click="
                                router.push({
                                    name: 'mvDetail',
                                    query: { id: item.vid, video: 'true' },
                                })
                            "
                        />
                        <span>{{ item.title }}</span>
                        <div class="text-slate-400 text-sm mb-4">
                            By.{{ item.creator[0].userName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CoverItem from '@/components/common/CoverItem.vue';
import {
    useMvUrl,
    useMvDetail,
    useMvDetailInfo,
    useMvComments,
    useVideoUrl,
    useSimiMv,
    useVideoDetail,
    useVideoDetailInfo,
    useVideoComments,
    useRelatedVideo,
} from '@/utils/api';
import type {
    MvUrl,
    MvDetail,
    MvDetailInfo,
    MvHotComments,
    MvComments,
    SimiMv,
} from '@/models/mv';
import type {
    VideoUrl,
    VideoDetail,
    VideoDetailInfo,
    VideoHotComments,
    VideoComments,
    RelatedVideo,
} from '@/models/video';
import { usePlayerStore } from '@/store/player';
import { getCurrentInstance } from 'vue-demi';

const { setPause, setPlayerShow } = usePlayerStore();
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const route = useRoute();
const router = useRouter();
const mvUrl = ref<MvUrl>();
const mvDetail = ref<MvDetail>();
const mvDetailInfo = ref<MvDetailInfo>();
const videoUrl = ref<VideoUrl>();
const id = ref();
const video = ref();
const videoDetail = ref<VideoDetail>();
const videoDetailInfo = ref<VideoDetailInfo>();
const mvHotComments = ref<MvHotComments[]>([]);
const mvComments = ref<MvComments[]>([]);
const simiMv = ref<SimiMv[]>([]);
const totalComments = ref<number>();
const relatedVideo = ref<RelatedVideo[]>([]);

// 视频页面数据初始化
const initVideoPage = async () => {
    // 根据路由参数判断视频类型为video or MV
    setPause();
    setPlayerShow(1);
    if (route.query.video === 'true') {    // video
        console.log(route.query.video)
        id.value = route.query.id; // vid
        video.value = true;
        videoUrl.value = await useVideoUrl(id.value);
        videoDetail.value = await useVideoDetail(id.value);
        videoDetailInfo.value = await useVideoDetailInfo(id.value);
        const { hotComments, comments, total } = await useVideoComments(
            id.value,
        );
        mvHotComments.value = hotComments;
        mvComments.value = comments;
        totalComments.value = total;
        relatedVideo.value = await useRelatedVideo(id.value);
    } else {
        id.value = Number(route.query.id); // mvid
        mvUrl.value = await useMvUrl(id.value);
        mvDetail.value = await useMvDetail(id.value);
        mvDetailInfo.value = await useMvDetailInfo(id.value);
        const { hotComments, comments, total } = await useMvComments(id.value);
        mvHotComments.value = hotComments;
        mvComments.value = comments;
        totalComments.value = total;
        simiMv.value = await useSimiMv(id.value);
    }
};

// 实现路由自身跳转
watch(
    () => route.params,
    (toParams, previousParams) => {
        // console.log('路由改变了')
        initVideoPage();
    },
);

onMounted(() => {
    initVideoPage();
});

onUnmounted(() => {
    setPlayerShow(0);
});
</script>

<style scoped></style>
