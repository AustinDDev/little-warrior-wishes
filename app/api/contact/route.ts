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

    // --- 1️⃣ Create the transporter safely ---
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // --- 2️⃣ Verify transporter before sending (optional but safe) ---
    await transporter.verify();

    // --- 3️⃣ Construct the email ---
    const mailOptions = {
      from: `"Little Warrior Wishes Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER || "littlewarriorwishes@gmail.com",
      subject: `📬 New Contact Form Submission from ${name}`,
      text: `
You have received a new message from the Little Warrior Wishes website.

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    // --- 4️⃣ Send the email ---
    await transporter.sendMail(mailOptions);

    // --- 5️⃣ Save locally for record-keeping ---
    const messagesPath = path.join(process.cwd(), "data", "messages.json");

    let messages: any[] = [];
    try {
      const existing = await fs.readFile(messagesPath, "utf8");
      messages = existing ? JSON.parse(existing) : [];
    } catch {
      messages = [];
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    messages.push(newMessage);
    await fs.mkdir(path.dirname(messagesPath), { recursive: true });
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));

    return NextResponse.json({
      success: true,
      message: "Message sent and saved successfully!",
    });
  } catch (error) {
    console.error("❌ Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to send or save message. Please try again later." },
      { status: 500 }
    );
  }
}
