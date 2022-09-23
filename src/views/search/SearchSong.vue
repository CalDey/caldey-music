<template>
    <div v-loading="loading">
        <div v-if="songs.length > 0">
            <el-table
                :data="songs"
                :header-cell-style="{ background: 'rgba(153,153,153,.1)' }"
                class="w-full"
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
                            <!-- <el-avatar class="flex-shrink-0" shape="square" :src="scope.row.artists[0].img1v1Url"></el-avatar> -->
                            <span>{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="歌手" align="center">
                    <template #default="scope">
                        {{ mergeArtists(scope.row.ar) }}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="专辑" align="center">
                    <template #default="scope">
                        {{scope.row.album.name}}
                    </template>
                </el-table-column> -->
                <el-table-column label="时长" align="center">
                    <template #default="scope">
                        {{ moment(scope.row.dt).format('mm:ss') }}
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="pageData.init" class="pt-10 pb-20">
                <el-button
                    type="text"
                    :loading="pageData.loading"
                    class="w-full"
                    @click="loadMore(1)"
                    >加载更多</el-button
                >
            </div>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import { getCurrentInstance } from 'vue-demi';
import { usePlayerStore } from '@/store/player';
const { play } = usePlayerStore();
const { id } = toRefs(usePlayerStore());
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const props = defineProps<{
    songs: any;
    loading: boolean;
    pageData: any;
}>();
const emit = defineEmits(['loadMore']);
const loadMore = (type: number) => {
    emit('loadMore', type);
};
const mergeArtists = (artists:any) => {
    if (artists.length <= 1) {
        return artists[0].name;
    } else {
        let arr:Array<string> = [];
        artists.forEach((item:any) => {
            arr.push(item.name);
        });
        return arr.join('/');
    }
};
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
