const template = document.createElement('template');

template.innerHTML = `
  <template id="result-popup-template">
    <span class="result-popup"></span>
  </template>
`;

const style = `
  .result-popup {
    height: 20px;
    background-color: #badcfe;
    position: fixed;
    display: none;
  }
  .result-popup__shown {
    display: inline-block;
  }
`;

function getSelectionCoordinates() {
  const parentDocument = document.currentScript.ownerDocument;
  //TODO: Get the document in which the component is rendered
  const selection = parentDocument.getSelection(); // Most likely this will not work

  //TODO: Handle the case when nothing is selected on the page
  const firstSelectionRange = selection.getRangeAt(0);
  return firstSelectionRange.getBoundingClientRect();
}

class ResultPopup extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: 'closed' });

    // Clone and insert template
    const template = document.querySelector('#result-popup-template');
    shadowRoot.appendChild(template.content.cloneNode(true));

    // Insert style
    const templateStyle = document.createElement('style');
    templateStyle.textContent = style;
    this.shadowRoot.appendChild(templateStyle);

    this.resultPopup = this.shadowRoot.querySelector('.result-popup');
  }

  show(translation) {
    const selectionBoundingClientRect = getSelectionCoordinates();
    const positionToShowAt = {
      top: selectionBoundingClientRect.top + selectionBoundingClientRect.height,
      left: selectionBoundingClientRect.left
    };

    this.translationPopup.style.left = `${positionToShowAt.left}px`;
    this.translationPopup.style.top = `${positionToShowAt.top}px`;
    this.resultPopup.innerText = translation;
    this.classList.add('result-popup__shown');
  }

  hide() {
    this.resultPopup.innerText = translation;
    this.classList.remove('result-popup__shown');
  }
}

// TODO: 
// Why oh why... https://bugs.chromium.org/p/chromium/issues/detail?id=390807
customElements.define('ts-result-popup', ResultPopup);