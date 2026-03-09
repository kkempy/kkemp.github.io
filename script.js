const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const FORMSPREE_ID = "xbdzdjpb"; 
const state = {
  theme: localStorage.getItem("theme") || "dark",
  projects: [
    {
      title: "Privacy-Preserving Walk-Away Lock",
      desc: "A Python application that automatically locks your device when you leave, using computer vision to detect presence and verify identity — no interaction required.",
      tags: ["Python", "OpenCV", "Mediapipe", "Computer Vision"],
      links: {
        github: "https://github.com/kkempy/Privacy-Preserving-Walk-Away-Lock-with-Presence-Based-Security-Lightweight-Identity-Verification",
        live: "#"
      },
      caseStudy: {
        problem: "Devices left unattended are a common physical security risk, yet existing lock solutions require manual action. The goal was a hands-free, privacy-respecting solution that only activates for the authorised user.",
        approach: [
          "Used OpenCV and Mediapipe to detect when a person leaves the webcam frame, triggering an automatic screen lock.",
          "Added lightweight face recognition to verify identity on return — the device only unlocks for the registered user.",
          "Iterated on detection thresholds to reduce false positives while keeping latency low.",
          "Kept all processing local — no cloud, no data leaving the machine."
        ],
        results: [
          "Fully functional application that locks automatically with no user interaction required.",
          "Zero cloud dependency — all identity checks run locally, preserving privacy.",
          "Documented and published to GitHub with setup instructions."
        ],
        stack: ["Python", "OpenCV", "Mediapipe"]
      }
    },
    {
      title: "Cyber Security Portfolio Site",
      desc: "This portfolio — a hand-coded static site hosted on GitHub Pages with a custom domain, dark/light theming, and no frameworks.",
      tags: ["HTML", "CSS", "JS", "GitHub Pages"],
      links: {
        github: "https://github.com/kkempy/kkemp.github.io",
        live: "https://kkemp.co.uk"
      },
      caseStudy: {
        problem: "Needed a professional portfolio that demonstrates both security knowledge and frontend ability — built from scratch, hosted for free, and fast.",
        approach: [
          "Built entirely in vanilla HTML, CSS, and JS — no frameworks or build tools.",
          "Deployed via GitHub Pages with a custom domain (kkemp.co.uk) — total cost: the domain.",
          "Applied security-minded thinking to the frontend: XSS-safe rendering with escapeHtml(), no inline event handlers, accessible markup."
        ],
        results: [
          "Live at kkemp.co.uk — a real, deployed product.",
          "Shows UI and frontend security skills in a single project."
        ],
        stack: ["HTML", "CSS", "JS", "GitHub Pages"]
      }
    }
  ],
  writeups: [
    {
      title: "How I approach web recon",
      date: "2026-02-12",
      desc: "My workflow: scope → passive recon → endpoint mapping → hypothesis → validation. What I've learned from doing it properly.",
      href: "#"
    },
    {
      title: "XSS: impact, context, and the parts people miss",
      date: "2026-01-28",
      desc: "Context-aware escaping, dangerous sinks, and why 'just sanitise input' isn't the full answer.",
      href: "#"
    },
    {
      title: "DNS basics for attackers and defenders",
      date: "2026-01-10",
      desc: "Records, resolution chains, and the common misconfigurations that show up in real assessments.",
      href: "#"
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

// Set static SVG icons
$("#menuIcon").innerHTML  = menuSVG;
$("#modalCloseIcon").innerHTML = closeSVG;

$("#themeBtn").addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
});

// ─── Mobile menu ──────────────────────────────────────────────────────────────
const menuBtn    = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.hasAttribute("hidden");
  if (isHidden) mobileMenu.removeAttribute("hidden");
  else mobileMenu.setAttribute("hidden", "");
});
$$(".mobile-menu a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.setAttribute("hidden", "");
}));

// ─── Scroll progress bar ──────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const p = doc.scrollHeight - doc.clientHeight > 0
    ? (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100 : 0;
  $(".scroll-progress").style.width = `${p}%`;
}, { passive: true });

// ─── Animated counter ─────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 900) {
  const isPlus = String(target).endsWith("+");
  const num = parseInt(target);
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    el.textContent = Math.floor(eased * num) + (isPlus && progress >= 1 ? "+" : "");
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = String(target);
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter($("#statProjects"), state.projects.length);
      animateCounter($("#statWriteups"), state.writeups.length);
      animateCounter($("#statLabs"), "10+");
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

// ─── Render projects ──────────────────────────────────────────────────────────
function projectCard(p, idx) {
  const tags = p.tags.map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("");
  const gh   = p.links.github ? `<a class="link" href="${p.links.github}" target="_blank" rel="noreferrer">GitHub →</a>` : "";
  const live = p.links.live && p.links.live !== "#" ? `<a class="link" href="${p.links.live}" target="_blank" rel="noreferrer">Live →</a>` : "";
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

function renderProjects() {
  $("#projectsGrid").innerHTML = state.projects.map(projectCard).join("");
}
renderProjects();

// ─── Render writeups ──────────────────────────────────────────────────────────
function writeupCard(w) {
  const isPlaceholder = w.href === "#";
  const action = isPlaceholder
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

function renderWriteups() {
  $("#writeupsGrid").innerHTML = state.writeups.map(writeupCard).join("");
}
renderWriteups();

// Start watching stats
const statsEl = $(".stats");
if (statsEl) statsObserver.observe(statsEl);

// ─── Modal ────────────────────────────────────────────────────────────────────
const modal      = $("#modal");
const modalTitle = $("#modalTitle");
const modalBody  = $("#modalBody");
const modalFoot  = $("#modalFoot");

function openModal(idx) {
  const p = state.projects[idx];
  if (!p) return;
  modalTitle.textContent = p.title;
  const cs = p.caseStudy;
  modalBody.innerHTML = `
    <p>${escapeHtml(p.desc)}</p>
    <hr class="sep" />
    <h4>Problem</h4>
    <p>${escapeHtml(cs.problem)}</p>
    <h4>Approach</h4>
    <ul>${cs.approach.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
    <h4>Results</h4>
    <ul>${cs.results.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
    <h4>Stack</h4>
    <p>${cs.stack.map(s => `<span class="badge">${escapeHtml(s)}</span>`).join(" ")}</p>`;
  const links = [];
  if (p.links.github) links.push(`<a class="link" href="${p.links.github}" target="_blank" rel="noreferrer">GitHub →</a>`);
  if (p.links.live && p.links.live !== "#") links.push(`<a class="link" href="${p.links.live}" target="_blank" rel="noreferrer">Live →</a>`);
  modalFoot.innerHTML = links.join("");
  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  if (btn) { openModal(Number(btn.getAttribute("data-open"))); return; }
  if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal();
});

// ─── Contact form → Formspree ─────────────────────────────────────────────────
const contactForm = $("#contactForm");
const formStatus  = $("#formStatus");
const submitBtn   = $("#submitBtn");

contactForm.addEventListener("submit", async (e) => {
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
      formStatus.textContent = `✗ ${json?.errors?.[0]?.message || "Something went wrong. Try emailing directly."}`;
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
