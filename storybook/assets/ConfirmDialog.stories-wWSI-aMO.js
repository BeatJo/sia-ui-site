import{r as s,j as r}from"./iframe-93ToM5gy.js";import{B as m}from"./index-DDfi4-t_.js";import{C as p}from"./index-oP6c-1zN.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-Ca-LLAC-.js";import"./index-CyYBDJlU.js";import"./geometry-Dzgyg8gY.js";import"./index-DqatgzX2.js";import"./index-BGC94N9u.js";import"./index-CtkCNbr2.js";import"./index-Fju9CRjl.js";import"./use-outside-click-nOWfDOom.js";import"./overlay-layer-ClrU24vq.js";import"./index-B7rcZNS2.js";function c(i){const[a,n]=s.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(m,{onClick:()=>n(!0),children:"Ouvrir la confirmation"}),r.jsx(p,{...i,open:a,onOpenChange:n})]})}const E={title:"Patterns/ConfirmDialog",component:c,tags:["autodocs"],args:{title:"Valider le paiement ?",description:"Cette action sera ajoutée à l'historique.",confirmLabel:"Valider",cancelLabel:"Annuler",tone:"primary",loading:!1,onConfirm:()=>{}}},e={},o={args:{title:"Supprimer ce compte ?",description:"Cette action est irréversible.",confirmLabel:"Supprimer",tone:"danger"}},t={args:{title:"Supprimer l’environnement ?",tone:"danger",confirmLabel:"Supprimer",confirmation:{value:"SUPPRIMER"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
