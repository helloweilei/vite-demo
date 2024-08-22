import { defineConfig, loadEnv } from 'vite'
import postcssPresetEnv from 'postcss-preset-env'
import ViteAlias from './plugins/alias'
import { HtmlPlugin } from './plugins/html'
import { VitePluginMock } from './plugins/mock'
import Checker from 'vite-plugin-checker'
import path from 'path'
import Compression from 'vite-plugin-compression'
import CDNPlugin from 'vite-plugin-cdn-import'

export default defineConfig(({ command, mode }) => {
    console.log(command, mode)
    const env = loadEnv(mode, process.cwd(), '')
    // console.log(process.cwd(), env)
    return {
        optimizeDeps: { exclude: [] },
        envPrefix: "ENV_", // default VITE_
        css: {
            modules: {
                localsConvention: 'camelCase',
                scopeBehaviour: 'local', // local/global
                generateScopedName: (name, filename, css) => {
                    console.log(name, filename, css)
                    return `${name}_${Math.random().toString().substring(3, 8)}`;
                },
                hashPrefix: 'cc_',
                globalModulePaths: [], // 不需要模块化的样式路径
            },
            preprocessorOptions: {
                less: {
                    math: 'always',
                    globalVars: {
                        mainColor: 'red'
                    }
                }, // 具体参数参考less官方文档
                sass: {}
            },
            devSourcemap: true,
            postcss: {
                plugins: [
                    postcssPresetEnv({
                        features:  {
                            "custom-properties": { preserve: true } // preset-env内置了custom-properties处理css变量
                        }
                    }),
                ],
            },
        },
        // 字定义Alias插件实现相同功能
        // resolve: {
        //     alias: {
        //         '@': './src/',
        //         '@assets': './src/assets/'
        //     }
        // },
        build: {
            rollupOptions: {
                output: {
                    assetFileNames: "[name].[hash].[ext]",
                    // 分包
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return 'vender'
                        }
                    }
                },
                input: {
                    main: path.resolve(__dirname, './index.html')
                },
            },
            minify: false,
            assetsInlineLimit: 4096, // 图片大小小于该值时会被直接转成base64格式嵌套在js中而不会生成图片文件
            outDir: 'target',
            assetsDir: 'static',
            emptyOutDir: true, // 构建之前清除构建目录
        },
        plugins: [
            ViteAlias(),
            HtmlPlugin({ inject: { data: {title: '首页'}} }),
            VitePluginMock(),
            Checker({
                typescript: true // 执行TS的类型检查并将错误信息输出到控制台
            }),
            Compression(),
            CDNPlugin({ // 内部相当于配置了rollupOption的external属性
                modules: [
                    {
                        name: 'lodash',
                        var: '_',
                        path: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'
                    }
                ]
            })
        ]
    }
})
