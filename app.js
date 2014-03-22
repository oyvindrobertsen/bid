/**
 * Module dependencies
 */

var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    routes = require('./routes'),
    api = require('./routes/api'),
    index = require('./routes/index'),
    http = require('http'),
    path = require('path'),
    auth = require('./routes/auth'),
    passwordHash = require('password-hash'),
    request = require('request');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({secret: 'keyboard cat'}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


/**
 * Middleware for ensuring a user is authenticated before
 * allowing him/her to be routed to an authenticated destination.
 * @param   req     request
 * @param   res     response
 * @param   next    the next function
 */
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id , done) {
    auth.findUserById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        auth.findByUsername (username, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + username });
            }
            if (!passwordHash.verify(password, user.password)) {
                return done(null, false, { message: 'Wrong password' });
            }
            return done(null, user);
        });
    }
));

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    console.log("Prod baby!");
}

/**
 * Routes
 */

// serve index and login and stuff
app.get('/home', index.home);
app.get('/login', index.login);
app.get('/register', index.register);
app.post('/login', passport.authenticate('local', {successRedirect: '/app', failureRedirect: '/login', failureFlash: false}));
app.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/home');
});
app.post('/register', auth.addUser);


// App routes
app.get('/app', ensureAuth, index.app);
app.get('/session/:id', ensureAuth, index.app);


// JSON API
app.get('/api/sessions', ensureAuth, api.getSessions);
app.post('/api/sessions', ensureAuth, api.addSession);
app.get('/api/sessions/:id', ensureAuth, api.getSessionById);
app.get('/api/participants', ensureAuth, api.getParticipantsBySession);
app.post('/api/participants', ensureAuth, api.addParticipantToSession);
app.del('/api/participants', ensureAuth, api.removeParticipantFromSession);
app.get('/api/users/:id', ensureAuth, api.getUserById);

// redirect all others to the index (HTML5 history)
app.get('*', index.home);


/**
 * Start Server
 */

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    socket.emit('users', {count: 3});
})
