import{ai as N,H as J,r as s,a as K,j as e,s as Y,t as $,k as q,P as Q,G as X,v as w,V as m,au as Z,N as f,B as F,av as ee,aw as te,E as se,J as oe}from"./index-MtGPO_T6.js";import{U as ae}from"./usersReputation-djd9olGR.js";function ne(i){return N({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7zM378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211L378.2 732.5z"}}]})(i)}const re=new se.Client(["https://api.hive.blog","https://api.hivekings.com","https://anyx.io","https://api.openhive.network"]);function ue(){var b;const i=J(),[g,_]=s.useState(!1),[ie,M]=s.useState([]),[c,k]=s.useState(""),[x,C]=s.useState(!1),[ce,W]=s.useState(""),[le,A]=s.useState(""),[he,T]=s.useState(""),[U,z]=s.useState("");s.useState(!1);const[j,E]=s.useState(!1),[P,V]=s.useState(!1),L=async(o,n,r)=>{const d=parseFloat(o.split(" ")[0]),l=parseFloat(n.split(" ")[0]),p=parseFloat(r.split(" ")[0]),u=d-l+p,a=await(await fetch("https://api.hive.blog",{method:"POST",body:JSON.stringify({jsonrpc:"2.0",method:"condenser_api.get_dynamic_global_properties",params:[],id:1}),headers:{"Content-Type":"application/json"}})).json(),h=parseFloat(a.result.total_vesting_fund_hive)*u/parseFloat(a.result.total_vesting_shares),t=parseFloat(a.result.total_vesting_fund_hive)*l/parseFloat(a.result.total_vesting_shares);return z(h.toFixed(3)),{hivePower:h.toFixed(3),delegatedHivePower:t.toFixed(3)}};s.useEffect(()=>{var n;const o=async()=>{var r,d,l,p,u,v,a,h;try{const t=await re.database.getAccounts([c]),H=((r=t[0])==null?void 0:r.witness_votes)||[],y=H.includes("skatehive");console.log(y),M(H),W(String(((d=t[0])==null?void 0:d.vesting_shares)||"")),A(String(((l=t[0])==null?void 0:l.delegated_vesting_shares)||"")),T(String(((p=t[0])==null?void 0:p.received_vesting_shares)||"")),_(y);const O=await L(String(((u=t[0])==null?void 0:u.vesting_shares)||""),String(((v=t[0])==null?void 0:v.delegated_vesting_shares)||""),String(((a=t[0])==null?void 0:a.received_vesting_shares)||""));parseFloat(O.hivePower)>500&&C(!0);const G=new Date(((h=t[0])==null?void 0:h.last_post)||""),S=new Date;S.setMonth(S.getMonth()-1),E(G>S)}catch(t){console.error("Error fetching data:",t)}};(n=i.user)!=null&&n.name&&(k(i.user.name),o())},[(b=i.user)==null?void 0:b.name,c]);const R=async()=>{try{const o=new oe.KeychainSDK(window),n={data:{username:c,witness:"skatehive",vote:!0}},r=await o.witnessVote(n.data);console.log({witnessVoteResult:r}),_(!0)}catch(o){console.error("Error voting for witness:",o)}},B=async()=>{await R()},D=async()=>{V(!0)},I=K({base:1,md:3});return e.jsxs(Y,{className:"hive_box",borderRadius:"12px",border:"1px solid limegreen",padding:"20px",fontFamily:"'Courier New', monospace",boxShadow:"md",children:[e.jsx($,{children:e.jsxs(q,{fontWeight:"700",fontSize:"24px",color:"white",mb:"10px",children:["Are you a Cool SkateHiver? ",e.jsx(Q,{label:"This is your Hive Blockchain Reputation","aria-label":"A tooltip",children:e.jsx(ae,{username:c})})]})}),e.jsxs(X,{templateColumns:`repeat(${I}, 1fr)`,gap:6,alignItems:"center",textAlign:"center",children:[e.jsx(w,{children:e.jsxs(m,{children:[e.jsx(Z,{size:"52px",color:"white"}),e.jsxs(f,{borderRadius:"12px",fontWeight:"700",fontSize:"18px",colorScheme:g?"green":"red",p:"10px",children:["Witness Voting: ",g?"Voted ✅":"Incomplete"]}),!g&&e.jsx(F,{onClick:B,colorScheme:"teal",children:"Vote !"})]})}),e.jsx(w,{children:e.jsxs(m,{children:[e.jsx(ne,{size:"52px",color:"white"}),e.jsxs(f,{borderRadius:"12px",fontWeight:"700",fontSize:"18px",colorScheme:x?"green":"red",p:"10px",children:["HivePower: ",U," HP ",x?"✅":"Insufficient"]}),!x&&e.jsx(F,{onClick:D,colorScheme:"blue",children:"Power Up"})]})}),e.jsx(w,{children:e.jsxs(m,{children:[e.jsx(ee,{size:"52px",color:"white"}),e.jsxs(f,{borderRadius:"12px",fontWeight:"700",fontSize:"18px",colorScheme:j?"green":"red",p:"10px",children:["Last Post: ",j?"Within Last Month ✅":"More Than a Month Ago"]})]})})]}),P&&e.jsx(te,{isOpen:P,onClose:()=>V(!1),user:{name:c}})]})}export{ue as default};