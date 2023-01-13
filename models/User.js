const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('User', userSchema)