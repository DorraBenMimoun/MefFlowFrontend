import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, Globe, Mail, Phone, Link as LinkIcon } from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Badge from "../../components/SuperAdmin/Dashboard/Badge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ClinicInfos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clinic, setClinic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        api
            .get(`/api/clinics/${id}/`)
            .then((response) => {
                if (!mounted) return;
                const payload = response.data && response.data.data ? response.data.data : response.data;
                setClinic(payload || null);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Impossible de récupérer les informations de la clinique.");
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });
        return () => { mounted = false; };
    }, [id]);

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 w-1/3 bg-gray-200 rounded" />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-40 bg-gray-200 rounded" />
                        <div className="h-40 bg-gray-200 rounded col-span-2" />
                    </div>
                </div>
            </div>
        );
    }

    if (!clinic) {
        return (
            <div className="p-6">
                <button onClick={() => navigate("/__superadmin/dashboard")} className="text-sm text-slate-600 underline">← Retour</button>
                <div className="mt-6 text-slate-600">Aucune information disponible pour cette clinique.</div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Back button top-left */}
                <div className="mb-4">
                    <button onClick={() => navigate("/__superadmin/dashboard")} className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-white hover:bg-orange-600 border border-orange-600 px-3 py-1.5 rounded-md transition">
                        ← Retour
                    </button>
                </div>

                <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center">
                        {clinic.logo_url ? (
                            <img src={`${API_URL}${clinic.logo_url}`} alt={`${clinic.name} logo`} className="h-full w-full object-cover" />
                        ) : (
                            <Building2 className="h-8 w-8 text-slate-400" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">{clinic.name}</h1>
                        <div className="mt-1 flex items-center gap-2">
                            <Badge color={clinic.is_active ? 'green' : 'gray'}>{clinic.is_active ? 'Active' : 'En pause'}</Badge>
                            <span className="text-sm text-slate-500">{clinic.slug}</span>
                        </div>
                    </div>
                </div>
                {/* header actions placeholder (kept empty for now) */}
                <div className="flex items-center gap-2" />
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-medium text-slate-800 mb-4">Informations</h2>

                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                            <div>
                                <div className="text-slate-500 text-xs">Adresse</div>
                                <div className="mt-1">{clinic.address || '—'}</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-xs">Ville / Pays</div>
                                <div className="mt-1">{[clinic.city, clinic.country].filter(Boolean).join(' / ') || '—'}</div>
                            </div>

                            <div>
                                <div className="text-slate-500 text-xs">Téléphone</div>
                                <div className="mt-1 flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" />{clinic.phone || '—'}</div>
                            </div>

                            <div>
                                <div className="text-slate-500 text-xs">Email</div>
                                <div className="mt-1 flex items-center gap-2"><Mail className="h-4 w-4 text-slate-400" />{clinic.email || '—'}</div>
                            </div>

                            <div>
                                <div className="text-slate-500 text-xs">Site web</div>
                                <div className="mt-1 flex items-center gap-2"><LinkIcon className="h-4 w-4 text-slate-400" />{clinic.slug}.medflow.tn</div>
                            </div>

                            <div>
                                <div className="text-slate-500 text-xs">Utilisateurs</div>
                                <div className="mt-1">{clinic.users ?? 0}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-slate-800 mb-2">Services</h3>
                                    {clinic.services && clinic.services.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {clinic.services.map((s, i) => (
                                                <span key={i} className="px-2 py-1 bg-sky-100 text-sky-700 rounded">{s}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-500">Aucun service renseigné</div>
                                    )}
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-slate-800 mb-2">Spécialités</h3>
                                    {clinic.specialites && clinic.specialites.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {clinic.specialites.map((s, i) => (
                                                <span key={i} className="px-2 py-1 bg-sky-100 text-sky-700 rounded">{s}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-500">Aucune spécialité renseignée</div>
                                    )}
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                            <h4 className="text-sm font-medium text-slate-800 mb-3">Galerie</h4>
                            {clinic.images_urls && clinic.images_urls.length > 0 ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {clinic.images_urls.map((src, i) => (
                                        <img key={i} src={`${API_URL}${src}`} alt={`img-${i}`} className="h-24 w-full object-cover rounded" />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-sm text-slate-500">Aucune image</div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                            <h4 className="text-sm font-medium text-slate-800 mb-3">Documents & logos</h4>
                            <div className="flex gap-3 items-center">
                                {clinic.logo_url ? (
                                    <img src={`${API_URL}${clinic.logo_url}`} alt="logo" className="h-20 w-20 object-cover rounded" />
                                ) : (
                                    <div className="h-20 w-20 bg-slate-100 rounded flex items-center justify-center"><Building2 className="h-6 w-6 text-slate-400" /></div>
                                )}
                                <div className="text-sm text-slate-500">Aucun document supplémentaire</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                            <h4 className="text-sm font-medium text-slate-800 mb-2">Admins</h4>
                            <div className="text-sm text-slate-600">Liste des administrateurs </div>
                            <ul className="mt-3 space-y-2">
                                <li className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Admin Principal</div>
                                        <div className="text-xs text-slate-500">admin@example.com</div>
                                    </div>
                                    <button className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded">Voir</button>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Admin 2</div>
                                        <div className="text-xs text-slate-500">admin2@example.com</div>
                                    </div>
                                    <button className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded">Voir</button>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                            <h4 className="text-sm font-medium text-slate-800 mb-2">Réceptionnistes</h4>
                            <div className="text-sm text-slate-600">Liste des réceptionnistes</div>
                            <ul className="mt-3 space-y-2">
                                <li className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Reception 1</div>
                                        <div className="text-xs text-slate-500">reception@example.com</div>
                                    </div>
                                    <button className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded">Voir</button>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                            <h4 className="text-sm font-medium text-slate-800 mb-2">Utilisateurs</h4>
                            <div className="text-sm text-slate-600">Total utilisateurs: <span className="font-medium">{clinic.users ?? 0}</span></div>
                            <div className="mt-3 text-sm text-slate-500">Aperçu rapide des utilisateurs (statique)</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ClinicInfos;