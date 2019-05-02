export const hasSession = async () => {
  try {
    const token = await getSessionToken();
    if (token === null) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error("Error while checking for cookie: " + err);
  }
};

export const setSessionToken = async (value) => {
  try {
    document.cookie = `Token=${value};`;
  } catch (err) {
    throw new Error("Error while setting cookie: " + err);
  }
};

export const getSessionToken = async () => {
  try {
    const keyname = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const listCookies = decodedCookie.split(';');
    let cookie = '';
    for(let i = 0; i <listCookies.length; i++) {
      cookie = listCookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(keyname) == 0) {
        return cookie.substring(keyname.length, cookie.length);
      }
    }
    return null;
  } catch (err) {
    throw new Error("Error while getting cookie: " + err);
  }
};

export const deleteSession = async () => {
  try {
    const cookie = await getSessionToken();
    if (cookie !== null) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  } catch (err) {
    throw new Error("Error deleting cookie: " + err);
  }
}
