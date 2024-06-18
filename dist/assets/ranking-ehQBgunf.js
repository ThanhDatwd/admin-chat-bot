import{br as j,g as T,a as C,r as h,h as O,bA as W,u as F,l as L,j as e,m as _,S as b,b as w,B as x,o as $,aO as q,G as p,p as k,T as r,aM as R,aN as B,ac as I,t as G,y as P,b7 as M,R as N,E as z,bu as V,c as X,Y as J,q as K,Z as Q,a4 as Y,a5 as Z,a6 as ee,a7 as D,a8 as i,a9 as te,J as se,ak as ne,al as ae,aS as re,C as ie,P as oe,am as le,A as ce,bB as de}from"./index-8egQHEDr.js";import{U as he}from"./upload-icon-chatbot-Si5wWxxK.js";const ue=j.object({rankName:j.string().min(1,"Tên thứ hạng là bắt buộc").max(200,"Tên thứ hạng tối đa 200 ký tự"),icon:j.string().min(1,"Biểu tượng là bắt buộc"),startingPoints:j.number().int().positive({message:"Nhập điểm bắt đầu thứ hạng là bắt buộc"}),status:j.enum(["active","inactive"]).default("active")}),S=({open:s,onClose:o,onUpdate:c,rank:n})=>{const{t}=C(),[m,g]=h.useState(!0),f=O(),v=W(a=>a.common.loading);W(a=>a.common.refresh),F();const{control:u,setValue:d,getValues:A,handleSubmit:E,reset:U}=L({resolver:G(ue),defaultValues:{rankName:"",startingPoints:0,icon:"",status:"active"}}),H=async a=>{try{f(P(!0))}catch(l){console.error("Error creating bot:",l)}finally{f(P(!1))}};return h.useEffect(()=>{s||(U(),g(!0))},[s]),h.useEffect(()=>{n&&(d("rankName",n.rankName),d("startingPoints",n.startingPoints),d("status",n.status),g(n.status!=="inactive"))},[n,s]),e.jsx(_,{open:s,onClose:o,title:t(n?"Cập nhật thứ hạng":"Tạo mới thứ hạng"),actions:e.jsx(e.Fragment,{children:e.jsxs(b,{direction:"row",justifyContent:"flex-end",spacing:1,children:[e.jsx(w,{color:"secondary",onClick:()=>o(),children:"Huỷ"}),e.jsxs(w,{variant:"contained",type:"submit",size:"large",fullWidth:!0,sx:{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px"},onClick:E(H),children:[t(n?"Cập nhật":"Tạo mới"),v&&e.jsxs(x,{sx:{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px"},color:"common.white",children:[" ",e.jsx($,{style:{height:"20px",width:"20px"},color:"inherit"})]})]})]})}),children:e.jsx(b,{spacing:0,direction:"row",height:"100%",overflow:"hidden",children:e.jsx(q,{sx:{overflowX:"hidden",p:3},children:e.jsx(b,{spacing:{xs:2,sm:3},children:e.jsx(x,{children:e.jsxs(p,{container:!0,spacing:{xs:2,md:3},children:[e.jsx(p,{item:!0,xs:12,children:e.jsx(k,{name:"icon",control:u,render:({field:a,fieldState:l})=>e.jsxs(e.Fragment,{children:[e.jsx(he,{onUpload:y=>a.onChange(y)}),l.error&&e.jsx(r,{color:"error",children:l.error.message})]})})}),e.jsx(p,{item:!0,xs:12,children:e.jsxs(R,{fullWidth:!0,variant:"outlined",children:[e.jsx(r,{variant:"h6",gutterBottom:!0,component:"label",htmlFor:"bot-name-input",fontWeight:500,children:"Tên thứ hạng"}),e.jsx(k,{name:"rankName",control:u,render:({field:a,fieldState:l})=>e.jsxs(e.Fragment,{children:[e.jsx(B,{...a,id:"rank-name-input",fullWidth:!0}),l.error&&e.jsx(r,{color:"error",children:l.error.message})]})})]})}),e.jsx(p,{item:!0,xs:12,children:e.jsxs(R,{fullWidth:!0,variant:"outlined",children:[e.jsx(r,{variant:"h6",gutterBottom:!0,component:"label",htmlFor:"field-code-input",fontWeight:500,children:"Điểm bắt đầu thứ hạng"}),e.jsx(k,{name:"startingPoints",control:u,render:({field:a,fieldState:l})=>e.jsxs(e.Fragment,{children:[e.jsx(B,{...a,type:"number",id:"rank-startingPoints-input",fullWidth:!0,onChange:y=>a.onChange(Number(y.target.value))}),l.error&&e.jsx(r,{color:"error",children:l.error.message})]})})]})}),e.jsx(p,{item:!0,xs:12,children:e.jsxs(x,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(x,{overflow:"hidden",children:[e.jsx(r,{variant:"h6",gutterBottom:!0,htmlFor:"switch-spatial-audio",component:"label",fontWeight:500,children:"Trạng thái"}),e.jsx(r,{variant:"body1",color:"text.secondary",noWrap:!0,children:A("status")==="inactive"?"Không hoat động":"Hoạt động"})]}),e.jsx(e.Fragment,{children:e.jsx(I,{defaultChecked:m,checked:m,onChange:a=>{g(a.target.checked),d("status",a.target.checked?"active":"inactive")},id:"switch-spatial-audio"})})]})})]})})})})})})};S.propTypes={onClose:T.func.isRequired,onUpdate:T.func,open:T.bool.isRequired};const xe=({rank:s})=>{const{t:o}=C(),[c,n]=M.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(N,{title:o("Sửa"),arrow:!0,children:e.jsx(z,{color:"primary",onClick:()=>n(!0),children:e.jsx(V,{fontSize:"small"})})}),e.jsx(S,{rank:s,open:c,onClose:()=>n(!1)})]})},me=({rankings:s})=>{const{t:o}=C(),[c,n]=h.useState("");return e.jsxs(X,{children:[e.jsxs(x,{py:2,pl:1,pr:2,display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(b,{direction:"row",spacing:1,alignItems:"center",children:e.jsx(J,{size:"small",placeholder:"Tìm kiếm",value:c,onChange:t=>n(t.target.value),variant:"outlined",InputProps:{startAdornment:e.jsx(K,{position:"start",children:e.jsx(Q,{})})}})})," "]}),e.jsx(Y,{children:e.jsxs(Z,{children:[e.jsx(ee,{children:e.jsxs(D,{children:[e.jsx(i,{children:"STT"}),e.jsx(i,{children:"Tên rank"}),e.jsx(i,{children:"Điểm bắt đầu rank"}),e.jsx(i,{children:"Trạng thái"}),e.jsx(i,{children:"Ngày tạo"}),e.jsx(i,{align:"center",children:"Hành động"})]})}),e.jsx(te,{children:s.filter(t=>t.name.toLowerCase().includes(c.toLowerCase())).map((t,m)=>e.jsxs(D,{children:[e.jsx(i,{children:e.jsx(r,{noWrap:!0,variant:"subtitle2",children:m+1})}),e.jsx(i,{children:e.jsx(r,{noWrap:!0,variant:"subtitle2",children:t.name})}),e.jsx(i,{children:e.jsx(r,{noWrap:!0,variant:"subtitle2",children:t.startingPoints})}),e.jsx(i,{children:e.jsx(r,{noWrap:!0,variant:"subtitle2",children:t.status})}),e.jsx(i,{children:e.jsx(r,{noWrap:!0,variant:"subtitle2",children:t.creationDate})}),e.jsx(i,{align:"center",children:e.jsxs(r,{noWrap:!0,children:[e.jsx(N,{title:o("Chuyển trạng thái"),arrow:!0,children:e.jsx(z,{color:"primary",onClick:()=>console.log("Sửa"),children:e.jsx(I,{defaultChecked:!0,id:"switch-spatial-audio"})})}),e.jsx(xe,{rank:t}),e.jsx(se,{onConfirm:()=>{}})]})})]},t.id))})]})})]})},ge=[{id:1,name:"Rank A",startingPoints:100,status:"active",creationDate:"2024-06-05"},{id:2,name:"Rank B",startingPoints:200,status:"inactive",creationDate:"2024-06-04"},{id:3,name:"Rank C",startingPoints:300,status:"active",creationDate:"2024-06-03"}],fe=()=>{const s=F(),{t:o}=C(),c=ne();ae();const[n,t]=h.useState([]),[m,g]=h.useState(!1),f=()=>{g(!0)},v=()=>{g(!1)},u=h.useCallback(async()=>{try{const d=await re.getBots({pageNumber:0,pageSize:20});c()&&t(d)}catch(d){console.error(d)}},[c]);return h.useEffect(()=>{u()},[u]),e.jsxs(e.Fragment,{children:[e.jsx(x,{px:{xs:2,sm:3},pt:{xs:2,sm:3},component:"main",flex:1,display:"flex",flexDirection:"column",children:e.jsxs(ie,{disableGutters:!0,maxWidth:"xl",children:[e.jsx(x,{pb:{xs:2,sm:3},children:e.jsx(oe,{sx:{px:0},title:o("Xếp hạng"),description:o("Quản lý xếp hạng"),actions:e.jsx("div",{children:e.jsx(w,{sx:{mt:{xs:2,md:0}},variant:"contained",onClick:f,startIcon:e.jsx(le,{fontSize:"small"}),children:o("Thêm rank")})}),iconBox:e.jsx(ce,{isSoft:!0,variant:"rounded",state:"primary",sx:{height:s.spacing(7),width:s.spacing(7),svg:{height:s.spacing(4),width:s.spacing(4),minWidth:s.spacing(4)}},children:e.jsx(de,{})})})}),e.jsx(me,{rankings:ge})]})}),e.jsx(S,{open:m,onClose:v,onUpdate:u})]})};export{fe as default};
