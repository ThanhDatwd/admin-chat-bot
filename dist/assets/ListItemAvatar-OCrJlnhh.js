import{aq as x,ap as u,K as I,at as o,r as n,au as p,av as v,bE as g,j as L,ae as f,aw as A}from"./index-8egQHEDr.js";function d(t){return x("MuiListItemAvatar",t)}u("MuiListItemAvatar",["root","alignItemsFlexStart"]);const C=["className"],S=t=>{const{alignItems:s,classes:e}=t;return A({root:["root",s==="flex-start"&&"alignItemsFlexStart"]},d,e)},h=I("div",{name:"MuiListItemAvatar",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:e}=t;return[s.root,e.alignItems==="flex-start"&&s.alignItemsFlexStart]}})(({ownerState:t})=>o({minWidth:56,flexShrink:0},t.alignItems==="flex-start"&&{marginTop:8})),R=n.forwardRef(function(s,e){const a=p({props:s,name:"MuiListItemAvatar"}),{className:i}=a,l=v(a,C),m=n.useContext(g),r=o({},a,{alignItems:m.alignItems}),c=S(r);return L.jsx(h,o({className:f(c.root,i),ownerState:r,ref:e},l))}),w=R;export{w as L};
