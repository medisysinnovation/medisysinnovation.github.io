(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{VHFy:function(e,t,a){"use strict";a.r(t);var l=a("q1tI"),n=a.n(l),r=a("dEAq"),c=a("0zqC"),d=a("ZpkN"),m=n.a.memo(a("Rsk4").default["component-data-source"].component),u=n.a.memo(a("Rsk4").default["data-source-list"].component);t["default"]=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"markdown"},n.a.createElement("h1",{id:"datasource"},n.a.createElement(r["AnchorLink"],{to:"#datasource","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:["icon","icon-link"]})),"DataSource"),n.a.createElement("h2",{id:"select"},n.a.createElement(r["AnchorLink"],{to:"#select","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:["icon","icon-link"]})),"Select")),n.a.createElement(c["default"],a("Rsk4").default["component-data-source"].previewerProps,n.a.createElement(m,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"list"},n.a.createElement(r["AnchorLink"],{to:"#list","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:["icon","icon-link"]})),"List")),n.a.createElement(c["default"],a("Rsk4").default["data-source-list"].previewerProps,n.a.createElement(u,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement(d["a"],{code:"import { MIConfig } from '@medisys/utils';\n\nMIConfig.setConfig({\n    dataLoader:  ({ code }) => {\n       dispatch({\n        type: 'codeTable/getCodeTable',\n        payload: {\n          ctName: code,\n        },\n      });\n    },\n  });\n\n",lang:"js"}),n.a.createElement("h2",{id:"api"},n.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:["icon","icon-link"]})),"API"),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Property"),n.a.createElement("th",null,"Description"),n.a.createElement("th",null,"Type"),n.a.createElement("th",null,"Default"),n.a.createElement("th",null,"Version"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"code"),n.a.createElement("td",null,"key prop to indicate which data to load"),n.a.createElement("td",null,"string"),n.a.createElement("td",null),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"url"),n.a.createElement("td",null,"get data from particular url"),n.a.createElement("td",null,"string"),n.a.createElement("td",null),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"text"),n.a.createElement("td",null,"display as text"),n.a.createElement("td",null,"boolean"),n.a.createElement("td",null),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"valueField"),n.a.createElement("td",null,"value property"),n.a.createElement("td",null,"string"),n.a.createElement("td",null,"id"),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"displayField"),n.a.createElement("td",null,"display property"),n.a.createElement("td",null,"string"),n.a.createElement("td",null,"text"),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"dataSource"),n.a.createElement("td",null,"fixed datasource object"),n.a.createElement("td",null,"object[]"),n.a.createElement("td",null),n.a.createElement("td",null)))))))}}}]);