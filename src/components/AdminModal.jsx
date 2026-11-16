import { useState, useRef } from 'react';
import { usePortfolio, ACCENT_PALETTES } from '../context/PortfolioContext';
import { 
  X, Lock, Unlock, Plus, Edit2, Trash2, Image as ImageIcon, 
  Upload, Star, Save, RefreshCw, Key, LogOut, CheckCircle2, AlertCircle, 
  ArrowLeft, Download, Palette, Layers, User, Code2, Briefcase, Sun, Moon, Eye, EyeOff
} from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const { 
    themeMode,
    toggleTheme,
    accentKey,
    setAccentKey,
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
    isAdminAuthenticated, 
    login, 
    logout, 
    changePassword,
    savePersonalData
  } = usePortfolio();

  // Estados de login
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Navegación de pestañas en el panel
  // 'sections' | 'personal' | 'projects' | 'skills' | 'experience' | 'security'
  const [activeTab, setActiveTab] = useState('sections');
  const [projectSubView, setProjectSubView] = useState('list'); // 'list' | 'form'
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Estados de formularios
  const [personalForm, setPersonalForm] = useState({ ...personal });
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  // Estado formulario de proyectos
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    tagline: '',
    shortDescription: '',
    detailedDescription: '',
    image: null,
    status: 'En Producción',
    statusType: 'production',
    period: '2024 - Actualidad',
    featured: false,
    techStack: 'React, Node.js, Express, Tailwind CSS',
    highlights: 'Catálogo responsivo\nIntegración de APIs\nControl de stock',
    demoUrl: 'https://github.com/1elema1',
    githubUrl: 'https://github.com/1elema1'
  });

  // Estado para agregar habilidad rápida
  const [newSkillCategory, setNewSkillCategory] = useState('frontend');
  const [newSkillName, setNewSkillName] = useState('');

  // Estado formulario experiencia
  const [expForm, setExpForm] = useState({
    period: '2026 - Presente',
    role: '',
    company: '',
    description: '',
    badge: 'Nuevo'
  });
  const [showExpModal, setShowExpModal] = useState(false);

  // Estado formulario educación
  const [eduForm, setEduForm] = useState({
    title: '',
    institution: '',
    period: '2023 - 2026',
    details: ''
  });
  const [showEduModal, setShowEduModal] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Manejador Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setLoginError('Por favor ingresa la contraseña');
      return;
    }
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await login(passwordInput);
      if (!res.success) {
        setLoginError(res.message || 'Contraseña incorrecta');
      } else {
        setPasswordInput('');
        setPersonalForm({ ...personal });
      }
    } catch (err) {
      setLoginError('Error de autenticación');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Guardar Datos Personales
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    updatePersonal(personalForm);
    notify('Datos personales actualizados');
  };

  // Manejar proyectos
  const handleOpenNewProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: 'Full Stack',
      tagline: '',
      shortDescription: '',
      detailedDescription: '',
      image: null,
      status: 'En Producción',
      statusType: 'production',
      period: '2024 - Actualidad',
      featured: false,
      techStack: 'React, Node.js, Tailwind CSS',
      highlights: 'Diseño 100% responsivo\nArquitectura modular\nTesting y depuración',
      demoUrl: 'https://github.com/1elema1',
      githubUrl: 'https://github.com/1elema1'
    });
    setProjectSubView('form');
  };

  const handleEditProjectClick = (p) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title,
      category: p.category,
      tagline: p.tagline || '',
      shortDescription: p.shortDescription || '',
      detailedDescription: p.detailedDescription || '',
      image: p.image || null,
      status: p.status || 'En Producción',
      statusType: p.statusType || 'production',
      period: p.period || '2024 - Actualidad',
      featured: p.featured || false,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : p.techStack,
      highlights: Array.isArray(p.highlights) ? p.highlights.join('\n') : p.highlights,
      demoUrl: p.demoUrl || '',
      githubUrl: p.githubUrl || ''
    });
    setProjectSubView('form');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectForm(prev => ({ ...prev, image: reader.result }));
      notify('Imagen cargada');
    };
    reader.readAsDataURL(file);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Por favor ingresa un título');
      return;
    }
    const techArray = projectForm.techStack.split(',').map(t => t.trim()).filter(Boolean);
    const highlightsArray = projectForm.highlights.split('\n').map(h => h.trim()).filter(Boolean);

    const payload = {
      ...projectForm,
      techStack: techArray.length ? techArray : ['React'],
      highlights: highlightsArray.length ? highlightsArray : ['Desarrollo a medida']
    };

    if (editingProjectId) {
      updateProject(editingProjectId, payload);
      notify('Proyecto actualizado');
    } else {
      addProject(payload);
      notify('Nuevo proyecto creado');
    }
    setProjectSubView('list');
  };

  // Agregar habilidad
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const currentList = skills[newSkillCategory] || [];
    updateSkillsCategory(newSkillCategory, [...currentList, { name: newSkillName.trim(), level: 'Avanzado' }]);
    setNewSkillName('');
    notify('Habilidad agregada');
  };

  const handleRemoveSkill = (categoryKey, index) => {
    const currentList = skills[categoryKey] || [];
    updateSkillsCategory(categoryKey, currentList.filter((_, i) => i !== index));
    notify('Habilidad eliminada');
  };

  // Exportar código
  const handleExportData = () => {
    const exportObject = {
      personal,
      skills,
      projects,
      experience,
      education,
      sections,
      accentKey
    };
    const content = `export const portfolioDataBackup = ${JSON.stringify(exportObject, null, 2)};`;
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${Date.now()}.js`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Copia de respaldo descargada');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl overflow-hidden font-sans">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-black/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-light border border-accent text-accent">
              {isAdminAuthenticated ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Panel de Control Integral
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-light text-accent border border-accent">
                  Propietario
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-light">
                {isAdminAuthenticated ? 'Control total de secciones, diseño, proyectos y contenidos' : 'Acceso exclusivo para Emanuel Ferreyra'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Cerrar panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Notificación */}
        {notification && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-accent-light border border-accent text-accent text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Contenido Principal */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isAdminAuthenticated ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light border border-accent text-accent mb-5">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Acceso Administrativo</h3>
              <p className="text-xs text-zinc-400 mb-6 font-light">
                Ingresa tu clave de administrador para acceder al panel de control.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Contraseña de administrador"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 pr-11 text-sm text-white placeholder-zinc-500 focus:border-accent focus:outline-none font-mono"
                    autoFocus
                    disabled={isLoggingIn}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
                    title={showLoginPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {loginError && (
                  <p className="text-xs text-red-400 flex items-center justify-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full rounded-xl bg-accent bg-accent-hover py-3 text-sm font-semibold text-white transition-all shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? 'Verificando...' : 'Entrar al Panel'}
                </button>
              </form>
            </div>
          ) : (
            /* Panel autenticado */
            <div className="space-y-6">
              
              {/* Barra de pestañas */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveTab('sections')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'sections' 
                      ? 'bg-accent text-white font-semibold shadow-md' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Palette className="h-3.5 w-3.5" />
                  <span>Secciones & Color</span>
                </button>

                <button
                  onClick={() => setActiveTab('personal')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'personal' 
                      ? 'bg-accent text-white font-semibold shadow-md' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Perfil & Bio</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('projects');
                    setProjectSubView('list');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'projects' 
                      ? 'bg-accent text-white font-semibold shadow-md' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Proyectos ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'skills' 
                      ? 'bg-accent text-white font-semibold shadow-md' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Habilidades</span>
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'experience' 
                      ? 'bg-accent text-white font-semibold shadow-md' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>Experiencia</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'security' 
                      ? 'bg-accent text-white font-semibold shadow-md' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Key className="h-3.5 w-3.5" />
                  <span>Seguridad</span>
                </button>

                {/* Acciones derecha */}
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white cursor-pointer"
                    title="Exportar respaldo"
                  >
                    <Download className="h-3.5 w-3.5 text-accent" />
                    <span>Exportar</span>
                  </button>

                  <button
                    onClick={logout}
                    className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-red-400 hover:bg-red-500/10 cursor-pointer"
                    title="Cerrar sesión de admin"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* PESTAÑA 1: SECCIONES Y COLORES */}
              {activeTab === 'sections' && (
                <div className="space-y-6 text-left">
                  {/* Selector de color de acento */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-accent" />
                      Color de Acento de la Página
                    </h4>
                    <p className="text-xs text-zinc-400 mb-4 font-light">
                      Elige el tono que destacará en botones, badges, terminal y resplandores en todo el sitio:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {Object.entries(ACCENT_PALETTES).map(([key, palette]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setAccentKey(key);
                            notify(`Color cambiado a ${palette.name}`);
                          }}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                            accentKey === key
                              ? 'border-white bg-zinc-800/80 shadow-lg scale-105'
                              : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-600'
                          }`}
                        >
                          <span 
                            className="h-7 w-7 rounded-full shadow-md"
                            style={{ background: palette.hex }}
                          ></span>
                          <span className="text-[11px] font-medium text-zinc-300 text-center">
                            {palette.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Modo Oscuro / Claro en Admin */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                        {themeMode === 'dark' ? <Moon className="h-4 w-4 text-accent" /> : <Sun className="h-4 w-4 text-amber-400" />}
                        Modo de Visualización Actual
                      </h4>
                      <p className="text-xs text-zinc-400 font-light">
                        Actualmente el sitio se encuentra en: <strong className="text-accent">{themeMode === 'dark' ? 'Modo Oscuro (Dark)' : 'Modo Claro (Light)'}</strong>
                      </p>
                    </div>

                    <button
                      onClick={toggleTheme}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                      {themeMode === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-400" />}
                      <span>Cambiar a {themeMode === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
                    </button>
                  </div>

                  {/* Interruptor de Visibilidad de Secciones */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-accent" />
                      Mostrar u Ocultar Secciones
                    </h4>
                    <p className="text-xs text-zinc-400 mb-4 font-light">
                      Activa o apaga cualquier bloque del portfolio con un solo clic. Si desactivas una sección, no será visible para los visitantes:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { key: 'hero', name: 'Hero / Presentación & Terminal' },
                        { key: 'about', name: 'Sobre Mí & Pilares Técnicos' },
                        { key: 'skills', name: 'Habilidades & Stack Tecnológico' },
                        { key: 'projects', name: 'Proyectos & Software' },
                        { key: 'experience', name: 'Trayectoria & Educación' },
                        { key: 'contact', name: 'Contacto & Redes' }
                      ].map(sec => (
                        <div
                          key={sec.key}
                          onClick={() => toggleSection(sec.key)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            sections[sec.key]
                              ? 'border-accent bg-accent-light text-white'
                              : 'border-zinc-800 bg-zinc-950/70 text-zinc-500'
                          }`}
                        >
                          <span className="text-xs font-medium">{sec.name}</span>
                          {sections[sec.key] ? (
                            <Eye className="h-4 w-4 text-accent shrink-0 ml-2" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-zinc-600 shrink-0 ml-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PESTAÑA 2: PERFIL Y BIO */}
              {activeTab === 'personal' && (
                <form onSubmit={handlePersonalSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        value={personalForm.name}
                        onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Handle / Terminal ID</label>
                      <input
                        type="text"
                        value={personalForm.handle}
                        onChange={(e) => setPersonalForm({ ...personalForm, handle: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Título Profesional</label>
                      <input
                        type="text"
                        value={personalForm.title}
                        onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Ubicación</label>
                      <input
                        type="text"
                        value={personalForm.location}
                        onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Disponibilidad / Status</label>
                    <input
                      type="text"
                      value={personalForm.status}
                      onChange={(e) => setPersonalForm({ ...personalForm, status: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Biografía / Presentación</label>
                    <textarea
                      rows={4}
                      value={personalForm.bio}
                      onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        value={personalForm.email}
                        onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Teléfono / WhatsApp</label>
                      <input
                        type="text"
                        value={personalForm.phone}
                        onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Usuario GitHub</label>
                      <input
                        type="text"
                        value={personalForm.githubUsername}
                        onChange={(e) => setPersonalForm({ ...personalForm, githubUsername: e.target.value, github: `https://github.com/${e.target.value}` })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Enlace a LinkedIn</label>
                      <input
                        type="url"
                        value={personalForm.linkedin}
                        onChange={(e) => setPersonalForm({ ...personalForm, linkedin: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none font-mono"
                      />
</div>
{/* Pillars (JSON) */}
<div className="grid grid-cols-1 gap-4 mt-2">
  <label className="block text-xs font-mono text-zinc-400 mb-1">Pilares (JSON)</label>
  <textarea rows={6}
    value={JSON.stringify(personalForm.pillars, null, 2)}
    onChange={(e) => {
      try {
        const parsed = JSON.parse(e.target.value);
        setPersonalForm({ ...personalForm, pillars: parsed });
      } catch (err) {}
    }}
    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none leading-relaxed"
  />
</div>
{/* Soft Skills (JSON) */}
<div className="grid grid-cols-1 gap-4 mt-2">
  <label className="block text-xs font-mono text-zinc-400 mb-1">Soft Skills (JSON)</label>
  <textarea rows={4}
    value={JSON.stringify(personalForm.softSkills, null, 2)}
    onChange={(e) => {
      try {
        const parsed = JSON.parse(e.target.value);
        setPersonalForm({ ...personalForm, softSkills: parsed });
      } catch (err) {}
    }}
    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none leading-relaxed"
  />
</div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent bg-accent-hover text-xs font-semibold text-white shadow-md cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>Guardar Datos Personales</span>
                    </button>
                  </div>
                </form>
              )}

              {/* PESTAÑA 3: PROYECTOS & FOTOS */}
              {activeTab === 'projects' && (
                <div>
                  {projectSubView === 'list' ? (
                    <div className="space-y-4 text-left">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-zinc-400 font-light">Proyectos actualmente en el portfolio:</p>
                        <button
                          onClick={handleOpenNewProject}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent bg-accent-hover text-xs font-semibold text-white shadow-md cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Agregar Proyecto</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {projects.map((p) => (
                          <div
                            key={p.id}
                            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-xl border border-zinc-800 bg-black overflow-hidden flex items-center justify-center shrink-0">
                                {p.image ? (
                                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                                ) : (
                                  <ImageIcon className="h-5 w-5 text-accent opacity-50" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                                  {p.featured && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-light text-accent border border-accent">
                                      ★ Insignia
                                    </span>
                                  )}
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                                    {p.status}
                                  </span>
                                  {p.period && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-accent">
                                      📅 {p.period}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-zinc-400 line-clamp-1">{p.shortDescription}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <button
                                onClick={() => handleEditProjectClick(p)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-light border border-accent text-xs font-medium text-accent hover:bg-accent hover:text-white transition-colors cursor-pointer"
                              >
                                <Edit2 className="h-3 w-3" />
                                <span>Editar</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`¿Eliminar ${p.title}?`)) {
                                    deleteProject(p.id);
                                    notify('Proyecto eliminado');
                                  }
                                }}
                                className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-red-400 hover:border-red-500/40 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Formulario de Proyecto */
                    <form onSubmit={handleProjectSubmit} className="space-y-4 text-left">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                        <button
                          type="button"
                          onClick={() => setProjectSubView('list')}
                          className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          <span>Volver al listado</span>
                        </button>
                        <span className="text-xs font-mono font-semibold text-accent">
                          {editingProjectId ? 'Modificando Proyecto' : 'Nuevo Proyecto'}
                        </span>
                      </div>

                      {/* Imagen */}
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Foto o Captura del Proyecto
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="h-24 w-36 rounded-xl border border-zinc-800 bg-black flex items-center justify-center overflow-hidden shrink-0">
                            {projectForm.image ? (
                              <img src={projectForm.image} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                              <span className="text-[10px] font-mono text-zinc-600">Sin foto</span>
                            )}
                          </div>
                          <div className="flex-1 space-y-2 w-full">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              accept="image/*"
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-xs font-semibold text-white shadow-md cursor-pointer"
                            >
                              <Upload className="h-3.5 w-3.5" />
                              <span>Subir foto desde PC</span>
                            </button>
                            {projectForm.image && (
                              <button
                                type="button"
                                onClick={() => setProjectForm(prev => ({ ...prev, image: null }))}
                                className="ml-2 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-red-400 cursor-pointer"
                              >
                                Quitar foto
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Título *</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Categoría</label>
                          <input
                            type="text"
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Subtítulo / Tagline</label>
                        <input
                          type="text"
                          value={projectForm.tagline}
                          onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Descripción Breve</label>
                        <textarea
                          rows={2}
                          value={projectForm.shortDescription}
                          onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Descripción Detallada (al expandir)</label>
                        <textarea
                          rows={3}
                          value={projectForm.detailedDescription}
                          onChange={(e) => setProjectForm({ ...projectForm, detailedDescription: e.target.value })}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Tecnologías (separadas por coma)</label>
                          <input
                            type="text"
                            value={projectForm.techStack}
                            onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Estado</label>
                          <select
                            value={projectForm.status}
                            onChange={(e) => {
                              const val = e.target.value;
                              let t = 'production';
                              if (val.includes('Beta') || val.includes('Proceso') || val.includes('Desarrollo')) t = 'beta';
                              if (val.includes('Académico')) t = 'academic';
                              if (val.includes('Completado')) t = 'completed';
                              setProjectForm({ ...projectForm, status: val, statusType: t });
                            }}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                          >
                            <option value="En Producción">En Producción</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Actualidad">Actualidad</option>
                            <option value="Beta">Beta / En Desarrollo</option>
                            <option value="Académico">Académico / Universidad</option>
                            <option value="Completado">Completado</option>
                          </select>
                        </div>
                      </div>

                      {/* Periodo de Tiempo */}
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5 flex items-center justify-between">
                          <span>Período de Tiempo (Desde - Hasta / Estado temporal)</span>
                          <span className="text-[10px] text-accent font-semibold font-mono">📅 Visible en la tarjeta</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: 2024 - Actualidad, 2023 - 2024, En proceso, Actualidad..."
                          value={projectForm.period || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, period: e.target.value })}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none font-mono"
                        />
                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                          <span className="text-[10px] text-zinc-500 font-mono">Sugerencias rápidas:</span>
                          {['2024 - Actualidad', '2023 - 2024', 'En proceso', 'Actualidad', '2024', '2023'].map(sugg => (
                            <button
                              key={sugg}
                              type="button"
                              onClick={() => setProjectForm({ ...projectForm, period: sugg })}
                              className="px-2 py-0.5 rounded-md border border-zinc-800 bg-zinc-950 text-[10px] font-mono text-zinc-400 hover:text-white hover:border-accent cursor-pointer transition-colors"
                            >
                              + {sugg}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Enlace a Demo / Web</label>
                          <input
                            type="url"
                            value={projectForm.demoUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Enlace a GitHub</label>
                          <input
                            type="url"
                            value={projectForm.githubUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.featured}
                          onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                          className="h-4 w-4 rounded accent-blue-600"
                        />
                        <span className="text-xs font-medium text-white">Destacar como Proyecto Insignia (Banner superior)</span>
                      </label>

                      <div className="flex items-center justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setProjectSubView('list')}
                          className="px-4 py-2 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-accent text-xs font-semibold text-white shadow-md cursor-pointer"
                        >
                          <Save className="h-4 w-4" />
                          <span>Guardar Proyecto</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* PESTAÑA 4: HABILIDADES (SKILLS) */}
              {activeTab === 'skills' && (
                <div className="space-y-6 text-left">
                  {/* Formulario agregar skill */}
                  <form onSubmit={handleAddSkill} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col sm:flex-row items-center gap-3">
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="w-full sm:w-auto rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                    >
                      <option value="frontend">Frontend & UI</option>
                      <option value="backend">Backend & APIs</option>
                      <option value="databases">Bases de Datos</option>
                      <option value="toolsAndMethods">Herramientas & Entorno</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Nueva tecnología (ej: Next.js, Docker, NestJS)"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full sm:flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-accent focus:outline-none font-mono"
                    />

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-xs font-semibold text-white shadow-md cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Agregar</span>
                    </button>
                  </form>

                  {/* Listado de habilidades por categoría */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'frontend', title: 'Frontend & UI' },
                      { key: 'backend', title: 'Backend & APIs' },
                      { key: 'databases', title: 'Bases de Datos' },
                      { key: 'toolsAndMethods', title: 'Herramientas & Entorno' }
                    ].map(cat => (
                      <div key={cat.key} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                        <h4 className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-3">
                          {cat.title} ({(skills[cat.key] || []).length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(skills[cat.key] || []).map((sk, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300"
                            >
                              <span>{sk.name}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(cat.key, idx)}
                                className="text-zinc-500 hover:text-red-400 p-0.5 cursor-pointer"
                                title="Eliminar"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PESTAÑA 5: EXPERIENCIA & EDUCACIÓN */}
              {activeTab === 'experience' && (
                <div className="space-y-6 text-left">
                  {/* Experiencias */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-accent" />
                        Experiencias Laborales & Emprendimientos
                      </h4>
                      <button
                        onClick={() => {
                          const role = prompt('Puesto / Rol (ej: Full Stack Developer):');
                          if (!role) return;
                          const company = prompt('Empresa o Proyecto (ej: Solem / Freelance):');
                          const period = prompt('Período (ej: 2025 - Presente):', '2025 - Presente');
                          const description = prompt('Descripción de tareas:');
                          addExperience({ role, company, period, description: description || '', badge: 'Nuevo' });
                          notify('Experiencia agregada');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-accent text-xs font-semibold text-white cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Añadir</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {experience.map((exp, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">{exp.role} <span className="text-zinc-500 font-normal">en {exp.company}</span></p>
                            <p className="text-[11px] font-mono text-accent">{exp.period}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar ${exp.role}?`)) {
                                deleteExperienceItem(idx);
                                notify('Experiencia eliminada');
                              }
                            }}
                            className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Educación */}
                  <div className="pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-white">Educación Formal</h4>
                      <button
                        onClick={() => {
                          const title = prompt('Título / Carrera (ej: Tecnicatura en Analista en Sistemas):');
                          if (!title) return;
                          const institution = prompt('Institución (ej: IES21):');
                          const period = prompt('Período (ej: 2023 - 2026):', '2023 - 2026');
                          const details = prompt('Detalles:');
                          addEducation({ title, institution, period, details: details || '' });
                          notify('Educación agregada');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-accent text-xs font-semibold text-white cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Añadir</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {education.map((edu, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">{edu.title}</p>
                            <p className="text-[11px] font-mono text-accent">{edu.institution} ({edu.period})</p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar ${edu.title}?`)) {
                                deleteEducationItem(idx);
                                notify('Educación eliminada');
                              }
                            }}
                            className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PESTAÑA 6: SEGURIDAD Y RESTAURAR */}
              {activeTab === 'security' && (
                <div className="space-y-6 text-left max-w-md mx-auto">
                  <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Key className="h-4 w-4 text-accent" />
                      Modificar Contraseña de Administrador
                    </h4>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setPwdMsg('');
                        const res = changePassword(currentPwd, newPwd);
                        setPwdMsg(res.message);
                        if (res.success) {
                          setCurrentPwd('');
                          setNewPwd('');
                          notify('Contraseña cambiada');
                        }
                      }}
                      className="space-y-3"
                    >
                      <input
                        type="password"
                        placeholder="Contraseña actual"
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-accent focus:outline-none"
                      />
                      {pwdMsg && <p className="text-xs text-accent font-mono">{pwdMsg}</p>}
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-accent text-xs font-semibold text-white shadow-md cursor-pointer"
                      >
                        Actualizar Clave
                      </button>
                    </form>
                  </div>

                  <div className="p-5 rounded-2xl border border-red-500/30 bg-red-950/20 text-center space-y-2">
                    <h4 className="text-xs font-bold text-red-300">Restaurar Todo de Fábrica</h4>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Restaura todos los proyectos, habilidades y textos a sus valores originales.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('¿Estás seguro de que deseas restaurar todo a los valores por defecto?')) {
                          resetAllToDefault();
                          notify('Todo restaurado por defecto');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/30 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Restaurar Valores por Defecto</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
