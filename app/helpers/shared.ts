import * as Render from '../lib/render.ts';

export const startLoading = () => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = Render.template('shared', 'loading', {});
}

export const stopLoading = () => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = "<div></div>";
}

export const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = Render.template('shared', 'alert', {
    type: type,
    message: message
  });
  alertsElement.insertAdjacentHTML('beforeend', html);
};
