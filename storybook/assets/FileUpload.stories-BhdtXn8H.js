import{r as n,j as e}from"./iframe-D9A-l6Om.js";import{F as a}from"./index-Cm1gZ5p-.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const m={title:"Saisie/FileUpload",component:a,tags:["autodocs"],args:{label:"Ajouter un justificatif",description:"PDF, JPG ou PNG",accept:".pdf,image/*"},parameters:{layout:"padded"}},r={},t={render:()=>{const[i,o]=n.useState([]);return e.jsxs(e.Fragment,{children:[e.jsx(a,{directory:!0,maxFiles:500,maxTotalSize:25*1024*1024,onEntriesChange:o}),e.jsx("ul",{"aria-label":"Fichiers sélectionnés",children:i.map(s=>e.jsxs("li",{children:[s.relativePath," — ",s.file.size," octets"]},s.relativePath))})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [entries, setEntries] = useState<FileUploadEntry[]>([]);
    return <>
        <FileUpload directory maxFiles={500} maxTotalSize={25 * 1024 * 1024} onEntriesChange={setEntries} />
        <ul aria-label="Fichiers sélectionnés">
          {entries.map(entry => <li key={entry.relativePath}>
              {entry.relativePath} — {entry.file.size} octets
            </li>)}
        </ul>
      </>;
  }
}`,...t.parameters?.docs?.source}}};const u=["Playground","Dossier"];export{t as Dossier,r as Playground,u as __namedExportsOrder,m as default};
