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
var index_exports = {};
__export(index_exports, {
  ActionButtons: () => ActionButtons,
  AddButton: () => AddButton_default,
  AdvancedFilterBar: () => AdvancedFilterBar,
  AnexoManager: () => import_ui_kit_core.AnexoManager,
  ApproveAndReproveButtons: () => ApproveAndReproveButtons,
  AsyncButton: () => AsyncButton,
  AutoComplete: () => AutoComplete,
  BonusButton: () => BonusButton,
  BranchDropDisplay: () => import_ui_kit_sgm.BranchDropDisplay,
  ButtonWithDropdown: () => ButtonWithDropdown,
  CalculadoraCorrecaoModal: () => import_ui_kit_sgp.CalculadoraCorrecaoModal,
  CalculoCorrecao: () => import_ui_kit_sgp.CalculoCorrecao,
  CampoDeVerificacaoV2: () => import_ui_kit_sgp.CampoDeVerificacaoV2,
  CheckBox: () => CheckBox,
  ClickToWriteField: () => ClickToWriteField,
  ColorPicker: () => ColorPicker,
  ConfigObject: () => ConfigObject,
  DeleteButton: () => DeleteButton_default,
  DeleteConfirm: () => DeleteConfirm,
  ExpandableCard: () => ExpandableCard,
  FindRecursoByTagField: () => import_ui_kit_sgm3.FindRecursoByTagField,
  FormField: () => FormField,
  FrequenciaFormV2: () => import_ui_kit_sgp.FrequenciaFormV2,
  Generic3DotMenu: () => Generic3DotMenu,
  GenericChart: () => GenericChart,
  GenericDisplay: () => GenericDisplay_default,
  GenericForm: () => GenericForm_default,
  GenericREchart: () => GenericREchart,
  GenericSelect: () => GenericSelect_default,
  GenericSelectOps: () => GenericSelectOps,
  IconLabelItem: () => IconLabelItem,
  IconLabelList: () => IconLabelList,
  ImageViewModal: () => ImageViewModal,
  JustificativaModal: () => JustificativaModal,
  LoadingButton: () => LoadingButton,
  LoadingProgress: () => LoadingProgress,
  MailSender: () => MailSender,
  MenuEvent: () => MenuEvent,
  ModalBasicTemplate: () => ModalBasicTemplate,
  NavigateButton: () => NavigateButton,
  NotificationBell: () => NotificationBell,
  NotificationItem: () => NotificationItem,
  PeriodSelector: () => PeriodSelector,
  QrCodeScanButton: () => QrCodeScanButton,
  QrReader: () => QrReader,
  RateLimitBar: () => RateLimitBar,
  RecursoDisplayer: () => import_ui_kit_sgm2.RecursoDisplayer,
  ResponsiveContainer: () => ResponsiveContainer_default,
  ReusableTableWithModal: () => ReusableTableWithModal,
  SectorSelector: () => SectorSelector,
  SelectDateModal: () => SelectDateModal,
  StatusBadge: () => StatusBadge,
  StatusIndicator: () => StatusIndicator,
  StatusLight: () => StatusLight,
  StatusPills: () => StatusPills,
  Switch: () => Switch,
  SwitchOnClick: () => SwitchOnClick,
  TarefaUnidadeForm: () => import_ui_kit_sgp.TarefaUnidadeForm,
  TextWithMore: () => TextWithMore,
  TimerDisplay: () => TimerDisplay,
  UnidadeMaterialCard: () => import_ui_kit_sgp.UnidadeMaterialCard,
  UnidadeMaterialForm: () => UnidadeMaterialForm,
  UnifiedPeriodSelector: () => UnifiedPeriodSelector,
  UploadArea: () => UploadArea,
  UuidPill: () => UuidPill_default,
  VerticalItemsDisplay: () => VerticalItemsDisplay
});
module.exports = __toCommonJS(index_exports);

// src/buttons/AddButton.tsx
var import_react_bootstrap = require("react-bootstrap");
var import_gr = require("react-icons/gr");
var import_jsx_runtime = require("react/jsx-runtime");
var AddButton = ({ callback, hiddenBool, size }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  import_react_bootstrap.Button,
  {
    hidden: hiddenBool || false,
    variant: "outline-primary",
    onClick: () => callback(),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gr.GrAdd, { size: size || 25 })
  }
);
var AddButton_default = AddButton;

// src/buttons/DeleteButton.tsx
var import_react_bootstrap2 = require("react-bootstrap");
var import_jsx_runtime2 = require("react/jsx-runtime");
var DeleteButton = ({ title, onDeleteClick }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_bootstrap2.Button, { variant: "danger", onClick: () => onDeleteClick(), children: title });
};
var DeleteButton_default = DeleteButton;

// src/buttons/ActionButtons.tsx
var import_react2 = require("react");
var import_react_bootstrap4 = require("react-bootstrap");
var import_fi = require("react-icons/fi");

// src/forms/DeleteConfirm.tsx
var import_react = require("react");
var import_react_bootstrap3 = require("react-bootstrap");
var import_jsx_runtime3 = require("react/jsx-runtime");
var DeleteConfirm = ({
  show,
  onHide,
  onConfirm,
  title = "Confirma\xE7\xE3o de Exclus\xE3o",
  dialogText,
  payload,
  needExclusionDetails = false
}) => {
  const [exclusionDetails, setExclusionDetails] = (0, import_react.useState)("");
  const getDialogContent = () => {
    if (typeof dialogText === "function" && payload) {
      return dialogText(payload);
    }
    return dialogText || "Voc\xEA tem certeza que deseja excluir este item?";
  };
  const isConfirmEnabled = () => {
    if (!needExclusionDetails) return true;
    return exclusionDetails.length >= 8;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_bootstrap3.Modal, { show, onHide: () => onHide(false), centered: true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Modal.Header, { closeButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Modal.Title, { children: title }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "d-flex flex-column gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: getDialogContent() }) }),
      needExclusionDetails && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_bootstrap3.Form.Group, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Form.Label, { children: "Motivo da Exclus\xE3o (m\xEDn. 8 caracteres)" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_bootstrap3.Form.Control,
          {
            as: "textarea",
            rows: 3,
            value: exclusionDetails,
            onChange: (e) => setExclusionDetails(e.target.value),
            placeholder: "Descreva o motivo...",
            autoFocus: true
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_bootstrap3.Modal.Footer, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Button, { variant: "secondary", onClick: () => onHide(false), children: "Cancelar" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_react_bootstrap3.Button,
        {
          variant: "danger",
          disabled: !isConfirmEnabled(),
          onClick: () => {
            onConfirm(exclusionDetails);
            onHide(false);
          },
          children: "Confirmar Exclus\xE3o"
        }
      )
    ] })
  ] });
};

// src/buttons/ActionButtons.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var ActionButtons = ({
  onSave,
  saveLabel = "Salvar",
  saveVariant = "primary",
  disabled = false,
  onDelete,
  deleteLabel = "Excluir",
  deleteConfirmMsg,
  needExclusionDetails = false,
  onBack,
  backLabel = "Voltar",
  onCancelEdit,
  cancelEditLabel = "Cancelar",
  onCopy,
  copyLabel = "Copiar Formul\xE1rio",
  isEditing = false,
  useDelayedDelete = false,
  delayedDeleteTimeout = 3e3,
  PermissionWrapper = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children })
}) => {
  const [showConfirm, setShowConfirm] = (0, import_react2.useState)(false);
  const [isHolding, setIsHolding] = (0, import_react2.useState)(false);
  const [progress, setProgress] = (0, import_react2.useState)(0);
  const timeoutRef = (0, import_react2.useRef)(null);
  const intervalRef = (0, import_react2.useRef)(null);
  const startHold = () => {
    if (disabled || !onDelete) return;
    setIsHolding(true);
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
  const stopHold = () => {
    setIsHolding(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
  };
  const renderDeleteButton = () => {
    if (!onDelete || !isEditing) return null;
    if (useDelayedDelete) {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { position: "relative", display: "inline-block", margin: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          import_react_bootstrap4.Button,
          {
            variant: "outline-danger",
            onMouseDown: startHold,
            onMouseUp: stopHold,
            onMouseLeave: stopHold,
            onTouchStart: startHold,
            onTouchEnd: stopHold,
            disabled,
            style: { minWidth: "120px" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiTrash2, { className: "me-2" }),
              isHolding ? "Segure..." : deleteLabel
            ]
          }
        ),
        isHolding && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_react_bootstrap4.ProgressBar,
          {
            now: progress,
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              borderRadius: "0 0 4px 4px"
            },
            variant: "danger"
          }
        )
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      import_react_bootstrap4.Button,
      {
        variant: "danger",
        onClick: () => setShowConfirm(true),
        disabled,
        style: { margin: 2 },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiTrash2, { className: "me-2" }),
          deleteLabel
        ]
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      DeleteConfirm,
      {
        show: showConfirm,
        onHide: setShowConfirm,
        onConfirm: (details) => onDelete && onDelete(details),
        dialogText: deleteConfirmMsg,
        needExclusionDetails
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_bootstrap4.Form.Group, { className: "d-flex flex-wrap align-items-center mt-3 gap-1", children: [
      onBack && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_bootstrap4.Button, { variant: "outline-secondary", onClick: onBack, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiChevronLeft, { className: "me-2" }),
        backLabel
      ] }),
      isEditing && onCancelEdit && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_bootstrap4.Button, { variant: "warning", onClick: onCancelEdit, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiRotateCcw, { className: "me-2" }),
        cancelEditLabel
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PermissionWrapper, { children: renderDeleteButton() }),
      onSave && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_bootstrap4.Button, { variant: saveVariant, onClick: onSave, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiSave, { className: "me-2" }),
        saveLabel
      ] }),
      isEditing && onCopy && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_bootstrap4.Button, { variant: "outline-primary", onClick: onCopy, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiCopy, { className: "me-2" }),
        copyLabel
      ] })
    ] })
  ] });
};

// src/buttons/ApproveAndReproveButtons.tsx
var import_react3 = require("react");
var import_react_bootstrap5 = require("react-bootstrap");
var import_gr2 = require("react-icons/gr");
var import_jsx_runtime5 = require("react/jsx-runtime");
var ApproveAndReproveButtons = ({
  buttonSize = 25,
  approveCallback,
  reproveCallback,
  cancelCallback,
  headerText = "Aprovar?",
  approveText,
  repproveText
}) => {
  (0, import_react3.useEffect)(() => {
    const keyboardHandler = (e) => {
      if (e.key === "Escape") {
        cancelCallback();
      }
    };
    window.document.addEventListener("keydown", keyboardHandler);
    return () => window.document.removeEventListener("keydown", keyboardHandler);
  }, [cancelCallback]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: headerText }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_bootstrap5.Button, { onClick: approveCallback, variant: "success", className: "me-1", children: approveText ? approveText : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_gr2.GrCheckmark, { size: buttonSize }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_bootstrap5.Button, { onClick: reproveCallback, variant: "danger", children: repproveText ? repproveText : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_gr2.GrClose, { size: buttonSize }) })
  ] });
};

// src/buttons/AsyncButton.tsx
var import_react4 = require("react");
var import_react_bootstrap7 = require("react-bootstrap");

// src/progress/LoadingProgress.tsx
var import_react_bootstrap6 = require("react-bootstrap");
var import_jsx_runtime6 = require("react/jsx-runtime");
var LoadingProgress = ({ hidden }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_bootstrap6.Spinner, { hidden, animation: "border", role: "status", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "visually-hidden", children: "Carregando..." }) });
};

// src/buttons/AsyncButton.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var useAsyncAction = () => {
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const isMounted = (0, import_react4.useRef)(true);
  const isProcessing = (0, import_react4.useRef)(false);
  const execute = async (action) => {
    if (typeof action !== "function") {
      throw new Error("A\xE7\xE3o inv\xE1lida: n\xE3o \xE9 uma fun\xE7\xE3o");
    }
    if (!action || isProcessing.current) return;
    isProcessing.current = true;
    setLoading(true);
    try {
      await action();
    } catch (error) {
      console.error("Async operation failed:", error);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        isProcessing.current = false;
      }
    }
  };
  return { loading, execute };
};
var AsyncButton = ({
  onClick,
  children,
  loadingComponent = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LoadingProgress, {}),
  buttonProps
}) => {
  const { loading, execute } = useAsyncAction();
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    import_react_bootstrap7.Button,
    {
      ...buttonProps,
      onClick: () => execute(onClick),
      disabled: loading || buttonProps && buttonProps.disabled,
      children: loading ? loadingComponent : children
    }
  );
};

// src/buttons/BonusButton.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var BonusButton = ({
  renderCondition = true,
  onClickCallback,
  label,
  className = "",
  ...props
}) => {
  if (!renderCondition) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "button",
    {
      className: `bonus-button ${className}`,
      onClick: onClickCallback,
      ...props,
      children: label
    }
  );
};

// src/buttons/ButtonWithDropdown.tsx
var import_react_bootstrap8 = require("react-bootstrap");
var import_jsx_runtime9 = require("react/jsx-runtime");
var ButtonWithDropdown = ({
  title,
  onClickButton,
  options,
  menuVariant = "light",
  variant = "primary",
  toggleVariant
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    import_react_bootstrap8.Dropdown,
    {
      as: import_react_bootstrap8.ButtonGroup,
      className: "d-flex w-100",
      style: { flex: 1, minWidth: 0 },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          import_react_bootstrap8.Button,
          {
            variant,
            onClick: onClickButton,
            className: "flex-grow-1 text-truncate",
            style: { minWidth: 0 },
            children: title
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          import_react_bootstrap8.Dropdown.Toggle,
          {
            split: true,
            variant: toggleVariant || variant,
            id: "dropdown-split-basic",
            style: {
              flex: "0 0 2.5rem",
              width: "2.5rem",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_bootstrap8.Dropdown.Menu, { variant: menuVariant, children: options.map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_bootstrap8.Dropdown.Item, { onClick: opt.callback, children: opt.label }, `${opt.label}-${idx}`)) })
      ]
    }
  );
};

// src/buttons/CheckBox.tsx
var import_react_bootstrap9 = require("react-bootstrap");
var import_ti = require("react-icons/ti");
var import_jsx_runtime10 = require("react/jsx-runtime");
var CheckBox = ({
  opcoes,
  isHover = false,
  isCreator = false,
  updateEvent,
  deleteEvent,
  enterEvent,
  disabled = false,
  className = ""
}) => {
  if (isHover) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className, children: opcoes.map((opcao, index) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react_bootstrap9.InputGroup, { style: { padding: 12, justifyItems: "center", opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_bootstrap9.InputGroup.Checkbox, {}),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_react_bootstrap9.Form.Control,
        {
          autoFocus: true,
          onKeyDown: (event) => enterEvent && enterEvent(event, index, opcao),
          style: { border: "none", borderBottom: "solid", borderRadius: 0, borderColor: "gray", borderWidth: "1px" },
          value: isCreator ? "Nova opcao" : String(opcao.valor),
          onChange: (event) => updateEvent && updateEvent(event, index)
        }
      ),
      deleteEvent && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: { cursor: "pointer" }, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ti.TiDelete, { size: "18", className: "delete text-danger", onClick: () => deleteEvent() }) })
    ] }, index)) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className, style: { textAlign: "start" }, children: opcoes.map((opcao, index) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    import_react_bootstrap9.Form.Check,
    {
      disabled,
      type: "checkbox",
      label: `${opcao.valor}`
    },
    index
  )) });
};

// src/buttons/Generic3DotMenu.tsx
var import_react5 = require("react");
var import_react_bootstrap10 = require("react-bootstrap");
var import_ci = require("react-icons/ci");
var import_jsx_runtime11 = require("react/jsx-runtime");
var MenuEvent = class {
  /**
   * @param label - O texto que aparecerá no botão.
   * @param callback - A função a ser chamada quando o botão for clicado.
   * @param variant - A variante do botão (padrão: 'primary').
   * @param renderCondition - Condição para renderizar o botão.
   * @param section - A seção para organizar os botões (padrão: 'default').
   */
  constructor(label, callback, variant = "primary", renderCondition = true, section = "default") {
    this.label = label;
    this.callback = callback;
    this.variant = variant;
    this.renderCondition = renderCondition;
    this.section = section;
  }
};
var Generic3DotMenu = ({
  events,
  tittle = "Op\xE7\xF5es de Controle"
}) => {
  const [show, setShow] = (0, import_react5.useState)(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const shouldRender = (event) => {
    return typeof event.renderCondition === "function" ? event.renderCondition() : event.renderCondition;
  };
  const groupedEvents = events.reduce((sections, event) => {
    const section = event.section || "default";
    if (!sections[section]) {
      sections[section] = [];
    }
    if (shouldRender(event)) {
      sections[section].push(event);
    }
    return sections;
  }, {});
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ci.CiMenuKebab, { onClick: handleShow, style: { cursor: "pointer" }, size: 25, title: tittle }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_react_bootstrap10.Modal, { show, onHide: handleClose, centered: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react_bootstrap10.Modal.Header, { closeButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react_bootstrap10.Modal.Title, { children: tittle }) }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_react_bootstrap10.Modal.Body, { children: [
        Object.keys(groupedEvents).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "text-center text-muted", children: "Nenhuma op\xE7\xE3o dispon\xEDvel." }),
        Object.keys(groupedEvents).map((section, sectionIndex) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h6", { className: "border-bottom pb-2 mb-3", children: section !== "default" ? section : "Op\xE7\xF5es Principais" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "d-grid gap-2", children: groupedEvents[section].map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            import_react_bootstrap10.Button,
            {
              variant: event.variant || "primary",
              onClick: () => {
                event.callback();
                handleClose();
              },
              children: event.label
            },
            index
          )) })
        ] }, sectionIndex))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react_bootstrap10.Modal.Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react_bootstrap10.Button, { variant: "secondary", onClick: handleClose, children: "Fechar" }) })
    ] })
  ] });
};

// src/buttons/LoadingButton.tsx
var import_react_bootstrap11 = require("react-bootstrap");
var import_jsx_runtime12 = require("react/jsx-runtime");
var LoadingButton = ({
  onClick,
  loading = false,
  label = "Enviar",
  variant = "primary",
  size,
  disabled = false,
  icon = null,
  className = "",
  loadingLabel = "Carregando...",
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_react_bootstrap11.Button,
    {
      variant,
      size,
      disabled: disabled || loading,
      onClick,
      className: `loading-button ${className}`,
      style: { cursor: loading ? "not-allowed" : "pointer" },
      ...props,
      children: loading ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "align-items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          import_react_bootstrap11.Spinner,
          {
            as: "span",
            animation: "border",
            size: "sm",
            role: "status",
            "aria-hidden": "true",
            className: "me-2"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: loadingLabel })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "align-items-center", children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "me-2 d-flex", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: label })
      ] })
    }
  );
};

// src/buttons/NavigateButton.tsx
var import_react_bootstrap12 = require("react-bootstrap");
var import_jsx_runtime13 = require("react/jsx-runtime");
var NavigateButton = ({
  displayName,
  path,
  config,
  pageName,
  navigator: navigator2,
  onBeforeNavigate,
  variant = "outline-primary",
  style,
  ...props
}) => {
  const handleClick = () => {
    if (onBeforeNavigate) {
      onBeforeNavigate();
    }
    navigator2(path, config, pageName);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_react_bootstrap12.Button,
    {
      style,
      variant,
      onClick: handleClick,
      ...props,
      children: displayName
    }
  );
};

// src/buttons/StatusBadge.tsx
var import_react_bootstrap13 = require("react-bootstrap");
var import_jsx_runtime14 = require("react/jsx-runtime");
var StatusBadge = ({
  status,
  showCheckbox = false,
  checked = false,
  onToggle = () => {
  },
  loading = false,
  customStatusClasses
}) => {
  const statusClasses = customStatusClasses || {
    PENDENTE: "bg-warning text-dark",
    EXECUTANDO: "bg-success text-white",
    CONCLUIDO: "bg-secondary text-white",
    CANCELED: "bg-danger text-white"
  };
  const badgeClass = statusClasses[status] || "bg-secondary text-white";
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "d-flex align-items-center gap-2", children: loading ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_bootstrap13.Spinner, { animation: "border", size: "sm" }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    showCheckbox && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      import_react_bootstrap13.Form.Check,
      {
        type: "checkbox",
        checked,
        onChange: onToggle,
        className: "me-1"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: `badge ${badgeClass}`, children: status })
  ] }) });
};

// src/buttons/SwitchOnClick.tsx
var import_react6 = require("react");
var import_fa = require("react-icons/fa");
var import_gr3 = require("react-icons/gr");
var import_jsx_runtime15 = require("react/jsx-runtime");
var SwitchOnClick = ({
  children,
  placeHolder = /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "div",
    {
      className: "text-center zoom-container",
      style: {
        fontSize: "1.2rem",
        color: "#666"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_gr3.GrAddCircle,
        {
          size: 25,
          className: "mb-2",
          style: { cursor: "pointer" }
        }
      )
    }
  ),
  onSwitchClick,
  onCancel,
  containerClassName = ""
}) => {
  const [clicked, setClicked] = (0, import_react6.useState)(false);
  const handleClick = () => {
    onSwitchClick && onSwitchClick();
    setClicked(!clicked);
  };
  const handleClose = () => {
    setClicked(false);
    onCancel && onCancel();
  };
  (0, import_react6.useEffect)(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);
  if (!clicked) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { onClick: handleClick, style: { cursor: "pointer" }, children: placeHolder });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: `switch-on-click-container ${containerClassName}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "close-icon", onClick: handleClose, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_fa.FaTimes, { title: "Fechar" }) }),
    children({ handleClose })
  ] });
};

// src/charts/GenericChart.tsx
var import_react_google_charts = require("react-google-charts");
var import_jsx_runtime16 = require("react/jsx-runtime");
var GenericChart = ({
  chartType,
  graphID,
  width = "100%",
  height = "400px",
  columns,
  rows,
  chartEvents,
  options,
  tooltipFormatter
}) => {
  let datachart = [columns, ...rows];
  if (tooltipFormatter) {
    datachart = datachart.map((row, index) => {
      if (index === 0) return row;
      const formattedTooltip = tooltipFormatter(row);
      return [...row, formattedTooltip];
    });
    datachart[0] = [...columns, { type: "string", role: "tooltip", p: { html: true } }];
  }
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_react_google_charts.Chart,
    {
      chartType,
      options: { ...options, tooltip: { isHtml: true } },
      data: datachart,
      graphID,
      width,
      height,
      chartEvents
    }
  );
};

// src/charts/GenericREchart.tsx
var import_recharts = require("recharts");
var import_dayjs = __toESM(require("dayjs"));
var import_jsx_runtime17 = require("react/jsx-runtime");
var GenericREchart = ({
  data = [],
  lines = [],
  xAxisKey = "data",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  width = "100%",
  height = 400,
  hideYAxis,
  unit,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  YAxisRange = [0, "auto"]
}) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a[xAxisKey]).getTime() - new Date(b[xAxisKey]).getTime()
  );
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { style: { width, height }, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_recharts.ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_recharts.LineChart, { data: sortedData, margin, children: [
    showGrid && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_recharts.CartesianGrid, { strokeDasharray: "3 3" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      import_recharts.XAxis,
      {
        dataKey: xAxisKey,
        reversed: false,
        tickFormatter: (tick) => (0, import_dayjs.default)(tick).format("DD/MM/YY HH:mm")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_recharts.YAxis, { domain: YAxisRange, unit, hide: hideYAxis, type: "number" }),
    showTooltip && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      import_recharts.Tooltip,
      {
        labelFormatter: (label) => (0, import_dayjs.default)(label).format("DD/MM/YY HH:mm")
      }
    ),
    showLegend && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_recharts.Legend, {}),
    lines.map((lineCfg, idx) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_recharts.Line, { ...lineCfg }, idx))
  ] }) }) });
};

// src/containers/ResponsiveContainer.tsx
var import_react_bootstrap14 = require("react-bootstrap");
var import_jsx_runtime18 = require("react/jsx-runtime");
var ResponsiveContainer2 = ({
  title,
  show,
  setShow,
  children,
  onClose,
  scrollable = false
}) => {
  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_react_bootstrap14.Modal, { size: "lg", show, onHide: handleClose, scrollable, children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_bootstrap14.Modal.Header, { closeButton: true, onClick: handleClose }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_bootstrap14.ModalBody, { children })
  ] });
};
var ResponsiveContainer_default = ResponsiveContainer2;

// src/containers/ExpandableCard.tsx
var import_react7 = require("react");
var import_react_bootstrap15 = require("react-bootstrap");
var import_fa2 = require("react-icons/fa");
var import_jsx_runtime19 = require("react/jsx-runtime");
var ExpandableCard = ({
  items = [],
  initialVisibleCount = 3,
  expandable = true,
  leftSideContent,
  rightSideContent,
  cardClassName = "",
  cardBodyClassName = "",
  cardBodyStyle,
  isMobile = false
}) => {
  const [expandedCard, setExpandedCard] = (0, import_react7.useState)(false);
  const handleToggleExpandCard = () => {
    setExpandedCard(!expandedCard);
  };
  const visibleItems = expandedCard ? items : items.slice(0, initialVisibleCount);
  const shouldShowExpandButton = expandable && items.length > initialVisibleCount;
  const renderContentWithToggle = (content) => {
    return content;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_bootstrap15.Card, { className: `expandable-card ${cardClassName}`, children: [
    leftSideContent && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "expandable-card-left-side", children: leftSideContent }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_bootstrap15.Card.Body, { className: `expandable-card-body ${cardBodyClassName}`, style: cardBodyStyle, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_bootstrap15.ListGroup, { variant: "flush", children: [
      visibleItems.map((item, index) => {
        const isObject = typeof item === "object" && item !== null && "content" in item;
        const itemObj = isObject ? item : { content: item };
        const clickableClass = itemObj.clickable ? "expandable-card-list-item-clickable" : "";
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          import_react_bootstrap15.ListGroup.Item,
          {
            className: `expandable-card-list-item ${clickableClass}`,
            children: isMobile ? /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "expandable-card-item", children: [
              itemObj.label && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "expandable-card-item-header", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("strong", { children: itemObj.label }) }),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "expandable-card-item-content", children: renderContentWithToggle(itemObj.content) })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "expandable-card-item-row", children: [
              itemObj.label && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("strong", { className: "expandable-card-item-label", children: [
                itemObj.label,
                ":"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "expandable-card-item-content", children: renderContentWithToggle(itemObj.content) })
            ] })
          },
          index
        );
      }),
      shouldShowExpandButton && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        import_react_bootstrap15.ListGroup.Item,
        {
          className: `expandable-card-toggle ${expandedCard ? "expanded" : ""}`,
          onClick: handleToggleExpandCard,
          children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_fa2.FaChevronDown, { className: "expandable-card-toggle-icon" })
        }
      )
    ] }) }),
    rightSideContent && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "expandable-card-right-side", children: rightSideContent })
  ] });
};

// src/displays/UuidPill.tsx
var import_react8 = require("react");
var import_react_bootstrap16 = require("react-bootstrap");
var import_jsx_runtime20 = require("react/jsx-runtime");
var UuidPill = ({ uuid, bg = "light", textColor = "dark", short = 8 }) => {
  const [copied, setCopied] = (0, import_react8.useState)(false);
  const ref = (0, import_react8.useRef)(null);
  const [showTooltip, setShowTooltip] = (0, import_react8.useState)(false);
  if (!uuid) return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "text-muted", children: "\u2014" });
  const shortId = String(uuid).substring(0, short);
  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(uuid);
    } catch (e2) {
      const ta = document.createElement("textarea");
      ta.value = uuid;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_jsx_runtime20.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
      import_react_bootstrap16.Badge,
      {
        ref,
        bg,
        text: textColor,
        pill: true,
        className: "border px-2 py-1",
        style: { cursor: "pointer", fontFamily: "monospace", fontSize: "0.8rem", userSelect: "none" },
        onClick: handleCopy,
        onMouseEnter: () => setShowTooltip(true),
        onMouseLeave: () => {
          setShowTooltip(false);
          setCopied(false);
        },
        children: [
          shortId,
          "\u2026"
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_bootstrap16.Overlay, { target: ref.current, show: showTooltip, placement: "top", children: (props) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_bootstrap16.Tooltip, { ...props, children: copied ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { style: { color: "#6f6" }, children: "Copiado!" }) : /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { style: { fontFamily: "monospace", fontSize: "0.75rem" }, children: [
      uuid,
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("small", { className: "text-muted", children: "Clique para copiar" })
    ] }) }) })
  ] });
};
var UuidPill_default = UuidPill;

// src/displays/GenericDisplay.tsx
var import_react9 = __toESM(require("react"));
var import_react_bootstrap17 = require("react-bootstrap");
var import_jsx_runtime21 = require("react/jsx-runtime");
var ConfigObject = class {
  constructor(dotNotation, style, onClick, onBlur, onHideClick, hidden, mapData, additionalComponents) {
    this.dotNotation = dotNotation;
    this.style = style;
    this.onClick = onClick;
    this.onBlur = onBlur;
    this.onHideClick = onHideClick;
    this.hidden = hidden;
    this.mapData = mapData;
    this.additionalComponents = additionalComponents || [];
  }
};
var getRightConfigObjects = (currentPropertieMap, configObjects) => {
  const curreDotNotation = currentPropertieMap.join(".");
  if (!configObjects) return [];
  return configObjects.filter((configObject) => configObject.dotNotation === curreDotNotation);
};
var getStyle = (configObjects) => {
  let styleObject = {};
  configObjects.forEach((configObject) => {
    styleObject = { ...styleObject, ...configObject.style };
  });
  return styleObject;
};
var getAdditionalComponentes = (configObjects) => {
  const components = [];
  configObjects.forEach((configObject) => {
    if (configObject.additionalComponents) {
      components.push(...configObject.additionalComponents);
    }
  });
  return components;
};
var getOnClick = (configObjects) => {
  return () => {
    configObjects.forEach((configObject) => {
      configObject.onClick && configObject.onClick();
    });
  };
};
var buildData = (obj, propertiesMap, configObjects, opn, innerArray, dispatch, isRoot, editButtonRenderer) => {
  const newPropertiesMap = [];
  if (opn) newPropertiesMap.push(...propertiesMap, opn);
  else newPropertiesMap.push(...propertiesMap);
  const innerConfigs = getRightConfigObjects(newPropertiesMap, configObjects);
  const styles = getStyle(innerConfigs);
  const onClick = getOnClick(innerConfigs);
  const extraComponents = getAdditionalComponentes(innerConfigs);
  if (Array.isArray(obj)) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_react_bootstrap17.Container, { onClick, style: { ...styles }, children: [
      opn && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("strong", { children: opn }) }),
      obj.map((o, index) => {
        const mapCopy = [...newPropertiesMap, `[${index}]`];
        return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_bootstrap17.Row, { style: { padding: 4, ...styles }, children: buildData(o, mapCopy, configObjects, null, true, null, false, editButtonRenderer) }, index);
      })
    ] });
  }
  if (typeof obj === "object" && obj != null) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
      import_react_bootstrap17.Container,
      {
        onClick,
        style: {
          border: innerArray ? "solid" : void 0,
          borderColor: "lightgray",
          borderRadius: innerArray ? 4 : 2,
          borderWidth: 1,
          padding: 4,
          ...styles
        },
        children: [
          opn && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("strong", { children: opn }),
          Object.entries(obj).map(
            ([key, value]) => buildData(value, newPropertiesMap, configObjects, key, false, null, false, editButtonRenderer)
          ),
          extraComponents.length > 0 ? extraComponents.map((comp, i) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react9.default.Fragment, { children: comp() }, i)) : isRoot && editButtonRenderer ? editButtonRenderer(obj, opn) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_react_bootstrap17.Col, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("strong", { children: [
      opn,
      ": "
    ] }),
    String(obj)
  ] });
};
var GenericDisplay = ({
  ops = [],
  loadFunc,
  configObjects,
  rootName,
  context,
  onRefresh,
  editButtonRenderer
}) => {
  const [innerOptions, setInnerOptions] = (0, import_react9.useState)();
  const refreshFunc = () => {
    if (loadFunc) {
      loadFunc().then((res) => {
        if (Array.isArray(res)) {
          setInnerOptions(res);
        } else {
          setInnerOptions([res]);
        }
      });
    } else {
      setInnerOptions(ops);
    }
  };
  (0, import_react9.useEffect)(() => {
    if (onRefresh) {
      onRefresh(refreshFunc);
    } else {
      refreshFunc();
    }
  }, [context]);
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_jsx_runtime21.Fragment, { children: innerOptions && innerOptions.map((cObj, index) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_bootstrap17.Container, { style: { padding: 4, border: "solid" }, children: buildData(cObj, [], configObjects, rootName || null, false, null, true, editButtonRenderer) }, index)) });
};
var GenericDisplay_default = GenericDisplay;

// src/displays/BranchDropDisplay.tsx
var import_ui_kit_sgm = require("@teraprox/ui-kit-sgm");

// src/displays/RateLimitBar.tsx
var import_react10 = require("react");
var import_jsx_runtime22 = require("react/jsx-runtime");
function formatResetIn(windowReset) {
  const resetAt = new Date(windowReset).getTime();
  const remaining = Math.max(0, Math.round((resetAt - Date.now()) / 1e3));
  if (remaining <= 0) return "agora";
  if (remaining < 60) return `${remaining}s`;
  return `${Math.round(remaining / 60)}min`;
}
var RateLimitBar = ({ entry, label, className }) => {
  const pct = (0, import_react10.useMemo)(() => {
    if (!entry || entry.limit <= 0) return 0;
    return Math.min(100, Math.round(entry.used / entry.limit * 100));
  }, [entry]);
  if (!entry) return null;
  const color = entry.exceeded || pct >= 90 ? "#dc3545" : pct >= 70 ? "#ffc107" : "#28a745";
  const containerStyle = {
    width: "100%",
    marginBottom: "4px"
  };
  const barTrackStyle = {
    height: "6px",
    width: "100%",
    backgroundColor: "#e9ecef",
    borderRadius: "3px",
    overflow: "hidden"
  };
  const barFillStyle = {
    height: "100%",
    width: `${pct}%`,
    backgroundColor: color,
    borderRadius: "3px",
    transition: "width 0.3s ease, background-color 0.3s ease"
  };
  const textStyle = {
    fontSize: "11px",
    color: "#6c757d",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2px"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { style: containerStyle, className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { style: textStyle, children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { children: [
        entry.used,
        "/",
        entry.limit,
        " req",
        entry.exceeded ? " \u2014 limite atingido" : ` (reset em ${formatResetIn(entry.windowReset)})`
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { style: barTrackStyle, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { style: barFillStyle }) })
  ] });
};

// src/displays/StatusIndicator.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var StatusIndicator = ({
  status,
  count,
  containerClassName = "",
  customLabels
}) => {
  const statusLabels = customLabels || {
    pendente: "PENDENTE",
    executando: "EXECUTANDO",
    concluido: "CONCLU\xCDDA",
    canceled: "CANCELADA",
    naoAtribuida: "N\xC3O ATRIBUIDA"
  };
  const label = statusLabels[status] || status.toUpperCase();
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: `status-flag ${status} ${containerClassName}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "status-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "status-count", children: count })
  ] });
};

// src/displays/VerticalItemsDisplay.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var VerticalItemsDisplay = ({
  item1 = "",
  item2 = "",
  item3 = "",
  className = "",
  style
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className, style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { children: item1 }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { children: item2 }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { children: item3 })
  ] });
};

// src/displays/StatusLight.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var StatusLight = ({
  active = false,
  activeLightColor = "green",
  inactiveLightColor = "gray",
  size = "20px",
  className = "",
  style
}) => {
  const color = active ? activeLightColor : inactiveLightColor;
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "div",
    {
      className,
      style: {
        backgroundColor: color,
        borderRadius: "50%",
        width: size,
        height: size,
        display: "inline-block",
        transition: "background-color 0.3s ease",
        ...style
      }
    }
  );
};

// src/displays/TimerDisplay.tsx
var import_dayjs2 = __toESM(require("dayjs"));
var import_duration = __toESM(require("dayjs/plugin/duration"));
var import_bi = require("react-icons/bi");
var import_bs = require("react-icons/bs");
var import_jsx_runtime26 = require("react/jsx-runtime");
import_dayjs2.default.extend(import_duration.default);
var TimerDisplay = ({
  id,
  tempo = 0,
  isStopped = false,
  pausable = false,
  playable = false,
  enableView = true,
  onPause,
  onPlay,
  emptyMessage = "Timer ainda n\xE3o iniciado."
}) => {
  const handlePause = (e) => {
    e.stopPropagation();
    if (id && onPause) onPause(id);
  };
  const handlePlay = (e) => {
    e.stopPropagation();
    if (id && onPlay) onPlay(id);
  };
  const formatDuration = (seconds) => {
    if (!enableView) return "- : - : -";
    const time = import_dayjs2.default.duration(seconds, "seconds");
    const days = Math.floor(time.asDays());
    const hours = time.hours().toString().padStart(2, "0");
    const minutes = time.minutes().toString().padStart(2, "0");
    const secondsRemaining = time.seconds().toString().padStart(2, "0");
    return days > 0 ? `${days}d ${hours}:${minutes}:${secondsRemaining}` : `${hours}:${minutes}:${secondsRemaining}`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "timer-display-container", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "timer-display-content", children: id ? /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_jsx_runtime26.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      import_bi.BiTimer,
      {
        size: 24,
        className: "timer-icon",
        title: "Timer"
      }
    ),
    pausable && !isStopped && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      import_bs.BsPause,
      {
        size: 20,
        className: "timer-icon-action",
        onClick: handlePause,
        title: "Pausar"
      }
    ),
    playable && !isStopped && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      import_bs.BsPlay,
      {
        size: 20,
        className: "timer-icon-action",
        onClick: handlePlay,
        title: "Iniciar"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "timer-display-time", children: formatDuration(tempo) })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "timer-display-message", children: emptyMessage }) }) });
};

// src/displays/RecursoDisplayer.tsx
var import_ui_kit_sgm2 = require("@teraprox/ui-kit-sgm");

// src/filters/StatusPills.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var StatusPills = ({
  statuses,
  activeKeys,
  onSelectionChange,
  multiSelect = true,
  className = ""
}) => {
  const toggleKey = (key) => {
    const isActive = activeKeys.includes(key);
    if (multiSelect) {
      if (isActive) {
        onSelectionChange(activeKeys.filter((k) => k !== key));
      } else {
        onSelectionChange([...activeKeys, key]);
      }
    } else {
      onSelectionChange(isActive ? [] : [key]);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: `status-pills-container ${className}`, children: Object.entries(statuses).map(([key, meta]) => {
    const isActive = activeKeys.includes(key);
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
      "button",
      {
        type: "button",
        className: `status-pill ${isActive ? "active" : ""}`,
        style: { "--status-color": meta.color },
        onClick: () => toggleKey(key),
        "aria-pressed": isActive,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "status-pill__swatch" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "status-pill__label", children: meta.label }),
          meta.count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "status-pill__count", children: meta.count })
        ]
      },
      key
    );
  }) });
};

// src/filters/PeriodSelector.tsx
var import_react11 = require("react");
var import_react_bootstrap18 = require("react-bootstrap");
var import_fa3 = require("react-icons/fa");
var import_dayjs3 = __toESM(require("dayjs"));
var import_jsx_runtime28 = require("react/jsx-runtime");
var PeriodSelector = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onPresetSelect,
  label = "Per\xEDodo",
  allowFuture = false,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = (0, import_react11.useState)(false);
  const formatDisplayRange = (start, end) => {
    const s = (0, import_dayjs3.default)(start).format("DD/MM/YY HH:mm");
    const e = (0, import_dayjs3.default)(end).format("DD/MM/YY HH:mm");
    return `${s} at\xE9 ${e}`;
  };
  const maxDate = allowFuture ? void 0 : (0, import_dayjs3.default)().format("YYYY-MM-DDTHH:mm");
  const presets = [
    { key: "today", label: "Hoje" },
    { key: "week", label: "\xDAltima Semana" },
    { key: "fortnight", label: "Quinzena" },
    { key: "month", label: "\xDAltimo M\xEAs" },
    { key: "year", label: "\xDAltimo Ano" }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_bootstrap18.Card, { className: `period-selector-card ${isExpanded ? "expanded" : ""} ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "compact-row", onClick: () => setIsExpanded(!isExpanded), children: [
      /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "d-flex align-items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa3.FaCalendarAlt, { className: "me-2 text-primary" }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "date-range-text", children: isExpanded ? label : formatDisplayRange(startDate, endDate) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "period-icon-btn", children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa3.FaChevronUp, {}) : /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "small text-muted", children: "Editar" }) })
    ] }),
    isExpanded && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "expanded-content", children: [
      onPresetSelect && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "presets-container", children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "d-flex align-items-center mb-1 w-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa3.FaHistory, { size: 12, className: "me-1 text-muted" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("small", { className: "text-muted fw-bold text-uppercase", style: { fontSize: "0.65rem" }, children: "Atalhos" })
        ] }),
        presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          import_react_bootstrap18.Button,
          {
            variant: "outline-primary",
            className: "preset-btn",
            onClick: (e) => {
              e.stopPropagation();
              onPresetSelect(p.key);
            },
            children: p.label
          },
          p.key
        ))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "date-inputs-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_bootstrap18.Form.Group, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_bootstrap18.Form.Label, { className: "small text-muted", children: "In\xEDcio" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            import_react_bootstrap18.Form.Control,
            {
              type: "datetime-local",
              size: "sm",
              value: startDate,
              max: maxDate,
              onChange: (e) => onStartDateChange(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_bootstrap18.Form.Group, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_bootstrap18.Form.Label, { className: "small text-muted", children: "Fim" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            import_react_bootstrap18.Form.Control,
            {
              type: "datetime-local",
              size: "sm",
              value: endDate,
              min: startDate,
              max: maxDate,
              onChange: (e) => onEndDateChange(e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "mt-3 d-flex justify-content-end", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
        import_react_bootstrap18.Button,
        {
          variant: "primary",
          size: "sm",
          onClick: () => setIsExpanded(false),
          children: "Aplicar"
        }
      ) })
    ] })
  ] });
};

// src/filters/AdvancedFilterBar.tsx
var import_react12 = require("react");
var import_react_bootstrap19 = require("react-bootstrap");
var import_fi2 = require("react-icons/fi");
var import_jsx_runtime29 = require("react/jsx-runtime");
var AdvancedFilterBar = ({
  children,
  title = "Filtros e Busca",
  activeFiltersCount = 0,
  onClearAll,
  defaultExpanded = false,
  className = ""
}) => {
  const [expanded, setExpanded] = (0, import_react12.useState)(defaultExpanded);
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: `advanced-filter-bar ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
      "div",
      {
        className: "filter-bar-header",
        onClick: () => setExpanded(!expanded),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "filter-title-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fi2.FiFilter, { className: "text-primary" }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("h5", { className: "filter-title", children: title }),
            activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("span", { className: "filter-count-badge", children: [
              activeFiltersCount,
              " ativos"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "filter-chevron", children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fi2.FiChevronUp, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fi2.FiChevronDown, { size: 20 }) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_bootstrap19.Collapse, { in: expanded, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "filter-bar-content", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "filter-grid", children }),
      (onClearAll || activeFiltersCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "filter-actions", children: [
        onClearAll && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
          import_react_bootstrap19.Button,
          {
            variant: "link",
            className: "text-danger text-decoration-none btn-sm d-flex align-items-center",
            onClick: (e) => {
              e.stopPropagation();
              onClearAll();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fi2.FiTrash2, { className: "me-1" }),
              "Limpar Filtros"
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          import_react_bootstrap19.Button,
          {
            variant: "primary",
            size: "sm",
            onClick: () => setExpanded(false),
            children: "Aplicar Filtros"
          }
        )
      ] })
    ] }) }) })
  ] });
};

// src/filters/UnifiedPeriodSelector.tsx
var import_react13 = require("react");
var import_react_bootstrap20 = require("react-bootstrap");
var import_fa4 = require("react-icons/fa");
var import_dayjs4 = __toESM(require("dayjs"));
var import_isoWeek = __toESM(require("dayjs/plugin/isoWeek"));
var import_jsx_runtime30 = require("react/jsx-runtime");
import_dayjs4.default.extend(import_isoWeek.default);
var MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez"
];
var MONTHS_FULL = [
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
var startOfMonthISO = (year, m) => `${year}-${pad2(m + 1)}-01T00:00:00`;
var endOfMonthISO = (year, m) => {
  const lastDay = new Date(year, m + 1, 0).getDate();
  return `${year}-${pad2(m + 1)}-${pad2(lastDay)}T23:59:59`;
};
var parseDate = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};
var DEFAULT_PRESETS = [
  {
    key: "today",
    label: "Hoje",
    start: () => (0, import_dayjs4.default)().startOf("day"),
    end: () => (0, import_dayjs4.default)().endOf("day")
  },
  {
    key: "week",
    label: "Esta semana",
    start: () => (0, import_dayjs4.default)().startOf("isoWeek"),
    end: () => (0, import_dayjs4.default)().endOf("isoWeek")
  },
  {
    key: "month",
    label: "Este m\xEAs",
    start: () => (0, import_dayjs4.default)().startOf("month"),
    end: () => (0, import_dayjs4.default)().endOf("month")
  },
  {
    key: "year",
    label: "Este ano",
    start: () => (0, import_dayjs4.default)().startOf("year"),
    end: () => (0, import_dayjs4.default)().endOf("year")
  }
];
var TABS = [
  { key: "quick", icon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaClock, { size: 12 }), label: "R\xE1pido" },
  { key: "month", icon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaCalendarAlt, { size: 12 }), label: "Meses" },
  { key: "custom", icon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaCalendarAlt, { size: 12 }), label: "Per\xEDodo" }
];
var UnifiedPeriodSelector = ({
  dataInicio,
  dataFim,
  onSelect,
  defaultTab = "quick",
  allowFuture = true,
  quickPresets,
  className = "",
  disabled = false,
  compact = false
}) => {
  const [activeTab, setActiveTab] = (0, import_react13.useState)(defaultTab);
  const [isExpanded, setIsExpanded] = (0, import_react13.useState)(!compact);
  const [activePresetKey, setActivePresetKey] = (0, import_react13.useState)(null);
  const [selectedYear, setSelectedYear] = (0, import_react13.useState)(() => {
    const d = parseDate(dataInicio);
    return d ? d.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
  });
  const [selectedMonths, setSelectedMonths] = (0, import_react13.useState)(/* @__PURE__ */ new Set());
  const [lastClickedMonth, setLastClickedMonth] = (0, import_react13.useState)(null);
  const [customStart, setCustomStart] = (0, import_react13.useState)("");
  const [customEnd, setCustomEnd] = (0, import_react13.useState)("");
  const presets = quickPresets || DEFAULT_PRESETS;
  (0, import_react13.useEffect)(() => {
    const start = parseDate(dataInicio);
    const end = parseDate(dataFim);
    if (!start || !end) return;
    if (start.getFullYear() === selectedYear || end.getFullYear() === selectedYear) {
      const next = /* @__PURE__ */ new Set();
      if (start.getFullYear() === end.getFullYear() && start.getFullYear() === selectedYear) {
        for (let m = start.getMonth(); m <= end.getMonth(); m++) next.add(m);
      } else {
        const s = start.getFullYear() === selectedYear ? start.getMonth() : 0;
        const e = end.getFullYear() === selectedYear ? end.getMonth() : 11;
        for (let m = s; m <= e; m++) next.add(m);
      }
      setSelectedMonths(next);
    }
  }, [dataInicio, dataFim, selectedYear]);
  (0, import_react13.useEffect)(() => {
    if (dataInicio) setCustomStart((0, import_dayjs4.default)(dataInicio).format("YYYY-MM-DDTHH:mm"));
    if (dataFim) setCustomEnd((0, import_dayjs4.default)(dataFim).format("YYYY-MM-DDTHH:mm"));
  }, [dataInicio, dataFim]);
  const displayLabel = (0, import_react13.useMemo)(() => {
    const s = parseDate(dataInicio);
    const e = parseDate(dataFim);
    if (!s || !e) return "Selecione um per\xEDodo";
    if (activePresetKey) {
      const p = presets.find((pr) => pr.key === activePresetKey);
      if (p) return p.label;
    }
    if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth() && s.getDate() === 1) {
      return `${MONTHS_FULL[s.getMonth()]} ${s.getFullYear()}`;
    }
    return `${(0, import_dayjs4.default)(s).format("DD/MM/YYYY")} \u2013 ${(0, import_dayjs4.default)(e).format("DD/MM/YYYY")}`;
  }, [dataInicio, dataFim, activePresetKey, presets]);
  const handlePreset = (0, import_react13.useCallback)(
    (preset) => {
      if (disabled) return;
      setActivePresetKey(preset.key);
      onSelect({
        dataInicio: preset.start().toISOString(),
        dataFim: preset.end().toISOString()
      });
    },
    [disabled, onSelect]
  );
  const handleMonthClick = (0, import_react13.useCallback)(
    (index, event) => {
      if (disabled) return;
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      setSelectedMonths((prev) => {
        let next;
        if (shift && lastClickedMonth !== null) {
          next = /* @__PURE__ */ new Set();
          const start = Math.min(index, lastClickedMonth);
          const end = Math.max(index, lastClickedMonth);
          for (let m = start; m <= end; m++) next.add(m);
        } else if (ctrl) {
          next = new Set(prev);
          if (next.has(index)) next.delete(index);
          else next.add(index);
        } else {
          next = /* @__PURE__ */ new Set([index]);
        }
        if (next.size === 0) {
          onSelect({ dataInicio: "", dataFim: "" });
        } else {
          const arr = Array.from(next).sort((a, b) => a - b);
          const first = arr[0];
          const last = arr[arr.length - 1];
          onSelect({
            dataInicio: startOfMonthISO(selectedYear, first),
            dataFim: endOfMonthISO(selectedYear, last)
          });
        }
        setActivePresetKey(null);
        return next;
      });
      setLastClickedMonth(index);
    },
    [disabled, lastClickedMonth, onSelect, selectedYear]
  );
  const handleYearChange = (0, import_react13.useCallback)(
    (delta) => {
      const newYear = selectedYear + delta;
      setSelectedYear(newYear);
      if (selectedMonths.size > 0) {
        const arr = Array.from(selectedMonths).sort((a, b) => a - b);
        onSelect({
          dataInicio: startOfMonthISO(newYear, arr[0]),
          dataFim: endOfMonthISO(newYear, arr[arr.length - 1])
        });
        setActivePresetKey(null);
      }
    },
    [selectedYear, selectedMonths, onSelect]
  );
  const handleCustomApply = (0, import_react13.useCallback)(() => {
    if (!customStart || !customEnd) return;
    setActivePresetKey(null);
    onSelect({
      dataInicio: (0, import_dayjs4.default)(customStart).toISOString(),
      dataFim: (0, import_dayjs4.default)(customEnd).toISOString()
    });
  }, [customStart, customEnd, onSelect]);
  const handleClear = (0, import_react13.useCallback)(() => {
    setSelectedMonths(/* @__PURE__ */ new Set());
    setActivePresetKey(null);
    setCustomStart("");
    setCustomEnd("");
    onSelect({ dataInicio: "", dataFim: "" });
  }, [onSelect]);
  const today = /* @__PURE__ */ new Date();
  const maxDateStr = allowFuture ? void 0 : (0, import_dayjs4.default)().format("YYYY-MM-DDTHH:mm");
  if (compact && !isExpanded) {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      import_react_bootstrap20.Card,
      {
        className: `ups-card ups-card--compact ${className}`,
        onClick: () => !disabled && setIsExpanded(true),
        role: "button",
        tabIndex: 0,
        children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "ups-compact-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaCalendarAlt, { className: "text-primary me-2" }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "ups-display-label", children: displayLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "ups-edit-hint text-muted small", children: "Editar" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_bootstrap20.Card, { className: `ups-card ${className}`, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react_bootstrap20.Card.Body, { className: "ups-body", children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "ups-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "d-flex align-items-center gap-2 flex-grow-1 min-w-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaCalendarAlt, { className: "text-primary flex-shrink-0" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "ups-display-label text-truncate", children: displayLabel })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "d-flex align-items-center gap-1", children: [
        (dataInicio || dataFim) && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          import_react_bootstrap20.Button,
          {
            variant: "link",
            size: "sm",
            className: "p-0 text-muted",
            onClick: handleClear,
            title: "Limpar per\xEDodo",
            disabled,
            children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaTimesCircle, { size: 14 })
          }
        ),
        compact && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          import_react_bootstrap20.Button,
          {
            variant: "link",
            size: "sm",
            className: "p-0 text-muted",
            onClick: () => setIsExpanded(false),
            children: "Fechar"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "ups-tabs", children: TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
      "button",
      {
        className: `ups-tab ${activeTab === tab.key ? "ups-tab--active" : ""}`,
        onClick: () => setActiveTab(tab.key),
        disabled,
        children: [
          tab.icon,
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { children: tab.label })
        ]
      },
      tab.key
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "ups-content", children: [
      activeTab === "quick" && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "ups-quick-grid", children: presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
        import_react_bootstrap20.Button,
        {
          size: "sm",
          variant: activePresetKey === p.key ? "primary" : "outline-secondary",
          className: "ups-quick-btn",
          onClick: () => handlePreset(p),
          disabled,
          children: p.label
        },
        p.key
      )) }),
      activeTab === "month" && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "ups-month-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "ups-year-nav", children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            import_react_bootstrap20.Button,
            {
              variant: "outline-secondary",
              size: "sm",
              className: "ups-year-btn",
              onClick: () => handleYearChange(-1),
              disabled,
              children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaChevronLeft, { size: 10 })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "ups-year-label", children: selectedYear }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            import_react_bootstrap20.Button,
            {
              variant: "outline-secondary",
              size: "sm",
              className: "ups-year-btn",
              onClick: () => handleYearChange(1),
              disabled,
              children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_fa4.FaChevronRight, { size: 10 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "ups-month-grid", children: MONTHS.map((label, idx) => {
          const isSelected = selectedMonths.has(idx);
          const isCurrent = today.getFullYear() === selectedYear && today.getMonth() === idx;
          return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            "button",
            {
              className: [
                "ups-month-cell",
                isSelected && "ups-month-cell--selected",
                isCurrent && !isSelected && "ups-month-cell--current"
              ].filter(Boolean).join(" "),
              onClick: (e) => handleMonthClick(idx, e),
              disabled,
              title: "Clique: selecionar \xB7 Shift: range \xB7 Ctrl/Cmd: multi",
              children: label
            },
            idx
          );
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("p", { className: "ups-month-hint text-muted", children: "Shift+clique para range \xB7 Ctrl/Cmd+clique para multi-sele\xE7\xE3o" })
      ] }),
      activeTab === "custom" && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "ups-custom-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react_bootstrap20.Row, { className: "g-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_bootstrap20.Col, { xs: 12, sm: 6, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react_bootstrap20.Form.Group, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_bootstrap20.Form.Label, { className: "small text-muted mb-1", children: "In\xEDcio" }),
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              import_react_bootstrap20.Form.Control,
              {
                type: "datetime-local",
                size: "sm",
                value: customStart,
                max: maxDateStr,
                onChange: (e) => setCustomStart(e.target.value),
                disabled
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_bootstrap20.Col, { xs: 12, sm: 6, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react_bootstrap20.Form.Group, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_bootstrap20.Form.Label, { className: "small text-muted mb-1", children: "Fim" }),
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              import_react_bootstrap20.Form.Control,
              {
                type: "datetime-local",
                size: "sm",
                value: customEnd,
                min: customStart,
                max: maxDateStr,
                onChange: (e) => setCustomEnd(e.target.value),
                disabled
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "d-flex justify-content-end mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          import_react_bootstrap20.Button,
          {
            variant: "primary",
            size: "sm",
            onClick: handleCustomApply,
            disabled: disabled || !customStart || !customEnd,
            children: "Aplicar"
          }
        ) })
      ] })
    ] })
  ] }) });
};

// src/forms/MailSender.tsx
var import_react14 = require("react");
var import_react_bootstrap21 = require("react-bootstrap");
var import_fi3 = require("react-icons/fi");
var import_jsx_runtime31 = require("react/jsx-runtime");
var MailSender = ({
  htmlContent,
  companyName,
  onFetchEmails,
  onSendEmail,
  hide = false,
  renderTrigger
}) => {
  const [opened, setOpened] = (0, import_react14.useState)(false);
  const [addingEmail, setAddingEmail] = (0, import_react14.useState)(false);
  const [selectedEmails, setSelectedEmails] = (0, import_react14.useState)([]);
  const [emails, setEmails] = (0, import_react14.useState)([]);
  const [loading, setLoading] = (0, import_react14.useState)(false);
  const [postLoading, setPostLoading] = (0, import_react14.useState)(false);
  const [customEmail, setCustomEmail] = (0, import_react14.useState)("");
  const [emailError, setEmailError] = (0, import_react14.useState)("");
  const [searchFilter, setSearchFilter] = (0, import_react14.useState)("");
  const handleOpen = async () => {
    setLoading(true);
    try {
      const data = await onFetchEmails();
      setEmails(data || []);
      setOpened(true);
    } catch (err) {
      console.error("Erro ao buscar e-mails:", err);
    } finally {
      setLoading(false);
    }
  };
  const mailListLinter = () => {
    const result = [];
    const seen = /* @__PURE__ */ new Set();
    if (emails) {
      for (const item of emails) {
        if (item.email && !seen.has(item.email)) {
          seen.add(item.email);
          result.push({ email: item.email });
        }
      }
    }
    return result;
  };
  const filteredEmails = emails ? mailListLinter().filter(
    (email) => email.email.toLowerCase().includes(searchFilter.toLowerCase()) && !selectedEmails.some((selected) => (selected.email || selected) === email.email)
  ) : [];
  const sendEmail = async () => {
    const emailString = selectedEmails.map((email) => email.email ? email.email : email).join(", ");
    const emailData = {
      to: emailString,
      subject: `Relat\xF3rio - ${companyName}`,
      text: `Relat\xF3rio de processo da empresa ${companyName}`,
      html: htmlContent
    };
    setPostLoading(true);
    try {
      await onSendEmail(emailData);
      setSelectedEmails([]);
      setCustomEmail("");
      setOpened(false);
    } catch (err) {
      console.error("Erro ao enviar e-mail:", err);
    } finally {
      setPostLoading(false);
    }
  };
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleEmailAdd = () => {
    if (!customEmail.trim()) {
      setEmailError("Por favor, digite um e-mail");
      return;
    }
    if (!validateEmail(customEmail)) {
      setEmailError("Formato de e-mail inv\xE1lido");
      return;
    }
    if (selectedEmails.some((email) => (email.email || email) === customEmail)) {
      setEmailError("Este e-mail j\xE1 foi selecionado");
      return;
    }
    setSelectedEmails([...selectedEmails, customEmail]);
    setCustomEmail("");
    setEmailError("");
    setAddingEmail(false);
  };
  const handleEmailRemove = (emailToRemove) => {
    setSelectedEmails(
      selectedEmails.filter(
        (email) => (email.email || email) !== (emailToRemove.email || emailToRemove)
      )
    );
  };
  if (hide) return null;
  if (!opened) {
    if (renderTrigger) {
      return renderTrigger({ onClick: handleOpen, loading });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Button, { disabled: loading, className: "w-100", onClick: handleOpen, children: loading ? "Carregando..." : "Enviar por E-mail" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    "div",
    {
      style: {
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #dee2e6",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              color: "white",
              padding: "25px"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "d-flex justify-content-between align-items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("h4", { className: "mb-1", style: { fontWeight: "600", fontSize: "22px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiMail, { className: "me-2", size: 20 }),
                  "Enviar Relat\xF3rio por E-mail"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("small", { style: { opacity: "0.9", fontSize: "14px" }, children: [
                  "Selecione os destinat\xE1rios para envio do relat\xF3rio de ",
                  companyName
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "d-flex gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  import_react_bootstrap21.Button,
                  {
                    variant: "light",
                    onClick: sendEmail,
                    disabled: selectedEmails.length === 0 || postLoading,
                    style: {
                      borderRadius: "8px",
                      fontWeight: "600",
                      minWidth: "130px",
                      height: "40px"
                    },
                    children: postLoading ? /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Spinner, { size: "sm", className: "me-2" }),
                      "Enviando..."
                    ] }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiSend, { className: "me-2", size: 14 }),
                      "Enviar E-mail"
                    ] })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  import_react_bootstrap21.Button,
                  {
                    variant: "outline-light",
                    onClick: () => setOpened(false),
                    disabled: postLoading,
                    style: { borderRadius: "8px", width: "40px", height: "40px" },
                    children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiX, { size: 16 })
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { style: { padding: "25px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Card, { className: "mb-4", style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Card.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Row, { className: "align-items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Col, { md: 6, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("h6", { className: "mb-2", style: { color: "#495057", fontWeight: "600" }, children: "\u{1F527} Filtros e A\xE7\xF5es" }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.InputGroup, { style: { maxWidth: "300px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.InputGroup.Text, { style: { backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiSearch, { size: 14, color: "#6c757d" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    import_react_bootstrap21.Form.Control,
                    {
                      type: "text",
                      placeholder: "Buscar e-mails...",
                      value: searchFilter,
                      onChange: (e) => setSearchFilter(e.target.value),
                      style: { border: "1px solid #dee2e6" }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Col, { md: 6, className: "text-end", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                import_react_bootstrap21.Button,
                {
                  variant: addingEmail ? "outline-secondary" : "outline-primary",
                  size: "sm",
                  onClick: () => setAddingEmail(!addingEmail),
                  disabled: postLoading,
                  style: { borderRadius: "8px" },
                  children: addingEmail ? /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiX, { className: "me-1", size: 14 }),
                    "Cancelar"
                  ] }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiPlus, { className: "me-1", size: 14 }),
                    "E-mail Personalizado"
                  ] })
                }
              ) })
            ] }),
            addingEmail && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "div",
              {
                style: {
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#f8f9ff",
                  borderRadius: "8px",
                  border: "1px solid #e3f2fd"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("h6", { className: "mb-3", style: { color: "#1976d2", fontWeight: "600" }, children: "\u2709\uFE0F Adicionar E-mail Personalizado" }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Row, { className: "align-items-end", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Col, { md: 8, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Form.Label, { style: { fontSize: "13px", color: "#6c757d", fontWeight: "500" }, children: "Endere\xE7o de E-mail" }),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                        import_react_bootstrap21.Form.Control,
                        {
                          type: "email",
                          placeholder: "exemplo@empresa.com",
                          value: customEmail,
                          onChange: (e) => {
                            setCustomEmail(e.target.value);
                            if (emailError) setEmailError("");
                          },
                          isInvalid: !!emailError,
                          disabled: postLoading,
                          style: { borderRadius: "8px" },
                          onKeyPress: (e) => e.key === "Enter" && handleEmailAdd()
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Form.Control.Feedback, { type: "invalid", children: emailError })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Col, { md: 4, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                      import_react_bootstrap21.Button,
                      {
                        variant: "success",
                        onClick: handleEmailAdd,
                        disabled: postLoading,
                        style: { borderRadius: "8px", width: "100%" },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiPlus, { className: "me-1", size: 14 }),
                          "Adicionar"
                        ]
                      }
                    ) })
                  ] })
                ]
              }
            )
          ] }) }),
          selectedEmails.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Card, { className: "mb-4", style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Card.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("h6", { className: "mb-0", style: { color: "#495057", fontWeight: "600" }, children: "\u{1F4CB} Destinat\xE1rios Selecionados" }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Badge, { bg: "primary", style: { fontSize: "12px", padding: "6px 12px" }, children: [
                selectedEmails.length,
                " selecionado",
                selectedEmails.length > 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "d-flex flex-wrap gap-2", children: selectedEmails.map((email, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "div",
              {
                style: {
                  background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                  border: "1px solid #bbdefb",
                  borderRadius: "20px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "500"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiUser, { size: 12, className: "me-2", color: "#1976d2" }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: email.email || email }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    import_react_bootstrap21.Button,
                    {
                      variant: "link",
                      size: "sm",
                      onClick: () => handleEmailRemove(email),
                      disabled: postLoading,
                      style: {
                        padding: "0 0 0 8px",
                        color: "#dc3545",
                        textDecoration: "none",
                        fontSize: "16px"
                      },
                      children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiX, { size: 14 })
                    }
                  )
                ]
              },
              index
            )) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Card, { style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Card.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("h6", { className: "mb-3", style: { color: "#495057", fontWeight: "600" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiUser, { className: "me-2", size: 16 }),
              "E-mails de ",
              companyName
            ] }),
            loading ? /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "text-center py-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Spinner, {}),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "mt-2 text-muted", children: "Carregando e-mails..." })
            ] }) : filteredEmails.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "text-center py-4", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "text-muted mb-0", children: searchFilter ? "Nenhum e-mail encontrado com esse filtro" : "Nenhum e-mail dispon\xEDvel" }) }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Row, { children: filteredEmails.map((email) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_bootstrap21.Col, { xs: 12, sm: 6, lg: 4, className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              import_react_bootstrap21.Card,
              {
                onClick: () => setSelectedEmails([...selectedEmails, email]),
                style: {
                  cursor: "pointer",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                  backgroundColor: "#fff"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#007bff";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e9ecef";
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react_bootstrap21.Card.Body, { style: { padding: "15px", textAlign: "center" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi3.FiMail, { size: 20, color: "#007bff", className: "mb-2" }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    "div",
                    {
                      style: {
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#2c3e50",
                        wordBreak: "break-word"
                      },
                      children: email.email
                    }
                  )
                ] })
              }
            ) }, email.email)) })
          ] }) })
        ] })
      ]
    }
  );
};

// src/forms/AutoComplete.tsx
var import_react15 = require("react");
var import_react_bootstrap22 = require("react-bootstrap");
var import_jsx_runtime32 = require("react/jsx-runtime");
var AutoComplete = ({
  className,
  ops = [],
  sortKey,
  displayKey,
  displayKeys,
  onValueChanged,
  onSelectedClick,
  value,
  actionButton,
  actionButton2,
  placeH,
  title,
  filter,
  filterField,
  loadFunc,
  loadCondition,
  onBlurEvent,
  formatationFunc,
  onEscKeyDown,
  onEnterKeyDown,
  margT,
  margB,
  hideComponent,
  disableComponent = false,
  disableSelect = false,
  autoFocusConfig,
  onLoad,
  cacheKey,
  minChars = 0,
  maxItems,
  showListOnFocus = true,
  lazyLoad = false,
  labelPosition = "top"
}) => {
  const [liItem, setListItem] = (0, import_react15.useState)([]);
  const [options, setOptions] = (0, import_react15.useState)([]);
  const [input, setInput] = (0, import_react15.useState)("");
  const [hide, setHide] = (0, import_react15.useState)(true);
  const [onLoaded, setOnLoaded] = (0, import_react15.useState)(false);
  const [loading, setLoading] = (0, import_react15.useState)(false);
  const cacheStore = (0, import_react15.useMemo)(() => {
    const win = window;
    if (!win.__AUTO_COMPLETE_CACHE__) {
      win.__AUTO_COMPLETE_CACHE__ = /* @__PURE__ */ new Map();
    }
    return win.__AUTO_COMPLETE_CACHE__;
  }, []);
  const sortOptions = (data, key) => {
    if (!key || !Array.isArray(data)) return data;
    return [...data].sort((a, b) => String(a[key]).localeCompare(String(b[key])));
  };
  (0, import_react15.useEffect)(() => {
    setInput(value || "");
  }, [value]);
  (0, import_react15.useEffect)(() => {
    if (!Array.isArray(ops) || ops.length === 0) return;
    const sortedOptions = sortOptions(ops, sortKey);
    setListItem(sortedOptions);
    setOptions(sortedOptions);
  }, [ops, sortKey]);
  (0, import_react15.useEffect)(() => {
    const loadData = async () => {
      if (!(loadCondition && loadFunc)) return;
      if (lazyLoad && minChars > 0 && !showListOnFocus && (!value || String(value).length < minChars)) {
        return;
      }
      const key = cacheKey ? `${cacheKey}${filter ? `:${filterField}:${filter}` : ""}` : null;
      if (key && cacheStore.has(key)) {
        const cacheEntry = cacheStore.get(key);
        const data = cacheEntry.promise ? await cacheEntry.promise : cacheEntry.data || cacheEntry;
        setListItem(data);
        setOptions(data);
        triggerOnLoad(data);
        return;
      }
      setLoading(true);
      try {
        const requestPromise = loadFunc().then((res) => {
          let newOps = (res == null ? void 0 : res.content) || res;
          newOps = Array.isArray(newOps) ? newOps.filter((op) => op != null) : [];
          if (filter && filterField) {
            newOps = newOps.filter((op) => op[filterField] === filter);
          }
          return sortOptions(newOps, sortKey);
        });
        if (key) cacheStore.set(key, { promise: requestPromise });
        const sortedOptions = await requestPromise;
        setListItem(sortedOptions);
        setOptions(sortedOptions);
        if (key) cacheStore.set(key, { data: sortedOptions });
        triggerOnLoad(sortedOptions);
      } catch (error) {
        if (key) cacheStore.delete(key);
        setListItem([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [loadCondition, filter, filterField, sortKey, cacheKey, lazyLoad, minChars, showListOnFocus]);
  const triggerOnLoad = (data) => {
    if (onLoad && !onLoaded) {
      setOnLoaded(true);
      onLoad(data);
    }
  };
  const keysJoinner = (li) => {
    if (!displayKeys || !Array.isArray(displayKeys)) return "";
    return displayKeys.map((key) => `${li[key]} `).join("").trim();
  };
  const getDisplayText = (item) => {
    if (formatationFunc) return formatationFunc(item);
    if (displayKey) return item[displayKey];
    if (displayKeys) return keysJoinner(item);
    return String(item);
  };
  const onFieldUpdate = (val) => {
    const search = val.toLowerCase();
    const canSearch = search.length >= minChars;
    if (canSearch && Array.isArray(options)) {
      const filtered = options.filter((item) => {
        const text = getDisplayText(item);
        return String(text).toLowerCase().includes(search);
      });
      setListItem(filtered);
    } else {
      setListItem(options || []);
    }
    onValueChanged == null ? void 0 : onValueChanged(val);
    setInput(val);
    setHide(!canSearch && options.length === 0);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
    "div",
    {
      className,
      style: { marginTop: margT != null ? margT : 4, marginBottom: margB != null ? margB : 4, position: "relative" },
      onBlur: (e) => {
        setTimeout(() => {
          onBlurEvent == null ? void 0 : onBlurEvent(e, input);
          setHide(true);
        }, 200);
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setHide(true);
          onEscKeyDown == null ? void 0 : onEscKeyDown();
        }
        if (e.key === "Enter" && onEnterKeyDown) {
          onEnterKeyDown(input);
        }
      },
      onMouseLeave: () => setHide(true),
      children: [
        !hideComponent && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_jsx_runtime32.Fragment, { children: [
          labelPosition === "top" && title && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_bootstrap22.Form.Label, { className: "fw-semibold small mb-1", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_react_bootstrap22.InputGroup, { children: [
            labelPosition === "floating" ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_bootstrap22.FloatingLabel, { controlId: "floatingInput", label: title, style: { zIndex: 0, flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
              import_react_bootstrap22.Form.Control,
              {
                autoFocus: autoFocusConfig,
                disabled: disableComponent || disableSelect,
                placeholder: placeH,
                autoComplete: "off",
                value: input,
                onClickCapture: () => {
                  const canOpen = showListOnFocus && input.length >= minChars;
                  setHide(!canOpen);
                },
                onChange: (e) => onFieldUpdate(e.currentTarget.value),
                type: "text"
              }
            ) }) : /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
              import_react_bootstrap22.Form.Control,
              {
                autoFocus: autoFocusConfig,
                disabled: disableComponent || disableSelect,
                placeholder: placeH || title,
                autoComplete: "off",
                value: input,
                onClickCapture: () => {
                  const canOpen = showListOnFocus && input.length >= minChars;
                  setHide(!canOpen);
                },
                onChange: (e) => onFieldUpdate(e.currentTarget.value),
                type: "text"
              }
            ),
            loading && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_bootstrap22.InputGroup.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_bootstrap22.Spinner, { animation: "border", size: "sm" }) }),
            !disableComponent && (actionButton == null ? void 0 : actionButton(() => setInput(""))),
            !disableComponent && (actionButton2 == null ? void 0 : actionButton2(input))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          import_react_bootstrap22.ListGroup,
          {
            className: "listgroup-autocomplete shadow-sm",
            hidden: hide || liItem.length === 0,
            style: {
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              maxHeight: "250px",
              overflowY: "auto",
              zIndex: 1050,
              backgroundColor: "#fff"
            },
            children: (maxItems ? liItem.slice(0, maxItems) : liItem).map((li, index) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
              import_react_bootstrap22.ListGroup.Item,
              {
                action: true,
                onClick: () => {
                  const text = getDisplayText(li);
                  setInput(text);
                  onSelectedClick(li, index, liItem);
                  setHide(true);
                },
                children: getDisplayText(li)
              },
              index
            ))
          }
        )
      ]
    }
  );
};

// src/forms/GenericForm.tsx
var import_react16 = require("react");
var import_react_bootstrap23 = require("react-bootstrap");
var import_jsx_runtime33 = require("react/jsx-runtime");
var GenericForm = ({ fields, onSubmit, renderCustomSelect }) => {
  const [formValues, setFormValues] = (0, import_react16.useState)({});
  const [errors, setErrors] = (0, import_react16.useState)({});
  const handleChange = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    });
  };
  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formValues[field.key]) {
        newErrors[field.key] = `${field.label} \xE9 obrigat\xF3rio`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formValues);
    }
  };
  const renderField = (field) => {
    const { label, key, type, options, placeholder } = field;
    const value = formValues[key] || "";
    switch (type) {
      case "text":
      case "number":
        return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_react_bootstrap23.Form.Group, { className: "mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_bootstrap23.Form.Label, { children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            import_react_bootstrap23.Form.Control,
            {
              type,
              placeholder,
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_bootstrap23.Form.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      case "select": {
        const orderedOptions = (options || []).filter((opt) => opt && opt.value !== void 0 && opt.label !== void 0).sort((a, b) => a.label.localeCompare(b.label));
        return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_react_bootstrap23.Form.Group, { className: "mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_bootstrap23.Form.Label, { children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
            import_react_bootstrap23.Form.Select,
            {
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key],
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("option", { value: "", children: "Selecione..." }),
                orderedOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("option", { value: option.value, children: option.label }, String(option.value)))
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_bootstrap23.Form.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      }
      case "custom-select":
        if (renderCustomSelect) {
          return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { children: [
            renderCustomSelect({
              label,
              value,
              options,
              onChange: (v) => handleChange(key, v),
              placeholder
            }),
            errors[key] && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "invalid-feedback d-block", children: errors[key] })
          ] }, key);
        }
        return null;
      case "date":
        return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_react_bootstrap23.Form.Group, { className: "mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_bootstrap23.Form.Label, { children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            import_react_bootstrap23.Form.Control,
            {
              type: "date",
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_bootstrap23.Form.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      default:
        return null;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_react_bootstrap23.Form, { onSubmit: handleSubmit, children: [
    fields.map((field) => renderField(field)),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "d-grid", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_bootstrap23.Button, { variant: "primary", type: "submit", children: "Salvar" }) })
  ] });
};
var GenericForm_default = GenericForm;

// src/forms/GenericSelect.tsx
var import_react17 = require("react");
var import_react_bootstrap24 = require("react-bootstrap");
var import_jsx_runtime34 = require("react/jsx-runtime");
var GenericSelectOps = class {
  constructor(noLabel, title, onChange, ops, selection, returnType, displayType, filter, filterField, valueType, loadFunc, loadCondition, actionClick, locked) {
    this.noLabel = noLabel;
    this.title = title;
    this.onChange = onChange;
    this.ops = ops;
    this.selection = selection;
    this.returnType = returnType;
    this.displayType = displayType;
    this.filter = filter;
    this.filterField = filterField;
    this.valueType = valueType;
    this.loadFunc = loadFunc;
    this.loadCondition = loadCondition;
    this.actionClick = actionClick;
    this.locked = locked;
  }
};
var GenericSelect = ({
  noLabel,
  title,
  onChange,
  ops,
  selection,
  returnType,
  displayType,
  filter,
  filterField,
  valueType,
  loadFunc,
  loadCondition = true,
  actionClick,
  locked,
  isBold,
  ...restProps
}) => {
  const [options, setOptions] = (0, import_react17.useState)(ops || []);
  (0, import_react17.useEffect)(() => {
    const loadFunction = async () => {
      if (loadCondition && loadFunc) {
        loadFunc().then((res) => {
          let newOps = res.content ? res.content : res;
          if (filter && filterField) {
            newOps = res.filter((op) => op[filterField] == filter);
          }
          setOptions(newOps);
        });
      }
    };
    loadFunction().catch((error) => console.log(error));
  }, [loadCondition]);
  const getTrueValue = (clickedIndex) => {
    const returnValue = options.filter((_op, index) => index == clickedIndex - 1)[0];
    if (returnType == "index") {
      onChange(clickedIndex);
    } else if (returnType) {
      onChange(returnValue[returnType]);
    } else {
      onChange(returnValue);
    }
  };
  const defaultPlaceholder = (restProps == null ? void 0 : restProps.default) || "Seleciona uma Op\xE7\xE3o";
  const selectContent = /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
    import_react_bootstrap24.Form.Control,
    {
      disabled: locked,
      as: "select",
      value: selection,
      onChange: (event) => getTrueValue(event.target.selectedIndex),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("option", { value: void 0, children: [
          "-- ",
          defaultPlaceholder,
          " --"
        ] }, 0),
        (options == null ? void 0 : options.length) > 0 && options.map((op, index) => {
          const val = valueType && op[valueType] || op.id || op;
          let fill = displayType && op[displayType] || op;
          if (typeof fill == "object") fill = "";
          return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("option", { value: val, children: fill }, op.id || index);
        })
      ]
    }
  );
  if (actionClick) {
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_jsx_runtime34.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_react_bootstrap24.Form.Label, { style: { fontWeight: isBold ? "bold" : void 0 }, hidden: noLabel, children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_react_bootstrap24.InputGroup, { children: [
        selectContent,
        actionClick()
      ] })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_jsx_runtime34.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_react_bootstrap24.Form.Label, { style: { fontWeight: isBold ? "bold" : void 0 }, hidden: noLabel, children: title }),
    selectContent
  ] });
};
var GenericSelect_default = GenericSelect;

// src/forms/FormField.tsx
var import_react_bootstrap25 = require("react-bootstrap");
var import_jsx_runtime35 = require("react/jsx-runtime");
var FormField = ({
  val,
  onValueUpdate,
  onBlur,
  label,
  labelPosition = "top",
  ty,
  actionClick,
  actionClick2,
  reference,
  others,
  styleObj,
  locked,
  hide,
  onMouseLv,
  onEnterPress,
  className,
  isInvalid,
  feedback,
  onFocus,
  rows,
  asTextArea,
  controlId
}) => {
  const onKeyDownHandler = (event) => {
    if (event.code === "Enter" || event.key === "Enter") {
      onEnterPress && onEnterPress(event.target.value);
    }
  };
  const onFocusHandler = (value) => {
    onFocus && onFocus(value);
  };
  const renderField = () => {
    const fieldProps = {
      autoComplete: "off",
      isInvalid,
      className,
      ...others,
      onBlur: (event) => onBlur && onBlur(event.target.value, event),
      disabled: locked,
      style: styleObj,
      ref: reference,
      placeholder: (others == null ? void 0 : others.placeholder) || label,
      type: ty || "text",
      value: val != null ? val : "",
      onChange: (event) => onValueUpdate && onValueUpdate(event.target.value, event)
    };
    if (asTextArea) {
      fieldProps.as = "textarea";
      fieldProps.rows = rows || 3;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_bootstrap25.Form.Control, { ...fieldProps });
  };
  if (hide) return null;
  const useFloating = labelPosition === "floating" && !asTextArea;
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
    import_react_bootstrap25.Form.Group,
    {
      onFocusCapture: (e) => onFocusHandler(e.target.value),
      onMouseLeave: onMouseLv,
      onKeyDown: onKeyDownHandler,
      style: { marginTop: 4, marginBottom: 4, width: "100%" },
      controlId: !useFloating ? controlId : void 0,
      children: [
        !useFloating && label && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_bootstrap25.Form.Label, { className: "fw-semibold small mb-1", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_react_bootstrap25.InputGroup, { children: [
          useFloating ? /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_bootstrap25.FloatingLabel, { style: { zIndex: 0, flex: 1 }, label, controlId: controlId || "floatingInput", children: renderField() }) : renderField(),
          actionClick && actionClick(),
          actionClick2 && actionClick2()
        ] }),
        feedback && isInvalid && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_bootstrap25.Form.Control.Feedback, { type: "invalid", style: { display: "block" }, children: feedback })
      ]
    }
  );
};

// src/forms/ClickToWriteField.tsx
var import_react18 = require("react");
var import_react_bootstrap26 = require("react-bootstrap");
var import_jsx_runtime36 = require("react/jsx-runtime");
var ClickToWriteField = ({
  buttonDisplay,
  fieldType = "text",
  fieldLabel = "",
  buttonProps,
  fieldProps,
  onFieldValueUpdate,
  enableFieldActionButton = false,
  fieldActionButtonIcon,
  fieldActionButtonProps,
  fieldActionButtonCallback = () => {
  },
  onEnterPress,
  cleanRef
}) => {
  const [showClick, setShowClick] = (0, import_react18.useState)(false);
  const inputRef = (0, import_react18.useRef)(null);
  (0, import_react18.useEffect)(() => {
    if (showClick) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          cleanRef && cleanRef(inputRef);
        }
      }, 100);
    }
  }, [showClick, cleanRef]);
  const handleShowClick = () => {
    setShowClick(!showClick);
  };
  const resolveButtonDisplay = () => {
    if (typeof buttonDisplay === "function") return buttonDisplay();
    return buttonDisplay;
  };
  const renderFieldActionButtonIcon = () => {
    if (fieldActionButtonIcon) return fieldActionButtonIcon();
    return "OK";
  };
  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      setShowClick(false);
    }
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress(inputRef);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { style: { display: "flex", width: "100%", margin: 0, padding: 0 }, children: [
    !showClick && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
      import_react_bootstrap26.Button,
      {
        style: { flexGrow: 1 },
        onClick: handleShowClick,
        ...buttonProps,
        children: resolveButtonDisplay()
      }
    ),
    showClick && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
      FormField,
      {
        reference: inputRef,
        others: { ...fieldProps, onKeyUp: closeOnEscape },
        hide: !showClick,
        ty: fieldType,
        label: fieldLabel,
        onValueUpdate: onFieldValueUpdate,
        onBlur: () => setShowClick(false),
        actionClick: () => enableFieldActionButton ? /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
          import_react_bootstrap26.Button,
          {
            ...fieldActionButtonProps,
            onClick: () => fieldActionButtonCallback(inputRef),
            children: renderFieldActionButtonIcon()
          }
        ) : null
      }
    )
  ] });
};

// src/forms/ColorPicker.tsx
var import_react_bootstrap27 = require("react-bootstrap");
var import_fa5 = require("react-icons/fa");
var import_jsx_runtime37 = require("react/jsx-runtime");
var ColorPicker = ({
  selectedColor,
  onColorChange,
  defaultColor,
  setCor,
  presetColors = ["#ff0000", "#ffd700", "#008000", "#0000ff", "#800080"],
  title = "Cor de Identifica\xE7\xE3o"
}) => {
  var _a, _b;
  const safeSelectedColor = (_b = (_a = selectedColor != null ? selectedColor : defaultColor) != null ? _a : presetColors[0]) != null ? _b : "#000000";
  const handleColorChange = (color) => {
    onColorChange == null ? void 0 : onColorChange(color);
    setCor == null ? void 0 : setCor(color);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
    import_react_bootstrap27.Card,
    {
      className: "shadow-sm border-primary-hover mb-3",
      style: { maxWidth: "320px", transition: "0.3s" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react_bootstrap27.Card.Header, { className: "bg-light d-flex align-items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_fa5.FaPalette, { className: "me-2 text-primary" }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "fw-medium", children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react_bootstrap27.Card.Body, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react_bootstrap27.Row, { className: "g-3 align-items-center mb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_bootstrap27.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
              "div",
              {
                className: "rounded-circle shadow-sm border",
                style: {
                  width: "40px",
                  height: "40px",
                  backgroundColor: safeSelectedColor,
                  cursor: "pointer",
                  border: "2px solid #dee2e6"
                },
                onClick: () => {
                  const el = document.getElementById("color-input-hidden");
                  if (el) el.click();
                },
                title: "Clique para abrir o seletor"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_bootstrap27.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
              import_react_bootstrap27.Form.Control,
              {
                type: "color",
                id: "color-input-hidden",
                value: safeSelectedColor,
                onChange: (e) => handleColorChange(e.target.value),
                className: "form-control-color-lg",
                style: { width: "100%", height: "40px", cursor: "pointer" }
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_bootstrap27.Row, { className: "g-2 justify-content-start", children: presetColors.map((cor) => /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_bootstrap27.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            "div",
            {
              className: "rounded-1 shadow-sm",
              style: {
                width: "28px",
                height: "28px",
                backgroundColor: cor,
                cursor: "pointer",
                border: cor.toLowerCase() === safeSelectedColor.toLowerCase() ? "2px solid #0d6efd" : "1px solid #dee2e6"
              },
              onClick: () => handleColorChange(cor)
            }
          ) }, cor)) })
        ] })
      ]
    }
  );
};

// src/forms/Switch.tsx
var import_react_bootstrap28 = require("react-bootstrap");
var import_jsx_runtime38 = require("react/jsx-runtime");
var Switch = ({
  label,
  onSwitchChange,
  value,
  disabled = false,
  defaultChecked,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    import_react_bootstrap28.Form.Check,
    {
      ...props,
      disabled,
      type: "switch",
      label,
      checked: value,
      defaultChecked,
      onChange: (event) => onSwitchChange && onSwitchChange(event.target.checked)
    }
  );
};

// src/forms/UploadArea.tsx
var import_react19 = require("react");
var import_react_dropzone = require("react-dropzone");
var import_fi4 = require("react-icons/fi");
var import_jsx_runtime39 = require("react/jsx-runtime");
var UploadArea = ({
  onFilePut,
  anexo,
  accept = { "image/jpeg": [], "image/png": [] },
  maxSize = 50 * 1024 * 1024
}) => {
  const onDrop = (0, import_react19.useCallback)(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && typeof onFilePut === "function") {
        onFilePut(file);
      }
    },
    [onFilePut]
  );
  const { getRootProps, getInputProps, isDragActive } = (0, import_react_dropzone.useDropzone)({
    onDrop,
    maxSize,
    accept
  });
  const hasAnexo = Boolean(anexo);
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
    "div",
    {
      ...getRootProps(),
      className: `upload-area 
				${isDragActive ? "drag-active" : ""} 
				${hasAnexo ? "upload-has-file" : ""}
			`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("input", { ...getInputProps() }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "upload-content", children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "upload-icon", children: hasAnexo ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi4.FiCheckCircle, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi4.FiUploadCloud, { size: 24 }) }),
          hasAnexo ? /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_jsx_runtime39.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("p", { className: "upload-link", children: "Arquivo anexado" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("p", { className: "upload-info", children: anexo == null ? void 0 : anexo.name })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_jsx_runtime39.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("p", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "upload-link", children: "Adicione" }),
              " ou arraste arquivos aqui"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("p", { className: "upload-info", children: [
              "Formatos aceitos: ",
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("b", { children: Object.keys(accept).map((t) => t.split("/")[1].toUpperCase()).join(", ") }),
              " | Tamanho m\xE1ximo:",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("b", { children: [
                (maxSize / (1024 * 1024)).toFixed(0),
                "MB"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
};

// src/index.ts
var import_ui_kit_core = require("@teraprox/ui-kit-core");

// src/forms/FindRecursoByTagField.tsx
var import_ui_kit_sgm3 = require("@teraprox/ui-kit-sgm");

// src/forms/SectorSelector.tsx
var import_react20 = require("react");
var import_react_bootstrap29 = require("react-bootstrap");
var import_bs2 = require("react-icons/bs");
var import_jsx_runtime40 = require("react/jsx-runtime");
var SectorSelector = ({
  setores,
  onSectorSelect,
  selectionLabel = "Selecione o Setor",
  selectionPlaceholder = "Selecione o setor",
  hideComponent = false,
  defaultSectorName = false,
  allowAll = false
}) => {
  const [expanded, setExpanded] = (0, import_react20.useState)(false);
  const [selectedSector, setSelectedSector] = (0, import_react20.useState)(null);
  (0, import_react20.useEffect)(() => {
    if (defaultSectorName && setores.length > 0) {
      const setor = setores.find((s) => s.nome === defaultSectorName);
      if (setor && setor.id !== (selectedSector == null ? void 0 : selectedSector.id)) {
        setSelectedSector(setor);
      }
    } else if (!defaultSectorName) {
      setSelectedSector(null);
    }
  }, [defaultSectorName, setores]);
  const handleSelectSetor = (setor) => {
    setSelectedSector(setor);
    onSectorSelect(setor);
    setExpanded(false);
  };
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  if (hideComponent) return null;
  const setorOptions = allowAll ? [{ id: "all", nome: "Todos" }, ...setores] : [...setores];
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_react_bootstrap29.Form.Floating, { className: "sector-selector-floating", children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "custom-select-container", onClick: toggleExpand, children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "selected-sector-label mt-1", children: (selectedSector == null ? void 0 : selectedSector.nome) || selectionPlaceholder }),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "zoom-container", children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_bs2.BsChevronUp, {}) : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_bs2.BsChevronDown, {}) })
    ] }),
    (selectedSector == null ? void 0 : selectedSector.nome) && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("label", { htmlFor: "floatingInputCustom", children: selectionLabel }),
    expanded && /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      "div",
      {
        className: "custom-dropdown-menu",
        onMouseLeave: () => setExpanded(false),
        children: [
          setorOptions.sort((a, b) => a.nome.localeCompare(b.nome)).map((setor, idx) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
            "div",
            {
              className: `dropdown-option ${setor.nome === (selectedSector == null ? void 0 : selectedSector.nome) ? "selected-option" : ""}`,
              onClick: () => handleSelectSetor(setor),
              children: setor.nome === "default" ? "Nenhum" : setor.nome
            },
            idx
          )),
          setores.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "dropdown-option text-muted italic", children: "Carregando setores..." })
        ]
      }
    )
  ] });
};

// src/forms/UnidadeMaterialForm.tsx
var import_react_bootstrap30 = require("react-bootstrap");
var import_jsx_runtime41 = require("react/jsx-runtime");
var UnidadeMaterialForm = ({
  value,
  onMaterialSelected,
  onQuantidadeUpdate,
  onUnidadeSelected,
  onNavigateToCreateMaterial,
  onNavigateToCreateUnidade,
  loadMaterialsFunc,
  loadUnidadesFunc,
  materialLabel = "Materia Prima",
  hideMaterial = false,
  hideQuantidade = false,
  hideUnidade = false,
  className = ""
}) => {
  var _a, _b, _c;
  const renderNewMaterialButton = () => /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_bootstrap30.Button, { onClick: onNavigateToCreateMaterial, size: "sm", variant: "outline-primary", children: "Novo Material" });
  const renderNewUnidadeButton = () => /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_bootstrap30.Button, { onClick: onNavigateToCreateUnidade, size: "sm", variant: "outline-primary", children: "Nova Unidade" });
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: `unidade-material-form ${className}`, children: [
    !hideMaterial && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      AutoComplete,
      {
        displayKey: "nome",
        value: ((_a = value == null ? void 0 : value.material) == null ? void 0 : _a.nome) || "",
        loadCondition: true,
        title: materialLabel,
        loadFunc: loadMaterialsFunc,
        onSelectedClick: onMaterialSelected,
        actionButton: onNavigateToCreateMaterial ? renderNewMaterialButton : void 0
      }
    ),
    !hideQuantidade && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      FormField,
      {
        label: "Quantidade",
        val: (_b = value == null ? void 0 : value.quantidade) != null ? _b : "",
        onValueUpdate: onQuantidadeUpdate,
        ty: "number"
      }
    ),
    !hideUnidade && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      AutoComplete,
      {
        displayKey: "nome",
        value: ((_c = value == null ? void 0 : value.unidade) == null ? void 0 : _c.nome) || "",
        loadCondition: true,
        title: "Unidade",
        loadFunc: loadUnidadesFunc,
        onSelectedClick: onUnidadeSelected,
        actionButton: onNavigateToCreateUnidade ? renderNewUnidadeButton : void 0
      }
    )
  ] });
};

// src/icons/IconLabelItem.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
var IconLabelItem = ({
  icon,
  label,
  containerClassName = "",
  labelClassName = "",
  onClick,
  style
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: containerClassName, onClick, style: { ...style, cursor: onClick ? "pointer" : "default" }, children: [
    icon,
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { className: labelClassName, children: label })
  ] });
};

// src/icons/IconLabelList.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
var IconLabelList = ({ items, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: `icon-label-list ${className}`, children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
    IconLabelItem,
    {
      labelClassName: "icon-label",
      containerClassName: "icon-label-item",
      icon: item.icon,
      label: item.label,
      onClick: item.onClick
    },
    index
  )) });
};

// src/icons/NotificationItem.tsx
var import_react21 = require("react");
var import_react_bootstrap31 = require("react-bootstrap");
var import_fi5 = require("react-icons/fi");
var import_dayjs5 = __toESM(require("dayjs"));
var import_jsx_runtime44 = require("react/jsx-runtime");
var NotificationItem = ({
  notification,
  onRead,
  onDismiss,
  emptyContentLabel = "Sem conte\xFAdo adicional dispon\xEDvel."
}) => {
  const [showModal, setShowModal] = (0, import_react21.useState)(false);
  const { context, contextId, content, status, createdAt, readAt } = notification;
  const handleOpenModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleReadAndClose = () => {
    onRead(notification);
    handleCloseModal();
  };
  const handleDismiss = (e) => {
    e.stopPropagation();
    onDismiss(notification);
  };
  const displayTitle = contextId ? `${context} - ${contextId}` : context || "Notifica\xE7\xE3o";
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_jsx_runtime44.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
      "div",
      {
        className: `notification-item-modern ${status === "unread" ? "unread" : ""}`,
        onClick: handleOpenModal,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: `notification-status-indicator ${status}`, children: status === "unread" ? /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiClock, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiCheck, { size: 14 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-main-content", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "notification-header-row", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-title-modern", children: [
              /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "notification-context", children: context }),
              contextId && /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_jsx_runtime44.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "notification-separator", children: "/" }),
                /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "notification-context-id", children: contextId })
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "notification-preview", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "notification-content-preview", children: content || "Nova mensagem recebida" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-meta", children: [
              /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-timestamp", children: [
                /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiClock, { size: 12, className: "me-1" }),
                /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("small", { children: (0, import_dayjs5.default)(createdAt).format("DD/MM/YYYY HH:mm") })
              ] }),
              readAt && /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-read-time", children: [
                /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiCheck, { size: 12, className: "me-1" }),
                /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("small", { children: [
                  "Lida em ",
                  (0, import_dayjs5.default)(readAt).format("DD/MM HH:mm")
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "notification-quick-actions", children: status === "unread" && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
            import_react_bootstrap31.OverlayTrigger,
            {
              placement: "top",
              overlay: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_bootstrap31.Tooltip, { children: "Descartar" }),
              children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
                "button",
                {
                  className: "notification-action-btn notification-dismiss-btn",
                  onClick: handleDismiss,
                  "aria-label": "Descartar notifica\xE7\xE3o",
                  children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiTrash2, { size: 14 })
                }
              )
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
      import_react_bootstrap31.Modal,
      {
        show: showModal,
        onHide: handleCloseModal,
        centered: true,
        className: "notification-modal",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_bootstrap31.Modal.Header, { closeButton: true, className: "notification-modal-header", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_bootstrap31.Modal.Title, { className: "notification-modal-title", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "d-flex align-items-center", children: [
            status === "unread" ? /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiClock, { className: "me-2 text-warning" }) : /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiCheck, { className: "me-2 text-success" }),
            "Detalhes da Notifica\xE7\xE3o"
          ] }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_bootstrap31.Modal.Body, { className: "notification-modal-body", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-modal-content", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-modal-meta", children: [
              /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("h6", { className: "notification-modal-source", children: displayTitle }),
              /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "notification-modal-timestamps", children: [
                /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("small", { className: "text-muted", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiClock, { size: 12, className: "me-1" }),
                  "Criada em ",
                  (0, import_dayjs5.default)(createdAt).format("DD/MM/YYYY [\xE0s] HH:mm")
                ] }),
                readAt && /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("small", { className: "text-muted ms-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_fi5.FiCheck, { size: 12, className: "me-1" }),
                  "Lida em ",
                  (0, import_dayjs5.default)(readAt).format("DD/MM/YYYY [\xE0s] HH:mm")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "notification-modal-message", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "mb-0", children: content || emptyContentLabel }) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_react_bootstrap31.Modal.Footer, { className: "notification-modal-footer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_bootstrap31.Button, { variant: "outline-secondary", onClick: handleCloseModal, children: "Fechar" }),
            status === "unread" && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_bootstrap31.Button, { variant: "primary", onClick: handleReadAndClose, children: "Marcar como lida" })
          ] })
        ]
      }
    )
  ] });
};

// src/icons/NotificationBell.tsx
var import_react_bootstrap32 = require("react-bootstrap");
var import_fi6 = require("react-icons/fi");
var import_jsx_runtime45 = require("react/jsx-runtime");
var NotificationBell = ({
  notifications,
  onItemRead,
  onItemDismiss,
  onMarkAllRead,
  size = 20,
  className = ""
}) => {
  const unreadCount = notifications.filter((n) => n.status === "unread").length;
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_react_bootstrap32.Dropdown, { align: "end", className: `notification-bell-dropdown ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_react_bootstrap32.Dropdown.Toggle, { as: "div", className: "position-relative cursor-pointer p-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_fi6.FiBell, { size }),
      unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
        import_react_bootstrap32.Badge,
        {
          pill: true,
          bg: "danger",
          className: "position-absolute",
          style: { top: 0, right: 0, fontSize: "0.65rem" },
          children: unreadCount > 99 ? "99+" : unreadCount
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
      import_react_bootstrap32.Dropdown.Menu,
      {
        className: "shadow-lg border-0",
        style: { width: "320px", padding: 0, maxHeight: "500px", overflowY: "auto" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "p-3 border-bottom d-flex justify-content-between align-items-center bg-light", children: [
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("h6", { className: "mb-0 fw-bold", children: "Notifica\xE7\xF5es" }),
            unreadCount > 0 && onMarkAllRead && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              "button",
              {
                className: "btn btn-link btn-sm p-0 text-decoration-none",
                onClick: (e) => {
                  e.stopPropagation();
                  onMarkAllRead();
                },
                children: "Limpar tudo"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "notification-list", children: notifications.length > 0 ? notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((n) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            NotificationItem,
            {
              notification: n,
              onRead: onItemRead,
              onDismiss: onItemDismiss
            },
            n.id
          )) : /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "p-4 text-center text-muted", children: [
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_fi6.FiBell, { size: 24, className: "mb-2 opacity-25" }),
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { className: "mb-0 small", children: "Nenhuma notifica\xE7\xE3o por aqui." })
          ] }) }),
          notifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "p-2 border-top text-center bg-light", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("small", { className: "text-muted", children: [
            "Total: ",
            notifications.length,
            " notifica\xE7\xF5es"
          ] }) })
        ]
      }
    )
  ] });
};

// src/modals/ModalBasicTemplate.tsx
var import_react_bootstrap33 = require("react-bootstrap");
var import_jsx_runtime46 = require("react/jsx-runtime");
var ModalBasicTemplate = ({
  show,
  closeFunc,
  body,
  header,
  footer,
  props = {}
}) => {
  const { bodyStyle, dialogStyle, ...modalProps } = props;
  const renderPart = (part) => {
    if (typeof part === "function") return part();
    return part;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(
    import_react_bootstrap33.Modal,
    {
      show,
      onHide: closeFunc,
      centered: true,
      style: dialogStyle,
      ...modalProps,
      children: [
        header && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react_bootstrap33.Modal.Header, { closeButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react_bootstrap33.Modal.Title, { children: renderPart(header) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react_bootstrap33.Modal.Body, { style: bodyStyle, children: renderPart(body) }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(import_react_bootstrap33.Modal.Footer, { children: [
          renderPart(footer),
          !footer && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react_bootstrap33.Button, { variant: "secondary", onClick: closeFunc, children: "Fechar" })
        ] })
      ]
    }
  );
};
var ModalBasicTemplate_default = ModalBasicTemplate;

// src/modals/SelectDateModal.tsx
var import_react22 = require("react");
var import_react_bootstrap34 = require("react-bootstrap");
var import_dayjs6 = __toESM(require("dayjs"));
var import_jsx_runtime47 = require("react/jsx-runtime");
var SelectDateModal = ({
  show,
  onClose,
  onSelect,
  title = "Selecionar Data",
  label = "Escolha a data",
  initialDate,
  allowFuture = true
}) => {
  const [selectedDate, setSelectedDate] = (0, import_react22.useState)(
    initialDate || (0, import_dayjs6.default)().format("YYYY-MM-DDTHH:mm")
  );
  const handleConfirm = () => {
    onSelect(selectedDate);
    onClose();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_react_bootstrap34.Modal, { show, onHide: onClose, centered: true, size: "sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_react_bootstrap34.Modal.Header, { closeButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_react_bootstrap34.Modal.Title, { children: title }) }),
    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_react_bootstrap34.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_react_bootstrap34.Form.Group, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_react_bootstrap34.Form.Label, { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
        import_react_bootstrap34.Form.Control,
        {
          type: "datetime-local",
          value: selectedDate,
          max: allowFuture ? void 0 : (0, import_dayjs6.default)().format("YYYY-MM-DDTHH:mm"),
          onChange: (e) => setSelectedDate(e.target.value)
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_react_bootstrap34.Modal.Footer, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_react_bootstrap34.Button, { variant: "outline-secondary", onClick: onClose, children: "Cancelar" }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_react_bootstrap34.Button, { variant: "primary", onClick: handleConfirm, children: "Confirmar" })
    ] })
  ] });
};

// src/modals/JustificativaModal.tsx
var import_react23 = require("react");
var import_react_bootstrap35 = require("react-bootstrap");
var import_fa6 = require("react-icons/fa");
var import_dayjs7 = __toESM(require("dayjs"));
var import_jsx_runtime48 = require("react/jsx-runtime");
var JustificativaModal = ({
  show,
  onClose,
  justificativas: initialJustificativas = [],
  currentUserId,
  currentUserName,
  onUpdateJustificativas
}) => {
  const [localJustificativas, setLocalJustificativas] = (0, import_react23.useState)(initialJustificativas);
  const [novaDescricao, setNovaDescricao] = (0, import_react23.useState)("");
  const [editandoId, setEditandoId] = (0, import_react23.useState)(null);
  (0, import_react23.useEffect)(() => {
    setLocalJustificativas(initialJustificativas);
  }, [initialJustificativas]);
  const handleAddOrEdit = async () => {
    if (!novaDescricao.trim()) return;
    let updatedList = [];
    if (editandoId) {
      updatedList = localJustificativas.map(
        (j) => j.id === editandoId ? { ...j, descricao: novaDescricao } : j
      );
      setEditandoId(null);
    } else {
      const nova = {
        id: Math.random().toString(36).substr(2, 9),
        // Simples ID local se uuid não estiver disp.
        descricao: novaDescricao,
        user: { userId: currentUserId, firstName: currentUserName },
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        isNew: true
      };
      updatedList = [...localJustificativas, nova];
    }
    setNovaDescricao("");
    await onUpdateJustificativas(updatedList);
    setLocalJustificativas(updatedList);
  };
  const handleRemove = async (id) => {
    const updated = localJustificativas.map((j) => j.id === id ? { ...j, removed: true } : j);
    await onUpdateJustificativas(updated);
    setLocalJustificativas(updated);
  };
  const handleUndoRemove = async (id) => {
    const updated = localJustificativas.map((j) => j.id === id ? { ...j, removed: false } : j);
    await onUpdateJustificativas(updated);
    setLocalJustificativas(updated);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_react_bootstrap35.Modal, { show, onHide: onClose, centered: true, size: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Modal.Header, { closeButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Modal.Title, { children: "Justificativas / Coment\xE1rios" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_react_bootstrap35.Modal.Body, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_react_bootstrap35.Form, { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_react_bootstrap35.Form.Group, { controlId: "justificativaInput", className: "mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Form.Label, { className: "small text-muted fw-bold", children: "NOVO REGISTRO" }),
          /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
            import_react_bootstrap35.Form.Control,
            {
              as: "textarea",
              rows: 2,
              value: novaDescricao,
              onChange: (e) => setNovaDescricao(e.target.value),
              placeholder: "Descreva o motivo ou informa\xE7\xE3o adicional..."
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "d-flex justify-content-end", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Button, { variant: "primary", size: "sm", onClick: handleAddOrEdit, children: editandoId ? "Salvar Edi\xE7\xE3o" : "Adicionar Justificativa" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.ListGroup, { className: "border-0", children: localJustificativas.map((j) => {
        var _a, _b, _c;
        const isMe = ((_a = j.user) == null ? void 0 : _a.userId) === currentUserId;
        return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
          import_react_bootstrap35.ListGroup.Item,
          {
            className: "border-0 px-0",
            style: {
              opacity: j.removed ? 0.5 : 1,
              display: "flex",
              flexDirection: "column",
              alignItems: isMe ? "flex-start" : "flex-end",
              backgroundColor: "transparent"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "d-flex align-items-center mb-1", style: { width: "100%", justifyContent: isMe ? "flex-start" : "flex-end" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "small fw-bold text-dark me-2", children: isMe ? "Voc\xEA" : ((_b = j.user) == null ? void 0 : _b.userName) || ((_c = j.user) == null ? void 0 : _c.firstName) || "Usu\xE1rio" }),
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Badge, { bg: "secondary", style: { fontSize: "0.65rem" }, children: (0, import_dayjs7.default)(j.createdAt).format("DD/MM [\xE0s] HH:mm") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                "div",
                {
                  onClick: () => !j.removed && isMe && (setNovaDescricao(j.descricao), setEditandoId(j.id)),
                  style: {
                    maxWidth: "85%",
                    alignSelf: isMe ? "flex-start" : "flex-end",
                    backgroundColor: j.removed ? "#f8d7da" : isMe ? "#e3f2fd" : "#f8f9fa",
                    color: "#333",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    cursor: isMe && !j.removed ? "pointer" : "default",
                    textDecoration: j.removed ? "line-through" : "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    border: isMe ? "1px solid #bbdefb" : "1px solid #e0e0e0"
                  },
                  children: j.descricao
                }
              ),
              isMe && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "mt-1 d-flex gap-2", children: j.removed ? /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.OverlayTrigger, { placement: "top", overlay: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Tooltip, { children: "Desfazer" }), children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                import_fa6.FaUndo,
                {
                  onClick: () => handleUndoRemove(j.id),
                  className: "text-success cursor-pointer",
                  size: 14
                }
              ) }) : /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.OverlayTrigger, { placement: "top", overlay: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Tooltip, { children: "Remover" }), children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                import_fa6.FaTrashAlt,
                {
                  onClick: () => handleRemove(j.id),
                  className: "text-danger cursor-pointer",
                  size: 14
                }
              ) }) })
            ]
          },
          j.id
        );
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Modal.Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_bootstrap35.Button, { variant: "outline-secondary", onClick: onClose, children: "Fechar" }) })
  ] });
};

// src/modals/ImageViewModal.tsx
var import_react24 = require("react");
var import_react_bootstrap36 = require("react-bootstrap");
var import_jsx_runtime49 = require("react/jsx-runtime");
var ImageViewModal = ({
  show,
  onHide,
  imagesData = [],
  initialImageData,
  imageAltText = "Visualiza\xE7\xE3o de imagem",
  resolveImageUrl
}) => {
  const [selectedImageKey, setSelectedImageKey] = (0, import_react24.useState)(null);
  const [imageSrc, setImageSrc] = (0, import_react24.useState)(null);
  const [currentAuthor, setCurrentAuthor] = (0, import_react24.useState)("Desconhecido");
  (0, import_react24.useEffect)(() => {
    if (show && initialImageData) {
      setSelectedImageKey(initialImageData.key);
      setCurrentAuthor(initialImageData.author || "Desconhecido");
    } else if (show && imagesData.length > 0) {
      setSelectedImageKey(imagesData[0].key);
      setCurrentAuthor(imagesData[0].author || "Desconhecido");
    }
  }, [show, initialImageData]);
  (0, import_react24.useEffect)(() => {
    if (show && selectedImageKey) {
      setImageSrc(null);
      const file = imagesData.find((f) => f.key === selectedImageKey);
      if (file == null ? void 0 : file.signedUrl) {
        setImageSrc(file.signedUrl);
      } else if (resolveImageUrl) {
        setImageSrc(resolveImageUrl(selectedImageKey));
      }
    }
  }, [show, selectedImageKey]);
  const renderImageSelector = () => {
    if (imagesData.length <= 1) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "mb-3 d-flex flex-wrap justify-content-center gap-2", children: imagesData.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
      import_react_bootstrap36.Button,
      {
        variant: selectedImageKey === img.key ? "primary" : "outline-secondary",
        size: "sm",
        onClick: () => {
          setSelectedImageKey(img.key);
          setCurrentAuthor(img.author || "Desconhecido");
        },
        children: img.dataContext ? `${img.dataContext}-${img.dataId}` : `Imagem ${idx + 1}`
      },
      idx
    )) });
  };
  const body = /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "text-center", children: [
    renderImageSelector(),
    imageSrc ? /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
      "img",
      {
        src: imageSrc,
        alt: imageAltText,
        className: "img-fluid rounded shadow-sm",
        style: { maxHeight: "75vh", objectFit: "contain" }
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "p-5 text-muted", children: "Aguardando imagem..." })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
    ModalBasicTemplate_default,
    {
      header: "Visualiza\xE7\xE3o de Imagem",
      closeFunc: onHide,
      show,
      body,
      props: { size: "lg" },
      footer: () => /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "w-100 d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("small", { className: "text-muted", children: [
          "Enviado por: ",
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("strong", { children: currentAuthor })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react_bootstrap36.Button, { variant: "outline-secondary", size: "sm", onClick: onHide, children: "Fechar" })
      ] })
    }
  );
};

// src/qr/QrReader.tsx
var import_qr_scanner = __toESM(require("qr-scanner"));
var import_react25 = require("react");
var import_jsx_runtime50 = require("react/jsx-runtime");
var QrReader = ({ callback }) => {
  const scanner = (0, import_react25.useRef)(null);
  const videoEl = (0, import_react25.useRef)(null);
  const qrBoxEl = (0, import_react25.useRef)(null);
  const [qrOn, setQrOn] = (0, import_react25.useState)(true);
  const [scannedResult, setScannedResult] = (0, import_react25.useState)("");
  const onScanSuccess = (result) => {
    setScannedResult(result.data);
    callback(result.data);
  };
  const onScanFail = (err) => {
    if (typeof err === "string" && !err.includes("No QR code found")) {
      console.error("QR Scanner Error:", err);
    }
  };
  (0, import_react25.useEffect)(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new import_qr_scanner.default(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || void 0
      });
      scanner.current.start().then(() => setQrOn(true)).catch((err) => {
        console.error("Failed to start QR Scanner:", err);
        setQrOn(false);
      });
    }
    return () => {
      if (scanner.current) {
        scanner.current.stop();
        scanner.current.destroy();
        scanner.current = null;
      }
    };
  }, []);
  (0, import_react25.useEffect)(() => {
    if (!qrOn) {
      alert(
        "C\xE2mera est\xE1 bloqueada ou inacess\xEDvel. Por favor, habilite a c\xE2mera nas permiss\xF5es do seu navegador e recarregue a p\xE1gina."
      );
    }
  }, [qrOn]);
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "qr-reader", style: { position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("video", { ref: videoEl, style: { width: "100%", borderRadius: "8px" } }),
    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { ref: qrBoxEl, className: "qr-box" }),
    scannedResult && /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "0.8rem"
        },
        children: [
          "Lido: ",
          scannedResult
        ]
      }
    )
  ] });
};

// src/qr/QrCodeScanButton.tsx
var import_react26 = require("react");
var import_bs3 = require("react-icons/bs");
var import_jsx_runtime51 = require("react/jsx-runtime");
var QrCodeScanButton = ({ callback, size = 25 }) => {
  const [showQr, setShowQr] = (0, import_react26.useState)(false);
  const toggleQr = () => {
    setShowQr((prev) => !prev);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(
    "div",
    {
      className: "hoverable-div",
      style: {
        border: "solid",
        borderTopRightRadius: "3px",
        borderBottomRightRadius: "3px",
        padding: "8px",
        borderLeft: "none",
        borderColor: "#ccc",
        borderWidth: "1px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center"
      },
      onClick: toggleQr,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_bs3.BsQrCode, { size }),
        showQr && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
          "div",
          {
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            },
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { style: { width: "100%", maxWidth: "500px", backgroundColor: "#fff", borderRadius: "12px", padding: "20px", position: "relative" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
                "div",
                {
                  onClick: toggleQr,
                  style: { position: "absolute", top: "10px", right: "15px", fontSize: "1.5rem", cursor: "pointer", zIndex: 10001 },
                  children: "\xD7"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("h5", { className: "mb-3 text-center", children: "Escaneie o QR Code" }),
              /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
                QrReader,
                {
                  callback: (v) => {
                    toggleQr();
                    callback(v);
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("p", { className: "mt-3 text-muted text-center small", children: "Aponte a c\xE2mera para o c\xF3digo" })
            ] })
          }
        )
      ]
    }
  );
};

// src/tables/ReusableTableWithModal.tsx
var import_react27 = require("react");
var import_react_bootstrap37 = require("react-bootstrap");
var import_jsx_runtime52 = require("react/jsx-runtime");
var ReusableTableWithModal = ({
  fetchDataCallback,
  modalButtonCallback,
  configureColumnsCallback,
  headers,
  modalContent,
  confirmLabel = "Aceitar",
  onFetchData
}) => {
  const [data, setData] = (0, import_react27.useState)([]);
  const [selectedItem, setSelectedItem] = (0, import_react27.useState)(null);
  const [showModal, setShowModal] = (0, import_react27.useState)(false);
  const [loading, setLoading] = (0, import_react27.useState)(false);
  const [tableDataRows, setTableDataRows] = (0, import_react27.useState)([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchDataCallback();
      onFetchData && onFetchData(response);
      setData(response);
      const items = Array.isArray(response) ? response : [response];
      const tabData = items.map((r) => configureColumnsCallback(r));
      setTableDataRows(tabData);
    } catch (error) {
      console.error("Erro ao buscar dados na ReusableTable:", error);
    } finally {
      setLoading(false);
    }
  };
  (0, import_react27.useEffect)(() => {
    fetchData();
  }, []);
  const handleRowClick = (td) => {
    setSelectedItem(td.dataObj);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(import_jsx_runtime52.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(import_react_bootstrap37.Table, { striped: true, bordered: true, hover: true, responsive: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("tr", { children: headers.map((col, index) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("th", { children: col }, index)) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("td", { colSpan: headers.length, className: "text-center py-4", children: "Carregando..." }) }) : tableDataRows.length > 0 ? tableDataRows.map((td, index) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
        "tr",
        {
          onClick: () => handleRowClick(td),
          style: { cursor: "pointer" },
          children: td.columns.map((col, colIndex) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("td", { children: col || "N/A" }, colIndex))
        },
        index
      )) : /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("td", { colSpan: headers.length, className: "text-center py-4", children: "Nenhum dado encontrado." }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(import_react_bootstrap37.Modal, { show: showModal, onHide: handleCloseModal, centered: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_bootstrap37.Modal.Header, { closeButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_bootstrap37.Modal.Title, { children: "Detalhes" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_bootstrap37.Modal.Body, { children: selectedItem && /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("div", { children: modalContent ? modalContent(selectedItem) : "Visualizando detalhes do item." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(import_react_bootstrap37.Modal.Footer, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_bootstrap37.Button, { variant: "outline-secondary", onClick: handleCloseModal, children: "Fechar" }),
        modalButtonCallback && /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
          import_react_bootstrap37.Button,
          {
            variant: "primary",
            onClick: () => {
              modalButtonCallback(selectedItem);
              handleCloseModal();
            },
            children: confirmLabel
          }
        )
      ] })
    ] })
  ] });
};

// src/text/TextWithMore.tsx
var import_react28 = require("react");
var import_react_bootstrap38 = require("react-bootstrap");
var import_jsx_runtime53 = require("react/jsx-runtime");
var TextWithMore = ({
  text = "Carregando...",
  maxLength,
  moreLabel = "ver mais",
  lessLabel = "ver menos"
}) => {
  const [expanded, setExpanded] = (0, import_react28.useState)(false);
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };
  const isTruncated = text.length > maxLength;
  const displayText = isTruncated && !expanded ? text.slice(0, maxLength) + "\u2026" : text;
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(import_jsx_runtime53.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { className: "text-with-more-content", children: displayText }),
    isTruncated && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
      import_react_bootstrap38.Button,
      {
        variant: "link",
        className: "p-0 ms-2",
        style: { fontSize: "0.85rem", textDecoration: "none" },
        onClick: handleToggleExpand,
        children: expanded ? lessLabel : moreLabel
      }
    )
  ] });
};

// src/index.ts
var import_ui_kit_sgp = require("@teraprox/ui-kit-sgp");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionButtons,
  AddButton,
  AdvancedFilterBar,
  AnexoManager,
  ApproveAndReproveButtons,
  AsyncButton,
  AutoComplete,
  BonusButton,
  BranchDropDisplay,
  ButtonWithDropdown,
  CalculadoraCorrecaoModal,
  CalculoCorrecao,
  CampoDeVerificacaoV2,
  CheckBox,
  ClickToWriteField,
  ColorPicker,
  ConfigObject,
  DeleteButton,
  DeleteConfirm,
  ExpandableCard,
  FindRecursoByTagField,
  FormField,
  FrequenciaFormV2,
  Generic3DotMenu,
  GenericChart,
  GenericDisplay,
  GenericForm,
  GenericREchart,
  GenericSelect,
  GenericSelectOps,
  IconLabelItem,
  IconLabelList,
  ImageViewModal,
  JustificativaModal,
  LoadingButton,
  LoadingProgress,
  MailSender,
  MenuEvent,
  ModalBasicTemplate,
  NavigateButton,
  NotificationBell,
  NotificationItem,
  PeriodSelector,
  QrCodeScanButton,
  QrReader,
  RateLimitBar,
  RecursoDisplayer,
  ResponsiveContainer,
  ReusableTableWithModal,
  SectorSelector,
  SelectDateModal,
  StatusBadge,
  StatusIndicator,
  StatusLight,
  StatusPills,
  Switch,
  SwitchOnClick,
  TarefaUnidadeForm,
  TextWithMore,
  TimerDisplay,
  UnidadeMaterialCard,
  UnidadeMaterialForm,
  UnifiedPeriodSelector,
  UploadArea,
  UuidPill,
  VerticalItemsDisplay
});
