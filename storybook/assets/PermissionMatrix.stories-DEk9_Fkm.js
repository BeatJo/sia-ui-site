import"./iframe-Ce1rQf5z.js";import{P as t}from"./index-DDuX_11-.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-Dqi_o6Nd.js";const n=[{domain:"projects",label:"Projets",actions:[{action:"read",label:"Lire les projets"},{action:"create",label:"Créer un projet"},{action:"delete",label:"Supprimer un projet"}]},{domain:"operations",label:"Opérations",actions:[{action:"read",label:"Lire les opérations"},{action:"retry",label:"Relancer une opération"}]}],u={title:"Saisie/PermissionMatrix",component:t,tags:["autodocs"],args:{groups:n,defaultValue:["projects.read"],"aria-label":"Permissions du rôle"}},e={},r={args:{canGrant:o=>!o.includes("delete")}},a={args:{allowWildcard:!1}},s={args:{disabled:!0,defaultValue:["projects.*"]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    canGrant: permission => !permission.includes("delete")
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    allowWildcard: false
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: ["projects.*"]
  }
}`,...s.parameters?.docs?.source}}};const m=["Playground","DroitsLimites","SansJokers","LectureSeule"];export{r as DroitsLimites,s as LectureSeule,e as Playground,a as SansJokers,m as __namedExportsOrder,u as default};
