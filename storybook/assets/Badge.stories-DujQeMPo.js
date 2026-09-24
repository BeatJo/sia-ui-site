import{j as e}from"./iframe-DQyRSC8n.js";import{B as r}from"./index-D8tXwpEZ.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-Ce4u6n81.js";import"./config-BUwt5-xE.js";const m={title:"Primitives/Badge",component:r,tags:["autodocs"],args:{children:"Actif",tone:"success",variant:"soft",loading:!1},argTypes:{tone:{control:"select",options:["neutral","primary","success","warning","danger"]},variant:{control:"radio",options:["soft","solid","outline"]}}},n={},a={args:{left:"●",right:"12",children:"Notifications",tone:"primary"}},o={args:{loading:!0,children:"Synchronisation",tone:"primary"}},s={args:{loading:!0,children:"Traitement",tone:"warning",spinnerProps:{variant:"dots"}}},t={render:()=>e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap"},children:[e.jsx(r,{children:"Neutre"}),e.jsx(r,{tone:"primary",children:"Info"}),e.jsx(r,{tone:"success",children:"Actif"}),e.jsx(r,{tone:"warning",children:"En attente"}),e.jsx(r,{tone:"danger",children:"Bloqué"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    left: "●",
    right: "12",
    children: "Notifications",
    tone: "primary"
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: "Synchronisation",
    tone: "primary"
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: "Traitement",
    tone: "warning",
    spinnerProps: {
      variant: "dots"
    }
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: ".5rem",
    flexWrap: "wrap"
  }}>
      <Badge>Neutre</Badge>
      <Badge tone="primary">Info</Badge>
      <Badge tone="success">Actif</Badge>
      <Badge tone="warning">En attente</Badge>
      <Badge tone="danger">Bloqué</Badge>
    </div>
}`,...t.parameters?.docs?.source}}};const u=["Playground","WithSides","Loading","LoadingDots","Tones"];export{o as Loading,s as LoadingDots,n as Playground,t as Tones,a as WithSides,u as __namedExportsOrder,m as default};
