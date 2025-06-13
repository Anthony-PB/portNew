"use client"

import Navbar from "@/components/navbar"
import { useState } from 'react'

export default function ContactPage() {
  // State vars
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');


  // e is the Form Event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent Page Ref
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Get form data
    const formData = new FormData(e.currentTarget)
    // This is what we are going to extract from the input fields
    const name = formData.get('name')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const message = formData.get('message')?.toString().trim()
    const data = {
      name: name,
      email: email,
      message: message,
    }
    if (!name || !email || !message) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      alert('Please fill out all fields before submitting.')
      return
    }
    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        e.currentTarget.reset() // Clear the form after submit succ
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="hero">
        <div className="container text-center">
          <h1 className="title">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="subtitle">Have a question or want to work together? Feel free to reach out!</p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="card">
              <div className="card-content">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                {submitStatus == 'success' && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus == 'error' && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    ❌ Failed to send message. Please try again or email me directly.
                  </div>
                )}
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input id="name" name = "name" type="text" placeholder="Your name" className="form-input" required={true}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input id="email" name = "email" type="email" placeholder="Your email" className="form-input" required={true}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea id="message" name = "message" placeholder="Your message" rows={6} className="form-textarea" required={true}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled = {isSubmitting}>
                    <SendIcon />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="contact-info">
                  <div className="contact-item">
                    <MailIcon />
                    <div className="contact-details">
                      <h3>Email</h3>
                      <a href="mailto:anthonyparedesb0@gmail.com">anthonyparedesb0@gmail.com</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <LinkedinIcon />
                    <div className="contact-details">
                      <h3>LinkedIn</h3>
                      <a
                        href="https://www.linkedin.com/in/anthony-paredes-bautista-pb/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        linkedin.com/in/anthony-paredes-bautista-pb
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <GithubIcon />
                    <div className="contact-details">
                      <h3>GitHub</h3>
                      <a href="https://github.com/Anthony-PB" target="_blank" rel="noreferrer">
                        github.com/Anthony-PB
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
                  <p className="text-muted mb-6">
                    I'm currently open to new opportunities and collaborations. Whether you have a project in mind or
                    just want to say hello, I'd love to hear from you!
                  </p>
                  <div className="social-links">
                    <a
                      href="https://github.com/Anthony-PB"
                      target="_blank"
                      className="btn btn-icon btn-outline"
                      rel="noreferrer"
                    >
                      <GithubIcon />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/anthony-paredes-bautista-pb/"
                      target="_blank"
                      className="btn btn-icon btn-outline"
                      rel="noreferrer"
                    >
                      <LinkedinIcon />
                    </a>
                    <a href="mailto:anthonyparedesb0@gmail.com" className="btn btn-icon btn-outline">
                      <MailIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="text-center">
              <span className="footer-logo gradient-text">Anthony Paredes</span>
              <p className="footer-copyright">&copy; {new Date().getFullYear()} • Built with Next.js</p>
            </div>
            <div className="social-links">
              <a
                href="https://github.com/Anthony-PB"
                target="_blank"
                className="btn btn-icon btn-outline"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/anthony-paredes-bautista-pb/"
                target="_blank"
                className="btn btn-icon btn-outline"
                rel="noreferrer"
              >
                <LinkedinIcon />
              </a>
              <a href="mailto:anthonyparedesb0@gmail.com" className="btn btn-icon btn-outline">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}
