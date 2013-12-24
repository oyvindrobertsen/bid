/*
 * Serve JSON to our AngularJS client
 */
var mongodb = require('mongodb');
var Server = mongodb.Server,
    Db = mongodb.Db,
    BSON = mongodb.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('bid', server, {safe: false});

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to the bid database!");
    }
});


/*
 * Sessions API
 */

exports.getSessions = function(req, res) {
    db.collection('bid_sessions', function (err, collection) {
        collection.find({user_id : req.user._id}).toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.addSession = function(req, res) {
    db.collection('bid_sessions', function(err, sessioncollection) {
        sessioncollection.insert({user_id: req.user._id, name: req.body.name, description: req.body.description, participants: []});
        res.send(200, {});
    });
};

exports.getSessionById = function(req, res) {
    var id = req.params.id;
    db.collection('bid_sessions', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id), user_id: req.user._id}, function(err, item) {
            res.send(item);
        });
    });
};

/*
 * Participants API
 * The participants of a session are regular users added into the context of a session, so
 * an API separate from the regular users-API is convenient.
 */

exports.getParticipantsBySession = function(req, res) {
    db.collection('bid_sessions', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(req.body.session_id)}, function(err, session) {
            res.send(session.participants);
        });
    });
};

exports.addParticipantToSession = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.insert({name: req.body.name, username: req.body.email, type: 'participant'});
        collection.findOne({username: req.body.email}, function(err, user) {
            db.collection('bid_sessions', function(err, sessioncollection) {
                sessioncollection.update(
                        {_id: new BSON.ObjectID(req.body.session_id)},
                        {$addToSet: {participants: {user_id: user._id, curr_bid: 0}}}
                    );
                res.send(200, {});
            });
        });
    });    
};

/*
 * User API
 */
exports.getUserById = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.findOne({_id: new BSON.ObjectID(req.params.id)}, function(err, user) {
            res.send(user);
        })
    });
};
