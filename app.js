
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
function ensureAuth (req, res, next) {
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
                        console.log('Weee!');
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
  // TODO
};


/**
 * Routes
 */

// serve index and login and stuff
app.get('/home', index.home);
app.get('/login', index.login);
app.get('/register', index.register);
app.get('/app', ensureAuth, index.app);

app.post('/login', passport.authenticate('local', {successRedirect: '/app', failureRedirect: '/login', failureFlash: false}));
app.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/home');
});

app.post('/register', auth.addUser);

// JSON API
app.get('/api/findAllSessions', ensureAuth, api.findAllSessions);
app.get('/api/findSessionById/:id', ensureAuth, api.findSessionById);

// redirect all others to the index (HTML5 history)
app.get('*', index.home);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
