import{j as e,r as x}from"./iframe-93ToM5gy.js";import{A as S,a as k,b as w}from"./index-oplIBVBc.js";import{A as v}from"./index-DdQ-vLun.js";import{B as A}from"./index-DN5Qlzrz.js";import{B as R}from"./index-DDfi4-t_.js";import{L as B,F as j,U as E}from"./index-B7rcZNS2.js";import{P as I}from"./index-DyB8F3uO.js";import{S as L}from"./index-D1oauuee.js";import{c as F}from"./access-C_q7-za5.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";import"./index-C8M_EYHg.js";import"./use-hover-intent-Dj6AMSLx.js";import"./index-CdUZj38H.js";import"./index-DqatgzX2.js";import"./index-BGC94N9u.js";import"./overlay-layer-ClrU24vq.js";import"./geometry-Dzgyg8gY.js";import"./index-Bx8WbTQZ.js";import"./index-CyYBDJlU.js";import"./use-outside-click-nOWfDOom.js";import"./index-Ca-LLAC-.js";const{expect:d}=__STORYBOOK_MODULE_TEST__;async function q(t){const o=t.querySelector(".sia-sidebar"),a=t.querySelector(".sia-shell__aside"),l=o.getBoundingClientRect(),n=a.getBoundingClientRect();await d(l.top).toBeGreaterThanOrEqual(n.top),await d(l.bottom).toBeLessThanOrEqual(n.bottom+.5);const c=o.querySelectorAll("svg");await d(c.length).toBeGreaterThan(2);for(const s of c){const i=s.getBoundingClientRect();await d(i.width).toBeGreaterThan(0);let r=s.parentElement;for(;r&&r!==t;){if(["hidden","auto","scroll","clip"].includes(getComputedStyle(r).overflowX)){const f=r.getBoundingClientRect();await d(i.left).toBeGreaterThanOrEqual(f.left+r.clientLeft-.5),await d(i.right).toBeLessThanOrEqual(f.left+r.clientLeft+r.clientWidth+.5)}r=r.parentElement}}}const C=[{key:"pilotage",title:"Pilotage",items:[{key:"tableau",label:"Tableau de bord",icon:"◧",href:"/"},{key:"rapports",label:"Rapports",icon:"◨",href:"/rapports",badge:2}]},{key:"gestion",title:"Gestion",items:[{key:"ventes",label:"Ventes",icon:"◐",items:[{key:"factures",label:"Factures",href:"/ventes/factures",badge:12},{key:"reglements",label:"Règlements",items:[{key:"encaisses",label:"Encaissés",href:"/ventes/encaisses"},{key:"attente",label:"En attente",href:"/ventes/attente",badge:3}]}]},{key:"clients",label:"Clients",icon:"◑",href:"/clients"},{key:"admin",label:"Administration",icon:"◒",permission:"admin",items:[{key:"equipe",label:"Équipe",href:"/admin/equipe",permission:"admin"},{key:"journal",label:"Journal",href:"/admin/journal",permission:"admin"}]}]}];function _(t){const[o,a]=x.useState(t),l=x.useCallback(({item:n,children:c,props:s})=>e.jsx("a",{...s,href:n.href??"#",onClick:i=>{i.preventDefault(),n.href&&a(n.href),s.onClick()},children:c}),[]);return{chemin:o,renderLink:l}}function P({contentWidth:t,mobileNav:o,side:a,collapsible:l,stickyHeader:n,droits:c}){const{chemin:s,renderLink:i}=_("/ventes/factures"),r=c.split(/[,\s]+/).filter(Boolean),f=F({granted:()=>r}).can;return e.jsx("div",{style:{height:"40rem",overflow:"auto",border:"1px solid var(--sia-border)"},children:e.jsx(S,{nav:C,currentPath:s,renderLink:i,can:f,side:a,collapsible:l,contentWidth:t,mobileNav:o,stickyHeader:n,ariaLabel:"Navigation de démonstration",brand:e.jsx(w,{icon:e.jsx(v,{name:"SIA UI",fallback:"S",variant:"solid",shape:"rounded",size:"sm"}),name:"SIA Gestion"}),header:e.jsxs(e.Fragment,{children:[e.jsx(L,{placeholder:"Rechercher…",style:{maxWidth:"20rem"}}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:".6rem"},children:[e.jsx(A,{tone:"success",children:"En ligne"}),e.jsx(v,{name:"Ivan Mbella",size:"sm",status:"online",onPress:()=>{}})]})]}),sidebarFooter:e.jsx(k,{as:"button",icon:e.jsx("span",{"aria-hidden":"true",children:"↪"}),label:"Se déconnecter"}),page:e.jsx(I,{eyebrow:s,title:"Factures",description:"Les factures émises, leur règlement et leurs relances.",actions:e.jsx(R,{size:"sm",children:"Nouvelle facture"})}),footer:e.jsx("span",{children:"SIA UI — démonstration"}),children:e.jsx("div",{style:{display:"grid",gap:"1rem"},children:Array.from({length:6},(D,y)=>e.jsxs("div",{style:{padding:"1.25rem",border:"1px solid var(--sia-border)",borderRadius:"var(--sia-radius)",background:"var(--sia-surface)"},children:["Bloc de contenu ",y+1]},y))})})})}const se={title:"Patterns/AppShell",component:P,tags:["autodocs"],args:{contentWidth:"wide",mobileNav:"drawer",side:"left",collapsible:"icon",stickyHeader:!0,droits:"admin"},argTypes:{contentWidth:{control:"inline-radio",options:["wide","narrow","full"]},mobileNav:{control:"inline-radio",options:["drawer","tabs","both"]},side:{control:"inline-radio",options:["left","right"]},collapsible:{control:"inline-radio",options:["icon","offcanvas",!1]},droits:{control:"text"}},parameters:{layout:"fullscreen"}},p={},m={args:{droits:""}},u={args:{side:"right"}},h={args:{contentWidth:"narrow"}},g={args:{mobileNav:"both"},parameters:{viewport:{defaultViewport:"mobile1"}}},b={play:async({canvasElement:t})=>q(t),render:t=>e.jsx(S,{nav:[{key:"projects",label:"Projets",icon:e.jsx(j,{width:24,height:24}),items:[{key:"recent",label:"Projets récents",href:"/recent"}]},...Array.from({length:35},(o,a)=>({key:`space-${a}`,label:`Espace ${a+1}`,icon:e.jsx(E,{width:24,height:24}),href:`/space-${a}`}))],side:t.side,variant:"floating",defaultSidebarState:"collapsed",collapsible:"icon",brand:e.jsx(w,{icon:e.jsx(j,{width:32,height:32}),name:"Mon espace"}),sidebarFooter:e.jsx(k,{as:"button",icon:e.jsx(B,{width:24,height:24}),label:"Déconnexion"}),header:e.jsx("span",{children:"Rail flottant"}),children:e.jsx("p",{children:"Déplier puis réduire la navigation : les icônes restent entières."})})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{}",...p.parameters?.docs?.source},description:{story:`Cliquer dans la navigation change l'adresse, et la coquille en déduit
l'entrée courante — y compris depuis une page de détail.`,...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    droits: ""
  }
}`,...m.parameters?.docs?.source},description:{story:"Sans le droit `admin`, la rubrique entière disparaît de la barre.",...m.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    side: "right"
  }
}`,...u.parameters?.docs?.source},description:{story:"La barre passe à droite, et ses volets sortent de l'autre côté.",...u.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    contentWidth: "narrow"
  }
}`,...h.parameters?.docs?.source},description:{story:"Le contenu borné à la largeur d'un formulaire.",...h.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    mobileNav: "both"
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...g.parameters?.docs?.source},description:{story:`Sous 768 px, la barre latérale cède la place. Réduire la fenêtre de
Storybook — ou choisir un gabarit mobile — pour voir les onglets bas.`,...g.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => checkFloatingRail(canvasElement),
  render: args => <AppShell nav={[{
    key: "projects",
    label: "Projets",
    icon: <FolderIcon width={24} height={24} />,
    items: [{
      key: "recent",
      label: "Projets récents",
      href: "/recent"
    }]
  }, ...Array.from({
    length: 35
  }, (_, index) => ({
    key: \`space-\${index}\`,
    label: \`Espace \${index + 1}\`,
    icon: <UserIcon width={24} height={24} />,
    href: \`/space-\${index}\`
  }))]} side={args.side} variant="floating" defaultSidebarState="collapsed" collapsible="icon" brand={<AppShellBrand icon={<FolderIcon width={32} height={32} />} name="Mon espace" />} sidebarFooter={<AppShellRailItem as="button" icon={<LogOutIcon width={24} height={24} />} label="Déconnexion" />} header={<span>Rail flottant</span>}>
      <p>Déplier puis réduire la navigation : les icônes restent entières.</p>
    </AppShell>
}`,...b.parameters?.docs?.source},description:{story:"Rail flottant avec icônes SVG, identité, action de pied et navigation défilante.",...b.parameters?.docs?.description}}};const oe=["Playground","DroitsRestreints","ADroite","ContenuEtroit","Mobile","FlottantReduit"];export{u as ADroite,h as ContenuEtroit,m as DroitsRestreints,b as FlottantReduit,g as Mobile,p as Playground,oe as __namedExportsOrder,se as default};
