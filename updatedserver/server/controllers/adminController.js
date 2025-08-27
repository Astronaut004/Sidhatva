import asyncHandler from '../utils/asyncHandler.js';
import * as adminService from '../services/adminService.js';
import ApiResponse from '../utils/apiResponse.js';

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getAllUsers();
  res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully."));
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedUser = await adminService.updateUser(id, updateData);
  res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully."));
});

export default { getAllUsers, updateUser };