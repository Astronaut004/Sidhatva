// import { transporter } from "./emailTransporter.js";
import { transporter } from "./emailTransporter.js";

export const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"Sidhatva" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verification Code - Sidhatva",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #374151; background-color: #f0f9ff; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 600; letter-spacing: 1px;">Sidhatva</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 5px 0 0 0;">Transform Your Living Space</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Account Verification Required</h2>
            <p style="color: #4b5563; font-size: 16px; margin-bottom: 25px;">We've received a request to verify your account. Please use the code below:</p>

            <!-- OTP -->
            <div style="text-align: center; margin: 35px 0;">
              <div style="display: inline-block; background: #f0f9ff; border: 2px dashed #0ea5e9; border-radius: 12px; padding: 20px 30px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; font-weight: 500;">Verification Code</p>
                <div style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; color: #0284c7; letter-spacing: 4px;">${otp}</div>
              </div>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you didn't request this code, ignore this email. Otherwise, use it within <strong>5 minutes</strong>.
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 5px 0;">© ${new Date().getFullYear()} Sidhatva Furniture Pvt. Ltd. All rights reserved.</p>
            <p style="color: #d1d5db; font-size: 11px; margin: 0;">This is an automated message. Please do not reply.</p>
          </div>
        </div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions).catch(err => {
    console.error("Failed to send OTP:", err);
  });
};