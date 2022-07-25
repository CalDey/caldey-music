import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export interface IMenus {
    name: string,
    key: string,
}

export function useMenu() {
    const menus: IMenus[] = [
        {
            name: '发现音乐',
            key: 'Discover'
        },
        {
            name: '排行榜',
            key: 'Rank'
        },
        {
            name: '歌单',
            key: 'Playlist'
        },
        {
            name: '歌手',
            key: 'Artist'
        },
        {
            name: 'MV',
            key: 'Mv'
        }
    ];

    const router = useRouter();

    const click = async(menus: IMenus) => {
        // console.log(menus.key)
        await router.push({name: menus.key})
    }

    return {
        menus,
        click
    }
}