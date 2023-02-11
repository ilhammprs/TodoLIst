const mongoose = require('mongoose')
const Category = require('../../models/category')

// Get all 
const getAllCate = async (req, res) => {
  const User_id = req.user.id
  const categories = await Category.find({ User_id }).sort({ createdAt: -1 })

  res.status(200).json(categories)
}

// ambil data sesuai id
const getCateById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such category' })
  }
  const category = await Category.findById(id)
  if (!category) {
    return res.status(404).json({ err: 'No such category' })
  }
  res.status(200).json(category)
}

// Buat kategori baru
const createCate = async (req, res) => {
  const { title } = req.body
  try {
    const User_id = req.user.id
    const category = await Category.create({ title, User_id })
    res.status(200).json(category)
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
}

// Update kategori by id
const updateCate = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such category' })
  }
  const category = await Category.findOneAndUpdate({ _id: id }, {
    ...req.body
  })
  if (!category) {
    return res.status(404).json({ err: 'No such category' })
  }
  res.status(200).json(category)
}

// Delete kategori by id
const deleteCate = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such category' })
  }
  const category = await Category.findOneAndDelete({ _id: id })
  if (!category) {
    return res.status(404).json({ err: 'No such category' })
  }
  res.status(200).json(category)
}

module.exports = { getAllCate, getCateById, createCate, updateCate, deleteCate }
