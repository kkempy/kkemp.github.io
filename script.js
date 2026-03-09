const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const FORMSPREE_ID = "xbdzdjpb";

// ─── Data ─────────────────────────────────────────────────────────────────────
const state = {
  theme: localStorage.getItem("theme") || "dark",

  // ── UPDATE THIS as you complete TryHackMe rooms ──
  thmRooms: 0,

  projects: [
    {
      title: "Privacy-Preserving Walk-Away Lock",
      desc: "A Python tool that automatically locks your screen the moment you leave, and only unlocks when it recognises your face on return — no passwords, no manual action, no cloud.",
      tags: ["Python", "OpenCV", "Mediapipe", "Computer Vision"],
      links: {
        github: "https://github.com/kkempy/Privacy-Preserving-Walk-Away-Lock-with-Presence-Based-Security-Lightweight-Identity-Verification",
        live: "#"
      },
      caseStudy: {
        problem: "Unattended devices are one of the most overlooked physical security risks. Timer-based locks are too slow; manual locking gets forgotten. I wanted to build something that worked automatically and respected user privacy — no cloud, no data leaving the machine.",
        approach: [
          "Used Mediapipe's pose detection to track when the registered user leaves the webcam frame, triggering an immediate OS-level screen lock.",
          "Added lightweight face recognition on return — the screen only unlocks for the authorised user, blocking anyone else who sits down.",
          "Iterated on detection sensitivity to cut false positives (looking away briefly, poor lighting) without slowing response time.",
          "Kept all processing fully local — no API calls, no data sent anywhere. Privacy is built in, not bolted on."
        ],
        results: [
          "Working application with automatic lock and unlock — zero interaction needed during normal use.",
          "Entirely local: identity checks run on-device with no external dependencies.",
          "Documented end-to-end and published on GitHub with clear setup instructions."
        ],
        stack: ["Python", "OpenCV", "Mediapipe"]
      }
    },
    {
      title: "Cyber Security Portfolio Site",
      desc: "This site — hand-coded from scratch without any frameworks, hosted on GitHub Pages with a custom domain, and built with security-conscious practices throughout.",
      tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      links: {
        github: "https://github.com/kkempy/kkemp.github.io",
        live: "https://kkemp.co.uk"
      },
      caseStudy: {
        problem: "I needed something to actually show people — a live, deployed site that demonstrates both frontend ability and security awareness, without spending money on hosting or reaching for a framework I didn't need.",
        approach: [
          "Built the whole thing in vanilla HTML, CSS and JS. No React, no build pipeline, no dependencies — just the platform.",
          "Deployed to GitHub Pages with a custom .co.uk domain. Ongoing cost: the domain only.",
          "Applied security-conscious frontend thinking throughout: all dynamic content rendered through escapeHtml() to prevent XSS, no inline event handlers, semantic and accessible HTML.",
          "Added dark/light theming, Formspree contact form, animated stats counter, scroll progress bar, and a scrollable case-study modal — all without a single npm package."
        ],
        results: [
          "Live at kkemp.co.uk — a real deployed product, not a mock-up.",
          "Demonstrates frontend security awareness in a practical, tangible way.",
          "Fast, accessible, and costs nothing to run."
        ],
        stack: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Formspree"]
      }
    }
  ],

  // href: "#" = not published yet → renders as "Coming soon"
  // href: "/writeups/my-post.html" = published → renders as "Read →"
  writeups: [
    {
      title: "Facial Recognition: How It Actually Works",
      date: "2026-03-01",
      desc: "I used facial recognition in my walk-away lock project. Here's what I learned going beyond the library — encodings, distance matching, and where it fails.",
      href: "writeups/facial-recognition.html"
    },
    {
      title: "Keystroke & Mouse Tracking: What I Built and Why It Matters",
      date: "2026-02-10",
      desc: "I built a basic input logger in Python to understand how it works, then looked at how the same techniques get weaponised — and what that means for detection.",
      href: "writeups/keystroke-mouse-tracking.html"
    },
    {
      title: "NLP: What I Actually Learned",
      date: "2026-01-20",
      desc: "Notes from my NLP module — tokenisation, embeddings, and why natural language processing keeps showing up in security more than most people expect.",
      href: "writeups/nlp-what-i-learned.html"
    }
  ]
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const moonSVG  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const sunSVG   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const menuSVG  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
const closeSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

// ─── Theme ────────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  $("#themeIcon").innerHTML = theme === "dark" ? moonSVG : sunSVG;
  state.theme = theme;
}

applyTheme(state.theme);
$("#menuIcon").innerHTML       = menuSVG;
$("#modalCloseIcon").innerHTML = closeSVG;

$("#themeBtn").addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
});

// ─── Mobile menu ──────────────────────────────────────────────────────────────
const menuBtn    = $("#menuBtn");
const mobileMenu = $("#mobileMenu");

menuBtn.addEventListener("click", () => {
  if (mobileMenu.hasAttribute("hidden")) mobileMenu.removeAttribute("hidden");
  else mobileMenu.setAttribute("hidden", "");
});
$$(".mobile-menu a").forEach(a =>
  a.addEventListener("click", () => mobileMenu.setAttribute("hidden", ""))
);

// ─── Scroll progress ──────────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const pct = doc.scrollHeight - doc.clientHeight > 0
    ? (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100 : 0;
  $(".scroll-progress").style.width = `${pct}%`;
}, { passive: true });

// ─── Animated counter ─────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 900) {
  const isPlus = String(target).endsWith("+");
  const num    = parseInt(target);
  if (num === 0) { el.textContent = "0"; return; } // skip animation if zero
  const start  = performance.now();
  (function step(now) {
    const p     = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * num) + (isPlus && p >= 1 ? "+" : "");
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = String(target);
  })(start);
}

new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter($("#statProjects"), state.projects.length);
    animateCounter($("#statWriteups"), state.writeups.length);
    animateCounter($("#statRooms"), state.thmRooms);
    obs.disconnect();
  });
}, { threshold: 0.5 }).observe($(".stats"));

// ─── Projects ─────────────────────────────────────────────────────────────────
function projectCard(p, idx) {
  const tags = p.tags.map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("");
  const gh   = p.links.github
    ? `<a class="link" href="${p.links.github}" target="_blank" rel="noreferrer">GitHub →</a>` : "";
  const live = p.links.live && p.links.live !== "#"
    ? `<a class="link" href="${p.links.live}" target="_blank" rel="noreferrer">Live →</a>` : "";
  return `
    <article class="card">
      <div class="project-top"><h3>${escapeHtml(p.title)}</h3></div>
      <p class="muted">${escapeHtml(p.desc)}</p>
      <div class="badges">${tags}</div>
      <div class="card-actions">
        <button class="link" type="button" data-open="${idx}">Case Study</button>
        ${gh}${live}
      </div>
    </article>`;
}
$("#projectsGrid").innerHTML = state.projects.map(projectCard).join("");

// ─── Writeups ─────────────────────────────────────────────────────────────────
function writeupCard(w) {
  const action = w.href === "#"
    ? `<span class="link link-disabled">Coming soon</span>`
    : `<a class="link" href="${w.href}">Read →</a>`;
  return `
    <article class="card">
      <div class="project-top">
        <h3>${escapeHtml(w.title)}</h3>
        <span class="badge">${escapeHtml(w.date)}</span>
      </div>
      <p class="muted">${escapeHtml(w.desc)}</p>
      <div class="card-actions">${action}</div>
    </article>`;
}
$("#writeupsGrid").innerHTML = state.writeups.map(writeupCard).join("");

// ─── Modal ────────────────────────────────────────────────────────────────────
const modal      = $("#modal");
const modalTitle = $("#modalTitle");
const modalBody  = $("#modalBody");
const modalFoot  = $("#modalFoot");

function openModal(idx) {
  const p = state.projects[idx];
  if (!p) return;
  const cs = p.caseStudy;
  modalTitle.textContent = p.title;
  modalBody.innerHTML = `
    <p>${escapeHtml(p.desc)}</p>
    <hr class="sep" />
    <h4>Problem</h4><p>${escapeHtml(cs.problem)}</p>
    <h4>Approach</h4>
    <ul>${cs.approach.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
    <h4>Results</h4>
    <ul>${cs.results.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
    <h4>Stack</h4>
    <p>${cs.stack.map(s => `<span class="badge">${escapeHtml(s)}</span>`).join(" ")}</p>`;
  const links = [];
  if (p.links.github)
    links.push(`<a class="link" href="${p.links.github}" target="_blank" rel="noreferrer">GitHub →</a>`);
  if (p.links.live && p.links.live !== "#")
    links.push(`<a class="link" href="${p.links.live}" target="_blank" rel="noreferrer">Live →</a>`);
  modalFoot.innerHTML = links.join("");
  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

document.addEventListener("click", e => {
  const btn = e.target.closest("[data-open]");
  if (btn) { openModal(Number(btn.getAttribute("data-open"))); return; }
  if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal();
});

// ─── Contact form → Formspree ─────────────────────────────────────────────────
const contactForm = $("#contactForm");
const formStatus  = $("#formStatus");
const submitBtn   = $("#submitBtn");

contactForm.addEventListener("submit", async e => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });
    if (res.ok) {
      formStatus.textContent = "✓ Message sent — I'll get back to you soon.";
      formStatus.className = "form-status form-success";
      contactForm.reset();
    } else {
      const json = await res.json().catch(() => ({}));
      formStatus.textContent = `✗ ${json?.errors?.[0]?.message || "Something went wrong — try emailing directly."}`;
      formStatus.className = "form-status form-error";
    }
  } catch {
    formStatus.textContent = "✗ Could not send — check your connection or email me directly.";
    formStatus.className = "form-status form-error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
  }
});

// ─── Footer year ──────────────────────────────────────────────────────────────
$("#year").textContent = String(new Date().getFullYear());

// ─── XSS-safe escaping ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
