import * as User from '../model/user.ts';
import { template, redirect } from '../lib/render.ts';
//import * as Fixtures from '../test/fixtures.ts';
import { showAlert, startLoading, stopLoading } from '../lib/utils.ts';
import { hasSession, getSession, setSession, deleteSession } from '../lib/session.ts';

// page login
export const login = async () => {
  try {
    if (!await hasSession()) {
      session();
    } else {
      redirect('users');
    }
  } catch (err) {
    throw err;
  }
};

// logout
export const logout = async () => {
  try {
    if (await hasSession()) {
      startLoading();
      await User.logout(await getSession());
      stopLoading();

      await deleteSession();

      redirect('login');
    }
  } catch (err) {
    throw err;
  }
};

// page index
export const index = async (page = '1') => {
  try {
    if (!await hasSession()) {
      redirect('login');
    } else {
      startLoading();
      const users = await User.find_by_page(page, await getSession());
      stopLoading();

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
      redirect('login');
    } else {
      startLoading();
      const user = await User.find_by_id(id, await getSession());
      stopLoading();

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
  mainElement.innerHTML = template('users', 'login', {});

  const form = mainElement.querySelector('form');
  form.addEventListener('submit', async (event) => {
    try {
      event.preventDefault();
      const user_login = (<HTMLInputElement> form
        .querySelector('#user_login'))
        .value;

      const user_password = (<HTMLInputElement> form
        .querySelector('#user_password'))
        .value;

      startLoading();
      const resp = await User.login(user_login, user_password);
      await setSession("token", resp.token);
      //const resp = Fixtures.token();
      stopLoading();
      redirect('users');
    } catch (err) {
      stopLoading();
      showAlert('Falha na operação');
      console.log(err);
    }
  });
};

// list users
export const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML =
    template('users', 'list', {users: users, url: "#users?page="});

  // add editar event on buttons
  const editButtons = mainElement.querySelectorAll('button.edit');
  for (let i = 0; i < editButtons.length; i++) {
    const editButton = editButtons[i];
    editButton.addEventListener('click', event => {
      const id = editButton.getAttribute('data-user');
      redirect(`users/${id}`);
    });
  }

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', async (event) => {
      try {
        const id = deleteButton.getAttribute('data-user');

        startLoading();
        const resp = await User.delete_by_id(id, await getSession());
        stopLoading();

        const containerUser =
          (<HTMLInputElement> deleteButton).parentNode
            .parentNode;

        const parent =
          (<HTMLInputElement> containerUser).parentNode;

        parent.removeChild(containerUser);

        showAlert('Operação concluida com sucesso', 'success');
      } catch (err) {
        stopLoading();
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
    template('users', 'edit', {user: user});

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

      startLoading();
      const resp = await User.update(user_id, user_nome, user_sobrenome, await getSession());
      stopLoading();

      showAlert('Operação concluida com sucesso', 'success');

    } catch (err) {
      stopLoading();
      showAlert('Falha na operação');
      console.log(err);
    }
  });
};
