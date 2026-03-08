const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const state = {
  theme: localStorage.getItem("theme") || "dark",
  projects: [
    {
      title: "Cyber security prtoject",
      desc: "Privacy-Preserving Walk-Away Lock with Presence-Based Security, Lightweight Identity Verification",
      tags: ["Python", "OpenCV", "Mediapipe"],
      links: {
        github: "https://github.com/kkempy/Privacy-Preserving-Walk-Away-Lock-with-Presence-Based-Security-Lightweight-Identity-Verification",
        live: "#"
      },
      caseStudy: {
        problem: "Leaving devices vulnerable to unauthorsed users.",
        approach: [
          "Using the webcam to detect when users leave the frame to lock.",
          "Used face detection then added face identity to authorise the user.",
          "built on the system while understanding more about the tools."
        ],
        results: [
          "Built a application that only a authorised user doesnt require the user to do anything",
          "Document the whole thing and then published to github"
        ],
        stack: ["Python", "OpenCV", "Mediapipe"]
      }
    },
    {
      title: "Website portfolio",
      desc: "A website as a portfolio.",
      tags: ["Networking", "CSS", "JS", "HTML", "Portfolio"],
      links: {
        github: "https://github.com/kkempy/kkemp.github.io",
        live: "#"
      },
      caseStudy: {
        problem: "Create a portfolio to show of me and my skills.",
        approach: [
          "Learn about hosting the website, getting a domain, learning how to have the website accessible",
          "Built a website for as cheap as possible, and show of my skills in UI and web.",
        ],
        results: [
          "Demonstrates security fundamentals + UI polish.",
          "Show of my skills and learn ."
        ],
        stack: ["Web", "JSON", "HTML", "CSS", "JS"]
      }
    },
    
  ],
  writeups: [
    {
      title: "How I approach web recon",
      date: "2026-02-12",
      desc: "A short workflow: scope -> recon -> endpoints -> hypotheses -> validation.",
      href: "#"
    },
    {
      title: "XSS: impact, context, mitigation",
      date: "2026-01-28",
      desc: "The parts people miss: context-aware escaping and dangerous sinks.",
      href: "#"
    },
    {
      title: "DNS basics for attackers & defenders",
      date: "2026-01-10",
      desc: "Records, resolution, and the common misconfigs that bite.",
      href: "#"
    }
  ]
};

// Theme
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  $("#themeIcon").textContent = theme === "dark" ? "Moon" : "Sun";
  state.theme = theme;
}
applyTheme(state.theme);

$("#themeBtn").addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
});

// Mobile menu
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.hasAttribute("hidden");
  if (isHidden) mobileMenu.removeAttribute("hidden");
  else mobileMenu.setAttribute("hidden", "");
});

// Close mobile menu on click
$$(".mobile-menu a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.setAttribute("hidden", "");
}));

// Scroll progress bar
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const p = height > 0 ? (scrollTop / height) * 100 : 0;
  $(".scroll-progress").style.width = `${p}%`;
});

// Render projects
function projectCard(p, idx) {
  const tags = p.tags.map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("");
  const gh = p.links.github ? `<a class="link" href="${p.links.github}" target="_blank" rel="noreferrer">GitHub -></a>` : "";
  const live = p.links.live && p.links.live !== "#" ? `<a class="link" href="${p.links.live}" target="_blank" rel="noreferrer">Live -></a>` : "";

  return `
    <article class="card">
      <div class="project-top">
        <h3>${escapeHtml(p.title)}</h3>
      </div>
      <p class="muted">${escapeHtml(p.desc)}</p>
      <div class="badges">${tags}</div>
      <div class="card-actions">
        <button class="link" type="button" data-open="${idx}">Case Study</button>
        ${gh}
        ${live}
      </div>
    </article>
  `;
}

function renderProjects() {
  const grid = $("#projectsGrid");
  grid.innerHTML = state.projects.map(projectCard).join("");
  $("#statProjects").textContent = String(state.projects.length);
}
renderProjects();

// Render writeups
function writeupCard(w) {
  return `
    <article class="card">
      <div class="project-top">
        <h3>${escapeHtml(w.title)}</h3>
        <span class="badge">${escapeHtml(w.date)}</span>
      </div>
      <p class="muted">${escapeHtml(w.desc)}</p>
      <div class="card-actions">
        <a class="link" href="${w.href}">Read -></a>
      </div>
    </article>
  `;
}
function renderWriteups() {
  const grid = $("#writeupsGrid");
  grid.innerHTML = state.writeups.map(writeupCard).join("");
  $("#statWriteups").textContent = String(state.writeups.length);
  $("#statLabs").textContent = "10+"; // change to your real number
}
renderWriteups();

// Modal
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalBody = $("#modalBody");
const modalFoot = $("#modalFoot");

function openModal(projectIndex) {
  const p = state.projects[projectIndex];
  if (!p) return;

  modalTitle.textContent = p.title;

  const cs = p.caseStudy;
  modalBody.innerHTML = `
    <p>${escapeHtml(p.desc)}</p>
    <hr class="sep" />
    <h4>Problem</h4>
    <p>${escapeHtml(cs.problem)}</p>
    <h4>Approach</h4>
    <ul>
      ${cs.approach.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
    </ul>
    <h4>Results</h4>
    <ul>
      ${cs.results.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
    </ul>
    <h4>Stack</h4>
    <p>${cs.stack.map(s => `<span class="badge">${escapeHtml(s)}</span>`).join(" ")}</p>
  `;

  const links = [];
  if (p.links.github) links.push(`<a class="link" href="${p.links.github}" target="_blank" rel="noreferrer">GitHub -></a>`);
  if (p.links.live && p.links.live !== "#") links.push(`<a class="link" href="${p.links.live}" target="_blank" rel="noreferrer">Live -></a>`);
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
  if (btn) {
    openModal(Number(btn.getAttribute("data-open")));
    return;
  }
  if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal();
});

// Contact form -> mailto
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
});

// Footer year
$("#year").textContent = String(new Date().getFullYear());

// Basic escaping
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}