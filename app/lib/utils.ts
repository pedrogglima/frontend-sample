
// convinient method for return json from fetch call.
export const fetchJSON = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    console.log(response);
    return await response.json();
  } catch (err) {
    throw new Error("Network error: " + err)
  }
};

// convinient method for return text from fetch call.
export const fetchTXT = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    console.log(response);
    return await response.text();
  } catch (err) {
    throw new Error("Network error: " + err)
  }
};
