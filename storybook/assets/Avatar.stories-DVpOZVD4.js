import{j as e}from"./iframe-DQyRSC8n.js";import{A as r,a as v}from"./index-ZFVXspco.js";import"./preload-helper-PPVm8Dsz.js";import"./classname-nB6WhpaV.js";const d=["Aya Koffi","Amadou Kane","Awa Konaté","Ivan Mbella","Léa Diop","Jean-Baptiste Kouassi Mbella","Marie de la Tour"];function f({size:a,shape:c,variant:m,status:x,ring:h}){return e.jsx("div",{style:{display:"flex",gap:".75rem",flexWrap:"wrap"},children:d.map(y=>e.jsx(r,{name:y,size:a,shape:c,variant:m,ring:h,...x!=="aucun"?{status:x}:{}},y))})}const S={title:"Données/Avatar",component:f,tags:["autodocs"],args:{size:"md",shape:"circle",variant:"soft",status:"aucun",ring:!1},argTypes:{size:{control:"inline-radio",options:["xs","sm","md","lg","xl"]},shape:{control:"inline-radio",options:["circle","rounded","square"]},variant:{control:"inline-radio",options:["soft","solid","outline"]},status:{control:"inline-radio",options:["aucun","online","busy","away","offline"]}},parameters:{layout:"padded"}},s={},p={args:{variant:"solid"}},u={args:{variant:"outline"}},g={args:{shape:"rounded",variant:"solid"}},n={args:{status:"online",size:"lg"}},t={render:()=>e.jsx("div",{style:{display:"grid",gap:"1.5rem"},children:["soft","solid","outline"].map(a=>e.jsxs("div",{children:[e.jsx("div",{style:{marginBottom:".5rem",color:"var(--sia-muted)",fontSize:".75rem",textTransform:"uppercase",letterSpacing:".05em"},children:a}),e.jsx("div",{style:{display:"flex",gap:".75rem",alignItems:"center"},children:["xs","sm","md","lg","xl"].map((c,m)=>e.jsx(r,{name:d[m],size:c,variant:a,status:m%2===0?"online":"busy"},c))})]},a))})},i={render:()=>e.jsxs("div",{style:{display:"grid",gap:"1.5rem"},children:[e.jsx(v,{max:4,children:d.map(a=>e.jsx(r,{name:a},a))}),e.jsx(v,{max:5,size:"lg",variant:"solid",spreadOnHover:!0,children:d.map(a=>e.jsx(r,{name:a},a))}),e.jsx(v,{size:"sm",shape:"rounded",overlap:.5,children:d.slice(0,4).map(a=>e.jsx(r,{name:a},a))})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",gap:".75rem",alignItems:"center"},children:[e.jsx(r,{name:"Aya Koffi",size:"lg"}),e.jsx(r,{name:"Amadou Kane",size:"lg",src:"https://exemple.invalid/404.png"}),e.jsx(r,{name:"Awa Konaté",size:"lg",src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%232563eb'/%3E%3Ccircle cx='48' cy='38' r='16' fill='white'/%3E%3Cellipse cx='48' cy='86' rx='28' ry='24' fill='white'/%3E%3C/svg%3E",status:"online"})]})},l={render:()=>e.jsx(r,{name:"Ivan Mbella",size:"lg",ring:!0,status:"online",onPress:()=>{}})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source},description:{story:"La teinte est dérivée du nom : la même personne la garde partout.",...s.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "solid"
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline"
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    shape: "rounded",
    variant: "solid"
  }
}`,...g.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    status: "online",
    size: "lg"
  }
}`,...n.parameters?.docs?.source},description:{story:"Quatre états de présence, et un minimum absolu de lisibilité.",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gap: "1.5rem"
  }}>
      {(["soft", "solid", "outline"] as const).map(variant => <div key={variant}>
          <div style={{
        marginBottom: ".5rem",
        color: "var(--sia-muted)",
        fontSize: ".75rem",
        textTransform: "uppercase",
        letterSpacing: ".05em"
      }}>
            {variant}
          </div>
          <div style={{
        display: "flex",
        gap: ".75rem",
        alignItems: "center"
      }}>
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size, i) => <Avatar key={size} name={GENS[i]!} size={size} variant={variant} status={i % 2 === 0 ? "online" : "busy"} />)}
          </div>
        </div>)}
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Les trois variantes, les cinq tailles, d'un coup d'œil.",...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gap: "1.5rem"
  }}>
      <AvatarGroup max={4}>
        {GENS.map(nom => <Avatar key={nom} name={nom} />)}
      </AvatarGroup>

      <AvatarGroup max={5} size="lg" variant="solid" spreadOnHover>
        {GENS.map(nom => <Avatar key={nom} name={nom} />)}
      </AvatarGroup>

      <AvatarGroup size="sm" shape="rounded" overlap={0.5}>
        {GENS.slice(0, 4).map(nom => <Avatar key={nom} name={nom} />)}
      </AvatarGroup>
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Une pile qui résume son surplus plutôt que de déborder.",...i.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: ".75rem",
    alignItems: "center"
  }}>
      <Avatar name="Aya Koffi" size="lg" />
      <Avatar name="Amadou Kane" size="lg" src="https://exemple.invalid/404.png" />
      <Avatar name="Awa Konaté" size="lg" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%232563eb'/%3E%3Ccircle cx='48' cy='38' r='16' fill='white'/%3E%3Cellipse cx='48' cy='86' rx='28' ry='24' fill='white'/%3E%3C/svg%3E" status="online" />
    </div>
}`,...o.parameters?.docs?.source},description:{story:`Une image qui manque, une qui échoue, une qui arrive : la mise en page ne
doit jamais bouger entre les trois.`,...o.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Avatar name="Ivan Mbella" size="lg" ring status="online" onPress={() => {}} />
}`,...l.parameters?.docs?.source},description:{story:"Un avatar de compte, actionnable.",...l.parameters?.docs?.description}}};const E=["Playground","Solide","Contour","Arrondi","Presence","Matrice","Groupe","AvecImages","Actionnable"];export{l as Actionnable,g as Arrondi,o as AvecImages,u as Contour,i as Groupe,t as Matrice,s as Playground,n as Presence,p as Solide,E as __namedExportsOrder,S as default};
