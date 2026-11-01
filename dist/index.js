import { h as H, resolveDynamicComponent as Y } from "vue";
import { generalVal as Ke } from "@wbc-ui/core";
function it(e, t) {
  const s = [];
  if (!e || typeof e != "object") return s;
  t in e && s.push(e);
  for (const l in e)
    e[l] && typeof e[l] == "object" && !Array.isArray(e[l]) && s.push(...it(e[l], t));
  return s;
}
function X(e, t) {
  const s = [];
  if (!e || typeof e != "object") return s;
  t in e && s.push(e[t]);
  for (const l in e)
    e[l] && typeof e[l] == "object" && !Array.isArray(e[l]) && s.push(...X(e[l], t));
  return s;
}
function rt(e) {
  return typeof e != "string" ? [] : e.replace(/\[\s*(\d+)\s*\]/g, ".$1").split(".").map((t) => t.trim()).filter(Boolean);
}
function K(e, t) {
  if (e == null || typeof t != "string" || !t.trim())
    return { found: !1, value: void 0 };
  if (typeof e == "object" && Object.prototype.hasOwnProperty.call(e, t))
    return { found: !0, value: e[t] };
  let s = e;
  for (const l of rt(t)) {
    if (s == null || typeof s != "object" && typeof s != "function")
      return { found: !1, value: void 0 };
    if (!Object.prototype.hasOwnProperty.call(s, l))
      return { found: !1, value: void 0 };
    s = s[l];
  }
  return { found: !0, value: s };
}
function et(e) {
  return typeof e == "string" && (e.includes(".") || /\[\s*\d+\s*\]/.test(e));
}
const tt = [
  "#ffeb3b",
  "#ff9800",
  "#4caf50",
  "#03a9f4",
  "#e91e63",
  "#9c27b0",
  "#00bcd4",
  "#8bc34a",
  "#ff5722",
  "#607d8b",
  "#f44336",
  "#3f51b5"
], ut = {
  searchInput: "globalSearch",
  filterExprInput: "globalFilter",
  columnFilterBar: "columnFilters",
  columnSearchBar: "columnSearch",
  paginationBar: "pagination",
  sort: "sort"
}, pt = /* @__PURE__ */ new Set([
  "output",
  "childOutput",
  "typeTable",
  "editable",
  "theme",
  "boxed",
  "showHeader",
  "copyable",
  "rowDel",
  "rowSave",
  "rowAdd",
  "cellEdit",
  "cellDel",
  "cellSave",
  "smartInput",
  "sort",
  "pagination",
  "globalSearch",
  "globalSearchScope",
  "globalFilter",
  "globalFilterScope",
  "columnSearch",
  "columnFilters",
  "nestedScrollable",
  "scrollable",
  "configByPath"
]), dt = /* @__PURE__ */ new Set(["_path_", "_as_", "_parent_", "_config_", "_sync_"]);
function me(e) {
  if (typeof e != "string" || e.length < 3 || e[0] !== "_" || e[e.length - 1] !== "_") return null;
  const t = e.slice(1, -1);
  return pt.has(t) ? t : null;
}
function Z(e) {
  return dt.has(e) || me(e) != null;
}
const ne = Symbol("wbdv-native-cell");
function _e(e, t) {
  return e === t ? !0 : Array.isArray(e) ? e.some((s) => _e(s, t)) : e && typeof e == "object" ? Object.values(e).some((s) => _e(s, t)) : !1;
}
function Ae(e, t, s = /* @__PURE__ */ new Set()) {
  return typeof e == "string" ? (e in t && s.add(e), s) : Array.isArray(e) ? (e.forEach((l) => Ae(l, t, s)), s) : (e && typeof e == "object" && Object.values(e).forEach((l) => Ae(l, t, s)), s);
}
function $e(e) {
  const t = [];
  let s = 0;
  for (; s < e.length; ) {
    if (/\s/.test(e[s])) {
      s++;
      continue;
    }
    if (e[s] === "(") {
      t.push({ type: "LPAREN" }), s++;
      continue;
    }
    if (e[s] === ")") {
      t.push({ type: "RPAREN" }), s++;
      continue;
    }
    if (e[s] === "&" && e[s + 1] === "&") {
      t.push({ type: "AND" }), s += 2;
      continue;
    }
    if (e[s] === "|" && e[s + 1] === "|") {
      t.push({ type: "OR" }), s += 2;
      continue;
    }
    if (e.slice(s, s + 3) === "===") {
      t.push({ type: "CMP", op: "==" }), s += 3;
      continue;
    }
    if (e.slice(s, s + 3) === "!==") {
      t.push({ type: "CMP", op: "!=" }), s += 3;
      continue;
    }
    if (e[s] === "=" && e[s + 1] === "=") {
      t.push({ type: "CMP", op: "==" }), s += 2;
      continue;
    }
    if (e[s] === "!" && e[s + 1] === "=") {
      t.push({ type: "CMP", op: "!=" }), s += 2;
      continue;
    }
    if (e[s] === "<" && e[s + 1] === "=") {
      t.push({ type: "CMP", op: "<=" }), s += 2;
      continue;
    }
    if (e[s] === ">" && e[s + 1] === "=") {
      t.push({ type: "CMP", op: ">=" }), s += 2;
      continue;
    }
    if (e[s] === "<") {
      t.push({ type: "CMP", op: "<" }), s++;
      continue;
    }
    if (e[s] === ">") {
      t.push({ type: "CMP", op: ">" }), s++;
      continue;
    }
    if (e[s] === "!") {
      t.push({ type: "NOT" }), s++;
      continue;
    }
    if (e[s] === "+") {
      t.push({ type: "PLUS" }), s++;
      continue;
    }
    if (e[s] === "-") {
      t.push({ type: "MINUS" }), s++;
      continue;
    }
    if (e[s] === '"' || e[s] === "'" || e[s] === "`") {
      const l = e[s++];
      let i = "", o = !1;
      for (; s < e.length; ) {
        if (e[s] === "\\" && s + 1 < e.length) {
          i += e[s + 1], s += 2;
          continue;
        }
        if (e[s] === l) {
          s++, o = !0;
          break;
        }
        i += e[s++];
      }
      if (!o) throw new Error("Unterminated string");
      t.push({ type: "STR", value: i });
      continue;
    }
    if (/[0-9]/.test(e[s]) || e[s] === "." && s + 1 < e.length && /[0-9]/.test(e[s + 1])) {
      let l = "";
      for (; s < e.length && /[0-9]/.test(e[s]); ) l += e[s++];
      if (s < e.length && e[s] === ".")
        for (l += e[s++]; s < e.length && /[0-9]/.test(e[s]); ) l += e[s++];
      if (s < e.length && (e[s] === "e" || e[s] === "E"))
        for (l += e[s++], s < e.length && (e[s] === "+" || e[s] === "-") && (l += e[s++]); s < e.length && /[0-9]/.test(e[s]); ) l += e[s++];
      t.push({ type: "NUM", value: parseFloat(l) });
      continue;
    }
    if (/[a-zA-Z_$]/.test(e[s])) {
      let l = "";
      for (; s < e.length && /[a-zA-Z0-9_$.]/.test(e[s]); ) l += e[s++];
      t.push({ type: "ID", name: l });
      continue;
    }
    throw new Error("Unexpected character: " + e[s]);
  }
  return t.push({ type: "EOF" }), t;
}
function Fe(e) {
  let t = 0;
  const s = () => e[t], l = () => e[t++];
  function i() {
    let h = o();
    for (; s().type === "OR"; )
      l(), h = { type: "OR", left: h, right: o() };
    return h;
  }
  function o() {
    let h = a();
    for (; s().type === "AND"; )
      l(), h = { type: "AND", left: h, right: a() };
    return h;
  }
  function a() {
    const h = r();
    return s().type === "CMP" ? { type: "CMP", op: l().op, left: h, right: r() } : h;
  }
  function r() {
    return s().type === "NOT" ? (l(), { type: "NOT", arg: r() }) : s().type === "MINUS" ? (l(), { type: "NEG", arg: r() }) : s().type === "PLUS" ? (l(), r()) : n();
  }
  function n() {
    const h = s();
    if (h.type === "NUM")
      return l(), { type: "NUM", value: h.value };
    if (h.type === "STR")
      return l(), { type: "STR", value: h.value };
    if (h.type === "ID")
      return l(), h.name === "true" ? { type: "BOOL", value: !0 } : h.name === "false" ? { type: "BOOL", value: !1 } : h.name === "null" ? { type: "NULL" } : { type: "VAR", name: h.name };
    if (h.type === "LPAREN") {
      l();
      const p = i();
      if (s().type !== "RPAREN") throw new Error("Expected )");
      return l(), p;
    }
    throw new Error("Unexpected token: " + h.type);
  }
  const c = i();
  if (s().type !== "EOF") throw new Error("Unexpected token after expression");
  return c;
}
function L(e, t) {
  switch (e.type) {
    case "NUM":
      return e.value;
    case "STR":
      return e.value;
    case "BOOL":
      return e.value;
    case "NULL":
      return null;
    case "VAR":
      return e.name.split(".").reduce((s, l) => s == null ? void 0 : s[l], t);
    case "NOT":
      return !L(e.arg, t);
    case "NEG":
      return -L(e.arg, t);
    case "AND":
      return L(e.left, t) && L(e.right, t);
    case "OR":
      return L(e.left, t) || L(e.right, t);
    case "CMP": {
      const s = L(e.left, t), l = L(e.right, t);
      switch (e.op) {
        case "==":
          return s == l;
        case "!=":
          return s != l;
        case "<":
          return s < l;
        case ">":
          return s > l;
        case "<=":
          return s <= l;
        case ">=":
          return s >= l;
        default:
          return !1;
      }
    }
    default:
      return !1;
  }
}
function ft(e, t) {
  try {
    const s = $e(e), l = Fe(s);
    return L(l, t);
  } catch {
    return;
  }
}
const st = {
  required(e, t = {}) {
    var s;
    return t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: "This field is required.", fr: "Ce champ est requis.", ar: "هذه الخانة مطلوبه." }), e != null && String(e).length !== 0 || (typeof t.message == "string" ? t.message : (s = t.message) == null ? void 0 : s[t.lg]) || JSON.stringify(t.message);
  },
  maxLength(e, t = {}) {
    var s;
    return t.len ?? (t.len = 25), t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: `Max ${t.len} characters allowed.`, fr: `Au maximum ${t.len} caractères.`, ar: `الحد الأقصى ${t.len}.` }), e != null && String(e).length <= t.len || (typeof t.message == "string" ? t.message : (s = t.message) == null ? void 0 : s[t.lg]);
  },
  minLength(e, t = {}) {
    var s;
    return t.len ?? (t.len = 4), t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: `Min ${t.len} characters allowed.`, fr: `Au minimum ${t.len} caractères.`, ar: `الحد الأدنى ${t.len}.` }), e != null && String(e).length >= t.len || (typeof t.message == "string" ? t.message : (s = t.message) == null ? void 0 : s[t.lg]);
  },
  upperCharNb(e, t = {}) {
    var l;
    if (t.len ?? (t.len = 1), t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: `At least ${t.len} uppercase letter.`, fr: `Au moins ${t.len} majuscule.`, ar: `على الأقل ${t.len} حرف كبير.` }), e == null) return !0;
    const s = String(e).match(/[A-Z]/g);
    return s && s.length >= t.len || (typeof t.message == "string" ? t.message : (l = t.message) == null ? void 0 : l[t.lg]);
  },
  lowerCharNb(e, t = {}) {
    var l;
    if (t.len ?? (t.len = 1), t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: `At least ${t.len} lowercase letter.`, fr: `Au moins ${t.len} minuscule.`, ar: `على الأقل ${t.len} حرف صغير.` }), e == null) return !0;
    const s = String(e).match(/[a-z]/g);
    return s && s.length >= t.len || (typeof t.message == "string" ? t.message : (l = t.message) == null ? void 0 : l[t.lg]);
  },
  specialCharNb(e, t = {}) {
    var l;
    if (t.len ?? (t.len = 1), t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: `At least ${t.len} special char.`, fr: `Au moins ${t.len} caractère spécial.`, ar: `على الأقل ${t.len} حرف خاص.` }), e == null) return !0;
    const s = String(e).match(/[@#$%^&*()_+\-=[\]{}!`;':"\\|,.<>/?]/g);
    return s && s.length >= t.len || (typeof t.message == "string" ? t.message : (l = t.message) == null ? void 0 : l[t.lg]);
  },
  digitCharNb(e, t = {}) {
    var l;
    if (t.len ?? (t.len = 1), t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: `At least ${t.len} digit.`, fr: `Au moins ${t.len} chiffre.`, ar: `على الأقل ${t.len} رقم.` }), e == null) return !0;
    const s = String(e).match(/[0-9]/g);
    return s && s.length >= t.len || (typeof t.message == "string" ? t.message : (l = t.message) == null ? void 0 : l[t.lg]);
  },
  email(e, t = {}) {
    var s;
    return t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: "Invalid email.", fr: "Email non valide.", ar: "بريد غير صالح." }), /^\w+([.\-+]?\w+)*\+*@\w+([.-]?\w+)*(\.\w{2,24})+$/.test(e) || (typeof t.message == "string" ? t.message : (s = t.message) == null ? void 0 : s[t.lg]);
  },
  phone(e, t = {}) {
    var s;
    return t.lg ?? (t.lg = "en"), t.message ?? (t.message = { en: "Invalid phone.", fr: "Téléphone invalide.", ar: "هاتف غير صالح." }), /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(e) || (typeof t.message == "string" ? t.message : (s = t.message) == null ? void 0 : s[t.lg]);
  }
};
function mt(e) {
  if (typeof e != "string") return null;
  const t = e.match(/^\s*(?:\(\s*([A-Za-z_$][\w$]*)\s*\)|([A-Za-z_$][\w$]*))\s*=>\s*([\s\S]+?)\s*$/);
  if (!t) return null;
  const s = t[1] || t[2], i = t[3].match(/^([\s\S]+?)\s*\|\|\s*(['"])([\s\S]*)\2\s*$/);
  if (!i) return null;
  const o = i[1].replace(
    new RegExp(`\\b${s.replace(/[$]/g, "\\$&")}\\.length\\b`, "g"),
    "length"
  );
  let a;
  try {
    a = Fe($e(o));
  } catch {
    return null;
  }
  const r = /* @__PURE__ */ new Set([s, "length"]), n = [], c = (p) => {
    !p || typeof p != "object" || (p.type === "VAR" && n.push(p.name), c(p.left), c(p.right), c(p.arg));
  };
  if (c(a), n.some((p) => !r.has(p))) return null;
  const h = i[3];
  return (p) => !!L(a, {
    [s]: p,
    length: p != null && p.length != null ? p.length : void 0
  }) || h;
}
function ae(e) {
  if (!e) return [];
  if (typeof e == "function") return [e];
  if (typeof e == "string") {
    const t = mt(e);
    if (t) return [t];
    const s = st[e];
    return [s ? ((l) => s(l, {})) : (() => !0)];
  }
  return Array.isArray(e) ? e.flatMap((t) => ae(t)) : typeof e == "object" ? Object.entries(e).map(([t, s]) => {
    if (typeof s == "function") return s;
    const l = st[t];
    return l ? typeof s == "string" ? (i) => l(i, { message: s }) : s && typeof s == "object" ? (i) => l(i, { ...s }) : (i) => l(i, {}) : () => !0;
  }) : [];
}
function z(e, t, s = {}) {
  const { mode: l = "first" } = s;
  if (!e || typeof e != "object" || !t || typeof t != "object")
    return l === "all" ? [] : null;
  if (typeof t._path_ == "string") {
    const r = K(e, t._path_);
    if (!r.found) return l === "all" ? [] : null;
    const n = Object.fromEntries(Object.entries(t).filter(([p]) => !Z(p)));
    let c;
    if (Object.keys(n).length ? Array.isArray(r.value) ? c = r.value.map((p) => p && typeof p == "object" ? z(p, n, { mode: "first" }) : null).filter((p) => p != null) : c = z(r.value, n, { mode: l }) : c = r.value, c == null) return l === "all" ? [] : null;
    const h = t._as_ || t._parent_;
    return h ? { [h]: c } : c;
  }
  function i(r, n, c) {
    const h = {};
    return Object.keys(n).forEach((p) => {
      if (Z(p)) return;
      const g = n[p];
      if (et(p)) {
        const f = K(r, p);
        if (!f.found) return;
        const y = g && typeof g == "object" ? g._parent_ || g._as_ || p : g || p;
        if (g && typeof g == "object") {
          const S = Object.fromEntries(Object.entries(g).filter(([m]) => !Z(m)));
          if (!Object.keys(S).length) h[y] = f.value;
          else if (Array.isArray(f.value))
            h[y] = f.value.map((m) => m && typeof m == "object" ? z(m, S, { mode: "first" }) : null).filter((m) => m != null);
          else {
            const m = z(f.value, S, { mode: c });
            m != null && (h[y] = m);
          }
        } else
          h[y] = f.value;
        return;
      }
      if (g && typeof g == "object") {
        const f = g._parent_ || p, y = X(r, p).find((m) => Array.isArray(m));
        if (y && y.some((m) => m && typeof m == "object" && !Array.isArray(m))) {
          const m = y.map((j) => z(j, g, { mode: c })).filter(Boolean);
          m.length && (h[f] = m);
        } else {
          const m = X(r, p).filter((j) => j && typeof j == "object" && !Array.isArray(j));
          if (m.length > 0) {
            const j = c === "merge" ? m[m.length - 1] : m[0], O = z(j, g, { mode: c });
            O && Object.keys(O).length > 0 && (h[f] = O);
          }
        }
      } else {
        const f = X(r, p);
        f.length > 0 && (h[g || p] = c === "merge" ? f[f.length - 1] : f[0]);
      }
    }), Object.keys(h).length > 0 ? h : null;
  }
  function o(r, n, c) {
    const h = {};
    return Object.keys(n).forEach((p) => {
      if (Z(p)) return;
      const g = n[p];
      if (et(p)) {
        const f = K(r, p);
        if (!f.found) return;
        const y = g && typeof g == "object" ? g._parent_ || g._as_ || p : g || p;
        if (g && typeof g == "object") {
          const S = Object.fromEntries(Object.entries(g).filter(([m]) => !Z(m)));
          if (!Object.keys(S).length) h[y] = f.value;
          else {
            const m = z(f.value, S, { mode: c });
            m != null && (h[y] = m);
          }
        } else h[y] = f.value;
        return;
      }
      if (g && typeof g == "object") {
        const f = g._parent_ || p, y = X(r, p).find((m) => Array.isArray(m));
        if (y && y.some((m) => m && typeof m == "object" && !Array.isArray(m))) {
          const m = y.map((j) => z(j, g, { mode: c })).filter(Boolean);
          m.length && (h[f] = m);
        } else {
          const m = X(r, p).filter((j) => j && typeof j == "object" && !Array.isArray(j));
          if (m.length > c) {
            const j = z(m[c], g, { mode: c });
            j && Object.keys(j).length > 0 && (h[f] = j);
          }
        }
      } else {
        const f = X(r, p);
        f.length > c && (h[g || p] = f[c]);
      }
    }), Object.keys(h).length > 0 ? h : null;
  }
  function a(r, n) {
    const c = Object.keys(n).filter((p) => !Z(p));
    return c.length === 0 ? [] : it(r, c[0]).map((p, g) => z(p, n, { mode: g })).filter(Boolean);
  }
  return l === "all" ? a(e, t) : typeof l == "number" && l >= 0 ? o(e, t, l) : i(e, t, l);
}
const _t = {
  name: "WBDataViewer",
  props: {
    templates: { type: null, default: null },
    config: { type: Object, default: null },
    configByPath: { type: Object, default: null },
    wbCode: { type: null, default: null },
    value: { type: null, default: null },
    // Vue 2 compatibility: resolve descriptor functions against the
    // WBDataViewer item-accessibility context when explicitly enabled.
    tbDive: { type: [Boolean, String], default: !1 },
    output: { type: null, default: null },
    childOutput: { type: [String, Array], default: null },
    copyable: { type: Boolean, default: !0 },
    showHeader: { type: Boolean, default: !0 },
    boxed: { type: Boolean, default: !0 },
    depth: { type: Number, default: 1 },
    global: { type: String, default: "tb" },
    twoWay: { type: Boolean, default: !1 },
    typeTable: { type: String, default: "horiz" },
    smartInput: { type: Boolean, default: !1 },
    editable: { type: Boolean, default: !1 },
    cellDel: { type: Boolean, default: !1 },
    cellEdit: { type: Boolean, default: !1 },
    cellSave: { type: Boolean, default: !1 },
    rowDel: { type: Boolean, default: !1 },
    rowSave: { type: Boolean, default: !1 },
    rowAdd: { type: Boolean, default: !1 },
    sort: { type: [Boolean, Array], default: !1 },
    pagination: { type: [Boolean, Array], default: !1 },
    globalSearch: { type: [Boolean, Object], default: !1 },
    globalSearchMode: { type: String, default: "or" },
    globalSearchScope: { type: String, default: "deep" },
    inheritedGlobalSearchText: { type: String, default: "" },
    searchColor: { type: Boolean, default: !0 },
    globalFilter: { type: Boolean, default: !1 },
    globalFilterScope: { type: String, default: "deep" },
    inheritedGlobalFilterText: { type: String, default: "" },
    columnSearch: { type: [Boolean, Object], default: !1 },
    columnFilters: { type: [Boolean, Object], default: !1 },
    columnFilterMode: { type: String, default: "text" },
    columns: { type: Array, default: null },
    extraItems: { type: Array, default: null },
    extraColumns: { type: Array, default: null },
    customValue: { type: Function, default: null },
    cellRender: { type: Function, default: null },
    headRender: { type: Function, default: null },
    rowLabel: { type: [String, Function], default: "Item {i1}" },
    theme: { type: String, default: "default" },
    selectable: { type: Boolean, default: !1 },
    src: { type: String, default: null },
    project: { type: [String, Object, Array], default: null },
    projectMode: { type: [String, Number], default: "first" },
    raw: { type: Boolean, default: !1 },
    maxDepth: { type: Number, default: null },
    nestedScrollable: { type: Boolean, default: void 0 },
    // Deprecated alias. Prefer nestedScrollable; retained for backwards compatibility.
    scrollable: { type: Boolean, default: void 0 },
    isNestedTable: { type: Boolean, default: !1 },
    rules: { type: [Object, Array, Function], default: null }
  },
  data() {
    const e = this.output != null ? this.output : ["horiz"], t = (l) => _e(e, l), s = this.nestedScrollable !== void 0 ? this.nestedScrollable : !!this.scrollable;
    return {
      value_: this.value != null ? this.value : null,
      sourceValue_: this.value != null ? this.value : null,
      valueConfig_: null,
      projectSequence_: null,
      tbDive_: !!this.tbDive,
      _tbDiveResolvedProps_: null,
      output_: e,
      childOutput_: this.childOutput,
      templates_: this.templates || null,
      config_: this.config || null,
      configByPath_: this.configByPath || null,
      wbCode_: this.wbCode,
      depth_: this.depth,
      typeTable_: this.typeTable,
      copyable_: this.copyable,
      showHeader_: this.showHeader,
      boxed_: this.boxed,
      twoWay_: this.twoWay || !1,
      smartInput_: this.smartInput,
      editable_: this.editable,
      cellDel_: this.cellDel,
      cellEdit_: this.cellEdit,
      cellSave_: this.cellSave,
      rowDel_: this.rowDel,
      rowSave_: this.rowSave,
      rowAdd_: this.rowAdd,
      sort_: this.sort || t("sort"),
      pagination_: this.pagination || t("paginationBar"),
      globalSearch_: this.globalSearch || t("searchInput"),
      globalSearchMode_: this.globalSearchMode,
      globalSearchScope_: this.globalSearchScope === "local" ? "local" : "deep",
      inheritedGlobalSearchText_: this.inheritedGlobalSearchText || "",
      searchColor_: this.searchColor,
      globalSearchText_: "",
      searchColors_: {},
      globalFilter_: this.globalFilter || t("filterExprInput"),
      globalFilterText_: "",
      globalFilterScope_: this.globalFilterScope === "local" ? "local" : "deep",
      inheritedGlobalFilterText_: this.inheritedGlobalFilterText || "",
      columnSearch_: this.columnSearch || t("columnSearchBar"),
      columnSearches_: this.columnSearch && typeof this.columnSearch == "object" ? { ...this.columnSearch } : {},
      columnFilters_: this.columnFilters || t("columnFilterBar"),
      columnFilterMode_: this.columnFilterMode,
      filters_: {},
      global_: this.global,
      key_: 0,
      columns_: this.columns,
      extraItems_: this.extraItems,
      extraColumns_: this.extraColumns,
      customValue_: this.customValue,
      cellRender_: this.cellRender,
      headRender_: this.headRender,
      rowLabel_: this.rowLabel,
      theme_: this.theme,
      selectable_: this.selectable,
      selItems_: [],
      expandDepth: this.depth,
      expandedView: !0,
      stringifiedView: !1,
      editMode: !1,
      editValue: null,
      copied: !1,
      editingCells: {},
      originalValues: {},
      lockedPaths: {},
      addRowVisible: {},
      addRowText: {},
      sorted_: {},
      page_: 1,
      itemsPerPage_: 10,
      srcLoading_: !1,
      srcError_: null,
      apiResponse_: null,
      project_: this.project || null,
      projectMode_: this.projectMode || "first",
      raw_: this.raw || !1,
      maxDepth_: this.maxDepth,
      nestedScrollable_: s,
      scrollable_: s,
      rules_: this.rules || null,
      _projectSyncStop_: null,
      _projectSyncWriting_: !1,
      alertObjs: [],
      // State for inline JSON tree view (ADR-DV-002)
      jsonCollapsed_: {}
    };
  },
  watch: {
    value(e) {
      const t = this._tbDiveProp("value", e !== void 0 ? e : null);
      this.sourceValue_ = t, this.value_ = t, this.src ? this.editValue = this._clone(t) : this._applyProject();
    },
    tbDive(e) {
      this._applyTbDiveProps(!!e);
    },
    output(e) {
      const t = this._tbDiveProp("output", e);
      this.output_ = t ?? ["horiz"], this._syncOutputFeatures();
    },
    templates(e) {
      this.templates_ = this._tbDiveProp("templates", e) || null;
    },
    config(e) {
      this.config_ = this._tbDiveProp("config", e) || null, this._applyConfigToState();
    },
    configByPath(e) {
      this.configByPath_ = this._tbDiveProp("configByPath", e) || null, this._applyConfigToState();
    },
    src(e) {
      e && this._fetchSrc(e);
    },
    project(e) {
      this.project_ = this._tbDiveProp("project", e), this._applyProject(), this.$nextTick(() => this._refreshProjectSyncWatcher());
    },
    projectMode(e) {
      this.projectMode_ = e, this._applyProject();
    },
    raw(e) {
      this.raw_ = e, this._applyProject();
    },
    maxDepth(e) {
      this.maxDepth_ = e;
    },
    nestedScrollable(e) {
      const t = e !== void 0 ? e : !!this.scrollable;
      this.nestedScrollable_ = t, this.scrollable_ = t;
    },
    scrollable(e) {
      this.nestedScrollable === void 0 && (this.nestedScrollable_ = !!e, this.scrollable_ = !!e);
    },
    rules(e) {
      this.rules_ = this._tbDiveProp("rules", e);
    },
    depth(e) {
      this.depth_ = e;
    },
    typeTable(e) {
      this.typeTable_ = e;
    },
    copyable(e) {
      this.copyable_ = e;
    },
    showHeader(e) {
      this.showHeader_ = e;
    },
    boxed(e) {
      this.boxed_ = e;
    },
    twoWay(e) {
      this.twoWay_ = e;
    },
    smartInput(e) {
      this.smartInput_ = e;
    },
    editable(e) {
      this.editable_ = e;
    },
    cellDel(e) {
      this.cellDel_ = e;
    },
    cellEdit(e) {
      this.cellEdit_ = e;
    },
    cellSave(e) {
      this.cellSave_ = e;
    },
    rowDel(e) {
      this.rowDel_ = e;
    },
    rowSave(e) {
      this.rowSave_ = e;
    },
    rowAdd(e) {
      this.rowAdd_ = e;
    },
    sort(e) {
      this.sort_ = e || this._outputIncludes("sort");
    },
    globalSearch(e) {
      this.globalSearch_ = e || this._outputIncludes("searchInput");
    },
    globalSearchMode(e) {
      this.globalSearchMode_ = e;
    },
    globalSearchScope(e) {
      this.globalSearchScope_ = e === "local" ? "local" : "deep";
    },
    inheritedGlobalSearchText(e) {
      this.inheritedGlobalSearchText_ = e || "";
    },
    searchColor(e) {
      this.searchColor_ = e;
    },
    globalFilter(e) {
      this.globalFilter_ = e || this._outputIncludes("filterExprInput");
    },
    globalFilterScope(e) {
      this.globalFilterScope_ = e === "local" ? "local" : "deep";
    },
    inheritedGlobalFilterText(e) {
      this.inheritedGlobalFilterText_ = e || "";
    },
    columnSearch(e) {
      this.columnSearch_ = e || this._outputIncludes("columnSearchBar"), e && typeof e == "object" && (this.columnSearches_ = { ...e });
    },
    columnFilters(e) {
      this.columnFilters_ = e || this._outputIncludes("columnFilterBar");
    },
    columnFilterMode(e) {
      this.columnFilterMode_ = e;
    },
    columns(e) {
      this.columns_ = this._tbDiveProp("columns", e);
    },
    extraItems(e) {
      this.extraItems_ = this._tbDiveProp("extraItems", e);
    },
    extraColumns(e) {
      this.extraColumns_ = this._tbDiveProp("extraColumns", e);
    },
    customValue(e) {
      this.customValue_ = this._tbDiveProp("customValue", e);
    },
    cellRender(e) {
      this.cellRender_ = this._tbDiveProp("cellRender", e);
    },
    headRender(e) {
      this.headRender_ = this._tbDiveProp("headRender", e);
    },
    rowLabel(e) {
      this.rowLabel_ = this._tbDiveProp("rowLabel", e);
    },
    theme(e) {
      this.theme_ = e;
    },
    childOutput(e) {
      this.childOutput_ = e;
    },
    selectable(e) {
      this.selectable_ = e;
    },
    pagination(e) {
      this.pagination_ = e || this._outputIncludes("paginationBar"), this.page_ = 1, this.itemsPerPage_ = this.pagination_ === !0 ? 10 : Array.isArray(this.pagination_) && this.pagination_.length > 0 ? this.pagination_[0] : 10;
    },
    global(e) {
      this.global_ = e;
    },
    // Individual watchers preserve the normal fast path. In dive mode this
    // catch-all re-runs the complete prop descriptor so less-common props use
    // the same `(ctx) => value` contract as value/output/config.
    $props: {
      deep: !0,
      handler() {
        this.tbDive_ && this._applyTbDiveProps(!0);
      }
    }
  },
  computed: {
    // Keep the Vue 2 spelling as the compatibility contract. The corrected
    // alias lets new Vue 3 code use the same naming as WBC.
    itemAccessebility() {
      var l, i, o, a;
      const e = this.$store, t = typeof localStorage < "u" ? localStorage : null, s = () => this.activeValue;
      return {
        data_: this.$data,
        props_: this.$props,
        ref_: () => this.$refs.referenceTable,
        vals_: s,
        values_: () => s(),
        valids_: () => [],
        selVals_: () => this.selItems_,
        set_: (r, n = "value_") => {
          this.$data[n] = r;
        },
        get_: (r = "value_") => this.$data[r],
        update_: () => {
          this.key_ += 1;
        },
        lg_: {
          lang: ((l = e == null ? void 0 : e.state) == null ? void 0 : l.lg) || "en",
          get: () => {
            var r;
            return ((r = e == null ? void 0 : e.state) == null ? void 0 : r.lg) || "en";
          },
          set: (r) => {
            var n;
            return (n = e == null ? void 0 : e.commit) == null ? void 0 : n.call(e, "updateLang", r);
          }
        },
        user_: (i = e == null ? void 0 : e.state) == null ? void 0 : i.user,
        loggedIn_: ((o = e == null ? void 0 : e.state) == null ? void 0 : o.loggedIn) || !1,
        queryData_: this.queryData,
        aes_: { enc_: this.aesEnc, dec_: this.aesDec },
        validators_: { ...this.validators || {} },
        cookies_: { ...this.$cookies || {}, state: this.getCookies },
        storage_: t,
        proto_: Object.getPrototypeOf(this),
        routeParams_: (a = this.$route) == null ? void 0 : a.params,
        moment_: this.$moment,
        watch_: this.$watch.bind(this),
        store_: e,
        router_: this.$router,
        vm_: this,
        alert_: (...r) => (r.length === 1 && r[0] === 0 ? this.alertObjs = [] : r.length === 0 ? this.alertObjs.push({
          value: this.value_,
          output: this.output_,
          templates: this.templates_,
          config: this.config_,
          typeTable: this.typeTable_,
          theme: this.theme_
        }) : this.alertObjs.push(r.length === 1 ? r[0] : r), this.alertObjs)
      };
    },
    itemAccessibility() {
      return this.itemAccessebility;
    },
    isDark_() {
      const e = this.theme_ || "default";
      return ["dark", "terminal", "blueprint"].includes(e);
    },
    src_() {
      return this.src || this.value;
    },
    safeValue() {
      return this.value_ !== void 0 ? this.value_ : null;
    },
    typeLabel() {
      const e = this.safeValue;
      return e == null ? "Null" : Array.isArray(e) ? "Array" : e instanceof Date ? "Date" : typeof e == "function" ? "Function" : typeof e == "object" ? "Object" : typeof e;
    },
    lengthLabel() {
      const e = this.safeValue;
      return e == null ? "" : Array.isArray(e) ? `${e.length} items` : typeof e == "object" && !(e instanceof Date) ? `${Object.keys(e).length} keys` : typeof e == "string" ? `${e.length} chars` : "";
    },
    activeValue() {
      return this.editable_ ? this.editValue : this.safeValue;
    },
    isEditingActive() {
      return this.editable_ || this.cellEdit_ || this.cellDel_ || this.cellSave_;
    },
    isExpandableObject() {
      const e = this.activeValue;
      return typeof e == "object" && e !== null && !(e instanceof Date);
    },
    paginationOptions() {
      return this.pagination_ === !0 ? [5, 10, 15, 20, 25, 50] : Array.isArray(this.pagination_) ? this.pagination_ : [];
    },
    hasPagination() {
      return !!this.pagination_;
    },
    totalItems() {
      const e = this.activeValue;
      if (!Array.isArray(e)) return 1;
      let t = e;
      return t = this._globalFilterRows(t), this.columnFilters_ && (t = this._columnFilterRows(t)), t.length;
    },
    totalPages() {
      return !this.hasPagination || this.itemsPerPage_ <= 0 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage_);
    },
    pageStart() {
      return (this.page_ - 1) * this.itemsPerPage_ + 1;
    },
    pageEnd() {
      return Math.min(this.page_ * this.itemsPerPage_, this.totalItems);
    },
    isKeyValueObject() {
      const e = this.activeValue;
      return typeof e == "object" && e !== null && !Array.isArray(e) && !(e instanceof Date);
    },
    objectDepth() {
      return this._getObjectDepth(this.activeValue);
    },
    canChangeDepth() {
      return this.isExpandableObject && this.objectDepth > 0;
    },
    depthOptions() {
      const e = Math.min(this.objectDepth, 20);
      return Array.from({ length: e + 1 }, (t, s) => s);
    },
    typeTableOptions() {
      return [
        { value: "horiz", text: "☰ Horizontal" },
        { value: "vert", text: "☷ Vertical" },
        { value: "select", text: "⊞ Select" },
        { value: "json", text: "{ } JSON" },
        { value: "raw", text: "< > Raw" },
        { value: "wbc", text: "⚡ WBC" }
      ];
    },
    jsonStringified() {
      try {
        return JSON.stringify(this.activeValue, null, 2);
      } catch {
        return "[Circular or unserializable value]";
      }
    },
    allComps() {
      var e, t;
      return {
        options: {
          key: `wb-dv-${this.key_}`,
          class: ["wbdv", `wbdv-theme-${this.theme_ || "default"}`, { "wbdv--boxed": this.boxed_ }],
          style: { fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace", fontSize: "13px", lineHeight: 1.5 }
        },
        typeSelect: this.cToggleTypeTable,
        depth: this.cToggleDepth,
        rawView: this.cToggleStringifiedView,
        copyable: this.cToggleCopyable,
        showHeader: this.cToggleShowHeader,
        boxed: this.cToggleBoxed,
        themes: this.cToggleThemes,
        twoWay: this.cToggleTwoWay,
        smartInput: this.cToggleSmartInput,
        editable: this.cToggleEditable,
        cellDel: this.cToggleCellDel,
        cellEdit: this.cToggleCellEdit,
        cellSave: this.cToggleCellSave,
        rowDel: this.cToggleRowDel,
        rowSave: this.cToggleRowSave,
        rowAdd: this.cToggleRowAdd,
        sort: this.cToggleSort,
        pagination: this.cTogglePagination,
        searchColor: this.cToggleSearchColor,
        globalFilter: this.cToggleGlobalFilter,
        columnSearch: this.cToggleColumnSearch,
        columnFilters: this.cToggleColumnFilters,
        filterExprInput: this.cGlobalFilterInput,
        columnSearchBar: this.cColumnSearchBar,
        columnFilterBar: this.cColumnFilterBar,
        selectable: this.cToggleSelectable,
        searchInput: this.cGlobalSearchInput,
        paginationBar: this.cPaginationFooter,
        snackbar: this.cSnackbar,
        exportHtml: this.cExportHtml,
        prim: this.bodyPrimitiveNode(this.editValue),
        edit: this.bodyEditableNode(this.editValue),
        select: this.bodyTableSelect(this.editValue),
        wbc: this.bodyWbcNode(this.editValue),
        raw: this.bodyRawNode(this.editValue),
        json: this.bodyJsonViewerNode(this.editValue),
        vert: this.bodyTableVertical(this.editValue),
        horiz: this.bodyTableHorizontal(this.editValue),
        vCol: this.bodyTableVCol(this.editValue),
        hHead: this.bodyTableHHead(this.editValue),
        hBody: this.bodyTableHBody(this.editValue),
        vHead: this.bodyTableVHead(this.editValue),
        vBody: this.bodyTableVBody(this.editValue),
        primProp: this.bodyPrimitiveNode(this.value),
        editProp: this.bodyEditableNode(this.value),
        selectProp: this.bodyTableSelect(this.value),
        wbcProp: this.bodyWbcNode(this.value),
        rawProp: this.bodyRawNode(this.value),
        jsonProp: this.bodyJsonViewerNode(this.value),
        vertProp: this.bodyTableVertical(this.value),
        horizProp: this.bodyTableHorizontal(this.value),
        vColProp: this.bodyTableVCol(this.value),
        hHeadProp: this.bodyTableHHead(this.value),
        hBodyProp: this.bodyTableHBody(this.value),
        vHeadProp: this.bodyTableVHead(this.value),
        vBodyProp: this.bodyTableVBody(this.value),
        prim0: this.bodyPrimitiveNode(this.value_),
        edit0: this.bodyEditableNode(this.value_),
        select0: this.bodyTableSelect(this.value_),
        wbc0: this.bodyWbcNode(this.value_),
        raw0: this.bodyRawNode(this.value_),
        json0: this.bodyJsonViewerNode(this.value_),
        vert0: this.bodyTableVertical(this.value_),
        horiz0: this.bodyTableHorizontal(this.value_),
        vCol0: this.bodyTableVCol(this.value_),
        hHead0: this.bodyTableHHead(this.value_),
        hBody0: this.bodyTableHBody(this.value_),
        vHead0: this.bodyTableVHead(this.value_),
        vBody0: this.bodyTableVBody(this.value_),
        primSafe: this.bodyPrimitiveNode(this.safeValue),
        editSafe: this.bodyEditableNode(this.safeValue),
        selectSafe: this.bodyTableSelect(this.safeValue),
        wbcSafe: this.bodyWbcNode(this.safeValue),
        rawSafe: this.bodyRawNode(this.safeValue),
        jsonSafe: this.bodyJsonViewerNode(this.safeValue),
        vertSafe: this.bodyTableVertical(this.safeValue),
        horizSafe: this.bodyTableHorizontal(this.safeValue),
        vColSafe: this.bodyTableVCol(this.safeValue),
        hHeadSafe: this.bodyTableHHead(this.safeValue),
        hBodySafe: this.bodyTableHBody(this.safeValue),
        vHeadSafe: this.bodyTableVHead(this.safeValue),
        vBodySafe: this.bodyTableVBody(this.safeValue),
        ...((t = (e = this.templates_) == null ? void 0 : e.display) == null ? void 0 : t.allComps) || {}
      };
    },
    cToggleCopyable() {
      return this._btn({ icon: !0, small: !0, title: this.copyable_ ? "Disable copy-to-clipboard" : "Enable copy-to-clipboard", onClick: () => this.toggleCopyable(!0), children: [this._icon(this.copyable_ ? "mdi-content-copy" : "mdi-content-copy-off")] });
    },
    cToggleShowHeader() {
      return this._btn({ icon: !0, small: !0, title: this.showHeader_ ? "Hide header" : "Show header", onClick: () => this.toggleShowHeader(!0), children: [this._icon(this.showHeader_ ? "mdi-eye" : "mdi-eye-off")] });
    },
    cToggleBoxed() {
      return this._btn({ icon: !0, small: !0, title: this.boxed_ ? "Remove box border" : "Add box border", onClick: () => this.toggleBoxed(!0), children: [this._icon(this.boxed_ ? "mdi-rectangle-outline" : "mdi-rectangle")] });
    },
    cToggleThemes() {
      var e;
      return { comp: "VSelect", options: {
        props: { value: this.theme_, items: yt(), label: "Theme", dense: !0, hideDetails: !0, outlined: !0 },
        class: "wbdv-select wbdv-select--theme",
        style: { width: "140px", maxWidth: "140px", fontSize: "12px" },
        attrs: { title: `Current theme: ${this.theme_}` },
        on: { change: (t) => {
          this.theme_ = t;
        } }
      }, ...((e = this.templates_) == null ? void 0 : e.themes) || {} };
    },
    cToggleTwoWay() {
      return this._btn({ icon: !0, small: !0, title: this.twoWay_ ? "Disable two-way binding" : "Enable two-way binding (emit input on every edit)", onClick: () => this.toggleTwoWay(!0), children: [this._icon(this.twoWay_ ? "mdi-sync" : "mdi-sync-off")] });
    },
    cToggleSmartInput() {
      return this._btn({ icon: !0, small: !0, title: this.smartInput_ ? "Disable smart input (JSON parsing)" : "Enable smart input (JSON parsing)", onClick: () => this.toggleSmartInput(!0), children: [this._icon(this.smartInput_ ? "mdi-code-braces" : "mdi-text")] });
    },
    cToggleEditable() {
      return this._btn({ icon: !0, small: !0, title: this.editable_ ? "Exit edit mode" : "Enter edit mode", onClick: () => this.toggleEditable(!0), children: [this._icon(this.editable_ ? "mdi-check-bold" : "mdi-pencil")] });
    },
    cToggleCellDel() {
      return this._btn({ icon: !0, small: !0, title: this.cellDel_ ? "Hide cell delete buttons" : "Show cell delete buttons", onClick: () => this.toggleCellDel(!0), children: [this._icon(this.cellDel_ ? "mdi-delete" : "mdi-delete-off")] });
    },
    cToggleCellEdit() {
      return this._btn({ icon: !0, small: !0, title: this.cellEdit_ ? "Hide cell edit buttons" : "Show cell edit buttons", onClick: () => this.toggleCellEdit(!0), children: [this._icon(this.cellEdit_ ? "mdi-pencil" : "mdi-pencil-off")] });
    },
    cToggleCellSave() {
      return this._btn({ icon: !0, small: !0, title: this.cellSave_ ? "Hide cell save buttons" : "Show cell save buttons", onClick: () => this.toggleCellSave(!0), children: [this._icon(this.cellSave_ ? "mdi-content-save" : "mdi-content-save-off")] });
    },
    cToggleRowDel() {
      return this._btn({ icon: !0, small: !0, title: this.rowDel_ ? "Hide row delete buttons" : "Show row delete buttons", onClick: () => this.toggleRowDel(!0), children: [this._icon(this.rowDel_ ? "mdi-delete-forever" : "mdi-delete-forever-off")] });
    },
    cToggleRowSave() {
      return this._btn({ icon: !0, small: !0, title: this.rowSave_ ? "Hide row save buttons" : "Show row save buttons", onClick: () => this.toggleRowSave(!0), children: [this._icon(this.rowSave_ ? "mdi-content-save-check" : "mdi-content-save-off")] });
    },
    cToggleRowAdd() {
      return this._btn({ icon: !0, small: !0, title: this.rowAdd_ ? "Hide row add UI" : "Show row add UI", onClick: () => this.toggleRowAdd(!0), children: [this._icon(this.rowAdd_ ? "mdi-plus-box" : "mdi-plus-box-off")] });
    },
    cToggleSort() {
      return this._btn({ icon: !0, small: !0, title: this.sort_ ? "Disable column sorting" : "Enable column sorting", onClick: () => this.toggleSort(!0), children: [this._icon(this.sort_ ? "mdi-swap-vertical" : "mdi-swap-vertical-off")] });
    },
    cTogglePagination() {
      return this._btn({ icon: !0, small: !0, title: this.pagination_ ? "Disable pagination" : "Enable pagination", onClick: () => this.togglePagination(!0), children: [this._icon(this.pagination_ ? "mdi-view-carousel" : "mdi-view-carousel-off")] });
    },
    cToggleSearchColor() {
      return this._btn({ icon: !0, small: !0, title: this.searchColor_ ? "Disable multi-color search highlight" : "Enable multi-color search highlight", onClick: () => this.toggleSearchColor(!0), children: [this._icon(this.searchColor_ ? "mdi-palette" : "mdi-palette-off")] });
    },
    cToggleGlobalFilter() {
      return this._btn({ icon: !0, small: !0, title: this.globalFilter_ ? "Disable expression filter" : "Enable expression filter", onClick: () => this.toggleGlobalFilter(!0), children: [this._icon(this.globalFilter_ ? "mdi-filter" : "mdi-filter-off")] });
    },
    cToggleColumnSearch() {
      const e = this._activeColumnSearchKeys().length, t = this.columnSearch_ ? e > 0 ? `${e} column search(es) active — click to disable` : "Disable column search" : "Enable column search";
      return this._btn({ icon: !0, small: !0, title: t, onClick: () => this.toggleColumnSearch(!0), children: [this._icon(this.columnSearch_ ? "mdi-table-search" : "mdi-table-search-off")] });
    },
    cToggleColumnFilters() {
      const e = this._activeFilterCount(), t = this.columnFilters_ ? e > 0 ? `${e} column filter(s) active — click to disable` : "Disable column filters" : "Enable column filters";
      return this._btn({ icon: !0, small: !0, title: t, onClick: () => this.toggleColumnFilters(!0), children: [this._icon(this.columnFilters_ ? "mdi-filter-variant" : "mdi-filter-variant-off")] });
    },
    cToggleSelectable() {
      return this._btn({ icon: !0, small: !0, title: this.selectable_ ? "Disable row selection" : "Enable row selection", onClick: () => this.toggleSelectable(!0), children: [this._icon(this.selectable_ ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline")] });
    },
    cExportHtml() {
      return this._btn({ icon: !0, small: !0, title: "Copy HTML to clipboard", onClick: () => this.exportHtml(), children: [this._icon("mdi-code-tags")] });
    },
    cToggleDepth() {
      var e;
      return this.canChangeDepth ? { comp: "VSelect", options: {
        props: { value: this.expandDepth, items: this.depthOptions, label: "Depth", dense: !0, hideDetails: !0, outlined: !0 },
        class: "wbdv-select wbdv-select--depth",
        style: { width: "90px", maxWidth: "90px", fontSize: "12px" },
        attrs: { title: `Current expand depth: ${this.expandDepth} of ${this.objectDepth}` },
        on: { input: (t) => {
          this.expandDepth = t;
        } }
      }, ...((e = this.templates_) == null ? void 0 : e.depth) || {} } : null;
    },
    cToggleTypeTable() {
      var e;
      return this.isExpandableObject ? { comp: "VSelect", options: {
        props: { value: this.typeTable_, items: this.typeTableOptions, label: "View", dense: !0, hideDetails: !0, outlined: !0, itemValue: (t) => t.value },
        class: "wbdv-select wbdv-select--view",
        style: { width: "130px", maxWidth: "130px", fontSize: "12px" },
        attrs: { title: `Current view mode: ${this.typeTable_}` },
        on: { change: (t) => {
          this.typeTable_ = t, this.output_ = this.replaceInObject([this.output_], { vert: t, horiz: t, wbc: t, raw: t, json: t });
        } }
      }, ...((e = this.templates_) == null ? void 0 : e.typeSelect) || {} } : null;
    },
    cToggleStringifiedView() {
      return this.isExpandableObject ? this._btn({ icon: !0, small: !0, title: this.stringifiedView ? "Rendered JSON" : "Raw string view", onClick: () => {
        this.stringifiedView = !this.stringifiedView;
      }, children: [this._icon(this.stringifiedView ? "mdi-code-braces" : "mdi-code-json")] }) : null;
    },
    cGlobalSearchInput() {
      var a;
      if (!this.globalSearch_) return null;
      const e = this, t = (r) => {
        const n = r && typeof r == "object" && r.target && "value" in r.target ? r.target.value : r || "";
        e.globalSearchText_ = n;
      }, s = { comp: "VTextField", options: {
        props: { value: this.globalSearchText_, modelValue: this.globalSearchText_, dense: !0, density: "compact", hideDetails: !0, outlined: !0, variant: "outlined", singleLine: !0, clearable: !0, prependInnerIcon: "mdi-magnify", placeholder: "Search..." },
        class: "wbdv-search-input",
        style: { width: "220px", maxWidth: "100%", fontSize: "10px", "--v-input-control-height": "28px" },
        on: {
          "click:clear": () => {
            e.globalSearchText_ = "";
          },
          input: t,
          "update:modelValue": t
        }
      }, ...((a = this.templates_) == null ? void 0 : a.searchInput) || {} }, l = this._parseSearchTerms(this.globalSearchText_), i = l.map((r, n) => {
        const c = e.searchColor_ ? n % 12 : 0, h = r.type === "columnCompare" || r.type === "hybridGroup" ? " ⇄" : r.type === "expr" ? " ⚡" : r.caseSensitive ? " Aa" : r.isGlob ? " ✱" : r.isGroup ? " ☍" : "", p = r.display + h;
        return { comp: "VChip", options: {
          props: { small: !0, label: !0 },
          class: `wbdv-active-chip wbdv-active-search wbdv-sc-${c}`,
          style: { fontSize: "11px", height: "20px", marginRight: "4px" },
          attrs: { title: `Search: ${r.caseSensitive ? "(case-sensitive) " : ""}${r.isGlob ? "(glob) " : ""}${r.isGroup ? "(group) " : ""}"${r.raw}"` },
          html: { comp: "span", options: { textContent: p } }
        } };
      }), o = this.globalSearchMode_ === "and" ? [{ comp: "VChip", options: { props: { small: !0, label: !0, outlined: !0, color: "grey-darken-1" }, style: { fontSize: "10px", height: "18px", marginRight: "4px" }, attrs: { title: "All terms must match the same cell" }, html: "AND" } }] : [];
      return { comp: "div", options: {
        class: "wbdv-search-wrap",
        style: { display: "flex", flexDirection: "column", gap: "2px", margin: "4px 8px" },
        html: [
          s,
          l.length ? { comp: "div", options: {
            class: "wbdv-active-chiprow",
            style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px", paddingLeft: "4px" },
            html: [...o, ...i]
          } } : null
        ].filter(Boolean)
      } };
    },
    cGlobalFilterInput() {
      var a;
      if (!this.globalFilter_) return null;
      const e = this, t = (r) => {
        const n = r && typeof r == "object" && r.target && "value" in r.target ? r.target.value : r || "";
        e.globalFilterText_ = n;
      }, s = { comp: "VTextField", options: {
        props: { value: this.globalFilterText_, modelValue: this.globalFilterText_, dense: !0, density: "compact", hideDetails: !0, outlined: !0, variant: "outlined", singleLine: !0, clearable: !0, prependInnerIcon: "mdi-filter-variant", placeholder: "Filter rows: active · %>30 · (role: admin) · (age>id)" },
        class: "wbdv-filter-input",
        style: { width: "280px", maxWidth: "100%", fontSize: "10px", "--v-input-control-height": "28px" },
        on: {
          "click:clear": () => {
            e.globalFilterText_ = "";
          },
          input: t,
          "update:modelValue": t
        }
      }, ...((a = this.templates_) == null ? void 0 : a.filterExprInput) || {} }, i = this._isLegacyGlobalFilterExpression(this.globalFilterText_ || "") ? this._splitGlobalFilterClauses(this.globalFilterText_ || "") : this._parseSearchTerms(this.globalFilterText_ || "").map((r) => r.display), o = i.map((r, n) => ({ comp: "VChip", options: {
        props: { small: !0, label: !0 },
        class: `wbdv-active-chip wbdv-active-filter wbdv-rf-${n % 12}`,
        style: { fontSize: "11px", height: "20px", marginRight: "4px" },
        attrs: { title: `Filter clause #${n + 1}` },
        html: r
      } }));
      return { comp: "div", options: {
        class: "wbdv-filter-wrap",
        style: { display: "flex", flexDirection: "column", gap: "2px", margin: "4px 8px" },
        html: [
          s,
          i.length ? { comp: "div", options: {
            class: "wbdv-active-chiprow",
            style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px", paddingLeft: "4px" },
            html: o
          } } : null
        ].filter(Boolean)
      } };
    },
    cPaginationFooter() {
      var l;
      if (!this.hasPagination || this.totalPages <= 1) return null;
      const e = {};
      e.prev = { comp: "VBtn", options: { props: { icon: !0, small: !0, disabled: this.page_ <= 1 }, class: "wbdv-page-btn", style: { minWidth: "28px", height: "28px" }, attrs: { title: "Previous page" }, on: { click: this._prevPage }, html: this._icon("mdi-chevron-left") } };
      const t = Math.max(1, this.page_ - 2), s = Math.min(this.totalPages, t + 4);
      for (let i = t; i <= s; i++) {
        const o = i === this.page_;
        e[`page_${i}`] = { comp: "VBtn", options: { props: { xSmall: !0, depressed: !0, color: o ? "primary" : void 0, dark: o }, class: "wbdv-page-num", attrs: { title: `Go to page ${i}` }, style: { minWidth: "32px", margin: "0 2px", fontWeight: o ? "700" : "400" }, on: { click: () => this._goToPage(i) }, html: String(i) } };
      }
      return e.next = { comp: "VBtn", options: { props: { icon: !0, small: !0, disabled: this.page_ >= this.totalPages }, class: "wbdv-page-btn", style: { minWidth: "28px", height: "28px" }, attrs: { title: "Next page" }, on: { click: this._nextPage }, html: this._icon("mdi-chevron-right") } }, e.info = { comp: "span", options: { class: "wbdv-page-info", style: { marginLeft: "8px", fontSize: "12px", color: "#757575" }, attrs: { title: `Showing items ${this.pageStart} to ${this.pageEnd} of ${this.totalItems} total items` }, html: `${this.pageStart}–${this.pageEnd} of ${this.totalItems}` } }, { comp: "div", options: { class: "wbdv-pagination", style: { display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 12px", borderTop: "1px solid #e0e0e0", gap: "4px", flexWrap: "wrap" }, html: e }, ...((l = this.templates_) == null ? void 0 : l.paginationBar) || {} };
    },
    cSnackbar() {
      var e;
      return { comp: "VSnackbar", options: {
        props: { value: this.copied, top: !0, right: !0, timeout: 1500 },
        class: "wbdv-snackbar",
        style: { fontSize: "13px" },
        on: { input: (t) => {
          this.copied = t;
        } },
        html: "JSON copied to clipboard"
      }, ...((e = this.templates_) == null ? void 0 : e.snackbar) || {} };
    },
    cColumnFilterBar() {
      var a;
      if (!this.columnFilters_) return null;
      const e = this, t = this._activeColumnFilterKeys(), s = t.length, l = this.columnFilterMode_ === "regex", o = [{ comp: "VChip", options: {
        props: { small: !0, label: !0, outlined: !0, color: "grey-darken-1" },
        style: { fontSize: "10px", height: "18px" },
        attrs: { title: l ? "Each column input is parsed as a regex" : "Each column input uses the search criteria grammar" },
        html: l ? "regex" : "criteria"
      } }];
      return s > 0 && (o.push({ comp: "VChip", options: { props: { small: !0, color: "primary", textColor: "white" }, class: "wbdv-filter-chip", style: { fontSize: "11px" }, html: `${s} filter${s > 1 ? "s" : ""} active` } }), t.forEach((r, n) => {
        const c = (e.filters_[r] || "").trim();
        o.push({ comp: "VChip", options: {
          props: { small: !0, label: !0, close: !0 },
          class: `wbdv-active-chip wbdv-active-colfilter wbdv-cf-${n % 12}`,
          style: { fontSize: "11px", height: "20px" },
          attrs: { title: `Column "${r}" — filter: ${c}` },
          on: { "click:close": () => e._clearColumnFilter(r) },
          html: `${r}: ${c}`
        } });
      }), o.push(this._btn({ icon: !0, small: !0, title: "Clear all column filters", onClick: () => e._clearAllColumnFilters(), children: [this._icon("mdi-close-circle")] }))), { comp: "div", options: {
        class: "wbdv-column-filter-bar",
        style: { display: "flex", gap: "6px", padding: "4px 8px", borderTop: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0", background: "#f5f5f5", alignItems: "center", flexWrap: "wrap" },
        html: o
      }, ...((a = this.templates_) == null ? void 0 : a.columnFilterBar) || {} };
    },
    cColumnSearchBar() {
      var l;
      if (!this.columnSearch_) return null;
      const e = this, t = this._activeColumnSearchKeys(), s = [];
      return t.length > 0 && (s.push({ comp: "VChip", options: { props: { small: !0, color: "primary", textColor: "white" }, class: "wbdv-search-chip", style: { fontSize: "11px" }, html: `${t.length} column search${t.length > 1 ? "es" : ""} active` } }), t.forEach((i) => {
        const o = (e.columnSearches_[i] || "").trim();
        s.push({ comp: "VChip", options: {
          props: { small: !0, label: !0, close: !0, outlined: !0 },
          class: "wbdv-active-chip wbdv-active-colsearch",
          style: { fontSize: "11px", height: "20px" },
          attrs: { title: `Column "${i}" — search: ${o}` },
          on: { "click:close": () => e._clearColumnSearch(i) },
          html: `${i}: ${o}`
        } });
      }), s.push(this._btn({ icon: !0, small: !0, title: "Clear all column searches", onClick: () => this._clearAllColumnSearches(), children: [this._icon("mdi-close-circle")] }))), { comp: "div", options: {
        class: "wbdv-column-search-bar",
        style: { display: "flex", gap: "6px", padding: "4px 8px", borderTop: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0", background: "#f5f5f5", alignItems: "center", flexWrap: "wrap" },
        html: s
      }, ...((l = this.templates_) == null ? void 0 : l.columnSearchBar) || {} };
    },
    cGlobalSearchTerms() {
      const e = this._effectiveGlobalSearchText();
      return e ? this._parseSearchTerms(e) : [];
    },
    cParsedColumnFilters() {
      const e = {};
      if (!this.columnFilters_) return e;
      for (const t in this.filters_) {
        const s = this.filters_[t];
        s && (e[t] = this._parseSearchTerms(s));
      }
      return e;
    },
    cParsedColumnSearches() {
      const e = {};
      if (!this.columnSearch_) return e;
      for (const t in this.columnSearches_) {
        const s = this.columnSearches_[t];
        s && (e[t] = this._parseSearchTerms(s));
      }
      return e;
    },
    cParsedGlobalFilterTerms() {
      const e = this._effectiveGlobalFilterTexts();
      if (!e.length) return [];
      const t = e.filter((a) => !this._isLegacyGlobalFilterExpression(a)).join(" "), s = e.filter((a) => this._isLegacyGlobalFilterExpression(a)).join(" || ");
      if (!s)
        return this._parseSearchTerms(t);
      const l = [], i = /['"]([^'"]+)['"]/g;
      let o;
      for (; (o = i.exec(s)) !== null; )
        o[1] && l.push(o[1]);
      return l.map((a) => {
        const r = a.replace(/([.*+?^${}()|[\]\\])/g, "\\$1");
        return {
          raw: a,
          display: a,
          caseSensitive: !1,
          isGlob: !1,
          regex: new RegExp(r, "i"),
          gRegex: new RegExp(r, "gi"),
          type: "quoted"
        };
      });
    }
  },
  created() {
    this.tbDive_ && this._applyTbDiveProps(!0), this.editValue = this._clone(this.value_), this._applyConfigToState(), this.src ? this._fetchSrc(this.src) : this._applyProject();
  },
  mounted() {
    this.tbDive_ && this._applyTbDiveProps(!0), this.global_ && typeof window < "u" && (window[this.global_] = this.tbDive_ ? this.itemAccessebility : this), this._refreshProjectSyncWatcher();
  },
  beforeUnmount() {
    typeof this._projectSyncStop_ == "function" && this._projectSyncStop_(), this._projectSyncStop_ = null;
  },
  methods: {
    _tbDiveLang() {
      var e, t;
      return ((t = (e = this.$store) == null ? void 0 : e.state) == null ? void 0 : t.lg) || "en";
    },
    _tbDiveProp(e, t) {
      if (!this.tbDive_) return t;
      const s = Ke({ [e]: t }, this.itemAccessebility, this._tbDiveLang());
      return this._tbDiveResolvedProps_ || (this._tbDiveResolvedProps_ = {}), this._tbDiveResolvedProps_[e] = s[e], s[e];
    },
    _applyTbDiveProps(e = this.tbDive_) {
      this.tbDive_ = !!e;
      const t = Object.fromEntries(Object.keys(this.$props).map((i) => [i, this.$props[i]])), s = this.tbDive_ ? Ke(t, this.itemAccessebility, this._tbDiveLang()) : t;
      this._tbDiveResolvedProps_ = this.tbDive_ ? s : null;
      for (const [i, o] of Object.entries(s)) {
        const a = `${i}_`;
        a in this.$data && (this[a] = o);
      }
      this.value_ = s.value !== void 0 ? s.value : null, this.sourceValue_ = this.value_, this.output_ = s.output != null ? s.output : ["horiz"], this.templates_ = s.templates || null, this.config_ = s.config || null, this.configByPath_ = s.configByPath || null, this.project_ = s.project || null, this.raw_ = s.raw || !1, this.rules_ = s.rules || null, s.columnSearch && typeof s.columnSearch == "object" && (this.columnSearches_ = { ...s.columnSearch });
      const l = s.nestedScrollable !== void 0 ? s.nestedScrollable : !!s.scrollable;
      this.nestedScrollable_ = l, this.scrollable_ = l, this.src ? (this.editValue = this._clone(this.value_), this._applyConfigToState()) : this._applyProject(), this.global_ && typeof window < "u" && (window[this.global_] = this.tbDive_ ? this.itemAccessebility : this), this.$nextTick(() => this._refreshProjectSyncWatcher());
    },
    /**
     * Preserves apiResponse_ cache (Task 7 contract).
     * Re-hits network only when src changes.
     */
    _fetchSrc(e) {
      if (!e || typeof e != "string") return;
      const t = e.startsWith("http://") || e.startsWith("https://"), s = e.startsWith("./") || e.startsWith("../"), l = e.startsWith("/");
      if (!(!t && !s && !l)) {
        if (this.apiResponse_ && this.apiResponse_._url === e) {
          this._applyProject();
          return;
        }
        this.srcLoading_ = !0, this.srcError_ = null, fetch(e).then((i) => {
          if (!i.ok) throw new Error(`${i.status} ${i.statusText}`);
          return (i.headers.get("content-type") || "").includes("json") ? i.json() : i.text().then((a) => {
            try {
              return JSON.parse(a);
            } catch {
              return a;
            }
          });
        }).then((i) => {
          i && typeof i == "object" && Object.defineProperty(i, "_url", { value: e, enumerable: !1, writable: !0, configurable: !0 }), this.apiResponse_ = i, this._applyProject(), this.srcLoading_ = !1;
        }).catch((i) => {
          const o = i.message || String(i);
          this.srcError_ = o === "Failed to fetch" ? `Failed to fetch "${e}" — likely blocked by CORS. Use a proxy or a CORS-enabled API.` : o, this.srcLoading_ = !1;
        });
      }
    },
    _applyProject() {
      let e = this.apiResponse_ != null ? this.apiResponse_ : this.sourceValue_;
      if (this.projectSequence_ = null, this.valueConfig_ = null, e == null) return;
      if (!this.raw_) if (Array.isArray(this.project_)) {
        const l = e;
        this.projectSequence_ = this.project_.map((i, o) => {
          const a = this._projectOne(l, i);
          if (a.found) return { kind: "data", value: a.value, spec: i, index: o };
          const r = this._projectWbcItem(i);
          return r == null ? null : { kind: "wbc", item: r, spec: i, index: o };
        }).filter(Boolean), e = this.projectSequence_.filter((i) => i.kind === "data").map((i) => i.value);
      } else if (typeof this.project_ == "string" && this.project_) {
        const l = K(e, this.project_);
        l.found && (e = l.value);
      } else this.project_ && typeof this.project_ == "object" && (e = z(e, this.project_, { mode: this.projectMode_ }) || e);
      const t = this.project_ && typeof this.project_ == "object" && !Array.isArray(this.project_) ? this._projectSpecConfig(this.project_) : {}, s = this._embeddedValueConfig(e);
      this.valueConfig_ = this._deepMerge(t, s.config), this.value_ = s.value, this.editValue = this._clone(s.value), this._applyConfigToState();
    },
    _projectOne(e, t) {
      if (typeof t == "string" && t)
        return K(e, t);
      if (t && typeof t == "object" && !Array.isArray(t)) {
        const s = z(e, t, { mode: this.projectMode_ });
        return { found: s != null, value: s };
      }
      return { found: !1, value: void 0 };
    },
    _projectWbcItem(e) {
      if (typeof e == "string") return e;
      if (!e || typeof e != "object" || Array.isArray(e)) return null;
      const t = Object.fromEntries(Object.entries(e).filter(([s]) => !Z(s)));
      if (t.option && !t.options) {
        const { option: s, ...l } = t;
        return { ...l, options: s };
      }
      return t;
    },
    _sanitizeProjectConfig(e) {
      if (!e || typeof e != "object" || Array.isArray(e)) return {};
      const t = /* @__PURE__ */ new Set(["value", "src", "project", "raw", "config", "global", "wbCode", "tbDive"]);
      return Object.fromEntries(Object.entries(e).filter(([s]) => !t.has(s)));
    },
    _projectSpecConfig(e) {
      if (!e || typeof e != "object" || Array.isArray(e)) return {};
      const t = this._sanitizeProjectConfig(e._config_), s = this._sanitizeProjectConfig(Object.fromEntries(Object.entries(e).map(([l, i]) => [me(l), i]).filter(([l]) => l != null)));
      return this._deepMerge(t, s);
    },
    /**
     * Read recognized `_prop_` keys from a displayed value object. These keys
     * are table metadata, not rows/columns, and therefore are removed from the
     * value passed to the recursive viewer. Unknown wrapped keys stay data.
     */
    _embeddedValueConfig(e) {
      if (!e || typeof e != "object" || Array.isArray(e))
        return { value: e, config: {}, metadata: {} };
      const t = [], s = {}, l = [];
      for (const [i, o] of Object.entries(e)) {
        const a = me(i);
        a ? (t.push([a, o]), s[i] = o) : l.push([i, o]);
      }
      return {
        value: t.length ? Object.fromEntries(l) : e,
        config: this._sanitizeProjectConfig(Object.fromEntries(t)),
        metadata: s
      };
    },
    _restoreEmbeddedValueConfig(e, t = {}) {
      return !t || !Object.keys(t).length || !e || typeof e != "object" || Array.isArray(e) ? e : { ...t, ...e };
    },
    _projectItemConfig(e, t) {
      const s = e && typeof e == "object" && !Array.isArray(e), l = s && (e._as_ || e._parent_) || null, i = l && this.configByPath_ && this.configByPath_[l] ? this._sanitizeProjectConfig(this.configByPath_[l]) : {}, o = s ? this._sanitizeProjectConfig(e._config_) : {}, a = s ? this._sanitizeProjectConfig(Object.fromEntries(Object.entries(e).map(([g, f]) => [me(g), f]).filter(([g]) => g != null))) : {}, r = this._embeddedValueConfig(t);
      let n = this._deepMerge(this._configFor([]), { boxed: !1, showHeader: !1 });
      n = this._deepMerge(n, i), n = this._deepMerge(n, o), n = this._deepMerge(n, a), n = this._deepMerge(n, r.config);
      const c = { ...this.configByPath_ || {} };
      l && delete c[l];
      const h = this._deepMerge(
        this._deepMerge(
          this._deepMerge(c, i.configByPath || {}),
          o.configByPath || {}
        ),
        a.configByPath || {}
      ), p = this._deepMerge(
        h,
        r.config.configByPath || {}
      );
      return delete n.configByPath, {
        alias: l,
        config: this._withNestedScrollable(n),
        configByPath: Object.keys(p).length ? p : null,
        value: r.value,
        metadata: r.metadata
      };
    },
    _hasSyncedProjectItems() {
      return Array.isArray(this.project_) && this.project_.some((e) => e && typeof e == "object" && !Array.isArray(e) && e._sync_ === !0 && typeof e._path_ == "string");
    },
    _refreshProjectSyncWatcher() {
      typeof this._projectSyncStop_ == "function" && this._projectSyncStop_(), this._projectSyncStop_ = null, !(!this._hasSyncedProjectItems() || this.src) && (this._projectSyncStop_ = this.$watch(
        () => this.value,
        (e, t) => {
          this._projectSyncWriting_ || e == null || e === t && (this.sourceValue_ = this._tbDiveProp("value", e), this._applyProject());
        },
        { deep: !0 }
      ));
    },
    _setProjectionPathValue(e, t, s) {
      if (!e || typeof e != "object") return !1;
      if (Object.prototype.hasOwnProperty.call(e, t))
        return e[t] = s, !0;
      const l = rt(t);
      if (!l.length) return !1;
      let i = e;
      for (let a = 0; a < l.length - 1; a++) {
        const r = Array.isArray(i) ? Number(l[a]) : l[a];
        if ((i == null ? void 0 : i[r]) == null || typeof i[r] != "object") return !1;
        i = i[r];
      }
      const o = Array.isArray(i) ? Number(l[l.length - 1]) : l[l.length - 1];
      return i[o] = s, !0;
    },
    _reverseProjectedFields(e, t, s) {
      if (e == null || t == null) return this._clone(e);
      const l = Object.entries(s || {}).filter(([o]) => !Z(o));
      if (!l.length) return this._clone(t);
      if (Array.isArray(e) && Array.isArray(t))
        return e.map((o, a) => a < t.length ? this._reverseProjectedFields(o, t[a], Object.fromEntries(l)) : this._clone(o));
      if (typeof e != "object" || typeof t != "object") return this._clone(t);
      const i = this._clone(e);
      for (const [o, a] of l) {
        const r = a && typeof a == "object" ? a._parent_ || a._as_ || o : a || o;
        if (Object.prototype.hasOwnProperty.call(t, r))
          if (a && typeof a == "object") {
            const n = K(i, o);
            if (!n.found) continue;
            const c = this._reverseProjectedFields(n.value, t[r], a);
            this._setProjectionPathValue(i, o, c);
          } else
            this._setProjectionPathValue(i, o, this._clone(t[r]));
      }
      return i;
    },
    _syncProjectItem(e, t) {
      var c;
      const s = e == null ? void 0 : e.spec;
      if (!s || s._sync_ !== !0 || typeof s._path_ != "string") return;
      const l = this._clone(this.apiResponse_ != null ? this.apiResponse_ : this.sourceValue_), i = K(l, s._path_);
      if (!i.found) return;
      const o = s._as_ || s._parent_, a = o && t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, o) ? t[o] : t, r = this._reverseProjectedFields(i.value, a, s);
      if (!this._setProjectionPathValue(l, s._path_, r)) return;
      if (this._projectSyncWriting_ = !0, this.apiResponse_ != null) {
        const h = (c = this.apiResponse_) == null ? void 0 : c._url;
        h && l && typeof l == "object" && Object.defineProperty(l, "_url", { value: h, enumerable: !1, writable: !0, configurable: !0 }), this.apiResponse_ = l;
      } else
        this.sourceValue_ = l;
      this._applyProject();
      const n = this._clone(l);
      this.$emit("update:value", n), this.$emit("input", n), this.$emit("project-synced", {
        index: e.index,
        path: s._path_,
        value: this._clone(r),
        source: n
      }), this.$nextTick(() => {
        this._projectSyncWriting_ = !1;
      });
    },
    _renderProjectSequence(e) {
      return e(
        "div",
        { class: "wbdv-project-sequence" },
        (this.projectSequence_ || []).map((t, s) => {
          if (t.kind === "wbc")
            return e("div", {
              key: `project-wbc-${s}`,
              class: "wbdv-project-sequence__wbc",
              "data-project-index": s
            }, [e(Y("WBC"), { item: t.item })]);
          const l = this._projectItemConfig(t.spec, t.value), i = t.spec && typeof t.spec == "object" && t.spec._sync_ === !0 && typeof t.spec._path_ == "string";
          return e("div", {
            key: `project-data-${s}`,
            class: "wbdv-project-sequence__data",
            "data-project-index": s
          }, [e(Y("WBDataViewer"), {
            value: l.value,
            config: l.config,
            configByPath: l.configByPath,
            templates: this.templates_,
            maxDepth: this.maxDepth_,
            tbDive: this.tbDive_,
            twoWay: i,
            wbCode: void 0,
            onInput: i ? (o) => this._syncProjectItem(t, o) : void 0
          })]);
        })
      );
    },
    _clone(e) {
      if (typeof this.clone == "function") return this.clone(e);
      try {
        return JSON.parse(JSON.stringify(e));
      } catch {
        return e;
      }
    },
    _getObjectDepth(e, t = /* @__PURE__ */ new WeakSet()) {
      if (e == null || typeof e != "object" || e instanceof Date || t.has(e)) return 0;
      if (t.add(e), Array.isArray(e))
        return e.length === 0 ? 0 : 1 + Math.max(...e.slice(0, 100).map((l) => this._getObjectDepth(l, t)));
      const s = Object.values(e);
      return s.length === 0 ? 0 : 1 + Math.max(...s.slice(0, 100).map((l) => this._getObjectDepth(l, t)));
    },
    _strToObj(e) {
      if (typeof this.strToObj == "function") return this.strToObj(e);
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    },
    _rulesForField(e) {
      const t = this.rules_;
      if (!t) return [];
      if (typeof t == "function" || Array.isArray(t)) return ae(t);
      if (typeof t == "object") {
        const s = ["required", "maxLength", "minLength", "upperCharNb", "lowerCharNb", "specialCharNb", "digitCharNb", "email", "phone"], l = Object.keys(t);
        return l.length > 0 && l.every((o) => !s.includes(o)) ? t[e] ? ae(t[e]) : [] : ae(t);
      }
      return [];
    },
    _icon(e) {
      return { comp: "VIcon", options: {
        props: { small: !0 },
        class: "wbdv-icon",
        style: { fontSize: "18px", lineHeight: 1 },
        html: e
      } };
    },
    _btn({ icon: e = !1, small: t = !1, title: s, onClick: l, children: i = [] }) {
      return { comp: "VBtn", options: {
        attrs: { title: s },
        props: { icon: e, small: t, title: s, text: !0 },
        class: "wbdv-btn",
        style: { minWidth: "28px", height: "28px", padding: "0 4px" },
        on: { click: l },
        html: i
      } };
    },
    _effectiveGlobalSearchText() {
      return [...new Set([
        this.inheritedGlobalSearchText_,
        this.globalSearch_ ? this.globalSearchText_ : ""
      ].map((e) => String(e || "").trim()).filter(Boolean))].join(" ");
    },
    _effectiveGlobalFilterTexts() {
      return [...new Set([
        this.inheritedGlobalFilterText_,
        this.globalFilter_ ? this.globalFilterText_ : ""
      ].map((e) => String(e || "").trim()).filter(Boolean))];
    },
    _globalSearchTextForChild() {
      return this.globalSearchScope_ !== "deep" ? "" : this._effectiveGlobalSearchText();
    },
    _globalFilterTextForChild() {
      return this.globalFilterScope_ !== "deep" ? "" : this._effectiveGlobalFilterTexts().map((e) => `(${e})`).join(",");
    },
    _globalSearchFilter(e) {
      const t = this._effectiveGlobalSearchText();
      if (!t) return e;
      const s = t.toLowerCase().split(/\s+/).filter(Boolean);
      if (s.length === 0) return e;
      const l = this.globalSearchMode_;
      return e.filter((i) => {
        const o = Object.values(i).map((a) => String(a ?? "").toLowerCase());
        return l === "and" ? s.every((a) => o.some((r) => r.includes(a))) : s.some((a) => o.some((r) => r.includes(a)));
      });
    },
    _evalGlobalFilter(e, t) {
      if (!t || !t.trim()) return !0;
      const s = t.trim();
      if (!e || typeof e != "object") return !1;
      if (typeof this._isLegacyGlobalFilterExpression == "function" ? this._isLegacyGlobalFilterExpression(s) : /\brow\s*(?:\.|\[)/.test(s) || /&&|\|\|/.test(s) || /^\s*\(?\s*[$A-Z_a-z][$0-9A-Z_a-z.]*\s*(?:===|!==|==|!=|<=|>=|<|>)\s*(?:-?(?:\d|\.\d)|true\b|false\b|null\b|["'`])/.test(s)) {
        const o = { row: e }, a = Object.keys(e).filter((n) => n !== "row" && /^[$A-Z_a-z][$0-9A-Z_a-z]*$/.test(n));
        for (const n of a) o[n] = e[n];
        const r = ft(s, o);
        if (r !== void 0) return !!r;
      }
      if (typeof this._rowMatchesSearchCriteria == "function")
        return this._rowMatchesSearchCriteria(e, s, null, this.globalFilterScope_ === "deep");
      const i = s.toLowerCase();
      return Object.values(e).some((o) => String(o ?? "").toLowerCase().includes(i));
    },
    _isLegacyGlobalFilterExpression(e) {
      if (!e || typeof e != "string") return !1;
      const t = e.trim();
      return t ? /\brow\s*(?:\.|\[)/.test(t) || /&&|\|\|/.test(t) ? !0 : /^\s*\(?\s*[$A-Z_a-z][$0-9A-Z_a-z.]*\s*(?:===|!==|==|!=|<=|>=|<|>)\s*(?:-?(?:\d|\.\d)|true\b|false\b|null\b|["'`])/.test(t) : !1;
    },
    _searchTermMatchesRow(e, t, s = null, l = !1, i = /* @__PURE__ */ new WeakSet()) {
      if (!e || !t || typeof t != "object" || i.has(t)) return !1;
      i.add(t);
      let o = !1;
      return e.type === "columnCompare" ? o = this._columnComparisonMatches(e, t, s) : e.type === "hybridGroup" ? s != null ? o = this._termTargetsColumn(e, s) && this._hybridGroupMatchesCell(e, t == null ? void 0 : t[s], t, s) : o = Object.entries(t).some(
        ([a, r]) => this._termTargetsColumn(e, a) && this._hybridGroupMatchesCell(e, r, t, a)
      ) : o = (s == null ? Object.entries(t) : [[s, t == null ? void 0 : t[s]]]).some(
        ([r, n]) => this._termTargetsColumn(e, r) && (n == null || typeof n != "object") && this._searchTermMatches(e, n)
      ), o || !l || s != null ? o : Object.values(t).some(
        (a) => a && typeof a == "object" ? this._searchTermMatchesRow(e, a, null, !0, i) : !1
      );
    },
    _rowMatchesSearchCriteria(e, t, s = null, l = !1) {
      const i = this._parseSearchTerms(t || "");
      return i.length === 0 ? !0 : i.some((o) => this._searchTermMatchesRow(o, e, s, l));
    },
    _globalFilterRows(e) {
      const t = this._effectiveGlobalFilterTexts();
      return t.length ? e.filter((s) => t.every((l) => this._evalGlobalFilter(s, l))) : e;
    },
    toggleGlobalFilter(e) {
      e === !0 ? this.globalFilter_ = !this.globalFilter_ : e === !1 ? this.globalFilter_ = e : this.globalFilter_ = !0;
    },
    _resolveRowLabel(e, t) {
      const s = this.rowLabel_;
      if (typeof s == "function")
        try {
          return String(s(e, t));
        } catch {
          return `Item ${t + 1}`;
        }
      return typeof s == "string" ? s.replace(/\{i1\}/g, String(t + 1)).replace(/\{i\}/g, String(t)) : `Item ${t + 1}`;
    },
    _normalizeToRows(e) {
      return Array.isArray(e) ? e.some((s) => s && typeof s == "object") ? e : e.map((s, l) => ({ [l]: s })) : e && typeof e == "object" ? [e] : [{ 0: e }];
    },
    _cfgDefaults() {
      return {
        output: ["horiz"],
        typeTable: "horizontal",
        editable: !1,
        theme: "default",
        boxed: !0,
        showHeader: !0,
        copyable: !0,
        sort: !1,
        pagination: !1,
        globalSearch: !1,
        globalSearchScope: "deep",
        globalFilter: !1,
        globalFilterScope: "deep",
        columnSearch: !1,
        columnFilters: !1,
        nestedScrollable: !1
      };
    },
    _cfgFromProps() {
      const e = this.tbDive_ && this._tbDiveResolvedProps_ ? this._tbDiveResolvedProps_ : this.$props, t = {};
      return e.output != null && (t.output = e.output), e.childOutput != null && (t.childOutput = e.childOutput), e.typeTable != null && (t.typeTable = e.typeTable), e.editable != null && (t.editable = e.editable), e.theme != null && e.theme !== "default" && (t.theme = e.theme), e.boxed != null && (t.boxed = e.boxed), e.showHeader != null && (t.showHeader = e.showHeader), e.copyable != null && (t.copyable = e.copyable), e.rowDel != null && (t.rowDel = e.rowDel), e.rowSave != null && (t.rowSave = e.rowSave), e.rowAdd != null && (t.rowAdd = e.rowAdd), e.cellEdit != null && (t.cellEdit = e.cellEdit), e.cellDel != null && (t.cellDel = e.cellDel), e.cellSave != null && (t.cellSave = e.cellSave), e.smartInput != null && (t.smartInput = e.smartInput), e.sort != null && (t.sort = e.sort), e.pagination != null && (t.pagination = e.pagination), e.globalSearch != null && (t.globalSearch = e.globalSearch), e.globalSearchScope != null && (t.globalSearchScope = e.globalSearchScope), e.globalFilter != null && (t.globalFilter = e.globalFilter), e.globalFilterScope != null && (t.globalFilterScope = e.globalFilterScope), e.columnSearch != null && (t.columnSearch = e.columnSearch), e.columnFilters != null && (t.columnFilters = e.columnFilters), e.nestedScrollable !== void 0 ? t.nestedScrollable = e.nestedScrollable : e.scrollable !== void 0 && (t.nestedScrollable = e.scrollable), t;
    },
    _deepMerge(e, t) {
      if (!e || typeof e != "object") return t;
      if (!t || typeof t != "object") return e;
      const s = Array.isArray(e) ? [...e] : { ...e };
      for (const l of Object.keys(t)) {
        const i = s[l], o = t[l];
        i && o && typeof i == "object" && typeof o == "object" && !Array.isArray(i) && !Array.isArray(o) ? s[l] = this._deepMerge(i, o) : s[l] = o;
      }
      return s;
    },
    _withNestedScrollable(e) {
      return !e || typeof e != "object" || Array.isArray(e) || e.nestedScrollable !== void 0 || e.scrollable === void 0 ? e : { ...e, nestedScrollable: e.scrollable };
    },
    _configFor(e = []) {
      let t = this._deepMerge(this._cfgDefaults(), this._cfgFromProps());
      this.config_ && (t = this._deepMerge(t, this._withNestedScrollable(this.config_)));
      const s = this.configByPath_ || null;
      if (s && e.length)
        for (let l = 1; l <= e.length; l++) {
          const i = e.slice(0, l).join(".");
          s[i] && (t = this._deepMerge(t, this._withNestedScrollable(s[i])));
        }
      return !e.length && this.valueConfig_ && (t = this._deepMerge(t, this._withNestedScrollable(this.valueConfig_))), t;
    },
    _applyConfigToState() {
      const e = this._configFor([]);
      e.output != null && (this.output_ = typeof e.output == "string" ? [e.output] : e.output), e.childOutput != null && (this.childOutput_ = e.childOutput), e.typeTable != null && (this.typeTable_ = e.typeTable), e.editable != null && (this.editable_ = e.editable), e.theme != null && (this.theme_ = e.theme), e.boxed != null && (this.boxed_ = e.boxed), e.showHeader != null && (this.showHeader_ = e.showHeader), e.copyable != null && (this.copyable_ = e.copyable), e.rowDel != null && (this.rowDel_ = e.rowDel), e.rowSave != null && (this.rowSave_ = e.rowSave), e.rowAdd != null && (this.rowAdd_ = e.rowAdd), e.cellEdit != null && (this.cellEdit_ = e.cellEdit), e.cellDel != null && (this.cellDel_ = e.cellDel), e.cellSave != null && (this.cellSave_ = e.cellSave), e.smartInput != null && (this.smartInput_ = e.smartInput), e.sort != null && (this.sort_ = e.sort), e.pagination != null && (this.pagination_ = e.pagination), e.globalSearch != null && (this.globalSearch_ = e.globalSearch), e.globalSearchScope != null && (this.globalSearchScope_ = e.globalSearchScope === "local" ? "local" : "deep"), e.globalFilter != null && (this.globalFilter_ = e.globalFilter), e.globalFilterScope != null && (this.globalFilterScope_ = e.globalFilterScope === "local" ? "local" : "deep"), e.columnSearch != null && (this.columnSearch_ = e.columnSearch, typeof e.columnSearch == "object" && (this.columnSearches_ = { ...e.columnSearch })), e.columnFilters != null && (this.columnFilters_ = e.columnFilters), e.nestedScrollable != null && (this.nestedScrollable_ = e.nestedScrollable, this.scrollable_ = e.nestedScrollable), this._syncOutputFeatures(e);
    },
    _outputIncludes(e) {
      return _e(this.output_, e);
    },
    _syncOutputFeatures(e = this._configFor([])) {
      for (const [t, s] of Object.entries(ut)) {
        const l = e[s];
        this[`${s}_`] = l || this._outputIncludes(t);
      }
      this.page_ = 1, this.itemsPerPage_ = this.pagination_ === !0 ? 10 : Array.isArray(this.pagination_) && this.pagination_.length > 0 ? this.pagination_[0] : 10;
    },
    _pathKey(e) {
      return Array.isArray(e) ? e.join(".") : e;
    },
    _isCellEditing(e) {
      return !!this.editingCells[this._pathKey(e)];
    },
    _hasCellChanged(e) {
      const t = this._pathKey(e);
      return t in this.originalValues ? JSON.stringify(this._getNestedValue(e)) !== JSON.stringify(this.originalValues[t]) : !1;
    },
    _startCellEdit(e, t) {
      const s = this._pathKey(e);
      this.editingCells[s] = !0, this.originalValues[s] = this._clone(t);
    },
    _cancelCellEdit(e) {
      const t = this._pathKey(e);
      t in this.originalValues && this._setNestedValue(e, this._clone(this.originalValues[t])), delete this.editingCells[t], delete this.originalValues[t];
    },
    _confirmCellEdit(e) {
      const t = this._pathKey(e), s = this._getNestedValue(e);
      this.$emit("saved", { path: [...e], value: this._clone(s) }), delete this.editingCells[t], delete this.originalValues[t];
    },
    _getNestedValue(e) {
      let t = this.editValue;
      for (const s of e) {
        const l = Array.isArray(t) ? Number(s) : s;
        t = t == null ? void 0 : t[l];
      }
      return t;
    },
    _setNestedValue(e, t) {
      const s = Array.isArray(e) ? e : e.split(".");
      let l = this.editValue;
      for (let o = 0; o < s.length - 1; o++) {
        const a = Array.isArray(l) ? Number(s[o]) : s[o];
        l = l[a];
      }
      const i = Array.isArray(l) ? Number(s[s.length - 1]) : s[s.length - 1];
      this.smartInput_ && typeof t == "string" ? t = this._strToObj(t) : !this.smartInput_ && typeof t == "string" && (t === "true" ? t = !0 : t === "false" ? t = !1 : t === "null" ? t = null : !isNaN(t) && t.trim() !== "" && (t = Number(t))), this.twoWay_ ? (Array.isArray(l) ? l[Number(i)] = t : l[i] = t, this._syncEditToValue_(e, t), this.$emit("input", this._clone(this.editValue))) : l[i] = t;
    },
    _syncEditToValue_(e, t) {
      let s = this.value_;
      const l = Array.isArray(e) ? e : e.split(".");
      for (let o = 0; o < l.length - 1; o++) {
        const a = Array.isArray(s) ? Number(l[o]) : l[o];
        s = s[a];
      }
      const i = Array.isArray(s) ? Number(l[l.length - 1]) : l[l.length - 1];
      Array.isArray(s) ? s[Number(i)] = this._clone(t) : s[i] = this._clone(t);
    },
    _toggleAddRow(e) {
      this.addRowVisible[e] = !this.addRowVisible[e], this.addRowVisible[e] || delete this.addRowText[e];
    },
    _submitAddRow(e, t) {
      this.addRowText || (this.addRowText = {});
      const s = (this.addRowText[t] || "").trim();
      if (!s) return;
      const l = this._strToObj(s);
      if (!l || typeof l != "object" || l === null) {
        const i = e.length > 0 && typeof e[0] == "object" && e[0] !== null ? Object.keys(e[0]) : ["value"], o = {};
        i.forEach((a) => {
          o[a] = s;
        }), e.push(o);
      } else
        e.push(l);
      this.$emit("input", this._clone(this.editValue)), this.$emit("rowAdded", { value: e[e.length - 1] }), delete this.addRowText[t], this.addRowVisible[t] = !1;
    },
    _deleteRow(e, t) {
      typeof window < "u" && !window.confirm(`Delete row ${t}?`) || (e.splice(t, 1), this.$emit("input", this._clone(this.editValue)), this.$emit("rowDeleted", { index: t }));
    },
    _saveRow(e, t) {
      this.$emit("rowSaved", { index: t, value: this._clone(e[t]) });
    },
    _isSortable(e) {
      return this.sort_ ? this.sort_ === !0 ? !0 : Array.isArray(this.sort_) && this.sort_.includes(e) : !1;
    },
    _toggleSort(e) {
      const t = this.sorted_[e];
      if (t)
        t.order === 1 ? t.order = -1 : (delete this.sorted_[e], this._reindexSort());
      else {
        const s = Object.keys(this.sorted_).length;
        this.sorted_[e] = { order: 1, idx: s };
      }
      this._applySort();
    },
    _compareValuesLogic(e, t, s) {
      if (e === t) return 0;
      const l = s === "ascending" ? 1 : -1, i = e == null, o = t == null;
      if (i && o) return 0;
      if (i) return -1 * l;
      if (o) return 1 * l;
      if (typeof e == typeof t) {
        if (typeof e == "number") return (e - t) * l;
        if (typeof e == "string") return e.localeCompare(t) * l;
        if (typeof e == "boolean") return (e === t ? 0 : e ? 1 : -1) * l;
        try {
          const c = JSON.stringify(e).length, h = JSON.stringify(t).length;
          return (c - h) * l;
        } catch {
          return 0;
        }
      }
      const a = { number: 0, string: 1, boolean: 2, object: 3 }, r = a[typeof e] ?? 4, n = a[typeof t] ?? 4;
      return (r - n) * l;
    },
    _reindexSort() {
      Object.keys(this.sorted_).sort((t, s) => this.sorted_[t].idx - this.sorted_[s].idx).forEach((t, s) => {
        this.sorted_[t] = { ...this.sorted_[t], idx: s };
      });
    },
    _goToPage(e) {
      this.page_ = Math.max(1, Math.min(e, this.totalPages));
    },
    _prevPage() {
      this._goToPage(this.page_ - 1);
    },
    _nextPage() {
      this._goToPage(this.page_ + 1);
    },
    _processRows(e) {
      if (!Array.isArray(e) || e.length === 0) return { sorted: [], paged: [], allRows: e };
      e = this._globalFilterRows(e), e = this._columnFilterRows(e);
      let t = e;
      const s = Object.keys(this.sorted_).sort((i, o) => this.sorted_[i].idx - this.sorted_[o].idx);
      if (s.length > 0) {
        const i = e.map((o, a) => ({ row: o, _origIdx: a }));
        i.sort((o, a) => {
          var r, n;
          for (const c of s) {
            const h = this.sorted_[c].order === 1 ? "ascending" : "descending", p = this._compareValuesLogic((r = o.row) == null ? void 0 : r[c], (n = a.row) == null ? void 0 : n[c], h);
            if (p !== 0) return p;
          }
          return o._origIdx - a._origIdx;
        }), t = i.map((o) => o.row);
      }
      const l = this.hasPagination ? t.slice((this.page_ - 1) * this.itemsPerPage_, this.page_ * this.itemsPerPage_) : t;
      return { sorted: t, paged: l, allRows: e };
    },
    _applySort() {
    },
    _sortIcon(e) {
      if (!this._isSortable(e)) return null;
      const t = this.sorted_[e], s = t ? t.order === 1 ? "mdi-arrow-up-bold" : "mdi-arrow-down-bold" : "mdi-swap-vertical", l = t ? "primary" : "grey", i = (n) => {
        var c;
        (c = n == null ? void 0 : n.stopPropagation) == null || c.call(n), this._toggleSort(e);
      }, o = (n) => {
        var c;
        (n == null ? void 0 : n.key) !== "Enter" && (n == null ? void 0 : n.key) !== " " || ((c = n.preventDefault) == null || c.call(n), i(n));
      }, a = { comp: "VIcon", options: {
        props: { small: !0 },
        class: "wbdv-sort-icon",
        style: { color: l, cursor: "pointer", fontSize: "16px", marginLeft: "2px" },
        attrs: {
          title: `Sort by "${e}"`,
          role: "button",
          tabindex: 0,
          "aria-label": `Sort by "${e}"`
        },
        on: { click: i, keydown: o },
        html: s
      } };
      return Object.keys(this.sorted_).length > 1 && t ? { comp: "VBadge", options: {
        props: { value: !0, content: t.idx + 1, color: "primary", overlap: !0, bordered: !1, inline: !0 },
        class: "wbdv-sort-badge",
        style: { cursor: "pointer" },
        html: a
      } } : a;
    },
    async copyToClipboard() {
      try {
        const e = JSON.stringify(this.activeValue, null, 2);
        typeof navigator < "u" && navigator.clipboard && await navigator.clipboard.writeText(e), this.copied = !0, this.$emit("copied", e);
      } catch (e) {
        console.warn("[WBDataViewer] Copy failed:", e);
      }
    },
    bodyRawNode(e) {
      var i, o;
      const t = e !== void 0 ? e : this.activeValue;
      let s;
      try {
        s = JSON.stringify(t, null, 2);
      } catch {
        s = "[Circular or unserializable value]";
      }
      if (s === void 0 && (s = String(t)), this.editable_)
        return { comp: "VTextarea", options: {
          class: "wbdv-raw wbdv-raw-editable",
          style: { fontFamily: "monospace", fontSize: "12px" },
          props: {
            value: s,
            outlined: !0,
            dense: !0,
            hideDetails: !0,
            rows: Math.min(20, Math.max(3, (s.match(/\n/g) || []).length + 1)),
            autoGrow: !0
          },
          on: { change: (a) => {
            const r = this._strToObj(a);
            this.editValue = r, this.twoWay_ && (this.value_ = this._clone(r), this.$emit("input", this._clone(r)));
          } },
          ...((i = this.templates_) == null ? void 0 : i.raw) || {}
        } };
      const l = s.replace(/{/g, "&lbrace;").replace(/}/g, "&rbrace;");
      return { comp: "pre", options: {
        class: "wbdv-raw",
        style: { padding: "12px", margin: 0, overflowX: "auto", fontFamily: "monospace", fontSize: "12px", background: "#1e1e1e", color: "#d4d4d4", whiteSpace: "pre", tabSize: 2, borderRadius: "4px" },
        html: l
      }, ...((o = this.templates_) == null ? void 0 : o.raw) || {} };
    },
    /**
     * Inline recursive JSON tree (ADR-DV-002).
     */
    _jsonTreeNode(e, t = 0, s = []) {
      if (e == null || typeof e != "object") {
        let f = String(e);
        return typeof e == "string" && (f = `"${e}"`), {
          comp: "span",
          options: {
            class: `wbdv-json-val wbdv-json-${typeof e}`,
            style: {
              color: typeof e == "string" ? "#4caf50" : typeof e == "number" ? "#03a9f4" : typeof e == "boolean" ? "#ff9800" : "#9e9e9e",
              fontFamily: "monospace"
            },
            html: f
          }
        };
      }
      const l = Array.isArray(e), i = l ? e.map((f, y) => y) : Object.keys(e);
      this.sort_ && !l && i.sort((f, y) => String(f).localeCompare(String(y)));
      const o = s.join("."), a = this.jsonCollapsed_[o] === !0, r = this.jsonCollapsed_[o] === !1, n = a || !r && t >= this.expandDepth, h = {
        comp: "span",
        options: {
          class: "wbdv-json-toggle",
          style: { cursor: "pointer", userSelect: "none", color: "#757575", marginRight: "4px" },
          on: { click: () => {
            this.jsonCollapsed_[o] = !n;
          } },
          html: n ? "▶ " : "▼ "
        }
      }, p = l ? ["[", "]"] : ["{", "}"];
      if (n)
        return {
          comp: "span",
          options: {
            class: "wbdv-json-collapsed",
            html: [
              h,
              { comp: "span", options: { html: `${p[0]} … ${i.length} ${l ? "items" : "keys"} ${p[1]}` } }
            ]
          }
        };
      const g = i.map((f) => {
        const y = e[f], S = [...s, f];
        return {
          comp: "div",
          options: {
            class: "wbdv-json-row",
            style: { paddingLeft: "16px" },
            html: [
              { comp: "span", options: { class: "wbdv-json-key", style: { color: "#e91e63", marginRight: "4px", fontWeight: "bold" }, html: l ? `${f}:` : `"${f}":` } },
              this._jsonTreeNode(y, t + 1, S)
            ]
          }
        };
      });
      return {
        comp: "div",
        options: {
          class: "wbdv-json-node",
          html: [
            h,
            { comp: "span", options: { html: p[0] } },
            ...g,
            { comp: "div", options: { html: p[1] } }
          ]
        }
      };
    },
    bodyJsonViewerNode(e) {
      var s;
      const t = e !== void 0 ? e : this.activeValue;
      return {
        comp: "div",
        options: {
          key: `jv-${this.expandDepth}`,
          class: "wbdv-json",
          style: { padding: "8px", overflowX: "auto" },
          html: this._jsonTreeNode(t, 0, [])
        },
        ...((s = this.templates_) == null ? void 0 : s.json) || {}
      };
    },
    bodyPrimitiveNode(e) {
      var s;
      const t = e !== void 0 ? e : this.activeValue;
      return {
        comp: "div",
        options: {
          class: "wbdv-primitive",
          style: { padding: "8px" },
          html: this._jsonTreeNode(t, 0, [])
        },
        ...((s = this.templates_) == null ? void 0 : s.prim) || {}
      };
    },
    bodyWbcNode(e) {
      return e !== void 0 ? e : this.activeValue;
    },
    _editableCellField(e, t, s) {
      const l = this._hasCellChanged(s), i = s && s.length ? s[s.length - 1] : t, o = this._rulesForField(i);
      return { comp: "div", options: { class: "wbdv-cell-editing", style: { display: "flex", flexDirection: "row", alignItems: "center", gap: "4px" }, html: [
        { comp: "VTextField", options: {
          class: "wbdv-cell-field",
          props: {
            value: e === null ? "null" : String(e),
            label: t,
            dense: !0,
            outlined: !0,
            hideDetails: o.length ? "auto" : !0,
            appendIcon: this.cellSave_ && l ? "mdi-content-save-check" : void 0,
            appendOuterIcon: this.cellDel_ ? "mdi-delete" : void 0
          },
          rules: o,
          on: {
            change: (a) => this._setNestedValue(s, a),
            "click:append": () => this._confirmCellEdit(s),
            "click:append-outer": () => this._deleteProperty(s)
          }
        } },
        l ? this._btn({ icon: !0, small: !0, title: "Restore", onClick: () => this._cancelCellEdit(s), children: [this._icon("mdi-close-circle")] }) : null
      ] } };
    },
    _editableLeafNode(e, t, s) {
      const l = this._isCellEditing(s);
      if (this.editable_) {
        const o = s && s.length ? s[s.length - 1] : t, a = this._rulesForField(o);
        return { comp: "VTextField", options: {
          class: "wbdv-cell-field",
          style: { fontFamily: "inherit", fontSize: "12px" },
          props: {
            value: e === null ? "null" : String(e),
            label: t,
            dense: !0,
            outlined: !0,
            hideDetails: a.length ? "auto" : !0
          },
          rules: a,
          on: { change: (r) => this._setNestedValue(s, r) }
        } };
      }
      if (l)
        return this._editableCellField(e, t, s);
      const i = [];
      return this.cellEdit_ && i.push(this._btn({ icon: !0, small: !0, title: "Edit", onClick: () => this._startCellEdit(s, e), children: [this._icon("mdi-pencil")] })), { comp: "div", options: { class: "wbdv-cell-display", style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px", padding: "2px 4px" }, html: [
        { comp: "span", options: {
          class: "wbdv-cell-value",
          style: { flex: 1, wordBreak: "break-all" },
          html: e === null ? { comp: "span", options: { class: "wbdv-cell-null", style: { color: "#999", fontStyle: "italic" }, html: "null" } } : String(e)
        } },
        ...i
      ] } };
    },
    _editableTreeNode(e, t, s, l = /* @__PURE__ */ new WeakSet()) {
      if (e === null || typeof e != "object") return this._editableLeafNode(e, s, t);
      if (l.has(e))
        return { comp: "span", options: { class: "wbdv-cell-null", style: { color: "#999", fontStyle: "italic" }, html: "[Circular]" } };
      if (l.add(e), this._isCellEditing(t)) {
        const c = Array.isArray(e) ? e.map((h, p) => [String(p), h]) : Object.entries(e);
        return { comp: "div", options: {
          class: "wbdv-edit-group",
          style: { margin: "4px 0", paddingLeft: "16px", borderLeft: "2px solid #e0e0e0" },
          html: c.map(([h, p]) => this._editableTreeNode(p, [...t, h], h, l))
        } };
      }
      const o = Array.isArray(e), a = o ? e.map((n, c) => [String(c), n]) : Object.entries(e), r = [];
      return this.cellEdit_ && r.push(this._btn({ icon: !0, small: !0, title: "Edit all nested", onClick: () => this._startCellEdit(t, e), children: [this._icon("mdi-pencil")] })), { comp: "div", options: { class: "wbdv-edit-group", style: { margin: "4px 0", paddingLeft: "16px", borderLeft: "2px solid #e0e0e0" }, html: [
        { comp: "div", options: { class: "wbdv-edit-group-hdr", style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, html: [
          { comp: "span", options: { class: "wbdv-edit-group-label", style: { fontSize: "11px", color: "#888", padding: "2px 0 4px", textTransform: "uppercase", letterSpacing: "0.5px", flex: 1 }, html: o ? `[${s} — ${a.length}]` : `{${s} — ${a.length}}` } },
          ...r
        ] } },
        { comp: "div", options: {
          class: "wbdv-edit-group-body",
          style: { display: "flex", flexDirection: "column", gap: "2px" },
          html: a.map(([n, c]) => this._editableTreeNode(c, [...t, n], n, l))
        } }
      ] } };
    },
    bodyEditableNode(e) {
      var l;
      const t = e !== void 0 ? e : this.editValue;
      if (t == null || typeof t != "object") return this.bodyPrimitiveNode(t);
      const s = Array.isArray(t) ? t.map((i, o) => [String(o), i]) : Object.entries(t);
      return { comp: "div", options: {
        class: "wbdv-edit-root",
        style: { padding: "8px" },
        html: s.map(([i, o]) => this._editableTreeNode(o, [i], i))
      }, ...((l = this.templates_) == null ? void 0 : l.edit) || {} };
    },
    _deleteProperty(e) {
      if (typeof window < "u" && !window.confirm(`Delete "${e[e.length - 1]}"?`)) return;
      let t = this.editValue;
      for (let i = 0; i < e.length - 1; i++) {
        const o = Array.isArray(t) ? Number(e[i]) : e[i];
        t = t[o];
      }
      const s = Array.isArray(t) ? Number(e[e.length - 1]) : e[e.length - 1];
      Array.isArray(t) ? t.splice(Number(s), 1) : delete t[s], this.$emit("input", this._clone(this.editValue)), this.$emit("deleted", { path: e, value: null });
      const l = this._pathKey(e);
      delete this.editingCells[l], delete this.originalValues[l];
    },
    toggleCopyable(e) {
      e === !0 ? this.copyable_ = !this.copyable_ : e === !1 ? this.copyable_ = e : this.copyable_ = !0, this.key_++;
    },
    toggleShowHeader(e) {
      e === !0 ? this.showHeader_ = !this.showHeader_ : e === !1 ? this.showHeader_ = e : this.showHeader_ = !0, this.key_++;
    },
    toggleBoxed(e) {
      e === !0 ? this.boxed_ = !this.boxed_ : e === !1 ? this.boxed_ = e : this.boxed_ = !0, this.key_++;
    },
    toggleTwoWay(e) {
      e === !0 ? this.twoWay_ = !this.twoWay_ : e === !1 ? this.twoWay_ = e : this.twoWay_ = !0, this.key_++;
    },
    toggleSmartInput(e) {
      e === !0 ? this.smartInput_ = !this.smartInput_ : e === !1 ? this.smartInput_ = e : this.smartInput_ = !0, this.key_++;
    },
    toggleEditable(e) {
      e === !0 ? this.editable_ = !this.editable_ : e === !1 ? this.editable_ = e : this.editable_ = !0, this.key_++;
    },
    toggleCellDel(e) {
      e === !0 ? this.cellDel_ = !this.cellDel_ : e === !1 ? this.cellDel_ = e : this.cellDel_ = !0, this.key_++;
    },
    toggleCellEdit(e) {
      e === !0 ? this.cellEdit_ = !this.cellEdit_ : e === !1 ? this.cellEdit_ = e : this.cellEdit_ = !0, this.key_++;
    },
    toggleCellSave(e) {
      e === !0 ? this.cellSave_ = !this.cellSave_ : e === !1 ? this.cellSave_ = e : this.cellSave_ = !0, this.key_++;
    },
    toggleRowDel(e) {
      e === !0 ? this.rowDel_ = !this.rowDel_ : e === !1 ? this.rowDel_ = e : this.rowDel_ = !0, this.key_++;
    },
    toggleRowSave(e) {
      e === !0 ? this.rowSave_ = !this.rowSave_ : e === !1 ? this.rowSave_ = e : this.rowSave_ = !0, this.key_++;
    },
    toggleRowAdd(e) {
      e === !0 ? this.rowAdd_ = !this.rowAdd_ : e === !1 ? this.rowAdd_ = e : this.rowAdd_ = !0, this.key_++;
    },
    toggleSort(e) {
      e === !0 ? this.sort_ = !this.sort_ : e === !1 ? this.sort_ = e : this.sort_ = !0, this.key_++;
    },
    togglePagination(e) {
      e === !0 ? this.pagination_ = !this.pagination_ : e === !1 ? this.pagination_ = e : this.pagination_ = !0, this.key_++;
    },
    toggleSearchColor(e) {
      e === !0 ? this.searchColor_ = !this.searchColor_ : e === !1 ? this.searchColor_ = e : this.searchColor_ = !0;
    },
    toggleColumnFilters(e) {
      e === !0 ? this.columnFilters_ = !this.columnFilters_ : e === !1 ? this.columnFilters_ = e : this.columnFilters_ = !0, this.key_++;
    },
    toggleColumnSearch(e) {
      e === !0 ? this.columnSearch_ = !this.columnSearch_ : e === !1 ? this.columnSearch_ = e : this.columnSearch_ = !0, this.key_++;
    },
    toggleSelectable(e) {
      e === !0 ? this.selectable_ = !this.selectable_ : e === !1 ? this.selectable_ = e : this.selectable_ = !0, this.key_++;
    },
    _toggleRowSelection(e) {
      const t = this.selItems_.indexOf(e);
      t === -1 ? this.selItems_.push(e) : this.selItems_.splice(t, 1), this.$emit("selection-change", this.selItems_.slice());
    },
    _selectAllRows() {
      this.selItems_ = Array.from({ length: this.totalItems }, (e, t) => t), this.$emit("selection-change", this.selItems_.slice());
    },
    _clearSelection() {
      this.selItems_ = [], this.$emit("selection-change", []);
    },
    async exportHtml() {
      try {
        await this.$nextTick();
        const e = this.$el;
        if (!e) return;
        const t = e.outerHTML.replace(/\s*data-v-[a-f0-9]+/g, "").replace(/\s*aria-.+?="[^"]*"/g, "").replace(/\s*role="[^"]*"/g, "").replace(/\s*tabindex="[^"]*"/g, "");
        typeof navigator < "u" && navigator.clipboard && await navigator.clipboard.writeText(t), this.copied = !0, this.$emit("exported-html", t);
      } catch (e) {
        console.warn("[WBDataViewer] HTML export failed:", e);
      }
    },
    _columnFilterRows(e) {
      if (!this.columnFilters_) return e;
      const t = Object.entries(this.filters_).filter(([l, i]) => i && i.trim());
      if (t.length === 0) return e;
      const s = this.columnFilterMode_;
      return e.filter((l) => t.every(([i, o]) => {
        const a = l == null ? void 0 : l[i];
        if (a == null) return !1;
        const r = o.trim();
        if (s === "regex")
          try {
            return new RegExp(r, "i").test(String(a));
          } catch {
            return String(a).toLowerCase().includes(r.toLowerCase());
          }
        return this._rowMatchesSearchCriteria(l, r, i);
      }));
    },
    _setColumnFilter(e, t) {
      this.filters_[e] = t, this.page_ = 1;
    },
    _clearColumnFilter(e) {
      this.filters_[e] = "", this.page_ = 1;
    },
    _clearAllColumnFilters() {
      this.filters_ = {}, this.page_ = 1;
    },
    _activeFilterCount() {
      return Object.values(this.filters_).filter((e) => e && e.trim()).length;
    },
    _setColumnSearch(e, t) {
      this.columnSearches_[e] = t;
    },
    _clearColumnSearch(e) {
      this.columnSearches_[e] = "";
    },
    _clearAllColumnSearches() {
      this.columnSearches_ = {};
    },
    _activeColumnSearchKeys() {
      return this.columnSearch_ ? Object.entries(this.columnSearches_).filter(([, e]) => e && e.trim()).map(([e]) => e) : [];
    },
    _columnSearchInput(e) {
      var c;
      if (!this.columnSearch_) return null;
      const t = this, s = this.columnSearches_[e] || "", l = s && s.trim(), i = (h) => {
        const p = h && typeof h == "object" && h.target && "value" in h.target ? h.target.value : h || "";
        t._setColumnSearch(e, p);
      }, o = { comp: "VTextField", options: {
        props: {
          value: s,
          modelValue: s,
          dense: !0,
          density: "compact",
          hideDetails: !0,
          outlined: !0,
          variant: "outlined",
          singleLine: !0,
          clearable: !1,
          placeholder: "Search criteria…",
          title: `Column search — highlight matches in "${e}" without removing rows.`,
          appendInnerIcon: l ? "mdi-close" : void 0,
          backgroundColor: l ? "#fffde7" : "#fff"
        },
        class: "wbdv-column-search-input",
        style: { width: "100%", fontSize: "10px", maxWidth: "132px", "--v-input-control-height": "28px" },
        on: {
          "click:append-inner": () => t._clearColumnSearch(e),
          input: i,
          "update:modelValue": i
        }
      }, ...((c = this.templates_) == null ? void 0 : c.columnSearchInput) || {} }, a = this._parseSearchTerms(s), r = this.cGlobalSearchTerms.length, n = a.map((h, p) => {
        const g = this.searchColor_ ? (r + p) % tt.length : 0, f = h.type === "expr" ? " ⚡" : h.caseSensitive ? " Aa" : h.isGlob ? " ✱" : h.isGroup ? " ☍" : "";
        return { comp: "VChip", options: {
          props: { small: !0, label: !0 },
          class: `wbdv-active-chip wbdv-active-search wbdv-active-colsearch-term wbdv-sc-${g}`,
          style: { fontSize: "10px", height: "18px" },
          attrs: { title: `Column "${e}" search: "${h.raw}"` },
          html: h.display + f
        } };
      });
      return { comp: "div", options: {
        class: "wbdv-column-search-wrap",
        style: { display: "flex", flexDirection: "column", gap: "2px", width: "100%", maxWidth: "132px" },
        html: [
          o,
          n.length ? { comp: "div", options: {
            class: "wbdv-active-chiprow wbdv-column-search-chiprow",
            style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px" },
            html: n
          } } : null
        ].filter(Boolean)
      } };
    },
    _columnFilterInput(e) {
      var a;
      if (!this.columnFilters_) return null;
      const t = this, s = this.filters_[e] || "", l = s && s.trim(), i = this.columnFilterMode_ === "regex" ? "regex" : "criteria", o = (r) => {
        const n = r && typeof r == "object" && r.target && "value" in r.target ? r.target.value : r || "";
        t._setColumnFilter(e, n);
      };
      return { comp: "VTextField", options: {
        props: {
          value: s,
          modelValue: s,
          dense: !0,
          density: "compact",
          hideDetails: !0,
          outlined: !0,
          variant: "outlined",
          singleLine: !0,
          clearable: !1,
          placeholder: `Filter (${i})…`,
          title: `Column filter — search criteria within a field use OR/comma precedence; all active column filters combine with AND. Mode: ${i}.`,
          appendInnerIcon: l ? "mdi-close" : void 0,
          backgroundColor: l ? "#e3f2fd" : "#fff"
        },
        class: "wbdv-column-filter-input",
        style: { width: "100%", fontSize: "10px", maxWidth: "132px", "--v-input-control-height": "28px" },
        on: {
          "click:append-inner": () => {
            t._clearColumnFilter(e);
          },
          input: o,
          "update:modelValue": o
        }
      }, ...((a = this.templates_) == null ? void 0 : a.columnFilterInput) || {} };
    },
    _parseSearchTerms(e, t = !1) {
      if (!e || !e.trim()) return [];
      if (e = this._stripUnmatchedSearchParentheses(e), !e.trim()) return [];
      if (!t) {
        const r = this._parseLogicalSearchTerms(e);
        if (r) return r;
      }
      const s = [], l = /"([^"]*)"|\(([^)]*)\)|([^\s]+)/g;
      let i;
      for (; (i = l.exec(e)) !== null; ) {
        const r = i[1] !== void 0, n = i[2] !== void 0, c = r ? i[1] : n ? i[2] : i[3];
        !c || /^[(),]+$/.test(c) || !n && (c === "*" || c === "?") || s.push({
          raw: c,
          isQuoted: r,
          isGroup: n,
          isLogic: c === "&&" || c === "||",
          isExpr: c.includes("%") || /^[<>=!]/.test(c)
        });
      }
      const o = [];
      for (let r = 0; r < s.length; r++) {
        let n = s[r];
        if (!n.isLogic) {
          if (n.isExpr && !n.isGroup && !n.isQuoted)
            for (; r + 1 < s.length && s[r + 1].isLogic; ) {
              const c = s[r + 1].raw, h = s[r + 2];
              if (h)
                n.raw += ` ${c} ${h.raw}`, r += 2;
              else break;
            }
          o.push(n);
        }
      }
      const a = [];
      return o.forEach((r) => {
        const { raw: n, isQuoted: c, isGroup: h } = r;
        let p = h ? "group" : c ? "quoted" : n.includes("%") || /^[<>=!]/.test(n) ? "expr" : "plain", g = null, f = "", y = n, S = n, m = null, j = !1, O = null;
        if (h) {
          const D = n.match(/^\s*"([^"]+)"\s*:\s*([\s\S]*)$/), k = D ? null : n.match(/^\s*([$A-Z_a-z][$0-9A-Z_a-z.-]*)\s*:\s*([\s\S]*)$/), W = D || k;
          if (W && (m = W[1], j = !!D, S = W[2].trim(), !S))
            return;
        }
        const F = h ? this._compileColumnComparison(S) : null;
        if (F ? (p = "columnCompare", y = `(${n})`, f = "(?!)") : p === "expr" && (g = this._compileSearchExpr(n), g ? f = "-?\\d+(?:\\.\\d+)?" : p = "plain"), p === "group") {
          y = `(${n})`;
          const D = this._compileSearchExpr(S);
          if (D)
            f = "-?\\d+(?:\\.\\d+)?", g = D;
          else if (O = this._compileHybridSearchGroup(S, !!m), O)
            p = "hybridGroup", f = "(?!)";
          else {
            const k = S.split(/\s+/).filter((M) => M && M !== "&&" && M !== "||");
            if (k.length === 0) return;
            const W = [], ee = [];
            k.forEach((M) => {
              if (M.includes("%") || /^[<>=!]/.test(M)) {
                const ce = this._compileSearchExpr(M);
                if (ce) {
                  W.push("-?\\d+(?:\\.\\d+)?"), ee.push({ type: "expr", test: ce });
                  return;
                }
              }
              if (m && /^-?\d+(?:\.\d+)?$/.test(M)) {
                W.push("-?\\d+(?:\\.\\d+)?"), ee.push({ type: "number", value: Number(M) });
                return;
              }
              let B = M.replace(/([.*+?^${}()|[\]\\])/g, "\\$1");
              /[?*]/.test(M) && (B = B.replace(/\\\*/g, ".*").replace(/\\\?/g, ".")), W.push(B), ee.push(/[?*]/.test(M) ? { type: "glob", regex: new RegExp(B, "i") } : { type: "plain", raw: M });
            }), f = `(?:${W.join("|")})`, g = (M) => ee.some((B) => B.type === "expr" ? B.test(M) : B.type === "number" ? Number(M) === B.value : B.type === "glob" ? (B.regex.lastIndex = 0, B.regex.test(String(M))) : String(M).toLowerCase().includes(B.raw.toLowerCase()));
          }
        } else (p === "plain" || p === "quoted") && (y = c ? `"${n}"` : n, f = n.replace(/([.*+?^${}()|[\]\\])/g, "\\$1"), /[?*]/.test(n) && (f = f.replace(/\\\*/g, ".*").replace(/\\\?/g, ".")));
        const I = c ? "" : "i";
        a.push({
          raw: n,
          type: p,
          display: y,
          test: g,
          columnScope: m,
          columnScopeExact: j,
          columnCompare: F,
          hybridGroup: O,
          isGroup: h,
          isGlob: /[?*]/.test(n),
          caseSensitive: c,
          regex: new RegExp(f, I),
          gRegex: new RegExp(f, (I || "") + "g")
        });
      }), a;
    },
    _stripUnmatchedSearchParentheses(e) {
      if (!e || typeof e != "string") return e || "";
      const t = [], s = /* @__PURE__ */ new Set();
      let l = !1;
      for (let i = 0; i < e.length; i++) {
        const o = e[i];
        if (o === '"') {
          l = !l;
          continue;
        }
        l || (o === "(" ? t.push(i) : o === ")" && (t.length ? t.pop() : s.add(i)));
      }
      return t.forEach((i) => s.add(i)), s.size === 0 ? e : [...e].filter((i, o) => !s.has(o)).join("");
    },
    _parseLogicalSearchTerms(e) {
      if (!e || typeof e != "string") return null;
      let t = 0, s = 0, l = !1, i = !1;
      for (let S = 0; S < e.length; S++) {
        const m = e[S];
        if (m === '"') {
          l = !l;
          continue;
        }
        if (!l)
          if (m === "(")
            t++, s = Math.max(s, t);
          else if (m === ")") {
            if (t--, t < 0) return null;
          } else m === "," && t === 0 && (i = !0);
      }
      if (l || t !== 0 || !i && s < 2) return null;
      const o = [], a = e.replace(/"[^"]*"/g, (S) => {
        const m = `${o.length}`;
        return o.push(S), m;
      }), r = (S) => S.replace(/\uE000(\d+)\uE001/g, (m, j) => o[Number(j)] ?? m), n = a.replace(/\s*,\s*/g, ",").replace(/\s*(===|!==|==|!=|<=|>=|=|<|>)\s*/g, "$1").replace(/\s*([+*/-])\s*/g, "$1").trim(), c = (S, m) => {
        const j = [];
        let O = "", F = 0;
        const I = () => {
          const D = O.trim();
          D && j.push(D), O = "";
        };
        for (let D = 0; D < S.length; D++) {
          const k = S[D];
          k === "(" ? F++ : k === ")" && F--, F === 0 && (m === "," && k === "," || m === "space" && /\s/.test(k)) ? I() : O += k;
        }
        return I(), j;
      }, h = (S) => {
        let m = S.trim(), j = !0;
        for (; j && m.startsWith("(") && m.endsWith(")"); ) {
          j = !1;
          let O = 0;
          for (let F = 0; F < m.length && (m[F] === "(" ? O++ : m[F] === ")" && O--, !(O === 0 && F < m.length - 1)); F++)
            O === 0 && F === m.length - 1 && (m = m.slice(1, -1).trim(), j = !0);
        }
        return m;
      }, p = (S, m) => {
        const j = [];
        for (const O of S)
          for (const F of m)
            if (j.push([...O, ...F]), j.length > 256) return null;
        return j;
      }, g = (S) => {
        const m = h(S);
        if (!m) return [];
        const j = c(m, "space");
        if (j.length > 1) {
          const F = [];
          for (const I of j) {
            const D = g(I);
            if (!D || (F.push(...D), F.length > 256)) return null;
          }
          return F;
        }
        const O = c(m, ",");
        if (O.length > 1) {
          let F = [[]];
          for (const I of O) {
            const D = g(I);
            if (!D || (F = p(F, D), !F)) return null;
          }
          return F;
        }
        return [[r(m)]];
      }, f = c(n, "space"), y = [];
      for (const S of f) {
        const m = g(S);
        if (!m || m.length === 0) return null;
        const j = m.map((D) => D.join(",")).join(" "), O = this._parseSearchTerms(`(${j})`, !0);
        if (O.length !== 1) return null;
        const F = O[0], I = r(S);
        F.raw = I, F.display = I.startsWith("(") && I.endsWith(")") ? I : `(${I})`, F.isGroup = !0, y.push(F);
      }
      return y.length ? y : null;
    },
    _compileHybridSearchGroup(e, t = !1) {
      if (!e || typeof e != "string") return null;
      const s = [];
      let l = !1;
      const i = e.replace(/"[^"]*"|"[^"]*$/g, (p) => {
        p.endsWith('"') || (l = !0);
        const g = `${s.length}`;
        return s.push(p), g;
      });
      if (l) return null;
      const o = (p) => p.replace(/\uE000(\d+)\uE001/g, (g, f) => s[Number(f)] ?? g), a = i.replace(/\s*,\s*/g, ",").replace(/\s*(===|!==|==|!=|<=|>=|=|<|>)\s*/g, "$1").replace(/\s*([+*/-])\s*/g, "$1").trim(), r = a.split(/\s+/).filter(Boolean);
      if (r.length === 0) return null;
      let n = !1, c = 0;
      const h = r.map((p) => {
        const f = p.split(",").filter(Boolean).map(o).map((y) => {
          const S = this._compileColumnComparison(y);
          if (S)
            return n = !0, {
              raw: y,
              type: "columnCompare",
              columnCompare: S,
              regex: /(?!)/,
              gRegex: /(?!)/g
            };
          if (t && /^-?\d+(?:\.\d+)?$/.test(y)) {
            const j = Number(y);
            return {
              raw: y,
              type: "number",
              test: (O) => Number(O) === j,
              regex: /-?\d+(?:\.\d+)?/,
              gRegex: /-?\d+(?:\.\d+)?/g
            };
          }
          const m = this._parseSearchTerms(y);
          return m.length === 1 ? m[0] : null;
        }).filter(Boolean);
        return c += f.length, f;
      });
      return h.some((p) => p.length === 0) || !n && !a.includes(",") || c < 1 ? null : { segments: h };
    },
    _hybridCriterionMatchesCell(e, t, s, l) {
      return e.type === "columnCompare" ? this._columnComparisonMatches(e, s, l) : this._searchTermMatches(e, t);
    },
    _hybridGroupMatchesCell(e, t, s, l) {
      const i = e == null ? void 0 : e.hybridGroup;
      if (!i || !s || typeof s != "object") return !1;
      const o = Object.entries(s).filter(([n]) => this._termTargetsColumn(e, n)), a = (n) => n.type === "columnCompare" ? this._columnComparisonMatches(n, s, null) : o.some(([, c]) => this._searchTermMatches(n, c));
      return i.segments.filter((n) => n.every(a)).some((n) => n.some(
        (c) => this._hybridCriterionMatchesCell(c, t, s, l)
      ));
    },
    _compileColumnComparison(e) {
      if (!e || typeof e != "string") return null;
      const t = '(?:"([^"]+)"|([$A-Z_a-z][$0-9A-Z_a-z.-]*))', s = e.match(new RegExp(`^\\s*${t}\\s*(===|!==|==|!=|<=|>=|=|<|>)\\s*([*?]*)${t}([*?]*)\\s*$`));
      if (s) {
        const c = s[4] || "", h = s[7] || "";
        if (!!(c || h))
          return ["=", "==", "!="].includes(s[3]) ? {
            leftColumn: s[1] || s[2],
            leftExact: s[1] != null,
            operator: s[3],
            rightColumn: s[5] || s[6],
            rightExact: s[5] != null,
            globPrefix: c,
            globSuffix: h,
            hasWildcard: !0
          } : null;
      }
      const l = e.match(/^\s*(.+?)\s*(===|!==|==|!=|<=|>=|=|<|>)\s*(.+?)\s*$/);
      if (!l) return null;
      const i = this._compileColumnOperation(l[1]), o = this._compileColumnOperation(l[3]);
      if (!i || !o) return null;
      const a = [...i.columns, ...o.columns];
      if (a.length < 2) return null;
      const r = i.ast.type === "COLUMN" ? i.ast : null, n = o.ast.type === "COLUMN" ? o.ast : null;
      return {
        leftColumn: r == null ? void 0 : r.name,
        leftExact: (r == null ? void 0 : r.exact) || !1,
        operator: l[2],
        rightColumn: n == null ? void 0 : n.name,
        rightExact: (n == null ? void 0 : n.exact) || !1,
        leftExpression: i,
        rightExpression: o,
        columns: a,
        hasWildcard: !1
      };
    },
    _compileColumnOperation(e) {
      if (!e || typeof e != "string") return null;
      try {
        const t = [];
        let s = 0;
        for (; s < e.length; ) {
          const f = e[s];
          if (/\s/.test(f)) {
            s++;
            continue;
          }
          if ("+-*/".includes(f)) {
            t.push({ type: "OP", value: f }), s++;
            continue;
          }
          if (f === "(" || f === ")") {
            t.push({ type: f }), s++;
            continue;
          }
          if (f === '"') {
            let y = "";
            for (s++; s < e.length && e[s] !== '"'; ) y += e[s++];
            if (e[s] !== '"' || !y) return null;
            s++, t.push({ type: "COLUMN", name: y, exact: !0 });
            continue;
          }
          if (/[0-9.]/.test(f)) {
            const S = e.slice(s).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);
            if (!S) return null;
            t.push({ type: "NUMBER", value: Number(S[0]) }), s += S[0].length;
            continue;
          }
          if (/[$A-Z_a-z]/.test(f)) {
            const y = e.slice(s).match(/^[$A-Z_a-z][$0-9A-Z_a-z.]*/);
            t.push({ type: "COLUMN", name: y[0], exact: !1 }), s += y[0].length;
            continue;
          }
          return null;
        }
        t.push({ type: "EOF" });
        let l = 0;
        const i = () => t[l], o = () => t[l++], a = () => {
          const f = i();
          if (f.type === "NUMBER")
            return o(), { type: "NUMBER", value: f.value };
          if (f.type === "COLUMN")
            return o(), { type: "COLUMN", name: f.name, exact: f.exact };
          if (f.type === "(") {
            o();
            const y = c();
            if (i().type !== ")") throw new Error("Expected closing parenthesis");
            return o(), y;
          }
          throw new Error("Expected a number or column");
        }, r = () => i().type === "OP" && (i().value === "+" || i().value === "-") ? o().value === "+" ? r() : { type: "NEGATE", value: r() } : a(), n = () => {
          let f = r();
          for (; i().type === "OP" && (i().value === "*" || i().value === "/"); )
            f = { type: "BINARY", operator: o().value, left: f, right: r() };
          return f;
        }, c = () => {
          let f = n();
          for (; i().type === "OP" && (i().value === "+" || i().value === "-"); )
            f = { type: "BINARY", operator: o().value, left: f, right: n() };
          return f;
        }, h = c();
        if (i().type !== "EOF") return null;
        const p = [], g = (f) => {
          f.type === "COLUMN" ? p.push({ name: f.name, exact: f.exact }) : f.type === "BINARY" ? (g(f.left), g(f.right)) : f.type === "NEGATE" && g(f.value);
        };
        return g(h), { ast: h, columns: p };
      } catch {
        return null;
      }
    },
    _evaluateColumnOperation(e, t) {
      if (!e) return { ok: !1, value: void 0 };
      if (e.type === "NUMBER") return { ok: !0, value: e.value };
      if (e.type === "COLUMN") {
        const n = this._resolveComparisonColumn(t, e.name, e.exact);
        return n == null ? { ok: !1, value: void 0 } : { ok: !0, value: t[n] };
      }
      if (e.type === "NEGATE") {
        const n = this._evaluateColumnOperation(e.value, t), c = Number(n.value);
        return n.ok && Number.isFinite(c) ? { ok: !0, value: -c } : { ok: !1, value: void 0 };
      }
      if (e.type !== "BINARY") return { ok: !1, value: void 0 };
      const s = this._evaluateColumnOperation(e.left, t), l = this._evaluateColumnOperation(e.right, t);
      if (!s.ok || !l.ok) return { ok: !1, value: void 0 };
      const i = Number(s.value), o = Number(l.value), a = s.value !== "" && s.value != null && Number.isFinite(i), r = l.value !== "" && l.value != null && Number.isFinite(o);
      return e.operator === "+" ? typeof s.value == "number" && Number.isFinite(s.value) && typeof l.value == "number" && Number.isFinite(l.value) ? { ok: !0, value: s.value + l.value } : { ok: !0, value: String(s.value ?? "") + String(l.value ?? "") } : !a || !r ? { ok: !1, value: void 0 } : e.operator === "-" ? { ok: !0, value: i - o } : e.operator === "*" ? { ok: !0, value: i * o } : e.operator === "/" && o !== 0 ? { ok: !0, value: i / o } : { ok: !1, value: void 0 };
    },
    _resolveComparisonColumn(e, t, s = !1) {
      if (!e || typeof e != "object" || t == null) return null;
      if (s) return Object.prototype.hasOwnProperty.call(e, t) ? t : null;
      const l = String(t).toLowerCase();
      return Object.keys(e).find((i) => String(i).toLowerCase() === l) ?? null;
    },
    _compareColumnValues(e, t, s, l = null) {
      if (l != null && l.hasWildcard) {
        const h = (y) => Array.from(y).map((S) => S === "*" ? ".*" : ".").join(""), p = String(t ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), g = `^${h(l.globPrefix)}${p}${h(l.globSuffix)}$`, f = new RegExp(g).test(String(e ?? ""));
        return s === "!=" ? !f : f;
      }
      const i = (h) => typeof h == "number" && Number.isFinite(h) || typeof h == "string" && h.trim() !== "" && Number.isFinite(Number(h)), o = typeof e == "number" ? e : Number(e), a = typeof t == "number" ? t : Number(t), r = i(e) && i(t), n = r ? o : e, c = r ? a : t;
      switch (s) {
        case "===":
          return e === t;
        case "!==":
          return e !== t;
        case "=":
        case "==":
          return r ? n === c : String(n ?? "") === String(c ?? "");
        case "!=":
          return r ? n !== c : String(n ?? "") !== String(c ?? "");
        case "<":
          return n < c;
        case "<=":
          return n <= c;
        case ">":
          return n > c;
        case ">=":
          return n >= c;
        default:
          return !1;
      }
    },
    _columnComparisonMatches(e, t, s = null) {
      const l = e && e.columnCompare;
      if (!l || !t || typeof t != "object") return !1;
      if (l.leftExpression && l.rightExpression) {
        const a = l.columns.map(
          (c) => this._resolveComparisonColumn(t, c.name, c.exact)
        );
        if (a.some((c) => c == null) || s != null && !a.includes(s)) return !1;
        const r = this._evaluateColumnOperation(l.leftExpression.ast, t), n = this._evaluateColumnOperation(l.rightExpression.ast, t);
        return !r.ok || !n.ok ? !1 : this._compareColumnValues(r.value, n.value, l.operator, l);
      }
      const i = this._resolveComparisonColumn(t, l.leftColumn, l.leftExact), o = this._resolveComparisonColumn(t, l.rightColumn, l.rightExact);
      return i == null || o == null || s != null && s !== i && s !== o ? !1 : this._compareColumnValues(t[i], t[o], l.operator, l);
    },
    _compileSearchExpr(e) {
      try {
        const t = "-?\\d+(?:\\.\\d+)?", s = "(?:===|!==|==|!=|<=|>=|<|>)";
        if (!new RegExp(`(?:%\\s*${s}\\s*${t}|${t}\\s*${s}\\s*%)`).test(e)) return null;
        let i = e.replace(/(-?\d+(?:\.\d+)?)\s*([<>]=?)\s*%\s*([<>]=?)\s*(-?\d+(?:\.\d+)?)/g, "($1 $2 % && % $3 $4)");
        if (i = i.replace(/([^<>!])=([^=])/g, "$1==$2").replace(/^=([^=])/, "==$1"), i = i.replace(/%/g, " v "), /[^0-9v.<>=!&|!\s()+-]/.test(i)) return null;
        const o = $e(i), a = Fe(o);
        return (r) => {
          const n = parseFloat(r);
          if (isNaN(n)) return !1;
          try {
            return !!L(a, { v: n });
          } catch {
            return !1;
          }
        };
      } catch {
        return null;
      }
    },
    _isColorDark(e) {
      if (!e || e[0] !== "#") return !1;
      const t = parseInt(e.slice(1, 3), 16), s = parseInt(e.slice(3, 5), 16), l = parseInt(e.slice(5, 7), 16);
      return (t * 299 + s * 587 + l * 114) / 1e3 < 128;
    },
    _termTargetsColumn(e, t) {
      if (!e || e.columnScope == null) return !0;
      if (t == null) return !1;
      const s = String(t), l = String(e.columnScope);
      return e.columnScopeExact ? s === l : s.toLowerCase() === l.toLowerCase();
    },
    _cellMatchesSearch(e, t = null, s = null) {
      return this._cellMatchTerm(e, t, s) != null;
    },
    _valueMatchesGlobalSearch(e, t = null, s = null) {
      return e == null || typeof e != "object" ? this._cellMatchesSearch(e, t, s) : this.globalSearchScope_ !== "deep" ? !1 : this.cGlobalSearchTerms.some(
        (l) => this._searchTermMatchesRow(l, e, null, !0)
      );
    },
    _rowMatchesGlobalSearch(e) {
      return !this.cGlobalSearchTerms.length || !e || typeof e != "object" ? !1 : this.cGlobalSearchTerms.some(
        (t) => this._searchTermMatchesRow(t, e, null, this.globalSearchScope_ === "deep")
      );
    },
    _searchTermMatches(e, t) {
      const s = String(t ?? "");
      if (e.type === "expr" || e.test) {
        if (e.test(s)) return !0;
        const l = e.gRegex;
        l.lastIndex = 0;
        let i;
        for (; (i = l.exec(s)) !== null; ) {
          if (e.test(i[0])) return !0;
          i[0].length === 0 && l.lastIndex++;
        }
        return !1;
      }
      return e.regex.lastIndex = 0, e.regex.test(s);
    },
    _cellMatchesColumnSearch(e, t) {
      return this.columnSearch_ ? (this.cParsedColumnSearches[t] || []).some((l) => this._searchTermMatches(l, e)) : !1;
    },
    _cellMatchTerm(e, t = null, s = null) {
      const l = this._effectiveGlobalSearchText();
      if (!l) return null;
      const i = this._parseSearchTerms(l).filter((n) => this._termTargetsColumn(n, t));
      if (i.length === 0) return null;
      const o = this.globalSearchMode_, a = (n) => n.type === "columnCompare" ? this._columnComparisonMatches(n, s, t) : n.type === "hybridGroup" ? this._hybridGroupMatchesCell(n, e, s, t) : this._searchTermMatches(n, e);
      if (o === "and")
        return i.every(a) ? 0 : null;
      const r = i.findIndex(a);
      return r >= 0 ? r : null;
    },
    _rowMatchesFilter(e) {
      const t = this._effectiveGlobalFilterTexts();
      return t.length > 0 && t.every((s) => this._evalGlobalFilter(e, s));
    },
    _splitGlobalFilterClauses(e) {
      if (!e || !e.trim()) return [];
      const t = e.trim(), s = [];
      let l = 0, i = 0, o = null;
      for (let a = 0; a < t.length; a++) {
        const r = t[a];
        if (o) {
          if (r === "\\") {
            a++;
            continue;
          }
          r === o && (o = null);
          continue;
        }
        if (r === '"' || r === "'" || r === "`") {
          o = r;
          continue;
        }
        if (r === "(" || r === "[" || r === "{") {
          l++;
          continue;
        }
        if (r === ")" || r === "]" || r === "}") {
          l--;
          continue;
        }
        l === 0 && (r === "&" || r === "|") && t[a + 1] === r && (s.push(t.slice(i, a).trim()), i = a + 2, a++);
      }
      return s.push(t.slice(i).trim()), s.filter(Boolean);
    },
    _rowFilterClauseIndex(e) {
      const t = this._effectiveGlobalFilterTexts();
      if (!t.length) return -1;
      const s = t.join(" ");
      if (!t.some((i) => this._isLegacyGlobalFilterExpression(i)))
        return this._parseSearchTerms(s).findIndex((i) => this._searchTermMatchesRow(i, e, null, this.globalFilterScope_ === "deep"));
      const l = t.flatMap((i) => this._splitGlobalFilterClauses(i));
      for (let i = 0; i < l.length; i++)
        if (this._evalGlobalFilter(e, l[i])) return i;
      return -1;
    },
    _activeColumnFilterKeys() {
      return this.columnFilters_ ? Object.entries(this.filters_).filter(([, e]) => e && e.trim()).map(([e]) => e) : [];
    },
    _clauseFieldsForRow(e, t) {
      if (!e || !t || typeof t != "object") return [];
      const l = e.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g, "").match(/[$A-Z_a-z][$0-9A-Z_a-z]*/g) || [], i = new Set(Object.keys(t)), o = [], a = /* @__PURE__ */ new Set();
      for (const r of l)
        r !== "row" && i.has(r) && !a.has(r) && (a.add(r), o.push(r));
      return o;
    },
    _rowFilterCellTints(e) {
      const t = this._effectiveGlobalFilterTexts();
      if (!t.length) return {};
      if (!t.some((i) => this._isLegacyGlobalFilterExpression(i))) {
        const i = this._parseSearchTerms(t.join(" ")), o = {};
        return Object.entries(e || {}).forEach(([a, r]) => {
          const n = i.findIndex((c) => this._termTargetsColumn(c, a) ? c.type === "columnCompare" ? this._columnComparisonMatches(c, e, a) : c.type === "hybridGroup" ? this._hybridGroupMatchesCell(c, r, e, a) : this._searchTermMatches(c, r) : !1);
          n >= 0 && (o[a] = n % 12);
        }), o;
      }
      const s = t.flatMap((i) => this._splitGlobalFilterClauses(i)), l = {};
      for (let i = 0; i < s.length; i++) {
        if (!this._evalGlobalFilter(e, s[i])) continue;
        const o = this._clauseFieldsForRow(s[i], e);
        for (const a of o)
          a in l || (l[a] = i % 12);
      }
      return l;
    },
    _highlightTerms(e, t, s = null, l = null) {
      var c, h;
      const i = this._escHtml, o = tt, a = String(e ?? ""), r = [];
      if (t.forEach((p, g) => {
        if (!this._termTargetsColumn(p, s)) return;
        if (p.type === "columnCompare") {
          this._columnComparisonMatches(p, l, s) && r.push(g);
          return;
        }
        if (p.type === "hybridGroup") {
          this._hybridGroupMatchesCell(p, e, l, s) && r.push(g);
          return;
        }
        const f = p.gRegex;
        f.lastIndex = 0;
        let y;
        for (; (y = f.exec(a)) !== null; ) {
          const S = y[0];
          if (S.length === 0) {
            f.lastIndex++;
            continue;
          }
          if (!(p.test && !p.test(S)) && !(p.caseSensitive && !p.regex.test(S))) {
            r.push(g);
            break;
          }
        }
      }), r.length === 0) return { [ne]: !0, comp: "span", options: { innerHTML: i(a) } };
      let n = i(a);
      for (let p = r.length - 1; p >= 0; p--) {
        const g = r[p], f = ((c = t[g]) == null ? void 0 : c.type) === "columnCompare" || ((h = t[g]) == null ? void 0 : h.type) === "hybridGroup", y = o[g % o.length], S = this._isColorDark(y), m = [
          `background:${y}`,
          `color:${S ? "#fff" : "#000"}`,
          `border-radius:${f ? "18px" : "3px"}`,
          "font-weight:700",
          "display:block",
          "width:100%",
          "min-width:0",
          "line-height:inherit",
          "box-sizing:border-box"
        ], j = this.searchColor_ ? m.join(";") + ";" : "";
        n = `<span class="${this.searchColor_ ? `wbdv-search-highlight wbdv-search-cell-layer wbdv-sc-${g % 12} pa-2` : "wbdv-search-highlight wbdv-search-cell-layer pa-2"}" style="${j}">${n}</span>`;
      }
      return { [ne]: !0, comp: "span", options: { innerHTML: n } };
    },
    _escHtml(e) {
      return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    },
    _filterCellWrap(e = []) {
      const t = this._configFor(e), s = t.display && t.display.filter;
      return s || "<~span,wbdv-filter-highlight>";
    },
    _buildTable(e, t, s, l = /* @__PURE__ */ new WeakSet(), i = null, o = "full") {
      var Ie, Be, ke, We, ze, Le, Ge, He, Ue, Je, qe, Ze, Qe, Ye, Xe;
      if (!Array.isArray(e) || e.length === 0)
        return { comp: "div", options: { class: "wbdv-table-empty", style: { padding: "16px", textAlign: "center", color: "#999", fontStyle: "italic" }, html: "(empty)" } };
      const a = this._processRows(e);
      let r = a.paged, n = a.sorted;
      this.extraItems_ && Array.isArray(this.extraItems_) && (r = [...r, ...this.extraItems_], n = [...n, ...this.extraItems_]);
      const c = [], h = /* @__PURE__ */ new Set();
      if (this.columns_ && Array.isArray(this.columns_)) {
        this.columns_.forEach((u) => {
          h.has(u) || (h.add(u), c.push(u));
        });
        for (const u of r)
          if (u && typeof u == "object")
            for (const _ of Object.keys(u))
              h.has(_) || (h.add(_), c.push(_));
      } else
        for (const u of r)
          if (u && typeof u == "object") {
            l.has(u) || l.add(u);
            for (const _ of Object.keys(u))
              h.has(_) || (h.add(_), c.push(_));
          }
      this.extraColumns_ && Array.isArray(this.extraColumns_) && this.extraColumns_.forEach((u) => {
        const _ = typeof u == "string" ? u : u && (u.key || u.label);
        _ && !h.has(_) && (h.add(_), c.push(_));
      }), this.selectable_ && c.unshift("__sel__");
      const g = this.rowDel_ || this.rowSave_, f = (u, _, w) => {
        if (w === "__sel__")
          return { comp: "VCheckbox", options: {
            props: { value: this.selItems_.includes(_), dense: !0, hideDetails: !0, class: "wbdv-row-checkbox" },
            style: { margin: "0", padding: "0" },
            on: { input: () => this._toggleRowSelection(_) }
          } };
        if (this.extraColumns_ && Array.isArray(this.extraColumns_)) {
          const b = this.extraColumns_.find((d) => (d.key || d.label) === w);
          b && b.value && typeof b.value == "function" && (u = b.value(r[_], _));
        }
        if (this.cellRender_ && typeof this.cellRender_ == "function") {
          const b = this.cellRender_(u, w, r[_], _);
          if (b != null) return b;
        }
        if (this.editable_) {
          if (u !== null && typeof u == "object") {
            const A = this.maxDepth_;
            if (A == null || A > 1) {
              const V = A == null ? null : A - 1, N = this._embeddedValueConfig(u), E = this._deepMerge(this._configFor([w]), N.config), R = E.childOutput != null ? Array.isArray(E.childOutput) ? E.childOutput : [E.childOutput] : Array.isArray(E.output) ? E.output : [E.output || "horiz"];
              return { comp: "WBDataViewer", options: {
                class: "wbdv-nested",
                props: {
                  value: N.value,
                  config: { ...E, output: R, editable: !0, showHeader: !1, boxed: !1 },
                  configByPath: this.configByPath_,
                  templates: this.templates_,
                  maxDepth: V,
                  isNestedTable: !0,
                  nestedScrollable: this.nestedScrollable_,
                  globalSearchScope: E.globalSearchScope || this.globalSearchScope_,
                  inheritedGlobalSearchText: this._globalSearchTextForChild(),
                  globalFilterScope: E.globalFilterScope || this.globalFilterScope_,
                  inheritedGlobalFilterText: this._globalFilterTextForChild(),
                  tbDive: this.tbDive_
                },
                style: {
                  width: this.nestedScrollable_ ? "100%" : "max-content",
                  maxWidth: this.nestedScrollable_ ? "100%" : "none",
                  fontSize: "11px",
                  margin: 0
                },
                on: { input: (q) => {
                  r[_][w] = this._restoreEmbeddedValueConfig(q, N.metadata), this.$emit("input", this._clone(e));
                } }
              } };
            }
          }
          const b = u === null ? "null" : u, d = this._rulesForField(w), x = typeof b == "object" ? JSON.stringify(b) : b, C = (A) => {
            const $ = A && typeof A == "object" && A.target && "value" in A.target ? A.target.value : A || "";
            r[_][w] = this._strToObj($), this.$emit("input", this._clone(e));
          };
          return { comp: "VTextField", options: {
            class: "wbdv-cell-field",
            props: {
              value: x,
              modelValue: x,
              dense: !0,
              outlined: !0,
              label: w,
              hideDetails: d.length ? "auto" : !0
            },
            rules: d,
            on: {
              input: C,
              "update:modelValue": C
            }
          } };
        }
        if (this.customValue_ && typeof this.customValue_ == "function" && (u = this.customValue_(u, w, _)), u == null) return { [ne]: !0, comp: "span", options: { class: "wbdv-tbl-null", style: { color: "#999", fontStyle: "italic" }, html: "-" } };
        if (typeof u != "object" || typeof u == "function") {
          const b = String(u), d = this.cGlobalSearchTerms, x = this.cParsedColumnSearches[w] || [], C = this.cParsedColumnFilters[w] || [], A = this.cParsedGlobalFilterTerms, $ = [...d, ...x, ...C, ...A];
          return $.length > 0 ? this._highlightTerms(b, $, w, r[_]) : b;
        }
        if (t === "select")
          return { comp: "VSelect", options: { props: { items: Array.isArray(u) ? u : Object.values(u).sort((d, x) => String(d).localeCompare(String(x))), dense: !0, hideDetails: !0, outlined: !0 }, class: "wbdv-tbl-select", style: { minWidth: "80px", fontSize: "12px" } } };
        if (l.has(u)) {
          const b = Array.isArray(u), d = b ? u.length : Object.keys(u).length;
          return { [ne]: !0, comp: "span", options: { class: "wbdv-tbl-null", style: { color: "#999", fontStyle: "italic" }, html: `[Circular] ${b ? "Array" : "Object"}(${d})` } };
        }
        l.add(u);
        const P = this._embeddedValueConfig(u), T = this._deepMerge(this._configFor([w]), P.config), v = T.childOutput != null ? Array.isArray(T.childOutput) ? T.childOutput : [T.childOutput] : Array.isArray(T.output) ? T.output : [T.output || "horiz"];
        return { comp: "WBDataViewer", options: {
          class: "wbdv-nested",
          props: {
            value: P.value,
            config: { ...T, output: v, showHeader: !1, boxed: !1 },
            configByPath: this.configByPath_,
            templates: this.templates_,
            theme: this.theme_,
            isNestedTable: !0,
            nestedScrollable: this.nestedScrollable_,
            globalSearchScope: T.globalSearchScope || this.globalSearchScope_,
            inheritedGlobalSearchText: this._globalSearchTextForChild(),
            globalFilterScope: T.globalFilterScope || this.globalFilterScope_,
            inheritedGlobalFilterText: this._globalFilterTextForChild(),
            tbDive: this.tbDive_
          },
          style: {
            width: this.nestedScrollable_ ? "100%" : "max-content",
            maxWidth: this.nestedScrollable_ ? "100%" : "none",
            fontSize: "11px",
            margin: 0
          },
          on: { input: (b) => {
            r[_][w] = this._restoreEmbeddedValueConfig(b, P.metadata), this.$emit("input", this._clone(e));
          } }
        } };
      }, y = (u) => {
        if (!g) return [];
        const _ = [];
        return this.rowSave_ && _.push(this._btn({ icon: !0, small: !0, title: `Save row ${u}`, onClick: () => this._saveRow(e, u), children: [this._icon("mdi-content-save-check")] })), this.rowDel_ && _.push(this._btn({ icon: !0, small: !0, title: `Delete row ${u}`, onClick: () => this._deleteRow(e, u), children: [this._icon("mdi-delete")] })), _;
      }, S = ((Be = (Ie = this.templates_) == null ? void 0 : Ie.display) == null ? void 0 : Be.table) || { 0: "level0", 1: "level1", 2: "level2" }, m = ((We = (ke = this.templates_) == null ? void 0 : ke.display) == null ? void 0 : We.thead) || { 0: "level0", 1: "level1" }, j = ((Le = (ze = this.templates_) == null ? void 0 : ze.display) == null ? void 0 : Le.tbody) || { 0: "level0", 1: "level1" }, O = ((He = (Ge = this.templates_) == null ? void 0 : Ge.display) == null ? void 0 : He.th_tr) || { 0: "level0", 1: "level1" }, F = ((Je = (Ue = this.templates_) == null ? void 0 : Ue.display) == null ? void 0 : Je.tbody_tr) || { 0: "level0", 1: "level1" }, I = ((Ze = (qe = this.templates_) == null ? void 0 : qe.display) == null ? void 0 : Ze.th) || { 0: "level0", 1: "level1" }, D = ((Ye = (Qe = this.templates_) == null ? void 0 : Qe.display) == null ? void 0 : Ye.td) || { 0: "level0", 1: "level1" }, k = (u) => ({ comp: I, level0: "<~th>", level1: u }), W = (u) => ({ comp: D, level0: "<~td>", level1: u }), ee = (u, _) => ({ comp: D, level0: `<~td,${_}>`, level1: u }), M = (u) => ({ comp: O, level0: "<~tr>", level1: u }), B = (u) => ({ comp: F, level0: "<~tr>", level1: u }), ce = (u, _) => ({ comp: F, level0: `<~tr,${_}>`, level1: u });
      let te, he, re = null;
      if (t === "vertical") {
        const u = this.hasPagination ? (this.page_ - 1) * this.itemsPerPage_ : 0, _ = { col_0: k("") };
        r.forEach((T, v) => {
          const b = this.columnFilters_ ? this._columnFilterInput(c[0]) : null, d = this._resolveRowLabel(T, u + v), x = b ? { comp: "div", options: { class: "wbdv-th-wrap", style: { display: "flex", flexDirection: "column", gap: "2px" }, html: [
            { comp: "span", options: { class: "wbdv-th-label", html: d } },
            b
          ] } } : d;
          _[`col_${v + 1}`] = k(x);
        }), g && (_.zzz_action = { comp: "th", options: { class: "wbdv-tbl-actions", style: { whiteSpace: "nowrap", width: "1%", textAlign: "center", padding: "2px 4px" }, html: "⚙️" } }), te = {
          comp: m,
          level0: "<~thead>",
          level1: M(_)
        };
        const w = {}, P = {};
        c.forEach((T, v) => {
          const b = this._sortIcon(T), d = b ? [T, b] : T, x = this.columnSearch_ ? this._columnSearchInput(T) : null, A = k(x ? { comp: "div", options: { class: "wbdv-th-wrap", style: { display: "flex", flexDirection: "column", gap: "2px" }, html: [
            { comp: "span", options: { class: "wbdv-th-label", html: d } },
            x
          ] } } : d), $ = { col_0: A };
          r.forEach((V, N) => {
            $[`col_${N + 1}`] = W(f(V == null ? void 0 : V[T], N, T));
          }), g && y(0).forEach((V, N) => {
            $[`zzz_action_${N}`] = { comp: "td", options: { class: "wbdv-tbl-actions", style: { whiteSpace: "nowrap", width: "1%", textAlign: "center", padding: "2px 4px" }, html: V } };
          }), w[`default_${v}`] = B($), P[`default_${v}`] = B({ col_0: A });
        }), he = w, re = P;
      } else {
        const u = {};
        c.forEach((v, b) => {
          if (v === "__sel__") {
            u[`col_${b}`] = { comp: "th", options: {
              class: "wbdv-tbl-select-header",
              style: { width: "40px", textAlign: "center" },
              html: { comp: "VCheckbox", options: {
                props: { value: this.selItems_.length > 0, dense: !0, hideDetails: !0 },
                style: { margin: "0", padding: "0" },
                on: { input: () => {
                  this.selItems_.length > 0 ? this._clearSelection() : this._selectAllRows();
                } }
              } }
            } };
            return;
          }
          const d = this.headRender_ && typeof this.headRender_ == "function" ? this.headRender_(v, b) : null, x = this.columnFilters_ ? this._columnFilterInput(v) : null, A = [this.columnSearch_ ? this._columnSearchInput(v) : null, x].filter(Boolean), $ = d || (A.length ? { comp: "div", options: { class: "wbdv-th-wrap", style: { display: "flex", flexDirection: "column", gap: "2px" }, html: [
            { comp: "span", options: { class: "wbdv-th-label", style: { display: "flex", alignItems: "center", gap: "2px" }, html: [v, this._sortIcon(v)] } },
            ...A
          ] } } : (() => {
            const G = this._sortIcon(v);
            return G ? { comp: "span", options: { html: [v, G] } } : v;
          })()), V = r.some(
            (G) => this._valueMatchesGlobalSearch(G == null ? void 0 : G[v], v, G) || this._cellMatchesColumnSearch(G == null ? void 0 : G[v], v)
          ), N = this.filters_[v], R = this.columnFilters_ && N && N.trim() ? this._activeColumnFilterKeys().indexOf(v) % 12 : -1, J = [];
          V && J.push("wbdv-col-search-match"), R >= 0 && J.push(`wbdv-col-filter-match wbdv-cf-${R}`);
          const q = b === c.length - 1, oe = {};
          u[`col_${b}`] = J.length ? { comp: I, level0: `<~th,${J.join(" ")}>`, level1: $, options: { style: oe } } : q && Object.keys(oe).length ? { comp: I, level0: "<~th>", level1: $, options: { style: oe } } : k($);
        }), g && (u.zzz_action = { comp: "th", options: { class: "wbdv-tbl-actions", style: { whiteSpace: "nowrap", width: "1%", textAlign: "center", padding: "2px 4px" }, html: "⚙️" } }), te = {
          comp: m,
          level0: "<~thead>",
          level1: M(u)
        };
        const _ = {};
        (this.cGlobalSearchTerms.length || this._activeColumnSearchKeys().length) && c.forEach((v) => {
          _[v] = r.some(
            (b) => this._valueMatchesGlobalSearch(b == null ? void 0 : b[v], v, b) || this._cellMatchesColumnSearch(b == null ? void 0 : b[v], v)
          );
        });
        const w = this._activeColumnFilterKeys(), P = {};
        w.forEach((v, b) => {
          P[v] = b % 12;
        });
        const T = {};
        r.forEach((v, b) => {
          const d = {}, x = this._rowFilterCellTints(v);
          c.forEach(($, V) => {
            const N = f(v == null ? void 0 : v[$], b, $), E = [];
            _[$] && E.push("wbdv-col-search-match"), $ in P && E.push(`wbdv-col-filter-match wbdv-cf-${P[$]}`), $ in x && E.push(`wbdv-cell-filter-match wbdv-rf-${x[$]}`), d[`col_${V}`] = E.length ? ee(N, E.join(" ")) : W(N);
          }), y(b).forEach(($, V) => {
            d[`zzz_action_${V}`] = { comp: "td", options: { class: "wbdv-tbl-actions", style: { whiteSpace: "nowrap", width: "1%", textAlign: "center", padding: "2px 4px" }, html: $ } };
          });
          const C = [];
          (v && typeof v == "object" && this._rowMatchesGlobalSearch(v) || Object.entries(v || {}).some(([$, V]) => this._cellMatchesColumnSearch(V, $))) && C.push("wbdv-row-search-match");
          const A = this._rowFilterClauseIndex(v);
          A >= 0 && C.push(`wbdv-row-filter-match wbdv-rf-${A % 12}`), T[`default_${b}`] = C.length ? ce(d, C.join(" ")) : B(d);
        }), he = T;
      }
      if (this.rowAdd_) {
        const u = this.addRowVisible[s], _ = [];
        _.push(this._btn({
          small: !0,
          outlined: !0,
          class: "wbdv-add-btn",
          onClick: () => this._toggleAddRow(s),
          children: u ? [this._icon("mdi-close"), { comp: "span", options: { style: { marginLeft: "4px" }, html: "Cancel" } }] : [this._icon("mdi-plus"), { comp: "span", options: { style: { marginLeft: "4px" }, html: "Add Row" } }]
        })), u && _.push({ comp: "VTextField", options: {
          ref: `add-input-${s}`,
          props: { value: this.addRowText && this.addRowText[s] || "", label: '{"key":"value"}', autofocus: !0, dense: !0, hideDetails: !0, outlined: !0, class: "wbdv-cell-field" },
          on: {
            input: (w) => {
              this.addRowText || (this.addRowText = {}), this.addRowText[s] = w;
            },
            keyup: (w) => {
              w.key === "Enter" && this._submitAddRow(e, s);
            }
          }
        } }, { comp: "VBtn", options: { props: { small: !0, color: "primary" }, on: { click: () => this._submitAddRow(e, s) }, html: "Parse & Add" } }), he.zzz_addRow = { 0: "<~tr>", 1: { comp: "td", options: { attrs: { colspan: c.length + (g ? 1 : 0) }, style: { padding: "8px" }, html: _ } } };
      }
      const ue = {
        comp: j,
        level0: "<~tbody>",
        level1: he
      }, ge = (u, _ = 0, w = /* @__PURE__ */ new WeakSet()) => {
        if (u == null) return 4;
        if (typeof u != "object" || typeof u == "function")
          return Math.max(4, Math.min(60, String(u).length + 2));
        if (w.has(u)) return 18;
        w.add(u);
        const P = Object.keys(u), T = P.reduce((x, C) => Math.max(x, String(C).length), 0);
        if (_ >= 2) return Math.min(96, 28 + T + Math.min(P.length, 12) * 3);
        const v = P.slice(0, 12).map((x) => ge(u[x], _ + 1, w)), b = v.reduce((x, C) => Math.max(x, C), 0), d = v.reduce((x, C) => x + C, 0);
        return Math.min(
          140,
          28 + T * 0.8 + Math.min(P.length, 12) * 3 + b * 0.4 + d * 0.12
        );
      }, be = (u, { min: _ = 88, max: w = 420 } = {}) => Math.round(Math.max(_, Math.min(w, 52 + u * 6.5))), se = (u, { min: _ = 44, max: w = 420 } = {}) => {
        const P = u == null ? "-" : String(u);
        return Math.round(Math.max(_, Math.min(w, 30 + P.length * 6.8)));
      }, pe = 720, Pe = (u) => {
        const _ = /* @__PURE__ */ new WeakSet(), w = (T) => T == null || typeof T != "object" || typeof T == "function" ? se(T) : Math.min(pe, P(T) + 28), P = (T) => {
          if (_.has(T)) return 120;
          _.add(T);
          const v = Array.isArray(T) ? T.some((C) => C && typeof C == "object") ? T : T.map((C, A) => ({ [A]: C })) : [T], b = [], d = /* @__PURE__ */ new Set();
          v.slice(0, 160).forEach((C) => {
            !C || typeof C != "object" || Object.keys(C).forEach((A) => {
              d.has(A) || (d.add(A), b.push(A));
            });
          });
          const x = b.reduce((C, A) => {
            const $ = se(A, { min: 44, max: 260 }), V = v.slice(0, 160).reduce((N, E) => Math.max(N, w(E == null ? void 0 : E[A])), 0);
            return C + Math.max($, V);
          }, 0);
          return _.delete(T), Math.max(160, x);
        };
        return P(u);
      }, nt = n.slice(0, 160), U = [], le = [], de = (u) => u !== null && typeof u == "object";
      if (t === "vertical") {
        const u = c.reduce((w, P) => Math.max(w, String(P).length), 0), _ = this.nestedScrollable_ ? se("x".repeat(u), { min: 64, max: 260 }) : be(u + 3, { min: 112, max: 260 });
        U.push(_), le.push(!1), r.forEach((w) => {
          const P = c.map((x) => w == null ? void 0 : w[x]), T = P.reduce((x, C) => Math.max(x, ge(C)), 0), v = c.some((x) => de(w == null ? void 0 : w[x])), b = be(T, { min: 140, max: v ? 760 : 460 }), d = this.nestedScrollable_ ? P.reduce((x, C) => Math.max(
            x,
            de(C) ? Math.min(pe, Pe(C) + 28) : se(C)
          ), 0) : b;
          U.push(d), le.push(v);
        });
      } else
        c.forEach((u) => {
          if (u === "__sel__") {
            U.push(44), le.push(!1);
            return;
          }
          const _ = String(u).length + 3, w = nt.reduce((b, d) => Math.max(b, ge(d == null ? void 0 : d[u])), 0), P = n.some((b) => de(b == null ? void 0 : b[u])), T = be(Math.max(_, w), {
            min: 88,
            max: P ? 720 : 420
          }), v = this.nestedScrollable_ ? n.reduce((b, d) => {
            const x = d == null ? void 0 : d[u], C = de(x) ? Math.min(pe, Pe(x) + 28) : se(x);
            return Math.max(b, C);
          }, se(u, { min: 44, max: 260 })) : T;
          U.push(v), le.push(P);
        });
      g && (U.push(72), le.push(!1));
      const ye = 44, Ee = 420, Oe = le.map((u, _) => u ? Ee : Math.max(
        ye,
        Math.min(Ee, Math.round(U[_] || ye))
      )), Ve = this.nestedScrollable_ ? Math.max(
        ye,
        Oe.reduce((u, _) => u + _, 0)
      ) : Math.max(
        this.isNestedTable ? 420 : 320,
        U.reduce((u, _) => u + _, 0)
      ), at = t === "vertical" ? c.length : r.length, Q = !this.isNestedTable, Ne = Q || this.nestedScrollable_, ie = !this.nestedScrollable_, Se = !Q && this.nestedScrollable_, De = Ne && (Ve > 960 || at > 20 || U.length > 8), ve = {
        width: ie ? "max-content" : "100%",
        minWidth: ie ? Q ? "100%" : "max-content" : `${Ve}px`,
        maxWidth: "none",
        tableLayout: ie ? "auto" : "fixed",
        overflow: "visible"
      }, xe = {
        width: Se || Q ? "100%" : "max-content",
        maxWidth: Se ? `${pe}px` : Q ? "100%" : "none",
        overflow: Ne ? "auto" : "visible",
        ...Se || De ? { maxHeight: "min(70vh, 720px)" } : {}
      }, we = [
        "wbdv-table-wrap",
        {
          "wbdv-table-wrap--root": Q,
          "wbdv-table-wrap--nested": !Q,
          "wbdv-table-wrap--scrollable": De,
          "wbdv-table-wrap--intrinsic": ie,
          "wbdv-table-wrap--vertical": t === "vertical"
        }
      ], ct = U.map((u, _) => ie ? "auto" : `${Oe[_]}px`), Ce = [
        "wbdv-table",
        { "wbdv-table--intrinsic": ie }
      ], Me = (Xe = this.templates_) == null ? void 0 : Xe.display, ht = !Me || Object.keys(Me).length === 0, Re = (u) => !u || typeof u != "object" ? [] : Object.keys(u).sort((_, w) => _.localeCompare(w, void 0, { numeric: !0 })).map((_) => u[_]), Te = (u, _) => {
        if (typeof u != "string") return { tag: _, className: "" };
        const w = u.match(/^<~?([^,>]+)(?:,([^>]*))?>$/);
        return w ? { tag: w[1] || _, className: (w[2] || "").trim() } : { tag: _, className: "" };
      }, fe = (u) => (_) => {
        const w = Y("WBC"), P = (d, x) => d == null ? null : typeof d == "string" || typeof d == "number" || typeof d == "boolean" ? String(d) : Array.isArray(d) ? d.map((C, A) => P(C, `${x}-${A}`)).flat().filter((C) => C != null) : _(w, { key: x, item: d }), T = (d, x) => {
          const C = typeof (d == null ? void 0 : d.comp) == "string" && (d.comp === "th" || d.comp === "td"), A = C ? `<${d.comp}>` : (d == null ? void 0 : d.level0) || (d == null ? void 0 : d[0]), { tag: $, className: V } = Te(A, "td"), N = (d == null ? void 0 : d.options) || {}, E = C ? N.html : (d == null ? void 0 : d.level1) ?? (d == null ? void 0 : d[1]), R = E != null && E[ne] ? E.options || {} : null, J = {
            ...N.attrs || {},
            key: x,
            class: [V, N.class, R == null ? void 0 : R.class],
            style: [N.style, R == null ? void 0 : R.style]
          };
          if ((R == null ? void 0 : R.innerHTML) !== void 0)
            return J.innerHTML = R.innerHTML, _($, J);
          const q = P(
            R ? R.html : E,
            `${x}-content`
          ), oe = q == null ? [] : Array.isArray(q) ? q : [q];
          return _($, J, oe);
        }, v = (d, x) => {
          const C = (d == null ? void 0 : d.level0) || (d == null ? void 0 : d[0]), { tag: A, className: $ } = Te(C, "tr"), V = (d == null ? void 0 : d.options) || {}, N = (d == null ? void 0 : d.level1) ?? (d == null ? void 0 : d[1]);
          return _(A, {
            ...V.attrs || {},
            key: x,
            class: [$, V.class],
            style: V.style
          }, Re(N).map((E, R) => T(E, `${x}-cell-${R}`)));
        }, b = (d, x) => {
          const { tag: C, className: A } = Te((d == null ? void 0 : d.level0) || (d == null ? void 0 : d[0]), "tbody"), $ = (d == null ? void 0 : d.options) || {}, V = (d == null ? void 0 : d.level1) ?? (d == null ? void 0 : d[1]), N = C === "thead" ? [V] : Re(V);
          return _(C, {
            ...$.attrs || {},
            key: x,
            class: [A, $.class],
            style: $.style
          }, N.filter(Boolean).map((E, R) => v(E, `${x}-row-${R}`)));
        };
        return _("div", {
          class: we,
          style: xe
        }, [
          _("table", { class: Ce, style: ve }, [
            _("colgroup", {}, ct.map((d, x) => _("col", { key: `column-${x}`, style: { width: d } }))),
            ...u.map((d, x) => b(d, `section-${x}`))
          ])
        ]);
      };
      if (ht)
        return o === "vCol" ? re ? fe([{ level0: "<~tbody>", level1: re }]) : { comp: "div", options: { class: "wbdv-slice-na", style: { padding: "8px", color: "#999", fontStyle: "italic" }, html: "(vCol is only available in vertical layout)" } } : fe(o === "head" ? [te] : o === "body" ? [ue] : [te, ue]);
      const je = (u) => ({
        options: { class: we, style: xe },
        table: {
          comp: S,
          level0: "<~table,wbdv-table>",
          level1: u,
          options: { class: Ce, style: ve }
        }
      });
      return o === "vCol" ? re ? je({ comp: j, level0: "<~tbody>", level1: re }) : { comp: "div", options: { class: "wbdv-slice-na", style: { padding: "8px", color: "#999", fontStyle: "italic" }, html: "(vCol is only available in vertical layout)" } } : o === "head" ? je(te) : o === "body" ? je(ue) : {
        comp: S,
        level0: "<~table,wbdv-table>",
        level1: te,
        level2: ue,
        options: {
          class: Ce,
          style: ve,
          wrap: {
            comp: "div",
            options: {
              class: we,
              style: xe
            }
          }
        }
      };
    },
    bodyTableHorizontal(e) {
      const t = e !== void 0 ? e : this.activeValue, s = this._normalizeToRows(t);
      return this._buildTable(s, "horizontal", "tbl-h");
    },
    bodyTableVertical(e) {
      const t = e !== void 0 ? e : this.activeValue, s = this._normalizeToRows(t);
      return this._buildTable(s, "vertical", "tbl-v");
    },
    bodyTableVCol(e) {
      const t = e !== void 0 ? e : this.activeValue, s = this._normalizeToRows(t);
      return this._buildTable(s, "vertical", "tbl-v", /* @__PURE__ */ new WeakSet(), null, "vCol");
    },
    bodyTableHHead(e) {
      const t = e !== void 0 ? e : this.activeValue, s = this._normalizeToRows(t);
      return this._buildTable(s, "horizontal", "tbl-h", /* @__PURE__ */ new WeakSet(), null, "head");
    },
    bodyTableHBody(e) {
      const t = e !== void 0 ? e : this.activeValue, s = this._normalizeToRows(t);
      return this._buildTable(s, "horizontal", "tbl-h", /* @__PURE__ */ new WeakSet(), null, "body");
    },
    bodyTableVHead(e) {
      const t = e !== void 0 ? e : this.activeValue, s = this._normalizeToRows(t);
      return this._buildTable(s, "vertical", "tbl-v", /* @__PURE__ */ new WeakSet(), null, "head");
    },
    bodyTableVBody(e) {
      const t = e !== void 0 ? e : this.activeValue, s = this._normalizeToRows(t);
      return this._buildTable(s, "vertical", "tbl-v", /* @__PURE__ */ new WeakSet(), null, "body");
    },
    bodyTableSelect(e) {
      var l;
      const t = e !== void 0 ? e : this.activeValue;
      return t == null ? this.bodyPrimitiveNode(t) : typeof t != "object" || typeof t == "function" ? this.bodyPrimitiveNode(t) : { comp: "VSelect", options: { props: { items: Array.isArray(t) ? t : Object.values(t).sort((i, o) => String(i).localeCompare(String(o))), dense: !1, hideDetails: !1, outlined: !0, label: this.typeLabel }, class: "wbdv-body-select", style: { maxWidth: "400px", margin: "8px", fontSize: "13px" } }, ...((l = this.templates_) == null ? void 0 : l.select) || {} };
    },
    renderDefaultWbcode(e, t, s) {
      const l = e || H, i = s ? { ...s } : {};
      let o = t;
      if (t && typeof t == "object")
        try {
          o = JSON.stringify(t, null, 2);
        } catch {
          o = String(t);
        }
      return i.code = o, l(Y("WBC"), { item: { comp: "WBCode", options: { props: { item: i } } } });
    }
  },
  render() {
    if (this.srcLoading_)
      return H("div", { ref: "referenceTable", class: "wbdv-src-loading pa-4 text-center grey--text" }, [
        H(Y("VProgressCircular"), { indeterminate: !0, size: 24, width: 2, color: "primary" }),
        H("span", { style: { marginLeft: "8px" } }, ["Loading..."])
      ]);
    if (this.srcError_)
      return H("div", { ref: "referenceTable", class: "wbdv-src-error pa-4 text-error" }, [
        H(Y("VIcon"), { color: "red", small: !0 }, { default: () => ["mdi-alert-circle"] }),
        H("span", { style: { marginLeft: "4px" } }, [`src error: ${this.srcError_}`])
      ]);
    const e = `wbdv-theme-${this.theme_ || "default"}`, t = this.boxed_ ? "wbdv--boxed" : "", s = this.isNestedTable && !this.nestedScrollable_ ? "wbdv-root--intrinsic" : "";
    this.isDark_;
    const l = this.output_ || ["horiz"], i = this.allComps, o = { options: i.options };
    for (const r of Ae(l, i)) o[r] = i[r];
    const a = Array.isArray(this.projectSequence_) ? this._renderProjectSequence(H) : H(Y("WBC"), { item: { comp: l, ...o } });
    return H("div", { ref: "referenceTable", class: `wbdv-root ${e} ${t} ${s}` }, [a]);
  }
}, gt = ["default", "light", "dark", "paper", "compact", "zebra", "terminal"], ot = /* @__PURE__ */ new Set();
function bt(e, t) {
  if (typeof document > "u" || !e || !t) return;
  ot.add(e);
  const s = `style[data-wbdv-theme="${e}"]`;
  if (document.head.querySelector(s)) return;
  const l = document.createElement("style");
  l.setAttribute("data-wbdv-theme", e), l.textContent = t, document.head.appendChild(l);
}
function yt() {
  const e = new Set(gt);
  return ot.forEach((t) => e.add(t)), Array.from(e);
}
const lt = /* @__PURE__ */ new WeakSet(), St = function(e, t = {}) {
  if (!e || lt.has(e)) return;
  lt.add(e), e.component("WBDataViewer", _t);
  const s = t && t.themes;
  s && typeof s == "object" && Object.keys(s).forEach((l) => {
    const i = s[l];
    typeof i == "string" && bt(l, i);
  });
}, Ct = { install: St };
export {
  gt as BUILT_IN_THEMES,
  _t as WBDataViewer,
  Ct as default,
  bt as injectThemeCss,
  St as install,
  yt as listThemes
};
