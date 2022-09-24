<template>
    <div v-loading="loading">
        <div v-if="artist.length > 1">
            <div
                class="grid grid-flow-row grid-cols-2 lg:grid-cols-5 cursor-pointer"
            >
                <div
                    v-for="item in artist"
                    :key="item.id"
                    class="flex flex-col items-center mt-8 hover:scale-105"
                    @click="
                        router.push({
                            name: 'artistDetail',
                            query: { id: item.id },
                        })
                    "
                >
                    <el-image
                        class="rounded-full flex-shrink-0"
                        :src="item.img1v1Url + '?param=120y120'"
                    ></el-image>
                    <span class="my-2">{{ item.name }}</span>
                </div>
            </div>
            <div v-if="pageData.init" class="pt-10 pb-20">
                <el-button
                    type="text"
                    :loading="pageData.loading"
                    class="w-full"
                    @click="loadMore(100)"
                    >加载更多</el-button
                >
            </div>
        </div>
        <div v-else-if="artist.length === 1">
            <div
                class="grid grid-flow-row grid-cols-1 lg:grid-cols-1 cursor-pointer"
            >
                <div
                    v-for="item in artist"
                    :key="item.id"
                    class="flex flex-col items-center mt-8 hover:scale-105"
                    @click="
                        router.push({
                            name: 'artistDetail',
                            query: { id: item.id },
                        })
                    "
                >
                    <el-image
                        class="rounded-full flex-shrink-0"
                        :src="item.img1v1Url + '?param=120y120'"
                    >
                        <template #placeholder>
                            <el-skeleton animated>
                                <template #template>
                                    <el-skeleton-item
                                        variant="circle"
                                        style="width: 120px; height: 120px"
                                    />
                                </template>
                            </el-skeleton>
                        </template>
                    </el-image>
                    <span class="my-2">{{ item.name }}</span>
                </div>
            </div>
            <!-- <div v-if="pageData.init" class="pt-10 pb-20">
                <el-button type="text" :loading="pageData.loading" class="w-full" @click="loadMore(100)">加载更多</el-button>
            </div> -->
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const props = defineProps<{
    artist: any;
    loading: boolean;
    pageData: any;
}>();
const router = useRouter();
const emit = defineEmits(['loadMore']);
const loadMore = (type: number) => {
    emit('loadMore', type);
};
</script>
