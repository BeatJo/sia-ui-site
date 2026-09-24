import"./iframe-DQyRSC8n.js";import{C as n}from"./index-BIhygMh5.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-C4BQ8rIf.js";const m={title:"Dates et heures/Calendar",component:n,tags:["autodocs"],args:{defaultValue:"2026-06-14",locale:"fr-FR",firstDayOfWeek:1,tone:"primary"},parameters:{layout:"padded"}},e={},a={args:{defaultMode:"year",tone:"info"}},r={args:{showWeek:!0,tone:"neutral"}},s={args:{selectionMode:"range",defaultRange:{start:"2026-06-08",end:"2026-06-18"},tone:"success"}},o={args:{tone:"warning",disabledDate:t=>[0,6].includes(new Date(`${t}T12:00:00`).getDay())}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    defaultMode: "year",
    tone: "info"
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    showWeek: true,
    tone: "neutral"
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    selectionMode: "range",
    defaultRange: {
      start: "2026-06-08",
      end: "2026-06-18"
    },
    tone: "success"
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tone: "warning",
    disabledDate: value => [0, 6].includes(new Date(\`\${value}T12:00:00\`).getDay())
  }
}`,...o.parameters?.docs?.source}}};const p=["Playground","YearMode","WithWeekNumbers","RangeSelection","DisabledWeekends"];export{o as DisabledWeekends,e as Playground,s as RangeSelection,r as WithWeekNumbers,a as YearMode,p as __namedExportsOrder,m as default};
