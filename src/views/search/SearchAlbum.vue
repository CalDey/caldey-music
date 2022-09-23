<template>
    <div v-loading="loading">
        <div v-if="album.length > 0">
            <div class="grid gird-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
                <div v-for="(item, index) in album" :key="index">
                    <CoverItem
                        :img-url="item.picUrl"
                        @click="
                            router.push({
                                name: 'album',
                                query: { id: item.id },
                            })
                        "
                    />
                    <div class="mt-2 text-xs truncate">{{ item.name }}</div>
                    <div class="mt-1 text-xs text-slate-400 truncate">
                        {{ moment(item.publishTime).format('YYYY-MM-DD') }}
                    </div>
                </div>
            </div>
            <div v-if="pageData.init" class="py-10">
                <el-button
                    type="text"
                    :loading="pageData.loading"
                    class="w-full"
                    @click="loadMore(10)"
                    >加载更多</el-button
                >
            </div>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue-demi';
import { useRouter } from 'vue-router';
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const props = defineProps<{
    album: any;
    loading: boolean;
    pageData: any;
}>();
const router = useRouter();
const emit = defineEmits(['loadMore']);
const loadMore = (type: number) => {
    emit('loadMore', type);
};
</script>

<style lang="scss" scoped></style>
