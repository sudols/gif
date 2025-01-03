export default class Giphy {
  //Constructor
  constructor(search) {
    this.apiKey = 'kqMjYFoSzGiososCGX5LwVvGNRczPxuY';
    // this.apiKey = 'DnY3r3scbZjMoMPlOWxYoCZ6D0Iw7pVa';
    this.search = search;
  }

  async getSearchResults() {
    try {
      let api = await fetch(
        'https://api.giphy.com/v1/gifs/search?api_key=' +
          this.apiKey +
          '&q=' +
          this.search +
          '&limit=16&offset=0&rating=R&lang=en'
        // '&limit=12&offset=0&rating=R&lang=en'
      );
      let found = await api.json();
      return found;
    } catch (error) {
      console.log(error);
    }
  }

  async getTrending() {
    try {
      let api = await fetch(
        'https://api.giphy.com/v1/gifs/trending?api_key=' +
          this.apiKey +
          '&limit=24&rating=R'
        // '&limit=24&rating=R'
      );
      let found = await api.json();
      return found;
    } catch (error) {
      console.log(error);
    }
  }

  async getSuggestions() {
    try {
      let api = await fetch(
        'https://api.giphy.com/v1/gifs/search?api_key=' +
          this.apiKey +
          '&q=desarrollador&limit=4&offset=0&rating=R&lang=es'
      );
      let found = await api.json();
      return found;
    } catch (error) {
      console.log(error);
    }
  }
}
