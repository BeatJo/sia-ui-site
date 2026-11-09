import{r as m,j as c}from"./iframe-D9A-l6Om.js";import{S as k}from"./index-BLd29thZ.js";import{c as x}from"./access-C_q7-za5.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./use-hover-intent-BnU5HDoI.js";import"./index-CM5jkExh.js";import"./index-N0UA1FXC.js";import"./index-CcL1tRwO.js";import"./index-CINEKHQq.js";import"./overlay-layer-BI4MT5i1.js";import"./geometry-Dzgyg8gY.js";const S=[{key:"pilotage",title:"Pilotage",items:[{key:"tableau",label:"Tableau de bord",icon:"◧"},{key:"rapports",label:"Rapports",icon:"◨",badge:2}]},{key:"gestion",title:"Gestion",items:[{key:"ventes",label:"Ventes",icon:"◐",items:[{key:"factures",label:"Factures",badge:12},{key:"reglements",label:"Règlements",items:[{key:"encaisses",label:"Encaissés"},{key:"attente",label:"En attente",badge:3,items:[{key:"relances",label:"Relances"},{key:"litiges",label:"Litiges",badge:1}]}]},{key:"devis",label:"Devis"}]},{key:"clients",label:"Clients",icon:"◑"},{key:"admin",label:"Administration",icon:"◒",permission:"admin",items:[{key:"equipe",label:"Équipe",permission:"admin.equipe"},{key:"journal",label:"Journal",permission:"admin.journal"}]}]}],h=["tableau","rapports","factures","encaisses","relances","litiges","devis","clients","equipe"];function R({collapsed:l,activeKey:i,side:d,variant:g,size:b,accordion:y,droits:p}){const[u,v]=m.useState(i),f=m.useMemo(()=>{const n=p.split(/[,\s]+/).filter(Boolean);return x({granted:()=>n}).can},[p]);return c.jsx("div",{style:{display:"flex",justifyContent:d==="right"?"flex-end":"flex-start"},children:c.jsx("div",{style:{width:l?"4rem":"16rem",height:"26rem",border:"1px solid var(--sia-border)",borderRadius:"var(--sia-radius)",background:"var(--sia-surface)",transition:"width var(--sia-duration-base) var(--sia-easing-standard)"},children:c.jsx(k,{items:S,collapsed:l,side:d,variant:g,size:b,accordion:y,can:f,activeKey:u===i?i:u,onNavigate:n=>v(n.key),ariaLabel:"Démonstration"})})})}const w={title:"Navigation/Sidebar",component:R,tags:["autodocs"],args:{collapsed:!1,activeKey:"litiges",side:"left",variant:"default",size:"md",accordion:!1,droits:"admin admin.equipe admin.journal"},argTypes:{activeKey:{control:"select",options:h},side:{control:"inline-radio",options:["left","right"]},variant:{control:"inline-radio",options:["default","filled","floating"]},size:{control:"inline-radio",options:["sm","md","lg"]},droits:{control:"text"}},parameters:{layout:"padded"}},e={},r={args:{collapsed:!0}},s={args:{droits:"",activeKey:"factures"}},a={args:{accordion:!0}},t={args:{side:"right",collapsed:!0}},o={args:{collapsed:!0,variant:"floating",size:"lg"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source},description:{story:"La branche de l'entrée courante s'ouvre d'elle-même, à quatre niveaux.",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    collapsed: true
  }
}`,...r.parameters?.docs?.source},description:{story:`Réduite, la barre garde ses sous-menus atteignables : ils sortent en volet,
au survol ou au clavier. C'est le défaut que cette refonte corrige.`,...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    droits: "",
    activeKey: "factures"
  }
}`,...s.parameters?.docs?.source},description:{story:"Sans le droit `admin`, la rubrique entière disparaît — titre compris.",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    accordion: true
  }
}`,...a.parameters?.docs?.source},description:{story:"Une seule branche ouverte par niveau.",...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    side: "right",
    collapsed: true
  }
}`,...t.parameters?.docs?.source},description:{story:"Posée à droite, les volets du rail sortent de l'autre côté.",...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    collapsed: true,
    variant: "floating",
    size: "lg"
  }
}`,...o.parameters?.docs?.source},description:{story:"Le rail flottant conserve les icônes et ses marges dans une colonne de 4rem.",...o.parameters?.docs?.description}}};const M=["Playground","Rail","DroitsRestreints","Accordeon","ADroite","FlottantReduit"];export{t as ADroite,a as Accordeon,s as DroitsRestreints,o as FlottantReduit,e as Playground,r as Rail,M as __namedExportsOrder,w as default};
