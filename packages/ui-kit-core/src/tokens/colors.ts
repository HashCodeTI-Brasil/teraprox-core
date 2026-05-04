// Teraprox Design Tokens — Colors
//
// Fonte única de verdade para a paleta visual do ecossistema.
// Extraído da auditoria 2026-05-02 (wiki/arquitetura/ui-kit-core-brand-audit.md):
// - Acento azul Tailwind (#3b82f6 / #2563eb) já em uso nos componentes atuais
// - Slate Tailwind (50-950) como neutros
// - Semânticos Tailwind: success #22c55e, warning #f97316, error #ef4444, info #3b82f6
// - Paleta flat-UI legada (#1abc9c, #e74c3c, etc.) NÃO é replicada aqui — será
//   substituída ao migrar componentes legacy em sprint dedicada.
//
// SEGUNDA ONDA (não emitida nesta sprint): exposição via CSS vars `:root{}` em
// `dist/index.css` — para consumo fora do Tailwind (e-mails, landing estática,
// Flutter web embed). Documentar em decision-log quando implementado.
//
// IMPORTANTE: nenhum valor é "definitivo" do ponto de vista de marca; a paleta
// brand abaixo usa o azul atual como primário até o user fornecer guia oficial.

export const colors = {
  brand: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryActive: '#1e40af',
    primaryMuted: '#dbeafe',
    primaryForeground: '#ffffff',
    accent: '#3b82f6',
  },

  semantic: {
    success: '#22c55e',
    successMuted: '#dcfce7',
    successForeground: '#14532d',
    warning: '#f97316',
    warningMuted: '#ffedd5',
    warningForeground: '#7c2d12',
    error: '#ef4444',
    errorHover: '#dc2626',
    errorMuted: '#fee2e2',
    errorForeground: '#7f1d1d',
    info: '#3b82f6',
    infoMuted: '#dbeafe',
    infoForeground: '#1e3a8a',
  },

  // Escala neutra — slate Tailwind. Cobre todos os hex avulsos encontrados nos
  // componentes (#0f172a, #1e293b, #334155, #64748b, #94a3b8, #cbd5e1, #e2e8f0,
  // #f1f5f9, #f8fafc).
  neutral: {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
    1000: '#000000',
  },

  // Tokens semânticos de superfície — referem-se a roles, não a cores cruas.
  // O dark mode (segunda onda) sobrescreverá estes valores via CSS vars.
  surface: {
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f8fafc',
    mutedForeground: '#64748b',
    subtle: '#f1f5f9',
    border: '#e2e8f0',
    borderStrong: '#cbd5e1',
    ring: '#3b82f6',
    overlay: 'rgba(15, 23, 42, 0.6)',
  },
} as const

export type ColorTokens = typeof colors
