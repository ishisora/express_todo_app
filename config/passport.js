const passport = require('passport');
const LocalStrategy = require('passport-local');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const session = require('express-session');
const secret = 'secretghoapiejrfio';

module.exports = function (app) {
    passport.serializeUser(function (user, done) {
        console.log('serializeUser');
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        console.log('deserializeUser');
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, function (username, password, done) {
        knex('users')
            .where({
                name: username,
            })
            .select('*')
            .then(async function (results) {
                if (results.length === 0) {
                    return done(null, false, { message: 'Invalid User' });
                } else if (await bcrypt.compare(password, results[0].password)) {
                    console.log(results);
                    return done(null, results[0]);
                } else {
                    return done(null, false, { message: 'Invalid User' });
                }
            })
            .catch(function (err) {
                console.error(err);
                return done(null, false, { message: err.toString() });
            });
    }
    ));

    app.use(
        session({
            name: 'session',
            secret: secret, // セッション暗号化のためのキー
            resave: false, // セッションが変更されていなくても保存する場合は true
            saveUninitialized: false, // 初期化されていないセッションを保存する場合は true
            cookie: {
                maxAge: 24 * 60 * 60 * 1000, // クッキーの有効期限 (24時間)
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
};
