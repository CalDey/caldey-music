<template>
    <div>
        <el-dialog
            v-model="dialogSearchBox"
            width="80%"
            :before-close="handleClose"
        >
            <el-input
                v-model="keyword"
                placeholder="请输入搜索关键字并按下回车键"
                @keydown.enter="search"
            ></el-input>
            <div class="my-6">
                <span>热门搜索</span>
                <ul class="flex flex-wrap mt-2">
                    <li
                        v-for="(item, index) in hotSearch"
                        :key="index"
                        class="mr-2 bg-gray-200 p-1 my-1 rounded-md cursor-pointer hover:text-white hover:theme-bg-color"
                        @click="gotoSearchPage(item.first)"
                    >
                        {{ item.first }}
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHotSearch } from '@/utils/api';
import { useRouter } from 'vue-router';
import type { HotSearch } from '@/models/search';

defineProps<{
    dialogSearchBox: boolean;
}>();

const hotSearch = ref<any[]>([]);
const router = useRouter();

const keyword = ref<string>('');

const search = () => {
    if (keyword.value !== '') {
        gotoSearchPage(keyword.value as string);
    } else {
        return;
    }
};

const getHotSearchData = async () => {
    if (hotSearch.value.length === 0) {
        const data = await useHotSearch();
        hotSearch.value = data.hots;
    } else {
        return;
    }
    console.log(hotSearch.value);
};

const emit = defineEmits<{
    (e: 'handleClose'): void;
}>();
const handleClose = () => {
    emit('handleClose');
};

const gotoSearchPage = (keyword: string) => {
    handleClose();
    router.push({ name: 'search', query: { keyword: keyword } });
};

onMounted(() => {
    getHotSearchData();
});
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
    padding: 20px 5px !important;
}
</style>
