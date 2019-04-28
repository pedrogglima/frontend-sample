
// convinient method for return json from fetch call.
export const fetchJSON = async (url, method = 'GET') => {
  try {
    const response = await fetch(url, {method, credentials: 'omit' });
    return response.json();
  } catch (error) {
    return {error};
  }
};
