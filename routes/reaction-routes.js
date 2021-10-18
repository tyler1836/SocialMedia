const router = require('express').Router();
const {
    addReaction,
    removeReaction
} = require('../controllers/Reactions');

router
    .route('/:thoughtId')
    .post(addReaction);
router
    .route('/:thoughtId/:id')
    .delete(removeReaction)

module.exports = router;