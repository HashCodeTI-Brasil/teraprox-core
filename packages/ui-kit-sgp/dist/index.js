"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// ../../node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "../../node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function equal2(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal2(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal2(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AutorizacaoCard: () => AutorizacaoCard,
  AutorizacaoRejeicaoModal: () => AutorizacaoRejeicaoModal,
  BadgePendenteAutorizacao: () => BadgePendenteAutorizacao,
  CadernoDeVerificacaoHeader: () => CadernoDeVerificacaoHeader,
  CalculadoraCorrecaoModal: () => CalculadoraCorrecaoModal,
  CalculoCorrecao: () => CalculoCorrecao,
  CampoDeVerificacaoSelectableCards: () => CampoDeVerificacaoSelectableCards,
  CampoDeVerificacaoV2: () => CampoDeVerificacaoV2,
  ChartStats: () => ChartStats,
  ChartWithStats: () => ChartWithStats,
  ControleDashboardCard: () => ControleDashboardCard,
  ControleSelector: () => ControleSelector,
  EstatisticaDoControleDashBoard: () => EstatisticaDoControleDashBoard,
  EstatisticasFrequenciaDashboard: () => EstatisticasFrequenciaDashboard,
  FluxoEdge: () => FluxoEdge,
  FluxoLegend: () => FluxoLegend,
  FluxoNode: () => FluxoNode,
  FluxoToolbar: () => FluxoToolbar,
  FolhaDeVerificacao: () => FolhaDeVerificacao,
  FormulaBuilderOffcanvas: () => FormulaBuilderOffcanvas,
  FormulaEditor: () => FormulaEditor,
  FrequenciaFormV2: () => import_ui_kit_core5.FrequenciaFormV2,
  FrequenciaPicker: () => FrequenciaPicker,
  GROUP_LABELS: () => GROUP_LABELS,
  HistoryModal: () => HistoryModal,
  JustificativaModal: () => JustificativaModal,
  MaterialApontarCard: () => MaterialApontarCard,
  OrdemDeCorrecaoCard: () => OrdemDeCorrecaoCard,
  PlanoBadgeSelector: () => PlanoBadgeSelector,
  PlanoDashboardCard: () => PlanoDashboardCard,
  PresetSaveModal: () => PresetSaveModal,
  ReferenciaDinamicaPicker: () => ReferenciaDinamicaPicker,
  RegistroDeCampoCardView: () => RegistroDeCampoCardView,
  RegistroDeCampoField: () => RegistroDeCampoField,
  RegistroviewDashboardCard: () => RegistroviewDashboardCard,
  RelatorioModernCard: () => RelatorioModernCard,
  RelatorioModernWrapper: () => RelatorioModernWrapper,
  SheetOrdenationCard: () => SheetOrdenationCard,
  TIPO_CONFIG: () => TIPO_CONFIG,
  TOKEN_STYLES: () => TOKEN_STYLES,
  TarefaApontarCard: () => TarefaApontarCard,
  TarefaCard: () => TarefaCard,
  TarefaUnidadeForm: () => TarefaUnidadeForm,
  TokenBadge: () => TokenBadge,
  TokenDragItem: () => TokenDragItem,
  UnidadeMaterialCard: () => UnidadeMaterialCard,
  getTokenStyle: () => getTokenStyle,
  useAnexoManager: () => useAnexoManager,
  useDragFormula: () => useDragFormula,
  useFolhaFetcher: () => useFolhaFetcher,
  useGrouping: () => useGrouping,
  useHistory: () => useHistory,
  useJustificativaModal: () => useJustificativaModal,
  useRegistroStyle: () => useRegistroStyle
});
module.exports = __toCommonJS(index_exports);

// src/correcao/CalculoCorrecao.tsx
var import_react = require("react");
var import_ui_kit_core = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime = require("react/jsx-runtime");
var localUuid = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
var replaceTokensInDisplay = (formula2) => {
  const regex = /\[(!?[^\]]+):([^\]]*?):([^\]]+?)\]/g;
  return formula2.replace(regex, (_m, name) => name);
};
var CalculoCorrecao = ({
  calculo,
  valorDesejado: _valorDesejado,
  addCalculoHandler
}) => {
  var _a;
  const [camposVirtuais2, setCamposVirtuais] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    if (calculo == null ? void 0 : calculo.formula) {
      const matches = [
        ...calculo.formula.matchAll(/\[!([^\]]+):([^\]]+):campoVirtual\]/g)
      ];
      const camposVirtuaisArray = matches.map((match) => ({
        id: localUuid(),
        token: match[0],
        name: match[1],
        value: match[2],
        valor: 0,
        label: "Campo Virtual"
      }));
      if (camposVirtuaisArray.length === 0) {
        addCalculoHandler(calculo);
      }
      setCamposVirtuais(camposVirtuaisArray);
    }
  }, [calculo == null ? void 0 : calculo.formula]);
  const updateValorCampoVirtual = (valor2, campoVirtual) => {
    const changedCampos = camposVirtuais2.map(
      (cV) => cV.id === campoVirtual.id ? { ...cV, valor: valor2 } : cV
    );
    addCalculoHandler({ ...calculo, camposVirtuais: changedCampos });
    setCamposVirtuais(changedCampos);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui_kit_core.Card, { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui_kit_core.CardBody, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { className: "text-base font-semibold text-surface-foreground mb-1", children: (_a = calculo.material) == null ? void 0 : _a.nome }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-neutral-700 mb-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "F\xF3rmula:" }),
        " ",
        calculo.formula ? replaceTokensInDisplay(calculo.formula) : ""
      ] })
    ] }) }),
    camposVirtuais2.map((cV) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui_kit_core.TextField,
      {
        label: cV.name,
        type: "number",
        placeholder: "Insira o valor desejado",
        value: cV.valor,
        onChange: (e) => updateValorCampoVirtual(e.target.value, cV)
      }
    ) }, cV.id))
  ] }) });
};

// src/correcao/CalculadoraCorrecaoModal.tsx
var import_react2 = require("react");
var import_ui_kit_core2 = require("@hashcodeti/ui-kit-core");
var import_fa = require("react-icons/fa");
var import_jsx_runtime2 = require("react/jsx-runtime");
var AsyncConfirmButton = ({
  onClick,
  variant = "primary",
  children
}) => {
  const [loading, setLoading] = (0, import_react2.useState)(false);
  const handle = async () => {
    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui_kit_core2.Button, { variant, disabled: loading, onClick: handle, children: loading ? "Processando..." : children });
};
var CalculadoraCorrecaoModal = ({
  show,
  onClose,
  regras,
  valorAtual = 0,
  onConfirm,
  fetchDimensao
}) => {
  var _a, _b, _c, _d;
  const [valorDesejado, setValorDesejado] = (0, import_react2.useState)("");
  const [regraSelecionada, setRegraSelecionada] = (0, import_react2.useState)(null);
  const [resultadosCalculado, setResultadosCalculado] = (0, import_react2.useState)(null);
  const [calculado, setCalculado] = (0, import_react2.useState)(false);
  const [calculosToUse, setCalculosToUse] = (0, import_react2.useState)([]);
  const [mostrarDetalhes, setMostrarDetalhes] = (0, import_react2.useState)(false);
  const [editingIndex, setEditingIndex] = (0, import_react2.useState)(null);
  const [editValues, setEditValues] = (0, import_react2.useState)({});
  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditValues((prev) => {
      var _a2;
      return {
        ...prev,
        [index]: ((_a2 = resultadosCalculado[index]) == null ? void 0 : _a2.quantidade) || ""
      };
    });
  };
  const handleEditChange = (index, value) => {
    setEditValues((prev) => ({ ...prev, [index]: value }));
  };
  const handleEditEnd = (index) => {
    const newResultados = [...resultadosCalculado];
    newResultados[index] = {
      ...newResultados[index],
      quantidade: parseFloat(editValues[index]).toFixed(2)
    };
    setResultadosCalculado(newResultados);
    setEditingIndex(null);
  };
  (0, import_react2.useEffect)(() => {
    const valorDesejadoNumerico2 = parseFloat(valorDesejado.replace(",", "."));
    if (valorDesejado !== "") {
      const regraUp = regras.find((r) => r.tipoDeCorrecao === "UP");
      const regraDown = regras.find((r) => r.tipoDeCorrecao === "DOWN");
      if (valorDesejadoNumerico2 > Number(valorAtual) && regraUp) {
        setRegraSelecionada(regraUp);
      } else if (valorDesejadoNumerico2 < Number(valorAtual) && regraDown) {
        setRegraSelecionada(regraDown);
      } else if (valorDesejadoNumerico2 === Number(valorAtual)) {
        setRegraSelecionada(null);
      }
    }
  }, [valorDesejado, regras, valorAtual]);
  (0, import_react2.useEffect)(() => {
    if (show) {
      setValorDesejado("");
      setRegraSelecionada(null);
      setCalculado(false);
      setMostrarDetalhes(false);
    }
  }, [show]);
  (0, import_react2.useEffect)(() => {
    if (regraSelecionada) {
      setCalculosToUse(regraSelecionada.calculosDeCorrecao || []);
    }
  }, [regraSelecionada]);
  const aplicarModuloNaFormula = (formula, vAtual, vDesejado) => {
    return formula.replace(/\|(.+?)\|/g, (_match, expr) => {
      const exprComValores = expr.replace(/\[!Vc:V0:entradaDoUsuario\]/g, vDesejado).replace(/\[!Vat:Vat:campoAtual\]/g, vAtual).replace("^", "**");
      const resultado = eval(exprComValores);
      return Math.abs(resultado).toFixed(2);
    });
  };
  const calcularResultado = async () => {
    if (!regraSelecionada) {
      setResultadosCalculado(["Nenhuma regra aplic\xE1vel encontrada."]);
      return;
    }
    const valorDesejadoNumerico = parseFloat(valorDesejado.replace(",", "."));
    const resultadosCalculados = [];
    for (const calculoToUse of calculosToUse) {
      const {
        formula,
        unidade,
        material,
        camposVirtuais,
        unidadeId,
        nomeUnidade,
        fatorSiUnidade,
        unidadeBaseSi
      } = calculoToUse;
      let formulaComValores = formula.replace(/\[!([^\]]+):([^\]]+):entradaDoUsuario\]/g, valorDesejadoNumerico).replace(/\[!([^\]]+):([^\]]+):campoAtual\]/g, valorAtual);
      camposVirtuais == null ? void 0 : camposVirtuais.forEach((cv) => {
        formulaComValores = formulaComValores.replace(cv.token, cv.valor);
      });
      const dimensaoTokenMatches = [
        ...formula.matchAll(/\[!([^\]]+):(\d+):dimensao\]/g)
      ];
      for (const dimensaoTokenMatch of dimensaoTokenMatches) {
        const idDimensao = dimensaoTokenMatch[2];
        if (!fetchDimensao) {
          console.warn(
            "[CalculadoraCorrecaoModal] fetchDimensao nao fornecido \u2014 token de dimensao ignorado."
          );
          continue;
        }
        try {
          const dimensao = await fetchDimensao(idDimensao);
          formulaComValores = formulaComValores.replace(
            dimensaoTokenMatch[0],
            String(dimensao.valor)
          );
        } catch (error) {
          console.error("Erro ao buscar a dimens\xE3o:", error);
          setResultadosCalculado(["Erro ao buscar dados da API de dimens\xE3o."]);
          return null;
        }
      }
      formulaComValores = aplicarModuloNaFormula(
        formulaComValores,
        valorAtual,
        valorDesejadoNumerico
      ).replace("^", "**");
      try {
        const resultadoCalculado = eval(formulaComValores);
        resultadosCalculados.push({
          materialId: material.id,
          unidadeLabel: unidade,
          quantidade: parseFloat(resultadoCalculado).toFixed(2),
          nomeMaterial: material.nome,
          unidadeId,
          nomeUnidade,
          fatorSiUnidade,
          unidadeBaseSi
        });
      } catch (error) {
        console.error("Erro ao avaliar a f\xF3rmula:", error);
        setResultadosCalculado(["Erro ao calcular a f\xF3rmula."]);
        return null;
      }
    }
    setResultadosCalculado(resultadosCalculados);
    setCalculado(true);
  };
  const handleConfirm = async () => {
    try {
      await onConfirm(regraSelecionada, resultadosCalculado);
      onClose(false);
    } catch (error) {
      console.error("Falha na confirma\xE7\xE3o:", error);
      throw error;
    }
  };
  const handleOpenChange = (open) => {
    if (!open) onClose(false);
  };
  const valorDesejadoNum = parseFloat(valorDesejado.replace(",", "."));
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui_kit_core2.Modal, { open: show, onOpenChange: handleOpenChange, size: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui_kit_core2.ModalHeader, { children: "Calculadora de Corre\xE7\xE3o" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui_kit_core2.ModalBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "Valor Atual:" }),
        " ",
        parseFloat(String(valorAtual)).toFixed(2)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-end gap-2", children: [
          valorDesejadoNum > Number(valorAtual) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_fa.FaArrowUp,
            {
              style: { color: "green", fontSize: "16px" },
              className: "mb-2"
            }
          ) : valorDesejadoNum < Number(valorAtual) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_fa.FaArrowDown,
            {
              style: { color: "red", fontSize: "16px" },
              className: "mb-2"
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui_kit_core2.TextField,
            {
              label: "Valor Desejado",
              type: "text",
              placeholder: "Insira o valor desejado",
              value: valorDesejado,
              onChange: (e) => setValorDesejado(e.target.value)
            }
          ) })
        ] }) }),
        regraSelecionada && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "Regra Selecionada:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui_kit_core2.Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setMostrarDetalhes(!mostrarDetalhes),
              className: "ml-2 p-0 h-auto underline",
              children: mostrarDetalhes ? "Ocultar" : "Mostrar"
            }
          ),
          mostrarDetalhes && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "A\xE7\xE3o:" }),
              " ",
              (_a = regraSelecionada.acao) == null ? void 0 : _a.nome,
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("br", {}),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "Descri\xE7\xE3o:" }),
              " ",
              (_b = regraSelecionada.acao) == null ? void 0 : _b.descricao
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-base font-semibold mb-2", children: "C\xE1lculos" }),
            (_c = regraSelecionada.calculosDeCorrecao) == null ? void 0 : _c.map((calculo) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              CalculoCorrecao,
              {
                calculo,
                valorDesejado,
                addCalculoHandler: (updatedCalculo) => {
                  const updatedCalculos = [...calculosToUse];
                  const index = updatedCalculos.findIndex(
                    (c) => c._id === updatedCalculo._id
                  );
                  if (index === -1) updatedCalculos.push(updatedCalculo);
                  else updatedCalculos[index] = updatedCalculo;
                  setCalculosToUse(updatedCalculos);
                }
              },
              calculo._id
            ))
          ] })
        ] })
      ] }),
      resultadosCalculado && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui_kit_core2.Card, { className: "mb-3 mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui_kit_core2.CardBody, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h5", { className: "text-base font-semibold mb-3", children: "Descri\xE7\xE3o da A\xE7\xE3o" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-neutral-600", children: (_d = regraSelecionada == null ? void 0 : regraSelecionada.acao) == null ? void 0 : _d.descricao }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h6", { className: "text-sm font-semibold mt-4 mb-2", children: "Valores Calculados:" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui_kit_core2.List, { children: resultadosCalculado.map((rC, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_ui_kit_core2.ListItem,
          {
            onClick: () => handleEditStart(index),
            children: editingIndex === index ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              import_ui_kit_core2.TextField,
              {
                type: "text",
                value: editValues[index],
                onChange: (e) => handleEditChange(index, e.target.value),
                onBlur: () => handleEditEnd(index),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleEditEnd(index);
                },
                autoFocus: true
              }
            ) : `${rC.quantidade} ${rC.unidade || rC.unidadeLabel} ${rC.nomeMaterial}`
          },
          index
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui_kit_core2.ModalFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui_kit_core2.Button, { variant: "secondary", onClick: () => onClose(false), children: "Fechar" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui_kit_core2.Button, { variant: "primary", onClick: calcularResultado, disabled: !regraSelecionada, children: "Calcular" }),
      calculado && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AsyncConfirmButton, { onClick: handleConfirm, children: "Confirmar" })
    ] })
  ] });
};
var CalculadoraCorrecaoModal_default = CalculadoraCorrecaoModal;

// src/tarefa-unidade/UnidadeMaterialCard.tsx
var import_ui_kit_core3 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime3 = require("react/jsx-runtime");
var UnidadeMaterialCard = ({
  onRemoveClick,
  onEditClick,
  tarefaUnidadeMaterial,
  header,
  materialContent,
  unidadeContent,
  quantidadeContent,
  actions,
  indexLabel
}) => {
  var _a, _b, _c, _d, _e, _f;
  const materialLabel = (_b = (_a = tarefaUnidadeMaterial == null ? void 0 : tarefaUnidadeMaterial.unidadeMaterial) == null ? void 0 : _a.nomeMaterial) != null ? _b : "-";
  const unidadeLabel = (_d = (_c = tarefaUnidadeMaterial == null ? void 0 : tarefaUnidadeMaterial.unidadeMaterial) == null ? void 0 : _c.unidadeLabel) != null ? _d : "-";
  const quantidadeLabel = (_f = (_e = tarefaUnidadeMaterial == null ? void 0 : tarefaUnidadeMaterial.unidadeMaterial) == null ? void 0 : _e.quantidade) != null ? _f : "-";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "w-full", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_ui_kit_core3.Card,
    {
      className: "border-0 shadow-sm bg-white overflow-hidden",
      style: { borderRadius: "14px" },
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui_kit_core3.CardBody, { style: { padding: "14px 16px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-start gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex-grow", children: [
            header ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mb-2", children: header }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-neutral-500 uppercase text-xs mb-1", children: indexLabel != null ? indexLabel : "Unidade material" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "font-semibold leading-tight text-base", children: materialContent != null ? materialContent : materialLabel })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: "flex items-center justify-center font-bold text-sm",
              style: {
                minWidth: 38,
                height: 38,
                borderRadius: 10,
                background: "#0d6efd14",
                color: "#0d6efd"
              },
              children: "UM"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-wrap gap-2 mt-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              className: "px-3 py-2 rounded flex-1",
              style: { background: "#f6f8fb", minWidth: 150 },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-neutral-500 uppercase text-xs", children: "Unidade" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "font-semibold mt-1", children: unidadeContent != null ? unidadeContent : unidadeLabel })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              className: "px-3 py-2 rounded flex-1",
              style: { background: "#f6f8fb", minWidth: 150 },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-neutral-500 uppercase text-xs", children: "Planejado" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "font-semibold mt-1", children: quantidadeContent != null ? quantidadeContent : quantidadeLabel })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex gap-2 justify-end flex-wrap mt-3", children: actions != null ? actions : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
          onEditClick && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_ui_kit_core3.Button,
            {
              size: "sm",
              variant: "outline-primary",
              onClick: () => onEditClick(tarefaUnidadeMaterial),
              children: "Editar"
            }
          ),
          onRemoveClick && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_ui_kit_core3.Button,
            {
              size: "sm",
              variant: "outline-danger",
              onClick: () => onRemoveClick(tarefaUnidadeMaterial),
              children: "Remover"
            }
          )
        ] }) })
      ] })
    }
  ) });
};

// src/tarefa-unidade/TarefaUnidadeForm.tsx
var import_react3 = require("react");
var import_ui_kit_core4 = require("@hashcodeti/ui-kit-core");
var import_teraprox_ui_kit = require("teraprox-ui-kit");
var import_jsx_runtime4 = require("react/jsx-runtime");
var emptyForm = () => ({
  acaoId: "",
  descricao: "",
  status: "PENDENTE",
  acao: null,
  tarefasUnidadeMaterial: []
});
var TarefaUnidadeForm = ({
  tarefaForm: initialTarefaForm,
  onSaveForm,
  onCancelEdit,
  unidadeMaterial,
  onClearUnidadeMaterial,
  onLoadTumForEdit,
  renderUnidadeMaterialForm,
  loadAcoes
}) => {
  var _a;
  const [tarefaForm, setTarefaForm] = (0, import_react3.useState)(
    initialTarefaForm || emptyForm()
  );
  const [showTumForm, setShowTumForm] = (0, import_react3.useState)(false);
  const [editIndex, setEditIndex] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    if (initialTarefaForm) setTarefaForm(initialTarefaForm);
  }, [initialTarefaForm]);
  const handleSave = () => {
    onSaveForm == null ? void 0 : onSaveForm(tarefaForm);
    setTarefaForm(emptyForm());
    onClearUnidadeMaterial == null ? void 0 : onClearUnidadeMaterial();
    setShowTumForm(false);
    setEditIndex(null);
  };
  const handleCancelEdit = () => {
    setTarefaForm(initialTarefaForm || emptyForm());
    onClearUnidadeMaterial == null ? void 0 : onClearUnidadeMaterial();
    setShowTumForm(false);
    setEditIndex(null);
    onCancelEdit == null ? void 0 : onCancelEdit();
  };
  const handleAddUnidade = () => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (editIndex !== null) {
      setTarefaForm((prev) => {
        var _a3, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j, _k, _l, _m, _n, _o, _p;
        const tarefas = Array.isArray(prev.tarefasUnidadeMaterial) ? prev.tarefasUnidadeMaterial : [];
        const updatedTarefas = [...tarefas];
        const existingTum = updatedTarefas[editIndex] || {};
        updatedTarefas[editIndex] = {
          ...existingTum,
          unidadeMaterial: {
            ...existingTum.unidadeMaterial || {},
            nomeMaterial: ((_a3 = unidadeMaterial == null ? void 0 : unidadeMaterial.material) == null ? void 0 : _a3.nome) || ((_b2 = existingTum.unidadeMaterial) == null ? void 0 : _b2.nomeMaterial) || "",
            unidadeLabel: ((_c2 = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _c2.label) || ((_d2 = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _d2.nome) || ((_e2 = existingTum.unidadeMaterial) == null ? void 0 : _e2.unidadeLabel) || "",
            quantidade: (unidadeMaterial == null ? void 0 : unidadeMaterial.quantidade) || ((_f2 = existingTum.unidadeMaterial) == null ? void 0 : _f2.quantidade) || 0,
            materialId: ((_g2 = unidadeMaterial == null ? void 0 : unidadeMaterial.material) == null ? void 0 : _g2.id) || ((_h2 = existingTum.unidadeMaterial) == null ? void 0 : _h2.materialId) || null,
            unidadeId: ((_i = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _i.id) || ((_j = existingTum.unidadeMaterial) == null ? void 0 : _j.unidadeId) || null,
            nomeUnidade: ((_k = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _k.nome) || ((_l = existingTum.unidadeMaterial) == null ? void 0 : _l.nomeUnidade) || "",
            fatorSiUnidade: ((_m = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _m.fatorSi) || ((_n = existingTum.unidadeMaterial) == null ? void 0 : _n.fatorSiUnidade) || 1,
            unidadeBaseSi: ((_o = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _o.unidadeBaseSi) || ((_p = existingTum.unidadeMaterial) == null ? void 0 : _p.unidadeBaseSi) || ""
          }
        };
        return { ...prev, tarefasUnidadeMaterial: updatedTarefas };
      });
      setEditIndex(null);
    } else {
      const novoTarefaUnidadeMaterial = {
        unidadeMaterial: {
          nomeMaterial: ((_a2 = unidadeMaterial == null ? void 0 : unidadeMaterial.material) == null ? void 0 : _a2.nome) || "",
          unidadeLabel: ((_b = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _b.label) || ((_c = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _c.nome) || "",
          quantidade: (unidadeMaterial == null ? void 0 : unidadeMaterial.quantidade) || 0,
          materialId: ((_d = unidadeMaterial == null ? void 0 : unidadeMaterial.material) == null ? void 0 : _d.id) || null,
          unidadeId: (_e = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _e.id,
          nomeUnidade: (_f = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _f.nome,
          fatorSiUnidade: ((_g = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _g.fatorSi) || 1,
          unidadeBaseSi: (_h = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _h.unidadeBaseSi
        }
      };
      setTarefaForm((prev) => ({
        ...prev,
        tarefasUnidadeMaterial: [
          ...Array.isArray(prev.tarefasUnidadeMaterial) ? prev.tarefasUnidadeMaterial : [],
          novoTarefaUnidadeMaterial
        ]
      }));
    }
    onClearUnidadeMaterial == null ? void 0 : onClearUnidadeMaterial();
    setShowTumForm(false);
  };
  const handleRemoveUnidade = (index) => {
    setTarefaForm((prev) => {
      var _a2;
      return {
        ...prev,
        tarefasUnidadeMaterial: ((_a2 = prev.tarefasUnidadeMaterial) == null ? void 0 : _a2.filter((_, i) => i !== index)) || []
      };
    });
  };
  const handleTumEdit = (tum, index) => {
    onLoadTumForEdit == null ? void 0 : onLoadTumForEdit(tum);
    setEditIndex(index);
    setShowTumForm(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui_kit_core4.Card, { className: "mb-3 border-0 shadow-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui_kit_core4.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h5", { className: "mb-0", children: editIndex !== null ? "Editar Tarefa" : "Nova Tarefa" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui_kit_core4.CardBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "grid grid-cols-12 gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "col-span-12", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_teraprox_ui_kit.AutoComplete,
        {
          title: "A\xE7\xE3o",
          displayKey: "descricao",
          value: tarefaForm == null ? void 0 : tarefaForm.descricao,
          onSelectedClick: (acao) => setTarefaForm((prev) => ({
            ...prev,
            acaoId: acao == null ? void 0 : acao.id,
            descricao: (acao == null ? void 0 : acao.descricao) || (acao == null ? void 0 : acao.nome) || "",
            acao
          })),
          loadCondition: true,
          loadFunc: loadAcoes,
          placeholder: "Selecione uma a\xE7\xE3o"
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("hr", { className: "my-3 border-neutral-200" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mt-3", children: !showTumForm ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_ui_kit_core4.Button,
        {
          variant: "outline-primary",
          onClick: () => setShowTumForm(true),
          children: editIndex !== null ? "Editar Material" : "Adicionar Material"
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: "p-3 rounded",
          style: { border: "1px solid #dee2e6", background: "#f8f9fa" },
          children: [
            renderUnidadeMaterialForm == null ? void 0 : renderUnidadeMaterialForm(),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-3 flex justify-end", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui_kit_core4.Button, { variant: "success", onClick: handleAddUnidade, children: editIndex !== null ? "Atualizar" : "Confirmar" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_ui_kit_core4.Button,
                {
                  variant: "outline-secondary",
                  className: "ml-2",
                  onClick: () => {
                    onClearUnidadeMaterial == null ? void 0 : onClearUnidadeMaterial();
                    setShowTumForm(false);
                    setEditIndex(null);
                  },
                  children: "Cancelar"
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mt-4 flex flex-col gap-3", children: (_a = tarefaForm.tarefasUnidadeMaterial) == null ? void 0 : _a.filter((tum) => !tum.removed).map((tum, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        UnidadeMaterialCard,
        {
          tarefaUnidadeMaterial: tum,
          onRemoveClick: () => handleRemoveUnidade(index),
          onEditClick: () => handleTumEdit(tum, index),
          header: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "div",
            {
              className: "mr-3 flex items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground",
              style: { width: 32, height: 32, fontWeight: 600 },
              children: index + 1
            }
          )
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui_kit_core4.CardFooter, { className: "flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui_kit_core4.Button, { variant: "outline-danger", onClick: handleCancelEdit, children: "Cancelar" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui_kit_core4.Button, { variant: "primary", onClick: handleSave, children: "Salvar" })
    ] })
  ] });
};

// src/frequencia/FrequenciaFormV2.tsx
var import_ui_kit_core5 = require("@hashcodeti/ui-kit-core");
var import_ui_kit_core6 = require("@hashcodeti/ui-kit-core");

// src/folha-verificacao/CampoDeVerificacaoV2.tsx
var import_react20 = require("react");
var import_ui_kit_core7 = require("@hashcodeti/ui-kit-core");

// ../../node_modules/react-dnd/dist/core/DndContext.js
var import_react4 = require("react");
var DndContext = (0, import_react4.createContext)({
  dragDropManager: void 0
});

// ../../node_modules/@react-dnd/invariant/dist/index.js
function invariant(condition, format, ...args) {
  if (isProduction()) {
    if (format === void 0) {
      throw new Error("invariant requires an error message argument");
    }
  }
  if (!condition) {
    let error;
    if (format === void 0) {
      error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    } else {
      let argIndex = 0;
      error = new Error(format.replace(/%s/g, function() {
        return args[argIndex++];
      }));
      error.name = "Invariant Violation";
    }
    error.framesToPop = 1;
    throw error;
  }
}
function isProduction() {
  return typeof process !== "undefined" && process.env["NODE_ENV"] === "production";
}

// ../../node_modules/react-dnd/dist/hooks/useCollector.js
var import_fast_deep_equal = __toESM(require_fast_deep_equal(), 1);
var import_react6 = require("react");

// ../../node_modules/react-dnd/dist/hooks/useIsomorphicLayoutEffect.js
var import_react5 = require("react");
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react5.useLayoutEffect : import_react5.useEffect;

// ../../node_modules/react-dnd/dist/hooks/useCollector.js
function useCollector(monitor, collect, onUpdate) {
  const [collected, setCollected] = (0, import_react6.useState)(
    () => collect(monitor)
  );
  const updateCollected = (0, import_react6.useCallback)(() => {
    const nextValue = collect(monitor);
    if (!(0, import_fast_deep_equal.default)(collected, nextValue)) {
      setCollected(nextValue);
      if (onUpdate) {
        onUpdate();
      }
    }
  }, [
    collected,
    monitor,
    onUpdate
  ]);
  useIsomorphicLayoutEffect(updateCollected);
  return [
    collected,
    updateCollected
  ];
}

// ../../node_modules/react-dnd/dist/hooks/useMonitorOutput.js
function useMonitorOutput(monitor, collect, onCollect) {
  const [collected, updateCollected] = useCollector(monitor, collect, onCollect);
  useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
    const handlerId = monitor.getHandlerId();
    if (handlerId == null) {
      return;
    }
    return monitor.subscribeToStateChange(updateCollected, {
      handlerIds: [
        handlerId
      ]
    });
  }, [
    monitor,
    updateCollected
  ]);
  return collected;
}

// ../../node_modules/react-dnd/dist/hooks/useCollectedProps.js
function useCollectedProps(collector, monitor, connector) {
  return useMonitorOutput(
    monitor,
    collector || (() => ({})),
    () => connector.reconnect()
  );
}

// ../../node_modules/react-dnd/dist/hooks/useOptionalFactory.js
var import_react7 = require("react");
function useOptionalFactory(arg, deps) {
  const memoDeps = [
    ...deps || []
  ];
  if (deps == null && typeof arg !== "function") {
    memoDeps.push(arg);
  }
  return (0, import_react7.useMemo)(() => {
    return typeof arg === "function" ? arg() : arg;
  }, memoDeps);
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/connectors.js
var import_react8 = require("react");
function useConnectDragSource(connector) {
  return (0, import_react8.useMemo)(
    () => connector.hooks.dragSource(),
    [
      connector
    ]
  );
}
function useConnectDragPreview(connector) {
  return (0, import_react8.useMemo)(
    () => connector.hooks.dragPreview(),
    [
      connector
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSourceConnector.js
var import_react11 = require("react");

// ../../node_modules/react-dnd/dist/internals/DragSourceMonitorImpl.js
var isCallingCanDrag = false;
var isCallingIsDragging = false;
var DragSourceMonitorImpl = class {
  receiveHandlerId(sourceId) {
    this.sourceId = sourceId;
  }
  getHandlerId() {
    return this.sourceId;
  }
  canDrag() {
    invariant(!isCallingCanDrag, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      isCallingCanDrag = true;
      return this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      isCallingCanDrag = false;
    }
  }
  isDragging() {
    if (!this.sourceId) {
      return false;
    }
    invariant(!isCallingIsDragging, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      isCallingIsDragging = true;
      return this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      isCallingIsDragging = false;
    }
  }
  subscribeToStateChange(listener, options) {
    return this.internalMonitor.subscribeToStateChange(listener, options);
  }
  isDraggingSource(sourceId) {
    return this.internalMonitor.isDraggingSource(sourceId);
  }
  isOverTarget(targetId, options) {
    return this.internalMonitor.isOverTarget(targetId, options);
  }
  getTargetIds() {
    return this.internalMonitor.getTargetIds();
  }
  isSourcePublic() {
    return this.internalMonitor.isSourcePublic();
  }
  getSourceId() {
    return this.internalMonitor.getSourceId();
  }
  subscribeToOffsetChange(listener) {
    return this.internalMonitor.subscribeToOffsetChange(listener);
  }
  canDragSource(sourceId) {
    return this.internalMonitor.canDragSource(sourceId);
  }
  canDropOnTarget(targetId) {
    return this.internalMonitor.canDropOnTarget(targetId);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(manager) {
    this.sourceId = null;
    this.internalMonitor = manager.getMonitor();
  }
};

// ../../node_modules/react-dnd/dist/internals/DropTargetMonitorImpl.js
var isCallingCanDrop = false;
var DropTargetMonitorImpl = class {
  receiveHandlerId(targetId) {
    this.targetId = targetId;
  }
  getHandlerId() {
    return this.targetId;
  }
  subscribeToStateChange(listener, options) {
    return this.internalMonitor.subscribeToStateChange(listener, options);
  }
  canDrop() {
    if (!this.targetId) {
      return false;
    }
    invariant(!isCallingCanDrop, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      isCallingCanDrop = true;
      return this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      isCallingCanDrop = false;
    }
  }
  isOver(options) {
    if (!this.targetId) {
      return false;
    }
    return this.internalMonitor.isOverTarget(this.targetId, options);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(manager) {
    this.targetId = null;
    this.internalMonitor = manager.getMonitor();
  }
};

// ../../node_modules/react-dnd/dist/internals/registration.js
function registerTarget(type2, target, manager) {
  const registry = manager.getRegistry();
  const targetId = registry.addTarget(type2, target);
  return [
    targetId,
    () => registry.removeTarget(targetId)
  ];
}
function registerSource(type2, source, manager) {
  const registry = manager.getRegistry();
  const sourceId = registry.addSource(type2, source);
  return [
    sourceId,
    () => registry.removeSource(sourceId)
  ];
}

// ../../node_modules/@react-dnd/shallowequal/dist/index.js
function shallowEqual(objA, objB, compare, compareContext) {
  let compareResult = compare ? compare.call(compareContext, objA, objB) : void 0;
  if (compareResult !== void 0) {
    return !!compareResult;
  }
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    const valueA = objA[key];
    const valueB = objB[key];
    compareResult = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
    if (compareResult === false || compareResult === void 0 && valueA !== valueB) {
      return false;
    }
  }
  return true;
}

// ../../node_modules/react-dnd/dist/internals/isRef.js
function isRef(obj) {
  return (
    // eslint-disable-next-line no-prototype-builtins
    obj !== null && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, "current")
  );
}

// ../../node_modules/react-dnd/dist/internals/wrapConnectorHooks.js
var import_react9 = require("react");
function throwIfCompositeComponentElement(element) {
  if (typeof element.type === "string") {
    return;
  }
  const displayName = element.type.displayName || element.type.name || "the component";
  throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${displayName} into a <div>, or turn it into a drag source or a drop target itself.`);
}
function wrapHookToRecognizeElement(hook) {
  return (elementOrNode = null, options = null) => {
    if (!(0, import_react9.isValidElement)(elementOrNode)) {
      const node = elementOrNode;
      hook(node, options);
      return node;
    }
    const element = elementOrNode;
    throwIfCompositeComponentElement(element);
    const ref = options ? (node) => hook(node, options) : hook;
    return cloneWithRef(element, ref);
  };
}
function wrapConnectorHooks(hooks) {
  const wrappedHooks = {};
  Object.keys(hooks).forEach((key) => {
    const hook = hooks[key];
    if (key.endsWith("Ref")) {
      wrappedHooks[key] = hooks[key];
    } else {
      const wrappedHook = wrapHookToRecognizeElement(hook);
      wrappedHooks[key] = () => wrappedHook;
    }
  });
  return wrappedHooks;
}
function setRef(ref, node) {
  if (typeof ref === "function") {
    ref(node);
  } else {
    ref.current = node;
  }
}
function cloneWithRef(element, newRef) {
  const previousRef = element.ref;
  invariant(typeof previousRef !== "string", "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs");
  if (!previousRef) {
    return (0, import_react9.cloneElement)(element, {
      ref: newRef
    });
  } else {
    return (0, import_react9.cloneElement)(element, {
      ref: (node) => {
        setRef(previousRef, node);
        setRef(newRef, node);
      }
    });
  }
}

// ../../node_modules/react-dnd/dist/internals/SourceConnector.js
var SourceConnector = class {
  receiveHandlerId(newHandlerId) {
    if (this.handlerId === newHandlerId) {
      return;
    }
    this.handlerId = newHandlerId;
    this.reconnect();
  }
  get connectTarget() {
    return this.dragSource;
  }
  get dragSourceOptions() {
    return this.dragSourceOptionsInternal;
  }
  set dragSourceOptions(options) {
    this.dragSourceOptionsInternal = options;
  }
  get dragPreviewOptions() {
    return this.dragPreviewOptionsInternal;
  }
  set dragPreviewOptions(options) {
    this.dragPreviewOptionsInternal = options;
  }
  reconnect() {
    const didChange = this.reconnectDragSource();
    this.reconnectDragPreview(didChange);
  }
  reconnectDragSource() {
    const dragSource = this.dragSource;
    const didChange = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();
    if (didChange) {
      this.disconnectDragSource();
    }
    if (!this.handlerId) {
      return didChange;
    }
    if (!dragSource) {
      this.lastConnectedDragSource = dragSource;
      return didChange;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDragSource = dragSource;
      this.lastConnectedDragSourceOptions = this.dragSourceOptions;
      this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
    }
    return didChange;
  }
  reconnectDragPreview(forceDidChange = false) {
    const dragPreview = this.dragPreview;
    const didChange = forceDidChange || this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();
    if (didChange) {
      this.disconnectDragPreview();
    }
    if (!this.handlerId) {
      return;
    }
    if (!dragPreview) {
      this.lastConnectedDragPreview = dragPreview;
      return;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDragPreview = dragPreview;
      this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
      this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
    }
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didConnectedDragSourceChange() {
    return this.lastConnectedDragSource !== this.dragSource;
  }
  didConnectedDragPreviewChange() {
    return this.lastConnectedDragPreview !== this.dragPreview;
  }
  didDragSourceOptionsChange() {
    return !shallowEqual(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }
  didDragPreviewOptionsChange() {
    return !shallowEqual(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }
  disconnectDragSource() {
    if (this.dragSourceUnsubscribe) {
      this.dragSourceUnsubscribe();
      this.dragSourceUnsubscribe = void 0;
    }
  }
  disconnectDragPreview() {
    if (this.dragPreviewUnsubscribe) {
      this.dragPreviewUnsubscribe();
      this.dragPreviewUnsubscribe = void 0;
      this.dragPreviewNode = null;
      this.dragPreviewRef = null;
    }
  }
  get dragSource() {
    return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
  }
  get dragPreview() {
    return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
  }
  clearDragSource() {
    this.dragSourceNode = null;
    this.dragSourceRef = null;
  }
  clearDragPreview() {
    this.dragPreviewNode = null;
    this.dragPreviewRef = null;
  }
  constructor(backend) {
    this.hooks = wrapConnectorHooks({
      dragSource: (node, options) => {
        this.clearDragSource();
        this.dragSourceOptions = options || null;
        if (isRef(node)) {
          this.dragSourceRef = node;
        } else {
          this.dragSourceNode = node;
        }
        this.reconnectDragSource();
      },
      dragPreview: (node, options) => {
        this.clearDragPreview();
        this.dragPreviewOptions = options || null;
        if (isRef(node)) {
          this.dragPreviewRef = node;
        } else {
          this.dragPreviewNode = node;
        }
        this.reconnectDragPreview();
      }
    });
    this.handlerId = null;
    this.dragSourceRef = null;
    this.dragSourceOptionsInternal = null;
    this.dragPreviewRef = null;
    this.dragPreviewOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDragSource = null;
    this.lastConnectedDragSourceOptions = null;
    this.lastConnectedDragPreview = null;
    this.lastConnectedDragPreviewOptions = null;
    this.backend = backend;
  }
};

// ../../node_modules/react-dnd/dist/internals/TargetConnector.js
var TargetConnector = class {
  get connectTarget() {
    return this.dropTarget;
  }
  reconnect() {
    const didChange = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();
    if (didChange) {
      this.disconnectDropTarget();
    }
    const dropTarget = this.dropTarget;
    if (!this.handlerId) {
      return;
    }
    if (!dropTarget) {
      this.lastConnectedDropTarget = dropTarget;
      return;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDropTarget = dropTarget;
      this.lastConnectedDropTargetOptions = this.dropTargetOptions;
      this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
    }
  }
  receiveHandlerId(newHandlerId) {
    if (newHandlerId === this.handlerId) {
      return;
    }
    this.handlerId = newHandlerId;
    this.reconnect();
  }
  get dropTargetOptions() {
    return this.dropTargetOptionsInternal;
  }
  set dropTargetOptions(options) {
    this.dropTargetOptionsInternal = options;
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didDropTargetChange() {
    return this.lastConnectedDropTarget !== this.dropTarget;
  }
  didOptionsChange() {
    return !shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }
  disconnectDropTarget() {
    if (this.unsubscribeDropTarget) {
      this.unsubscribeDropTarget();
      this.unsubscribeDropTarget = void 0;
    }
  }
  get dropTarget() {
    return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
  }
  clearDropTarget() {
    this.dropTargetRef = null;
    this.dropTargetNode = null;
  }
  constructor(backend) {
    this.hooks = wrapConnectorHooks({
      dropTarget: (node, options) => {
        this.clearDropTarget();
        this.dropTargetOptions = options;
        if (isRef(node)) {
          this.dropTargetRef = node;
        } else {
          this.dropTargetNode = node;
        }
        this.reconnect();
      }
    });
    this.handlerId = null;
    this.dropTargetRef = null;
    this.dropTargetOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDropTarget = null;
    this.lastConnectedDropTargetOptions = null;
    this.backend = backend;
  }
};

// ../../node_modules/react-dnd/dist/hooks/useDragDropManager.js
var import_react10 = require("react");
function useDragDropManager() {
  const { dragDropManager } = (0, import_react10.useContext)(DndContext);
  invariant(dragDropManager != null, "Expected drag drop context");
  return dragDropManager;
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSourceConnector.js
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
  const manager = useDragDropManager();
  const connector = (0, import_react11.useMemo)(
    () => new SourceConnector(manager.getBackend()),
    [
      manager
    ]
  );
  useIsomorphicLayoutEffect(() => {
    connector.dragSourceOptions = dragSourceOptions || null;
    connector.reconnect();
    return () => connector.disconnectDragSource();
  }, [
    connector,
    dragSourceOptions
  ]);
  useIsomorphicLayoutEffect(() => {
    connector.dragPreviewOptions = dragPreviewOptions || null;
    connector.reconnect();
    return () => connector.disconnectDragPreview();
  }, [
    connector,
    dragPreviewOptions
  ]);
  return connector;
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSourceMonitor.js
var import_react12 = require("react");
function useDragSourceMonitor() {
  const manager = useDragDropManager();
  return (0, import_react12.useMemo)(
    () => new DragSourceMonitorImpl(manager),
    [
      manager
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSource.js
var import_react13 = require("react");

// ../../node_modules/react-dnd/dist/hooks/useDrag/DragSourceImpl.js
var DragSourceImpl = class {
  beginDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    let result = null;
    if (typeof spec.item === "object") {
      result = spec.item;
    } else if (typeof spec.item === "function") {
      result = spec.item(monitor);
    } else {
      result = {};
    }
    return result !== null && result !== void 0 ? result : null;
  }
  canDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (typeof spec.canDrag === "boolean") {
      return spec.canDrag;
    } else if (typeof spec.canDrag === "function") {
      return spec.canDrag(monitor);
    } else {
      return true;
    }
  }
  isDragging(globalMonitor, target) {
    const spec = this.spec;
    const monitor = this.monitor;
    const { isDragging } = spec;
    return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
  }
  endDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    const connector = this.connector;
    const { end } = spec;
    if (end) {
      end(monitor.getItem(), monitor);
    }
    connector.reconnect();
  }
  constructor(spec, monitor, connector) {
    this.spec = spec;
    this.monitor = monitor;
    this.connector = connector;
  }
};

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSource.js
function useDragSource(spec, monitor, connector) {
  const handler = (0, import_react13.useMemo)(
    () => new DragSourceImpl(spec, monitor, connector),
    [
      monitor,
      connector
    ]
  );
  (0, import_react13.useEffect)(() => {
    handler.spec = spec;
  }, [
    spec
  ]);
  return handler;
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragType.js
var import_react14 = require("react");
function useDragType(spec) {
  return (0, import_react14.useMemo)(() => {
    const result = spec.type;
    invariant(result != null, "spec.type must be defined");
    return result;
  }, [
    spec
  ]);
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useRegisteredDragSource.js
function useRegisteredDragSource(spec, monitor, connector) {
  const manager = useDragDropManager();
  const handler = useDragSource(spec, monitor, connector);
  const itemType = useDragType(spec);
  useIsomorphicLayoutEffect(function registerDragSource() {
    if (itemType != null) {
      const [handlerId, unregister] = registerSource(itemType, handler, manager);
      monitor.receiveHandlerId(handlerId);
      connector.receiveHandlerId(handlerId);
      return unregister;
    }
    return;
  }, [
    manager,
    monitor,
    connector,
    handler,
    itemType
  ]);
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDrag.js
function useDrag(specArg, deps) {
  const spec = useOptionalFactory(specArg, deps);
  invariant(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
  const monitor = useDragSourceMonitor();
  const connector = useDragSourceConnector(spec.options, spec.previewOptions);
  useRegisteredDragSource(spec, monitor, connector);
  return [
    useCollectedProps(spec.collect, monitor, connector),
    useConnectDragSource(connector),
    useConnectDragPreview(connector)
  ];
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/connectors.js
var import_react15 = require("react");
function useConnectDropTarget(connector) {
  return (0, import_react15.useMemo)(
    () => connector.hooks.dropTarget(),
    [
      connector
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useDropTargetConnector.js
var import_react16 = require("react");
function useDropTargetConnector(options) {
  const manager = useDragDropManager();
  const connector = (0, import_react16.useMemo)(
    () => new TargetConnector(manager.getBackend()),
    [
      manager
    ]
  );
  useIsomorphicLayoutEffect(() => {
    connector.dropTargetOptions = options || null;
    connector.reconnect();
    return () => connector.disconnectDropTarget();
  }, [
    options
  ]);
  return connector;
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useDropTargetMonitor.js
var import_react17 = require("react");
function useDropTargetMonitor() {
  const manager = useDragDropManager();
  return (0, import_react17.useMemo)(
    () => new DropTargetMonitorImpl(manager),
    [
      manager
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useAccept.js
var import_react18 = require("react");
function useAccept(spec) {
  const { accept } = spec;
  return (0, import_react18.useMemo)(() => {
    invariant(spec.accept != null, "accept must be defined");
    return Array.isArray(accept) ? accept : [
      accept
    ];
  }, [
    accept
  ]);
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useDropTarget.js
var import_react19 = require("react");

// ../../node_modules/react-dnd/dist/hooks/useDrop/DropTargetImpl.js
var DropTargetImpl = class {
  canDrop() {
    const spec = this.spec;
    const monitor = this.monitor;
    return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true;
  }
  hover() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (spec.hover) {
      spec.hover(monitor.getItem(), monitor);
    }
  }
  drop() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (spec.drop) {
      return spec.drop(monitor.getItem(), monitor);
    }
    return;
  }
  constructor(spec, monitor) {
    this.spec = spec;
    this.monitor = monitor;
  }
};

// ../../node_modules/react-dnd/dist/hooks/useDrop/useDropTarget.js
function useDropTarget(spec, monitor) {
  const dropTarget = (0, import_react19.useMemo)(
    () => new DropTargetImpl(spec, monitor),
    [
      monitor
    ]
  );
  (0, import_react19.useEffect)(() => {
    dropTarget.spec = spec;
  }, [
    spec
  ]);
  return dropTarget;
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useRegisteredDropTarget.js
function useRegisteredDropTarget(spec, monitor, connector) {
  const manager = useDragDropManager();
  const dropTarget = useDropTarget(spec, monitor);
  const accept = useAccept(spec);
  useIsomorphicLayoutEffect(function registerDropTarget() {
    const [handlerId, unregister] = registerTarget(accept, dropTarget, manager);
    monitor.receiveHandlerId(handlerId);
    connector.receiveHandlerId(handlerId);
    return unregister;
  }, [
    manager,
    monitor,
    dropTarget,
    connector,
    accept.map(
      (a) => a.toString()
    ).join("|")
  ]);
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useDrop.js
function useDrop(specArg, deps) {
  const spec = useOptionalFactory(specArg, deps);
  const monitor = useDropTargetMonitor();
  const connector = useDropTargetConnector(spec.options);
  useRegisteredDropTarget(spec, monitor, connector);
  return [
    useCollectedProps(spec.collect, monitor, connector),
    useConnectDropTarget(connector)
  ];
}

// src/folha-verificacao/CampoDeVerificacaoV2.tsx
var import_fi = require("react-icons/fi");
var import_lu = require("react-icons/lu");
var import_si = require("react-icons/si");
var import_teraprox_ui_kit2 = require("teraprox-ui-kit");
var import_jsx_runtime5 = require("react/jsx-runtime");
var ITEM_TYPE = "CAMPO_CARD";
var TipoIcon = ({ type: type2 }) => {
  const size = 14;
  switch (type2) {
    case "number":
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_fi.FiHash, { size });
    case "time":
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_fi.FiClock, { size });
    case "formula":
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_fi.FiCode, { size });
    case "text":
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_fi.FiAlignLeft, { size });
  }
};
var CampoDeVerificacaoV2 = ({
  campo,
  index,
  moveCard,
  getTipoNome,
  toggleTipoFilter,
  editCampoHandler,
  toggleReporter,
  isMarking,
  isReordering,
  onMarkCampo,
  onChangePosicao
}) => {
  var _a, _b, _c;
  const ref = (0, import_react20.useRef)(null);
  const campoId = campo.id || campo.__id;
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { campoId },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover() {
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop(item, monitor) {
      try {
        if (!ref.current || !item.campoId) return;
        const dragCampoId = item.campoId;
        const hoverCampoId = campoId;
        if (dragCampoId === hoverCampoId) return;
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        const height = hoverBoundingRect.bottom - hoverBoundingRect.top;
        const centerY = height / 2;
        const position = hoverClientY < centerY ? "before" : "after";
        moveCard(dragCampoId, hoverCampoId, position);
      } catch (e) {
        console.warn("[CampoDeVerificacaoV2] drop computation failed", e);
      }
    }
  });
  drag(drop(ref));
  const cardOpacity = isDragging ? 0.3 : isOver ? 0.7 : campo && campo.removed ? 0.5 : 1;
  const removedClass = campo && campo.removed ? " removed" : "";
  const dragClass = isDragging ? " dragging" : "";
  const targetClass = isOver ? " drop-target" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      ref,
      style: {
        opacity: cardOpacity,
        transform: isDragging ? "rotate(2deg) scale(1.02)" : "none",
        transition: isDragging ? "none" : "all 0.2s ease",
        boxShadow: isDragging ? "0 8px 16px rgba(0,0,0,0.2)" : isOver ? "0 4px 12px rgba(0,100,200,0.3)" : "none"
      },
      className: `campo-card${removedClass}${dragClass}${targetClass}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "campo-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "campo-pos-badge", children: campo.posicao || index + 1 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "campo-label", children: campo.label || campo._operacao || `#${campo.id || index}` }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "campo-meta", children: ((_a = campo.controle) == null ? void 0 : _a.nomeParametro) || campo.descricao })
            ] }) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "div",
            {
              style: {
                marginLeft: 8,
                textAlign: "right",
                minWidth: 140,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  campo.tipoDeCampo && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui_kit_core7.Tooltip, { content: `Filtrar por: ${getTipoNome(campo.tipoDeCampo)}`, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "div",
                    {
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: "#fff",
                        cursor: "pointer"
                      },
                      onClick: () => toggleTipoFilter(campo.tipoDeCampo),
                      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TipoIcon, { type: campo.tipoDeCampo })
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui_kit_core7.Tooltip, { content: `Regras de corre\xE7\xE3o: ${((_b = campo.regrasDeCorrecao) == null ? void 0 : _b.length) || 0}`, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                    "div",
                    {
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "2px 6px",
                        borderRadius: 10,
                        background: campo.regrasDeCorrecao && campo.regrasDeCorrecao.length ? "#eef6ff" : "transparent",
                        border: campo.regrasDeCorrecao && campo.regrasDeCorrecao.length ? "1px solid #cfe3ff" : "1px solid transparent",
                        cursor: "pointer"
                      },
                      onClick: () => editCampoHandler(campo),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                          import_si.SiGithubactions,
                          {
                            size: 14,
                            color: campo.regrasDeCorrecao && campo.regrasDeCorrecao.length ? "#0d6efd" : "#6c757d"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                          "span",
                          {
                            style: {
                              fontSize: 12,
                              color: campo.regrasDeCorrecao && campo.regrasDeCorrecao.length ? "#0d6efd" : "#6c757d"
                            },
                            children: ((_c = campo.regrasDeCorrecao) == null ? void 0 : _c.length) || 0
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    import_ui_kit_core7.Tooltip,
                    {
                      content: campo.reporter ? "Campo reportado (clique para remover)" : "Campo n\xE3o reportado (clique para reportar)",
                      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        "div",
                        {
                          style: {
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            cursor: "pointer"
                          },
                          onClick: () => toggleReporter(campo),
                          children: campo.reporter ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lu.LuMegaphone, { size: 16, color: "#0d6efd" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lu.LuMegaphoneOff, { size: 16, color: "#6c757d" })
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 8,
                      marginTop: 8,
                      alignItems: "center"
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                      import_ui_kit_core7.Button,
                      {
                        size: "sm",
                        variant: "link",
                        onClick: () => editCampoHandler(campo),
                        children: "Editar"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                  "div",
                  {
                    style: {
                      marginTop: 8,
                      display: "flex",
                      gap: 12,
                      alignItems: "center"
                    },
                    children: [
                      isMarking && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        import_ui_kit_core7.Checkbox,
                        {
                          checked: !!campo.checked,
                          onCheckedChange: (checked) => onMarkCampo(campo, Boolean(checked)),
                          style: { transform: "scale(1.25)", transformOrigin: "center" }
                        }
                      ) }),
                      isReordering && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { minWidth: 80 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        import_teraprox_ui_kit2.FormField,
                        {
                          label: "Posi\xE7\xE3o",
                          val: campo.posicao,
                          onBlur: () => {
                          },
                          onValueUpdate: (valor2) => onChangePosicao(campo, valor2)
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "div",
          {
            style: {
              marginTop: 8,
              display: "flex",
              gap: 8,
              flexWrap: "wrap"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "campo-meta", children: [
                "Unidade: ",
                campo.unidade || "-"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "campo-meta", children: [
                "Frequencia: ",
                campo._frequencia || "-"
              ] })
            ]
          }
        )
      ]
    }
  );
};

// src/ordem-correcao/OrdemDeCorrecaoCard.tsx
var import_react21 = require("react");
var import_ui_kit_core8 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime6 = require("react/jsx-runtime");
var badgeStyleForStatus = (status) => {
  const palette2 = {
    PENDENTE: { backgroundColor: "#f2994a", color: "#212529" },
    CONCLUIDO: { backgroundColor: "#27ae60", color: "#fff" },
    CANCELADA: { backgroundColor: "#dc3545", color: "#fff" },
    PENDENTE_AUTORIZACAO: { backgroundColor: "#6f42c1", color: "#fff" }
  };
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.35rem 0.75rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    ...palette2[(status || "").toUpperCase()] || {
      backgroundColor: "#6c757d",
      color: "#fff"
    }
  };
};
var OrdemDeCorrecaoCardImpl = ({
  ordem,
  onEditar,
  onApontar,
  onViewRegistro,
  onSaveTarefa,
  onSaveTarefaViaRabbit,
  onCancel
}) => {
  var _a, _b;
  const [expandedTarefaId, setExpandedTarefaId] = (0, import_react21.useState)(null);
  const [editedTarefa, setEditedTarefa] = (0, import_react21.useState)(null);
  const [savingTarefa, setSavingTarefa] = (0, import_react21.useState)(false);
  const isCancelled = (ordem == null ? void 0 : ordem.status) === "CANCELADA";
  const isConcluido = (ordem == null ? void 0 : ordem.status) === "CONCLUIDO";
  const handleExpandTarefa = (tarefa) => {
    if (expandedTarefaId === tarefa.id) {
      setExpandedTarefaId(null);
      setEditedTarefa(null);
    } else {
      setExpandedTarefaId(tarefa.id);
      setEditedTarefa(JSON.parse(JSON.stringify(tarefa)));
    }
  };
  const handleQuantityChange = (tumId, value) => {
    if (!editedTarefa) return;
    const parsedValue = value.replace(",", ".");
    const updatedTums = editedTarefa.tarefasUnidadeMaterial.map((tum) => {
      if (tum.id === tumId) {
        return { ...tum, quantidade: isNaN(parsedValue) ? value : parsedValue };
      }
      return tum;
    });
    setEditedTarefa({ ...editedTarefa, tarefasUnidadeMaterial: updatedTums });
  };
  const fillEmptyWithPlanned = (tums) => tums == null ? void 0 : tums.map((tum) => {
    var _a2;
    const currentQtd = tum.quantidade;
    if (!currentQtd || currentQtd == 0 || currentQtd === "0" || currentQtd === "") {
      const plannedValue = (_a2 = tum.unidadeMaterial) == null ? void 0 : _a2.quantidade;
      if (plannedValue !== void 0 && plannedValue !== null) {
        return { ...tum, quantidade: plannedValue };
      }
    }
    return tum;
  });
  const handleConcluirClick = async () => {
    if (!onSaveTarefa || !editedTarefa) return;
    setSavingTarefa(true);
    const updatedTums = fillEmptyWithPlanned(editedTarefa.tarefasUnidadeMaterial);
    const tarefaConcluida = {
      ...editedTarefa,
      status: "CONCLUIDO",
      tarefasUnidadeMaterial: updatedTums
    };
    try {
      await onSaveTarefa(ordem, tarefaConcluida);
      setExpandedTarefaId(null);
      setEditedTarefa(null);
    } catch (error) {
      console.error("Erro ao salvar tarefa", error);
    } finally {
      setSavingTarefa(false);
    }
  };
  const handleConcluirViaRabbitClick = async () => {
    if (!onSaveTarefaViaRabbit || !editedTarefa) return;
    setSavingTarefa(true);
    const updatedTums = fillEmptyWithPlanned(editedTarefa.tarefasUnidadeMaterial);
    const tarefaConcluida = {
      ...editedTarefa,
      status: "CONCLUIDO",
      tarefasUnidadeMaterial: updatedTums
    };
    try {
      await onSaveTarefaViaRabbit(ordem, tarefaConcluida);
      setExpandedTarefaId(null);
      setEditedTarefa(null);
    } catch (error) {
      console.error("Erro ao salvar tarefa via AMQP", error);
    } finally {
      setSavingTarefa(false);
    }
  };
  const cardStyle = {
    transition: "all 0.3s ease",
    border: "2px solid #dee2e6",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    ...isCancelled ? { opacity: 0.6, backgroundColor: "#f5f5f5", borderColor: "#e0e0e0" } : {}
  };
  const cardHoverStyle = !isCancelled ? {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    borderColor: "#007bff",
    backgroundColor: "#ffffff"
  } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_ui_kit_core8.Card,
    {
      className: "mb-4 ordem-correcao-card h-full",
      style: cardStyle,
      onMouseEnter: (e) => {
        if (!isCancelled)
          Object.assign(e.currentTarget.style, { ...cardStyle, ...cardHoverStyle });
      },
      onMouseLeave: (e) => {
        Object.assign(e.currentTarget.style, cardStyle);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui_kit_core8.CardBody, { className: "flex flex-col", style: { padding: "1.5rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col gap-3 flex-grow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "div",
              {
                style: {
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  letterSpacing: "0.5px"
                },
                children: [
                  "OC #",
                  ordem.id
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-neutral-500 mb-2", style: { fontSize: "0.9rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Registro de Campo:" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "span",
                  {
                    className: "text-info font-bold underline cursor-pointer",
                    onClick: () => onViewRegistro && onViewRegistro(ordem.registroDeCampoId),
                    title: "Ver detalhes do registro",
                    children: ordem.registroDeCampoId || "-"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: "flex items-center gap-3 mt-2 p-2",
                  style: {
                    backgroundColor: "#f8f9fa",
                    border: "2px solid #007bff",
                    borderRadius: "8px"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col flex-grow", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                        "span",
                        {
                          className: "text-neutral-500 uppercase",
                          style: { fontSize: "0.7rem", fontWeight: "600", letterSpacing: "0.5px" },
                          children: "Agrupamento"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-900 font-bold", style: { fontSize: "0.9rem" }, children: ((_a = ordem.recurso) == null ? void 0 : _a.agrupamento) || "-" })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { width: "2px", height: "35px", backgroundColor: "#dee2e6" } }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col flex-grow", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                        "span",
                        {
                          className: "text-neutral-500 uppercase",
                          style: { fontSize: "0.7rem", fontWeight: "600", letterSpacing: "0.5px" },
                          children: "Recurso"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-900 font-bold", style: { fontSize: "0.9rem" }, children: ordem.recursoNome || "-" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "additional-info", children: [
              ordem.ordemDeServicoId && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: "flex items-center gap-2 mb-1 text-neutral-500",
                  style: { fontSize: "0.85rem" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "OS:" }),
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-900", children: ordem.ordemDeServicoId })
                  ]
                }
              ),
              ordem.abertoPor && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: "flex items-center gap-2 mb-1 text-neutral-500",
                  style: { fontSize: "0.85rem" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Aberto por:" }),
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-900", children: ordem.abertoPor })
                  ]
                }
              ),
              ordem.executadoPor && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: "flex items-center gap-2 mb-1 text-neutral-500",
                  style: { fontSize: "0.85rem" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Executado por:" }),
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-900", children: ordem.executadoPor })
                  ]
                }
              ),
              ordem.dataDeAbertura && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: "flex items-center gap-2 mb-1 text-neutral-500",
                  style: { fontSize: "0.85rem" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Abertura:" }),
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-900", children: new Date(ordem.dataDeAbertura).toLocaleString() })
                  ]
                }
              ),
              ordem.dataDeEncerramento && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: "flex items-center gap-2 mb-1 text-neutral-500",
                  style: { fontSize: "0.85rem" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Encerramento:" }),
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-900", children: new Date(ordem.dataDeEncerramento).toLocaleString() })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "div",
              {
                className: "mt-3",
                style: {
                  backgroundColor: "#fffbf0",
                  border: "1px solid #ffe082",
                  borderRadius: "8px",
                  padding: "0.65rem 0.85rem",
                  maxHeight: "120px",
                  overflowY: "auto"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                    "svg",
                    {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      style: { flexShrink: 0, marginTop: "2px" },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                          "path",
                          {
                            d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z",
                            fill: "#f9a825"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "8", cy: "10", r: "1.5", fill: "#f9a825" }),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "12", cy: "10", r: "1.5", fill: "#f9a825" }),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "16", cy: "10", r: "1.5", fill: "#f9a825" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "span",
                    {
                      className: "text-neutral-900",
                      style: { fontSize: "0.85rem", lineHeight: "1.4" },
                      children: ordem.observacao || /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-neutral-500 italic", children: "Sem observa\xE7\xF5es." })
                    }
                  )
                ] })
              }
            )
          ] }),
          ((_b = ordem.tarefas) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mt-2 pt-3", style: { borderTop: "1px solid #e9ecef" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "span",
              {
                className: "text-neutral-500 uppercase font-bold",
                style: { fontSize: "0.8rem", letterSpacing: "1px" },
                children: [
                  "Tarefas (",
                  ordem.tarefas.length,
                  ")"
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex flex-wrap gap-2", children: ordem.tarefas.map((tarefa, index) => {
              var _a2, _b2;
              const isExpanded = expandedTarefaId === tarefa.id;
              const isTarefaConcluida = tarefa.status === "CONCLUIDO";
              return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                  "span",
                  {
                    onClick: () => handleExpandTarefa(tarefa),
                    style: {
                      cursor: "pointer",
                      padding: "0.5rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      opacity: expandedTarefaId && !isExpanded ? 0.6 : 1,
                      transition: "all 0.2s",
                      whiteSpace: "normal",
                      textAlign: "left",
                      maxWidth: "100%",
                      wordBreak: "break-word",
                      backgroundColor: isTarefaConcluida ? "#198754" : "#0d6efd",
                      color: "#fff"
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: tarefa.descricao || "Sem descri\xE7\xE3o" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                        "span",
                        {
                          style: {
                            backgroundColor: "rgba(255,255,255,0.3)",
                            padding: "0.1rem 0.4rem",
                            borderRadius: "10px",
                            fontSize: "0.7em"
                          },
                          children: [
                            ((_a2 = tarefa.tarefasUnidadeMaterial) == null ? void 0 : _a2.length) || 0,
                            " materiais"
                          ]
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: isExpanded ? "\u25B2" : "\u25BC" })
                    ]
                  }
                ),
                isExpanded && editedTarefa && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                  "div",
                  {
                    className: "mt-2 p-3 rounded",
                    style: { border: "1px solid #dee2e6", background: "#f8f9fa" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                        "h6",
                        {
                          className: "text-neutral-500 mb-3",
                          style: { fontSize: "0.85rem" },
                          children: "Apontamento R\xE1pido"
                        }
                      ),
                      (_b2 = editedTarefa.tarefasUnidadeMaterial) == null ? void 0 : _b2.map((tum) => {
                        var _a3, _b3, _c, _d;
                        return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                          "div",
                          {
                            className: "mb-3 pb-3 last-no-border",
                            style: { borderBottom: "1px solid #dee2e6" },
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex justify-between items-start mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
                                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                                  "div",
                                  {
                                    className: "font-bold text-neutral-900",
                                    style: { fontSize: "0.9rem" },
                                    children: (_a3 = tum.unidadeMaterial) == null ? void 0 : _a3.nomeMaterial
                                  }
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                                  "div",
                                  {
                                    className: "text-neutral-500",
                                    style: { fontSize: "0.75rem" },
                                    children: [
                                      "Recomendado: ",
                                      (_b3 = tum.unidadeMaterial) == null ? void 0 : _b3.quantidade,
                                      " ",
                                      (_c = tum.unidadeMaterial) == null ? void 0 : _c.unidadeLabel
                                    ]
                                  }
                                )
                              ] }) }),
                              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui_kit_core8.InputGroup, { size: "sm", children: [
                                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui_kit_core8.InputGroupText, { children: [
                                  "Qtd (",
                                  (_d = tum.unidadeMaterial) == null ? void 0 : _d.unidadeLabel,
                                  ")"
                                ] }),
                                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                                  "input",
                                  {
                                    type: "number",
                                    value: tum.quantidade,
                                    onChange: (e) => handleQuantityChange(tum.id, e.target.value),
                                    className: "flex-1 h-8 px-3 text-sm border border-neutral-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                  }
                                )
                              ] })
                            ]
                          },
                          tum.id
                        );
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-end mt-3 gap-2", children: [
                        onSaveTarefaViaRabbit && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                          import_ui_kit_core8.Button,
                          {
                            variant: "outline-success",
                            size: "sm",
                            onClick: handleConcluirViaRabbitClick,
                            disabled: savingTarefa,
                            title: "Publicar na fila AMQP para teste",
                            leftIcon: savingTarefa ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui_kit_core8.Spinner, { size: "sm" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u{1F407}" }),
                            children: savingTarefa ? "..." : "AMQP"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                          import_ui_kit_core8.Button,
                          {
                            variant: "success",
                            size: "sm",
                            onClick: handleConcluirClick,
                            disabled: savingTarefa,
                            leftIcon: savingTarefa ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui_kit_core8.Spinner, { size: "sm" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u2705" }),
                            children: savingTarefa ? "Salvando..." : "Concluir"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] }, tarefa.id || index);
            }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "div",
          {
            className: "mt-3 pt-3",
            style: { borderTop: "1px solid #dee2e6" },
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col md:flex-row items-center justify-between gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-full md:w-auto text-center md:text-left", children: ordem.status && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { style: badgeStyleForStatus(ordem.status), children: (ordem.status || "").toUpperCase() }) }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col md:flex-row gap-2 w-full md:w-auto", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  import_ui_kit_core8.Button,
                  {
                    variant: "outline-primary",
                    size: "sm",
                    onClick: onEditar,
                    className: "w-full md:w-auto",
                    disabled: isCancelled,
                    style: {
                      borderWidth: "2px",
                      fontWeight: "600",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px"
                    },
                    children: "Editar"
                  }
                ),
                !isCancelled && !isConcluido && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  import_ui_kit_core8.Button,
                  {
                    variant: "outline-danger",
                    size: "sm",
                    onClick: () => onCancel && onCancel(ordem),
                    className: "w-full md:w-auto",
                    style: {
                      borderWidth: "2px",
                      fontWeight: "600",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px"
                    },
                    children: "Cancelar"
                  }
                )
              ] })
            ] })
          }
        )
      ] })
    }
  );
};
var OrdemDeCorrecaoCard = (0, import_react21.memo)(
  OrdemDeCorrecaoCardImpl,
  (prevProps, nextProps) => prevProps.ordem === nextProps.ordem
);

// src/ordem-correcao/TarefaCard.tsx
var import_react22 = require("react");
var import_ui_kit_core9 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime7 = require("react/jsx-runtime");
var statusBadgeStyle = (status) => {
  const palette2 = {
    PENDENTE: { backgroundColor: "#f2994a", color: "#212529" },
    CONCLUIDO: { backgroundColor: "#27ae60", color: "#fff" }
  };
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.35rem 0.75rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    ...palette2[(status || "").toUpperCase()] || { backgroundColor: "#6c757d", color: "#fff" }
  };
};
var TarefaCard = ({
  tarefa,
  tIdx,
  totalTarefas,
  onEdit,
  onMove,
  onRemoveMaterial,
  onAddMaterial,
  onRemove,
  onUndoRemove,
  unidadeMaterial,
  onClearUnidadeMaterial,
  renderUnidadeMaterialModal
}) => {
  var _a;
  const [showUnidadeModal, setShowUnidadeModal] = (0, import_react22.useState)(false);
  const handleAddMaterialToTarefa = () => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
    const novoMaterial = {
      unidadeMaterial: {
        nomeMaterial: ((_a2 = unidadeMaterial == null ? void 0 : unidadeMaterial.material) == null ? void 0 : _a2.nome) || "",
        unidadeLabel: ((_b = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _b.nome) || ((_c = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _c.label) || "",
        quantidade: (unidadeMaterial == null ? void 0 : unidadeMaterial.quantidade) || 0,
        materialId: ((_d = unidadeMaterial == null ? void 0 : unidadeMaterial.material) == null ? void 0 : _d.id) || null,
        unidadeId: (_e = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _e.id,
        nomeUnidade: ((_f = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _f.nome) || ((_g = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _g.label) || "",
        fatorSiUnidade: ((_h = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _h.fatorSi) || 1,
        unidadeBaseSi: ((_i = unidadeMaterial == null ? void 0 : unidadeMaterial.unidade) == null ? void 0 : _i.unidadeBaseSi) || ""
      }
    };
    if (onAddMaterial) onAddMaterial(tIdx, novoMaterial);
    onClearUnidadeMaterial == null ? void 0 : onClearUnidadeMaterial();
    setShowUnidadeModal(false);
  };
  const handleCancelModal = () => {
    onClearUnidadeMaterial == null ? void 0 : onClearUnidadeMaterial();
    setShowUnidadeModal(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    import_ui_kit_core9.Card,
    {
      className: "mb-3 shadow-sm",
      style: {
        borderRadius: 12,
        border: "1px solid #e3e6eb",
        background: "#f8f9fb",
        opacity: tarefa.removed ? 0.5 : 1
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui_kit_core9.CardBody, { className: "p-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-start mb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-start flex-grow w-full mb-3 md:mb-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                "div",
                {
                  className: "mr-3 flex items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground flex-shrink-0",
                  style: { width: 32, height: 32, fontWeight: 600 },
                  children: tIdx + 1
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex-grow", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "font-semibold mb-1 break-words", children: tarefa.descricao || "A\xE7\xE3o n\xE3o informada" }),
                tarefa.acao && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "text-neutral-500 text-xs", children: tarefa.acao.nome || tarefa.acao.descricao })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-2 flex-wrap justify-end w-full md:w-auto md:pl-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                import_ui_kit_core9.Button,
                {
                  variant: "outline-secondary",
                  size: "sm",
                  disabled: tIdx === 0,
                  onClick: () => onMove(tIdx, tIdx - 1),
                  title: "Mover para cima",
                  children: "\u2191"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                import_ui_kit_core9.Button,
                {
                  variant: "outline-secondary",
                  size: "sm",
                  disabled: tIdx === totalTarefas - 1,
                  onClick: () => onMove(tIdx, tIdx + 1),
                  title: "Mover para baixo",
                  children: "\u2193"
                }
              ),
              tarefa.removed ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                import_ui_kit_core9.Button,
                {
                  variant: "outline-success",
                  size: "sm",
                  onClick: () => onUndoRemove == null ? void 0 : onUndoRemove(tIdx),
                  children: "Desfazer"
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "hidden sm:inline-block text-xs px-2 py-1 rounded bg-neutral-100 text-neutral-800", children: [
                  "Materiais: ",
                  ((_a = tarefa.tarefasUnidadeMaterial) == null ? void 0 : _a.length) || 0
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  import_ui_kit_core9.Button,
                  {
                    variant: "outline-success",
                    size: "sm",
                    onClick: () => setShowUnidadeModal(true),
                    title: "Adicionar Material",
                    className: "flex-grow md:flex-grow-0",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "hidden sm:inline", children: "+ Material" }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "inline sm:hidden", children: "+ Mat." })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  import_ui_kit_core9.Button,
                  {
                    variant: "outline-primary",
                    size: "sm",
                    onClick: () => onEdit({ ...tarefa, tIdx }),
                    className: "flex-grow md:flex-grow-0",
                    children: "Editar"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  import_ui_kit_core9.Button,
                  {
                    variant: "outline-danger",
                    size: "sm",
                    onClick: () => onRemove == null ? void 0 : onRemove(tIdx),
                    className: "flex-grow md:flex-grow-0",
                    children: "Remover"
                  }
                )
              ] })
            ] })
          ] }),
          (tarefa == null ? void 0 : tarefa.status) && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { style: statusBadgeStyle(tarefa.status), title: "Status da Tarefa", children: (tarefa.status || "").toUpperCase() }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("hr", { className: "my-3 border-neutral-200" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-col gap-3", children: (tarefa.tarefasUnidadeMaterial || []).filter((tUm) => !tUm.removed).map((tUm, tumIdx) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            UnidadeMaterialCard,
            {
              tarefaUnidadeMaterial: { ...tUm, tIdx, tumIdx },
              onRemoveClick: onRemoveMaterial
            },
            `material-${tIdx}-${tumIdx}`
          )) })
        ] }),
        renderUnidadeMaterialModal == null ? void 0 : renderUnidadeMaterialModal({
          show: showUnidadeModal,
          onClose: handleCancelModal,
          onConfirm: handleAddMaterialToTarefa,
          title: `Adicionar Material - Tarefa ${tIdx + 1}`
        })
      ]
    }
  );
};

// src/ordem-correcao/AutorizacaoCard.tsx
var import_react23 = require("react");
var import_ui_kit_core10 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime8 = require("react/jsx-runtime");
var statusTone = {
  AGUARDANDO: "warning",
  APROVADA: "success",
  REJEITADA: "danger"
};
var fmt = (val) => val != null ? Number(val).toFixed(3) : "\u2014";
var AutorizacaoCard = ({
  autorizacao,
  onAprovar,
  onRejeitar,
  renderRejeicaoModal
}) => {
  const [showRejeicaoModal, setShowRejeicaoModal] = (0, import_react23.useState)(false);
  const [loadingAprovar, setLoadingAprovar] = (0, import_react23.useState)(false);
  const [loadingRejeitar, setLoadingRejeitar] = (0, import_react23.useState)(false);
  const isAguardando = (autorizacao == null ? void 0 : autorizacao.status) === "AGUARDANDO";
  const tone = statusTone[autorizacao == null ? void 0 : autorizacao.status] || "secondary";
  const handleAprovar = async () => {
    setLoadingAprovar(true);
    try {
      await onAprovar(autorizacao.id);
    } finally {
      setLoadingAprovar(false);
    }
  };
  const handleConfirmRejeitar = async (motivo) => {
    setLoadingRejeitar(true);
    try {
      await onRejeitar(autorizacao.id, motivo);
      setShowRejeicaoModal(false);
    } finally {
      setLoadingRejeitar(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui_kit_core10.Card, { className: "shadow-sm border-0 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui_kit_core10.CardBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex justify-between items-start mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "text-neutral-500 text-xs", children: [
          "Ordem #",
          autorizacao == null ? void 0 : autorizacao.ordemDeCorrecaoId
        ] }),
        " \xB7 ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui_kit_core10.Badge, { tone, children: (autorizacao == null ? void 0 : autorizacao.status) || "\u2014" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "grid grid-cols-12 gap-2 mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "col-span-6 md:col-span-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-neutral-500 text-xs font-bold", children: "Valor Medido" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { children: fmt(autorizacao == null ? void 0 : autorizacao.valorMedido) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "col-span-6 md:col-span-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-neutral-500 text-xs font-bold", children: "Valor Corrigido" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { children: fmt(autorizacao == null ? void 0 : autorizacao.valorCorrigido) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "col-span-12 md:col-span-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-neutral-500 text-xs font-bold", children: "Faixa de Autonomia" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            fmt(autorizacao == null ? void 0 : autorizacao.valorMinimoAutonomo),
            " \u2013 ",
            fmt(autorizacao == null ? void 0 : autorizacao.valorMaximoAutonomo)
          ] })
        ] })
      ] }),
      (autorizacao == null ? void 0 : autorizacao.motivo) && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "text-neutral-500 text-xs font-bold", children: [
          "Motivo da rejei\xE7\xE3o:",
          " "
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-xs", children: autorizacao.motivo })
      ] }),
      isAguardando && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex gap-2 mt-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_ui_kit_core10.Button,
          {
            variant: "success",
            size: "sm",
            onClick: handleAprovar,
            disabled: loadingAprovar || loadingRejeitar,
            leftIcon: loadingAprovar ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui_kit_core10.Spinner, { size: "sm" }) : null,
            children: loadingAprovar ? "Aprovando..." : "\u2713 Aprovar"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_ui_kit_core10.Button,
          {
            variant: "outline-danger",
            size: "sm",
            onClick: () => setShowRejeicaoModal(true),
            disabled: loadingAprovar || loadingRejeitar,
            children: "\u2717 Rejeitar"
          }
        )
      ] })
    ] }) }),
    renderRejeicaoModal == null ? void 0 : renderRejeicaoModal({
      show: showRejeicaoModal,
      onHide: () => setShowRejeicaoModal(false),
      onConfirm: handleConfirmRejeitar,
      loading: loadingRejeitar
    })
  ] });
};

// src/ordem-correcao/BadgePendenteAutorizacao.tsx
var import_ui_kit_core11 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime9 = require("react/jsx-runtime");
var BadgePendenteAutorizacao = ({
  status,
  className
}) => {
  if (status !== "PENDENTE_AUTORIZACAO") return null;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "span",
    {
      className: (0, import_ui_kit_core11.cn)(
        "inline-flex items-center gap-1 rounded-full",
        "px-2.5 py-1 font-semibold uppercase tracking-wider",
        "text-[0.72rem] text-white",
        "bg-[#6f42c1]",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-hidden": true, children: "\u{1F512}" }),
        "Ag. Autoriza\xE7\xE3o"
      ]
    }
  );
};

// src/ordem-correcao/MaterialApontarCard.tsx
var import_ui_kit_core12 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime10 = require("react/jsx-runtime");
var MaterialApontarCard = ({
  tum,
  tarefaIdx,
  tumIdx,
  onInputChange
}) => {
  var _a;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "col-span-12 md:col-span-6 lg:col-span-4 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui_kit_core12.Card, { className: "h-full border border-neutral-200 rounded-lg bg-neutral-50/50 shadow-sm", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui_kit_core12.CardBody, { className: "p-5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2 mb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-info text-base", "aria-hidden": true, children: "\u{1F3F7}\uFE0F" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h5", { className: "m-0 text-base text-neutral-800 font-medium", children: tum.unidadeMaterial.nomeMaterial })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-col gap-1 mb-3 p-2 rounded-md bg-neutral-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-success", "aria-hidden": true, children: "\u{1F4CF}" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("small", { className: "text-neutral-500 font-bold uppercase text-[0.7rem]", children: "Unidade:" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-neutral-800 font-semibold text-sm", children: tum.unidadeMaterial.unidadeLabel })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-warning", "aria-hidden": true, children: "\u{1F4CA}" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("small", { className: "text-neutral-500 font-bold uppercase text-[0.7rem]", children: "Qtd. Planejada:" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-neutral-800 font-semibold text-sm", children: tum.unidadeMaterial.quantidade })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      import_ui_kit_core12.TextField,
      {
        label: "\u270F\uFE0F Quantidade Apontada",
        placeholder: "Digite a quantidade apontada",
        value: (_a = tum.quantidade) != null ? _a : "",
        onChange: (event) => onInputChange(tarefaIdx, tumIdx, event.target.value)
      }
    ) })
  ] }) }) });
};

// src/ordem-correcao/TarefaApontarCard.tsx
var import_ui_kit_core13 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime11 = require("react/jsx-runtime");
var TarefaApontarCard = ({
  tarefa,
  tarefaIdx,
  onStatusChange,
  onInputChange,
  getStatusStyle
}) => {
  const status = (tarefa.status || "PENDENTE").toUpperCase();
  const isConcluido = status === "CONCLUIDO";
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_ui_kit_core13.Card,
    {
      className: (0, import_ui_kit_core13.cn)(
        "border-2 border-neutral-200 rounded-xl bg-white shadow-sm",
        "transition-all duration-300",
        "hover:border-brand-primary hover:shadow-lg hover:-translate-y-px"
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui_kit_core13.CardBody, { className: "p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "inline-flex items-center bg-success text-white px-3 py-1 rounded-full font-bold text-xs tracking-wider", children: [
            "#",
            tarefa.sequencia
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("h5", { className: "m-0 text-lg font-semibold", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { "aria-hidden": true, children: "\u{1F4CB} " }),
            tarefa.descricao
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex justify-between items-center mb-3 p-3 rounded-lg bg-neutral-100 border border-neutral-200", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-lg", "aria-hidden": true, children: isConcluido ? "\u2705" : "\u23F3" }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "span",
              {
                className: "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase",
                style: getStatusStyle(tarefa.status || "PENDENTE"),
                children: status
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { className: "flex items-center gap-2 m-0 text-sm font-medium cursor-pointer select-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "input",
              {
                type: "checkbox",
                className: "h-4 w-4 rounded border-neutral-400 text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-accent",
                checked: isConcluido,
                onChange: (event) => onStatusChange(tarefaIdx, event.target.checked)
              }
            ),
            "Marcar como Conclu\xEDda"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-neutral-500 text-lg", "aria-hidden": true, children: "\u{1F4E6}" }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("h6", { className: "m-0 text-neutral-500 uppercase font-bold text-xs tracking-widest", children: [
              "Materiais (",
              tarefa.tarefasUnidadeMaterial.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "grid grid-cols-12 gap-2", children: tarefa.tarefasUnidadeMaterial.map((tum, tumIdx) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            MaterialApontarCard,
            {
              tum,
              tarefaIdx,
              tumIdx,
              onInputChange
            },
            tumIdx
          )) })
        ] })
      ] })
    }
  );
};

// src/relatorio/RelatorioModernCard.tsx
var import_react24 = require("react");
var import_ui_kit_core14 = require("@hashcodeti/ui-kit-core");
var import_fi2 = require("react-icons/fi");
var import_jsx_runtime12 = require("react/jsx-runtime");
var RelatorioModernCard = ({
  registro: registro2,
  showValidation = true,
  onCopyToClipboard,
  onToggleVisibility,
  onOpenCorrecao
}) => {
  var _a, _b, _c, _d, _e;
  const [expanded, setExpanded] = (0, import_react24.useState)(false);
  const isVisible = registro2.visible !== false;
  const validacao2 = (r) => {
    var _a2, _b2;
    if (!((_b2 = (_a2 = r.controle) == null ? void 0 : _a2.especificacao) == null ? void 0 : _b2.limitesDeControle) || r.controle.especificacao.limitesDeControle.length === 0) {
      return true;
    }
    const valorRaw = r.valor;
    const valorStr = typeof valorRaw === "number" ? String(valorRaw) : valorRaw || "";
    const valorFormatado = valorStr.replace(",", ".");
    const valor2 = parseFloat(valorFormatado);
    if (isNaN(valor2)) return false;
    const limites = r.controle.especificacao.limitesDeControle;
    const valoresLimites = limites.map((l) => parseFloat(l.valor));
    const min = Math.min(...valoresLimites);
    const max = Math.max(...valoresLimites);
    return valor2 >= min && valor2 <= max;
  };
  const isValid = registro2.controle ? validacao2(registro2) : true;
  const hasCorrecoes = registro2.correcoes && registro2.correcoes.length > 0;
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.toLocaleDateString("pt-BR")} ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
  };
  const getFaixaLabel = () => {
    var _a2, _b2, _c2;
    if (!((_b2 = (_a2 = registro2.controle) == null ? void 0 : _a2.especificacao) == null ? void 0 : _b2.limitesDeControle)) return null;
    const limites = registro2.controle.especificacao.limitesDeControle;
    const valores = limites.map((l) => parseFloat(l.valor)).sort((a, b) => a - b);
    return `${valores[0]} - ${valores[valores.length - 1]} ${((_c2 = registro2.controle) == null ? void 0 : _c2.labelUnidade) || ""}`;
  };
  const faixaLabel = getFaixaLabel();
  let statusColor = "#20c997";
  if (!isValid) statusColor = "#e74c3c";
  else if (hasCorrecoes) statusColor = "#f39c12";
  const abrirOrdemCorrecao = (correcao) => onOpenCorrecao == null ? void 0 : onOpenCorrecao(correcao);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "div",
    {
      className: "relative bg-white mb-2 shadow-sm rounded overflow-hidden border border-neutral-200",
      style: { transition: "all 0.2s", opacity: isVisible ? 1 : 0.5, filter: isVisible ? "none" : "grayscale(100%)" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: "6px", backgroundColor: statusColor } }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "p-3 pl-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex-1", style: { maxWidth: "65%" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h6", { className: "m-0 font-bold text-neutral-900 truncate", title: (_a = registro2.controle) == null ? void 0 : _a.nomeParametro, children: ((_b = registro2.controle) == null ? void 0 : _b.nomeParametro) || "Par\xE2metro sem nome" }),
                !isValid && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: { color: statusColor }, title: "N\xE3o Conforme", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiAlertCircle, { size: 14 }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-neutral-500 text-sm mb-1 truncate", children: ((_c = registro2.campoDeVerificacao) == null ? void 0 : _c.label) || "Opera\xE7\xE3o" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-3 text-neutral-500", style: { fontSize: "0.8rem" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "inline-flex items-center gap-1 whitespace-nowrap", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiClock, { size: 10 }),
                  " ",
                  formatDate(registro2.data)
                ] }),
                faixaLabel && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 bg-neutral-50 px-2 py-0 rounded border border-neutral-200 whitespace-nowrap",
                    style: { maxWidth: "100%" },
                    children: [
                      "Target:",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { className: "truncate", style: { maxWidth: "120px" }, children: faixaLabel })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "text-right flex flex-col items-end justify-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mb-1", style: { lineHeight: 1 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "font-bold", style: { fontSize: "1.5rem", color: statusColor }, children: registro2.valor }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-neutral-500 ml-1 text-sm font-bold", children: (_d = registro2.controle) == null ? void 0 : _d.labelUnidade })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex gap-1 mt-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui_kit_core14.Tooltip, { content: "Copiar", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  import_ui_kit_core14.Button,
                  {
                    variant: "link",
                    className: "text-neutral-500 p-0 px-1 h-auto",
                    onClick: () => onCopyToClipboard && onCopyToClipboard(registro2),
                    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiClipboard, { size: 14 })
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui_kit_core14.Tooltip, { content: isVisible ? "Ocultar" : "Mostrar", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  import_ui_kit_core14.Button,
                  {
                    variant: "link",
                    className: `p-0 px-1 h-auto ${isVisible ? "text-neutral-500" : "text-error"}`,
                    onClick: () => onToggleVisibility && onToggleVisibility(registro2.id),
                    children: isVisible ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiEye, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiEyeOff, { size: 14 })
                  }
                ) })
              ] })
            ] })
          ] }),
          hasCorrecoes && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mt-2 pt-2 border-t border-neutral-200", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
            "div",
            {
              className: "flex items-center justify-between p-1 rounded cursor-pointer",
              style: { fontSize: "0.75rem", color: "#856404", backgroundColor: "#fff3cd" },
              onClick: () => setExpanded(!expanded),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "font-bold flex items-center gap-2 pl-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiTool, { size: 12 }),
                  " ",
                  registro2.correcoes.length,
                  " CORRE\xC7\xC3O(\xD5ES)"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "pr-2", children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiChevronUp, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_fi2.FiChevronDown, { size: 14 }) })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui_kit_core14.Collapsible, { open: expanded, onOpenChange: setExpanded, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui_kit_core14.CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "bg-neutral-50 border-t border-neutral-200 p-3", style: { overflowX: "hidden" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h6", { className: "text-sm font-bold text-neutral-500 mb-3", children: "HIST\xD3RICO DE CORRE\xC7\xD5ES" }),
          (_e = registro2.correcoes) == null ? void 0 : _e.map((correcao, idx) => {
            var _a2;
            return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
              "div",
              {
                className: "bg-white border border-neutral-200 rounded p-2 mb-2 shadow-sm cursor-pointer",
                onClick: () => abrirOrdemCorrecao(correcao),
                style: { overflow: "hidden" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex justify-between mb-1 flex-wrap", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
                      "span",
                      {
                        className: "inline-flex items-center px-2 rounded-full bg-warning text-neutral-900 mb-1",
                        style: { fontSize: "0.65rem" },
                        children: [
                          "CORRE\xC7\xC3O #",
                          idx + 1
                        ]
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("small", { className: "text-brand-primary font-bold whitespace-nowrap", style: { fontSize: "0.7rem" }, children: "VER DETALHES \u2192" })
                  ] }),
                  (_a2 = correcao.tarefas) == null ? void 0 : _a2.map((t, i) => {
                    var _a3;
                    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "text-sm mb-1 break-words", children: [
                      "\u2022 ",
                      t.descricao || ((_a3 = t.acao) == null ? void 0 : _a3.descricao)
                    ] }, i);
                  })
                ]
              },
              idx
            );
          })
        ] }) }) })
      ]
    }
  );
};
var RelatorioModernCard_default = RelatorioModernCard;

// src/relatorio/RelatorioModernWrapper.tsx
var import_react25 = require("react");
var import_ui_kit_core15 = require("@hashcodeti/ui-kit-core");
var import_fi3 = require("react-icons/fi");
var import_jsx_runtime13 = require("react/jsx-runtime");
var HighlightedText = ({ text, highlight }) => {
  if (!highlight || !text) return text;
  const safeHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safeHighlight})`, "gi"));
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: parts.map(
    (part, i) => part.toLowerCase() === highlight.toLowerCase() ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { style: { backgroundColor: "#ffc107", fontWeight: "bold" }, children: part }, i) : part
  ) });
};
var RelatorioModernWrapper = (0, import_react25.forwardRef)(({
  relatorio,
  userName,
  onStatsUpdate,
  onToast,
  onOpenCorrecao
}, ref) => {
  const [viewMode, setViewMode] = (0, import_react25.useState)("cards");
  const [showOnlyMostRecent, setShowOnlyMostRecent] = (0, import_react25.useState)(true);
  const [registrosVisibility, setRegistrosVisibility] = (0, import_react25.useState)({});
  const [filterStatus, setFilterStatus] = (0, import_react25.useState)("all");
  const [gruposMinimizados, setGruposMinimizados] = (0, import_react25.useState)({});
  const [searchTerm, setSearchTerm] = (0, import_react25.useState)("");
  const validacao2 = (0, import_react25.useCallback)((registro2) => {
    var _a, _b, _c;
    if (!((_b = (_a = registro2.controle) == null ? void 0 : _a.especificacao) == null ? void 0 : _b.limitesDeControle) || registro2.controle.especificacao.limitesDeControle.length === 0) {
      return true;
    }
    const valorFormatado = typeof registro2.valor === "number" ? registro2.valor : ((_c = registro2.valor) == null ? void 0 : _c.replace) && registro2.valor.replace(",", ".");
    const limites = registro2.controle.especificacao.limitesDeControle;
    const menorLimite = limites.reduce((min, limite) => limite.valor < min.valor ? limite : min);
    const maiorLimite = limites.reduce((max, limite) => limite.valor > max.valor ? limite : max);
    const valor2 = Number(valorFormatado);
    return valor2 >= Number(menorLimite.valor) && valor2 <= Number(maiorLimite.valor);
  }, []);
  (0, import_react25.useImperativeHandle)(ref, () => ({ generateEmailHTML }));
  const toggleVisibility = (registroId) => {
    setRegistrosVisibility((prev) => {
      const currentValue = prev[registroId] !== false;
      return { ...prev, [registroId]: !currentValue };
    });
  };
  const toggleGrupoMinimizado = (rotulo) => {
    setGruposMinimizados((prev) => ({ ...prev, [rotulo]: !prev[rotulo] }));
  };
  const toggleTodosGrupos = (minimizar) => {
    if (!registrosProcessados || registrosProcessados.length === 0) return;
    const todosRotulos = [...new Set(registrosProcessados.map((r) => {
      var _a;
      return ((_a = r.campoDeVerificacao) == null ? void 0 : _a.label) || "Sem R\xF3tulo";
    }))];
    const newState = {};
    todosRotulos.forEach((rotulo) => {
      newState[rotulo] = minimizar;
    });
    setGruposMinimizados(newState);
  };
  const toggleAllVisibility = (visible) => {
    if (!(relatorio == null ? void 0 : relatorio.dados)) return;
    const todosRegistros = relatorio.dados.flatMap((grupo) => (grupo == null ? void 0 : grupo.registros) || []);
    const newVisibility = {};
    todosRegistros.forEach((registro2) => {
      newVisibility[registro2.id] = visible;
    });
    setRegistrosVisibility(newVisibility);
  };
  const getRegistrosProcessados = (0, import_react25.useCallback)(() => {
    if (!(relatorio == null ? void 0 : relatorio.dados)) return [];
    const todosRegistros = relatorio.dados.flatMap((grupo) => (grupo == null ? void 0 : grupo.registros) || []);
    let registrosFiltrados = showOnlyMostRecent ? Object.values(
      todosRegistros.reduce((acc, reg) => {
        var _a;
        const key = (_a = reg.campoDeVerificacao) == null ? void 0 : _a.id;
        if (!acc[key] || new Date(reg.data) > new Date(acc[key].data)) acc[key] = reg;
        return acc;
      }, {})
    ) : todosRegistros;
    if (searchTerm && searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      registrosFiltrados = registrosFiltrados.filter((reg) => {
        var _a, _b, _c, _d, _e, _f;
        const operacao = ((_b = (_a = reg.campoDeVerificacao) == null ? void 0 : _a.label) == null ? void 0 : _b.toLowerCase()) || "";
        const parametro = ((_d = (_c = reg.controle) == null ? void 0 : _c.nomeParametro) == null ? void 0 : _d.toLowerCase()) || "";
        const valor2 = String(reg.valor || "").toLowerCase();
        const unidade2 = ((_f = (_e = reg.controle) == null ? void 0 : _e.labelUnidade) == null ? void 0 : _f.toLowerCase()) || "";
        return operacao.includes(term) || parametro.includes(term) || valor2.includes(term) || unidade2.includes(term);
      });
    }
    return registrosFiltrados.map((registro2) => ({
      ...registro2,
      visible: registrosVisibility[registro2.id] !== false
    }));
  }, [relatorio.dados, showOnlyMostRecent, registrosVisibility, searchTerm]);
  const getRegistrosVisiveis = (0, import_react25.useCallback)(() => {
    return getRegistrosProcessados().filter((registro2) => registro2.visible);
  }, [getRegistrosProcessados]);
  const getRegistrosFiltradosPorStatus = (0, import_react25.useCallback)(() => {
    const todosRegistros = getRegistrosProcessados();
    if (filterStatus === "all") return todosRegistros;
    return todosRegistros.filter((registro2) => {
      switch (filterStatus) {
        case "conformes":
          return !registro2.controle || validacao2(registro2);
        case "naoConformes":
          return registro2.controle && !validacao2(registro2);
        case "comCorrecoes":
          return registro2.correcoes && registro2.correcoes.length > 0;
        default:
          return true;
      }
    });
  }, [getRegistrosProcessados, filterStatus, validacao2]);
  const getStatusEmoji = (registro2) => {
    var _a, _b;
    if (!((_b = (_a = registro2.controle) == null ? void 0 : _a.especificacao) == null ? void 0 : _b.limitesDeControle) || registro2.controle.especificacao.limitesDeControle.length === 0) return "\u26AA";
    return validacao2(registro2) ? "\u{1F7E2}" : "\u{1F534}";
  };
  const getFaixaEspecificada = (registro2) => {
    var _a, _b, _c, _d, _e;
    if (!((_b = (_a = registro2.controle) == null ? void 0 : _a.especificacao) == null ? void 0 : _b.limitesDeControle) || registro2.controle.especificacao.limitesDeControle.length === 0) return "Faixa n\xE3o especificada";
    const limites = registro2.controle.especificacao.limitesDeControle;
    const limitesOrdenados = [...limites].map((l) => ({ ...l, valor: Number(l.valor) })).sort((a, b) => a.valor - b.valor);
    const min = (_c = limitesOrdenados[0]) == null ? void 0 : _c.valor;
    const max = (_d = limitesOrdenados[limitesOrdenados.length - 1]) == null ? void 0 : _d.valor;
    const unidade2 = ((_e = registro2.controle) == null ? void 0 : _e.labelUnidade) || "";
    return `${min} - ${max} ${unidade2}`.trim();
  };
  const formatCorrecoes = (correcoes) => {
    if (!correcoes || correcoes.length === 0) return "";
    let correcaoText = "\n   *Corre\xE7\xF5es Aplicadas:*\n";
    correcoes.forEach((correcao) => {
      var _a;
      (_a = correcao.tarefas) == null ? void 0 : _a.forEach((tarefa) => {
        var _a2, _b;
        correcaoText += `      - *A\xE7\xE3o*: ${(tarefa.descricao || ((_a2 = tarefa.acao) == null ? void 0 : _a2.descricao) || "A\xC7\xC3O N\xC3O ESPECIFICADA").toUpperCase()}
`;
        (_b = tarefa.tarefasUnidadeMaterial) == null ? void 0 : _b.forEach((tum) => {
          var _a3, _b2;
          correcaoText += `         - ${tum.quantidade || 0} ${((_a3 = tum.unidadeMaterial) == null ? void 0 : _a3.unidadeLabel) || ""} - ${((_b2 = tum.unidadeMaterial) == null ? void 0 : _b2.nomeMaterial) || "Material n\xE3o especificado"}
`;
        });
        correcaoText += `         *Status*: ENCERRADO
`;
      });
    });
    return correcaoText;
  };
  const generateReportTextData = (0, import_react25.useCallback)((registrosParaTexto) => {
    let message = `*Reporte de Controle de Par\xE2metros* - ${relatorio.nomeCaderno}
`;
    message += `*Gerado por*: ${userName || "Usu\xE1rio"}
`;
    message += `*Data*: ${(/* @__PURE__ */ new Date()).toLocaleString()}

`;
    const agrupadoPorOperacao = registrosParaTexto.reduce((acc, registro2) => {
      var _a;
      const operacao = ((_a = registro2.campoDeVerificacao) == null ? void 0 : _a.label) || "Sem R\xF3tulo";
      if (!acc[operacao]) acc[operacao] = [];
      acc[operacao].push(registro2);
      return acc;
    }, {});
    Object.keys(agrupadoPorOperacao).forEach((operacao) => {
      message += `*Opera\xE7\xE3o*: ${operacao}

`;
      agrupadoPorOperacao[operacao].forEach((registro2) => {
        var _a, _b;
        const emoji = getStatusEmoji(registro2);
        const faixa = getFaixaEspecificada(registro2);
        message += `   *Par\xE2metro*: ${((_a = registro2.controle) == null ? void 0 : _a.nomeParametro) || "-"}
`;
        message += `   *Data*: ${new Date(registro2.data).toLocaleString()}
`;
        message += `   *Valor*: ${emoji} ${registro2.valor} ${((_b = registro2.controle) == null ? void 0 : _b.labelUnidade) || ""}
`;
        message += `   *Faixa Especificada*: ${faixa}
`;
        if (registro2.correcoes && registro2.correcoes.length > 0) message += formatCorrecoes(registro2.correcoes);
        message += "\n";
      });
      message += "\n";
    });
    return message.trim();
  }, [userName, relatorio.nomeCaderno]);
  const buildWhatsAppMessage = () => generateReportTextData(getRegistrosVisiveis());
  const reportTextView = (0, import_react25.useMemo)(
    () => generateReportTextData(getRegistrosFiltradosPorStatus()),
    [generateReportTextData, getRegistrosFiltradosPorStatus]
  );
  const generateEmailHTML = () => {
    const registrosFiltrados = getRegistrosProcessados().filter((registro2) => {
      if (registrosVisibility[registro2.id] === false) return false;
      if (filterStatus !== "all") {
        const isValid = validacao2(registro2);
        const hasCorrecoes = registro2.correcoes && registro2.correcoes.length > 0;
        if (filterStatus === "conformes" && !isValid) return false;
        if (filterStatus === "naoConformes" && isValid) return false;
        if (filterStatus === "comCorrecoes" && !hasCorrecoes) return false;
      }
      return true;
    });
    const agora = /* @__PURE__ */ new Date();
    const setentaEDuasHorasAtras = new Date(agora.getTime() - 72 * 60 * 60 * 1e3);
    const registrosMaisRecentes = registrosFiltrados.filter((registro2) => new Date(registro2.data) >= setentaEDuasHorasAtras);
    const statsEmail = registrosMaisRecentes.reduce((acc, registro2) => {
      const isValid = validacao2(registro2);
      const hasCorrecoes = registro2.correcoes && registro2.correcoes.length > 0;
      return {
        total: acc.total + 1,
        conformes: acc.conformes + (isValid ? 1 : 0),
        naoConformes: acc.naoConformes + (!isValid ? 1 : 0),
        comCorrecoes: acc.comCorrecoes + (hasCorrecoes ? 1 : 0)
      };
    }, { total: 0, conformes: 0, naoConformes: 0, comCorrecoes: 0 });
    let html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">\u{1F4CA} Relat\xF3rio de Controle de Par\xE2metros</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 400; opacity: 0.9;">${relatorio.nomeCaderno}</h2>
        <div style="margin-top: 10px; font-size: 14px; opacity: 0.8;">\u{1F552} \xDAltimas 72 horas - ${registrosMaisRecentes.length} registros</div>
      </div>
      <div style="background: white; border: 1px solid #6c757d; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <p style="margin: 0; color: #6c757d; font-size: 14px;">Gerado por</p>
            <p style="margin: 0; font-weight: 600; font-size: 16px; color: #2c3e50;">${userName || "Usu\xE1rio"}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">Data de Gera\xE7\xE3o</p>
            <p style="margin: 0; font-weight: 600; font-size: 16px; color: #2c3e50;">${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
          </div>
        </div>
        <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
          <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">\u{1F4C8} Resumo Estat\xEDstico (\xDAltimas 72h)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #495057;">${statsEmail.total}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Total de Registros</div></div>
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #28a745;">${statsEmail.conformes}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Conformes</div></div>
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #dc3545;">${statsEmail.naoConformes}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">N\xE3o Conformes</div></div>
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #ffc107;">${statsEmail.comCorrecoes}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Com Corre\xE7\xF5es</div></div>
          </div>
        </div>
      </div>`;
    const agrupadoPorOperacao = registrosMaisRecentes.reduce((acc, registro2) => {
      var _a;
      const operacao = ((_a = registro2.campoDeVerificacao) == null ? void 0 : _a.label) || "Sem R\xF3tulo";
      if (!acc[operacao]) acc[operacao] = [];
      acc[operacao].push(registro2);
      return acc;
    }, {});
    Object.keys(agrupadoPorOperacao).forEach((operacao) => {
      html += `<div style="background: white; border: 1px solid #6c757d; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="margin: 0 0 20px 0; color: #2c3e50; font-size: 20px; border-bottom: 1px solid #6c757d; padding-bottom: 10px;">\u{1F527} ${operacao}</h2>
        <div style="display: grid; gap: 15px;">`;
      agrupadoPorOperacao[operacao].forEach((registro2) => {
        var _a, _b;
        const emoji = getStatusEmoji(registro2);
        const isValid = emoji === "\u{1F7E2}";
        const faixa = getFaixaEspecificada(registro2);
        html += `<div style="background: ${isValid ? "#f8fff9" : "#fff5f5"}; border: 1px solid ${isValid ? "#20c997" : "#fd7e14"}; border-radius: 8px; padding: 20px;">
          <div style="display: grid; grid-template-columns: 1fr auto; gap: 15px; align-items: start;">
            <div>
              <h4 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">\u{1F4CB} ${((_a = registro2.controle) == null ? void 0 : _a.nomeParametro) || "-"}</h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                <div><span style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600;">Valor Medido</span>
                  <div style="font-size: 18px; font-weight: 700; color: ${isValid ? "#155724" : "#721c24"};">${emoji} ${registro2.valor} ${((_b = registro2.controle) == null ? void 0 : _b.labelUnidade) || ""}</div></div>
                <div><span style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600;">Faixa Especificada</span><div style="font-size: 14px; color: #495057; font-weight: 500;">${faixa}</div></div>
                <div><span style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600;">Data do Registro</span><div style="font-size: 14px; color: #495057;">${new Date(registro2.data).toLocaleString()}</div></div>
              </div>
            </div>
            <div style="text-align: center;">
              <div style="background: ${isValid ? "#d1ecf1" : "#f8d7da"}; color: ${isValid ? "#0c5460" : "#721c24"}; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; white-space: nowrap;">${isValid ? "CONFORME" : "N\xC3O CONFORME"}</div>
            </div>
          </div>`;
        if (registro2.correcoes && registro2.correcoes.length > 0) {
          html += `<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;"><h5 style="margin: 0 0 10px 0; color: #856404; font-size: 14px; font-weight: 600;">\u{1F527} Corre\xE7\xF5es Aplicadas (${registro2.correcoes.length})</h5>`;
          registro2.correcoes.forEach((correcao) => {
            var _a2;
            (_a2 = correcao.tarefas) == null ? void 0 : _a2.forEach((tarefa) => {
              var _a3, _b2;
              html += `<div style="background: rgba(255, 193, 7, 0.1); border-left: 3px solid #ffc107; padding: 10px; margin-bottom: 8px;"><div style="font-weight: 600; color: #856404; margin-bottom: 5px;">${(tarefa.descricao || ((_a3 = tarefa.acao) == null ? void 0 : _a3.descricao) || "A\xE7\xE3o n\xE3o especificada").toUpperCase()}</div>`;
              (_b2 = tarefa.tarefasUnidadeMaterial) == null ? void 0 : _b2.forEach((tum) => {
                var _a4, _b3;
                html += `<div style="font-size: 13px; color: #6c757d;">\u2022 ${tum.quantidade || 0} ${((_a4 = tum.unidadeMaterial) == null ? void 0 : _a4.unidadeLabel) || ""} - ${((_b3 = tum.unidadeMaterial) == null ? void 0 : _b3.nomeMaterial) || "Material n\xE3o especificado"}</div>`;
              });
              html += `<div style="font-size: 12px; color: #28a745; font-weight: 600; margin-top: 5px;">\u2713 STATUS: ENCERRADO</div></div>`;
            });
          });
          html += `</div>`;
        }
        html += `</div>`;
      });
      html += `</div></div>`;
    });
    html += `<div style="background: #2c3e50; color: white; padding: 20px; border-radius: 12px; text-align: center; margin-top: 30px;"><p style="margin: 0; font-size: 14px; opacity: 0.8;">Relat\xF3rio gerado automaticamente pelo Sistema de Controle de Qualidade<br>\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} - Todos os direitos reservados</p></div></div>`;
    return html;
  };
  const copyToClipboard = async (registro2 = null) => {
    var _a, _b, _c;
    try {
      let text;
      if (registro2) {
        const emoji = getStatusEmoji(registro2);
        const faixa = getFaixaEspecificada(registro2);
        text = `*Opera\xE7\xE3o*: ${((_a = registro2.campoDeVerificacao) == null ? void 0 : _a.label) || "Sem R\xF3tulo"}
`;
        text += `*Par\xE2metro*: ${((_b = registro2.controle) == null ? void 0 : _b.nomeParametro) || "-"}
`;
        text += `*Valor*: ${emoji} ${registro2.valor} ${((_c = registro2.controle) == null ? void 0 : _c.labelUnidade) || ""}
`;
        text += `*Faixa Especificada*: ${faixa}
`;
        text += `*Data*: ${new Date(registro2.data).toLocaleString()}`;
        if (registro2.correcoes && registro2.correcoes.length > 0) text += formatCorrecoes(registro2.correcoes);
      } else {
        text = buildWhatsAppMessage();
      }
      await navigator.clipboard.writeText(text);
      onToast == null ? void 0 : onToast({ message: registro2 ? "Registro copiado!" : "Relat\xF3rio copiado!", appearance: "success" });
    } catch (e) {
      onToast == null ? void 0 : onToast({ message: "Erro ao copiar.", appearance: "error" });
    }
  };
  const getEstatisticas = (0, import_react25.useCallback)(() => {
    const registrosVisiveis = getRegistrosVisiveis();
    const conformes = registrosVisiveis.filter((reg) => {
      if (!reg.controle) return true;
      return validacao2(reg);
    });
    return {
      total: registrosVisiveis.length,
      conformes: conformes.length,
      naoConformes: registrosVisiveis.length - conformes.length,
      comCorrecoes: registrosVisiveis.filter((reg) => reg.correcoes && reg.correcoes.length > 0).length
    };
  }, [getRegistrosVisiveis, validacao2]);
  const stats = (0, import_react25.useMemo)(() => getEstatisticas(), [getEstatisticas]);
  const registrosProcessados = (0, import_react25.useMemo)(() => getRegistrosFiltradosPorStatus(), [getRegistrosFiltradosPorStatus]);
  (0, import_react25.useEffect)(() => {
    if (onStatsUpdate && (relatorio == null ? void 0 : relatorio.id)) onStatsUpdate(relatorio.id, stats);
  }, [stats, onStatsUpdate, relatorio == null ? void 0 : relatorio.id]);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    "div",
    {
      className: `relatorio-${relatorio.id} bg-white border border-neutral-400 rounded-xl p-6 mb-4 shadow-sm`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex justify-between items-center mb-4 border-b pb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("h4", { className: "font-bold mb-1 text-[#2c3e50]", children: [
              "\u{1F4CA} ",
              relatorio.nomeCaderno
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "text-neutral-500 mb-0 text-sm", children: [
              "Gerado por ",
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: userName }),
              " \u2022 ",
              (/* @__PURE__ */ new Date()).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui_kit_core15.Tooltip, { side: "bottom", content: viewMode === "text" ? "Voltar para modo visual" : "Ver relat\xF3rio em modo texto", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              import_ui_kit_core15.Button,
              {
                variant: viewMode === "text" ? "primary" : "outline-secondary",
                onClick: () => setViewMode(viewMode === "text" ? "cards" : "text"),
                className: "flex items-center",
                children: [
                  viewMode === "text" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiGrid, { className: "mr-2" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiFileText, { className: "mr-2" }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "hidden md:inline", children: viewMode === "text" ? "Visual" : "Texto" })
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui_kit_core15.Tooltip, { side: "bottom", content: "Copiar relat\xF3rio completo", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.Button, { variant: "outline-primary", onClick: () => copyToClipboard(), className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiCopy, { className: "mr-2" }),
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "hidden md:inline", children: "Copiar" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.DropdownMenu, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui_kit_core15.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                import_ui_kit_core15.Button,
                {
                  variant: "outline-secondary",
                  className: "flex items-center justify-center",
                  style: { padding: "0.375rem 0.6rem", height: "38px" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiMoreVertical, { size: 20 })
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui_kit_core15.DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui_kit_core15.DropdownMenuLabel, { children: "Visualiza\xE7\xE3o" }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.DropdownMenuItem, { onSelect: () => toggleAllVisibility(true), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiEye, { className: "mr-2 text-success" }),
                  " Mostrar Todos"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.DropdownMenuItem, { onSelect: () => toggleAllVisibility(false), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiEyeOff, { className: "mr-2 text-warning" }),
                  " Ocultar Todos"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.DropdownMenuItem, { onSelect: () => toggleTodosGrupos(true), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiGrid, { className: "mr-2 text-neutral-500" }),
                  " Minimizar Grupos"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.DropdownMenuItem, { onSelect: () => toggleTodosGrupos(false), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiList, { className: "mr-2 text-info" }),
                  " Expandir Grupos"
                ] })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "bg-neutral-50 p-3 rounded mb-4 border border-neutral-200", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "md:col-span-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.InputGroup, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui_kit_core15.InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiSearch, { color: "#6c757d" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_ui_kit_core15.TextField,
              {
                placeholder: "Filtrar registros...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "md:col-span-8", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex flex-wrap gap-2 md:justify-end", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              import_ui_kit_core15.Button,
              {
                variant: filterStatus === "all" ? "primary" : "outline-primary",
                onClick: () => setFilterStatus("all"),
                className: "flex items-center flex-grow md:flex-grow-0 justify-center",
                style: { minWidth: "100px" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "font-bold mr-2 text-lg", children: stats.total }),
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("small", { children: "Total" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              import_ui_kit_core15.Button,
              {
                variant: filterStatus === "conformes" ? "success" : "outline-success",
                onClick: () => setFilterStatus(filterStatus === "conformes" ? "all" : "conformes"),
                className: "flex items-center flex-grow md:flex-grow-0 justify-center",
                style: { minWidth: "100px" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "font-bold mr-2 text-lg", children: stats.conformes }),
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("small", { children: "Conformes" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              import_ui_kit_core15.Button,
              {
                variant: filterStatus === "naoConformes" ? "danger" : "outline-danger",
                onClick: () => setFilterStatus(filterStatus === "naoConformes" ? "all" : "naoConformes"),
                className: "flex items-center flex-grow md:flex-grow-0 justify-center",
                style: { minWidth: "100px" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "font-bold mr-2 text-lg", children: stats.naoConformes }),
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("small", { children: "N\xE3o Conf." })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              import_ui_kit_core15.Button,
              {
                variant: filterStatus === "comCorrecoes" ? "warning" : "outline-warning",
                onClick: () => setFilterStatus(filterStatus === "comCorrecoes" ? "all" : "comCorrecoes"),
                className: "flex items-center flex-grow md:flex-grow-0 justify-center",
                style: { minWidth: "100px" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "font-bold mr-2 text-lg", children: stats.comCorrecoes }),
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("small", { children: "Corre\xE7\xF5es" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_ui_kit_core15.Tooltip,
              {
                content: showOnlyMostRecent ? "Exibindo apenas os \xFAltimos registros. Clique para ver todo o hist\xF3rico." : "Exibindo todo o hist\xF3rico. Clique para ver apenas os \xFAltimos.",
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                  import_ui_kit_core15.Button,
                  {
                    variant: showOnlyMostRecent ? "info" : "outline-secondary",
                    onClick: () => setShowOnlyMostRecent(!showOnlyMostRecent),
                    className: "flex items-center justify-center",
                    style: { width: "40px" },
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiClock, { size: 16 })
                  }
                )
              }
            )
          ] }) })
        ] }) }),
        filterStatus !== "all" && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.Alert, { tone: "info", className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiFilter, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { children: [
              "Mostrando apenas: ",
              /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("strong", { children: [
                filterStatus === "conformes" && "Registros Conformes",
                filterStatus === "naoConformes" && "Registros N\xE3o Conformes",
                filterStatus === "comCorrecoes" && "Registros com Corre\xE7\xF5es"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui_kit_core15.Button, { variant: "outline-secondary", size: "sm", onClick: () => setFilterStatus("all"), children: "Limpar Filtro" })
        ] }),
        registrosProcessados.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.Alert, { tone: "info", className: "text-center py-4 flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiFilter, { size: 24, className: "mb-2 mx-auto" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h6", { children: "Nenhum registro encontrado" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("small", { children: filterStatus !== "all" ? "Nenhum registro encontrado para o filtro selecionado" : "Verifique os filtros aplicados" })
        ] }) : viewMode === "text" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "bg-white p-4 rounded border border-neutral-200 shadow-sm", style: { minHeight: "300px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex justify-between items-center mb-3 pb-2 border-b border-neutral-200", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("h6", { className: "m-0 text-neutral-500 flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiFileText, { className: "mr-2" }),
              "Visualiza\xE7\xE3o Simples (Texto)"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2", children: [
              searchTerm && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.Badge, { tone: "warning", children: [
                'Busca ativa: "',
                searchTerm,
                '"'
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.Button, { variant: "outline-primary", size: "sm", onClick: () => copyToClipboard(), children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi3.FiCopy, { className: "mr-1" }),
                " Copiar Texto"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "p-3 bg-neutral-50 rounded border border-neutral-200", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("pre", { style: { whiteSpace: "pre-wrap", fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: "14px", color: "#2c3e50", margin: 0, lineHeight: "1.6" }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(HighlightedText, { text: reportTextView, highlight: searchTerm }) }) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_jsx_runtime13.Fragment, { children: (() => {
          const agrupadoPorRotulo = registrosProcessados.reduce((acc, registro2) => {
            var _a;
            const rotulo = ((_a = registro2.campoDeVerificacao) == null ? void 0 : _a.label) || "Sem R\xF3tulo";
            if (!acc[rotulo]) acc[rotulo] = [];
            acc[rotulo].push(registro2);
            return acc;
          }, {});
          return Object.keys(agrupadoPorRotulo).map((rotulo) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              "div",
              {
                className: "flex items-center justify-between gap-3 mb-3 pb-2",
                style: {
                  borderBottom: "2px solid #e9ecef",
                  backgroundColor: gruposMinimizados[rotulo] ? "#f8f9fa" : "transparent",
                  borderRadius: gruposMinimizados[rotulo] ? "8px" : "0",
                  padding: gruposMinimizados[rotulo] ? "0.5rem" : "0",
                  transition: "all 0.3s ease"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("h5", { className: "font-bold m-0 text-[#2c3e50]", children: [
                      "\u{1F527} ",
                      rotulo
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui_kit_core15.Badge, { tone: "secondary", className: "px-2 py-1", children: [
                      agrupadoPorRotulo[rotulo].length,
                      " registro(s)"
                    ] }),
                    gruposMinimizados[rotulo] && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("small", { className: "text-neutral-500 italic", children: "(Grupo minimizado)" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    import_ui_kit_core15.Button,
                    {
                      variant: "outline-secondary",
                      size: "sm",
                      onClick: () => toggleGrupoMinimizado(rotulo),
                      style: { minWidth: "40px", height: "32px" },
                      title: gruposMinimizados[rotulo] ? `Expandir grupo "${rotulo}"` : `Minimizar grupo "${rotulo}"`,
                      children: gruposMinimizados[rotulo] ? "\u2795" : "\u2796"
                    }
                  )
                ]
              }
            ),
            !gruposMinimizados[rotulo] && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: viewMode === "cards" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3" : "", children: agrupadoPorRotulo[rotulo].map((registro2, idx) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              RelatorioModernCard_default,
              {
                registro: registro2,
                onCopyToClipboard: copyToClipboard,
                onToggleVisibility: toggleVisibility,
                onOpenCorrecao
              }
            ) }, registro2.id || idx)) })
          ] }, rotulo));
        })() })
      ]
    }
  );
});
RelatorioModernWrapper.displayName = "RelatorioModernWrapper";

// src/caderno/CadernoDeVerificacaoHeader.tsx
var import_react26 = require("react");
var import_ui_kit_core16 = require("@hashcodeti/ui-kit-core");
var import_fi4 = require("react-icons/fi");
var import_jsx_runtime14 = require("react/jsx-runtime");
var CadernoDeVerificacaoHeader = (0, import_react26.memo)(({
  isSaving,
  saveCustomFolhas,
  canSave,
  getFolhaData,
  searchTerm,
  setSearchTerm,
  navigationComponent,
  onRefresh,
  isMobile = false,
  onDataChange,
  renderDateField,
  renderDeleteActions
}) => {
  const [isExpanded, setIsExpanded] = (0, import_react26.useState)(true);
  const handleSearchChange = (0, import_react26.useCallback)((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);
  const handleDateUpdate = (0, import_react26.useCallback)((date) => {
    onDataChange == null ? void 0 : onDataChange(new Date(date).toISOString());
  }, [onDataChange]);
  const handleSave = (0, import_react26.useCallback)(() => {
    saveCustomFolhas == null ? void 0 : saveCustomFolhas();
  }, [saveCustomFolhas]);
  const inputSize = isMobile ? "sm" : "lg";
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui_kit_core16.Card, { variant: "elevated", padding: "md", className: "mb-3 bg-white relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { position: "absolute", top: "10px", right: "10px", zIndex: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      import_ui_kit_core16.Button,
      {
        variant: "link",
        size: "sm",
        className: "text-neutral-500 p-0 h-auto",
        onClick: () => setIsExpanded(!isExpanded),
        title: isExpanded ? "Minimizar cabe\xE7alho" : "Expandir cabe\xE7alho",
        children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_fi4.FiChevronUp, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_fi4.FiChevronDown, { size: 24 })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui_kit_core16.Collapsible, { open: isExpanded, onOpenChange: setIsExpanded, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui_kit_core16.CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-3 items-center mb-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "order-2 lg:order-1 flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { maxWidth: "100%", flex: 1 }, children: renderDateField == null ? void 0 : renderDateField({ value: getFolhaData(), onChange: handleDateUpdate }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "order-1 lg:order-2 flex justify-center items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-full", style: { maxWidth: "400px" }, children: navigationComponent && navigationComponent() }),
          canSave && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui_kit_core16.Tooltip, { side: "bottom", content: "Altera\xE7\xF5es detectadas, deseja salvar agora?", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            import_ui_kit_core16.Button,
            {
              variant: "light",
              className: "text-warning border-0 relative rounded-full",
              onClick: handleSave,
              disabled: isSaving,
              style: { width: "40px", height: "40px", padding: 0, animation: "pulse 2s infinite" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_fi4.FiSave, { size: 20 }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "span",
                  {
                    className: "absolute -top-0 -right-0 inline-flex items-center justify-center rounded-full bg-warning text-neutral-0",
                    style: { fontSize: "8px", padding: "2px 4px" },
                    children: "!"
                  }
                )
              ]
            }
          ) }),
          onRefresh && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_ui_kit_core16.Button,
            {
              variant: "light",
              className: "text-neutral-500 border-0 rounded-full",
              onClick: onRefresh,
              title: "Atualizar dados da p\xE1gina",
              style: { width: "40px", height: "40px", padding: 0 },
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_fi4.FiRefreshCcw, { size: 20 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "order-3 flex justify-end items-center", children: renderDeleteActions == null ? void 0 : renderDeleteActions() })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "grid grid-cols-1 gap-2 items-end", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui_kit_core16.InputGroup, { size: inputSize, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui_kit_core16.InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_fi4.FiSearch, { size: isMobile ? 16 : 20 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          import_ui_kit_core16.TextField,
          {
            placeholder: isMobile ? "Buscar..." : "Buscar por par\xE2metro, valor ou usu\xE1rio...",
            value: searchTerm,
            onChange: handleSearchChange,
            size: inputSize
          }
        )
      ] }) }) })
    ] }) }) }),
    !isExpanded && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between items-center", style: { height: "40px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { transform: "scale(0.8)", transformOrigin: "left center" }, children: navigationComponent && navigationComponent() }) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-neutral-500 text-sm", style: { marginRight: "40px" }, children: "Cabe\xE7alho minimizado" })
    ] })
  ] });
});
CadernoDeVerificacaoHeader.displayName = "CadernoDeVerificacaoHeader";

// src/caderno/HistoryModal.tsx
var import_react27 = require("react");
var import_ui_kit_core17 = require("@hashcodeti/ui-kit-core");
var import_dayjs = __toESM(require("dayjs"));
var import_jsx_runtime15 = require("react/jsx-runtime");
var defaultFormatDateTime = (date) => new Date(date).toLocaleString();
var HistoryModal = ({
  show: show2,
  onClose: onClose2,
  historyData,
  isLoading,
  title,
  unit,
  frequency,
  onOpenChart,
  canShowChart,
  onRefresh,
  formatDateTime = defaultFormatDateTime,
  convertToScale,
  renderStatusLight
}) => {
  const [searchTerm, setSearchTerm] = (0, import_react27.useState)("");
  const [startDate, setStartDate] = (0, import_react27.useState)((0, import_dayjs.default)().subtract(7, "day").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = (0, import_react27.useState)((0, import_dayjs.default)().format("YYYY-MM-DD"));
  const handleRefresh = () => {
    onRefresh == null ? void 0 : onRefresh({
      startDate: (0, import_dayjs.default)(startDate).startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
      endDate: (0, import_dayjs.default)(endDate).endOf("day").format("YYYY-MM-DDTHH:mm:ss")
    });
  };
  const isWithinFrequency = (intervalo, freq) => {
    if (!intervalo || !freq || !freq.valor) return true;
    return intervalo <= Number(freq.valor);
  };
  const getPlannedFrequencyText = () => {
    if (!frequency || !frequency.valor) return "N\xE3o definida";
    if (!convertToScale) return `${frequency.valor} ${frequency.escala}`;
    const val = convertToScale(Number(frequency.valor), frequency.escala || "");
    return `${val} ${frequency.escala}`;
  };
  const getCalculatedFrequencyText = () => {
    if (!historyData || historyData.length < 2) return "Insuficiente para c\xE1lculo";
    const sorted = [...historyData].sort((a, b) => +new Date(a.data) - +new Date(b.data));
    let totalDiff = 0;
    let count = 0;
    for (let i = 1; i < sorted.length; i++) {
      const diff = (0, import_dayjs.default)(sorted[i].data).diff((0, import_dayjs.default)(sorted[i - 1].data));
      totalDiff += diff;
      count++;
    }
    const avgMs = totalDiff / count;
    if (avgMs < 6e4) return `${(avgMs / 1e3).toFixed(1)} segundos`;
    if (avgMs < 36e5) return `${(avgMs / 6e4).toFixed(1)} minutos`;
    if (avgMs < 864e5) return `${(avgMs / 36e5).toFixed(1)} horas`;
    return `${(avgMs / 864e5).toFixed(1)} dias`;
  };
  const setQuickRange = (days) => {
    const end = (0, import_dayjs.default)();
    const start = (0, import_dayjs.default)().subtract(days, "day");
    setStartDate(start.format("YYYY-MM-DD"));
    setEndDate(end.format("YYYY-MM-DD"));
    onRefresh == null ? void 0 : onRefresh({
      startDate: start.startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
      endDate: end.endOf("day").format("YYYY-MM-DDTHH:mm:ss")
    });
  };
  const filteredData = (historyData || []).filter((record) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const userName = record.nomeUsuario || (record.usuario ? record.usuario.nome : "");
    return record.id.toString().includes(term) || record.valor && record.valor.toString().toLowerCase().includes(term) || userName && userName.toLowerCase().includes(term);
  });
  const columns = (0, import_react27.useMemo)(
    () => [
      {
        id: "id",
        header: "ID",
        accessor: (row) => row.id
      },
      {
        id: "status",
        header: "Status",
        align: "center",
        cell: (row) => {
          if (!row.intervalo) return "-";
          const onTime = isWithinFrequency(row.intervalo, frequency);
          if (renderStatusLight) return renderStatusLight(onTime);
          return onTime ? "\u{1F7E2}" : "\u{1F534}";
        }
      },
      {
        id: "data",
        header: "Data",
        cell: (row) => formatDateTime(row.data)
      },
      {
        id: "valor",
        header: "Valor",
        accessor: (row) => row.valor
      },
      {
        id: "unidade",
        header: "Unidade",
        cell: () => unit || "-"
      },
      {
        id: "usuario",
        header: "Usu\xE1rio",
        cell: (row) => row.nomeUsuario || (row.usuario ? row.usuario.nome : "-")
      },
      {
        id: "intervalo",
        header: "Intervalo",
        cell: (row) => {
          if (!row.intervalo || !frequency) return "-";
          if (!convertToScale) return `${row.intervalo} ${frequency.escala}`;
          const conv = convertToScale(Number(row.intervalo), frequency.escala || "");
          return conv != null ? `${conv.toFixed(2)} ${frequency.escala}` : "-";
        }
      }
    ],
    [frequency, unit, convertToScale, renderStatusLight, formatDateTime]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui_kit_core17.Modal, { open: show2, onOpenChange: (open) => {
    if (!open) onClose2();
  }, size: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core17.ModalHeader, { children: title || "Hist\xF3rico de Registros" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui_kit_core17.ModalBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mb-3 p-3 bg-neutral-50 rounded border border-neutral-200", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: "Freq. Planejada: " }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "text-brand-primary", children: getPlannedFrequencyText() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: "Freq. M\xE9dia Real: " }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "text-success", children: getCalculatedFrequencyText() })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mb-3 flex justify-end gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core17.Button, { variant: "outline-secondary", size: "sm", onClick: () => setQuickRange(15), children: "15 Dias" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core17.Button, { variant: "outline-secondary", size: "sm", onClick: () => setQuickRange(30), children: "30 Dias" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core17.Button, { variant: "outline-secondary", size: "sm", onClick: () => setQuickRange(90), children: "90 Dias" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mb-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_ui_kit_core17.TextField,
          {
            label: "De:",
            type: "date",
            value: startDate,
            onChange: (e) => setStartDate(e.target.value)
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_ui_kit_core17.TextField,
          {
            label: "At\xE9:",
            type: "date",
            value: endDate,
            onChange: (e) => setEndDate(e.target.value)
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_ui_kit_core17.Button,
          {
            variant: "primary",
            onClick: handleRefresh,
            disabled: isLoading,
            fullWidth: true,
            loading: isLoading,
            children: "Atualizar"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_ui_kit_core17.TextField,
        {
          type: "text",
          placeholder: "Filtrar por ID, Valor ou Usu\xE1rio...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        }
      ) }),
      isLoading ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core17.Spinner, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { style: { maxHeight: "50vh", overflowY: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_ui_kit_core17.DataTable,
        {
          data: filteredData,
          columns,
          getRowId: (row) => String(row.id),
          variant: "bordered",
          size: "sm",
          stickyHeader: true,
          emptyState: { title: "Nenhum registro encontrado no hist\xF3rico." },
          ariaLabel: "Hist\xF3rico de Registros"
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui_kit_core17.ModalFooter, { className: "justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { children: canShowChart && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core17.Button, { variant: "info", onClick: onOpenChart, children: "Ver Gr\xE1fico" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui_kit_core17.Button, { variant: "secondary", onClick: onClose2, children: "Fechar" })
    ] })
  ] });
};

// src/registro/RegistroDeCampoField.tsx
var import_react28 = require("react");
var import_mathjs = require("mathjs");
var import_fa2 = require("react-icons/fa");
var import_fi5 = require("react-icons/fi");
var import_ui_kit_core18 = require("@hashcodeti/ui-kit-core");
var import_teraprox_ui_kit3 = require("teraprox-ui-kit");
var import_jsx_runtime16 = require("react/jsx-runtime");
var DEFAULT_PALETTE = {
  ok: "#d4edda",
  erro: "#f8d7da"
};
var RegistroDeCampoField = ({
  folha,
  registro,
  setValor,
  sendValor,
  setStyle,
  setErrorMsg,
  recalculateValor,
  palette = DEFAULT_PALETTE,
  formulaInfo
}) => {
  var _a;
  const controle = registro.campoDeVerificacao.controle;
  const isDirty = (0, import_react28.useRef)(false);
  (0, import_react28.useEffect)(() => {
    formatarStyleCampo(registro.valor, registro);
  }, [folha.updatedAt]);
  const onUpdateHandler = (valor2) => {
    isDirty.current = true;
    const formattedValue = typeof valor2 === "string" ? valor2.replace(",", ".") : valor2;
    formatarStyleCampo(formattedValue, registro);
    setValor(formattedValue);
  };
  const formatarStyleCampo = (valor2, registroDeCampo) => {
    const isEmptyValue = valor2 === null || valor2 === void 0 || typeof valor2 === "string" && valor2.trim() === "" || valor2 === 0;
    if (isEmptyValue) {
      setErrorMsg("");
      setStyle({});
      return;
    }
    const { validationRule: validationRule2, controleId } = registroDeCampo.campoDeVerificacao;
    if (controleId !== "default") {
      return validacao(valor2) ? setStyle({ backgroundColor: palette.ok }) : setStyle({ backgroundColor: palette.erro });
    }
    if (validationRule2) {
      return applyValidationRule(validationRule2, valor2) ? setStyle({ backgroundColor: palette.ok }) : setStyle({ backgroundColor: palette.erro });
    }
    setStyle({});
  };
  const applyValidationRule = (validationRule, valor) => {
    if (!validationRule || typeof validationRule.rule !== "string") {
      setErrorMsg("");
      return true;
    }
    const { rule, errorMessage, type } = validationRule;
    let validation = true;
    const safeValue = valor === null || valor === void 0 ? "" : String(valor);
    const express = rule.replaceAll("input", safeValue).replace("^", "**");
    if (type === "text") validation = validateTextTypeRule(express, valor);
    validation = eval(express);
    setErrorMsg(validation ? "" : errorMessage);
    return validation;
  };
  const onEnterUpdateHandler = () => {
    if (registro.campoDeVerificacao.tipoDeCampo === "formula" && isDirty.current) {
      sendValor(formatarStyleCampo);
      isDirty.current = false;
    }
  };
  const validateTextTypeRule = (rule, _valor) => {
    return eval(rule.replace("^", "**"));
  };
  const validacao = (valor2) => {
    var _a2;
    const limites = (_a2 = controle == null ? void 0 : controle.especificacao) == null ? void 0 : _a2.limitesDeControle;
    if (controle && Array.isArray(limites) && limites.length > 0) {
      return validateWithControle(valor2);
    }
    if (Array.isArray(registro.campoDeVerificacao.validationRules) && registro.campoDeVerificacao.validationRules.some((r) => !r.removed)) {
      return validateWithValidationRule(valor2);
    }
    return true;
  };
  const validateWithControle = (valor2) => {
    var _a2, _b;
    const limites = (_a2 = controle == null ? void 0 : controle.especificacao) == null ? void 0 : _a2.limitesDeControle;
    if (!Array.isArray(limites) || limites.length === 0) return true;
    const valorFormatado = typeof valor2 === "number" ? valor2 : (_b = valor2 == null ? void 0 : valor2.replace) == null ? void 0 : _b.call(valor2, ",", ".");
    const menorLimite = limites.reduce((min, l) => l.valor < min.valor ? l : min);
    const maiorLimite = limites.reduce((max, l) => l.valor > max.valor ? l : max);
    const expressaoMin = `${valorFormatado} ${menorLimite.boundRule} ${menorLimite.valor}`;
    const expressaoMax = `${valorFormatado} ${maiorLimite.boundRule} ${maiorLimite.valor}`;
    try {
      return (0, import_mathjs.evaluate)(expressaoMin) && (0, import_mathjs.evaluate)(expressaoMax);
    } catch (e) {
      return false;
    }
  };
  const validateWithValidationRule = (valor2) => {
    if (valor2 === null || valor2 === void 0 || valor2 === "") return true;
    const rules = registro.campoDeVerificacao.validationRules || [];
    for (const rule2 of rules) {
      if (rule2.removed) continue;
      const { ruleType, pattern, expression, allowedValues, message } = rule2;
      let isValid = true;
      const formattedValue = typeof valor2 === "string" ? valor2.replace(",", ".") : valor2;
      switch (ruleType) {
        case "regex":
          try {
            isValid = new RegExp(pattern).test(formattedValue);
          } catch (e) {
            isValid = false;
          }
          break;
        case "comparison":
          try {
            isValid = (0, import_mathjs.evaluate)(expression.replace(/input/g, formattedValue));
          } catch (e) {
            isValid = false;
          }
          break;
        case "equals":
          isValid = String(formattedValue) === String(expression);
          break;
        case "in":
          isValid = Array.isArray(allowedValues) && allowedValues.includes(formattedValue);
          break;
        case "contains":
          isValid = typeof formattedValue === "string" && formattedValue.includes(expression);
          break;
        default:
          isValid = true;
      }
      if (!isValid) {
        setErrorMsg(message || "Valor invalido");
        return false;
      }
    }
    setErrorMsg("");
    return true;
  };
  const isFormulaLocked = Boolean(
    registro.campoDeVerificacao.tipoDeCampo === "formula" && (formulaInfo == null ? void 0 : formulaInfo.needsUserInput) === false
  );
  const onlyFormulaToolTipShow = () => {
    if (!isFormulaLocked) return null;
    const hasId = Boolean(folha.id);
    const hint = (formulaInfo == null ? void 0 : formulaInfo.displayHint) || "";
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_ui_kit_core18.Tooltip,
      {
        content: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { children: [
          hint && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_jsx_runtime16.Fragment, { children: [
            "Valor determinado por: ",
            hint,
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("br", {})
          ] }),
          hasId ? "Clique para recalcular." : "Nao eh possivel recalcular (registro sem ID)."
        ] }),
        children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "div",
          {
            className: hasId ? "cursor-pointer" : "",
            style: {
              alignContent: "center",
              padding: "10px",
              backgroundColor: "rgba(0,0,0,0.12)",
              borderRadius: "8px",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              cursor: hasId ? "pointer" : "default"
            },
            onClick: () => hasId && recalculateValor(formatarStyleCampo),
            children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "ml-2 text-secondary", children: hasId ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_fi5.FiRefreshCcw, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_fa2.FaExclamationCircle, {}) })
          }
        )
      }
    );
  };
  if (!registro) return null;
  if (registro.campoDeVerificacao.tipoDeCampo === "time") {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_teraprox_ui_kit3.TimerDisplay,
      {
        id: (_a = registro == null ? void 0 : registro.campoDeVerificacao) == null ? void 0 : _a.id,
        tempo: Number(registro.valor) || 0,
        playable: true,
        pausable: true,
        isStopped: false
      },
      registro.id || registro.key
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_teraprox_ui_kit3.FormField,
      {
        controlId: `campo-${registro.id || registro._localId || registro.key || Math.random()}`,
        styleObj: {
          ...registro.style,
          paddingRight: registro.campoDeVerificacao.tipoDeCampo === "formula" ? "25px" : void 0
        },
        val: registro.valor || "",
        onValueUpdate: (valor2) => onUpdateHandler(valor2),
        onEnterPress: () => onEnterUpdateHandler(),
        onBlur: () => {
          if (registro.campoDeVerificacao.tipoDeCampo === "formula") onEnterUpdateHandler();
        },
        label: "Valor",
        locked: isFormulaLocked,
        actionClick: onlyFormulaToolTipShow,
        ty: registro.campoDeVerificacao.tipoDeCampo === "formula" ? "number" : registro.campoDeVerificacao.tipoDeCampo
      }
    ),
    registro.campoDeVerificacao.tipoDeCampo === "formula" && !isFormulaLocked && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui_kit_core18.Tooltip, { content: "Campo Calculado (f(x)). Pressione Enter para calcular.", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "span",
      {
        style: {
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#6c757d",
          fontSize: "12px",
          fontStyle: "italic",
          cursor: "help"
        },
        children: "fx"
      }
    ) }),
    registro.errorMessage && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { style: { color: "red" }, children: registro.errorMessage })
  ] });
};

// src/registro/RegistroDeCampoCardView.tsx
var import_react33 = require("react");
var import_fa3 = require("react-icons/fa");
var import_gr = require("react-icons/gr");
var import_fi6 = require("react-icons/fi");
var import_ui_kit_core19 = require("@hashcodeti/ui-kit-core");

// src/registro/hooks/useRegistroStyle.ts
var import_react29 = require("react");
var useRegistroStyle = ({ registro: registro2, oldestAndNewestMap }) => {
  var _a;
  return (0, import_react29.useMemo)(() => {
    var _a2, _b;
    const currentId = registro2.id || registro2._localId;
    const cfg = (_b = oldestAndNewestMap == null ? void 0 : oldestAndNewestMap.get) == null ? void 0 : _b.call(oldestAndNewestMap, (_a2 = registro2.campoDeVerificacao) == null ? void 0 : _a2.id);
    if (!cfg || (Array.isArray(cfg) ? cfg.length <= 1 : false)) return "";
    const start = cfg == null ? void 0 : cfg.start;
    const end = cfg == null ? void 0 : cfg.end;
    if (currentId == start) return "custom-row-top";
    if (currentId == end) return "custom-row-bottom";
    if (registro2.fatherId) return "custom-row";
    return "";
  }, [registro2.id, registro2._localId, registro2.fatherId, (_a = registro2.campoDeVerificacao) == null ? void 0 : _a.id, oldestAndNewestMap]);
};

// src/registro/hooks/useAnexoManager.ts
var import_react30 = require("react");
var import_uuid = require("uuid");
var useAnexoManager = ({
  registroId,
  rawAnexos,
  putAnexoApi,
  deleteAnexoApi,
  getSignedUrl,
  onToast
}) => {
  const [showAnexoModal, setShowAnexoModal] = (0, import_react30.useState)(false);
  const [locais, setLocais] = (0, import_react30.useState)([]);
  const openAnexoModal = (0, import_react30.useCallback)(() => setShowAnexoModal(true), []);
  const closeAnexoModal = (0, import_react30.useCallback)(() => setShowAnexoModal(false), []);
  const persistedAnexos = (0, import_react30.useMemo)(
    () => (rawAnexos || []).map((a, i) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      return {
        id: (_a = a.id) != null ? _a : `p-${i}`,
        nome: (_d = (_c = (_b = a.nome) != null ? _b : a.originalName) != null ? _c : a.fileName) != null ? _d : `Anexo ${i + 1}`,
        originalName: (_e = a.originalName) != null ? _e : a.nome,
        tipo: (_h = (_g = (_f = a.tipo) != null ? _f : a.contentType) != null ? _g : a.mimeType) != null ? _h : "",
        mimeType: (_i = a.mimeType) != null ? _i : a.contentType,
        tamanho: (_j = a.tamanho) != null ? _j : a.size,
        url: (_k = a.url) != null ? _k : a.signedUrl,
        signedUrl: a.signedUrl,
        key: a.key,
        createdAt: a.createdAt
      };
    }),
    [rawAnexos]
  );
  const anexoBadgeCount = (0, import_react30.useMemo)(
    () => persistedAnexos.length + locais.filter((l) => l.status === "done").length,
    [persistedAnexos.length, locais]
  );
  const onAddFiles = (0, import_react30.useCallback)(
    (files) => {
      const newLocais = files.map((file) => ({
        localId: (0, import_uuid.v4)(),
        file,
        nome: file.name,
        tipo: file.type,
        tamanho: file.size,
        progress: 0,
        status: "uploading"
      }));
      setLocais((prev) => [...prev, ...newLocais]);
      newLocais.forEach(async (item) => {
        try {
          await putAnexoApi(registroId, item.file);
          setLocais(
            (prev) => prev.map(
              (l) => l.localId === item.localId ? { ...l, status: "done", progress: 100 } : l
            )
          );
          onToast == null ? void 0 : onToast("success", "Anexo enviado com sucesso!");
        } catch (err) {
          console.error("Falha ao enviar anexo", err);
          setLocais(
            (prev) => prev.map(
              (l) => l.localId === item.localId ? { ...l, status: "error", errorMessage: "Falha no upload" } : l
            )
          );
          onToast == null ? void 0 : onToast("error", "Erro ao enviar anexo");
        }
      });
    },
    [registroId, putAnexoApi, onToast]
  );
  (0, import_react30.useEffect)(() => {
    if (locais.length === 0) return;
    setLocais(
      (prev) => prev.filter((l) => {
        if (l.status !== "done") return true;
        const arrived = persistedAnexos.some(
          (p) => (p.nome === l.nome || p.originalName === l.nome) && (p.tamanho === l.tamanho || !p.tamanho)
        );
        return !arrived;
      })
    );
  }, [persistedAnexos]);
  const onRemoveLocal = (0, import_react30.useCallback)((localId2) => {
    setLocais((prev) => prev.filter((l) => l.localId !== localId2));
  }, []);
  const onRemovePersistido = (0, import_react30.useCallback)(
    async (id) => {
      const target = persistedAnexos.find((a) => {
        var _a;
        return String((_a = a.id) != null ? _a : "") === String(id);
      });
      const key = target == null ? void 0 : target.key;
      if (!key) return;
      try {
        await deleteAnexoApi(registroId, key);
        onToast == null ? void 0 : onToast("success", "Anexo removido com sucesso!");
      } catch (err) {
        console.error("Erro ao remover anexo", err);
        onToast == null ? void 0 : onToast("error", "Erro ao remover anexo");
      }
    },
    [persistedAnexos, registroId, deleteAnexoApi, onToast]
  );
  const getImageReadUrl = (0, import_react30.useCallback)(
    async (anexo) => {
      if (anexo == null ? void 0 : anexo.url) return anexo.url;
      if (anexo == null ? void 0 : anexo.signedUrl) return anexo.signedUrl;
      if (!(anexo == null ? void 0 : anexo.key) || !getSignedUrl) return "";
      try {
        return await getSignedUrl(anexo.key) || "";
      } catch (err) {
        console.error("Falha ao obter URL assinada", err);
        return "";
      }
    },
    [getSignedUrl]
  );
  const onDownloadAnexo = (0, import_react30.useCallback)(
    async (anexo) => {
      const url = anexo.url || anexo.signedUrl || await getImageReadUrl(anexo);
      if (url) window.open(url, "_blank");
    },
    [getImageReadUrl]
  );
  return {
    showAnexoModal,
    openAnexoModal,
    closeAnexoModal,
    persistedAnexos,
    locais,
    anexoBadgeCount,
    onAddFiles,
    onRemoveLocal,
    onRemovePersistido,
    onDownloadAnexo,
    getImageReadUrl
  };
};

// src/registro/hooks/useJustificativaModal.ts
var import_react31 = require("react");
var useJustificativaModal = ({
  registro: registro2,
  onSaveJustificativas
}) => {
  const [showJustificativaModal, setShow] = (0, import_react31.useState)(false);
  const openJustificativaModal = (0, import_react31.useCallback)(() => setShow(true), []);
  const closeJustificativaModal = (0, import_react31.useCallback)(() => setShow(false), []);
  const justificativasValidas = (0, import_react31.useMemo)(
    () => ((registro2 == null ? void 0 : registro2.justificativas) || []).filter((j) => !j.removed),
    [registro2 == null ? void 0 : registro2.justificativas]
  );
  const saveJustificativas = (0, import_react31.useCallback)(
    (justificativas) => {
      onSaveJustificativas(justificativas);
    },
    [onSaveJustificativas]
  );
  return {
    showJustificativaModal,
    openJustificativaModal,
    closeJustificativaModal,
    justificativasValidas,
    validCount: justificativasValidas.length,
    saveJustificativas
  };
};

// src/registro/hooks/useHistory.ts
var import_react32 = require("react");
var import_dayjs2 = __toESM(require("dayjs"));
var useHistory = ({ campoDeVerificacaoId, fetchHistoryApi }) => {
  const [showHistory, setShowHistory] = (0, import_react32.useState)(false);
  const [historyData, setHistoryData] = (0, import_react32.useState)([]);
  const [isLoadingHistory, setIsLoadingHistory] = (0, import_react32.useState)(false);
  const openHistory = (0, import_react32.useCallback)(() => setShowHistory(true), []);
  const closeHistory = (0, import_react32.useCallback)(() => setShowHistory(false), []);
  const fetchHistory = (0, import_react32.useCallback)(
    async (filters = {}) => {
      var _a, _b;
      if (!campoDeVerificacaoId) return;
      setIsLoadingHistory(true);
      setShowHistory(true);
      try {
        const range = {
          endDate: filters.endDate || (0, import_dayjs2.default)().format("YYYY-MM-DDTHH:mm:ss"),
          startDate: filters.startDate || (0, import_dayjs2.default)().subtract(7, "day").format("YYYY-MM-DDTHH:mm:ss"),
          limit: (_a = filters.limit) != null ? _a : 100,
          order: (_b = filters.order) != null ? _b : "ASC"
        };
        const response = await fetchHistoryApi(campoDeVerificacaoId, range);
        setHistoryData(response || []);
      } catch (err) {
        console.error("Erro ao buscar hist\xF3rico:", err);
      } finally {
        setIsLoadingHistory(false);
      }
    },
    [campoDeVerificacaoId, fetchHistoryApi]
  );
  return {
    showHistory,
    openHistory,
    closeHistory,
    historyData,
    isLoadingHistory,
    fetchHistory
  };
};

// src/registro/RegistroDeCampoCardView.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var DefaultStatusLight = ({ active }) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  "span",
  {
    "aria-label": active ? "em dia" : "em atraso",
    className: "inline-block h-2.5 w-2.5 rounded-full",
    style: { backgroundColor: active ? "#22c55e" : "#ef4444" }
  }
);
var getTipoIcon = (tipoDeCampo) => {
  switch (tipoDeCampo) {
    case "number":
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fi6.FiHash, { size: 14 });
    case "time":
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fi6.FiClock, { size: 14 });
    case "formula":
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fi6.FiHash, { size: 14 });
    case "text":
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fi6.FiAlignLeft, { size: 14 });
  }
};
var tipoToneMap = {
  formula: "info",
  number: "primary",
  time: "warning"
};
var RegistroDeCampoCardView = (0, import_react33.forwardRef)(
  (props, ref) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    const {
      registro: registro2,
      paginaAtual = 1,
      oldestAndNewestMap,
      relatedRegistros = [],
      folha: folha2,
      showRegistroData = true,
      setValor: setValor2,
      setStyle: setStyle2,
      setErrorMsg: setErrorMsg2,
      sendValor: sendValor2,
      recalculateValor: recalculateValor2,
      onSaveJustificativas,
      onCheck,
      onAddChild,
      onDelete,
      onAbrirCorrecao,
      putAnexoApi,
      deleteAnexoApi,
      getSignedUrl,
      fetchHistoryApi,
      loadChart,
      onToast,
      renderJustificativaModal,
      renderStatusLight,
      formatDateTime = (d) => new Date(d).toLocaleString(),
      convertMilisecondsToScale
    } = props;
    const controle2 = (_a = registro2.campoDeVerificacao) == null ? void 0 : _a.controle;
    const emDia = !(registro2 == null ? void 0 : registro2.isLate);
    const correctionCount = registro2.quantidadeOrdensDeCorrecao || ((_b = registro2.ordensDeCorrecaoIds) == null ? void 0 : _b.length) || ((_c = registro2.ordensDeCorrecao) == null ? void 0 : _c.length) || 0;
    const styleClass = useRegistroStyle({ registro: registro2, oldestAndNewestMap });
    const justifica = useJustificativaModal({ registro: registro2, onSaveJustificativas });
    const history = useHistory({
      campoDeVerificacaoId: (_d = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _d.id,
      fetchHistoryApi
    });
    const anexo = useAnexoManager({
      registroId: registro2.id,
      rawAnexos: registro2.anexos,
      putAnexoApi,
      deleteAnexoApi,
      getSignedUrl,
      onToast
    });
    const [showRelated, setShowRelated] = (0, import_react33.useState)(false);
    const StatusLightCmp = ({ active }) => renderStatusLight ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_jsx_runtime17.Fragment, { children: renderStatusLight(active) }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DefaultStatusLight, { active });
    const especificacaoLimites = (0, import_react33.useMemo)(() => {
      var _a2;
      if (!controle2 || controle2 === "default") return null;
      const list = (_a2 = controle2 == null ? void 0 : controle2.especificacao) == null ? void 0 : _a2.limitesDeControle;
      if (!list || !list.length) return null;
      return [...list].sort((a, b) => a.valor - b.valor);
    }, [controle2]);
    const frequenciaLabel = (0, import_react33.useMemo)(() => {
      var _a2;
      if (!controle2 || controle2 === "default") return "-";
      const conv = convertMilisecondsToScale ? convertMilisecondsToScale(controle2.valor, controle2.escala) : null;
      return conv != null ? `${conv} ${controle2.escala}` : (_a2 = controle2.escala) != null ? _a2 : "\u2014";
    }, [controle2, convertMilisecondsToScale]);
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
      history.showHistory && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        HistoryModal,
        {
          show: history.showHistory,
          onClose: history.closeHistory,
          historyData: history.historyData,
          isLoading: history.isLoadingHistory,
          title: `Hist\xF3rico - ${((_e = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _e.label) || ""}`,
          unit: (_g = (_f = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _f.controle) == null ? void 0 : _g.labelUnidade,
          frequency: (_h = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _h.controle,
          canShowChart: ((_i = registro2.campoDeVerificacao) == null ? void 0 : _i.tipoDeCampo) !== "text",
          onOpenChart: () => {
            history.closeHistory();
            loadChart == null ? void 0 : loadChart(registro2.campoDeVerificacao, controle2, history.historyData);
          },
          onRefresh: (range) => history.fetchHistory(range),
          renderStatusLight: (active) => renderStatusLight ? renderStatusLight(active) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DefaultStatusLight, { active }),
          convertToScale: convertMilisecondsToScale
        }
      ),
      renderJustificativaModal == null ? void 0 : renderJustificativaModal({
        show: justifica.showJustificativaModal,
        onClose: justifica.closeJustificativaModal,
        registro: registro2,
        onSaveJustificativas: justifica.saveJustificativas
      }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        "div",
        {
          ref,
          id: `registro-${registro2.id}`,
          className: `registro-card mb-3 rounded-xl bg-white shadow-sm transition-colors ${styleClass}`,
          style: {
            border: registro2.changed ? "2px solid #faad14" : registro2.fromDinamico ? "2px solid #7c3aed" : "1px solid #dee2e6",
            boxShadow: registro2.fromDinamico ? "0 2px 8px rgba(124, 58, 237, 0.18)" : "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: registro2.changed ? "#fffbe6" : void 0
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mb-3 flex items-start justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mb-1 flex items-center gap-2", children: [
                  registro2.id && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui_kit_core19.Badge, { tone: "neutral", size: "sm", children: [
                    "ID: ",
                    registro2.id
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center gap-1", children: [
                    getTipoIcon((_j = registro2.campoDeVerificacao) == null ? void 0 : _j.tipoDeCampo),
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Badge, { tone: tipoToneMap[(_k = registro2.campoDeVerificacao) == null ? void 0 : _k.tipoDeCampo] || "neutral", size: "sm", children: (_l = registro2.campoDeVerificacao) == null ? void 0 : _l.tipoDeCampo })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("h6", { className: "mb-1 font-semibold text-slate-800", children: (_m = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _m.label }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "m-0 flex-1 text-[13px] text-slate-500", children: ((_p = (_o = (_n = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _n.controle) == null ? void 0 : _o.parametro) == null ? void 0 : _p.nome) || ((_r = (_q = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _q.controle) == null ? void 0 : _r.nomeParametro) || ((_s = registro2.campoDeVerificacao) == null ? void 0 : _s.descricao) }),
                  ((_u = (_t = registro2 == null ? void 0 : registro2.campoDeVerificacao) == null ? void 0 : _t.controle) == null ? void 0 : _u.labelUnidade) && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Badge, { tone: "neutral", size: "sm", children: registro2.campoDeVerificacao.controle.labelUnidade })
                ] })
              ] }),
              onDelete && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                "input",
                {
                  type: "checkbox",
                  disabled: !registro2.id,
                  checked: !!registro2.checked,
                  onChange: (e) => onCheck == null ? void 0 : onCheck(e.target.checked),
                  className: "h-5 w-5 cursor-pointer"
                }
              )
            ] }),
            showRegistroData && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mb-3 flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex flex-col", children: [
                !registro2.id && ((_v = registro2.lastRegister) == null ? void 0 : _v.data) && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { className: "text-[11px] text-slate-500", children: "\xDAltimo registro" }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("small", { className: "flex items-center gap-1 text-[13px] text-slate-700", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fi6.FiClock, { size: 12, className: "text-slate-500" }),
                  formatDateTime(
                    !registro2.id && ((_w = registro2.lastRegister) == null ? void 0 : _w.data) ? registro2.lastRegister.data : registro2.data
                  )
                ] })
              ] }),
              registro2.nomeUsuario && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui_kit_core19.Badge, { tone: "neutral", size: "sm", children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa3.FaUser, { size: 10 }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ml-1", children: registro2.nomeUsuario })
              ] }),
              registro2.fromDinamico && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                "span",
                {
                  className: "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold tracking-wide text-white",
                  style: { background: "#7c3aed" },
                  title: "Registro lan\xE7ado pelo Caderno Din\xE2mico (n\xE3o vinculado a esta folha)",
                  children: "\u26A1 DIN\xC2MICO"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mb-4 grid min-h-[60px] grid-cols-[2fr_1fr] gap-3 rounded-md bg-slate-50 p-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { className: "mb-1 block text-[11px] text-slate-500", children: "Especifica\xE7\xE3o" }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "text-xs", children: especificacaoLimites ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "flex flex-wrap gap-1", children: especificacaoLimites.map((limite, i) => {
                  var _a2;
                  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui_kit_core19.Badge, { tone: "neutral", size: "sm", children: [
                    limite.boundRule,
                    " ",
                    (_a2 = Number(limite.valor)) == null ? void 0 : _a2.toFixed(2)
                  ] }, i);
                }) }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "text-xs text-slate-500", children: "-" }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { className: "mb-1 block text-[11px] text-slate-500", children: "Frequ\xEAncia" }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "text-xs", children: controle2 && controle2 !== "default" ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center gap-1", children: [
                  paginaAtual > 1 && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Tooltip, { content: emDia ? "em dia" : "em atraso", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(StatusLightCmp, { active: emDia }) }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "text-xs", children: frequenciaLabel })
                ] }) }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "text-xs text-slate-500", children: "-" }) })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                RegistroDeCampoField,
                {
                  folha: folha2,
                  registro: registro2,
                  setValor: setValor2,
                  sendValor: sendValor2,
                  setStyle: setStyle2,
                  setErrorMsg: setErrorMsg2,
                  recalculateValor: recalculateValor2
                }
              ),
              registro2.errorMessage && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { className: "mt-1 block text-red-600", children: registro2.errorMessage })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center justify-between border-t border-slate-200 pt-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex flex-wrap items-center gap-3", children: [
                relatedRegistros.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                  import_ui_kit_core19.Button,
                  {
                    variant: "link",
                    size: "sm",
                    onClick: () => setShowRelated(!showRelated),
                    className: "flex items-center gap-1 p-0 text-xs text-slate-500",
                    children: [
                      showRelated ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa3.FaChevronUp, {}) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa3.FaChevronDown, {}),
                      relatedRegistros.length,
                      " anterior",
                      relatedRegistros.length > 1 ? "es" : ""
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Tooltip, { content: "Abrir correcao", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                  "span",
                  {
                    onClick: registro2.id ? () => onAbrirCorrecao == null ? void 0 : onAbrirCorrecao(registro2) : void 0,
                    className: "inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium",
                    style: {
                      cursor: registro2.id ? "pointer" : "default",
                      color: registro2.id ? "#495057" : "#adb5bd"
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa3.FaTools, { size: 14, color: registro2.id ? "#fd7e14" : "#adb5bd" }),
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: correctionCount }),
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "hidden sm:inline", children: [
                        " ",
                        "corre",
                        correctionCount === 1 ? "cao aberta" : "coes abertas"
                      ] })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Tooltip, { content: "Hist\xF3rico", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "span",
                  {
                    onClick: () => history.fetchHistory(),
                    className: "cursor-pointer text-slate-500",
                    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_gr.GrLineChart, { size: 18 })
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Tooltip, { content: "Adicionar Filho", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "span",
                  {
                    onClick: registro2.id ? () => onAddChild == null ? void 0 : onAddChild(registro2) : void 0,
                    style: {
                      cursor: registro2.id ? "pointer" : "default",
                      color: registro2.id ? "#0d6efd" : "#adb5bd"
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa3.FaPlus, { size: 18 })
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Tooltip, { content: "Justificativa", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "span",
                  {
                    onClick: registro2.id ? justifica.openJustificativaModal : void 0,
                    style: {
                      cursor: registro2.id ? "pointer" : "default",
                      color: registro2.id ? "#0dcaf0" : "#adb5bd"
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.IconWithBadge, { icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_gr.GrEdit, { size: 18 }), content: justifica.validCount })
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Tooltip, { content: "Anexos", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "border-0 bg-transparent p-0",
                    style: {
                      color: registro2.id ? "#0d6efd" : "#adb5bd",
                      cursor: registro2.id ? "pointer" : "not-allowed"
                    },
                    disabled: !registro2.id,
                    onClick: anexo.openAnexoModal,
                    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.IconWithBadge, { icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa3.FaPaperclip, { size: 18 }), content: anexo.anexoBadgeCount })
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                  import_ui_kit_core19.Modal,
                  {
                    open: anexo.showAnexoModal,
                    onOpenChange: (o) => o ? anexo.openAnexoModal() : anexo.closeAnexoModal(),
                    size: "lg",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.ModalHeader, { children: "Anexos do registro" }),
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.ModalBody, { children: anexo.showAnexoModal && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                        import_ui_kit_core19.AnexoManager,
                        {
                          persistidos: anexo.persistedAnexos,
                          locais: anexo.locais,
                          onAddFiles: anexo.onAddFiles,
                          onRemoveLocal: anexo.onRemoveLocal,
                          onRemovePersistido: anexo.onRemovePersistido,
                          onDownload: anexo.onDownloadAnexo,
                          getImageReadUrl: anexo.getImageReadUrl,
                          readonly: !registro2.id,
                          maxFiles: 10
                        }
                      ) })
                    ]
                  }
                )
              ] })
            ] }),
            showRelated && relatedRegistros.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mt-3 border-t border-slate-200 pt-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("h6", { className: "mb-3 text-[13px] text-slate-500", children: "Hist\xF3rico de registros (nesta folha)" }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "flex flex-col gap-2", children: relatedRegistros.map((relReg, idx) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                "div",
                {
                  className: "flex items-center justify-between rounded-md border border-slate-200 bg-white p-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui_kit_core19.Badge, { tone: "neutral", size: "sm", children: [
                        "ID: ",
                        relReg.id
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "text-xs font-medium", children: relReg.valor || "(vazio)" }),
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { className: "text-[11px] text-slate-400", children: formatDateTime(relReg.data) }),
                      relReg.nomeUsuario && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("small", { className: "flex items-center gap-1 text-[11px] text-slate-400", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_fa3.FaUser, { size: 10 }),
                        relReg.nomeUsuario.split(" ")[0]
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex gap-2", children: [
                      relReg.errorMessage && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Badge, { tone: "danger", size: "sm", children: "Erro" }),
                      relReg.isLate && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui_kit_core19.Badge, { tone: "warning", size: "sm", children: "Atrasado" })
                    ] })
                  ]
                },
                relReg._localId || relReg.id || idx
              )) })
            ] })
          ] })
        }
      )
    ] });
  }
);
RegistroDeCampoCardView.displayName = "RegistroDeCampoCardView";

// src/formula/ReferenciaDinamicaPicker.tsx
var import_react34 = require("react");
var import_ci = require("react-icons/ci");
var import_teraprox_ui_kit4 = require("teraprox-ui-kit");
var import_jsx_runtime18 = require("react/jsx-runtime");
var ReferenciaDinamicaPicker = ({
  loadCadernos,
  loadCamposByCaderno,
  setCampo
}) => {
  const [campos, setCampos] = (0, import_react34.useState)([]);
  const [selectedCheckbox, setSelectedCheckbox] = (0, import_react34.useState)(null);
  const handleCheckboxChange = (campoId) => {
    if (selectedCheckbox === campoId) {
      setSelectedCheckbox(null);
      setCampo(null);
    } else {
      setSelectedCheckbox(campoId);
      const selected = campos.find((c) => c.id === campoId) || null;
      setCampo(selected);
    }
  };
  const loadCadernoHandler = async (caderno) => {
    const lista = await loadCamposByCaderno(caderno);
    setCampos(lista);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h3", { children: "Selecao de controle" }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      import_teraprox_ui_kit4.AutoComplete,
      {
        title: "Escolha o caderno",
        displayKey: "nome",
        onSelectedClick: loadCadernoHandler,
        loadCondition: true,
        loadFunc: loadCadernos
      }
    ),
    campos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h3", { children: "Campos:" }),
    campos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      "div",
      {
        style: {
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "0.5rem",
          backgroundColor: "#f8f9fa"
        },
        children: campos.map((campo, index) => {
          const isSelected = selectedCheckbox === campo.id;
          const isDimmed = selectedCheckbox !== null && !isSelected;
          return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
            "div",
            {
              onClick: () => handleCheckboxChange(campo.id),
              style: {
                marginBottom: "0.5rem",
                border: isSelected ? "2px solid #007bff" : "1px solid #dee2e6",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                cursor: "pointer",
                backgroundColor: "#ffffff",
                padding: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                  "input",
                  {
                    type: "radio",
                    checked: isSelected,
                    onChange: (e) => {
                      e.stopPropagation();
                      handleCheckboxChange(campo.id);
                    },
                    style: { cursor: "pointer" }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
                  "div",
                  {
                    style: {
                      flex: 1,
                      opacity: isDimmed ? 0.4 : 1,
                      transition: "opacity 0.2s ease",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "#212529",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.4
                    },
                    title: `${campo.label} ${campo.descricao || ""}`,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { style: { color: "#007bff" }, children: campo.label }),
                      campo.descricao && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { style: { color: "#6c757d", fontWeight: 400 }, children: [
                        " ",
                        "\u2022 ",
                        campo.descricao
                      ] })
                    ]
                  }
                ),
                isSelected && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                  "div",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      handleCheckboxChange(campo.id);
                    },
                    style: {
                      cursor: "pointer",
                      color: "#dc3545",
                      fontSize: "1.5rem",
                      display: "flex",
                      alignItems: "center"
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ci.CiBookmarkRemove, {})
                  }
                )
              ]
            },
            campo.id || index
          );
        })
      }
    )
  ] });
};

// src/formula/FormulaBuilderOffcanvas.tsx
var import_ui_kit_core20 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime19 = require("react/jsx-runtime");
var FormulaBuilderOffcanvas = ({
  show: show2,
  showFunc,
  children,
  title = "Formula Builder"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui_kit_core20.Sheet, { open: show2, onOpenChange: showFunc, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui_kit_core20.SheetContent, { side: "right", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui_kit_core20.SheetHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui_kit_core20.SheetTitle, { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui_kit_core20.SheetClose, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui_kit_core20.SheetBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h2", { className: "mb-3 text-lg font-semibold", children: title }),
      children
    ] })
  ] }) });
};

// src/folha/SheetOrdenationCard.tsx
var import_react35 = require("react");
var import_fa6 = require("react-icons/fa6");
var import_ui_kit_core21 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime20 = require("react/jsx-runtime");
var SheetOrdenationCard = ({
  sheet,
  moveInfo,
  onNumeroDaPaginaChange,
  onUndoMove,
  onRemove,
  renderRemoveButton,
  removeButtonId = "removerFolhaButton"
}) => {
  const [editedValue, setEditedValue] = (0, import_react35.useState)(sheet.numeroDaPagina);
  const [errorMessage2, setErrorMessage] = (0, import_react35.useState)("");
  (0, import_react35.useEffect)(() => {
    setEditedValue(sheet.numeroDaPagina);
  }, [sheet.numeroDaPagina]);
  const handleKeyDown = (0, import_react35.useCallback)(
    (e) => {
      if (e.key === "Enter") {
        const error = onNumeroDaPaginaChange(sheet.id, editedValue);
        setErrorMessage(error || "");
      }
    },
    [editedValue, onNumeroDaPaginaChange, sheet.id]
  );
  const trashButton = /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { id: removeButtonId, className: "absolute top-2 right-2 cursor-pointer", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa6.FaTrashCan, { onClick: () => onRemove(sheet), className: "text-danger" }) });
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui_kit_core21.Card, { className: "h-full relative p-2", children: [
    renderRemoveButton ? renderRemoveButton(trashButton) : trashButton,
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui_kit_core21.CardBody, { className: "flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "font-semibold mb-1", children: [
        "Folha ID: ",
        sheet.id
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("strong", { children: "Data:" }),
        " ",
        new Date(sheet.data).toLocaleDateString(),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("strong", { children: "Numero da Pagina:" }),
        " ",
        sheet.numeroDaPagina
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "mt-auto pt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("label", { htmlFor: `input-${sheet.id}`, className: "block text-sm mb-1", children: "Alterar Numero da Pagina" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "input",
          {
            id: `input-${sheet.id}`,
            type: "text",
            value: editedValue,
            onChange: (e) => setEditedValue(e.target.value),
            onKeyDown: handleKeyDown,
            className: "w-full px-2 py-1 border rounded"
          }
        )
      ] }),
      errorMessage2 && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "mt-2 p-2 border rounded bg-light text-danger", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("small", { children: errorMessage2 }) }),
      moveInfo && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "mt-2 p-2 border rounded bg-light flex justify-between items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("small", { className: "text-muted", children: [
          "Movida de ",
          moveInfo.from,
          " para ",
          moveInfo.to
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui_kit_core21.Button, { variant: "link", size: "sm", onClick: () => onUndoMove(sheet.id), children: "Desfazer" })
      ] })
    ] })
  ] });
};

// src/folha/CampoDeVerificacaoSelectableCards.tsx
var import_react36 = require("react");
var import_ui_kit_core22 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime21 = require("react/jsx-runtime");
var CampoDeVerificacaoSelectableCards = ({
  camposDeVerificacao,
  onSelectionChange = () => {
  },
  filterSlot,
  filterToggle,
  showBulkActions = true
}) => {
  const itemsRef = (0, import_react36.useRef)([]);
  const [selectedItems, setSelectedItems] = (0, import_react36.useState)([]);
  const handleSelection = (item) => {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(item);
      const newSelected = isSelected ? prev.filter((i) => i !== item) : [...prev, item];
      onSelectionChange(newSelected);
      return newSelected;
    });
  };
  const handleSelectAllFiltered = () => {
    const newSelected = Array.from(/* @__PURE__ */ new Set([...selectedItems, ...camposDeVerificacao]));
    setSelectedItems(newSelected);
    onSelectionChange(newSelected);
  };
  const handleUnselectAll = () => {
    setSelectedItems([]);
    onSelectionChange([]);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
    filterToggle && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "mb-3", children: filterToggle }),
    filterSlot,
    showBulkActions && camposDeVerificacao.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "mb-3 mt-3 flex flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui_kit_core22.Button, { variant: "secondary", className: "w-full", onClick: handleSelectAllFiltered, children: "Selecionar todos" }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui_kit_core22.Button, { variant: "secondary", className: "w-full", onClick: handleUnselectAll, children: "Desfazer selecao" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "selectable-cards-container", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "selectable-cards-grid flex flex-col gap-2", children: camposDeVerificacao.filter((c) => c.controleRefId).map((campo, idx) => {
      var _a, _b;
      const isSelected = selectedItems.includes(campo);
      return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        "div",
        {
          ref: (el) => itemsRef.current[idx] = el,
          className: `selectable-card cursor-pointer p-3 border rounded ${isSelected ? "selected border-primary bg-primary-50" : "border-gray-200"}`,
          onClick: () => handleSelection(campo),
          children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("strong", { children: [
            campo.label,
            " ",
            ((_b = campo.controle) == null ? void 0 : _b.nomeParametro) || campo.descricao
          ] })
        },
        (_a = campo.id) != null ? _a : idx
      );
    }) }) })
  ] });
};

// src/analise/ChartWithStats.tsx
var import_ui_kit_core23 = require("@hashcodeti/ui-kit-core");
var import_teraprox_ui_kit5 = require("teraprox-ui-kit");

// src/analise/ChartStats.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var ChartStats = ({
  media,
  minimo,
  maximo,
  cpk,
  atendimentoFrequencia,
  frequenciaMedia
}) => /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex flex-wrap gap-4 justify-center text-sm", children: [
  /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "Minimo:" }),
    " ",
    minimo
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "Maximo:" }),
    " ",
    maximo
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "Media:" }),
    " ",
    media
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "Cpk:" }),
    " ",
    cpk
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "Frequencia Media:" }),
    " ",
    frequenciaMedia || ""
  ] }),
  atendimentoFrequencia !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "Atendimento Frequencia:" }),
    " ",
    atendimentoFrequencia
  ] })
] });

// src/analise/ChartWithStats.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var ChartWithStats = ({
  data,
  lines,
  xAxisKey,
  stats,
  hideZero,
  hideYAxis,
  hideZeroHandler,
  unit,
  enableHideZeroButton = true,
  yAxisRange
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { children: [
    enableHideZeroButton && hideZeroHandler && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui_kit_core23.Button, { className: "mb-3", onClick: () => hideZeroHandler(!hideZero), children: hideZero ? "Mostrar Zeros" : "Ocultar Zeros" }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      import_teraprox_ui_kit5.GenericREchart,
      {
        YAxisRange: yAxisRange,
        data,
        lines,
        xAxisKey,
        showGrid: true,
        showLegend: true,
        showTooltip: true,
        width: "100%",
        height: 400,
        hideYAxis,
        unit
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ChartStats, { ...stats }) })
  ] });
};

// src/fluxo/FluxoNode.tsx
var import_react37 = require("@xyflow/react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var TIPO_CONFIG = {
  inicio_fim: {
    label: "In\xEDcio/Fim",
    cor: "#4A90D9",
    textColor: "#fff",
    borderRadius: "50%",
    style: { borderRadius: "50px", background: "#4A90D9", color: "#fff" }
  },
  decisao: {
    label: "Decis\xE3o",
    cor: "#F5A623",
    textColor: "#333",
    style: {
      background: "#F5A623",
      color: "#333",
      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      width: 120,
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  processo: {
    label: "Processo",
    cor: "#E8E8E8",
    textColor: "#333",
    style: { background: "#E8E8E8", color: "#333", borderRadius: "4px" }
  },
  subprocesso: {
    label: "Subprocesso",
    cor: "#C8C8C8",
    textColor: "#333",
    style: {
      background: "#C8C8C8",
      color: "#333",
      border: "3px double #888",
      borderRadius: "4px"
    }
  },
  operacao_manual: {
    label: "Op. Manual",
    cor: "#b8e0b8",
    textColor: "#333",
    style: { background: "#b8e0b8", color: "#333", borderRadius: "0 0 4px 4px" }
  },
  conector: {
    label: "Conector",
    cor: "#fff",
    textColor: "#333",
    style: { background: "#fff", color: "#333", borderRadius: "50%", width: 60, height: 60 }
  },
  documento: {
    label: "Documento",
    cor: "#ADD8E6",
    textColor: "#333",
    style: { background: "#ADD8E6", color: "#333", borderRadius: "4px 4px 0 0" }
  }
};
var FluxoNode = ({ data, selected }) => {
  var _a, _b;
  const tipoKey = (_a = data == null ? void 0 : data.tipo) != null ? _a : "processo";
  const config = (_b = TIPO_CONFIG[tipoKey]) != null ? _b : TIPO_CONFIG.processo;
  const baseStyle = {
    padding: "10px 14px",
    border: selected ? "2px solid #0d6efd" : "1px solid #aaa",
    minWidth: 120,
    textAlign: "center",
    fontSize: "0.82rem",
    cursor: "grab",
    ...config.style
  };
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react37.Handle, { type: "target", position: import_react37.Position.Top }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: baseStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { style: { fontWeight: 600, marginBottom: 2 }, children: (data == null ? void 0 : data.label) || tipoKey }),
      (data == null ? void 0 : data.operacao) && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { style: { fontSize: "0.75rem", opacity: 0.8 }, children: data.operacao.descricao })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react37.Handle, { type: "source", position: import_react37.Position.Bottom })
  ] });
};

// src/fluxo/FluxoEdge.tsx
var import_react38 = require("@xyflow/react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var FluxoEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data = {},
  markerEnd,
  style = {}
}) => {
  const [edgePath, labelX, labelY] = (0, import_react38.getBezierPath)({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react38.BaseEdge, { id, path: edgePath, markerEnd, style }),
    (data == null ? void 0 : data.label) && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react38.EdgeLabelRenderer, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          background: "#fff",
          border: "1px solid #adb5bd",
          borderRadius: 4,
          padding: "1px 6px",
          fontSize: "0.7rem",
          fontWeight: 600,
          color: "#495057",
          pointerEvents: "all"
        },
        className: "nodrag nopan",
        children: data.label
      }
    ) })
  ] });
};

// src/fluxo/FluxoLegend.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var FluxoLegend = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
  "div",
  {
    className,
    style: {
      padding: "8px 12px",
      background: "#fff",
      borderTop: "1px solid #dee2e6",
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      fontSize: "0.75rem"
    },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: { color: "#6c757d", fontWeight: 600, width: "100%" }, children: "LEGENDA:" }),
      Object.entries(TIPO_CONFIG).map(([tipo, config]) => {
        var _a, _b;
        return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
          "span",
          {
            style: { display: "inline-flex", alignItems: "center", gap: "4px" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                "span",
                {
                  style: {
                    width: 16,
                    height: 16,
                    background: config.cor,
                    border: "1px solid #999",
                    display: "inline-block",
                    borderRadius: (_b = (_a = config.style) == null ? void 0 : _a.borderRadius) != null ? _b : "2px"
                  }
                }
              ),
              config.label
            ]
          },
          tipo
        );
      })
    ]
  }
);

// src/fluxo/FluxoToolbar.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var TIPOS = Object.keys(TIPO_CONFIG);
var FluxoToolbar = ({ className }) => {
  const onDragStart = (event, tipo) => {
    event.dataTransfer.setData("application/reactflow-tipo", tipo);
    event.dataTransfer.effectAllowed = "move";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "div",
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px 8px",
        background: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
        minWidth: "110px",
        overflowY: "auto"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "div",
          {
            style: { fontSize: "0.75rem", color: "#6c757d", marginBottom: "4px", fontWeight: 600 },
            children: "FORMAS"
          }
        ),
        TIPOS.map((tipo) => {
          const config = TIPO_CONFIG[tipo];
          return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "div",
            {
              draggable: true,
              onDragStart: (e) => onDragStart(e, tipo),
              title: `Arrastar: ${config.label}`,
              style: {
                padding: "6px 8px",
                background: config.cor,
                color: config.textColor,
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "grab",
                fontSize: "0.75rem",
                textAlign: "center",
                userSelect: "none"
              },
              children: config.label
            },
            tipo
          );
        })
      ]
    }
  );
};

// src/plano/PlanoBadgeSelector.tsx
var import_react39 = require("react");
var import_ui_kit_core24 = require("@hashcodeti/ui-kit-core");
var import_fi7 = require("react-icons/fi");
var import_jsx_runtime28 = require("react/jsx-runtime");
var PlanoBadgeSelector = ({
  selectedPlanoId,
  setSelectedPlanoId,
  planoOptions = [],
  disabled = false,
  className
}) => {
  var _a, _b;
  const [isOpen, setIsOpen] = (0, import_react39.useState)(false);
  const [searchTerm, setSearchTerm] = (0, import_react39.useState)("");
  const containerRef = (0, import_react39.useRef)(null);
  const inputRef = (0, import_react39.useRef)(null);
  const filteredOptions = searchTerm ? planoOptions.filter(
    (opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  ) : planoOptions;
  const selectedOption = planoOptions.find(
    (o) => String(o.value) === String(selectedPlanoId)
  );
  (0, import_react39.useEffect)(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  (0, import_react39.useEffect)(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);
  const handleSelectPlano = (value) => {
    setSelectedPlanoId(value);
    setSearchTerm("");
    setIsOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: (0, import_ui_kit_core24.cn)("relative w-full", className), ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
      "button",
      {
        type: "button",
        className: (0, import_ui_kit_core24.cn)(
          "w-full flex items-center justify-between gap-2",
          "px-3 py-2 rounded-md border border-neutral-300 bg-white",
          "text-left text-sm hover:border-neutral-400 transition-colors",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          isOpen && "border-primary-500 ring-2 ring-primary-100"
        ),
        onClick: () => !disabled && setIsOpen(!isOpen),
        disabled,
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "truncate text-neutral-800", children: selectedOption ? selectedOption.label : "Selecione um plano" }),
            /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              ((_a = selectedOption == null ? void 0 : selectedOption.totalRegistrosForaGlobal) != null ? _a : 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
                import_ui_kit_core24.Badge,
                {
                  tone: "danger",
                  title: `${selectedOption == null ? void 0 : selectedOption.totalRegistrosForaGlobal} registros fora de especifica\xE7\xE3o`,
                  children: [
                    selectedOption == null ? void 0 : selectedOption.totalRegistrosForaGlobal,
                    " Fora"
                  ]
                }
              ),
              ((_b = selectedOption == null ? void 0 : selectedOption.itensAlertaEstatistica) != null ? _b : 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
                import_ui_kit_core24.Badge,
                {
                  tone: "warning",
                  title: `${selectedOption == null ? void 0 : selectedOption.itensAlertaEstatistica} controles com alertas`,
                  children: [
                    selectedOption == null ? void 0 : selectedOption.itensAlertaEstatistica,
                    " Alertas"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            import_fi7.FiChevronDown,
            {
              className: (0, import_ui_kit_core24.cn)(
                "flex-shrink-0 transition-transform text-neutral-500",
                isOpen && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
      "div",
      {
        className: (0, import_ui_kit_core24.cn)(
          "absolute z-50 mt-1 w-full rounded-md border border-neutral-200",
          "bg-white shadow-lg overflow-hidden"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "relative p-2 border-b border-neutral-200", children: [
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
              "input",
              {
                ref: inputRef,
                type: "text",
                placeholder: "Digite para filtrar...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: (0, import_ui_kit_core24.cn)(
                  "w-full px-3 py-1.5 pr-8 rounded border border-neutral-200",
                  "text-sm focus:outline-none focus:border-primary-500"
                ),
                "aria-label": "Buscar plano"
              }
            ),
            searchTerm && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
              "button",
              {
                type: "button",
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700",
                onClick: () => setSearchTerm(""),
                "aria-label": "Limpar busca",
                children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_fi7.FiX, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "max-h-72 overflow-y-auto", children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "text-center py-4 text-sm text-neutral-500", children: searchTerm ? "Nenhum plano encontrado" : "Nenhum plano dispon\xEDvel" }) : filteredOptions.map((option) => {
            var _a2, _b2;
            const selected = String(option.value) === String(selectedPlanoId);
            return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => handleSelectPlano(option.value),
                className: (0, import_ui_kit_core24.cn)(
                  "w-full flex items-center justify-between gap-2 px-3 py-2",
                  "text-left text-sm hover:bg-neutral-100 transition-colors",
                  selected && "bg-primary-50 text-primary-900 font-medium"
                ),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "truncate flex-1", children: option.label }),
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                    ((_a2 = option.totalRegistrosForaGlobal) != null ? _a2 : 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                      import_ui_kit_core24.Badge,
                      {
                        tone: "danger",
                        title: `${option.totalRegistrosForaGlobal} registros fora`,
                        children: option.totalRegistrosForaGlobal
                      }
                    ),
                    ((_b2 = option.itensAlertaEstatistica) != null ? _b2 : 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                      import_ui_kit_core24.Badge,
                      {
                        tone: "warning",
                        title: `${option.itensAlertaEstatistica} alertas`,
                        children: option.itensAlertaEstatistica
                      }
                    )
                  ] })
                ]
              },
              option.value
            );
          }) })
        ]
      }
    )
  ] });
};

// src/plano/PlanoDashboardCard.tsx
var import_ui_kit_core26 = require("@hashcodeti/ui-kit-core");

// src/controle/EstatisticasFrequenciaDashboard.tsx
var import_ui_kit_core25 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime29 = require("react/jsx-runtime");
var fmtNum = (v, dec = 2) => Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : "-";
var formattedTime = (ms) => {
  if (!ms || !Number.isFinite(Number(ms))) return "-";
  const totalSeconds = Math.floor(Number(ms) / 1e3);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  return `${hours}h ${minutes}m`;
};
var EstatisticasFrequenciaDashboard = ({ titulo, estatisticas, className }) => {
  var _a, _b, _c, _d, _e, _f;
  const totalControles = (_a = estatisticas == null ? void 0 : estatisticas.totalControles) != null ? _a : 0;
  const realizado = (_b = estatisticas == null ? void 0 : estatisticas.realizado) != null ? _b : 0;
  const planejado = (_c = estatisticas == null ? void 0 : estatisticas.planejado) != null ? _c : 0;
  const frequenciaPlanejada = (_d = estatisticas == null ? void 0 : estatisticas.frequenciaPlanejada) != null ? _d : 0;
  const frequenciaRealizada = (_e = estatisticas == null ? void 0 : estatisticas.frequenciaRealizada) != null ? _e : 0;
  const frequenciaPct = estatisticas == null ? void 0 : estatisticas.frequenciaPct;
  const realizadoPctRaw = ((_f = estatisticas == null ? void 0 : estatisticas.realizadoPct) != null ? _f : 0) * 100;
  const realizadoPct = Number.isFinite(realizadoPctRaw) ? realizadoPctRaw.toFixed(2) : "0.00";
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "text-xs text-neutral-500", children: titulo || "Frequ\xEAncia" }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_ui_kit_core25.Progress, { value: Number(realizadoPct), max: 100, className: "flex-1" }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "min-w-[50px] text-right text-sm", children: [
        realizadoPct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "text-xs text-neutral-500", children: [
      totalControles > 0 ? `Controles: ${totalControles} \u2022 ` : "",
      "Realizado: ",
      fmtNum(realizado, 0),
      " \u2022 Planejado: ",
      fmtNum(planejado, 0)
    ] }),
    (frequenciaPlanejada > 0 || frequenciaRealizada > 0 || frequenciaPct !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "text-xs text-neutral-500", children: [
      totalControles > 0 ? `Controles: ${totalControles} \u2022 ` : "",
      frequenciaPlanejada > 0 && `Frequ\xEAncia 1 vez a cada: ${formattedTime(frequenciaPlanejada)} \u2022 `,
      frequenciaRealizada > 0 && `Realizada 1 a cada: ${formattedTime(frequenciaRealizada)} `,
      frequenciaPct !== void 0 && `\u2022Proximidade da frequ\xEAncia: ${fmtNum(frequenciaPct, 1)}%`
    ] })
  ] });
};

// src/plano/PlanoDashboardCard.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var fmtNum2 = (v, dec = 2) => Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : "-";
var cpkBadgeTone = (cpk) => {
  const n = Number(cpk);
  if (!Number.isFinite(n)) return "secondary";
  if (n >= 1.33) return "success";
  if (n >= 1) return "warning";
  return "danger";
};
var PlanoDashboardCard = ({
  selectedPlanoId,
  setSelectedPlanoId,
  planoOptions,
  estatisticasPlano,
  estatisticasFrequencia,
  className
}) => {
  var _a, _b, _c, _d;
  const totalForaGlobal = (_a = estatisticasPlano == null ? void 0 : estatisticasPlano.totalRegistrosForaGlobal) != null ? _a : 0;
  const itensAlerta = (_b = estatisticasPlano == null ? void 0 : estatisticasPlano.itensAlertaEstatistica) != null ? _b : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_ui_kit_core26.Card, { className, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_ui_kit_core26.CardBody, { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "grid grid-cols-12 gap-3 items-end", children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "col-span-12 md:col-span-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("label", { className: "block text-xs font-bold text-neutral-500 mb-1", children: "Plano de Controle" }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
        PlanoBadgeSelector,
        {
          selectedPlanoId,
          setSelectedPlanoId,
          planoOptions
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "col-span-12 md:col-span-8", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "grid grid-cols-12 gap-3 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "col-span-6 md:col-span-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "text-xs text-neutral-500", children: "Cpk (m\xE9dio do plano)" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("h5", { className: "m-0 mb-1", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_ui_kit_core26.Badge, { tone: cpkBadgeTone(estatisticasPlano == null ? void 0 : estatisticasPlano.cpkMedio), children: fmtNum2(estatisticasPlano == null ? void 0 : estatisticasPlano.cpkMedio, 3) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "text-xs text-neutral-500", children: [
          "Controles: ",
          (_c = estatisticasPlano == null ? void 0 : estatisticasPlano.totalControles) != null ? _c : 0
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "col-span-6 md:col-span-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "text-xs text-neutral-500", children: "Desvios & Alertas" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("h5", { className: "m-0 mb-1 flex gap-2 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
            import_ui_kit_core26.Badge,
            {
              tone: totalForaGlobal > 0 ? "danger" : "success",
              title: "Total de registros fora de especifica\xE7\xE3o",
              children: [
                totalForaGlobal,
                " Reg."
              ]
            }
          ),
          itensAlerta > 0 && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
            import_ui_kit_core26.Badge,
            {
              tone: "warning",
              title: "Controles com alertas estat\xEDsticos",
              style: { fontSize: "0.6em" },
              children: [
                itensAlerta,
                " Ctrs."
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "text-xs text-neutral-500", children: [
          fmtNum2((_d = estatisticasPlano == null ? void 0 : estatisticasPlano.totalRegistrosForaPct) != null ? _d : 0, 2),
          "% fora"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "col-span-12 md:col-span-4", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
        EstatisticasFrequenciaDashboard,
        {
          estatisticas: estatisticasFrequencia
        }
      ) })
    ] }) })
  ] }) }) });
};

// src/controle/ControleDashboardCard.tsx
var import_react40 = require("react");
var import_ui_kit_core27 = require("@hashcodeti/ui-kit-core");
var import_fi8 = require("react-icons/fi");
var import_jsx_runtime31 = require("react/jsx-runtime");
var fmtNum3 = (v, dec = 2) => Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : "-";
var cpkBadgeTone2 = (cpk) => {
  const n = Number(cpk);
  if (!Number.isFinite(n)) return "secondary";
  if (n >= 1.33) return "success";
  if (n >= 1) return "warning";
  return "danger";
};
var ControleDashboardCard = ({
  nomePlanoSelecionado,
  controleOptions,
  selectedControleId,
  setSelectedControleId,
  graficosAtivos = /* @__PURE__ */ new Set(),
  onToggleGrafico = () => {
  },
  className
}) => {
  const groupedOptions = (0, import_react40.useMemo)(() => {
    const groups = {};
    controleOptions.forEach((opt) => {
      const op = opt.operacao || "Geral";
      if (!groups[op]) groups[op] = [];
      groups[op].push(opt);
    });
    return groups;
  }, [controleOptions]);
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_ui_kit_core27.Card, { className: (0, import_ui_kit_core27.cn)("h-full flex flex-col shadow-sm", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_ui_kit_core27.CardHeader, { className: "bg-white font-bold truncate", title: nomePlanoSelecionado, children: [
      "Controles \u2014 ",
      nomePlanoSelecionado
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      import_ui_kit_core27.CardBody,
      {
        className: "p-0 overflow-auto flex-grow",
        style: { maxHeight: "600px" },
        children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("ul", { className: "divide-y divide-neutral-200", children: [
          controleOptions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("li", { className: "text-neutral-500 text-center py-3", children: "Nenhum controle encontrado." }),
          Object.entries(groupedOptions).map(([operacao, items]) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react40.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("li", { className: "bg-neutral-50 font-bold uppercase text-xs text-neutral-500 py-1 px-3", children: operacao }),
            items.map((o) => {
              var _a, _b, _c;
              const isSelected = String(selectedControleId) === String(o.value);
              const isAtivo = graficosAtivos.has(String(o.value));
              return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                "li",
                {
                  className: (0, import_ui_kit_core27.cn)(
                    "flex justify-between items-center px-3 py-2 cursor-pointer",
                    "hover:bg-neutral-50 transition-colors",
                    isSelected && "bg-primary-50 text-primary-900"
                  ),
                  onClick: () => setSelectedControleId(o.value),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "truncate pr-2 flex-1", title: o.label, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "font-semibold truncate", children: o.nomeParametro || o.label }),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("small", { className: "text-neutral-500 text-xs", children: [
                        "ID: ",
                        o.value
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                      (((_a = o.qtdFora) != null ? _a : 0) > 0 || o.statAlert) && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                        import_ui_kit_core27.Badge,
                        {
                          tone: "danger",
                          title: ((_b = o.qtdFora) != null ? _b : 0) > 0 ? `${o.qtdFora} registro(s) fora de especifica\xE7\xE3o` : "Alerta estat\xEDstica",
                          children: ((_c = o.qtdFora) != null ? _c : 0) > 0 ? o.qtdFora : "!"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                        import_ui_kit_core27.Badge,
                        {
                          tone: cpkBadgeTone2(o.cpk),
                          title: `Cpk: ${fmtNum3(o.cpk, 3)}`,
                          style: { minWidth: "45px", textAlign: "center" },
                          children: fmtNum3(o.cpk, 2)
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                        import_ui_kit_core27.Button,
                        {
                          size: "sm",
                          variant: isAtivo ? "info" : "outline-secondary",
                          title: isAtivo ? "Ocultar grafico" : "Ver grafico CEP",
                          onClick: (e) => {
                            e.stopPropagation();
                            onToggleGrafico(o.value);
                          },
                          style: { padding: "2px 6px", lineHeight: 1 },
                          children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_fi8.FiActivity, { size: 13 })
                        }
                      )
                    ] })
                  ]
                },
                o.value
              );
            })
          ] }, operacao))
        ] })
      }
    )
  ] });
};

// src/controle/ControleSelector.tsx
var import_react41 = require("react");
var import_ui_kit_core28 = require("@hashcodeti/ui-kit-core");
var import_ci2 = require("react-icons/ci");
var import_jsx_runtime32 = require("react/jsx-runtime");
var ControleSelector = ({
  planoOptions,
  loadPlano,
  getUnidadeLabel,
  setControleFunc,
  className
}) => {
  var _a;
  const [plano, setPlano] = (0, import_react41.useState)(null);
  const [operacao, setOperacao] = (0, import_react41.useState)(null);
  const [multiLpcChoose, setMultiLpcChoose] = (0, import_react41.useState)(null);
  const [controles, setControles] = (0, import_react41.useState)([]);
  const [selectedCheckbox, setSelectedCheckbox] = (0, import_react41.useState)(null);
  const handlePlanoChange = async (planoId) => {
    if (!planoId) return;
    const p = await loadPlano(planoId);
    setPlano(p);
    setOperacao(null);
    setControles([]);
    setMultiLpcChoose(null);
    setSelectedCheckbox(null);
    setControleFunc(null);
  };
  const handleOperacaoChange = (operacaoId) => {
    var _a2, _b;
    if (!plano) return;
    const op = (_b = (_a2 = plano.linhasDePlanoDeControle.find((lpc) => String(lpc.operacao.id) === String(operacaoId))) == null ? void 0 : _a2.operacao) != null ? _b : null;
    setOperacao(op);
    setSelectedCheckbox(null);
    const lpcsDaOperacao = plano.linhasDePlanoDeControle.filter(
      (lpc) => String(lpc.operacao.id) === String(operacaoId)
    );
    if (lpcsDaOperacao.length > 1) {
      setMultiLpcChoose(lpcsDaOperacao);
      setControles([]);
    } else {
      setMultiLpcChoose(null);
      setControles(lpcsDaOperacao.flatMap((lpc) => lpc.controles));
    }
  };
  const handleMultiLpcChoose = (lpcId) => {
    const lpc = multiLpcChoose == null ? void 0 : multiLpcChoose.find((l) => String(l.id) === String(lpcId));
    if (lpc) setControles(lpc.controles);
  };
  const handleCheckboxChange = (controleId) => {
    var _a2;
    if (selectedCheckbox === controleId) {
      setSelectedCheckbox(null);
      setControleFunc(null);
    } else {
      setSelectedCheckbox(controleId);
      const selected = (_a2 = controles.find((c) => c.id === controleId)) != null ? _a2 : null;
      setControleFunc(selected, operacao);
    }
  };
  const operacoesDoPlano = plano ? Array.from(
    new Map(
      plano.linhasDePlanoDeControle.map((lpc) => [
        String(lpc.operacao.id),
        lpc.operacao
      ])
    ).values()
  ) : [];
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: (0, import_ui_kit_core28.cn)("flex flex-col gap-3", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
      "select",
      {
        className: "w-full px-3 py-2 rounded-md border border-neutral-300 bg-white text-sm",
        defaultValue: "",
        onChange: (e) => handlePlanoChange(e.target.value),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("option", { value: "", disabled: true, children: "Escolha o plano de controle" }),
          planoOptions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("option", { value: p.id, children: p.nome }, p.id))
        ]
      }
    ),
    plano && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
      "select",
      {
        className: "w-full px-3 py-2 rounded-md border border-neutral-300 bg-white text-sm",
        value: (_a = operacao == null ? void 0 : operacao.id) != null ? _a : "",
        onChange: (e) => handleOperacaoChange(e.target.value),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("option", { value: "", disabled: true, children: "Escolha a opera\xE7\xE3o" }),
          operacoesDoPlano.map((op) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("option", { value: op.id, children: op.descricao }, op.id))
        ]
      }
    ),
    multiLpcChoose && multiLpcChoose.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
      "select",
      {
        className: "w-full px-3 py-2 rounded-md border border-neutral-300 bg-white text-sm",
        defaultValue: "",
        onChange: (e) => handleMultiLpcChoose(e.target.value),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("option", { value: "", disabled: true, children: "Selecione entre as opera\xE7\xF5es:" }),
          multiLpcChoose.map((lpc) => /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("option", { value: lpc.id, children: [
            lpc.operacao.descricao,
            " (#",
            lpc.id,
            ")"
          ] }, lpc.id))
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "flex flex-col gap-2", children: controles.map((controle2) => {
      var _a2, _b;
      const isDimmed = selectedCheckbox !== null && selectedCheckbox !== controle2.id;
      const isSelected = selectedCheckbox === controle2.id;
      return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_ui_kit_core28.Card, { className: "my-1 shadow-sm", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_ui_kit_core28.CardBody, { className: "p-3", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          "input",
          {
            type: "radio",
            checked: isSelected,
            onChange: () => handleCheckboxChange(controle2.id),
            className: "h-4 w-4 text-primary-600"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
          "div",
          {
            className: (0, import_ui_kit_core28.cn)(
              "flex-1 transition-opacity",
              isDimmed && "opacity-40"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "font-bold", children: controle2.parametro.nome }),
              /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "text-xs text-neutral-600", children: (_b = (_a2 = controle2 == null ? void 0 : controle2.especificacao) == null ? void 0 : _a2.limitesDeControle) == null ? void 0 : _b.map(
                (fx, i) => {
                  var _a3, _b2, _c;
                  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { children: `${(_a3 = fx.nome) != null ? _a3 : ""} : ${(_b2 = fx.boundRule) != null ? _b2 : ""} ${(_c = fx.valor) != null ? _c : ""} ${getUnidadeLabel(controle2.parametro.unidadeId)}` }, i);
                }
              ) })
            ]
          }
        ),
        isSelected && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          "button",
          {
            type: "button",
            className: "text-danger hover:opacity-80",
            onClick: () => handleCheckboxChange(controle2.id),
            "aria-label": "Remover sele\xE7\xE3o",
            children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_ci2.CiBookmarkRemove, { size: 24 })
          }
        )
      ] }) }) }, controle2.id);
    }) })
  ] });
};

// src/controle/EstatisticaDoControleDashBoard.tsx
var import_react42 = require("react");
var import_ui_kit_core29 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime33 = require("react/jsx-runtime");
var fmtNum4 = (v, dec = 2) => Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : "-";
var cpkBadgeTone3 = (cpk) => {
  const n = Number(cpk);
  if (!Number.isFinite(n)) return "secondary";
  if (n >= 1.33) return "success";
  if (n >= 1) return "warning";
  return "danger";
};
var formattedTime2 = (ms) => {
  if (!ms || !Number.isFinite(Number(ms))) return "-";
  const totalSeconds = Math.floor(Number(ms) / 1e3);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  return `${hours}h ${minutes}m`;
};
var toData24 = (hist) => {
  const base = Array.from({ length: 24 }, (_, h) => ({
    hora: h,
    incidencias: 0
  }));
  if (!hist) return base;
  if (hist instanceof Map) {
    for (const [k, v] of hist) {
      const h = Number(k);
      if (Number.isInteger(h) && h >= 0 && h <= 23) {
        base[h].incidencias += Number(v) || 0;
      }
    }
    return base;
  }
  if (typeof hist === "object") {
    for (const [k, v] of Object.entries(hist)) {
      const h = Number(k);
      if (Number.isInteger(h) && h >= 0 && h <= 23) {
        base[h].incidencias += Number(v) || 0;
      }
    }
  }
  return base;
};
var EstatisticaDoControleDashBoard = ({ current, renderHistogram, className }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const [show2, setShow] = (0, import_react42.useState)(false);
  const data24 = (0, import_react42.useMemo)(() => toData24(current == null ? void 0 : current.histograma), [current]);
  const freqPlan = (_b = (_a = current == null ? void 0 : current.analiseFrequencia) == null ? void 0 : _a.frequenciaPlanejada) != null ? _b : 0;
  const desvioTotal = (_d = (_c = current == null ? void 0 : current.estatisticas) == null ? void 0 : _c.foraDeEspecificacaoTotal) != null ? _d : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_jsx_runtime33.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_ui_kit_core29.Card, { className, style: { marginBottom: "1rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_ui_kit_core29.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-neutral-500 text-xs uppercase font-bold", children: ((_e = current.controle) == null ? void 0 : _e.operacao) || "Opera\xE7\xE3o Geral" }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "text-lg font-bold", children: [
            ((_f = current.controle) == null ? void 0 : _f.nomeParametro) || "Par\xE2metro",
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "text-neutral-500 font-normal text-base ml-2", children: [
              "(ID: ",
              current.controleId,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_ui_kit_core29.Button, { variant: "primary", onClick: () => setShow(true), children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("rect", { x: "3", y: "10", width: "3", height: "11", rx: "1" }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("rect", { x: "10", y: "6", width: "3", height: "15", rx: "1" }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("rect", { x: "17", y: "2", width: "3", height: "19", rx: "1" })
          ] }),
          " ",
          "Frequencia"
        ] }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_ui_kit_core29.CardBody, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "grid grid-cols-12 gap-3 items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "col-span-12 md:col-span-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "text-neutral-500 text-xs", children: "Performance Processo" }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("h5", { className: "m-0 mb-1", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_ui_kit_core29.Badge, { tone: cpkBadgeTone3((_g = current.estatisticas) == null ? void 0 : _g.cpk), children: [
            "Cpk ",
            fmtNum4((_h = current.estatisticas) == null ? void 0 : _h.cpk, 3)
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "text-xs text-neutral-500 flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { children: [
              "M\xE9d: ",
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("b", { children: fmtNum4((_i = current.estatisticas) == null ? void 0 : _i.media, 2) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { children: [
              "Min: ",
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("b", { children: fmtNum4((_j = current.estatisticas) == null ? void 0 : _j.menorValor, 2) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { children: [
              "Max: ",
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("b", { children: fmtNum4((_k = current.estatisticas) == null ? void 0 : _k.maiorValor, 2) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "col-span-12 md:col-span-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "text-neutral-500 text-xs", children: "Desvios de Especifica\xE7\xE3o" }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("h5", { className: "m-0 mb-1", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
            import_ui_kit_core29.Badge,
            {
              tone: desvioTotal > 0 ? "danger" : "success",
              title: "Registros fora de especifica\xE7\xE3o",
              children: [
                desvioTotal,
                " Reg."
              ]
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "text-xs text-neutral-500", children: "Registros fora dos limites" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "col-span-12 md:col-span-4", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          EstatisticasFrequenciaDashboard,
          {
            estatisticas: current.analiseFrequencia
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_ui_kit_core29.Modal, { open: show2, onOpenChange: setShow, size: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_ui_kit_core29.ModalHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: "Histograma de incid\xEAncias (0\u201323h)" }),
        freqPlan > 0 && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_ui_kit_core29.Badge, { tone: "info", children: [
          "Planejado: ",
          formattedTime2(freqPlan)
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_ui_kit_core29.ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { style: { width: "100%", height: 340 }, children: renderHistogram ? renderHistogram(data24) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "flex items-center justify-center h-full text-neutral-500 text-sm", children: "Forne\xE7a `renderHistogram` para visualizar o gr\xE1fico (recharts)." }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_ui_kit_core29.ModalFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_ui_kit_core29.Button, { variant: "secondary", onClick: () => setShow(false), children: "Fechar" }) })
    ] })
  ] });
};

// src/registro/RegistroviewDashboardCard.tsx
var import_react43 = require("react");
var import_ui_kit_core30 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime34 = require("react/jsx-runtime");
var fmtNum5 = (v, dec = 2) => Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : "-";
var formattedTime3 = (ms) => {
  if (!ms || !Number.isFinite(Number(ms))) return "-";
  const totalSeconds = Math.floor(Number(ms) / 1e3);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  return `${hours}h ${minutes}m`;
};
var defaultFormatDateTime2 = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
var RegistroviewDashboardCard = ({
  controle: controle2,
  registros = [],
  setShowHist,
  setRegistroModal,
  formatDateTime = defaultFormatDateTime2,
  className
}) => {
  var _a, _b, _c;
  const { minSpec, maxSpec } = (0, import_react43.useMemo)(() => {
    var _a2;
    let min = null;
    let max = null;
    let minIsSpec = false;
    let maxIsSpec = false;
    const limits = ((_a2 = controle2 == null ? void 0 : controle2.especificacao) == null ? void 0 : _a2.limitesDeControle) || [];
    limits.forEach((l) => {
      const val = Number(l.valor);
      if (Number.isNaN(val)) return;
      const isSpec = !!l.nome && l.nome.toLowerCase().includes("especificado");
      if (l.boundRule && [">", ">="].includes(l.boundRule)) {
        if (isSpec) {
          min = val;
          minIsSpec = true;
        } else if (!minIsSpec) {
          min = val;
        }
      } else if (l.boundRule && ["<", "<="].includes(l.boundRule)) {
        if (isSpec) {
          max = val;
          maxIsSpec = true;
        } else if (!maxIsSpec) {
          max = val;
        }
      }
    });
    return { minSpec: min, maxSpec: max };
  }, [controle2]);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_ui_kit_core30.Card, { className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_ui_kit_core30.CardHeader, { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { children: `${(_a = controle2 == null ? void 0 : controle2.operacao) != null ? _a : ""} - ${(_b = controle2 == null ? void 0 : controle2.nomeParametro) != null ? _b : ""} - ${(_c = controle2 == null ? void 0 : controle2.labelUnidade) != null ? _c : ""}` }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "text-neutral-500 text-xs flex gap-3 items-center flex-wrap", children: (minSpec !== null || maxSpec !== null) && /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("strong", { children: "Faixa Espec\xEDficada:" }),
          " ",
          minSpec !== null && maxSpec !== null ? `${fmtNum5(minSpec)} - ${fmtNum5(maxSpec)}` : minSpec !== null ? `>= ${fmtNum5(minSpec)}` : `<= ${fmtNum5(maxSpec)}`
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
        import_ui_kit_core30.Button,
        {
          variant: "outline-secondary",
          size: "sm",
          onClick: () => setShowHist(true),
          title: "Ver histograma",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("rect", { x: "3", y: "10", width: "3", height: "11", rx: "1" }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("rect", { x: "10", y: "6", width: "3", height: "15", rx: "1" }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("rect", { x: "17", y: "2", width: "3", height: "19", rx: "1" })
            ] }),
            " ",
            "Histograma"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_ui_kit_core30.CardBody, { className: "p-0", style: { maxHeight: 450, overflowY: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("thead", { className: "bg-neutral-50 text-left", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("th", { className: "px-3 py-2", style: { width: 110 }, children: "ID" }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("th", { className: "px-3 py-2", style: { width: 180 }, children: "Data" }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("th", { className: "px-3 py-2", children: "Valor" }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("th", { className: "px-3 py-2", children: "Frequencia" }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("th", { className: "px-3 py-2", style: { width: 160 }, children: "Status" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("tbody", { children: registros.map((r) => {
        const alerta = !!r.foraDeEspecificacao;
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
          "tr",
          {
            onClick: () => setRegistroModal({
              ...r,
              unidade: controle2 == null ? void 0 : controle2.labelUnidade
            }),
            className: (0, import_ui_kit_core30.cn)(
              "cursor-pointer border-t border-neutral-200 hover:bg-neutral-50",
              alerta && "bg-warning-muted"
            ),
            title: alerta ? `Fora de especifica\xE7\xE3o (${(r.regrasQueFalharam || []).map((f) => `${f.boundRule} ${f.valor}`).join(", ")})` : "Clique para detalhes",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("td", { className: "px-3 py-2", children: r.id }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("td", { className: "px-3 py-2", title: r.data, children: formatDateTime(r.data) }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("td", { className: "px-3 py-2", children: [
                fmtNum5(Number(String(r.valor).replace(",", ".")), 2),
                (controle2 == null ? void 0 : controle2.labelUnidade) ? /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { className: "text-neutral-500", children: [
                  " ",
                  controle2.labelUnidade
                ] }) : null
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("td", { className: "px-3 py-2", children: formattedTime3(r.frequenciaRealizada || 0) }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("td", { className: "px-3 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_ui_kit_core30.Badge, { tone: alerta ? "danger" : "success", children: alerta ? "Fora de especifica\xE7\xE3o" : "OK" }) })
            ]
          },
          r.id
        );
      }) })
    ] }) })
  ] });
};

// src/frequencia/FrequenciaPicker.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
var FrequenciaPicker = ({
  FrequenciaForm,
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(FrequenciaForm, { ...rest });
};

// src/autorizacao/AutorizacaoRejeicaoModal.tsx
var import_react44 = require("react");
var import_ui_kit_core31 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime36 = require("react/jsx-runtime");
var AutorizacaoRejeicaoModal = ({
  show: show2,
  onHide,
  onConfirm: onConfirm2,
  loading
}) => {
  const [motivo, setMotivo] = (0, import_react44.useState)("");
  const handleConfirm2 = () => {
    if (!motivo.trim()) return;
    onConfirm2(motivo.trim());
    setMotivo("");
  };
  const handleHide = () => {
    setMotivo("");
    onHide();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(import_ui_kit_core31.Modal, { open: show2, onOpenChange: (o) => o ? null : handleHide(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_ui_kit_core31.ModalHeader, { children: "Rejeitar Autoriza\xE7\xE3o" }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(import_ui_kit_core31.ModalBody, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("label", { className: "block text-sm font-medium text-neutral-700 mb-1", children: [
        "Motivo da rejei\xE7\xE3o ",
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "text-danger", children: "*" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
        "textarea",
        {
          rows: 3,
          placeholder: "Descreva o motivo da rejei\xE7\xE3o...",
          value: motivo,
          onChange: (e) => setMotivo(e.target.value),
          disabled: loading,
          className: "w-full px-3 py-2 rounded-md border border-neutral-300 text-sm focus:outline-none focus:border-primary-500 disabled:opacity-60"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(import_ui_kit_core31.ModalFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_ui_kit_core31.Button, { variant: "secondary", onClick: handleHide, disabled: loading, children: "Cancelar" }),
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
        import_ui_kit_core31.Button,
        {
          variant: "danger",
          onClick: handleConfirm2,
          disabled: !motivo.trim() || loading,
          children: loading ? "Rejeitando..." : "Rejeitar"
        }
      )
    ] })
  ] });
};

// src/justificativa/JustificativaModal.tsx
var React9 = __toESM(require("react"));
var import_dayjs3 = __toESM(require("dayjs"));
var import_fa4 = require("react-icons/fa");
var import_ui_kit_core32 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime37 = require("react/jsx-runtime");
function localId() {
  return Math.random().toString(36).slice(2, 11);
}
var JustificativaModal = ({
  show: show2,
  onClose: onClose2,
  justificativas: initial = [],
  currentUserId,
  currentUserName,
  onUpdateJustificativas
}) => {
  const [local, setLocal] = React9.useState(initial);
  const [draft, setDraft] = React9.useState("");
  const [editingId, setEditingId] = React9.useState(null);
  React9.useEffect(() => {
    setLocal(initial);
  }, [initial]);
  const handleSubmit = async () => {
    if (!draft.trim()) return;
    let next;
    if (editingId) {
      next = local.map(
        (j) => j.id === editingId ? { ...j, descricao: draft } : j
      );
      setEditingId(null);
    } else {
      const nova = {
        id: localId(),
        descricao: draft,
        user: { userId: currentUserId, firstName: currentUserName },
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        isNew: true
      };
      next = [...local, nova];
    }
    setDraft("");
    await onUpdateJustificativas(next);
    setLocal(next);
  };
  const handleRemove = async (id) => {
    const next = local.map((j) => j.id === id ? { ...j, removed: true } : j);
    await onUpdateJustificativas(next);
    setLocal(next);
  };
  const handleUndo = async (id) => {
    const next = local.map((j) => j.id === id ? { ...j, removed: false } : j);
    await onUpdateJustificativas(next);
    setLocal(next);
  };
  const startEdit = (j) => {
    if (j.removed) return;
    setDraft(j.descricao);
    setEditingId(j.id);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_ui_kit_core32.Modal, { open: show2, onOpenChange: (o) => !o && onClose2(), size: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.ModalHeader, { children: "Justificativas / Coment\xE1rios" }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_ui_kit_core32.TooltipProvider, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            void handleSubmit();
          },
          className: "mb-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
              import_ui_kit_core32.TextField,
              {
                label: "Novo registro",
                multiline: true,
                rows: 2,
                value: draft,
                onChange: (e) => setDraft(e.target.value),
                placeholder: "Descreva o motivo ou informa\xE7\xE3o adicional..."
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.Button, { type: "submit", variant: "primary", size: "sm", disabled: !draft.trim(), children: editingId ? "Salvar edi\xE7\xE3o" : "Adicionar justificativa" }) })
          ]
        }
      ),
      local.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("p", { className: "text-sm text-neutral-500 text-center py-6", children: "Nenhuma justificativa registrada ainda." }) : /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("ul", { role: "list", className: "flex flex-col gap-3", children: local.map((j) => {
        var _a, _b, _c;
        const isMe = ((_a = j.user) == null ? void 0 : _a.userId) === currentUserId;
        const authorName = isMe ? "Voc\xEA" : ((_b = j.user) == null ? void 0 : _b.userName) || ((_c = j.user) == null ? void 0 : _c.firstName) || "Usu\xE1rio";
        const timestamp = (0, import_dayjs3.default)(j.createdAt).format("DD/MM [\xE0s] HH:mm");
        return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
          "li",
          {
            role: "listitem",
            "aria-label": `Justificativa de ${authorName} em ${timestamp}`,
            className: [
              "flex flex-col",
              isMe ? "items-start" : "items-end",
              j.removed ? "opacity-50" : ""
            ].join(" "),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
                "div",
                {
                  className: [
                    "flex items-center gap-2 mb-1 w-full",
                    isMe ? "justify-start" : "justify-end"
                  ].join(" "),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-xs font-semibold text-neutral-700", children: authorName }),
                    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.Badge, { variant: "solid", tone: "secondary", size: "sm", pill: false, children: timestamp })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
                "button",
                {
                  type: "button",
                  onClick: () => isMe && startEdit(j),
                  disabled: !isMe || j.removed,
                  "aria-label": isMe && !j.removed ? "Editar justificativa" : void 0,
                  className: [
                    "max-w-[85%] text-left px-4 py-3 rounded-xl text-sm",
                    "border shadow-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                    j.removed ? "bg-error-muted text-neutral-700 line-through cursor-default border-error/30" : isMe ? "bg-info-muted text-neutral-900 border-info/30 hover:bg-info-muted/80 cursor-pointer" : "bg-neutral-50 text-neutral-900 border-neutral-200 cursor-default"
                  ].join(" "),
                  children: j.descricao
                }
              ),
              isMe && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "mt-1.5 flex gap-2", children: j.removed ? /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.Tooltip, { content: "Desfazer remo\xE7\xE3o", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
                "button",
                {
                  type: "button",
                  onClick: () => void handleUndo(j.id),
                  "aria-label": "Desfazer remo\xE7\xE3o",
                  className: "inline-flex items-center justify-center h-6 w-6 rounded-md text-success hover:bg-success-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                  children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_fa4.FaUndo, { size: 12 })
                }
              ) }) : /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.Tooltip, { content: "Remover", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
                "button",
                {
                  type: "button",
                  onClick: () => void handleRemove(j.id),
                  "aria-label": "Remover justificativa",
                  className: "inline-flex items-center justify-center h-6 w-6 rounded-md text-error hover:bg-error-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                  children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_fa4.FaTrashAlt, { size: 12 })
                }
              ) }) })
            ]
          },
          j.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.ModalFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_ui_kit_core32.Button, { variant: "secondary", onClick: onClose2, children: "Fechar" }) })
  ] });
};

// src/preset/PresetSaveModal.tsx
var React10 = __toESM(require("react"));
var import_fi9 = require("react-icons/fi");
var import_ui_kit_core33 = require("@hashcodeti/ui-kit-core");
var import_jsx_runtime38 = require("react/jsx-runtime");
var SUMMARY_LABELS = {
  groupOption: {
    none: "Sem Agrupamento",
    recurso: "Por Recurso",
    parametro: "Por Par\xE2metro",
    plano: "Por Plano",
    semana: "Por Semana"
  },
  sortOption: {
    posicao: "Posi\xE7\xE3o",
    label_az: "Nome A\u2192Z",
    freq_asc: "Freq. \u2191",
    freq_desc: "Freq. \u2193"
  },
  activeStatus: {
    todos: "Todos",
    pendente: "Pendente",
    atrasado: "Atrasado",
    feito: "Feito"
  }
};
var PresetSaveModal = ({
  open,
  onClose: onClose2,
  onSave,
  summary,
  initial,
  controles
}) => {
  var _a, _b, _c;
  const [nome, setNome] = React10.useState("");
  const [descricao, setDescricao] = React10.useState("");
  const [accessMode, setAccessMode] = React10.useState("private");
  const [saving, setSaving] = React10.useState(false);
  const [error, setError] = React10.useState(null);
  const controlesUniverse = controles != null ? controles : [];
  const hasPicker = controlesUniverse.length > 0;
  const [selectedRefIds, setSelectedRefIds] = React10.useState(/* @__PURE__ */ new Set());
  const [searchQuery, setSearchQuery] = React10.useState("");
  React10.useEffect(() => {
    var _a2, _b2, _c2;
    if (!open) return;
    setNome((_a2 = initial == null ? void 0 : initial.nome) != null ? _a2 : "");
    setDescricao((_b2 = initial == null ? void 0 : initial.descricao) != null ? _b2 : "");
    setAccessMode((initial == null ? void 0 : initial.access) === "all" ? "all" : "private");
    setError(null);
    setSearchQuery((_c2 = initial == null ? void 0 : initial.searchQuery) != null ? _c2 : "");
    if (hasPicker) {
      const initialSubset = initial == null ? void 0 : initial.controleRefIds;
      if (Array.isArray(initialSubset) && initialSubset.length > 0) {
        const universe = new Set(controlesUniverse.map((c) => c.refId));
        setSelectedRefIds(new Set(initialSubset.filter((r) => universe.has(r))));
      } else {
        setSelectedRefIds(new Set(controlesUniverse.map((c) => c.refId)));
      }
    } else {
      setSelectedRefIds(/* @__PURE__ */ new Set());
    }
  }, [open, initial]);
  const filteredControles = React10.useMemo(() => {
    if (!hasPicker) return [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return controlesUniverse;
    return controlesUniverse.filter(
      (c) => (c.label || "").toLowerCase().includes(q) || (c.recursoNome || "").toLowerCase().includes(q) || (c.refId || "").toLowerCase().includes(q)
    );
  }, [controlesUniverse, hasPicker, searchQuery]);
  const allSelected = hasPicker && selectedRefIds.size === controlesUniverse.length;
  const isSubset = hasPicker && !allSelected && selectedRefIds.size > 0;
  const toggleRef = (refId) => {
    setSelectedRefIds((prev) => {
      const next = new Set(prev);
      if (next.has(refId)) next.delete(refId);
      else next.add(refId);
      return next;
    });
  };
  const selectFilteredVisible = () => {
    setSelectedRefIds((prev) => {
      const next = new Set(prev);
      for (const c of filteredControles) next.add(c.refId);
      return next;
    });
  };
  const selectOnlyFilteredVisible = () => {
    setSelectedRefIds(new Set(filteredControles.map((c) => c.refId)));
  };
  const clearSelection = () => setSelectedRefIds(/* @__PURE__ */ new Set());
  const selectAll = () => setSelectedRefIds(new Set(controlesUniverse.map((c) => c.refId)));
  const isUpdateMode = !!(initial == null ? void 0 : initial.id);
  const canEditExisting = (initial == null ? void 0 : initial.canEdit) !== false;
  const canSave = !!nome.trim() && !saving && (!isUpdateMode || canEditExisting);
  const canSaveAsNew = !!nome.trim() && !saving;
  const doSave = async (saveAsNew) => {
    const trimmed = nome.trim();
    if (!trimmed) {
      setError("D\xEA um nome para esta visualiza\xE7\xE3o");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const controleRefIds = !hasPicker || allSelected ? [] : Array.from(selectedRefIds);
      await onSave({
        nome: trimmed,
        descricao: descricao.trim() ? descricao.trim() : null,
        access: accessMode === "all" ? "all" : [],
        controleRefIds,
        ...saveAsNew ? { saveAsNew: true } : null
      });
      onClose2();
    } catch (e) {
      setError((e == null ? void 0 : e.message) || "Falha ao salvar");
    } finally {
      setSaving(false);
    }
  };
  const handleSave = () => void doSave(false);
  const handleSaveAsNew = () => void doSave(true);
  const renderSummaryRow = (label, value) => /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_jsx_runtime38.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-neutral-400", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-neutral-700", children: value })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_ui_kit_core33.Modal, { open, onOpenChange: (o) => !o && onClose2(), size: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_ui_kit_core33.ModalHeader, { children: isUpdateMode ? "\u270F\uFE0F Editar visualiza\xE7\xE3o" : "\u{1F4BE} Salvar visualiza\xE7\xE3o" }),
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_ui_kit_core33.ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        import_ui_kit_core33.TextField,
        {
          label: "Nome",
          required: true,
          autoFocus: true,
          value: nome,
          onChange: (e) => setNome(e.target.value),
          placeholder: "Ex.: Inspe\xE7\xE3o di\xE1ria \u2014 Linha A",
          maxLength: 120
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        import_ui_kit_core33.TextField,
        {
          label: "Descri\xE7\xE3o",
          multiline: true,
          rows: 2,
          value: descricao,
          onChange: (e) => setDescricao(e.target.value),
          placeholder: "Opcional \u2014 para que serve este preset?",
          maxLength: 400
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("label", { className: "text-xs font-semibold text-neutral-600 mb-1.5 block", children: "Acesso" }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          import_ui_kit_core33.Tabs,
          {
            value: accessMode,
            onValueChange: (v) => setAccessMode(v),
            children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_ui_kit_core33.TabsList, { variant: "pills", size: "sm", className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_ui_kit_core33.TabsTrigger, { value: "private", title: "Apenas voc\xEA v\xEA e edita", children: "S\xF3 eu" }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_ui_kit_core33.TabsTrigger, { value: "all", title: "Qualquer usu\xE1rio v\xEA (s\xF3 voc\xEA edita)", children: "Todos da empresa" })
            ] })
          }
        )
      ] }),
      hasPicker && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-baseline justify-between mb-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("label", { className: "text-xs font-semibold text-neutral-600", children: "Controles inclu\xEDdos" }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-xs text-neutral-500", children: allSelected ? /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_ui_kit_core33.Badge, { tone: "neutral", size: "sm", variant: "subtle", children: [
            "Todos (",
            controlesUniverse.length,
            ")"
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_ui_kit_core33.Badge, { tone: "info", size: "sm", variant: "subtle", children: [
            selectedRefIds.size,
            " de ",
            controlesUniverse.length
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "relative mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            import_fi9.FiSearch,
            {
              size: 14,
              className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            "input",
            {
              type: "text",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: 'Filtrar por nome \u2014 ex.: "pH", "tanque"\u2026',
              className: "w-full text-sm pl-8 pr-8 py-1.5 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent"
            }
          ),
          searchQuery && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setSearchQuery(""),
              className: "absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600",
              "aria-label": "Limpar busca",
              children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi9.FiX, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex flex-wrap gap-1.5 mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            import_ui_kit_core33.Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: selectAll,
              disabled: allSelected,
              type: "button",
              children: "Todos"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            import_ui_kit_core33.Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: clearSelection,
              disabled: selectedRefIds.size === 0,
              type: "button",
              children: "Nenhum"
            }
          ),
          searchQuery && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_jsx_runtime38.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
              import_ui_kit_core33.Button,
              {
                variant: "secondary",
                size: "sm",
                onClick: selectFilteredVisible,
                type: "button",
                title: "Adiciona os vis\xEDveis \xE0 sele\xE7\xE3o atual",
                children: [
                  "+ Vis\xEDveis (",
                  filteredControles.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              import_ui_kit_core33.Button,
              {
                variant: "secondary",
                size: "sm",
                onClick: selectOnlyFilteredVisible,
                type: "button",
                title: "Substitui a sele\xE7\xE3o atual pelos vis\xEDveis",
                children: "= S\xF3 vis\xEDveis"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: "max-h-48 overflow-y-auto border border-neutral-200 rounded-md divide-y divide-neutral-100 bg-white", children: filteredControles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "text-center text-xs text-neutral-400 py-6", children: [
          'Nenhum controle corresponde a "',
          searchQuery,
          '"'
        ] }) : filteredControles.map((c) => {
          const checked = selectedRefIds.has(c.refId);
          return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
            "label",
            {
              className: "flex items-center gap-2 px-2.5 py-1.5 text-xs hover:bg-neutral-50 cursor-pointer",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
                  "input",
                  {
                    type: "checkbox",
                    checked,
                    onChange: () => toggleRef(c.refId),
                    className: "accent-brand-primary"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-neutral-700 truncate block", children: c.label || c.refId }),
                  c.recursoNome && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-neutral-400 truncate block", children: c.recursoNome })
                ] })
              ]
            },
            c.refId
          );
        }) }),
        isSubset && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("p", { className: "text-xs text-neutral-500 mt-1.5", children: [
          "O preset vai carregar s\xF3 os ",
          selectedRefIds.size,
          " controles selecionados \u2014 menos dados do servidor."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "border border-dashed border-neutral-300 rounded-lg p-3 bg-neutral-50 text-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: "font-semibold text-neutral-700 mb-2", children: "Estado atual capturado" }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "grid grid-cols-[110px_1fr] gap-y-1", children: [
          renderSummaryRow("Plano", summary.planoNome),
          renderSummaryRow("Per\xEDodo", summary.periodo),
          renderSummaryRow(
            "Agrupamento",
            (_a = SUMMARY_LABELS.groupOption[summary.groupOption]) != null ? _a : summary.groupOption
          ),
          renderSummaryRow(
            "Ordena\xE7\xE3o",
            (_b = SUMMARY_LABELS.sortOption[summary.sortOption]) != null ? _b : summary.sortOption
          ),
          renderSummaryRow(
            "Status",
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_ui_kit_core33.Badge, { tone: "info", size: "sm", variant: "subtle", children: (_c = SUMMARY_LABELS.activeStatus[summary.activeStatus]) != null ? _c : summary.activeStatus })
          ),
          summary.totalGroups != null && renderSummaryRow(
            "Grupos vis\xEDveis",
            `${summary.visibleGroupsCount} de ${summary.totalGroups}`
          ),
          renderSummaryRow("Campos pinados", summary.pinnedCount)
        ] })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        "div",
        {
          role: "alert",
          className: "bg-error-muted text-error border border-error/30 rounded-md px-3 py-2 text-xs",
          children: error
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_ui_kit_core33.ModalFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_ui_kit_core33.Button, { variant: "secondary", onClick: onClose2, disabled: saving, children: "Cancelar" }),
      isUpdateMode && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        import_ui_kit_core33.Button,
        {
          variant: "secondary",
          onClick: handleSaveAsNew,
          disabled: !canSaveAsNew,
          title: "Cria um preset novo a partir desta visualiza\xE7\xE3o (mant\xE9m o original)",
          children: "Salvar como nova"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        import_ui_kit_core33.Button,
        {
          variant: "primary",
          onClick: handleSave,
          disabled: !canSave,
          leftIcon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_fi9.FiSave, { size: 14 }),
          title: isUpdateMode && !canEditExisting ? 'Voc\xEA n\xE3o \xE9 dono deste preset \u2014 use "Salvar como nova" para criar uma c\xF3pia sua' : void 0,
          children: saving ? "Salvando\u2026" : isUpdateMode ? "Atualizar" : "Salvar"
        }
      )
    ] })
  ] });
};

// src/folha/FolhaDeVerificacao.tsx
var import_react47 = require("react");
var import_uuid3 = require("uuid");
var import_fi10 = require("react-icons/fi");
var import_ui_kit_core34 = require("@hashcodeti/ui-kit-core");

// src/folha/hooks/useGrouping.ts
var import_react45 = require("react");
var GROUP_LABELS = {
  none: "Agrupar",
  preenchimento: "Preenchimento",
  status: "Status",
  usuario: "Usuario",
  data: "Data",
  tipoCampo: "Tipo de campo",
  descricao: "Descricao",
  unidade: "Unidade",
  frequencia: "Frequencia"
};
var computeGroupKey = (reg, mode) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (mode === "preenchimento") {
    const val = reg.valor;
    return val !== null && val !== void 0 && val !== "" && val !== 0 && val !== "0" ? "Preenchido" : "Vazio";
  }
  if (mode === "status") return reg.isLate ? "Atrasado" : "Em dia";
  if (mode === "usuario") return reg.nomeUsuario || "Sem usuario";
  if (mode === "data") {
    const raw = reg.data || ((_a = reg.lastRegister) == null ? void 0 : _a.data);
    return raw ? new Date(raw).toLocaleDateString("pt-BR") : "Sem data";
  }
  if (mode === "tipoCampo") {
    const tipoMap = { text: "Textual", number: "Numerico", time: "Tempo", formula: "f(x)" };
    return tipoMap[(_b = reg.campoDeVerificacao) == null ? void 0 : _b.tipoDeCampo] || ((_c = reg.campoDeVerificacao) == null ? void 0 : _c.tipoDeCampo) || "Sem tipo";
  }
  if (mode === "descricao") return ((_d = reg.campoDeVerificacao) == null ? void 0 : _d.descricao) || "Sem descricao";
  if (mode === "unidade") return ((_f = (_e = reg.campoDeVerificacao) == null ? void 0 : _e.controle) == null ? void 0 : _f.labelUnidade) || "Sem unidade";
  if (mode === "frequencia") return ((_h = (_g = reg.campoDeVerificacao) == null ? void 0 : _g.controle) == null ? void 0 : _h.escala) || "Sem frequencia";
  return "unknown";
};
function useGrouping(groupedRegistros) {
  const [groupingLevels, setGroupingLevels] = (0, import_react45.useState)(["none"]);
  const [collapsedGroups, setCollapsedGroups] = (0, import_react45.useState)({});
  const frozenGroupKeys = (0, import_react45.useRef)(/* @__PURE__ */ new Map());
  const prevGroupingLevelsRef = (0, import_react45.useRef)(["none"]);
  const displayGroupTree = (0, import_react45.useMemo)(() => {
    const l0 = groupingLevels[0];
    const l1 = groupingLevels[1];
    if (!l0 || l0 === "none") {
      return [{ path: null, label: null, items: groupedRegistros, subGroups: null }];
    }
    const l1Map = /* @__PURE__ */ new Map();
    groupedRegistros.forEach((item) => {
      const reg = item.mainRegistro;
      const id = reg._localId || reg.id;
      const frozenKeyL0 = `l0::${id}`;
      let key;
      if (reg.changed) {
        if (!frozenGroupKeys.current.has(frozenKeyL0)) frozenGroupKeys.current.set(frozenKeyL0, computeGroupKey(reg, l0));
        key = frozenGroupKeys.current.get(frozenKeyL0);
      } else {
        frozenGroupKeys.current.delete(frozenKeyL0);
        key = computeGroupKey(reg, l0);
      }
      if (!l1Map.has(key)) l1Map.set(key, []);
      l1Map.get(key).push(item);
    });
    return Array.from(l1Map.entries()).map(([l1Label, l1Items]) => {
      if (!l1 || l1 === "none") {
        return { path: l1Label, label: l1Label, items: l1Items, subGroups: null };
      }
      const l2Map = /* @__PURE__ */ new Map();
      l1Items.forEach((item) => {
        const reg = item.mainRegistro;
        const id = reg._localId || reg.id;
        const frozenKeyL1 = `l1::${id}`;
        let key;
        if (reg.changed) {
          if (!frozenGroupKeys.current.has(frozenKeyL1)) frozenGroupKeys.current.set(frozenKeyL1, computeGroupKey(reg, l1));
          key = frozenGroupKeys.current.get(frozenKeyL1);
        } else {
          frozenGroupKeys.current.delete(frozenKeyL1);
          key = computeGroupKey(reg, l1);
        }
        if (!l2Map.has(key)) l2Map.set(key, []);
        l2Map.get(key).push(item);
      });
      const subGroups = Array.from(l2Map.entries()).map(([l2Label, l2Items]) => ({
        path: `${l1Label}::${l2Label}`,
        label: l2Label,
        items: l2Items,
        subGroups: null
      }));
      return { path: l1Label, label: l1Label, items: null, subGroups };
    });
  }, [groupedRegistros, groupingLevels]);
  const allGroupsCollapsed = (0, import_react45.useMemo)(() => {
    if (!groupingLevels[0] || groupingLevels[0] === "none") return false;
    return displayGroupTree.length > 0 && displayGroupTree.every((g) => collapsedGroups[g.path]);
  }, [displayGroupTree, collapsedGroups, groupingLevels]);
  const toggleGroup = (0, import_react45.useCallback)((key) => {
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);
  const toggleAllGroups = (0, import_react45.useCallback)(() => {
    if (allGroupsCollapsed) {
      setCollapsedGroups({});
    } else {
      const all = {};
      displayGroupTree.forEach((g) => {
        if (g.path) all[g.path] = true;
      });
      setCollapsedGroups(all);
    }
  }, [allGroupsCollapsed, displayGroupTree]);
  (0, import_react45.useEffect)(() => {
    const prev = prevGroupingLevelsRef.current;
    if (prev.join(",") === groupingLevels.join(",")) return;
    prevGroupingLevelsRef.current = groupingLevels;
    if (!groupingLevels[0] || groupingLevels[0] === "none") {
      setCollapsedGroups({});
      return;
    }
    const all = {};
    displayGroupTree.forEach((g) => {
      if (g.path) all[g.path] = true;
    });
    setCollapsedGroups(all);
  }, [groupingLevels, displayGroupTree]);
  const resetFrozenKeys = (0, import_react45.useCallback)(() => frozenGroupKeys.current.clear(), []);
  return {
    groupingLevels,
    setGroupingLevels,
    collapsedGroups,
    setCollapsedGroups,
    toggleGroup,
    toggleAllGroups,
    allGroupsCollapsed,
    displayGroupTree,
    resetFrozenKeys
  };
}

// src/folha/hooks/useFolhaFetcher.ts
var import_react46 = require("react");
var import_uuid2 = require("uuid");
var enrichFolha = (folhaRaw, camposDef) => {
  if (!folhaRaw || !folhaRaw.registrosDeCampo) return folhaRaw;
  let registrosEnriched = folhaRaw.registrosDeCampo.map((reg) => {
    var _a;
    const campoId = ((_a = reg.campoDeVerificacao) == null ? void 0 : _a.id) || reg.campoDeVerificacaoId || reg.campoDeVerificacao;
    const def = camposDef.find((c) => String(c.id) === String(campoId));
    return {
      ...reg,
      _localId: reg._localId || (0, import_uuid2.v4)(),
      campoDeVerificacao: def || reg.campoDeVerificacao
    };
  });
  const seen = /* @__PURE__ */ new Set();
  registrosEnriched = registrosEnriched.filter((reg) => {
    var _a;
    const key = reg.id ? `id:${reg.id}` : `campo:${reg.campoDeVerificacaoId || ((_a = reg.campoDeVerificacao) == null ? void 0 : _a.id)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  registrosEnriched.forEach((reg) => {
    var _a;
    if (reg.changed) return;
    const control = (_a = reg.campoDeVerificacao) == null ? void 0 : _a.controle;
    const lastReg = reg.lastRegister;
    if (control && control !== "default" && control.valor) {
      let diff = 0;
      let shouldCheck = false;
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (reg.id && reg.data) {
        diff = now - new Date(reg.data).getTime();
        shouldCheck = true;
      } else if (lastReg && lastReg.data) {
        diff = now - new Date(lastReg.data).getTime();
        shouldCheck = true;
      }
      if (shouldCheck) {
        reg.isLate = diff > Number(control.valor);
      }
    }
  });
  return { ...folhaRaw, registrosDeCampo: registrosEnriched, fetched: true };
};
function useFolhaFetcher({
  outFolha,
  paginaAtual,
  caderno,
  fetchFolha,
  onPersistFolha
}) {
  const [folha2, setFolha] = (0, import_react46.useState)(void 0);
  const [loading, setLoading] = (0, import_react46.useState)(true);
  const enrich = (0, import_react46.useCallback)((raw) => enrichFolha(raw, caderno.camposDeVerificacao || []), [caderno.camposDeVerificacao]);
  const doFetch = (0, import_react46.useCallback)(
    async (pagina) => {
      try {
        setLoading(true);
        const fetched = await fetchFolha((outFolha == null ? void 0 : outFolha.cadernoDeVerificacaoId) || caderno.id, pagina);
        const processed = enrich(fetched);
        onPersistFolha == null ? void 0 : onPersistFolha(processed);
        setFolha(processed);
      } catch (err) {
        console.error("Erro ao buscar folha de verificacao:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFolha, outFolha == null ? void 0 : outFolha.cadernoDeVerificacaoId, caderno.id, enrich, onPersistFolha]
  );
  (0, import_react46.useEffect)(() => {
    if ((outFolha == null ? void 0 : outFolha.id) && !(outFolha == null ? void 0 : outFolha.fetched) && paginaAtual) {
      doFetch(paginaAtual);
    } else if (outFolha) {
      setLoading(false);
      setFolha(enrich(outFolha));
    }
  }, [outFolha, paginaAtual, enrich, doFetch]);
  const atualizarRegistro = (0, import_react46.useCallback)((payload) => {
    setFolha((folhaAnterior) => {
      if (!folhaAnterior) return folhaAnterior;
      return {
        ...folhaAnterior,
        registrosDeCampo: folhaAnterior.registrosDeCampo.map(
          (registro2) => registro2.id === payload.id ? { ...registro2, ...payload } : registro2
        )
      };
    });
  }, []);
  return { folha: folha2, setFolha, loading, refresh: doFetch, atualizarRegistro };
}

// src/folha/FolhaDeVerificacao.tsx
var import_react48 = require("react");
var import_jsx_runtime39 = require("react/jsx-runtime");
var SORT_LABELS = {
  none: "Ordenar",
  campo_az: "Campo A->Z",
  campo_za: "Campo Z->A",
  data_asc: "Data \u2191",
  data_desc: "Data \u2193",
  usuario: "Usuario A->Z"
};
var normalizeString = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var FolhaDeVerificacao = ({
  paginaAtual,
  outFolha,
  otherParams = {},
  caderno,
  searchTerm,
  deleteRegistroDeCampo,
  markChangesDetected,
  regIdToAncor,
  onReplaceFolha,
  onCheckAllRegistros,
  onPersistFolha,
  fetchFolha,
  renderRegistroCard
}) => {
  const { folha: folha2, setFolha, loading, atualizarRegistro } = useFolhaFetcher({
    outFolha,
    paginaAtual,
    caderno,
    fetchFolha,
    onPersistFolha
  });
  const scrollAttempts = (0, import_react47.useRef)(0);
  const sortModeRef = (0, import_react47.useRef)("none");
  const [, force] = useReducerForce();
  const buildDataForFilter = (0, import_react47.useCallback)(
    (registroDeCampo) => {
      var _a, _b, _c, _d, _e, _f;
      if (!registroDeCampo) return {};
      return {
        ...registroDeCampo,
        _id: registroDeCampo.id,
        _label: ((_b = (_a = registroDeCampo == null ? void 0 : registroDeCampo.campoDeVerificacao) == null ? void 0 : _a.label) == null ? void 0 : _b.value) || ((_c = registroDeCampo == null ? void 0 : registroDeCampo.campoDeVerificacao) == null ? void 0 : _c.label),
        _parametro: ((_d = registroDeCampo.campoDeVerificacao.controle) == null ? void 0 : _d.nomeParametro) || ((_f = (_e = registroDeCampo.campoDeVerificacao.controle) == null ? void 0 : _e.parametro) == null ? void 0 : _f.nome) || registroDeCampo.campoDeVerificacao.descricao,
        isLate: registroDeCampo.isLate
      };
    },
    []
  );
  const oldestAndNewestMap = (0, import_react47.useMemo)(() => {
    const m = /* @__PURE__ */ new Map();
    if (!(folha2 == null ? void 0 : folha2.registrosDeCampo)) return m;
    const byCampo = /* @__PURE__ */ new Map();
    for (const r of folha2.registrosDeCampo) {
      const key = r.campoDeVerificacao.id;
      if (!byCampo.has(key)) byCampo.set(key, []);
      byCampo.get(key).push(r);
    }
    for (const [key, regs] of byCampo.entries()) {
      if (!Array.isArray(regs) || regs.length <= 1) continue;
      const oldest = regs[0];
      const newest = regs[regs.length - 1];
      m.set(key, {
        start: oldest.id ? oldest.id : oldest._localId,
        end: newest.id ? newest.id : newest._localId
      });
    }
    return m;
  }, [folha2 == null ? void 0 : folha2.registrosDeCampo]);
  const filteredRegistros = (0, import_react47.useMemo)(() => {
    if (!(folha2 == null ? void 0 : folha2.registrosDeCampo)) return [];
    const term = searchTerm ? normalizeString(searchTerm) : "";
    return folha2.registrosDeCampo.map((rc) => buildDataForFilter(rc)).filter((rc) => {
      if (!term) return true;
      const safeStr = (v) => v ? String(v) : "";
      const label = normalizeString(safeStr(rc._label));
      const parametro = normalizeString(safeStr(rc._parametro));
      const valor2 = normalizeString(safeStr(rc.valor));
      const usuario = normalizeString(safeStr(rc.nomeUsuario));
      return label.includes(term) || parametro.includes(term) || valor2.includes(term) || usuario.includes(term);
    });
  }, [folha2, searchTerm, buildDataForFilter]);
  const groupedRegistros = (0, import_react47.useMemo)(() => {
    const groups = /* @__PURE__ */ new Map();
    filteredRegistros.forEach((reg) => {
      var _a;
      const idCampo = String(((_a = reg.campoDeVerificacao) == null ? void 0 : _a.id) || "");
      if (!idCampo) return;
      if (!groups.has(idCampo)) groups.set(idCampo, []);
      groups.get(idCampo).push(reg);
    });
    return Array.from(groups.values()).map((group) => {
      const sortedGroup = group;
      const mainRegistro = sortedGroup[sortedGroup.length - 1];
      const history = sortedGroup.length > 1 ? sortedGroup.slice(0, -1) : [];
      return { mainRegistro, history };
    });
  }, [filteredRegistros]);
  const grouping = useGrouping(groupedRegistros);
  const sortedDisplayGroupTree = (0, import_react47.useMemo)(() => {
    const sortMode = sortModeRef.current;
    const tree = grouping.displayGroupTree;
    if (sortMode === "none") return tree;
    const sortFn = (a, b) => {
      var _a, _b, _c, _d;
      const ra = a.mainRegistro;
      const rb = b.mainRegistro;
      if (sortMode === "campo_az") return (ra._label || "").localeCompare(rb._label || "");
      if (sortMode === "campo_za") return (rb._label || "").localeCompare(ra._label || "");
      if (sortMode === "data_asc") {
        const da = new Date(ra.data || ((_a = ra.lastRegister) == null ? void 0 : _a.data) || 0).getTime();
        const db = new Date(rb.data || ((_b = rb.lastRegister) == null ? void 0 : _b.data) || 0).getTime();
        return da - db;
      }
      if (sortMode === "data_desc") {
        const da = new Date(ra.data || ((_c = ra.lastRegister) == null ? void 0 : _c.data) || 0).getTime();
        const db = new Date(rb.data || ((_d = rb.lastRegister) == null ? void 0 : _d.data) || 0).getTime();
        return db - da;
      }
      if (sortMode === "usuario") return (ra.nomeUsuario || "").localeCompare(rb.nomeUsuario || "");
      return 0;
    };
    const sortItems = (items) => [...items].sort(sortFn);
    return tree.map((g) => ({
      ...g,
      items: g.items ? sortItems(g.items) : null,
      subGroups: g.subGroups ? g.subGroups.map((sg) => ({ ...sg, items: sortItems(sg.items) })) : null
    }));
  }, [grouping.displayGroupTree, sortModeRef.current]);
  (0, import_react47.useEffect)(() => {
    if (!regIdToAncor || !folha2 || loading) return;
    const attemptScroll = () => {
      const el = document.getElementById(`registro-${regIdToAncor}`);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          const originalBg = el.style.backgroundColor;
          const originalTransition = el.style.transition;
          el.style.transition = "background-color 0.5s ease-in-out";
          el.style.backgroundColor = "rgba(253, 126, 20, 0.3)";
          setTimeout(() => {
            el.style.backgroundColor = originalBg;
            setTimeout(() => {
              el.style.transition = originalTransition;
            }, 500);
          }, 1500);
          scrollAttempts.current = 0;
        }, 300);
      } else if (scrollAttempts.current < 5) {
        scrollAttempts.current += 1;
        setTimeout(attemptScroll, 200);
      } else {
        scrollAttempts.current = 0;
      }
    };
    attemptScroll();
  }, [regIdToAncor, folha2, loading]);
  const addRegistroDeCampoChild = (0, import_react47.useCallback)(
    (fatherRegistro) => {
      if (!folha2) return;
      const folhaCopy = { ...folha2, registrosDeCampo: [...folha2.registrosDeCampo] };
      const novoRegistro = {
        ...fatherRegistro,
        id: void 0,
        fatherId: fatherRegistro.id,
        _localId: (0, import_uuid3.v4)(),
        data: (/* @__PURE__ */ new Date()).toISOString(),
        valor: "",
        isLate: false,
        style: void 0,
        errorMessage: void 0,
        justificativas: []
      };
      const registros = folhaCopy.registrosDeCampo;
      const key = fatherRegistro.campoDeVerificacao.id;
      const indices = registros.reduce((acc, registro2, i) => {
        if (registro2.campoDeVerificacao.id == key) acc.push(i);
        return acc;
      }, []);
      const insertIndex = indices.length > 0 ? Math.max(...indices) + 1 : registros.length;
      registros.splice(insertIndex, 0, novoRegistro);
      onReplaceFolha(folhaCopy);
    },
    [folha2, onReplaceFolha]
  );
  if (loading) return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.Spinner, {});
  if (!folha2) {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { className: "text-center mt-5", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { children: "Carregando dados da folha..." }) });
  }
  const groupingActive = grouping.groupingLevels[0] !== "none";
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { style: { marginTop: 12 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex gap-2 mb-3 flex-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_ui_kit_core34.DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
          "div",
          {
            className: "inline-flex items-center gap-1.5 cursor-pointer",
            style: {
              padding: "7px 10px",
              backgroundColor: groupingActive ? "#dbeafe" : "#f8f9fa",
              borderRadius: 10,
              border: `1px solid ${groupingActive ? "#93c5fd" : "#dee2e6"}`
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiLayers, { size: 16, color: groupingActive ? "#1d4ed8" : "#6c757d" }),
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { style: { fontSize: 12, fontWeight: 600, color: groupingActive ? "#1d4ed8" : "#6c757d" }, children: GROUP_LABELS[grouping.groupingLevels[0]] || "Agrupar" })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_ui_kit_core34.DropdownMenuContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuItem, { onSelect: () => grouping.setGroupingLevels(["none"]), children: "Sem agrupamento" }),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuSeparator, {}),
          ["preenchimento", "status", "usuario", "data", "tipoCampo", "descricao", "unidade", "frequencia"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            import_ui_kit_core34.DropdownMenuItem,
            {
              onSelect: () => {
                if (mode === "preenchimento" || mode === "status") grouping.resetFrozenKeys();
                grouping.setGroupingLevels((prev) => [mode, ...prev.length > 1 ? prev.slice(1) : []]);
              },
              children: `Por ${GROUP_LABELS[mode].toLowerCase()}`
            },
            mode
          ))
        ] })
      ] }),
      groupingActive && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_ui_kit_core34.DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
          "div",
          {
            className: "inline-flex items-center gap-1.5 cursor-pointer",
            style: {
              padding: "7px 10px",
              backgroundColor: grouping.groupingLevels[1] && grouping.groupingLevels[1] !== "none" ? "#dbeafe" : "#f8f9fa",
              borderRadius: 10,
              border: `1px solid ${grouping.groupingLevels[1] && grouping.groupingLevels[1] !== "none" ? "#93c5fd" : "#dee2e6"}`
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiLayers, { size: 14, color: grouping.groupingLevels[1] && grouping.groupingLevels[1] !== "none" ? "#1d4ed8" : "#6c757d" }),
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { style: { fontSize: 12, fontWeight: 600, color: grouping.groupingLevels[1] && grouping.groupingLevels[1] !== "none" ? "#1d4ed8" : "#6c757d" }, children: GROUP_LABELS[grouping.groupingLevels[1]] || "Sub-agrupar" })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_ui_kit_core34.DropdownMenuContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuItem, { onSelect: () => grouping.setGroupingLevels((prev) => [prev[0]]), children: "Sem sub-agrupamento" }),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuSeparator, {}),
          ["preenchimento", "status", "usuario", "data", "tipoCampo", "descricao", "unidade", "frequencia"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            import_ui_kit_core34.DropdownMenuItem,
            {
              onSelect: () => grouping.setGroupingLevels((prev) => [prev[0], mode]),
              children: `Por ${GROUP_LABELS[mode].toLowerCase()}`
            },
            mode
          ))
        ] })
      ] }),
      groupingActive && grouping.displayGroupTree.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
        "div",
        {
          onClick: grouping.toggleAllGroups,
          className: "inline-flex items-center gap-1.5 cursor-pointer",
          style: { padding: "7px 10px", backgroundColor: "#f8f9fa", borderRadius: 10, border: "1px solid #dee2e6" },
          children: [
            grouping.allGroupsCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiChevronsDown, { size: 16, color: "#6c757d" }) : /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiChevronsUp, { size: 16, color: "#6c757d" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { style: { fontSize: 12, fontWeight: 600, color: "#6c757d" }, children: grouping.allGroupsCollapsed ? "Expandir" : "Colapsar" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_ui_kit_core34.DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
          "div",
          {
            className: "inline-flex items-center gap-1.5 cursor-pointer",
            style: { padding: "7px 10px", backgroundColor: sortModeRef.current !== "none" ? "#e9ecef" : "#f8f9fa", borderRadius: 10, border: "1px solid #dee2e6" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiArrowDown, { size: 16, color: "#6c757d" }),
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { style: { fontSize: 12, fontWeight: 600, color: "#6c757d" }, children: SORT_LABELS[sortModeRef.current] })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_ui_kit_core34.DropdownMenuContent, { children: ["none", "campo_az", "campo_za", "data_asc", "data_desc", "usuario"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          import_ui_kit_core34.DropdownMenuItem,
          {
            onSelect: () => {
              sortModeRef.current = m;
              force();
            },
            children: SORT_LABELS[m]
          },
          m
        )) })
      ] })
    ] }),
    deleteRegistroDeCampo && folha2.id && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      "div",
      {
        className: "mb-3 rounded",
        style: { backgroundColor: "#f8f9fa", border: "1px solid #e5e7eb", padding: 12 },
        children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            "input",
            {
              type: "checkbox",
              disabled: !folha2.id,
              onChange: (e) => onCheckAllRegistros(folha2, e.target.checked)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { style: { fontSize: 14, fontWeight: 500 }, children: "Marcar todos os registros" })
        ] })
      }
    ),
    sortedDisplayGroupTree.map(({ path, label, items, subGroups }) => {
      var _a;
      const totalItems = subGroups ? subGroups.reduce((acc, sg) => acc + sg.items.length, 0) : (_a = items == null ? void 0 : items.length) != null ? _a : 0;
      return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { children: [
        label !== null && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
          "div",
          {
            onClick: () => grouping.toggleGroup(path),
            className: "flex items-center gap-2 cursor-pointer",
            style: {
              padding: "8px 12px",
              backgroundColor: "#f8f9fa",
              borderRadius: 8,
              border: "1px solid #dee2e6",
              marginBottom: grouping.collapsedGroups[path] ? 8 : 6
            },
            children: [
              grouping.collapsedGroups[path] ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiChevronsDown, { size: 14, color: "#495057" }) : /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiChevronsUp, { size: 14, color: "#495057" }),
              /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("span", { style: { fontWeight: 600, fontSize: 13, color: "#495057" }, children: [
                label,
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("span", { style: { fontWeight: 400, color: "#6c757d" }, children: [
                  "(",
                  totalItems,
                  ")"
                ] })
              ] })
            ]
          }
        ),
        !grouping.collapsedGroups[path] && (subGroups ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { style: { marginBottom: 12 }, children: subGroups.map(({ path: p2, label: l2, items: i2 }) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { style: { marginLeft: 16, marginBottom: 6 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
            "div",
            {
              onClick: () => grouping.toggleGroup(p2),
              className: "flex items-center gap-2 cursor-pointer",
              style: {
                padding: "6px 12px",
                backgroundColor: "#eef2ff",
                borderRadius: 8,
                border: "1px solid #c7d2fe",
                marginBottom: grouping.collapsedGroups[p2] ? 6 : 4
              },
              children: [
                grouping.collapsedGroups[p2] ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiChevronsDown, { size: 13, color: "#4338ca" }) : /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_fi10.FiChevronsUp, { size: 13, color: "#4338ca" }),
                /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("span", { style: { fontWeight: 600, fontSize: 12, color: "#4338ca" }, children: [
                  l2,
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("span", { style: { fontWeight: 400, color: "#6d7eba" }, children: [
                    "(",
                    i2.length,
                    ")"
                  ] })
                ] })
              ]
            }
          ),
          !grouping.collapsedGroups[p2] && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { className: "registro-card-grid", style: { marginBottom: 4 }, children: i2.map(
            ({ mainRegistro, history }, index) => renderRegistroCard({
              mainRegistro,
              history,
              index,
              addRegistroDeCampoChild,
              oldestAndNewestMap,
              paginaAtual,
              updateRegistroDeCampo: atualizarRegistro,
              folha: folha2,
              markChangesDetected,
              deleteRegistroDeCampo,
              otherParams
            })
          ) })
        ] }, p2)) }) : /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { className: "registro-card-grid", style: { marginBottom: label !== null ? 12 : 0 }, children: items == null ? void 0 : items.map(
          ({ mainRegistro, history }, index) => renderRegistroCard({
            mainRegistro,
            history,
            index,
            addRegistroDeCampoChild,
            oldestAndNewestMap,
            paginaAtual,
            updateRegistroDeCampo: atualizarRegistro,
            folha: folha2,
            markChangesDetected,
            deleteRegistroDeCampo,
            otherParams
          })
        ) }))
      ] }, path != null ? path : "__flat");
    }),
    (!folha2.registrosDeCampo || filteredRegistros.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      "div",
      {
        className: "text-center",
        style: { padding: 40, border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff" },
        children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("p", { style: { color: "#6c757d", margin: 0 }, children: "Nenhum registro encontrado com os filtros aplicados" })
      }
    )
  ] }) });
};
function useReducerForce() {
  const [n, dispatch] = (0, import_react48.useReducer)((x) => x + 1, 0);
  return [n, () => dispatch()];
}

// src/formula/FormulaEditor.tsx
var import_mathjs2 = require("mathjs");
var import_fi13 = require("react-icons/fi");
var import_md2 = require("react-icons/md");
var import_ui_kit_core35 = require("@hashcodeti/ui-kit-core");

// src/formula/hooks/useDragFormula.ts
var import_react49 = require("react");
function useDragFormula({ defaultFormula, onPersist }) {
  const [formulaDisplay, setFormulaDisplay] = (0, import_react49.useState)("");
  const [tokenMap, setTokenMap] = (0, import_react49.useState)(/* @__PURE__ */ new Map());
  const [tokenIndexMap, setTokenIndexMap] = (0, import_react49.useState)(/* @__PURE__ */ new Map());
  const [edited, setEdited] = (0, import_react49.useState)(false);
  const [formulaKey, setFormulaKey] = (0, import_react49.useState)(0);
  const [dropIndex, setDropIndex] = (0, import_react49.useState)(null);
  const inputRef = (0, import_react49.useRef)(null);
  const initializedRef = (0, import_react49.useRef)(false);
  const lastDefaultFormulaRef = (0, import_react49.useRef)(defaultFormula);
  const parseTokens = (0, import_react49.useCallback)((formula2) => {
    if (!formula2) return;
    const regex = /\[(!?[\w\s]+):([^\]]*?):([^\]]+?)\]/g;
    let match;
    let updatedDisplay = formula2;
    const tempTokenMap = /* @__PURE__ */ new Map();
    const tempTokenIndexMap = /* @__PURE__ */ new Map();
    let offset = 0;
    while ((match = regex.exec(formula2)) !== null) {
      const token = { name: `${match[1]}`, value: match[2], label: match[3] };
      tempTokenMap.set(token.name, token);
      const tokenStartIndex = match.index - offset;
      const tokenEndIndex = tokenStartIndex + token.name.length;
      updatedDisplay = updatedDisplay.slice(0, tokenStartIndex) + token.name + updatedDisplay.slice(tokenStartIndex + match[0].length);
      const currentPositions = tempTokenIndexMap.get(token.name) || [];
      tempTokenIndexMap.set(token.name, [...currentPositions, { start: tokenStartIndex, end: tokenEndIndex }]);
      offset += match[0].length - token.name.length;
    }
    setTokenMap(tempTokenMap);
    setTokenIndexMap(tempTokenIndexMap);
    setFormulaDisplay(updatedDisplay);
  }, []);
  (0, import_react49.useEffect)(() => {
    if (initializedRef.current && lastDefaultFormulaRef.current === defaultFormula) return;
    lastDefaultFormulaRef.current = defaultFormula;
    initializedRef.current = true;
    if (defaultFormula) {
      parseTokens(defaultFormula);
      setEdited(false);
      setFormulaKey((p) => p + 1);
    } else {
      setFormulaDisplay("");
      setTokenMap(/* @__PURE__ */ new Map());
      setTokenIndexMap(/* @__PURE__ */ new Map());
      setEdited(false);
      setFormulaKey((p) => p + 1);
    }
  }, [defaultFormula, parseTokens]);
  const replaceTokensInDisplay2 = (0, import_react49.useCallback)(() => {
    let out = formulaDisplay;
    for (const [key, token] of tokenMap.entries()) {
      out = out.replace(
        new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
        `[${key}:${token.value}:${token.label}]`
      );
    }
    return out;
  }, [formulaDisplay, tokenMap]);
  const saveFormula = (0, import_react49.useCallback)(
    (override) => {
      const toSave = override != null ? override : replaceTokensInDisplay2();
      if (edited) {
        setEdited(false);
        onPersist(toSave);
      }
    },
    [edited, replaceTokensInDisplay2, onPersist]
  );
  const getSegments = (0, import_react49.useCallback)(() => {
    if (!formulaDisplay) return [];
    const tokens = [];
    for (const [key, positions] of tokenIndexMap.entries()) {
      positions.forEach((pos) => tokens.push({ type: "token", key, ...pos, token: tokenMap.get(key) }));
    }
    tokens.sort((a, b) => a.start - b.start);
    const segments = [];
    let last = 0;
    const pushText = (text) => {
      const parts = text.split(/(\s*[\+\-\*\/\(\)\^]\s*)/g).filter((p) => p.trim() !== "");
      parts.forEach((p) => {
        const t = p.trim();
        if (/^[\+\-\*\/\(\)\^]$/.test(t)) segments.push({ type: "operator", value: t });
        else if (t !== "") segments.push({ type: "number", value: t });
      });
    };
    tokens.forEach((t) => {
      if (t.start > last) pushText(formulaDisplay.substring(last, t.start));
      segments.push({ type: "token", value: t.key, token: t.token, start: t.start, end: t.end });
      last = t.end;
    });
    if (last < formulaDisplay.length) pushText(formulaDisplay.substring(last));
    return segments;
  }, [formulaDisplay, tokenIndexMap, tokenMap]);
  const segmentsToRaw = (0, import_react49.useCallback)(
    (segs) => segs.map(
      (s) => s.type === "token" ? `[${s.value}:${s.token.value}:${s.token.label}]` : s.type === "operator" ? ` ${s.value} ` : s.value
    ).join(""),
    []
  );
  const rebuildFromSegments = (0, import_react49.useCallback)(
    (newSegs) => {
      let display = "";
      const newIdxMap = /* @__PURE__ */ new Map();
      newSegs.forEach((seg) => {
        const start = display.length;
        const chunk = seg.type === "operator" ? ` ${seg.value} ` : seg.value;
        display += chunk;
        const end = display.length;
        if (seg.type === "token") {
          const cur = newIdxMap.get(seg.value) || [];
          newIdxMap.set(seg.value, [...cur, { start, end }]);
        }
      });
      setTokenIndexMap(newIdxMap);
      setFormulaDisplay(display);
      setEdited(true);
      setFormulaKey((p) => p + 1);
      const raw = segmentsToRaw(newSegs);
      setTimeout(() => {
        onPersist(raw);
      }, 0);
    },
    [segmentsToRaw, onPersist]
  );
  const addTokenToFormula = (0, import_react49.useCallback)(
    (token) => {
      var _a, _b;
      let tokenName = `!${token.name.replace(/\s+/g, "")}`;
      let tokenLength = tokenName.length;
      const insertPosition = (_b = (_a = inputRef.current) == null ? void 0 : _a.selectionStart) != null ? _b : formulaDisplay.length;
      if (tokenMap.has(tokenName) && tokenMap.get(tokenName).value !== token.value) {
        tokenName = `${tokenName}_${Math.floor(Math.random() * 1e3)}`;
        tokenLength = tokenName.length;
      }
      const updatedDisplay = formulaDisplay.substring(0, insertPosition) + tokenName + formulaDisplay.substring(insertPosition);
      setTokenIndexMap((prev) => {
        const next = new Map(prev);
        const positions = next.get(tokenName) || [];
        next.set(tokenName, [...positions, { start: insertPosition, end: insertPosition + tokenLength }]);
        return next;
      });
      setTokenMap((prev) => new Map(prev).set(tokenName, token));
      setFormulaDisplay(updatedDisplay);
      setEdited(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(insertPosition + tokenLength, insertPosition + tokenLength);
          inputRef.current.focus();
        }
      }, 0);
    },
    [formulaDisplay, tokenMap]
  );
  const insertOperator = (0, import_react49.useCallback)((op) => rebuildFromSegments([...getSegments(), { type: "operator", value: op }]), [getSegments, rebuildFromSegments]);
  const insertNumber = (0, import_react49.useCallback)(
    (num) => {
      if (num) rebuildFromSegments([...getSegments(), { type: "number", value: num }]);
    },
    [getSegments, rebuildFromSegments]
  );
  const handleBackspace = (0, import_react49.useCallback)(
    (e) => {
      var _a;
      const cur = (_a = inputRef.current) == null ? void 0 : _a.selectionStart;
      if (!cur) return;
      let found = null;
      for (const [key, positions] of tokenIndexMap.entries()) {
        for (const pos of positions) {
          if (cur === pos.end) {
            found = { key, pos };
            break;
          }
        }
        if (found) break;
      }
      if (found) {
        const newDisplay2 = formulaDisplay.slice(0, found.pos.start) + formulaDisplay.slice(found.pos.end);
        setTokenIndexMap((prev) => {
          const m = new Map(prev);
          m.delete(found.key);
          return m;
        });
        setTokenMap((prev) => {
          const m = new Map(prev);
          m.delete(found.key);
          return m;
        });
        setFormulaDisplay(newDisplay2);
        setTimeout(() => {
          var _a2;
          return (_a2 = inputRef.current) == null ? void 0 : _a2.setSelectionRange(found.pos.start, found.pos.start);
        }, 0);
        e.preventDefault();
        return;
      }
      const newDisplay = formulaDisplay.slice(0, cur - 1) + formulaDisplay.slice(cur);
      setFormulaDisplay(newDisplay);
      setTokenIndexMap((prev) => {
        const m = new Map(prev);
        for (const [k, positions] of m.entries())
          m.set(
            k,
            positions.map((p) => p.start >= cur ? { start: p.start - 1, end: p.end - 1 } : p)
          );
        return m;
      });
      setTimeout(() => {
        var _a2;
        return (_a2 = inputRef.current) == null ? void 0 : _a2.setSelectionRange(cur - 1, cur - 1);
      }, 0);
      e.preventDefault();
    },
    [formulaDisplay, tokenIndexMap]
  );
  const handlePaste = (0, import_react49.useCallback)(
    (e) => {
      setEdited(true);
      e.preventDefault();
      parseTokens(formulaDisplay + e.clipboardData.getData("text"));
    },
    [formulaDisplay, parseTokens]
  );
  const handleCopy = (0, import_react49.useCallback)(
    (e, onAfterCopy) => {
      e.preventDefault();
      const raw = replaceTokensInDisplay2();
      e.clipboardData.setData("text/plain", raw);
      onAfterCopy == null ? void 0 : onAfterCopy(raw);
    },
    [replaceTokensInDisplay2]
  );
  const handleDeleteSegmentAt = (0, import_react49.useCallback)(
    (idx) => {
      const segs = [...getSegments()];
      segs.splice(idx, 1);
      rebuildFromSegments(segs);
    },
    [getSegments, rebuildFromSegments]
  );
  const handleDragStart = (0, import_react49.useCallback)(
    (e, idx, isPalette = false, pType = null, pValue = null) => {
      if (isPalette) {
        e.dataTransfer.setData("isPalette", "true");
        e.dataTransfer.setData("paletteType", pType || "");
        e.dataTransfer.setData("paletteValue", JSON.stringify(pValue));
      } else {
        e.dataTransfer.setData("dragIndex", String(idx));
        e.dataTransfer.setData("isPalette", "false");
      }
      ;
      e.target.style.opacity = "0.4";
    },
    []
  );
  const handleDragEnd = (0, import_react49.useCallback)((e) => {
    ;
    e.target.style.opacity = "1";
    setDropIndex(null);
  }, []);
  const handleDragOver = (0, import_react49.useCallback)((e, idx) => {
    e.preventDefault();
    setDropIndex(idx);
  }, []);
  const handleDrop = (0, import_react49.useCallback)(
    (e, targetIdx) => {
      e.preventDefault();
      setDropIndex(null);
      const isPalette = e.dataTransfer.getData("isPalette") === "true";
      const segs = getSegments();
      const newSegs = [...segs];
      if (isPalette) {
        const type2 = e.dataTransfer.getData("paletteType");
        const value = JSON.parse(e.dataTransfer.getData("paletteValue"));
        let seg = null;
        if (type2 === "token") seg = { type: "token", value: `!${value.name.replace(/\s+/g, "")}`, token: value };
        else if (type2 === "operator") seg = { type: "operator", value };
        else if (type2 === "number") seg = { type: "number", value };
        if (seg) newSegs.splice(targetIdx, 0, seg);
      } else {
        const src = parseInt(e.dataTransfer.getData("dragIndex"));
        if (isNaN(src) || src === targetIdx) return;
        const dragged = segs[src];
        newSegs.splice(src, 1);
        newSegs.splice(targetIdx > src ? targetIdx - 1 : targetIdx, 0, dragged);
      }
      rebuildFromSegments(newSegs);
    },
    [getSegments, rebuildFromSegments]
  );
  const clearAll = (0, import_react49.useCallback)(() => {
    rebuildFromSegments([]);
    setFormulaDisplay("");
    setTokenMap(/* @__PURE__ */ new Map());
    setTokenIndexMap(/* @__PURE__ */ new Map());
    setEdited(true);
  }, [rebuildFromSegments]);
  return {
    formulaDisplay,
    setFormulaDisplay,
    tokenMap,
    tokenIndexMap,
    formulaKey,
    edited,
    setEdited,
    inputRef,
    dropIndex,
    setDropIndex,
    getSegments,
    rebuildFromSegments,
    segmentsToRaw,
    replaceTokensInDisplay: replaceTokensInDisplay2,
    addTokenToFormula,
    insertOperator,
    insertNumber,
    handleBackspace,
    handlePaste,
    handleCopy,
    handleDeleteSegmentAt,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    saveFormula,
    clearAll,
    parseTokens
  };
}

// src/formula/tokens/tokenStyles.tsx
var import_fi11 = require("react-icons/fi");
var import_md = require("react-icons/md");
var import_jsx_runtime40 = require("react/jsx-runtime");
var TOKEN_STYLES = {
  valorCorrigido: { bg: "#1a56db", border: "#1e40af", label: "Valor Alvo", icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fi11.FiTarget, { size: 11 }) },
  valorReal: { bg: "#0e9f6e", border: "#065f46", label: "Valor Atual", icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fi11.FiActivity, { size: 11 }) },
  controle: { bg: "#7e3af2", border: "#4c1d95", label: "Controle", icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_md.MdSensors, { size: 12 }) },
  campoVirtual: { bg: "#d97706", border: "#92400e", label: "Campo Manual", icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fi11.FiEdit2, { size: 11 }) },
  campoDeVerificacao: { bg: "#0694a2", border: "#164e63", label: "Campo Ref.", icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fi11.FiBookOpen, { size: 11 }) },
  _default: { bg: "#374151", border: "#111827", label: "Variavel", icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fi11.FiGrid, { size: 11 }) }
};
var getTokenStyle = (label) => {
  var _a;
  return (_a = TOKEN_STYLES[label]) != null ? _a : TOKEN_STYLES._default;
};

// src/formula/tokens/TokenBadge.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
var TokenBadge = ({
  styleKey,
  text,
  iconOverride,
  draggable,
  onDragStart,
  onDragEnd,
  onClick,
  cursor = "grab"
}) => {
  const s = getTokenStyle(styleKey);
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
    "button",
    {
      type: "button",
      draggable,
      onDragStart,
      onDragEnd,
      onClick,
      style: {
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 6,
        color: "#fff",
        fontSize: "0.78rem",
        fontWeight: 600,
        cursor,
        padding: "4px 12px"
      },
      className: "inline-flex items-center gap-1.5",
      children: [
        iconOverride != null ? iconOverride : s.icon,
        " ",
        text
      ]
    }
  );
};

// src/formula/tokens/TokenDragItem.tsx
var import_react50 = require("react");
var import_fi12 = require("react-icons/fi");
var import_jsx_runtime42 = require("react/jsx-runtime");
var TokenDragItem = ({ seg, idx, onDragStart, onDragEnd, onDelete }) => {
  var _a, _b, _c;
  const [hovered, setHovered] = (0, import_react50.useState)(false);
  const style = seg.type === "token" ? getTokenStyle((_a = seg.token) == null ? void 0 : _a.label) : null;
  const bg = seg.type === "token" ? style.bg : seg.type === "operator" ? "#f3f4f6" : "#1f2937";
  const color = seg.type === "token" || seg.type === "number" ? "#fff" : "#374151";
  const border = seg.type === "token" ? style.border : seg.type === "operator" ? "#d1d5db" : "#111";
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
    "div",
    {
      draggable: true,
      onDragStart: (e) => onDragStart(e, idx),
      onDragEnd,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className: "inline-flex items-center relative select-none",
      style: {
        cursor: "grab",
        borderRadius: 6,
        margin: "2px 1px",
        height: 30,
        padding: "0 10px",
        fontSize: "0.82rem",
        fontWeight: 600,
        background: bg,
        color,
        border: `1.5px solid ${border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,.12)",
        transition: "opacity .1s"
      },
      children: [
        seg.type === "token" && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { style: { marginRight: 5, opacity: 0.85 }, className: "flex items-center", children: style.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { className: "truncate", style: { maxWidth: 100 }, children: seg.type === "token" ? (_c = (_b = seg.token) == null ? void 0 : _b.name) != null ? _c : seg.value : seg.value }),
        hovered && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
          "div",
          {
            onClick: (e) => {
              e.stopPropagation();
              onDelete(idx);
            },
            className: "flex items-center justify-center cursor-pointer",
            style: {
              position: "absolute",
              top: -7,
              right: -7,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#ef4444",
              color: "#fff",
              fontSize: 9,
              border: "2px solid #fff",
              boxShadow: "0 1px 4px rgba(0,0,0,.25)",
              zIndex: 10
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_fi12.FiX, { size: 9 })
          }
        )
      ]
    }
  );
};

// src/formula/FormulaEditor.tsx
var import_react51 = require("react");
var import_jsx_runtime43 = require("react/jsx-runtime");
var PALETTE_TOKENS = [
  { name: "ValorAlvo", label: "valorCorrigido", value: "V0", display: "Valor Alvo" },
  { name: "ValorAtual", label: "valorReal", value: "Vat", display: "Valor Atual" }
];
var FormulaEditor = ({
  defaultFormula,
  saveCallBack,
  title = "Editor de Formula",
  resultLabel = "Resultado Simulado",
  resultUnit = "",
  onNotify = () => {
  },
  renderReferenciaPicker
}) => {
  var _a, _b;
  const f = useDragFormula({ defaultFormula, onPersist: saveCallBack });
  const [showTextEditor, setShowTextEditor] = (0, import_react51.useState)(false);
  const [showRawFormula, setShowRawFormula] = (0, import_react51.useState)(false);
  const [showPlayground, setShowPlayground] = (0, import_react51.useState)(false);
  const [simulationValues, setSimulationValues] = (0, import_react51.useState)({});
  const [showVirtualModal, setShowVirtualModal] = (0, import_react51.useState)(false);
  const [showFieldPickerModal, setShowFieldPickerModal] = (0, import_react51.useState)(false);
  const [showControleModal, setShowControleModal] = (0, import_react51.useState)(false);
  const [newToken, setNewToken] = (0, import_react51.useState)({ name: "", label: "" });
  const [campo, setCampo] = (0, import_react51.useState)(null);
  const [controleRef, setControleRef] = (0, import_react51.useState)(null);
  const [invalidAction] = (0, import_react51.useState)(false);
  const evaluateFormula = () => {
    try {
      if (!f.formulaDisplay) return null;
      let raw = f.replaceTokensInDisplay();
      f.tokenMap.forEach((token, key) => {
        var _a2;
        const simVal = (_a2 = simulationValues[key]) != null ? _a2 : 0;
        const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        raw = raw.replace(
          new RegExp(`\\[${esc}:${String(token.value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:${token.label}\\]`, "g"),
          simVal
        );
      });
      const result = (0, import_mathjs2.evaluate)(raw.replace(/,/g, "."));
      return typeof result === "number" ? parseFloat(result.toFixed(4)) : result;
    } catch (e) {
      return "Erro";
    }
  };
  const renderPicker = (onSelect) => renderReferenciaPicker({ onSelect });
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { marginTop: 12, marginBottom: 8 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-2 mb-3.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_md2.MdOutlineCalculate, { size: 20, style: { color: "#1a56db", flexShrink: 0 } }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { fontWeight: 700, fontSize: "0.95rem", color: "#111827" }, children: title })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-1.5 mb-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiGrid, { size: 13, style: { color: "#6b7280" } }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { fontSize: "0.72rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }, children: "Paleta de Componentes" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { className: "ml-auto", style: { fontSize: "0.68rem", color: "#9ca3af" }, children: "Clique ou arraste para a formula" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { fontSize: "0.68rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }, children: "Valores de Referencia" }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "flex gap-1.5 flex-wrap", children: PALETTE_TOKENS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.Tooltip, { content: `${getTokenStyle(t.label).label} \u2014 inserido diretamente na formula`, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
            TokenBadge,
            {
              styleKey: t.label,
              text: t.display,
              draggable: true,
              onDragStart: (e) => f.handleDragStart(e, -1, true, "token", t),
              onDragEnd: f.handleDragEnd,
              onClick: () => f.addTokenToFormula(t)
            }
          ) }) }, t.name)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { fontSize: "0.68rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }, children: "Controle" }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.Tooltip, { content: "Ultimo valor registrado de um controle do caderno", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
            TokenBadge,
            {
              styleKey: "controle",
              text: "+ Referenciar Controle",
              iconOverride: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_md2.MdSensors, { size: 13 }),
              cursor: "pointer",
              onClick: () => setShowControleModal(true)
            }
          ) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { fontSize: "0.68rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }, children: "Entrada do Usuario" }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.Tooltip, { content: "Campo preenchido pelo usuario no momento do calculo", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
            TokenBadge,
            {
              styleKey: "campoVirtual",
              text: "+ Campo Manual",
              iconOverride: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiEdit2, { size: 12 }),
              cursor: "pointer",
              onClick: () => setShowVirtualModal(true)
            }
          ) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { fontSize: "0.68rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }, children: "Campo de Verificacao" }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.Tooltip, { content: "Valor de um campo especifico do caderno de verificacao", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
            TokenBadge,
            {
              styleKey: "campoDeVerificacao",
              text: "+ Campo do Caderno",
              iconOverride: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiBookOpen, { size: 12 }),
              cursor: "pointer",
              onClick: () => setShowFieldPickerModal(true)
            }
          ) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { fontSize: "0.68rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }, children: "Operadores" }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "flex gap-1 flex-wrap", children: ["+", "-", "*", "/", "^", "(", ")"].map((op) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
            "button",
            {
              draggable: true,
              onDragStart: (e) => f.handleDragStart(e, -1, true, "operator", op),
              onDragEnd: f.handleDragEnd,
              onClick: () => f.insertOperator(op),
              className: "inline-flex items-center justify-center",
              style: {
                background: "#fff",
                border: "1.5px solid #d1d5db",
                borderRadius: 6,
                color: "#374151",
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "grab",
                minWidth: 34,
                height: 32
              },
              children: op
            },
            op
          )) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { fontSize: "0.68rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }, children: "Constante" }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex gap-1 items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
              "input",
              {
                type: "number",
                placeholder: "0",
                id: "quickNumber",
                style: { width: 68, height: 32, fontSize: "0.82rem" },
                className: "rounded border border-gray-300 px-2"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
              "button",
              {
                onClick: () => {
                  const el = document.getElementById("quickNumber");
                  f.insertNumber(el.value);
                  el.value = "";
                },
                className: "flex items-center justify-center",
                style: {
                  background: "#111827",
                  border: "none",
                  borderRadius: 6,
                  color: "#fff",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "1rem"
                },
                children: "+"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_md2.MdFunctions, { size: 14, style: { color: "#6b7280" } }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { fontSize: "0.72rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }, children: "Construtor Visual" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { className: "ml-auto", style: { fontSize: "0.68rem", color: "#9ca3af" }, children: "Reordene arrastando" }),
        f.formulaDisplay && /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
          "button",
          {
            onClick: () => f.clearAll(),
            className: "flex items-center gap-1",
            style: { background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: "0.72rem", padding: 0 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiRefreshCw, { size: 11 }),
              " Limpar"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
        "div",
        {
          className: "flex flex-wrap items-center",
          style: {
            minHeight: 64,
            border: "2px dashed #bfdbfe",
            borderRadius: 10,
            background: "#f0f9ff",
            padding: "10px 12px",
            transition: "border-color .2s"
          },
          children: [
            (() => {
              const segs = f.getSegments();
              const items = [];
              const DropZone = ({ idx }) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                "div",
                {
                  onDragOver: (e) => f.handleDragOver(e, idx),
                  onDragLeave: () => f.setDropIndex(null),
                  onDrop: (e) => f.handleDrop(e, idx),
                  style: {
                    width: f.dropIndex === idx ? 14 : 6,
                    height: 30,
                    borderRadius: 4,
                    background: f.dropIndex === idx ? "#f59e0b" : "transparent",
                    transition: "all .15s",
                    display: "inline-block",
                    margin: "0 1px",
                    boxShadow: f.dropIndex === idx ? "0 0 6px rgba(245,158,11,.5)" : "none"
                  }
                },
                `dz-${idx}`
              );
              segs.forEach((seg, idx) => {
                if (idx === 0) items.push(/* @__PURE__ */ (0, import_jsx_runtime43.jsx)(DropZone, { idx: 0 }, `dz-${idx}`));
                items.push(
                  /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                    TokenDragItem,
                    {
                      seg,
                      idx,
                      onDragStart: f.handleDragStart,
                      onDragEnd: f.handleDragEnd,
                      onDelete: f.handleDeleteSegmentAt
                    },
                    `seg-${idx}`
                  )
                );
                items.push(/* @__PURE__ */ (0, import_jsx_runtime43.jsx)(DropZone, { idx: idx + 1 }, `dz-${idx + 1}`));
              });
              return items;
            })(),
            f.formulaDisplay === "" && /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "w-full text-center", style: { color: "#93c5fd", fontSize: "0.8rem", padding: "8px 0" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_md2.MdFunctions, { size: 22, style: { display: "block", margin: "0 auto 4px" } }),
              "Arraste os componentes da paleta ou clique neles para construir o calculo"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex gap-4 items-center mb-1 flex-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
        "button",
        {
          onClick: () => setShowTextEditor((p) => !p),
          className: "flex items-center gap-1",
          style: { background: "none", border: "none", cursor: "pointer", color: showTextEditor ? "#1a56db" : "#6b7280", fontSize: "0.75rem", padding: 0, fontWeight: showTextEditor ? 700 : 400 },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiTerminal, { size: 12 }),
            " Editor de Texto"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
        "button",
        {
          onClick: () => setShowPlayground((p) => !p),
          className: "flex items-center gap-1",
          style: { background: "none", border: "none", cursor: "pointer", color: showPlayground ? "#059669" : "#6b7280", fontSize: "0.75rem", padding: 0, fontWeight: showPlayground ? 700 : 400 },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiSliders, { size: 12 }),
            " Playground de Simulacao"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
        "button",
        {
          onClick: () => setShowRawFormula((p) => !p),
          className: "flex items-center gap-1",
          style: { background: "none", border: "none", cursor: "pointer", color: showRawFormula ? "#7e3af2" : "#6b7280", fontSize: "0.75rem", padding: 0, fontWeight: showRawFormula ? 700 : 400 },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiCode, { size: 12 }),
            " Token Interno"
          ]
        }
      )
    ] }),
    showTextEditor && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { marginBottom: 8, marginTop: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      "input",
      {
        id: "formulaBuilder",
        autoComplete: "off",
        value: f.formulaDisplay,
        type: "text",
        ref: f.inputRef,
        className: "w-full rounded",
        style: { fontFamily: "monospace", fontSize: "0.85rem", background: "#1e293b", color: "#e2e8f0", border: invalidAction ? "1px solid #ef4444" : "none", padding: "6px 10px" },
        placeholder: "Ex: (!ValorAtual - 10) * 2",
        onKeyDown: (e) => {
          if (e.key === "Backspace") {
            f.setEdited(true);
            f.handleBackspace(e);
          }
        },
        onBlur: () => f.saveFormula(),
        onPaste: (e) => f.handlePaste(e),
        onChange: (e) => {
          f.setEdited(true);
          f.setFormulaDisplay(e.target.value);
        },
        onCopy: (e) => f.handleCopy(e, () => onNotify("Formula copiada com tokens internos.", "success"))
      },
      `fe-${f.formulaKey}`
    ) }),
    showRawFormula && /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { background: "#0f172a", borderRadius: 8, padding: "8px 12px", marginBottom: 8, fontFamily: "monospace", fontSize: "0.75rem", color: "#94a3b8", wordBreak: "break-all" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { color: "#7e3af2" }, children: "TOKEN: " }),
      f.replaceTokensInDisplay() || "\u2014"
    ] }),
    showPlayground && /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 16, marginBottom: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-1.5 mb-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiSliders, { size: 14, style: { color: "#059669" } }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { fontSize: "0.8rem", fontWeight: 700, color: "#065f46" }, children: "Simulacao de Valores" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "lg:col-span-2", children: f.tokenMap.size === 0 ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { color: "#6b7280", fontSize: "0.8rem", padding: "12px 0" }, children: "Nenhuma variavel na formula." }) : /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "flex flex-wrap gap-3", children: [...f.tokenMap.entries()].map(([key, token]) => {
          var _a2, _b2;
          const s = getTokenStyle(token.label);
          return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { minWidth: 140 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-1 mb-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { color: s.bg }, className: "flex items-center", children: s.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { fontSize: "0.72rem", fontWeight: 700, color: "#374151" }, children: (_a2 = token.name) != null ? _a2 : key })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
              "input",
              {
                type: "number",
                placeholder: "0.00",
                value: (_b2 = simulationValues[key]) != null ? _b2 : "",
                onChange: (e) => setSimulationValues((p) => ({ ...p, [key]: e.target.value })),
                className: "w-full rounded px-2 py-1",
                style: { borderColor: s.bg, borderWidth: 1, fontSize: "0.82rem" }
              }
            )
          ] }, key);
        }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "lg:col-span-1", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
          "div",
          {
            className: "flex flex-col items-center justify-center text-center",
            style: { background: "#047857", borderRadius: 10, padding: 16, minHeight: 80 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { fontSize: "0.65rem", color: "rgba(255,255,255,.7)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }, children: resultLabel.toUpperCase() }),
              (() => {
                const res = evaluateFormula();
                if (res === null) return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { color: "rgba(255,255,255,.4)", fontSize: "1.4rem" }, children: "\u2014" });
                if (res === "Erro")
                  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-1.5", style: { color: "#fcd34d" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiAlertCircle, { size: 18 }),
                    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { fontSize: "0.8rem" }, children: "Formula invalida" })
                  ] });
                return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { color: "#fff", fontSize: "1.6rem", fontWeight: 800 }, children: [
                  res,
                  resultUnit && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { style: { fontSize: "0.9rem", opacity: 0.7, marginLeft: 4 }, children: resultUnit })
                ] });
              })()
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.Modal, { open: showVirtualModal, onOpenChange: setShowVirtualModal, size: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.ModalHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("span", { style: { fontSize: "0.95rem", fontWeight: 700 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiEdit2, { size: 14, style: { marginRight: 6, display: "inline" } }),
        "Campo Manual (Entrada do Usuario)"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.ModalBody, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("label", { style: { fontSize: "0.82rem", fontWeight: 600 }, children: "Nome da variavel" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          "input",
          {
            type: "text",
            placeholder: "Ex: VolumeDoTanque",
            autoFocus: true,
            className: "w-full rounded border border-gray-300 px-2 py-1 mt-1",
            onChange: (e) => setNewToken({ name: e.target.value.trim(), label: "campoVirtual" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("p", { style: { fontSize: "0.72rem", color: "#6b7280", marginTop: 6 }, children: "O usuario preenchera este valor ao executar o calculo." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.ModalFooter, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.Button, { variant: "secondary", size: "sm", onClick: () => setShowVirtualModal(false), children: "Cancelar" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          import_ui_kit_core35.Button,
          {
            variant: "primary",
            size: "sm",
            onClick: () => {
              if (newToken.name) {
                f.addTokenToFormula({ name: newToken.name, label: "campoVirtual", value: "virtual" });
                setShowVirtualModal(false);
                setNewToken({ name: "", label: "" });
              }
            },
            children: "Inserir"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.Modal, { open: showFieldPickerModal, onOpenChange: setShowFieldPickerModal, size: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.ModalHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("span", { style: { fontSize: "0.95rem", fontWeight: 700 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi13.FiBookOpen, { size: 14, style: { marginRight: 6, display: "inline" } }),
        "Selecionar Campo de Verificacao"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.ModalBody, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("label", { style: { fontSize: "0.82rem", fontWeight: 600 }, children: "Nome da variavel na formula" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          "input",
          {
            type: "text",
            placeholder: "Ex: LarguraMedida",
            className: "w-full rounded border border-gray-300 px-2 py-1 mt-1 mb-3",
            onChange: (e) => setNewToken({ name: e.target.value.trim(), label: "campoDeVerificacao" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("label", { style: { fontSize: "0.82rem", fontWeight: 600 }, children: "Escolha o campo no caderno" }),
          renderPicker((c) => setCampo(c))
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.ModalFooter, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.Button, { variant: "secondary", size: "sm", onClick: () => setShowFieldPickerModal(false), children: "Cancelar" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          import_ui_kit_core35.Button,
          {
            size: "sm",
            style: { background: TOKEN_STYLES.campoDeVerificacao.bg, border: "none", color: "#fff" },
            onClick: () => {
              if (!newToken.name) return onNotify("Digite um nome para a variavel.", "warning");
              if (!(campo == null ? void 0 : campo.id)) return onNotify("Selecione um campo do caderno.", "warning");
              f.addTokenToFormula({ name: newToken.name, label: "campoDeVerificacao", value: campo.id });
              setShowFieldPickerModal(false);
              setNewToken({ name: "", label: "" });
              setCampo(null);
            },
            children: "Inserir Campo"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.Modal, { open: showControleModal, onOpenChange: setShowControleModal, size: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.ModalHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("span", { style: { fontSize: "0.95rem", fontWeight: 700 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_md2.MdSensors, { size: 16, style: { marginRight: 6, display: "inline" } }),
        "Referenciar Controle"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.ModalBody, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("p", { style: { fontSize: "0.82rem", color: "#6b7280", marginBottom: 12 }, children: [
          "Selecione o controle de referencia. O sistema resolvera automaticamente para o",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("strong", { children: "ultimo valor registrado" }),
          " do campo associado a este controle."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("label", { style: { fontSize: "0.82rem", fontWeight: 600 }, children: "Nome da variavel na formula" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          "input",
          {
            type: "text",
            placeholder: "Ex: PressaoDeControle",
            className: "w-full rounded border border-gray-300 px-2 py-1 mt-1 mb-3",
            onChange: (e) => setNewToken({ name: e.target.value.trim(), label: "controle" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { style: { border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("label", { style: { fontSize: "0.82rem", fontWeight: 600 }, children: "Escolha o campo de controle" }),
          renderPicker((c) => setControleRef(c))
        ] }),
        controleRef && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { marginTop: 10, padding: "8px 12px", background: "#f5f3ff", borderRadius: 8, border: "1px solid #ddd6fe" }, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("span", { style: { fontSize: "0.75rem", color: "#7e3af2", fontWeight: 600 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_md2.MdSensors, { size: 12, style: { marginRight: 4, display: "inline" } }),
          "Controle selecionado: ",
          (_b = (_a = controleRef.label) != null ? _a : controleRef.descricao) != null ? _b : controleRef.id
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_ui_kit_core35.ModalFooter, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_ui_kit_core35.Button, { variant: "secondary", size: "sm", onClick: () => setShowControleModal(false), children: "Cancelar" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          import_ui_kit_core35.Button,
          {
            size: "sm",
            style: { background: TOKEN_STYLES.controle.bg, border: "none", color: "#fff" },
            onClick: () => {
              var _a2;
              if (!newToken.name) return onNotify("Digite um nome para a variavel.", "warning");
              const refValue = (_a2 = controleRef == null ? void 0 : controleRef.controleRefId) != null ? _a2 : controleRef == null ? void 0 : controleRef.id;
              if (!refValue) return onNotify("Selecione um campo de controle.", "warning");
              f.addTokenToFormula({ name: newToken.name, label: "controle", value: refValue });
              setShowControleModal(false);
              setNewToken({ name: "", label: "" });
              setControleRef(null);
            },
            children: "Inserir Controle"
          }
        )
      ] })
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutorizacaoCard,
  AutorizacaoRejeicaoModal,
  BadgePendenteAutorizacao,
  CadernoDeVerificacaoHeader,
  CalculadoraCorrecaoModal,
  CalculoCorrecao,
  CampoDeVerificacaoSelectableCards,
  CampoDeVerificacaoV2,
  ChartStats,
  ChartWithStats,
  ControleDashboardCard,
  ControleSelector,
  EstatisticaDoControleDashBoard,
  EstatisticasFrequenciaDashboard,
  FluxoEdge,
  FluxoLegend,
  FluxoNode,
  FluxoToolbar,
  FolhaDeVerificacao,
  FormulaBuilderOffcanvas,
  FormulaEditor,
  FrequenciaFormV2,
  FrequenciaPicker,
  GROUP_LABELS,
  HistoryModal,
  JustificativaModal,
  MaterialApontarCard,
  OrdemDeCorrecaoCard,
  PlanoBadgeSelector,
  PlanoDashboardCard,
  PresetSaveModal,
  ReferenciaDinamicaPicker,
  RegistroDeCampoCardView,
  RegistroDeCampoField,
  RegistroviewDashboardCard,
  RelatorioModernCard,
  RelatorioModernWrapper,
  SheetOrdenationCard,
  TIPO_CONFIG,
  TOKEN_STYLES,
  TarefaApontarCard,
  TarefaCard,
  TarefaUnidadeForm,
  TokenBadge,
  TokenDragItem,
  UnidadeMaterialCard,
  getTokenStyle,
  useAnexoManager,
  useDragFormula,
  useFolhaFetcher,
  useGrouping,
  useHistory,
  useJustificativaModal,
  useRegistroStyle
});
