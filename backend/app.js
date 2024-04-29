var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');
const http = require('http');
const dotenv = require('dotenv');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var mongoose = require('mongoose')
const cors = require('cors')

dotenv.config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
var corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}
app.use(cors(corsOptions));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false, parameterLimit: 50000}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/userimages', express.static(path.join(__dirname, 'public/upload/images')));

mongoose.connect("mongodb://127.0.0.1:27017/exchangenest");

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const symbols = ['btcusdt@kline_1m'];

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  const subscribe = () => {
    symbols.forEach(symbol => {
      const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}`;
      const wsInstance = new WebSocket(wsUrl);

      wsInstance.on('message', (data) => {
        ws.send(data);
      });

      wsInstance.on('error', (error) => {
        console.error('WebSocket error:', error);
      });

      wsInstance.on('close', () => {
        console.log('WebSocket connection closed. Reconnecting...');
        setTimeout(subscribe, 5000); // Attempt to reconnect after 5 seconds
      });
    });
  };

  subscribe();

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket Server started on port 8080');
});

module.exports = app;