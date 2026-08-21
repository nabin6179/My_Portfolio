const statePromise = fetch('/portfolio-data.json').then((response) => response.json());

const elements = {
  heroName: document.getElementById('heroName'),
  heroRole: document.getElementById('heroRole'),
  heroIntro: document.getElementById('heroIntro'),
  heroMeta: document.getElementById('heroMeta'),
  heroPrimaryCta: document.getElementById('heroPrimaryCta'),
  heroSecondaryCta: document.getElementById('heroSecondaryCta'),
  overviewList: document.getElementById('overviewList'),
  aboutGrid: document.getElementById('aboutGrid'),
  skillsGrid: document.getElementById('skillsGrid'),
  projectsGrid: document.getElementById('projectsGrid'),
  experienceTimeline: document.getElementById('experienceTimeline'),
  educationTimeline: document.getElementById('educationTimeline'),
  certGrid: document.getElementById('certGrid'),
  labGrid: document.getElementById('labGrid'),
  focusGrid: document.getElementById('focusGrid'),
  contactGrid: document.getElementById('contactGrid'),
  chatLog: document.getElementById('chatLog'),
  chatForm: document.getElementById('chatForm'),
  chatInput: document.getElementById('chatInput'),
  clearChat: document.getElementById('clearChat'),
  suggestions: document.getElementById('suggestions'),
  securityTests: document.getElementById('securityTests'),
  navToggle: document.getElementById('navToggle'),
  siteNav: document.getElementById('siteNav'),
  cursorDot: document.getElementById('cursorDot'),
  cursorRing: document.getElementById('cursorRing')
};

function createEl(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function appendTextLine(parent, label, value) {
  const line = createEl('div', 'meta-chip');
  const labelNode = createEl('span', 'mono', label);
  const valueNode = createEl('strong', null, value);
  line.append(labelNode, valueNode);
  parent.appendChild(line);
  return line;
}

function createSourceLinks(sourceFiles) {
  const wrap = createEl('div', 'source-list');
  for (const sourceFile of sourceFiles) {
    const link = createEl('a', 'source-badge', sourceFile);
    link.href = `/${encodeURIComponent(sourceFile)}`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    wrap.appendChild(link);
  }
  return wrap;
}

function renderOverview(items) {
  elements.overviewList.replaceChildren();
  for (const item of items) {
    const card = createEl('article', 'overview-item');
    card.append(
      createEl('p', 'overview-label mono', item.label),
      createEl('p', 'overview-value', item.value),
      createEl('p', 'overview-detail', item.detail)
    );
    card.appendChild(createSourceLinks(item.source));
    elements.overviewList.appendChild(card);
  }
}

function renderAbout(items) {
  elements.aboutGrid.replaceChildren();
  for (const item of items) {
    const card = createEl('article', 'about-card');
    card.append(
      createEl('p', 'card-label mono', item.title),
      createEl('h3', 'card-title', item.title),
      createEl('p', 'card-body', item.body)
    );
    elements.aboutGrid.appendChild(card);
  }
}

function renderSkillCard(skill) {
  const card = createEl('article', 'skill-card');
  const header = createEl('div', 'skill-header');
  header.append(createEl('p', 'card-label mono', skill.category), createEl('span', 'meta', skill.summary));

  const chips = createEl('div', 'skill-chips');
  const note = createEl('p', 'skill-note', 'Hover a technology to read a short context note from the source files.');

  for (const item of skill.items) {
    const chip = createEl('button', 'skill-chip');
    chip.type = 'button';
    chip.textContent = item.name;
    chip.dataset.note = item.note;
    chip.addEventListener('mouseenter', () => {
      note.textContent = item.note;
    });
    chip.addEventListener('focus', () => {
      note.textContent = item.note;
    });
    chip.addEventListener('mouseleave', () => {
      note.textContent = skill.summary;
    });
    chip.addEventListener('blur', () => {
      note.textContent = skill.summary;
    });
    chips.appendChild(chip);
  }

  card.append(header, chips, note);
  return card;
}

function renderSkills(skills) {
  elements.skillsGrid.replaceChildren();
  for (const skill of skills) {
    elements.skillsGrid.appendChild(renderSkillCard(skill));
  }
}

function renderProject(project) {
  const card = createEl('article', 'project-card');
  const header = createEl('div', 'project-header');
  const meta = createEl('div');
  meta.append(
    createEl('p', 'project-index mono', project.number),
    createEl('h3', 'project-title', project.name),
    createEl('p', 'project-status mono', project.status)
  );
  header.appendChild(meta);

  card.append(header, createEl('p', 'project-blurb', project.description));

  const sections = [
    ['OBJECTIVE', project.objective],
    ['IMPLEMENTATION', project.implementation.join(' / ')],
    ['RESULT', project.result],
    ['WHAT I LEARNED', project.learning]
  ];

  for (const [title, value] of sections) {
    if (!value) continue;
    const section = createEl('div', 'project-section');
    section.append(createEl('h3', null, title), createEl('p', 'project-copy', value));
    card.appendChild(section);
  }

  const tags = createEl('div', 'source-list');
  for (const item of project.implementation) {
    tags.appendChild(createEl('span', 'tag', item));
  }
  card.appendChild(tags);
  card.appendChild(createSourceLinks(project.sources));
  return card;
}

function renderProjects(projects) {
  elements.projectsGrid.replaceChildren();
  for (const project of projects) {
    elements.projectsGrid.appendChild(renderProject(project));
  }
}

function renderTimelineItem(item, { includeImpact = true } = {}) {
  const card = createEl('article', 'timeline-card');
  const top = createEl('div', 'timeline-top');
  const left = createEl('div');
  left.append(
    createEl('p', 'timeline-date mono', item.date),
    createEl('h3', 'timeline-role', item.role || item.program),
    createEl('p', 'meta', item.company || item.institution)
  );
  top.append(left);
  if (item.location) {
    top.append(createEl('span', 'timeline-chip', item.location));
  }
  card.appendChild(top);

  if (item.responsibilities || item.program) {
    const copy = createEl('div', 'timeline-copy');
    if (Array.isArray(item.responsibilities)) {
      const list = createEl('ul');
      for (const responsibility of item.responsibilities) {
        list.appendChild(createEl('li', null, responsibility));
      }
      copy.appendChild(list);
    } else {
      copy.appendChild(createEl('p', null, item.program));
    }
    if (includeImpact && item.impact) {
      copy.appendChild(createEl('p', 'card-body', item.impact));
    }
    card.appendChild(copy);
  }

  card.appendChild(createSourceLinks(item.sources));
  return card;
}

function renderExperience(items) {
  elements.experienceTimeline.replaceChildren();
  for (const item of items) {
    elements.experienceTimeline.appendChild(renderTimelineItem(item));
  }
}

function renderEducation(items) {
  elements.educationTimeline.replaceChildren();
  for (const item of items) {
    elements.educationTimeline.appendChild(renderTimelineItem(item, { includeImpact: false }));
  }
}

function renderCertification(cert) {
  const card = createEl('article', 'cert-card');
  const header = createEl('div', 'cert-header');
  const titleWrap = createEl('div');
  titleWrap.append(createEl('p', 'card-label mono', 'CERTIFICATE'), createEl('h3', 'cert-name', cert.name));
  header.appendChild(titleWrap);
  if (cert.file) {
    const view = createEl('a', 'button secondary', 'VIEW CERTIFICATE');
    view.href = `/${encodeURIComponent(cert.file)}`;
    view.target = '_blank';
    view.rel = 'noreferrer';
    header.appendChild(view);
  }

  const meta = createEl('div', 'cert-meta');
  meta.append(
    createEl('p', null, `Issuer: ${cert.issuer}`),
    createEl('p', null, `Date: ${cert.date}`)
  );
  if (cert.credential) {
    meta.appendChild(createEl('p', null, `Credential: ${cert.credential}`));
  }

  card.append(header, meta);
  card.appendChild(createSourceLinks(cert.sources));
  return card;
}

function renderCertifications(items) {
  elements.certGrid.replaceChildren();
  for (const cert of items) {
    elements.certGrid.appendChild(renderCertification(cert));
  }
}

function renderLab(categories) {
  elements.labGrid.replaceChildren();
  for (const category of categories) {
    const card = createEl('article', 'lab-card');
    card.append(createEl('h3', null, category.category), createEl('p', 'card-body', `Verified practical work in ${category.category.toLowerCase()}.`));
    const list = createEl('ul', 'lab-list');
    for (const item of category.items) {
      const li = createEl('li');
      li.appendChild(createEl('span', 'lab-pill', item));
      list.appendChild(li);
    }
    card.appendChild(list);
    elements.labGrid.appendChild(card);
  }
}

function renderFocus(items) {
  elements.focusGrid.replaceChildren();
  for (const item of items) {
    const card = createEl('article', 'focus-card');
    card.append(createEl('h3', null, item.title), createEl('p', 'card-body', item.description));
    elements.focusGrid.appendChild(card);
  }
}

function renderContact(contact) {
  elements.contactGrid.replaceChildren();
  const cards = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, '')}` },
    { label: 'Location', value: contact.location }
  ];

  for (const item of cards) {
    const card = createEl('article', 'contact-card');
    card.append(createEl('p', 'contact-label mono', item.label), createEl('p', 'contact-value', item.value));
    if (item.href) {
      const link = createEl('a', 'button secondary', item.label.toUpperCase());
      link.href = item.href;
      card.appendChild(link);
    }
    elements.contactGrid.appendChild(card);
  }

  const note = createEl('article', 'contact-card');
  note.append(
    createEl('p', 'contact-label mono', 'PUBLIC LINKS'),
    createEl('p', 'contact-value', 'No verified GitHub, LinkedIn, or personal website URL was present in the source files.'),
    createEl('p', 'contact-copy', contact.availability)
  );
  if (contact.publicHandles?.length) {
    const handles = createEl('div', 'source-list');
    for (const handle of contact.publicHandles) {
      handles.appendChild(createEl('span', 'source-badge', handle));
    }
    note.appendChild(handles);
  }
  elements.contactGrid.appendChild(note);
}

function addMessage(role, text) {
  const message = createEl('article', `message ${role}`);
  message.append(createEl('span', 'label mono', role === 'user' ? 'YOU' : 'NABIN // AGENT'), createEl('div', null, text));
  elements.chatLog.appendChild(message);
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function escapeForDisplay(text) {
  return String(text).trim();
}

function buildSuggestions(data) {
  const labels = [];
  if (data.projects.length) labels.push('What security projects has Nabin worked on?');
  if (data.skills.length) labels.push('What networking experience does Nabin have?');
  if (data.certifications.length) labels.push('What certifications has Nabin completed?');
  if (data.skills.length) labels.push('What tools does Nabin use?');
  if (data.currentFocus.length) labels.push('What is Nabin currently learning?');
  if (data.contact.email) labels.push('What contact information is publicly listed?');
  return labels;
}

function renderSuggestions(data) {
  elements.suggestions.replaceChildren();
  for (const label of buildSuggestions(data)) {
    const button = createEl('button', 'source-badge', label);
    button.type = 'button';
    button.addEventListener('click', () => {
      elements.chatInput.value = label;
      elements.chatForm.requestSubmit();
    });
    elements.suggestions.appendChild(button);
  }
}

function renderSecurityTests(data) {
  elements.securityTests.replaceChildren();
  for (const test of data.securityChecks) {
    const card = createEl('div', 'security-test-card');
    card.append(
      createEl('p', 'card-label mono', test.label),
      createEl('p', 'card-body', `Expected behavior: ${test.expectation}`)
    );
    const button = createEl('button', 'button secondary', 'RUN TEST');
    button.type = 'button';
    button.addEventListener('click', async () => {
      elements.chatInput.value = test.prompt;
      elements.chatForm.requestSubmit();
    });
    card.appendChild(button);
    elements.securityTests.appendChild(card);
  }
}

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

function initRevealObserver() {
  const nodes = Array.from(document.querySelectorAll('.reveal'));
  if (!nodes.length) return;

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

  for (const node of nodes) {
    observer.observe(node);
  }
}

function initCursor() {
  const supportsPointer = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!supportsPointer) return;

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
    elements.cursorDot.style.transform = `translate(${x}px, ${y}px)`;
    elements.cursorRing.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(tick);
  };

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });
  document.addEventListener('pointerover', (event) => {
    document.body.classList.toggle('cursor-hover', Boolean(event.target.closest('a, button, summary, textarea')));
  });
  requestAnimationFrame(tick);
}

function initNav() {
  if (!elements.navToggle || !elements.siteNav) return;
  elements.navToggle.addEventListener('click', () => {
    const open = elements.siteNav.classList.toggle('is-open');
    elements.navToggle.setAttribute('aria-expanded', String(open));
  });

  for (const link of elements.siteNav.querySelectorAll('a')) {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 860px)').matches) {
        elements.siteNav.classList.remove('is-open');
        elements.navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function scrambleName(node, finalText) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    node.textContent = finalText.toUpperCase();
    return;
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const start = performance.now();
  const duration = 620;

  const frame = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const revealed = Math.floor(progress * finalText.length);
    let output = '';
    for (let index = 0; index < finalText.length; index += 1) {
      const source = finalText[index];
      if (source === ' ') {
        output += ' ';
      } else if (index < revealed) {
        output += finalText[index].toUpperCase();
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    node.textContent = output;
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      node.textContent = finalText.toUpperCase();
    }
  };

  requestAnimationFrame(frame);
}

async function init() {
  const data = await statePromise;

  elements.heroName.textContent = data.hero.name.toUpperCase();
  elements.heroRole.textContent = data.hero.positioning;
  elements.heroIntro.textContent = data.hero.intro;
  appendTextLine(elements.heroMeta, 'LOCATION', data.identity.location);
  appendTextLine(elements.heroMeta, 'STATUS', data.identity.status);
  appendTextLine(elements.heroMeta, 'FOCUS', data.identity.focus.join(' / '));
  elements.heroPrimaryCta.href = data.hero.primaryCta.href;
  elements.heroSecondaryCta.href = data.hero.secondaryCta.href;

  renderOverview(data.overview);
  renderAbout(data.about);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderCertifications(data.certifications);
  renderLab(data.lab);
  renderFocus(data.currentFocus);
  renderContact(data.contact);
  renderSuggestions(data);
  renderSecurityTests(data);

  elements.chatLog.replaceChildren();
  addMessage('agent', "Ask me about Nabin's education, work, projects, skills, certifications, labs, or public contact information.");

  elements.chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const question = elements.chatInput.value.trim();
    if (!question) return;
    addMessage('user', question);
    elements.chatInput.value = '';
    try {
      const result = await askAgent(question);
      const responseText = result.source ? `${result.answer}\n\nSOURCE\n${result.source}` : result.answer;
      addMessage('agent', responseText);
    } catch (error) {
      addMessage('agent', 'The agent is unavailable right now. Please try again.');
    }
  });

  elements.clearChat.addEventListener('click', () => {
    elements.chatLog.replaceChildren();
    addMessage('agent', "Ask me about Nabin's education, work, projects, skills, certifications, labs, or public contact information.");
  });

  initRevealObserver();
  initCursor();
  initNav();
  scrambleName(elements.heroName, data.hero.name);
  document.body.classList.add('is-ready');
  document.body.classList.remove('is-booting');
}

init().catch((error) => {
  console.error(error);
  document.body.classList.add('is-ready');
  document.body.classList.remove('is-booting');
  if (elements.chatLog) {
    elements.chatLog.replaceChildren();
    addMessage('agent', 'The portfolio content could not be loaded.');
  }
});
