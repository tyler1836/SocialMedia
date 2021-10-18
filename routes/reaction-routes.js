const router = require('express').Router();
const {
    addReaction,
    removeReaction
} = require('../controllers/Reactions');

router
    .route('/:thoughtId/reactions')
    .post(addReaction);
router
    .route('/:thoughtId/reactions/:id')
    .delete(removeReaction)

module.exports = router;