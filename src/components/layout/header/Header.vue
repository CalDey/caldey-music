<template>
    <div class="relative flex flex-col lg:flex-row items-center border-b">
        <div class="flex items-center mr-0 lg:mr-8 cursor-pointer" @click="handleLogoBtn">
            <svg class="w-12 h-12 ml-0 lg:ml-4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M598.4 831.872H328.192a256 256 0 0 1-34.496-510.528A352 352 0 1 1 598.4 831.872zm-271.36-64h272.256a288 288 0 1 0-248.512-417.664L335.04 381.44l-34.816 3.584a192 192 0 0 0 26.88 382.848z"></path></svg>
            <div class="ml-2 font-bold" style="width:130px;">CalDey Music🎵</div>
        </div>
        <ul :class="[isShowMenu == false && isMobile == true ? 'hidden' : '']" class="flex flex-col mt-2 lg:flex-row lg:mt-0 flex-1 w-screen lg:w-0 border-b lg:border-b-0">
            <li v-for="(item, index) in menus" :key="index" :class="[curIdx === index ? 'text-red-400' : '']" class="py-4 flex justify-center hover:bg-red-300 hover:text-white" @click="changeMenu(item, index)">{{item.name}}</li>
        </ul>
        <div class="hidden lg:flex right-4 divide-x-2">
            <!-- 搜索按钮（pc端） -->
            <div @click="dialogSearchBox = true" class="flex items-center px-8 cursor-pointer">
                <svg class="w-6 h-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
            </div>
            <div class="flex items-center px-8 cursor-pointer">
                <span>登录</span>
            </div>
        </div>
        <!-- 搜索按钮（移动端） -->
        <div @click="dialogSearchBox = true" :class="[isShowMenu == true && isMobile == true ? 'hidden' : '']" class="lg:hidden absolute right-2 top-1/2 transform -translate-y-1/2 px-8 cursor-pointer">
            <svg class="w-6 h-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
        </div>
        <SearchBox :dialogSearchBox="dialogSearchBox" @handle-close="handleClose" />
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
// 获取菜单栏数据
import { useMenu } from './useMenu'
import type { IMenus } from "./useMenu";
import { useIsMobileStore } from "@/store/m_check";
import { useCurIdxStore, userCurIdx } from "@/store/cur_idx";
import SearchBox from "./SearchBox.vue";

const { menus, click } = useMenu()
const { curIdx } = toRefs(useCurIdxStore());
const changeMenu = (item:IMenus, index: number) => {
    click(item)
    curIdx.value = index
    userCurIdx(index)
}
// 点击显隐菜单栏（移动端）
const isShowMenu = ref(false)
const { isMobile } = toRefs(useIsMobileStore())
const handleLogoBtn = () => {
    if(isMobile.value === true) {
        isShowMenu.value = !isShowMenu.value
    }
}
const dialogSearchBox = ref(false)

// 关闭搜索页面
const handleClose = () => {
    dialogSearchBox.value = false
}
</script>

<style scoped>
    ul li {
        @apply px-4 cursor-pointer;
    }
</style>