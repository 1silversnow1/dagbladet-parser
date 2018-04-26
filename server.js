import express from 'express';
import path from 'path';
import open from 'open';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const debug = require('debug')('server');

const port = 3000;
const dbPath = 'mongodb://localhost/ciclumArticleParser';

const app = express();

mongoose.connect(dbPath);

import { articleRouter } from './server/routes';

// HMR configuration
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('./webpack.config');
    webpackConfig.devtool = 'source-map';
    webpackConfig.entry.unshift('webpack-hot-middleware/client?reload=true');
    const middlewareOptions = {
        stats: { colors: true },
        noInfo: false,
        lazy: false,
        open: false,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost"
        },
        publicPath: webpackConfig.output.publicPath
    };
    const compiler = webpack(webpackConfig);
    const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, middlewareOptions);
    const webpackHotMiddleware = require('webpack-hot-middleware');

    app.use(webpackDevMiddlewareInstance);
    app.use(webpackHotMiddleware(compiler))
}

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/article', articleRouter);
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './src/index.html'));
});

app.listen(port, function (error) {
    if(error) {
        debug(error);
    } else {
        open(`http://localhost:${port}`)
    }
});
