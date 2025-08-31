import * as authService from "../services/authService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// export const register = asyncHandler(async (req, res) => {
//     const { email, phone, password, role} = req.body;
//     const result = await authService.registerUser({email, phone, password, role});
//     res.status(201).json(new ApiResponse(201, result, "user Register Succeful"));
// });

export const register = asyncHandler(async (req, res) => {
    const { identifier, password, role } = req.body;

    let email = null;
    let phone = null;

    // Detect if identifier is email or phone
    if (/^\S+@\S+\.\S+$/.test(identifier)) {
        email = identifier;
    } else if (/^\+?\d{10,15}$/.test(identifier)) {
        phone = identifier;
    } else {
        throw new Error("Invalid identifier. Must be a valid email or phone number");
    }

    const result = await authService.registerUser({ email, phone, password, role });
    res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
});


export const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  let email = null;
  let phone = null;

  // Detect if identifier is email or phone
  if (/^\S+@\S+\.\S+$/.test(identifier)) {
    email = identifier;
  } else if (/^\+?\d{10,15}$/.test(identifier)) {
    phone = identifier;
  } else {
    throw new Error("Invalid identifier. Must be a valid email or phone number");
  }

  const result = await authService.loginUser({ email, phone, password });
  res.json(new ApiResponse(200, result, "Login successful"));
});

export const sendOtp = asyncHandler(async (req, res) => {
  const { identifier, purpose } = req.body;
  const result = await authService.sendOtp({ identifier, purpose });
  res.json(new ApiResponse(200, result, "OTP sent successfully"));
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { identifier, otp, purpose, role } = req.body;
  const result = await authService.verifyOtpAndLogin({ identifier, otp, purpose, role });
  res.json(new ApiResponse(200, result, "OTP verified successfully"));
});

export const logout = asyncHandler(async (req, res) => {
  // Assuming you set req.user from JWT middleware
  const userId = req.user?.id;

  const result = await authService.logoutUser({ userId });

  // If token in cookie → clear it
  res.clearCookie("token");

  res.json(new ApiResponse(200, result, "Logout successful"));
});