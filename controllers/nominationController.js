const Nomination = require('../models/nominationModel');

const getNominations = async (req, res) => {
  try {
    const nominations = await Course.find();
    res.status(200).json(nominations);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const addNomination = async (req, res) => {
  try {
    const nomination = await Nomination.create(req.body);
    res.status(200).json(nomination);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ msg: 'No such course found' });
    }
    const updatedCourse = await findByIdAndUpdate(id, req.body);
    res.status(200).json(updateCourse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const removeCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ msg: 'No such course found' });
    }
    const updatedCourse = await findByIdAndDelete(id);
    res.status(200).json(updateCourse);
    const courses = await Member.find();
    res.status(200).json({ msg: 'Member deleted successfully', courses });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getNominations,
  getCourse,
  addNomination,
  updateCourse,
  removeCourse,
};
