import { defineStore } from "pinia";

export const useBooksStore = defineStore("books", {
  state: () => ({
    /**
     * TODO :  Default state not ideal, usually this would be stored in response to a fetch query from a
     * backend. Contaminates the tests.
     */
    books: [
      {
        title: "Don Quixote",
        author: "Miguel De Cervantes",
      },
      {
        title: "Pilgrim's Progress",
        author: "John Bunyan",
      },
      {
        title: "Robinson Crusoe",
        author: "Daniel Defoe",
      },
      {
        title: "Gulliver's Travels",
        author: "Jonathan Swift",
      },
      {
        title: "Tom Jones",
        author: "Henry Fielding",
      },
      {
        title: "Clarissa",
        author: "Samuel Richardson",
      },
      {
        title: "Tristram Shandy",
        author: "Laurence Sterne",
      },
    ],
  }),
  getters: {
    getAllBooks: ({ books }) => books,
  },
  actions: {
    search(searchTerm) {
      if (searchTerm === "") return this.books;

      return searchTerm
        ? this.books.filter(({ title }) =>
            title.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
        : [];
    },
  },
});
