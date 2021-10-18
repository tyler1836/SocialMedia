const router = require('express').Router();
const {
    addReaction,
    removeReaction
} = require('../controllers/Reactions');

router
    .route('/:id')
    .post(addReaction)
    .delete(removeReaction)

module.exports = router;