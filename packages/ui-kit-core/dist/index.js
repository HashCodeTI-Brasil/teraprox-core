"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionHeader: () => AccordionHeader,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  Alert: () => Alert,
  AnexoManager: () => AnexoManager,
  Badge: () => Badge,
  Button: () => Button,
  CancelEditButton: () => CancelEditButton,
  Card: () => Card,
  CardBody: () => CardBody,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  Checkbox: () => Checkbox,
  ClickToWriteField: () => ClickToWriteField,
  Collapsible: () => Collapsible,
  CollapsibleContent: () => CollapsibleContent,
  CollapsibleTrigger: () => CollapsibleTrigger,
  ColorPicker: () => ColorPicker,
  CombineModeToggle: () => CombineModeToggle,
  ContadorPicker: () => ContadorPicker,
  CountdownButton: () => CountdownButton,
  DataTable: () => DataTable,
  DataTablePagination: () => DataTablePagination,
  DataTableRow: () => DataTableRow,
  DataTableToolbar: () => DataTableToolbar,
  DateRange: () => DateRange,
  DateRangeField: () => DateRangeField,
  DeleteButton: () => DeleteButton,
  DeleteConfirm: () => DeleteConfirm,
  DividerWithButton: () => DividerWithButton,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuPortal: () => DropdownMenuPortal,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuShortcut: () => DropdownMenuShortcut,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  EmptyState: () => EmptyState,
  FieldError: () => FieldError,
  FieldHint: () => FieldHint,
  FieldLabel: () => FieldLabel,
  FormActionButtons: () => FormActionButtons,
  FormModal: () => FormModal,
  FrequenciaFormV2: () => FrequenciaFormV2,
  GenericPickerHost: () => GenericPickerHost,
  GridContainer: () => GridContainer,
  IconWithBadge: () => IconWithBadge,
  ImageAttachment: () => ImageAttachment,
  InformativeOverlay: () => InformativeOverlay,
  InputGroup: () => InputGroup,
  InputGroupAddon: () => InputGroupAddon,
  InputGroupButton: () => InputGroupButton,
  InputGroupText: () => InputGroupText,
  List: () => List,
  ListItem: () => ListItem,
  ListItemAction: () => ListItemAction,
  ListItemContent: () => ListItemContent,
  LoadingBlock: () => LoadingBlock,
  Modal: () => Modal,
  ModalBody: () => ModalBody,
  ModalDescription: () => ModalDescription,
  ModalFooter: () => ModalFooter,
  ModalHeader: () => ModalHeader,
  Popover: () => Popover,
  PopoverAnchor: () => PopoverAnchor,
  PopoverArrow: () => PopoverArrow,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverPortal: () => PopoverPortal,
  PopoverTrigger: () => PopoverTrigger,
  Progress: () => Progress,
  QrCodeGeneratorButton: () => QrCodeGeneratorButton,
  SaveButton: () => SaveButton,
  SearchBar: () => SearchBar,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectGroup: () => SelectGroup,
  SelectItem: () => SelectItem,
  SelectLabel: () => SelectLabel,
  SelectPortal: () => SelectPortal,
  SelectScrollDownButton: () => SelectScrollDownButton,
  SelectScrollUpButton: () => SelectScrollUpButton,
  SelectSeparator: () => SelectSeparator,
  SelectTrigger: () => SelectTrigger,
  SelectValue: () => SelectValue,
  Sheet: () => Sheet,
  SheetBody: () => SheetBody,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetDescription: () => SheetDescription,
  SheetFooter: () => SheetFooter,
  SheetHeader: () => SheetHeader,
  SheetOverlay: () => SheetOverlay,
  SheetPortal: () => SheetPortal,
  SheetRoot: () => SheetRoot,
  SheetTitle: () => SheetTitle,
  SheetTrigger: () => SheetTrigger,
  Spinner: () => Spinner2,
  StatusLight: () => StatusLight,
  Switch: () => Switch,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  TextField: () => TextField,
  TextWithMore: () => TextWithMore,
  ToastAction: () => ToastAction,
  ToastClose: () => ToastClose,
  ToastDescription: () => ToastDescription,
  ToastProvider: () => ToastProvider,
  ToastRoot: () => ToastRoot,
  ToastTitle: () => ToastTitle,
  ToastViewport: () => ToastViewport,
  Toaster: () => Toaster,
  Tooltip: () => Tooltip,
  TooltipContent: () => TooltipContent,
  TooltipProvider: () => TooltipProvider,
  TooltipRoot: () => TooltipRoot,
  TooltipTrigger: () => TooltipTrigger,
  YearMonthsSelector: () => YearMonthsSelector,
  accordionContentVariants: () => accordionContentVariants,
  accordionItemVariants: () => accordionItemVariants,
  accordionTriggerVariants: () => accordionTriggerVariants,
  accordionVariants: () => accordionRootVariants,
  alertVariants: () => alertVariants,
  badgeVariants: () => badgeVariants,
  buttonVariants: () => buttonVariants,
  cardVariants: () => cardVariants,
  checkboxVariants: () => checkboxVariants,
  cn: () => cn,
  contentVariants: () => contentVariants,
  dataTableVariants: () => dataTableVariants,
  dropdownMenuContentVariants: () => dropdownMenuContentVariants,
  emptyStateVariants: () => emptyStateVariants,
  inputGroupVariants: () => inputGroupVariants,
  inputVariants: () => inputVariants,
  listVariants: () => listVariants,
  popoverContentVariants: () => popoverContentVariants,
  progressVariants: () => rootVariants,
  searchBarVariants: () => searchBarVariants,
  selectContentVariants: () => selectContentVariants,
  selectTriggerVariants: () => selectTriggerVariants,
  sheetContentVariants: () => sheetContentVariants,
  spinnerVariants: () => spinnerVariants,
  statusLightVariants: () => statusLightVariants,
  switchVariants: () => switchVariants,
  tabsListVariants: () => tabsListVariants,
  tabsTriggerVariants: () => tabsTriggerVariants,
  toastVariants: () => toastVariants,
  tooltipContentVariants: () => tooltipContentVariants,
  useInputGroupContext: () => useInputGroupContext,
  useToast: () => useToast
});
module.exports = __toCommonJS(src_exports);

// src/primitives/Button/Button.tsx
var React = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/primitives/Button/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  // base classes — sempre aplicadas
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium leading-none",
    "rounded-md",
    // border base transparente — neutraliza border UA-default do <button> em
    // consumidores com preflight: false (Bootstrap baseline). Os variants
    // outline-* sobrescrevem a cor; os solid mantêm border invisível.
    "border border-transparent appearance-none",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-accent",
    "disabled:opacity-50 disabled:pointer-events-none"
  ],
  {
    variants: {
      variant: {
        // Solid
        primary: "bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary-hover active:bg-brand-primary-active",
        secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 active:bg-neutral-400",
        success: "bg-success text-success-foreground hover:opacity-90 active:opacity-80",
        danger: "bg-error text-error-foreground hover:bg-error-hover active:opacity-80",
        warning: "bg-warning text-warning-foreground hover:opacity-90 active:opacity-80",
        info: "bg-info text-info-foreground hover:opacity-90 active:opacity-80",
        light: "bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-neutral-100 active:bg-neutral-200",
        dark: "bg-neutral-900 text-neutral-0 hover:bg-neutral-800 active:bg-neutral-700",
        link: "text-brand-primary underline-offset-4 hover:underline bg-transparent",
        // Outline
        "outline-primary": "border border-brand-primary text-brand-primary hover:bg-brand-primary-muted active:bg-brand-primary-muted",
        "outline-secondary": "border border-neutral-400 text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
        "outline-success": "border border-success text-success hover:bg-success-muted active:bg-success-muted",
        "outline-danger": "border border-error text-error hover:bg-error-muted active:bg-error-muted",
        "outline-warning": "border border-warning text-warning hover:bg-warning-muted active:bg-warning-muted",
        "outline-info": "border border-info text-info hover:bg-info-muted active:bg-info-muted"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base"
      },
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
);
var Spinner = ({ size }) => {
  const dim = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className: cn("animate-spin", dim),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          }
        )
      ]
    }
  );
};
var Button = React.forwardRef(
  ({
    className,
    variant,
    size,
    fullWidth,
    asChild = false,
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    type,
    ...props
  }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    const resolvedSize = size != null ? size : "md";
    const isDisabled = disabled || loading;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      Comp,
      {
        ref,
        type: asChild ? void 0 : type != null ? type : "button",
        className: cn(buttonVariants({ variant, size, fullWidth }), className),
        disabled: asChild ? void 0 : isDisabled,
        "aria-busy": loading || void 0,
        "data-loading": loading || void 0,
        ...props,
        children: [
          loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { size: resolvedSize }) : leftIcon,
          children,
          !loading && rightIcon
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/primitives/Card/Card.tsx
var React2 = __toESM(require("react"));
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime2 = require("react/jsx-runtime");
var cardVariants = (0, import_class_variance_authority2.cva)(
  "bg-surface-background text-surface-foreground rounded-lg overflow-hidden",
  {
    variants: {
      variant: {
        elevated: "shadow-md",
        outlined: "border border-surface-border",
        flat: "",
        interactive: "border border-surface-border shadow-sm transition-shadow hover:shadow-md cursor-pointer"
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6"
      }
    },
    defaultVariants: {
      variant: "elevated",
      padding: "none"
    }
  }
);
var CardRoot = React2.forwardRef(
  ({ className, variant, padding, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      ref,
      className: cn(cardVariants({ variant, padding }), className),
      ...props
    }
  )
);
CardRoot.displayName = "Card";
var CardHeader = React2.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      ref,
      className: cn(
        "px-4 py-3 border-b border-surface-border flex items-center justify-between",
        "font-semibold text-base",
        className
      ),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
var CardBody = React2.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref, className: cn("px-4 py-4", className), ...props })
);
CardBody.displayName = "CardBody";
var CardFooter = React2.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      ref,
      className: cn(
        "px-4 py-3 border-t border-surface-border flex items-center justify-end gap-2",
        className
      ),
      ...props
    }
  )
);
CardFooter.displayName = "CardFooter";
var Card = CardRoot;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// src/primitives/TextField/TextField.tsx
var React3 = __toESM(require("react"));
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime3 = require("react/jsx-runtime");
var inputVariants = (0, import_class_variance_authority3.cva)(
  [
    "block w-full rounded-md border bg-surface-background",
    "text-surface-foreground placeholder:text-neutral-400",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
    "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed",
    "read-only:bg-neutral-50 read-only:cursor-default"
  ],
  {
    variants: {
      variant: {
        outlined: "border-surface-border focus-visible:border-brand-primary",
        filled: "border-transparent bg-neutral-100 focus-visible:bg-surface-background focus-visible:border-brand-primary"
      },
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base"
      },
      hasError: {
        true: "border-error focus-visible:ring-error/40 focus-visible:border-error",
        false: ""
      }
    },
    defaultVariants: {
      variant: "outlined",
      size: "md",
      hasError: false
    }
  }
);
var FieldLabel = React3.forwardRef(
  ({ className, required, optional, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "label",
    {
      ref,
      className: cn(
        "block text-sm font-medium text-neutral-700 mb-1",
        className
      ),
      ...props,
      children: [
        children,
        required && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", className: "ml-0.5 text-error", children: "*" }),
        optional && !required && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ml-1 text-xs text-neutral-400 font-normal", children: "(opcional)" })
      ]
    }
  )
);
FieldLabel.displayName = "FieldLabel";
var FieldError = React3.forwardRef(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "p",
      {
        ref,
        role: "alert",
        className: cn("mt-1 text-xs text-error", className),
        ...props,
        children
      }
    );
  }
);
FieldError.displayName = "FieldError";
var FieldHint = React3.forwardRef(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "p",
      {
        ref,
        className: cn("mt-1 text-xs text-neutral-500", className),
        ...props,
        children
      }
    );
  }
);
FieldHint.displayName = "FieldHint";
var TextField = React3.forwardRef(
  ({
    id: idProp,
    label,
    hint,
    error,
    required,
    optional,
    multiline,
    rows = 3,
    className,
    wrapperClassName,
    variant,
    size,
    disabled,
    readOnly,
    ...props
  }, ref) => {
    const reactId = React3.useId();
    const id = idProp != null ? idProp : `tf-${reactId}`;
    const hintId = hint ? `${id}-hint` : void 0;
    const errorId = error ? `${id}-error` : void 0;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || void 0;
    const hasError = Boolean(error);
    const inputClassName = cn(
      inputVariants({ variant, size, hasError }),
      multiline && "h-auto py-2 min-h-[5rem] resize-y",
      className
    );
    const sharedProps = {
      id,
      "aria-invalid": hasError || void 0,
      "aria-required": required || void 0,
      "aria-describedby": describedBy,
      disabled,
      readOnly,
      ...props
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: cn("w-full", wrapperClassName), children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FieldLabel, { htmlFor: id, required, optional, children: label }),
      multiline ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "textarea",
        {
          ref,
          rows,
          className: inputClassName,
          ...sharedProps
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { ref, className: inputClassName, ...sharedProps }),
      hasError ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FieldError, { id: errorId, children: error }) : hint && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FieldHint, { id: hintId, children: hint })
    ] });
  }
);
TextField.displayName = "TextField";

// src/primitives/Modal/Modal.tsx
var React4 = __toESM(require("react"));
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_class_variance_authority4 = require("class-variance-authority");
var import_jsx_runtime4 = require("react/jsx-runtime");
var contentVariants = (0, import_class_variance_authority4.cva)(
  [
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "w-full max-h-[90vh] flex flex-col",
    "bg-surface-background rounded-lg shadow-xl",
    "focus:outline-none",
    // Radix data-state animations
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-7xl"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var Modal = ({
  open,
  onOpenChange,
  size,
  modal = true,
  hideCloseButton = false,
  className,
  children
}) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DialogPrimitive.Root, { open, onOpenChange, modal, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(DialogPrimitive.Portal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    DialogPrimitive.Overlay,
    {
      className: cn(
        "fixed inset-0 z-40 bg-surface-overlay backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      )
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(DialogPrimitive.Content, { className: cn(contentVariants({ size }), className), children: [
    children,
    !hideCloseButton && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      DialogPrimitive.Close,
      {
        className: cn(
          "absolute right-4 top-4 rounded-md p-1",
          // border-0 / appearance-none neutralizam UA-default em consumidores
          // com preflight: false. Mantém aspecto ghost (sem border visível).
          "border-0 appearance-none bg-transparent",
          "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        ),
        "aria-label": "Fechar",
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            "aria-hidden": "true",
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
          }
        )
      }
    )
  ] })
] }) });
var ModalHeader = React4.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "div",
    {
      ref,
      className: cn(
        "flex-shrink-0 px-6 py-4 border-b border-surface-border pr-12",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DialogPrimitive.Title, { className: "text-lg font-semibold text-surface-foreground", children })
    }
  )
);
ModalHeader.displayName = "ModalHeader";
var ModalBody = React4.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "div",
    {
      ref,
      className: cn("flex-1 overflow-y-auto px-6 py-4", className),
      ...props
    }
  )
);
ModalBody.displayName = "ModalBody";
var ModalFooter = React4.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "div",
    {
      ref,
      className: cn(
        "flex-shrink-0 px-6 py-4 border-t border-surface-border",
        "flex items-center justify-end gap-2",
        className
      ),
      ...props
    }
  )
);
ModalFooter.displayName = "ModalFooter";
var ModalDescription = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("px-6 pt-2 text-sm text-neutral-600", className),
    ...props
  }
));
ModalDescription.displayName = "ModalDescription";

// src/primitives/Badge/Badge.tsx
var React5 = __toESM(require("react"));
var import_class_variance_authority5 = require("class-variance-authority");
var import_jsx_runtime5 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority5.cva)(
  // base
  [
    "inline-flex items-center justify-center gap-1",
    "font-medium leading-none whitespace-nowrap",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-accent"
  ],
  {
    variants: {
      variant: {
        solid: "border border-transparent",
        outline: "bg-transparent border",
        subtle: "border border-transparent"
      },
      tone: {
        primary: "",
        secondary: "",
        success: "",
        danger: "",
        warning: "",
        info: "",
        light: "",
        dark: "",
        neutral: ""
      },
      size: {
        sm: "h-5 px-2 text-[11px]",
        md: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm"
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md"
      }
    },
    compoundVariants: [
      // ---------- SOLID ----------
      { variant: "solid", tone: "primary", class: "bg-brand-primary text-brand-primary-foreground" },
      { variant: "solid", tone: "secondary", class: "bg-neutral-200 text-neutral-900" },
      { variant: "solid", tone: "success", class: "bg-success text-success-foreground" },
      { variant: "solid", tone: "danger", class: "bg-error text-error-foreground" },
      { variant: "solid", tone: "warning", class: "bg-warning text-warning-foreground" },
      { variant: "solid", tone: "info", class: "bg-info text-info-foreground" },
      { variant: "solid", tone: "light", class: "bg-neutral-50 text-neutral-900 border-neutral-200" },
      { variant: "solid", tone: "dark", class: "bg-neutral-900 text-neutral-0" },
      { variant: "solid", tone: "neutral", class: "bg-neutral-500 text-neutral-0" },
      // ---------- OUTLINE ----------
      { variant: "outline", tone: "primary", class: "border-brand-primary text-brand-primary" },
      { variant: "outline", tone: "secondary", class: "border-neutral-400 text-neutral-700" },
      { variant: "outline", tone: "success", class: "border-success text-success" },
      { variant: "outline", tone: "danger", class: "border-error text-error" },
      { variant: "outline", tone: "warning", class: "border-warning text-warning" },
      { variant: "outline", tone: "info", class: "border-info text-info" },
      { variant: "outline", tone: "light", class: "border-neutral-200 text-neutral-700" },
      { variant: "outline", tone: "dark", class: "border-neutral-900 text-neutral-900" },
      { variant: "outline", tone: "neutral", class: "border-neutral-400 text-neutral-600" },
      // ---------- SUBTLE ----------
      { variant: "subtle", tone: "primary", class: "bg-brand-primary-muted text-brand-primary" },
      { variant: "subtle", tone: "secondary", class: "bg-neutral-100 text-neutral-800" },
      { variant: "subtle", tone: "success", class: "bg-success-muted text-success" },
      { variant: "subtle", tone: "danger", class: "bg-error-muted text-error" },
      { variant: "subtle", tone: "warning", class: "bg-warning-muted text-warning" },
      { variant: "subtle", tone: "info", class: "bg-info-muted text-info" },
      { variant: "subtle", tone: "light", class: "bg-neutral-50 text-neutral-700" },
      { variant: "subtle", tone: "dark", class: "bg-neutral-200 text-neutral-900" },
      { variant: "subtle", tone: "neutral", class: "bg-neutral-100 text-neutral-700" }
    ],
    defaultVariants: {
      variant: "solid",
      tone: "neutral",
      size: "md",
      pill: true
    }
  }
);
var dotToneClass = {
  primary: "bg-brand-primary",
  secondary: "bg-neutral-500",
  success: "bg-success",
  danger: "bg-error",
  warning: "bg-warning",
  info: "bg-info",
  light: "bg-neutral-200",
  dark: "bg-neutral-900",
  neutral: "bg-neutral-500"
};
var isDev = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production";
var Badge = React5.forwardRef(
  ({
    className,
    variant,
    tone,
    bg,
    size,
    pill,
    removable = false,
    onRemove,
    dot = false,
    children,
    ...props
  }, ref) => {
    var _a;
    if (bg && isDev && typeof console !== "undefined") {
      console.warn(
        "[ui-kit-core/Badge] prop `bg` is deprecated \u2014 use `tone` instead. (parity-shim de react-bootstrap)"
      );
    }
    const resolvedTone = (_a = tone != null ? tone : bg) != null ? _a : "neutral";
    const resolvedSize = size != null ? size : "md";
    if (dot) {
      const dotDim = resolvedSize === "sm" ? "h-1.5 w-1.5" : resolvedSize === "lg" ? "h-2.5 w-2.5" : "h-2 w-2";
      const wrapperPad = resolvedSize === "sm" ? "gap-1.5 text-[11px]" : resolvedSize === "lg" ? "gap-2 text-sm" : "gap-1.5 text-xs";
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "span",
        {
          ref,
          className: cn("inline-flex items-center font-medium text-neutral-700", wrapperPad, className),
          ...props,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "span",
              {
                "aria-hidden": children ? "true" : void 0,
                "aria-label": children ? void 0 : props["aria-label"],
                role: children ? void 0 : "status",
                className: cn("inline-block rounded-full", dotDim, dotToneClass[resolvedTone])
              }
            ),
            children
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "span",
      {
        ref,
        className: cn(
          badgeVariants({ variant, tone: resolvedTone, size: resolvedSize, pill }),
          className
        ),
        ...props,
        children: [
          children,
          removable && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              type: "button",
              onClick: onRemove,
              "aria-label": "Remover",
              className: cn(
                "inline-flex items-center justify-center rounded-full",
                "opacity-70 hover:opacity-100 focus-visible:opacity-100",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
                resolvedSize === "lg" ? "-mr-1 ml-1 h-4 w-4" : "-mr-0.5 ml-0.5 h-3.5 w-3.5"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "svg",
                {
                  viewBox: "0 0 14 14",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "1.75",
                  strokeLinecap: "round",
                  "aria-hidden": "true",
                  className: "h-full w-full",
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M3 3l8 8M11 3l-8 8" })
                }
              )
            }
          )
        ]
      }
    );
  }
);
Badge.displayName = "Badge";

// src/primitives/StatusLight/StatusLight.tsx
var React6 = __toESM(require("react"));
var import_class_variance_authority6 = require("class-variance-authority");
var import_jsx_runtime6 = require("react/jsx-runtime");
var statusLightVariants = (0, import_class_variance_authority6.cva)(
  [
    "inline-block rounded-full align-middle",
    "transition-colors duration-150"
  ],
  {
    variants: {
      tone: {
        primary: "bg-brand-primary",
        success: "bg-success",
        danger: "bg-error",
        warning: "bg-warning",
        info: "bg-info",
        dark: "bg-neutral-900",
        neutral: "bg-neutral-400"
      },
      size: {
        xs: "h-2 w-2",
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6"
      },
      pulse: {
        true: "animate-pulse",
        false: ""
      }
    },
    defaultVariants: {
      tone: "success",
      size: "md",
      pulse: false
    }
  }
);
var isDev2 = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production";
function mapLegacySize(s) {
  const px = typeof s === "number" ? s : parseFloat(String(s).replace(/px$/, ""));
  if (!Number.isFinite(px)) return "md";
  if (px <= 10) return "xs";
  if (px <= 13) return "sm";
  if (px <= 18) return "md";
  if (px <= 22) return "lg";
  return "xl";
}
var StatusLight = React6.forwardRef(
  ({
    className,
    active = false,
    tone,
    size,
    pulse,
    activeLightColor,
    inactiveLightColor,
    legacySize,
    "aria-label": ariaLabel,
    ...props
  }, ref) => {
    if (isDev2 && typeof console !== "undefined") {
      if (activeLightColor !== void 0) {
        console.warn(
          "[ui-kit-core/StatusLight] prop `activeLightColor` is deprecated \u2014 use `tone` instead."
        );
      }
      if (inactiveLightColor !== void 0) {
        console.warn(
          "[ui-kit-core/StatusLight] prop `inactiveLightColor` is deprecated \u2014 `active=false` already renders neutral."
        );
      }
      if (legacySize !== void 0) {
        console.warn(
          "[ui-kit-core/StatusLight] prop `legacySize` (px) is deprecated \u2014 use `size` variant (xs/sm/md/lg/xl) instead."
        );
      }
    }
    const resolvedSize = size != null ? size : legacySize !== void 0 ? mapLegacySize(legacySize) : "md";
    const resolvedTone = active ? tone != null ? tone : "success" : "neutral";
    const resolvedAriaLabel = ariaLabel != null ? ariaLabel : active ? "Ativo" : "Inativo";
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "span",
      {
        ref,
        role: "status",
        "aria-label": resolvedAriaLabel,
        className: cn(
          statusLightVariants({ tone: resolvedTone, size: resolvedSize, pulse }),
          className
        ),
        ...props
      }
    );
  }
);
StatusLight.displayName = "StatusLight";

// src/primitives/Spinner/Spinner.tsx
var React7 = __toESM(require("react"));
var import_class_variance_authority7 = require("class-variance-authority");
var import_jsx_runtime7 = require("react/jsx-runtime");
var spinnerVariants = (0, import_class_variance_authority7.cva)(
  // base — sempre aplicada
  ["inline-block align-[-0.125em]"],
  {
    variants: {
      variant: {
        // Ring style: borda com top transparente girando (mesma técnica visual
        // de bootstrap `spinner-border`). Usa border-current para herdar tom.
        border: "animate-spin rounded-full border-2 border-current border-t-transparent",
        // Grow style: bolha sólida com pulse de opacidade (bootstrap `spinner-grow`).
        grow: "animate-pulse rounded-full bg-current opacity-75"
      },
      tone: {
        current: "text-current",
        brand: "text-brand-primary",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
        info: "text-info",
        neutral: "text-neutral-500"
      },
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12"
      }
    },
    defaultVariants: {
      variant: "border",
      tone: "current",
      size: "md"
    }
  }
);
var isDev3 = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production";
var Spinner2 = React7.forwardRef(
  ({
    className,
    variant,
    tone,
    size,
    animation,
    srLabel = "Carregando...",
    ...props
  }, ref) => {
    var _a;
    if (animation && isDev3 && typeof console !== "undefined") {
      console.warn(
        "[ui-kit-core/Spinner] prop `animation` is deprecated \u2014 use `variant` instead. (parity-shim de react-bootstrap)"
      );
    }
    const resolvedVariant = (_a = variant != null ? variant : animation) != null ? _a : "border";
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "span",
      {
        ref,
        role: "status",
        "aria-live": "polite",
        ...props,
        className: cn(
          spinnerVariants({ variant: resolvedVariant, tone, size }),
          className
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "sr-only", children: srLabel })
      }
    );
  }
);
Spinner2.displayName = "Spinner";

// src/primitives/InputGroup/InputGroup.tsx
var React8 = __toESM(require("react"));
var import_class_variance_authority8 = require("class-variance-authority");
var import_jsx_runtime8 = require("react/jsx-runtime");
var InputGroupContext = React8.createContext(null);
function useInputGroupContext() {
  return React8.useContext(InputGroupContext);
}
var inputGroupVariants = (0, import_class_variance_authority8.cva)(
  [
    // Layout: inline-flex com bordas conectadas
    "inline-flex items-stretch w-full",
    // Zera raio das extremidades dos children adjacentes (TextField/Button/Addon)
    "[&>*:first-child]:rounded-r-none",
    "[&>*:last-child]:rounded-l-none",
    "[&>*:not(:first-child):not(:last-child)]:rounded-none",
    // Colapsa bordas duplicadas entre elementos adjacentes
    "[&>*:not(:first-child)]:-ml-px",
    // Foco fica acima dos vizinhos para não cortar o ring
    "[&>*:focus-within]:relative [&>*:focus-within]:z-10",
    "[&>*:focus]:relative [&>*:focus]:z-10"
  ],
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var InputGroupRoot = React8.forwardRef(
  ({ className, size = "md", children, ...props }, ref) => {
    const ctx = React8.useMemo(() => ({ size }), [size]);
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(InputGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "div",
      {
        ref,
        role: "group",
        className: cn(inputGroupVariants({ size }), className),
        ...props,
        children
      }
    ) });
  }
);
InputGroupRoot.displayName = "InputGroup";
var addonSizeClass = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base"
};
var InputGroupAddon = React8.forwardRef(
  ({ className, position, decorative = true, size: sizeProp, children, ...props }, ref) => {
    var _a;
    const ctx = useInputGroupContext();
    const size = (_a = sizeProp != null ? sizeProp : ctx == null ? void 0 : ctx.size) != null ? _a : "md";
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "span",
      {
        ref,
        "aria-hidden": decorative ? "true" : void 0,
        "data-position": position,
        className: cn(
          "inline-flex items-center justify-center shrink-0",
          "border border-surface-border bg-neutral-50 text-neutral-600",
          "rounded-md",
          addonSizeClass[size],
          className
        ),
        ...props,
        children
      }
    );
  }
);
InputGroupAddon.displayName = "InputGroupAddon";
var InputGroupText = React8.forwardRef(
  ({ className, size: sizeProp, children, ...props }, ref) => {
    var _a;
    const ctx = useInputGroupContext();
    const size = (_a = sizeProp != null ? sizeProp : ctx == null ? void 0 : ctx.size) != null ? _a : "md";
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "span",
      {
        ref,
        className: cn(
          "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
          "border border-surface-border bg-neutral-50 text-neutral-700 font-medium",
          "rounded-md",
          addonSizeClass[size],
          className
        ),
        ...props,
        children
      }
    );
  }
);
InputGroupText.displayName = "InputGroupText";
var InputGroupButton = React8.forwardRef(
  ({ className, size: _size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "span",
    {
      ref,
      className: cn(
        "inline-flex items-stretch shrink-0",
        // Repassa o "rounded-none" para o Button filho via selector
        "[&>*]:rounded-none [&>*]:h-full",
        className
      ),
      ...props,
      children
    }
  )
);
InputGroupButton.displayName = "InputGroupButton";
var InputGroup = InputGroupRoot;
InputGroup.Text = InputGroupText;
InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;

// src/primitives/Alert/Alert.tsx
var React9 = __toESM(require("react"));
var import_class_variance_authority9 = require("class-variance-authority");
var import_jsx_runtime9 = require("react/jsx-runtime");
var alertVariants = (0, import_class_variance_authority9.cva)(
  // base
  [
    "relative flex w-full items-start gap-3",
    "rounded-md border",
    "transition-colors duration-150"
  ],
  {
    variants: {
      tone: {
        info: "bg-info-muted border-info/30 text-info",
        success: "bg-success-muted border-success/30 text-success",
        warning: "bg-warning-muted border-warning/30 text-warning",
        error: "bg-error-muted border-error/30 text-error",
        neutral: "bg-neutral-100 border-neutral-300 text-neutral-800"
      },
      size: {
        sm: "p-2.5 text-xs",
        md: "p-3.5 text-sm",
        lg: "p-4 text-base"
      }
    },
    defaultVariants: {
      tone: "info",
      size: "md"
    }
  }
);
var isDev4 = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production";
var ICON_BOX = "flex-shrink-0";
var InfoIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  "path",
  {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9 9.75A.75.75 0 019.75 9h.5a.75.75 0 01.75.75v3.5h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25V10.5h-.25A.75.75 0 019 9.75z",
    clipRule: "evenodd"
  }
) });
var SuccessIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  "path",
  {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L9 10.94 7.28 9.22a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z",
    clipRule: "evenodd"
  }
) });
var WarningIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  "path",
  {
    fillRule: "evenodd",
    d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
  }
) });
var ErrorIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  "path",
  {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
    clipRule: "evenodd"
  }
) });
var NeutralIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  "path",
  {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 112 0 1 1 0 01-2 0zm0 3.5a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5z",
    clipRule: "evenodd"
  }
) });
var defaultIconByTone = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  neutral: NeutralIcon
};
var iconSizeClass = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};
var Alert = React9.forwardRef(
  ({
    className,
    tone,
    variant,
    size,
    dismissible = false,
    onDismiss,
    icon,
    title,
    children,
    role = "alert",
    ...props
  }, ref) => {
    var _a;
    if (variant !== void 0 && isDev4 && typeof console !== "undefined") {
      console.warn(
        "[ui-kit-core/Alert] prop `variant` is deprecated \u2014 use `tone` instead. (parity-shim de react-bootstrap)"
      );
    }
    let resolvedTone = (_a = tone != null ? tone : variant) != null ? _a : "info";
    if (resolvedTone === "danger") {
      if (isDev4 && typeof console !== "undefined") {
        console.warn(
          "[ui-kit-core/Alert] tone `danger` is deprecated \u2014 use `error` instead. (parity-shim de react-bootstrap)"
        );
      }
      resolvedTone = "error";
    }
    const finalTone = resolvedTone;
    const resolvedSize = size != null ? size : "md";
    let iconNode = null;
    if (icon !== false) {
      if (icon) {
        iconNode = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: cn(ICON_BOX, iconSizeClass[resolvedSize], "inline-flex"), children: icon });
      } else {
        const DefaultIcon = defaultIconByTone[finalTone];
        iconNode = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(DefaultIcon, { className: cn(ICON_BOX, iconSizeClass[resolvedSize]) });
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      "div",
      {
        ref,
        role,
        "aria-live": dismissible ? "polite" : void 0,
        className: cn(alertVariants({ tone: finalTone, size: resolvedSize }), className),
        ...props,
        children: [
          iconNode,
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex-1 min-w-0", children: [
            title ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { className: "block font-semibold leading-tight mb-0.5", children: title }) : null,
            children ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: cn("leading-snug", title && "text-current/90"), children }) : null
          ] }),
          dismissible && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "button",
            {
              type: "button",
              onClick: onDismiss,
              "aria-label": "Fechar",
              className: cn(
                "flex-shrink-0 inline-flex items-center justify-center rounded",
                "opacity-70 hover:opacity-100 focus-visible:opacity-100",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
                resolvedSize === "sm" ? "h-4 w-4" : resolvedSize === "lg" ? "h-6 w-6" : "h-5 w-5"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                "svg",
                {
                  viewBox: "0 0 14 14",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "1.75",
                  strokeLinecap: "round",
                  "aria-hidden": "true",
                  className: "h-full w-full",
                  children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M3 3l8 8M11 3l-8 8" })
                }
              )
            }
          )
        ]
      }
    );
  }
);
Alert.displayName = "Alert";

// src/primitives/List/List.tsx
var React10 = __toESM(require("react"));
var import_class_variance_authority10 = require("class-variance-authority");
var import_jsx_runtime10 = require("react/jsx-runtime");
var ListContext = React10.createContext({
  size: "md",
  variant: "default"
});
var listVariants = (0, import_class_variance_authority10.cva)(["flex flex-col list-none m-0 p-0"], {
  variants: {
    variant: {
      default: "border border-surface-border rounded-lg overflow-hidden divide-y divide-surface-border",
      flush: "",
      bordered: "border-y border-surface-border divide-y divide-surface-border"
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var ListRoot = React10.forwardRef(
  ({ className, variant, size, children, ...props }, ref) => {
    const resolvedVariant = variant != null ? variant : "default";
    const resolvedSize = size != null ? size : "md";
    const ctx = React10.useMemo(
      () => ({ size: resolvedSize, variant: resolvedVariant }),
      [resolvedSize, resolvedVariant]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ListContext.Provider, { value: ctx, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "ul",
      {
        ref,
        className: cn(listVariants({ variant: resolvedVariant, size: resolvedSize }), className),
        ...props,
        children
      }
    ) });
  }
);
ListRoot.displayName = "List";
var itemSizeClass = {
  sm: "px-3 py-2 text-sm gap-2",
  md: "px-4 py-3 text-sm gap-3",
  lg: "px-5 py-4 text-base gap-3"
};
var interactiveBase = [
  "w-full text-left flex items-center",
  "transition-colors duration-150 outline-none",
  "focus-visible:bg-brand-primary-muted/40 focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset",
  "hover:bg-neutral-50",
  "no-underline text-inherit"
];
var staticBase = ["flex items-center text-surface-foreground"];
var ListItem = React10.forwardRef(
  ({
    className,
    active = false,
    disabled = false,
    interactive,
    size,
    onClick,
    href,
    target,
    rel,
    children,
    ...props
  }, ref) => {
    const ctx = React10.useContext(ListContext);
    const resolvedSize = size != null ? size : ctx.size;
    const isInteractive = Boolean(interactive != null ? interactive : onClick || href);
    const padCls = itemSizeClass[resolvedSize];
    const stateCls = cn(
      active && "bg-brand-primary-muted text-brand-primary font-medium",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none"
    );
    if (isInteractive) {
      const innerCls = cn(
        interactiveBase,
        padCls,
        active && "bg-brand-primary-muted text-brand-primary font-medium hover:bg-brand-primary-muted",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none hover:bg-transparent"
      );
      const inner = href && !disabled ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "a",
        {
          href,
          target,
          rel: rel != null ? rel : target === "_blank" ? "noopener noreferrer" : void 0,
          className: innerCls,
          "aria-disabled": disabled || void 0,
          "aria-current": active ? "true" : void 0,
          onClick,
          children
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "button",
        {
          type: "button",
          className: innerCls,
          disabled,
          "aria-disabled": disabled || void 0,
          "aria-current": active ? "true" : void 0,
          onClick,
          children
        }
      );
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "li",
        {
          ref,
          className: cn("block", className),
          ...props,
          children: inner
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "li",
      {
        ref,
        className: cn(staticBase, padCls, stateCls, className),
        "aria-current": active ? "true" : void 0,
        "aria-disabled": disabled || void 0,
        ...props,
        children
      }
    );
  }
);
ListItem.displayName = "ListItem";
var ListItemContent = React10.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      ref,
      className: cn("flex-1 min-w-0 flex flex-col gap-0.5", className),
      ...props
    }
  )
);
ListItemContent.displayName = "ListItemContent";
var ListItemAction = React10.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      ref,
      className: cn("flex items-center gap-2 ml-auto shrink-0", className),
      ...props
    }
  )
);
ListItemAction.displayName = "ListItemAction";
var ListItemWithSlots = ListItem;
ListItemWithSlots.Content = ListItemContent;
ListItemWithSlots.Action = ListItemAction;
var List = ListRoot;
List.Item = ListItemWithSlots;

// src/primitives/Progress/Progress.tsx
var React11 = __toESM(require("react"));
var ProgressPrimitive = __toESM(require("@radix-ui/react-progress"));
var import_class_variance_authority11 = require("class-variance-authority");
var import_jsx_runtime11 = require("react/jsx-runtime");
var rootVariants = (0, import_class_variance_authority11.cva)(
  [
    "relative w-full overflow-hidden rounded-full",
    "bg-neutral-200"
  ],
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var indicatorToneClass = {
  brand: "bg-brand-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error"
};
var stripedBgStyle = {
  backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.18) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.18) 75%, transparent 75%, transparent)",
  backgroundSize: "1rem 1rem"
};
var Progress = React11.forwardRef(
  ({
    className,
    value,
    max = 100,
    tone = "brand",
    size,
    variant = "default",
    label,
    ...props
  }, ref) => {
    var _a;
    const isIndeterminate = variant === "indeterminate" || value == null;
    const isStriped = variant === "striped";
    const safeValue = isIndeterminate ? null : Math.min(Math.max(value != null ? value : 0, 0), max);
    const translate = isIndeterminate ? 0 : 100 - safeValue / max * 100;
    const ariaLabel = (_a = props["aria-label"]) != null ? _a : typeof label === "string" ? label : void 0;
    const root = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
      ProgressPrimitive.Root,
      {
        ref,
        value: safeValue,
        max,
        "aria-label": ariaLabel,
        className: cn(rootVariants({ size }), className),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            ProgressPrimitive.Indicator,
            {
              className: cn(
                "h-full w-full transition-transform duration-500 ease-out",
                indicatorToneClass[tone],
                // Striped: animação contínua do background (movimento das listras)
                isStriped && "animate-[progress-stripes_1s_linear_infinite]",
                // Indeterminate: indicador com 40% width deslizando left↔right
                isIndeterminate && "!w-2/5 !translate-x-0 animate-[progress-indeterminate_1.4s_ease-in-out_infinite]"
              ),
              style: {
                ...isStriped ? stripedBgStyle : null,
                ...isIndeterminate ? {} : { transform: `translateX(-${translate}%)` }
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("style", { children: progressKeyframes })
        ]
      }
    );
    if (label) {
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: cn("flex w-full flex-col gap-1"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-xs font-medium text-neutral-700", children: label }),
        root
      ] });
    }
    return root;
  }
);
Progress.displayName = "Progress";
var progressKeyframes = `
@keyframes progress-stripes {
  from { background-position: 1rem 0; }
  to   { background-position: 0 0; }
}
@keyframes progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}
`;

// src/primitives/Checkbox/Checkbox.tsx
var React12 = __toESM(require("react"));
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_class_variance_authority12 = require("class-variance-authority");
var import_jsx_runtime12 = require("react/jsx-runtime");
var checkboxVariants = (0, import_class_variance_authority12.cva)(
  [
    "peer shrink-0 inline-flex items-center justify-center",
    "rounded-sm border bg-surface-background",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-accent",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100",
    "data-[state=checked]:text-brand-primary-foreground",
    "data-[state=indeterminate]:text-brand-primary-foreground"
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 [&_svg]:h-3 [&_svg]:w-3",
        md: "h-5 w-5 [&_svg]:h-3.5 [&_svg]:w-3.5",
        lg: "h-6 w-6 [&_svg]:h-4 [&_svg]:w-4"
      },
      tone: {
        brand: [
          "border-neutral-300 hover:border-brand-primary",
          "data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary",
          "data-[state=indeterminate]:bg-brand-primary data-[state=indeterminate]:border-brand-primary"
        ],
        success: [
          "border-neutral-300 hover:border-success",
          "data-[state=checked]:bg-success data-[state=checked]:border-success",
          "data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success"
        ],
        error: [
          "border-error hover:border-error",
          "focus-visible:ring-error/40",
          "data-[state=checked]:bg-error data-[state=checked]:border-error",
          "data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error"
        ]
      }
    },
    defaultVariants: {
      size: "md",
      tone: "brand"
    }
  }
);
var CheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M3.5 8.5l3 3 6-7" })
  }
);
var MinusIcon = () => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round",
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M3.5 8h9" })
  }
);
var Checkbox = React12.forwardRef(
  ({
    id: idProp,
    className,
    wrapperClassName,
    labelClassName,
    size,
    tone,
    label,
    description,
    disabled,
    checked,
    ...props
  }, ref) => {
    const reactId = React12.useId();
    const id = idProp != null ? idProp : `cb-${reactId}`;
    const descriptionId = description ? `${id}-description` : void 0;
    const root = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      CheckboxPrimitive.Root,
      {
        ref,
        id,
        disabled,
        checked,
        "aria-describedby": descriptionId,
        className: cn(checkboxVariants({ size, tone }), className),
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center", children: checked === "indeterminate" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(MinusIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CheckIcon, {}) })
      }
    );
    if (!label && !description) {
      return root;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "label",
      {
        htmlFor: id,
        className: cn(
          "inline-flex items-start gap-2 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-70",
          wrapperClassName
        ),
        children: [
          root,
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "flex flex-col", children: [
            label && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "span",
              {
                className: cn(
                  "text-sm font-medium text-neutral-800 leading-tight",
                  size === "sm" && "text-xs",
                  size === "lg" && "text-base",
                  labelClassName
                ),
                children: label
              }
            ),
            description && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "span",
              {
                id: descriptionId,
                className: cn(
                  "text-xs text-neutral-500 mt-0.5",
                  size === "lg" && "text-sm"
                ),
                children: description
              }
            )
          ] })
        ]
      }
    );
  }
);
Checkbox.displayName = "Checkbox";

// src/primitives/Switch/Switch.tsx
var React13 = __toESM(require("react"));
var SwitchPrimitive = __toESM(require("@radix-ui/react-switch"));
var import_class_variance_authority13 = require("class-variance-authority");
var import_jsx_runtime13 = require("react/jsx-runtime");
var switchVariants = (0, import_class_variance_authority13.cva)(
  // base — track
  [
    "group peer inline-flex shrink-0 cursor-pointer items-center",
    "rounded-full border border-transparent",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-accent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // off state
    "bg-neutral-300"
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11"
      },
      tone: {
        brand: "data-[state=checked]:bg-brand-primary",
        success: "data-[state=checked]:bg-success"
      }
    },
    defaultVariants: {
      size: "md",
      tone: "brand"
    }
  }
);
var thumbVariants = (0, import_class_variance_authority13.cva)(
  [
    "pointer-events-none block rounded-full bg-white shadow-sm",
    "ring-0 transition-transform duration-150",
    "data-[state=unchecked]:translate-x-0.5"
  ],
  {
    variants: {
      size: {
        // translate = track_w - thumb_w - 2*0.5 (gap)
        // sm: 28 - 12 - 4 = 12px = translate-x-3
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        // md: 36 - 16 - 4 = 16px = translate-x-4
        md: "h-4 w-4 data-[state=checked]:translate-x-4",
        // lg: 44 - 20 - 4 = 20px = translate-x-5
        lg: "h-5 w-5 data-[state=checked]:translate-x-5"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var Switch = React13.forwardRef(
  ({
    className,
    wrapperClassName,
    size,
    tone,
    label,
    description,
    id,
    ...props
  }, ref) => {
    const generatedId = React13.useId();
    const rootId = id != null ? id : generatedId;
    const descriptionId = description ? `${rootId}-description` : void 0;
    const root = /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      SwitchPrimitive.Root,
      {
        ref,
        id: rootId,
        "aria-describedby": descriptionId,
        className: cn(switchVariants({ size, tone }), className),
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SwitchPrimitive.Thumb, { className: cn(thumbVariants({ size })) })
      }
    );
    if (!label && !description) {
      return root;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      "label",
      {
        htmlFor: rootId,
        className: cn(
          "flex items-start gap-2.5 cursor-pointer select-none",
          "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
          wrapperClassName
        ),
        children: [
          root,
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "flex flex-col gap-0.5 leading-tight", children: [
            label && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "text-sm font-medium text-surface-foreground", children: label }),
            description && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { id: descriptionId, className: "text-xs text-neutral-500", children: description })
          ] })
        ]
      }
    );
  }
);
Switch.displayName = "Switch";

// src/primitives/SearchBar/SearchBar.tsx
var React14 = __toESM(require("react"));
var import_class_variance_authority14 = require("class-variance-authority");
var import_jsx_runtime14 = require("react/jsx-runtime");
var searchBarVariants = (0, import_class_variance_authority14.cva)("relative w-full", {
  variants: {
    variant: {
      default: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var SIZE_METRICS = {
  sm: {
    iconBox: "h-3.5 w-3.5",
    padLeft: "pl-8",
    padRight: "pr-8",
    leftSlot: "left-2 top-0 h-8",
    rightSlot: "right-1 top-0 h-8",
    clearBox: "h-6 w-6",
    tfSize: "sm"
  },
  md: {
    iconBox: "h-4 w-4",
    padLeft: "pl-9",
    padRight: "pr-9",
    leftSlot: "left-2.5 top-0 h-10",
    rightSlot: "right-1.5 top-0 h-10",
    clearBox: "h-7 w-7",
    tfSize: "md"
  },
  lg: {
    iconBox: "h-5 w-5",
    padLeft: "pl-11",
    padRight: "pr-11",
    leftSlot: "left-3 top-0 h-12",
    rightSlot: "right-2 top-0 h-12",
    clearBox: "h-8 w-8",
    tfSize: "lg"
  }
};
var SearchIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("circle", { cx: "7", cy: "7", r: "5" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M11 11l3 3" })
    ]
  }
);
var CloseIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  "svg",
  {
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    "aria-hidden": "true",
    className,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M3 3l8 8M11 3l-8 8" })
  }
);
var InlineSpinner = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  "span",
  {
    role: "status",
    "aria-live": "polite",
    className: cn(
      "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
      className
    ),
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "sr-only", children: "Buscando..." })
  }
);
var SearchBar = React14.forwardRef(
  ({
    value,
    onChange,
    onClear,
    placeholder = "Buscar...",
    debounceMs = 0,
    loading = false,
    clearable = true,
    icon,
    size,
    variant,
    disabled,
    className,
    wrapperClassName,
    "aria-label": ariaLabel = "Buscar",
    name,
    id,
    ...props
  }, ref) => {
    const resolvedSize = size != null ? size : "md";
    const metrics = SIZE_METRICS[resolvedSize];
    const [draft, setDraft] = React14.useState(value);
    const timerRef = React14.useRef(null);
    const lastEmittedRef = React14.useRef(value);
    React14.useEffect(() => {
      if (value !== lastEmittedRef.current) {
        setDraft(value);
        lastEmittedRef.current = value;
      }
    }, [value]);
    React14.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);
    const handleInput = (e) => {
      const next = e.target.value;
      if (debounceMs > 0) {
        setDraft(next);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          lastEmittedRef.current = next;
          onChange(next);
        }, debounceMs);
      } else {
        lastEmittedRef.current = next;
        onChange(next);
      }
    };
    const handleClear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setDraft("");
      lastEmittedRef.current = "";
      if (onClear) onClear();
      else onChange("");
    };
    const displayValue = debounceMs > 0 ? draft : value;
    const showClear = clearable && !disabled && displayValue.length > 0;
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn(searchBarVariants({ variant, size: resolvedSize }), wrapperClassName), children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "div",
        {
          className: cn(
            "pointer-events-none absolute z-10 flex items-center justify-center text-neutral-400",
            metrics.leftSlot
          ),
          "aria-hidden": !loading,
          children: loading ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(InlineSpinner, { className: metrics.iconBox }) : icon ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: cn("inline-flex items-center justify-center", metrics.iconBox), children: icon }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SearchIcon, { className: metrics.iconBox })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        TextField,
        {
          ref,
          type: "search",
          role: "searchbox",
          name,
          id,
          value: displayValue,
          onChange: handleInput,
          placeholder,
          disabled,
          size: metrics.tfSize,
          "aria-label": ariaLabel,
          className: cn(
            metrics.padLeft,
            showClear ? metrics.padRight : "",
            // Remove o "x" nativo do <input type="search"> em WebKit
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
            className
          ),
          ...props
        }
      ),
      showClear && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "div",
        {
          className: cn(
            "absolute z-10 flex items-center justify-center",
            metrics.rightSlot
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "button",
            {
              type: "button",
              onClick: handleClear,
              "aria-label": "Limpar busca",
              className: cn(
                "inline-flex items-center justify-center rounded-full",
                "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                "transition-colors duration-150",
                metrics.clearBox
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(CloseIcon, { className: "h-3 w-3" })
            }
          )
        }
      )
    ] });
  }
);
SearchBar.displayName = "SearchBar";

// src/primitives/EmptyState/EmptyState.tsx
var React15 = __toESM(require("react"));
var import_class_variance_authority15 = require("class-variance-authority");
var import_jsx_runtime15 = require("react/jsx-runtime");
var emptyStateVariants = (0, import_class_variance_authority15.cva)(
  // base — flex column centralizado; role/aria no DOM, não nas classes
  ["flex flex-col items-center justify-center text-center", "text-surface-foreground"],
  {
    variants: {
      variant: {
        default: "px-6 py-12",
        compact: "px-4 py-6",
        card: "px-6 py-12 bg-surface-background border border-surface-border rounded-lg shadow-sm"
      },
      size: {
        sm: "gap-2",
        md: "gap-3",
        lg: "gap-4"
      }
    },
    compoundVariants: [
      // compact tightens gap regardless of size
      { variant: "compact", size: "sm", class: "gap-1.5" },
      { variant: "compact", size: "md", class: "gap-2" },
      { variant: "compact", size: "lg", class: "gap-2.5" }
    ],
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var iconSizeClass2 = {
  sm: "text-2xl [&>svg]:h-6 [&>svg]:w-6",
  md: "text-4xl [&>svg]:h-10 [&>svg]:w-10",
  lg: "text-5xl [&>svg]:h-14 [&>svg]:w-14"
};
var titleSizeClass = {
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-lg font-semibold"
};
var descriptionSizeClass = {
  sm: "text-xs text-neutral-500 max-w-xs",
  md: "text-sm text-neutral-500 max-w-sm",
  lg: "text-base text-neutral-500 max-w-md"
};
var EmptyState = React15.forwardRef(
  ({ className, variant, size, icon, title, description, action, ...props }, ref) => {
    const resolvedSize = size != null ? size : "md";
    const TitleTag = resolvedSize === "sm" ? "h4" : "h3";
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
      "div",
      {
        ref,
        role: "status",
        "aria-live": "polite",
        className: cn(emptyStateVariants({ variant, size }), className),
        ...props,
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            "div",
            {
              "aria-hidden": "true",
              className: cn(
                "inline-flex items-center justify-center text-neutral-400",
                iconSizeClass2[resolvedSize]
              ),
              children: icon
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TitleTag, { className: cn("m-0 text-surface-foreground", titleSizeClass[resolvedSize]), children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: cn("m-0", descriptionSizeClass[resolvedSize]), children: description }),
          action && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: cn("mt-2 flex items-center justify-center"), children: action })
        ]
      }
    );
  }
);
EmptyState.displayName = "EmptyState";

// src/primitives/Tooltip/Tooltip.tsx
var React16 = __toESM(require("react"));
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"));
var import_class_variance_authority16 = require("class-variance-authority");
var import_jsx_runtime16 = require("react/jsx-runtime");
var tooltipContentVariants = (0, import_class_variance_authority16.cva)(
  [
    "z-50 overflow-hidden rounded-md shadow-md",
    "select-none pointer-events-none",
    "font-medium leading-tight",
    "origin-[var(--radix-tooltip-content-transform-origin)]",
    // Radix data-state animations (tooltip usa "delayed-open" / "instant-open")
    "data-[state=delayed-open]:animate-in data-[state=instant-open]:animate-in",
    "data-[state=closed]:animate-out",
    "data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:fade-in-0",
    "data-[state=closed]:fade-out-0",
    "data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:zoom-in-95",
    "data-[state=closed]:zoom-out-95",
    // Slide direcional baseado em data-side
    "data-[side=top]:slide-in-from-bottom-1",
    "data-[side=bottom]:slide-in-from-top-1",
    "data-[side=left]:slide-in-from-right-1",
    "data-[side=right]:slide-in-from-left-1"
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-foreground text-surface-background",
        light: "bg-surface-background text-surface-foreground border border-surface-border"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var TooltipProvider = TooltipPrimitive.Provider;
var TooltipRoot = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React16.forwardRef(({ className, variant, size, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(tooltipContentVariants({ variant, size }), className),
    ...props
  }
));
TooltipContent.displayName = "TooltipContent";
var Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 4,
  delayDuration = 200,
  disableHoverableContent,
  defaultOpen,
  open,
  onOpenChange,
  variant,
  size,
  className
}) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
  TooltipPrimitive.Provider,
  {
    delayDuration,
    disableHoverableContent,
    children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      TooltipPrimitive.Root,
      {
        defaultOpen,
        open,
        onOpenChange,
        delayDuration,
        disableHoverableContent,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TooltipPrimitive.Trigger, { asChild: true, children }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TooltipPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
            TooltipContent,
            {
              side,
              align,
              sideOffset,
              variant,
              size,
              className,
              children: content
            }
          ) })
        ]
      }
    )
  }
);
Tooltip.displayName = "Tooltip";

// src/primitives/DropdownMenu/DropdownMenu.tsx
var React17 = __toESM(require("react"));
var DropdownMenuPrimitive = __toESM(require("@radix-ui/react-dropdown-menu"));
var import_class_variance_authority17 = require("class-variance-authority");
var import_jsx_runtime17 = require("react/jsx-runtime");
var dropdownMenuContentVariants = (0, import_class_variance_authority17.cva)(
  [
    "z-50 overflow-hidden rounded-md p-1",
    "bg-surface-background border border-surface-border text-surface-foreground shadow-lg",
    "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
    // Radix data-state animations
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
    "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    // Slide direcional baseado em data-side
    "data-[side=top]:slide-in-from-bottom-1",
    "data-[side=bottom]:slide-in-from-top-1",
    "data-[side=left]:slide-in-from-right-1",
    "data-[side=right]:slide-in-from-left-1"
  ],
  {
    variants: {
      variant: {
        default: ""
      },
      size: {
        sm: "text-xs min-w-[6rem]",
        md: "text-sm min-w-[8rem]",
        lg: "text-sm min-w-[12rem]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var itemBaseClasses = [
  "relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
  "cursor-default text-surface-foreground",
  "transition-colors duration-100",
  "focus:bg-surface-muted",
  "data-[highlighted]:bg-surface-muted",
  "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
];
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var CheckIcon2 = () => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    className: "h-3.5 w-3.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M3.5 8.5l3 3 6-7" })
  }
);
var DotIcon = () => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    className: "h-2 w-2",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: "8", cy: "8", r: "4" })
  }
);
var ChevronRightIcon = () => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    className: "ml-auto h-3.5 w-3.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M6 4l4 4-4 4" })
  }
);
var DropdownMenuContent = React17.forwardRef(({ className, variant, size, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(dropdownMenuContentVariants({ variant, size }), className),
    ...props
  }
));
DropdownMenuContent.displayName = "DropdownMenuContent";
var DropdownMenuItem = React17.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(itemBaseClasses, inset && "pl-8", className),
    ...props
  }
));
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuCheckboxItem = React17.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    checked,
    className: cn(itemBaseClasses, "pl-8", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(CheckIcon2, {}) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
var DropdownMenuRadioItem = React17.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(itemBaseClasses, "pl-8", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DotIcon, {}) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
var DropdownMenuLabel = React17.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
var DropdownMenuSeparator = React17.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-surface-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
var DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  "span",
  {
    className: cn(
      "ml-auto text-xs tracking-widest text-neutral-500",
      className
    ),
    ...props
  }
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var DropdownMenuSubTrigger = React17.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      itemBaseClasses,
      "data-[state=open]:bg-surface-muted",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ChevronRightIcon, {})
    ]
  }
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
var DropdownMenuSubContent = React17.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(dropdownMenuContentVariants({ variant, size }), className),
    ...props
  }
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

// src/primitives/Collapsible/Collapsible.tsx
var React18 = __toESM(require("react"));
var CollapsiblePrimitive = __toESM(require("@radix-ui/react-collapsible"));
var import_jsx_runtime18 = require("react/jsx-runtime");
var COLLAPSIBLE_KEYFRAMES_ID = "hashcodeti-collapsible-keyframes";
var COLLAPSIBLE_KEYFRAMES_CSS = `
@keyframes hashcodeti-collapsible-down {
  from { height: 0; }
  to { height: var(--radix-collapsible-content-height); }
}
@keyframes hashcodeti-collapsible-up {
  from { height: var(--radix-collapsible-content-height); }
  to { height: 0; }
}
`;
var CollapsibleKeyframes = () => {
  React18.useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(COLLAPSIBLE_KEYFRAMES_ID)) return;
    const style = document.createElement("style");
    style.id = COLLAPSIBLE_KEYFRAMES_ID;
    style.textContent = COLLAPSIBLE_KEYFRAMES_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
};
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CollapsiblePrimitive.Trigger, { ref, className: cn(className), ...props }));
CollapsibleTrigger.displayName = "CollapsibleTrigger";
var CollapsibleContent = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CollapsibleKeyframes, {}),
  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    CollapsiblePrimitive.Content,
    {
      ref,
      className: cn(
        "overflow-hidden",
        "data-[state=open]:animate-[hashcodeti-collapsible-down_200ms_ease-out]",
        "data-[state=closed]:animate-[hashcodeti-collapsible-up_200ms_ease-out]",
        className
      ),
      ...props,
      children
    }
  )
] }));
CollapsibleContent.displayName = "CollapsibleContent";

// src/primitives/Accordion/Accordion.tsx
var React19 = __toESM(require("react"));
var AccordionPrimitive = __toESM(require("@radix-ui/react-accordion"));
var import_class_variance_authority18 = require("class-variance-authority");
var import_jsx_runtime19 = require("react/jsx-runtime");
var accordionRootVariants = (0, import_class_variance_authority18.cva)("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "space-y-2",
      flush: ""
    }
  },
  defaultVariants: { variant: "default" }
});
var accordionItemVariants = (0, import_class_variance_authority18.cva)("", {
  variants: {
    variant: {
      default: "border-b border-surface-border last:border-b-0",
      bordered: "rounded-md border border-surface-border overflow-hidden bg-surface-background",
      flush: "border-b border-neutral-100 last:border-b-0"
    }
  },
  defaultVariants: { variant: "default" }
});
var accordionTriggerVariants = (0, import_class_variance_authority18.cva)(
  [
    "group flex flex-1 items-center justify-between w-full",
    "py-3 text-sm font-medium text-left text-surface-foreground",
    "transition-colors",
    "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "[&[data-state=open]>svg]:rotate-180"
  ],
  {
    variants: {
      variant: {
        default: "",
        bordered: "px-3",
        flush: ""
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var accordionContentVariants = (0, import_class_variance_authority18.cva)(
  [
    "overflow-hidden text-sm text-surface-foreground",
    "data-[state=open]:animate-accordion-down",
    "data-[state=closed]:animate-accordion-up"
  ],
  {
    variants: {
      variant: {
        default: "",
        bordered: "px-3",
        flush: ""
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var AccordionVariantContext = React19.createContext("default");
var accordionKeyframes = `
@keyframes accordion-down {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}
.animate-accordion-down { animation: accordion-down 200ms ease-out; }
.animate-accordion-up   { animation: accordion-up 200ms ease-out; }
`;
var Accordion = React19.forwardRef(({ className, variant = "default", children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(AccordionVariantContext.Provider, { value: variant, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
  AccordionPrimitive.Root,
  {
    ref,
    className: cn(accordionRootVariants({ variant }), className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("style", { children: accordionKeyframes })
    ]
  }
) }));
Accordion.displayName = "Accordion";
var AccordionItem = React19.forwardRef(({ className, ...props }, ref) => {
  const variant = React19.useContext(AccordionVariantContext);
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    AccordionPrimitive.Item,
    {
      ref,
      className: cn(accordionItemVariants({ variant }), className),
      ...props
    }
  );
});
AccordionItem.displayName = "AccordionItem";
var AccordionHeader = AccordionPrimitive.Header;
var ChevronDownIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className: "shrink-0 text-neutral-500 transition-transform duration-200",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", { d: "M4 6l4 4 4-4" })
  }
);
var AccordionTrigger = React19.forwardRef(({ className, children, ...props }, ref) => {
  const variant = React19.useContext(AccordionVariantContext);
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    AccordionPrimitive.Trigger,
    {
      ref,
      className: cn(accordionTriggerVariants({ variant }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ChevronDownIcon, {})
      ]
    }
  ) });
});
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = React19.forwardRef(({ className, children, ...props }, ref) => {
  const variant = React19.useContext(AccordionVariantContext);
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    AccordionPrimitive.Content,
    {
      ref,
      className: cn(accordionContentVariants({ variant }), className),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "pb-3 pt-0", children })
    }
  );
});
AccordionContent.displayName = "AccordionContent";

// src/primitives/Sheet/Sheet.tsx
var React20 = __toESM(require("react"));
var DialogPrimitive2 = __toESM(require("@radix-ui/react-dialog"));
var import_class_variance_authority19 = require("class-variance-authority");
var import_jsx_runtime20 = require("react/jsx-runtime");
var SheetRoot = DialogPrimitive2.Root;
var SheetTrigger = DialogPrimitive2.Trigger;
var SheetPortal = DialogPrimitive2.Portal;
var SheetClose = DialogPrimitive2.Close;
var SheetOverlay = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  DialogPrimitive2.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-40 bg-surface-overlay backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    ),
    ...props
  }
));
SheetOverlay.displayName = "SheetOverlay";
var sheetContentVariants = (0, import_class_variance_authority19.cva)(
  [
    "fixed z-50 flex flex-col bg-surface-background shadow-xl",
    "focus:outline-none",
    // Animations: enter/exit + slide direcional via data-side
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "duration-300",
    "data-[side=right]:data-[state=open]:slide-in-from-right",
    "data-[side=right]:data-[state=closed]:slide-out-to-right",
    "data-[side=left]:data-[state=open]:slide-in-from-left",
    "data-[side=left]:data-[state=closed]:slide-out-to-left",
    "data-[side=top]:data-[state=open]:slide-in-from-top",
    "data-[side=top]:data-[state=closed]:slide-out-to-top",
    "data-[side=bottom]:data-[state=open]:slide-in-from-bottom",
    "data-[side=bottom]:data-[state=closed]:slide-out-to-bottom"
  ],
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full border-r border-surface-border",
        right: "inset-y-0 right-0 h-full border-l border-surface-border",
        top: "inset-x-0 top-0 w-full border-b border-surface-border",
        bottom: "inset-x-0 bottom-0 w-full border-t border-surface-border"
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: ""
      }
    },
    compoundVariants: [
      // Lateral (left/right) → controla WIDTH
      { side: "left", size: "sm", class: "w-[320px] max-w-full" },
      { side: "left", size: "md", class: "w-[480px] max-w-full" },
      { side: "left", size: "lg", class: "w-[640px] max-w-full" },
      { side: "left", size: "xl", class: "w-[768px] max-w-full" },
      { side: "left", size: "full", class: "w-screen" },
      { side: "right", size: "sm", class: "w-[320px] max-w-full" },
      { side: "right", size: "md", class: "w-[480px] max-w-full" },
      { side: "right", size: "lg", class: "w-[640px] max-w-full" },
      { side: "right", size: "xl", class: "w-[768px] max-w-full" },
      { side: "right", size: "full", class: "w-screen" },
      // Top/bottom → controla HEIGHT
      { side: "top", size: "sm", class: "h-[320px] max-h-full" },
      { side: "top", size: "md", class: "h-[480px] max-h-full" },
      { side: "top", size: "lg", class: "h-[640px] max-h-full" },
      { side: "top", size: "xl", class: "h-[768px] max-h-full" },
      { side: "top", size: "full", class: "h-screen" },
      { side: "bottom", size: "sm", class: "h-[320px] max-h-full" },
      { side: "bottom", size: "md", class: "h-[480px] max-h-full" },
      { side: "bottom", size: "lg", class: "h-[640px] max-h-full" },
      { side: "bottom", size: "xl", class: "h-[768px] max-h-full" },
      { side: "bottom", size: "full", class: "h-screen" }
    ],
    defaultVariants: {
      side: "right",
      size: "md"
    }
  }
);
var SheetContent = React20.forwardRef(({ className, side = "right", size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  DialogPrimitive2.Content,
  {
    ref,
    "data-side": side,
    className: cn(sheetContentVariants({ side, size }), className),
    ...props,
    children
  }
));
SheetContent.displayName = "SheetContent";
var Sheet = ({
  open,
  onOpenChange,
  side = "right",
  size,
  modal = true,
  hideCloseButton = false,
  className,
  children
}) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(DialogPrimitive2.Root, { open, onOpenChange, modal, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(DialogPrimitive2.Portal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(SheetOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(SheetContent, { side, size, className, children: [
    children,
    !hideCloseButton && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      DialogPrimitive2.Close,
      {
        className: cn(
          "absolute right-4 top-4 rounded-md p-1",
          "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        ),
        "aria-label": "Fechar",
        children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            "aria-hidden": "true",
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
          }
        )
      }
    )
  ] })
] }) });
Sheet.displayName = "Sheet";
var SheetHeader = React20.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      ref,
      className: cn(
        "flex-shrink-0 px-6 py-4 border-b border-surface-border pr-12",
        className
      ),
      ...props
    }
  )
);
SheetHeader.displayName = "SheetHeader";
var SheetBody = React20.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      ref,
      className: cn("flex-1 overflow-y-auto px-6 py-4", className),
      ...props
    }
  )
);
SheetBody.displayName = "SheetBody";
var SheetFooter = React20.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      ref,
      className: cn(
        "flex-shrink-0 px-6 py-4 border-t border-surface-border",
        "flex items-center justify-end gap-2",
        className
      ),
      ...props
    }
  )
);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  DialogPrimitive2.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-surface-foreground", className),
    ...props
  }
));
SheetTitle.displayName = "SheetTitle";
var SheetDescription = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  DialogPrimitive2.Description,
  {
    ref,
    className: cn("text-sm text-neutral-600", className),
    ...props
  }
));
SheetDescription.displayName = "SheetDescription";

// src/primitives/Tabs/Tabs.tsx
var React21 = __toESM(require("react"));
var TabsPrimitive = __toESM(require("@radix-ui/react-tabs"));
var import_class_variance_authority20 = require("class-variance-authority");
var import_jsx_runtime21 = require("react/jsx-runtime");
var tabsListVariants = (0, import_class_variance_authority20.cva)(
  // base: layout + reset
  ["inline-flex items-stretch"],
  {
    variants: {
      variant: {
        // underline: linha-base separadora; o trigger desenha o sublinhado ativo
        default: [
          "gap-1 border-b border-surface-border",
          "data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-b-0",
          "data-[orientation=vertical]:border-r data-[orientation=vertical]:border-surface-border",
          "data-[orientation=vertical]:items-stretch"
        ],
        // pills: tabs como pílulas independentes
        pills: [
          "gap-1 p-1 rounded-md",
          "data-[orientation=vertical]:flex-col"
        ],
        // solid: container preenchido (toggle group look)
        solid: [
          "gap-1 p-1 rounded-md bg-surface-muted",
          "data-[orientation=vertical]:flex-col"
        ]
      },
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var tabsTriggerVariants = (0, import_class_variance_authority20.cva)(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-medium leading-none select-none",
    "transition-all duration-150",
    // border base transparente — neutraliza border UA-default do <button> em
    // consumidores com preflight: false (vide nota no Button).
    "border border-transparent appearance-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-1",
    "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    "text-neutral-600 hover:text-surface-foreground"
  ],
  {
    variants: {
      variant: {
        // underline: borda inferior ativa via box-shadow inset (não desloca layout);
        // -mb-px alinha o sublinhado com a borda da TabsList.
        default: [
          "rounded-none border-b-2 border-transparent -mb-px bg-transparent",
          "data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary",
          "data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2",
          "data-[orientation=vertical]:-mb-0 data-[orientation=vertical]:-mr-px"
        ],
        pills: [
          "rounded-md bg-transparent",
          "hover:bg-surface-muted",
          // Active: fundo brand-muted + texto brand-primary + bold — destaque
          // inequívoco em fundo branco (surface-muted sozinho era invisível).
          "data-[state=active]:bg-brand-primary-muted data-[state=active]:text-brand-primary data-[state=active]:font-semibold"
        ],
        solid: [
          "rounded-[5px] bg-transparent",
          "data-[state=active]:bg-surface-background data-[state=active]:text-surface-foreground data-[state=active]:shadow-sm"
        ]
      },
      size: {
        sm: "px-2.5 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var TabsVariantContext = React21.createContext({
  variant: "default",
  size: "md"
});
var Tabs = TabsPrimitive.Root;
var TabsList = React21.forwardRef(({ className, variant, size, ...props }, ref) => {
  const resolvedVariant = variant != null ? variant : "default";
  const resolvedSize = size != null ? size : "md";
  const ctxValue = React21.useMemo(
    () => ({ variant: resolvedVariant, size: resolvedSize }),
    [resolvedVariant, resolvedSize]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(TabsVariantContext.Provider, { value: ctxValue, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    TabsPrimitive.List,
    {
      ref,
      className: cn(tabsListVariants({ variant: resolvedVariant, size: resolvedSize }), className),
      ...props
    }
  ) });
});
TabsList.displayName = "TabsList";
var TabsTrigger = React21.forwardRef(({ className, variant, size, ...props }, ref) => {
  const ctx = React21.useContext(TabsVariantContext);
  const resolvedVariant = variant != null ? variant : ctx.variant;
  const resolvedSize = size != null ? size : ctx.size;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    TabsPrimitive.Trigger,
    {
      ref,
      className: cn(
        tabsTriggerVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      ),
      ...props
    }
  );
});
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm",
      className
    ),
    ...props
  }
));
TabsContent.displayName = "TabsContent";

// src/primitives/Popover/Popover.tsx
var React22 = __toESM(require("react"));
var PopoverPrimitive = __toESM(require("@radix-ui/react-popover"));
var import_class_variance_authority21 = require("class-variance-authority");
var import_jsx_runtime22 = require("react/jsx-runtime");
var popoverContentVariants = (0, import_class_variance_authority21.cva)(
  [
    "z-50 rounded-md outline-none",
    "origin-[var(--radix-popover-content-transform-origin)]",
    // Radix data-state animations
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
    "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    // Slide direcional baseado em data-side
    "data-[side=top]:slide-in-from-bottom-1",
    "data-[side=bottom]:slide-in-from-top-1",
    "data-[side=left]:slide-in-from-right-1",
    "data-[side=right]:slide-in-from-left-1"
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-background border border-surface-border text-surface-foreground shadow-lg"
      },
      size: {
        sm: "p-2 w-48",
        md: "p-4 w-72",
        lg: "p-4 w-96",
        auto: "p-4"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverPortal = PopoverPrimitive.Portal;
var PopoverClose = PopoverPrimitive.Close;
var PopoverContent = React22.forwardRef(({ className, variant, size, sideOffset = 4, align = "center", avoidCollisions = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(PopoverPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
  PopoverPrimitive.Content,
  {
    ref,
    sideOffset,
    align,
    avoidCollisions,
    className: cn(popoverContentVariants({ variant, size }), className),
    ...props
  }
) }));
PopoverContent.displayName = "PopoverContent";
var PopoverArrow = React22.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
  PopoverPrimitive.Arrow,
  {
    ref,
    className: cn("fill-surface-background", className),
    ...props
  }
));
PopoverArrow.displayName = "PopoverArrow";

// src/primitives/Select/Select.tsx
var React23 = __toESM(require("react"));
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_class_variance_authority22 = require("class-variance-authority");
var import_jsx_runtime23 = require("react/jsx-runtime");
var selectTriggerVariants = (0, import_class_variance_authority22.cva)(
  [
    "flex w-full items-center justify-between gap-2 rounded-md border bg-surface-background",
    "text-surface-foreground",
    "transition-colors duration-150",
    "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
    "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed",
    "data-[placeholder]:text-neutral-400",
    "[&>span]:line-clamp-1 [&>span]:text-left"
  ],
  {
    variants: {
      variant: {
        default: "border-surface-border focus-visible:border-brand-primary",
        error: "border-error focus-visible:ring-error/40 focus-visible:border-error"
      },
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var selectContentVariants = (0, import_class_variance_authority22.cva)(
  [
    "relative z-50 overflow-hidden rounded-md border border-surface-border bg-surface-background shadow-lg",
    "text-surface-foreground",
    "origin-[var(--radix-select-content-transform-origin)]",
    // Animação alinhada ao Tooltip (Wave B benchmark)
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
    "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    "data-[side=top]:slide-in-from-bottom-1",
    "data-[side=bottom]:slide-in-from-top-1",
    "data-[side=left]:slide-in-from-right-1",
    "data-[side=right]:slide-in-from-left-1"
  ],
  {
    variants: {
      size: {
        sm: "min-w-[8rem] max-h-[12rem] text-sm",
        md: "min-w-[10rem] max-h-[18rem] text-sm",
        lg: "min-w-[12rem] max-h-[24rem] text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectPortal = SelectPrimitive.Portal;
var ChevronDownIcon2 = (props) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M4 6l4 4 4-4" })
  }
);
var ChevronUpIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M4 10l4-4 4 4" })
  }
);
var CheckIcon3 = (props) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M3.5 8.5l3 3 6-7" })
  }
);
var SelectTrigger = React23.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(selectTriggerVariants({ variant, size }), className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ChevronDownIcon2, { className: "h-4 w-4 shrink-0 text-neutral-500" }) })
    ]
  }
));
SelectTrigger.displayName = "SelectTrigger";
var SelectScrollUpButton = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 bg-surface-background text-neutral-500",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ChevronUpIcon, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
var SelectScrollDownButton = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 bg-surface-background text-neutral-500",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ChevronDownIcon2, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";
var SelectContent = React23.forwardRef(({ className, children, size, position = "popper", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
  SelectPrimitive.Content,
  {
    ref,
    position,
    sideOffset,
    className: cn(
      selectContentVariants({ size }),
      position === "popper" && "data-[side=bottom]:translate-y-0 data-[side=top]:translate-y-0",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SelectScrollUpButton, {}),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = "SelectContent";
var SelectLabel = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  SelectPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide",
      className
    ),
    ...props
  }
));
SelectLabel.displayName = "SelectLabel";
var SelectItem = React23.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm",
      "py-1.5 pl-7 pr-2 text-sm outline-none",
      "focus:bg-surface-muted hover:bg-surface-muted",
      "data-[state=checked]:font-medium",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "absolute left-2 flex h-4 w-4 items-center justify-center text-brand-primary", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CheckIcon3, { className: "h-3.5 w-3.5" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = "SelectItem";
var SelectSeparator = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-surface-border", className),
    ...props
  }
));
SelectSeparator.displayName = "SelectSeparator";

// src/primitives/Toast/Toast.tsx
var React24 = __toESM(require("react"));
var ToastPrimitive = __toESM(require("@radix-ui/react-toast"));
var import_class_variance_authority23 = require("class-variance-authority");
var import_jsx_runtime24 = require("react/jsx-runtime");
var toastVariants = (0, import_class_variance_authority23.cva)(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3",
    "rounded-md border shadow-lg",
    "overflow-hidden",
    "transition-all",
    // open/close animations (Radix data-state)
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-80",
    "data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full",
    "data-[state=closed]:slide-out-to-right-full",
    // swipe-to-dismiss (right swipe by default; viewport pode override)
    "data-[swipe=cancel]:translate-x-0",
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
    "data-[swipe=move]:transition-none"
  ],
  {
    variants: {
      tone: {
        info: "bg-info-muted border-info/30 text-info",
        success: "bg-success-muted border-success/30 text-success",
        warning: "bg-warning-muted border-warning/30 text-warning",
        error: "bg-error-muted border-error/30 text-error",
        neutral: "bg-white border-neutral-300 text-neutral-800"
      },
      size: {
        sm: "p-2.5 text-xs",
        md: "p-3.5 text-sm",
        lg: "p-4 text-base"
      }
    },
    defaultVariants: {
      tone: "info",
      size: "md"
    }
  }
);
var ToastProvider = ToastPrimitive.Provider;
var ToastViewport = React24.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  ToastPrimitive.Viewport,
  {
    ref,
    className: cn(
      "fixed bottom-0 right-0 z-50 flex max-h-screen w-full max-w-md flex-col gap-2 p-4",
      "outline-none",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = "ToastViewport";
var ToastRoot = React24.forwardRef(({ className, tone, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  ToastPrimitive.Root,
  {
    ref,
    className: cn(toastVariants({ tone, size }), className),
    ...props
  }
));
ToastRoot.displayName = "ToastRoot";
var ToastTitle = React24.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  ToastPrimitive.Title,
  {
    ref,
    className: cn("font-semibold leading-tight", className),
    ...props
  }
));
ToastTitle.displayName = "ToastTitle";
var ToastDescription = React24.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  ToastPrimitive.Description,
  {
    ref,
    className: cn("leading-snug opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = "ToastDescription";
var ToastAction = React24.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  ToastPrimitive.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md",
      "border border-current/30 bg-transparent px-3 text-sm font-medium",
      "hover:bg-current/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-current",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = "ToastAction";
var ToastClose = React24.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  ToastPrimitive.Close,
  {
    ref,
    "aria-label": "Fechar",
    className: cn(
      "flex-shrink-0 inline-flex h-5 w-5 items-center justify-center rounded",
      "opacity-70 hover:opacity-100 focus-visible:opacity-100",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      "svg",
      {
        viewBox: "0 0 14 14",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.75",
        strokeLinecap: "round",
        "aria-hidden": "true",
        className: "h-3 w-3",
        children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M3 3l8 8M11 3l-8 8" })
      }
    )
  }
));
ToastClose.displayName = "ToastClose";

// src/primitives/Toast/Toaster.tsx
var React25 = __toESM(require("react"));
var import_jsx_runtime25 = require("react/jsx-runtime");
var ToastContext = React25.createContext(null);
function useToast() {
  const ctx = React25.useContext(ToastContext);
  if (!ctx) {
    throw new Error(
      "[ui-kit-core/useToast] hook chamado fora de <Toaster />. Monte <Toaster /> na raiz da app."
    );
  }
  return ctx;
}
var _toastIdSeq = 0;
var genId = () => `t${Date.now().toString(36)}-${(_toastIdSeq++).toString(36)}`;
var Toaster = ({
  duration = 5e3,
  swipeDirection = "right",
  swipeThreshold,
  label = "Notifica\xE7\xF5es",
  viewportClassName
}) => {
  const [toasts, setToasts] = React25.useState([]);
  const dismiss = React25.useCallback((id) => {
    setToasts(
      (prev) => id == null ? prev.map((t) => ({ ...t, open: false })) : prev.map((t) => t.id === id ? { ...t, open: false } : t)
    );
  }, []);
  const toast = React25.useCallback(
    (opts) => {
      var _a;
      const id = (_a = opts.id) != null ? _a : genId();
      setToasts((prev) => {
        const existing = prev.findIndex((t) => t.id === id);
        const next = { ...opts, id, open: true };
        if (existing >= 0) {
          const copy = prev.slice();
          copy[existing] = next;
          return copy;
        }
        return [...prev, next];
      });
      return id;
    },
    []
  );
  const handleOpenChange = React25.useCallback((id, open) => {
    if (!open) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 200);
    }
  }, []);
  const ctxValue = React25.useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ToastContext.Provider, { value: ctxValue, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
    ToastProvider,
    {
      duration,
      swipeDirection,
      swipeThreshold,
      label,
      children: [
        toasts.map((t) => {
          var _a, _b, _c, _d;
          const altText = (_c = (_a = t.action) == null ? void 0 : _a.altText) != null ? _c : typeof ((_b = t.action) == null ? void 0 : _b.label) === "string" ? t.action.label : "A\xE7\xE3o";
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
            ToastRoot,
            {
              tone: t.tone,
              size: t.size,
              open: t.open,
              duration: t.duration,
              onOpenChange: (open) => handleOpenChange(t.id, open),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex-1 min-w-0", children: [
                  t.title ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ToastTitle, { children: t.title }) : null,
                  t.description ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ToastDescription, { children: t.description }) : null
                ] }),
                t.action ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
                  ToastAction,
                  {
                    altText,
                    onClick: () => {
                      var _a2;
                      (_a2 = t.action) == null ? void 0 : _a2.onClick();
                      dismiss(t.id);
                    },
                    children: t.action.label
                  }
                ) : null,
                ((_d = t.closable) != null ? _d : true) && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ToastClose, {})
              ]
            },
            t.id
          );
        }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ToastViewport, { className: viewportClassName })
      ]
    }
  ) });
};
Toaster.displayName = "Toaster";

// src/primitives/DataTable/DataTable.tsx
var React27 = __toESM(require("react"));
var import_class_variance_authority24 = require("class-variance-authority");

// src/primitives/DataTable/DataTableRow.tsx
var React26 = __toESM(require("react"));
var import_jsx_runtime26 = require("react/jsx-runtime");
var CELL_PAD_BY_SIZE = {
  sm: "py-1 px-2 text-xs",
  md: "py-2 px-3 text-sm",
  lg: "py-3 px-4 text-sm"
};
var STICKY_BG = "bg-surface-background";
function resolveAccessor(col, row) {
  if (col.accessor === void 0) return null;
  if (typeof col.accessor === "function") {
    const v2 = col.accessor(row);
    return v2;
  }
  const v = row[col.accessor];
  return v;
}
function alignClass(align) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}
function stickyClass(sticky) {
  if (sticky === "left") return cn("sticky left-0 z-[1]", STICKY_BG);
  if (sticky === "right") return cn("sticky right-0 z-[1]", STICKY_BG);
  return "";
}
function widthStyle(col) {
  const s = {};
  if (col.width !== void 0)
    s.width = typeof col.width === "number" ? `${col.width}px` : col.width;
  if (col.minWidth !== void 0)
    s.minWidth = typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth;
  return s;
}
var KebabIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    className: cn("h-4 w-4", className),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("circle", { cx: "8", cy: "3", r: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("circle", { cx: "8", cy: "8", r: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("circle", { cx: "8", cy: "13", r: "1.5" })
    ]
  }
);
function DataTableRowInner(props) {
  const {
    row,
    rowId,
    rowIndex,
    columns,
    size,
    variant,
    isSelected,
    selectable,
    onToggleSelect,
    rowActions,
    onRowClick
  } = props;
  const padClass = CELL_PAD_BY_SIZE[size];
  const borderClass = variant === "bordered" ? "border-r border-surface-border last:border-r-0" : "";
  const zebraClass = variant === "default" ? "even:bg-neutral-50" : "";
  const ctx = { rowIndex, rowId, isSelected, row };
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
    "tr",
    {
      "data-row-id": rowId,
      "data-state": isSelected ? "selected" : void 0,
      onClick: onRowClick ? () => onRowClick(row, rowIndex) : void 0,
      className: cn(
        "border-b border-surface-border last:border-b-0",
        zebraClass,
        "hover:bg-surface-muted/60 transition-colors",
        isSelected && "bg-brand-primary-muted/40",
        onRowClick && "cursor-pointer"
      ),
      children: [
        selectable && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "td",
          {
            className: cn(padClass, "w-10", borderClass, stickyClass("left")),
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
              Checkbox,
              {
                size: size === "lg" ? "md" : "sm",
                checked: isSelected,
                onCheckedChange: () => onToggleSelect == null ? void 0 : onToggleSelect(rowId),
                "aria-label": `Selecionar linha ${rowIndex + 1}`
              }
            )
          }
        ),
        columns.map((col) => {
          if (col.hidden) return null;
          const content = col.cell ? col.cell(row, ctx) : resolveAccessor(col, row);
          const extraClass = typeof col.cellClassName === "function" ? col.cellClassName(row) : col.cellClassName;
          return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            "td",
            {
              className: cn(
                padClass,
                alignClass(col.align),
                borderClass,
                stickyClass(col.sticky),
                extraClass
              ),
              style: widthStyle(col),
              children: content
            },
            col.id
          );
        }),
        rowActions && rowActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "td",
          {
            className: cn(padClass, "w-10", borderClass, stickyClass("right"), "text-right"),
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(DropdownMenu, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                DropdownMenuTrigger,
                {
                  className: cn(
                    "inline-flex items-center justify-center rounded-md h-7 w-7",
                    "text-neutral-500 hover:bg-surface-muted hover:text-neutral-800",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  ),
                  "aria-label": `A\xE7\xF5es da linha ${rowIndex + 1}`,
                  children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(KebabIcon, {})
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(DropdownMenuContent, { align: "end", size: "md", children: rowActions.map((action, i) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
                DropdownMenuItem,
                {
                  disabled: action.disabled,
                  onSelect: () => action.onClick(row),
                  className: cn(
                    action.destructive && "text-error focus:text-error data-[highlighted]:bg-error-muted"
                  ),
                  children: [
                    action.icon && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "inline-flex items-center justify-center", children: action.icon }),
                    action.label
                  ]
                },
                i
              )) }) })
            ] })
          }
        )
      ]
    }
  );
}
function defaultArePropsEqual(a, b) {
  if (a.isSelected !== b.isSelected) return false;
  if (a.rowId !== b.rowId) return false;
  if (a.rowIndex !== b.rowIndex) return false;
  if (a.size !== b.size) return false;
  if (a.variant !== b.variant) return false;
  if (a.selectable !== b.selectable) return false;
  if (a.columns !== b.columns) return false;
  if (a.rowActions !== b.rowActions) return false;
  if (a.onRowClick !== b.onRowClick) return false;
  if (a.row !== b.row) return false;
  return true;
}
var DataTableRow = React26.memo(DataTableRowInner, defaultArePropsEqual);

// src/primitives/DataTable/DataTablePagination.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var Chev = ({ d, className }) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className: cn("h-4 w-4", className),
    children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("path", { d })
  }
);
var FirstIcon = () => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Chev, { d: "M11 4l-4 4 4 4M7 4l-4 4 4 4" });
var PrevIcon = () => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Chev, { d: "M10 4l-4 4 4 4" });
var NextIcon = () => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Chev, { d: "M6 4l4 4-4 4" });
var LastIcon = () => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Chev, { d: "M5 4l4 4-4 4M9 4l4 4-4 4" });
var SIZE_BUTTON = {
  sm: "sm",
  md: "sm",
  lg: "md"
};
var SIZE_TEXT = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm"
};
var DataTablePagination = ({
  page,
  pageSize,
  totalRows,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  size = "md",
  className
}) => {
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalRows / safePageSize));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const startRow = totalRows === 0 ? 0 : (clampedPage - 1) * safePageSize + 1;
  const endRow = Math.min(clampedPage * safePageSize, totalRows);
  const isFirst = clampedPage <= 1;
  const isLast = clampedPage >= totalPages;
  const btnSize = SIZE_BUTTON[size];
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "div",
    {
      className: cn(
        "flex items-center justify-between gap-3 px-3 py-2 border-t border-surface-border bg-surface-background",
        SIZE_TEXT[size],
        "flex-wrap",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "text-neutral-600", children: totalRows === 0 ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: "Nenhum resultado" }) : /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { children: [
          "Mostrando ",
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "font-medium", children: startRow }),
          "\u2013",
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "font-medium", children: endRow }),
          " de",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "font-medium", children: totalRows })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center gap-3", children: [
          pageSizeOptions && onPageSizeChange && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("label", { className: "inline-flex items-center gap-1.5 text-neutral-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: "Por p\xE1gina:" }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              "select",
              {
                value: pageSize,
                onChange: (e) => onPageSizeChange(Number(e.target.value)),
                className: cn(
                  "rounded-md border border-surface-border bg-surface-background px-2 py-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                  SIZE_TEXT[size]
                ),
                "aria-label": "Linhas por p\xE1gina",
                children: pageSizeOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("option", { value: opt, children: opt }, opt))
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "text-neutral-600 whitespace-nowrap", children: [
            "P\xE1gina ",
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "font-medium", children: clampedPage }),
            " de",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "font-medium", children: totalPages })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              Button,
              {
                variant: "outline-secondary",
                size: btnSize,
                disabled: isFirst,
                onClick: () => onPageChange(1),
                "aria-label": "Primeira p\xE1gina",
                className: "!px-2",
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(FirstIcon, {})
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              Button,
              {
                variant: "outline-secondary",
                size: btnSize,
                disabled: isFirst,
                onClick: () => onPageChange(clampedPage - 1),
                "aria-label": "P\xE1gina anterior",
                className: "!px-2",
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(PrevIcon, {})
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              Button,
              {
                variant: "outline-secondary",
                size: btnSize,
                disabled: isLast,
                onClick: () => onPageChange(clampedPage + 1),
                "aria-label": "Pr\xF3xima p\xE1gina",
                className: "!px-2",
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(NextIcon, {})
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              Button,
              {
                variant: "outline-secondary",
                size: btnSize,
                disabled: isLast,
                onClick: () => onPageChange(totalPages),
                "aria-label": "\xDAltima p\xE1gina",
                className: "!px-2",
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(LastIcon, {})
              }
            )
          ] })
        ] })
      ]
    }
  );
};
DataTablePagination.displayName = "DataTablePagination";

// src/primitives/DataTable/DataTable.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
var dataTableVariants = (0, import_class_variance_authority24.cva)(
  ["w-full border-collapse text-surface-foreground"],
  {
    variants: {
      variant: {
        default: "",
        bordered: "border border-surface-border",
        minimal: ""
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);
function useControllable(controlledValue, defaultValue, onChange) {
  const isControlled = controlledValue !== void 0;
  const [internal, setInternal] = React27.useState(defaultValue);
  const value = isControlled ? controlledValue : internal;
  const setValue = React27.useCallback(
    (next) => {
      if (!isControlled) setInternal(next);
      if (onChange) onChange(next);
    },
    [isControlled, onChange]
  );
  return [value, setValue];
}
function toIdSet(input) {
  if (!input) return /* @__PURE__ */ new Set();
  if (input instanceof Set) return new Set(input);
  return new Set(input);
}
var HEADER_PAD = {
  sm: "py-1.5 px-2",
  md: "py-2 px-3",
  lg: "py-3 px-4"
};
function headerAlignClass(align) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}
function headerStickyClass(sticky) {
  if (sticky === "left") return "sticky left-0 z-20 bg-surface-background";
  if (sticky === "right") return "sticky right-0 z-20 bg-surface-background";
  return "";
}
function widthStyle2(col) {
  const s = {};
  if (col.width !== void 0)
    s.width = typeof col.width === "number" ? `${col.width}px` : col.width;
  if (col.minWidth !== void 0)
    s.minWidth = typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth;
  return s;
}
var SortIcon = ({ direction }) => {
  if (direction === "asc") {
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      "svg",
      {
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        className: "h-3.5 w-3.5 ml-1 inline-block text-brand-primary",
        children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("path", { d: "M4 10l4-4 4 4" })
      }
    );
  }
  if (direction === "desc") {
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      "svg",
      {
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        className: "h-3.5 w-3.5 ml-1 inline-block text-brand-primary",
        children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("path", { d: "M4 6l4 4 4-4" })
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      className: "h-3.5 w-3.5 ml-1 inline-block text-neutral-400",
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("path", { d: "M5 7l3-3 3 3M5 9l3 3 3-3" })
    }
  );
};
function DataTableInner(props, ref) {
  var _a;
  const {
    data,
    columns,
    getRowId,
    loading = false,
    error,
    emptyState,
    caption,
    ariaLabel = "Tabela de dados",
    sortBy,
    defaultSortBy = null,
    onSortChange,
    page,
    defaultPage = 1,
    pageSize,
    defaultPageSize = 10,
    totalRows,
    pageSizeOptions,
    onPageChange,
    onPageSizeChange,
    selectable = false,
    selectedRowIds,
    defaultSelectedRowIds,
    onSelectionChange,
    onRowClick,
    searchable = false,
    searchValue,
    onSearchChange,
    searchPlaceholder,
    toolbar,
    rowActions,
    stickyHeader = true,
    maxHeight,
    variant = "default",
    size = "md",
    asCard = false,
    className,
    tableClassName
  } = props;
  const resolvedVariant = variant;
  const resolvedSize = size;
  const [sortState, setSortState] = useControllable(
    sortBy,
    defaultSortBy != null ? defaultSortBy : null,
    onSortChange
  );
  const [pageState, setPageState] = useControllable(
    page,
    defaultPage,
    onPageChange
  );
  const [pageSizeState, setPageSizeState] = useControllable(
    pageSize,
    defaultPageSize,
    onPageSizeChange
  );
  const selectionMode = selectable === true ? "multiple" : selectable === false ? false : selectable;
  const [selectionState, setSelectionState] = useControllable(
    selectedRowIds !== void 0 ? toIdSet(selectedRowIds) : void 0,
    toIdSet(defaultSelectedRowIds),
    onSelectionChange
  );
  const visibleColumns = React27.useMemo(
    () => columns.filter((c) => !c.hidden),
    [columns]
  );
  const rowIds = React27.useMemo(
    () => data.map((row, i) => getRowId(row, i)),
    [data, getRowId]
  );
  const handleSortClick = React27.useCallback(
    (col) => {
      var _a2;
      if (!col.sortable) return;
      const key = (_a2 = col.sortKey) != null ? _a2 : col.id;
      let next;
      if (!sortState || sortState.columnId !== key) {
        next = { columnId: key, direction: "asc" };
      } else if (sortState.direction === "asc") {
        next = { columnId: key, direction: "desc" };
      } else {
        next = null;
      }
      setSortState(next);
    },
    [sortState, setSortState]
  );
  const handleToggleRow = React27.useCallback(
    (rowId) => {
      if (!selectionMode) return;
      if (selectionMode === "single") {
        const next2 = /* @__PURE__ */ new Set();
        if (!selectionState.has(rowId)) next2.add(rowId);
        setSelectionState(next2);
        return;
      }
      const next = new Set(selectionState);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      setSelectionState(next);
    },
    [selectionMode, selectionState, setSelectionState]
  );
  const selectAllState = React27.useMemo(() => {
    if (selectionMode !== "multiple" || data.length === 0) return false;
    let count = 0;
    for (const id of rowIds) if (selectionState.has(id)) count++;
    if (count === 0) return false;
    if (count === data.length) return true;
    return "indeterminate";
  }, [selectionMode, data.length, rowIds, selectionState]);
  const handleToggleAll = React27.useCallback(() => {
    if (selectionMode !== "multiple") return;
    const next = new Set(selectionState);
    if (selectAllState === true) {
      for (const id of rowIds) next.delete(id);
    } else {
      for (const id of rowIds) next.add(id);
    }
    setSelectionState(next);
  }, [selectionMode, selectionState, selectAllState, rowIds, setSelectionState]);
  const resolveActions = React27.useCallback(
    (row) => {
      if (!rowActions) return void 0;
      if (typeof rowActions === "function") return rowActions(row);
      return rowActions;
    },
    [rowActions]
  );
  const hasData = data.length > 0;
  const showEmpty = !loading && !error && !hasData;
  const showError = !loading && !!error;
  const showPagination = totalRows !== void 0;
  const containerClasses = cn(
    "relative bg-surface-background",
    asCard && "border border-surface-border rounded-lg shadow-sm overflow-hidden",
    className
  );
  const scrollWrapperStyle = maxHeight ? { maxHeight } : {};
  const scrollWrapperClasses = cn(
    "relative w-full",
    maxHeight && "overflow-y-auto",
    "overflow-x-auto"
  );
  const totalColSpan = visibleColumns.length + (selectionMode ? 1 : 0) + (rowActions ? 1 : 0);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    "div",
    {
      ref,
      role: "region",
      "aria-label": ariaLabel,
      className: containerClasses,
      children: [
        (searchable || toolbar) && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center gap-3 px-3 py-2 border-b border-surface-border flex-wrap", children: [
          searchable && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "flex-1 min-w-[200px] max-w-md", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            SearchBar,
            {
              value: searchValue != null ? searchValue : "",
              onChange: (v) => onSearchChange == null ? void 0 : onSearchChange(v),
              placeholder: searchPlaceholder,
              size: resolvedSize === "lg" ? "lg" : "sm"
            }
          ) }),
          toolbar && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "flex items-center gap-2 ml-auto", children: toolbar })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: scrollWrapperClasses, style: scrollWrapperStyle, children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
            "table",
            {
              "aria-busy": loading || void 0,
              className: cn(
                dataTableVariants({ variant: resolvedVariant, size: resolvedSize }),
                tableClassName
              ),
              children: [
                caption && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("caption", { className: "p-2 text-xs text-neutral-500", children: caption }),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                  "thead",
                  {
                    className: cn(
                      "bg-surface-background text-neutral-700",
                      "border-b border-surface-border",
                      stickyHeader && "sticky top-0 z-10"
                    ),
                    children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("tr", { children: [
                      selectionMode && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                        "th",
                        {
                          scope: "col",
                          className: cn(
                            HEADER_PAD[resolvedSize],
                            "w-10",
                            headerStickyClass("left")
                          ),
                          children: selectionMode === "multiple" ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                            Checkbox,
                            {
                              size: resolvedSize === "lg" ? "md" : "sm",
                              checked: selectAllState,
                              onCheckedChange: handleToggleAll,
                              "aria-label": "Selecionar todas as linhas vis\xEDveis"
                            }
                          ) : null
                        }
                      ),
                      visibleColumns.map((col) => {
                        var _a2;
                        const headerContent = typeof col.header === "function" ? col.header() : col.header;
                        const sortKey = (_a2 = col.sortKey) != null ? _a2 : col.id;
                        const isSorted = (sortState == null ? void 0 : sortState.columnId) === sortKey;
                        const direction = isSorted ? sortState.direction : null;
                        const ariaSort = isSorted ? direction === "asc" ? "ascending" : "descending" : "none";
                        return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                          "th",
                          {
                            scope: "col",
                            "aria-sort": col.sortable ? ariaSort : void 0,
                            className: cn(
                              HEADER_PAD[resolvedSize],
                              "font-semibold whitespace-nowrap",
                              headerAlignClass(col.align),
                              headerStickyClass(col.sticky),
                              col.headerClassName
                            ),
                            style: widthStyle2(col),
                            children: col.sortable ? /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
                              "button",
                              {
                                type: "button",
                                onClick: () => handleSortClick(col),
                                "aria-label": `Ordenar por ${typeof headerContent === "string" ? headerContent : col.id}`,
                                className: cn(
                                  "inline-flex items-center gap-0 hover:text-brand-primary transition-colors",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm",
                                  isSorted && "text-brand-primary"
                                ),
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { children: headerContent }),
                                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(SortIcon, { direction })
                                ]
                              }
                            ) : /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { children: headerContent })
                          },
                          col.id
                        );
                      }),
                      rowActions && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                        "th",
                        {
                          scope: "col",
                          className: cn(
                            HEADER_PAD[resolvedSize],
                            "w-10",
                            headerStickyClass("right")
                          ),
                          "aria-label": "A\xE7\xF5es"
                        }
                      )
                    ] })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("tbody", { className: cn(loading && "opacity-50 pointer-events-none"), children: [
                  showError && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                    "td",
                    {
                      colSpan: totalColSpan,
                      className: "px-4 py-10 text-center text-error",
                      children: error
                    }
                  ) }),
                  showEmpty && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("td", { colSpan: totalColSpan, className: "p-0", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                    EmptyState,
                    {
                      title: (_a = emptyState == null ? void 0 : emptyState.title) != null ? _a : "Nenhum resultado",
                      description: emptyState == null ? void 0 : emptyState.description,
                      icon: emptyState == null ? void 0 : emptyState.icon,
                      action: emptyState == null ? void 0 : emptyState.action
                    }
                  ) }) }),
                  !showError && !showEmpty && data.map((row, i) => {
                    const rowId = rowIds[i];
                    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                      DataTableRow,
                      {
                        row,
                        rowId,
                        rowIndex: i,
                        columns: visibleColumns,
                        size: resolvedSize,
                        variant: resolvedVariant,
                        isSelected: selectionState.has(rowId),
                        selectable: selectionMode,
                        onToggleSelect: handleToggleRow,
                        rowActions: resolveActions(row),
                        onRowClick
                      },
                      rowId
                    );
                  })
                ] })
              ]
            }
          ),
          loading && hasData && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            "div",
            {
              className: "pointer-events-none absolute inset-0 flex items-center justify-center",
              "aria-hidden": "true",
              children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Spinner2, { size: "lg", tone: "brand", srLabel: "Carregando dados da tabela" })
            }
          ),
          loading && !hasData && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            "div",
            {
              className: "flex items-center justify-center py-16",
              "aria-hidden": "true",
              children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Spinner2, { size: "lg", tone: "brand", srLabel: "Carregando dados da tabela" })
            }
          )
        ] }),
        showPagination && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          DataTablePagination,
          {
            page: pageState,
            pageSize: pageSizeState,
            totalRows,
            pageSizeOptions,
            onPageChange: setPageState,
            onPageSizeChange: setPageSizeState,
            size: resolvedSize
          }
        )
      ]
    }
  );
}
var DataTableForwarded = React27.forwardRef(DataTableInner);
DataTableForwarded.displayName = "DataTable";
var DataTable = DataTableForwarded;

// src/primitives/DataTable/DataTableToolbar.tsx
var React28 = __toESM(require("react"));
var import_jsx_runtime29 = require("react/jsx-runtime");
var DataTableToolbar = React28.forwardRef(
  ({ className, start, end, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-between gap-3 px-3 py-2 flex-wrap",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex items-center gap-2 flex-1 min-w-[200px]", children: start }),
        children,
        end && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex items-center gap-2", children: end })
      ]
    }
  )
);
DataTableToolbar.displayName = "DataTableToolbar";

// src/containers/FormModal.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var FormModal = ({
  show,
  onClose,
  title,
  icon,
  size = "md",
  children,
  primaryAction,
  secondaryAction,
  isValid = true,
  isLoading = false,
  closeOnBackdrop = true,
  // scrollable é tratado nativamente pelo ModalBody (overflow-y-auto)
  scrollable: _scrollable = true,
  footerExtra
}) => {
  var _a, _b;
  const modalSize = size;
  const primaryVariant = (_a = primaryAction.variant) != null ? _a : "primary";
  const secondaryVariant = (_b = secondaryAction == null ? void 0 : secondaryAction.variant) != null ? _b : "outline-secondary";
  const primaryDisabled = !isValid || isLoading;
  const handleOpenChange = (next) => {
    if (!next) onClose();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    Modal,
    {
      open: show,
      onOpenChange: closeOnBackdrop ? handleOpenChange : (next) => {
        if (next) handleOpenChange(next);
      },
      size: modalSize,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(ModalHeader, { children: [
          icon ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "mr-2 inline-flex", children: icon }) : null,
          title
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(ModalBody, { children }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(ModalFooter, { children: [
          footerExtra ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "mr-auto", children: footerExtra }) : null,
          secondaryAction ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            Button,
            {
              variant: secondaryVariant,
              onClick: secondaryAction.onClick,
              disabled: isLoading,
              children: secondaryAction.label
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            Button,
            {
              variant: primaryVariant,
              onClick: primaryAction.onClick,
              disabled: primaryDisabled,
              leftIcon: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Spinner2, { size: "sm", variant: "border" }) : primaryAction.icon,
              children: primaryAction.label
            }
          )
        ] })
      ]
    }
  );
};

// src/frequencia/FrequenciaFormV2.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var DEFAULT_ESCALAS_VISIVEIS = [
  "hour",
  "day",
  "week",
  "month"
];
var ESCALA_LABELS = {
  millisecond: "Milissegundo(s)",
  second: "Segundo(s)",
  minute: "Minuto(s)",
  hour: "Hora(s)",
  day: "Dia(s)",
  week: "Semana(s)",
  month: "Mes(es)",
  year: "Ano(s)"
};
var toDatetimeLocal = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};
var FrequenciaFormV2 = ({
  value,
  onValorChange,
  onEscalaChange,
  onDataInicioChange,
  onClear,
  disabled,
  className,
  escalasVisiveis,
  showDataInicio = true
}) => {
  const visibleEscalas = escalasVisiveis && escalasVisiveis.length > 0 ? escalasVisiveis : DEFAULT_ESCALAS_VISIVEIS;
  if (value === null) {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className, children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "text-neutral-500 mb-2", children: "Sem recorrencia definida." }),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        Button,
        {
          size: "sm",
          variant: "outline-primary",
          disabled,
          onClick: () => {
            onValorChange(1);
            onEscalaChange(visibleEscalas[0]);
            if (showDataInicio && onDataInicioChange) {
              onDataInicioChange((/* @__PURE__ */ new Date()).toISOString());
            }
          },
          children: "Adicionar recorrencia"
        }
      )
    ] });
  }
  if (typeof console !== "undefined" && !visibleEscalas.includes(value.escala)) {
    console.warn(
      `[FrequenciaFormV2] value.escala="${value.escala}" nao esta em escalasVisiveis=[${visibleEscalas.join(
        ","
      )}]. Renderizando assim mesmo.`
    );
  }
  const handleDataInicio = (nextLocal) => {
    if (!onDataInicioChange) return;
    if (!nextLocal) {
      onDataInicioChange(void 0);
      return;
    }
    const iso = new Date(nextLocal).toISOString();
    onDataInicioChange(iso);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex flex-wrap gap-2 items-end", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "basis-32 grow-0 shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      TextField,
      {
        label: "A cada",
        type: "number",
        min: 1,
        disabled,
        value: value.valor,
        onChange: (e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n) && n >= 1) onValorChange(n);
        }
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "basis-40 grow shrink", children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("label", { className: "block text-sm font-medium text-neutral-700 mb-1", children: "Escala" }),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
        Select,
        {
          value: value.escala,
          onValueChange: (v) => onEscalaChange(v),
          disabled,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SelectValue, {}) }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SelectContent, { children: visibleEscalas.map((key) => {
              var _a;
              return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SelectItem, { value: key, children: (_a = ESCALA_LABELS[key]) != null ? _a : key }, key);
            }) })
          ]
        }
      )
    ] }),
    showDataInicio && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "basis-56 grow shrink", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      TextField,
      {
        label: "Data de inicio",
        type: "datetime-local",
        disabled,
        value: toDatetimeLocal(value.dataInicio),
        onChange: (e) => handleDataInicio(e.target.value)
      }
    ) }),
    onClear && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      Button,
      {
        size: "sm",
        variant: "outline-danger",
        disabled,
        onClick: onClear,
        children: "Remover recorrencia"
      }
    ) })
  ] }) });
};

// src/contador/ContadorPicker.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime32 = require("react/jsx-runtime");
var BOUND_RULES = [">=", "<=", ">", "<", "==", "!="];
var emptyLimite = {
  nome: "",
  boundRule: ">=",
  valor: 0
};
var ContadorPicker = ({
  value,
  onValorChange,
  onUnidadeChange,
  onParametroChange,
  onLimiteAdd,
  onLimiteRemove,
  onLimiteUpdate,
  disabled = false,
  hideLimites = false,
  parametroPlaceholder = "Ex.: Temperatura",
  unidadePlaceholder = "Ex.: \xB0C",
  className
}) => {
  var _a, _b, _c, _d;
  const limites = (_a = value == null ? void 0 : value.limitesDeControle) != null ? _a : [];
  const handleValor = (raw) => {
    if (raw === "") {
      onValorChange(null);
      return;
    }
    const n = Number(raw);
    onValorChange(Number.isFinite(n) ? n : null);
  };
  const handleLimiteField = (index, field, raw) => {
    var _a2;
    const current = (_a2 = limites[index]) != null ? _a2 : {};
    const next = { ...current };
    if (field === "valor") {
      const n = Number(raw);
      next.valor = raw === "" ? "" : Number.isFinite(n) ? n : raw;
    } else {
      next[field] = raw;
    }
    onLimiteUpdate(index, next);
  };
  const limiteRows = import_react.default.useMemo(
    () => limites.map((l, i) => ({ ...l, __index: i })),
    [limites]
  );
  const limiteColumns = import_react.default.useMemo(
    () => [
      {
        id: "nome",
        header: "Nome",
        width: "40%",
        cell: (row) => {
          var _a2;
          return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
            TextField,
            {
              size: "sm",
              type: "text",
              value: (_a2 = row == null ? void 0 : row.nome) != null ? _a2 : "",
              onChange: (e) => handleLimiteField(row.__index, "nome", e.target.value),
              placeholder: "Ex.: Limite M\xEDnimo",
              disabled,
              "aria-label": `Nome do limite ${row.__index + 1}`
            }
          );
        }
      },
      {
        id: "boundRule",
        header: "Regra",
        width: "20%",
        cell: (row) => {
          var _a2;
          return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
            "select",
            {
              className: "block w-full rounded-md border border-surface-border bg-surface-background text-surface-foreground h-8 px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed",
              value: (_a2 = row == null ? void 0 : row.boundRule) != null ? _a2 : ">=",
              onChange: (e) => handleLimiteField(row.__index, "boundRule", e.target.value),
              disabled,
              "aria-label": `Regra do limite ${row.__index + 1}`,
              children: BOUND_RULES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("option", { value: r, children: r }, r))
            }
          );
        }
      },
      {
        id: "valor",
        header: "Valor",
        width: "25%",
        cell: (row) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          TextField,
          {
            size: "sm",
            type: "number",
            value: (row == null ? void 0 : row.valor) === void 0 || (row == null ? void 0 : row.valor) === null ? "" : String(row.valor),
            onChange: (e) => handleLimiteField(row.__index, "valor", e.target.value),
            disabled,
            "aria-label": `Valor do limite ${row.__index + 1}`
          }
        )
      },
      {
        id: "actions",
        header: "",
        width: "15%",
        align: "right",
        cell: (row) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          Button,
          {
            variant: "outline-danger",
            size: "sm",
            onClick: () => onLimiteRemove(row.__index),
            disabled,
            "aria-label": `Remover limite ${row.__index + 1}`,
            children: "Remover"
          }
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, limites, onLimiteRemove]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
      TextField,
      {
        id: "contador-parametro",
        label: "Par\xE2metro",
        type: "text",
        value: (_b = value == null ? void 0 : value.parametro) != null ? _b : "",
        onChange: (e) => onParametroChange(e.target.value),
        placeholder: parametroPlaceholder,
        disabled
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "mb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        "label",
        {
          htmlFor: "contador-leitura",
          className: "block text-sm font-medium text-neutral-700 mb-1",
          children: "Leitura"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(InputGroup, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          TextField,
          {
            id: "contador-leitura",
            type: "number",
            value: (_c = value == null ? void 0 : value.valor) != null ? _c : "",
            onChange: (e) => handleValor(e.target.value),
            placeholder: "0",
            disabled,
            wrapperClassName: "flex-1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(InputGroupText, { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          "input",
          {
            type: "text",
            value: (_d = value == null ? void 0 : value.unidade) != null ? _d : "",
            onChange: (e) => onUnidadeChange(e.target.value),
            placeholder: unidadePlaceholder,
            disabled,
            "aria-label": "Unidade",
            className: "bg-transparent border-0 outline-none p-0 text-sm w-[140px] placeholder:text-neutral-400 disabled:text-neutral-400"
          }
        ) })
      ] })
    ] }),
    !hideLimites && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "contador-limites mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { className: "block text-sm font-medium text-neutral-700", children: "Limites de controle" }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          Button,
          {
            variant: "outline-primary",
            size: "sm",
            onClick: () => onLimiteAdd({ ...emptyLimite }),
            disabled,
            children: "+ Adicionar limite"
          }
        )
      ] }),
      limites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "text-neutral-500 text-xs italic", children: "Nenhum limite configurado." }) : /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        DataTable,
        {
          data: limiteRows,
          columns: limiteColumns,
          getRowId: (row) => String(row.__index),
          size: "sm",
          variant: "minimal",
          stickyHeader: false,
          ariaLabel: "Limites de controle"
        }
      )
    ] })
  ] });
};

// src/anexo/AnexoManager.tsx
var import_react2 = require("react");
var import_react_dropzone = require("react-dropzone");
var import_fi = require("react-icons/fi");
var import_fa = require("react-icons/fa");
var import_jsx_runtime33 = require("react/jsx-runtime");
var UNIVERSAL_ACCEPT = {
  "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".svg"],
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "text/csv": [".csv"],
  "video/*": [".mp4", ".webm", ".avi", ".mov", ".mkv"],
  "audio/*": [".mp3", ".wav", ".ogg", ".aac", ".m4a"],
  "application/zip": [".zip", ".rar", ".7z", ".tar.gz"],
  "text/plain": [".txt", ".log"]
};
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function isImageAnexo(a) {
  const t = (a.mimeType || a.tipo || "").toString();
  if (t.startsWith("image/")) return true;
  const n = (a.nome || a.originalName || "").toString();
  if (/\.(jpe?g|png|gif|webp|bmp|svg|avif|heic)$/i.test(n)) return true;
  return getFileCategory(a.mimeType || a.tipo, a.nome || a.originalName) === "img";
}
function getFileCategory(tipo, nome) {
  var _a;
  const t = (tipo != null ? tipo : "").toString();
  const n = (nome != null ? nome : "").toString();
  const ext = ((_a = n.split(".").pop()) == null ? void 0 : _a.toLowerCase()) || "";
  if (t.startsWith("image/")) return "img";
  if (t === "application/pdf" || ext === "pdf") return "pdf";
  if (t.includes("word") || ext === "doc" || ext === "docx") return "doc";
  if (t.includes("excel") || t.includes("spreadsheet") || ext === "xls" || ext === "xlsx") return "xls";
  if (ext === "csv" || t === "text/csv") return "csv";
  if (t.startsWith("video/")) return "vid";
  if (t.startsWith("audio/")) return "aud";
  if (t.includes("zip") || t.includes("rar") || ext === "zip" || ext === "rar" || ext === "7z") return "zip";
  return "generic";
}
function FileIcon({ category }) {
  switch (category) {
    case "pdf":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fa.FaFilePdf, {});
    case "doc":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fa.FaFileWord, {});
    case "xls":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fa.FaFileExcel, {});
    case "csv":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fa.FaFileCsv, {});
    case "img":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiImage, {});
    case "vid":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiFilm, {});
    case "aud":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiMusic, {});
    case "zip":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fa.FaFileArchive, {});
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiFile, {});
  }
}
var ICON_BG_BY_CAT = {
  pdf: "bg-red-500",
  doc: "bg-blue-500",
  xls: "bg-green-500",
  img: "bg-violet-500",
  vid: "bg-orange-500",
  aud: "bg-pink-500",
  csv: "bg-teal-500",
  zip: "bg-indigo-500",
  generic: "bg-slate-400"
};
var AnexoManager = ({
  persistidos = [],
  locais = [],
  onAddFiles,
  onRemoveLocal,
  onRemovePersistido,
  onDownload,
  onRetry,
  loading = false,
  readonly = false,
  maxFileSize = 50 * 1024 * 1024,
  maxFiles = 10,
  dropzoneLabel,
  getImageReadUrl
}) => {
  const [thumbUrls, setThumbUrls] = (0, import_react2.useState)({});
  const [unavailableIds, setUnavailableIds] = (0, import_react2.useState)(/* @__PURE__ */ new Set());
  const [persistImageUrls, setPersistImageUrls] = (0, import_react2.useState)({});
  const [persistImageLoading, setPersistImageLoading] = (0, import_react2.useState)(/* @__PURE__ */ new Set());
  const [lightbox, setLightbox] = (0, import_react2.useState)(null);
  const getImageReadUrlRef = (0, import_react2.useRef)(getImageReadUrl);
  getImageReadUrlRef.current = getImageReadUrl;
  const persistidosSig = JSON.stringify(
    persistidos.map((a) => ({
      id: a.id,
      u: a.url,
      s: a.signedUrl,
      k: a.key,
      m: a.mimeType || a.tipo,
      n0: a.nome,
      n1: a.originalName,
      un: a.unavailable
    }))
  );
  const handleDownload = (0, import_react2.useCallback)(async (anexo) => {
    if (!onDownload) return;
    const url = anexo.url || anexo.signedUrl;
    if (url) {
      try {
        const res = await fetch(url, { method: "HEAD", mode: "cors" });
        if (res.ok) {
          onDownload(anexo);
          return;
        }
      } catch (e) {
      }
      setUnavailableIds((prev) => new Set(prev).add(anexo.id));
      return;
    }
    onDownload(anexo);
  }, [onDownload]);
  (0, import_react2.useEffect)(() => {
    const newUrls = {};
    locais.forEach((a) => {
      var _a;
      const t = a.tipo || ((_a = a.file) == null ? void 0 : _a.type) || "";
      if (t.startsWith("image/") && !thumbUrls[a.localId]) {
        newUrls[a.localId] = URL.createObjectURL(a.file);
      }
    });
    if (Object.keys(newUrls).length) {
      setThumbUrls((prev) => ({ ...prev, ...newUrls }));
    }
    return () => {
      Object.values(newUrls).forEach(URL.revokeObjectURL);
    };
  }, [locais]);
  (0, import_react2.useEffect)(() => {
    let cancelled = false;
    setPersistImageUrls({});
    setPersistImageLoading(/* @__PURE__ */ new Set());
    const idStr = (id) => String(id);
    const resolve = getImageReadUrlRef.current;
    const run = async () => {
      for (const anexo of persistidos) {
        if (!isImageAnexo(anexo)) continue;
        const sid = idStr(anexo.id);
        const direct = anexo.url || anexo.signedUrl;
        if (direct) {
          setPersistImageUrls((p) => ({ ...p, [sid]: direct }));
          continue;
        }
        if (resolve) {
          setPersistImageLoading((s) => new Set(s).add(sid));
          try {
            const u = await resolve(anexo);
            if (!cancelled && u) {
              setPersistImageUrls((p) => ({ ...p, [sid]: u }));
            }
          } catch (e) {
            if (!cancelled) {
            }
          } finally {
            if (!cancelled) {
              setPersistImageLoading((s) => {
                const n = new Set(s);
                n.delete(sid);
                return n;
              });
            }
          }
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [persistidosSig]);
  const openImagePreview = (0, import_react2.useCallback)(
    (anexo) => {
      if (!isImageAnexo(anexo)) return;
      const sid = String(anexo.id);
      const u = persistImageUrls[sid] || anexo.url || anexo.signedUrl;
      if (u) {
        setLightbox({ url: u, title: anexo.nome || anexo.originalName || "Imagem" });
        return;
      }
      const resolve = getImageReadUrlRef.current;
      if (resolve) {
        void (async () => {
          try {
            const url = await resolve(anexo);
            if (url) setLightbox({ url, title: anexo.nome || anexo.originalName || "Imagem" });
          } catch (e) {
          }
        })();
      }
    },
    [persistImageUrls]
  );
  const openLocalImagePreview = (0, import_react2.useCallback)((url, title) => {
    if (url) setLightbox({ url, title });
  }, []);
  const onDrop = (0, import_react2.useCallback)(
    (acceptedFiles) => {
      if (onAddFiles) onAddFiles(acceptedFiles);
    },
    [onAddFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = (0, import_react_dropzone.useDropzone)({
    onDrop,
    maxSize: maxFileSize,
    maxFiles,
    accept: UNIVERSAL_ACCEPT,
    disabled: readonly
  });
  (0, import_react2.useMemo)(
    () => Object.values(UNIVERSAL_ACCEPT).flat().map((e) => e.replace(".", "").toUpperCase()),
    []
  );
  const totalCount = persistidos.length + locais.length;
  const fileItemCls = cn(
    "flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white",
    "px-3 py-2.5 transition-shadow duration-150 hover:shadow-sm"
  );
  const fileNameCls = "text-[0.85rem] font-medium text-slate-800 truncate";
  const fileNameLinkCls = cn(
    "block w-full text-left bg-transparent border-0 p-0 cursor-pointer",
    "text-[0.85rem] font-medium text-blue-600 truncate rounded",
    "hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
  );
  const fileMetaCls = "mt-px flex items-center gap-1.5 text-[0.72rem] text-slate-400";
  const iconChipCls = (cat) => {
    var _a;
    return cn(
      "flex shrink-0 items-center justify-center w-9 h-9 rounded-lg text-white text-[1.1rem]",
      (_a = ICON_BG_BY_CAT[cat]) != null ? _a : ICON_BG_BY_CAT.generic
    );
  };
  const thumbBtnCls = cn(
    "shrink-0 p-0 border-0 bg-transparent cursor-pointer rounded-[10px] leading-none",
    "transition-[box-shadow,transform] duration-150",
    "hover:shadow-md hover:scale-[1.02]",
    "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
  );
  const thumbImgCls = "shrink-0 w-12 h-12 rounded-[10px] object-cover border border-slate-200";
  const thumbSkelCls = cn(
    "shrink-0 w-12 h-12 rounded-[10px]",
    "bg-[linear-gradient(90deg,#e2e8f0_0%,#f1f5f9_50%,#e2e8f0_100%)] bg-[length:200%_100%]",
    "animate-[anexo-shimmer_1.2s_ease-in-out_infinite]"
  );
  const actionBtnBaseCls = cn(
    "inline-flex items-center justify-center w-7 h-7 rounded-md border-0 cursor-pointer",
    "text-[0.85rem] bg-slate-100 text-slate-500",
    "transition-colors duration-150 hover:bg-slate-200 hover:text-slate-800",
    "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1"
  );
  const dangerBtnCls = "hover:!bg-red-100 hover:!text-red-600";
  const downloadBtnCls = "hover:!bg-blue-100 hover:!text-blue-600";
  const progressToneByStatus = (status) => {
    if (status === "done") return "success";
    if (status === "error") return "error";
    return "brand";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex w-full flex-col gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("style", { children: `@keyframes anexo-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }` }),
    !readonly && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
      "div",
      {
        ...getRootProps(),
        className: cn(
          "select-none cursor-pointer rounded-[10px] border-2 border-dashed text-center",
          "transition-[border-color,background-color] duration-200",
          "px-4 py-6 sm:px-4 sm:py-6",
          "border-slate-300 bg-slate-50",
          "hover:border-blue-500 hover:bg-blue-50",
          isDragActive && "!border-blue-500 !bg-blue-100",
          "max-sm:px-3 max-sm:py-4"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("input", { ...getInputProps() }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex flex-col items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              import_fi.FiUploadCloud,
              {
                className: cn(
                  "text-[2rem]",
                  isDragActive ? "text-blue-500" : "text-slate-400"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("p", { className: "text-sm text-slate-500", children: dropzoneLabel || /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_jsx_runtime33.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("strong", { className: "text-blue-500 cursor-pointer", children: "Clique para selecionar" }),
              " ou arraste arquivos aqui"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("p", { className: "mt-0.5 text-xs text-slate-400", children: [
              "Max. ",
              formatFileSize(maxFileSize),
              " por arquivo - Ate ",
              maxFiles,
              " arquivos"
            ] })
          ] })
        ]
      }
    ),
    (totalCount > 0 || loading) && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex flex-col gap-2", children: [
      loading && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 p-4 text-[0.85rem] text-slate-400", children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Spinner2, { size: "sm", tone: "brand", srLabel: "Carregando anexos" }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: "Carregando anexos..." })
      ] }),
      persistidos.map((anexo) => {
        const displayName = anexo.nome || anexo.originalName || "Anexo";
        const cat = getFileCategory(anexo.mimeType || anexo.tipo, displayName);
        const isUnavailable = anexo.unavailable || unavailableIds.has(anexo.id);
        const isImg = isImageAnexo(anexo);
        const sid = String(anexo.id);
        const pImg = persistImageUrls[sid] || anexo.url || anexo.signedUrl;
        const pLoading = isImg && !pImg && persistImageLoading.has(sid);
        const canPreviewImage = isImg && !isUnavailable && (Boolean(pImg) || Boolean(getImageReadUrl));
        return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
          "div",
          {
            className: cn(fileItemCls, isUnavailable && "opacity-50"),
            children: [
              isImg && pImg && !isUnavailable ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                "button",
                {
                  type: "button",
                  className: thumbBtnCls,
                  title: "Ver imagem",
                  onClick: () => openImagePreview(anexo),
                  children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("img", { src: pImg, alt: "", className: thumbImgCls })
                }
              ) : isImg && pLoading ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: thumbSkelCls, "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: cn(iconChipCls(cat), isUnavailable && "!bg-slate-400"), children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FileIcon, { category: cat }) }),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex-1 min-w-0", children: [
                canPreviewImage ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                  "button",
                  {
                    type: "button",
                    className: fileNameLinkCls,
                    title: displayName,
                    onClick: () => openImagePreview(anexo),
                    children: displayName
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: fileNameCls, title: displayName, children: displayName }),
                /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: fileMetaCls, children: [
                  isUnavailable && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-[0.72rem] font-medium text-red-500", children: "Anexo indisponivel" }),
                  !isUnavailable && anexo.tamanho ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: formatFileSize(anexo.tamanho) }) : null,
                  anexo.createdAt && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: new Date(anexo.createdAt).toLocaleDateString("pt-BR") })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex shrink-0 gap-1", children: [
                onDownload && !isUnavailable && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                  "button",
                  {
                    type: "button",
                    className: cn(actionBtnBaseCls, downloadBtnCls),
                    title: isImg ? "Abrir em nova aba" : "Download",
                    onClick: () => handleDownload(anexo),
                    children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiDownload, {})
                  }
                ),
                !readonly && onRemovePersistido && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                  "button",
                  {
                    type: "button",
                    className: cn(actionBtnBaseCls, dangerBtnCls),
                    title: "Remover",
                    onClick: () => onRemovePersistido(anexo.id),
                    children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiTrash2, {})
                  }
                )
              ] })
            ]
          },
          `p-${anexo.id}`
        );
      }),
      locais.map((anexo) => {
        var _a, _b;
        const localNome = anexo.nome || ((_a = anexo.file) == null ? void 0 : _a.name) || "Arquivo";
        const localTipo = anexo.tipo || ((_b = anexo.file) == null ? void 0 : _b.type) || "";
        const cat = getFileCategory(localTipo, localNome);
        const isImg = localTipo.startsWith("image/");
        const localPreviewUrl = isImg ? thumbUrls[anexo.localId] : void 0;
        const showProgress = anexo.status === "uploading" || anexo.status === "done" || anexo.status === "error";
        return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: fileItemCls, children: [
          isImg && localPreviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "button",
            {
              type: "button",
              className: thumbBtnCls,
              title: "Pr\xE9-visualizar",
              onClick: () => openLocalImagePreview(localPreviewUrl, localNome),
              children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("img", { src: localPreviewUrl, alt: "", className: thumbImgCls })
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: iconChipCls(cat), children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FileIcon, { category: cat }) }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex-1 min-w-0", children: [
            isImg && localPreviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              "button",
              {
                type: "button",
                className: fileNameLinkCls,
                title: localNome,
                onClick: () => openLocalImagePreview(localPreviewUrl, localNome),
                children: localNome
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: fileNameCls, title: localNome, children: localNome }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: fileMetaCls, children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: formatFileSize(anexo.tamanho) }),
              anexo.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-[0.72rem] font-medium text-blue-500", children: "Enviando..." }),
              anexo.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-[0.72rem] font-medium text-red-500", children: anexo.errorMessage || "Erro" })
            ] }),
            showProgress && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "mt-1.5", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              Progress,
              {
                value: anexo.status === "error" ? 100 : anexo.progress,
                tone: progressToneByStatus(anexo.status),
                size: "sm",
                "aria-label": anexo.status === "error" ? `Erro no upload de ${localNome}` : `Upload de ${localNome}`
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex shrink-0 gap-1", children: [
            anexo.status === "error" && onRetry && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              "button",
              {
                type: "button",
                className: actionBtnBaseCls,
                title: "Tentar novamente",
                onClick: () => onRetry(anexo.localId),
                children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiRefreshCw, {})
              }
            ),
            (anexo.status === "pending" || anexo.status === "error") && onRemoveLocal && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              "button",
              {
                type: "button",
                className: cn(actionBtnBaseCls, dangerBtnCls),
                title: "Remover",
                onClick: () => onRemoveLocal(anexo.localId),
                children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiTrash2, {})
              }
            )
          ] })
        ] }, `l-${anexo.localId}`);
      })
    ] }),
    !loading && totalCount === 0 && readonly && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "rounded-lg border border-dashed border-slate-200 p-4 text-center text-[0.85rem] text-slate-400", children: "Nenhum anexo encontrado." }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      Modal,
      {
        open: !!lightbox,
        onOpenChange: (open) => {
          if (!open) setLightbox(null);
        },
        size: "xl",
        className: "!bg-transparent !shadow-none",
        children: lightbox && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(ModalBody, { className: "!p-0 flex flex-col items-stretch gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "div",
            {
              className: "text-xs font-medium text-slate-50 truncate pr-11 max-w-[min(90vw,1000px)]",
              title: lightbox.title,
              children: lightbox.title
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "flex max-h-[calc(92vh-48px)] items-center justify-center overflow-auto rounded-xl bg-slate-900 shadow-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "img",
            {
              src: lightbox.url,
              alt: lightbox.title,
              className: "block w-auto h-auto max-w-full max-h-[min(80vh,900px)] object-contain"
            }
          ) })
        ] })
      }
    )
  ] });
};

// src/click-to-write/ClickToWriteField.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
var ClickToWriteField = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  isActive,
  onHide,
  initialValue,
  fallBack,
  onEnterPress,
  ...props
}) => {
  const { size = "sm", ...rest } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
    TextField,
    {
      wrapperClassName: "mb-2",
      label,
      size,
      value: value != null ? value : "",
      onChange: (e) => onChange == null ? void 0 : onChange(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter" && typeof onEnterPress === "function") {
          onEnterPress(e.target.value);
        }
      },
      onBlur: (e) => {
        if (typeof onHide === "function") {
          onHide(e.target.value);
        }
      },
      placeholder,
      disabled,
      ...rest
    }
  );
};

// src/combine-mode/CombineModeToggle.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
var VennIcon = ({ variant, size = 18 }) => {
  const FILL = "currentColor";
  const OFF = "none";
  const STROKE = "currentColor";
  const strokeWidth = 1.4;
  if (variant === "intersection") {
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("clipPath", { id: "clipA-intersection", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "circle",
            {
              cx: "15",
              cy: "12",
              r: "6",
              fill: FILL,
              clipPath: "url(#clipA-intersection)",
              opacity: 0.85
            }
          )
        ]
      }
    );
  }
  if (variant === "xor") {
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("mask", { id: "mask-xor", children: [
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("rect", { width: "24", height: "24", fill: "black" }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: "white" }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: "white" }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: "black", mask: "url(#inner-xor)" }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("g", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: "white" }),
              /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: "white" })
            ] })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("clipPath", { id: "clipA-xor", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
              "circle",
              {
                cx: "15",
                cy: "12",
                r: "6",
                fill: "white",
                clipPath: "url(#clipA-xor)"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth })
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth })
      ]
    }
  );
};
var MODE_CONFIG = {
  union: {
    label: "Uni\xE3o",
    short: "OU",
    description: "Exibe itens que batem com qualquer filtro ativo (A \u222A B)."
  },
  intersection: {
    label: "Intersec\xE7\xE3o",
    short: "E",
    description: "Exibe apenas itens que batem com todos os filtros ativos (A \u2229 B)."
  },
  xor: {
    label: "Exclusivo",
    short: "XOR",
    description: "Exibe itens que batem em apenas um dos filtros ativos \u2014 exclui a intersec\xE7\xE3o (A \u25B3 B)."
  }
};
var MODES = ["union", "intersection", "xor"];
var CombineModeToggle = ({
  mode,
  onChange,
  showLabel = false,
  disabled = false,
  size = 18,
  className
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    "div",
    {
      role: "group",
      "aria-label": "Modo de combina\xE7\xE3o dos filtros",
      className: `combine-mode-toggle btn-group btn-group-sm ${className != null ? className : ""}`.trim(),
      children: MODES.map((m) => {
        const cfg = MODE_CONFIG[m];
        const isActive = m === mode;
        return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
          "button",
          {
            type: "button",
            className: `btn ${isActive ? "btn-primary" : "btn-outline-secondary"}`,
            onClick: () => onChange(m),
            disabled,
            title: cfg.description,
            "aria-pressed": isActive,
            "aria-label": `${cfg.label}: ${cfg.description}`,
            style: { display: "inline-flex", alignItems: "center", gap: 4 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(VennIcon, { variant: m, size }),
              showLabel ? /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { style: { fontSize: "0.75rem" }, children: cfg.short }) : null
            ]
          },
          m
        );
      })
    }
  );
};

// src/color-picker/ColorPicker.tsx
var import_react3 = __toESM(require("react"));
var import_jsx_runtime36 = require("react/jsx-runtime");
var PRESET_COLORS = [
  "#e74c3c",
  // vermelho
  "#e67e22",
  // laranja
  "#f1c40f",
  // amarelo
  "#2ecc71",
  // verde
  "#1abc9c",
  // turquesa
  "#3498db",
  // azul
  "#9b59b6",
  // roxo
  "#34495e",
  // cinza escuro
  "#ecf0f1",
  // cinza claro
  "#ffffff"
  // branco
];
function ColorPicker({ defaultColor = "#3498db", setCor, disabled = false, label = "Cor" }) {
  const [value, setValue] = import_react3.default.useState(defaultColor);
  const handleChange = (hex) => {
    setValue(hex);
    setCor(hex);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: "color-picker-container mb-3", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("label", { className: "form-label fw-semibold", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: "d-flex align-items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
        "input",
        {
          type: "color",
          className: "form-control form-control-color",
          style: { width: "48px", height: "38px", padding: "2px", cursor: disabled ? "not-allowed" : "pointer" },
          value,
          onChange: (e) => handleChange(e.target.value),
          disabled,
          title: "Escolher cor personalizada"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: "d-flex gap-1 flex-wrap", children: PRESET_COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
        "button",
        {
          type: "button",
          title: color,
          disabled,
          onClick: () => handleChange(color),
          style: {
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: color,
            border: value === color ? "3px solid #333" : "2px solid #ccc",
            cursor: disabled ? "not-allowed" : "pointer",
            flexShrink: 0,
            transition: "border 0.15s"
          }
        },
        color
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
        "span",
        {
          className: "badge rounded-pill text-dark border",
          style: { background: value, minWidth: "80px", fontSize: "0.75rem", letterSpacing: "0.05em" },
          children: value.toUpperCase()
        }
      )
    ] })
  ] });
}

// src/buttons/FormActionButtons.tsx
var import_react5 = require("react");
var import_fi2 = require("react-icons/fi");

// src/buttons/DeleteConfirm.tsx
var import_react4 = require("react");
var import_jsx_runtime37 = require("react/jsx-runtime");
var DeleteConfirm = ({
  show,
  onHide,
  onConfirm,
  title = "Confirma\xE7\xE3o de Exclus\xE3o",
  dialogText,
  payload,
  needExclusionDetails = false,
  minDetailsLength = 8
}) => {
  const [details, setDetails] = (0, import_react4.useState)("");
  const resolveDialog = () => {
    if (typeof dialogText === "function") return dialogText(payload);
    return dialogText != null ? dialogText : "Voc\xEA tem certeza que deseja excluir este item?";
  };
  const canConfirm = !needExclusionDetails || details.length >= minDetailsLength;
  const handleConfirm = () => {
    onConfirm(details);
    setDetails("");
    onHide(false);
  };
  const handleHide = () => {
    setDetails("");
    onHide(false);
  };
  const handleOpenChange = (next) => {
    if (!next) handleHide();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Modal, { open: show, onOpenChange: handleOpenChange, size: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(ModalHeader, { children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("strong", { children: resolveDialog() }),
      needExclusionDetails && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
        TextField,
        {
          label: `Motivo da Exclus\xE3o (m\xEDn. ${minDetailsLength} caracteres)`,
          multiline: true,
          rows: 3,
          value: details,
          onChange: (e) => setDetails(e.target.value),
          placeholder: "Descreva o motivo...",
          autoFocus: true
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(ModalFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Button, { variant: "secondary", onClick: handleHide, children: "Cancelar" }),
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Button, { variant: "danger", disabled: !canConfirm, onClick: handleConfirm, children: "Confirmar Exclus\xE3o" })
    ] })
  ] });
};

// src/buttons/FormActionButtons.tsx
var import_jsx_runtime38 = require("react/jsx-runtime");
var visible = (callback, flag) => Boolean(callback) && flag !== false;
var FormActionButtons = ({
  onSave,
  saveLabel = "Salvar",
  saveVariant = "primary",
  showSave,
  onDelete,
  deleteLabel = "Excluir",
  deleteConfirmMsg,
  needExclusionDetails = false,
  showDelete,
  onBack,
  backLabel = "Voltar",
  showBack,
  onCancelEdit,
  cancelEditLabel = "Cancelar",
  showCancelEdit,
  onCopy,
  copyLabel = "Copiar Formul\xE1rio",
  showCopy,
  isEditing = false,
  disabled = false,
  useDelayedDelete = false,
  delayedDeleteTimeout = 3e3,
  PermissionWrapper,
  className
}) => {
  const [showConfirm, setShowConfirm] = (0, import_react5.useState)(false);
  const [holding, setHolding] = (0, import_react5.useState)(false);
  const [progress, setProgress] = (0, import_react5.useState)(0);
  const timeoutRef = (0, import_react5.useRef)(null);
  const intervalRef = (0, import_react5.useRef)(null);
  const stopHold = () => {
    setHolding(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
  };
  const startHold = () => {
    if (disabled || !onDelete) return;
    setHolding(true);
    setProgress(0);
    const step = 2;
    const tickTime = delayedDeleteTimeout / (100 / step);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => prev >= 100 ? 100 : prev + step);
    }, tickTime);
    timeoutRef.current = setTimeout(() => {
      stopHold();
      onDelete();
    }, delayedDeleteTimeout);
  };
  const renderDeleteButton = () => {
    if (!isEditing || !visible(onDelete, showDelete)) return null;
    if (useDelayedDelete) {
      return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "relative inline-block m-0.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          Button,
          {
            variant: "outline-danger",
            onMouseDown: startHold,
            onMouseUp: stopHold,
            onMouseLeave: stopHold,
            onTouchStart: startHold,
            onTouchEnd: stopHold,
            disabled,
            leftIcon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi2.FiTrash2, {}),
            className: "min-w-[120px]",
            children: holding ? "Segure..." : deleteLabel
          }
        ),
        holding && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          Progress,
          {
            value: progress,
            tone: "error",
            size: "sm",
            className: "absolute bottom-0 left-0 right-0 rounded-none rounded-b-md"
          }
        )
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
      Button,
      {
        variant: "danger",
        onClick: () => setShowConfirm(true),
        disabled,
        leftIcon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi2.FiTrash2, {}),
        className: "m-0.5",
        children: deleteLabel
      }
    );
  };
  const deleteButton = renderDeleteButton();
  const wrappedDelete = deleteButton && PermissionWrapper ? /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(PermissionWrapper, { children: deleteButton }) : deleteButton;
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_jsx_runtime38.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
      DeleteConfirm,
      {
        show: showConfirm,
        onHide: setShowConfirm,
        onConfirm: (details) => onDelete == null ? void 0 : onDelete(details),
        dialogText: deleteConfirmMsg,
        needExclusionDetails
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: cn("flex flex-wrap items-center mt-3 gap-1", className), children: [
      visible(onBack, showBack) && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        Button,
        {
          variant: "outline-secondary",
          onClick: onBack,
          disabled,
          leftIcon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi2.FiChevronLeft, {}),
          className: "m-0.5",
          children: backLabel
        }
      ),
      isEditing && visible(onCancelEdit, showCancelEdit) && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        Button,
        {
          variant: "warning",
          onClick: onCancelEdit,
          disabled,
          leftIcon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi2.FiRotateCcw, {}),
          className: "m-0.5",
          children: cancelEditLabel
        }
      ),
      wrappedDelete,
      visible(onSave, showSave) && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        Button,
        {
          variant: saveVariant,
          onClick: onSave,
          disabled,
          leftIcon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi2.FiSave, {}),
          className: "m-0.5",
          children: saveLabel
        }
      ),
      isEditing && visible(onCopy, showCopy) && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        Button,
        {
          variant: "outline-primary",
          onClick: onCopy,
          disabled,
          leftIcon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi2.FiCopy, {}),
          className: "m-0.5",
          children: copyLabel
        }
      )
    ] })
  ] });
};

// src/icons/IconWithBadge.tsx
var import_jsx_runtime39 = require("react/jsx-runtime");
var IconWithBadge = ({
  icon,
  content,
  mode = "overlay",
  bg = "danger"
}) => {
  const showBadge = content !== null && content !== void 0 && content !== 0 && content !== "";
  const tone = bg;
  if (mode === "inline") {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "inline-flex items-center gap-1.5", children: [
      icon,
      showBadge ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
        Badge,
        {
          tone,
          pill: true,
          size: "sm",
          className: "opacity-90 font-semibold",
          children: content
        }
      ) : null
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "relative inline-block", children: [
    icon,
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      Badge,
      {
        tone,
        pill: true,
        size: "sm",
        className: "absolute -top-1.5 -right-2.5 min-w-[20px] min-h-[20px] px-1",
        style: { display: showBadge ? "inline-flex" : "none" },
        children: content
      }
    )
  ] });
};

// src/primitives/DividerWithButton/DividerWithButton.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
var PlusIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    "aria-hidden": "true",
    className,
    children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("path", { d: "M8 3v10M3 8h10" })
  }
);
var DividerWithButton = ({
  label,
  icon,
  onClick,
  variant = "outline-secondary",
  size = "sm",
  disabled,
  className,
  children
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    "div",
    {
      className: cn(
        "flex items-center gap-2 my-2",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("hr", { className: "flex-grow border-0 border-t border-neutral-300 m-0" }),
        children != null ? children : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          Button,
          {
            type: "button",
            variant,
            size,
            onClick,
            disabled,
            leftIcon: icon != null ? icon : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(PlusIcon, { className: "h-3.5 w-3.5" }),
            children: label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("hr", { className: "flex-grow border-0 border-t border-neutral-300 m-0" })
      ]
    }
  );
};
DividerWithButton.displayName = "DividerWithButton";

// src/text/TextWithMore.tsx
var React34 = __toESM(require("react"));
var import_jsx_runtime41 = require("react/jsx-runtime");
var TextWithMore = ({
  text = "Carregando...",
  maxLength,
  moreLabel = "ver mais",
  lessLabel = "ver menos",
  className
}) => {
  var _a;
  const [expanded, setExpanded] = React34.useState(false);
  const isTruncated = ((_a = text == null ? void 0 : text.length) != null ? _a : 0) > maxLength;
  const displayText = isTruncated && !expanded ? `${text.slice(0, maxLength)}\u2026` : text;
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_jsx_runtime41.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: cn("text-with-more-content", className), children: displayText }),
    isTruncated && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((v) => !v),
        className: cn(
          "ml-2 inline-flex items-center p-0 text-sm font-medium",
          "text-primary-600 hover:text-primary-700 hover:underline",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
          "bg-transparent border-0 cursor-pointer"
        ),
        children: expanded ? lessLabel : moreLabel
      }
    )
  ] });
};

// src/forms/YearMonthsSelector.tsx
var React35 = __toESM(require("react"));
var import_fa2 = require("react-icons/fa");
var import_jsx_runtime42 = require("react/jsx-runtime");
var MESES = [
  "Janeiro",
  "Fevereiro",
  "Mar\xE7o",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
var pad2 = (n) => String(n).padStart(2, "0");
var startOfMonthISO = (year, monthIdx) => `${year}-${pad2(monthIdx + 1)}-01T00:00:00`;
var endOfMonthISO = (year, monthIdx) => {
  const lastDay = new Date(year, monthIdx + 1, 0).getDate();
  return `${year}-${pad2(monthIdx + 1)}-${pad2(lastDay)}T23:59:59`;
};
var parseDate = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};
var YearMonthsSelector = ({
  dataInicio,
  dataFim,
  onSelect,
  className
}) => {
  const [isExpanded, setIsExpanded] = React35.useState(false);
  const [lastClickedIndex, setLastClickedIndex] = React35.useState(null);
  const [selectedMonths, setSelectedMonths] = React35.useState(/* @__PURE__ */ new Set());
  const [selectedYear, setSelectedYear] = React35.useState(() => {
    const d = parseDate(dataInicio);
    return d ? d.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
  });
  React35.useEffect(() => {
    const d = parseDate(dataInicio);
    if (d && d.getFullYear() !== selectedYear) {
      setSelectedYear(d.getFullYear());
    }
  }, [dataInicio]);
  const anoRef = selectedYear;
  React35.useEffect(() => {
    const next = /* @__PURE__ */ new Set();
    const i = parseDate(dataInicio);
    const f = parseDate(dataFim);
    if (i && f) {
      if (i.getFullYear() === anoRef || f.getFullYear() === anoRef) {
        if (i.getFullYear() === f.getFullYear()) {
          const start = i.getMonth();
          const end = f.getMonth();
          for (let m = start; m <= end; m++) next.add(m);
        } else {
          const start = i.getFullYear() === anoRef ? i.getMonth() : 0;
          const end = f.getFullYear() === anoRef ? f.getMonth() : 11;
          for (let m = start; m <= end; m++) next.add(m);
        }
        setSelectedMonths(next);
      }
    } else {
      setSelectedMonths(next);
    }
  }, [dataInicio, dataFim, anoRef]);
  const isMonthSelected = (index) => selectedMonths.has(index);
  const buildRanges = (monthsSet, yearToUse = anoRef) => {
    const arr = Array.from(monthsSet).sort((a, b) => a - b);
    const ranges = [];
    let start = null;
    let prev = null;
    for (const m of arr) {
      if (start === null) {
        start = m;
        prev = m;
        continue;
      }
      if (m === prev + 1) {
        prev = m;
        continue;
      }
      ranges.push({
        dataInicio: startOfMonthISO(yearToUse, start),
        dataFim: endOfMonthISO(yearToUse, prev),
        startIdx: start,
        endIdx: prev
      });
      start = m;
      prev = m;
    }
    if (start !== null) {
      ranges.push({
        dataInicio: startOfMonthISO(yearToUse, start),
        dataFim: endOfMonthISO(yearToUse, prev),
        startIdx: start,
        endIdx: prev
      });
    }
    return ranges;
  };
  const emitSelection = (monthsSet, yearToUse = anoRef) => {
    const ranges = buildRanges(monthsSet, yearToUse);
    if (ranges.length === 0) {
      onSelect({ dataInicio: null, dataFim: null, ranges: [] });
      return;
    }
    const first = ranges[0];
    const last = ranges[ranges.length - 1];
    onSelect({
      dataInicio: first.dataInicio,
      dataFim: last.dataFim,
      ranges: ranges.map((r) => ({ dataInicio: r.dataInicio, dataFim: r.dataFim }))
    });
  };
  const handleClick = (index, event) => {
    const ctrl = event.ctrlKey || event.metaKey;
    const shift = event.shiftKey;
    setSelectedMonths((prev) => {
      let next = new Set(prev);
      if (shift && lastClickedIndex !== null) {
        next = /* @__PURE__ */ new Set();
        const start = Math.min(index, lastClickedIndex);
        const end = Math.max(index, lastClickedIndex);
        for (let m = start; m <= end; m++) next.add(m);
      } else if (ctrl) {
        if (next.has(index)) next.delete(index);
        else next.add(index);
      } else {
        next = /* @__PURE__ */ new Set([index]);
      }
      emitSelection(next);
      return next;
    });
    setLastClickedIndex(index);
  };
  const handleClearAll = () => {
    setSelectedMonths(/* @__PURE__ */ new Set());
    onSelect({ dataInicio: null, dataFim: null, ranges: [] });
    setLastClickedIndex(null);
  };
  const handleYearChange = (increment) => {
    const newYear = selectedYear + increment;
    setSelectedYear(newYear);
    if (selectedMonths.size > 0) emitSelection(selectedMonths, newYear);
  };
  const selectedLabel = React35.useMemo(() => {
    if (selectedMonths.size === 0) return "-";
    const ranges = buildRanges(selectedMonths);
    if (ranges.length === 1) {
      const r = ranges[0];
      const nomeInicio = MESES[r.startIdx];
      const nomeFim = MESES[r.endIdx];
      return r.startIdx === r.endIdx ? `${nomeInicio} ${anoRef}` : `${nomeInicio} a ${nomeFim} ${anoRef}`;
    }
    const nomes = Array.from(selectedMonths).sort((a, b) => a - b).map((i) => MESES[i]);
    const head = nomes.slice(0, 4).join(", ");
    const rest = nomes.length - 4;
    return rest > 0 ? `${head} +${rest}` : head;
  }, [selectedMonths, anoRef]);
  const btnBase = "inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500";
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
    "div",
    {
      className: cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm",
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: "flex-1 min-w-[180px] text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("strong", { className: "text-gray-700", children: "Meses selecionados:" }),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { className: "text-gray-600", children: selectedLabel })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
              "button",
              {
                type: "button",
                className: btnBase,
                onClick: () => handleYearChange(-1),
                title: "Ano anterior",
                children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_fa2.FaChevronLeft, {})
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { className: "text-lg font-bold tabular-nums", children: anoRef }),
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
              "button",
              {
                type: "button",
                className: btnBase,
                onClick: () => handleYearChange(1),
                title: "Pr\xF3ximo ano",
                children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_fa2.FaChevronRight, {})
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
            "button",
            {
              type: "button",
              className: btnBase,
              onClick: () => setIsExpanded((prev) => !prev),
              children: isExpanded ? "Fechar" : "Selecionar meses"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
            "button",
            {
              type: "button",
              className: cn(
                btnBase,
                "border-red-300 text-red-700 hover:bg-red-50 focus-visible:ring-red-500"
              ),
              onClick: handleClearAll,
              children: "Limpar"
            }
          )
        ] }),
        isExpanded && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", { className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4", children: MESES.map((mes, index) => {
          const selected = isMonthSelected(index);
          return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
            "button",
            {
              type: "button",
              onClick: (e) => handleClick(index, e),
              title: "Clique: selecionar \xFAnico | Shift+clique: range | Ctrl/Cmd+clique: (des)selecionar m\xEAs",
              className: cn(
                "w-full rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                selected ? "border-primary-600 bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500" : "border-primary-300 bg-white text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500"
              ),
              children: mes
            },
            mes
          );
        }) })
      ] })
    }
  );
};

// src/qr/QrCodeGeneratorButton.tsx
var import_fa3 = require("react-icons/fa");
var import_jsx_runtime43 = require("react/jsx-runtime");
var QrCodeGeneratorButton = ({
  value,
  label = "QR Code",
  disabled = false,
  variant = "outline-secondary",
  size = "sm",
  onClick,
  className
}) => {
  const handleClick = () => {
    if (!value) return;
    if (onClick) onClick(value);
    else if (typeof window !== "undefined") window.alert(`QR Code: ${value}`);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
    Button,
    {
      variant,
      size,
      disabled: disabled || !value,
      onClick: handleClick,
      className,
      leftIcon: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fa3.FaQrcode, {}),
      children: label
    }
  );
};

// src/primitives/ImageAttachment/ImageAttachment.tsx
var React36 = __toESM(require("react"));
var import_class_variance_authority25 = require("class-variance-authority");
var import_jsx_runtime44 = require("react/jsx-runtime");
var dropzoneVariants = (0, import_class_variance_authority25.cva)(
  [
    "relative flex flex-col items-center justify-center",
    "rounded-md border-2 border-dashed",
    "transition-colors duration-150",
    "cursor-pointer select-none",
    "text-center"
  ],
  {
    variants: {
      state: {
        idle: "border-neutral-300 bg-surface-background hover:bg-neutral-50 text-neutral-600",
        active: "border-brand-primary bg-brand-primary-muted text-brand-primary",
        disabled: "border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed"
      },
      size: {
        sm: "p-3 text-xs gap-1",
        md: "p-6 text-sm gap-2",
        lg: "p-8 text-base gap-3"
      }
    },
    defaultVariants: {
      state: "idle",
      size: "md"
    }
  }
);
var UploadIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
  "svg",
  {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("polyline", { points: "17 8 12 3 7 8" }),
      /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
    ]
  }
);
function matchesAccept(file, acceptedTypes) {
  if (!acceptedTypes || acceptedTypes.length === 0) return true;
  const fileType = file.type || "";
  const fileName = file.name.toLowerCase();
  return acceptedTypes.some((rule) => {
    const r = rule.trim().toLowerCase();
    if (!r) return false;
    if (r.startsWith(".")) return fileName.endsWith(r);
    if (r.endsWith("/*")) {
      const prefix = r.slice(0, -1);
      return fileType.toLowerCase().startsWith(prefix);
    }
    return fileType.toLowerCase() === r;
  });
}
var ImageAttachment = React36.forwardRef(
  ({
    onAttachments,
    maxSize,
    acceptedTypes,
    multiple = true,
    disabled = false,
    label,
    onReject,
    size = "md",
    className
  }, ref) => {
    const inputRef = React36.useRef(null);
    React36.useImperativeHandle(ref, () => inputRef.current);
    const [dragActive, setDragActive] = React36.useState(false);
    const acceptAttr = acceptedTypes == null ? void 0 : acceptedTypes.join(",");
    const validate = (files) => {
      const arr = Array.from(files);
      const accepted = [];
      const rejected = [];
      for (const f of arr) {
        const sizeOk = !maxSize || f.size <= maxSize;
        const typeOk = matchesAccept(f, acceptedTypes);
        if (sizeOk && typeOk) accepted.push(f);
        else rejected.push(f);
      }
      if (rejected.length && onReject) onReject(rejected);
      if (accepted.length) onAttachments(accepted);
    };
    const handleSelect = (e) => {
      if (disabled) return;
      const files = e.target.files;
      if (files && files.length) validate(files);
      e.target.value = "";
    };
    const handleDragOver = (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      if (!dragActive) setDragActive(true);
    };
    const handleDragLeave = (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    };
    const handleDrop = (e) => {
      var _a;
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const files = (_a = e.dataTransfer) == null ? void 0 : _a.files;
      if (files && files.length) validate(files);
    };
    const handleClick = () => {
      var _a;
      if (disabled) return;
      (_a = inputRef.current) == null ? void 0 : _a.click();
    };
    const handleKey = (e) => {
      var _a;
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (_a = inputRef.current) == null ? void 0 : _a.click();
      }
    };
    const state = disabled ? "disabled" : dragActive ? "active" : "idle";
    return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
      "div",
      {
        role: "button",
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled || void 0,
        onClick: handleClick,
        onKeyDown: handleKey,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        className: cn(dropzoneVariants({ state, size }), className),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(UploadIcon, { className: cn(size === "sm" ? "h-5 w-5" : size === "lg" ? "h-10 w-10" : "h-7 w-7") }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "font-medium", children: label != null ? label : "Arraste arquivos aqui ou clique para selecionar" }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
            "input",
            {
              ref: inputRef,
              type: "file",
              multiple,
              accept: acceptAttr,
              disabled,
              onChange: handleSelect,
              className: "hidden",
              "aria-hidden": "true",
              tabIndex: -1
            }
          )
        ]
      }
    );
  }
);
ImageAttachment.displayName = "ImageAttachment";

// src/primitives/DateRange/DateRange.tsx
var React37 = __toESM(require("react"));
var import_jsx_runtime45 = require("react/jsx-runtime");
var DateRange = React37.forwardRef(
  ({
    startDate,
    endDate,
    onStartChange,
    onEndChange,
    startLabel,
    endLabel,
    size = "sm",
    className,
    disabled,
    ...props
  }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { ref, className: cn("flex gap-2 items-end", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
      TextField,
      {
        type: "date",
        size,
        value: startDate || "",
        onChange: (e) => onStartChange == null ? void 0 : onStartChange(e.target.value),
        "aria-label": startLabel || "Data inicial",
        disabled
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
      TextField,
      {
        type: "date",
        size,
        value: endDate || "",
        onChange: (e) => onEndChange == null ? void 0 : onEndChange(e.target.value),
        "aria-label": endLabel || "Data final",
        disabled
      }
    )
  ] })
);
DateRange.displayName = "DateRange";
var DateRangeField = DateRange;

// src/buttons/CountdownButton.tsx
var React38 = __toESM(require("react"));
var import_jsx_runtime46 = require("react/jsx-runtime");
var CountdownButton = ({
  callback,
  countdownTime,
  callback2,
  label = "Confirmar",
  cancelLabel = "Cancelar"
}) => {
  const [countdown, setCountdown] = React38.useState(countdownTime);
  const [active, setActive] = React38.useState(false);
  React38.useEffect(() => {
    if (!active) return;
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1e3);
    return () => clearTimeout(timer);
  }, [active, countdown]);
  const handleClick = React38.useCallback(() => {
    if (!active) {
      setActive(true);
      return;
    }
    if (countdown <= 0) callback();
  }, [active, countdown, callback]);
  const handleCancel = React38.useCallback(() => {
    if (callback2) callback2();
    setActive(false);
    setCountdown(countdownTime);
  }, [callback2, countdownTime]);
  if (!active) {
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Button, { variant: "danger", onClick: handleClick, children: label }),
      callback2 && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Button, { variant: "secondary", onClick: handleCancel, children: cancelLabel })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Button, { variant: "danger", disabled: countdown > 0, onClick: handleClick, children: countdown > 0 ? `Aguarde (${countdown}s)` : label }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Button, { variant: "secondary", onClick: handleCancel, children: cancelLabel })
  ] });
};

// src/buttons/UtilButtons.tsx
var React39 = __toESM(require("react"));
var import_jsx_runtime47 = require("react/jsx-runtime");
var SaveButton = ({
  label = "Salvar",
  loading,
  disabled,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Button, { variant: "primary", size: "sm", disabled: disabled || loading, ...props, children: label });
var CancelEditButton = ({
  label = "Limpar",
  loading,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Button, { variant: "outline-secondary", size: "sm", disabled: loading, ...props, children: label });
var DeleteButton = ({
  label = "Excluir",
  isVisible = true,
  needExclusionDetails = false,
  confirmMessage,
  onConfirm,
  loading,
  ...props
}) => {
  const [show, setShow] = React39.useState(false);
  const [details, setDetails] = React39.useState("");
  if (!isVisible) return null;
  const handleConfirm = () => {
    setShow(false);
    onConfirm == null ? void 0 : onConfirm(details);
    setDetails("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_jsx_runtime47.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
      Button,
      {
        variant: "outline-danger",
        size: "sm",
        disabled: loading,
        onClick: () => setShow(true),
        ...props,
        children: label
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(Modal, { open: show, onOpenChange: setShow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(ModalHeader, { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(ModalBody, { children: [
        confirmMessage || /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("p", { className: "m-0", children: "Confirma a opera\xE7\xE3o?" }),
        needExclusionDetails && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          "textarea",
          {
            className: "mt-2 w-full rounded border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent",
            rows: 3,
            placeholder: "Motivo / Relat\xF3rio T\xE9cnico",
            value: details,
            onChange: (e) => setDetails(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(ModalFooter, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Button, { variant: "secondary", onClick: () => setShow(false), children: "Cancelar" }),
        /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Button, { variant: "danger", onClick: handleConfirm, children: "Confirmar" })
      ] })
    ] })
  ] });
};

// src/layout/GridContainer.tsx
var React40 = __toESM(require("react"));
var import_jsx_runtime48 = require("react/jsx-runtime");
var GridContainer = React40.forwardRef(
  ({ items, children, containerStyle, className, style, ...props }, ref) => {
    const baseClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3";
    const merged = cn(baseClass, className);
    const mergedStyle = { ...containerStyle, ...style };
    if (items == null ? void 0 : items.length) {
      return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { ref, className: merged, style: mergedStyle, ...props, children: items.map((item, i) => {
        var _a;
        return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { children: item.component }, (_a = item.key) != null ? _a : i);
      }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { ref, className: merged, style: mergedStyle, ...props, children });
  }
);
GridContainer.displayName = "GridContainer";

// src/states/LoadingBlock.tsx
var React41 = __toESM(require("react"));
var import_jsx_runtime49 = require("react/jsx-runtime");
var LoadingBlock = React41.forwardRef(
  ({ lines = 3, className, ...props }, ref) => {
    const sizes = ["w-3/4", "w-full", "w-5/6", "w-2/3", "w-11/12"];
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
      "div",
      {
        ref,
        "aria-busy": "true",
        "aria-live": "polite",
        className: cn("flex flex-col gap-2 w-full", className),
        ...props,
        children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
          "div",
          {
            className: cn(
              "h-3 rounded bg-neutral-200 animate-pulse",
              sizes[i % sizes.length]
            )
          },
          i
        ))
      }
    );
  }
);
LoadingBlock.displayName = "LoadingBlock";

// src/overlays/InformativeOverlay.tsx
var import_jsx_runtime50 = require("react/jsx-runtime");
var InformativeOverlay = ({
  contentItems = [],
  placement = "top",
  children,
  className
}) => {
  if (!contentItems || contentItems.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_jsx_runtime50.Fragment, { children: children != null ? children : null });
  }
  const trigger = children ? /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: cn("inline-flex items-center cursor-pointer", className), children }) : /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
    "span",
    {
      className: cn("inline-flex items-center cursor-pointer text-info", className),
      "aria-label": "Mais informa\xE7\xF5es",
      children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 16 16",
          fill: "currentColor",
          width: "16",
          height: "16",
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("path", { d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" })
        }
      )
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(TooltipProvider, { delayDuration: 150, children: /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(TooltipRoot, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(TooltipTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(TooltipContent, { side: placement, className: "max-w-xs", children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "flex flex-col gap-1 text-left", children: contentItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "flex items-center gap-1.5", children: [
      item.icon && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "shrink-0", children: item.icon }),
      /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { children: item.label })
    ] }, idx)) }) })
  ] }) });
};

// src/picker/GenericPickerHost.tsx
var import_react6 = require("react");
var import_jsx_runtime51 = require("react/jsx-runtime");
var defaultFormatItem = (item, index, key) => {
  if (key && item[key] != null) return String(item[key]);
  if (item.id != null) return String(item.id);
  return String(index);
};
function GenericPickerHost(props) {
  const {
    viewModel,
    renderForm,
    renderItem,
    displayButtonName = "Adicionar",
    optionDisplayName,
    displayName,
    optionDisplayKey,
    formatItem,
    deleteDialogText,
    deleteTitle = "Confirma\xE7\xE3o de remo\xE7\xE3o",
    hideOptions = false,
    readOnlyMode = false,
    showOptionsWhenEdit = true,
    containerClassName,
    parentColor,
    onPickerOpen,
    onPickerClose,
    onSelectedOption
  } = props;
  const { picked, isOpen, editingItem, editingIndex } = viewModel;
  const [pendingDelete, setPendingDelete] = (0, import_react6.useState)(null);
  const open = () => {
    onPickerOpen == null ? void 0 : onPickerOpen();
    viewModel.open();
  };
  const close = () => {
    onPickerClose == null ? void 0 : onPickerClose();
    viewModel.close();
  };
  const handlePick = (raw) => {
    const transformed = onSelectedOption ? onSelectedOption(raw) : raw;
    if (editingIndex != null) {
      viewModel.update(transformed);
    } else {
      viewModel.add(transformed);
    }
    viewModel.commit();
  };
  const handleEditClick = (item, index) => {
    if (readOnlyMode) return;
    viewModel.edit(item, index);
  };
  const handleDeleteRequest = (item, index) => {
    setPendingDelete({ item, index });
  };
  const handleDeleteConfirm = () => {
    if (!pendingDelete) return;
    viewModel.remove(pendingDelete.index);
    setPendingDelete(null);
  };
  const renderList = () => /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { children: [
    optionDisplayName && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("h4", { className: "text-base font-semibold mb-2", children: optionDisplayName }),
    /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(List, { variant: "bordered", children: picked.map((pi, index) => {
      var _a, _b;
      const isRemoved = !!pi.removed;
      if (renderItem) {
        return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
          "div",
          {
            "aria-disabled": isRemoved,
            className: cn(
              "flex items-center",
              isRemoved && "opacity-30 line-through"
            ),
            children: renderItem({
              item: pi,
              index,
              onEdit: () => handleEditClick(pi, index),
              onDelete: () => handleDeleteRequest(pi, index),
              readOnly: readOnlyMode
            })
          },
          (_a = pi.id) != null ? _a : index
        );
      }
      return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(
        ListItem,
        {
          className: cn(isRemoved && "opacity-50 line-through"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
              ListItemContent,
              {
                onClick: () => handleEditClick(pi, index),
                className: "cursor-pointer",
                children: formatItem ? formatItem(pi, index) : defaultFormatItem(pi, index, optionDisplayKey)
              }
            ),
            !readOnlyMode && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(ListItemAction, { children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
              "button",
              {
                type: "button",
                "aria-label": "Remover",
                onClick: () => handleDeleteRequest(pi, index),
                className: "text-red-500 hover:text-red-700 px-2",
                children: "\xD7"
              }
            ) })
          ]
        },
        (_b = pi.id) != null ? _b : index
      );
    }) }),
    !readOnlyMode && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DividerWithButton, { onClick: open })
  ] });
  const renderClosedDisplay = () => {
    if (hideOptions || picked.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
        Button,
        {
          disabled: readOnlyMode,
          variant: "primary",
          onClick: open,
          className: "w-full",
          children: displayButtonName
        }
      );
    }
    return renderList();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(import_jsx_runtime51.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
      DeleteConfirm,
      {
        show: pendingDelete != null,
        onHide: () => setPendingDelete(null),
        onConfirm: handleDeleteConfirm,
        title: deleteTitle,
        dialogText: typeof deleteDialogText === "function" && pendingDelete ? () => deleteDialogText(pendingDelete) : deleteDialogText,
        payload: pendingDelete != null ? pendingDelete : void 0
      }
    ),
    !isOpen ? renderClosedDisplay() : /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(
      "div",
      {
        className: cn(
          "border border-gray-300 rounded-md mt-2 mb-2 p-3",
          containerClassName
        ),
        style: parentColor ? { backgroundColor: parentColor } : void 0,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [
            displayName && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("h3", { className: "text-lg font-semibold", children: displayName }),
            /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
              "button",
              {
                type: "button",
                "aria-label": "Fechar",
                onClick: close,
                className: "ml-auto text-gray-500 hover:text-gray-800 px-2",
                children: "\xD7"
              }
            )
          ] }),
          renderForm({
            onPick: handlePick,
            editingItem,
            editingIndex,
            onCancel: close
          }),
          editingIndex == null && showOptionsWhenEdit && !hideOptions && picked.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "mt-3", children: renderList() }),
          editingIndex != null && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "text-center mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
            Button,
            {
              variant: "warning",
              disabled: readOnlyMode,
              onClick: () => viewModel.commit(),
              children: "Salvar Edi\xE7\xE3o"
            }
          ) })
        ]
      }
    )
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AnexoManager,
  Badge,
  Button,
  CancelEditButton,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  ClickToWriteField,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ColorPicker,
  CombineModeToggle,
  ContadorPicker,
  CountdownButton,
  DataTable,
  DataTablePagination,
  DataTableRow,
  DataTableToolbar,
  DateRange,
  DateRangeField,
  DeleteButton,
  DeleteConfirm,
  DividerWithButton,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  EmptyState,
  FieldError,
  FieldHint,
  FieldLabel,
  FormActionButtons,
  FormModal,
  FrequenciaFormV2,
  GenericPickerHost,
  GridContainer,
  IconWithBadge,
  ImageAttachment,
  InformativeOverlay,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  List,
  ListItem,
  ListItemAction,
  ListItemContent,
  LoadingBlock,
  Modal,
  ModalBody,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  Progress,
  QrCodeGeneratorButton,
  SaveButton,
  SearchBar,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetRoot,
  SheetTitle,
  SheetTrigger,
  Spinner,
  StatusLight,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextField,
  TextWithMore,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  YearMonthsSelector,
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionVariants,
  alertVariants,
  badgeVariants,
  buttonVariants,
  cardVariants,
  checkboxVariants,
  cn,
  contentVariants,
  dataTableVariants,
  dropdownMenuContentVariants,
  emptyStateVariants,
  inputGroupVariants,
  inputVariants,
  listVariants,
  popoverContentVariants,
  progressVariants,
  searchBarVariants,
  selectContentVariants,
  selectTriggerVariants,
  sheetContentVariants,
  spinnerVariants,
  statusLightVariants,
  switchVariants,
  tabsListVariants,
  tabsTriggerVariants,
  toastVariants,
  tooltipContentVariants,
  useInputGroupContext,
  useToast
});
