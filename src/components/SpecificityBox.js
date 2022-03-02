class SpecificityBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  connectedCallback() {
    this.render();
  }

  setValue(values) {
    const [b, c, d] = this.shadowRoot.querySelectorAll(".component .value");
    b.textContent = values.ids;
    c.textContent = values.classes + values.pseudos + values.attrs;
    d.textContent = values.tags + values.pseudoelem;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SpecificityBox.styles}</style>
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
    </div>`;
  }
}

customElements.define("specificity-box", SpecificityBox);
