importScripts('/workbox/4.3.1/workbox-sw.js');
// const cacheList = [
//     '/',
//     {url: '/index.html'}
// ];
// workbox.precaching.precacheAndRoute(cacheList, {
//     ignoreURLParametersMatching: [/.*/]
// });

workbox.routing.registerRoute(
    function (ctx) {
        let url = ctx.url.pathname;
        let list = [
            /\.(js|css)$/,
        ];
        for (let i = 0; i < list.length; i++) {
            if (list[i].test(url)) {
                return true;
            }
        }
        return false;
    },
    new workbox.strategies.CacheFirst({
        cacheName: "cache:resource",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                purgeOnQuotaError: true
            })
        ]
    })
);
workbox.routing.registerRoute(
    function (ctx) {
        let url = ctx.url.pathname;
        let list = [
            /\.(txt|mp3|jpg|png)$/,
        ];
        for (let i = 0; i < list.length; i++) {
            if (list[i].test(url)) {
                return true;
            }
        }
        return false;
    },
    new workbox.strategies.CacheFirst({
        cacheName: "cache:media",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                purgeOnQuotaError: true
            })
        ]
    })
);
workbox.routing.registerRoute(
    function (ctx) {
        let url = ctx.url.pathname;
        let list = [
            /\.(html)$/,
        ];
        for (let i = 0; i < list.length; i++) {
            if (list[i].test(url)) {
                return true;
            }
        }
        if (url == '/') {
            return true;
        }
        return false;
    },
    new workbox.strategies.NetworkFirst({
        cacheName: "cache:doc",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 20,
                purgeOnQuotaError: true
            })
        ]
    })
);


workbox.core.skipWaiting();
workbox.core.clientsClaim();

