import{j as c}from"./iframe-Ce1rQf5z.js";import{F as p}from"./index-DUCwSdpy.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-DKDf4LSF.js";import"./index-CT5IUcQd.js";import"./index-C0oHOSuy.js";import"./index-COw7J52z.js";import"./config-BYtg1vzt.js";import"./currency-BD96M5Ab.js";import"./use-format-BnGkFZsJ.js";import"./index-CybIum0F.js";import"./index-BDfhfPjM.js";import"./index-DsCYDnXV.js";import"./index-BT1-k-ll.js";import"./index-C8A0LU9j.js";import"./index-D2QN4V95.js";import"./geometry-Dzgyg8gY.js";import"./index-BDugKE6z.js";import"./index-Dj44Uv3j.js";import"./index-BCZRjpWC.js";import"./index-BGoktTGE.js";import"./index-CMYIruMd.js";import"./format-CiSXMYGS.js";import"./index-B5qdYSwm.js";import"./index-Dqi_o6Nd.js";import"./index-suim4tdN.js";import"./index-DUJg3NHd.js";import"./index-B8_f-soW.js";import"./index-BRbEzfKA.js";import"./index-B-eTA3Tj.js";import"./index-vvaKWg1b.js";import"./index-wzUCOMCk.js";import"./index-B0kXdhVm.js";import"./index-DPWwk4i3.js";import"./index-BwpiL-uZ.js";import"./index-B3e7x5XA.js";import"./index-BobWrgXM.js";import"./index-AWvofhog.js";import"./index-BYhiVI8W.js";const i=[{value:"ci",label:"Côte d'Ivoire"},{value:"cm",label:"Cameroun"},{value:"sn",label:"Sénégal"}],Y={title:"Saisie/Field",component:p,tags:["autodocs"],args:{type:"text",label:"Nom",placeholder:"Saisir une valeur",helpText:"Field sélectionne le composant SIA UI correspondant.",required:!1},argTypes:{type:{control:"select",options:["text","textarea","email","password","phone","number","currency","date","time","datetime","select","multiselect","radio","checkbox","switch","file","image","slider","rating","color","rich-text","markdown","json","otp","tags","autocomplete","reference","hidden"]}},parameters:{layout:"padded"}},e={},r={args:{type:"select",label:"Pays",options:i,placeholder:"Choisir un pays"}},t={args:{type:"multiselect",label:"Pays disponibles",options:i,defaultValue:["ci","cm"]}},o={args:{type:"checkbox",label:"Préférences",controlLabel:"Recevoir les notifications",defaultValue:!0}},a={args:{type:"switch",label:"Compte actif",defaultValue:!0}},s={args:{type:"currency",label:"Montant",defaultValue:125e3,controlProps:{currency:"XAF"}}},l={args:{type:"email",label:"E-mail",defaultValue:"email",error:"Adresse invalide"}},n={args:{children:c.jsx("input",{type:"text",defaultValue:"Contrôle personnalisé"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: "checkbox",
    label: "Préférences",
    controlLabel: "Recevoir les notifications",
    defaultValue: true
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: "switch",
    label: "Compte actif",
    defaultValue: true
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const Z=["Playground","Select","MultiSelect","Checkbox","Switch","Currency","Error","CustomControl"];export{o as Checkbox,s as Currency,n as CustomControl,l as Error,t as MultiSelect,e as Playground,r as Select,a as Switch,Z as __namedExportsOrder,Y as default};
