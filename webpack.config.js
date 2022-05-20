const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        environment:{
            arrowFunction: false
        }
    },

    module:{
        rules: [
            {
                test:/\.ts$/,
                use: [
                    {
                        // 指定加载器
                        loader:'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets:[
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        targets:{
                                            //兼容版本设置
                                            "chrome":"85"
                                        },
                                        //corejs版本
                                        "corejs":"3",
                                        //使用corejs的方式 usage表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node-modules/
            },

            //设置less文件处理
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],

    resolve: {
        extensions: ['.ts','.js']
    },
    mode: "development"
}