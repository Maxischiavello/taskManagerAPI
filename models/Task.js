const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    category: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'in progress'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Task', taskSchema)