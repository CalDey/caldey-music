<template>
    <div class="flex flex-col items-center lg:flex-row w-full">
        <el-image
            :src="playlist.coverImgUrl"
            lazy
            class="w-44 h-44 object-cover rounded-xl flex-shrink-0"
        ></el-image>
        <div class="px-4 flex flex-col items-center lg:items-baseline">
            <span class="mt-4 lg:mt-0 text-2xl text-center font-bold">{{
                playlist.name
            }}</span>
            <div class="mt-2 flex items-center text-xs text-slate-600">
                <el-avatar
                    :src="playlist.creator.avatarUrl"
                    size="small"
                    round
                    class="flex-shrink-0"
                />
                <span class="ml-2">{{ playlist.creator.nickname }}</span>
                <span class="ml-2">{{ createTime }}创建</span>
            </div>
            <div class="mt-2">
                标签:
                <el-tag
                    v-for="(item, index) in playlist.tags"
                    :key="index"
                    class="mx-1 cursor-pointer"
                    @click="
                        router.push({
                            name: 'Playlist',
                            params: { tag: item },
                        })
                    "
                    >{{ item }}</el-tag
                >
            </div>
            <span
                class="mt-2 text-center lg:text-left w-80 truncate cursor-pointer select-none"
                @click="showDesc(playlist.description)"
                >{{ playlist.description }}</span
            >
            <div class="mt-2">
                <el-button type="primary" round @click="playAll">
                    <svg
                        class="w-4 h-4 mr-2"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        data-v-ba633cb8=""
                    >
                        <path
                            fill="currentColor"
                            d="M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848zM896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0V640zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0z"
                        ></path>
                    </svg>
                    播放全部
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { PlayListDetail } from '@/models/playlist';
import { getCurrentInstance } from 'vue-demi';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';

const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;
const createTime = ref<string>();

defineProps<{
    playlist: PlayListDetail;
    playAll?: () => void;
}>();

const router = useRouter();

const showDesc = (data: string) => {
    ElMessageBox.alert(data, ' ', {
        type: 'info',
        center: true,
        showConfirmButton: false,
        showClose: false,
        closeOnClickModal: true,
        customClass: 'desc_box'
    });
};

onMounted(() => {
    createTime.value = moment().format('LL');
});
</script>

<style>
.desc_box {
    width:60vw;
    max-height:50vh;
    overflow-y:auto;
}
</style>
