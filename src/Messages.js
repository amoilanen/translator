export function addMessageListener(target, type, handler) {
  target.addEventListener('message', event => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === type) {
        handler(message.payload);
      }
    } catch (error) {
      console.log(error);
    }
  }, false);
}

export function sendMessage(target, type, payload) {
  const message = {
    type,
    payload
  };
  target.postMessage(JSON.stringify(message), '*');
}

export const Messages = {
  TranslationReady: 'translation:ready',
  TranslationRequest: 'translation:request'
};