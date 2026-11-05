import{r as m,j as f}from"./iframe-93ToM5gy.js";import{L as h}from"./index-C5McNaKz.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./use-format-Dn1QUkJK.js";import"./config-BYtg1vzt.js";import"./index-KUDRR3gp.js";import"./use-copy-to-clipboard-BbyNDTHN.js";import"./index-DDfi4-t_.js";import"./index-Ca-LLAC-.js";import"./index-CyYBDJlU.js";import"./geometry-Dzgyg8gY.js";import"./index-DqatgzX2.js";import"./index-BGC94N9u.js";import"./index-7NsXTHGM.js";import"./index-B7rcZNS2.js";import"./index-D1oauuee.js";import"./format-CiSXMYGS.js";const i=[["info","Récupération de l'image registry.local/atlas:2.14.0"],["debug","Couche sha256:9f2c… déjà présente, ignorée"],["info","Démarrage du conteneur atlas-web-1"],["debug","GET /healthz → 503 (le service démarre)"],["warn","Sonde de santé en échec, nouvelle tentative dans 2 s"],["info","Migration 0042_ajout_index_factures appliquée"],["debug","Pool PostgreSQL : 12 connexions ouvertes sur 20"],["error","Délai dépassé en attendant redis://cache.interne:6379 — la connexion a été refusée après 30 000 ms, vérifiez que le service est joignable depuis le réseau du conteneur."],["info","Bascule du trafic : 10 % → 50 %"],["success","Déploiement terminé en 48 s"]],S=new Date(2026,8,30,14,5,0).getTime();function u(e){const[t,r]=i[e%i.length];return{id:String(e),time:S+e*1e3,level:t,message:r,group:`Essai ${Math.floor(e/i.length)+1}`}}const E=Array.from({length:14},(e,t)=>u(t));function v({direct:e,loading:t,vide:r,height:l}){const[d,p]=m.useState(r?[]:E);return m.useEffect(()=>{if(!e||r)return;const g=setInterval(()=>p(c=>[...c,u(c.length)]),1e3);return()=>clearInterval(g)},[e,r]),f.jsx(h,{lines:d,height:l,loading:t,streaming:e&&!r,defaultCollapsedGroups:["Essai 1"]})}const M={title:"Données/LogStream",component:v,tags:["autodocs"],args:{direct:!0,loading:!1,vide:!1,height:"20rem"},parameters:{layout:"padded"}},s={},a={args:{direct:!1}},o={args:{direct:!1,vide:!0,loading:!0}},n={args:{direct:!1,vide:!0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    direct: false
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    direct: false,
    vide: true,
    loading: true
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    direct: false,
    vide: true
  }
}`,...n.parameters?.docs?.source}}};const P=["EnDirect","Termine","Chargement","Vide"];export{o as Chargement,s as EnDirect,a as Termine,n as Vide,P as __namedExportsOrder,M as default};
