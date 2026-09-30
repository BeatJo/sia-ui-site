import{j as s}from"./iframe-DZg55ZNc.js";import{L as o}from"./index-CWO42TQ1.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const i={title:"Retour/LiveIndicator",component:o,tags:["autodocs"],args:{status:"open",compact:!1},argTypes:{status:{control:"inline-radio",options:["open","connecting","closed"]}}},t={},e={render:()=>s.jsxs("div",{style:{display:"flex",gap:24},children:[s.jsx(o,{status:"open"}),s.jsx(o,{status:"connecting"}),s.jsx(o,{status:"closed"})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 24
  }}>
      <LiveIndicator status="open" />
      <LiveIndicator status="connecting" />
      <LiveIndicator status="closed" />
    </div>
}`,...e.parameters?.docs?.source}}};const d=["Playground","LesTroisEtats"];export{e as LesTroisEtats,t as Playground,d as __namedExportsOrder,i as default};
