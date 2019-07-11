import React from 'react';
import {render} from 'react-dom';
import App from "./App";
/**
 * polyfill
 */
import './polyfill';
import {start as startCache} from "./utils/cache";

'./utils/cache';
/**
 * styles
 */
import 'styles/base.global.scss';
import 'aplayer/dist/APlayer.min.css';
import {initAudioData, loadChinese, loadJapanese} from "./store";
// import 'tz-library/style/base.scss';
// import 'tz-library/style/mobile.media.scss';

/**
 * prepare
 */
new Promise(function (resolve, reject) {
    let cout = 0;
    loadJapanese().then(add);
    loadChinese().then(add);

    function add() {
        cout++;
        if (cout >= 2) {
            resolve();
        }
    }

    //超时
    setTimeout(function () {
        reject(new Error('Timeout'));
    }, 30000);
}).then(function () {
    initAudioData();
    start();
});

/**
 * start
 */
function start() {
    render(<App/>,
        document.getElementById('container'));
    setTimeout(startCache, 100);
}

