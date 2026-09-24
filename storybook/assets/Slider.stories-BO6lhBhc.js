import{j as n,r as u}from"./iframe-DQyRSC8n.js";import{S as s}from"./index-ptKfjOlk.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./geometry-Dzgyg8gY.js";import"./index-DUXvzsQk.js";import"./index-542shROb.js";import"./index-D7Pt3lB-.js";const R={title:"Saisie/Slider",component:s,tags:["autodocs"],args:{defaultValue:40,min:0,max:100,showValue:!0},parameters:{layout:"padded"}},e={},r={args:{range:!0,defaultValue:[20,75],minDistance:5,startLabel:"Prix minimum",endLabel:"Prix maximum",formatValue:t=>`${t} €`}};function i(){const[t,m]=u.useState([1e4,75e3]);return n.jsx(s,{range:!0,value:t,min:0,max:1e5,step:5e3,minDistance:1e4,onValueChange:o=>m(o),formatValue:o=>new Intl.NumberFormat("fr-FR",{style:"currency",currency:"XAF",maximumFractionDigits:0}).format(o)})}const a={render:()=>n.jsx(i,{})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    range: true,
    defaultValue: [20, 75],
    minDistance: 5,
    startLabel: "Prix minimum",
    endLabel: "Prix maximum",
    formatValue: value => \`\${value} €\`
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledRangeDemo />
}`,...a.parameters?.docs?.source}}};const S=["Playground","Range","ControlledRange"];export{a as ControlledRange,e as Playground,r as Range,S as __namedExportsOrder,R as default};
