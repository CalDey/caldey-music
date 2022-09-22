<template>
  <div class="mb-20">
    <div class="safe-container">
      <!-- 官方榜 -->
      <div class="flex items-center">
        <span class="font-bold text-xl mb-4">官方榜</span>
      </div>
      <div
        v-if="topListDetailData.length > 0"
        class="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5"
      >
        <div
          v-for="item in topListDetailData.slice(0, 4)"
          :key="item.id"
          class="bg-slate-100 card-radius flex"
        >
          <CoverItem
            :img-url="item.coverImgUrl"
            :play-count="item.playCount"
            show-play-count
            class="w-36 flex-shrink-0"
            @click="
              router.push({ name: 'PlaylistDetail', query: { id: item.id } })
            "
          />
          <div class="flex flex-col m-4">
            <div class="text-xl font-bold">{{ item.name }}</div>
            <div class="text-sm my-2">
              <div v-for="(track, index) in item.tracks" :key="index">
                <div class="flex my-1">
                  <span class="w-4 mr-2">{{ index + 1 }}</span>
                  <div class="truncate" style="width: 30vw">
                    {{ track.first }} - {{ track.second }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
        <div v-for="(item, index) in 4" :key="index">
          <el-skeleton animated>
            <template #template>
              <div class="flex">
                <el-skeleton-item
                  variant="image"
                  style="width: 144px; height: 144px"
                  class="flex-shrink-0"
                />
                <el-skeleton class="mt-2 ml-4" :rows="3" />
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>
    <!-- 特色榜 -->
    <div class="safe-container">
      <div class="flex items-center">
        <span class="font-bold text-xl mb-4">特色榜</span>
      </div>
      <div
        v-if="topListDetailData.length > 0"
        class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <div v-for="item in topListDetailData.slice(4)" :key="item.id">
          <CoverItem
            :img-url="item.coverImgUrl"
            @click="
              router.push({ name: 'PlaylistDetail', query: { id: item.id } })
            "
          />
          <div class="text-xs mt-2 truncate">{{ item.name }}</div>
        </div>
      </div>
      <div v-else class="grid grid-flow-row grid-cols-4 gap-5">
        <div v-for="(item, index) in 32" :key="index">
          <el-skeleton animated>
            <template #template>
              <el-skeleton-item
                variant="image"
                style="width: 20vw; height: 20vw"
              />
              <el-skeleton class="mt-2" :rows="0" />
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, toRefs } from "vue";
import { useMusicStore } from "@/store/music";
import type { TopListDetail } from "@/models/toplist_detail";
import CoverItem from "@/components/common/CoverItem.vue";

const { topListDetailData } = toRefs(useMusicStore());
const { getTopListDetailData } = useMusicStore();
const router = useRouter();

onMounted(async () => {
  await getTopListDetailData();
});
</script>

<style scoped>
</style>