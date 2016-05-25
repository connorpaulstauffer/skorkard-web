import Koa from 'koa'
import swig from 'swig'

const app = new Koa()
const port = 3000

const page = swig.renderFile('app/views/index.html')

app.use(ctx => ctx.body = page)

app.listen(port, '0.0.0.0', () => {
  console.log(`Koa server listening on port ${port} 🚀`)
})