<template>
  <div class="flex flex-col items-center lg:flex-row w-full">
    <el-image
      :src="playlist.picUrl"
      lazy
      class="w-44 h-44 object-cover rounded-xl flex-shrink-0"
    ></el-image>
    <div class="px-4 flex flex-col items-center lg:items-baseline">
      <span class="mt-4 lg:mt-0 text-2xl text-center font-bold">{{
        playlist.name
      }}</span>
      <div class="mt-2 flex items-center text-xs text-slate-600">
        <el-avatar
          :src="playlist.artist.img1v1Url"
          size="small"
          round
          class="flex-shrink-0"
        />
        <span class="ml-2">{{ playlist.artist.name }}</span>
        <span class="ml-2">{{ createTime }}创建</span>
      </div>
      <span class="mt-2 text-center lg:text-left w-80 truncate">{{
        playlist.description
      }}</span>
      <div class="mt-2">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// import type { PlayListDetail } from "@/models/playlist";
import { getCurrentInstance } from "vue-demi";

const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const createTime = ref<string>();

defineProps<{
  playlist: any;
  playAll?: () => void;
}>();

onMounted(() => {
  createTime.value = moment().format("LL");
});
</script>

<style scoped>
</style>