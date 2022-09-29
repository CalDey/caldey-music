import { defineStore, storeToRefs } from "pinia";
import { onMounted, onUnmounted, toRefs, watch } from "vue";
import { useDetail, useSongUrl, useLyric } from "@/utils/api";
import type { Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import { formatSec } from '@/utils/number'
import { ElMessage } from 'element-plus'
import LyricParser from 'lyric-parser'

const KEYS = {
    volume: 'PLAYER-VOLUME'
}


export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        audio: new Audio(),
        loopType: 0, // 循环模式 0 单曲循环 1 列表循环 2随机播放
        volume: 60, // 音量
        playList: [] as Song[], // 播放列表
        showPlayList: false,    // 播放列表显隐
        id: 0,
        url: '',
        songUrl: {} as SongUrl,
        song: {} as Song,
        isPlaying: false, // 是否播放中
        isPause: false, // 是否暂停
        sliderInput: false, // 是否正在拖动进度条
        ended: false, // 是否播放结束
        muted: false, // 是否静音
        currentTime: 0, // 当前播放时间
        duration: 0, // 总播放时长
        currentLyric: null, // 解析后歌词数据
        playerShow: false   // 控制播放器显隐
    }),
    persist: {
        enabled: true,
        strategies: [
            { 
                storage: localStorage,
                paths: ['playList'] // 缓存歌单列表
             }
        ]
    },
    getters: {
        playListCount: state => {
            return state.playList.length
        },
        thisIndex: state => {
            return state.playList.findIndex(song => song.id === state.id)
        },
        nextSong(state): Song {
            // console.log('next')
            const { thisIndex, playListCount } = this
            if (thisIndex === playListCount - 1) {
                return state.playList[0]
            } else {
                const nextIndex: number = thisIndex + 1
                return state.playList[nextIndex];   
            }
        },
        prevSong(state): Song {
            const { thisIndex } = this
            if (thisIndex === 0) {
                return state.playList[state.playList.length - 1]
            } else {
                const prevIndex: number = thisIndex - 1
                return state.playList[prevIndex];
            }
        }
    },
    actions: {
        init() {
            this.audio.volume = this.volume / 100;
        },
        // 播放列表里面添加音乐
        pushPlayList(replace: boolean, ...list: Song[]) {
            if (replace) {
                this.playList = list;
                return;
            }
            list.forEach(song => {
                if (this.playList.filter(s => s.id == song.id).length <= 0) {
                    this.playList.push(song)
                }
            })
        },
        // 删除播放列表中某歌曲
        deleteSong(id: number) {
            this.playList.splice(this.playList.findIndex(s => s.id == id), 1)
        },
        // 清空播放列表
        clearPlayList() {
            this.songUrl = {} as SongUrl
            this.url = ''
            this.id = 0;
            this.song = {} as Song
            this.isPlaying = false;
            this.isPause = false;
            this.sliderInput = false;
            this.ended = false;
            this.muted = false;
            this.currentTime = 0;
            this.playList = [] as Song[];
            this.showPlayList = false;
            this.audio.load();
            setTimeout(() => {
                this.duration = 0;
            }, 500)
        },
        // 播放
        async play(id: number) {
            if (id == this.id) return;
            this.isPlaying = false
            const data = await useSongUrl(id)
            this.audio.src = 'https://music.163.com/song/media/outer/url?id=' + data.id + '.mp3';
            this.audio.play().then(res => {
                this.isPlaying = true
                this.songUrl = data
                this.url = data.url
                this.id = id;
                this.songDetail()
            }).catch(res => {
                this.id = id;
                console.log(res)
                ElMessage.error({
                    showClose: true,
                    message: '抱歉，该歌曲无法正常播放',
                })
                this.next()
            })
        },
        // 获取歌词
        async getLyric(id: number) {
            const lyricData = await useLyric(id)
            const lyric = JSON.parse(JSON.stringify(lyricData)).lyric
            return lyric
        },
        // 缓存歌词
        saveLyric(currentLyric: any) {
            this.currentLyric = currentLyric
        },
        //播放结束
        playEnd() {
            console.log('播放结束')
            switch (this.loopType) {
                case 0:
                    this.rePlay()
                    break;
                case 1:
                    this.next()
                    break;
                case 2:
                    this.randomPlay()
                    break;
            }
        },
        async songDetail() {
            this.song = await useDetail(this.id)
            console.log(this.song)
            // this.duration = formatSec(this.song.dt)
            this.pushPlayList(false, this.song)
        },
        // 重新播放
        rePlay() {
            setTimeout(() => {
                this.currentTime = 0;
                if (this.currentLyric) {
                    (this.currentLyric as any).seek(0)
                }
                this.audio.play()
            }, 1500)
        },
        // 下一曲
        next() {
            if (this.loopType === 2) {
                this.randomPlay()
            } else {
                this.play(this.nextSong.id)
            }
        },
        // 上一曲
        prev() {
            this.play(this.prevSong.id)
        },
        // 随机播放
        randomPlay() {
            this.play(this.playList[Math.ceil(Math.random() * this.playList.length - 1)].id)
        },
        //播放、暂停
        togglePlay() {
            if (!this.song.id) return;
            this.isPlaying = !this.isPlaying
            if (!this.isPlaying) {
                this.audio.pause();
                this.isPause = true
            } else {
                this.audio.play();
                this.isPause = false
            }
        },
        setPlay() {
            if (!this.song.id) return;
            this.isPlaying = true
            this.audio.play();
            this.isPause = false
        },
        setPause() {
            if (!this.song.id) return;
            this.isPlaying = false
            this.audio.pause();
            this.isPause = true
        },
        // 切换循环类型
        toggleLoop() {
            if (this.loopType == 2) {
                this.loopType = 0;
            } else {
                this.loopType++;
            }
        },
        // 静音切换
        toggleMuted() {
            this.muted = !this.muted
            this.audio.muted = this.muted
        },
        // 音量设置
        setVolume(n: number) {
            n = n > 100 ? 100 : n
            n = n < 0 ? 0 : n
            this.volume = n
            this.audio.volume = n / 100
            localStorage.setItem('PLAYER-VOLUME', n.toString())
        },
        // 修改播放时间
        onSliderChange(val: number) {
            this.currentTime = val;
            this.sliderInput = false;
            this.audio.currentTime = val;
            (this.currentLyric as any).seek(this.currentTime * 1000)
        },
        // 播放时间拖动中
        onSliderInput(val: number) {
            this.sliderInput = true;
        },
        // 定时器
        interval() {
            if (this.isPlaying && !this.sliderInput) {
                this.currentTime = parseInt(this.audio.currentTime.toString());
                this.duration = parseInt(this.audio.duration.toString());
                this.ended = this.audio.ended
            }
        },
        // 控制播放器显隐
        setPlayerShow(val: number) {
            // val 0:显示 1:隐藏
            if (val === 0) {
                this.playerShow = true
            } else {
                this.playerShow = false
            }
        }
    }
})

export const userPlayerInit = () => {
    let timer: any;
    const { init, interval, playEnd, setPlayerShow } = usePlayerStore()

    const { ended, song } = storeToRefs(usePlayerStore())

    //监听播放结束
    watch(ended, ended => {
        if (!ended) return
        playEnd()
    })

    // 监听当前歌曲控制播放器显隐
    watch(song, song => {
        if (song) {
            setPlayerShow(0)
        } else {
            setPlayerShow(1)
        }
    })

    //启动定时器
    onMounted(() => {
        init()
        console.log('启动定时器')
        timer = setInterval(interval, 1000)
    })
    //清除定时器
    onUnmounted(() => {
        console.log('清除定时器')
        clearInterval(timer)
    })
}