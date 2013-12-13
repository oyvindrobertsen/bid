/*
 * Serve JSON to our AngularJS client
 */
var mongodb = require('mongodb');
var Server = mongodb.Server,
    Db = mongodb.Db,
    BSON = mongodb.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bid', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to the bid database!");
    }
});

exports.findAllSessions = function (req, res) {
    db.collection('bid_sessions', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.findSessionById = function (req, res) {
    var id = req.params.id;
    db.collection('bid_sessions', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

exports.findUsers = function (req, res) {
    db.collection('users', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
}

exports.findUserById = function (req, res) {
    var id = req.params.id;
    db.collection('users', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        })
    });
}

exports.addUser = function (req, res) {
    un = req.body.username;
    pw = req.body.password;
    fn = req.body.first_name;
    if (!un || !pw || !fn) {
        res.redirect('/register');
    }
    db.collection('users', function (err, collection) {
        collection.insert({username: un, password: pw, first_name: fn});
        res.redirect('/login');
    });
}
