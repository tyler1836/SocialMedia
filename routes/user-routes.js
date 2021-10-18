const router = require('express').Router();
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/Users');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;