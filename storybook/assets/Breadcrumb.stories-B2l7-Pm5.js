import{j as a,r as y}from"./iframe-DQyRSC8n.js";import{c as x}from"./classname-nB6WhpaV.js";import{u as g}from"./config-BUwt5-xE.js";import{h as k,c as _}from"./index-C4BQ8rIf.js";import{D as j}from"./index-ClxP7LXx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BzRy_9hL.js";import"./index-542shROb.js";import"./index-D7Pt3lB-.js";import"./geometry-Dzgyg8gY.js";function u({items:r,maxVisible:d=4,separator:m,ariaLabel:p,className:b}){const i=g(),h=m??a.jsx(_,{}),o=r.length>d?r.slice(1,-2):[],c=o.length>0?[r[0],null,...r.slice(-2)]:r,f=o.map((e,n)=>({key:e.key??`overflow-${n}`,label:e.label,...e.icon!==void 0?{icon:e.icon}:{},onSelect:()=>{e.onClick?e.onClick():e.href&&typeof window<"u"&&window.location.assign(e.href)}}));return a.jsx("nav",{className:x("sia-breadcrumb",b),"aria-label":p??i.breadcrumb,children:a.jsx("ol",{children:c.map((e,n)=>{const t=n===c.length-1;return a.jsxs(y.Fragment,{children:[a.jsx("li",{className:"sia-breadcrumb__item",children:e===null?a.jsx(j,{items:f,children:a.jsx("button",{type:"button",className:"sia-breadcrumb__more","aria-label":i.more,children:a.jsx(k,{})})}):t?a.jsxs("span",{className:"sia-breadcrumb__current","aria-current":"page",children:[e.icon&&a.jsx("span",{className:"sia-breadcrumb__icon","aria-hidden":"true",children:e.icon}),e.label]}):e.href?a.jsxs("a",{className:"sia-breadcrumb__link",href:e.href,onClick:e.onClick,children:[e.icon&&a.jsx("span",{className:"sia-breadcrumb__icon","aria-hidden":"true",children:e.icon}),e.label]}):a.jsxs("button",{type:"button",className:"sia-breadcrumb__link",onClick:e.onClick,children:[e.icon&&a.jsx("span",{className:"sia-breadcrumb__icon","aria-hidden":"true",children:e.icon}),e.label]})}),!t&&a.jsx("li",{className:"sia-breadcrumb__separator","aria-hidden":"true",children:h})]},e?e.key??n:"overflow")})})})}u.__docgenInfo={description:`Le chemin parcouru.

Le dernier élément n'est jamais un lien : c'est la page courante, et un
lien vers l'endroit où l'on se trouve déjà n'existe pas.`,methods:[],displayName:"Breadcrumb",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:""},maxVisible:{required:!1,tsType:{name:"number"},description:`Au-delà, les niveaux intermédiaires passent dans un menu. Le premier et
les deux derniers restent toujours visibles : ce sont les seuls dont on
ait vraiment besoin pour se situer.`,defaultValue:{value:"4",computed:!1}},separator:{required:!1,tsType:{name:"ReactNode"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const L={title:"Navigation/Breadcrumb",component:u,tags:["autodocs"],args:{maxVisible:4,items:[{key:"accueil",label:"Accueil",href:"#"},{key:"clients",label:"Clients",href:"#"},{key:"fiche",label:"SIA Technologies"}]},argTypes:{maxVisible:{control:{type:"number",min:2,max:8}}},parameters:{layout:"padded"}},l={},s={args:{items:[{key:"accueil",label:"Accueil",href:"#"},{key:"agences",label:"Agences",href:"#"},{key:"douala",label:"Douala",href:"#"},{key:"clients",label:"Clients",href:"#"},{key:"sia",label:"SIA Technologies",href:"#"},{key:"facture",label:"Facture 2026-0184"}]}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      key: "accueil",
      label: "Accueil",
      href: "#"
    }, {
      key: "agences",
      label: "Agences",
      href: "#"
    }, {
      key: "douala",
      label: "Douala",
      href: "#"
    }, {
      key: "clients",
      label: "Clients",
      href: "#"
    }, {
      key: "sia",
      label: "SIA Technologies",
      href: "#"
    }, {
      key: "facture",
      label: "Facture 2026-0184"
    }]
  }
}`,...s.parameters?.docs?.source},description:{story:"Au-delà de `maxVisible`, les niveaux du milieu passent dans un menu.",...s.parameters?.docs?.description}}};const R=["Playground","NiveauxReplies"];export{s as NiveauxReplies,l as Playground,R as __namedExportsOrder,L as default};
