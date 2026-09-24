import{j as r}from"./iframe-DQyRSC8n.js";import{B as e}from"./index-u74Kvn0L.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-Ce4u6n81.js";import"./config-BUwt5-xE.js";import"./index-DUXvzsQk.js";import"./geometry-Dzgyg8gY.js";import"./index-542shROb.js";import"./index-D7Pt3lB-.js";const j={title:"Primitives/Button",component:e,tags:["autodocs"],args:{children:"Enregistrer",variant:"solid",size:"md",radius:"default",loading:!1},argTypes:{variant:{control:"select",options:["solid","outline","ghost"]},size:{control:"select",options:["sm","md","lg"]},radius:{control:"select",options:["default","none","sm","lg","full"]}}},s={},o={args:{loading:!0}},a={args:{loading:!0,loadingLabel:"Enregistrement en cours",spinnerProps:{variant:"dots"}}},t={args:{loading:!0,spinnerProps:{variant:"double-ring"}}},n={args:{disabled:!0}},i={args:{tooltip:{content:"Enregistrer les modifications",placement:"top"}}},d={render:()=>r.jsxs("div",{style:{display:"flex",gap:12},children:[r.jsx(e,{children:"Solid"}),r.jsx(e,{variant:"outline",children:"Outline"}),r.jsx(e,{variant:"ghost",children:"Ghost"})]})},l={render:()=>r.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[r.jsx(e,{radius:"none",children:"None"}),r.jsx(e,{radius:"sm",children:"Small"}),r.jsx(e,{radius:"default",children:"Theme"}),r.jsx(e,{radius:"lg",children:"Large"}),r.jsx(e,{radius:"full",children:"Full"})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    loadingLabel: "Enregistrement en cours",
    spinnerProps: {
      variant: "dots"
    }
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    spinnerProps: {
      variant: "double-ring"
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    tooltip: {
      content: "Enregistrer les modifications",
      placement: "top"
    }
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12
  }}><Button>Solid</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></div>
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12,
    flexWrap: "wrap"
  }}><Button radius="none">None</Button><Button radius="sm">Small</Button><Button radius="default">Theme</Button><Button radius="lg">Large</Button><Button radius="full">Full</Button></div>
}`,...l.parameters?.docs?.source}}};const S=["Playground","Loading","LoadingDots","LoadingDoubleRing","Disabled","WithTooltip","Variants","Radius"];export{n as Disabled,o as Loading,a as LoadingDots,t as LoadingDoubleRing,s as Playground,l as Radius,d as Variants,i as WithTooltip,S as __namedExportsOrder,j as default};
