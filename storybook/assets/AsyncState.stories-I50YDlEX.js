import{j as e}from"./iframe-DQyRSC8n.js";import{A as l}from"./index-Dm4TsGqN.js";import{B as y}from"./index-u74Kvn0L.js";import{E as g}from"./index-CdHHDji3.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./config-BUwt5-xE.js";import"./index-C4BQ8rIf.js";import"./index-Ce4u6n81.js";import"./index-DUXvzsQk.js";import"./geometry-Dzgyg8gY.js";import"./index-542shROb.js";import"./index-D7Pt3lB-.js";function i({loading:p,error:a,empty:c,emptyTitle:d="No data",emptyDescription:m,onRetry:o,children:u}){return p?e.jsxs("div",{className:"sia-async-state",role:"status",children:[e.jsx("span",{className:"sia-spinner"}),e.jsx("span",{children:"Loading..."})]}):a?e.jsx(l,{tone:"danger",title:"Unable to load data",action:o&&e.jsx(y,{variant:"outline",onClick:o,children:"Retry"}),children:a}):c?e.jsx(g,{compact:!0,title:d,description:m}):e.jsx(e.Fragment,{children:u})}i.__docgenInfo={description:`Les trois états d'un chargement, au même endroit.

En attente, en erreur, ou vide : ce sont les mêmes trois cas à chaque
écran, et les écrire à la main en oublie toujours un — le plus souvent le
vide, qui ressemble à un chargement qui n'en finit pas.`,methods:[],displayName:"AsyncState",props:{loading:{required:!1,tsType:{name:"boolean"},description:""},error:{required:!1,tsType:{name:"ReactNode"},description:""},empty:{required:!1,tsType:{name:"boolean"},description:""},emptyTitle:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:'"No data"',computed:!1}},emptyDescription:{required:!1,tsType:{name:"ReactNode"},description:""},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const b={title:"Patterns/AsyncState",component:i,tags:["autodocs"],args:{children:e.jsx("div",{children:"Contenu chargé"})}},r={},t={args:{loading:!0}},n={args:{empty:!0,emptyTitle:"Aucune donnée",emptyDescription:"Les prochaines entrées apparaîtront ici."}},s={args:{error:"Le serveur ne répond pas.",onRetry:()=>{}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    empty: true,
    emptyTitle: "Aucune donnée",
    emptyDescription: "Les prochaines entrées apparaîtront ici."
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    error: "Le serveur ne répond pas.",
    onRetry: () => undefined
  }
}`,...s.parameters?.docs?.source}}};const C=["Content","Loading","Empty","Error"];export{r as Content,n as Empty,s as Error,t as Loading,C as __namedExportsOrder,b as default};
