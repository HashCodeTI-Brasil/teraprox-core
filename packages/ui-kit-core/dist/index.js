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
  AnexoManager: () => AnexoManager,
  ClickToWriteField: () => ClickToWriteField,
  ColorPicker: () => ColorPicker,
  CombineModeToggle: () => CombineModeToggle,
  ContadorPicker: () => ContadorPicker,
  FormModal: () => FormModal,
  FrequenciaFormV2: () => FrequenciaFormV2
});
module.exports = __toCommonJS(index_exports);

// src/containers/FormModal.tsx
var import_react_bootstrap = require("react-bootstrap");
var import_jsx_runtime = require("react/jsx-runtime");
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
  scrollable = true,
  footerExtra
}) => {
  var _a, _b;
  const modalSize = size === "md" ? void 0 : size;
  const primaryVariant = (_a = primaryAction.variant) != null ? _a : "primary";
  const secondaryVariant = (_b = secondaryAction == null ? void 0 : secondaryAction.variant) != null ? _b : "outline-secondary";
  const primaryDisabled = !isValid || isLoading;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_bootstrap.Modal,
    {
      show,
      onHide: onClose,
      size: modalSize,
      backdrop: closeOnBackdrop ? true : "static",
      scrollable,
      centered: true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_bootstrap.Modal.Header, { closeButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_bootstrap.Modal.Title, { children: [
          icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: "0.5rem" }, children: icon }) : null,
          title
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_bootstrap.Modal.Body, { children }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_bootstrap.Modal.Footer, { children: [
          footerExtra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "me-auto", children: footerExtra }) : null,
          secondaryAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react_bootstrap.Button,
            {
              variant: secondaryVariant,
              onClick: secondaryAction.onClick,
              disabled: isLoading,
              children: secondaryAction.label
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_react_bootstrap.Button,
            {
              variant: primaryVariant,
              onClick: primaryAction.onClick,
              disabled: primaryDisabled,
              children: [
                isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_bootstrap.Spinner, { size: "sm", animation: "border", className: "me-2" }) : primaryAction.icon,
                primaryAction.label
              ]
            }
          )
        ] })
      ]
    }
  );
};

// src/frequencia/FrequenciaFormV2.tsx
var import_react_bootstrap2 = require("react-bootstrap");
var import_jsx_runtime2 = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-muted mb-2", children: "Sem recorrencia definida." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_bootstrap2.Button,
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "d-flex flex-wrap gap-2 align-items-end", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { flex: "0 0 8rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_bootstrap2.Form.Label, { children: "A cada" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_bootstrap2.Form.Control,
        {
          type: "number",
          min: 1,
          disabled,
          value: value.valor,
          onChange: (e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n) && n >= 1) onValorChange(n);
          }
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { flex: "1 1 10rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_bootstrap2.Form.Label, { children: "Escala" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_bootstrap2.Form.Select,
        {
          disabled,
          value: value.escala,
          onChange: (e) => onEscalaChange(e.target.value),
          children: visibleEscalas.map((key) => {
            var _a;
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: key, children: (_a = ESCALA_LABELS[key]) != null ? _a : key }, key);
          })
        }
      )
    ] }),
    showDataInicio && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { flex: "1 1 14rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_bootstrap2.Form.Label, { children: "Data de inicio" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_bootstrap2.Form.Control,
        {
          type: "datetime-local",
          disabled,
          value: toDatetimeLocal(value.dataInicio),
          onChange: (e) => handleDataInicio(e.target.value)
        }
      )
    ] }),
    onClear && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_react_bootstrap2.Button,
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
var import_react_bootstrap3 = require("react-bootstrap");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_bootstrap3.Form.Group, { className: "mb-3", controlId: "contador-parametro", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Form.Label, { children: "Par\xE2metro" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_react_bootstrap3.Form.Control,
        {
          type: "text",
          value: (_b = value == null ? void 0 : value.parametro) != null ? _b : "",
          onChange: (e) => onParametroChange(e.target.value),
          placeholder: parametroPlaceholder,
          disabled
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_bootstrap3.Form.Group, { className: "mb-3", controlId: "contador-leitura", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Form.Label, { children: "Leitura" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_bootstrap3.InputGroup, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_bootstrap3.Form.Control,
          {
            type: "number",
            value: (_c = value == null ? void 0 : value.valor) != null ? _c : "",
            onChange: (e) => handleValor(e.target.value),
            placeholder: "0",
            disabled
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_bootstrap3.Form.Control,
          {
            type: "text",
            value: (_d = value == null ? void 0 : value.unidade) != null ? _d : "",
            onChange: (e) => onUnidadeChange(e.target.value),
            placeholder: unidadePlaceholder,
            disabled,
            style: { maxWidth: "140px" },
            "aria-label": "Unidade"
          }
        )
      ] })
    ] }),
    !hideLimites && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "contador-limites mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "d-flex justify-content-between align-items-center mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_bootstrap3.Form.Label, { className: "mb-0", children: "Limites de controle" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_bootstrap3.Button,
          {
            variant: "outline-primary",
            size: "sm",
            onClick: () => onLimiteAdd({ ...emptyLimite }),
            disabled,
            children: "+ Adicionar limite"
          }
        )
      ] }),
      limites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-muted small fst-italic", children: "Nenhum limite configurado." }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_bootstrap3.Table, { size: "sm", borderless: true, className: "mb-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { style: { width: "40%" }, children: "Nome" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { style: { width: "20%" }, children: "Regra" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { style: { width: "25%" }, children: "Valor" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { style: { width: "15%" } })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tbody", { children: limites.map((l, idx) => {
          var _a2, _b2;
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_react_bootstrap3.Form.Control,
              {
                size: "sm",
                type: "text",
                value: (_a2 = l == null ? void 0 : l.nome) != null ? _a2 : "",
                onChange: (e) => handleLimiteField(idx, "nome", e.target.value),
                placeholder: "Ex.: Limite M\xEDnimo",
                disabled
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_react_bootstrap3.Form.Select,
              {
                size: "sm",
                value: (_b2 = l == null ? void 0 : l.boundRule) != null ? _b2 : ">=",
                onChange: (e) => handleLimiteField(idx, "boundRule", e.target.value),
                disabled,
                children: BOUND_RULES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: r, children: r }, r))
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_react_bootstrap3.Form.Control,
              {
                size: "sm",
                type: "number",
                value: (l == null ? void 0 : l.valor) === void 0 || (l == null ? void 0 : l.valor) === null ? "" : String(l.valor),
                onChange: (e) => handleLimiteField(idx, "valor", e.target.value),
                disabled
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { className: "text-end", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_react_bootstrap3.Button,
              {
                variant: "outline-danger",
                size: "sm",
                onClick: () => onLimiteRemove(idx),
                disabled,
                "aria-label": `Remover limite ${idx + 1}`,
                children: "Remover"
              }
            ) })
          ] }, idx);
        }) })
      ] })
    ] })
  ] });
};

// src/anexo/AnexoManager.tsx
var import_react = require("react");
var import_react_dropzone = require("react-dropzone");
var import_fi = require("react-icons/fi");
var import_fa = require("react-icons/fa");
var import_jsx_runtime4 = require("react/jsx-runtime");
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
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa.FaFilePdf, {});
    case "doc":
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa.FaFileWord, {});
    case "xls":
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa.FaFileExcel, {});
    case "csv":
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa.FaFileCsv, {});
    case "img":
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiImage, {});
    case "vid":
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiFilm, {});
    case "aud":
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiMusic, {});
    case "zip":
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa.FaFileArchive, {});
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiFile, {});
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
  dropzoneLabel,
  getImageReadUrl
}) => {
  const [thumbUrls, setThumbUrls] = (0, import_react.useState)({});
  const [unavailableIds, setUnavailableIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
  const [persistImageUrls, setPersistImageUrls] = (0, import_react.useState)({});
  const [persistImageLoading, setPersistImageLoading] = (0, import_react.useState)(/* @__PURE__ */ new Set());
  const [lightbox, setLightbox] = (0, import_react.useState)(null);
  const getImageReadUrlRef = (0, import_react.useRef)(getImageReadUrl);
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
  const handleDownload = (0, import_react.useCallback)(async (anexo) => {
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
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);
  const openImagePreview = (0, import_react.useCallback)(
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
  const openLocalImagePreview = (0, import_react.useCallback)((url, title) => {
    if (url) setLightbox({ url, title });
  }, []);
  const onDrop = (0, import_react.useCallback)(
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
  (0, import_react.useMemo)(
    () => Object.values(UNIVERSAL_ACCEPT).flat().map((e) => e.replace(".", "").toUpperCase()),
    []
  );
  const totalCount = persistidos.length + locais.length;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-manager", children: [
    !readonly && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        ...getRootProps(),
        className: `anexo-dropzone ${isDragActive ? "anexo-drag-active" : ""}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { ...getInputProps() }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-dropzone-inner", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiUploadCloud, { className: "anexo-dropzone-icon" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "anexo-dropzone-text", children: dropzoneLabel || /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: "Clique para selecionar" }),
              " ou arraste arquivos aqui"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "anexo-dropzone-hint", children: [
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
    (totalCount > 0 || loading) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-list", children: [
      loading && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-empty", children: "Carregando anexos..." }),
      persistidos.map((anexo) => {
        const displayName = anexo.nome || anexo.originalName || "Anexo";
        const cat = getFileCategory(anexo.mimeType || anexo.tipo, displayName);
        const isUnavailable = anexo.unavailable || unavailableIds.has(anexo.id);
        const isImg = isImageAnexo(anexo);
        const sid = String(anexo.id);
        const pImg = persistImageUrls[sid] || anexo.url || anexo.signedUrl;
        const pLoading = isImg && !pImg && persistImageLoading.has(sid);
        const canPreviewImage = isImg && !isUnavailable && (Boolean(pImg) || Boolean(getImageReadUrl));
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `anexo-file-item ${isUnavailable ? "anexo-file-unavailable" : ""}`, children: [
          isImg && pImg && !isUnavailable ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              className: "anexo-persist-thumb-wrap",
              title: "Ver imagem",
              onClick: () => openImagePreview(anexo),
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", { src: pImg, alt: "", className: "anexo-file-thumb anexo-file-thumb--lg" })
            }
          ) : isImg && pLoading ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-persist-thumb-skel", "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `anexo-file-icon anexo-icon-${cat}`, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FileIcon, { category: cat }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-info", children: [
            canPreviewImage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: "anexo-file-name anexo-file-name--link",
                title: displayName,
                onClick: () => openImagePreview(anexo),
                children: displayName
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-file-name", title: displayName, children: displayName }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-meta", children: [
              isUnavailable && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "anexo-status-error", children: "Anexo indisponivel" }),
              !isUnavailable && anexo.tamanho ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: formatFileSize(anexo.tamanho) }) : null,
              anexo.createdAt && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: new Date(anexo.createdAt).toLocaleDateString("pt-BR") })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-actions", children: [
            onDownload && !isUnavailable && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: "anexo-btn-action anexo-btn-download",
                title: isImg ? "Abrir em nova aba" : "Download",
                onClick: () => handleDownload(anexo),
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiDownload, {})
              }
            ),
            !readonly && onRemovePersistido && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: "anexo-btn-action anexo-btn-danger",
                title: "Remover",
                onClick: () => onRemovePersistido(anexo.id),
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiTrash2, {})
              }
            )
          ] })
        ] }, `p-${anexo.id}`);
      }),
      locais.map((anexo) => {
        var _a, _b;
        const localNome = anexo.nome || ((_a = anexo.file) == null ? void 0 : _a.name) || "Arquivo";
        const localTipo = anexo.tipo || ((_b = anexo.file) == null ? void 0 : _b.type) || "";
        const cat = getFileCategory(localTipo, localNome);
        const isImg = localTipo.startsWith("image/");
        const localPreviewUrl = isImg ? thumbUrls[anexo.localId] : void 0;
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-item", children: [
          isImg && localPreviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              className: "anexo-persist-thumb-wrap",
              title: "Pr\xE9-visualizar",
              onClick: () => openLocalImagePreview(localPreviewUrl, localNome),
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", { src: localPreviewUrl, alt: "", className: "anexo-file-thumb anexo-file-thumb--lg" })
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `anexo-file-icon anexo-icon-${cat}`, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FileIcon, { category: cat }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-info", children: [
            isImg && localPreviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: "anexo-file-name anexo-file-name--link",
                title: localNome,
                onClick: () => openLocalImagePreview(localPreviewUrl, localNome),
                children: localNome
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-file-name", title: localNome, children: localNome }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-meta", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: formatFileSize(anexo.tamanho) }),
              anexo.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "anexo-status-uploading", children: "Enviando..." }),
              anexo.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "anexo-status-error", children: anexo.errorMessage || "Erro" })
            ] }),
            (anexo.status === "uploading" || anexo.status === "done") && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-progress-bar", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: `anexo-progress-fill ${anexo.status === "done" ? "anexo-progress-done" : ""}`,
                style: { width: `${anexo.progress}%` }
              }
            ) }),
            anexo.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-progress-bar", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-progress-fill anexo-progress-error", style: { width: "100%" } }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-file-actions", children: [
            anexo.status === "error" && onRetry && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: "anexo-btn-action",
                title: "Tentar novamente",
                onClick: () => onRetry(anexo.localId),
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiRefreshCw, {})
              }
            ),
            (anexo.status === "pending" || anexo.status === "error") && onRemoveLocal && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: "anexo-btn-action anexo-btn-danger",
                title: "Remover",
                onClick: () => onRemoveLocal(anexo.localId),
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiTrash2, {})
              }
            )
          ] })
        ] }, `l-${anexo.localId}`);
      })
    ] }),
    !loading && totalCount === 0 && readonly && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-empty", children: "Nenhum anexo encontrado." }),
    lightbox && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        className: "anexo-lightbox-backdrop",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": lightbox.title,
        onClick: (e) => {
          if (e.target === e.currentTarget) setLightbox(null);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "anexo-lightbox-panel", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              className: "anexo-lightbox-close",
              onClick: () => setLightbox(null),
              "aria-label": "Fechar",
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fi.FiX, {})
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-lightbox-title", children: lightbox.title }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "anexo-lightbox-img-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", { src: lightbox.url, alt: lightbox.title, className: "anexo-lightbox-img" }) })
        ] })
      }
    )
  ] });
};

// src/click-to-write/ClickToWriteField.tsx
var import_react_bootstrap4 = require("react-bootstrap");
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_react_bootstrap4.Form.Group, { className: "mb-2", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_bootstrap4.Form.Label, { className: "small text-muted", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_react_bootstrap4.Form.Control,
      {
        size: "sm",
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
        ...props
      }
    )
  ] });
};

// src/combine-mode/CombineModeToggle.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var VennIcon = ({ variant, size = 18 }) => {
  const FILL = "currentColor";
  const OFF = "none";
  const STROKE = "currentColor";
  const strokeWidth = 1.4;
  if (variant === "intersection") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("clipPath", { id: "clipA-intersection", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("mask", { id: "mask-xor", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("rect", { width: "24", height: "24", fill: "black" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: "white" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: "white" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: "black", mask: "url(#inner-xor)" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("g", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: "white" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: "white" })
            ] })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("clipPath", { id: "clipA-xor", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth })
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: FILL, opacity: 0.85 }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "9", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "15", cy: "12", r: "6", fill: OFF, stroke: STROKE, strokeWidth })
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "div",
    {
      role: "group",
      "aria-label": "Modo de combina\xE7\xE3o dos filtros",
      className: `combine-mode-toggle btn-group btn-group-sm ${className != null ? className : ""}`.trim(),
      children: MODES.map((m) => {
        const cfg = MODE_CONFIG[m];
        const isActive = m === mode;
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(VennIcon, { variant: m, size }),
              showLabel ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { style: { fontSize: "0.75rem" }, children: cfg.short }) : null
            ]
          },
          m
        );
      })
    }
  );
};

// src/color-picker/ColorPicker.tsx
var import_react2 = __toESM(require("react"));
var import_jsx_runtime7 = require("react/jsx-runtime");
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
  const [value, setValue] = import_react2.default.useState(defaultColor);
  const handleChange = (hex) => {
    setValue(hex);
    setCor(hex);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "color-picker-container mb-3", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", { className: "form-label fw-semibold", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "d-flex align-items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "d-flex gap-1 flex-wrap", children: PRESET_COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnexoManager,
  ClickToWriteField,
  ColorPicker,
  CombineModeToggle,
  ContadorPicker,
  FormModal,
  FrequenciaFormV2
});
