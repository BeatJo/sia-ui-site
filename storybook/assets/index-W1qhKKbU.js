import{l as m,j as i}from"./iframe-Ce1rQf5z.js";import{c as p}from"./classname-nB6WhpaV.js";const f=.08,b=.85;function q({icon:e,size:r="1em",colored:a=!0,title:u,decorative:s=!1,className:d,style:t,...c}){const l=u??e.title,n=a?m(e.hex):void 0,o=n===void 0||Number.isNaN(n)?void 0:n<f?"dark":n>b?"light":void 0;return i.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:r,height:r,focusable:"false",...s?{"aria-hidden":!0}:{role:"img","aria-label":l},...c,className:p("sia-brand-icon",a&&"sia-brand-icon--colored",o&&`sia-brand-icon--${o}`,d),style:a?{"--sia-brand-icon-color":`#${e.hex.replace(/^#/,"")}`,...t}:t,children:[!s&&i.jsx("title",{children:l}),i.jsx("path",{d:e.path})]})}q.__docgenInfo={description:`Le logo d'un service tiers — Vercel, Supabase, GitHub — sans dépendance.

Le système ne livre aucun logo : il prend l'objet d'icône que le projet
importe lui-même, et ne dépend donc ni d'un paquet d'icônes ni de sa
version.

\`\`\`tsx
import { siVercel } from "simple-icons";
<BrandIcon icon={siVercel} />
\`\`\`

Une marque quasi noire (Vercel, GitHub) disparaîtrait sur un fond sombre,
une marque quasi blanche sur un fond clair : sur le thème où elle serait
illisible, elle prend la couleur du texte plutôt que la sienne.`,methods:[],displayName:"BrandIcon",props:{icon:{required:!0,tsType:{name:"BrandIconData"},description:""},size:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"La taille du carré. `1em` par défaut : l'icône suit le texte.",defaultValue:{value:'"1em"',computed:!1}},colored:{required:!1,tsType:{name:"boolean"},description:"La couleur de la marque (défaut), ou `currentColor` quand il vaut `false`.",defaultValue:{value:"true",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Le nom accessible. Par défaut, `icon.title`."},decorative:{required:!1,tsType:{name:"boolean"},description:"Masquée des lecteurs d'écran : l'icône accompagne un texte qui la nomme déjà.",defaultValue:{value:"false",computed:!1}}},composes:["Omit"]};export{q as B};
