import{ar as Ve,as as Ue,K as A,at as bt,au as xt,av as C,r as i,aw as Xe,ax as We,af as K,j as e,ay as qe,az as Et,aA as ft,aB as gt,u as ce,aC as At,aD as Lt,aE as Re,aF as Fe,aG as Nt,f as mt,i as vt,aH as ge,a as me,aI as _t,aJ as $t,b as ie,ab as He,aK as Ft,T as $,aL as Ot,D as yt,L as St,aM as Ht,aN as Dt,B as T,aO as Vt,aP as Ut,q as De,E as le,Z as jt,aQ as Xt,aR as qt,F as Kt,M as Gt,H as ze,c as Ct,g as Yt,k as Pe,O as Qt,Q as Jt,ac as nt,aS as Zt,R as xe,U as Be,S as rt,V as eo,W as to,X as oo,Y as no,$ as ro,a0 as so,a1 as st,a2 as ao,a3 as lo,a4 as io,a5 as co,a6 as uo,a7 as ho,a8 as at,a9 as _,aa as po,ag as lt,aT as bo,ae as it,ah as xo,ai as Ie,aj as fe,y as ke,am as fo,an as go,aU as mo,C as vo,P as yo,ao as So,A as jo}from"./index-ZuSSZPzH.js";import{I as Co,C as wo}from"./create-chatbot-dialog-hYrnAvno.js";import{d as To}from"./ArrowForwardTwoTone-Jd_qQHPO.js";import{d as Bo}from"./LaunchTwoTone-SIj3Gq8R.js";import{B as ct}from"./bot-peL2xriC.js";import{L as Io}from"./ListItemAvatar-8qjmg4tN.js";import"./upload-icon-chatbot-_D73CPDp.js";let ae;function wt(){if(ae)return ae;const t=document.createElement("div"),o=document.createElement("div");return o.style.width="10px",o.style.height="1px",t.appendChild(o),t.dir="rtl",t.style.fontSize="14px",t.style.width="4px",t.style.height="1px",t.style.position="absolute",t.style.top="-1000px",t.style.overflow="scroll",document.body.appendChild(t),ae="reverse",t.scrollLeft>0?ae="default":(t.scrollLeft=1,t.scrollLeft===0&&(ae="negative")),document.body.removeChild(t),ae}function ko(t,o){const r=t.scrollLeft;if(o!=="rtl")return r;switch(wt()){case"negative":return t.scrollWidth-t.clientWidth+r;case"reverse":return t.scrollWidth-t.clientWidth-r;default:return r}}function Mo(t){return Ue("MuiTab",t)}const zo=Ve("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]),ne=zo,Po=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],Ro=t=>{const{classes:o,textColor:r,fullWidth:d,wrapped:c,icon:u,label:b,selected:g,disabled:x}=t,h={root:["root",u&&b&&"labelIcon",`textColor${xt(r)}`,d&&"fullWidth",c&&"wrapped",g&&"selected",x&&"disabled"],iconWrapper:["iconWrapper"]};return qe(h,Mo,o)},Wo=A(bt,{name:"MuiTab",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.root,r.label&&r.icon&&o.labelIcon,o[`textColor${xt(r.textColor)}`],r.fullWidth&&o.fullWidth,r.wrapped&&o.wrapped]}})(({theme:t,ownerState:o})=>C({},t.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},o.label&&{flexDirection:o.iconPosition==="top"||o.iconPosition==="bottom"?"column":"row"},{lineHeight:1.25},o.icon&&o.label&&{minHeight:72,paddingTop:9,paddingBottom:9,[`& > .${ne.iconWrapper}`]:C({},o.iconPosition==="top"&&{marginBottom:6},o.iconPosition==="bottom"&&{marginTop:6},o.iconPosition==="start"&&{marginRight:t.spacing(1)},o.iconPosition==="end"&&{marginLeft:t.spacing(1)})},o.textColor==="inherit"&&{color:"inherit",opacity:.6,[`&.${ne.selected}`]:{opacity:1},[`&.${ne.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}},o.textColor==="primary"&&{color:(t.vars||t).palette.text.secondary,[`&.${ne.selected}`]:{color:(t.vars||t).palette.primary.main},[`&.${ne.disabled}`]:{color:(t.vars||t).palette.text.disabled}},o.textColor==="secondary"&&{color:(t.vars||t).palette.text.secondary,[`&.${ne.selected}`]:{color:(t.vars||t).palette.secondary.main},[`&.${ne.disabled}`]:{color:(t.vars||t).palette.text.disabled}},o.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},o.wrapped&&{fontSize:t.typography.pxToRem(12)})),Eo=i.forwardRef(function(o,r){const d=Xe({props:o,name:"MuiTab"}),{className:c,disabled:u=!1,disableFocusRipple:b=!1,fullWidth:g,icon:x,iconPosition:h="top",indicator:S,label:I,onChange:j,onClick:v,onFocus:z,selected:B,selectionFollowsFocus:k,textColor:G="inherit",value:P,wrapped:de=!1}=d,y=We(d,Po),V=C({},d,{disabled:u,disableFocusRipple:b,selected:B,icon:!!x,iconPosition:h,label:!!I,fullWidth:g,textColor:G,wrapped:de}),Y=Ro(V),O=x&&I&&i.isValidElement(x)?i.cloneElement(x,{className:K(Y.iconWrapper,x.props.className)}):x,U=F=>{!B&&j&&j(F,P),v&&v(F)},L=F=>{k&&!B&&j&&j(F,P),z&&z(F)};return e.jsxs(Wo,C({focusRipple:!b,className:K(Y.root,c),ref:r,role:"tab","aria-selected":B,disabled:u,onClick:U,onFocus:L,ownerState:V,tabIndex:B?0:-1},y,{children:[h==="top"||h==="start"?e.jsxs(i.Fragment,{children:[O,I]}):e.jsxs(i.Fragment,{children:[I,O]}),S]}))}),Ao=Eo;function Lo(t){return(1+Math.sin(Math.PI*t-Math.PI/2))/2}function No(t,o,r,d={},c=()=>{}){const{ease:u=Lo,duration:b=300}=d;let g=null;const x=o[t];let h=!1;const S=()=>{h=!0},I=j=>{if(h){c(new Error("Animation cancelled"));return}g===null&&(g=j);const v=Math.min(1,(j-g)/b);if(o[t]=u(v)*(r-x)+x,v>=1){requestAnimationFrame(()=>{c(null)});return}requestAnimationFrame(I)};return x===r?(c(new Error("Element already at target position")),S):(requestAnimationFrame(I),S)}const _o=["onChange"],$o={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function Fo(t){const{onChange:o}=t,r=We(t,_o),d=i.useRef(),c=i.useRef(null),u=()=>{d.current=c.current.offsetHeight-c.current.clientHeight};return Et(()=>{const b=ft(()=>{const x=d.current;u(),x!==d.current&&o(d.current)}),g=gt(c.current);return g.addEventListener("resize",b),()=>{b.clear(),g.removeEventListener("resize",b)}},[o]),i.useEffect(()=>{u(),o(d.current)},[o]),e.jsx("div",C({style:$o,ref:c},r))}function Oo(t){return Ue("MuiTabScrollButton",t)}const Ho=Ve("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),Do=Ho,Vo=["className","slots","slotProps","direction","orientation","disabled"],Uo=t=>{const{classes:o,orientation:r,disabled:d}=t;return qe({root:["root",r,d&&"disabled"]},Oo,o)},Xo=A(bt,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.root,r.orientation&&o[r.orientation]]}})(({ownerState:t})=>C({width:40,flexShrink:0,opacity:.8,[`&.${Do.disabled}`]:{opacity:0}},t.orientation==="vertical"&&{width:"100%",height:40,"& svg":{transform:`rotate(${t.isRtl?-90:90}deg)`}})),qo=i.forwardRef(function(o,r){var d,c;const u=Xe({props:o,name:"MuiTabScrollButton"}),{className:b,slots:g={},slotProps:x={},direction:h}=u,S=We(u,Vo),j=ce().direction==="rtl",v=C({isRtl:j},u),z=Uo(v),B=(d=g.StartScrollButtonIcon)!=null?d:At,k=(c=g.EndScrollButtonIcon)!=null?c:Lt,G=Re({elementType:B,externalSlotProps:x.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:v}),P=Re({elementType:k,externalSlotProps:x.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:v});return e.jsx(Xo,C({component:"div",className:K(z.root,b),ref:r,role:null,ownerState:v,tabIndex:null},S,{children:h==="left"?e.jsx(B,C({},G)):e.jsx(k,C({},P))}))}),Ko=qo;function Go(t){return Ue("MuiTabs",t)}const Yo=Ve("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]),Oe=Yo,Qo=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","slots","slotProps","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],dt=(t,o)=>t===o?t.firstChild:o&&o.nextElementSibling?o.nextElementSibling:t.firstChild,ut=(t,o)=>t===o?t.lastChild:o&&o.previousElementSibling?o.previousElementSibling:t.lastChild,Me=(t,o,r)=>{let d=!1,c=r(t,o);for(;c;){if(c===t.firstChild){if(d)return;d=!0}const u=c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||u)c=r(t,c);else{c.focus();return}}},Jo=t=>{const{vertical:o,fixed:r,hideScrollbar:d,scrollableX:c,scrollableY:u,centered:b,scrollButtonsHideMobile:g,classes:x}=t;return qe({root:["root",o&&"vertical"],scroller:["scroller",r&&"fixed",d&&"hideScrollbar",c&&"scrollableX",u&&"scrollableY"],flexContainer:["flexContainer",o&&"flexContainerVertical",b&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",g&&"scrollButtonsHideMobile"],scrollableX:[c&&"scrollableX"],hideScrollbar:[d&&"hideScrollbar"]},Go,x)},Zo=A("div",{name:"MuiTabs",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[{[`& .${Oe.scrollButtons}`]:o.scrollButtons},{[`& .${Oe.scrollButtons}`]:r.scrollButtonsHideMobile&&o.scrollButtonsHideMobile},o.root,r.vertical&&o.vertical]}})(({ownerState:t,theme:o})=>C({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},t.vertical&&{flexDirection:"column"},t.scrollButtonsHideMobile&&{[`& .${Oe.scrollButtons}`]:{[o.breakpoints.down("sm")]:{display:"none"}}})),en=A("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.scroller,r.fixed&&o.fixed,r.hideScrollbar&&o.hideScrollbar,r.scrollableX&&o.scrollableX,r.scrollableY&&o.scrollableY]}})(({ownerState:t})=>C({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},t.fixed&&{overflowX:"hidden",width:"100%"},t.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},t.scrollableX&&{overflowX:"auto",overflowY:"hidden"},t.scrollableY&&{overflowY:"auto",overflowX:"hidden"})),tn=A("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.flexContainer,r.vertical&&o.flexContainerVertical,r.centered&&o.centered]}})(({ownerState:t})=>C({display:"flex"},t.vertical&&{flexDirection:"column"},t.centered&&{justifyContent:"center"})),on=A("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(t,o)=>o.indicator})(({ownerState:t,theme:o})=>C({position:"absolute",height:2,bottom:0,width:"100%",transition:o.transitions.create()},t.indicatorColor==="primary"&&{backgroundColor:(o.vars||o).palette.primary.main},t.indicatorColor==="secondary"&&{backgroundColor:(o.vars||o).palette.secondary.main},t.vertical&&{height:"100%",width:2,right:0})),nn=A(Fo)({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),ht={},rn=i.forwardRef(function(o,r){const d=Xe({props:o,name:"MuiTabs"}),c=ce(),u=c.direction==="rtl",{"aria-label":b,"aria-labelledby":g,action:x,centered:h=!1,children:S,className:I,component:j="div",allowScrollButtonsMobile:v=!1,indicatorColor:z="primary",onChange:B,orientation:k="horizontal",ScrollButtonComponent:G=Ko,scrollButtons:P="auto",selectionFollowsFocus:de,slots:y={},slotProps:V={},TabIndicatorProps:Y={},TabScrollButtonProps:O={},textColor:U="primary",value:L,variant:F="standard",visibleScrollbar:ee=!1}=d,ye=We(d,Qo),N=F==="scrollable",R=k==="vertical",Q=R?"scrollTop":"scrollLeft",te=R?"top":"left",re=R?"bottom":"right",se=R?"clientHeight":"clientWidth",J=R?"height":"width",W=C({},d,{component:j,allowScrollButtonsMobile:v,indicatorColor:z,orientation:k,vertical:R,scrollButtons:P,textColor:U,variant:F,visibleScrollbar:ee,fixed:!N,hideScrollbar:N&&!ee,scrollableX:N&&!R,scrollableY:N&&R,centered:h&&!N,scrollButtonsHideMobile:!v}),H=Jo(W),Ee=Re({elementType:y.StartScrollButtonIcon,externalSlotProps:V.startScrollButtonIcon,ownerState:W}),Ae=Re({elementType:y.EndScrollButtonIcon,externalSlotProps:V.endScrollButtonIcon,ownerState:W}),[Se,Le]=i.useState(!1),[X,ue]=i.useState(ht),[je,Ce]=i.useState(!1),[n,a]=i.useState(!1),[m,E]=i.useState(!1),[he,It]=i.useState({overflow:"hidden",scrollbarWidth:0}),Qe=new Map,q=i.useRef(null),oe=i.useRef(null),Je=()=>{const s=q.current;let l;if(s){const p=s.getBoundingClientRect();l={clientWidth:s.clientWidth,scrollLeft:s.scrollLeft,scrollTop:s.scrollTop,scrollLeftNormalized:ko(s,c.direction),scrollWidth:s.scrollWidth,top:p.top,bottom:p.bottom,left:p.left,right:p.right}}let f;if(s&&L!==!1){const p=oe.current.children;if(p.length>0){const w=p[Qe.get(L)];f=w?w.getBoundingClientRect():null}}return{tabsMeta:l,tabMeta:f}},pe=Fe(()=>{const{tabsMeta:s,tabMeta:l}=Je();let f=0,p;if(R)p="top",l&&s&&(f=l.top-s.top+s.scrollTop);else if(p=u?"right":"left",l&&s){const M=u?s.scrollLeftNormalized+s.clientWidth-s.scrollWidth:s.scrollLeft;f=(u?-1:1)*(l[p]-s[p]+M)}const w={[p]:f,[J]:l?l[J]:0};if(isNaN(X[p])||isNaN(X[J]))ue(w);else{const M=Math.abs(X[p]-w[p]),D=Math.abs(X[J]-w[J]);(M>=1||D>=1)&&ue(w)}}),Ne=(s,{animation:l=!0}={})=>{l?No(Q,q.current,s,{duration:c.transitions.duration.standard}):q.current[Q]=s},Ze=s=>{let l=q.current[Q];R?l+=s:(l+=s*(u?-1:1),l*=u&&wt()==="reverse"?-1:1),Ne(l)},et=()=>{const s=q.current[se];let l=0;const f=Array.from(oe.current.children);for(let p=0;p<f.length;p+=1){const w=f[p];if(l+w[se]>s){p===0&&(l=s);break}l+=w[se]}return l},kt=()=>{Ze(-1*et())},Mt=()=>{Ze(et())},zt=i.useCallback(s=>{It({overflow:null,scrollbarWidth:s})},[]),Pt=()=>{const s={};s.scrollbarSizeListener=N?e.jsx(nn,{onChange:zt,className:K(H.scrollableX,H.hideScrollbar)}):null;const f=N&&(P==="auto"&&(je||n)||P===!0);return s.scrollButtonStart=f?e.jsx(G,C({slots:{StartScrollButtonIcon:y.StartScrollButtonIcon},slotProps:{startScrollButtonIcon:Ee},orientation:k,direction:u?"right":"left",onClick:kt,disabled:!je},O,{className:K(H.scrollButtons,O.className)})):null,s.scrollButtonEnd=f?e.jsx(G,C({slots:{EndScrollButtonIcon:y.EndScrollButtonIcon},slotProps:{endScrollButtonIcon:Ae},orientation:k,direction:u?"left":"right",onClick:Mt,disabled:!n},O,{className:K(H.scrollButtons,O.className)})):null,s},tt=Fe(s=>{const{tabsMeta:l,tabMeta:f}=Je();if(!(!f||!l)){if(f[te]<l[te]){const p=l[Q]+(f[te]-l[te]);Ne(p,{animation:s})}else if(f[re]>l[re]){const p=l[Q]+(f[re]-l[re]);Ne(p,{animation:s})}}}),we=Fe(()=>{N&&P!==!1&&E(!m)});i.useEffect(()=>{const s=ft(()=>{q.current&&pe()});let l;const f=M=>{M.forEach(D=>{D.removedNodes.forEach(be=>{var Z;(Z=l)==null||Z.unobserve(be)}),D.addedNodes.forEach(be=>{var Z;(Z=l)==null||Z.observe(be)})}),s(),we()},p=gt(q.current);p.addEventListener("resize",s);let w;return typeof ResizeObserver<"u"&&(l=new ResizeObserver(s),Array.from(oe.current.children).forEach(M=>{l.observe(M)})),typeof MutationObserver<"u"&&(w=new MutationObserver(f),w.observe(oe.current,{childList:!0})),()=>{var M,D;s.clear(),p.removeEventListener("resize",s),(M=w)==null||M.disconnect(),(D=l)==null||D.disconnect()}},[pe,we]),i.useEffect(()=>{const s=Array.from(oe.current.children),l=s.length;if(typeof IntersectionObserver<"u"&&l>0&&N&&P!==!1){const f=s[0],p=s[l-1],w={root:q.current,threshold:.99},M=$e=>{Ce(!$e[0].isIntersecting)},D=new IntersectionObserver(M,w);D.observe(f);const be=$e=>{a(!$e[0].isIntersecting)},Z=new IntersectionObserver(be,w);return Z.observe(p),()=>{D.disconnect(),Z.disconnect()}}},[N,P,m,S==null?void 0:S.length]),i.useEffect(()=>{Le(!0)},[]),i.useEffect(()=>{pe()}),i.useEffect(()=>{tt(ht!==X)},[tt,X]),i.useImperativeHandle(x,()=>({updateIndicator:pe,updateScrollButtons:we}),[pe,we]);const ot=e.jsx(on,C({},Y,{className:K(H.indicator,Y.className),ownerState:W,style:C({},X,Y.style)}));let Te=0;const Rt=i.Children.map(S,s=>{if(!i.isValidElement(s))return null;const l=s.props.value===void 0?Te:s.props.value;Qe.set(l,Te);const f=l===L;return Te+=1,i.cloneElement(s,C({fullWidth:F==="fullWidth",indicator:f&&!Se&&ot,selected:f,selectionFollowsFocus:de,onChange:B,textColor:U,value:l},Te===1&&L===!1&&!s.props.tabIndex?{tabIndex:0}:{}))}),Wt=s=>{const l=oe.current,f=Nt(l).activeElement;if(f.getAttribute("role")!=="tab")return;let w=k==="horizontal"?"ArrowLeft":"ArrowUp",M=k==="horizontal"?"ArrowRight":"ArrowDown";switch(k==="horizontal"&&u&&(w="ArrowRight",M="ArrowLeft"),s.key){case w:s.preventDefault(),Me(l,f,ut);break;case M:s.preventDefault(),Me(l,f,dt);break;case"Home":s.preventDefault(),Me(l,null,dt);break;case"End":s.preventDefault(),Me(l,null,ut);break}},_e=Pt();return e.jsxs(Zo,C({className:K(H.root,I),ownerState:W,ref:r,as:j},ye,{children:[_e.scrollButtonStart,_e.scrollbarSizeListener,e.jsxs(en,{className:H.scroller,ownerState:W,style:{overflow:he.overflow,[R?`margin${u?"Left":"Right"}`:"marginBottom"]:ee?void 0:-he.scrollbarWidth},ref:q,children:[e.jsx(tn,{"aria-label":b,"aria-labelledby":g,"aria-orientation":k==="vertical"?"vertical":null,className:H.flexContainer,ownerState:W,onKeyDown:Wt,ref:oe,role:"tablist",children:Rt}),Se&&ot]}),_e.scrollButtonEnd]}))}),ve=rn;var Ke={},sn=vt;Object.defineProperty(Ke,"__esModule",{value:!0});var Tt=Ke.default=void 0,an=sn(mt()),ln=e,cn=(0,an.default)((0,ln.jsx)("path",{d:"M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM8 15h8v2H8v-2z"}),"SmartToyOutlined");Tt=Ke.default=cn;var Ge={},dn=vt;Object.defineProperty(Ge,"__esModule",{value:!0});var Bt=Ge.default=void 0,un=dn(mt()),pt=e,hn=(0,un.default)([(0,pt.jsx)("path",{d:"M6 11.09v-4.7l6-2.25 6 2.25v3.69c.71.1 1.38.31 2 .6V5l-8-3-8 3v6.09c0 5.05 3.41 9.76 8 10.91.03-.01.05-.02.08-.02-.79-.78-1.4-1.76-1.75-2.84C7.76 17.53 6 14.42 6 11.09z"},"0"),(0,pt.jsx)("path",{d:"M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm3 5.5h-2.5V20h-1v-2.5H14v-1h2.5V14h1v2.5H20v1z"},"1")],"AddModeratorOutlined");Bt=Ge.default=hn;A(ve)(({theme:t})=>({".MuiTabs-indicator":{height:4,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:4,width:34,borderRadius:"inherit",background:t.palette.secondary.main}}}));A(ve)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),fontWeight:600,minHeight:0,height:44,margin:t.spacing(0,.5),"&.Mui-selected":{color:t.palette.primary.main}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:44,width:"100%",position:"absolute",top:-44,borderRadius:t.shape.borderRadius,background:ge(t.palette.primary.main,.08)}}}));const pn=A(ve)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),minHeight:0,height:44,fontWeight:600,margin:t.spacing(0,.5),"&.Mui-selected":{color:t.palette.primary.contrastText}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:44,width:"100%",position:"absolute",top:-44,borderRadius:"inherit",background:t.palette.primary.main,boxShadow:t.shadows[1]}}}));A(ve)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),minHeight:0,height:44,fontWeight:600,margin:t.spacing(0,.5),"&.Mui-selected":{color:t.palette.primary.contrastText}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:44,width:"100%",position:"absolute",top:-44,borderRadius:t.shape.borderRadius,background:t.palette.primary.main,boxShadow:t.shadows[1]}}}));A(ve)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),fontWeight:600,margin:t.spacing(0),minHeight:0,fontSize:13,textTransform:"uppercase","&.Mui-selected":{color:t.palette.primary.main}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:38,width:"100%",position:"absolute",top:-38,borderRadius:t.shape.borderRadius*5,background:ge(t.palette.primary.main,.08)}}}));const bn=({users:t})=>{const{t:o}=me(),r=ce(),d=[{id:1,name:"Munroe Dacks",jobTitle:o("Senior Cost Accountant"),company:"Trudoo",avatar:"/avatars/1.png",value:65},{id:2,name:"Gunilla Canario",jobTitle:o("Associate Professor"),company:"Buzzdog",avatar:"/avatars/2.png",value:76},{id:3,name:"Rowena Geistmann",jobTitle:o("Pharmacist"),company:"Yozio",avatar:"/avatars/3.png",value:54},{id:4,name:"Ede Stoving",jobTitle:o("VP Product Management"),company:"Cogibox",avatar:"/avatars/4.png",value:23},{id:5,name:"Crissy Spere",jobTitle:o("Social Worker"),company:"Babbleblab",avatar:"/avatars/5.png",value:16}];return e.jsx(_t,{disablePadding:!0,children:d.map(c=>e.jsxs(i.Fragment,{children:[e.jsxs($t,{sx:{py:1.5,"&:hover":{backgroundColor:r.palette.mode==="dark"?ge(r.palette.neutral[800],.12):"neutral.25"}},secondaryAction:e.jsx(ie,{size:"small",color:"secondary",variant:"outlined",sx:{textTransform:"uppercase",fontSize:r.typography.pxToRem(12)},children:o("Xóa")}),children:[e.jsx(Io,{sx:{minWidth:38,mr:1},children:e.jsx(He,{sx:{width:38,height:38},alt:c.name,src:c.avatar})}),e.jsx(Ft,{sx:{flexGrow:0,maxWidth:"50%",flexBasis:"50%"},disableTypography:!0,primary:e.jsx($,{variant:"h6",noWrap:!0,children:c.name}),secondary:e.jsxs(Co,{children:[e.jsx(Ot,{variant:"dot",color:"success",sx:{mr:1}}),e.jsx($,{color:"text.secondary",fontWeight:500,children:o("Online")})]})})]}),e.jsx(yt,{})]},c.id))})},xn=({open:t,setOpen:o,botName:r})=>{const{t:d}=me(),c=ce(),u=St(c.breakpoints.down("sm")),[b,g]=i.useState([]),[x,h]=i.useState(""),S=()=>{o(!1)},I=()=>{x.trim()&&(g([...b,x.trim()]),h(""))},j=v=>{h(v.target.value)};return e.jsx(e.Fragment,{children:e.jsxs(Ht,{open:t,fullScreen:u,onClose:S,scroll:"paper","aria-labelledby":"basic-dialog-title",maxWidth:"sm",fullWidth:!0,children:[e.jsx(Dt,{children:e.jsx(T,{display:"flex",justifyContent:"space-between",alignItems:"center",children:e.jsxs(T,{children:[e.jsx($,{variant:"caption",fontWeight:600,color:"text.secondary",children:"Gán người dùng cho bot"}),e.jsx($,{variant:"h5",children:r})]})})}),e.jsx(T,{sx:{px:2,pb:2,borderRadius:8},children:e.jsx(Vt,{variant:"outlined",fullWidth:!0,children:e.jsx(Ut,{type:"text",placeholder:d("Thêm người dùng có quyền truy vấn bot"),onChange:j,endAdornment:e.jsx(De,{position:"end",children:e.jsx(le,{onClick:I,edge:"end",children:e.jsx(jt,{})})})})})}),e.jsx($,{variant:"h5",sx:{mx:2,mb:1},children:"Những người dùng sau sẽ có quyền truy vấn Bot"}),e.jsx(Xt,{dividers:!0,sx:{p:0},children:e.jsx(bn,{users:b})}),e.jsxs(qt,{sx:{p:0,backgroundColor:v=>v.palette.mode==="dark"?ge(v.palette.neutral[25],.02):"neutral.25"},children:[e.jsx(ie,{color:"secondary",autoFocus:!0,size:"large",fullWidth:!0,onClick:S,children:"Đóng"}),e.jsx(ie,{color:"primary",autoFocus:!0,size:"large",fullWidth:!0,onClick:S,children:"Gán quyền"})]})]})})},fn=({onSelect:t,setOpenAuthorizeChatbotQuery:o})=>{const{t:r}=me(),[d,c]=i.useState(null),u=!!d,b=S=>{t(),c(S.currentTarget)},g=()=>{c(null)},x=()=>{g()},h=()=>{g(),o(!0)};return e.jsxs(T,{children:[e.jsx(le,{color:"primary","aria-label":"more","aria-controls":"bot-menu","aria-haspopup":"true",onClick:b,children:e.jsx(Kt,{})}),e.jsxs(Gt,{id:"bot-menu",anchorEl:d,open:u,onClose:g,children:[e.jsx(ze,{onClick:h,children:r("Gán người dùng cho bot")}),e.jsx(ze,{onClick:x,children:r("Xem chi tiết")}),e.jsx(ze,{onClick:g,children:r("Xóa")})]})]})},gn=A(Ct)(({theme:t})=>`

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${t.palette.primary.main};
    }
  `),Ye=({bots:t,fetchData:o,totalCount:r})=>{const[d,c]=i.useState({}),[u,b]=i.useState([]),[g,x]=i.useState([]),{t:h}=me(),S=ce(),I=St(S.breakpoints.up("md")),[j,v]=i.useState(0),[z,B]=i.useState(15),[k,G]=i.useState(""),[P,de]=i.useState(""),[y,V]=i.useState({botStatus:null});Pe(n=>n.common.loading);const Y=Pe(n=>n.common.refresh),O=Qt(),U=Jt(),{knowledges:L}=Pe(n=>n.knowledge),[F,ee]=i.useState(!1),ye=n=>{const a=ct[n];return e.jsx(nt,{style:{maxWidth:"80%"},color:a.color,label:a.label})},N=(n,a)=>{let m=null;a!=="ALL"&&(m=a),V(E=>({...E,botStatus:m})),b([])},R=n=>{const a=n.target.value;V(m=>({...m,botStatus:a==="ALL"?null:a})),b([])},Q=n=>{b(n.target.checked?t.map(a=>a.botId):[])},te=(n,a)=>{u.includes(a)?b(m=>m.filter(E=>E!==a)):b(m=>[...m,a])},re=u.length>0,se=u.length>0&&u.length<t.length,J=u.length===t.length,[W,H]=i.useState("grid_view"),Ee=(n,a)=>{H(a)};i.useEffect(()=>{const n=async()=>{try{const a=t.reduce((E,he)=>(E[he.knowId]=(E[he.knowId]||0)+1,E),{}),m=[{value:"ALL",label:h("All bots"),count:t.length},...L==null?void 0:L.map(E=>({value:E.knowId,label:h(E.knowName),count:a[E.knowId]}))];x(m)}catch(a){console.error("Error fetching knowledge data:",a)}};t.length&&L&&n()},[t,L]);const Ae=(n,a)=>{v(a);const m=Ie.stringify({...y,accent:fe(y==null?void 0:y.search)});o({pageNumber:a,pageSize:z},m)},Se=n=>{B(parseInt(n.target.value)),v(0);const a=Ie.stringify({...y,accent:fe(y==null?void 0:y.search)});o({pageNumber:0,pageSize:parseInt(n.target.value)},a)},Le=async n=>{X({search:n})},X=n=>{let a={...y,...n};for(const m in a)(a[m]===""||a[m]===void 0)&&delete a[m];if(V({...a,accent:fe(a.search)}),o&&y){U(ke(!0));const m=Ie.stringify({...a,accent:fe(a==null?void 0:a.search)});o({pageNumber:j,pageSize:z},m).finally(()=>U(ke(!1)))}return a},ue=async()=>{if(o&&y){U(ke(!0));const n=Ie.stringify({...y,accent:fe(y==null?void 0:y.search)});o({pageNumber:j,pageSize:z},n).finally(()=>U(ke(!1)))}},je=n=>{n.which==13&&(n.preventDefault(),ue())},Ce=[{value:"ALL",label:"Tất cả"},...Object.entries(ct).map(([n,a])=>({value:n,...a}))];return i.useEffect(()=>{o({pageNumber:j,pageSize:z})},[Y]),e.jsxs(e.Fragment,{children:[I?e.jsx(pn,{sx:{"& .MuiTab-root":{flexDirection:"row",pr:1,"& .MuiChip-root":{ml:1,transition:S.transitions.create(["background","color"],{duration:S.transitions.duration.complex})},"&.Mui-selected":{"& .MuiChip-root":{backgroundColor:ge(S.palette.primary.contrastText,.12),color:"primary.contrastText"}},"&:first-child":{ml:0}}},onChange:N,scrollButtons:"auto",textColor:"secondary",value:y.botStatus||"ALL",variant:"scrollable",children:Ce.map(n=>e.jsx(Ao,{value:n.value,label:e.jsxs(e.Fragment,{children:[n.label,e.jsx(nt,{label:10,size:"small"})]})},n.value))}):e.jsx(Zt,{value:y.botStatus||"ALL",onChange:R,fullWidth:!0,children:Ce.map(n=>e.jsx(ze,{value:n.value,children:n.label},n.value))}),e.jsxs(T,{display:"flex",justifyContent:"space-between",alignItems:"center",py:2,children:[e.jsxs(T,{display:"flex",alignItems:"center",width:"100%",children:[W==="grid_view"&&e.jsx(xe,{arrow:!0,placement:"top",title:h("Select all bots"),children:e.jsx(Be,{edge:"start",sx:{mr:1},disabled:t.length===0,checked:J,indeterminate:se,onChange:Q})}),re?e.jsxs(rt,{direction:"row",spacing:1,children:[e.jsx(eo,{}),e.jsx(xe,{arrow:!0,placement:"top",title:h("Export bot list"),children:e.jsx(to,{variant:"outlined",color:"secondary",sx:{color:"primary.main"},size:"small",startIcon:e.jsx(oo,{fontSize:"small"})})})]}):e.jsxs(rt,{direction:"row",gap:"10px",width:"100%",children:[e.jsx(T,{width:{xs:"100%",md:"50%"},children:e.jsx(no,{margin:"none",fullWidth:!0,InputProps:{startAdornment:e.jsx(De,{position:"start",children:e.jsx(jt,{})}),endAdornment:P&&e.jsx(De,{position:"end",children:e.jsx(le,{color:"error","aria-label":"clear input",onClick:()=>de(""),edge:"end",size:"small",sx:{color:"error.main"},children:e.jsx(ro,{fontSize:"small"})})})},onChange:n=>{Le(n.target.value),G(n.target.value)},onKeyPress:je,placeholder:h("Tên bot"),value:k,size:"small",variant:"outlined"})}),e.jsx(ie,{variant:"contained",color:"primary",size:"small",sx:{whiteSpace:"nowrap",minWidth:"unset"},onClick:ue,children:h("Tìm kiếm")})]})]}),e.jsxs(so,{sx:{ml:1},size:"large",color:"primary",value:W,exclusive:!0,onChange:Ee,children:[e.jsx(st,{value:"table_view",children:e.jsx(ao,{})}),e.jsx(st,{value:"grid_view",children:e.jsx(lo,{})})]})]}),t.length===0?e.jsx(e.Fragment,{children:e.jsxs(T,{sx:{minHeight:"50vh"},display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",children:[" ",e.jsx("img",{style:{width:"200px"},src:io}),e.jsx($,{variant:"h6",color:"text.secondary",align:"center",fontWeight:500,children:h("Không có dữ liệu bot")})]})}):e.jsxs(e.Fragment,{children:[W==="table_view"&&e.jsx(e.Fragment,{children:e.jsx(Ct,{children:e.jsx(co,{children:e.jsxs(uo,{children:[e.jsx(ho,{children:e.jsxs(at,{children:[e.jsx(_,{padding:"checkbox",children:e.jsx(Be,{checked:J,indeterminate:se,onChange:Q})}),e.jsx(_,{children:h("Tên bot")}),e.jsx(_,{children:h("Số lượng người dùng")}),e.jsx(_,{children:h("Lĩnh vực")}),e.jsx(_,{align:"center",children:h("Mô tả")}),e.jsx(_,{align:"center",children:h("Hành động")})]})}),e.jsx(po,{children:t.map(n=>{const a=u.includes(n.botId);return e.jsxs(at,{hover:!0,selected:a,children:[e.jsx(_,{padding:"checkbox",children:e.jsx(Be,{checked:a,onChange:m=>te(m,n.botId),value:a})}),e.jsx(_,{children:e.jsxs(T,{display:"flex",alignItems:"center",children:[e.jsx(He,{variant:"rounded",sx:{mr:1},src:n.avatar}),e.jsx(T,{children:e.jsx(lt,{variant:"subtitle1",fontWeight:500,href:"",onClick:()=>O.push(`/chatbot/${n.botId}`),underline:"hover",children:n.botName})})]})}),e.jsx(_,{children:"0"}),e.jsx(_,{children:ye(n.botStatus)}),e.jsx(_,{children:e.jsx($,{fontWeight:600,children:n.botDescription})}),e.jsx(_,{align:"center",children:e.jsxs($,{noWrap:!0,children:[e.jsx(xe,{title:h("Gán người dùng cho bot"),arrow:!0,children:e.jsx(le,{onClick:()=>{c(n),ee(!0)},color:"secondary",children:e.jsx(Bt,{fontSize:"small"})})}),e.jsx(xe,{title:h("View"),arrow:!0,children:e.jsx(le,{color:"secondary",children:e.jsx(Bo,{fontSize:"small"})})}),e.jsx(xe,{title:h("Delete"),arrow:!0,children:e.jsx(le,{color:"secondary",children:e.jsx(bo,{fontSize:"small"})})})]})})]},n.id)})})]})})})}),W==="grid_view"&&e.jsxs(e.Fragment,{children:[t.length===0?e.jsx($,{sx:{py:{xs:2,sm:3,md:6,lg:10}},variant:"h3",color:"text.secondary",align:"center",children:h("Không có dữ liệu bot")}):e.jsx(e.Fragment,{children:e.jsx(it,{container:!0,spacing:{xs:2,sm:3},children:t.map(n=>{const a=u.includes(n.botId);return e.jsx(it,{xs:12,sm:6,lg:4,children:e.jsx(gn,{className:K({"Mui-selected":a}),children:e.jsxs(T,{sx:{position:"relative",zIndex:"2"},children:[e.jsxs(T,{px:2,pt:2,display:"flex",alignItems:"flex-start",justifyContent:"space-between",children:[ye(n.botStatus),e.jsx(fn,{onSelect:()=>c(n),setOpenAuthorizeChatbotQuery:ee})]}),e.jsxs(T,{p:2,display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"flex-start",children:[e.jsx(He,{variant:"rounded",sx:{width:50,height:50,mr:1.5,mb:{xs:2,md:0}},src:n.icon}),e.jsxs(T,{children:[e.jsxs(T,{children:[e.jsx(lt,{variant:"h6",href:"",onClick:m=>m.preventDefault(),underline:"hover",children:n.name})," ",e.jsx($,{component:"span",variant:"body2",color:"text.secondary",children:n.botName})]}),e.jsx($,{style:{height:44,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},sx:{pt:.3},variant:"subtitle2",children:n.botDescription})]})]}),e.jsx(yt,{}),e.jsxs(T,{pl:2,py:1,pr:1,display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(ie,{variant:"contained",onClick:()=>O.push(`/chatbot/${n.botId}`),endIcon:e.jsx(To,{}),children:h("Xem chi tiết bot")}),e.jsx(Be,{checked:a,onChange:m=>te(m,n.botId),value:a})]})]})})},n.botId)})})}),e.jsx(T,{pt:2,sx:{".MuiTablePagination-select":{py:.55}},children:e.jsx(xo,{component:"div",count:r,onPageChange:Ae,onRowsPerPageChange:Se,page:j,rowsPerPage:z,labelRowsPerPage:"Số hàng mỗi trang",rowsPerPageOptions:[5,15,30,50],slotProps:{select:{variant:"outlined",size:"small",sx:{p:0}}}})})]}),!W&&e.jsx(T,{sx:{textAlign:"center",p:{xs:2,sm:3}},children:e.jsx($,{align:"center",variant:"h4",color:"text.secondary",fontWeight:500,sx:{my:{xs:2,sm:3,md:5}},gutterBottom:!0,children:h("Choose between table or grid views for displaying the bots list.")})}),e.jsx(xn,{botName:d==null?void 0:d.botName,open:F,setOpen:ee})]})]})};Ye.propTypes={bots:Yt.array.isRequired};Ye.defaultProps={bots:[]};const Tn=()=>{const t=ce(),{t:o}=me(),r=fo();go();const[d,c]=i.useState([]),[u,b]=i.useState(!1),[g,x]=i.useState(0),h=Pe(v=>v.auth.admin),S=()=>{b(!0)},I=()=>{b(!1)},j=i.useCallback(async(v,z)=>{try{const B=await mo.getBotsByCustomer({customerId:h.customerId,pagination:{pageNumber:v.pageNumber,pageSize:v.pageSize},filter:z});r()&&(c(B.content),x(B.totalElements))}catch(B){console.error(B)}},[r,h.customerId]);return e.jsxs(e.Fragment,{children:[e.jsx(T,{px:{xs:2,sm:3},pt:{xs:2,sm:3},component:"main",flex:1,display:"flex",flexDirection:"column",children:e.jsxs(vo,{disableGutters:!0,maxWidth:"xl",children:[e.jsx(T,{pb:{xs:2,sm:3},children:e.jsx(yo,{sx:{px:0},title:o("Chatbot"),description:o("Quản lý chatbot"),actions:e.jsx(e.Fragment,{children:e.jsx(ie,{sx:{mt:{xs:2,md:0}},variant:"contained",onClick:S,startIcon:e.jsx(So,{fontSize:"small"}),children:o("Tạo bot")})}),iconBox:e.jsx(jo,{isSoft:!0,variant:"rounded",state:"primary",sx:{height:t.spacing(7),width:t.spacing(7),svg:{height:t.spacing(4),width:t.spacing(4),minWidth:t.spacing(4)}},children:e.jsx(Tt,{})})})}),e.jsx(Ye,{bots:d,totalCount:g,fetchData:j})]})}),e.jsx(wo,{open:u,onClose:I,onUpdate:j})]})};export{Tn as default};
