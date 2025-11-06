// src/components/clinicRequest/ClinicInfoStep.jsx
import { useState } from "react";
import { 
  Building2, 
  Upload, 
  CheckCircle2, 
  Camera, 
  PenLine,
  MapPin,
  CircleAlert,
  LoaderCircle
} from "lucide-react";
import Select from "react-select";

const ClinicInfoStep = ({ 
  register, 
  errors, 
  trigger, 
  watch, 
  setValue, 
  clearErrors, 
  selectedCountry, 
  setSelectedCountry,
  logoPreview,
  handleLogoChange,
  checkingSlug,
  slugAvailable,
  customSelectStyles,
  countryOptions,
  tokens 
}) => {
  const clinicName = watch("clinicName");
  const slug = clinicName ? clinicName.toLowerCase().replace(/\s+/g, "-") : "";

  return (
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
            <div className="relative flex items-center">
              <input
                {...register("clinicName", { required: "Le nom de la clinique est requis" })}
                id="clinicName"
                type="text"
                placeholder="Ex: Clinique Guéridon"
                className={`${tokens.input} ${tokens.focus} ${errors.clinicName ? "border-red-300" : ""}`}
              />
              
              {/* Icône dynamique */}
              <div className="absolute right-3">
                {checkingSlug && slug && slug.length >= 2 ? (
                  <div className="animate-spin">
                    <LoaderCircle className="h-5 w-5 text-slate-400" />
                  </div>
                ) : slugAvailable && slug && slug.length >= 2 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : slug && slug.length >= 2 ? (
                  <CircleAlert className="h-5 w-5 text-red-500" />
                ) : null} 
              </div>
            </div>

            {/* Message d'erreur ou validation */}
            {slug && !checkingSlug && slug.length >= 2 && !slugAvailable ? (
              <p className="text-xs text-red-500 mt-1">
                Ce nom de clinique est déjà utilisé. Veuillez en choisir un autre.
              </p>
            ) : slug && !checkingSlug && slug.length >= 2 && slugAvailable ? (
              <p className="text-xs text-green-500 mt-1">
                Ce nom de clinique est disponible !
              </p> 
            ) : 
            checkingSlug ? (
              <p className="text-xs text-slate-500 mt-1">
                Vérification de la disponibilité...
              </p>
            ) : null
            }

            { errors.clinicName && (
              <p className="text-xs text-red-500 mt-1">{errors.clinicName.message}</p>
            ) }

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
                        clearErrors("country");
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
  );
};

export default ClinicInfoStep;