/**
 * ==============================================================================
 * ARCHIVO CENTRAL DE DATOS DEL PORTFOLIO — EMANUEL FERREYRA
 * ==============================================================================
 * 
 * ¿CÓMO EDITAR TUS PROYECTOS?
 * ------------------------------------------------------------------------------
 * 1. Para AGREGAR un proyecto:
 *    Copia y pega uno de los objetos de 'projectsData', cambia el 'id' (ej: 'project-5')
 *    y completa sus campos.
 * 
 * 2. Para EDITAR un proyecto:
 *    Modifica directamente el texto, título, tecnologías o enlaces de cualquiera de ellos.
 * 
 * 3. Para ELIMINAR un proyecto:
 *    Borra el bloque de código entre llaves { ... } del proyecto que no desees.
 * 
 * 4. Para SUBIR UNA IMAGEN:
 *    - Coloca tu imagen (JPG, PNG, WebP) en la carpeta: 'public/projects/'
 *      (ejemplo: 'public/projects/mi-sistema.png')
 *    - En el campo 'image' escribe: "/projects/mi-sistema.png"
 *    - Si no tienes imagen o lo dejas en 'null', el sistema mostrará un elegante
 *      diseño tecnológico con gradiente azul y el icono del proyecto automáticamente.
 * ==============================================================================
 */

// Duplicate personalData export removed; use src/data/personalData.js instead
  name: "Emanuel Ferreyra",
  shortName: "Emanuel",
  handle: "emanuel.ferreyra",
  title: "Analista en Sistemas & Full Stack Developer",
  location: "Córdoba, Argentina",
  status: "Open to Work / Full Time",
  availability: "Disponibilidad Inmediata Full-Time",

  email: "ferreyraemanuel19@gmail.com",
  phone: "+54 9 351 289-0844",
  phoneRaw: "3512890844",
  github: "https://github.com/1elema1",
  githubUsername: "1elema1",
  linkedin: "https://linkedin.com/in/emanuel-ferreyra",
  portfolioRepo: "https://github.com/1elema1/portfolioferreyra",
  cvFileName: "Emanuel_Ferreyra_CV.pdf",

  stats: [
    { label: "Proyectos Realizados", value: "8+" },
    { label: "Formación Técnica", value: "IES21" },
    { label: "Disponibilidad", value: "Full Time" },
    { label: "Enfoque", value: "End-to-End" }
  ]
};

export const skillsData = {
  frontend: [
    { name: "React", level: "Avanzado" },
    { name: "JavaScript (ES6+)", level: "Avanzado" },
    { name: "HTML5 / CSS3", level: "Avanzado" },
    { name: "Tailwind CSS", level: "Avanzado" },
    { name: "TypeScript", level: "Intermedio" },
    { name: "Responsive Design", level: "Avanzado" },
  ],
  backend: [
    { name: "Node.js", level: "Avanzado" },
    { name: "Express.js", level: "Avanzado" },
    { name: "APIs RESTful", level: "Avanzado" },
    { name: "Java", level: "Intermedio" },
    { name: "Arquitectura en Capas", level: "Intermedio" },
    { name: "Testing & Debugging", level: "Intermedio" },
  ],
  databases: [
    { name: "PostgreSQL", level: "Intermedio" },
    { name: "MySQL / SQL", level: "Avanzado" },
    { name: "MongoDB (NoSQL)", level: "Intermedio" },
    { name: "Firebase", level: "Intermedio" },
    { name: "Modelado ER", level: "Avanzado" },
  ],
  toolsAndMethods: [
    { name: "Git & GitHub", level: "Avanzado" },
    { name: "Modelado UML", level: "Avanzado" },
    { name: "VS Code", level: "Avanzado" },
    { name: "NetBeans", level: "Intermedio" },
    { name: "Vercel Deploy", level: "Avanzado" },
    { name: "Metodologías Ágiles", level: "Intermedio" },
  ]
};

export const projectsData = [
  {
    id: "project-1",
    title: "Solem E-Commerce & Gestión Comercial",
    category: "Emprendimiento & Full Stack",
    tagline: "Plataforma de ventas, catálogo dinámico y control de inventario",
    shortDescription: "Plataforma desarrollada para la gestión integral de ventas físicas y online, con catálogo dinámico y pedidos centralizados.",
    detailedDescription: "Sistema integral desarrollado para potenciar el emprendimiento Solem. Cuenta con una vitrina digital para clientes con experiencia de compra fluida y un panel administrativo para coordinar stock, registrar pedidos presenciales/digitales y gestionar interacciones con clientes. Implementado bajo una arquitectura modular y escalable.",
    // Aquí puedes colocar la ruta de tu imagen, ej: "/projects/solem.png", o dejar 'null'
    image: null,
    status: "En Producción",
    statusType: "production", // opciones: 'production' | 'beta' | 'academic' | 'completed'
    period: "2024 - Actualidad",
    featured: true, // Si es true, se muestra en el panel grande superior
    techStack: ["React", "Node.js", "Express", "Tailwind CSS", "SQL", "Vercel"],
    highlights: [
      "Catálogo público responsivo con categorización y filtros dinámicos",
      "Sincronización de pedidos y stock para venta online y presencial",
      "Panel de control para registro de ventas y seguimiento de clientes",
      "Integración de canales de comunicación directa (WhatsApp / Redes)"
    ],
    demoUrl: "https://github.com/1elema1/portfolioferreyra",
    githubUrl: "https://github.com/1elema1",
  },
  {
    id: "project-2",
    title: "Sistema de Gestión y API REST",
    category: "Backend & Base de Datos",
    tagline: "Arquitectura backend robusta para control de operaciones y usuarios",
    shortDescription: "API RESTful construida con Node.js y Express conectada a base de datos relacional para gestión de datos, autenticación y transacciones.",
    detailedDescription: "Desarrollo de un backend profesional con arquitectura por capas (Controladores, Servicios, Repositorios). Manejo de validaciones estrictas de datos de entrada, control de errores centralizado, endpoints RESTful testeados y modelado de relaciones complejas en SQL.",
    image: null,
    status: "Completado",
    statusType: "completed",
    period: "2024",
    featured: false,
    techStack: ["Node.js", "Express.js", "PostgreSQL", "SQL", "REST API", "Git"],
    highlights: [
      "Endpoints tipados con validaciones y manejo de excepciones",
      "Modelado de base de datos relacional con claves foráneas e integridad referencial",
      "Documentación clara de rutas y pruebas de integración",
      "Control de versiones modular con ramas y pull requests en GitHub"
    ],
    demoUrl: "https://github.com/1elema1",
    githubUrl: "https://github.com/1elema1",
  },
  {
    id: "project-3",
    title: "Aplicación de Escritorio & Lógica en Java",
    category: "Java & Programación Orientada a Objetos",
    tagline: "Software empresarial con persistencia y patrones de diseño",
    shortDescription: "Sistema desarrollado en Java enfocado en la aplicación estricta de principios POO, modelado UML y persistencia de datos.",
    detailedDescription: "Proyecto académico avanzado en el IES21 donde se aplicaron patrones de diseño de software (MVC), diagramas de clases y casos de uso en UML, y manejo de excepciones en Java con interfaz gráfica de escritorio y conexión a base de datos.",
    image: null,
    status: "Académico",
    statusType: "academic",
    period: "2023 - 2024",
    featured: false,
    techStack: ["Java", "POO", "NetBeans", "MySQL", "UML", "Testing"],
    highlights: [
      "Modelado previo completo con diagramas UML de clases y secuencia",
      "Patrón de arquitectura MVC (Modelo - Vista - Controlador)",
      "Persistencia de datos mediante JDBC hacia base de datos relacional",
      "Validación de datos y manejo de excepciones en tiempo de ejecución"
    ],
    demoUrl: "https://github.com/1elema1",
    githubUrl: "https://github.com/1elema1",
  },
  {
    id: "project-4",
    title: "Portfolio Personal Interactivo",
    category: "Frontend Moderno",
    tagline: "Experiencia web interactiva con React, Tailwind CSS y animaciones",
    shortDescription: "Portfolio moderno de alto impacto diseñado para presentar proyectos, trayectoria técnica y facilitar contacto profesional.",
    detailedDescription: "Desarrollado con React 19, Tailwind CSS v4 y Framer Motion. Incorpora terminal interactiva, efectos de iluminación ambiental, arquitectura de datos desacoplada y diseño 100% responsivo optimizado para despliegue continuo en Vercel.",
    image: null,
    status: "En Producción",
    statusType: "production",
    period: "2024 - Actualidad",
    featured: false,
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Lucide Icons", "Vite", "Vercel"],
    highlights: [
      "Terminal interactiva con estado 'Open to work' y comando en tiempo real",
      "Diseño Glassmorphism sofisticado con contraste optimizado (WCAG)",
      "Despliegue automático y continuo en Vercel desde GitHub",
      "Arquitectura de datos modular para fácil actualización de contenido"
    ],
    demoUrl: "https://github.com/1elema1/portfolioferreyra",
    githubUrl: "https://github.com/1elema1/portfolioferreyra",
  }
];

export const experienceData = [
  {
    period: "2025 - Presente",
    role: "Full Stack & Co-Fundador",
    company: "Emprendimiento Solem",
    description: "Gestión de presencia digital, desarrollo de soluciones para catálogos y gestión de clientes, venta presencial y online.",
    badge: "Activo"
  },
  {
    period: "2023 - 2026",
    role: "Desarrollador de Software Jr (Proyectos)",
    company: "Formación Profesional & Freelance",
    description: "Desarrollo de proyectos con React, Node.js, Express, Java y bases de datos. Modelado de sistemas en UML y control de versiones con Git/GitHub.",
    badge: "Proyectos"
  },
  {
    period: "Dic 2025 - 2026",
    role: "Atención al Cliente y Gestión",
    company: "Bando",
    description: "Atención al cliente, organización de productos, gestión de depósitos y ventas presenciales con enfoque en trabajo en equipo y comunicación.",
    badge: "Experiencia"
  }
];

export const educationData = [
  {
    title: "Tecnicatura en Analista en Sistemas",
    institution: "IES21 (Instituto de Educación Superior)",
    period: "2023 - 2026",
    details: "Formación integral en desarrollo de software, algoritmos, bases de datos SQL/NoSQL, POO en Java, ingeniería de software y metodologías ágiles."
  },
  {
    title: "Educación Secundaria Completa",
    institution: "Instituto Privado San Agustín",
    period: "2014 - 2022",
    details: "Formación académica base orientada al compromiso, la responsabilidad y el pensamiento crítico."
  }
];
