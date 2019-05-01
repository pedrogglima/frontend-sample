import { fetchJSON, fetchTXT } from '../lib/utils.ts';

// falta fazer nesse modulo
// - padronizar URL api.
// - tornar esse modulo uma classe!

export const login = async (email, password) => {
  try {
    const url = 'https://reqres.in/api/login?delay=2';
    const resqBody = JSON.stringify({
      "email": email,
      "password": password
    });
    return await fetchJSON(
      url,
      {
        method: 'POST',
        headers: new Headers({
          "Accept": "application/json",
          "Content-Type": "application/json"
        }),
        body: resqBody
      }
    );
  } catch (err) {
    throw err;
  }
};

export const logout = async (token) => {
  try {
    const url = 'https://reqres.in/api/logout?delay=2';
    return await fetchJSON(
      url,
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Bearer ' + token
        })
      }
    );
  } catch (err) {
    throw err;
  }
};


export const find_by_page = async (pageNumber = '1', token) => {
  try {
    const url = `https://reqres.in/api/users?page=${pageNumber}&delay=2`;
    return await fetchJSON(
      url,
      {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + token
        })
      }
    );
  } catch (err) {
    throw err;
  }
};

export const find_by_id = async (id, token) => {
  try {
    const url = `https://reqres.in/api/users/${id}?delay=2`;
    return await fetchJSON(
      url,
      {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + token
        })
      }
    );
  } catch (err) {
    throw err;
  }
};

export const delete_by_id = async (id, token) => {
  try {
    const url = `https://reqres.in/api/users/${id}?delay=2`;
    return await fetchTXT(
      url,
      {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': 'Bearer ' + token
        })
      }
    );
  } catch (err) {
    throw err;
  }
};

export const update = async (id, nome, sobrenome, token) => {
  try {
    const url = `https://reqres.in/api/users/${id}?delay=2`;
    const resqBody = JSON.stringify({
      "first_name": nome,
      "last_name": sobrenome
    });
    return await fetchJSON(
      url,
      {
        method: 'PUT',
        headers: new Headers({
          "Authorization": "Bearer " + token,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }),
        body: resqBody
      }
    );
  } catch (err) {
    throw err;
  }
};
