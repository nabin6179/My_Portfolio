import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import portfolioData from '../portfolio-data.json';
import '../styles.css';

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [heroName, setHeroName] = useState(portfolioData.hero.name.toUpperCase());
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: "Ask me about Nabin's education, work, projects, skills, certifications, labs, or public contact information."
    }
  ]);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setReady(true), reducedMotion ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setHeroName(portfolioData.hero.name.toUpperCase());
      return undefined;
    }

    const finalText = portfolioData.hero.name.toUpperCase();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const start = performance.now();
    const duration = 620;
    let animationId = 0;

    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(progress * finalText.length);
      let output = '';
      for (let index = 0; index < finalText.length; index += 1) {
        const source = finalText[index];
        if (source === ' ') {
          output += ' ';
        } else if (index < revealed) {
          output += source;
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setHeroName(output);
      if (progress < 1) {
        animationId = requestAnimationFrame(frame);
      } else {
        setHeroName(finalText);
      }
    };

    animationId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-ready', ready);
    document.body.classList.toggle('is-booting', !ready);
  }, [ready]);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        }
      },
      { threshold: 0.18 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const supportsPointer = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsPointer) return undefined;

    document.body.classList.add('has-pointer');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      if (cursorDotRef.current && cursorRingRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
        cursorRingRef.current.style.left = `${x}px`;
        cursorRingRef.current.style.top = `${y}px`;
      }
      requestAnimationFrame(tick);
    };

    const over = (event) => {
      document.body.classList.toggle('cursor-hover', Boolean(event.target.closest('a, button, summary, textarea')));
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    document.addEventListener('pointerover', over);
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      document.removeEventListener('pointerover', over);
    };
  }, []);

  useEffect(() => {
    document.title = `${portfolioData.identity.name} - ${portfolioData.identity.headline}`;
  }, []);

  async function askAgent(question) {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error('Agent request failed.');
    }

    return response.json();
  }

  const addMessage = (role, text) => {
    setMessages((current) => [...current, { role, text }]);
  };

  const submitQuestion = async (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    addMessage('user', trimmed);
    setChatInput('');
    try {
      const result = await askAgent(trimmed);
      const responseText = result.source ? `${result.answer}\n\nSOURCE\n${result.source}` : result.answer;
      addMessage('agent', responseText);
    } catch {
      addMessage('agent', 'The agent is unavailable right now. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitQuestion(chatInput);
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'agent',
        text: "Ask me about Nabin's education, work, projects, skills, certifications, labs, or public contact information."
      }
    ]);
  };

  const buildSuggestedQuestions = () => {
    const labels = [];
    if (portfolioData.projects.length) labels.push('What security projects has Nabin worked on?');
    if (portfolioData.skills.length) labels.push('What networking experience does Nabin have?');
    if (portfolioData.certifications.length) labels.push('What certifications has Nabin completed?');
    if (portfolioData.skills.length) labels.push('What tools does Nabin use?');
    if (portfolioData.currentFocus.length) labels.push('What is Nabin currently learning?');
    if (portfolioData.contact.email) labels.push('What contact information is publicly listed?');
    return labels;
  };

  const sourceLink = (file) => `/${encodeURIComponent(file)}`;

  return (
    <>
      <div className="scan-overlay" aria-hidden="true">
        <div className="scan-line"></div>
        <div className="boot-readout">
          <span>SYSTEM INITIALIZING</span>
          <span>IDENTITY NABIN</span>
          <span>DOMAIN SECURITY / NETWORKING</span>
          <span>MODE PORTFOLIO</span>
        </div>
      </div>

      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true"></div>
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true"></div>

      <header className="site-header">
        <a className="brand" href="#top">
          NABIN TIWARI
        </a>
        <button className="nav-toggle" type="button" aria-expanded={navOpen} aria-controls="siteNav" onClick={() => setNavOpen((value) => !value)}>
          MENU
        </button>
        <nav className={`site-nav ${navOpen ? 'is-open' : ''}`} id="siteNav" aria-label="Primary">
          {['ABOUT', 'WORK', 'EXPERIENCE', 'SKILLS', 'LAB', 'AI AGENT', 'CONTACT'].map((item) => (
            <a
              key={item}
              href={`#${item === 'AI AGENT' ? 'agent' : item.toLowerCase().replace(/\s+/g, '')}`}
              onClick={() => setNavOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="status-pill">
          <span className="status-dot" aria-hidden="true"></span>
          <span>{portfolioData.identity.status.toUpperCase()}</span>
        </div>
      </header>

      <main id="app">
        <section className="hero section reveal" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow mono">NABIN // SYSTEM</p>
              <h1 className="hero-name">{heroName}</h1>
              <p className="hero-role">{portfolioData.hero.positioning}</p>
              <p className="hero-intro">{portfolioData.hero.intro}</p>
              <div className="hero-meta">
                <span className="meta-chip">
                  <span className="mono">LOCATION</span>
                  <strong>{portfolioData.identity.location}</strong>
                </span>
                <span className="meta-chip">
                  <span className="mono">STATUS</span>
                  <strong>{portfolioData.identity.status}</strong>
                </span>
                <span className="meta-chip">
                  <span className="mono">FOCUS</span>
                  <strong>{portfolioData.identity.focus.join(' / ')}</strong>
                </span>
              </div>
              <div className="hero-actions">
                <a className="button primary" href={portfolioData.hero.primaryCta.href}>
                  {portfolioData.hero.primaryCta.label.toUpperCase()} →
                </a>
                <a className="button secondary" href={portfolioData.hero.secondaryCta.href}>
                  {portfolioData.hero.secondaryCta.label.toUpperCase()}
                </a>
              </div>
            </div>
            <aside className="hero-panel">
              <div className="panel-card">
                <p className="panel-label mono">AT A GLANCE</p>
                <div className="panel-list">
                  {portfolioData.overview.map((item) => (
                    <article className="overview-item" key={item.label}>
                      <p className="overview-label mono">{item.label}</p>
                      <p className="overview-value">{item.value}</p>
                      <p className="overview-detail">{item.detail}</p>
                      <div className="source-list">
                        {item.source.map((file) => (
                          <a className="source-badge" href={sourceLink(file)} target="_blank" rel="noreferrer" key={file}>
                            {file}
                          </a>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section reveal" id="about">
          <div className="section-head">
            <p className="eyebrow mono">ABOUT</p>
            <h2>WHO I AM, WHAT I DO, WHAT I AM LEARNING</h2>
          </div>
          <div className="about-grid">
            {portfolioData.about.map((item) => (
              <article className="about-card" key={item.title}>
                <p className="card-label mono">{item.title}</p>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-body">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="skills">
          <div className="section-head">
            <p className="eyebrow mono">SKILLS</p>
            <h2>REAL TOOLS, REAL LAB WORK, REAL ADMINISTRATION</h2>
          </div>
          <div className="skills-grid">
            {portfolioData.skills.map((skill) => (
              <SkillCard key={skill.category} skill={skill} />
            ))}
          </div>
        </section>

        <section className="section reveal" id="work">
          <div className="section-head">
            <p className="eyebrow mono">WORK</p>
            <h2>PROJECTS AS MINI CASE STUDIES</h2>
          </div>
          <div className="projects-grid">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.number} project={project} sourceLink={sourceLink} />
            ))}
          </div>
        </section>

        <section className="section reveal" id="experience">
          <div className="section-head">
            <p className="eyebrow mono">EXPERIENCE</p>
            <h2>EDITORIAL TIMELINE</h2>
          </div>
          <div className="timeline">
            {portfolioData.experience.map((item) => (
              <TimelineCard key={item.date + item.role} item={item} sourceLink={sourceLink} />
            ))}
          </div>
        </section>

        <section className="section reveal" id="education">
          <div className="section-head">
            <p className="eyebrow mono">EDUCATION</p>
            <h2>ACADEMIC BASE</h2>
          </div>
          <div className="timeline">
            {portfolioData.education.map((item) => (
              <TimelineCard key={item.date + item.program} item={item} sourceLink={sourceLink} includeImpact={false} />
            ))}
          </div>
        </section>

        <section className="section reveal" id="certifications">
          <div className="section-head">
            <p className="eyebrow mono">CERTIFICATIONS</p>
            <h2>VERIFIED CERTIFICATES AND COMPLETIONS</h2>
          </div>
          <div className="cert-grid">
            {portfolioData.certifications.map((cert) => (
              <CertCard key={cert.name} cert={cert} sourceLink={sourceLink} />
            ))}
          </div>
        </section>

        <section className="section reveal" id="lab">
          <div className="section-head">
            <p className="eyebrow mono">SECURITY LAB</p>
            <h2>CTFS, LABS, AND PRACTICAL LEARNING</h2>
          </div>
          <div className="lab-grid">
            {portfolioData.lab.map((category) => (
              <article className="lab-card" key={category.category}>
                <h3>{category.category}</h3>
                <p className="card-body">Verified practical work in {category.category.toLowerCase()}.</p>
                <ul className="lab-list">
                  {category.items.map((item) => (
                    <li key={item}>
                      <span className="lab-pill">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="focus">
          <div className="section-head">
            <p className="eyebrow mono">CURRENTLY EXPLORING</p>
            <h2>WHAT IS IN MOTION RIGHT NOW</h2>
          </div>
          <div className="focus-layout">
            <svg className="focus-mark" viewBox="0 0 320 160" aria-hidden="true">
              <path d="M20 40 H300 M20 80 H220 M20 120 H260" />
            </svg>
            <div className="focus-grid">
              {portfolioData.currentFocus.map((item) => (
                <article className="focus-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="card-body">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reveal" id="agent">
          <div className="section-head">
            <p className="eyebrow mono">NABIN // AGENT</p>
            <h2>ASK ABOUT THE PORTFOLIO</h2>
          </div>
          <div className="agent-shell">
            <div className="agent-status">
              <span className="status-dot live" aria-hidden="true"></span>
              <span>ONLINE</span>
              <p>Restricted to questions about Nabin, his education, experience, projects, skills, certifications, training, labs, goals, and public contact details.</p>
            </div>
            <div className="agent-chat" aria-live="polite" aria-label="Nabin portfolio agent">
              <div className="chat-log">
                {messages.map((message, index) => (
                  <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                    <span className="label mono">{message.role === 'user' ? 'YOU' : 'NABIN // AGENT'}</span>
                    <div>{message.text}</div>
                  </article>
                ))}
              </div>
              <form className="chat-form" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="chatInput">
                  Ask about Nabin
                </label>
                <textarea
                  id="chatInput"
                  name="question"
                  rows="2"
                  maxLength="500"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Ask about Nabin's work, labs, certifications, or current focus..."
                />
                <div className="chat-actions">
                  <button className="button primary" type="submit">
                    ASK
                  </button>
                  <button className="button secondary" type="button" onClick={resetChat}>
                    CLEAR
                  </button>
                </div>
              </form>
              <div className="suggestions">
                {buildSuggestedQuestions().map((label) => (
                  <button
                    className="source-badge"
                    type="button"
                    key={label}
                    onClick={async () => {
                      setChatInput(label);
                      await submitQuestion(label);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <details className="security-tests">
                <summary>TEST AGENT SECURITY</summary>
                <div className="security-tests-grid">
                  {portfolioData.securityChecks.map((test) => (
                    <SecurityTestCard key={test.label} test={test} onRun={async () => submitQuestion(test.prompt)} />
                  ))}
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="section reveal" id="contact">
          <div className="section-head">
            <p className="eyebrow mono">CONTACT</p>
            <h2>OPEN TO THE RIGHT KIND OF WORK</h2>
          </div>
          <div className="contact-grid">
            <article className="contact-card">
              <p className="contact-label mono">EMAIL</p>
              <p className="contact-value">{portfolioData.contact.email}</p>
              <a className="button secondary" href={`mailto:${portfolioData.contact.email}`}>
                EMAIL
              </a>
            </article>
            <article className="contact-card">
              <p className="contact-label mono">PHONE</p>
              <p className="contact-value">{portfolioData.contact.phone}</p>
              <a className="button secondary" href={`tel:${portfolioData.contact.phone.replace(/\s+/g, '')}`}>
                CALL
              </a>
            </article>
            <article className="contact-card">
              <p className="contact-label mono">LOCATION</p>
              <p className="contact-value">{portfolioData.contact.location}</p>
            </article>
            <article className="contact-card">
              <p className="contact-label mono">PUBLIC LINKS</p>
              <p className="contact-copy">No verified GitHub, LinkedIn, or personal website URL was present in the source files.</p>
              <div className="source-list">
                {portfolioData.contact.publicHandles.map((handle) => (
                  <span className="source-badge" key={handle}>
                    {handle}
                  </span>
                ))}
              </div>
              <p className="contact-copy">{portfolioData.contact.availability}</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p className="mono">NABIN // SYSTEM</p>
        <p>Built from verified source files in this workspace.</p>
      </footer>
    </>
  );
}

function SkillCard({ skill }) {
  const [note, setNote] = useState(skill.summary);

  return (
    <article className="skill-card">
      <div className="skill-header">
        <p className="card-label mono">{skill.category}</p>
        <span className="meta">{skill.summary}</span>
      </div>
      <div className="skill-chips">
        {skill.items.map((item) => (
          <button
            key={item.name}
            type="button"
            className="skill-chip"
            onMouseEnter={() => setNote(item.note)}
            onFocus={() => setNote(item.note)}
            onMouseLeave={() => setNote(skill.summary)}
            onBlur={() => setNote(skill.summary)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="skill-note">{note}</p>
    </article>
  );
}

function ProjectCard({ project, sourceLink }) {
  return (
    <article className="project-card">
      <div className="project-header">
        <div>
          <p className="project-index mono">{project.number}</p>
          <h3 className="project-title">{project.name}</h3>
          <p className="project-status mono">{project.status}</p>
        </div>
      </div>
      <p className="project-blurb">{project.description}</p>
      <ProjectSection title="OBJECTIVE" value={project.objective} />
      <ProjectSection title="IMPLEMENTATION" value={project.implementation.join(' / ')} />
      <ProjectSection title="RESULT" value={project.result} />
      <ProjectSection title="WHAT I LEARNED" value={project.learning} />
      <div className="source-list">
        {project.implementation.map((item) => (
          <span className="tag" key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="source-list">
        {project.sources.map((file) => (
          <a className="source-badge" href={sourceLink(file)} target="_blank" rel="noreferrer" key={file}>
            {file}
          </a>
        ))}
      </div>
    </article>
  );
}

function ProjectSection({ title, value }) {
  if (!value) return null;
  return (
    <div className="project-section">
      <h3>{title}</h3>
      <p className="project-copy">{value}</p>
    </div>
  );
}

function TimelineCard({ item, sourceLink, includeImpact = true }) {
  return (
    <article className="timeline-card">
      <div className="timeline-top">
        <div>
          <p className="timeline-date mono">{item.date}</p>
          <h3 className="timeline-role">{item.role || item.program}</h3>
          <p className="meta">{item.company || item.institution}</p>
        </div>
        {item.location ? <span className="timeline-chip">{item.location}</span> : null}
      </div>
      <div className="timeline-copy">
        {Array.isArray(item.responsibilities) ? (
          <ul>
            {item.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        ) : (
          <p>{item.program}</p>
        )}
        {includeImpact && item.impact ? <p className="card-body">{item.impact}</p> : null}
      </div>
      <div className="source-list">
        {item.sources.map((file) => (
          <a className="source-badge" href={sourceLink(file)} target="_blank" rel="noreferrer" key={file}>
            {file}
          </a>
        ))}
      </div>
    </article>
  );
}

function CertCard({ cert, sourceLink }) {
  return (
    <article className="cert-card">
      <div className="cert-header">
        <div>
          <p className="card-label mono">CERTIFICATE</p>
          <h3 className="cert-name">{cert.name}</h3>
        </div>
        {cert.file ? (
          <a className="button secondary" href={sourceLink(cert.file)} target="_blank" rel="noreferrer">
            VIEW CERTIFICATE
          </a>
        ) : null}
      </div>
      <div className="cert-meta">
        <p>Issuer: {cert.issuer}</p>
        <p>Date: {cert.date}</p>
        {cert.credential ? <p>Credential: {cert.credential}</p> : null}
      </div>
      <div className="source-list">
        {cert.sources.map((file) => (
          <a className="source-badge" href={sourceLink(file)} target="_blank" rel="noreferrer" key={file}>
            {file}
          </a>
        ))}
      </div>
    </article>
  );
}

function SecurityTestCard({ test, onRun }) {
  return (
    <div className="security-test-card">
      <p className="card-label mono">{test.label}</p>
      <p className="card-body">Expected behavior: {test.expectation}</p>
      <button className="button secondary" type="button" onClick={onRun}>
        RUN TEST
      </button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
