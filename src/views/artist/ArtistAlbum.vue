<template>
    <div v-loading="loading" class="safe-container">
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
                    @click="loadMore"
                    >加载更多</el-button
                >
            </div>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useArtistAlbum } from '@/utils/api';
import { getCurrentInstance } from 'vue-demi';
import type { Album } from '@/models/album';
import CoverItem from '@/components/common/CoverItem.vue';
import { useRouter } from 'vue-router';
const props = defineProps<{
    id: number;
}>();
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const album = ref<Album[]>([]);
const router = useRouter();
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

const loading = ref(true);

const loadMore = () => {
    pageData.page++;
    getData();
};

const getData = async () => {
    pageData.loading = true;
    try {
        const data = await useArtistAlbum(
            props.id,
            pageData.limit,
            offset.value,
        );
        if (pageData.page === 1) {
            album.value = data;
        } else {
            album.value.push(...data);
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
    // album.value = await useArtistAlbum(props.id, pageData.limit, offset.value)
    // console.log(album.value)
});
</script>

<style lang="scss"></style>
