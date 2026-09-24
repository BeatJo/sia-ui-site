import{j as n,r as v}from"./iframe-DQyRSC8n.js";import{S as i}from"./index-B2lcHbKZ.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-BzRy_9hL.js";import"./index-542shROb.js";import"./index-D7Pt3lB-.js";import"./geometry-Dzgyg8gY.js";import"./index-Ce4u6n81.js";import"./config-BUwt5-xE.js";import"./index-C4BQ8rIf.js";const l=[{value:"active",label:"Actif",description:"Le compte peut utiliser le service.",keywords:["enabled"]},{value:"pending",label:"En attente",description:"Une validation est encore nécessaire."},{value:"disabled",label:"Désactivé",description:"Le compte ne peut plus se connecter."},{value:"archived",label:"Archivé",disabled:!0}],P={title:"Saisie/Select",component:i,tags:["autodocs"],args:{options:l,placeholder:"Choisir un statut",searchable:!0},parameters:{layout:"padded"}},e={},r={args:{searchable:!1}},a={args:{defaultValue:"active",clearable:!0}},t={args:{invalid:!0}};function S(){const[u,d]=v.useState(""),p=async(m,b)=>{await new Promise((o,g)=>{const h=window.setTimeout(o,600);b?.addEventListener("abort",()=>{window.clearTimeout(h),g(new DOMException("Aborted","AbortError"))})});const c=m.trim().toLocaleLowerCase();return l.filter(o=>!c||String(o.label).toLocaleLowerCase().includes(c))};return n.jsx(i,{value:u,onValueChange:d,fetcher:p,placeholder:"Rechercher un statut distant",clearable:!0})}const s={render:()=>n.jsx(S,{})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    searchable: false
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "active",
    clearable: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    invalid: true
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <AsyncSelectDemo />
}`,...s.parameters?.docs?.source}}};const F=["Playground","WithoutSearch","Clearable","Invalid","AsyncFetch"];export{s as AsyncFetch,a as Clearable,t as Invalid,e as Playground,r as WithoutSearch,F as __namedExportsOrder,P as default};
