// src/shared/Modal.tsx
import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var SIZE = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
};
var Modal = ({ open, onClose, title, children, size = "md" }) => {
  const ref = useRef(null);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          onClick: (e) => e.stopPropagation(),
          className: `w-full ${SIZE[size]} bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden`,
          children: [
            title && /* @__PURE__ */ jsx("div", { className: "px-5 py-4 border-b border-neutral-200 dark:border-neutral-800", children: /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-neutral-900 dark:text-neutral-50", children: title }) }),
            /* @__PURE__ */ jsx("div", { className: "px-5 py-4", children })
          ]
        }
      )
    }
  );
};

// src/shared/Avatar.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: `inline-flex items-center justify-center rounded-full font-semibold ${SIZE2[size]} ${color}`,
      "aria-hidden": true,
      children: initials(name)
    }
  );
};

// src/shared/RolePill.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ROLE_VALUES = ["OWNER", "ADMIN", "USER", "PLANNER", "EXECUTIONER"];
var STYLE = {
  OWNER: "bg-amber-100 text-amber-900 ring-amber-200",
  ADMIN: "bg-violet-100 text-violet-900 ring-violet-200",
  USER: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  PLANNER: "bg-sky-100 text-sky-900 ring-sky-200",
  EXECUTIONER: "bg-emerald-100 text-emerald-900 ring-emerald-200"
};
var LABEL = {
  OWNER: "Owner",
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
  const upper = (role != null ? role : "").toUpperCase();
  const isKnown = ROLE_VALUES.includes(upper);
  if (!isKnown) {
    return /* @__PURE__ */ jsx3("span", { className: `inline-flex items-center rounded-md ring-1 ring-inset ring-neutral-200 bg-neutral-50 text-neutral-500 font-medium ${SIZE3[size]}`, children: "\u2014" });
  }
  return /* @__PURE__ */ jsx3("span", { className: `inline-flex items-center rounded-md ring-1 ring-inset font-medium ${STYLE[upper]} ${SIZE3[size]}`, children: LABEL[upper] });
};

// src/users/UserTable.tsx
import { useMemo, useState } from "react";
import { Fragment, jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var fullName = (u) => {
  var _a, _b, _c;
  const derived = (_c = u._fullName) != null ? _c : `${(_a = u.firstName) != null ? _a : ""} ${(_b = u.lastName) != null ? _b : ""}`.trim();
  return derived || u.email || "\u2014";
};
var userRole = (u) => {
  var _a, _b, _c;
  const raw = (_c = (_b = u.role) != null ? _b : (_a = u.userRole) == null ? void 0 : _a.role) != null ? _c : null;
  if (typeof raw !== "string") return null;
  const upper = raw.toUpperCase();
  return ROLE_VALUES.includes(upper) ? upper : null;
};
var userSetorName = (u) => {
  var _a, _b, _c;
  return (_c = (_b = u.setor) != null ? _b : (_a = u.userSetor) == null ? void 0 : _a.setor) != null ? _c : "\u2014";
};
var UserTable = ({
  users,
  isLoading = false,
  onEditUser,
  onDeleteUser,
  onCreateUser,
  onInviteByEmail,
  subtitle,
  className = ""
}) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return users.filter((u) => {
      var _a;
      if (roleFilter !== "ALL" && userRole(u) !== roleFilter) return false;
      if (!term) return true;
      const hay = `${fullName(u)} ${(_a = u.email) != null ? _a : ""}`.toLowerCase();
      return hay.includes(term);
    });
  }, [users, search, roleFilter]);
  return /* @__PURE__ */ jsxs2(
    "section",
    {
      className: `bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ jsxs2("header", { className: "px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx4("h1", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: "Usu\xE1rios" }),
            subtitle && /* @__PURE__ */ jsx4("p", { className: "text-sm text-neutral-500 dark:text-neutral-400 mt-0.5", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex gap-2", children: [
            onInviteByEmail && /* @__PURE__ */ jsxs2(
              "button",
              {
                type: "button",
                onClick: onInviteByEmail,
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors",
                children: [
                  /* @__PURE__ */ jsx4("span", { "aria-hidden": true, children: "\u2709" }),
                  " Convidar por email"
                ]
              }
            ),
            onCreateUser && /* @__PURE__ */ jsxs2(
              "button",
              {
                type: "button",
                onClick: onCreateUser,
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium",
                children: [
                  /* @__PURE__ */ jsx4("span", { "aria-hidden": true, children: "+" }),
                  " Novo usu\xE1rio"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx4(
            "input",
            {
              type: "search",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Buscar por nome ou email...",
              className: "flex-1 min-w-[220px] h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10"
            }
          ),
          /* @__PURE__ */ jsx4("div", { className: "flex gap-1 items-center", role: "tablist", "aria-label": "Filtrar por role", children: ["ALL", ...ROLE_VALUES].map((r) => /* @__PURE__ */ jsx4(
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
        isLoading ? /* @__PURE__ */ jsx4(SkeletonRows, {}) : filtered.length === 0 ? /* @__PURE__ */ jsx4(EmptyState, { query: search, hasUsers: users.length > 0, onCreateUser }) : /* @__PURE__ */ jsx4("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: filtered.map((user) => /* @__PURE__ */ jsx4(
          UserRow,
          {
            user,
            onEdit: onEditUser,
            onDelete: onDeleteUser
          },
          user.id
        )) }),
        !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxs2("footer", { className: "px-6 py-2.5 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400", children: [
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
var UserRow = ({ user, onEdit, onDelete }) => {
  var _a;
  const name = fullName(user);
  const role = userRole(user);
  const setor = userSetorName(user);
  const active = (_a = user.active) != null ? _a : true;
  return /* @__PURE__ */ jsxs2("li", { className: "group px-6 py-3 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors", children: [
    /* @__PURE__ */ jsx4(Avatar, { name }),
    /* @__PURE__ */ jsxs2("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx4("span", { className: "font-medium text-sm text-neutral-900 dark:text-neutral-50 truncate", children: name }),
        !active && /* @__PURE__ */ jsx4("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500", children: "inativo" })
      ] }),
      /* @__PURE__ */ jsx4("div", { className: "text-xs text-neutral-500 dark:text-neutral-400 truncate", children: user.email || "\u2014" })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "hidden sm:block min-w-[110px]", children: /* @__PURE__ */ jsx4(RolePill, { role }) }),
    /* @__PURE__ */ jsx4("div", { className: "hidden md:block min-w-[120px] text-sm text-neutral-600 dark:text-neutral-400 truncate", children: setor }),
    /* @__PURE__ */ jsxs2("div", { className: "flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity", children: [
      onEdit && /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          onClick: () => onEdit(user),
          "aria-label": `Editar ${name}`,
          className: "p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700",
          children: /* @__PURE__ */ jsx4("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx4("path", { d: "M11 1.5L14.5 5l-9 9H2v-3.5l9-9z", strokeLinejoin: "round" }) })
        }
      ),
      onDelete && /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          onClick: () => onDelete(user),
          "aria-label": `Desativar ${name}`,
          className: "p-1.5 rounded-md text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
          children: /* @__PURE__ */ jsx4("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx4("path", { d: "M2.5 4h11M6 4V2.5h4V4M5 4l.5 9.5h5L11 4M6.5 7v4M9.5 7v4", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      )
    ] })
  ] });
};
var SkeletonRows = () => /* @__PURE__ */ jsx4("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs2("li", { className: "px-6 py-3 flex items-center gap-4", children: [
  /* @__PURE__ */ jsx4("div", { className: "w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" }),
  /* @__PURE__ */ jsxs2("div", { className: "flex-1 space-y-2", children: [
    /* @__PURE__ */ jsx4("div", { className: "h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-1/3" }),
    /* @__PURE__ */ jsx4("div", { className: "h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded animate-pulse w-1/2" })
  ] }),
  /* @__PURE__ */ jsx4("div", { className: "w-16 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 animate-pulse" })
] }, i)) });
var EmptyState = ({ query, hasUsers, onCreateUser }) => /* @__PURE__ */ jsxs2("div", { className: "px-6 py-16 text-center", children: [
  /* @__PURE__ */ jsx4("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-3", children: /* @__PURE__ */ jsxs2("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "text-neutral-500", children: [
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ jsx4("path", { d: "M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8" })
  ] }) }),
  hasUsers && query ? /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx4("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50", children: "Nenhum usu\xE1rio corresponde \xE0 busca" }),
    /* @__PURE__ */ jsx4("p", { className: "text-xs text-neutral-500 mt-1", children: "Tente outro termo ou limpe os filtros." })
  ] }) : /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx4("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50", children: "Sua equipe est\xE1 vazia" }),
    /* @__PURE__ */ jsx4("p", { className: "text-xs text-neutral-500 mt-1 mb-4", children: "Crie o primeiro usu\xE1rio ou convide algu\xE9m por email." }),
    onCreateUser && /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        onClick: onCreateUser,
        className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium",
        children: [
          /* @__PURE__ */ jsx4("span", { "aria-hidden": true, children: "+" }),
          " Novo usu\xE1rio"
        ]
      }
    )
  ] })
] });

// src/users/UserForm.tsx
import { useEffect as useEffect2, useMemo as useMemo2, useState as useState2 } from "react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var ROLE_LABEL = {
  OWNER: "Owner \u2014 propriet\xE1rio da empresa",
  ADMIN: "Admin \u2014 administrador",
  USER: "User \u2014 acesso padr\xE3o",
  PLANNER: "Planner \u2014 planejamento",
  EXECUTIONER: "Executioner \u2014 execu\xE7\xE3o em campo"
};
var extractRole = (u) => {
  var _a, _b, _c;
  const raw = (_c = (_b = u == null ? void 0 : u.role) != null ? _b : (_a = u == null ? void 0 : u.userRole) == null ? void 0 : _a.role) != null ? _c : null;
  if (typeof raw !== "string") return null;
  const upper = raw.toUpperCase();
  return ROLE_VALUES.includes(upper) ? upper : null;
};
var inputCls = "h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10 disabled:opacity-50";
var Field = ({
  label,
  required,
  children
}) => /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-1.5", children: [
  /* @__PURE__ */ jsxs3("label", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-300", children: [
    label,
    required && /* @__PURE__ */ jsx5("span", { className: "text-red-500 ml-0.5", children: "*" })
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
  className = ""
}) => {
  var _a, _b, _c;
  const isEdit = mode === "edit" || mode === "auto" && !!initialUser;
  const [values, setValues] = useState2(() => {
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
  useEffect2(() => {
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
  const isValid = useMemo2(
    () => values.firstName.trim().length > 0 && values.lastName.trim().length > 0 && /\S+@\S+\.\S+/.test(values.email),
    [values]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || disabled) return;
    onSubmit(values);
  };
  return /* @__PURE__ */ jsxs3("form", { onSubmit: handleSubmit, className: `flex flex-col gap-4 ${className}`, children: [
    /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx5(Field, { label: "Nome", required: true, children: /* @__PURE__ */ jsx5(
        "input",
        {
          type: "text",
          value: values.firstName,
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, firstName: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ jsx5(Field, { label: "Sobrenome", required: true, children: /* @__PURE__ */ jsx5(
        "input",
        {
          type: "text",
          value: values.lastName,
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, lastName: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ jsx5(Field, { label: "Email", required: true, children: /* @__PURE__ */ jsx5(
        "input",
        {
          type: "email",
          value: values.email,
          disabled: disabled || isEdit,
          onChange: (e) => setValues((v) => ({ ...v, email: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ jsx5(Field, { label: "Contato", children: /* @__PURE__ */ jsx5(
        "input",
        {
          type: "text",
          value: (_a = values.contact) != null ? _a : "",
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, contact: e.target.value })),
          className: inputCls
        }
      ) }),
      /* @__PURE__ */ jsx5(Field, { label: "Role", children: /* @__PURE__ */ jsxs3(
        "select",
        {
          value: (_b = values.role) != null ? _b : "",
          disabled,
          onChange: (e) => setValues((v) => ({
            ...v,
            role: e.target.value === "" ? null : e.target.value
          })),
          className: inputCls,
          children: [
            /* @__PURE__ */ jsx5("option", { value: "", children: "\u2014 sem role \u2014" }),
            ROLE_VALUES.map((r) => /* @__PURE__ */ jsx5("option", { value: r, children: ROLE_LABEL[r] }, r))
          ]
        }
      ) }),
      /* @__PURE__ */ jsx5(Field, { label: "Setor", children: /* @__PURE__ */ jsxs3(
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
            /* @__PURE__ */ jsx5("option", { value: "", children: "\u2014 sem setor \u2014" }),
            setores.map((s) => /* @__PURE__ */ jsx5("option", { value: s.id, children: s.nome }, s.id))
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs3("label", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx5(
        "input",
        {
          type: "checkbox",
          checked: !!values.active,
          disabled,
          onChange: (e) => setValues((v) => ({ ...v, active: e.target.checked }))
        }
      ),
      /* @__PURE__ */ jsx5("span", { className: "text-neutral-700 dark:text-neutral-300", children: "Usu\xE1rio ativo" })
    ] }),
    errorMessage && /* @__PURE__ */ jsx5("p", { className: "text-sm text-red-600", children: errorMessage }),
    /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800", children: [
      /* @__PURE__ */ jsx5("div", { children: isEdit && onDelete && initialUser && /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          onClick: () => onDelete(initialUser),
          disabled,
          className: "px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
          children: "Desativar usu\xE1rio"
        }
      ) }),
      /* @__PURE__ */ jsxs3("div", { className: "flex gap-2", children: [
        onCancel && /* @__PURE__ */ jsx5(
          "button",
          {
            type: "button",
            onClick: onCancel,
            disabled,
            className: "px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx5(
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
import { useMemo as useMemo3, useState as useState3 } from "react";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var SetorTable = ({
  setores,
  isLoading = false,
  onEdit,
  onDelete,
  onCreate,
  userCountBySetorId,
  className = ""
}) => {
  const [search, setSearch] = useState3("");
  const filtered = useMemo3(() => {
    const term = search.trim().toLowerCase();
    if (!term) return setores;
    return setores.filter(
      (s) => {
        var _a, _b;
        return ((_a = s.nome) != null ? _a : "").toLowerCase().includes(term) || ((_b = s.descricao) != null ? _b : "").toLowerCase().includes(term);
      }
    );
  }, [setores, search]);
  return /* @__PURE__ */ jsxs4(
    "section",
    {
      className: `bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ jsxs4("header", { className: "px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx6("h1", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: "Setores" }),
          onCreate && /* @__PURE__ */ jsxs4(
            "button",
            {
              type: "button",
              onClick: onCreate,
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium",
              children: [
                /* @__PURE__ */ jsx6("span", { "aria-hidden": true, children: "+" }),
                " Novo setor"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx6("div", { className: "px-6 py-3 border-b border-neutral-200 dark:border-neutral-800", children: /* @__PURE__ */ jsx6(
          "input",
          {
            type: "search",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Buscar setor...",
            className: "w-full h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
          }
        ) }),
        isLoading ? /* @__PURE__ */ jsx6("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs4("li", { className: "px-6 py-3 space-y-2", children: [
          /* @__PURE__ */ jsx6("div", { className: "h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-1/4" }),
          /* @__PURE__ */ jsx6("div", { className: "h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded animate-pulse w-2/3" })
        ] }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs4("div", { className: "px-6 py-16 text-center", children: [
          /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50", children: setores.length === 0 ? "Nenhum setor cadastrado" : "Nenhum setor corresponde \xE0 busca" }),
          setores.length === 0 && onCreate && /* @__PURE__ */ jsxs4(
            "button",
            {
              type: "button",
              onClick: onCreate,
              className: "mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium",
              children: [
                /* @__PURE__ */ jsx6("span", { "aria-hidden": true, children: "+" }),
                " Criar primeiro setor"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsx6("ul", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: filtered.map((s) => {
          const count = userCountBySetorId == null ? void 0 : userCountBySetorId[s.id];
          return /* @__PURE__ */ jsxs4(
            "li",
            {
              className: "group px-6 py-3 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors",
              children: [
                /* @__PURE__ */ jsxs4("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx6("div", { className: "font-medium text-sm text-neutral-900 dark:text-neutral-50 truncate", children: s.nome }),
                  s.descricao && /* @__PURE__ */ jsx6("div", { className: "text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5", children: s.descricao })
                ] }),
                typeof count === "number" && /* @__PURE__ */ jsxs4("span", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: [
                  count,
                  " ",
                  count === 1 ? "usu\xE1rio" : "usu\xE1rios"
                ] }),
                /* @__PURE__ */ jsxs4("div", { className: "flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity", children: [
                  onEdit && /* @__PURE__ */ jsx6(
                    "button",
                    {
                      type: "button",
                      onClick: () => onEdit(s),
                      "aria-label": `Editar ${s.nome}`,
                      className: "p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                      children: /* @__PURE__ */ jsx6("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx6("path", { d: "M11 1.5L14.5 5l-9 9H2v-3.5l9-9z", strokeLinejoin: "round" }) })
                    }
                  ),
                  onDelete && /* @__PURE__ */ jsx6(
                    "button",
                    {
                      type: "button",
                      onClick: () => onDelete(s),
                      "aria-label": `Excluir ${s.nome}`,
                      className: "p-1.5 rounded-md text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
                      children: /* @__PURE__ */ jsx6("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx6("path", { d: "M2.5 4h11M6 4V2.5h4V4M5 4l.5 9.5h5L11 4M6.5 7v4M9.5 7v4", strokeLinecap: "round", strokeLinejoin: "round" }) })
                    }
                  )
                ] })
              ]
            },
            s.id
          );
        }) }),
        !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxs4("footer", { className: "px-6 py-2.5 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400", children: [
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
import { useEffect as useEffect3, useState as useState4 } from "react";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
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
  const [values, setValues] = useState4({ nome: "", descricao: "" });
  const [submitting, setSubmitting] = useState4(false);
  useEffect3(() => {
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
  return /* @__PURE__ */ jsx7(Modal, { open, onClose, title: isEdit ? "Editar setor" : "Novo setor", size: "md", children: /* @__PURE__ */ jsxs5("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs5("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxs5("span", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-300", children: [
        "Nome ",
        /* @__PURE__ */ jsx7("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx7(
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
    /* @__PURE__ */ jsxs5("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsx7("span", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-300", children: "Descri\xE7\xE3o" }),
      /* @__PURE__ */ jsx7(
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
    errorMessage && /* @__PURE__ */ jsx7("p", { className: "text-sm text-red-600", children: errorMessage }),
    /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-center gap-2 mt-2", children: [
      /* @__PURE__ */ jsx7("div", { children: isEdit && onDelete && initial && /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          onClick: () => void onDelete(initial),
          disabled: submitting,
          className: "px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
          children: "Excluir"
        }
      ) }),
      /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            onClick: onClose,
            disabled: submitting,
            className: "px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx7(
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
export {
  Avatar,
  Modal,
  ROLE_VALUES,
  RolePill,
  SetorFormModal,
  SetorTable,
  UserForm,
  UserTable
};
//# sourceMappingURL=index.mjs.map