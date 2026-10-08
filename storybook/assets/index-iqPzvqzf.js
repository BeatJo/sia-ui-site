import{j as s,u as j,r as h}from"./iframe-Ce1rQf5z.js";import{c as _}from"./classname-nB6WhpaV.js";import{P as Ue}from"./index-Bnh0B_2h.js";import{B as Te}from"./index-DpravLuC.js";import{P as _e}from"./index-DD9t2IbB.js";import{r as Ge,D as ze}from"./index-BA2Cu-Oa.js";import{P as Ze,T as Fe,g as Qe,n as Ye}from"./index-DsCYDnXV.js";import{b as Je,a as We}from"./date-s5KGH4S-.js";import{g as Xe,a as en}from"./config-BYtg1vzt.js";import{i as nn,g as rn}from"./currency-BD96M5Ab.js";import{r as an,p as tn,e as sn,c as ln}from"./validation-B4yozFze.js";import{A as on}from"./index-uglyjnua.js";import{B as mn,t as un}from"./index-C4AByKqF.js";import{F as dn,h as cn,f as Ce}from"./index-iiaBeuVY.js";import{M as Pe}from"./index-ZnkJ3Pdu.js";import{D as pn}from"./index-gtdmfW2d.js";function fn(e,n,i){const t=Xe(),{locale:a=t.locale,fallback:r=t.empty,minusSign:l=t.minusSign,decimalSeparator:o=t.decimalSeparator,groupSeparator:p=t.groupSeparator,...y}=n;return nn(e)?en(rn(a,{...i,...y}).formatToParts(e),{minusSign:l,decimalSeparator:o,groupSeparator:p}):r}function gn(e,n={}){return fn(e,n,{maximumFractionDigits:2})}function Qn(e){return e}const bn=new Set(["textarea","rich-text","markdown","json","password","file","image","otp","hidden"]),De=new Set(["text","textarea","email","phone","autocomplete","reference"]),yn=new Set(["number","currency","slider"]),wn={email:e=>sn(e?.invalidEmail),phone:e=>tn(e?.invalidPhone)};function G(e){const n=e.replace(/[_-]+/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").toLowerCase().trim();return n.charAt(0).toUpperCase()+n.slice(1)}function k(e,n,i="create"){const t=e.type??"text";if(n==="table")return e.inTable??!bn.has(t);if(n==="form"){const a=e.inForm??(!e.readOnly&&!e.value);return typeof a=="string"?a===i:a}return e.inDetail??!0}function Re(e,n){return e.required===!0||e.required===n}function vn(e,n){return n.value??(i=>i[e])}function D(e){return Object.entries(e.fields)}function Tn({value:e}){const n=j();return s.jsx(s.Fragment,{children:e?n.yes:n.no})}function Fn({value:e,time:n}){const{language:i}=j();return s.jsx(s.Fragment,{children:n?Je(e,{locale:i}):We(e,{locale:i})})}function Pn({value:e,decimals:n}){const{language:i}=j();return s.jsx(s.Fragment,{children:gn(e,{locale:i,...n!==void 0?{minimumFractionDigits:n,maximumFractionDigits:n}:{}})})}function Se(e,n){const i=n.type??"text",t=vn(e,n);if(i==="currency")return a=>{const r=t(a);return typeof r!="number"?null:s.jsx(on,{value:r,...n.currency?{currency:n.currency}:{}})};if(i==="select"||i==="radio")return a=>{const r=t(a);if(r==null||r==="")return null;const l=String(r),p=n.options?.find(y=>y.value===l)?.label??l;return n.tones?.[l]?s.jsx(mn,{tone:un(n.tones,l),children:p}):s.jsx(s.Fragment,{children:p})};if(i==="checkbox"||i==="switch")return a=>s.jsx(Tn,{value:t(a)});if(i==="date"||i==="datetime")return a=>{const r=t(a);return typeof r!="string"&&!(r instanceof Date)?null:s.jsx(Fn,{value:r,time:i==="datetime"})};if(i==="number")return a=>{const r=t(a);return typeof r!="number"?null:s.jsx(Pn,{value:r,decimals:n.decimals})};if(i==="multiselect"||i==="tags")return a=>{const r=t(a);return Array.isArray(r)?r.map(l=>{const o=String(l),p=n.options?.find(y=>y.value===o);return typeof p?.label=="string"?p.label:o}).join(", "):null}}function qn(e){const n=[];let i=!1;for(const[t,a]of D(e)){if(!k(a,"table"))continue;const r=a.type??"text",l=a.render??Se(t,a);let o=a.card;o===void 0&&!i&&De.has(r)&&(o="title",i=!0),n.push({key:t,header:a.label??G(t),...a.value?{accessor:a.value}:{},...l?{cell:l}:{},align:a.align??(yn.has(r)?"end":"start"),...a.width?{width:a.width}:{},...a.truncate?{truncate:a.truncate}:{},...a.sortable?{sortable:a.sortable}:{},...o?{card:o}:{}})}return n}function hn(e){const n=[];for(const[i,t]of D(e)){if(!k(t,"detail"))continue;const a=t.render??Se(i,t);n.push({key:i,header:t.label??G(i),...t.value?{accessor:t.value}:{},...a?{cell:a}:{}})}return n}function qe(e,n="create"){const i=[],t=new Map;for(const[a,r]of D(e)){if(!k(r,"form",n))continue;const l={name:a,label:r.label??G(a),...r.type?{type:r.type}:{},...Re(r,n)?{required:!0}:{},...r.placeholder?{placeholder:r.placeholder}:{},...r.helpText?{helpText:r.helpText}:{},...r.description?{description:r.description}:{},...r.options?{options:r.options}:{},...r.colSpan?{colSpan:r.colSpan}:{},...r.controlProps?{controlProps:r.controlProps}:{},...r.renderControl?{renderControl:r.renderControl}:{}};if(r.group){const o=t.get(r.group);o?o.push(l):t.set(r.group,[l])}else i.push(l)}return[...i,...Array.from(t,([a,r])=>({group:a,fields:r}))]}function he(e,n="create",i){const t={};for(const[a,r]of D(e)){if(!k(r,"form",n))continue;const l=[];Re(r,n)&&l.push(an(i?.required));const o=wn[r.type??"text"];o&&l.push(o(i)),r.rules&&l.push(...r.rules),l.length>0&&(t[a]=l)}if(Object.keys(t).length!==0)return ln(t)}function Vn(e){return D(e).filter(([,n])=>n.searchable??De.has(n.type??"text")).map(([n])=>n)}function Cn(e){const n={};for(const[i,t]of D(e))k(t,"form")&&(n[i]=t.defaultValue??(t.type==="checkbox"||t.type==="switch"?!1:t.type==="multiselect"||t.type==="tags"?[]:""));return n}function Dn(e){const n=e.key??"id";return typeof n=="function"?n:(i,t)=>{const a=i[n];return typeof a=="string"||typeof a=="number"?a:t}}function Ve(e={}){const n={create:"creer",view:"lire",edit:"modifier",delete:"supprimer",...e};return i=>({create:`${i}.${n.create}`,view:`${i}.${n.view}`,edit:`${i}.${n.edit}`,delete:`${i}.${n.delete}`})}function Rn(e){return e.permissions==="auto"?Ve()(e.name):e.permissions&&"domain"in e.permissions?Ve(e.permissions.verbs)(e.permissions.domain):e.permissions??{}}function Sn(e){const n={};for(const i of Ce(e))n[i]="";return n}function An(e,n){const i=e,t={};for(const a of Ce(n)){const r=i[a];t[a]=typeof r=="string"||typeof r=="number"||typeof r=="boolean"||Array.isArray(r)?r:""}return t}function Ae({state:e,onClose:n,columns:i,fields:t,validate:a,editFields:r,editValidate:l,onSubmit:o,createDefaults:p,toFormValues:y,renderDetail:E,getRowKey:R,dialog:u,modalProps:F,formProps:L,descriptionsProps:$}){const P=j(),w=e?.mode==="create",q=e?.mode==="edit",V=e?.mode==="view",f=q?r??t:t,S=q?l??a:a,C=e==null?"vide":`${e.mode}-${e.row!==void 0&&e.index!==void 0&&R?String(R(e.row,e.index)):String(e.index??"")}`,N=q&&e?.row!==void 0&&f?y?.(e.row)??An(e.row,f):p??(f?Sn(f):{});return s.jsxs(s.Fragment,{children:[f&&(w||q)&&s.jsx(Pe,{...F,open:!0,onOpenChange:d=>{d||n()},title:w?u?.createTitle??P.create:u?.editTitle??P.edit,...w?u?.createDescription?{description:u.createDescription}:{}:u?.editDescription?{description:u.editDescription}:{},className:_("sia-crud-dialog",F?.className),children:s.jsx(dn,{fields:f,defaultValues:N,...S?{validate:S}:{},columns:u?.columns??1,submitText:u?.submitText??(w?P.create:P.save),requireDirty:q,...L,onSubmit:async d=>{const K=await o?.(d,{mode:w?"create":"edit",...e?.row!==void 0?{row:e.row}:{},...e?.index!==void 0?{index:e.index}:{}});if(cn(K))return K;n()}},C)}),V&&e?.row!==void 0&&s.jsx(Pe,{...F,open:!0,onOpenChange:d=>{d||n()},title:u?.viewTitle??P.crudPage.detailTitle,...u?.viewDescription?{description:u.viewDescription}:{},className:_("sia-crud-dialog",F?.className),children:E?.(e.row,e.index??0)??s.jsx(pn,{columns:u?.detailColumns??2,...$,items:i.filter(d=>d.card!=="hidden").map(d=>({key:d.key,label:d.header,value:Ge(e.row,e.index??0,d)}))})})]})}Ae.__docgenInfo={description:"Les boîtes du CRUD : créer, modifier, consulter.\n\nElles n'inventent rien — `Modal` pour la boîte, `Form` pour la saisie,\n`Descriptions` pour la lecture. Ce qu'elles apportent est de savoir\nlaquelle ouvrir, avec quelles valeurs, et de refermer une fois l'envoi\npassé.",methods:[],displayName:"CrudDialogs",props:{state:{required:!0,tsType:{name:"union",raw:"CrudDialogState<T> | null",elements:[{name:"CrudDialogState",elements:[{name:"T"}],raw:"CrudDialogState<T>"},{name:"null"}]},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},columns:{required:!0,tsType:{name:"Array",elements:[{name:"DataTableColumn",elements:[{name:"T"}],raw:"DataTableColumn<T>"}],raw:"Array<DataTableColumn<T>>"},description:""},fields:{required:!1,tsType:{name:"union",raw:"FormEntry[] | undefined",elements:[{name:"Array",elements:[{name:"union",raw:"FormFieldConfig | FormFieldGroup",elements:[{name:"FormFieldConfig"},{name:"FormFieldGroup"}]}],raw:"FormEntry[]"},{name:"undefined"}]},description:""},validate:{required:!1,tsType:{name:"union",raw:"FormValidator<FormShape> | undefined",elements:[{name:"signature",type:"function",raw:`(
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
>`},{name:"undefined"}]},description:"Voir `CrudFormProps`."},descriptionsProps:{required:!1,tsType:{name:"union",raw:"CrudDescriptionsProps | undefined",elements:[{name:"Partial",elements:[{name:"Omit",elements:[{name:"DescriptionsProps"},{name:"literal",value:'"items"'}],raw:'Omit<DescriptionsProps, "items">'}],raw:'Partial<Omit<DescriptionsProps, "items">>'},{name:"undefined"}]},description:"Voir `CrudDescriptionsProps`."}}};function xn(e,n){const[i,...t]=e.split("{name}");return t.length===0?e:s.jsxs(s.Fragment,{children:[i,n,t.join("{name}")]})}function On({resource:e,title:n,description:i,eyebrow:t,headingLevel:a,columns:r,data:l,getRowKey:o,onCreate:p,onView:y,onEdit:E,onDelete:R,fields:u,onSubmit:F,validate:L,createDefaults:$,toFormValues:P,detail:w,dialog:q,operations:V,extraRowActions:f,onBulkDelete:S,can:C,headerActions:N,toolbar:d,searchKeys:K,searchPlaceholder:z,onSearch:Z,searchDelay:Q,loading:xe=!1,error:Y,onRetry:J,onRefresh:W,refreshing:X,empty:ee,page:ne,totalPages:re,onPageChange:ae,pageSize:ie,onPageSizeChange:te,pageSizeOptions:se,table:Oe,children:je,className:ke,pageHeaderProps:Ee,createButtonProps:Le,bulkDeleteButtonProps:le,paginationProps:Ne,modalProps:Ke,formProps:Me,descriptionsProps:Be}){const c=j(),[Ie,M]=h.useState(null),m=h.useMemo(()=>e?{columns:qn(e),detailColumns:hn(e),fields:qe(e,"create"),validate:he(e,"create",c.resource),editFields:qe(e,"edit"),editValidate:he(e,"edit",c.resource),searchKeys:Vn(e),defaults:Cn(e),getRowKey:Dn(e),permissions:Rn(e),formColumns:e.formColumns,label:e.label}:void 0,[e,c.resource]),oe=r??m?.columns??[],H=u??m?.fields,$e=L??m?.validate,me=K??m?.searchKeys,U=o??m?.getRowKey,B=!!(H&&F),ue=w===void 0?!!H:w!==!1,de=h.useMemo(()=>p??(B?()=>M({mode:"create"}):void 0),[p,B]),ce=h.useMemo(()=>E??(B?(v,g)=>M({mode:"edit",row:v,index:g}):void 0),[E,B]),pe=h.useMemo(()=>y??(ue?(v,g)=>M({mode:"view",row:v,index:g}):void 0),[y,ue]),A=h.useMemo(()=>{const v=[],g=(b,I,O)=>{const T=V?.[b];if(!I||T===!1)return;const we=T?.permission??m?.permissions[b],ve=T?.confirm===!1?void 0:T?.confirm??O.confirm;v.push({key:b,label:T?.label??O.label,icon:T?.icon??O.icon,...O.tone?{tone:O.tone}:{},...we!==void 0?{permission:we}:{},...T?.hidden?{hidden:T.hidden}:{},...T?.disabled?{disabled:T.disabled}:{},...ve?{confirm:ve}:{},onSelect:I})};return g("view",pe,{label:c.crudPage.view,icon:s.jsx(Qe,{})}),g("edit",ce,{label:c.edit,icon:s.jsx(Ye,{})}),g("delete",R,{label:c.delete,icon:s.jsx(Fe,{}),tone:"danger",confirm:{title:c.crudPage.deleteTitle,description:c.crudPage.deleteDescription,confirmLabel:c.delete,destructive:!0}}),v},[V,R,ce,pe,m,c]),fe=h.useMemo(()=>{if(!f)return A.length>0?A:void 0;const v=A.filter(b=>b.key==="delete"),g=A.filter(b=>b.key!=="delete");return(b,I)=>[...g,...typeof f=="function"?f(b,I):f,...v]},[A,f]),x=V?.create===!1?null:V?.create??{},ge=x?.permission??m?.permissions.create,He=ge===void 0||!C||C(ge),be=de&&x&&He?s.jsx(Te,{disabled:x.disabled??!1,leftIcon:x.icon??s.jsx(Ze,{}),...Le,onClick:de,children:x.label??m?.label?.create??c.create}):null,ye=be||N?s.jsxs(s.Fragment,{children:[N,be]}):void 0;return s.jsxs("section",{className:_("sia-crud-page",ke),children:[s.jsx(Ue,{title:n??m?.label?.plural??e?.name??"",...i??e?.description?{description:i??e?.description}:{},...t?{eyebrow:t}:{},...a?{level:a}:{},...Ee,...ye?{actions:ye}:{}}),je??s.jsx(ze,{columns:oe,data:l,...U?{getRowKey:U}:{},...d?{toolbar:d}:{},...me?{searchKeys:me}:{},...z?{searchPlaceholder:z}:{},...Z?{onSearch:Z}:{},...Q!==void 0?{searchDelay:Q}:{},...fe?{rowActions:fe}:{},...C?{can:C}:{},loading:xe,...Y?{error:Y}:{},...J?{onRetry:J}:{},...W?{onRefresh:W}:{},...X!==void 0?{refreshing:X}:{},...ee?{empty:ee}:{},...S?{selectable:!0,selectionActions:({keys:v,rows:g,clear:b})=>s.jsx(Te,{size:"sm",variant:"outline",tone:"danger",leftIcon:s.jsx(Fe,{}),...le,onClick:async()=>{await S(v,g),b()},children:le?.children??c.delete})}:{},inlineActionsLimit:3,...Oe}),s.jsx(Ae,{state:Ie,onClose:()=>M(null),columns:m?.detailColumns??oe,fields:H,validate:$e,editFields:u??m?.editFields,editValidate:L??m?.editValidate,onSubmit:F,createDefaults:$??m?.defaults,toFormValues:P,renderDetail:typeof w=="function"?w:void 0,getRowKey:U,modalProps:Ke,formProps:Me,descriptionsProps:Be,dialog:{...m?.label?.singular?{createTitle:m.label.create??c.create,editTitle:xn(c.crudPage.editTitle,m.label.singular),viewTitle:m.label.singular}:{},...m?.formColumns?{columns:m.formColumns}:{},...q}}),ne!==void 0&&re!==void 0&&ae&&s.jsx(_e,{showTotal:!0,...ie!==void 0?{pageSize:ie}:{},...te?{onPageSizeChange:te}:{},...se?{pageSizeOptions:se}:{},...Ne,page:ne,totalPages:re,onPageChange:ae})]})}On.__docgenInfo={description:`Une page de liste, avec ses quatre opérations.

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
| { not: PermissionRule }`,elements:[{name:"string"},{name:"unknown"},{name:"signature",type:"object",raw:"{ anyOf: readonly PermissionRule[] }",signature:{properties:[{key:"anyOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ allOf: readonly PermissionRule[] }",signature:{properties:[{key:"allOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ not: PermissionRule }",signature:{properties:[{key:"not",value:{name:"PermissionRule",required:!0}}]}}]},name:"rule"}],return:{name:"boolean"}}},description:""},headerActions:{required:!1,tsType:{name:"ReactNode"},description:"Actions de page, à droite du titre. S'ajoute au bouton de création."},toolbar:{required:!1,tsType:{name:"ReactNode"},description:""},searchKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},searchPlaceholder:{required:!1,tsType:{name:"string"},description:""},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: string) => void",signature:{arguments:[{type:{name:"string"},name:"query"}],return:{name:"void"}}},description:""},searchDelay:{required:!1,tsType:{name:"number"},description:"Temporise `onSearch` — voir `DataTable`. 300 pour une recherche serveur."},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"ReactNode"},description:""},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onRefresh:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Recharge la liste ; réglages du bouton via `table.refreshButtonProps`."},refreshing:{required:!1,tsType:{name:"boolean"},description:"Chargement en arrière-plan, sans remplacer les lignes."},empty:{required:!1,tsType:{name:'DataTableProps["empty"]',raw:'DataTableProps<T>["empty"]'},description:""},page:{required:!1,tsType:{name:"number"},description:""},totalPages:{required:!1,tsType:{name:"number"},description:""},onPageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},pageSize:{required:!1,tsType:{name:"number"},description:"Avec `onPageSizeChange`, ajoute le choix du nombre de lignes par page."},onPageSizeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(pageSize: number) => void",signature:{arguments:[{type:{name:"number"},name:"pageSize"}],return:{name:"void"}}},description:""},pageSizeOptions:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:"Les tailles proposées — voir `Pagination`."},table:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"DataTableProps",elements:[{name:"T"}],raw:"DataTableProps<T>"},{name:"union",raw:'"columns" | "data"',elements:[{name:"literal",value:'"columns"'},{name:"literal",value:'"data"'}]}],raw:'Omit<DataTableProps<T>, "columns" | "data">'}],raw:'Partial<Omit<DataTableProps<T>, "columns" | "data">>'},description:`Ce qui n'a pas de raccourci ici passe au tableau tel quel — densité,
mode cartes, tri, colonnes figées.`},children:{required:!1,tsType:{name:"ReactNode"},description:"Remplace le tableau. Le reste de la page continue de fonctionner."},className:{required:!1,tsType:{name:"string"},description:""},pageHeaderProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"PageHeaderProps"},{name:"literal",value:'"actions"'}],raw:'Omit<PageHeaderProps, "actions">'}],raw:'Partial<Omit<PageHeaderProps, "actions">>'},description:"Les props du `PageHeader`. Sans `actions`, composées de\n`headerActions` et du bouton de création. `className` s'ajoute."},createButtonProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"ButtonProps"},{name:"union",raw:'"onClick" | "children"',elements:[{name:"literal",value:'"onClick"'},{name:"literal",value:'"children"'}]}],raw:'Omit<ButtonProps, "onClick" | "children">'}],raw:'Partial<Omit<ButtonProps, "onClick" | "children">>'},description:"Les props du bouton de création. Sans `onClick`, qui ouvre le\nformulaire, ni `children` : le libellé passe par\n`operations.create.label`."},bulkDeleteButtonProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"ButtonProps"},{name:"literal",value:'"onClick"'}],raw:'Omit<ButtonProps, "onClick">'}],raw:'Partial<Omit<ButtonProps, "onClick">>'},description:"Les props du bouton de suppression groupée. Sans `onClick`."},paginationProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"PaginationProps"},{name:"union",raw:'"page" | "totalPages" | "onPageChange"',elements:[{name:"literal",value:'"page"'},{name:"literal",value:'"totalPages"'},{name:"literal",value:'"onPageChange"'}]}],raw:'Omit<PaginationProps, "page" | "totalPages" | "onPageChange">'}],raw:`Partial<
  Omit<PaginationProps, "page" | "totalPages" | "onPageChange">
>`},description:"Les props de la `Pagination` — `jumpTo`, `compact`, `siblingCount`.\nSans `page`, `totalPages` ni `onPageChange`, qui ont leurs props ici."},modalProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"ModalProps"},{name:"union",raw:'"open" | "onOpenChange" | "children" | "title" | "description"',elements:[{name:"literal",value:'"open"'},{name:"literal",value:'"onOpenChange"'},{name:"literal",value:'"children"'},{name:"literal",value:'"title"'},{name:"literal",value:'"description"'}]}],raw:'Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "description">'}],raw:`Partial<
  Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "description">
>`},description:"Les props des `Modal` de formulaire et de détail — voir `CrudModalProps`."},formProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"FormProps"},{name:"union",raw:'"fields" | "defaultValues" | "validate" | "onSubmit" | "form"',elements:[{name:"literal",value:'"fields"'},{name:"literal",value:'"defaultValues"'},{name:"literal",value:'"validate"'},{name:"literal",value:'"onSubmit"'},{name:"literal",value:'"form"'}]}],raw:'Omit<FormProps, "fields" | "defaultValues" | "validate" | "onSubmit" | "form">'}],raw:`Partial<
  Omit<FormProps, "fields" | "defaultValues" | "validate" | "onSubmit" | "form">
>`},description:"Les props du `Form` des boîtes — voir `CrudFormProps`."},descriptionsProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"DescriptionsProps"},{name:"literal",value:'"items"'}],raw:'Omit<DescriptionsProps, "items">'}],raw:'Partial<Omit<DescriptionsProps, "items">>'},description:"Les props de la vue de détail par défaut — voir `CrudDescriptionsProps`."}}};export{On as C,Ae as a,Cn as b,Ve as c,Qn as d,hn as e,qe as f,Rn as g,Dn as h,Vn as i,he as j,qn as r};
