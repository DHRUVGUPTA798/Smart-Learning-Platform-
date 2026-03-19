/**
 * EngineerPath — script.js
 * Handles: data injection, scroll animations, navbar, mobile menu, back-to-top
 */

/* ── DATA ─────────────────────────────────────────────── */

const subjects = [
  {
    icon: '📐',
    color: '#4f8ef7',
    bg: 'rgba(79,142,247,0.12)',
    title: 'Engineering Mathematics',
    desc: 'Calculus, matrices, differential equations, and transforms — the backbone of all engineering.',
  },
  {
    icon: '⚗️',
    color: '#f4a261',
    bg: 'rgba(244,162,97,0.12)',
    title: 'Chemistry',
    desc: 'Bonding, thermodynamics, electrochemistry, and material science fundamentals.',
  },
  {
    icon: '🔭',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    title: 'Physics',
    desc: 'Optics, modern physics, quantum mechanics basics, and wave theory simplified.',
  },
  {
    icon: '⚡',
    color: '#06d6a0',
    bg: 'rgba(6,214,160,0.12)',
    title: 'Basic Electrical Engineering',
    desc: 'Circuits, Ohms law, AC/DC, transformers, and power systems from scratch.',
  },
  {
    icon: '🔌',
    color: '#f72585',
    bg: 'rgba(247,37,133,0.12)',
    title: 'Electronics Engineering',
    desc: 'Diodes, transistors, op-amps, digital logic gates, and analog circuits.',
  },
  {
    icon: '📏',
    color: '#4cc9f0',
    bg: 'rgba(76,201,240,0.12)',
    title: 'Engineering Graphics',
    desc: 'Orthographic projections, isometric views, AutoCAD basics, and technical drawing.',
  },
  {
    icon: '⚙️',
    color: '#f4a261',
    bg: 'rgba(244,162,97,0.12)',
    title: 'Mechanical Basics',
    desc: 'Thermodynamics, fluid mechanics, statics, and dynamics concepts for beginners.',
  },
  {
    icon: '💻',
    color: '#4f8ef7',
    bg: 'rgba(79,142,247,0.12)',
    title: 'Programming in C',
    desc: 'Variables, loops, functions, pointers, arrays, and file I/O — your first language.',
  },
];

const languages = [
  {
    icon: '🔵',
    bg: 'rgba(79,142,247,0.12)',
    name: 'C',
    yt: 'Jenny\'s Lectures CS IT — Full C Course',
    notes: 'Pointer cheat sheets, programs list, exam prep',
  },
  {
    icon: '🐍',
    bg: 'rgba(6,214,160,0.12)',
    name: 'Python',
    yt: 'CS Dojo — Python for Absolute Beginners',
    notes: 'Syntax reference, project starter templates',
  },
  {
    icon: '☕',
    bg: 'rgba(244,162,97,0.12)',
    name: 'Java',
    yt: 'Telusko — Java Tutorial for Beginners',
    notes: 'OOP concepts, exception handling notes',
  },
  {
    icon: '🌐',
    bg: 'rgba(247,37,133,0.12)',
    name: 'JavaScript',
    yt: 'Traversy Media — JavaScript Crash Course',
    notes: 'DOM manipulation, ES6 quick-reference PDF',
  },
  {
    icon: '🏷️',
    bg: 'rgba(4,201,240,0.12)',
    name: 'HTML',
    yt: 'freeCodeCamp — HTML Full Course',
    notes: 'HTML5 tags reference sheet',
  },
  {
    icon: '🎨',
    bg: 'rgba(124,58,237,0.12)',
    name: 'CSS',
    yt: 'Kevin Powell — CSS From Basics to Pro',
    notes: 'Flexbox/Grid visual cheat sheet',
  },
  {
    icon: '🟢',
    bg: 'rgba(6,214,160,0.12)',
    name: 'Node.js',
    yt: 'Academind — Node.js Complete Course',
    notes: 'Express setup guide, REST API templates',
  },
];

const ytChannels = [
  {
    emoji: '🎓',
    bgColor: '#1a0533',
    channel: 'Jenny\'s Lectures CS IT',
    desc: 'C, C++, DSA explained with extreme clarity. A go-to for every engineering student.',
    subs: '5.2M',
    videos: '800+',
  },
  {
    emoji: '🚀',
    bgColor: '#001a33',
    channel: 'Abdul Bari',
    desc: 'Algorithms, data structures, and OS taught in a simple, story-like format.',
    subs: '2.1M',
    videos: '250+',
  },
  {
    emoji: '⚡',
    bgColor: '#0a1a00',
    channel: 'Neso Academy',
    desc: 'Digital electronics, networks, and core engineering subjects with visual teaching.',
    subs: '3.8M',
    videos: '1500+',
  },
  {
    emoji: '📐',
    bgColor: '#1a1000',
    channel: 'MIT OpenCourseWare',
    desc: 'Full lecture series from MIT professors — math, physics, and engineering courses.',
    subs: '4.5M',
    videos: '2000+',
  },
  {
    emoji: '💡',
    bgColor: '#0a0a1a',
    channel: 'NPTEL',
    desc: 'Official IIT/IISc lecture recordings — the most credible Indian engineering resource.',
    subs: '1.9M',
    videos: '5000+',
  },
  {
    emoji: '🔧',
    bgColor: '#1a0a00',
    channel: 'Gate Smashers',
    desc: 'OS, DBMS, CN, compiler design — crystal-clear explanations with examples.',
    subs: '1.3M',
    videos: '600+',
  },
];

const notes = [
  { icon: '📄', title: 'Engineering Mathematics — Unit 1', meta: 'PDF · 42 pages · Differential Calculus', color: '#4f8ef7' },
  { icon: '📄', title: 'Engineering Mathematics — Unit 2', meta: 'PDF · 38 pages · Integral Calculus', color: '#4f8ef7' },
  { icon: '📄', title: 'Engineering Physics — Complete', meta: 'PDF · 96 pages · All Modules', color: '#7c3aed' },
  { icon: '📄', title: 'Engineering Chemistry — Notes', meta: 'PDF · 64 pages · Exam Ready', color: '#f4a261' },
  { icon: '📄', title: 'Basic Electrical Engineering', meta: 'PDF · 55 pages · Circuit Laws & Apps', color: '#06d6a0' },
  { icon: '📄', title: 'C Programming — Full Notes', meta: 'PDF · 78 pages · With Programs', color: '#f72585' },
  { icon: '📄', title: 'Electronics Engineering', meta: 'PDF · 61 pages · Devices & Circuits', color: '#4cc9f0' },
  { icon: '📄', title: 'Engineering Graphics', meta: 'PDF · 48 pages · Projections Guide', color: '#4f8ef7' },
];

const roadmapSteps = [
  {
    num: '01',
    phase: 'Week 1–2 · Foundation',
    title: 'Get Oriented & Set Up',
    desc: 'Understand your semester structure, install necessary tools (VS Code, AutoCAD), and bookmark all key resources on this platform.',
    tags: ['Orientation', 'Tools Setup', 'Resource Bookmarking'],
  },
  {
    num: '02',
    phase: 'Week 3–5 · Core Subjects',
    title: 'Start with Mathematics & Physics',
    desc: 'Begin Engineering Maths (Unit 1–2) and Physics simultaneously. Watch lectures first, then read notes, then solve problems.',
    tags: ['Eng. Maths', 'Physics', 'NPTEL', 'Jenny\'s Lectures'],
  },
  {
    num: '03',
    phase: 'Week 6–8 · Programming',
    title: 'Learn Programming in C',
    desc: 'Follow a structured C course. Write at least 2 programs daily. Cover variables, loops, functions, arrays, and pointers.',
    tags: ['C Programming', 'Daily Coding', 'Lab Prep'],
  },
  {
    num: '04',
    phase: 'Week 9–11 · Branch Subjects',
    title: 'Cover Electrical & Electronics',
    desc: 'Study Basic Electrical Engineering and Electronics Engineering. Focus on circuit analysis and device fundamentals.',
    tags: ['BEE', 'Electronics', 'Neso Academy'],
  },
  {
    num: '05',
    phase: 'Week 12–14 · Applied Subjects',
    title: 'Engineering Graphics + Chemistry',
    desc: 'Practice drawing projections daily and complete Chemistry modules. Both require consistent practice over cramming.',
    tags: ['Engineering Graphics', 'Chemistry', 'AutoCAD Basics'],
  },
  {
    num: '06',
    phase: 'Week 15–16 · Revision',
    title: 'Revise, Practice & Ace Exams',
    desc: 'Use downloaded notes for rapid revision. Solve past papers, attempt mock tests, and focus on high-weightage topics.',
    tags: ['Past Papers', 'Mock Tests', 'High Priority Topics', 'Final Prep'],
  },
];

/* ── RENDER FUNCTIONS ─────────────────────────────────── */

/**
 * Render subject cards into #subjectsGrid
 */
function renderSubjects() {
  const grid = document.getElementById('subjectsGrid');
  grid.innerHTML = subjects.map((s, i) => `
    <div class="subject-card" style="transition-delay:${i * 0.07}s">
      <div class="card-icon-wrap" style="background:${s.bg}">
        <span>${s.icon}</span>
      </div>
      <div class="card-title">${s.title}</div>
      <div class="card-desc">${s.desc}</div>
      <a href="#" class="card-explore">
        Explore <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  `).join('');
}

/**
 * Render programming language cards into #progGrid
 */
function renderProgramming() {
  const grid = document.getElementById('progGrid');
  grid.innerHTML = languages.map((l, i) => `
    <div class="prog-card" style="transition-delay:${i * 0.08}s">
      <div class="prog-header">
        <div class="prog-icon" style="background:${l.bg}; font-size:1.4rem">${l.icon}</div>
        <div class="prog-name">${l.name}</div>
        <span class="prog-tag-beginner">Beginner</span>
      </div>
      <div class="prog-links">
        <a href="#" class="prog-link-item">
          <span class="prog-link-icon">▶️</span>
          <span>Best YouTube Playlist — ${l.yt}</span>
        </a>
        <a href="#" class="prog-link-item">
          <span class="prog-link-icon">📄</span>
          <span>Notes Available — ${l.notes}</span>
        </a>
      </div>
    </div>
  `).join('');
}

/**
 * Render YouTube channel cards into #ytGrid
 */
function renderYouTube() {
  const grid = document.getElementById('ytGrid');
  grid.innerHTML = ytChannels.map((c, i) => `
    <div class="yt-card" style="transition-delay:${i * 0.09}s">
      <div class="yt-thumb" style="background:${c.bgColor}">
        <span class="yt-thumb-emoji">${c.emoji}</span>
        <div class="yt-thumb-overlay"></div>
        <div class="yt-play-btn">▶</div>
      </div>
      <div class="yt-body">
        <div class="yt-header">
          <div class="yt-channel">${c.channel}</div>
          <span class="yt-verified">✓ Verified</span>
        </div>
        <p class="yt-desc">${c.desc}</p>
        <div class="yt-meta">
          <span class="yt-meta-item">👥 ${c.subs} subscribers</span>
          <span class="yt-meta-item">🎬 ${c.videos} videos</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Render downloadable note cards into #notesGrid
 */
function renderNotes() {
  const grid = document.getElementById('notesGrid');
  grid.innerHTML = notes.map((n, i) => `
    <div class="note-card" style="transition-delay:${i * 0.06}s">
      <div class="note-file-icon" style="background:linear-gradient(135deg, ${n.color}, ${n.color}99)">
        📄
      </div>
      <div class="note-info">
        <div class="note-title">${n.title}</div>
        <div class="note-meta">${n.meta}</div>
      </div>
      <button class="note-dl-btn" aria-label="Download" title="Download PDF">⬇</button>
    </div>
  `).join('');
}

/**
 * Render roadmap steps into #roadmapTimeline
 */
function renderRoadmap() {
  const container = document.getElementById('roadmapTimeline');
  container.innerHTML = roadmapSteps.map((s, i) => `
    <div class="roadmap-step" data-num="${s.num}" style="transition-delay:${i * 0.12}s">
      <div class="step-card">
        <div class="step-phase">${s.phase}</div>
        <div class="step-title">${s.title}</div>
        <p class="step-desc">${s.desc}</p>
        <div class="step-tags">
          ${s.tags.map(t => `<span class="step-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ── SCROLL ANIMATION (Intersection Observer) ─────────── */
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep it visible
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animatable elements
  const selectors = [
    '.subject-card', '.prog-card', '.yt-card',
    '.note-card', '.roadmap-step', '.why-card',
    '.reveal'
  ];
  document.querySelectorAll(selectors.join(', ')).forEach(el => observer.observe(el));
}

/* ── NAVBAR ───────────────────────────────────────────── */
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar scroll state
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top visibility
    if (scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }, { passive: true });

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── MOBILE MENU ──────────────────────────────────────── */
function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

/* ── ACTIVE NAV LINK (scroll spy) ────────────────────── */
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? '#4f8ef7' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ── SUBJECT CARD HOVER RIPPLE ────────────────────────── */
function setupCardRipple() {
  document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/* ── NOTE DOWNLOAD (fake toast) ──────────────────────── */
function setupNoteDownload() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.note-dl-btn');
    if (!btn) return;
    const card = btn.closest('.note-card');
    const title = card.querySelector('.note-title').textContent;

    // Show a toast notification
    showToast(`📥 "${title}" — Download started!`);
  });
}

function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 80px; right: 28px;
    background: #13131e; border: 1px solid rgba(79,142,247,0.4);
    color: #f0f0f8; padding: 14px 20px;
    border-radius: 12px; font-size: 0.85rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    z-index: 9999; font-family: 'DM Sans', sans-serif;
    animation: toastIn 0.3s ease;
    max-width: 320px;
  `;

  // Add keyframe if not present
  if (!document.getElementById('toastStyle')) {
    const style = document.createElement('style');
    style.id = 'toastStyle';
    style.textContent = `
      @keyframes toastIn { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes toastOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform: translateY(16px); } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ── SMOOTH SCROLL for anchor links ──────────────────── */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── INIT ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject all dynamic content
  renderSubjects();
  renderProgramming();
  renderYouTube();
  renderNotes();
  renderRoadmap();

  // 2. Setup interactions (after DOM is ready with injected content)
  // Small delay to ensure all elements are in the DOM
  requestAnimationFrame(() => {
    setupScrollAnimations();
    setupNavbar();
    setupMobileMenu();
    setupScrollSpy();
    setupCardRipple();
    setupNoteDownload();
    setupSmoothScroll();
  });

  console.log('🚀 EngineerPath loaded. Good luck with your studies!');
});
