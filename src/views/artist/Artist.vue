<template>
    <div class="safe-container">
        <!-- 筛选条件 -->
        <div
            v-for="option in options"
            :key="option.key"
            class="flex items-center py-4 overflow-y-auto"
        >
            <div
                v-for="item in option.list"
                :key="item.key"
                class="mr-4 px-1 rounded-md text-sm flex-shrink-0 cursor-pointer"
                :class="
                    (item.key === pageData.type && option.key === 'type') ||
                    (item.key === pageData.area && option.key === 'area') ||
                    (item.key === pageData.initial && option.key === 'initial')
                        ? 'theme-bg-color text-white'
                        : ''
                "
                @click="changeOptions(option.key, item.key)"
            >
                {{ item.name }}
            </div>
        </div>
        <!-- 歌手列表 -->
        <div
            v-if="artist.length > 0"
            class="grid grid-flow-row grid-cols-2 lg:grid-cols-6 cursor-pointer"
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
        <div v-else class="grid grid-flow-row grid-cols-2 lg:grid-cols-6">
            <div v-for="(item, index) in 40" :key="index">
                <el-skeleton animated>
                    <template #template>
                        <el-skeleton-item
                            variant="circle"
                            style="width: 120px; height: 120px"
                        />
                        <el-skeleton class="text-center" :rows="0" />
                    </template>
                </el-skeleton>
            </div>
        </div>
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
import { onMounted, reactive, ref } from 'vue';
import { useArtistList } from '@/utils/api';
import type { Artist } from '@/models/artist';
import { useRouter } from 'vue-router';

const router = useRouter();

const options: {
    name: string;
    key: string;
    list: {
        key: string | number;
        name: string;
    }[];
}[] = [
    {
        name: '语种',
        key: 'area',
        list: [
            { key: -1, name: '全部' },
            { key: 7, name: '华语' },
            { key: 96, name: '欧美' },
            { key: 8, name: '日本' },
            { key: 16, name: '韩国' },
            { key: 0, name: '其他' },
        ],
    },
    {
        name: '分类',
        key: 'type',
        list: [
            { key: -1, name: '全部' },
            { key: 1, name: '男歌手' },
            { key: 2, name: '女歌手' },
            { key: 3, name: '乐队组合' },
        ],
    },
    {
        name: '筛选',
        key: 'initial',
        list: [
            { key: '-1', name: '热门' },
            { key: 'a', name: 'A' },
            { key: 'b', name: 'B' },
            { key: 'c', name: 'C' },
            { key: 'd', name: 'D' },
            { key: 'e', name: 'E' },
            { key: 'f', name: 'F' },
            { key: 'g', name: 'G' },
            { key: 'h', name: 'H' },
            { key: 'i', name: 'I' },
            { key: 'j', name: 'J' },
            { key: 'k', name: 'K' },
            { key: 'l', name: 'L' },
            { key: 'm', name: 'M' },
            { key: 'n', name: 'N' },
            { key: 'o', name: 'O' },
            { key: 'p', name: 'P' },
            { key: 'q', name: 'Q' },
            { key: 'r', name: 'R' },
            { key: 's', name: 'S' },
            { key: 't', name: 'T' },
            { key: 'u', name: 'U' },
            { key: 'v', name: 'V' },
            { key: 'w', name: 'W' },
            { key: 'x', name: 'X' },
            { key: 'y', name: 'Y' },
            { key: 'z', name: 'Z' },
            { key: '0', name: '#' },
        ],
    },
];

const pageData = reactive({
    init: false,
    loading: false,
    page: 1,
    limit: 40,
    initial: '-1',
    type: -1,
    area: -1,
});

const changeOptions = (name: string, value: number | string) => {
    pageData.page = 1;
    if (name === 'type') pageData.type = value as number;
    if (name === 'area') pageData.area = value as number;
    if (name === 'initial') pageData.initial = value as string;
    getData();
};

const artist = ref<Artist[]>([]);

const getData = async () => {
    pageData.loading = true;
    try {
        const data = await useArtistList(pageData);
        if (pageData.page === 1) {
            artist.value = data;
            // console.log(artist.value)
        } else {
            artist.value.push(...data);
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

<style lang="scss" scoped>
::v-deep .el-skeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem 0 !important;
}
</style>
