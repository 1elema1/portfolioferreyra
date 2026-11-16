import { useEffect } from 'react';
import { X, ZoomIn, ExternalLink } from 'lucide-react';

export default function ImageModal({ isOpen, imageUrl, title, onClose, demoUrl }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 text-white">
          <div className="flex items-center gap-2 truncate">
            <ZoomIn className="h-4 w-4 text-accent shrink-0" />
            <h3 className="font-semibold text-sm truncate font-mono">{title}</h3>
          </div>

          <div className="flex items-center gap-2">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <span>Visitar Proyecto</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Cerrar vista ampliada"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Image Content Container */}
        <div className="p-2 sm:p-4 bg-black/60 flex items-center justify-center overflow-auto max-h-[calc(92vh-60px)]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-lg transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
