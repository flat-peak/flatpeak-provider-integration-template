const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});
const createError = require('http-errors');
const express = require('express');
const requestLogger = require('morgan');
const {create} = require('express-handlebars');
const bodyParser = require('body-parser');
const {logger} = require('./modules/logger');
const {integrateProvider, errorHandler} = require('@flat-peak/express-integration-sdk');
const {authorise, capture, convert, captureExtraAuthData} = require('./modules/provider');
const {setLocalisationMiddleware, locales, DEFAULT_LANG} = require("./modules/localisation/localisation.js");
const app = express();

// view engine setup
const views = path.join(__dirname, 'views');
app.set('views', views);

const hbs = create({
  extname: '.hbs',
  partialsDir: [path.join(views, 'layouts'), path.join(views, 'partials')],
  defaultLayout: 'base',
  helpers: {
    concat: (...args) => {
      args.pop();
      return args.join('');
    },
    interpolate: (string, context) => {
      return string.replace(/\{\{(\w+)}}/g, (_, key) => context.hash[key] || '');
    }
  }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(requestLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(setLocalisationMiddleware());

// The `integrateProvider` router attaches /, /action, /auth_metadata_capture, /consent_capture
// and /api/tariff_plan routes to the baseURL
app.use(integrateProvider({
  pages: {
    auth_metadata_capture: {
      view: 'auth_metadata_capture',
      title: locales[DEFAULT_LANG].connect_account_title,
    },
    consent_capture: {
      view: 'consent_capture',
      title: locales[DEFAULT_LANG].data_sharing_title,
    },
    failed_login: {
      view: 'failed_login',
      title: locales[DEFAULT_LANG].login_error_title,
    },
    // Extra routes
    no_available_tariffs: {
      view: 'no_available_tariffs',
      title: locales[DEFAULT_LANG].tariff_not_found_title,
    },
    multiple_available_tariffs: {
      view: 'multiple_available_tariffs',
      title: locales[DEFAULT_LANG].select_tariff_title,
    },
    mfa_capture: {
      view: 'mfa_capture',
      title: locales[DEFAULT_LANG].one_time_code_title,
    },
  },
  appParams: {
    api_url: process.env.CONNECT_API_URL,
  },
  providerHooks: {
    authorise: authorise,
    captureExtraAuthData: captureExtraAuthData,
    capture: capture,
    convert: convert,
    logger: logger,
  },
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
