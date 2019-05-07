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
      const respBody = await response.json();
      throw new Error('status: ' + response.status + ', message: ' + respBody.error);
    }
    return await response.json();
  } catch (err) {
    throw new Error('(fetchJSON) ' + err);
  }
};

// fix bug: Used for request API DELETE (response's JSON broken)
export const fetchTXT = async (url, method = 'DELETE') => {
  try {
    const header = new Headers();

    if (await hasSession()) {
      header.append('Authorization', 'Bearer ' + (await getSessionToken()));
    }

    const response = await fetch(url, { method: method, headers: header });

    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    return await response.text();
  } catch (err) {
    throw new Error('(fetchTXT) ' + err);
  }
};
