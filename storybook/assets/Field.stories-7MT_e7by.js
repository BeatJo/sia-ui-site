import{j as c}from"./iframe-DPI_H02q.js";import{F as p}from"./index-Bp3C9H0A.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-D4LeQ9AA.js";import"./index-C5ERzGDy.js";import"./index-BMdNox3C.js";import"./index-DVQ-u73t.js";import"./config-BYtg1vzt.js";import"./currency-BD96M5Ab.js";import"./use-format-DTicojFe.js";import"./index-Di_CVqz0.js";import"./index-CJ-VEoLL.js";import"./index-DGo_W68r.js";import"./index-B4SkgeT2.js";import"./index-CrMSoNDQ.js";import"./index-Emyj7dyC.js";import"./overlay-layer-BI1mNV7p.js";import"./geometry-Dzgyg8gY.js";import"./index-KvzVMIeI.js";import"./index-BL4BRXe9.js";import"./index-C-TJpVVE.js";import"./index-D5Y4K0Rm.js";import"./index-Q7N6PEQm.js";import"./format-CiSXMYGS.js";import"./index-Dk6vdQc_.js";import"./index-CAk7qImf.js";import"./index-CQ7AGzNF.js";import"./index-Be9YrYtT.js";import"./index-CzoxYTFA.js";import"./index-CvkMJHJ4.js";import"./index-BM2SoxMf.js";import"./index-PJiqj-fQ.js";import"./index-DlKxRBdx.js";import"./index-Kpf7wt9I.js";import"./index-H8JlCq1J.js";import"./index-5XsZrs0d.js";import"./index-MgsN-06l.js";import"./index-8uhkpkc0.js";import"./index-BFk69C1S.js";import"./index-DwZp3boW.js";const i=[{value:"ci",label:"Côte d'Ivoire"},{value:"cm",label:"Cameroun"},{value:"sn",label:"Sénégal"}],Z={title:"Saisie/Field",component:p,tags:["autodocs"],args:{type:"text",label:"Nom",placeholder:"Saisir une valeur",helpText:"Field sélectionne le composant SIA UI correspondant.",required:!1},argTypes:{type:{control:"select",options:["text","textarea","email","password","phone","number","currency","date","time","datetime","select","multiselect","radio","checkbox","switch","file","image","slider","rating","color","rich-text","markdown","json","otp","tags","autocomplete","reference","hidden"]}},parameters:{layout:"padded"}},e={},r={args:{type:"select",label:"Pays",options:i,placeholder:"Choisir un pays"}},t={args:{type:"multiselect",label:"Pays disponibles",options:i,defaultValue:["ci","cm"]}},o={args:{type:"checkbox",label:"Préférences",controlLabel:"Recevoir les notifications",defaultValue:!0}},a={args:{type:"switch",label:"Compte actif",defaultValue:!0}},s={args:{type:"currency",label:"Montant",defaultValue:125e3,controlProps:{currency:"XAF"}}},l={args:{type:"email",label:"E-mail",defaultValue:"email",error:"Adresse invalide"}},n={args:{children:c.jsx("input",{type:"text",defaultValue:"Contrôle personnalisé"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const $=["Playground","Select","MultiSelect","Checkbox","Switch","Currency","Error","CustomControl"];export{o as Checkbox,s as Currency,n as CustomControl,l as Error,t as MultiSelect,e as Playground,r as Select,a as Switch,$ as __namedExportsOrder,Z as default};
