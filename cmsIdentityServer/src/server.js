import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import { configuration } from './config/oidc/configuration';
import Provider from 'oidc-provider';
import SequelizeAdapter from './config/adapter/myAdapter';
import routes from './routes/express';
require('dotenv').config();
//configuration.findAccount = AccountModel.findAccount;

let app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    setTimeout(() => {
        next();
    }, 300);
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const prod = process.env.NODE_ENV === 'production';
if (prod) {
    app.enable('trust proxy');
    provider.proxy = true;

    app.use((req, res, next) => {
        if (req.secure) {
            next();
        } else if (req.method === 'GET' || req.method === 'HEAD') {
            res.redirect(
                url.format({
                    protocol: 'https',
                    host: req.get('host'),
                    pathname: req.originalUrl,
                }),
            );
        } else {
            res.status(400).json({
                error: 'invalid_request',
                error_description: 'do yourself a favor and only use https',
            });
        }
    });
}

viewEngine(app);
try {
    SequelizeAdapter.connect().then((res) => {
        const provider = new Provider(process.env.OIDC_ISSUER, { SequelizeAdapter, ...configuration });

        let port = process.env.PORT || 6969;
        routes(app, provider);
        app.use('/oidc', provider.callback());
        app.listen(port, () => {
            console.log('Backend Nodejs is running on the port : ' + port);
        });
    });
} catch (error) {}
