<template>
    <div class="safe-container">
        <div class="flex items-center">
            <span class="font-bold text-xl mb-4">推荐新音乐</span>
        </div>
        <div v-if="personalizedNewSong.length > 0" class="lg:flex lg:flex-wrap">
            <div v-for="(item, index) in personalizedNewSong" :key="index" class="flex items-center w-full lg:w-1/2 my-2 cursor-pointer hover:bg-slate-100">
                <img class="w-14" :src="item.picUrl">
                <div class="flex flex-col ml-2 text-md">
                    <span>{{item.name}}</span>
                    <span class="text-sm text-slate-400">{{item.song.artists[0].name}}</span>
                </div>
            </div>
        </div>
        <div v-else class="lg:flex lg:flex-wrap">
            <div v-for="(item, index) in 6" :key="index" class="flex items-center w-full lg:w-1/2 my-2">
                <el-skeleton animated>
                    <template #template>
                        <div class="flex">
                            <el-skeleton-item variant="image" style="width: 56px; height: 56px;" class="flex-shrink-0" />
                            <el-skeleton class="ml-2 mr-20" :rows="1" />
                        </div>
                    </template>
                </el-skeleton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { useMusicStore } from "@/store/music";
const { personalizedNewSong } = toRefs(useMusicStore())
const { getPersonalizedNewSong } = useMusicStore()
onMounted(async() => {
    await getPersonalizedNewSong()
})
</script>

<style scoped>

</style>