import Link from "next/link"
import Navbar from "@/components/navbar"

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="hero">
        <div className="container text-center">
          <h1 className="title">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="subtitle">A collection of projects I've worked on, showcasing my skills and interests.</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 gap-6">
            <ProjectCard
              title="Human Protein Atlas Classification"
              description="Built a machine learning pipeline to classify protein microscopy images using data from the Human Protein Atlas. Preprocessed multi-channel images with custom one-hot encoding and trained a convolutional neural network using TensorFlow, optimizing data pipelines with tf.data. Evaluated model performance via validation accuracy, achieving 95.72%."
              tags={["Python", "TensorFlow", "NumPy", "Pandas"]}
              date="January 2025"
              github="https://github.com/Anthony-PB/ML_notebooks"
            />

            <ProjectCard
              title="Book Tracker"
              description="Enabled streamlined book, author, and genre management, measured by prototype tests showing 30% faster task completion, by developing a modular React front-end. Validated reliable CRUD functionality through unit and integration tests by designing and iterating Express.js APIs with MongoDB schemas."
              tags={["MongoDB", "Express.js", "React.js", "Node.js"]}
              date="September 2024 - Present"
              github="https://github.com/Anthony-PB/bookTracker"
            />

            <ProjectCard
              title="3D N-Body Gravity Simulation"
              description="We focused on building a robust physics sandbox with pre-configured 
scenarios rather than free-form body placement. Our final system features five distinct scenarios 
(Three-Body Problem, Randomized 3-Body, Binary Star, Solar System, and Collision Course), 
with real-time 3D visualization with camera controls, interactive parameter editing through a 
sidebar interface, collision detection with an animation, and an adjustable simulation speed. "
              tags={["Ocaml", "Dune"]}
              date="November 2025 - December 2025"
              github="https://github.com/Anthony-PB/CS3110MP"
            />

            <ProjectCard
              title="Prakriti: Feeding the Future"
              description="Developed software modules and deployed the website for Prakriti, a prototype IoT solution to curb rice crop burning in India (responsible for 86 million tonnes of CO2 emissions annually). Collaborated on design and development, helping secure a $3,000 award at the Cornell Digital Ag Hackathon."
              tags={["Arduino", "React", "JavaScript", "HTML/CSS", "Netlify"]}
              date="February 2024"
              github="https://github.com/NicholasChanng/prakriti"
              liveDemo="https://prakriti-hack.netlify.app/"
            />
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

function ProjectCard({
  title,
  description,
  tags,
  date,
  github,
  liveDemo,
}: {
  title: string
  description: string
  tags: string[]
  date: string
  github: string
  liveDemo?: string
}) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="project-meta">
          <h3 className="project-title">{title}</h3>
          <span className="badge badge-outline">{date}</span>
        </div>

        <p className="project-description">{description}</p>

        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-buttons">
          <Link href={github} target="_blank" className="btn btn-outline">
            <GithubIcon />
            GitHub
          </Link>
          {liveDemo && (
          <Link href={liveDemo} target="_blank" className="btn btn-outline">
            <ExternalLinkIcon />
            Live Demo
          </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  )
}
