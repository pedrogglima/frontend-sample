import * as User from '../model/user.ts';
import * as Render from '../lib/render.ts';
import * as Fixtures from '../test/fixtures.ts';
import { hasSession, getSession, setSession, deleteSession } from '../lib/utils.ts';

const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = Render.template('shared', 'alert', {
    type: type,
    message: message
  });
  alertsElement.insertAdjacentHTML('beforeend', html);
};

// user session
export const session = () => {
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
      Render.redirect('users');
    });
  } catch (err) {
    showAlert('Falha na operação');
    console.log(err);
  }
};

// list users
export const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = Render.template('users', 'list', {users: users, url: "#users?page="});

  // add editar event on buttons
  const editButtons = mainElement.querySelectorAll('button.edit');
  for (let i = 0; i < editButtons.length; i++) {
    const editButton = editButtons[i];
    editButton.addEventListener('click', event => {
      try {
        const id = editButton.getAttribute('data-user');
        Render.redirect(`users/${id}`);
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
export const editUser = user => {
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
