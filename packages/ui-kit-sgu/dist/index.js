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
  Avatar: () => Avatar,
  Modal: () => Modal,
  ROLE_VALUES: () => ROLE_VALUES,
  RolePill: () => RolePill,
  SetorFormModal: () => SetorFormModal,
  SetorTable: () => SetorTable,
  UserForm: () => UserForm,
  UserTable: () => UserTable
});
module.exports = __toCommonJS(index_exports);

// src/shared/Modal.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var SIZE = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
};
var Modal = ({ open, onClose, title, children, size = "md" }) => {
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      var _a, _b;
      return (_b = (_a = ref.current) == null ? void 0 : _a.querySelector("input,select,textarea,button")) == null ? void 0 : _b.focus();
    }, 30);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          ref,
          onClick: (e) => e.stopPropagation(),
          className: `w-full ${SIZE[size]} bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden`,
          children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-5 py-4 border-b border-neutral-200 dark:border-neutral-800", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-base font-semibold text-neutral-900 dark:text-neutral-50", children: title }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-5 py-4", children })
          ]
        }
      )
    }
  );
};

// src/shared/Avatar.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var PALETTE = [
  "bg-amber-200 text-amber-900",
  "bg-violet-200 text-violet-900",
  "bg-sky-200 text-sky-900",
  "bg-emerald-200 text-emerald-900",
  "bg-rose-200 text-rose-900",
  "bg-fuchsia-200 text-fuchsia-900",
  "bg-cyan-200 text-cyan-900",
  "bg-lime-200 text-lime-900"
];
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}
function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
var SIZE2 = {
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base"
};
var Avatar = ({ name, size = "md" }) => {
  const color = PALETTE[hash(name) % PALETTE.length];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "span",
    {
      className: `inline-flex items-center justify-center rounded-full font-semibold ${SIZE2[size]} ${color}`,
      "aria-hidden": true,
      children: initials(name)
    }
  );
};

// src/shared/RolePill.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ROLE_VALUES = ["OWNER", "DEV", "ADMIN", "PLANNER", "EXECUTIONER", "USER"];
var STYLE = {
  OWNER: "bg-amber-100 text-amber-900 ring-amber-200",
  DEV: "bg-rose-100 text-rose-900 ring-rose-200",
  ADMIN: "bg-violet-100 text-violet-900 ring-violet-200",
  USER: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  PLANNER: "bg-sky-100 text-sky-900 ring-sky-200",
  EXECUTIONER: "bg-emerald-100 text-emerald-900 ring-emerald-200"
};
var LABEL = {
  OWNER: "Owner",
  DEV: "Dev",
  ADMIN: "Admin",
  USER: "User",
  PLANNER: "Planner",
  EXECUTIONER: "Executioner"
};
var SIZE3 = {
  xs: "text-[10px] px-1.5 py-0.5",
  sm: "text-xs px-2 py-0.5"
};
var RolePill = ({ role, size = "sm" }) => {
  const raw = (role != null ? role : "").trim();
  if (!raw) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `inline-flex items-center rounded-md ring-1 ring-inset ring-neutral-200 bg-neutral-50 text-neutral-500 font-medium ${SIZE3[size]}`, children: "\u2014" });
  }
  const upper = raw.toUpperCase();
  const isKnown = ROLE_VALUES.includes(upper);
  if (!isKnown) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `inline-flex items-center rounded-md ring-1 ring-inset ring-neutral-200 bg-neutral-100 text-neutral-700 font-medium ${SIZE3[size]}`, children: raw });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `inline-flex items-center rounded-md ring-1 ring-inset font-medium ${STYLE[upper]} ${SIZE3[size]}`, children: LABEL[upper] });
};

// src/users/UserTable.tsx
var import_react2 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var fullName = (u) => {
  var _a, _b, _c;
  const derived = (_c = u._fullName) != null ? _c : `${(_a = u.firstName) != null ? _a : ""} ${(_b = u.lastName) != null ? _b : ""}`.trim();
  return derived || u.email || "\u2014";
};
var userRoleRaw = (u) => {
  var _a, _b, _c, _d, _e, _f;
  const raw = (_f = (_e = (_c = u.role) != null ? _c : (_b = (_a = u.userRoles) == null ? void 0 : _a[0]) == null ? void 0 : _b.role) != null ? _e : (_d = u.userRole) == null ? void 0 : _d.role) != null ? _f : null;
  return typeof raw === "string" && raw.trim() ? raw : null;
};
var userRoleFiltro = (u) => {
  const raw = userRoleRaw(u);
  if (!raw) return null;
  const upper = raw.toUpperCase();
  return ROLE_VALUES.includes(upper) ? upper : "OTHER";
};
var userSetorName = (u) => {
  var _a, _b, _c, _d, _e, _f;
  return (_f = (_e = (_c = u.setor) != null ? _c : (_b = (_a = u.userSetor) == null ? void 0 : _a.setor) == null ? void 0 : _b.nome) != null ? _e : (_d = u.userSetor) == null ? void 0 : _d.setor) != null ? _f : "\u2014";
};
var UserTable = ({
  users,
  isLoading = false,
  onEditUser,
  onDeleteUser,
  onCreateUser,
  onInviteByEmail,
  canEditRole = false,
  onChangeRole,
  subtitle,
  className = ""
}) => {
  const [search, setSearch] = (0, import_react2.useState)("");
  const [roleFilter, setRoleFilter] = (0, import_react2.useState)("ALL");
  const filtered = (0, import_react2.useMemo)(() => {
    const term = search.trim().toLowerCase();
    return users.filter((u) => {
      var _a;
      if (roleFilter !== "ALL" && userRoleFiltro(u) !== roleFilter) return false;
      if (!term) return true;
      const hay = `${fullName(u)} ${(_a = u.email) != null ? _a : ""}`.toLowerCase();
      return hay.includes(term);
    });
  }, [users, search, roleFilter]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "section",
    {
      className: `bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("header", { className: "px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: "Usu\xE1rios" }),
            subtitle && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm text-neutral-500 dark:text-neutral-400 mt-0.5", children: subtitle })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex gap-2", children: [
            onInviteByEmail && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "button",
              {
                type: "button",
                onClick: onInviteByEmail,
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { "aria-hidden": true, children: "\u2709" }),
                  " Convidar por email"
                ]
              }
            ),
            onCreateUser && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "button",
              {
                type: "button",
                onClick: onCreateUser,
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { "aria-hidden": true, children: "+" }),
                  " Novo usu\xE1rio"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "input",
            {
              type: "search",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Buscar por nome ou email...",
              className: "flex-1 min-w-[220px] h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex gap-1 items-center", role: "tablist", "aria-label": "Filtrar por role", children: ["ALL", ...ROLE_VALUES].map((r) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setRoleFilter(r),
              role: "tab",
              "aria-selected": roleFilter === r,
              className: roleFilter === r ? "px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900" : "px-2.5 py-1 text-xs font-medium rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
              children: r === "ALL" ? "Todos" : r
            },
            r
          )) })
        ] }),
        isLoading ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SkeletonRows, {}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(EmptyState, { query: search, hasUsers: users.length > 0, onCreateUser }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: filtered.map((user) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          UserRow,
          {
            user,
            onEdit: onEditUser,
            onDelete: onDeleteUser,
            canEditRole,
            onChangeRole
          },
          user.id
        )) }),
        !isLoading && filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "px-6 py-2.5 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400", children: [
          filtered.length,
          " de ",
          users.length,
          " ",
          users.length === 1 ? "usu\xE1rio" : "usu\xE1rios"
        ] })
      ]
    }
  );
};
var UserRow = ({ user, onEdit, onDelete, canEditRole, onChangeRole }) => {
  var _a;
  const name = fullName(user);
  const role = userRoleRaw(user);
  const setor = userSetorName(user);
  const active = (_a = user.active) != null ? _a : true;
  const [savingRole, setSavingRole] = (0, import_react2.useState)(false);
  const handleRoleChange = async (e) => {
    if (!onChangeRole) return;
    const next = e.target.value;
    if (!next || next === (role != null ? role : "").toUpperCase()) return;
    setSavingRole(true);
    try {
      await onChangeRole(user, next);
    } finally {
      setSavingRole(false);
    }
  };
  const handleRowClick = () => onEdit == null ? void 0 : onEdit(user);
  const handleRowKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEdit == null ? void 0 : onEdit(user);
    }
  };
  const stop = (e) => e.stopPropagation();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "li",
    {
      className: `group px-6 py-3 flex items-center gap-4 transition-colors ${onEdit ? "cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}`,
      onClick: onEdit ? handleRowClick : void 0,
      onKeyDown: onEdit ? handleRowKey : void 0,
      role: onEdit ? "button" : void 0,
      tabIndex: onEdit ? 0 : void 0,
      "aria-label": onEdit ? `Editar ${name}` : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Avatar, { name }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-medium text-sm text-neutral-900 dark:text-neutral-50 truncate", children: name }),
            !active && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500", children: "inativo" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-xs text-neutral-500 dark:text-neutral-400 truncate", children: user.email || "\u2014" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "hidden sm:block min-w-[110px]", onClick: stop, children: canEditRole && onChangeRole ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          RoleEditor,
          {
            currentRole: role,
            disabled: savingRole,
            onChange: handleRoleChange
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RolePill, { role }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "hidden md:block min-w-[120px] text-sm text-neutral-600 dark:text-neutral-400 truncate", children: setor }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity", onClick: stop, children: onDelete && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onDelete(user);
            },
            "aria-label": `Desativar ${name}`,
            className: "p-1.5 rounded-md text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M2.5 4h11M6 4V2.5h4V4M5 4l.5 9.5h5L11 4M6.5 7v4M9.5 7v4", strokeLinecap: "round", strokeLinejoin: "round" }) })
          }
        ) })
      ]
    }
  );
};
var RoleEditor = ({ currentRole, disabled, onChange }) => {
  const upper = (currentRole != null ? currentRole : "").toUpperCase();
  const valueInEnum = ROLE_VALUES.includes(upper);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RolePill, { role: currentRole }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "select",
      {
        value: valueInEnum ? upper : "",
        disabled,
        onChange,
        "aria-label": "Alterar role do usu\xE1rio",
        className: "absolute inset-0 opacity-0 cursor-pointer disabled:cursor-wait",
        children: [
          !valueInEnum && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "", disabled: true, children: currentRole != null ? currentRole : "\u2014" }),
          ROLE_VALUES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: r, children: r }, r))
        ]
      }
    )
  ] });
};
var SkeletonRows = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: "px-6 py-3 flex items-center gap-4", children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex-1 space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-1/3" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded animate-pulse w-1/2" })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-16 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 animate-pulse" })
] }, i)) });
var EmptyState = ({ query, hasUsers, onCreateUser }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "px-6 py-16 text-center", children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "text-neutral-500", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8" })
  ] }) }),
  hasUsers && query ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50", children: "Nenhum usu\xE1rio corresponde \xE0 busca" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-neutral-500 mt-1", children: "Tente outro termo ou limpe os filtros." })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50", children: "Sua equipe est\xE1 vazia" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-neutral-500 mt-1 mb-4", children: "Crie o primeiro usu\xE1rio ou convide algu\xE9m por email." }),
    onCreateUser && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "button",
      {
        type: "button",
        onClick: onCreateUser,
        className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { "aria-hidden": true, children: "+" }),
          " Novo usu\xE1rio"
        ]
      }
    )
  ] })
] });

// src/users/UserForm.tsx
var import_react3 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var ROLE_LABEL = {
  OWNER: "Owner \u2014 propriet\xE1rio da empresa",
  DEV: "Dev \u2014 superadmin (suporte/billing)",
  ADMIN: "Admin \u2014 administrador",
  USER: "User \u2014 acesso padr\xE3o",
  PLANNER: "Planner \u2014 planejamento",
  EXECUTIONER: "Executioner \u2014 execu\xE7\xE3o em campo"
};
var extractRole = (u) => {
  var _a, _b, _c, _d, _e, _f;
  const raw = (_f = (_e = (_c = u == null ? void 0 : u.role) != null ? _c : (_b = (_a = u == null ? void 0 : u.userRoles) == null ? void 0 : _a[0]) == null ? void 0 : _b.role) != null ? _e : (_d = u == null ? void 0 : u.userRole) == null ? void 0 : _d.role) != null ? _f : null;
  if (typeof raw !== "string") return null;
  const upper = raw.toUpperCase();
  return ROLE_VALUES.includes(upper) ? upper : null;
};
var inputCls = "h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10 disabled:opacity-50";
var Field = ({
  label,
  required,
  children
}) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col gap-1.5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-300", children: [
    label,
    required && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-red-500 ml-0.5", children: "*" })
  ] }),
  children
] });
var UserForm = ({
  initialUser,
  setores = [],
  mode = "auto",
  onSubmit,
  onCancel,
  onDelete,
  errorMessage,
  disabled = false,
  canEditRole = true,
  className = ""
}) => {
  var _a, _b, _c;
  const isEdit = mode === "edit" || mode === "auto" && !!initialUser;
  const [values, setValues] = (0, import_react3.useState)(() => {
    var _a2, _b2, _c2, _d, _e, _f, _g;
    return {
      firstName: (_a2 = initialUser == null ? void 0 : initialUser.firstName) != null ? _a2 : "",
      lastName: (_b2 = initialUser == null ? void 0 : initialUser.lastName) != null ? _b2 : "",
      email: (_c2 = initialUser == null ? void 0 : initialUser.email) != null ? _c2 : "",
      contact: (_d = initialUser == null ? void 0 : initialUser.contact) != null ? _d : "",
      role: extractRole(initialUser),
      setorId: (_f = (_e = initialUser == null ? void 0 : initialUser.userSetor) == null ? void 0 : _e.setorId) != null ? _f : null,
      active: (_g = initialUser == null ? void 0 : initialUser.active) != null ? _g : true
    };
  });
  (0, import_react3.useEffect)(() => {
    var _a2, _b2, _c2, _d, _e, _f, _g;
    if (!initialUser) return;
    setValues({
      firstName: (_a2 = initialUser.firstName) != null ? _a2 : "",
      lastName: (_b2 = initialUser.lastName) != null ? _b2 : "",
      email: (_c2 = initialUser.email) != null ? _c2 : "",
      contact: (_d = initialUser.contact) != null ? _d : "",
      role: extractRole(initialUser),
      setorId: (_f = (_e = initialUser.userSetor) == null ? void 0 : _e.setorId) != null ? _f : null,
      active: (_g = initialUser.active) != null ? _g : true
    });
  }, [initialUser]);
  const isValid = (0, import_react3.useMemo)(
    () => values.firstName.trim().length > 0 && values.lastName.trim().length > 0 && /\S+@\S+\.\S+/.test(values.email),
    [values]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || disabled) return;
    onSubmit(values);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("form", { onSubmit: handleSubmit, className: `flex flex-col gap-4 ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Field, { label: "Nome", required: true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "input",
        {
          type: "text",
          value: values.firstName,
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, firstName: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Field, { label: "Sobrenome", required: true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "input",
        {
          type: "text",
          value: values.lastName,
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, lastName: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Field, { label: "Email", required: true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "input",
        {
          type: "email",
          value: values.email,
          disabled: disabled || isEdit,
          onChange: (e) => setValues((v) => ({ ...v, email: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Field, { label: "Contato", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "input",
        {
          type: "text",
          value: (_a = values.contact) != null ? _a : "",
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, contact: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Field, { label: "Role", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "select",
        {
          value: (_b = values.role) != null ? _b : "",
          disabled: disabled || !canEditRole,
          title: !canEditRole ? "Apenas Owner, Dev e Admin podem alterar role." : void 0,
          onChange: (e) => setValues((v) => ({
            ...v,
            role: e.target.value === "" ? null : e.target.value
          })),
          className: inputCls,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "", children: "\u2014 sem role \u2014" }),
            ROLE_VALUES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: r, children: ROLE_LABEL[r] }, r))
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Field, { label: "Setor", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "select",
        {
          value: (_c = values.setorId) != null ? _c : "",
          disabled,
          onChange: (e) => setValues((v) => ({
            ...v,
            setorId: e.target.value === "" ? null : e.target.value
          })),
          className: inputCls,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "", children: "\u2014 sem setor \u2014" }),
            setores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: s.id, children: s.nome }, s.id))
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "input",
        {
          type: "checkbox",
          checked: !!values.active,
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, active: e.target.checked }))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-neutral-700 dark:text-neutral-300", children: "Usu\xE1rio ativo" })
    ] }),
    errorMessage && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-red-600", children: errorMessage }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: isEdit && onDelete && initialUser && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "button",
        {
          type: "button",
          onClick: () => onDelete(initialUser),
          disabled,
          className: "px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
          children: "Desativar usu\xE1rio"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex gap-2", children: [
        onCancel && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "button",
            onClick: onCancel,
            disabled,
            className: "px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "submit",
            disabled: !isValid || disabled,
            className: "px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium disabled:opacity-50",
            children: isEdit ? "Salvar" : "Criar usu\xE1rio"
          }
        )
      ] })
    ] })
  ] });
};

// src/setores/SetorTable.tsx
var import_react4 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var SetorTable = ({
  setores,
  isLoading = false,
  onEdit,
  onDelete,
  onCreate,
  userCountBySetorId,
  className = ""
}) => {
  const [search, setSearch] = (0, import_react4.useState)("");
  const filtered = (0, import_react4.useMemo)(() => {
    const term = search.trim().toLowerCase();
    if (!term) return setores;
    return setores.filter(
      (s) => {
        var _a, _b;
        return ((_a = s.nome) != null ? _a : "").toLowerCase().includes(term) || ((_b = s.descricao) != null ? _b : "").toLowerCase().includes(term);
      }
    );
  }, [setores, search]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "section",
    {
      className: `bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { className: "px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: "Setores" }),
          onCreate && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "button",
            {
              type: "button",
              onClick: onCreate,
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { "aria-hidden": true, children: "+" }),
                " Novo setor"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "px-6 py-3 border-b border-neutral-200 dark:border-neutral-800", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "input",
          {
            type: "search",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Buscar setor...",
            className: "w-full h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
          }
        ) }),
        isLoading ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: [1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", { className: "px-6 py-3 space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-1/4" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded animate-pulse w-2/3" })
        ] }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "px-6 py-16 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50", children: setores.length === 0 ? "Nenhum setor cadastrado" : "Nenhum setor corresponde \xE0 busca" }),
          setores.length === 0 && onCreate && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "button",
            {
              type: "button",
              onClick: onCreate,
              className: "mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { "aria-hidden": true, children: "+" }),
                " Criar primeiro setor"
              ]
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: filtered.map((s) => {
          const count = userCountBySetorId == null ? void 0 : userCountBySetorId[s.id];
          return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "li",
            {
              className: "group px-6 py-3 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "font-medium text-sm text-neutral-900 dark:text-neutral-50 truncate", children: s.nome }),
                  s.descricao && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5", children: s.descricao })
                ] }),
                typeof count === "number" && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: [
                  count,
                  " ",
                  count === 1 ? "usu\xE1rio" : "usu\xE1rios"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity", children: [
                  onEdit && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => onEdit(s),
                      "aria-label": `Editar ${s.nome}`,
                      className: "p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M11 1.5L14.5 5l-9 9H2v-3.5l9-9z", strokeLinejoin: "round" }) })
                    }
                  ),
                  onDelete && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => onDelete(s),
                      "aria-label": `Excluir ${s.nome}`,
                      className: "p-1.5 rounded-md text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
                      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M2.5 4h11M6 4V2.5h4V4M5 4l.5 9.5h5L11 4M6.5 7v4M9.5 7v4", strokeLinecap: "round", strokeLinejoin: "round" }) })
                    }
                  )
                ] })
              ]
            },
            s.id
          );
        }) }),
        !isLoading && filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("footer", { className: "px-6 py-2.5 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400", children: [
          filtered.length,
          " de ",
          setores.length,
          " ",
          setores.length === 1 ? "setor" : "setores"
        ] })
      ]
    }
  );
};

// src/setores/SetorFormModal.tsx
var import_react5 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var SetorFormModal = ({
  open,
  onClose,
  initial,
  onSubmit,
  onDelete,
  errorMessage
}) => {
  var _a;
  const isEdit = !!initial;
  const [values, setValues] = (0, import_react5.useState)({ nome: "", descricao: "" });
  const [submitting, setSubmitting] = (0, import_react5.useState)(false);
  (0, import_react5.useEffect)(() => {
    var _a2, _b;
    if (open) {
      setValues({
        nome: (_a2 = initial == null ? void 0 : initial.nome) != null ? _a2 : "",
        descricao: (_b = initial == null ? void 0 : initial.descricao) != null ? _b : ""
      });
      setSubmitting(false);
    }
  }, [open, initial]);
  const valid = values.nome.trim().length > 0;
  const handleSubmit = async (e) => {
    var _a2;
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit({ nome: values.nome.trim(), descricao: ((_a2 = values.descricao) == null ? void 0 : _a2.trim()) || void 0 }, initial);
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Modal, { open, onClose, title: isEdit ? "Editar setor" : "Novo setor", size: "md", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-300", children: [
        "Nome ",
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "input",
        {
          type: "text",
          value: values.nome,
          onChange: (e) => setValues((v) => ({ ...v, nome: e.target.value })),
          disabled: submitting,
          autoFocus: true,
          className: "h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-300", children: "Descri\xE7\xE3o" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "textarea",
        {
          value: (_a = values.descricao) != null ? _a : "",
          onChange: (e) => setValues((v) => ({ ...v, descricao: e.target.value })),
          disabled: submitting,
          rows: 3,
          className: "px-3 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 resize-none"
        }
      )
    ] }),
    errorMessage && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-sm text-red-600", children: errorMessage }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex justify-between items-center gap-2 mt-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: isEdit && onDelete && initial && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          type: "button",
          onClick: () => void onDelete(initial),
          disabled: submitting,
          className: "px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
          children: "Excluir"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            onClick: onClose,
            disabled: submitting,
            className: "px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "submit",
            disabled: !valid || submitting,
            className: "px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium disabled:opacity-50",
            children: submitting ? "Salvando..." : isEdit ? "Salvar" : "Criar"
          }
        )
      ] })
    ] })
  ] }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Avatar,
  Modal,
  ROLE_VALUES,
  RolePill,
  SetorFormModal,
  SetorTable,
  UserForm,
  UserTable
});
//# sourceMappingURL=index.js.map