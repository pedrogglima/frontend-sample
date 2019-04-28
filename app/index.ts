import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import * as templates from './templates.ts';

// method to fetch and decode JSON.
const fetchJSON = async (url, method = 'GET') => {
  try {
    const response = await fetch(url, {method, credentials: 'omit'});
    return response.json();
  } catch (error) {
    return {error};
  }
};

// list users
const listUsers = users => {
  // console.log(`users: ${JSON.stringify(users)}`);
  const mainElement = document.body.querySelector('.app-main');
  const url = "#users?page="
  mainElement.innerHTML = templates.listUsers({users, url});

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', event => {
      deleteUser(deleteButton.getAttribute('data-user-id'));
    });
  }
};

// get users
const getUsers = async (pageNumber = '1') => {
  const users = await fetchJSON(`https://reqres.in/api/users?page=${pageNumber}`);
  console.log(users);
  if (users.error) {
    throw users.error;
  }
  return users;
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

const home = () => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = templates.login();
};


// show alert message
const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = templates.alert({type, message});
  alertsElement.insertAdjacentHTML('beforeend', html);
};


// extract path (extract data from window.location.hash)
// case root: #/ (valid)
// case 0: #users (valid)
// case 1: #users/:id (valid)
// case 2: #users?page=1 (valid)
// case 3: #users?page=1&bar=foo (invalid)
// case 4: # (invalid)
// case 5: #users?page=1/foo (invalid)
// case 6: #users/foo/bar?page=1 (invalid)
// case 7: #users/:id/user (invalid)

const extractPath = path => {
  if (path) {
    // for case root
    if (path == '#/') {
      return { view: path };
    }

    // for case 1
    const [view, id, ...trash] = path.split('/');

    if (id) {
      return { view: view, id: id };
    }

    // for case 2
    const [view_w_qrys, querys] = view.split('?');

    if (querys) {
      const [query, ...rest] = querys.split('&');
      const [key, value, ...trash] = query.split('=');

      if (key && value) {
        return { view: view_w_qrys, key: key, value: value };
      }
    }

    // solve case 0
    return { view: view_w_qrys };

  }
  return { statusCode: '404', error: 'invalid url' };
}

//Use Window location hash to show the specified view.
const showView = async () => {
  document.body.innerHTML = templates.main();
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
          // const user = await getUser(objPath.id);
          editUser(
            { "id": "1", "first_name": "morpheus", "last_name": "zion" }
          );

        } else {
          let users = '';

          if (objPath.key && objPath.key == 'page' && objPath.value) {
            users = await getUsers(objPath.value);
          } else {
            users = await getUsers();
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
      document.body.innerHTML = templates.notFound();
      throw Error(`status ${objPath.statusCode} - ${objPath.error}`);
  }
};

// Page setup.
(async () => {
  document.body.innerHTML = templates.main();
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#login');
})();
