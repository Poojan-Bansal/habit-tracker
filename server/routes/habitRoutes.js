const express = require('express');
const router = express.Router();
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
} = require('../controllers/habitController');
const { protect } = require('../middleware/verifytoken');

router.post('/', protect, createHabit);
router.get('/', protect, getHabits);
router.put('/:id', protect, updateHabit);
router.delete('/:id', protect, deleteHabit);
router.patch('/:id/complete', protect, completeHabit);

module.exports = router;
