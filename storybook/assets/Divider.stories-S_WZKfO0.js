import{j as e}from"./iframe-DZg55ZNc.js";import{D as s}from"./index-BxwbCMHD.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const p={title:"Mise en page/Divider",component:s,tags:["autodocs"],args:{orientation:"horizontal",decorative:!1},argTypes:{orientation:{control:"radio",options:["horizontal","vertical"]}},parameters:{layout:"padded"}},a={},t={args:{orientation:"vertical"},decorators:[n=>e.jsx("div",{style:{height:"5rem",display:"flex"},children:e.jsx(n,{})})]},r={args:{decorative:!0}},i={render:()=>e.jsxs("div",{style:{maxWidth:"22rem"},children:[e.jsx("div",{style:{padding:".5rem 0"},children:"Facture 2026-0184"}),e.jsx(s,{decorative:!0}),e.jsx("div",{style:{padding:".5rem 0"},children:"Facture 2026-0185"}),e.jsx(s,{decorative:!0}),e.jsx("div",{style:{padding:".5rem 0"},children:"Avoir 2026-0012"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "vertical"
  },
  decorators: [Story => <div style={{
    height: "5rem",
    display: "flex"
  }}>
        <Story />
      </div>]
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    decorative: true
  }
}`,...r.parameters?.docs?.source},description:{story:`\`decorative\` retire le séparateur de l'arbre d'accessibilité.

À poser quand le trait ne sépare rien de sémantique — une simple respiration
visuelle. Un lecteur d'écran n'a aucune raison de l'annoncer.`,...r.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "22rem"
  }}>
      <div style={{
      padding: ".5rem 0"
    }}>Facture 2026-0184</div>
      <Divider decorative />
      <div style={{
      padding: ".5rem 0"
    }}>Facture 2026-0185</div>
      <Divider decorative />
      <div style={{
      padding: ".5rem 0"
    }}>Avoir 2026-0012</div>
    </div>
}`,...i.parameters?.docs?.source}}};const m=["Horizontal","Vertical","Decoratif","DansUneListe"];export{i as DansUneListe,r as Decoratif,a as Horizontal,t as Vertical,m as __namedExportsOrder,p as default};
