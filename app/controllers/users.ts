import * as User from '../model/user.ts';
import { render, redirectTo } from '../lib/render.ts';
//import * as Fixtures from '../test/fixtures.ts';
import { showAlert, startLoaderBar, stopLoaderBar } from '../lib/utils.ts';
import { hasSession, getSessionToken, setSessionToken, deleteSession } from '../lib/session.ts';

// page login
export const login = async () => {
  try {
    if (!await hasSession()) {
      session();
    } else {
      redirectTo('users');
    }
  } catch (err) {
    throw err;
  }
};

// logout
export const logout = async () => {
  try {
    if (await hasSession()) {
      startLoaderBar();
      await User.logout(await getSessionToken());
      stopLoaderBar();

      await deleteSession();

      redirectTo('login');
    }
  } catch (err) {
    throw err;
  }
};

// page index
export const index = async (page = '1') => {
  try {
    if (!await hasSession()) {
      redirectTo('login');
    } else {
      startLoaderBar();
      const users = await User.find_by_page(page, await getSessionToken());
      stopLoaderBar();

      //const users = Fixtures.users();
      listUsers(users);
    }
  } catch (err) {
    throw err;
  }
};

// page edit
export const edit = async (id) => {
  try {
    if (!await hasSession()) {
      redirectTo('login');
    } else {
      startLoaderBar();
      const user = await User.find_by_id(id, await getSessionToken());
      stopLoaderBar();

      //const user = Fixtures.user();
      editUser(user);
    }
  } catch (err) {
    throw err;
  }
};

// user session
export const session = () => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = render('users', 'login', {});

  const form = mainElement.querySelector('form');
  form.addEventListener('submit', async (event) => {
    try {
      event.preventDefault();
      const login = (<HTMLInputElement> form
        .querySelector('#user_login'))
        .value;

      const password = (<HTMLInputElement> form
        .querySelector('#user_password'))
        .value;

      startLoaderBar();
      const resp = await User.login(login, password);
      await setSessionToken(resp.token);
      //const resp = Fixtures.token();
      stopLoaderBar();
      redirectTo('users');
    } catch (err) {
      stopLoaderBar();
      showAlert('Falha na operação');
      console.log(err);
    }
  });
};

// list users
export const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML =
    render('users', 'list', {users: users, url: "#users?page="});

  // add editar event on buttons
  const editButtons = mainElement.querySelectorAll('button.edit');
  for (let i = 0; i < editButtons.length; i++) {
    const editButton = editButtons[i];
    editButton.addEventListener('click', event => {
      const id = editButton.getAttribute('data-user');
      redirectTo(`users/${id}`);
    });
  }

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', async (event) => {
      try {
        const id = deleteButton.getAttribute('data-user');

        startLoaderBar();
        const resp = await User.delete_by_id(id, await getSessionToken());
        stopLoaderBar();

        const containerUser =
          (<HTMLInputElement> deleteButton).parentNode
            .parentNode;

        const parent =
          (<HTMLInputElement> containerUser).parentNode;

        parent.removeChild(containerUser);

        showAlert('Operação concluida com sucesso', 'success');
      } catch (err) {
        stopLoaderBar();
        showAlert('Falha na operação');
        console.log(err);
      }
    });
  }
};

// edit user
export const editUser = user => {
  const mainElement =
    document.body.querySelector('.app-main');

  mainElement.innerHTML =
    render('users', 'edit', {user: user});

  const form = mainElement.querySelector('form');
  form.addEventListener('submit', async (event) => {
    try {
      event.preventDefault();

      const user_id = (<HTMLInputElement> form
        .querySelector('#user_id'))
        .value;
      const user_nome = (<HTMLInputElement> form
        .querySelector('#user_nome'))
        .value;
      const user_sobrenome = (<HTMLInputElement> form
        .querySelector('#user_sobrenome'))
        .value;

      startLoaderBar();
      const resp = await User.update(user_id, user_nome, user_sobrenome, await getSessionToken());
      stopLoaderBar();

      showAlert('Operação concluida com sucesso', 'success');

    } catch (err) {
      stopLoaderBar();
      showAlert('Falha na operação');
      console.log(err);
    }
  });
};
