import type { Language } from './i18n-types';

const translationsCache = new Map<Language, Record<string, string>>();
let loadPromise: Promise<void> | null = null;

async function ensureLoaded() {
    if (!loadPromise) {
        loadPromise = import('./i18n-translations').then((mod) => {
            const { translations } = mod;
            (Object.keys(translations) as Language[]).forEach((lang) => {
                translationsCache.set(lang, translations[lang]);
            });
        });
    }
    await loadPromise;
}

export async function loadTranslations(lang: Language): Promise<Record<string, string>> {
    await ensureLoaded();
    return translationsCache.get(lang) || translationsCache.get('en') || {};
}

export async function getTranslations(lang: Language): Promise<Record<string, string>> {
    return loadTranslations(lang);
}

export function getTranslationsSync(lang: Language): Record<string, string> {
    return translationsCache.get(lang) || translationsCache.get('en') || {};
}
