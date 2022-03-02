import { calcSpecificity } from "../modules/calcSpecificity.js";
import "./SpecificityBox.js";

class CssSpecificityCalc extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  connectedCallback() {
    this.render();
    this.selectorInput = this.shadowRoot.querySelector(".selector-input");
    this.result = this.shadowRoot.querySelector(".result");
    this.setHandlers();
  }

  setHandlers() {
    this.selectorInput.addEventListener("change", () => this.checkSelector());
  }

  checkSelector() {
    const cssSelector = this.shadowRoot.querySelector(".selector-input").value;
    const specBox = this.shadowRoot.querySelector("specificity-box");
    const object = calcSpecificity(cssSelector);
    this.result.textContent = JSON.stringify(object, null, 2);
    specBox.setValue(object);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CssSpecificityCalc.styles}</style>
    <div class="container">
      <h1>Css Specificity Calculator</h1>
      <div class="content">
        <input class="selector-input" placeholder=".container .item:hover span.title">
        <specificity-box></specificity-box>
        <div class="result"></div>
      </div>
    </div>`;
  }
}

customElements.define("css-specificity-calc", CssSpecificityCalc);
