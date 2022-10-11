<template>
    <div v-if="tags" class="safe-container">
        <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
            <div
                class="tag-container card-radius hover:scale-105"
                :class="
                    clickIndex === -1
                        ? 'bg-skin-bg-hover text-white'
                        : 'bg-slate-200'
                "
                @click="tagClick('全部', -1)"
            >
                全部
            </div>
            <div
                v-for="(tag, index) in tags"
                :key="tag.id"
                class="tag-container card-radius hover:scale-105"
                :class="
                    clickIndex === index
                        ? 'bg-skin-bg-hover text-white'
                        : 'bg-slate-200'
                "
                @click="tagClick(tag.name, index)"
            >
                {{ tag.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { usePlaylistHighqualityTags } from '@/utils/api';
import type { PlaylistHighqualityTag } from '@/models/playlist';

const props = defineProps<{
    selectedTag: string;
}>();

// 通过监听父组件传值实现标签跳转同时tag自动高亮
watch(
    () => props.selectedTag,
    (val: string) => {
        tags.value?.forEach((tag, index) => {
            if (val === tag.name) {
                clickIndex.value = index;
            }
        });
    },
);

const emit = defineEmits<{
    (e: 'changeTag', tag: string, index: number): void;
}>();

const tags = ref<PlaylistHighqualityTag[]>();
const clickIndex = ref<number>(-1);

const tagClick = (tag: string, index: number) => {
    clickIndex.value = index;
    // console.log(clickIndex.value);
    emit('changeTag', tag, index);
};

onMounted(async () => {
    tags.value = await usePlaylistHighqualityTags();
});
</script>

<style lang="scss" scoped>
.tag-container {
    @apply flex justify-center py-2 cursor-pointer;
}
</style>
