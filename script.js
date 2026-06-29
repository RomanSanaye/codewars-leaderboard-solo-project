// import logic functions;
// =======================
import { getLanguages, sortUsersByScore } from "./logic.js";

// touch HTML elements;
// ====================
const userNameInput = document.getElementById("input-username");
const loadBtn = document.getElementById("load-btn");
const dropdown = document.querySelector(".dropdown");
const selectLanguage = document.getElementById("select-language");
const leaderBoard = document.getElementById("table-body");
const resetBtn = document.getElementById("reset-btn");
const errorMessage = document.getElementById("error-msg");

// global variables;
// =================
let validUsers = [];

// fetch single user data;
// =======================
async function fetchSingleUserData(user) {
  const response = await fetch(`https://www.codewars.com/api/v1/users/${user}`);

  if (!response.ok) {
    throw new Error(user);
  }
  return response.json();
}

// fetch multiple user data;
// =========================
async function fetchMultipleUsersData(usernames) {
  const results = await Promise.allSettled(usernames.map(fetchSingleUserData));

  const valid = [];
  const invalid = [];

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      valid.push(result.value);
    } else {
      invalid.push(result.reason.message);
    }
  });

  return { valid, invalid };
}

// fill the Dropdown;
function renderDropdown(languages) {
  selectLanguage.innerHTML =
    '<option value="overall" selected>Overall</option>';

  languages.forEach((lang) => {
    if (lang !== "overall") {
      selectLanguage.innerHTML += `<option value="${lang}">${lang}</option>`;
    }
  });
}

// renderTable;
// ============
function renderTable(language) {
  leaderBoard.innerHTML = "";

  const sortedUsers = sortUsersByScore(validUsers, language);

  sortedUsers.forEach((user, index) => {
    leaderBoard.innerHTML += `
      <tr class ="${index === 0 ? "top-user" : ""}">
        <td>${user.username}</td>
        <td>${user.clan}</td>
        <td>${user.score}</td>
      </tr>
    `;
  });
}

// function that extracts unique language based on users;
// =======================================

// function that sorts users by scores;
// =====================

// load button event;
// ==================
loadBtn.addEventListener("click", async () => {
  errorMessage.style.display = "none";
  const usernames = userNameInput.value
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);

  if (usernames.length === 0) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "No user provided!";
    return;
  }

  const result = await fetchMultipleUsersData(usernames);

  validUsers = result.valid;
  if (validUsers.length === 0) {
    dropdown.style.display = "none";
    leaderBoard.innerHTML = "";
    errorMessage.style.display = "block";
    errorMessage.textContent = "No valid users found!";
    return;
  }

  if (result.invalid.length > 0) {
    errorMessage.style.display = "block";
    errorMessage.textContent = `Invalid user(s): ${result.invalid.join(", ")}`;
  } else {
    errorMessage.style.display = "none";
  }

  // build languages
  const languages = getLanguages(validUsers);

  // build dropdown
  dropdown.style.display = "flex";
  renderDropdown(languages);

  // show default table
  renderTable("overall");

  userNameInput.value = "";
});

// dropdown change;
// ================
selectLanguage.addEventListener("change", (e) => {
  renderTable(e.target.value);
});

// reset user selection and table;
// ===============================
resetBtn.addEventListener("click", () => {
  userNameInput.value = "";
  dropdown.style.display = "none";
  leaderBoard.innerHTML = "";
  errorMessage.style.display = "none";
});
