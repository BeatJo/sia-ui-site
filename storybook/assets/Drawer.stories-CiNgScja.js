import{r as d,j as r}from"./iframe-Ce1rQf5z.js";import{B as c}from"./index-DpravLuC.js";import{D as t}from"./index-CagKO__y.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-CT5IUcQd.js";import"./index-B-eTA3Tj.js";import"./geometry-Dzgyg8gY.js";import"./index-C8A0LU9j.js";import"./index-D2QN4V95.js";import"./index-DsCYDnXV.js";function u({position:p,title:l}){const[m,n]=d.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(c,{onClick:()=>n(!0),children:"Ouvrir"}),r.jsxs(t,{open:m,onOpenChange:n,position:p,children:[r.jsxs(t.Header,{children:[r.jsx(t.Title,{children:l}),r.jsx(t.Close,{})]}),r.jsx(t.Body,{children:r.jsx("p",{children:"Panneau contextuel sans quitter la page."})}),r.jsx(t.Footer,{children:r.jsx(c,{onClick:()=>n(!1),children:"Terminer"})})]})]})}const C={title:"Retour/Drawer",component:u,tags:["autodocs"],args:{position:"right",title:"Filtres avancés"},argTypes:{position:{control:"radio",options:["left","right","top","bottom"]}}},e={},o={args:{position:"left",title:"Navigation"}},s={args:{position:"right",title:"Filtres avancés"}},a={args:{position:"top",title:"Actions rapides"}},i={args:{position:"bottom",title:"Détails"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    position: "left",
    title: "Navigation"
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    position: "right",
    title: "Filtres avancés"
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    position: "top",
    title: "Actions rapides"
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    position: "bottom",
    title: "Détails"
  }
}`,...i.parameters?.docs?.source}}};const O=["Playground","Gauche","Droite","Haut","Bas"];export{i as Bas,s as Droite,o as Gauche,a as Haut,e as Playground,O as __namedExportsOrder,C as default};
