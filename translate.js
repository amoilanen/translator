let url = "https://translate.google.com/#view=home&op=translate&sl=fi&tl=en&text=valo";

let iframe = document.createElement('iframe');
iframe.src = url;
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