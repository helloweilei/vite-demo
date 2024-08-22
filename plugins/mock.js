import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const VitePluginMock = (options) => {
    const _require = createRequire(
        pathToFileURL(path.resolve(process.cwd(), './index.js')).href
    )
    const mockData = _require(options?.mockPath || './mock/index')

    console.log(mockData)
    return {
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const matchData = mockData.find(data => data.url === req.url &&
                    data.method.toLowerCase() === req.method.toLowerCase()
                )
                console.log('matchData', matchData, req.url, req.method)
                if (matchData) {
                    const responseData = matchData.response()
                    console.log(responseData)
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(responseData))
                } else {
                    next()
                }
            })
        }
    }
}