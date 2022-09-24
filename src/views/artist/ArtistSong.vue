<template>
    <div v-loading="loading">
        <div v-if="hotSongsList.length > 0">
            <div class="flex justify-end mr-4 my-2">
                <el-button type="primary" round @click="playAll">
                    <svg
                        class="w-4 h-4 mr-2"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        data-v-ba633cb8=""
                    >
                        <path
                            fill="currentColor"
                            d="M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848zM896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0V640zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0z"
                        ></path>
                    </svg>
                    播放全部
                </el-button>
            </div>
            <el-table
                stripe
                :data="hotSongsList"
                :header-cell-style="{ background: 'rgba(153,153,153,.1)' }"
                class="w-full mb-20"
            >
                <el-table-column align="center" width="60">
                    <template #default="scope">
                        <div
                            v-if="scope.row.id === id"
                            class="w-full flex justify-center"
                        >
                            <div class="play-icon">
                                <div
                                    class="line"
                                    style="animation-delay: -1.2s !important"
                                ></div>
                                <div class="line"></div>
                                <div
                                    class="line"
                                    style="animation-delay: -1.5s !important"
                                ></div>
                                <div
                                    class="line"
                                    style="animation-delay: -0.9s !important"
                                ></div>
                                <div
                                    class="line"
                                    style="animation-delay: -0.6s !important"
                                ></div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="cursor-pointer hover-icon flex justify-center"
                            @click="play(scope.row.id)"
                        >
                            <span
                                class="hover-icon-1 text-center cursor-pointer"
                                >{{ scope.$index + 1 }}</span
                            >
                            <icon-svg
                                class="w-6 h-6 flex justify-center hover-icon-2"
                                icon-name="#icon-bofang"
                            ></icon-svg>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="歌曲" align="center">
                    <template #default="scope">
                        <div class="flex flex-col justify-start items-center">
                            <el-avatar
                                class="flex-shrink-0"
                                shape="square"
                                :src="scope.row.al.picUrl"
                            ></el-avatar>
                            <span>{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="歌手" align="center">
                    <template #default="scope">
                        {{ scope.row.ar[0].name }}
                    </template>
                </el-table-column>
                <el-table-column label="专辑" align="center">
                    <template #default="scope">
                        {{ scope.row.al.name }}
                    </template>
                </el-table-column>
                <el-table-column label="时长" align="center">
                    <template #default="scope">
                        {{ moment(scope.row.dt).format('mm:ss') }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, reactive } from 'vue';
import { useArtistHotSongs } from '@/utils/api';
import { getCurrentInstance } from 'vue-demi';
import type { Song } from '@/models/song';
import { usePlayerStore } from '@/store/player';
const props = defineProps<{
    id: number;
}>();
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const hotSongsList = ref<Song[]>([]);
const { pushPlayList, play } = usePlayerStore();
const { id } = toRefs(usePlayerStore());

const loading = ref(true);

// 播放全部
const playAll = () => {
    pushPlayList(true, ...hotSongsList.value);
    play(hotSongsList.value[0].id);
};

onMounted(async () => {
    hotSongsList.value = await useArtistHotSongs(props.id);
    loading.value = false;
    console.log(hotSongsList.value);
});
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
        // background-color: #ff410f;
        animation: play 0.9s linear infinite alternate !important;
        @apply bg-blue-400;
    }
}

.hover-icon-2 {
    display: none;
}

.hover-icon:hover .hover-icon-1 {
    display: none;
}
.hover-icon:hover .hover-icon-2 {
    display: block;
}

@keyframes play {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    to {
        -webkit-transform: translateY(85%);
        transform: translateY(85%);
    }
}
</style>
