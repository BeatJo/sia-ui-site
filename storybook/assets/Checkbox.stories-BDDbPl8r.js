import{j as e,r as i}from"./iframe-DQyRSC8n.js";import{C as r,a as n}from"./index-BgR4VZMf.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const h={title:"Saisie/Checkbox",component:r,tags:["autodocs"],args:{label:"Recevoir les notifications",description:"Les alertes importantes seront envoyées par e-mail.",defaultChecked:!0,tone:"primary"}},a={},o={args:{indeterminate:!0,defaultChecked:!1}};function l(){const[c,u]=i.useState(["email"]);return e.jsxs(n,{value:c,onValueChange:u,tone:"success",children:[e.jsx(r,{value:"email",label:"E-mail"}),e.jsx(r,{value:"sms",label:"SMS"}),e.jsx(r,{value:"push",label:"Push"})]})}const t={render:()=>e.jsx(l,{})},s={render:()=>e.jsxs(n,{defaultValue:["read"],variant:"button",orientation:"horizontal",tone:"info",children:[e.jsx(r,{value:"read",children:"Lecture"}),e.jsx(r,{value:"write",children:"Écriture"}),e.jsx(r,{value:"admin",children:"Admin"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    defaultChecked: false
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <GroupDemo />
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxGroup defaultValue={["read"]} variant="button" orientation="horizontal" tone="info">
      <Checkbox value="read">Lecture</Checkbox>
      <Checkbox value="write">Écriture</Checkbox>
      <Checkbox value="admin">Admin</Checkbox>
    </CheckboxGroup>
}`,...s.parameters?.docs?.source}}};const b=["Playground","Indeterminate","Group","ButtonGroup"];export{s as ButtonGroup,t as Group,o as Indeterminate,a as Playground,b as __namedExportsOrder,h as default};
