const express         = require('express');
const createError     = require('http-errors');
const cookieParser    = require('cookie-parser');
const mongoose        = require('./lib/mongoose');

require('./models');

const userRouter      = require('./routes/user');
const loginRouter     = require('./routes/login');
const logoutRouter    = require('./routes/logout');
const dashboardRouter = require('./routes/dashboard');
const articleRouter   = require('./routes/article');

const app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);

  if (req.method === 'POST') {
    console.log('Request params: ' + JSON.stringify(req.body));
  }

  next();
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/article', articleRouter);
app.get('/', (req, res) => res.send('Hello World!'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, () => console.log(`Listening on port: ${3000}`));