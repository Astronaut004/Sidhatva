// emailTransporter.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    pool: true,            // ✅ reuse connections
    maxConnections: 5,     // how many parallel connections
    maxMessages: 100,      // how many emails per connection
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: true, // default, but good to keep
    },

});