import nodemailer from 'nodemailer';

export const sendOtpEmail = async (toEmail, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

const mailOptions = {
  from: `"Sidhatva" <${process.env.EMAIL_USER}>`,
  to: toEmail,
  subject: "Verification Code - Sidhatva",
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6b4423 0%, #8d6e63 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 300; letter-spacing: 1px;">
            Sidhatva
          </h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 5px 0 0 0;">
            Premium Furniture & Interior Solutions
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #2c3e50; font-size: 24px; margin: 0 0 20px 0; font-weight: 400;">
            Account Verification Required
          </h2>
          
          <p style="color: #555; font-size: 16px; margin-bottom: 25px;">
            Hello,
          </p>
          
          <p style="color: #555; font-size: 16px; margin-bottom: 25px;">
            We've received a request to verify your account. Please use the verification code below to complete your authentication:
          </p>
          
          <!-- OTP Container -->
          <div style="text-align: center; margin: 35px 0;">
            <div style="display: inline-block; background: #f8f9fa; border: 2px dashed #8d6e63; border-radius: 8px; padding: 20px 30px;">
              <p style="color: #666; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">
                Verification Code
              </p>
              <div style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; color: #6b4423; letter-spacing: 4px; margin: 0;">
                ${otp}
              </div>
            </div>
          </div>
          
          <!-- Important Notes -->
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; margin: 25px 0; border-radius: 4px;">
            <p style="color: #856404; font-size: 14px; margin: 0; font-weight: 500;">
              ⚠️ Important Security Information:
            </p>
            <ul style="color: #856404; font-size: 14px; margin: 10px 0 0 0; padding-left: 20px;">
              <li>This code expires in <strong>5 minutes</strong></li>
              <li>Use this code only on our official website or app</li>
              <li>Never share this code with anyone</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            If you didn't request this verification code, please ignore this email and ensure your account is secure. 
            If you're concerned about unauthorized access, please contact our support team immediately.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              Need help? 
              <a href="mailto:support@sidhatva.com" style="color: #8d6e63; text-decoration: none;">Contact Support</a>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #888; font-size: 12px; margin: 0 0 5px 0;">
            © ${new Date().getFullYear()} Sidhatva Furniture Pvt. Ltd. All rights reserved.
          </p>
          <p style="color: #aaa; font-size: 11px; margin: 0;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
        
      </div>
      
      <!-- Email Client Compatibility -->
      <div style="text-align: center; padding: 20px;">
        <p style="color: #aaa; font-size: 11px;">
          Having trouble viewing this email? Please ensure images are enabled in your email client.
        </p>
      </div>
    </div>
  `,
};

  await transporter.sendMail(mailOptions);
};

