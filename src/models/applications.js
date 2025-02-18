const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

const incomeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const assetSchema = new mongoose.Schema({
  description: { type: String, required: true },
  value: { type: Number, required: true },
});

const liabilitySchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

const appSchema = new mongoose.Schema({
  personalDetails: personalDetailsSchema,
  income: [incomeSchema],
  expenses: [expenseSchema],
  assets: [assetSchema],
  liabilities: [liabilitySchema],
});

const Applications = mongoose.model('applications', appSchema);

module.exports = Applications;
