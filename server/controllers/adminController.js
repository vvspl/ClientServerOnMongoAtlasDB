const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get Users (Admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error); // Логирование ошибки для отладки
    res.status(500).json({ message: 'Server error' });
  }
};

// Add User (Admin)
exports.addUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // Создаем нового пользователя
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    // Сохраняем пользователя в базу данных
    await newUser.save();
    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error); // Логирование ошибки для отладки
    res.status(500).json({ message: 'Error adding user' });
  }
};

// Delete User (Admin)
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error); // Логирование ошибки для отладки
    res.status(500).json({ message: 'Error deleting user' });
  }
};
