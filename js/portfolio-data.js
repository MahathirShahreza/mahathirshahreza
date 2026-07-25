/* ==================================================
   EDIT DATA PORTFOLIO DISINI
   Semua teks & data portfolio ada di file ini.
   Ubah value di bawah, tampilan chat assistant otomatis mengikuti.
   ================================================== */

const profile = {
  name: "Mahathir Shahreza",
  initials: "MS",
  avatar: "assets/images/profil%20.jpg", 
  title: "Information Systems Graduate",
  subtitle: "Web Developer · UI/UX Designer · IT Solution Enthusiast",
  tagline: "Passionate about building digital solutions through web development, UI/UX design, and data-driven approaches.",
  university: "UIN Imam Bonjol Padang",
  major: "Sistem Informasi",
  years: "2021 - 2025",
  aboutText: "Mahathir Shahreza is an Information Systems graduate from UIN Imam Bonjol Padang with a strong interest in web development, UI/UX design, and digital technology. He is proficient in designing user-friendly interfaces using Figma and building responsive websites with WordPress, Bootstrap, HTML, CSS, and JavaScript. Mahathir is familiar with GitHub for version control and has experience in front-end development as well as basic programming. In addition, he has academic research experience in data mining using Python, where he applied analytical and problem-solving skills to real-world datasets. Mahathir is a fast learner, highly adaptable, detail-oriented, and eager to contribute to collaborative teams while continuously expanding his technical and professional expertise through internship opportunities.",
  resumePath: "assets/cv/MahathirShahrezaCV.pdf",
  contact: {
    email: "mahathirswork@gmail.com",
    github: "https://github.com/mahathirshahreza",
    linkedin: "https://linkedin.com/in/mahathirshahreza",
    whatsapp: "https://wa.me/6282171053270"
  }
};

const skills = [
  {
    group: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Responsive Web Design"
    ]
  },
  {
    group: "Backend",
    items: [
      "PHP",
      "MySQL",
      "REST API (Basic)"
    ]
  },
  {
    group: "Design",
    items: [
      "Figma",
      "UI/UX Design",
      "Wireframing",
      "Prototyping",
      "Canva"
    ]
  },
  {
    group: "Data",
    items: [
      "Python",
      "Data Mining",
      "FP-Growth",
      "Data Analysis"
    ]
  },
  {
    group: "Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "XAMPP",
      "WordPress",
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "Google Workspace"
    ]
  },
  {
    group: "Soft Skills",
    items: [
      "Problem Solving",
      "Communication",
      "Teamwork",
      "Adaptability",
      "Time Management",
      "Fast Learner"
    ]
  }
];

const experience = [
  {
  place: "Diskominfotik Provinsi Sumatera Barat",
  role: "Web Developer Intern",
  period: "2024",
  points: [
    "Developed a prototype complaint service website using HTML, CSS, Bootstrap, PHP, and MySQL.",
    "Designed responsive user interfaces and improved user experience.",
    "Collaborated with the development team to implement website features and functionality."
  ]
},
{
  place: "Freelance",
  role: "Freelance Web Developer",
  period: "2024 - Present",
  points: [
    "Designed and developed responsive websites for individual clients and small businesses.",
    "Customized website features based on client requirements and project objectives.",
    "Maintained, tested, and optimized websites to ensure performance and usability.",
    "Communicated directly with clients to gather requirements and deliver project updates."
  ]
},
{
  place: "Family Business",
  role: "Sales & Customer Service Assistant",
  period: "2023 - Present",
  points: [
    "Assisted customers by providing product information and personalized recommendations.",
    "Managed daily sales transactions and maintained accurate cash handling.",
    "Organized inventory and ensured product availability in the store.",
    "Built strong customer relationships through friendly and responsive service."
  ]
}
];

const projects = [
  {
  id: "spk-saw",
  title: "BLT Decision Support System",
  tech: ["PHP", "MySQL", "Bootstrap", "GitHub", "Copilot"],
  description: "A responsive web application built with PHP, MySQL, Bootstrap, and JavaScript for BLT recipient selection using the SAW method. Features role-based authentication, automated scoring and ranking, beneficiary management, and reporting. Deployed on InfinityFree with a MySQL database. Demo: Admin (admin/123) | Supervisor (atasan/123456).",
  github: "https://github.com/MahathirShahreza/BLT",
  demo: "https://blt.page.gd/",
  image: "assets/projects/blt.png"
},
  {
  id: "civil-lab",
  title: "Civil Engineering Laboratory Landing Page",
  tech: ["HTML", "CSS", "JavaScript", "Vesperr Template"],
  description: "A responsive landing page developed as my first web project for the Civil Engineering Laboratory at Institut Teknologi Padang. Built using the Vesperr template, managed with Git and GitHub, and deployed on Vercel.",
  github: "https://github.com/MahathirShahreza/laboritp.github.io",
  demo: "https://laboritp-github-io.vercel.app/",
  image: "assets/projects/lab.png"
},
  
];

const certificates = [
  {
    name: "Data Science and Analytics",
    issuer: "HP LIFE",
    date: "2026",
    credentialId: "a5c8fc23-44f0-4f72-9ffa-b84b041be93d",
    image: "assets/certificate/datasains.png",
    file: "assets/certificate/datasains.pdf"
  },
  {
    name: "IT For Bussiness Success",
    issuer: "HP LIFE",
    date: "2026",
    credentialId: "613b872a-b72d-4cf1-ae8a-c7ceae577cc6",
    image: "assets/certificate/itbisnis.png",
    file: "assets/certificate/itbisnis.pdf"
  },
  {
    name: "Cisco Introduction to Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "2023",
    
    image: "assets/certificate/cptintro.png",
    file: "assets/certificate/cptintro.pdf"
  },
  {
    name: "Cisco Networking Essentials Course",
    issuer: "Cisco Networking Academy",
    date: "2023",
    
    image: "assets/certificate/cptessentials.png",
    file: "assets/certificate/cptessentials.pdf"
  },
  {
    name: "Cisco Networking Basics Course",
    issuer: "Cisco Networking Academy",
    date: "2023",
    
    image: "assets/certificate/cptbasics.png",
    file: "assets/certificate/cptbasics.pdf"
  },
  {
    name: "Cisco Networking Devices and Basic Configuration Course",
    issuer: "Cisco Networking Academy",
    date: "2023",
    
    image: "assets/certificate/cptdevices.png",
    file: "assets/certificate/cptdevices.pdf"
  },
];

const courses = [
  {
    title: "Data Science and Analytics",
    description:
      "Learned the fundamentals of data science, including data collection, data analysis, visualization, and data-driven decision making using analytical tools and techniques."
  },
  {
    title: "IT for Business Success",
    description:
      "Explored how information technology supports business operations, digital transformation, strategic planning, and organizational productivity."
  },
  {
    title: "Cisco Introduction to Packet Tracer",
    description:
      "Learned to use Cisco Packet Tracer for designing, simulating, and troubleshooting computer networks through practical networking scenarios."
  },
  {
    title: "Cisco Networking Essentials",
    description:
      "Studied networking fundamentals including network architectures, protocols, IP addressing, switching, routing, and basic network security concepts."
  },
  {
    title: "Cisco Networking Basics",
    description:
      "Built a strong foundation in computer networking by learning network devices, OSI and TCP/IP models, Ethernet, IPv4/IPv6, and connectivity principles."
  },
  {
    title: "Cisco Networking Devices and Basic Configuration",
    description:
      "Configured Cisco routers and switches, implemented basic network services, managed device settings, and performed network connectivity troubleshooting."
  }
];

/* ==================================================
   QUICK ACTIONS shown on the landing hero
   topic must match a key in portfolioKnowledge below
   ================================================== */
const quickActions = [
  { topic: "about", label: "About Mahathir Shahreza", icon: "👤" },
  { topic: "projects", label: "Projects", icon: "💼" },
  { topic: "skills", label: "Skills", icon: "🛠" },
  { topic: "certificate", label: "Certificates", icon: "📜" },
  { topic: "course", label: "Courses", icon: "🎓" },
  { topic: "resume", label: "Resume", icon: "📄" },
  { topic: "contact", label: "Contact", icon: "📍" },
  { topic: "github", label: "GitHub", icon: "🌐" },
  { topic: "experience", label: "Experience", icon: "🧭" }
];

/* ---------- casual greeting responses ---------- */
const greetingResponses = [
  "Hai! 👋 I'm the AI assistant of Mahathir Shahreza's portfolio. Ask me about his projects, skills, or experience!",
  "Hello there! 🤖 I'm an artificial intelligence built for Mahathir Shahreza's portfolio. What would you like to know about him?",
  "Hi! Nice to meet you. I'm Mahathir Shahreza's portfolio assistant — happy to talk about his projects, skills, or resume.",
  "Halo! 😊 Aku AI dari portfolio Mahathir Shahreza. Silakan tanya tentang project, skill, atau pengalamannya, ya!"
];

/* ==================================================
   AI ASSISTANT KNOWLEDGE BASE (simulation, no real AI)
   Cocokkan input user (lowercase) terhadap keywords.
   Kategori dengan jumlah keyword match terbanyak yang menang.
   render() mengembalikan { text, cards? }
   ================================================== */
const portfolioKnowledge = {
  greeting: {
    keywords: [
      "hai", "halo", "hallo", "hi", "hello", "hey", "yo",
      "apa kabar", "kabar", "assalamualaikum",
      "selamat pagi", "selamat siang", "selamat sore", "selamat malam",
      "siapa kamu", "kamu siapa", "who are you", "what are you",
      "introduce yourself", "kenalan dong"
    ],
    render: () => ({
      text: pickRandom(greetingResponses)
    })
  },

  about: {
    keywords: ["about", "profile", "mahathir", "kenal mahathir", "perkenalan mahathir", "tentang mahathir", "ceritakan tentang mahathir", "mengenai mahathir"],
    render: () => ({
      text: `${profile.aboutText}`
    })
  },

  projects: {
    keywords: ["project", "projek", "portofolio", "website", "sistem", "aplikasi", "karya", "spk", "fp-growth", "what are your projects"],
    render: () => ({
      text: pickRandom([
        "Sure! Here are Mahathir's featured projects.",
        "I've found several projects created by Mahathir.",
        "Here are some works that Mahathir has built."
      ]),
      cards: projects.map(p => ({
        type: "project",
        title: p.title,
        description: p.description,
        tags: p.tech,
        image: p.image,
        github: p.github,
        demo: p.demo
      }))
    })
  },

  certificate: {
    keywords: ["sertifikat", "certificate", "certification", "sertifikasi", "credential", "show me your certificates"],
    render: () => ({
      text: "Here are Mahathir's certifications. Tap a certificate to see the full details.",
      cards: certificates.map((c, i) => ({
        type: "certificate",
        title: c.name,
        issuer: c.issuer,
        date: c.date,
        credentialId: c.credentialId,
        image: c.image,
        file: c.file,
        index: i
      }))
    })
  },

  course: {
  keywords: ["course", "pelatihan", "training", "belajar", "kursus"],
  render: () => ({
    text: "Courses and training Mahathir has completed:",
    cards: courses.map(c => ({
  type: "course",
  title: c.title,
  description: c.description
}))
  })
},

  skills: {
    keywords: ["skill", "kemampuan", "teknologi", "bisa apa", "tech stack", "stack"],
    render: () => ({
      text: "Here's Mahathir's tech stack, grouped by area:",
      cards: skills.map(s => ({ type: "skillgroup", title: s.group, items: s.items }))
    })
  },

  experience: {
    keywords: ["pengalaman", "experience", "kerja", "magang", "intern", "diskominfotik", "riwayat kerja"],
    render: () => ({
      text: "Here's a quick look at Mahathir's work experience.",
      cards: experience.map(e => ({
        type: "experience",
        title: e.role,
        place: e.place,
        period: e.period,
        points: e.points
      }))
    })
  },

  resume: {
    keywords: ["cv", "resume", "download cv", "unduh"],
    render: () => ({
      text: "You can download Mahathir's latest resume below.",
      cards: [{ type: "resume", title: "Download Resume", file: profile.resumePath }]
    })
  },

  github: {
    keywords: ["github", "repo", "repository", "source code"],
    render: () => ({
      text: "Here are Mahathir's repositories.",
      cards: [{ type: "link", title: "Visit GitHub", url: profile.contact.github }]
    })
  },

  contact: {
    keywords: ["kontak", "contact", "hubungi", "email", "whatsapp", "linkedin", "wa", "reach"],
    render: () => ({
      text: "Here's how you can reach Mahathir:",
      cards: [
        {type: "link", title: "Email", url: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.contact.email}`},
        { type: "link", title: "LinkedIn", url: profile.contact.linkedin },
        { type: "link", title: "WhatsApp", url: profile.contact.whatsapp }
      ]
    })
  }
};

const suggestionTopics = ["about", "projects", "skills", "experience", "certificate", "course", "resume", "github", "contact"];

const fallbackText = "I couldn't find an exact answer. You can ask about:";
