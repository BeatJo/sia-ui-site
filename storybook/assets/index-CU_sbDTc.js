import{j as t,r as w}from"./iframe-DQyRSC8n.js";import{c as he}from"./classname-nB6WhpaV.js";import{P as De}from"./index-BoT5b4sV.js";import{B as oe}from"./index-u74Kvn0L.js";import{P as Ce}from"./index-TmteOLub.js";import{r as xe,D as Ve}from"./index-CJY_x9IB.js";import{P as Ae,T as le,g as Re}from"./index-C4BQ8rIf.js";import{a as Pe,b as je}from"./date-C__fRPBv.js";import{r as Se,p as ke,e as Oe,c as Ee,F as Ke}from"./index-Ba1fDVpA.js";import{A as Ne}from"./index--2ZFOWpu.js";import{B as Le}from"./index-D8tXwpEZ.js";import{M as me}from"./index-fCsYR-Oc.js";import{D as Me}from"./index-Bwz2S_NS.js";function Ie(e,r){return new Intl.NumberFormat(e,r)}function Be(e,r={}){const{locale:i="fr-FR",...a}=r;return Ie(i,{maximumFractionDigits:2,...a}).format(e)}function bn(e){return e}const Ue=new Set(["textarea","rich-text","markdown","json","password","file","image","otp","hidden"]),ue=new Set(["text","textarea","email","phone","autocomplete","reference"]),_e=new Set(["number","currency","slider"]),$e={email:()=>Oe(),phone:()=>ke()};function K(e){const r=e.replace(/[_-]+/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").toLowerCase().trim();return r.charAt(0).toUpperCase()+r.slice(1)}function C(e,r){const i=e.type??"text";return r==="table"?e.inTable??!Ue.has(i):r==="form"?e.inForm??!e.readOnly:e.inDetail??!0}function v(e){return Object.entries(e.fields)}function de(e,r){const i=r.type??"text";if(i==="currency")return a=>{const n=a[e];return typeof n!="number"?null:t.jsx(Ne,{value:n,...r.currency?{currency:r.currency}:{}})};if(i==="select"||i==="radio")return a=>{const n=a[e];if(n==null||n==="")return null;const s=String(n),m=r.options?.find(y=>y.value===s)?.label??s,g=r.tones?.[s];return g?t.jsx(Le,{tone:g,children:m}):t.jsx(t.Fragment,{children:m})};if(i==="checkbox"||i==="switch")return a=>a[e]?"Oui":"Non";if(i==="date"||i==="datetime")return a=>{const n=a[e];return typeof n!="string"&&!(n instanceof Date)?null:i==="date"?Pe(n):je(n)};if(i==="number")return a=>{const n=a[e];return typeof n!="number"?null:Be(n,{...r.decimals!==void 0?{minimumFractionDigits:r.decimals,maximumFractionDigits:r.decimals}:{}})};if(i==="multiselect"||i==="tags")return a=>{const n=a[e];return Array.isArray(n)?n.map(s=>{const d=String(s),m=r.options?.find(g=>g.value===d);return typeof m?.label=="string"?m.label:d}).join(", "):null}}function Ge(e){const r=[];let i=!1;for(const[a,n]of v(e)){if(!C(n,"table"))continue;const s=n.type??"text",d=n.render??de(a,n);let m=n.card;m===void 0&&!i&&ue.has(s)&&(m="title",i=!0),r.push({key:a,header:n.label??K(a),...d?{cell:d}:{},align:n.align??(_e.has(s)?"end":"start"),...n.width?{width:n.width}:{},...n.truncate?{truncate:n.truncate}:{},...n.sortable?{sortable:n.sortable}:{},...m?{card:m}:{}})}return r}function He(e){const r=[];for(const[i,a]of v(e)){if(!C(a,"detail"))continue;const n=a.render??de(i,a);r.push({key:i,header:a.label??K(i),...n?{cell:n}:{}})}return r}function Ze(e){const r=[],i=new Map;for(const[a,n]of v(e)){if(!C(n,"form"))continue;const s={name:a,label:n.label??K(a),...n.type?{type:n.type}:{},...n.required?{required:n.required}:{},...n.placeholder?{placeholder:n.placeholder}:{},...n.helpText?{helpText:n.helpText}:{},...n.description?{description:n.description}:{},...n.options?{options:n.options}:{},...n.colSpan?{colSpan:n.colSpan}:{}};if(n.group){const d=i.get(n.group);d?d.push(s):i.set(n.group,[s])}else r.push(s)}return[...r,...Array.from(i,([a,n])=>({group:a,fields:n}))]}function ze(e){const r={};for(const[i,a]of v(e)){if(!C(a,"form"))continue;const n=[];a.required&&n.push(Se());const s=$e[a.type??"text"];s&&n.push(s()),a.rules&&n.push(...a.rules),n.length>0&&(r[i]=n)}if(Object.keys(r).length!==0)return Ee(r)}function Qe(e){return v(e).filter(([,r])=>r.searchable??ue.has(r.type??"text")).map(([r])=>r)}function We(e){const r={};for(const[i,a]of v(e))C(a,"form")&&(r[i]=a.defaultValue??(a.type==="checkbox"||a.type==="switch"?!1:a.type==="multiselect"||a.type==="tags"?[]:""));return r}function Ye(e){const r=e.key??"id";return typeof r=="function"?r:(i,a)=>{const n=i[r];return typeof n=="string"||typeof n=="number"?n:a}}function Je(e){return e.permissions==="auto"?{create:`${e.name}.creer`,view:`${e.name}.lire`,edit:`${e.name}.modifier`,delete:`${e.name}.supprimer`}:e.permissions??{}}function ce(e){const r=[];for(const i of e)"group"in i?r.push(...i.fields.map(a=>a.name)):r.push(i.name);return r}function Xe(e){const r={};for(const i of ce(e))r[i]="";return r}function en(e,r){const i=e,a={};for(const n of ce(r)){const s=i[n];a[n]=typeof s=="string"||typeof s=="number"||typeof s=="boolean"||Array.isArray(s)?s:""}return a}function pe({state:e,onClose:r,columns:i,fields:a,validate:n,onSubmit:s,createDefaults:d,toFormValues:m,renderDetail:g,getRowKey:y,dialog:u}){const b=e?.mode==="create",T=e?.mode==="edit",j=e?.mode==="view",S=e==null?"vide":`${e.mode}-${e.row!==void 0&&e.index!==void 0&&y?String(y(e.row,e.index)):String(e.index??"")}`,k=T&&e?.row!==void 0&&a?m?.(e.row)??en(e.row,a):d??(a?Xe(a):{});return t.jsxs(t.Fragment,{children:[a&&(b||T)&&t.jsx(me,{open:!0,onOpenChange:l=>{l||r()},title:b?u?.createTitle??"Créer":u?.editTitle??"Modifier",...b?u?.createDescription?{description:u.createDescription}:{}:u?.editDescription?{description:u.editDescription}:{},className:"sia-crud-dialog",children:t.jsx(Ke,{fields:a,defaultValues:k,...n?{validate:n}:{},columns:u?.columns??1,submitText:u?.submitText??(b?"Créer":"Enregistrer"),requireDirty:T,onSubmit:async l=>{await s?.(l,{mode:b?"create":"edit",...e?.row!==void 0?{row:e.row}:{},...e?.index!==void 0?{index:e.index}:{}}),r()}},S)}),j&&e?.row!==void 0&&t.jsx(me,{open:!0,onOpenChange:l=>{l||r()},title:u?.viewTitle??"Détail",...u?.viewDescription?{description:u.viewDescription}:{},className:"sia-crud-dialog",children:g?.(e.row,e.index??0)??t.jsx(Me,{columns:u?.detailColumns??2,items:i.filter(l=>l.card!=="hidden").map(l=>({key:l.key,label:l.header,value:xe(e.row,e.index??0,l)}))})})]})}pe.__docgenInfo={description:"Les boîtes du CRUD : créer, modifier, consulter.\n\nElles n'inventent rien — `Modal` pour la boîte, `Form` pour la saisie,\n`Descriptions` pour la lecture. Ce qu'elles apportent est de savoir\nlaquelle ouvrir, avec quelles valeurs, et de refermer une fois l'envoi\npassé.",methods:[],displayName:"CrudDialogs",props:{state:{required:!0,tsType:{name:"union",raw:"CrudDialogState<T> | null",elements:[{name:"CrudDialogState",elements:[{name:"T"}],raw:"CrudDialogState<T>"},{name:"null"}]},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},columns:{required:!0,tsType:{name:"Array",elements:[{name:"DataTableColumn",elements:[{name:"T"}],raw:"DataTableColumn<T>"}],raw:"Array<DataTableColumn<T>>"},description:""},fields:{required:!1,tsType:{name:"union",raw:"FormEntry[] | undefined",elements:[{name:"Array",elements:[{name:"union",raw:"FormFieldConfig | FormFieldGroup",elements:[{name:"FormFieldConfig"},{name:"FormFieldGroup"}]}],raw:"FormEntry[]"},{name:"undefined"}]},description:""},validate:{required:!1,tsType:{name:"union",raw:"FormValidator<FormShape> | undefined",elements:[{name:"signature",type:"function",raw:`(
  values: TValues,
) => FormErrors<TValues> | Promise<FormErrors<TValues>>`,signature:{arguments:[{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},name:"values"}],return:{name:"union",raw:"FormErrors<TValues> | Promise<FormErrors<TValues>>",elements:[{name:"signature",type:"object",raw:`{
  [K in keyof TValues]?: string;
}`,signature:{properties:[{key:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},value:{name:"string"}}]}},{name:"Promise",elements:[{name:"signature",type:"object",raw:`{
  [K in keyof TValues]?: string;
}`,signature:{properties:[{key:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},value:{name:"string"}}]}}],raw:"Promise<FormErrors<TValues>>"}]}}},{name:"undefined"}]},description:""},onSubmit:{required:!1,tsType:{name:"union",raw:`| ((
    values: FormShape,
    context: { mode: "create" | "edit"; row?: T; index?: number },
  ) => void | Promise<void>)
| undefined`,elements:[{name:"unknown"},{name:"undefined"}]},description:""},createDefaults:{required:!1,tsType:{name:"union",raw:"FormShape | undefined",elements:[{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>"},{name:"undefined"}]},description:""},toFormValues:{required:!1,tsType:{name:"union",raw:"((row: T) => FormShape) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:""},renderDetail:{required:!1,tsType:{name:"union",raw:"((row: T, index: number) => ReactNode) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:""},getRowKey:{required:!1,tsType:{name:"union",raw:"((row: T, index: number) => Key) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:""},dialog:{required:!1,tsType:{name:"union",raw:"CrudDialogOptions | undefined",elements:[{name:"CrudDialogOptions"},{name:"undefined"}]},description:""}}};function nn(){return t.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16","aria-hidden":"true",children:t.jsx("path",{d:"M4 20h4l10-10a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5 4 20Z",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinejoin:"round"})})}function rn({resource:e,title:r,description:i,eyebrow:a,columns:n,data:s,getRowKey:d,onCreate:m,onView:g,onEdit:y,onDelete:u,fields:b,onSubmit:T,validate:j,createDefaults:S,toFormValues:k,detail:l,dialog:fe,operations:x,extraRowActions:F,onBulkDelete:N,can:V,headerActions:L,toolbar:M,searchKeys:ge,searchPlaceholder:I,onSearch:B,loading:ye=!1,error:U,onRetry:_,empty:$,page:G,totalPages:H,onPageChange:Z,table:be,children:we,className:Te}){const[ve,A]=w.useState(null),o=w.useMemo(()=>e?{columns:Ge(e),detailColumns:He(e),fields:Ze(e),validate:ze(e),searchKeys:Qe(e),defaults:We(e),getRowKey:Ye(e),permissions:Je(e),formColumns:e.formColumns,label:e.label}:void 0,[e]),z=n??o?.columns??[],O=b??o?.fields,Fe=j??o?.validate,Q=ge??o?.searchKeys,E=d??o?.getRowKey,R=!!(O&&T),W=l===void 0?!!O:l!==!1,Y=w.useMemo(()=>m??(R?()=>A({mode:"create"}):void 0),[m,R]),J=w.useMemo(()=>y??(R?(p,c)=>A({mode:"edit",row:p,index:c}):void 0),[y,R]),X=w.useMemo(()=>g??(W?(p,c)=>A({mode:"view",row:p,index:c}):void 0),[g,W]),P=w.useMemo(()=>{const p=[],c=(h,ie,D)=>{const f=x?.[h];if(!ie||f===!1)return;const te=f?.permission??o?.permissions[h],se=f?.confirm===!1?void 0:f?.confirm??D.confirm;p.push({key:h,label:f?.label??D.label,icon:f?.icon??D.icon,...D.tone?{tone:D.tone}:{},...te!==void 0?{permission:te}:{},...f?.hidden?{hidden:f.hidden}:{},...f?.disabled?{disabled:f.disabled}:{},...se?{confirm:se}:{},onSelect:ie})};return c("view",X,{label:"Consulter",icon:t.jsx(Re,{})}),c("edit",J,{label:"Modifier",icon:t.jsx(nn,{})}),c("delete",u,{label:"Supprimer",icon:t.jsx(le,{}),tone:"danger",confirm:{title:"Supprimer cet élément ?",description:"Cette action est définitive.",confirmLabel:"Supprimer",destructive:!0}}),p},[x,u,J,X,o]),ee=w.useMemo(()=>F?(p,c)=>[...P,...typeof F=="function"?F(p,c):F]:P.length>0?P:void 0,[P,F]),q=x?.create===!1?null:x?.create??{},ne=q?.permission??o?.permissions.create,qe=ne===void 0||!V||V(ne),re=Y&&q&&qe?t.jsxs(oe,{onClick:Y,disabled:q.disabled??!1,children:[q.icon??t.jsx(Ae,{}),q.label??o?.label?.create??"Créer"]}):null,ae=re||L?t.jsxs(t.Fragment,{children:[L,re]}):void 0;return t.jsxs("section",{className:he("sia-crud-page",Te),children:[t.jsx(De,{title:r??o?.label?.plural??e?.name??"",...i??e?.description?{description:i??e?.description}:{},...a?{eyebrow:a}:{},...ae?{actions:ae}:{}}),we??t.jsx(Ve,{columns:z,data:s,...E?{getRowKey:E}:{},...M?{toolbar:M}:{},...Q?{searchKeys:Q}:{},...I?{searchPlaceholder:I}:{},...B?{onSearch:B}:{},...ee?{rowActions:ee}:{},...V?{can:V}:{},loading:ye,...U?{error:U}:{},..._?{onRetry:_}:{},...$?{empty:$}:{},...N?{selectable:!0,selectionActions:({keys:p,rows:c,clear:h})=>t.jsxs(oe,{size:"sm",variant:"outline",tone:"danger",onClick:async()=>{await N(p,c),h()},children:[t.jsx(le,{}),"Supprimer"]})}:{},inlineActionsLimit:3,...be}),t.jsx(pe,{state:ve,onClose:()=>A(null),columns:o?.detailColumns??z,fields:O,validate:Fe,onSubmit:T,createDefaults:S??o?.defaults,toFormValues:k,renderDetail:typeof l=="function"?l:void 0,getRowKey:E,dialog:{...o?.label?.singular?{createTitle:o.label.create??"Créer",editTitle:t.jsxs(t.Fragment,{children:["Modifier — ",o.label.singular]}),viewTitle:o.label.singular}:{},...o?.formColumns?{columns:o.formColumns}:{},...fe}}),G!==void 0&&H!==void 0&&Z&&t.jsx(Ce,{page:G,totalPages:H,onPageChange:Z,showTotal:!0})]})}rn.__docgenInfo={description:`Une page de liste, avec ses quatre opérations.

Créer, consulter, modifier, supprimer : ce sont les mêmes partout, et les
réécrire à chaque écran produit quatre variantes qui divergent — celle qui
oublie la confirmation, celle qui ne vérifie pas les droits, celle dont le
bouton ne se désactive pas pendant l'appel.

Ici, fournir le gestionnaire suffit. Ne pas le fournir retire l'action.`,methods:[],displayName:"CrudPage",props:{title:{required:!1,tsType:{name:"ReactNode"},description:"À défaut, le pluriel de la ressource."},description:{required:!1,tsType:{name:"ReactNode"},description:""},eyebrow:{required:!1,tsType:{name:"ReactNode"},description:""},data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},getRowKey:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => Key",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"Key"}}},description:""},onCreate:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Ce que fait le bouton de création.

Facultatif : avec \`fields\`, la page ouvre elle-même son formulaire. Le
fournir sert à partir ailleurs — une page dédiée, un assistant en
plusieurs étapes — et prend alors le pas sur la boîte.`},onView:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => void",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Idem : sans lui, la boîte de détail s'ouvre."},onEdit:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => void",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Idem : sans lui, le formulaire s'ouvre prérempli."},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => void | Promise<void>",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:"Confirmée d'office. Détruire sans demander est une faute."},fields:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"FormFieldConfig | FormFieldGroup",elements:[{name:"FormFieldConfig"},{name:"FormFieldGroup"}]}],raw:"FormEntry[]"},description:`Les champs de création et de modification.

Les déclarer suffit à obtenir un CRUD complet : le bouton « Créer » ouvre
un formulaire vide, « Modifier » le même prérempli, « Consulter » la
ligne en lecture. C'est la même description que \`Form\` — aucun schéma
propre à cette page, aucune bibliothèque imposée.`},onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  values: FormShape,
  context: { mode: "create" | "edit"; row?: T; index?: number },
) => void | Promise<void>`,signature:{arguments:[{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>"},name:"values"},{type:{name:"signature",type:"object",raw:'{ mode: "create" | "edit"; row?: T; index?: number }',signature:{properties:[{key:"mode",value:{name:"union",raw:'"create" | "edit"',elements:[{name:"literal",value:'"create"'},{name:"literal",value:'"edit"'}],required:!0}},{key:"row",value:{name:"T",required:!1}},{key:"index",value:{name:"number",required:!1}}]}},name:"context"}],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:"Ce que la page fait d'un formulaire envoyé."},validate:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  values: TValues,
) => FormErrors<TValues> | Promise<FormErrors<TValues>>`,signature:{arguments:[{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},name:"values"}],return:{name:"union",raw:"FormErrors<TValues> | Promise<FormErrors<TValues>>",elements:[{name:"signature",type:"object",raw:`{
  [K in keyof TValues]?: string;
}`,signature:{properties:[{key:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},value:{name:"string"}}]}},{name:"Promise",elements:[{name:"signature",type:"object",raw:`{
  [K in keyof TValues]?: string;
}`,signature:{properties:[{key:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},value:{name:"string"}}]}}],raw:"Promise<FormErrors<TValues>>"}]}}},description:"La validation, sous la même forme que `Form`.\n\n`createValidator` de `@sia-ui/utils/validation` en produit une; un Zod s'y\nbranche en cinq lignes, sans que le composant connaisse Zod."},createDefaults:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>"},description:"Valeurs de départ d'une création. Par défaut, des champs vides."},toFormValues:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T) => FormShape",signature:{arguments:[{type:{name:"T"},name:"row"}],return:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>"}}},description:`Comment une ligne devient des valeurs de formulaire.

Par défaut, les champs de même nom sont repris tels quels. À fournir dès
que la ligne et le formulaire ne parlent pas la même langue — une date
ISO à découper, un objet lié à réduire à son identifiant.`},detail:{required:!1,tsType:{name:"union",raw:"boolean | ((row: T, index: number) => ReactNode)",elements:[{name:"boolean"},{name:"unknown"}]},description:`La vue de détail.

Par défaut dérivée des colonnes, qui disent déjà quoi montrer. Une
fonction la remplace, \`false\` la retire avec son action.`},dialog:{required:!1,tsType:{name:"CrudDialogOptions"},description:"Titres, largeur et nombre de colonnes des boîtes."},operations:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  create?: CrudCreateOptions | false;
  view?: CrudActionOptions<T> | false;
  edit?: CrudActionOptions<T> | false;
  delete?: CrudActionOptions<T> | false;
}`,signature:{properties:[{key:"create",value:{name:"union",raw:"CrudCreateOptions | false",elements:[{name:"CrudCreateOptions"},{name:"literal",value:"false"}],required:!1}},{key:"view",value:{name:"union",raw:"CrudActionOptions<T> | false",elements:[{name:"CrudActionOptions",elements:[{name:"T"}],raw:"CrudActionOptions<T>"},{name:"literal",value:"false"}],required:!1}},{key:"edit",value:{name:"union",raw:"CrudActionOptions<T> | false",elements:[{name:"CrudActionOptions",elements:[{name:"T"}],raw:"CrudActionOptions<T>"},{name:"literal",value:"false"}],required:!1}},{key:"delete",value:{name:"union",raw:"CrudActionOptions<T> | false",elements:[{name:"CrudActionOptions",elements:[{name:"T"}],raw:"CrudActionOptions<T>"},{name:"literal",value:"false"}],required:!1}}]}},description:`De quoi s'écarter des défauts.

\`false\` retire une action alors même que son gestionnaire existe — utile
quand le gestionnaire sert ailleurs, par exemple à un raccourci clavier.`},extraRowActions:{required:!1,tsType:{name:"union",raw:"Array<RowAction<T>> | ((row: T, index: number) => Array<RowAction<T>>)",elements:[{name:"Array",elements:[{name:"RowAction",elements:[{name:"T"}],raw:"RowAction<T>"}],raw:"Array<RowAction<T>>"},{name:"unknown"}]},description:"Des actions de ligne en plus des quatre standard."},onBulkDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(keys: Key[], rows: T[]) => void | Promise<void>",signature:{arguments:[{type:{name:"Array",elements:[{name:"Key"}],raw:"Key[]"},name:"keys"},{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"rows"}],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:"Suppression groupée. Ajoute la sélection et sa barre d'actions."},can:{required:!1,tsType:{name:"signature",type:"function",raw:"(rule: PermissionRule) => boolean",signature:{arguments:[{type:{name:"union",raw:`| string
| readonly PermissionRule[]
| { anyOf: readonly PermissionRule[] }
| { allOf: readonly PermissionRule[] }
| { not: PermissionRule }`,elements:[{name:"string"},{name:"unknown"},{name:"signature",type:"object",raw:"{ anyOf: readonly PermissionRule[] }",signature:{properties:[{key:"anyOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ allOf: readonly PermissionRule[] }",signature:{properties:[{key:"allOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ not: PermissionRule }",signature:{properties:[{key:"not",value:{name:"PermissionRule",required:!0}}]}}]},name:"rule"}],return:{name:"boolean"}}},description:""},headerActions:{required:!1,tsType:{name:"ReactNode"},description:"Actions de page, à droite du titre. S'ajoute au bouton de création."},toolbar:{required:!1,tsType:{name:"ReactNode"},description:""},searchKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},searchPlaceholder:{required:!1,tsType:{name:"string"},description:""},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: string) => void",signature:{arguments:[{type:{name:"string"},name:"query"}],return:{name:"void"}}},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"ReactNode"},description:""},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},empty:{required:!1,tsType:{name:'DataTableProps["empty"]',raw:'DataTableProps<T>["empty"]'},description:""},page:{required:!1,tsType:{name:"number"},description:""},totalPages:{required:!1,tsType:{name:"number"},description:""},onPageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},table:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"DataTableProps",elements:[{name:"T"}],raw:"DataTableProps<T>"},{name:"union",raw:'"columns" | "data"',elements:[{name:"literal",value:'"columns"'},{name:"literal",value:'"data"'}]}],raw:'Omit<DataTableProps<T>, "columns" | "data">'}],raw:'Partial<Omit<DataTableProps<T>, "columns" | "data">>'},description:`Ce qui n'a pas de raccourci ici passe au tableau tel quel — densité,
mode cartes, tri, colonnes figées.`},children:{required:!1,tsType:{name:"ReactNode"},description:"Remplace le tableau. Le reste de la page continue de fonctionner."},className:{required:!1,tsType:{name:"string"},description:""}}};export{rn as C,bn as d};
