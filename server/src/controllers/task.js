const mongoose = require('mongoose')
const Task = require('../../models/task')

//get all
const getAll = async (req, res) => {
    const User_id = req.user.id
    const tasks = await Task.find({ User_id }).sort({ createdAt: -1 })
    res.status(200).json(tasks)
}

//ambil sesuai kategori
const getByCategory = async (req, res) => {
    const { categoryID } = req.params
    const tasks = await Task.find({ category_id: categoryID }).sort({ createdAt: -1 })
    res.status(200).json(tasks)
}

//ambil task sesuai id
const getTask = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such task' })
    }
    const task = await Task.findById(id)
    if (!task) {
        return res.status(404).json({ err: 'No such task' })
    }
    res.status(200).json(task)
}

//buat task baru
const createTask = async (req, res) => {
    const { title, category_id } = req.body
    try {
        const User_id = req.user.id
        const task = await Task.create({
            title, is_active: true, category_id, User_id
        })
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

//hapus task
const deleteTask = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such task' })
    }
    const task = await Task.findOneAndDelete({ _id: id })
    if (!task) {
        return res.status(404).json({ err: 'No such task' })
    }
    res.status(200).json(task)

}

//update task
const updateTask = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such task' })
    }
    const task = await Task.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!task) {
        return res.status(404).json({ err: 'No such task' })
    }
    res.status(200).json(task)
}

module.exports = { getAll, getByCategory, getTask, createTask, deleteTask, updateTask }
