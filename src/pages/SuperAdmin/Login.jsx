import { useState } from "react";

export default function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const res = await fetch("http://localhost:9000/api/superadmin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pwd }),
        credentials: "include", // si tu poses un cookie httpOnly côté API
      });
      if (!res.ok) throw new Error(`Login échoué (${res.status})`);
      const data = await res.json(); // si tu renvoies un token tu peux le stocker ici
      // TODO: stocker token/jwt (localStorage) ou s'appuyer sur cookie httpOnly
      // puis rediriger vers /__superadmin (dashboard prochainement)
      window.location.href = "/__superadmin"; // placeholder
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-50">
      <div className="container-max py-20 grid place-items-center">
        <form onSubmit={onSubmit} className="card w-full max-w-md">
          <h1 className="text-2xl font-bold">Connexion Super Admin</h1>
          <p className="text-sm text-slate-600 mt-1">
            Accès réservé. Cette page n’est pas listée dans la navigation publique.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)}
                     type="email" required
                     className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <input value={pwd} onChange={e=>setPwd(e.target.value)}
                     type="password" required
                     className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"/>
            </div>
          </div>

          {err && <p className="text-sm text-red-600 mt-3">{err}</p>}

          <button disabled={loading}
                  className="btn-primary w-full justify-center mt-6">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
