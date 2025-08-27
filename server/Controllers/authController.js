import asyncHandler from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';
import generateToken from '../utils/generateToken.js';
import ApiResponse from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  const newUser = await authService.register({ email, password, firstName, lastName, phone });
  const token = generateToken({ id: newUser.id, role: newUser.role });
  res.status(201).json(new ApiResponse(201, { user: newUser, token }, 'User registered successfully.'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  const token = generateToken({ id: user.id, role: user.role });
  res.status(200).json(new ApiResponse(200, { user, token }, 'Login successful.'));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(new ApiResponse(200, user));
});

export default { registerUser, loginUser, getCurrentUser };

