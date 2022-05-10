<template>
    <el-drawer v-model="showPlayList" title="播放列表" size="320px">
        <div v-for="(song, index) in playList" :key="song.id">
            <div class="flex my-2">
                <div v-if="song.id === id" class="flex justify-center mr-4">
                    <div class="play-icon">
                        <div class="line" style="animation-delay: -1.2s!important;"></div>
                        <div class="line"></div>
                        <div class="line" style="animation-delay: -1.5s!important;"></div>
                        <div class="line" style="animation-delay: -0.9s!important;"></div>
                        <div class="line" style="animation-delay: -0.6s!important;"></div>
                    </div>
                </div>
                <div v-else class="text-center mr-4" @click="play(song.id)">{{index}}</div>
                <div class="truncate">{{song.name}}</div>
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {usePlayerStore} from "@/store/player";

const {showPlayList, playListCount, playList, id} = storeToRefs(usePlayerStore())
</script>

<style lang="scss" scoped>
.play-icon {
    display: flex;
    height: 16px;
    min-width: 18px;
    overflow: hidden;
    .line {
        width: 2px;
        height: 100%;
        margin-left: 2px;
        background-color: #ff410f;
        animation: play .9s linear infinite alternate!important;
    }
}

@keyframes play {
	0% {
		-webkit-transform: translateY(0);
		transform: translateY(0)
	}

	to {
		-webkit-transform: translateY(85%);
		transform: translateY(85%)
	}
}
</style>