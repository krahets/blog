import{H as E,$ as H,_ as N,f as R,u as q,i as v,m as D,n as z,p as A,R as V,o as l,g as c,w as m,a as P,b as W,l as j,v as O,h as o,s as L,x as S,q as M,T as U,j as Y,S as G}from"./app.ff9190fc.js";import{A as I,P as J}from"./Page.d3afe9cd.js";import{u as K,C as Q}from"./Common.112367c3.js";import{P as X}from"./Pager.5ebe9404.js";import"./resolveTime.9c934659.js";const x=({headers:k,activeLink:n})=>{const r=E();return H("ul",{class:{catalog:!0}},k.map(a=>H("li",{class:{active:n===a.slug,[`level-${a.level}`]:!0,[`toc-link-${a.slug}`]:!0},key:a.title,onClick:()=>{r.currentRoute.value.hash!==`#${a.slug}`&&r.push(`#${a.slug}`)}},a.title)))};x.displayName="Catalog";x.props={headers:{type:Object,required:!0},activeLink:{type:String,default:""}};const Z=R({__name:"Post",setup(k){const n=Y(),r=q(),a=E(),_=G(),$=_.resolve,b=_.pending,i=K(),F=v(()=>i.value?n.value.headers:[]),w=t=>t.children.length>0?[t].concat(...t.children.map(w)):t,u=v(()=>[].concat(...F.value.map(w))),e=D({headerHeight:0,screenWidth:0,catalogTop:0,activeLink:"",isFixed:!1}),p=40,y=80,d=()=>{for(let s=u.value.length-1;s>=0;s--){const C=u.value[s].slug,B=document.querySelector(`#${C}`);if((B?B.getBoundingClientRect().top:0)<=100){e.activeLink=C;break}}window.pageYOffset>e.headerHeight+p-y?(e.isFixed=!0,e.catalogTop=y):(e.isFixed=!1,e.catalogTop=e.headerHeight+p)},g=()=>{const t=document.querySelector(".post-header");e.headerHeight=t?t.offsetHeight:0,e.screenWidth=document.body.clientWidth,e.catalogTop=e.headerHeight+p};let T;z(()=>{window.addEventListener("scroll",d),g(),window.onresize=()=>(()=>{g(),d()})(),T=a.afterEach(()=>{g()})}),A(()=>{window.removeEventListener("scroll",d),T()});const{post:f}=V(),h=v(()=>{if(!f.value)return{};const t=f.value.info.next;t&&(t.text=r.value.postNext);const s=f.value.info.prev;return s&&(s.text=r.value.postPrev),{next:t,prev:s}});return(t,s)=>(l(),c(Q,null,{page:m(()=>[P(U,{name:"fade-slide-y",mode:"out-in",onBeforeEnter:o($),onBeforeLeave:o(b)},{default:m(()=>[W("div",{class:S(["post-wrapper",{"show-catalog":o(i)}])},[j(P(I,{class:"post-header"},null,512),[[O,o(n).title]]),(l(),c(J,{key:o(n).path,class:"post-content"},{bottom:m(()=>[o(h).next||o(h).prev?(l(),c(X,{key:0,data:o(h)},null,8,["data"])):L("",!0)]),_:1})),o(i)?(l(),c(o(x),{key:0,headers:o(u),"active-link":e.activeLink,class:S({fixed:e.isFixed}),style:M({top:`${e.catalogTop}px`})},null,8,["headers","active-link","class","style"])):L("",!0)],2)]),_:1},8,["onBeforeEnter","onBeforeLeave"])]),_:1}))}});var re=N(Z,[["__file","Post.vue"]]);export{re as default};
