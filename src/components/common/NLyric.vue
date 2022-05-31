<template>
    <div class="mt-4 p-4 w-full h-full lg:h-80 mb-14 lg:mb-0 bg-slate-100 lg:overflow-y-scroll" style="white-space: pre-wrap;">
        <div ref="lyricList">
            <!-- {{lyricData.lyric}} -->
            <div v-if="currentLyric" class="mx-4">
                <p ref="lyricRef" class="my-4 text-xs" :class="currentLyricNum === index ? 'text-red-300' : ''" v-for="(item, index) in currentLyric.lines" :key="index">
                    {{item.txt}}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import { onMounted, ref, nextTick, watch } from 'vue'
import { useLyric } from "@/utils/api"
import { Lyric } from '@/models/lyric'
import LyricParser from 'lyric-parser'
import { usePlayerStore } from "@/store/player";
const { isPause, currentTime, id } = storeToRefs(usePlayerStore())
const { getLyric, saveLyric } = usePlayerStore()

// const props = defineProps<{
//     id: number
// }>()

const lyricRef = ref<any>(null)
const lyricList = ref<any>(null)
const currentLyric = ref<any>(null) // 解析后歌词数据
const currentLyricNum = ref<number>(0)  // 当前歌词行
const playingLyric = ref<string>('')  // 当前歌词

watch(() => isPause.value, (val) => {
    if(val) {
        console.log('stop')
        currentLyric.value.togglePlay()
    }else{
        console.log('play')
        currentLyric.value.togglePlay()
    }
})

watch(() => id.value, (newVal, oldVal) => {
    if(newVal !== oldVal) {
        console.log('切换歌曲')
        currentLyric.value.stop()
        currentLyric.value = null
        currentTime.value = 0
        currentLyricNum.value = 0
        playingLyric.value = ''
        nextTick(() => {
            lyricList.value.scrollIntoView()
            getLyric(newVal).then((res:any) => {
                // 生成歌词
                currentLyric.value = new LyricParser(res, handler)
                saveLyric(currentLyric.value)
                currentLyric.value.seek(currentTime.value * 1000)
            })
        })
    }
})

// 歌词回调
const handler = ({lineNum, txt}:any) => {
    currentLyricNum.value = lineNum
    playingLyric.value = txt
}

onMounted(() => {
    getLyric(id.value).then((res:any) => {
        // 生成歌词
        currentLyric.value = new LyricParser(res, handler)
        saveLyric(currentLyric.value)
        currentLyric.value.seek(currentTime.value * 1000)
    })
})

</script>

<style scoped>
</style>