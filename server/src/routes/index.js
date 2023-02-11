const express = require('express');
const router = express.Router();

const { 
    getAllCate, 
    getCateById, 
    createCate, 
    updateCate, 
    deleteCate
 } = require('../controllers/category')

 const { 
    getAll, 
    getByCategory, 
    getTask, 
    createTask, 
    deleteTask, 
    updateTask 
 } = require('../controllers/task')

const { register, login, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

// task
router.get('/tasks', auth, getAll);
router.get('/tasks/category/:id', auth, getByCategory);
router.get('/tasks/:id', auth, getTask);
router.post('/tasks', auth, createTask);
router.delete('/tasks/category/:id', auth, deleteTask);
router.patch('/tasks/:id', auth, updateTask);

// category
router.get('/categories', auth, getAllCate)
router.get('/categories/:id', auth, getCateById)
router.post('/categories', auth, createCate)
router.put('/categories/:id', auth, updateCate)
router.delete('/categories/:id', auth, deleteCate)


//auth
router.post('/register', register);
router.post('/login', login);

module.exports = router;