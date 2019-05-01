import * as User from '../model/user.ts';
import * as Render from '../lib/render.ts';
import * as SharedHelpers from '../helpers/shared.ts';
// import * as Fixtures from '../test/fixtures.ts';
import { hasSession, getSession, setSession, deleteSession } from '../lib/utils.ts';

// user session
export const session = () => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = Render.template('users', 'login', {});

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

      SharedHelpers.startLoading();
      const resp = await User.login(user_login, user_password);
      await setSession("token", resp.token);
      //const resp = Fixtures.token();
      SharedHelpers.stopLoading();
      Render.redirect('users');
    } catch (err) {
      SharedHelpers.stopLoading();
      SharedHelpers.showAlert('Falha na operação');
      console.log(err);
    }
  });
};

// list users
export const listUsers = users => {
  const mainElement = document.body.querySelector('.app-main');
  mainElement.innerHTML = Render.
    template('users', 'list', {users: users, url: "#users?page="});

  // add editar event on buttons
  const editButtons = mainElement.querySelectorAll('button.edit');
  for (let i = 0; i < editButtons.length; i++) {
    const editButton = editButtons[i];
    editButton.addEventListener('click', event => {
      const id = editButton.getAttribute('data-user');
      Render.redirect(`users/${id}`);
    });
  }

  // add delete event on buttons
  const deleteButtons = mainElement.querySelectorAll('button.delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', async (event) => {
      try {
        const id = deleteButton.getAttribute('data-user');

        SharedHelpers.startLoading();
        const resp = await User.delete_by_id(id, await getSession());
        SharedHelpers.stopLoading();

        const containerUser =
          (<HTMLInputElement> deleteButton).parentNode
            .parentNode;

        const parent =
          (<HTMLInputElement> containerUser).parentNode;

        parent.removeChild(containerUser);

        SharedHelpers.showAlert('Operação concluida com sucesso', 'success');
      } catch (err) {
        SharedHelpers.stopLoading();
        SharedHelpers.showAlert('Falha na operação');
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
    Render.template('users', 'edit', {user: user});

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

      SharedHelpers.startLoading();
      const resp = await User.update(user_id, user_nome, user_sobrenome, await getSession());
      SharedHelpers.stopLoading();

      SharedHelpers.showAlert('Operação concluida com sucesso', 'success');

    } catch (err) {
      SharedHelpers.stopLoading();
      SharedHelpers.showAlert('Falha na operação');
      console.log(err);
    }
  });
};
