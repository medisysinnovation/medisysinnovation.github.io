(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{YWjI:function(e,l,a){"use strict";a.r(l);var t=a("tJVT"),r=a("q1tI"),o=a.n(r),n=a("TL6i");var u=()=>{var e=Object(r["useState"])(0),l=Object(t["a"])(e,2),a=(l[0],l[1]),u=o.a.useRef();Object(r["useMemo"])((()=>e=>{console.log(e),a(e)}),[]);return Object(r["useEffect"])((()=>{console.log(u)}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(n["i"],{code:"users",size:"small",header:o.a.createElement("div",null,"Header"),footer:o.a.createElement("div",null,"Footer"),bordered:!0,renderItem:e=>o.a.createElement(n["i"].Item,null,e.value,"/",e.label)})))};l["default"]=u},fEj9:function(e,l,a){"use strict";a.r(l);var t=a("tJVT"),r=a("9og8"),o=a("WmNS"),n=a.n(o),u=a("q1tI"),c=a.n(u),s=a("TL6i"),d=a("luCs"),b={};d["b"].setConfig({cache:!1,dataLoader:function(){var e=Object(r["a"])(n.a.mark((function e(l){var a;return n.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=l.code,!b[a]){e.next=3;break}return e.abrupt("return");case 3:return console.log(a+" start"),b[a]=!0,e.next=7,Object(d["f"])(3e3);case 7:return console.log(a+" end"),delete b[a],e.abrupt("return",i[a]);case 10:case"end":return e.stop()}}),e)})));function l(l){return e.apply(this,arguments)}return l}()});var i={users:[{value:1,label:"U_ABC",roleId:1},{value:2,label:"U_CDE",roleId:1},{value:3,label:"U_FGH",roleId:1},{value:4,label:"U_EDS",roleId:1},{value:5,label:"U_ANI",roleId:1},{value:6,label:"U_LIT",roleId:2},{value:7,label:"U_RVS",roleId:2},{value:8,label:"U_UIJ",roleId:2}],roles:[{value:1,label:"R_ABC"},{value:2,label:"R_CDE"}]};var v=()=>{var e=Object(u["useState"])(0),l=Object(t["a"])(e,2),a=(l[0],l[1]),o=(c.a.useRef(),Object(u["useState"])([])),d=Object(t["a"])(o,2),b=d[0],i=d[1];Object(u["useEffect"])((()=>{setTimeout((()=>{i([{value:1,label:"U_ABC",roleId:1},{value:2,label:"U_CDE",roleId:1},{value:3,label:"U_FGH",roleId:1},{value:4,label:"U_EDS",roleId:1},{value:5,label:"U_ANI",roleId:1},{value:6,label:"U_LIT",roleId:2},{value:7,label:"U_RVS",roleId:2},{value:8,label:"U_UIJ",roleId:2}])}),4e3)}),[]);Object(u["useMemo"])((()=>e=>{console.log(e),a(e)}),[]);var v=Object(u["useState"])(1),I=Object(t["a"])(v,2),m=I[0],p=I[1],f=Object(u["useState"])(1),E=Object(t["a"])(f,2),U=E[0],g=E[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement(s["q"],{placeholder:"Test",code:"abc",request:function(){var e=Object(r["a"])(n.a.mark((function e(l,a,t){return n.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((e=>{e({data:[{value:1,label:123}],success:!0,total:123})})));case 1:case"end":return e.stop()}}),e)})));return function(l,a,t){return e.apply(this,arguments)}}()}),c.a.createElement(s["q"],{placeholder:"Role",code:"roles",mode:"multiple",onChange:(e,l)=>{p(e),g(void 0),console.log(e,l)},onDataSourceChange:e=>{console.log(e)},readonly:!0,value:[1,2]}),c.a.createElement(s["q"],{placeholder:"User",code:"users",filter:(e,l)=>(console.log(e.roleId===m),e.roleId===m),onChange:(e,l)=>{console.log(e,l),g(e),p(l.data.roleId)},value:U,dependencies:[m]}),c.a.createElement(s["q"],{placeholder:"User",dataSource:b,onChange:(e,l)=>{console.log(e,l),g(e),p(l.data.roleId)},value:U,dependencies:[m]}),c.a.createElement(s["l"],{initialValues:{testuser:1}},c.a.createElement(s["o"],{placeholder:"User",dataSource:b,name:"testuser",onChange:(e,l)=>{console.log(e,l),g(e),p(l.data.roleId)},value:U,valueField:"value",displayField:"label"})))};l["default"]=v}}]);