console.log('Running in an iFrame...');

const checkForResultInterval = setInterval(() => {
  const translationElement = document.querySelector('.tlid-translation.translation');
  if (translationElement) {
    const translation = translationElement.innerText;
    console.log("translation in iFrame = ", translation);
    sendTranslationToParent(translation);
    clearInterval(checkForResultInterval);
  }
}, 500);

function sendTranslationToParent(translation) {
  const message = {
    type: 'translation:ready',
    payload: translation
  };
  window.parent.postMessage(JSON.stringify(message), '*');
}

window.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.type === 'translation:request') {
    const toTranslate = message.payload;

    const checkForResultInterval = setInterval(() => {
        const translationElement = document.querySelector('.tlid-translation.translation');
        if (translationElement) {
          const translation = translationElement.innerText;
          console.log("translation in iFrame = ", translation);
          sendTranslationToParent(translation);
          clearInterval(checkForResultInterval);
        }
      }, 500);
  }
}, false);