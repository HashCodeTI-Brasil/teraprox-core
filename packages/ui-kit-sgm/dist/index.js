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
  BranchDropDisplay: () => BranchDropDisplay,
  FindRecursoByTagField: () => FindRecursoByTagField,
  InspecaoModal: () => InspecaoModal,
  MantenedorPicker: () => MantenedorPicker,
  MantenedorRender: () => MantenedorRender,
  MantenedorRenderCompact: () => MantenedorRenderCompact,
  ManutentorCard: () => ManutentorCard,
  ManutentoresDisplay: () => ManutentoresDisplay,
  MetricasDisplay: () => MetricasDisplay,
  RecursoDisplayer: () => RecursoDisplayer,
  TarefaCard: () => TarefaCard,
  TarefaItem: () => TarefaItem,
  UnidadeMaterialModal: () => UnidadeMaterialModal,
  UnidadeMaterialPicker: () => UnidadeMaterialPicker
});
module.exports = __toCommonJS(index_exports);

// src/unidade-material/UnidadeMaterialModal.tsx
var import_ui_kit_core = require("@teraprox/ui-kit-core");
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
      size: "md",
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
var import_ui_kit_core2 = require("@teraprox/ui-kit-core");
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
      size: "md",
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
var import_react_bootstrap = require("react-bootstrap");
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
      actionButton: onNovaAcao ? () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap.Button, { onClick: onNovaAcao, children: "Nova A\xE7\xE3o" }) : void 0,
      loadCondition,
      loadFunc: loadAcoes
    }
  );
};

// src/acao-manutentor/ManutentoresDisplay.tsx
var import_react_bootstrap2 = require("react-bootstrap");
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
  const renderTooltip = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_bootstrap2.Tooltip, { ...props, children: restantes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: m.nomeUsuario }, m.mantenedorId)) });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "span",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: label }),
        " ",
        primeiro != null ? primeiro : "-",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_gr.GrUserWorker, { onClick: onIconClick }),
        restantes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_react_bootstrap2.OverlayTrigger,
          {
            placement: "top",
            overlay: renderTooltip,
            delay: { show: 150, hide: 200 },
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "span",
              {
                style: {
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { children: [
                  "+",
                  restantes.length
                ] })
              }
            )
          }
        )
      ]
    }
  );
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
var import_react_bootstrap3 = require("react-bootstrap");
var import_fa = require("react-icons/fa");
var import_teraprox_ui_kit4 = require("teraprox-ui-kit");
var import_jsx_runtime6 = require("react/jsx-runtime");
var MantenedorRenderCompact = ({
  readOnly = false,
  maintainers = [],
  onDesatribuir,
  renderAtribuirForm
}) => {
  const executoresAtivos = (maintainers == null ? void 0 : maintainers.filter((m) => m.active)) || [];
  if (readOnly) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "d-flex align-items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa.FaUser, { size: 16, className: "text-muted" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-muted", children: executoresAtivos.length > 0 ? executoresAtivos.map(
        (m) => {
          var _a, _b;
          return ((_a = m.mantenedor) == null ? void 0 : _a.nomeUsuario) || ((_b = m.mantenedor) == null ? void 0 : _b._fullName);
        }
      ).join(", ") : "N\xE3o atribu\xEDdo" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "d-flex align-items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa.FaUser, { size: 16 }),
    executoresAtivos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "d-flex gap-1", children: executoresAtivos.map((m, index) => {
      var _a, _b;
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        import_react_bootstrap3.Badge,
        {
          bg: "primary",
          className: "d-flex align-items-center gap-1",
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
    renderAtribuirForm && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_teraprox_ui_kit4.SwitchOnClick,
      {
        placeHolder: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          import_react_bootstrap3.Button,
          {
            variant: "outline-primary",
            size: "sm",
            className: "d-flex align-items-center gap-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa.FaPlus, { size: 12 }),
              executoresAtivos.length === 0 ? "Atribuir" : "Adicionar"
            ]
          }
        ),
        children: ({ handleClose }) => renderAtribuirForm({ handleClose })
      }
    )
  ] });
};

// src/acao-manutentor/ManutentorCard.tsx
var import_react_bootstrap4 = require("react-bootstrap");
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
  var _a;
  const hasMetrics = mantenedor.metricas;
  const statusIndicator = (color) => ({
    backgroundColor: color,
    borderRadius: "50%",
    width: "12px",
    height: "12px",
    marginRight: "10px"
  });
  const handleStatusClick = (ordens) => {
    onStatusClick && onStatusClick(ordens);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_bootstrap4.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_react_bootstrap4.Card, { className: "mantenedor-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_bootstrap4.Card.Body, { className: "d-flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mantenedor-info", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
        import_react_bootstrap4.Card.Title,
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          },
          children: [
            mantenedor == null ? void 0 : mantenedor.nomeUsuario,
            loadMetrics && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              import_gr2.GrLineChart,
              {
                className: "zoom-container",
                title: "Ver Metricas",
                onClick: () => loadMetrics(mantenedor),
                size: 20
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_react_bootstrap4.Card.Text, { children: [
        "ID: ",
        mantenedor.id
      ] }),
      hasMetrics && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_bootstrap4.Card.Text, { children: (_a = mantenedor.turno) == null ? void 0 : _a.nome }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "status-list", children: [
        mantenedor.executing && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "div",
          {
            className: "clickable-status d-flex align-items-center mb-2",
            onClick: () => handleStatusClick(mantenedor.executing),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "div",
                {
                  className: "status-indicator",
                  style: statusIndicator("green")
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "status-text", children: [
                "Executando: ",
                mantenedor.executing.length
              ] })
            ]
          }
        ),
        mantenedor.pending && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "div",
          {
            className: "clickable-status d-flex align-items-center mb-2",
            onClick: () => handleStatusClick(mantenedor.pending),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "div",
                {
                  className: "status-indicator",
                  style: statusIndicator("#ffc107")
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "status-text", children: [
                "Pendentes: ",
                mantenedor.pending.length
              ] })
            ]
          }
        ),
        mantenedor.concluded && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "div",
          {
            className: "clickable-status d-flex align-items-center mb-2",
            onClick: () => handleStatusClick(mantenedor.concluded),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "div",
                {
                  className: "status-indicator",
                  style: statusIndicator("#ccc")
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "status-text", children: [
                "Conclu\xEDdas: ",
                mantenedor.concluded.length
              ] })
            ]
          }
        )
      ] }),
      showBusyStatus && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "d-flex align-items-center status-container", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "div",
          {
            className: "status-indicator",
            style: statusIndicator(mantenedor._busy ? "red" : "green")
          }
        ),
        mantenedor._busy ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "status-text", children: `Alocado em OS-${mantenedor.osId}` }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_react_bootstrap4.Button,
            {
              variant: "link",
              className: "navigate-button",
              onClick: () => viewDetailsCallback && viewDetailsCallback({ ...mantenedor, index }),
              children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_fa6.FaArrowRightToBracket, { size: 20 })
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "status-text", children: "Dispon\xEDvel" })
      ] }),
      onRemoveCallback && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "div",
        {
          onClick: () => onRemoveCallback({ ...mantenedor, index }),
          className: "remove-text",
          children: "remover"
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_bootstrap4.Card.Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      MetricasDisplay,
      {
        metricas: hasMetrics ? mantenedor.metricas.horas : "-",
        wrenchTime: hasMetrics ? mantenedor.metricas.wrenchTime : "-"
      }
    ) })
  ] }) }, mantenedor.id);
};

// src/recurso/RecursoDisplayer.tsx
var import_react3 = require("react");
var import_react_bootstrap5 = require("react-bootstrap");
var import_teraprox_core_sdk3 = require("teraprox-core-sdk");

// src/recurso/BranchDropDisplay.tsx
var import_react = require("react");
var import_fa2 = require("react-icons/fa");
var import_md = require("react-icons/md");
var import_teraprox_core_sdk = require("teraprox-core-sdk");
var import_jsx_runtime9 = require("react/jsx-runtime");
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
  const [fontColor, setFontColor] = (0, import_react.useState)("#000");
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [show, setShow] = (0, import_react.useState)(false);
  const [multiSelected, setMultiSelected] = (0, import_react.useState)([]);
  const dropdownRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    setFontColor(
      (0, import_teraprox_core_sdk.pickTextColorBasedOnBgColorAdvanced)(branch.branchLevel.color, "#FFFFFF", "#000000")
    );
  }, [branch.branchLevel.color]);
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
                branch.nomeRecurso || branch.branchLevel.nome,
                branch.nomeRecurso && !multiMode && isLastBranchClicked() && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("em", { style: { fontStyle: "italic", opacity: 0.8, marginLeft: "0.5rem" }, children: "(Selecionado)" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_fa2.FaChevronDown, {})
            ]
          }
        ),
        show && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                    borderBottom: "1px solid #ddd"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_fa2.FaSearch, { style: { marginRight: "0.5rem", color: "#555" } }),
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
              !multiMode && !singleReturn ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_fa2.FaCheckSquare, { style: { marginRight: "0.5rem" } }),
                    "Selecionar multiplos"
                  ]
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { display: "flex", gap: "0.5rem", margin: "0.5rem 0" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_fa2.FaCheck, { style: { marginRight: "0.5rem" } }),
                      "Confirmar selecao"
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_md.MdClose, { style: { marginRight: "0.5rem" } }),
                      "Cancelar"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: { padding: "0.5rem" }, children: visibleNodes.map((bn) => {
                const selected = multiMode ? multiSelected.some((r) => r.id === bn.recurso.id) : false;
                return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: bn.recurso.nome }),
                      selected && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_fa2.FaCheck, {})
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
var import_react2 = require("react");
var import_gr3 = require("react-icons/gr");
var import_teraprox_ui_kit5 = require("teraprox-ui-kit");
var import_teraprox_core_sdk2 = require("teraprox-core-sdk");
var import_jsx_runtime10 = require("react/jsx-runtime");
var FindRecursoByTagField = ({
  callback,
  vm: vmProp,
  recursoController
}) => {
  const defaultVm = (0, import_teraprox_core_sdk2.useFindRecursoByTagViewModel)(
    recursoController ? { recursoController } : void 0
  );
  const vm = vmProp != null ? vmProp : defaultVm;
  const [selectedTag, setSelectedTag] = (0, import_react2.useState)("");
  const [reachedRecurso, setReachedRecurso] = (0, import_react2.useState)(null);
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
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          import_gr3.GrCheckmark,
          {
            size: 25,
            onClick: () => reachedRecurso && callback(reachedRecurso, true)
          }
        )
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    import_teraprox_ui_kit5.AutoComplete,
    {
      sortKey: "id",
      loadCondition: true,
      loadFunc: () => vm.loadActiveTags(),
      displayKey: "descricao",
      title: "Selecione ou Digite a TAG",
      actionButton: confirmRecursoSelectionButton,
      actionButton2: () => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_teraprox_ui_kit5.QrCodeScanButton,
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
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  const [selectorDisplay, setSelectorDisplay] = (0, import_react3.useState)("");
  const [multiMode, setMultiMode] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    vm.loadInitialBranches().catch(
      (err) => console.warn("[RecursoDisplayer] loadInitialBranches failed:", err)
    );
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: { width: "100%", padding: 0 }, className: "recurso-displayer-generic", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "d-flex justify-content-between align-items-center mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("label", { className: "me-2", children: "Selecionar Recurso Por:" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_react_bootstrap5.Button,
        {
          size: "sm",
          onClick: () => setSelectorDisplay("branch"),
          variant: selectorDisplay === "branch" ? "primary" : "outline-primary",
          className: "me-1",
          children: "Arvore"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_react_bootstrap5.Button,
        {
          size: "sm",
          onClick: () => setSelectorDisplay("TAG"),
          variant: selectorDisplay === "TAG" ? "primary" : "outline-primary",
          children: "TAG"
        }
      )
    ] }) }),
    selectorDisplay === "branch" && vm.branches.map((branch, i) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
    selectorDisplay === "TAG" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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

// src/tarefa/TarefaCard.tsx
var import_react_bootstrap7 = require("react-bootstrap");
var import_fa62 = require("react-icons/fa6");

// src/tarefa/UnidadeMaterialPicker.tsx
var import_react4 = require("react");
var import_react_bootstrap6 = require("react-bootstrap");
var import_md2 = require("react-icons/md");
var import_ri = require("react-icons/ri");
var import_ti = require("react-icons/ti");
var import_teraprox_ui_kit6 = require("teraprox-ui-kit");
var import_jsx_runtime12 = require("react/jsx-runtime");
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
  const [optionsPicked, setOptionsPicked] = (0, import_react4.useState)([]);
  const [view, setView] = (0, import_react4.useState)(true);
  const [deleteConfirm, setShowDelete] = (0, import_react4.useState)(false);
  const [optionIndexToDelete, setOptionIndexToDelete] = (0, import_react4.useState)(false);
  const [editingIndex, setEditingIndex] = (0, import_react4.useState)(null);
  (0, import_react4.useEffect)(() => {
    const fetcher = async () => {
      if (fetchOpsSelected) {
        const opsFetched = await fetchOpsSelected();
        setOptionsPicked(opsFetched || []);
      }
    };
    fetcher();
  }, []);
  (0, import_react4.useEffect)(() => {
    if (opsSelected) {
      Array.isArray(opsSelected) ? setOptionsPicked(opsSelected) : setOptionsPicked([opsSelected]);
    }
  }, [opsSelected]);
  (0, import_react4.useEffect)(() => {
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
  const renderTooltip = (props) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_bootstrap6.Tooltip, { id: "button-tooltip", ...props, children: "Remover todas as opcoes" });
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
  const renderOps = () => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("h4", { children: [
      optionDisplayName,
      clearPickerOptions && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        import_react_bootstrap6.OverlayTrigger,
        {
          placement: "right",
          delay: { show: 250, hide: 250 },
          overlay: renderTooltip,
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_bootstrap6.Button, { variant: "warning", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ri.RiDeleteBin5Line, { onClick: () => clearPickerOptions() }) })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_bootstrap6.ListGroup, { numbered: true, id: "pickerOps", children: optionsPicked.map((pi, index) => {
      if (optionComponent) {
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
              deleteButton: () => onOptionDelete ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
        import_react_bootstrap6.ListGroup.Item,
        {
          disabled: pi == null ? void 0 : pi.removed,
          style: {
            opacity: (pi == null ? void 0 : pi.removed) ? 0.5 : 1,
            display: "flex",
            alignContent: "center",
            textDecoration: (pi == null ? void 0 : pi.removed) ? "line-through" : "none"
          },
          action: true,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { onClick: () => onOptionEditClickHandler(pi, index), children: getDisplayValueHandler(pi, index) }),
            onOptionDelete && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
    !singlePick && !readOnlyMode && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: { textAlign: "center", padding: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      import_react_bootstrap6.Button,
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
      return ((_a = optionsPicked == null ? void 0 : optionsPicked.length) != null ? _a : 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        import_react_bootstrap6.Button,
        {
          disabled: readOnlyMode,
          className: "pickerButton",
          onClick: () => {
            if (onPickerOpen) onPickerOpen();
            setView(false);
          },
          children: displayButtonName
        }
      ) : ((_b = optionsPicked == null ? void 0 : optionsPicked.length) != null ? _b : 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      import_react_bootstrap6.Button,
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
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      import_teraprox_ui_kit6.DeleteConfirm,
      {
        dialogText: deleteDiaologText,
        onHide: setShowDelete,
        title: deleteTitle || "Confirmacao de remocao",
        payload: optionIndexToDelete,
        onConfirm: () => onDeleteConfirmHandler(),
        show: deleteConfirm
      }
    ),
    view ? buildCloseDisplay() : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { padding: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "div",
            {
              onClick: () => closePickerHandler(),
              style: { float: "right" },
              children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_md2.MdClose, {})
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: displayName }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_teraprox_ui_kit6.UnidadeMaterialForm,
            {
              value: outOption,
              onMaterialSelected,
              onQuantidadeUpdate,
              onUnidadeSelected,
              loadMaterialsFunc,
              loadUnidadesFunc
            }
          ),
          editingIndex == null && showOpsWhenEdit && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
          editingIndex != null && onOptionEditClick ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: { textAlign: "center", marginBottom: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_react_bootstrap6.Button,
            {
              style: { display: readOnlyMode ? "none" : "" },
              variant: "warning",
              onClick: saveEditOption,
              children: "Salvar Edicao"
            }
          ) }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: { textAlign: "center", marginBottom: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_react_bootstrap6.Button,
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
var import_jsx_runtime13 = require("react/jsx-runtime");
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
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_bootstrap7.Button, { disabled: true, variant: "secondary", children: "Tarefa Conclu\xEDda" });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_bootstrap7.Button, { variant: "danger", onClick: () => remove(), children: "Remover" });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_bootstrap7.Card, { style: { margin: 12 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_bootstrap7.Card.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "d-flex justify-content-between align-items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: `Ordem: ${ordem}` }),
      !onlyView && conditionalActionButton()
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_bootstrap7.Card.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_bootstrap7.ListGroup, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_bootstrap7.ListGroup.Item, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "A realizar:" }),
        " ",
        `${(tarefa == null ? void 0 : tarefa.modelIdentifier) ? tarefa == null ? void 0 : tarefa.modelIdentifier : (_b = tarefa == null ? void 0 : tarefa.acao) == null ? void 0 : _b.nome} - ${(_c = tarefa == null ? void 0 : tarefa.acao) == null ? void 0 : _c.descricao}`
      ] }),
      tarefa.unidadesMateriais && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_bootstrap7.ListGroup.Item, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Material Nescessario:" }),
        tarefa.unidadesMateriais && tarefa.status !== "ENCERRADO" ? !readOnlyMode && !onlyView && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
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
        ) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_bootstrap7.ListGroup, { as: "ol", numbered: true, children: tarefa.unidadesMateriais && tarefa.unidadesMateriais.map((uM, idx) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_bootstrap7.ListGroup.Item, { children: [
          materialDisplay(uM.nomeMaterial),
          uM.quantidade,
          unidadeDisplay(uM.labelUnidade)
        ] }, idx)) })
      ] }),
      tarefa.inspecoes && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_bootstrap7.ListGroup.Item, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Inspe\xE7\xF5es:" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_bootstrap7.ListGroup, { as: "ol", numbered: true, children: tarefa.inspecoes && renderInspecoes ? renderInspecoes(tarefa.inspecoes) : null })
      ] }),
      ((_e = tarefa == null ? void 0 : tarefa.tarefaJustificativas) == null ? void 0 : _e.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_bootstrap7.ListGroup.Item, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fa62.FaRegCommentDots, { size: 20 }),
        " ",
        tarefa.tarefaJustificativas[tarefa.tarefaJustificativas.length - 1].descricao
      ] })
    ] }) })
  ] }, `${posindex}${tarefa.sequencia}`);
};

// src/tarefa/TarefaItem.tsx
var import_react5 = require("react");
var import_react_bootstrap8 = require("react-bootstrap");
var import_fa3 = require("react-icons/fa");
var import_teraprox_ui_kit7 = require("teraprox-ui-kit");
var import_jsx_runtime14 = require("react/jsx-runtime");
var TarefaItem = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const {
    tarefa: tarefaForm,
    readOnly,
    index,
    fatherId = null,
    isMobile = false,
    saving: savingProp,
    onToggleStatus,
    onDescricaoUpdate,
    onQuantidadeUnidadeMaterialChange,
    onQuantidadeUnidadeMaterialBlur,
    onOpenObservacoes,
    onSaveObservacao,
    onUploadAnexo,
    onDeleteAnexo,
    onSaveNovaInspecao,
    onAddUnidadeMaterial,
    onUpdateInspecaoField,
    unidadeMaterialFormValue,
    unidadeMaterialFormHandlers,
    renderAnexos,
    renderIconWithBadge,
    renderEditableDescricao,
    renderObservacaoModal,
    renderInspecoesList,
    renderNovaInspecaoForm,
    renderNovaUnidadeMaterialForm
  } = props;
  const anexos = (tarefaForm == null ? void 0 : tarefaForm.anexos) || [];
  const [showObs, setShowObs] = (0, import_react5.useState)(false);
  const [showInsp, setShowInsp] = (0, import_react5.useState)(false);
  const [showMat, setShowMat] = (0, import_react5.useState)(false);
  const [quantidadeUnidadeMaterialIsChanged, setQuantidadeUnidadeMaterialIsChanged] = (0, import_react5.useState)(false);
  const saving = savingProp != null ? savingProp : false;
  const checked = (0, import_react5.useMemo)(
    () => tarefaForm.status === "ENCERRADO",
    [tarefaForm]
  );
  const handleQuantidadeChange = (quantidade, indexUM) => {
    if (!quantidadeUnidadeMaterialIsChanged)
      setQuantidadeUnidadeMaterialIsChanged(true);
    onQuantidadeUnidadeMaterialChange(quantidade, indexUM);
  };
  const handleQuantidadeBlur = (tumId, form) => {
    if (quantidadeUnidadeMaterialIsChanged) {
      onQuantidadeUnidadeMaterialBlur(tumId, form);
      setQuantidadeUnidadeMaterialIsChanged(false);
    }
  };
  const handleOpenObsClick = async () => {
    await onOpenObservacoes();
    setShowObs(true);
  };
  const conditionalMaterialUtilizadoFieldRender = (tUM, i) => {
    if (saving) {
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-100", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_bootstrap8.Spinner, { animation: "border" }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      import_teraprox_ui_kit7.FormField,
      {
        styleObj: { fontSize: "1.2rem" },
        ty: "number",
        className: "w-100",
        val: tUM.quantidade,
        onValueUpdate: (v) => handleQuantidadeChange(v, i),
        onBlur: () => handleQuantidadeBlur(tUM.id, {
          quantidade: tUM.quantidade,
          tarefaId: tarefaForm.id
        })
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_react_bootstrap8.Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "tarefa-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "tarefa-title-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("strong", { children: [
              tarefaForm.sequencia,
              "."
            ] }),
            renderEditableDescricao({
              initialValue: tarefaForm.descricao,
              onHide: (descricao) => onDescricaoUpdate(descricao),
              renderFallback: (setActive, setOldValue) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "editable-text-container", children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  import_teraprox_ui_kit7.TextWithMore,
                  {
                    text: tarefaForm.descricao,
                    maxLength: 25
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_teraprox_ui_kit7.GenericDisplay, { children: !readOnly && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  import_fa3.FaRegEdit,
                  {
                    onClick: () => {
                      setActive(true);
                      setOldValue(tarefaForm.descricao);
                    },
                    className: "editable-text-icon zoom-container ms-2"
                  }
                ) })
              ] })
            })
          ] }),
          ((_a = tarefaForm.acao) == null ? void 0 : _a.nome) && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "tarefa-acao-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_fa3.FaWrench, {}),
            " ",
            tarefaForm.acao.nome
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "d-flex gap-3 align-items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_fa3.FaComments,
            {
              title: "Observa\xE7\xF5es",
              size: 25,
              className: "hoverable-div",
              onClick: handleOpenObsClick
            }
          ),
          renderIconWithBadge({
            icon: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              import_fa3.FaClipboardList,
              {
                title: "Inspe\xE7\xF5es",
                size: 25,
                className: "hoverable-div",
                onClick: () => setShowInsp(true)
              }
            ),
            content: (_c = (_b = tarefaForm == null ? void 0 : tarefaForm.inspecoes) == null ? void 0 : _b.length) != null ? _c : 0
          }),
          renderIconWithBadge({
            icon: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              import_fa3.FaCubes,
              {
                title: "Materiais",
                size: 25,
                className: "hoverable-div",
                onClick: () => setShowMat(true)
              }
            ),
            content: (_e = (_d = tarefaForm == null ? void 0 : tarefaForm.tarefaUnidadesMateriais) == null ? void 0 : _d.length) != null ? _e : 0
          }),
          renderAnexos({
            onUpload: (anexo) => onUploadAnexo(anexo),
            onDelete: (id, anexoKey) => onDeleteAnexo(id, anexoKey),
            filesData: anexos
          })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "d-flex align-items-start", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          import_teraprox_ui_kit7.StatusBadge,
          {
            status: tarefaForm.status,
            showCheckbox: !readOnly,
            checked,
            onToggle: onToggleStatus,
            loading: saving
          }
        ) })
      ] }),
      ((_f = tarefaForm.tarefaUnidadesMateriais) == null ? void 0 : _f.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_bootstrap8.Card.Footer, { children: (_g = tarefaForm.tarefaUnidadesMateriais) == null ? void 0 : _g.map((tum, i) => {
        var _a2, _b2;
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { textAlign: "center" }, children: i + 1 }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: ((_a2 = tum.unidadeMaterial) == null ? void 0 : _a2.nomeMaterial) || "-" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
                tum.quantidade,
                " ",
                (_b2 = tum.unidadeMaterial) == null ? void 0 : _b2.labelUnidade
              ] })
            ]
          },
          i
        );
      }) })
    ] }),
    renderObservacaoModal({
      readOnly,
      show: showObs,
      close: () => setShowObs(false),
      saveCallback: onSaveObservacao
    }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      import_teraprox_ui_kit7.ResponsiveContainer,
      {
        title: "Inspe\xE7\xF5es",
        show: showInsp,
        setShow: setShowInsp,
        children: [
          renderInspecoesList({
            readOnly,
            inspecoes: tarefaForm.inspecoes,
            isMobile,
            updateInspecaoCallback: onUpdateInspecaoField
          }),
          !readOnly && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_teraprox_ui_kit7.SwitchOnClick, { children: ({ handleClose }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_teraprox_ui_kit7.ResponsiveContainer,
            {
              setShow: handleClose,
              title: "Nova inspe\xE7\xE3o",
              show: true,
              children: renderNovaInspecaoForm({
                onSaveClick: (inspecao) => onSaveNovaInspecao(inspecao),
                handleClose
              })
            }
          ) }) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      import_teraprox_ui_kit7.ResponsiveContainer,
      {
        title: "Materiais",
        show: showMat,
        setShow: setShowMat,
        children: [
          !isMobile ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_react_bootstrap8.Table, { bordered: true, size: "sm", className: "mt-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("tr", { style: { textAlign: "center" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("th", { children: "N\u02DA" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("th", { children: "Material" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("th", { children: "Planejada" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("th", { children: "Utilizada" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "tbody",
              {
                style: {
                  verticalAlign: "middle",
                  textAlign: "center",
                  fontSize: "1.2rem"
                },
                children: (_h = tarefaForm.tarefaUnidadesMateriais) == null ? void 0 : _h.map((tum, i) => {
                  var _a2, _b2, _c2;
                  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("tr", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { children: i + 1 }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { children: ((_a2 = tum.unidadeMaterial) == null ? void 0 : _a2.nomeMaterial) || "-" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("td", { children: [
                      (_b2 = tum.unidadeMaterial) == null ? void 0 : _b2.quantidade,
                      " ",
                      (_c2 = tum.unidadeMaterial) == null ? void 0 : _c2.labelUnidade
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { children: conditionalMaterialUtilizadoFieldRender(tum, i) })
                  ] }, tum.id);
                })
              }
            )
          ] }) : (_i = tarefaForm.tarefaUnidadesMateriais) == null ? void 0 : _i.map((tum, i) => {
            var _a2, _b2, _c2, _d2;
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              import_teraprox_ui_kit7.ExpandableCard,
              {
                items: [
                  {
                    content: ((_b2 = tum.unidadeMaterial) == null ? void 0 : _b2.nomeMaterial) || "-",
                    label: "Nome"
                  },
                  {
                    content: ((_c2 = tum.unidadeMaterial) == null ? void 0 : _c2.quantidade) + " " + ((_d2 = tum.unidadeMaterial) == null ? void 0 : _d2.labelUnidade),
                    label: "Qtd planejada"
                  },
                  {
                    content: conditionalMaterialUtilizadoFieldRender(tum, i),
                    label: "Utilizado"
                  }
                ]
              }
            ) }, (_a2 = tum.id) != null ? _a2 : i);
          }),
          !readOnly && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_teraprox_ui_kit7.SwitchOnClick, { children: ({ handleClose }) => renderNovaUnidadeMaterialForm({
            onSaveClick: (form) => onAddUnidadeMaterial(form, handleClose),
            handleClose,
            value: unidadeMaterialFormValue,
            handlers: unidadeMaterialFormHandlers
          }) })
        ]
      }
    )
  ] });
};

// src/mantenedor/MantenedorPicker.tsx
var import_react6 = __toESM(require("react"));
var import_react_bootstrap9 = require("react-bootstrap");
var import_gr4 = require("react-icons/gr");
var import_teraprox_ui_kit8 = require("teraprox-ui-kit");
var import_jsx_runtime15 = require("react/jsx-runtime");
var MantenedorPicker = ({
  viewModel,
  currentOsId,
  onSelected,
  label = "Manutentores",
  disabled,
  className
}) => {
  const [hideOps, setHideOps] = import_react6.default.useState(true);
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { onMouseLeave: () => setHideOps(true), className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_teraprox_ui_kit8.FormField,
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
    !hideOps && viewModel.pendingConfirm === null && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_bootstrap9.ListGroup, { className: "list-mantenedor-container", children: viewModel.filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_bootstrap9.ListGroup.Item, { children: "Nenhum manutentor encontrado." }) : viewModel.filteredOptions.map((m) => {
      const isBusyOther = m._busy && m.osId !== currentOsId;
      const isBusyHere = m._busy && m.osId === currentOsId;
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_react_bootstrap9.ListGroup.Item,
        {
          action: true,
          onClick: () => handleClick(m),
          className: `mantenedor-option ${isBusyOther ? "busy" : ""} ${isBusyHere ? "current-os" : ""}`,
          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("li", { className: "d-flex align-items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: m.nomeUsuario }),
            isBusyHere && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "current-os-indicator", children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_gr4.GrCheckmark, { size: 18 }),
              " Trabalhando nesta OS"
            ] }),
            isBusyOther && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "busy-os-indicator", children: `Alocado OS-${m.osId}` })
          ] })
        },
        m.id
      );
    }) }),
    viewModel.pendingConfirm && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "confirm-desaloc-container", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_teraprox_ui_kit8.ApproveAndReproveButtons,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AcaoPicker,
  BranchDropDisplay,
  FindRecursoByTagField,
  InspecaoModal,
  MantenedorPicker,
  MantenedorRender,
  MantenedorRenderCompact,
  ManutentorCard,
  ManutentoresDisplay,
  MetricasDisplay,
  RecursoDisplayer,
  TarefaCard,
  TarefaItem,
  UnidadeMaterialModal,
  UnidadeMaterialPicker
});
