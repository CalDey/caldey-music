<template>
  <div class="mb-20">
    <Banner />
    <Personalized />
    <PersonalizedNewSong />
    <Mv />
  </div>
</template>

<script setup lang="ts">
import Banner from "@/components/common/Banner.vue";
import Personalized from "@/views/discover/Personalized.vue";
import PersonalizedNewSong from "@/views/discover/PersonalizedNewSong.vue";
import Mv from "@/views/discover/Mv.vue";
</script>

<style scoped>
</style>