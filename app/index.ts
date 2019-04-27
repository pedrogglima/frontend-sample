import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import * as templates from './templates.ts';

const listUsers = users => {
  // load users
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
}

// delete user by id
const deleteUser = async (userId) => {
  try {
    console.log('usuario foi deletado!');
  } catch (err) {
    showAlert(err);
  }
}

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
    case '#welcome':
      mainElement.innerHTML = templates.welcome();
      break;
    case '#users':
      try {
        listUsers([
          { "id": "1", "first_name": "morpheus", "last_name": "zion" },
          { "id": "2", "first_name": "matheus", "last_name": "jardim" },
          { "id": "3", "first_name": "lucas", "last_name": "montreal" }
        ])
      } catch (err) {
        showAlert(err);
        window.location.hash = '#welcome';
      }
      break;
    default:
      throw Error(`Error 404: ${view}`);
  }
};

// Page setup.
(async () => {
  document.body.innerHTML = templates.main();
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#welcome');
})();
