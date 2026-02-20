import { profile } from "@/lib/data/profile";

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  color?: string;
  html?: string;  // Rich HTML content (links, images)
}

let idCounter = 0;
function uid(): string {
  return `line-${Date.now()}-${idCounter++}`;
}

function line(content: string, type: TerminalLine["type"] = "output", color?: string): TerminalLine {
  return { id: uid(), type, content, color };
}

function blank(): TerminalLine {
  return line("", "output");
}

function header(text: string): TerminalLine {
  return line(text, "system", "accent-primary");
}

function success(text: string): TerminalLine {
  return line(text, "output", "terminal-green");
}

function error(text: string): TerminalLine {
  return line(text, "error", "error-red");
}

function warning(text: string): TerminalLine {
  return line(text, "output", "warning-yellow");
}

function muted(text: string): TerminalLine {
  return line(text, "output", "muted");
}

// ─── skill bar helper ───
function skillBar(name: string, level: number): string {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
  return `  ${bar}  ${name}`;
}

// ─── clickable command helper ───
function cmdLink(cmd: string): string {
  return `<span class="cursor-pointer hover:text-terminal-green transition-colors" data-cmd="${cmd}">${cmd}</span>`;
}

function helpLine(cmd: string, desc: string): TerminalLine {
  const padded = desc;
  const pad = " ".repeat(Math.max(1, 14 - cmd.length));
  return {
    id: uid(),
    type: "output",
    content: `  ${cmd}${pad}${padded}`,
    html: `<span>  </span>${cmdLink(cmd)}<span>${pad}${padded}</span>`,
  };
}

// ─── language bar helper ───
function langBar(name: string, level: number, label: string): string {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
  return `  ${name.padEnd(12)}${bar} ${label}`;
}

// ═══════════════════════════════════════
// WELCOME MESSAGE
// ═══════════════════════════════════════

export function getWelcomeMessage(): TerminalLine[] {
  return [
    blank(),
    { id: uid(), type: "output", content: "", html: "welcome-banner" },
    blank(),
    {
      id: uid(), type: "output", content: '  Bienvenue ! Tapez "help" pour la liste des commandes.',
      color: "terminal-green",
      html: `<span class="text-terminal-green">  Bienvenue ! Tapez ${cmdLink("help")} pour la liste des commandes.</span>`,
    },
    {
      id: uid(), type: "output", content: '  Essayez aussi : "whoami", "projects", "skills", "cv"',
      color: "muted",
      html: `<span class="text-muted">  Essayez aussi : ${cmdLink("whoami")}, ${cmdLink("projects")}, ${cmdLink("skills")}, ${cmdLink("cv")}</span>`,
    },
    blank(),
  ];
}

// ═══════════════════════════════════════
// COMMANDS
// ═══════════════════════════════════════

export const COMMAND_LIST = [
  "help", "whoami", "cv", "skills", "experience", "projects",
  "education", "contact", "interests", "stack", "languages",
  "status", "clear", "theme",
] as const;

function cmdHelp(): TerminalLine[] {
  return [
    blank(),
    header("  COMMANDES DISPONIBLES"),
    blank(),
    helpLine("whoami", "Qui suis-je ? Profil et identite"),
    helpLine("cv", "Telecharger mon CV (PDF)"),
    helpLine("skills", "Competences techniques avec barres visuelles"),
    helpLine("experience", "Parcours professionnel complet"),
    helpLine("projects", "Projets et realisations"),
    helpLine("education", "Formation et diplomes"),
    helpLine("contact", "Me contacter"),
    helpLine("interests", "Centres d'interet et passions"),
    helpLine("stack", "Stack technique detaillee"),
    helpLine("languages", "Langues parlees"),
    helpLine("status", "Situation actuelle et disponibilite"),
    line("  theme <name>  Changer le theme (green, purple, blue, amber, solana)"),
    helpLine("clear", "Effacer le terminal"),
    helpLine("help", "Afficher cette aide"),
    blank(),
    muted("  Tip: cliquez sur une commande ou utilisez le clavier"),
    blank(),
  ];
}

function wrapText(text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current && (current + " " + word).length > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function cmdWhoami(): TerminalLine[] {
  const result: TerminalLine[] = [
    blank(),
    { id: uid(), type: "output", content: "", html: "whoami-photo" },
    blank(),
    header("  \u250c\u2500 WHOAMI \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"),
    header("  \u2502"),
    line(`  \u2502  ${profile.name}`),
    success(`  \u2502  ${profile.title}`),
    header("  \u2502"),
  ];

  const summaryLines = wrapText(profile.summary, 72);
  for (const sl of summaryLines) {
    result.push(line(`  \u2502  ${sl}`));
  }

  result.push(
    header("  \u2502"),
    muted(`  \u2502  Location : ${profile.location}`),
    header("  \u2502"),
    warning('  \u2502  "Building secure systems by day, shipping SaaS by night"'),
    header("  \u2502"),
    header("  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"),
    blank(),
  );

  return result;
}

function cmdSkills(): TerminalLine[] {
  const lines: TerminalLine[] = [blank(), header("  COMPETENCES TECHNIQUES"), blank()];

  for (const [category, skills] of Object.entries(profile.skills)) {
    lines.push(success(`  ${category.toUpperCase()}`));
    for (const skill of skills) {
      lines.push(line(skillBar(skill.name, skill.level)));
    }
    lines.push(blank());
  }

  return lines;
}

function cmdExperience(): TerminalLine[] {
  const lines: TerminalLine[] = [blank(), header("  PARCOURS PROFESSIONNEL"), blank()];

  for (let i = 0; i < profile.experiences.length; i++) {
    const exp = profile.experiences[i];
    lines.push(success(`  [${exp.period}] (${exp.duration})`));
    lines.push(header(`  ${exp.title}`));
    if (exp.context) {
      lines.push(muted(`  ${exp.context}`));
    }
    lines.push(blank());
    for (const detail of exp.details) {
      lines.push(line(`    > ${detail}`));
    }
    if (i < profile.experiences.length - 1) {
      lines.push(blank());
      lines.push(muted("  ---"));
      lines.push(blank());
    }
  }

  lines.push(blank());
  return lines;
}

function cmdProjects(): TerminalLine[] {
  const lines: TerminalLine[] = [blank(), header("  PROJETS & REALISATIONS"), blank()];

  for (const project of profile.projects) {
    const nameBar = `\u2500 ${project.name} `;
    const padding = "\u2500".repeat(Math.max(0, 50 - nameBar.length));
    lines.push(header(`  \u250c${nameBar}${padding}`));
    lines.push(line(`  \u2502  ${project.description}`));
    lines.push(line(`  \u2502`));
    lines.push(success(`  \u2502  Tech : ${project.tech}`));
    if (project.stats) {
      lines.push(line(`  \u2502  Stats: ${project.stats}`));
    }
    lines.push(warning(`  \u2502  Status: ${project.status}`));
    const fullUrl = project.url.startsWith("http") ? project.url : `https://${project.url}`;
    lines.push({
      id: uid(),
      type: "output",
      content: `  \u2502  URL  : ${project.url}`,
      color: "muted",
      html: `<span class="text-muted">  \u2502  URL  : </span><a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:text-terminal-green underline underline-offset-2 transition-colors">${project.url}</a>`,
    });
    lines.push(header(`  \u2514${"─".repeat(50)}`));
    lines.push(blank());
  }

  return lines;
}

function cmdEducation(): TerminalLine[] {
  const lines: TerminalLine[] = [blank(), header("  FORMATION & DIPLOMES"), blank()];

  for (const edu of profile.education) {
    lines.push(success(`  ${edu.year.padEnd(6)} ${edu.title}`));
    lines.push(muted(`         ${edu.school}`));
    lines.push(blank());
  }

  return lines;
}

function contactLink(label: string, value: string, url: string): TerminalLine {
  return {
    id: uid(),
    type: "output",
    content: `  \u2502  ${label}${value}`,
    html: `<span>  \u2502  ${label}</span><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:text-terminal-green underline underline-offset-2 transition-colors">${value}</a>`,
  };
}

function cmdContact(): TerminalLine[] {
  return [
    blank(),
    header("  \u250c\u2500 CONTACT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"),
    header("  \u2502"),
    contactLink("Email     ", profile.email, `mailto:${profile.email}`),
    line(`  \u2502  Tel       ${profile.phone}`),
    contactLink("GitHub    ", profile.github, `https://${profile.github}`),
    contactLink("LinkedIn  ", profile.linkedin, `https://${profile.linkedin}`),
    contactLink("Web       ", profile.website, `https://${profile.website}`),
    line(`  \u2502  Location  ${profile.location}`),
    header("  \u2502"),
    header("  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"),
    blank(),
  ];
}

function cmdInterests(): TerminalLine[] {
  const lines: TerminalLine[] = [blank(), header("  CENTRES D'INTERET"), blank()];

  for (const interest of profile.interests) {
    lines.push(line(`  [*] ${interest}`));
  }

  lines.push(blank());
  return lines;
}

function cmdStack(): TerminalLine[] {
  return [
    blank(),
    header("  STACK TECHNIQUE"),
    blank(),
    success("  SECURITY     "),
    line("               SIEM (Rapid7), EDR (Cybereason), Tanium, Active Directory, ISO 27001"),
    success("  SYSTEMS      "),
    line("               Linux, Windows Server, Hyper-V, PRTG, SSH, SFTP, LDAPS"),
    success("  FRONTEND     "),
    line("               React, Next.js, TypeScript, Tailwind CSS"),
    success("  BACKEND      "),
    line("               Python, PostgreSQL, Supabase, REST APIs, Stripe"),
    success("  DEVOPS       "),
    line("               Ansible, Git, CI/CD"),
    success("  SCRIPTING    "),
    line("               PowerShell, Python, Bash, SQL"),
    blank(),
  ];
}

function cmdLanguages(): TerminalLine[] {
  return [
    blank(),
    header("  LANGUES"),
    blank(),
    line(langBar("Francais", 100, "natif")),
    line(langBar("Anglais", 80, "C1 (TOEIC)")),
    line(langBar("Russe", 100, "natif")),
    line(langBar("Espagnol", 80, "B2")),
    blank(),
  ];
}

function cmdStatus(): TerminalLine[] {
  return [
    blank(),
    header("  SITUATION ACTUELLE"),
    blank(),
    line("  Dispo         : Immediate"),
    line("  Statut        : En recherche (promotion INSA 2024)"),
    line("  Recherche     : CDI / CDD \u2014 Cybersec, Fullstack, DevOps, Web3"),
    line("  Mobile        : France entiere (permis B + voiture)"),
    line("  Remote        : OK (full remote ou hybride)"),
    blank(),
  ];
}

// ═══════════════════════════════════════
// EASTER EGGS
// ═══════════════════════════════════════

function cmdSudo(): TerminalLine[] {
  return [
    blank(),
    error("  Nice try. Root access denied. But I appreciate the initiative."),
    blank(),
  ];
}

function cmdRmRf(): TerminalLine[] {
  return [
    blank(),
    error("  Whoa there. This is a portfolio, not a pentest."),
    blank(),
  ];
}

function cmdGm(): TerminalLine[] {
  return [
    blank(),
    success("  gm anon. WAGMI."),
    blank(),
  ];
}

function cmdHire(): TerminalLine[] {
  return [
    blank(),
    header("  Smart move. Let's talk."),
    blank(),
    line(`  Email     ${profile.email}`),
    line(`  Tel       ${profile.phone}`),
    line(`  LinkedIn  ${profile.linkedin}`),
    line(`  GitHub    ${profile.github}`),
    blank(),
    success("  I'm available and ready to start."),
    blank(),
  ];
}

function cmdSolana(): TerminalLine[] {
  return [
    blank(),
    header("       @@@@"),
    header("     @@    @@"),
    header("    @@  @@  @@"),
    header("   @@ @@  @@ @@"),
    header("    @@  @@  @@"),
    header("     @@    @@"),
    header("       @@@@"),
    blank(),
    success("  Solana — mass adopted since day 1"),
    line("  TPS: yes  |  Fees: ~$0.00  |  Status: UP"),
    muted("  Not financial advice. DYOR."),
    blank(),
  ];
}

function cmdCatPasswd(): TerminalLine[] {
  return [
    blank(),
    error("  Access denied. But points for trying a classic."),
    blank(),
  ];
}

function cmdPing(): TerminalLine[] {
  return [
    blank(),
    line("  PING google.com (142.250.74.206): 56 data bytes"),
    line("  64 bytes from 142.250.74.206: icmp_seq=0 ttl=118 time=12.4 ms"),
    line("  64 bytes from 142.250.74.206: icmp_seq=1 ttl=118 time=11.8 ms"),
    line("  64 bytes from 142.250.74.206: icmp_seq=2 ttl=118 time=13.1 ms"),
    line("  64 bytes from 142.250.74.206: icmp_seq=3 ttl=118 time=12.0 ms"),
    blank(),
    line("  --- google.com ping statistics ---"),
    line("  4 packets transmitted, 4 received, 0% packet loss"),
    line("  round-trip min/avg/max = 11.8/12.3/13.1 ms"),
    blank(),
  ];
}

function cmdNeofetch(): TerminalLine[] {
  return [
    blank(),
    header("         .---.          ") ,
    header("        /     \\         maxime@portfolio"),
    header("       |  O O  |        -----------------"),
    header("       |  \\_/  |        OS: Portfolio Terminal v1.0"),
    header("        \\_____/         Host: Next.js 15 + TypeScript"),
    header("       /|     |\\        Kernel: React 19"),
    header("      / |     | \\       Shell: Tailwind CSS v4"),
    header("         |   |          DE: Framer Motion"),
    header("         |   |          WM: Canvas API"),
    header("        _|   |_         Theme: Matrix Green"),
    header("       |_______|        Terminal: JetBrains Mono"),
    blank(),
    line("  CPU: Cybersec Engineer @ Full Capacity"),
    line("  GPU: Fullstack Developer (hardware-accelerated)"),
    line("  Memory: 1 year SOC + 1 SaaS marketplace loaded"),
    line("  Uptime: Since 2024 (INSA-certified)"),
    blank(),
  ];
}

function cmdLs(): TerminalLine[] {
  return [
    blank(),
    success("  whoami.txt"),
    success("  skills.dat"),
    success("  projects/"),
    success("  experience.log"),
    success("  contact.cfg"),
    success("  resume.pdf"),
    blank(),
  ];
}

function cmdCv(): TerminalLine[] {
  return [
    blank(),
    success("  Telechargement du CV en cours..."),
    muted("  -> resume.pdf"),
    blank(),
  ];
}

function cmdCatResume(): TerminalLine[] {
  return [
    blank(),
    success("  Telechargement du CV en cours..."),
    muted("  -> resume.pdf"),
    blank(),
  ];
}

function cmdCd(): TerminalLine[] {
  return [
    blank(),
    error("  Permission denied. Visit trouverunprof.com instead."),
    blank(),
  ];
}

function cmdCrypto(): TerminalLine[] {
  return [
    blank(),
    header("  CRYPTO TICKER (not real-time, obviously)"),
    blank(),
    success("  SOL   $187.42   +5.2%  "),
    warning("  BTC   $97,831   +1.8%  "),
    line("  ETH   $3,412    -0.4%  "),
    blank(),
    muted("  Not financial advice. But SOL is the way."),
    blank(),
  ];
}

// ═══════════════════════════════════════
// THEME
// ═══════════════════════════════════════

export type ThemeName = "green" | "purple" | "blue" | "amber" | "solana";

export const themes: Record<ThemeName, Record<string, string>> = {
  green: {
    "--terminal-green": "#22c55e",
    "--accent-primary": "#a855f7",
    "--accent-secondary": "#7c3aed",
  },
  purple: {
    "--terminal-green": "#a855f7",
    "--accent-primary": "#c084fc",
    "--accent-secondary": "#7c3aed",
  },
  blue: {
    "--terminal-green": "#3b82f6",
    "--accent-primary": "#60a5fa",
    "--accent-secondary": "#2563eb",
  },
  amber: {
    "--terminal-green": "#f59e0b",
    "--accent-primary": "#fbbf24",
    "--accent-secondary": "#d97706",
  },
  solana: {
    "--terminal-green": "#14F195",
    "--accent-primary": "#9945FF",
    "--accent-secondary": "#7c3aed",
  },
};

function cmdTheme(args: string): TerminalLine[] {
  const themeName = args.trim().toLowerCase() as ThemeName;

  if (!themeName) {
    return [
      blank(),
      header("  THEMES DISPONIBLES"),
      blank(),
      line("  green   Vert terminal classique (defaut)"),
      line("  purple  Violet cybersec"),
      line("  blue    Bleu tech"),
      line("  amber   Ambre retro"),
      line("  solana  Violet/vert Solana"),
      blank(),
      muted('  Usage : theme <name>'),
      blank(),
    ];
  }

  if (!(themeName in themes)) {
    return [
      blank(),
      error(`  Theme inconnu : '${themeName}'.`),
      muted("  Themes disponibles : green, purple, blue, amber, solana"),
      blank(),
    ];
  }

  const themeVars = themes[themeName];
  const root = document.documentElement;
  for (const [key, value] of Object.entries(themeVars)) {
    root.style.setProperty(key, value);
  }

  return [
    blank(),
    success(`  Theme '${themeName}' active.`),
    blank(),
  ];
}

// ═══════════════════════════════════════
// MATRIX / HACK / GLITCH — return special action flags
// ═══════════════════════════════════════

export interface CommandResult {
  lines: TerminalLine[];
  action?: "clear" | "matrix" | "hack" | "download";
}

// ═══════════════════════════════════════
// EXECUTE COMMAND
// ═══════════════════════════════════════

export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim().toLowerCase();
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const args = rest.join(" ");

  switch (cmd) {
    case "help":
      return { lines: cmdHelp() };
    case "whoami":
      return { lines: cmdWhoami() };
    case "skills":
      return { lines: cmdSkills() };
    case "experience":
      return { lines: cmdExperience() };
    case "projects":
      return { lines: cmdProjects() };
    case "education":
      return { lines: cmdEducation() };
    case "contact":
      return { lines: cmdContact() };
    case "interests":
      return { lines: cmdInterests() };
    case "stack":
      return { lines: cmdStack() };
    case "languages":
      return { lines: cmdLanguages() };
    case "status":
      return { lines: cmdStatus() };
    case "theme":
      return { lines: cmdTheme(args) };
    case "cv":
      return { lines: cmdCv(), action: "download" };
    case "clear":
      return { lines: [], action: "clear" };

    // Easter eggs
    case "sudo":
      return { lines: cmdSudo() };
    case "rm":
      if (args.startsWith("-rf")) return { lines: cmdRmRf() };
      return { lines: [error(`  Commande inconnue : '${input.trim()}'. Tapez 'help' pour la liste des commandes.`)] };
    case "gm":
      return { lines: cmdGm() };
    case "hire":
      return { lines: cmdHire() };
    case "sol":
    case "solana":
      return { lines: cmdSolana() };
    case "cat":
      if (args === "/etc/passwd") return { lines: cmdCatPasswd() };
      if (args === "resume.pdf") return { lines: cmdCatResume(), action: "download" };
      return { lines: [error(`  cat: ${args || "?"}: No such file or directory`)] };
    case "ping":
      return { lines: cmdPing() };
    case "neofetch":
      return { lines: cmdNeofetch() };
    case "ls":
      return { lines: cmdLs() };
    case "cd":
      return { lines: cmdCd() };
    case "crypto":
      return { lines: cmdCrypto() };
    case "matrix":
      return {
        lines: [blank(), success("  Entering the Matrix..."), blank()],
        action: "matrix",
      };
    case "hack":
      return {
        lines: [blank(), warning("  Initiating penetration test... just kidding."), blank()],
        action: "hack",
      };
    case "":
      return { lines: [] };
    default:
      return {
        lines: [error(`  Commande inconnue : '${cmd}'. Tapez 'help' pour la liste des commandes.`)],
      };
  }
}
