import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import React__default from 'react';
import { VariantProps } from 'class-variance-authority';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ClassValue } from 'clsx';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { GenericPickerItem, IGenericPickerViewModel } from 'teraprox-core-sdk';

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof buttonVariants> {
    /** Renderiza o filho como o botão (via Radix Slot). Útil para `<Link>`/`<a>`. */
    asChild?: boolean;
    /** Mostra spinner inline e desabilita interação. */
    loading?: boolean;
    /** Ícone antes do conteúdo (lucide, react-icons, etc.). */
    leftIcon?: React.ReactNode;
    /** Ícone após o conteúdo. */
    rightIcon?: React.ReactNode;
}
/**
 * Button — primitivo cross-domain.
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleSave}>Salvar</Button>
 * <Button variant="outline-danger" loading={deleting}>Excluir</Button>
 * <Button asChild><Link to="/foo">Voltar</Link></Button>
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const cardVariants: (props?: ({
    variant?: "elevated" | "outlined" | "flat" | "interactive" | null | undefined;
    padding?: "sm" | "md" | "lg" | "none" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CardVariant = NonNullable<VariantProps<typeof cardVariants>['variant']>;
type CardPadding = NonNullable<VariantProps<typeof cardVariants>['padding']>;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}
declare const CardRoot: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
interface CardSlotProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardHeader: React.ForwardRefExoticComponent<CardSlotProps & React.RefAttributes<HTMLDivElement>>;
declare const CardBody: React.ForwardRefExoticComponent<CardSlotProps & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<CardSlotProps & React.RefAttributes<HTMLDivElement>>;
type CardComponent = typeof CardRoot & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
};
declare const Card: CardComponent;

declare const inputVariants: (props?: ({
    variant?: "outlined" | "filled" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    hasError?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TextFieldVariant = NonNullable<VariantProps<typeof inputVariants>['variant']>;
type TextFieldSize = NonNullable<VariantProps<typeof inputVariants>['size']>;
interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    optional?: boolean;
}
declare const FieldLabel: React.ForwardRefExoticComponent<FieldLabelProps & React.RefAttributes<HTMLLabelElement>>;
interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const FieldError: React.ForwardRefExoticComponent<FieldErrorProps & React.RefAttributes<HTMLParagraphElement>>;
interface FieldHintProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const FieldHint: React.ForwardRefExoticComponent<FieldHintProps & React.RefAttributes<HTMLParagraphElement>>;
interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, Pick<VariantProps<typeof inputVariants>, 'variant' | 'size'> {
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    /** Marca como obrigatório (asterisco no label + `aria-required`). */
    required?: boolean;
    /** Marca como opcional (badge "(opcional)" no label). Ignorado se `required`. */
    optional?: boolean;
    /** Renderiza como `<textarea>`. */
    multiline?: boolean;
    /** Rows do textarea (default 3). Só aplicável quando `multiline`. */
    rows?: number;
    /** Wrapper className (div externo). */
    wrapperClassName?: string;
}
/**
 * TextField — campo de texto unificado.
 *
 * @example
 * <TextField
 *   label="Código do equipamento"
 *   hint="Use o código interno"
 *   required
 *   value={code}
 *   onChange={(e) => setCode(e.target.value)}
 * />
 */
declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;

declare const contentVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ModalSize = NonNullable<VariantProps<typeof contentVariants>['size']>;
interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    size?: ModalSize;
    /** Bloqueia fechamento por click no overlay e ESC. Use para fluxos não-canceláveis. */
    modal?: boolean;
    /** Conteúdo do dialog. Tipicamente `<ModalHeader>` + `<ModalBody>` + `<ModalFooter>`. */
    children: React.ReactNode;
    /** className do <Content> (não do overlay). */
    className?: string;
    /** Esconde o botão X do header. Header próprio pode ser fornecido. */
    hideCloseButton?: boolean;
}
/**
 * Modal — Dialog Radix com slots.
 *
 * @example
 * <Modal open={open} onOpenChange={setOpen} size="md">
 *   <ModalHeader>Nova ordem de serviço</ModalHeader>
 *   <ModalBody><form>...</form></ModalBody>
 *   <ModalFooter>
 *     <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
 *     <Button variant="primary" onClick={handleSave}>Salvar</Button>
 *   </ModalFooter>
 * </Modal>
 */
declare const Modal: React.FC<ModalProps>;
interface ModalSlotProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const ModalHeader: React.ForwardRefExoticComponent<ModalSlotProps & React.RefAttributes<HTMLDivElement>>;
declare const ModalBody: React.ForwardRefExoticComponent<ModalSlotProps & React.RefAttributes<HTMLDivElement>>;
declare const ModalFooter: React.ForwardRefExoticComponent<ModalSlotProps & React.RefAttributes<HTMLDivElement>>;
/**
 * ModalDescription — para conteúdo descritivo curto antes do body.
 * Linka via aria-describedby automaticamente (Radix).
 */
declare const ModalDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

declare const badgeVariants: (props?: ({
    variant?: "solid" | "outline" | "subtle" | null | undefined;
    tone?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "neutral" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    pill?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>;
type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;
interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, Omit<VariantProps<typeof badgeVariants>, 'tone'> {
    /** Tom semântico (cor). Default `neutral`. */
    tone?: BadgeTone;
    /**
     * Alias deprecated de `tone` — mantido para parity com react-bootstrap `bg`.
     * Use `tone` em código novo. Emite `console.warn` em dev.
     * @deprecated Use `tone` instead.
     */
    bg?: BadgeTone;
    /** Habilita botão close (×). Chama `onRemove` no click. */
    removable?: boolean;
    /** Callback do botão close. Só dispara quando `removable`. */
    onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /** Renderiza apenas um ponto colorido + label opcional (variante "status dot"). */
    dot?: boolean;
    /** aria-label opcional — obrigatório se `dot` sem children visível. */
    'aria-label'?: string;
}
/**
 * Badge — primitivo cross-domain.
 *
 * Substitui `Badge` do react-bootstrap. Renderiza `<span>` (inline) por
 * design — pode aparecer dentro de parágrafos, labels, headings sem quebrar
 * layout.
 *
 * @example
 * // Simples
 * <Badge tone="success">Ativo</Badge>
 *
 * @example
 * // Outline
 * <Badge variant="outline" tone="danger">Crítico</Badge>
 *
 * @example
 * // Removível (chip)
 * <Badge tone="info" removable onRemove={() => removeFilter('foo')}>
 *   Filtro: foo
 * </Badge>
 *
 * @example
 * // Status dot
 * <Badge dot tone="success" aria-label="Online">Online</Badge>
 */
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;

declare const statusLightVariants: (props?: ({
    tone?: "primary" | "success" | "danger" | "warning" | "info" | "dark" | "neutral" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "xs" | null | undefined;
    pulse?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type StatusLightTone = NonNullable<VariantProps<typeof statusLightVariants>['tone']>;
type StatusLightSize = NonNullable<VariantProps<typeof statusLightVariants>['size']>;
interface StatusLightProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
    /** Estado binário. Quando `false`, força visual `neutral` (cinza) — parity API legada. Default `false`. */
    active?: boolean;
    /** Tom semântico quando `active=true`. Default `success`. Ignorado quando `active=false`. */
    tone?: StatusLightTone;
    /** Tamanho. Default `md` (16px). */
    size?: StatusLightSize;
    /** Pulse animation. Default `false`. */
    pulse?: boolean;
    /**
     * @deprecated Use `tone` instead. Parity-shim de `teraprox-ui-kit` — emite warn em dev.
     * @hidden
     */
    activeLightColor?: string;
    /**
     * @deprecated Use `tone="neutral"` (default quando `active=false`) instead. Parity-shim.
     * @hidden
     */
    inactiveLightColor?: string;
    /**
     * @deprecated Use `size` variant (xs/sm/md/lg/xl) instead. Aceita number (px) ou string ("20px")
     * e mapeia para variant mais próxima com warn em dev.
     * @hidden
     */
    legacySize?: number | string;
    /** aria-label opcional. Default derivado de `active` ("Ativo" / "Inativo"). */
    'aria-label'?: string;
}
/**
 * StatusLight — bolinha colorida para estados binários (Ativo/Inativo, Online/Offline, etc.).
 *
 * Renderiza `<span>` (inline) — pode aparecer dentro de parágrafos, labels e headings.
 *
 * @example
 * // Simples
 * <StatusLight active />
 *
 * @example
 * // Tom semântico (active=true)
 * <StatusLight active tone="warning" size="lg" />
 *
 * @example
 * // Com pulse (live status)
 * <StatusLight active tone="success" pulse aria-label="Conectado" />
 */
declare const StatusLight: React.ForwardRefExoticComponent<StatusLightProps & React.RefAttributes<HTMLSpanElement>>;

declare const spinnerVariants: (props?: ({
    variant?: "border" | "grow" | null | undefined;
    tone?: "success" | "warning" | "info" | "current" | "error" | "neutral" | "brand" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "xs" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SpinnerVariant = NonNullable<VariantProps<typeof spinnerVariants>['variant']>;
type SpinnerTone = NonNullable<VariantProps<typeof spinnerVariants>['tone']>;
type SpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>['size']>;
interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, VariantProps<typeof spinnerVariants> {
    /**
     * Alias deprecated de `variant` — mantido para parity com react-bootstrap
     * `animation`. Use `variant` em código novo. Emite `console.warn` em dev.
     * @deprecated Use `variant` instead.
     */
    animation?: SpinnerVariant;
    /**
     * Texto sr-only anunciado a leitores de tela. Default `"Carregando..."`.
     * Passe string vazia explícita apenas se houver outro elemento aria-live
     * descrevendo o estado de loading na mesma região.
     */
    srLabel?: string;
}
/**
 * Spinner — primitivo cross-domain.
 *
 * Substitui `Spinner` do react-bootstrap. Renderiza `<span role="status">`
 * com label sr-only para a11y. Por default usa `currentColor` (tom `current`),
 * herdando a cor do contexto pai (útil dentro de Button/Badge/links).
 *
 * @example
 * // Default (border, md, currentColor)
 * <Spinner />
 *
 * @example
 * // Inline em botão danger — herda a cor do texto
 * <button className="text-error">
 *   <Spinner size="sm" /> Excluindo...
 * </button>
 *
 * @example
 * // Tom semântico explícito + label customizado
 * <Spinner tone="brand" size="lg" srLabel="Carregando dados do paciente" />
 *
 * @example
 * // Variante grow (pulse) com tom de sucesso
 * <Spinner variant="grow" tone="success" />
 */
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLSpanElement>>;

type InputGroupSize = 'sm' | 'md' | 'lg';
interface InputGroupContextValue {
    size: InputGroupSize;
}
/**
 * Hook para consumir o contexto do InputGroup pai. Retorna `null` se chamado
 * fora de um `<InputGroup>` — útil para componentes que querem opt-in ao size
 * propagado sem quebrar quando renderizados standalone (ex.: TextField).
 */
declare function useInputGroupContext(): InputGroupContextValue | null;
declare const inputGroupVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type InputGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> & Omit<VariantProps<typeof inputGroupVariants>, 'size'> & {
    /** Tamanho propagado via Context para sub-componentes. Default `md`. */
    size?: InputGroupSize;
};
/**
 * InputGroup — primitivo composto cross-domain.
 *
 * Agrupa um TextField com addons (ícones, texto, botões) com bordas
 * conectadas. Substitui `react-bootstrap` `InputGroup`.
 *
 * @example
 * // Ícone à esquerda
 * <InputGroup>
 *   <InputGroupAddon><FaSearch /></InputGroupAddon>
 *   <TextField placeholder="Buscar..." />
 * </InputGroup>
 *
 * @example
 * // Texto fixo + botão à direita (URL builder)
 * <InputGroup size="lg">
 *   <InputGroupText>https://</InputGroupText>
 *   <TextField defaultValue="meu-site" />
 *   <InputGroupText>.teraprox.com</InputGroupText>
 *   <InputGroupButton>
 *     <Button variant="primary">Salvar</Button>
 *   </InputGroupButton>
 * </InputGroup>
 *
 * @example
 * // Sub-export compound (parity bootstrap)
 * <InputGroup>
 *   <InputGroup.Text>R$</InputGroup.Text>
 *   <TextField type="number" />
 * </InputGroup>
 */
declare const InputGroupRoot: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "size"> & Omit<VariantProps<(props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string>, "size"> & {
    /** Tamanho propagado via Context para sub-componentes. Default `md`. */
    size?: InputGroupSize;
} & React.RefAttributes<HTMLDivElement>>;
interface InputGroupAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Posição do addon — controla apenas o border-radius residual quando o
     * addon é o primeiro/último child. O cálculo principal acontece via
     * selectors do root, então `position` é em geral dispensável.
     */
    position?: 'left' | 'right';
    /**
     * Marca o addon como decorativo — adiciona `aria-hidden="true"`. Use
     * quando o conteúdo é um ícone puramente visual (ex.: lupa de busca).
     * Default `true` (assume ícone decorativo, padrão react-bootstrap).
     */
    decorative?: boolean;
    /** Tamanho explícito (sobrescreve Context). Use só fora de InputGroup. */
    size?: InputGroupSize;
}
/**
 * InputGroupAddon — wrapper genérico para ícones / elementos decorativos.
 *
 * @example
 * <InputGroupAddon><FaSearch /></InputGroupAddon>
 */
declare const InputGroupAddon: React.ForwardRefExoticComponent<InputGroupAddonProps & React.RefAttributes<HTMLSpanElement>>;
interface InputGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Tamanho explícito (sobrescreve Context). */
    size?: InputGroupSize;
}
/**
 * InputGroupText — slot textual fixo (parity com `InputGroup.Text` bootstrap).
 *
 * Renderiza texto não-editável dentro do grupo. Visualmente igual ao addon,
 * mas semanticamente texto (não recebe `aria-hidden`).
 *
 * @example
 * <InputGroup>
 *   <InputGroupText>R$</InputGroupText>
 *   <TextField type="number" />
 *   <InputGroupText>,00</InputGroupText>
 * </InputGroup>
 */
declare const InputGroupText: React.ForwardRefExoticComponent<InputGroupTextProps & React.RefAttributes<HTMLSpanElement>>;
interface InputGroupButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Tamanho explícito (sobrescreve Context). */
    size?: InputGroupSize;
}
/**
 * InputGroupButton — wrapper para um `<Button>` (ou qualquer elemento
 * clicável) dentro do grupo. Não estiliza o filho — apenas garante shrink-0
 * e marca o slot. Use o Button do ui-kit-core como filho.
 *
 * @example
 * <InputGroup>
 *   <TextField placeholder="cupom" />
 *   <InputGroupButton>
 *     <Button variant="primary">Aplicar</Button>
 *   </InputGroupButton>
 * </InputGroup>
 */
declare const InputGroupButton: React.ForwardRefExoticComponent<InputGroupButtonProps & React.RefAttributes<HTMLSpanElement>>;
type InputGroupComponent = typeof InputGroupRoot & {
    Text: typeof InputGroupText;
    Addon: typeof InputGroupAddon;
    Button: typeof InputGroupButton;
};
declare const InputGroup: InputGroupComponent;

declare const alertVariants: (props?: ({
    tone?: "success" | "warning" | "info" | "error" | "neutral" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AlertTone = NonNullable<VariantProps<typeof alertVariants>['tone']>;
type AlertSize = NonNullable<VariantProps<typeof alertVariants>['size']>;
/**
 * Alias deprecated — react-bootstrap usa `danger`, padronizamos em `error`.
 * Aceitamos ambos via prop, com console.warn em dev quando `danger` é usado.
 */
type AlertToneAlias = AlertTone | 'danger';
interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, Omit<VariantProps<typeof alertVariants>, 'tone'> {
    /** Tom semântico. Default `info`. */
    tone?: AlertToneAlias;
    /**
     * Alias deprecated de `tone` — parity com react-bootstrap `<Alert variant>`.
     * Use `tone` em código novo. Emite `console.warn` em dev.
     * @deprecated Use `tone` instead.
     */
    variant?: AlertToneAlias;
    /** Habilita botão de fechar (×). Chama `onDismiss` no click. */
    dismissible?: boolean;
    /** Callback do botão close. Só dispara quando `dismissible`. */
    onDismiss?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Slot de ícone. Se omitido e `icon !== false`, renderiza um default por
     * tom (SVG inline). Passe `false` para suprimir.
     */
    icon?: React.ReactNode | false;
    /** Título opcional renderizado em <strong> acima do children. */
    title?: React.ReactNode;
}
/**
 * Alert — primitivo cross-domain.
 *
 * Substitui `Alert` do react-bootstrap. Renderiza `<div role="alert">` com
 * ícone semântico (auto por tom), título opcional e botão de dismiss opcional.
 *
 * @example
 * // Simples (info default)
 * <Alert>Sua sessão foi renovada.</Alert>
 *
 * @example
 * // Tom + título
 * <Alert tone="warning" title="Atenção">
 *   Existem alterações não salvas.
 * </Alert>
 *
 * @example
 * // Dismissible com callback
 * <Alert tone="success" dismissible onDismiss={() => setShown(false)}>
 *   Pedido criado com sucesso!
 * </Alert>
 *
 * @example
 * // Ícone customizado
 * <Alert tone="error" icon={<MyIcon />}>Falha ao salvar.</Alert>
 *
 * @example
 * // Parity bootstrap (deprecated — emite warn em dev)
 * <Alert variant="danger">Erro</Alert>
 */
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

type ListSize = 'sm' | 'md' | 'lg';
declare const listVariants: (props?: ({
    variant?: "default" | "flush" | "bordered" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ListVariant = NonNullable<VariantProps<typeof listVariants>['variant']>;

interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'size'>, VariantProps<typeof listVariants> {
}
declare const ListRoot: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLUListElement>>;
interface ListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onClick'> {
    active?: boolean;
    disabled?: boolean;
    interactive?: boolean;
    /** Override raro do size herdado do List. */
    size?: ListSize;
    /** Quando presente, renderiza <button> interno. */
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    /** Quando presente, renderiza <a> interno (toma precedência sobre onClick). */
    href?: string;
    /** Target/rel para <a>. */
    target?: string;
    rel?: string;
}
declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;
interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const ListItemContent: React.ForwardRefExoticComponent<ListItemContentProps & React.RefAttributes<HTMLDivElement>>;
interface ListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const ListItemAction: React.ForwardRefExoticComponent<ListItemActionProps & React.RefAttributes<HTMLDivElement>>;
type ListItemComponent = typeof ListItem & {
    Content: typeof ListItemContent;
    Action: typeof ListItemAction;
};
type ListComponent = typeof ListRoot & {
    Item: ListItemComponent;
};
declare const List: ListComponent;

declare const rootVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ProgressVariant = 'default' | 'striped' | 'indeterminate';
type ProgressTone = 'brand' | 'success' | 'warning' | 'error';
type ProgressSize = NonNullable<VariantProps<typeof rootVariants>['size']>;
interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value' | 'max'> {
    /** Valor 0..max. Use `null`/`undefined` para forçar modo indeterminate. */
    value?: number | null;
    /** Valor máximo. Default 100. */
    max?: number;
    /** Tom semântico do indicador. Default `brand`. */
    tone?: ProgressTone;
    /** Altura. Default `md`. */
    size?: ProgressSize;
    /** Variante visual. Default `default`. */
    variant?: ProgressVariant;
    /**
     * Label opcional. Se passado:
     *   - renderiza `<span>` acima da barra (texto curto p/ leitura visual)
     *   - aplica `aria-label` no Root como fallback de a11y
     */
    label?: React.ReactNode;
}
/**
 * Progress — primitivo Radix.
 *
 * @example
 * // Determinístico
 * <Progress value={42} />
 *
 * @example
 * // Tom de erro + tamanho lg + label visível
 * <Progress value={87} tone="error" size="lg" label="Upload" />
 *
 * @example
 * // Indeterminate (carregamento sem progresso conhecido)
 * <Progress value={null} variant="indeterminate" tone="brand" />
 *
 * @example
 * // Striped animado (clássico bootstrap)
 * <Progress value={60} variant="striped" tone="success" />
 */
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    tone?: "success" | "error" | "brand" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>['size']>;
type CheckboxTone = NonNullable<VariantProps<typeof checkboxVariants>['tone']>;
interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'asChild'>, Omit<VariantProps<typeof checkboxVariants>, 'size' | 'tone'> {
    size?: CheckboxSize;
    tone?: CheckboxTone;
    /** Label inline à direita do controle. */
    label?: React.ReactNode;
    /** Descrição menor abaixo do label. Linkada via aria-describedby. */
    description?: React.ReactNode;
    /** className do wrapper `<label>` (quando há label). */
    wrapperClassName?: string;
    /** className do span do label. */
    labelClassName?: string;
}
/**
 * Checkbox — primitivo Radix + Tailwind.
 *
 * Substitui `<FormCheck>` (variant checkbox) do react-bootstrap. Suporta
 * estado tri (checked | unchecked | indeterminate), 3 sizes, 3 tones e slots
 * opcionais label/description.
 *
 * @example
 * // Simples
 * <Checkbox label="Aceito os termos" />
 *
 * @example
 * // Controlado
 * <Checkbox checked={value} onCheckedChange={setValue} label="Notificar" />
 *
 * @example
 * // Tri-state
 * <Checkbox checked="indeterminate" label="Selecionar todos" />
 *
 * @example
 * // Validation tone
 * <Checkbox tone="error" label="Obrigatório" required />
 */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;

declare const switchVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    tone?: "success" | "brand" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SwitchSize = NonNullable<VariantProps<typeof switchVariants>['size']>;
type SwitchTone = NonNullable<VariantProps<typeof switchVariants>['tone']>;
interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'asChild' | 'onChange'>, VariantProps<typeof switchVariants> {
    /** Texto principal renderizado à direita do switch (slot opcional). */
    label?: React.ReactNode;
    /** Texto descritivo menor renderizado abaixo do label (slot opcional). */
    description?: React.ReactNode;
    /** className aplicado ao Root (track). Para className do wrapper use `wrapperClassName`. */
    className?: string;
    /** className do wrapper <label> quando há `label`. Sem efeito sem label. */
    wrapperClassName?: string;
}
/**
 * Switch — toggle on/off acessível baseado em Radix.
 *
 * Substitui `<FormCheck type="switch">` do react-bootstrap e o legado interno
 * `Switch.tsx`. Renderiza `<button role="switch">` (Radix) com thumb animada.
 *
 * @example
 * // Standalone, controlled
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * @example
 * // Com label e descrição
 * <Switch
 *   label="Notificações por email"
 *   description="Receba avisos sobre ordens novas"
 *   checked={value}
 *   onCheckedChange={setValue}
 * />
 *
 * @example
 * // Em form (uncontrolled)
 * <Switch name="ativo" defaultChecked value="1" required />
 */
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;

declare const searchBarVariants: (props?: ({
    variant?: "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SearchBarVariant = NonNullable<VariantProps<typeof searchBarVariants>['variant']>;
type SearchBarSize = NonNullable<VariantProps<typeof searchBarVariants>['size']>;
interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'children'> {
    /** Valor controlado da busca. */
    value: string;
    /** Callback emitido com o valor (após debounce, se aplicável). */
    onChange: (value: string) => void;
    /** Callback do clear (X). Recebe controle do reset. Default: emite `onChange('')`. */
    onClear?: () => void;
    /** Placeholder do input. Default `"Buscar..."`. */
    placeholder?: string;
    /** Atraso (ms) para emitir `onChange` após digitação. Default 0 (sem debounce). */
    debounceMs?: number;
    /** Estado de loading — substitui ícone search por spinner. */
    loading?: boolean;
    /** Habilita botão X quando `value` não vazio. Default `true`. */
    clearable?: boolean;
    /** Slot opcional para ícone customizado à esquerda (substitui o search SVG). */
    icon?: React.ReactNode;
    /** Tamanho — propaga ao TextField interno. */
    size?: SearchBarSize;
    /** Variant — atualmente só `default`. */
    variant?: SearchBarVariant;
    /** aria-label do input. Default `"Buscar"`. */
    'aria-label'?: string;
    /** Wrapper className (div externo `relative`). */
    wrapperClassName?: string;
}
/**
 * SearchBar — composite cross-domain.
 *
 * Substitui o padrão `InputGroup + FormControl + FaSearch + clear button`.
 * Reusa `TextField` por dentro; ícones absolutamente posicionados via wrapper
 * relativo (TextField não suporta leftAdornment).
 *
 * @example
 * // Controlado simples
 * const [q, setQ] = useState('')
 * <SearchBar value={q} onChange={setQ} />
 *
 * @example
 * // Com debounce de 300ms
 * <SearchBar value={q} onChange={setQ} debounceMs={300} />
 *
 * @example
 * // Loading state
 * <SearchBar value={q} onChange={setQ} loading={isFetching} />
 */
declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;

declare const emptyStateVariants: (props?: ({
    variant?: "default" | "compact" | "card" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type EmptyStateVariant = NonNullable<VariantProps<typeof emptyStateVariants>['variant']>;
type EmptyStateSize = NonNullable<VariantProps<typeof emptyStateVariants>['size']>;
interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof emptyStateVariants> {
    /** Ícone (ReactNode, decorativo). Renderizado no topo, herda `text-muted-foreground`. */
    icon?: React.ReactNode;
    /** Título — string ou node. Heading level depende do `size` (sm→h4, md/lg→h3). */
    title: React.ReactNode;
    /** Descrição opcional — string ou node, renderizado como `<p>`. */
    description?: React.ReactNode;
    /** Ação CTA opcional (geralmente <Button>). Wrapper centralizado abaixo. */
    action?: React.ReactNode;
}
/**
 * EmptyState — primitivo cross-domain para estados "nada aqui".
 *
 * Renderiza `<div role="status" aria-live="polite">` com slots opcionais
 * (icon + title + description + action). Usado em lists, tabelas, grids,
 * resultados-de-busca-vazios, abas sem conteúdo etc.
 *
 * @example
 * // Mínimo (apenas título)
 * <EmptyState title="Nenhum resultado" />
 *
 * @example
 * // Completo
 * <EmptyState
 *   icon={<FaInbox />}
 *   title="Nenhuma OS"
 *   description="Crie a primeira ordem de serviço para começar."
 *   action={<Button onClick={onCreate}>Criar OS</Button>}
 * />
 *
 * @example
 * // Wrapper visual (card)
 * <EmptyState variant="card" icon={<FaSearch />} title="Sem resultados" />
 *
 * @example
 * // Inline em tab/card (compact)
 * <EmptyState variant="compact" size="sm" title="Nada por aqui" />
 */
declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;

declare const tooltipContentVariants: (props?: ({
    variant?: "light" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TooltipVariant = NonNullable<VariantProps<typeof tooltipContentVariants>['variant']>;
type TooltipSize = NonNullable<VariantProps<typeof tooltipContentVariants>['size']>;
type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
type TooltipAlign = 'start' | 'center' | 'end';
/**
 * TooltipProvider — re-export do Radix `Tooltip.Provider`.
 *
 * Em geral o wrapper `<Tooltip>` já injeta um Provider local. Use este export
 * quando quiser configurar `delayDuration` / `skipDelayDuration` globais na
 * raiz da app, ou quando estiver compondo manualmente com `TooltipRoot`.
 */
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
/**
 * TooltipRoot — alias de `Tooltip.Root` (Radix). Use em composição manual
 * (sem o wrapper conveniente). Dentro deve haver `TooltipTrigger` +
 * `TooltipContent` (envoltos por um Provider acima na árvore).
 */
declare const TooltipRoot: React.FC<TooltipPrimitive.TooltipProps>;
/**
 * TooltipTrigger — alias de `Tooltip.Trigger` (Radix). Por padrão renderiza
 * `<button>`; passe `asChild` para projetar props no filho (recomendado p/
 * primitivos como `<Button>`).
 */
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, VariantProps<typeof tooltipContentVariants> {
}
/**
 * TooltipContent — painel posicionado pelo Popper do Radix com tema/sizing
 * via cva. Use em composição manual.
 *
 * @example
 * <TooltipProvider>
 *   <TooltipRoot>
 *     <TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
 *     <TooltipPrimitive.Portal>
 *       <TooltipContent variant="light" side="right">Ajuda</TooltipContent>
 *     </TooltipPrimitive.Portal>
 *   </TooltipRoot>
 * </TooltipProvider>
 */
declare const TooltipContent: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
interface TooltipProps {
    /** Conteúdo do tooltip. ReactNode (string, ícone, JSX leve). Obrigatório. */
    content: React.ReactNode;
    /** Trigger — qualquer elemento focável. Renderizado via `asChild`. */
    children: React.ReactNode;
    /** Lado relativo ao trigger. Default `top`. */
    side?: TooltipSide;
    /** Alinhamento ao longo do `side`. Default `center`. */
    align?: TooltipAlign;
    /** Distância (px) entre trigger e tooltip. Default 4. */
    sideOffset?: number;
    /** Delay (ms) até abrir on hover. Default 200. */
    delayDuration?: number;
    /** Desabilita hover persistente sobre o conteúdo (útil p/ tooltips não-interativos). */
    disableHoverableContent?: boolean;
    /** Estado inicial (uncontrolled). */
    defaultOpen?: boolean;
    /** Estado controlado. */
    open?: boolean;
    /** Callback de mudança de estado. */
    onOpenChange?: (open: boolean) => void;
    /** Tema visual. Default `default` (dark). */
    variant?: TooltipVariant;
    /** Tamanho do padding/typography. Default `md`. */
    size?: TooltipSize;
    /** className aplicado ao Content. */
    className?: string;
}
/**
 * Tooltip — wrapper conveniente sobre Radix Tooltip.
 *
 * Monta Provider local + Root + Trigger (asChild) + Portal + Content em um único
 * componente. Zero-config — funciona em qualquer árvore sem precisar de Provider
 * externo. Para customizar `delayDuration` global, wrappear com `<TooltipProvider>`
 * externo (Providers aninhados são seguros; o local apenas re-aplica defaults
 * à subárvore).
 *
 * Para composição manual (multi-Trigger, anchor custom, Arrow), use os exports
 * granulares: `TooltipProvider`, `TooltipRoot`, `TooltipTrigger`, `TooltipContent`.
 *
 * @example
 * // Uso básico — string content
 * <Tooltip content="Salvar (Ctrl+S)"><Button>Salvar</Button></Tooltip>
 *
 * @example
 * // ReactNode content + tema light + side
 * <Tooltip variant="light" side="right" content={<><b>Ctrl</b> + <b>K</b></>}>
 *   <IconButton aria-label="Buscar"><SearchIcon /></IconButton>
 * </Tooltip>
 *
 * @example
 * // Controlled + delay custom
 * <Tooltip
 *   open={open}
 *   onOpenChange={setOpen}
 *   delayDuration={0}
 *   content="Aparece imediatamente"
 * >
 *   <Button>Hover</Button>
 * </Tooltip>
 */
declare const Tooltip: React.FC<TooltipProps>;

declare const dropdownMenuContentVariants: (props?: ({
    variant?: "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DropdownMenuVariant = NonNullable<VariantProps<typeof dropdownMenuContentVariants>['variant']>;
type DropdownMenuSize = NonNullable<VariantProps<typeof dropdownMenuContentVariants>['size']>;
/**
 * DropdownMenu — alias de `DropdownMenu.Root` (Radix). Container raiz.
 * Aceita `open`/`onOpenChange`/`defaultOpen`/`modal`/`dir`.
 */
declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
/**
 * DropdownMenuTrigger — alias de `DropdownMenu.Trigger` (Radix). Por padrão
 * renderiza `<button>`; use `asChild` para projetar props no filho (recomendado
 * p/ primitivos como `<Button>`).
 */
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * DropdownMenuPortal — alias de `DropdownMenu.Portal` (Radix). Renderiza
 * Content no `<body>`, escapando de stacking contexts e overflow:hidden.
 */
declare const DropdownMenuPortal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
/**
 * DropdownMenuGroup — alias de `DropdownMenu.Group` (Radix). Agrupa items
 * relacionados — útil para a11y (role="group") e separação visual (com Separator).
 */
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
/**
 * DropdownMenuRadioGroup — alias de `DropdownMenu.RadioGroup` (Radix). Container
 * para `DropdownMenuRadioItem`s mutuamente exclusivos. Aceita `value`/`onValueChange`.
 */
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
/**
 * DropdownMenuSub — alias de `DropdownMenu.Sub` (Radix). Container de submenu
 * aninhado. Wrap `DropdownMenuSubTrigger` + `DropdownMenuPortal` + `DropdownMenuSubContent`.
 */
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>, VariantProps<typeof dropdownMenuContentVariants> {
}
/**
 * DropdownMenuContent — painel posicionado pelo Popper do Radix com tema/sizing
 * via cva. Deve estar dentro de `DropdownMenuPortal`.
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild><Button>Abrir</Button></DropdownMenuTrigger>
 *   <DropdownMenuPortal>
 *     <DropdownMenuContent size="md" align="start">
 *       <DropdownMenuItem>Editar</DropdownMenuItem>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem>Excluir</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenuPortal>
 * </DropdownMenu>
 */
declare const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
    /** Indenta para alinhar com items que possuem ícone à esquerda (CheckboxItem/RadioItem). */
    inset?: boolean;
}
/**
 * DropdownMenuItem — opção clicável padrão. Use `inset` para alinhar com items
 * tipo Checkbox/Radio em menus mistos.
 */
declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
}
/**
 * DropdownMenuCheckboxItem — item com estado tri (checked | unchecked | indeterminate).
 * Renderiza ícone de check no slot esquerdo quando ativo.
 */
declare const DropdownMenuCheckboxItem: React.ForwardRefExoticComponent<DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
}
/**
 * DropdownMenuRadioItem — item de seleção exclusiva. Deve estar dentro de
 * `DropdownMenuRadioGroup` com `value`/`onValueChange`.
 */
declare const DropdownMenuRadioItem: React.ForwardRefExoticComponent<DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
    /** Indenta para alinhar com items tipo Checkbox/Radio. */
    inset?: boolean;
}
/**
 * DropdownMenuLabel — cabeçalho não-interativo (a11y: role="presentation").
 * Use para nomear grupos de items (ex.: "Filtros", "Ações").
 */
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
}
/** DropdownMenuSeparator — divisor horizontal entre grupos de items. */
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
}
/**
 * DropdownMenuShortcut — slot para indicar atalho de teclado à direita do label
 * de um Item (ex.: "⌘K"). Não é interativo — só visual. Não usa Radix.
 *
 * @example
 * <DropdownMenuItem>Buscar <DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
 */
declare const DropdownMenuShortcut: React.FC<DropdownMenuShortcutProps>;
interface DropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
    /** Indenta para alinhar com items tipo Checkbox/Radio. */
    inset?: boolean;
}
/**
 * DropdownMenuSubTrigger — trigger de submenu aninhado. Renderiza chevron-right
 * inline à direita. Deve estar dentro de `DropdownMenuSub`.
 */
declare const DropdownMenuSubTrigger: React.ForwardRefExoticComponent<DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuSubContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>, VariantProps<typeof dropdownMenuContentVariants> {
}
/**
 * DropdownMenuSubContent — painel do submenu. Mesma técnica de variants do
 * Content principal. Deve estar dentro de `DropdownMenuPortal` + `DropdownMenuSub`.
 */
declare const DropdownMenuSubContent: React.ForwardRefExoticComponent<DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>>;
type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;
/**
 * Collapsible — alias de `Collapsible.Root` (Radix). Container que coordena
 * Trigger ↔ Content via `data-state`. Pode ser controlled (`open` /
 * `onOpenChange`) ou uncontrolled (`defaultOpen`).
 *
 * @example
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger asChild><Button>Detalhes</Button></CollapsibleTrigger>
 *   <CollapsibleContent>Conteúdo expansível</CollapsibleContent>
 * </Collapsible>
 */
declare const Collapsible: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>;
/**
 * CollapsibleTrigger — botão que alterna `open`. Renderiza `<button>` por
 * padrão; passe `asChild` para projetar props no filho (recomendado p/
 * `<Button>` do ui-kit-core).
 */
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;
/**
 * CollapsibleContent — painel expansível. Animação de altura via keyframes
 * que usam `--radix-collapsible-content-height` (medida real do conteúdo).
 * Aplica `overflow-hidden` para que o clip funcione durante a transição.
 *
 * O caller controla padding/border/background (sem variants — minimalista).
 *
 * @example
 * <CollapsibleContent className="pt-2 pl-4 border-l border-surface-border">
 *   ...
 * </CollapsibleContent>
 */
declare const CollapsibleContent: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const accordionRootVariants: (props?: ({
    variant?: "default" | "flush" | "bordered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionItemVariants: (props?: ({
    variant?: "default" | "flush" | "bordered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionTriggerVariants: (props?: ({
    variant?: "default" | "flush" | "bordered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionContentVariants: (props?: ({
    variant?: "default" | "flush" | "bordered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AccordionVariant = NonNullable<VariantProps<typeof accordionRootVariants>['variant']>;
type AccordionRootSingleProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    type: 'single';
};
type AccordionRootMultipleProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    type: 'multiple';
};
type AccordionProps = (AccordionRootSingleProps | AccordionRootMultipleProps) & {
    /** Estilo visual aplicado aos itens. Default `default`. */
    variant?: AccordionVariant;
};
/**
 * Accordion — primitivo Radix (alias de `Accordion.Root`).
 *
 * Para `type="single"`, passe `collapsible` se quiser permitir fechar o item
 * ativo (sem ele, o item permanece sempre aberto após o primeiro clique).
 *
 * @example
 * // Single, collapsível
 * <Accordion type="single" collapsible defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Pergunta</AccordionTrigger>
 *     <AccordionContent>Resposta</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * @example
 * // Multiple
 * <Accordion type="multiple" defaultValue={['a', 'b']}>...</Accordion>
 */
declare const Accordion: React.ForwardRefExoticComponent<((Omit<AccordionPrimitive.AccordionSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    type: "single";
} & {
    /** Estilo visual aplicado aos itens. Default `default`. */
    variant?: AccordionVariant;
}) | (Omit<AccordionPrimitive.AccordionMultipleProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    type: "multiple";
} & {
    /** Estilo visual aplicado aos itens. Default `default`. */
    variant?: AccordionVariant;
})) & React.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
}
declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
declare const AccordionHeader: React.ForwardRefExoticComponent<AccordionPrimitive.AccordionHeaderProps & React.RefAttributes<HTMLHeadingElement>>;
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
}
declare const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
}
declare const AccordionContent: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;

declare const SheetRoot: React.FC<DialogPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const SheetClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const sheetContentVariants: (props?: ({
    side?: "left" | "right" | "bottom" | "top" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SheetSide = NonNullable<VariantProps<typeof sheetContentVariants>['side']>;
type SheetSize = NonNullable<VariantProps<typeof sheetContentVariants>['size']>;
interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof sheetContentVariants> {
}
/**
 * SheetContent — painel lateral/edge posicionado pelo CSS (sem Popper).
 * Renderiza data-side="..." para que o cva slide direcional funcione.
 * Use em composição manual envolto por `SheetPortal` + `SheetOverlay` acima.
 */
declare const SheetContent: React.ForwardRefExoticComponent<SheetContentProps & React.RefAttributes<HTMLDivElement>>;
interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Borda em que o Sheet aparece. Default `right`. */
    side?: SheetSide;
    /** Tamanho. Lateral controla width; top/bottom controla height. Default `md`. */
    size?: SheetSize;
    /** Bloqueia fechamento por click no overlay e ESC. Use para fluxos não-canceláveis. */
    modal?: boolean;
    /** Conteúdo do sheet. Tipicamente `<SheetHeader>` + `<SheetBody>` + `<SheetFooter>`. */
    children: React.ReactNode;
    /** className aplicado ao SheetContent (não ao overlay). */
    className?: string;
    /** Esconde o botão X do header. */
    hideCloseButton?: boolean;
}
/**
 * Sheet — Drawer/Offcanvas Radix Dialog com slots e slide direcional.
 *
 * @example
 * <Sheet open={open} onOpenChange={setOpen} side="right" size="md">
 *   <SheetHeader><SheetTitle>Filtros</SheetTitle></SheetHeader>
 *   <SheetBody>...form...</SheetBody>
 *   <SheetFooter>
 *     <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
 *     <Button variant="primary" onClick={apply}>Aplicar</Button>
 *   </SheetFooter>
 * </Sheet>
 */
declare const Sheet: React.FC<SheetProps>;
interface SheetSlotProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const SheetHeader: React.ForwardRefExoticComponent<SheetSlotProps & React.RefAttributes<HTMLDivElement>>;
declare const SheetBody: React.ForwardRefExoticComponent<SheetSlotProps & React.RefAttributes<HTMLDivElement>>;
declare const SheetFooter: React.ForwardRefExoticComponent<SheetSlotProps & React.RefAttributes<HTMLDivElement>>;
declare const SheetTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const tabsListVariants: (props?: ({
    variant?: "solid" | "default" | "pills" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tabsTriggerVariants: (props?: ({
    variant?: "solid" | "default" | "pills" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>['variant']>;
type TabsSize = NonNullable<VariantProps<typeof tabsListVariants>['size']>;
interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
}
/**
 * Tabs — alias de Radix `Tabs.Root`. Aceita `value`/`defaultValue`/`onValueChange`,
 * `orientation` (`horizontal` default | `vertical`), `activationMode`
 * (`automatic` default | `manual`), `dir`.
 *
 * @example
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Visão geral</TabsTrigger>
 *     <TabsTrigger value="config">Config</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">…</TabsContent>
 *   <TabsContent value="config">…</TabsContent>
 * </Tabs>
 */
declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>, VariantProps<typeof tabsListVariants> {
}
/**
 * TabsList — container `role="tablist"`. Controla a aparência via `variant`
 * (`default` underline | `pills` | `solid`) e propaga variant+size para os
 * `TabsTrigger` filhos via Context.
 */
declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, Partial<VariantProps<typeof tabsTriggerVariants>> {
}
/**
 * TabsTrigger — botão `role="tab"`. Lê `variant`/`size` do Context da TabsList
 * por padrão; pode sobrescrever via props quando aninhado fora de uma List
 * customizada.
 */
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
}
/**
 * TabsContent — `role="tabpanel"`. Foco visível via ring brand-accent quando
 * navegado por teclado (Tab a partir do tab ativo).
 */
declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;

declare const popoverContentVariants: (props?: ({
    variant?: "default" | null | undefined;
    size?: "sm" | "md" | "lg" | "auto" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type PopoverVariant = NonNullable<VariantProps<typeof popoverContentVariants>['variant']>;
type PopoverSize = NonNullable<VariantProps<typeof popoverContentVariants>['size']>;
type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
type PopoverAlign = 'start' | 'center' | 'end';
/**
 * Popover — alias de `Popover.Root` (Radix). Container que controla open state.
 * Aceita `defaultOpen`, `open`, `onOpenChange`, `modal`.
 */
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
/**
 * PopoverTrigger — alias de `Popover.Trigger` (Radix). Por padrão renderiza
 * `<button>`; passe `asChild` para projetar props no filho (recomendado p/
 * primitivos como `<Button>`). Click toggle o popover.
 */
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * PopoverAnchor — alias de `Popover.Anchor` (Radix). Use quando o elemento
 * que ancora o posicionamento for diferente do trigger (ex.: trigger é um
 * ícone num input, mas o popover deve ancorar ao input inteiro).
 */
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
/**
 * PopoverPortal — alias de `Popover.Portal` (Radix). Portala o Content para
 * fora da árvore (escapa de stacking contexts / overflow:hidden).
 */
declare const PopoverPortal: React.FC<PopoverPrimitive.PopoverPortalProps>;
/**
 * PopoverClose — alias de `Popover.Close` (Radix). Fecha o popover. Aceita
 * `asChild` para projetar props num botão custom.
 */
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
}
interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, VariantProps<typeof popoverContentVariants> {
}
/**
 * PopoverContent — painel posicionado pelo Popper do Radix com tema/sizing
 * via cva. Auto-portala (envolve em `Popover.Portal`) — não é necessário
 * declarar `PopoverPortal` manualmente. Para opt-out (anchor inline), passe
 * o filho cru via composição manual com `PopoverPrimitive.Content`.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger asChild><Button>Abrir</Button></PopoverTrigger>
 *   <PopoverContent side="bottom" size="md">Conteúdo</PopoverContent>
 * </Popover>
 */
declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
interface PopoverArrowProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow> {
}
/**
 * PopoverArrow — seta opcional apontando ao trigger. Renderiza um `<svg>`
 * herdando `fill` do tema (default usa `fill-surface-background` + `stroke`
 * via container; para correspondência exata com a borda, customize via
 * className). Posicionamento automático pelo Popper.
 */
declare const PopoverArrow: React.ForwardRefExoticComponent<PopoverArrowProps & React.RefAttributes<SVGSVGElement>>;

declare const selectTriggerVariants: (props?: ({
    variant?: "error" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const selectContentVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SelectVariant = NonNullable<VariantProps<typeof selectTriggerVariants>['variant']>;
type SelectSize = NonNullable<VariantProps<typeof selectTriggerVariants>['size']>;
/**
 * Select — alias de `Select.Root` do Radix. Componente raiz controlado/uncontrolled
 * (`value`/`onValueChange` ou `defaultValue`).
 */
declare const Select: React.FC<SelectPrimitive.SelectProps>;
/**
 * SelectGroup — agrupa `SelectItem` com um `SelectLabel` opcional. Análogo a
 * `<optgroup>`.
 */
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
/**
 * SelectValue — renderiza o valor selecionado dentro do `SelectTrigger`.
 * Aceita `placeholder` para o estado vazio.
 */
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
/**
 * SelectPortal — re-export do `Select.Portal` do Radix. O `SelectContent`
 * já monta o Portal internamente; este export está disponível para composição
 * manual.
 */
declare const SelectPortal: React.FC<SelectPrimitive.SelectPortalProps>;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, VariantProps<typeof selectTriggerVariants> {
}
/**
 * SelectTrigger — botão que abre a listbox. Visualmente idêntico a `TextField`
 * (mesma height, padding, border, rounded, focus ring) + chevron à direita.
 *
 * Variants: `default` | `error`. Sizes: `sm` | `md` (default) | `lg`.
 */
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, VariantProps<typeof selectContentVariants> {
}
/**
 * SelectContent — viewport portalizado com scroll buttons e animação direcional.
 *
 * Default `position="popper"` + `sideOffset=4` (recomendado pelo Radix para
 * comportamento similar a Tooltip/Popover, com transform-origin coerente).
 */
declare const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
}
/**
 * SelectItem — opção selecionável. Mostra check icon à esquerda quando
 * selecionado (via `ItemIndicator`); aplica bg-surface-muted em hover/focus.
 */
declare const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const toastVariants: (props?: ({
    tone?: "success" | "warning" | "info" | "error" | "neutral" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ToastTone = NonNullable<VariantProps<typeof toastVariants>['tone']>;
type ToastSize = NonNullable<VariantProps<typeof toastVariants>['size']>;
interface ToastProviderProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider> {
}
/**
 * ToastProvider — re-export direto de `Toast.Provider` (Radix). Monte UMA VEZ
 * na raiz da app, junto com `<ToastViewport />`. Em geral prefira o wrapper
 * `<Toaster />` que já faz Provider+Viewport+rendering automático.
 *
 * Props relevantes: `swipeDirection` (default `right`), `swipeThreshold`,
 * `duration` (default global, override por Root), `label` (a11y).
 */
declare const ToastProvider: React.FC<ToastPrimitive.ToastProviderProps>;
interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
}
/**
 * ToastViewport — região fixa onde toasts são empilhados. Singleton
 * recomendado: monte UM por Provider. Position default `fixed bottom-0
 * right-0`. Override via `className`.
 *
 * @example
 * <ToastViewport className="fixed top-0 right-0 ..." />
 */
declare const ToastViewport: React.ForwardRefExoticComponent<ToastViewportProps & React.RefAttributes<HTMLOListElement>>;
interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, VariantProps<typeof toastVariants> {
}
/**
 * ToastRoot — container individual. Cada toast é um Root dentro do Viewport.
 * Use `tone` para semântica visual; `size` para densidade. Radix mapeia
 * `tone="error"|"warning"` em role=alert + aria-live=assertive
 * automaticamente quando `type="foreground"` — definido no wrapper Toaster.
 */
declare const ToastRoot: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLLIElement>>;
interface ToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
}
declare const ToastTitle: React.ForwardRefExoticComponent<ToastTitleProps & React.RefAttributes<HTMLDivElement>>;
interface ToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
}
declare const ToastDescription: React.ForwardRefExoticComponent<ToastDescriptionProps & React.RefAttributes<HTMLDivElement>>;
interface ToastActionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {
}
/**
 * ToastAction — botão de ação (ex.: "Desfazer", "Recarregar"). Requer
 * `altText` (acessibilidade — texto lido por SR quando o toast aparece em
 * background mode).
 */
declare const ToastAction: React.ForwardRefExoticComponent<ToastActionProps & React.RefAttributes<HTMLButtonElement>>;
interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
}
declare const ToastClose: React.ForwardRefExoticComponent<ToastCloseProps & React.RefAttributes<HTMLButtonElement>>;

interface ToastActionDescriptor {
    /** Label do botão. */
    label: React.ReactNode;
    /** Callback invocado no click. */
    onClick: () => void;
    /** Texto alternativo para screen readers. Default = label se string. */
    altText?: string;
}
interface ToastOptions {
    /** Título (em <strong>). Opcional, mas recomendado p/ a11y. */
    title?: React.ReactNode;
    /** Descrição/corpo. Opcional. */
    description?: React.ReactNode;
    /** Tom semântico. Default `info`. */
    tone?: ToastTone;
    /** Tamanho. Default `md`. */
    size?: ToastSize;
    /** Duração antes de auto-dismiss (ms). Default herdado do Provider. */
    duration?: number;
    /** Botão de ação opcional (ex.: "Desfazer"). */
    action?: ToastActionDescriptor;
    /** Render close button (X). Default `true`. */
    closable?: boolean;
    /**
     * ID estável p/ dismiss programático. Auto-gerado se omitido. Passar mesmo
     * ID em chamada subsequente substitui o toast existente (use-case: progresso).
     */
    id?: string;
}
interface ToastItem extends Omit<ToastOptions, 'id'> {
    /** ID estável (sempre presente — auto-gerado se não fornecido). */
    id: string;
    /** Estado open controlado — gerenciado pelo Toaster. */
    open: boolean;
}
interface UseToastReturn {
    /** Lista atual de toasts (incluindo os já em animação de fechamento). */
    toasts: ToastItem[];
    /** Dispara novo toast. Retorna o id (gerado ou recebido). */
    toast: (opts: ToastOptions) => string;
    /** Fecha por id; sem args fecha todos. */
    dismiss: (id?: string) => void;
}
/**
 * useToast — hook imperativo p/ disparar toasts. Requer `<Toaster />` ancestor.
 *
 * @example
 * const { toast } = useToast()
 * toast({ tone: 'success', title: 'Pedido criado' })
 */
declare function useToast(): UseToastReturn;
interface ToasterProps {
    /** Duração default de cada toast (ms). Default 5000 (Radix default). */
    duration?: number;
    /** Direção do swipe-to-dismiss. Default `right`. */
    swipeDirection?: 'right' | 'left' | 'up' | 'down';
    /** px de drag até confirmar swipe. Default 50. */
    swipeThreshold?: number;
    /** Label a11y da region de toasts. Default `Notificações`. */
    label?: string;
    /** className aplicada ao Viewport (override de position). */
    viewportClassName?: string;
}
/**
 * Toaster — Provider + Viewport + rendering automático de toasts disparados
 * via `useToast()`. Monte uma vez no shell da app.
 *
 * @example
 * // App root
 * <App />
 * <Toaster />
 *
 * // Qualquer componente abaixo do Toaster
 * const { toast } = useToast()
 * toast({ tone: 'success', title: 'Salvo!' })
 *
 * @example
 * // Override posição
 * <Toaster viewportClassName="fixed top-0 left-1/2 -translate-x-1/2 max-w-sm" />
 */
declare const Toaster: React.FC<ToasterProps>;

type DataTableSortDirection = 'asc' | 'desc';
interface DataTableSort {
    columnId: string;
    direction: DataTableSortDirection;
}
type DataTableVariant = 'default' | 'bordered' | 'minimal';
type DataTableSize = 'sm' | 'md' | 'lg';
interface DataTableCellContext<TRow> {
    rowIndex: number;
    rowId: string;
    isSelected: boolean;
    row: TRow;
}
interface DataTableColumn<TRow> {
    /** Identificador único (obrigatório). */
    id: string;
    /** Conteúdo do `<th>`. Aceita ReactNode ou função (útil p/ traduções lazy). */
    header: React.ReactNode | (() => React.ReactNode);
    /** Caminho para extrair valor da row. Fallback quando `cell` não definido. */
    accessor?: keyof TRow | ((row: TRow) => unknown);
    /** Render customizado da célula — `row` + contexto. */
    cell?: (row: TRow, ctx: DataTableCellContext<TRow>) => React.ReactNode;
    /** Largura — string (px/% ou className) ou number (px). */
    width?: string | number;
    /** Largura mínima — string (px/% ou className) ou number (px). */
    minWidth?: string | number;
    /** Alinhamento horizontal. Default `left`. */
    align?: 'left' | 'center' | 'right';
    /** Habilita header clicável para ordenar. Default `false`. */
    sortable?: boolean;
    /** Override do `id` quando emitir o evento de sort. Default `= id`. */
    sortKey?: string;
    /** Sticky horizontal — fixa coluna à esquerda ou direita ao rolar. */
    sticky?: 'left' | 'right';
    /** className adicional do `<th>`. */
    headerClassName?: string;
    /** className adicional da `<td>` — string ou função p/ classe condicional. */
    cellClassName?: string | ((row: TRow) => string);
    /** Oculta a coluna (toggle externo de visibilidade). */
    hidden?: boolean;
}
interface DataTableRowAction<TRow = Record<string, unknown>> {
    label: React.ReactNode;
    icon?: React.ReactNode;
    onClick: (row: TRow) => void;
    disabled?: boolean;
    /** Renderiza item em tom de erro (vermelho) — para "Excluir" etc. */
    destructive?: boolean;
}
interface DataTableEmptyState {
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}
type DataTableSelectionMode = 'single' | 'multiple';
interface DataTablePaginationProps {
    /** Página atual (1-based). */
    page: number;
    pageSize: number;
    totalRows: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    size?: DataTableSize;
    className?: string;
}
interface DataTableProps<TRow extends Record<string, unknown>> {
    data: TRow[];
    columns: DataTableColumn<TRow>[];
    getRowId: (row: TRow, index: number) => string;
    loading?: boolean;
    error?: React.ReactNode;
    emptyState?: DataTableEmptyState;
    caption?: React.ReactNode;
    ariaLabel?: string;
    sortBy?: DataTableSort | null;
    defaultSortBy?: DataTableSort | null;
    onSortChange?: (sort: DataTableSort | null) => void;
    page?: number;
    defaultPage?: number;
    pageSize?: number;
    defaultPageSize?: number;
    totalRows?: number;
    pageSizeOptions?: number[];
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    selectable?: boolean | DataTableSelectionMode;
    selectedRowIds?: Set<string> | string[];
    defaultSelectedRowIds?: Set<string> | string[];
    onSelectionChange?: (ids: Set<string>) => void;
    onRowClick?: (row: TRow, index: number) => void;
    searchable?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    toolbar?: React.ReactNode;
    rowActions?: DataTableRowAction<TRow>[] | ((row: TRow) => DataTableRowAction<TRow>[]);
    stickyHeader?: boolean;
    maxHeight?: string;
    variant?: DataTableVariant;
    size?: DataTableSize;
    asCard?: boolean;
    className?: string;
    tableClassName?: string;
    equalityFn?: (a: TRow, b: TRow) => boolean;
}

declare const dataTableVariants: (props?: ({
    variant?: "default" | "bordered" | "minimal" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const DataTable: <TRow extends Record<string, unknown>>(props: DataTableProps<TRow> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement;

/**
 * DataTablePagination — footer de paginação controlado.
 *
 * **Importante:** NÃO faz slice dos dados. O caller é responsável por enviar
 * `data` já paginado quando `totalRows` está presente (paginação remota).
 *
 * @example
 * <DataTablePagination
 *   page={page}
 *   pageSize={20}
 *   totalRows={total}
 *   onPageChange={setPage}
 *   pageSizeOptions={[10, 20, 50]}
 *   onPageSizeChange={setPageSize}
 * />
 */
declare const DataTablePagination: React.FC<DataTablePaginationProps>;

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Slot alinhado à esquerda (geralmente SearchBar/filtros). */
    start?: React.ReactNode;
    /** Slot alinhado à direita (geralmente botões de ação). */
    end?: React.ReactNode;
}
/**
 * DataTableToolbar — slot helper opcional para layouts toolbar acima da tabela.
 *
 * @example
 * <DataTableToolbar
 *   start={<SearchBar value={q} onChange={setQ} />}
 *   end={<Button>Exportar</Button>}
 * />
 */
declare const DataTableToolbar: React.ForwardRefExoticComponent<DataTableToolbarProps & React.RefAttributes<HTMLDivElement>>;

interface DataTableRowProps<TRow extends Record<string, unknown>> {
    row: TRow;
    rowId: string;
    rowIndex: number;
    columns: DataTableColumn<TRow>[];
    size: DataTableSize;
    variant: 'default' | 'bordered' | 'minimal';
    isSelected: boolean;
    selectable: false | 'single' | 'multiple';
    onToggleSelect?: (rowId: string) => void;
    rowActions?: DataTableRowAction<TRow>[];
    onRowClick?: (row: TRow, index: number) => void;
}
declare const DataTableRow: <TRow extends Record<string, unknown>>(props: DataTableRowProps<TRow>) => React.ReactElement | null;

declare function cn(...inputs: ClassValue[]): string;

/**
 * FormModal — base reutilizável para modais de formulário com ação primária.
 *
 * Slots: { title, icon, body (children), primaryAction, secondaryAction,
 * footerExtra, isValid, isLoading }. Substitui o padrão quebrado de
 * SwitchOnClick + GenericContextForm vazio + ResponsiveContainer sem footer.
 *
 * Wave 1 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 *
 * Refatorado em 2026-05-13 para Tailwind+Radix (ui-kit-core primitives).
 * API pública (FormModalProps) preservada — adapter interno mapeia
 * `show`→`open`, `closeOnBackdrop=false`→bloqueio de overlay/esc, e variantes
 * legadas de bootstrap (`outline-secondary`) para o novo Button.
 */
interface FormModalPrimaryAction {
    label: string;
    onClick: () => void | Promise<void>;
    icon?: React__default.ReactNode;
    /** Aceita variantes do Button novo (primary, danger, outline-*, etc.) */
    variant?: string;
}
interface FormModalSecondaryAction {
    label: string;
    onClick: () => void;
    /** Aceita variantes do Button novo (primary, danger, outline-*, etc.) */
    variant?: string;
}
interface FormModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    icon?: React__default.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: React__default.ReactNode;
    primaryAction: FormModalPrimaryAction;
    secondaryAction?: FormModalSecondaryAction;
    isValid?: boolean;
    isLoading?: boolean;
    closeOnBackdrop?: boolean;
    /**
     * @deprecated O Modal novo (Radix) gerencia scroll do body via overflow no
     * próprio ModalBody. Prop mantido para parity de assinatura — sem efeito.
     */
    scrollable?: boolean;
    footerExtra?: React__default.ReactNode;
}
declare const FormModal: React__default.FC<FormModalProps>;

/**
 * Enum completo do backend (`api-manutencao/recorrencia`). Por default o UI
 * dropdown mostra `hour|day|week|month` (contrato SGM atual). Callers podem
 * restringir ou expandir via `escalasVisiveis`.
 */
type RecorrenciaEscala = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
interface RecorrenciaValue {
    id?: number;
    valor: number;
    escala: RecorrenciaEscala;
    /** ISO 8601. Opcional — dominios sem agendamento temporal nao preenchem. */
    dataInicio?: string;
}
interface FrequenciaFormV2Props {
    /** `null` = estado "sem recorrencia". */
    value: RecorrenciaValue | null;
    onValorChange: (valor: number) => void;
    onEscalaChange: (escala: RecorrenciaEscala) => void;
    /**
     * Exigido apenas quando `showDataInicio !== false`. Aceita undefined para
     * limpar (dominios sem agendamento temporal).
     */
    onDataInicioChange?: (dataInicio: string | undefined) => void;
    /** Opcional — se definido, renderiza botao "Remover recorrencia" quando value !== null. */
    onClear?: () => void;
    disabled?: boolean;
    className?: string;
    /**
     * Escalas exibidas no dropdown (ordem preservada). Default mantem contrato
     * SGM atual: `['hour','day','week','month']`.
     */
    escalasVisiveis?: RecorrenciaEscala[];
    /**
     * Controla exibicao do campo "Data de inicio". Default true (SGM-OS).
     * Caderno/planoDeControle passam `false`.
     */
    showDataInicio?: boolean;
}
declare const FrequenciaFormV2: ({ value, onValorChange, onEscalaChange, onDataInicioChange, onClear, disabled, className, escalasVisiveis, showDataInicio, }: FrequenciaFormV2Props) => react_jsx_runtime.JSX.Element;

/**
 * ContadorPicker — componente props-driven (zero Redux, zero useCoreService).
 *
 * Substitui o padrao legado `withGenericPicker(LimiteDeControlePicker)` por
 * um componente autonomo que recebe `value` + callbacks explicitos. A
 * camada de estado (Redux/slice) fica em useContadorViewModel no core-sdk.
 *
 * Sprint 2026-04-20 code-split-fix — Track C.2 UI.
 * Sprint 2026-05-08 ui-kit Tailwind migration — refatorado p/ primitivos
 * Tailwind+Radix do ui-kit-core (Button/TextField/InputGroup/DataTable),
 * removendo dependencia de react-bootstrap. API publica preservada.
 */
type ContadorBoundRule = '>=' | '<=' | '>' | '<' | '==' | '!=';
interface ContadorLimite {
    nome?: string;
    boundRule?: string;
    valor?: number | string;
    [k: string]: unknown;
}
interface ContadorPickerValue {
    valor: number | null;
    unidade: string | null;
    parametro: string | null;
    limitesDeControle: ContadorLimite[];
}
interface ContadorPickerProps {
    value: ContadorPickerValue;
    onValorChange: (v: number | null) => void;
    onUnidadeChange: (u: string) => void;
    onParametroChange: (p: string) => void;
    onLimiteAdd: (limite: ContadorLimite) => void;
    onLimiteRemove: (index: number) => void;
    onLimiteUpdate: (index: number, limite: ContadorLimite) => void;
    /** Desabilita todos os inputs (readOnly de fato). */
    disabled?: boolean;
    /** Oculta o bloco de limites de controle (quando nao relevante). */
    hideLimites?: boolean;
    /** Placeholder do campo parametro. */
    parametroPlaceholder?: string;
    /** Placeholder do campo unidade. */
    unidadePlaceholder?: string;
    className?: string;
}
declare const ContadorPicker: React__default.FC<ContadorPickerProps>;

interface AnexoPersistedItem {
    id: string | number;
    /** API costuma devolver `originalName` em vez de `nome`. */
    nome?: string;
    originalName?: string;
    /** Chave GCS/S3 — necessária para pedir signed URL de leitura. */
    key?: string;
    tipo?: string;
    /** API batch: `image/jpeg` etc. (alias a `tipo` se necessário) */
    mimeType?: string;
    tamanho?: number;
    url?: string;
    signedUrl?: string;
    createdAt?: string;
    unavailable?: boolean;
}
interface AnexoLocalItem {
    localId: string;
    file: File;
    nome: string;
    tipo: string;
    tamanho: number;
    progress: number;
    status: 'pending' | 'uploading' | 'done' | 'error';
    errorMessage?: string;
}
interface AnexoManagerProps {
    /** Anexos ja persistidos (vindos da API). */
    persistidos?: AnexoPersistedItem[];
    /** Anexos locais (fila de upload). */
    locais?: AnexoLocalItem[];
    /** Chamado ao adicionar arquivos (drag/click). */
    onAddFiles?: (files: File[]) => void;
    /** Chamado ao remover um local da fila. */
    onRemoveLocal?: (localId: string) => void;
    /** Chamado ao remover um persistido. */
    onRemovePersistido?: (id: string | number) => void;
    /** Chamado ao clicar download/preview. Deve retornar URL. */
    onDownload?: (anexo: AnexoPersistedItem) => void;
    /** Chamado ao clicar retry num arquivo com erro. */
    onRetry?: (localId: string) => void;
    /** Se true, mostra spinner de loading geral. */
    loading?: boolean;
    /** Modo read-only (sem upload/delete). */
    readonly?: boolean;
    /** Tamanho maximo por arquivo em bytes (default 50MB). */
    maxFileSize?: number;
    /** Maximo de arquivos simultaneos (default 10). */
    maxFiles?: number;
    /** Label customizado para a dropzone. */
    dropzoneLabel?: string;
    /**
     * Resolve URL de leitura assinada (ex. `getUrl(id, key)`) — necessário se `url`/`signedUrl` não
     * vêm do backend e ainda quiser miniatura de imagem + lightbox.
     */
    getImageReadUrl?: (anexo: AnexoPersistedItem) => Promise<string>;
}
declare const AnexoManager: React__default.FC<AnexoManagerProps>;

/**
 * ClickToWriteField — campo de texto props-driven para edicao inline.
 *
 * Promovido de teraprox-SGM-OS `InnerEditableTextField` na Wave 5C da sprint
 * 2026-04-21-ui-kit-domain-split-wave0. Zero Redux, zero dominio — apenas
 * state local + callbacks explicitos. Caller controla `isActive` (quando
 * exibir) e `onHide` (quando o blur ocorre).
 *
 * API retrocompativel com `InnerEditableTextField`:
 *  - `value`, `onChange(value)`
 *  - `label`, `placeholder`, `disabled`
 *  - `onEnterPress(value)` — opcional, disparado no Enter
 *  - `onHide(value)` — opcional, disparado no blur (usado para fechar modo edicao)
 *
 * Props `isActive`, `initialValue`, `fallBack` sao absorvidas (compat com
 * callers legados) mas nao vazam para o DOM — evitam React warnings.
 *
 * Refator Tailwind (sprint 2026-05-08 ui-kit Tailwind migration, D3):
 *  - Substitui `Form.Group` + `Form.Label` + `Form.Control` (react-bootstrap)
 *    pelo composite `TextField` (ui-kit-core L1, Tailwind+Radix).
 *  - API externa preservada 100%.
 */
interface ClickToWriteFieldProps {
    value?: string | number | null;
    onChange?: (value: string) => void;
    label?: React__default.ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onEnterPress?: (value: string) => void;
    onHide?: (value: string) => void;
    isActive?: boolean;
    initialValue?: string;
    fallBack?: unknown;
    [key: string]: unknown;
}
declare const ClickToWriteField: React__default.FC<ClickToWriteFieldProps>;

/**
 * CombineModeToggle — toggle visual com ícones de Venn para modos de combinação
 * de filtros multi-select. Props-driven (zero Redux, zero dominio).
 *
 * Use em conjunto com `useFilterCombineMode` do `teraprox-core-sdk`:
 *
 * ```tsx
 * const combine = useFilterCombineMode('union')
 * <CombineModeToggle mode={combine.mode} onChange={combine.setMode} />
 * ```
 */
type CombineMode = 'union' | 'intersection' | 'xor';
interface CombineModeToggleProps {
    mode: CombineMode;
    onChange: (mode: CombineMode) => void;
    /** Exibe rótulo junto aos ícones. */
    showLabel?: boolean;
    disabled?: boolean;
    /** Tamanho do ícone em pixels. Default: 18. */
    size?: number;
    className?: string;
}
declare const CombineModeToggle: React__default.FC<CombineModeToggleProps>;

interface ColorPickerProps {
    defaultColor?: string;
    setCor: (hex: string) => void;
    disabled?: boolean;
    label?: string;
}
declare function ColorPicker({ defaultColor, setCor, disabled, label }: ColorPickerProps): react_jsx_runtime.JSX.Element;

/**
 * FormActionButtons — @hashcodeti/ui-kit-core
 *
 * Agrupamento padrão de botões de ação para formulários (Cancelar, Excluir, Salvar
 * + opcionais Voltar e Copiar). Props-driven (zero Redux, zero useCoreService).
 *
 * Cada botão renderiza apenas se seu callback for fornecido E sua flag `show*`
 * não estiver explicitamente em `false` — permitindo esconder botões pontualmente
 * sem remover o callback (útil para alternar visibilidade por permissão/estado).
 *
 * Inclui:
 *   - Confirmação modal de exclusão (DeleteConfirm)
 *   - Variante "hold-to-delete" (manter pressionado por N ms) para ações destrutivas
 *   - Wrapper opcional de permissão para o botão Excluir
 *
 * Promovido de teraprox-ui-kit/buttons/ActionButtons para ui-kit-core em 2026-04-30
 * para virar padrão de todo formulário do ecossistema.
 *
 * Refatorado 2026-05-13: migrado de react-bootstrap para primitivos
 * Tailwind+Radix (Button, Progress) do próprio ui-kit-core. API pública intacta.
 */

interface FormActionButtonsProps {
    /** Callback Salvar — botão renderiza se callback presente e showSave !== false. */
    onSave?: () => void;
    saveLabel?: string;
    saveVariant?: string;
    showSave?: boolean;
    /** Callback Excluir — botão só renderiza em modo edição (isEditing). */
    onDelete?: (details?: string) => void;
    deleteLabel?: string;
    deleteConfirmMsg?: string;
    needExclusionDetails?: boolean;
    showDelete?: boolean;
    /** Callback Voltar (chevron). */
    onBack?: () => void;
    backLabel?: string;
    showBack?: boolean;
    /** Callback Cancelar Edição (rotate-icon, variant warning). */
    onCancelEdit?: () => void;
    cancelEditLabel?: string;
    showCancelEdit?: boolean;
    /** Callback Copiar Formulário (só em modo edição). */
    onCopy?: () => void;
    copyLabel?: string;
    showCopy?: boolean;
    /** Estado meta — habilita Excluir/Cancelar/Copiar. */
    isEditing?: boolean;
    /** Desabilita todos os botões. */
    disabled?: boolean;
    /** Hold-to-delete (segurar N ms) ao invés de modal de confirmação. */
    useDelayedDelete?: boolean;
    delayedDeleteTimeout?: number;
    /** Wrapper opcional de permissão envolvendo o botão Excluir. */
    PermissionWrapper?: React__default.ComponentType<{
        children: React__default.ReactNode;
        id?: string;
    }>;
    /** Classe adicional no container. */
    className?: string;
}
declare const FormActionButtons: React__default.FC<FormActionButtonsProps>;

/**
 * DeleteConfirm — @hashcodeti/ui-kit-core
 *
 * Modal de confirmação de exclusão padronizado, props-driven (zero Redux).
 * Promovido de teraprox-ui-kit/forms/DeleteConfirm para ui-kit-core em 2026-04-30
 * como dependência interna do FormActionButtons.
 *
 * Refatorado em 2026-05-13 para Tailwind+Radix (ui-kit-core primitives).
 * API pública (DeleteConfirmProps) preservada — adapter interno mapeia
 * `show`→`open` do Modal novo. Usa TextField (multiline) em vez de Form.Control.
 */

interface DeleteConfirmProps {
    show: boolean;
    onHide: (show: boolean) => void;
    onConfirm: (details: string) => void;
    title?: string;
    dialogText?: string | ((payload: unknown) => string);
    payload?: unknown;
    needExclusionDetails?: boolean;
    minDetailsLength?: number;
}
declare const DeleteConfirm: React__default.FC<DeleteConfirmProps>;

/**
 * IconWithBadge — ícone com badge numérico opcional (ex.: contagem de itens).
 *
 * Promovido de `teraprox-SGM-OS/Components/default-components/icons/IconWithBadge.tsx`
 * para `@hashcodeti/ui-kit-core` na sprint 2026-04-29 (tarefa-item-unified, Phase 2).
 * Cross-domain (SGM/SGP) e apresentacional puro — zero Redux, zero IO.
 *
 * Modos:
 *  - `overlay` (default): badge sobreposto no canto superior direito do ícone
 *  - `inline`: ícone + badge lado-a-lado, com gap
 *
 * Refatorado 2026-05-13: migrado de react-bootstrap `<Badge>` para o primitivo
 * `Badge` Tailwind+cva do próprio ui-kit-core. API pública intacta — `bg`
 * mantido (mapeia 1:1 para `tone` do Badge novo, com shim deprecation interno).
 */
type IconWithBadgeMode = 'overlay' | 'inline';
type IconWithBadgeBg = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
interface IconWithBadgeProps {
    /** Conteúdo do ícone (tipicamente um <FaXxx /> de react-icons) */
    icon: React__default.ReactNode;
    /** Conteúdo do badge. Se for falsy/0, o badge não é renderizado. */
    content?: React__default.ReactNode;
    /** `overlay` (default) ou `inline` */
    mode?: IconWithBadgeMode;
    /** Tom do badge (compat react-bootstrap, default `danger`) */
    bg?: IconWithBadgeBg;
}
declare const IconWithBadge: React__default.FC<IconWithBadgeProps>;

interface DividerWithButtonProps {
    /** Texto do botão central. Quando ausente, renderiza apenas o ícone. */
    label?: React.ReactNode;
    /** Ícone (opcional). Default: símbolo `+` SVG inline. */
    icon?: React.ReactNode;
    /** Callback de clique do botão. */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /** Variante do Button. Default `outline-secondary`. */
    variant?: ButtonVariant;
    /** Tamanho do Button. Default `sm`. */
    size?: ButtonSize;
    /** Desabilita o botão (mantém divisores visíveis). */
    disabled?: boolean;
    /** className do wrapper externo. */
    className?: string;
    /** Children opcional renderizado entre os segmentos (substitui Button quando presente). */
    children?: React.ReactNode;
}
/**
 * DividerWithButton — divisor horizontal com botão (ou children) centralizado.
 *
 * @example
 * <DividerWithButton label="Adicionar item" onClick={handleAdd} />
 *
 * @example
 * // Apenas ícone
 * <DividerWithButton onClick={handleAdd} />
 *
 * @example
 * // Conteúdo custom no centro
 * <DividerWithButton><MyMenu /></DividerWithButton>
 */
declare const DividerWithButton: React.FC<DividerWithButtonProps>;

interface TextWithMoreProps {
    /** Texto a ser exibido */
    text?: string;
    /** Comprimento máximo antes de truncar */
    maxLength: number;
    /** Label para 'ver mais' (default: ver mais) */
    moreLabel?: string;
    /** Label para 'ver menos' (default: ver menos) */
    lessLabel?: string;
    /** Classes extras no span de conteúdo */
    className?: string;
}
declare const TextWithMore: React.FC<TextWithMoreProps>;

interface YearMonthRange {
    dataInicio: string;
    dataFim: string;
}
interface YearMonthSelection {
    dataInicio: string | null;
    dataFim: string | null;
    ranges: YearMonthRange[];
}
interface YearMonthsSelectorProps {
    dataInicio?: string | null;
    dataFim?: string | null;
    onSelect: (selection: YearMonthSelection) => void;
    className?: string;
}
declare const YearMonthsSelector: React.FC<YearMonthsSelectorProps>;

interface QrCodeGeneratorButtonProps {
    /** Valor a codificar no QR */
    value?: string | null;
    /** Label do botão (default 'QR Code') */
    label?: string;
    /** Desabilitar */
    disabled?: boolean;
    /** Variant do Button (default 'outline-secondary') */
    variant?: ButtonVariant;
    /** Tamanho (default 'sm') */
    size?: ButtonSize;
    /** Handler customizado — quando ausente, exibe `alert` com o valor */
    onClick?: (value: string) => void;
    className?: string;
}
declare const QrCodeGeneratorButton: React.FC<QrCodeGeneratorButtonProps>;

declare const dropzoneVariants: (props?: ({
    state?: "disabled" | "active" | "idle" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ImageAttachmentSize = NonNullable<VariantProps<typeof dropzoneVariants>['size']>;
interface ImageAttachmentProps {
    /** Callback emitido com arquivos válidos selecionados/dropados. */
    onAttachments: (files: File[]) => void;
    /** Tamanho máximo por arquivo em bytes. Sem limite quando ausente. */
    maxSize?: number;
    /** MIME types ou extensões aceitos (ex.: ['image/*', '.pdf']). Sem restrição quando ausente. */
    acceptedTypes?: string[];
    /** Permitir múltiplos arquivos. Default true. */
    multiple?: boolean;
    /** Desabilita interação. */
    disabled?: boolean;
    /** Texto auxiliar dentro do dropzone. */
    label?: React.ReactNode;
    /** Callback para arquivos descartados pela validação. */
    onReject?: (rejected: File[]) => void;
    /** Tamanho do dropzone. Default 'md'. */
    size?: ImageAttachmentSize;
    /** className do wrapper (dropzone). */
    className?: string;
}
/**
 * ImageAttachment — dropzone primitivo drag-drop + file picker.
 *
 * @example
 * <ImageAttachment
 *   onAttachments={(files) => uploadAll(files)}
 *   acceptedTypes={['image/*', '.pdf']}
 *   maxSize={5 * 1024 * 1024}
 * />
 */
declare const ImageAttachment: React.ForwardRefExoticComponent<ImageAttachmentProps & React.RefAttributes<HTMLInputElement>>;

interface DateRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    startDate?: string;
    endDate?: string;
    onStartChange?: (value: string) => void;
    onEndChange?: (value: string) => void;
    /** Label para o input de início (a11y, default não mostra). */
    startLabel?: string;
    /** Label para o input de fim (a11y, default não mostra). */
    endLabel?: string;
    /** Tamanho dos inputs. Compat com TextField sizes. */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
}
/**
 * DateRange — par de inputs date (início + fim).
 *
 * @example
 * <DateRange startDate={start} endDate={end}
 *   onStartChange={setStart} onEndChange={setEnd} />
 */
declare const DateRange: React.ForwardRefExoticComponent<DateRangeProps & React.RefAttributes<HTMLDivElement>>;
/** Alias compat — legado usava `DateRangeField`. */
declare const DateRangeField: React.ForwardRefExoticComponent<DateRangeProps & React.RefAttributes<HTMLDivElement>>;

interface CountdownButtonProps {
    /** Callback executado quando o countdown chega a 0 e o usuário clica novamente. */
    callback: () => void;
    /** Tempo em segundos do countdown antes de habilitar a confirmação. */
    countdownTime: number;
    /** Callback opcional executado ao cancelar. */
    callback2?: () => void;
    /** Label do botão (default "Confirmar"). */
    label?: string;
    /** Label do botão de cancelar (default "Cancelar"). */
    cancelLabel?: string;
}
/**
 * CountdownButton — confirmação destrutiva com countdown.
 *
 * Click 1 → ativa countdown.
 * Click 2 (após countdown=0) → executa `callback`.
 * Cancelar → executa `callback2` (se fornecido) e reseta.
 *
 * @example
 * <CountdownButton callback={onDelete} countdownTime={5} />
 */
declare const CountdownButton: React.FC<CountdownButtonProps>;

interface SaveButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
    label?: string;
    loading?: boolean;
}
declare const SaveButton: React.FC<SaveButtonProps>;
interface CancelEditButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
    label?: string;
    loading?: boolean;
}
declare const CancelEditButton: React.FC<CancelEditButtonProps>;
interface DeleteButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
    label?: string;
    isVisible?: boolean;
    needExclusionDetails?: boolean;
    confirmMessage?: React.ReactNode;
    onConfirm?: (details: string) => void;
    loading?: boolean;
}
declare const DeleteButton: React.FC<DeleteButtonProps>;

interface GridContainerItem {
    component: React.ReactNode;
    key?: React.Key;
}
interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array de items renderizados como células do grid (cada item.component em sua célula). */
    items?: GridContainerItem[];
    /** Filhos renderizados quando `items` não é fornecido. */
    children?: React.ReactNode;
    /** Estilo inline (compat com legado). Prefira `className` Tailwind. */
    containerStyle?: React.CSSProperties;
    /** className adicional. */
    className?: string;
}
/**
 * GridContainer — wrapper grid responsivo.
 *
 * @example
 * <GridContainer items={[{ component: <Card /> }, { component: <Card /> }]} />
 *
 * @example
 * <GridContainer className="grid-cols-3 gap-4"><div>A</div><div>B</div></GridContainer>
 */
declare const GridContainer: React.ForwardRefExoticComponent<GridContainerProps & React.RefAttributes<HTMLDivElement>>;

interface LoadingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Quantidade de linhas-skeleton renderizadas (default 3). */
    lines?: number;
    /** className adicional aplicado ao wrapper. */
    className?: string;
}
/**
 * LoadingBlock — bloco skeleton com várias linhas pulsantes.
 *
 * @example
 * <LoadingBlock />
 *
 * @example
 * <LoadingBlock lines={5} className="max-w-md" />
 */
declare const LoadingBlock: React.ForwardRefExoticComponent<LoadingBlockProps & React.RefAttributes<HTMLDivElement>>;

interface InformativeOverlayItem {
    icon?: React.ReactNode;
    label: React.ReactNode;
}
interface InformativeOverlayProps {
    contentItems?: InformativeOverlayItem[];
    /** Posicionamento do tooltip (default 'top'). */
    placement?: 'top' | 'bottom' | 'left' | 'right';
    /** Trigger custom; se omitido, renderiza ícone "i" padrão. */
    children?: React.ReactNode;
    /** className aplicado ao wrapper trigger. */
    className?: string;
}
/**
 * InformativeOverlay — ícone (ou nó custom) que ao hover/focus mostra lista de itens informativos.
 *
 * @example
 * <InformativeOverlay contentItems={[
 *   { icon: <FaCheck />, label: 'Concluído quando X' },
 *   { label: 'Revisado por Y' },
 * ]} />
 */
declare const InformativeOverlay: React.FC<InformativeOverlayProps>;

/**
 * GenericPickerHost — @hashcodeti/ui-kit-core/picker
 *
 * View pura props-driven que substitui o HOC factory `withGenericPicker`
 * (522 LOC) duplicado em SGM-OS + SGM-UTILS. Consome a Port
 * `IGenericPickerViewModel` (core-sdk) + render-props para `renderForm`
 * e `renderDisplay`.
 *
 * Responsabilidades cobertas (espelha o HOC legado):
 *  - Toggle entre modo "display" (lista de itens picked + botao add) e
 *    modo "form" (renderForm chamado com `onPick`).
 *  - Edicao inline: clicar em um item chama `onItemEdit` opcional do caller
 *    e marca o ViewModel como editing — botao "Salvar Edicao" dispara commit.
 *  - Remocao com confirmacao (DeleteConfirm) opcional.
 *  - Suporte a `singlePick`, `readOnlyMode`, `hideOptions`.
 *
 * NAO conhece Redux. NAO conhece HTTP. Recebe ViewModel pronto.
 *
 * Sprint Wave H.5 — 2026-05-13.
 */

type GenericPickerRenderFormProps<T extends GenericPickerItem> = {
    /** Funcao a ser chamada pelo form quando um novo item for selecionado/criado. */
    onPick: (item: T) => void;
    /** Item em edicao (null se add). */
    editingItem: T | null;
    /** Indice em edicao (null se add). */
    editingIndex: number | null;
    /** Fecha o painel sem salvar. */
    onCancel: () => void;
};
type GenericPickerRenderItemProps<T extends GenericPickerItem> = {
    item: T;
    index: number;
    onEdit: () => void;
    onDelete: () => void;
    readOnly: boolean;
};
interface GenericPickerHostProps<T extends GenericPickerItem = GenericPickerItem> {
    /** ViewModel hexagonal — fonte unica de verdade do estado. */
    viewModel: IGenericPickerViewModel<T>;
    /** Render-prop do form de selecao/criacao. */
    renderForm: (props: GenericPickerRenderFormProps<T>) => React__default.ReactNode;
    /**
     * Render-prop opcional de item — quando ausente cai num display textual
     * default usando `displayKey` ou `formatItem`.
     */
    renderItem?: (props: GenericPickerRenderItemProps<T>) => React__default.ReactNode;
    /** Texto do botao que abre o picker quando vazio. */
    displayButtonName?: string;
    /** Titulo exibido sobre a lista de itens picked. */
    optionDisplayName?: string;
    /** Titulo do painel quando aberto. */
    displayName?: string;
    /** Chave do objeto a ser usada para rotular itens (default: id). */
    optionDisplayKey?: string;
    /** Formatador customizado (substitui `optionDisplayKey`). */
    formatItem?: (item: T, index: number) => React__default.ReactNode;
    /** Texto da caixa de confirmacao de delete (string ou fn(payload)). */
    deleteDialogText?: string | ((payload: {
        item: T;
        index: number;
    }) => string);
    /** Titulo da caixa de confirmacao de delete. */
    deleteTitle?: string;
    /** Quando true, esconde a lista de items picked. */
    hideOptions?: boolean;
    /** Quando true, picker em modo somente leitura (sem add/remove/edit). */
    readOnlyMode?: boolean;
    /** Quando true, mostra a lista de picked dentro do painel mesmo em edit. */
    showOptionsWhenEdit?: boolean;
    /** Estilos opcionais do container do painel aberto. */
    containerClassName?: string;
    /** Cor de fundo do painel (legacy compat). */
    parentColor?: string;
    /** Disparado quando o painel abre (UX hook). */
    onPickerOpen?: () => void;
    /** Disparado quando o painel fecha (UX hook). */
    onPickerClose?: () => void;
    /** Permite ao caller transformar o item recem escolhido antes do commit. */
    onSelectedOption?: (item: T) => T;
}
declare function GenericPickerHost<T extends GenericPickerItem = GenericPickerItem>(props: GenericPickerHostProps<T>): React__default.ReactElement;

export { Accordion, AccordionContent, type AccordionContentProps, AccordionHeader, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, type AccordionVariant, Alert, type AlertProps, type AlertSize, type AlertTone, type AnexoLocalItem, AnexoManager, type AnexoManagerProps, type AnexoPersistedItem, Badge, type BadgeProps, type BadgeSize, type BadgeTone, type BadgeVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, CancelEditButton, type CancelEditButtonProps, Card, CardBody, CardFooter, CardHeader, type CardPadding, type CardProps, type CardSlotProps, type CardVariant, Checkbox, type CheckboxProps, type CheckboxSize, type CheckboxTone, ClickToWriteField, type ClickToWriteFieldProps, Collapsible, CollapsibleContent, type CollapsibleContentProps, type CollapsibleProps, CollapsibleTrigger, type CollapsibleTriggerProps, ColorPicker, type ColorPickerProps, type CombineMode, CombineModeToggle, type CombineModeToggleProps, type ContadorBoundRule, type ContadorLimite, ContadorPicker, type ContadorPickerProps, type ContadorPickerValue, CountdownButton, type CountdownButtonProps, DataTable, type DataTableCellContext, type DataTableColumn, type DataTableEmptyState, DataTablePagination, type DataTablePaginationProps, type DataTableProps, DataTableRow, type DataTableRowAction, type DataTableRowProps, type DataTableSelectionMode, type DataTableSize, type DataTableSort, type DataTableSortDirection, DataTableToolbar, type DataTableToolbarProps, type DataTableVariant, DateRange, DateRangeField, type DateRangeProps, DeleteButton, type DeleteButtonProps, DeleteConfirm, type DeleteConfirmProps, DividerWithButton, type DividerWithButtonProps, DropdownMenu, DropdownMenuCheckboxItem, type DropdownMenuCheckboxItemProps, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuGroup, DropdownMenuItem, type DropdownMenuItemProps, DropdownMenuLabel, type DropdownMenuLabelProps, DropdownMenuPortal, type DropdownMenuProps, DropdownMenuRadioGroup, DropdownMenuRadioItem, type DropdownMenuRadioItemProps, DropdownMenuSeparator, type DropdownMenuSeparatorProps, DropdownMenuShortcut, type DropdownMenuShortcutProps, type DropdownMenuSize, DropdownMenuSub, DropdownMenuSubContent, type DropdownMenuSubContentProps, DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps, DropdownMenuTrigger, type DropdownMenuVariant, EmptyState, type EmptyStateProps, type EmptyStateSize, type EmptyStateVariant, FieldError, type FieldErrorProps, FieldHint, type FieldHintProps, FieldLabel, type FieldLabelProps, FormActionButtons, type FormActionButtonsProps, FormModal, type FormModalProps, FrequenciaFormV2, type FrequenciaFormV2Props, GenericPickerHost, type GenericPickerHostProps, type GenericPickerRenderFormProps, type GenericPickerRenderItemProps, GridContainer, type GridContainerItem, type GridContainerProps, IconWithBadge, type IconWithBadgeBg, type IconWithBadgeMode, type IconWithBadgeProps, ImageAttachment, type ImageAttachmentProps, type ImageAttachmentSize, InformativeOverlay, type InformativeOverlayItem, type InformativeOverlayProps, InputGroup, InputGroupAddon, type InputGroupAddonProps, InputGroupButton, type InputGroupButtonProps, type InputGroupProps, type InputGroupSize, InputGroupText, type InputGroupTextProps, List, ListItem, ListItemAction, type ListItemActionProps, ListItemContent, type ListItemContentProps, type ListItemProps, type ListProps, type ListSize, type ListVariant, LoadingBlock, type LoadingBlockProps, Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, type ModalProps, type ModalSize, type ModalSlotProps, Popover, type PopoverAlign, PopoverAnchor, PopoverArrow, type PopoverArrowProps, PopoverClose, PopoverContent, type PopoverContentProps, PopoverPortal, type PopoverProps, type PopoverSide, type PopoverSize, PopoverTrigger, type PopoverVariant, Progress, type ProgressProps, type ProgressSize, type ProgressTone, type ProgressVariant, QrCodeGeneratorButton, type QrCodeGeneratorButtonProps, type RecorrenciaEscala, type RecorrenciaValue, SaveButton, type SaveButtonProps, SearchBar, type SearchBarProps, type SearchBarSize, Select, SelectContent, type SelectContentProps, SelectGroup, SelectItem, type SelectItemProps, SelectLabel, SelectPortal, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, type SelectSize, SelectTrigger, type SelectTriggerProps, SelectValue, type SelectVariant, Sheet, SheetBody, SheetClose, SheetContent, type SheetContentProps, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, type SheetProps, SheetRoot, type SheetSide, type SheetSize, type SheetSlotProps, SheetTitle, SheetTrigger, Spinner, type SpinnerProps, type SpinnerSize, type SpinnerTone, type SpinnerVariant, StatusLight, type StatusLightProps, type StatusLightSize, type StatusLightTone, Switch, type SwitchProps, type SwitchSize, type SwitchTone, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsProps, type TabsSize, TabsTrigger, type TabsTriggerProps, type TabsVariant, TextField, type TextFieldProps, type TextFieldSize, type TextFieldVariant, TextWithMore, type TextWithMoreProps, ToastAction, type ToastActionDescriptor, type ToastActionProps, ToastClose, type ToastCloseProps, ToastDescription, type ToastDescriptionProps, type ToastItem, type ToastOptions, type ToastProps, ToastProvider, type ToastProviderProps, ToastRoot, type ToastSize, ToastTitle, type ToastTitleProps, type ToastTone, ToastViewport, type ToastViewportProps, Toaster, type ToasterProps, Tooltip, type TooltipAlign, TooltipContent, type TooltipContentProps, type TooltipProps, TooltipProvider, TooltipRoot, type TooltipSide, type TooltipSize, TooltipTrigger, type TooltipVariant, type UseToastReturn, type YearMonthRange, type YearMonthSelection, YearMonthsSelector, type YearMonthsSelectorProps, accordionContentVariants, accordionItemVariants, accordionTriggerVariants, accordionRootVariants as accordionVariants, alertVariants, badgeVariants, buttonVariants, cardVariants, checkboxVariants, cn, contentVariants, dataTableVariants, dropdownMenuContentVariants, emptyStateVariants, inputGroupVariants, inputVariants, listVariants, popoverContentVariants, rootVariants as progressVariants, searchBarVariants, selectContentVariants, selectTriggerVariants, sheetContentVariants, spinnerVariants, statusLightVariants, switchVariants, tabsListVariants, tabsTriggerVariants, toastVariants, tooltipContentVariants, useInputGroupContext, useToast };
