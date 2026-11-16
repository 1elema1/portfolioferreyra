import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { personalData as defaultPersonal } from '../data/personalData';
import {
  skillsData as defaultSkills,
  projectsData as defaultProjects,
  experienceData as defaultExperience,
  educationData as defaultEducation
} from '../data/portfolioData';

const PortfolioContext = createContext();

const STORAGE_KEYS = {
  THEME_MODE: 'portfolio_ferreyra_theme_mode_v4',
  ACCENT_COLOR: 'portfolio_ferreyra_accent_color_v4',
  SECTIONS: 'portfolio_ferreyra_sections_v4',
  PERSONAL: 'portfolio_ferreyra_personal_v4',
  SKILLS: 'portfolio_ferreyra_skills_v4',
  PROJECTS: 'portfolio_ferreyra_projects_v4',
  EXPERIENCE: 'portfolio_ferreyra_experience_v4',
  EDUCATION: 'portfolio_ferreyra_education_v4',
  AUTH: 'portfolio_ferreyra_auth_v4',
  PWD: 'portfolio_ferreyra_admin_pwd_v4'
};

const DEFAULT_PASSWORD = 'emanuel2026';

export const ACCENT_PALETTES = {
  blue: {
    name: 'Azul Eléctrico',
    hex: '#3b82f6',
    hover: '#2563eb',
    light: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.35)',
    glow: 'rgba(59, 130, 246, 0.25)'
  },
  cyan: {
    name: 'Cyan Neón',
    hex: '#06b6d4',
    hover: '#0891b2',
    light: 'rgba(6, 182, 212, 0.15)',
    border: 'rgba(6, 182, 212, 0.35)',
    glow: 'rgba(6, 182, 212, 0.25)'
  },
  violet: {
    name: 'Violeta / Púrpura',
    hex: '#8b5cf6',
    hover: '#7c3aed',
    light: 'rgba(139, 92, 246, 0.15)',
    border: 'rgba(139, 92, 246, 0.35)',
    glow: 'rgba(139, 92, 246, 0.25)'
  },
  emerald: {
    name: 'Esmeralda Mint',
    hex: '#10b981',
    hover: '#059669',
    light: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.35)',
    glow: 'rgba(16, 185, 129, 0.25)'
  },
  amber: {
    name: 'Ámbar Dorado',
    hex: '#f59e0b',
    hover: '#d97706',
    light: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.35)',
    glow: 'rgba(245, 158, 11, 0.25)'
  },
  rose: {
    name: 'Rosa Magenta',
    hex: '#ec4899',
    hover: '#db2777',
    light: 'rgba(236, 72, 153, 0.15)',
    border: 'rgba(236, 72, 153, 0.35)',
    glow: 'rgba(236, 72, 153, 0.25)'
  }
};

const DEFAULT_SECTIONS = {
  hero: true,
  about: true,
  skills: true,
  projects: true,
  experience: true,
  contact: true
};

export function PortfolioProvider({ children }) {
  // 1. Tema Claro / Oscuro - Light por defecto
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return 'light';
  });

  // 2. Color de acento
  const [accentKey, setAccentKey] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCENT_COLOR);
      if (saved && ACCENT_PALETTES[saved]) return saved;
    } catch (e) {}
    return 'blue';
  });

  // 3. Secciones
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SECTIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_SECTIONS;
  });

  // 4. Datos Personales
  const [personal, setPersonal] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultPersonal;
  });

  // 5. Habilidades
  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultSkills;
  });

  // 6. Proyectos
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultProjects;
  });

  // 7. Experiencia
  const [experience, setExperience] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultExperience;
  });

  // 8. Educación
  const [education, setEducation] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultEducation;
  });

  // 9. Autenticación Administrador
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // =========================================================================
  // SINCRONIZACIÓN EN TIEMPO REAL CON FIREBASE FIRESTORE (LA NUBE)
  // =========================================================================
  useEffect(() => {
    const portfolioDocRef = doc(db, 'portfolio', 'content');

    const unsubscribe = onSnapshot(portfolioDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        if (cloudData.personal) setPersonal(prev => ({ ...prev, ...cloudData.personal }));
        if (cloudData.projects) setProjects(cloudData.projects);
        if (cloudData.skills) setSkills(cloudData.skills);
        if (cloudData.experience) setExperience(cloudData.experience);
        if (cloudData.education) setEducation(cloudData.education);
        if (cloudData.sections) setSections(cloudData.sections);
        if (cloudData.accentKey && ACCENT_PALETTES[cloudData.accentKey]) setAccentKey(cloudData.accentKey);
      } else {
        // Primera vez: Si la base de datos está vacía, la inicializamos con los datos actuales
        setDoc(portfolioDocRef, {
          personal,
          projects,
          skills,
          experience,
          education,
          sections,
          accentKey
        }).catch(err => console.warn('Aviso al inicializar Firestore:', err));
      }
    }, (error) => {
      console.warn('Aviso Firestore:', error.message);
    });

    return () => unsubscribe();
  }, []);

  // Función interna para sincronizar inmediatamente cualquier cambio hacia Firebase
  const syncToFirebase = async (partialData) => {
    try {
      const portfolioDocRef = doc(db, 'portfolio', 'content');
      await setDoc(portfolioDocRef, partialData, { merge: true });
      return true;
    } catch (e) {
      console.warn('Error guardando en Firebase Firestore:', e);
      return false;
    }
  };

  // Función para subir de un solo clic todo el contenido actual del navegador a Firebase
  const syncAllToFirebase = async () => {
    try {
      const portfolioDocRef = doc(db, 'portfolio', 'content');
      await setDoc(portfolioDocRef, {
        personal,
        projects,
        skills,
        experience,
        education,
        sections,
        accentKey
      }, { merge: true });
      return true;
    } catch (e) {
      console.error('Error al sincronizar todo en Firebase:', e);
      return false;
    }
  };

  // Clases y colores dinámicos
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    const palette = ACCENT_PALETTES[accentKey] || ACCENT_PALETTES.blue;
    root.style.setProperty('--color-accent', palette.hex);
    root.style.setProperty('--color-accent-hover', palette.hover);
    root.style.setProperty('--color-accent-light', palette.light);
    root.style.setProperty('--color-accent-border', palette.border);
    root.style.setProperty('--color-accent-glow', palette.glow);
  }, [themeMode, accentKey]);

  // Persistir en LocalStorage como caché inmediata
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME_MODE, themeMode);
      localStorage.setItem(STORAGE_KEYS.ACCENT_COLOR, accentKey);
      localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(sections));
      localStorage.setItem(STORAGE_KEYS.PERSONAL, JSON.stringify(personal));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
    } catch (e) {
      console.error('Error guardando en localStorage', e);
    }
  }, [themeMode, accentKey, sections, personal, skills, projects, experience, education]);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleSection = (sectionKey) => {
    setSections(prev => {
      const next = { ...prev, [sectionKey]: !prev[sectionKey] };
      syncToFirebase({ sections: next });
      return next;
    });
  };

  const handleSetAccentKey = (newAccent) => {
    setAccentKey(newAccent);
    syncToFirebase({ accentKey: newAccent });
  };

  // Auth methods
  const getValidLocalPasswords = () => {
    const list = [];
    const custom = localStorage.getItem(STORAGE_KEYS.PWD);
    if (custom) list.push(custom);

    try {
      if (typeof __ADMIN_PASSWORD__ !== 'undefined' && __ADMIN_PASSWORD__) list.push(__ADMIN_PASSWORD__);
      if (typeof __PORTFOLIOVERCEL__ !== 'undefined' && __PORTFOLIOVERCEL__) list.push(__PORTFOLIOVERCEL__);
      if (typeof __SESSION_SECRET__ !== 'undefined' && __SESSION_SECRET__) list.push(__SESSION_SECRET__);

      if (import.meta.env.ADMIN_PASSWORD) list.push(import.meta.env.ADMIN_PASSWORD);
      if (import.meta.env.PORTFOLIOVERCEL) list.push(import.meta.env.PORTFOLIOVERCEL);
      if (import.meta.env.VITE_ADMIN_PASSWORD) list.push(import.meta.env.VITE_ADMIN_PASSWORD);
    } catch (e) {}

    list.push(DEFAULT_PASSWORD);
    return list;
  };

  const login = async (password) => {
    if (!password) {
      return { success: false, message: 'Por favor ingresa la contraseña' };
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsAdminAuthenticated(true);
          sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
          return { success: true };
        }
      } else if (response.status === 401) {
        return { success: false, message: 'Contraseña incorrecta' };
      }
    } catch (e) {}

    const validList = getValidLocalPasswords();
    if (validList.includes(password)) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return { success: true };
    }

    return { success: false, message: 'Contraseña incorrecta' };
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const changePassword = (currentPassword, newPassword) => {
    const validList = getValidLocalPasswords();
    if (!validList.includes(currentPassword)) {
      return { success: false, message: 'La contraseña actual no es válida.' };
    }
    if (!newPassword || newPassword.length < 4) {
      return { success: false, message: 'La nueva contraseña debe tener al menos 4 caracteres.' };
    }
    localStorage.setItem(STORAGE_KEYS.PWD, newPassword);
    return { success: true, message: 'Contraseña actualizada con éxito.' };
  };

  // Modificadores con sincronización automática en Firebase (Nube)
  const updatePersonal = (fields) => {
    setPersonal(prev => {
      const updated = { ...prev, ...fields };
      syncToFirebase({ personal: updated });
      return updated;
    });
  };

  const addProject = (newProject) => {
    const id = `project-${Date.now()}`;
    const projectWithId = { ...newProject, id };
    let updatedProjects = projects;
    if (projectWithId.featured) {
      updatedProjects = updatedProjects.map(p => ({ ...p, featured: false }));
    }
    const nextProjects = [projectWithId, ...updatedProjects];
    setProjects(nextProjects);
    syncToFirebase({ projects: nextProjects });
    return projectWithId;
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev => {
      let updated = prev.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      if (updatedFields.featured) {
        updated = updated.map(p => p.id === id ? p : { ...p, featured: false });
      }
      syncToFirebase({ projects: updated });
      return updated;
    });
  };

  const deleteProject = (id) => {
    setProjects(prev => {
      const next = prev.filter(p => p.id !== id);
      syncToFirebase({ projects: next });
      return next;
    });
  };

  const updateSkillsCategory = (categoryKey, items) => {
    setSkills(prev => {
      const updated = { ...prev, [categoryKey]: items };
      syncToFirebase({ skills: updated });
      return updated;
    });
  };

  const addExperience = (item) => {
    setExperience(prev => {
      const next = [item, ...prev];
      syncToFirebase({ experience: next });
      return next;
    });
  };

  const updateExperienceItem = (index, item) => {
    setExperience(prev => {
      const next = prev.map((exp, i) => i === index ? item : exp);
      syncToFirebase({ experience: next });
      return next;
    });
  };

  const deleteExperienceItem = (index) => {
    setExperience(prev => {
      const next = prev.filter((_, i) => i !== index);
      syncToFirebase({ experience: next });
      return next;
    });
  };

  const addEducation = (item) => {
    setEducation(prev => {
      const next = [item, ...prev];
      syncToFirebase({ education: next });
      return next;
    });
  };

  const updateEducationItem = (index, item) => {
    setEducation(prev => {
      const next = prev.map((edu, i) => i === index ? item : edu);
      syncToFirebase({ education: next });
      return next;
    });
  };

  const deleteEducationItem = (index) => {
    setEducation(prev => {
      const next = prev.filter((_, i) => i !== index);
      syncToFirebase({ education: next });
      return next;
    });
  };

  const resetAllToDefault = () => {
    setPersonal(defaultPersonal);
    setSkills(defaultSkills);
    setProjects(defaultProjects);
    setExperience(defaultExperience);
    setEducation(defaultEducation);
    setSections(DEFAULT_SECTIONS);
    setAccentKey('blue');
    setThemeMode('light');
    syncToFirebase({
      personal: defaultPersonal,
      skills: defaultSkills,
      projects: defaultProjects,
      experience: defaultExperience,
      education: defaultEducation,
      sections: DEFAULT_SECTIONS,
      accentKey: 'blue'
    });
    Object.values(STORAGE_KEYS).forEach(k => {
      if (k !== STORAGE_KEYS.PWD) localStorage.removeItem(k);
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        themeMode,
        toggleTheme,
        accentKey,
        setAccentKey: handleSetAccentKey,
        accentPalette: ACCENT_PALETTES[accentKey] || ACCENT_PALETTES.blue,
        sections,
        toggleSection,
        personal,
        updatePersonal,
        skills,
        updateSkillsCategory,
        projects,
        addProject,
        updateProject,
        deleteProject,
        experience,
        addExperience,
        updateExperienceItem,
        deleteExperienceItem,
        education,
        addEducation,
        updateEducationItem,
        deleteEducationItem,
        resetAllToDefault,
        syncAllToFirebase,
        syncToFirebase,
        isAdminAuthenticated,
        login,
        logout,
        changePassword
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio debe usarse dentro de un PortfolioProvider');
  }
  return context;
}
