import{j as t,r as c}from"./iframe-DPI_H02q.js";import{B as u}from"./index-BLklH4cQ.js";import{D as i}from"./index-CCKjaivi.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-C5ERzGDy.js";import"./index-BM2SoxMf.js";import"./geometry-Dzgyg8gY.js";import"./index-CrMSoNDQ.js";import"./index-Emyj7dyC.js";import"./index-CAk7qImf.js";import"./index-Cr38ilf_.js";import"./index-DGo_W68r.js";import"./index-BmoFgDzW.js";import"./index-CLXDNHE3.js";import"./index-CDbM86zj.js";import"./index-DyNggeyY.js";import"./index-BRIKUMAe.js";import"./index-B4SkgeT2.js";import"./overlay-layer-BI1mNV7p.js";import"./index-CtCDgOAL.js";import"./index-D4LeQ9AA.js";import"./index-0p2uvI1k.js";import"./use-outside-click-875aKDbn.js";import"./format-CiSXMYGS.js";const l=[{id:1,name:"Entreprise Alpha",status:"Actif",amount:125e3},{id:2,name:"Entreprise Bêta",status:"En attente",amount:84e3}];function h({loading:s}){return t.jsx(i,{loading:s,data:l,getRowKey:e=>e.id,caption:"Comptes clients",columns:[{key:"name",header:"Client",cell:e=>e.name},{key:"status",header:"Statut",cell:e=>e.status},{key:"amount",header:"Montant",align:"end",cell:e=>`${e.amount.toLocaleString("fr-FR")} FCFA`}]})}const U={title:"Données/DataTable",component:h,tags:["autodocs"],args:{loading:!1},parameters:{layout:"padded"}},a={},r={args:{loading:!0}};function g(){const[s,e]=c.useState(!1),[m,d]=c.useState(0);return t.jsx(i,{data:l,columns:[{key:"name",header:"Client"},{key:"status",header:"Statut"}],title:"Comptes clients",description:`Actualisations : ${m}`,refreshing:s,onRefresh:()=>{e(!0),setTimeout(()=>{d(p=>p+1),e(!1)},800)},refreshButtonProps:{children:"Synchroniser",variant:"outline"}})}const n={render:()=>t.jsx(g,{})},o={render:()=>t.jsx(i,{view:"cards",responsive:!1,data:[{id:"api",name:"Service de facturation et de suivi des commandes clients"}],columns:[{key:"name",header:"Composant"},{key:"health",header:"Santé applicative",cell:()=>t.jsx(u,{variant:"ghost",children:"Non vérifiée · contrôles de santé applicative"})},{key:"next",header:"Prochaine action",cell:()=>"Démarrer localement et exécuter les contrôles du guide avant de lancer le déploiement."},{key:"revision",header:"Révision abrégée",truncate:!0,cell:()=>"release-production-avec-un-identifiant-particulièrement-long"}]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <RefreshDemo />
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable view="cards" responsive={false} data={[{
    id: "api",
    name: "Service de facturation et de suivi des commandes clients"
  }]} columns={[{
    key: "name",
    header: "Composant"
  }, {
    key: "health",
    header: "Santé applicative",
    cell: () => <Button variant="ghost">
              Non vérifiée · contrôles de santé applicative
            </Button>
  }, {
    key: "next",
    header: "Prochaine action",
    cell: () => "Démarrer localement et exécuter les contrôles du guide avant de lancer le déploiement."
  }, {
    key: "revision",
    header: "Révision abrégée",
    truncate: true,
    cell: () => "release-production-avec-un-identifiant-particulièrement-long"
  }]} />
}`,...o.parameters?.docs?.source}}};const q=["Playground","Loading","Actualisation","CartesMultilignes"];export{n as Actualisation,o as CartesMultilignes,r as Loading,a as Playground,q as __namedExportsOrder,U as default};
