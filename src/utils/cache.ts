import {data} from "../store";
import {version} from "./version";

export function start() {
    if ('serviceWorker' in window.navigator) {
        if (navigator.serviceWorker.controller) {
            cacheHomeResource();
            data.controller = true;
        } else {
            navigator.serviceWorker.oncontrollerchange = function () {
                cacheHomeResource();
                data.controller = true;
            }
        }
    }
}

//缓存首页资源
function cacheHomeResource() {
    let cacheVersion = localStorage.getItem('CacheHomeResource');
    if (cacheVersion == version) {
        return
    }
    let resources = new Set<string>();
    let forEach = [].forEach;
    //html
    resources.add('/');
    resources.add('/icon.png');
    resources.add('/images/cover.png');
    resources.add('/details/index.txt');
    resources.add('/details/index_jp.txt');
    //script
    forEach.call(document.getElementsByTagName('script'), function ({src}) {
        if (src) {
            resources.add(src);
        }
    });
    //styles
    forEach.call(document.getElementsByTagName('link'), function ({href}) {
        if (href) {
            resources.add(href);
        }
    });
    //start
    return new Promise(function (resolve, reject) {
        let length = resources.size;
        let count = 0;
        resources.forEach(function (value) {
            fetch(value).then(function (response) {
                if (response.ok) {
                    resources.delete(value);
                }
                add()
            }).catch(add);
        });

        function add() {
            count++;
            if (count == length) {//缓存完成
                console.log('home缓存完成');
                resolve();
            }
        }
    }).then(function () {
        if (resources.size == 0) {
            localStorage.setItem('CacheHomeResource', version);
            console.log('home缓存成功');
        }
    });


}
