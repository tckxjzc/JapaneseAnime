import {data} from "../store";

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
    let flag = localStorage.getItem('CacheHomeResource');
    if (flag) {
        return
    }
    let resources = new Set<string>();
    let forEach = [].forEach;
    //html
    resources.add('/');
    resources.add('/icon.png');
    resources.add('/details/index.txt');
    resources.add('/details/index_jp.txt');
    //script
    forEach.call(document.getElementsByTagName('script'), function ({src}) {
        if (src) {
            resources.add(src);
        }
    });
    forEach.call(document.getElementsByTagName('link'), function ({href}) {
        if (href) {
            resources.add(href);
        }
    });
    //start
    new Promise(function (resolve, reject) {
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
            localStorage.setItem('CacheHomeResource', Date.now() + '');
            console.log('home缓存成功');
        }
    });


}
