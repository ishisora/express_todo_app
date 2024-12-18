const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next){
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    const userId = req.user.id;
    knex('tasks')
      .select('*')
      .where({user_id: userId})
      .then(function(results){
        console.log(results);
        res.render('index', {
          title: 'Todo App',
          todos: results,
          isAuth: isAuth,
        });
      })
      .catch(function(err){
        console.log(err);
        res.render('index', {
          title: 'Todo App',
          isAuth: isAuth,
        });
      });
  } else {
    res.render('index', {
      title: 'Todo App',
      isAuth: isAuth,
    });
  }
});

router.post('/', function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const todo = req.body.add;
  knex('tasks')
    .insert({user_id: userId, content: todo})
    .then(function(){
      res.redirect('/')
    })
    .catch(function(err){
      console.error(err);
      res.render('index', {
        title: 'Todo App',
        isAuth: isAuth,
      })
    })
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
