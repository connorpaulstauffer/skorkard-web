process.env.NODE_ENV = 'development'

import Koa from 'koa'
import webpack from 'webpack'
import convert from 'koa-convert'
import devMiddleware from 'koa-webpack-dev-middleware'
import hotMiddleware from 'koa-webpack-hot-middleware'

import config from './dev.config'

const app = new Koa()
const compiler = webpack(config.webpack)

app.use(convert(devMiddleware(compiler, config.server.options)))
app.use(convert(hotMiddleware(compiler)))

app.listen(config.server.port, '0.0.0.0', () => {
  console.log(`webpack-dev-server listening on port ${config.server.port} 🚀`)
})