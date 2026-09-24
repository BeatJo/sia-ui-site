import{r as g,j as e}from"./iframe-DQyRSC8n.js";import{I as h}from"./index-BvKA8DNz.js";import{c as b}from"./classname-nB6WhpaV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Ce4u6n81.js";import"./config-BUwt5-xE.js";const r=g.forwardRef(({className:d,children:c,required:l,muted:u,tone:i,...p},m)=>e.jsxs("label",{ref:m,className:b("sia-label",u&&"sia-label--muted",i&&`sia-label--${i}`,d),...p,children:[c,l&&e.jsx("span",{className:"sia-label__required","aria-hidden":"true",children:"*"})]}));r.displayName="SiaLabel";r.__docgenInfo={description:`Le nom d'un champ.

L'astérisque d'obligation est portée par une prop plutôt qu'écrite dans
le texte : elle reçoit ainsi un \`aria-hidden\`, et le champ est annoncé
« obligatoire » plutôt que « nom étoile ».`,methods:[],displayName:"SiaLabel",props:{tone:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof semanticColors)[number]"},description:"Le ton du libellé. Par défaut, la couleur du texte courant."},required:{required:!1,tsType:{name:"boolean"},description:"Marque le champ comme obligatoire d'une astérisque."},muted:{required:!1,tsType:{name:"boolean"},description:"Atténue le libellé — une mention secondaire, une unité."}}};const j={title:"Saisie/Label",component:r,tags:["autodocs"],args:{children:"Raison sociale",required:!1,muted:!1},argTypes:{tone:{control:"select",options:[void 0,"neutral","primary","info","success","warning","danger"]}},parameters:{layout:"padded"}},o={},a={args:{required:!0}},s={args:{muted:!0,children:"en francs CFA"}},t={render:()=>e.jsxs("div",{style:{display:"grid",gap:".5rem"},children:[e.jsx(r,{children:"Sans ton — la couleur du texte courant"}),e.jsx(r,{tone:"primary",children:"Primaire"}),e.jsx(r,{tone:"success",children:"Succès"}),e.jsx(r,{tone:"warning",children:"Avertissement"}),e.jsx(r,{tone:"danger",children:"Erreur"})]})},n={render:()=>e.jsxs("div",{style:{display:"grid",gap:".35rem",maxWidth:"20rem"},children:[e.jsx(r,{htmlFor:"raison-sociale",required:!0,children:"Raison sociale"}),e.jsx(h,{id:"raison-sociale",placeholder:"SIA Technologies"})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...a.parameters?.docs?.source},description:{story:"L'astérisque est décorative : `aria-required` sur le champ porte le sens.",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    muted: true,
    children: "en francs CFA"
  }
}`,...s.parameters?.docs?.source},description:{story:"Une mention secondaire — une unité, un rappel de format.",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source},description:{story:"Ce à quoi il sert : nommer un champ, et l'atteindre au clic.",...n.parameters?.docs?.description}}};const v=["Playground","Required","Muted","Tones","SurUnChamp"];export{s as Muted,o as Playground,a as Required,n as SurUnChamp,t as Tones,v as __namedExportsOrder,j as default};
