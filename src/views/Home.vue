<template>
    <div class="h-full overflow-hidden bg-skin-bg font-style">
        <Header />
        <!-- keep-alive 缓存组件 -->
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component
                    :is="Component"
                    v-if="$route.meta.keepAlive"
                    :key="$route.name"
                />
            </keep-alive>
            <component
                :is="Component"
                v-if="!$route.meta.keepAlive"
                :key="$route.name"
            />
        </router-view>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/header/Header.vue';
import Footer from '@/components/layout/footer/Footer.vue';
// 禁止全局横轴滚动条
document.body.style.overflowX = 'hidden';
</script>

<style scoped>
.font-style {
    font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
}
</style>
