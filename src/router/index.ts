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
                {
                    path: '/artist',
                    name: 'Artist', // 歌手列表
                    component: () => import("@/views/artist/Artist.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/artistDetail',
                    name: 'artistDetail', // 歌手列表
                    component: () => import("@/views/artist/ArtistDetail.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/album',
                    name: 'album', // 歌手专辑
                    component: () => import("@/views/artist/Album.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/search',
                    name: 'search', // 搜索
                    component: () => import("@/views/search/Search.vue"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/mvDetail',
                    name: 'mvDetail', // mv详情页
                    component: () => import("@/views/mv/mvDetail.vue"),
                },
                {
                    path: '/mv',
                    name: 'Mv', // mv
                    component: () => import("@/views/mv/Mv.vue"),
                },
            ]
        },
    ]
})

export default router