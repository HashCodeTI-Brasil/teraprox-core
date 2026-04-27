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
import { jsx as jsx2 } from "react/jsx-runtime";
var DeleteButton = ({ title, onDeleteClick }) => {
  return /* @__PURE__ */ jsx2("button", { className: "btn btn-danger", onClick: () => onDeleteClick(), children: title });
};
var DeleteButton_default = DeleteButton;

// src/buttons/ActionButtons.tsx
import { useState as useState2, useRef } from "react";
import { Button as Button3, Form as Form2, ProgressBar } from "react-bootstrap";
import { FiSave, FiTrash2, FiRotateCcw, FiCopy, FiChevronLeft } from "react-icons/fi";

// src/forms/DeleteConfirm.tsx
import { useState } from "react";
import { Button as Button2, Modal, Form } from "react-bootstrap";
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
      /* @__PURE__ */ jsx3(Button2, { variant: "secondary", onClick: () => onHide(false), children: "Cancelar" }),
      /* @__PURE__ */ jsx3(
        Button2,
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
          Button3,
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
      Button3,
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
      onBack && /* @__PURE__ */ jsxs2(Button3, { variant: "outline-secondary", onClick: onBack, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiChevronLeft, { className: "me-2" }),
        backLabel
      ] }),
      isEditing && onCancelEdit && /* @__PURE__ */ jsxs2(Button3, { variant: "warning", onClick: onCancelEdit, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiRotateCcw, { className: "me-2" }),
        cancelEditLabel
      ] }),
      /* @__PURE__ */ jsx4(PermissionWrapper, { children: renderDeleteButton() }),
      onSave && /* @__PURE__ */ jsxs2(Button3, { variant: saveVariant, onClick: onSave, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiSave, { className: "me-2" }),
        saveLabel
      ] }),
      isEditing && onCopy && /* @__PURE__ */ jsxs2(Button3, { variant: "outline-primary", onClick: onCopy, disabled, style: { margin: 2 }, children: [
        /* @__PURE__ */ jsx4(FiCopy, { className: "me-2" }),
        copyLabel
      ] })
    ] })
  ] });
};

// src/buttons/ApproveAndReproveButtons.tsx
import { useEffect } from "react";
import { Button as Button4 } from "react-bootstrap";
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
    /* @__PURE__ */ jsx5(Button4, { onClick: approveCallback, variant: "success", className: "me-1", children: approveText ? approveText : /* @__PURE__ */ jsx5(GrCheckmark, { size: buttonSize }) }),
    /* @__PURE__ */ jsx5(Button4, { onClick: reproveCallback, variant: "danger", children: repproveText ? repproveText : /* @__PURE__ */ jsx5(GrClose, { size: buttonSize }) })
  ] });
};

// src/buttons/AsyncButton.tsx
import { useState as useState3, useRef as useRef2 } from "react";
import { Button as Button5 } from "react-bootstrap";

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
    Button5,
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
import { Button as Button6, ButtonGroup, Dropdown } from "react-bootstrap";
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
      children: [
        /* @__PURE__ */ jsx9(
          Button6,
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
        /* @__PURE__ */ jsx9(Dropdown.Menu, { variant: menuVariant, children: options.map((opt, idx) => /* @__PURE__ */ jsx9(Dropdown.Item, { onClick: opt.callback, children: opt.label }, `${opt.label}-${idx}`)) })
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
import { Button as Button7, Modal as Modal2 } from "react-bootstrap";
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
            Button7,
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
      /* @__PURE__ */ jsx11(Modal2.Footer, { children: /* @__PURE__ */ jsx11(Button7, { variant: "secondary", onClick: handleClose, children: "Fechar" }) })
    ] })
  ] });
};

// src/buttons/LoadingButton.tsx
import { Button as Button8, Spinner as Spinner2 } from "react-bootstrap";
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
    Button8,
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
import { Button as Button9 } from "react-bootstrap";
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
    Button9,
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
import {
  BranchDropDisplay,
  BranchDropDisplay as BranchDropDisplay2
} from "@teraprox/ui-kit-sgm";

// src/displays/RateLimitBar.tsx
import { useMemo } from "react";
import { jsx as jsx22, jsxs as jsxs15 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs15("div", { style: containerStyle, className, children: [
    /* @__PURE__ */ jsxs15("div", { style: textStyle, children: [
      label && /* @__PURE__ */ jsx22("span", { children: label }),
      /* @__PURE__ */ jsxs15("span", { children: [
        entry.used,
        "/",
        entry.limit,
        " req",
        entry.exceeded ? " \u2014 limite atingido" : ` (reset em ${formatResetIn(entry.windowReset)})`
      ] })
    ] }),
    /* @__PURE__ */ jsx22("div", { style: barTrackStyle, children: /* @__PURE__ */ jsx22("div", { style: barFillStyle }) })
  ] });
};

// src/displays/StatusIndicator.tsx
import { jsx as jsx23, jsxs as jsxs16 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs16("div", { className: `status-flag ${status} ${containerClassName}`, children: [
    /* @__PURE__ */ jsx23("div", { className: "status-label", children: label }),
    /* @__PURE__ */ jsx23("div", { className: "status-count", children: count })
  ] });
};

// src/displays/VerticalItemsDisplay.tsx
import { jsx as jsx24, jsxs as jsxs17 } from "react/jsx-runtime";
var VerticalItemsDisplay = ({
  item1 = "",
  item2 = "",
  item3 = "",
  className = "",
  style
}) => {
  return /* @__PURE__ */ jsxs17("div", { className, style, children: [
    /* @__PURE__ */ jsx24("div", { children: item1 }),
    /* @__PURE__ */ jsx24("div", { children: item2 }),
    /* @__PURE__ */ jsx24("div", { children: item3 })
  ] });
};

// src/displays/StatusLight.tsx
import { jsx as jsx25 } from "react/jsx-runtime";
var StatusLight = ({
  active = false,
  activeLightColor = "green",
  inactiveLightColor = "gray",
  size = "20px",
  className = "",
  style
}) => {
  const color = active ? activeLightColor : inactiveLightColor;
  return /* @__PURE__ */ jsx25(
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
import { Fragment as Fragment6, jsx as jsx26, jsxs as jsxs18 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx26("div", { className: "timer-display-container", children: /* @__PURE__ */ jsx26("div", { className: "timer-display-content", children: id ? /* @__PURE__ */ jsxs18(Fragment6, { children: [
    /* @__PURE__ */ jsx26(
      BiTimer,
      {
        size: 24,
        className: "timer-icon",
        title: "Timer"
      }
    ),
    pausable && !isStopped && /* @__PURE__ */ jsx26(
      BsPause,
      {
        size: 20,
        className: "timer-icon-action",
        onClick: handlePause,
        title: "Pausar"
      }
    ),
    playable && !isStopped && /* @__PURE__ */ jsx26(
      BsPlay,
      {
        size: 20,
        className: "timer-icon-action",
        onClick: handlePlay,
        title: "Iniciar"
      }
    ),
    /* @__PURE__ */ jsx26("span", { className: "timer-display-time", children: formatDuration(tempo) })
  ] }) : /* @__PURE__ */ jsx26("span", { className: "timer-display-message", children: emptyMessage }) }) });
};

// src/displays/RecursoDisplayer.tsx
import {
  RecursoDisplayer,
  RecursoDisplayer as RecursoDisplayer2
} from "@teraprox/ui-kit-sgm";

// src/filters/StatusPills.tsx
import { jsx as jsx27, jsxs as jsxs19 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx27("div", { className: `status-pills-container ${className}`, children: Object.entries(statuses).map(([key, meta]) => {
    const isActive = activeKeys.includes(key);
    return /* @__PURE__ */ jsxs19(
      "button",
      {
        type: "button",
        className: `status-pill ${isActive ? "active" : ""}`,
        style: { "--status-color": meta.color },
        onClick: () => toggleKey(key),
        "aria-pressed": isActive,
        children: [
          /* @__PURE__ */ jsx27("span", { className: "status-pill__swatch" }),
          /* @__PURE__ */ jsx27("span", { className: "status-pill__label", children: meta.label }),
          meta.count !== void 0 && /* @__PURE__ */ jsx27("span", { className: "status-pill__count", children: meta.count })
        ]
      },
      key
    );
  }) });
};

// src/filters/PeriodSelector.tsx
import { useState as useState9 } from "react";
import { Card as Card2, Form as Form5, Button as Button10 } from "react-bootstrap";
import { FaCalendarAlt, FaChevronUp, FaHistory } from "react-icons/fa";
import dayjs3 from "dayjs";
import { Fragment as Fragment7, jsx as jsx28, jsxs as jsxs20 } from "react/jsx-runtime";
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
  const [isExpanded, setIsExpanded] = useState9(false);
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
  return /* @__PURE__ */ jsxs20(Card2, { className: `period-selector-card ${isExpanded ? "expanded" : ""} ${className}`, children: [
    /* @__PURE__ */ jsxs20("div", { className: "compact-row", onClick: () => setIsExpanded(!isExpanded), children: [
      /* @__PURE__ */ jsxs20("div", { className: "d-flex align-items-center", children: [
        /* @__PURE__ */ jsx28(FaCalendarAlt, { className: "me-2 text-primary" }),
        /* @__PURE__ */ jsx28("span", { className: "date-range-text", children: isExpanded ? label : formatDisplayRange(startDate, endDate) })
      ] }),
      /* @__PURE__ */ jsx28("div", { className: "period-icon-btn", children: isExpanded ? /* @__PURE__ */ jsx28(FaChevronUp, {}) : /* @__PURE__ */ jsx28("span", { className: "small text-muted", children: "Editar" }) })
    ] }),
    isExpanded && /* @__PURE__ */ jsxs20("div", { className: "expanded-content", children: [
      onPresetSelect && /* @__PURE__ */ jsxs20(Fragment7, { children: [
        /* @__PURE__ */ jsxs20("div", { className: "d-flex align-items-center mb-2", children: [
          /* @__PURE__ */ jsx28(FaHistory, { size: 12, className: "me-1 text-muted" }),
          /* @__PURE__ */ jsx28("small", { className: "text-muted fw-bold text-uppercase", style: { fontSize: "0.65rem" }, children: "Atalhos" })
        ] }),
        /* @__PURE__ */ jsx28("div", { className: "presets-container", children: presets.map((p) => /* @__PURE__ */ jsx28(
          Button10,
          {
            variant: "outline-primary",
            className: "preset-btn",
            onClick: (e) => {
              e.stopPropagation();
              onPresetSelect(p.key);
              setIsExpanded(false);
            },
            children: p.label
          },
          p.key
        )) })
      ] }),
      /* @__PURE__ */ jsxs20("div", { className: "date-inputs-grid", children: [
        /* @__PURE__ */ jsxs20(Form5.Group, { children: [
          /* @__PURE__ */ jsx28(Form5.Label, { className: "small text-muted", children: "In\xEDcio" }),
          /* @__PURE__ */ jsx28(
            Form5.Control,
            {
              type: "datetime-local",
              size: "sm",
              value: startDate,
              max: maxDate,
              onChange: (e) => onStartDateChange(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs20(Form5.Group, { children: [
          /* @__PURE__ */ jsx28(Form5.Label, { className: "small text-muted", children: "Fim" }),
          /* @__PURE__ */ jsx28(
            Form5.Control,
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
      /* @__PURE__ */ jsx28("div", { className: "mt-3 d-flex justify-content-end", children: /* @__PURE__ */ jsx28(
        Button10,
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
import { useState as useState10 } from "react";
import { Collapse, Button as Button11 } from "react-bootstrap";
import { FiFilter, FiChevronDown, FiChevronUp, FiTrash2 as FiTrash22 } from "react-icons/fi";
import { jsx as jsx29, jsxs as jsxs21 } from "react/jsx-runtime";
var AdvancedFilterBar = ({
  children,
  title = "Filtros e Busca",
  activeFiltersCount = 0,
  onClearAll,
  defaultExpanded = false,
  className = ""
}) => {
  const [expanded, setExpanded] = useState10(defaultExpanded);
  return /* @__PURE__ */ jsxs21("div", { className: `advanced-filter-bar ${className}`, children: [
    /* @__PURE__ */ jsxs21(
      "div",
      {
        className: "filter-bar-header",
        onClick: () => setExpanded(!expanded),
        children: [
          /* @__PURE__ */ jsxs21("div", { className: "filter-title-group", children: [
            /* @__PURE__ */ jsx29(FiFilter, { className: "text-primary" }),
            /* @__PURE__ */ jsx29("h5", { className: "filter-title", children: title }),
            activeFiltersCount > 0 && /* @__PURE__ */ jsxs21("span", { className: "filter-count-badge", children: [
              activeFiltersCount,
              " ativos"
            ] })
          ] }),
          /* @__PURE__ */ jsx29("div", { className: "filter-chevron", children: expanded ? /* @__PURE__ */ jsx29(FiChevronUp, { size: 20 }) : /* @__PURE__ */ jsx29(FiChevronDown, { size: 20 }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx29(Collapse, { in: expanded, children: /* @__PURE__ */ jsx29("div", { children: /* @__PURE__ */ jsxs21("div", { className: "filter-bar-content", children: [
      /* @__PURE__ */ jsx29("div", { className: "filter-grid", children }),
      (onClearAll || activeFiltersCount > 0) && /* @__PURE__ */ jsxs21("div", { className: "filter-actions", children: [
        onClearAll && /* @__PURE__ */ jsxs21(
          Button11,
          {
            variant: "link",
            className: "text-danger text-decoration-none btn-sm d-flex align-items-center",
            onClick: (e) => {
              e.stopPropagation();
              onClearAll();
            },
            children: [
              /* @__PURE__ */ jsx29(FiTrash22, { className: "me-1" }),
              "Limpar Filtros"
            ]
          }
        ),
        /* @__PURE__ */ jsx29(
          Button11,
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
import { useCallback, useEffect as useEffect4, useMemo as useMemo2, useState as useState11 } from "react";
import { Button as Button12, Card as Card3, Col as Col3, Form as Form6, Row as Row3 } from "react-bootstrap";
import {
  FaCalendarAlt as FaCalendarAlt2,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";
import dayjs4 from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { jsx as jsx30, jsxs as jsxs22 } from "react/jsx-runtime";
dayjs4.extend(isoWeek);
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
    start: () => dayjs4().startOf("day"),
    end: () => dayjs4().endOf("day")
  },
  {
    key: "week",
    label: "Esta semana",
    start: () => dayjs4().startOf("isoWeek"),
    end: () => dayjs4().endOf("isoWeek")
  },
  {
    key: "month",
    label: "Este m\xEAs",
    start: () => dayjs4().startOf("month"),
    end: () => dayjs4().endOf("month")
  },
  {
    key: "year",
    label: "Este ano",
    start: () => dayjs4().startOf("year"),
    end: () => dayjs4().endOf("year")
  }
];
var TABS = [
  { key: "quick", icon: /* @__PURE__ */ jsx30(FaClock, { size: 12 }), label: "R\xE1pido" },
  { key: "month", icon: /* @__PURE__ */ jsx30(FaCalendarAlt2, { size: 12 }), label: "Meses" },
  { key: "custom", icon: /* @__PURE__ */ jsx30(FaCalendarAlt2, { size: 12 }), label: "Per\xEDodo" }
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
  const [activeTab, setActiveTab] = useState11(defaultTab);
  const [isExpanded, setIsExpanded] = useState11(!compact);
  const [activePresetKey, setActivePresetKey] = useState11(null);
  const [selectedYear, setSelectedYear] = useState11(() => {
    const d = parseDate(dataInicio);
    return d ? d.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
  });
  const [selectedMonths, setSelectedMonths] = useState11(/* @__PURE__ */ new Set());
  const [lastClickedMonth, setLastClickedMonth] = useState11(null);
  const [customStart, setCustomStart] = useState11("");
  const [customEnd, setCustomEnd] = useState11("");
  const presets = quickPresets || DEFAULT_PRESETS;
  useEffect4(() => {
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
  useEffect4(() => {
    if (dataInicio) setCustomStart(dayjs4(dataInicio).format("YYYY-MM-DDTHH:mm"));
    if (dataFim) setCustomEnd(dayjs4(dataFim).format("YYYY-MM-DDTHH:mm"));
  }, [dataInicio, dataFim]);
  const displayLabel = useMemo2(() => {
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
    return `${dayjs4(s).format("DD/MM/YYYY")} \u2013 ${dayjs4(e).format("DD/MM/YYYY")}`;
  }, [dataInicio, dataFim, activePresetKey, presets]);
  const handlePreset = useCallback(
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
  const handleMonthClick = useCallback(
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
  const handleYearChange = useCallback(
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
  const handleCustomApply = useCallback(() => {
    if (!customStart || !customEnd) return;
    setActivePresetKey(null);
    onSelect({
      dataInicio: dayjs4(customStart).toISOString(),
      dataFim: dayjs4(customEnd).toISOString()
    });
  }, [customStart, customEnd, onSelect]);
  const handleClear = useCallback(() => {
    setSelectedMonths(/* @__PURE__ */ new Set());
    setActivePresetKey(null);
    setCustomStart("");
    setCustomEnd("");
    onSelect({ dataInicio: "", dataFim: "" });
  }, [onSelect]);
  const today = /* @__PURE__ */ new Date();
  const maxDateStr = allowFuture ? void 0 : dayjs4().format("YYYY-MM-DDTHH:mm");
  if (compact && !isExpanded) {
    return /* @__PURE__ */ jsx30(
      Card3,
      {
        className: `ups-card ups-card--compact ${className}`,
        onClick: () => !disabled && setIsExpanded(true),
        role: "button",
        tabIndex: 0,
        children: /* @__PURE__ */ jsxs22("div", { className: "ups-compact-row", children: [
          /* @__PURE__ */ jsx30(FaCalendarAlt2, { className: "text-primary me-2" }),
          /* @__PURE__ */ jsx30("span", { className: "ups-display-label", children: displayLabel }),
          /* @__PURE__ */ jsx30("span", { className: "ups-edit-hint text-muted small", children: "Editar" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsx30(Card3, { className: `ups-card ${className}`, children: /* @__PURE__ */ jsxs22(Card3.Body, { className: "ups-body", children: [
    /* @__PURE__ */ jsxs22("div", { className: "ups-header", children: [
      /* @__PURE__ */ jsxs22("div", { className: "d-flex align-items-center gap-2 flex-grow-1 min-w-0", children: [
        /* @__PURE__ */ jsx30(FaCalendarAlt2, { className: "text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsx30("span", { className: "ups-display-label text-truncate", children: displayLabel })
      ] }),
      /* @__PURE__ */ jsxs22("div", { className: "d-flex align-items-center gap-1", children: [
        (dataInicio || dataFim) && /* @__PURE__ */ jsx30(
          Button12,
          {
            variant: "link",
            size: "sm",
            className: "p-0 text-muted",
            onClick: handleClear,
            title: "Limpar per\xEDodo",
            disabled,
            children: /* @__PURE__ */ jsx30(FaTimesCircle, { size: 14 })
          }
        ),
        compact && /* @__PURE__ */ jsx30(
          Button12,
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
    /* @__PURE__ */ jsx30("div", { className: "ups-tabs", children: TABS.map((tab) => /* @__PURE__ */ jsxs22(
      "button",
      {
        className: `ups-tab ${activeTab === tab.key ? "ups-tab--active" : ""}`,
        onClick: () => setActiveTab(tab.key),
        disabled,
        children: [
          tab.icon,
          /* @__PURE__ */ jsx30("span", { children: tab.label })
        ]
      },
      tab.key
    )) }),
    /* @__PURE__ */ jsxs22("div", { className: "ups-content", children: [
      activeTab === "quick" && /* @__PURE__ */ jsx30("div", { className: "ups-quick-grid", children: presets.map((p) => /* @__PURE__ */ jsx30(
        Button12,
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
      activeTab === "month" && /* @__PURE__ */ jsxs22("div", { className: "ups-month-section", children: [
        /* @__PURE__ */ jsxs22("div", { className: "ups-year-nav", children: [
          /* @__PURE__ */ jsx30(
            Button12,
            {
              variant: "outline-secondary",
              size: "sm",
              className: "ups-year-btn",
              onClick: () => handleYearChange(-1),
              disabled,
              children: /* @__PURE__ */ jsx30(FaChevronLeft, { size: 10 })
            }
          ),
          /* @__PURE__ */ jsx30("span", { className: "ups-year-label", children: selectedYear }),
          /* @__PURE__ */ jsx30(
            Button12,
            {
              variant: "outline-secondary",
              size: "sm",
              className: "ups-year-btn",
              onClick: () => handleYearChange(1),
              disabled,
              children: /* @__PURE__ */ jsx30(FaChevronRight, { size: 10 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx30("div", { className: "ups-month-grid", children: MONTHS.map((label, idx) => {
          const isSelected = selectedMonths.has(idx);
          const isCurrent = today.getFullYear() === selectedYear && today.getMonth() === idx;
          return /* @__PURE__ */ jsx30(
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
        /* @__PURE__ */ jsx30("p", { className: "ups-month-hint text-muted", children: "Shift+clique para range \xB7 Ctrl/Cmd+clique para multi-sele\xE7\xE3o" })
      ] }),
      activeTab === "custom" && /* @__PURE__ */ jsxs22("div", { className: "ups-custom-section", children: [
        /* @__PURE__ */ jsxs22(Row3, { className: "g-2", children: [
          /* @__PURE__ */ jsx30(Col3, { xs: 12, sm: 6, children: /* @__PURE__ */ jsxs22(Form6.Group, { children: [
            /* @__PURE__ */ jsx30(Form6.Label, { className: "small text-muted mb-1", children: "In\xEDcio" }),
            /* @__PURE__ */ jsx30(
              Form6.Control,
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
          /* @__PURE__ */ jsx30(Col3, { xs: 12, sm: 6, children: /* @__PURE__ */ jsxs22(Form6.Group, { children: [
            /* @__PURE__ */ jsx30(Form6.Label, { className: "small text-muted mb-1", children: "Fim" }),
            /* @__PURE__ */ jsx30(
              Form6.Control,
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
        /* @__PURE__ */ jsx30("div", { className: "d-flex justify-content-end mt-2", children: /* @__PURE__ */ jsx30(
          Button12,
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
import { useState as useState12 } from "react";
import {
  Button as Button13,
  Card as Card4,
  Col as Col4,
  Form as Form7,
  Row as Row4,
  Spinner as Spinner4,
  Badge as Badge2,
  InputGroup as InputGroup2
} from "react-bootstrap";
import { FiMail, FiSearch, FiUser, FiX, FiPlus, FiSend } from "react-icons/fi";
import { Fragment as Fragment8, jsx as jsx31, jsxs as jsxs23 } from "react/jsx-runtime";
var MailSender = ({
  htmlContent,
  companyName,
  onFetchEmails,
  onSendEmail,
  hide = false,
  renderTrigger
}) => {
  const [opened, setOpened] = useState12(false);
  const [addingEmail, setAddingEmail] = useState12(false);
  const [selectedEmails, setSelectedEmails] = useState12([]);
  const [emails, setEmails] = useState12([]);
  const [loading, setLoading] = useState12(false);
  const [postLoading, setPostLoading] = useState12(false);
  const [customEmail, setCustomEmail] = useState12("");
  const [emailError, setEmailError] = useState12("");
  const [searchFilter, setSearchFilter] = useState12("");
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
    return /* @__PURE__ */ jsx31(Button13, { disabled: loading, className: "w-100", onClick: handleOpen, children: loading ? "Carregando..." : "Enviar por E-mail" });
  }
  return /* @__PURE__ */ jsxs23(
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
        /* @__PURE__ */ jsx31(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              color: "white",
              padding: "25px"
            },
            children: /* @__PURE__ */ jsxs23("div", { className: "d-flex justify-content-between align-items-center", children: [
              /* @__PURE__ */ jsxs23("div", { children: [
                /* @__PURE__ */ jsxs23("h4", { className: "mb-1", style: { fontWeight: "600", fontSize: "22px" }, children: [
                  /* @__PURE__ */ jsx31(FiMail, { className: "me-2", size: 20 }),
                  "Enviar Relat\xF3rio por E-mail"
                ] }),
                /* @__PURE__ */ jsxs23("small", { style: { opacity: "0.9", fontSize: "14px" }, children: [
                  "Selecione os destinat\xE1rios para envio do relat\xF3rio de ",
                  companyName
                ] })
              ] }),
              /* @__PURE__ */ jsxs23("div", { className: "d-flex gap-2", children: [
                /* @__PURE__ */ jsx31(
                  Button13,
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
                    children: postLoading ? /* @__PURE__ */ jsxs23(Fragment8, { children: [
                      /* @__PURE__ */ jsx31(Spinner4, { size: "sm", className: "me-2" }),
                      "Enviando..."
                    ] }) : /* @__PURE__ */ jsxs23(Fragment8, { children: [
                      /* @__PURE__ */ jsx31(FiSend, { className: "me-2", size: 14 }),
                      "Enviar E-mail"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx31(
                  Button13,
                  {
                    variant: "outline-light",
                    onClick: () => setOpened(false),
                    disabled: postLoading,
                    style: { borderRadius: "8px", width: "40px", height: "40px" },
                    children: /* @__PURE__ */ jsx31(FiX, { size: 16 })
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs23("div", { style: { padding: "25px" }, children: [
          /* @__PURE__ */ jsx31(Card4, { className: "mb-4", style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ jsxs23(Card4.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ jsxs23(Row4, { className: "align-items-center", children: [
              /* @__PURE__ */ jsxs23(Col4, { md: 6, children: [
                /* @__PURE__ */ jsx31("h6", { className: "mb-2", style: { color: "#495057", fontWeight: "600" }, children: "\u{1F527} Filtros e A\xE7\xF5es" }),
                /* @__PURE__ */ jsxs23(InputGroup2, { style: { maxWidth: "300px" }, children: [
                  /* @__PURE__ */ jsx31(InputGroup2.Text, { style: { backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }, children: /* @__PURE__ */ jsx31(FiSearch, { size: 14, color: "#6c757d" }) }),
                  /* @__PURE__ */ jsx31(
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
              /* @__PURE__ */ jsx31(Col4, { md: 6, className: "text-end", children: /* @__PURE__ */ jsx31(
                Button13,
                {
                  variant: addingEmail ? "outline-secondary" : "outline-primary",
                  size: "sm",
                  onClick: () => setAddingEmail(!addingEmail),
                  disabled: postLoading,
                  style: { borderRadius: "8px" },
                  children: addingEmail ? /* @__PURE__ */ jsxs23(Fragment8, { children: [
                    /* @__PURE__ */ jsx31(FiX, { className: "me-1", size: 14 }),
                    "Cancelar"
                  ] }) : /* @__PURE__ */ jsxs23(Fragment8, { children: [
                    /* @__PURE__ */ jsx31(FiPlus, { className: "me-1", size: 14 }),
                    "E-mail Personalizado"
                  ] })
                }
              ) })
            ] }),
            addingEmail && /* @__PURE__ */ jsxs23(
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
                  /* @__PURE__ */ jsx31("h6", { className: "mb-3", style: { color: "#1976d2", fontWeight: "600" }, children: "\u2709\uFE0F Adicionar E-mail Personalizado" }),
                  /* @__PURE__ */ jsxs23(Row4, { className: "align-items-end", children: [
                    /* @__PURE__ */ jsxs23(Col4, { md: 8, children: [
                      /* @__PURE__ */ jsx31(Form7.Label, { style: { fontSize: "13px", color: "#6c757d", fontWeight: "500" }, children: "Endere\xE7o de E-mail" }),
                      /* @__PURE__ */ jsx31(
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
                      /* @__PURE__ */ jsx31(Form7.Control.Feedback, { type: "invalid", children: emailError })
                    ] }),
                    /* @__PURE__ */ jsx31(Col4, { md: 4, children: /* @__PURE__ */ jsxs23(
                      Button13,
                      {
                        variant: "success",
                        onClick: handleEmailAdd,
                        disabled: postLoading,
                        style: { borderRadius: "8px", width: "100%" },
                        children: [
                          /* @__PURE__ */ jsx31(FiPlus, { className: "me-1", size: 14 }),
                          "Adicionar"
                        ]
                      }
                    ) })
                  ] })
                ]
              }
            )
          ] }) }),
          selectedEmails.length > 0 && /* @__PURE__ */ jsx31(Card4, { className: "mb-4", style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ jsxs23(Card4.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ jsxs23("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [
              /* @__PURE__ */ jsx31("h6", { className: "mb-0", style: { color: "#495057", fontWeight: "600" }, children: "\u{1F4CB} Destinat\xE1rios Selecionados" }),
              /* @__PURE__ */ jsxs23(Badge2, { bg: "primary", style: { fontSize: "12px", padding: "6px 12px" }, children: [
                selectedEmails.length,
                " selecionado",
                selectedEmails.length > 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsx31("div", { className: "d-flex flex-wrap gap-2", children: selectedEmails.map((email, index) => /* @__PURE__ */ jsxs23(
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
                  /* @__PURE__ */ jsx31(FiUser, { size: 12, className: "me-2", color: "#1976d2" }),
                  /* @__PURE__ */ jsx31("span", { children: email.email || email }),
                  /* @__PURE__ */ jsx31(
                    Button13,
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
                      children: /* @__PURE__ */ jsx31(FiX, { size: 14 })
                    }
                  )
                ]
              },
              index
            )) })
          ] }) }),
          /* @__PURE__ */ jsx31(Card4, { style: { border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }, children: /* @__PURE__ */ jsxs23(Card4.Body, { style: { padding: "20px" }, children: [
            /* @__PURE__ */ jsxs23("h6", { className: "mb-3", style: { color: "#495057", fontWeight: "600" }, children: [
              /* @__PURE__ */ jsx31(FiUser, { className: "me-2", size: 16 }),
              "E-mails de ",
              companyName
            ] }),
            loading ? /* @__PURE__ */ jsxs23("div", { className: "text-center py-4", children: [
              /* @__PURE__ */ jsx31(Spinner4, {}),
              /* @__PURE__ */ jsx31("p", { className: "mt-2 text-muted", children: "Carregando e-mails..." })
            ] }) : filteredEmails.length === 0 ? /* @__PURE__ */ jsx31("div", { className: "text-center py-4", children: /* @__PURE__ */ jsx31("p", { className: "text-muted mb-0", children: searchFilter ? "Nenhum e-mail encontrado com esse filtro" : "Nenhum e-mail dispon\xEDvel" }) }) : /* @__PURE__ */ jsx31(Row4, { children: filteredEmails.map((email) => /* @__PURE__ */ jsx31(Col4, { xs: 12, sm: 6, lg: 4, className: "mb-3", children: /* @__PURE__ */ jsx31(
              Card4,
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
                children: /* @__PURE__ */ jsxs23(Card4.Body, { style: { padding: "15px", textAlign: "center" }, children: [
                  /* @__PURE__ */ jsx31(FiMail, { size: 20, color: "#007bff", className: "mb-2" }),
                  /* @__PURE__ */ jsx31(
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
import { useEffect as useEffect5, useMemo as useMemo3, useState as useState13 } from "react";
import { FloatingLabel, Form as Form8, InputGroup as InputGroup3, ListGroup as ListGroup2, Spinner as Spinner5 } from "react-bootstrap";
import { Fragment as Fragment9, jsx as jsx32, jsxs as jsxs24 } from "react/jsx-runtime";
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
  const [liItem, setListItem] = useState13([]);
  const [options, setOptions] = useState13([]);
  const [input, setInput] = useState13("");
  const [hide, setHide] = useState13(true);
  const [onLoaded, setOnLoaded] = useState13(false);
  const [loading, setLoading] = useState13(false);
  const cacheStore = useMemo3(() => {
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
    if (!Array.isArray(ops) || ops.length === 0) return;
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
  return /* @__PURE__ */ jsxs24(
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
        !hideComponent && /* @__PURE__ */ jsxs24(Fragment9, { children: [
          labelPosition === "top" && title && /* @__PURE__ */ jsx32(Form8.Label, { className: "fw-semibold small mb-1", children: title }),
          /* @__PURE__ */ jsxs24(InputGroup3, { children: [
            labelPosition === "floating" ? /* @__PURE__ */ jsx32(FloatingLabel, { controlId: "floatingInput", label: title, style: { zIndex: 0, flex: 1 }, children: /* @__PURE__ */ jsx32(
              Form8.Control,
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
            ) }) : /* @__PURE__ */ jsx32(
              Form8.Control,
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
            loading && /* @__PURE__ */ jsx32(InputGroup3.Text, { children: /* @__PURE__ */ jsx32(Spinner5, { animation: "border", size: "sm" }) }),
            !disableComponent && (actionButton == null ? void 0 : actionButton(() => setInput(""))),
            !disableComponent && (actionButton2 == null ? void 0 : actionButton2(input))
          ] })
        ] }),
        /* @__PURE__ */ jsx32(
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
            children: (maxItems ? liItem.slice(0, maxItems) : liItem).map((li, index) => /* @__PURE__ */ jsx32(
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

// src/forms/GenericForm.tsx
import { useState as useState14 } from "react";
import { Button as Button14, Form as Form9 } from "react-bootstrap";
import { jsx as jsx33, jsxs as jsxs25 } from "react/jsx-runtime";
var GenericForm = ({ fields, onSubmit, renderCustomSelect }) => {
  const [formValues, setFormValues] = useState14({});
  const [errors, setErrors] = useState14({});
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
        return /* @__PURE__ */ jsxs25(Form9.Group, { className: "mb-3", children: [
          /* @__PURE__ */ jsx33(Form9.Label, { children: label }),
          /* @__PURE__ */ jsx33(
            Form9.Control,
            {
              type,
              placeholder,
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key]
            }
          ),
          /* @__PURE__ */ jsx33(Form9.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      case "select": {
        const orderedOptions = (options || []).filter((opt) => opt && opt.value !== void 0 && opt.label !== void 0).sort((a, b) => a.label.localeCompare(b.label));
        return /* @__PURE__ */ jsxs25(Form9.Group, { className: "mb-3", children: [
          /* @__PURE__ */ jsx33(Form9.Label, { children: label }),
          /* @__PURE__ */ jsxs25(
            Form9.Select,
            {
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key],
              children: [
                /* @__PURE__ */ jsx33("option", { value: "", children: "Selecione..." }),
                orderedOptions.map((option) => /* @__PURE__ */ jsx33("option", { value: option.value, children: option.label }, String(option.value)))
              ]
            }
          ),
          /* @__PURE__ */ jsx33(Form9.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      }
      case "custom-select":
        if (renderCustomSelect) {
          return /* @__PURE__ */ jsxs25("div", { children: [
            renderCustomSelect({
              label,
              value,
              options,
              onChange: (v) => handleChange(key, v),
              placeholder
            }),
            errors[key] && /* @__PURE__ */ jsx33("div", { className: "invalid-feedback d-block", children: errors[key] })
          ] }, key);
        }
        return null;
      case "date":
        return /* @__PURE__ */ jsxs25(Form9.Group, { className: "mb-3", children: [
          /* @__PURE__ */ jsx33(Form9.Label, { children: label }),
          /* @__PURE__ */ jsx33(
            Form9.Control,
            {
              type: "date",
              value,
              onChange: (e) => handleChange(key, e.target.value),
              isInvalid: !!errors[key]
            }
          ),
          /* @__PURE__ */ jsx33(Form9.Control.Feedback, { type: "invalid", children: errors[key] })
        ] }, key);
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs25(Form9, { onSubmit: handleSubmit, children: [
    fields.map((field) => renderField(field)),
    /* @__PURE__ */ jsx33("div", { className: "d-grid", children: /* @__PURE__ */ jsx33(Button14, { variant: "primary", type: "submit", children: "Salvar" }) })
  ] });
};
var GenericForm_default = GenericForm;

// src/forms/GenericSelect.tsx
import { useEffect as useEffect6, useState as useState15 } from "react";
import { Form as Form10, InputGroup as InputGroup4 } from "react-bootstrap";
import { Fragment as Fragment10, jsx as jsx34, jsxs as jsxs26 } from "react/jsx-runtime";
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
  const [options, setOptions] = useState15(ops || []);
  useEffect6(() => {
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
  const selectContent = /* @__PURE__ */ jsxs26(
    Form10.Control,
    {
      disabled: locked,
      as: "select",
      value: selection,
      onChange: (event) => getTrueValue(event.target.selectedIndex),
      children: [
        /* @__PURE__ */ jsxs26("option", { value: void 0, children: [
          "-- ",
          defaultPlaceholder,
          " --"
        ] }, 0),
        (options == null ? void 0 : options.length) > 0 && options.map((op, index) => {
          const val = valueType && op[valueType] || op.id || op;
          let fill = displayType && op[displayType] || op;
          if (typeof fill == "object") fill = "";
          return /* @__PURE__ */ jsx34("option", { value: val, children: fill }, op.id || index);
        })
      ]
    }
  );
  if (actionClick) {
    return /* @__PURE__ */ jsxs26(Fragment10, { children: [
      /* @__PURE__ */ jsx34(Form10.Label, { style: { fontWeight: isBold ? "bold" : void 0 }, hidden: noLabel, children: title }),
      /* @__PURE__ */ jsxs26(InputGroup4, { children: [
        selectContent,
        actionClick()
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs26(Fragment10, { children: [
    /* @__PURE__ */ jsx34(Form10.Label, { style: { fontWeight: isBold ? "bold" : void 0 }, hidden: noLabel, children: title }),
    selectContent
  ] });
};
var GenericSelect_default = GenericSelect;

// src/forms/FormField.tsx
import { FloatingLabel as FloatingLabel2, Form as Form11, InputGroup as InputGroup5 } from "react-bootstrap";
import { jsx as jsx35, jsxs as jsxs27 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx35(Form11.Control, { ...fieldProps });
  };
  if (hide) return null;
  const useFloating = labelPosition === "floating" && !asTextArea;
  return /* @__PURE__ */ jsxs27(
    Form11.Group,
    {
      onFocusCapture: (e) => onFocusHandler(e.target.value),
      onMouseLeave: onMouseLv,
      onKeyDown: onKeyDownHandler,
      style: { marginTop: 4, marginBottom: 4, width: "100%" },
      controlId: !useFloating ? controlId : void 0,
      children: [
        !useFloating && label && /* @__PURE__ */ jsx35(Form11.Label, { className: "fw-semibold small mb-1", children: label }),
        /* @__PURE__ */ jsxs27(InputGroup5, { children: [
          useFloating ? /* @__PURE__ */ jsx35(FloatingLabel2, { style: { zIndex: 0, flex: 1 }, label, controlId: controlId || "floatingInput", children: renderField() }) : renderField(),
          actionClick && actionClick(),
          actionClick2 && actionClick2()
        ] }),
        feedback && isInvalid && /* @__PURE__ */ jsx35(Form11.Control.Feedback, { type: "invalid", style: { display: "block" }, children: feedback })
      ]
    }
  );
};

// src/forms/ClickToWriteField.tsx
import { useState as useState16, useEffect as useEffect7, useRef as useRef4 } from "react";
import { Button as Button15 } from "react-bootstrap";
import { jsx as jsx36, jsxs as jsxs28 } from "react/jsx-runtime";
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
  const [showClick, setShowClick] = useState16(false);
  const inputRef = useRef4(null);
  useEffect7(() => {
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
  return /* @__PURE__ */ jsxs28("div", { style: { display: "flex", width: "100%", margin: 0, padding: 0 }, children: [
    !showClick && /* @__PURE__ */ jsx36(
      Button15,
      {
        style: { flexGrow: 1 },
        onClick: handleShowClick,
        ...buttonProps,
        children: resolveButtonDisplay()
      }
    ),
    showClick && /* @__PURE__ */ jsx36(
      FormField,
      {
        reference: inputRef,
        others: { ...fieldProps, onKeyUp: closeOnEscape },
        hide: !showClick,
        ty: fieldType,
        label: fieldLabel,
        onValueUpdate: onFieldValueUpdate,
        onBlur: () => setShowClick(false),
        actionClick: () => enableFieldActionButton ? /* @__PURE__ */ jsx36(
          Button15,
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
import { Card as Card5, Form as Form12, Row as Row5, Col as Col5 } from "react-bootstrap";
import { FaPalette } from "react-icons/fa";
import { jsx as jsx37, jsxs as jsxs29 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs29(
    Card5,
    {
      className: "shadow-sm border-primary-hover mb-3",
      style: { maxWidth: "320px", transition: "0.3s" },
      children: [
        /* @__PURE__ */ jsxs29(Card5.Header, { className: "bg-light d-flex align-items-center", children: [
          /* @__PURE__ */ jsx37(FaPalette, { className: "me-2 text-primary" }),
          /* @__PURE__ */ jsx37("span", { className: "fw-medium", children: title })
        ] }),
        /* @__PURE__ */ jsxs29(Card5.Body, { children: [
          /* @__PURE__ */ jsxs29(Row5, { className: "g-3 align-items-center mb-3", children: [
            /* @__PURE__ */ jsx37(Col5, { xs: "auto", children: /* @__PURE__ */ jsx37(
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
            /* @__PURE__ */ jsx37(Col5, { children: /* @__PURE__ */ jsx37(
              Form12.Control,
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
          /* @__PURE__ */ jsx37(Row5, { className: "g-2 justify-content-start", children: presetColors.map((cor) => /* @__PURE__ */ jsx37(Col5, { xs: "auto", children: /* @__PURE__ */ jsx37(
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
import { Form as Form13 } from "react-bootstrap";
import { jsx as jsx38 } from "react/jsx-runtime";
var Switch = ({
  label,
  onSwitchChange,
  value,
  disabled = false,
  defaultChecked,
  ...props
}) => {
  return /* @__PURE__ */ jsx38(
    Form13.Check,
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
import { useCallback as useCallback2 } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import { Fragment as Fragment11, jsx as jsx39, jsxs as jsxs30 } from "react/jsx-runtime";
var UploadArea = ({
  onFilePut,
  anexo,
  accept = { "image/jpeg": [], "image/png": [] },
  maxSize = 50 * 1024 * 1024
}) => {
  const onDrop = useCallback2(
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
  return /* @__PURE__ */ jsxs30(
    "div",
    {
      ...getRootProps(),
      className: `upload-area 
				${isDragActive ? "drag-active" : ""} 
				${hasAnexo ? "upload-has-file" : ""}
			`,
      children: [
        /* @__PURE__ */ jsx39("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs30("div", { className: "upload-content", children: [
          /* @__PURE__ */ jsx39("span", { className: "upload-icon", children: hasAnexo ? /* @__PURE__ */ jsx39(FiCheckCircle, { size: 24 }) : /* @__PURE__ */ jsx39(FiUploadCloud, { size: 24 }) }),
          hasAnexo ? /* @__PURE__ */ jsxs30(Fragment11, { children: [
            /* @__PURE__ */ jsx39("p", { className: "upload-link", children: "Arquivo anexado" }),
            /* @__PURE__ */ jsx39("p", { className: "upload-info", children: anexo == null ? void 0 : anexo.name })
          ] }) : /* @__PURE__ */ jsxs30(Fragment11, { children: [
            /* @__PURE__ */ jsxs30("p", { children: [
              /* @__PURE__ */ jsx39("span", { className: "upload-link", children: "Adicione" }),
              " ou arraste arquivos aqui"
            ] }),
            /* @__PURE__ */ jsxs30("p", { className: "upload-info", children: [
              "Formatos aceitos: ",
              /* @__PURE__ */ jsx39("b", { children: Object.keys(accept).map((t) => t.split("/")[1].toUpperCase()).join(", ") }),
              " | Tamanho m\xE1ximo:",
              " ",
              /* @__PURE__ */ jsxs30("b", { children: [
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
import {
  AnexoManager
} from "@teraprox/ui-kit-core";

// src/forms/FindRecursoByTagField.tsx
import {
  FindRecursoByTagField,
  FindRecursoByTagField as FindRecursoByTagField2
} from "@teraprox/ui-kit-sgm";

// src/forms/SectorSelector.tsx
import { useState as useState17, useEffect as useEffect8 } from "react";
import { Form as Form14 } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { jsx as jsx40, jsxs as jsxs31 } from "react/jsx-runtime";
var SectorSelector = ({
  setores,
  onSectorSelect,
  selectionLabel = "Selecione o Setor",
  selectionPlaceholder = "Selecione o setor",
  hideComponent = false,
  defaultSectorName = false,
  allowAll = false
}) => {
  const [expanded, setExpanded] = useState17(false);
  const [selectedSector, setSelectedSector] = useState17(null);
  useEffect8(() => {
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
  return /* @__PURE__ */ jsxs31(Form14.Floating, { className: "sector-selector-floating", children: [
    /* @__PURE__ */ jsxs31("div", { className: "custom-select-container", onClick: toggleExpand, children: [
      /* @__PURE__ */ jsx40("span", { className: "selected-sector-label mt-1", children: (selectedSector == null ? void 0 : selectedSector.nome) || selectionPlaceholder }),
      /* @__PURE__ */ jsx40("div", { className: "zoom-container", children: expanded ? /* @__PURE__ */ jsx40(BsChevronUp, {}) : /* @__PURE__ */ jsx40(BsChevronDown, {}) })
    ] }),
    (selectedSector == null ? void 0 : selectedSector.nome) && /* @__PURE__ */ jsx40("label", { htmlFor: "floatingInputCustom", children: selectionLabel }),
    expanded && /* @__PURE__ */ jsxs31(
      "div",
      {
        className: "custom-dropdown-menu",
        onMouseLeave: () => setExpanded(false),
        children: [
          setorOptions.sort((a, b) => a.nome.localeCompare(b.nome)).map((setor, idx) => /* @__PURE__ */ jsx40(
            "div",
            {
              className: `dropdown-option ${setor.nome === (selectedSector == null ? void 0 : selectedSector.nome) ? "selected-option" : ""}`,
              onClick: () => handleSelectSetor(setor),
              children: setor.nome === "default" ? "Nenhum" : setor.nome
            },
            idx
          )),
          setores.length === 0 && /* @__PURE__ */ jsx40("div", { className: "dropdown-option text-muted italic", children: "Carregando setores..." })
        ]
      }
    )
  ] });
};

// src/forms/UnidadeMaterialForm.tsx
import { Button as Button16 } from "react-bootstrap";
import { jsx as jsx41, jsxs as jsxs32 } from "react/jsx-runtime";
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
  const renderNewMaterialButton = () => /* @__PURE__ */ jsx41(Button16, { onClick: onNavigateToCreateMaterial, size: "sm", variant: "outline-primary", children: "Novo Material" });
  const renderNewUnidadeButton = () => /* @__PURE__ */ jsx41(Button16, { onClick: onNavigateToCreateUnidade, size: "sm", variant: "outline-primary", children: "Nova Unidade" });
  return /* @__PURE__ */ jsxs32("div", { className: `unidade-material-form ${className}`, children: [
    !hideMaterial && /* @__PURE__ */ jsx41(
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
    !hideQuantidade && /* @__PURE__ */ jsx41(
      FormField,
      {
        label: "Quantidade",
        val: (_b = value == null ? void 0 : value.quantidade) != null ? _b : "",
        onValueUpdate: onQuantidadeUpdate,
        ty: "number"
      }
    ),
    !hideUnidade && /* @__PURE__ */ jsx41(
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
import { jsx as jsx42, jsxs as jsxs33 } from "react/jsx-runtime";
var IconLabelItem = ({
  icon,
  label,
  containerClassName = "",
  labelClassName = "",
  onClick,
  style
}) => {
  return /* @__PURE__ */ jsxs33("div", { className: containerClassName, onClick, style: { ...style, cursor: onClick ? "pointer" : "default" }, children: [
    icon,
    /* @__PURE__ */ jsx42("span", { className: labelClassName, children: label })
  ] });
};

// src/icons/IconLabelList.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var IconLabelList = ({ items, className = "" }) => {
  return /* @__PURE__ */ jsx43("div", { className: `icon-label-list ${className}`, children: items.map((item, index) => /* @__PURE__ */ jsx43(
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
import { useState as useState18 } from "react";
import { Modal as Modal4, Button as Button17, OverlayTrigger, Tooltip as Tooltip3 } from "react-bootstrap";
import { FiClock, FiCheck, FiTrash2 as FiTrash23 } from "react-icons/fi";
import dayjs5 from "dayjs";
import { Fragment as Fragment12, jsx as jsx44, jsxs as jsxs34 } from "react/jsx-runtime";
var NotificationItem = ({
  notification,
  onRead,
  onDismiss,
  emptyContentLabel = "Sem conte\xFAdo adicional dispon\xEDvel."
}) => {
  const [showModal, setShowModal] = useState18(false);
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
  return /* @__PURE__ */ jsxs34(Fragment12, { children: [
    /* @__PURE__ */ jsxs34(
      "div",
      {
        className: `notification-item-modern ${status === "unread" ? "unread" : ""}`,
        onClick: handleOpenModal,
        children: [
          /* @__PURE__ */ jsx44("div", { className: `notification-status-indicator ${status}`, children: status === "unread" ? /* @__PURE__ */ jsx44(FiClock, { size: 14 }) : /* @__PURE__ */ jsx44(FiCheck, { size: 14 }) }),
          /* @__PURE__ */ jsxs34("div", { className: "notification-main-content", children: [
            /* @__PURE__ */ jsx44("div", { className: "notification-header-row", children: /* @__PURE__ */ jsxs34("div", { className: "notification-title-modern", children: [
              /* @__PURE__ */ jsx44("span", { className: "notification-context", children: context }),
              contextId && /* @__PURE__ */ jsxs34(Fragment12, { children: [
                /* @__PURE__ */ jsx44("span", { className: "notification-separator", children: "/" }),
                /* @__PURE__ */ jsx44("span", { className: "notification-context-id", children: contextId })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx44("div", { className: "notification-preview", children: /* @__PURE__ */ jsx44("p", { className: "notification-content-preview", children: content || "Nova mensagem recebida" }) }),
            /* @__PURE__ */ jsxs34("div", { className: "notification-meta", children: [
              /* @__PURE__ */ jsxs34("div", { className: "notification-timestamp", children: [
                /* @__PURE__ */ jsx44(FiClock, { size: 12, className: "me-1" }),
                /* @__PURE__ */ jsx44("small", { children: dayjs5(createdAt).format("DD/MM/YYYY HH:mm") })
              ] }),
              readAt && /* @__PURE__ */ jsxs34("div", { className: "notification-read-time", children: [
                /* @__PURE__ */ jsx44(FiCheck, { size: 12, className: "me-1" }),
                /* @__PURE__ */ jsxs34("small", { children: [
                  "Lida em ",
                  dayjs5(readAt).format("DD/MM HH:mm")
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx44("div", { className: "notification-quick-actions", children: status === "unread" && /* @__PURE__ */ jsx44(
            OverlayTrigger,
            {
              placement: "top",
              overlay: /* @__PURE__ */ jsx44(Tooltip3, { children: "Descartar" }),
              children: /* @__PURE__ */ jsx44(
                "button",
                {
                  className: "notification-action-btn notification-dismiss-btn",
                  onClick: handleDismiss,
                  "aria-label": "Descartar notifica\xE7\xE3o",
                  children: /* @__PURE__ */ jsx44(FiTrash23, { size: 14 })
                }
              )
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs34(
      Modal4,
      {
        show: showModal,
        onHide: handleCloseModal,
        centered: true,
        className: "notification-modal",
        children: [
          /* @__PURE__ */ jsx44(Modal4.Header, { closeButton: true, className: "notification-modal-header", children: /* @__PURE__ */ jsx44(Modal4.Title, { className: "notification-modal-title", children: /* @__PURE__ */ jsxs34("div", { className: "d-flex align-items-center", children: [
            status === "unread" ? /* @__PURE__ */ jsx44(FiClock, { className: "me-2 text-warning" }) : /* @__PURE__ */ jsx44(FiCheck, { className: "me-2 text-success" }),
            "Detalhes da Notifica\xE7\xE3o"
          ] }) }) }),
          /* @__PURE__ */ jsx44(Modal4.Body, { className: "notification-modal-body", children: /* @__PURE__ */ jsxs34("div", { className: "notification-modal-content", children: [
            /* @__PURE__ */ jsxs34("div", { className: "notification-modal-meta", children: [
              /* @__PURE__ */ jsx44("h6", { className: "notification-modal-source", children: displayTitle }),
              /* @__PURE__ */ jsxs34("div", { className: "notification-modal-timestamps", children: [
                /* @__PURE__ */ jsxs34("small", { className: "text-muted", children: [
                  /* @__PURE__ */ jsx44(FiClock, { size: 12, className: "me-1" }),
                  "Criada em ",
                  dayjs5(createdAt).format("DD/MM/YYYY [\xE0s] HH:mm")
                ] }),
                readAt && /* @__PURE__ */ jsxs34("small", { className: "text-muted ms-3", children: [
                  /* @__PURE__ */ jsx44(FiCheck, { size: 12, className: "me-1" }),
                  "Lida em ",
                  dayjs5(readAt).format("DD/MM/YYYY [\xE0s] HH:mm")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx44("div", { className: "notification-modal-message", children: /* @__PURE__ */ jsx44("p", { className: "mb-0", children: content || emptyContentLabel }) })
          ] }) }),
          /* @__PURE__ */ jsxs34(Modal4.Footer, { className: "notification-modal-footer", children: [
            /* @__PURE__ */ jsx44(Button17, { variant: "outline-secondary", onClick: handleCloseModal, children: "Fechar" }),
            status === "unread" && /* @__PURE__ */ jsx44(Button17, { variant: "primary", onClick: handleReadAndClose, children: "Marcar como lida" })
          ] })
        ]
      }
    )
  ] });
};

// src/icons/NotificationBell.tsx
import { Dropdown as Dropdown2, Badge as Badge3 } from "react-bootstrap";
import { FiBell } from "react-icons/fi";
import { jsx as jsx45, jsxs as jsxs35 } from "react/jsx-runtime";
var NotificationBell = ({
  notifications,
  onItemRead,
  onItemDismiss,
  onMarkAllRead,
  size = 20,
  className = ""
}) => {
  const unreadCount = notifications.filter((n) => n.status === "unread").length;
  return /* @__PURE__ */ jsxs35(Dropdown2, { align: "end", className: `notification-bell-dropdown ${className}`, children: [
    /* @__PURE__ */ jsxs35(Dropdown2.Toggle, { as: "div", className: "position-relative cursor-pointer p-2", children: [
      /* @__PURE__ */ jsx45(FiBell, { size }),
      unreadCount > 0 && /* @__PURE__ */ jsx45(
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
    /* @__PURE__ */ jsxs35(
      Dropdown2.Menu,
      {
        className: "shadow-lg border-0",
        style: { width: "320px", padding: 0, maxHeight: "500px", overflowY: "auto" },
        children: [
          /* @__PURE__ */ jsxs35("div", { className: "p-3 border-bottom d-flex justify-content-between align-items-center bg-light", children: [
            /* @__PURE__ */ jsx45("h6", { className: "mb-0 fw-bold", children: "Notifica\xE7\xF5es" }),
            unreadCount > 0 && onMarkAllRead && /* @__PURE__ */ jsx45(
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
          /* @__PURE__ */ jsx45("div", { className: "notification-list", children: notifications.length > 0 ? notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((n) => /* @__PURE__ */ jsx45(
            NotificationItem,
            {
              notification: n,
              onRead: onItemRead,
              onDismiss: onItemDismiss
            },
            n.id
          )) : /* @__PURE__ */ jsxs35("div", { className: "p-4 text-center text-muted", children: [
            /* @__PURE__ */ jsx45(FiBell, { size: 24, className: "mb-2 opacity-25" }),
            /* @__PURE__ */ jsx45("p", { className: "mb-0 small", children: "Nenhuma notifica\xE7\xE3o por aqui." })
          ] }) }),
          notifications.length > 0 && /* @__PURE__ */ jsx45("div", { className: "p-2 border-top text-center bg-light", children: /* @__PURE__ */ jsxs35("small", { className: "text-muted", children: [
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
import { Modal as Modal5, Button as Button18 } from "react-bootstrap";
import { jsx as jsx46, jsxs as jsxs36 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs36(
    Modal5,
    {
      show,
      onHide: closeFunc,
      centered: true,
      style: dialogStyle,
      ...modalProps,
      children: [
        header && /* @__PURE__ */ jsx46(Modal5.Header, { closeButton: true, children: /* @__PURE__ */ jsx46(Modal5.Title, { children: renderPart(header) }) }),
        /* @__PURE__ */ jsx46(Modal5.Body, { style: bodyStyle, children: renderPart(body) }),
        footer && /* @__PURE__ */ jsxs36(Modal5.Footer, { children: [
          renderPart(footer),
          !footer && /* @__PURE__ */ jsx46(Button18, { variant: "secondary", onClick: closeFunc, children: "Fechar" })
        ] })
      ]
    }
  );
};
var ModalBasicTemplate_default = ModalBasicTemplate;

// src/modals/SelectDateModal.tsx
import { useState as useState19 } from "react";
import { Modal as Modal6, Button as Button19, Form as Form15 } from "react-bootstrap";
import dayjs6 from "dayjs";
import { jsx as jsx47, jsxs as jsxs37 } from "react/jsx-runtime";
var SelectDateModal = ({
  show,
  onClose,
  onSelect,
  title = "Selecionar Data",
  label = "Escolha a data",
  initialDate,
  allowFuture = true
}) => {
  const [selectedDate, setSelectedDate] = useState19(
    initialDate || dayjs6().format("YYYY-MM-DDTHH:mm")
  );
  const handleConfirm = () => {
    onSelect(selectedDate);
    onClose();
  };
  return /* @__PURE__ */ jsxs37(Modal6, { show, onHide: onClose, centered: true, size: "sm", children: [
    /* @__PURE__ */ jsx47(Modal6.Header, { closeButton: true, children: /* @__PURE__ */ jsx47(Modal6.Title, { children: title }) }),
    /* @__PURE__ */ jsx47(Modal6.Body, { children: /* @__PURE__ */ jsxs37(Form15.Group, { children: [
      /* @__PURE__ */ jsx47(Form15.Label, { children: label }),
      /* @__PURE__ */ jsx47(
        Form15.Control,
        {
          type: "datetime-local",
          value: selectedDate,
          max: allowFuture ? void 0 : dayjs6().format("YYYY-MM-DDTHH:mm"),
          onChange: (e) => setSelectedDate(e.target.value)
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs37(Modal6.Footer, { children: [
      /* @__PURE__ */ jsx47(Button19, { variant: "outline-secondary", onClick: onClose, children: "Cancelar" }),
      /* @__PURE__ */ jsx47(Button19, { variant: "primary", onClick: handleConfirm, children: "Confirmar" })
    ] })
  ] });
};

// src/modals/JustificativaModal.tsx
import { useState as useState20, useEffect as useEffect9 } from "react";
import { Modal as Modal7, Button as Button20, Form as Form16, ListGroup as ListGroup3, Badge as Badge4, OverlayTrigger as OverlayTrigger2, Tooltip as Tooltip4 } from "react-bootstrap";
import { FaTrashAlt, FaUndo } from "react-icons/fa";
import dayjs7 from "dayjs";
import { jsx as jsx48, jsxs as jsxs38 } from "react/jsx-runtime";
var JustificativaModal = ({
  show,
  onClose,
  justificativas: initialJustificativas = [],
  currentUserId,
  currentUserName,
  onUpdateJustificativas
}) => {
  const [localJustificativas, setLocalJustificativas] = useState20(initialJustificativas);
  const [novaDescricao, setNovaDescricao] = useState20("");
  const [editandoId, setEditandoId] = useState20(null);
  useEffect9(() => {
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
  return /* @__PURE__ */ jsxs38(Modal7, { show, onHide: onClose, centered: true, size: "lg", children: [
    /* @__PURE__ */ jsx48(Modal7.Header, { closeButton: true, children: /* @__PURE__ */ jsx48(Modal7.Title, { children: "Justificativas / Coment\xE1rios" }) }),
    /* @__PURE__ */ jsxs38(Modal7.Body, { children: [
      /* @__PURE__ */ jsxs38(Form16, { className: "mb-4", children: [
        /* @__PURE__ */ jsxs38(Form16.Group, { controlId: "justificativaInput", className: "mb-2", children: [
          /* @__PURE__ */ jsx48(Form16.Label, { className: "small text-muted fw-bold", children: "NOVO REGISTRO" }),
          /* @__PURE__ */ jsx48(
            Form16.Control,
            {
              as: "textarea",
              rows: 2,
              value: novaDescricao,
              onChange: (e) => setNovaDescricao(e.target.value),
              placeholder: "Descreva o motivo ou informa\xE7\xE3o adicional..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx48("div", { className: "d-flex justify-content-end", children: /* @__PURE__ */ jsx48(Button20, { variant: "primary", size: "sm", onClick: handleAddOrEdit, children: editandoId ? "Salvar Edi\xE7\xE3o" : "Adicionar Justificativa" }) })
      ] }),
      /* @__PURE__ */ jsx48(ListGroup3, { className: "border-0", children: localJustificativas.map((j) => {
        var _a, _b, _c;
        const isMe = ((_a = j.user) == null ? void 0 : _a.userId) === currentUserId;
        return /* @__PURE__ */ jsxs38(
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
              /* @__PURE__ */ jsxs38("div", { className: "d-flex align-items-center mb-1", style: { width: "100%", justifyContent: isMe ? "flex-start" : "flex-end" }, children: [
                /* @__PURE__ */ jsx48("span", { className: "small fw-bold text-dark me-2", children: isMe ? "Voc\xEA" : ((_b = j.user) == null ? void 0 : _b.userName) || ((_c = j.user) == null ? void 0 : _c.firstName) || "Usu\xE1rio" }),
                /* @__PURE__ */ jsx48(Badge4, { bg: "secondary", style: { fontSize: "0.65rem" }, children: dayjs7(j.createdAt).format("DD/MM [\xE0s] HH:mm") })
              ] }),
              /* @__PURE__ */ jsx48(
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
              isMe && /* @__PURE__ */ jsx48("div", { className: "mt-1 d-flex gap-2", children: j.removed ? /* @__PURE__ */ jsx48(OverlayTrigger2, { placement: "top", overlay: /* @__PURE__ */ jsx48(Tooltip4, { children: "Desfazer" }), children: /* @__PURE__ */ jsx48(
                FaUndo,
                {
                  onClick: () => handleUndoRemove(j.id),
                  className: "text-success cursor-pointer",
                  size: 14
                }
              ) }) : /* @__PURE__ */ jsx48(OverlayTrigger2, { placement: "top", overlay: /* @__PURE__ */ jsx48(Tooltip4, { children: "Remover" }), children: /* @__PURE__ */ jsx48(
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
    /* @__PURE__ */ jsx48(Modal7.Footer, { children: /* @__PURE__ */ jsx48(Button20, { variant: "outline-secondary", onClick: onClose, children: "Fechar" }) })
  ] });
};

// src/modals/ImageViewModal.tsx
import { useState as useState21, useEffect as useEffect10 } from "react";
import { Button as Button21 } from "react-bootstrap";
import { jsx as jsx49, jsxs as jsxs39 } from "react/jsx-runtime";
var ImageViewModal = ({
  show,
  onHide,
  imagesData = [],
  initialImageData,
  imageAltText = "Visualiza\xE7\xE3o de imagem",
  resolveImageUrl
}) => {
  const [selectedImageKey, setSelectedImageKey] = useState21(null);
  const [imageSrc, setImageSrc] = useState21(null);
  const [currentAuthor, setCurrentAuthor] = useState21("Desconhecido");
  useEffect10(() => {
    if (show && initialImageData) {
      setSelectedImageKey(initialImageData.key);
      setCurrentAuthor(initialImageData.author || "Desconhecido");
    } else if (show && imagesData.length > 0) {
      setSelectedImageKey(imagesData[0].key);
      setCurrentAuthor(imagesData[0].author || "Desconhecido");
    }
  }, [show, initialImageData]);
  useEffect10(() => {
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
    return /* @__PURE__ */ jsx49("div", { className: "mb-3 d-flex flex-wrap justify-content-center gap-2", children: imagesData.map((img, idx) => /* @__PURE__ */ jsx49(
      Button21,
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
  const body = /* @__PURE__ */ jsxs39("div", { className: "text-center", children: [
    renderImageSelector(),
    imageSrc ? /* @__PURE__ */ jsx49(
      "img",
      {
        src: imageSrc,
        alt: imageAltText,
        className: "img-fluid rounded shadow-sm",
        style: { maxHeight: "75vh", objectFit: "contain" }
      }
    ) : /* @__PURE__ */ jsx49("div", { className: "p-5 text-muted", children: "Aguardando imagem..." })
  ] });
  return /* @__PURE__ */ jsx49(
    ModalBasicTemplate_default,
    {
      header: "Visualiza\xE7\xE3o de Imagem",
      closeFunc: onHide,
      show,
      body,
      props: { size: "lg" },
      footer: () => /* @__PURE__ */ jsxs39("div", { className: "w-100 d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs39("small", { className: "text-muted", children: [
          "Enviado por: ",
          /* @__PURE__ */ jsx49("strong", { children: currentAuthor })
        ] }),
        /* @__PURE__ */ jsx49(Button21, { variant: "outline-secondary", size: "sm", onClick: onHide, children: "Fechar" })
      ] })
    }
  );
};

// src/qr/QrReader.tsx
import QrScanner from "qr-scanner";
import { useEffect as useEffect11, useRef as useRef5, useState as useState22 } from "react";
import { jsx as jsx50, jsxs as jsxs40 } from "react/jsx-runtime";
var QrReader = ({ callback }) => {
  const scanner = useRef5(null);
  const videoEl = useRef5(null);
  const qrBoxEl = useRef5(null);
  const [qrOn, setQrOn] = useState22(true);
  const [scannedResult, setScannedResult] = useState22("");
  const onScanSuccess = (result) => {
    setScannedResult(result.data);
    callback(result.data);
  };
  const onScanFail = (err) => {
    if (typeof err === "string" && !err.includes("No QR code found")) {
      console.error("QR Scanner Error:", err);
    }
  };
  useEffect11(() => {
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
  useEffect11(() => {
    if (!qrOn) {
      alert(
        "C\xE2mera est\xE1 bloqueada ou inacess\xEDvel. Por favor, habilite a c\xE2mera nas permiss\xF5es do seu navegador e recarregue a p\xE1gina."
      );
    }
  }, [qrOn]);
  return /* @__PURE__ */ jsxs40("div", { className: "qr-reader", style: { position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx50("video", { ref: videoEl, style: { width: "100%", borderRadius: "8px" } }),
    /* @__PURE__ */ jsx50("div", { ref: qrBoxEl, className: "qr-box" }),
    scannedResult && /* @__PURE__ */ jsxs40(
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
import { useState as useState23 } from "react";
import { BsQrCode } from "react-icons/bs";
import { jsx as jsx51, jsxs as jsxs41 } from "react/jsx-runtime";
var QrCodeScanButton = ({ callback, size = 25 }) => {
  const [showQr, setShowQr] = useState23(false);
  const toggleQr = () => {
    setShowQr((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs41(
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
        /* @__PURE__ */ jsx51(BsQrCode, { size }),
        showQr && /* @__PURE__ */ jsx51(
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
            children: /* @__PURE__ */ jsxs41("div", { style: { width: "100%", maxWidth: "500px", backgroundColor: "#fff", borderRadius: "12px", padding: "20px", position: "relative" }, children: [
              /* @__PURE__ */ jsx51(
                "div",
                {
                  onClick: toggleQr,
                  style: { position: "absolute", top: "10px", right: "15px", fontSize: "1.5rem", cursor: "pointer", zIndex: 10001 },
                  children: "\xD7"
                }
              ),
              /* @__PURE__ */ jsx51("h5", { className: "mb-3 text-center", children: "Escaneie o QR Code" }),
              /* @__PURE__ */ jsx51(
                QrReader,
                {
                  callback: (v) => {
                    toggleQr();
                    callback(v);
                  }
                }
              ),
              /* @__PURE__ */ jsx51("p", { className: "mt-3 text-muted text-center small", children: "Aponte a c\xE2mera para o c\xF3digo" })
            ] })
          }
        )
      ]
    }
  );
};

// src/tables/ReusableTableWithModal.tsx
import { useState as useState24, useEffect as useEffect12 } from "react";
import { Table, Button as Button22, Modal as Modal8 } from "react-bootstrap";
import { Fragment as Fragment13, jsx as jsx52, jsxs as jsxs42 } from "react/jsx-runtime";
var ReusableTableWithModal = ({
  fetchDataCallback,
  modalButtonCallback,
  configureColumnsCallback,
  headers,
  modalContent,
  confirmLabel = "Aceitar",
  onFetchData
}) => {
  const [data, setData] = useState24([]);
  const [selectedItem, setSelectedItem] = useState24(null);
  const [showModal, setShowModal] = useState24(false);
  const [loading, setLoading] = useState24(false);
  const [tableDataRows, setTableDataRows] = useState24([]);
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
  useEffect12(() => {
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
  return /* @__PURE__ */ jsxs42(Fragment13, { children: [
    /* @__PURE__ */ jsxs42(Table, { striped: true, bordered: true, hover: true, responsive: true, children: [
      /* @__PURE__ */ jsx52("thead", { children: /* @__PURE__ */ jsx52("tr", { children: headers.map((col, index) => /* @__PURE__ */ jsx52("th", { children: col }, index)) }) }),
      /* @__PURE__ */ jsx52("tbody", { children: loading ? /* @__PURE__ */ jsx52("tr", { children: /* @__PURE__ */ jsx52("td", { colSpan: headers.length, className: "text-center py-4", children: "Carregando..." }) }) : tableDataRows.length > 0 ? tableDataRows.map((td, index) => /* @__PURE__ */ jsx52(
        "tr",
        {
          onClick: () => handleRowClick(td),
          style: { cursor: "pointer" },
          children: td.columns.map((col, colIndex) => /* @__PURE__ */ jsx52("td", { children: col || "N/A" }, colIndex))
        },
        index
      )) : /* @__PURE__ */ jsx52("tr", { children: /* @__PURE__ */ jsx52("td", { colSpan: headers.length, className: "text-center py-4", children: "Nenhum dado encontrado." }) }) })
    ] }),
    /* @__PURE__ */ jsxs42(Modal8, { show: showModal, onHide: handleCloseModal, centered: true, children: [
      /* @__PURE__ */ jsx52(Modal8.Header, { closeButton: true, children: /* @__PURE__ */ jsx52(Modal8.Title, { children: "Detalhes" }) }),
      /* @__PURE__ */ jsx52(Modal8.Body, { children: selectedItem && /* @__PURE__ */ jsx52("div", { children: modalContent ? modalContent(selectedItem) : "Visualizando detalhes do item." }) }),
      /* @__PURE__ */ jsxs42(Modal8.Footer, { children: [
        /* @__PURE__ */ jsx52(Button22, { variant: "outline-secondary", onClick: handleCloseModal, children: "Fechar" }),
        modalButtonCallback && /* @__PURE__ */ jsx52(
          Button22,
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
import { useState as useState25 } from "react";
import { Button as Button23 } from "react-bootstrap";
import { Fragment as Fragment14, jsx as jsx53, jsxs as jsxs43 } from "react/jsx-runtime";
var TextWithMore = ({
  text = "Carregando...",
  maxLength,
  moreLabel = "ver mais",
  lessLabel = "ver menos"
}) => {
  const [expanded, setExpanded] = useState25(false);
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };
  const isTruncated = text.length > maxLength;
  const displayText = isTruncated && !expanded ? text.slice(0, maxLength) + "\u2026" : text;
  return /* @__PURE__ */ jsxs43(Fragment14, { children: [
    /* @__PURE__ */ jsx53("span", { className: "text-with-more-content", children: displayText }),
    isTruncated && /* @__PURE__ */ jsx53(
      Button23,
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
import {
  CalculoCorrecao,
  CalculadoraCorrecaoModal,
  UnidadeMaterialCard,
  TarefaUnidadeForm,
  FrequenciaFormV2,
  CampoDeVerificacaoV2
} from "@teraprox/ui-kit-sgp";
export {
  ActionButtons,
  AddButton_default as AddButton,
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
  DeleteButton_default as DeleteButton,
  DeleteConfirm,
  ExpandableCard,
  FindRecursoByTagField,
  FormField,
  FrequenciaFormV2,
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
  TarefaUnidadeForm,
  TextWithMore,
  TimerDisplay,
  UnidadeMaterialCard,
  UnidadeMaterialForm,
  UnifiedPeriodSelector,
  UploadArea,
  UuidPill_default as UuidPill,
  VerticalItemsDisplay
};
