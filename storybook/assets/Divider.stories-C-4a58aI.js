import{j as e}from"./iframe-DQyRSC8n.js";import{c as l}from"./classname-nB6WhpaV.js";import"./preload-helper-PPVm8Dsz.js";function s({orientation:a="horizontal",decorative:o=!0,className:d,...c}){return e.jsx("div",{className:l("sia-divider",`sia-divider--${a}`,d),role:o?"presentation":"separator","aria-orientation":o?void 0:a,...c})}s.__docgenInfo={description:`Un trait entre deux choses.

\`decorative\` décide s'il compte pour un lecteur d'écran. Un trait qui
sépare deux groupes de sens est une information; un trait qui aère ne
l'est pas, et l'annoncer ajoute du bruit à chaque parcours.`,methods:[],displayName:"Divider",props:{orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},decorative:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}},composes:["HTMLAttributes"]};const v={title:"Mise en page/Divider",component:s,tags:["autodocs"],args:{orientation:"horizontal",decorative:!1},argTypes:{orientation:{control:"radio",options:["horizontal","vertical"]}},parameters:{layout:"padded"}},t={},i={args:{orientation:"vertical"},decorators:[a=>e.jsx("div",{style:{height:"5rem",display:"flex"},children:e.jsx(a,{})})]},r={args:{decorative:!0}},n={render:()=>e.jsxs("div",{style:{maxWidth:"22rem"},children:[e.jsx("div",{style:{padding:".5rem 0"},children:"Facture 2026-0184"}),e.jsx(s,{decorative:!0}),e.jsx("div",{style:{padding:".5rem 0"},children:"Facture 2026-0185"}),e.jsx(s,{decorative:!0}),e.jsx("div",{style:{padding:".5rem 0"},children:"Avoir 2026-0012"})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "vertical"
  },
  decorators: [Story => <div style={{
    height: "5rem",
    display: "flex"
  }}>
        <Story />
      </div>]
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    decorative: true
  }
}`,...r.parameters?.docs?.source},description:{story:`\`decorative\` retire le séparateur de l'arbre d'accessibilité.

À poser quand le trait ne sépare rien de sémantique — une simple respiration
visuelle. Un lecteur d'écran n'a aucune raison de l'annoncer.`,...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const g=["Horizontal","Vertical","Decoratif","DansUneListe"];export{n as DansUneListe,r as Decoratif,t as Horizontal,i as Vertical,g as __namedExportsOrder,v as default};
