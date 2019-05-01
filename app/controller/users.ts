import * as User from '../model/user.ts';
import * as Render from '../lib/render.ts';
import * as Fixtures from '../test/fixtures.ts';
import { hasSession, getSession, setSession, deleteSession } from '../lib/utils.ts';

// page login
export const login = async () => {
  try {
    if (!await hasSession()) {
      session();
    } else {
      window.location.hash = `#users`;
    }
  } catch (err) {
    throw err;
  }
};

// logoff
export const logoff = async () => {
  try {
    if (await hasSession()) {
      await User.logout(await getSession());
      await deleteSession();
      window.location.hash = `#login`;
    }
  } catch (err) {
    throw err;
  }
};

// page index
export const index = async (page = '1') => {
  try {
    if (!await hasSession()) {
      window.location.hash = `#login`;
    } else {
      const users = await User.find_by_page(page, await getSession());
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
      window.location.hash = `#login`;
    } else {
      const user = await User.find_by_id(id, await getSession());
      //const user = Fixtures.user();
      editUser(user);
    }
  } catch (err) {
    throw err;
  }
};

// user session
const session = () => {
  try {
    const mainElement = document.body.querySelector('.app-main');
    mainElement.innerHTML = Render.template('users', 'login', {});

    const form = mainElement.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const user_login = (<HTMLInputElement> form.querySelector('#user_login')).value;
      const user_password = (<HTMLInputElement> form.querySelector('#user_password')).value;
      const resp = await User.login(user_login, user_password);
      //const resp = Fixtures.token();
      await setSession("token", resp.token);
      window.location.hash = `#users`;
    });
  } catch (err) {
    showAlert('Falha na operação');
    console.log(err);
  }
};

// list users
const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = Render.template('users', 'list', {users: users, url: "#users?page="});

  // add editar event on buttons
  const editButtons = mainElement.querySelectorAll('button.edit');
  for (let i = 0; i < editButtons.length; i++) {
    const editButton = editButtons[i];
    editButton.addEventListener('click', event => {
      try {
        const id = editButton.getAttribute('data-user');
        window.location.hash = `#users/${id}`;
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
        const resp = await User.delete_by_id(id, await getSession());
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

// edit user
const editUser = user => {
  try {
    const mainElement = document.body.querySelector('.app-main');
    mainElement.innerHTML = Render.template('users', 'edit', {user: user});

    const form = mainElement.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const user_id = (<HTMLInputElement> form.querySelector('#user_id')).value;
      const user_nome = (<HTMLInputElement> form.querySelector('#user_nome')).value;
      const user_sobrenome = (<HTMLInputElement> form.querySelector('#user_sobrenome')).value;
      const resp = await User.update(user_id, user_nome, user_sobrenome, await getSession());
      showAlert('Operação concluida com sucesso', 'success');
    });
  } catch (err) {
    showAlert('Falha na operação');
    console.log(err);
  }
};

// alert message
const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = Render.template('shared', 'alert', {
    type: type,
    message: message
  });
  alertsElement.insertAdjacentHTML('beforeend', html);
};
