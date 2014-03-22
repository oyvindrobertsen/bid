var mongodb = require('mongodb'),
    Server = mongodb.Server,
    Db = mongodb.Db,
    BSON = mongodb.BSONPure,
    passwordHash = require('password-hash');

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bid', server, {safe: false});

db.open(function(err, db) {  });

exports.findByUsername = function(username, fn) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, users) {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.username === username) {
                    return fn(null, user);
                }
            }
            return fn(null, null);
        });
    });
}

exports.findUserById = function(id, fn) {
    db.collection('users', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, user) {
            if (user) {
                return fn(null, user);
            }
            return fn(new Error('User ' + id + ' does not exist.'));
        });
    });
}

exports.addUser = function (req, res) {
    var un = req.body.username;
    var pw = req.body.password;
    var n = req.body.first_name;
    if (!un || !pw || !n) {
        res.redirect('/register');
    }
    db.collection('users', function (err, collection) {
        collection.insert({username: un, password: passwordHash.generate(pw), name: n, type: 'host'});
        res.redirect('/login');
    });
}
