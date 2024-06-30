const express = require('express');
const router = express();
const {
  getNominations,
  getCourse,
  addNomination,
  updateCourse,
  removeCourse,
} = require('../../controllers/nominationController');

router.get('/', getNominations);
router.get('/:id', getCourse);
router.post('/', addNomination);
router.put('/:id', updateCourse);
router.delete('/:id', removeCourse);

module.exports = router;
