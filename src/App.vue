<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Code,
  Code2,
  Compass,
  Copy,
  Cpu,
  ExternalLink,
  Flame,
  FolderCode,
  Github,
  Globe2,
  Heart,
  HeartHandshake,
  Home,
  Library,
  Linkedin,
  ListMusic,
  Mail,
  Menu,
  Pause,
  Play,
  Radio,
  Repeat,
  Search,
  Send,
  Server,
  Shuffle,
  SkipBack,
  SkipForward,
  Smartphone,
  Sparkles,
  Trophy,
  UserRound,
  Volume2,
  X,
  Wrench,
  PanelsTopLeft,
  Figma,
  History,
} from "lucide-vue-next";

const projects = [
  {
    id: 0,
    title: "Rentosphere Marketplace",
    category: "Web Development",
    date: "2026",
    overview:
      "A modern full-stack rental marketplace empowering users to discover, list, and manage residential property rentals. Includes map search, real-time messaging, and secure payments.",
    features: [
      "Interactive map search with boundary filtering and geo-clustering",
      "Automated tenant lease agreement generator and digital signatures",
      "Real-time chat between property managers and applicants",
      "Subscription billing and deposit workflows",
    ],
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
    ],
    commits: "482 commits",
    size: "24,000 LOC",
    repo: "https://github.com",
    demo: "https://example.com",
    icon: Building2,
    hue: "mint",
  },
  {
    id: 1,
    title: "HRFlow Employee Portal",
    category: "Applications",
    date: "2025",
    overview:
      "An employee portal for workforce onboarding, leave approvals, performance reviews, and organizational analytics.",
    features: [
      "Role-based access for admins, managers, and employees",
      "Interactive department vacation planning",
      "Automated PDF report generation",
    ],
    tech: ["Next.js", "FastAPI", "Docker", "PostgreSQL", "Tailwind CSS"],
    commits: "320 commits",
    size: "18,500 LOC",
    repo: "https://github.com",
    demo: "https://example.com",
    icon: PanelsTopLeft,
    hue: "coral",
  },
  {
    id: 2,
    title: "MobiWash On-Demand Service",
    category: "Applications",
    date: "2025",
    overview:
      "A mobile-first booking app connecting vehicle owners with professional mobile car detailers in real time.",
    features: [
      "Live GPS tracking for service dispatch",
      "Push notifications and instant status updates",
      "Multi-tier pricing based on vehicle size",
    ],
    tech: ["React Native", "Firebase", "Node.js", "Express", "Google Maps API"],
    commits: "210 commits",
    size: "14,200 LOC",
    repo: "https://github.com",
    demo: "https://example.com",
    icon: Smartphone,
    hue: "blue",
  },
  {
    id: 3,
    title: "Saajidah Creative Studio",
    category: "UI/UX Design",
    date: "2025",
    overview:
      "An experimental interactive portfolio showcasing digital design systems, motion interfaces, and accessibility benchmarks.",
    features: [
      "Theme engine with automated contrast verification",
      "Custom audio feedback on interactive elements",
      "Smooth WebGL background rendering",
    ],
    tech: ["Canvas", "Tailwind CSS", "JavaScript", "Figma", "Three.js"],
    commits: "155 commits",
    size: "9,800 LOC",
    repo: "https://github.com",
    demo: "https://example.com",
    icon: Sparkles,
    hue: "lilac",
  },
  {
    id: 4,
    title: "Casio Calculator Emulator",
    category: "Web Development",
    date: "2024",
    overview:
      "A browser-based scientific calculator emulator reproducing classic hardware mechanics, matrix math, and formula parsing.",
    features: [
      "Reverse Polish Notation parser",
      "Keyboard shortcuts matching scientific calculator layout",
      "Memory registers and expression history",
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "Math.js", "Web Audio API"],
    commits: "95 commits",
    size: "6,200 LOC",
    repo: "https://github.com",
    demo: "https://example.com",
    icon: Code2,
    hue: "yellow",
  },
  {
    id: 5,
    title: "Library Management Database",
    category: "APIs & Backend",
    date: "2024",
    overview:
      "A high-concurrency microservice API for cataloging digital books, managing subscriptions, and tracking overdue lending.",
    features: [
      "Relational schema with full-text search indexing",
      "JWT authentication with refresh rotation",
      "Email notifications via Redis queue worker",
    ],
    tech: ["Python", "Flask", "PostgreSQL", "Redis", "Docker"],
    commits: "118 commits",
    size: "8,100 LOC",
    repo: "https://github.com",
    demo: "https://example.com",
    icon: Server,
    hue: "orange",
  },
];

const skills = [
  {
    category: "Frontend Development",
    icon: PanelsTopLeft,
    tone: "blue",
    items: [
      {
        name: "React / Next.js",
        level: 95,
        snippet: "const App = () => <Component />;",
      },
      {
        name: "TypeScript",
        level: 90,
        snippet: "type User = { id: string; name: string };",
      },
      {
        name: "Tailwind CSS",
        level: 98,
        snippet: '<div class="bg-emerald-400 text-black" />',
      },
      {
        name: "HTML5 / Canvas",
        level: 92,
        snippet: "ctx.fillRect(0, 0, width, height);",
      },
    ],
  },
  {
    category: "Backend & Database",
    icon: Server,
    tone: "mint",
    items: [
      {
        name: "Node.js / Express",
        level: 88,
        snippet: "app.get('/api/v1', (req, res) => res.json({ ok: true }));",
      },
      {
        name: "Python / FastAPI",
        level: 85,
        snippet: "@app.get('/')\nasync def root():\n    return {'status': 200}",
      },
      {
        name: "PostgreSQL / SQL",
        level: 86,
        snippet: "SELECT * FROM projects WHERE active = true;",
      },
      {
        name: "REST & WebSockets",
        level: 90,
        snippet: "ws.send(JSON.stringify({ event: 'ping' }));",
      },
    ],
  },
  {
    category: "Languages",
    icon: Code,
    tone: "coral",
    items: [
      {
        name: "JavaScript (ES6+)",
        level: 96,
        snippet: "const [state, setState] = useState(initial);",
      },
      {
        name: "TypeScript",
        level: 90,
        snippet: "interface Config { port: number; host: string; }",
      },
      {
        name: "Python",
        level: 84,
        snippet: "def calculate_metrics(data: list) -> dict:",
      },
      {
        name: "SQL",
        level: 85,
        snippet: "CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT);",
      },
    ],
  },
  {
    category: "Tools & Workflow",
    icon: Wrench,
    tone: "yellow",
    items: [
      {
        name: "Git & GitHub",
        level: 94,
        snippet: "git commit -m 'feat: implement project'",
      },
      {
        name: "Docker",
        level: 80,
        snippet: "FROM node:20-alpine\nWORKDIR /app",
      },
      {
        name: "Webpack / Vite",
        level: 85,
        snippet: "export default defineConfig({ plugins: [] });",
      },
      {
        name: "Jest / Testing",
        level: 82,
        snippet: "expect(result).toBe(expectedValue);",
      },
    ],
  },
  {
    category: "UI/UX & Prototyping",
    icon: Figma,
    tone: "lilac",
    items: [
      {
        name: "Figma",
        level: 92,
        snippet: "// Design system components & auto layout",
      },
      {
        name: "Responsive Design",
        level: 98,
        snippet: "@media (min-width: 768px) { ... }",
      },
      {
        name: "Accessibility (WCAG)",
        level: 90,
        snippet: '<button aria-label="Close dialog"></button>',
      },
      {
        name: "Wireframing",
        level: 88,
        snippet: "// Low-fidelity to high-fidelity UX maps",
      },
    ],
  },
];

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderCode },
  { id: "about", label: "About Me", icon: UserRound },
  { id: "skills", label: "Technical Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];
const filters = [
  "All",
  "Web Development",
  "UI/UX Design",
  "Applications",
  "APIs & Backend",
];
const currentView = ref("home");
const currentFilter = ref("All");
const query = ref("");
const mobileMenuOpen = ref(false);
const selectedProject = ref(null);
const selectedSkill = ref(null);
const toast = ref("");
const favorite = ref(false);
const playing = ref(false);
const shuffle = ref(false);
const loop = ref(false);
const volume = ref(70);
const trackIndex = ref(0);
const elapsed = ref(0);
const history = ref(["home"]);
const historyIndex = ref(0);
const contact = ref({ name: "", email: "", subject: "", message: "" });
let timer;
let toastTimer;
const activeTrack = computed(() => projects[trackIndex.value]);
const filteredProjects = computed(() =>
  projects.filter(
    (project) =>
      (currentFilter.value === "All" ||
        project.category === currentFilter.value) &&
      (!query.value.trim() ||
        `${project.title} ${project.overview} ${project.category} ${project.tech.join(" ")}`
          .toLowerCase()
          .includes(query.value.trim().toLowerCase())),
  ),
);
const searchResults = computed(() => {
  const term = query.value.trim().toLowerCase();
  return term
    ? projects.filter((project) =>
        `${project.title} ${project.overview} ${project.category} ${project.tech.join(" ")}`
          .toLowerCase()
          .includes(term),
      )
    : [];
});
const formattedTime = computed(
  () =>
    `${Math.floor(elapsed.value / 60)}:${String(elapsed.value % 60).padStart(2, "0")}`,
);
const progress = computed(() => (elapsed.value / 165) * 100);

function navigate(view, record = true) {
  currentView.value = view;
  mobileMenuOpen.value = false;
  document
    .querySelector(".content-scroll")
    ?.scrollTo({ top: 0, behavior: "smooth" });
  if (record && history.value[historyIndex.value] !== view) {
    history.value = [...history.value.slice(0, historyIndex.value + 1), view];
    historyIndex.value = history.value.length - 1;
  }
}
function goBack() {
  if (historyIndex.value > 0) {
    historyIndex.value--;
    navigate(history.value[historyIndex.value], false);
  }
}
function goForward() {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++;
    navigate(history.value[historyIndex.value], false);
  }
}
function notify(message) {
  toast.value = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.value = "";
  }, 2800);
}
function showProject(project) {
  selectedProject.value = project;
}
function playTrack(id) {
  trackIndex.value = id;
  elapsed.value = 0;
  if (!playing.value) playing.value = true;
}
function nextTrack() {
  trackIndex.value = shuffle.value
    ? Math.floor(Math.random() * projects.length)
    : (trackIndex.value + 1) % projects.length;
  elapsed.value = 0;
}
function previousTrack() {
  trackIndex.value = (trackIndex.value - 1 + projects.length) % projects.length;
  elapsed.value = 0;
}
function togglePlayback() {
  playing.value = !playing.value;
}
function seek(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  elapsed.value = Math.round(
    Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * 165,
  );
}
function downloadProfile() {
  const profile = `SAAJIDAH ABRAHAMS\nFull-Stack Web Developer & Creative Technologist\n\nPROFILE\nBuilding accessible, resilient, human-centered web applications.\n\nTECHNOLOGIES\nReact, TypeScript, JavaScript, Node.js, Python, PostgreSQL, Tailwind CSS\n\nSELECTED PROJECTS\n${projects.map((project) => `- ${project.title}: ${project.overview}`).join("\n")}\n\nCONTACT\nsaajidah.abrahams@dev.io\n`;
  const url = URL.createObjectURL(new Blob([profile], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "Saajidah-Abrahams-Profile.txt";
  link.click();
  URL.revokeObjectURL(url);
  notify("Profile downloaded");
}
function submitContact() {
  const subject = encodeURIComponent(contact.value.subject);
  const body = encodeURIComponent(
    `Hi Saajidah,\n\n${contact.value.message}\n\nFrom: ${contact.value.name} (${contact.value.email})`,
  );
  window.location.href = `mailto:saajidah.abrahams@dev.io?subject=${subject}&body=${body}`;
  notify("Opening your email app with the message ready");
}
async function copySnippet() {
  try {
    await navigator.clipboard.writeText(selectedSkill.value.snippet);
    notify("Snippet copied to clipboard");
  } catch {
    notify("Clipboard access is unavailable in this browser");
  }
}
function onKeydown(event) {
  if (event.key === "Escape") {
    selectedProject.value = null;
    selectedSkill.value = null;
    mobileMenuOpen.value = false;
  }
}
onMounted(() => {
  timer = setInterval(() => {
    if (!playing.value) return;
    if (elapsed.value < 165) elapsed.value++;
    else if (loop.value) elapsed.value = 0;
    else nextTrack();
  }, 1000);
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  clearInterval(timer);
  clearTimeout(toastTimer);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="app-shell">
    <div class="workspace">
      <div
        v-if="mobileMenuOpen"
        class="mobile-backdrop"
        @click="mobileMenuOpen = false"
      ></div>
      <aside class="sidebar" :class="{ 'sidebar-open': mobileMenuOpen }">
        <div class="brand-row">
          <button class="brand" @click="navigate('home')">
            <span class="monogram">SA</span
            ><span
              ><strong>Saajidah</strong><small>Software Engineer</small></span
            >
          </button>
          <button
            class="icon-button mobile-close"
            aria-label="Close menu"
            @click="mobileMenuOpen = false"
          >
            <X />
          </button>
        </div>
        <nav class="nav-box" aria-label="Main navigation">
          <button
            v-for="item in navItems"
            :key="item.id"
            class="nav-item"
            :class="{ active: currentView === item.id }"
            @click="navigate(item.id)"
          >
            <component :is="item.icon" /><span>{{ item.label }}</span>
          </button>
        </nav>
        <section class="library-box">
          <div class="library-title">
            <span><Library /> Your Library</span><small>VUE 3</small>
          </div>
          <p class="eyebrow">Featured stacks</p>
          <button
            class="stack-link"
            @click="
              currentFilter = 'Web Development';
              navigate('projects');
            "
          >
            <span class="stack-icon tint-blue"><Globe2 /></span
            ><span
              ><strong>Web Engineering</strong
              ><small>React, Next.js, Node</small></span
            >
          </button>
          <button
            class="stack-link"
            @click="
              currentFilter = 'UI/UX Design';
              navigate('projects');
            "
          >
            <span class="stack-icon tint-coral"><PanelsTopLeft /></span
            ><span
              ><strong>UI/UX Craftsmanship</strong
              ><small>Figma, Design Systems</small></span
            >
          </button>
          <button
            class="stack-link"
            @click="
              currentFilter = 'Applications';
              navigate('projects');
            "
          >
            <span class="stack-icon tint-mint"><Smartphone /></span
            ><span
              ><strong>Full Stack Apps</strong
              ><small>TypeScript, Python, SQL</small></span
            >
          </button>
          <button
            class="stack-link"
            @click="
              currentFilter = 'APIs & Backend';
              navigate('projects');
            "
          >
            <span class="stack-icon tint-yellow"><Server /></span
            ><span
              ><strong>Cloud & Microservices</strong
              ><small>PostgreSQL, REST, AWS</small></span
            >
          </button>
          <div class="sidebar-note">
            <span class="pulse-dot"></span> Available for thoughtful projects
          </div>
        </section>
      </aside>

      <main class="main-panel">
        <header class="topbar">
          <div class="topbar-left">
            <button
              class="icon-button mobile-menu"
              aria-label="Open menu"
              @click="mobileMenuOpen = true"
            >
              <Menu />
            </button>
            <div class="history-controls">
              <button
                class="icon-button"
                aria-label="Go back"
                :disabled="historyIndex === 0"
                @click="goBack"
              >
                <ArrowLeft /></button
              ><button
                class="icon-button"
                aria-label="Go forward"
                :disabled="historyIndex >= history.length - 1"
                @click="goForward"
              >
                <ArrowRight />
              </button>
            </div>
            <label class="search-box"
              ><Search /><input
                v-model="query"
                type="search"
                placeholder="Search projects, technologies..."
                aria-label="Search portfolio" /><button
                v-if="query"
                class="search-clear"
                aria-label="Clear search"
                @click="query = ''"
              >
                <X /></button
            ></label>
          </div>
          <div class="topbar-right">
            <button class="download-button" @click="downloadProfile">
              <ArrowDownToLine /> <span>Download Profile</span></button
            ><span class="work-badge"><i></i><span>Open to Work</span></span
            ><button class="profile-pill" @click="navigate('about')">
              <span class="mini-avatar">SA</span><span>Saajidah</span>
            </button>
          </div>
        </header>

        <div class="content-scroll">
          <section v-if="query.trim()" class="search-view">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Portfolio search</p>
                <h2>Results for “{{ query }}”</h2>
              </div>
              <span class="result-count">{{ searchResults.length }} found</span>
            </div>
            <div v-if="searchResults.length" class="project-grid search-grid">
              <button
                v-for="project in searchResults"
                :key="project.id"
                class="project-card"
                @click="showProject(project)"
              >
                <span class="project-art" :class="`art-${project.hue}`"
                  ><component :is="project.icon" /></span
                ><span class="category-label">{{ project.category }}</span
                ><strong>{{ project.title }}</strong
                ><span class="muted line-clamp">{{ project.overview }}</span>
              </button>
            </div>
            <div v-else class="empty-state">
              <Search /><strong>No projects found</strong
              ><span>Try a technology, category, or project name.</span>
            </div>
          </section>

          <template v-else>
            <section v-if="currentView === 'home'" class="view-stack">
              <section class="hero-banner">
                <div class="hero-copy">
                  <span class="kicker"><Sparkles /> Developer portfolio</span>
                  <h1>Hey, I'm Saajidah<span class="accent-dot">.</span></h1>
                  <h2>
                    Full-stack web developer<br class="desktop-break" />
                    & creative technologist
                  </h2>
                  <p>
                    Crafting responsive, resilient, and human-centered web
                    applications. Turning complex codebases into intuitive,
                    high-performance digital products.
                  </p>
                  <div class="hero-actions">
                    <button
                      class="primary-button"
                      @click="navigate('projects')"
                    >
                      <Play /> Explore projects</button
                    ><button
                      class="secondary-button"
                      @click="navigate('contact')"
                    >
                      Get in touch <ArrowUpRight />
                    </button>
                  </div>
                </div>
                <div class="pulse-card">
                  <div class="pulse-heading">
                    <span>Engineering pulse</span
                    ><span class="pulse-dot"></span>
                  </div>
                  <div><span>Total commits</span><strong>1,480+</strong></div>
                  <div>
                    <span>Code quality</span
                    ><strong class="green">99.8%</strong>
                  </div>
                  <div>
                    <span>Primary stack</span
                    ><strong>TS / React / Python</strong>
                  </div>
                  <div class="pulse-decoration"><Code2 /></div>
                </div>
                <div class="hero-index">01 <span> / 05</span></div>
              </section>

              <section class="spotlight">
                <div class="spotlight-label">
                  <span><Flame /> Featured project</span
                  ><span>Selected work · 2026</span>
                </div>
                <div class="spotlight-content">
                  <div class="spotlight-art art-mint">
                    <Building2 /><span>RENTO<br />SPHERE</span>
                  </div>
                  <div class="spotlight-copy">
                    <p class="eyebrow">Marketplace · Full stack</p>
                    <h2>Rentosphere Marketplace</h2>
                    <p>
                      A modern property rental platform with interactive map
                      search, instant messaging, digital lease generation, and
                      secure payment workflows.
                    </p>
                    <div class="tag-row">
                      <span
                        v-for="tag in projects[0].tech.slice(0, 4)"
                        :key="tag"
                        >{{ tag }}</span
                      >
                    </div>
                    <div class="spotlight-actions">
                      <button
                        class="primary-button small"
                        @click="showProject(projects[0])"
                      >
                        Explore case study <ArrowUpRight /></button
                      ><a
                        :href="projects[0].repo"
                        target="_blank"
                        rel="noreferrer"
                        class="secondary-button small"
                        ><Github /> Repository</a
                      >
                    </div>
                  </div>
                </div>
              </section>

              <section class="section-block">
                <div class="section-heading">
                  <div>
                    <p class="eyebrow">A few favorites</p>
                    <h2>Featured projects</h2>
                  </div>
                  <button class="text-button" @click="navigate('projects')">
                    All projects <ArrowRight />
                  </button>
                </div>
                <div class="project-grid featured-grid">
                  <button
                    v-for="project in projects.slice(0, 3)"
                    :key="project.id"
                    class="project-card"
                    @click="showProject(project)"
                  >
                    <span class="project-art" :class="`art-${project.hue}`"
                      ><component :is="project.icon" /></span
                    ><span class="category-label"
                      >{{ project.category }} · {{ project.date }}</span
                    ><strong>{{ project.title }}</strong
                    ><span class="muted line-clamp">{{ project.overview }}</span
                    ><span class="card-meta"
                      >{{ project.commits }}
                      <span>{{ project.size }}</span></span
                    >
                  </button>
                </div>
              </section>

              <section class="section-block">
                <div class="section-heading">
                  <div>
                    <p class="eyebrow">Recently built</p>
                    <h2>Project activity</h2>
                  </div>
                  <span class="muted">Select a row to play its preview</span>
                </div>
                <div class="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Project</th>
                        <th>Stack</th>
                        <th>Year</th>
                        <th>Size</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(project, index) in projects"
                        :key="project.id"
                        @click="playTrack(project.id)"
                      >
                        <td class="row-number">
                          {{ String(index + 1).padStart(2, "0") }}
                        </td>
                        <td>
                          <strong>{{ project.title }}</strong
                          ><small>{{ project.overview }}</small>
                        </td>
                        <td>
                          <span
                            v-for="tag in project.tech.slice(0, 2)"
                            :key="tag"
                            class="table-tag"
                            >{{ tag }}</span
                          >
                        </td>
                        <td>{{ project.date }}</td>
                        <td>{{ project.size }}</td>
                        <td>
                          <button
                            class="icon-button"
                            :aria-label="`View ${project.title}`"
                            @click.stop="showProject(project)"
                          >
                            <ArrowUpRight />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section class="section-block">
                <div class="section-heading">
                  <div>
                    <p class="eyebrow">The toolkit</p>
                    <h2>Skills matrix</h2>
                  </div>
                  <button class="text-button" @click="navigate('skills')">
                    All skills <ArrowRight />
                  </button>
                </div>
                <div class="genre-grid">
                  <button
                    v-for="skill in skills"
                    :key="skill.category"
                    class="genre-tile"
                    :class="`tone-${skill.tone}`"
                    @click="navigate('skills')"
                  >
                    <component :is="skill.icon" /><strong>{{
                      skill.category
                    }}</strong>
                  </button>
                </div>
              </section>
            </section>

            <section v-else-if="currentView === 'projects'" class="view-stack">
              <div class="page-intro projects-intro">
                <div class="intro-art"><Code2 /></div>
                <div>
                  <p class="eyebrow">A considered collection</p>
                  <h1>Projects<span class="accent-dot">.</span></h1>
                  <p>
                    Web applications, cloud backends, and interactive
                    experiences, shaped around real problems.
                  </p>
                  <div class="intro-meta">
                    <span>Saajidah Abrahams</span><i></i
                    ><span>{{ projects.length }} selected projects</span>
                  </div>
                </div>
              </div>
              <div class="filter-row" aria-label="Filter projects">
                <button
                  v-for="filter in filters"
                  :key="filter"
                  :class="{ selected: currentFilter === filter }"
                  @click="currentFilter = filter"
                >
                  {{ filter === "All" ? "All projects" : filter }}
                </button>
              </div>
              <div class="project-grid catalog-grid">
                <button
                  v-for="project in filteredProjects"
                  :key="project.id"
                  class="project-card catalog-card"
                  @click="showProject(project)"
                >
                  <span class="project-art" :class="`art-${project.hue}`"
                    ><component :is="project.icon" /><span class="art-index"
                      >0{{ project.id + 1 }}</span
                    ></span
                  ><span class="category-label"
                    >{{ project.category }}
                    <span>· {{ project.date }}</span></span
                  ><strong>{{ project.title }}</strong
                  ><span class="muted line-clamp">{{ project.overview }}</span
                  ><span class="tag-row"
                    ><span v-for="tag in project.tech.slice(0, 4)" :key="tag">{{
                      tag
                    }}</span></span
                  ><span class="card-meta"
                    >{{ project.commits }}
                    <span>Read case study <ArrowUpRight /></span
                  ></span>
                </button>
                <div v-if="filteredProjects.length === 0" class="empty-state">
                  <FolderCode /><strong>No projects in this category</strong
                  ><span>Choose another filter to keep exploring.</span>
                </div>
              </div>
            </section>

            <section v-else-if="currentView === 'about'" class="view-stack">
              <section class="about-banner">
                <div class="about-avatar">
                  SA<span><Check /></span>
                </div>
                <div>
                  <p class="kicker"><BadgeCheck /> Verified developer</p>
                  <h1>Saajidah Abrahams</h1>
                  <p>
                    Passionate full-stack software developer and creative
                    technologist focused on accessible, resilient web
                    applications and human-centered software experiences.
                  </p>
                  <div class="stat-row">
                    <div><strong>1,480+</strong><span>Git commits</span></div>
                    <div><strong>185+</strong><span>PRs merged</span></div>
                    <div><strong>12</strong><span>Active projects</span></div>
                  </div>
                </div>
              </section>
              <div class="about-columns">
                <div class="about-main">
                  <article class="content-card">
                    <p class="eyebrow"><Compass /> The long view</p>
                    <h2>My journey</h2>
                    <p>
                      My engineering journey started with a curiosity for how
                      design and code intersect to shape human digital behavior.
                      I have developed a strong foundation across the web stack,
                      from frontend state management and UI performance to
                      backend API security and database modeling.
                    </p>
                    <p>
                      Whether architecting full-scale platforms like Rentosphere
                      or coding lightweight utility tools, I thrive on turning
                      complex problems into intuitive user interfaces.
                    </p>
                  </article>
                  <div class="principles">
                    <article class="content-card">
                      <HeartHandshake />
                      <h3>Core philosophy</h3>
                      <p>
                        Code should be clean, self-documenting, and resilient.
                        Accessibility, user empathy, and performance should
                        never be afterthoughts.
                      </p>
                    </article>
                    <article class="content-card">
                      <Cpu />
                      <h3>Working approach</h3>
                      <p>
                        Iterative development, thoughtful testing, continuous
                        improvement, and transparent collaboration.
                      </p>
                    </article>
                  </div>
                  <article class="content-card">
                    <p class="eyebrow"><Trophy /> The highlights</p>
                    <h2>Milestones</h2>
                    <div class="milestone">
                      <span>01</span>
                      <div>
                        <strong>Rentosphere Marketplace Launch</strong>
                        <p>
                          Designed and built a full-stack property platform.
                        </p>
                      </div>
                      <small>Full stack</small>
                    </div>
                    <div class="milestone">
                      <span>02</span>
                      <div>
                        <strong>Full-Stack Web Development</strong>
                        <p>
                          Modern web architecture, REST APIs, TypeScript, and
                          SQL.
                        </p>
                      </div>
                      <small>Certification</small>
                    </div>
                    <div class="milestone">
                      <span>03</span>
                      <div>
                        <strong>Design Systems & UI Engineering</strong>
                        <p>
                          Reusable components with accessibility at the center.
                        </p>
                      </div>
                      <small>UI/UX</small>
                    </div>
                  </article>
                </div>
                <aside class="content-card timeline">
                  <p class="eyebrow"><History /> Career & learning</p>
                  <h2>Along the way</h2>
                  <div class="timeline-item">
                    <small>2024 — PRESENT</small
                    ><strong>Full-Stack Web Developer</strong
                    ><span
                      >Independent software projects & product consulting</span
                    >
                  </div>
                  <div class="timeline-item">
                    <small>2023 — 2024</small
                    ><strong>Full-Stack Engineering Program</strong
                    ><span>Advanced web development & system design</span>
                  </div>
                  <div class="timeline-item">
                    <small>2021 — 2023</small><strong>Frontend Developer</strong
                    ><span>UI/UX craftsmanship & web applications</span>
                  </div>
                </aside>
              </div>
            </section>

            <section v-else-if="currentView === 'skills'" class="view-stack">
              <div class="page-heading">
                <p class="eyebrow">Tools I build with</p>
                <h1>My toolkit<span class="accent-dot">.</span></h1>
                <p>
                  A practical mix of languages, frameworks, and workflows for
                  taking thoughtful products from idea to release. Choose any
                  tool to see it in context.
                </p>
              </div>
              <div class="skills-grid">
                <article
                  v-for="group in skills"
                  :key="group.category"
                  class="skill-group"
                  :class="`tone-${group.tone}`"
                >
                  <div class="skill-group-title">
                    <span class="skill-group-icon"
                      ><component :is="group.icon" />
                    </span>
                    <div>
                      <p class="eyebrow">{{ group.items.length }} tools</p>
                      <h2>{{ group.category }}</h2>
                    </div>
                  </div>
                  <div class="skill-chip-list">
                    <button
                      v-for="skill in group.items"
                      :key="skill.name + skill.snippet"
                      class="skill-chip"
                      @click="selectedSkill = skill"
                    >
                      <Code2 />
                      <span>{{ skill.name }}</span>
                      <ArrowUpRight />
                    </button>
                  </div>
                </article>
              </div>
            </section>

            <section v-else class="view-stack">
              <section class="contact-banner">
                <p class="kicker"><Radio /> Open channel</p>
                <h1>
                  Let's make something<br />matter<span class="accent-dot"
                    >.</span
                  >
                </h1>
                <p>
                  Have a project idea, a role to discuss, or just want to talk
                  through a tricky product problem? Send me a note.
                </p>
              </section>
              <div class="contact-layout">
                <form class="contact-form" @submit.prevent="submitContact">
                  <div class="section-heading">
                    <div>
                      <p class="eyebrow">Start a conversation</p>
                      <h2>Send a message</h2>
                    </div>
                    <Send />
                  </div>
                  <div class="form-grid">
                    <label
                      >Your name<input
                        v-model.trim="contact.name"
                        required
                        autocomplete="name"
                        placeholder="Alex Mercer" /></label
                    ><label
                      >Email address<input
                        v-model.trim="contact.email"
                        required
                        type="email"
                        autocomplete="email"
                        placeholder="alex@company.com" /></label
                    ><label class="wide"
                      >Subject<input
                        v-model.trim="contact.subject"
                        required
                        placeholder="Project collaboration" /></label
                    ><label class="wide"
                      >Message<textarea
                        v-model.trim="contact.message"
                        required
                        rows="5"
                        placeholder="Tell me a little about what you have in mind..."
                      ></textarea>
                    </label>
                  </div>
                  <button type="submit" class="primary-button send-button">
                    <Send /> Prepare email
                  </button>
                  <p class="form-note">
                    Your email app will open with this message ready to send.
                  </p>
                </form>
                <aside class="contact-aside">
                  <a class="contact-link" href="mailto:saajidah.abrahams@dev.io"
                    ><Mail /><span
                      ><small>Direct email</small
                      ><strong>saajidah.abrahams@dev.io</strong></span
                    ><ArrowUpRight /></a
                  ><a
                    class="contact-link"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    ><Linkedin /><span
                      ><small>LinkedIn network</small
                      ><strong>Saajidah Abrahams</strong></span
                    ><ArrowUpRight /></a
                  ><a
                    class="contact-link"
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    ><Github /><span
                      ><small>GitHub profile</small
                      ><strong>saajidah-abrahams</strong></span
                    ><ArrowUpRight
                  /></a>
                  <div class="availability-card">
                    <CalendarDays />
                    <div>
                      <strong>Quick intro call</strong>
                      <p>Pick a slot to start a scheduling email.</p>
                    </div>
                    <div class="slot-grid">
                      <button
                        v-for="slot in [
                          'Mon 10:00 AM',
                          'Tue 2:30 PM',
                          'Thu 11:15 AM',
                          'Fri 4:00 PM',
                        ]"
                        :key="slot"
                        @click="
                          contact.subject = `Intro call request: ${slot}`;
                          contact.message = `Hi Saajidah, I would like to schedule the ${slot} intro call.`;
                          notify('Call request added to the contact form');
                        "
                      >
                        {{ slot }}
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </template>
        </div>
      </main>
    </div>

    <footer class="player-bar">
      <div class="now-playing">
        <span class="album-art" :class="`art-${activeTrack.hue}`"
          ><component :is="activeTrack.icon" /><i
            v-if="playing"
            class="equalizer"
            ><b></b><b></b><b></b></i></span
        ><span class="track-label"
          ><strong>{{ activeTrack.title }}</strong
          ><small>Saajidah Abrahams · {{ activeTrack.category }}</small></span
        ><button
          class="icon-button favorite-button"
          :class="{ favorite }"
          :aria-label="favorite ? 'Remove favorite' : 'Add favorite'"
          @click="
            favorite = !favorite;
            notify(favorite ? 'Added to favorites' : 'Removed from favorites');
          "
        >
          <Heart :fill="favorite ? 'currentColor' : 'none'" />
        </button>
      </div>
      <div class="player-controls">
        <div class="control-row">
          <button
            class="icon-button player-extra"
            :class="{ on: shuffle }"
            aria-label="Toggle shuffle"
            @click="
              shuffle = !shuffle;
              notify(shuffle ? 'Shuffle enabled' : 'Shuffle disabled');
            "
          >
            <Shuffle /></button
          ><button
            class="icon-button"
            aria-label="Previous project"
            @click="previousTrack"
          >
            <SkipBack /></button
          ><button
            class="play-button"
            :aria-label="playing ? 'Pause preview' : 'Play preview'"
            @click="togglePlayback"
          >
            <Pause v-if="playing" /><Play v-else /></button
          ><button
            class="icon-button"
            aria-label="Next project"
            @click="nextTrack"
          >
            <SkipForward /></button
          ><button
            class="icon-button player-extra"
            :class="{ on: loop }"
            aria-label="Toggle repeat"
            @click="
              loop = !loop;
              notify(loop ? 'Repeat enabled' : 'Repeat disabled');
            "
          >
            <Repeat />
          </button>
        </div>
        <div class="progress-row">
          <span>{{ formattedTime }}</span
          ><input
            aria-label="Preview position"
            type="range"
            min="0"
            max="165"
            :value="elapsed"
            @input="elapsed = Number($event.target.value)"
          /><span>2:45</span>
        </div>
      </div>
      <div class="player-volume">
        <button
          class="icon-button"
          aria-label="Open project queue"
          @click="navigate('projects')"
        >
          <ListMusic /></button
        ><Volume2 /><input
          v-model="volume"
          aria-label="Volume"
          type="range"
          min="0"
          max="100"
        />
      </div>
    </footer>

    <div
      v-if="selectedProject"
      class="modal-backdrop"
      @click.self="selectedProject = null"
    >
      <section
        class="modal-panel"
        role="dialog"
        aria-modal="true"
        :aria-label="selectedProject.title"
      >
        <button
          class="modal-close icon-button"
          aria-label="Close case study"
          @click="selectedProject = null"
        >
          <X />
        </button>
        <p class="eyebrow">
          {{ selectedProject.category }}
          <span>· {{ selectedProject.date }}</span>
        </p>
        <h2>{{ selectedProject.title }}</h2>
        <div class="modal-section">
          <h3>Architecture & overview</h3>
          <p>{{ selectedProject.overview }}</p>
        </div>
        <div class="modal-section">
          <h3>Engineering highlights</h3>
          <ul>
            <li v-for="feature in selectedProject.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
        </div>
        <div class="modal-section">
          <h3>Technologies</h3>
          <div class="tag-row">
            <span v-for="tag in selectedProject.tech" :key="tag">{{
              tag
            }}</span>
          </div>
        </div>
        <div class="modal-actions">
          <a
            :href="selectedProject.repo"
            target="_blank"
            rel="noreferrer"
            class="secondary-button small"
            ><Github /> Repository</a
          ><a
            :href="selectedProject.demo"
            target="_blank"
            rel="noreferrer"
            class="primary-button small"
            >Live demo <ExternalLink
          /></a>
        </div>
      </section>
    </div>
    <div
      v-if="selectedSkill"
      class="modal-backdrop"
      @click.self="selectedSkill = null"
    >
      <section
        class="modal-panel code-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Skill code sample"
      >
        <button
          class="modal-close icon-button"
          aria-label="Close code sample"
          @click="selectedSkill = null"
        >
          <X />
        </button>
        <p class="eyebrow">Engineering sample</p>
        <h2>{{ selectedSkill.name }}</h2>
        <pre><code>{{ selectedSkill.snippet }}</code></pre>
        <div class="modal-actions">
          <span class="muted">Saajidah Abrahams · Code sample</span
          ><button class="primary-button small" @click="copySnippet">
            <Copy /> Copy code
          </button>
        </div>
      </section>
    </div>
    <Transition name="toast"
      ><div v-if="toast" class="toast-message">
        <CheckCircle2 /> {{ toast }}
      </div></Transition
    >
  </div>
</template>
