import{r as n,j as f}from"./iframe-DZg55ZNc.js";import{P as h}from"./index-C3HbhSuj.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-DuZVuOGI.js";import"./index-G1Ik1XVs.js";import"./index-BgRshfHl.js";import"./index-DqtlrErT.js";import"./index-CSjWD8Sr.js";import"./geometry-Dzgyg8gY.js";import"./index-KtcO7v1s.js";function x({totalPages:i,jumpTo:p,showTotal:c,compact:m,siblingCount:g,pageSizeChoice:u}){const[l,t]=n.useState(1),[d,S]=n.useState(20);return f.jsx(h,{page:l,totalPages:i,onPageChange:t,jumpTo:p,showTotal:c,compact:m,siblingCount:g,...u?{pageSize:d,onPageSizeChange:P=>{S(P),t(1)}}:{}})}const _={title:"Navigation/Pagination",component:x,tags:["autodocs"],args:{totalPages:40,jumpTo:!0,showTotal:!0,compact:!1,siblingCount:1,pageSizeChoice:!0},argTypes:{totalPages:{control:{type:"range",min:1,max:100}},siblingCount:{control:{type:"range",min:0,max:3}}},parameters:{layout:"padded"}},s={},e={args:{jumpTo:!1,showTotal:!1}},a={args:{pageSizeChoice:!1}},o={args:{compact:!0}},r={args:{totalPages:1}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    jumpTo: false,
    showTotal: false
  }
}`,...e.parameters?.docs?.source},description:{story:"Sur quarante pages, atteindre la vingt-septième par les ellipses est pénible.",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    pageSizeChoice: false
  }
}`,...a.parameters?.docs?.source},description:{story:"Le choix du nombre de lignes, retiré.",...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    compact: true
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    totalPages: 1
  }
}`,...r.parameters?.docs?.source},description:{story:`Sous deux pages, seuls restent les réglages de taille : après avoir choisi
100 lignes, il faut pouvoir revenir à 10. Sans eux, rien ne s'affiche.`,...r.parameters?.docs?.description}}};const q=["Playground","SansSautDirect","SansTailleDePage","Compact","UneSeulePage"];export{o as Compact,s as Playground,e as SansSautDirect,a as SansTailleDePage,r as UneSeulePage,q as __namedExportsOrder,_ as default};
