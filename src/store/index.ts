import {observable, reaction} from "mobx";
import {getDetails, xhttp} from "../utils/xhttp";

type Data = {
    chinese: Array<string>,
    japanese: Array<string>,
    audio: Array<any>,
    scrollTop: number,
    controller:boolean,
};
export const data: Data = {
    chinese: null,
    japanese: null,
    audio: [],
    scrollTop: 0,
    controller:null,//service work enabled
};
export const store = observable({
    id: '',
    searchWord: '',
    title: '',
    details: '',
    openMenu: false,
    openDialog:false,
});
//打开菜单
export function openMenu() {
    store.openMenu = true;
}
//关闭菜单
export function closeMenu() {
    store.openMenu = false;
}
//打开dialog
export function openDialog() {
    store.openDialog = true;
}
//关闭dialog
export function closeDialog() {
    store.openDialog = false;
}


/**
 * 加载日文
 */
export function loadJapanese() {
    return xhttp('/details/index_jp.txt').then(function (text) {
        let arr = text.split(/\n/);
        arr.splice(300, 1);
        data.japanese = arr;
    });
}

/**
 * 加载中文
 */
export function loadChinese() {
    return xhttp('/details/index.txt').then(function (text) {
        let arr = text.split(/\n/);
        arr.splice(300, 1);
        data.chinese = arr;
    });
}

/**
 * 初始化音频数据
 */
export function initAudioData() {
    const {chinese, japanese} = data;
    japanese.forEach(function (item, index) {
        data.audio.push({
            id: index,
            name: `${item}(${chinese[index]})`,
            artist: 'anime',
            cover: '/images/cover.jpg',
            url: `/voices/chu_${String(index + 1).padStart(3, '0')}.mp3`,
        });
    });
}

/**
 * 加载详情
 * @param id
 */


export function loadDetails(id) {
    getDetails(id).then(function (text) {
        if (id == store.id) {
            text = text.replace(/\n/g, '<br/>');
            let japanese = data.japanese[parseInt(id) - 1];
            let chinese = data.chinese[parseInt(id) - 1];
            text = text.replace(japanese, `<b>${japanese}</b>`);
            text = text.replace(chinese, `<i>${chinese}</i>`);
            store.details = text;
        }

    });
}

reaction(() => {
    return store.id
}, (id) => {
    if (id) {
        loadDetails(id);
        store.title = id + '.' + data.audio[parseInt(id) - 1].name;
    }
});
