importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
const  cacheList = [
    '/',
    {url:'/index.html'}
];
workbox.precaching.precacheAndRoute(cacheList,{
    ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    function (ctx) {
        let url = ctx.url.pathname;
        let list = [
            /\.(js|css|txt|mp3|jpg|png)$/,
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
                maxEntries: 1000,
                purgeOnQuotaError: true
            })
        ]
    })
);


workbox.core.skipWaiting();
workbox.core.clientsClaim();

