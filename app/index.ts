import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import * as templates from './templates.ts';

document.body.innerHTML = templates.main();

const mainElement = document.body.querySelector('.app-main');
const alertsElement = document.body.querySelector('.app-alerts');

mainElement.innerHTML = templates.welcome();
alertsElement.innerHTML = templates.alert({
  type: 'success',
  message: 'Setup inicial funcionando!',
});

/**
* Use Window location hash to show the specified view.
*/
const showView = async () => {
  const [view, ...params] = window.location.hash.split('/');
  switch (view) {
    case '#welcome':
      mainElement.innerHTML = templates.welcome();
      break;
    default:
      throw Error(`Error 404: ${view}`);
  }
};

window.addEventListener('hashchange', showView);
showView().catch(err => window.location.hash = '#welcome');
