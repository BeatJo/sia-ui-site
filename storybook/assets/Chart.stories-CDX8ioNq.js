import{j as t}from"./iframe-DZg55ZNc.js";import{C as c,S as l}from"./index-33qFCKR-.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const d=["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août"],o=[820,932,901,1094,1290,1330,1220,1410],i=[610,640,700,712,880,910,860,940],y={title:"Données/Chart",component:c,tags:["autodocs"],args:{labels:d,type:"line",height:240,showGrid:!0,showAxis:!0,showLegend:!0,series:[{key:"ca",label:"Chiffre d'affaires",values:o},{key:"charges",label:"Charges",values:i,tone:"danger"}]},argTypes:{type:{control:"inline-radio",options:["line","area","bar"]},height:{control:{type:"range",min:120,max:400,step:20}}},parameters:{layout:"padded"}},r={},a={args:{type:"area",series:[{key:"ca",label:"Chiffre d'affaires",values:o}]}},s={args:{type:"bar"}},e={args:{series:[{key:"releves",label:"Relevés",values:[820,932,null,null,1290,1330,1220,1410]}]}},n={render:()=>t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.5rem"},children:[t.jsx(l,{values:o,width:160}),t.jsx(l,{values:i,tone:"danger",width:160,filled:!0})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: "area",
    series: [{
      key: "ca",
      label: "Chiffre d'affaires",
      values: CA
    }]
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "bar"
  }
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    series: [{
      key: "releves",
      label: "Relevés",
      values: [820, 932, null, null, 1290, 1330, 1220, 1410]
    }]
  }
}`,...e.parameters?.docs?.source},description:{story:"Un trou dans les données coupe le trait : une ligne droite se lirait comme une mesure.",...e.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "1.5rem"
  }}>
      <Sparkline values={CA} width={160} />
      <Sparkline values={CHARGES} tone="danger" width={160} filled />
    </div>
}`,...n.parameters?.docs?.source}}};const f=["Playground","Aire","Barres","DonneesManquantes","EnCellule"];export{a as Aire,s as Barres,e as DonneesManquantes,n as EnCellule,r as Playground,f as __namedExportsOrder,y as default};
