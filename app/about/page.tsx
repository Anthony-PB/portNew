import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="hero">
        <div className="container text-center">
          <h1 className="title">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="subtitle">
            Computer Science student and tech enthusiast passionate about building innovative solutions.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <div className="profile-image">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Profile"
                  width={320}
                  height={320}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div className="about-content">
              <h2 className="about-title">Anthony Paredes</h2>
              <p className="text-muted">
                I'm a Computer Science student at Cornell University with a passion for technology and problem-solving.
                My journey in tech began with a curiosity about how software works, which has evolved into a deep
                interest in building applications that solve real-world problems.
              </p>
              <p className="text-muted">
                I enjoy working on projects that challenge me to learn new technologies and approaches. Whether it's
                developing machine learning models, building full-stack applications, or creating mobile apps, I'm
                always eager to expand my skill set.
              </p>
              <Link href="/files/resume.pdf" className="btn btn-primary w-fit">
                <DownloadIcon />
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section">
        <div className="container">
          <h2 className="title">Education</h2>
          <p className="subtitle">My academic background</p>

          <div className="card">
            <div className="card-content">
              <div className="flex gap-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  <GraduationCapIcon />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Cornell University - College of Engineering</h3>
                    <span className="badge badge-outline">2023 - 2027</span>
                  </div>
                  <p className="text-muted">Bachelor of Engineering in Computer Science</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Relevant Coursework:</h4>
                    <p className="text-sm text-muted">
                      Intro CS: Design & Development (Python), Object-Oriented Programming and Data Structures (Java),
                      Intro to Android Development (Kotlin), Foundations of AI Reasoning and Decision-Making (Python),
                      Introduction to Analysis of Algorithms, Embedded Systems (C, ASM)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Involvements Section */}
      <section className="section">
        <div className="container">
          <h2 className="title">Campus Involvements</h2>
          <p className="subtitle">My activities and interests at Cornell</p>

          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <h3 className="text-xl font-semibold mb-3">Cornell Cybersecurity Club</h3>
                <p className="text-muted">
                  Active member preparing for competitions, and one of the IVYSEC representatives for the club.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-xl font-semibold mb-3">Gaming</h3>
                <p className="text-muted">
                  BrawlStars Club member participating in community events and collaborative gaming sessions (Mythic 3
                  Rank). Competitive First-Person Shooter player (Valorant Platinum rank).
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-xl font-semibold mb-3">Other Activities</h3>
                <p className="text-muted">
                  Archery Club occasional participant in club practice. Fitness enthusiast regularly working out to
                  maintain health and challenge personal fitness goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Courses Section */}
      <section className="section">
        <div className="container">
          <h2 className="title">Certifications & Courses</h2>
          <p className="subtitle">Continuous learning and skill development</p>

          <div className="card">
            <div className="card-content">
              <ul className="list">
                <li className="list-item">HarvardX: CS50's Introduction to Databases with SQL (in progress)</li>
                <li className="list-item">CYB101 — Intro to Cybersecurity (CodePath Spring 2025)</li>
                <li className="list-item">CYB102 — Intro to Cybersecurity (CodePath Summer 2025)</li>
              </ul>
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
            <Link href="/contact" className="btn btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  )
}

function GraduationCapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
  )
}
