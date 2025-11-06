import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Mail, User, Building2 } from 'lucide-react';
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';

export default function SuccessRequest({ setAlreadySubmitted }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const requestData = Cookies.get("clinicRequestData");
    if (requestData) {
      try {
        const parsedData = JSON.parse(requestData);
        setAdminName(parsedData.fullName || "");
        setClinicName(parsedData.clinicName || "");
        setAdminEmail(parsedData.adminEmail || "");
      } catch (e) {
        // malformed cookie – silently ignore
        console.error("Failed to parse clinicRequestData cookie", e);
      }
    }
  }, []);

  const handleNewRequest = () => {
    // Reset flags + cookie and show the form again
    setAlreadySubmitted(false);
    Cookies.remove("clinicRequestSubmitted");
    Cookies.remove("clinicRequestData");
  };

  const handleGoHome = () => {
    // optional: navigate back to home or dashboard
    navigate('/');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-sky-50 via-white to-white">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="flex flex-col md:flex-row">
          {/* Left: success message */}
          <div className="md:w-1/2 p-8 sm:p-10 bg-gradient-to-b from-orange-50 to-white flex flex-col justify-center gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-white/80 shadow-sm">
                <CheckCircle2 className="h-9 w-9 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Demande reçue</h3>
                <p className="mt-1 text-sm text-slate-700">Merci — nous avons bien reçu votre demande.</p>
              </div>
            </div>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              La clinique <span className="font-semibold text-slate-900">{clinicName || '—'}</span> est en cours de validation.
              Vous recevrez un email de confirmation contenant vos identifiants à l'adresse suivante :
            </p>

            <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm max-w-fit break-words">
              <Mail className="h-4 w-4 text-sky-600" />
              <span className="break-all">{adminEmail || 'non renseigné'}</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <button
                onClick={handleNewRequest}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-sm transition"
                aria-label="Nouvelle demande"
              >
                Nouvelle demande
              </button>

              <button
                onClick={handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-sky-50 transition"
                aria-label="Retour à l'accueil"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>

          {/* Right: compact summary */}
          <div className="md:w-1/2 p-6 sm:p-8 bg-sky-50">
            <h4 className="text-sm font-semibold text-sky-700">Récapitulatif</h4>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                <div className="p-2 rounded-md bg-sky-100 text-sky-600">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Clinique</p>
                  <p className="text-sm font-medium text-slate-900">{clinicName || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                <div className="p-2 rounded-md bg-sky-100 text-sky-600">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Administrateur</p>
                  <p className="text-sm font-medium text-slate-900">{adminName || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                <div className="p-2 rounded-md bg-sky-100 text-sky-600">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Email de contact</p>
                  <p className="text-sm font-medium text-slate-900 break-words">{adminEmail || '—'}</p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Nous traitons généralement les demandes sous 24 heures. Si vous n'avez rien reçu, vérifiez vos spams ou contactez le support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}