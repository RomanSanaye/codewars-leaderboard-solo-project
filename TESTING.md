# TESTING.md – Codewars Leaderboard

This document explains how each rubric requirement was tested.

---

## 1. Input accepts comma-separated usernames

We tested this manually by entering multiple usernames in the input field such as:
"g964, codewarrior, invalidUser"

The input correctly splits usernames using `.split(",")` and trims whitespace.

---

## 2. Fetching user data from Codewars API

We tested this by entering valid usernames and confirming that data is fetched from:

https://www.codewars.com/api/v1/users/{username}

We also tested invalid usernames to confirm error handling works correctly.

---

## 3. Dropdown shows all possible languages + overall

We tested this by entering users with different languages.

The function `getLanguages()` correctly extracts all unique languages and includes "overall".

---

## 4. Default ranking is "overall"

We tested this by loading users and checking that the table initially displays:

renderTable("overall")

---

## 5. Table displays username, clan, and score

We tested visually that each row includes:

- username
- clan
- score

These values are rendered dynamically from user data.

---

## 6. Changing dropdown updates the table

We tested this by selecting different languages from the dropdown.

The table updates correctly based on the selected value.

---

## 7. Table is sorted from highest to lowest score

We tested this using multiple users with different scores.

Sorting is handled by:
sortUsersByScore(users, language)

Users are displayed in descending order.

---

## 8. Users without ranking are not shown

We tested this by using users who do not have rankings in a selected language.

These users are filtered out using:
.filter(user => user.score > 0)

---

## 9. Top user is highlighted

We tested visually that the first row is highlighted using the class:

top-user

---

## 10. Accessibility (Lighthouse 100%)

We tested accessibility using Lighthouse in Chrome DevTools.

We ensured:

- proper labels
- keyboard navigation support
- ARIA live error messages

Score achieved: 100

---

## 11. Unit tests

We tested core logic using Jest.

**Unit tests in script.test.js**

We tested:

- getLanguages()
- sortUsersByScore()

Mock data was used instead of real API calls.

---

## 12. Invalid usernames show error message

We tested entering invalid usernames.

The application displays an error message showing which users failed.

---

## 13. API failure handling

We tested network failure scenarios and invalid requests.

The application shows a user-friendly error message instead of crashing.
