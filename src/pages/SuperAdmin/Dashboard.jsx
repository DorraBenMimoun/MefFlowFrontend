// src/pages/superadmin/Dashboard.jsx
import { useMemo, useState } from "react";
import {
  Building2,
  UsersRound,
  Activity,
  CheckCircle2,
  Clock,
  Globe,
  ShieldCheck,
  Ban,
  PlayCircle,
} from "lucide-react";
import { useAuth } from "../../context/authContext";


import StatCard from "../../components/SuperAdmin/Dashboard/StatCard";
import Button from "../../components/SuperAdmin/Dashboard/Button";
import ClinicRequestsList from "../../components/SuperAdmin/Dashboard/ClinicRequestsList";
import ClinicsList from "../../components/SuperAdmin/Dashboard/ClinicsList";

const tokens = {
  page: "bg-gradient-to-b from-sky-50 via-white to-white text-slate-800",
  border: "border-slate-200",
  pill: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs",
  rowHover: "hover:bg-sky-50/60",
  stickyHead: "sticky top-0 z-10 bg-slate-50/95 backdrop-blur",
  focus: "focus:outline-none focus:ring-2 focus:ring-sky-200",
};



const CLINICS = [
  { id: "CL-001", name: "Clinique Azur",    domain: "azur.medflow.tn",    users: 42, status: "active", uptime: "99.96%", lastIncident: "Il y a 21 j", usage: [12, 18, 22, 25, 20, 27, 30, 28] },
  { id: "CL-002", name: "Horizon Médical",  domain: "horizon.medflow.tn", users: 31, status: "active", uptime: "99.91%", lastIncident: "Il y a 34 j", usage: [6, 10, 12, 12, 15, 17, 18, 16] },
  { id: "CL-003", name: "Cardio+",          domain: "cardioplus.medflow.tn", users: 19, status: "paused", uptime: "99.88%", lastIncident: "Il y a 12 j", usage: [2, 4, 5, 7, 6, 5, 4, 3] },
];


export default function SuperAdminDashboard() {

  return (
    <main className={`min-h-screen ${tokens.page}`}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-800">
              <ShieldCheck className="h-3.5 w-3.5" /> Espace Super Admin
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Console de supervision</h1>
            <p className="text-sm text-slate-600">Gérez les cliniques, validez les demandes et suivez l’utilisation.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* <Button variant="orange" className={tokens.focus}>
              Créer une clinique
            </Button> */}
            <Button variant="orange" className={`hidden sm:inline-flex ${tokens.focus}`}>
              <PlayCircle className="h-4 w-4" />
              Démarrer une démo
            </Button>
            <Button variant="outline" className={tokens.focus}>
              <Globe className="h-4 w-4" />
              État global
            </Button>
          </div>
        </div>

        {/* KPI */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Building2 className="h-5 w-5" />} label="Cliniques actives" value="24" sub="+3 ce mois" />
          <StatCard icon={<Clock className="h-5 w-5" />}     label="Demandes en attente" value="44" sub="Réponse moyenne 12h" />
          <StatCard icon={<UsersRound className="h-5 w-5" />} label="Utilisateurs totaux" value="1 124" sub="+86 cette semaine" />
          <StatCard icon={<Activity className="h-5 w-5" />}   label="Disponibilité globale" value="99.93%" sub="30j glissants" />
        </div>

        {/* Demandes de création */}
        <ClinicRequestsList />

        {/* Gestion des cliniques */}
        <ClinicsList tokens={tokens} clinics={CLINICS} />

        {/* Usage par clinique */}
        {/* <Section
          title="Utilisation de l’app par clinique"
          right={<Button variant="ghost" className="text-sm">Voir tout <ArrowUpRight className="h-4 w-4" /></Button>}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {CLINICS.map((c) => (
              <div key={c.id} className={`${tokens.card} ${tokens.cardHover} p-4`}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-100 text-sky-800 ring-1 ring-sky-200">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium leading-tight">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.domain}</div>
                    </div>
                  </div>
                  {c.status === "active" ? <Badge color="green">Active</Badge> : <Badge color="gray">En pause</Badge>}
                </div>

                <UsageChart points={c.usage} className="mt-2" />

                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <UsersRound className="h-4 w-4 text-slate-400" />
                    {c.users} utilisateurs
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-emerald-600" />
                    Uptime {c.uptime}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button variant="subtle" className="px-3 py-1.5 text-xs">Admins</Button>
                  <Button variant="subtle" className="px-3 py-1.5 text-xs">Paramètres</Button>
                </div>
              </div>
            ))}
          </div>
        </Section> */}

        {/* Bandeau bas (actions rapides) */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className={`${tokens.card} ${tokens.cardHover} p-6`}>
            <h3 className="text-base font-semibold">Créer une clinique manuellement</h3>
            <p className="mt-1 text-sm text-slate-600">Renseignez les informations et attribuez un sous-domaine.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="orange" className={tokens.focus}>Nouveau tenant</Button>
              <Button variant="outline" className={tokens.focus}>Voir demandes</Button>
            </div>
          </div>
          <div className={`${tokens.card} ${tokens.cardHover} p-6`}>
            <h3 className="text-base font-semibold">Mettre une clinique en maintenance</h3>
            <p className="mt-1 text-sm text-slate-600">Informer les utilisateurs et geler les actions critiques.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="orange" className={tokens.focus}>
                <Ban className="h-4 w-4" /> Activer maintenance
              </Button>
              <Button variant="outline" className={tokens.focus}>Paramètres</Button>
            </div>
          </div>
        </div>

        {/* Légende JSP on verra plus tard */}
        <div className="mt-8 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Aucune panne detectée durant les 30 derniers jours.
          </p>
        </div>
      </div>
    </main>
  );
}
