console.log('Running in an iFrame...');

const checkForResultInterval = setInterval(() => {
  const translationElement = document.querySelector('.tlid-translation.translation');
  if (translationElement) {
    const translation = translationElement.innerText;
    console.log("translation in iFrame = ", translation);
    const message = {
      type: 'translation:ready',
      payload: translation
    };
    window.parent.postMessage(JSON.stringify(message), '*');
    clearInterval(checkForResultInterval);
  }
}, 500);