import{j as s}from"./iframe-DZg55ZNc.js";import{c as r}from"./classname-nB6WhpaV.js";function i({ratio:e=16/9,children:a,className:t}){return s.jsx("div",{className:r("sia-aspect-ratio",t),style:{"--sia-aspect":String(e)},children:a})}i.__docgenInfo={description:`Une boîte au rapport imposé.

Elle existe pour une seule raison : réserver la place avant que l'image ou
l'iframe n'arrive. Sans elle, le contenu qui suit saute au chargement — ce
que mesure le Cumulative Layout Shift, et ce que les gens ressentent comme
une page qui bouge sous le doigt.`,methods:[],displayName:"AspectRatio",props:{ratio:{required:!1,tsType:{name:"number"},description:"Le rapport largeur / hauteur. `16 / 9`, `1`, `4 / 3`.",defaultValue:{value:"16 / 9",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{i as A};
