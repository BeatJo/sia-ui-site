import{r as d,j as e}from"./iframe-93ToM5gy.js";import{B as m}from"./index-DDfi4-t_.js";import{D as r}from"./index-Bx8WbTQZ.js";import{S as g}from"./index-CTK5xlvt.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-Ca-LLAC-.js";import"./index-CyYBDJlU.js";import"./geometry-Dzgyg8gY.js";import"./index-DqatgzX2.js";import"./index-BGC94N9u.js";import"./use-outside-click-nOWfDOom.js";import"./overlay-layer-ClrU24vq.js";import"./index-B7rcZNS2.js";import"./config-BYtg1vzt.js";import"./index-CdUZj38H.js";function h({position:u,title:a}){const[t,s]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>s(!0),children:"Ouvrir"}),e.jsxs(r,{open:t,onOpenChange:s,position:u,children:[e.jsxs(r.Header,{children:[e.jsx(r.Title,{children:a}),e.jsx(r.Close,{})]}),e.jsx(r.Body,{children:e.jsx("p",{children:"Panneau contextuel sans quitter la page."})}),e.jsx(r.Footer,{children:e.jsx(m,{onClick:()=>s(!1),children:"Terminer"})})]})]})}const R={title:"Retour/Drawer",component:h,tags:["autodocs"],args:{position:"right",title:"Filtres avancés"},argTypes:{position:{control:"radio",options:["left","right","top","bottom"]}}},o={},n={args:{position:"left",title:"Navigation"}},i={args:{position:"right",title:"Filtres avancés"}},l={args:{position:"top",title:"Actions rapides"}},c={args:{position:"bottom",title:"Détails"}},p={render:()=>{const[u,a]=d.useState(!1),[t,s]=d.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>a(!0),children:"Configurer une variable"}),e.jsxs(r,{open:u,onOpenChange:a,children:[e.jsxs(r.Header,{children:[e.jsx(r.Title,{children:"Variables"}),e.jsx(r.Close,{})]}),e.jsxs(r.Body,{children:[e.jsx(g,{"aria-label":"Ressource",searchable:!0,options:[{value:"api",label:"API principale"},{value:"db",label:"Base PostgreSQL"}],value:t,onValueChange:s}),e.jsxs("p",{children:["Ressource : ",t||"aucune"]})]})]})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    position: "left",
    title: "Navigation"
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    position: "right",
    title: "Filtres avancés"
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    position: "top",
    title: "Actions rapides"
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    position: "bottom",
    title: "Détails"
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return <>
        <Button onClick={() => setOpen(true)}>Configurer une variable</Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <Drawer.Header>
            <Drawer.Title>Variables</Drawer.Title>
            <Drawer.Close />
          </Drawer.Header>
          <Drawer.Body>
            <Select aria-label="Ressource" searchable options={[{
            value: "api",
            label: "API principale"
          }, {
            value: "db",
            label: "Base PostgreSQL"
          }]} value={value} onValueChange={setValue} />
            <p>Ressource : {value || "aucune"}</p>
          </Drawer.Body>
        </Drawer>
      </>;
  }
}`,...p.parameters?.docs?.source}}};const T=["Playground","Gauche","Droite","Haut","Bas","SelectPortalisé"];export{c as Bas,i as Droite,n as Gauche,l as Haut,o as Playground,p as SelectPortalisé,T as __namedExportsOrder,R as default};
