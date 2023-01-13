const Task = require("../models/Task")
const bcryptjs = require("bcryptjs")

/**
 * Get user by id
 */
const getTask = async (req, res) => {
    try {
        let task = await Task.findOne({ _id: req.params.id })
        res.status(200).json(task)
    } catch (error) {
        res.status(404).json(error).send("There is no task with this id")
    }
}

/**
 * Get all tasks
 */
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(422).json({ msg: "Sorry, something went wrong" })
    }
}

/**
 * Get all tasks sorted by priority
 */
const getTasksSortedByPriority = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ priority: -1 })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(422).json({ msg: "Sorry, something went wrong" })
    }
}

/**
 * Get all tasks sorted by category
 */
const getTasksSortedByCategory = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ category: 1 })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(422).json({ msg: "Sorry, something went wrong" })
    }
}

/**
 * Get tasks by priority
 */
const getTasksByPriority = async (req, res) => {
    try {
        const priority = req.params.priority;
        const tasks = await Task.find({ priority: priority })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(422).json({ msg: "Sorry, something went wrong" })
    }
}

/**
 * Get tasks by category
 */
const getTasksByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const tasks = await Task.find({ category: category })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(422).json({ msg: "Sorry, something went wrong" })
    }
}

/**
 * Create a task
 */
const addTask = async (req, res) => {
    try {
        let task = new Task(req.body)

        await task.save()

        res.status(201).json({ msg: `Task created` })
    } catch (error) {
        console.log(error)
        res.status(422).json({ msg: "Sorry, something went wrong" })
    }
}

/**
 * Update task by id
 */
const updateTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({ msg: "Task has been updated" })
    } catch (error) {
        res.status(422).json({ msg: "Sorry, something went wrong" })
    }
}

/**
 * Delete task by id
 */
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json({ msg: "Task has been deleted" })
    } catch (error) {
        res.status(404).json(error).send("There is no task with this id")
    }
}

module.exports = {
    getAllTasks,
    getTasksSortedByPriority,
    getTasksSortedByCategory,
    getTasksByPriority,
    getTasksByCategory,
    getTask,
    addTask,
    updateTask,
    deleteTask
}