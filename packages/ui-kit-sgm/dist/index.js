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
  AcaoPicker: () => AcaoPicker,
  BranchContainerV2: () => BranchContainerV2,
  BranchDropDisplay: () => BranchDropDisplay,
  BranchNodeDisplayV2: () => BranchNodeDisplayV2,
  FindRecursoByTagField: () => FindRecursoByTagField,
  InspecaoModal: () => InspecaoModal,
  MantenedorPicker: () => MantenedorPicker,
  MantenedorRender: () => MantenedorRender,
  MantenedorRenderCompact: () => MantenedorRenderCompact,
  ManutentorCard: () => ManutentorCard,
  ManutentorCardCompact: () => ManutentorCardCompact,
  ManutentoresDisplay: () => ManutentoresDisplay,
  MetricasDisplay: () => MetricasDisplay,
  OSCheckoutModalV2: () => OSCheckoutModalV2,
  OSQuickActionsMenu: () => OSQuickActionsMenu,
  OSQuickEndModal: () => OSQuickEndModal,
  OSQuickStartModal: () => OSQuickStartModal,
  OS_STATUS_PALETTE: () => OS_STATUS_PALETTE,
  ObservacaoModal: () => ObservacaoModal,
  OrdemDeServicoDisplayCard: () => OrdemDeServicoDisplayCard2,
  OrdemInfoCard: () => OrdemInfoCard,
  OrdemStatusActions: () => OrdemStatusActions,
  OrdemStatusIndicator: () => OrdemStatusIndicator,
  OsCard: () => OsCard,
  OsEmpty: () => OsEmpty,
  OsSkeleton: () => OsSkeleton,
  PickMantenedorTipoModal: () => PickMantenedorTipoModal,
  RecursoDisplayer: () => RecursoDisplayer,
  TarefaCard: () => TarefaCard,
  TarefaItem: () => TarefaItem,
  TarefasTab: () => TarefasTab,
  UnidadeMaterialModal: () => UnidadeMaterialModal,
  UnidadeMaterialPicker: () => UnidadeMaterialPicker,
  getOrdemDeServicoDisplayColor: () => getOrdemDeServicoDisplayColor,
  getOsStatusMeta: () => getOsStatusMeta
});
module.exports = __toCommonJS(index_exports);

// src/unidade-material/UnidadeMaterialModal.tsx
var import_ui_kit_core = require("@hashcodeti/ui-kit-core");
var import_teraprox_ui_kit = require("teraprox-ui-kit");
var import_jsx_runtime = require("react/jsx-runtime");
var UnidadeMaterialModal = ({
  show,
  onClose,
  onConfirmed,
  vm,
  title,
  primaryLabel
}) => {
  const handleConfirm = async () => {
    try {
      const dto = await vm.submit();
      await onConfirmed(dto);
      vm.reset();
      onClose();
    } catch (err) {
      console.warn("[UnidadeMaterialModal] submit failed", err);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_ui_kit_core.FormModal,
    {
      show,
      onClose,
      title: title != null ? title : "Adicionar Material",
      size: "lg",
      isValid: vm.isValid,
      isLoading: vm.isSubmitting,
      primaryAction: {
        label: primaryLabel != null ? primaryLabel : "Adicionar",
        onClick: handleConfirm
      },
      secondaryAction: { label: "Cancelar", onClick: onClose },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_teraprox_ui_kit.UnidadeMaterialForm,
        {
          value: vm.value,
          onMaterialSelected: vm.onMaterialSelected,
          onQuantidadeUpdate: vm.onQuantidadeUpdate,
          onUnidadeSelected: vm.onUnidadeSelected,
          loadMaterialsFunc: vm.loadMaterials,
          loadUnidadesFunc: vm.loadUnidades
        }
      )
    }
  );
};

// src/inspecao/InspecaoModal.tsx
var import_ui_kit_core2 = require("@hashcodeti/ui-kit-core");
var import_teraprox_ui_kit2 = require("teraprox-ui-kit");
var import_jsx_runtime2 = require("react/jsx-runtime");
var InspecaoModal = ({
  show,
  onClose,
  onConfirmed,
  vm,
  title,
  primaryLabel,
  tiposDeDado,
  parametrosOps,
  loadUnidadesFunc,
  renderLimitesDeControle
}) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const handleConfirm = async () => {
    try {
      const dto = await vm.submit();
      await onConfirmed(dto);
      vm.reset();
      onClose();
    } catch (err) {
      console.warn("[InspecaoModal] submit failed", err);
    }
  };
  const tipo = (_a = vm.value) == null ? void 0 : _a.tipo;
  const showLimites = (tipo === "Numerico" || tipo === "Num\xE9rico") && !!renderLimitesDeControle;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    import_ui_kit_core2.FormModal,
    {
      show,
      onClose,
      title: title != null ? title : "Adicionar Inspe\xE7\xE3o",
      size: "lg",
      isValid: vm.isValid,
      isLoading: vm.isSubmitting,
      primaryAction: {
        label: primaryLabel != null ? primaryLabel : "Adicionar",
        onClick: handleConfirm
      },
      secondaryAction: { label: "Cancelar", onClick: onClose },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_teraprox_ui_kit2.AutoComplete,
          {
            ops: tiposDeDado,
            displayKey: "nome",
            title: "Tipo de dado",
            value: (_c = (_b = vm.value) == null ? void 0 : _b.tipo) != null ? _c : "",
            onSelectedClick: (op) => {
              var _a2;
              return vm.onTipoDeDado((_a2 = op == null ? void 0 : op.nome) != null ? _a2 : "");
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_teraprox_ui_kit2.AutoComplete,
          {
            loadCondition: true,
            ops: parametrosOps,
            title: "Par\xE2metro",
            value: (_e = (_d = vm.value) == null ? void 0 : _d.nomeParametro) != null ? _e : "",
            displayKeys: ["nome", "labelUnidade"],
            onValueChanged: (v) => vm.onNomeParametro(v),
            onSelectedClick: (p) => vm.onParametroSelected(p)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_teraprox_ui_kit2.AutoComplete,
          {
            loadCondition: true,
            loadFunc: loadUnidadesFunc,
            title: "Unidade",
            value: (_g = (_f = vm.value) == null ? void 0 : _f.unidadeParametro) != null ? _g : "",
            displayKeys: ["nome", "label"],
            onSelectedClick: (u) => {
              var _a2, _b2;
              return vm.onUnidadeParametro((_b2 = (_a2 = u == null ? void 0 : u.label) != null ? _a2 : u == null ? void 0 : u.nome) != null ? _b2 : "");
            }
          }
        ),
        showLimites ? renderLimitesDeControle(vm) : null
      ]
    }
  );
};

// src/acao-manutentor/AcaoPicker.tsx
var import_ui_kit_core3 = require("@hashcodeti/ui-kit-core");
var import_teraprox_ui_kit3 = require("teraprox-ui-kit");
var import_jsx_runtime3 = require("react/jsx-runtime");
var AcaoPicker = ({
  acao,
  onSelect,
  loadAcoes,
  onNovaAcao,
  loadCondition = true,
  title = "Acao"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_teraprox_ui_kit3.AutoComplete,
    {
      title,
      displayKey: "nome",
      value: acao == null ? void 0 : acao.nome,
      onSelectedClick: (selected) => onSelect(selected),
      actionButton: onNovaAcao ? () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui_kit_core3.Button, { variant: "primary", size: "sm", onClick: onNovaAcao, children: "Nova A\xE7\xE3o" }) : void 0,
      loadCondition,
      loadFunc: loadAcoes
    }
  );
};

// src/acao-manutentor/ManutentoresDisplay.tsx
var import_ui_kit_core4 = require("@hashcodeti/ui-kit-core");
var import_gr = require("react-icons/gr");
var import_jsx_runtime4 = require("react/jsx-runtime");
var ManutentoresDisplay = ({
  manutentores = [],
  onIconClick = () => {
  },
  label = "Executor(es):"
}) => {
  var _a;
  const executoresAtivos = manutentores.filter((m) => m.active);
  const primeiro = (_a = executoresAtivos[0]) == null ? void 0 : _a.nomeUsuario;
  const restantes = executoresAtivos.slice(1);
  const tooltipContent = /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex flex-col gap-0.5", children: restantes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: m.nomeUsuario }, m.mantenedorId)) });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "inline-flex items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: label }),
    " ",
    primeiro != null ? primeiro : "-",
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_gr.GrUserWorker, { onClick: onIconClick }),
    restantes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui_kit_core4.Tooltip, { content: tooltipContent, side: "top", delayDuration: 150, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "inline-flex items-center gap-1 cursor-pointer", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { children: [
      "+",
      restantes.length
    ] }) }) })
  ] });
};

// src/acao-manutentor/MantenedorRender.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var MantenedorRender = ({
  readOnly,
  osId,
  setMantenedoresView,
  isModalOpen,
  setTargetOs,
  maintainers,
  renderPicker
}) => {
  const viewMantenedores = () => {
    if (!readOnly) {
      setTargetOs && osId !== void 0 && setTargetOs(osId);
      setMantenedoresView && setMantenedoresView(true);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    isModalOpen && renderPicker && renderPicker(),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { hidden: isModalOpen, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      ManutentoresDisplay,
      {
        onIconClick: viewMantenedores,
        label: "",
        manutentores: maintainers == null ? void 0 : maintainers.map((m) => {
          var _a, _b;
          return {
            ...m,
            nomeUsuario: ((_a = m.mantenedor) == null ? void 0 : _a.nomeUsuario) || ((_b = m.mantenedor) == null ? void 0 : _b._fullName)
          };
        })
      }
    ) })
  ] });
};

// src/acao-manutentor/MantenedorRenderCompact.tsx
var import_react = __toESM(require("react"));
var import_ui_kit_core5 = require("@hashcodeti/ui-kit-core");
var import_fa = require("react-icons/fa");
var import_jsx_runtime6 = require("react/jsx-runtime");
var MantenedorRenderCompact = ({
  readOnly = false,
  maintainers = [],
  onDesatribuir,
  onAtribuirClick,
  renderAtribuirForm
}) => {
  const [popoverOpen, setPopoverOpen] = import_react.default.useState(false);
  const executoresAtivos = (maintainers == null ? void 0 : maintainers.filter((m) => m.active)) || [];
  if (readOnly) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa.FaUser, { size: 16, className: "text-neutral-500" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-500", children: executoresAtivos.length > 0 ? executoresAtivos.map(
        (m) => {
          var _a, _b;
          return ((_a = m.mantenedor) == null ? void 0 : _a.nomeUsuario) || ((_b = m.mantenedor) == null ? void 0 : _b._fullName);
        }
      ).join(", ") : "N\xE3o atribu\xEDdo" })
    ] });
  }
  const triggerLabel = executoresAtivos.length === 0 ? "Atribuir" : "Adicionar";
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa.FaUser, { size: 16 }),
    executoresAtivos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex gap-1", children: executoresAtivos.map((m, index) => {
      var _a, _b;
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        import_ui_kit_core5.Badge,
        {
          tone: "primary",
          className: "inline-flex items-center gap-1",
          style: { fontSize: "0.75rem" },
          children: [
            ((_a = m.mantenedor) == null ? void 0 : _a.nomeUsuario) || ((_b = m.mantenedor) == null ? void 0 : _b._fullName) || "Nome n\xE3o dispon\xEDvel",
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              import_fa.FaTimes,
              {
                size: 10,
                style: { cursor: "pointer" },
                onClick: () => onDesatribuir && onDesatribuir(m)
              }
            )
          ]
        },
        m.mantenedorId || index
      );
    }) }),
    onAtribuirClick ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_ui_kit_core5.Button,
      {
        variant: "outline-primary",
        size: "sm",
        leftIcon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa.FaPlus, { size: 12 }),
        onClick: onAtribuirClick,
        children: triggerLabel
      }
    ) : renderAtribuirForm ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui_kit_core5.Popover, { open: popoverOpen, onOpenChange: setPopoverOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui_kit_core5.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        import_ui_kit_core5.Button,
        {
          variant: "outline-primary",
          size: "sm",
          leftIcon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa.FaPlus, { size: 12 }),
          children: triggerLabel
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui_kit_core5.PopoverContent, { size: "auto", children: renderAtribuirForm({ handleClose: () => setPopoverOpen(false) }) })
    ] }) : null
  ] });
};

// src/acao-manutentor/ManutentorCard.tsx
var import_ui_kit_core6 = require("@hashcodeti/ui-kit-core");
var import_fa6 = require("react-icons/fa6");
var import_gr2 = require("react-icons/gr");

// src/acao-manutentor/MetricasDisplay.tsx
var import_bs = require("react-icons/bs");
var import_jsx_runtime7 = require("react/jsx-runtime");
var MetricasDisplay = ({
  metricas,
  wrenchTime
}) => {
  const safe = typeof metricas === "object" && metricas !== null ? metricas : {};
  const { tempoMedioExecucao = "-" } = safe;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "w-100 d-flex justify-content-center gap-4 align-items-center text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "d-flex align-items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_bs.BsWrenchAdjustableCircleFill, {}),
      wrenchTime
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "d-flex align-items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_bs.BsFillStopwatchFill, {}),
      tempoMedioExecucao
    ] })
  ] });
};

// src/acao-manutentor/ManutentorCard.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var ManutentorCard = ({
  mantenedor,
  index,
  viewDetailsCallback,
  onRemoveCallback,
  showBusyStatus = true,
  onStatusClick,
  loadMetrics = null
}) => {
  var _a, _b;
  const hasMetrics = mantenedor.metricas;
  const getStatusColor = (type) => {
    switch (type) {
      case "executing":
        return "#10b981";
      // emerald-500
      case "pending":
        return "#f59e0b";
      // amber-500
      case "concluded":
        return "#94a3b8";
      // slate-400
      case "busy":
        return "#ef4444";
      // red-500
      case "available":
        return "#10b981";
      // emerald-500
      default:
        return "#cbd5e1";
    }
  };
  const handleStatusClick = (ordens) => {
    onStatusClick && onStatusClick(ordens);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui_kit_core6.Card, { variant: "elevated", className: "mantenedor-card border-0 overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui_kit_core6.CardBody, { className: "p-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mantenedor-info flex-grow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "h6",
            {
              className: "mb-0 font-bold text-neutral-900",
              style: { fontSize: "0.95rem" },
              children: mantenedor == null ? void 0 : mantenedor.nomeUsuario
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "text-neutral-500", style: { fontSize: "0.75rem" }, children: [
            "ID: ",
            mantenedor.id,
            " ",
            mantenedor.setor && `\xB7 ${mantenedor.setor}`
          ] })
        ] }),
        loadMetrics && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_ui_kit_core6.Button,
          {
            variant: "link",
            size: "sm",
            className: "p-0 text-neutral-500",
            onClick: () => loadMetrics(mantenedor),
            title: "Ver M\xE9tricas",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_gr2.GrLineChart, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "status-list flex gap-2 mb-3", children: [
        ((_a = mantenedor.executing) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "div",
          {
            className: "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-50 text-success border border-success/20",
            style: { cursor: "pointer", fontSize: "0.7rem" },
            onClick: () => handleStatusClick(mantenedor.executing),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "div",
                {
                  style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: getStatusColor("executing")
                  }
                }
              ),
              mantenedor.executing.length,
              " Ex."
            ]
          }
        ),
        ((_b = mantenedor.pending) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "div",
          {
            className: "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-50 text-warning border border-warning/20",
            style: { cursor: "pointer", fontSize: "0.7rem" },
            onClick: () => handleStatusClick(mantenedor.pending),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "div",
                {
                  style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: getStatusColor("pending")
                  }
                }
              ),
              mantenedor.pending.length,
              " Pend."
            ]
          }
        )
      ] }),
      showBusyStatus && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "mt-auto pt-2 border-t border-surface-border", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "div",
            {
              style: {
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: getStatusColor(mantenedor._busy ? "busy" : "available"),
                boxShadow: mantenedor._busy ? "0 0 4px #ef4444" : "none"
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "span",
            {
              className: "font-semibold",
              style: {
                fontSize: "0.8rem",
                color: mantenedor._busy ? "#ef4444" : "#10b981"
              },
              children: mantenedor._busy ? `Ocupado (OS-${mantenedor.osId})` : "Dispon\xEDvel"
            }
          )
        ] }),
        mantenedor._busy && viewDetailsCallback && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_ui_kit_core6.Button,
          {
            variant: "link",
            size: "sm",
            className: "p-0 text-brand-primary",
            onClick: () => viewDetailsCallback({ ...mantenedor, index }),
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_fa6.FaArrowRightToBracket, { size: 14 })
          }
        )
      ] }) }),
      onRemoveCallback && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "mt-2 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "span",
        {
          onClick: () => onRemoveCallback({ ...mantenedor, index }),
          className: "text-error underline",
          style: { fontSize: "0.7rem", cursor: "pointer" },
          children: "remover"
        }
      ) })
    ] }),
    hasMetrics && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui_kit_core6.CardFooter, { className: "bg-neutral-50 border-0 p-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      MetricasDisplay,
      {
        metricas: mantenedor.metricas.horas || "-",
        wrenchTime: mantenedor.metricas.wrenchTime || "-"
      }
    ) })
  ] }) }, mantenedor.id);
};

// src/acao-manutentor/ManutentorCardCompact.tsx
var import_ui_kit_core7 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime9 = require("react/jsx-runtime");
var ManutentorCardCompact = ({
  mantenedor,
  onClick
}) => {
  const isBusy = mantenedor._busy;
  const statusColor = isBusy ? "#ef4444" : "#10b981";
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    import_ui_kit_core7.Card,
    {
      variant: onClick ? "interactive" : "outlined",
      className: "rounded-lg h-full",
      onClick,
      style: {
        cursor: onClick ? "pointer" : "default",
        backgroundColor: "#ffffff",
        transition: "transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out"
      },
      onMouseEnter: (e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
        }
      },
      onMouseLeave: (e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui_kit_core7.CardBody, { className: "p-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "h6",
            {
              className: "mb-0 font-bold text-neutral-900 truncate",
              style: { fontSize: "0.9rem" },
              children: mantenedor == null ? void 0 : mantenedor.nomeUsuario
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "text-neutral-500", style: { fontSize: "0.7rem" }, children: [
            "ID: ",
            mantenedor.id
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "div",
            {
              style: {
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: statusColor,
                boxShadow: isBusy ? `0 0 4px ${statusColor}` : "none"
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "span",
            {
              className: "font-medium",
              style: {
                fontSize: "0.75rem",
                color: isBusy ? "#ef4444" : "#10b981"
              },
              children: isBusy ? `Ocupado (OS-${mantenedor.osId || "?"})` : "Dispon\xEDvel"
            }
          )
        ] }),
        mantenedor.setor && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "div",
          {
            className: "mt-2 pt-2 border-t border-surface-border text-neutral-500",
            style: { fontSize: "0.7rem", opacity: 0.8 },
            children: mantenedor.setor
          }
        )
      ] })
    }
  );
};

// src/recurso/RecursoDisplayer.tsx
var import_react4 = require("react");
var import_ui_kit_core8 = require("@hashcodeti/ui-kit-core");
var import_teraprox_core_sdk3 = require("teraprox-core-sdk");

// src/recurso/BranchDropDisplay.tsx
var import_react2 = require("react");
var import_fa2 = require("react-icons/fa");
var import_md = require("react-icons/md");
var import_teraprox_core_sdk = require("teraprox-core-sdk");
var import_jsx_runtime10 = require("react/jsx-runtime");
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
  const [fontColor, setFontColor] = (0, import_react2.useState)("#000");
  const [searchTerm, setSearchTerm] = (0, import_react2.useState)("");
  const [show, setShow] = (0, import_react2.useState)(false);
  const [multiSelected, setMultiSelected] = (0, import_react2.useState)([]);
  const dropdownRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    setFontColor(
      (0, import_teraprox_core_sdk.pickTextColorBasedOnBgColorAdvanced)(branch.branchLevel.color, "#FFFFFF", "#000000")
    );
  }, [branch.branchLevel.color]);
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
                branch.nomeRecurso || branch.branchLevel.nome,
                branch.nomeRecurso && !multiMode && isLastBranchClicked() && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("em", { style: { fontStyle: "italic", opacity: 0.8, marginLeft: "0.5rem" }, children: "(Selecionado)" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_fa2.FaChevronDown, {})
            ]
          }
        ),
        show && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                    borderBottom: "1px solid #ddd"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_fa2.FaSearch, { style: { marginRight: "0.5rem", color: "#555" } }),
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
              !multiMode && !singleReturn ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_fa2.FaCheckSquare, { style: { marginRight: "0.5rem" } }),
                    "Selecionar multiplos"
                  ]
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { display: "flex", gap: "0.5rem", margin: "0.5rem 0" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_fa2.FaCheck, { style: { marginRight: "0.5rem" } }),
                      "Confirmar selecao"
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_md.MdClose, { style: { marginRight: "0.5rem" } }),
                      "Cancelar"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: { padding: "0.5rem" }, children: visibleNodes.map((bn) => {
                const selected = multiMode ? multiSelected.some((r) => r.id === bn.recurso.id) : false;
                return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: bn.recurso.nome }),
                      selected && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_fa2.FaCheck, {})
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

// src/recurso/FindRecursoByTagField.tsx
var import_react3 = require("react");
var import_gr3 = require("react-icons/gr");
var import_teraprox_ui_kit4 = require("teraprox-ui-kit");
var import_teraprox_core_sdk2 = require("teraprox-core-sdk");
var import_jsx_runtime11 = require("react/jsx-runtime");
var FindRecursoByTagField = ({
  callback,
  vm: vmProp,
  recursoController
}) => {
  const defaultVm = (0, import_teraprox_core_sdk2.useFindRecursoByTagViewModel)(
    recursoController ? { recursoController } : void 0
  );
  const vm = vmProp != null ? vmProp : defaultVm;
  const [selectedTag, setSelectedTag] = (0, import_react3.useState)("");
  const [reachedRecurso, setReachedRecurso] = (0, import_react3.useState)(null);
  const findRecursoByTagIdHandler = async (tagId) => {
    const r = await vm.searchByTagId(tagId);
    setReachedRecurso(r);
  };
  const findRecursoByTagDescriptionHandler = async (description) => {
    const recurso = await vm.searchByTag(description);
    if (!callback) {
      console.log("Recurso encontrado (sem callback):", recurso);
    } else if (recurso) {
      callback(recurso, true);
    }
  };
  const confirmRecursoSelectionButton = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          import_gr3.GrCheckmark,
          {
            size: 25,
            onClick: () => reachedRecurso && callback(reachedRecurso, true)
          }
        )
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_teraprox_ui_kit4.AutoComplete,
    {
      sortKey: "id",
      loadCondition: true,
      loadFunc: () => vm.loadActiveTags(),
      displayKey: "descricao",
      title: "Selecione ou Digite a TAG",
      actionButton: confirmRecursoSelectionButton,
      actionButton2: () => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_teraprox_ui_kit4.QrCodeScanButton,
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

// src/recurso/RecursoDisplayer.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var RecursoDisplayer = ({
  selectedList = [],
  onSaveRecurso,
  singleReturn = false,
  vm: vmProp,
  findVm: findVmProp
}) => {
  void selectedList;
  const defaultVm = (0, import_teraprox_core_sdk3.useRecursoDisplayerViewModel)();
  const defaultFindVm = (0, import_teraprox_core_sdk3.useFindRecursoByTagViewModel)();
  const vm = vmProp != null ? vmProp : defaultVm;
  const findVm = findVmProp != null ? findVmProp : defaultFindVm;
  const [selectorDisplay, setSelectorDisplay] = (0, import_react4.useState)("");
  const [multiMode, setMultiMode] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
    vm.loadInitialBranches().catch(
      (err) => console.warn("[RecursoDisplayer] loadInitialBranches failed:", err)
    );
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { width: "100%", padding: 0 }, className: "recurso-displayer-generic", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex justify-between items-center mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "mr-2", children: "Selecionar Recurso Por:" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        import_ui_kit_core8.Button,
        {
          size: "sm",
          onClick: () => setSelectorDisplay("branch"),
          variant: selectorDisplay === "branch" ? "primary" : "outline-primary",
          className: "mr-1",
          children: "Arvore"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        import_ui_kit_core8.Button,
        {
          size: "sm",
          onClick: () => setSelectorDisplay("TAG"),
          variant: selectorDisplay === "TAG" ? "primary" : "outline-primary",
          children: "TAG"
        }
      )
    ] }) }),
    selectorDisplay === "branch" && vm.branches.map((branch, i) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      BranchDropDisplay_default,
      {
        branch,
        addBranch: (bn) => {
          vm.advanceBranch(bn).catch(
            (err) => console.warn("[RecursoDisplayer] advanceBranch failed:", err)
          );
        },
        multiMode,
        setMultiMode,
        onSaveRecurso: (rs) => onSaveRecurso(rs),
        backOnBranch: (b) => vm.backToBranch(b),
        branches: vm.branches,
        singleReturn
      },
      branch.id || i
    )),
    selectorDisplay === "TAG" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      FindRecursoByTagField,
      {
        vm: findVm,
        callback: (rec, checked) => {
          onSaveRecurso([rec], checked);
        }
      }
    )
  ] });
};

// src/recurso/BranchNodeDisplayV2.tsx
var React3 = __toESM(require("react"));
var import_react_dnd = require("react-dnd");
var import_fa3 = require("react-icons/fa");
var import_md2 = require("react-icons/md");
var import_gr4 = require("react-icons/gr");
var import_jsx_runtime13 = require("react/jsx-runtime");
var DEFAULT_THEMES = {
  1: { primary: "#0455BF", secondary: "#0869A6" },
  2: { primary: "#0869A6", secondary: "rgba(8, 105, 166, 0.8)" },
  3: { primary: "#F2AE2E", secondary: "#F2BB13" },
  4: { primary: "#F2BB13", secondary: "rgba(242, 187, 19, 0.9)" }
};
var BranchNodeDisplayV2 = ({
  branchNode,
  branch,
  level,
  index,
  isPicker = false,
  isLoading = false,
  isCheckedRecurso,
  isFocused = false,
  onOpenBranches,
  onEditRecurso,
  onPickRecurso,
  onMoveNode,
  onViewHistory,
  renderEditWrapper,
  getLevelTheme
}) => {
  var _a, _b, _c;
  const ref = React3.useRef(null);
  const themeFor = (l) => getLevelTheme && getLevelTheme(l) || DEFAULT_THEMES[l] || { primary: "#0869A6", secondary: "#0455BF" };
  const [{ isDragging }, dragRef] = (0, import_react_dnd.useDrag)(
    () => {
      var _a2, _b2, _c2, _d, _e;
      return {
        type: "BRANCH_NODE",
        item: {
          branchNodeId: branchNode == null ? void 0 : branchNode.id,
          recursoBranchId: (_a2 = branchNode == null ? void 0 : branchNode.recurso) == null ? void 0 : _a2.branchId,
          targetBranchLevel: branch == null ? void 0 : branch.branchLevelId,
          branchNodeLevel: (_b2 = branch == null ? void 0 : branch.branchLevel) == null ? void 0 : _b2.level,
          fromBranchId: branch == null ? void 0 : branch.id,
          parentBranchNode: (_c2 = branch == null ? void 0 : branch.parentBranchNode) == null ? void 0 : _c2.branchId,
          position: branchNode == null ? void 0 : branchNode.position,
          previewData: {
            nome: (_d = branchNode == null ? void 0 : branchNode.recurso) == null ? void 0 : _d.nome,
            descricao: (_e = branchNode == null ? void 0 : branchNode.recurso) == null ? void 0 : _e.descricao,
            position: branchNode == null ? void 0 : branchNode.position
          }
        },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        options: { dropEffect: "move" }
      };
    },
    [branchNode, branch]
  );
  const [{ isOver, canDrop }, dropRef] = (0, import_react_dnd.useDrop)({
    accept: "BRANCH_NODE",
    canDrop: (item) => item.fromBranchId === branch.id && item.branchNodeLevel === branch.branchLevel.level,
    hover(item, monitor) {
      var _a2;
      if (!ref.current || !monitor.canDrop() || !onMoveNode) return;
      const dragPos = item.position;
      const hoverPos = branchNode.position;
      if (dragPos === hoverPos) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = ((_a2 = clientOffset == null ? void 0 : clientOffset.y) != null ? _a2 : 0) - hoverBoundingRect.top;
      if (dragPos < hoverPos && hoverClientY < hoverMiddleY) return;
      if (dragPos > hoverPos && hoverClientY > hoverMiddleY) return;
      onMoveNode(dragPos, hoverPos);
      item.position = hoverPos;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isValidDropTarget = isOver && canDrop;
  const shouldShowDropZone = isValidDropTarget && !isDragging;
  const checked = (_a = isCheckedRecurso == null ? void 0 : isCheckedRecurso(branchNode.recurso.id)) != null ? _a : false;
  const getResourceIcon = () => {
    if (branchNode.recurso.branch) return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_md2.MdAccountTree, {});
    if (level === 1) return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_md2.MdBusiness, {});
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_md2.MdSettings, {});
  };
  const cardClasses = [
    "branch-node-card",
    isFocused && "is-focused-highlight",
    isDragging && "is-dragging",
    isPicker && "is-picker",
    checked && "is-selected",
    shouldShowDropZone && "is-over",
    isLoading && "is-loading",
    branchNode.recurso.branch && "has-branch",
    level === 1 && "is-root"
  ].filter(Boolean).join(" ");
  const editButton = /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "edit-btn", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_md2.MdEdit,
    {
      size: 20,
      className: "hoverable-div",
      onClick: (e) => {
        e.stopPropagation();
        if (!isLoading) onEditRecurso == null ? void 0 : onEditRecurso(level, branchNode);
      },
      style: { cursor: isLoading ? "not-allowed" : "pointer" },
      title: "Editar Recurso"
    }
  ) });
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    "div",
    {
      ref: (el) => {
        dragRef(dropRef(el));
        ref.current = el;
      },
      className: cardClasses,
      "data-level": level,
      style: {
        boxShadow: isFocused ? "0 0 0 4px rgba(255, 193, 7, 0.6)" : void 0,
        borderColor: isFocused ? "#ffc107" : void 0,
        zIndex: isFocused ? 10 : void 0,
        transform: isFocused ? "scale(1.02)" : void 0,
        transition: "all 0.3s ease"
      },
      title: `${branchNode.recurso.nome} (N\xEDvel ${level}, Posi\xE7\xE3o ${branchNode.position})`,
      onClick: (e) => {
        e.stopPropagation();
        if (!isLoading && !isPicker) onOpenBranches == null ? void 0 : onOpenBranches(branchNode);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "div",
          {
            className: "node-drag-handle",
            title: "Arrastar para reordenar",
            style: {
              background: isDragging ? `linear-gradient(180deg, ${themeFor(level).primary}, ${themeFor(level).secondary})` : void 0
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "drag-dots", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "drag-dot" }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "drag-dot" }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "drag-dot" })
            ] })
          }
        ),
        isPicker && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-checkbox-container", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "div",
          {
            className: `node-checkbox ${checked ? "checked" : ""}`,
            onClick: (e) => {
              e.stopPropagation();
              onPickRecurso == null ? void 0 : onPickRecurso(branchNode.recurso.id);
            },
            children: checked ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fa3.FaCheck, { size: 10 }) : null
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "div",
          {
            className: `node-position-badge ${shouldShowDropZone ? "duplicate" : ""}`,
            style: {
              background: isDragging ? `linear-gradient(135deg, ${themeFor(level).primary}, ${themeFor(level).secondary})` : void 0
            },
            children: isDragging ? "\u2195\uFE0F" : branchNode.position
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "node-main-content", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-icon-container", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-icon", children: getResourceIcon() }) }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "node-info", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h4", { className: "node-title", children: branchNode.recurso.nome }),
            branchNode.recurso.descricao && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "node-subtitle", children: branchNode.recurso.descricao })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "d-flex gap-2 align-items-center", children: [
            renderEditWrapper ? renderEditWrapper(editButton) : editButton,
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "history-btn", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_gr4.GrHistory,
              {
                size: 18,
                className: "hoverable-div",
                onClick: (e) => {
                  e.stopPropagation();
                  if (onViewHistory) onViewHistory(branchNode.recurso);
                },
                style: { cursor: "pointer", color: "#6c757d" },
                title: "Ver Hist\xF3rico de OS"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "node-card-footer", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "node-level-indicator", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-level-dot" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { children: [
              "N\xEDvel ",
              level
            ] })
          ] }),
          branchNode.branchNodesCount !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
            "div",
            {
              className: "node-children-count",
              title: `${branchNode.branchNodesCount} ${branchNode.branchNodesCount === 1 ? "galho" : "galhos"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_md2.MdAccountTree, { size: 12 }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: branchNode.branchNodesCount })
              ]
            }
          )
        ] }),
        (level > 3 || ((_c = (_b = branchNode.recurso.descricao) == null ? void 0 : _b.length) != null ? _c : 0) > 100) && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-complexity-indicator", title: "Recurso complexo", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "complexity-dot" }) }),
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-loading-overlay", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-loading-spinner" }) }),
        shouldShowDropZone && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "node-drop-indicator", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "drop-zone-text", children: "\u{1F4E6} Soltar aqui" }) })
      ]
    }
  );
};

// src/recurso/BranchContainerV2.tsx
var React4 = __toESM(require("react"));
var import_react_dnd2 = require("react-dnd");
var import_fa4 = require("react-icons/fa");
var import_md3 = require("react-icons/md");
var import_jsx_runtime14 = require("react/jsx-runtime");
var defaultMultiTermFilter = (text, term) => {
  if (!term) return true;
  if (!text) return false;
  const terms = String(term).toLowerCase().split(/\s+/).filter(Boolean);
  const t = text.toLowerCase();
  return terms.every((q) => t.includes(q));
};
var BranchContainerV2 = ({
  branch,
  index,
  filterValue = "",
  showFilter = false,
  positionsChanged = false,
  isLoading = false,
  onSetShowFilter,
  onFiltraRecurso,
  onCreateAtLevel,
  onMoveNode,
  onSavePositionChanges,
  onUndoPositionChanges,
  onNormalizePositions,
  onSaveBranchLevelName,
  onUpdateBranchLevelName,
  onSwitchBranch,
  multiTermFilter = defaultMultiTermFilter,
  isPicker,
  isCheckedRecurso,
  getFocusedRecursoId,
  onOpenBranches,
  onEditRecurso,
  onPickRecurso,
  onViewHistory,
  renderEditWrapper,
  renderCreateWrapper,
  renderTitle
}) => {
  var _a, _b;
  const [hasScroll, setHasScroll] = React4.useState(false);
  const [isScrolledBottom, setIsScrolledBottom] = React4.useState(false);
  const contentRef = React4.useRef(null);
  const level = branch.branchLevel.level;
  const hasDuplicatePositions = () => {
    const positions = branch.branchNodes.map((n) => n.position);
    return positions.length !== new Set(positions).size;
  };
  React4.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulseDropZone {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const filteredNodes = branch.branchNodes.filter((bN) => {
    var _a2;
    return multiTermFilter((_a2 = bN.recurso) == null ? void 0 : _a2.nome, filterValue);
  }).sort((a, b) => a.position === b.position ? Number(a.id) - Number(b.id) : a.position - b.position);
  React4.useEffect(() => {
    const checkScrollability = () => {
      if (contentRef.current) {
        const el2 = contentRef.current;
        setHasScroll(el2.scrollHeight > el2.clientHeight);
      }
    };
    const handleScroll = () => {
      if (contentRef.current) {
        const el2 = contentRef.current;
        const isAtBottom = Math.abs(el2.scrollHeight - el2.clientHeight - el2.scrollTop) < 1;
        setIsScrolledBottom(isAtBottom);
      }
    };
    checkScrollability();
    const el = contentRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [filteredNodes.length, showFilter]);
  const [{ isOver, draggedItem }, dropRef] = (0, import_react_dnd2.useDrop)(
    () => ({
      accept: "BRANCH_NODE",
      drop: (item, monitor) => {
        if (monitor.didDrop()) return;
        onSwitchBranch == null ? void 0 : onSwitchBranch(item, branch);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        draggedItem: monitor.getItem()
      })
    }),
    [branch, onSwitchBranch]
  );
  const isExternalDrop = isOver && draggedItem && draggedItem.fromBranchId !== branch.id;
  const focusedId = getFocusedRecursoId == null ? void 0 : getFocusedRecursoId();
  const containerClasses = [
    "branch-container",
    showFilter && "filtering",
    positionsChanged && "has-changes",
    hasDuplicatePositions() && "has-duplicates",
    filteredNodes.length > 20 && "many-items"
  ].filter(Boolean).join(" ");
  const createButton = /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    "button",
    {
      className: "branch-action-btn",
      onClick: onCreateAtLevel,
      title: "Adicionar novo recurso",
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_md3.MdAddCircle, { size: 18 })
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: containerClasses, style: { backgroundColor: branch.branchLevel.color }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "branch-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "branch-item-count", children: [
        filteredNodes.length,
        " itens"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h3", { children: renderTitle ? renderTitle({
        nome: (_a = branch.branchLevel.nome) != null ? _a : "",
        onSave: () => onSaveBranchLevelName == null ? void 0 : onSaveBranchLevelName(branch.branchLevel, () => {
        }),
        onUpdate: (nome) => onUpdateBranchLevelName == null ? void 0 : onUpdateBranchLevelName(index, nome)
      }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: branch.branchLevel.nome }) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "branch-actions", children: [
        renderCreateWrapper ? renderCreateWrapper(createButton) : createButton,
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "button",
          {
            className: "branch-action-btn",
            onClick: () => onSetShowFilter == null ? void 0 : onSetShowFilter((s) => !s),
            title: showFilter ? "Ocultar filtro" : "Mostrar filtro",
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_md3.MdOutlineFilterAlt, { size: 18 })
          }
        )
      ] })
    ] }),
    showFilter && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "branch-filter", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "Filtrar recursos...",
        value: filterValue,
        onChange: (e) => onFiltraRecurso == null ? void 0 : onFiltraRecurso(e.target.value)
      }
    ) }),
    (hasDuplicatePositions() || positionsChanged) && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "branch-controls", children: [
      hasDuplicatePositions() && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "duplicate-warning", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "\u26A0\uFE0F Posi\xE7\xF5es duplicadas detectadas" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "button",
          {
            className: "branch-control-btn btn btn-warning btn-sm",
            onClick: () => onNormalizePositions == null ? void 0 : onNormalizePositions(branch),
            children: "Corrigir automaticamente"
          }
        )
      ] }),
      positionsChanged && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "branch-controls-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "button",
          {
            className: "branch-control-btn btn btn-secondary btn-sm",
            onClick: () => onUndoPositionChanges == null ? void 0 : onUndoPositionChanges(branch),
            children: "Desfazer"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "button",
          {
            className: "branch-control-btn btn btn-success btn-sm",
            onClick: () => onSavePositionChanges == null ? void 0 : onSavePositionChanges(branch),
            children: "Salvar posi\xE7\xF5es"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "div",
      {
        className: `branch-content ${hasScroll ? "has-scroll" : ""} ${isScrolledBottom ? "scrolled-bottom" : ""}`,
        ref: (el) => {
          dropRef(el);
          contentRef.current = el;
        },
        children: isExternalDrop ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "external-drop-zone", children: [
          "Solte aqui",
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "drop-subtitle", children: ((_b = draggedItem == null ? void 0 : draggedItem.previewData) == null ? void 0 : _b.nome) || "Item selecionado" })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "branch-nodes-list", children: filteredNodes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "branch-empty-state", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_fa4.FaInbox, { className: "empty-icon" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "Nenhum recurso encontrado" }),
          filterValue && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("small", { children: "Tente ajustar o filtro ou adicionar novos recursos" })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
          filteredNodes.map((node, idx) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            BranchNodeDisplayV2,
            {
              branchNode: node,
              index: idx,
              level,
              branch,
              bMapIndex: index,
              isPicker,
              isLoading,
              isCheckedRecurso,
              isFocused: focusedId === node.recurso.id,
              onOpenBranches,
              onEditRecurso,
              onPickRecurso,
              onMoveNode: (dp, hp) => onMoveNode == null ? void 0 : onMoveNode(dp, hp, branch),
              onViewHistory,
              renderEditWrapper
            },
            `${node.id}-${node.position}`
          )),
          filteredNodes.length > 20 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "branch-performance-info", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("small", { children: [
            filteredNodes.length,
            " itens carregados. Use o filtro para melhor performance."
          ] }) })
        ] }) })
      }
    )
  ] });
};

// src/tarefa/TarefaCard.tsx
var import_ui_kit_core10 = require("@hashcodeti/ui-kit-core");
var import_fa62 = require("react-icons/fa6");

// src/tarefa/UnidadeMaterialPicker.tsx
var import_react5 = require("react");
var import_ui_kit_core9 = require("@hashcodeti/ui-kit-core");
var import_md4 = require("react-icons/md");
var import_ri = require("react-icons/ri");
var import_ti = require("react-icons/ti");
var import_teraprox_ui_kit5 = require("teraprox-ui-kit");
var import_jsx_runtime15 = require("react/jsx-runtime");
var removeAt = (arr, idx) => {
  if (!Array.isArray(arr)) return [];
  const copy = [...arr];
  copy.splice(idx, 1);
  return copy;
};
var UnidadeMaterialPicker = ({
  saveOptions,
  singlePick,
  displayName,
  optionDisplayName,
  optionDisplayKey,
  hideOptions,
  displayButtonName,
  opsSelected,
  outOption,
  onSelectedOption,
  formatationFunc,
  onPickerOpen,
  onPickerClose,
  clear,
  clearPickerOptions,
  optionComponent,
  onOptionEditClick,
  showOpsWhenEdit = true,
  onOptionDelete,
  containerStyles,
  deleteDiaologText,
  readOnlyMode = false,
  deleteTitle,
  onOptionUpdate,
  fetchOpsSelected,
  onBuild,
  parentColor,
  onMaterialSelected,
  onQuantidadeUpdate,
  onUnidadeSelected,
  loadMaterialsFunc,
  loadUnidadesFunc
}) => {
  const [optionsPicked, setOptionsPicked] = (0, import_react5.useState)([]);
  const [view, setView] = (0, import_react5.useState)(true);
  const [deleteConfirm, setShowDelete] = (0, import_react5.useState)(false);
  const [optionIndexToDelete, setOptionIndexToDelete] = (0, import_react5.useState)(false);
  const [editingIndex, setEditingIndex] = (0, import_react5.useState)(null);
  (0, import_react5.useEffect)(() => {
    const fetcher = async () => {
      if (fetchOpsSelected) {
        const opsFetched = await fetchOpsSelected();
        setOptionsPicked(opsFetched || []);
      }
    };
    fetcher();
  }, []);
  (0, import_react5.useEffect)(() => {
    if (opsSelected) {
      Array.isArray(opsSelected) ? setOptionsPicked(opsSelected) : setOptionsPicked([opsSelected]);
    }
  }, [opsSelected]);
  (0, import_react5.useEffect)(() => {
    if (onBuild) onBuild(setView, optionsPicked);
  }, []);
  const salvarPicker = (pickedOut) => {
    let newPickerItem = pickedOut;
    let newOptionsPicked = optionsPicked;
    if (newPickerItem) {
      if (onSelectedOption) newPickerItem = onSelectedOption(newPickerItem);
      if (singlePick) {
        newOptionsPicked = [newPickerItem];
        setOptionsPicked(newOptionsPicked);
      } else {
        newOptionsPicked = [...optionsPicked, newPickerItem];
      }
    }
    setOptionsPicked(newOptionsPicked);
    if (saveOptions) {
      saveOptions(
        newPickerItem || optionsPicked[optionsPicked.length - 1],
        newOptionsPicked.length - 1,
        newOptionsPicked
      );
    }
    if (clear) clear();
    setView(true);
  };
  const getDisplayValueHandler = (pi, index) => {
    if (formatationFunc) return formatationFunc(pi);
    return `${optionDisplayKey && pi[optionDisplayKey] || pi.id || index}`;
  };
  const onDeleteConfirmHandler = () => {
    const { pi, index } = optionIndexToDelete;
    const removedOptions = removeAt(optionsPicked, index);
    if (onOptionDelete) onOptionDelete(pi, index, removedOptions);
    setOptionsPicked(removedOptions);
  };
  const onDeleteHandler = (pi, index) => {
    setOptionIndexToDelete({ pi, index });
    setShowDelete(true);
  };
  const onOptionEditClickHandler = (pi, index) => {
    if (onOptionEditClick) {
      onOptionEditClick(pi, index, optionsPicked);
      setEditingIndex(index);
      setView(false);
    }
  };
  const saveEditOption = () => {
    if (onOptionUpdate && editingIndex != null) {
      onOptionUpdate(optionsPicked[editingIndex], editingIndex, [
        ...optionsPicked
      ]);
    }
    setEditingIndex(null);
    setView(true);
  };
  const renderOps = () => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("h4", { children: [
      optionDisplayName,
      clearPickerOptions && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core9.TooltipProvider, { delayDuration: 250, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui_kit_core9.TooltipRoot, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core9.TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core9.Button, { variant: "warning", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ri.RiDeleteBin5Line, { onClick: () => clearPickerOptions() }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core9.TooltipContent, { side: "right", children: "Remover todas as opcoes" })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core9.List, { id: "pickerOps", children: optionsPicked.map((pi, index) => {
      if (optionComponent) {
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            style: {
              alignItems: "center",
              opacity: (pi == null ? void 0 : pi.removed) ? 0.3 : 1,
              textDecoration: (pi == null ? void 0 : pi.removed) ? "line-through" : "none"
            },
            children: optionComponent({
              payload: pi,
              index,
              onClickOp: (input) => onOptionEditClickHandler(input || pi, index),
              deleteButton: () => onOptionDelete ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                import_ti.TiDeleteOutline,
                {
                  style: { marginLeft: 8 },
                  onClick: () => onDeleteHandler(pi, index)
                }
              ) : null
            })
          },
          index
        );
      }
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
        import_ui_kit_core9.ListItem,
        {
          disabled: pi == null ? void 0 : pi.removed,
          style: {
            opacity: (pi == null ? void 0 : pi.removed) ? 0.5 : 1,
            display: "flex",
            alignContent: "center",
            textDecoration: (pi == null ? void 0 : pi.removed) ? "line-through" : "none"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { onClick: () => onOptionEditClickHandler(pi, index), children: getDisplayValueHandler(pi, index) }),
            onOptionDelete && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              import_ti.TiDeleteOutline,
              {
                style: {
                  marginLeft: 8,
                  display: readOnlyMode ? "none" : ""
                },
                onClick: () => onDeleteHandler(pi, index)
              }
            )
          ]
        },
        index
      );
    }) }),
    !singlePick && !readOnlyMode && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { style: { textAlign: "center", padding: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_ui_kit_core9.Button,
      {
        className: "pickerButton",
        onClick: () => {
          if (onPickerOpen) onPickerOpen();
          setView(false);
        },
        children: "+"
      }
    ) })
  ] });
  const buildCloseDisplay = () => {
    var _a, _b;
    if (!hideOptions) {
      return ((_a = optionsPicked == null ? void 0 : optionsPicked.length) != null ? _a : 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_ui_kit_core9.Button,
        {
          disabled: readOnlyMode,
          className: "pickerButton",
          onClick: () => {
            if (onPickerOpen) onPickerOpen();
            setView(false);
          },
          children: displayButtonName
        }
      ) : ((_b = optionsPicked == null ? void 0 : optionsPicked.length) != null ? _b : 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        "div",
        {
          style: {
            borderWidth: 4,
            borderColor: "black",
            marginBottom: 8
          },
          children: renderOps()
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_ui_kit_core9.Button,
      {
        className: "pickerButton",
        onClick: () => {
          if (onPickerOpen) onPickerOpen();
          setView(false);
        },
        children: displayButtonName
      }
    );
  };
  const closePickerHandler = () => {
    if (onPickerClose) onPickerClose();
    setEditingIndex(null);
    setView(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_teraprox_ui_kit5.DeleteConfirm,
      {
        dialogText: deleteDiaologText,
        onHide: setShowDelete,
        title: deleteTitle || "Confirmacao de remocao",
        payload: optionIndexToDelete,
        onConfirm: () => onDeleteConfirmHandler(),
        show: deleteConfirm
      }
    ),
    view ? buildCloseDisplay() : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "div",
      {
        style: {
          backgroundColor: parentColor || (containerStyles == null ? void 0 : containerStyles.bgColor),
          border: "solid",
          borderWidth: 1,
          marginTop: 8,
          marginBottom: 8,
          borderRadius: 4,
          borderColor: "gray"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { style: { padding: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            "div",
            {
              onClick: () => closePickerHandler(),
              style: { float: "right" },
              children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_md4.MdClose, {})
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h3", { children: displayName }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            import_teraprox_ui_kit5.UnidadeMaterialForm,
            {
              value: outOption,
              onMaterialSelected,
              onQuantidadeUpdate,
              onUnidadeSelected,
              loadMaterialsFunc,
              loadUnidadesFunc
            }
          ),
          editingIndex == null && showOpsWhenEdit && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            "div",
            {
              style: {
                borderWidth: 4,
                borderColor: "black",
                marginBottom: 8
              },
              children: !hideOptions && renderOps()
            }
          ),
          editingIndex != null && onOptionEditClick ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { style: { textAlign: "center", marginBottom: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            import_ui_kit_core9.Button,
            {
              style: { display: readOnlyMode ? "none" : "" },
              variant: "warning",
              onClick: saveEditOption,
              children: "Salvar Edicao"
            }
          ) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { style: { textAlign: "center", marginBottom: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            import_ui_kit_core9.Button,
            {
              style: { display: readOnlyMode ? "none" : "" },
              onClick: () => salvarPicker(outOption),
              children: "Salvar"
            }
          ) })
        ] })
      }
    )
  ] });
};

// src/tarefa/TarefaCard.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var TarefaCard = ({
  tarefa,
  posindex,
  onlyView,
  removeTarefaClick,
  onSequenciaChange,
  readOnlyMode,
  onUnidadesMateriaisChange,
  removed,
  unidadeMaterial,
  renderInspecoes,
  unidadeMaterialPickerProps
}) => {
  var _a, _b, _c, _d, _e;
  const ordem = (_a = tarefa == null ? void 0 : tarefa.sequencia) != null ? _a : posindex;
  const remove = () => {
    removeTarefaClick(tarefa.sequencia);
  };
  const materialDisplay = (material) => ` ${material} `;
  const unidadeDisplay = (unidade) => `${unidade} `;
  const conditionalActionButton = () => {
    if (tarefa.status !== "PENDENTE") {
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui_kit_core10.Button, { disabled: true, variant: "secondary", children: "Tarefa Conclu\xEDda" });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui_kit_core10.Button, { variant: "danger", onClick: () => remove(), children: "Remover" });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui_kit_core10.Card, { style: { margin: 12 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui_kit_core10.Card.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex justify-between items-center gap-2 w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("strong", { children: `Ordem: ${ordem}` }),
      !onlyView && conditionalActionButton()
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui_kit_core10.Card.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui_kit_core10.List, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui_kit_core10.ListItem, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("strong", { children: "A realizar:" }),
        " ",
        `${(tarefa == null ? void 0 : tarefa.modelIdentifier) ? tarefa == null ? void 0 : tarefa.modelIdentifier : (_b = tarefa == null ? void 0 : tarefa.acao) == null ? void 0 : _b.nome} - ${(_c = tarefa == null ? void 0 : tarefa.acao) == null ? void 0 : _c.descricao}`
      ] }),
      tarefa.unidadesMateriais && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui_kit_core10.ListItem, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("strong", { children: "Material Nescessario:" }),
        tarefa.unidadesMateriais && tarefa.status !== "ENCERRADO" ? !readOnlyMode && !onlyView && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          UnidadeMaterialPicker,
          {
            onBuild: (setView) => setView(true),
            displayButtonName: "Adicionar Material",
            displayName: "Unidade Material",
            saveOptions: (pi, i, ops) => onUnidadesMateriaisChange(tarefa.__id, ops),
            formatationFunc: (um) => {
              var _a2, _b2;
              return `${um.quantidade} ${((_a2 = um.unidade) == null ? void 0 : _a2.label) || um.labelUnidade} de ${((_b2 = um == null ? void 0 : um.material) == null ? void 0 : _b2.nome) || (um == null ? void 0 : um.materialNome) || (um == null ? void 0 : um.nomeMaterial)} `;
            },
            opsSelected: (_d = tarefa == null ? void 0 : tarefa.unidadesMateriais) == null ? void 0 : _d.filter(
              (um) => !um.removed
            ),
            outOption: unidadeMaterial,
            hideOptions: false,
            onOptionDelete: (pi, i, ops) => onUnidadesMateriaisChange(tarefa.__id, [
              ...ops,
              { ...pi, removed: true }
            ]),
            ...unidadeMaterialPickerProps
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("ol", { className: "list-decimal pl-5 mt-2 space-y-1", children: tarefa.unidadesMateriais && tarefa.unidadesMateriais.map((uM, idx) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("li", { children: [
          materialDisplay(uM.nomeMaterial),
          uM.quantidade,
          unidadeDisplay(uM.labelUnidade)
        ] }, idx)) })
      ] }),
      tarefa.inspecoes && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui_kit_core10.ListItem, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("strong", { children: "Inspe\xE7\xF5es:" }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("ol", { className: "list-decimal pl-5 mt-2 space-y-1", children: tarefa.inspecoes && renderInspecoes ? renderInspecoes(tarefa.inspecoes) : null })
      ] }),
      ((_e = tarefa == null ? void 0 : tarefa.tarefaJustificativas) == null ? void 0 : _e.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui_kit_core10.ListItem, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_fa62.FaRegCommentDots, { size: 20 }),
        " ",
        tarefa.tarefaJustificativas[tarefa.tarefaJustificativas.length - 1].descricao
      ] })
    ] }) })
  ] }, `${posindex}${tarefa.sequencia}`);
};

// src/tarefa/TarefaItem.tsx
var import_react7 = require("react");
var import_ui_kit_core12 = require("@hashcodeti/ui-kit-core");
var import_fa7 = require("react-icons/fa");
var import_md5 = require("react-icons/md");
var import_teraprox_ui_kit6 = require("teraprox-ui-kit");
var import_ui_kit_core13 = require("@hashcodeti/ui-kit-core");

// src/tarefa/ObservacaoModal.tsx
var import_react6 = require("react");
var import_ui_kit_core11 = require("@hashcodeti/ui-kit-core");
var import_fa5 = require("react-icons/fa");
var import_gr5 = require("react-icons/gr");
var import_jsx_runtime17 = require("react/jsx-runtime");
var ObservacaoModal = ({
  show,
  onClose,
  observacoes,
  currentUserId,
  currentUserName,
  readOnly = false,
  onSend,
  onUpdate,
  onRemove,
  title
}) => {
  const [newMessage, setNewMessage] = (0, import_react6.useState)("");
  const [sending, setSending] = (0, import_react6.useState)(false);
  const messagesEndRef = (0, import_react6.useRef)(null);
  const sortedMessages = (0, import_react6.useMemo)(() => {
    const list = Array.isArray(observacoes) ? observacoes.slice() : [];
    return list.sort((a, b) => {
      const ta = (a == null ? void 0 : a.createdAt) ? new Date(a.createdAt).getTime() : 0;
      const tb = (b == null ? void 0 : b.createdAt) ? new Date(b.createdAt).getTime() : 0;
      return ta - tb;
    });
  }, [observacoes]);
  (0, import_react6.useEffect)(() => {
    var _a;
    if (!show) return;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages, show]);
  const handleSendMessage = async () => {
    const trimmed = newMessage.trim();
    if (!trimmed || !onSend) return;
    try {
      setSending(true);
      await onSend(trimmed);
      setNewMessage("");
    } finally {
      setSending(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSendMessage();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    import_ui_kit_core11.Modal,
    {
      open: show,
      size: "lg",
      onOpenChange: (next) => {
        if (!next) onClose();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core11.ModalHeader, { children: title != null ? title : "Chat de Observa\xE7\xF5es" }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core11.ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "chat-container", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "chat-messages", children: [
            sortedMessages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "no-messages", children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa5.FaRegComments, { size: 40, className: "no-messages-icon" }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "no-messages-text", children: !readOnly ? /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
                "Nenhuma mensagem ainda. ",
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("br", {}),
                "Seja o(a) primeiro(a) a dizer algo!"
              ] }) : "N\xE3o h\xE1 nada para ler." })
            ] }) : sortedMessages.map((msg, index) => {
              var _a, _b;
              const isCurrentUser = currentUserId !== void 0 && msg.userId === currentUserId;
              const ts = msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : "";
              return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                "div",
                {
                  className: `message-bubble ${isCurrentUser ? "sent" : "received"}`,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "message-header", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("strong", { children: (_b = msg.nomeUsuario) != null ? _b : "-" }),
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "message-time", children: ts })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "message-content", children: [
                      !readOnly && onUpdate ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                        "span",
                        {
                          role: "textbox",
                          tabIndex: 0,
                          onClick: () => {
                            var _a2;
                            return onUpdate({
                              id: msg.id,
                              descricao: String((_a2 = msg.descricao) != null ? _a2 : ""),
                              index
                            });
                          },
                          style: { cursor: "text" },
                          children: msg.descricao
                        }
                      ) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: msg.descricao }),
                      !readOnly && onRemove && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                        import_ui_kit_core11.Button,
                        {
                          variant: "link",
                          size: "sm",
                          className: "ml-2 p-0",
                          onClick: () => onRemove(msg),
                          "aria-label": "Remover observa\xE7\xE3o",
                          children: "remover"
                        }
                      )
                    ] })
                  ]
                },
                (_a = msg.id) != null ? _a : `obs-${index}`
              );
            }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { ref: messagesEndRef })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: `send-field ${readOnly ? "locked-chat" : ""}`, children: !readOnly ? /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              "textarea",
              {
                rows: 1,
                value: newMessage,
                onChange: (e) => setNewMessage(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: currentUserName ? `Digite uma mensagem como ${currentUserName}...` : "Digite uma mensagem...",
                className: "send-input w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:opacity-50",
                disabled: sending
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              import_ui_kit_core11.Button,
              {
                variant: "primary",
                onClick: () => void handleSendMessage(),
                className: "send-button",
                disabled: sending || !newMessage.trim(),
                children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_gr5.GrSend, {})
              }
            )
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            "input",
            {
              type: "text",
              style: { cursor: "not-allowed" },
              disabled: true,
              value: "Indispon\xEDvel",
              readOnly: true,
              className: "w-full rounded-md border border-surface-border bg-neutral-50 px-3 py-2 text-sm text-neutral-400"
            }
          ) })
        ] }) })
      ]
    }
  );
};

// src/tarefa/TarefaItem.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var TarefaItem = ({
  tarefa,
  vm,
  mode,
  index: _index,
  isMobile = false,
  onRemove,
  onDuplicate,
  allowDupe = false,
  inspecaoExtras,
  currentUserId,
  currentUserName,
  renderInspecoesList,
  onSaveNovaInspecao,
  onAddUnidadeMaterial,
  onSaveObservacao
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  const isExecute = mode === "execute";
  const isEdit = mode === "edit";
  const isReadOnly = mode === "readOnly";
  const [showObs, setShowObs] = (0, import_react7.useState)(false);
  const [showInsp, setShowInsp] = (0, import_react7.useState)(false);
  const [showAddInsp, setShowAddInsp] = (0, import_react7.useState)(false);
  const [showMat, setShowMat] = (0, import_react7.useState)(false);
  const [showAddMat, setShowAddMat] = (0, import_react7.useState)(false);
  const [showAnexo, setShowAnexo] = (0, import_react7.useState)(false);
  const [savingTUM, setSavingTUM] = (0, import_react7.useState)(/* @__PURE__ */ new Set());
  const [localQty, setLocalQty] = (0, import_react7.useState)({});
  const [dirtyQty, setDirtyQty] = (0, import_react7.useState)(/* @__PURE__ */ new Set());
  const subscribeLive = vm.subscribeLive;
  (0, import_react7.useEffect)(() => {
    return subscribeLive();
  }, [subscribeLive]);
  const anexosLocais = (_a = vm.anexos) == null ? void 0 : _a.locais;
  const uploadAll = (_b = vm.anexos) == null ? void 0 : _b.uploadAll;
  const tarefaIdForUpload = tarefa == null ? void 0 : tarefa.id;
  (0, import_react7.useEffect)(() => {
    if (!isExecute || !tarefaIdForUpload || !uploadAll) return;
    const pending = (anexosLocais != null ? anexosLocais : []).filter(
      (a) => a.status === "pending" || a.status === "error"
    );
    if (pending.length === 0) return;
    void uploadAll(tarefaIdForUpload);
  }, [isExecute, tarefaIdForUpload, uploadAll, anexosLocais]);
  const tarefaUM = Array.isArray(tarefa == null ? void 0 : tarefa.tarefaUnidadesMateriais) ? tarefa.tarefaUnidadesMateriais : [];
  const inspecoes = Array.isArray(tarefa == null ? void 0 : tarefa.inspecoes) ? tarefa.inspecoes : [];
  const anexoCount = Array.isArray(tarefa == null ? void 0 : tarefa.anexos) ? tarefa.anexos.length : 0;
  const checked = (0, import_react7.useMemo)(
    () => {
      var _a2, _b2;
      return ((_b2 = (_a2 = vm.status) == null ? void 0 : _a2.current) != null ? _b2 : tarefa == null ? void 0 : tarefa.status) === "ENCERRADO";
    },
    [(_c = vm.status) == null ? void 0 : _c.current, tarefa == null ? void 0 : tarefa.status]
  );
  const handleQuantidadeChange = (tumId, value) => {
    setLocalQty((prev) => ({ ...prev, [String(tumId)]: value }));
    setDirtyQty((prev) => {
      if (prev.has(tumId)) return prev;
      const next = new Set(prev);
      next.add(tumId);
      return next;
    });
  };
  const handleQuantidadeBlur = async (tumId) => {
    if (!dirtyQty.has(tumId)) return;
    const raw = localQty[String(tumId)];
    const num = typeof raw === "number" ? raw : Number(raw);
    if (Number.isNaN(num)) {
      setDirtyQty((prev) => {
        const next = new Set(prev);
        next.delete(tumId);
        return next;
      });
      return;
    }
    setSavingTUM((prev) => {
      const next = new Set(prev);
      next.add(tumId);
      return next;
    });
    try {
      await vm.unidadeMaterial.updateQuantidade(tumId, num);
      setDirtyQty((prev) => {
        const next = new Set(prev);
        next.delete(tumId);
        return next;
      });
    } catch (e) {
    } finally {
      setSavingTUM((prev) => {
        const next = new Set(prev);
        next.delete(tumId);
        return next;
      });
    }
  };
  const handleOpenObs = async () => {
    try {
      await vm.observacoes.load();
    } catch (e) {
    }
    setShowObs(true);
  };
  const handleOpenAnexo = async () => {
    var _a2, _b2;
    try {
      await ((_b2 = (_a2 = vm.anexos) == null ? void 0 : _a2.loadAnexos) == null ? void 0 : _b2.call(_a2));
    } catch (e) {
    }
    setShowAnexo(true);
  };
  const handleSendObs = async (texto) => {
    if (onSaveObservacao) {
      onSaveObservacao(texto);
      return;
    }
    await vm.observacoes.add({ texto });
  };
  const handleToggleStatus = async () => {
    try {
      await vm.status.toggle();
    } catch (e) {
    }
  };
  const handleConfirmedNovaInspecao = async (dto) => {
    if (onSaveNovaInspecao) {
      onSaveNovaInspecao(dto);
      return;
    }
  };
  const handleConfirmedAddMaterial = async (dto) => {
    if (onAddUnidadeMaterial) {
      onAddUnidadeMaterial(dto);
      return;
    }
  };
  const conditionalMaterialUtilizadoFieldRender = (tUM, _i2) => {
    const tumId = tUM.id;
    if (savingTUM.has(tumId)) {
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "w-100", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui_kit_core12.Spinner, { animation: "border" }) });
    }
    const localValue = localQty[String(tumId)];
    const displayValue = localValue !== void 0 ? localValue : tUM.quantidade;
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      import_teraprox_ui_kit6.FormField,
      {
        styleObj: { fontSize: "1.2rem" },
        ty: "number",
        className: "w-100",
        val: displayValue,
        onValueUpdate: (v) => handleQuantidadeChange(tumId, v),
        onBlur: () => void handleQuantidadeBlur(tumId)
      }
    );
  };
  const anexosPersistidos = (0, import_react7.useMemo)(() => {
    var _a2, _b2;
    return ((_b2 = (_a2 = vm.anexos) == null ? void 0 : _a2.persistidos) != null ? _b2 : []).map((a, i) => {
      var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2;
      return {
        id: (_a3 = a.id) != null ? _a3 : `p-${i}`,
        nome: (_c2 = (_b3 = a.nome) != null ? _b3 : a.name) != null ? _c2 : `Anexo ${i + 1}`,
        originalName: (_d2 = a.originalName) != null ? _d2 : a.nome,
        mimeType: (_e2 = a.mimeType) != null ? _e2 : a.contentType,
        tipo: (_h2 = (_g2 = (_f2 = a.tipo) != null ? _f2 : a.type) != null ? _g2 : a.contentType) != null ? _h2 : "",
        tamanho: (_i2 = a.tamanho) != null ? _i2 : a.size,
        url: (_j2 = a.url) != null ? _j2 : a.signedUrl,
        signedUrl: a.signedUrl,
        key: a.key,
        createdAt: a.createdAt
      };
    });
  }, [(_d = vm.anexos) == null ? void 0 : _d.persistidos]);
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui_kit_core12.Card, { className: "shadow-sm tarefa-shell-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "tarefa-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "tarefa-title-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("strong", { children: (_e = tarefa.sequencia && `${tarefa.sequencia}.`) != null ? _e : "-" }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ms-2", children: tarefa.descricao })
          ] }),
          ((_f = tarefa.acao) == null ? void 0 : _f.nome) && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "tarefa-acao-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_fa7.FaWrench, {}),
            " ",
            tarefa.acao.nome
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "d-flex gap-3 align-items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            import_fa7.FaComments,
            {
              title: "Observa\xE7\xF5es",
              size: 25,
              className: "hoverable-div",
              onClick: () => void handleOpenObs()
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            import_ui_kit_core13.IconWithBadge,
            {
              icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                import_fa7.FaClipboardList,
                {
                  title: "Inspe\xE7\xF5es",
                  size: 25,
                  className: "hoverable-div",
                  onClick: () => setShowInsp(true)
                }
              ),
              content: inspecoes.length
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            import_ui_kit_core13.IconWithBadge,
            {
              icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                import_fa7.FaCubes,
                {
                  title: "Materiais",
                  size: 25,
                  className: "hoverable-div",
                  onClick: () => setShowMat(true)
                }
              ),
              content: tarefaUM.length
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            import_ui_kit_core13.IconWithBadge,
            {
              icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                import_fa7.FaPaperclip,
                {
                  title: "Anexos",
                  size: 25,
                  className: "hoverable-div",
                  onClick: () => void handleOpenAnexo()
                }
              ),
              content: anexoCount > 0 ? anexoCount : null
            }
          )
        ] }),
        isEdit && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
          allowDupe && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "d-flex gap-3 align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            import_md5.MdContentCopy,
            {
              className: "hoverable-div",
              size: 20,
              onClick: () => onDuplicate == null ? void 0 : onDuplicate(),
              role: "button",
              "aria-label": "Duplicar tarefa"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            "div",
            {
              style: { marginLeft: "auto" },
              className: "d-flex gap-3 align-items-center",
              children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                import_fa7.FaTimes,
                {
                  className: "hoverable-div",
                  size: 20,
                  onClick: () => onRemove == null ? void 0 : onRemove(),
                  role: "button",
                  "aria-label": "Remover tarefa"
                }
              )
            }
          )
        ] }),
        (isExecute || isReadOnly) && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "d-flex align-items-start", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          import_teraprox_ui_kit6.StatusBadge,
          {
            status: (_h = (_g = vm.status) == null ? void 0 : _g.current) != null ? _h : tarefa.status,
            showCheckbox: isExecute,
            checked,
            onToggle: isExecute ? () => void handleToggleStatus() : void 0,
            loading: !!((_i = vm.status) == null ? void 0 : _i.saving)
          }
        ) })
      ] }),
      tarefaUM.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui_kit_core12.Card.Footer, { children: tarefaUM.map((tum, i) => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
          "div",
          {
            style: {
              gap: "8px",
              display: "flex",
              padding: "4px 0",
              borderBottom: "1px solid #ddd",
              opacity: 0.7
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { style: { textAlign: "center" }, children: i + 1 }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { children: (_d2 = (_c2 = (_b2 = tum.unidadeMaterial) == null ? void 0 : _b2.nomeMaterial) != null ? _c2 : tum.nomeMaterial) != null ? _d2 : "-" }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
                tum.quantidade,
                " ",
                (_g2 = (_f2 = (_e2 = tum.unidadeMaterial) == null ? void 0 : _e2.labelUnidade) != null ? _f2 : tum.labelUnidade) != null ? _g2 : ""
              ] })
            ]
          },
          (_a2 = tum.id) != null ? _a2 : i
        );
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      ObservacaoModal,
      {
        show: showObs,
        onClose: () => setShowObs(false),
        observacoes: (_k = (_j = vm.observacoes) == null ? void 0 : _j.list) != null ? _k : [],
        currentUserId,
        currentUserName,
        readOnly: isReadOnly,
        onSend: handleSendObs
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
      import_teraprox_ui_kit6.ResponsiveContainer,
      {
        title: "Inspe\xE7\xF5es",
        show: showInsp,
        setShow: setShowInsp,
        children: [
          renderInspecoesList ? renderInspecoesList({
            inspecoes,
            isMobile,
            readOnly: isReadOnly
          }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "text-muted small p-2", children: inspecoes.length === 0 ? "Nenhuma inspe\xE7\xE3o cadastrada." : `${inspecoes.length} inspe\xE7\xE3o(\xF5es) \u2014 visualizacao detalhada nao disponivel neste contexto.` }),
          !isReadOnly && inspecaoExtras && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            "button",
            {
              type: "button",
              className: "btn btn-outline-primary",
              onClick: () => setShowAddInsp(true),
              children: "Nova inspe\xE7\xE3o"
            }
          ) })
        ]
      }
    ),
    !isReadOnly && inspecaoExtras && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      InspecaoModal,
      {
        show: showAddInsp,
        onClose: () => setShowAddInsp(false),
        onConfirmed: async (dto) => {
          await handleConfirmedNovaInspecao(dto);
          setShowAddInsp(false);
        },
        vm: vm.inspecao,
        tiposDeDado: inspecaoExtras.tiposDeDado,
        parametrosOps: inspecaoExtras.parametrosOps,
        loadUnidadesFunc: inspecaoExtras.loadUnidadesFunc,
        renderLimitesDeControle: inspecaoExtras.renderLimitesDeControle
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
      import_teraprox_ui_kit6.ResponsiveContainer,
      {
        title: "Materiais",
        show: showMat,
        setShow: setShowMat,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 12,
                marginTop: 12
              },
              children: tarefaUM.map((tum, i) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2;
                const nomeMaterial = (_c2 = (_b2 = (_a2 = tum.unidadeMaterial) == null ? void 0 : _a2.nomeMaterial) != null ? _b2 : tum.nomeMaterial) != null ? _c2 : "-";
                const labelUnidade = (_f2 = (_e2 = (_d2 = tum.unidadeMaterial) == null ? void 0 : _d2.labelUnidade) != null ? _e2 : tum.labelUnidade) != null ? _f2 : "";
                const qtdPlanejada = (_i2 = (_h2 = (_g2 = tum.unidadeMaterial) == null ? void 0 : _g2.quantidade) != null ? _h2 : tum.quantidade) != null ? _i2 : "-";
                return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                  import_ui_kit_core12.Card,
                  {
                    style: {
                      border: "1px solid #e3e6f0",
                      borderRadius: 8,
                      backgroundColor: "#fdfdfe",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui_kit_core12.Card.Body, { style: { padding: "1rem" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "d-flex align-items-center gap-2 mb-3", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_fa7.FaCubes, { style: { color: "#17a2b8", fontSize: "1rem" } }),
                        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                          "div",
                          {
                            className: "mb-0",
                            style: { fontSize: "1rem", color: "#2c3e50", fontWeight: 500 },
                            children: nomeMaterial
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                        "div",
                        {
                          className: "mb-3 p-2",
                          style: { backgroundColor: "#f8f9fa", borderRadius: 6 },
                          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "d-flex justify-content-between align-items-center", children: [
                            /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "d-flex align-items-center gap-2", children: [
                              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("small", { className: "text-muted fw-bold", children: "UNIDADE" }),
                              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-dark fw-semibold", children: labelUnidade || "-" })
                            ] }),
                            /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "d-flex align-items-center gap-2", children: [
                              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("small", { className: "text-muted fw-bold", children: "QTD. PLANEJADA" }),
                              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-dark fw-semibold", children: qtdPlanejada })
                            ] })
                          ] })
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("small", { className: "text-muted fw-bold d-block mb-1", children: "QTD. UTILIZADA" }),
                        isExecute ? conditionalMaterialUtilizadoFieldRender(tum, i) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { style: { fontSize: "1.1rem", fontWeight: 500 }, children: (_k2 = tum.quantidade) != null ? _k2 : "-" })
                      ] })
                    ] })
                  },
                  (_j2 = tum.id) != null ? _j2 : i
                );
              })
            }
          ),
          !isReadOnly && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "mt-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              "button",
              {
                type: "button",
                className: "btn btn-outline-primary",
                onClick: () => {
                  var _a2, _b2;
                  (_b2 = (_a2 = vm.unidadeMaterial) == null ? void 0 : _a2.reset) == null ? void 0 : _b2.call(_a2);
                  setShowAddMat(true);
                },
                children: "Adicionar material"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              UnidadeMaterialModal,
              {
                show: showAddMat,
                onClose: () => setShowAddMat(false),
                onConfirmed: async (dto) => {
                  await handleConfirmedAddMaterial(dto);
                  setShowAddMat(false);
                },
                vm: vm.unidadeMaterial
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      import_teraprox_ui_kit6.ResponsiveContainer,
      {
        title: "Anexos",
        show: showAnexo,
        setShow: setShowAnexo,
        scrollable: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          import_ui_kit_core13.AnexoManager,
          {
            persistidos: anexosPersistidos,
            locais: (_m = (_l = vm.anexos) == null ? void 0 : _l.locais) != null ? _m : [],
            onAddFiles: (_n = vm.anexos) == null ? void 0 : _n.addFiles,
            onRemoveLocal: (_o = vm.anexos) == null ? void 0 : _o.removeLocal,
            onRemovePersistido: (_p = vm.anexos) == null ? void 0 : _p.removePersistido,
            getImageReadUrl: async (anexo) => {
              const u = anexo.url || anexo.signedUrl;
              if (u) return u;
              try {
                return await vm.anexos.getUrl(anexo.id, anexo.key);
              } catch (e) {
                return "";
              }
            },
            onDownload: async (anexo) => {
              const url = anexo.url || anexo.signedUrl || await vm.anexos.getUrl(anexo.id, anexo.key).catch(() => "");
              if (url) window.open(url, "_blank");
            },
            loading: (_q = vm.anexos) == null ? void 0 : _q.loading,
            readonly: isReadOnly,
            maxFiles: 10
          }
        )
      }
    )
  ] });
};

// src/mantenedor/MantenedorPicker.tsx
var import_react8 = __toESM(require("react"));
var import_ui_kit_core14 = require("@hashcodeti/ui-kit-core");
var import_gr6 = require("react-icons/gr");
var import_teraprox_ui_kit7 = require("teraprox-ui-kit");
var import_jsx_runtime19 = require("react/jsx-runtime");
var MantenedorPicker = ({
  viewModel,
  currentOsId,
  onSelected,
  label = "Manutentores",
  disabled,
  className
}) => {
  const [hideOps, setHideOps] = import_react8.default.useState(true);
  const handleClick = (m) => {
    const kind = viewModel.requestSelect(m, currentOsId);
    if (kind === "immediate") {
      onSelected(m);
      viewModel.search(m.nomeUsuario);
      setHideOps(true);
    } else {
      setHideOps(true);
    }
  };
  const handleConfirm = () => {
    const item = viewModel.confirmSelect();
    if (item) {
      onSelected(item);
      viewModel.search(item.nomeUsuario);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { onMouseLeave: () => setHideOps(true), className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      import_teraprox_ui_kit7.FormField,
      {
        label,
        labelPosition: "top",
        val: viewModel.isLoading ? "Carregando..." : viewModel.searchTerm,
        onValueUpdate: (v) => {
          if (hideOps) setHideOps(false);
          viewModel.search(v);
        },
        onFocus: () => {
          setHideOps(false);
          viewModel.cancelConfirm();
        },
        locked: disabled || viewModel.isLoading,
        className: "mantenedores-label",
        others: {
          autoComplete: "off",
          className: "mantenedores-select"
        }
      }
    ),
    !hideOps && viewModel.pendingConfirm === null && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui_kit_core14.List, { className: "list-mantenedor-container", children: viewModel.filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui_kit_core14.ListItem, { children: "Nenhum manutentor encontrado." }) : viewModel.filteredOptions.map((m) => {
      const isBusyOther = m._busy && m.osId !== currentOsId;
      const isBusyHere = m._busy && m.osId === currentOsId;
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        import_ui_kit_core14.ListItem,
        {
          onClick: () => handleClick(m),
          className: `mantenedor-option ${isBusyOther ? "busy" : ""} ${isBusyHere ? "current-os" : ""}`,
          children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "flex items-center w-full", children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { children: m.nomeUsuario }),
            isBusyHere && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "current-os-indicator", children: [
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_gr6.GrCheckmark, { size: 18 }),
              " Trabalhando nesta OS"
            ] }),
            isBusyOther && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "busy-os-indicator", children: `Alocado OS-${m.osId}` })
          ] })
        },
        m.id
      );
    }) }),
    viewModel.pendingConfirm && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "confirm-desaloc-container", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      import_teraprox_ui_kit7.ApproveAndReproveButtons,
      {
        headerText: `Deseja desalocar ${viewModel.pendingConfirm.nomeUsuario} da OS-${viewModel.pendingConfirm.osId} para uma nova aloca\xE7\xE3o?`,
        approveCallback: handleConfirm,
        reproveCallback: () => {
          viewModel.cancelConfirm();
          setHideOps(false);
        },
        cancelCallback: () => {
          viewModel.cancelConfirm();
          setHideOps(false);
        }
      }
    ) })
  ] });
};

// src/os/OsCard.tsx
var import_react9 = require("react");
var import_ui_kit_core15 = require("@hashcodeti/ui-kit-core");
var import_fa8 = require("react-icons/fa");
var import_fa63 = require("react-icons/fa6");
var import_dayjs = __toESM(require("dayjs"));

// src/os/statusPalette.ts
var OS_STATUS_PALETTE = {
  CONCLUIDO: { color: "#3DBE5B", label: "Conclu\xEDda" },
  PENDENTE: { color: "#2D8CFF", label: "Pendente" },
  ATRASADO: { color: "#FF4D4F", label: "Atrasado" },
  EXECUTANDO: { color: "#FF9F1A", label: "Executando" },
  AGUARDANDO_RECURSO: { color: "#FF7F50", label: "Aguardando Recurso" },
  EM_DIA: { color: "#26A69A", label: "Em Dia" },
  CANCELED: { color: "#9E9E9E", label: "Cancelada" },
  DEFAULT: { color: "#BDBDBD", label: "Indefinido" }
};
function getOsStatusMeta(status) {
  if (!status) return OS_STATUS_PALETTE.DEFAULT;
  return OS_STATUS_PALETTE[status] || OS_STATUS_PALETTE.DEFAULT;
}

// src/os/OsCard.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var IconButton = ({ icon, label, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  "button",
  {
    type: "button",
    className: "os-cta",
    "aria-label": label,
    title: label,
    onClick,
    children: icon
  }
);
var OsCardImpl = ({
  ordem,
  onView,
  onEdit,
  onEditModel,
  onCardAction,
  onViewAgregador,
  onViewRecorrencia,
  onViewSolicitacao,
  onIniciar,
  onContinuar,
  isSelectable,
  isSelected,
  onToggleSelect,
  disableStatusIndicator = false,
  loading = false
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const [iniciando, setIniciando] = (0, import_react9.useState)(false);
  const meta = getOsStatusMeta(ordem.isLate ? "ATRASADO" : ordem.status);
  const statusUpper = ((_a = ordem.status) != null ? _a : "").toUpperCase();
  const isPendente = statusUpper === "PENDENTE";
  const isExecutando = statusUpper === "EXECUTANDO";
  const isRec = Boolean(ordem.recorrenciaId);
  const isAgg = Boolean(ordem.agregadorId);
  const inAlert = isAgg && ((_b = ordem.realizado) != null ? _b : 0) >= ((_c = ordem.warn) != null ? _c : Infinity) && ((_d = ordem.realizado) != null ? _d : 0) < ((_e = ordem.valorPlanejado) != null ? _e : Infinity);
  const isCritical = isAgg && ((_f = ordem.realizado) != null ? _f : 0) >= ((_g = ordem.valorPlanejado) != null ? _g : Infinity);
  const isVirtual = Boolean(ordem.isVirtual);
  const ssOrigemId = ordem.solicitacaoOrigemId;
  const hasSsOrigem = ssOrigemId !== void 0 && ssOrigemId !== null && ssOrigemId !== "";
  const isDireta = !hasSsOrigem && !isRec && !isAgg && !isVirtual && Boolean(ordem.id);
  const canIniciar = !isVirtual && isPendente && Boolean(ordem.id) && Boolean(onIniciar);
  const canContinuar = !isVirtual && isExecutando && Boolean(ordem.id) && Boolean(onContinuar);
  const handleIniciar = async (e) => {
    e.stopPropagation();
    if (!onIniciar || iniciando) return;
    setIniciando(true);
    try {
      await onIniciar(ordem);
    } finally {
      setIniciando(false);
    }
  };
  const handleContinuar = (e) => {
    e.stopPropagation();
    onContinuar == null ? void 0 : onContinuar(ordem);
  };
  const borderColor = !disableStatusIndicator && isCritical ? "#ef4444" : !disableStatusIndicator && inAlert ? "#f59e0b" : meta.color;
  const cardClass = [
    "mb-2 os-card",
    isSelected ? "os-card--selected" : "",
    isSelectable ? "os-card--selectable" : "",
    !disableStatusIndicator && isCritical ? "os-card--critical" : "",
    !disableStatusIndicator && inAlert ? "os-card--warn" : ""
  ].filter(Boolean).join(" ");
  const mantenedores = (ordem.osMantenedor || []).map((m) => {
    var _a2, _b2;
    return ((_a2 = m == null ? void 0 : m.mantenedor) == null ? void 0 : _a2.nomeUsuario) || ((_b2 = m == null ? void 0 : m.mantenedor) == null ? void 0 : _b2.nome) || (m == null ? void 0 : m.nome) || "";
  }).filter(Boolean);
  const counterPercent = isAgg && ((_h = ordem.valorPlanejado) != null ? _h : 0) > 0 ? Math.min(100, Math.round(((_i = ordem.realizado) != null ? _i : 0) / ordem.valorPlanejado * 100)) : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui_kit_core15.Card, { className: cardClass, style: { borderLeftColor: borderColor }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    import_ui_kit_core15.Card.Body,
    {
      className: "p-2 d-flex flex-column gap-1",
      onClick: isSelectable ? () => onToggleSelect == null ? void 0 : onToggleSelect(ordem) : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "d-flex align-items-start justify-content-between gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "d-flex align-items-center gap-2 flex-grow-1", style: { minWidth: 0 }, children: [
            isVirtual ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              IconButton,
              {
                icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaClipboardList, {}),
                label: "A\xE7\xF5es para OS virtual",
                onClick: (e) => {
                  e.stopPropagation();
                  onCardAction == null ? void 0 : onCardAction(ordem);
                }
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              IconButton,
              {
                icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaArrowRight, {}),
                label: "Ver OS",
                onClick: (e) => {
                  e.stopPropagation();
                  onView == null ? void 0 : onView(ordem.id);
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: { minWidth: 0, flex: 1 }, children: [
              ordem.id && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: { fontSize: "0.72rem", color: "#9ca3af", lineHeight: 1.2 }, children: [
                "#",
                ordem.id
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "os-card__title text-truncate", children: [ordem.father, (_j = ordem.recurso) == null ? void 0 : _j.nome].filter(Boolean).join(" \u203A ") || "Recurso" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            "span",
            {
              className: "badge flex-shrink-0",
              style: { backgroundColor: meta.color, color: "#fff", alignSelf: "flex-start", marginTop: "2px" },
              children: meta.label
            }
          )
        ] }),
        ordem.descricaoDoProblema && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "os-card__muted os-card__desc", children: ordem.descricaoDoProblema }),
        (isRec || isAgg || isVirtual || hasSsOrigem || isDireta) && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "d-flex flex-wrap gap-1", children: [
          hasSsOrigem && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
            "button",
            {
              type: "button",
              className: "os-chip",
              onClick: (e) => {
                e.stopPropagation();
                if (!isSelectable && onViewSolicitacao) {
                  onViewSolicitacao(ssOrigemId);
                }
              },
              title: `Originada da Solicita\xE7\xE3o #${ssOrigemId}`,
              style: {
                background: "#fef3c7",
                borderColor: "#fcd34d",
                color: "#92400e",
                cursor: onViewSolicitacao && !isSelectable ? "pointer" : "default"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaPaperPlane, { size: 10 }),
                " SS #",
                ssOrigemId
              ]
            }
          ),
          isDireta && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
            "span",
            {
              className: "os-chip",
              title: "OS criada diretamente, sem solicita\xE7\xE3o de origem",
              style: { background: "#f1f5f9", borderColor: "#cbd5e1", color: "#475569" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaClipboardList, { size: 10 }),
                " Direta"
              ]
            }
          ),
          isRec && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
            "button",
            {
              type: "button",
              className: "os-chip",
              onClick: (e) => {
                e.stopPropagation();
                !isSelectable && (onViewRecorrencia == null ? void 0 : onViewRecorrencia(ordem.recorrenciaId));
              },
              title: "Ver hist\xF3rico de recorr\xEAncia",
              style: { background: "#ede9fe", borderColor: "#c4b5fd", color: "#6d28d9", cursor: onViewRecorrencia ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaArrowsRotate, { size: 10 }),
                " Recorrente"
              ]
            }
          ),
          isAgg && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
            "button",
            {
              type: "button",
              className: "os-chip",
              onClick: (e) => {
                e.stopPropagation();
                !isSelectable && (onViewAgregador == null ? void 0 : onViewAgregador(ordem.agregadorId));
              },
              title: "Ver hist\xF3rico do contador",
              style: { background: "#d1fae5", borderColor: "#6ee7b7", color: "#065f46", cursor: onViewAgregador ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaPlus, { size: 10 }),
                " Contador"
              ]
            }
          ),
          isVirtual && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "os-chip", style: { background: "#e0e7ff", borderColor: "#a5b4fc", color: "#3730a3" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaClipboardList, { size: 10 }),
            " OS Virtual"
          ] })
        ] }),
        isAgg && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "d-flex justify-content-between align-items-center mb-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("small", { className: "os-card__muted", children: [
              (_k = ordem.realizado) != null ? _k : 0,
              " / ",
              (_l = ordem.valorPlanejado) != null ? _l : "-",
              ordem.eficienciaDoAgregador != null && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "ms-1", children: [
                "(",
                Number(ordem.eficienciaDoAgregador).toFixed(1),
                "%)"
              ] })
            ] }),
            isCritical && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "os-card__alert-badge", children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa8.FaExclamationTriangle, { size: 9 }),
              " LIMITE ATINGIDO"
            ] }),
            inAlert && !isCritical && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "os-card__alert-badge", children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa8.FaExclamationTriangle, { size: 9 }),
              " PR\xD3X. LIMITE"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { height: "4px", borderRadius: "2px", background: "#e9ecef", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: {
            height: "100%",
            width: `${counterPercent}%`,
            background: isCritical ? "#ef4444" : inAlert ? "#f59e0b" : meta.color,
            transition: "width 0.3s ease"
          } }) })
        ] }),
        mantenedores.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "os-card__muted d-flex align-items-center gap-1 text-truncate", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa8.FaUser, { size: 10, className: "flex-shrink-0" }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "text-truncate", children: mantenedores.join(", ") })
        ] }),
        !isSelectable && (canIniciar || canContinuar) && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "d-flex justify-content-end", children: [
          canIniciar && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
            import_ui_kit_core15.Button,
            {
              size: "sm",
              variant: "primary",
              onClick: handleIniciar,
              disabled: iniciando || loading,
              className: "d-flex align-items-center gap-1",
              children: [
                iniciando ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui_kit_core15.Spinner, { size: "sm", animation: "border", role: "status" }) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa8.FaPlay, { size: 10 }),
                "Iniciar"
              ]
            }
          ),
          canContinuar && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
            import_ui_kit_core15.Button,
            {
              size: "sm",
              variant: "warning",
              onClick: handleContinuar,
              disabled: loading,
              className: "d-flex align-items-center gap-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa8.FaPlay, { size: 10 }),
                "Continuar"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
          "div",
          {
            className: "d-flex align-items-center gap-2 os-card__muted",
            style: { borderTop: "1px solid #f3f4f6", paddingTop: "4px", fontSize: "0.78rem" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "d-flex align-items-center gap-1 flex-grow-1 text-truncate", children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa8.FaClock, { size: 9, className: "flex-shrink-0" }),
                ordem.dataPlanejada ? (0, import_dayjs.default)(ordem.dataPlanejada).format("DD/MM [\xE0s] HH:mm") : "\u2014",
                ordem.status === "CONCLUIDO" && ordem.dataDeEncerramento && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "text-success ms-1", children: [
                  "\xB7 enc. ",
                  (0, import_dayjs.default)(ordem.dataDeEncerramento).format("DD/MM")
                ] })
              ] }),
              (ordem.setorDestino || ordem.setor) && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "text-truncate flex-shrink-0", style: { maxWidth: "110px" }, children: ordem.setorDestino || ordem.setor }),
              Array.isArray(ordem.tarefas) && ordem.tarefas.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "badge bg-secondary d-flex align-items-center gap-1 flex-shrink-0", style: { fontSize: "0.72rem" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa63.FaClipboardList, { size: 9 }),
                ordem.tarefas.length
              ] })
            ]
          }
        )
      ]
    }
  ) });
};
var OsCard = (0, import_react9.memo)(OsCardImpl);
OsCard.displayName = "OsCard";

// src/os/OrdemDeServicoDisplayCard.tsx
var React10 = __toESM(require("react"));
var import_pi = require("react-icons/pi");
var import_fa64 = require("react-icons/fa6");
var import_ui_kit_core16 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime21 = require("react/jsx-runtime");
var OrdemDeServicoDisplayCardImpl = React10.forwardRef(function OrdemDeServicoDisplayCard({
  idLabel,
  statusColor,
  isForm = false,
  highlighted = false,
  items,
  initialVisibleCount = 5,
  expandLabel = "Ver mais",
  collapseLabel = "Ver menos",
  onNavigate,
  className
}, ref) {
  const [open, setOpen] = React10.useState(false);
  const visible = items.filter((it) => it.shouldShow !== false);
  const head = visible.slice(0, initialVisibleCount);
  const tail = visible.slice(initialVisibleCount);
  const hasOverflow = tail.length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    import_ui_kit_core16.Card,
    {
      ref,
      className: (0, import_ui_kit_core16.cn)(
        "mb-2 flex flex-row overflow-hidden border border-surface-border bg-white shadow-sm",
        highlighted && "ring-2 ring-violet-400",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "div",
          {
            className: (0, import_ui_kit_core16.cn)(
              "flex shrink-0 items-center justify-center px-3 py-2 text-center",
              "min-w-[75px] rounded-sm shadow-[1px_12px_5px_rgba(170,170,170,0.1)]"
            ),
            style: { backgroundColor: statusColor },
            children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
              "strong",
              {
                className: (0, import_ui_kit_core16.cn)(
                  "whitespace-nowrap text-[1.2rem] leading-tight",
                  isForm && "rotate-180 text-white [writing-mode:vertical-rl] [direction:rtl]"
                ),
                children: idLabel
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_ui_kit_core16.CardBody, { className: "flex-1 p-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("ul", { className: "m-0 list-none space-y-1.5 p-0", children: head.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(DisplayRow, { item: it }, `head-${i}-${it.label}`)) }),
          hasOverflow && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_ui_kit_core16.Collapsible, { open, onOpenChange: setOpen, children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui_kit_core16.CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("ul", { className: "m-0 mt-1.5 list-none space-y-1.5 p-0", children: tail.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(DisplayRow, { item: it }, `tail-${i}-${it.label}`)) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui_kit_core16.CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
              "button",
              {
                type: "button",
                className: (0, import_ui_kit_core16.cn)(
                  "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                  "text-violet-700 hover:text-violet-900 focus:outline-none"
                ),
                children: open ? /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_fa64.FaChevronUp, { size: 10 }),
                  " ",
                  collapseLabel
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_fa64.FaChevronDown, { size: 10 }),
                  " ",
                  expandLabel
                ] })
              }
            ) })
          ] })
        ] }),
        onNavigate && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "button",
          {
            type: "button",
            onClick: onNavigate,
            "aria-label": "Abrir OS",
            className: (0, import_ui_kit_core16.cn)(
              "shrink-0 self-start p-2 text-neutral-500 transition-transform",
              "hover:scale-110 hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_pi.PiArrowBendUpRightBold, { size: 25 })
          }
        )
      ]
    }
  );
});
var DisplayRow = ({ item }) => /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
  "li",
  {
    className: (0, import_ui_kit_core16.cn)(
      "flex flex-col gap-0.5 border-b border-neutral-100 pb-1.5 last:border-b-0 last:pb-0",
      "sm:flex-row sm:items-start sm:gap-3",
      item.clickable && "cursor-pointer"
    ),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "shrink-0 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:w-32", children: item.label }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "min-w-0 flex-1 text-sm text-neutral-800", children: item.content })
    ]
  }
);
var OrdemDeServicoDisplayCard2 = React10.memo(OrdemDeServicoDisplayCardImpl);
function getOrdemDeServicoDisplayColor(status) {
  switch (status) {
    case "PENDENTE":
      return "#FFFF00";
    case "EXECUTANDO":
      return "#00FF00";
    case "CONCLUIDO":
      return "#ccc";
    case "CANCELED":
      return "#FF0000";
    default:
      return "#e5e7eb";
  }
}

// src/os/PickMantenedorTipoModal.tsx
var import_react10 = require("react");
var import_ui_kit_core17 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime22 = require("react/jsx-runtime");
var isMissingMaintainers = (os) => !(os == null ? void 0 : os.osMantenedor) || os.osMantenedor.length === 0 || !os.osMantenedor.some((m) => m.active);
var isMissingType = (os) => !(os == null ? void 0 : os.osTipos) || os.osTipos.length === 0;
var PickMantenedorTipoModal = ({
  show,
  onHide,
  os,
  osList,
  viewModel,
  onAssigned,
  onError,
  forceShowMantenedores,
  forceShowTipo
}) => {
  const isMulti = Array.isArray(osList) && osList.length > 0;
  const targetList = (0, import_react10.useMemo)(
    () => isMulti ? osList : os ? [os] : [],
    [isMulti, osList, os]
  );
  const [selectedIds, setSelectedIds] = (0, import_react10.useState)([]);
  const [selectedTipoId, setSelectedTipoId] = (0, import_react10.useState)("");
  const [selectedOsIds, setSelectedOsIds] = (0, import_react10.useState)([]);
  const { mantenedores, tiposDeOrdem, loading, assigning } = viewModel;
  const selectedOs = (0, import_react10.useMemo)(
    () => targetList.filter((o) => isMulti ? selectedOsIds.includes(o.id) : true),
    [targetList, selectedOsIds, isMulti]
  );
  const missingMaintainers = (0, import_react10.useMemo)(
    () => forceShowMantenedores || selectedOs.some((o) => isMissingMaintainers(o)),
    [selectedOs, forceShowMantenedores]
  );
  const missingType = (0, import_react10.useMemo)(
    () => forceShowTipo || selectedOs.some((o) => isMissingType(o)),
    [selectedOs, forceShowTipo]
  );
  (0, import_react10.useEffect)(() => {
    if (show) {
      viewModel.loadOptions();
      setSelectedIds([]);
      setSelectedTipoId("");
      setSelectedOsIds(isMulti ? targetList.map((o) => o.id) : []);
    }
  }, [show]);
  const toggleMantenedor = (id) => {
    if (assigning) return;
    setSelectedIds(
      (prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const toggleOs = (osId) => {
    if (assigning) return;
    setSelectedOsIds(
      (prev) => prev.includes(osId) ? prev.filter((i) => i !== osId) : [...prev, osId]
    );
  };
  const isFormValid = () => {
    if (isMulti && selectedOsIds.length === 0) return false;
    if (missingMaintainers && selectedIds.length === 0) return false;
    if (missingType && !selectedTipoId) return false;
    if (!missingMaintainers && !missingType) return false;
    return true;
  };
  const handleConfirm = async () => {
    var _a, _b;
    if (assigning || !isFormValid()) return;
    try {
      const selectedMantenedores = mantenedores.filter((m) => selectedIds.includes(m.id));
      let assignedTipo = null;
      if (isMulti) {
        const osIds = selectedOsIds;
        if (missingMaintainers && selectedMantenedores.length > 0) {
          await viewModel.assignMantenedoresMultiOs(osIds, selectedMantenedores);
        }
        if (missingType && selectedTipoId) {
          await viewModel.assignTipoMultiOs(osIds, selectedTipoId);
          assignedTipo = (_a = tiposDeOrdem.find((t) => String(t.id) === String(selectedTipoId))) != null ? _a : null;
        }
        onAssigned == null ? void 0 : onAssigned(selectedMantenedores, assignedTipo, osIds);
      } else {
        const singleId = os == null ? void 0 : os.id;
        if (!singleId) return;
        if (missingMaintainers && selectedMantenedores.length > 0) {
          await viewModel.assignMantenedores(singleId, selectedMantenedores);
        }
        if (missingType && selectedTipoId) {
          await viewModel.assignTipo(singleId, selectedTipoId);
          assignedTipo = (_b = tiposDeOrdem.find((t) => String(t.id) === String(selectedTipoId))) != null ? _b : null;
        }
        onAssigned == null ? void 0 : onAssigned(selectedMantenedores, assignedTipo, [singleId]);
      }
      onHide();
    } catch (err) {
      onError == null ? void 0 : onError(err);
    }
  };
  const defaultActiveKeys = [];
  if (isMulti) defaultActiveKeys.push("os");
  if (missingType) defaultActiveKeys.push("tipo");
  if (missingMaintainers) defaultActiveKeys.push("mantenedores");
  const headerSubtitle = isMulti ? `Configure mantenedor e tipo em batch para as OS selecionadas (${selectedOsIds.length}/${targetList.length})` : `Preencha os requisitos pendentes para iniciar a OS #${os == null ? void 0 : os.id}`;
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    import_ui_kit_core17.Modal,
    {
      open: show,
      onOpenChange: (next) => {
        if (!next) onHide();
      },
      size: "lg",
      className: "pick-mantenedor-tipo-modal",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.ModalHeader, { className: "border-0 pb-0", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "font-bold", children: "Configura\xE7\xE3o da Ordem de Servi\xE7o" }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "text-neutral-500 text-sm font-normal", children: headerSubtitle })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.ModalBody, { className: "pt-3", children: loading ? /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "text-center p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.Spinner, { variant: "border", tone: "brand" }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "mt-2 text-neutral-500", children: "Carregando op\xE7\xF5es..." })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.Accordion, { type: "multiple", defaultValue: defaultActiveKeys, variant: "bordered", children: [
          isMulti && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.AccordionItem, { value: "os", className: "mb-3 shadow-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.AccordionTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "font-bold", children: "Aplicar a quais OS?" }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.Badge, { tone: "info", className: "ml-2", children: [
                selectedOsIds.length,
                " de ",
                targetList.length
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.AccordionContent, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex justify-end mb-2 gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                  import_ui_kit_core17.Button,
                  {
                    size: "sm",
                    variant: "outline-secondary",
                    disabled: assigning,
                    onClick: () => setSelectedOsIds(targetList.map((o) => o.id)),
                    children: "Marcar todas"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                  import_ui_kit_core17.Button,
                  {
                    size: "sm",
                    variant: "outline-secondary",
                    disabled: assigning,
                    onClick: () => setSelectedOsIds([]),
                    children: "Desmarcar todas"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "flex flex-col gap-2", children: targetList.map((o) => {
                var _a, _b, _c;
                const checked = selectedOsIds.includes(o.id);
                const recursoNome = (_b = (_a = o.recurso) == null ? void 0 : _a.nome) != null ? _b : "";
                const desc = ((_c = o.descricaoDoProblema) != null ? _c : "").slice(0, 80);
                const tagMissing = [];
                if (isMissingMaintainers(o)) tagMissing.push("Sem executor");
                if (isMissingType(o)) tagMissing.push("Sem tipo");
                return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                  import_ui_kit_core17.Checkbox,
                  {
                    id: `pmt-os-${o.id}`,
                    checked,
                    disabled: assigning,
                    onCheckedChange: () => toggleOs(o.id),
                    label: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("strong", { children: [
                        "OS #",
                        o.id
                      ] }),
                      recursoNome && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-neutral-500 ml-2", children: recursoNome }),
                      desc && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: "text-neutral-500 ml-2", children: [
                        "\u2014 ",
                        desc
                      ] }),
                      tagMissing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.Badge, { tone: "warning", className: "ml-2", children: tagMissing.join(" \xB7 ") })
                    ] })
                  },
                  o.id
                );
              }) })
            ] })
          ] }),
          missingType && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.AccordionItem, { value: "tipo", className: "mb-3 shadow-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.AccordionTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: "font-bold", children: [
                isMulti ? "2." : "1.",
                " Selecionar Tipo de Ordem"
              ] }),
              !selectedTipoId && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.Badge, { tone: "warning", className: "ml-2", children: "Obrigat\xF3rio" }),
              selectedTipoId && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.Badge, { tone: "success", className: "ml-2", children: "Selecionado" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.FieldLabel, { className: "text-neutral-500 text-xs", children: [
                "Tipo aplicado a ",
                isMulti ? "todas as OS marcadas" : "esta OS"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
                import_ui_kit_core17.Select,
                {
                  value: selectedTipoId,
                  onValueChange: (v) => setSelectedTipoId(v),
                  disabled: assigning,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.SelectValue, { placeholder: "-- Selecione um tipo --" }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.SelectContent, { children: tiposDeOrdem.map((t) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.SelectItem, { value: String(t.id), children: t.tipo }, t.id)) })
                  ]
                }
              )
            ] }) })
          ] }),
          missingMaintainers && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.AccordionItem, { value: "mantenedores", className: "shadow-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.AccordionTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: "font-bold", children: [
                isMulti ? "3." : missingType ? "2." : "1.",
                " Selecionar Executores"
              ] }),
              selectedIds.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.Badge, { tone: "warning", className: "ml-2", children: "Obrigat\xF3rio" }),
              selectedIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.Badge, { tone: "success", className: "ml-2", children: [
                selectedIds.length,
                " Selecionado(s)"
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: !Array.isArray(mantenedores) || mantenedores.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "col-span-full text-center py-5 text-neutral-500", children: "Nenhum mantenedor encontrado." }) : mantenedores.map((m) => {
              const isSelected = selectedIds.includes(m.id);
              return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                "div",
                {
                  onClick: () => toggleMantenedor(m.id),
                  style: {
                    cursor: assigning ? "not-allowed" : "pointer",
                    opacity: assigning ? 0.7 : 1,
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.2s"
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: isSelected ? "rounded-md p-1 bg-brand-primary-muted border border-brand-primary" : "", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ManutentorCardCompact, { mantenedor: m }) })
                },
                m.id
              );
            }) }) })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui_kit_core17.ModalFooter, { className: "border-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui_kit_core17.Button, { variant: "outline-secondary", onClick: onHide, disabled: assigning, children: "Cancelar" }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            import_ui_kit_core17.Button,
            {
              variant: "primary",
              onClick: handleConfirm,
              disabled: assigning || !isFormValid(),
              className: "px-4",
              loading: assigning,
              children: assigning ? "Salvando..." : "Confirmar"
            }
          )
        ] })
      ]
    }
  );
};

// src/om/OrdemStatusIndicator.tsx
var import_react11 = __toESM(require("react"));
var import_bs2 = require("react-icons/bs");
var import_jsx_runtime23 = require("react/jsx-runtime");
var OrdemStatusIndicator = import_react11.default.forwardRef(({ status, getStatusColor, getStatusText, className }, ref) => {
  const color = getStatusColor(status);
  const renderIcon = () => {
    const iconStyle = { color, width: 32, height: 32 };
    switch (status) {
      case "PENDENTE":
        return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_bs2.BsClock, { style: iconStyle });
      case "EXECUTANDO":
        return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_bs2.BsPlayCircle, { style: iconStyle });
      case "CONCLUIDO":
        return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_bs2.BsCheckCircle, { style: iconStyle });
      case "CANCELADO":
        return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_bs2.BsPerson, { style: iconStyle });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { ref, className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      "div",
      {
        className: "mx-auto mb-3 flex items-center justify-center rounded-full",
        style: { backgroundColor: `${color}1A`, width: 64, height: 64 },
        children: renderIcon()
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h4", { className: "mb-2 text-surface-foreground text-xl font-semibold", children: "Status Atual" }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      "span",
      {
        className: "inline-block rounded-full px-4 py-2 text-base font-bold uppercase text-white",
        style: { backgroundColor: color },
        children: getStatusText(status)
      }
    )
  ] });
});
OrdemStatusIndicator.displayName = "OrdemStatusIndicator";

// src/om/OrdemStatusActions.tsx
var import_ui_kit_core18 = require("@hashcodeti/ui-kit-core");
var import_bs3 = require("react-icons/bs");
var import_jsx_runtime24 = require("react/jsx-runtime");
var OrdemStatusActions = ({
  status,
  ordem,
  onIniciar,
  onConcluir,
  iniciando = false,
  concluindo = false,
  className
}) => {
  if (status === "PENDENTE") {
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: className != null ? className : "mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("small", { className: "mb-3 block text-neutral-500", children: "Aguardando in\xEDcio" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        import_ui_kit_core18.Button,
        {
          variant: "success",
          size: "lg",
          onClick: onIniciar,
          disabled: iniciando,
          className: "px-4 font-bold",
          children: iniciando ? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui_kit_core18.Spinner, { size: "sm", className: "mr-2" }),
            "Iniciando..."
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_bs3.BsPlay, { className: "mr-2 inline-block" }),
            "Iniciar OM"
          ] })
        }
      )
    ] });
  }
  if (status === "EXECUTANDO") {
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: className != null ? className : "mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      import_ui_kit_core18.Button,
      {
        variant: "primary",
        size: "lg",
        onClick: onConcluir,
        disabled: concluindo,
        className: "px-4 font-bold",
        children: concluindo ? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui_kit_core18.Spinner, { size: "sm", className: "mr-2" }),
          "Concluindo..."
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_bs3.BsCheckCircle, { className: "mr-2 inline-block" }),
          "Concluir OM"
        ] })
      }
    ) });
  }
  if (status === "CONCLUIDO" && (ordem == null ? void 0 : ordem.encerradoPor)) {
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: className != null ? className : "mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("small", { className: "block text-neutral-500", children: "Conclu\xEDda por" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("strong", { className: "text-state-success", children: ordem.encerradoPor })
    ] });
  }
  return null;
};

// src/om/OrdemInfoCard.tsx
var import_ui_kit_core19 = require("@hashcodeti/ui-kit-core");
var import_bs4 = require("react-icons/bs");
var import_jsx_runtime25 = require("react/jsx-runtime");
var Field = ({
  label,
  children,
  className
}) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: className != null ? className : "mb-3", children: [
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("strong", { className: "mb-2 block", children: label }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "mb-0", children })
] });
var OrdemInfoCard = ({ ordem, formatDate, className }) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui_kit_core19.Card, { className: className != null ? className : "mb-4", children: [
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui_kit_core19.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("h5", { className: "mb-0 flex items-center gap-2 text-base font-semibold", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_bs4.BsGear, {}),
    "Informa\xE7\xF5es Gerais"
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui_kit_core19.CardBody, { className: "p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Descri\xE7\xE3o:", className: "mb-3 md:col-span-2", children: ordem.descricao || "Sem descri\xE7\xE3o" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Setor:", children: ordem.setor }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Criado por:", children: ordem.criadoPor }),
      ordem.encerradoPor && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Encerrado por:", children: ordem.encerradoPor }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Data de In\xEDcio:", children: formatDate(ordem.dataDeInicio) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Data de Fim:", children: formatDate(ordem.dataDeFim) }),
      ordem.tempoPrevisto && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Field, { label: "Tempo Previsto:", children: [
        ordem.tempoPrevisto,
        " horas"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("hr", { className: "my-4 border-surface-border" }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("h6", { className: "mb-3 flex items-center gap-2 text-sm text-neutral-500", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_bs4.BsClock, {}),
      "Informa\xE7\xF5es do Sistema"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 text-neutral-500", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Field, { label: "ID:", className: "mb-2", children: [
        "#",
        ordem.id
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Vers\xE3o:", className: "mb-2", children: "1.0" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "Criada em:", className: "mb-2 md:col-span-2", children: formatDate(ordem.createdAt) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Field, { label: "\xDAltima atualiza\xE7\xE3o:", className: "md:col-span-2", children: formatDate(ordem.updatedAt) })
    ] })
  ] })
] });

// src/om/OSQuickEndModal.tsx
var import_react12 = require("react");
var import_ui_kit_core20 = require("@hashcodeti/ui-kit-core");
var import_fa9 = require("react-icons/fa");
var import_jsx_runtime26 = require("react/jsx-runtime");
var OSQuickEndModal = ({
  show,
  onHide,
  os,
  onEndOS,
  onSuccess,
  onError
}) => {
  var _a, _b, _c, _d;
  const [loading, setLoading] = (0, import_react12.useState)(false);
  const [technicalReport, setTechnicalReport] = (0, import_react12.useState)("");
  const handleEnd = async () => {
    if (!os) return;
    setLoading(true);
    try {
      if (onEndOS) await onEndOS(os, technicalReport);
      onSuccess == null ? void 0 : onSuccess(os);
      setTechnicalReport("");
      onHide();
    } catch (error) {
      console.error("Erro ao encerrar OS:", error);
      onError == null ? void 0 : onError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setTechnicalReport("");
    onHide();
  };
  const tarefasConcluidas = (_b = (_a = os == null ? void 0 : os.tarefas) == null ? void 0 : _a.filter((t) => t.status === "ENCERRADO").length) != null ? _b : 0;
  const totalTarefas = (_d = (_c = os == null ? void 0 : os.tarefas) == null ? void 0 : _c.length) != null ? _d : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_ui_kit_core20.Modal, { open: show, onOpenChange: (o) => {
    if (!o) handleCancel();
  }, size: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_ui_kit_core20.ModalHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("span", { className: "inline-flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_fa9.FaCheckCircle, {}),
      "Encerrar OS #",
      os == null ? void 0 : os.id
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_ui_kit_core20.ModalBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "mb-3 flex flex-col gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("label", { className: "text-sm font-medium text-surface-foreground", children: [
          "Parecer T\xE9cnico ",
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "text-xs text-neutral-500", children: "(opcional)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          import_ui_kit_core20.TextField,
          {
            multiline: true,
            rows: 4,
            placeholder: "Digite o parecer t\xE9cnico sobre a execu\xE7\xE3o da OS...",
            value: technicalReport,
            onChange: (e) => setTechnicalReport(e.target.value),
            disabled: loading
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("small", { className: "text-xs text-neutral-500", children: "Voc\xEA pode adicionar observa\xE7\xF5es sobre a execu\xE7\xE3o desta ordem de servi\xE7o." })
      ] }),
      totalTarefas > 0 && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "rounded-md bg-neutral-100 p-2", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("small", { className: "block text-neutral-600", children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("strong", { children: "Progresso:" }),
        " ",
        tarefasConcluidas,
        " / ",
        totalTarefas,
        " tarefas conclu\xEDdas"
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_ui_kit_core20.ModalFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_ui_kit_core20.Button, { variant: "secondary", onClick: handleCancel, disabled: loading, children: "Cancelar" }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_ui_kit_core20.Button, { variant: "success", onClick: handleEnd, disabled: loading, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_jsx_runtime26.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_ui_kit_core20.Spinner, { size: "sm", className: "mr-2" }),
        "Encerrando..."
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_jsx_runtime26.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_fa9.FaCheckCircle, { className: "mr-2 inline-block" }),
        "Encerrar OS"
      ] }) })
    ] })
  ] });
};

// src/om/OSQuickActionsMenu.tsx
var import_react13 = require("react");
var import_ui_kit_core21 = require("@hashcodeti/ui-kit-core");
var import_bs5 = require("react-icons/bs");
var import_fa10 = require("react-icons/fa");
var import_jsx_runtime27 = require("react/jsx-runtime");
var OSQuickActionsMenu = ({
  os,
  onStartOS,
  onEndOS,
  onQuickCheckOS,
  onUpdateOS,
  disabled = false,
  quickCheckEnabled = false,
  loading: _loading = false
}) => {
  const [showEndModal, setShowEndModal] = (0, import_react13.useState)(false);
  const isPendente = os.status === "PENDENTE";
  const isExecutando = os.status === "EXECUTANDO";
  const isAguardandoRecurso = os.status === "AGUARDANDO_RECURSO";
  const isConcluido = os.status === "CONCLUIDO";
  const isCanceled = os.status === "CANCELED";
  if (isConcluido || isCanceled) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_ui_kit_core21.DropdownMenu, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_ui_kit_core21.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        import_ui_kit_core21.Button,
        {
          variant: "link",
          size: "sm",
          disabled,
          "aria-label": `A\xE7\xF5es r\xE1pidas OS #${os.id}`,
          className: "p-0 text-neutral-600 shadow-none",
          children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_bs5.BsThreeDotsVertical, { size: 20 })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_ui_kit_core21.DropdownMenuContent, { align: "end", children: [
        isPendente && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_ui_kit_core21.DropdownMenuItem, { onSelect: () => onStartOS == null ? void 0 : onStartOS(os), children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_fa10.FaPlay, { className: "mr-2 inline-block" }),
            "Iniciar OS"
          ] }),
          quickCheckEnabled && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_ui_kit_core21.DropdownMenuItem, { onSelect: () => onQuickCheckOS == null ? void 0 : onQuickCheckOS(os), children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_fa10.FaBolt, { className: "mr-2 inline-block text-state-warning" }),
            "Finalizar (Quick Check)"
          ] })
        ] }),
        isExecutando && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_ui_kit_core21.DropdownMenuItem, { onSelect: () => setShowEndModal(true), children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_fa10.FaCheckCircle, { className: "mr-2 inline-block text-brand-primary" }),
            "Encerrar OS"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
            import_ui_kit_core21.DropdownMenuItem,
            {
              onSelect: () => onUpdateOS == null ? void 0 : onUpdateOS(os.id, { status: "AGUARDANDO_RECURSO" }),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_fa10.FaBolt, { className: "mr-2 inline-block text-state-warning" }),
                "Aguardando Recurso"
              ]
            }
          )
        ] }),
        isAguardandoRecurso && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
          import_ui_kit_core21.DropdownMenuItem,
          {
            onSelect: () => onUpdateOS == null ? void 0 : onUpdateOS(os.id, { status: "EXECUTANDO" }),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_fa10.FaPlay, { className: "mr-2 inline-block text-state-success" }),
              "Retomar OS"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      OSQuickEndModal,
      {
        show: showEndModal,
        onHide: () => setShowEndModal(false),
        os,
        onEndOS
      }
    )
  ] });
};

// src/om/OSCheckoutModalV2.tsx
var import_react14 = require("react");
var import_ui_kit_core22 = require("@hashcodeti/ui-kit-core");
var import_fa11 = require("react-icons/fa");
var import_jsx_runtime28 = require("react/jsx-runtime");
var checkoutModeResolver = (form, hasActiveOM) => {
  if (form == null ? void 0 : form.isModel) return "save_model";
  if (hasActiveOM) return "add_to_om";
  return "save_only";
};
var OSCheckoutModalV2 = ({
  open,
  onOpenChange,
  osForm,
  omContext,
  onSaveOS,
  onSaveOSAndAddToOM,
  onNavigateToOM,
  onCancel,
  onUpdateModelIdentifier,
  onUpdateModelVisibility
}) => {
  var _a, _b, _c, _d, _e, _f;
  const {
    hasActiveOM = false,
    ordemDeManutencao = {},
    totalOS = 0,
    osCompatibility = { canAdd: true }
  } = omContext != null ? omContext : {};
  const isOsModel = !!(osForm == null ? void 0 : osForm.isModel);
  const [loading, setLoading] = (0, import_react14.useState)(false);
  const [selectedMode, setSelectedMode] = (0, import_react14.useState)(
    checkoutModeResolver(osForm, hasActiveOM)
  );
  const handleCancel = (0, import_react14.useCallback)(() => {
    onCancel == null ? void 0 : onCancel();
    onOpenChange == null ? void 0 : onOpenChange(false);
  }, [onCancel, onOpenChange]);
  const handleProceed = (0, import_react14.useCallback)(async () => {
    setLoading(true);
    try {
      switch (selectedMode) {
        case "save_only":
        case "save_model":
          await (onSaveOS == null ? void 0 : onSaveOS(osForm));
          break;
        case "add_to_om":
        case "new_om":
          await (onSaveOSAndAddToOM == null ? void 0 : onSaveOSAndAddToOM(osForm));
          handleCancel();
          onNavigateToOM == null ? void 0 : onNavigateToOM();
          break;
        default:
          break;
      }
    } finally {
      setLoading(false);
    }
  }, [selectedMode, osForm, onSaveOS, onSaveOSAndAddToOM, onNavigateToOM, handleCancel]);
  const checkoutModeLabel = (0, import_react14.useMemo)(() => {
    if (isOsModel) {
      return {
        title: "Salvar Modelo",
        description: "O modelo ser\xE1 salvo para originar outras ordens.",
        save: "Salvar Modelo"
      };
    }
    return {
      title: "Salvar Ordem de servi\xE7o",
      description: "A Ordem ser\xE1 salva normalmente.",
      save: "Salvar Ordem"
    };
  }, [isOsModel]);
  const proceedVariant = selectedMode === "save_only" || selectedMode === "save_model" ? "primary" : selectedMode === "add_to_om" || selectedMode === "new_om" ? "success" : "secondary";
  const cardClass = (active, tone, disabled) => [
    "rounded-md border-2 p-3 transition-colors",
    active ? `${tone} bg-neutral-50` : "border-neutral-200",
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
  ].join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_ui_kit_core22.Modal, { open, onOpenChange: (o) => {
    if (!o) handleCancel();
  }, size: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_ui_kit_core22.ModalHeader, { children: "Checkout da Ordem de Servi\xE7o" }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_ui_kit_core22.ModalBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_ui_kit_core22.Alert, { tone: "info", className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("strong", { children: [
          ((_a = osForm == null ? void 0 : osForm.recursos) == null ? void 0 : _a.length) || 0,
          " recurso(s)"
        ] }),
        " selecionados.",
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("small", { className: "text-neutral-500", children: "Escolha como proceder:" })
      ] }),
      isOsModel && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "mb-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("h5", { className: "text-sm font-semibold", children: "Gerando um modelo" }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          import_ui_kit_core22.TextField,
          {
            value: (_b = osForm.modelIdentifier) != null ? _b : "",
            label: "Defina um nome para o modelo",
            onChange: (e) => onUpdateModelIdentifier == null ? void 0 : onUpdateModelIdentifier(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex w-full flex-col gap-2 rounded-lg border border-neutral-300 px-4 py-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("label", { className: "flex w-full items-center justify-between text-sm font-semibold text-neutral-700", children: "Visibilidade" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center gap-2", children: [
            osForm.isPublicView ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaEye, { title: "Vis\xEDvel publicamente", className: "text-state-success" }) : /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaEyeSlash, { title: "Privado", className: "text-state-danger" }),
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
              import_ui_kit_core22.Switch,
              {
                checked: !!osForm.isPublicView,
                onCheckedChange: (checked) => onUpdateModelVisibility == null ? void 0 : onUpdateModelVisibility(!!checked),
                "aria-label": osForm.isPublicView ? "Tornar privado" : "Tornar p\xFAblico"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "text-sm text-neutral-600", children: osForm.isPublicView ? "P\xFAblico" : "Privado" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "mb-4 flex flex-col gap-3", children: [
        !hasActiveOM && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "div",
          {
            className: cardClass(
              selectedMode === "save_only" || selectedMode === "save_model",
              "border-brand-primary"
            ),
            onClick: () => setSelectedMode(isOsModel ? "save_model" : "save_only"),
            children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                "input",
                {
                  type: "radio",
                  name: "checkout-mode",
                  className: "mr-3",
                  checked: selectedMode === "save_only" || selectedMode === "save_model",
                  onChange: () => setSelectedMode(isOsModel ? "save_model" : "save_only")
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "mb-1 flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaSave, { className: "mr-2 text-brand-primary" }),
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("strong", { children: checkoutModeLabel.title })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("small", { className: "text-neutral-500", children: checkoutModeLabel.description })
              ] })
            ] })
          }
        ),
        hasActiveOM && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
          "div",
          {
            className: cardClass(
              selectedMode === "add_to_om",
              "border-state-success",
              !osCompatibility.canAdd
            ),
            onClick: () => osCompatibility.canAdd && setSelectedMode("add_to_om"),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "mb-2 flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                  "input",
                  {
                    type: "radio",
                    name: "checkout-mode",
                    className: "mr-3",
                    checked: selectedMode === "add_to_om",
                    disabled: !osCompatibility.canAdd,
                    onChange: () => osCompatibility.canAdd && setSelectedMode("add_to_om")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "mb-1 flex items-center", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaPlus, { className: "mr-2 text-state-success" }),
                    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("strong", { children: "Adicionar \xE0 OM atual" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("small", { className: "block text-neutral-500", children: typeof (ordemDeManutencao == null ? void 0 : ordemDeManutencao.descricao) === "string" ? ordemDeManutencao.descricao : ((_c = ordemDeManutencao == null ? void 0 : ordemDeManutencao.descricao) == null ? void 0 : _c.nome) || ((_d = ordemDeManutencao == null ? void 0 : ordemDeManutencao.descricao) == null ? void 0 : _d.id) || "" }),
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("small", { className: "text-neutral-500", children: [
                    totalOS,
                    " OS inclu\xEDdas \u2022 Setor:",
                    " ",
                    typeof (ordemDeManutencao == null ? void 0 : ordemDeManutencao.setor) === "string" ? ordemDeManutencao.setor : ((_e = ordemDeManutencao == null ? void 0 : ordemDeManutencao.setor) == null ? void 0 : _e.nome) || ((_f = ordemDeManutencao == null ? void 0 : ordemDeManutencao.setor) == null ? void 0 : _f.id) || ""
                  ] })
                ] })
              ] }),
              !osCompatibility.canAdd && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_ui_kit_core22.Alert, { tone: "warning", className: "mb-0 mt-2 py-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaExclamationTriangle, { className: "mr-2 inline-block" }),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("small", { children: osCompatibility.reason })
              ] })
            ]
          }
        ),
        !isOsModel && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "div",
          {
            className: cardClass(selectedMode === "new_om", "border-state-info"),
            onClick: () => setSelectedMode("new_om"),
            children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                "input",
                {
                  type: "radio",
                  name: "checkout-mode",
                  className: "mr-3",
                  checked: selectedMode === "new_om",
                  onChange: () => setSelectedMode("new_om")
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "mb-1 flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaList, { className: "mr-2 text-state-info" }),
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("strong", { children: hasActiveOM ? "Nova Ordem de Manuten\xE7\xE3o" : "Iniciar Ordem de Manuten\xE7\xE3o" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("small", { className: "text-neutral-500", children: hasActiveOM ? "Criar nova OM (a atual ser\xE1 substitu\xEDda)" : "Criar nova OM e adicionar esta OS" })
              ] })
            ] })
          }
        )
      ] }),
      (selectedMode === "add_to_om" || selectedMode === "new_om") && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_ui_kit_core22.Alert, { tone: "info", className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "text-sm", children: selectedMode === "add_to_om" ? "Voc\xEA ser\xE1 direcionado para a tela de OM para revisar e salvar" : "Voc\xEA ser\xE1 direcionado para criar uma nova Ordem de Manuten\xE7\xE3o" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_ui_kit_core22.ModalFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_ui_kit_core22.Button, { variant: "secondary", onClick: handleCancel, disabled: loading, children: "Cancelar" }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_ui_kit_core22.Button, { variant: proceedVariant, onClick: handleProceed, disabled: loading, children: selectedMode === "save_only" || selectedMode === "save_model" ? /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_jsx_runtime28.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaSave, { className: "mr-2 inline-block" }),
        checkoutModeLabel.save
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_jsx_runtime28.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fa11.FaArrowRight, { className: "mr-2 inline-block" }),
        "Continuar para OM"
      ] }) })
    ] })
  ] });
};

// src/om/OSQuickStartModal.tsx
var import_react15 = require("react");
var import_ui_kit_core23 = require("@hashcodeti/ui-kit-core");
var import_fa12 = require("react-icons/fa");
var import_dayjs2 = __toESM(require("dayjs"));
var import_jsx_runtime29 = require("react/jsx-runtime");
var formatPlannedDate = (d) => {
  if (!d) return "";
  return (0, import_dayjs2.default)(d).format("DD/MM/YYYY HH:mm");
};
var OSQuickStartModal = ({
  show,
  onHide,
  os,
  bulk = false,
  showStartButton = true,
  onStartOS,
  onUpdateOS,
  onUpdateTipo,
  onBulkAssignMantenedor,
  onBulkAssignTipo,
  onToast,
  renderMantenedorPanel,
  renderTipoPicker,
  renderMantenedorPicker
}) => {
  var _a, _b, _c, _d;
  const [loading, setLoading] = (0, import_react15.useState)(false);
  const [validationErrors, setValidationErrors] = (0, import_react15.useState)([]);
  const [currentOS, setCurrentOS] = (0, import_react15.useState)(null);
  const [currentIndex, setCurrentIndex] = (0, import_react15.useState)(0);
  const [osList, setOsList] = (0, import_react15.useState)([]);
  const [targetsPanelVisible, setTargetsPanelVisible] = (0, import_react15.useState)(false);
  const [selectedTargets, setSelectedTargets] = (0, import_react15.useState)([]);
  const [isBulkAssigning, setIsBulkAssigning] = (0, import_react15.useState)(false);
  const [openTipoPicker, setOpenTipoPicker] = (0, import_react15.useState)(false);
  const [openBulkMantPicker, setOpenBulkMantPicker] = (0, import_react15.useState)(false);
  const [openBulkTipoPicker, setOpenBulkTipoPicker] = (0, import_react15.useState)(false);
  const validateOS = (0, import_react15.useCallback)((osToValidate) => {
    var _a2;
    const errors = [];
    const allowEarlyStart = typeof (osToValidate == null ? void 0 : osToValidate.allowEarlyStart) === "boolean" && osToValidate.allowEarlyStart;
    if (!allowEarlyStart && (osToValidate == null ? void 0 : osToValidate.dataPlanejada) && (0, import_dayjs2.default)().isBefore((0, import_dayjs2.default)(osToValidate.dataPlanejada))) {
      errors.push({
        type: "dataPlanejada",
        message: `Esta OS n\xE3o pode ser iniciada antes de ${formatPlannedDate(
          osToValidate.dataPlanejada
        )}`
      });
    }
    const hasActiveMantenedores = (_a2 = osToValidate.osMantenedor) == null ? void 0 : _a2.some((m) => m.active);
    if (!hasActiveMantenedores) {
      errors.push({ type: "mantenedores", message: "N\xE3o h\xE1 mantenedores atribu\xEDdos" });
    }
    if (!osToValidate.osTipos || osToValidate.osTipos.length === 0) {
      errors.push({ type: "tipo", message: "N\xE3o h\xE1 um tipo atribu\xEDdo" });
    }
    setValidationErrors(errors);
    return errors.length === 0;
  }, []);
  (0, import_react15.useEffect)(() => {
    if (show && os) {
      if (bulk && Array.isArray(os)) {
        if (os.length === 0) {
          onHide();
          return;
        }
        setOsList(os);
        setCurrentIndex(0);
        setCurrentOS(os[0]);
        validateOS(os[0]);
      } else if (!Array.isArray(os)) {
        setOsList([os]);
        setCurrentIndex(0);
        setCurrentOS(os);
        validateOS(os);
      }
    }
  }, [show, os, bulk, onHide, validateOS]);
  (0, import_react15.useEffect)(() => {
    if (currentOS) validateOS(currentOS);
  }, [currentOS, validateOS]);
  (0, import_react15.useEffect)(() => {
    if (currentOS && (!selectedTargets || selectedTargets.length === 0)) {
      setSelectedTargets([currentOS.id]);
    }
  }, [currentOS]);
  (0, import_react15.useEffect)(() => {
    if (!show) {
      setTargetsPanelVisible(false);
      setSelectedTargets([]);
      setIsBulkAssigning(false);
      setOpenTipoPicker(false);
      setOpenBulkMantPicker(false);
      setOpenBulkTipoPicker(false);
    }
  }, [show]);
  (0, import_react15.useEffect)(() => {
    setSelectedTargets((prev) => {
      if (!prev || prev.length === 0) return prev;
      return prev.filter((id) => osList.some((o) => o.id === id));
    });
  }, [osList]);
  (0, import_react15.useEffect)(() => {
    if (!currentOS) return;
    if (bulk && osList.length > 1) {
      setSelectedTargets((prev) => {
        if (prev && prev.length > 0) return prev;
        return osList.map((o) => o.id);
      });
    } else {
      setSelectedTargets((prev) => {
        if (prev && prev.length > 0) return prev;
        return [currentOS.id];
      });
    }
  }, [currentOS, osList, bulk]);
  const getTargetIds = (0, import_react15.useCallback)(() => {
    if (selectedTargets && selectedTargets.length > 0) return selectedTargets;
    if ((currentOS == null ? void 0 : currentOS.id) != null) return [currentOS.id];
    return [];
  }, [selectedTargets, currentOS]);
  const hasTargetsToAssign = (0, import_react15.useCallback)(
    () => getTargetIds().length > 0,
    [getTargetIds]
  );
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < osList.length - 1;
  const isBulkMode = bulk && osList.length > 1;
  const handlePrevious = (0, import_react15.useCallback)(() => {
    if (canGoBack) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentOS(osList[newIndex]);
    }
  }, [canGoBack, currentIndex, osList]);
  const handleNext = (0, import_react15.useCallback)(() => {
    if (canGoForward) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentOS(osList[newIndex]);
    }
  }, [canGoForward, currentIndex, osList]);
  (0, import_react15.useEffect)(() => {
    if (!show || !isBulkMode) return;
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && canGoBack) handlePrevious();
      else if (e.key === "ArrowRight" && canGoForward) handleNext();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [show, isBulkMode, canGoBack, canGoForward, handlePrevious, handleNext]);
  const handleStart = async () => {
    if (!currentOS || !validateOS(currentOS)) {
      onToast == null ? void 0 : onToast("Complete os campos obrigat\xF3rios.", "warning");
      return;
    }
    setLoading(true);
    try {
      await (onStartOS == null ? void 0 : onStartOS(currentOS));
      onHide();
    } catch (error) {
      console.error("Erro ao iniciar OS:", error);
      onToast == null ? void 0 : onToast("Erro ao iniciar a OS", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleMantenedorChanged = (0, import_react15.useCallback)(async () => {
    if ((currentOS == null ? void 0 : currentOS.id) != null) await (onUpdateOS == null ? void 0 : onUpdateOS(currentOS.id));
  }, [currentOS, onUpdateOS]);
  const handleTipoUpdate = async (tipo) => {
    if (!(currentOS == null ? void 0 : currentOS.id)) return;
    try {
      await (onUpdateTipo == null ? void 0 : onUpdateTipo(currentOS.id, tipo));
      onToast == null ? void 0 : onToast("Tipo atribu\xEDdo com sucesso!", "success");
      await (onUpdateOS == null ? void 0 : onUpdateOS(currentOS.id));
      setTimeout(() => validateOS(currentOS), 300);
    } catch (error) {
      console.error("Erro ao atribuir tipo:", error);
      onToast == null ? void 0 : onToast("Erro ao atribuir tipo", "error");
    }
  };
  const toggleTarget = (osId) => {
    setSelectedTargets((prev) => {
      if (!prev) return [osId];
      if (prev.includes(osId)) return prev.filter((i) => i !== osId);
      return [...prev, osId];
    });
  };
  const selectAllTargets = () => setSelectedTargets(osList.map((o) => o.id));
  const clearTargets = () => setSelectedTargets([]);
  const bulkAssignMantenedor = async (mantenedor) => {
    const targets = getTargetIds();
    if (targets.length === 0) return;
    setIsBulkAssigning(true);
    try {
      const response = await (onBulkAssignMantenedor == null ? void 0 : onBulkAssignMantenedor(targets, mantenedor)) || {};
      await Promise.all(targets.map((tid) => onUpdateOS == null ? void 0 : onUpdateOS(tid)));
      const { added = 0, skipped = 0, failed = 0 } = response;
      const toastType = added > 0 ? "success" : failed > 0 ? "error" : "warning";
      onToast == null ? void 0 : onToast(
        `Execu\xE7\xE3o conclu\xEDda: ${added} adicionados, ${skipped} ignorados, ${failed} falhas.`,
        toastType
      );
    } catch (err) {
      console.error("Erro ao atribuir mantenedor em lote:", err);
      onToast == null ? void 0 : onToast("Erro ao atribuir mantenedor em lote", "error");
    } finally {
      setIsBulkAssigning(false);
    }
  };
  const bulkAssignTipo = async (tipo) => {
    const targets = getTargetIds();
    if (targets.length === 0) return;
    setIsBulkAssigning(true);
    try {
      const response = await (onBulkAssignTipo == null ? void 0 : onBulkAssignTipo(targets, tipo)) || {};
      await Promise.all(targets.map((tid) => onUpdateOS == null ? void 0 : onUpdateOS(tid)));
      const { atualizados = 0, skipped = 0, falhas = 0 } = response;
      const toastType = atualizados > 0 ? "success" : falhas > 0 ? "error" : "warning";
      onToast == null ? void 0 : onToast(
        `Execu\xE7\xE3o conclu\xEDda: ${atualizados} atualizados, ${skipped} ignorados, ${falhas} falhas.`,
        toastType
      );
    } catch (err) {
      console.error("Erro ao atribuir tipo em lote:", err);
      onToast == null ? void 0 : onToast("Erro ao atribuir tipo em lote", "error");
    } finally {
      setIsBulkAssigning(false);
    }
  };
  const hasErrors = validationErrors.length > 0;
  const hasDataPlanejadaError = validationErrors.some((e) => e.type === "dataPlanejada");
  const currentTipoLabel = (_c = (_b = (_a = currentOS == null ? void 0 : currentOS.osTipos) == null ? void 0 : _a[0]) == null ? void 0 : _b.tipoDeOrdem) == null ? void 0 : _c.tipo;
  const headerTitle = (0, import_react15.useMemo)(
    () => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("span", { className: "flex w-full items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fa12.FaPlay, {}),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("span", { children: [
          "Iniciar OS #",
          currentOS == null ? void 0 : currentOS.id
        ] }),
        isBulkMode && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_ui_kit_core23.Badge, { tone: "neutral", className: "ml-2", children: [
          currentIndex + 1,
          " de ",
          osList.length
        ] })
      ] }),
      isBulkMode && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("span", { className: "ml-3 flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          import_ui_kit_core23.Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: handlePrevious,
            disabled: !canGoBack,
            "aria-label": "OS Anterior",
            children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fa12.FaChevronLeft, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          import_ui_kit_core23.Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: handleNext,
            disabled: !canGoForward,
            "aria-label": "Pr\xF3xima OS",
            children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fa12.FaChevronRight, {})
          }
        )
      ] })
    ] }),
    [currentOS == null ? void 0 : currentOS.id, isBulkMode, currentIndex, osList.length, handlePrevious, handleNext, canGoBack, canGoForward]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_ui_kit_core23.Modal, { open: show, onOpenChange: (o) => {
    if (!o) onHide();
  }, size: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.ModalHeader, { children: headerTitle }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.ModalBody, { children: hasDataPlanejadaError ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Alert, { tone: "danger", children: (_d = validationErrors.find((e) => e.type === "dataPlanejada")) == null ? void 0 : _d.message }) : /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
      hasErrors && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_ui_kit_core23.Alert, { tone: "warning", className: "mb-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("strong", { children: "Aten\xE7\xE3o:" }),
        " Complete os campos obrigat\xF3rios."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("h6", { className: "mb-3 text-sm font-medium text-neutral-500", children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fa12.FaUser, { className: "mr-2 inline-block" }),
          "Executores"
        ] }),
        currentOS && (renderMantenedorPanel == null ? void 0 : renderMantenedorPanel({
          os: currentOS,
          onChanged: handleMantenedorChanged
        })),
        validationErrors.some((e) => e.type === "mantenedores") && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("small", { className: "text-state-danger", children: "* Atribua pelo menos um executor" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("h6", { className: "mb-3 text-sm font-medium text-neutral-500", children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fa12.FaTags, { className: "mr-2 inline-block" }),
          "Tipo de OS"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex items-center gap-2", children: currentTipoLabel ? /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Badge, { tone: "primary", children: currentTipoLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
            import_ui_kit_core23.Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => setOpenTipoPicker((v) => !v),
              children: "Alterar"
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          import_ui_kit_core23.Button,
          {
            variant: "primary",
            size: "sm",
            onClick: () => setOpenTipoPicker((v) => !v),
            children: "Atribuir Tipo"
          }
        ) }),
        openTipoPicker && (renderTipoPicker == null ? void 0 : renderTipoPicker({
          currentTipo: currentTipoLabel,
          onSelect: (tipo) => {
            handleTipoUpdate(tipo);
            setOpenTipoPicker(false);
          }
        })),
        validationErrors.some((e) => e.type === "tipo") && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("small", { className: "text-state-danger", children: "* Atribua um tipo \xE0 OS" })
      ] }),
      isBulkMode && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("h6", { className: "mb-3 flex items-center gap-2 text-sm font-medium text-neutral-500", children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
            import_ui_kit_core23.Switch,
            {
              checked: targetsPanelVisible,
              onCheckedChange: (c) => setTargetsPanelVisible(!!c),
              "aria-label": "Selecionar m\xFAltiplas OS"
            }
          ),
          "Selecionar m\xFAltiplas OS"
        ] }),
        targetsPanelVisible && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Button, { variant: "primary", size: "sm", onClick: selectAllTargets, children: "Selecionar Todas" }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Button, { variant: "secondary", size: "sm", onClick: clearTargets, children: "Limpar Sele\xE7\xE3o" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex flex-wrap gap-2", children: osList.map((osItem) => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
            import_ui_kit_core23.Badge,
            {
              tone: selectedTargets.includes(osItem.id) ? "primary" : "neutral",
              className: "cursor-pointer",
              onClick: () => toggleTarget(osItem.id),
              children: [
                "OS #",
                osItem.id
              ]
            },
            String(osItem.id)
          )) })
        ] })
      ] }),
      isBulkMode && targetsPanelVisible && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("h6", { className: "mb-3 text-sm font-medium text-neutral-500", children: "Atribuir em Lote" }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
            import_ui_kit_core23.Button,
            {
              variant: "primary",
              size: "sm",
              disabled: isBulkAssigning || !hasTargetsToAssign(),
              onClick: () => setOpenBulkMantPicker((v) => !v),
              children: [
                isBulkAssigning && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Spinner, { size: "sm", className: "mr-2" }),
                "Atribuir Executor",
                (selectedTargets == null ? void 0 : selectedTargets.length) ? ` (${selectedTargets.length})` : ""
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
            import_ui_kit_core23.Button,
            {
              variant: "primary",
              size: "sm",
              disabled: isBulkAssigning || !hasTargetsToAssign(),
              onClick: () => setOpenBulkTipoPicker((v) => !v),
              children: [
                isBulkAssigning && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Spinner, { size: "sm", className: "mr-2" }),
                "Atribuir Tipo",
                (selectedTargets == null ? void 0 : selectedTargets.length) ? ` (${selectedTargets.length})` : ""
              ]
            }
          )
        ] }),
        openBulkMantPicker && (renderMantenedorPicker == null ? void 0 : renderMantenedorPicker({
          onSelect: (m) => {
            bulkAssignMantenedor(m);
            setOpenBulkMantPicker(false);
          }
        })),
        openBulkTipoPicker && (renderTipoPicker == null ? void 0 : renderTipoPicker({
          currentTipo: void 0,
          onSelect: (t) => {
            bulkAssignTipo(t);
            setOpenBulkTipoPicker(false);
          }
        }))
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_ui_kit_core23.ModalFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Button, { variant: "secondary", onClick: onHide, disabled: loading, children: showStartButton ? "Cancelar" : "Fechar" }),
      showStartButton && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Button, { variant: "primary", onClick: handleStart, disabled: loading || hasErrors, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core23.Spinner, { size: "sm", className: "mr-2" }),
        "Iniciando..."
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fa12.FaPlay, { className: "mr-2 inline-block" }),
        "Iniciar OS"
      ] }) })
    ] })
  ] });
};

// src/states/OsSkeleton.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var OsSkeleton = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
  "div",
  {
    className: [
      "mb-2 rounded border border-l-4 border-surface-border border-l-neutral-200",
      "bg-white p-3 shadow-sm",
      className != null ? className : ""
    ].join(" "),
    "aria-busy": "true",
    "aria-live": "polite",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "mb-2 h-3 w-1/2 rounded bg-neutral-200 animate-pulse" }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "mb-3 h-3 w-3/4 rounded bg-neutral-200 animate-pulse" }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "h-3 w-12 rounded bg-neutral-200 animate-pulse" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "h-3 w-12 rounded bg-neutral-200 animate-pulse" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "h-3 w-16 rounded bg-neutral-200 animate-pulse" })
      ] })
    ]
  }
);
var OsEmpty = ({
  message = "Nenhuma OS para o per\xEDodo selecionado."
}) => /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "text-center text-neutral-500 py-12", children: [
  /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "text-5xl", "aria-hidden": "true", children: "\u{1F5D3}\uFE0F" }),
  /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "mt-2 text-sm", children: message })
] });

// src/os/tabs/TarefasTab.tsx
var import_react16 = require("react");
var import_fa13 = require("react-icons/fa");
var import_ui_kit_core24 = require("@hashcodeti/ui-kit-core");
var import_teraprox_ui_kit8 = require("teraprox-ui-kit");
var import_jsx_runtime31 = require("react/jsx-runtime");
function TarefaItemRow({
  tarefa,
  index,
  isFinished,
  onTarefaAction,
  onInspecaoAction,
  onUnidadeMaterialAction,
  onObservacaoAction,
  onDupeTarefa,
  parametrosOps,
  loadUnidades,
  limiteDeControleForm,
  onLimiteEditClick,
  onLimiteClear,
  useTarefaItemVm,
  tiposDeDadoInspecao,
  renderInspecoesList,
  renderLimiteDeControlePicker,
  onError,
  isMobile = false
}) {
  var _a, _b;
  const tarefaIdForVm = (_b = tarefa == null ? void 0 : tarefa.id) != null ? _b : `local-${(_a = tarefa == null ? void 0 : tarefa.__id) != null ? _a : index}`;
  const baseVm = useTarefaItemVm({ tarefaId: tarefaIdForVm, mode: "edit" });
  const normalizeUnidadeMaterialDto = (0, import_react16.useCallback)((dto) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const material = (_a2 = dto == null ? void 0 : dto.material) != null ? _a2 : null;
    const unidade = (_b2 = dto == null ? void 0 : dto.unidade) != null ? _b2 : null;
    return {
      ...dto,
      material,
      unidade,
      materialId: (_d = (_c = dto == null ? void 0 : dto.materialId) != null ? _c : material == null ? void 0 : material.id) != null ? _d : null,
      nomeMaterial: (_g = (_f = (_e = dto == null ? void 0 : dto.nomeMaterial) != null ? _e : material == null ? void 0 : material.nome) != null ? _f : material == null ? void 0 : material.descricao) != null ? _g : "-",
      unidadeId: (_i = (_h = dto == null ? void 0 : dto.unidadeId) != null ? _h : unidade == null ? void 0 : unidade.id) != null ? _i : null,
      labelUnidade: (_l = (_k = (_j = dto == null ? void 0 : dto.labelUnidade) != null ? _j : unidade == null ? void 0 : unidade.label) != null ? _k : unidade == null ? void 0 : unidade.nome) != null ? _l : "-",
      nomeUnidade: (_o = (_n = (_m = dto == null ? void 0 : dto.nomeUnidade) != null ? _m : unidade == null ? void 0 : unidade.nome) != null ? _n : unidade == null ? void 0 : unidade.label) != null ? _o : "",
      quantidade: (_p = dto == null ? void 0 : dto.quantidade) != null ? _p : ""
    };
  }, []);
  const vm = (0, import_react16.useMemo)(() => {
    const tarefaJustificativas = Array.isArray(tarefa == null ? void 0 : tarefa.tarefaJustificativas) ? tarefa.tarefaJustificativas : [];
    return {
      ...baseVm,
      observacoes: {
        ...baseVm.observacoes,
        list: tarefaJustificativas,
        load: async () => {
        }
      }
    };
  }, [baseVm, tarefa == null ? void 0 : tarefa.tarefaJustificativas]);
  const tarefaForView = (0, import_react16.useMemo)(() => {
    const um = Array.isArray(tarefa == null ? void 0 : tarefa.unidadesMateriais) ? tarefa.unidadesMateriais : Array.isArray(tarefa == null ? void 0 : tarefa.tarefaUnidadesMateriais) ? tarefa.tarefaUnidadesMateriais : [];
    return { ...tarefa, index, tarefaUnidadesMateriais: um };
  }, [tarefa, index]);
  const handleRenderInspecoesList = (0, import_react16.useCallback)(
    ({ inspecoes, isMobile: mobileFromCtx, readOnly }) => renderInspecoesList({
      inspecoes,
      isMobile: mobileFromCtx != null ? mobileFromCtx : isMobile,
      readOnly,
      onRemove: (inspecao, idx) => onInspecaoAction("remove", {
        ...inspecao,
        inspecao: { ...inspecao, index: idx },
        index: idx,
        indexTarefa: index
      }),
      onDuplicate: (inspecao) => onInspecaoAction("add", { inspecao, indexTarefa: index }),
      updateInspecaoCallback: (_id, nome, _field, idx, inspecao) => {
        const inspecaoCopy = {
          ...inspecao,
          index: idx,
          nomeParametro: nome
        };
        onInspecaoAction("update", {
          inspecao: inspecaoCopy,
          indexTarefa: index
        });
      }
    }),
    [index, onInspecaoAction, renderInspecoesList]
  );
  const inspecaoExtras = (0, import_react16.useMemo)(
    () => ({
      tiposDeDado: tiposDeDadoInspecao,
      parametrosOps,
      loadUnidadesFunc: async () => {
        if (typeof loadUnidades !== "function") return [];
        try {
          const res = await loadUnidades();
          return Array.isArray(res) ? res : [];
        } catch (err) {
          console.error("[TarefasTab] load unidades failed:", err);
          onError == null ? void 0 : onError("Falha ao carregar unidades", err);
          return [];
        }
      },
      renderLimitesDeControle: (insVm) => renderLimiteDeControlePicker({
        insVm,
        limiteDeControleForm,
        onLimiteEditClick,
        onLimiteClear
      })
    }),
    [
      tiposDeDadoInspecao,
      parametrosOps,
      loadUnidades,
      limiteDeControleForm,
      onLimiteEditClick,
      onLimiteClear,
      onError,
      renderLimiteDeControlePicker
    ]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    TarefaItem,
    {
      vm,
      mode: "edit",
      tarefa: tarefaForView,
      index,
      isMobile,
      onRemove: () => onTarefaAction("remove", tarefa.__id),
      onDuplicate: () => onDupeTarefa(tarefa),
      allowDupe: !isFinished,
      onSaveObservacao: (texto) => onObservacaoAction("add", {
        justificativa: { descricao: texto },
        indexTarefa: index
      }),
      onAddUnidadeMaterial: (dto) => onUnidadeMaterialAction("add", {
        unidadeMaterial: normalizeUnidadeMaterialDto(dto),
        indexTarefa: index
      }),
      onSaveNovaInspecao: (dto) => onInspecaoAction("add", {
        inspecao: dto,
        indexTarefa: index
      }),
      renderInspecoesList: handleRenderInspecoesList,
      inspecaoExtras
    }
  );
}
var TarefasTab = (0, import_react16.forwardRef)(
  function TarefasTab2(props, ref) {
    const {
      form,
      isFinished,
      adicionarTarefaOs,
      onTarefaAction,
      onInspecaoAction,
      onUnidadeMaterialAction,
      onObservacaoAction,
      onDupeTarefa,
      onOpenModelosTarefa,
      useTarefaItemVm,
      loadUnidades,
      loadParametros,
      loadAcoes,
      limiteDeControleForm,
      onLimiteEditClick,
      onLimiteClear,
      tiposDeDadoInspecao,
      renderInspecoesList,
      renderLimiteDeControlePicker,
      onError,
      isMobile = false,
      className
    } = props;
    const [showAddPanel, setShowAddPanel] = (0, import_react16.useState)(false);
    const [parametrosOps, setParametrosOps] = (0, import_react16.useState)([]);
    const loadParametrosRef = (0, import_react16.useRef)(loadParametros);
    const onErrorRef = (0, import_react16.useRef)(onError);
    (0, import_react16.useEffect)(() => {
      loadParametrosRef.current = loadParametros;
      onErrorRef.current = onError;
    });
    (0, import_react16.useEffect)(() => {
      let cancelled = false;
      (async () => {
        var _a;
        try {
          const parametrosManutencao = await loadParametrosRef.current();
          const list = Array.isArray(parametrosManutencao) ? parametrosManutencao : [];
          const mapped = list.map((param) => {
            var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
            return {
              ...param,
              nome: (_c = (_b = (_a2 = param == null ? void 0 : param.nome) != null ? _a2 : param == null ? void 0 : param.nomeParametro) != null ? _b : param == null ? void 0 : param.parametro) != null ? _c : "",
              labelUnidade: (_j = (_i = (_h = (_f = (_d = param == null ? void 0 : param.labelUnidade) != null ? _d : param == null ? void 0 : param.unidadeParametro) != null ? _f : (_e = param == null ? void 0 : param.unidade) == null ? void 0 : _e.label) != null ? _h : (_g = param == null ? void 0 : param.unidade) == null ? void 0 : _g.nome) != null ? _i : param == null ? void 0 : param.unidade) != null ? _j : ""
            };
          }).filter((param) => {
            var _a2;
            return String((_a2 = param == null ? void 0 : param.nome) != null ? _a2 : "").trim() !== "";
          });
          if (!cancelled) setParametrosOps(mapped);
        } catch (err) {
          console.error("[TarefasTab] loadParametros failed:", err);
          (_a = onErrorRef.current) == null ? void 0 : _a.call(onErrorRef, "Falha ao carregar par\xE2metros de inspe\xE7\xE3o", err);
          if (!cancelled) setParametrosOps([]);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []);
    const tarefasOrdenadas = [...(form == null ? void 0 : form.tarefas) || []].sort(
      (a, b) => {
        var _a, _b;
        return ((_a = a == null ? void 0 : a.sequencia) != null ? _a : 0) - ((_b = b == null ? void 0 : b.sequencia) != null ? _b : 0);
      }
    );
    const handleAddFromAcao = (acao) => {
      var _a, _b, _c, _d;
      adicionarTarefaOs({
        acao,
        descricao: (_b = (_a = acao == null ? void 0 : acao.descricao) != null ? _a : acao == null ? void 0 : acao.nome) != null ? _b : "",
        sequencia: ((_d = (_c = form == null ? void 0 : form.tarefas) == null ? void 0 : _c.length) != null ? _d : 0) + 1
      });
      setShowAddPanel(false);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { ref, className: (0, import_ui_kit_core24.cn)("flex flex-col gap-3", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center justify-between gap-2 px-1 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            "span",
            {
              className: (0, import_ui_kit_core24.cn)(
                "inline-flex h-6 min-w-6 items-center justify-center rounded-full",
                "bg-primary-100 px-2 text-xs font-semibold text-primary-700"
              ),
              children: tarefasOrdenadas.length
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: "text-sm font-medium text-neutral-700", children: tarefasOrdenadas.length === 1 ? "Tarefa" : "Tarefas" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          import_ui_kit_core24.InformativeOverlay,
          {
            contentItems: [
              { icon: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fa13.FaComments, { size: 18 }), label: "Observa\xE7\xF5es" },
              { icon: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fa13.FaClipboardList, { size: 18 }), label: "Inspe\xE7\xF5es" },
              { icon: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fa13.FaCubes, { size: 18 }), label: "Materiais" }
            ]
          }
        )
      ] }),
      tarefasOrdenadas.length === 0 && !showAddPanel && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-surface-border bg-neutral-50 p-8 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fa13.FaClipboardList, { size: 48, className: "text-neutral-300" }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "text-base font-medium text-neutral-700", children: "Nenhuma tarefa adicionada" }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "text-sm text-neutral-500", children: "Adicione tarefas manualmente ou a partir de um modelo" }),
        !isFinished && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
          import_ui_kit_core24.Button,
          {
            variant: "primary",
            onClick: () => setShowAddPanel(true),
            className: "mt-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fa13.FaPlus, { className: "mr-2" }),
              "Adicionar primeira tarefa"
            ]
          }
        )
      ] }),
      tarefasOrdenadas.map((t, i) => {
        var _a, _b;
        return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          TarefaItemRow,
          {
            tarefa: t,
            index: i,
            isFinished,
            onTarefaAction,
            onInspecaoAction,
            onUnidadeMaterialAction,
            onObservacaoAction,
            onDupeTarefa,
            parametrosOps,
            loadUnidades,
            limiteDeControleForm,
            onLimiteEditClick,
            onLimiteClear,
            useTarefaItemVm,
            tiposDeDadoInspecao,
            renderInspecoesList,
            renderLimiteDeControlePicker,
            onError,
            isMobile
          },
          (_b = (_a = t.id) != null ? _a : t.__id) != null ? _b : i
        );
      }),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
        import_ui_kit_core24.Modal,
        {
          open: showAddPanel,
          onOpenChange: (o) => {
            if (!o) setShowAddPanel(false);
          },
          size: "md",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_ui_kit_core24.ModalHeader, { children: "Nova Tarefa" }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_ui_kit_core24.ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500", children: "Buscar a\xE7\xE3o ou digitar descri\xE7\xE3o livre" }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  import_teraprox_ui_kit8.AutoComplete,
                  {
                    loadFunc: () => loadAcoes(),
                    loadCondition: true,
                    displayKey: "nome",
                    className: "w-100",
                    title: "A\xE7\xE3o / Descri\xE7\xE3o",
                    autoFocusConfig: true,
                    onSelectedClick: (acao) => {
                      if (acao == null ? void 0 : acao.id) handleAddFromAcao(acao);
                    },
                    onEnterKey: (inputValue) => {
                      if (inputValue == null ? void 0 : inputValue.trim())
                        handleAddFromAcao({
                          nome: inputValue.trim(),
                          descricao: inputValue.trim()
                        });
                    },
                    onBlurEvent: () => {
                    },
                    onValueChanged: () => {
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "mt-1 text-xs text-neutral-500", children: "Selecione uma a\xE7\xE3o da lista ou pressione Enter para usar o texto digitado" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "flex items-center justify-center md:flex-col", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: "rounded-full border border-surface-border bg-white px-3 py-1 text-xs uppercase text-neutral-500", children: "ou" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex flex-1 flex-col", children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500", children: "Usar um modelo de tarefa" }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "mb-2 text-xs text-neutral-500", children: "Preencha m\xFAltiplas tarefas de uma vez a partir de um modelo pr\xE9-configurado" }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                  import_ui_kit_core24.Button,
                  {
                    variant: "outline-primary",
                    onClick: () => {
                      setShowAddPanel(false);
                      onOpenModelosTarefa();
                    },
                    className: "self-start",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fa13.FaClipboardList, { className: "mr-2" }),
                      "Selecionar modelo"
                    ]
                  }
                )
              ] })
            ] }) })
          ]
        }
      ),
      !isFinished && tarefasOrdenadas.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "flex justify-center pt-1", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
        import_ui_kit_core24.Button,
        {
          variant: "outline",
          onClick: () => setShowAddPanel(true),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fa13.FaPlus, { className: "mr-2" }),
            "Adicionar Tarefa"
          ]
        }
      ) })
    ] });
  }
);
TarefasTab.displayName = "TarefasTab";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AcaoPicker,
  BranchContainerV2,
  BranchDropDisplay,
  BranchNodeDisplayV2,
  FindRecursoByTagField,
  InspecaoModal,
  MantenedorPicker,
  MantenedorRender,
  MantenedorRenderCompact,
  ManutentorCard,
  ManutentorCardCompact,
  ManutentoresDisplay,
  MetricasDisplay,
  OSCheckoutModalV2,
  OSQuickActionsMenu,
  OSQuickEndModal,
  OSQuickStartModal,
  OS_STATUS_PALETTE,
  ObservacaoModal,
  OrdemDeServicoDisplayCard,
  OrdemInfoCard,
  OrdemStatusActions,
  OrdemStatusIndicator,
  OsCard,
  OsEmpty,
  OsSkeleton,
  PickMantenedorTipoModal,
  RecursoDisplayer,
  TarefaCard,
  TarefaItem,
  TarefasTab,
  UnidadeMaterialModal,
  UnidadeMaterialPicker,
  getOrdemDeServicoDisplayColor,
  getOsStatusMeta
});
