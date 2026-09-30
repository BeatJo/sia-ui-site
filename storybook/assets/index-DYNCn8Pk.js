import{j as s,u as j,r as h}from"./iframe-DZg55ZNc.js";import{c as $}from"./classname-nB6WhpaV.js";import{P as Ie}from"./index-BcfWHVqj.js";import{B as we}from"./index-CXaKiedc.js";import{P as He}from"./index-C3HbhSuj.js";import{r as Ue,D as _e}from"./index-bqa5ybGM.js";import{P as $e,T as ve,g as Ge,n as ze}from"./index-DuZVuOGI.js";import{b as Ze,a as Qe}from"./date-C__fRPBv.js";import{r as Ye,p as Je,e as We,c as Xe}from"./validation-B4yozFze.js";import{A as en}from"./index-BDJFDJ_Y.js";import{B as nn,t as rn}from"./index-C4J2vyTj.js";import{F as an,h as tn,f as qe}from"./index-bvjiRwNe.js";import{M as Te}from"./index-BR8iQg9c.js";import{D as sn}from"./index-fRtLGCah.js";function ln(e,n){return new Intl.NumberFormat(e,n)}function on(e,n={}){const{locale:i="fr-FR",...t}=n;return ln(i,{maximumFractionDigits:2,...t}).format(e)}function Bn(e){return e}const mn=new Set(["textarea","rich-text","markdown","json","password","file","image","otp","hidden"]),he=new Set(["text","textarea","email","phone","autocomplete","reference"]),un=new Set(["number","currency","slider"]),dn={email:e=>We(e?.invalidEmail),phone:e=>Je(e?.invalidPhone)};function G(e){const n=e.replace(/[_-]+/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").toLowerCase().trim();return n.charAt(0).toUpperCase()+n.slice(1)}function k(e,n,i="create"){const t=e.type??"text";if(n==="table")return e.inTable??!mn.has(t);if(n==="form"){const a=e.inForm??(!e.readOnly&&!e.value);return typeof a=="string"?a===i:a}return e.inDetail??!0}function Ve(e,n){return e.required===!0||e.required===n}function cn(e,n){return n.value??(i=>i[e])}function D(e){return Object.entries(e.fields)}function pn({value:e}){const n=j();return s.jsx(s.Fragment,{children:e?n.yes:n.no})}function fn({value:e,time:n}){const{language:i}=j();return s.jsx(s.Fragment,{children:n?Ze(e,{locale:i}):Qe(e,{locale:i})})}function gn({value:e,decimals:n}){const{language:i}=j();return s.jsx(s.Fragment,{children:on(e,{locale:i,...n!==void 0?{minimumFractionDigits:n,maximumFractionDigits:n}:{}})})}function Ce(e,n){const i=n.type??"text",t=cn(e,n);if(i==="currency")return a=>{const r=t(a);return typeof r!="number"?null:s.jsx(en,{value:r,...n.currency?{currency:n.currency}:{}})};if(i==="select"||i==="radio")return a=>{const r=t(a);if(r==null||r==="")return null;const l=String(r),b=n.options?.find(T=>T.value===l)?.label??l;return n.tones?.[l]?s.jsx(nn,{tone:rn(n.tones,l),children:b}):s.jsx(s.Fragment,{children:b})};if(i==="checkbox"||i==="switch")return a=>s.jsx(pn,{value:t(a)});if(i==="date"||i==="datetime")return a=>{const r=t(a);return typeof r!="string"&&!(r instanceof Date)?null:s.jsx(fn,{value:r,time:i==="datetime"})};if(i==="number")return a=>{const r=t(a);return typeof r!="number"?null:s.jsx(gn,{value:r,decimals:n.decimals})};if(i==="multiselect"||i==="tags")return a=>{const r=t(a);return Array.isArray(r)?r.map(l=>{const m=String(l),b=n.options?.find(T=>T.value===m);return typeof b?.label=="string"?b.label:m}).join(", "):null}}function bn(e){const n=[];let i=!1;for(const[t,a]of D(e)){if(!k(a,"table"))continue;const r=a.type??"text",l=a.render??Ce(t,a);let m=a.card;m===void 0&&!i&&he.has(r)&&(m="title",i=!0),n.push({key:t,header:a.label??G(t),...a.value?{accessor:a.value}:{},...l?{cell:l}:{},align:a.align??(un.has(r)?"end":"start"),...a.width?{width:a.width}:{},...a.truncate?{truncate:a.truncate}:{},...a.sortable?{sortable:a.sortable}:{},...m?{card:m}:{}})}return n}function yn(e){const n=[];for(const[i,t]of D(e)){if(!k(t,"detail"))continue;const a=t.render??Ce(i,t);n.push({key:i,header:t.label??G(i),...t.value?{accessor:t.value}:{},...a?{cell:a}:{}})}return n}function Fe(e,n="create"){const i=[],t=new Map;for(const[a,r]of D(e)){if(!k(r,"form",n))continue;const l={name:a,label:r.label??G(a),...r.type?{type:r.type}:{},...Ve(r,n)?{required:!0}:{},...r.placeholder?{placeholder:r.placeholder}:{},...r.helpText?{helpText:r.helpText}:{},...r.description?{description:r.description}:{},...r.options?{options:r.options}:{},...r.colSpan?{colSpan:r.colSpan}:{},...r.controlProps?{controlProps:r.controlProps}:{}};if(r.group){const m=t.get(r.group);m?m.push(l):t.set(r.group,[l])}else i.push(l)}return[...i,...Array.from(t,([a,r])=>({group:a,fields:r}))]}function Pe(e,n="create",i){const t={};for(const[a,r]of D(e)){if(!k(r,"form",n))continue;const l=[];Ve(r,n)&&l.push(Ye(i?.required));const m=dn[r.type??"text"];m&&l.push(m(i)),r.rules&&l.push(...r.rules),l.length>0&&(t[a]=l)}if(Object.keys(t).length!==0)return Xe(t)}function wn(e){return D(e).filter(([,n])=>n.searchable??he.has(n.type??"text")).map(([n])=>n)}function vn(e){const n={};for(const[i,t]of D(e))k(t,"form")&&(n[i]=t.defaultValue??(t.type==="checkbox"||t.type==="switch"?!1:t.type==="multiselect"||t.type==="tags"?[]:""));return n}function Tn(e){const n=e.key??"id";return typeof n=="function"?n:(i,t)=>{const a=i[n];return typeof a=="string"||typeof a=="number"?a:t}}function Fn(e){return e.permissions==="auto"?{create:`${e.name}.creer`,view:`${e.name}.lire`,edit:`${e.name}.modifier`,delete:`${e.name}.supprimer`}:e.permissions??{}}function Pn(e){const n={};for(const i of qe(e))n[i]="";return n}function qn(e,n){const i=e,t={};for(const a of qe(n)){const r=i[a];t[a]=typeof r=="string"||typeof r=="number"||typeof r=="boolean"||Array.isArray(r)?r:""}return t}function De({state:e,onClose:n,columns:i,fields:t,validate:a,editFields:r,editValidate:l,onSubmit:m,createDefaults:b,toFormValues:T,renderDetail:E,getRowKey:R,dialog:u,modalProps:F,formProps:L,descriptionsProps:H}){const P=j(),y=e?.mode==="create",q=e?.mode==="edit",V=e?.mode==="view",p=q?r??t:t,A=q?l??a:a,C=e==null?"vide":`${e.mode}-${e.row!==void 0&&e.index!==void 0&&R?String(R(e.row,e.index)):String(e.index??"")}`,K=q&&e?.row!==void 0&&p?T?.(e.row)??qn(e.row,p):b??(p?Pn(p):{});return s.jsxs(s.Fragment,{children:[p&&(y||q)&&s.jsx(Te,{...F,open:!0,onOpenChange:d=>{d||n()},title:y?u?.createTitle??P.create:u?.editTitle??P.edit,...y?u?.createDescription?{description:u.createDescription}:{}:u?.editDescription?{description:u.editDescription}:{},className:$("sia-crud-dialog",F?.className),children:s.jsx(an,{fields:p,defaultValues:K,...A?{validate:A}:{},columns:u?.columns??1,submitText:u?.submitText??(y?P.create:P.save),requireDirty:q,...L,onSubmit:async d=>{const N=await m?.(d,{mode:y?"create":"edit",...e?.row!==void 0?{row:e.row}:{},...e?.index!==void 0?{index:e.index}:{}});if(tn(N))return N;n()}},C)}),V&&e?.row!==void 0&&s.jsx(Te,{...F,open:!0,onOpenChange:d=>{d||n()},title:u?.viewTitle??P.crudPage.detailTitle,...u?.viewDescription?{description:u.viewDescription}:{},className:$("sia-crud-dialog",F?.className),children:E?.(e.row,e.index??0)??s.jsx(sn,{columns:u?.detailColumns??2,...H,items:i.filter(d=>d.card!=="hidden").map(d=>({key:d.key,label:d.header,value:Ue(e.row,e.index??0,d)}))})})]})}De.__docgenInfo={description:"Les boîtes du CRUD : créer, modifier, consulter.\n\nElles n'inventent rien — `Modal` pour la boîte, `Form` pour la saisie,\n`Descriptions` pour la lecture. Ce qu'elles apportent est de savoir\nlaquelle ouvrir, avec quelles valeurs, et de refermer une fois l'envoi\npassé.",methods:[],displayName:"CrudDialogs",props:{state:{required:!0,tsType:{name:"union",raw:"CrudDialogState<T> | null",elements:[{name:"CrudDialogState",elements:[{name:"T"}],raw:"CrudDialogState<T>"},{name:"null"}]},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},columns:{required:!0,tsType:{name:"Array",elements:[{name:"DataTableColumn",elements:[{name:"T"}],raw:"DataTableColumn<T>"}],raw:"Array<DataTableColumn<T>>"},description:""},fields:{required:!1,tsType:{name:"union",raw:"FormEntry[] | undefined",elements:[{name:"Array",elements:[{name:"union",raw:"FormFieldConfig | FormFieldGroup",elements:[{name:"FormFieldConfig"},{name:"FormFieldGroup"}]}],raw:"FormEntry[]"},{name:"undefined"}]},description:""},validate:{required:!1,tsType:{name:"union",raw:"FormValidator<FormShape> | undefined",elements:[{name:"signature",type:"function",raw:`(
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
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},value:{name:"string"}}]}}],raw:"Promise<FormErrors<TValues>>"}]}}},{name:"undefined"}]},description:""},editFields:{required:!1,tsType:{name:"union",raw:"FormEntry[] | undefined",elements:[{name:"Array",elements:[{name:"union",raw:"FormFieldConfig | FormFieldGroup",elements:[{name:"FormFieldConfig"},{name:"FormFieldGroup"}]}],raw:"FormEntry[]"},{name:"undefined"}]},description:"Les champs et la validation de la modification, quand ils diffèrent de\nla création — un mot de passe exigé à la création seulement. À défaut,\n`fields` et `validate` servent aux deux."},editValidate:{required:!1,tsType:{name:"union",raw:"FormValidator<FormShape> | undefined",elements:[{name:"signature",type:"function",raw:`(
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
  ) => FormSubmitResult<FormShape> | Promise<FormSubmitResult<FormShape>>)
| undefined`,elements:[{name:"unknown"},{name:"undefined"}]},description:""},createDefaults:{required:!1,tsType:{name:"union",raw:"FormShape | undefined",elements:[{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>"},{name:"undefined"}]},description:""},toFormValues:{required:!1,tsType:{name:"union",raw:"((row: T) => FormShape) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:""},renderDetail:{required:!1,tsType:{name:"union",raw:"((row: T, index: number) => ReactNode) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:""},getRowKey:{required:!1,tsType:{name:"union",raw:"((row: T, index: number) => Key) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:""},dialog:{required:!1,tsType:{name:"union",raw:"CrudDialogOptions | undefined",elements:[{name:"CrudDialogOptions"},{name:"undefined"}]},description:""},modalProps:{required:!1,tsType:{name:"union",raw:"CrudModalProps | undefined",elements:[{name:"Partial",elements:[{name:"Omit",elements:[{name:"ModalProps"},{name:"union",raw:'"open" | "onOpenChange" | "children" | "title" | "description"',elements:[{name:"literal",value:'"open"'},{name:"literal",value:'"onOpenChange"'},{name:"literal",value:'"children"'},{name:"literal",value:'"title"'},{name:"literal",value:'"description"'}]}],raw:'Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "description">'}],raw:`Partial<
  Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "description">
>`},{name:"undefined"}]},description:"Voir `CrudModalProps`."},formProps:{required:!1,tsType:{name:"union",raw:"CrudFormProps | undefined",elements:[{name:"Partial",elements:[{name:"Omit",elements:[{name:"FormProps"},{name:"union",raw:'"fields" | "defaultValues" | "validate" | "onSubmit" | "form"',elements:[{name:"literal",value:'"fields"'},{name:"literal",value:'"defaultValues"'},{name:"literal",value:'"validate"'},{name:"literal",value:'"onSubmit"'},{name:"literal",value:'"form"'}]}],raw:'Omit<FormProps, "fields" | "defaultValues" | "validate" | "onSubmit" | "form">'}],raw:`Partial<
  Omit<FormProps, "fields" | "defaultValues" | "validate" | "onSubmit" | "form">
>`},{name:"undefined"}]},description:"Voir `CrudFormProps`."},descriptionsProps:{required:!1,tsType:{name:"union",raw:"CrudDescriptionsProps | undefined",elements:[{name:"Partial",elements:[{name:"Omit",elements:[{name:"DescriptionsProps"},{name:"literal",value:'"items"'}],raw:'Omit<DescriptionsProps, "items">'}],raw:'Partial<Omit<DescriptionsProps, "items">>'},{name:"undefined"}]},description:"Voir `CrudDescriptionsProps`."}}};function hn(e,n){const[i,...t]=e.split("{name}");return t.length===0?e:s.jsxs(s.Fragment,{children:[i,n,t.join("{name}")]})}function Vn({resource:e,title:n,description:i,eyebrow:t,headingLevel:a,columns:r,data:l,getRowKey:m,onCreate:b,onView:T,onEdit:E,onDelete:R,fields:u,onSubmit:F,validate:L,createDefaults:H,toFormValues:P,detail:y,dialog:q,operations:V,extraRowActions:p,onBulkDelete:A,can:C,headerActions:K,toolbar:d,searchKeys:N,searchPlaceholder:z,onSearch:Z,searchDelay:Q,loading:Re=!1,error:Y,onRetry:J,empty:W,page:X,totalPages:ee,onPageChange:ne,pageSize:re,onPageSizeChange:ae,pageSizeOptions:ie,table:Ae,children:xe,className:Se,pageHeaderProps:Oe,createButtonProps:je,bulkDeleteButtonProps:te,paginationProps:ke,modalProps:Ee,formProps:Le,descriptionsProps:Ke}){const c=j(),[Ne,M]=h.useState(null),o=h.useMemo(()=>e?{columns:bn(e),detailColumns:yn(e),fields:Fe(e,"create"),validate:Pe(e,"create",c.resource),editFields:Fe(e,"edit"),editValidate:Pe(e,"edit",c.resource),searchKeys:wn(e),defaults:vn(e),getRowKey:Tn(e),permissions:Fn(e),formColumns:e.formColumns,label:e.label}:void 0,[e,c.resource]),se=r??o?.columns??[],U=u??o?.fields,Me=L??o?.validate,le=N??o?.searchKeys,_=m??o?.getRowKey,B=!!(U&&F),oe=y===void 0?!!U:y!==!1,me=h.useMemo(()=>b??(B?()=>M({mode:"create"}):void 0),[b,B]),ue=h.useMemo(()=>E??(B?(w,f)=>M({mode:"edit",row:w,index:f}):void 0),[E,B]),de=h.useMemo(()=>T??(oe?(w,f)=>M({mode:"view",row:w,index:f}):void 0),[T,oe]),x=h.useMemo(()=>{const w=[],f=(g,I,O)=>{const v=V?.[g];if(!I||v===!1)return;const be=v?.permission??o?.permissions[g],ye=v?.confirm===!1?void 0:v?.confirm??O.confirm;w.push({key:g,label:v?.label??O.label,icon:v?.icon??O.icon,...O.tone?{tone:O.tone}:{},...be!==void 0?{permission:be}:{},...v?.hidden?{hidden:v.hidden}:{},...v?.disabled?{disabled:v.disabled}:{},...ye?{confirm:ye}:{},onSelect:I})};return f("view",de,{label:c.crudPage.view,icon:s.jsx(Ge,{})}),f("edit",ue,{label:c.edit,icon:s.jsx(ze,{})}),f("delete",R,{label:c.delete,icon:s.jsx(ve,{}),tone:"danger",confirm:{title:c.crudPage.deleteTitle,description:c.crudPage.deleteDescription,confirmLabel:c.delete,destructive:!0}}),w},[V,R,ue,de,o,c]),ce=h.useMemo(()=>{if(!p)return x.length>0?x:void 0;const w=x.filter(g=>g.key==="delete"),f=x.filter(g=>g.key!=="delete");return(g,I)=>[...f,...typeof p=="function"?p(g,I):p,...w]},[x,p]),S=V?.create===!1?null:V?.create??{},pe=S?.permission??o?.permissions.create,Be=pe===void 0||!C||C(pe),fe=me&&S&&Be?s.jsx(we,{disabled:S.disabled??!1,leftIcon:S.icon??s.jsx($e,{}),...je,onClick:me,children:S.label??o?.label?.create??c.create}):null,ge=fe||K?s.jsxs(s.Fragment,{children:[K,fe]}):void 0;return s.jsxs("section",{className:$("sia-crud-page",Se),children:[s.jsx(Ie,{title:n??o?.label?.plural??e?.name??"",...i??e?.description?{description:i??e?.description}:{},...t?{eyebrow:t}:{},...a?{level:a}:{},...Oe,...ge?{actions:ge}:{}}),xe??s.jsx(_e,{columns:se,data:l,..._?{getRowKey:_}:{},...d?{toolbar:d}:{},...le?{searchKeys:le}:{},...z?{searchPlaceholder:z}:{},...Z?{onSearch:Z}:{},...Q!==void 0?{searchDelay:Q}:{},...ce?{rowActions:ce}:{},...C?{can:C}:{},loading:Re,...Y?{error:Y}:{},...J?{onRetry:J}:{},...W?{empty:W}:{},...A?{selectable:!0,selectionActions:({keys:w,rows:f,clear:g})=>s.jsx(we,{size:"sm",variant:"outline",tone:"danger",leftIcon:s.jsx(ve,{}),...te,onClick:async()=>{await A(w,f),g()},children:te?.children??c.delete})}:{},inlineActionsLimit:3,...Ae}),s.jsx(De,{state:Ne,onClose:()=>M(null),columns:o?.detailColumns??se,fields:U,validate:Me,editFields:u??o?.editFields,editValidate:L??o?.editValidate,onSubmit:F,createDefaults:H??o?.defaults,toFormValues:P,renderDetail:typeof y=="function"?y:void 0,getRowKey:_,modalProps:Ee,formProps:Le,descriptionsProps:Ke,dialog:{...o?.label?.singular?{createTitle:o.label.create??c.create,editTitle:hn(c.crudPage.editTitle,o.label.singular),viewTitle:o.label.singular}:{},...o?.formColumns?{columns:o.formColumns}:{},...q}}),X!==void 0&&ee!==void 0&&ne&&s.jsx(He,{showTotal:!0,...re!==void 0?{pageSize:re}:{},...ae?{onPageSizeChange:ae}:{},...ie?{pageSizeOptions:ie}:{},...ke,page:X,totalPages:ee,onPageChange:ne})]})}Vn.__docgenInfo={description:`Une page de liste, avec ses quatre opérations.

Créer, consulter, modifier, supprimer : ce sont les mêmes partout, et les
réécrire à chaque écran produit quatre variantes qui divergent — celle qui
oublie la confirmation, celle qui ne vérifie pas les droits, celle dont le
bouton ne se désactive pas pendant l'appel.

Ici, fournir le gestionnaire suffit. Ne pas le fournir retire l'action.`,methods:[],displayName:"CrudPage",props:{title:{required:!1,tsType:{name:"ReactNode"},description:"À défaut, le pluriel de la ressource."},description:{required:!1,tsType:{name:"ReactNode"},description:""},eyebrow:{required:!1,tsType:{name:"ReactNode"},description:""},headingLevel:{required:!1,tsType:{name:"union",raw:"1 | 2 | 3",elements:[{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"}]},description:"Le niveau du titre. `1` pour un écran ; `2` quand la liste est une\nsection d'une fiche — les comptes d'un fournisseur — qui a déjà son\n`<h1>`."},data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},getRowKey:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => Key",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"Key"}}},description:""},onCreate:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Ce que fait le bouton de création.

Facultatif : avec \`fields\`, la page ouvre elle-même son formulaire. Le
fournir sert à partir ailleurs — une page dédiée, un assistant en
plusieurs étapes — et prend alors le pas sur la boîte.`},onView:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => void",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Idem : sans lui, la boîte de détail s'ouvre."},onEdit:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => void",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Idem : sans lui, le formulaire s'ouvre prérempli."},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, index: number) => void | Promise<void>",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"index"}],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:"Confirmée d'office. Détruire sans demander est une faute."},fields:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"FormFieldConfig | FormFieldGroup",elements:[{name:"FormFieldConfig"},{name:"FormFieldGroup"}]}],raw:"FormEntry[]"},description:`Les champs de création et de modification.

Les déclarer suffit à obtenir un CRUD complet : le bouton « Créer » ouvre
un formulaire vide, « Modifier » le même prérempli, « Consulter » la
ligne en lecture. C'est la même description que \`Form\` — aucun schéma
propre à cette page, aucune bibliothèque imposée.`},onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  values: FormShape,
  context: { mode: "create" | "edit"; row?: T; index?: number },
) => FormSubmitResult<FormShape> | Promise<FormSubmitResult<FormShape>>`,signature:{arguments:[{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},name:"values"},{type:{name:"signature",type:"object",raw:'{ mode: "create" | "edit"; row?: T; index?: number }',signature:{properties:[{key:"mode",value:{name:"union",raw:'"create" | "edit"',elements:[{name:"literal",value:'"create"'},{name:"literal",value:'"edit"'}],required:!0}},{key:"row",value:{name:"T",required:!1}},{key:"index",value:{name:"number",required:!1}}]}},name:"context"}],return:{name:"union",raw:"FormSubmitResult<FormShape> | Promise<FormSubmitResult<FormShape>>",elements:[{name:"union",raw:`| void
| FormErrors<TValues>`,elements:[{name:"void"},{name:"signature",type:"object",raw:`{
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
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},value:{name:"string"}}]}}]},{name:"Promise",elements:[{name:"union",raw:`| void
| FormErrors<TValues>`,elements:[{name:"void"},{name:"signature",type:"object",raw:`{
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
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]}],raw:"Record<string, FieldValue>",required:!1},value:{name:"string"}}]}}]}],raw:"Promise<FormSubmitResult<FormShape>>"}]}}},description:`Ce que la page fait d'un formulaire envoyé.

Rendre des erreurs par champ, ou lever une \`HttpError\`, garde la boîte
ouverte avec les erreurs affichées ; sinon elle se ferme.`},validate:{required:!1,tsType:{name:"signature",type:"function",raw:`(
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
| { not: PermissionRule }`,elements:[{name:"string"},{name:"unknown"},{name:"signature",type:"object",raw:"{ anyOf: readonly PermissionRule[] }",signature:{properties:[{key:"anyOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ allOf: readonly PermissionRule[] }",signature:{properties:[{key:"allOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ not: PermissionRule }",signature:{properties:[{key:"not",value:{name:"PermissionRule",required:!0}}]}}]},name:"rule"}],return:{name:"boolean"}}},description:""},headerActions:{required:!1,tsType:{name:"ReactNode"},description:"Actions de page, à droite du titre. S'ajoute au bouton de création."},toolbar:{required:!1,tsType:{name:"ReactNode"},description:""},searchKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},searchPlaceholder:{required:!1,tsType:{name:"string"},description:""},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: string) => void",signature:{arguments:[{type:{name:"string"},name:"query"}],return:{name:"void"}}},description:""},searchDelay:{required:!1,tsType:{name:"number"},description:"Temporise `onSearch` — voir `DataTable`. 300 pour une recherche serveur."},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"ReactNode"},description:""},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},empty:{required:!1,tsType:{name:'DataTableProps["empty"]',raw:'DataTableProps<T>["empty"]'},description:""},page:{required:!1,tsType:{name:"number"},description:""},totalPages:{required:!1,tsType:{name:"number"},description:""},onPageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},pageSize:{required:!1,tsType:{name:"number"},description:"Avec `onPageSizeChange`, ajoute le choix du nombre de lignes par page."},onPageSizeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(pageSize: number) => void",signature:{arguments:[{type:{name:"number"},name:"pageSize"}],return:{name:"void"}}},description:""},pageSizeOptions:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:"Les tailles proposées — voir `Pagination`."},table:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"DataTableProps",elements:[{name:"T"}],raw:"DataTableProps<T>"},{name:"union",raw:'"columns" | "data"',elements:[{name:"literal",value:'"columns"'},{name:"literal",value:'"data"'}]}],raw:'Omit<DataTableProps<T>, "columns" | "data">'}],raw:'Partial<Omit<DataTableProps<T>, "columns" | "data">>'},description:`Ce qui n'a pas de raccourci ici passe au tableau tel quel — densité,
mode cartes, tri, colonnes figées.`},children:{required:!1,tsType:{name:"ReactNode"},description:"Remplace le tableau. Le reste de la page continue de fonctionner."},className:{required:!1,tsType:{name:"string"},description:""},pageHeaderProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"PageHeaderProps"},{name:"literal",value:'"actions"'}],raw:'Omit<PageHeaderProps, "actions">'}],raw:'Partial<Omit<PageHeaderProps, "actions">>'},description:"Les props du `PageHeader`. Sans `actions`, composées de\n`headerActions` et du bouton de création. `className` s'ajoute."},createButtonProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"ButtonProps"},{name:"union",raw:'"onClick" | "children"',elements:[{name:"literal",value:'"onClick"'},{name:"literal",value:'"children"'}]}],raw:'Omit<ButtonProps, "onClick" | "children">'}],raw:'Partial<Omit<ButtonProps, "onClick" | "children">>'},description:"Les props du bouton de création. Sans `onClick`, qui ouvre le\nformulaire, ni `children` : le libellé passe par\n`operations.create.label`."},bulkDeleteButtonProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"ButtonProps"},{name:"literal",value:'"onClick"'}],raw:'Omit<ButtonProps, "onClick">'}],raw:'Partial<Omit<ButtonProps, "onClick">>'},description:"Les props du bouton de suppression groupée. Sans `onClick`."},paginationProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"PaginationProps"},{name:"union",raw:'"page" | "totalPages" | "onPageChange"',elements:[{name:"literal",value:'"page"'},{name:"literal",value:'"totalPages"'},{name:"literal",value:'"onPageChange"'}]}],raw:'Omit<PaginationProps, "page" | "totalPages" | "onPageChange">'}],raw:`Partial<
  Omit<PaginationProps, "page" | "totalPages" | "onPageChange">
>`},description:"Les props de la `Pagination` — `jumpTo`, `compact`, `siblingCount`.\nSans `page`, `totalPages` ni `onPageChange`, qui ont leurs props ici."},modalProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"ModalProps"},{name:"union",raw:'"open" | "onOpenChange" | "children" | "title" | "description"',elements:[{name:"literal",value:'"open"'},{name:"literal",value:'"onOpenChange"'},{name:"literal",value:'"children"'},{name:"literal",value:'"title"'},{name:"literal",value:'"description"'}]}],raw:'Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "description">'}],raw:`Partial<
  Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "description">
>`},description:"Les props des `Modal` de formulaire et de détail — voir `CrudModalProps`."},formProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"FormProps"},{name:"union",raw:'"fields" | "defaultValues" | "validate" | "onSubmit" | "form"',elements:[{name:"literal",value:'"fields"'},{name:"literal",value:'"defaultValues"'},{name:"literal",value:'"validate"'},{name:"literal",value:'"onSubmit"'},{name:"literal",value:'"form"'}]}],raw:'Omit<FormProps, "fields" | "defaultValues" | "validate" | "onSubmit" | "form">'}],raw:`Partial<
  Omit<FormProps, "fields" | "defaultValues" | "validate" | "onSubmit" | "form">
>`},description:"Les props du `Form` des boîtes — voir `CrudFormProps`."},descriptionsProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"DescriptionsProps"},{name:"literal",value:'"items"'}],raw:'Omit<DescriptionsProps, "items">'}],raw:'Partial<Omit<DescriptionsProps, "items">>'},description:"Les props de la vue de détail par défaut — voir `CrudDescriptionsProps`."}}};export{Vn as C,De as a,vn as b,yn as c,Bn as d,Fe as e,Fn as f,Tn as g,wn as h,Pe as i,bn as r};
