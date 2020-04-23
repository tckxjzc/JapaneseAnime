let merge=require('webpack-merge');
let HtmlWebpackPlugins=require('html-webpack-plugin');
const PreloadWebpackPlugin=require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
let path=require('path');
let config=require('./config');
let {dist,title}=config;
let baseConfig=require('./webpack.base');
let webpack=require('webpack');
module.exports=merge(baseConfig,{
    mode:'production',
    externals:{
        // 'react':'React',
        // 'react-dom': 'ReactDOM',
        // 'react-router-dom':'ReactRouterDOM',
        // 'jquery':'$',
        // 'moment':'moment',
        // 'swiper':'Swiper',
        // 'mobx':'mobx',
        // 'mobx-react':'mobxReact',
        // 'aplayer':'APlayer',
    },
    plugins:[
        new webpack.DefinePlugin({
            'wbp.dev':'false'
        }),
        new HtmlWebpackPlugins({
            title:title,
            minify:{
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
                removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            },
            hash:true,
            chunks:['main'],
            template: path.join(__dirname,'../src/template/index-load.html'),
            library:[
                // 'https://cdn.bootcss.com/react/16.4.0-alpha.0911da3/umd/react.production.min.js',
                // 'https://cdn.bootcss.com/react-dom/16.4.0-alpha.0911da3/umd/react-dom.production.min.js'
                // 'https://cdnjs.cloudflare.com/ajax/libs/react/16.3.2/umd/react.production.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.3.2/umd/react-dom.production.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.2.2/react-router-dom.min.js'
                // '//cdn.bootcss.com/react/16.8.6/umd/react.production.min.js',
                // '//cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.production.min.js',
                // '//cdn.bootcss.com/react-router-dom/4.2.2/react-router-dom.min.js',
                // '//cdn.bootcss.com/mobx/5.9.4/mobx.umd.min.js',
                // '//cdn.bootcss.com/mobx-react/5.4.4/index.min.js',
                // '//cdn.bootcss.com/aplayer/1.10.1/APlayer.min.js'
            ],
            filename:`${dist}/index.html`
        }),
        new CopyPlugin([
            {
                from:path.resolve(__dirname,'../src/static'),
                to:path.resolve(__dirname,'../dist')
            }
        ])
        // new PreloadWebpackPlugin()
    ]
});
