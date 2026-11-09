import{r as c,j as e}from"./iframe-D9A-l6Om.js";import{B as t}from"./index-m-1DTyke.js";import{M as p}from"./index-BIAmnpV2.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-uYvKTB3s.js";import"./index-Cdnbtvb3.js";import"./geometry-Dzgyg8gY.js";import"./index-CcL1tRwO.js";import"./index-CINEKHQq.js";import"./use-outside-click-DDLKuUo7.js";import"./overlay-layer-BI4MT5i1.js";import"./index-CM5jkExh.js";function u({title:l,description:n,closeOnBackdrop:o}){const[i,r]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(t,{onClick:()=>r(!0),children:"Ouvrir"}),e.jsx(p,{open:i,onOpenChange:r,title:l,description:n,closeOnBackdrop:o,footer:e.jsxs(e.Fragment,{children:[e.jsx(t,{variant:"ghost",onClick:()=>r(!1),children:"Annuler"}),e.jsx(t,{onClick:()=>r(!1),children:"Confirmer"})]}),children:e.jsx("p",{children:"Vérifiez les informations avant de poursuivre."})})]})}const S={title:"Retour/Modal",component:u,tags:["autodocs"],args:{title:"Confirmer l'opération",description:"Cette action sera enregistrée.",closeOnBackdrop:!0}},s={},a={render:()=>{const[l,n]=c.useState(!1),[o,i]=c.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(t,{onClick:()=>n(!0),children:"Créer une ressource"}),e.jsxs(p,{title:"Nouvelle ressource",open:l,onOpenChange:r=>n(r),footer:e.jsx(t,{onClick:()=>n(!1),children:"Enregistrer"}),children:[e.jsxs("label",{children:["Nom",e.jsx("input",{"aria-label":"Nom",value:o,onChange:r=>i(r.target.value)})]}),e.jsxs("p",{children:["Aperçu : ",o]})]})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    return <>
        <Button onClick={() => setOpen(true)}>Créer une ressource</Button>
        <Modal title="Nouvelle ressource" open={open} onOpenChange={next => setOpen(next)} footer={<Button onClick={() => setOpen(false)}>Enregistrer</Button>}>
          <label>
            Nom
            <input aria-label="Nom" value={name} onChange={event => setName(event.target.value)} />
          </label>
          <p>Aperçu : {name}</p>
        </Modal>
      </>;
  }
}`,...a.parameters?.docs?.source}}};const M=["Playground","FormulaireContrôlé"];export{a as FormulaireContrôlé,s as Playground,M as __namedExportsOrder,S as default};
