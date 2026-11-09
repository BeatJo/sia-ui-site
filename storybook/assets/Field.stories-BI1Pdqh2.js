import{j as c}from"./iframe-D9A-l6Om.js";import{F as p}from"./index-D3j7VzeZ.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-DeQKS07X.js";import"./index-uYvKTB3s.js";import"./index-4HfrDSnK.js";import"./index-DyeYCcvv.js";import"./config-BYtg1vzt.js";import"./currency-BD96M5Ab.js";import"./use-format-BpwNFcuz.js";import"./index-T1gUKmaf.js";import"./index-CvbZtkuQ.js";import"./index-CM5jkExh.js";import"./index-N0UA1FXC.js";import"./index-CcL1tRwO.js";import"./index-CINEKHQq.js";import"./overlay-layer-BI4MT5i1.js";import"./geometry-Dzgyg8gY.js";import"./index-DIqyq2b3.js";import"./index-DVOjCBQ-.js";import"./index-BNdiNc-Y.js";import"./index-Bih2xD7T.js";import"./index-Bte00x-E.js";import"./format-CiSXMYGS.js";import"./index-CsytoBbo.js";import"./index-bQQJV1BL.js";import"./index-BWI_u2dP.js";import"./index-Cm1gZ5p-.js";import"./index-Bb-ApWcg.js";import"./index-D7QNGAji.js";import"./index-Cdnbtvb3.js";import"./index-D8SH_tBl.js";import"./index-CSa_Vd3M.js";import"./index-C32RPKhR.js";import"./index-Dp3aGS_F.js";import"./index-Dxxv97LN.js";import"./index-B1kpCIXW.js";import"./index-P7s0MCZa.js";import"./index-6ZGsPjDC.js";import"./index-B33r_i_g.js";const i=[{value:"ci",label:"Côte d'Ivoire"},{value:"cm",label:"Cameroun"},{value:"sn",label:"Sénégal"}],Z={title:"Saisie/Field",component:p,tags:["autodocs"],args:{type:"text",label:"Nom",placeholder:"Saisir une valeur",helpText:"Field sélectionne le composant SIA UI correspondant.",required:!1},argTypes:{type:{control:"select",options:["text","textarea","email","password","phone","number","currency","date","time","datetime","select","multiselect","radio","checkbox","switch","file","image","slider","rating","color","rich-text","markdown","json","otp","tags","autocomplete","reference","hidden"]}},parameters:{layout:"padded"}},e={},r={args:{type:"select",label:"Pays",options:i,placeholder:"Choisir un pays"}},t={args:{type:"multiselect",label:"Pays disponibles",options:i,defaultValue:["ci","cm"]}},o={args:{type:"checkbox",label:"Préférences",controlLabel:"Recevoir les notifications",defaultValue:!0}},a={args:{type:"switch",label:"Compte actif",defaultValue:!0}},s={args:{type:"currency",label:"Montant",defaultValue:125e3,controlProps:{currency:"XAF"}}},l={args:{type:"email",label:"E-mail",defaultValue:"email",error:"Adresse invalide"}},n={args:{children:c.jsx("input",{type:"text",defaultValue:"Contrôle personnalisé"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
