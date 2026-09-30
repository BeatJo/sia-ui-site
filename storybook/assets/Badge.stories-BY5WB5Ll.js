import{j as e}from"./iframe-DZg55ZNc.js";import{B as r,S as c}from"./index-C4J2vyTj.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-KtcO7v1s.js";const f={title:"Primitives/Badge",component:r,tags:["autodocs"],args:{children:"Actif",tone:"success",variant:"soft",loading:!1},argTypes:{tone:{control:"select",options:["neutral","primary","success","warning","danger"]},variant:{control:"radio",options:["soft","solid","outline"]}}},a={},t={args:{left:"●",right:"12",children:"Notifications",tone:"primary"}},s={args:{loading:!0,children:"Synchronisation",tone:"primary"}},o={args:{loading:!0,children:"Traitement",tone:"warning",spinnerProps:{variant:"dots"}}},i={render:()=>e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap"},children:[e.jsx(r,{children:"Neutre"}),e.jsx(r,{tone:"primary",children:"Info"}),e.jsx(r,{tone:"success",children:"Actif"}),e.jsx(r,{tone:"warning",children:"En attente"}),e.jsx(r,{tone:"danger",children:"Bloqué"})]})},l={tones:{payee:"success",attente:"warning",annulee:"danger"},labels:{payee:"Payée",attente:"En attente",annulee:"Annulée"}},n={render:()=>e.jsx("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap"},children:["payee","attente","annulee","archivee"].map(d=>e.jsx(c,{value:d,...l},d))})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    left: "●",
    right: "12",
    children: "Notifications",
    tone: "primary"
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: "Synchronisation",
    tone: "primary"
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: "Traitement",
    tone: "warning",
    spinnerProps: {
      variant: "dots"
    }
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: ".5rem",
    flexWrap: "wrap"
  }}>
      <Badge>Neutre</Badge>
      <Badge tone="primary">Info</Badge>
      <Badge tone="success">Actif</Badge>
      <Badge tone="warning">En attente</Badge>
      <Badge tone="danger">Bloqué</Badge>
    </div>
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: ".5rem",
    flexWrap: "wrap"
  }}>
      {["payee", "attente", "annulee", "archivee"].map(valeur => <StatusBadge key={valeur} value={valeur} {...STATUTS} />)}
    </div>
}`,...n.parameters?.docs?.source},description:{story:`Une table par domaine, déclarée une fois : ton et libellé suivent la
valeur. Une valeur inconnue reste visible, en neutre.`,...n.parameters?.docs?.description}}};const h=["Playground","WithSides","Loading","LoadingDots","Tones","Statut"];export{s as Loading,o as LoadingDots,a as Playground,n as Statut,i as Tones,t as WithSides,h as __namedExportsOrder,f as default};
