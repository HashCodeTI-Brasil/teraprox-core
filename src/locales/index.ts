/**
 * 🌐 i18n Locale Loader
 *
 * Carrega todos os arquivos de locales de forma organizada.
 * Usado por Redux slice e componentes via useTranslate hook.
 */

const locales = {
  'pt-BR': require('./pt-BR.json'),
  'en': require('./en.json'),
}

export function getLocale(code: string) {
  return locales[code] || locales['pt-BR'] // fallback to Portuguese
}

export function getAvailableLocales() {
  return Object.keys(locales)
}

export default locales
