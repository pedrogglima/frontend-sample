import { fetchJSON } from '../lib/utils.ts';
import * as tpt_shared from '../templates/shared.ts';

// falta fazer nesse modulo
// - remover view (showAlert)
// - resolver throw errors and returns
// - padronizar URL api.
// - tornar esse modulo uma classe!


const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.app-alerts');
  const html = tpt_shared.alert({type, message});
  alertsElement.insertAdjacentHTML('beforeend', html);
};

// get users
export const find_by_page = async (pageNumber = '1') => {
  const respUsers = await fetchJSON(`https://reqres.in/api/users?page=${pageNumber}`);

  if (respUsers.error) {
    throw respUsers.error;
  }
  return respUsers;
};

// get user by id
export const find_by_id = async id => {
  try {
    const respUser = await fetchJSON(`https://reqres.in/api/users/${id}`);

    if (Object.keys(respUser).length === 0) {
      throw 'usuário não foi encontrado';
    }
    return respUser;
  } catch (err) {
    showAlert(err);
  }
};

// delete user by id
export const delete_by_id = async id => {
  try {
    const respUser = await fetchJSON(`https://reqres.in/api/users/${id}`, 'DELETE');
    
    if (respUser.status !== 204) {
      return false;
    }
    return true;

  } catch (err) {
    throw `${err}: error at operation delete`;
  }
};

// update user
export const update = async (id, nome, sobrenome) => {
  try {
    const url = `https://reqres.in/api/users/${id}`;

    const resqBody = JSON.stringify({
      "first_name": nome,
      "last_name": sobrenome
    });

    const respUser = await fetch(url, {method: 'PUT', body: resqBody});

    if (respUser.status !== 200) {
      throw 'não foi possível atualizar o usuário';
    }

    showAlert('usuario foi atualizado!', 'success');
  } catch (err) {
    showAlert(err);
  }
};
