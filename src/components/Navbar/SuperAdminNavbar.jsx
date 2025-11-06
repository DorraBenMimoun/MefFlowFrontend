// src/components/layout/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/authContext";

const tokens = {
  header: "bg-white/80 backdrop-blur border-b border-slate-200",
  brandBox:
    "h-9 w-9 rounded-xl grid place-items-center font-bold text-white bg-gradient-to-br from-sky-600 to-indigo-600",
  link:
    "px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-sky-50 transition",
  linkActive:
    "px-3 py-2 rounded-lg text-slate-900 bg-sky-50 ring-1 ring-sky-100",
  cta: "rounded-xl px-4 py-2 text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm",
};


export default function SuperNavbar() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const [activeLink, setActiveLink] = useState((loc.pathname || "").replace("#", ""));

  const items = [
    { label: "Dashboard", link: "__superadmin/dashboard" }
  ];

  const go = (link) => {
    navigate(link);
    setActiveLink(link);
    setOpen(false);
  };
  
  const handleLogout = async () => {
    await logout();
    navigate("/__superadmin/login", { replace: true });
  };

  return (
    <header className={`sticky top-0 z-40 ${tokens.header}`}>
      <div className="container-max mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className={tokens.brandBox}>M</div>
          <span className="font-semibold text-lg text-slate-900">
            MedFlow
          </span>
        </Link>

        {/* Desktop nav */}

          <nav className="hidden items-center gap-1 sm:flex">
            {items.map((it) => (
              <button
                key={it.link}
                onClick={() => go(it.link)}
                className={
                  activeLink === it.link ? tokens.linkActive : tokens.link
                }
              >
                {it.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className={`${tokens.cta} ml-2 justify-center flex items-center cursor-pointer`}
            >
              <LogOut className="inline-block h-4 w-4 mr-1" />
              Déconnexion
            </button>
          </nav>

        {/* Burger mobile */}
          <button
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-sky-50"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

      </div>

      {/* Mobile sheet */}
        <div
          className={`sm:hidden transition-[max-height] duration-300 overflow-hidden ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {items.map((it) => (
              <button
                key={it.link}
                onClick={() => go(it.link)}
                className={`block w-full text-left ${tokens.link}`}
              >
                {it.label}
              </button>
            ))}
            <div className="p-2 flex-row justify-center flex items-center cursor-pointer">
              <button
                onClick={handleLogout}
                className="flex justify-center flex-row items-center  w-full text-center rounded-xl px-4 py-2 text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm"
              >
                <LogOut className="inline-block h-4 w-4 mr-1" />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
    </header>
  );
}
