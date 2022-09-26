<template>
    <div v-if="playerShow && song.name" class="p-2 fixed bottom-0 w-full z-20">
        <div class="relative">
            <el-slider
                v-model="currentTime"
                :show-tooltip="false"
                :min="0"
                :max="duration"
                @change="onSliderChange"
                @input="onSliderInput"
            ></el-slider>
            <div class="flex justify-between items-center z-20">
                <div
                    class="absolute w-full h-full z-20"
                    style="background: rgba(255, 255, 255, 0.8)"
                ></div>
                <div
                    class="flex cursor-pointer"
                    @click="showLyric = !showLyric"
                >
                    <el-image
                        class="w-11 h-11 rounded z-20 flex-shrink-0"
                        :src="song.al?.picUrl"
                    ></el-image>
                    <div class="ml-2 z-20 w-20 md:w-full">
                        <div class="truncate">{{ song.name }}</div>
                        <div class="text-xs text-slate-400 truncate">
                            {{ song.ar[0].name || 'null' }}
                        </div>
                    </div>
                </div>
                <div class="mr-2 flex items-center">
                    <!-- 音乐时长 -->
                    <div v-if="!isMobile" class="mr-2 z-20">
                        <span class="text-md">
                            {{ moment(currentTime * 1000).format('mm:ss') }} /
                            {{ moment(duration * 1000).format('mm:ss') }}
                        </span>
                    </div>
                    <!-- 播放模式 -->
                    <div class="cursor-pointer z-20">
                        <el-tooltip
                            :content="
                                loopType === 0
                                    ? '单曲循环'
                                    : loopType === 1
                                    ? '列表循环'
                                    : '随机播放'
                            "
                            placement="top"
                            trigger="click"
                        >
                            <icon-svg
                                class="w-6 h-6"
                                :icon-name="
                                    loopType === 0
                                        ? '#icon-danquxunhuan'
                                        : loopType === 1
                                        ? '#icon-liebiaoxunhuan'
                                        : '#icon-suijibofang'
                                "
                                @click="toggleLoop"
                            ></icon-svg>
                        </el-tooltip>
                    </div>
                    <!-- 歌词查看 -->
                    <div class="cursor-pointer ml-2 z-20">
                        <icon-svg
                            class="w-6 h-6"
                            icon-name="#icon-geciweidianji"
                            @click="showLyric = !showLyric"
                        ></icon-svg>
                    </div>
                    <!-- 上一首 -->
                    <div class="z-20" @click="prev">
                        <svg
                            class="w-8 cursor-pointer"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ba633cb8=""
                        >
                            <path
                                fill="currentColor"
                                d="M672 192 288 511.936 672 832z"
                            ></path>
                        </svg>
                    </div>
                    <!-- 播放/暂停 -->
                    <div class="z-20" @click="togglePlay">
                        <svg
                            v-if="isPause"
                            class="w-8 cursor-pointer"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ba633cb8=""
                        >
                            <path
                                fill="currentColor"
                                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
                            ></path>
                        </svg>
                        <svg
                            v-else
                            class="w-8 cursor-pointer"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ba633cb8=""
                        >
                            <path
                                fill="currentColor"
                                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
                            ></path>
                        </svg>
                    </div>
                    <!-- 下一首 -->
                    <div class="z-20" @click="next">
                        <svg
                            class="w-8 cursor-pointer"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ba633cb8=""
                        >
                            <path
                                fill="currentColor"
                                d="M384 192v640l384-320.064z"
                            ></path>
                        </svg>
                    </div>
                    <!-- 音量控制 -->
                    <!-- <el-popover v-if="!isMobile" placement="top" width="50px" class="z-20">
                        <template #reference>
                            <svg class="w-6 cursor-pointer" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"></path></svg>
                        </template>
                        <div class="flex flex-col items-center  pt-2">
                            <div>
                                <el-slider vertical height="100px" :show-tooltip="false" v-model="volume" :max="100" :min="0" size="small"
                                        :disabled="muted" @input="setVolume"/>
                            </div>
                            <div class="text-sm mt-3">{{ volume }}</div>
                        </div>
                    </el-popover> -->
                    <!-- 播放列表 -->
                    <div
                        class="cursor-pointer flex items-center z-20"
                        @click="showPlayList = true"
                    >
                        <svg
                            class="w-6"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ba633cb8=""
                        >
                            <path
                                fill="currentColor"
                                d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
                            ></path>
                        </svg>
                        <span class="text-xs">{{ playListCount }}</span>
                    </div>
                    <PlayList />
                    <!-- 歌词模式 -->
                    <Lyric
                        :show-lyric="showLyric"
                        @handle-close="handleClose"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { usePlayerStore } from '@/store/player';
import { getCurrentInstance } from 'vue-demi';
import PlayList from '@/components/common/PlayList.vue';
import Lyric from '@/components/common/Lyric.vue';
import { useIsMobileStore } from '@/store/m_check';
const { isMobile } = toRefs(useIsMobileStore());

const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const {
    song,
    songUrl,
    duration,
    currentTime,
    onSliderInput,
    onSliderChange,
    togglePlay,
    isPause,
    next,
    prev,
    loopType,
    toggleLoop,
    volume,
    muted,
    toggleMuted,
    setVolume,
    playListCount,
    showPlayList,
    playerShow,
} = toRefs(usePlayerStore());

const showLyric = ref<boolean>(false);
const handleClose = () => {
    showLyric.value = false;
};
</script>

<style lang="scss" scoped>
::v-deep .el-slider__runway {
    z-index: 20 !important;
}
</style>
