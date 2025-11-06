// src/components/clinicRequest/AdminInfoStep.jsx
import { 
  BookUser, 
  UserRound, 
  Mail, 
  Phone 
} from "lucide-react";
import PhoneInput from "react-phone-number-input";

const AdminInfoStep = ({ 
  register, 
  errors, 
  phoneValue, 
  setPhoneValue, 
  selectedCountry,
  tokens 
}) => {
  return (
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
                  value: /^\S+@\S+\.\S+$/,
                  message: "Veuillez entrer une adresse email valide"
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
  );
};

export default AdminInfoStep;