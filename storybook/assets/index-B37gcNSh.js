import{r as x,j as r}from"./iframe-DQyRSC8n.js";import{c as O}from"./classname-nB6WhpaV.js";import{I as L}from"./index-BvKA8DNz.js";import{T as B}from"./index-hgvvEYN6.js";import{C as M}from"./index-CgIwsWhE.js";import{D as U}from"./index-DwIfyezI.js";import{T as J}from"./index-DIjzHByv.js";import{D as G}from"./index-ZUlI2xFg.js";import{S as z}from"./index-B2lcHbKZ.js";import{M as $}from"./index-CbAoWPb6.js";import{R as H,a as K}from"./index-Nvixlgiw.js";import{C as Q}from"./index-BgR4VZMf.js";import{S as W}from"./index-DGilTRrq.js";import{F as X}from"./index-B1LgHv20.js";import{I as Y}from"./index-BvaTCaPl.js";import{S as Z}from"./index-ptKfjOlk.js";import{R as ee}from"./index-ecnM6PeP.js";import{C as ne}from"./index-DW0HdbDi.js";import{R as ae}from"./index-Ch9wKpys.js";import{M as re}from"./index-DCWCW-eh.js";import{J as ie}from"./index-C9rs7WdQ.js";import{O as te}from"./index-DJzovI1r.js";import{T as le}from"./index-DRl1unue.js";import{A as oe}from"./index-CsjN3UlB.js";import{R as se}from"./index-DdYdAVcI.js";function A(...u){return u.filter(Boolean).join(" ")||void 0}function ue(u){const{type:n="text",name:s,value:d,defaultValue:o,onValueChange:t,options:v=[],referenceOptions:k=[],controlLabel:T,placeholder:l,disabled:a,controlProps:i={}}=u,p=typeof d=="string"?d:void 0,c=typeof o=="string"?o:void 0,g=typeof d=="number"?d:void 0,b=typeof o=="number"?o:void 0,j=Array.isArray(d)&&d.length===2&&d.every(e=>typeof e=="number")?d:void 0,R=Array.isArray(o)&&o.length===2&&o.every(e=>typeof e=="number")?o:void 0,y=typeof d=="boolean"?d:void 0,C=typeof o=="boolean"?o:void 0,V=Array.isArray(d)&&d.every(e=>typeof e=="string")?d:void 0,q=Array.isArray(o)&&o.every(e=>typeof e=="string")?o:void 0,S=i,m={...p!==void 0?{value:p}:{},...c!==void 0?{defaultValue:c}:{}},F={...g!==void 0?{value:g}:{},...b!==void 0?{defaultValue:b}:{}},P={...V!==void 0?{value:V}:{},...q!==void 0?{defaultValue:q}:{}},f={...s?{name:s}:{},...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{}};if(["text","email","password","phone","number","hidden"].includes(n))return r.jsx(L,{...S,type:n==="phone"?"tel":n,name:s,value:typeof d=="number"?d:p,defaultValue:typeof o=="number"?o:c,placeholder:l,disabled:a,onChange:e=>t?.(n==="number"?e.target.valueAsNumber:e.target.value)});if(n==="textarea")return r.jsx(B,{...i,name:s,value:p,defaultValue:c,placeholder:l,disabled:a,onChange:e=>t?.(e.target.value)});if(n==="currency")return r.jsx(M,{...i,name:s,value:g??null,defaultValue:b??null,placeholder:l,disabled:a,onValueChange:e=>t?.(e??void 0)});if(n==="date")return r.jsx(U,{...i,...f,...m,onValueChange:e=>t?.(e)});if(n==="time")return r.jsx(J,{...i,...f,...m,onValueChange:e=>t?.(e)});if(n==="datetime"){const e={...d!==void 0?{value:d}:{},...o!==void 0?{defaultValue:o}:{}};return r.jsx(G,{...i,...e,onValueChange:w=>t?.(w)})}if(n==="select")return r.jsx(z,{...i,options:v,...f,...m,onValueChange:e=>t?.(e)});if(n==="multiselect")return r.jsx($,{...i,options:v,...P,...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)});if(n==="radio")return r.jsx(H,{...i,...s?{name:s}:{},...a!==void 0?{disabled:a}:{},...p!==void 0?{value:p}:{},...c!==void 0?{defaultValue:c}:{},onValueChange:e=>t?.(e),children:v.map(e=>r.jsx(K,{value:e.value,label:e.label,...e.disabled!==void 0?{disabled:e.disabled}:{}},e.value))});if(n==="checkbox")return r.jsx(Q,{...i,name:s,label:T,disabled:a,checked:y,defaultChecked:C,onChange:e=>t?.(e.target.checked)});if(n==="switch")return r.jsx(W,{...i,...s?{name:s}:{},...T?{label:T}:{},...a!==void 0?{disabled:a}:{},...y!==void 0?{checked:y}:{},...C!==void 0?{defaultChecked:C}:{},onCheckedChange:e=>t?.(e)});if(n==="file")return r.jsx(X,{...i,name:s,disabled:a,onFilesChange:e=>t?.(e)});if(n==="image")return r.jsx(Y,{...i,...a!==void 0?{disabled:a}:{},...p!==void 0?{value:p}:{},onValueChange:e=>t?.(e)});if(n==="slider"){const{value:e,defaultValue:w,onValueChange:I,name:h,disabled:D,..._}=i;return r.jsx(Z,{..._,...s!==void 0?{name:s}:{},...a!==void 0?{disabled:a}:{},...j!==void 0||g!==void 0?{value:j??g}:{},...R!==void 0||b!==void 0?{defaultValue:R??b}:{},onValueChange:E=>t?.(E)})}return n==="rating"?r.jsx(ee,{...i,...a!==void 0?{disabled:a}:{},...F,onValueChange:e=>t?.(e)}):n==="color"?r.jsx(ne,{...i,name:s,disabled:a,value:p,defaultValue:c,onValueChange:e=>t?.(e)}):n==="rich-text"?r.jsx(ae,{...i,...m,...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)}):n==="markdown"?r.jsx(re,{...i,...m,...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)}):n==="json"?r.jsx(ie,{...i,...m,...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)}):n==="otp"?r.jsx(te,{...i,...m,...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)}):n==="tags"?r.jsx(le,{...i,...P,...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)}):n==="autocomplete"?r.jsx(oe,{...i,options:v,...m,...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)}):r.jsx(se,{...i,options:k.length?k:v,...m,...l!==void 0?{placeholder:l}:{},...a!==void 0?{disabled:a}:{},onValueChange:e=>t?.(e)})}function de(u){const{field:n}=u;return n?{...u,name:u.name??n.name,value:u.value!==void 0?u.value:n.value,onValueChange:s=>{n.onChange(s),u.onValueChange?.(s)},onBlur:()=>{n.onBlur(),u.onBlur?.()},error:u.error??n.error,...N("required",u.required??n.required),...N("disabled",u.disabled??n.disabled)}:u}function N(u,n){return n===void 0?{}:{[u]:n}}function me(u){const n=de(u),{onBlur:s,type:d="text",label:o,helpText:t,description:v,status:k="default",message:T,error:l,warning:a,success:i,required:p=!1,optional:c=!1,optionalLabel:g="Optionnel",htmlFor:b,orientation:j="vertical",className:R,children:y}=n,C=x.useId(),V=x.useId(),q=x.useId(),S=x.useId(),m=y??ue(n),F=b??m.props.id??C,P=t??v,f=l?"error":a?"warning":i?"success":k,e=l??a??i??T,w=A(m.props["aria-describedby"],P?q:void 0,e?S:void 0),I=A(m.props["aria-labelledby"],o?V:void 0),h={id:F};w&&(h["aria-describedby"]=w),I&&(h["aria-labelledby"]=I),f==="error"?h["aria-invalid"]=!0:m.props["aria-invalid"]!==void 0&&(h["aria-invalid"]=m.props["aria-invalid"]),p&&(h["aria-required"]=!0);const D=x.isValidElement(m)?x.cloneElement(m,h):m;return d==="hidden"&&!y?D:r.jsxs("div",{className:O("sia-field",`sia-field--${j}`,`sia-field--${f}`,R),"data-status":f,"data-required":p||void 0,children:[r.jsxs("div",{className:"sia-field__header",children:[o&&r.jsxs("label",{id:V,htmlFor:F,className:"sia-field__label",children:[o,p&&r.jsxs("span",{className:"sia-field__required","aria-hidden":"true",children:[" ","*"]})]}),c&&!p&&r.jsx("span",{className:"sia-field__optional",children:g})]}),r.jsx("div",{className:"sia-field__control",...s?{onBlur:s}:{},children:D}),P&&r.jsx("div",{id:q,className:"sia-field__help",children:P}),e&&r.jsx("div",{id:S,role:f==="error"?"alert":"status",className:"sia-field__message",children:e})]})}me.__docgenInfo={description:`Le champ, et tout ce qui l'entoure.

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
| "hidden"`,elements:[{name:"literal",value:'"text"'},{name:"literal",value:'"textarea"'},{name:"literal",value:'"email"'},{name:"literal",value:'"password"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"number"'},{name:"literal",value:'"currency"'},{name:"literal",value:'"date"'},{name:"literal",value:'"time"'},{name:"literal",value:'"datetime"'},{name:"literal",value:'"select"'},{name:"literal",value:'"multiselect"'},{name:"literal",value:'"radio"'},{name:"literal",value:'"checkbox"'},{name:"literal",value:'"switch"'},{name:"literal",value:'"file"'},{name:"literal",value:'"image"'},{name:"literal",value:'"slider"'},{name:"literal",value:'"rating"'},{name:"literal",value:'"color"'},{name:"literal",value:'"rich-text"'},{name:"literal",value:'"markdown"'},{name:"literal",value:'"json"'},{name:"literal",value:'"otp"'},{name:"literal",value:'"tags"'},{name:"literal",value:'"autocomplete"'},{name:"literal",value:'"reference"'},{name:"literal",value:'"hidden"'}]},description:""},label:{required:!1,tsType:{name:"ReactNode"},description:""},helpText:{required:!1,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},status:{required:!1,tsType:{name:"union",raw:'"default" | "error" | "success" | "warning"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"error"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'}]},description:""},message:{required:!1,tsType:{name:"ReactNode"},description:""},error:{required:!1,tsType:{name:"ReactNode"},description:""},warning:{required:!1,tsType:{name:"ReactNode"},description:""},success:{required:!1,tsType:{name:"ReactNode"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},optional:{required:!1,tsType:{name:"boolean"},description:""},optionalLabel:{required:!1,tsType:{name:"ReactNode"},description:""},htmlFor:{required:!1,tsType:{name:"string"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"vertical" | "horizontal"',elements:[{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'}]},description:""},className:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"union",raw:`| string
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
| undefined`,elements:[{name:"string"},{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"DateTimeValue"},{name:"Array",elements:[{name:"File"}],raw:"File[]"},{name:"File"},{name:"null"},{name:"undefined"}]},name:"value"}],return:{name:"void"}}},description:""},options:{required:!1,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:""},referenceOptions:{required:!1,tsType:{name:"Array",elements:[{name:"ReferenceOption"}],raw:"ReferenceOption[]"},description:""},controlLabel:{required:!1,tsType:{name:"ReactNode"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},controlProps:{required:!1,tsType:{name:"Partial",elements:[{name:"intersection",raw:`InputProps &
TextareaProps &
CurrencyInputProps &
DatePickerProps &
TimePickerProps &
DateTimePickerProps &
SelectProps &
MultiSelectProps &
RadioGroupProps &
CheckboxProps &
SwitchProps &
FileUploadProps &
ImageUploadProps &
SliderProps &
RatingProps &
ColorPickerProps &
RichTextEditorProps &
MarkdownEditorProps &
JsonEditorProps &
OtpInputProps &
TagsInputProps &
AutocompleteProps &
ReferenceSelectProps`,elements:[{name:"InputProps"},{name:"TextareaProps"},{name:"CurrencyInputProps"},{name:"DatePickerProps"},{name:"TimePickerProps"},{name:"DateTimePickerProps"},{name:"SelectProps"},{name:"MultiSelectProps"},{name:"RadioGroupProps"},{name:"CheckboxProps"},{name:"SwitchProps"},{name:"FileUploadProps"},{name:"ImageUploadProps"},{name:"SliderProps"},{name:"RatingProps"},{name:"ColorPickerProps"},{name:"RichTextEditorProps"},{name:"MarkdownEditorProps"},{name:"JsonEditorProps"},{name:"OtpInputProps"},{name:"TagsInputProps"},{name:"AutocompleteProps"},{name:"ReferenceSelectProps"}]}],raw:`Partial<
  InputProps &
    TextareaProps &
    CurrencyInputProps &
    DatePickerProps &
    TimePickerProps &
    DateTimePickerProps &
    SelectProps &
    MultiSelectProps &
    RadioGroupProps &
    CheckboxProps &
    SwitchProps &
    FileUploadProps &
    ImageUploadProps &
    SliderProps &
    RatingProps &
    ColorPickerProps &
    RichTextEditorProps &
    MarkdownEditorProps &
    JsonEditorProps &
    OtpInputProps &
    TagsInputProps &
    AutocompleteProps &
    ReferenceSelectProps
>`},description:""},children:{required:!1,tsType:{name:"ReactElement",elements:[{name:"signature",type:"object",raw:`{
  id?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"aria-labelledby",value:{name:"string",required:!1}},{key:"aria-invalid",value:{name:"boolean",required:!1}},{key:"aria-required",value:{name:"boolean",required:!1}}]}}],raw:"ReactElement<FieldControlProps>"},description:""}}};export{me as F};
