import{j as e}from"./iframe-DQyRSC8n.js";import{c as f}from"./classname-nB6WhpaV.js";import{e as v,i as h}from"./index-C4BQ8rIf.js";import"./preload-helper-PPVm8Dsz.js";function _(s,a,n){return s.status?s.status:a<n?"done":a===n?"current":"upcoming"}function u({items:s,current:a=0,orientation:n="horizontal",size:d="md",onStepClick:p,className:m}){return e.jsx("ol",{className:f("sia-steps",`sia-steps--${n}`,`sia-steps--${d}`,m),children:s.map((t,i)=>{const o=_(t,i,a),y=!!p&&!t.disabled;return e.jsxs("li",{className:"sia-steps__item","data-status":o,...o==="current"?{"aria-current":"step"}:{},children:[e.jsxs("div",{className:"sia-steps__marker",children:[e.jsx("span",{className:"sia-steps__bullet",children:o==="done"?e.jsx(v,{}):o==="error"?e.jsx(h,{}):t.icon??e.jsx("span",{className:"sia-steps__number",children:i+1})}),i<s.length-1&&e.jsx("span",{className:"sia-steps__connector","aria-hidden":"true",children:e.jsx("span",{className:"sia-steps__connector-fill"})})]}),e.jsxs("div",{className:"sia-steps__body",children:[y?e.jsx("button",{type:"button",className:"sia-steps__title sia-steps__title--button",onClick:()=>p?.(t,i),children:t.title}):e.jsx("span",{className:"sia-steps__title",children:t.title}),t.description&&e.jsx("span",{className:"sia-steps__description",children:t.description})]})]},t.key)})})}u.__docgenInfo={description:`Une progression en étapes.

Le trait entre deux étapes se remplit plutôt que de changer de couleur d'un
coup : c'est ce qui donne le sens de la marche, vers l'avant.`,methods:[],displayName:"Steps",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"StepItem"}],raw:"StepItem[]"},description:""},current:{required:!1,tsType:{name:"number"},description:"Index de l'étape en cours. Ce qui précède est fait, ce qui suit à venir.",defaultValue:{value:"0",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: StepItem, index: number) => void",signature:{arguments:[{type:{name:"StepItem"},name:"item"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Rend les étapes cliquables — pour revenir en arrière dans un tunnel."},className:{required:!1,tsType:{name:"string"},description:""}}};const g=[{key:"compte",title:"Compte",description:"Identité du client"},{key:"adresse",title:"Adresse",description:"Facturation"},{key:"paiement",title:"Paiement",description:"Moyen et échéance"},{key:"revue",title:"Revue"}],b={title:"Navigation/Steps",component:u,tags:["autodocs"],args:{items:g,current:1,orientation:"horizontal",size:"md"},argTypes:{orientation:{control:"inline-radio",options:["horizontal","vertical"]},size:{control:"inline-radio",options:["sm","md"]},current:{control:{type:"range",min:0,max:3}}},parameters:{layout:"padded"}},c={},l={args:{orientation:"vertical",size:"sm"}},r={args:{current:3,items:[{key:"recu",title:"Reçu"},{key:"verifie",title:"Vérifié"},{key:"valide",title:"Validé"},{key:"paye",title:"Payé",status:"error",description:"Échec du prélèvement"}]}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{}",...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    size: "sm"
  }
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    current: 3,
    items: [{
      key: "recu",
      title: "Reçu"
    }, {
      key: "verifie",
      title: "Vérifié"
    }, {
      key: "valide",
      title: "Validé"
    }, {
      key: "paye",
      title: "Payé",
      status: "error",
      description: "Échec du prélèvement"
    }]
  }
}`,...r.parameters?.docs?.source},description:{story:"Une étape peut forcer son état, indépendamment de l'étape courante.",...r.parameters?.docs?.description}}};const q=["Playground","Vertical","EnEchec"];export{r as EnEchec,c as Playground,l as Vertical,q as __namedExportsOrder,b as default};
