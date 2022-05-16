import { defineStore } from "pinia";

export const useCitiesStore = defineStore("cities", {
  state: () => ({
    cities: [
      "san jose",
      "santiago",
      "san francisco",
      "santa rosa",
      "san juan",
      "sabadell",
      "salamanca",
      "salt lake city",
      "salinas",
      "salem",
      "sausalito",
      "taipei",
      "tel aviv",
      "tempe",
      "termez",
      "temuco",
      "tiajuna",
      "tieling",
      "thousand oaks",
      "thunder bay",
      "tokyo",
      "tulsa",
    ],
  }),
  getters: {
    getAllCities: ({ cities }) => cities,
  },
  actions: {
    search(searchTerm) {
      return this.cities.filter((city) =>
        city.startsWith(searchTerm.toLowerCase())
      );
    },
  },
});
