import{j as e}from"./iframe-DPI_H02q.js";import{S as n}from"./index-C5ERzGDy.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const m={title:"Retour/Spinner",component:n,tags:["autodocs"],args:{label:"Chargement des données",size:"md",variant:"ring",tone:"primary"},argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},variant:{control:"radio",options:["dots","ring","double-ring"]},tone:{control:"select",options:["current","primary","neutral","info","success","warning","danger"]}},parameters:{layout:"centered"}},a={},s={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2rem"},children:[e.jsx(n,{variant:"dots",label:"Chargement par points"}),e.jsx(n,{variant:"ring",label:"Chargement circulaire"}),e.jsx(n,{variant:"double-ring",label:"Chargement double cercle"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.25rem"},children:[e.jsx(n,{tone:"primary"}),e.jsx(n,{tone:"neutral"}),e.jsx(n,{tone:"info"}),e.jsx(n,{tone:"success"}),e.jsx(n,{tone:"warning"}),e.jsx(n,{tone:"danger"})]})},i={args:{variant:"double-ring",tone:"primary"},parameters:{docs:{description:{story:"Deux arcs concentriques : anneau intérieur plus petit et atténué, avec une rotation inverse plus rapide, comme sur mobile."}}},render:o=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:"2rem"},children:["xs","sm","md","lg","xl"].map(r=>e.jsxs("div",{style:{display:"grid",justifyItems:"center",gap:".75rem"},children:[e.jsx(n,{...o,variant:"double-ring",size:r,label:`Chargement double anneau ${r}`}),e.jsx("span",{style:{fontSize:".75rem"},children:r})]},r))})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "2rem"
  }}>
      <Spinner variant="dots" label="Chargement par points" />
      <Spinner variant="ring" label="Chargement circulaire" />
      <Spinner variant="double-ring" label="Chargement double cercle" />
    </div>
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "1.25rem"
  }}>
      <Spinner tone="primary" />
      <Spinner tone="neutral" />
      <Spinner tone="info" />
      <Spinner tone="success" />
      <Spinner tone="warning" />
      <Spinner tone="danger" />
    </div>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "double-ring",
    tone: "primary"
  },
  parameters: {
    docs: {
      description: {
        story: "Deux arcs concentriques : anneau intérieur plus petit et atténué, avec une rotation inverse plus rapide, comme sur mobile."
      }
    }
  },
  render: args => <div style={{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem"
  }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <div key={size} style={{
      display: "grid",
      justifyItems: "center",
      gap: ".75rem"
    }}>
          <Spinner {...args} variant="double-ring" size={size} label={\`Chargement double anneau \${size}\`} />
          <span style={{
        fontSize: ".75rem"
      }}>{size}</span>
        </div>)}
    </div>
}`,...i.parameters?.docs?.source}}};const u=["Playground","Variants","Tones","DoubleRing"];export{i as DoubleRing,a as Playground,t as Tones,s as Variants,u as __namedExportsOrder,m as default};
