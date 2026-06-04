import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      lastName,
      firstName,
      phone,
      email,
      experience,
      desiredJobs,
      workPreference,
      message,
    } = body;

    if (!lastName || !firstName || !phone || !experience) {
      return NextResponse.json(
        { message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CONTACT_TO_EMAIL) {
      console.error('Missing environment variables:', {
        GMAIL_USER: !!process.env.GMAIL_USER,
        GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
        CONTACT_TO_EMAIL: !!process.env.CONTACT_TO_EMAIL,
      });

      return NextResponse.json(
        { message: 'メール設定が不足しています' },
        { status: 500 }
      );
    }

    const selectedJobs =
      Array.isArray(desiredJobs) && desiredJobs.length > 0
        ? desiredJobs.join('、')
        : '（未選択）';

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
希望職種: ${selectedJobs}

働く時間・日数の希望:
${workPreference || '（未入力）'}

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