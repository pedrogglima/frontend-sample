import { hasSession, getSessionToken } from './session.ts';

export const fetchJSON = async (url, method = 'GET', body = '') => {
  try {
    let response;
    const header = new Headers();

    if (await hasSession()) {
      header.append('Authorization', 'Bearer ' + (await getSessionToken()));
    }

    if (body.length > 0) {
      header.append('Accept', 'application/json');
      header.append('Content-Type', 'application/json');
      header.append('Content-length', body.length.toString());

      response = await fetch(url, { method: method, headers: header, body: body });
    } else {
      response = await fetch(url, { method: method, headers: header });
    }

    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    return await response.json();
  } catch (err) {
    throw new Error('(fetchJSON) ' + err);
  }
};

// Used for request API DELETE (response's JSON broken)
export const fetchTXT = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    return await response.text();
  } catch (err) {
    throw new Error('(fetchTXT) ' + err);
  }
};
