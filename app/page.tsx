import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="badge badge-outline">Computer Science Student</span>
            <h1 className="hero-title">
              Anthony <span className="gradient-text">Paredes-Bautista</span>
            </h1>
            <p className="hero-description">
              Tech enthusiast and aspiring software engineer with a passion for building innovative solutions.
            </p>
            <div className="hero-buttons">
              <Link href="/projects" className="btn btn-primary">
                View Projects
                <ChevronRight />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>
            <div className="social-links">
              <Link href="https://github.com/Anthony-PB" target="_blank" className="btn btn-icon btn-outline">
                <GithubIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anthony-paredes-bautista-pb/"
                target="_blank"
                className="btn btn-icon btn-outline"
              >
                <LinkedinIcon />
              </Link>
              <Link href="mailto:anthonyparedesb0@gmail.com" className="btn btn-icon btn-outline">
                <MailIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="title">Featured Projects</h2>
            <p className="subtitle">Some of my recent work</p>
          </div>

          <div className="grid grid-3">
            <ProjectCard
              title="Human Protein Atlas Classification"
              description="Machine learning pipeline to classify protein microscopy images using TensorFlow and Python, achieving 95.72% validation accuracy."
              tags={["Python", "TensorFlow", "NumPy", "Pandas"]}
              image="/project-images/protein_cell.jpg" // Uncomment when you have the image
              projectUrl="https://github.com/Anthony-PB/ML_notebooks"
            />
            <ProjectCard
              title="Book Tracker"
              description="Full-stack web application for managing a bookstore using the MERN stack with RESTful APIs, showing 30% faster task completion."
              tags={["MongoDB", "Express.js", "React.js", "Node.js"]}
              // image="/project-images/book-tracker.png" // Uncomment when you have the image | may take a while for this one
              projectUrl="https://github.com/Anthony-PB/bookTracker"
            />
            <ProjectCard
              title="Prakriti: Feeding the Future"
              description="IoT solution to curb rice crop burning in India, securing a $3,000 award at the Cornell Digital Ag Hackathon."
              tags={["Arduino", "React", "JavaScript", "HTML/CSS"]}
              image="/project-images/prakriti.png" // Uncomment when you have the image
              projectUrl="https://prakriti-hack.netlify.app/"
            />
          </div>

          <div className="text-center mt-4">
            <Link href="/projects" className="btn btn-outline">
              View All Projects
              <ChevronRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="title">Skills & Technologies</h2>
            <p className="subtitle">Tools and technologies I work with</p>
          </div>

          <div className="grid grid-4">
            <SkillCategory
              title="Languages"
              skills={["Python", "Java", "JavaScript", "Kotlin", "C", "HTML/CSS", "Lua", "Assembly"]}
            />
            <SkillCategory title="Frameworks" skills={["React.js", "Express.js", "TensorFlow", "JUnit"]} />
            <SkillCategory title="Libraries" skills={["NumPy", "Pandas", "Jetpack Compose"]} />
            <SkillCategory title="Tools" skills={["Git", "GitHub", "MongoDB", "Node.js", "Docker"]} />
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="about-title">About Me</h2>
              <p className="text-muted">
                Computer Science student at Cornell University with a passion for technology and problem-solving. I
                enjoy building applications that solve real-world problems and continuously learning new technologies.
              </p>
              <p className="text-muted">
                When I'm not coding, you can find me working out, playing video games, or participating in cybersecurity
                competitions.
              </p>
              <Link href="/about" className="btn btn-outline w-fit">
                Learn More
                <ChevronRight />
              </Link>
            </div>
            <div className="about-image">
              <div className="profile-image">
                <Image
                  src="/placeholder.svg?height=256&width=256"
                  alt="Profile"
                  width={256}
                  height={256}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
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
              <Link href="https://github.com/Anthony-PB" target="_blank" className="btn btn-icon btn-outline">
                <GithubIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anthony-paredes-bautista-pb/"
                target="_blank"
                className="btn btn-icon btn-outline"
              >
                <LinkedinIcon />
              </Link>
              <Link href="mailto:anthonyparedesb0@gmail.com" className="btn btn-icon btn-outline">
                <MailIcon />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ProjectCard({ 
  title, 
  description, 
  tags, 
  image, 
  imageAlt, 
  projectUrl = "#" 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  image?: string; 
  imageAlt?: string; 
  projectUrl?: string;
}) {
  return (
    <div className="card">
      <div className="project-image">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || `${title} preview`}
            width={400}
            height={300}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className="transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <ExternalLinkIcon />
        )}
      </div>
      <div className="card-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
        <Link href={projectUrl} className="btn btn-outline w-full">
          View Project
          <ChevronRight />
        </Link>
      </div>
    </div>
  )
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="skill-title gradient-text">{title}</h3>
        <div className="skill-tags">
          {skills.map((skill) => (
            <span key={skill} className="badge">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  )
}

// Simple icon components
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  )
}