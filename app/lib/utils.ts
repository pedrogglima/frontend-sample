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
