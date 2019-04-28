import * as Render from './render.ts';

// show alert message
export const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = Render.template('shared', 'alert', {
    type: type,
    message: message
  });
  alertsElement.insertAdjacentHTML('beforeend', html);
};
