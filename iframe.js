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
    const requestedToTranslate = message.payload.trim();

    const checkForResultInterval = setInterval(() => {
        const translationSourceElement = document.querySelector("#source");
        const translationResultElement = document.querySelector('.tlid-translation.translation');

        const translationSourceText = translationSourceElement.value.trim();
        const translation = translationResultElement.innerText;
        const isTranslationInProgress = translation.endsWith('...');

        if (translationResultElement && (translationSourceText === requestedToTranslate) && !isTranslationInProgress){
          console.log("translation in iFrame = ", translation);
          sendTranslationToParent(translation);
          clearInterval(checkForResultInterval);
        }
      }, 500);
  }
}, false);