import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import * as templates from './templates.ts';

// list users
const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = templates.listUsers({users});

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', event => {
      deleteUser(deleteButton.getAttribute('data-user-id'));
    });
  }
};

// delete user by id
const deleteUser = async userId => {
  try {
    showAlert('usuario foi deletado!', 'success');
  } catch (err) {
    showAlert(err);
  }
};

// editar user by id
const editUser = user => {
  try {
    const mainElement = document.body.querySelector('.app-main');
    mainElement.innerHTML = templates.editUser(user);

    const form = mainElement.querySelector('form');
    // const input = form.querySelector('input');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      await updateUser({});
    });

  } catch (err) {
    showAlert(err);
  }
};

// update user
const updateUser = async user => {
  try {
    showAlert('usuario foi atualizado!', 'success');
  } catch (err) {
    showAlert(err);
  }
};

// show alert message
const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = templates.alert({type, message});
  alertsElement.insertAdjacentHTML('beforeend', html);
};

//Use Window location hash to show the specified view.
const showView = async () => {
  const mainElement = document.body.querySelector('.app-main');
  const [view, ...params] = window.location.hash.split('/');

  switch (view) {
    case '#login':
      // wait getSession(user);
      mainElement.innerHTML = templates.login();
      break;
    case '#users':
      try {
        // edit user || list user
        if (params[0]) {
          // const user = await getUser(params[0]);
          editUser(
            { "id": "1", "first_name": "morpheus", "last_name": "zion" }
          );

        } else {
          // const users = await getUsers();
          listUsers([
            { "id": "1", "first_name": "morpheus", "last_name": "zion" },
            { "id": "2", "first_name": "matheus", "last_name": "jardim" },
            { "id": "3", "first_name": "lucas", "last_name": "montreal" }
          ]);
        }
      } catch (err) {
        showAlert(err);
        window.location.hash = '#login';
      }
      break;
    default:
      document.body.innerHTML = templates.notFound();
      throw Error(`Error 404: ${view}`);
  }
};

// Page setup.
(async () => {
  document.body.innerHTML = templates.main();
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#login');
})();
