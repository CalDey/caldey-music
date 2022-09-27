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
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { usePlayerStore } from '@/store/player';
import { useRouter } from 'vue-router';
import NLyric from '@/components/common/NLyric.vue';
const { song, isPause } = toRefs(usePlayerStore());
const props = defineProps<{
    showLyric: boolean;
}>();
const emit = defineEmits<{
    (e: 'handleClose'): void;
}>();
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

// const handleSingerName = (name: any) => {
//     let singer: any = [];
//     name.forEach((i: any) => {
//         singer.push(i.name);
//     });
//     singer = singer.join('/');
//     return singer;
// };
</script>

<style lang="scss" scoped>
.cd_bg {
    background: url('../../../src/assets/image/cd.png');
    background-size: 100% 100%;
    /* width: 20rem;
    height: 20rem; */
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

<style lang="scss">
// .lyric-drawer .el-drawer__header {  // 通过最外层父类重写el-drawer样式
//     background: rgba(255, 255, 255, 0.8);
//     margin-bottom: 0px!important;
// }
</style>
