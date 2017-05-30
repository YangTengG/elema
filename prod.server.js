var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
	req.url = './index.html'
	next()
})

app.use(router)

var appData = require('./data.json')

var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

var apiRoutes = express.Router()
apiRoutes.get('/seller', function(req, res){
  res.json({
    errno: 0,
    data: seller
  })
})
apiRoutes.get('/goods', function(req, res){
  res.json({
    errno: 0,
    data: goods
  })
})
apiRoutes.get('/ratings', function(req, res){
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', apiRoutes);

app.use(express.static('./dist'))

var opn = require('opn')
var webpack = require('webpack')
var webpackConfig = require('./build/webpack.dev.conf')
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var uri = 'http://localhost:' + port
 
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

// module.exports = app.listen(port, function () {
// 	if (err) {
// 		console.log(err)
// 		return
// 	}
// 	console.log('> Listening at ' + uri + '\n')
// })
