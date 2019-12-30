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

window.addEventListener('message', event => {
  try {
    const message = JSON.parse(event.data);
    if (message.type === 'translation:ready') {
      console.log(`Received translation = ${message.payload}`);
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