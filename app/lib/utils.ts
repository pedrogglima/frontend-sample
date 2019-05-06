import { render } from './render.ts';

export const startLoaderBar = () => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = render('shared', 'loader', {});
};

export const stopLoaderBar = () => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = '<div></div>';
};

export const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = render('shared', 'alert', {
    type: type,
    message: message,
  });
  alertsElement.insertAdjacentHTML('beforeend', html);
};
