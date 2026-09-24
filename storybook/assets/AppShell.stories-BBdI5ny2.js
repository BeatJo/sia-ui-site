import{r as s,j as e,u as le}from"./iframe-DQyRSC8n.js";import{c as C}from"./classname-nB6WhpaV.js";import{n as oe,a as ue,f as de,b as ce,S as pe}from"./index-BzSpXhzh.js";import{D as me}from"./index-DqhoTtHw.js";import{A as Q}from"./index-ZFVXspco.js";import{B as ge}from"./index-D8tXwpEZ.js";import{B as J}from"./index-u74Kvn0L.js";import{P as fe}from"./index-BoT5b4sV.js";import{S as he}from"./index-CjNDVAHQ.js";import{c as ve}from"./access-Bg-2liVf.js";import"./preload-helper-PPVm8Dsz.js";import"./use-hover-intent-BKcQNcWT.js";import"./index-C4BQ8rIf.js";import"./index-BzRy_9hL.js";import"./index-542shROb.js";import"./index-D7Pt3lB-.js";import"./geometry-Dzgyg8gY.js";import"./index-DUXvzsQk.js";import"./index-Ce4u6n81.js";import"./config-BUwt5-xE.js";const X=s.memo(function({items:c,activeKey:p,max:n=4,renderLink:r,onNavigate:u,more:t,onMore:l,moreLabel:m="Plus",className:h}){const v=oe(c),d=v.slice(0,n),k=v.length-d.length,w=k>0||!!l;return e.jsxs("nav",{className:C("sia-bottom-tabs",h),"aria-label":"Navigation principale",children:[d.map(a=>{const b=a.key===p,y=e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"sia-bottom-tabs__pastille","aria-hidden":"true",children:[a.icon,ue(a,g=>g.badge!==void 0&&g.badge!==null)&&e.jsx("span",{className:"sia-bottom-tabs__point"})]}),e.jsx("span",{className:"sia-bottom-tabs__label",children:a.label})]}),j=C("sia-bottom-tabs__item",b&&"sia-bottom-tabs__item--active"),q=()=>{a.onClick?.(),u?.(a)};return a.href&&r?e.jsx("span",{className:"sia-bottom-tabs__cell",children:r({item:a,children:y,props:{className:j,onClick:q,...b?{"aria-current":"page"}:{}}})},a.key):a.href?e.jsx("a",{href:a.href,className:j,...b?{"aria-current":"page"}:{},onClick:q,children:y},a.key):e.jsx("button",{type:"button",className:j,...b?{"aria-current":"page"}:{},onClick:q,children:y},a.key)}),w&&e.jsxs("button",{type:"button",className:"sia-bottom-tabs__item",onClick:l,"aria-label":`${m}${k>0?` (${k})`:""}`,children:[e.jsx("span",{className:"sia-bottom-tabs__pastille","aria-hidden":"true",children:t??"···"}),e.jsx("span",{className:"sia-bottom-tabs__label",children:m})]})]})});X.__docgenInfo={description:`La navigation d'un téléphone.

Un rail d'icônes muettes n'est pas utilisable au comptoir : sur petit écran
la navigation descend en bas, à portée du pouce, avec des libellés.

Les onglets ne montrent que des **feuilles**. Un onglet qui ouvrirait un
sous-menu depuis une barre basse serait un piège tactile — on vise une
destination, on obtient un menu. Le reste de l'arborescence passe par
« Plus ».`,methods:[],displayName:"BottomTabs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"SidebarItem"}],raw:"SidebarItem[]"},description:"Attendu déjà filtré : la coquille a fait le tri une seule fois."},activeKey:{required:!1,tsType:{name:"string"},description:""},max:{required:!1,tsType:{name:"number"},description:`Nombre d'onglets avant le bouton « Plus ».

Quatre au maximum sur un téléphone : au-delà, les cibles tactiles
descendent sous les quarante-quatre pixels recommandés, et on rate
l'onglet voisin une fois sur trois.`,defaultValue:{value:"4",computed:!1}},renderLink:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
  item: SidebarItem;
  children: ReactNode;
  /**
   * À répandre tel quel sur le lien : \`<Link {...props}>{children}</Link>\`.
   *
   * Regroupés plutôt qu'éparpillés parce que \`aria-current\` en faisait
   * partie : passé à côté, il se perdait sans bruit, et l'entrée courante
   * n'était plus annoncée aux lecteurs d'écran.
   */
  props: {
    className: string;
    onClick: () => void;
    "aria-current"?: "page";
    title?: string;
  };
}) => ReactElement`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  item: SidebarItem;
  children: ReactNode;
  /**
   * À répandre tel quel sur le lien : \`<Link {...props}>{children}</Link>\`.
   *
   * Regroupés plutôt qu'éparpillés parce que \`aria-current\` en faisait
   * partie : passé à côté, il se perdait sans bruit, et l'entrée courante
   * n'était plus annoncée aux lecteurs d'écran.
   */
  props: {
    className: string;
    onClick: () => void;
    "aria-current"?: "page";
    title?: string;
  };
}`,signature:{properties:[{key:"item",value:{name:"SidebarItem",required:!0}},{key:"children",value:{name:"ReactNode",required:!0}},{key:"props",value:{name:"signature",type:"object",raw:`{
  className: string;
  onClick: () => void;
  "aria-current"?: "page";
  title?: string;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"aria-current",value:{name:"literal",value:'"page"',required:!1}},{key:"title",value:{name:"string",required:!1}}]},required:!0},description:"À répandre tel quel sur le lien : `<Link {...props}>{children}</Link>`.\n\nRegroupés plutôt qu'éparpillés parce que `aria-current` en faisait\npartie : passé à côté, il se perdait sans bruit, et l'entrée courante\nn'était plus annoncée aux lecteurs d'écran."}]}},name:"args"}],return:{name:"ReactElement"}}},description:""},onNavigate:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: SidebarItem) => void",signature:{arguments:[{type:{name:"SidebarItem"},name:"item"}],return:{name:"void"}}},description:""},more:{required:!1,tsType:{name:"ReactNode"},description:"Le bouton qui ouvre l'arborescence complète."},onMore:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},moreLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Plus"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function Y({nav:o,children:c,activeKey:p,currentPath:n,renderLink:r,onNavigate:u,can:t,brand:l,sidebarFooter:m,header:h,page:v,footer:d,contentWidth:k="wide",side:w="left",variant:a="default",stickyHeader:b=!0,sidebarState:y,defaultSidebarState:j="expanded",onSidebarStateChange:q,collapsible:g="icon",sidebarWidth:W,sidebarCollapsedWidth:z,mobileNav:I="drawer",mobileBreakpoint:Z=768,ariaLabel:F,className:ee}){const i=le(`(max-width: ${Z-1}px)`),E=s.useMemo(()=>t?de(o,t):o,[t,o]),V=s.useMemo(()=>E.flatMap(f=>"title"in f&&Array.isArray(f.items)?f.items:[f]),[E]),ae=s.useMemo(()=>ce(V,n),[n,V]),P=p??ae,[re,ne]=s.useState(j),D=y!==void 0,x=D?y:re,te=s.useCallback(()=>{const G=x==="expanded"?g==="offcanvas"?"hidden":"collapsed":"expanded";D||ne(G),q?.(G)},[g,x,q,D]),[M,N]=s.useState(!1),[se,ie]=s.useState(n);n!==se&&(ie(n),M&&N(!1));const $=s.useCallback(f=>{u?.(f),N(!1)},[u]),A=x==="collapsed",K=x==="hidden",B=I==="drawer"||I==="both",U=I==="tabs"||I==="both",H=e.jsx(pe,{items:E,collapsed:A&&!i,side:w,variant:a,...P!==void 0?{activeKey:P}:{},...r?{renderLink:r}:{},onNavigate:$,...l?{header:e.jsx("div",{"data-collapsed":A&&!i?"":void 0,children:l})}:{},...m?{footer:e.jsx("div",{"data-collapsed":A&&!i?"":void 0,children:m})}:{},...F?{ariaLabel:F}:{}}),O={};return W&&(O["--sia-shell-sidebar"]=W),z&&(O["--sia-shell-rail"]=z),e.jsxs("div",{className:C("sia-shell",`sia-shell--${w}`,`sia-shell--${a}`,A&&"sia-shell--rail",K&&"sia-shell--hidden",i&&"sia-shell--compact",U&&i&&"sia-shell--with-tabs",ee),style:O,children:[!i&&!K&&e.jsx("aside",{className:"sia-shell__aside",children:H}),e.jsxs("div",{className:"sia-shell__main",children:[(h||g!==!1||i&&B)&&e.jsxs("header",{className:C("sia-shell__header",b&&"sia-shell__header--sticky"),children:[i&&B?e.jsx("button",{type:"button",className:"sia-shell__toggle","aria-label":"Ouvrir la navigation","aria-expanded":M,onClick:()=>N(!0),children:e.jsx(be,{})}):g!==!1&&e.jsx("button",{type:"button",className:"sia-shell__toggle","aria-label":x==="expanded"?"Réduire la navigation":"Déployer la navigation","aria-expanded":x==="expanded",onClick:te,children:e.jsx(ye,{})}),e.jsx("div",{className:"sia-shell__header-content",children:h})]}),e.jsxs("main",{className:C("sia-shell__content",`sia-shell__content--${k}`),children:[v&&e.jsx("div",{className:"sia-shell__page",children:v}),c]}),d&&e.jsx("footer",{className:"sia-shell__footer",children:d})]}),i&&U&&e.jsx(X,{items:V,...P!==void 0?{activeKey:P}:{},...r?{renderLink:r}:{},onNavigate:$,...B?{onMore:()=>N(!0)}:{}}),i&&B&&e.jsx(me,{open:M,onOpenChange:N,position:w,size:"sm",className:"sia-shell__drawer",children:H})]})}function be(){return e.jsx("svg",{viewBox:"0 0 24 24",width:"20",height:"20","aria-hidden":"true",children:e.jsx("path",{d:"M4 7h16M4 12h16M4 17h16",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function ye(){return e.jsxs("svg",{viewBox:"0 0 24 24",width:"20",height:"20","aria-hidden":"true",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2.5",fill:"none",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M9.5 4v16",stroke:"currentColor",strokeWidth:"1.8"})]})}Y.__docgenInfo={description:"La coquille d'une application.\n\nElle n'invente rien : la navigation est le `Sidebar`, le tiroir est le\n`Drawer`, les droits viennent de `@sia-ui/headless`. Ce qu'elle apporte est\nl'assemblage — trois états de barre, une bascule mobile, et une seule\nsource de vérité pour ce qui est visible et pour ce qui est actif.",methods:[],displayName:"AppShell",props:{nav:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"SidebarItem | SidebarSection",elements:[{name:"SidebarItem"},{name:"SidebarSection"}]}],raw:"SidebarEntry[]"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},activeKey:{required:!1,tsType:{name:"string"},description:`La clé de l'entrée courante.

Laissée vide, elle est déduite de \`currentPath\`. La fournir explicitement
ne sert que si les clés ne correspondent à aucune adresse.`},currentPath:{required:!1,tsType:{name:"string"},description:`L'adresse courante — **le point d'accroche du routeur**.

Une seule chaîne, que tous savent produire :

\`\`\`tsx
const { pathname } = useLocation();      // React Router
const pathname = usePathname();          // Next.js
const [pathname] = useLocation();        // wouter
\`\`\`

De là, la coquille déduit l'entrée active par le préfixe le plus long, et
referme le tiroir mobile à chaque navigation — sans jamais importer de
routeur.`},renderLink:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
  item: SidebarItem;
  children: ReactNode;
  /**
   * À répandre tel quel sur le lien : \`<Link {...props}>{children}</Link>\`.
   *
   * Regroupés plutôt qu'éparpillés parce que \`aria-current\` en faisait
   * partie : passé à côté, il se perdait sans bruit, et l'entrée courante
   * n'était plus annoncée aux lecteurs d'écran.
   */
  props: {
    className: string;
    onClick: () => void;
    "aria-current"?: "page";
    title?: string;
  };
}) => ReactElement`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  item: SidebarItem;
  children: ReactNode;
  /**
   * À répandre tel quel sur le lien : \`<Link {...props}>{children}</Link>\`.
   *
   * Regroupés plutôt qu'éparpillés parce que \`aria-current\` en faisait
   * partie : passé à côté, il se perdait sans bruit, et l'entrée courante
   * n'était plus annoncée aux lecteurs d'écran.
   */
  props: {
    className: string;
    onClick: () => void;
    "aria-current"?: "page";
    title?: string;
  };
}`,signature:{properties:[{key:"item",value:{name:"SidebarItem",required:!0}},{key:"children",value:{name:"ReactNode",required:!0}},{key:"props",value:{name:"signature",type:"object",raw:`{
  className: string;
  onClick: () => void;
  "aria-current"?: "page";
  title?: string;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"aria-current",value:{name:"literal",value:'"page"',required:!1}},{key:"title",value:{name:"string",required:!1}}]},required:!0},description:"À répandre tel quel sur le lien : `<Link {...props}>{children}</Link>`.\n\nRegroupés plutôt qu'éparpillés parce que `aria-current` en faisait\npartie : passé à côté, il se perdait sans bruit, et l'entrée courante\nn'était plus annoncée aux lecteurs d'écran."}]}},name:"args"}],return:{name:"ReactElement"}}},description:"Branche les liens sur le routeur. À stabiliser avec `useCallback`."},onNavigate:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: SidebarItem) => void",signature:{arguments:[{type:{name:"SidebarItem"},name:"item"}],return:{name:"void"}}},description:""},can:{required:!1,tsType:{name:"signature",type:"function",raw:"(rule: PermissionRule) => boolean",signature:{arguments:[{type:{name:"union",raw:`| string
| readonly PermissionRule[]
| { anyOf: readonly PermissionRule[] }
| { allOf: readonly PermissionRule[] }
| { not: PermissionRule }`,elements:[{name:"string"},{name:"unknown"},{name:"signature",type:"object",raw:"{ anyOf: readonly PermissionRule[] }",signature:{properties:[{key:"anyOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ allOf: readonly PermissionRule[] }",signature:{properties:[{key:"allOf",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ not: PermissionRule }",signature:{properties:[{key:"not",value:{name:"PermissionRule",required:!0}}]}}]},name:"rule"}],return:{name:"boolean"}}},description:`Évalue les règles de permission.

Le filtrage est fait **une seule fois** ici : ni la barre latérale ni les
onglets ne doivent avoir leur propre idée de ce qui est visible.`},brand:{required:!1,tsType:{name:"ReactNode"},description:"En tête de barre latérale : logo, nom du produit, sélecteur d'entité.\n\nReçoit `data-collapsed` en mode rail, comme `sidebarFooter` : sans quoi\nun nom de produit écrit en toutes lettres déborde des quatre rem du rail."},sidebarFooter:{required:!1,tsType:{name:"ReactNode"},description:`Bas de la barre latérale, sous la navigation.

C'est la place de la déconnexion et des réglages du compte — ce qui sort
de l'application, par opposition à l'en-tête, réservé à ce qui agit sur
l'écran courant. Reçoit \`data-collapsed\` en mode rail, de quoi masquer un
libellé sans changer de composant.`},header:{required:!1,tsType:{name:"ReactNode"},description:"La barre du haut : recherche, notifications, avatar de compte."},page:{required:!1,tsType:{name:"ReactNode"},description:"Au-dessus du contenu, pleine largeur de la zone.\n\nL'endroit d'un `PageHeader`. La coquille ne prend pas de `title` : un\n`<h1>` rendu par la coquille force chaque page à passer par ses props, et\nune page qui veut deux titres ou une mise en page à elle doit se battre."},footer:{required:!1,tsType:{name:"ReactNode"},description:""},contentWidth:{required:!1,tsType:{name:"union",raw:'"wide" | "narrow" | "full"',elements:[{name:"literal",value:'"wide"'},{name:"literal",value:'"narrow"'},{name:"literal",value:'"full"'}]},description:`La largeur de la zone de contenu.

Décidée ici plutôt qu'écran par écran : des largeurs posées page après
page finissent par diverger, et personne ne sait laquelle fait foi.`,defaultValue:{value:'"wide"',computed:!1}},side:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "filled" | "floating"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"filled"'},{name:"literal",value:'"floating"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},stickyHeader:{required:!1,tsType:{name:"boolean"},description:"L'en-tête suit-il le défilement.",defaultValue:{value:"true",computed:!1}},sidebarState:{required:!1,tsType:{name:"union",raw:'"expanded" | "collapsed" | "hidden"',elements:[{name:"literal",value:'"expanded"'},{name:"literal",value:'"collapsed"'},{name:"literal",value:'"hidden"'}]},description:""},defaultSidebarState:{required:!1,tsType:{name:"union",raw:'"expanded" | "collapsed" | "hidden"',elements:[{name:"literal",value:'"expanded"'},{name:"literal",value:'"collapsed"'},{name:"literal",value:'"hidden"'}]},description:"",defaultValue:{value:'"expanded"',computed:!1}},onSidebarStateChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(state: SidebarState) => void",signature:{arguments:[{type:{name:"union",raw:'"expanded" | "collapsed" | "hidden"',elements:[{name:"literal",value:'"expanded"'},{name:"literal",value:'"collapsed"'},{name:"literal",value:'"hidden"'}]},name:"state"}],return:{name:"void"}}},description:""},collapsible:{required:!1,tsType:{name:"union",raw:'"icon" | "offcanvas" | false',elements:[{name:"literal",value:'"icon"'},{name:"literal",value:'"offcanvas"'},{name:"literal",value:"false"}]},description:"",defaultValue:{value:'"icon"',computed:!1}},sidebarWidth:{required:!1,tsType:{name:"string"},description:"Toute valeur CSS : `16rem`, `280px`, `min(20vw, 320px)`."},sidebarCollapsedWidth:{required:!1,tsType:{name:"string"},description:""},mobileNav:{required:!1,tsType:{name:"union",raw:'"drawer" | "tabs" | "both"',elements:[{name:"literal",value:'"drawer"'},{name:"literal",value:'"tabs"'},{name:"literal",value:'"both"'}]},description:"",defaultValue:{value:'"drawer"',computed:!1}},mobileBreakpoint:{required:!1,tsType:{name:"number"},description:"Sous cette largeur, la barre latérale cède la place.",defaultValue:{value:"768",computed:!1}},ariaLabel:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const qe=[{key:"pilotage",title:"Pilotage",items:[{key:"tableau",label:"Tableau de bord",icon:"◧",href:"/"},{key:"rapports",label:"Rapports",icon:"◨",href:"/rapports",badge:2}]},{key:"gestion",title:"Gestion",items:[{key:"ventes",label:"Ventes",icon:"◐",items:[{key:"factures",label:"Factures",href:"/ventes/factures",badge:12},{key:"reglements",label:"Règlements",items:[{key:"encaisses",label:"Encaissés",href:"/ventes/encaisses"},{key:"attente",label:"En attente",href:"/ventes/attente",badge:3}]}]},{key:"clients",label:"Clients",icon:"◑",href:"/clients"},{key:"admin",label:"Administration",icon:"◒",permission:"admin",items:[{key:"equipe",label:"Équipe",href:"/admin/equipe",permission:"admin"},{key:"journal",label:"Journal",href:"/admin/journal",permission:"admin"}]}]}];function xe(o){const[c,p]=s.useState(o),n=s.useCallback(({item:r,children:u,props:t})=>e.jsx("a",{...t,href:r.href??"#",onClick:l=>{l.preventDefault(),r.href&&p(r.href),t.onClick()},children:u}),[]);return{chemin:c,renderLink:n}}function ke({contentWidth:o,mobileNav:c,side:p,collapsible:n,stickyHeader:r,droits:u}){const{chemin:t,renderLink:l}=xe("/ventes/factures"),m=u.split(/[,\s]+/).filter(Boolean),h=ve({granted:()=>m}).can;return e.jsxs("div",{style:{height:"40rem",overflow:"auto",border:"1px solid var(--sia-border)"},children:[e.jsx("style",{children:"[data-collapsed] .demo-marque strong { display: none; }"}),e.jsx(Y,{nav:qe,currentPath:t,renderLink:l,can:h,side:p,collapsible:n,contentWidth:o,mobileNav:c,stickyHeader:r,ariaLabel:"Navigation de démonstration",brand:e.jsxs("div",{className:"demo-marque",style:{display:"flex",alignItems:"center",gap:".6rem",padding:".35rem"},children:[e.jsx(Q,{name:"SIA UI",fallback:"S",variant:"solid",shape:"rounded",size:"sm"}),e.jsx("strong",{style:{fontSize:".95rem",whiteSpace:"nowrap"},children:"SIA Gestion"})]}),header:e.jsxs(e.Fragment,{children:[e.jsx(he,{placeholder:"Rechercher…",style:{maxWidth:"20rem"}}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:".6rem"},children:[e.jsx(ge,{tone:"success",children:"En ligne"}),e.jsx(Q,{name:"Ivan Mbella",size:"sm",status:"online",onPress:()=>{}})]})]}),sidebarFooter:e.jsx(J,{variant:"ghost",size:"sm",style:{width:"100%"},children:"Se déconnecter"}),page:e.jsx(fe,{eyebrow:t,title:"Factures",description:"Les factures émises, leur règlement et leurs relances.",actions:e.jsx(J,{size:"sm",children:"Nouvelle facture"})}),footer:e.jsx("span",{children:"SIA UI — démonstration"}),children:e.jsx("div",{style:{display:"grid",gap:"1rem"},children:Array.from({length:6},(v,d)=>e.jsxs("div",{style:{padding:"1.25rem",border:"1px solid var(--sia-border)",borderRadius:"var(--sia-radius)",background:"var(--sia-surface)"},children:["Bloc de contenu ",d+1]},d))})})]})}const Fe={title:"Patterns/AppShell",component:ke,tags:["autodocs"],args:{contentWidth:"wide",mobileNav:"drawer",side:"left",collapsible:"icon",stickyHeader:!0,droits:"admin"},argTypes:{contentWidth:{control:"inline-radio",options:["wide","narrow","full"]},mobileNav:{control:"inline-radio",options:["drawer","tabs","both"]},side:{control:"inline-radio",options:["left","right"]},collapsible:{control:"inline-radio",options:["icon","offcanvas",!1]},droits:{control:"text"}},parameters:{layout:"fullscreen"}},S={},_={args:{droits:""}},R={args:{side:"right"}},T={args:{contentWidth:"narrow"}},L={args:{mobileNav:"both"},parameters:{viewport:{defaultViewport:"mobile1"}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:"{}",...S.parameters?.docs?.source},description:{story:`Cliquer dans la navigation change l'adresse, et la coquille en déduit
l'entrée courante — y compris depuis une page de détail.`,...S.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    droits: ""
  }
}`,..._.parameters?.docs?.source},description:{story:"Sans le droit `admin`, la rubrique entière disparaît de la barre.",..._.parameters?.docs?.description}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    side: "right"
  }
}`,...R.parameters?.docs?.source},description:{story:"La barre passe à droite, et ses volets sortent de l'autre côté.",...R.parameters?.docs?.description}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    contentWidth: "narrow"
  }
}`,...T.parameters?.docs?.source},description:{story:"Le contenu borné à la largeur d'un formulaire.",...T.parameters?.docs?.description}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    mobileNav: "both"
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...L.parameters?.docs?.source},description:{story:`Sous 768 px, la barre latérale cède la place. Réduire la fenêtre de
Storybook — ou choisir un gabarit mobile — pour voir les onglets bas.`,...L.parameters?.docs?.description}}};const $e=["Playground","DroitsRestreints","ADroite","ContenuEtroit","Mobile"];export{R as ADroite,T as ContenuEtroit,_ as DroitsRestreints,L as Mobile,S as Playground,$e as __namedExportsOrder,Fe as default};
