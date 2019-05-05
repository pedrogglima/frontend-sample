import { render } from './render.ts';

export const startLoaderBar = (): void => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = render('shared', 'loader', {});
};

export const stopLoaderBar = (): void => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = '<div></div>';
};

export const showAlert = (message, type = 'danger'): void => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = render('shared', 'alert', {
    type: type,
    message: message,
  });
  alertsElement.insertAdjacentHTML('beforeend', html);
};
