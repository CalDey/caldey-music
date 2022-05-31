import http from "@/utils/http";
import type { Banner } from "@/models/banner";
import type { Personalized, PersonalizedNewSong, PersonalizedMv } from "@/models/personalized";
import type { TopListDetail } from "@/models/toplist_detail";
import type { PlaylistHighqualityTag, PlayListDetail, PlayListDetailSubscribers, PlaylistRelated, PlaylistHotComments } from "@/models/playlist";
import type { Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import type { Lyric } from "@/models/lyric";

// Banner
export async function useBanner() {
    const { banners } = await http.get<{ banners: Banner[] }>('/banner', {type: 1})
    return banners
}

// 推荐歌单
export async function usePersonalized() {
    const { result } = await http.get<{ result: Personalized[] }>('/personalized?limit=8')
    return result
}

// 推荐新音乐
export async function usePersonalizedNewSong() {
    const { result } = await http.get<{ result: PersonalizedNewSong[] }>('/personalized/newsong')
    return result
}

// 推荐MV
export async function usePersonalizedMv() {
    const { result } = await http.get<{ result: PersonalizedMv[] }>('personalized/mv')
    return result
}

// 排行榜单
export async function useTopListDetail() {
    const { list } = await http.get<{ list: TopListDetail[] }>('/toplist/detail')
    return list
}

// 获取歌单标签
export async function usePlaylistHighqualityTags() {
    const { tags } = await http.get<{ tags: PlaylistHighqualityTag[] }>("playlist/highquality/tags")
    return tags
}

// 获取精品歌单数据
export async function useTopPlaylistHighquality(params?: { limit?: number, before?: number, cat: string }) {
    return await http.get<{ playlists: PlayListDetail[], total: number, more: boolean, lasttime: number }>("top/playlist/highquality", params)
}

// 获取歌单详情
export async function usePlayListDetail(id: number) {
    const { playlist } = await http.get<{ playlist: PlayListDetail }>('/playlist/detail', {id: id})
    return playlist
}

// 获取歌单所有歌曲
export async function usePlayListTrackAll(id: number) {
    const { songs } = await http.get<{ songs: Song[] }>('playlist/track/all', {id: id})
    return songs
}

// 获取歌单收藏用户信息
export async function usePlayListSubscribers(id: number) {
    const { subscribers } = await http.get<{ subscribers: PlayListDetailSubscribers[] }>('playlist/subscribers?limit=50', {id: id})
    return subscribers
}

// 获取相似歌单推荐
export async function usePlayListRelated(id: number) {
    const { playlists } = await http.get<{ playlists: PlaylistRelated[] }>('related/playlist', {id: id})
    return playlists
}

// 获取歌单评论
export async function usePlayListComment(id: number) {
    const { hotComments } = await http.get<{ hotComments: PlaylistHotComments[] }>('comment/playlist?limit=20&offset=0', {id: id})
    return hotComments
}

// 获取歌曲详情
export async function useDetail(id: number) {
    const { songs } = await http.get<{ songs: Song[] }>('/song/detail', {ids: id})
    // console.log(songs[0])
    return songs[0]
}

// 获取音乐url
export async function useSongUrl(id: number) {
    const { data } = await http.get<{ data: SongUrl[] }>('/song/url', {id: id})
    // console.log(data[0])
    return data[0]
}

// 获取歌曲歌词
export async function useLyric(id: number) {
    const { lrc } = await http.get<{ lrc: Lyric[] }>('/lyric', {id: id})
    return lrc
}