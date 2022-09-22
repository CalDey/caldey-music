<template>
  <div v-loading="loading" class="safe-container">
    <div v-if="mv.length > 0">
      <div class="grid gird-flow-row grid-cols-2 lg:grid-cols-5 gap-5">
        <div
          v-for="(item, index) in mv"
          :key="index"
          @click="router.push({ name: 'mvDetail', query: { id: item.id } })"
        >
          <CoverItem
            :img-url="item.imgurl16v9"
            :play-count="item.playCount"
            show-play-count
            video
          />
          <div class="truncate text-xs mt-2">{{ item.name }}</div>
        </div>
      </div>
      <div v-if="pageData.init" class="py-10">
        <el-button
          type="text"
          :loading="pageData.loading"
          class="w-full"
          @click="loadMore"
          >加载更多</el-button
        >
      </div>
    </div>
    <el-empty description="暂无数据" v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useArtistMv } from "@/utils/api";
import CoverItem from "@/components/common/CoverItem.vue";
// import type { PersonalizedMv } from "@/models/personalized"
const props = defineProps<{
  id: number;
}>();
const router = useRouter();
const loading = ref(true);
const mv = ref<any[]>([]);
const pageData = reactive({
  init: false,
  loading: false,
  noMore: false,
  limit: 15,
  page: 1,
});
const offset = computed(() => {
  return (pageData.page - 1) * pageData.limit;
});

const loadMore = () => {
  pageData.page++;
  getData();
};

const getData = async () => {
  pageData.loading = true;
  try {
    const data = await await useArtistMv(
      props.id,
      pageData.limit,
      offset.value
    );
    if (pageData.page === 1) {
      mv.value = data;
    } else {
      mv.value.push(...data);
    }
    loading.value = false;
    pageData.loading = false;
    pageData.init = true;
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  getData();
});
</script>

<style lang="scss" scoped>
</style>