import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
export default function Toast({ toast, onClose }) {
  useEffect(() => { if (!toast) return; const t = setTimeout(onClose, 3600); return () => clearTimeout(t); }, [toast, onClose]);
  if (!toast) return null;
  return <div className={`toast ${toast.type || 'success'}`}><span>{toast.type === 'error' ? <AlertCircle size={18}/> : <CheckCircle2 size={18}/>}</span><p>{toast.message}</p><button onClick={onClose} aria-label="Close"><X size={16}/></button></div>;
}
