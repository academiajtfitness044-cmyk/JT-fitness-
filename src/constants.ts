export const ADMIN_EMAILS = [
  "academiajtfitness044@gmail.com",
  "personaljoana.maia@gmail.com",
  "personaljoanamaia@gmail.com",
  "joanamaia.personal@gmail.com",
  "joana.maia.personal@gmail.com",
  "joanamaia@gmail.com",
  "benficafitness.app@gmail.com",
];

function normalizeGmail(email: string): string {
  const clean = email.toLowerCase().trim();
  if (!clean.includes("@")) return clean;
  const [userPart, domainPart] = clean.split("@");
  if (domainPart === "gmail.com" || domainPart === "googlemail.com") {
    return `${userPart.replace(/\./g, "")}@gmail.com`;
  }
  return clean;
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  if (!clean) return false;

  // 1. Any email containing joana & maia is ALWAYS an admin!
  if (clean.includes("joana") && clean.includes("maia")) return true;

  // 2. Any email containing academiajt or benficafitness is ALWAYS an admin!
  if (clean.includes("academiajt") || clean.includes("benficafitness")) return true;

  // 3. Exact or dot-normalized match with ADMIN_EMAILS
  const normalizedInput = normalizeGmail(clean);
  for (const adm of ADMIN_EMAILS) {
    const cleanAdm = adm.toLowerCase().trim();
    if (clean === cleanAdm) return true;
    if (normalizeGmail(cleanAdm) === normalizedInput) return true;
  }

  return false;
}

export function getAdminDisplayName(email?: string | null, fallbackName?: string): { fullName: string; displayName: string } {
  const clean = (email || "").toLowerCase().trim();
  if (clean.includes("joana") || clean.includes("maia")) {
    return {
      fullName: fallbackName && fallbackName !== "Aluno JT Fitness" ? fallbackName : "Personal Joana Maia (ADM)",
      displayName: fallbackName && fallbackName !== "Aluno JT Fitness" ? fallbackName : "Personal Joana Maia (ADM)"
    };
  }
  return {
    fullName: fallbackName && fallbackName !== "Aluno JT Fitness" ? fallbackName : "Academia JT Fitness (ADM)",
    displayName: fallbackName && fallbackName !== "Aluno JT Fitness" ? fallbackName : "Coach JT Fitness (ADM)"
  };
}
