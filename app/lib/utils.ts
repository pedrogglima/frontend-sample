import { render} from '../lib/render.ts';

export const fetchJSON = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return await response.json();
  } catch (err) {
    throw new Error("Network error: " + err);
  }
};

export const fetchTXT = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return await response.text();
  } catch (err) {
    throw new Error("Network error: " + err);
  }
};

export const startLoaderBar = () => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = render('shared', 'loder', {});
}

export const stopLoaderBar = () => {
  const appLoading = document.body.querySelector('.app-loading');
  appLoading.innerHTML = "<div></div>";
}

export const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = render('shared', 'alert', {
    type: type,
    message: message
  });
  alertsElement.insertAdjacentHTML('beforeend', html);
};
