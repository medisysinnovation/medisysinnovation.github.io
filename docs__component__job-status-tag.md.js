(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{"9kvl":function(e,t,a){"use strict";a.d(t,"a",(function(){return n["b"]})),a.d(t,"b",(function(){return u}));var n=a("FfOG"),r=(a("bCY9"),a("tJVT")),o=a("q1tI"),c=a("aUsF"),l=a.n(c),i=a("qwGt");function u(e,t){var a=Object(o["useContext"])(i["a"]),n=Object(o["useRef"])(t);n.current=t;var c=Object(o["useState"])((()=>n.current?n.current(a.data[e]):a.data[e])),u=Object(r["a"])(c,2),s=u[0],d=u[1],m=Object(o["useRef"])(s);m.current=s;var f=Object(o["useRef"])(!1);return Object(o["useEffect"])((()=>(f.current=!0,()=>{f.current=!1})),[]),Object(o["useEffect"])((()=>{var r=r=>{if(f.current)if(t&&n.current){var o=n.current(r),c=m.current;l()(o,c)||d(o)}else d(r);else setTimeout((()=>{a.data[e]=r,a.update(e)}))};try{a.callbacks[e].add(r),a.update(e)}catch(o){a.callbacks[e]=new Set,a.callbacks[e].add(r),a.update(e)}return()=>{a.callbacks[e].delete(r)}}),[e]),s}},RZMt:function(e,t,a){},Zxc8:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),o=a("k3GJ"),c=a("9kvl"),l=a("dEAq"),i=a("H1Ra");a("RZMt");function u(e,t){return b(e)||f(e,t)||d(e,t)||s()}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){if(e){if("string"===typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?m(e,t):void 0}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function f(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,o=[],c=!0,l=!1;try{for(a=a.call(e);!(c=(n=a.next()).done);c=!0)if(o.push(n.value),t&&o.length===t)break}catch(i){l=!0,r=i}finally{try{c||null==a["return"]||a["return"]()}finally{if(l)throw r}}return o}}function b(e){if(Array.isArray(e))return e}function p(e,t){var a,n=null===(a=e.match(/\.(\w+)$/))||void 0===a?void 0:a[1];return n||(n=t.tsx?"tsx":"jsx"),n}var v=function(e){var t,a,s,d=Object(n["useRef"])(),m=Object(n["useContext"])(l["context"]),f=m.locale,b=Object(l["useLocaleProps"])(f,e),v=Object(l["useDemoUrl"])(b.identifier),E=b.demoUrl||v,_=(null===c["a"]||void 0===c["a"]?void 0:c["a"].location.hash)==="#".concat(b.identifier),h=1===Object.keys(b.sources).length,y=Object(l["useCodeSandbox"])((null===(t=b.hideActions)||void 0===t?void 0:t.includes("CSB"))?null:b),j=Object(l["useRiddle"])((null===(a=b.hideActions)||void 0===a?void 0:a.includes("RIDDLE"))?null:b),g=Object(l["useMotions"])(b.motions||[],d.current),k=u(g,2),w=k[0],O=k[1],C=Object(l["useCopy"])(),N=u(C,2),S=N[0],x=N[1],A=Object(n["useState"])("_"),R=u(A,2),I=R[0],T=R[1],L=Object(n["useState"])(p(I,b.sources[I])),M=u(L,2),q=M[0],J=M[1],P=Object(n["useState"])(Boolean(b.defaultShowCode)),U=u(P,2),F=U[0],G=U[1],Z=Object(n["useState"])(Math.random()),$=u(Z,2),B=$[0],D=$[1],H=b.sources[I][q]||b.sources[I].content,X=Object(l["useTSPlaygroundUrl"])(f,H),K=Object(n["useRef"])(),V=Object(l["usePrefersColor"])(),Y=u(V,1),z=Y[0];function Q(e){T(e),J(p(e,b.sources[e]))}return Object(n["useEffect"])((function(){D(Math.random())}),[z]),r.a.createElement("div",{style:b.style,className:[b.className,"__dumi-default-previewer",_?"__dumi-default-previewer-target":""].filter(Boolean).join(" "),id:b.identifier,"data-debug":b.debug||void 0,"data-iframe":b.iframe||void 0},b.iframe&&r.a.createElement("div",{className:"__dumi-default-previewer-browser-nav"}),r.a.createElement("div",{ref:d,className:"__dumi-default-previewer-demo",style:{transform:b.transform?"translate(0, 0)":void 0,padding:b.compact||b.iframe&&!1!==b.compact?"0":void 0,background:b.background}},b.iframe?r.a.createElement("iframe",{title:"dumi-previewer",style:{height:String(b.iframe).replace(/(\d)$/,"$1px")},key:B,src:E,ref:K}):b.children),r.a.createElement("div",{className:"__dumi-default-previewer-desc","data-title":b.title},b.title&&r.a.createElement(l["AnchorLink"],{to:"#".concat(b.identifier)},b.title),b.description&&r.a.createElement("div",{dangerouslySetInnerHTML:{__html:b.description}})),r.a.createElement("div",{className:"__dumi-default-previewer-actions"},y&&r.a.createElement("button",{title:"Open demo on CodeSandbox.io",className:"__dumi-default-icon",role:"codesandbox",onClick:y}),j&&r.a.createElement("button",{title:"Open demo on Riddle",className:"__dumi-default-icon",role:"riddle",onClick:j}),b.motions&&r.a.createElement("button",{title:"Execute motions",className:"__dumi-default-icon",role:"motions",disabled:O,onClick:function(){return w()}}),b.iframe&&r.a.createElement("button",{title:"Reload demo iframe page",className:"__dumi-default-icon",role:"refresh",onClick:function(){return D(Math.random())}}),!(null===(s=b.hideActions)||void 0===s?void 0:s.includes("EXTERNAL"))&&r.a.createElement(l["Link"],{target:"_blank",to:E},r.a.createElement("button",{title:"Open demo in new tab",className:"__dumi-default-icon",role:"open-demo",type:"button"})),r.a.createElement("span",null),r.a.createElement("button",{title:"Copy source code",className:"__dumi-default-icon",role:"copy","data-status":x,onClick:function(){return S(H)}}),"tsx"===q&&F&&r.a.createElement(l["Link"],{target:"_blank",to:X},r.a.createElement("button",{title:"Get JSX via TypeScript Playground",className:"__dumi-default-icon",role:"change-tsx",type:"button"})),r.a.createElement("button",{title:"Toggle source code panel",className:"__dumi-default-icon".concat(F?" __dumi-default-btn-expand":""),role:"source",type:"button",onClick:function(){return G(!F)}})),F&&r.a.createElement("div",{className:"__dumi-default-previewer-source-wrapper"},!h&&r.a.createElement(o["b"],{className:"__dumi-default-previewer-source-tab",prefixCls:"__dumi-default-tabs",moreIcon:"\xb7\xb7\xb7",defaultActiveKey:I,onChange:Q},Object.keys(b.sources).map((function(e){return r.a.createElement(o["a"],{tab:"_"===e?"index.".concat(p(e,b.sources[e])):e,key:e})}))),r.a.createElement("div",{className:"__dumi-default-previewer-source"},r.a.createElement(i["a"],{code:H,lang:q,showCopy:!1}))))};t["default"]=v},r9as:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),o=a("dEAq"),c=a("Zxc8"),l=a("Rsk4"),i=r.a.memo(l["default"]["component-job-status-tag"].component),u=r.a.memo(l["default"]["job-status-tag-demo"].component);t["default"]=e=>(r.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&o["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"markdown"},r.a.createElement("h1",{id:"job-status-tag"},r.a.createElement(o["AnchorLink"],{to:"#job-status-tag","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:"icon icon-link"})),"Job Status Tag")),r.a.createElement(c["default"],l["default"]["component-job-status-tag"].previewerProps,r.a.createElement(i,null)),r.a.createElement("div",{className:"markdown"}),r.a.createElement(c["default"],l["default"]["job-status-tag-demo"].previewerProps,r.a.createElement(u,null)))))}}]);