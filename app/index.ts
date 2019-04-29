// o que falta fazer nessa pagina
// - remover imports from style (boostrap)
// - rever locacao showView
// - terminar call API (login)
// - terminar CSS in pages
// - rever page 404 (replace apenas .app-main)

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import * as User from './model/user.ts';
import * as Render from './lib/render.ts';
import * as Fixtures from './test/fixtures.ts';
import { extractPath } from './lib/router.ts';
import { showAlert } from './lib/helpers.ts';


// page login
const home = () => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = Render.template('users', 'login', {});
};

// page list users
const listUsers = (users) => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = Render.template('users', 'list', users);

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', async (event) => {
      try {
        const id = deleteButton.getAttribute('data-user');
        if ( await User.delete_by_id(id) ) {
          // remove user from list
          const containerUser = (<HTMLInputElement> deleteButton).parentNode
            .parentNode
            .parentNode;
          const parent = (<HTMLInputElement> containerUser).parentNode;
          parent.removeChild(containerUser);

          showAlert('Usuário deletado com sucesso', 'success');
        } else {
          showAlert('Não foi possível deletar o Usuário');
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};

// page edit user
const editUser = user => {
  try {
    const mainElement = document.body.querySelector('.app-main');
    mainElement.innerHTML = Render.template('users', 'edit', user);

    const form = mainElement.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const user_id = (<HTMLInputElement> form.querySelector('#user_id')).value;
      const user_nome = (<HTMLInputElement> form.querySelector('#user_nome')).value;
      const user_sobrenome = (<HTMLInputElement> form.querySelector('#user_sobrenome')).value;
      await User.update(user_id, user_nome, user_sobrenome);
    });

  } catch (err) {
    showAlert(err);
  }
};

//Use Window location hash to show the specified view.
const showView = async () => {
  document.body.innerHTML = Render.template('shared', 'main', {});
  const objPath = extractPath(window.location.hash);

  switch (objPath.view) {
    case '#/':
      home();
      break;
    case '#login':
      home();
      break;
    case '#users':
      try {
        // edit user || list users
        if (objPath.id) {
          // const user = await User.find_by_id(objPath.id);
          const user = Fixtures.user();
          // redirecionar caso getUser fail
          editUser(user);

        } else {
          // let users = '';
          const users = Fixtures.users();

          if (objPath.key && objPath.key == 'page' && objPath.value) {
            // users = await User.find_by_page(objPath.value);
          } else {
            // users = await User.find_by_page();
          }

          listUsers(users);
        }
      } catch (err) {
        showAlert(err);
        console.log(err);
        window.location.hash = '#login';
      }
      break;
    default:
      document.body.innerHTML = Render.template('shared', '404', {});
      throw Error(`status ${objPath.statusCode} - ${objPath.error}`);
  }
};

// Page setup.
(async () => {
  document.body.innerHTML = Render.template('shared', 'main', {});
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#login');
})();
