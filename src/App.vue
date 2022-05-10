<template>
    <RouterView />
</template>

<script setup lang="ts">
  import { userCheckMobile } from '@/store/m_check'
  import {userPlayerInit} from "@/store/player"
  userCheckMobile()
  userPlayerInit()
</script>

<style scoped>
</style>
