import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
// https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const { name, email, message } = await request.json()

    // Creating the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    })

    // Email sending logic
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: 'anthonyparedesb0@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}