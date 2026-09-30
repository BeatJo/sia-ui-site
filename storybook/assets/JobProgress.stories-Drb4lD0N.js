import{j as l,r as i}from"./iframe-DZg55ZNc.js";import{J as A}from"./index-Btglr4fF.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-B8R3hJdu.js";import"./index-DuZVuOGI.js";import"./index-C4J2vyTj.js";import"./index-KtcO7v1s.js";import"./index-CXaKiedc.js";import"./index---dMz_C1.js";import"./geometry-Dzgyg8gY.js";import"./index-DqtlrErT.js";import"./index-CSjWD8Sr.js";import"./index-BTtNuupJ.js";import"./format-CiSXMYGS.js";import"./index-CQmahjcO.js";import"./index-BTe7CKvC.js";const e=[{key:"clone",title:"Récupération du dépôt"},{key:"install",title:"Installation des dépendances"},{key:"build",title:"Construction"},{key:"deploy",title:"Mise en ligne"}],u="2026-09-29T18:00:00Z",g="2026-09-29T18:03:27Z",N={title:"Retour/JobProgress",component:A,tags:["autodocs"],args:{title:"Déploiement de atlas-api",status:"running",onCancel:()=>{},onRetry:()=>{},style:{maxWidth:"34rem"}},argTypes:{status:{control:"inline-radio",options:["queued","running","succeeded","failed","cancelled"]},progress:{control:{type:"range",min:0,max:100}}},parameters:{layout:"padded"}},c={args:{progress:42,step:"Construction de l'image",attempts:{current:1,max:3}}},r={args:{status:"queued"}},t={args:{status:"running",progress:42,step:"Construction de l'image",attempts:{current:2,max:3},startedAt:new Date(Date.now()-83e3).toISOString(),steps:e,currentStep:2}},d={args:{status:"succeeded",progress:100,startedAt:u,finishedAt:g,steps:e}},s={args:{status:"failed",progress:61,step:"Construction de l'image",attempts:{current:3,max:3},startedAt:u,finishedAt:g,steps:e,currentStep:2,error:"La commande « pnpm build » s'est arrêtée avec le code 1."}},p={args:{status:"cancelled",progress:18,startedAt:u,finishedAt:g}},a={args:{status:"running",startedAt:u,logs:l.jsx("pre",{style:{margin:0,padding:".75rem",maxHeight:"10rem",overflow:"auto",borderRadius:"var(--sia-radius)",border:"1px solid var(--sia-border)",background:"var(--sia-surface)",color:"var(--sia-muted)",fontSize:".75rem"},children:`> pnpm install
Lockfile is up to date
> pnpm build
vite v7 building for production…`})}};function b(){const[m,v]=i.useState(0),[E]=i.useState(()=>new Date().toISOString()),[S,x]=i.useState(),o=m===100;i.useEffect(()=>{if(o){x(new Date().toISOString());return}const h=window.setInterval(()=>v(y=>Math.min(100,y+4)),400);return()=>window.clearInterval(h)},[o]);const f=Math.min(e.length-1,Math.floor(m/25));return l.jsx(A,{title:"Déploiement de atlas-api",style:{maxWidth:"34rem"},status:o?"succeeded":"running",progress:m,step:o?void 0:e[f]?.title,steps:e,currentStep:f,startedAt:E,...S?{finishedAt:S}:{},onCancel:()=>{}})}const n={render:()=>l.jsx(b,{})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    progress: 42,
    step: "Construction de l'image",
    attempts: {
      current: 1,
      max: 3
    }
  }
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    status: "queued"
  }
}`,...r.parameters?.docs?.source},description:{story:"Sans `progress`, la barre passe en indéterminé.",...r.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    status: "running",
    progress: 42,
    step: "Construction de l'image",
    attempts: {
      current: 2,
      max: 3
    },
    // Un départ récent : c'est une opération en cours, la durée doit le dire.
    startedAt: new Date(Date.now() - 83_000).toISOString(),
    steps: ETAPES,
    currentStep: 2
  }
}`,...t.parameters?.docs?.source},description:{story:"La durée avance d'elle-même tant que `finishedAt` manque.",...t.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    status: "succeeded",
    progress: 100,
    startedAt: DEBUT,
    finishedAt: FIN,
    steps: ETAPES
  }
}`,...d.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: "failed",
    progress: 61,
    step: "Construction de l'image",
    attempts: {
      current: 3,
      max: 3
    },
    startedAt: DEBUT,
    finishedAt: FIN,
    steps: ETAPES,
    currentStep: 2,
    error: "La commande « pnpm build » s'est arrêtée avec le code 1."
  }
}`,...s.parameters?.docs?.source},description:{story:"L'étape courante passe en erreur ; seule la relance est proposée.",...s.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    status: "cancelled",
    progress: 18,
    startedAt: DEBUT,
    finishedAt: FIN
  }
}`,...p.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    status: "running",
    startedAt: DEBUT,
    logs: <pre style={{
      margin: 0,
      padding: ".75rem",
      maxHeight: "10rem",
      overflow: "auto",
      borderRadius: "var(--sia-radius)",
      border: "1px solid var(--sia-border)",
      background: "var(--sia-surface)",
      color: "var(--sia-muted)",
      fontSize: ".75rem"
    }}>
        {"> pnpm install\\nLockfile is up to date\\n> pnpm build\\nvite v7 building for production…"}
      </pre>
  }
}`,...a.parameters?.docs?.source},description:{story:"Un emplacement libre sous le reste : ici une simple sortie de commande.",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Simulation />
}`,...n.parameters?.docs?.source},description:{story:"La progression avance toute seule, jusqu'à la réussite.",...n.parameters?.docs?.description}}};const _=["Playground","EnFile","EnCours","Terminee","Echec","Annulee","AvecJournal","Simulee"];export{p as Annulee,a as AvecJournal,s as Echec,t as EnCours,r as EnFile,c as Playground,n as Simulee,d as Terminee,_ as __namedExportsOrder,N as default};
