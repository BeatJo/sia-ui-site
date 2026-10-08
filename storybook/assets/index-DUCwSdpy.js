import{u as B,r as C,j as r}from"./iframe-Ce1rQf5z.js";import{c as E}from"./classname-nB6WhpaV.js";import{I as O}from"./index-DKDf4LSF.js";import{T as M}from"./index-C0oHOSuy.js";import{C as U}from"./index-COw7J52z.js";import{D as z}from"./index-CybIum0F.js";import{T as G}from"./index-BDugKE6z.js";import{D as J}from"./index-BCZRjpWC.js";import{S as $}from"./index-BGoktTGE.js";import{M as H}from"./index-CMYIruMd.js";import{R as K,b as Q}from"./index-B5qdYSwm.js";import{C as W}from"./index-Dqi_o6Nd.js";import{S as X}from"./index-suim4tdN.js";import{F as Y}from"./index-DUJg3NHd.js";import{I as Z}from"./index-B8_f-soW.js";import{S as ee}from"./index-BRbEzfKA.js";import{R as ae}from"./index-vvaKWg1b.js";import{C as ne}from"./index-wzUCOMCk.js";import{R as re}from"./index-B0kXdhVm.js";import{M as ie}from"./index-DPWwk4i3.js";import{J as le}from"./index-BwpiL-uZ.js";import{O as te}from"./index-B3e7x5XA.js";import{T as oe}from"./index-BobWrgXM.js";import{A as se}from"./index-AWvofhog.js";import{R as ue}from"./index-BYhiVI8W.js";function L(...i){return i.filter(Boolean).join(" ")||void 0}function de(i){if(i.type==="custom"){if(!i.renderControl)throw new Error('Field type="custom" requires renderControl.');return i.renderControl({name:i.name,value:i.value,onChange:e=>i.onValueChange?.(e),onBlur:()=>i.onBlur?.(),disabled:i.disabled??!1,required:i.required??!1,error:i.error})}const{type:a="text",name:u,value:d,defaultValue:s,onValueChange:t,options:b=[],referenceOptions:w=[],controlLabel:V,placeholder:o,disabled:n,controlProps:l={}}=i,m=typeof d=="string"?d:void 0,f=typeof s=="string"?s:void 0,g=typeof d=="number"?d:void 0,h=typeof s=="number"?s:void 0,j=Array.isArray(d)&&d.length===2&&d.every(e=>typeof e=="number")?d:void 0,F=Array.isArray(s)&&s.length===2&&s.every(e=>typeof e=="number")?s:void 0,y=typeof d=="boolean"?d:void 0,T=typeof s=="boolean"?s:void 0,k=Array.isArray(d)&&d.every(e=>typeof e=="string")?d:void 0,R=Array.isArray(s)&&s.every(e=>typeof e=="string")?s:void 0,N=l,c={...m!==void 0?{value:m}:{},...f!==void 0?{defaultValue:f}:{}},A={...g!==void 0?{value:g}:{},...h!==void 0?{defaultValue:h}:{}},p={...k!==void 0?{value:k}:{},...R!==void 0?{defaultValue:R}:{}},x={...u?{name:u}:{},...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{}};if(["text","email","password","phone","number","hidden"].includes(a))return r.jsx(O,{...N,type:a==="phone"?"tel":a,name:u,value:typeof d=="number"?d:m,defaultValue:typeof s=="number"?s:f,placeholder:o,disabled:n,onChange:e=>t?.(a==="number"?e.target.valueAsNumber:e.target.value)});if(a==="textarea")return r.jsx(M,{...l,name:u,value:m,defaultValue:f,placeholder:o,disabled:n,onChange:e=>t?.(e.target.value)});if(a==="currency")return r.jsx(U,{...l,name:u,value:g??null,defaultValue:h??null,placeholder:o,disabled:n,onValueChange:e=>t?.(e??void 0)});if(a==="date")return r.jsx(z,{...l,...x,...c,onValueChange:e=>t?.(e)});if(a==="time")return r.jsx(G,{...l,...x,...c,onValueChange:e=>t?.(e)});if(a==="datetime"){const e={...d!==void 0?{value:d}:{},...s!==void 0?{defaultValue:s}:{}};return r.jsx(J,{...l,...e,onValueChange:q=>t?.(q)})}if(a==="select")return r.jsx($,{...l,options:b,...x,...c,onValueChange:e=>t?.(e)});if(a==="multiselect")return r.jsx(H,{...l,options:b,...p,...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)});if(a==="radio")return r.jsx(K,{...l,...u?{name:u}:{},...n!==void 0?{disabled:n}:{},...m!==void 0?{value:m}:{},...f!==void 0?{defaultValue:f}:{},onValueChange:e=>t?.(e),children:b.map(e=>r.jsx(Q,{value:e.value,label:e.label,...e.disabled!==void 0?{disabled:e.disabled}:{}},e.value))});if(a==="checkbox")return r.jsx(W,{...l,name:u,label:V,disabled:n,checked:y,defaultChecked:T,onChange:e=>t?.(e.target.checked)});if(a==="switch")return r.jsx(X,{...l,...u?{name:u}:{},...V?{label:V}:{},...n!==void 0?{disabled:n}:{},...y!==void 0?{checked:y}:{},...T!==void 0?{defaultChecked:T}:{},onCheckedChange:e=>t?.(e)});if(a==="file")return r.jsx(Y,{...l,name:u,disabled:n,onFilesChange:e=>t?.(e)});if(a==="image")return r.jsx(Z,{...l,...n!==void 0?{disabled:n}:{},...m!==void 0?{value:m}:{},onValueChange:e=>t?.(e)});if(a==="slider"){const{value:e,defaultValue:q,onValueChange:S,name:I,disabled:D,...v}=l;return r.jsx(ee,{...v,...u!==void 0?{name:u}:{},...n!==void 0?{disabled:n}:{},...j!==void 0||g!==void 0?{value:j??g}:{},...F!==void 0||h!==void 0?{defaultValue:F??h}:{},onValueChange:_=>t?.(_)})}return a==="rating"?r.jsx(ae,{...l,...n!==void 0?{disabled:n}:{},...A,onValueChange:e=>t?.(e)}):a==="color"?r.jsx(ne,{...l,name:u,disabled:n,value:m,defaultValue:f,onValueChange:e=>t?.(e)}):a==="rich-text"?r.jsx(re,{...l,...c,...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)}):a==="markdown"?r.jsx(ie,{...l,...c,...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)}):a==="json"?r.jsx(le,{...l,...c,...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)}):a==="otp"?r.jsx(te,{...l,...c,...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)}):a==="tags"?r.jsx(oe,{...l,...p,...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)}):a==="autocomplete"?r.jsx(se,{...l,options:b,...c,...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)}):r.jsx(ue,{...l,options:w.length?w:b,...c,...o!==void 0?{placeholder:o}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>t?.(e)})}function me(i){const{field:a}=i;return a?{...i,name:i.name??a.name,value:i.value!==void 0?i.value:a.value,onValueChange:u=>{a.onChange(u),i.onValueChange?.(u)},onBlur:()=>{a.onBlur(),i.onBlur?.()},error:i.error??a.error,...P("required",i.required??a.required),...P("disabled",i.disabled??a.disabled)}:i}function P(i,a){return a===void 0?{}:{[i]:a}}function ce(i){const a=me(i),{onBlur:u,type:d="text",label:s,helpText:t,description:b,status:w="default",message:V,error:o,warning:n,success:l,required:m=!1,optional:f=!1,optionalLabel:g,htmlFor:h,orientation:j="vertical",className:F,children:y}=a,T=B(),k=g??T.optional,R=C.useId(),N=C.useId(),c=C.useId(),A=C.useId(),p=y??de(a),x=h??p.props.id??R,e=t??b,q=o?"error":n?"warning":l?"success":w,S=o??n??l??V,I=L(p.props["aria-describedby"],e?c:void 0,S?A:void 0),D=L(p.props["aria-labelledby"],s?N:void 0),v={id:x};I&&(v["aria-describedby"]=I),D&&(v["aria-labelledby"]=D),q==="error"?v["aria-invalid"]=!0:p.props["aria-invalid"]!==void 0&&(v["aria-invalid"]=p.props["aria-invalid"]),m&&(v["aria-required"]=!0);const _=C.isValidElement(p)?C.cloneElement(p,v):p;return d==="hidden"&&!y?_:r.jsxs("div",{className:E("sia-field",`sia-field--${j}`,`sia-field--${q}`,F),"data-status":q,"data-required":m||void 0,children:[r.jsxs("div",{className:"sia-field__header",children:[s&&r.jsxs("label",{id:N,htmlFor:x,className:"sia-field__label",children:[s,m&&r.jsxs("span",{className:"sia-field__required","aria-hidden":"true",children:[" ","*"]})]}),f&&!m&&r.jsx("span",{className:"sia-field__optional",children:k})]}),r.jsx("div",{className:"sia-field__control",...u&&(d!=="custom"||y)?{onBlur:u}:{},children:_}),e&&r.jsx("div",{id:c,className:"sia-field__help",children:e}),S&&r.jsx("div",{id:A,role:q==="error"?"alert":"status",className:"sia-field__message",children:S})]})}ce.__docgenInfo={description:`Le champ, et tout ce qui l'entoure.

Un libellé, un contrôle, un message d'erreur, et les attributs qui les
relient — \`id\`, \`aria-describedby\`, \`aria-invalid\`. Ce câblage est
toujours le même et toujours oublié quelque part : ici il est fait une
fois.

\`type\` choisit le contrôle parmi les vingt-sept que la bibliothèque
fournit. Le champ ne les réimplémente pas : il les monte et leur passe le
branchement.`,methods:[],displayName:"Field",props:{field:{required:!1,tsType:{name:"union",raw:"FieldBindingLike | undefined",elements:[{name:"FieldBindingLike"},{name:"undefined"}]},description:`Le branchement d'un formulaire, en une prop.

\`<Field label="Courriel" field={form.bind("email")} />\` : nom, valeur,
changement, sortie de champ et message d'erreur arrivent ensemble. Le
champ ne sait pas d'où vient l'objet — \`useLocalForm\`, un adaptateur
react-hook-form, ou trois \`useState\`. C'est tout l'intérêt du contrat :
aucune bibliothèque de formulaires n'est importée ici.

Les props écrites explicitement l'emportent, pour corriger un cas isolé
sans démonter le branchement.`},onBlur:{required:!1,tsType:{name:"union",raw:"(() => void) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:"Appelé quand le champ est quitté. Déclenche la validation « au blur »."},type:{required:!1,tsType:{name:"union",raw:`| "custom"
| "text"
| "textarea"
| "email"
| "password"
| "phone"
| "number"
| "currency"
| "date"
| "time"
| "datetime"
| "select"
| "multiselect"
| "radio"
| "checkbox"
| "switch"
| "file"
| "image"
| "slider"
| "rating"
| "color"
| "rich-text"
| "markdown"
| "json"
| "otp"
| "tags"
| "autocomplete"
| "reference"
| "hidden"`,elements:[{name:"literal",value:'"custom"'},{name:"literal",value:'"text"'},{name:"literal",value:'"textarea"'},{name:"literal",value:'"email"'},{name:"literal",value:'"password"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"number"'},{name:"literal",value:'"currency"'},{name:"literal",value:'"date"'},{name:"literal",value:'"time"'},{name:"literal",value:'"datetime"'},{name:"literal",value:'"select"'},{name:"literal",value:'"multiselect"'},{name:"literal",value:'"radio"'},{name:"literal",value:'"checkbox"'},{name:"literal",value:'"switch"'},{name:"literal",value:'"file"'},{name:"literal",value:'"image"'},{name:"literal",value:'"slider"'},{name:"literal",value:'"rating"'},{name:"literal",value:'"color"'},{name:"literal",value:'"rich-text"'},{name:"literal",value:'"markdown"'},{name:"literal",value:'"json"'},{name:"literal",value:'"otp"'},{name:"literal",value:'"tags"'},{name:"literal",value:'"autocomplete"'},{name:"literal",value:'"reference"'},{name:"literal",value:'"hidden"'}]},description:""},renderControl:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: FieldRenderContext) => ReactElement<FieldControlProps>",signature:{arguments:[{type:{name:"FieldRenderContext"},name:"context"}],return:{name:"ReactElement",elements:[{name:"signature",type:"object",raw:`{
  id?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"aria-labelledby",value:{name:"string",required:!1}},{key:"aria-invalid",value:{name:"boolean",required:!1}},{key:"aria-required",value:{name:"boolean",required:!1}}]}}],raw:"ReactElement<FieldControlProps>"}}},description:'Contrôle métier de `type: "custom"`, branché comme les autres champs.'},label:{required:!1,tsType:{name:"ReactNode"},description:""},helpText:{required:!1,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},status:{required:!1,tsType:{name:"union",raw:'"default" | "error" | "success" | "warning"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"error"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'}]},description:""},message:{required:!1,tsType:{name:"ReactNode"},description:""},error:{required:!1,tsType:{name:"ReactNode"},description:""},warning:{required:!1,tsType:{name:"ReactNode"},description:""},success:{required:!1,tsType:{name:"ReactNode"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},optional:{required:!1,tsType:{name:"boolean"},description:""},optionalLabel:{required:!1,tsType:{name:"ReactNode"},description:"La mention des champs facultatifs. Par défaut, `optional` de la locale."},htmlFor:{required:!1,tsType:{name:"string"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"vertical" | "horizontal"',elements:[{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'}]},description:""},className:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]},description:""},defaultValue:{required:!1,tsType:{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]},description:""},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: FieldValue) => void",signature:{arguments:[{type:{name:"union",raw:`| string
| number
| SliderRangeValue
| boolean
| string[]
| DateTimeValue
| File[]
| File
| null
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]},name:"value"}],return:{name:"void"}}},description:""},options:{required:!1,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:""},referenceOptions:{required:!1,tsType:{name:"Array",elements:[{name:"ReferenceOption"}],raw:"ReferenceOption[]"},description:""},controlLabel:{required:!1,tsType:{name:"ReactNode"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},controlProps:{required:!1,tsType:{name:"unknown"},description:"Réglages du contrôle que `type` choisit — `searchable` d'un `Select`,\n`maxLength` d'un `Input`, `accept` d'un `FileUpload`. Pour `radio`, ils\nvont au `RadioGroup`.\n\nAppliqués sous ce que le champ pilote : valeur, changement, nom,\nidentifiant, options, texte indicatif et désactivation gardent leurs\nprops dédiées. Ignorés quand le contrôle est fourni en `children`."},children:{required:!1,tsType:{name:"ReactElement",elements:[{name:"signature",type:"object",raw:`{
  id?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"aria-labelledby",value:{name:"string",required:!1}},{key:"aria-invalid",value:{name:"boolean",required:!1}},{key:"aria-required",value:{name:"boolean",required:!1}}]}}],raw:"ReactElement<FieldControlProps>"},description:""}}};export{ce as F};
