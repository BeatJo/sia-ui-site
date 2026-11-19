import{r as s,j as r}from"./iframe-DPI_H02q.js";import{B as m}from"./index-BLklH4cQ.js";import{C as p}from"./index-CtCDgOAL.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-C5ERzGDy.js";import"./index-BM2SoxMf.js";import"./geometry-Dzgyg8gY.js";import"./index-CrMSoNDQ.js";import"./index-Emyj7dyC.js";import"./index-D4LeQ9AA.js";import"./index-0p2uvI1k.js";import"./use-outside-click-875aKDbn.js";import"./overlay-layer-BI1mNV7p.js";import"./index-DGo_W68r.js";function c(i){const[a,n]=s.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(m,{onClick:()=>n(!0),children:"Ouvrir la confirmation"}),r.jsx(p,{...i,open:a,onOpenChange:n})]})}const E={title:"Patterns/ConfirmDialog",component:c,tags:["autodocs"],args:{title:"Valider le paiement ?",description:"Cette action sera ajoutée à l'historique.",confirmLabel:"Valider",cancelLabel:"Annuler",tone:"primary",loading:!1,onConfirm:()=>{}}},e={},o={args:{title:"Supprimer ce compte ?",description:"Cette action est irréversible.",confirmLabel:"Supprimer",tone:"danger"}},t={args:{title:"Supprimer l’environnement ?",tone:"danger",confirmLabel:"Supprimer",confirmation:{value:"SUPPRIMER"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Supprimer ce compte ?",
    description: "Cette action est irréversible.",
    confirmLabel: "Supprimer",
    tone: "danger"
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Supprimer l’environnement ?",
    tone: "danger",
    confirmLabel: "Supprimer",
    confirmation: {
      value: "SUPPRIMER"
    }
  }
}`,...t.parameters?.docs?.source}}};const R=["Playground","Destructive","TypedConfirmation"];export{o as Destructive,e as Playground,t as TypedConfirmation,R as __namedExportsOrder,E as default};
