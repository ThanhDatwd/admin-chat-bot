import{ap as Oe,aq as He,K as A,ar as pt,as as bt,at as j,r as a,au as De,av as ze,ae as K,j as e,aw as Ve,ax as Pt,ay as xt,az as ft,u as ce,aA as Et,aB as At,aC as Me,aD as Ne,aE as Nt,f as gt,i as mt,aF as be,a as xe,aG as $t,aH as _t,b as ie,aa as Fe,aI as Ft,T as F,aJ as Lt,D as vt,L as yt,aK as Ot,aL as Ht,B as w,aM as Dt,aN as Vt,q as Le,E as ae,Z as St,aO as Xt,aP as Ut,F as qt,M as Kt,H as Ie,c as jt,g as Gt,k as ke,O as Yt,Q as Qt,ab as ot,aQ as Jt,R as pe,U as we,S as nt,V as Zt,W as eo,X as to,Y as oo,$ as no,a0 as ro,a1 as rt,a2 as so,a3 as lo,a4 as ao,a5 as io,a6 as co,a7 as st,a8 as _,a9 as uo,af as lt,aR as ho,ad as at,ag as po,ah as bo,y as Te,ak as xo,al as fo,aS as go,C as mo,P as vo,am as yo,A as So}from"./index-8egQHEDr.js";import{I as jo,C as Co}from"./create-chatbot-dialog-Y5WVtVdh.js";import{d as wo,l as it,i as $e}from"./validateString-k54MvUbR.js";import{d as To}from"./LaunchTwoTone-7HaCaCgK.js";import{L as Bo}from"./ListItemAvatar-OCrJlnhh.js";import"./upload-icon-chatbot-Si5wWxxK.js";let le;function Ct(){if(le)return le;const t=document.createElement("div"),o=document.createElement("div");return o.style.width="10px",o.style.height="1px",t.appendChild(o),t.dir="rtl",t.style.fontSize="14px",t.style.width="4px",t.style.height="1px",t.style.position="absolute",t.style.top="-1000px",t.style.overflow="scroll",document.body.appendChild(t),le="reverse",t.scrollLeft>0?le="default":(t.scrollLeft=1,t.scrollLeft===0&&(le="negative")),document.body.removeChild(t),le}function Io(t,o){const r=t.scrollLeft;if(o!=="rtl")return r;switch(Ct()){case"negative":return t.scrollWidth-t.clientWidth+r;case"reverse":return t.scrollWidth-t.clientWidth-r;default:return r}}function ko(t){return He("MuiTab",t)}const Mo=Oe("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]),ne=Mo,zo=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],Ro=t=>{const{classes:o,textColor:r,fullWidth:d,wrapped:i,icon:u,label:b,selected:f,disabled:x}=t,h={root:["root",u&&b&&"labelIcon",`textColor${bt(r)}`,d&&"fullWidth",i&&"wrapped",f&&"selected",x&&"disabled"],iconWrapper:["iconWrapper"]};return Ve(h,ko,o)},Wo=A(pt,{name:"MuiTab",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.root,r.label&&r.icon&&o.labelIcon,o[`textColor${bt(r.textColor)}`],r.fullWidth&&o.fullWidth,r.wrapped&&o.wrapped]}})(({theme:t,ownerState:o})=>j({},t.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},o.label&&{flexDirection:o.iconPosition==="top"||o.iconPosition==="bottom"?"column":"row"},{lineHeight:1.25},o.icon&&o.label&&{minHeight:72,paddingTop:9,paddingBottom:9,[`& > .${ne.iconWrapper}`]:j({},o.iconPosition==="top"&&{marginBottom:6},o.iconPosition==="bottom"&&{marginTop:6},o.iconPosition==="start"&&{marginRight:t.spacing(1)},o.iconPosition==="end"&&{marginLeft:t.spacing(1)})},o.textColor==="inherit"&&{color:"inherit",opacity:.6,[`&.${ne.selected}`]:{opacity:1},[`&.${ne.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}},o.textColor==="primary"&&{color:(t.vars||t).palette.text.secondary,[`&.${ne.selected}`]:{color:(t.vars||t).palette.primary.main},[`&.${ne.disabled}`]:{color:(t.vars||t).palette.text.disabled}},o.textColor==="secondary"&&{color:(t.vars||t).palette.text.secondary,[`&.${ne.selected}`]:{color:(t.vars||t).palette.secondary.main},[`&.${ne.disabled}`]:{color:(t.vars||t).palette.text.disabled}},o.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},o.wrapped&&{fontSize:t.typography.pxToRem(12)})),Po=a.forwardRef(function(o,r){const d=De({props:o,name:"MuiTab"}),{className:i,disabled:u=!1,disableFocusRipple:b=!1,fullWidth:f,icon:x,iconPosition:h="top",indicator:y,label:I,onChange:S,onClick:m,onFocus:z,selected:B,selectionFollowsFocus:k,textColor:G="inherit",value:W,wrapped:de=!1}=d,T=ze(d,zo),V=j({},d,{disabled:u,disableFocusRipple:b,selected:B,icon:!!x,iconPosition:h,label:!!I,fullWidth:f,textColor:G,wrapped:de}),Y=Ro(V),O=x&&I&&a.isValidElement(x)?a.cloneElement(x,{className:K(Y.iconWrapper,x.props.className)}):x,X=L=>{!B&&S&&S(L,W),m&&m(L)},N=L=>{k&&!B&&S&&S(L,W),z&&z(L)};return e.jsxs(Wo,j({focusRipple:!b,className:K(Y.root,i),ref:r,role:"tab","aria-selected":B,disabled:u,onClick:X,onFocus:N,ownerState:V,tabIndex:B?0:-1},T,{children:[h==="top"||h==="start"?e.jsxs(a.Fragment,{children:[O,I]}):e.jsxs(a.Fragment,{children:[I,O]}),y]}))}),Eo=Po;function Ao(t){return(1+Math.sin(Math.PI*t-Math.PI/2))/2}function No(t,o,r,d={},i=()=>{}){const{ease:u=Ao,duration:b=300}=d;let f=null;const x=o[t];let h=!1;const y=()=>{h=!0},I=S=>{if(h){i(new Error("Animation cancelled"));return}f===null&&(f=S);const m=Math.min(1,(S-f)/b);if(o[t]=u(m)*(r-x)+x,m>=1){requestAnimationFrame(()=>{i(null)});return}requestAnimationFrame(I)};return x===r?(i(new Error("Element already at target position")),y):(requestAnimationFrame(I),y)}const $o=["onChange"],_o={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function Fo(t){const{onChange:o}=t,r=ze(t,$o),d=a.useRef(),i=a.useRef(null),u=()=>{d.current=i.current.offsetHeight-i.current.clientHeight};return Pt(()=>{const b=xt(()=>{const x=d.current;u(),x!==d.current&&o(d.current)}),f=ft(i.current);return f.addEventListener("resize",b),()=>{b.clear(),f.removeEventListener("resize",b)}},[o]),a.useEffect(()=>{u(),o(d.current)},[o]),e.jsx("div",j({style:_o,ref:i},r))}function Lo(t){return He("MuiTabScrollButton",t)}const Oo=Oe("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),Ho=Oo,Do=["className","slots","slotProps","direction","orientation","disabled"],Vo=t=>{const{classes:o,orientation:r,disabled:d}=t;return Ve({root:["root",r,d&&"disabled"]},Lo,o)},Xo=A(pt,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.root,r.orientation&&o[r.orientation]]}})(({ownerState:t})=>j({width:40,flexShrink:0,opacity:.8,[`&.${Ho.disabled}`]:{opacity:0}},t.orientation==="vertical"&&{width:"100%",height:40,"& svg":{transform:`rotate(${t.isRtl?-90:90}deg)`}})),Uo=a.forwardRef(function(o,r){var d,i;const u=De({props:o,name:"MuiTabScrollButton"}),{className:b,slots:f={},slotProps:x={},direction:h}=u,y=ze(u,Do),S=ce().direction==="rtl",m=j({isRtl:S},u),z=Vo(m),B=(d=f.StartScrollButtonIcon)!=null?d:Et,k=(i=f.EndScrollButtonIcon)!=null?i:At,G=Me({elementType:B,externalSlotProps:x.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:m}),W=Me({elementType:k,externalSlotProps:x.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:m});return e.jsx(Xo,j({component:"div",className:K(z.root,b),ref:r,role:null,ownerState:m,tabIndex:null},y,{children:h==="left"?e.jsx(B,j({},G)):e.jsx(k,j({},W))}))}),qo=Uo;function Ko(t){return He("MuiTabs",t)}const Go=Oe("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]),_e=Go,Yo=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","slots","slotProps","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],ct=(t,o)=>t===o?t.firstChild:o&&o.nextElementSibling?o.nextElementSibling:t.firstChild,dt=(t,o)=>t===o?t.lastChild:o&&o.previousElementSibling?o.previousElementSibling:t.lastChild,Be=(t,o,r)=>{let d=!1,i=r(t,o);for(;i;){if(i===t.firstChild){if(d)return;d=!0}const u=i.disabled||i.getAttribute("aria-disabled")==="true";if(!i.hasAttribute("tabindex")||u)i=r(t,i);else{i.focus();return}}},Qo=t=>{const{vertical:o,fixed:r,hideScrollbar:d,scrollableX:i,scrollableY:u,centered:b,scrollButtonsHideMobile:f,classes:x}=t;return Ve({root:["root",o&&"vertical"],scroller:["scroller",r&&"fixed",d&&"hideScrollbar",i&&"scrollableX",u&&"scrollableY"],flexContainer:["flexContainer",o&&"flexContainerVertical",b&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",f&&"scrollButtonsHideMobile"],scrollableX:[i&&"scrollableX"],hideScrollbar:[d&&"hideScrollbar"]},Ko,x)},Jo=A("div",{name:"MuiTabs",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[{[`& .${_e.scrollButtons}`]:o.scrollButtons},{[`& .${_e.scrollButtons}`]:r.scrollButtonsHideMobile&&o.scrollButtonsHideMobile},o.root,r.vertical&&o.vertical]}})(({ownerState:t,theme:o})=>j({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},t.vertical&&{flexDirection:"column"},t.scrollButtonsHideMobile&&{[`& .${_e.scrollButtons}`]:{[o.breakpoints.down("sm")]:{display:"none"}}})),Zo=A("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.scroller,r.fixed&&o.fixed,r.hideScrollbar&&o.hideScrollbar,r.scrollableX&&o.scrollableX,r.scrollableY&&o.scrollableY]}})(({ownerState:t})=>j({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},t.fixed&&{overflowX:"hidden",width:"100%"},t.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},t.scrollableX&&{overflowX:"auto",overflowY:"hidden"},t.scrollableY&&{overflowY:"auto",overflowX:"hidden"})),en=A("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.flexContainer,r.vertical&&o.flexContainerVertical,r.centered&&o.centered]}})(({ownerState:t})=>j({display:"flex"},t.vertical&&{flexDirection:"column"},t.centered&&{justifyContent:"center"})),tn=A("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(t,o)=>o.indicator})(({ownerState:t,theme:o})=>j({position:"absolute",height:2,bottom:0,width:"100%",transition:o.transitions.create()},t.indicatorColor==="primary"&&{backgroundColor:(o.vars||o).palette.primary.main},t.indicatorColor==="secondary"&&{backgroundColor:(o.vars||o).palette.secondary.main},t.vertical&&{height:"100%",width:2,right:0})),on=A(Fo)({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),ut={},nn=a.forwardRef(function(o,r){const d=De({props:o,name:"MuiTabs"}),i=ce(),u=i.direction==="rtl",{"aria-label":b,"aria-labelledby":f,action:x,centered:h=!1,children:y,className:I,component:S="div",allowScrollButtonsMobile:m=!1,indicatorColor:z="primary",onChange:B,orientation:k="horizontal",ScrollButtonComponent:G=qo,scrollButtons:W="auto",selectionFollowsFocus:de,slots:T={},slotProps:V={},TabIndicatorProps:Y={},TabScrollButtonProps:O={},textColor:X="primary",value:N,variant:L="standard",visibleScrollbar:ee=!1}=d,ge=ze(d,Yo),$=L==="scrollable",P=k==="vertical",Q=P?"scrollTop":"scrollLeft",te=P?"top":"left",re=P?"bottom":"right",se=P?"clientHeight":"clientWidth",J=P?"height":"width",E=j({},d,{component:S,allowScrollButtonsMobile:m,indicatorColor:z,orientation:k,vertical:P,scrollButtons:W,textColor:X,variant:L,visibleScrollbar:ee,fixed:!$,hideScrollbar:$&&!ee,scrollableX:$&&!P,scrollableY:$&&P,centered:h&&!$,scrollButtonsHideMobile:!m}),H=Qo(E),Re=Me({elementType:T.StartScrollButtonIcon,externalSlotProps:V.startScrollButtonIcon,ownerState:E}),We=Me({elementType:T.EndScrollButtonIcon,externalSlotProps:V.endScrollButtonIcon,ownerState:E}),[me,Ke]=a.useState(!1),[U,ve]=a.useState(ut),[ye,n]=a.useState(!1),[c,v]=a.useState(!1),[R,Se]=a.useState(!1),[Ge,Bt]=a.useState({overflow:"hidden",scrollbarWidth:0}),Ye=new Map,q=a.useRef(null),oe=a.useRef(null),Qe=()=>{const s=q.current;let l;if(s){const p=s.getBoundingClientRect();l={clientWidth:s.clientWidth,scrollLeft:s.scrollLeft,scrollTop:s.scrollTop,scrollLeftNormalized:Io(s,i.direction),scrollWidth:s.scrollWidth,top:p.top,bottom:p.bottom,left:p.left,right:p.right}}let g;if(s&&N!==!1){const p=oe.current.children;if(p.length>0){const C=p[Ye.get(N)];g=C?C.getBoundingClientRect():null}}return{tabsMeta:l,tabMeta:g}},ue=Ne(()=>{const{tabsMeta:s,tabMeta:l}=Qe();let g=0,p;if(P)p="top",l&&s&&(g=l.top-s.top+s.scrollTop);else if(p=u?"right":"left",l&&s){const M=u?s.scrollLeftNormalized+s.clientWidth-s.scrollWidth:s.scrollLeft;g=(u?-1:1)*(l[p]-s[p]+M)}const C={[p]:g,[J]:l?l[J]:0};if(isNaN(U[p])||isNaN(U[J]))ve(C);else{const M=Math.abs(U[p]-C[p]),D=Math.abs(U[J]-C[J]);(M>=1||D>=1)&&ve(C)}}),Pe=(s,{animation:l=!0}={})=>{l?No(Q,q.current,s,{duration:i.transitions.duration.standard}):q.current[Q]=s},Je=s=>{let l=q.current[Q];P?l+=s:(l+=s*(u?-1:1),l*=u&&Ct()==="reverse"?-1:1),Pe(l)},Ze=()=>{const s=q.current[se];let l=0;const g=Array.from(oe.current.children);for(let p=0;p<g.length;p+=1){const C=g[p];if(l+C[se]>s){p===0&&(l=s);break}l+=C[se]}return l},It=()=>{Je(-1*Ze())},kt=()=>{Je(Ze())},Mt=a.useCallback(s=>{Bt({overflow:null,scrollbarWidth:s})},[]),zt=()=>{const s={};s.scrollbarSizeListener=$?e.jsx(on,{onChange:Mt,className:K(H.scrollableX,H.hideScrollbar)}):null;const g=$&&(W==="auto"&&(ye||c)||W===!0);return s.scrollButtonStart=g?e.jsx(G,j({slots:{StartScrollButtonIcon:T.StartScrollButtonIcon},slotProps:{startScrollButtonIcon:Re},orientation:k,direction:u?"right":"left",onClick:It,disabled:!ye},O,{className:K(H.scrollButtons,O.className)})):null,s.scrollButtonEnd=g?e.jsx(G,j({slots:{EndScrollButtonIcon:T.EndScrollButtonIcon},slotProps:{endScrollButtonIcon:We},orientation:k,direction:u?"left":"right",onClick:kt,disabled:!c},O,{className:K(H.scrollButtons,O.className)})):null,s},et=Ne(s=>{const{tabsMeta:l,tabMeta:g}=Qe();if(!(!g||!l)){if(g[te]<l[te]){const p=l[Q]+(g[te]-l[te]);Pe(p,{animation:s})}else if(g[re]>l[re]){const p=l[Q]+(g[re]-l[re]);Pe(p,{animation:s})}}}),je=Ne(()=>{$&&W!==!1&&Se(!R)});a.useEffect(()=>{const s=xt(()=>{q.current&&ue()});let l;const g=M=>{M.forEach(D=>{D.removedNodes.forEach(he=>{var Z;(Z=l)==null||Z.unobserve(he)}),D.addedNodes.forEach(he=>{var Z;(Z=l)==null||Z.observe(he)})}),s(),je()},p=ft(q.current);p.addEventListener("resize",s);let C;return typeof ResizeObserver<"u"&&(l=new ResizeObserver(s),Array.from(oe.current.children).forEach(M=>{l.observe(M)})),typeof MutationObserver<"u"&&(C=new MutationObserver(g),C.observe(oe.current,{childList:!0})),()=>{var M,D;s.clear(),p.removeEventListener("resize",s),(M=C)==null||M.disconnect(),(D=l)==null||D.disconnect()}},[ue,je]),a.useEffect(()=>{const s=Array.from(oe.current.children),l=s.length;if(typeof IntersectionObserver<"u"&&l>0&&$&&W!==!1){const g=s[0],p=s[l-1],C={root:q.current,threshold:.99},M=Ae=>{n(!Ae[0].isIntersecting)},D=new IntersectionObserver(M,C);D.observe(g);const he=Ae=>{v(!Ae[0].isIntersecting)},Z=new IntersectionObserver(he,C);return Z.observe(p),()=>{D.disconnect(),Z.disconnect()}}},[$,W,R,y==null?void 0:y.length]),a.useEffect(()=>{Ke(!0)},[]),a.useEffect(()=>{ue()}),a.useEffect(()=>{et(ut!==U)},[et,U]),a.useImperativeHandle(x,()=>({updateIndicator:ue,updateScrollButtons:je}),[ue,je]);const tt=e.jsx(tn,j({},Y,{className:K(H.indicator,Y.className),ownerState:E,style:j({},U,Y.style)}));let Ce=0;const Rt=a.Children.map(y,s=>{if(!a.isValidElement(s))return null;const l=s.props.value===void 0?Ce:s.props.value;Ye.set(l,Ce);const g=l===N;return Ce+=1,a.cloneElement(s,j({fullWidth:L==="fullWidth",indicator:g&&!me&&tt,selected:g,selectionFollowsFocus:de,onChange:B,textColor:X,value:l},Ce===1&&N===!1&&!s.props.tabIndex?{tabIndex:0}:{}))}),Wt=s=>{const l=oe.current,g=Nt(l).activeElement;if(g.getAttribute("role")!=="tab")return;let C=k==="horizontal"?"ArrowLeft":"ArrowUp",M=k==="horizontal"?"ArrowRight":"ArrowDown";switch(k==="horizontal"&&u&&(C="ArrowRight",M="ArrowLeft"),s.key){case C:s.preventDefault(),Be(l,g,dt);break;case M:s.preventDefault(),Be(l,g,ct);break;case"Home":s.preventDefault(),Be(l,null,ct);break;case"End":s.preventDefault(),Be(l,null,dt);break}},Ee=zt();return e.jsxs(Jo,j({className:K(H.root,I),ownerState:E,ref:r,as:S},ge,{children:[Ee.scrollButtonStart,Ee.scrollbarSizeListener,e.jsxs(Zo,{className:H.scroller,ownerState:E,style:{overflow:Ge.overflow,[P?`margin${u?"Left":"Right"}`:"marginBottom"]:ee?void 0:-Ge.scrollbarWidth},ref:q,children:[e.jsx(en,{"aria-label":b,"aria-labelledby":f,"aria-orientation":k==="vertical"?"vertical":null,className:H.flexContainer,ownerState:E,onKeyDown:Wt,ref:oe,role:"tablist",children:Rt}),me&&tt]}),Ee.scrollButtonEnd]}))}),fe=nn;var Xe={},rn=mt;Object.defineProperty(Xe,"__esModule",{value:!0});var wt=Xe.default=void 0,sn=rn(gt()),ln=e,an=(0,sn.default)((0,ln.jsx)("path",{d:"M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM8 15h8v2H8v-2z"}),"SmartToyOutlined");wt=Xe.default=an;var Ue={},cn=mt;Object.defineProperty(Ue,"__esModule",{value:!0});var Tt=Ue.default=void 0,dn=cn(gt()),ht=e,un=(0,dn.default)([(0,ht.jsx)("path",{d:"M6 11.09v-4.7l6-2.25 6 2.25v3.69c.71.1 1.38.31 2 .6V5l-8-3-8 3v6.09c0 5.05 3.41 9.76 8 10.91.03-.01.05-.02.08-.02-.79-.78-1.4-1.76-1.75-2.84C7.76 17.53 6 14.42 6 11.09z"},"0"),(0,ht.jsx)("path",{d:"M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm3 5.5h-2.5V20h-1v-2.5H14v-1h2.5V14h1v2.5H20v1z"},"1")],"AddModeratorOutlined");Tt=Ue.default=un;A(fe)(({theme:t})=>({".MuiTabs-indicator":{height:4,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:4,width:34,borderRadius:"inherit",background:t.palette.secondary.main}}}));A(fe)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),fontWeight:600,minHeight:0,height:44,margin:t.spacing(0,.5),"&.Mui-selected":{color:t.palette.primary.main}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:44,width:"100%",position:"absolute",top:-44,borderRadius:t.shape.borderRadius,background:be(t.palette.primary.main,.08)}}}));const hn=A(fe)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),minHeight:0,height:44,fontWeight:600,margin:t.spacing(0,.5),"&.Mui-selected":{color:t.palette.primary.contrastText}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:44,width:"100%",position:"absolute",top:-44,borderRadius:"inherit",background:t.palette.primary.main,boxShadow:t.shadows[1]}}}));A(fe)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),minHeight:0,height:44,fontWeight:600,margin:t.spacing(0,.5),"&.Mui-selected":{color:t.palette.primary.contrastText}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:44,width:"100%",position:"absolute",top:-44,borderRadius:t.shape.borderRadius,background:t.palette.primary.main,boxShadow:t.shadows[1]}}}));A(fe)(({theme:t})=>({overflow:"visible",minHeight:0,".MuiTabs-flexContainer":{position:"relative",zIndex:6},".MuiTabs-scroller":{overflow:"visible !important"},".MuiTab-root":{padding:t.spacing(1,2),transition:t.transitions.create(["color","background-color"],{duration:t.transitions.duration.standard}),fontWeight:600,margin:t.spacing(0),minHeight:0,fontSize:13,textTransform:"uppercase","&.Mui-selected":{color:t.palette.primary.main}},".MuiTabs-indicator":{height:0,display:"flex",justifyContent:"center",backgroundColor:"transparent","&::after":{content:'""',height:38,width:"100%",position:"absolute",top:-38,borderRadius:t.shape.borderRadius*5,background:be(t.palette.primary.main,.08)}}}));const pn=({users:t})=>{const{t:o}=xe(),r=ce(),d=[{id:1,name:"Munroe Dacks",jobTitle:o("Senior Cost Accountant"),company:"Trudoo",avatar:"/avatars/1.png",value:65},{id:2,name:"Gunilla Canario",jobTitle:o("Associate Professor"),company:"Buzzdog",avatar:"/avatars/2.png",value:76},{id:3,name:"Rowena Geistmann",jobTitle:o("Pharmacist"),company:"Yozio",avatar:"/avatars/3.png",value:54},{id:4,name:"Ede Stoving",jobTitle:o("VP Product Management"),company:"Cogibox",avatar:"/avatars/4.png",value:23},{id:5,name:"Crissy Spere",jobTitle:o("Social Worker"),company:"Babbleblab",avatar:"/avatars/5.png",value:16}];return e.jsx($t,{disablePadding:!0,children:d.map(i=>e.jsxs(a.Fragment,{children:[e.jsxs(_t,{sx:{py:1.5,"&:hover":{backgroundColor:r.palette.mode==="dark"?be(r.palette.neutral[800],.12):"neutral.25"}},secondaryAction:e.jsx(ie,{size:"small",color:"secondary",variant:"outlined",sx:{textTransform:"uppercase",fontSize:r.typography.pxToRem(12)},children:o("Xóa")}),children:[e.jsx(Bo,{sx:{minWidth:38,mr:1},children:e.jsx(Fe,{sx:{width:38,height:38},alt:i.name,src:i.avatar})}),e.jsx(Ft,{sx:{flexGrow:0,maxWidth:"50%",flexBasis:"50%"},disableTypography:!0,primary:e.jsx(F,{variant:"h6",noWrap:!0,children:i.name}),secondary:e.jsxs(jo,{children:[e.jsx(Lt,{variant:"dot",color:"success",sx:{mr:1}}),e.jsx(F,{color:"text.secondary",fontWeight:500,children:o("Online")})]})})]}),e.jsx(vt,{})]},i.id))})},bn=({open:t,setOpen:o,botName:r})=>{const{t:d}=xe(),i=ce(),u=yt(i.breakpoints.down("sm")),[b,f]=a.useState([]),[x,h]=a.useState(""),y=()=>{o(!1)},I=()=>{x.trim()&&(f([...b,x.trim()]),h(""))},S=m=>{h(m.target.value)};return e.jsx(e.Fragment,{children:e.jsxs(Ot,{open:t,fullScreen:u,onClose:y,scroll:"paper","aria-labelledby":"basic-dialog-title",maxWidth:"sm",fullWidth:!0,children:[e.jsx(Ht,{children:e.jsx(w,{display:"flex",justifyContent:"space-between",alignItems:"center",children:e.jsxs(w,{children:[e.jsx(F,{variant:"caption",fontWeight:600,color:"text.secondary",children:"Gán người dùng cho bot"}),e.jsx(F,{variant:"h5",children:r})]})})}),e.jsx(w,{sx:{px:2,pb:2,borderRadius:8},children:e.jsx(Dt,{variant:"outlined",fullWidth:!0,children:e.jsx(Vt,{type:"text",placeholder:d("Thêm người dùng có quyền truy vấn bot"),onChange:S,endAdornment:e.jsx(Le,{position:"end",children:e.jsx(ae,{onClick:I,edge:"end",children:e.jsx(St,{})})})})})}),e.jsx(F,{variant:"h5",sx:{mx:2,mb:1},children:"Những người dùng sau sẽ có quyền truy vấn Bot"}),e.jsx(Xt,{dividers:!0,sx:{p:0},children:e.jsx(pn,{users:b})}),e.jsxs(Ut,{sx:{p:0,backgroundColor:m=>m.palette.mode==="dark"?be(m.palette.neutral[25],.02):"neutral.25"},children:[e.jsx(ie,{color:"secondary",autoFocus:!0,size:"large",fullWidth:!0,onClick:y,children:"Đóng"}),e.jsx(ie,{color:"primary",autoFocus:!0,size:"large",fullWidth:!0,onClick:y,children:"Gán quyền"})]})]})})},xn=({onSelect:t,setOpenAuthorizeChatbotQuery:o})=>{const{t:r}=xe(),[d,i]=a.useState(null),u=!!d,b=y=>{t(),i(y.currentTarget)},f=()=>{i(null)},x=()=>{f()},h=()=>{f(),o(!0)};return e.jsxs(w,{children:[e.jsx(ae,{color:"primary","aria-label":"more","aria-controls":"bot-menu","aria-haspopup":"true",onClick:b,children:e.jsx(qt,{})}),e.jsxs(Kt,{id:"bot-menu",anchorEl:d,open:u,onClose:f,children:[e.jsx(Ie,{onClick:h,children:r("Gán người dùng cho bot")}),e.jsx(Ie,{onClick:x,children:r("Xem chi tiết")}),e.jsx(Ie,{onClick:f,children:r("Xóa")})]})]})},fn=A(jt)(({theme:t})=>`

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
  `),qe=({bots:t,fetchData:o,totalCount:r})=>{const[d,i]=a.useState({}),[u,b]=a.useState([]),[f,x]=a.useState([]),{t:h}=xe(),y=ce(),I=yt(y.breakpoints.up("md")),[S,m]=a.useState(0),[z,B]=a.useState(15),[k,G]=a.useState(""),[W,de]=a.useState(""),[T,V]=a.useState({knowId:null});ke(n=>n.common.loading);const Y=ke(n=>n.common.refresh),O=Yt(),X=Qt(),{knowledges:N}=ke(n=>n.knowledge),[L,ee]=a.useState(!1),ge=n=>e.jsx(ot,{style:{maxWidth:"80%"},color:"info",label:n}),$=(n,c)=>{let v=null;c!=="all"&&(v=c),V(R=>({...R,knowId:v})),b([])},P=n=>{const c=n.target.value;V(v=>({...v,knowId:c==="all"?null:c})),b([])},Q=n=>{b(n.target.checked?t.map(c=>c.botId):[])},te=(n,c)=>{u.includes(c)?b(v=>v.filter(R=>R!==c)):b(v=>[...v,c])},re=u.length>0,se=u.length>0&&u.length<t.length,J=u.length===t.length,[E,H]=a.useState("grid_view"),Re=(n,c)=>{H(c)};a.useEffect(()=>{const n=async()=>{try{const c=t.reduce((R,Se)=>(R[Se.knowId]=(R[Se.knowId]||0)+1,R),{}),v=[{value:"all",label:h("All bots"),count:t.length},...N==null?void 0:N.map(R=>({value:R.knowId,label:h(R.knowName),count:c[R.knowId]}))];x(v)}catch(c){console.error("Error fetching knowledge data:",c)}};t.length&&N&&n()},[t,N]);const We=(n,c)=>{m(c),o({pageNumber:c,pageSize:z},T)},me=n=>{B(parseInt(n.target.value)),o({pageNumber:S,pageSize:parseInt(n.target.value)},T)},U=bo(async n=>{ve({search:n})},900),ve=n=>{let c={...T,...n};for(const v in c)(c[v]===""||c[v]===void 0)&&delete c[v];if(V({...c,accent:$e(c.search)}),o&&T){X(Te(!0));const v=it.stringify({...c,accent:$e(c==null?void 0:c.search)});o({pageNumber:S,pageSize:z},v).finally(()=>X(Te(!1)))}return c},ye=async()=>{if(o&&T){X(Te(!0));const n=it.stringify({...T,accent:$e(T==null?void 0:T.search)});o({pageNumber:S,pageSize:z},n).finally(()=>X(Te(!1)))}};return a.useEffect(()=>{o({pageNumber:S,pageSize:z})},[Y]),e.jsxs(e.Fragment,{children:[I?e.jsx(hn,{sx:{"& .MuiTab-root":{flexDirection:"row",pr:1,"& .MuiChip-root":{ml:1,transition:y.transitions.create(["background","color"],{duration:y.transitions.duration.complex})},"&.Mui-selected":{"& .MuiChip-root":{backgroundColor:be(y.palette.primary.contrastText,.12),color:"primary.contrastText"}},"&:first-child":{ml:0}}},onChange:$,scrollButtons:"auto",textColor:"secondary",value:T.knowId||"all",variant:"scrollable",children:f.map(n=>e.jsx(Eo,{value:n.value,label:e.jsxs(e.Fragment,{children:[n.label,e.jsx(ot,{label:n.count,size:"small"})]})},n.value))}):e.jsx(Jt,{value:T.knowId||"all",onChange:P,fullWidth:!0,children:f.map(n=>e.jsx(Ie,{value:n.value,children:n.label},n.value))}),e.jsxs(w,{display:"flex",justifyContent:"space-between",alignItems:"center",py:2,children:[e.jsxs(w,{display:"flex",alignItems:"center",width:"100%",children:[E==="grid_view"&&e.jsx(pe,{arrow:!0,placement:"top",title:h("Select all bots"),children:e.jsx(we,{edge:"start",sx:{mr:1},disabled:t.length===0,checked:J,indeterminate:se,onChange:Q})}),re?e.jsxs(nt,{direction:"row",spacing:1,children:[e.jsx(Zt,{}),e.jsx(pe,{arrow:!0,placement:"top",title:h("Export bot list"),children:e.jsx(eo,{variant:"outlined",color:"secondary",sx:{color:"primary.main"},size:"small",startIcon:e.jsx(to,{fontSize:"small"})})})]}):e.jsxs(nt,{direction:"row",gap:"10px",width:"100%",children:[e.jsx(w,{width:{xs:"100%",md:"50%"},children:e.jsx(oo,{margin:"none",fullWidth:!0,InputProps:{startAdornment:e.jsx(Le,{position:"start",children:e.jsx(St,{})}),endAdornment:W&&e.jsx(Le,{position:"end",children:e.jsx(ae,{color:"error","aria-label":"clear input",onClick:()=>de(""),edge:"end",size:"small",sx:{color:"error.main"},children:e.jsx(no,{fontSize:"small"})})})},onChange:n=>{U(n.target.value),G(n.target.value)},placeholder:h("Tên bot"),value:k,size:"small",variant:"outlined"})}),e.jsx(ie,{variant:"contained",color:"primary",size:"small",sx:{whiteSpace:"nowrap"},onClick:ye,children:"Tìm kiếm"})]})]}),e.jsxs(ro,{sx:{ml:1},size:"large",color:"primary",value:E,exclusive:!0,onChange:Re,children:[e.jsx(rt,{value:"table_view",children:e.jsx(so,{})}),e.jsx(rt,{value:"grid_view",children:e.jsx(lo,{})})]})]}),t.length===0?e.jsx(e.Fragment,{children:e.jsxs(w,{sx:{minHeight:"50vh"},display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",children:[" ",e.jsx("img",{style:{width:"200px"},src:"/src/assets/images/all-img/empty-data.png"}),e.jsx(F,{variant:"h6",color:"text.secondary",align:"center",fontWeight:500,children:h("Không có dữ liệu bot")})]})}):e.jsxs(e.Fragment,{children:[E==="table_view"&&e.jsx(e.Fragment,{children:e.jsx(jt,{children:e.jsx(ao,{children:e.jsxs(io,{children:[e.jsx(co,{children:e.jsxs(st,{children:[e.jsx(_,{padding:"checkbox",children:e.jsx(we,{checked:J,indeterminate:se,onChange:Q})}),e.jsx(_,{children:h("Tên bot")}),e.jsx(_,{children:h("Số lượng người dùng")}),e.jsx(_,{children:h("Lĩnh vực")}),e.jsx(_,{align:"center",children:h("Mô tả")}),e.jsx(_,{align:"center",children:h("Hành động")})]})}),e.jsx(uo,{children:t.map(n=>{const c=u.includes(n.botId);return e.jsxs(st,{hover:!0,selected:c,children:[e.jsx(_,{padding:"checkbox",children:e.jsx(we,{checked:c,onChange:v=>te(v,n.botId),value:c})}),e.jsx(_,{children:e.jsxs(w,{display:"flex",alignItems:"center",children:[e.jsx(Fe,{variant:"rounded",sx:{mr:1},src:n.avatar}),e.jsx(w,{children:e.jsx(lt,{variant:"subtitle1",fontWeight:500,href:"",onClick:()=>O.push(`/chatbot/${n.botId}`),underline:"hover",children:n.botName})})]})}),e.jsx(_,{children:"0"}),e.jsx(_,{children:ge(n.botStatus)}),e.jsx(_,{children:e.jsx(F,{fontWeight:600,children:n.botDescription})}),e.jsx(_,{align:"center",children:e.jsxs(F,{noWrap:!0,children:[e.jsx(pe,{title:h("Gán người dùng cho bot"),arrow:!0,children:e.jsx(ae,{onClick:()=>{i(n),ee(!0)},color:"secondary",children:e.jsx(Tt,{fontSize:"small"})})}),e.jsx(pe,{title:h("View"),arrow:!0,children:e.jsx(ae,{color:"secondary",children:e.jsx(To,{fontSize:"small"})})}),e.jsx(pe,{title:h("Delete"),arrow:!0,children:e.jsx(ae,{color:"secondary",children:e.jsx(ho,{fontSize:"small"})})})]})})]},n.id)})})]})})})}),E==="grid_view"&&e.jsxs(e.Fragment,{children:[t.length===0?e.jsx(F,{sx:{py:{xs:2,sm:3,md:6,lg:10}},variant:"h3",color:"text.secondary",align:"center",children:h("Không có dữ liệu bot")}):e.jsx(e.Fragment,{children:e.jsx(at,{container:!0,spacing:{xs:2,sm:3},children:t.map(n=>{const c=u.includes(n.botId);return e.jsx(at,{xs:12,sm:6,lg:4,children:e.jsx(fn,{className:K({"Mui-selected":c}),children:e.jsxs(w,{sx:{position:"relative",zIndex:"2"},children:[e.jsxs(w,{px:2,pt:2,display:"flex",alignItems:"flex-start",justifyContent:"space-between",children:[ge(n.botStatus),e.jsx(xn,{onSelect:()=>i(n),setOpenAuthorizeChatbotQuery:ee})]}),e.jsxs(w,{p:2,display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"flex-start",children:[e.jsx(Fe,{variant:"rounded",sx:{width:50,height:50,mr:1.5,mb:{xs:2,md:0}},src:n.avatar}),e.jsxs(w,{children:[e.jsxs(w,{children:[e.jsx(lt,{variant:"h6",href:"",onClick:v=>v.preventDefault(),underline:"hover",children:n.name})," ",e.jsx(F,{component:"span",variant:"body2",color:"text.secondary",children:n.botName})]}),e.jsx(F,{style:{height:44,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},sx:{pt:.3},variant:"subtitle2",children:n.botDescription})]})]}),e.jsx(vt,{}),e.jsxs(w,{pl:2,py:1,pr:1,display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(ie,{variant:"contained",onClick:()=>O.push(`/chatbot/${n.botId}`),endIcon:e.jsx(wo,{}),children:h("Xem chi tiết bot")}),e.jsx(we,{checked:c,onChange:v=>te(v,n.botId),value:c})]})]})})},n.botId)})})}),e.jsx(w,{pt:2,sx:{".MuiTablePagination-select":{py:.55}},children:e.jsx(po,{component:"div",count:r,onPageChange:We,onRowsPerPageChange:me,page:S,rowsPerPage:z,rowsPerPageOptions:[5,15,30,50],slotProps:{select:{variant:"outlined",size:"small",sx:{p:0}}}})})]}),!E&&e.jsx(w,{sx:{textAlign:"center",p:{xs:2,sm:3}},children:e.jsx(F,{align:"center",variant:"h4",color:"text.secondary",fontWeight:500,sx:{my:{xs:2,sm:3,md:5}},gutterBottom:!0,children:h("Choose between table or grid views for displaying the bots list.")})}),e.jsx(bn,{botName:d==null?void 0:d.botName,open:L,setOpen:ee})]})]})};qe.propTypes={bots:Gt.array.isRequired};qe.defaultProps={bots:[]};const Cn=()=>{const t=ce(),{t:o}=xe(),r=xo();fo();const[d,i]=a.useState([]),[u,b]=a.useState(!1),[f,x]=a.useState(0),h=ke(m=>m.auth.admin),y=()=>{b(!0)},I=()=>{b(!1)},S=a.useCallback(async(m,z)=>{try{const B=await go.getBotsByCustomer({customerId:h.customerId,pagination:{pageNumber:m.pageNumber,pageSize:m.pageSize},filter:z});r()&&(i(B.content),x(B.totalElements))}catch(B){console.error(B)}},[r]);return e.jsxs(e.Fragment,{children:[e.jsx(w,{px:{xs:2,sm:3},pt:{xs:2,sm:3},component:"main",flex:1,display:"flex",flexDirection:"column",children:e.jsxs(mo,{disableGutters:!0,maxWidth:"xl",children:[e.jsx(w,{pb:{xs:2,sm:3},children:e.jsx(vo,{sx:{px:0},title:o("Chatbot"),description:o("Quản lý chatbot"),actions:e.jsx(e.Fragment,{children:e.jsx(ie,{sx:{mt:{xs:2,md:0}},variant:"contained",onClick:y,startIcon:e.jsx(yo,{fontSize:"small"}),children:o("Tạo bot")})}),iconBox:e.jsx(So,{isSoft:!0,variant:"rounded",state:"primary",sx:{height:t.spacing(7),width:t.spacing(7),svg:{height:t.spacing(4),width:t.spacing(4),minWidth:t.spacing(4)}},children:e.jsx(wt,{})})})}),e.jsx(qe,{bots:d,totalCount:f,fetchData:S})]})}),e.jsx(Co,{open:u,onClose:I,onUpdate:S})]})};export{Cn as default};
