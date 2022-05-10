import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',   // 首页
            component: () => import("@/views/Home.vue"),
            children: [
                {
                    path: '',
                    name: 'Discover',   // 排行榜
                    component: () => import("@/views/discover/Discover.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/rank',
                    name: 'Rank',   // 排行榜
                    component: () => import("@/views/music/rank/Rank.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/playlist',
                    name: 'Playlist',   // 歌单
                    component: () => import("@/views/music/playlist/Playlist.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/playlist-detail',
                    name: 'PlaylistDetail',   // 歌单
                    component: () => import("@/views/music/playlist/PlaylistDetail.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
            ]
        },
    ]
})

export default router