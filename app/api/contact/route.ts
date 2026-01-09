import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create email transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Little Warrior Wishes Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.GMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      text: `
You have received a new message from the Little Warrior Wishes website.

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Save message to local JSON file
    const messagesPath = path.join(process.cwd(), "data", "messages.json");

    const existingData = await fs.readFile(messagesPath, "utf8");
    const messages = existingData ? JSON.parse(existingData) : [];

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    messages.push(newMessage);

    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));

    return NextResponse.json({
      success: true,
      message: "Message sent and saved successfully!",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send or save message." },
      { status: 500 }
    );
  }
}
