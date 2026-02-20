export const profile = {
  name: "Maxime LAUNOY",
  title: "Cybersec Engineer & Fullstack Developer",
  email: "launoym@gmail.com",
  phone: "06 95 39 17 35",
  github: "github.com/Maxouka",
  linkedin: "linkedin.com/in/maxime-launoy",
  website: "trouverunprof.com",
  location: "Alpes-Maritimes, France (mobile France entiere)",
  languages: [
    "Francais (natif)",
    "Anglais (C1 — TOEIC)",
    "Russe (natif)",
    "Espagnol (B2)",
  ],
  education: [
    {
      year: "2024",
      title: "Ingenieur en securite et technologies informatiques",
      school: "INSA Centre Val de Loire",
    },
    {
      year: "2023",
      title: "Mobilite academique — Big Data, NoSQL, NLP",
      school: "Masaryk University (Brno, Republique Tcheque)",
    },
    {
      year: "2019-2021",
      title: "Classe Preparatoire aux Grandes Ecoles (MPSI/MP)",
      school: "Lycee Jules Ferry, Cannes",
    },
    {
      year: "2019",
      title: "Baccalaureat STI2D, specialite SIN — Mention Tres Bien",
      school: "Lycee Leonard de Vinci, Antibes",
    },
  ],
  summary:
    "Ingenieur INSA en securite et technologies informatiques. 1 an en cybersecurite (SOC, SIEM, EDR) et dev fullstack autonome (React, TypeScript, Python).",

  experiences: [
    {
      period: "2024 - 2025",
      title: "Ingenieur Cybersecurite — Harvest (Fintech), Paris",
      duration: "1 an",
      context:
        "Fintech leader en gestion de patrimoine, 400+ salaries, 1000+ VMs. Task force securite.",
      details: [
        "Investigation d'alertes quotidiennes via SIEM Rapid7 InsightIDR, correlation EDR Cybereason",
        "Administration Tanium sur 1000+ VMs — patch management global",
        "Rapports KPI securite hebdomadaires au COMEX (CVE/ANSSI, stats EDR, antivirus)",
        "Durcissement parc Windows : BitLocker, desactivation SMBv1, migration FTP->SFTP, Telnet->SSH, LDAP->LDAPS",
        "BitLocker en urgence sur tout le parc (suite a incident securite) + scripts PowerShell",
        "Conformite ISO 27001 (audit externe investisseurs), gestion Active Directory sur 3 domaines",
      ],
    },
    {
      period: "2024",
      title: "Ingenieur d'Exploitation (Stage) — Harvest, Sophia-Antipolis",
      duration: "4 mois",
      details: [
        "Playbooks Ansible pour automatiser le deploiement de sondes PRTG sur ~100 machines via API",
        "Permanence ops : monitoring reseau, controle 500+ URLs, astreintes week-end, parc 1000+ VMs",
      ],
    },
    {
      period: "2026",
      title: "Lead Dev (Projet personnel) — trouverunprof.com",
      duration: "Projet en cours",
      details: [
        "Marketplace SaaS que j'ai construite seul de A a Z",
        "~30 pages, ~50 composants, ~15 tables DB, 29 migrations SQL",
        "Stack : Next.js 16, React 19, TypeScript, Tailwind v4, Supabase (PostgreSQL, Auth, Realtime), Stripe",
        "Gestion multi-roles (parent, professeur, admin), calendrier interactif, messagerie temps reel",
        "Paiement Stripe (checkout + webhooks idempotents), gestion de credits",
        "Row Level Security, validation Zod, CSP headers, tests Vitest",
      ],
    },
    {
      period: "Ete 2019",
      title: "Vendeur Polyvalent — Relay, Aeroport de Nice",
      duration: "2 mois",
      details: [
        "Relation client et polyvalence en environnement dynamique",
      ],
    },
  ],

  skills: {
    "Cybersecurite & SOC": [
      { name: "SIEM (Rapid7 InsightIDR)", level: 90 },
      { name: "EDR (Cybereason)", level: 85 },
      { name: "Gestion vulnerabilites (Tanium)", level: 90 },
      { name: "Conformite ISO 27001 / Audit", level: 80 },
      { name: "Veille CVE/ANSSI", level: 85 },
    ],
    "Systemes, Reseaux & DevOps": [
      { name: "Linux / Windows Server", level: 85 },
      { name: "Active Directory / GPO", level: 90 },
      { name: "Hyper-V (~1000 VMs)", level: 85 },
      { name: "Ansible (playbooks)", level: 80 },
      { name: "PRTG / Monitoring 24/7", level: 85 },
      { name: "Protocoles (SSH, SFTP, LDAPS)", level: 85 },
    ],
    "Developpement Full-Stack": [
      { name: "React / Next.js / TypeScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL / Supabase", level: 85 },
      { name: "REST APIs / Stripe", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
    "Automatisation & Scripting": [
      { name: "PowerShell", level: 90 },
      { name: "Python", level: 80 },
      { name: "Ansible / API automation", level: 80 },
      { name: "SQL / Bash", level: 75 },
    ],
  },

  projects: [
    {
      name: "trouverunprof.com",
      description:
        "Marketplace SaaS de cours particuliers, construite seul de A a Z. Multi-roles, calendrier interactif, messagerie temps reel, paiement Stripe, Row Level Security.",
      tech: "Next.js 16, React 19, TypeScript, Tailwind v4, Supabase, Stripe, Vitest",
      url: "trouverunprof.com",
      status: "Production",
      stats: "~30 pages | ~50 composants | ~15 tables | 29 migrations SQL",
    },
    {
      name: "Portfolio Terminal",
      description:
        "Ce site ! Portfolio interactif sous forme de terminal.",
      tech: "Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Canvas API",
      url: "github.com/Maxouka/portfolio-terminal",
      status: "Live",
    },
  ],

  interests: [
    "Intelligence Artificielle",
    "Blockchain",
    "Voyages (semestre Erasmus en Republique Tcheque)",
    "Sport",
  ],
};
