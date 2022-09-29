<template>
    <div class="lyric-drawer">
        <el-drawer
            v-model="showLyric"
            direction="btt"
            size="100%"
            z-index="10"
            :with-header="false"
        >
            <el-button
                type="normal"
                class="fixed right-8 lg:right-6 z-20 opacity-70"
                @click="handleClose"
            >
                <icon-svg
                    class="w-4 h-4 flex justify-center"
                    icon-name="#icon-suoxiao"
                ></icon-svg>
            </el-button>
            <div
                class="flex items-center lg:items-start flex-col lg:flex-row safe-container"
            >
                <div
                    class="flex justify-center cd_bg w-80 lg:w-112 h-80 lg:h-112 relative"
                >
                    <!-- <el-image src="../../../src/assets/image/cd.png"></el-image> -->
                    <div
                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style="border-radius: 50%"
                    >
                        <el-image
                            style="border-radius: 50%"
                            :class="
                                isPause
                                    ? 'animate-spin-slow play_paused'
                                    : 'animate-spin-slow play_run'
                            "
                            :src="song.al.picUrl"
                        ></el-image>
                    </div>
                </div>
                <div
                    class="flex-1 text-center lg:text-left mt-8 ml-0 lg:mt-0 lg:ml-10"
                >
                    <span class="text-2xl">{{ song.name }}</span>
                    <div class="mt-2 text-slate-400">
                        <!-- <span
                            >{{ handleSingerName(song.ar) }} -
                            {{ song.al.name }}
                        </span> -->
                        <span>
                            <span
                                v-if="song.ar.length <= 1"
                                class="hover:theme-text-color cursor-pointer"
                                @click="gotoSingerPage(song.ar[0].id)"
                                >{{ song.ar[0].name }}</span
                            >
                            <template v-else>
                                <span
                                    v-for="(item, index) in song.ar"
                                    :key="index"
                                >
                                    <span v-if="index !== 0">/</span>
                                    <span
                                        class="hover:theme-text-color cursor-pointer"
                                        @click="gotoSingerPage(item.id)"
                                        >{{ item.name }}</span
                                    >
                                </span>
                            </template>
                            -
                            <span
                                class="hover:theme-text-color cursor-pointer"
                                @click="gotoAlbumPage(song.al.id)"
                                >{{ song.al.name }}</span
                            >
                        </span>
                    </div>
                    <NLyric :id="song.id" />
                </div>
            </div>
            <!-- 评论 -->
            <div class="mt-10 mb-20">
                <div class="border-b-2 border-b-blue-300">
                    <span class="text-2xl">评论</span>
                    <span class="ml-2">共{{ totalComments }}评论</span>
                </div>
                <!-- 精彩评论 -->
                <div v-if="hotCommentsData.length > 0">
                    <div class="border-l-4 theme-border-color pl-2 my-6">
                        精彩评论
                    </div>
                    <div
                        v-for="item in hotCommentsData"
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
                            <div
                                class="text-xs p-2 mt-2 bg-slate-100 card-radius"
                            >
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
                <!-- 最新评论 -->
                <div v-if="commentsData.length > 0">
                    <div class="border-l-4 theme-border-color pl-2 my-6">
                        最新评论({{ totalComments }})
                    </div>
                    <div
                        v-for="item in commentsData"
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
                            <div
                                class="text-xs p-2 mt-2 bg-slate-100 card-radius"
                            >
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
                    <div v-if="pageData.init" class="safe-container">
                        <div class="py-5 mb-20">
                            <el-button
                                type="text"
                                :loading="pageData.loading"
                                class="w-full"
                                @click="getComments"
                                >加载更多</el-button
                            >
                        </div>
                    </div>
                </div>
                <div v-else class="text-sm mt-2 text-slate-400">暂无评论</div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { toRefs, ref, reactive, computed, onMounted, watch } from 'vue';
import { usePlayerStore } from '@/store/player';
import { useRouter } from 'vue-router';
import NLyric from '@/components/common/NLyric.vue';
import { useMusicComments } from '@/utils/api';
import type { PlaylistHotComments } from '@/models/playlist';
import { getCurrentInstance } from 'vue-demi';
import { ElMessage } from 'element-plus';
import { scrollIntoView } from 'element-plus/lib/utils';
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const { song, isPause } = toRefs(usePlayerStore());
const props = defineProps<{
    showLyric: boolean;
}>();

const emit = defineEmits<{
    (e: 'handleClose'): void;
}>();
const totalComments = ref<number>(0);
const hotCommentsData = ref<PlaylistHotComments[]>([]);
const commentsData = ref<PlaylistHotComments[]>([]);
const pageData = reactive({
    init: false,
    loading: false,
    more: true,
    limit: 20,
    before: 0,
    page: 1,
});

const offset = computed(() => {
    return (pageData.page - 1) * pageData.limit;
});

const handleClose = () => {
    emit('handleClose');
};

const router = useRouter();
// 点击歌手跳转歌手详情页
const gotoSingerPage = (id: number) => {
    handleClose();
    router.push({ name: 'artistDetail', query: { id: id } });
};
// 点击专辑跳转专辑详情页
const gotoAlbumPage = (id: number) => {
    handleClose();
    router.push({ name: 'album', query: { id: id } });
};

watch(song, (val) => {
    rePage();
    getComments();
});

const rePage = () => {
    console.log('change');
    pageData.more = true;
    pageData.before = 0;
    hotCommentsData.value = [];
    commentsData.value = [];
};

const getComments = async () => {
    if (pageData.more === false) {
        ElMessage.warning({
            message: '没有更多了',
        });
    } else {
        pageData.loading = true;
        const { hotComments, comments, total, more } = await useMusicComments(
            song.value.id,
            pageData.limit,
            pageData.before,
            offset.value,
        );
        totalComments.value = total;
        if (hotComments && hotCommentsData.value.length <= 0) {
            hotCommentsData.value = hotComments;
        }
        // if(hotCommentsData.value.length <= 0) {
        //     hotCommentsData.value = hotComments
        // }
        if (pageData.before <= 0) {
            commentsData.value = comments;
        } else {
            commentsData.value.push(...comments);
        }
        pageData.init = true;
        pageData.loading = false;
        // console.log(comments[19].time)
        if (comments.length < 20) {
            pageData.more = false;
        } else {
            pageData.before = comments[19].time;
        }
    }
};

onMounted(() => {
    getComments();
});
</script>

<style lang="scss" scoped>
.cd_bg {
    background: url('../../../src/assets/image/cd.png');
    background-size: 100% 100%;
}
/* 暂停旋转动画 */
.play_paused {
    animation-play-state: paused;
}
/* 执行旋转动画 */
.play_run {
    animation-play-state: running;
}
</style>

<style lang="scss"></style>
