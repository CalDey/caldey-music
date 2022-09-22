<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          variant="image"
          class="w-screen flex justify-center"
          :style="{ height: carouselHeight }"
        />
      </template>
      <template #default>
        <el-carousel
          class="w-screen"
          v-if="!isMobile"
          type="card"
          trigger="click"
        >
          <el-carousel-item v-for="item in banners" :key="item.bannerId">
            <el-image class="card-radius" :src="item.pic" />
          </el-carousel-item>
        </el-carousel>
        <el-carousel
          v-else
          class="w-screen"
          :height="carouselHeight"
          indicator-position="none"
        >
          <el-carousel-item v-for="item in banners" :key="item.bannerId">
            <img :src="item.pic" />
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, ref } from "vue";
import type { Banner } from "@/models/banner";
import { useCommonStore } from "@/store/common";
import { useIsMobileStore } from "@/store/m_check";
const { banners } = toRefs(useCommonStore());
const { getBanners } = useCommonStore();

const { isMobile, carouselHeight } = toRefs(useIsMobileStore());

const loading = ref<boolean>(true);

onMounted(async () => {
  await getBanners();
  loading.value = false;
});
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__button {
  @apply w-3 h-3 rounded-full bg-slate-400;
}
::v-deep .el-carousel__item--card {
  display: flex;
}
</style>