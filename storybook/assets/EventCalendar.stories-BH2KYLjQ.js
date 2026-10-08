import"./iframe-Ce1rQf5z.js";import{E as p}from"./index-DD9VB5wc.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./use-format-BnGkFZsJ.js";import"./config-BYtg1vzt.js";import"./index-DpravLuC.js";import"./index-CT5IUcQd.js";import"./index-B-eTA3Tj.js";import"./geometry-Dzgyg8gY.js";import"./index-C8A0LU9j.js";import"./index-D2QN4V95.js";import"./index-POQyYI_2.js";import"./index-BUG9CjbD.js";import"./index-BjTkQFIQ.js";import"./index-BT1-k-ll.js";import"./index-B5qdYSwm.js";import"./index-DsCYDnXV.js";import"./format-CiSXMYGS.js";function e(m,d){const t=new Date;t.setDate(t.getDate()+m);const c=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;return d?`${c}T${d}`:c}const l=[{id:"1",title:"Revue de sprint",start:e(0,"10:00"),end:e(0,"11:00"),tone:"primary",location:"Salle Atlas"},{id:"2",title:"Déploiement production",start:e(0,"14:30"),end:e(0,"15:30"),tone:"danger"},{id:"3",title:"Point client",start:e(0,"15:00"),end:e(0,"16:00"),tone:"info"},{id:"4",title:"Salon Tech Afrique",start:e(1),end:e(3),allDay:!0,tone:"warning"},{id:"5",title:"Clôture de caisse",start:e(2,"18:00"),tone:"success"},{id:"6",title:"Entretien",start:e(-2,"09:00"),end:e(-2,"09:45"),tone:"info"},{id:"7",title:"Formation sécurité",start:e(4,"13:00"),end:e(4,"17:00"),tone:"neutral"},{id:"8",title:"Paiement fournisseurs",start:e(0,"17:00"),tone:"success"},{id:"9",title:"Astreinte",start:e(7),allDay:!0,tone:"danger"}],F={title:"Dates et heures/EventCalendar",component:p,tags:["autodocs"],args:{events:l,variant:"bordered",eventVariant:"soft",density:"comfortable",defaultView:"month"},argTypes:{variant:{control:"inline-radio",options:["bordered","minimal","soft"]},eventVariant:{control:"inline-radio",options:["soft","solid","outline"]},density:{control:"inline-radio",options:["comfortable","compact"]},defaultView:{control:"inline-radio",options:["month","week","day","agenda"]}},parameters:{layout:"padded"}},o={},n={args:{defaultView:"week"}},s={args:{defaultView:"day"}},i={args:{defaultView:"agenda"}},r={args:{variant:"minimal",eventVariant:"solid"}},a={args:{variant:"soft",eventVariant:"outline",density:"compact"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source},description:{story:"Des cases teintées, événements en contour, grille resserrée.",...a.parameters?.docs?.description}}};const J=["Mois","Semaine","Jour","Agenda","Minimal","Doux"];export{i as Agenda,a as Doux,s as Jour,r as Minimal,o as Mois,n as Semaine,J as __namedExportsOrder,F as default};
