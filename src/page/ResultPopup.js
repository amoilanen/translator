const template = `
  <span class="result-popup"></span>
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
  const selection = document.getSelection();

  //TODO: Handle the case when nothing is selected on the page
  const firstSelectionRange = selection.getRangeAt(0);
  return firstSelectionRange.getBoundingClientRect();
}

class ResultPopup extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.root = this.attachShadow({ mode: 'closed' });

    // Clone and insert template
    const templateElement = document.createElement('template');
    templateElement.innerHTML = template;
    this.root.appendChild(templateElement.content.cloneNode(true));

    // Insert style
    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    this.root.appendChild(styleElement);

    this.resultPopup = this.root.querySelector('.result-popup');
  }

  show(translation) {
    const selectionBoundingClientRect = getSelectionCoordinates();
    const positionToShowAt = {
      top: selectionBoundingClientRect.top + selectionBoundingClientRect.height,
      left: selectionBoundingClientRect.left
    };

    this.resultPopup.style.left = `${positionToShowAt.left}px`;
    this.resultPopup.style.top = `${positionToShowAt.top}px`;
    this.resultPopup.innerText = translation;
    this.resultPopup.classList.add('result-popup__shown');
  }

  hide() {
    this.resultPopup.innerText = '';
    this.resultPopup.classList.remove('result-popup__shown');
  }
}

/*
 * We have to use a polyfill because Chrome does not implement custom elements for content scripts yet
 * https://bugs.chromium.org/p/chromium/issues/detail?id=390807
 */
customElements.define('ts-result-popup', ResultPopup);