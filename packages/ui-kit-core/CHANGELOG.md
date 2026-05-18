# Changelog — @hashcodeti/ui-kit-core

Formato: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Semver 0.x.

## 0.2.0 — 2026-05-11

### Added — Primitivos L1 (Fase 2 Batch 1)

Novos primitivos Tailwind + Radix em `src/primitives/`, exportados via barrel raiz:

- **`<Button />`** — `src/primitives/Button/`
  - 9 variants solid (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`)
  - 6 variants outline (`outline-primary`, `outline-secondary`, `outline-success`, `outline-danger`, `outline-warning`, `outline-info`)
  - 3 sizes (`sm`, `md`, `lg`)
  - Props extras: `loading` (spinner inline), `asChild` (Radix Slot), `leftIcon`, `rightIcon`, `fullWidth`
  - **API parity com `react-bootstrap`** Button — codemod futuro será trivial

- **`<Card />`** + `<CardHeader>`, `<CardBody>`, `<CardFooter>` — `src/primitives/Card/`
  - 4 variants (`elevated`, `outlined`, `flat`, `interactive`)
  - 4 paddings (`none`, `sm`, `md`, `lg`)
  - Exports separados (canônico) + atalho compound `Card.Header = CardHeader` (compat ergonômica)

- **`<TextField />`** + `<FieldLabel>`, `<FieldError>`, `<FieldHint>` — `src/primitives/TextField/`
  - 2 variants (`outlined`, `filled`), 3 sizes
  - Props: `label`, `hint`, `error`, `required`, `optional`, `multiline`, `rows`
  - a11y completo: `aria-invalid`, `aria-required`, `aria-describedby` via `useId()`
  - **Substitui o macro-padrão `Form.Group + Label + Control + Text` do bootstrap** (~110 ocorrências cross-MF)

- **`<Modal />`** + `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`, `<ModalDescription>` — `src/primitives/Modal/`
  - Stack: `@radix-ui/react-dialog`
  - 5 sizes (`sm`, `md`, `lg`, `xl`, `full`)
  - Focus trap, escape key, scroll lock, portal, ARIA — tudo de graça via Radix
  - **API diverge intencionalmente do bootstrap** Modal:
    - `show` → `open`
    - `onHide` → `onOpenChange(open: boolean)`
    - `Modal.Header` → `<ModalHeader>` (sub-export, não compound)
    - `closeButton` removido — header sempre tem X, use `hideCloseButton` para esconder
  - Mapping documentado para codemod futuro

- **`cn()`** util — `src/lib/cn.ts`
  - `tailwind-merge` + `clsx` combinados. Padrão Shadcn/Radix moderno.

### Added — Dependencies

- `@radix-ui/react-dialog@^1.1.0` (Modal)
- `@radix-ui/react-slot@^1.1.0` (Button `asChild`)
- `class-variance-authority@^0.7.0` (variants type-safe)
- `clsx@^2.1.0` + `tailwind-merge@^2.5.0` (cn util)

### Unchanged — Composites legados

Os 10 composites atuais (`FormModal`, `FrequenciaFormV2`, `ContadorPicker`, `AnexoManager`, `ClickToWriteField`, `CombineModeToggle`, `ColorPicker`, `FormActionButtons`, `DeleteConfirm`, `IconWithBadge`) **permanecem intocados** em suas pastas atuais (`src/containers/`, `src/frequencia/`, etc.). Sprint Fase 2.3 refatorará cada um para consumir os primitivos novos.

### Unchanged — Shims @deprecated

`./tokens` e `./tailwind-preset` continuam funcionando como re-export de `@hashcodeti/design-tokens` e `@hashcodeti/tailwind-preset` (introduzidos em 0.1.x → Fase 1).

### Bundle impact

- ESM dist `index.mjs`: 46.84 KB → 61.22 KB (+14.38 KB raw, sem gzip)
- **Web-client `next build`: ZERO impacto** — tree-shake elimina primitivos não importados (CSS 18.7 KB · JS 162 KB shared, idênticos ao 0.1.0)
- Consumidores que importarem primitivos pagam o custo proporcional ao uso

### Migration guide

Não é necessário migrar agora — primitivos são aditivos. Quando consumidor quiser usar:

```diff
- import { Button } from 'react-bootstrap'
+ import { Button } from '@hashcodeti/ui-kit-core'
```

Para Modal, a API mudou — usar codemod futuro ou migrar manualmente:

```diff
- <Modal show={show} onHide={() => setShow(false)}>
-   <Modal.Header closeButton>Title</Modal.Header>
-   <Modal.Body>...</Modal.Body>
- </Modal>
+ <Modal open={show} onOpenChange={setShow}>
+   <ModalHeader>Title</ModalHeader>
+   <ModalBody>...</ModalBody>
+ </Modal>
```

---

## 0.1.0 — 2026-05-02 a 2026-05-11

### Foundation (Fase 1)

- Pacote criado contendo composites cross-domain (Wave 0 → Wave 5 sprints SGM/SGP)
- Tokens TS em `src/tokens/` (colors, typography, spacing, radii, shadows, breakpoints) — 2026-05-02
- Preset Tailwind em `src/tailwind.preset.ts` consumido pelo web-client — 2026-05-02
- 10 composites PURE: `FormModal`, `FrequenciaFormV2`, `ContadorPicker`, `AnexoManager`, `ClickToWriteField`, `CombineModeToggle`, `ColorPicker`, `FormActionButtons`, `DeleteConfirm`, `IconWithBadge`
- **2026-05-11 (Fase 1):** Tokens extraídos para `@hashcodeti/design-tokens@1.0.0`; Preset extraído para `@hashcodeti/tailwind-preset@1.0.0`. Subpaths `./tokens` e `./tailwind-preset` reduzidos a shims `@deprecated`. Arquivos legados deletados (6).
- HF-001: `react-bootstrap` peer dep `>=2.0.0` → `^2.0.0` (teto superior `<3.0.0`)
