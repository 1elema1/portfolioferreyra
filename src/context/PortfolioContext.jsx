import { createContext, useContext, useState, useEffect } from 'react';
import { projectsData as defaultProjects } from '../data/portfolioData';

const PortfolioContext = createContext();

const STORAGE_KEY = 'portfolio_ferreyra_projects';
const AUTH_KEY = 'portfolio_ferreyra_auth';
const PWD_KEY = 'portfolio_ferreyra_pwd';
const DEFAULT_PASSWORD = 'emanuel2026';

export function PortfolioProvider({ children }) {
  // Proyectos sincronizados con LocalStorage
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error cargando proyectos de localStorage', e);
    }
    return defaultProjects;
  });

  // Estado de autenticación del administrador
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  // Guardar proyectos en LocalStorage cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Error guardando proyectos en localStorage', e);
    }
  }, [projects]);

  // Obtener contraseña administrativa
  const getAdminPassword = () => {
    return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD;
  };

  // Iniciar sesión
  const login = (password) => {
    const currentPassword = getAdminPassword();
    if (password === currentPassword) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return { success: true };
    }
    return { success: false, message: 'Contraseña incorrecta' };
  };

  // Cerrar sesión
  const logout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // Cambiar contraseña
  const changePassword = (currentPassword, newPassword) => {
    if (currentPassword !== getAdminPassword()) {
      return { success: false, message: 'La contraseña actual no es válida.' };
    }
    if (!newPassword || newPassword.length < 4) {
      return { success: false, message: 'La nueva contraseña debe tener al menos 4 caracteres.' };
    }
    localStorage.setItem(PWD_KEY, newPassword);
    return { success: true, message: 'Contraseña actualizada con éxito.' };
  };

  // Agregar nuevo proyecto
  const addProject = (newProject) => {
    const id = `project-${Date.now()}`;
    const projectWithId = { ...newProject, id };
    
    // Si este nuevo proyecto está marcado como 'featured', desmarcar los demás
    let updatedProjects = projects;
    if (projectWithId.featured) {
      updatedProjects = updatedProjects.map(p => ({ ...p, featured: false }));
    }

    setProjects([projectWithId, ...updatedProjects]);
    return projectWithId;
  };

  // Actualizar proyecto existente
  const updateProject = (id, updatedFields) => {
    setProjects(prev => {
      let updated = prev.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      // Si se marcó como featured, asegurar que sea el único
      if (updatedFields.featured) {
        updated = updated.map(p => p.id === id ? p : { ...p, featured: false });
      }
      return updated;
    });
  };

  // Eliminar proyecto
  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Restaurar proyectos a los originales de portfolioData.js
  const resetToDefault = () => {
    setProjects(defaultProjects);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        isAdminAuthenticated,
        login,
        logout,
        changePassword,
        addProject,
        updateProject,
        deleteProject,
        resetToDefault,
        defaultProjects
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
