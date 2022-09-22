<template>
  <RouterView />
</template>

<script setup lang="ts">
import { toRefs, watch } from "vue";
import { useMenu } from "@/components/layout/header/useMenu";
import { userCheckMobile } from "@/store/m_check";
import { userPlayerInit } from "@/store/player";
import { useRoute } from "vue-router";
import { useCurIdxStore } from "@/store/cur_idx";
// 初始化移动端检测
userCheckMobile();
// 初始化播放器
userPlayerInit();
// 处理刷新导致头部菜单激活索引错误bug
const { menus } = useMenu();
const route = useRoute();
const { curIdx } = toRefs(useCurIdxStore());
watch(
  () => route.name,
  (val) => {
    menus.forEach((item, index) => {
      if (item.key === val) {
        // console.log(val);
        curIdx.value = index;
      }
    });
  }
);
</script>

<style scoped>
</style>
