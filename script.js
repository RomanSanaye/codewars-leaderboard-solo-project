// import functions from logic.js;
// ===============================
const { getLanguages, sortUsersByScore } = require("./logic");

// touch HTML elements;
// ====================
const userNameInput = document.getElementById("input-username");
const loadBtn = document.getElementById("load-btn");
const dropdown = document.querySelector(".dropdown");
const selectUser = document.getElementById("select-user");
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
  selectUser.innerHTML = '<option value="overall" selected>Overall</option>';

  languages.forEach((lang) => {
    if (lang !== "overall") {
      selectUser.innerHTML += `
            <option value="${lang}">${lang}</option>`;
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

// load button event;
// ==================
loadBtn.addEventListener("click", async () => {
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

  if (result.invalid.length > 0) {
    errorMessage.style.display = "block";
    errorMessage.textContent = `Invalid users: ${result.invalid.join(", ")}`;
  }

  // build languages
  const languages = getLanguages(validUsers);

  // build dropdown
  dropdown.style.display = "block";
  renderDropdown(languages);

  // show default table
  renderTable("overall");

  userNameInput.value = "";
  //errorMessage.style.display = "none";
});

// dropdown change;
// ================
selectUser.addEventListener("change", (e) => {
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

// export functions for testing;
// =============================
module.exports = getLanguages;
