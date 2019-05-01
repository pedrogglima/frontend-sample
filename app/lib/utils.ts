
// convinient method for return json from fetch call.
export const fetchJSON = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return await response.json();
  } catch (err) {
    throw new Error("Network error: " + err);
  }
};

// convinient method for return text from fetch call.
export const fetchTXT = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return await response.text();
  } catch (err) {
    throw new Error("Network error: " + err);
  }
};

export const hasSession = async () => {
  try {
    const token = await getSession();
    if (token === null) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error("Error while checking for cookie: " + err);
  }
};

export const setSession = async (key, value) => {
  try {
    document.cookie = `${key}=${value};`;
  } catch (err) {
    throw new Error("Error while setting cookie: " + err);
  }
};

export const getSession = async () => {
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
    const cookie = await getSession();
    if (cookie !== null){
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  } catch (err) {
    throw new Error("Error deleting cookie: " + err);
  }
}
