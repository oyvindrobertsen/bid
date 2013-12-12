
/*
 * GET main application page, entry point for Angular app.
 */

exports.home = function (req, res) {
  res.render('index.html');
};

exports.login = function (req, res) {
    res.render('login.html');
};

exports.register = function (req, res) {
    res.render('register.html');
}

exports.app = function (req, res) {
    res.render('app.html');
};
