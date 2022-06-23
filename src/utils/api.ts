import http from "@/utils/http";
import type { Banner } from "@/models/banner";
import type { Personalized, PersonalizedNewSong, PersonalizedMv } from "@/models/personalized";
import type { TopListDetail } from "@/models/toplist_detail";
import type { PlaylistHighqualityTag, PlayListDetail, PlayListDetailSubscribers, PlaylistRelated, PlaylistHotComments } from "@/models/playlist";
import type { Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import type { Lyric } from "@/models/lyric";
import type { Artist } from '@/models/artist'
import type { ArtistDetail, ArtistDesc } from '@/models/artist_detail'
import type { Album } from '@/models/Album'
import type { HotSearch } from '@/models/search'

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

// 获取歌手列表
export async function useArtistList(pageData: { type: number, area: number, initial: string, page: number, limit: number }) {
    const { artists } = await http.get<{ artists: Artist[] }>('artist/list', {
        type: pageData.type,
        area: pageData.area,
        initial: pageData.initial,
        limit: pageData.limit,
        offset: (pageData.page - 1) * pageData.limit
    })
    return artists
}

// 获取歌手详情
export async function useArtistDetail(id: number) {
    const { data } = await http.get<{ data: ArtistDetail }>('artist/detail', {id: id})
    return data
}

// 获取歌手热门歌曲
export async function useArtistHotSongs(id: number) {
    const { songs } = await http.get<{ songs: Song[] }>('artist/top/song', {id: id})
    return songs
}

// 获取歌手全部歌曲
// export async function useArtistAllSongs(pageData: {id: number, order: string, limit: number, offset: number}) {
//     const { songs } = await http.get<{ songs: Song[] }>('artist/songs', {id: pageData.id, order: pageData.order, limit: pageData.limit, offset: pageData.offset})
//     return songs
// }

// 获取歌手专辑
export async function useArtistAlbum(id: number, limit: number, offset: number = 0) {
    const { hotAlbums } = await http.get<{ hotAlbums: Album[] }>('artist/album', {id: id, limit: limit, offset: offset})
    return hotAlbums
}

// 获取歌手专辑内容
export async function useAlbum(id: number) {
    const { album, songs } = await http.get<{ album: Album, songs: Song[] }>('album', {id: id})
    return { album, songs }
}

// 获取专辑评论
export async function useAlbumComment(id: number) {
    const { hotComments, comments } = await http.get<{ hotComments: PlaylistHotComments[], comments: PlaylistHotComments[] }>('comment/album?limit=20&offset=0', {id: id})
    return { hotComments, comments }
}

// 获取歌手Mv
export async function useArtistMv(id: number, limit: number, offset: number = 0) {
    const { mvs } = await http.get<{ mvs: PersonalizedMv[] }>('artist/mv', {id: id, limit: limit, offset: offset})
    return mvs
}

// 获取歌手描述
export async function useArtistDesc(id: number) {
    return await http.get<ArtistDesc>('artist/desc', {id: id})
}

// 获取热门搜索
export async function useHotSearch() {
    const { result } = await http.get<{ result: any }>('search/hot')
    return result
}

// 获取搜索结果
export async function useSearch(keywords: string, limit: number, offset: number = 0, type: number) {
    const { result } = await http.get<{result: any}>('search', {keywords: keywords, limit: limit, offset: offset, type: type})
    return result
}