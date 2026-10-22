<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  Flame,
  FolderCode,
  Github,
  Globe2,
  HeartHandshake,
  Home,
  History,
  Library,
  Mail,
  Menu,
  Play,
  Radio,
  Search,
  Server,
  Sparkles,
  UserRound,
  X,
  Wrench,
  PanelsTopLeft,
} from "lucide-vue-next";

const projects = [
  {
    id: 0,
    title: "Rentosphere",
    category: "Group project",
    overview:
      "A collaborative rental marketplace for browsing and renting equipment and other items, with listing management, authentication, booking-related features, and owner functionality.",
    features: [
      "Browse and rent equipment and other items",
      "Manage listings and owner-related features",
      "Authentication and booking-related functionality",
    ],
    tech: ["Vue.js", "JavaScript", "HTML", "CSS", "Node.js", "Express.js", "MySQL", "Git/GitHub"],
    icon: Building2,
    hue: "mint",
  },
  {
    id: 1,
    title: "HRFlow",
    category: "Group project",
    overview:
      "A collaborative HR management system covering employee records, attendance, leave, payroll, performance, reporting, and settings.",
    features: [
      "Employee and attendance management",
      "Leave, payroll, and performance workflows",
      "Reporting and settings",
    ],
    tech: ["Vue.js", "Node.js", "Express.js", "MySQL"],
    icon: PanelsTopLeft,
    hue: "coral",
  },
  {
    id: 2,
    title: "Bootstrap Store Website",
    category: "Responsive website",
    overview:
      "A small storefront website demonstrating responsive page layout with Bootstrap.",
    features: [],
    tech: ["HTML", "CSS", "Bootstrap"],
    icon: Globe2,
    hue: "blue",
  },
];

const skills = [
  {
    category: "Frontend",
    icon: PanelsTopLeft,
    tone: "blue",
    items: ["HTML", "CSS", "JavaScript", "Vue.js", "Bootstrap"],
  },
  {
    category: "Backend",
    icon: Server,
    tone: "mint",
    items: ["Node.js", "Express.js"],
  },
  {
    category: "Database",
    icon: Server,
    tone: "coral",
    items: ["MySQL"],
  },
  {
    category: "Tools",
    icon: Wrench,
    tone: "yellow",
    items: ["Git", "GitHub", "Vite"],
  },
];

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderCode },
  { id: "about", label: "About Me", icon: UserRound },
  { id: "skills", label: "Toolkit", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];
const filters = [
  "All",
  "Group project",
  "Responsive website",
];
const currentView = ref("home");
const currentFilter = ref("All");
const query = ref("");
const mobileMenuOpen = ref(false);
const selectedProject = ref(null);
const toast = ref("");
const history = ref(["home"]);
const historyIndex = ref(0);
let toastTimer;
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
function downloadProfile() {
  const profile = `SAAJIDAH ABRAHAMS\nJunior Web Developer\n\nSELECTED PROJECTS\n${projects.map((project) => `- ${project.title} (${project.category}): ${project.overview}\n  Technologies: ${project.tech.join(", ")}`).join("\n")}\n`;
  const url = URL.createObjectURL(new Blob([profile], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "Saajidah-Abrahams-Portfolio-Summary.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify("Portfolio summary download started");
}
function onKeydown(event) {
  if (event.key === "Escape") {
    selectedProject.value = null;
    mobileMenuOpen.value = false;
  }
}
onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
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
      <aside
        id="portfolio-sidebar"
        class="sidebar"
        :class="{ 'sidebar-open': mobileMenuOpen }"
      >
        <div class="brand-row">
          <button class="brand" @click="navigate('home')">
            <span class="monogram">SA</span
            ><span
              ><strong>Saajidah</strong><small>Junior Web Developer</small></span
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
            :aria-current="currentView === item.id ? 'page' : undefined"
            @click="navigate(item.id)"
          >
            <component :is="item.icon" /><span>{{ item.label }}</span>
          </button>
        </nav>
        <section class="library-box">
          <div class="library-title">
            <span><Library /> Project library</span><small>3 PROJECTS</small>
          </div>
          <p class="eyebrow">Browse by type</p>
          <button
            class="stack-link"
            @click="
              currentFilter = 'Group project';
              navigate('projects');
            "
          >
            <span class="stack-icon tint-blue"><Building2 /></span
            ><span
              ><strong>Group projects</strong
              ><small>Rentosphere and HRFlow</small></span
            >
          </button>
          <button
            class="stack-link"
            @click="
              currentFilter = 'Responsive website';
              navigate('projects');
            "
          >
            <span class="stack-icon tint-coral"><Globe2 /></span
            ><span
              ><strong>Responsive site</strong
              ><small>Bootstrap Store Website</small></span
            >
          </button>
          <div class="sidebar-note">
            <span class="pulse-dot"></span> A small collection of my work
          </div>
        </section>
      </aside>

      <main class="main-panel">
        <header class="topbar">
          <div class="topbar-left">
            <button
              class="icon-button mobile-menu"
              aria-label="Open menu"
              aria-controls="portfolio-sidebar"
              :aria-expanded="mobileMenuOpen"
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
              <ArrowDownToLine /> <span>Download summary</span></button
            ><span class="work-badge"><i></i><span>Junior developer</span></span
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
                    Junior web developer<br class="desktop-break" />
                    building for the web
                  </h2>
                  <p>
                    I enjoy creating responsive websites and working with a
                    team to build practical web applications.
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
                    <span>My toolkit</span
                    ><span class="pulse-dot"></span>
                  </div>
                  <div>
                    <span>Frontend</span
                    ><strong>HTML · CSS · Vue</strong>
                  </div>
                  <div>
                    <span>Backend</span
                    ><strong>Node · Express · MySQL</strong>
                  </div>
                  <div class="pulse-decoration"><Code2 /></div>
                </div>
              </section>

              <section class="spotlight">
                <div class="spotlight-label">
                  <span><Flame /> Featured project</span
                  ><span>Collaborative work</span>
                </div>
                <div class="spotlight-content">
                  <div class="spotlight-art art-mint">
                    <Building2 /><span>RENTO<br />SPHERE</span>
                  </div>
                  <div class="spotlight-copy">
                    <p class="eyebrow">Group project · Rental marketplace</p>
                    <h2>Rentosphere</h2>
                    <p>
                      A team-built marketplace for browsing and renting
                      equipment and other items, with listing, authentication,
                      booking, and owner features.
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
                        View project details <ArrowUpRight />
                    </button>
                    </div>
                  </div>
                </div>
              </section>

              <section class="section-block">
                <div class="section-heading">
                  <div>
                    <p class="eyebrow">Selected work</p>
                    <h2>Projects</h2>
                  </div>
                  <button
                    class="text-button"
                    @click="
                      currentFilter = 'All';
                      navigate('projects');
                    "
                  >
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
                      >{{ project.category }}</span
                    ><strong>{{ project.title }}</strong
                    ><span class="muted line-clamp">{{ project.overview }}</span
                    ><span class="card-meta"
                      ><span>{{ project.tech.slice(0, 3).join(" · ") }}</span>
                      <span>View details <ArrowUpRight /></span></span
                    >
                  </button>
                </div>
              </section>

              <section class="section-block">
                <div class="section-heading">
                  <div>
                    <p class="eyebrow">The toolkit</p>
                    <h2>Tools I use</h2>
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
                    A few collaborative applications and a responsive website
                    built while learning and practising web development.
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
                  :aria-pressed="currentFilter === filter"
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
                  ><span class="category-label">{{ project.category }}</span
                  ><strong>{{ project.title }}</strong
                  ><span class="muted line-clamp">{{ project.overview }}</span
                  ><span class="tag-row"
                    ><span v-for="tag in project.tech.slice(0, 4)" :key="tag">{{
                      tag
                    }}</span></span
                  ><span class="card-meta"
                    ><span>{{ project.tech.slice(0, 3).join(" · ") }}</span>
                    <span>View details <ArrowUpRight /></span
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
                  SA
                </div>
                <div>
                  <p class="kicker"><UserRound /> Junior web developer</p>
                  <h1>Saajidah Abrahams</h1>
                  <p>
                    I’m building my skills through responsive websites and
                    collaborative web application projects.
                  </p>
                </div>
              </section>
              <div class="about-columns">
                <div class="about-main">
                  <article class="content-card">
                    <p class="eyebrow"><Compass /> About me</p>
                    <h2>Learning by building</h2>
                    <p>
                      I’m interested in how thoughtful design and code come
                      together to make websites easier to use. My project work
                      has included frontend development, server-side
                      JavaScript, and relational databases.
                    </p>
                  </article>
                  <div class="principles">
                    <article class="content-card">
                      <HeartHandshake />
                      <h3>Teamwork</h3>
                      <p>
                        Rentosphere and HRFlow were collaborative projects. I
                        value clear communication and shared ownership.
                      </p>
                    </article>
                    <article class="content-card">
                      <Cpu />
                      <h3>What I enjoy</h3>
                      <p>
                        Building responsive interfaces and learning how
                        frontend and backend pieces fit together.
                      </p>
                    </article>
                  </div>
                </div>
                <aside class="content-card timeline">
                  <p class="eyebrow"><History /> Project experience</p>
                  <h2>Built with a team</h2>
                  <div class="timeline-item">
                    <small>COLLABORATIVE PROJECT</small
                    ><strong>Rentosphere</strong
                    ><span
                      >A rental marketplace with listing, booking, and owner
                      features.</span
                    >
                  </div>
                  <div class="timeline-item">
                    <small>COLLABORATIVE PROJECT</small
                    ><strong>HRFlow</strong
                    ><span
                      >An HR management system covering employee workflows and
                      reporting.</span
                    >
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
                    <span
                      v-for="skill in group.items"
                      :key="skill"
                      class="skill-chip"
                    >
                      <Code2 />
                      <span>{{ skill }}</span>
                    </span>
                  </div>
                </article>
              </div>
            </section>

            <section v-else class="view-stack">
              <section class="contact-banner">
                <p class="kicker"><Radio /> Contact</p>
                <h1>Let’s connect<span class="accent-dot">.</span></h1>
                <p>
                  I’m interested in junior developer opportunities and
                  collaborative projects.
                </p>
              </section>
              <div class="contact-layout">
                <article class="content-card contact-details">
                  <p class="eyebrow"><Mail /> Get in touch</p>
                  <h2>Contact details coming soon</h2>
                  <p>
                    A direct email address or professional profile has not been
                    added yet. For now, you can view the source code for this
                    portfolio on GitHub.
                  </p>
                  <a
                    class="secondary-button small"
                    href="https://github.com/saajidah2007-sudo/my-studio-portfolio"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github /> Portfolio source <ArrowUpRight />
                  </a>
                </article>
              </div>
            </section>
          </template>
        </div>
      </main>
    </div>

    <footer class="player-bar" aria-label="Portfolio soundtrack status">
      <div class="soundtrack-note">
        <Radio />
        <span class="track-label">
          <strong>Your portfolio soundtrack</strong>
          <small>No audio track has been added yet.</small>
        </span>
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
        </p>
        <h2>{{ selectedProject.title }}</h2>
        <div v-if="selectedProject.features.length" class="modal-section">
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
            v-if="selectedProject.repo"
            :href="selectedProject.repo"
            target="_blank"
            rel="noreferrer"
            class="secondary-button small"
            ><Github /> Repository</a
          ><a
            v-if="selectedProject.demo"
            :href="selectedProject.demo"
            target="_blank"
            rel="noreferrer"
            class="primary-button small"
            >Live demo <ExternalLink
          /></a>
          <span
            v-if="!selectedProject.repo && !selectedProject.demo"
            class="muted"
          >
            A repository or live demo link hasn’t been provided yet.
          </span>
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
