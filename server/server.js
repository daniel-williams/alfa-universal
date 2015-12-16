/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import routes from '../common/routes';

import config from '../webpack.config.js';


const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
}));
app.use(webpackHotMiddleware(compiler));

// app.get('*', function response(req, res) {
//     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
//     res.end();
// });
app.get('*', (req, res) => {
    match({routes, location: req.url}, (err, redirectLocation, props) => {
        if(err) {
            // oops
            res.status(500).send(err.message);
        } else if(redirectLocation) {
            // we matched a react router redirect
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (!props) {
            // not found
            res.sendStatus(404);
        } else {
            // we matched a react component
            const componentMarkup = renderToString(<RoutingContext {...props} />);

            res.end(renderFullPage(componentMarkup, {}));
        }
    });
});




function renderFullPage(html, initialState) {
  return `
<!doctype html>
<html>
  <head>
    <title>Redux Universal Example</title>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>
`
}


app.listen(port, '127.0.0.1', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});
