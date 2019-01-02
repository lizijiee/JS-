/* 
    -S  --save

    -D  --save-dev

    production/development

    在"build":"webpack -w"  //监听变动并自动打包
        -w watch  监听 

    webpack -p//压缩混淆脚本，这个非常非常重要！    
*/
const webpack = require('webpack'); //1.5
const path = require("path");
const CWP = require("clean-webpack-plugin"); //引入JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩JS
const MCEP = require("mini-css-extract-plugin"); //分离css,不负责压缩 --  replace ExtractTextPlugin.extract({..})
const OCAWP = require("optimize-css-assets-webpack-plugin");
const HWP = require("html-webpack-plugin");
// 图片打包需要npm install file-loader url-loader html-withimg-loader -D
//  Webpack轻松入门（三）——图片打包   https://www.jianshu.com/p/43c2216ef004

// 压缩js
const obj = {
    devServer: { //HWP网页设置
        host: 'localhost',
        port: 80,
        open: true,
        compress: true,
        // hot: true,
        inline: true
        //升级到Webpack2坑——模块热替换失效页面不自动刷新？   https://www.jianshu.com/p/07c0666e87c7 (关于使用 inline: true而不用 inline: true)
    },
    mode: "development", //mode: "production", //生产环境 development开发模式,package.json"build"是生产环境
    entry: {
        app: "./app.js",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "./JS/[name].[hash:4].js",
    },
    module: {
        rules: [{ //require 引入css会报错解决办法
                test: /\.css$/,
                // loader:'style-loader!css-loader',
                use: [{
                        loader: MCEP.loader, //这里分离CSS.
                    },
                    "css-loader"
                ],
                // use:[
                //     'style-loader',
                //     'css-loader'
                // ]
                // include:path.join(__dirname,'./src'),
                // exclude:/node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
                use: [{
                    loader: "url-loader", //只是一个单纯的loader
                    // url - loader 后面除了 limit 字段， 还可以通过 name 字段来指定图片打包的目录与文件名：
                    options: {
                        name: './images/[name].[ext]', //图片名([name])和图片格式([ext])。
                        limit: 1000,
                        // outpath: "images", //打包完的名称
                        publicPath: "../",
                        // outputPath:'../images',
                        // publicPath:'/images'

                        // webpack中output之path和publicPath详解
                        // https://blog.csdn.net/qq_39207948/article/details/80631435

                        //单独的创建一个文件夹，它的路径
                        //路径基于出口路径
                        outputPath: './images',
                        //引入路径
                    }
                }]
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader',
                // include:path.join(__dirname,'./src'),
                //  exclude:/node_modules/
            }
        ]
    },
    plugins: [
        new OCAWP({}), //压缩css，没有注释相同名字自动叠加.
        new MCEP({ //导出分离的css文件
            filename: "./CSS/[name].[chunkhash:8].css",
            // chunkFilename: "[id].css"
        }),
        new UglifyJsPlugin(), //压缩JS文件
        new CWP(["build"]), //清空原文件夹
        new webpack.HotModuleReplacementPlugin(), //  热更新--webpack建立联系
        new HWP({
            template: "./index.html",
            filename: "./index.html",
            // inject: false, //不放script标签
            // inject: "head", //把script标签放入head中
            // hash: true, //给js,css文件加?dsua89a
            // chunks: ['index', 'index2'],
            title: '欢迎大家来到珠峰培训',
            minify: {
                removeEmptyAttributes: true, //去除引号
                collapseWhitespace: true, //压缩去除空格
            }
        }),
    ]
};
module.exports = obj;
// npm i webpack webpack-cli css-loader clean-webpack-plugin html-webpack-plugin mini-css-extract-plugin url-loader file-loader optimize-css-assets-webpack-plugin html-withimg-loader  -D