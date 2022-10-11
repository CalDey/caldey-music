<template>
    <div class="safe-container text-skin-text">
        <div class="flex items-center">
            <span class="font-bold text-xl mb-4">推荐歌单</span>
        </div>
        <div
            v-if="personalized.length > 0"
            class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5"
        >
            <div
                v-for="(item, index) in personalized"
                :key="index"
                class="hover:scale-105"
                @click="
                    router.push({
                        name: 'PlaylistDetail',
                        query: { id: item.id },
                    })
                "
            >
                <CoverItem
                    :img-url="item.picUrl"
                    :play-count="item.playCount"
                    show-play-count
                />
                <div class="truncate text-xs mt-2">{{ item.name }}</div>
            </div>
        </div>
        <div v-else class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="(item, index) in 8" :key="index">
                <el-skeleton animated>
                    <template #template>
                        <div v-if="isMobile">
                            <el-skeleton-item
                                variant="image"
                                style="width: 40vw; height: 40vw"
                            />
                            <el-skeleton class="mt-2" :rows="0" />
                        </div>
                        <div v-else>
                            <el-skeleton-item
                                variant="image"
                                style="width: 20vw; height: 20vw"
                            />
                            <el-skeleton class="mt-2" :rows="0" />
                        </div>
                    </template>
                </el-skeleton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, toRefs } from 'vue';
import CoverItem from '@/components/common/CoverItem.vue';
import { useMusicStore } from '@/store/music';
import { useIsMobileStore } from '@/store/m_check';
const { isMobile } = toRefs(useIsMobileStore());
const { personalized } = toRefs(useMusicStore());
const { getPersonalized } = useMusicStore();

const router = useRouter();

onMounted(async () => {
    await getPersonalized();
});
</script>

<style lang="scss" scoped></style>
