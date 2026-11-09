import{j as t,r as c}from"./iframe-D9A-l6Om.js";import{B as u}from"./index-m-1DTyke.js";import{D as i}from"./index-rSlkVXTX.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-uYvKTB3s.js";import"./index-Cdnbtvb3.js";import"./geometry-Dzgyg8gY.js";import"./index-CcL1tRwO.js";import"./index-CINEKHQq.js";import"./index-bQQJV1BL.js";import"./index-CGtQG0Ou.js";import"./index-CM5jkExh.js";import"./index-BxTMGETu.js";import"./index-KA9U3qXB.js";import"./index-CkOol00f.js";import"./index-C6FFzcnq.js";import"./index-W7thZZ5f.js";import"./index-N0UA1FXC.js";import"./overlay-layer-BI4MT5i1.js";import"./index-DIWT34Pb.js";import"./index-DeQKS07X.js";import"./index-BIAmnpV2.js";import"./use-outside-click-DDLKuUo7.js";import"./format-CiSXMYGS.js";const l=[{id:1,name:"Entreprise Alpha",status:"Actif",amount:125e3},{id:2,name:"Entreprise Bêta",status:"En attente",amount:84e3}];function h({loading:s}){return t.jsx(i,{loading:s,data:l,getRowKey:e=>e.id,caption:"Comptes clients",columns:[{key:"name",header:"Client",cell:e=>e.name},{key:"status",header:"Statut",cell:e=>e.status},{key:"amount",header:"Montant",align:"end",cell:e=>`${e.amount.toLocaleString("fr-FR")} FCFA`}]})}const U={title:"Données/DataTable",component:h,tags:["autodocs"],args:{loading:!1},parameters:{layout:"padded"}},a={},r={args:{loading:!0}};function g(){const[s,e]=c.useState(!1),[m,d]=c.useState(0);return t.jsx(i,{data:l,columns:[{key:"name",header:"Client"},{key:"status",header:"Statut"}],title:"Comptes clients",description:`Actualisations : ${m}`,refreshing:s,onRefresh:()=>{e(!0),setTimeout(()=>{d(p=>p+1),e(!1)},800)},refreshButtonProps:{children:"Synchroniser",variant:"outline"}})}const n={render:()=>t.jsx(g,{})},o={render:()=>t.jsx(i,{view:"cards",responsive:!1,data:[{id:"api",name:"Service de facturation et de suivi des commandes clients"}],columns:[{key:"name",header:"Composant"},{key:"health",header:"Santé applicative",cell:()=>t.jsx(u,{variant:"ghost",children:"Non vérifiée · contrôles de santé applicative"})},{key:"next",header:"Prochaine action",cell:()=>"Démarrer localement et exécuter les contrôles du guide avant de lancer le déploiement."},{key:"revision",header:"Révision abrégée",truncate:!0,cell:()=>"release-production-avec-un-identifiant-particulièrement-long"}]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
