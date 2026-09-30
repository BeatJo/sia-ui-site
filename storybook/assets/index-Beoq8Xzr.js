import{u as B,r as V,j as r}from"./iframe-DZg55ZNc.js";import{c as E}from"./classname-nB6WhpaV.js";import{I as O}from"./index-Bqjpn0Yf.js";import{T as M}from"./index-GxFmXwZ6.js";import{C as U}from"./index-5xtzPySF.js";import{D as z}from"./index-8-JYDxjg.js";import{T as G}from"./index-DCVLEJzz.js";import{D as J}from"./index-05QFsk2h.js";import{S as $}from"./index-G1Ik1XVs.js";import{M as H}from"./index-DHJ_-nYK.js";import{R as K,b as Q}from"./index-CWbxydQi.js";import{C as W}from"./index-CyduzDzo.js";import{S as X}from"./index-DklfwuHX.js";import{F as Y}from"./index-DpHSWWYS.js";import{I as Z}from"./index-DlFkKD_P.js";import{S as ee}from"./index-AM8I_DuJ.js";import{R as ae}from"./index-2QIwCWnl.js";import{C as ne}from"./index-rsTTF7Q-.js";import{R as re}from"./index-DQuBVv6g.js";import{M as ie}from"./index-C_HJCIBD.js";import{J as le}from"./index-CUDxdpWx.js";import{O as te}from"./index-Ddua4HqO.js";import{T as oe}from"./index-DTvbRlNq.js";import{A as se}from"./index-DdEnb7ys.js";import{R as ue}from"./index-DQYhGau5.js";function L(...u){return u.filter(Boolean).join(" ")||void 0}function de(u){const{type:a="text",name:s,value:d,defaultValue:o,onValueChange:l,options:g=[],referenceOptions:j=[],controlLabel:T,placeholder:t,disabled:n,controlProps:i={}}=u,m=typeof d=="string"?d:void 0,f=typeof o=="string"?o:void 0,b=typeof d=="number"?d:void 0,h=typeof o=="number"?o:void 0,w=Array.isArray(d)&&d.length===2&&d.every(e=>typeof e=="number")?d:void 0,F=Array.isArray(o)&&o.length===2&&o.every(e=>typeof e=="number")?o:void 0,x=typeof d=="boolean"?d:void 0,C=typeof o=="boolean"?o:void 0,k=Array.isArray(d)&&d.every(e=>typeof e=="string")?d:void 0,R=Array.isArray(o)&&o.every(e=>typeof e=="string")?o:void 0,N=i,c={...m!==void 0?{value:m}:{},...f!==void 0?{defaultValue:f}:{}},A={...b!==void 0?{value:b}:{},...h!==void 0?{defaultValue:h}:{}},p={...k!==void 0?{value:k}:{},...R!==void 0?{defaultValue:R}:{}},q={...s?{name:s}:{},...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{}};if(["text","email","password","phone","number","hidden"].includes(a))return r.jsx(O,{...N,type:a==="phone"?"tel":a,name:s,value:typeof d=="number"?d:m,defaultValue:typeof o=="number"?o:f,placeholder:t,disabled:n,onChange:e=>l?.(a==="number"?e.target.valueAsNumber:e.target.value)});if(a==="textarea")return r.jsx(M,{...i,name:s,value:m,defaultValue:f,placeholder:t,disabled:n,onChange:e=>l?.(e.target.value)});if(a==="currency")return r.jsx(U,{...i,name:s,value:b??null,defaultValue:h??null,placeholder:t,disabled:n,onValueChange:e=>l?.(e??void 0)});if(a==="date")return r.jsx(z,{...i,...q,...c,onValueChange:e=>l?.(e)});if(a==="time")return r.jsx(G,{...i,...q,...c,onValueChange:e=>l?.(e)});if(a==="datetime"){const e={...d!==void 0?{value:d}:{},...o!==void 0?{defaultValue:o}:{}};return r.jsx(J,{...i,...e,onValueChange:y=>l?.(y)})}if(a==="select")return r.jsx($,{...i,options:g,...q,...c,onValueChange:e=>l?.(e)});if(a==="multiselect")return r.jsx(H,{...i,options:g,...p,...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)});if(a==="radio")return r.jsx(K,{...i,...s?{name:s}:{},...n!==void 0?{disabled:n}:{},...m!==void 0?{value:m}:{},...f!==void 0?{defaultValue:f}:{},onValueChange:e=>l?.(e),children:g.map(e=>r.jsx(Q,{value:e.value,label:e.label,...e.disabled!==void 0?{disabled:e.disabled}:{}},e.value))});if(a==="checkbox")return r.jsx(W,{...i,name:s,label:T,disabled:n,checked:x,defaultChecked:C,onChange:e=>l?.(e.target.checked)});if(a==="switch")return r.jsx(X,{...i,...s?{name:s}:{},...T?{label:T}:{},...n!==void 0?{disabled:n}:{},...x!==void 0?{checked:x}:{},...C!==void 0?{defaultChecked:C}:{},onCheckedChange:e=>l?.(e)});if(a==="file")return r.jsx(Y,{...i,name:s,disabled:n,onFilesChange:e=>l?.(e)});if(a==="image")return r.jsx(Z,{...i,...n!==void 0?{disabled:n}:{},...m!==void 0?{value:m}:{},onValueChange:e=>l?.(e)});if(a==="slider"){const{value:e,defaultValue:y,onValueChange:S,name:I,disabled:D,...v}=i;return r.jsx(ee,{...v,...s!==void 0?{name:s}:{},...n!==void 0?{disabled:n}:{},...w!==void 0||b!==void 0?{value:w??b}:{},...F!==void 0||h!==void 0?{defaultValue:F??h}:{},onValueChange:_=>l?.(_)})}return a==="rating"?r.jsx(ae,{...i,...n!==void 0?{disabled:n}:{},...A,onValueChange:e=>l?.(e)}):a==="color"?r.jsx(ne,{...i,name:s,disabled:n,value:m,defaultValue:f,onValueChange:e=>l?.(e)}):a==="rich-text"?r.jsx(re,{...i,...c,...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)}):a==="markdown"?r.jsx(ie,{...i,...c,...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)}):a==="json"?r.jsx(le,{...i,...c,...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)}):a==="otp"?r.jsx(te,{...i,...c,...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)}):a==="tags"?r.jsx(oe,{...i,...p,...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)}):a==="autocomplete"?r.jsx(se,{...i,options:g,...c,...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)}):r.jsx(ue,{...i,options:j.length?j:g,...c,...t!==void 0?{placeholder:t}:{},...n!==void 0?{disabled:n}:{},onValueChange:e=>l?.(e)})}function me(u){const{field:a}=u;return a?{...u,name:u.name??a.name,value:u.value!==void 0?u.value:a.value,onValueChange:s=>{a.onChange(s),u.onValueChange?.(s)},onBlur:()=>{a.onBlur(),u.onBlur?.()},error:u.error??a.error,...P("required",u.required??a.required),...P("disabled",u.disabled??a.disabled)}:u}function P(u,a){return a===void 0?{}:{[u]:a}}function ce(u){const a=me(u),{onBlur:s,type:d="text",label:o,helpText:l,description:g,status:j="default",message:T,error:t,warning:n,success:i,required:m=!1,optional:f=!1,optionalLabel:b,htmlFor:h,orientation:w="vertical",className:F,children:x}=a,C=B(),k=b??C.optional,R=V.useId(),N=V.useId(),c=V.useId(),A=V.useId(),p=x??de(a),q=h??p.props.id??R,e=l??g,y=t?"error":n?"warning":i?"success":j,S=t??n??i??T,I=L(p.props["aria-describedby"],e?c:void 0,S?A:void 0),D=L(p.props["aria-labelledby"],o?N:void 0),v={id:q};I&&(v["aria-describedby"]=I),D&&(v["aria-labelledby"]=D),y==="error"?v["aria-invalid"]=!0:p.props["aria-invalid"]!==void 0&&(v["aria-invalid"]=p.props["aria-invalid"]),m&&(v["aria-required"]=!0);const _=V.isValidElement(p)?V.cloneElement(p,v):p;return d==="hidden"&&!x?_:r.jsxs("div",{className:E("sia-field",`sia-field--${w}`,`sia-field--${y}`,F),"data-status":y,"data-required":m||void 0,children:[r.jsxs("div",{className:"sia-field__header",children:[o&&r.jsxs("label",{id:N,htmlFor:q,className:"sia-field__label",children:[o,m&&r.jsxs("span",{className:"sia-field__required","aria-hidden":"true",children:[" ","*"]})]}),f&&!m&&r.jsx("span",{className:"sia-field__optional",children:k})]}),r.jsx("div",{className:"sia-field__control",...s?{onBlur:s}:{},children:_}),e&&r.jsx("div",{id:c,className:"sia-field__help",children:e}),S&&r.jsx("div",{id:A,role:y==="error"?"alert":"status",className:"sia-field__message",children:S})]})}ce.__docgenInfo={description:`Le champ, et tout ce qui l'entoure.

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
sans démonter le branchement.`},onBlur:{required:!1,tsType:{name:"union",raw:"(() => void) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:"Appelé quand le champ est quitté. Déclenche la validation « au blur »."},type:{required:!1,tsType:{name:"union",raw:`| "text"
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
| "hidden"`,elements:[{name:"literal",value:'"text"'},{name:"literal",value:'"textarea"'},{name:"literal",value:'"email"'},{name:"literal",value:'"password"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"number"'},{name:"literal",value:'"currency"'},{name:"literal",value:'"date"'},{name:"literal",value:'"time"'},{name:"literal",value:'"datetime"'},{name:"literal",value:'"select"'},{name:"literal",value:'"multiselect"'},{name:"literal",value:'"radio"'},{name:"literal",value:'"checkbox"'},{name:"literal",value:'"switch"'},{name:"literal",value:'"file"'},{name:"literal",value:'"image"'},{name:"literal",value:'"slider"'},{name:"literal",value:'"rating"'},{name:"literal",value:'"color"'},{name:"literal",value:'"rich-text"'},{name:"literal",value:'"markdown"'},{name:"literal",value:'"json"'},{name:"literal",value:'"otp"'},{name:"literal",value:'"tags"'},{name:"literal",value:'"autocomplete"'},{name:"literal",value:'"reference"'},{name:"literal",value:'"hidden"'}]},description:""},label:{required:!1,tsType:{name:"ReactNode"},description:""},helpText:{required:!1,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},status:{required:!1,tsType:{name:"union",raw:'"default" | "error" | "success" | "warning"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"error"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'}]},description:""},message:{required:!1,tsType:{name:"ReactNode"},description:""},error:{required:!1,tsType:{name:"ReactNode"},description:""},warning:{required:!1,tsType:{name:"ReactNode"},description:""},success:{required:!1,tsType:{name:"ReactNode"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},optional:{required:!1,tsType:{name:"boolean"},description:""},optionalLabel:{required:!1,tsType:{name:"ReactNode"},description:"La mention des champs facultatifs. Par défaut, `optional` de la locale."},htmlFor:{required:!1,tsType:{name:"string"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"vertical" | "horizontal"',elements:[{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'}]},description:""},className:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"union",raw:`| string
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
