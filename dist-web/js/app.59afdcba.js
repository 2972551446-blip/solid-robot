import{g as be,E as U,o as xe,s as ye,b as u,d as Y,p as x,_ as p,j as n,V as l,q as we,H as Ce,f as Ee,v as z,i as b,k as Ne,S as je,w as Fe,x as Se,e as _e,y as Be,X as Pe,z as ke,A as Te,B as Ae,D as y,F as h,G as He,J as ee,K as re,r as D,M as De,N as Oe,O as Re,P as ze,Q as Le,U as Ie,W as te,Y as B}from"./vendors.c35c1630.js";import{c as g,P as Ve,B as P,t as X,T as Me}from"./common.5d4d031f.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var We=`
/* H5 端隐藏 TabBar 空图标（只隐藏没有 src 的图标） */
.weui-tabbar__icon:not([src]),
.weui-tabbar__icon[src=''] {
  display: none !important;
}

.weui-tabbar__item:has(.weui-tabbar__icon:not([src])) .weui-tabbar__label,
.weui-tabbar__item:has(.weui-tabbar__icon[src='']) .weui-tabbar__label {
  margin-top: 0 !important;
}

/* Vite 错误覆盖层无法选择文本的问题 */
vite-error-overlay {
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-user-select: text !important;
}

vite-error-overlay::part(window) {
  max-width: 90vw;
  padding: 10px;
}

.taro_page {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* H5 导航栏页面自动添加顶部间距 */
body.h5-navbar-visible .taro_page {
  padding-top: 44px;
}

body.h5-navbar-visible .toaster[data-position^="top"] {
  top: 44px !important;
}

/* Sheet 组件在 H5 导航栏下的位置修正 */
body.h5-navbar-visible .sheet-content:not([data-side="bottom"]) {
    top: 44px !important;
}

/*
 * H5 端 rem 适配：与小程序 rpx 缩放一致
 * 375px 屏幕：1rem = 16px，小程序 32rpx = 16px
 */
html {
    font-size: 4vw !important;
}

/* H5 端组件默认样式修复 */
taro-view-core {
    display: block;
}

taro-text-core {
    display: inline;
}

taro-input-core {
    display: block;
    width: 100%;
}

taro-input-core input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
}

taro-input-core.taro-otp-hidden-input input {
    color: transparent;
    caret-color: transparent;
    -webkit-text-fill-color: transparent;
}

/* 全局按钮样式重置 */
taro-button-core,
button {
    margin: 0 !important;
    padding: 0 !important;
    line-height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}

taro-button-core::after,
button::after {
    border: none;
}

taro-textarea-core > textarea,
.taro-textarea,
textarea.taro-textarea {
    resize: none !important;
}
`,$e=`
/* PC 宽屏适配 - 基础布局 */
@media (min-width: 769px) {
  html {
    font-size: 15px !important;
  }

  body {
    background-color: #f3f4f6 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 100vh !important;
  }
}
`,Ue=`
/* PC 宽屏适配 - 手机框样式（有 TabBar 页面） */
@media (min-width: 769px) {
  .taro-tabbar__container {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    transform: translateX(0) !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
  }

  .taro-tabbar__panel {
    height: 100% !important;
    overflow: auto !important;
  }
}

/* PC 宽屏适配 - Toast 定位到手机框范围内 */
@media (min-width: 769px) {
  body .toaster {
    left: 50% !important;
    right: auto !important;
    width: 375px !important;
    max-width: 375px !important;
    transform: translateX(-50%) !important;
    box-sizing: border-box !important;
  }
}

/* PC 宽屏适配 - 手机框样式（无 TabBar 页面，通过 JS 添加 no-tabbar 类） */
@media (min-width: 769px) {
  body.no-tabbar #app {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
    transform: translateX(0) !important;
  }

  body.no-tabbar #app .taro_router {
    height: 100% !important;
    overflow: auto !important;
  }
}
`;function Ye(){var a=document.createElement("style");a.innerHTML=We+$e+Ue,document.head.appendChild(a)}function Xe(){var a=function(){var t=!!document.querySelector(".taro-tabbar__container");document.body.classList.toggle("no-tabbar",!t)};a();var e=new MutationObserver(a);e.observe(document.body,{childList:!0,subtree:!0})}function Ge(){Ye(),Xe()}function qe(){var a=be();if(a===U.WEAPP||a===U.TT)try{var e=xe(),r=e.miniProgram.envVersion;console.log("[Debug] envVersion:",r),r!=="release"&&ye({enableDebug:!0})}catch(t){console.error("[Debug] 开启调试模式失败:",t)}}var Je={visible:!1,title:"",bgColor:"#ffffff",textStyle:"black",navStyle:"default",transparent:"none",leftIcon:"none"},Ke=function(){var e,r=z();return(r==null||(e=r.config)===null||e===void 0?void 0:e.window)||{}},Qe=function(){var e,r,t=(e=z())===null||e===void 0||(e=e.config)===null||e===void 0?void 0:e.tabBar;return new Set((t==null||(r=t.list)===null||r===void 0?void 0:r.map(function(o){return o.pagePath}))||[])},G=function(){var e,r=z();return(r==null||(e=r.config)===null||e===void 0||(e=e.pages)===null||e===void 0?void 0:e[0])||"pages/index/index"},T=function(e){return e.replace(/^\//,"")},Ze=function(e,r,t,o){if(!e)return"none";var i=T(e),s=T(o),v=i===s,c=r.has(i)||r.has("/".concat(i)),f=t>1;return c||v?"none":f?"back":"home"},er=function(){var e=u.useState(Je),r=Y(e,2),t=r[0],o=r[1],i=u.useState(0),s=Y(i,2),v=s[0],c=s[1],f=u.useCallback(function(){var d=x.getCurrentPages();if(d.length===0){o(function(ge){return p(p({},ge),{},{visible:!1})});return}var m=d[d.length-1],M=(m==null?void 0:m.route)||"";if(M){var w=(m==null?void 0:m.config)||{},C=Ke(),S=Qe(),me=G(),_=T(M),W=T(me),he=_===W,ve=S.has(_)||S.has("/".concat(_)),$=S.size<=1&&d.length<=1&&(he||ve);o({visible:!$,title:document.title||w.navigationBarTitleText||C.navigationBarTitleText||"",bgColor:w.navigationBarBackgroundColor||C.navigationBarBackgroundColor||"#ffffff",textStyle:w.navigationBarTextStyle||C.navigationBarTextStyle||"black",navStyle:w.navigationStyle||C.navigationStyle||"default",transparent:w.transparentTitle||C.transparentTitle||"none",leftIcon:$?"none":Ze(_,S,d.length,W)})}},[]);x.useDidShow(function(){f()}),x.usePageScroll(function(d){var m=d.scrollTop;t.transparent==="auto"&&c(Math.min(m/100,1))}),u.useEffect(function(){var d=null,m=new MutationObserver(function(){d&&clearTimeout(d),d=setTimeout(function(){f()},50)});return m.observe(document.head,{subtree:!0,childList:!0,characterData:!0}),f(),function(){m.disconnect(),d&&clearTimeout(d)}},[f]);var H=t.visible&&t.navStyle!=="custom";if(u.useEffect(function(){H?document.body.classList.add("h5-navbar-visible"):document.body.classList.remove("h5-navbar-visible")},[H]),!H)return n.jsx(n.Fragment,{});var V=t.textStyle==="white"?"#fff":"#333",ue=t.textStyle==="white"?"text-white":"text-gray-800",de=function(){return t.transparent==="always"?{backgroundColor:"transparent"}:t.transparent==="auto"?{backgroundColor:t.bgColor,opacity:v}:{backgroundColor:t.bgColor}},pe=function(){return x.navigateBack()},fe=function(){var m=G();x.reLaunch({url:"/".concat(m)})};return n.jsxs(n.Fragment,{children:[n.jsxs(l,{className:"fixed top-0 left-0 right-0 h-11 flex items-center justify-center z-1000",style:de(),children:[t.leftIcon==="back"&&n.jsx(l,{className:"absolute left-2 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center",onClick:pe,children:n.jsx(we,{size:24,color:V})}),t.leftIcon==="home"&&n.jsx(l,{className:"absolute left-2 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center",onClick:fe,children:n.jsx(Ce,{size:22,color:V})}),n.jsx(Ee,{className:"text-base font-medium max-w-3/5 truncate ".concat(ue),children:t.title})]}),n.jsx(l,{className:"h-11 shrink-0"})]})},rr=function(e){var r=e.children;return n.jsxs(n.Fragment,{children:[n.jsx(er,{}),r]})},tr=["className","variant"],nr=Ne("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary hover:bg-opacity-80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary hover:bg-opacity-80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive hover:bg-opacity-80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function O(a){var e=a.className,r=a.variant,t=b(a,tr);return n.jsx(l,p({className:g(nr({variant:r}),e)},t))}var ar=["className","children"],or=["className"],ir=["className"],sr=["className"],lr=["className"],cr=["className"],L=u.createContext({hasHeader:!1}),ne=u.forwardRef(function(a,e){var r=a.className,t=a.children,o=b(a,ar),i=u.Children.toArray(t).some(function(s){return u.isValidElement(s)&&s.type.displayName==="CardHeader"});return n.jsx(L.Provider,{value:{hasHeader:i},children:n.jsx(l,p(p({ref:e,className:g("rounded-lg border bg-card text-card-foreground shadow-sm",r)},o),{},{children:t}))})});ne.displayName="Card";var ae=u.forwardRef(function(a,e){var r=a.className,t=b(a,or);return n.jsx(l,p({ref:e,className:g("flex flex-col space-y-2 p-6",r)},t))});ae.displayName="CardHeader";var oe=u.forwardRef(function(a,e){var r=a.className,t=b(a,ir);return n.jsx(l,p({ref:e,className:g("text-2xl font-semibold leading-none tracking-tight",r)},t))});oe.displayName="CardTitle";var ur=u.forwardRef(function(a,e){var r=a.className,t=b(a,sr);return n.jsx(l,p({ref:e,className:g("text-sm text-muted-foreground",r)},t))});ur.displayName="CardDescription";var ie=u.forwardRef(function(a,e){var r=a.className,t=b(a,lr),o=u.useContext(L),i=o.hasHeader;return n.jsx(l,p({ref:e,className:g("p-6",i&&"pt-0",r)},t))});ie.displayName="CardContent";var dr=u.forwardRef(function(a,e){var r=a.className,t=b(a,cr),o=u.useContext(L),i=o.hasHeader;return n.jsx(l,p({ref:e,className:g("flex items-center p-6",i&&"pt-0",r)},t))});dr.displayName="CardFooter";var pr=["className","children","orientation"],se=u.forwardRef(function(a,e){var r=a.className,t=a.children,o=a.orientation,i=o===void 0?"vertical":o,s=b(a,pr),v=i==="horizontal"||i==="both",c=i==="vertical"||i==="both";return n.jsx(je,p(p({ref:e,className:g("relative",r),scrollY:c,scrollX:v,style:{overflowX:v?"auto":"hidden",overflowY:c?"auto":"hidden"}},s),{},{children:t}))});se.displayName="ScrollArea";var fr={error:null,report:"",source:"",visible:!1,open:!1,timestamp:""},q="hsl(360, 100%, 45%)",J=!1,A=fr,R=new Set,mr=function(){R.forEach(function(e){return e()})},hr=function(e){return R.add(e),function(){return R.delete(e)}},K=function(){return A},le=function(e){A=e,mr()},vr=function(){var a=y(h().m(function e(r){var t,o,i,s,v;return h().w(function(c){for(;;)switch(c.p=c.n){case 0:if(typeof window!="undefined"){c.n=1;break}return c.a(2,!1);case 1:if(c.p=1,!((t=navigator.clipboard)!==null&&t!==void 0&&t.writeText)){c.n=3;break}return c.n=2,navigator.clipboard.writeText(r);case 2:return c.a(2,!0);case 3:c.n=5;break;case 4:c.p=4,s=c.v,console.warn("[H5ErrorBoundary] Clipboard API copy failed:",s);case 5:return c.p=5,o=document.createElement("textarea"),o.value=r,o.setAttribute("readonly","true"),o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),i=document.execCommand("copy"),document.body.removeChild(o),c.a(2,i);case 6:return c.p=6,v=c.v,console.warn("[H5ErrorBoundary] Fallback copy failed:",v),c.a(2,!1)}},e,null,[[5,6],[1,4]])}));return function(r){return a.apply(this,arguments)}}(),gr=function(e){if(e instanceof Error)return e;if(typeof e=="string")return new Error(e);try{return new Error(JSON.stringify(e))}catch(r){return new Error(String(e))}},br=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=["[H5 Runtime Error]","Time: ".concat(new Date().toISOString()),r.source?"Source: ".concat(r.source):"","Name: ".concat(e.name),"Message: ".concat(e.message),e.stack?`Stack:
`.concat(e.stack):"",r.componentStack?`Component Stack:
`.concat(r.componentStack):"",typeof navigator!="undefined"?"User Agent: ".concat(navigator.userAgent):""].filter(Boolean);return t.join(`

`)},Q=function(e){A.visible&&le(p(p({},A),{},{open:e}))},I=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(typeof window!="undefined"){var t=gr(e),o=br(t,r),i=new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"});le({error:t,report:o,source:r.source||"runtime",timestamp:i,visible:!0,open:!1}),console.error("[H5ErrorOverlay] Showing error overlay:",t,r)}},xr=function(e){var r=e.error||new Error(e.message||"Unknown H5 runtime error");I(r,{source:"window.error"})},yr=function(e){I(e.reason,{source:"window.unhandledrejection"})},wr=function(){typeof window=="undefined"||J||(J=!0,window.addEventListener("error",xr),window.addEventListener("unhandledrejection",yr))},Cr=function(){var e,r,t=u.useSyncExternalStore(hr,K,K);if(!t.visible)return null;var o=((e=t.error)===null||e===void 0?void 0:e.name)||"Error";return n.jsx(Ve,{children:n.jsxs(l,{className:"pointer-events-none fixed inset-0 z-[2147483646]",children:[n.jsx(l,{className:"pointer-events-auto fixed bottom-5 left-5",children:n.jsx(P,{variant:"outline",size:"icon",className:g("h-11 w-11 rounded-full shadow-md transition-transform"),style:{backgroundColor:"hsl(359, 100%, 97%)",borderColor:"hsl(359, 100%, 94%)",color:q},onClick:function(){return Q(!t.open)},children:n.jsx(_e,{size:22,color:q})})}),t.open&&n.jsx(l,{className:"pointer-events-none fixed inset-0 bg-white bg-opacity-15 supports-[backdrop-filter]:backdrop-blur-md",children:n.jsx(l,{className:"absolute inset-0 flex items-center justify-center px-4 py-4",children:n.jsx(l,{className:"w-full max-w-md",style:{width:"min(calc(100vw - 32px), var(--h5-phone-width, 390px))",height:"min(calc(100vh - 32px), 900px)"},children:n.jsx(ne,{className:g("pointer-events-auto h-full rounded-2xl border border-border bg-background text-foreground shadow-2xl"),children:n.jsxs(l,{className:"relative flex h-full flex-col",children:[n.jsxs(ae,{className:"gap-2 p-4 pb-2",children:[n.jsxs(l,{className:"flex items-start justify-between gap-3",children:[n.jsxs(l,{className:"flex flex-wrap items-center gap-2",children:[n.jsx(O,{variant:"destructive",className:"border-none bg-red-500 px-3 py-1 text-xs font-medium text-white",children:"Runtime Error"}),n.jsx(O,{variant:"outline",className:"px-3 py-1 text-xs",children:t.source})]}),n.jsxs(l,{className:"flex shrink-0 items-center gap-1",children:[n.jsx(P,{variant:"ghost",size:"icon",className:"h-8 w-8 rounded-full",onClick:function(){return window.location.reload()},children:n.jsx(Be,{size:15,color:"inherit"})}),n.jsx(P,{variant:"ghost",size:"icon",className:"h-8 w-8 rounded-full",onClick:function(){return Q(!1)},children:n.jsx(Pe,{size:17,color:"inherit"})})]})]}),n.jsxs(l,{className:"flex items-center justify-between gap-3",children:[n.jsx(oe,{className:"text-left text-lg",children:o}),n.jsxs(P,{variant:"outline",size:"sm",className:"shrink-0 rounded-lg",onClick:function(){var i=y(h().m(function v(){var c;return h().w(function(f){for(;;)switch(f.n){case 0:return f.n=1,vr(t.report);case 1:if(c=f.v,!c){f.n=2;break}return X.success("已复制错误信息",{description:"可发送给 Agent 进行自动修复",position:"top-center"}),f.a(2);case 2:X.warning("复制失败",{description:"请直接选中文本后手动复制。",position:"top-center"});case 3:return f.a(2)}},v)}));function s(){return i.apply(this,arguments)}return s}(),children:[n.jsx(ke,{size:15,color:"inherit"}),n.jsx(l,{children:"复制错误"})]})]})]}),n.jsx(ie,{className:"min-h-0 flex-1 overflow-hidden px-4 pb-4 pt-2",children:n.jsxs(l,{className:"flex h-full min-h-0 flex-col gap-2",children:[n.jsxs(l,{className:"flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border px-3 py-2 text-sm",children:[n.jsxs(l,{className:"flex items-center gap-2",children:[n.jsx(l,{className:"text-muted-foreground",children:"Error"}),n.jsx(l,{className:"font-medium text-foreground",children:((r=t.error)===null||r===void 0?void 0:r.name)||"Error"})]}),n.jsx(l,{className:"h-4 w-px bg-border"}),n.jsxs(l,{className:"flex items-center gap-2",children:[n.jsx(l,{className:"text-muted-foreground",children:"Source"}),n.jsx(l,{className:"font-medium text-foreground",children:t.source})]})]}),n.jsxs(l,{className:"min-h-0 flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-black text-white",children:[n.jsxs(l,{className:"flex items-center justify-between border-b border-white border-opacity-10 px-3 py-3",children:[n.jsx(l,{className:"text-xs font-medium uppercase tracking-wide text-zinc-400",children:"Full Report"}),n.jsx(O,{variant:"outline",className:"border-zinc-700 bg-transparent px-2 py-1 text-xs text-zinc-400",children:t.timestamp})]}),n.jsx(se,{className:"min-h-0 flex-1 w-full",orientation:"both",children:n.jsx(l,{className:"inline-block min-w-full whitespace-pre px-3 py-3 pb-8 font-mono text-xs leading-6 text-zinc-200",children:t.report})})]})]})})]})})})})})]})})},Er=function(a){function e(){var r;Te(this,e);for(var t=arguments.length,o=new Array(t),i=0;i<t;i++)o[i]=arguments[i];return r=Ae(this,e,[].concat(o)),r.state={error:null},r}return Fe(e,a),Se(e,[{key:"componentDidUpdate",value:function(t){this.state.error&&t.children!==this.props.children&&this.setState({error:null})}},{key:"componentDidCatch",value:function(t,o){I(t,{source:"React Error Boundary",componentStack:o.componentStack||""})}},{key:"render",value:function(){return n.jsxs(n.Fragment,{children:[n.jsx(Cr,{}),this.state.error?null:this.props.children]})}}],[{key:"getDerivedStateFromError",value:function(t){return{error:t}}}])}(u.Component),Nr=function(e){var r=e.children;return n.jsx(Er,{children:r})},jr=function(e){var r=e.children;return wr(),x.useLaunch(function(){qe(),Ge()}),n.jsx(Nr,{children:n.jsx(rr,{children:r})})},Fr=function(e){var r=e.children;return n.jsxs(He,{defaultColor:"#000",defaultSize:24,children:[n.jsx(jr,{children:r}),n.jsx(Me,{})]})},N=ee.__taroAppConfig={router:{mode:"hash"},pages:["pages/index/index","pages/statistics/index","pages/editors/index","pages/settings/index"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#ffffff",navigationBarTitleText:"剪辑师计数",navigationBarTextStyle:"black"},tabBar:{color:"#999999",selectedColor:"#2563eb",backgroundColor:"#ffffff",borderStyle:"black",list:[{pagePath:"pages/index/index",text:"录入",iconPath:"./assets/tabbar/file-text.png",selectedIconPath:"./assets/tabbar/file-text-active.png"},{pagePath:"pages/statistics/index",text:"统计",iconPath:"./assets/tabbar/chart-bar.png",selectedIconPath:"./assets/tabbar/chart-bar-active.png"},{pagePath:"pages/editors/index",text:"剪辑师",iconPath:"./assets/tabbar/users.png",selectedIconPath:"./assets/tabbar/users-active.png"},{pagePath:"pages/settings/index",text:"设置",iconPath:"./assets/tabbar/settings.png",selectedIconPath:"./assets/tabbar/settings-active.png"}]}},j=[],F=[];j[0]="/static/images/file-text.png";F[0]="/static/images/file-text-active.png";j[1]="/static/images/chart-bar.png";F[1]="/static/images/chart-bar-active.png";j[2]="/static/images/users.png";F[2]="/static/images/users-active.png";j[3]="/static/images/settings.png";F[3]="/static/images/settings-active.png";var Z=N.tabBar.list;for(var E=0;E<Z.length;E++){var k=Z[E];k.iconPath&&(k.iconPath=j[E]),k.selectedIconPath&&(k.selectedIconPath=F[E])}N.routes=[Object.assign({path:"pages/index/index",load:function(){var a=y(h().m(function r(t,o){var i;return h().w(function(s){for(;;)switch(s.n){case 0:return s.n=1,B(()=>import("./index.e30a5096.js"),["./index.e30a5096.js","./vendors.c35c1630.js","../css/vendors.8886af03.css","./common.5d4d031f.js"],import.meta.url);case 1:return i=s.v,s.a(2,[i,t,o])}},r)}));function e(r,t){return a.apply(this,arguments)}return e}()},{navigationBarTitleText:"首页"}),Object.assign({path:"pages/statistics/index",load:function(){var a=y(h().m(function r(t,o){var i;return h().w(function(s){for(;;)switch(s.n){case 0:return s.n=1,B(()=>import("./index.d1137459.js"),["./index.d1137459.js","./vendors.c35c1630.js","../css/vendors.8886af03.css","./common.5d4d031f.js"],import.meta.url);case 1:return i=s.v,s.a(2,[i,t,o])}},r)}));function e(r,t){return a.apply(this,arguments)}return e}()},{navigationBarTitleText:"统计"}),Object.assign({path:"pages/editors/index",load:function(){var a=y(h().m(function r(t,o){var i;return h().w(function(s){for(;;)switch(s.n){case 0:return s.n=1,B(()=>import("./index.6ea66cb2.js"),["./index.6ea66cb2.js","./vendors.c35c1630.js","../css/vendors.8886af03.css","./common.5d4d031f.js"],import.meta.url);case 1:return i=s.v,s.a(2,[i,t,o])}},r)}));function e(r,t){return a.apply(this,arguments)}return e}()},{navigationBarTitleText:"剪辑师"}),Object.assign({path:"pages/settings/index",load:function(){var a=y(h().m(function r(t,o){var i;return h().w(function(s){for(;;)switch(s.n){case 0:return s.n=1,B(()=>import("./index.0336a4bc.js"),["./index.0336a4bc.js","./vendors.c35c1630.js","../css/vendors.8886af03.css","./common.5d4d031f.js"],import.meta.url);case 1:return i=s.v,s.a(2,[i,t,o])}},r)}));function e(r,t){return a.apply(this,arguments)}return e}()},{navigationBarTitleText:"设置"})];Object.assign(re,{findDOMNode:D.findDOMNode,render:D.render,unstable_batchedUpdates:D.unstable_batchedUpdates});De();var Sr=Oe(Fr,te,re,N),ce=Re({window:ee});ze(N,ce);Le(ce,Sr,N,te);Ie({designWidth:750,deviceRatio:{375:2,640:1.17,750:1,828:.905},baseFontSize:20,unitPrecision:void 0,targetUnit:void 0});
