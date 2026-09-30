import{j as i}from"./iframe-DZg55ZNc.js";import{F as p}from"./index-Beoq8Xzr.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-Bqjpn0Yf.js";import"./index-KtcO7v1s.js";import"./index-GxFmXwZ6.js";import"./index-5xtzPySF.js";import"./currency-DS40uVXP.js";import"./index-8-JYDxjg.js";import"./index-CROTUqzY.js";import"./index-DuZVuOGI.js";import"./index-BgRshfHl.js";import"./index-DqtlrErT.js";import"./index-CSjWD8Sr.js";import"./geometry-Dzgyg8gY.js";import"./index-DCVLEJzz.js";import"./index-DbfPf6MM.js";import"./index-05QFsk2h.js";import"./index-G1Ik1XVs.js";import"./index-DHJ_-nYK.js";import"./format-CiSXMYGS.js";import"./index-CWbxydQi.js";import"./index-CyduzDzo.js";import"./index-DklfwuHX.js";import"./index-DpHSWWYS.js";import"./index-DlFkKD_P.js";import"./index-AM8I_DuJ.js";import"./index---dMz_C1.js";import"./index-2QIwCWnl.js";import"./index-rsTTF7Q-.js";import"./index-DQuBVv6g.js";import"./index-C_HJCIBD.js";import"./index-CUDxdpWx.js";import"./index-Ddua4HqO.js";import"./index-DTvbRlNq.js";import"./index-DdEnb7ys.js";import"./index-DQYhGau5.js";const c=[{value:"ci",label:"Côte d'Ivoire"},{value:"cm",label:"Cameroun"},{value:"sn",label:"Sénégal"}],Q={title:"Saisie/Field",component:p,tags:["autodocs"],args:{type:"text",label:"Nom",placeholder:"Saisir une valeur",helpText:"Field sélectionne le composant SIA UI correspondant.",required:!1},argTypes:{type:{control:"select",options:["text","textarea","email","password","phone","number","currency","date","time","datetime","select","multiselect","radio","checkbox","switch","file","image","slider","rating","color","rich-text","markdown","json","otp","tags","autocomplete","reference","hidden"]}},parameters:{layout:"padded"}},e={},r={args:{type:"select",label:"Pays",options:c,placeholder:"Choisir un pays"}},t={args:{type:"multiselect",label:"Pays disponibles",options:c,defaultValue:["ci","cm"]}},a={args:{type:"checkbox",label:"Préférences",controlLabel:"Recevoir les notifications",defaultValue:!0}},o={args:{type:"switch",label:"Compte actif",defaultValue:!0}},s={args:{type:"currency",label:"Montant",defaultValue:125e3,controlProps:{currency:"XAF"}}},l={args:{type:"email",label:"E-mail",defaultValue:"email",error:"Adresse invalide"}},n={args:{children:i.jsx("input",{type:"text",defaultValue:"Contrôle personnalisé"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
