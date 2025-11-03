// src/components/layout/Footer.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Mail,
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { tenant } from "../../tenant";

const tokens = {
  surface: "bg-white",
  border: "border-slate-200",
  brandBox:
    "h-10 w-10 rounded-xl grid place-items-center font-bold text-white bg-gradient-to-br from-sky-600 to-indigo-600",
  link: "text-slate-700 hover:text-slate-900 hover:underline underline-offset-4",
  badge:
    "inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs text-orange-700",
};

function homeHash(hash) {
  return `/#${hash.replace(/^#/, "")}`;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const loc = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const go = (hash) => {
    if (loc.pathname !== "/") {
      navigate(homeHash(hash));
      return;
    }
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.history?.replaceState) window.history.replaceState({}, "", `#${hash}`);
  };

  const submit = (e) => {
    e.preventDefault();
    
    alert(`Merci ! Nous vous tiendrons informé(e) à ${email}.`);
    setEmail("");
  };

  return (
    <footer className={`${tokens.surface} border-t ${tokens.border}`}>
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className={tokens.brandBox}>M</div>
              <span className="text-lg font-semibold text-slate-900">
                MedFlow{tenant ? ` · ${tenant}` : ""}
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              La plateforme clinique moderne : rendez-vous, dossiers, facturation
              et <span className="font-medium text-slate-700"> assistant IA de pré-diagnostic </span>
              pour préparer la consultation.
            </p>

            <div className="mt-4">
              <span className={tokens.badge}>
                <ShieldCheck className="h-3.5 w-3.5" />
                Bêta publique — Gratuit
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <a className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-sky-50"
                 href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-sky-50"
                 href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-sky-50"
                 href="https://github.com/Mondherlol/MefFlow" target="_blank" rel="noreferrer">
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Produit</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><button onClick={() => go("features")} className={tokens.link}>Fonctionnalités</button></li>
              <li><button onClick={() => go("demos")} className={tokens.link}>Démonstrations</button></li>
              <li><button onClick={() => go("avis")} className={tokens.link}>Les avis</button></li>
              <li><button onClick={() => go("tarifs")} className={tokens.link}>Tarifs</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Ressources</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/docs" className={tokens.link}>Documentation</Link></li>
              <li><Link to="/security" className={tokens.link}>Sécurité & RGPD</Link></li>
              <li><Link to="/status" className={tokens.link}>État du service</Link></li>
              <li><Link to="/api" className={tokens.link}>API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Rester informé</h4>
            <p className="mt-3 text-sm text-slate-600">
              Rejoignez la liste d’attente et recevez les nouveautés produit.
            </p>
            <form onSubmit={submit} className="mt-3 flex rounded-xl border border-slate-300 bg-white p-1 focus-within:ring-2 focus-within:ring-sky-200">
              <div className="flex items-center px-2 text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="min-w-0 flex-1 rounded-xl px-2 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                S’inscrire
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-500">
              Pas de spam. Désinscription en 1 clic.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-6 text-sm text-slate-600 md:flex-row md:justify-between">
          <p>© {year} MedFlow. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/legal/cgu" className={tokens.link}>Conditions</Link>
            <Link to="/legal/privacy" className={tokens.link}>Confidentialité</Link>
            <Link to="/contact" className={tokens.link}>Contact</Link>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Bêta publique
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
