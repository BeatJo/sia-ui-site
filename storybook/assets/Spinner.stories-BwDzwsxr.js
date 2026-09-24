import{j as e}from"./iframe-DQyRSC8n.js";import{S as r}from"./index-Ce4u6n81.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./config-BUwt5-xE.js";const c={title:"Retour/Spinner",component:r,tags:["autodocs"],args:{label:"Chargement des données",size:"md",variant:"ring",tone:"primary"},argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},variant:{control:"radio",options:["dots","ring","double-ring"]},tone:{control:"select",options:["current","primary","neutral","info","success","warning","danger"]}},parameters:{layout:"centered"}},n={},a={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2rem"},children:[e.jsx(r,{variant:"dots",label:"Chargement par points"}),e.jsx(r,{variant:"ring",label:"Chargement circulaire"}),e.jsx(r,{variant:"double-ring",label:"Chargement double cercle"})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.25rem"},children:[e.jsx(r,{tone:"primary"}),e.jsx(r,{tone:"neutral"}),e.jsx(r,{tone:"info"}),e.jsx(r,{tone:"success"}),e.jsx(r,{tone:"warning"}),e.jsx(r,{tone:"danger"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "2rem"
  }}><Spinner variant="dots" label="Chargement par points" /><Spinner variant="ring" label="Chargement circulaire" /><Spinner variant="double-ring" label="Chargement double cercle" /></div>
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "1.25rem"
  }}><Spinner tone="primary" /><Spinner tone="neutral" /><Spinner tone="info" /><Spinner tone="success" /><Spinner tone="warning" /><Spinner tone="danger" /></div>
}`,...s.parameters?.docs?.source}}};const d=["Playground","Variants","Tones"];export{n as Playground,s as Tones,a as Variants,d as __namedExportsOrder,c as default};
