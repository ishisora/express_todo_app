const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        req.logout(err => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        })
    } else{
        res.redirect('/');
    }
});

module.exports = router;
