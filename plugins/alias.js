import fs from 'fs'
import path from 'path'

export default function ViteAlias() {
    return {
        name: "VitePluginAlias",
        config(config, { command, mode }) {
            const srcPath = path.resolve(__dirname, '../src')
            const srcDirs = fs.readdirSync(srcPath).filter(dirname => {
                return fs.statSync(path.resolve(srcPath, '.', dirname)).isDirectory()
            });
            console.log(srcDirs)

            config.resolve = Object.assign({}, config.resolve, {
                alias: srcDirs.reduce((alias, dirname) => {
                    alias[`@${dirname}`] = `./src/${dirname}/`
                    return alias
                }, { '@': './src/' })
            })

            // console.log(config)
        }
    }
}