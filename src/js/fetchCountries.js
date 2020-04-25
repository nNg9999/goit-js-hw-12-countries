export default {
  fetchCountries(searchQuery) {
    const base = `https://restcountries.eu/rest/v2`;
    const resource = `/name/${searchQuery}`;
    return fetch(base + resource)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => console.error(error));
  },
};
