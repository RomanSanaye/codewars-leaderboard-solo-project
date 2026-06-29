// import functions for testing;
// =============================
import { getLanguages, sortUsersByScore } from "./logic.js";

// write the test here;
// ====================
test("should extract all unique languages from users and include overall", () => {
  const users = [
    {
      ranks: {
        overall: {
          score: 2116
        },
        languages: {
          javascript: { score: 199 },
          python: { score: 0 }
        }
      }
    }
  ];

  const result = getLanguages(users);

  expect(result).toEqual(["overall", "javascript", "python"]);
});

// testing sort users by score function;
// =====================================
test("should sort users by score descending", () => {
  const users = [
    {
      username: "A",
      ranks: {
        overall: { score: 100 }
      }
    },
    {
      username: "B",
      ranks: {
        overall: { score: 300 }
      }
    }
  ];

  const result = sortUsersByScore(users, "overall");

  expect(result[0].username).toBe("B");
  expect(result[1].username).toBe("A");
});
