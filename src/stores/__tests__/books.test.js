import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useBooksStore } from "../";

/**
 * I don't believe in an arbitary number denoting the quality and deployability of a code base. Testing is a
 * double edge sword, keeping an eye on meaningless tests as much on effective tests helps maintain good
 * tests hygine. Keepin that in mind not going to write tests for getters here as they are literally getters.
 * The same should be done for all actions in the cities stores as well.
 */
describe("Books Store", () => {
  let booksStore;
  beforeEach(() => {
    setActivePinia(createPinia());
    booksStore = useBooksStore();
  });

  describe("Actions", () => {
    describe("Search", () => {
      describe("when searchKey", () => {
        it("is empty then return all results", () => {
          const actualResult = booksStore.search("");
          const expectedResult = booksStore.getAllBooks;

          expect(actualResult).toEqual(expectedResult);
        });

        it("is undefined then return empty array", () => {
          const actualResult = booksStore.search(undefined);
          const expectedResult = [];

          expect(actualResult).toEqual(expectedResult);
        });

        it("matches value from books then return all matching results", () => {
          const actualResult = booksStore.search("don");
          const expectedResult = [
            {
              title: "Don Quixote",
              author: "Miguel De Cervantes",
            },
          ];

          expect(actualResult).toEqual(expectedResult);
        });

        it("searches regardless of case to return same result", () => {
          const actualResultSimpleCase = booksStore.search("don");
          const actualResultCapitalCase = booksStore.search("DON");

          const expectedResult = [
            {
              title: "Don Quixote",
              author: "Miguel De Cervantes",
            },
          ];

          // Multiple assertions is not ideal, but this test needs to fail when one of the two fails
          expect(actualResultSimpleCase).toEqual(expectedResult);
          expect(actualResultCapitalCase).toEqual(expectedResult);
        });
      });
    });
  });
});
