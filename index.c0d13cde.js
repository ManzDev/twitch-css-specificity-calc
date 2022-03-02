import{C as g}from"./vendor.d0dde7c8.js";const x=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const t of n.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&i(t)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}};x();const c=new g;c.registerSelectorPseudos("has");c.registerNestingOperators(">","+","~");c.registerAttrEqualityMods("^","$","*","~");c.enableSubstitutes();const y=d=>{const s=c.parse(d),o={tags:0,classes:0,pseudos:0,pseudoelem:0,ids:0,attrs:0},i=t=>{if(Boolean(t)&&t.length>1){const r=t.length-2;t[r].name===""&&(o.pseudoelem=1,o.pseudos-=2)}},e=t=>{const p=Boolean(t.tagName),r=Boolean(t.classNames),u=Boolean(t.id),h=Boolean(t.pseudos),m=Boolean(t.attrs),f=Boolean(t.rule);i(t.pseudos),p&&o.tags++,r&&(o.classes+=t.classNames.length),h&&(o.pseudos+=t.pseudos.length),u&&o.ids++,m&&(o.attrs+=t.attrs.length),f&&e(t.rule)};return Boolean(s.rule)&&e(s.rule),o};class l extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
      }

      .container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 2em;
      }

      .b-component { --color: #198ae7; }
      .c-component { --color: #11c054; }
      .d-component { --color: #d6440a; }

      .component {
        --size: 125px;

        width: var(--size);
        height: var(--size);
        border: 10px solid var(--color);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        font-family: Montserrat, sans-serif;
        font-variation-settings: "wght" 650;
        text-align: center;
        box-shadow: 2px 2px 4px #0009;
      }

      .component .title {
        width: 100%;
        height: 50px;
        font-size: 0.8rem;
        padding: 0.2em;
        background: var(--color);
        color: #fff;
        text-shadow: 1px 1px 2px #0004;
        box-sizing: border-box;
      }

      .component .value {
        font-size: 4rem;
        color: #333;
      }
    `}connectedCallback(){this.render()}setValue(s){const[o,i,e]=this.shadowRoot.querySelectorAll(".component .value");o.textContent=s.ids,i.textContent=s.classes+s.pseudos+s.attrs,e.textContent=s.tags+s.pseudoelem}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
    <div class="container">
      <div class="b-component component">
        <div class="title">ID</div>
        <div class="value">0</div>
      </div>
      <div class="c-component component">
        <div class="title">CLASS, PSEUDO, ATTR</div>
        <div class="value">0</div>
      </div>
      <div class="d-component component">
        <div class="title">ELEM, PSEUDOELEM</div>
        <div class="value">0</div>
      </div>
    </div>`}}customElements.define("specificity-box",l);class a extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
      }

      h1 {
        font-family: Montserrat, sans-serif;
        font-variation-settings: "wght" 650;
        text-shadow: 1px 1px 2px #0004;
        text-align: center;
      }

      .selector-input {
        padding: 5px 10px;
        font-family: "Victor Mono", sans-serif;
        font-size: 1.25rem;
        min-width: 500px;
      }

      .result {
        margin: 2em;
        font-family: "Victor Mono", sans-serif;
        font-size: 1.25rem;
        background: #eee;
        min-width: 400px;
        min-height: 150px;
        white-space: pre;
      }
    `}connectedCallback(){this.render(),this.selectorInput=this.shadowRoot.querySelector(".selector-input"),this.result=this.shadowRoot.querySelector(".result"),this.setHandlers()}setHandlers(){this.selectorInput.addEventListener("change",()=>this.checkSelector())}checkSelector(){const s=this.shadowRoot.querySelector(".selector-input").value,o=this.shadowRoot.querySelector("specificity-box"),i=y(s);this.result.textContent=JSON.stringify(i,null,2),o.setValue(i)}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="container">
      <h1>Css Specificity Calculator</h1>
      <div class="content">
        <input class="selector-input" placeholder=".container .item:hover span.title">
        <specificity-box></specificity-box>
        <div class="result"></div>
      </div>
    </div>`}}customElements.define("css-specificity-calc",a);
