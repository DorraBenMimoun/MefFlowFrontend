// src/components/clinicRequest/InfoSidebar.jsx
import { CheckCircle2, Globe, Phone } from "lucide-react";

const InfoSidebar = ({ tokens }) => {
  return (
    <div className="lg:w-80">
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-100 p-6 sticky top-6">
        <h3 className="font-semibold text-slate-800 text-lg mb-4">
          Guide de configuration
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-700">Validation rapide</p>
              <p className="text-xs text-slate-600">Votre clinique sera activé sous 24h</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-700">Support international</p>
              <p className="text-xs text-slate-600">Tous les pays et indicatifs supportés</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-sky-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-700">Support dédié</p>
              <p className="text-xs text-slate-600">Notre équipe vous accompagne</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-sky-200">
          <p className="text-xs text-slate-600">
            <strong>Astuce :</strong> Utilisez un logo carré pour un meilleur rendu. Taille recommandée : 256x256 pixels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar;