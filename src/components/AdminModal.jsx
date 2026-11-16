import { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, Lock, Unlock, Plus, Edit2, Trash2, Image as ImageIcon, 
  Upload, Star, Save, RefreshCw, Key, LogOut, CheckCircle2, AlertCircle, Eye, ArrowLeft, Download
} from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const { 
    projects, 
    isAdminAuthenticated, 
    login, 
    logout, 
    changePassword,
    addProject, 
    updateProject, 
    deleteProject, 
    resetToDefault 
  } = usePortfolio();

  // Estados de login
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Estados de navegación dentro del panel
  const [activeView, setActiveView] = useState('list'); // 'list' | 'form' | 'settings'
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Estados de cambio de contraseña
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  // Estado del formulario de proyecto
  const [formData, setFormData] = useState({
    title: '',
    category: 'Full Stack',
    tagline: '',
    shortDescription: '',
    detailedDescription: '',
    image: null,
    status: 'En Producción',
    statusType: 'production',
    featured: false,
    techStack: 'React, Node.js, Express, Tailwind CSS',
    highlights: 'Catálogo responsivo\nIntegración de APIs\nControl de stock',
    demoUrl: 'https://github.com/1elema1',
    githubUrl: 'https://github.com/1elema1'
  });

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Manejador de Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = login(passwordInput);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setPasswordInput('');
    }
  };

  // Abrir formulario para crear nuevo proyecto
  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Full Stack',
      tagline: '',
      shortDescription: '',
      detailedDescription: '',
      image: null,
      status: 'En Producción',
      statusType: 'production',
      featured: false,
      techStack: 'React, Node.js, Tailwind CSS',
      highlights: 'Diseño 100% responsivo\nArquitectura modular\nTesting y depuración',
      demoUrl: 'https://github.com/1elema1',
      githubUrl: 'https://github.com/1elema1'
    });
    setActiveView('form');
  };

  // Abrir formulario para editar proyecto existente
  const handleEditClick = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      tagline: project.tagline || '',
      shortDescription: project.shortDescription || '',
      detailedDescription: project.detailedDescription || '',
      image: project.image || null,
      status: project.status || 'En Producción',
      statusType: project.statusType || 'production',
      featured: project.featured || false,
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack,
      highlights: Array.isArray(project.highlights) ? project.highlights.join('\n') : project.highlights,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || ''
    });
    setActiveView('form');
  };

  // Subir imagen local desde la PC (convierte a Base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('La imagen es algo pesada (más de 3MB). Te recomendamos una imagen menor a 2MB para mejor velocidad.');
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
      showNotification('Imagen cargada correctamente');
    };
    reader.readAsDataURL(file);
  };

  // Guardar proyecto (crear o actualizar)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Por favor escribe un título para el proyecto');
      return;
    }

    const techArray = formData.techStack
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const highlightsArray = formData.highlights
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const projectPayload = {
      ...formData,
      techStack: techArray.length > 0 ? techArray : ['React'],
      highlights: highlightsArray.length > 0 ? highlightsArray : ['Desarrollo web a medida']
    };

    if (editingId) {
      updateProject(editingId, projectPayload);
      showNotification('Proyecto actualizado con éxito');
    } else {
      addProject(projectPayload);
      showNotification('Nuevo proyecto agregado al portfolio');
    }

    setActiveView('list');
  };

  // Eliminar proyecto
  const handleDelete = (id, title) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el proyecto "${title}"?`)) {
      deleteProject(id);
      showNotification('Proyecto eliminado');
    }
  };

  // Descargar archivo portfolioData.js actualizado para producción
  const handleDownloadCode = () => {
    const fileContent = `export const projectsData = ${JSON.stringify(projects, null, 2)};`;
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projectsData-export.js';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Archivo exportado con éxito');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-blue-500/30 bg-zinc-950 text-white shadow-2xl shadow-blue-950/60 overflow-hidden font-sans">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-black/60 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400">
              {isAdminAuthenticated ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Panel de Administración Privado
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  Solo Propietario
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-light">
                {isAdminAuthenticated ? 'Gestiona, agrega, edita o elimina proyectos en tiempo real' : 'Acceso restringido para Emanuel Ferreyra'}
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

        {/* Notificación flotante */}
        {notification && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
            <span>{notification.msg}</span>
          </div>
        )}

        {/* Body Modal */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAdminAuthenticated ? (
            /* Pantalla de Login */
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-400 mb-5">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ingresar al Panel de Control</h3>
              <p className="text-xs text-zinc-400 mb-6 font-light">
                Ingresa tu clave de administrador para gestionar tus proyectos.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Contraseña de administrador"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    autoFocus
                  />
                  {loginError && (
                    <p className="mt-2 text-xs text-red-400 flex items-center justify-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {loginError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
                >
                  Acceder al Panel
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-500 font-mono">
                Clave inicial por defecto: <span className="text-blue-400">emanuel2026</span>
              </div>
            </div>
          ) : (
            /* Panel autenticado */
            <div>
              {/* Barra de pestañas y acciones rápidas */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-800">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveView('list')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      activeView === 'list'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    Proyectos ({projects.length})
                  </button>
                  <button
                    onClick={handleCreateNew}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      activeView === 'form' && !editingId
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Nuevo Proyecto
                  </button>
                  <button
                    onClick={() => setActiveView('settings')}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      activeView === 'settings'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    <Key className="h-3.5 w-3.5" />
                    Seguridad
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadCode}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                    title="Exportar archivo de datos para respaldo"
                  >
                    <Download className="h-3.5 w-3.5 text-blue-400" />
                    <span>Exportar</span>
                  </button>

                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors cursor-pointer"
                    title="Cerrar sesión de administrador"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Salir</span>
                  </button>
                </div>
              </div>

              {/* Vistas del Panel */}

              {/* VISTA 1: LISTADO DE PROYECTOS */}
              {activeView === 'list' && (
                <div className="pt-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-light">
                    <p>Estos proyectos se reflejan en tiempo real en la vista pública de tu sitio:</p>
                    <button
                      onClick={resetToDefault}
                      className="text-zinc-500 hover:text-zinc-300 inline-flex items-center gap-1 text-[11px] cursor-pointer"
                      title="Restaura los 4 proyectos iniciales"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Restaurar por defecto
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-blue-500/30 hover:bg-zinc-900/80"
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Miniatura de imagen o icono */}
                          <div className="h-14 w-14 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden flex items-center justify-center shrink-0">
                            {proj.image ? (
                              <img src={proj.image} alt={proj.title} className="h-full w-full object-cover" />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-blue-400/50" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                              {proj.featured && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                                  <Star className="h-2.5 w-2.5 fill-blue-400 text-blue-400" />
                                  Insignia
                                </span>
                              )}
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                                {proj.status}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-0.5 font-light line-clamp-1">
                              {proj.shortDescription || proj.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Botones de acción del proyecto */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleEditClick(proj)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 border border-blue-500/30 text-xs font-medium text-blue-300 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                            <span>Editar</span>
                          </button>

                          <button
                            onClick={() => handleDelete(proj.id, proj.title)}
                            className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Eliminar proyecto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VISTA 2: FORMULARIO CREAR / EDITAR */}
              {activeView === 'form' && (
                <form onSubmit={handleFormSubmit} className="pt-4 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setActiveView('list')}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Volver al listado</span>
                    </button>
                    <span className="text-xs font-mono font-semibold text-blue-400">
                      {editingId ? 'Editando Proyecto' : 'Creando Nuevo Proyecto'}
                    </span>
                  </div>

                  {/* Subir Imagen */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Imagen del Proyecto
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Preview de la imagen */}
                      <div className="h-28 w-44 rounded-xl border border-zinc-800 bg-black flex items-center justify-center overflow-hidden shrink-0">
                        {formData.image ? (
                          <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="text-center p-2 text-zinc-600">
                            <ImageIcon className="h-6 w-6 mx-auto mb-1 opacity-50" />
                            <span className="text-[10px] font-mono">Sin imagen</span>
                          </div>
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
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>Subir desde mi computadora</span>
                        </button>

                        {formData.image && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                            className="ml-2 inline-flex items-center gap-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium text-red-400 hover:bg-zinc-800 cursor-pointer"
                          >
                            Quitar imagen
                          </button>
                        )}
                        <p className="text-[11px] text-zinc-500 font-light">
                          Selecciona una captura o mockup de tu proyecto (.png, .jpg o .webp).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Campos básicos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Título del Proyecto *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ej: Plataforma E-Commerce"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Categoría</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Ej: Full Stack / Backend / Mobile"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Tagline o Subtítulo corto</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Ej: Sistema web con sincronización de inventario en tiempo real"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Descripción Breve (se muestra en la tarjeta)</label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Resumen conciso del objetivo y resultado del proyecto..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Descripción Detallada (al expandir el acordeón)</label>
                    <textarea
                      rows={3}
                      value={formData.detailedDescription}
                      onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                      placeholder="Explica la arquitectura, cómo lo construiste, desafíos y resultados..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Tecnologías (separadas por coma)</label>
                      <input
                        type="text"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        placeholder="React, Node.js, Express, PostgreSQL"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Estado</label>
                      <select
                        value={formData.status}
                        onChange={(e) => {
                          const val = e.target.value;
                          let type = 'production';
                          if (val === 'Beta') type = 'beta';
                          if (val === 'Académico') type = 'academic';
                          if (val === 'Completado') type = 'completed';
                          setFormData({ ...formData, status: val, statusType: type });
                        }}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="En Producción">En Producción</option>
                        <option value="Completado">Completado</option>
                        <option value="Beta">Beta</option>
                        <option value="Académico">Académico</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Puntos Destacados (uno por línea)</label>
                    <textarea
                      rows={3}
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                      placeholder="Punto 1&#10;Punto 2&#10;Punto 3"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Enlace a Demo / Sitio Web</label>
                      <input
                        type="url"
                        value={formData.demoUrl}
                        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Enlace a Repositorio GitHub</label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Checkbox Proyecto Insignia */}
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">Marcar como Proyecto Insignia (Destacado)</p>
                      <p className="text-[11px] text-zinc-400 font-light">Se mostrará en el banner principal superior de la sección de proyectos.</p>
                    </div>
                  </label>

                  {/* Botones de acción del formulario */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setActiveView('list')}
                      className="px-4 py-2.5 rounded-xl border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingId ? 'Guardar Cambios' : 'Publicar Proyecto'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* VISTA 3: SEGURIDAD (CAMBIO DE CONTRASEÑA) */}
              {activeView === 'settings' && (
                <div className="pt-6 max-w-md mx-auto space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Key className="h-4 w-4 text-blue-400" />
                    Cambiar Contraseña de Administrador
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Actualiza la clave para ingresar a este panel de administración.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPwdMsg('');
                      const res = changePassword(currentPwd, newPwd);
                      setPwdMsg(res.message);
                      if (res.success) {
                        setCurrentPwd('');
                        setNewPwd('');
                        showNotification('Contraseña cambiada');
                      }
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Contraseña Actual</label>
                      <input
                        type="password"
                        required
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Nueva Contraseña</label>
                      <input
                        type="password"
                        required
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {pwdMsg && (
                      <p className="text-xs text-blue-400 font-mono">{pwdMsg}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer"
                    >
                      Actualizar Contraseña
                    </button>
                  </form>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
