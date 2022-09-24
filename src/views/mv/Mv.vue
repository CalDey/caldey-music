<template>
    <div class="safe-container">
        <!-- 筛选条件 -->
        <div
            v-for="option in options"
            :key="option.name"
            class="flex items-center py-4 overflow-y-auto"
        >
            <div
                v-for="(item, index) in option.list"
                :key="index"
                class="mr-4 px-1 rounded-md text-sm flex-shrink-0 cursor-pointer"
                :class="
                    (item === pageData.area && option.name === 'area') ||
                    (item === pageData.type && option.name === 'type') ||
                    (item === pageData.order && option.name === 'order')
                        ? 'theme-bg-color text-white'
                        : ''
                "
                @click="changeOptions(option.name, item)"
            >
                {{ item }}
            </div>
        </div>
        <!-- mv列表 -->
        <div
            v-if="mv.length > 0"
            class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 cursor-pointer"
        >
            <div
                v-for="item in mv"
                :key="item.id"
                class="flex-shrink-0 p-2 hover:scale-105"
            >
                <CoverItem
                    :img-url="item.cover"
                    :play-count="item.playCount"
                    show-play-count
                    video
                    class="mb-4"
                    @click="
                        router.push({
                            name: 'mvDetail',
                            query: { id: item.id },
                        })
                    "
                />
                <div class="truncate text-sm">{{ item.name }}</div>
            </div>
        </div>
        <div v-else class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="(item, index) in 12" :key="index">
                <el-skeleton animated>
                    <template #template>
                        <div v-if="isMobile">
                            <div class="flex flex-col">
                                <el-skeleton-item
                                    variant="image"
                                    style="width: 42vw; height: 25vh"
                                />
                                <el-skeleton class="my-4" :rows="0" />
                            </div>
                        </div>
                        <div v-else>
                            <div class="flex flex-col">
                                <el-skeleton-item
                                    variant="image"
                                    style="width: 22vw; height: 25vh"
                                />
                                <el-skeleton class="my-4" :rows="0" />
                            </div>
                        </div>
                    </template>
                </el-skeleton>
            </div>
        </div>
        <!-- 加载更多 -->
        <div class="py-20">
            <el-button
                type="text"
                :loading="pageData.loading"
                class="w-full"
                @click="loadMore"
                >加载更多</el-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useMvList } from '@/utils/api';
import { Mv } from '@/models/mv';
import CoverItem from '@/components/common/CoverItem.vue';
import { useRouter } from 'vue-router';
import { useIsMobileStore } from '@/store/m_check';
const { isMobile } = toRefs(useIsMobileStore());

const router = useRouter();
const mv = ref<Mv[]>([]);

const options: {
    name: string;
    list: {}[];
}[] = [
    {
        name: 'area',
        list: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
    },
    {
        name: 'type',
        list: ['全部', '官方版', '原生', '现场版', '网易出品'],
    },
    {
        name: 'order',
        list: ['上升最快', '最热', '最新'],
    },
];

const pageData = reactive({
    init: false,
    loading: false,
    page: 1,
    limit: 12,
    area: '全部',
    type: '全部',
    order: '上升最快',
});

const changeOptions = (name: string, val: any) => {
    pageData.page = 1;
    if (name === 'area') pageData.area = val;
    if (name === 'type') pageData.type = val;
    if (name === 'order') pageData.order = val;
    // console.log(name, val)
    getData();
};

const getData = async () => {
    pageData.loading = true;
    try {
        const data = await useMvList(pageData);
        if (pageData.page === 1) {
            mv.value = data;
        } else {
            mv.value.push(...data);
        }
        pageData.init = true;
        pageData.loading = false;
    } catch (e) {
        console.log(e);
    }
};

const loadMore = () => {
    pageData.page++;
    getData();
};

onMounted(() => {
    getData();
});
</script>

<style lang="scss" scoped></style>
