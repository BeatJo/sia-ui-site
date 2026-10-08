import{r as o,j as d}from"./iframe-Ce1rQf5z.js";import{c as p}from"./classname-nB6WhpaV.js";const n=o.forwardRef(({onValueChange:a,invalid:e,className:i,...s},r)=>d.jsx("input",{...s,ref:r,type:"week",className:p("sia-week-picker",e&&"sia-picker--invalid",i),"aria-invalid":e||void 0,onChange:t=>a?.(t.target.value)}));n.displayName="WeekPicker";n.__docgenInfo={description:`Une semaine, désignée par son numéro.

Le numéro de semaine est l'unité des plannings et des relevés d'activité,
et il ne se déduit pas d'une date sans convention — celle du navigateur
est celle de la norme ISO.`,methods:[],displayName:"WeekPicker",props:{onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""}},composes:["Omit"]};export{n as W};
