const express = require('express')
const router = express.Router()
const {
    getAllTasks,
    getTasksSortedByPriority,
    getTasksSortedByCategory,
    getTasksByPriority,
    getTasksByCategory,
    getTask,
    addTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')
const { validateFields } = require('../middlewares/validateFields')

router.get('/:id', auth, getTask)
router.get('/', auth, getAllTasks)
router.get('/', auth, getTasksSortedByCategory)
router.get('/', auth, getTasksSortedByPriority)
router.get('/:category', auth, getTasksByCategory)
router.get('/:priority', auth, getTasksByPriority)
router.post(
    '/',
    [
        check('title', 'The title field is required').not().isEmpty(),
        check('description', 'The description field is required').not().isEmpty(),
        validateFields,
    ],
    addTask
)
router.put('/:id', auth, updateTask)
router.delete('/:id', auth, deleteTask)

module.exports = router