const mongoose = require('mongoose');

// Schema for personal details of the applicant
const personalDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name of the applicant
  age: { type: Number, required: true }, // Age of the applicant
  email: { type: String, required: true }, // Contact email address
});

// Schema for income details
const incomeSchema = new mongoose.Schema({
  source: { type: String, required: true }, // Source of income (e.g., salary, business)
  amount: { type: Number, required: true }, // Amount of income
  date: { type: Date, required: true }, // Date when income was received
});

// Schema for expense details
const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true }, // Description of the expense
  amount: { type: Number, required: true }, // Amount spent
  date: { type: Date, required: true }, // Date when expense occurred
});

// Schema for asset details
const assetSchema = new mongoose.Schema({
  description: { type: String, required: true }, // Description of the asset (e.g., property, car)
  value: { type: Number, required: true }, // Estimated value of the asset
});

// Schema for liability details
const liabilitySchema = new mongoose.Schema({
  description: { type: String, required: true }, // Description of the liability (e.g., loan, mortgage)
  amount: { type: Number, required: true }, // Amount owed
});

// Main application schema that combines all other schemas
const appSchema = new mongoose.Schema({
  personalDetails: personalDetailsSchema, // Embedded personal details
  income: [incomeSchema], // Array of income entries
  expenses: [expenseSchema], // Array of expense entries
  assets: [assetSchema], // Array of asset entries
  liabilities: [liabilitySchema], // Array of liability entries
});

// Create Mongoose model for applications collection
const Applications = mongoose.model('applications', appSchema);

module.exports = Applications;
