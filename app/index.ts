// o que falta fazer nessa pagina
// - remover imports from style (boostrap)
// - terminar call API (login)
// - terminar CSS in pages

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import * as UsersController from './controllers/users.ts';
import { render } from './lib/render.ts';
import { extractPath } from './lib/router.ts';
import { hasSession } from './lib/session.ts';


//Use Window location hash to show the specified view.
const showView = async () => {
  document.body.innerHTML = render('shared', 'main', {
    userAuth: await hasSession()
  });
  const objPath = extractPath(window.location.hash);

  switch (objPath.view) {
    case '#/':
      UsersController.login();
      break;
    case '#login':
      UsersController.login();
      break;
    case '#logout':
      UsersController.logout();
      break;
    case '#users':
      try {
        // edit user || list users
        if (objPath.id) {
          UsersController.edit(objPath.id);
        } else {
          if (objPath.key && objPath.key == 'page' && objPath.value) {
            UsersController.index(objPath.value);
          } else {
            UsersController.index();
          }
        }
      } catch (err) {
        throw err;
      }
      break;
    default:
      document.body.innerHTML = render('shared', '404', {});
  }
};

// Page setup.
(async () => {
  document.body.innerHTML = render('shared', 'main', {
    userAuth: await hasSession()
  });
  window.addEventListener('hashchange', showView);
  showView().catch(err => {
    document.body.innerHTML = render('shared', '404', {});
    console.log(err);
  });
})();
