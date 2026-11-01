# @wbc-ui/dataviewer

Vue 3 data-table and JSON tree viewer for the WBC-UI ecosystem. Renders an API
response (passed via `value` or fetched via `src`) as a searchable, sortable,
paginated, themeable table, with an inline collapsible JSON tree view.

Vue 3 port of `@wbc-ui2/dataviewer`.

## Install

```bash
npm install @wbc-ui/dataviewer
```

Peers: `vue@^3.5`, `@wbc-ui/core`. Optional peer: `@wbc-ui/code` (only for embedded
code demos).

## Usage

```js
import { createApp } from 'vue';
import WBCUI3Core from '@wbc-ui/core';
import WBCUI3DataViewer from '@wbc-ui/dataviewer';
import '@wbc-ui/dataviewer/style.css';

createApp(App)
  .use(WBCUI3Core)
  .use(WBCUI3DataViewer)
  .mount('#app');
```

```html
<!-- from a passed object -->
<WBDataViewer :value="apiObject" />

<!-- fetched from a URL, projected to a sub-shape -->
<WBDataViewer src="https://api.example.com/teacher/1"
              :project="{ students: { name: 'name', age: 'age' } }" />
```

### Named exports

`install`, `WBDataViewer`, `injectThemeCss`, `listThemes`, `BUILT_IN_THEMES`.

## Documentation

This published README is the package's documentation source of truth. The
package-level `docs/` directory intentionally remains empty to avoid maintaining
a duplicate guide; cross-package architecture decisions live in `_meta/`. The
published guide, live demos, cases, and Interactive Lab are available at
[dataviewer.wbc-ui.com](https://dataviewer.wbc-ui.com).

Production adopters should also review the
[production-readiness guide](https://dataviewer.wbc-ui.com/guide/production),
[compatibility policy](https://dataviewer.wbc-ui.com/guide/production/compatibility),
and [migration notes](https://dataviewer.wbc-ui.com/guide/production/migration-deprecations).

## Key props

| Prop | Type | Notes |
|---|---|---|
| `value` | any | Data to render (object/array). A root or nested object may carry recognized `_prop_` metadata such as `_output_`, `_editable_`, or `_globalSearch_`; these configure that table and are omitted from its rendered fields. Unknown wrapped keys remain data. |
| `tbDive` | Boolean \| String | Opt-in reactive descriptor mode. Functions inside props receive the viewer context (`itemAccessebility`). |
| `src` | String | URL to fetch; result cached (`apiResponse_`) — non-query prop changes do not re-fetch. |
| `project` | String \| Object \| Array | Projection spec. Strings support deep paths and indexes. Object metadata includes `_path_`, `_as_`, `_parent_`, grouped `_config_`, recognized individual `_prop_` shorthands such as `_editable_`/`_output_`, and `_sync_`. Project shorthands override `_config_`; recognized metadata inside the extracted value overrides both. Unknown underscore names remain projectable data fields. Successful matches render as separate WBDataViewer blocks, while unresolved items render through WBC. |
| `projectMode` | String \| Number | Controls repeated object-projection matches: `first` (default), `all`, `merge`, or a zero-based occurrence index. |
| `theme` | String | One of `listThemes()` (built-ins: default, light, dark, paper, compact, zebra, terminal). |
| `editable`, `sort`, `pagination`, `globalSearch`, `columnFilters` | — | Table features. |

### Reactive props with `tbDive`

`tbDive` mirrors the Vue 2 WBTable contract using the Vue 3 `generalVal`
resolver from `@wbc-ui/core`:

```vue
<WBDataViewer
  tb-dive
  :depth="4"
  :value="{
    title: (ctx) => `Depth: ${ctx.data_.depth_}`,
    user: (ctx) => ctx.user_,
  }"
  :custom-value="(ctx, value, key) => `${key}: ${value}`"
/>
```

A one-argument function `(ctx) => value` is resolved immediately. A
multi-argument function `(ctx, ...args) => value` is returned with `ctx` bound,
leaving the remaining arguments for the normal callback site. The compatibility
context is exposed as `itemAccessebility`; `itemAccessibility` is an equivalent
correctly-spelled alias. The context includes `data_`, `props_`, `ref_`, `set_`,
`get_`, `update_`, language/store/router helpers, `vm_`, and the legacy utility
facades.

## 🛡️ B1 non-regression guard

A test in `src/tests/B1_guard.test.js` walks every source file and fails on any **bare `h('Capitalized')` call** — the Vue 3 inert-element trap:

```javascript
h('VProgressCircular', { ... })       // emit <vprogresscircular>, component never mounts — BUG
h(resolveDynamicComponent('VProgressCircular'), { ... })  // correct
h('WBC', { ... })                     // emit <wbc>, component never mounts — BUG
h(resolveDynamicComponent('WBC'), { ... })                 // correct
```

The guard runs as part of `npm test` (vitest). The allow-list is EMPTY — all 7 wb-dataviewer B1 sites were live defects (4 Vuetify + 3 WBC), now fixed with `resolveDynamicComponent`. Any new bare `h('Capitalized')` call in this package is a regression. If a future change needs one, **add an entry to `ALLOW_LIST` in the test file with the reason inline** — an unexplained exemption is how wb-dataviewer shipped with 7 broken sites for the entire life of the package.

## Build

```bash
npm run build   # → dist/index.js (ESM), dist/index.cjs (CJS), dist/index.css
npm test        # vitest
```
