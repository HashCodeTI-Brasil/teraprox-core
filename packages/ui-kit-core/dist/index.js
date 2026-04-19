"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FormModal: () => FormModal
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormModal
});
