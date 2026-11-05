import"./iframe-93ToM5gy.js";import{E as p}from"./index-DcSf9Nwe.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./use-format-Dn1QUkJK.js";import"./config-BYtg1vzt.js";import"./index-DDfi4-t_.js";import"./index-Ca-LLAC-.js";import"./index-CyYBDJlU.js";import"./geometry-Dzgyg8gY.js";import"./index-DqatgzX2.js";import"./index-BGC94N9u.js";import"./index-7NsXTHGM.js";import"./index-CpTgT-s4.js";import"./index-DBmmh6Fk.js";import"./index-CdUZj38H.js";import"./overlay-layer-ClrU24vq.js";import"./index-xklZZRwx.js";import"./index-B7rcZNS2.js";import"./format-CiSXMYGS.js";function e(m,d){const t=new Date;t.setDate(t.getDate()+m);const c=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;return d?`${c}T${d}`:c}const l=[{id:"1",title:"Revue de sprint",start:e(0,"10:00"),end:e(0,"11:00"),tone:"primary",location:"Salle Atlas"},{id:"2",title:"Déploiement production",start:e(0,"14:30"),end:e(0,"15:30"),tone:"danger"},{id:"3",title:"Point client",start:e(0,"15:00"),end:e(0,"16:00"),tone:"info"},{id:"4",title:"Salon Tech Afrique",start:e(1),end:e(3),allDay:!0,tone:"warning"},{id:"5",title:"Clôture de caisse",start:e(2,"18:00"),tone:"success"},{id:"6",title:"Entretien",start:e(-2,"09:00"),end:e(-2,"09:45"),tone:"info"},{id:"7",title:"Formation sécurité",start:e(4,"13:00"),end:e(4,"17:00"),tone:"neutral"},{id:"8",title:"Paiement fournisseurs",start:e(0,"17:00"),tone:"success"},{id:"9",title:"Astreinte",start:e(7),allDay:!0,tone:"danger"}],J={title:"Dates et heures/EventCalendar",component:p,tags:["autodocs"],args:{events:l,variant:"bordered",eventVariant:"soft",density:"comfortable",defaultView:"month"},argTypes:{variant:{control:"inline-radio",options:["bordered","minimal","soft"]},eventVariant:{control:"inline-radio",options:["soft","solid","outline"]},density:{control:"inline-radio",options:["comfortable","compact"]},defaultView:{control:"inline-radio",options:["month","week","day","agenda"]}},parameters:{layout:"padded"}},o={},n={args:{defaultView:"week"}},s={args:{defaultView:"day"}},i={args:{defaultView:"agenda"}},r={args:{variant:"minimal",eventVariant:"solid"}},a={args:{variant:"soft",eventVariant:"outline",density:"compact"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    defaultView: "week"
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    defaultView: "day"
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    defaultView: "agenda"
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "minimal",
    eventVariant: "solid"
  }
}`,...r.parameters?.docs?.source},description:{story:"Aucune ligne intérieure, événements pleins.",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "soft",
    eventVariant: "outline",
    density: "compact"
  }
}`,...a.parameters?.docs?.source},description:{story:"Des cases teintées, événements en contour, grille resserrée.",...a.parameters?.docs?.description}}};const N=["Mois","Semaine","Jour","Agenda","Minimal","Doux"];export{i as Agenda,a as Doux,s as Jour,r as Minimal,o as Mois,n as Semaine,N as __namedExportsOrder,J as default};
