(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"9kvl":function(e,t,a){"use strict";a.d(t,"a",(function(){return n["b"]})),a.d(t,"b",(function(){return u}));var n=a("FfOG"),r=(a("bCY9"),a("tJVT")),l=a("q1tI"),c=a("aUsF"),o=a.n(c),i=a("qwGt");function u(e,t){var a=Object(l["useContext"])(i["a"]),n=Object(l["useRef"])(t);n.current=t;var c=Object(l["useState"])((()=>n.current?n.current(a.data[e]):a.data[e])),u=Object(r["a"])(c,2),d=u[0],s=u[1],m=Object(l["useRef"])(d);m.current=d;var f=Object(l["useRef"])(!1);return Object(l["useEffect"])((()=>(f.current=!0,()=>{f.current=!1})),[]),Object(l["useEffect"])((()=>{var r=r=>{if(f.current)if(t&&n.current){var l=n.current(r),c=m.current;o()(l,c)||s(l)}else s(r);else setTimeout((()=>{a.data[e]=r,a.update(e)}))};try{a.callbacks[e].add(r),a.update(e)}catch(l){a.callbacks[e]=new Set,a.callbacks[e].add(r),a.update(e)}return()=>{a.callbacks[e].delete(r)}}),[e]),d}},LjKy:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),l=a("dEAq"),c=a("Zxc8"),o=a("Rsk4"),i=r.a.memo(o["default"]["table-basic"].component),u=r.a.memo(o["default"]["table-usewithmodel"].component);t["default"]=e=>(r.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&l["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"markdown"},r.a.createElement("h1",{id:"editable-table"},r.a.createElement(l["AnchorLink"],{to:"#editable-table","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:"icon icon-link"})),"Editable Table"),r.a.createElement("h2",{id:"pro-table"},r.a.createElement(l["AnchorLink"],{to:"#pro-table","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:"icon icon-link"})),"Pro Table")),r.a.createElement(c["default"],o["default"]["table-basic"].previewerProps,r.a.createElement(i,null)),r.a.createElement("div",{className:"markdown"}),r.a.createElement(c["default"],o["default"]["table-usewithmodel"].previewerProps,r.a.createElement(u,null)),r.a.createElement("div",{className:"markdown"},r.a.createElement("h2",{id:"api"},r.a.createElement(l["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:"icon icon-link"})),"API"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Property"),r.a.createElement("th",null,"Description"),r.a.createElement("th",null,"Type"),r.a.createElement("th",null,"Default"),r.a.createElement("th",null,"Version"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null),r.a.createElement("td",null),r.a.createElement("td",null),r.a.createElement("td",null),r.a.createElement("td",null))))))))},RZMt:function(e,t,a){},Zxc8:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),l=a("k3GJ"),c=a("9kvl"),o=a("dEAq"),i=a("H1Ra");a("RZMt");function u(e,t){return b(e)||f(e,t)||s(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"===typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?m(e,t):void 0}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function f(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l=[],c=!0,o=!1;try{for(a=a.call(e);!(c=(n=a.next()).done);c=!0)if(l.push(n.value),t&&l.length===t)break}catch(i){o=!0,r=i}finally{try{c||null==a["return"]||a["return"]()}finally{if(o)throw r}}return l}}function b(e){if(Array.isArray(e))return e}function p(e,t){var a,n=null===(a=e.match(/\.(\w+)$/))||void 0===a?void 0:a[1];return n||(n=t.tsx?"tsx":"jsx"),n}var E=function(e){var t,a,d,s=Object(n["useRef"])(),m=Object(n["useContext"])(o["context"]),f=m.locale,b=Object(o["useLocaleProps"])(f,e),E=Object(o["useDemoUrl"])(b.identifier),v=b.demoUrl||E,h=(null===c["a"]||void 0===c["a"]?void 0:c["a"].location.hash)==="#".concat(b.identifier),_=1===Object.keys(b.sources).length,y=Object(o["useCodeSandbox"])((null===(t=b.hideActions)||void 0===t?void 0:t.includes("CSB"))?null:b),k=Object(o["useRiddle"])((null===(a=b.hideActions)||void 0===a?void 0:a.includes("RIDDLE"))?null:b),w=Object(o["useMotions"])(b.motions||[],s.current),j=u(w,2),O=j[0],g=j[1],N=Object(o["useCopy"])(),x=u(N,2),C=x[0],A=x[1],S=Object(n["useState"])("_"),R=u(S,2),I=R[0],L=R[1],T=Object(n["useState"])(p(I,b.sources[I])),P=u(T,2),M=P[0],q=P[1],U=Object(n["useState"])(Boolean(b.defaultShowCode)),D=u(U,2),J=D[0],F=D[1],G=Object(n["useState"])(Math.random()),Z=u(G,2),$=Z[0],B=Z[1],H=b.sources[I][M]||b.sources[I].content,K=Object(o["useTSPlaygroundUrl"])(f,H),V=Object(n["useRef"])(),X=Object(o["usePrefersColor"])(),Y=u(X,1),z=Y[0];function Q(e){L(e),q(p(e,b.sources[e]))}return Object(n["useEffect"])((function(){B(Math.random())}),[z]),r.a.createElement("div",{style:b.style,className:[b.className,"__dumi-default-previewer",h?"__dumi-default-previewer-target":""].filter(Boolean).join(" "),id:b.identifier,"data-debug":b.debug||void 0,"data-iframe":b.iframe||void 0},b.iframe&&r.a.createElement("div",{className:"__dumi-default-previewer-browser-nav"}),r.a.createElement("div",{ref:s,className:"__dumi-default-previewer-demo",style:{transform:b.transform?"translate(0, 0)":void 0,padding:b.compact||b.iframe&&!1!==b.compact?"0":void 0,background:b.background}},b.iframe?r.a.createElement("iframe",{title:"dumi-previewer",style:{height:String(b.iframe).replace(/(\d)$/,"$1px")},key:$,src:v,ref:V}):b.children),r.a.createElement("div",{className:"__dumi-default-previewer-desc","data-title":b.title},b.title&&r.a.createElement(o["AnchorLink"],{to:"#".concat(b.identifier)},b.title),b.description&&r.a.createElement("div",{dangerouslySetInnerHTML:{__html:b.description}})),r.a.createElement("div",{className:"__dumi-default-previewer-actions"},y&&r.a.createElement("button",{title:"Open demo on CodeSandbox.io",className:"__dumi-default-icon",role:"codesandbox",onClick:y}),k&&r.a.createElement("button",{title:"Open demo on Riddle",className:"__dumi-default-icon",role:"riddle",onClick:k}),b.motions&&r.a.createElement("button",{title:"Execute motions",className:"__dumi-default-icon",role:"motions",disabled:g,onClick:function(){return O()}}),b.iframe&&r.a.createElement("button",{title:"Reload demo iframe page",className:"__dumi-default-icon",role:"refresh",onClick:function(){return B(Math.random())}}),!(null===(d=b.hideActions)||void 0===d?void 0:d.includes("EXTERNAL"))&&r.a.createElement(o["Link"],{target:"_blank",to:v},r.a.createElement("button",{title:"Open demo in new tab",className:"__dumi-default-icon",role:"open-demo",type:"button"})),r.a.createElement("span",null),r.a.createElement("button",{title:"Copy source code",className:"__dumi-default-icon",role:"copy","data-status":A,onClick:function(){return C(H)}}),"tsx"===M&&J&&r.a.createElement(o["Link"],{target:"_blank",to:K},r.a.createElement("button",{title:"Get JSX via TypeScript Playground",className:"__dumi-default-icon",role:"change-tsx",type:"button"})),r.a.createElement("button",{title:"Toggle source code panel",className:"__dumi-default-icon".concat(J?" __dumi-default-btn-expand":""),role:"source",type:"button",onClick:function(){return F(!J)}})),J&&r.a.createElement("div",{className:"__dumi-default-previewer-source-wrapper"},!_&&r.a.createElement(l["b"],{className:"__dumi-default-previewer-source-tab",prefixCls:"__dumi-default-tabs",moreIcon:"\xb7\xb7\xb7",defaultActiveKey:I,onChange:Q},Object.keys(b.sources).map((function(e){return r.a.createElement(l["a"],{tab:"_"===e?"index.".concat(p(e,b.sources[e])):e,key:e})}))),r.a.createElement("div",{className:"__dumi-default-previewer-source"},r.a.createElement(i["a"],{code:H,lang:M,showCopy:!1}))))};t["default"]=E}}]);