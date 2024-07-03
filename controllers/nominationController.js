const Nomination = require('../models/nominationModel');

const getNominations = async (req, res) => {
  try {
    const nominations = await Nomination.find();
    res.status(200).json({ nominations, code: 200 });
  } catch (error) {
    res.status(500).json({ msg: error.message, code: 500 });
  }
};

const getNomination = async (req, res) => {
  try {
    const { id } = req.params;
    const nomination = await Nomination.findById(id);
    res.status(200).json(nomination);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const addNomination = async (req, res) => {
  const { nomineeName, field, category, userEmail } = req.body;
  try {
    const existingNomination = await Nomination.findOne({
      nomineeName,
      field,
      category,
      userEmail,
    });

    if (existingNomination) {
      return res.status(400).json({
        msg: 'You have already nominated this person in this field and category.',
        code: 400,
      });
    }

    const nomination = await Nomination.create(req.body);
    res.status(200).json({ nomination, code: 200 });
  } catch (error) {
    res.status(500).json({ msg: error.message, code: 500 });
  }
};

const removeNomination = async (req, res) => {
  try {
    const { id } = req.params;
    const nomination = await Nomination.findById(id);

    if (!nomination) {
      return res.status(404).json({ msg: 'No such course found' });
    }
    await findByIdAndDelete(id);
    const nominations = await Nomination.find();
    res
      .status(200)
      .json({ nominations, msg: 'Member deleted successfully', code: 200 });
  } catch (error) {
    res.status(500).json({ msg: error.message, code: 500 });
  }
};

module.exports = {
  getNominations,
  getNomination,
  addNomination,
  removeNomination,
};
