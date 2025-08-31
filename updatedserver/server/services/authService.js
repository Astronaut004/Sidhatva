import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Otp } from '../models/index.js';
import { generateOtp } from '../utils/otpGenerator.js';
import { Op } from "sequelize";
import { sendOtpEmail } from '../utils/sendEmail.js';


export const registerUser = async ({ email, phone, password, role }) => {
  if (!email && !phone) {
    throw new Error(`Email or phone is required ${email} ${phone}}`);
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    where: {
      ...(email && { email }),
      ...(phone && { phone }),
    },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // If password is provided → hash it
  let hash = null;
  if (password) {
    hash = await bcrypt.hash(password, 10);
  }
  if (!password || password.trim() === "") {
    throw new Error("Password is required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // Validate role (only allow predefined ones)
  const allowedRoles = ['admin', 'user', 'vendor'];
  const finalRole = role && allowedRoles.includes(role) ? role : 'user';

  // Create user
  const user = await User.create({
    email: email || null,
    phone: phone || null,
    password_hash: hash,
    role: finalRole,   // <--- role will be set properly
  });

  // Generate token immediately
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    message: 'User registered successfully',
    token,
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};



export const loginUser = async ({ email, phone, password }) => {
  const user = await User.findOne({
    where: email ? { email } : { phone },
  });
  if (!user) throw new Error(`User not found ${email} ${phone}`);

  const isValid = password ? await bcrypt.compare(password, user.password_hash) : false;
  if (!isValid) throw new Error(`Invalid credentials ${password} ${phone}`);

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user };
};




export const sendOtp = async ({ identifier, purpose }) => {
  // Detect identifier type
  let identifier_type = null;
  if (/^\S+@\S+\.\S+$/.test(identifier)) {
    identifier_type = "email";
  } else if (/^\+?\d{10,15}$/.test(identifier)) {
    identifier_type = "phone";
  } else {
    throw new Error("Invalid identifier. Must be email or phone.");
  }

  // --- Check rate limit (max 3 requests in 3 hours) ---
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

  const otpCount = await Otp.count({
    where: {
      identifier,
      identifier_type,
      purpose,
      created_at: { [Op.gte]: threeHoursAgo }
    }
  });

  if (otpCount >= 3) {
    throw new Error("Max OTP attempts reached. Please try again after 3 hours.");
  }

  // --- Generate new OTP ---
  const otpCode = generateOtp(); // simple 6-digit
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

  await Otp.create({
    identifier,
    identifier_type,
    otp_code: otpCode,   // storing as plain text for now
    purpose,
    expires_at: expiresAt,
  });
  
  if (identifier_type === "email") {
    await sendOtpEmail(identifier, otpCode);
  }



  // TODO: send otpCode via email/SMS
  return { message: "OTP sent successfully", identifier_type, otp: otpCode };
};




export const verifyOtpAndLogin = async ({ identifier, otp, purpose = "login", role = "user" }) => {
  try {
    // Find the OTP record with purpose + still valid
    const otpRecord = await Otp.findOne({
      where: {
        identifier,
        otp_code: otp,
        purpose,
        is_used: false,
        expires_at: { [Op.gt]: new Date() },
      },
      order: [["created_at", "DESC"]],
    });

    if (!otpRecord) {
      throw new Error("Invalid or expired OTP");
    }

    // Check attempts
    if (otpRecord.attempts >= otpRecord.max_attempts) {
      throw new Error("OTP locked due to too many attempts");
    }

    // Wrong OTP case
    if (otpRecord.otp_code !== otp) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      throw new Error("Incorrect OTP");
    }

    // Mark OTP as used
    otpRecord.is_used = true;
    otpRecord.verified_at = new Date();
    await otpRecord.save();

    // Find or create user
    let user = await User.findOne({
      where: otpRecord.identifier_type === "email"
        ? { email: identifier }
        : { phone: identifier },
    });

    if (!user) {
      user = await User.create({
        email: otpRecord.identifier_type === "email" ? identifier : null,
        phone: otpRecord.identifier_type === "phone" ? identifier : null,
        email_verified: otpRecord.identifier_type === "email",
        phone_verified: otpRecord.identifier_type === "phone",
        role: role === "vendor" ? "vendor" : "user",
        last_login_at: new Date(),
      });
    } else {
      if (otpRecord.identifier_type === "email") user.email_verified = true;
      if (otpRecord.identifier_type === "phone") user.phone_verified = true;
      user.last_login_at = new Date();
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Return clean result (not res.json)
    return {
      message: "OTP verified successfully",
      token,
      user: { id: user.id, email: user.email, phone: user.phone, role: user.role },
    };

  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Server error");
  }
};



export const logoutUser = async ({ userId }) => {
  return { message: "Logout successful", userId };
};