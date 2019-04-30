// o que falta fazer nessa pagina
// - remover imports from style (boostrap)
// - rever locacao showView
// - terminar call API (login)
// - terminar CSS in pages

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
const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = Render.template('users', 'list', users);

  // add editar event on buttons
  const editButtons = mainElement.querySelectorAll('button.edit');
  for (let i = 0; i < editButtons.length; i++) {
    const editButton = editButtons[i];
    editButton.addEventListener('click', event => {
      try {
        const id = editButton.getAttribute('data-user');
        window.location.hash = `#users/${id}`
      } catch (err) {
        showAlert('Falha na operação');
        console.log(err);
      }
    });
  }

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', async (event) => {
      try {
        const id = deleteButton.getAttribute('data-user');

        const resp = await User.delete_by_id(id);

        const containerUser = (<HTMLInputElement> deleteButton).parentNode
          .parentNode;

        const parent = (<HTMLInputElement> containerUser).parentNode;
        parent.removeChild(containerUser);

        showAlert('Operação concluida com sucesso', 'success');
      } catch (err) {
        showAlert('Falha na operação');
        console.log(err);
      }
    });
  }
};

// page edit user
const editUser = async user => {
  try {
    const mainElement = document.body.querySelector('.app-main');
    mainElement.innerHTML = Render.template('users', 'edit', user);

    const form = mainElement.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const user_id = (<HTMLInputElement> form.querySelector('#user_id')).value;
      const user_nome = (<HTMLInputElement> form.querySelector('#user_nome')).value;
      const user_sobrenome = (<HTMLInputElement> form.querySelector('#user_sobrenome')).value;
      const resp = await User.update(user_id, user_nome, user_sobrenome);
      showAlert('Operação concluida com sucesso', 'success');
    });
  } catch (err) {
    showAlert('Falha na operação');
    console.log(err);
  }
};

//Use Window location hash to show the specified view.
const showView = async () => {
  if (document.body.querySelector('.single-page') === null) {
    document.body.innerHTML = Render.template('shared', 'main', {});
  }
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
        throw err;
      }
      break;
    default:
      document.body.innerHTML = Render.template('shared', '404', {});
  }
};

// Page setup.
(async () => {
  document.body.innerHTML = Render.template('shared', 'main', {});
  window.addEventListener('hashchange', showView);
  showView().catch(err => {
    document.body.innerHTML = Render.template('shared', '404', {});
    console.log(err);
  });
})();
