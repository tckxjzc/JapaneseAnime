import Aplayer from 'aplayer';
import {data, store} from "../store";

let player;

export function setPlayer(container: HTMLElement) {
    if (player) {
        return
    }
    player = new Aplayer({
        container,
        mini: false,
        autoplay: false,
        loop: false,
        // mutex: false,
        listFolded: true,
        // listMaxHeight: 90,
    });
    setAudio(data.audio[parseInt(store.id)-1]);
}

export function destroyPlayer() {
    if (player) {
        player.destroy();
        player = null;
    }
}

export function setAudio(audio) {
    player.list.clear();
    player.list.add(audio);
}
