// src/buttons/AddButton.tsx
import { Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import { jsx } from "react/jsx-runtime";
var AddButton = ({ callback, hiddenBool, size }) => /* @__PURE__ */ jsx(
  Button,
  {
    hidden: hiddenBool || false,
    variant: "outline-primary",
    onClick: () => callback(),
    children: /* @__PURE__ */ jsx(GrAdd, { size: size || 25 })
  }
);
var AddButton_default = AddButton;

// src/buttons/DeleteButton.tsx
import { Button as Button2 } from "react-bootstrap";
import { jsx as jsx2 } from "react/jsx-runtime";
var DeleteButton = ({ title, onDeleteClick }) => {
  return /* @__PURE__ */ jsx2(Button2, { variant: "danger", onClick: () => onDeleteClick(), children: title });
};
var DeleteButton_default = DeleteButton;

// src/buttons/ActionButtons.tsx
import { useState as useState2, useRef } from "react";
import { Button as Button4, Form as Form2, ProgressBar } from "react-bootstrap";
import { FiSave, FiTrash2, FiRotateCcw, FiCopy, FiChevronLeft } from "react-icons/fi";

// src/forms/DeleteConfirm.tsx
import { useState } from "react";
import { Button as Button3, Modal, Form } from "react-bootstrap";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var DeleteConfirm = ({
  show,
  onHide,
  onConfirm,
  title = "Confirma\xE7\xE3o de Exclus\xE3o",
  dialogText,
  payload,
  needExclusionDetails = false
}) => {
  const [exclusionDetails, setExclusionDetails] = useState("");
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
  return /* @__PURE__ */ jsxs(Modal, { show, onHide: () => onHide(false), centered: true, children: [
    /* @__PURE__ */ jsx3(Modal.Header, { closeButton: true, children: /* @__PURE__ */ jsx3(Modal.Title, { children: title }) }),
    /* @__PURE__ */ jsx3(Modal.Body, { children: /* @__PURE__ */ jsxs("div", { className: "d-flex flex-column gap-3", children: [
      /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsx3("strong", { children: getDialogContent() }) }),
      needExclusionDetails && /* @__PURE__ */ jsxs(Form.Group, { children: [
        /* @__PURE__ */ jsx3(Form.Label, { children: "Motivo da Exclus\xE3o (m\xEDn. 8 caracteres)" }),
        /* @__PURE__ */ jsx3(
          Form.Control,
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
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx3(Button3, { variant: "secondary", onClick: () => onHide(false), children: "Cancelar" }),
      /* @__PURE__ */ jsx3(
        Button3,
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
import { Fragment, jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
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
  PermissionWrapper = ({ children }) => /* @__PURE__ */ jsx4(Fragment, { children })
}) => {
  const [showConfirm, setShowConfirm] = useState2(false);
  const [isHolding, setIsHolding] = useState2(false);
  const [progress, setProgress] = useState2(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
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
      return /* @__PURE__ */ jsxs2("div", { style: { position: "relative", display: "inline-block", margin: 2 }, children: [
        /* @__PURE__ */ jsxs2(
          Button4,
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
              /* @__PURE__ */ jsx4(FiTrash2, { className: "me-2" }),
              isHolding ? "Segure..." : deleteLabel
            ]
          }
        ),
        isHolding && /* @__PURE__ */ jsx4(
          ProgressBar,
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
    return /* @__PURE__ */ jsxs2(
      Button4,
      {
        variant: "danger",
        onClick: () => setShowConfirm(true),
        disabled,
        style: { margin: 2 },
        children: [
          /* @__PURE__ */ jsx4(FiTrash2, { className: "me-2" }),
          deleteLabel
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx4(
      DeleteConfirm,
      {
        show: showConfirm,
        onHide: setShowConfirm,
        onConfirm: (details) => onDelete && onDelete(details),
        dialogText: deleteConfirmMsg,
        needExclusionDetails
      }
    ),
    /* @__PURE__ */ jsxs2(Form2.Group, { className: "d-flex flex-wrap align-items-center mt-3 gap-1", children: [
      onBack && /* @__PURE__ */ jsxs2(Button4, { variant: "outline-secondary", onClick: onBack, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiChevronLeft, { className: "me-2" }),
        backLabel
      ] }),
      isEditing && onCancelEdit && /* @__PURE__ */ jsxs2(Button4, { variant: "warning", onClick: onCancelEdit, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiRotateCcw, { className: "me-2" }),
        cancelEditLabel
      ] }),
      /* @__PURE__ */ jsx4(PermissionWrapper, { children: renderDeleteButton() }),
      onSave && /* @__PURE__ */ jsxs2(Button4, { variant: saveVariant, onClick: onSave, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiSave, { className: "me-2" }),
        saveLabel
      ] }),
      isEditing && onCopy && /* @__PURE__ */ jsxs2(Button4, { variant: "outline-primary", onClick: onCopy, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiCopy, { className: "me-2" }),
        copyLabel
      ] })
    ] })
  ] });
};

// src/buttons/ApproveAndReproveButtons.tsx
import { useEffect } from "react";
import { Button as Button5 } from "react-bootstrap";
import { GrCheckmark, GrClose } from "react-icons/gr";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var ApproveAndReproveButtons = ({
  buttonSize = 25,
  approveCallback,
  reproveCallback,
  cancelCallback,
  headerText = "Aprovar?",
  approveText,
  repproveText
}) => {
  useEffect(() => {
    const keyboardHandler = (e) => {
      if (e.key === "Escape") {
        cancelCallback();
      }
    };
    window.document.addEventListener("keydown", keyboardHandler);
    return () => window.document.removeEventListener("keydown", keyboardHandler);
  }, [cancelCallback]);
  return /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsx5("strong", { children: headerText }),
    /* @__PURE__ */ jsx5("br", {}),
    /* @__PURE__ */ jsx5(Button5, { onClick: approveCallback, variant: "success", className: "me-1", children: approveText ? approveText : /* @__PURE__ */ jsx5(GrCheckmark, { size: buttonSize }) }),
    /* @__PURE__ */ jsx5(Button5, { onClick: reproveCallback, variant: "danger", children: repproveText ? repproveText : /* @__PURE__ */ jsx5(GrClose, { size: buttonSize }) })
  ] });
};

// src/buttons/AsyncButton.tsx
import { useState as useState3, useRef as useRef2 } from "react";
import { Button as Button6 } from "react-bootstrap";

// src/progress/LoadingProgress.tsx
import { Spinner } from "react-bootstrap";
import { jsx as jsx6 } from "react/jsx-runtime";
var LoadingProgress = ({ hidden }) => {
  return /* @__PURE__ */ jsx6(Spinner, { hidden, animation: "border", role: "status", children: /* @__PURE__ */ jsx6("span", { className: "visually-hidden", children: "Carregando..." }) });
};

// src/buttons/AsyncButton.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var useAsyncAction = () => {
  const [loading, setLoading] = useState3(false);
  const isMounted = useRef2(true);
  const isProcessing = useRef2(false);
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
  loadingComponent = /* @__PURE__ */ jsx7(LoadingProgress, {}),
  buttonProps
}) => {
  const { loading, execute } = useAsyncAction();
  return /* @__PURE__ */ jsx7(
    Button6,
    {
      ...buttonProps,
      onClick: () => execute(onClick),
      disabled: loading || buttonProps && buttonProps.disabled,
      children: loading ? loadingComponent : children
    }
  );
};

// src/buttons/BonusButton.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var BonusButton = ({
  renderCondition = true,
  onClickCallback,
  label,
  className = "",
  ...props
}) => {
  if (!renderCondition) return null;
  return /* @__PURE__ */ jsx8(
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
import { Button as Button7, ButtonGroup, Dropdown } from "react-bootstrap";
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
var ButtonWithDropdown = ({
  title,
  onClickButton,
  options,
  menuVariant = "light",
  variant = "primary",
  toggleVariant
}) => {
  return /* @__PURE__ */ jsxs4(
    Dropdown,
    {
      as: ButtonGroup,
      className: "d-flex w-100",
      style: { flex: 1, minWidth: 0 },
      menuVariant,
      children: [
        /* @__PURE__ */ jsx9(
          Button7,
          {
            variant,
            onClick: onClickButton,
            className: "flex-grow-1 text-truncate",
            style: { minWidth: 0 },
            children: title
          }
        ),
        /* @__PURE__ */ jsx9(
          Dropdown.Toggle,
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
        /* @__PURE__ */ jsx9(Dropdown.Menu, { children: options.map((opt, idx) => /* @__PURE__ */ jsx9(Dropdown.Item, { onClick: opt.callback, children: opt.label }, `${opt.label}-${idx}`)) })
      ]
    }
  );
};

// src/buttons/CheckBox.tsx
import { Form as Form3, InputGroup } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx10("div", { className, children: opcoes.map((opcao, index) => /* @__PURE__ */ jsxs5(InputGroup, { style: { padding: 12, justifyItems: "center", opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto" }, children: [
      /* @__PURE__ */ jsx10(InputGroup.Checkbox, {}),
      /* @__PURE__ */ jsx10(
        Form3.Control,
        {
          autoFocus: true,
          onKeyDown: (event) => enterEvent && enterEvent(event, index, opcao),
          style: { border: "none", borderBottom: "solid", borderRadius: 0, borderColor: "gray", borderWidth: "1px" },
          value: isCreator ? "Nova opcao" : String(opcao.valor),
          onChange: (event) => updateEvent && updateEvent(event, index)
        }
      ),
      deleteEvent && /* @__PURE__ */ jsx10("span", { style: { cursor: "pointer" }, children: /* @__PURE__ */ jsx10(TiDelete, { size: "18", className: "delete text-danger", onClick: () => deleteEvent() }) })
    ] }, index)) });
  }
  return /* @__PURE__ */ jsx10("div", { className, style: { textAlign: "start" }, children: opcoes.map((opcao, index) => /* @__PURE__ */ jsx10(
    Form3.Check,
    {
      disabled,
      type: "checkbox",
      label: `${opcao.valor}`
    },
    index
  )) });
};

// src/buttons/Generic3DotMenu.tsx
import { useState as useState4 } from "react";
import { Button as Button8, Modal as Modal2 } from "react-bootstrap";
import { CiMenuKebab } from "react-icons/ci";
import { Fragment as Fragment2, jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
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
  const [show, setShow] = useState4(false);
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
  return /* @__PURE__ */ jsxs6(Fragment2, { children: [
    /* @__PURE__ */ jsx11(CiMenuKebab, { onClick: handleShow, style: { cursor: "pointer" }, size: 25, title: tittle }),
    /* @__PURE__ */ jsxs6(Modal2, { show, onHide: handleClose, centered: true, children: [
      /* @__PURE__ */ jsx11(Modal2.Header, { closeButton: true, children: /* @__PURE__ */ jsx11(Modal2.Title, { children: tittle }) }),
      /* @__PURE__ */ jsxs6(Modal2.Body, { children: [
        Object.keys(groupedEvents).length === 0 && /* @__PURE__ */ jsx11("div", { className: "text-center text-muted", children: "Nenhuma op\xE7\xE3o dispon\xEDvel." }),
        Object.keys(groupedEvents).map((section, sectionIndex) => /* @__PURE__ */ jsxs6("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx11("h6", { className: "border-bottom pb-2 mb-3", children: section !== "default" ? section : "Op\xE7\xF5es Principais" }),
          /* @__PURE__ */ jsx11("div", { className: "d-grid gap-2", children: groupedEvents[section].map((event, index) => /* @__PURE__ */ jsx11(
            Button8,
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
      /* @__PURE__ */ jsx11(Modal2.Footer, { children: /* @__PURE__ */ jsx11(Button8, { variant: "secondary", onClick: handleClose, children: "Fechar" }) })
    ] })
  ] });
};

// src/buttons/LoadingButton.tsx
import { Button as Button9, Spinner as Spinner2 } from "react-bootstrap";
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx12(
    Button9,
    {
      variant,
      size,
      disabled: disabled || loading,
      onClick,
      className: `loading-button ${className}`,
      style: { cursor: loading ? "not-allowed" : "pointer" },
      ...props,
      children: loading ? /* @__PURE__ */ jsxs7("div", { className: "align-items-center", children: [
        /* @__PURE__ */ jsx12(
          Spinner2,
          {
            as: "span",
            animation: "border",
            size: "sm",
            role: "status",
            "aria-hidden": "true",
            className: "me-2"
          }
        ),
        /* @__PURE__ */ jsx12("span", { children: loadingLabel })
      ] }) : /* @__PURE__ */ jsxs7("div", { className: "align-items-center", children: [
        icon && /* @__PURE__ */ jsx12("span", { className: "me-2 d-flex", children: icon }),
        /* @__PURE__ */ jsx12("span", { children: label })
      ] })
    }
  );
};

// src/buttons/NavigateButton.tsx
import { Button as Button10 } from "react-bootstrap";
import { jsx as jsx13 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx13(
    Button10,
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
import { Form as Form4, Spinner as Spinner3 } from "react-bootstrap";
import { Fragment as Fragment3, jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx14("div", { className: "d-flex align-items-center gap-2", children: loading ? /* @__PURE__ */ jsx14(Spinner3, { animation: "border", size: "sm" }) : /* @__PURE__ */ jsxs8(Fragment3, { children: [
    showCheckbox && /* @__PURE__ */ jsx14(
      Form4.Check,
      {
        type: "checkbox",
        checked,
        onChange: onToggle,
        className: "me-1"
      }
    ),
    /* @__PURE__ */ jsx14("span", { className: `badge ${badgeClass}`, children: status })
  ] }) });
};

// src/buttons/SwitchOnClick.tsx
import { useEffect as useEffect2, useState as useState5 } from "react";
import { FaTimes } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
var SwitchOnClick = ({
  children,
  placeHolder = /* @__PURE__ */ jsx15(
    "div",
    {
      className: "text-center zoom-container",
      style: {
        fontSize: "1.2rem",
        color: "#666"
      },
      children: /* @__PURE__ */ jsx15(
        GrAddCircle,
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
  const [clicked, setClicked] = useState5(false);
  const handleClick = () => {
    onSwitchClick && onSwitchClick();
    setClicked(!clicked);
  };
  const handleClose = () => {
    setClicked(false);
    onCancel && onCancel();
  };
  useEffect2(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);
  if (!clicked) {
    return /* @__PURE__ */ jsx15("div", { onClick: handleClick, style: { cursor: "pointer" }, children: placeHolder });
  }
  return /* @__PURE__ */ jsxs9("div", { className: `switch-on-click-container ${containerClassName}`, children: [
    /* @__PURE__ */ jsx15("div", { className: "close-icon", onClick: handleClose, children: /* @__PURE__ */ jsx15(FaTimes, { title: "Fechar" }) }),
    children({ handleClose })
  ] });
};

// src/charts/GenericChart.tsx
import { Chart } from "react-google-charts";
import { jsx as jsx16 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx16(
    Chart,
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
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import dayjs from "dayjs";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx17("div", { style: { width, height }, children: /* @__PURE__ */ jsx17(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs10(LineChart, { data: sortedData, margin, children: [
    showGrid && /* @__PURE__ */ jsx17(CartesianGrid, { strokeDasharray: "3 3" }),
    /* @__PURE__ */ jsx17(
      XAxis,
      {
        dataKey: xAxisKey,
        reversed: false,
        tickFormatter: (tick) => dayjs(tick).format("DD/MM/YY HH:mm")
      }
    ),
    /* @__PURE__ */ jsx17(YAxis, { domain: YAxisRange, unit, hide: hideYAxis, type: "number" }),
    showTooltip && /* @__PURE__ */ jsx17(
      Tooltip,
      {
        labelFormatter: (label) => dayjs(label).format("DD/MM/YY HH:mm")
      }
    ),
    showLegend && /* @__PURE__ */ jsx17(Legend, {}),
    lines.map((lineCfg, idx) => /* @__PURE__ */ jsx17(Line, { ...lineCfg }, idx))
  ] }) }) });
};

// src/containers/ResponsiveContainer.tsx
import { Modal as Modal3, ModalBody } from "react-bootstrap";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs11(Modal3, { size: "lg", show, onHide: handleClose, scrollable, children: [
    /* @__PURE__ */ jsx18(Modal3.Header, { closeButton: true, onClick: handleClose }),
    /* @__PURE__ */ jsx18(ModalBody, { children })
  ] });
};
var ResponsiveContainer_default = ResponsiveContainer2;

// src/containers/ExpandableCard.tsx
import { useState as useState6 } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
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
  const [expandedCard, setExpandedCard] = useState6(false);
  const handleToggleExpandCard = () => {
    setExpandedCard(!expandedCard);
  };
  const visibleItems = expandedCard ? items : items.slice(0, initialVisibleCount);
  const shouldShowExpandButton = expandable && items.length > initialVisibleCount;
  const renderContentWithToggle = (content) => {
    return content;
  };
  return /* @__PURE__ */ jsxs12(Card, { className: `expandable-card ${cardClassName}`, children: [
    leftSideContent && /* @__PURE__ */ jsx19("div", { className: "expandable-card-left-side", children: leftSideContent }),
    /* @__PURE__ */ jsx19(Card.Body, { className: `expandable-card-body ${cardBodyClassName}`, style: cardBodyStyle, children: /* @__PURE__ */ jsxs12(ListGroup, { variant: "flush", children: [
      visibleItems.map((item, index) => {
        const isObject = typeof item === "object" && item !== null && "content" in item;
        const itemObj = isObject ? item : { content: item };
        const clickableClass = itemObj.clickable ? "expandable-card-list-item-clickable" : "";
        return /* @__PURE__ */ jsx19(
          ListGroup.Item,
          {
            className: `expandable-card-list-item ${clickableClass}`,
            children: isMobile ? /* @__PURE__ */ jsxs12("div", { className: "expandable-card-item", children: [
              itemObj.label && /* @__PURE__ */ jsx19("div", { className: "expandable-card-item-header", children: /* @__PURE__ */ jsx19("strong", { children: itemObj.label }) }),
              /* @__PURE__ */ jsx19("div", { className: "expandable-card-item-content", children: renderContentWithToggle(itemObj.content) })
            ] }) : /* @__PURE__ */ jsxs12("div", { className: "expandable-card-item-row", children: [
              itemObj.label && /* @__PURE__ */ jsxs12("strong", { className: "expandable-card-item-label", children: [
                itemObj.label,
                ":"
              ] }),
              /* @__PURE__ */ jsx19("span", { className: "expandable-card-item-content", children: renderContentWithToggle(itemObj.content) })
            ] })
          },
          index
        );
      }),
      shouldShowExpandButton && /* @__PURE__ */ jsx19(
        ListGroup.Item,
        {
          className: `expandable-card-toggle ${expandedCard ? "expanded" : ""}`,
          onClick: handleToggleExpandCard,
          children: /* @__PURE__ */ jsx19(FaChevronDown, { className: "expandable-card-toggle-icon" })
        }
      )
    ] }) }),
    rightSideContent && /* @__PURE__ */ jsx19("div", { className: "expandable-card-right-side", children: rightSideContent })
  ] });
};

// src/displays/UuidPill.tsx
import { useState as useState7, useRef as useRef3 } from "react";
import { Badge, Overlay, Tooltip as Tooltip2 } from "react-bootstrap";
import { Fragment as Fragment4, jsx as jsx20, jsxs as jsxs13 } from "react/jsx-runtime";
var UuidPill = ({ uuid, bg = "light", textColor = "dark", short = 8 }) => {
  const [copied, setCopied] = useState7(false);
  const ref = useRef3(null);
  const [showTooltip, setShowTooltip] = useState7(false);
  if (!uuid) return /* @__PURE__ */ jsx20("span", { className: "text-muted", children: "\u2014" });
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
  return /* @__PURE__ */ jsxs13(Fragment4, { children: [
    /* @__PURE__ */ jsxs13(
      Badge,
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
    /* @__PURE__ */ jsx20(Overlay, { target: ref.current, show: showTooltip, placement: "top", children: (props) => /* @__PURE__ */ jsx20(Tooltip2, { ...props, children: copied ? /* @__PURE__ */ jsx20("span", { style: { color: "#6f6" }, children: "Copiado!" }) : /* @__PURE__ */ jsxs13("span", { style: { fontFamily: "monospace", fontSize: "0.75rem" }, children: [
      uuid,
      /* @__PURE__ */ jsx20("br", {}),
      /* @__PURE__ */ jsx20("small", { className: "text-muted", children: "Clique para copiar" })
    ] }) }) })
  ] });
};
var UuidPill_default = UuidPill;

// src/displays/GenericDisplay.tsx
import React9, { useState as useState8, useEffect as useEffect3 } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Fragment as Fragment5, jsx as jsx21, jsxs as jsxs14 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs14(Container, { onClick, style: { ...styles }, children: [
      opn && /* @__PURE__ */ jsx21("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx21("strong", { children: opn }) }),
      obj.map((o, index) => {
        const mapCopy = [...newPropertiesMap, `[${index}]`];
        return /* @__PURE__ */ jsx21(Row, { style: { padding: 4, ...styles }, children: buildData(o, mapCopy, configObjects, null, true, null, false, editButtonRenderer) }, index);
      })
    ] });
  }
  if (typeof obj === "object" && obj != null) {
    return /* @__PURE__ */ jsxs14(
      Container,
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
          opn && /* @__PURE__ */ jsx21("strong", { children: opn }),
          Object.entries(obj).map(
            ([key, value]) => buildData(value, newPropertiesMap, configObjects, key, false, null, false, editButtonRenderer)
          ),
          extraComponents.length > 0 ? extraComponents.map((comp, i) => /* @__PURE__ */ jsx21(React9.Fragment, { children: comp() }, i)) : isRoot && editButtonRenderer ? editButtonRenderer(obj, opn) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs14(Col, { children: [
    /* @__PURE__ */ jsxs14("strong", { children: [
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
  const [innerOptions, setInnerOptions] = useState8();
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
  useEffect3(() => {
    if (onRefresh) {
      onRefresh(refreshFunc);
    } else {
      refreshFunc();
    }
  }, [context]);
  return /* @__PURE__ */ jsx21(Fragment5, { children: innerOptions && innerOptions.map((cObj, index) => /* @__PURE__ */ jsx21(Container, { style: { padding: 4, border: "solid" }, children: buildData(cObj, [], configObjects, rootName || null, false, null, true, editButtonRenderer) }, index)) });
};
var GenericDisplay_default = GenericDisplay;

// src/displays/BranchDropDisplay.tsx
import { useEffect as useEffect4, useRef as useRef4, useState as useState9 } from "react";
import { FaCheck, FaCheckSquare, FaSearch, FaChevronDown as FaChevronDown2 } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { pickTextColorBasedOnBgColorAdvanced } from "teraprox-core-sdk";
import { jsx as jsx22, jsxs as jsxs15 } from "react/jsx-runtime";
var BranchDropDisplay = ({
  branch,
  addBranch,
  multiMode,
  setMultiMode,
  onSaveRecurso,
  backOnBranch,
  branches,
  singleReturn
}) => {
  const [fontColor, setFontColor] = useState9("#000");
  const [searchTerm, setSearchTerm] = useState9("");
  const [show, setShow] = useState9(false);
  const [multiSelected, setMultiSelected] = useState9([]);
  const dropdownRef = useRef4(null);
  useEffect4(() => {
    setFontColor(
      pickTextColorBasedOnBgColorAdvanced(branch.branchLevel.color, "#FFFFFF", "#000000")
    );
  }, [branch.branchLevel.color]);
  useEffect4(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [backOnBranch, branch]);
  const handleItemClick = (bn) => {
    const rec = bn.recurso;
    if (multiMode) {
      setMultiSelected(
        (prev) => prev.some((r) => r.id === rec.id) ? prev.filter((r) => r.id !== rec.id) : [...prev, rec]
      );
    } else {
      onSaveRecurso([rec]);
      addBranch(bn);
      setShow(false);
    }
  };
  const startMulti = () => {
    setMultiSelected([]);
    setMultiMode(true);
    setShow(true);
  };
  const handleConfirm = () => {
    setMultiMode(false);
    onSaveRecurso(multiSelected);
    setMultiSelected([]);
    setShow(false);
  };
  const cancelMulti = () => {
    setMultiMode(false);
    setMultiSelected([]);
  };
  const isLastBranchClicked = () => branches.length > 0 && branches[branches.length - 1].id === branch.id;
  const visibleNodes = (branch.branchNodes || []).filter(
    (bn) => bn.recurso.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      ref: dropdownRef,
      style: {
        position: "relative",
        marginBottom: "0.5rem",
        width: "100%",
        fontFamily: "Arial, sans-serif"
      },
      children: [
        /* @__PURE__ */ jsxs15(
          "button",
          {
            onClick: () => setShow((s) => !s),
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${branch.branchLevel.color}`,
              background: branch.branchLevel.color,
              color: fontColor,
              cursor: "pointer",
              outline: "none",
              textAlign: "left",
              fontSize: "1rem"
            },
            children: [
              /* @__PURE__ */ jsxs15("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
                branch.nomeRecurso || branch.branchLevel.nome,
                branch.nomeRecurso && !multiMode && isLastBranchClicked() && /* @__PURE__ */ jsx22("em", { style: { fontStyle: "italic", opacity: 0.8, marginLeft: "0.5rem" }, children: "(Selecionado)" })
              ] }),
              /* @__PURE__ */ jsx22(FaChevronDown2, {})
            ]
          }
        ),
        show && /* @__PURE__ */ jsxs15(
          "div",
          {
            style: {
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "#f0f0f0",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
              marginTop: "0.25rem",
              zIndex: 100,
              maxHeight: "300px",
              overflow: "auto"
            },
            children: [
              /* @__PURE__ */ jsxs15(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                    borderBottom: "1px solid #ddd"
                  },
                  children: [
                    /* @__PURE__ */ jsx22(FaSearch, { style: { marginRight: "0.5rem", color: "#555" } }),
                    /* @__PURE__ */ jsx22(
                      "input",
                      {
                        type: "text",
                        placeholder: "Pesquisar recurso...",
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value),
                        style: {
                          flex: 1,
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "9999px",
                          outline: "none",
                          fontSize: "0.95rem"
                        }
                      }
                    )
                  ]
                }
              ),
              !multiMode && !singleReturn ? /* @__PURE__ */ jsxs15(
                "button",
                {
                  onClick: startMulti,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "9999px",
                    border: "none",
                    background: "#ffc107",
                    color: "#000",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    margin: "0.5rem 0"
                  },
                  children: [
                    /* @__PURE__ */ jsx22(FaCheckSquare, { style: { marginRight: "0.5rem" } }),
                    "Selecionar multiplos"
                  ]
                }
              ) : /* @__PURE__ */ jsxs15("div", { style: { display: "flex", gap: "0.5rem", margin: "0.5rem 0" }, children: [
                /* @__PURE__ */ jsxs15(
                  "button",
                  {
                    onClick: handleConfirm,
                    style: {
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.5rem",
                      borderRadius: "9999px",
                      border: "none",
                      background: "#28a745",
                      color: "#fff",
                      fontSize: "0.95rem",
                      cursor: "pointer"
                    },
                    children: [
                      /* @__PURE__ */ jsx22(FaCheck, { style: { marginRight: "0.5rem" } }),
                      "Confirmar selecao"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs15(
                  "button",
                  {
                    onClick: cancelMulti,
                    style: {
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.5rem",
                      borderRadius: "9999px",
                      border: "none",
                      background: "#6c757d",
                      color: "#fff",
                      fontSize: "0.95rem",
                      cursor: "pointer"
                    },
                    children: [
                      /* @__PURE__ */ jsx22(MdClose, { style: { marginRight: "0.5rem" } }),
                      "Cancelar"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx22("div", { style: { padding: "0.5rem" }, children: visibleNodes.map((bn) => {
                const selected = multiMode ? multiSelected.some((r) => r.id === bn.recurso.id) : false;
                return /* @__PURE__ */ jsxs15(
                  "div",
                  {
                    onClick: () => handleItemClick(bn),
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                      borderBottom: "1px solid #ddd",
                      background: selected ? "#e9ecef" : "transparent",
                      cursor: "pointer",
                      transition: "background 0.1s"
                    },
                    onMouseEnter: (e) => {
                      if (!selected) e.currentTarget.style.background = "#e2e6ea";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = selected ? "#e9ecef" : "transparent";
                    },
                    children: [
                      /* @__PURE__ */ jsx22("span", { children: bn.recurso.nome }),
                      selected && /* @__PURE__ */ jsx22(FaCheck, {})
                    ]
                  },
                  bn.recurso.id
                );
              }) })
            ]
          }
        )
      ]
    }
  );
};
var BranchDropDisplay_default = BranchDropDisplay;

// src/displays/RateLimitBar.tsx
import { useMemo } from "react";
import { jsx as jsx23, jsxs as jsxs16 } from "react/jsx-runtime";
function formatResetIn(windowReset) {
  const resetAt = new Date(windowReset).getTime();
  const remaining = Math.max(0, Math.round((resetAt - Date.now()) / 1e3));
  if (remaining <= 0) return "agora";
  if (remaining < 60) return `${remaining}s`;
  return `${Math.round(remaining / 60)}min`;
}
var RateLimitBar = ({ entry, label, className }) => {
  const pct = useMemo(() => {
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
  return /* @__PURE__ */ jsxs16("div", { style: containerStyle, className, children: [
    /* @__PURE__ */ jsxs16("div", { style: textStyle, children: [
      label && /* @__PURE__ */ jsx23("span", { children: label }),
      /* @__PURE__ */ jsxs16("span", { children: [
        entry.used,
        "/",
        entry.limit,
        " req",
        entry.exceeded ? " \u2014 limite atingido" : ` (reset em ${formatResetIn(entry.windowReset)})`
      ] })
    ] }),
    /* @__PURE__ */ jsx23("div", { style: barTrackStyle, children: /* @__PURE__ */ jsx23("div", { style: barFillStyle }) })
  ] });
};

// src/displays/StatusIndicator.tsx
import { jsx as jsx24, jsxs as jsxs17 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs17("div", { className: `status-flag ${status} ${containerClassName}`, children: [
    /* @__PURE__ */ jsx24("div", { className: "status-label", children: label }),
    /* @__PURE__ */ jsx24("div", { className: "status-count", children: count })
  ] });
};

// src/displays/VerticalItemsDisplay.tsx
import { jsx as jsx25, jsxs as jsxs18 } from "react/jsx-runtime";
var VerticalItemsDisplay = ({
  item1 = "",
  item2 = "",
  item3 = "",
  className = "",
  style
}) => {
  return /* @__PURE__ */ jsxs18("div", { className, style, children: [
    /* @__PURE__ */ jsx25("div", { children: item1 }),
    /* @__PURE__ */ jsx25("div", { children: item2 }),
    /* @__PURE__ */ jsx25("div", { children: item3 })
  ] });
};

// src/displays/StatusLight.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var StatusLight = ({
  active = false,
  activeLightColor = "green",
  inactiveLightColor = "gray",
  size = "20px",
  className = "",
  style
}) => {
  const color = active ? activeLightColor : inactiveLightColor;
  return /* @__PURE__ */ jsx26(
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
import dayjs2 from "dayjs";
import duration from "dayjs/plugin/duration";
import { BiTimer } from "react-icons/bi";
import { BsPause, BsPlay } from "react-icons/bs";
import { Fragment as Fragment6, jsx as jsx27, jsxs as jsxs19 } from "react/jsx-runtime";
dayjs2.extend(duration);
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
    const time = dayjs2.duration(seconds, "seconds");
    const days = Math.floor(time.asDays());
    const hours = time.hours().toString().padStart(2, "0");
    const minutes = time.minutes().toString().padStart(2, "0");
    const secondsRemaining = time.seconds().toString().padStart(2, "0");
    return days > 0 ? `${days}d ${hours}:${minutes}:${secondsRemaining}` : `${hours}:${minutes}:${secondsRemaining}`;
  };
  return /* @__PURE__ */ jsx27("div", { className: "timer-display-container", children: /* @__PURE__ */ jsx27("div", { className: "timer-display-content", children: id ? /* @__PURE__ */ jsxs19(Fragment6, { children: [
    /* @__PURE__ */ jsx27(
      BiTimer,
      {
        size: 24,
        className: "timer-icon",
        title: "Timer"
      }
    ),
    pausable && !isStopped && /* @__PURE__ */ jsx27(
      BsPause,
      {
        size: 20,
        className: "timer-icon-action",
        onClick: handlePause,
        title: "Pausar"
      }
    ),
    playable && !isStopped && /* @__PURE__ */ jsx27(
      BsPlay,
      {
        size: 20,
        className: "timer-icon-action",
        onClick: handlePlay,
        title: "Iniciar"
      }
    ),
    /* @__PURE__ */ jsx27("span", { className: "timer-display-time", children: formatDuration(tempo) })
  ] }) : /* @__PURE__ */ jsx27("span", { className: "timer-display-message", children: emptyMessage }) }) });
};

// src/displays/RecursoDisplayer.tsx
import { useEffect as useEffect7, useState as useState14 } from "react";
import { Button as Button11 } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHttpController as useHttpController2 } from "teraprox-core-sdk";
import { setLevels } from "teraprox-core-sdk";

// src/forms/FindRecursoByTagField.tsx
import { useState as useState13 } from "react";
import { GrCheckmark as GrCheckmark2 } from "react-icons/gr";
import { useHttpController } from "teraprox-core-sdk";

// src/forms/AutoComplete.tsx
import { useEffect as useEffect5, useMemo as useMemo2, useState as useState10 } from "react";
import { FloatingLabel, Form as Form5, InputGroup as InputGroup2, ListGroup as ListGroup2, Spinner as Spinner4 } from "react-bootstrap";
import { jsx as jsx28, jsxs as jsxs20 } from "react/jsx-runtime";
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
  lazyLoad = false
}) => {
  const [liItem, setListItem] = useState10([]);
  const [options, setOptions] = useState10([]);
  const [input, setInput] = useState10("");
  const [hide, setHide] = useState10(true);
  const [onLoaded, setOnLoaded] = useState10(false);
  const [loading, setLoading] = useState10(false);
  const cacheStore = useMemo2(() => {
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
  useEffect5(() => {
    setInput(value || "");
  }, [value]);
  useEffect5(() => {
    const sortedOptions = sortOptions(ops, sortKey);
    setListItem(sortedOptions);
    setOptions(sortedOptions);
  }, [ops, sortKey]);
  useEffect5(() => {
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
  return /* @__PURE__ */ jsxs20(
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
        !hideComponent && /* @__PURE__ */ jsxs20(InputGroup2, { children: [
          /* @__PURE__ */ jsx28(FloatingLabel, { controlId: "floatingInput", label: title, style: { zIndex: 0, flex: 1 }, children: /* @__PURE__ */ jsx28(
            Form5.Control,
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
          ) }),
          loading && /* @__PURE__ */ jsx28(InputGroup2.Text, { children: /* @__PURE__ */ jsx28(Spinner4, { animation: "border", size: "sm" }) }),
          !disableComponent && (actionButton == null ? void 0 : actionButton(() => setInput(""))),
          !disableComponent && (actionButton2 == null ? void 0 : actionButton2(input))
        ] }),
        /* @__PURE__ */ jsx28(
          ListGroup2,
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
            children: (maxItems ? liItem.slice(0, maxItems) : liItem).map((li, index) => /* @__PURE__ */ jsx28(
              ListGroup2.Item,
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

// src/qr/QrCodeScanButton.tsx
import { useState as useState12 } from "react";
import { BsQrCode } from "react-icons/bs";

// src/qr/QrReader.tsx
import QrScanner from "qr-scanner";
import { useEffect as useEffect6, useRef as useRef5, useState as useState11 } from "react";
import { jsx as jsx29, jsxs as jsxs21 } from "react/jsx-runtime";
var QrReader = ({ callback }) => {
  const scanner = useRef5(null);
  const videoEl = useRef5(null);
  const qrBoxEl = useRef5(null);
  const [qrOn, setQrOn] = useState11(true);
  const [scannedResult, setScannedResult] = useState11("");
  const onScanSuccess = (result) => {
    setScannedResult(result.data);
    callback(result.data);
  };
  const onScanFail = (err) => {
    if (typeof err === "string" && !err.includes("No QR code found")) {
      console.error("QR Scanner Error:", err);
    }
  };
  useEffect6(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
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
  useEffect6(() => {
    if (!qrOn) {
      alert(
        "C\xE2mera est\xE1 bloqueada ou inacess\xEDvel. Por favor, habilite a c\xE2mera nas permiss\xF5es do seu navegador e recarregue a p\xE1gina."
      );
    }
  }, [qrOn]);
  return /* @__PURE__ */ jsxs21("div", { className: "qr-reader", style: { position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx29("video", { ref: videoEl, style: { width: "100%", borderRadius: "8px" } }),
    /* @__PURE__ */ jsx29("div", { ref: qrBoxEl, className: "qr-box" }),
    scannedResult && /* @__PURE__ */ jsxs21(
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
import { jsx as jsx30, jsxs as jsxs22 } from "react/jsx-runtime";
var QrCodeScanButton = ({ callback, size = 25 }) => {
  const [showQr, setShowQr] = useState12(false);
  const toggleQr = () => {
    setShowQr((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs22(
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
        /* @__PURE__ */ jsx30(BsQrCode, { size }),
        showQr && /* @__PURE__ */ jsx30(
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
            children: /* @__PURE__ */ jsxs22("div", { style: { width: "100%", maxWidth: "500px", backgroundColor: "#fff", borderRadius: "12px", padding: "20px", position: "relative" }, children: [
              /* @__PURE__ */ jsx30(
                "div",
                {
                  onClick: toggleQr,
                  style: { position: "absolute", top: "10px", right: "15px", fontSize: "1.5rem", cursor: "pointer", zIndex: 10001 },
                  children: "\xD7"
                }
              ),
              /* @__PURE__ */ jsx30("h5", { className: "mb-3 text-center", children: "Escaneie o QR Code" }),
              /* @__PURE__ */ jsx30(
                QrReader,
                {
                  callback: (v) => {
                    toggleQr();
                    callback(v);
                  }
                }
              ),
              /* @__PURE__ */ jsx30("p", { className: "mt-3 text-muted text-center small", children: "Aponte a c\xE2mera para o c\xF3digo" })
            ] })
          }
        )
      ]
    }
  );
};

// src/forms/FindRecursoByTagField.tsx
import { jsx as jsx31 } from "react/jsx-runtime";
var FindRecursoByTagField = ({ callback, recursoController }) => {
  const recursoControllerPadrao = useHttpController("recurso");
  const controladorAtivo = recursoController != null ? recursoController : {
    read: recursoControllerPadrao.read.bind(recursoControllerPadrao),
    get: recursoControllerPadrao.get.bind(recursoControllerPadrao)
  };
  const [selectedTag, setSelectedTag] = useState13("");
  const [reachedRecurso, setReachedRecurso] = useState13(null);
  const findRecursoByTagIdHandler = async (tagId) => {
    try {
      const r = await controladorAtivo.read("findRecursoByTagId", tagId);
      setReachedRecurso(r);
    } catch (error) {
      console.error("Erro ao buscar recurso por tag ID:", error);
    }
  };
  const findRecursoByTagDescriptionHandler = async (description) => {
    try {
      const formattedDescription = description.replace(/\s/g, "");
      const recurso = await controladorAtivo.read(
        `recurso/findByTagDescription`,
        formattedDescription
      );
      if (!callback) {
        console.log("Recurso encontrado (sem callback):", recurso);
      } else {
        callback(recurso, true);
      }
    } catch (error) {
      console.error("Erro ao buscar recurso por descri\xE7\xE3o de tag:", error);
    }
  };
  const confirmRecursoSelectionButton = () => {
    return /* @__PURE__ */ jsx31(
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
        children: /* @__PURE__ */ jsx31(
          GrCheckmark2,
          {
            size: 25,
            onClick: () => reachedRecurso && callback(reachedRecurso, true)
          }
        )
      }
    );
  };
  return /* @__PURE__ */ jsx31("div", { children: /* @__PURE__ */ jsx31(
    AutoComplete,
    {
      sortKey: "id",
      loadCondition: true,
      loadFunc: () => controladorAtivo.get("findActiveRecursosTags"),
      displayKey: "descricao",
      title: "Selecione ou Digite a TAG",
      actionButton: confirmRecursoSelectionButton,
      actionButton2: () => /* @__PURE__ */ jsx31(
        QrCodeScanButton,
        {
          callback: (description) => findRecursoByTagDescriptionHandler(description)
        }
      ),
      onSelectedClick: (v) => {
        setSelectedTag(v);
        findRecursoByTagIdHandler(v.id);
      },
      value: (selectedTag == null ? void 0 : selectedTag.descricao) || ""
    }
  ) });
};

// src/displays/RecursoDisplayer.tsx
import { jsx as jsx32, jsxs as jsxs23 } from "react/jsx-runtime";
var RecursoDisplayer = ({
  selectedList = [],
  onSaveRecurso,
  singleReturn = false,
  arvoreEstruturalController: injectedArvore,
  branchLevelController: injectedBranchLevel,
  recursoController: injectedRecurso
}) => {
  void selectedList;
  const defaultArvore = useHttpController2("");
  const defaultBranchLevel = useHttpController2("branchLevel");
  const arvoreEstruturalController = injectedArvore || defaultArvore;
  const branchLevelController = injectedBranchLevel || defaultBranchLevel;
  const [branches, setBranches] = useState14([]);
  const dispatch = useDispatch();
  const [selectorDisplay, setSelectorDisplay] = useState14("");
  const [multiMode, setMultiMode] = useState14(false);
  useEffect7(() => {
    const init = async () => {
      const b = await arvoreEstruturalController.get("branchByBranchLevel/1");
      setBranches(b);
      const lv = await branchLevelController.readAll();
      dispatch(setLevels(lv));
    };
    init();
  }, []);
  const branchSetter = async (bn) => {
    var _a, _b, _c, _d;
    const parentBranch = branches.find((b) => b.id === bn.branchId);
    const currentLevel = (_b = (_a = parentBranch == null ? void 0 : parentBranch.branchLevel) == null ? void 0 : _a.level) != null ? _b : 1;
    const branchsToStay = branches.filter((b) => b.branchLevel.level <= currentLevel).map(
      (b) => b.branchLevel.level === currentLevel ? { ...b, nomeRecurso: bn.recurso.nome } : b
    );
    const nextBranchId = (_d = bn.recurso.branchId) != null ? _d : (_c = bn.recurso.branch) == null ? void 0 : _c.id;
    if (nextBranchId) {
      try {
        const nextBranch = await arvoreEstruturalController.read("branch", nextBranchId);
        if (nextBranch && nextBranch.branchLevel) {
          branchsToStay.push(nextBranch);
        }
      } catch (e) {
        console.warn("[RecursoDisplayer] Failed to fetch child branch:", e);
      }
    }
    setBranches([...branchsToStay]);
  };
  const backOnBranch = (branch) => {
    const branchsToStay = branches.filter(
      (bArray) => bArray.branchLevel.level <= branch.branchLevel.level
    );
    setBranches(branchsToStay);
  };
  return /* @__PURE__ */ jsxs23("div", { style: { width: "100%", padding: 0 }, className: "recurso-displayer-generic", children: [
    /* @__PURE__ */ jsx32("div", { className: "d-flex justify-content-between align-items-center mb-3", children: /* @__PURE__ */ jsxs23("div", { children: [
      /* @__PURE__ */ jsx32("label", { className: "me-2", children: "Selecionar Recurso Por:" }),
      /* @__PURE__ */ jsx32(
        Button11,
        {
          size: "sm",
          onClick: () => setSelectorDisplay("branch"),
          variant: selectorDisplay === "branch" ? "primary" : "outline-primary",
          className: "me-1",
          children: "Arvore"
        }
      ),
      /* @__PURE__ */ jsx32(
        Button11,
        {
          size: "sm",
          onClick: () => setSelectorDisplay("TAG"),
          variant: selectorDisplay === "TAG" ? "primary" : "outline-primary",
          children: "TAG"
        }
      )
    ] }) }),
    selectorDisplay === "branch" && branches.map((branch, i) => /* @__PURE__ */ jsx32(
      BranchDropDisplay_default,
      {
        branch,
        addBranch: branchSetter,
        multiMode,
        setMultiMode,
        onSaveRecurso,
        backOnBranch,
        branches,
        singleReturn
      },
      branch.id || i
    )),
    selectorDisplay === "TAG" && /* @__PURE__ */ jsx32(
      FindRecursoByTagField,
      {
        recursoController: injectedRecurso,
        callback: (rec, checked) => {
          onSaveRecurso([rec], checked);
        }
      }
    )
  ] });
};

// src/filters/StatusPills.tsx
import { jsx as jsx33, jsxs as jsxs24 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx33("div", { className: `status-pills-container ${className}`, children: Object.entries(statuses).map(([key, meta]) => {
    const isActive = activeKeys.includes(key);
    return /* @__PURE__ */ jsxs24(
      "button",
      {
        type: "button",
        className: `status-pill ${isActive ? "active" : ""}`,
        style: { "--status-color": meta.color },
        onClick: () => toggleKey(key),
        "aria-pressed": isActive,
        children: [
          /* @__PURE__ */ jsx33("span", { className: "status-pill__swatch" }),
          /* @__PURE__ */ jsx33("span", { className: "status-pill__label", children: meta.label }),
          meta.count !== void 0 && /* @__PURE__ */ jsx33("span", { className: "status-pill__count", children: meta.count })
        ]
      },
      key
    );
  }) });
};

// src/filters/PeriodSelector.tsx
import { useState as useState15 } from "react";
import { Card as Card2, Form as Form6, Button as Button12 } from "react-bootstrap";
import { FaCalendarAlt, FaChevronUp, FaHistory } from "react-icons/fa";
import dayjs3 from "dayjs";
import { jsx as jsx34, jsxs as jsxs25 } from "react/jsx-runtime";
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
  const [isExpanded, setIsExpanded] = useState15(false);
  const formatDisplayRange = (start, end) => {
    const s = dayjs3(start).format("DD/MM/YY HH:mm");
    const e = dayjs3(end).format("DD/MM/YY HH:mm");
    return `${s} at\xE9 ${e}`;
  };
  const maxDate = allowFuture ? void 0 : dayjs3().format("YYYY-MM-DDTHH:mm");
  const presets = [
    { key: "today", label: "Hoje" },
    { key: "week", label: "\xDAltima Semana" },
    { key: "fortnight", label: "Quinzena" },
    { key: "month", label: "\xDAltimo M\xEAs" },
    { key: "year", label: "\xDAltimo Ano" }
  ];
  return /* @__PURE__ */ jsxs25(Card2, { className: `period-selector-card ${isExpanded ? "expanded" : ""} ${className}`, children: [
    /* @__PURE__ */ jsxs25("div", { className: "compact-row", onClick: () => setIsExpanded(!isExpanded), children: [
      /* @__PURE__ */ jsxs25("div", { className: "d-flex align-items-center", children: [
        /* @__PURE__ */ jsx34(FaCalendarAlt, { className: "me-2 text-primary" }),
        /* @__PURE__ */ jsx34("span", { className: "date-range-text", children: isExpanded ? label : formatDisplayRange(startDate, endDate) })
      ] }),
      /* @__PURE__ */ jsx34("div", { className: "period-icon-btn", children: isExpanded ? /* @__PURE__ */ jsx34(FaChevronUp, {}) : /* @__PURE__ */ jsx34("span", { className: "small text-muted", children: "Editar" }) })
    ] }),
    isExpanded && /* @__PURE__ */ jsxs25("div", { className: "expanded-content", children: [
      onPresetSelect && /* @__PURE__ */ jsxs25("div", { className: "presets-container", children: [
        /* @__PURE__ */ jsxs25("div", { className: "d-flex align-items-center mb-1 w-100", children: [
          /* @__PURE__ */ jsx34(FaHistory, { size: 12, className: "me-1 text-muted" }),
          /* @__PURE__ */ jsx34("small", { className: "text-muted fw-bold text-uppercase", style: { fontSize: "0.65rem" }, children: "Atalhos" })
        ] }),
        presets.map((p) => /* @__PURE__ */ jsx34(
          Button12,
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
      /* @__PURE__ */ jsxs25("div", { className: "date-inputs-grid", children: [
        /* @__PURE__ */ jsxs25(Form6.Group, { children: [
          /* @__PURE__ */ jsx34(Form6.Label, { className: "small text-muted", children: "In\xEDcio" }),
          /* @__PURE__ */ jsx34(
            Form6.Control,
            {
              type: "datetime-local",
              size: "sm",
              value: startDate,
              max: maxDate,
              onChange: (e) => onStartDateChange(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs25(Form6.Group, { children: [
          /* @__PURE__ */ jsx34(Form6.Label, { className: "small text-muted", children: "Fim" }),
          /* @__PURE__ */ jsx34(
            Form6.Control,
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
      /* @__PURE__ */ jsx34("div", { className: "mt-3 d-flex justify-content-end", children: /* @__PURE__ */ jsx34(
        Button12,
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
import { useState as useState16 } from "react";
import { Collapse, Button as Button13 } from "react-bootstrap";
import { FiFilter, FiChevronDown, FiChevronUp, FiTrash2 as FiTrash22 } from "react-icons/fi";
import { jsx as jsx35, jsxs as jsxs26 } from "react/jsx-runtime";
var AdvancedFilterBar = ({
  children,
  title = "Filtros e Busca",
  activeFiltersCount = 0,
  onClearAll,
  defaultExpanded = false,
  className = ""
}) => {
  const [expanded, setExpanded] = useState16(defaultExpanded);
  return /* @__PURE__ */ jsxs26("div", { className: `advanced-filter-bar ${className}`, children: [
    /* @__PURE__ */ jsxs26(
      "div",
      {
        className: "filter-bar-header",
        onClick: () => setExpanded(!expanded),
        children: [
          /* @__PURE__ */ jsxs26("div", { className: "filter-title-group", children: [
            /* @__PURE__ */ jsx35(FiFilter, { className: "text-primary" }),
            /* @__PURE__ */ jsx35("h5", { className: "filter-title", children: title }),
            activeFiltersCount > 0 && /* @__PURE__ */ jsxs26("span", { className: "filter-count-badge", children: [
              activeFiltersCount,
              " ativos"
            ] })
          ] }),
          /* @__PURE__ */ jsx35("div", { className: "filter-chevron", children: expanded ? /* @__PURE__ */ jsx35(FiChevronUp, { size: 20 }) : /* @__PURE__ */ jsx35(FiChevronDown, { size: 20 }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx35(Collapse, { in: expanded, children: /* @__PURE__ */ jsx35("div", { children: /* @__PURE__ */ jsxs26("div", { className: "filter-bar-content", children: [
      /* @__PURE__ */ jsx35("div", { className: "filter-grid", children }),
      (onClearAll || activeFiltersCount > 0) && /* @__PURE__ */ jsxs26("div", { className: "filter-actions", children: [
        onClearAll && /* @__PURE__ */ jsxs26(
          Button13,
          {
            variant: "link",
            className: "text-danger text-decoration-none btn-sm d-flex align-items-center",
            onClick: (e) => {
              e.stopPropagation();
              onClearAll();
            },
            children: [
              /* @__PURE__ */ jsx35(FiTrash22, { className: "me-1" }),
              "Limpar Filtros"
            ]
          }
        ),
        /* @__PURE__ */ jsx35(
          Button13,
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

// src/forms/MailSender.tsx
import { useState as useState17 } from "react";
import {
  Button as Button14,
  Card as Card3,
  Col as Col3,
  Form as Form7,
  Row as Row3,
  Spinner as Spinner5,
  Badge as Badge2,
  InputGroup as InputGroup3
} from "react-bootstrap";
import { FiMail, FiSearch, FiUser, FiX, FiPlus, FiSend } from "react-icons/fi";
import { Fragment as Fragment7, jsx as jsx36, jsxs as jsxs27 } from "react/jsx-runtime";
var MailSender = ({
  htmlContent,
  companyName,
  onFetchEmails,
  onSendEmail,
  hide = false,
  renderTrigger
}) => {
  const [opened, setOpened] = useState17(false);
  const [addingEmail, setAddingEmail] = useState17(false);
  const [selectedEmails, setSelectedEmails] = useState17([]);
  const [emails, setEmails] = useState17([]);
  const [loading, setLoading] = useState17(false);
  const [postLoading, setPostLoading] = useState17(false);
  const [customEmail, setCustomEmail] = useState17("");
  const [emailError, setEmailError] = useState17("");
  const [searchFilter, setSearchFilter] = useState17("");
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
    return /* @__PURE__ */ jsx36(Button14, { disabled: loading, className: "w-100", onClick: handleOpen, children: loading ? "Carregando..." : "Enviar por E-mail" });
  }
  return /* @__PURE__ */ jsxs27(
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
        /* @__PURE__ */ jsx36(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              color: "white",
              padding: "25px"
            },
            children: /* @__PURE__ */ jsxs27("div", { className: "d-flex justify-content-between align-items-center", children: [
              /* @__PURE__ */ jsxs27("div", { children: [
                /* @__PURE__ */ jsxs27("h4", { className: "mb-1", style: { fontWeight: "600", fontSize: "22px" }, children: [
                  /* @__PURE__ */ jsx36(FiMail, { className: "me-2", size: 20 }),
                  "Enviar Relat\xF3rio por E-mail"
                ] }),
                /* @__PURE__ */ jsxs27("small", { style: { opacity: "0.9", fontSize: "14px" }, children: [
                  "Selecione os destinat\xE1rios para envio do relat\xF3rio de ",
                  companyName
                ] })
              ] }),
              /* @__PURE__ */ jsxs27("div", { className: "d-flex gap-2", children: [
                /* @__PURE__ */ jsx36(
                  Button14,
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
                    children: postLoading ? /* @__PURE__ */ jsxs27(Fragment7, { children: [
                      /* @__PURE__ */ jsx36(Spinner5, { size: "sm", className: "me-2" }),
                      "Enviando..."
                    ] }) : /* @__PURE__ */ jsxs27(Fragment7, { children: [
                      /* @__PURE__ */ jsx36(FiSend, { className: "me-2", size: 14 }),
                      "Enviar E-mail"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx36(
                  Button14,
                  {
                    variant: "outline-light",
                    onClick: () => setOpened(false),
                    disabled: postLoading,
                    style: { borderRadius: "8px", width: "40px", height: "40px" },
                    children: /* @__PURE__ */ jsx36(FiX, { size: 16 })
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs27("div", { style: { padding: "25px" }, children: [
          /* @__PURE__ */ jsx36(Card3, { className: "mb-4", style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ jsxs27(Card3.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ jsxs27(Row3, { className: "align-items-center", children: [
              /* @__PURE__ */ jsxs27(Col3, { md: 6, children: [
                /* @__PURE__ */ jsx36("h6", { className: "mb-2", style: { color: "#495057", fontWeight: "600" }, children: "\u{1F527} Filtros e A\xE7\xF5es" }),
                /* @__PURE__ */ jsxs27(InputGroup3, { style: { maxWidth: "300px" }, children: [
                  /* @__PURE__ */ jsx36(InputGroup3.Text, { style: { backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }, children: /* @__PURE__ */ jsx36(FiSearch, { size: 14, color: "#6c757d" }) }),
                  /* @__PURE__ */ jsx36(
                    Form7.Control,
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
              /* @__PURE__ */ jsx36(Col3, { md: 6, className: "text-end", children: /* @__PURE__ */ jsx36(
                Button14,
                {
                  variant: addingEmail ? "outline-secondary" : "outline-primary",
                  size: "sm",
                  onClick: () => setAddingEmail(!addingEmail),
                  disabled: postLoading,
                  style: { borderRadius: "8px" },
                  children: addingEmail ? /* @__PURE__ */ jsxs27(Fragment7, { children: [
                    /* @__PURE__ */ jsx36(FiX, { className: "me-1", size: 14 }),
                    "Cancelar"
                  ] }) : /* @__PURE__ */ jsxs27(Fragment7, { children: [
                    /* @__PURE__ */ jsx36(FiPlus, { className: "me-1", size: 14 }),
                    "E-mail Personalizado"
                  ] })
                }
              ) })
            ] }),
            addingEmail && /* @__PURE__ */ jsxs27(
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
                  /* @__PURE__ */ jsx36("h6", { className: "mb-3", style: { color: "#1976d2", fontWeight: "600" }, children: "\u2709\uFE0F Adicionar E-mail Personalizado" }),
                  /* @__PURE__ */ jsxs27(Row3, { className: "align-items-end", children: [
                    /* @__PURE__ */ jsxs27(Col3, { md: 8, children: [
                      /* @__PURE__ */ jsx36(Form7.Label, { style: { fontSize: "13px", color: "#6c757d", fontWeight: "500" }, children: "Endere\xE7o de E-mail" }),
                      /* @__PURE__ */ jsx36(
                        Form7.Control,
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
                      /* @__PURE__ */ jsx36(Form7.Control.Feedback, { type: "invalid", children: emailError })
                    ] }),
                    /* @__PURE__ */ jsx36(Col3, { md: 4, children: /* @__PURE__ */ jsxs27(
                      Button14,
                      {
                        variant: "success",
                        onClick: handleEmailAdd,
                        disabled: postLoading,
                        style: { borderRadius: "8px", width: "100%" },
                        children: [
                          /* @__PURE__ */ jsx36(FiPlus, { className: "me-1", size: 14 }),
                          "Adicionar"
                        ]
                      }
                    ) })
                  ] })
                ]
              }
            )
          ] }) }),
          selectedEmails.length > 0 && /* @__PURE__ */ jsx36(Card3, { className: "mb-4", style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ jsxs27(Card3.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ jsxs27("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [
              /* @__PURE__ */ jsx36("h6", { className: "mb-0", style: { color: "#495057", fontWeight: "600" }, children: "\u{1F4CB} Destinat\xE1rios Selecionados" }),
              /* @__PURE__ */ jsxs27(Badge2, { bg: "primary", style: { fontSize: "12px", padding: "6px 12px" }, children: [
                selectedEmails.length,
                " selecionado",
                selectedEmails.length > 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsx36("div", { className: "d-flex flex-wrap gap-2", children: selectedEmails.map((email, index) => /* @__PURE__ */ jsxs27(
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
                  /* @__PURE__ */ jsx36(FiUser, { size: 12, className: "me-2", color: "#1976d2" }),
                  /* @__PURE__ */ jsx36("span", { children: email.email || email }),
                  /* @__PURE__ */ jsx36(
                    Button14,
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
                      children: /* @__PURE__ */ jsx36(FiX, { size: 14 })
                    }
                  )
                ]
              },
              index
            )) })
          ] }) }),
          /* @__PURE__ */ jsx36(Card3, { style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ jsxs27(Card3.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ jsxs27("h6", { className: "mb-3", style: { color: "#495057", fontWeight: "600" }, children: [
              /* @__PURE__ */ jsx36(FiUser, { className: "me-2", size: 16 }),
              "E-mails de ",
              companyName
            ] }),
            loading ? /* @__PURE__ */ jsxs27("div", { className: "text-center py-4", children: [
              /* @__PURE__ */ jsx36(Spinner5, {}),
              /* @__PURE__ */ jsx36("p", { className: "mt-2 text-muted", children: "Carregando e-mails..." })
            ] }) : filteredEmails.length === 0 ? /* @__PURE__ */ jsx36("div", { className: "text-center py-4", children: /* @__PURE__ */ jsx36("p", { className: "text-muted mb-0", children: searchFilter ? "Nenhum e-mail encontrado com esse filtro" : "Nenhum e-mail dispon\xEDvel" }) }) : /* @__PURE__ */ jsx36(Row3, { children: filteredEmails.map((email) => /* @__PURE__ */ jsx36(Col3, { xs: 12, sm: 6, lg: 4, className: "mb-3", children: /* @__PURE__ */ jsx36(
              Card3,
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
                children: /* @__PURE__ */ jsxs27(Card3.Body, { style: { padding: "15px", textAlign: "center" }, children: [
                  /* @__PURE__ */ jsx36(FiMail, { size: 20, color: "#007bff", className: "mb-2" }),
                  /* @__PURE__ */ jsx36(
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

// src/forms/GenericForm.tsx
import { useState as useState18 } from "react";
import { Button as Button15, Form as Form8 } from "react-bootstrap";
import { jsx as jsx37, jsxs as jsxs28 } from "react/jsx-runtime";
var GenericForm = ({ fields, onSubmit, renderCustomSelect }) => {
  const [formValues, setFormValues] = useState18({});
  const [errors, setErrors] = useState18({});
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
        return /* @__PURE__ */ jsxs28(Form8.Group, { className: "mb-3", children: [
          /* @__PURE__ */ jsx37(Form8.Label, { children: label }),
          /* @__PURE__ */ jsx37(
            Form8.Control,
            {
              type,
              placeholder,
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key]
            }
          ),
          /* @__PURE__ */ jsx37(Form8.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      case "select": {
        const orderedOptions = (options || []).filter((opt) => opt && opt.value !== void 0 && opt.label !== void 0).sort((a, b) => a.label.localeCompare(b.label));
        return /* @__PURE__ */ jsxs28(Form8.Group, { className: "mb-3", children: [
          /* @__PURE__ */ jsx37(Form8.Label, { children: label }),
          /* @__PURE__ */ jsxs28(
            Form8.Select,
            {
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key],
              children: [
                /* @__PURE__ */ jsx37("option", { value: "", children: "Selecione..." }),
                orderedOptions.map((option) => /* @__PURE__ */ jsx37("option", { value: option.value, children: option.label }, String(option.value)))
              ]
            }
          ),
          /* @__PURE__ */ jsx37(Form8.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      }
      case "custom-select":
        if (renderCustomSelect) {
          return /* @__PURE__ */ jsxs28("div", { children: [
            renderCustomSelect({
              label,
              value,
              options,
              onChange: (v) => handleChange(key, v),
              placeholder
            }),
            errors[key] && /* @__PURE__ */ jsx37("div", { className: "invalid-feedback d-block", children: errors[key] })
          ] }, key);
        }
        return null;
      case "date":
        return /* @__PURE__ */ jsxs28(Form8.Group, { className: "mb-3", children: [
          /* @__PURE__ */ jsx37(Form8.Label, { children: label }),
          /* @__PURE__ */ jsx37(
            Form8.Control,
            {
              type: "date",
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key]
            }
          ),
          /* @__PURE__ */ jsx37(Form8.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs28(Form8, { onSubmit: handleSubmit, children: [
    fields.map((field) => renderField(field)),
    /* @__PURE__ */ jsx37("div", { className: "d-grid", children: /* @__PURE__ */ jsx37(Button15, { variant: "primary", type: "submit", children: "Salvar" }) })
  ] });
};
var GenericForm_default = GenericForm;

// src/forms/GenericSelect.tsx
import { useEffect as useEffect8, useState as useState19 } from "react";
import { Form as Form9, InputGroup as InputGroup4 } from "react-bootstrap";
import { Fragment as Fragment8, jsx as jsx38, jsxs as jsxs29 } from "react/jsx-runtime";
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
  const [options, setOptions] = useState19(ops || []);
  useEffect8(() => {
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
  const selectContent = /* @__PURE__ */ jsxs29(
    Form9.Control,
    {
      disabled: locked,
      as: "select",
      value: selection,
      onChange: (event) => getTrueValue(event.target.selectedIndex),
      children: [
        /* @__PURE__ */ jsxs29("option", { value: void 0, children: [
          "-- ",
          defaultPlaceholder,
          " --"
        ] }, 0),
        (options == null ? void 0 : options.length) > 0 && options.map((op, index) => {
          const val = valueType && op[valueType] || op.id || op;
          let fill = displayType && op[displayType] || op;
          if (typeof fill == "object") fill = "";
          return /* @__PURE__ */ jsx38("option", { value: val, children: fill }, op.id || index);
        })
      ]
    }
  );
  if (actionClick) {
    return /* @__PURE__ */ jsxs29(Fragment8, { children: [
      /* @__PURE__ */ jsx38(Form9.Label, { style: { fontWeight: isBold ? "bold" : void 0 }, hidden: noLabel, children: title }),
      /* @__PURE__ */ jsxs29(InputGroup4, { children: [
        selectContent,
        actionClick()
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs29(Fragment8, { children: [
    /* @__PURE__ */ jsx38(Form9.Label, { style: { fontWeight: isBold ? "bold" : void 0 }, hidden: noLabel, children: title }),
    selectContent
  ] });
};
var GenericSelect_default = GenericSelect;

// src/forms/FormField.tsx
import { FloatingLabel as FloatingLabel2, Form as Form10, InputGroup as InputGroup5 } from "react-bootstrap";
import { jsx as jsx39, jsxs as jsxs30 } from "react/jsx-runtime";
var FormField = ({
  val,
  onValueUpdate,
  onBlur,
  label,
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
    return /* @__PURE__ */ jsx39(Form10.Control, { ...fieldProps });
  };
  if (hide) return null;
  return /* @__PURE__ */ jsxs30(
    Form10.Group,
    {
      onFocusCapture: (e) => onFocusHandler(e.target.value),
      onMouseLeave: onMouseLv,
      onKeyDown: onKeyDownHandler,
      style: { marginTop: 4, marginBottom: 4, width: "100%" },
      children: [
        /* @__PURE__ */ jsxs30(InputGroup5, { children: [
          asTextArea ? renderField() : /* @__PURE__ */ jsx39(FloatingLabel2, { style: { zIndex: 0, flex: 1 }, label, controlId: controlId || "floatingInput", children: renderField() }),
          actionClick && actionClick(),
          actionClick2 && actionClick2()
        ] }),
        feedback && isInvalid && /* @__PURE__ */ jsx39(Form10.Control.Feedback, { type: "invalid", style: { display: "block" }, children: feedback })
      ]
    }
  );
};

// src/forms/ClickToWriteField.tsx
import { useState as useState20, useEffect as useEffect9, useRef as useRef6 } from "react";
import { Button as Button16 } from "react-bootstrap";
import { jsx as jsx40, jsxs as jsxs31 } from "react/jsx-runtime";
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
  const [showClick, setShowClick] = useState20(false);
  const inputRef = useRef6(null);
  useEffect9(() => {
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
  return /* @__PURE__ */ jsxs31("div", { style: { display: "flex", width: "100%", margin: 0, padding: 0 }, children: [
    !showClick && /* @__PURE__ */ jsx40(
      Button16,
      {
        style: { flexGrow: 1 },
        onClick: handleShowClick,
        ...buttonProps,
        children: resolveButtonDisplay()
      }
    ),
    showClick && /* @__PURE__ */ jsx40(
      FormField,
      {
        reference: inputRef,
        others: { ...fieldProps, onKeyUp: closeOnEscape },
        hide: !showClick,
        ty: fieldType,
        label: fieldLabel,
        onValueUpdate: onFieldValueUpdate,
        onBlur: () => setShowClick(false),
        actionClick: () => enableFieldActionButton ? /* @__PURE__ */ jsx40(
          Button16,
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
import { Card as Card4, Form as Form11, Row as Row4, Col as Col4 } from "react-bootstrap";
import { FaPalette } from "react-icons/fa";
import { jsx as jsx41, jsxs as jsxs32 } from "react/jsx-runtime";
var ColorPicker = ({
  selectedColor,
  onColorChange,
  presetColors = ["#ff0000", "#ffd700", "#008000", "#0000ff", "#800080"],
  title = "Cor de Identifica\xE7\xE3o"
}) => {
  return /* @__PURE__ */ jsxs32(
    Card4,
    {
      className: "shadow-sm border-primary-hover mb-3",
      style: { maxWidth: "320px", transition: "0.3s" },
      children: [
        /* @__PURE__ */ jsxs32(Card4.Header, { className: "bg-light d-flex align-items-center", children: [
          /* @__PURE__ */ jsx41(FaPalette, { className: "me-2 text-primary" }),
          /* @__PURE__ */ jsx41("span", { className: "fw-medium", children: title })
        ] }),
        /* @__PURE__ */ jsxs32(Card4.Body, { children: [
          /* @__PURE__ */ jsxs32(Row4, { className: "g-3 align-items-center mb-3", children: [
            /* @__PURE__ */ jsx41(Col4, { xs: "auto", children: /* @__PURE__ */ jsx41(
              "div",
              {
                className: "rounded-circle shadow-sm border",
                style: {
                  width: "40px",
                  height: "40px",
                  backgroundColor: selectedColor,
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
            /* @__PURE__ */ jsx41(Col4, { children: /* @__PURE__ */ jsx41(
              Form11.Control,
              {
                type: "color",
                id: "color-input-hidden",
                value: selectedColor,
                onChange: (e) => onColorChange(e.target.value),
                className: "form-control-color-lg",
                style: { width: "100%", height: "40px", cursor: "pointer" }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx41(Row4, { className: "g-2 justify-content-start", children: presetColors.map((cor) => /* @__PURE__ */ jsx41(Col4, { xs: "auto", children: /* @__PURE__ */ jsx41(
            "div",
            {
              className: "rounded-1 shadow-sm",
              style: {
                width: "28px",
                height: "28px",
                backgroundColor: cor,
                cursor: "pointer",
                border: cor.toLowerCase() === selectedColor.toLowerCase() ? "2px solid #0d6efd" : "1px solid #dee2e6"
              },
              onClick: () => onColorChange(cor)
            }
          ) }, cor)) })
        ] })
      ]
    }
  );
};

// src/forms/Switch.tsx
import { Form as Form12 } from "react-bootstrap";
import { jsx as jsx42 } from "react/jsx-runtime";
var Switch = ({
  label,
  onSwitchChange,
  value,
  disabled = false,
  defaultChecked,
  ...props
}) => {
  return /* @__PURE__ */ jsx42(
    Form12.Check,
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
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import { Fragment as Fragment9, jsx as jsx43, jsxs as jsxs33 } from "react/jsx-runtime";
var UploadArea = ({
  onFilePut,
  anexo,
  accept = { "image/jpeg": [], "image/png": [] },
  maxSize = 50 * 1024 * 1024
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && typeof onFilePut === "function") {
        onFilePut(file);
      }
    },
    [onFilePut]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept
  });
  const hasAnexo = Boolean(anexo);
  return /* @__PURE__ */ jsxs33(
    "div",
    {
      ...getRootProps(),
      className: `upload-area 
				${isDragActive ? "drag-active" : ""} 
				${hasAnexo ? "upload-has-file" : ""}
			`,
      children: [
        /* @__PURE__ */ jsx43("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs33("div", { className: "upload-content", children: [
          /* @__PURE__ */ jsx43("span", { className: "upload-icon", children: hasAnexo ? /* @__PURE__ */ jsx43(FiCheckCircle, { size: 24 }) : /* @__PURE__ */ jsx43(FiUploadCloud, { size: 24 }) }),
          hasAnexo ? /* @__PURE__ */ jsxs33(Fragment9, { children: [
            /* @__PURE__ */ jsx43("p", { className: "upload-link", children: "Arquivo anexado" }),
            /* @__PURE__ */ jsx43("p", { className: "upload-info", children: anexo == null ? void 0 : anexo.name })
          ] }) : /* @__PURE__ */ jsxs33(Fragment9, { children: [
            /* @__PURE__ */ jsxs33("p", { children: [
              /* @__PURE__ */ jsx43("span", { className: "upload-link", children: "Adicione" }),
              " ou arraste arquivos aqui"
            ] }),
            /* @__PURE__ */ jsxs33("p", { className: "upload-info", children: [
              "Formatos aceitos: ",
              /* @__PURE__ */ jsx43("b", { children: Object.keys(accept).map((t) => t.split("/")[1].toUpperCase()).join(", ") }),
              " | Tamanho m\xE1ximo:",
              " ",
              /* @__PURE__ */ jsxs33("b", { children: [
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

// src/forms/AnexoManager.tsx
import { useCallback as useCallback2, useEffect as useEffect10, useMemo as useMemo4, useState as useState21 } from "react";
import { useDropzone as useDropzone2 } from "react-dropzone";
import {
  FiUploadCloud as FiUploadCloud2,
  FiTrash2 as FiTrash23,
  FiDownload,
  FiRefreshCw,
  FiFile,
  FiImage,
  FiFilm,
  FiMusic
} from "react-icons/fi";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaFileArchive } from "react-icons/fa";
import { Fragment as Fragment10, jsx as jsx44, jsxs as jsxs34 } from "react/jsx-runtime";
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
function getFileCategory(tipo, nome) {
  var _a;
  const ext = ((_a = nome.split(".").pop()) == null ? void 0 : _a.toLowerCase()) || "";
  if (tipo.startsWith("image/")) return "img";
  if (tipo === "application/pdf" || ext === "pdf") return "pdf";
  if (tipo.includes("word") || ext === "doc" || ext === "docx") return "doc";
  if (tipo.includes("excel") || tipo.includes("spreadsheet") || ext === "xls" || ext === "xlsx") return "xls";
  if (ext === "csv" || tipo === "text/csv") return "csv";
  if (tipo.startsWith("video/")) return "vid";
  if (tipo.startsWith("audio/")) return "aud";
  if (tipo.includes("zip") || tipo.includes("rar") || ext === "zip" || ext === "rar" || ext === "7z") return "zip";
  return "generic";
}
function FileIcon({ category }) {
  switch (category) {
    case "pdf":
      return /* @__PURE__ */ jsx44(FaFilePdf, {});
    case "doc":
      return /* @__PURE__ */ jsx44(FaFileWord, {});
    case "xls":
      return /* @__PURE__ */ jsx44(FaFileExcel, {});
    case "csv":
      return /* @__PURE__ */ jsx44(FaFileCsv, {});
    case "img":
      return /* @__PURE__ */ jsx44(FiImage, {});
    case "vid":
      return /* @__PURE__ */ jsx44(FiFilm, {});
    case "aud":
      return /* @__PURE__ */ jsx44(FiMusic, {});
    case "zip":
      return /* @__PURE__ */ jsx44(FaFileArchive, {});
    default:
      return /* @__PURE__ */ jsx44(FiFile, {});
  }
}
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
  dropzoneLabel
}) => {
  const [thumbUrls, setThumbUrls] = useState21({});
  const [unavailableIds, setUnavailableIds] = useState21(/* @__PURE__ */ new Set());
  const handleDownload = useCallback2(async (anexo) => {
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
  useEffect10(() => {
    const newUrls = {};
    locais.forEach((a) => {
      if (a.tipo.startsWith("image/") && !thumbUrls[a.localId]) {
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
  const onDrop = useCallback2(
    (acceptedFiles) => {
      if (onAddFiles) onAddFiles(acceptedFiles);
    },
    [onAddFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone2({
    onDrop,
    maxSize: maxFileSize,
    maxFiles,
    accept: UNIVERSAL_ACCEPT,
    disabled: readonly
  });
  const allExtensions = useMemo4(
    () => Object.values(UNIVERSAL_ACCEPT).flat().map((e) => e.replace(".", "").toUpperCase()),
    []
  );
  const totalCount = persistidos.length + locais.length;
  return /* @__PURE__ */ jsxs34("div", { className: "anexo-manager", children: [
    !readonly && /* @__PURE__ */ jsxs34(
      "div",
      {
        ...getRootProps(),
        className: `anexo-dropzone ${isDragActive ? "anexo-drag-active" : ""}`,
        children: [
          /* @__PURE__ */ jsx44("input", { ...getInputProps() }),
          /* @__PURE__ */ jsxs34("div", { className: "anexo-dropzone-inner", children: [
            /* @__PURE__ */ jsx44(FiUploadCloud2, { className: "anexo-dropzone-icon" }),
            /* @__PURE__ */ jsx44("p", { className: "anexo-dropzone-text", children: dropzoneLabel || /* @__PURE__ */ jsxs34(Fragment10, { children: [
              /* @__PURE__ */ jsx44("strong", { children: "Clique para selecionar" }),
              " ou arraste arquivos aqui"
            ] }) }),
            /* @__PURE__ */ jsxs34("p", { className: "anexo-dropzone-hint", children: [
              "M\xE1x. ",
              formatFileSize(maxFileSize),
              " por arquivo \xB7 At\xE9 ",
              maxFiles,
              " arquivos"
            ] })
          ] })
        ]
      }
    ),
    (totalCount > 0 || loading) && /* @__PURE__ */ jsxs34("div", { className: "anexo-file-list", children: [
      loading && /* @__PURE__ */ jsx44("div", { className: "anexo-empty", children: "Carregando anexos..." }),
      persistidos.map((anexo) => {
        const cat = getFileCategory(anexo.tipo || "", anexo.nome);
        const isUnavailable = anexo.unavailable || unavailableIds.has(anexo.id);
        return /* @__PURE__ */ jsxs34("div", { className: `anexo-file-item ${isUnavailable ? "anexo-file-unavailable" : ""}`, children: [
          /* @__PURE__ */ jsx44("div", { className: `anexo-file-icon anexo-icon-${cat}`, children: /* @__PURE__ */ jsx44(FileIcon, { category: cat }) }),
          /* @__PURE__ */ jsxs34("div", { className: "anexo-file-info", children: [
            /* @__PURE__ */ jsx44("div", { className: "anexo-file-name", title: anexo.nome, children: anexo.nome }),
            /* @__PURE__ */ jsxs34("div", { className: "anexo-file-meta", children: [
              isUnavailable && /* @__PURE__ */ jsx44("span", { className: "anexo-status-error", children: "Anexo indisponivel" }),
              !isUnavailable && anexo.tamanho ? /* @__PURE__ */ jsx44("span", { children: formatFileSize(anexo.tamanho) }) : null,
              anexo.createdAt && /* @__PURE__ */ jsx44("span", { children: new Date(anexo.createdAt).toLocaleDateString("pt-BR") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs34("div", { className: "anexo-file-actions", children: [
            onDownload && !isUnavailable && /* @__PURE__ */ jsx44(
              "button",
              {
                type: "button",
                className: "anexo-btn-action anexo-btn-download",
                title: "Download",
                onClick: () => handleDownload(anexo),
                children: /* @__PURE__ */ jsx44(FiDownload, {})
              }
            ),
            !readonly && onRemovePersistido && /* @__PURE__ */ jsx44(
              "button",
              {
                type: "button",
                className: "anexo-btn-action anexo-btn-danger",
                title: "Remover",
                onClick: () => onRemovePersistido(anexo.id),
                children: /* @__PURE__ */ jsx44(FiTrash23, {})
              }
            )
          ] })
        ] }, `p-${anexo.id}`);
      }),
      locais.map((anexo) => {
        const cat = getFileCategory(anexo.tipo, anexo.nome);
        const isImg = anexo.tipo.startsWith("image/");
        return /* @__PURE__ */ jsxs34("div", { className: "anexo-file-item", children: [
          isImg && thumbUrls[anexo.localId] ? /* @__PURE__ */ jsx44("img", { src: thumbUrls[anexo.localId], alt: "", className: "anexo-file-thumb" }) : /* @__PURE__ */ jsx44("div", { className: `anexo-file-icon anexo-icon-${cat}`, children: /* @__PURE__ */ jsx44(FileIcon, { category: cat }) }),
          /* @__PURE__ */ jsxs34("div", { className: "anexo-file-info", children: [
            /* @__PURE__ */ jsx44("div", { className: "anexo-file-name", title: anexo.nome, children: anexo.nome }),
            /* @__PURE__ */ jsxs34("div", { className: "anexo-file-meta", children: [
              /* @__PURE__ */ jsx44("span", { children: formatFileSize(anexo.tamanho) }),
              anexo.status === "uploading" && /* @__PURE__ */ jsx44("span", { className: "anexo-status-uploading", children: "Enviando..." }),
              anexo.status === "error" && /* @__PURE__ */ jsx44("span", { className: "anexo-status-error", children: anexo.errorMessage || "Erro" })
            ] }),
            (anexo.status === "uploading" || anexo.status === "done") && /* @__PURE__ */ jsx44("div", { className: "anexo-progress-bar", children: /* @__PURE__ */ jsx44(
              "div",
              {
                className: `anexo-progress-fill ${anexo.status === "done" ? "anexo-progress-done" : ""}`,
                style: { width: `${anexo.progress}%` }
              }
            ) }),
            anexo.status === "error" && /* @__PURE__ */ jsx44("div", { className: "anexo-progress-bar", children: /* @__PURE__ */ jsx44("div", { className: "anexo-progress-fill anexo-progress-error", style: { width: "100%" } }) })
          ] }),
          /* @__PURE__ */ jsxs34("div", { className: "anexo-file-actions", children: [
            anexo.status === "error" && onRetry && /* @__PURE__ */ jsx44(
              "button",
              {
                type: "button",
                className: "anexo-btn-action",
                title: "Tentar novamente",
                onClick: () => onRetry(anexo.localId),
                children: /* @__PURE__ */ jsx44(FiRefreshCw, {})
              }
            ),
            (anexo.status === "pending" || anexo.status === "error") && onRemoveLocal && /* @__PURE__ */ jsx44(
              "button",
              {
                type: "button",
                className: "anexo-btn-action anexo-btn-danger",
                title: "Remover",
                onClick: () => onRemoveLocal(anexo.localId),
                children: /* @__PURE__ */ jsx44(FiTrash23, {})
              }
            )
          ] })
        ] }, `l-${anexo.localId}`);
      })
    ] }),
    !loading && totalCount === 0 && readonly && /* @__PURE__ */ jsx44("div", { className: "anexo-empty", children: "Nenhum anexo encontrado." })
  ] });
};

// src/forms/SectorSelector.tsx
import { useState as useState22, useEffect as useEffect11 } from "react";
import { Form as Form13 } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { jsx as jsx45, jsxs as jsxs35 } from "react/jsx-runtime";
var SectorSelector = ({
  setores,
  onSectorSelect,
  selectionLabel = "Selecione o Setor",
  selectionPlaceholder = "Selecione o setor",
  hideComponent = false,
  defaultSectorName = false,
  allowAll = false
}) => {
  const [expanded, setExpanded] = useState22(false);
  const [selectedSector, setSelectedSector] = useState22(null);
  useEffect11(() => {
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
  return /* @__PURE__ */ jsxs35(Form13.Floating, { className: "sector-selector-floating", children: [
    /* @__PURE__ */ jsxs35("div", { className: "custom-select-container", onClick: toggleExpand, children: [
      /* @__PURE__ */ jsx45("span", { className: "selected-sector-label mt-1", children: (selectedSector == null ? void 0 : selectedSector.nome) || selectionPlaceholder }),
      /* @__PURE__ */ jsx45("div", { className: "zoom-container", children: expanded ? /* @__PURE__ */ jsx45(BsChevronUp, {}) : /* @__PURE__ */ jsx45(BsChevronDown, {}) })
    ] }),
    (selectedSector == null ? void 0 : selectedSector.nome) && /* @__PURE__ */ jsx45("label", { htmlFor: "floatingInputCustom", children: selectionLabel }),
    expanded && /* @__PURE__ */ jsxs35(
      "div",
      {
        className: "custom-dropdown-menu",
        onMouseLeave: () => setExpanded(false),
        children: [
          setorOptions.sort((a, b) => a.nome.localeCompare(b.nome)).map((setor, idx) => /* @__PURE__ */ jsx45(
            "div",
            {
              className: `dropdown-option ${setor.nome === (selectedSector == null ? void 0 : selectedSector.nome) ? "selected-option" : ""}`,
              onClick: () => handleSelectSetor(setor),
              children: setor.nome === "default" ? "Nenhum" : setor.nome
            },
            idx
          )),
          setores.length === 0 && /* @__PURE__ */ jsx45("div", { className: "dropdown-option text-muted italic", children: "Carregando setores..." })
        ]
      }
    )
  ] });
};

// src/forms/UnidadeMaterialForm.tsx
import { Button as Button17 } from "react-bootstrap";
import { jsx as jsx46, jsxs as jsxs36 } from "react/jsx-runtime";
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
  var _a, _b;
  const renderNewMaterialButton = () => /* @__PURE__ */ jsx46(Button17, { onClick: onNavigateToCreateMaterial, size: "sm", variant: "outline-primary", children: "Novo Material" });
  const renderNewUnidadeButton = () => /* @__PURE__ */ jsx46(Button17, { onClick: onNavigateToCreateUnidade, size: "sm", variant: "outline-primary", children: "Nova Unidade" });
  return /* @__PURE__ */ jsxs36("div", { className: `unidade-material-form ${className}`, children: [
    !hideMaterial && /* @__PURE__ */ jsx46(
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
    !hideQuantidade && /* @__PURE__ */ jsx46(
      FormField,
      {
        label: "Quantidade",
        val: value.quantidade || "",
        onValueUpdate: onQuantidadeUpdate,
        ty: "number"
      }
    ),
    !hideUnidade && /* @__PURE__ */ jsx46(
      AutoComplete,
      {
        displayKey: "nome",
        value: ((_b = value == null ? void 0 : value.unidade) == null ? void 0 : _b.nome) || "",
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
import { jsx as jsx47, jsxs as jsxs37 } from "react/jsx-runtime";
var IconLabelItem = ({
  icon,
  label,
  containerClassName = "",
  labelClassName = "",
  onClick,
  style
}) => {
  return /* @__PURE__ */ jsxs37("div", { className: containerClassName, onClick, style: { ...style, cursor: onClick ? "pointer" : "default" }, children: [
    icon,
    /* @__PURE__ */ jsx47("span", { className: labelClassName, children: label })
  ] });
};

// src/icons/IconLabelList.tsx
import { jsx as jsx48 } from "react/jsx-runtime";
var IconLabelList = ({ items, className = "" }) => {
  return /* @__PURE__ */ jsx48("div", { className: `icon-label-list ${className}`, children: items.map((item, index) => /* @__PURE__ */ jsx48(
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
import { useState as useState23 } from "react";
import { Modal as Modal4, Button as Button18, OverlayTrigger, Tooltip as Tooltip3 } from "react-bootstrap";
import { FiClock, FiCheck, FiTrash2 as FiTrash24 } from "react-icons/fi";
import dayjs4 from "dayjs";
import { Fragment as Fragment11, jsx as jsx49, jsxs as jsxs38 } from "react/jsx-runtime";
var NotificationItem = ({
  notification,
  onRead,
  onDismiss,
  emptyContentLabel = "Sem conte\xFAdo adicional dispon\xEDvel."
}) => {
  const [showModal, setShowModal] = useState23(false);
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
  return /* @__PURE__ */ jsxs38(Fragment11, { children: [
    /* @__PURE__ */ jsxs38(
      "div",
      {
        className: `notification-item-modern ${status === "unread" ? "unread" : ""}`,
        onClick: handleOpenModal,
        children: [
          /* @__PURE__ */ jsx49("div", { className: `notification-status-indicator ${status}`, children: status === "unread" ? /* @__PURE__ */ jsx49(FiClock, { size: 14 }) : /* @__PURE__ */ jsx49(FiCheck, { size: 14 }) }),
          /* @__PURE__ */ jsxs38("div", { className: "notification-main-content", children: [
            /* @__PURE__ */ jsx49("div", { className: "notification-header-row", children: /* @__PURE__ */ jsxs38("div", { className: "notification-title-modern", children: [
              /* @__PURE__ */ jsx49("span", { className: "notification-context", children: context }),
              contextId && /* @__PURE__ */ jsxs38(Fragment11, { children: [
                /* @__PURE__ */ jsx49("span", { className: "notification-separator", children: "/" }),
                /* @__PURE__ */ jsx49("span", { className: "notification-context-id", children: contextId })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx49("div", { className: "notification-preview", children: /* @__PURE__ */ jsx49("p", { className: "notification-content-preview", children: content || "Nova mensagem recebida" }) }),
            /* @__PURE__ */ jsxs38("div", { className: "notification-meta", children: [
              /* @__PURE__ */ jsxs38("div", { className: "notification-timestamp", children: [
                /* @__PURE__ */ jsx49(FiClock, { size: 12, className: "me-1" }),
                /* @__PURE__ */ jsx49("small", { children: dayjs4(createdAt).format("DD/MM/YYYY HH:mm") })
              ] }),
              readAt && /* @__PURE__ */ jsxs38("div", { className: "notification-read-time", children: [
                /* @__PURE__ */ jsx49(FiCheck, { size: 12, className: "me-1" }),
                /* @__PURE__ */ jsxs38("small", { children: [
                  "Lida em ",
                  dayjs4(readAt).format("DD/MM HH:mm")
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx49("div", { className: "notification-quick-actions", children: status === "unread" && /* @__PURE__ */ jsx49(
            OverlayTrigger,
            {
              placement: "top",
              overlay: /* @__PURE__ */ jsx49(Tooltip3, { children: "Descartar" }),
              children: /* @__PURE__ */ jsx49(
                "button",
                {
                  className: "notification-action-btn notification-dismiss-btn",
                  onClick: handleDismiss,
                  "aria-label": "Descartar notifica\xE7\xE3o",
                  children: /* @__PURE__ */ jsx49(FiTrash24, { size: 14 })
                }
              )
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs38(
      Modal4,
      {
        show: showModal,
        onHide: handleCloseModal,
        centered: true,
        className: "notification-modal",
        children: [
          /* @__PURE__ */ jsx49(Modal4.Header, { closeButton: true, className: "notification-modal-header", children: /* @__PURE__ */ jsx49(Modal4.Title, { className: "notification-modal-title", children: /* @__PURE__ */ jsxs38("div", { className: "d-flex align-items-center", children: [
            status === "unread" ? /* @__PURE__ */ jsx49(FiClock, { className: "me-2 text-warning" }) : /* @__PURE__ */ jsx49(FiCheck, { className: "me-2 text-success" }),
            "Detalhes da Notifica\xE7\xE3o"
          ] }) }) }),
          /* @__PURE__ */ jsx49(Modal4.Body, { className: "notification-modal-body", children: /* @__PURE__ */ jsxs38("div", { className: "notification-modal-content", children: [
            /* @__PURE__ */ jsxs38("div", { className: "notification-modal-meta", children: [
              /* @__PURE__ */ jsx49("h6", { className: "notification-modal-source", children: displayTitle }),
              /* @__PURE__ */ jsxs38("div", { className: "notification-modal-timestamps", children: [
                /* @__PURE__ */ jsxs38("small", { className: "text-muted", children: [
                  /* @__PURE__ */ jsx49(FiClock, { size: 12, className: "me-1" }),
                  "Criada em ",
                  dayjs4(createdAt).format("DD/MM/YYYY [\xE0s] HH:mm")
                ] }),
                readAt && /* @__PURE__ */ jsxs38("small", { className: "text-muted ms-3", children: [
                  /* @__PURE__ */ jsx49(FiCheck, { size: 12, className: "me-1" }),
                  "Lida em ",
                  dayjs4(readAt).format("DD/MM/YYYY [\xE0s] HH:mm")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx49("div", { className: "notification-modal-message", children: /* @__PURE__ */ jsx49("p", { className: "mb-0", children: content || emptyContentLabel }) })
          ] }) }),
          /* @__PURE__ */ jsxs38(Modal4.Footer, { className: "notification-modal-footer", children: [
            /* @__PURE__ */ jsx49(Button18, { variant: "outline-secondary", onClick: handleCloseModal, children: "Fechar" }),
            status === "unread" && /* @__PURE__ */ jsx49(Button18, { variant: "primary", onClick: handleReadAndClose, children: "Marcar como lida" })
          ] })
        ]
      }
    )
  ] });
};

// src/icons/NotificationBell.tsx
import { Dropdown as Dropdown2, Badge as Badge3 } from "react-bootstrap";
import { FiBell } from "react-icons/fi";
import { jsx as jsx50, jsxs as jsxs39 } from "react/jsx-runtime";
var NotificationBell = ({
  notifications,
  onItemRead,
  onItemDismiss,
  onMarkAllRead,
  size = 20,
  className = ""
}) => {
  const unreadCount = notifications.filter((n) => n.status === "unread").length;
  return /* @__PURE__ */ jsxs39(Dropdown2, { align: "end", className: `notification-bell-dropdown ${className}`, children: [
    /* @__PURE__ */ jsxs39(Dropdown2.Toggle, { as: "div", className: "position-relative cursor-pointer p-2", children: [
      /* @__PURE__ */ jsx50(FiBell, { size }),
      unreadCount > 0 && /* @__PURE__ */ jsx50(
        Badge3,
        {
          pill: true,
          bg: "danger",
          className: "position-absolute",
          style: { top: 0, right: 0, fontSize: "0.65rem" },
          children: unreadCount > 99 ? "99+" : unreadCount
        }
      )
    ] }),
    /* @__PURE__ */ jsxs39(
      Dropdown2.Menu,
      {
        className: "shadow-lg border-0",
        style: { width: "320px", padding: 0, maxHeight: "500px", overflowY: "auto" },
        children: [
          /* @__PURE__ */ jsxs39("div", { className: "p-3 border-bottom d-flex justify-content-between align-items-center bg-light", children: [
            /* @__PURE__ */ jsx50("h6", { className: "mb-0 fw-bold", children: "Notifica\xE7\xF5es" }),
            unreadCount > 0 && onMarkAllRead && /* @__PURE__ */ jsx50(
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
          /* @__PURE__ */ jsx50("div", { className: "notification-list", children: notifications.length > 0 ? notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((n) => /* @__PURE__ */ jsx50(
            NotificationItem,
            {
              notification: n,
              onRead: onItemRead,
              onDismiss: onItemDismiss
            },
            n.id
          )) : /* @__PURE__ */ jsxs39("div", { className: "p-4 text-center text-muted", children: [
            /* @__PURE__ */ jsx50(FiBell, { size: 24, className: "mb-2 opacity-25" }),
            /* @__PURE__ */ jsx50("p", { className: "mb-0 small", children: "Nenhuma notifica\xE7\xE3o por aqui." })
          ] }) }),
          notifications.length > 0 && /* @__PURE__ */ jsx50("div", { className: "p-2 border-top text-center bg-light", children: /* @__PURE__ */ jsxs39("small", { className: "text-muted", children: [
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
import { Modal as Modal5, Button as Button19 } from "react-bootstrap";
import { jsx as jsx51, jsxs as jsxs40 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs40(
    Modal5,
    {
      show,
      onHide: closeFunc,
      centered: true,
      style: dialogStyle,
      ...modalProps,
      children: [
        header && /* @__PURE__ */ jsx51(Modal5.Header, { closeButton: true, children: /* @__PURE__ */ jsx51(Modal5.Title, { children: renderPart(header) }) }),
        /* @__PURE__ */ jsx51(Modal5.Body, { style: bodyStyle, children: renderPart(body) }),
        footer && /* @__PURE__ */ jsxs40(Modal5.Footer, { children: [
          renderPart(footer),
          !footer && /* @__PURE__ */ jsx51(Button19, { variant: "secondary", onClick: closeFunc, children: "Fechar" })
        ] })
      ]
    }
  );
};
var ModalBasicTemplate_default = ModalBasicTemplate;

// src/modals/SelectDateModal.tsx
import { useState as useState24 } from "react";
import { Modal as Modal6, Button as Button20, Form as Form14 } from "react-bootstrap";
import dayjs5 from "dayjs";
import { jsx as jsx52, jsxs as jsxs41 } from "react/jsx-runtime";
var SelectDateModal = ({
  show,
  onClose,
  onSelect,
  title = "Selecionar Data",
  label = "Escolha a data",
  initialDate,
  allowFuture = true
}) => {
  const [selectedDate, setSelectedDate] = useState24(
    initialDate || dayjs5().format("YYYY-MM-DDTHH:mm")
  );
  const handleConfirm = () => {
    onSelect(selectedDate);
    onClose();
  };
  return /* @__PURE__ */ jsxs41(Modal6, { show, onHide: onClose, centered: true, size: "sm", children: [
    /* @__PURE__ */ jsx52(Modal6.Header, { closeButton: true, children: /* @__PURE__ */ jsx52(Modal6.Title, { children: title }) }),
    /* @__PURE__ */ jsx52(Modal6.Body, { children: /* @__PURE__ */ jsxs41(Form14.Group, { children: [
      /* @__PURE__ */ jsx52(Form14.Label, { children: label }),
      /* @__PURE__ */ jsx52(
        Form14.Control,
        {
          type: "datetime-local",
          value: selectedDate,
          max: allowFuture ? void 0 : dayjs5().format("YYYY-MM-DDTHH:mm"),
          onChange: (e) => setSelectedDate(e.target.value)
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs41(Modal6.Footer, { children: [
      /* @__PURE__ */ jsx52(Button20, { variant: "outline-secondary", onClick: onClose, children: "Cancelar" }),
      /* @__PURE__ */ jsx52(Button20, { variant: "primary", onClick: handleConfirm, children: "Confirmar" })
    ] })
  ] });
};

// src/modals/JustificativaModal.tsx
import { useState as useState25, useEffect as useEffect12 } from "react";
import { Modal as Modal7, Button as Button21, Form as Form15, ListGroup as ListGroup3, Badge as Badge4, OverlayTrigger as OverlayTrigger2, Tooltip as Tooltip4 } from "react-bootstrap";
import { FaTrashAlt, FaUndo } from "react-icons/fa";
import dayjs6 from "dayjs";
import { jsx as jsx53, jsxs as jsxs42 } from "react/jsx-runtime";
var JustificativaModal = ({
  show,
  onClose,
  justificativas: initialJustificativas = [],
  currentUserId,
  currentUserName,
  onUpdateJustificativas
}) => {
  const [localJustificativas, setLocalJustificativas] = useState25(initialJustificativas);
  const [novaDescricao, setNovaDescricao] = useState25("");
  const [editandoId, setEditandoId] = useState25(null);
  useEffect12(() => {
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
  return /* @__PURE__ */ jsxs42(Modal7, { show, onHide: onClose, centered: true, size: "lg", children: [
    /* @__PURE__ */ jsx53(Modal7.Header, { closeButton: true, children: /* @__PURE__ */ jsx53(Modal7.Title, { children: "Justificativas / Coment\xE1rios" }) }),
    /* @__PURE__ */ jsxs42(Modal7.Body, { children: [
      /* @__PURE__ */ jsxs42(Form15, { className: "mb-4", children: [
        /* @__PURE__ */ jsxs42(Form15.Group, { controlId: "justificativaInput", className: "mb-2", children: [
          /* @__PURE__ */ jsx53(Form15.Label, { className: "small text-muted fw-bold", children: "NOVO REGISTRO" }),
          /* @__PURE__ */ jsx53(
            Form15.Control,
            {
              as: "textarea",
              rows: 2,
              value: novaDescricao,
              onChange: (e) => setNovaDescricao(e.target.value),
              placeholder: "Descreva o motivo ou informa\xE7\xE3o adicional..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx53("div", { className: "d-flex justify-content-end", children: /* @__PURE__ */ jsx53(Button21, { variant: "primary", size: "sm", onClick: handleAddOrEdit, children: editandoId ? "Salvar Edi\xE7\xE3o" : "Adicionar Justificativa" }) })
      ] }),
      /* @__PURE__ */ jsx53(ListGroup3, { className: "border-0", children: localJustificativas.map((j) => {
        var _a, _b, _c;
        const isMe = ((_a = j.user) == null ? void 0 : _a.userId) === currentUserId;
        return /* @__PURE__ */ jsxs42(
          ListGroup3.Item,
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
              /* @__PURE__ */ jsxs42("div", { className: "d-flex align-items-center mb-1", style: { width: "100%", justifyContent: isMe ? "flex-start" : "flex-end" }, children: [
                /* @__PURE__ */ jsx53("span", { className: "small fw-bold text-dark me-2", children: isMe ? "Voc\xEA" : ((_b = j.user) == null ? void 0 : _b.userName) || ((_c = j.user) == null ? void 0 : _c.firstName) || "Usu\xE1rio" }),
                /* @__PURE__ */ jsx53(Badge4, { bg: "secondary", style: { fontSize: "0.65rem" }, children: dayjs6(j.createdAt).format("DD/MM [\xE0s] HH:mm") })
              ] }),
              /* @__PURE__ */ jsx53(
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
              isMe && /* @__PURE__ */ jsx53("div", { className: "mt-1 d-flex gap-2", children: j.removed ? /* @__PURE__ */ jsx53(OverlayTrigger2, { placement: "top", overlay: /* @__PURE__ */ jsx53(Tooltip4, { children: "Desfazer" }), children: /* @__PURE__ */ jsx53(
                FaUndo,
                {
                  onClick: () => handleUndoRemove(j.id),
                  className: "text-success cursor-pointer",
                  size: 14
                }
              ) }) : /* @__PURE__ */ jsx53(OverlayTrigger2, { placement: "top", overlay: /* @__PURE__ */ jsx53(Tooltip4, { children: "Remover" }), children: /* @__PURE__ */ jsx53(
                FaTrashAlt,
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
    /* @__PURE__ */ jsx53(Modal7.Footer, { children: /* @__PURE__ */ jsx53(Button21, { variant: "outline-secondary", onClick: onClose, children: "Fechar" }) })
  ] });
};

// src/modals/ImageViewModal.tsx
import { useState as useState26, useEffect as useEffect13 } from "react";
import { Button as Button22 } from "react-bootstrap";
import { jsx as jsx54, jsxs as jsxs43 } from "react/jsx-runtime";
var ImageViewModal = ({
  show,
  onHide,
  imagesData = [],
  initialImageData,
  imageAltText = "Visualiza\xE7\xE3o de imagem",
  resolveImageUrl
}) => {
  const [selectedImageKey, setSelectedImageKey] = useState26(null);
  const [imageSrc, setImageSrc] = useState26(null);
  const [currentAuthor, setCurrentAuthor] = useState26("Desconhecido");
  useEffect13(() => {
    if (show && initialImageData) {
      setSelectedImageKey(initialImageData.key);
      setCurrentAuthor(initialImageData.author || "Desconhecido");
    } else if (show && imagesData.length > 0) {
      setSelectedImageKey(imagesData[0].key);
      setCurrentAuthor(imagesData[0].author || "Desconhecido");
    }
  }, [show, initialImageData]);
  useEffect13(() => {
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
    return /* @__PURE__ */ jsx54("div", { className: "mb-3 d-flex flex-wrap justify-content-center gap-2", children: imagesData.map((img, idx) => /* @__PURE__ */ jsx54(
      Button22,
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
  const body = /* @__PURE__ */ jsxs43("div", { className: "text-center", children: [
    renderImageSelector(),
    imageSrc ? /* @__PURE__ */ jsx54(
      "img",
      {
        src: imageSrc,
        alt: imageAltText,
        className: "img-fluid rounded shadow-sm",
        style: { maxHeight: "75vh", objectFit: "contain" }
      }
    ) : /* @__PURE__ */ jsx54("div", { className: "p-5 text-muted", children: "Aguardando imagem..." })
  ] });
  return /* @__PURE__ */ jsx54(
    ModalBasicTemplate_default,
    {
      header: "Visualiza\xE7\xE3o de Imagem",
      closeFunc: onHide,
      show,
      body,
      props: { size: "lg" },
      footer: () => /* @__PURE__ */ jsxs43("div", { className: "w-100 d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs43("small", { className: "text-muted", children: [
          "Enviado por: ",
          /* @__PURE__ */ jsx54("strong", { children: currentAuthor })
        ] }),
        /* @__PURE__ */ jsx54(Button22, { variant: "outline-secondary", size: "sm", onClick: onHide, children: "Fechar" })
      ] })
    }
  );
};

// src/tables/ReusableTableWithModal.tsx
import { useState as useState27, useEffect as useEffect14 } from "react";
import { Table, Button as Button23, Modal as Modal8 } from "react-bootstrap";
import { Fragment as Fragment12, jsx as jsx55, jsxs as jsxs44 } from "react/jsx-runtime";
var ReusableTableWithModal = ({
  fetchDataCallback,
  modalButtonCallback,
  configureColumnsCallback,
  headers,
  modalContent,
  confirmLabel = "Aceitar",
  onFetchData
}) => {
  const [data, setData] = useState27([]);
  const [selectedItem, setSelectedItem] = useState27(null);
  const [showModal, setShowModal] = useState27(false);
  const [loading, setLoading] = useState27(false);
  const [tableDataRows, setTableDataRows] = useState27([]);
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
  useEffect14(() => {
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
  return /* @__PURE__ */ jsxs44(Fragment12, { children: [
    /* @__PURE__ */ jsxs44(Table, { striped: true, bordered: true, hover: true, responsive: true, children: [
      /* @__PURE__ */ jsx55("thead", { children: /* @__PURE__ */ jsx55("tr", { children: headers.map((col, index) => /* @__PURE__ */ jsx55("th", { children: col }, index)) }) }),
      /* @__PURE__ */ jsx55("tbody", { children: loading ? /* @__PURE__ */ jsx55("tr", { children: /* @__PURE__ */ jsx55("td", { colSpan: headers.length, className: "text-center py-4", children: "Carregando..." }) }) : tableDataRows.length > 0 ? tableDataRows.map((td, index) => /* @__PURE__ */ jsx55(
        "tr",
        {
          onClick: () => handleRowClick(td),
          style: { cursor: "pointer" },
          children: td.columns.map((col, colIndex) => /* @__PURE__ */ jsx55("td", { children: col || "N/A" }, colIndex))
        },
        index
      )) : /* @__PURE__ */ jsx55("tr", { children: /* @__PURE__ */ jsx55("td", { colSpan: headers.length, className: "text-center py-4", children: "Nenhum dado encontrado." }) }) })
    ] }),
    /* @__PURE__ */ jsxs44(Modal8, { show: showModal, onHide: handleCloseModal, centered: true, children: [
      /* @__PURE__ */ jsx55(Modal8.Header, { closeButton: true, children: /* @__PURE__ */ jsx55(Modal8.Title, { children: "Detalhes" }) }),
      /* @__PURE__ */ jsx55(Modal8.Body, { children: selectedItem && /* @__PURE__ */ jsx55("div", { children: modalContent ? modalContent(selectedItem) : "Visualizando detalhes do item." }) }),
      /* @__PURE__ */ jsxs44(Modal8.Footer, { children: [
        /* @__PURE__ */ jsx55(Button23, { variant: "outline-secondary", onClick: handleCloseModal, children: "Fechar" }),
        modalButtonCallback && /* @__PURE__ */ jsx55(
          Button23,
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
import { useState as useState28 } from "react";
import { Button as Button24 } from "react-bootstrap";
import { Fragment as Fragment13, jsx as jsx56, jsxs as jsxs45 } from "react/jsx-runtime";
var TextWithMore = ({
  text = "Carregando...",
  maxLength,
  moreLabel = "ver mais",
  lessLabel = "ver menos"
}) => {
  const [expanded, setExpanded] = useState28(false);
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };
  const isTruncated = text.length > maxLength;
  const displayText = isTruncated && !expanded ? text.slice(0, maxLength) + "\u2026" : text;
  return /* @__PURE__ */ jsxs45(Fragment13, { children: [
    /* @__PURE__ */ jsx56("span", { className: "text-with-more-content", children: displayText }),
    isTruncated && /* @__PURE__ */ jsx56(
      Button24,
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
export {
  ActionButtons,
  AddButton_default as AddButton,
  AdvancedFilterBar,
  AnexoManager,
  ApproveAndReproveButtons,
  AsyncButton,
  AutoComplete,
  BonusButton,
  ButtonWithDropdown,
  CheckBox,
  ClickToWriteField,
  ColorPicker,
  ConfigObject,
  DeleteButton_default as DeleteButton,
  DeleteConfirm,
  ExpandableCard,
  FindRecursoByTagField,
  FormField,
  Generic3DotMenu,
  GenericChart,
  GenericDisplay_default as GenericDisplay,
  GenericForm_default as GenericForm,
  GenericREchart,
  GenericSelect_default as GenericSelect,
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
  ResponsiveContainer_default as ResponsiveContainer,
  ReusableTableWithModal,
  SectorSelector,
  SelectDateModal,
  StatusBadge,
  StatusIndicator,
  StatusLight,
  StatusPills,
  Switch,
  SwitchOnClick,
  TextWithMore,
  TimerDisplay,
  UnidadeMaterialForm,
  UploadArea,
  UuidPill_default as UuidPill,
  VerticalItemsDisplay
};
