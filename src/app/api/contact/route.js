import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { lastName, firstName, phone, email, experience, message } = body;

    if (!lastName || !firstName || !phone || !experience) {
      return NextResponse.json(
        { message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `【応募フォーム】${lastName} ${firstName} 様`,
      text: `
姓: ${lastName}
名: ${firstName}
電話: ${phone}
メール: ${email || '（未入力）'}
美容師歴: ${experience}
不安・メッセージ:
${message || '（未入力）'}
      `.trim(),
      replyTo: email || undefined,
    });

    return NextResponse.json({ message: '送信しました' });
  } catch (error) {
    console.error('Contact mail error:', error);
    return NextResponse.json(
      { message: 'メール送信に失敗しました' },
      { status: 500 }
    );
  }
}