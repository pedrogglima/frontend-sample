import 'bootstrap';
import './assets/app.css';
import * as UsersController from './controllers/users.ts';
import { render } from './lib/render.ts';
import { extractPath } from './lib/router.ts';
import { hasSession } from './lib/session.ts';

//Use Window location hash to show the specified view.
const showView = async () => {
  try {
    document.body.innerHTML = render('shared', 'main', {
      userAuth: await hasSession(),
    });
    const objPath = await extractPath(window.location.hash);

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
        // edit user || list users
        if (objPath.id) {
          UsersController.edit(objPath.id);
        } else {
          if (objPath.key && objPath.key == 'page' && objPath.value) {
            UsersController.users(objPath.value);
          } else {
            UsersController.users();
          }
        }
        break;
      default:
        document.body.innerHTML = render('shared', '404', {});
    }
  } catch (err) {
    document.body.innerHTML = render('shared', '404', {});
  }
};

// Page setup.
(async () => {
  document.body.innerHTML = render('shared', 'main', {
    userAuth: await hasSession(),
  });
  window.addEventListener('hashchange', showView);
  showView().catch(err => {
    console.log(err);
    document.body.innerHTML = render('shared', '404', {});
  });
})();
