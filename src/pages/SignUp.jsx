// src/pages/StartClinic.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Building2, 
  Mail, 
  Phone, 
  Upload, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Edit2, 
  MapPin, 
  Globe, 
  UserRound,
  Camera, 
  BookUser,
  Pen,
  PenLine
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import countryList from "country-list";

/* ---------- Configuration des pays ---------- */
// Formatage des pays pour react-select
const countryOptions = getCountries().map(countryCode => {
  const countryName = countryList.getName(countryCode) || countryCode;
  return {
    value: countryCode,
    label: `${countryName}`,
    countryCode,
    callingCode: `+${getCountryCallingCode(countryCode)}`
  };
}).sort((a, b) => a.label.localeCompare(b.label));

// Style personnalisé pour react-select pour matcher votre thème
const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    height: '48px',
    borderRadius: '12px',
    border: state.isFocused ? '2px solid #fb923c' : '1px solid #cbd5e1',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(251, 146, 60, 0.1)' : 'none',
    '&:hover': {
      border: '1px solid #94a3b8'
    }
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#fb923c' : state.isFocused ? '#fed7aa' : 'white',
    color: state.isSelected ? 'white' : '#1e293b',
    '&:active': {
      backgroundColor: '#fdba74'
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    overflow: 'hidden'
  })
};

/* ---------- Tokens (thème bleu/orange) ---------- */
const tokens = {
  page: "bg-gradient-to-b from-sky-50 via-white to-white text-slate-800 min-h-screen",
  border: "border-slate-200",
  card: "rounded-2xl border border-slate-200 bg-white shadow-sm",
  cardHover: "transition-all duration-300 hover:shadow-lg",
  brandGrad: "bg-gradient-to-r from-sky-600 to-indigo-600",
  orangeBtn: "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300",
  blueBtn: "bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg transition-all duration-300",
  outlineBtn: "border-2 border-slate-300 hover:bg-slate-50 text-slate-700 transition-all duration-300",
  focus: "focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400",
  input: "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition-all duration-200",
  iconInput: "w-12 mt-6 h-12 grid place-items-center bg-sky-100 text-sky-700 rounded-xl border border-slate-200 flex-shrink-0",
  circleStep: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300",
  stepperText: "font-semibold text-slate-700 text-sm mt-2 text-center",
};

export default function StartClinic() {
  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [phoneValue, setPhoneValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const onSubmit = (data) => {
    console.log({
      ...data,
      phoneNumber: phoneValue,
      country: selectedCountry?.value
    });
    setSubmitted(true);
  };

  // Register the country field because it's controlled via react-select and setValue
  useEffect(() => {
    register("country", { required: "Le pays est requis" });
  }, [register]);

  const clinicName = watch("clinicName");
  const slug = clinicName ? clinicName.toLowerCase().replace(/\s+/g, "-") : "";

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };


  const handleNext = async () => {
    // Validate required fields of step 0 before moving to step 1
    if (step === 0) {
      const valid = await trigger(["clinicName", "country", "city", "address"]);
      if (!valid) return;
    }

    if (step < 1) {
      setStep(step + 1);
      // Scroll to top when changing step
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <main className={tokens.page}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 -mt-8">


        {/* Stepper amélioré */}
        <div className="mb-12">
          <div className="flex justify-center items-center gap-8">
            {[0, 1].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`${tokens.circleStep} ${
                    step >= index 
                      ? "bg-orange-500 text-white shadow-md" 
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > index ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                </div>
                <div className={`${tokens.stepperText} ${
                  step >= index ? "text-orange-600" : "text-slate-500"
                }`}>
                  {index === 0 ? "Informations Clinique" : "Vos Informations"}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div 
              className="absolute inset-0 flex items-center transition-all duration-500"
              style={{ width: step >= 1 ? '100%' : '50%' }}
            >
              <div className="w-full border-t-2 border-orange-500"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulaire principal */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              {/* Étape 1 - Informations de la clinique */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Informations de la clinique</h2>
                      <p className="text-slate-600 text-sm">Les informations principales de votre établissement</p>
                    </div>
                  </div>

                  {/* Nom de la clinique avec slug */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className={tokens.iconInput}>
                        <PenLine className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="clinicName" className="block text-sm font-medium text-slate-700 mb-1">
                          Nom de la clinique *
                        </label>
                        <input
                          {...register("clinicName", { required: "Le nom de la clinique est requis" })}
                          id="clinicName"
                          type="text"
                          placeholder="Ex: Clinique Guéridon"
                          className={`${tokens.input} ${tokens.focus} ${
                            errors.clinicName ? "border-red-300" : ""
                          }`}
                        />
                        {errors.clinicName && (
                          <p className="text-xs text-red-500 mt-1">{errors.clinicName.message}</p>
                        )}
                        
                        {/* Slug en petit à droite */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-500">Votre site sera :</span>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded border text-slate-600">
                            {slug || "votre-clinique"}
                          </code> 
                          <span className="text-xs text-slate-500">.medflow.tn</span>
                        </div>
                      </div>
                    </div>

                    {/* Upload du logo amélioré */}
                    <div className="flex items-start gap-3">
                      <div className={tokens.iconInput}>
                        <Camera className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Logo de la clinique
                          <span className="text-slate-400 font-normal ml-1">(optionnel)</span>
                        </label>
                        
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          {/* Zone de upload */}
                          <label className="flex-1 cursor-pointer">
                            <input
                              {...register("clinicLogo")}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoChange}
                            />
                            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 ${
                              logoPreview ? "border-orange-300 bg-orange-50" : "border-slate-300"
                            }`}>
                              <Upload className={`h-8 w-8 mx-auto mb-2 ${
                                logoPreview ? "text-orange-500" : "text-slate-400"
                              }`} />
                              <p className="text-sm font-medium text-slate-700 mb-1">
                                {logoPreview ? "Logo sélectionné" : "Cliquez pour uploader"}
                              </p>
                              <p className="text-xs text-slate-500">
                                PNG, JPG jusqu'à 10MB
                              </p>
                            </div>
                          </label>

                          {/* Aperçu du logo */}
                          {logoPreview && (
                            <div className="text-center">
                              <p className="text-xs text-slate-600 mb-2">Aperçu :</p>
                              <div className="w-20 h-20 rounded-lg border-2 border-orange-200 overflow-hidden bg-white p-1">
                                <img 
                                  src={logoPreview} 
                                  alt="Aperçu logo" 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Adresse avec pays et ville */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={tokens.iconInput}>
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-slate-700 mb-3">
                            Adresse de la clinique *
                          </label>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            {/* Pays avec liste complète */}
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1">
                                Pays *
                              </label>
                              <Select
                                options={countryOptions}
                                styles={customSelectStyles}
                                placeholder="Sélectionnez un pays"
                                value={selectedCountry}
                                onChange={(selected) => {
                                  setSelectedCountry(selected);
                                  setValue("country", selected?.value);
                                  
                                }}
                                isSearchable
                                noOptionsMessage={() => "Aucun pays trouvé"}
                              />
                              {errors.country && (
                                <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>
                              )}
                            </div>

                            {/* Ville */}
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1">
                                Ville *
                              </label>
                              <input
                                {...register("city", { required: "La ville est requise" })}
                                type="text"
                                placeholder="Ex: Tunis"
                                className={`${tokens.input} ${tokens.focus} ${
                                  errors.city ? "border-red-300" : ""
                                }`}
                              />
                              {errors.city && (
                                <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
                              )}
                            </div>
                          </div>

                          {/* Adresse complète */}
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Adresse complète *
                            </label>
                            <input
                              {...register("address", { required: "L'adresse est requise" })}
                              type="text"
                              placeholder="Ex: 123 Avenue du Parc "
                              className={`${tokens.input} ${tokens.focus} ${
                                errors.address ? "border-red-300" : ""
                              }`}
                            />
                            {errors.address && (
                              <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 2 - Informations admin */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <BookUser className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Vos informations</h2>
                      <p className="text-slate-600 text-sm">Coordonnées pour vous contacter et créer votre compte</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Nom complet */}
                    <div className="flex items-start gap-3">
                      <div className={tokens.iconInput}>
                        <UserRound className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                          Nom complet *
                        </label>
                        <input
                          {...register("fullName", { required: "Le nom complet est requis" })}
                          id="fullName"
                          type="text"
                          placeholder="Ex: Guéridon"
                          className={`${tokens.input} ${tokens.focus} ${
                            errors.fullName ? "border-red-300" : ""
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className={tokens.iconInput}>
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="adminEmail" className="block text-sm font-medium text-slate-700 mb-1">
                          Email professionnel *
                        </label>
                        <input
                          {...register("adminEmail", { 
                            required: "L'email est requis",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Format d'email invalide"
                            }
                          })}
                          id="adminEmail"
                          type="email"
                          placeholder="ex: contact@clinique.com"
                          className={`${tokens.input} ${tokens.focus} ${
                            errors.adminEmail ? "border-red-300" : ""
                          }`}
                        />
                        {errors.adminEmail && (
                          <p className="text-xs text-red-500 mt-1">{errors.adminEmail.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Téléphone avec indicatif international */}
                    <div className="flex items-start gap-3">
                      <div className={tokens.iconInput}>
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Téléphone *
                        </label>
                        <div className={`rounded-xl border border-slate-300 bg-white overflow-hidden transition-all duration-200 ${
                          errors.phoneNumber ? "border-red-300" : ""
                        } ${tokens.focus}`}>
                          <PhoneInput
                            international
                            defaultCountry={selectedCountry ? selectedCountry.countryCode : "TN"}
                            value={phoneValue}
                            onChange={setPhoneValue}
                            placeholder="Entrez votre numéro de téléphone"
                            className="h-12 px-3"
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-1">
                          Format international recommandé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panneau latéral d'information */}
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
        </div>

        {/* Navigation en bas */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 ${
              step === 0 
                ? "text-slate-400 cursor-not-allowed" 
                : `${tokens.outlineBtn}`
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </button>

          {step === 0 ? (
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-medium ${tokens.orangeBtn}`}
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              className={`flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-medium ${tokens.blueBtn}`}
            >
              <CheckCircle2 className="h-4 w-4" />
              Soumettre la demande
            </button>
          )}
        </div>
      </div>
    </main>
  );
}