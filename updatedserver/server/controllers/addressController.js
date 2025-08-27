import asyncHandler from '../utils/asyncHandler.js';
import * as addressService from '../services/addressService.js';
import ApiResponse from '../utils/apiResponse.js';

const createAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addressData = req.body;
  const newAddress = await addressService.createAddress(userId, addressData);
  res.status(201).json(new ApiResponse(201, newAddress, "Address created successfully."));
});

const getUserAddresses = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addresses = await addressService.getUserAddresses(userId);
  res.status(200).json(new ApiResponse(200, addresses, "Addresses retrieved successfully."));
});

export default { createAddress, getUserAddresses };
