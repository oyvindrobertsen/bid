/*
 * Serve JSON to our AngularJS client
 */
var mongodb = require('mongodb');
var Server = mongodb.Server,
    Db = mongodb.Db,
    BSON = mongodb.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bid', server, {safe: false});

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
