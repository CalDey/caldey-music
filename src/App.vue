<template>
    <RouterView />
</template>

<script setup lang="ts">
  import { userCheckMobile } from '@/store/m_check'
  userCheckMobile()
  import {userPlayerInit} from "@/store/player"
  userPlayerInit()
</script>

<style scoped>
</style>
