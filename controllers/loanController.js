// controllers/loanController.js
const Loans = require('../models/Loans');

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loans.find()
      .populate({ path: 'book', select: 'title' })
      .populate({ path: 'borrower', select: 'first_name last_name' });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loans.findById(req.params.id)
      .populate({ path: 'book', select: 'title' })
      .populate({ path: 'borrower', select: 'first_name last_name' });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const newLoan = new Loans(req.body);
    const saved = await newLoan.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const updated = await Loans.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Loan not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const removed = await Loans.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Loan not found' });
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
