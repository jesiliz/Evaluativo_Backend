const express = require('express');

const usersController = require('../controllers/userController');
const usersValidator = require ('../validation/usersValidator');
const validator = require('express-joi-validation').createValidator();

const routes = (User) => {
    const userRouter = express.Router();
    const { getUsers, postUsers, getUserById, getUsersByUserName ,putUsers, deleteUserById, userLogin} = usersController(User);

    userRouter.route('/users')
        .get(getUsers)
        .post(validator.body(usersValidator),postUsers)

    userRouter.route('/users/:userId')
        .get(getUserById)
        .put(putUsers)
        .delete(deleteUserById)

    userRouter.route('/users/:userName')
        .get(getUsersByUserName)

    userRouter.route('/users/login')
        .post(userLogin)
    
    return userRouter;
}
module.exports = routes;