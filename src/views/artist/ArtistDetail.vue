<template>
    <div v-if="artistDetail">
        <Info :artist-detail="artistDetail" />
        <el-tabs v-model="tab" class="my-4">
            <el-tab-pane lazy label="歌曲" name="music">
                <Song :id="id" />
            </el-tab-pane>
            <el-tab-pane lazy label="专辑" name="album">
                <Album :id="id" />
            </el-tab-pane>
            <el-tab-pane lazy label="MV" name="mv">
                <Mv :id="id" />
            </el-tab-pane>
            <el-tab-pane lazy label="详情" name="detail">
                <Desc :id="id" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useArtistDetail } from '@/utils/api';
import { useRoute } from 'vue-router';
import type { ArtistDetail } from '@/models/artist_detail';
import Info from './ArtistInfo.vue';
import Song from './ArtistSong.vue';
import Album from './ArtistAlbum.vue';
import Mv from './ArtistMv.vue';
import Desc from './ArtistDesc.vue';
const artistDetail = ref<ArtistDetail>();
const route = useRoute();
const id = Number(route.query.id);
const tab = ref('music');
onMounted(async () => {
    artistDetail.value = await useArtistDetail(id);
    console.log(artistDetail);
});
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav-wrap::after {
    height: 0 !important;
}
::v-deep .el-tabs__item {
    width: 25vw;
    text-align: center;
}
::v-deep .el-tabs__active-bar {
    height: 0 !important;
}
</style>
