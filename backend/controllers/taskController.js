const taskService = require('../services/taskService');

/**
 * @desc    Get all tasks for logged in user
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
    try {
        const { status, priority, page, limit } = req.query;
        const data = await taskService.getTasks(req.user._id, {
            status,
            priority,
            page,
            limit
        });

        res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully',
            data
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        if (!title) {
            res.status(400);
            throw new Error('Task title is required');
        }

        const task = await taskService.createTask({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(
            req.params.id,
            req.user._id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
    try {
        await taskService.deleteTask(req.params.id, req.user._id);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update task status (PATCH)
 * @route   PATCH /api/tasks/:id/status
 * @access  Private
 */
const updateTaskStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!status) {
            res.status(400);
            throw new Error('Status is required');
        }

        const task = await taskService.updateTaskStatus(
            req.params.id,
            req.user._id,
            status
        );

        res.status(200).json({
            success: true,
            message: 'Task status updated successfully',
            data: task
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
};
