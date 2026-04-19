// src/containers/FormModal.tsx
import { Modal, Button, Spinner } from "react-bootstrap";
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show,
      onHide: onClose,
      size: modalSize,
      backdrop: closeOnBackdrop ? true : "static",
      scrollable,
      centered: true,
      children: [
        /* @__PURE__ */ jsx(Modal.Header, { closeButton: true, children: /* @__PURE__ */ jsxs(Modal.Title, { children: [
          icon ? /* @__PURE__ */ jsx("span", { style: { marginRight: "0.5rem" }, children: icon }) : null,
          title
        ] }) }),
        /* @__PURE__ */ jsx(Modal.Body, { children }),
        /* @__PURE__ */ jsxs(Modal.Footer, { children: [
          footerExtra ? /* @__PURE__ */ jsx("div", { className: "me-auto", children: footerExtra }) : null,
          secondaryAction ? /* @__PURE__ */ jsx(
            Button,
            {
              variant: secondaryVariant,
              onClick: secondaryAction.onClick,
              disabled: isLoading,
              children: secondaryAction.label
            }
          ) : null,
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: primaryVariant,
              onClick: primaryAction.onClick,
              disabled: primaryDisabled,
              children: [
                isLoading ? /* @__PURE__ */ jsx(Spinner, { size: "sm", animation: "border", className: "me-2" }) : primaryAction.icon,
                primaryAction.label
              ]
            }
          )
        ] })
      ]
    }
  );
};
export {
  FormModal
};
