import{j as e}from"./iframe-DZg55ZNc.js";import{I as i}from"./index-Bqjpn0Yf.js";import{L as r}from"./index-DHTa1YQj.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-KtcO7v1s.js";const g={title:"Saisie/Label",component:r,tags:["autodocs"],args:{children:"Raison sociale",required:!1,muted:!1},argTypes:{tone:{control:"select",options:[void 0,"neutral","primary","info","success","warning","danger"]}},parameters:{layout:"padded"}},o={},s={args:{required:!0}},a={args:{muted:!0,children:"en francs CFA"}},t={render:()=>e.jsxs("div",{style:{display:"grid",gap:".5rem"},children:[e.jsx(r,{children:"Sans ton — la couleur du texte courant"}),e.jsx(r,{tone:"primary",children:"Primaire"}),e.jsx(r,{tone:"success",children:"Succès"}),e.jsx(r,{tone:"warning",children:"Avertissement"}),e.jsx(r,{tone:"danger",children:"Erreur"})]})},n={render:()=>e.jsxs("div",{style:{display:"grid",gap:".35rem",maxWidth:"20rem"},children:[e.jsx(r,{htmlFor:"raison-sociale",required:!0,children:"Raison sociale"}),e.jsx(i,{id:"raison-sociale",placeholder:"SIA Technologies"})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...s.parameters?.docs?.source},description:{story:"L'astérisque est décorative : `aria-required` sur le champ porte le sens.",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    muted: true,
    children: "en francs CFA"
  }
}`,...a.parameters?.docs?.source},description:{story:"Une mention secondaire — une unité, un rappel de format.",...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gap: ".5rem"
  }}>
      <Label>Sans ton — la couleur du texte courant</Label>
      <Label tone="primary">Primaire</Label>
      <Label tone="success">Succès</Label>
      <Label tone="warning">Avertissement</Label>
      <Label tone="danger">Erreur</Label>
    </div>
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gap: ".35rem",
    maxWidth: "20rem"
  }}>
      <Label htmlFor="raison-sociale" required>
        Raison sociale
      </Label>
      <Input id="raison-sociale" placeholder="SIA Technologies" />
    </div>
}`,...n.parameters?.docs?.source},description:{story:"Ce à quoi il sert : nommer un champ, et l'atteindre au clic.",...n.parameters?.docs?.description}}};const h=["Playground","Required","Muted","Tones","SurUnChamp"];export{a as Muted,o as Playground,s as Required,n as SurUnChamp,t as Tones,h as __namedExportsOrder,g as default};
