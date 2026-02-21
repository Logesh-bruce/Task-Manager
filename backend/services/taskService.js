const Task = require('../models/Task');

/**
 * Get all tasks for a user with filtering and pagination
 * @param {string} userId - ID of the user
 * @param {Object} queryParams - status, priority, page, limit
 * @returns {Promise<Object>} Tasks and pagination info
 */
const getTasks = async (userId, queryParams) => {
    const { status, priority, page = 1, limit = 10 } = queryParams;

    // Build query
    const query = { user: userId };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    return {
        tasks,
        pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        }
    };
};

/**
 * Create a new task
 * @param {Object} taskData - Task details and userId
 * @returns {Promise<Object>} Created task
 */
const createTask = async (taskData) => {
    return await Task.create(taskData);
};

/**
 * Update a task
 * @param {string} taskId - ID of the task
 * @param {string} userId - ID of the user (for security)
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated task
 */
const updateTask = async (taskId, userId, updateData) => {
    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
        throw new Error('Task not found or unauthorized');
    }

    return await Task.findByIdAndUpdate(taskId, updateData, {
        new: true,
        runValidators: true
    });
};

/**
 * Delete a task
 * @param {string} taskId - ID of the task
 * @param {string} userId - ID of the user
 * @returns {Promise<Object>} Deleted task
 */
const deleteTask = async (taskId, userId) => {
    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
        throw new Error('Task not found or unauthorized');
    }

    await task.deleteOne();
    return task;
};

/**
 * Update task status
 * @param {string} taskId - ID of the task
 * @param {string} userId - ID of the user
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated task
 */
const updateTaskStatus = async (taskId, userId, status) => {
    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
        throw new Error('Task not found or unauthorized');
    }

    task.status = status;
    await task.save();
    return task;
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
};
