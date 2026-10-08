import{r as s,j as p}from"./iframe-Ce1rQf5z.js";import{c as m}from"./classname-nB6WhpaV.js";const r=s.forwardRef(({onValueChange:i,invalid:e,className:n,...a},t)=>p.jsx("input",{...a,ref:t,type:"month",className:m("sia-month-picker",e&&"sia-picker--invalid",n),"aria-invalid":e||void 0,onChange:o=>i?.(o.target.value)}));r.displayName="MonthPicker";r.__docgenInfo={description:`Un mois, sans le jour.

C'est le grain d'un exercice comptable ou d'un rapport mensuel : demander
un jour obligerait à en choisir un arbitrairement, et le premier du mois
finirait par être pris pour une vraie date.`,methods:[],displayName:"MonthPicker",props:{onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""}},composes:["Omit"]};export{r as M};
