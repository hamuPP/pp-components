/**
 * Created by hamupp 879372858@qq.com on 2018/01/26.
 */
const path = require("path");
const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    devtool: 'source-map',
    entry: "./src/formPreview.js",// todo 打包后记得要改这里哦
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'FormPreview.min.js',
        libraryTarget: 'umd',
        library: 'FormPreview',
        umdNamedDefine: true
    },
    module: {
        // noParse: /es6-promise\.js$/,
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         { loader: "style-loader" },
            //         { loader: "css-loader" },
            //         { loader: "less-loader" }
            //     ]
            // },
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
          },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader',
              // include的写法示例
              //   include: [
              //     resolve('src'),
              //     resolve('test'),
              //     resolve('node_modules/webpack-dev-server/client'),
                 // resolve('node_modules/element-ui'),
                // ]
            },
          {
              test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
              loader: 'url-loader',
          },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new uglify(
            {
                uglifyOptions: {
                    output: {
                        beautify: false,
                        comments: false
                    },
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true
                    },
                }
            }
        ),
      // 开启 BundleAnalyzerPlugin
      new BundleAnalyzerPlugin(),
    ]
};