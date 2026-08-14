import { lldModules } from "@/content/lld";
import { networkingChapters } from "@/content/networking";
import { osChapters } from "@/content/os";

export const patterns = lldModules;
export { networkingChapters, osChapters };

export function getLldModuleBySlug(slug: string) {
  return lldModules.find((m) => m.slug === slug);
}