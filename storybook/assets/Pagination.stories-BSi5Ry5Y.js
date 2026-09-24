import{r as u,j as g}from"./iframe-DQyRSC8n.js";import{P as l}from"./index-TmteOLub.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./config-BUwt5-xE.js";import"./index-C4BQ8rIf.js";function d({totalPages:t,jumpTo:o,showTotal:n,compact:c,siblingCount:p}){const[i,m]=u.useState(1);return g.jsx(l,{page:i,totalPages:t,onPageChange:m,jumpTo:o,showTotal:n,compact:c,siblingCount:p})}const j={title:"Navigation/Pagination",component:d,tags:["autodocs"],args:{totalPages:40,jumpTo:!0,showTotal:!0,compact:!1,siblingCount:1},argTypes:{totalPages:{control:{type:"range",min:1,max:100}},siblingCount:{control:{type:"range",min:0,max:3}}},parameters:{layout:"padded"}},r={},a={args:{jumpTo:!1,showTotal:!1}},s={args:{compact:!0}},e={args:{totalPages:1}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    jumpTo: false,
    showTotal: false
  }
}`,...a.parameters?.docs?.source},description:{story:"Sur quarante pages, atteindre la vingt-septième par les ellipses est pénible.",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    compact: true
  }
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    totalPages: 1
  }
}`,...e.parameters?.docs?.source},description:{story:"Sous deux pages, le composant ne s'affiche pas du tout.",...e.parameters?.docs?.description}}};const h=["Playground","SansSautDirect","Compact","UneSeulePage"];export{s as Compact,r as Playground,a as SansSautDirect,e as UneSeulePage,h as __namedExportsOrder,j as default};
