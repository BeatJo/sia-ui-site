import{j as i}from"./iframe-DQyRSC8n.js";import{F as p}from"./index-B37gcNSh.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-BvKA8DNz.js";import"./index-Ce4u6n81.js";import"./config-BUwt5-xE.js";import"./index-hgvvEYN6.js";import"./index-CgIwsWhE.js";import"./currency-DS40uVXP.js";import"./index-DwIfyezI.js";import"./index-BIhygMh5.js";import"./index-C4BQ8rIf.js";import"./index-BzRy_9hL.js";import"./index-542shROb.js";import"./index-D7Pt3lB-.js";import"./geometry-Dzgyg8gY.js";import"./index-DIjzHByv.js";import"./index-Co96QoJP.js";import"./index-ZUlI2xFg.js";import"./index-B2lcHbKZ.js";import"./index-CbAoWPb6.js";import"./index-Nvixlgiw.js";import"./index-BgR4VZMf.js";import"./index-DGilTRrq.js";import"./index-B1LgHv20.js";import"./index-BvaTCaPl.js";import"./index-ptKfjOlk.js";import"./index-DUXvzsQk.js";import"./index-ecnM6PeP.js";import"./index-DW0HdbDi.js";import"./index-Ch9wKpys.js";import"./index-DCWCW-eh.js";import"./index-C9rs7WdQ.js";import"./index-DJzovI1r.js";import"./index-DRl1unue.js";import"./index-CsjN3UlB.js";import"./index-DdYdAVcI.js";const c=[{value:"ci",label:"Côte d'Ivoire"},{value:"cm",label:"Cameroun"},{value:"sn",label:"Sénégal"}],Q={title:"Saisie/Field",component:p,tags:["autodocs"],args:{type:"text",label:"Nom",placeholder:"Saisir une valeur",helpText:"Field sélectionne le composant SIA UI correspondant.",required:!1},argTypes:{type:{control:"select",options:["text","textarea","email","password","phone","number","currency","date","time","datetime","select","multiselect","radio","checkbox","switch","file","image","slider","rating","color","rich-text","markdown","json","otp","tags","autocomplete","reference","hidden"]}},parameters:{layout:"padded"}},e={},r={args:{type:"select",label:"Pays",options:c,placeholder:"Choisir un pays"}},t={args:{type:"multiselect",label:"Pays disponibles",options:c,defaultValue:["ci","cm"]}},a={args:{type:"checkbox",label:"Préférences",controlLabel:"Recevoir les notifications",defaultValue:!0}},o={args:{type:"switch",label:"Compte actif",defaultValue:!0}},s={args:{type:"currency",label:"Montant",defaultValue:125e3,controlProps:{currency:"XAF"}}},l={args:{type:"email",label:"E-mail",defaultValue:"email",error:"Adresse invalide"}},n={args:{children:i.jsx("input",{type:"text",defaultValue:"Contrôle personnalisé"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: "select",
    label: "Pays",
    options,
    placeholder: "Choisir un pays"
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: "multiselect",
    label: "Pays disponibles",
    options,
    defaultValue: ["ci", "cm"]
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: "checkbox",
    label: "Préférences",
    controlLabel: "Recevoir les notifications",
    defaultValue: true
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: "switch",
    label: "Compte actif",
    defaultValue: true
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "currency",
    label: "Montant",
    defaultValue: 125000,
    controlProps: {
      currency: "XAF"
    }
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: "email",
    label: "E-mail",
    defaultValue: "email",
    error: "Adresse invalide"
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: <input type="text" defaultValue="Contrôle personnalisé" />
  }
}`,...n.parameters?.docs?.source}}};const W=["Playground","Select","MultiSelect","Checkbox","Switch","Currency","Error","CustomControl"];export{a as Checkbox,s as Currency,n as CustomControl,l as Error,t as MultiSelect,e as Playground,r as Select,o as Switch,W as __namedExportsOrder,Q as default};
