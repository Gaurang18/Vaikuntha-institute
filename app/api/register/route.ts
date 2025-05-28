import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, college, phone, email, yearOfStudy, question } = data;

    // Create email content
    const emailContent = `
      New Course Registration Request
      
      Name: ${name}
      College/University: ${college}
      Phone: ${phone}
      Email: ${email}
      Year of Study: ${yearOfStudy}
      
      Question:
      ${question}
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'gaurangbansal18@gmail.com',
      subject: 'New Course Registration Request',
      text: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
} 