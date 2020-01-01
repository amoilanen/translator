function constructFrameUrl(word) {
  return `https://translate.google.com/#view=home&op=translate&sl=fi&tl=en&text=${word}`;
}

let url = constructFrameUrl('valo');

let iframe = document.createElement('iframe');
iframe.src = url;
iframe.setAttribute('name', 'translation-frame')
iframe.style.display = 'none';

document.body.appendChild(iframe);

console.log("Ran main content script!");

function showTranslation(translation) {
  const selection = document.getSelection();
  const firstSelectionRange = selection.getRangeAt(0);
  const selectionBoundingClientRect = firstSelectionRange.getBoundingClientRect();
  const popupPosition = {
    top: selectionBoundingClientRect.top + selectionBoundingClientRect.height,
    left: selectionBoundingClientRect.left
  };

  const translationPopup = document.createElement('span');
  translationPopup.style.display = 'inline-block;';
  translationPopup.style.height = '20px';
  translationPopup.style.backgroundColor = '#badcfe';
  translationPopup.style.position = 'fixed';
  translationPopup.style.left = `${popupPosition.left}px`;
  translationPopup.style.top = `${popupPosition.top}px`;
  translationPopup.innerText = translation;
  document.body.appendChild(translationPopup);

  setTimeout(() => {
    document.body.removeChild(translationPopup);
  }, 2000);
}

window.addEventListener('message', event => {
  try {
    const message = JSON.parse(event.data);
    if (message.type === 'translation:ready') {
      const translation = message.payload;
      console.log(`Received translation = ${translation}`);
      showTranslation(translation);
    }
  } catch (error) {
    console.log(error);
  }
}, false);

document.addEventListener('selectionchange', event => {
  const selectedText = document.getSelection().toString();

  //console.log('Selected text:');
  //console.log(selectedText);

  if (selectedText.length > 0) {
    const iframe = document.querySelector('iframe[name=translation-frame]');
    iframe.setAttribute('src', constructFrameUrl(selectedText));

    const message = {
      type: 'translation:request',
      payload: selectedText
    };
    console.log(`Asking to translate "${selectedText}"`);
    iframe.contentWindow.postMessage(JSON.stringify(message), '*');
  }
});