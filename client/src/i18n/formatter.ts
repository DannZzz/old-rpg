export function convertToCode(lang: string): string {
  const langs: any = {
    us: ["us", "en", "gb", "eng"],
    ru: ["ru", "rus"],
  }

  for (let lng in langs) {
    if (langs[lng].some((lg: any) => lg === lang.toLowerCase())) return lng
  }
  return "en"
}
