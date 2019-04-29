
// convinient method for return json from fetch call.
export const fetchJSON = async (url, args) => {
  try {
    const response = await fetch(url, args);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  } catch (err) {
    throw new Error("Network error: " + err)
  }
};
