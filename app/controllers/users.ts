import { User } from '../model/user.ts';
import { render, redirectTo } from '../lib/render.ts';
import { showAlert, startLoaderBar, stopLoaderBar } from '../lib/utils.ts';
import { hasSession, getSessionToken, setSessionToken, deleteSession } from '../lib/session.ts';

const session = () => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = render('users', 'login', {});

  const form = mainElement.querySelector('form');
  form.addEventListener('submit', async event => {
    try {
      event.preventDefault();

      const login = (form.querySelector('#user_login') as HTMLInputElement).value;
      const password = (form.querySelector('#user_password') as HTMLInputElement).value;

      startLoaderBar();
      const user = await User.login(login, password);
      await setSessionToken(user.getToken());
      stopLoaderBar();

      redirectTo('users');
    } catch (err) {
      stopLoaderBar();
      showAlert('Falha na operação');
      console.log(err);
    }
  });
};

const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = render('users', 'list', { users: users, url: '#users?page=' });

  // add editar event on buttons
  const editButtons = mainElement.querySelectorAll('button.edit');
  for (let i = 0; i < editButtons.length; i++) {
    const editButton = editButtons[i];
    editButton.addEventListener('click', event => {
      const id = editButton.getAttribute('data-user');
      redirectTo('users/' + id);
    });
  }

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', async event => {
      try {
        const id = deleteButton.getAttribute('data-user');

        startLoaderBar();
        await User.deleteById(id, await getSessionToken());
        stopLoaderBar();

        const containerUser = (deleteButton as HTMLInputElement).parentNode.parentNode;
        const parent = (containerUser as HTMLInputElement).parentNode;
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

const editUser = user => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = render('users', 'edit', { user: user });

  const form = mainElement.querySelector('form');
  form.addEventListener('submit', async event => {
    try {
      event.preventDefault();

      const userId = (form.querySelector('#user_id') as HTMLInputElement).value;
      const userNome = (form.querySelector('#user_nome') as HTMLInputElement).value;
      const userSobrenome = (form.querySelector('#user_sobrenome') as HTMLInputElement).value;

      startLoaderBar();
      await User.update(userId, userNome, userSobrenome, await getSessionToken());
      stopLoaderBar();

      showAlert('Operação concluida com sucesso', 'success');
    } catch (err) {
      stopLoaderBar();
      showAlert('Falha na operação');
      console.log(err);
    }
  });
};

/*
  ==================
  Controller's pages
  ==================
*/

export const login = async () => {
  try {
    if (!(await hasSession())) {
      session();
    } else {
      redirectTo('users');
    }
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    if (await hasSession()) {
      startLoaderBar();
      await User.logout(await getSessionToken());
      await deleteSession();
      stopLoaderBar();

      redirectTo('login');
    }
  } catch (err) {
    throw err;
  }
};

export const users = async (page = '1') => {
  try {
    if (!(await hasSession())) {
      redirectTo('login');
    } else {
      startLoaderBar();
      const users = await User.findByPage(page, await getSessionToken());
      stopLoaderBar();

      listUsers(users);
    }
  } catch (err) {
    throw err;
  }
};

export const edit = async id => {
  try {
    if (!(await hasSession())) {
      redirectTo('login');
    } else {
      startLoaderBar();
      const user = await User.findById(id, await getSessionToken());
      stopLoaderBar();

      editUser(user);
    }
  } catch (err) {
    throw err;
  }
};
