const router = require('express').Router();
const {
    getUsers,
    createUser,
    addFriend,
    deleteFriend,
    updateUser,
    deleteUser,
    getUserById
} = require('../controllers/Users');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);
module.exports = router;