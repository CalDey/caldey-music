<template>
    <div class="cover" :class="{ 'aspect-square': !video, 'aspect-video': video }">
        <div class="mask card-radius"></div>
        <el-image class="card-radius shadow-xl w-full h-full" :src="imgUrl" lazy />
        <span v-if="showPlayCount" class="play-count">
            <svg class="w-4 h-4 text-white mx-1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848zM896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0V640zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0z"></path></svg>
            <span>{{useNumberFormat(playCount || 0)}}</span>
        </span>
         <!-- <svg v-if="video" class="play-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg> -->
         <icon-svg class="play-icon" v-if="video" icon-name="#icon-bofang1"></icon-svg>
    </div>
</template>

<script setup lang="ts">
import { useNumberFormat } from "@/utils/number";
defineProps<{
    imgUrl: string,
    playCount?: number,
    showPlayCount?: boolean,
    video?: boolean,
}>()
</script>

<style lang="scss" scoped>
.cover {
    @apply relative overflow-hidden cursor-pointer;
    .mask {
    @apply absolute w-full h-full bg-black opacity-0 z-10;
    }
    .play-count {
        @apply absolute bottom-0 right-0 bg-black opacity-50 rounded-xl m-1 p-1 text-white text-sm z-0 hidden lg:flex items-center;
    }
    .play-icon {
        @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-0;
    }
    &:hover {
        .mask {
            @apply opacity-50;
        }
        .play-icon {
            @apply opacity-100 z-20;
        }
    }
}
</style>