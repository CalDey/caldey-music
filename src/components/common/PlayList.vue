<template>
    <el-drawer v-model="showPlayList" title="播放列表" size="320px">
        <div v-for="(song, index) in playList" :key="song.id">
            <div class="flex my-2 items-center cursor-pointer">
                <div v-if="song.id === id" class="flex justify-center mr-4">
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
                    class="flex justify-center mr-4 hover-icon"
                    @click="play(song.id)"
                >
                    <span class="hover-icon-1 text-center">{{ index }}</span>
                    <icon-svg
                        class="w-6 h-6 flex justify-center hover-icon-2"
                        icon-name="#icon-bofang"
                    >
                    </icon-svg>
                </div>
                <div class="truncate">{{ song.name }}</div>
                <svg
                    class="w-4 h-4 ml-2 flex-shrink-0 hover:text-red-500"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    data-v-029747aa=""
                    @click="deleteSong(song.id)"
                >
                    <path
                        fill="currentColor"
                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                    ></path>
                </svg>
            </div>
        </div>
        <div class="border-t-2"></div>
        <div
            class="flex items-center mt-2 cursor-pointer select-none hover:text-red-500"
            @click="clearPlayList"
        >
            <svg
                class="w-4 h-4 mr-2"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-029747aa=""
            >
                <path
                    fill="currentColor"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                ></path>
            </svg>
            <span>清空全部</span>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/store/player';

const { showPlayList, playListCount, playList, id } = storeToRefs(
    usePlayerStore(),
);
const { play, clearPlayList, deleteSong } = usePlayerStore();
</script>

<style lang="scss" scoped>
.hover-icon-2 {
    display: none;
}
.hover-icon:hover .hover-icon-1 {
    display: none;
}
.hover-icon:hover .hover-icon-2 {
    display: block;
}
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
