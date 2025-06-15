const asyncHandler = require("express-async-handler");
const Habit = require("../models/Habit");

exports.createHabit = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }
  const habit = await Habit.create({
    title,
    description,
    user: req.user.id,
    streak: 0,
    lastCompleted: null,
  });
  res.status(201).json(habit);
});

exports.getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(habits);
});

exports.updateHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }
  if (habit.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }
  const updated = await Habit.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, description: req.body.description },
    { new: true }
  );
  res.json(updated);
});

exports.deleteHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }
  if (habit.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }
  await habit.deleteOne();
  res.json({ message: "Habit deleted" });
});

exports.completeHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }
  if (habit.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  if (habit.lastCompleted && habit.lastCompleted >= yesterday) {
    habit.streak += 1;
  } else {
    habit.streak = 1;
  }
  habit.lastCompleted = now;
  const updated = await habit.save();
  res.json(updated);
});
