const PORTFOLIO_DATA = {
  identity: {
    name: "Nabin Tiwari",
    headline: "Network Security Engineer - VAPT",
    location: "Kathmandu, Nepal",
    status: "Open to internships",
    focus: ["Network Technology", "Cybersecurity"],
    summary: "Computer Science student specializing in network technology and cybersecurity."
  },
  hero: {
    name: "Nabin Tiwari",
    positioning: "Network Security Engineer - VAPT",
    intro: "Computer Science student in Kathmandu, Nepal, focused on network technology, cybersecurity, and hands-on lab work.",
    current: "Open to internships",
    primaryCta: { label: "View Work", href: "#projects" },
    secondaryCta: { label: "Download CV", href: "assets/documents/Nabin_Tiwari.pdf" }
  },
  overview: [
    { label: "Education", value: "2 verified entries", detail: "B.Sc. in Computer Science in progress, plus higher secondary education.", source: ["Nabin_Tiwari.pdf", "README.md"] },
    { label: "Experience", value: "1 internship", detail: "Six-month technical support internship at an ISP in Kathmandu.", source: ["Nabin_Tiwari.pdf", "README.md"] },
    { label: "Focus", value: "2 domains", detail: "Network technology and cybersecurity.", source: ["README.md", "Nabin_Tiwari.pdf"] },
    { label: "Projects", value: "6 verified projects", detail: "Labs, reports, a live CTF platform, and a framework in progress.", source: ["README.md"] },
    { label: "Certifications", value: "10 verified entries", detail: "Cisco, Simplilearn, Google Cloud, Fortinet, Forage, TryHackMe, and Texas College certificates.", source: ["README.md", "Bootcamp on Web Application Penetration Testing.pdf", "Cyber Job Simulation.pdf", "THM-IPQJHIJNDH.pdf", "CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate_nabintiwari897-gmail-com_d0563cb3-29ba-4dd3-9234-9db561480fc6 (1).pdf", "CCNA-_Introduction_to_Networks_certificate_nabintiwari897-gmail-com_784737d5-f8b1-4338-ba8d-442256824901.pdf", "CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_nabintiwari897-gmail-com_43c841f8-f4c0-43c8-92d2-c7c2f9bbcc79.pdf", "Digital_security_Fun.pdf", "Introduction to Cyber Security.pdf", "Trust and Security with Google Cloud.pdf"] },
    { label: "Tools", value: "20+ tools", detail: "Daily use of Wireshark, Nmap, Burp Suite, Metasploit, Snort, SQLMap, Nessus, OpenVAS, Kali Linux, and more.", source: ["README.md", "Nabin_Tiwari.pdf"] }
  ],
  about: [
    { title: "Who I Am", body: "I am a Computer Science student specializing in network technology and cybersecurity, based in Kathmandu, Nepal." },
    { title: "What I Do", body: "I learn networks and security by building lab environments, troubleshooting real infrastructure, and documenting the results carefully." },
    { title: "Currently Learning", body: "Security Playground, a web app security assessment framework, CTFs, and practical offensive and defensive lab work." }
  ],
  skills: [
    { category: "Networking", summary: "Core networking concepts and routing basics used across labs and support work.", items: [
      { name: "TCP/IP", note: "Used in networking and troubleshooting fundamentals." },
      { name: "OSI Model", note: "Used to diagnose Layer 1-3 connectivity issues in ISP support." },
      { name: "DNS", note: "Part of the networking and troubleshooting stack in the resume." },
      { name: "DHCP", note: "Configured in the Windows Server lab and discussed in the resume." },
      { name: "VLANs", note: "Used in the enterprise network design lab." },
      { name: "Inter-VLAN Routing", note: "Listed in the resume and supported by the network lab." },
      { name: "OSPF Basics", note: "Covered in the resume as networking coursework." },
      { name: "Cisco IOS", note: "Present in the README networking section." }
    ]},
    { category: "Security Infrastructure", summary: "Controls used to harden lab environments and model enterprise protection.", items: [
      { name: "ACLs", note: "Used in the network design lab and security infrastructure section." },
      { name: "NAT", note: "Listed in the README security infrastructure section." },
      { name: "Network Segmentation", note: "Used in the segmented enterprise network lab." },
      { name: "Port Security", note: "Listed in the README security infrastructure section." },
      { name: "UFW Firewall", note: "Configured in the network security monitoring lab." }
    ]},
    { category: "Threat Monitoring and Analysis", summary: "Monitoring and validation tools used across the lab work.", items: [
      { name: "Wireshark", note: "Used for packet analysis and troubleshooting." },
      { name: "Nmap", note: "Used for discovery and validation in labs and the pentest report." },
      { name: "Snort IDS", note: "Configured to flag scans and basic attacks in real time." },
      { name: "Traffic Analysis", note: "Listed in the README monitoring section." },
      { name: "Log Auditing", note: "Listed in the README monitoring section." },
      { name: "Incident Detection", note: "Listed in the README monitoring section." }
    ]},
    { category: "System Administration", summary: "Windows and Linux administration work used in the lab and internship experience.", items: [
      { name: "Windows Server 2022", note: "Deployed and hardened in the Active Directory lab." },
      { name: "Active Directory (AD DS)", note: "Managed in the enterprise lab." },
      { name: "Group Policy Objects (GPO)", note: "Used to enforce security baselines in the lab." },
      { name: "Linux", note: "Used for system administration, monitoring, and firewall work." },
      { name: "Syslog", note: "Listed in the README system administration section." },
      { name: "User and Permission Management", note: "Listed in the README system administration section." }
    ]},
    { category: "Virtualization and Environments", summary: "Virtual lab platforms used to isolate practice environments.", items: [
      { name: "VirtualBox", note: "Used for isolated virtual lab environments." },
      { name: "VMware", note: "Listed in the README virtualization section." },
      { name: "Isolated Virtual Labs", note: "Used to test network and security scenarios safely." }
    ]},
    { category: "Daily Tools", summary: "Operational tools mentioned across the README and resume.", items: [
      { name: "Burp Suite", note: "Used in the penetration test report and web testing." },
      { name: "Metasploit", note: "Used during exploitation in the pentest report." },
      { name: "SQLMap", note: "Used for web application testing in the pentest report." },
      { name: "Nessus", note: "Used for vulnerability validation in the pentest report." },
      { name: "OpenVAS", note: "Used for vulnerability validation in the pentest report." },
      { name: "Hydra", note: "Listed in the README daily tools section." },
      { name: "tcpdump", note: "Listed in the README daily tools section." },
      { name: "OWASP ZAP", note: "Listed in the README daily tools section." },
      { name: "Netcat", note: "Listed in the README daily tools section." },
      { name: "Hashcat", note: "Listed in the README daily tools section." },
      { name: "GNS3", note: "Listed in the README daily tools section." },
      { name: "Cisco Packet Tracer", note: "Listed in the README daily tools section." },
      { name: "John the Ripper", note: "Listed in the README daily tools section." },
      { name: "Aircrack-ng", note: "Listed in the README daily tools section." }
    ]}
  ],
  projects: [
    { number: "01", name: "Pentest Report - Enterprise Security Assessment", status: "Completed", description: "End-to-end penetration test against a simulated Windows/Linux enterprise network - reconnaissance through exploitation, web application testing, and detection/evasion - delivered as a CVSS-prioritized report with remediation steps.", objective: "Document the full assessment process against the lab environment.", implementation: ["Nmap", "enum4linux", "Nessus", "OpenVAS", "Metasploit", "Burp Suite", "SQLMap"], result: "Formal report with CVSS-prioritized findings and remediation steps.", learning: "Not stated in the source files.", sources: ["README.md"] },
    { number: "02", name: "Lab - Windows Server 2022 AD Infrastructure", status: "Completed", description: "Deployed Active Directory Domain Services in an enterprise-simulated virtual sandbox with users, security groups, OUs, DHCP, and GPO-based security baselines.", objective: "Build and harden a small enterprise identity environment.", implementation: ["Windows Server", "Active Directory", "DHCP", "GPO"], result: "Users, security groups, organizational units, scoped DHCP, and policy enforcement were implemented in the lab.", learning: "Centralized role-based access control and policy-driven administration.", sources: ["README.md"] },
    { number: "03", name: "Lab - Network Security Monitoring", status: "Completed", description: "Snort IDS tuned to flag scans and basic attacks in real time, paired with UFW firewall rules and simulated attacks to study alerts and logs.", objective: "Observe how a simple defensive stack detects noisy attack behavior.", implementation: ["Snort IDS", "UFW", "Linux"], result: "Custom detection rules were tested against scan and attack traffic.", learning: "Alerting and log review under controlled attack conditions.", sources: ["README.md"] },
    { number: "04", name: "Lab - Network Design and Analysis", status: "Completed", description: "Layered Core / Distribution / Access topology with VLAN segmentation and ACL rules, validated using Wireshark and Nmap.", objective: "Understand how segmentation and access control affect traffic flow.", implementation: ["VLAN", "ACL", "Wireshark", "Nmap"], result: "Topology and traffic validation were completed in a virtual lab.", learning: "Practical network design, segmentation, and troubleshooting.", sources: ["README.md"] },
    { number: "05", name: "Security Playground - CTF Platform", status: "Live", description: "A live, self-hosted capture-the-flag platform for practicing web and network exploitation challenges in a safe sandbox.", objective: "Build a browser-based platform for offensive security practice.", implementation: ["Python", "Web Security", "CTF"], result: "Live, self-hosted practice environment.", learning: "Safe challenge design and hands-on exploitation practice.", sources: ["README.md"] },
    { number: "06", name: "Web App Security Assessment Framework", status: "In progress", description: "A modular Python framework for authorized web application security testing. Target Management module complete; Reconnaissance module in progress.", objective: "Structure repeatable web security testing work.", implementation: ["Python", "Recon", "Modular Design"], result: "Target Management is complete; Reconnaissance is in progress.", learning: "Designing modular workflows for authorized testing.", sources: ["README.md"] }
  ],
  experience: [
    { date: "Oct 2025 - Mar 2026", role: "Technical Support Intern", company: "Himalayan Online Service Pvt. Ltd.", location: "Kathmandu, Bagmati, Nepal", responsibilities: ["Used OSI model-based troubleshooting to resolve Layer 1-3 connectivity issues for ISP customers.", "Configured and maintained routers and wireless network infrastructure for stable connectivity.", "Monitored network performance using diagnostic tools to detect faults and disruptions.", "Collaborated with technical teams to support ISP operations and timely resolution of network issues."], impact: "Hands-on exposure to real customer connectivity issues and network operations.", sources: ["Nabin_Tiwari.pdf", "README.md"] }
  ],
  education: [
    { date: "Expected 2028", program: "B.Sc. Computer Science - Network Technology and Cyber Security", institution: "Texas College of Management & IT (Lincoln University College)", location: "Kathmandu, Nepal", sources: ["Nabin_Tiwari.pdf", "README.md"] },
    { date: "Mar 2022 - Jun 2024", program: "Higher Secondary Education", institution: "Texas International College", location: "Kathmandu, Nepal", sources: ["Nabin_Tiwari.pdf"] }
  ],
  certifications: [
    { name: "CCNA: Enterprise Networking, Security, and Automation", issuer: "Cisco Networking Academy", date: "22 Jul 2026", credential: "d0563cb3-29ba-4dd3-9234-9db561480fc6", file: "CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate_nabintiwari897-gmail-com_d0563cb3-29ba-4dd3-9234-9db561480fc6 (1).pdf", sources: ["README.md", "CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate_nabintiwari897-gmail-com_d0563cb3-29ba-4dd3-9234-9db561480fc6 (1).pdf"] },
    { name: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco Networking Academy", date: "01 Jan 2026", credential: "43c841f8-f4c0-43c8-92d2-c7c2f9bbcc79", file: "CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_nabintiwari897-gmail-com_43c841f8-f4c0-43c8-92d2-c7c2f9bbcc79.pdf", sources: ["README.md", "CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_nabintiwari897-gmail-com_43c841f8-f4c0-43c8-92d2-c7c2f9bbcc79.pdf"] },
    { name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", date: "24 Jun 2025", credential: "784737d5-f8b1-4338-ba8d-442256824901", file: "CCNA-_Introduction_to_Networks_certificate_nabintiwari897-gmail-com_784737d5-f8b1-4338-ba8d-442256824901.pdf", sources: ["README.md", "CCNA-_Introduction_to_Networks_certificate_nabintiwari897-gmail-com_784737d5-f8b1-4338-ba8d-442256824901.pdf"] },
    { name: "Introduction to Cyber Security", issuer: "Simplilearn", date: "11 Jan 2026", credential: "9703043", file: "Introduction to Cyber Security.pdf", sources: ["README.md", "Introduction to Cyber Security.pdf"] },
    { name: "Trust and Security with Google Cloud", issuer: "Google", date: "21 Feb 2026", credential: "9874597", file: "Trust and Security with Google Cloud.pdf", sources: ["README.md", "Trust and Security with Google Cloud.pdf"] },
    { name: "Digital Security Fundamentals", issuer: "Simplilearn", date: "21 Feb 2026", credential: "9874755", file: "Digital_security_Fun.pdf", sources: ["README.md", "Digital_security_Fun.pdf"] },
    { name: "Introduction to the Threat Landscape 3.0", issuer: "Fortinet", date: "2026", credential: null, file: null, sources: ["README.md"] },
    { name: "Deloitte Australia - Cyber Job Simulation", issuer: "Forage", date: "Aug 2026", credential: "6a7eb2faaa694bdf893e05d8", file: "Cyber Job Simulation.pdf", sources: ["README.md", "Cyber Job Simulation.pdf"] },
    { name: "Hacker Holidays Completion Certificate", issuer: "TryHackMe", date: "Aug 2026", credential: "THM-IPQJHIJNDH", file: "THM-IPQJHIJNDH.pdf", sources: ["README.md", "THM-IPQJHIJNDH.pdf"] },
    { name: "Bootcamp on Web Application Penetration Testing", issuer: "Texas College of Management & IT", date: "9 Aug 2026", credential: "CERT-2026-00011", file: "Bootcamp on Web Application Penetration Testing.pdf", sources: ["README.md", "Bootcamp on Web Application Penetration Testing.pdf"] }
  ],
  lab: [
    { category: "WEB", items: ["Bootcamp on Web Application Penetration Testing", "Security Playground", "Web App Security Assessment Framework"] },
    { category: "NETWORK", items: ["Windows Server 2022 Active Directory Infrastructure", "Network Security Monitoring Lab", "Network Design and Analysis Lab"] },
    { category: "CRYPTO", items: ["College-organized CTF competition", "picoCTF challenges"] },
    { category: "FORENSICS", items: ["College-organized CTF competition"] },
    { category: "BLUE TEAM", items: ["Snort IDS tuning", "UFW firewall rules", "Traffic analysis", "Log monitoring"] },
    { category: "CTF", items: ["TryHackMe Hacker Holidays", "College-organized CTF competition", "picoCTF"] }
  ],
  currentFocus: [
    { title: "Security Playground", description: "Browser-based platform for learning offensive security by doing rather than only reading." },
    { title: "Web App Security Assessment Framework", description: "A modular Python framework with Target Management complete and Reconnaissance in progress." },
    { title: "CTFs and lab work", description: "Practical work spanning web exploitation, cryptography, and digital forensics." }
  ],
  contact: {
    email: "nabintiwari897@gmail.com",
    location: "Kathmandu, Nepal",
    availability: "Open to Security Analyst, Network Security, and Penetration Testing internships - remote or on-site.",
    github: "https://github.com/nabin6179",
    linkedin: "https://www.linkedin.com/in/nabintiwari000/",
    Blog: "https://blog.tiwarinabin.com.np",
    TryHackme: "https://tryhackme.com/p/0xNabin"
  }
};

function createEl(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createSourceLinks(sourceFiles) {
  const wrap = createEl('div', 'source-list');
  for (const sourceFile of sourceFiles) {
    const link = createEl('a', 'source-badge', sourceFile);
    if (sourceFile.endsWith('.pdf')) {
      link.href = `assets/${sourceFile.includes('CCNA') || sourceFile.includes('Cyber') || sourceFile.includes('THM') || sourceFile.includes('Bootcamp') || sourceFile.includes('Introduction') || sourceFile.includes('Trust') || sourceFile.includes('Digital') ? 'certificates/' : 'documents/'}${encodeURIComponent(sourceFile)}`;
    } else {
      link.href = `#${sourceFile.toLowerCase().replace(/\.md$/, '')}`;
    }
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    wrap.appendChild(link);
  }
  return wrap;
}

function renderOverview(items) {
  const container = document.getElementById('overviewList');
  container.replaceChildren();
  for (const item of items) {
    const card = createEl('article', 'overview-item reveal');
    card.append(
      createEl('p', 'overview-label mono', item.label),
      createEl('p', 'overview-value', item.value),
      createEl('p', 'overview-detail', item.detail)
    );
    card.appendChild(createSourceLinks(item.source));
    container.appendChild(card);
  }
}

function renderAbout(items) {
  const container = document.getElementById('aboutGrid');
  container.replaceChildren();
  for (const item of items) {
    const card = createEl('article', 'about-card reveal');
    card.append(
      createEl('p', 'card-label mono', item.title),
      createEl('h3', 'card-title', item.title),
      createEl('p', 'card-body', item.body)
    );
    container.appendChild(card);
  }
}

function renderSkillCard(skill) {
  const card = createEl('article', 'skill-card reveal');
  const header = createEl('div', 'skill-header');
  header.append(createEl('p', 'card-label mono', skill.category), createEl('span', 'meta', skill.summary));

  const chips = createEl('div', 'skill-chips');
  const note = createEl('p', 'skill-note', skill.summary);

  for (const item of skill.items) {
    const chip = createEl('button', 'skill-chip');
    chip.type = 'button';
    chip.textContent = item.name;
    chip.dataset.note = item.note;
    chip.addEventListener('mouseenter', () => { note.textContent = item.note; });
    chip.addEventListener('focus', () => { note.textContent = item.note; });
    chip.addEventListener('mouseleave', () => { note.textContent = skill.summary; });
    chip.addEventListener('blur', () => { note.textContent = skill.summary; });
    chips.appendChild(chip);
  }

  card.append(header, chips, note);
  return card;
}

function renderSkills(skills) {
  const container = document.getElementById('skillsGrid');
  container.replaceChildren();
  for (const skill of skills) {
    container.appendChild(renderSkillCard(skill));
  }
}

function renderProject(project) {
  const card = createEl('article', 'project-card reveal');
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
  const container = document.getElementById('projectsGrid');
  container.replaceChildren();
  for (const project of projects) {
    container.appendChild(renderProject(project));
  }
}

function renderTimelineItem(item, { includeImpact = true } = {}) {
  const card = createEl('article', 'timeline-card reveal');
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
  const container = document.getElementById('experienceTimeline');
  container.replaceChildren();
  for (const item of items) {
    container.appendChild(renderTimelineItem(item));
  }
}

function renderEducation(items) {
  const container = document.getElementById('educationTimeline');
  container.replaceChildren();
  for (const item of items) {
    container.appendChild(renderTimelineItem(item, { includeImpact: false }));
  }
}

function renderCertification(cert) {
  const card = createEl('article', 'cert-card reveal');
  const header = createEl('div', 'cert-header');
  const titleWrap = createEl('div');
  titleWrap.append(createEl('p', 'card-label mono', 'CERTIFICATE'), createEl('h3', 'cert-name', cert.name));
  header.appendChild(titleWrap);
  if (cert.file) {
    const view = createEl('a', 'button secondary', 'VIEW CERTIFICATE');
    view.href = `assets/certificates/${encodeURIComponent(cert.file)}`;
    view.target = '_blank';
    view.rel = 'noopener noreferrer';
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
  const container = document.getElementById('certGrid');
  container.replaceChildren();
  for (const cert of items) {
    container.appendChild(renderCertification(cert));
  }
}

function renderLab(categories) {
  const container = document.getElementById('labGrid');
  container.replaceChildren();
  for (const category of categories) {
    const card = createEl('article', 'lab-card reveal');
    card.append(createEl('h3', null, category.category), createEl('p', 'card-body', `Verified practical work in ${category.category.toLowerCase()}.`));
    const list = createEl('ul', 'lab-list');
    for (const item of category.items) {
      const li = createEl('li');
      li.appendChild(createEl('span', 'lab-pill', item));
      list.appendChild(li);
    }
    card.appendChild(list);
    container.appendChild(card);
  }
}

function renderFocus(items) {
  const container = document.getElementById('focusGrid');
  container.replaceChildren();
  for (const item of items) {
    const card = createEl('article', 'focus-card reveal');
    card.append(createEl('h3', null, item.title), createEl('p', 'card-body', item.description));
    container.appendChild(card);
  }
}

function renderContact(contact) {
  const container = document.getElementById('contactGrid');
  container.replaceChildren();
  const cards = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'Location', value: contact.location },
    { label: 'GitHub', value: 'github.com/nabin6179', href: contact.github },
    { label: 'LinkedIn', value: 'linkedin.com/in/nabintiwari000', href: contact.linkedin },
    { label: 'Blog', value: 'blog.tiwarinabin.com.np', href: contact.blog }
  ];

  for (const item of cards) {
    const card = createEl('article', 'contact-card reveal');
    card.append(createEl('p', 'contact-label mono', item.label), createEl('p', 'contact-value', item.value));
    if (item.href) {
      const link = createEl('a', 'button secondary', item.label.toUpperCase());
      link.href = item.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      card.appendChild(link);
    }
    container.appendChild(card);
  }

  const note = createEl('article', 'contact-card reveal');
  note.append(
    createEl('p', 'contact-label mono', 'PUBLIC HANDLES'),
    createEl('p', 'contact-copy', contact.availability)
  );
  if (contact.publicHandles?.length) {
    const handles = createEl('div', 'source-list');
    for (const handle of contact.publicHandles) {
      handles.appendChild(createEl('span', 'source-badge', handle));
    }
    note.appendChild(handles);
  }
  container.appendChild(note);
}

function initRevealObserver() {
  const nodes = document.querySelectorAll('.reveal');
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

function initNav() {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  for (const link of siteNav.querySelectorAll('a')) {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 860px)').matches) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
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

function init() {
  const data = PORTFOLIO_DATA;

  const heroName = document.querySelector('.hero-name');
  const heroRole = document.querySelector('.hero-role');
  const heroIntro = document.querySelector('.hero-intro');
  const heroMeta = document.getElementById('heroMeta');
  const heroPrimaryCta = document.getElementById('heroPrimaryCta');
  const heroSecondaryCta = document.getElementById('heroSecondaryCta');

  if (heroName) heroName.textContent = data.hero.name.toUpperCase();
  if (heroRole) heroRole.textContent = data.hero.positioning;
  if (heroIntro) heroIntro.textContent = data.hero.intro;
  if (heroPrimaryCta) heroPrimaryCta.href = data.hero.primaryCta.href;
  if (heroSecondaryCta) heroSecondaryCta.href = data.hero.secondaryCta.href;

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

  initRevealObserver();
  initNav();
  initActiveNav();
  scrambleName(heroName, data.hero.name);

  document.body.classList.add('is-ready');
}

document.addEventListener('DOMContentLoaded', init);
