import{r as L,u as $,j as t}from"./iframe-Ce1rQf5z.js";import{c as A}from"./classname-nB6WhpaV.js";import{C}from"./index-Dqi_o6Nd.js";function N({groups:x,value:u,defaultValue:y=[],onValueChange:k,disabled:c=!1,canGrant:d=()=>!0,allowWildcard:m=!0,checkboxProps:p,className:V,...h}){const[P,j]=L.useState(y),n=u??P,q=$(),f=n.includes("*"),g=e=>{const a=[...new Set(e)];u===void 0&&j(a),k?.(a)};return t.jsx("div",{...h,role:h.role??"group",className:A("sia-permission-matrix",V),children:x.map(e=>{const a=`${e.domain}.*`,l=f||n.includes(a),i=e.actions.map(({action:r})=>`${e.domain}.${r}`),b=i.filter(r=>l||n.includes(r)).length,v=l||i.length>0&&b===i.length,w=c||f||i.length===0||!i.every(d)||m&&!d(a)||!m&&n.includes(a);return t.jsxs("fieldset",{className:"sia-permission-matrix__group",children:[t.jsx("legend",{children:e.label}),t.jsx(C,{...p,label:q.permissionMatrix.all,checked:v,indeterminate:!v&&b>0,disabled:w,onValueChange:r=>{const o=n.filter(s=>s!==a&&!i.includes(s));g(r?[...o,...m?[a]:i]:o)}}),t.jsx("div",{className:"sia-permission-matrix__actions",children:e.actions.map(({action:r,label:o})=>{const s=`${e.domain}.${r}`;return t.jsx(C,{...p,label:o,checked:l||n.includes(s),disabled:c||l||!d(s),onValueChange:T=>g(T?[...n,s]:n.filter(_=>_!==s))},s)})})]},e.domain)})})}N.__docgenInfo={description:"Choisir des permissions par domaine, avec sélection partielle et jokers.\nLes permissions inconnues sont conservées ; un droit non accordable reste\nvisible mais verrouillé. Le joker global `*` est affiché en lecture seule.",methods:[],displayName:"PermissionMatrix",props:{groups:{required:!0,tsType:{name:"Array",elements:[{name:"PermissionGroup"}],raw:"PermissionGroup[]"},description:""},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"[]",computed:!1}},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(permissions: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"permissions"}],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},canGrant:{required:!1,tsType:{name:"signature",type:"function",raw:"(permission: string) => boolean",signature:{arguments:[{type:{name:"string"},name:"permission"}],return:{name:"boolean"}}},description:"Les droits que l'utilisateur peut accorder ou retirer. Le serveur doit aussi les vérifier.",defaultValue:{value:"() => true",computed:!1}},allowWildcard:{required:!1,tsType:{name:"boolean"},description:"Permet d'accorder les actions présentes et futures du domaine (`domain.*`).",defaultValue:{value:"true",computed:!1}},checkboxProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"CheckboxProps"},{name:"union",raw:`| "checked"
| "defaultChecked"
| "indeterminate"
| "onValueChange"
| "onChange"
| "disabled"
| "label"
| "children"`,elements:[{name:"literal",value:'"checked"'},{name:"literal",value:'"defaultChecked"'},{name:"literal",value:'"indeterminate"'},{name:"literal",value:'"onValueChange"'},{name:"literal",value:'"onChange"'},{name:"literal",value:'"disabled"'},{name:"literal",value:'"label"'},{name:"literal",value:'"children"'}]}],raw:`Omit<
  CheckboxProps,
  | "checked"
  | "defaultChecked"
  | "indeterminate"
  | "onValueChange"
  | "onChange"
  | "disabled"
  | "label"
  | "children"
>`}],raw:`Partial<
  Omit<
    CheckboxProps,
    | "checked"
    | "defaultChecked"
    | "indeterminate"
    | "onValueChange"
    | "onChange"
    | "disabled"
    | "label"
    | "children"
  >
>`},description:""}},composes:["Omit"]};export{N as P};
