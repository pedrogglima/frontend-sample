import { render } from './render.ts';

export const startLoaderBar = () => {
  const appOverlay = document.body.querySelector('.app-overlay') as HTMLElement;
  const appLoading = document.body.querySelector('.app-loading');
  appOverlay.style.display = 'block';
  appLoading.innerHTML = render('shared', 'loader', {});
};

export const stopLoaderBar = () => {
  const appOverlay = document.body.querySelector('.app-overlay') as HTMLElement;
  const appLoading = document.body.querySelector('.app-loading');
  appOverlay.style.display = 'none';
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
