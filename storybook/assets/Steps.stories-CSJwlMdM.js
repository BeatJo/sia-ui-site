import"./iframe-DZg55ZNc.js";import{S as i}from"./index-BTe7CKvC.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-DuZVuOGI.js";const n=[{key:"compte",title:"Compte",description:"Identité du client"},{key:"adresse",title:"Adresse",description:"Facturation"},{key:"paiement",title:"Paiement",description:"Moyen et échéance"},{key:"revue",title:"Revue"}],d={title:"Navigation/Steps",component:i,tags:["autodocs"],args:{items:n,current:1,orientation:"horizontal",size:"md"},argTypes:{orientation:{control:"inline-radio",options:["horizontal","vertical"]},size:{control:"inline-radio",options:["sm","md"]},current:{control:{type:"range",min:0,max:3}}},parameters:{layout:"padded"}},t={},r={args:{orientation:"vertical",size:"sm"}},e={args:{current:3,items:[{key:"recu",title:"Reçu"},{key:"verifie",title:"Vérifié"},{key:"valide",title:"Validé"},{key:"paye",title:"Payé",status:"error",description:"Échec du prélèvement"}]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    size: "sm"
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    current: 3,
    items: [{
      key: "recu",
      title: "Reçu"
    }, {
      key: "verifie",
      title: "Vérifié"
    }, {
      key: "valide",
      title: "Validé"
    }, {
      key: "paye",
      title: "Payé",
      status: "error",
      description: "Échec du prélèvement"
    }]
  }
}`,...e.parameters?.docs?.source},description:{story:"Une étape peut forcer son état, indépendamment de l'étape courante.",...e.parameters?.docs?.description}}};const m=["Playground","Vertical","EnEchec"];export{e as EnEchec,t as Playground,r as Vertical,m as __namedExportsOrder,d as default};
