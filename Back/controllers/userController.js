const  User  = require('../models/User');
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt');
// Create a new user
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});
const sendCode = async (req, res) => {

  try{
    const { email} = req.body;
    console.log(email)
       code = Math.floor(100000 + Math.random() * 900000).toString();
   
   
       const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: 'Two-factor authentication code',
      text: `Your two-factor authentication code is ${code}. Please enter it on the verification page to complete your login: http://localhost:3000/verify/`,
    };
   // transporter.sendMail(mailOptions);
    res.json(code);
 
  }catch(err)
  {
    console.error(err);
    return{ message: 'Internal server error' };
 
  }
  
}
const senCode = async (req, res) => {

  try{
    const { email} = req.body;
    console.log("entered")
  
      const dev = await User.findOne({username})
      if (!dev) {
        return { message: 'User not found' };
      }
       code = Math.floor(100000 + Math.random() * 900000).toString();
    const newCode = new Code({ userId: dev._id, code });
    await newCode.save();
    
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: username,
      subject: 'Two-factor authentication code',
      text: `Your two-factor authentication code is ${code}. Please enter it on the verification page to complete your login: http://localhost:3000/verify/`,
    };
    await transporter.sendMail(mailOptions);
    
 
  }catch(err)
  {
    console.error(err);
    return{ message: 'Internal server error' };
 
  }
  
}

const createUser = async (req, res) => {
  try {
    const { password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...req.body,
      password : hashedPassword
    });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserLearningPath = async (req, res) => {
  const { userId, learningPathId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the learning path in the user's learning_paths array
    const learningPathIndex = user.learning_paths.findIndex(
      (path) => path.learning_path.toString() === learningPathId
    );

    // If the learning path is found, update its fields
    if (learningPathIndex !== -1) {
      user.learning_paths[learningPathIndex] = req.body;
    } else {
      // If the learning path is not found, add it to the learning_paths array
      user.learning_paths.push(req.body);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted', data: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });


    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
   
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch)
    // If the password doesn't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }else{

    }

    // Password is correct, user is authenticated
   // const vcode = sendCode(user.email); 

    res.json({ message: 'Login successful', user : user});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  sendCode,
  updateUserLearningPath
};