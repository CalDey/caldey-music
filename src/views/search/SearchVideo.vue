<template>
    <div v-loading="loading">
        <div v-if="video.length > 0">
            <div class="grid gird-flow-row grid-cols-2 lg:grid-cols-5 gap-5">
                <div
                    v-for="(item, index) in video"
                    :key="index"
                    @click="
                        router.push({
                            name: 'mvDetail',
                            query: { id: item.vid, video: (isNaN(Number(item.vid))).toString() },
                        })
                    "
                >
                    <CoverItem
                        :img-url="item.coverUrl"
                        :play-count="item.playTime"
                        show-play-count
                        video
                    />
                    <div class="truncate text-xs mt-2">{{ item.title }}</div>
                </div>
            </div>
            <div v-if="pageData.init" class="py-20">
                <el-button
                    type="text"
                    :loading="pageData.loading"
                    class="w-full"
                    @click="loadMore(1014)"
                    >加载更多</el-button
                >
            </div>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>

<script setup lang="ts">
import {} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
    video: any;
    loading: boolean;
    pageData: any;
}>();
const emit = defineEmits(['loadMore']);
const loadMore = (type: number) => {
    emit('loadMore', type);
};

// const isVideo = (item:string) => {
//     // Number(item.vid) === NaN ? 123 : ABC
//     return isNaN(Number(item))
// }
</script>

<style lang="scss" scoped></style>
