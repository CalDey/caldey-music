import {defineStore, storeToRefs} from "pinia";

export const useCurIdxStore = defineStore({
    id: 'curIdx',
    state: () => ({
        curIdx: 0
    }),
    // 开启缓存
    persist: {
        enabled: true,
        strategies: [
            {
              storage: localStorage,
            }
          ]
    }
})

export const userCurIdx = (index: number) => {
    const { curIdx } = storeToRefs(useCurIdxStore())
    curIdx.value = index
}