/*
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
// https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const { name, email, message } = await request.json()

    // Set Up Client
    const oAuth2Client = new google.auth.OAuth2(
      process.env.OAUTH_CLIENTID,
      process.env.OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground' // redirect URI
    )

    oAuth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    })

    const accessTokenResponse = await oAuth2Client.getAccessToken()
    const accessToken = accessTokenResponse?.token

    if (!accessToken) throw new Error('No access token retrieved')

    // Creating the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        //pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
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
*/

// I give up on using auth. I will try to figure it out some other time but using the app pass works for now!

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const { name, email, message } = await request.json()

    // Simple Gmail with App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
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