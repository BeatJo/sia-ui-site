import{j as t,r as c}from"./iframe-DQyRSC8n.js";import{S as n}from"./index-DGilTRrq.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const f={title:"Saisie/Switch",component:n,tags:["autodocs"],args:{label:"Compte actif",defaultChecked:!0,disabled:!1},parameters:{layout:"padded"}},a={},s={args:{disabled:!0}},e={args:{label:void 0,"aria-label":"Notifications par courriel"}};function l(){const[o,i]=c.useState(!1);return t.jsxs("div",{style:{display:"grid",gap:".75rem"},children:[t.jsx(n,{label:"Relances automatiques",checked:o,onCheckedChange:i}),t.jsx("code",{children:o?"activées":"désactivées"})]})}const r={render:()=>t.jsx(l,{})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: undefined,
    "aria-label": "Notifications par courriel"
  }
}`,...e.parameters?.docs?.source},description:{story:"Sans libellé, il faut un nom : sinon l'interrupteur n'annonce rien.",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledDemo />
}`,...r.parameters?.docs?.source},description:{story:"Un interrupteur décrit un réglage qui persiste.\n\nPour un état de l'interface ici et maintenant — gras, filtre actif, colonne\naffichée — c'est `Toggle` qu'il faut, avec son `aria-pressed`.",...r.parameters?.docs?.description}}};const g=["Playground","Disabled","SansLibelle","Controlled"];export{r as Controlled,s as Disabled,a as Playground,e as SansLibelle,g as __namedExportsOrder,f as default};
