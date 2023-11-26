const Course = require('../models/Course');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find(),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([course, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    course: multipleMongooseToObject(course),
                }),
            )
            .catch(next);
    }
    //[GET] /me/trash/courses
    deletedCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((course) =>
                res.render('me/trash-courses', {
                    course: multipleMongooseToObject(course),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
