# 🚀 Portfolio Profesional — Emanuel Ferreyra

> **Analista en Sistemas & Full Stack Developer**  
> Córdoba, Argentina · [GitHub](https://github.com/1elema1) · [Repositorio](https://github.com/1elema1/portfolioferreyra)

Portfolio web moderno de alto rendimiento desarrollado con **React 19**, **Tailwind CSS v4** y **Framer Motion**, optimizado para despliegue continuo en **Vercel**.

Inspirado en la estética minimalista, terminal interactiva y diseño glassmorphism de portafolios de clase mundial.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, JavaScript (ES6+), HTML5, CSS3
- **Estilos & Diseño**: Tailwind CSS v4, Glassmorphism, Responsive Mobile-First
- **Animaciones & UI**: Framer Motion, Lucide Icons, Glitch Effect, Ambient Glow
- **Build Tool**: Vite 8
- **Deploy**: Vercel (con `vercel.json` SPA routing)

---

## 📂 Estructura del Proyecto

```
portfolioferreyra/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Navegación fija con blur y responsive menu
│   │   ├── Hero.jsx                 # Presentación de alto impacto y métricas
│   │   ├── InteractiveTerminal.jsx  # Terminal bash interactiva ($ overview, $ tech, $ contact)
│   │   ├── About.jsx                # Filosofía end-to-end, pilares y soft skills
│   │   ├── Skills.jsx               # Stack técnico categorizado con badges reactivos
│   │   ├── Projects.jsx             # Proyecto insignia + grid de proyectos
│   │   ├── ProjectCard.jsx          # Tarjeta interactiva con acordeón desplegable
│   │   ├── Experience.jsx           # Experiencia laboral, emprendimiento y educación (IES21)
│   │   ├── Contact.jsx              # Contacto directo, WhatsApp, copia de email y descarga de CV
│   │   ├── Footer.jsx               # Pie de página y botón scroll to top
│   │   └── Icons.jsx                # SVGs limpios para marcas
│   ├── data/
│   │   └── portfolioData.js         # 📁 Archivo central con TODOS los datos y proyectos
│   ├── App.jsx                      # Layout principal
│   ├── index.css                    # Estilos globales y utilidades personalizadas
│   └── main.jsx                     # Punto de entrada de React
├── public/                          # Favicons y assets estáticos (CV en PDF)
├── vercel.json                      # Configuración de rewrite para despliegue en Vercel
├── vite.config.js                   # Configuración de Vite + Tailwind
└── package.json                     # Scripts y dependencias
```

---

## ⚙️ Cómo Ejecutar en Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/1elema1/portfolioferreyra.git
   cd portfolioferreyra
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue en Vercel

Este proyecto está configurado para desplegarse con un solo clic en **Vercel**:
1. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** → **"Project"**.
3. Selecciona el repositorio `portfolioferreyra`.
4. Deja la configuración por defecto (Vite detectará el framework automáticamente).
5. Haz clic en **"Deploy"**.

---

## 📝 Personalización de Datos

Para modificar cualquier dato (tus enlaces, textos, teléfono, proyectos o agregar nuevas habilidades), simplemente edita el archivo:
👉 [`src/data/portfolioData.js`](src/data/portfolioData.js)

¡Todo el portfolio se actualizará automáticamente sin necesidad de tocar código HTML/JSX!
