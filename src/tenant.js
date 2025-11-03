export function getSubdomain(hostname = window.location.hostname) {
  // ex: "clinique1.medflow.com" -> "clinique1"
  // lvh.me trick: "clinique1.lvh.me"
  const parts = hostname.split(".");
  if (parts.length < 3) return null; // ex: localhost / medflow.com
  return parts[0]; // "clinique1"
}

export const tenant = getSubdomain();
