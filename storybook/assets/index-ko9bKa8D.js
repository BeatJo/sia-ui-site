import{r as l,u as F,j as e,f as re}from"./iframe-DZg55ZNc.js";import{c as d}from"./classname-nB6WhpaV.js";import{n as ie,a as se,f as le,b as oe,S as ue}from"./index-B8kPdMjA.js";import{D as T}from"./index-CPLqAsUp.js";const Q=l.memo(function({items:c,activeKey:s,max:r=4,renderLink:n,onNavigate:v,more:p,onMore:o,moreLabel:f,className:h}){const k=F().appShell,w=f??k.more,S=ie(c),g=S.slice(0,r),b=S.length-g.length,O=b>0||!!o;return e.jsxs("nav",{className:d("sia-bottom-tabs",h),"aria-label":k.bottomTabsLabel,children:[g.map(a=>{const y=a.key===s,q=e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"sia-bottom-tabs__pastille","aria-hidden":"true",children:[a.icon,se(a,_=>_.badge!==void 0&&_.badge!==null)&&e.jsx("span",{className:"sia-bottom-tabs__point"})]}),e.jsx("span",{className:"sia-bottom-tabs__label",children:a.label})]}),u=d("sia-bottom-tabs__item",y&&"sia-bottom-tabs__item--active"),x=()=>{a.onClick?.(),v?.(a)};return a.href&&n?e.jsx("span",{className:"sia-bottom-tabs__cell",children:n({item:a,children:q,props:{className:u,onClick:x,...y?{"aria-current":"page"}:{}}})},a.key):a.href?e.jsx("a",{href:a.href,className:u,...y?{"aria-current":"page"}:{},onClick:x,children:q},a.key):e.jsx("button",{type:"button",className:u,...y?{"aria-current":"page"}:{},onClick:x,children:q},a.key)}),O&&e.jsxs("button",{type:"button",className:"sia-bottom-tabs__item",onClick:o,"aria-label":`${w}${b>0?` (${b})`:""}`,children:[e.jsx("span",{className:"sia-bottom-tabs__pastille","aria-hidden":"true",children:p??"···"}),e.jsx("span",{className:"sia-bottom-tabs__label",children:w})]})]})});Q.__docgenInfo={description:`La navigation d'un téléphone.

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
}`,signature:{properties:[{key:"className",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"aria-current",value:{name:"literal",value:'"page"',required:!1}},{key:"title",value:{name:"string",required:!1}}]},required:!0},description:"À répandre tel quel sur le lien : `<Link {...props}>{children}</Link>`.\n\nRegroupés plutôt qu'éparpillés parce que `aria-current` en faisait\npartie : passé à côté, il se perdait sans bruit, et l'entrée courante\nn'était plus annoncée aux lecteurs d'écran."}]}},name:"args"}],return:{name:"ReactElement"}}},description:""},onNavigate:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: SidebarItem) => void",signature:{arguments:[{type:{name:"SidebarItem"},name:"item"}],return:{name:"void"}}},description:""},more:{required:!1,tsType:{name:"ReactNode"},description:"Le bouton qui ouvre l'arborescence complète."},onMore:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},moreLabel:{required:!1,tsType:{name:"string"},description:"Le libellé de « Plus ». Par défaut, celui de la locale."},className:{required:!1,tsType:{name:"string"},description:""}}};function de({icon:t,name:c,description:s,className:r,...n}){return e.jsxs("div",{className:d("sia-shell-brand",r),...n,children:[e.jsx("span",{className:"sia-shell-brand__icon","aria-hidden":"true",children:t}),e.jsxs("span",{className:"sia-shell-brand__copy",children:[e.jsx("span",{className:"sia-shell-brand__name",children:c}),s!==void 0&&e.jsx("span",{className:"sia-shell-brand__description",children:s})]})]})}function ce({as:t="div",icon:c,label:s,className:r,href:n,type:v="button",disabled:p,...o}){const f=t,h={...o,...t==="a"&&n?{href:n}:{},...t==="button"?{type:v,disabled:p}:{}};return e.jsxs(f,{className:d("sia-shell-rail-item",r),"aria-label":o["aria-label"]??(t!=="div"?s:void 0),...h,children:[e.jsx("span",{className:"sia-shell-rail-item__icon","aria-hidden":"true",children:c}),e.jsx("span",{className:"sia-shell-rail-item__label",children:s})]})}function pe({nav:t,children:c,activeKey:s,currentPath:r,renderLink:n,onNavigate:v,can:p,brand:o,sidebarFooter:f,header:h,page:k,footer:w,contentWidth:S="wide",side:g="left",variant:b="default",stickyHeader:O=!0,sidebarState:a,defaultSidebarState:y="expanded",onSidebarStateChange:q,collapsible:u="icon",sidebarWidth:x,sidebarCollapsedWidth:_,mobileNav:L="drawer",mobileBreakpoint:G=768,sidebarProps:J,drawerProps:E,ariaLabel:K,className:X}){const R=F().appShell,i=re(`(max-width: ${G-1}px)`),A=l.useMemo(()=>p?le(t,p):t,[p,t]),B=l.useMemo(()=>A.flatMap(m=>"title"in m&&Array.isArray(m.items)?m.items:[m]),[A]),Y=l.useMemo(()=>oe(B,r),[r,B]),C=s??Y,[Z,ee]=l.useState(y),M=a!==void 0,N=M?a:Z,ae=l.useCallback(()=>{const z=N==="expanded"?u==="offcanvas"?"hidden":"collapsed":"expanded";M||ee(z),q?.(z)},[u,N,q,M]),[V,j]=l.useState(!1),[ne,te]=l.useState(r);r!==ne&&(te(r),V&&j(!1));const $=l.useCallback(m=>{v?.(m),j(!1)},[v]),P=N==="collapsed",H=N==="hidden",I=L==="drawer"||L==="both",U=L==="tabs"||L==="both",W=e.jsx(ue,{...J,items:A,collapsed:P&&!i,side:g,variant:b,...C!==void 0?{activeKey:C}:{},...n?{renderLink:n}:{},onNavigate:$,...o?{header:e.jsx("div",{"data-collapsed":P&&!i?"":void 0,children:o})}:{},...f?{footer:e.jsx("div",{"data-collapsed":P&&!i?"":void 0,children:f})}:{},...K?{ariaLabel:K}:{}}),D={};return x&&(D["--sia-shell-sidebar"]=x),_&&(D["--sia-shell-rail"]=_),e.jsxs("div",{className:d("sia-shell",`sia-shell--${g}`,`sia-shell--${b}`,P&&"sia-shell--rail",H&&"sia-shell--hidden",i&&"sia-shell--compact",U&&i&&"sia-shell--with-tabs",X),style:D,children:[!i&&!H&&e.jsx("aside",{className:"sia-shell__aside",children:W}),e.jsxs("div",{className:"sia-shell__main",children:[(h||u!==!1||i&&I)&&e.jsxs("header",{className:d("sia-shell__header",O&&"sia-shell__header--sticky"),children:[i&&I?e.jsx("button",{type:"button",className:"sia-shell__toggle","aria-label":R.openNavigation,"aria-expanded":V,onClick:()=>j(!0),children:e.jsx(me,{})}):u!==!1&&e.jsx("button",{type:"button",className:"sia-shell__toggle","aria-label":N==="expanded"?R.collapseNavigation:R.expandNavigation,"aria-expanded":N==="expanded",onClick:ae,children:e.jsx(ve,{})}),e.jsx("div",{className:"sia-shell__header-content",children:h})]}),e.jsxs("main",{className:d("sia-shell__content",`sia-shell__content--${S}`),children:[k&&e.jsx("div",{className:"sia-shell__page",children:k}),c]}),w&&e.jsx("footer",{className:"sia-shell__footer",children:w})]}),i&&U&&e.jsx(Q,{items:B,...C!==void 0?{activeKey:C}:{},...n?{renderLink:n}:{},onNavigate:$,...I?{onMore:()=>j(!0)}:{}}),i&&I&&e.jsxs(T,{position:g,size:"sm",...E,className:d("sia-shell__drawer",E?.className),open:V,onOpenChange:j,children:[e.jsxs(T.Header,{children:[e.jsx(T.Title,{children:R.navigationTitle}),e.jsx(T.Close,{})]}),e.jsx(T.Body,{children:W})]})]})}function me(){return e.jsx("svg",{viewBox:"0 0 24 24",width:"20",height:"20","aria-hidden":"true",children:e.jsx("path",{d:"M4 7h16M4 12h16M4 17h16",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function ve(){return e.jsxs("svg",{viewBox:"0 0 24 24",width:"20",height:"20","aria-hidden":"true",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2.5",fill:"none",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M9.5 4v16",stroke:"currentColor",strokeWidth:"1.8"})]})}de.__docgenInfo={description:"Identité de produit adaptée au rail de l'`AppShell`.\n\nL'application fournit le symbole et le texte une seule fois. Le composant\nmasque sa copie dès que son parent reçoit `data-collapsed`.",methods:[],displayName:"AppShellBrand",props:{icon:{required:!0,tsType:{name:"ReactNode"},description:"Symbole conservé lorsque la navigation devient un rail."},name:{required:!0,tsType:{name:"ReactNode"},description:"Nom du produit, masqué automatiquement dans le rail."},description:{required:!1,tsType:{name:"ReactNode"},description:"Ligne secondaire facultative, masquée avec le nom."}},composes:["HTMLAttributes"]};ce.__docgenInfo={description:"Contenu icône + libellé qui s'adapte automatiquement au rail.",methods:[],displayName:"AppShellRailItem",props:{as:{required:!1,tsType:{name:"union",raw:'"div" | "button" | "a"',elements:[{name:"literal",value:'"div"'},{name:"literal",value:'"button"'},{name:"literal",value:'"a"'}]},description:"Élément rendu : contenu simple, action ou lien.",defaultValue:{value:'"div"',computed:!1}},icon:{required:!0,tsType:{name:"ReactNode"},description:"Symbole toujours visible dans le rail."},label:{required:!0,tsType:{name:"string"},description:"Libellé masqué visuellement dans le rail et conservé comme nom accessible."},href:{required:!1,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:'"button" | "submit" | "reset"',elements:[{name:"literal",value:'"button"'},{name:"literal",value:'"submit"'},{name:"literal",value:'"reset"'}]},description:"",defaultValue:{value:'"button"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""}},composes:["HTMLAttributes"]};pe.__docgenInfo={description:"La coquille d'une application.\n\nElle n'invente rien : la navigation est le `Sidebar`, le tiroir est le\n`Drawer`, les droits viennent de `@sia-ui/headless`. Ce qu'elle apporte est\nl'assemblage — trois états de barre, une bascule mobile, et une seule\nsource de vérité pour ce qui est visible et pour ce qui est actif.",methods:[],displayName:"AppShell",props:{nav:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"SidebarItem | SidebarSection",elements:[{name:"SidebarItem"},{name:"SidebarSection"}]}],raw:"SidebarEntry[]"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},activeKey:{required:!1,tsType:{name:"string"},description:`La clé de l'entrée courante.

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
onglets ne doivent avoir leur propre idée de ce qui est visible.`},brand:{required:!1,tsType:{name:"ReactNode"},description:"En tête de barre latérale : logo, nom du produit, sélecteur d'entité.\n\n`AppShellBrand` masque son texte automatiquement dans le rail. Un contenu\nentièrement personnalisé reçoit toujours `data-collapsed` sur son parent."},sidebarFooter:{required:!1,tsType:{name:"ReactNode"},description:`Bas de la barre latérale, sous la navigation.

C'est la place de la déconnexion et des réglages du compte — ce qui sort
de l'application, par opposition à l'en-tête, réservé à ce qui agit sur
l'écran courant. \`AppShellRailItem\` masque son libellé automatiquement ;
un contenu personnalisé peut encore lire \`data-collapsed\` sur son parent.`},header:{required:!1,tsType:{name:"ReactNode"},description:"La barre du haut : recherche, notifications, avatar de compte."},page:{required:!1,tsType:{name:"ReactNode"},description:"Au-dessus du contenu, pleine largeur de la zone.\n\nL'endroit d'un `PageHeader`. La coquille ne prend pas de `title` : un\n`<h1>` rendu par la coquille force chaque page à passer par ses props, et\nune page qui veut deux titres ou une mise en page à elle doit se battre."},footer:{required:!1,tsType:{name:"ReactNode"},description:""},contentWidth:{required:!1,tsType:{name:"union",raw:'"wide" | "narrow" | "full"',elements:[{name:"literal",value:'"wide"'},{name:"literal",value:'"narrow"'},{name:"literal",value:'"full"'}]},description:`La largeur de la zone de contenu.

Décidée ici plutôt qu'écran par écran : des largeurs posées page après
page finissent par diverger, et personne ne sait laquelle fait foi.`,defaultValue:{value:'"wide"',computed:!1}},side:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "filled" | "floating"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"filled"'},{name:"literal",value:'"floating"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},stickyHeader:{required:!1,tsType:{name:"boolean"},description:"L'en-tête suit-il le défilement.",defaultValue:{value:"true",computed:!1}},sidebarState:{required:!1,tsType:{name:"union",raw:'"expanded" | "collapsed" | "hidden"',elements:[{name:"literal",value:'"expanded"'},{name:"literal",value:'"collapsed"'},{name:"literal",value:'"hidden"'}]},description:""},defaultSidebarState:{required:!1,tsType:{name:"union",raw:'"expanded" | "collapsed" | "hidden"',elements:[{name:"literal",value:'"expanded"'},{name:"literal",value:'"collapsed"'},{name:"literal",value:'"hidden"'}]},description:"",defaultValue:{value:'"expanded"',computed:!1}},onSidebarStateChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(state: SidebarState) => void",signature:{arguments:[{type:{name:"union",raw:'"expanded" | "collapsed" | "hidden"',elements:[{name:"literal",value:'"expanded"'},{name:"literal",value:'"collapsed"'},{name:"literal",value:'"hidden"'}]},name:"state"}],return:{name:"void"}}},description:""},collapsible:{required:!1,tsType:{name:"union",raw:'"icon" | "offcanvas" | false',elements:[{name:"literal",value:'"icon"'},{name:"literal",value:'"offcanvas"'},{name:"literal",value:"false"}]},description:"",defaultValue:{value:'"icon"',computed:!1}},sidebarWidth:{required:!1,tsType:{name:"string"},description:"Toute valeur CSS : `16rem`, `280px`, `min(20vw, 320px)`."},sidebarCollapsedWidth:{required:!1,tsType:{name:"string"},description:""},mobileNav:{required:!1,tsType:{name:"union",raw:'"drawer" | "tabs" | "both"',elements:[{name:"literal",value:'"drawer"'},{name:"literal",value:'"tabs"'},{name:"literal",value:'"both"'}]},description:"",defaultValue:{value:'"drawer"',computed:!1}},mobileBreakpoint:{required:!1,tsType:{name:"number"},description:"Sous cette largeur, la barre latérale cède la place.",defaultValue:{value:"768",computed:!1}},sidebarProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"SidebarProps"},{name:"union",raw:`| "items"
| "can"
| "activeKey"
| "collapsed"
| "side"
| "variant"
| "renderLink"
| "onNavigate"
| "header"
| "footer"
| "ariaLabel"`,elements:[{name:"literal",value:'"items"'},{name:"literal",value:'"can"'},{name:"literal",value:'"activeKey"'},{name:"literal",value:'"collapsed"'},{name:"literal",value:'"side"'},{name:"literal",value:'"variant"'},{name:"literal",value:'"renderLink"'},{name:"literal",value:'"onNavigate"'},{name:"literal",value:'"header"'},{name:"literal",value:'"footer"'},{name:"literal",value:'"ariaLabel"'}]}],raw:`Omit<
  SidebarProps,
  | "items"
  | "can"
  | "activeKey"
  | "collapsed"
  | "side"
  | "variant"
  | "renderLink"
  | "onNavigate"
  | "header"
  | "footer"
  | "ariaLabel"
>`}],raw:`Partial<
  Omit<
    SidebarProps,
    | "items"
    | "can"
    | "activeKey"
    | "collapsed"
    | "side"
    | "variant"
    | "renderLink"
    | "onNavigate"
    | "header"
    | "footer"
    | "ariaLabel"
  >
>`},description:`Réglages de la barre latérale — taille, ton, accordéon, branches
ouvertes, volets du rail.

Ce que la coquille décide seule en est retiré : les entrées filtrées,
l'entrée active, l'état réduit, les liens, l'en-tête et le pied, le côté
et la variante — tous déjà réglables ici, et qui doivent rester
d'accord avec la mise en page de la coquille.`},drawerProps:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"DrawerProps"},{name:"union",raw:'"open" | "defaultOpen" | "onOpenChange" | "children"',elements:[{name:"literal",value:'"open"'},{name:"literal",value:'"defaultOpen"'},{name:"literal",value:'"onOpenChange"'},{name:"literal",value:'"children"'}]}],raw:'Omit<DrawerProps, "open" | "defaultOpen" | "onOpenChange" | "children">'}],raw:'Partial<Omit<DrawerProps, "open" | "defaultOpen" | "onOpenChange" | "children">>'},description:"Réglages du tiroir mobile — taille, fermeture au clic extérieur, classe."},ariaLabel:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{pe as A,Q as B,ce as a,de as b};
