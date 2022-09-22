<template>
  <div class="w-full bg-gray-400">
    <div class="flex flex-col items-center py-10">
      <!-- 歌手头像 -->
      <el-image
        class="flex-shrink-0 w-40 h-40 rounded-full border-white border-4"
        :src="artistDetail.artist.cover"
      ></el-image>
      <!-- 歌手名称 -->
      <div class="mt-4 text-2xl text-white">{{ artistDetail.artist.name }}</div>
      <!-- 关注按钮 -->
      <div class="mt-4">
        <el-button round>关注 TA</el-button>
      </div>
      <!-- 歌手简介 -->
      <div class="mt-4 w-2/3 h-48 overflow-clip overflow-y-auto text-gray-200">
        {{ artistDetail.artist.briefDesc }}
      </div>
      <!-- 单曲/专辑/MV -->
      <div class="mt-8 w-2/3 flex justify-center">
        <div class="flex flex-col items-center flex-1">
          <span class="text-2xl text-white">{{
            artistDetail.artist.musicSize
          }}</span>
          <div class="text-sm text-gray-200">单曲数</div>
        </div>
        <div class="flex flex-col items-center flex-1">
          <span class="text-2xl text-white">{{
            artistDetail.artist.albumSize
          }}</span>
          <div class="text-sm text-gray-200">专辑数</div>
        </div>
        <div class="flex flex-col items-center flex-1">
          <span class="text-2xl text-white">{{
            artistDetail.artist.mvSize
          }}</span>
          <div class="text-sm text-gray-200">MV数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArtistDetail } from "@/models/artist_detail";
defineProps<{
  artistDetail: ArtistDetail;
}>();
</script>

<style scoped>
</style>