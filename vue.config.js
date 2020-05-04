module.exports = {
    // baseUrl: './',
    // assetsDir: 'static',
    // productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://localhost:3000',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }


    publicPath: '/', //根路径
    // assetsPublicPath: './',
    outputDir: "dist", //构建输出目录
    assetsDir: "assets", //静态资源目录　（js, css, img, fonts）
    lintOnSave: false, //是否开启estlint保存检查
}