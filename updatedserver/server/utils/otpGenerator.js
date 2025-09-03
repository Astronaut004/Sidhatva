// utils/otpGenerator.js
export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// use crypto