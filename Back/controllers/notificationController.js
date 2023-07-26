const { Notification } = require('../models/Notification');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      ...req.body,
    });
    await notification.save();
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single notification by ID
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a notification by ID
const updateNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a notification by ID
const deleteNotificationById = async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({ message: 'Notification deleted', data: deletedNotification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};