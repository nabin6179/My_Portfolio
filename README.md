# Nabin Tiwari - Portfolio Website

A clean, static portfolio website built with HTML5, CSS3, and Vanilla JavaScript. No build tools, no frameworks, no Node.js runtime required.

## Structure

```
mywork/
├── index.html          # Main HTML file
├── style.css           # Complete stylesheet
├── script.js           # Portfolio data + rendering logic
├── assets/
│   ├── certificates/   # 10 certificate PDFs
│   ├── documents/      # Resume PDF
│   ├── icons/          # favicon.svg, og-image.svg
│   └── images/         # (empty, reserved for project screenshots)
└── README.md           # This file
```

## Features

- **Zero dependencies** - Pure HTML/CSS/JS, works by opening `index.html`
- **Fully responsive** - Mobile-first, tested on desktop, tablet, mobile
- **Accessible** - Semantic HTML, keyboard navigation, focus states, reduced-motion support
- **SEO ready** - Meta tags, Open Graph, JSON-LD structured data
- **Fast** - No build step, no external JS frameworks, minimal CSS
- **Secure** - No inline scripts, safe DOM manipulation, `noopener noreferrer` on external links

## Sections

1. **Hero** - Name, role, intro, CTAs
2. **Overview** - Verified stats from resume/certificates
3. **About** - Who I am, what I do, currently learning
4. **Skills** - 6 categories with hoverable tooltips
5. **Projects** - 6 verified projects with tooling/results
6. **Experience** - Technical Support Intern at ISP
7. **Education** - B.Sc. CS + Higher Secondary
8. **Certifications** - 10 certificates with view links
9. **Lab Work** - 6 categories of hands-on practice
10. **Current Focus** - Security Playground, Framework, CTFs
11. **Contact** - Email, location, GitHub, LinkedIn, Website

## Deployment

Works on any static hosting:
- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel Static
- Any web server (nginx, Apache, Caddy)

Just upload the `mywork` folder contents.

## Local Preview

```bash
python3 -m http.server 8080
# Then open http://localhost:8080
```

Or simply open `index.html` directly in a browser.

## Design System

- **Colors**: Dark theme (#0A0A0A bg), green accent (#B7FF3C)
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels)
- **Spacing**: CSS variables, consistent scale
- **Border radius**: Consistent rounded corners (xl/lg/md/sm)
- **Animations**: Reveal on scroll, scramble text, skill chip tooltips, mobile menu
- **Reduced motion**: Respects `prefers-reduced-motion`

## Data Source

All portfolio content is embedded in `script.js` as `PORTFOLIO_DATA`, sourced from the original project's `portfolio-data.json` and `README.md`.
