import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
// https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const { name, email, message } = await request.json()

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

    // TODO: Send email logic goes here
    
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}