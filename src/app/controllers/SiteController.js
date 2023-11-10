const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then((docs) => {
                res.render('home', {
                    docs: multipleMongooseToObject(docs),
                });
            })
            .catch(next);
        // res.render('home');
    }
    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
