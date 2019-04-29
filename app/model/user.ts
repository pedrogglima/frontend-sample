import { fetchJSON } from '../lib/utils.ts';

// falta fazer nesse modulo
// - padronizar URL api.
// - tornar esse modulo uma classe!

export const find_by_page = async (pageNumber = '1') => {
  try {
    return await fetchJSON(
      `https://reqres.in/api/users?page=${pageNumber}`,
      {
        method: 'GET'
      }
    );
  } catch (err) {
    throw err;
  }
};

export const find_by_id = async id => {
  try {
    return await fetchJSON(
      `https://reqres.in/api/unknown/${id}`,
      {
        method: 'GET'
      }
    );
  } catch (err) {
    throw err;
  }
};

export const delete_by_id = async id => {
  try {
    return await fetchJSON(
      `https://reqres.in/api/users/${id}`,
      {
        method: 'DELETE'
      }
    );
  } catch (err) {
    throw err;
  }
};

export const update = async (id, nome, sobrenome) => {
  try {
    const url = `https://reqres.in/api/users/${id}`;
    const resqBody = JSON.stringify({
      "first_name": nome,
      "last_name": sobrenome
    });
    return await fetchJSON(
      url,
      {
        method: 'PUT',
        body: resqBody
      }
    );
  } catch (err) {
    throw err;
  }
};
