var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// ../../node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "../../node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal2(a, b) {
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

// src/correcao/CalculoCorrecao.tsx
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const [camposVirtuais2, setCamposVirtuais] = useState([]);
  useEffect(() => {
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
  const updateValorCampoVirtual = (valor, campoVirtual) => {
    const changedCampos = camposVirtuais2.map(
      (cV) => cV.id === campoVirtual.id ? { ...cV, valor } : cV
    );
    addCalculoHandler({ ...calculo, camposVirtuais: changedCampos });
    setCamposVirtuais(changedCampos);
  };
  return /* @__PURE__ */ jsx(Card, { className: "mb-3", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
    /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsxs(Col, { children: [
      /* @__PURE__ */ jsx(Card.Title, { children: (_a = calculo.material) == null ? void 0 : _a.nome }),
      /* @__PURE__ */ jsxs(Card.Text, { children: [
        /* @__PURE__ */ jsx("strong", { children: "F\xF3rmula:" }),
        " ",
        calculo.formula ? replaceTokensInDisplay(calculo.formula) : ""
      ] })
    ] }) }),
    camposVirtuais2.map((cV) => /* @__PURE__ */ jsxs(Form.Group, { children: [
      /* @__PURE__ */ jsx(Form.Label, { children: cV.name }),
      /* @__PURE__ */ jsx(
        Form.Control,
        {
          type: "number",
          placeholder: "Insira o valor desejado",
          value: cV.valor,
          onChange: (e) => updateValorCampoVirtual(e.target.value, cV)
        }
      )
    ] }, cV.id))
  ] }) });
};

// src/correcao/CalculadoraCorrecaoModal.tsx
import { useState as useState2, useEffect as useEffect2 } from "react";
import { Modal, Button, Form as Form2, Card as Card2, ListGroup } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var AsyncConfirmButton = ({
  onClick,
  variant = "success",
  children
}) => {
  const [loading, setLoading] = useState2(false);
  const handle = async () => {
    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx2(Button, { variant, disabled: loading, onClick: handle, children: loading ? "Processando..." : children });
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
  const [valorDesejado, setValorDesejado] = useState2("");
  const [regraSelecionada, setRegraSelecionada] = useState2(null);
  const [resultadosCalculado, setResultadosCalculado] = useState2(null);
  const [calculado, setCalculado] = useState2(false);
  const [calculosToUse, setCalculosToUse] = useState2([]);
  const [mostrarDetalhes, setMostrarDetalhes] = useState2(false);
  const [editingIndex, setEditingIndex] = useState2(null);
  const [editValues, setEditValues] = useState2({});
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
  useEffect2(() => {
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
  useEffect2(() => {
    if (show) {
      setValorDesejado("");
      setRegraSelecionada(null);
      setCalculado(false);
      setMostrarDetalhes(false);
    }
  }, [show]);
  useEffect2(() => {
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
  return /* @__PURE__ */ jsxs2(Modal, { show, onHide: () => onClose(false), children: [
    /* @__PURE__ */ jsx2(Modal.Header, { closeButton: true, children: /* @__PURE__ */ jsx2(Modal.Title, { children: "Calculadora de Corre\xE7\xE3o" }) }),
    /* @__PURE__ */ jsxs2(Modal.Body, { children: [
      /* @__PURE__ */ jsxs2("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx2("strong", { children: "Valor Atual:" }),
        " ",
        parseFloat(String(valorAtual)).toFixed(2)
      ] }),
      /* @__PURE__ */ jsxs2(Form2, { children: [
        /* @__PURE__ */ jsxs2(Form2.Group, { controlId: "valorDesejado", children: [
          /* @__PURE__ */ jsx2(Form2.Label, { children: "Valor Desejado" }),
          /* @__PURE__ */ jsxs2("div", { className: "d-flex align-items-center", children: [
            parseFloat(valorDesejado.replace(",", ".")) > Number(valorAtual) ? /* @__PURE__ */ jsx2(
              FaArrowUp,
              {
                style: { color: "green", fontSize: "16px", marginRight: "8px" }
              }
            ) : parseFloat(valorDesejado.replace(",", ".")) < Number(valorAtual) ? /* @__PURE__ */ jsx2(
              FaArrowDown,
              {
                style: { color: "red", fontSize: "16px", marginRight: "8px" }
              }
            ) : null,
            /* @__PURE__ */ jsx2(
              Form2.Control,
              {
                type: "text",
                placeholder: "Insira o valor desejado",
                value: valorDesejado,
                onChange: (e) => setValorDesejado(e.target.value)
              }
            )
          ] })
        ] }),
        regraSelecionada && /* @__PURE__ */ jsxs2("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsx2("strong", { children: "Regra Selecionada:" }),
          /* @__PURE__ */ jsx2(
            Button,
            {
              variant: "link",
              onClick: () => setMostrarDetalhes(!mostrarDetalhes),
              style: { padding: 0, marginLeft: "8px" },
              children: mostrarDetalhes ? "Ocultar" : "Mostrar"
            }
          ),
          mostrarDetalhes && /* @__PURE__ */ jsxs2("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxs2("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx2("strong", { children: "A\xE7\xE3o:" }),
              " ",
              (_a = regraSelecionada.acao) == null ? void 0 : _a.nome,
              /* @__PURE__ */ jsx2("br", {}),
              /* @__PURE__ */ jsx2("strong", { children: "Descri\xE7\xE3o:" }),
              " ",
              (_b = regraSelecionada.acao) == null ? void 0 : _b.descricao
            ] }),
            /* @__PURE__ */ jsx2("h3", { children: "C\xE1lculos" }),
            (_c = regraSelecionada.calculosDeCorrecao) == null ? void 0 : _c.map((calculo) => /* @__PURE__ */ jsx2(
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
      resultadosCalculado && /* @__PURE__ */ jsx2(Card2, { className: "mb-3", children: /* @__PURE__ */ jsxs2(Card2.Body, { className: "resultados mt-4", children: [
        /* @__PURE__ */ jsx2("h5", { className: "mb-3", children: "Descri\xE7\xE3o da A\xE7\xE3o" }),
        /* @__PURE__ */ jsx2("p", { className: "text-muted", children: (_d = regraSelecionada == null ? void 0 : regraSelecionada.acao) == null ? void 0 : _d.descricao }),
        /* @__PURE__ */ jsx2("h6", { className: "mt-4", children: "Valores Calculados:" }),
        /* @__PURE__ */ jsx2(ListGroup, { children: resultadosCalculado.map((rC, index) => /* @__PURE__ */ jsx2(
          ListGroup.Item,
          {
            onClick: () => handleEditStart(index),
            children: editingIndex === index ? /* @__PURE__ */ jsx2(
              Form2.Control,
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
    /* @__PURE__ */ jsxs2(Modal.Footer, { children: [
      /* @__PURE__ */ jsx2(Button, { variant: "secondary", onClick: () => onClose(false), children: "Fechar" }),
      /* @__PURE__ */ jsx2(Button, { variant: "info", onClick: calcularResultado, disabled: !regraSelecionada, children: "Calcular" }),
      calculado && /* @__PURE__ */ jsx2(AsyncConfirmButton, { onClick: handleConfirm, children: "Confirmar" })
    ] })
  ] });
};
var CalculadoraCorrecaoModal_default = CalculadoraCorrecaoModal;

// src/tarefa-unidade/UnidadeMaterialCard.tsx
import { Button as Button2, Card as Card3, Col as Col2 } from "react-bootstrap";
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx3(Col2, { xs: 12, children: /* @__PURE__ */ jsx3(
    Card3,
    {
      className: "border-0 shadow-sm",
      style: {
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden"
      },
      children: /* @__PURE__ */ jsxs3(Card3.Body, { style: { padding: "14px 16px" }, children: [
        /* @__PURE__ */ jsxs3("div", { className: "d-flex justify-content-between align-items-start gap-3", children: [
          /* @__PURE__ */ jsxs3("div", { className: "flex-grow-1", children: [
            header ? /* @__PURE__ */ jsx3("div", { className: "mb-2", children: header }) : null,
            /* @__PURE__ */ jsx3("div", { className: "text-muted text-uppercase small mb-1", children: indexLabel != null ? indexLabel : "Unidade material" }),
            /* @__PURE__ */ jsx3("div", { className: "fw-semibold", style: { fontSize: "1rem", lineHeight: 1.2 }, children: materialContent != null ? materialContent : materialLabel })
          ] }),
          /* @__PURE__ */ jsx3(
            "div",
            {
              style: {
                minWidth: 38,
                height: 38,
                borderRadius: 10,
                background: "#0d6efd14",
                color: "#0d6efd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.9rem"
              },
              children: "UM"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "d-flex flex-wrap gap-2 mt-3", children: [
          /* @__PURE__ */ jsxs3("div", { className: "px-3 py-2 rounded-3 flex-fill", style: { background: "#f6f8fb", minWidth: 150 }, children: [
            /* @__PURE__ */ jsx3("div", { className: "text-muted text-uppercase small", children: "Unidade" }),
            /* @__PURE__ */ jsx3("div", { className: "fw-semibold mt-1", children: unidadeContent != null ? unidadeContent : unidadeLabel })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "px-3 py-2 rounded-3 flex-fill", style: { background: "#f6f8fb", minWidth: 150 }, children: [
            /* @__PURE__ */ jsx3("div", { className: "text-muted text-uppercase small", children: "Planejado" }),
            /* @__PURE__ */ jsx3("div", { className: "fw-semibold mt-1", children: quantidadeContent != null ? quantidadeContent : quantidadeLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "d-flex gap-2 justify-content-end flex-wrap mt-3", children: actions != null ? actions : /* @__PURE__ */ jsxs3(Fragment, { children: [
          onEditClick && /* @__PURE__ */ jsx3(
            Button2,
            {
              size: "sm",
              variant: "outline-primary",
              onClick: () => onEditClick(tarefaUnidadeMaterial),
              children: "Editar"
            }
          ),
          onRemoveClick && /* @__PURE__ */ jsx3(
            Button2,
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
import { useEffect as useEffect3, useState as useState3 } from "react";
import { Button as Button3, Card as Card4, Col as Col3, Row as Row2 } from "react-bootstrap";
import { AutoComplete } from "teraprox-ui-kit";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const [tarefaForm, setTarefaForm] = useState3(
    initialTarefaForm || emptyForm()
  );
  const [showTumForm, setShowTumForm] = useState3(false);
  const [editIndex, setEditIndex] = useState3(null);
  useEffect3(() => {
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
  return /* @__PURE__ */ jsxs4(Card4, { className: "mb-3 border-0 shadow-sm", children: [
    /* @__PURE__ */ jsx4(Card4.Header, { children: /* @__PURE__ */ jsx4("h5", { className: "mb-0", children: editIndex !== null ? "Editar Tarefa" : "Nova Tarefa" }) }),
    /* @__PURE__ */ jsxs4(Card4.Body, { children: [
      /* @__PURE__ */ jsx4(Row2, { className: "g-3", children: /* @__PURE__ */ jsx4(Col3, { xs: 12, children: /* @__PURE__ */ jsx4(
        AutoComplete,
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
      /* @__PURE__ */ jsx4("hr", {}),
      /* @__PURE__ */ jsx4("div", { className: "mt-3", children: !showTumForm ? /* @__PURE__ */ jsx4(
        Button3,
        {
          variant: "outline-primary",
          onClick: () => setShowTumForm(true),
          children: editIndex !== null ? "Editar Material" : "Adicionar Material"
        }
      ) : /* @__PURE__ */ jsxs4("div", { className: "p-3 border rounded bg-light", children: [
        renderUnidadeMaterialForm == null ? void 0 : renderUnidadeMaterialForm(),
        /* @__PURE__ */ jsxs4("div", { className: "mt-3 d-flex justify-content-end", children: [
          /* @__PURE__ */ jsx4(Button3, { variant: "success", onClick: handleAddUnidade, children: editIndex !== null ? "Atualizar" : "Confirmar" }),
          /* @__PURE__ */ jsx4(
            Button3,
            {
              variant: "outline-secondary",
              className: "ms-2",
              onClick: () => {
                onClearUnidadeMaterial == null ? void 0 : onClearUnidadeMaterial();
                setShowTumForm(false);
                setEditIndex(null);
              },
              children: "Cancelar"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx4("div", { className: "mt-4", children: (_a = tarefaForm.tarefasUnidadeMaterial) == null ? void 0 : _a.filter((tum) => !tum.removed).map((tum, index) => /* @__PURE__ */ jsx4(
        UnidadeMaterialCard,
        {
          tarefaUnidadeMaterial: tum,
          onRemoveClick: () => handleRemoveUnidade(index),
          onEditClick: () => handleTumEdit(tum, index),
          header: /* @__PURE__ */ jsx4(
            "div",
            {
              className: "me-3 d-flex align-items-center justify-content-center rounded-circle bg-primary text-white",
              style: { width: 32, height: 32, fontWeight: 600 },
              children: index + 1
            }
          )
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsxs4(Card4.Footer, { className: "d-flex justify-content-between", children: [
      /* @__PURE__ */ jsx4(Button3, { variant: "outline-danger", onClick: handleCancelEdit, children: "Cancelar" }),
      /* @__PURE__ */ jsx4(Button3, { variant: "primary", onClick: handleSave, children: "Salvar" })
    ] })
  ] });
};

// src/frequencia/FrequenciaFormV2.tsx
import {
  FrequenciaFormV2
} from "@hashcodeti/ui-kit-core";
import { FrequenciaFormV2 as FrequenciaFormV22 } from "@hashcodeti/ui-kit-core";

// src/folha-verificacao/CampoDeVerificacaoV2.tsx
import { useRef } from "react";
import {
  Button as Button4,
  Form as Form3,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

// ../../node_modules/react-dnd/dist/core/DndContext.js
import { createContext } from "react";
var DndContext = createContext({
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
import { useCallback, useState as useState4 } from "react";

// ../../node_modules/react-dnd/dist/hooks/useIsomorphicLayoutEffect.js
import { useEffect as useEffect4, useLayoutEffect } from "react";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect4;

// ../../node_modules/react-dnd/dist/hooks/useCollector.js
function useCollector(monitor, collect, onUpdate) {
  const [collected, setCollected] = useState4(
    () => collect(monitor)
  );
  const updateCollected = useCallback(() => {
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
import { useMemo } from "react";
function useOptionalFactory(arg, deps) {
  const memoDeps = [
    ...deps || []
  ];
  if (deps == null && typeof arg !== "function") {
    memoDeps.push(arg);
  }
  return useMemo(() => {
    return typeof arg === "function" ? arg() : arg;
  }, memoDeps);
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/connectors.js
import { useMemo as useMemo2 } from "react";
function useConnectDragSource(connector) {
  return useMemo2(
    () => connector.hooks.dragSource(),
    [
      connector
    ]
  );
}
function useConnectDragPreview(connector) {
  return useMemo2(
    () => connector.hooks.dragPreview(),
    [
      connector
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSourceConnector.js
import { useMemo as useMemo3 } from "react";

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
function registerTarget(type, target, manager) {
  const registry = manager.getRegistry();
  const targetId = registry.addTarget(type, target);
  return [
    targetId,
    () => registry.removeTarget(targetId)
  ];
}
function registerSource(type, source, manager) {
  const registry = manager.getRegistry();
  const sourceId = registry.addSource(type, source);
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
import { cloneElement, isValidElement } from "react";
function throwIfCompositeComponentElement(element) {
  if (typeof element.type === "string") {
    return;
  }
  const displayName = element.type.displayName || element.type.name || "the component";
  throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${displayName} into a <div>, or turn it into a drag source or a drop target itself.`);
}
function wrapHookToRecognizeElement(hook) {
  return (elementOrNode = null, options = null) => {
    if (!isValidElement(elementOrNode)) {
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
    return cloneElement(element, {
      ref: newRef
    });
  } else {
    return cloneElement(element, {
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
import { useContext } from "react";
function useDragDropManager() {
  const { dragDropManager } = useContext(DndContext);
  invariant(dragDropManager != null, "Expected drag drop context");
  return dragDropManager;
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSourceConnector.js
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
  const manager = useDragDropManager();
  const connector = useMemo3(
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
import { useMemo as useMemo4 } from "react";
function useDragSourceMonitor() {
  const manager = useDragDropManager();
  return useMemo4(
    () => new DragSourceMonitorImpl(manager),
    [
      manager
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragSource.js
import { useEffect as useEffect5, useMemo as useMemo5 } from "react";

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
  const handler = useMemo5(
    () => new DragSourceImpl(spec, monitor, connector),
    [
      monitor,
      connector
    ]
  );
  useEffect5(() => {
    handler.spec = spec;
  }, [
    spec
  ]);
  return handler;
}

// ../../node_modules/react-dnd/dist/hooks/useDrag/useDragType.js
import { useMemo as useMemo6 } from "react";
function useDragType(spec) {
  return useMemo6(() => {
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
import { useMemo as useMemo7 } from "react";
function useConnectDropTarget(connector) {
  return useMemo7(
    () => connector.hooks.dropTarget(),
    [
      connector
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useDropTargetConnector.js
import { useMemo as useMemo8 } from "react";
function useDropTargetConnector(options) {
  const manager = useDragDropManager();
  const connector = useMemo8(
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
import { useMemo as useMemo9 } from "react";
function useDropTargetMonitor() {
  const manager = useDragDropManager();
  return useMemo9(
    () => new DropTargetMonitorImpl(manager),
    [
      manager
    ]
  );
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useAccept.js
import { useMemo as useMemo10 } from "react";
function useAccept(spec) {
  const { accept } = spec;
  return useMemo10(() => {
    invariant(spec.accept != null, "accept must be defined");
    return Array.isArray(accept) ? accept : [
      accept
    ];
  }, [
    accept
  ]);
}

// ../../node_modules/react-dnd/dist/hooks/useDrop/useDropTarget.js
import { useEffect as useEffect6, useMemo as useMemo11 } from "react";

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
  const dropTarget = useMemo11(
    () => new DropTargetImpl(spec, monitor),
    [
      monitor
    ]
  );
  useEffect6(() => {
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
import {
  FiAlignLeft,
  FiClock,
  FiCode,
  FiHash
} from "react-icons/fi";
import { LuMegaphone, LuMegaphoneOff } from "react-icons/lu";
import { SiGithubactions } from "react-icons/si";
import { FormField } from "teraprox-ui-kit";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var ITEM_TYPE = "CAMPO_CARD";
var TipoIcon = ({ type }) => {
  const size = 14;
  switch (type) {
    case "number":
      return /* @__PURE__ */ jsx5(FiHash, { size });
    case "time":
      return /* @__PURE__ */ jsx5(FiClock, { size });
    case "formula":
      return /* @__PURE__ */ jsx5(FiCode, { size });
    case "text":
    default:
      return /* @__PURE__ */ jsx5(FiAlignLeft, { size });
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
  const ref = useRef(null);
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
  return /* @__PURE__ */ jsxs5(
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
        /* @__PURE__ */ jsxs5("div", { className: "campo-row", children: [
          /* @__PURE__ */ jsx5("div", { style: { flex: 1 }, children: /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
            /* @__PURE__ */ jsx5("div", { className: "campo-pos-badge", children: campo.posicao || index + 1 }),
            /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsx5("div", { className: "campo-label", children: campo.label || campo._operacao || `#${campo.id || index}` }),
              /* @__PURE__ */ jsx5("div", { className: "campo-meta", children: ((_a = campo.controle) == null ? void 0 : _a.nomeParametro) || campo.descricao })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsxs5(
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
                /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  campo.tipoDeCampo && /* @__PURE__ */ jsx5(
                    OverlayTrigger,
                    {
                      placement: "top",
                      overlay: /* @__PURE__ */ jsxs5(Tooltip, { children: [
                        "Filtrar por: ",
                        getTipoNome(campo.tipoDeCampo)
                      ] }),
                      children: /* @__PURE__ */ jsx5(
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
                          children: /* @__PURE__ */ jsx5(TipoIcon, { type: campo.tipoDeCampo })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx5(
                    OverlayTrigger,
                    {
                      placement: "top",
                      overlay: /* @__PURE__ */ jsx5(Tooltip, { children: `Regras de corre\xE7\xE3o: ${((_b = campo.regrasDeCorrecao) == null ? void 0 : _b.length) || 0}` }),
                      children: /* @__PURE__ */ jsxs5(
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
                            /* @__PURE__ */ jsx5(
                              SiGithubactions,
                              {
                                size: 14,
                                color: campo.regrasDeCorrecao && campo.regrasDeCorrecao.length ? "#0d6efd" : "#6c757d"
                              }
                            ),
                            /* @__PURE__ */ jsx5(
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
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx5(
                    OverlayTrigger,
                    {
                      placement: "top",
                      overlay: /* @__PURE__ */ jsx5(Tooltip, { children: campo.reporter ? "Campo reportado (clique para remover)" : "Campo n\xE3o reportado (clique para reportar)" }),
                      children: /* @__PURE__ */ jsx5(
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
                          children: campo.reporter ? /* @__PURE__ */ jsx5(LuMegaphone, { size: 16, color: "#0d6efd" }) : /* @__PURE__ */ jsx5(LuMegaphoneOff, { size: 16, color: "#6c757d" })
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx5(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 8,
                      marginTop: 8,
                      alignItems: "center"
                    },
                    children: /* @__PURE__ */ jsx5(
                      Button4,
                      {
                        size: "sm",
                        variant: "link",
                        onClick: () => editCampoHandler(campo),
                        children: "Editar"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs5(
                  "div",
                  {
                    style: {
                      marginTop: 8,
                      display: "flex",
                      gap: 12,
                      alignItems: "center"
                    },
                    children: [
                      isMarking && /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx5(
                        Form3.Check,
                        {
                          checked: !!campo.checked,
                          onChange: (e) => onMarkCampo(campo, e.target.checked),
                          style: { transform: "scale(1.25)", transformOrigin: "center" }
                        }
                      ) }),
                      isReordering && /* @__PURE__ */ jsx5("div", { style: { minWidth: 80 }, children: /* @__PURE__ */ jsx5(
                        FormField,
                        {
                          label: "Posi\xE7\xE3o",
                          val: campo.posicao,
                          onBlur: () => {
                          },
                          onValueUpdate: (valor) => onChangePosicao(campo, valor)
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs5(
          "div",
          {
            style: {
              marginTop: 8,
              display: "flex",
              gap: 8,
              flexWrap: "wrap"
            },
            children: [
              /* @__PURE__ */ jsxs5("div", { className: "campo-meta", children: [
                "Unidade: ",
                campo.unidade || "-"
              ] }),
              /* @__PURE__ */ jsxs5("div", { className: "campo-meta", children: [
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
export {
  CalculadoraCorrecaoModal,
  CalculoCorrecao,
  CampoDeVerificacaoV2,
  FrequenciaFormV2,
  TarefaUnidadeForm,
  UnidadeMaterialCard
};
