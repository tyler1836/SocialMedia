const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    updateThought,
    deleteThought
} = require('../controllers/Thoughts');

router
    .route('/')
    .get(getAllThoughts)
    

router
    .route('/:id')
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;