import{r as l,j as s}from"./iframe-DQyRSC8n.js";import{c as y}from"./classname-nB6WhpaV.js";import{u as S}from"./config-BUwt5-xE.js";import{I as j}from"./index-BvKA8DNz.js";import{E as _,g as E}from"./index-C4BQ8rIf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Ce4u6n81.js";const I=["Très faible","Faible","Moyen","Bon","Excellent"];function P(e){if(!e)return{score:0,label:""};let a=0;return e.length>=8&&(a+=1),e.length>=12&&(a+=1),/[a-z]/.test(e)&&/[A-Z]/.test(e)&&(a+=1),/\d/.test(e)&&/[^\w\s]/.test(e)&&(a+=1),{score:a,label:I[a]??""}}const u=l.forwardRef(({showStrength:e=!1,hideToggle:a=!1,evaluate:p=P,className:f,value:t,onChange:g,...h},b)=>{const m=S(),[r,w]=l.useState(!1),[v,x]=l.useState(""),c=t!==void 0?String(t):v,i=l.useMemo(()=>e?p(c):null,[c,p,e]);return s.jsxs("div",{className:y("sia-password",f),children:[s.jsx(j,{...h,ref:b,type:r?"text":"password",...t!==void 0?{value:t}:{},onChange:o=>{t===void 0&&x(o.target.value),g?.(o)},right:a?void 0:s.jsx("button",{type:"button",className:"sia-password__toggle",tabIndex:-1,"aria-label":r?m.hidePassword:m.showPassword,"aria-pressed":r,onClick:()=>w(!r),children:r?s.jsx(_,{}):s.jsx(E,{})})}),i&&c&&s.jsxs("div",{className:"sia-password__strength","data-score":i.score,children:[s.jsx("div",{className:"sia-password__bars","aria-hidden":"true",children:[0,1,2,3].map(o=>s.jsx("span",{"data-filled":o<i.score||void 0},o))}),s.jsx("span",{className:"sia-password__label",role:"status",children:i.label})]})]})});u.displayName="PasswordInput";u.__docgenInfo={description:`Un champ de mot de passe.

Le bouton d'affichage n'est pas un confort : sur mobile, taper une phrase
de passe à l'aveugle est la première raison pour laquelle les gens en
choisissent une courte.`,methods:[],displayName:"PasswordInput",props:{showStrength:{required:!1,tsType:{name:"boolean"},description:"Affiche une jauge sous le champ.",defaultValue:{value:"false",computed:!1}},hideToggle:{required:!1,tsType:{name:"boolean"},description:"Retire le bouton d'affichage — pour un champ de confirmation.",defaultValue:{value:"false",computed:!1}},evaluate:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => PasswordStrength",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"PasswordStrength"}}},description:"Remplace l'évaluation par défaut. Un projet qui utilise `zxcvbn` branche\nson résultat ici; le composant ne dépend de rien.",defaultValue:{value:`function defaultEvaluate(value: string): PasswordStrength {
  if (!value) return { score: 0, label: "" };

  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\\d/.test(value) && /[^\\w\\s]/.test(value)) score += 1;

  return { score, label: LABELS[score] ?? "" };
}`,computed:!1}}},composes:["Omit"]};const V={title:"Saisie/PasswordInput",component:u,tags:["autodocs"],args:{placeholder:"Mot de passe",showStrength:!0,hideToggle:!1},parameters:{layout:"padded"}},d={},n={args:{placeholder:"Confirmation",showStrength:!1,hideToggle:!0}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{}",...d.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Confirmation",
    showStrength: false,
    hideToggle: true
  }
}`,...n.parameters?.docs?.source},description:{story:"Le champ de confirmation n'a pas de bouton d'affichage : il se compare, il ne se lit pas.",...n.parameters?.docs?.description}}};const z=["Playground","Confirmation"];export{n as Confirmation,d as Playground,z as __namedExportsOrder,V as default};
